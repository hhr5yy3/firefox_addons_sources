"use strict";

debugLog("Flagfox main.js first load:", Date());

// STYLE NOTE: The code section comment styling used here auto-highlights in kwrite/kate and makes it much easier to find stuff.
// Triple-brace comment pairs are used to quickly find the beginning/end of any section via grouping-pair highlighting or block collapsing.
// All-uppercase keywords used in comments to be highlighted with a color based on a pre-defined severity. (e.g. NOTE/WARNING/DANGER)

//BEGIN IP ADDRESS DATABASE HANDLING ******************************************
//{{{
//*** (see also: ipdb.js & net.js) ***//

const IPDB =
{
    worker : new Worker("ipdb.js"),

    meta : { version : "?" },

    queue : new Map(),  // IP string to array of callbacks

    timeout : 60000,  // Time (in ms) to wait for a response from the IPDB worker before rejecting the request

    load() {
        this.worker.onmessage = (({data}) => (data.meta ? this.setMetadata(data) : this.relayData(data)));
        this.worker.postMessage({ meta: "startup" });
    },

    setMetadata({meta}) {  // Automatically loaded and sent after first request (stored in global var)
        try {
            assert(isObject(meta) && isNonEmptyString(meta.version), "Flagfox IPDB error: received bogus metadata message!", meta);
            this.meta = meta;
        } catch (e) {
            console.error("Flagfox exception during IPDB load:", e);
            this.meta = { version: "ERROR", hmac: "ERROR", age: Infinity };
        }
    },

    relayData(data) {
        const callbacks = this.queue.getAndDelete(data.ip_str);
        assert(callbacks, "Flagfox IPDB error: received extra message from IPDB!", data);
        for (let resolve of callbacks)
            resolve(data);  // Callbacks resolve the promise created when added to the queue
        callbacks.clear();  // Clear the set for the timeout checker (in addition to dropping it from the queue)
    },

    // Takes a host string and resolves to a cache object with an IP and country code (cached temporarily)
    lookupByHost(host, timeout) {
        //assert(isNonEmptyString(host), "IPDB.lookupByHost() requires a host string!", host);
        return HostCache.lookup(host, timeout)
                        .then(cacheObj => {
                             // First, check host cache IP lookup result; if failed, will resolve with empty string IP below
                             if (cacheObj.ip === undefined)
                                 throw null;
                             // Then, check if the code is already in this cache
                             if (cacheObj.code !== undefined)
                                 return Promise.resolve(cacheObj);
                             // If not, then look it up now and cache the result
                             return this.lookupByIp(cacheObj.ip)
                                        .then(code => {
                                             cacheObj.code = code;  // NOTE: Cached codes automatically time-out with the IPs they're cached for
                                             return Promise.resolve(cacheObj);
                                        });
                        })
                        .catch(() => Promise.resolve({host, ip:""}));  // Generally from offline mode DNS hit
    },

    // Takes an IP string and returns a promise that resolves to the country code from the IPDB (no caching here)
    lookupByIp(ip_str) {
        //assert(isNonEmptyString(ip_str), "IPDB.lookupByIp() requires an IP string!", ip_str);
        return new Promise((resolve, reject) => {
            let Q = this.queue.get(ip_str);
            if (Q) {
                // If a request is already in progress for this IP, then tack this on to the waiting list
                Q.add(resolve);
            } else {
                // If not, then queue a new request
                Q = new Set().add(resolve);
                this.queue.set(ip_str, Q)
                this.worker.postMessage({ip_str});
            }
            // Also queue a check to see if this actually gets resolved within a reasonable amount of time, and reject it if it does not
            void sleep(this.timeout).then(() => {
                if (Q.size !== 0)  // The set is cleared upon completion in relayData() (the 'Q' reference is valid until this timeout finishes)
                    reject(new Error("Timeout waiting for response from Flagfox IPDB!"));
            });
        })
        .then(({code}) => new Promise((resolve, reject) => {
            if (code !== undefined)  // Code may be null for valid IPs which just aren't in Maxmind's database (generally CDNs)
                resolve(code);
            else
                reject(new Error("Flagfox IPDB lookup error!"));
        }));
    }
};

//}}}
//BEGIN WEB TRAFFIC HANDLING **************************************************
//{{{
//*** (see also: net.js) ***//

