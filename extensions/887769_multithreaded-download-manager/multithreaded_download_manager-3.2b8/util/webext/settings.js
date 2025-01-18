import { mapInsert } from "../util.js";
import { SimpleEventListener } from "../event.js";
export class LocalSettings {
    constructor(data) {
        // EventTarget
        this.listeners = new Map();
        this.data = data;
        this.initialization = browser.storage.local.get().then(v => { Object.assign(data, v); });
        browser.storage.onChanged.addListener((changes, areaName) => {
            if (areaName !== 'local')
                return;
            for (const key in changes) {
                Object.assign(data, { [key]: changes[key].newValue });
                const listener = this.listeners.get(key);
                try {
                    if (listener)
                        listener.dispatch(data[key]);
                }
                catch { }
            }
        });
    }
    post(data) { return browser.storage.local.set(data); }
    listen(key, fn, skipCall) {
        const result = mapInsert(this.listeners, key, () => new SimpleEventListener).listen(fn);
        if (!skipCall)
            this.initialization.then(() => fn(this.data[key]));
        return result;
    }
}
export class RemoteSettings {
    constructor(sharedPrototype) {
        this.sharedPrototype = sharedPrototype;
    }
    async load(keys = null) {
        const result = await browser.storage.local.get(keys);
        Object.setPrototypeOf(result, this.sharedPrototype);
        return result;
    }
    async get(key) { return (await this.load([key]))[key]; }
    async set(data) { await browser.storage.local.set(data); }
}
