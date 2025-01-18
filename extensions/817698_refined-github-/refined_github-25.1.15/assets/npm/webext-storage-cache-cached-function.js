import toMilliseconds from './@sindresorhus-to-milliseconds.js';
import cache, { _get, timeInTheFuture } from './webext-storage-cache-legacy.js';

function getUserKey(name, cacheKey, arguments_) {
    if (!cacheKey) {
        if (arguments_.length === 0) {
            return name;
        }
        cacheKey = JSON.stringify;
    }
    return `${name}:${cacheKey(arguments_)}`;
}
class CachedFunction {
    name;
    options;
    maxAge;
    staleWhileRevalidate;
    get = (async (...arguments_) => {
        const getSet = async (userKey, arguments__) => {
            const freshValue = await this.#updater(...arguments__);
            if (freshValue === undefined) {
                await cache.delete(userKey);
                return;
            }
            const milliseconds = toMilliseconds(this.maxAge) + toMilliseconds(this.staleWhileRevalidate);
            return cache.set(userKey, freshValue, { milliseconds });
        };
        const memoizeStorage = async (userKey, ...arguments__) => {
            const cachedItem = await _get(userKey, false);
            if (cachedItem === undefined || this.#shouldRevalidate?.(cachedItem.data)) {
                return getSet(userKey, arguments__);
            }
            if (timeInTheFuture(this.staleWhileRevalidate) > cachedItem.maxAge) {
                setTimeout(getSet, 0, userKey, arguments__);
            }
            return cachedItem.data;
        };
        const userKey = getUserKey(this.name, this.#cacheKey, arguments_);
        const cached = this.#inFlightCache.get(userKey);
        if (cached) {
            return cached;
        }
        const promise = memoizeStorage(userKey, ...arguments_);
        this.#inFlightCache.set(userKey, promise);
        const del = () => {
            this.#inFlightCache.delete(userKey);
        };
        promise.then(del, del);
        return promise;
    });
    #updater;
    #cacheKey;
    #shouldRevalidate;
    #inFlightCache = new Map();
    constructor(name, options) {
        this.name = name;
        this.options = options;
        this.#cacheKey = options.cacheKey;
        this.#updater = options.updater;
        this.#shouldRevalidate = options.shouldRevalidate;
        this.maxAge = options.maxAge ?? { days: 30 };
        this.staleWhileRevalidate = options.staleWhileRevalidate ?? { days: 0 };
    }
    async getCached(...arguments_) {
        const userKey = getUserKey(this.name, this.#cacheKey, arguments_);
        return cache.get(userKey);
    }
    async applyOverride(arguments_, value) {
        if (arguments.length === 0) {
            throw new TypeError('Expected a value to be stored');
        }
        const userKey = getUserKey(this.name, this.#cacheKey, arguments_);
        return cache.set(userKey, value, this.maxAge);
    }
    async getFresh(...arguments_) {
        if (this.#updater === undefined) {
            throw new TypeError('Cannot get fresh value without updater');
        }
        const userKey = getUserKey(this.name, this.#cacheKey, arguments_);
        return cache.set(userKey, await this.#updater(...arguments_));
    }
    async delete(...arguments_) {
        const userKey = getUserKey(this.name, this.#cacheKey, arguments_);
        return cache.delete(userKey);
    }
    async isCached(...arguments_) {
        return (await this.get(...arguments_)) !== undefined;
    }
}

export { CachedFunction as default };
