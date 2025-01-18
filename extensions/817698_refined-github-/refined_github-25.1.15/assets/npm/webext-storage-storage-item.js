import chromeP from './webext-polyfill-kinda.js';

class StorageItem {
    key;
    area;
    defaultValue;
    onChange = this.onChanged;
    constructor(key, { area = 'local', defaultValue, } = {}) {
        this.key = key;
        this.area = area;
        this.defaultValue = defaultValue;
    }
    get = async () => {
        const result = await chromeP.storage[this.area].get(this.key);
        if (!Object.hasOwn(result, this.key)) {
            return this.defaultValue;
        }
        return result[this.key];
    };
    set = async (value) => {
        await chromeP.storage[this.area].set({ [this.key]: value });
    };
    remove = async () => {
        await chromeP.storage[this.area].remove(this.key);
    };
    onChanged(callback, signal) {
        const changeHandler = (changes, area) => {
            const changedItem = changes[this.key];
            if (area === this.area && changedItem) {
                callback(changedItem.newValue);
            }
        };
        chrome.storage.onChanged.addListener(changeHandler);
        signal?.addEventListener('abort', () => {
            chrome.storage.onChanged.removeListener(changeHandler);
        }, {
            once: true,
        });
    }
}

export { StorageItem };
