"use strict";

//BEGIN HELPER FUNCTIONS ******************************************************
//{{{

// NOTE: RegExp defined once here to avoid recompiling every time
const numeric = (/^\d+$/);
const brackets = (/[\[\]]/g);
const dots = (/\./g);
const colons = (/\:/g);

const inOfflineMode = (() => !navigator.onLine);  // Odd capitalization

// NOTE: Due to redirects and the modern lack of any practical meaning to the "www." prefix, all cached entries are stored without it
const stripWWW = (host => (host.startsWith("www.") ? host.substr(4) : host));

// Takes an HTTP request status line and returns a version number string if it's HTTP/2+
const detectModernHTTP = (status => {
    if (!status)
        return null;
    let pos = status.indexOf("HTTP/");
    if (pos === -1)
        return null;  // HTTP/0.9 or other protocol
    pos += 5;
    const major = status[pos];
    if (major === "1")
        return null;  // HTTP/1.x
    return major;     // HTTP/2, HTTP/3, ...
});

// Takes an HTTP request header object and returns true if it's for HSTS with a value of at least one day (in seconds)
const detectHSTS = (({name, value}) => (name && name.toLowerCase() === "strict-transport-security"
                                    && value && parseInt(value.substring(value.indexOf("=")+1), 10) >= 86400));

// Takes a host string and checks if it is an IP address string
const detectIP = (host => ((host.countChar(colons) >= 2 && !host.includes("@"))                // IPv6
                        || (host.countChar(dots) == 3 && numeric.test(host.suffixAfter(".")))  // IPv4
));
// Takes a host string that is a raw IP (as detected by detectIP()) and converts it to a safe/usable IP address string (IPv6 needs its brackets stripped; IPv4 shouldn't have any)
const rawIPHostToIPString = (host => host.replace(brackets, ""));

const getDay = (() => Math.floor(Date.now()/86400000));
defineLazyTmpGetter(this, "today", 3600000, getDay);

// Cache objects are logged as strings instead by object reference to avoid blocking GC (as with all debug-prefixed methods, this does nothing in non-debug mode)
// Oddly enough, JSON.stringify(undefined) is not a string...
const DEBUG_simpleStringify = (debugLog_cache === Nothing ? undefined : (obj => String(JSON.stringify(obj)).replaceAll("\"", "").replace(",references:{}", "")));
const debugLog_cache_safe = (debugLog_cache === Nothing ? Nothing : ((msg, ...args) => debugLog_cache(String(msg), ...(args.map(DEBUG_simpleStringify)))));

//}}}
//BEGIN TAB/HOST/IP CACHE *****************************************************
//{{{

