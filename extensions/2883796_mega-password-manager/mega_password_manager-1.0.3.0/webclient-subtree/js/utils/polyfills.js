/**
 * @file Browser polyfills
 * @desc This is the only file where we're allowed to extend native prototypes, as required for polyfills.
 *//* eslint-disable no-extend-native */

/** document.exitFullScreen polyfill */
mBroadcaster.once('startMega', function() {
    'use strict';

    if (typeof document.exitFullscreen !== 'function') {
        document.exitFullscreen = document.mozCancelFullScreen
            || document.webkitCancelFullScreen || document.msExitFullscreen || function() {};
    }
});

mBroadcaster.once('boot_done', function() {
    'use strict';

    // Pragmatic Device Memory API Polyfill...
    // https://caniuse.com/#search=deviceMemory
    if (navigator.deviceMemory === undefined) {
        lazy(navigator, 'deviceMemory', function() {
            var value = 0.5;
            var uad = ua.details || false;

            if (uad.engine === 'Gecko') {
                value = 1 + uad.is64bit;

                if (parseInt(uad.version) > 67) {
                    value *= 3;
                }
            }
            else if (uad.is64bit) {
                value = 2;
            }

            return value;
        });
    }
});

if (typeof window.queueMicrotask !== "function") {
    const tbsp = Promise.resolve();

    window.queueMicrotask = (callback) => {
        'use strict';
        tbsp.then(callback);
    };
}

if (typeof window.reportError !== "function") {

    window.reportError = (exception) => {
        'use strict';
        queueMicrotask(() => {
            // reach window.onerror
            throw exception;
        });
    };
}

if (typeof structuredClone !== 'function') {

    lazy(self, 'structuredClone', () => {
        'use strict';
        console.warn('Using weak structuredClone() method...', ua.details.prod);
        return window.Dexie && Dexie.deepClone || window.clone;
    });
}

if (typeof requestIdleCallback !== 'function') {

    Object.defineProperties(self, {
        requestIdleCallback: {
            value(handler) {
                'use strict';
                const startTime = performance.now();
                return gSetTimeout(() => {
                    handler({
                        didTimeout: false,
                        timeRemaining() {
                            return Math.max(0, 50.0 - (performance.now() - startTime));
                        }
                    });
                }, 1);
            }
        },
        cancelIdleCallback: {
            value(id) {
                'use strict';
                gClearTimeout(id);
            }
        }
    });
}

if (Object.fromEntries === undefined) {
    Object.defineProperty(Object, 'fromEntries', {
        value(iter) {
            'use strict';
            return [...iter].reduce((obj, [k, v]) => ({...obj, [k]: v}), {});
        }
    });
}

/**
if (Object.hasOwn === undefined) {
    Object.defineProperty(Object, 'hasOwn', {
        value(o, p) {
            'use strict';
            return Object.hasOwnProperty.call(o, p);
        }
    });
}
/**/

(() => {
    'use strict';
    Promise.prototype.always = function(fc) {
        return this.then(fc).catch(fc);
    };
    Promise.prototype.dump = function(tag) {
        // XXX: No more then/catch after invoking this!
        this.then(console.debug.bind(console, tag || 'OK'))
            .catch(console.warn.bind(console, tag || 'FAIL'));
        return this;
    };
    Promise.lock = function({name, resolve, reject, handler}) {
        const rack = [[resolve], [reject || dump]];

        const wrap = (type, i) => (a0) => {
            type = rack[type];
            i = type.length;
            while (i--) {
                type[i](a0);
            }
        };
        const push = (type, callback) => wrap(type, rack[type].push(callback));

        return mutex(name, (resolve, reject, a0) => handler(push(0, resolve), push(1, reject), a0));
    };

    if (Promise.prototype.finally === undefined) {
        // this must actually only be needed for the embed-player.
        Promise.prototype.finally = function(cb) {
            return this.then(
                (res) => Promise.resolve(cb()).then(() => res),
                (ex) => Promise.resolve(cb())
                    .then(() => {
                        throw ex;
                    }));
        };
    }

    if (Promise.allSettled === undefined) {
        Promise.allSettled = function(promises) {
            var done = function(result) {
                return {status: 'fulfilled', value: result};
            };
            var fail = function(result) {
                return {status: 'rejected', reason: result};
            };
            var map = function(value) {
                return Promise.resolve(value).then(done).catch(fail);
            };
            return Promise.all(promises.map(map));
        };
    }

    if (Promise.withResolvers === undefined) {
        Promise.withResolvers = function() {
            let resolve, reject;
            const promise = new Promise((res, rej) => {
                reject = rej;
                resolve = res;
            });
            return {promise, resolve, reject};
        };
    }

    if (!Array.prototype.flat) {
        const reduce = Array.prototype.reduce;
        const concat = Array.prototype.concat.bind([]);
        Object.defineProperty(Array.prototype, 'flat', {
            configurable: !!window.is_karma,
            value: function flat(depth = 1) {
                return depth < 2 ? depth ? concat(...this) : this
                    : reduce.call(this, (a, o) =>
                        (Array.isArray(o) && a.push(...flat.call(o, depth - 1)) || a.push(o)) && a, []);
            }
        });
    }

    if (!Array.prototype.flatMap) {
        Object.defineProperty(Array.prototype, 'flatMap', {
            configurable: !!window.is_karma,
            value(cb, s) {
                return this.map(cb.bind(s || this)).flat();
            }
        });
    }

    if (!Array.prototype.findLast) {
        Object.defineProperty(Array.prototype, 'findLast', {
            configurable: !!window.is_karma,
            value(callback) {
                for (let i = this.length; i--;) {
                    if (callback(this[i], i, this)) {
                        return this[i];
                    }
                }
            }
        });
    }
})();

