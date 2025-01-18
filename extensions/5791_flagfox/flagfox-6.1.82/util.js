"use strict";  // Use ES5 strict mode for everything

// CAUTION: All WebExtension background scripts are dumped into one context; namespace pollution risks must be taken into consideration.
// CAUTION: WebExtension script declaration order matters; this file MUST be listed first in manifest.json / HTML includes.
// NOTICE:  This file contains only constants and methods, such that it is safe to include in background scripts, worker scripts, and HTML scripts.
//          This file is also designed to be generic, with no addon specific content, so it can be easily reused without modification, if needed.

// Global debug flag  // TASK: Obviously, disable this for releases
const debug = 0;      /* 0 */     /* 1 */    /* 2 */   /* 3 */  /* 4 */  /* 5 */
const debug_levels = ["disabled", "logging", "events", "menus", "cache", "traffic"];

//BEGIN SIMPLE HELPER FUNCTIONS/CONSTANTS *************************************
//{{{

const Nothing = (() => {});
const Identity = (x => x);

const maybe     = (x => (x ? x : undefined));
const maybeBool = (x => (x ? true : undefined));

//}}}
//BEGIN DEBUG LOGGING FUNCTIONS ***********************************************
//{{{

const isDebugLevelEnabled = (debug ? (name => (debug_levels.indexOf(name) <= debug)) : (() => false));

// NOTE: console.assert() doesn't actually throw an exception like one would normally expect an "assert" to do
function assert(expectation, message, ...args) {  // Rest parameter
    if (expectation)
        return;
    message = "ASSERTION FAILED: " + message;
    console.error(message, ...args);  // Spread syntax
    throw new Error(message.dropSuffix(":"));
}

const debugAssert = (debug ? assert : Nothing);

// NOTE: console.* methods can take objects as additional parameters which will be dumped to the console for full inspection
const debugLog   = (debug ? console.log   : Nothing);
const debugWarn  = (debug ? console.warn  : Nothing);
const debugError = (debug ? console.error : Nothing);

const debugLog_events  = (isDebugLevelEnabled("events")  ? ((...args) => console.info("[EVENTS]",  ...args)) : Nothing);
const debugLog_cache   = (isDebugLevelEnabled("cache")   ? ((...args) => console.info("[CACHE]",   ...args)) : Nothing);
const debugLog_menus   = (isDebugLevelEnabled("menus")   ? ((...args) => console.info("[MENUS]",   ...args)) : Nothing);
const debugLog_traffic = (isDebugLevelEnabled("traffic") ? ((...args) => console.info("[TRAFFIC]", ...args)) : Nothing);

//}}}
//BEGIN TYPE ASSESSMENT FUNCTIONS *********************************************
//{{{

const isBoolean  = (x => (typeof x === "boolean"));
const isNumber   = (x => (typeof x === "number"));
const isString   = (x => (typeof x === "string"));
const isFunction = (x => (typeof x === "function"));

const isInteger = Number.isInteger;
const isArray = Array.isArray;

const isSet = (x => (x instanceof Set));
const isMap = (x => (x instanceof Map));

const isRegExp = (x => (x instanceof RegExp));

// NOTE: Due to permanent JS design flaws from its creation in 1995, 'typeof' is insufficient to detect a plain object, as 'typeof null === "object"' and 'typeof [] === "object"'
const isObject = (x => (typeof x === "object" && x !== null && !isArray(x)));  // NOTE: Set/Map are also considered objects, here; everything in JS is an object... sorta

const isNonEmptyString = ((x,min=1) => (isString(x) && x.length >= min));  // Boolean("") === false
const isNonEmptyArray  = ((x,min=1) => (isArray(x)  && x.length >= min));  // Boolean([]) === true

const isNonEmptySet = ((x,min=1) => (isSet(x) && x.size >= min));
const isNonEmptyMap = ((x,min=1) => (isMap(x) && x.size >= min));

const isIntegerInRange = ((x,a,b) => (isInteger(x) && a <= x && x <= b));

//}}}
//BEGIN GENERAL HELPER FUNCTIONS **********************************************
//{{{

// Makes an arbitrary string safe to use in regular expressions or JS eval of some form
const escapableChars = (/\W/g);  // NOTE: Defining regular expressions once, outside of functions/loops, is better for performance
const escapeJSstring = (str => str.replace(escapableChars, "\\$&"));

const maybeArray = (x => ((x === undefined || x === null) ? [] : (isArray(x) ? x : [x])));

// Creates an array of integers from 'a' to 'b', inclusive
function range(a,b) {
    const r = new Array(b-a+1).fill(0);  // Must fill with a value to be accessible via Array methods (ideally, of the same type to be used)
    r.forEach((u,i,s) => (s[i] = i+a));  // Use of the self-reference 's' is faster than 'r' (forEach is also faster than map, as it updates in-place)
    return r;
}

const matchLineStart = (/^/gm);
function objToSimpleString(obj,indent=4) {  // Optional indent is a number of spaces or specific string
    if (isInteger(indent))
        indent = String(" ").repeat(indent);
    let doIndent = Identity;
    if (isString(indent))
        doIndent = (str => str.replace(matchLineStart, indent));
    const lines = [];
    for (let [p,v] of Object.entries(obj)) {
        if (isObject(v))
            lines.push(p + ":\n" + objToSimpleString(v));
        else if (isArray(v))
            lines.push(p + ": [" + v.join(", ") + "]");
        else
            lines.push(p + ": " + String(v));
    }
    return doIndent(lines.join("\n"));
}