// Each item in this cache corresponds to one flag icon
const TabCache =
{
    cache : new Map(),  // tabId -> { tabId, host, hsts, http, proxied, private }

    // Returns whatever is cached for the given tab ID
    lookup(tabId) {
        return this.cache.has(tabId) ? this.cache.get(tabId) : { tabId } ;
    },

    // Takes a webRequest object as its argument and updates caches as needed; returns true on store
    remember({url, ip, tabId, type, proxyInfo, statusLine, responseHeaders}) {
        //assert(type === "main_frame", "Tabs cache only handles requests for top-level documents!");

        if (!validateTabId(tabId))
            return false;  // No tab ID -> abort

        // NOTE: All hosts are stored with any leading "www." stripped
        const host = stripWWW(parseURL(url).host);
        if (!host)
            return false;  // No host name -> abort

        // Create new cache object (any old one for a tab is always clobbered on update)
        const cacheObj = { tabId, host };  // NOTE: Most flags are true/undefined, with only "private" being true/false/undefined

        // Detect and track HSTS
        if (responseHeaders && responseHeaders.some(detectHSTS))
            cacheObj.hsts = true;

        // Detect and track HTTP/2+
        const httpVersion = detectModernHTTP(statusLine);
        if (httpVersion)
            cacheObj.http = httpVersion;  // HTTP version number string, if HTTP/2+

        // Track presence of proxy
        if (proxyInfo) {
            cacheObj.proxied = true;
            // BUG WARNING: The IP field can actually be the IP of the proxy, instead of the server, which of course is documented nowhere
            ip = undefined;
            debugLog_cache_safe("proxy detected:", proxyInfo);
        }

        // If we weren't passed an IP, but the host is just a raw IP, then just use that (shouldn't really happen, but it does)
        if (!ip && detectIP(host)) {
            ip = rawIPHostToIPString(host);
            debugLog_cache_safe("raw IP detected:", ip);
        }

        // Detect and track private browsing tabs so they can be cleared from the cache faster (NOTE: when updating on closing, the API has already destroyed this info)
        browser.tabs.get(tabId).then(({incognito}) => {
            cacheObj.private = Boolean(incognito);  // As this check is async, the value on the object will be undefined until complete
        });

        // Store the IP in the host cache, if available (tracked as a reference held by the new tab cache object)
        HostCache.remember(host, ip, cacheObj);  // NOTE: Always tell the host cache; it may have IP even if not here and still need to track

        // Drop the old tab cache object being replaced, if any (CAUTION: must be done after tracking new ref, to avoid accidental deletion in-between when still needed)
        this.forget(tabId);

        // Store the new tab cache object in the tab cache
        this.cache.set(tabId, cacheObj);
        debugLog_cache_safe("tab updated via web request:", cacheObj);
        return true;
    },

    // ATTENTION: This function must be called for every tab close to clear out old cache entries
    forget(tabId) {
        const cacheObj = this.cache.getAndDelete(tabId);
        if (cacheObj) {
            // If this was from private browsing, then it is cleared from the host cache immediately
            HostCache.forget(cacheObj.host, cacheObj, (cacheObj.private !== false));  // undefined (e.g. check pending) is treated as if it were true
            debugLog_cache_safe("cached tab cleared:", cacheObj);
        }
    }
};

// Each item in this cache corresponds to one host, either for a tab or element in a page
const HostCache =
{
    // NOTE: Country codes are cached on these cache objects on lookup of hosts via the IPDB (see main.js)
    cache : new Map(),  // host -> { host, ip, code }

    // Delay before clearing an unused entry from this cache, unless specified otherwise (primarily for undo-close-tab)
    timeout_clear : 10000,  // 10 seconds (in ms)

    // Delay before retrying a failed lookup, if permitted
    retry_interval : 2000,  // 2 seconds (in ms)

    // Returns a promise resolving to the (newly) cached object
    lookup(host, timeout_lookup) {
        if (!isNonEmptyString(host))
            return Promise.reject(new Error("HostCache.lookup() requires a host string!"));
        host = stripWWW(host);
        if (this.cache.has(host)) {
            debugLog_cache_safe("got already cached host:", host);
            return Promise.resolve(this.remember(host));
        }
        // Yay, Mozilla finally got around to adding a DNS API... half a year late (and this time, forcing use of the cache actually works)
        // SECURITY/PRIVACY NOTE: Queries to DNS are in offline mode, meaning cache hits only; no new network traffic generated
        return browser.dns
                      .resolve(host, ["offline"])
                      .then(record => {
                           debugLog_cache_safe("got DNS record:", host, record);
                           return Promise.resolve(this.remember(host, record.addresses[0]));
                      })
                      .catch(() => {
                           if (timeout_lookup > 0) {
                               debugLog_cache_safe("retrying failed DNS lookup:", host);
                               return sleep(this.retry_interval)
                                     .then(() => this.lookup(host, timeout_lookup - this.retry_interval));
                           }
                           debugLog_cache_safe("failed DNS lookup:", host);
                           return Promise.reject(new Error("failed DNS lookup!"));
                      });
    },

    // Takes host string, optional ip string, and optional holder reference; returns cached object
    remember(host, ip, holder) {
        let cacheObj = this.cache.get(host);
        if (!cacheObj) {
            cacheObj = new RefTrackedObject({ host, ip });
            if (ip && ip !== host) {  // No need to cache literals
                this.cache.set(host, cacheObj);
                debugLog_cache_safe("added host to cache:", cacheObj);
            }
        } else if (ip) {
            cacheObj.ip = ip;
        }
        return cacheObj.trackRef(holder);
    },

    // Drops tracking of the holder for a given host and clears from cache after no longer needed; delete is after a delay, unless specified otherwise
    forget(host, holder, immediately) {
        const cacheObj = this.cache.get(host);
        if (cacheObj && cacheObj.dropRef(holder).noRefs()) {
            (immediately ? Promise.resolve() : sleep(this.timeout_clear)).then(() => {
                if (cacheObj.noRefs() && this.cache.delete(host)) {
                    debugLog_cache_safe("cached host cleared:", host);  // Deleted if and only if still has no refs and still in cache to be deleted
                }
            });
        }
    }
};

