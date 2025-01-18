/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.psl = exports.PQueue = exports.delay = void 0;
const delay_1 = __importDefault(__webpack_require__(88));
exports.delay = delay_1.default;
const p_queue_1 = __importDefault(__webpack_require__(89));
exports.PQueue = p_queue_1.default;
const psl_1 = __importDefault(__webpack_require__(95));
exports.psl = psl_1.default;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBytes = exports.REDIRECTOR_DOMAINS_DEFAULT = exports.IGNORED_DOMAINS_DEFAULT = exports.TOOLBAR_ICON_COLORS = exports.CONTAINER_ICONS = exports.CONTAINER_COLORS = exports.getPermissions = void 0;
exports.getPermissions = async () => {
    const { permissions } = await browser.permissions.getAll();
    if (!permissions) {
        throw new Error('permissions.getAll didnt return permissions');
    }
    return {
        bookmarks: permissions.includes('bookmarks'),
        downloads: permissions.includes('downloads'),
        history: permissions.includes('history'),
        notifications: permissions.includes('notifications'),
        webNavigation: permissions.includes('webNavigation'),
    };
};
exports.CONTAINER_COLORS = [
    'blue',
    'turquoise',
    'green',
    'yellow',
    'orange',
    'red',
    'pink',
    'purple',
    'toolbar',
];
exports.CONTAINER_ICONS = [
    'fingerprint',
    'briefcase',
    'dollar',
    'cart',
    'circle',
    'gift',
    'vacation',
    'food',
    'fruit',
    'pet',
    'tree',
    'chill',
    'fence',
];
exports.TOOLBAR_ICON_COLORS = [
    'default',
    'black-simple',
    'blue-simple',
    'red-simple',
    'white-simple',
];
exports.IGNORED_DOMAINS_DEFAULT = ['getpocket.com', 'addons.mozilla.org'];
exports.REDIRECTOR_DOMAINS_DEFAULT = [
    't.co',
    'outgoing.prod.mozaws.net',
    'slack-redir.net',
];
exports.formatBytes = (bytes, decimals = 2) => {
    // https://stackoverflow.com/a/18650828
    if (bytes == 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + sizes[i];
};


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tmp_1 = __webpack_require__(83);
window.tmp = new tmp_1.TemporaryContainers();
window.tmp
    .initialize()
    .then((tmp) => {
    if (tmp.storage.installed) {
        tmp.debug('[bg] fresh install, showing options');
        browser.tabs.create({
            url: browser.runtime.getURL('options.html?installed'),
        });
    }
})
    .catch((error) => {
    var _a, _b;
    browser.browserAction.onClicked.addListener(() => {
        browser.tabs.create({
            url: browser.runtime.getURL(`
          options.html?error=${encodeURIComponent(error.toString())}
        `),
        });
    });
    browser.browserAction.setPopup({
        popup: null,
    });
    browser.browserAction.setTitle({ title: 'Temporary Containers Error' });
    browser.browserAction.setBadgeBackgroundColor({
        color: 'red',
    });
    browser.browserAction.setBadgeText({
        text: 'E',
    });
    browser.browserAction.enable();
    (_b = (_a = window.tmp) === null || _a === void 0 ? void 0 : _a.eventlisteners) === null || _b === void 0 ? void 0 : _b.remove();
    throw error;
});


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryContainers = void 0;
const log_1 = __webpack_require__(84);
const event_listeners_1 = __webpack_require__(85);
const browseraction_1 = __webpack_require__(86);
const cleanup_1 = __webpack_require__(87);
const commands_1 = __webpack_require__(98);
const container_1 = __webpack_require__(99);
const contextmenu_1 = __webpack_require__(100);
const convert_1 = __webpack_require__(101);
const cookies_1 = __webpack_require__(102);
const history_1 = __webpack_require__(103);
const isolation_1 = __webpack_require__(104);
const mac_1 = __webpack_require__(105);
const management_1 = __webpack_require__(106);
const migration_1 = __webpack_require__(108);
const migration_legacy_1 = __webpack_require__(109);
const mouseclick_1 = __webpack_require__(110);
const pageaction_1 = __webpack_require__(111);
const preferences_1 = __webpack_require__(112);
const request_1 = __webpack_require__(113);
const runtime_1 = __webpack_require__(114);
const scripts_1 = __webpack_require__(115);
const statistics_1 = __webpack_require__(116);
const storage_1 = __webpack_require__(117);
const tabs_1 = __webpack_require__(118);
const utils_1 = __webpack_require__(119);
class TemporaryContainers {
    constructor() {
        this.initialized = false;
        this.log = new log_1.Log();
        this.debug = this.log.debug;
        this.utils = new utils_1.Utils(this);
        this.preferences = new preferences_1.Preferences(this);
        this.storage = new storage_1.Storage(this);
        this.runtime = new runtime_1.Runtime(this);
        this.management = new management_1.Management(this);
        this.request = new request_1.Request(this);
        this.container = new container_1.Container(this);
        this.mouseclick = new mouseclick_1.MouseClick(this);
        this.tabs = new tabs_1.Tabs(this);
        this.commands = new commands_1.Commands(this);
        this.isolation = new isolation_1.Isolation(this);
        this.browseraction = new browseraction_1.BrowserAction(this);
        this.pageaction = new pageaction_1.PageAction(this);
        this.contextmenu = new contextmenu_1.ContextMenu(this);
        this.cookies = new cookies_1.Cookies(this);
        this.scripts = new scripts_1.Scripts(this);
        this.history = new history_1.History(this);
        this.cleanup = new cleanup_1.Cleanup(this);
        this.convert = new convert_1.Convert(this);
        this.statistics = new statistics_1.Statistics(this);
        this.mac = new mac_1.MultiAccountContainers(this);
        this.migration = new migration_1.Migration(this);
        this.migrationLegacy = new migration_legacy_1.MigrationLegacy(this);
        this.eventlisteners = new event_listeners_1.EventListeners(this);
        this.containerPrefix = 'firefox';
    }
    async initialize() {
        if (this.initialized) {
            throw new Error('already initialized');
        }
        this.debug('[tmp] initializing');
        browser.browserAction.disable();
        this.version = browser.runtime.getManifest().version;
        const { permissions } = await browser.permissions.getAll();
        if (!permissions) {
            throw new Error('permissions.getAll() failed');
        }
        this.permissions = {
            bookmarks: permissions.includes('bookmarks'),
            history: permissions.includes('history'),
            notifications: permissions.includes('notifications'),
            downloads: permissions.includes('downloads'),
            webNavigation: permissions.includes('webNavigation'),
        };
        this.preferences.initialize();
        await this.storage.initialize();
        this.pref = new Proxy(this.storage, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            get(target, key) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return target.local.preferences[key];
            },
        });
        if (!this.storage.local.containerPrefix) {
            const browserInfo = await browser.runtime.getBrowserInfo();
            this.storage.local.containerPrefix = browserInfo.name.toLowerCase();
            await this.storage.persist();
        }
        this.containerPrefix = this.storage.local.containerPrefix;
        this.request.initialize();
        this.runtime.initialize();
        this.container.initialize();
        this.mouseclick.initialize();
        this.commands.initialize();
        this.isolation.initialize();
        this.browseraction.initialize();
        this.pageaction.initialize();
        this.contextmenu.initialize();
        this.cookies.initialize();
        this.scripts.initialize();
        this.statistics.initialize();
        this.mac.initialize();
        this.history.initialize();
        this.cleanup.initialize();
        this.convert.initialize();
        await this.tabs.initialize();
        await this.management.initialize();
        this.debug('[tmp] initialized');
        this.initialized = true;
        this.eventlisteners.tmpInitialized();
        browser.browserAction.enable();
        await this.tabs.handleAlreadyOpen();
        return this;
    }
}
exports.TemporaryContainers = TemporaryContainers;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
class Log {
    constructor() {
        this.DEBUG = false;
        this.stringify = true;
        this.checkedLocalStorage = false;
        this.checkLocalStoragePromise = this.checkLocalStorage();
        this.debug = async (...args) => {
            let date;
            if (!this.checkedLocalStorage && !window._mochaTest) {
                date = new Date().toUTCString();
                await this.checkLocalStoragePromise;
            }
            if (!this.DEBUG) {
                return;
            }
            if (!date) {
                date = new Date().toUTCString();
            }
            args = args.map((arg) => {
                if (typeof arg === 'object' && arg.favIconUrl) {
                    arg = JSON.parse(JSON.stringify(arg));
                    delete arg.favIconUrl;
                    return arg;
                }
                return arg;
            });
            if (this.stringify && !window._mochaTest) {
                console.log(date, ...args.map((value) => JSON.stringify(value)));
                console.log('------------------------------------------');
            }
            else {
                console.log(date, ...args.slice(0));
            }
        };
        this.debug = this.debug.bind(this);
        browser.runtime.onInstalled.addListener(this.onInstalledListener.bind(this));
    }
    checkLocalStorage() {
        if (this.DEBUG) {
            return;
        }
        // let's put this in the js event queue, just to make sure
        // that localstorage doesn't block registering event-listeners at all
        return new Promise((resolve) => setTimeout(() => {
            if (window.localStorage.getItem('debug-dev') === 'true') {
                this.DEBUG = true;
                this.stringify = false;
                this.checkedLocalStorage = true;
                this.debug('[log] enabled debug-dev because of localstorage item');
            }
            else if (window.localStorage.getItem('debug') === 'true') {
                this.DEBUG = true;
                this.stringify = true;
                this.checkedLocalStorage = true;
                this.debug('[log] enabled debug because of localstorage item');
            }
            resolve();
        }));
    }
    onInstalledListener(details) {
        browser.runtime.onInstalled.removeListener(this.onInstalledListener);
        if (!this.DEBUG && details.temporary) {
            this.DEBUG = true;
            this.stringify = false;
            if (details.reason === 'update') {
                browser.tabs.create({
                    url: browser.runtime.getURL('options.html'),
                });
            }
            this.debug('[log] enabled debug-dev because of temporary install', details);
        }
    }
}
exports.Log = Log;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListeners = void 0;
// to have persistent listeners we need to register them early+sync
// and wait for tmp to fully initialize before handling events
class EventListeners {
    constructor(background) {
        this.tmpInitializedPromiseResolvers = [];
        this.defaultTimeout = 30; // seconds
        this.listeners = [];
        this.tmpInitialized = () => {
            this.tmpInitializedPromiseResolvers.map((resolver) => {
                resolver.resolve();
                window.clearTimeout(resolver.timeout);
            });
        };
        this.background = background;
        this.debug = background.debug;
        this.register();
    }
    register() {
        this.debug('[event-listeners] registering');
        browser.webRequest.onBeforeRequest.addListener(this.wrap(browser.webRequest.onBeforeRequest, this.background.request, 'webRequestOnBeforeRequest', { timeout: 5 }), { urls: ['<all_urls>'], types: ['main_frame'] }, ['blocking']);
        browser.webRequest.onBeforeSendHeaders.addListener(this.wrap(browser.webRequest.onBeforeSendHeaders, this.background.cookies, 'maybeSetAndAddToHeader'), { urls: ['<all_urls>'], types: ['main_frame'] }, ['blocking', 'requestHeaders']);
        browser.webRequest.onCompleted.addListener(this.wrap(browser.webRequest.onCompleted, this.background.statistics, 'collect'), {
            urls: ['<all_urls>'],
            types: ['script', 'font', 'image', 'imageset', 'stylesheet'],
        }, ['responseHeaders']);
        browser.webRequest.onCompleted.addListener(this.wrap(browser.webRequest.onCompleted, this.background.request, 'cleanupCanceled'), { urls: ['<all_urls>'], types: ['main_frame'] });
        browser.webRequest.onErrorOccurred.addListener(this.wrap(browser.webRequest.onErrorOccurred, this.background.request, 'cleanupCanceled'), { urls: ['<all_urls>'], types: ['main_frame'] });
        browser.browserAction.onClicked.addListener(this.wrap(browser.browserAction.onClicked, this.background.browseraction, 'onClicked'));
        browser.contextMenus.onClicked.addListener(this.wrap(browser.contextMenus.onClicked, this.background.contextmenu, 'onClicked'));
        browser.contextMenus.onShown.addListener(this.wrap(browser.contextMenus.onShown, this.background.contextmenu, 'onShown'));
        browser.windows.onFocusChanged.addListener(this.wrap(browser.windows.onFocusChanged, this.background.contextmenu, 'windowsOnFocusChanged'));
        browser.management.onDisabled.addListener(this.wrap(browser.management.onDisabled, this.background.management, 'disable'));
        browser.management.onUninstalled.addListener(this.wrap(browser.management.onUninstalled, this.background.management, 'disable'));
        browser.management.onEnabled.addListener(this.wrap(browser.management.onEnabled, this.background.management, 'enable'));
        browser.management.onInstalled.addListener(this.wrap(browser.management.onUninstalled, this.background.management, 'enable'));
        browser.commands.onCommand.addListener(this.wrap(browser.commands.onCommand, this.background.commands, 'onCommand'));
        browser.tabs.onActivated.addListener(this.wrap(browser.tabs.onActivated, this.background.tabs, 'onActivated'));
        browser.tabs.onCreated.addListener(this.wrap(browser.tabs.onCreated, this.background.tabs, 'onCreated'));
        browser.tabs.onUpdated.addListener(this.wrap(browser.tabs.onUpdated, this.background.tabs, 'onUpdated'));
        browser.tabs.onRemoved.addListener(this.wrap(browser.tabs.onRemoved, this.background.tabs, 'onRemoved'));
        browser.runtime.onMessage.addListener(this.wrap(browser.runtime.onMessage, this.background.runtime, 'onMessage'));
        browser.runtime.onMessageExternal.addListener(this.wrap(browser.runtime.onMessageExternal, this.background.runtime, 'onMessageExternal'));
        browser.runtime.onStartup.addListener(this.wrap(browser.runtime.onStartup, this.background.runtime, 'onStartup'));
        this.registerPermissionedListener();
    }
    registerPermissionedListener() {
        var _a, _b;
        (_a = browser.webNavigation) === null || _a === void 0 ? void 0 : _a.onCommitted.addListener(this.wrap((_b = browser.webNavigation) === null || _b === void 0 ? void 0 : _b.onCommitted, this.background.scripts, 'maybeExecute'));
    }
    wrap(api, context, target, options = { timeout: this.defaultTimeout }) {
        const tmpInitializedPromise = this.createTmpInitializedPromise(options);
        const listener = async (...listenerArgs) => {
            if (!this.background.initialized) {
                try {
                    await tmpInitializedPromise;
                }
                catch (error) {
                    this.debug(`[event-listeners] call to ${target.join('.')} timed out after ${options.timeout}s`);
                    throw error;
                }
            }
            return context[target].call(context, ...listenerArgs);
        };
        this.listeners.push({ listener, api });
        return listener;
    }
    createTmpInitializedPromise(options) {
        const abortController = new AbortController();
        const timeout = window.setTimeout(() => {
            abortController.abort();
        }, options.timeout * 1000);
        return new Promise((resolve, reject) => {
            this.tmpInitializedPromiseResolvers.push({ resolve, timeout });
            abortController.signal.addEventListener('abort', () => {
                reject('Timed out while waiting for Add-on to initialize');
            });
        });
    }
    remove() {
        this.listeners.map((listener) => {
            listener.api.removeListener(listener.listener);
        });
    }
}
exports.EventListeners = EventListeners;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserAction = void 0;
class BrowserAction {
    constructor(background) {
        this.background = background;
    }
    initialize() {
        this.pref = this.background.pref;
        this.container = this.background.container;
        if (this.pref.browserActionPopup) {
            this.setPopup();
        }
        if (this.pref.iconColor !== 'default') {
            this.setIcon(this.pref.iconColor);
        }
        if (!this.background.isolation.getActiveState()) {
            this.addIsolationInactiveBadge();
        }
    }
    onClicked() {
        return this.container.createTabInTempContainer({
            deletesHistory: this.pref.deletesHistory.automaticMode === 'automatic',
        });
    }
    setPopup() {
        browser.browserAction.setPopup({
            popup: 'popup.html',
        });
        browser.browserAction.setTitle({ title: 'Temporary Containers' });
    }
    unsetPopup() {
        browser.browserAction.setPopup({
            popup: null,
        });
        browser.browserAction.setTitle({ title: null });
    }
    setIcon(iconColor) {
        const iconPath = '../../icons';
        let iconColorFileName = iconColor;
        if (iconColor === 'default') {
            iconColorFileName = 'd';
        }
        const icon = {
            path: {
                16: `${iconPath}/page-${iconColorFileName}-16.svg`,
                32: `${iconPath}/page-${iconColorFileName}-32.svg`,
            },
        };
        browser.browserAction.setIcon(icon);
    }
    addBadge(tabId) {
        if (!this.background.isolation.getActiveState()) {
            return;
        }
        browser.browserAction.setTitle({
            title: 'Automatic Mode on navigation active',
            tabId,
        });
        browser.browserAction.setBadgeBackgroundColor({
            color: '#f9f9fa',
            tabId,
        });
        browser.browserAction.setBadgeText({
            text: 'A',
            tabId,
        });
    }
    removeBadge(tabId) {
        if (!this.background.isolation.getActiveState()) {
            return;
        }
        browser.browserAction.setTitle({
            title: !this.pref.browserActionPopup
                ? 'Open a new tab in a new Temporary Container (Alt+C)'
                : 'Temporary Containers',
            tabId,
        });
        browser.browserAction.setBadgeText({
            text: null,
            tabId,
        });
    }
    async addIsolationInactiveBadge(num) {
        browser.browserAction.setBadgeBackgroundColor({
            color: 'red',
        });
        browser.browserAction.setBadgeText({
            text: num ? num.toString() : '!',
        });
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true,
        });
        if (tabs[0]) {
            browser.browserAction.setBadgeBackgroundColor({
                color: 'red',
                tabId: tabs[0].id,
            });
            browser.browserAction.setBadgeText({
                text: null,
                tabId: tabs[0].id,
            });
        }
    }
    removeIsolationInactiveBadge() {
        browser.browserAction.setBadgeText({
            text: '',
        });
    }
}
exports.BrowserAction = BrowserAction;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Cleanup = void 0;
const lib_1 = __webpack_require__(4);
class Cleanup {
    constructor(background) {
        this.queued = new Set();
        this.queue = new lib_1.PQueue({ concurrency: 1 });
        this.background = background;
        this.debug = background.debug;
        setInterval(() => {
            this.debug('[interval] container cleanup interval');
            this.cleanup();
        }, 600000);
    }
    initialize() {
        this.pref = this.background.pref;
        this.storage = this.background.storage;
        this.container = this.background.container;
        this.history = this.background.history;
        this.statistics = this.background.statistics;
        this.permissions = this.background.permissions;
        this.tabs = this.background.tabs;
    }
    async addToRemoveQueue(cookieStoreId, skipDelay = false) {
        if (this.queued.has(cookieStoreId)) {
            this.debug('[addToRemoveQueue] container already in queue', cookieStoreId);
            return;
        }
        this.queued.add(cookieStoreId);
        const containerRemovalDelay = this.container.getRemovalDelay(cookieStoreId);
        if (containerRemovalDelay && !skipDelay) {
            this.debug('[addToRemoveQueue] waiting before adding container removal to queue', containerRemovalDelay, cookieStoreId);
            await lib_1.delay(containerRemovalDelay);
        }
        this.debug('[addToRemoveQueue] queuing container removal', cookieStoreId);
        await this.queue
            .add(async () => {
            const containerRemoved = await this.tryToRemove(cookieStoreId);
            if (containerRemoved) {
                this.debug('[addToRemoveQueue] container removed, waiting 2s', cookieStoreId);
                await lib_1.delay(2500);
            }
        })
            .finally(() => {
            this.queued.delete(cookieStoreId);
            if (this.queue.pending) {
                return;
            }
            this.debug('[addToRemoveQueue] queue empty');
            this.statistics.finish();
            this.container.cleanupNumbers();
        });
    }
    async tryToRemove(cookieStoreId) {
        const containerTabs = this.tabs.containerTabs.get(cookieStoreId);
        if (containerTabs === null || containerTabs === void 0 ? void 0 : containerTabs.size) {
            this.debug('[tryToRemove] not removing container because it still has tabs', cookieStoreId, containerTabs.size);
            return false;
        }
        const historyClearedCount = this.history.maybeClearHistory(cookieStoreId);
        this.statistics.update(historyClearedCount, cookieStoreId);
        this.container.cleanupNumber(cookieStoreId);
        if (!(await this.removeContainer(cookieStoreId))) {
            await this.storage.persist();
        }
        return true;
    }
    async removeContainer(cookieStoreId) {
        try {
            const contextualIdentity = await browser.contextualIdentities.remove(cookieStoreId);
            if (!contextualIdentity) {
                this.debug('[removeContainer] couldnt find container to remove, probably already removed', cookieStoreId);
            }
            else {
                this.debug('[removeContainer] container removed', cookieStoreId);
            }
            await this.container.removeFromStorage(cookieStoreId);
            return true;
        }
        catch (error) {
            this.debug('[removeContainer] error while removing container', cookieStoreId, error);
            return false;
        }
    }
    async cleanup(startup = false) {
        const containers = this.container.getAllIds();
        if (!containers.length) {
            this.debug('[cleanup] canceling, no tmpcontainers at all');
            return;
        }
        if (startup &&
            (await browser.tabs.query({ url: 'about:sessionrestore' })).length) {
            this.debug("[cleanup] canceling because there's a about:sessionrestore tab");
            return;
        }
        containers.map((cookieStoreId) => this.addToRemoveQueue(cookieStoreId, startup));
    }
    maybeShowNotification(message) {
        if (!this.pref.notifications || !this.permissions.notifications) {
            return;
        }
        this.debug('[maybeShowNotification] showing notification');
        browser.notifications.create({
            type: 'basic',
            title: 'Temporary Containers',
            iconUrl: 'icons/page-w-32.svg',
            message,
        });
    }
}
exports.Cleanup = Cleanup;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const createAbortError = () => {
	const error = new Error('Delay aborted');
	error.name = 'AbortError';
	return error;
};

const createDelay = ({clearTimeout: defaultClear, setTimeout: set, willResolve}) => (ms, {value, signal} = {}) => {
	if (signal && signal.aborted) {
		return Promise.reject(createAbortError());
	}

	let timeoutId;
	let settle;
	let rejectFn;
	const clear = defaultClear || clearTimeout;

	const signalListener = () => {
		clear(timeoutId);
		rejectFn(createAbortError());
	};

	const cleanup = () => {
		if (signal) {
			signal.removeEventListener('abort', signalListener);
		}
	};

	const delayPromise = new Promise((resolve, reject) => {
		settle = () => {
			cleanup();
			if (willResolve) {
				resolve(value);
			} else {
				reject(value);
			}
		};

		rejectFn = reject;
		timeoutId = (set || setTimeout)(settle, ms);
	});

	if (signal) {
		signal.addEventListener('abort', signalListener, {once: true});
	}

	delayPromise.clear = () => {
		clear(timeoutId);
		timeoutId = null;
		cleanup();
		settle();
	};

	return delayPromise;
};

const delay = createDelay({willResolve: true});
delay.reject = createDelay({willResolve: false});
delay.createWithTimers = ({clearTimeout, setTimeout}) => {
	const delay = createDelay({clearTimeout, setTimeout, willResolve: true});
	delay.reject = createDelay({clearTimeout, setTimeout, willResolve: false});
	return delay;
};

module.exports = delay;
// TODO: Remove this for the next major release
module.exports.default = delay;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = __webpack_require__(90);
const p_timeout_1 = __webpack_require__(91);
const priority_queue_1 = __webpack_require__(93);
// eslint-disable-next-line @typescript-eslint/no-empty-function
const empty = () => { };
const timeoutError = new p_timeout_1.TimeoutError();
/**
Promise queue with concurrency control.
*/
class PQueue extends EventEmitter {
    constructor(options) {
        var _a, _b, _c, _d;
        super();
        Object.defineProperty(this, "_carryoverConcurrencyCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isIntervalIgnored", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_intervalCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_intervalCap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_interval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_intervalEnd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_intervalId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_timeoutId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_queueClass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_pendingCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
        Object.defineProperty(this, "_concurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isPaused", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_resolveEmpty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: empty
        });
        Object.defineProperty(this, "_resolveIdle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: empty
        });
        Object.defineProperty(this, "_timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_throwOnTimeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        options = Object.assign({ carryoverConcurrencyCount: false, intervalCap: Infinity, interval: 0, concurrency: Infinity, autoStart: true, queueClass: priority_queue_1.default }, options);
        if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
            throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ''}\` (${typeof options.intervalCap})`);
        }
        if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
            throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ''}\` (${typeof options.interval})`);
        }
        this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
        this._intervalCap = options.intervalCap;
        this._interval = options.interval;
        this._queue = new options.queueClass();
        this._queueClass = options.queueClass;
        this.concurrency = options.concurrency;
        this._timeout = options.timeout;
        this._throwOnTimeout = options.throwOnTimeout === true;
        this._isPaused = options.autoStart === false;
    }
    get _doesIntervalAllowAnother() {
        return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
    }
    get _doesConcurrentAllowAnother() {
        return this._pendingCount < this._concurrency;
    }
    _next() {
        this._pendingCount--;
        this._tryToStartAnother();
    }
    _resolvePromises() {
        this._resolveEmpty();
        this._resolveEmpty = empty;
        if (this._pendingCount === 0) {
            this._resolveIdle();
            this._resolveIdle = empty;
            this.emit('idle');
        }
    }
    _onResumeInterval() {
        this._onInterval();
        this._initializeIntervalIfNeeded();
        this._timeoutId = undefined;
    }
    _isIntervalPaused() {
        const now = Date.now();
        if (this._intervalId === undefined) {
            const delay = this._intervalEnd - now;
            if (delay < 0) {
                // Act as the interval was done
                // We don't need to resume it here because it will be resumed on line 160
                this._intervalCount = (this._carryoverConcurrencyCount) ? this._pendingCount : 0;
            }
            else {
                // Act as the interval is pending
                if (this._timeoutId === undefined) {
                    this._timeoutId = setTimeout(() => {
                        this._onResumeInterval();
                    }, delay);
                }
                return true;
            }
        }
        return false;
    }
    _tryToStartAnother() {
        if (this._queue.size === 0) {
            // We can clear the interval ("pause")
            // Because we can redo it later ("resume")
            if (this._intervalId) {
                clearInterval(this._intervalId);
            }
            this._intervalId = undefined;
            this._resolvePromises();
            return false;
        }
        if (!this._isPaused) {
            const canInitializeInterval = !this._isIntervalPaused();
            if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                this.emit('active');
                this._queue.dequeue()();
                if (canInitializeInterval) {
                    this._initializeIntervalIfNeeded();
                }
                return true;
            }
        }
        return false;
    }
    _initializeIntervalIfNeeded() {
        if (this._isIntervalIgnored || this._intervalId !== undefined) {
            return;
        }
        this._intervalId = setInterval(() => {
            this._onInterval();
        }, this._interval);
        this._intervalEnd = Date.now() + this._interval;
    }
    _onInterval() {
        if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
        this._processQueue();
    }
    /**
    Executes all queued functions until it reaches the limit.
    */
    _processQueue() {
        // eslint-disable-next-line no-empty
        while (this._tryToStartAnother()) { }
    }
    get concurrency() {
        return this._concurrency;
    }
    set concurrency(newConcurrency) {
        if (!(typeof newConcurrency === 'number' && newConcurrency >= 1)) {
            throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
        }
        this._concurrency = newConcurrency;
        this._processQueue();
    }
    /**
    Adds a sync or async task to the queue. Always returns a promise.
    */
    async add(fn, options = {}) {
        return new Promise((resolve, reject) => {
            const run = async () => {
                this._pendingCount++;
                this._intervalCount++;
                try {
                    const operation = (this._timeout === undefined && options.timeout === undefined) ? fn() : p_timeout_1.default(Promise.resolve(fn()), (options.timeout === undefined ? this._timeout : options.timeout), () => {
                        if (options.throwOnTimeout === undefined ? this._throwOnTimeout : options.throwOnTimeout) {
                            reject(timeoutError);
                        }
                        return undefined;
                    });
                    resolve(await operation);
                }
                catch (error) {
                    reject(error);
                }
                this._next();
            };
            this._queue.enqueue(run, options);
            this._tryToStartAnother();
        });
    }
    /**
    Same as `.add()`, but accepts an array of sync or async functions.

    @returns A promise that resolves when all functions are resolved.
    */
    async addAll(functions, options) {
        return Promise.all(functions.map(async (function_) => this.add(function_, options)));
    }
    /**
    Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
    */
    start() {
        if (!this._isPaused) {
            return this;
        }
        this._isPaused = false;
        this._processQueue();
        return this;
    }
    /**
    Put queue execution on hold.
    */
    pause() {
        this._isPaused = true;
    }
    /**
    Clear the queue.
    */
    clear() {
        this._queue = new this._queueClass();
    }
    /**
    Can be called multiple times. Useful if you for example add additional items at a later time.

    @returns A promise that settles when the queue becomes empty.
    */
    async onEmpty() {
        // Instantly resolve if the queue is empty
        if (this._queue.size === 0) {
            return;
        }
        return new Promise(resolve => {
            const existingResolve = this._resolveEmpty;
            this._resolveEmpty = () => {
                existingResolve();
                resolve();
            };
        });
    }
    /**
    The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.

    @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
    */
    async onIdle() {
        // Instantly resolve if none pending and if nothing else is queued
        if (this._pendingCount === 0 && this._queue.size === 0) {
            return;
        }
        return new Promise(resolve => {
            const existingResolve = this._resolveIdle;
            this._resolveIdle = () => {
                existingResolve();
                resolve();
            };
        });
    }
    /**
    Size of the queue.
    */
    get size() {
        return this._queue.size;
    }
    /**
    Size of the queue, filtered by the given options.

    For example, this can be used to find the number of items remaining in the queue with a specific priority level.
    */
    sizeBy(options) {
        return this._queue.filter(options).length;
    }
    /**
    Number of pending promises.
    */
    get pending() {
        return this._pendingCount;
    }
    /**
    Whether the queue is currently paused.
    */
    get isPaused() {
        return this._isPaused;
    }
    get timeout() {
        return this._timeout;
    }
    /**
    Set the timeout for future operations.
    */
    set timeout(milliseconds) {
        this._timeout = milliseconds;
    }
}
exports.default = PQueue;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const pFinally = __webpack_require__(92);

class TimeoutError extends Error {
	constructor(message) {
		super(message);
		this.name = 'TimeoutError';
	}
}

const pTimeout = (promise, milliseconds, fallback) => new Promise((resolve, reject) => {
	if (typeof milliseconds !== 'number' || milliseconds < 0) {
		throw new TypeError('Expected `milliseconds` to be a positive number');
	}

	if (milliseconds === Infinity) {
		resolve(promise);
		return;
	}

	const timer = setTimeout(() => {
		if (typeof fallback === 'function') {
			try {
				resolve(fallback());
			} catch (error) {
				reject(error);
			}

			return;
		}

		const message = typeof fallback === 'string' ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
		const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);

		if (typeof promise.cancel === 'function') {
			promise.cancel();
		}

		reject(timeoutError);
	}, milliseconds);

	// TODO: Use native `finally` keyword when targeting Node.js 10
	pFinally(
		// eslint-disable-next-line promise/prefer-await-to-then
		promise.then(resolve, reject),
		() => {
			clearTimeout(timer);
		}
	);
});

module.exports = pTimeout;
// TODO: Remove this for the next major release
module.exports.default = pTimeout;

module.exports.TimeoutError = TimeoutError;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (promise, onFinally) => {
	onFinally = onFinally || (() => {});

	return promise.then(
		val => new Promise(resolve => {
			resolve(onFinally());
		}).then(() => val),
		err => new Promise(resolve => {
			resolve(onFinally());
		}).then(() => {
			throw err;
		})
	);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lower_bound_1 = __webpack_require__(94);
class PriorityQueue {
    constructor() {
        Object.defineProperty(this, "_queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    enqueue(run, options) {
        options = Object.assign({ priority: 0 }, options);
        const element = {
            priority: options.priority,
            run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
            this._queue.push(element);
            return;
        }
        const index = lower_bound_1.default(this._queue, element, (a, b) => b.priority - a.priority);
        this._queue.splice(index, 0, element);
    }
    dequeue() {
        const item = this._queue.shift();
        return item === null || item === void 0 ? void 0 : item.run;
    }
    filter(options) {
        return this._queue.filter((element) => element.priority === options.priority).map((element) => element.run);
    }
    get size() {
        return this._queue.length;
    }
}
exports.default = PriorityQueue;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Port of lower_bound from https://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
function lowerBound(array, value, comparator) {
    let first = 0;
    let count = array.length;
    while (count > 0) {
        const step = (count / 2) | 0;
        let it = first + step;
        if (comparator(array[it], value) <= 0) {
            first = ++it;
            count -= step + 1;
        }
        else {
            count = step;
        }
    }
    return first;
}
exports.default = lowerBound;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint no-var:0, prefer-arrow-callback: 0, object-shorthand: 0 */



var Punycode = __webpack_require__(96);


var internals = {};


//
// Read rules from file.
//
internals.rules = __webpack_require__(97).map(function (rule) {

  return {
    rule: rule,
    suffix: rule.replace(/^(\*\.|\!)/, ''),
    punySuffix: -1,
    wildcard: rule.charAt(0) === '*',
    exception: rule.charAt(0) === '!'
  };
});


//
// Check is given string ends with `suffix`.
//
internals.endsWith = function (str, suffix) {

  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};


//
// Find rule for a given domain.
//
internals.findRule = function (domain) {

  var punyDomain = Punycode.toASCII(domain);
  return internals.rules.reduce(function (memo, rule) {

    if (rule.punySuffix === -1){
      rule.punySuffix = Punycode.toASCII(rule.suffix);
    }
    if (!internals.endsWith(punyDomain, '.' + rule.punySuffix) && punyDomain !== rule.punySuffix) {
      return memo;
    }
    // This has been commented out as it never seems to run. This is because
    // sub tlds always appear after their parents and we never find a shorter
    // match.
    //if (memo) {
    //  var memoSuffix = Punycode.toASCII(memo.suffix);
    //  if (memoSuffix.length >= punySuffix.length) {
    //    return memo;
    //  }
    //}
    return rule;
  }, null);
};


//
// Error codes and messages.
//
exports.errorCodes = {
  DOMAIN_TOO_SHORT: 'Domain name too short.',
  DOMAIN_TOO_LONG: 'Domain name too long. It should be no more than 255 chars.',
  LABEL_STARTS_WITH_DASH: 'Domain name label can not start with a dash.',
  LABEL_ENDS_WITH_DASH: 'Domain name label can not end with a dash.',
  LABEL_TOO_LONG: 'Domain name label should be at most 63 chars long.',
  LABEL_TOO_SHORT: 'Domain name label should be at least 1 character long.',
  LABEL_INVALID_CHARS: 'Domain name label can only contain alphanumeric characters or dashes.'
};


//
// Validate domain name and throw if not valid.
//
// From wikipedia:
//
// Hostnames are composed of series of labels concatenated with dots, as are all
// domain names. Each label must be between 1 and 63 characters long, and the
// entire hostname (including the delimiting dots) has a maximum of 255 chars.
//
// Allowed chars:
//
// * `a-z`
// * `0-9`
// * `-` but not as a starting or ending character
// * `.` as a separator for the textual portions of a domain name
//
// * http://en.wikipedia.org/wiki/Domain_name
// * http://en.wikipedia.org/wiki/Hostname
//
internals.validate = function (input) {

  // Before we can validate we need to take care of IDNs with unicode chars.
  var ascii = Punycode.toASCII(input);

  if (ascii.length < 1) {
    return 'DOMAIN_TOO_SHORT';
  }
  if (ascii.length > 255) {
    return 'DOMAIN_TOO_LONG';
  }

  // Check each part's length and allowed chars.
  var labels = ascii.split('.');
  var label;

  for (var i = 0; i < labels.length; ++i) {
    label = labels[i];
    if (!label.length) {
      return 'LABEL_TOO_SHORT';
    }
    if (label.length > 63) {
      return 'LABEL_TOO_LONG';
    }
    if (label.charAt(0) === '-') {
      return 'LABEL_STARTS_WITH_DASH';
    }
    if (label.charAt(label.length - 1) === '-') {
      return 'LABEL_ENDS_WITH_DASH';
    }
    if (!/^[a-z0-9\-]+$/.test(label)) {
      return 'LABEL_INVALID_CHARS';
    }
  }
};


//
// Public API
//


//
// Parse domain.
//
exports.parse = function (input) {

  if (typeof input !== 'string') {
    throw new TypeError('Domain name must be a string.');
  }

  // Force domain to lowercase.
  var domain = input.slice(0).toLowerCase();

  // Handle FQDN.
  // TODO: Simply remove trailing dot?
  if (domain.charAt(domain.length - 1) === '.') {
    domain = domain.slice(0, domain.length - 1);
  }

  // Validate and sanitise input.
  var error = internals.validate(domain);
  if (error) {
    return {
      input: input,
      error: {
        message: exports.errorCodes[error],
        code: error
      }
    };
  }

  var parsed = {
    input: input,
    tld: null,
    sld: null,
    domain: null,
    subdomain: null,
    listed: false
  };

  var domainParts = domain.split('.');

  // Non-Internet TLD
  if (domainParts[domainParts.length - 1] === 'local') {
    return parsed;
  }

  var handlePunycode = function () {

    if (!/xn--/.test(domain)) {
      return parsed;
    }
    if (parsed.domain) {
      parsed.domain = Punycode.toASCII(parsed.domain);
    }
    if (parsed.subdomain) {
      parsed.subdomain = Punycode.toASCII(parsed.subdomain);
    }
    return parsed;
  };

  var rule = internals.findRule(domain);

  // Unlisted tld.
  if (!rule) {
    if (domainParts.length < 2) {
      return parsed;
    }
    parsed.tld = domainParts.pop();
    parsed.sld = domainParts.pop();
    parsed.domain = [parsed.sld, parsed.tld].join('.');
    if (domainParts.length) {
      parsed.subdomain = domainParts.pop();
    }
    return handlePunycode();
  }

  // At this point we know the public suffix is listed.
  parsed.listed = true;

  var tldParts = rule.suffix.split('.');
  var privateParts = domainParts.slice(0, domainParts.length - tldParts.length);

  if (rule.exception) {
    privateParts.push(tldParts.shift());
  }

  parsed.tld = tldParts.join('.');

  if (!privateParts.length) {
    return handlePunycode();
  }

  if (rule.wildcard) {
    tldParts.unshift(privateParts.pop());
    parsed.tld = tldParts.join('.');
  }

  if (!privateParts.length) {
    return handlePunycode();
  }

  parsed.sld = privateParts.pop();
  parsed.domain = [parsed.sld,  parsed.tld].join('.');

  if (privateParts.length) {
    parsed.subdomain = privateParts.join('.');
  }

  return handlePunycode();
};


//
// Get domain.
//
exports.get = function (domain) {

  if (!domain) {
    return null;
  }
  return exports.parse(domain).domain || null;
};


//
// Check whether domain belongs to a known public suffix.
//
exports.isValid = function (domain) {

  var parsed = exports.parse(domain);
  return Boolean(parsed.domain && parsed.listed);
};


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ucs2decode", function() { return ucs2decode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ucs2encode", function() { return ucs2encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toASCII", function() { return toASCII; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUnicode", function() { return toUnicode; });


/** Highest positive signed 32-bit float value */
const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128; // 0x80
const delimiter = '-'; // '\x2D'

/** Regular expressions */
const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
const errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
const baseMinusTMin = base - tMin;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	const result = [];
	let length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	const parts = string.split('@');
	let result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	const labels = string.split('.');
	const encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	const output = [];
	let counter = 0;
	const length = string.length;
	while (counter < length) {
		const value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			const extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
const ucs2encode = array => String.fromCodePoint(...array);

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
const basicToDigit = function(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
const digitToBasic = function(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
const adapt = function(delta, numPoints, firstTime) {
	let k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
const decode = function(input) {
	// Don't use UCS-2.
	const output = [];
	const inputLength = input.length;
	let i = 0;
	let n = initialN;
	let bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	let basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (let j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		let oldi = i;
		for (let w = 1, k = base; /* no condition */; k += base) {

			if (index >= inputLength) {
				error('invalid-input');
			}

			const digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error('overflow');
			}

			i += digit * w;
			const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

			if (digit < t) {
				break;
			}

			const baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error('overflow');
			}

			w *= baseMinusT;

		}

		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);

	}

	return String.fromCodePoint(...output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
const encode = function(input) {
	const output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	let inputLength = input.length;

	// Initialize the state.
	let n = initialN;
	let delta = 0;
	let bias = initialBias;

	// Handle the basic code points.
	for (const currentValue of input) {
		if (currentValue < 0x80) {
			output.push(stringFromCharCode(currentValue));
		}
	}

	let basicLength = output.length;
	let handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		let m = maxInt;
		for (const currentValue of input) {
			if (currentValue >= n && currentValue < m) {
				m = currentValue;
			}
		}

		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
		// but guard against overflow.
		const handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		for (const currentValue of input) {
			if (currentValue < n && ++delta > maxInt) {
				error('overflow');
			}
			if (currentValue == n) {
				// Represent delta as a generalized variable-length integer.
				let q = delta;
				for (let k = base; /* no condition */; k += base) {
					const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
					if (q < t) {
						break;
					}
					const qMinusT = q - t;
					const baseMinusT = base - t;
					output.push(
						stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
					);
					q = floor(qMinusT / baseMinusT);
				}

				output.push(stringFromCharCode(digitToBasic(q, 0)));
				bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
				delta = 0;
				++handledCPCount;
			}
		}

		++delta;
		++n;

	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
const toUnicode = function(input) {
	return mapDomain(input, function(string) {
		return regexPunycode.test(string)
			? decode(string.slice(4).toLowerCase())
			: string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
const toASCII = function(input) {
	return mapDomain(input, function(string) {
		return regexNonASCII.test(string)
			? 'xn--' + encode(string)
			: string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
const punycode = {
	/**
	 * A string representing the current Punycode.js version number.
	 * @memberOf punycode
	 * @type String
	 */
	'version': '2.1.0',
	/**
	 * An object of methods to convert from JavaScript's internal character
	 * representation (UCS-2) to Unicode code points, and back.
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode
	 * @type Object
	 */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};


/* harmony default export */ __webpack_exports__["default"] = (punycode);


/***/ }),
/* 97 */
/***/ (function(module) {

module.exports = JSON.parse("[\"ac\",\"com.ac\",\"edu.ac\",\"gov.ac\",\"net.ac\",\"mil.ac\",\"org.ac\",\"ad\",\"nom.ad\",\"ae\",\"co.ae\",\"net.ae\",\"org.ae\",\"sch.ae\",\"ac.ae\",\"gov.ae\",\"mil.ae\",\"aero\",\"accident-investigation.aero\",\"accident-prevention.aero\",\"aerobatic.aero\",\"aeroclub.aero\",\"aerodrome.aero\",\"agents.aero\",\"aircraft.aero\",\"airline.aero\",\"airport.aero\",\"air-surveillance.aero\",\"airtraffic.aero\",\"air-traffic-control.aero\",\"ambulance.aero\",\"amusement.aero\",\"association.aero\",\"author.aero\",\"ballooning.aero\",\"broker.aero\",\"caa.aero\",\"cargo.aero\",\"catering.aero\",\"certification.aero\",\"championship.aero\",\"charter.aero\",\"civilaviation.aero\",\"club.aero\",\"conference.aero\",\"consultant.aero\",\"consulting.aero\",\"control.aero\",\"council.aero\",\"crew.aero\",\"design.aero\",\"dgca.aero\",\"educator.aero\",\"emergency.aero\",\"engine.aero\",\"engineer.aero\",\"entertainment.aero\",\"equipment.aero\",\"exchange.aero\",\"express.aero\",\"federation.aero\",\"flight.aero\",\"freight.aero\",\"fuel.aero\",\"gliding.aero\",\"government.aero\",\"groundhandling.aero\",\"group.aero\",\"hanggliding.aero\",\"homebuilt.aero\",\"insurance.aero\",\"journal.aero\",\"journalist.aero\",\"leasing.aero\",\"logistics.aero\",\"magazine.aero\",\"maintenance.aero\",\"media.aero\",\"microlight.aero\",\"modelling.aero\",\"navigation.aero\",\"parachuting.aero\",\"paragliding.aero\",\"passenger-association.aero\",\"pilot.aero\",\"press.aero\",\"production.aero\",\"recreation.aero\",\"repbody.aero\",\"res.aero\",\"research.aero\",\"rotorcraft.aero\",\"safety.aero\",\"scientist.aero\",\"services.aero\",\"show.aero\",\"skydiving.aero\",\"software.aero\",\"student.aero\",\"trader.aero\",\"trading.aero\",\"trainer.aero\",\"union.aero\",\"workinggroup.aero\",\"works.aero\",\"af\",\"gov.af\",\"com.af\",\"org.af\",\"net.af\",\"edu.af\",\"ag\",\"com.ag\",\"org.ag\",\"net.ag\",\"co.ag\",\"nom.ag\",\"ai\",\"off.ai\",\"com.ai\",\"net.ai\",\"org.ai\",\"al\",\"com.al\",\"edu.al\",\"gov.al\",\"mil.al\",\"net.al\",\"org.al\",\"am\",\"co.am\",\"com.am\",\"commune.am\",\"net.am\",\"org.am\",\"ao\",\"ed.ao\",\"gv.ao\",\"og.ao\",\"co.ao\",\"pb.ao\",\"it.ao\",\"aq\",\"ar\",\"com.ar\",\"edu.ar\",\"gob.ar\",\"gov.ar\",\"int.ar\",\"mil.ar\",\"musica.ar\",\"net.ar\",\"org.ar\",\"tur.ar\",\"arpa\",\"e164.arpa\",\"in-addr.arpa\",\"ip6.arpa\",\"iris.arpa\",\"uri.arpa\",\"urn.arpa\",\"as\",\"gov.as\",\"asia\",\"at\",\"ac.at\",\"co.at\",\"gv.at\",\"or.at\",\"au\",\"com.au\",\"net.au\",\"org.au\",\"edu.au\",\"gov.au\",\"asn.au\",\"id.au\",\"info.au\",\"conf.au\",\"oz.au\",\"act.au\",\"nsw.au\",\"nt.au\",\"qld.au\",\"sa.au\",\"tas.au\",\"vic.au\",\"wa.au\",\"act.edu.au\",\"catholic.edu.au\",\"nsw.edu.au\",\"nt.edu.au\",\"qld.edu.au\",\"sa.edu.au\",\"tas.edu.au\",\"vic.edu.au\",\"wa.edu.au\",\"qld.gov.au\",\"sa.gov.au\",\"tas.gov.au\",\"vic.gov.au\",\"wa.gov.au\",\"education.tas.edu.au\",\"schools.nsw.edu.au\",\"aw\",\"com.aw\",\"ax\",\"az\",\"com.az\",\"net.az\",\"int.az\",\"gov.az\",\"org.az\",\"edu.az\",\"info.az\",\"pp.az\",\"mil.az\",\"name.az\",\"pro.az\",\"biz.az\",\"ba\",\"com.ba\",\"edu.ba\",\"gov.ba\",\"mil.ba\",\"net.ba\",\"org.ba\",\"bb\",\"biz.bb\",\"co.bb\",\"com.bb\",\"edu.bb\",\"gov.bb\",\"info.bb\",\"net.bb\",\"org.bb\",\"store.bb\",\"tv.bb\",\"*.bd\",\"be\",\"ac.be\",\"bf\",\"gov.bf\",\"bg\",\"a.bg\",\"b.bg\",\"c.bg\",\"d.bg\",\"e.bg\",\"f.bg\",\"g.bg\",\"h.bg\",\"i.bg\",\"j.bg\",\"k.bg\",\"l.bg\",\"m.bg\",\"n.bg\",\"o.bg\",\"p.bg\",\"q.bg\",\"r.bg\",\"s.bg\",\"t.bg\",\"u.bg\",\"v.bg\",\"w.bg\",\"x.bg\",\"y.bg\",\"z.bg\",\"0.bg\",\"1.bg\",\"2.bg\",\"3.bg\",\"4.bg\",\"5.bg\",\"6.bg\",\"7.bg\",\"8.bg\",\"9.bg\",\"bh\",\"com.bh\",\"edu.bh\",\"net.bh\",\"org.bh\",\"gov.bh\",\"bi\",\"co.bi\",\"com.bi\",\"edu.bi\",\"or.bi\",\"org.bi\",\"biz\",\"bj\",\"asso.bj\",\"barreau.bj\",\"gouv.bj\",\"bm\",\"com.bm\",\"edu.bm\",\"gov.bm\",\"net.bm\",\"org.bm\",\"bn\",\"com.bn\",\"edu.bn\",\"gov.bn\",\"net.bn\",\"org.bn\",\"bo\",\"com.bo\",\"edu.bo\",\"gob.bo\",\"int.bo\",\"org.bo\",\"net.bo\",\"mil.bo\",\"tv.bo\",\"web.bo\",\"academia.bo\",\"agro.bo\",\"arte.bo\",\"blog.bo\",\"bolivia.bo\",\"ciencia.bo\",\"cooperativa.bo\",\"democracia.bo\",\"deporte.bo\",\"ecologia.bo\",\"economia.bo\",\"empresa.bo\",\"indigena.bo\",\"industria.bo\",\"info.bo\",\"medicina.bo\",\"movimiento.bo\",\"musica.bo\",\"natural.bo\",\"nombre.bo\",\"noticias.bo\",\"patria.bo\",\"politica.bo\",\"profesional.bo\",\"plurinacional.bo\",\"pueblo.bo\",\"revista.bo\",\"salud.bo\",\"tecnologia.bo\",\"tksat.bo\",\"transporte.bo\",\"wiki.bo\",\"br\",\"9guacu.br\",\"abc.br\",\"adm.br\",\"adv.br\",\"agr.br\",\"aju.br\",\"am.br\",\"anani.br\",\"aparecida.br\",\"arq.br\",\"art.br\",\"ato.br\",\"b.br\",\"barueri.br\",\"belem.br\",\"bhz.br\",\"bio.br\",\"blog.br\",\"bmd.br\",\"boavista.br\",\"bsb.br\",\"campinagrande.br\",\"campinas.br\",\"caxias.br\",\"cim.br\",\"cng.br\",\"cnt.br\",\"com.br\",\"contagem.br\",\"coop.br\",\"cri.br\",\"cuiaba.br\",\"curitiba.br\",\"def.br\",\"ecn.br\",\"eco.br\",\"edu.br\",\"emp.br\",\"eng.br\",\"esp.br\",\"etc.br\",\"eti.br\",\"far.br\",\"feira.br\",\"flog.br\",\"floripa.br\",\"fm.br\",\"fnd.br\",\"fortal.br\",\"fot.br\",\"foz.br\",\"fst.br\",\"g12.br\",\"ggf.br\",\"goiania.br\",\"gov.br\",\"ac.gov.br\",\"al.gov.br\",\"am.gov.br\",\"ap.gov.br\",\"ba.gov.br\",\"ce.gov.br\",\"df.gov.br\",\"es.gov.br\",\"go.gov.br\",\"ma.gov.br\",\"mg.gov.br\",\"ms.gov.br\",\"mt.gov.br\",\"pa.gov.br\",\"pb.gov.br\",\"pe.gov.br\",\"pi.gov.br\",\"pr.gov.br\",\"rj.gov.br\",\"rn.gov.br\",\"ro.gov.br\",\"rr.gov.br\",\"rs.gov.br\",\"sc.gov.br\",\"se.gov.br\",\"sp.gov.br\",\"to.gov.br\",\"gru.br\",\"imb.br\",\"ind.br\",\"inf.br\",\"jab.br\",\"jampa.br\",\"jdf.br\",\"joinville.br\",\"jor.br\",\"jus.br\",\"leg.br\",\"lel.br\",\"londrina.br\",\"macapa.br\",\"maceio.br\",\"manaus.br\",\"maringa.br\",\"mat.br\",\"med.br\",\"mil.br\",\"morena.br\",\"mp.br\",\"mus.br\",\"natal.br\",\"net.br\",\"niteroi.br\",\"*.nom.br\",\"not.br\",\"ntr.br\",\"odo.br\",\"ong.br\",\"org.br\",\"osasco.br\",\"palmas.br\",\"poa.br\",\"ppg.br\",\"pro.br\",\"psc.br\",\"psi.br\",\"pvh.br\",\"qsl.br\",\"radio.br\",\"rec.br\",\"recife.br\",\"ribeirao.br\",\"rio.br\",\"riobranco.br\",\"riopreto.br\",\"salvador.br\",\"sampa.br\",\"santamaria.br\",\"santoandre.br\",\"saobernardo.br\",\"saogonca.br\",\"sjc.br\",\"slg.br\",\"slz.br\",\"sorocaba.br\",\"srv.br\",\"taxi.br\",\"tc.br\",\"teo.br\",\"the.br\",\"tmp.br\",\"trd.br\",\"tur.br\",\"tv.br\",\"udi.br\",\"vet.br\",\"vix.br\",\"vlog.br\",\"wiki.br\",\"zlg.br\",\"bs\",\"com.bs\",\"net.bs\",\"org.bs\",\"edu.bs\",\"gov.bs\",\"bt\",\"com.bt\",\"edu.bt\",\"gov.bt\",\"net.bt\",\"org.bt\",\"bv\",\"bw\",\"co.bw\",\"org.bw\",\"by\",\"gov.by\",\"mil.by\",\"com.by\",\"of.by\",\"bz\",\"com.bz\",\"net.bz\",\"org.bz\",\"edu.bz\",\"gov.bz\",\"ca\",\"ab.ca\",\"bc.ca\",\"mb.ca\",\"nb.ca\",\"nf.ca\",\"nl.ca\",\"ns.ca\",\"nt.ca\",\"nu.ca\",\"on.ca\",\"pe.ca\",\"qc.ca\",\"sk.ca\",\"yk.ca\",\"gc.ca\",\"cat\",\"cc\",\"cd\",\"gov.cd\",\"cf\",\"cg\",\"ch\",\"ci\",\"org.ci\",\"or.ci\",\"com.ci\",\"co.ci\",\"edu.ci\",\"ed.ci\",\"ac.ci\",\"net.ci\",\"go.ci\",\"asso.ci\",\"aéroport.ci\",\"int.ci\",\"presse.ci\",\"md.ci\",\"gouv.ci\",\"*.ck\",\"!www.ck\",\"cl\",\"aprendemas.cl\",\"co.cl\",\"gob.cl\",\"gov.cl\",\"mil.cl\",\"cm\",\"co.cm\",\"com.cm\",\"gov.cm\",\"net.cm\",\"cn\",\"ac.cn\",\"com.cn\",\"edu.cn\",\"gov.cn\",\"net.cn\",\"org.cn\",\"mil.cn\",\"公司.cn\",\"网络.cn\",\"網絡.cn\",\"ah.cn\",\"bj.cn\",\"cq.cn\",\"fj.cn\",\"gd.cn\",\"gs.cn\",\"gz.cn\",\"gx.cn\",\"ha.cn\",\"hb.cn\",\"he.cn\",\"hi.cn\",\"hl.cn\",\"hn.cn\",\"jl.cn\",\"js.cn\",\"jx.cn\",\"ln.cn\",\"nm.cn\",\"nx.cn\",\"qh.cn\",\"sc.cn\",\"sd.cn\",\"sh.cn\",\"sn.cn\",\"sx.cn\",\"tj.cn\",\"xj.cn\",\"xz.cn\",\"yn.cn\",\"zj.cn\",\"hk.cn\",\"mo.cn\",\"tw.cn\",\"co\",\"arts.co\",\"com.co\",\"edu.co\",\"firm.co\",\"gov.co\",\"info.co\",\"int.co\",\"mil.co\",\"net.co\",\"nom.co\",\"org.co\",\"rec.co\",\"web.co\",\"com\",\"coop\",\"cr\",\"ac.cr\",\"co.cr\",\"ed.cr\",\"fi.cr\",\"go.cr\",\"or.cr\",\"sa.cr\",\"cu\",\"com.cu\",\"edu.cu\",\"org.cu\",\"net.cu\",\"gov.cu\",\"inf.cu\",\"cv\",\"cw\",\"com.cw\",\"edu.cw\",\"net.cw\",\"org.cw\",\"cx\",\"gov.cx\",\"cy\",\"ac.cy\",\"biz.cy\",\"com.cy\",\"ekloges.cy\",\"gov.cy\",\"ltd.cy\",\"name.cy\",\"net.cy\",\"org.cy\",\"parliament.cy\",\"press.cy\",\"pro.cy\",\"tm.cy\",\"cz\",\"de\",\"dj\",\"dk\",\"dm\",\"com.dm\",\"net.dm\",\"org.dm\",\"edu.dm\",\"gov.dm\",\"do\",\"art.do\",\"com.do\",\"edu.do\",\"gob.do\",\"gov.do\",\"mil.do\",\"net.do\",\"org.do\",\"sld.do\",\"web.do\",\"dz\",\"com.dz\",\"org.dz\",\"net.dz\",\"gov.dz\",\"edu.dz\",\"asso.dz\",\"pol.dz\",\"art.dz\",\"ec\",\"com.ec\",\"info.ec\",\"net.ec\",\"fin.ec\",\"k12.ec\",\"med.ec\",\"pro.ec\",\"org.ec\",\"edu.ec\",\"gov.ec\",\"gob.ec\",\"mil.ec\",\"edu\",\"ee\",\"edu.ee\",\"gov.ee\",\"riik.ee\",\"lib.ee\",\"med.ee\",\"com.ee\",\"pri.ee\",\"aip.ee\",\"org.ee\",\"fie.ee\",\"eg\",\"com.eg\",\"edu.eg\",\"eun.eg\",\"gov.eg\",\"mil.eg\",\"name.eg\",\"net.eg\",\"org.eg\",\"sci.eg\",\"*.er\",\"es\",\"com.es\",\"nom.es\",\"org.es\",\"gob.es\",\"edu.es\",\"et\",\"com.et\",\"gov.et\",\"org.et\",\"edu.et\",\"biz.et\",\"name.et\",\"info.et\",\"net.et\",\"eu\",\"fi\",\"aland.fi\",\"fj\",\"ac.fj\",\"biz.fj\",\"com.fj\",\"gov.fj\",\"info.fj\",\"mil.fj\",\"name.fj\",\"net.fj\",\"org.fj\",\"pro.fj\",\"*.fk\",\"fm\",\"fo\",\"fr\",\"asso.fr\",\"com.fr\",\"gouv.fr\",\"nom.fr\",\"prd.fr\",\"tm.fr\",\"aeroport.fr\",\"avocat.fr\",\"avoues.fr\",\"cci.fr\",\"chambagri.fr\",\"chirurgiens-dentistes.fr\",\"experts-comptables.fr\",\"geometre-expert.fr\",\"greta.fr\",\"huissier-justice.fr\",\"medecin.fr\",\"notaires.fr\",\"pharmacien.fr\",\"port.fr\",\"veterinaire.fr\",\"ga\",\"gb\",\"gd\",\"ge\",\"com.ge\",\"edu.ge\",\"gov.ge\",\"org.ge\",\"mil.ge\",\"net.ge\",\"pvt.ge\",\"gf\",\"gg\",\"co.gg\",\"net.gg\",\"org.gg\",\"gh\",\"com.gh\",\"edu.gh\",\"gov.gh\",\"org.gh\",\"mil.gh\",\"gi\",\"com.gi\",\"ltd.gi\",\"gov.gi\",\"mod.gi\",\"edu.gi\",\"org.gi\",\"gl\",\"co.gl\",\"com.gl\",\"edu.gl\",\"net.gl\",\"org.gl\",\"gm\",\"gn\",\"ac.gn\",\"com.gn\",\"edu.gn\",\"gov.gn\",\"org.gn\",\"net.gn\",\"gov\",\"gp\",\"com.gp\",\"net.gp\",\"mobi.gp\",\"edu.gp\",\"org.gp\",\"asso.gp\",\"gq\",\"gr\",\"com.gr\",\"edu.gr\",\"net.gr\",\"org.gr\",\"gov.gr\",\"gs\",\"gt\",\"com.gt\",\"edu.gt\",\"gob.gt\",\"ind.gt\",\"mil.gt\",\"net.gt\",\"org.gt\",\"gu\",\"com.gu\",\"edu.gu\",\"gov.gu\",\"guam.gu\",\"info.gu\",\"net.gu\",\"org.gu\",\"web.gu\",\"gw\",\"gy\",\"co.gy\",\"com.gy\",\"edu.gy\",\"gov.gy\",\"net.gy\",\"org.gy\",\"hk\",\"com.hk\",\"edu.hk\",\"gov.hk\",\"idv.hk\",\"net.hk\",\"org.hk\",\"公司.hk\",\"教育.hk\",\"敎育.hk\",\"政府.hk\",\"個人.hk\",\"个人.hk\",\"箇人.hk\",\"網络.hk\",\"网络.hk\",\"组織.hk\",\"網絡.hk\",\"网絡.hk\",\"组织.hk\",\"組織.hk\",\"組织.hk\",\"hm\",\"hn\",\"com.hn\",\"edu.hn\",\"org.hn\",\"net.hn\",\"mil.hn\",\"gob.hn\",\"hr\",\"iz.hr\",\"from.hr\",\"name.hr\",\"com.hr\",\"ht\",\"com.ht\",\"shop.ht\",\"firm.ht\",\"info.ht\",\"adult.ht\",\"net.ht\",\"pro.ht\",\"org.ht\",\"med.ht\",\"art.ht\",\"coop.ht\",\"pol.ht\",\"asso.ht\",\"edu.ht\",\"rel.ht\",\"gouv.ht\",\"perso.ht\",\"hu\",\"co.hu\",\"info.hu\",\"org.hu\",\"priv.hu\",\"sport.hu\",\"tm.hu\",\"2000.hu\",\"agrar.hu\",\"bolt.hu\",\"casino.hu\",\"city.hu\",\"erotica.hu\",\"erotika.hu\",\"film.hu\",\"forum.hu\",\"games.hu\",\"hotel.hu\",\"ingatlan.hu\",\"jogasz.hu\",\"konyvelo.hu\",\"lakas.hu\",\"media.hu\",\"news.hu\",\"reklam.hu\",\"sex.hu\",\"shop.hu\",\"suli.hu\",\"szex.hu\",\"tozsde.hu\",\"utazas.hu\",\"video.hu\",\"id\",\"ac.id\",\"biz.id\",\"co.id\",\"desa.id\",\"go.id\",\"mil.id\",\"my.id\",\"net.id\",\"or.id\",\"ponpes.id\",\"sch.id\",\"web.id\",\"ie\",\"gov.ie\",\"il\",\"ac.il\",\"co.il\",\"gov.il\",\"idf.il\",\"k12.il\",\"muni.il\",\"net.il\",\"org.il\",\"im\",\"ac.im\",\"co.im\",\"com.im\",\"ltd.co.im\",\"net.im\",\"org.im\",\"plc.co.im\",\"tt.im\",\"tv.im\",\"in\",\"co.in\",\"firm.in\",\"net.in\",\"org.in\",\"gen.in\",\"ind.in\",\"nic.in\",\"ac.in\",\"edu.in\",\"res.in\",\"gov.in\",\"mil.in\",\"info\",\"int\",\"eu.int\",\"io\",\"com.io\",\"iq\",\"gov.iq\",\"edu.iq\",\"mil.iq\",\"com.iq\",\"org.iq\",\"net.iq\",\"ir\",\"ac.ir\",\"co.ir\",\"gov.ir\",\"id.ir\",\"net.ir\",\"org.ir\",\"sch.ir\",\"ایران.ir\",\"ايران.ir\",\"is\",\"net.is\",\"com.is\",\"edu.is\",\"gov.is\",\"org.is\",\"int.is\",\"it\",\"gov.it\",\"edu.it\",\"abr.it\",\"abruzzo.it\",\"aosta-valley.it\",\"aostavalley.it\",\"bas.it\",\"basilicata.it\",\"cal.it\",\"calabria.it\",\"cam.it\",\"campania.it\",\"emilia-romagna.it\",\"emiliaromagna.it\",\"emr.it\",\"friuli-v-giulia.it\",\"friuli-ve-giulia.it\",\"friuli-vegiulia.it\",\"friuli-venezia-giulia.it\",\"friuli-veneziagiulia.it\",\"friuli-vgiulia.it\",\"friuliv-giulia.it\",\"friulive-giulia.it\",\"friulivegiulia.it\",\"friulivenezia-giulia.it\",\"friuliveneziagiulia.it\",\"friulivgiulia.it\",\"fvg.it\",\"laz.it\",\"lazio.it\",\"lig.it\",\"liguria.it\",\"lom.it\",\"lombardia.it\",\"lombardy.it\",\"lucania.it\",\"mar.it\",\"marche.it\",\"mol.it\",\"molise.it\",\"piedmont.it\",\"piemonte.it\",\"pmn.it\",\"pug.it\",\"puglia.it\",\"sar.it\",\"sardegna.it\",\"sardinia.it\",\"sic.it\",\"sicilia.it\",\"sicily.it\",\"taa.it\",\"tos.it\",\"toscana.it\",\"trentin-sud-tirol.it\",\"trentin-süd-tirol.it\",\"trentin-sudtirol.it\",\"trentin-südtirol.it\",\"trentin-sued-tirol.it\",\"trentin-suedtirol.it\",\"trentino-a-adige.it\",\"trentino-aadige.it\",\"trentino-alto-adige.it\",\"trentino-altoadige.it\",\"trentino-s-tirol.it\",\"trentino-stirol.it\",\"trentino-sud-tirol.it\",\"trentino-süd-tirol.it\",\"trentino-sudtirol.it\",\"trentino-südtirol.it\",\"trentino-sued-tirol.it\",\"trentino-suedtirol.it\",\"trentino.it\",\"trentinoa-adige.it\",\"trentinoaadige.it\",\"trentinoalto-adige.it\",\"trentinoaltoadige.it\",\"trentinos-tirol.it\",\"trentinostirol.it\",\"trentinosud-tirol.it\",\"trentinosüd-tirol.it\",\"trentinosudtirol.it\",\"trentinosüdtirol.it\",\"trentinosued-tirol.it\",\"trentinosuedtirol.it\",\"trentinsud-tirol.it\",\"trentinsüd-tirol.it\",\"trentinsudtirol.it\",\"trentinsüdtirol.it\",\"trentinsued-tirol.it\",\"trentinsuedtirol.it\",\"tuscany.it\",\"umb.it\",\"umbria.it\",\"val-d-aosta.it\",\"val-daosta.it\",\"vald-aosta.it\",\"valdaosta.it\",\"valle-aosta.it\",\"valle-d-aosta.it\",\"valle-daosta.it\",\"valleaosta.it\",\"valled-aosta.it\",\"valledaosta.it\",\"vallee-aoste.it\",\"vallée-aoste.it\",\"vallee-d-aoste.it\",\"vallée-d-aoste.it\",\"valleeaoste.it\",\"valléeaoste.it\",\"valleedaoste.it\",\"valléedaoste.it\",\"vao.it\",\"vda.it\",\"ven.it\",\"veneto.it\",\"ag.it\",\"agrigento.it\",\"al.it\",\"alessandria.it\",\"alto-adige.it\",\"altoadige.it\",\"an.it\",\"ancona.it\",\"andria-barletta-trani.it\",\"andria-trani-barletta.it\",\"andriabarlettatrani.it\",\"andriatranibarletta.it\",\"ao.it\",\"aosta.it\",\"aoste.it\",\"ap.it\",\"aq.it\",\"aquila.it\",\"ar.it\",\"arezzo.it\",\"ascoli-piceno.it\",\"ascolipiceno.it\",\"asti.it\",\"at.it\",\"av.it\",\"avellino.it\",\"ba.it\",\"balsan-sudtirol.it\",\"balsan-südtirol.it\",\"balsan-suedtirol.it\",\"balsan.it\",\"bari.it\",\"barletta-trani-andria.it\",\"barlettatraniandria.it\",\"belluno.it\",\"benevento.it\",\"bergamo.it\",\"bg.it\",\"bi.it\",\"biella.it\",\"bl.it\",\"bn.it\",\"bo.it\",\"bologna.it\",\"bolzano-altoadige.it\",\"bolzano.it\",\"bozen-sudtirol.it\",\"bozen-südtirol.it\",\"bozen-suedtirol.it\",\"bozen.it\",\"br.it\",\"brescia.it\",\"brindisi.it\",\"bs.it\",\"bt.it\",\"bulsan-sudtirol.it\",\"bulsan-südtirol.it\",\"bulsan-suedtirol.it\",\"bulsan.it\",\"bz.it\",\"ca.it\",\"cagliari.it\",\"caltanissetta.it\",\"campidano-medio.it\",\"campidanomedio.it\",\"campobasso.it\",\"carbonia-iglesias.it\",\"carboniaiglesias.it\",\"carrara-massa.it\",\"carraramassa.it\",\"caserta.it\",\"catania.it\",\"catanzaro.it\",\"cb.it\",\"ce.it\",\"cesena-forli.it\",\"cesena-forlì.it\",\"cesenaforli.it\",\"cesenaforlì.it\",\"ch.it\",\"chieti.it\",\"ci.it\",\"cl.it\",\"cn.it\",\"co.it\",\"como.it\",\"cosenza.it\",\"cr.it\",\"cremona.it\",\"crotone.it\",\"cs.it\",\"ct.it\",\"cuneo.it\",\"cz.it\",\"dell-ogliastra.it\",\"dellogliastra.it\",\"en.it\",\"enna.it\",\"fc.it\",\"fe.it\",\"fermo.it\",\"ferrara.it\",\"fg.it\",\"fi.it\",\"firenze.it\",\"florence.it\",\"fm.it\",\"foggia.it\",\"forli-cesena.it\",\"forlì-cesena.it\",\"forlicesena.it\",\"forlìcesena.it\",\"fr.it\",\"frosinone.it\",\"ge.it\",\"genoa.it\",\"genova.it\",\"go.it\",\"gorizia.it\",\"gr.it\",\"grosseto.it\",\"iglesias-carbonia.it\",\"iglesiascarbonia.it\",\"im.it\",\"imperia.it\",\"is.it\",\"isernia.it\",\"kr.it\",\"la-spezia.it\",\"laquila.it\",\"laspezia.it\",\"latina.it\",\"lc.it\",\"le.it\",\"lecce.it\",\"lecco.it\",\"li.it\",\"livorno.it\",\"lo.it\",\"lodi.it\",\"lt.it\",\"lu.it\",\"lucca.it\",\"macerata.it\",\"mantova.it\",\"massa-carrara.it\",\"massacarrara.it\",\"matera.it\",\"mb.it\",\"mc.it\",\"me.it\",\"medio-campidano.it\",\"mediocampidano.it\",\"messina.it\",\"mi.it\",\"milan.it\",\"milano.it\",\"mn.it\",\"mo.it\",\"modena.it\",\"monza-brianza.it\",\"monza-e-della-brianza.it\",\"monza.it\",\"monzabrianza.it\",\"monzaebrianza.it\",\"monzaedellabrianza.it\",\"ms.it\",\"mt.it\",\"na.it\",\"naples.it\",\"napoli.it\",\"no.it\",\"novara.it\",\"nu.it\",\"nuoro.it\",\"og.it\",\"ogliastra.it\",\"olbia-tempio.it\",\"olbiatempio.it\",\"or.it\",\"oristano.it\",\"ot.it\",\"pa.it\",\"padova.it\",\"padua.it\",\"palermo.it\",\"parma.it\",\"pavia.it\",\"pc.it\",\"pd.it\",\"pe.it\",\"perugia.it\",\"pesaro-urbino.it\",\"pesarourbino.it\",\"pescara.it\",\"pg.it\",\"pi.it\",\"piacenza.it\",\"pisa.it\",\"pistoia.it\",\"pn.it\",\"po.it\",\"pordenone.it\",\"potenza.it\",\"pr.it\",\"prato.it\",\"pt.it\",\"pu.it\",\"pv.it\",\"pz.it\",\"ra.it\",\"ragusa.it\",\"ravenna.it\",\"rc.it\",\"re.it\",\"reggio-calabria.it\",\"reggio-emilia.it\",\"reggiocalabria.it\",\"reggioemilia.it\",\"rg.it\",\"ri.it\",\"rieti.it\",\"rimini.it\",\"rm.it\",\"rn.it\",\"ro.it\",\"roma.it\",\"rome.it\",\"rovigo.it\",\"sa.it\",\"salerno.it\",\"sassari.it\",\"savona.it\",\"si.it\",\"siena.it\",\"siracusa.it\",\"so.it\",\"sondrio.it\",\"sp.it\",\"sr.it\",\"ss.it\",\"suedtirol.it\",\"südtirol.it\",\"sv.it\",\"ta.it\",\"taranto.it\",\"te.it\",\"tempio-olbia.it\",\"tempioolbia.it\",\"teramo.it\",\"terni.it\",\"tn.it\",\"to.it\",\"torino.it\",\"tp.it\",\"tr.it\",\"trani-andria-barletta.it\",\"trani-barletta-andria.it\",\"traniandriabarletta.it\",\"tranibarlettaandria.it\",\"trapani.it\",\"trento.it\",\"treviso.it\",\"trieste.it\",\"ts.it\",\"turin.it\",\"tv.it\",\"ud.it\",\"udine.it\",\"urbino-pesaro.it\",\"urbinopesaro.it\",\"va.it\",\"varese.it\",\"vb.it\",\"vc.it\",\"ve.it\",\"venezia.it\",\"venice.it\",\"verbania.it\",\"vercelli.it\",\"verona.it\",\"vi.it\",\"vibo-valentia.it\",\"vibovalentia.it\",\"vicenza.it\",\"viterbo.it\",\"vr.it\",\"vs.it\",\"vt.it\",\"vv.it\",\"je\",\"co.je\",\"net.je\",\"org.je\",\"*.jm\",\"jo\",\"com.jo\",\"org.jo\",\"net.jo\",\"edu.jo\",\"sch.jo\",\"gov.jo\",\"mil.jo\",\"name.jo\",\"jobs\",\"jp\",\"ac.jp\",\"ad.jp\",\"co.jp\",\"ed.jp\",\"go.jp\",\"gr.jp\",\"lg.jp\",\"ne.jp\",\"or.jp\",\"aichi.jp\",\"akita.jp\",\"aomori.jp\",\"chiba.jp\",\"ehime.jp\",\"fukui.jp\",\"fukuoka.jp\",\"fukushima.jp\",\"gifu.jp\",\"gunma.jp\",\"hiroshima.jp\",\"hokkaido.jp\",\"hyogo.jp\",\"ibaraki.jp\",\"ishikawa.jp\",\"iwate.jp\",\"kagawa.jp\",\"kagoshima.jp\",\"kanagawa.jp\",\"kochi.jp\",\"kumamoto.jp\",\"kyoto.jp\",\"mie.jp\",\"miyagi.jp\",\"miyazaki.jp\",\"nagano.jp\",\"nagasaki.jp\",\"nara.jp\",\"niigata.jp\",\"oita.jp\",\"okayama.jp\",\"okinawa.jp\",\"osaka.jp\",\"saga.jp\",\"saitama.jp\",\"shiga.jp\",\"shimane.jp\",\"shizuoka.jp\",\"tochigi.jp\",\"tokushima.jp\",\"tokyo.jp\",\"tottori.jp\",\"toyama.jp\",\"wakayama.jp\",\"yamagata.jp\",\"yamaguchi.jp\",\"yamanashi.jp\",\"栃木.jp\",\"愛知.jp\",\"愛媛.jp\",\"兵庫.jp\",\"熊本.jp\",\"茨城.jp\",\"北海道.jp\",\"千葉.jp\",\"和歌山.jp\",\"長崎.jp\",\"長野.jp\",\"新潟.jp\",\"青森.jp\",\"静岡.jp\",\"東京.jp\",\"石川.jp\",\"埼玉.jp\",\"三重.jp\",\"京都.jp\",\"佐賀.jp\",\"大分.jp\",\"大阪.jp\",\"奈良.jp\",\"宮城.jp\",\"宮崎.jp\",\"富山.jp\",\"山口.jp\",\"山形.jp\",\"山梨.jp\",\"岩手.jp\",\"岐阜.jp\",\"岡山.jp\",\"島根.jp\",\"広島.jp\",\"徳島.jp\",\"沖縄.jp\",\"滋賀.jp\",\"神奈川.jp\",\"福井.jp\",\"福岡.jp\",\"福島.jp\",\"秋田.jp\",\"群馬.jp\",\"香川.jp\",\"高知.jp\",\"鳥取.jp\",\"鹿児島.jp\",\"*.kawasaki.jp\",\"*.kitakyushu.jp\",\"*.kobe.jp\",\"*.nagoya.jp\",\"*.sapporo.jp\",\"*.sendai.jp\",\"*.yokohama.jp\",\"!city.kawasaki.jp\",\"!city.kitakyushu.jp\",\"!city.kobe.jp\",\"!city.nagoya.jp\",\"!city.sapporo.jp\",\"!city.sendai.jp\",\"!city.yokohama.jp\",\"aisai.aichi.jp\",\"ama.aichi.jp\",\"anjo.aichi.jp\",\"asuke.aichi.jp\",\"chiryu.aichi.jp\",\"chita.aichi.jp\",\"fuso.aichi.jp\",\"gamagori.aichi.jp\",\"handa.aichi.jp\",\"hazu.aichi.jp\",\"hekinan.aichi.jp\",\"higashiura.aichi.jp\",\"ichinomiya.aichi.jp\",\"inazawa.aichi.jp\",\"inuyama.aichi.jp\",\"isshiki.aichi.jp\",\"iwakura.aichi.jp\",\"kanie.aichi.jp\",\"kariya.aichi.jp\",\"kasugai.aichi.jp\",\"kira.aichi.jp\",\"kiyosu.aichi.jp\",\"komaki.aichi.jp\",\"konan.aichi.jp\",\"kota.aichi.jp\",\"mihama.aichi.jp\",\"miyoshi.aichi.jp\",\"nishio.aichi.jp\",\"nisshin.aichi.jp\",\"obu.aichi.jp\",\"oguchi.aichi.jp\",\"oharu.aichi.jp\",\"okazaki.aichi.jp\",\"owariasahi.aichi.jp\",\"seto.aichi.jp\",\"shikatsu.aichi.jp\",\"shinshiro.aichi.jp\",\"shitara.aichi.jp\",\"tahara.aichi.jp\",\"takahama.aichi.jp\",\"tobishima.aichi.jp\",\"toei.aichi.jp\",\"togo.aichi.jp\",\"tokai.aichi.jp\",\"tokoname.aichi.jp\",\"toyoake.aichi.jp\",\"toyohashi.aichi.jp\",\"toyokawa.aichi.jp\",\"toyone.aichi.jp\",\"toyota.aichi.jp\",\"tsushima.aichi.jp\",\"yatomi.aichi.jp\",\"akita.akita.jp\",\"daisen.akita.jp\",\"fujisato.akita.jp\",\"gojome.akita.jp\",\"hachirogata.akita.jp\",\"happou.akita.jp\",\"higashinaruse.akita.jp\",\"honjo.akita.jp\",\"honjyo.akita.jp\",\"ikawa.akita.jp\",\"kamikoani.akita.jp\",\"kamioka.akita.jp\",\"katagami.akita.jp\",\"kazuno.akita.jp\",\"kitaakita.akita.jp\",\"kosaka.akita.jp\",\"kyowa.akita.jp\",\"misato.akita.jp\",\"mitane.akita.jp\",\"moriyoshi.akita.jp\",\"nikaho.akita.jp\",\"noshiro.akita.jp\",\"odate.akita.jp\",\"oga.akita.jp\",\"ogata.akita.jp\",\"semboku.akita.jp\",\"yokote.akita.jp\",\"yurihonjo.akita.jp\",\"aomori.aomori.jp\",\"gonohe.aomori.jp\",\"hachinohe.aomori.jp\",\"hashikami.aomori.jp\",\"hiranai.aomori.jp\",\"hirosaki.aomori.jp\",\"itayanagi.aomori.jp\",\"kuroishi.aomori.jp\",\"misawa.aomori.jp\",\"mutsu.aomori.jp\",\"nakadomari.aomori.jp\",\"noheji.aomori.jp\",\"oirase.aomori.jp\",\"owani.aomori.jp\",\"rokunohe.aomori.jp\",\"sannohe.aomori.jp\",\"shichinohe.aomori.jp\",\"shingo.aomori.jp\",\"takko.aomori.jp\",\"towada.aomori.jp\",\"tsugaru.aomori.jp\",\"tsuruta.aomori.jp\",\"abiko.chiba.jp\",\"asahi.chiba.jp\",\"chonan.chiba.jp\",\"chosei.chiba.jp\",\"choshi.chiba.jp\",\"chuo.chiba.jp\",\"funabashi.chiba.jp\",\"futtsu.chiba.jp\",\"hanamigawa.chiba.jp\",\"ichihara.chiba.jp\",\"ichikawa.chiba.jp\",\"ichinomiya.chiba.jp\",\"inzai.chiba.jp\",\"isumi.chiba.jp\",\"kamagaya.chiba.jp\",\"kamogawa.chiba.jp\",\"kashiwa.chiba.jp\",\"katori.chiba.jp\",\"katsuura.chiba.jp\",\"kimitsu.chiba.jp\",\"kisarazu.chiba.jp\",\"kozaki.chiba.jp\",\"kujukuri.chiba.jp\",\"kyonan.chiba.jp\",\"matsudo.chiba.jp\",\"midori.chiba.jp\",\"mihama.chiba.jp\",\"minamiboso.chiba.jp\",\"mobara.chiba.jp\",\"mutsuzawa.chiba.jp\",\"nagara.chiba.jp\",\"nagareyama.chiba.jp\",\"narashino.chiba.jp\",\"narita.chiba.jp\",\"noda.chiba.jp\",\"oamishirasato.chiba.jp\",\"omigawa.chiba.jp\",\"onjuku.chiba.jp\",\"otaki.chiba.jp\",\"sakae.chiba.jp\",\"sakura.chiba.jp\",\"shimofusa.chiba.jp\",\"shirako.chiba.jp\",\"shiroi.chiba.jp\",\"shisui.chiba.jp\",\"sodegaura.chiba.jp\",\"sosa.chiba.jp\",\"tako.chiba.jp\",\"tateyama.chiba.jp\",\"togane.chiba.jp\",\"tohnosho.chiba.jp\",\"tomisato.chiba.jp\",\"urayasu.chiba.jp\",\"yachimata.chiba.jp\",\"yachiyo.chiba.jp\",\"yokaichiba.chiba.jp\",\"yokoshibahikari.chiba.jp\",\"yotsukaido.chiba.jp\",\"ainan.ehime.jp\",\"honai.ehime.jp\",\"ikata.ehime.jp\",\"imabari.ehime.jp\",\"iyo.ehime.jp\",\"kamijima.ehime.jp\",\"kihoku.ehime.jp\",\"kumakogen.ehime.jp\",\"masaki.ehime.jp\",\"matsuno.ehime.jp\",\"matsuyama.ehime.jp\",\"namikata.ehime.jp\",\"niihama.ehime.jp\",\"ozu.ehime.jp\",\"saijo.ehime.jp\",\"seiyo.ehime.jp\",\"shikokuchuo.ehime.jp\",\"tobe.ehime.jp\",\"toon.ehime.jp\",\"uchiko.ehime.jp\",\"uwajima.ehime.jp\",\"yawatahama.ehime.jp\",\"echizen.fukui.jp\",\"eiheiji.fukui.jp\",\"fukui.fukui.jp\",\"ikeda.fukui.jp\",\"katsuyama.fukui.jp\",\"mihama.fukui.jp\",\"minamiechizen.fukui.jp\",\"obama.fukui.jp\",\"ohi.fukui.jp\",\"ono.fukui.jp\",\"sabae.fukui.jp\",\"sakai.fukui.jp\",\"takahama.fukui.jp\",\"tsuruga.fukui.jp\",\"wakasa.fukui.jp\",\"ashiya.fukuoka.jp\",\"buzen.fukuoka.jp\",\"chikugo.fukuoka.jp\",\"chikuho.fukuoka.jp\",\"chikujo.fukuoka.jp\",\"chikushino.fukuoka.jp\",\"chikuzen.fukuoka.jp\",\"chuo.fukuoka.jp\",\"dazaifu.fukuoka.jp\",\"fukuchi.fukuoka.jp\",\"hakata.fukuoka.jp\",\"higashi.fukuoka.jp\",\"hirokawa.fukuoka.jp\",\"hisayama.fukuoka.jp\",\"iizuka.fukuoka.jp\",\"inatsuki.fukuoka.jp\",\"kaho.fukuoka.jp\",\"kasuga.fukuoka.jp\",\"kasuya.fukuoka.jp\",\"kawara.fukuoka.jp\",\"keisen.fukuoka.jp\",\"koga.fukuoka.jp\",\"kurate.fukuoka.jp\",\"kurogi.fukuoka.jp\",\"kurume.fukuoka.jp\",\"minami.fukuoka.jp\",\"miyako.fukuoka.jp\",\"miyama.fukuoka.jp\",\"miyawaka.fukuoka.jp\",\"mizumaki.fukuoka.jp\",\"munakata.fukuoka.jp\",\"nakagawa.fukuoka.jp\",\"nakama.fukuoka.jp\",\"nishi.fukuoka.jp\",\"nogata.fukuoka.jp\",\"ogori.fukuoka.jp\",\"okagaki.fukuoka.jp\",\"okawa.fukuoka.jp\",\"oki.fukuoka.jp\",\"omuta.fukuoka.jp\",\"onga.fukuoka.jp\",\"onojo.fukuoka.jp\",\"oto.fukuoka.jp\",\"saigawa.fukuoka.jp\",\"sasaguri.fukuoka.jp\",\"shingu.fukuoka.jp\",\"shinyoshitomi.fukuoka.jp\",\"shonai.fukuoka.jp\",\"soeda.fukuoka.jp\",\"sue.fukuoka.jp\",\"tachiarai.fukuoka.jp\",\"tagawa.fukuoka.jp\",\"takata.fukuoka.jp\",\"toho.fukuoka.jp\",\"toyotsu.fukuoka.jp\",\"tsuiki.fukuoka.jp\",\"ukiha.fukuoka.jp\",\"umi.fukuoka.jp\",\"usui.fukuoka.jp\",\"yamada.fukuoka.jp\",\"yame.fukuoka.jp\",\"yanagawa.fukuoka.jp\",\"yukuhashi.fukuoka.jp\",\"aizubange.fukushima.jp\",\"aizumisato.fukushima.jp\",\"aizuwakamatsu.fukushima.jp\",\"asakawa.fukushima.jp\",\"bandai.fukushima.jp\",\"date.fukushima.jp\",\"fukushima.fukushima.jp\",\"furudono.fukushima.jp\",\"futaba.fukushima.jp\",\"hanawa.fukushima.jp\",\"higashi.fukushima.jp\",\"hirata.fukushima.jp\",\"hirono.fukushima.jp\",\"iitate.fukushima.jp\",\"inawashiro.fukushima.jp\",\"ishikawa.fukushima.jp\",\"iwaki.fukushima.jp\",\"izumizaki.fukushima.jp\",\"kagamiishi.fukushima.jp\",\"kaneyama.fukushima.jp\",\"kawamata.fukushima.jp\",\"kitakata.fukushima.jp\",\"kitashiobara.fukushima.jp\",\"koori.fukushima.jp\",\"koriyama.fukushima.jp\",\"kunimi.fukushima.jp\",\"miharu.fukushima.jp\",\"mishima.fukushima.jp\",\"namie.fukushima.jp\",\"nango.fukushima.jp\",\"nishiaizu.fukushima.jp\",\"nishigo.fukushima.jp\",\"okuma.fukushima.jp\",\"omotego.fukushima.jp\",\"ono.fukushima.jp\",\"otama.fukushima.jp\",\"samegawa.fukushima.jp\",\"shimogo.fukushima.jp\",\"shirakawa.fukushima.jp\",\"showa.fukushima.jp\",\"soma.fukushima.jp\",\"sukagawa.fukushima.jp\",\"taishin.fukushima.jp\",\"tamakawa.fukushima.jp\",\"tanagura.fukushima.jp\",\"tenei.fukushima.jp\",\"yabuki.fukushima.jp\",\"yamato.fukushima.jp\",\"yamatsuri.fukushima.jp\",\"yanaizu.fukushima.jp\",\"yugawa.fukushima.jp\",\"anpachi.gifu.jp\",\"ena.gifu.jp\",\"gifu.gifu.jp\",\"ginan.gifu.jp\",\"godo.gifu.jp\",\"gujo.gifu.jp\",\"hashima.gifu.jp\",\"hichiso.gifu.jp\",\"hida.gifu.jp\",\"higashishirakawa.gifu.jp\",\"ibigawa.gifu.jp\",\"ikeda.gifu.jp\",\"kakamigahara.gifu.jp\",\"kani.gifu.jp\",\"kasahara.gifu.jp\",\"kasamatsu.gifu.jp\",\"kawaue.gifu.jp\",\"kitagata.gifu.jp\",\"mino.gifu.jp\",\"minokamo.gifu.jp\",\"mitake.gifu.jp\",\"mizunami.gifu.jp\",\"motosu.gifu.jp\",\"nakatsugawa.gifu.jp\",\"ogaki.gifu.jp\",\"sakahogi.gifu.jp\",\"seki.gifu.jp\",\"sekigahara.gifu.jp\",\"shirakawa.gifu.jp\",\"tajimi.gifu.jp\",\"takayama.gifu.jp\",\"tarui.gifu.jp\",\"toki.gifu.jp\",\"tomika.gifu.jp\",\"wanouchi.gifu.jp\",\"yamagata.gifu.jp\",\"yaotsu.gifu.jp\",\"yoro.gifu.jp\",\"annaka.gunma.jp\",\"chiyoda.gunma.jp\",\"fujioka.gunma.jp\",\"higashiagatsuma.gunma.jp\",\"isesaki.gunma.jp\",\"itakura.gunma.jp\",\"kanna.gunma.jp\",\"kanra.gunma.jp\",\"katashina.gunma.jp\",\"kawaba.gunma.jp\",\"kiryu.gunma.jp\",\"kusatsu.gunma.jp\",\"maebashi.gunma.jp\",\"meiwa.gunma.jp\",\"midori.gunma.jp\",\"minakami.gunma.jp\",\"naganohara.gunma.jp\",\"nakanojo.gunma.jp\",\"nanmoku.gunma.jp\",\"numata.gunma.jp\",\"oizumi.gunma.jp\",\"ora.gunma.jp\",\"ota.gunma.jp\",\"shibukawa.gunma.jp\",\"shimonita.gunma.jp\",\"shinto.gunma.jp\",\"showa.gunma.jp\",\"takasaki.gunma.jp\",\"takayama.gunma.jp\",\"tamamura.gunma.jp\",\"tatebayashi.gunma.jp\",\"tomioka.gunma.jp\",\"tsukiyono.gunma.jp\",\"tsumagoi.gunma.jp\",\"ueno.gunma.jp\",\"yoshioka.gunma.jp\",\"asaminami.hiroshima.jp\",\"daiwa.hiroshima.jp\",\"etajima.hiroshima.jp\",\"fuchu.hiroshima.jp\",\"fukuyama.hiroshima.jp\",\"hatsukaichi.hiroshima.jp\",\"higashihiroshima.hiroshima.jp\",\"hongo.hiroshima.jp\",\"jinsekikogen.hiroshima.jp\",\"kaita.hiroshima.jp\",\"kui.hiroshima.jp\",\"kumano.hiroshima.jp\",\"kure.hiroshima.jp\",\"mihara.hiroshima.jp\",\"miyoshi.hiroshima.jp\",\"naka.hiroshima.jp\",\"onomichi.hiroshima.jp\",\"osakikamijima.hiroshima.jp\",\"otake.hiroshima.jp\",\"saka.hiroshima.jp\",\"sera.hiroshima.jp\",\"seranishi.hiroshima.jp\",\"shinichi.hiroshima.jp\",\"shobara.hiroshima.jp\",\"takehara.hiroshima.jp\",\"abashiri.hokkaido.jp\",\"abira.hokkaido.jp\",\"aibetsu.hokkaido.jp\",\"akabira.hokkaido.jp\",\"akkeshi.hokkaido.jp\",\"asahikawa.hokkaido.jp\",\"ashibetsu.hokkaido.jp\",\"ashoro.hokkaido.jp\",\"assabu.hokkaido.jp\",\"atsuma.hokkaido.jp\",\"bibai.hokkaido.jp\",\"biei.hokkaido.jp\",\"bifuka.hokkaido.jp\",\"bihoro.hokkaido.jp\",\"biratori.hokkaido.jp\",\"chippubetsu.hokkaido.jp\",\"chitose.hokkaido.jp\",\"date.hokkaido.jp\",\"ebetsu.hokkaido.jp\",\"embetsu.hokkaido.jp\",\"eniwa.hokkaido.jp\",\"erimo.hokkaido.jp\",\"esan.hokkaido.jp\",\"esashi.hokkaido.jp\",\"fukagawa.hokkaido.jp\",\"fukushima.hokkaido.jp\",\"furano.hokkaido.jp\",\"furubira.hokkaido.jp\",\"haboro.hokkaido.jp\",\"hakodate.hokkaido.jp\",\"hamatonbetsu.hokkaido.jp\",\"hidaka.hokkaido.jp\",\"higashikagura.hokkaido.jp\",\"higashikawa.hokkaido.jp\",\"hiroo.hokkaido.jp\",\"hokuryu.hokkaido.jp\",\"hokuto.hokkaido.jp\",\"honbetsu.hokkaido.jp\",\"horokanai.hokkaido.jp\",\"horonobe.hokkaido.jp\",\"ikeda.hokkaido.jp\",\"imakane.hokkaido.jp\",\"ishikari.hokkaido.jp\",\"iwamizawa.hokkaido.jp\",\"iwanai.hokkaido.jp\",\"kamifurano.hokkaido.jp\",\"kamikawa.hokkaido.jp\",\"kamishihoro.hokkaido.jp\",\"kamisunagawa.hokkaido.jp\",\"kamoenai.hokkaido.jp\",\"kayabe.hokkaido.jp\",\"kembuchi.hokkaido.jp\",\"kikonai.hokkaido.jp\",\"kimobetsu.hokkaido.jp\",\"kitahiroshima.hokkaido.jp\",\"kitami.hokkaido.jp\",\"kiyosato.hokkaido.jp\",\"koshimizu.hokkaido.jp\",\"kunneppu.hokkaido.jp\",\"kuriyama.hokkaido.jp\",\"kuromatsunai.hokkaido.jp\",\"kushiro.hokkaido.jp\",\"kutchan.hokkaido.jp\",\"kyowa.hokkaido.jp\",\"mashike.hokkaido.jp\",\"matsumae.hokkaido.jp\",\"mikasa.hokkaido.jp\",\"minamifurano.hokkaido.jp\",\"mombetsu.hokkaido.jp\",\"moseushi.hokkaido.jp\",\"mukawa.hokkaido.jp\",\"muroran.hokkaido.jp\",\"naie.hokkaido.jp\",\"nakagawa.hokkaido.jp\",\"nakasatsunai.hokkaido.jp\",\"nakatombetsu.hokkaido.jp\",\"nanae.hokkaido.jp\",\"nanporo.hokkaido.jp\",\"nayoro.hokkaido.jp\",\"nemuro.hokkaido.jp\",\"niikappu.hokkaido.jp\",\"niki.hokkaido.jp\",\"nishiokoppe.hokkaido.jp\",\"noboribetsu.hokkaido.jp\",\"numata.hokkaido.jp\",\"obihiro.hokkaido.jp\",\"obira.hokkaido.jp\",\"oketo.hokkaido.jp\",\"okoppe.hokkaido.jp\",\"otaru.hokkaido.jp\",\"otobe.hokkaido.jp\",\"otofuke.hokkaido.jp\",\"otoineppu.hokkaido.jp\",\"oumu.hokkaido.jp\",\"ozora.hokkaido.jp\",\"pippu.hokkaido.jp\",\"rankoshi.hokkaido.jp\",\"rebun.hokkaido.jp\",\"rikubetsu.hokkaido.jp\",\"rishiri.hokkaido.jp\",\"rishirifuji.hokkaido.jp\",\"saroma.hokkaido.jp\",\"sarufutsu.hokkaido.jp\",\"shakotan.hokkaido.jp\",\"shari.hokkaido.jp\",\"shibecha.hokkaido.jp\",\"shibetsu.hokkaido.jp\",\"shikabe.hokkaido.jp\",\"shikaoi.hokkaido.jp\",\"shimamaki.hokkaido.jp\",\"shimizu.hokkaido.jp\",\"shimokawa.hokkaido.jp\",\"shinshinotsu.hokkaido.jp\",\"shintoku.hokkaido.jp\",\"shiranuka.hokkaido.jp\",\"shiraoi.hokkaido.jp\",\"shiriuchi.hokkaido.jp\",\"sobetsu.hokkaido.jp\",\"sunagawa.hokkaido.jp\",\"taiki.hokkaido.jp\",\"takasu.hokkaido.jp\",\"takikawa.hokkaido.jp\",\"takinoue.hokkaido.jp\",\"teshikaga.hokkaido.jp\",\"tobetsu.hokkaido.jp\",\"tohma.hokkaido.jp\",\"tomakomai.hokkaido.jp\",\"tomari.hokkaido.jp\",\"toya.hokkaido.jp\",\"toyako.hokkaido.jp\",\"toyotomi.hokkaido.jp\",\"toyoura.hokkaido.jp\",\"tsubetsu.hokkaido.jp\",\"tsukigata.hokkaido.jp\",\"urakawa.hokkaido.jp\",\"urausu.hokkaido.jp\",\"uryu.hokkaido.jp\",\"utashinai.hokkaido.jp\",\"wakkanai.hokkaido.jp\",\"wassamu.hokkaido.jp\",\"yakumo.hokkaido.jp\",\"yoichi.hokkaido.jp\",\"aioi.hyogo.jp\",\"akashi.hyogo.jp\",\"ako.hyogo.jp\",\"amagasaki.hyogo.jp\",\"aogaki.hyogo.jp\",\"asago.hyogo.jp\",\"ashiya.hyogo.jp\",\"awaji.hyogo.jp\",\"fukusaki.hyogo.jp\",\"goshiki.hyogo.jp\",\"harima.hyogo.jp\",\"himeji.hyogo.jp\",\"ichikawa.hyogo.jp\",\"inagawa.hyogo.jp\",\"itami.hyogo.jp\",\"kakogawa.hyogo.jp\",\"kamigori.hyogo.jp\",\"kamikawa.hyogo.jp\",\"kasai.hyogo.jp\",\"kasuga.hyogo.jp\",\"kawanishi.hyogo.jp\",\"miki.hyogo.jp\",\"minamiawaji.hyogo.jp\",\"nishinomiya.hyogo.jp\",\"nishiwaki.hyogo.jp\",\"ono.hyogo.jp\",\"sanda.hyogo.jp\",\"sannan.hyogo.jp\",\"sasayama.hyogo.jp\",\"sayo.hyogo.jp\",\"shingu.hyogo.jp\",\"shinonsen.hyogo.jp\",\"shiso.hyogo.jp\",\"sumoto.hyogo.jp\",\"taishi.hyogo.jp\",\"taka.hyogo.jp\",\"takarazuka.hyogo.jp\",\"takasago.hyogo.jp\",\"takino.hyogo.jp\",\"tamba.hyogo.jp\",\"tatsuno.hyogo.jp\",\"toyooka.hyogo.jp\",\"yabu.hyogo.jp\",\"yashiro.hyogo.jp\",\"yoka.hyogo.jp\",\"yokawa.hyogo.jp\",\"ami.ibaraki.jp\",\"asahi.ibaraki.jp\",\"bando.ibaraki.jp\",\"chikusei.ibaraki.jp\",\"daigo.ibaraki.jp\",\"fujishiro.ibaraki.jp\",\"hitachi.ibaraki.jp\",\"hitachinaka.ibaraki.jp\",\"hitachiomiya.ibaraki.jp\",\"hitachiota.ibaraki.jp\",\"ibaraki.ibaraki.jp\",\"ina.ibaraki.jp\",\"inashiki.ibaraki.jp\",\"itako.ibaraki.jp\",\"iwama.ibaraki.jp\",\"joso.ibaraki.jp\",\"kamisu.ibaraki.jp\",\"kasama.ibaraki.jp\",\"kashima.ibaraki.jp\",\"kasumigaura.ibaraki.jp\",\"koga.ibaraki.jp\",\"miho.ibaraki.jp\",\"mito.ibaraki.jp\",\"moriya.ibaraki.jp\",\"naka.ibaraki.jp\",\"namegata.ibaraki.jp\",\"oarai.ibaraki.jp\",\"ogawa.ibaraki.jp\",\"omitama.ibaraki.jp\",\"ryugasaki.ibaraki.jp\",\"sakai.ibaraki.jp\",\"sakuragawa.ibaraki.jp\",\"shimodate.ibaraki.jp\",\"shimotsuma.ibaraki.jp\",\"shirosato.ibaraki.jp\",\"sowa.ibaraki.jp\",\"suifu.ibaraki.jp\",\"takahagi.ibaraki.jp\",\"tamatsukuri.ibaraki.jp\",\"tokai.ibaraki.jp\",\"tomobe.ibaraki.jp\",\"tone.ibaraki.jp\",\"toride.ibaraki.jp\",\"tsuchiura.ibaraki.jp\",\"tsukuba.ibaraki.jp\",\"uchihara.ibaraki.jp\",\"ushiku.ibaraki.jp\",\"yachiyo.ibaraki.jp\",\"yamagata.ibaraki.jp\",\"yawara.ibaraki.jp\",\"yuki.ibaraki.jp\",\"anamizu.ishikawa.jp\",\"hakui.ishikawa.jp\",\"hakusan.ishikawa.jp\",\"kaga.ishikawa.jp\",\"kahoku.ishikawa.jp\",\"kanazawa.ishikawa.jp\",\"kawakita.ishikawa.jp\",\"komatsu.ishikawa.jp\",\"nakanoto.ishikawa.jp\",\"nanao.ishikawa.jp\",\"nomi.ishikawa.jp\",\"nonoichi.ishikawa.jp\",\"noto.ishikawa.jp\",\"shika.ishikawa.jp\",\"suzu.ishikawa.jp\",\"tsubata.ishikawa.jp\",\"tsurugi.ishikawa.jp\",\"uchinada.ishikawa.jp\",\"wajima.ishikawa.jp\",\"fudai.iwate.jp\",\"fujisawa.iwate.jp\",\"hanamaki.iwate.jp\",\"hiraizumi.iwate.jp\",\"hirono.iwate.jp\",\"ichinohe.iwate.jp\",\"ichinoseki.iwate.jp\",\"iwaizumi.iwate.jp\",\"iwate.iwate.jp\",\"joboji.iwate.jp\",\"kamaishi.iwate.jp\",\"kanegasaki.iwate.jp\",\"karumai.iwate.jp\",\"kawai.iwate.jp\",\"kitakami.iwate.jp\",\"kuji.iwate.jp\",\"kunohe.iwate.jp\",\"kuzumaki.iwate.jp\",\"miyako.iwate.jp\",\"mizusawa.iwate.jp\",\"morioka.iwate.jp\",\"ninohe.iwate.jp\",\"noda.iwate.jp\",\"ofunato.iwate.jp\",\"oshu.iwate.jp\",\"otsuchi.iwate.jp\",\"rikuzentakata.iwate.jp\",\"shiwa.iwate.jp\",\"shizukuishi.iwate.jp\",\"sumita.iwate.jp\",\"tanohata.iwate.jp\",\"tono.iwate.jp\",\"yahaba.iwate.jp\",\"yamada.iwate.jp\",\"ayagawa.kagawa.jp\",\"higashikagawa.kagawa.jp\",\"kanonji.kagawa.jp\",\"kotohira.kagawa.jp\",\"manno.kagawa.jp\",\"marugame.kagawa.jp\",\"mitoyo.kagawa.jp\",\"naoshima.kagawa.jp\",\"sanuki.kagawa.jp\",\"tadotsu.kagawa.jp\",\"takamatsu.kagawa.jp\",\"tonosho.kagawa.jp\",\"uchinomi.kagawa.jp\",\"utazu.kagawa.jp\",\"zentsuji.kagawa.jp\",\"akune.kagoshima.jp\",\"amami.kagoshima.jp\",\"hioki.kagoshima.jp\",\"isa.kagoshima.jp\",\"isen.kagoshima.jp\",\"izumi.kagoshima.jp\",\"kagoshima.kagoshima.jp\",\"kanoya.kagoshima.jp\",\"kawanabe.kagoshima.jp\",\"kinko.kagoshima.jp\",\"kouyama.kagoshima.jp\",\"makurazaki.kagoshima.jp\",\"matsumoto.kagoshima.jp\",\"minamitane.kagoshima.jp\",\"nakatane.kagoshima.jp\",\"nishinoomote.kagoshima.jp\",\"satsumasendai.kagoshima.jp\",\"soo.kagoshima.jp\",\"tarumizu.kagoshima.jp\",\"yusui.kagoshima.jp\",\"aikawa.kanagawa.jp\",\"atsugi.kanagawa.jp\",\"ayase.kanagawa.jp\",\"chigasaki.kanagawa.jp\",\"ebina.kanagawa.jp\",\"fujisawa.kanagawa.jp\",\"hadano.kanagawa.jp\",\"hakone.kanagawa.jp\",\"hiratsuka.kanagawa.jp\",\"isehara.kanagawa.jp\",\"kaisei.kanagawa.jp\",\"kamakura.kanagawa.jp\",\"kiyokawa.kanagawa.jp\",\"matsuda.kanagawa.jp\",\"minamiashigara.kanagawa.jp\",\"miura.kanagawa.jp\",\"nakai.kanagawa.jp\",\"ninomiya.kanagawa.jp\",\"odawara.kanagawa.jp\",\"oi.kanagawa.jp\",\"oiso.kanagawa.jp\",\"sagamihara.kanagawa.jp\",\"samukawa.kanagawa.jp\",\"tsukui.kanagawa.jp\",\"yamakita.kanagawa.jp\",\"yamato.kanagawa.jp\",\"yokosuka.kanagawa.jp\",\"yugawara.kanagawa.jp\",\"zama.kanagawa.jp\",\"zushi.kanagawa.jp\",\"aki.kochi.jp\",\"geisei.kochi.jp\",\"hidaka.kochi.jp\",\"higashitsuno.kochi.jp\",\"ino.kochi.jp\",\"kagami.kochi.jp\",\"kami.kochi.jp\",\"kitagawa.kochi.jp\",\"kochi.kochi.jp\",\"mihara.kochi.jp\",\"motoyama.kochi.jp\",\"muroto.kochi.jp\",\"nahari.kochi.jp\",\"nakamura.kochi.jp\",\"nankoku.kochi.jp\",\"nishitosa.kochi.jp\",\"niyodogawa.kochi.jp\",\"ochi.kochi.jp\",\"okawa.kochi.jp\",\"otoyo.kochi.jp\",\"otsuki.kochi.jp\",\"sakawa.kochi.jp\",\"sukumo.kochi.jp\",\"susaki.kochi.jp\",\"tosa.kochi.jp\",\"tosashimizu.kochi.jp\",\"toyo.kochi.jp\",\"tsuno.kochi.jp\",\"umaji.kochi.jp\",\"yasuda.kochi.jp\",\"yusuhara.kochi.jp\",\"amakusa.kumamoto.jp\",\"arao.kumamoto.jp\",\"aso.kumamoto.jp\",\"choyo.kumamoto.jp\",\"gyokuto.kumamoto.jp\",\"kamiamakusa.kumamoto.jp\",\"kikuchi.kumamoto.jp\",\"kumamoto.kumamoto.jp\",\"mashiki.kumamoto.jp\",\"mifune.kumamoto.jp\",\"minamata.kumamoto.jp\",\"minamioguni.kumamoto.jp\",\"nagasu.kumamoto.jp\",\"nishihara.kumamoto.jp\",\"oguni.kumamoto.jp\",\"ozu.kumamoto.jp\",\"sumoto.kumamoto.jp\",\"takamori.kumamoto.jp\",\"uki.kumamoto.jp\",\"uto.kumamoto.jp\",\"yamaga.kumamoto.jp\",\"yamato.kumamoto.jp\",\"yatsushiro.kumamoto.jp\",\"ayabe.kyoto.jp\",\"fukuchiyama.kyoto.jp\",\"higashiyama.kyoto.jp\",\"ide.kyoto.jp\",\"ine.kyoto.jp\",\"joyo.kyoto.jp\",\"kameoka.kyoto.jp\",\"kamo.kyoto.jp\",\"kita.kyoto.jp\",\"kizu.kyoto.jp\",\"kumiyama.kyoto.jp\",\"kyotamba.kyoto.jp\",\"kyotanabe.kyoto.jp\",\"kyotango.kyoto.jp\",\"maizuru.kyoto.jp\",\"minami.kyoto.jp\",\"minamiyamashiro.kyoto.jp\",\"miyazu.kyoto.jp\",\"muko.kyoto.jp\",\"nagaokakyo.kyoto.jp\",\"nakagyo.kyoto.jp\",\"nantan.kyoto.jp\",\"oyamazaki.kyoto.jp\",\"sakyo.kyoto.jp\",\"seika.kyoto.jp\",\"tanabe.kyoto.jp\",\"uji.kyoto.jp\",\"ujitawara.kyoto.jp\",\"wazuka.kyoto.jp\",\"yamashina.kyoto.jp\",\"yawata.kyoto.jp\",\"asahi.mie.jp\",\"inabe.mie.jp\",\"ise.mie.jp\",\"kameyama.mie.jp\",\"kawagoe.mie.jp\",\"kiho.mie.jp\",\"kisosaki.mie.jp\",\"kiwa.mie.jp\",\"komono.mie.jp\",\"kumano.mie.jp\",\"kuwana.mie.jp\",\"matsusaka.mie.jp\",\"meiwa.mie.jp\",\"mihama.mie.jp\",\"minamiise.mie.jp\",\"misugi.mie.jp\",\"miyama.mie.jp\",\"nabari.mie.jp\",\"shima.mie.jp\",\"suzuka.mie.jp\",\"tado.mie.jp\",\"taiki.mie.jp\",\"taki.mie.jp\",\"tamaki.mie.jp\",\"toba.mie.jp\",\"tsu.mie.jp\",\"udono.mie.jp\",\"ureshino.mie.jp\",\"watarai.mie.jp\",\"yokkaichi.mie.jp\",\"furukawa.miyagi.jp\",\"higashimatsushima.miyagi.jp\",\"ishinomaki.miyagi.jp\",\"iwanuma.miyagi.jp\",\"kakuda.miyagi.jp\",\"kami.miyagi.jp\",\"kawasaki.miyagi.jp\",\"marumori.miyagi.jp\",\"matsushima.miyagi.jp\",\"minamisanriku.miyagi.jp\",\"misato.miyagi.jp\",\"murata.miyagi.jp\",\"natori.miyagi.jp\",\"ogawara.miyagi.jp\",\"ohira.miyagi.jp\",\"onagawa.miyagi.jp\",\"osaki.miyagi.jp\",\"rifu.miyagi.jp\",\"semine.miyagi.jp\",\"shibata.miyagi.jp\",\"shichikashuku.miyagi.jp\",\"shikama.miyagi.jp\",\"shiogama.miyagi.jp\",\"shiroishi.miyagi.jp\",\"tagajo.miyagi.jp\",\"taiwa.miyagi.jp\",\"tome.miyagi.jp\",\"tomiya.miyagi.jp\",\"wakuya.miyagi.jp\",\"watari.miyagi.jp\",\"yamamoto.miyagi.jp\",\"zao.miyagi.jp\",\"aya.miyazaki.jp\",\"ebino.miyazaki.jp\",\"gokase.miyazaki.jp\",\"hyuga.miyazaki.jp\",\"kadogawa.miyazaki.jp\",\"kawaminami.miyazaki.jp\",\"kijo.miyazaki.jp\",\"kitagawa.miyazaki.jp\",\"kitakata.miyazaki.jp\",\"kitaura.miyazaki.jp\",\"kobayashi.miyazaki.jp\",\"kunitomi.miyazaki.jp\",\"kushima.miyazaki.jp\",\"mimata.miyazaki.jp\",\"miyakonojo.miyazaki.jp\",\"miyazaki.miyazaki.jp\",\"morotsuka.miyazaki.jp\",\"nichinan.miyazaki.jp\",\"nishimera.miyazaki.jp\",\"nobeoka.miyazaki.jp\",\"saito.miyazaki.jp\",\"shiiba.miyazaki.jp\",\"shintomi.miyazaki.jp\",\"takaharu.miyazaki.jp\",\"takanabe.miyazaki.jp\",\"takazaki.miyazaki.jp\",\"tsuno.miyazaki.jp\",\"achi.nagano.jp\",\"agematsu.nagano.jp\",\"anan.nagano.jp\",\"aoki.nagano.jp\",\"asahi.nagano.jp\",\"azumino.nagano.jp\",\"chikuhoku.nagano.jp\",\"chikuma.nagano.jp\",\"chino.nagano.jp\",\"fujimi.nagano.jp\",\"hakuba.nagano.jp\",\"hara.nagano.jp\",\"hiraya.nagano.jp\",\"iida.nagano.jp\",\"iijima.nagano.jp\",\"iiyama.nagano.jp\",\"iizuna.nagano.jp\",\"ikeda.nagano.jp\",\"ikusaka.nagano.jp\",\"ina.nagano.jp\",\"karuizawa.nagano.jp\",\"kawakami.nagano.jp\",\"kiso.nagano.jp\",\"kisofukushima.nagano.jp\",\"kitaaiki.nagano.jp\",\"komagane.nagano.jp\",\"komoro.nagano.jp\",\"matsukawa.nagano.jp\",\"matsumoto.nagano.jp\",\"miasa.nagano.jp\",\"minamiaiki.nagano.jp\",\"minamimaki.nagano.jp\",\"minamiminowa.nagano.jp\",\"minowa.nagano.jp\",\"miyada.nagano.jp\",\"miyota.nagano.jp\",\"mochizuki.nagano.jp\",\"nagano.nagano.jp\",\"nagawa.nagano.jp\",\"nagiso.nagano.jp\",\"nakagawa.nagano.jp\",\"nakano.nagano.jp\",\"nozawaonsen.nagano.jp\",\"obuse.nagano.jp\",\"ogawa.nagano.jp\",\"okaya.nagano.jp\",\"omachi.nagano.jp\",\"omi.nagano.jp\",\"ookuwa.nagano.jp\",\"ooshika.nagano.jp\",\"otaki.nagano.jp\",\"otari.nagano.jp\",\"sakae.nagano.jp\",\"sakaki.nagano.jp\",\"saku.nagano.jp\",\"sakuho.nagano.jp\",\"shimosuwa.nagano.jp\",\"shinanomachi.nagano.jp\",\"shiojiri.nagano.jp\",\"suwa.nagano.jp\",\"suzaka.nagano.jp\",\"takagi.nagano.jp\",\"takamori.nagano.jp\",\"takayama.nagano.jp\",\"tateshina.nagano.jp\",\"tatsuno.nagano.jp\",\"togakushi.nagano.jp\",\"togura.nagano.jp\",\"tomi.nagano.jp\",\"ueda.nagano.jp\",\"wada.nagano.jp\",\"yamagata.nagano.jp\",\"yamanouchi.nagano.jp\",\"yasaka.nagano.jp\",\"yasuoka.nagano.jp\",\"chijiwa.nagasaki.jp\",\"futsu.nagasaki.jp\",\"goto.nagasaki.jp\",\"hasami.nagasaki.jp\",\"hirado.nagasaki.jp\",\"iki.nagasaki.jp\",\"isahaya.nagasaki.jp\",\"kawatana.nagasaki.jp\",\"kuchinotsu.nagasaki.jp\",\"matsuura.nagasaki.jp\",\"nagasaki.nagasaki.jp\",\"obama.nagasaki.jp\",\"omura.nagasaki.jp\",\"oseto.nagasaki.jp\",\"saikai.nagasaki.jp\",\"sasebo.nagasaki.jp\",\"seihi.nagasaki.jp\",\"shimabara.nagasaki.jp\",\"shinkamigoto.nagasaki.jp\",\"togitsu.nagasaki.jp\",\"tsushima.nagasaki.jp\",\"unzen.nagasaki.jp\",\"ando.nara.jp\",\"gose.nara.jp\",\"heguri.nara.jp\",\"higashiyoshino.nara.jp\",\"ikaruga.nara.jp\",\"ikoma.nara.jp\",\"kamikitayama.nara.jp\",\"kanmaki.nara.jp\",\"kashiba.nara.jp\",\"kashihara.nara.jp\",\"katsuragi.nara.jp\",\"kawai.nara.jp\",\"kawakami.nara.jp\",\"kawanishi.nara.jp\",\"koryo.nara.jp\",\"kurotaki.nara.jp\",\"mitsue.nara.jp\",\"miyake.nara.jp\",\"nara.nara.jp\",\"nosegawa.nara.jp\",\"oji.nara.jp\",\"ouda.nara.jp\",\"oyodo.nara.jp\",\"sakurai.nara.jp\",\"sango.nara.jp\",\"shimoichi.nara.jp\",\"shimokitayama.nara.jp\",\"shinjo.nara.jp\",\"soni.nara.jp\",\"takatori.nara.jp\",\"tawaramoto.nara.jp\",\"tenkawa.nara.jp\",\"tenri.nara.jp\",\"uda.nara.jp\",\"yamatokoriyama.nara.jp\",\"yamatotakada.nara.jp\",\"yamazoe.nara.jp\",\"yoshino.nara.jp\",\"aga.niigata.jp\",\"agano.niigata.jp\",\"gosen.niigata.jp\",\"itoigawa.niigata.jp\",\"izumozaki.niigata.jp\",\"joetsu.niigata.jp\",\"kamo.niigata.jp\",\"kariwa.niigata.jp\",\"kashiwazaki.niigata.jp\",\"minamiuonuma.niigata.jp\",\"mitsuke.niigata.jp\",\"muika.niigata.jp\",\"murakami.niigata.jp\",\"myoko.niigata.jp\",\"nagaoka.niigata.jp\",\"niigata.niigata.jp\",\"ojiya.niigata.jp\",\"omi.niigata.jp\",\"sado.niigata.jp\",\"sanjo.niigata.jp\",\"seiro.niigata.jp\",\"seirou.niigata.jp\",\"sekikawa.niigata.jp\",\"shibata.niigata.jp\",\"tagami.niigata.jp\",\"tainai.niigata.jp\",\"tochio.niigata.jp\",\"tokamachi.niigata.jp\",\"tsubame.niigata.jp\",\"tsunan.niigata.jp\",\"uonuma.niigata.jp\",\"yahiko.niigata.jp\",\"yoita.niigata.jp\",\"yuzawa.niigata.jp\",\"beppu.oita.jp\",\"bungoono.oita.jp\",\"bungotakada.oita.jp\",\"hasama.oita.jp\",\"hiji.oita.jp\",\"himeshima.oita.jp\",\"hita.oita.jp\",\"kamitsue.oita.jp\",\"kokonoe.oita.jp\",\"kuju.oita.jp\",\"kunisaki.oita.jp\",\"kusu.oita.jp\",\"oita.oita.jp\",\"saiki.oita.jp\",\"taketa.oita.jp\",\"tsukumi.oita.jp\",\"usa.oita.jp\",\"usuki.oita.jp\",\"yufu.oita.jp\",\"akaiwa.okayama.jp\",\"asakuchi.okayama.jp\",\"bizen.okayama.jp\",\"hayashima.okayama.jp\",\"ibara.okayama.jp\",\"kagamino.okayama.jp\",\"kasaoka.okayama.jp\",\"kibichuo.okayama.jp\",\"kumenan.okayama.jp\",\"kurashiki.okayama.jp\",\"maniwa.okayama.jp\",\"misaki.okayama.jp\",\"nagi.okayama.jp\",\"niimi.okayama.jp\",\"nishiawakura.okayama.jp\",\"okayama.okayama.jp\",\"satosho.okayama.jp\",\"setouchi.okayama.jp\",\"shinjo.okayama.jp\",\"shoo.okayama.jp\",\"soja.okayama.jp\",\"takahashi.okayama.jp\",\"tamano.okayama.jp\",\"tsuyama.okayama.jp\",\"wake.okayama.jp\",\"yakage.okayama.jp\",\"aguni.okinawa.jp\",\"ginowan.okinawa.jp\",\"ginoza.okinawa.jp\",\"gushikami.okinawa.jp\",\"haebaru.okinawa.jp\",\"higashi.okinawa.jp\",\"hirara.okinawa.jp\",\"iheya.okinawa.jp\",\"ishigaki.okinawa.jp\",\"ishikawa.okinawa.jp\",\"itoman.okinawa.jp\",\"izena.okinawa.jp\",\"kadena.okinawa.jp\",\"kin.okinawa.jp\",\"kitadaito.okinawa.jp\",\"kitanakagusuku.okinawa.jp\",\"kumejima.okinawa.jp\",\"kunigami.okinawa.jp\",\"minamidaito.okinawa.jp\",\"motobu.okinawa.jp\",\"nago.okinawa.jp\",\"naha.okinawa.jp\",\"nakagusuku.okinawa.jp\",\"nakijin.okinawa.jp\",\"nanjo.okinawa.jp\",\"nishihara.okinawa.jp\",\"ogimi.okinawa.jp\",\"okinawa.okinawa.jp\",\"onna.okinawa.jp\",\"shimoji.okinawa.jp\",\"taketomi.okinawa.jp\",\"tarama.okinawa.jp\",\"tokashiki.okinawa.jp\",\"tomigusuku.okinawa.jp\",\"tonaki.okinawa.jp\",\"urasoe.okinawa.jp\",\"uruma.okinawa.jp\",\"yaese.okinawa.jp\",\"yomitan.okinawa.jp\",\"yonabaru.okinawa.jp\",\"yonaguni.okinawa.jp\",\"zamami.okinawa.jp\",\"abeno.osaka.jp\",\"chihayaakasaka.osaka.jp\",\"chuo.osaka.jp\",\"daito.osaka.jp\",\"fujiidera.osaka.jp\",\"habikino.osaka.jp\",\"hannan.osaka.jp\",\"higashiosaka.osaka.jp\",\"higashisumiyoshi.osaka.jp\",\"higashiyodogawa.osaka.jp\",\"hirakata.osaka.jp\",\"ibaraki.osaka.jp\",\"ikeda.osaka.jp\",\"izumi.osaka.jp\",\"izumiotsu.osaka.jp\",\"izumisano.osaka.jp\",\"kadoma.osaka.jp\",\"kaizuka.osaka.jp\",\"kanan.osaka.jp\",\"kashiwara.osaka.jp\",\"katano.osaka.jp\",\"kawachinagano.osaka.jp\",\"kishiwada.osaka.jp\",\"kita.osaka.jp\",\"kumatori.osaka.jp\",\"matsubara.osaka.jp\",\"minato.osaka.jp\",\"minoh.osaka.jp\",\"misaki.osaka.jp\",\"moriguchi.osaka.jp\",\"neyagawa.osaka.jp\",\"nishi.osaka.jp\",\"nose.osaka.jp\",\"osakasayama.osaka.jp\",\"sakai.osaka.jp\",\"sayama.osaka.jp\",\"sennan.osaka.jp\",\"settsu.osaka.jp\",\"shijonawate.osaka.jp\",\"shimamoto.osaka.jp\",\"suita.osaka.jp\",\"tadaoka.osaka.jp\",\"taishi.osaka.jp\",\"tajiri.osaka.jp\",\"takaishi.osaka.jp\",\"takatsuki.osaka.jp\",\"tondabayashi.osaka.jp\",\"toyonaka.osaka.jp\",\"toyono.osaka.jp\",\"yao.osaka.jp\",\"ariake.saga.jp\",\"arita.saga.jp\",\"fukudomi.saga.jp\",\"genkai.saga.jp\",\"hamatama.saga.jp\",\"hizen.saga.jp\",\"imari.saga.jp\",\"kamimine.saga.jp\",\"kanzaki.saga.jp\",\"karatsu.saga.jp\",\"kashima.saga.jp\",\"kitagata.saga.jp\",\"kitahata.saga.jp\",\"kiyama.saga.jp\",\"kouhoku.saga.jp\",\"kyuragi.saga.jp\",\"nishiarita.saga.jp\",\"ogi.saga.jp\",\"omachi.saga.jp\",\"ouchi.saga.jp\",\"saga.saga.jp\",\"shiroishi.saga.jp\",\"taku.saga.jp\",\"tara.saga.jp\",\"tosu.saga.jp\",\"yoshinogari.saga.jp\",\"arakawa.saitama.jp\",\"asaka.saitama.jp\",\"chichibu.saitama.jp\",\"fujimi.saitama.jp\",\"fujimino.saitama.jp\",\"fukaya.saitama.jp\",\"hanno.saitama.jp\",\"hanyu.saitama.jp\",\"hasuda.saitama.jp\",\"hatogaya.saitama.jp\",\"hatoyama.saitama.jp\",\"hidaka.saitama.jp\",\"higashichichibu.saitama.jp\",\"higashimatsuyama.saitama.jp\",\"honjo.saitama.jp\",\"ina.saitama.jp\",\"iruma.saitama.jp\",\"iwatsuki.saitama.jp\",\"kamiizumi.saitama.jp\",\"kamikawa.saitama.jp\",\"kamisato.saitama.jp\",\"kasukabe.saitama.jp\",\"kawagoe.saitama.jp\",\"kawaguchi.saitama.jp\",\"kawajima.saitama.jp\",\"kazo.saitama.jp\",\"kitamoto.saitama.jp\",\"koshigaya.saitama.jp\",\"kounosu.saitama.jp\",\"kuki.saitama.jp\",\"kumagaya.saitama.jp\",\"matsubushi.saitama.jp\",\"minano.saitama.jp\",\"misato.saitama.jp\",\"miyashiro.saitama.jp\",\"miyoshi.saitama.jp\",\"moroyama.saitama.jp\",\"nagatoro.saitama.jp\",\"namegawa.saitama.jp\",\"niiza.saitama.jp\",\"ogano.saitama.jp\",\"ogawa.saitama.jp\",\"ogose.saitama.jp\",\"okegawa.saitama.jp\",\"omiya.saitama.jp\",\"otaki.saitama.jp\",\"ranzan.saitama.jp\",\"ryokami.saitama.jp\",\"saitama.saitama.jp\",\"sakado.saitama.jp\",\"satte.saitama.jp\",\"sayama.saitama.jp\",\"shiki.saitama.jp\",\"shiraoka.saitama.jp\",\"soka.saitama.jp\",\"sugito.saitama.jp\",\"toda.saitama.jp\",\"tokigawa.saitama.jp\",\"tokorozawa.saitama.jp\",\"tsurugashima.saitama.jp\",\"urawa.saitama.jp\",\"warabi.saitama.jp\",\"yashio.saitama.jp\",\"yokoze.saitama.jp\",\"yono.saitama.jp\",\"yorii.saitama.jp\",\"yoshida.saitama.jp\",\"yoshikawa.saitama.jp\",\"yoshimi.saitama.jp\",\"aisho.shiga.jp\",\"gamo.shiga.jp\",\"higashiomi.shiga.jp\",\"hikone.shiga.jp\",\"koka.shiga.jp\",\"konan.shiga.jp\",\"kosei.shiga.jp\",\"koto.shiga.jp\",\"kusatsu.shiga.jp\",\"maibara.shiga.jp\",\"moriyama.shiga.jp\",\"nagahama.shiga.jp\",\"nishiazai.shiga.jp\",\"notogawa.shiga.jp\",\"omihachiman.shiga.jp\",\"otsu.shiga.jp\",\"ritto.shiga.jp\",\"ryuoh.shiga.jp\",\"takashima.shiga.jp\",\"takatsuki.shiga.jp\",\"torahime.shiga.jp\",\"toyosato.shiga.jp\",\"yasu.shiga.jp\",\"akagi.shimane.jp\",\"ama.shimane.jp\",\"gotsu.shimane.jp\",\"hamada.shimane.jp\",\"higashiizumo.shimane.jp\",\"hikawa.shimane.jp\",\"hikimi.shimane.jp\",\"izumo.shimane.jp\",\"kakinoki.shimane.jp\",\"masuda.shimane.jp\",\"matsue.shimane.jp\",\"misato.shimane.jp\",\"nishinoshima.shimane.jp\",\"ohda.shimane.jp\",\"okinoshima.shimane.jp\",\"okuizumo.shimane.jp\",\"shimane.shimane.jp\",\"tamayu.shimane.jp\",\"tsuwano.shimane.jp\",\"unnan.shimane.jp\",\"yakumo.shimane.jp\",\"yasugi.shimane.jp\",\"yatsuka.shimane.jp\",\"arai.shizuoka.jp\",\"atami.shizuoka.jp\",\"fuji.shizuoka.jp\",\"fujieda.shizuoka.jp\",\"fujikawa.shizuoka.jp\",\"fujinomiya.shizuoka.jp\",\"fukuroi.shizuoka.jp\",\"gotemba.shizuoka.jp\",\"haibara.shizuoka.jp\",\"hamamatsu.shizuoka.jp\",\"higashiizu.shizuoka.jp\",\"ito.shizuoka.jp\",\"iwata.shizuoka.jp\",\"izu.shizuoka.jp\",\"izunokuni.shizuoka.jp\",\"kakegawa.shizuoka.jp\",\"kannami.shizuoka.jp\",\"kawanehon.shizuoka.jp\",\"kawazu.shizuoka.jp\",\"kikugawa.shizuoka.jp\",\"kosai.shizuoka.jp\",\"makinohara.shizuoka.jp\",\"matsuzaki.shizuoka.jp\",\"minamiizu.shizuoka.jp\",\"mishima.shizuoka.jp\",\"morimachi.shizuoka.jp\",\"nishiizu.shizuoka.jp\",\"numazu.shizuoka.jp\",\"omaezaki.shizuoka.jp\",\"shimada.shizuoka.jp\",\"shimizu.shizuoka.jp\",\"shimoda.shizuoka.jp\",\"shizuoka.shizuoka.jp\",\"susono.shizuoka.jp\",\"yaizu.shizuoka.jp\",\"yoshida.shizuoka.jp\",\"ashikaga.tochigi.jp\",\"bato.tochigi.jp\",\"haga.tochigi.jp\",\"ichikai.tochigi.jp\",\"iwafune.tochigi.jp\",\"kaminokawa.tochigi.jp\",\"kanuma.tochigi.jp\",\"karasuyama.tochigi.jp\",\"kuroiso.tochigi.jp\",\"mashiko.tochigi.jp\",\"mibu.tochigi.jp\",\"moka.tochigi.jp\",\"motegi.tochigi.jp\",\"nasu.tochigi.jp\",\"nasushiobara.tochigi.jp\",\"nikko.tochigi.jp\",\"nishikata.tochigi.jp\",\"nogi.tochigi.jp\",\"ohira.tochigi.jp\",\"ohtawara.tochigi.jp\",\"oyama.tochigi.jp\",\"sakura.tochigi.jp\",\"sano.tochigi.jp\",\"shimotsuke.tochigi.jp\",\"shioya.tochigi.jp\",\"takanezawa.tochigi.jp\",\"tochigi.tochigi.jp\",\"tsuga.tochigi.jp\",\"ujiie.tochigi.jp\",\"utsunomiya.tochigi.jp\",\"yaita.tochigi.jp\",\"aizumi.tokushima.jp\",\"anan.tokushima.jp\",\"ichiba.tokushima.jp\",\"itano.tokushima.jp\",\"kainan.tokushima.jp\",\"komatsushima.tokushima.jp\",\"matsushige.tokushima.jp\",\"mima.tokushima.jp\",\"minami.tokushima.jp\",\"miyoshi.tokushima.jp\",\"mugi.tokushima.jp\",\"nakagawa.tokushima.jp\",\"naruto.tokushima.jp\",\"sanagochi.tokushima.jp\",\"shishikui.tokushima.jp\",\"tokushima.tokushima.jp\",\"wajiki.tokushima.jp\",\"adachi.tokyo.jp\",\"akiruno.tokyo.jp\",\"akishima.tokyo.jp\",\"aogashima.tokyo.jp\",\"arakawa.tokyo.jp\",\"bunkyo.tokyo.jp\",\"chiyoda.tokyo.jp\",\"chofu.tokyo.jp\",\"chuo.tokyo.jp\",\"edogawa.tokyo.jp\",\"fuchu.tokyo.jp\",\"fussa.tokyo.jp\",\"hachijo.tokyo.jp\",\"hachioji.tokyo.jp\",\"hamura.tokyo.jp\",\"higashikurume.tokyo.jp\",\"higashimurayama.tokyo.jp\",\"higashiyamato.tokyo.jp\",\"hino.tokyo.jp\",\"hinode.tokyo.jp\",\"hinohara.tokyo.jp\",\"inagi.tokyo.jp\",\"itabashi.tokyo.jp\",\"katsushika.tokyo.jp\",\"kita.tokyo.jp\",\"kiyose.tokyo.jp\",\"kodaira.tokyo.jp\",\"koganei.tokyo.jp\",\"kokubunji.tokyo.jp\",\"komae.tokyo.jp\",\"koto.tokyo.jp\",\"kouzushima.tokyo.jp\",\"kunitachi.tokyo.jp\",\"machida.tokyo.jp\",\"meguro.tokyo.jp\",\"minato.tokyo.jp\",\"mitaka.tokyo.jp\",\"mizuho.tokyo.jp\",\"musashimurayama.tokyo.jp\",\"musashino.tokyo.jp\",\"nakano.tokyo.jp\",\"nerima.tokyo.jp\",\"ogasawara.tokyo.jp\",\"okutama.tokyo.jp\",\"ome.tokyo.jp\",\"oshima.tokyo.jp\",\"ota.tokyo.jp\",\"setagaya.tokyo.jp\",\"shibuya.tokyo.jp\",\"shinagawa.tokyo.jp\",\"shinjuku.tokyo.jp\",\"suginami.tokyo.jp\",\"sumida.tokyo.jp\",\"tachikawa.tokyo.jp\",\"taito.tokyo.jp\",\"tama.tokyo.jp\",\"toshima.tokyo.jp\",\"chizu.tottori.jp\",\"hino.tottori.jp\",\"kawahara.tottori.jp\",\"koge.tottori.jp\",\"kotoura.tottori.jp\",\"misasa.tottori.jp\",\"nanbu.tottori.jp\",\"nichinan.tottori.jp\",\"sakaiminato.tottori.jp\",\"tottori.tottori.jp\",\"wakasa.tottori.jp\",\"yazu.tottori.jp\",\"yonago.tottori.jp\",\"asahi.toyama.jp\",\"fuchu.toyama.jp\",\"fukumitsu.toyama.jp\",\"funahashi.toyama.jp\",\"himi.toyama.jp\",\"imizu.toyama.jp\",\"inami.toyama.jp\",\"johana.toyama.jp\",\"kamiichi.toyama.jp\",\"kurobe.toyama.jp\",\"nakaniikawa.toyama.jp\",\"namerikawa.toyama.jp\",\"nanto.toyama.jp\",\"nyuzen.toyama.jp\",\"oyabe.toyama.jp\",\"taira.toyama.jp\",\"takaoka.toyama.jp\",\"tateyama.toyama.jp\",\"toga.toyama.jp\",\"tonami.toyama.jp\",\"toyama.toyama.jp\",\"unazuki.toyama.jp\",\"uozu.toyama.jp\",\"yamada.toyama.jp\",\"arida.wakayama.jp\",\"aridagawa.wakayama.jp\",\"gobo.wakayama.jp\",\"hashimoto.wakayama.jp\",\"hidaka.wakayama.jp\",\"hirogawa.wakayama.jp\",\"inami.wakayama.jp\",\"iwade.wakayama.jp\",\"kainan.wakayama.jp\",\"kamitonda.wakayama.jp\",\"katsuragi.wakayama.jp\",\"kimino.wakayama.jp\",\"kinokawa.wakayama.jp\",\"kitayama.wakayama.jp\",\"koya.wakayama.jp\",\"koza.wakayama.jp\",\"kozagawa.wakayama.jp\",\"kudoyama.wakayama.jp\",\"kushimoto.wakayama.jp\",\"mihama.wakayama.jp\",\"misato.wakayama.jp\",\"nachikatsuura.wakayama.jp\",\"shingu.wakayama.jp\",\"shirahama.wakayama.jp\",\"taiji.wakayama.jp\",\"tanabe.wakayama.jp\",\"wakayama.wakayama.jp\",\"yuasa.wakayama.jp\",\"yura.wakayama.jp\",\"asahi.yamagata.jp\",\"funagata.yamagata.jp\",\"higashine.yamagata.jp\",\"iide.yamagata.jp\",\"kahoku.yamagata.jp\",\"kaminoyama.yamagata.jp\",\"kaneyama.yamagata.jp\",\"kawanishi.yamagata.jp\",\"mamurogawa.yamagata.jp\",\"mikawa.yamagata.jp\",\"murayama.yamagata.jp\",\"nagai.yamagata.jp\",\"nakayama.yamagata.jp\",\"nanyo.yamagata.jp\",\"nishikawa.yamagata.jp\",\"obanazawa.yamagata.jp\",\"oe.yamagata.jp\",\"oguni.yamagata.jp\",\"ohkura.yamagata.jp\",\"oishida.yamagata.jp\",\"sagae.yamagata.jp\",\"sakata.yamagata.jp\",\"sakegawa.yamagata.jp\",\"shinjo.yamagata.jp\",\"shirataka.yamagata.jp\",\"shonai.yamagata.jp\",\"takahata.yamagata.jp\",\"tendo.yamagata.jp\",\"tozawa.yamagata.jp\",\"tsuruoka.yamagata.jp\",\"yamagata.yamagata.jp\",\"yamanobe.yamagata.jp\",\"yonezawa.yamagata.jp\",\"yuza.yamagata.jp\",\"abu.yamaguchi.jp\",\"hagi.yamaguchi.jp\",\"hikari.yamaguchi.jp\",\"hofu.yamaguchi.jp\",\"iwakuni.yamaguchi.jp\",\"kudamatsu.yamaguchi.jp\",\"mitou.yamaguchi.jp\",\"nagato.yamaguchi.jp\",\"oshima.yamaguchi.jp\",\"shimonoseki.yamaguchi.jp\",\"shunan.yamaguchi.jp\",\"tabuse.yamaguchi.jp\",\"tokuyama.yamaguchi.jp\",\"toyota.yamaguchi.jp\",\"ube.yamaguchi.jp\",\"yuu.yamaguchi.jp\",\"chuo.yamanashi.jp\",\"doshi.yamanashi.jp\",\"fuefuki.yamanashi.jp\",\"fujikawa.yamanashi.jp\",\"fujikawaguchiko.yamanashi.jp\",\"fujiyoshida.yamanashi.jp\",\"hayakawa.yamanashi.jp\",\"hokuto.yamanashi.jp\",\"ichikawamisato.yamanashi.jp\",\"kai.yamanashi.jp\",\"kofu.yamanashi.jp\",\"koshu.yamanashi.jp\",\"kosuge.yamanashi.jp\",\"minami-alps.yamanashi.jp\",\"minobu.yamanashi.jp\",\"nakamichi.yamanashi.jp\",\"nanbu.yamanashi.jp\",\"narusawa.yamanashi.jp\",\"nirasaki.yamanashi.jp\",\"nishikatsura.yamanashi.jp\",\"oshino.yamanashi.jp\",\"otsuki.yamanashi.jp\",\"showa.yamanashi.jp\",\"tabayama.yamanashi.jp\",\"tsuru.yamanashi.jp\",\"uenohara.yamanashi.jp\",\"yamanakako.yamanashi.jp\",\"yamanashi.yamanashi.jp\",\"ke\",\"ac.ke\",\"co.ke\",\"go.ke\",\"info.ke\",\"me.ke\",\"mobi.ke\",\"ne.ke\",\"or.ke\",\"sc.ke\",\"kg\",\"org.kg\",\"net.kg\",\"com.kg\",\"edu.kg\",\"gov.kg\",\"mil.kg\",\"*.kh\",\"ki\",\"edu.ki\",\"biz.ki\",\"net.ki\",\"org.ki\",\"gov.ki\",\"info.ki\",\"com.ki\",\"km\",\"org.km\",\"nom.km\",\"gov.km\",\"prd.km\",\"tm.km\",\"edu.km\",\"mil.km\",\"ass.km\",\"com.km\",\"coop.km\",\"asso.km\",\"presse.km\",\"medecin.km\",\"notaires.km\",\"pharmaciens.km\",\"veterinaire.km\",\"gouv.km\",\"kn\",\"net.kn\",\"org.kn\",\"edu.kn\",\"gov.kn\",\"kp\",\"com.kp\",\"edu.kp\",\"gov.kp\",\"org.kp\",\"rep.kp\",\"tra.kp\",\"kr\",\"ac.kr\",\"co.kr\",\"es.kr\",\"go.kr\",\"hs.kr\",\"kg.kr\",\"mil.kr\",\"ms.kr\",\"ne.kr\",\"or.kr\",\"pe.kr\",\"re.kr\",\"sc.kr\",\"busan.kr\",\"chungbuk.kr\",\"chungnam.kr\",\"daegu.kr\",\"daejeon.kr\",\"gangwon.kr\",\"gwangju.kr\",\"gyeongbuk.kr\",\"gyeonggi.kr\",\"gyeongnam.kr\",\"incheon.kr\",\"jeju.kr\",\"jeonbuk.kr\",\"jeonnam.kr\",\"seoul.kr\",\"ulsan.kr\",\"kw\",\"com.kw\",\"edu.kw\",\"emb.kw\",\"gov.kw\",\"ind.kw\",\"net.kw\",\"org.kw\",\"ky\",\"edu.ky\",\"gov.ky\",\"com.ky\",\"org.ky\",\"net.ky\",\"kz\",\"org.kz\",\"edu.kz\",\"net.kz\",\"gov.kz\",\"mil.kz\",\"com.kz\",\"la\",\"int.la\",\"net.la\",\"info.la\",\"edu.la\",\"gov.la\",\"per.la\",\"com.la\",\"org.la\",\"lb\",\"com.lb\",\"edu.lb\",\"gov.lb\",\"net.lb\",\"org.lb\",\"lc\",\"com.lc\",\"net.lc\",\"co.lc\",\"org.lc\",\"edu.lc\",\"gov.lc\",\"li\",\"lk\",\"gov.lk\",\"sch.lk\",\"net.lk\",\"int.lk\",\"com.lk\",\"org.lk\",\"edu.lk\",\"ngo.lk\",\"soc.lk\",\"web.lk\",\"ltd.lk\",\"assn.lk\",\"grp.lk\",\"hotel.lk\",\"ac.lk\",\"lr\",\"com.lr\",\"edu.lr\",\"gov.lr\",\"org.lr\",\"net.lr\",\"ls\",\"ac.ls\",\"biz.ls\",\"co.ls\",\"edu.ls\",\"gov.ls\",\"info.ls\",\"net.ls\",\"org.ls\",\"sc.ls\",\"lt\",\"gov.lt\",\"lu\",\"lv\",\"com.lv\",\"edu.lv\",\"gov.lv\",\"org.lv\",\"mil.lv\",\"id.lv\",\"net.lv\",\"asn.lv\",\"conf.lv\",\"ly\",\"com.ly\",\"net.ly\",\"gov.ly\",\"plc.ly\",\"edu.ly\",\"sch.ly\",\"med.ly\",\"org.ly\",\"id.ly\",\"ma\",\"co.ma\",\"net.ma\",\"gov.ma\",\"org.ma\",\"ac.ma\",\"press.ma\",\"mc\",\"tm.mc\",\"asso.mc\",\"md\",\"me\",\"co.me\",\"net.me\",\"org.me\",\"edu.me\",\"ac.me\",\"gov.me\",\"its.me\",\"priv.me\",\"mg\",\"org.mg\",\"nom.mg\",\"gov.mg\",\"prd.mg\",\"tm.mg\",\"edu.mg\",\"mil.mg\",\"com.mg\",\"co.mg\",\"mh\",\"mil\",\"mk\",\"com.mk\",\"org.mk\",\"net.mk\",\"edu.mk\",\"gov.mk\",\"inf.mk\",\"name.mk\",\"ml\",\"com.ml\",\"edu.ml\",\"gouv.ml\",\"gov.ml\",\"net.ml\",\"org.ml\",\"presse.ml\",\"*.mm\",\"mn\",\"gov.mn\",\"edu.mn\",\"org.mn\",\"mo\",\"com.mo\",\"net.mo\",\"org.mo\",\"edu.mo\",\"gov.mo\",\"mobi\",\"mp\",\"mq\",\"mr\",\"gov.mr\",\"ms\",\"com.ms\",\"edu.ms\",\"gov.ms\",\"net.ms\",\"org.ms\",\"mt\",\"com.mt\",\"edu.mt\",\"net.mt\",\"org.mt\",\"mu\",\"com.mu\",\"net.mu\",\"org.mu\",\"gov.mu\",\"ac.mu\",\"co.mu\",\"or.mu\",\"museum\",\"academy.museum\",\"agriculture.museum\",\"air.museum\",\"airguard.museum\",\"alabama.museum\",\"alaska.museum\",\"amber.museum\",\"ambulance.museum\",\"american.museum\",\"americana.museum\",\"americanantiques.museum\",\"americanart.museum\",\"amsterdam.museum\",\"and.museum\",\"annefrank.museum\",\"anthro.museum\",\"anthropology.museum\",\"antiques.museum\",\"aquarium.museum\",\"arboretum.museum\",\"archaeological.museum\",\"archaeology.museum\",\"architecture.museum\",\"art.museum\",\"artanddesign.museum\",\"artcenter.museum\",\"artdeco.museum\",\"arteducation.museum\",\"artgallery.museum\",\"arts.museum\",\"artsandcrafts.museum\",\"asmatart.museum\",\"assassination.museum\",\"assisi.museum\",\"association.museum\",\"astronomy.museum\",\"atlanta.museum\",\"austin.museum\",\"australia.museum\",\"automotive.museum\",\"aviation.museum\",\"axis.museum\",\"badajoz.museum\",\"baghdad.museum\",\"bahn.museum\",\"bale.museum\",\"baltimore.museum\",\"barcelona.museum\",\"baseball.museum\",\"basel.museum\",\"baths.museum\",\"bauern.museum\",\"beauxarts.museum\",\"beeldengeluid.museum\",\"bellevue.museum\",\"bergbau.museum\",\"berkeley.museum\",\"berlin.museum\",\"bern.museum\",\"bible.museum\",\"bilbao.museum\",\"bill.museum\",\"birdart.museum\",\"birthplace.museum\",\"bonn.museum\",\"boston.museum\",\"botanical.museum\",\"botanicalgarden.museum\",\"botanicgarden.museum\",\"botany.museum\",\"brandywinevalley.museum\",\"brasil.museum\",\"bristol.museum\",\"british.museum\",\"britishcolumbia.museum\",\"broadcast.museum\",\"brunel.museum\",\"brussel.museum\",\"brussels.museum\",\"bruxelles.museum\",\"building.museum\",\"burghof.museum\",\"bus.museum\",\"bushey.museum\",\"cadaques.museum\",\"california.museum\",\"cambridge.museum\",\"can.museum\",\"canada.museum\",\"capebreton.museum\",\"carrier.museum\",\"cartoonart.museum\",\"casadelamoneda.museum\",\"castle.museum\",\"castres.museum\",\"celtic.museum\",\"center.museum\",\"chattanooga.museum\",\"cheltenham.museum\",\"chesapeakebay.museum\",\"chicago.museum\",\"children.museum\",\"childrens.museum\",\"childrensgarden.museum\",\"chiropractic.museum\",\"chocolate.museum\",\"christiansburg.museum\",\"cincinnati.museum\",\"cinema.museum\",\"circus.museum\",\"civilisation.museum\",\"civilization.museum\",\"civilwar.museum\",\"clinton.museum\",\"clock.museum\",\"coal.museum\",\"coastaldefence.museum\",\"cody.museum\",\"coldwar.museum\",\"collection.museum\",\"colonialwilliamsburg.museum\",\"coloradoplateau.museum\",\"columbia.museum\",\"columbus.museum\",\"communication.museum\",\"communications.museum\",\"community.museum\",\"computer.museum\",\"computerhistory.museum\",\"comunicações.museum\",\"contemporary.museum\",\"contemporaryart.museum\",\"convent.museum\",\"copenhagen.museum\",\"corporation.museum\",\"correios-e-telecomunicações.museum\",\"corvette.museum\",\"costume.museum\",\"countryestate.museum\",\"county.museum\",\"crafts.museum\",\"cranbrook.museum\",\"creation.museum\",\"cultural.museum\",\"culturalcenter.museum\",\"culture.museum\",\"cyber.museum\",\"cymru.museum\",\"dali.museum\",\"dallas.museum\",\"database.museum\",\"ddr.museum\",\"decorativearts.museum\",\"delaware.museum\",\"delmenhorst.museum\",\"denmark.museum\",\"depot.museum\",\"design.museum\",\"detroit.museum\",\"dinosaur.museum\",\"discovery.museum\",\"dolls.museum\",\"donostia.museum\",\"durham.museum\",\"eastafrica.museum\",\"eastcoast.museum\",\"education.museum\",\"educational.museum\",\"egyptian.museum\",\"eisenbahn.museum\",\"elburg.museum\",\"elvendrell.museum\",\"embroidery.museum\",\"encyclopedic.museum\",\"england.museum\",\"entomology.museum\",\"environment.museum\",\"environmentalconservation.museum\",\"epilepsy.museum\",\"essex.museum\",\"estate.museum\",\"ethnology.museum\",\"exeter.museum\",\"exhibition.museum\",\"family.museum\",\"farm.museum\",\"farmequipment.museum\",\"farmers.museum\",\"farmstead.museum\",\"field.museum\",\"figueres.museum\",\"filatelia.museum\",\"film.museum\",\"fineart.museum\",\"finearts.museum\",\"finland.museum\",\"flanders.museum\",\"florida.museum\",\"force.museum\",\"fortmissoula.museum\",\"fortworth.museum\",\"foundation.museum\",\"francaise.museum\",\"frankfurt.museum\",\"franziskaner.museum\",\"freemasonry.museum\",\"freiburg.museum\",\"fribourg.museum\",\"frog.museum\",\"fundacio.museum\",\"furniture.museum\",\"gallery.museum\",\"garden.museum\",\"gateway.museum\",\"geelvinck.museum\",\"gemological.museum\",\"geology.museum\",\"georgia.museum\",\"giessen.museum\",\"glas.museum\",\"glass.museum\",\"gorge.museum\",\"grandrapids.museum\",\"graz.museum\",\"guernsey.museum\",\"halloffame.museum\",\"hamburg.museum\",\"handson.museum\",\"harvestcelebration.museum\",\"hawaii.museum\",\"health.museum\",\"heimatunduhren.museum\",\"hellas.museum\",\"helsinki.museum\",\"hembygdsforbund.museum\",\"heritage.museum\",\"histoire.museum\",\"historical.museum\",\"historicalsociety.museum\",\"historichouses.museum\",\"historisch.museum\",\"historisches.museum\",\"history.museum\",\"historyofscience.museum\",\"horology.museum\",\"house.museum\",\"humanities.museum\",\"illustration.museum\",\"imageandsound.museum\",\"indian.museum\",\"indiana.museum\",\"indianapolis.museum\",\"indianmarket.museum\",\"intelligence.museum\",\"interactive.museum\",\"iraq.museum\",\"iron.museum\",\"isleofman.museum\",\"jamison.museum\",\"jefferson.museum\",\"jerusalem.museum\",\"jewelry.museum\",\"jewish.museum\",\"jewishart.museum\",\"jfk.museum\",\"journalism.museum\",\"judaica.museum\",\"judygarland.museum\",\"juedisches.museum\",\"juif.museum\",\"karate.museum\",\"karikatur.museum\",\"kids.museum\",\"koebenhavn.museum\",\"koeln.museum\",\"kunst.museum\",\"kunstsammlung.museum\",\"kunstunddesign.museum\",\"labor.museum\",\"labour.museum\",\"lajolla.museum\",\"lancashire.museum\",\"landes.museum\",\"lans.museum\",\"läns.museum\",\"larsson.museum\",\"lewismiller.museum\",\"lincoln.museum\",\"linz.museum\",\"living.museum\",\"livinghistory.museum\",\"localhistory.museum\",\"london.museum\",\"losangeles.museum\",\"louvre.museum\",\"loyalist.museum\",\"lucerne.museum\",\"luxembourg.museum\",\"luzern.museum\",\"mad.museum\",\"madrid.museum\",\"mallorca.museum\",\"manchester.museum\",\"mansion.museum\",\"mansions.museum\",\"manx.museum\",\"marburg.museum\",\"maritime.museum\",\"maritimo.museum\",\"maryland.museum\",\"marylhurst.museum\",\"media.museum\",\"medical.museum\",\"medizinhistorisches.museum\",\"meeres.museum\",\"memorial.museum\",\"mesaverde.museum\",\"michigan.museum\",\"midatlantic.museum\",\"military.museum\",\"mill.museum\",\"miners.museum\",\"mining.museum\",\"minnesota.museum\",\"missile.museum\",\"missoula.museum\",\"modern.museum\",\"moma.museum\",\"money.museum\",\"monmouth.museum\",\"monticello.museum\",\"montreal.museum\",\"moscow.museum\",\"motorcycle.museum\",\"muenchen.museum\",\"muenster.museum\",\"mulhouse.museum\",\"muncie.museum\",\"museet.museum\",\"museumcenter.museum\",\"museumvereniging.museum\",\"music.museum\",\"national.museum\",\"nationalfirearms.museum\",\"nationalheritage.museum\",\"nativeamerican.museum\",\"naturalhistory.museum\",\"naturalhistorymuseum.museum\",\"naturalsciences.museum\",\"nature.museum\",\"naturhistorisches.museum\",\"natuurwetenschappen.museum\",\"naumburg.museum\",\"naval.museum\",\"nebraska.museum\",\"neues.museum\",\"newhampshire.museum\",\"newjersey.museum\",\"newmexico.museum\",\"newport.museum\",\"newspaper.museum\",\"newyork.museum\",\"niepce.museum\",\"norfolk.museum\",\"north.museum\",\"nrw.museum\",\"nyc.museum\",\"nyny.museum\",\"oceanographic.museum\",\"oceanographique.museum\",\"omaha.museum\",\"online.museum\",\"ontario.museum\",\"openair.museum\",\"oregon.museum\",\"oregontrail.museum\",\"otago.museum\",\"oxford.museum\",\"pacific.museum\",\"paderborn.museum\",\"palace.museum\",\"paleo.museum\",\"palmsprings.museum\",\"panama.museum\",\"paris.museum\",\"pasadena.museum\",\"pharmacy.museum\",\"philadelphia.museum\",\"philadelphiaarea.museum\",\"philately.museum\",\"phoenix.museum\",\"photography.museum\",\"pilots.museum\",\"pittsburgh.museum\",\"planetarium.museum\",\"plantation.museum\",\"plants.museum\",\"plaza.museum\",\"portal.museum\",\"portland.museum\",\"portlligat.museum\",\"posts-and-telecommunications.museum\",\"preservation.museum\",\"presidio.museum\",\"press.museum\",\"project.museum\",\"public.museum\",\"pubol.museum\",\"quebec.museum\",\"railroad.museum\",\"railway.museum\",\"research.museum\",\"resistance.museum\",\"riodejaneiro.museum\",\"rochester.museum\",\"rockart.museum\",\"roma.museum\",\"russia.museum\",\"saintlouis.museum\",\"salem.museum\",\"salvadordali.museum\",\"salzburg.museum\",\"sandiego.museum\",\"sanfrancisco.museum\",\"santabarbara.museum\",\"santacruz.museum\",\"santafe.museum\",\"saskatchewan.museum\",\"satx.museum\",\"savannahga.museum\",\"schlesisches.museum\",\"schoenbrunn.museum\",\"schokoladen.museum\",\"school.museum\",\"schweiz.museum\",\"science.museum\",\"scienceandhistory.museum\",\"scienceandindustry.museum\",\"sciencecenter.museum\",\"sciencecenters.museum\",\"science-fiction.museum\",\"sciencehistory.museum\",\"sciences.museum\",\"sciencesnaturelles.museum\",\"scotland.museum\",\"seaport.museum\",\"settlement.museum\",\"settlers.museum\",\"shell.museum\",\"sherbrooke.museum\",\"sibenik.museum\",\"silk.museum\",\"ski.museum\",\"skole.museum\",\"society.museum\",\"sologne.museum\",\"soundandvision.museum\",\"southcarolina.museum\",\"southwest.museum\",\"space.museum\",\"spy.museum\",\"square.museum\",\"stadt.museum\",\"stalbans.museum\",\"starnberg.museum\",\"state.museum\",\"stateofdelaware.museum\",\"station.museum\",\"steam.museum\",\"steiermark.museum\",\"stjohn.museum\",\"stockholm.museum\",\"stpetersburg.museum\",\"stuttgart.museum\",\"suisse.museum\",\"surgeonshall.museum\",\"surrey.museum\",\"svizzera.museum\",\"sweden.museum\",\"sydney.museum\",\"tank.museum\",\"tcm.museum\",\"technology.museum\",\"telekommunikation.museum\",\"television.museum\",\"texas.museum\",\"textile.museum\",\"theater.museum\",\"time.museum\",\"timekeeping.museum\",\"topology.museum\",\"torino.museum\",\"touch.museum\",\"town.museum\",\"transport.museum\",\"tree.museum\",\"trolley.museum\",\"trust.museum\",\"trustee.museum\",\"uhren.museum\",\"ulm.museum\",\"undersea.museum\",\"university.museum\",\"usa.museum\",\"usantiques.museum\",\"usarts.museum\",\"uscountryestate.museum\",\"usculture.museum\",\"usdecorativearts.museum\",\"usgarden.museum\",\"ushistory.museum\",\"ushuaia.museum\",\"uslivinghistory.museum\",\"utah.museum\",\"uvic.museum\",\"valley.museum\",\"vantaa.museum\",\"versailles.museum\",\"viking.museum\",\"village.museum\",\"virginia.museum\",\"virtual.museum\",\"virtuel.museum\",\"vlaanderen.museum\",\"volkenkunde.museum\",\"wales.museum\",\"wallonie.museum\",\"war.museum\",\"washingtondc.museum\",\"watchandclock.museum\",\"watch-and-clock.museum\",\"western.museum\",\"westfalen.museum\",\"whaling.museum\",\"wildlife.museum\",\"williamsburg.museum\",\"windmill.museum\",\"workshop.museum\",\"york.museum\",\"yorkshire.museum\",\"yosemite.museum\",\"youth.museum\",\"zoological.museum\",\"zoology.museum\",\"ירושלים.museum\",\"иком.museum\",\"mv\",\"aero.mv\",\"biz.mv\",\"com.mv\",\"coop.mv\",\"edu.mv\",\"gov.mv\",\"info.mv\",\"int.mv\",\"mil.mv\",\"museum.mv\",\"name.mv\",\"net.mv\",\"org.mv\",\"pro.mv\",\"mw\",\"ac.mw\",\"biz.mw\",\"co.mw\",\"com.mw\",\"coop.mw\",\"edu.mw\",\"gov.mw\",\"int.mw\",\"museum.mw\",\"net.mw\",\"org.mw\",\"mx\",\"com.mx\",\"org.mx\",\"gob.mx\",\"edu.mx\",\"net.mx\",\"my\",\"com.my\",\"net.my\",\"org.my\",\"gov.my\",\"edu.my\",\"mil.my\",\"name.my\",\"mz\",\"ac.mz\",\"adv.mz\",\"co.mz\",\"edu.mz\",\"gov.mz\",\"mil.mz\",\"net.mz\",\"org.mz\",\"na\",\"info.na\",\"pro.na\",\"name.na\",\"school.na\",\"or.na\",\"dr.na\",\"us.na\",\"mx.na\",\"ca.na\",\"in.na\",\"cc.na\",\"tv.na\",\"ws.na\",\"mobi.na\",\"co.na\",\"com.na\",\"org.na\",\"name\",\"nc\",\"asso.nc\",\"nom.nc\",\"ne\",\"net\",\"nf\",\"com.nf\",\"net.nf\",\"per.nf\",\"rec.nf\",\"web.nf\",\"arts.nf\",\"firm.nf\",\"info.nf\",\"other.nf\",\"store.nf\",\"ng\",\"com.ng\",\"edu.ng\",\"gov.ng\",\"i.ng\",\"mil.ng\",\"mobi.ng\",\"name.ng\",\"net.ng\",\"org.ng\",\"sch.ng\",\"ni\",\"ac.ni\",\"biz.ni\",\"co.ni\",\"com.ni\",\"edu.ni\",\"gob.ni\",\"in.ni\",\"info.ni\",\"int.ni\",\"mil.ni\",\"net.ni\",\"nom.ni\",\"org.ni\",\"web.ni\",\"nl\",\"no\",\"fhs.no\",\"vgs.no\",\"fylkesbibl.no\",\"folkebibl.no\",\"museum.no\",\"idrett.no\",\"priv.no\",\"mil.no\",\"stat.no\",\"dep.no\",\"kommune.no\",\"herad.no\",\"aa.no\",\"ah.no\",\"bu.no\",\"fm.no\",\"hl.no\",\"hm.no\",\"jan-mayen.no\",\"mr.no\",\"nl.no\",\"nt.no\",\"of.no\",\"ol.no\",\"oslo.no\",\"rl.no\",\"sf.no\",\"st.no\",\"svalbard.no\",\"tm.no\",\"tr.no\",\"va.no\",\"vf.no\",\"gs.aa.no\",\"gs.ah.no\",\"gs.bu.no\",\"gs.fm.no\",\"gs.hl.no\",\"gs.hm.no\",\"gs.jan-mayen.no\",\"gs.mr.no\",\"gs.nl.no\",\"gs.nt.no\",\"gs.of.no\",\"gs.ol.no\",\"gs.oslo.no\",\"gs.rl.no\",\"gs.sf.no\",\"gs.st.no\",\"gs.svalbard.no\",\"gs.tm.no\",\"gs.tr.no\",\"gs.va.no\",\"gs.vf.no\",\"akrehamn.no\",\"åkrehamn.no\",\"algard.no\",\"ålgård.no\",\"arna.no\",\"brumunddal.no\",\"bryne.no\",\"bronnoysund.no\",\"brønnøysund.no\",\"drobak.no\",\"drøbak.no\",\"egersund.no\",\"fetsund.no\",\"floro.no\",\"florø.no\",\"fredrikstad.no\",\"hokksund.no\",\"honefoss.no\",\"hønefoss.no\",\"jessheim.no\",\"jorpeland.no\",\"jørpeland.no\",\"kirkenes.no\",\"kopervik.no\",\"krokstadelva.no\",\"langevag.no\",\"langevåg.no\",\"leirvik.no\",\"mjondalen.no\",\"mjøndalen.no\",\"mo-i-rana.no\",\"mosjoen.no\",\"mosjøen.no\",\"nesoddtangen.no\",\"orkanger.no\",\"osoyro.no\",\"osøyro.no\",\"raholt.no\",\"råholt.no\",\"sandnessjoen.no\",\"sandnessjøen.no\",\"skedsmokorset.no\",\"slattum.no\",\"spjelkavik.no\",\"stathelle.no\",\"stavern.no\",\"stjordalshalsen.no\",\"stjørdalshalsen.no\",\"tananger.no\",\"tranby.no\",\"vossevangen.no\",\"afjord.no\",\"åfjord.no\",\"agdenes.no\",\"al.no\",\"ål.no\",\"alesund.no\",\"ålesund.no\",\"alstahaug.no\",\"alta.no\",\"áltá.no\",\"alaheadju.no\",\"álaheadju.no\",\"alvdal.no\",\"amli.no\",\"åmli.no\",\"amot.no\",\"åmot.no\",\"andebu.no\",\"andoy.no\",\"andøy.no\",\"andasuolo.no\",\"ardal.no\",\"årdal.no\",\"aremark.no\",\"arendal.no\",\"ås.no\",\"aseral.no\",\"åseral.no\",\"asker.no\",\"askim.no\",\"askvoll.no\",\"askoy.no\",\"askøy.no\",\"asnes.no\",\"åsnes.no\",\"audnedaln.no\",\"aukra.no\",\"aure.no\",\"aurland.no\",\"aurskog-holand.no\",\"aurskog-høland.no\",\"austevoll.no\",\"austrheim.no\",\"averoy.no\",\"averøy.no\",\"balestrand.no\",\"ballangen.no\",\"balat.no\",\"bálát.no\",\"balsfjord.no\",\"bahccavuotna.no\",\"báhccavuotna.no\",\"bamble.no\",\"bardu.no\",\"beardu.no\",\"beiarn.no\",\"bajddar.no\",\"bájddar.no\",\"baidar.no\",\"báidár.no\",\"berg.no\",\"bergen.no\",\"berlevag.no\",\"berlevåg.no\",\"bearalvahki.no\",\"bearalváhki.no\",\"bindal.no\",\"birkenes.no\",\"bjarkoy.no\",\"bjarkøy.no\",\"bjerkreim.no\",\"bjugn.no\",\"bodo.no\",\"bodø.no\",\"badaddja.no\",\"bådåddjå.no\",\"budejju.no\",\"bokn.no\",\"bremanger.no\",\"bronnoy.no\",\"brønnøy.no\",\"bygland.no\",\"bykle.no\",\"barum.no\",\"bærum.no\",\"bo.telemark.no\",\"bø.telemark.no\",\"bo.nordland.no\",\"bø.nordland.no\",\"bievat.no\",\"bievát.no\",\"bomlo.no\",\"bømlo.no\",\"batsfjord.no\",\"båtsfjord.no\",\"bahcavuotna.no\",\"báhcavuotna.no\",\"dovre.no\",\"drammen.no\",\"drangedal.no\",\"dyroy.no\",\"dyrøy.no\",\"donna.no\",\"dønna.no\",\"eid.no\",\"eidfjord.no\",\"eidsberg.no\",\"eidskog.no\",\"eidsvoll.no\",\"eigersund.no\",\"elverum.no\",\"enebakk.no\",\"engerdal.no\",\"etne.no\",\"etnedal.no\",\"evenes.no\",\"evenassi.no\",\"evenášši.no\",\"evje-og-hornnes.no\",\"farsund.no\",\"fauske.no\",\"fuossko.no\",\"fuoisku.no\",\"fedje.no\",\"fet.no\",\"finnoy.no\",\"finnøy.no\",\"fitjar.no\",\"fjaler.no\",\"fjell.no\",\"flakstad.no\",\"flatanger.no\",\"flekkefjord.no\",\"flesberg.no\",\"flora.no\",\"fla.no\",\"flå.no\",\"folldal.no\",\"forsand.no\",\"fosnes.no\",\"frei.no\",\"frogn.no\",\"froland.no\",\"frosta.no\",\"frana.no\",\"fræna.no\",\"froya.no\",\"frøya.no\",\"fusa.no\",\"fyresdal.no\",\"forde.no\",\"førde.no\",\"gamvik.no\",\"gangaviika.no\",\"gáŋgaviika.no\",\"gaular.no\",\"gausdal.no\",\"gildeskal.no\",\"gildeskål.no\",\"giske.no\",\"gjemnes.no\",\"gjerdrum.no\",\"gjerstad.no\",\"gjesdal.no\",\"gjovik.no\",\"gjøvik.no\",\"gloppen.no\",\"gol.no\",\"gran.no\",\"grane.no\",\"granvin.no\",\"gratangen.no\",\"grimstad.no\",\"grong.no\",\"kraanghke.no\",\"kråanghke.no\",\"grue.no\",\"gulen.no\",\"hadsel.no\",\"halden.no\",\"halsa.no\",\"hamar.no\",\"hamaroy.no\",\"habmer.no\",\"hábmer.no\",\"hapmir.no\",\"hápmir.no\",\"hammerfest.no\",\"hammarfeasta.no\",\"hámmárfeasta.no\",\"haram.no\",\"hareid.no\",\"harstad.no\",\"hasvik.no\",\"aknoluokta.no\",\"ákŋoluokta.no\",\"hattfjelldal.no\",\"aarborte.no\",\"haugesund.no\",\"hemne.no\",\"hemnes.no\",\"hemsedal.no\",\"heroy.more-og-romsdal.no\",\"herøy.møre-og-romsdal.no\",\"heroy.nordland.no\",\"herøy.nordland.no\",\"hitra.no\",\"hjartdal.no\",\"hjelmeland.no\",\"hobol.no\",\"hobøl.no\",\"hof.no\",\"hol.no\",\"hole.no\",\"holmestrand.no\",\"holtalen.no\",\"holtålen.no\",\"hornindal.no\",\"horten.no\",\"hurdal.no\",\"hurum.no\",\"hvaler.no\",\"hyllestad.no\",\"hagebostad.no\",\"hægebostad.no\",\"hoyanger.no\",\"høyanger.no\",\"hoylandet.no\",\"høylandet.no\",\"ha.no\",\"hå.no\",\"ibestad.no\",\"inderoy.no\",\"inderøy.no\",\"iveland.no\",\"jevnaker.no\",\"jondal.no\",\"jolster.no\",\"jølster.no\",\"karasjok.no\",\"karasjohka.no\",\"kárášjohka.no\",\"karlsoy.no\",\"galsa.no\",\"gálsá.no\",\"karmoy.no\",\"karmøy.no\",\"kautokeino.no\",\"guovdageaidnu.no\",\"klepp.no\",\"klabu.no\",\"klæbu.no\",\"kongsberg.no\",\"kongsvinger.no\",\"kragero.no\",\"kragerø.no\",\"kristiansand.no\",\"kristiansund.no\",\"krodsherad.no\",\"krødsherad.no\",\"kvalsund.no\",\"rahkkeravju.no\",\"ráhkkerávju.no\",\"kvam.no\",\"kvinesdal.no\",\"kvinnherad.no\",\"kviteseid.no\",\"kvitsoy.no\",\"kvitsøy.no\",\"kvafjord.no\",\"kvæfjord.no\",\"giehtavuoatna.no\",\"kvanangen.no\",\"kvænangen.no\",\"navuotna.no\",\"návuotna.no\",\"kafjord.no\",\"kåfjord.no\",\"gaivuotna.no\",\"gáivuotna.no\",\"larvik.no\",\"lavangen.no\",\"lavagis.no\",\"loabat.no\",\"loabát.no\",\"lebesby.no\",\"davvesiida.no\",\"leikanger.no\",\"leirfjord.no\",\"leka.no\",\"leksvik.no\",\"lenvik.no\",\"leangaviika.no\",\"leaŋgaviika.no\",\"lesja.no\",\"levanger.no\",\"lier.no\",\"lierne.no\",\"lillehammer.no\",\"lillesand.no\",\"lindesnes.no\",\"lindas.no\",\"lindås.no\",\"lom.no\",\"loppa.no\",\"lahppi.no\",\"láhppi.no\",\"lund.no\",\"lunner.no\",\"luroy.no\",\"lurøy.no\",\"luster.no\",\"lyngdal.no\",\"lyngen.no\",\"ivgu.no\",\"lardal.no\",\"lerdal.no\",\"lærdal.no\",\"lodingen.no\",\"lødingen.no\",\"lorenskog.no\",\"lørenskog.no\",\"loten.no\",\"løten.no\",\"malvik.no\",\"masoy.no\",\"måsøy.no\",\"muosat.no\",\"muosát.no\",\"mandal.no\",\"marker.no\",\"marnardal.no\",\"masfjorden.no\",\"meland.no\",\"meldal.no\",\"melhus.no\",\"meloy.no\",\"meløy.no\",\"meraker.no\",\"meråker.no\",\"moareke.no\",\"moåreke.no\",\"midsund.no\",\"midtre-gauldal.no\",\"modalen.no\",\"modum.no\",\"molde.no\",\"moskenes.no\",\"moss.no\",\"mosvik.no\",\"malselv.no\",\"målselv.no\",\"malatvuopmi.no\",\"málatvuopmi.no\",\"namdalseid.no\",\"aejrie.no\",\"namsos.no\",\"namsskogan.no\",\"naamesjevuemie.no\",\"nååmesjevuemie.no\",\"laakesvuemie.no\",\"nannestad.no\",\"narvik.no\",\"narviika.no\",\"naustdal.no\",\"nedre-eiker.no\",\"nes.akershus.no\",\"nes.buskerud.no\",\"nesna.no\",\"nesodden.no\",\"nesseby.no\",\"unjarga.no\",\"unjárga.no\",\"nesset.no\",\"nissedal.no\",\"nittedal.no\",\"nord-aurdal.no\",\"nord-fron.no\",\"nord-odal.no\",\"norddal.no\",\"nordkapp.no\",\"davvenjarga.no\",\"davvenjárga.no\",\"nordre-land.no\",\"nordreisa.no\",\"raisa.no\",\"ráisa.no\",\"nore-og-uvdal.no\",\"notodden.no\",\"naroy.no\",\"nærøy.no\",\"notteroy.no\",\"nøtterøy.no\",\"odda.no\",\"oksnes.no\",\"øksnes.no\",\"oppdal.no\",\"oppegard.no\",\"oppegård.no\",\"orkdal.no\",\"orland.no\",\"ørland.no\",\"orskog.no\",\"ørskog.no\",\"orsta.no\",\"ørsta.no\",\"os.hedmark.no\",\"os.hordaland.no\",\"osen.no\",\"osteroy.no\",\"osterøy.no\",\"ostre-toten.no\",\"østre-toten.no\",\"overhalla.no\",\"ovre-eiker.no\",\"øvre-eiker.no\",\"oyer.no\",\"øyer.no\",\"oygarden.no\",\"øygarden.no\",\"oystre-slidre.no\",\"øystre-slidre.no\",\"porsanger.no\",\"porsangu.no\",\"porsáŋgu.no\",\"porsgrunn.no\",\"radoy.no\",\"radøy.no\",\"rakkestad.no\",\"rana.no\",\"ruovat.no\",\"randaberg.no\",\"rauma.no\",\"rendalen.no\",\"rennebu.no\",\"rennesoy.no\",\"rennesøy.no\",\"rindal.no\",\"ringebu.no\",\"ringerike.no\",\"ringsaker.no\",\"rissa.no\",\"risor.no\",\"risør.no\",\"roan.no\",\"rollag.no\",\"rygge.no\",\"ralingen.no\",\"rælingen.no\",\"rodoy.no\",\"rødøy.no\",\"romskog.no\",\"rømskog.no\",\"roros.no\",\"røros.no\",\"rost.no\",\"røst.no\",\"royken.no\",\"røyken.no\",\"royrvik.no\",\"røyrvik.no\",\"rade.no\",\"råde.no\",\"salangen.no\",\"siellak.no\",\"saltdal.no\",\"salat.no\",\"sálát.no\",\"sálat.no\",\"samnanger.no\",\"sande.more-og-romsdal.no\",\"sande.møre-og-romsdal.no\",\"sande.vestfold.no\",\"sandefjord.no\",\"sandnes.no\",\"sandoy.no\",\"sandøy.no\",\"sarpsborg.no\",\"sauda.no\",\"sauherad.no\",\"sel.no\",\"selbu.no\",\"selje.no\",\"seljord.no\",\"sigdal.no\",\"siljan.no\",\"sirdal.no\",\"skaun.no\",\"skedsmo.no\",\"ski.no\",\"skien.no\",\"skiptvet.no\",\"skjervoy.no\",\"skjervøy.no\",\"skierva.no\",\"skiervá.no\",\"skjak.no\",\"skjåk.no\",\"skodje.no\",\"skanland.no\",\"skånland.no\",\"skanit.no\",\"skánit.no\",\"smola.no\",\"smøla.no\",\"snillfjord.no\",\"snasa.no\",\"snåsa.no\",\"snoasa.no\",\"snaase.no\",\"snåase.no\",\"sogndal.no\",\"sokndal.no\",\"sola.no\",\"solund.no\",\"songdalen.no\",\"sortland.no\",\"spydeberg.no\",\"stange.no\",\"stavanger.no\",\"steigen.no\",\"steinkjer.no\",\"stjordal.no\",\"stjørdal.no\",\"stokke.no\",\"stor-elvdal.no\",\"stord.no\",\"stordal.no\",\"storfjord.no\",\"omasvuotna.no\",\"strand.no\",\"stranda.no\",\"stryn.no\",\"sula.no\",\"suldal.no\",\"sund.no\",\"sunndal.no\",\"surnadal.no\",\"sveio.no\",\"svelvik.no\",\"sykkylven.no\",\"sogne.no\",\"søgne.no\",\"somna.no\",\"sømna.no\",\"sondre-land.no\",\"søndre-land.no\",\"sor-aurdal.no\",\"sør-aurdal.no\",\"sor-fron.no\",\"sør-fron.no\",\"sor-odal.no\",\"sør-odal.no\",\"sor-varanger.no\",\"sør-varanger.no\",\"matta-varjjat.no\",\"mátta-várjjat.no\",\"sorfold.no\",\"sørfold.no\",\"sorreisa.no\",\"sørreisa.no\",\"sorum.no\",\"sørum.no\",\"tana.no\",\"deatnu.no\",\"time.no\",\"tingvoll.no\",\"tinn.no\",\"tjeldsund.no\",\"dielddanuorri.no\",\"tjome.no\",\"tjøme.no\",\"tokke.no\",\"tolga.no\",\"torsken.no\",\"tranoy.no\",\"tranøy.no\",\"tromso.no\",\"tromsø.no\",\"tromsa.no\",\"romsa.no\",\"trondheim.no\",\"troandin.no\",\"trysil.no\",\"trana.no\",\"træna.no\",\"trogstad.no\",\"trøgstad.no\",\"tvedestrand.no\",\"tydal.no\",\"tynset.no\",\"tysfjord.no\",\"divtasvuodna.no\",\"divttasvuotna.no\",\"tysnes.no\",\"tysvar.no\",\"tysvær.no\",\"tonsberg.no\",\"tønsberg.no\",\"ullensaker.no\",\"ullensvang.no\",\"ulvik.no\",\"utsira.no\",\"vadso.no\",\"vadsø.no\",\"cahcesuolo.no\",\"čáhcesuolo.no\",\"vaksdal.no\",\"valle.no\",\"vang.no\",\"vanylven.no\",\"vardo.no\",\"vardø.no\",\"varggat.no\",\"várggát.no\",\"vefsn.no\",\"vaapste.no\",\"vega.no\",\"vegarshei.no\",\"vegårshei.no\",\"vennesla.no\",\"verdal.no\",\"verran.no\",\"vestby.no\",\"vestnes.no\",\"vestre-slidre.no\",\"vestre-toten.no\",\"vestvagoy.no\",\"vestvågøy.no\",\"vevelstad.no\",\"vik.no\",\"vikna.no\",\"vindafjord.no\",\"volda.no\",\"voss.no\",\"varoy.no\",\"værøy.no\",\"vagan.no\",\"vågan.no\",\"voagat.no\",\"vagsoy.no\",\"vågsøy.no\",\"vaga.no\",\"vågå.no\",\"valer.ostfold.no\",\"våler.østfold.no\",\"valer.hedmark.no\",\"våler.hedmark.no\",\"*.np\",\"nr\",\"biz.nr\",\"info.nr\",\"gov.nr\",\"edu.nr\",\"org.nr\",\"net.nr\",\"com.nr\",\"nu\",\"nz\",\"ac.nz\",\"co.nz\",\"cri.nz\",\"geek.nz\",\"gen.nz\",\"govt.nz\",\"health.nz\",\"iwi.nz\",\"kiwi.nz\",\"maori.nz\",\"mil.nz\",\"māori.nz\",\"net.nz\",\"org.nz\",\"parliament.nz\",\"school.nz\",\"om\",\"co.om\",\"com.om\",\"edu.om\",\"gov.om\",\"med.om\",\"museum.om\",\"net.om\",\"org.om\",\"pro.om\",\"onion\",\"org\",\"pa\",\"ac.pa\",\"gob.pa\",\"com.pa\",\"org.pa\",\"sld.pa\",\"edu.pa\",\"net.pa\",\"ing.pa\",\"abo.pa\",\"med.pa\",\"nom.pa\",\"pe\",\"edu.pe\",\"gob.pe\",\"nom.pe\",\"mil.pe\",\"org.pe\",\"com.pe\",\"net.pe\",\"pf\",\"com.pf\",\"org.pf\",\"edu.pf\",\"*.pg\",\"ph\",\"com.ph\",\"net.ph\",\"org.ph\",\"gov.ph\",\"edu.ph\",\"ngo.ph\",\"mil.ph\",\"i.ph\",\"pk\",\"com.pk\",\"net.pk\",\"edu.pk\",\"org.pk\",\"fam.pk\",\"biz.pk\",\"web.pk\",\"gov.pk\",\"gob.pk\",\"gok.pk\",\"gon.pk\",\"gop.pk\",\"gos.pk\",\"info.pk\",\"pl\",\"com.pl\",\"net.pl\",\"org.pl\",\"aid.pl\",\"agro.pl\",\"atm.pl\",\"auto.pl\",\"biz.pl\",\"edu.pl\",\"gmina.pl\",\"gsm.pl\",\"info.pl\",\"mail.pl\",\"miasta.pl\",\"media.pl\",\"mil.pl\",\"nieruchomosci.pl\",\"nom.pl\",\"pc.pl\",\"powiat.pl\",\"priv.pl\",\"realestate.pl\",\"rel.pl\",\"sex.pl\",\"shop.pl\",\"sklep.pl\",\"sos.pl\",\"szkola.pl\",\"targi.pl\",\"tm.pl\",\"tourism.pl\",\"travel.pl\",\"turystyka.pl\",\"gov.pl\",\"ap.gov.pl\",\"ic.gov.pl\",\"is.gov.pl\",\"us.gov.pl\",\"kmpsp.gov.pl\",\"kppsp.gov.pl\",\"kwpsp.gov.pl\",\"psp.gov.pl\",\"wskr.gov.pl\",\"kwp.gov.pl\",\"mw.gov.pl\",\"ug.gov.pl\",\"um.gov.pl\",\"umig.gov.pl\",\"ugim.gov.pl\",\"upow.gov.pl\",\"uw.gov.pl\",\"starostwo.gov.pl\",\"pa.gov.pl\",\"po.gov.pl\",\"psse.gov.pl\",\"pup.gov.pl\",\"rzgw.gov.pl\",\"sa.gov.pl\",\"so.gov.pl\",\"sr.gov.pl\",\"wsa.gov.pl\",\"sko.gov.pl\",\"uzs.gov.pl\",\"wiih.gov.pl\",\"winb.gov.pl\",\"pinb.gov.pl\",\"wios.gov.pl\",\"witd.gov.pl\",\"wzmiuw.gov.pl\",\"piw.gov.pl\",\"wiw.gov.pl\",\"griw.gov.pl\",\"wif.gov.pl\",\"oum.gov.pl\",\"sdn.gov.pl\",\"zp.gov.pl\",\"uppo.gov.pl\",\"mup.gov.pl\",\"wuoz.gov.pl\",\"konsulat.gov.pl\",\"oirm.gov.pl\",\"augustow.pl\",\"babia-gora.pl\",\"bedzin.pl\",\"beskidy.pl\",\"bialowieza.pl\",\"bialystok.pl\",\"bielawa.pl\",\"bieszczady.pl\",\"boleslawiec.pl\",\"bydgoszcz.pl\",\"bytom.pl\",\"cieszyn.pl\",\"czeladz.pl\",\"czest.pl\",\"dlugoleka.pl\",\"elblag.pl\",\"elk.pl\",\"glogow.pl\",\"gniezno.pl\",\"gorlice.pl\",\"grajewo.pl\",\"ilawa.pl\",\"jaworzno.pl\",\"jelenia-gora.pl\",\"jgora.pl\",\"kalisz.pl\",\"kazimierz-dolny.pl\",\"karpacz.pl\",\"kartuzy.pl\",\"kaszuby.pl\",\"katowice.pl\",\"kepno.pl\",\"ketrzyn.pl\",\"klodzko.pl\",\"kobierzyce.pl\",\"kolobrzeg.pl\",\"konin.pl\",\"konskowola.pl\",\"kutno.pl\",\"lapy.pl\",\"lebork.pl\",\"legnica.pl\",\"lezajsk.pl\",\"limanowa.pl\",\"lomza.pl\",\"lowicz.pl\",\"lubin.pl\",\"lukow.pl\",\"malbork.pl\",\"malopolska.pl\",\"mazowsze.pl\",\"mazury.pl\",\"mielec.pl\",\"mielno.pl\",\"mragowo.pl\",\"naklo.pl\",\"nowaruda.pl\",\"nysa.pl\",\"olawa.pl\",\"olecko.pl\",\"olkusz.pl\",\"olsztyn.pl\",\"opoczno.pl\",\"opole.pl\",\"ostroda.pl\",\"ostroleka.pl\",\"ostrowiec.pl\",\"ostrowwlkp.pl\",\"pila.pl\",\"pisz.pl\",\"podhale.pl\",\"podlasie.pl\",\"polkowice.pl\",\"pomorze.pl\",\"pomorskie.pl\",\"prochowice.pl\",\"pruszkow.pl\",\"przeworsk.pl\",\"pulawy.pl\",\"radom.pl\",\"rawa-maz.pl\",\"rybnik.pl\",\"rzeszow.pl\",\"sanok.pl\",\"sejny.pl\",\"slask.pl\",\"slupsk.pl\",\"sosnowiec.pl\",\"stalowa-wola.pl\",\"skoczow.pl\",\"starachowice.pl\",\"stargard.pl\",\"suwalki.pl\",\"swidnica.pl\",\"swiebodzin.pl\",\"swinoujscie.pl\",\"szczecin.pl\",\"szczytno.pl\",\"tarnobrzeg.pl\",\"tgory.pl\",\"turek.pl\",\"tychy.pl\",\"ustka.pl\",\"walbrzych.pl\",\"warmia.pl\",\"warszawa.pl\",\"waw.pl\",\"wegrow.pl\",\"wielun.pl\",\"wlocl.pl\",\"wloclawek.pl\",\"wodzislaw.pl\",\"wolomin.pl\",\"wroclaw.pl\",\"zachpomor.pl\",\"zagan.pl\",\"zarow.pl\",\"zgora.pl\",\"zgorzelec.pl\",\"pm\",\"pn\",\"gov.pn\",\"co.pn\",\"org.pn\",\"edu.pn\",\"net.pn\",\"post\",\"pr\",\"com.pr\",\"net.pr\",\"org.pr\",\"gov.pr\",\"edu.pr\",\"isla.pr\",\"pro.pr\",\"biz.pr\",\"info.pr\",\"name.pr\",\"est.pr\",\"prof.pr\",\"ac.pr\",\"pro\",\"aaa.pro\",\"aca.pro\",\"acct.pro\",\"avocat.pro\",\"bar.pro\",\"cpa.pro\",\"eng.pro\",\"jur.pro\",\"law.pro\",\"med.pro\",\"recht.pro\",\"ps\",\"edu.ps\",\"gov.ps\",\"sec.ps\",\"plo.ps\",\"com.ps\",\"org.ps\",\"net.ps\",\"pt\",\"net.pt\",\"gov.pt\",\"org.pt\",\"edu.pt\",\"int.pt\",\"publ.pt\",\"com.pt\",\"nome.pt\",\"pw\",\"co.pw\",\"ne.pw\",\"or.pw\",\"ed.pw\",\"go.pw\",\"belau.pw\",\"py\",\"com.py\",\"coop.py\",\"edu.py\",\"gov.py\",\"mil.py\",\"net.py\",\"org.py\",\"qa\",\"com.qa\",\"edu.qa\",\"gov.qa\",\"mil.qa\",\"name.qa\",\"net.qa\",\"org.qa\",\"sch.qa\",\"re\",\"asso.re\",\"com.re\",\"nom.re\",\"ro\",\"arts.ro\",\"com.ro\",\"firm.ro\",\"info.ro\",\"nom.ro\",\"nt.ro\",\"org.ro\",\"rec.ro\",\"store.ro\",\"tm.ro\",\"www.ro\",\"rs\",\"ac.rs\",\"co.rs\",\"edu.rs\",\"gov.rs\",\"in.rs\",\"org.rs\",\"ru\",\"rw\",\"ac.rw\",\"co.rw\",\"coop.rw\",\"gov.rw\",\"mil.rw\",\"net.rw\",\"org.rw\",\"sa\",\"com.sa\",\"net.sa\",\"org.sa\",\"gov.sa\",\"med.sa\",\"pub.sa\",\"edu.sa\",\"sch.sa\",\"sb\",\"com.sb\",\"edu.sb\",\"gov.sb\",\"net.sb\",\"org.sb\",\"sc\",\"com.sc\",\"gov.sc\",\"net.sc\",\"org.sc\",\"edu.sc\",\"sd\",\"com.sd\",\"net.sd\",\"org.sd\",\"edu.sd\",\"med.sd\",\"tv.sd\",\"gov.sd\",\"info.sd\",\"se\",\"a.se\",\"ac.se\",\"b.se\",\"bd.se\",\"brand.se\",\"c.se\",\"d.se\",\"e.se\",\"f.se\",\"fh.se\",\"fhsk.se\",\"fhv.se\",\"g.se\",\"h.se\",\"i.se\",\"k.se\",\"komforb.se\",\"kommunalforbund.se\",\"komvux.se\",\"l.se\",\"lanbib.se\",\"m.se\",\"n.se\",\"naturbruksgymn.se\",\"o.se\",\"org.se\",\"p.se\",\"parti.se\",\"pp.se\",\"press.se\",\"r.se\",\"s.se\",\"t.se\",\"tm.se\",\"u.se\",\"w.se\",\"x.se\",\"y.se\",\"z.se\",\"sg\",\"com.sg\",\"net.sg\",\"org.sg\",\"gov.sg\",\"edu.sg\",\"per.sg\",\"sh\",\"com.sh\",\"net.sh\",\"gov.sh\",\"org.sh\",\"mil.sh\",\"si\",\"sj\",\"sk\",\"sl\",\"com.sl\",\"net.sl\",\"edu.sl\",\"gov.sl\",\"org.sl\",\"sm\",\"sn\",\"art.sn\",\"com.sn\",\"edu.sn\",\"gouv.sn\",\"org.sn\",\"perso.sn\",\"univ.sn\",\"so\",\"com.so\",\"edu.so\",\"gov.so\",\"me.so\",\"net.so\",\"org.so\",\"sr\",\"ss\",\"biz.ss\",\"com.ss\",\"edu.ss\",\"gov.ss\",\"net.ss\",\"org.ss\",\"st\",\"co.st\",\"com.st\",\"consulado.st\",\"edu.st\",\"embaixada.st\",\"gov.st\",\"mil.st\",\"net.st\",\"org.st\",\"principe.st\",\"saotome.st\",\"store.st\",\"su\",\"sv\",\"com.sv\",\"edu.sv\",\"gob.sv\",\"org.sv\",\"red.sv\",\"sx\",\"gov.sx\",\"sy\",\"edu.sy\",\"gov.sy\",\"net.sy\",\"mil.sy\",\"com.sy\",\"org.sy\",\"sz\",\"co.sz\",\"ac.sz\",\"org.sz\",\"tc\",\"td\",\"tel\",\"tf\",\"tg\",\"th\",\"ac.th\",\"co.th\",\"go.th\",\"in.th\",\"mi.th\",\"net.th\",\"or.th\",\"tj\",\"ac.tj\",\"biz.tj\",\"co.tj\",\"com.tj\",\"edu.tj\",\"go.tj\",\"gov.tj\",\"int.tj\",\"mil.tj\",\"name.tj\",\"net.tj\",\"nic.tj\",\"org.tj\",\"test.tj\",\"web.tj\",\"tk\",\"tl\",\"gov.tl\",\"tm\",\"com.tm\",\"co.tm\",\"org.tm\",\"net.tm\",\"nom.tm\",\"gov.tm\",\"mil.tm\",\"edu.tm\",\"tn\",\"com.tn\",\"ens.tn\",\"fin.tn\",\"gov.tn\",\"ind.tn\",\"intl.tn\",\"nat.tn\",\"net.tn\",\"org.tn\",\"info.tn\",\"perso.tn\",\"tourism.tn\",\"edunet.tn\",\"rnrt.tn\",\"rns.tn\",\"rnu.tn\",\"mincom.tn\",\"agrinet.tn\",\"defense.tn\",\"turen.tn\",\"to\",\"com.to\",\"gov.to\",\"net.to\",\"org.to\",\"edu.to\",\"mil.to\",\"tr\",\"av.tr\",\"bbs.tr\",\"bel.tr\",\"biz.tr\",\"com.tr\",\"dr.tr\",\"edu.tr\",\"gen.tr\",\"gov.tr\",\"info.tr\",\"mil.tr\",\"k12.tr\",\"kep.tr\",\"name.tr\",\"net.tr\",\"org.tr\",\"pol.tr\",\"tel.tr\",\"tsk.tr\",\"tv.tr\",\"web.tr\",\"nc.tr\",\"gov.nc.tr\",\"tt\",\"co.tt\",\"com.tt\",\"org.tt\",\"net.tt\",\"biz.tt\",\"info.tt\",\"pro.tt\",\"int.tt\",\"coop.tt\",\"jobs.tt\",\"mobi.tt\",\"travel.tt\",\"museum.tt\",\"aero.tt\",\"name.tt\",\"gov.tt\",\"edu.tt\",\"tv\",\"tw\",\"edu.tw\",\"gov.tw\",\"mil.tw\",\"com.tw\",\"net.tw\",\"org.tw\",\"idv.tw\",\"game.tw\",\"ebiz.tw\",\"club.tw\",\"網路.tw\",\"組織.tw\",\"商業.tw\",\"tz\",\"ac.tz\",\"co.tz\",\"go.tz\",\"hotel.tz\",\"info.tz\",\"me.tz\",\"mil.tz\",\"mobi.tz\",\"ne.tz\",\"or.tz\",\"sc.tz\",\"tv.tz\",\"ua\",\"com.ua\",\"edu.ua\",\"gov.ua\",\"in.ua\",\"net.ua\",\"org.ua\",\"cherkassy.ua\",\"cherkasy.ua\",\"chernigov.ua\",\"chernihiv.ua\",\"chernivtsi.ua\",\"chernovtsy.ua\",\"ck.ua\",\"cn.ua\",\"cr.ua\",\"crimea.ua\",\"cv.ua\",\"dn.ua\",\"dnepropetrovsk.ua\",\"dnipropetrovsk.ua\",\"dominic.ua\",\"donetsk.ua\",\"dp.ua\",\"if.ua\",\"ivano-frankivsk.ua\",\"kh.ua\",\"kharkiv.ua\",\"kharkov.ua\",\"kherson.ua\",\"khmelnitskiy.ua\",\"khmelnytskyi.ua\",\"kiev.ua\",\"kirovograd.ua\",\"km.ua\",\"kr.ua\",\"krym.ua\",\"ks.ua\",\"kv.ua\",\"kyiv.ua\",\"lg.ua\",\"lt.ua\",\"lugansk.ua\",\"lutsk.ua\",\"lv.ua\",\"lviv.ua\",\"mk.ua\",\"mykolaiv.ua\",\"nikolaev.ua\",\"od.ua\",\"odesa.ua\",\"odessa.ua\",\"pl.ua\",\"poltava.ua\",\"rivne.ua\",\"rovno.ua\",\"rv.ua\",\"sb.ua\",\"sebastopol.ua\",\"sevastopol.ua\",\"sm.ua\",\"sumy.ua\",\"te.ua\",\"ternopil.ua\",\"uz.ua\",\"uzhgorod.ua\",\"vinnica.ua\",\"vinnytsia.ua\",\"vn.ua\",\"volyn.ua\",\"yalta.ua\",\"zaporizhzhe.ua\",\"zaporizhzhia.ua\",\"zhitomir.ua\",\"zhytomyr.ua\",\"zp.ua\",\"zt.ua\",\"ug\",\"co.ug\",\"or.ug\",\"ac.ug\",\"sc.ug\",\"go.ug\",\"ne.ug\",\"com.ug\",\"org.ug\",\"uk\",\"ac.uk\",\"co.uk\",\"gov.uk\",\"ltd.uk\",\"me.uk\",\"net.uk\",\"nhs.uk\",\"org.uk\",\"plc.uk\",\"police.uk\",\"*.sch.uk\",\"us\",\"dni.us\",\"fed.us\",\"isa.us\",\"kids.us\",\"nsn.us\",\"ak.us\",\"al.us\",\"ar.us\",\"as.us\",\"az.us\",\"ca.us\",\"co.us\",\"ct.us\",\"dc.us\",\"de.us\",\"fl.us\",\"ga.us\",\"gu.us\",\"hi.us\",\"ia.us\",\"id.us\",\"il.us\",\"in.us\",\"ks.us\",\"ky.us\",\"la.us\",\"ma.us\",\"md.us\",\"me.us\",\"mi.us\",\"mn.us\",\"mo.us\",\"ms.us\",\"mt.us\",\"nc.us\",\"nd.us\",\"ne.us\",\"nh.us\",\"nj.us\",\"nm.us\",\"nv.us\",\"ny.us\",\"oh.us\",\"ok.us\",\"or.us\",\"pa.us\",\"pr.us\",\"ri.us\",\"sc.us\",\"sd.us\",\"tn.us\",\"tx.us\",\"ut.us\",\"vi.us\",\"vt.us\",\"va.us\",\"wa.us\",\"wi.us\",\"wv.us\",\"wy.us\",\"k12.ak.us\",\"k12.al.us\",\"k12.ar.us\",\"k12.as.us\",\"k12.az.us\",\"k12.ca.us\",\"k12.co.us\",\"k12.ct.us\",\"k12.dc.us\",\"k12.de.us\",\"k12.fl.us\",\"k12.ga.us\",\"k12.gu.us\",\"k12.ia.us\",\"k12.id.us\",\"k12.il.us\",\"k12.in.us\",\"k12.ks.us\",\"k12.ky.us\",\"k12.la.us\",\"k12.ma.us\",\"k12.md.us\",\"k12.me.us\",\"k12.mi.us\",\"k12.mn.us\",\"k12.mo.us\",\"k12.ms.us\",\"k12.mt.us\",\"k12.nc.us\",\"k12.ne.us\",\"k12.nh.us\",\"k12.nj.us\",\"k12.nm.us\",\"k12.nv.us\",\"k12.ny.us\",\"k12.oh.us\",\"k12.ok.us\",\"k12.or.us\",\"k12.pa.us\",\"k12.pr.us\",\"k12.ri.us\",\"k12.sc.us\",\"k12.tn.us\",\"k12.tx.us\",\"k12.ut.us\",\"k12.vi.us\",\"k12.vt.us\",\"k12.va.us\",\"k12.wa.us\",\"k12.wi.us\",\"k12.wy.us\",\"cc.ak.us\",\"cc.al.us\",\"cc.ar.us\",\"cc.as.us\",\"cc.az.us\",\"cc.ca.us\",\"cc.co.us\",\"cc.ct.us\",\"cc.dc.us\",\"cc.de.us\",\"cc.fl.us\",\"cc.ga.us\",\"cc.gu.us\",\"cc.hi.us\",\"cc.ia.us\",\"cc.id.us\",\"cc.il.us\",\"cc.in.us\",\"cc.ks.us\",\"cc.ky.us\",\"cc.la.us\",\"cc.ma.us\",\"cc.md.us\",\"cc.me.us\",\"cc.mi.us\",\"cc.mn.us\",\"cc.mo.us\",\"cc.ms.us\",\"cc.mt.us\",\"cc.nc.us\",\"cc.nd.us\",\"cc.ne.us\",\"cc.nh.us\",\"cc.nj.us\",\"cc.nm.us\",\"cc.nv.us\",\"cc.ny.us\",\"cc.oh.us\",\"cc.ok.us\",\"cc.or.us\",\"cc.pa.us\",\"cc.pr.us\",\"cc.ri.us\",\"cc.sc.us\",\"cc.sd.us\",\"cc.tn.us\",\"cc.tx.us\",\"cc.ut.us\",\"cc.vi.us\",\"cc.vt.us\",\"cc.va.us\",\"cc.wa.us\",\"cc.wi.us\",\"cc.wv.us\",\"cc.wy.us\",\"lib.ak.us\",\"lib.al.us\",\"lib.ar.us\",\"lib.as.us\",\"lib.az.us\",\"lib.ca.us\",\"lib.co.us\",\"lib.ct.us\",\"lib.dc.us\",\"lib.fl.us\",\"lib.ga.us\",\"lib.gu.us\",\"lib.hi.us\",\"lib.ia.us\",\"lib.id.us\",\"lib.il.us\",\"lib.in.us\",\"lib.ks.us\",\"lib.ky.us\",\"lib.la.us\",\"lib.ma.us\",\"lib.md.us\",\"lib.me.us\",\"lib.mi.us\",\"lib.mn.us\",\"lib.mo.us\",\"lib.ms.us\",\"lib.mt.us\",\"lib.nc.us\",\"lib.nd.us\",\"lib.ne.us\",\"lib.nh.us\",\"lib.nj.us\",\"lib.nm.us\",\"lib.nv.us\",\"lib.ny.us\",\"lib.oh.us\",\"lib.ok.us\",\"lib.or.us\",\"lib.pa.us\",\"lib.pr.us\",\"lib.ri.us\",\"lib.sc.us\",\"lib.sd.us\",\"lib.tn.us\",\"lib.tx.us\",\"lib.ut.us\",\"lib.vi.us\",\"lib.vt.us\",\"lib.va.us\",\"lib.wa.us\",\"lib.wi.us\",\"lib.wy.us\",\"pvt.k12.ma.us\",\"chtr.k12.ma.us\",\"paroch.k12.ma.us\",\"ann-arbor.mi.us\",\"cog.mi.us\",\"dst.mi.us\",\"eaton.mi.us\",\"gen.mi.us\",\"mus.mi.us\",\"tec.mi.us\",\"washtenaw.mi.us\",\"uy\",\"com.uy\",\"edu.uy\",\"gub.uy\",\"mil.uy\",\"net.uy\",\"org.uy\",\"uz\",\"co.uz\",\"com.uz\",\"net.uz\",\"org.uz\",\"va\",\"vc\",\"com.vc\",\"net.vc\",\"org.vc\",\"gov.vc\",\"mil.vc\",\"edu.vc\",\"ve\",\"arts.ve\",\"co.ve\",\"com.ve\",\"e12.ve\",\"edu.ve\",\"firm.ve\",\"gob.ve\",\"gov.ve\",\"info.ve\",\"int.ve\",\"mil.ve\",\"net.ve\",\"org.ve\",\"rec.ve\",\"store.ve\",\"tec.ve\",\"web.ve\",\"vg\",\"vi\",\"co.vi\",\"com.vi\",\"k12.vi\",\"net.vi\",\"org.vi\",\"vn\",\"com.vn\",\"net.vn\",\"org.vn\",\"edu.vn\",\"gov.vn\",\"int.vn\",\"ac.vn\",\"biz.vn\",\"info.vn\",\"name.vn\",\"pro.vn\",\"health.vn\",\"vu\",\"com.vu\",\"edu.vu\",\"net.vu\",\"org.vu\",\"wf\",\"ws\",\"com.ws\",\"net.ws\",\"org.ws\",\"gov.ws\",\"edu.ws\",\"yt\",\"امارات\",\"հայ\",\"বাংলা\",\"бг\",\"бел\",\"中国\",\"中國\",\"الجزائر\",\"مصر\",\"ею\",\"ευ\",\"موريتانيا\",\"გე\",\"ελ\",\"香港\",\"公司.香港\",\"教育.香港\",\"政府.香港\",\"個人.香港\",\"網絡.香港\",\"組織.香港\",\"ಭಾರತ\",\"ଭାରତ\",\"ভাৰত\",\"भारतम्\",\"भारोत\",\"ڀارت\",\"ഭാരതം\",\"भारत\",\"بارت\",\"بھارت\",\"భారత్\",\"ભારત\",\"ਭਾਰਤ\",\"ভারত\",\"இந்தியா\",\"ایران\",\"ايران\",\"عراق\",\"الاردن\",\"한국\",\"қаз\",\"ලංකා\",\"இலங்கை\",\"المغرب\",\"мкд\",\"мон\",\"澳門\",\"澳门\",\"مليسيا\",\"عمان\",\"پاکستان\",\"پاكستان\",\"فلسطين\",\"срб\",\"пр.срб\",\"орг.срб\",\"обр.срб\",\"од.срб\",\"упр.срб\",\"ак.срб\",\"рф\",\"قطر\",\"السعودية\",\"السعودیة\",\"السعودیۃ\",\"السعوديه\",\"سودان\",\"新加坡\",\"சிங்கப்பூர்\",\"سورية\",\"سوريا\",\"ไทย\",\"ศึกษา.ไทย\",\"ธุรกิจ.ไทย\",\"รัฐบาล.ไทย\",\"ทหาร.ไทย\",\"เน็ต.ไทย\",\"องค์กร.ไทย\",\"تونس\",\"台灣\",\"台湾\",\"臺灣\",\"укр\",\"اليمن\",\"xxx\",\"*.ye\",\"ac.za\",\"agric.za\",\"alt.za\",\"co.za\",\"edu.za\",\"gov.za\",\"grondar.za\",\"law.za\",\"mil.za\",\"net.za\",\"ngo.za\",\"nic.za\",\"nis.za\",\"nom.za\",\"org.za\",\"school.za\",\"tm.za\",\"web.za\",\"zm\",\"ac.zm\",\"biz.zm\",\"co.zm\",\"com.zm\",\"edu.zm\",\"gov.zm\",\"info.zm\",\"mil.zm\",\"net.zm\",\"org.zm\",\"sch.zm\",\"zw\",\"ac.zw\",\"co.zw\",\"gov.zw\",\"mil.zw\",\"org.zw\",\"aaa\",\"aarp\",\"abarth\",\"abb\",\"abbott\",\"abbvie\",\"abc\",\"able\",\"abogado\",\"abudhabi\",\"academy\",\"accenture\",\"accountant\",\"accountants\",\"aco\",\"actor\",\"adac\",\"ads\",\"adult\",\"aeg\",\"aetna\",\"afamilycompany\",\"afl\",\"africa\",\"agakhan\",\"agency\",\"aig\",\"aigo\",\"airbus\",\"airforce\",\"airtel\",\"akdn\",\"alfaromeo\",\"alibaba\",\"alipay\",\"allfinanz\",\"allstate\",\"ally\",\"alsace\",\"alstom\",\"amazon\",\"americanexpress\",\"americanfamily\",\"amex\",\"amfam\",\"amica\",\"amsterdam\",\"analytics\",\"android\",\"anquan\",\"anz\",\"aol\",\"apartments\",\"app\",\"apple\",\"aquarelle\",\"arab\",\"aramco\",\"archi\",\"army\",\"art\",\"arte\",\"asda\",\"associates\",\"athleta\",\"attorney\",\"auction\",\"audi\",\"audible\",\"audio\",\"auspost\",\"author\",\"auto\",\"autos\",\"avianca\",\"aws\",\"axa\",\"azure\",\"baby\",\"baidu\",\"banamex\",\"bananarepublic\",\"band\",\"bank\",\"bar\",\"barcelona\",\"barclaycard\",\"barclays\",\"barefoot\",\"bargains\",\"baseball\",\"basketball\",\"bauhaus\",\"bayern\",\"bbc\",\"bbt\",\"bbva\",\"bcg\",\"bcn\",\"beats\",\"beauty\",\"beer\",\"bentley\",\"berlin\",\"best\",\"bestbuy\",\"bet\",\"bharti\",\"bible\",\"bid\",\"bike\",\"bing\",\"bingo\",\"bio\",\"black\",\"blackfriday\",\"blockbuster\",\"blog\",\"bloomberg\",\"blue\",\"bms\",\"bmw\",\"bnpparibas\",\"boats\",\"boehringer\",\"bofa\",\"bom\",\"bond\",\"boo\",\"book\",\"booking\",\"bosch\",\"bostik\",\"boston\",\"bot\",\"boutique\",\"box\",\"bradesco\",\"bridgestone\",\"broadway\",\"broker\",\"brother\",\"brussels\",\"budapest\",\"bugatti\",\"build\",\"builders\",\"business\",\"buy\",\"buzz\",\"bzh\",\"cab\",\"cafe\",\"cal\",\"call\",\"calvinklein\",\"cam\",\"camera\",\"camp\",\"cancerresearch\",\"canon\",\"capetown\",\"capital\",\"capitalone\",\"car\",\"caravan\",\"cards\",\"care\",\"career\",\"careers\",\"cars\",\"casa\",\"case\",\"caseih\",\"cash\",\"casino\",\"catering\",\"catholic\",\"cba\",\"cbn\",\"cbre\",\"cbs\",\"ceb\",\"center\",\"ceo\",\"cern\",\"cfa\",\"cfd\",\"chanel\",\"channel\",\"charity\",\"chase\",\"chat\",\"cheap\",\"chintai\",\"christmas\",\"chrome\",\"church\",\"cipriani\",\"circle\",\"cisco\",\"citadel\",\"citi\",\"citic\",\"city\",\"cityeats\",\"claims\",\"cleaning\",\"click\",\"clinic\",\"clinique\",\"clothing\",\"cloud\",\"club\",\"clubmed\",\"coach\",\"codes\",\"coffee\",\"college\",\"cologne\",\"comcast\",\"commbank\",\"community\",\"company\",\"compare\",\"computer\",\"comsec\",\"condos\",\"construction\",\"consulting\",\"contact\",\"contractors\",\"cooking\",\"cookingchannel\",\"cool\",\"corsica\",\"country\",\"coupon\",\"coupons\",\"courses\",\"cpa\",\"credit\",\"creditcard\",\"creditunion\",\"cricket\",\"crown\",\"crs\",\"cruise\",\"cruises\",\"csc\",\"cuisinella\",\"cymru\",\"cyou\",\"dabur\",\"dad\",\"dance\",\"data\",\"date\",\"dating\",\"datsun\",\"day\",\"dclk\",\"dds\",\"deal\",\"dealer\",\"deals\",\"degree\",\"delivery\",\"dell\",\"deloitte\",\"delta\",\"democrat\",\"dental\",\"dentist\",\"desi\",\"design\",\"dev\",\"dhl\",\"diamonds\",\"diet\",\"digital\",\"direct\",\"directory\",\"discount\",\"discover\",\"dish\",\"diy\",\"dnp\",\"docs\",\"doctor\",\"dog\",\"domains\",\"dot\",\"download\",\"drive\",\"dtv\",\"dubai\",\"duck\",\"dunlop\",\"dupont\",\"durban\",\"dvag\",\"dvr\",\"earth\",\"eat\",\"eco\",\"edeka\",\"education\",\"email\",\"emerck\",\"energy\",\"engineer\",\"engineering\",\"enterprises\",\"epson\",\"equipment\",\"ericsson\",\"erni\",\"esq\",\"estate\",\"esurance\",\"etisalat\",\"eurovision\",\"eus\",\"events\",\"exchange\",\"expert\",\"exposed\",\"express\",\"extraspace\",\"fage\",\"fail\",\"fairwinds\",\"faith\",\"family\",\"fan\",\"fans\",\"farm\",\"farmers\",\"fashion\",\"fast\",\"fedex\",\"feedback\",\"ferrari\",\"ferrero\",\"fiat\",\"fidelity\",\"fido\",\"film\",\"final\",\"finance\",\"financial\",\"fire\",\"firestone\",\"firmdale\",\"fish\",\"fishing\",\"fit\",\"fitness\",\"flickr\",\"flights\",\"flir\",\"florist\",\"flowers\",\"fly\",\"foo\",\"food\",\"foodnetwork\",\"football\",\"ford\",\"forex\",\"forsale\",\"forum\",\"foundation\",\"fox\",\"free\",\"fresenius\",\"frl\",\"frogans\",\"frontdoor\",\"frontier\",\"ftr\",\"fujitsu\",\"fujixerox\",\"fun\",\"fund\",\"furniture\",\"futbol\",\"fyi\",\"gal\",\"gallery\",\"gallo\",\"gallup\",\"game\",\"games\",\"gap\",\"garden\",\"gay\",\"gbiz\",\"gdn\",\"gea\",\"gent\",\"genting\",\"george\",\"ggee\",\"gift\",\"gifts\",\"gives\",\"giving\",\"glade\",\"glass\",\"gle\",\"global\",\"globo\",\"gmail\",\"gmbh\",\"gmo\",\"gmx\",\"godaddy\",\"gold\",\"goldpoint\",\"golf\",\"goo\",\"goodyear\",\"goog\",\"google\",\"gop\",\"got\",\"grainger\",\"graphics\",\"gratis\",\"green\",\"gripe\",\"grocery\",\"group\",\"guardian\",\"gucci\",\"guge\",\"guide\",\"guitars\",\"guru\",\"hair\",\"hamburg\",\"hangout\",\"haus\",\"hbo\",\"hdfc\",\"hdfcbank\",\"health\",\"healthcare\",\"help\",\"helsinki\",\"here\",\"hermes\",\"hgtv\",\"hiphop\",\"hisamitsu\",\"hitachi\",\"hiv\",\"hkt\",\"hockey\",\"holdings\",\"holiday\",\"homedepot\",\"homegoods\",\"homes\",\"homesense\",\"honda\",\"horse\",\"hospital\",\"host\",\"hosting\",\"hot\",\"hoteles\",\"hotels\",\"hotmail\",\"house\",\"how\",\"hsbc\",\"hughes\",\"hyatt\",\"hyundai\",\"ibm\",\"icbc\",\"ice\",\"icu\",\"ieee\",\"ifm\",\"ikano\",\"imamat\",\"imdb\",\"immo\",\"immobilien\",\"inc\",\"industries\",\"infiniti\",\"ing\",\"ink\",\"institute\",\"insurance\",\"insure\",\"intel\",\"international\",\"intuit\",\"investments\",\"ipiranga\",\"irish\",\"ismaili\",\"ist\",\"istanbul\",\"itau\",\"itv\",\"iveco\",\"jaguar\",\"java\",\"jcb\",\"jcp\",\"jeep\",\"jetzt\",\"jewelry\",\"jio\",\"jll\",\"jmp\",\"jnj\",\"joburg\",\"jot\",\"joy\",\"jpmorgan\",\"jprs\",\"juegos\",\"juniper\",\"kaufen\",\"kddi\",\"kerryhotels\",\"kerrylogistics\",\"kerryproperties\",\"kfh\",\"kia\",\"kim\",\"kinder\",\"kindle\",\"kitchen\",\"kiwi\",\"koeln\",\"komatsu\",\"kosher\",\"kpmg\",\"kpn\",\"krd\",\"kred\",\"kuokgroup\",\"kyoto\",\"lacaixa\",\"lamborghini\",\"lamer\",\"lancaster\",\"lancia\",\"land\",\"landrover\",\"lanxess\",\"lasalle\",\"lat\",\"latino\",\"latrobe\",\"law\",\"lawyer\",\"lds\",\"lease\",\"leclerc\",\"lefrak\",\"legal\",\"lego\",\"lexus\",\"lgbt\",\"lidl\",\"life\",\"lifeinsurance\",\"lifestyle\",\"lighting\",\"like\",\"lilly\",\"limited\",\"limo\",\"lincoln\",\"linde\",\"link\",\"lipsy\",\"live\",\"living\",\"lixil\",\"llc\",\"llp\",\"loan\",\"loans\",\"locker\",\"locus\",\"loft\",\"lol\",\"london\",\"lotte\",\"lotto\",\"love\",\"lpl\",\"lplfinancial\",\"ltd\",\"ltda\",\"lundbeck\",\"lupin\",\"luxe\",\"luxury\",\"macys\",\"madrid\",\"maif\",\"maison\",\"makeup\",\"man\",\"management\",\"mango\",\"map\",\"market\",\"marketing\",\"markets\",\"marriott\",\"marshalls\",\"maserati\",\"mattel\",\"mba\",\"mckinsey\",\"med\",\"media\",\"meet\",\"melbourne\",\"meme\",\"memorial\",\"men\",\"menu\",\"merckmsd\",\"metlife\",\"miami\",\"microsoft\",\"mini\",\"mint\",\"mit\",\"mitsubishi\",\"mlb\",\"mls\",\"mma\",\"mobile\",\"moda\",\"moe\",\"moi\",\"mom\",\"monash\",\"money\",\"monster\",\"mormon\",\"mortgage\",\"moscow\",\"moto\",\"motorcycles\",\"mov\",\"movie\",\"msd\",\"mtn\",\"mtr\",\"mutual\",\"nab\",\"nadex\",\"nagoya\",\"nationwide\",\"natura\",\"navy\",\"nba\",\"nec\",\"netbank\",\"netflix\",\"network\",\"neustar\",\"new\",\"newholland\",\"news\",\"next\",\"nextdirect\",\"nexus\",\"nfl\",\"ngo\",\"nhk\",\"nico\",\"nike\",\"nikon\",\"ninja\",\"nissan\",\"nissay\",\"nokia\",\"northwesternmutual\",\"norton\",\"now\",\"nowruz\",\"nowtv\",\"nra\",\"nrw\",\"ntt\",\"nyc\",\"obi\",\"observer\",\"off\",\"office\",\"okinawa\",\"olayan\",\"olayangroup\",\"oldnavy\",\"ollo\",\"omega\",\"one\",\"ong\",\"onl\",\"online\",\"onyourside\",\"ooo\",\"open\",\"oracle\",\"orange\",\"organic\",\"origins\",\"osaka\",\"otsuka\",\"ott\",\"ovh\",\"page\",\"panasonic\",\"paris\",\"pars\",\"partners\",\"parts\",\"party\",\"passagens\",\"pay\",\"pccw\",\"pet\",\"pfizer\",\"pharmacy\",\"phd\",\"philips\",\"phone\",\"photo\",\"photography\",\"photos\",\"physio\",\"pics\",\"pictet\",\"pictures\",\"pid\",\"pin\",\"ping\",\"pink\",\"pioneer\",\"pizza\",\"place\",\"play\",\"playstation\",\"plumbing\",\"plus\",\"pnc\",\"pohl\",\"poker\",\"politie\",\"porn\",\"pramerica\",\"praxi\",\"press\",\"prime\",\"prod\",\"productions\",\"prof\",\"progressive\",\"promo\",\"properties\",\"property\",\"protection\",\"pru\",\"prudential\",\"pub\",\"pwc\",\"qpon\",\"quebec\",\"quest\",\"qvc\",\"racing\",\"radio\",\"raid\",\"read\",\"realestate\",\"realtor\",\"realty\",\"recipes\",\"red\",\"redstone\",\"redumbrella\",\"rehab\",\"reise\",\"reisen\",\"reit\",\"reliance\",\"ren\",\"rent\",\"rentals\",\"repair\",\"report\",\"republican\",\"rest\",\"restaurant\",\"review\",\"reviews\",\"rexroth\",\"rich\",\"richardli\",\"ricoh\",\"rightathome\",\"ril\",\"rio\",\"rip\",\"rmit\",\"rocher\",\"rocks\",\"rodeo\",\"rogers\",\"room\",\"rsvp\",\"rugby\",\"ruhr\",\"run\",\"rwe\",\"ryukyu\",\"saarland\",\"safe\",\"safety\",\"sakura\",\"sale\",\"salon\",\"samsclub\",\"samsung\",\"sandvik\",\"sandvikcoromant\",\"sanofi\",\"sap\",\"sarl\",\"sas\",\"save\",\"saxo\",\"sbi\",\"sbs\",\"sca\",\"scb\",\"schaeffler\",\"schmidt\",\"scholarships\",\"school\",\"schule\",\"schwarz\",\"science\",\"scjohnson\",\"scor\",\"scot\",\"search\",\"seat\",\"secure\",\"security\",\"seek\",\"select\",\"sener\",\"services\",\"ses\",\"seven\",\"sew\",\"sex\",\"sexy\",\"sfr\",\"shangrila\",\"sharp\",\"shaw\",\"shell\",\"shia\",\"shiksha\",\"shoes\",\"shop\",\"shopping\",\"shouji\",\"show\",\"showtime\",\"shriram\",\"silk\",\"sina\",\"singles\",\"site\",\"ski\",\"skin\",\"sky\",\"skype\",\"sling\",\"smart\",\"smile\",\"sncf\",\"soccer\",\"social\",\"softbank\",\"software\",\"sohu\",\"solar\",\"solutions\",\"song\",\"sony\",\"soy\",\"spa\",\"space\",\"sport\",\"spot\",\"spreadbetting\",\"srl\",\"stada\",\"staples\",\"star\",\"statebank\",\"statefarm\",\"stc\",\"stcgroup\",\"stockholm\",\"storage\",\"store\",\"stream\",\"studio\",\"study\",\"style\",\"sucks\",\"supplies\",\"supply\",\"support\",\"surf\",\"surgery\",\"suzuki\",\"swatch\",\"swiftcover\",\"swiss\",\"sydney\",\"symantec\",\"systems\",\"tab\",\"taipei\",\"talk\",\"taobao\",\"target\",\"tatamotors\",\"tatar\",\"tattoo\",\"tax\",\"taxi\",\"tci\",\"tdk\",\"team\",\"tech\",\"technology\",\"temasek\",\"tennis\",\"teva\",\"thd\",\"theater\",\"theatre\",\"tiaa\",\"tickets\",\"tienda\",\"tiffany\",\"tips\",\"tires\",\"tirol\",\"tjmaxx\",\"tjx\",\"tkmaxx\",\"tmall\",\"today\",\"tokyo\",\"tools\",\"top\",\"toray\",\"toshiba\",\"total\",\"tours\",\"town\",\"toyota\",\"toys\",\"trade\",\"trading\",\"training\",\"travel\",\"travelchannel\",\"travelers\",\"travelersinsurance\",\"trust\",\"trv\",\"tube\",\"tui\",\"tunes\",\"tushu\",\"tvs\",\"ubank\",\"ubs\",\"unicom\",\"university\",\"uno\",\"uol\",\"ups\",\"vacations\",\"vana\",\"vanguard\",\"vegas\",\"ventures\",\"verisign\",\"versicherung\",\"vet\",\"viajes\",\"video\",\"vig\",\"viking\",\"villas\",\"vin\",\"vip\",\"virgin\",\"visa\",\"vision\",\"viva\",\"vivo\",\"vlaanderen\",\"vodka\",\"volkswagen\",\"volvo\",\"vote\",\"voting\",\"voto\",\"voyage\",\"vuelos\",\"wales\",\"walmart\",\"walter\",\"wang\",\"wanggou\",\"watch\",\"watches\",\"weather\",\"weatherchannel\",\"webcam\",\"weber\",\"website\",\"wed\",\"wedding\",\"weibo\",\"weir\",\"whoswho\",\"wien\",\"wiki\",\"williamhill\",\"win\",\"windows\",\"wine\",\"winners\",\"wme\",\"wolterskluwer\",\"woodside\",\"work\",\"works\",\"world\",\"wow\",\"wtc\",\"wtf\",\"xbox\",\"xerox\",\"xfinity\",\"xihuan\",\"xin\",\"कॉम\",\"セール\",\"佛山\",\"慈善\",\"集团\",\"在线\",\"大众汽车\",\"点看\",\"คอม\",\"八卦\",\"موقع\",\"公益\",\"公司\",\"香格里拉\",\"网站\",\"移动\",\"我爱你\",\"москва\",\"католик\",\"онлайн\",\"сайт\",\"联通\",\"קום\",\"时尚\",\"微博\",\"淡马锡\",\"ファッション\",\"орг\",\"नेट\",\"ストア\",\"アマゾン\",\"삼성\",\"商标\",\"商店\",\"商城\",\"дети\",\"ポイント\",\"新闻\",\"工行\",\"家電\",\"كوم\",\"中文网\",\"中信\",\"娱乐\",\"谷歌\",\"電訊盈科\",\"购物\",\"クラウド\",\"通販\",\"网店\",\"संगठन\",\"餐厅\",\"网络\",\"ком\",\"亚马逊\",\"诺基亚\",\"食品\",\"飞利浦\",\"手表\",\"手机\",\"ارامكو\",\"العليان\",\"اتصالات\",\"بازار\",\"ابوظبي\",\"كاثوليك\",\"همراه\",\"닷컴\",\"政府\",\"شبكة\",\"بيتك\",\"عرب\",\"机构\",\"组织机构\",\"健康\",\"招聘\",\"рус\",\"珠宝\",\"大拿\",\"みんな\",\"グーグル\",\"世界\",\"書籍\",\"网址\",\"닷넷\",\"コム\",\"天主教\",\"游戏\",\"vermögensberater\",\"vermögensberatung\",\"企业\",\"信息\",\"嘉里大酒店\",\"嘉里\",\"广东\",\"政务\",\"xyz\",\"yachts\",\"yahoo\",\"yamaxun\",\"yandex\",\"yodobashi\",\"yoga\",\"yokohama\",\"you\",\"youtube\",\"yun\",\"zappos\",\"zara\",\"zero\",\"zip\",\"zone\",\"zuerich\",\"cc.ua\",\"inf.ua\",\"ltd.ua\",\"adobeaemcloud.com\",\"adobeaemcloud.net\",\"*.dev.adobeaemcloud.com\",\"beep.pl\",\"barsy.ca\",\"*.compute.estate\",\"*.alces.network\",\"altervista.org\",\"alwaysdata.net\",\"cloudfront.net\",\"*.compute.amazonaws.com\",\"*.compute-1.amazonaws.com\",\"*.compute.amazonaws.com.cn\",\"us-east-1.amazonaws.com\",\"cn-north-1.eb.amazonaws.com.cn\",\"cn-northwest-1.eb.amazonaws.com.cn\",\"elasticbeanstalk.com\",\"ap-northeast-1.elasticbeanstalk.com\",\"ap-northeast-2.elasticbeanstalk.com\",\"ap-northeast-3.elasticbeanstalk.com\",\"ap-south-1.elasticbeanstalk.com\",\"ap-southeast-1.elasticbeanstalk.com\",\"ap-southeast-2.elasticbeanstalk.com\",\"ca-central-1.elasticbeanstalk.com\",\"eu-central-1.elasticbeanstalk.com\",\"eu-west-1.elasticbeanstalk.com\",\"eu-west-2.elasticbeanstalk.com\",\"eu-west-3.elasticbeanstalk.com\",\"sa-east-1.elasticbeanstalk.com\",\"us-east-1.elasticbeanstalk.com\",\"us-east-2.elasticbeanstalk.com\",\"us-gov-west-1.elasticbeanstalk.com\",\"us-west-1.elasticbeanstalk.com\",\"us-west-2.elasticbeanstalk.com\",\"*.elb.amazonaws.com\",\"*.elb.amazonaws.com.cn\",\"s3.amazonaws.com\",\"s3-ap-northeast-1.amazonaws.com\",\"s3-ap-northeast-2.amazonaws.com\",\"s3-ap-south-1.amazonaws.com\",\"s3-ap-southeast-1.amazonaws.com\",\"s3-ap-southeast-2.amazonaws.com\",\"s3-ca-central-1.amazonaws.com\",\"s3-eu-central-1.amazonaws.com\",\"s3-eu-west-1.amazonaws.com\",\"s3-eu-west-2.amazonaws.com\",\"s3-eu-west-3.amazonaws.com\",\"s3-external-1.amazonaws.com\",\"s3-fips-us-gov-west-1.amazonaws.com\",\"s3-sa-east-1.amazonaws.com\",\"s3-us-gov-west-1.amazonaws.com\",\"s3-us-east-2.amazonaws.com\",\"s3-us-west-1.amazonaws.com\",\"s3-us-west-2.amazonaws.com\",\"s3.ap-northeast-2.amazonaws.com\",\"s3.ap-south-1.amazonaws.com\",\"s3.cn-north-1.amazonaws.com.cn\",\"s3.ca-central-1.amazonaws.com\",\"s3.eu-central-1.amazonaws.com\",\"s3.eu-west-2.amazonaws.com\",\"s3.eu-west-3.amazonaws.com\",\"s3.us-east-2.amazonaws.com\",\"s3.dualstack.ap-northeast-1.amazonaws.com\",\"s3.dualstack.ap-northeast-2.amazonaws.com\",\"s3.dualstack.ap-south-1.amazonaws.com\",\"s3.dualstack.ap-southeast-1.amazonaws.com\",\"s3.dualstack.ap-southeast-2.amazonaws.com\",\"s3.dualstack.ca-central-1.amazonaws.com\",\"s3.dualstack.eu-central-1.amazonaws.com\",\"s3.dualstack.eu-west-1.amazonaws.com\",\"s3.dualstack.eu-west-2.amazonaws.com\",\"s3.dualstack.eu-west-3.amazonaws.com\",\"s3.dualstack.sa-east-1.amazonaws.com\",\"s3.dualstack.us-east-1.amazonaws.com\",\"s3.dualstack.us-east-2.amazonaws.com\",\"s3-website-us-east-1.amazonaws.com\",\"s3-website-us-west-1.amazonaws.com\",\"s3-website-us-west-2.amazonaws.com\",\"s3-website-ap-northeast-1.amazonaws.com\",\"s3-website-ap-southeast-1.amazonaws.com\",\"s3-website-ap-southeast-2.amazonaws.com\",\"s3-website-eu-west-1.amazonaws.com\",\"s3-website-sa-east-1.amazonaws.com\",\"s3-website.ap-northeast-2.amazonaws.com\",\"s3-website.ap-south-1.amazonaws.com\",\"s3-website.ca-central-1.amazonaws.com\",\"s3-website.eu-central-1.amazonaws.com\",\"s3-website.eu-west-2.amazonaws.com\",\"s3-website.eu-west-3.amazonaws.com\",\"s3-website.us-east-2.amazonaws.com\",\"amsw.nl\",\"t3l3p0rt.net\",\"tele.amune.org\",\"apigee.io\",\"on-aptible.com\",\"user.aseinet.ne.jp\",\"gv.vc\",\"d.gv.vc\",\"user.party.eus\",\"pimienta.org\",\"poivron.org\",\"potager.org\",\"sweetpepper.org\",\"myasustor.com\",\"myfritz.net\",\"*.awdev.ca\",\"*.advisor.ws\",\"b-data.io\",\"backplaneapp.io\",\"balena-devices.com\",\"app.banzaicloud.io\",\"betainabox.com\",\"bnr.la\",\"blackbaudcdn.net\",\"boomla.net\",\"boxfuse.io\",\"square7.ch\",\"bplaced.com\",\"bplaced.de\",\"square7.de\",\"bplaced.net\",\"square7.net\",\"browsersafetymark.io\",\"uk0.bigv.io\",\"dh.bytemark.co.uk\",\"vm.bytemark.co.uk\",\"mycd.eu\",\"carrd.co\",\"crd.co\",\"uwu.ai\",\"ae.org\",\"ar.com\",\"br.com\",\"cn.com\",\"com.de\",\"com.se\",\"de.com\",\"eu.com\",\"gb.com\",\"gb.net\",\"hu.com\",\"hu.net\",\"jp.net\",\"jpn.com\",\"kr.com\",\"mex.com\",\"no.com\",\"qc.com\",\"ru.com\",\"sa.com\",\"se.net\",\"uk.com\",\"uk.net\",\"us.com\",\"uy.com\",\"za.bz\",\"za.com\",\"africa.com\",\"gr.com\",\"in.net\",\"us.org\",\"co.com\",\"c.la\",\"certmgr.org\",\"xenapponazure.com\",\"discourse.group\",\"discourse.team\",\"virtueeldomein.nl\",\"cleverapps.io\",\"*.lcl.dev\",\"*.stg.dev\",\"c66.me\",\"cloud66.ws\",\"cloud66.zone\",\"jdevcloud.com\",\"wpdevcloud.com\",\"cloudaccess.host\",\"freesite.host\",\"cloudaccess.net\",\"cloudcontrolled.com\",\"cloudcontrolapp.com\",\"cloudera.site\",\"trycloudflare.com\",\"workers.dev\",\"wnext.app\",\"co.ca\",\"*.otap.co\",\"co.cz\",\"c.cdn77.org\",\"cdn77-ssl.net\",\"r.cdn77.net\",\"rsc.cdn77.org\",\"ssl.origin.cdn77-secure.org\",\"cloudns.asia\",\"cloudns.biz\",\"cloudns.club\",\"cloudns.cc\",\"cloudns.eu\",\"cloudns.in\",\"cloudns.info\",\"cloudns.org\",\"cloudns.pro\",\"cloudns.pw\",\"cloudns.us\",\"cloudeity.net\",\"cnpy.gdn\",\"co.nl\",\"co.no\",\"webhosting.be\",\"hosting-cluster.nl\",\"ac.ru\",\"edu.ru\",\"gov.ru\",\"int.ru\",\"mil.ru\",\"test.ru\",\"dyn.cosidns.de\",\"dynamisches-dns.de\",\"dnsupdater.de\",\"internet-dns.de\",\"l-o-g-i-n.de\",\"dynamic-dns.info\",\"feste-ip.net\",\"knx-server.net\",\"static-access.net\",\"realm.cz\",\"*.cryptonomic.net\",\"cupcake.is\",\"*.customer-oci.com\",\"*.oci.customer-oci.com\",\"*.ocp.customer-oci.com\",\"*.ocs.customer-oci.com\",\"cyon.link\",\"cyon.site\",\"daplie.me\",\"localhost.daplie.me\",\"dattolocal.com\",\"dattorelay.com\",\"dattoweb.com\",\"mydatto.com\",\"dattolocal.net\",\"mydatto.net\",\"biz.dk\",\"co.dk\",\"firm.dk\",\"reg.dk\",\"store.dk\",\"*.dapps.earth\",\"*.bzz.dapps.earth\",\"builtwithdark.com\",\"edgestack.me\",\"debian.net\",\"dedyn.io\",\"dnshome.de\",\"online.th\",\"shop.th\",\"drayddns.com\",\"dreamhosters.com\",\"mydrobo.com\",\"drud.io\",\"drud.us\",\"duckdns.org\",\"dy.fi\",\"tunk.org\",\"dyndns-at-home.com\",\"dyndns-at-work.com\",\"dyndns-blog.com\",\"dyndns-free.com\",\"dyndns-home.com\",\"dyndns-ip.com\",\"dyndns-mail.com\",\"dyndns-office.com\",\"dyndns-pics.com\",\"dyndns-remote.com\",\"dyndns-server.com\",\"dyndns-web.com\",\"dyndns-wiki.com\",\"dyndns-work.com\",\"dyndns.biz\",\"dyndns.info\",\"dyndns.org\",\"dyndns.tv\",\"at-band-camp.net\",\"ath.cx\",\"barrel-of-knowledge.info\",\"barrell-of-knowledge.info\",\"better-than.tv\",\"blogdns.com\",\"blogdns.net\",\"blogdns.org\",\"blogsite.org\",\"boldlygoingnowhere.org\",\"broke-it.net\",\"buyshouses.net\",\"cechire.com\",\"dnsalias.com\",\"dnsalias.net\",\"dnsalias.org\",\"dnsdojo.com\",\"dnsdojo.net\",\"dnsdojo.org\",\"does-it.net\",\"doesntexist.com\",\"doesntexist.org\",\"dontexist.com\",\"dontexist.net\",\"dontexist.org\",\"doomdns.com\",\"doomdns.org\",\"dvrdns.org\",\"dyn-o-saur.com\",\"dynalias.com\",\"dynalias.net\",\"dynalias.org\",\"dynathome.net\",\"dyndns.ws\",\"endofinternet.net\",\"endofinternet.org\",\"endoftheinternet.org\",\"est-a-la-maison.com\",\"est-a-la-masion.com\",\"est-le-patron.com\",\"est-mon-blogueur.com\",\"for-better.biz\",\"for-more.biz\",\"for-our.info\",\"for-some.biz\",\"for-the.biz\",\"forgot.her.name\",\"forgot.his.name\",\"from-ak.com\",\"from-al.com\",\"from-ar.com\",\"from-az.net\",\"from-ca.com\",\"from-co.net\",\"from-ct.com\",\"from-dc.com\",\"from-de.com\",\"from-fl.com\",\"from-ga.com\",\"from-hi.com\",\"from-ia.com\",\"from-id.com\",\"from-il.com\",\"from-in.com\",\"from-ks.com\",\"from-ky.com\",\"from-la.net\",\"from-ma.com\",\"from-md.com\",\"from-me.org\",\"from-mi.com\",\"from-mn.com\",\"from-mo.com\",\"from-ms.com\",\"from-mt.com\",\"from-nc.com\",\"from-nd.com\",\"from-ne.com\",\"from-nh.com\",\"from-nj.com\",\"from-nm.com\",\"from-nv.com\",\"from-ny.net\",\"from-oh.com\",\"from-ok.com\",\"from-or.com\",\"from-pa.com\",\"from-pr.com\",\"from-ri.com\",\"from-sc.com\",\"from-sd.com\",\"from-tn.com\",\"from-tx.com\",\"from-ut.com\",\"from-va.com\",\"from-vt.com\",\"from-wa.com\",\"from-wi.com\",\"from-wv.com\",\"from-wy.com\",\"ftpaccess.cc\",\"fuettertdasnetz.de\",\"game-host.org\",\"game-server.cc\",\"getmyip.com\",\"gets-it.net\",\"go.dyndns.org\",\"gotdns.com\",\"gotdns.org\",\"groks-the.info\",\"groks-this.info\",\"ham-radio-op.net\",\"here-for-more.info\",\"hobby-site.com\",\"hobby-site.org\",\"home.dyndns.org\",\"homedns.org\",\"homeftp.net\",\"homeftp.org\",\"homeip.net\",\"homelinux.com\",\"homelinux.net\",\"homelinux.org\",\"homeunix.com\",\"homeunix.net\",\"homeunix.org\",\"iamallama.com\",\"in-the-band.net\",\"is-a-anarchist.com\",\"is-a-blogger.com\",\"is-a-bookkeeper.com\",\"is-a-bruinsfan.org\",\"is-a-bulls-fan.com\",\"is-a-candidate.org\",\"is-a-caterer.com\",\"is-a-celticsfan.org\",\"is-a-chef.com\",\"is-a-chef.net\",\"is-a-chef.org\",\"is-a-conservative.com\",\"is-a-cpa.com\",\"is-a-cubicle-slave.com\",\"is-a-democrat.com\",\"is-a-designer.com\",\"is-a-doctor.com\",\"is-a-financialadvisor.com\",\"is-a-geek.com\",\"is-a-geek.net\",\"is-a-geek.org\",\"is-a-green.com\",\"is-a-guru.com\",\"is-a-hard-worker.com\",\"is-a-hunter.com\",\"is-a-knight.org\",\"is-a-landscaper.com\",\"is-a-lawyer.com\",\"is-a-liberal.com\",\"is-a-libertarian.com\",\"is-a-linux-user.org\",\"is-a-llama.com\",\"is-a-musician.com\",\"is-a-nascarfan.com\",\"is-a-nurse.com\",\"is-a-painter.com\",\"is-a-patsfan.org\",\"is-a-personaltrainer.com\",\"is-a-photographer.com\",\"is-a-player.com\",\"is-a-republican.com\",\"is-a-rockstar.com\",\"is-a-socialist.com\",\"is-a-soxfan.org\",\"is-a-student.com\",\"is-a-teacher.com\",\"is-a-techie.com\",\"is-a-therapist.com\",\"is-an-accountant.com\",\"is-an-actor.com\",\"is-an-actress.com\",\"is-an-anarchist.com\",\"is-an-artist.com\",\"is-an-engineer.com\",\"is-an-entertainer.com\",\"is-by.us\",\"is-certified.com\",\"is-found.org\",\"is-gone.com\",\"is-into-anime.com\",\"is-into-cars.com\",\"is-into-cartoons.com\",\"is-into-games.com\",\"is-leet.com\",\"is-lost.org\",\"is-not-certified.com\",\"is-saved.org\",\"is-slick.com\",\"is-uberleet.com\",\"is-very-bad.org\",\"is-very-evil.org\",\"is-very-good.org\",\"is-very-nice.org\",\"is-very-sweet.org\",\"is-with-theband.com\",\"isa-geek.com\",\"isa-geek.net\",\"isa-geek.org\",\"isa-hockeynut.com\",\"issmarterthanyou.com\",\"isteingeek.de\",\"istmein.de\",\"kicks-ass.net\",\"kicks-ass.org\",\"knowsitall.info\",\"land-4-sale.us\",\"lebtimnetz.de\",\"leitungsen.de\",\"likes-pie.com\",\"likescandy.com\",\"merseine.nu\",\"mine.nu\",\"misconfused.org\",\"mypets.ws\",\"myphotos.cc\",\"neat-url.com\",\"office-on-the.net\",\"on-the-web.tv\",\"podzone.net\",\"podzone.org\",\"readmyblog.org\",\"saves-the-whales.com\",\"scrapper-site.net\",\"scrapping.cc\",\"selfip.biz\",\"selfip.com\",\"selfip.info\",\"selfip.net\",\"selfip.org\",\"sells-for-less.com\",\"sells-for-u.com\",\"sells-it.net\",\"sellsyourhome.org\",\"servebbs.com\",\"servebbs.net\",\"servebbs.org\",\"serveftp.net\",\"serveftp.org\",\"servegame.org\",\"shacknet.nu\",\"simple-url.com\",\"space-to-rent.com\",\"stuff-4-sale.org\",\"stuff-4-sale.us\",\"teaches-yoga.com\",\"thruhere.net\",\"traeumtgerade.de\",\"webhop.biz\",\"webhop.info\",\"webhop.net\",\"webhop.org\",\"worse-than.tv\",\"writesthisblog.com\",\"ddnss.de\",\"dyn.ddnss.de\",\"dyndns.ddnss.de\",\"dyndns1.de\",\"dyn-ip24.de\",\"home-webserver.de\",\"dyn.home-webserver.de\",\"myhome-server.de\",\"ddnss.org\",\"definima.net\",\"definima.io\",\"bci.dnstrace.pro\",\"ddnsfree.com\",\"ddnsgeek.com\",\"giize.com\",\"gleeze.com\",\"kozow.com\",\"loseyourip.com\",\"ooguy.com\",\"theworkpc.com\",\"casacam.net\",\"dynu.net\",\"accesscam.org\",\"camdvr.org\",\"freeddns.org\",\"mywire.org\",\"webredirect.org\",\"myddns.rocks\",\"blogsite.xyz\",\"dynv6.net\",\"e4.cz\",\"en-root.fr\",\"mytuleap.com\",\"onred.one\",\"staging.onred.one\",\"enonic.io\",\"customer.enonic.io\",\"eu.org\",\"al.eu.org\",\"asso.eu.org\",\"at.eu.org\",\"au.eu.org\",\"be.eu.org\",\"bg.eu.org\",\"ca.eu.org\",\"cd.eu.org\",\"ch.eu.org\",\"cn.eu.org\",\"cy.eu.org\",\"cz.eu.org\",\"de.eu.org\",\"dk.eu.org\",\"edu.eu.org\",\"ee.eu.org\",\"es.eu.org\",\"fi.eu.org\",\"fr.eu.org\",\"gr.eu.org\",\"hr.eu.org\",\"hu.eu.org\",\"ie.eu.org\",\"il.eu.org\",\"in.eu.org\",\"int.eu.org\",\"is.eu.org\",\"it.eu.org\",\"jp.eu.org\",\"kr.eu.org\",\"lt.eu.org\",\"lu.eu.org\",\"lv.eu.org\",\"mc.eu.org\",\"me.eu.org\",\"mk.eu.org\",\"mt.eu.org\",\"my.eu.org\",\"net.eu.org\",\"ng.eu.org\",\"nl.eu.org\",\"no.eu.org\",\"nz.eu.org\",\"paris.eu.org\",\"pl.eu.org\",\"pt.eu.org\",\"q-a.eu.org\",\"ro.eu.org\",\"ru.eu.org\",\"se.eu.org\",\"si.eu.org\",\"sk.eu.org\",\"tr.eu.org\",\"uk.eu.org\",\"us.eu.org\",\"eu-1.evennode.com\",\"eu-2.evennode.com\",\"eu-3.evennode.com\",\"eu-4.evennode.com\",\"us-1.evennode.com\",\"us-2.evennode.com\",\"us-3.evennode.com\",\"us-4.evennode.com\",\"twmail.cc\",\"twmail.net\",\"twmail.org\",\"mymailer.com.tw\",\"url.tw\",\"apps.fbsbx.com\",\"ru.net\",\"adygeya.ru\",\"bashkiria.ru\",\"bir.ru\",\"cbg.ru\",\"com.ru\",\"dagestan.ru\",\"grozny.ru\",\"kalmykia.ru\",\"kustanai.ru\",\"marine.ru\",\"mordovia.ru\",\"msk.ru\",\"mytis.ru\",\"nalchik.ru\",\"nov.ru\",\"pyatigorsk.ru\",\"spb.ru\",\"vladikavkaz.ru\",\"vladimir.ru\",\"abkhazia.su\",\"adygeya.su\",\"aktyubinsk.su\",\"arkhangelsk.su\",\"armenia.su\",\"ashgabad.su\",\"azerbaijan.su\",\"balashov.su\",\"bashkiria.su\",\"bryansk.su\",\"bukhara.su\",\"chimkent.su\",\"dagestan.su\",\"east-kazakhstan.su\",\"exnet.su\",\"georgia.su\",\"grozny.su\",\"ivanovo.su\",\"jambyl.su\",\"kalmykia.su\",\"kaluga.su\",\"karacol.su\",\"karaganda.su\",\"karelia.su\",\"khakassia.su\",\"krasnodar.su\",\"kurgan.su\",\"kustanai.su\",\"lenug.su\",\"mangyshlak.su\",\"mordovia.su\",\"msk.su\",\"murmansk.su\",\"nalchik.su\",\"navoi.su\",\"north-kazakhstan.su\",\"nov.su\",\"obninsk.su\",\"penza.su\",\"pokrovsk.su\",\"sochi.su\",\"spb.su\",\"tashkent.su\",\"termez.su\",\"togliatti.su\",\"troitsk.su\",\"tselinograd.su\",\"tula.su\",\"tuva.su\",\"vladikavkaz.su\",\"vladimir.su\",\"vologda.su\",\"channelsdvr.net\",\"u.channelsdvr.net\",\"fastly-terrarium.com\",\"fastlylb.net\",\"map.fastlylb.net\",\"freetls.fastly.net\",\"map.fastly.net\",\"a.prod.fastly.net\",\"global.prod.fastly.net\",\"a.ssl.fastly.net\",\"b.ssl.fastly.net\",\"global.ssl.fastly.net\",\"fastpanel.direct\",\"fastvps-server.com\",\"fhapp.xyz\",\"fedorainfracloud.org\",\"fedorapeople.org\",\"cloud.fedoraproject.org\",\"app.os.fedoraproject.org\",\"app.os.stg.fedoraproject.org\",\"mydobiss.com\",\"filegear.me\",\"filegear-au.me\",\"filegear-de.me\",\"filegear-gb.me\",\"filegear-ie.me\",\"filegear-jp.me\",\"filegear-sg.me\",\"firebaseapp.com\",\"flynnhub.com\",\"flynnhosting.net\",\"0e.vc\",\"freebox-os.com\",\"freeboxos.com\",\"fbx-os.fr\",\"fbxos.fr\",\"freebox-os.fr\",\"freeboxos.fr\",\"freedesktop.org\",\"*.futurecms.at\",\"*.ex.futurecms.at\",\"*.in.futurecms.at\",\"futurehosting.at\",\"futuremailing.at\",\"*.ex.ortsinfo.at\",\"*.kunden.ortsinfo.at\",\"*.statics.cloud\",\"service.gov.uk\",\"gehirn.ne.jp\",\"usercontent.jp\",\"gentapps.com\",\"lab.ms\",\"github.io\",\"githubusercontent.com\",\"gitlab.io\",\"glitch.me\",\"lolipop.io\",\"cloudapps.digital\",\"london.cloudapps.digital\",\"homeoffice.gov.uk\",\"ro.im\",\"shop.ro\",\"goip.de\",\"run.app\",\"a.run.app\",\"web.app\",\"*.0emm.com\",\"appspot.com\",\"*.r.appspot.com\",\"blogspot.ae\",\"blogspot.al\",\"blogspot.am\",\"blogspot.ba\",\"blogspot.be\",\"blogspot.bg\",\"blogspot.bj\",\"blogspot.ca\",\"blogspot.cf\",\"blogspot.ch\",\"blogspot.cl\",\"blogspot.co.at\",\"blogspot.co.id\",\"blogspot.co.il\",\"blogspot.co.ke\",\"blogspot.co.nz\",\"blogspot.co.uk\",\"blogspot.co.za\",\"blogspot.com\",\"blogspot.com.ar\",\"blogspot.com.au\",\"blogspot.com.br\",\"blogspot.com.by\",\"blogspot.com.co\",\"blogspot.com.cy\",\"blogspot.com.ee\",\"blogspot.com.eg\",\"blogspot.com.es\",\"blogspot.com.mt\",\"blogspot.com.ng\",\"blogspot.com.tr\",\"blogspot.com.uy\",\"blogspot.cv\",\"blogspot.cz\",\"blogspot.de\",\"blogspot.dk\",\"blogspot.fi\",\"blogspot.fr\",\"blogspot.gr\",\"blogspot.hk\",\"blogspot.hr\",\"blogspot.hu\",\"blogspot.ie\",\"blogspot.in\",\"blogspot.is\",\"blogspot.it\",\"blogspot.jp\",\"blogspot.kr\",\"blogspot.li\",\"blogspot.lt\",\"blogspot.lu\",\"blogspot.md\",\"blogspot.mk\",\"blogspot.mr\",\"blogspot.mx\",\"blogspot.my\",\"blogspot.nl\",\"blogspot.no\",\"blogspot.pe\",\"blogspot.pt\",\"blogspot.qa\",\"blogspot.re\",\"blogspot.ro\",\"blogspot.rs\",\"blogspot.ru\",\"blogspot.se\",\"blogspot.sg\",\"blogspot.si\",\"blogspot.sk\",\"blogspot.sn\",\"blogspot.td\",\"blogspot.tw\",\"blogspot.ug\",\"blogspot.vn\",\"cloudfunctions.net\",\"cloud.goog\",\"codespot.com\",\"googleapis.com\",\"googlecode.com\",\"pagespeedmobilizer.com\",\"publishproxy.com\",\"withgoogle.com\",\"withyoutube.com\",\"awsmppl.com\",\"fin.ci\",\"free.hr\",\"caa.li\",\"ua.rs\",\"conf.se\",\"hs.zone\",\"hs.run\",\"hashbang.sh\",\"hasura.app\",\"hasura-app.io\",\"hepforge.org\",\"herokuapp.com\",\"herokussl.com\",\"myravendb.com\",\"ravendb.community\",\"ravendb.me\",\"development.run\",\"ravendb.run\",\"bpl.biz\",\"orx.biz\",\"ng.city\",\"biz.gl\",\"ng.ink\",\"col.ng\",\"firm.ng\",\"gen.ng\",\"ltd.ng\",\"ngo.ng\",\"ng.school\",\"sch.so\",\"häkkinen.fi\",\"*.moonscale.io\",\"moonscale.net\",\"iki.fi\",\"dyn-berlin.de\",\"in-berlin.de\",\"in-brb.de\",\"in-butter.de\",\"in-dsl.de\",\"in-dsl.net\",\"in-dsl.org\",\"in-vpn.de\",\"in-vpn.net\",\"in-vpn.org\",\"biz.at\",\"info.at\",\"info.cx\",\"ac.leg.br\",\"al.leg.br\",\"am.leg.br\",\"ap.leg.br\",\"ba.leg.br\",\"ce.leg.br\",\"df.leg.br\",\"es.leg.br\",\"go.leg.br\",\"ma.leg.br\",\"mg.leg.br\",\"ms.leg.br\",\"mt.leg.br\",\"pa.leg.br\",\"pb.leg.br\",\"pe.leg.br\",\"pi.leg.br\",\"pr.leg.br\",\"rj.leg.br\",\"rn.leg.br\",\"ro.leg.br\",\"rr.leg.br\",\"rs.leg.br\",\"sc.leg.br\",\"se.leg.br\",\"sp.leg.br\",\"to.leg.br\",\"pixolino.com\",\"ipifony.net\",\"mein-iserv.de\",\"test-iserv.de\",\"iserv.dev\",\"iobb.net\",\"myjino.ru\",\"*.hosting.myjino.ru\",\"*.landing.myjino.ru\",\"*.spectrum.myjino.ru\",\"*.vps.myjino.ru\",\"*.triton.zone\",\"*.cns.joyent.com\",\"js.org\",\"kaas.gg\",\"khplay.nl\",\"keymachine.de\",\"kinghost.net\",\"uni5.net\",\"knightpoint.systems\",\"oya.to\",\"co.krd\",\"edu.krd\",\"git-repos.de\",\"lcube-server.de\",\"svn-repos.de\",\"leadpages.co\",\"lpages.co\",\"lpusercontent.com\",\"lelux.site\",\"co.business\",\"co.education\",\"co.events\",\"co.financial\",\"co.network\",\"co.place\",\"co.technology\",\"app.lmpm.com\",\"linkitools.space\",\"linkyard.cloud\",\"linkyard-cloud.ch\",\"members.linode.com\",\"nodebalancer.linode.com\",\"we.bs\",\"loginline.app\",\"loginline.dev\",\"loginline.io\",\"loginline.services\",\"loginline.site\",\"krasnik.pl\",\"leczna.pl\",\"lubartow.pl\",\"lublin.pl\",\"poniatowa.pl\",\"swidnik.pl\",\"uklugs.org\",\"glug.org.uk\",\"lug.org.uk\",\"lugs.org.uk\",\"barsy.bg\",\"barsy.co.uk\",\"barsyonline.co.uk\",\"barsycenter.com\",\"barsyonline.com\",\"barsy.club\",\"barsy.de\",\"barsy.eu\",\"barsy.in\",\"barsy.info\",\"barsy.io\",\"barsy.me\",\"barsy.menu\",\"barsy.mobi\",\"barsy.net\",\"barsy.online\",\"barsy.org\",\"barsy.pro\",\"barsy.pub\",\"barsy.shop\",\"barsy.site\",\"barsy.support\",\"barsy.uk\",\"*.magentosite.cloud\",\"mayfirst.info\",\"mayfirst.org\",\"hb.cldmail.ru\",\"miniserver.com\",\"memset.net\",\"cloud.metacentrum.cz\",\"custom.metacentrum.cz\",\"flt.cloud.muni.cz\",\"usr.cloud.muni.cz\",\"meteorapp.com\",\"eu.meteorapp.com\",\"co.pl\",\"azurecontainer.io\",\"azurewebsites.net\",\"azure-mobile.net\",\"cloudapp.net\",\"mozilla-iot.org\",\"bmoattachments.org\",\"net.ru\",\"org.ru\",\"pp.ru\",\"ui.nabu.casa\",\"pony.club\",\"of.fashion\",\"on.fashion\",\"of.football\",\"in.london\",\"of.london\",\"for.men\",\"and.mom\",\"for.mom\",\"for.one\",\"for.sale\",\"of.work\",\"to.work\",\"nctu.me\",\"bitballoon.com\",\"netlify.com\",\"4u.com\",\"ngrok.io\",\"nh-serv.co.uk\",\"nfshost.com\",\"dnsking.ch\",\"mypi.co\",\"n4t.co\",\"001www.com\",\"ddnslive.com\",\"myiphost.com\",\"forumz.info\",\"16-b.it\",\"32-b.it\",\"64-b.it\",\"soundcast.me\",\"tcp4.me\",\"dnsup.net\",\"hicam.net\",\"now-dns.net\",\"ownip.net\",\"vpndns.net\",\"dynserv.org\",\"now-dns.org\",\"x443.pw\",\"now-dns.top\",\"ntdll.top\",\"freeddns.us\",\"crafting.xyz\",\"zapto.xyz\",\"nsupdate.info\",\"nerdpol.ovh\",\"blogsyte.com\",\"brasilia.me\",\"cable-modem.org\",\"ciscofreak.com\",\"collegefan.org\",\"couchpotatofries.org\",\"damnserver.com\",\"ddns.me\",\"ditchyourip.com\",\"dnsfor.me\",\"dnsiskinky.com\",\"dvrcam.info\",\"dynns.com\",\"eating-organic.net\",\"fantasyleague.cc\",\"geekgalaxy.com\",\"golffan.us\",\"health-carereform.com\",\"homesecuritymac.com\",\"homesecuritypc.com\",\"hopto.me\",\"ilovecollege.info\",\"loginto.me\",\"mlbfan.org\",\"mmafan.biz\",\"myactivedirectory.com\",\"mydissent.net\",\"myeffect.net\",\"mymediapc.net\",\"mypsx.net\",\"mysecuritycamera.com\",\"mysecuritycamera.net\",\"mysecuritycamera.org\",\"net-freaks.com\",\"nflfan.org\",\"nhlfan.net\",\"no-ip.ca\",\"no-ip.co.uk\",\"no-ip.net\",\"noip.us\",\"onthewifi.com\",\"pgafan.net\",\"point2this.com\",\"pointto.us\",\"privatizehealthinsurance.net\",\"quicksytes.com\",\"read-books.org\",\"securitytactics.com\",\"serveexchange.com\",\"servehumour.com\",\"servep2p.com\",\"servesarcasm.com\",\"stufftoread.com\",\"ufcfan.org\",\"unusualperson.com\",\"workisboring.com\",\"3utilities.com\",\"bounceme.net\",\"ddns.net\",\"ddnsking.com\",\"gotdns.ch\",\"hopto.org\",\"myftp.biz\",\"myftp.org\",\"myvnc.com\",\"no-ip.biz\",\"no-ip.info\",\"no-ip.org\",\"noip.me\",\"redirectme.net\",\"servebeer.com\",\"serveblog.net\",\"servecounterstrike.com\",\"serveftp.com\",\"servegame.com\",\"servehalflife.com\",\"servehttp.com\",\"serveirc.com\",\"serveminecraft.net\",\"servemp3.com\",\"servepics.com\",\"servequake.com\",\"sytes.net\",\"webhop.me\",\"zapto.org\",\"stage.nodeart.io\",\"nodum.co\",\"nodum.io\",\"pcloud.host\",\"nyc.mn\",\"nom.ae\",\"nom.af\",\"nom.ai\",\"nom.al\",\"nym.by\",\"nom.bz\",\"nym.bz\",\"nom.cl\",\"nym.ec\",\"nom.gd\",\"nom.ge\",\"nom.gl\",\"nym.gr\",\"nom.gt\",\"nym.gy\",\"nym.hk\",\"nom.hn\",\"nym.ie\",\"nom.im\",\"nom.ke\",\"nym.kz\",\"nym.la\",\"nym.lc\",\"nom.li\",\"nym.li\",\"nym.lt\",\"nym.lu\",\"nom.lv\",\"nym.me\",\"nom.mk\",\"nym.mn\",\"nym.mx\",\"nom.nu\",\"nym.nz\",\"nym.pe\",\"nym.pt\",\"nom.pw\",\"nom.qa\",\"nym.ro\",\"nom.rs\",\"nom.si\",\"nym.sk\",\"nom.st\",\"nym.su\",\"nym.sx\",\"nom.tj\",\"nym.tw\",\"nom.ug\",\"nom.uy\",\"nom.vc\",\"nom.vg\",\"static.observableusercontent.com\",\"cya.gg\",\"cloudycluster.net\",\"nid.io\",\"opencraft.hosting\",\"operaunite.com\",\"skygearapp.com\",\"outsystemscloud.com\",\"ownprovider.com\",\"own.pm\",\"ox.rs\",\"oy.lc\",\"pgfog.com\",\"pagefrontapp.com\",\"art.pl\",\"gliwice.pl\",\"krakow.pl\",\"poznan.pl\",\"wroc.pl\",\"zakopane.pl\",\"pantheonsite.io\",\"gotpantheon.com\",\"mypep.link\",\"perspecta.cloud\",\"on-web.fr\",\"*.platform.sh\",\"*.platformsh.site\",\"dyn53.io\",\"co.bn\",\"xen.prgmr.com\",\"priv.at\",\"prvcy.page\",\"*.dweb.link\",\"protonet.io\",\"chirurgiens-dentistes-en-france.fr\",\"byen.site\",\"pubtls.org\",\"qualifioapp.com\",\"qbuser.com\",\"instantcloud.cn\",\"ras.ru\",\"qa2.com\",\"qcx.io\",\"*.sys.qcx.io\",\"dev-myqnapcloud.com\",\"alpha-myqnapcloud.com\",\"myqnapcloud.com\",\"*.quipelements.com\",\"vapor.cloud\",\"vaporcloud.io\",\"rackmaze.com\",\"rackmaze.net\",\"*.on-k3s.io\",\"*.on-rancher.cloud\",\"*.on-rio.io\",\"readthedocs.io\",\"rhcloud.com\",\"app.render.com\",\"onrender.com\",\"repl.co\",\"repl.run\",\"resindevice.io\",\"devices.resinstaging.io\",\"hzc.io\",\"wellbeingzone.eu\",\"ptplus.fit\",\"wellbeingzone.co.uk\",\"git-pages.rit.edu\",\"sandcats.io\",\"logoip.de\",\"logoip.com\",\"schokokeks.net\",\"gov.scot\",\"scrysec.com\",\"firewall-gateway.com\",\"firewall-gateway.de\",\"my-gateway.de\",\"my-router.de\",\"spdns.de\",\"spdns.eu\",\"firewall-gateway.net\",\"my-firewall.org\",\"myfirewall.org\",\"spdns.org\",\"senseering.net\",\"biz.ua\",\"co.ua\",\"pp.ua\",\"shiftedit.io\",\"myshopblocks.com\",\"shopitsite.com\",\"mo-siemens.io\",\"1kapp.com\",\"appchizi.com\",\"applinzi.com\",\"sinaapp.com\",\"vipsinaapp.com\",\"siteleaf.net\",\"bounty-full.com\",\"alpha.bounty-full.com\",\"beta.bounty-full.com\",\"stackhero-network.com\",\"static.land\",\"dev.static.land\",\"sites.static.land\",\"apps.lair.io\",\"*.stolos.io\",\"spacekit.io\",\"customer.speedpartner.de\",\"api.stdlib.com\",\"storj.farm\",\"utwente.io\",\"soc.srcf.net\",\"user.srcf.net\",\"temp-dns.com\",\"applicationcloud.io\",\"scapp.io\",\"*.s5y.io\",\"*.sensiosite.cloud\",\"syncloud.it\",\"diskstation.me\",\"dscloud.biz\",\"dscloud.me\",\"dscloud.mobi\",\"dsmynas.com\",\"dsmynas.net\",\"dsmynas.org\",\"familyds.com\",\"familyds.net\",\"familyds.org\",\"i234.me\",\"myds.me\",\"synology.me\",\"vpnplus.to\",\"direct.quickconnect.to\",\"taifun-dns.de\",\"gda.pl\",\"gdansk.pl\",\"gdynia.pl\",\"med.pl\",\"sopot.pl\",\"edugit.org\",\"telebit.app\",\"telebit.io\",\"*.telebit.xyz\",\"gwiddle.co.uk\",\"thingdustdata.com\",\"cust.dev.thingdust.io\",\"cust.disrec.thingdust.io\",\"cust.prod.thingdust.io\",\"cust.testing.thingdust.io\",\"arvo.network\",\"azimuth.network\",\"bloxcms.com\",\"townnews-staging.com\",\"12hp.at\",\"2ix.at\",\"4lima.at\",\"lima-city.at\",\"12hp.ch\",\"2ix.ch\",\"4lima.ch\",\"lima-city.ch\",\"trafficplex.cloud\",\"de.cool\",\"12hp.de\",\"2ix.de\",\"4lima.de\",\"lima-city.de\",\"1337.pictures\",\"clan.rip\",\"lima-city.rocks\",\"webspace.rocks\",\"lima.zone\",\"*.transurl.be\",\"*.transurl.eu\",\"*.transurl.nl\",\"tuxfamily.org\",\"dd-dns.de\",\"diskstation.eu\",\"diskstation.org\",\"dray-dns.de\",\"draydns.de\",\"dyn-vpn.de\",\"dynvpn.de\",\"mein-vigor.de\",\"my-vigor.de\",\"my-wan.de\",\"syno-ds.de\",\"synology-diskstation.de\",\"synology-ds.de\",\"uber.space\",\"*.uberspace.de\",\"hk.com\",\"hk.org\",\"ltd.hk\",\"inc.hk\",\"virtualuser.de\",\"virtual-user.de\",\"urown.cloud\",\"dnsupdate.info\",\"lib.de.us\",\"2038.io\",\"router.management\",\"v-info.info\",\"voorloper.cloud\",\"v.ua\",\"wafflecell.com\",\"*.webhare.dev\",\"wedeploy.io\",\"wedeploy.me\",\"wedeploy.sh\",\"remotewd.com\",\"wmflabs.org\",\"myforum.community\",\"community-pro.de\",\"diskussionsbereich.de\",\"community-pro.net\",\"meinforum.net\",\"half.host\",\"xnbay.com\",\"u2.xnbay.com\",\"u2-local.xnbay.com\",\"cistron.nl\",\"demon.nl\",\"xs4all.space\",\"yandexcloud.net\",\"storage.yandexcloud.net\",\"website.yandexcloud.net\",\"official.academy\",\"yolasite.com\",\"ybo.faith\",\"yombo.me\",\"homelink.one\",\"ybo.party\",\"ybo.review\",\"ybo.science\",\"ybo.trade\",\"nohost.me\",\"noho.st\",\"za.net\",\"za.org\",\"now.sh\",\"bss.design\",\"basicserver.io\",\"virtualserver.io\",\"enterprisecloud.nu\"]");

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
class Commands {
    constructor(background) {
        this.background = background;
        this.debug = background.debug;
    }
    initialize() {
        this.pref = this.background.pref;
        this.storage = this.background.storage;
        this.container = this.background.container;
        this.permissions = this.background.permissions;
        this.tabs = this.background.tabs;
    }
    async onCommand(name) {
        switch (name) {
            case 'new_temporary_container_tab':
                if (!this.pref.keyboardShortcuts.AltC) {
                    return;
                }
                this.container.createTabInTempContainer({
                    deletesHistory: this.pref.deletesHistory.automaticMode === 'automatic',
                });
                break;
            case 'new_no_container_tab':
                if (!this.pref.keyboardShortcuts.AltN) {
                    return;
                }
                try {
                    const tab = (await browser.tabs.create({
                        url: 'about:blank',
                    }));
                    this.container.noContainerTabs[tab.id] = true;
                    this.debug('[onCommand] new no container tab created', this.container.noContainerTabs);
                }
                catch (error) {
                    this.debug('[onCommand] couldnt create tab', error);
                }
                break;
            case 'new_no_container_window_tab':
                if (!this.pref.keyboardShortcuts.AltShiftC) {
                    return;
                }
                try {
                    const browserWindow = await browser.windows.create({
                        url: 'about:blank',
                    });
                    if (!browserWindow.tabs) {
                        return;
                    }
                    const [tab] = browserWindow.tabs;
                    this.container.noContainerTabs[tab.id] = true;
                    this.debug('[onCommand] new no container tab created in window', browserWindow, this.container.noContainerTabs);
                }
                catch (error) {
                    this.debug('[onCommand] couldnt create tab in window', error);
                }
                break;
            case 'new_no_history_tab':
                if (!this.pref.keyboardShortcuts.AltP) {
                    return;
                }
                if (this.permissions.history) {
                    this.container.createTabInTempContainer({ deletesHistory: true });
                }
                break;
            case 'new_same_container_tab':
                if (!this.pref.keyboardShortcuts.AltX) {
                    return;
                }
                this.tabs.createInSameContainer();
                break;
            case 'new_temporary_container_tab_current_url': {
                if (!this.pref.keyboardShortcuts.AltO) {
                    return;
                }
                const [activeTab] = (await browser.tabs.query({
                    currentWindow: true,
                    active: true,
                }));
                if (!activeTab || !activeTab.url.startsWith('http')) {
                    return;
                }
                this.container.createTabInTempContainer({
                    url: activeTab.url,
                    deletesHistory: this.pref.deletesHistory.automaticMode === 'automatic',
                });
                break;
            }
            case 'toggle_isolation':
                if (!this.pref.keyboardShortcuts.AltI) {
                    return;
                }
                this.background.isolation.toggleActiveState();
                break;
        }
    }
}
exports.Commands = Commands;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const lib_1 = __webpack_require__(4);
const shared_1 = __webpack_require__(5);
class Container {
    constructor(background) {
        this.noContainerTabs = {};
        this.urlCreatedContainer = {};
        this.tabCreatedAsMacConfirmPage = {};
        this.lastCreatedInactiveTab = {};
        this.containerColors = shared_1.CONTAINER_COLORS;
        this.containerIcons = shared_1.CONTAINER_ICONS;
        this.requestCreatedTab = {};
        this.background = background;
        this.debug = background.debug;
    }
    async initialize() {
        this.pref = this.background.pref;
        this.storage = this.background.storage;
        this.permissions = this.background.permissions;
        this.tabs = this.background.tabs;
    }
    async createTabInTempContainer({ tab, url, active, request = false, dontPin = true, deletesHistory = false, macConfirmPage = false, openerTab, }) {
        if (request && request.requestId) {
            // we saw that request already
            if (this.requestCreatedTab[request.requestId]) {
                this.debug('[createTabInTempContainer] we already created a tab for this request, so we stop here, probably redirect', tab, request);
                return;
            }
            this.requestCreatedTab[request.requestId] = true;
            // cleanup tracked requests later
            // requestIds are unique per session, so we have no pressure to remove them
            lib_1.delay(300000).then(() => {
                this.debug('[createTabInTempContainer] cleanup timeout', request);
                delete this.requestCreatedTab[request.requestId];
            });
        }
        const contextualIdentity = await this.createTempContainer({
            url,
            request,
            deletesHistory,
        });
        return this.createTab({
            url,
            tab,
            active,
            dontPin,
            macConfirmPage,
            contextualIdentity,
            openerTab,
        });
    }
    async createTempContainer({ url, request, deletesHistory, }) {
        const containerOptions = this.generateContainerNameIconColor((request && request.url) || url);
        if (containerOptions.number) {
            this.storage.local.tempContainersNumbers.push(containerOptions.number);
        }
        if (deletesHistory) {
            if (this.permissions.history) {
                containerOptions.name += '-deletes-history';
            }
            else {
                deletesHistory = false;
            }
        }
        containerOptions.deletesHistory = deletesHistory;
        try {
            this.debug('[createTabInTempContainer] creating new container', containerOptions);
            const contextualIdentity = await browser.contextualIdentities.create({
                name: containerOptions.name,
                icon: containerOptions.icon,
                color: containerOptions.color,
            });
            this.debug('[createTabInTempContainer] contextualIdentity created', contextualIdentity);
            this.storage.local.tempContainers[contextualIdentity.cookieStoreId] = containerOptions;
            await this.storage.persist();
            return contextualIdentity;
        }
        catch (error) {
            this.debug('[createTabInTempContainer] error while creating container', containerOptions.name, error);
            throw error;
        }
    }
    async createTab({ url, tab, active, dontPin, macConfirmPage, contextualIdentity, openerTab, }) {
        try {
            const newTabOptions = {
                cookieStoreId: contextualIdentity.cookieStoreId,
                url,
            };
            if (tab) {
                newTabOptions.active = tab.active;
                if (tab.index >= 0) {
                    if (!tab.active &&
                        this.lastCreatedInactiveTab[browser.windows.WINDOW_ID_CURRENT]) {
                        this.debug('[createTabInTempContainer] lastCreatedInactiveTab id', this.lastCreatedInactiveTab);
                        try {
                            const lastCreatedInactiveTab = await browser.tabs.get(this.lastCreatedInactiveTab[browser.windows.WINDOW_ID_CURRENT]);
                            this.debug('[createTabInTempContainer] lastCreatedInactiveTab', lastCreatedInactiveTab);
                            newTabOptions.index = lastCreatedInactiveTab.index + 1;
                        }
                        catch (error) {
                            this.debug('[createTabInTempContainer] failed to get lastCreatedInactiveTab', error);
                            newTabOptions.index = tab.index + 1;
                        }
                    }
                    else {
                        newTabOptions.index = tab.index + 1;
                    }
                }
                if (tab.pinned && !dontPin) {
                    newTabOptions.pinned = true;
                }
                if (openerTab) {
                    newTabOptions.openerTabId = openerTab.id;
                }
                else if (tab.openerTabId) {
                    newTabOptions.openerTabId = tab.openerTabId;
                }
                if (tab.windowId) {
                    newTabOptions.windowId = tab.windowId;
                }
            }
            if (active === false) {
                newTabOptions.active = false;
            }
            this.debug('[createTabInTempContainer] creating tab in temporary container', newTabOptions);
            const newTab = (await browser.tabs.create(newTabOptions));
            if (tab && !tab.active) {
                this.lastCreatedInactiveTab[browser.windows.WINDOW_ID_CURRENT] =
                    newTab.id;
            }
            this.debug('[createTabInTempContainer] new tab in temp container created', newTab);
            if (url) {
                this.urlCreatedContainer[url] = contextualIdentity.cookieStoreId;
                lib_1.delay(1000).then(() => {
                    this.debug('[createTabInTempContainer] cleaning up urlCreatedContainer', url);
                    delete this.urlCreatedContainer[url];
                });
            }
            this.tabs.containerMap.set(newTab.id, contextualIdentity.cookieStoreId);
            if (macConfirmPage) {
                this.tabCreatedAsMacConfirmPage[newTab.id] = true;
            }
            await this.storage.persist();
            return newTab;
        }
        catch (error) {
            this.debug('[createTabInTempContainer] error while creating new tab', error);
            throw error;
        }
    }
    async reloadTabInTempContainer({ tab, url, active, deletesHistory, request, macConfirmPage, dontPin = true, }) {
        const newTab = await this.createTabInTempContainer({
            tab,
            url,
            active,
            dontPin,
            deletesHistory,
            request,
            macConfirmPage,
        });
        if (!tab) {
            return newTab;
        }
        await this.tabs.remove(tab);
        return newTab;
    }
    generateContainerNameIconColor(url) {
        let tempContainerNumber = 0;
        if (this.pref.container.numberMode.startsWith('keep')) {
            this.storage.local.tempContainerCounter++;
            tempContainerNumber = this.storage.local.tempContainerCounter;
        }
        if (this.pref.container.numberMode === 'reuse') {
            tempContainerNumber = this.getReusedContainerNumber();
        }
        let containerName = this.pref.container.namePrefix;
        if (url) {
            const parsedUrl = new URL(url);
            if (containerName.includes('%fulldomain%')) {
                containerName = containerName.replace('%fulldomain%', parsedUrl.hostname);
            }
            if (containerName.includes('%domain%')) {
                const domain = lib_1.psl.isValid(parsedUrl.hostname)
                    ? lib_1.psl.get(parsedUrl.hostname)
                    : parsedUrl.hostname;
                if (domain) {
                    containerName = containerName.replace('%domain%', domain);
                }
            }
        }
        else {
            containerName = containerName
                .replace('%fulldomain%', '')
                .replace('%domain%', '');
        }
        if (tempContainerNumber) {
            containerName = `${containerName}${tempContainerNumber}`;
        }
        if (!containerName) {
            containerName = ' ';
        }
        let containerColor = this.pref.container.color;
        if (this.pref.container.colorRandom) {
            const containerColors = this.getAvailableContainerColors();
            containerColor =
                containerColors[Math.floor(Math.random() * containerColors.length)];
        }
        let containerIcon = this.pref.container.icon;
        if (this.pref.container.iconRandom) {
            let containerIcons = this.containerIcons.filter((icon) => !this.pref.container.iconRandomExcluded.includes(icon));
            if (!containerIcons.length) {
                containerIcons = this.containerIcons;
            }
            containerIcon =
                containerIcons[Math.floor(Math.random() * containerIcons.length)];
        }
        return {
            name: containerName,
            color: containerColor,
            icon: containerIcon,
            number: tempContainerNumber,
            clean: true,
        };
    }
    isPermanent(cookieStoreId) {
        if (cookieStoreId !== `${this.background.containerPrefix}-default` &&
            !this.storage.local.tempContainers[cookieStoreId]) {
            return true;
        }
        return false;
    }
    isTemporary(cookieStoreId, type) {
        return !!(this.storage.local.tempContainers[cookieStoreId] &&
            (!type || this.storage.local.tempContainers[cookieStoreId][type]));
    }
    isClean(cookieStoreId) {
        return (this.storage.local.tempContainers[cookieStoreId] &&
            this.storage.local.tempContainers[cookieStoreId].clean);
    }
    markUnclean(tabId) {
        const cookieStoreId = this.tabs.containerMap.get(tabId);
        if (cookieStoreId && this.isClean(cookieStoreId)) {
            this.debug('[markUnclean] marking tmp container as not clean anymore', cookieStoreId);
            this.storage.local.tempContainers[cookieStoreId].clean = false;
        }
    }
    getReusedContainerNumber() {
        const tempContainersNumbers = this.storage.local.tempContainersNumbers.sort();
        if (!tempContainersNumbers.length) {
            return 1;
        }
        else {
            const maxContainerNumber = Math.max(...tempContainersNumbers);
            for (let i = 1; i < maxContainerNumber; i++) {
                if (!tempContainersNumbers.includes(i)) {
                    return i;
                }
            }
            return maxContainerNumber + 1;
        }
    }
    getAvailableContainerColors() {
        // even out colors
        let availableColors = [];
        const containersOptions = Object.values(this.storage.local.tempContainers);
        const assignedColors = {};
        let maxColors = 0;
        for (const containerOptions of containersOptions) {
            if (typeof containerOptions !== 'object') {
                continue;
            }
            if (!assignedColors[containerOptions.color]) {
                assignedColors[containerOptions.color] = 0;
            }
            assignedColors[containerOptions.color]++;
            if (assignedColors[containerOptions.color] > maxColors) {
                maxColors = assignedColors[containerOptions.color];
            }
        }
        for (const color of this.containerColors) {
            if (this.pref.container.colorRandomExcluded.includes(color)) {
                continue;
            }
            if (!assignedColors[color] || assignedColors[color] < maxColors) {
                availableColors.push(color);
            }
        }
        if (!availableColors.length) {
            availableColors = this.containerColors.filter((color) => !this.pref.container.colorRandomExcluded.includes(color));
            if (!availableColors.length) {
                availableColors = this.containerColors;
            }
        }
        return availableColors;
    }
    removeFromStorage(cookieStoreId) {
        this.storage.local.tempContainersNumbers = this.storage.local.tempContainersNumbers.filter((containerNumber) => this.storage.local.tempContainers[cookieStoreId].number !==
            containerNumber);
        delete this.storage.local.tempContainers[cookieStoreId];
        return this.storage.persist();
    }
    getType(cookieStoreId) {
        return this.storage.local.tempContainers[cookieStoreId].deletesHistory
            ? 'deletesHistory'
            : 'regular';
    }
    getRemovalDelay(cookieStoreId) {
        return this.getType(cookieStoreId) === 'deletesHistory'
            ? this.pref.deletesHistory.containerRemoval
            : this.pref.container.removal;
    }
    cleanupNumbers() {
        this.storage.local.tempContainersNumbers = Object.values(this.storage.local.tempContainers).map((container) => container.number);
    }
    cleanupNumber(cookieStoreId) {
        this.storage.local.tempContainersNumbers = this.storage.local.tempContainersNumbers.filter((containerNumber) => this.storage.local.tempContainers[cookieStoreId].number !==
            containerNumber);
    }
    getAllIds() {
        return Object.keys(this.storage.local.tempContainers);
    }
}
exports.Container = Container;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = void 0;
class ContextMenu {
    constructor(background) {
        this.nextMenuInstanceId = 0;
        this.lastMenuInstanceId = 0;
        this.background = background;
    }
    initialize() {
        this.pref = this.background.pref;
        this.container = this.background.container;
        this.add();
    }
    async onClicked(info, tab) {
        switch (info.menuItemId) {
            case 'open-link-in-new-temporary-container-tab':
                this.container.createTabInTempContainer({
                    tab,
                    url: info.linkUrl,
                    active: false,
                    deletesHistory: this.pref.deletesHistory.automaticMode === 'automatic',
                    openerTab: tab,
                });
                break;
            case 'open-link-in-new-deletes-history-temporary-container-tab':
                this.container.createTabInTempContainer({
                    tab,
                    url: info.linkUrl,
                    active: false,
                    deletesHistory: true,
                    openerTab: tab,
                });
                break;
            case 'open-bookmark-in-new-temporary-container-tab': {
                const bookmarks = await browser.bookmarks.get(info.bookmarkId);
                if (bookmarks[0].url) {
                    this.container.createTabInTempContainer({
                        tab,
                        url: bookmarks[0].url,
                        active: false,
                        deletesHistory: this.pref.deletesHistory.automaticMode === 'automatic',
                    });
                }
                break;
            }
            case 'open-bookmark-in-new-deletes-history-temporary-container-tab': {
                const bookmarks = await browser.bookmarks.get(info.bookmarkId);
                if (bookmarks[0].url) {
                    this.container.createTabInTempContainer({
                        tab,
                        url: bookmarks[0].url,
                        active: false,
                        deletesHistory: true,
                    });
                }
                break;
            }
        }
    }
    async onShown(info) {
        if (!info.bookmarkId) {
            return;
        }
        const menuInstanceId = this.nextMenuInstanceId++;
        this.lastMenuInstanceId = menuInstanceId;
        const bookmarks = await browser.bookmarks.get(info.bookmarkId);
        if (bookmarks[0].url) {
            return;
        }
        await this.toggleBookmarks(false);
        if (menuInstanceId !== this.lastMenuInstanceId) {
            this.toggleBookmarks(true);
            return;
        }
        await browser.contextMenus.refresh();
        this.toggleBookmarks(true);
    }
    async toggleBookmarks(visible) {
        if (this.pref.contextMenuBookmarks &&
            this.background.permissions.bookmarks) {
            await browser.contextMenus.update('open-bookmark-in-new-temporary-container-tab', {
                visible,
            });
        }
        if (this.pref.deletesHistory.contextMenuBookmarks &&
            this.background.permissions.history &&
            this.background.permissions.bookmarks) {
            await browser.contextMenus.update('open-bookmark-in-new-deletes-history-temporary-container-tab', {
                visible,
            });
        }
    }
    async add() {
        if (this.pref.contextMenu) {
            browser.contextMenus.create({
                id: 'open-link-in-new-temporary-container-tab',
                title: 'Open link in new Temporary Container tab',
                contexts: ['link'],
                icons: {
                    '16': 'icons/page-w-16.svg',
                    '32': 'icons/page-w-32.svg',
                },
            });
        }
        if (this.pref.deletesHistory.contextMenu &&
            this.background.permissions.history) {
            browser.contextMenus.create({
                id: 'open-link-in-new-deletes-history-temporary-container-tab',
                title: 'Open link in new "Deletes History Temporary Container" tab',
                contexts: ['link'],
                icons: {
                    '16': 'icons/page-w-16.svg',
                    '32': 'icons/page-w-32.svg',
                },
            });
        }
        if (this.pref.contextMenuBookmarks &&
            this.background.permissions.bookmarks) {
            browser.contextMenus.create({
                id: 'open-bookmark-in-new-temporary-container-tab',
                title: 'Open Bookmark in new Temporary Container tab',
                contexts: ['bookmark'],
                icons: {
                    '16': 'icons/page-w-16.svg',
                    '32': 'icons/page-w-32.svg',
                },
            });
        }
        if (this.pref.deletesHistory.contextMenuBookmarks &&
            this.background.permissions.history &&
            this.background.permissions.bookmarks) {
            browser.contextMenus.create({
                id: 'open-bookmark-in-new-deletes-history-temporary-container-tab',
                title: 'Open Bookmark in new "Deletes History Temporary Container" tab',
                contexts: ['bookmark'],
                icons: {
                    '16': 'icons/page-w-16.svg',
                    '32': 'icons/page-w-32.svg',
                },
            });
        }
    }
    remove() {
        return browser.contextMenus.removeAll();
    }
    async windowsOnFocusChanged(windowId) {
        if (windowId === browser.windows.WINDOW_ID_NONE) {
            return;
        }
        await this.remove();
        this.add();
    }
}
exports.ContextMenu = ContextMenu;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
class Convert {
    constructor(background) {
        this.background = background;
    }
    initialize() {
        this.storage = this.background.storage;
        this.container = this.background.container;
    }
    async convertTempContainerToPermanent({ cookieStoreId, tabId, name, }) {
        delete this.storage.local.tempContainers[cookieStoreId];
        await this.storage.persist();
        await browser.contextualIdentities.update(cookieStoreId, {
            name,
            color: 'blue',
        });
        await browser.tabs.reload(tabId);
    }
    async convertTempContainerToRegular({ cookieStoreId, tabId, }) {
        this.storage.local.tempContainers[cookieStoreId].deletesHistory = false;
        delete this.storage.local.tempContainers[cookieStoreId].history;
        await this.storage.persist();
        const name = this.storage.local.tempContainers[cookieStoreId].name.replace('-deletes-history', '');
        await browser.contextualIdentities.update(cookieStoreId, { name });
        await browser.tabs.reload(tabId);
    }
    async convertPermanentToTempContainer({ cookieStoreId, tabId, }) {
        const containerOptions = this.container.generateContainerNameIconColor();
        await browser.contextualIdentities.update(cookieStoreId, {
            name: containerOptions.name,
            icon: containerOptions.icon,
            color: containerOptions.color,
        });
        this.storage.local.tempContainers[cookieStoreId] = containerOptions;
        await this.storage.persist();
        await browser.tabs.reload(tabId);
    }
}
exports.Convert = Convert;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookies = void 0;
class Cookies {
    constructor(background) {
        this.background = background;
        this.debug = background.debug;
    }
    initialize() {
        this.pref = this.background.pref;
        this.storage = this.background.storage;
        this.utils = this.background.utils;
    }
    async maybeSetAndAddToHeader(request) {
        var _a, _b;
        if (request.tabId < 0 || !Object.keys(this.pref.cookies.domain).length) {
            return;
        }
        let tab;
        try {
            let cookieHeader;
            let cookiesHeader = {};
            let cookieHeaderChanged = false;
            for (const domainPattern in this.pref.cookies.domain) {
                if (!this.utils.matchDomainPattern(request.url, domainPattern)) {
                    continue;
                }
                if (!tab) {
                    tab = (await browser.tabs.get(request.tabId));
                    if (!this.storage.local.tempContainers[tab.cookieStoreId]) {
                        this.debug('[maybeSetAndAddCookiesToHeader] not a temporary container', tab);
                        return;
                    }
                    cookieHeader = (_a = request.requestHeaders) === null || _a === void 0 ? void 0 : _a.find((element) => element.name.toLowerCase() === 'cookie');
                    if (cookieHeader && cookieHeader.value) {
                        cookiesHeader = cookieHeader.value
                            .split('; ')
                            .reduce((accumulator, cookie) => {
                            const split = cookie.split('=');
                            if (split.length === 2) {
                                accumulator[split[0]] = split[1];
                            }
                            return accumulator;
                        }, {});
                    }
                    this.debug('[maybeAddCookiesToHeader] found temp tab and header', request, cookieHeader, cookiesHeader);
                }
                for (const cookie of this.pref.cookies.domain[domainPattern]) {
                    if (!cookie) {
                        continue;
                    }
                    // website pattern matched request, set cookie
                    const setCookie = {
                        domain: cookie.domain || undefined,
                        expirationDate: cookie.expirationDate
                            ? parseInt(cookie.expirationDate, 10)
                            : undefined,
                        firstPartyDomain: cookie.firstPartyDomain || undefined,
                        httpOnly: cookie.httpOnly === ''
                            ? undefined
                            : cookie.httpOnly === 'true'
                                ? true
                                : false,
                        name: cookie.name,
                        path: cookie.path || undefined,
                        secure: cookie.secure === ''
                            ? undefined
                            : cookie.secure === 'true'
                                ? true
                                : false,
                        url: cookie.url,
                        value: cookie.value || undefined,
                        sameSite: cookie.sameSite || undefined,
                        storeId: tab.cookieStoreId,
                    };
                    this.debug('[maybeSetCookies] setting cookie', cookie, setCookie);
                    const cookieSet = await browser.cookies.set(setCookie);
                    this.debug('[maybeSetCookies] cookie set', cookieSet);
                    if (cookiesHeader[cookie.name] === cookie.value) {
                        this.debug('[maybeSetCookies] the set cookie is already in the header', cookie, cookiesHeader);
                        continue;
                    }
                    // check if we're allowed to send the cookie with the current request
                    try {
                        const cookieAllowed = await browser.cookies.get({
                            name: cookie.name,
                            url: request.url,
                            storeId: tab.cookieStoreId,
                            firstPartyDomain: cookie.firstPartyDomain || undefined,
                        });
                        this.debug('[maybeAddCookiesToHeader] checked if allowed to add cookie to header', cookieAllowed);
                        if (cookieAllowed) {
                            cookieHeaderChanged = true;
                            // eslint-disable-next-line require-atomic-updates
                            cookiesHeader[cookieAllowed.name] = cookieAllowed.value;
                            this.debug('[maybeAddCookiesToHeader] cookie value changed', cookiesHeader);
                        }
                    }
                    catch (error) {
                        this.debug('[maybeAddCookiesToHeader] couldnt get cookie', cookie);
                    }
                }
            }
            this.debug('[maybeAddCookiesToHeader] cookieHeaderChanged', cookieHeaderChanged, cookieHeader, cookiesHeader);
            if (!cookieHeaderChanged) {
                return;
            }
            else {
                const changedCookieHeaderValues = [];
                Object.keys(cookiesHeader).map((cookieName) => {
                    changedCookieHeaderValues.push(`${cookieName}=${cookiesHeader[cookieName]}`);
                });
                const changedCookieHeaderValue = changedCookieHeaderValues.join('; ');
                this.debug('[maybeAddCookiesToHeader] changedCookieHeaderValue', changedCookieHeaderValue);
                if (cookieHeader) {
                    cookieHeader.value = changedCookieHeaderValue;
                }
                else {
                    (_b = request.requestHeaders) === null || _b === void 0 ? void 0 : _b.push({
                        name: 'Cookie',
                        value: changedCookieHeaderValue,
                    });
                }
                this.debug('[maybeAddCookiesToHeader] changed cookieHeader to', cookieHeader, request);
                return request;
            }
        }
        catch (error) {
            this.debug('[maybeAddCookiesToHeader] something went wrong while adding cookies to header', tab, request.url, error);
            return;
        }
    }
}
exports.Cookies = Cookies;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
class History {
    constructor(background) {
        this.background = background;
        this.debug = background.debug;
    }
    initialize() {
        this.storage = this.background.storage;
    }
    async maybeAddHistory(tab, url) {
        if (!tab || url === 'about:blank' || url === 'about:newtab') {
            return;
        }
        const cookieStoreId = tab.cookieStoreId;
        const container = this.storage.local.tempContainers[cookieStoreId];
        if (cookieStoreId !== `${this.background.containerPrefix}-default` &&
            container &&
            container.deletesHistory) {
            if (!container.history) {
                container.history = {};
            }
            container.history[url] = {
                tabId: tab.id,
            };
            await this.storage.persist();
        }
    }
    maybeClearHistory(cookieStoreId) {
        let count = 0;
        const container = this.storage.local.tempContainers[cookieStoreId];
        if (container && container.deletesHistory && container.history) {
            const urls = Object.keys(container.history);
            count = urls.length;
            urls.map((url) => {
                if (!url) {
                    return;
                }
                this.debug('[maybeClearHistory] removing url from history', url);
                browser.history.deleteUrl({ url });
            });
        }
        return count;
    }
}
exports.History = History;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Isolation = void 0;
class Isolation {
    constructor(background) {
        this.background = background;
        this.debug = background.debug;
        this.reactivateInterval = 0;
    }
    initialize() {
        this.pref = this.background.pref;
        this.container = this.background.container;
        this.request = this.background.request;
        this.mouseclick = this.background.mouseclick;
        this.mac = this.background.mac;
        this.management = this.background.management;
        this.utils = this.background.utils;
        this.browseraction = this.background.browseraction;
        this.pageaction = this.background.pageaction;
        this.storage = this.background.storage;
        this.debug('[initialize] isolation initialized', this.storage.local.isolation);
        if (this.storage.local.isolation.reactivateTargetTime) {
            this.setActiveState(this.storage.local.isolation.reactivateTargetTime < new Date().getTime());
        }
    }
    async maybeIsolate({ tab, request, openerTab, macAssignment, }) {
        if (!this.getActiveState()) {
            this.debug('[maybeIsolate] isolation is disabled');
            return false;
        }
        if (tab &&
            request &&
            request.originUrl &&
            this.mac.isConfirmPage(request.originUrl)) {
            this.debug('[maybeIsolate] we are coming from a mac confirm page');
            this.mac.containerConfirmed[tab.id] = tab.cookieStoreId;
            return false;
        }
        if (this.mouseclick.isolated[request.url] &&
            tab &&
            tab.cookieStoreId !== `${this.background.containerPrefix}-default` &&
            this.container.urlCreatedContainer[request.url] === tab.cookieStoreId) {
            this.debug('[maybeIsolate] link click already created this container, we can stop here', request, tab);
            return false;
        }
        const isolate = await this.shouldIsolate({
            tab,
            request,
            openerTab,
            macAssignment,
        });
        if (!isolate) {
            this.debug('[maybeIsolate] decided to not isolate', tab, request);
            return false;
        }
        this.debug('[maybeIsolate] decided to isolate', tab, request);
        const excludedDomainPatterns = Object.keys(this.pref.isolation.global.excluded);
        if (excludedDomainPatterns.length) {
            const excluded = excludedDomainPatterns.find((excludedDomainPattern) => {
                return this.utils.matchDomainPattern(request.url, excludedDomainPattern);
            });
            if (excluded) {
                this.debug('[maybeIsolate] request url matches global excluded domain pattern', request, excludedDomainPatterns);
                return false;
            }
        }
        if (tab &&
            this.container.isPermanent(tab.cookieStoreId) &&
            this.pref.isolation.global.excludedContainers[tab.cookieStoreId]) {
            this.debug('[maybeIsolate] container on global excluded containers list', tab);
            return false;
        }
        if (macAssignment &&
            tab &&
            this.mac.containerConfirmed[tab.id] &&
            tab.cookieStoreId === this.mac.containerConfirmed[tab.id]) {
            this.debug('[maybeIsolate] mac confirmed container, not isolating', this.mac.containerConfirmed, macAssignment);
            return false;
        }
        this.debug('[maybeIsolate] isolating', tab, request);
        if (this.request.cancelRequest(request)) {
            this.debug('[maybeIsolate] canceling request');
            return { cancel: true };
        }
        if (macAssignment &&
            (!tab || (tab && tab.cookieStoreId !== macAssignment.cookieStoreId))) {
            this.debug('[maybeIsolate] decided to reopen but mac assigned, maybe reopen confirmpage', request, tab, macAssignment);
            this.mac.maybeReopenConfirmPage(macAssignment, request, tab, true);
            return false;
        }
        const params = {
            tab,
            url: request.url,
            request,
            deletesHistory: this.pref.deletesHistory.containerIsolation === 'automatic',
        };
        let reload = false;
        if (typeof isolate === 'object') {
            if (isolate.deletesHistory) {
                params.deletesHistory = true;
            }
            if (isolate.reload) {
                reload = true;
            }
        }
        if (tab &&
            (reload ||
                tab.url === 'about:home' ||
                tab.url === 'about:newtab' ||
                tab.url === 'about:blank' ||
                this.pref.replaceTabs)) {
            await this.container.reloadTabInTempContainer(params);
        }
        else {
            await this.container.createTabInTempContainer(params);
        }
        return { cancel: true };
    }
    async shouldIsolate({ tab, request, openerTab, macAssignment, }) {
        var _a;
        this.debug('[shouldIsolate]', tab, request);
        // special-case TST group tabs #264
        if (openerTab && ((_a = this.management.addons.get('treestyletab@piro.sakura.ne.jp')) === null || _a === void 0 ? void 0 : _a.enabled)) {
            try {
                const treeItem = await browser.runtime.sendMessage('treestyletab@piro.sakura.ne.jp', {
                    tab: openerTab.id,
                    type: 'get-tree',
                });
                if (treeItem && treeItem.states.includes('group-tab')) {
                    this.debug('[shouldIsolate] not isolating because originated from TST group tag', openerTab, tab, request);
                    return false;
                }
            }
            catch (error) {
                this.debug('[shouldIsolate] failed contacting TST', error.toString());
            }
        }
        return (this.shouldIsolateMouseClick({ request, tab, openerTab }) ||
            this.shouldIsolateMac({ tab, macAssignment }) ||
            (await this.shouldIsolateNavigation({ request, tab, openerTab })) ||
            (await this.shouldIsolateAlways({ request, tab, openerTab })));
    }
    shouldIsolateMouseClick({ request, tab, openerTab, }) {
        if (!this.mouseclick.isolated[request.url]) {
            return false;
        }
        if (tab &&
            ![tab.id, tab.openerTabId].includes(this.mouseclick.isolated[request.url].tab.id)) {
            this.debug('[shouldIsolateMouseClick] not isolating mouse click because tab/openerTab id is different', request, tab, openerTab, this.mouseclick.isolated[request.url].tab);
            return false;
        }
        this.debug('[beforeHandleRequest] decreasing isolated mouseclick count', this.mouseclick.isolated[request.url]);
        this.mouseclick.isolated[request.url].count--;
        if (this.mouseclick.isolated[request.url].count < 0) {
            this.debug('[shouldIsolateMouseClick] not isolating and removing isolated mouseclick because its count is < 0', this.mouseclick.isolated[request.url]);
            this.mouseclick.isolated[request.url].abortController.abort();
            delete this.mouseclick.isolated[request.url];
            return false;
        }
        const isolate = {};
        const clickType = this.mouseclick.isolated[request.url].clickType;
        if (this.pref.isolation.global.mouseClick[clickType].container ===
            'deleteshistory') {
            isolate.deletesHistory = true;
        }
        if (tab &&
            clickType === 'left' &&
            this.mouseclick.isolated[request.url].tab.id !== tab.id) {
            isolate.reload = true;
        }
        if (!this.mouseclick.isolated[request.url].count) {
            this.debug('[shouldIsolateMouseClick] removing isolated mouseclick because its count is 0', this.mouseclick.isolated[request.url]);
            this.mouseclick.isolated[request.url].abortController.abort();
            delete this.mouseclick.isolated[request.url];
        }
        this.debug('[shouldIsolateMouseClick] decided to isolate mouseclick', this.mouseclick.isolated[request.url]);
        return isolate;
    }
    async shouldIsolateNavigation({ request, tab, openerTab, }) {
        if (!tab || !tab.url) {
            this.debug('[shouldIsolateNavigation] we cant proceed without tab url information', tab, request);
            return false;
        }
        if ((tab.url === 'about:blank' ||
            tab.url === 'about:newtab' ||
            tab.url === 'about:home') &&
            !openerTab) {
            this.debug('[shouldIsolateNavigation] not isolating because the tab url is blank/newtab/home and no openerTab');
            return false;
        }
        if (openerTab &&
            tab.url === 'about:blank' &&
            this.container.isPermanent(tab.cookieStoreId) &&
            openerTab.cookieStoreId !== tab.cookieStoreId) {
            this.debug('[shouldIsolateNavigation] the tab loads a permanent container that is different from the openerTab, probaby explicitly selected in the context menu');
            return false;
        }
        const url = this.request.lastSeenRequestUrl[request.requestId] &&
            this.request.lastSeenRequestUrl[request.requestId] !== tab.url
            ? this.request.lastSeenRequestUrl[request.requestId]
            : (tab.url === 'about:blank' &&
                openerTab &&
                openerTab.url.startsWith('http') &&
                openerTab.url) ||
                tab.url;
        const parsedURL = url.startsWith('about:') || url.startsWith('moz-extension:')
            ? url
            : new URL(url).hostname;
        const parsedRequestURL = new URL(request.url);
        for (const patternPreferences of this.pref.isolation.domain) {
            const domainPattern = patternPreferences.pattern;
            if (!this.utils.matchDomainPattern((tab.url === 'about:blank' &&
                openerTab &&
                openerTab.url.startsWith('http') &&
                openerTab.url) ||
                tab.url, domainPattern)) {
                continue;
            }
            if (patternPreferences.excluded) {
                for (const excludedDomainPattern of Object.keys(patternPreferences.excluded)) {
                    if (!this.utils.matchDomainPattern(request.url, excludedDomainPattern)) {
                        continue;
                    }
                    this.debug('[shouldIsolateNavigation] not isolating because excluded domain pattern matches', request.url, excludedDomainPattern);
                    return false;
                }
            }
            if (patternPreferences.navigation) {
                const navigationPreferences = patternPreferences.navigation;
                this.debug('[shouldIsolateNavigation] found pattern', domainPattern, navigationPreferences);
                if (navigationPreferences.action === 'global') {
                    this.debug('[shouldIsolateNavigation] breaking because "global"');
                    break;
                }
                return await this.checkIsolationPreferenceAgainstUrl(navigationPreferences.action, parsedURL, parsedRequestURL.hostname);
            }
        }
        if (await this.checkIsolationPreferenceAgainstUrl(this.pref.isolation.global.navigation.action, parsedURL, parsedRequestURL.hostname)) {
            return true;
        }
        this.debug('[shouldIsolateNavigation] not isolating');
        return false;
    }
    async shouldIsolateAlways({ request, tab, openerTab, }) {
        if (!tab || !tab.url) {
            this.debug('[shouldIsolateAlways] we cant proceed without tab url information', tab, request);
            return false;
        }
        for (const patternPreferences of this.pref.isolation.domain) {
            const domainPattern = patternPreferences.pattern;
            if (!this.utils.matchDomainPattern(request.url, domainPattern)) {
                continue;
            }
            if (!patternPreferences.always) {
                continue;
            }
            const preferences = patternPreferences.always;
            this.debug('[shouldIsolateAlways] found pattern for incoming request url', domainPattern, preferences);
            if (preferences.action === 'disabled') {
                this.debug('[shouldIsolateAlways] not isolating because "always" disabled');
                continue;
            }
            if (preferences.allowedInPermanent &&
                this.container.isPermanent(tab.cookieStoreId)) {
                this.debug('[shouldIsolateAlways] not isolating because disabled in permanent container');
                continue;
            }
            const isTemporary = this.container.isTemporary(tab.cookieStoreId);
            if (!isTemporary) {
                this.debug('[shouldIsolateAlways] isolating because not in a tmp container');
                return true;
            }
            if (preferences.allowedInTemporary && isTemporary) {
                this.debug('[shouldIsolateAlways] not isolating because disabled in tmp container');
                return false;
            }
            if (!this.utils.matchDomainPattern(tab.url, domainPattern)) {
                let openerMatches = false;
                if (openerTab &&
                    openerTab.url.startsWith('http') &&
                    this.utils.matchDomainPattern(openerTab.url, domainPattern)) {
                    openerMatches = true;
                    this.debug('[shouldIsolateAlways] opener tab url matched the pattern', openerTab.url, domainPattern);
                }
                if (!openerMatches) {
                    this.debug('[shouldIsolateAlways] isolating because the tab/opener url doesnt match the pattern', tab.url, openerTab, domainPattern);
                    return true;
                }
            }
        }
        return false;
    }
    shouldIsolateMac({ tab, macAssignment, }) {
        if (this.pref.isolation.mac.action === 'disabled') {
            this.debug('[shouldIsolateMac] mac isolation disabled');
            return false;
        }
        if (tab && !this.container.isPermanent(tab.cookieStoreId)) {
            this.debug('[shouldIsolateMac] we are not in a permanent container');
            return false;
        }
        if (!macAssignment ||
            (macAssignment &&
                tab &&
                tab.cookieStoreId !== macAssignment.cookieStoreId)) {
            this.debug('[shouldIsolateMac] mac isolating because request url is not assigned to the tabs container');
            return true;
        }
        this.debug('[shouldIsolateMac] no mac isolation', tab, macAssignment);
        return false;
    }
    async checkIsolationPreferenceAgainstUrl(preference, origin, target) {
        this.debug('[checkIsolationPreferenceAgainstUrl]', preference, origin, target);
        switch (preference) {
            case 'always':
                this.debug('[checkIsolationPreferenceAgainstUrl] isolating based on "always"');
                return true;
            case 'notsamedomainexact':
                if (target !== origin) {
                    this.debug('[checkIsolationPreferenceAgainstUrl] isolating based on "notsamedomainexact"');
                    return true;
                }
            case 'notsamedomain':
                if (!this.utils.sameDomain(origin, target)) {
                    this.debug('[checkIsolationPreferenceAgainstUrl] isolating based on "notsamedomain"');
                    return true;
                }
        }
        return false;
    }
    getActiveState() {
        return this.storage.local.isolation.active;
    }
    setActiveState(active) {
        this.debug('[setActiveState] isolation', active);
        this.storage.local.isolation.active = active;
        this.storage.persist();
        if (active) {
            this.browseraction.removeIsolationInactiveBadge();
            this.reactivateStopInterval();
        }
        else {
            this.browseraction.addIsolationInactiveBadge();
            this.reactivateStartInterval();
        }
        this.pageaction.showOrHide();
    }
    toggleActiveState() {
        this.setActiveState(!this.getActiveState());
    }
    reactivateCheckTarget() {
        const diff = Math.round((this.storage.local.isolation.reactivateTargetTime -
            new Date().getTime()) /
            1000);
        if (diff <= 0) {
            this.reactivateStopInterval();
            this.setActiveState(true);
        }
        else if (diff <= 30 || diff % 10 == 0) {
            this.browseraction.addIsolationInactiveBadge(diff);
        }
    }
    reactivateStartInterval() {
        if (this.pref.isolation.reactivateDelay > 0) {
            this.debug('[reactivateStartInterval] isolation', this.storage.local.isolation);
            this.reactivateStopInterval();
            const reactivateTargetTime = this.storage.local.isolation
                .reactivateTargetTime;
            this.storage.local.isolation.reactivateTargetTime = reactivateTargetTime
                ? reactivateTargetTime
                : new Date().getTime() + this.pref.isolation.reactivateDelay * 1000;
            this.reactivateInterval = window.setInterval(() => {
                this.reactivateCheckTarget();
            }, 1000);
        }
    }
    reactivateStopInterval() {
        if (this.reactivateInterval) {
            window.clearInterval(this.reactivateInterval);
            this.reactivateInterval = 0;
        }
        this.storage.local.isolation.reactivateTargetTime = 0;
    }
}
exports.Isolation = Isolation;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiAccountContainers = void 0;
const lib_1 = __webpack_require__(4);
class MultiAccountContainers {
    constructor(background) {
        this.containerConfirmed = {};
        this.confirmPage = {};
        this.waitingForConfirmPage = {};
        this.background = background;
        this.debug = background.debug;
    }
    initialize() {
        this.pref = this.background.pref;
        this.storage = this.background.storage;
        this.container = this.background.container;
    }
    isConfirmPage(url) {
        return !!url.match(/moz-extension:\/\/[^/]*\/confirm-page.html\?url=/);
    }
    handleConfirmPage(tab) {
        if (tab && tab.id && this.container.tabCreatedAsMacConfirmPage[tab.id]) {
            this.debug('[handleConfirmPage] we reopened a confirmpage in that tab already', tab);
            return;
        }
        const multiAccountMatch = this.isConfirmPage(tab.url);
        if (multiAccountMatch) {
            this.debug('[handleConfirmPage] is intervening', tab, multiAccountMatch);
            const parsedURL = new URL(tab.url);
            const queryParams = parsedURL.search
                .split('&')
                .map((param) => param.split('='));
            const confirmPage = {
                tab,
                targetURL: decodeURIComponent(queryParams[0][1]),
                targetContainer: queryParams[1][1],
                currentContainer: queryParams[2] ? queryParams[2][1] : false,
            };
            this.debug('[handleConfirmPage] parsed url', queryParams, confirmPage);
            if (this.waitingForConfirmPage[confirmPage.targetContainer]) {
                this.debug('[handleConfirmPage] we are already waiting for this confirm page, maybe reopen', confirmPage.targetContainer);
                this._maybeReopenConfirmPage(this.waitingForConfirmPage[confirmPage.targetContainer], false, confirmPage);
            }
            else {
                this.debug('[handleConfirmPage] we remember that we saw this confirm page, maybe it needs to be reopened', confirmPage.targetContainer);
                this.confirmPage[confirmPage.targetContainer] = confirmPage;
                lib_1.delay(2000).then(() => {
                    this.debug('[handleConfirmPage] cleaning up', confirmPage);
                    delete this.confirmPage[confirmPage.targetContainer];
                });
            }
        }
    }
    async maybeReopenConfirmPage(macAssignment, request, tab, isolation = false) {
        const deletesHistoryContainer = this.pref.deletesHistory.automaticMode === 'automatic';
        this.debug('[maybeReopenConfirmPage]', macAssignment, request, tab, deletesHistoryContainer, this.container.tabCreatedAsMacConfirmPage);
        if ((tab && tab.id && this.container.tabCreatedAsMacConfirmPage[tab.id]) ||
            (request &&
                request.tabId &&
                this.container.tabCreatedAsMacConfirmPage[request.tabId])) {
            this.debug('[maybeReopenConfirmPage] we reopened a confirmpage in that tab / for that request.tabId already', tab, request);
            return false;
        }
        const targetContainer = `${this.background.containerPrefix}-container-${macAssignment.userContextId}`;
        if (this.confirmPage[targetContainer]) {
            this.debug('[maybeReopenConfirmPage] we saw a mac confirm page for the target container already', targetContainer, this.confirmPage[targetContainer]);
            if (tab && tab.cookieStoreId && tab.cookieStoreId === targetContainer) {
                this.debug('[maybeReopenConfirmPage] tab is loading in target container, we do nothing');
                return false;
            }
            else {
                return this._maybeReopenConfirmPage({
                    targetContainer,
                    request,
                    tab,
                    deletesHistoryContainer,
                }, isolation, false);
            }
        }
        else {
            this.debug('[maybeReopenConfirmPage] we didnt saw a mac confirm page yet, waiting', targetContainer, tab);
            this.waitingForConfirmPage[targetContainer] = {
                targetContainer,
                request,
                tab,
                deletesHistoryContainer,
            };
            lib_1.delay(2000).then(() => {
                this.debug('[maybeReopenConfirmPage] cleaning up', targetContainer);
                delete this.waitingForConfirmPage[targetContainer];
            });
            return false;
        }
    }
    async _maybeReopenConfirmPage({ targetContainer, request, tab, deletesHistoryContainer, }, isolation, confirmPage) {
        this.debug('[_maybeReopenConfirmPage]', targetContainer, request, tab, deletesHistoryContainer);
        if (this.waitingForConfirmPage[targetContainer]) {
            delete this.waitingForConfirmPage[targetContainer];
        }
        if (!confirmPage) {
            confirmPage = this.confirmPage[targetContainer];
        }
        if (!confirmPage) {
            this.debug('[_maybeReopenConfirmPage] something went wrong, aborting');
            return false;
        }
        const currentContainer = confirmPage.currentContainer;
        if (currentContainer) {
            if (!isolation && this.container.isPermanent(currentContainer)) {
                this.debug('[_maybeReopenConfirmPage] currentContainer is permanent, we do nothing');
                return false;
            }
            else if (this.storage.local.tempContainers[currentContainer] &&
                this.storage.local.tempContainers[currentContainer].clean) {
                this.debug('[_maybeReopenConfirmPage] the currentContainer mac confirm wants to open is a clean tmp container, we just cancel');
                return { clean: true };
            }
            else {
                this.debug('[_maybeReopenConfirmPage] currentContainer not clean, reopen in new tmp container');
            }
        }
        else {
            this.debug('[_maybeReopenConfirmPage] no currentContainer, reopen in new tmp container');
        }
        await this.container.reloadTabInTempContainer({
            tab: confirmPage.tab,
            url: request.url,
            deletesHistory: deletesHistoryContainer,
            request,
            macConfirmPage: true,
        });
        return true;
    }
    async getAssignment(url) {
        const assignment = await browser.runtime.sendMessage('@testpilot-containers', {
            method: 'getAssignment',
            url,
        });
        if (!assignment) {
            return assignment;
        }
        return {
            userContextId: assignment.userContextId,
            cookieStoreId: `${this.background.containerPrefix}-container-${assignment.userContextId}`,
            neverAsk: assignment.neverAsk,
        };
    }
}
exports.MultiAccountContainers = MultiAccountContainers;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Management = void 0;
const external_addons_1 = __webpack_require__(107);
class Management {
    constructor(background) {
        this.addons = external_addons_1.addons;
        this.debug = background.debug;
    }
    async initialize() {
        try {
            const extensions = await browser.management.getAll();
            extensions.map((extension) => {
                const addon = this.addons.get(extension.id);
                if (addon) {
                    addon.enabled = extension.enabled;
                    addon.version = extension.version;
                }
            });
        }
        catch (error) {
            this.debug('[management:initialize] couldnt getAll extensions', error);
            return;
        }
    }
    disable(extension) {
        const addon = this.addons.get(extension.id);
        if (addon) {
            addon.enabled = false;
            addon.version = extension.version;
        }
    }
    enable(extension) {
        const addon = this.addons.get(extension.id);
        if (addon && extension.enabled) {
            addon.enabled = true;
            addon.version = extension.version;
        }
    }
}
exports.Management = Management;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.addons = exports.CONTAIN_URLS = void 0;
exports.CONTAIN_URLS = new Map([
    [
        'facebook',
        {
            // https://github.com/mozilla/contain-facebook/blob/master/src/background.js
            urls: [
                'facebook.com',
                'www.facebook.com',
                'facebook.net',
                'fb.com',
                'fbcdn.net',
                'fbcdn.com',
                'fbsbx.com',
                'tfbnw.net',
                'facebook-web-clients.appspot.com',
                'fbcdn-profile-a.akamaihd.net',
                'fbsbx.com.online-metrix.net',
                'connect.facebook.net.edgekey.net',
                'instagram.com',
                'cdninstagram.com',
                'instagramstatic-a.akamaihd.net',
                'instagramstatic-a.akamaihd.net.edgesuite.net',
                'messenger.com',
                'm.me',
                'messengerdevelopers.com',
                'atdmt.com',
                'onavo.com',
                'oculus.com',
                'oculusvr.com',
                'oculusbrand.com',
                'oculusforbusiness.com',
            ],
            REs: [],
        },
    ],
    [
        'google',
        {
            // https://github.com/containers-everywhere/contain-google/blob/master/background.js
            urls: [
                'google.com',
                'google.org',
                'googleapis.com',
                'g.co',
                'ggpht.com',
                'blogger.com',
                'googleblog.com',
                'blog.google',
                'googleusercontent.com',
                'googlesource.com',
                'google.org',
                'google.net',
                '466453.com',
                'gooogle.com',
                'gogle.com',
                'ggoogle.com',
                'gogole.com',
                'goolge.com',
                'googel.com',
                'googlee.com',
                'googil.com',
                'googlr.com',
                'elgoog.im',
                'ai.google',
                'com.google',
                'google.ac',
                'google.ad',
                'google.ae',
                'google.com.af',
                'google.com.ag',
                'google.com.ai',
                'google.al',
                'google.am',
                'google.co.ao',
                'google.com.ar',
                'google.as',
                'google.at',
                'google.com.au',
                'google.az',
                'google.ba',
                'google.com.bd',
                'google.be',
                'google.bf',
                'google.bg',
                'google.com.bh',
                'google.bi',
                'google.bj',
                'google.com.bn',
                'google.com.bo',
                'google.com.br',
                'google.bs',
                'google.bt',
                'google.com.bw',
                'google.by',
                'google.com.bz',
                'google.ca',
                'google.com.kh',
                'google.cc',
                'google.cd',
                'google.cf',
                'google.cat',
                'google.cg',
                'google.ch',
                'google.ci',
                'google.co.ck',
                'google.cl',
                'google.cm',
                'google.cn',
                'google.com.co',
                'google.co.cr',
                'google.com.cu',
                'google.cv',
                'google.com.cy',
                'google.cz',
                'google.de',
                'google.dj',
                'google.dk',
                'google.dm',
                'google.com.do',
                'google.dz',
                'google.com.ec',
                'google.ee',
                'google.com.eg',
                'google.es',
                'google.com.et',
                'google.fi',
                'google.com.fj',
                'google.fm',
                'google.fr',
                'google.ga',
                'google.ge',
                'google.gf',
                'google.gg',
                'google.com.gh',
                'google.com.gi',
                'google.gl',
                'google.gm',
                'google.gp',
                'google.gr',
                'google.com.gt',
                'google.gy',
                'google.com.hk',
                'google.hn',
                'google.hr',
                'google.ht',
                'google.hu',
                'google.co.id',
                'google.iq',
                'google.ie',
                'google.co.il',
                'google.im',
                'google.co.in',
                'google.io',
                'google.is',
                'google.it',
                'google.je',
                'google.com.jm',
                'google.jo',
                'google.co.jp',
                'google.co.ke',
                'google.ki',
                'google.kg',
                'google.co.kr',
                'google.com.kw',
                'google.kz',
                'google.la',
                'google.lb',
                'google.com.lc',
                'google.li',
                'google.lk',
                'google.co.ls',
                'google.lt',
                'google.lu',
                'google.lv',
                'google.com.ly',
                'google.co.ma',
                'google.md',
                'google.me',
                'google.mg',
                'google.mk',
                'google.ml',
                'google.com.mm',
                'google.mn',
                'google.ms',
                'google.com.mt',
                'google.mu',
                'google.mv',
                'google.mw',
                'google.com.mx',
                'google.com.my',
                'google.co.mz',
                'google.com.na',
                'google.ne',
                'google.com.nf',
                'google.com.ng',
                'google.com.ni',
                'google.nl',
                'google.no',
                'google.com.np',
                'google.nr',
                'google.nu',
                'google.co.nz',
                'google.com.om',
                'google.com.pk',
                'google.com.pa',
                'google.com.pe',
                'google.com.ph',
                'google.pl',
                'google.com.pg',
                'google.pn',
                'google.com.pr',
                'google.ps',
                'google.pt',
                'google.com.py',
                'google.com.qa',
                'google.ro',
                'google.rs',
                'google.ru',
                'google.rw',
                'google.com.sa',
                'google.com.sb',
                'google.sc',
                'google.se',
                'google.com.sg',
                'google.sh',
                'google.si',
                'google.sk',
                'google.com.sl',
                'google.sn',
                'google.sm',
                'google.so',
                'google.st',
                'google.sr',
                'google.com.sv',
                'google.td',
                'google.tg',
                'google.co.th',
                'google.com.tj',
                'google.tk',
                'google.tl',
                'google.tm',
                'google.to',
                'google.tn',
                'google.com.tr',
                'google.tt',
                'google.com.tw',
                'google.co.tz',
                'google.com.ua',
                'google.co.ug',
                'google.co.uk',
                'google.us',
                'google.com.uy',
                'google.co.uz',
                'google.com.vc',
                'google.co.ve',
                'google.vg',
                'google.co.vi',
                'google.com.vn',
                'google.vu',
                'google.ws',
                'google.co.za',
                'google.co.zm',
                'google.co.zw',
                'like.com',
                'keyhole.com',
                'panoramio.com',
                'picasa.com',
                'urchin.com',
                'igoogle.com',
                'foofle.com',
                'froogle.com',
                'localguidesconnect.com',
                'googlemail.com',
                'googleanalytics.com',
                'google-analytics.com',
                'googletagmanager.com',
                'googlecode.com',
                'googlesource.com',
                'googledrive.com',
                'googlearth.com',
                'googleearth.com',
                'googlemaps.com',
                'googlepagecreator.com',
                'googlescholar.com',
                'advertisercommunity.com',
                'thinkwithgoogle.com',
                'youtube.com',
                'youtu.be',
                'yt.be',
                'ytimg.com',
                ' youtube-nocookie.com',
                'youtubegaming.com',
                'youtubeeducation.com',
                'youtube-nocookie.com',
                'blogspot.com',
                'blogspot.ae',
                'blogspot.al',
                'blogspot.am',
                'blogspot.com.ar',
                'blogspot.co.at',
                'blogspot.com.au',
                'blogspot.ba',
                'blogspot.be',
                'blogspot.bg',
                'blogspot.bj',
                'blogspot.com.br',
                'blogspot.com.by',
                'blogspot.ca',
                'blogspot.cf',
                'blogspot.ch',
                'blogspot.cl',
                'blogspot.com.co',
                'blogspot.cv',
                'blogspot.com.cy',
                'blogspot.cz',
                'blogspot.de',
                'blogspot.dj',
                'blogspot.dk',
                'blogspot.dm',
                'blogspot.com.do',
                'blogspot.dz',
                'blogspot.com.eg',
                'blogspot.es',
                'blogspot.fi',
                'blogspot.fr',
                'blogspot.gr',
                'blogspot.hr',
                'blogspot.hu',
                'blogspot.co.id',
                'blogspot.ie',
                'blogspot.co.il',
                'blogspot.in',
                'blogspot.is',
                'blogspot.it',
                'blogspot.jp',
                'blogspot.co.ke',
                'blogspot.kr',
                'blogspot.li',
                'blogspot.lt',
                'blogspot.lu',
                'blogspot.md',
                'blogspot.mk',
                'blogspot.com.mt',
                'blogspot.mx',
                'blogspot.my',
                'blogspot.com.ng',
                'blogspot.nl',
                'blogspot.no',
                'blogspot.co.nz',
                'blogspot.pt',
                'blogspot.qa',
                'blogspot.ro',
                'blogspot.rs',
                'blogspot.ru',
                'blogspot.se',
                'blogspot.sg',
                'blogspot.si',
                'blogspot.sk',
                'blogspot.sn',
                'blogspot.com.sr',
                'blogspot.td',
                'blogspot.co.tl',
                'blogspot.co.to',
                'blogspot.com.tr',
                'blogspot.tw',
                'blogspot.co.uk',
                'blogspot.com.uy',
                'blogspot.co.za',
                'abc.xyz',
                'waze.com',
                'capitalg.com',
                'gv.com',
                'calicolabs.com',
                'x.company',
                'nest.com',
                'sidewalklabs.com',
                'verily.com',
                'doubleclickbygoogle.com',
                'feedburner.com',
                'doubleclick.com',
                'doubleclick.net',
                'adwords.com',
                'adsense.com',
                'admob.com',
                'advertisercommunity.com',
                'googlesyndication.com',
                'googlecommerce.com',
                'googlebot.com',
                'googleapps.com',
                'googleadservices.com',
                'gmodules.com',
                'googl.com',
                '1e100.net',
                'domains.google',
                'gv.com',
                'madewithcode.com',
                'design.google',
                'gallery.io',
                'domains.google',
                'material.io',
                'android.com',
                'chromium.org',
                'cobrasearch.com',
                'chromecast.com',
                'chrome.com',
                'chromebook.com',
                'madewithcode.com',
                'whatbrowser.org',
                'withgoogle.com',
                'web.dev',
            ],
            REs: [],
        },
    ],
    [
        'twitter',
        {
            // https://github.com/v1shwa/contain-twitter/blob/master/background.js
            urls: [
                'twitter.com',
                'www.twitter.com',
                't.co',
                'twimg.com',
                'mobile.twitter.com',
                'm.twitter.com',
                'api.twitter.com',
                'abs.twimg.com',
                'ton.twimg.com',
                'pbs.twimg.com',
                'tweetdeck.twitter.com',
            ],
            REs: [],
        },
    ],
    [
        'youtube',
        {
            // https://github.com/AbdullahDiaa/contain-youtube/blob/master/src/background.js
            urls: ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'],
            REs: [],
        },
    ],
    [
        'amazon',
        {
            // https://github.com/Jackymancs4/contain-amazon/blob/master/background.js
            urls: [
                'amazon.it',
                'amazon.de',
                'amazon.com',
                'amazon.com.br',
                'amazon.in',
                'amazon.com.au',
                'amazon.es',
                'amazon.com.mx',
                'amazon.co.jp',
                'amazon.in',
                'amazon.co.uk',
                'amazon.ca',
                'amazon.fr',
                'amazon.com.sg',
                'awscloud.com',
                'amazon.company',
                'amazon.express',
                'amazon.gd',
                'amazon.international',
                'amazon.ltda',
                'amazon.press',
                'amazon.shopping',
                'amazon.tickets',
                'amazon.tv',
                'amazon.cruises',
                'amazon.dog',
                'amazon.express',
                'amazon.game',
                'amazon.gent',
                'amazon.salon',
                'amazon.shopping',
                'amazon.tours',
                'amazon.wiki',
                'amazon.clothing',
                'amazon.energy',
                'amazon.fund',
                'amazon.hockey',
                'amazon.kiwi',
                'amazon.re',
                'amazon.soccer',
                'amazon.tienda',
                'amazon.training',
                'amazon.jobs',
                'primevideo.com',
                'mturk.com',
                'lab126.com',
                'amazonpay.in',
                'amazonteam.org',
                'awsevents.com',
                'seattlespheres.com',
            ],
            REs: [],
        },
    ],
]);
exports.CONTAIN_URLS.forEach((containWhat) => {
    for (const url of containWhat.urls) {
        containWhat.REs.push(new RegExp(`^(.*\\.)?${url}$`));
    }
});
exports.addons = new Map([
    [
        '@testpilot-containers',
        {
            name: 'Firefox Multi-Account Containers',
            enabled: false,
            version: false,
        },
    ],
    [
        'containerise@kinte.sh',
        {
            name: 'Containerise',
            enabled: false,
            version: false,
        },
    ],
    [
        'block_outside_container@jspenguin.org',
        {
            name: 'Block sites outside container',
            enabled: false,
            version: false,
        },
    ],
    [
        'treestyletab@piro.sakura.ne.jp',
        {
            name: 'Tree Style Tab',
            enabled: false,
            version: false,
        },
    ],
    [
        '@contain-facebook',
        {
            name: 'Facebook Container',
            enabled: false,
            version: false,
            REs: (_a = exports.CONTAIN_URLS.get('facebook')) === null || _a === void 0 ? void 0 : _a.REs,
        },
    ],
    [
        '@contain-google',
        {
            name: 'Google Container',
            enabled: false,
            version: false,
            REs: (_b = exports.CONTAIN_URLS.get('google')) === null || _b === void 0 ? void 0 : _b.REs,
        },
    ],
    [
        '@contain-twitter',
        {
            name: 'Twitter Container',
            enabled: false,
            version: false,
            REs: (_c = exports.CONTAIN_URLS.get('twitter')) === null || _c === void 0 ? void 0 : _c.REs,
        },
    ],
    [
        '@contain-youtube',
        {
            name: 'YouTube Container',
            enabled: false,
            version: false,
            REs: (_d = exports.CONTAIN_URLS.get('youtube')) === null || _d === void 0 ? void 0 : _d.REs,
        },
    ],
    [
        '@contain-amazon',
        {
            name: 'Amazon Container',
            enabled: false,
            version: false,
            REs: (_e = exports.CONTAIN_URLS.get('amazon')) === null || _e === void 0 ? void 0 : _e.REs,
        },
    ],
]);


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration = void 0;
class Migration {
    constructor(background) {
        // migration-legacy
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
        this.onInstalled = () => { };
        this.background = background;
        this.debug = background.debug;
    }
    async migrate({ preferences, previousVersion, }) {
        this.storage = this.background.storage;
        this.utils = this.background.utils;
        this.previousVersion = previousVersion;
        if (!this.previousVersion) {
            await window.migrationLegacy(this);
        }
        this.debug('[migrate] previousVersion', this.previousVersion);
        this.previousVersionBeta = false;
        if (this.previousVersion.includes('beta')) {
            this.previousVersionBeta = true;
            this.previousVersion = this.previousVersion.replace('beta', '.');
        }
        if (this.updatedFromVersionEqualToOrLessThan('0.91')) {
            this.debug('updated from version <= 0.91, migrate container numbers into dedicated array');
            Object.values(this.storage.local.tempContainers).map((container) => {
                this.storage.local.tempContainersNumbers.push(container.number);
            });
        }
        if (this.updatedFromVersionEqualToOrLessThan('0.103', '1.0.1')) {
            this.debug('updated from version <= 0.103, migrate deletesHistory.active and ignoreRequestsTo');
            if (this.background.permissions.history) {
                preferences.deletesHistory.active = true;
            }
            if (preferences.ignoreRequestsToAMO === false) {
                preferences.ignoreRequests = preferences.ignoreRequests.filter((ignoredPattern) => ignoredPattern !== 'addons.mozilla.org');
            }
            if (preferences.ignoreRequestsToPocket === false) {
                preferences.ignoreRequests = preferences.ignoreRequests.filter((ignoredPattern) => ignoredPattern !== 'getpocket.com');
            }
            delete preferences.ignoreRequestsToAMO;
            delete preferences.ignoreRequestsToPocket;
        }
        if (this.updatedFromVersionEqualToOrLessThan('0.103', '1.0.6')) {
            this.debug('updated from version <= 0.103, migrate per domain isolation to array');
            const perDomainIsolation = [];
            Object.keys(preferences.isolation.domain).map((domainPattern) => {
                perDomainIsolation.push(Object.assign({
                    pattern: domainPattern,
                }, preferences.isolation.domain[domainPattern]));
            });
            preferences.isolation.domain = perDomainIsolation;
        }
        if (this.updatedFromVersionEqualToOrLessThan('0.103')) {
            this.debug('[migrate] updated from version <= 0.103, migrate popup default tab to isolation-per-domain');
            if (preferences.browserActionPopup || preferences.pageAction) {
                preferences.ui.popupDefaultTab = 'isolation-per-domain';
            }
        }
        if (this.updatedFromVersionEqualToOrLessThan('1.1')) {
            this.debug('[migrate] updated from version <= 1.1, migrate redirectorCloseTabs');
            preferences.closeRedirectorTabs.domains.push('slack-redir.net');
        }
        if (this.updatedFromVersionEqualToOrLessThan('1.3', '1.4.1')) {
            this.debug('[migrate] updated from version <= 1.3, migrate container.removal');
            switch (preferences.container.removal) {
                case 'instant':
                    preferences.container.removal = 0;
                    break;
                case '2minutes':
                    preferences.container.removal = 120000;
                    break;
                case '5minutes':
                    preferences.container.removal = 300000;
                    break;
                case '15minutes':
                    preferences.container.removal = 900000;
                    break;
            }
            switch (preferences.deletesHistory.containerRemoval) {
                case 'instant':
                    preferences.deletesHistory.containerRemoval = 0;
                    break;
                case '15minutes':
                    preferences.deletesHistory.containerRemoval = 900000;
                    break;
            }
        }
        if (this.updatedFromVersionEqualToOrLessThan('1.8')) {
            this.debug('[migrate] updated from version <= 1.8, migrate isolation.active');
            this.storage.local.isolation.active = preferences.isolation.active;
            delete preferences.isolation.active;
        }
        if (this.updatedFromVersionEqualToOrLessThan('1.9.1')) {
            this.debug('[migrate] updated from version <= 1.9.1, migrate isolation.automaticReactivate');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.storage.local.isolation.reactivateTargetTime = this.storage.local.isolation.automaticReactivateTargetTime;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            delete this.storage.local.isolation.automaticReactivateTargetTime;
            preferences.isolation.reactivateDelay =
                preferences.isolation.automaticReactivateDelay;
            delete preferences.isolation.automaticReactivateDelay;
        }
        if (this.updatedFromVersionEqualToOrLessThan('1.9.1')) {
            this.debug('[migrate] updated from version <= 1.9.1, migrate ui.popupDefaultTab');
            if (preferences.ui.popupDefaultTab === 'isolation-mac') {
                preferences.ui.popupDefaultTab = 'isolation-global';
            }
        }
        // hint: don't use preferences/storage-defaults here, ^
        // always hardcode, because the defaults change over time.
        // also keep in mind that missing keys get added before migration
        this.storage.local.version = this.background.version;
        this.storage.local.preferences = preferences;
        await this.storage.persist();
    }
    updatedFromVersionEqualToOrLessThan(compareVersion, compareBetaVersion = '') {
        if (compareBetaVersion && this.previousVersionBeta) {
            compareVersion = compareBetaVersion;
        }
        return this.utils.versionCompare(compareVersion, this.previousVersion) >= 0;
    }
}
exports.Migration = Migration;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationLegacy = void 0;
class MigrationLegacy {
    constructor(background) {
        const debug = background.debug;
        const migrationReadyAbortController = new AbortController();
        let migrationReady;
        let migrationReadyTimeout;
        const migrationReadyPromise = new Promise((resolve, reject) => {
            migrationReady = resolve;
            migrationReadyAbortController.signal.addEventListener('abort', () => {
                reject('[migration-legacy] waiting for migration ready timed out');
            });
        }).catch(debug);
        const migrationOnInstalledListener = async (...args) => {
            browser.runtime.onInstalled.removeListener(migrationOnInstalledListener);
            const { version } = await browser.storage.local.get('version');
            if (version) {
                clearTimeout(migrationReadyTimeout);
                debug('[migration-legacy] version found, skip', version);
                return;
            }
            await migrationReadyPromise;
            return background.migration.onInstalled.call(background.migration, ...args);
        };
        browser.runtime.onInstalled.addListener(migrationOnInstalledListener);
        window.migrationLegacy = async (migration) => {
            try {
                debug('[migration-legacy] no previousVersion found, waiting for onInstalled');
                const updateDetails = await new Promise((resolve, reject) => {
                    migration.onInstalled = resolve;
                    window.setTimeout(() => {
                        migrationReadyAbortController.abort();
                        reject();
                    }, 10000);
                    debug('[migration-legacy] ready');
                    migrationReady();
                });
                migration.previousVersion = updateDetails.previousVersion;
            }
            catch (error) {
                debug('[migration-legacy] waiting for onInstalled failed, assuming 0.103');
                migration.previousVersion = '0.103';
            }
        };
    }
}
exports.MigrationLegacy = MigrationLegacy;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseClick = void 0;
const lib_1 = __webpack_require__(4);
class MouseClick {
    constructor(background) {
        this.isolated = {};
        this.checkClickPreferences = (preferences, parsedClickedURL, parsedSenderTabURL) => {
            if (preferences.action === 'always') {
                this.debug('[checkClick] click handled based on preference "always"', preferences);
                return true;
            }
            if (preferences.action === 'never') {
                this.debug('[checkClickPreferences] click not handled based on preference "never"', preferences, parsedClickedURL, parsedSenderTabURL);
                return false;
            }
            if (preferences.action === 'notsamedomainexact') {
                if (parsedSenderTabURL.hostname !== parsedClickedURL.hostname) {
                    this.debug('[checkClickPreferences] click handled based on preference "notsamedomainexact"', preferences, parsedClickedURL, parsedSenderTabURL);
                    return true;
                }
                else {
                    this.debug('[checkClickPreferences] click not handled based on preference "notsamedomainexact"', preferences, parsedClickedURL, parsedSenderTabURL);
                    return false;
                }
            }
            if (preferences.action === 'notsamedomain') {
                if (this.utils.sameDomain(parsedSenderTabURL.hostname, parsedClickedURL.hostname)) {
                    this.debug('[checkClickPreferences] click not handled from preference "notsamedomain"', parsedClickedURL, parsedSenderTabURL);
                    return false;
                }
                else {
                    this.debug('[checkClickPreferences] click handled from preference "notsamedomain"', parsedClickedURL, parsedSenderTabURL);
                    return true;
                }
            }
            this.debug('[checkClickPreferences] this should never happen');
            return false;
        };
        this.background = background;
        this.debug = background.debug;
        this.isolated = {};
    }
    initialize() {
        this.pref = this.background.pref;
        this.utils = this.background.utils;
        this.isolation = this.background.isolation;
    }
    linkClicked(message, sender) {
        let clickType = false;
        const url = message.href;
        if (message.event.button === 1) {
            clickType = 'middle';
        }
        else if (message.event.button === 0 &&
            !message.event.ctrlKey &&
            !message.event.metaKey) {
            clickType = 'left';
        }
        else if (message.event.button === 0 &&
            (message.event.ctrlKey || message.event.metaKey)) {
            clickType = 'ctrlleft';
        }
        if (!clickType || !sender.tab) {
            return;
        }
        if (!this.checkClick(clickType, message, sender)) {
            return;
        }
        if (this.isolated[url]) {
            this.debug('[linkClicked] aborting isolated cleanup', url);
            this.isolated[url].abortController.abort();
        }
        const abortController = new AbortController();
        if (!this.isolated[url]) {
            this.isolated[url] = {
                clickType,
                tab: sender.tab,
                abortController,
                count: 0,
            };
        }
        this.isolated[url].count++;
        lib_1.delay(1500, { signal: abortController.signal })
            .then(() => {
            this.debug('[linkClicked] cleaning up isolated', url);
            delete this.isolated[url];
        })
            .catch(this.debug);
    }
    checkClick(type, message, sender) {
        const tab = sender.tab;
        const parsedSenderTabURL = new URL(tab.url);
        const parsedClickedURL = new URL(message.href);
        this.debug('[checkClick] checking click', type, message, sender);
        for (const domainPatternPreferences of this.pref.isolation.domain) {
            const domainPattern = domainPatternPreferences.pattern;
            if (!this.utils.matchDomainPattern(tab.url, domainPattern)) {
                continue;
            }
            if (!domainPatternPreferences.mouseClick[type]) {
                continue;
            }
            const preferences = domainPatternPreferences.mouseClick[type];
            this.debug('[checkClick] per website pattern found');
            if (preferences.action === 'global') {
                this.debug('[checkClick] breaking because "global"');
                break;
            }
            return this.checkClickPreferences(preferences, parsedClickedURL, parsedSenderTabURL);
        }
        this.debug('[checkClick] no website pattern found, checking global preferences');
        return this.checkClickPreferences(this.pref.isolation.global.mouseClick[type], parsedClickedURL, parsedSenderTabURL);
    }
    beforeHandleRequest(request) {
        if (!this.isolated[request.url]) {
            return;
        }
        this.debug('[beforeHandleRequest] aborting isolated mouseclick cleanup', request.url);
        this.isolated[request.url].abortController.abort();
    }
    afterHandleRequest(request) {
        if (!this.isolated[request.url]) {
            return;
        }
        this.isolated[request.url].abortController = new AbortController();
        lib_1.delay(1500, { signal: this.isolated[request.url].abortController.signal })
            .then(() => {
            this.debug('[beforeHandleRequest] cleaning up isolated', request.url);
            delete this.isolated[request.url];
        })
            .catch(this.debug);
    }
}
exports.MouseClick = MouseClick;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PageAction = void 0;
class PageAction {
    constructor(background) {
        this.background = background;
    }
    initialize() {
        this.pref = this.background.pref;
        this.storage = this.background.storage;
    }
    async showOrHide(activatedTab) {
        if (!activatedTab) {
            const [activeTab] = (await browser.tabs.query({
                currentWindow: true,
                active: true,
            }));
            activatedTab = activeTab;
        }
        let color;
        if (!this.background.isolation.getActiveState()) {
            color = 'warning-red';
        }
        else if (activatedTab.cookieStoreId ===
            `${this.background.containerPrefix}-default`) {
            color = 'gray';
        }
        else if (this.storage.local.tempContainers[activatedTab.cookieStoreId] &&
            this.storage.local.tempContainers[activatedTab.cookieStoreId].color) {
            color = this.storage.local.tempContainers[activatedTab.cookieStoreId]
                .color;
        }
        else {
            const container = await browser.contextualIdentities.get(activatedTab.cookieStoreId);
            color = container.color;
        }
        if (activatedTab === null || activatedTab === void 0 ? void 0 : activatedTab.id) {
            browser.pageAction.setIcon({
                path: {
                    '19': `icons/pageaction-${color}-19.svg`,
                    '38': `icons/pageaction-${color}-38.svg`,
                },
                tabId: activatedTab.id,
            });
            if (!this.pref.pageAction) {
                browser.pageAction.hide(activatedTab.id);
            }
            else {
                browser.pageAction.show(activatedTab.id);
            }
        }
    }
}
exports.PageAction = PageAction;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Preferences = void 0;
const shared_1 = __webpack_require__(5);
class Preferences {
    constructor(background) {
        this.defaults = {
            automaticMode: {
                active: false,
                newTab: 'created',
            },
            notifications: false,
            container: {
                namePrefix: 'tmp',
                color: 'toolbar',
                colorRandom: false,
                colorRandomExcluded: [],
                icon: 'circle',
                iconRandom: false,
                iconRandomExcluded: [],
                numberMode: 'keep',
                removal: 900000,
            },
            iconColor: 'default',
            isolation: {
                reactivateDelay: 0,
                global: {
                    navigation: {
                        action: 'never',
                    },
                    mouseClick: {
                        middle: {
                            action: 'never',
                            container: 'default',
                        },
                        ctrlleft: {
                            action: 'never',
                            container: 'default',
                        },
                        left: {
                            action: 'never',
                            container: 'default',
                        },
                    },
                    excluded: {},
                    excludedContainers: {},
                },
                domain: [],
                mac: {
                    action: 'disabled',
                },
            },
            browserActionPopup: false,
            pageAction: false,
            contextMenu: true,
            contextMenuBookmarks: false,
            keyboardShortcuts: {
                AltC: true,
                AltP: true,
                AltN: false,
                AltShiftC: false,
                AltX: false,
                AltO: false,
                AltI: false,
            },
            replaceTabs: false,
            closeRedirectorTabs: {
                active: false,
                delay: 2000,
                domains: shared_1.REDIRECTOR_DOMAINS_DEFAULT,
            },
            ignoreRequests: shared_1.IGNORED_DOMAINS_DEFAULT,
            cookies: {
                domain: {},
            },
            scripts: {
                active: false,
                domain: {},
            },
            deletesHistory: {
                active: false,
                automaticMode: 'never',
                contextMenu: false,
                contextMenuBookmarks: false,
                containerAlwaysPerDomain: 'never',
                containerIsolation: 'never',
                containerRemoval: 0,
                containerMouseClicks: 'never',
                statistics: false,
            },
            statistics: false,
            ui: {
                expandPreferences: false,
                popupDefaultTab: 'isolation-global',
            },
        };
        this.background = background;
    }
    initialize() {
        this.permissions = this.background.permissions;
        this.contextmenu = this.background.contextmenu;
        this.browseraction = this.background.browseraction;
        this.pageaction = this.background.pageaction;
        this.eventlisteners = this.background.eventlisteners;
    }
    async handleChanges({ oldPreferences, newPreferences, }) {
        if (oldPreferences.iconColor !== newPreferences.iconColor) {
            this.browseraction.setIcon(newPreferences.iconColor);
        }
        if (oldPreferences.browserActionPopup !== newPreferences.browserActionPopup) {
            if (newPreferences.browserActionPopup) {
                this.browseraction.setPopup();
            }
            else {
                this.browseraction.unsetPopup();
            }
        }
        if (oldPreferences.pageAction !== newPreferences.pageAction) {
            this.pageaction.showOrHide();
        }
        if (!this.permissions.notifications && newPreferences.notifications) {
            this.permissions.notifications = true;
        }
        if (!this.permissions.history && newPreferences.deletesHistory.active) {
            this.permissions.history = true;
        }
        if (newPreferences.contextMenuBookmarks ||
            newPreferences.deletesHistory.contextMenuBookmarks) {
            this.permissions.bookmarks = true;
        }
        if (!this.permissions.webNavigation && newPreferences.scripts.active) {
            this.permissions.webNavigation = true;
            this.eventlisteners.registerPermissionedListener();
        }
        if (oldPreferences.contextMenu !== newPreferences.contextMenu ||
            oldPreferences.contextMenuBookmarks !==
                newPreferences.contextMenuBookmarks ||
            oldPreferences.deletesHistory.contextMenu !==
                newPreferences.deletesHistory.contextMenu ||
            oldPreferences.deletesHistory.contextMenuBookmarks !==
                newPreferences.deletesHistory.contextMenuBookmarks) {
            await this.contextmenu.remove();
            this.contextmenu.add();
        }
    }
}
exports.Preferences = Preferences;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const lib_1 = __webpack_require__(4);
class Request {
    constructor(background) {
        this.lastSeenRequestUrl = {};
        this.canceledTabs = {};
        this.canceledRequests = {};
        this.requestIdUrlSeen = {};
        this.cleanRequests = {};
        this.background = background;
        this.debug = background.debug;
    }
    initialize() {
        this.pref = this.background.pref;
        this.container = this.background.container;
        this.mouseclick = this.background.mouseclick;
        this.browseraction = this.background.browseraction;
        this.mac = this.background.mac;
        this.isolation = this.background.isolation;
        this.management = this.background.management;
        this.history = this.background.history;
        this.utils = this.background.utils;
    }
    async webRequestOnBeforeRequest(request) {
        this.debug('[webRequestOnBeforeRequest] incoming request', request);
        const requestIdUrl = `${request.requestId}+${request.url}`;
        if (requestIdUrl in this.requestIdUrlSeen) {
            return false;
        }
        else {
            this.requestIdUrlSeen[requestIdUrl] = true;
            lib_1.delay(300000).then(() => {
                delete this.requestIdUrlSeen[requestIdUrl];
            });
        }
        this.mouseclick.beforeHandleRequest(request);
        let returnVal;
        try {
            returnVal = await this.handleRequest(request);
        }
        catch (error) {
            this.debug('[webRequestOnBeforeRequest] handling request failed', error.toString());
        }
        this.mouseclick.afterHandleRequest(request);
        if (!this.lastSeenRequestUrl[request.requestId]) {
            lib_1.delay(300000).then(() => {
                delete this.lastSeenRequestUrl[request.requestId];
            });
        }
        this.lastSeenRequestUrl[request.requestId] = request.url;
        if (typeof returnVal === 'object' && returnVal.cancel) {
            this.cancelRequest(request);
            return returnVal;
        }
        else if (!returnVal ||
            (typeof returnVal === 'object' && !returnVal.clean)) {
            this.container.markUnclean(request.tabId);
        }
        // make sure we shouldnt cancel anyway
        if (this.shouldCancelRequest(request)) {
            this.debug('[webRequestOnBeforeRequest] canceling', request);
            this.cancelRequest(request);
            return { cancel: true };
        }
        return;
    }
    async handleRequest(request) {
        var _a;
        if (request.tabId === -1) {
            this.debug('[handleRequest] onBeforeRequest request doesnt belong to a tab, why are you main_frame?', request);
            return false;
        }
        this.browseraction.removeBadge(request.tabId);
        if (this.shouldCancelRequest(request)) {
            this.debug('[handleRequest] canceling', request);
            return { cancel: true };
        }
        if (this.container.noContainerTabs[request.tabId]) {
            this.debug('[handleRequest] no container tab, we ignore that', request);
            return false;
        }
        let tab;
        let openerTab;
        try {
            tab = (await browser.tabs.get(request.tabId));
            if (tab && tab.openerTabId) {
                openerTab = (await browser.tabs.get(tab.openerTabId));
            }
            this.debug('[handleRequest] onbeforeRequest requested tab information', tab, openerTab);
        }
        catch (error) {
            this.debug('[handleRequest] onbeforeRequest retrieving tab information failed, mac was probably faster', error);
        }
        let macAssignment;
        if ((_a = this.management.addons.get('@testpilot-containers')) === null || _a === void 0 ? void 0 : _a.enabled) {
            try {
                macAssignment = await this.mac.getAssignment(request.url);
            }
            catch (error) {
                this.debug('[handleRequest] contacting mac failed, probably old version', error);
            }
        }
        if (macAssignment) {
            if (macAssignment.neverAsk) {
                this.debug('[handleRequest] mac neverask assigned', macAssignment);
                return false;
            }
            else {
                this.debug('[handleRequest] mac assigned', macAssignment);
            }
        }
        if (await this.externalAddonHasPrecedence({ request, tab, openerTab })) {
            return false;
        }
        this.history.maybeAddHistory(tab, request.url);
        if (this.pref.ignoreRequests.length &&
            this.pref.ignoreRequests.find((ignorePattern) => {
                return this.utils.matchDomainPattern(request.url, ignorePattern);
            })) {
            this.debug('[handleRequest] request url is on the ignoreRequests list', request);
            return false;
        }
        if (tab && this.container.isClean(tab.cookieStoreId)) {
            // removing this clean check can result in endless loops
            this.debug('[handleRequest] not isolating because the tmp container is still clean');
            if (!this.cleanRequests[request.requestId]) {
                this.cleanRequests[request.requestId] = true;
                lib_1.delay(300000).then(() => {
                    delete this.cleanRequests[request.requestId];
                });
            }
            return false;
        }
        if (this.cleanRequests[request.requestId]) {
            this.debug('[handleRequest] not isolating because of clean redirect requests', request);
            return false;
        }
        const isolated = await this.isolation.maybeIsolate({
            tab,
            request,
            openerTab,
            macAssignment,
        });
        if (isolated) {
            this.debug('[handleRequest] we decided to isolate and open new tmpcontainer', request);
            return isolated;
        }
        if (!this.pref.automaticMode.active || !tab) {
            return false;
        }
        if (tab &&
            tab.cookieStoreId !== `${this.background.containerPrefix}-default`) {
            this.debug('[handleRequest] onBeforeRequest tab belongs to a non-default container', tab, request);
            return false;
        }
        if (macAssignment) {
            this.debug('[handleRequest] decided to reopen but mac assigned, maybe reopen confirmpage', request, tab, macAssignment);
            return this.mac.maybeReopenConfirmPage(macAssignment, request, tab);
        }
        this.debug('[handleRequest] decided to reload in temp tab', tab, request);
        if (this.cancelRequest(request)) {
            return { cancel: true };
        }
        this.debug('[handleRequest] reload in temp tab', tab, request);
        await this.container.reloadTabInTempContainer({
            tab,
            url: request.url,
            deletesHistory: this.pref.deletesHistory.automaticMode === 'automatic',
            request,
            dontPin: false,
        });
        return { cancel: true };
    }
    cancelRequest(request) {
        if (!request ||
            typeof request.requestId === 'undefined' ||
            typeof request.tabId === 'undefined') {
            this.debug('[cancelRequest] invalid request', request);
            return false;
        }
        if (!this.canceledRequests[request.requestId]) {
            this.canceledRequests[request.requestId] = true;
            // requestIds are unique per session, so we have no pressure to remove them
            setTimeout(() => {
                this.debug('[webRequestOnBeforeRequest] cleaning up canceledRequests', request);
                delete this.canceledRequests[request.requestId];
            }, 300000);
        }
        if (!this.canceledTabs[request.tabId]) {
            this.debug('[cancelRequest] marked request as canceled', request);
            // workaround until https://bugzilla.mozilla.org/show_bug.cgi?id=1437748 is resolved
            this.canceledTabs[request.tabId] = {
                requestIds: {
                    [request.requestId]: true,
                },
                urls: {
                    [request.url]: true,
                },
            };
            // cleanup canceledTabs later
            setTimeout(() => {
                this.debug('[webRequestOnBeforeRequest] cleaning up canceledTabs', request);
                delete this.canceledTabs[request.tabId];
            }, 2000);
            return false;
        }
        else {
            this.debug('[cancelRequest] already canceled', request, this.canceledTabs);
            let cancel = false;
            if (this.shouldCancelRequest(request)) {
                // same requestId or url from the same tab, this is a redirect that we have to cancel to prevent opening two tabs
                cancel = true;
                this.debug('[cancelRequest] probably redirect, aborting', request);
            }
            // we decided to cancel the request at this point, register canceled request
            this.canceledTabs[request.tabId].requestIds[request.requestId] = true;
            this.canceledTabs[request.tabId].urls[request.url] = true;
            return cancel;
        }
    }
    shouldCancelRequest(request) {
        if (!request ||
            typeof request.requestId === 'undefined' ||
            typeof request.tabId === 'undefined') {
            this.debug('[shouldCancelRequest] invalid request', request);
            return false;
        }
        if (this.canceledRequests[request.requestId] ||
            (this.canceledTabs[request.tabId] &&
                (this.canceledTabs[request.tabId].requestIds[request.requestId] ||
                    this.canceledTabs[request.tabId].urls[request.url]))) {
            return true;
        }
        return false;
    }
    cleanupCanceled(request) {
        if (this.canceledTabs[request.tabId]) {
            delete this.canceledTabs[request.tabId];
        }
    }
    async externalAddonHasPrecedence({ request, tab, openerTab, }) {
        var _a, _b;
        const parsedUrl = new URL(request.url);
        if ((_a = this.management.addons.get('containerise@kinte.sh')) === null || _a === void 0 ? void 0 : _a.enabled) {
            try {
                const hostmap = await browser.runtime.sendMessage('containerise@kinte.sh', {
                    method: 'getHostMap',
                    url: request.url,
                });
                if (typeof hostmap === 'object' &&
                    hostmap.cookieStoreId &&
                    hostmap.enabled) {
                    this.debug('[handleRequest] assigned with containerise we do nothing', hostmap);
                    return true;
                }
                else {
                    this.debug('[handleRequest] not assigned with containerise', hostmap);
                }
            }
            catch (error) {
                this.debug('[handleRequest] contacting containerise failed, probably old version', error);
            }
        }
        if ((_b = this.management.addons.get('block_outside_container@jspengun.org')) === null || _b === void 0 ? void 0 : _b.enabled) {
            try {
                const response = await browser.runtime.sendMessage('block_outside_container@jspenguin.org', {
                    action: 'rule_exists',
                    domain: parsedUrl.hostname,
                });
                if (response.rule_exists) {
                    this.debug('[handleRequest] assigned with block_outside_container we do nothing');
                    return true;
                }
                else {
                    this.debug('[handleRequest] not assigned with block_outside_container');
                }
            }
            catch (error) {
                this.debug('[handleRequest] contacting block_outside_container failed', error);
            }
        }
        const parsedTabUrl = tab && /^https?:/.test(tab.url) && new URL(tab.url);
        const parsedOpenerTabUrl = openerTab && /^https?:/.test(openerTab.url) && new URL(openerTab.url);
        for (const containWhat of [
            '@contain-facebook',
            '@contain-google',
            '@contain-twitter',
            '@contain-youtube',
            '@contain-amazon',
        ]) {
            const addon = this.management.addons.get(containWhat);
            if (!addon || !addon.enabled || !addon.REs) {
                continue;
            }
            for (const RE of addon.REs) {
                if (RE.test(parsedUrl.hostname) ||
                    (parsedTabUrl && RE.test(parsedTabUrl.hostname)) ||
                    (parsedOpenerTabUrl && RE.test(parsedOpenerTabUrl.hostname))) {
                    this.debug('[handleRequest] handled by active container addon, ignoring', containWhat, RE, request.url);
                    return true;
                }
            }
        }
        return false;
    }
}
exports.Request = Request;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = void 0;
const lib_1 = __webpack_require__(4);
class Runtime {
    constructor(background) {
        this.background = background;
        this.debug = background.debug;
        this.storage = background.storage;
    }
    initialize() {
        this.pref = this.background.pref;
        this.preferences = this.background.preferences;
        this.container = this.background.container;
        this.mouseclick = this.background.mouseclick;
        this.browseraction = this.background.browseraction;
        this.migration = this.background.migration;
        this.contextmenu = this.background.contextmenu;
        this.cleanup = this.background.cleanup;
        this.convert = this.background.convert;
        this.isolation = this.background.isolation;
        this.utils = this.background.utils;
    }
    async onMessage(message, sender) {
        this.debug('[onMessage] message received', message, sender);
        if (typeof message !== 'object') {
            return;
        }
        switch (message.method) {
            case 'linkClicked':
                this.debug('[onMessage] link clicked');
                this.mouseclick.linkClicked(message.payload, sender);
                break;
            case 'saveIsolation':
                this.debug('[onMessage] saveIsolation');
                this.isolation.setActiveState(message.payload.isolation.active);
                break;
            case 'savePreferences':
                this.debug('[onMessage] savePreferences');
                await this.preferences.handleChanges({
                    oldPreferences: this.pref,
                    newPreferences: message.payload.preferences,
                });
                this.storage.local.preferences = message.payload.preferences;
                await this.storage.persist();
                if ((await browser.tabs.query({
                    url: browser.runtime.getURL('options.html'),
                })).length) {
                    browser.runtime.sendMessage({
                        info: 'preferencesUpdated',
                        fromTabId: sender && sender.tab && sender.tab.id,
                    });
                }
                break;
            case 'importPreferences': {
                const oldPreferences = this.utils.clone(this.storage.local.preferences);
                if (this.background.utils.addMissingKeys({
                    defaults: this.preferences.defaults,
                    source: message.payload.preferences,
                })) {
                    await this.storage.persist();
                }
                await this.migration.migrate({
                    preferences: message.payload.preferences,
                    previousVersion: message.payload.previousVersion,
                });
                await this.preferences.handleChanges({
                    oldPreferences,
                    newPreferences: this.pref,
                });
                break;
            }
            case 'resetStatistics':
                this.debug('[onMessage] resetting statistics');
                this.storage.local.statistics = this.utils.clone(this.storage.defaults.statistics);
                this.storage.local.statistics.startTime = new Date();
                await this.storage.persist();
                break;
            case 'resetStorage':
                this.debug('[onMessage] resetting storage', message, sender);
                this.browseraction.unsetPopup();
                this.contextmenu.remove();
                this.browseraction.setIcon('default');
                await browser.storage.local.clear();
                return this.storage.install();
            case 'resetContainerNumber':
                this.debug('[onMessage] resetting container number', message, sender);
                this.storage.local.tempContainerCounter = 0;
                await this.storage.persist();
                break;
            case 'createTabInTempContainer':
                return this.container.createTabInTempContainer({
                    url: message.payload ? message.payload.url : undefined,
                    deletesHistory: message.payload
                        ? message.payload.deletesHistory
                        : undefined,
                });
            case 'convertTempContainerToPermanent':
                return this.convert.convertTempContainerToPermanent({
                    cookieStoreId: message.payload.cookieStoreId,
                    tabId: message.payload.tabId,
                    name: message.payload.name,
                });
            case 'convertTempContainerToRegular':
                return this.convert.convertTempContainerToRegular({
                    cookieStoreId: message.payload.cookieStoreId,
                    tabId: message.payload.tabId,
                });
            case 'convertPermanentToTempContainer':
                return this.convert.convertPermanentToTempContainer({
                    cookieStoreId: message.payload.cookieStoreId,
                    tabId: message.payload.tabId,
                });
            case 'lastFileExport':
                this.storage.local.lastFileExport = message.payload.lastFileExport;
                return this.storage.persist();
            case 'ping':
                return 'pong';
        }
    }
    async onMessageExternal(message, sender) {
        this.debug('[onMessageExternal] got external message', message, sender);
        switch (message.method) {
            case 'createTabInTempContainer':
                return this.container.createTabInTempContainer({
                    url: message.url || undefined,
                    active: message.active,
                    deletesHistory: this.pref.deletesHistory.automaticMode === 'automatic'
                        ? true
                        : false,
                });
            case 'isTempContainer':
                return message.cookieStoreId &&
                    this.storage.local.tempContainers[message.cookieStoreId]
                    ? true
                    : false;
            default:
                throw new Error('Unknown message.method');
        }
    }
    async onStartup() {
        lib_1.delay(10000).then(() => this.cleanup.cleanup(true));
        if (this.pref.container.numberMode === 'keepuntilrestart') {
            this.storage.local.tempContainerCounter = 0;
            this.storage.persist();
        }
    }
}
exports.Runtime = Runtime;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Scripts = void 0;
class Scripts {
    constructor(background) {
        this.background = background;
        this.debug = background.debug;
        this.container = background.container;
    }
    initialize() {
        this.pref = this.background.pref;
        this.utils = this.background.utils;
    }
    async maybeExecute(request) {
        if (!Object.keys(this.pref.scripts.domain).length) {
            return;
        }
        const tab = (await browser.tabs.get(request.tabId));
        if (!this.container.isTemporary(tab.cookieStoreId)) {
            return;
        }
        for (const domainPattern in this.pref.scripts.domain) {
            if (!this.utils.matchDomainPattern(request.url, domainPattern)) {
                continue;
            }
            for (const script of this.pref.scripts.domain[domainPattern]) {
                try {
                    this.debug('[maybeExecute] executing script', request);
                    await browser.tabs.executeScript(request.tabId, script);
                }
                catch (error) {
                    this.debug('[maybeExecute] executing script failed', error.toString());
                }
            }
        }
    }
}
exports.Scripts = Scripts;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistics = void 0;
const shared_1 = __webpack_require__(5);
class Statistics {
    constructor(background) {
        this.removedContainerCount = 0;
        this.removedContainerCookiesCount = 0;
        this.removedContainerHistoryCount = 0;
        this.removedContentLength = 0;
        this.requests = {};
        this.background = background;
        this.debug = background.debug;
    }
    initialize() {
        this.pref = this.background.pref;
        this.storage = this.background.storage;
        this.container = this.background.container;
        this.cleanup = this.background.cleanup;
    }
    async collect(request) {
        if (!this.pref.statistics && !this.pref.deletesHistory.statistics) {
            return;
        }
        if (request.tabId === -1) {
            return;
        }
        let tab;
        try {
            tab = (await browser.tabs.get(request.tabId));
        }
        catch (error) {
            return;
        }
        if (!this.container.isTemporary(tab.cookieStoreId)) {
            return;
        }
        if (!this.requests[tab.cookieStoreId]) {
            this.requests[tab.cookieStoreId] = {
                contentLength: 0,
            };
        }
        if (!request.fromCache && request.responseHeaders) {
            const contentLength = request.responseHeaders.find((header) => header.name === 'content-length');
            if (contentLength && contentLength.value) {
                this.requests[tab.cookieStoreId].contentLength += parseInt(contentLength.value, 10);
            }
        }
    }
    async update(historyClearedCount, cookieStoreId) {
        this.removedContainerCount++;
        let cookieCount = 0;
        try {
            const cookies = await browser.cookies.getAll({ storeId: cookieStoreId });
            cookieCount = cookies.length;
        }
        catch (error) {
            this.debug('[tryToRemove] couldnt get cookies', cookieStoreId, error);
        }
        if (historyClearedCount) {
            this.removedContainerHistoryCount += historyClearedCount;
        }
        if (this.pref.statistics) {
            this.storage.local.statistics.containersDeleted++;
        }
        if (this.pref.deletesHistory.statistics &&
            this.container.isTemporary(cookieStoreId, 'deletesHistory')) {
            this.storage.local.statistics.deletesHistory.containersDeleted++;
            if (historyClearedCount) {
                this.storage.local.statistics.deletesHistory.urlsDeleted += historyClearedCount;
            }
            if (cookieCount) {
                this.storage.local.statistics.deletesHistory.cookiesDeleted += cookieCount;
            }
        }
        if (cookieCount) {
            if (this.pref.statistics) {
                this.storage.local.statistics.cookiesDeleted += cookieCount;
            }
            this.removedContainerCookiesCount += cookieCount;
        }
        if (this.requests[cookieStoreId] &&
            this.requests[cookieStoreId].contentLength) {
            if (this.pref.statistics) {
                this.storage.local.statistics.cacheDeleted += this.requests[cookieStoreId].contentLength;
            }
            this.removedContentLength += this.requests[cookieStoreId].contentLength;
        }
        delete this.requests[cookieStoreId];
    }
    finish() {
        if (this.removedContainerCount) {
            let notificationMessage = `Deleted Temporary Containers: ${this.removedContainerCount}`;
            if (this.removedContainerCookiesCount) {
                notificationMessage += `\nand ${this.removedContainerCookiesCount} Cookies`;
            }
            if (this.removedContentLength) {
                notificationMessage += `\nand ~${shared_1.formatBytes(this.removedContentLength)} Cache`;
            }
            if (this.removedContainerHistoryCount) {
                notificationMessage += `\nand ${this.removedContainerHistoryCount} URLs from History`;
            }
            this.cleanup.maybeShowNotification(notificationMessage);
        }
        this.removedContainerCount = 0;
        this.removedContainerCookiesCount = 0;
        this.removedContainerHistoryCount = 0;
        this.removedContentLength = 0;
    }
}
exports.Statistics = Statistics;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
class Storage {
    constructor(background) {
        this.background = background;
        this.debug = background.debug;
        this.installed = false;
        this.defaults = {
            containerPrefix: false,
            tempContainerCounter: 0,
            tempContainers: {},
            tempContainersNumbers: [],
            statistics: {
                startTime: new Date(),
                containersDeleted: 0,
                cookiesDeleted: 0,
                cacheDeleted: 0,
                deletesHistory: {
                    containersDeleted: 0,
                    cookiesDeleted: 0,
                    urlsDeleted: 0,
                },
            },
            isolation: {
                active: true,
                reactivateTargetTime: 0,
            },
            preferences: background.preferences.defaults,
            lastFileExport: false,
            version: false,
        };
    }
    async initialize() {
        this.local = (await browser.storage.local.get());
        // empty storage *should* mean new install
        if (!this.local || !Object.keys(this.local).length) {
            return this.install();
        }
        // check for managed preferences
        try {
            const managed = await browser.storage.managed.get();
            if (managed && Object.keys(managed).length) {
                this.local.version = managed.version;
                this.local.preferences = managed.preferences;
                await this.persist();
            }
        }
        catch (error) {
            this.debug('[initialize] accessing managed storage failed:', error.toString());
        }
        this.debug('[initialize] storage initialized', this.local);
        if (this.background.utils.addMissingKeys({
            defaults: this.defaults,
            source: this.local,
        })) {
            await this.persist();
        }
        // migrate if currently running version is different from version in storage
        if (this.local.version && this.background.version !== this.local.version) {
            try {
                await this.background.migration.migrate({
                    preferences: this.local.preferences,
                    previousVersion: this.local.version,
                });
            }
            catch (error) {
                this.debug('[initialize] migration failed', error.toString());
            }
        }
        return true;
    }
    async persist() {
        try {
            if (!this.local || !Object.keys(this.local).length) {
                this.debug('[persist] tried to persist corrupt storage', this.local);
                return false;
            }
            await browser.storage.local.set(this.local);
            this.debug('[persist] storage persisted');
            return true;
        }
        catch (error) {
            this.debug('[persist] something went wrong while trying to persist the storage', error);
            return false;
        }
    }
    async install() {
        this.debug('[install] installing storage');
        this.local = this.background.utils.clone(this.defaults);
        this.local.version = this.background.version;
        if (!(await this.persist())) {
            throw new Error('[install] something went wrong while installing');
        }
        this.debug('[install] storage installed', this.local);
        this.installed = true;
        return true;
    }
}
exports.Storage = Storage;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = void 0;
const lib_1 = __webpack_require__(4);
class Tabs {
    constructor(background) {
        this.creatingInSameContainer = false;
        this.containerMap = new Map();
        this.containerTabs = new Map();
        this.background = background;
        this.debug = background.debug;
    }
    async initialize() {
        this.pref = this.background.pref;
        this.container = this.background.container;
        this.browseraction = this.background.browseraction;
        this.pageaction = this.background.pageaction;
        this.mac = this.background.mac;
        this.history = this.background.history;
        this.cleanup = this.background.cleanup;
        const tabs = (await browser.tabs.query({}));
        tabs.forEach((tab) => this.registerTab(tab));
    }
    // onUpdated sometimes (often) fires before onCreated
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1586612
    async onCreated(tab) {
        this.debug('[onCreated] tab created', tab);
        this.registerTab(tab);
        const reopened = await this.maybeReopenInTmpContainer(tab);
        if (!reopened) {
            this.maybeMoveTab(tab);
        }
    }
    async onUpdated(tabId, changeInfo, tab) {
        this.debug('[onUpdated] tab updated', tab, changeInfo);
        this.maybeCloseRedirectorTab(tab, changeInfo);
        if (changeInfo.url) {
            this.debug('[onUpdated] url changed', changeInfo);
            this.history.maybeAddHistory(tab, changeInfo.url);
            const reopened = await this.maybeReopenInTmpContainer(tab);
            if (!reopened) {
                this.pageaction.showOrHide(tab);
            }
        }
    }
    async onRemoved(tabId) {
        this.debug('[onRemoved]', tabId);
        if (this.container.noContainerTabs[tabId]) {
            delete this.container.noContainerTabs[tabId];
        }
        if (this.container.tabCreatedAsMacConfirmPage[tabId]) {
            delete this.container.tabCreatedAsMacConfirmPage[tabId];
        }
        const tmpCookieStoreId = this.containerMap.get(tabId);
        if (tmpCookieStoreId) {
            this.unregisterTab(tabId, tmpCookieStoreId);
            this.debug('[onRemoved] queuing container removal because of tab removal', tabId);
            this.cleanup.addToRemoveQueue(tmpCookieStoreId);
        }
    }
    async onActivated(activeInfo) {
        this.debug('[onActivated]', activeInfo);
        delete this.container.lastCreatedInactiveTab[browser.windows.WINDOW_ID_CURRENT];
        const activatedTab = (await browser.tabs.get(activeInfo.tabId));
        this.pageaction.showOrHide(activatedTab);
    }
    registerTab(tab) {
        if (!this.container.isTemporary(tab.cookieStoreId)) {
            return;
        }
        this.containerMap.set(tab.id, tab.cookieStoreId);
        const containerTabs = this.containerTabs.get(tab.cookieStoreId);
        if (containerTabs) {
            containerTabs.add(tab.id);
        }
        else {
            this.containerTabs.set(tab.cookieStoreId, new Set([tab.id]));
        }
    }
    unregisterTab(tabId, cookieStoreId) {
        const containerTabs = this.containerTabs.get(cookieStoreId);
        if (containerTabs) {
            containerTabs.delete(tabId);
            if (!containerTabs.size) {
                this.containerTabs.delete(cookieStoreId);
            }
        }
        this.containerMap.delete(tabId);
    }
    async handleAlreadyOpen() {
        const tabs = (await browser.tabs.query({}));
        return Promise.all(tabs.map((tab) => this.maybeReopenInTmpContainer(tab)));
    }
    async maybeReopenInTmpContainer(tab) {
        if (this.creatingInSameContainer) {
            this.debug('[maybeReopenInTmpContainer] we are in the process of creating a tab in same container, ignore', tab);
            return;
        }
        if (this.container.noContainerTabs[tab.id]) {
            this.debug('[maybeReopenInTmpContainer] nocontainer tab, ignore', tab);
            return;
        }
        if (tab.url.startsWith('moz-extension://')) {
            this.debug('[maybeReopenInTmpContainer] moz-extension url', tab);
            await this.mac.handleConfirmPage(tab);
            return;
        }
        if (!this.pref.automaticMode.active) {
            this.debug('[maybeReopenInTmpContainer] automatic mode not active, we ignore that', tab);
            return;
        }
        if (tab.url !== 'about:home' && tab.url !== 'about:newtab') {
            this.debug('[maybeReopenInTmpContainer] not a home/new tab, we dont handle that', tab);
            return;
        }
        const deletesHistory = this.pref.deletesHistory.automaticMode === 'automatic';
        if (tab.cookieStoreId === `${this.background.containerPrefix}-default`) {
            if (this.pref.automaticMode.newTab === 'navigation' && !deletesHistory) {
                this.debug('[maybeReopenInTmpContainer] automatic mode on navigation, setting icon badge', tab);
                this.browseraction.addBadge(tab.id);
                return;
            }
            if (this.pref.automaticMode.newTab === 'created' || deletesHistory) {
                this.debug('[maybeReopenInTmpContainer] about:home/new tab in firefox-default container, reload in temp container', tab);
                await this.container.reloadTabInTempContainer({
                    tab,
                    deletesHistory,
                });
                return true;
            }
        }
        if (tab.url === 'about:home' &&
            this.container.isTemporary(tab.cookieStoreId) &&
            this.pref.automaticMode.newTab === 'navigation') {
            this.debug('[maybeReopenInTmpContainer] about:home and automatic mode on navigation but already in tmp container, open in default container', tab);
            await browser.tabs.create({
                cookieStoreId: `${this.background.containerPrefix}-default`,
            });
            await this.remove(tab);
            this.browseraction.addBadge(tab.id);
            return true;
        }
    }
    async maybeCloseRedirectorTab(tab, changeInfo) {
        if (!this.pref.closeRedirectorTabs.active ||
            changeInfo.status !== 'complete') {
            return;
        }
        const url = new URL(tab.url);
        if (!this.pref.closeRedirectorTabs.domains.includes(url.hostname)) {
            return;
        }
        await lib_1.delay(this.pref.closeRedirectorTabs.delay);
        // check the tab url again to make sure the tab didn't change its url
        const redirTab = (await browser.tabs.get(tab.id));
        const redirUrl = new URL(redirTab.url);
        if (!this.pref.closeRedirectorTabs.domains.includes(redirUrl.hostname)) {
            return;
        }
        this.debug('[onUpdated] removing redirector tab', changeInfo, redirTab);
        this.remove(redirTab);
    }
    async maybeMoveTab(tab) {
        if (!tab.active &&
            this.container.lastCreatedInactiveTab[browser.windows.WINDOW_ID_CURRENT] &&
            this.container.lastCreatedInactiveTab[browser.windows.WINDOW_ID_CURRENT] !== tab.id) {
            try {
                const lastCreatedInactiveTab = await browser.tabs.get(this.container.lastCreatedInactiveTab[browser.windows.WINDOW_ID_CURRENT]);
                if (lastCreatedInactiveTab.index > tab.index) {
                    this.debug('[onCreated] moving tab', lastCreatedInactiveTab, tab);
                    browser.tabs.move(tab.id, { index: lastCreatedInactiveTab.index });
                    this.container.lastCreatedInactiveTab[browser.windows.WINDOW_ID_CURRENT] = tab.id;
                }
            }
            catch (error) {
                this.debug('[onCreated] getting lastCreatedInactiveTab failed', error);
            }
        }
    }
    async createInSameContainer() {
        this.creatingInSameContainer = true;
        try {
            const tabs = await browser.tabs.query({
                active: true,
                currentWindow: true,
            });
            const activeTab = tabs[0];
            if (!activeTab) {
                this.debug('[createInSameContainer] couldnt find an active tab', activeTab);
                return;
            }
            try {
                const newTab = await browser.tabs.create({
                    cookieStoreId: activeTab.cookieStoreId,
                });
                this.debug('[createInSameContainer] new same container tab created', activeTab, newTab);
            }
            catch (error) {
                this.debug('[createInSameContainer] couldnt create tab', error);
            }
        }
        catch (error) {
            this.debug('[createInSameContainer] couldnt query tabs', error);
        }
        this.creatingInSameContainer = false;
    }
    async remove(tab) {
        try {
            await browser.tabs.remove(tab.id);
        }
        catch (error) {
            this.debug('[remove] couldnt remove tab', error, tab);
        }
    }
}
exports.Tabs = Tabs;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const lib_1 = __webpack_require__(4);
class Utils {
    constructor(background) {
        this.debug = background.debug;
    }
    sameDomain(origin, target) {
        const parsedOrigin = lib_1.psl.parse(origin);
        const parsedTarget = lib_1.psl.parse(target);
        if (parsedOrigin.error || parsedTarget.error) {
            return false;
        }
        return parsedOrigin.domain === parsedTarget.domain;
    }
    matchDomainPattern(url, domainPattern) {
        if (domainPattern.startsWith('/')) {
            const regexp = domainPattern.match(/^\s*\/(.*)\/([gimsuy]+)?\s*$/);
            if (!regexp) {
                return false;
            }
            try {
                return new RegExp(regexp[1], regexp[2]).test(url);
            }
            catch (error) {
                return false;
            }
        }
        else {
            const parsedUrl = url.startsWith('about:') || url.startsWith('moz-extension:')
                ? url
                : new URL(url).hostname;
            return (parsedUrl === domainPattern ||
                this.globToRegexp(domainPattern).test(parsedUrl));
        }
    }
    addMissingKeys({ defaults, source, }) {
        let addedMissing = false;
        const addKeys = (defaultsNode, sourceNode) => {
            Object.keys(defaultsNode).map((key) => {
                if (sourceNode[key] === undefined) {
                    this.debug('[addMissingKeys] key not found, setting default', key, defaultsNode[key]);
                    sourceNode[key] = defaultsNode[key];
                    addedMissing = true;
                }
                else if (Array.isArray(sourceNode[key])) {
                    return;
                }
                else if (typeof sourceNode[key] === 'object') {
                    addKeys(defaultsNode[key], sourceNode[key]);
                }
            });
        };
        addKeys(defaults, source);
        return addedMissing;
    }
    clone(input) {
        return JSON.parse(JSON.stringify(input));
    }
    globToRegexp(glob) {
        // --------------------------------------------------------------------------------
        // modified and simplified version of https://github.com/fitzgen/glob-to-regexp
        // version 0.4.0
        // Copyright (c) 2013, Nick Fitzgerald
        //
        // All rights reserved.
        //
        // Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
        //
        //     Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
        //
        //     Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
        //
        // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        if (typeof glob !== 'string') {
            throw new TypeError('Expected a string');
        }
        const str = String(glob);
        // The regexp we are building, as a string.
        let reStr = '';
        // RegExp flags (eg "i" ) to pass in to RegExp constructor.
        const flags = 'i';
        let c;
        for (let i = 0, len = str.length; i < len; i++) {
            c = str[i];
            switch (c) {
                case '/':
                case '$':
                case '^':
                case '+':
                case '.':
                case '(':
                case ')':
                case '=':
                case '!':
                case '|':
                case ',':
                    reStr += '\\' + c;
                    break;
                case '*':
                    reStr += '.*';
                    break;
                default:
                    reStr += c;
            }
        }
        return new RegExp('^' + reStr + '$', flags);
    }
    versionCompare(a, b) {
        // https://github.com/substack/semver-compare
        // https://github.com/substack/semver-compare/pull/4
        // This software is released under the MIT license:
        //
        // Permission is hereby granted, free of charge, to any person obtaining a copy of
        // this software and associated documentation files (the "Software"), to deal in
        // the Software without restriction, including without limitation the rights to
        // use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
        // the Software, and to permit persons to whom the Software is furnished to do so,
        // subject to the following conditions:
        //
        // The above copyright notice and this permission notice shall be included in all
        // copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
        // FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
        // COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
        // IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
        // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        const pa = a.split('.');
        const pb = b.split('.');
        for (let i = 0; i < Math.min(pa.length, pb.length); i++) {
            const na = Number(pa[i]);
            const nb = Number(pb[i]);
            if (na > nb) {
                return 1;
            }
            if (nb > na) {
                return -1;
            }
            if (!isNaN(na) && isNaN(nb)) {
                return 1;
            }
            if (isNaN(na) && !isNaN(nb)) {
                return -1;
            }
        }
        return 0;
    }
}
exports.Utils = Utils;


/***/ })
/******/ ]);