mBroadcaster.once('boot_done', tryCatch(() => {
    'use strict';
    // Based on code from https://github.com/yume-chan/ya-webadb/
    // @todo Remove once we bump to Safari 15+

    if (!DataView.prototype.setBigUint64) {
        const UINT32_SHIFT = BigInt(32);

        Object.defineProperties(DataView.prototype, {
            setBigUint64: {
                value(offset, value, le) {
                    const hi = Number(value >> UINT32_SHIFT);
                    const lo = Number(BigInt.asUintN(32, value));
                    const [h, l] = le ? [4, 0] : [0, 4];

                    this.setUint32(offset + h, hi, le);
                    this.setUint32(offset + l, lo, le);
                }
            },
            setBigInt64: {
                value(offset, value, le) {
                    const hi = Number(value >> UINT32_SHIFT);
                    const lo = Number(BigInt.asUintN(32, value));
                    const [h, l] = le ? [4, 0] : [0, 4];

                    this.setInt32(offset + h, hi, le);
                    this.setUint32(offset + l, lo, le);
                }
            },
            getBigUint64: {
                value(offset, le) {
                    const bem = Number(!le);
                    const lem = Number(!!le);

                    const hi = this.getUint32(offset, le);
                    const lo = this.getUint32(offset + 4, le);

                    return BigInt(hi * bem + lo * lem) << UINT32_SHIFT | BigInt(hi * lem + lo * bem);
                }
            },
            getBigInt64: {
                value(offset, le) {
                    const bem = Number(!le);
                    const lem = Number(!!le);

                    const hi = BigInt(this.getInt32(offset, le) * bem + this.getInt32(offset + 4, le) * lem);
                    const lo = BigInt(this.getUint32(offset, le) * lem + this.getUint32(offset + 4, le) * bem);

                    return hi << UINT32_SHIFT | lo;
                }
            }
        });
    }
}));

mBroadcaster.once('boot_done', tryCatch(() => {
    'use strict';
    if (!window.ReadableStream) {
        console.error('ReadableStream is not available.');
        return;
    }

    // https://github.com/whatwg/streams/issues/1019
    if (!Object.hasOwnProperty.call(ReadableStream.prototype, 'arrayBuffer')) {
        let shim = async function() {
            return new Response(this).arrayBuffer();
        };
        if ('WebStreamsPolyfill' in window) {
            if (window.ReadableStream !== window.WebStreamsPolyfill.ReadableStream) {
                console.error('Unexpected ReadableStream instance.');
                return;
            }

            shim = async function() {
                let size = 0;
                const chunks = [];
                for await (const chunk of this) {
                    chunks.push(chunk);
                    size += chunk.byteLength;
                }
                const res = new Uint8Array(size);

                for (let i = 0, offset = 0; i < chunks.length; ++i) {
                    res.set(chunks[i], offset);
                    offset += chunks[i].byteLength;
                }
                chunks.length = 0;
                return res.buffer;
            };
        }
        Object.defineProperty(ReadableStream.prototype, 'arrayBuffer', {
            value: shim,
            writable: true,
            configurable: true
        });
    }
}));

