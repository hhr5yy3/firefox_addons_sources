import { removeBrowserDownload, isValidProtocolURL } from "../common/common.js";
import { M, applyI18n } from "../util/webext/i18n.js";
import { importTemplate } from "../util/dom.js";
import { Timer } from "../util/promise.js";
import { remoteSettings } from "../common/settings.js";
export class URLProviderElement extends HTMLElement {
    init() { this.classList.add('url-provider'); }
    doAfterSubmitting() { }
}
class BatchDescriptor {
    parseItem(value) {
        for (const type of BatchDescriptor.itemTypes) {
            if (!type.regex.test(value))
                continue;
            try {
                return { ...type.parse(value), type };
            }
            catch (error) {
                console.log(error);
            }
        }
        return undefined;
    }
    expand(line, firstOnly = false) {
        const match = /\[(-?\w+):(-?\w+)(?::-?(\d+))?\]/.exec(line);
        if (!match)
            return [line];
        const start = this.parseItem(match[1]), end = this.parseItem(match[2]);
        if (!start || !end || start.type !== end.type)
            return [line];
        const forward = start.number <= end.number;
        const step = match[3] ? Number.parseInt(match[3]) : 1; // always positive
        if (step === 0)
            return [line];
        const prefix = line.slice(0, match.index);
        const suffixes = this.expand(line.slice(match.index + match[0].length));
        const width = Math.max(start.width, end.width);
        let result = [];
        for (let i = start.number; forward ? i <= end.number : i >= end.number; forward ? i += step : i -= step) {
            const processed = prefix + start.type.convert(i, width);
            result = result.concat(suffixes.map(suffix => processed + suffix));
            if (firstOnly)
                break;
        }
        return result;
    }
}
BatchDescriptor.singleCharType = {
    parse(value) {
        return { number: value.charCodeAt(0), width: 0 };
    },
    convert(n, _width) {
        return String.fromCharCode(n);
    },
};
BatchDescriptor.itemTypes = [{
        regex: /^-?\d+$/,
        parse: (value) => ({
            number: Number.parseInt(value, 10),
            width: value.startsWith('-0') ? value.length - 1 :
                value.startsWith('0') ? value.length : 0,
        }),
        convert(n, width) {
            return (n < 0 ? '-' : '') + `${Math.abs(n)}`.padStart(width, '0');
        },
    }, {
        ...BatchDescriptor.singleCharType, regex: /^[a-z]$/
    }, {
        ...BatchDescriptor.singleCharType, regex: /^[A-Z]$/
    },];
