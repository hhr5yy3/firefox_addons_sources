import { memoizeDecorator } from './memoize.js';
import { patternToRegex } from './webext-patterns.js';
import OptionsSync from './webext-options-sync.js';
import { isBackgroundPage, isContentScript } from './webext-detect.js';
import { normalizeManifestPermissions, queryAdditionalPermissions } from './webext-permissions.js';

var __decorate = (globalThis && globalThis.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function parseHost(origin) {
    return origin.includes('//')
        ? origin.split('/')[2].replace('*.', '')
        : origin;
}
class OptionsSyncPerDomain {
    static migrations = OptionsSync.migrations;
    #defaultOrigins = patternToRegex(...normalizeManifestPermissions().origins);
    #defaultOptions;
    #syncedForm;
    #changeEventTarget = new EventTarget();
    constructor(options) {
        this.#defaultOptions = {
            storageName: 'options',
            ...options,
        };
        if (!isBackgroundPage()) {
            return;
        }
        if (options.migrations?.length) {
            this.getAllOrigins();
        }
        chrome.permissions.onRemoved.addListener(({ origins }) => {
            const storageKeysToRemove = (origins ?? [])
                .filter(key => !this.#defaultOrigins.test(key))
                .map(key => this.getStorageNameForOrigin(key));
            chrome.storage.sync.remove(storageKeysToRemove);
        });
    }
    getOptionsForOrigin(origin = location.origin) {
        if (!origin.startsWith('http') || this.#defaultOrigins.test(origin)) {
            return new OptionsSync(this.#defaultOptions);
        }
        return new OptionsSync({
            ...this.#defaultOptions,
            storageName: this.getStorageNameForOrigin(origin),
        });
    }
    async getAllOrigins() {
        if (isContentScript()) {
            throw new Error('This function only works on extension pages');
        }
        const instances = new Map();
        instances.set('default', this.getOptionsForOrigin());
        for (const { domain, origin } of await this.getAdditionalOrigins()) {
            instances.set(domain, this.getOptionsForOrigin(origin));
        }
        return instances;
    }
    async getAdditionalOrigins() {
        const { origins } = await queryAdditionalPermissions({ strictOrigins: false });
        return origins.map(origin => ({
            origin,
            domain: parseHost(origin),
        }));
    }
    async syncForm(form) {
        if (isContentScript()) {
            throw new Error('This function only works on extension pages');
        }
        if (typeof form === 'string') {
            form = document.querySelector(form);
        }
        const currentOrigin = this.getOptionsForOrigin();
        await currentOrigin.syncForm(form);
        this.#syncedForm = currentOrigin;
        const additionalOrigins = await this.getAdditionalOrigins();
        if (additionalOrigins.length === 0) {
            return Object.freeze({
                domainCount: 1,
                getSelectedDomain: () => 'default',
                onChange() { },
            });
        }
        const allOrigins = ['default', ...additionalOrigins.map(item => item.domain)];
        const dropdown = document.createElement('select');
        dropdown.addEventListener('change', this._domainChangeHandler);
        for (const domain of allOrigins) {
            const option = document.createElement('option');
            option.value = domain;
            option.textContent = domain;
            dropdown.append(option);
        }
        const wrapper = document.createElement('p');
        wrapper.append('Domain selector: ', dropdown);
        wrapper.classList.add('OptionsSyncPerDomain-picker');
        form.prepend(wrapper, document.createElement('hr'));
        return Object.freeze({
            domainCount: allOrigins.length,
            getSelectedDomain: () => dropdown.value,
            onChange: async (callback) => {
                this.#changeEventTarget.addEventListener('change', () => {
                    callback(dropdown.value);
                });
            },
        });
    }
    getStorageNameForOrigin(origin) {
        return this.#defaultOptions.storageName + '-' + parseHost(origin);
    }
    getOriginFromDomain(storageName) {
        return storageName === 'default'
            ? undefined
            : 'https://*.' + storageName + '/*';
    }
    _domainChangeHandler = async (event) => {
        const dropdown = event.currentTarget;
        this.#syncedForm.stopSyncForm();
        await this.getOptionsForOrigin(this.getOriginFromDomain(dropdown.value)).syncForm(dropdown.form);
        this.#changeEventTarget.dispatchEvent(new Event('change'));
    };
}
__decorate([
    memoizeDecorator()
], OptionsSyncPerDomain.prototype, "getOptionsForOrigin", null);
__decorate([
    memoizeDecorator()
], OptionsSyncPerDomain.prototype, "getAllOrigins", null);

export { OptionsSync, OptionsSyncPerDomain as default };