// NOTE: Some pages get multiple requests and thus get redundant updates, but update events don't always fire at the best times, so always updating here gives best results
function webTrafficHandler(request) {
    debugLog_traffic("web traffic:", request);
    if (TabCache.remember(request))  // Cache and update from requests that change tabs, as soon as possible
        tabChangeHandler(request.tabId, { url : request.url });
}

// BUG NOTE: onResponseStarted does not always get IPs; onHeadersReceived is earlier, works, and better anyway, though MDN doesn't document that it does have IPs
browser.webRequest.onHeadersReceived.addListener(webTrafficHandler,
                                                 { urls: ["<all_urls>"], types: ["main_frame"] },  // NOTE: Only listens to top-level documents for tabs; all-else uses DNS cache
                                                 ["responseHeaders"]);

//}}}
//BEGIN BROWSER TAB STATE HANDLING ********************************************
//{{{
//*** (see also: ui.js) ***//

// During the first minute around startup, allow retries on host lookups (works around IP availability issues for existing tabs)
let iconLookupTimeout = 10000;
sleep(60000).then(() => (iconLookupTimeout = undefined));

// NOTE: This function handles all flag icon updating; doing it in multiple places causes issues
function tabChangeHandler(tabId, changeInfo, tabInfo=changeInfo) {  // Last parameter is made optional for calls within handlers here (e.g. above/below)
    if (!validateTabId(tabId))  // Only care about content tabs
        return;
    const neterror = isNetErrorIcon(changeInfo.favIconUrl);  // Sneakily detect load error pages by checking if the favicon is actually the about:neterror favicon
    if (!changeInfo.url && !neterror)  // Nothing to update if the location didn't change
        return;
    debugLog_traffic("tab update:", arguments);
    newLocation(tabInfo.url, tabId, neterror, iconLookupTimeout).then(updateIcon);
}

function tabCloseHandler(tabId) {
    TabCache.forget(tabId);
}

function tabFocusHandler(info) {                         // This gets a tab info object on tab focus but just gets a window ID on window focus
    const tabId = (isObject(info) ? info.tabId : null);  // Strangely, the API provides no simple way to get the active tab ID from a window ID
    showPendingNotificationsForTabId(tabId);             // If no tab ID is available, then the current active tab will be looked up and used
}

browser.tabs.onUpdated.addListener(tabChangeHandler);         // Listen for tab URL changes
browser.tabs.onRemoved.addListener(tabCloseHandler);          // Listen for tab closes
browser.tabs.onActivated.addListener(tabFocusHandler);        // Listen for tab focus changes within a window
browser.windows.onFocusChanged.addListener(tabFocusHandler);  // Listen for tab focus changes between windows (different event; same handler)

// Called once on startup; returns a promise that resolves upon trigger of all updates (can't actually be notified of exact completion, but it doesn't matter)
function initAllTabs() {
    return browser.tabs
                  .query({windowType: "normal", discarded: false})  // Discarded tabs will be reloaded on next access; don't waste resources on them here
                  .then(tabs => {
                       for (let { id, url, favIconUrl } of tabs)
                           tabChangeHandler(id, { url, favIconUrl });  // Fav icon URL is also checked to detect error pages
                  })
                  .catch(e => {
                       console.error("Flagfox error during tabs initialization:", e);
                       return Promise.reject(new Error("initAllTabs() failure"));
                  });
}

//}}}
//BEGIN WEBEXTENSION TAB API HELPERS ******************************************
//{{{

const TAB_ID_NONE = browser.tabs.TAB_ID_NONE;

// Returns true if the given ID could be for a content tab (don't actually know if negative IDs are valid (TAB_ID_NONE === -1))
const validateTabId = (tabId => (isInteger(tabId) && tabId !== TAB_ID_NONE));

// Returns a promise that resolves with the current active tab object
// NOTE: browser.tabs.getCurrent() resolves to undefined from background scripts, as they're not in any tab; this is fairly dumb, but at least it's properly documented
function getCurrentTab() {
    return browser.tabs
                  .query({windowType: "normal", currentWindow: true, active: true})  // Get the active tab of the current window
                  .then(tabs => {
                      const currentTab = tabs[0];
                      assert(currentTab, "getCurrentTab() failed to find a tab!", tabs);
                      const currentTabId = currentTab.id;
                      if (currentTabId === TAB_ID_NONE)
                          debugWarn("tab found by getCurrentTab() is not content", tabs);
                      else
                          assert(isInteger(currentTabId), "tab found by getCurrentTab() has missing/invalid ID!", tabs);
                      debugAssert(tabs.length === 1, "somehow got more than one active tab for the active window...", tabs);
                      return Promise.resolve(currentTab);
                  });
}