const batchDescriptor = new BatchDescriptor();
function convertTextToURLs(text, expandBatch) {
    const lines = text.split(/[\r\n]/g).map(v => v.trim()).filter(v => v);
    const urls = lines.flatMap(s => batchDescriptor.expand(s, !expandBatch));
    if (!urls.every(url => isValidProtocolURL(url)))
        return [];
    return expandBatch ? urls : lines;
}
customElements.define('address-url-provider', class extends URLProviderElement {
    init() {
        super.init();
        this.addressInput = this.querySelector('.address-input');
        navigator.clipboard.readText().then(clipText => {
            this.addressInput.value = convertTextToURLs(clipText, false)
                .map(url => url + '\n').join('');
        });
        this.addressInput.addEventListener('input', () => {
            this.addressInput.setCustomValidity('');
        });
        this.addressInput.addEventListener('dragover', event => {
            const item = event.dataTransfer.items[0];
            if (item && item.kind === 'file') {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';
            }
        });
        this.addressInput.addEventListener('drop', event => {
            const item = event.dataTransfer.items[0];
            if (item && item.kind === 'file') {
                event.preventDefault();
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    this.addressInput.value = reader.result;
                });
                reader.readAsText(item.getAsFile());
            }
        });
    }
    update(_tabId) { }
    get() {
        const result = convertTextToURLs(this.addressInput.value, true);
        if (!result.length) {
            this.addressInput.setCustomValidity(M.invalidAddress);
            this.addressInput.reportValidity();
        }
        return result.map(url => ({ url }));
    }
});
export class ListURLProviderElement extends URLProviderElement {
    constructor() {
        super(...arguments);
        this.preselectedDataSet = new WeakSet();
        this.usePreselectedData = false;
    }
    init() {
        super.init();
        this.appendChild(importTemplate('list-url-provider-template'));
        applyI18n(this);
        this.tbody = this.querySelector('tbody');
        this.selectAllCheckbox = this.querySelector('.url-list-select-all');
        this.loadingBar = this.querySelector('.url-list-loading');
        this.tbody.addEventListener('change', e => {
            if (!(e.target instanceof URLListItemElement))
                return;
            this.selectAllCheckbox.setCustomValidity('');
            this.updateSelectAllCheckbox();
        });
        this.selectAllCheckbox.addEventListener('change', () => {
            if (this.selectAllCheckbox.indeterminate)
                return;
            const { checked } = this.selectAllCheckbox;
            for (const item of this.getAllShownItems())
                item.checked = checked;
            this.selectAllCheckbox.setCustomValidity('');
        });
        this.filterInput = this.querySelector('.url-list-filter');
        const filterClear = this.querySelector('.url-list-filter-clear');
        let updateFilterTimer = new Timer(() => { this.updateFilter(); });
        this.filterInput.addEventListener('input', () => {
            filterClear.hidden = this.filterInput.value === '';
            updateFilterTimer.startOnce(500);
        });
        this.filterInput.addEventListener('change', () => { this.updateFilter(); });
        const onFilterClearClick = () => {
            this.filterInput.value = '';
            filterClear.hidden = true;
            this.updateFilter();
        };
        this.filterInput.addEventListener('keydown', event => {
            if (event.key === 'Escape')
                onFilterClearClick();
        });
        filterClear.addEventListener('click', onFilterClearClick);
    }
    async update(tabId) {
        this.tbody.innerHTML = '';
        this.loadingBar.hidden = false;
        const dataList = (await this.loadItemData(tabId)).filter(v => isValidProtocolURL(v.url));
        this.tbody.innerHTML = '';
        this.loadingBar.hidden = true;
        let firstCheckedItem;
        for (const data of dataList) {
            const item = new URLListItemElement();
            item.init(data);
            if (this.usePreselectedData && this.preselectedDataSet.has(data)) {
                item.checked = true;
                if (!firstCheckedItem)
                    firstCheckedItem = item;
            }
            this.tbody.appendChild(item);
        }
        this.selectAllCheckbox.setCustomValidity('');
        this.updateSelectAllCheckbox();
        if (firstCheckedItem) {
            this.querySelector('.url-list-inner').scrollTop
                = firstCheckedItem.firstElementChild.offsetTop
                    - 40; // scroll away from sticky header and leave some space
        }
    }
    get() {
        const items = this.getAllItems().filter(v => v.checked);
        if (!items.length) {
            this.showError(M.selectAddressFromList);
            return [];
        }
        return items.map(v => v.data);
    }
    showError(message) {
        this.selectAllCheckbox.setCustomValidity(message);
        this.selectAllCheckbox.reportValidity();
    }
    getAllShownItems() {
        return this.tbody.querySelectorAll('.url-list-item:not([hidden])');
    }
    getAllItems() {
        return [...this.tbody.querySelectorAll('.url-list-item')];
    }
    updateFilter() {
        for (const item of this.getAllItems())
            item.hidden = !item.match(this.filterInput.value);
        this.updateSelectAllCheckbox();
    }
    updateSelectAllCheckbox() {
        let lastChecked = undefined;
        for (const { checked } of this.getAllShownItems()) {
            if (lastChecked === undefined) {
                lastChecked = checked;
                continue;
            }
            if (lastChecked !== checked) {
                this.selectAllCheckbox.indeterminate = true;
                this.selectAllCheckbox.checked = false;
                return;
            }
        }
        this.selectAllCheckbox.indeterminate = false;
        this.selectAllCheckbox.checked = !!lastChecked;
    }
}
class URLListItemElement extends HTMLTableRowElement {
    init(data) {
        this.classList.add('url-list-item');
        this.data = data;
        this.appendChild(importTemplate('url-list-item-template'));
        const textNode = this.querySelector('.url-list-item-text');
        textNode.title = textNode.textContent = data.text || '';
        const urlNode = this.querySelector('.url-list-item-url');
        urlNode.title = urlNode.textContent = data.url || '';
        this.checkbox = this.querySelector('.url-list-item-checkbox');
        this.checkbox.addEventListener('change', e => {
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent('change', { bubbles: true }));
        });
    }
    get checked() { return this.checkbox.checked; }
    set checked(value) { this.checkbox.checked = value; }
    match(filter) {
        return !filter ||
            (this.data.text || '').includes(filter) ||
            (this.data.url || '').includes(filter);
    }
}
customElements.define('url-list-item', URLListItemElement, { extends: 'tr' });
customElements.define('convert-url-provider', class extends ListURLProviderElement {
    constructor() {
        super(...arguments);
        this.downloadIdMap = new WeakMap();
    }
    init() {
        super.init();
        this.defaultFilenameTemplate = '*text*';
        this.removeAfterImport = this.querySelector('.convert-remove-after-import');
        remoteSettings.get('removeAfterImport').then(v => {
            this.removeAfterImport.checked = v;
            this.removeAfterImport.addEventListener('change', () => remoteSettings.set({ removeAfterImport: this.removeAfterImport.checked }));
        });
        this.showCompleted = this.querySelector('.convert-show-completed');
        this.showCompleted.addEventListener('change', () => { this.update(NaN); });
    }
    async loadItemData(_tabId) {
        let items = await browser.downloads.search({});
        if (!this.showCompleted.checked)
            items = items.filter(v => v.state !== 'complete');
        return items.map(({ id, url, filename, referrer }) => {
            const data = {
                url, referrer,
                text: filename.replace(/[\\\/]*$/, '').replace(/.*[\\\/]/, '')
            };
            this.downloadIdMap.set(data, id);
            return data;
        });
    }
    doAfterSubmitting() {
        if (!this.removeAfterImport.checked)
            return;
        for (const data of this.get()) {
            const downloadId = this.downloadIdMap.get(data);
            if (downloadId)
                void removeBrowserDownload(downloadId);
        }
    }
});
class ContentListURLProviderElement extends ListURLProviderElement {
    async loadItemData(tabId) {
        try {
            const frameResults = await browser.tabs.executeScript(tabId, {
                allFrames: true,
                file: this.contentScript,
                matchAboutBlank: true,
                runAt: 'document_start',
            });
            const list = [].concat(...frameResults);
            for (const data of list)
                if (data.isSelected) {
                    delete data.isSelected;
                    this.preselectedDataSet.add(data);
                }
            return list;
        }
        catch (error) {
            let message = '';
            if (error && typeof error.message === 'string') {
                if (/\bpermission\b/.test(error.message))
                    message = M.pageInaccessibleToExtensions;
                else if (/\bInvalid tab\b/.test(error.message))
                    message = M.pageHasBeenClosed;
            }
            this.showError(message || error.message);
            return [];
        }
    }
}
customElements.define('link-url-provider', class extends ContentListURLProviderElement {
    constructor() {
        super(...arguments);
        this.contentScript = '/content/find-links.js';
    }
});
customElements.define('media-url-provider', class extends ContentListURLProviderElement {
    constructor() {
        super(...arguments);
        this.contentScript = '/content/find-media.js';
    }
});