//}}}
//BEGIN ES6 PROMISE HELPERS ***************************************************
//{{{

// Returns a promise that resolves after a specified amount of time (in ms)
function sleep(t) {
    return new Promise(resolve => setTimeout(resolve,t));
}

// Executes a function at a regular interval (in ms) until it returns true or throws an exception
function repeat(interval,doJob) {
    return sleep(interval)
          .then(() => doJob() ? Promise.resolve() : repeat(interval,doJob))
          .catch(Nothing);
}

// Similar to repeat(), but with a geometrically increasing interval and a timeout (in ms; default ~1 minute)
function wait(doJob,timeout=60000) {
    let elapsed = 0, tick = 1;
    return (function tock() {
        if (doJob())
            return Promise.resolve();
        else if ((elapsed+=tick) < timeout)
            return sleep(tick*=2).then(tock).catch(Nothing);
        else
            return Promise.reject(new Error("timeout"));
    })();
}

//}}}
//BEGIN LAZY LOADING FUNCTIONS ************************************************
//{{{

// Defines a property on 'obj' named 'name' defined by the return value of function 'getter', executed on first access ('obj' may be 'this')
function defineLazyGetter(obj,name,getter) {
    Object.defineProperty(obj,name, {
        get() {
            delete obj[name];
            const value = getter.apply(obj);
            Object.defineProperty(obj,name, {
                value,
                writable: true,
                configurable: true,
                enumerable: true
            });
            return value;
        },
        configurable: true,
        enumerable: true
    });
}

// Defines a property with defineLazyGetter() that is cleared and redefined in the same manner after 'timeout' ms
function defineLazyTmpGetter(obj,name,timeout,getter) {
    defineLazyGetter(obj,name, () => {
        defineLazyGetter(obj,name,getter);
        sleep(timeout).then(() => {
            delete obj[name];
            defineLazyTmpGetter(obj,name,timeout,getter);
        });
        return obj[name];
    });
}

//}}}
//BEGIN JS DATA TYPE AUGMENTATIONS ********************************************
//{{{

// This extends built-in object prototypes in a safer way than just the old 'this.type.prototype.name = method' (e.g. avoids accidental enumerations)
function defineTypeExtension(type,name,method) {
    if (!type.prototype.hasOwnProperty(name)) {
        Object.defineProperty(type.prototype, name, {
            value: method,
            writable: false,
            configurable: false,
            enumerable: false
        });
    }
}

function defineTypeExtensions(scope,extObj) {
    for (const type of Object.keys(extObj))
        for (const name of Object.keys(extObj[type]))
            defineTypeExtension(scope[type], name, extObj[type][name]);
}

defineTypeExtensions(this, {
    String :
    {
        // The default JS string.replace() is dumb and stops after only one; Firefox 77+ supports this natively with the same syntax
        replaceAll(find,replacer) {  // Accepts a string or RegExp to find
            if (!isRegExp(find))
                find = new RegExp(escapeJSstring(String(find)),"g");
            return this.replace(find,replacer);
        },

        dropSuffix(suffix) {
            return (this.endsWith(suffix) && suffix.length) ? this.slice(0,-suffix.length) : this.valueOf();
        },

        suffixAfter(sep) {
            const pos = this.lastIndexOf(sep);
            return pos !== -1 ? this.substring(pos+sep.length) : this.valueOf();
        },

        prefixBefore(sep) {
            const pos = this.indexOf(sep);
            return pos !== -1 ? this.substring(0,pos) : this.valueOf();
        },

        // The default JS string.split() has a limit argument, but the extra is discarded, not actually returned
        splitOnce(sep) {
            const pos = this.indexOf(sep);
            return pos !== -1 ? [this.substring(0,pos), this.substring(pos+sep.length)] : [this.valueOf()];
        },

        // Returns an array of 'count' character chunks of a string (e.g. ("abcde").splitChunks(2) -> ["ab","cd","e"])
        splitChunks(count) {
            return this.match(new RegExp(".{1,"+Number(count)+"}","g"));
        },

        // Returns the total number of characters taken up by instances of the substring 'find' in this string (for the simple case of one character, this counts its use)
        countChar(find) {  // Accepts a string or RegExp to find
            return this.length - this.replaceAll(find,"").length;  // This trick is apparently the fastest way to do this
        }
    },

    Map :
    {
        getAndDelete(key) {
            const value = this.get(key);
            this.delete(key);
            return value;
        }
    },

    Array :
    {
        // Polyfill for new ES9 Array method (only for Firefox 60-61; Firefox 62+ will use native implementation)
        flat(depth=1) {
            if (depth < 1)
                return Array.from(this);
            const flattened = [].concat(...this);
            return (depth > 1 && flattened.some(isArray)) ? flattened.flat(depth-1) : flattened;
        },

        // Polyfill for new ES9 Array method (only for Firefox 60-61; Firefox 62+ will use native implementation)
        flatMap(mapFn) {
            return this.map(mapFn).flat(1);
        }
    }
});

//}}}