mBroadcaster.once('boot_done', function() {
    'use strict';
    var mg;

    // Check whether the running browser is ES2019 compliant by testing RegExp's Look-behind Assertions.
    try {
        mg = '<foo one>m1</foo><foo doh>:</foo><foo two>m2</foo>'.match(RegExp('(?<=foo (?:one|two)>)([^<]+)', 'g'));
    }
    catch (ex) {}

    Object.defineProperty(mega, 'es2019', {value: mg && mg.length === 2 && mg[0] === 'm1' && mg[1] === 'm2'});
});

mBroadcaster.once('startMega', tryCatch(() => {
    'use strict';
    const {mecmatst} = sessionStorage;
    const {buildOlderThan10Days, eventlog = nop, is_karma} = window;

    if (is_karma) {
        return;
    }
    scriptTest(
        'megaecmastest = window.foo?.bar ?? -1',
        (error) => {
            if (error || window.megaecmastest !== -1) {
                return mecmatst || eventlog(99777, JSON.stringify([1, 1]));
            }

            delete window.megaecmastest;
            Object.defineProperty(mega, 'es2020', {value: true});
        });

    if (buildOlderThan10Days || mecmatst) {
        return;
    }
    sessionStorage.mecmatst = 1;

    if (typeof BigInt === 'undefined') {
        eventlog(99778, JSON.stringify([1, 2]));
    }
    else {
        scriptTest(
            'megaecmabitest = BigInt(Math.pow(2, 48)) << 16n === 18446744073709551616n',
            (error) => {
                if (error || window.megaecmabitest !== true) {
                    eventlog(99778, JSON.stringify([1, 3]));
                }
                delete window.megaecmabitest;
            });
    }
}));

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// {{{ BEGIN: Helpers, with direct dependency on polyfills or latest ECMAScript

if (typeof WeakRef === 'undefined') {
    const wm = new WeakMap();

    WeakRef = class {
        constructor(ref) {
            wm.set(this, ref);
        }
        deref() {
            return wm.get(this);
        }
    };
}

class IWeakSet extends Set {
    add(obj) {
        if (!this.has(obj)) {
            super.add(new WeakRef(obj));
        }
    }
    has(obj) {
        for (const value of this) {
            if (value === obj) {
                return true;
            }
        }
    }
    delete(obj) {
        for (const ref of super.values()) {
            if (obj === ref || ref.deref() === obj) {
                super.delete(ref);
                return true;
            }
        }
    }
    remove(set) {
        for (const ref of super.values()) {
            if (set.has(ref.deref())) {
                super.delete(ref);
            }
        }
        set.clear();
    }
    get size() {
        const result = [...this].length;
        if (d && super.size !== result) {
            console.warn('IWeakSet: Garbage collection took action (%s/%s)', result, super.size, this);
        }
        return result;
    }
    *[Symbol.iterator]() {
        for (const ref of super.values()) {
            const value = ref.deref();
            if (value) {
                yield value;
            }
        }
    }
    get [Symbol.toStringTag]() {
        return 'IWeakSet';
    }
}

class IWeakMap extends IWeakSet {
    constructor() {
        super();
        Object.defineProperty(this, 'wm', {value: new WeakMap});
    }
    set(key, value) {
        super.add(key);
        this.wm.set(key, value);
        return this;
    }
    get(key) {
        return this.wm.get(key);
    }
    has(key) {
        return this.wm.has(key);
    }
    delete(key) {
        super.delete(key);
        return this.wm.delete(key);
    }
    *[Symbol.iterator]() {
        for (const ref of super.values()) {
            const key = ref.deref();
            if (!key) {
                super.delete(ref);
            }
            else if (this.wm.has(key)) {
                const value = [key, this.wm.get(key)];
                yield value;
            }
        }
    }
    get [Symbol.toStringTag]() {
        return 'IWeakMap';
    }
}

/** Very simple LRU using Map() */
class LRUMap extends Map {
    constructor(capacity = 250, notifier = null) {
        super();
        Object.defineProperty(this, 'capacity', {value: capacity});
        Object.defineProperty(this, 'notifier', {value: notifier || self.d > 1 && dump.bind(null, [this])});
    }
    get(key) {
        if (super.has(key)) {
            const value = super.get(key);
            super.delete(key);
            super.set(key, value);
            return value;
        }
    }
    set(key, value) {
        if (this.notifier && super.has(key)) {
            this.notifier(super.get(key), key, this, true);
        }
        if (super.size === this.capacity) {
            const [[k, v]] = this;
            if (this.notifier) {
                this.notifier(v, k, this, false);
            }
            super.delete(k);
        }
        super.set(key, value);
    }

    get [Symbol.toStringTag]() {
        return 'LRUMap';
    }
}