//}}}
//BEGIN CONTENT FUNCTIONS *****************************************************
//{{{
//*** (see also: data.js & content.js) ***//

// Opens a URL in a tab based on the user's preference; returns a promise that resolves to the tab info object for the tab it was loaded into
// The open in value is of the form "(tab|win)(F|B|C)", where "F" indicates foreground, "B" indicates background, and "C" indicates current (tab/window)
function openURL(url, where = prefs.get("openactionsin")) {  // NOTE: JS default params are evaluated at call time
    assert(isNonEmptyString(url), "openURL() requires a URL string!", url, where);
    assert(isNonEmptyString(where,4), "invalid open location!", url, where);
    const foreground = (where[3] !== "B");
    if (where.startsWith("tab")) {
        return getCurrentTab().then(tabC => {
            if (where[3] === "C")
                return browser.tabs.update(tabC.id, {url: url});
            else
                return browser.tabs.create({url: url, active: foreground, openerTabId: tabC.id});  // Opens next to opener tab; descendant with Tree Style Tabs addon
        });
    } else if (where.startsWith("win")) {
        return browser.windows.create({url: url}).then(win => {
            return browser.windows.update(win.id, {focused: foreground}).then(() => {
                return Promise.resolve(tabs[0]);  // New window, thus only one tab; resolve with it after update, so all values of 'where' resolve with the tab object
            });
        });
    } else {
        return Promise.reject(new Error("invalid open location!"));
    }
}

function setFirstRunPage(url, showOnTempUpdate=false, showOnMinorUpdate=false) {
    browser.runtime.onInstalled.addListener(({reason, temporary, previousVersion}) => {
        // Show first-run page if this is a new install, or an update to a new major version, excluding temporary installation of updates for testing (optionally)
        let show = false;
        if (reason === "install")
            show = true;
        else if (reason === "update")
            show = ((showOnMinorUpdate || !String(previousVersion).startsWith(FlagfoxInfo.version.major)) && (showOnTempUpdate || !temporary));
        if (show)
            openURL(url, "tabF");
    });
}

// NOTICE: This sets the secret decoder ring for Geotool to try to reduce crippling server abuse from other sources.
// This gives up-to-date Flagfox users an all-access pass and restricts everyone else via a captcha at certain times.
// This does not, however, allow for infinite requests. Geotool will still auto-block after many excessive requests.
// This only identifies the Flagfox version. All users on all systems will get the same cookie for the same Flagfox version.
// No information that would identify this computer, profile, or user is sent and it is only sent to the Geotool server when using Geotool.
// Returns a promise that resolves when the cookie is set, because WebExtension APIs can't do anything without a freakin' promise.
function setGeotoolCookie() {
    return waitGeneralStartup().then(() => {  // Wait until the info needed below is loaded, if needed
        const cookieValues = [
            { name : "Flagfox-version",     value : FlagfoxInfo.version.full },  // Flagfox extension version string
            { name : "Flagfox-IPDBversion", value : IPDB.meta.version        },  // Flagfox IP location database version string (year and month)
            { name : "Flagfox-IPDBhash",    value : IPDB.meta.hmac           }   // Truncated HMAC for the above (used to verify versions; name kept for backwards-compatibility)
        ];
        const cookieBase = {
            url : "https://"+GeotoolDomainName+"/",  // Set for Geotool server (domain from location.js)
            secure   : true,                         // Only over HTTPS (server currently uses HSTS)
            httpOnly : true                          // Only in HTTP headers (not accessible by JS in HTML)
        };
        const bakeCookie = (cookieValue => Object.assign(cookieValue, cookieBase));
        return Promise.all(cookieValues.map(bakeCookie).map(c => browser.cookies.set(c)));  // Cookie API returns promises, as per usual
    })
    .catch(e => console.error("Flagfox error setting cookie to load Geotool action:", e));  // Don't reject so Geotool still loads without the cookie, potentially with a captcha
}

