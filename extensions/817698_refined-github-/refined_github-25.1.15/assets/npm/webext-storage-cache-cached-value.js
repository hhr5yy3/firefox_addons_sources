import cache from './webext-storage-cache-legacy.js';

class CachedValue {
    name;
    maxAge;
    constructor(name, options = {}) {
        this.name = name;
        this.maxAge = options.maxAge ?? { days: 30 };
    }
    async get() {
        return cache.get(this.name);
    }
    async set(value) {
        if (arguments.length === 0) {
            throw new TypeError('Expected a value to be stored');
        }
        return cache.set(this.name, value, this.maxAge);
    }
    async delete() {
        return cache.delete(this.name);
    }
    async isCached() {
        return (await this.get()) !== undefined;
    }
}

export { CachedValue as default };