class LRULapse extends LRUMap {
    constructor(seconds = 8, capacity = 15, notifier = null) {
        super(capacity, notifier);
        Object.defineProperty(this, 'lapse', {value: seconds});
    }

    get [Symbol.toStringTag]() {
        return 'LRULapse';
    }

    has(key) {
        if (super.has(key)) {
            const {lapse} = super.get(key);

            if (lapse > Date.now()) {
                return true;
            }

            super.delete(key);
            return false;
        }
    }

    get(key) {
        // xxx: we shall require has() always precedes a call to
        // get(), otherwise we will unnecessarily invoke it twice.
        if (super.has(key)) {
            return super.get(key).value;
        }
    }

    set(key, value, lapse) {
        return super.set(key, {value, lapse: Date.now() + (lapse || this.lapse) * 1e3});
    }
}

class MapSet extends LRUMap {
    get [Symbol.toStringTag]() {
        return 'MapSet';
    }

    set(key, value) {
        if (!super.has(key)) {
            super.set(key, new Set());
        }
        const set = super.get(key);

        set.add(value);
        return set.size;
    }

    find(key, callback) {
        if (super.has(key)) {
            const set = super.get(key);

            for (const value of set) {
                if (callback(value)) {
                    return value;
                }
            }
        }
    }

    size(value) {
        return (super.get(value) || !1).size | 0;
    }
}

/**
 * Instantiate a sub-class, similar to our inherits() but with es6 classes.
 * @param {String} name The name of the class
 * @param {Object} sup The instance of inherit from
 * @param {Object} [target] where to define the property
 * @returns {class} the dynamically created class
 */
const mSubClass = (name, sup, target) => {
    'use strict';

    const cl = {
        [name]:
            class extends sup {
                constructor(...args) {
                    super(...args);
                    this.name = name;
                }
            }
    }[name];

    if (target !== null) {
        Object.defineProperty(target || window, name, {value: cl});
    }

    return cl;
};

/**
 * Helper to mimic async functions.
 * @param {Function} fc function method.
 * @returns {function(...[*]): Promise<void>} promise
 * @deprecated Use async/await instead.
 */
function promisify(fc) {
    'use strict';
    const a$yncMethod = function(...args) {
        return new Promise((resolve, reject) => {
            const result = a$yncMethod.__function__.apply(this, [resolve, reject, ...args]);
            if (result instanceof Promise) {
                if (d > 2) {
                    console.assert(a$yncMethod.__function__[Symbol.toStringTag] === "AsyncFunction");
                }
                result.catch(reject);
            }
        });
    };
    a$yncMethod.prototype = undefined;
    Object.defineProperty(fc, '__method__', {value: a$yncMethod});
    Object.defineProperty(a$yncMethod, '__function__', {value: fc});
    return a$yncMethod;
}

/**
 * Mutex impl. for Promises.
 * @param {String} [name] unique lock name
 * @param {Function} handler function dispatcher.
 * @returns {function(...[*]): Promise<void>} promise.
 */
function mutex(name, handler) {
    'use strict';
    if (typeof name === 'function') {
        handler = name;
        name = null;
    }
    const mMutexMethod = function(...args) {
        name = name || this.__mutex_lock_name_$;
        if (!name) {
            name = (this.constructor.name || '$') + makeUUID().slice(-13);
            Object.defineProperty(this, '__mutex_lock_name_$', {value: name});
        }
        return new Promise((resolve, reject) => {
            mutex.lock(name).then((unlock) => {
                const rej = (a0) => unlock().then(() => reject(a0));
                const res = (a0) => unlock().then(() => resolve(a0));
                return mMutexMethod.__function__.apply(this, [res, rej, ...args]);
            }).catch((ex) => {
                console.error(ex);
                mutex.unlock(name).finally(reject.bind(null, ex));
            });
        });
    };
    mMutexMethod.prototype = undefined;
    Object.defineProperty(handler, '__method__', {value: mMutexMethod});
    Object.defineProperty(mMutexMethod, '__name__', {value: name});
    Object.defineProperty(mMutexMethod, '__function__', {value: handler});
    return Object.freeze(mMutexMethod);
}

mutex.queue = Object.create(null);
mutex.lock = promisify((resolve, reject, name) => {
    'use strict';
    resolve = resolve.bind(null, mutex.unlock.bind(mutex, name));

    if (mutex.queue[name]) {
        mutex.queue[name].push(resolve);
    }
    else {
        mutex.queue[name] = [];
        resolve();
    }
});
mutex.unlock = async(name) => {
    'use strict';
    const next = (mutex.queue[name] || []).shift();
    if (next) {
        queueMicrotask(next);
    }
    else {
        delete mutex.queue[name];
    }
};
Object.freeze(mutex);