function runContentScript(paramsObj, tabId=null) {  // Returns a promise that resolves to the response from the content script, if any (tabId is optional; pass null to use current)
    assert(isObject(paramsObj), "runContentScript() requires a parameters object!", paramsObj, tabId);
    if (!validateTabId(tabId)) {  // If not given a tab to run in, then just use the current one (e.g. using the clipboard API requires a content script, for no reason)
        return getCurrentTab().then(({id}) => {
            assert(validateTabId(id), "no ID for current tab!");  // Make sure we actually got a usable ID before trying again, otherwise we'd get an infinite loop of failure
            return runContentScript(paramsObj, id);
        });
    }
    const executeObj = {
        allFrames : false,       // Top frame only
        runAt : "document_end",  // Run as soon as DOM has loaded (or immediately, if already loaded)
        file : "/content.js"
    };
    const messageObj = {
        name : "Flagfox:contentscript",
        data : paramsObj
    };
    return browser.tabs
                  .executeScript(tabId, executeObj)
                  .then(() => browser.tabs
                                     .sendMessage(tabId, messageObj))
                  .catch(e => console.error("Flagfox error running content script:", e, tabId, paramsObj));
}

//}}}
//BEGIN METADATA **************************************************************
//{{{

// NOTE: These are declared with var/function to expose via browser.extension.getBackgroundPage()
var SystemInfo = {
    platform : {},
    browser  : {}
};
var FlagfoxInfo = {
    version : {
        major : "6.1",
        full  : "6.1.x"  // Full version fetched on startup
    },
    id : {
        // No point in fetching this dynamically, seeing as it can't ever be changed
        static : "{1018e4d6-728f-4b20-ad56-37578a4de76b}",
        // WebExtensions use randomly assigned UUIDs for moz-extension:// URLs, rather than the addon's normal ID (only fetched as-needed for debugging)
        get dynamic() {
            const protocol = "moz-extension://", relpath = "/manifest.json";
            return browser.runtime.getURL(relpath).slice(protocol.length, -relpath.length);  // An actual sync API!
        }
    },
    get debug() { return debug_levels[debug] + " (" + String(debug) + ")"; },
    installation : {},
    ready : false
};

function getFullVersionsString() {
    return LTR(FlagfoxInfo.version.full) + " " + LTR("(" + IPDB.meta.version + ")");  // Dependent on IPDB metadata load on startup
}

function loadEnvironmentMetadata() {
    return Promise.all([
        browser.management.getSelf(),      // Addon
        browser.runtime.getBrowserInfo(),  // Browser
        browser.runtime.getPlatformInfo()  // System
    ]).then(([{version, installType, mayDisable}, browserInfo, platformInfo]) => {
            FlagfoxInfo.version.full = version;
            FlagfoxInfo.installation.type = installType;
            FlagfoxInfo.installation.locked = !mayDisable;
            SystemInfo.browser = browserInfo;
            SystemInfo.platform = platformInfo;  // The OS must be known prior to handling hotkeys
    }).catch(e => console.error("Flagfox error fetching basic addon and system info on startup!", e));
}

function dumpDebugInfo(force) {
    // NOTE: All function arguments in JS get evaluated on call even if they aren't used, thus just using debugLog is not ideal for non-trivial arguments
    if (force || isDebugLevelEnabled("logging")) {
        console.log("Flagfox addon info:\n" + objToSimpleString(FlagfoxInfo));
        console.log("Browser/System info:\n" + objToSimpleString(SystemInfo));
        console.log("Locales detected/selected:\n" + objToSimpleString(LocaleInfo));
        console.log("Flagfox prefs dump:", prefs.all());
        DEBUG_checkAllDefaultActionNameL10N();
    }
}

//}}}
//BEGIN GENERAL ADDON STARTUP *************************************************
//{{{
//*** (see also: data.js & l10n.js) ***//

// NOTE: For some strange reason, browser.runtime.onStartup is not fired in every scenario, so startup functions just have to be run inline

// Some of this is needed before loading data; other parts are needed for various other things, or at minimum, debugging
Promise.all([loadEnvironmentMetadata(), fetchAcceptLanguages(), IPDB.load()])  // (l10n.js & above)
       .then(loadAllData)  // (data.js)
       .then(() => {
            FlagfoxInfo.ready = true;
            debugLog("Flagfox " + FlagfoxInfo.version.full + " general startup complete", Date());
            dumpDebugInfo();
       })
       .then(() => Promise.all([maybePrefetchMenuFavicons(), initAllTabs()]))  // (ui.js & above)
       .catch(e => console.error("FLAGFOX STARTUP ERROR", e));

// Returns a promise that resolves when all of the various automatic startup requests above have been completed
function waitGeneralStartup() {
    return wait(() => FlagfoxInfo.ready);
}

// Show first-run page, if needed (only shown once for major updates)
//setFirstRunPage("https://flagfox.wordpress.com/2018/07/08/flagfox-6-1-released/");

//}}}
