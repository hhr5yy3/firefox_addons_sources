import { backgroundRemote, closeWindow, movePlatformSubmitButton } from "../common/common.js";
import { remoteSettings, NETWORK_OPTIONS_KEYS } from "../common/settings.js";
export class TaskFormElement extends HTMLFormElement {
    constructor() {
        super(...arguments);
        this.addingPaused = 0;
        this.willSaveNetworkOptions = false; // only if loaded from default
        this.getDataList = () => [{}];
        this.getDefaultFilenameTemplate = () => ''; // *text* for convert-url-provider
        this.submitData = (dataList, formObj) => {
            let inum = 1;
            const creationDate = new Date();
            for (const data of dataList) {
                void backgroundRemote.createTask({
                    type: 'MultithreadedTask',
                    state: 'downloading',
                    creationDate,
                    inum: inum++,
                    ...data, ...formObj,
                });
            }
        };
        this.doAfterSubmitting = () => { };
    }
    init() {
        const networkOptions = this.querySelector('.network-options');
        const collapsedKey = `networkOptionsCollapsed.${location.pathname}`;
        networkOptions.open = !Number(localStorage.getItem(collapsedKey));
        networkOptions.addEventListener('toggle', () => {
            localStorage.setItem(collapsedKey, `${Number(!networkOptions.open)}`);
        });
        const submitButton = this.querySelector('.submit');
        const addPausedButton = this.querySelector('.add-paused');
        void movePlatformSubmitButton(addPausedButton, submitButton, submitButton);
        addPausedButton.addEventListener('click', () => {
            try {
                this.addingPaused++;
                submitButton.click();
            }
            finally {
                this.addingPaused--;
            }
        });
        remoteSettings.get('showAddPaused').then(v => addPausedButton.hidden = !v);
        this.addEventListener('submit', event => {
            event.preventDefault();
            const dataList = this.getDataList();
            if (!dataList.length)
                return;
            const formObj = {};
            for (const input of this.querySelectorAll('[data-key]'))
                if (!input.disabled)
                    formObj[input.dataset.key] = input.value;
            let ft = (formObj.filenameTemplate || '').trim();
            if (!ft)
                ft = this.getDefaultFilenameTemplate();
            if (dataList.length > 1 && ft && !ft.match(/\*[\w.]+\*/) &&
                !(ft.endsWith('/') || ft.endsWith('\\')))
                ft += '/';
            formObj.filenameTemplate = ft;
            if (this.addingPaused)
                formObj.state = 'paused';
            this.submitData(dataList, formObj);
            this.doAfterSubmitting();
            this.saveNetworkOptions();
            closeWindow();
        });
        this.querySelector('.cancel').addEventListener('click', closeWindow);
        this.querySelector('.copy-address').addEventListener('click', async () => {
            const dataList = this.getDataList();
            if (!dataList.length)
                return;
            const crlf = (await browser.runtime.getPlatformInfo()).os === 'win'
                ? '\r\n' : '\n';
            await navigator.clipboard.writeText(dataList.map(v => v.url).join(crlf) + (dataList.length > 1 ? crlf : ''));
        });
        let urlInputEventFlag = false;
        this.querySelector('[data-key="url"]').addEventListener('input', () => {
            if (urlInputEventFlag)
                return;
            urlInputEventFlag = true;
            this.querySelector('.file-size-span').classList.add('obsolete');
        });
        const checksumInput = this.querySelector('[data-key="checksum"]');
        checksumInput.addEventListener('change', () => {
            checksumInput.value = checksumInput.value.replace(/\s/g, '');
        });
    }
    async loadDefaultNetworkOptions() {
        const obj = await remoteSettings.load(NETWORK_OPTIONS_KEYS);
        for (const input of this.querySelectorAll('.network-options [data-key]')) {
            const key = input.dataset.key;
            input.value = obj[key] + '';
        }
        if (await remoteSettings.get('rememberLastNetworkOptions'))
            this.willSaveNetworkOptions = true;
    }
    saveNetworkOptions() {
        if (!this.willSaveNetworkOptions)
            return;
        const obj = {};
        for (const input of this.querySelectorAll('.network-options [data-key]')) {
            const key = input.dataset.key;
            Object.assign(obj, { [key]: input.value ? Number(input.value) : '' });
        }
        void remoteSettings.set(obj);
    }
    loadFromTaskData(data) {
        for (const input of this.querySelectorAll('[data-key]')) {
            const key = input.dataset.key;
            if (data[key] === undefined)
                continue;
            input.value = data[key] + '';
        }
    }
}
customElements.define('task-form', TaskFormElement, { extends: 'form' });