/** @property mega.promise */
Object.defineProperty(mega, 'promise', {
    get() {
        'use strict';
        const {promise, resolve, reject} = Promise.withResolvers();
        return Object.defineProperties(promise, {
            reject: {value: reject},
            resolve: {value: resolve}
        });
    }
});

/** @property window.SyntaxError */
/** @property window.SecurityError */
tryCatch((mock) => {
    'use strict';
    mock('SyntaxError');
    mock('SecurityError');
})(async(name) => {
    'use strict';
    if (window[name] === undefined || !tryCatch(() => new window[name]('test'), false)()) {
        mSubClass(name, Error);
    }
});

/** @function window.deepFreeze */
lazy(self, 'deepFreeze', () => {
    'use strict';
    let refs = null;
    const freeze = tryCatch((o) => self.freeze(o));
    const TypedArray = Object.getPrototypeOf(Uint16Array);
    const innerDeepFreeze = (obj) => {
        if (!obj || typeof obj !== 'object' && typeof obj !== 'function' || refs.has(obj)) {

            return obj;
        }
        refs.add(obj);

        if (!Object.isExtensible(obj) || obj instanceof TypedArray) {

            return obj;
        }

        if (Array.isArray(obj)) {

            for (let i = obj.length; i--;) {

                obj[i] = innerDeepFreeze(obj[i]);
            }
        }
        else {
            const ownKeys = Reflect.ownKeys(obj);

            for (let i = ownKeys.length; i--;) {
                const p = ownKeys[i];

                if (Reflect.getOwnPropertyDescriptor(obj, p).value) {

                    innerDeepFreeze(obj[p]);
                }
            }
        }

        return freeze(obj) || obj;
    };

    return (obj) => {
        refs = new WeakSet();
        const rv = tryCatch(innerDeepFreeze)(obj);
        refs = null;
        return rv || false;
    };
});

// }}} END: Helpers, with direct dependency on polyfills or latest ECMAScript
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

if (!self.is_karma && self.LockManager && navigator.locks instanceof self.LockManager) {
    self.mutex = (name, handler) => {
        'use strict';
        return function(...args) {
            // console.warn(`mutex-lock.${name}`, args);
            return navigator.locks.request(`mega-mutex:${name}`, async() => {
                const {promise, resolve, reject} = Promise.withResolvers();
                Promise.resolve(handler.apply(this, [resolve, reject, ...args])).catch(reject);
                return promise;
            });
        };
    };
    self.mutex.lock = async(name) => {
        'use strict';
        const {promise, resolve: lockResolver} = Promise.withResolvers();
        navigator.locks.request(`mega-mutex-lock:${name}`, async() => {
            const {promise, resolve} = Promise.withResolvers();
            const unlock = async() => resolve();
            // @todo this could lead to deadlocks, but just like the former mutex.lock()..
            // locker.finally(unlock);
            lockResolver(unlock);
            return promise;
        });
        return promise;
    };
}
else if (!navigator.locks) {
    // Web Locks API Shim.
    Object.defineProperty(navigator, 'locks', {
        value: freeze({
            async query() {
                'use strict';
                const held = [];
                const pending = [];
                const add = (where, name) => where.push({clientId: requesti, mode: 'exclusive', name});

                for (const name in mutex.queue) {
                    add(held, name);
                    for (let i = mutex.queue[name].length; i--;) {
                        add(pending, name);
                    }
                }
                return {held, pending};
            },

            async request(name, callback) {
                'use strict';
                assert(typeof callback === 'function', 'The options parameter is not supported.');
                return mutex(`web-lock:${name}`, (resolve, reject) => {
                    // navigator.locks.query().dump('l.query')
                    Promise.resolve(callback()).then(resolve).catch(reject);
                })();
            }
        })
    });
}

function mWebLockWrap(proto, method, name) {
    'use strict';

    const func = proto[method];
    const ident = name || makeUUID();

    proto[method] = async function(...args) {
        const name = this.__ident_0 || ident;

        // eslint-disable-next-line compat/compat
        return navigator.locks.request(name, async(lock) => {
            if (d > 1) {
                console.debug(`web-lock '${name}' acquired...`, lock, args);
            }
            return func.apply(this, args);
        });
    };
}

tryCatch(() => {
    'use strict';

    if (self.is_karma) {
        Object.freeze = echo;
    }
    if (!self.mShowAds) {
        Object.freeze(Object);
    }

}, false)();
