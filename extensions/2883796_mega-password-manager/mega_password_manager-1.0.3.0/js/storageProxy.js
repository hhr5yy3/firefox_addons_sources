((global) => {

    'use strict';

    global.storageReady = false;

    // Polyfills for window.localStorage as synchronous version of chrome.storage.local
    class LocalStorageProxy {

        constructor() {

            chrome.storage.local.get().then(res => {
                Object.keys(res).forEach(key => {
                    this[key] = res[key];
                });
                global.storageReady = true;
                onIdle(() => {
                    mBroadcaster.sendMessage('storageReady');
                });
            });
        }

        clear() {
            chrome.storage.local.clear();
        }

        getItem(key) {
            return this[key];
        }

        key(index) {
            return Object.keys(this)[index];
        }

        setItem(key, value) {
            this[key] = value;
            chrome.storage.local.set({[key]: value});
        }

        removeItem(key) {
            chrome.storage.local.remove(key);
        }

        get length() {
            return Object.keys(this).length;
        }
    }

    const _localStorageProxy = new LocalStorageProxy();

    Object.defineProperty(global, 'localStorage', {value: new Proxy(_localStorageProxy, {
        set: (target, property, value) => {
            if (!storageReady) {
                console.error('Cannot use localStorage property while storage is not ready');
            }
            target.setItem(property, value);
            return true;
        },
        get: (target, property) => {
            if (!storageReady) {
                console.error('Cannot use localStorage property while storage is not ready');
            }
            return target.getItem(property);
        },
        deleteProperty(target, property) {
            if (!storageReady) {
                console.error('Cannot use localStorage property while storage is not ready');
            }
            target.removeItem(property);
            return true;
        }
    })});

    chrome.storage.onChanged.addListener((changes, namespace) => {

        if (namespace === 'local') {
            for (const [key, {newValue}] of Object.entries(changes)) {
                if (newValue === undefined) {
                    delete _localStorageProxy[key];
                }
                else {
                    _localStorageProxy[key] = newValue;
                }
            }
        }
    });
})(this);
