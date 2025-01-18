import mimicFunction from './mimic-function.js';

const cacheStore = new WeakMap();
const cacheTimerStore = new WeakMap();
function memoize(fn, { cacheKey, cache = new Map(), maxAge, } = {}) {
    if (maxAge === 0) {
        return fn;
    }
    if (typeof maxAge === 'number') {
        const maxSetIntervalValue = 2147483647;
        if (maxAge > maxSetIntervalValue) {
            throw new TypeError(`The \`maxAge\` option cannot exceed ${maxSetIntervalValue}.`);
        }
        if (maxAge < 0) {
            throw new TypeError('The `maxAge` option should not be a negative number.');
        }
    }
    const memoized = function (...arguments_) {
        const key = cacheKey ? cacheKey(arguments_) : arguments_[0];
        const cacheItem = cache.get(key);
        if (cacheItem) {
            return cacheItem.data;
        }
        const result = fn.apply(this, arguments_);
        cache.set(key, {
            data: result,
            maxAge: maxAge ? Date.now() + maxAge : Number.POSITIVE_INFINITY,
        });
        if (typeof maxAge === 'number' && maxAge !== Number.POSITIVE_INFINITY) {
            const timer = setTimeout(() => {
                cache.delete(key);
            }, maxAge);
            timer.unref?.();
            const timers = cacheTimerStore.get(fn) ?? new Set();
            timers.add(timer);
            cacheTimerStore.set(fn, timers);
        }
        return result;
    };
    mimicFunction(memoized, fn, {
        ignoreNonConfigurable: true,
    });
    cacheStore.set(memoized, cache);
    return memoized;
}
function memoizeDecorator(options = {}) {
    const instanceMap = new WeakMap();
    return (target, propertyKey, descriptor) => {
        const input = target[propertyKey];
        if (typeof input !== 'function') {
            throw new TypeError('The decorated value must be a function');
        }
        delete descriptor.value;
        delete descriptor.writable;
        descriptor.get = function () {
            if (!instanceMap.has(this)) {
                const value = memoize(input, options);
                instanceMap.set(this, value);
                return value;
            }
            return instanceMap.get(this);
        };
    };
}

export { memoize as default, memoizeDecorator };