//}}}
//BEGIN FAVICON CACHE *********************************************************
//{{{

var FaviconCache =  // NOTE: Declared with var to expose via browser.extension.getBackgroundPage()
{
    key_prefix : "cache:",  // Arbitrary; just used in case local storage gets used for something else in the future

    expiration_days : 30,      // Re-fetch cached entries every 30 days
    expiration_days_fail : 1,  // Re-fetch cached failures after 1 day

    timeout_fetch : 2000,      // Two seconds for normal fetches
    timeout_prefetch : 60000,  // One minute for prefetches

    // Returns a promise that resolves with a data URI or local icon path; automatically fetches images as-needed and caches them in localStorage
    fetch(url, timeout=this.timeout_fetch, fallback=true) {
        return new Promise((resolve, reject) => {
            if (!isNonEmptyString(url))
                return void resolve("");
            if (!url.startsWith("http")) {  // Local paths are returned as-is
                debugLog_cache("local favicon:", url);
                resolve(url);
                return;
            }
            function resolve_failure(e) {
                if (fallback)
                    resolve(iconPath("default"));
                else
                    reject(e);
            }
            const key = this.key_prefix + url;
            let cacheObj = LocalStorageJSON.get(key);
            if (cacheObj) {
                if (this.validate(key, cacheObj)) {
                    if (cacheObj.uri) {
                        debugLog_cache("got cached favicon:", url);
                        resolve(cacheObj.uri);
                    } else {
                        debugLog_cache("got cached favicon failure:", url);
                        resolve_failure("cached failure");
                    }
                    return;
                } else {
                    debugLog_cache("refetching expired favicon:", url);  // TODO: Maybe resolve immediately with expired and fetch new in background?
                    LocalStorageJSON.remove(key);
                    cacheObj = null;
                }
            }
            // Not cached, so fetch and cache it
            withTimeLimit(getDataURIforImageURL(url, 16), timeout).then(dataURI => {
                if (!isString(dataURI) || !dataURI.startsWith("data:image/"))
                    throw new Error("getDataURIforImageURL() got an invalid data URI!");
                cacheObj = { day : today, uri : dataURI };
                debugLog_cache("fetched & cached favicon:", url);
                resolve(dataURI);
            }).catch(e => {  // Can get here from an error anywhere along the way, most commonly a simple 404
                cacheObj = (inOfflineMode() ? null : { day : today, uri : null });  // Cache failure as null uri, but only if not offline
                debugLog_cache("failed to get favicon:", url, e);
                resolve_failure(e);
            }).finally(() => {
                if (cacheObj)
                    LocalStorageJSON.set(key, cacheObj);
            });
        });
    },

    // If favicons are disabled, this will return generic icons only (NOTE: sync)
    urlFromActionTemplate(template) {
        return newLocationForActionTemplate(template).getFavicon();
    },

    // Same as this.fetch(), but takes an array of actions and returns a promise that resolves to an array of favicons for their templates
    fetchForActions(actionsArray, timeout, fallback) {
        assert(isArray(actionsArray), "FaviconCache.fetchForActions() requires an array of actions!", actionsArray);
        return Promise.all(actionsArray.map(a => this.fetch(this.urlFromActionTemplate(a.template), timeout, fallback)));
    },

    forget(url) {
        LocalStorageJSON.remove(this.key_prefix + url);
    },

    validate(key, value) {
        if (!isNonEmptyString(key) || !isObject(value) || !isInteger(value.day)) {
            debugError("invalid favicon cache object found in cache! expiring...", key, value);
            return false;
        }
        const age = today - value.day;
        if (age < -1) {  // Give a day of leeway to account for minor timezone and daylight-savings shenanigans
            debugWarn("got time-traveling favicon cache object! expiring...", key, age);
            return false;
        }
        return isNonEmptyString(value.uri) ? age < FaviconCache.expiration_days        // Cached result  (URI string)
                                           : age < FaviconCache.expiration_days_fail;  // Cached failure (null value)
    },

    cull() {
        const keys_used = new Set(actions_list.map(a => (this.key_prefix + this.urlFromActionTemplate(a.template))));
        const keys_trash = LocalStorageJSON.keys().filter(key => (!keys_used.has(key) || !this.validate(key, LocalStorageJSON.get(key))));
        if (keys_trash.length > 0) {
            debugLog_cache("FaviconCache.cull() clearing "+keys_trash.length+" expired/obsolete cache entries:", keys_trash);
            keys_trash.forEach(key => LocalStorageJSON.remove(key));
        }
    },

    clear() {
        const keys_trash = LocalStorageJSON.keys().filter(key => key.startsWith(this.key_prefix));
        if (keys_trash.length > 0) {
            debugLog_cache("FaviconCache.clear() clearing "+keys_trash.length+" cache entries:", keys_trash);
            keys_trash.forEach(key => LocalStorageJSON.remove(key));
        }
    }
};

