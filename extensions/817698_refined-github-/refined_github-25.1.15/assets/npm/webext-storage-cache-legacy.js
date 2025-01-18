import chromeP from './webext-polyfill-kinda.js';
import { isExtensionContext, isBackgroundPage } from './webext-detect.js';
import toMilliseconds from './@sindresorhus-to-milliseconds.js';

const cacheDefault = { days: 30 };
function timeInTheFuture(time) {
    return Date.now() + toMilliseconds(time);
}
async function has(key) {
    return (await _get(key, false)) !== undefined;
}
async function _get(key, remove) {
    const internalKey = `cache:${key}`;
    const storageData = await chromeP.storage.local.get(internalKey);
    const cachedItem = storageData[internalKey];
    if (cachedItem === undefined) {
        return;
    }
    if (Date.now() > cachedItem.maxAge) {
        if (remove) {
            await chromeP.storage.local.remove(internalKey);
        }
        return;
    }
    return cachedItem;
}
async function get(key) {
    const cachedValue = await _get(key, true);
    return cachedValue?.data;
}
async function set(key, value, maxAge = cacheDefault) {
    if (arguments.length < 2) {
        throw new TypeError('Expected a value as the second argument');
    }
    if (value === undefined) {
        await delete_(key);
    }
    else {
        const internalKey = `cache:${key}`;
        await chromeP.storage.local.set({
            [internalKey]: {
                data: value,
                maxAge: timeInTheFuture(maxAge),
            },
        });
    }
    return value;
}
async function delete_(userKey) {
    const internalKey = `cache:${userKey}`;
    return chromeP.storage.local.remove(internalKey);
}
async function deleteWithLogic(logic) {
    const wholeCache = (await chromeP.storage.local.get());
    const removableItems = [];
    for (const [key, value] of Object.entries(wholeCache)) {
        if (key.startsWith('cache:') && (logic?.(value) ?? true)) {
            removableItems.push(key);
        }
    }
    if (removableItems.length > 0) {
        await chromeP.storage.local.remove(removableItems);
    }
}
async function deleteExpired() {
    await deleteWithLogic(cachedItem => Date.now() > cachedItem.maxAge);
}
async function clear() {
    await deleteWithLogic();
}
const cache = {
    has,
    get,
    set,
    clear,
    delete: delete_,
};
function init() {
    if (isExtensionContext()) {
        globalThis.webextStorageCache = cache;
    }
    if (!isBackgroundPage()) {
        return;
    }
    if (chrome.alarms) {
        void chrome.alarms.create('webext-storage-cache', {
            delayInMinutes: 1,
            periodInMinutes: 60 * 24,
        });
        let lastRun = 0;
        chrome.alarms.onAlarm.addListener(alarm => {
            if (alarm.name === 'webext-storage-cache'
                && lastRun < Date.now() - 1000) {
                lastRun = Date.now();
                void deleteExpired();
            }
        });
    }
    else {
        setTimeout(deleteExpired, 60_000);
        setInterval(deleteExpired, 1000 * 3600 * 24);
    }
}
init();

export { _get, cache as default, timeInTheFuture };