//}}}
//BEGIN CACHE UTIL ************************************************************
//{{{

function RefTrackedObject(propsObj) {
    Object.assign(this, propsObj);
    this.references = new Set();
}

RefTrackedObject.prototype = {
    trackRef(holder) {
        if (holder !== undefined)
            this.references.add(holder);
        return this;
    },
    dropRef(holder) {
        if (holder !== undefined)
            this.references.delete(holder);
        return this;
    },
    noRefs() {
        return this.references.size === 0;
    }
};

// Returns a promise that resolves with a data URI string; rejects on failure, in which case a default image can be substituted
function getDataURIforImageURL(url, size) {
    return new Promise((resolve, reject) => {
        const image  = document.createElement("img");  // === new Image()
        const canvas = document.createElement("canvas");
        image.onload = function() {
            if (isInteger(size))  // Size can be an array of [width, height], a single dimension for a square, or undefined to use its natural dimensions
                size = [size, size];
            else if (!isArray(size) || size.length !== 2)
                size = [image.naturalWidth, image.naturalHeight];
            canvas.width  = size[0];
            canvas.height = size[1];
            canvas.getContext("2d").drawImage(image, 0, 0, ...size);  // Draw with origin matching canvas and resized to same size (ImageData also now available on context)
            resolve(canvas.toDataURL());  // Do the conversion; defaults to PNG
        };
        image.onerror  = reject;
        canvas.onerror = reject;
        image.src = url;  // Setting this starts the load and conversion
    });
}

// Local Storage API used for semi-persistent caching; cleared on browser cookies or offline website data clear, as well as on addon uninstall
// NOTE: The physical storage location is in webappsstore.sqlite in the Firefox profile
const LocalStorageJSON = {
    get(key) {
        try { return JSON.parse(localStorage.getItem(key)); }
        catch { return null; }
    },
    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); }
        catch (e) { debugError("localStorage set failure!", e); }  // Possible if disk is full
    },
    remove(key) {
        try { localStorage.removeItem(key); }
        catch (e) { debugError("localStorage remove failure!", e); }
    },
    clear() {
        try { localStorage.clear(); }
        catch (e) { debugError("localStorage clear failure!", e); }
    },
    keys() {
        try {
            const rv = new Array(localStorage.length);
            for (let i=0; i<localStorage.length; i++)
                rv[i] = localStorage.key(i);
            return rv;
        } catch (e) { debugError("localStorage keys iteration failure!", e); }
    }
};

// Returns a promise that resolves after the given promise 'job' completes or rejects after a specified timeout, whichever comes first
function withTimeLimit(job, timeout) {
    return Promise.race([job, sleep(timeout).then(() => Promise.reject(new Error("timeout")))]);
}

//}}}
