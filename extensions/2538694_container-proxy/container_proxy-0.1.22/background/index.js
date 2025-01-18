/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/BackgroundMain.ts":
/*!******************************************!*\
  !*** ./src/background/BackgroundMain.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "doNotProxy": () => (/* binding */ doNotProxy),
/* harmony export */   "default": () => (/* binding */ BackgroundMain)
/* harmony export */ });
/* harmony import */ var _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/ProxyType */ "./src/domain/ProxyType.ts");

const localhosts = new Set(['localhost', '127.0.0.1', '[::1]']);
const doNotProxy = [];
const emergencyBreak = {
    type: _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Socks5,
    host: 'emergency-break-proxy.localhost',
    port: 1,
    failoverTimeout: 1,
    username: 'nonexistent user',
    password: 'dummy password',
    proxyDNS: true
};
class BackgroundMain {
    constructor({ store }) {
        this.store = store;
    }
    initializeAuthListener(cookieStoreId, proxy) {
        const listener = (details) => {
            if (!details.isProxy)
                return {};
            if (details.cookieStoreId !== cookieStoreId)
                return {};
            // TODO: Fix in @types/firefox-webext-browser
            // @ts-expect-error
            const info = details.proxyInfo;
            if (info.host !== proxy.host || info.port !== proxy.port || info.type !== proxy.type)
                return {};
            const result = { authCredentials: { username: proxy.username, password: proxy.password } };
            browser.webRequest.onAuthRequired.removeListener(listener);
            return result;
        };
        browser.webRequest.onAuthRequired.addListener(listener, { urls: ['<all_urls>'] }, ['blocking']);
    }
    openPreferences(browser) {
        return () => {
            browser.runtime.openOptionsPage();
        };
    }
    // TODO: Fix in @types/firefox-webext-browser
    async onRequest(requestDetails) {
        var _a;
        try {
            const cookieStoreId = (_a = requestDetails.cookieStoreId) !== null && _a !== void 0 ? _a : '';
            if (cookieStoreId === '') {
                console.error('cookieStoreId is not defined', requestDetails);
                return doNotProxy;
            }
            const proxies = await this.store.getProxiesForContainer(cookieStoreId);
            if (proxies.length > 0) {
                proxies.forEach(p => {
                    if (p.type === _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Http || p.type === _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Https) {
                        this.initializeAuthListener(cookieStoreId, p);
                    }
                });
                const result = proxies.filter((p) => {
                    try {
                        const documentUrl = new URL(requestDetails.url);
                        const isLocalhost = localhosts.has(documentUrl.hostname);
                        if (isLocalhost && p.doNotProxyLocal) {
                            return false;
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                    return true;
                }).map(p => p.asProxyInfo());
                if (result.length === 0) {
                    return doNotProxy;
                }
                return result;
            }
            return doNotProxy;
        }
        catch (e) {
            console.error(`Error in onRequest listener: ${e}`);
            return [emergencyBreak];
        }
    }
    run(browser) {
        const filter = { urls: ['<all_urls>'] };
        browser.proxy.onRequest.addListener(this.onRequest.bind(this), filter);
        browser.browserAction.onClicked.addListener(this.openPreferences(browser));
        browser.proxy.onError.addListener((e) => {
            console.error('Proxy error', e);
        });
    }
}


/***/ }),

/***/ "./src/domain/ProxySettings.ts":
/*!*************************************!*\
  !*** ./src/domain/ProxySettings.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProxySettings": () => (/* binding */ ProxySettings),
/* harmony export */   "Socks5ProxySettings": () => (/* binding */ Socks5ProxySettings),
/* harmony export */   "Socks4ProxySettings": () => (/* binding */ Socks4ProxySettings),
/* harmony export */   "HttpsProxySettings": () => (/* binding */ HttpsProxySettings),
/* harmony export */   "HttpProxySettings": () => (/* binding */ HttpProxySettings)
/* harmony export */ });
/* harmony import */ var _ProxyType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProxyType */ "./src/domain/ProxyType.ts");
/* harmony import */ var _options_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../options/util */ "./src/options/util.ts");


const failoverTimeout = 5;
var ProxySettings;
(function (ProxySettings) {
    function tryFromDao(dao) {
        switch (dao.type) {
            case 'socks':
                return new Socks5ProxySettings(dao);
            case 'socks4':
                return new Socks4ProxySettings(dao);
            case 'http':
                return new HttpProxySettings(dao);
            case 'https':
                return new HttpsProxySettings(dao);
            default:
                return undefined;
        }
    }
    ProxySettings.tryFromDao = tryFromDao;
})(ProxySettings || (ProxySettings = {}));
class ProxySettingsBase {
    constructor(dao) {
        this.id = dao.id;
        this.title = dao.title;
        this.host = dao.host;
        this.port = dao.port;
        this.doNotProxyLocal = dao.doNotProxyLocal;
    }
    get url() {
        return `${this.type}://${this.host}:${this.port}`;
    }
    baseDao() {
        return {
            id: this.id,
            title: this.title,
            type: this.type,
            host: this.host,
            port: this.port,
            doNotProxyLocal: this.doNotProxyLocal
        };
    }
}
class Socks5ProxySettings extends ProxySettingsBase {
    constructor(dao) {
        var _a;
        super(dao);
        this.username = dao.username;
        this.password = dao.password;
        this.proxyDNS = (_a = dao.proxyDNS) !== null && _a !== void 0 ? _a : true;
    }
    get type() {
        return _ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Socks5;
    }
    asProxyInfo() {
        var _a, _b;
        return {
            type: this.type,
            host: this.host,
            port: this.port,
            username: (_a = this.username) !== null && _a !== void 0 ? _a : '',
            password: (_b = this.password) !== null && _b !== void 0 ? _b : '',
            proxyDNS: this.proxyDNS,
            failoverTimeout
        };
    }
    asDao() {
        return { ...super.baseDao(), username: this.username, password: this.password, proxyDNS: this.proxyDNS };
    }
}
class Socks4ProxySettings extends ProxySettingsBase {
    constructor(dao) {
        var _a;
        super(dao);
        this.proxyDNS = (_a = dao.proxyDNS) !== null && _a !== void 0 ? _a : true;
    }
    get type() {
        return _ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Socks4;
    }
    asProxyInfo() {
        return {
            type: this.type,
            host: this.host,
            port: this.port,
            proxyDNS: this.proxyDNS,
            failoverTimeout
        };
    }
    asDao() {
        return { ...super.baseDao(), proxyDNS: this.proxyDNS };
    }
}
class HttpBasedProxySettings extends ProxySettingsBase {
    constructor(dao) {
        super(dao);
        this.username = dao.username;
        this.password = dao.password;
    }
    asDao() {
        return { ...super.baseDao(), username: this.username, password: this.password };
    }
}
class HttpsProxySettings extends HttpBasedProxySettings {
    get type() {
        return _ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Https;
    }
    asProxyInfo() {
        var _a, _b;
        return {
            type: this.type,
            host: this.host,
            port: this.port,
            proxyAuthorizationHeader: (0,_options_util__WEBPACK_IMPORTED_MODULE_1__.generateAuthorizationHeader)((_a = this.username) !== null && _a !== void 0 ? _a : '', (_b = this.password) !== null && _b !== void 0 ? _b : ''),
            failoverTimeout
        };
    }
}
class HttpProxySettings extends HttpBasedProxySettings {
    get type() {
        return _ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Http;
    }
    asProxyInfo() {
        return {
            type: this.type,
            host: this.host,
            port: this.port,
            failoverTimeout
        };
    }
}


/***/ }),

/***/ "./src/domain/ProxyType.ts":
/*!*********************************!*\
  !*** ./src/domain/ProxyType.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProxyType": () => (/* binding */ ProxyType)
/* harmony export */ });
/* eslint-disable @typescript-eslint/no-namespace,no-redeclare,import/export */
var ProxyType;
(function (ProxyType) {
    ProxyType["Socks5"] = "socks";
    ProxyType["Socks4"] = "socks4";
    ProxyType["Http"] = "http";
    ProxyType["Https"] = "https";
})(ProxyType || (ProxyType = {}));
(function (ProxyType) {
    function tryFromString(s) {
        switch (s) {
            case 'socks':
                return ProxyType.Socks5;
            case 'socks4':
                return ProxyType.Socks4;
            case 'http':
                return ProxyType.Http;
            case 'https':
                return ProxyType.Https;
            default:
                return undefined;
        }
    }
    ProxyType.tryFromString = tryFromString;
})(ProxyType || (ProxyType = {}));


/***/ }),

/***/ "./src/options/util.ts":
/*!*****************************!*\
  !*** ./src/options/util.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uuidv4": () => (/* binding */ uuidv4),
/* harmony export */   "generateAuthorizationHeader": () => (/* binding */ generateAuthorizationHeader)
/* harmony export */ });
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
        const random = Math.random() * 16 | 0;
        const v = character === 'x' ? random : (random & 0x3 | 0x8);
        return v.toString(16);
    });
}
function generateAuthorizationHeader(username, password) {
    return 'Basic ' + btoa(`${username}:${password}`);
}


/***/ }),

/***/ "./src/store/Store.ts":
/*!****************************!*\
  !*** ./src/store/Store.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProxyDao": () => (/* binding */ ProxyDao),
/* harmony export */   "Store": () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/ProxyType */ "./src/domain/ProxyType.ts");
/* harmony import */ var _options_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../options/util */ "./src/options/util.ts");
/* harmony import */ var _domain_ProxySettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/ProxySettings */ "./src/domain/ProxySettings.ts");



var tryFromDao = _domain_ProxySettings__WEBPACK_IMPORTED_MODULE_2__.ProxySettings.tryFromDao;
var ProxyDao;
(function (ProxyDao) {
    function toProxyInfo(proxy) {
        var _a, _b, _c, _d, _e, _f;
        const type = _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.tryFromString(proxy.type);
        if (type === undefined) {
            return;
        }
        const base = {
            host: proxy.host,
            port: proxy.port,
            failoverTimeout: 5
        };
        switch (type) {
            case _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Socks5:
                return {
                    type,
                    ...base,
                    username: (_a = proxy.username) !== null && _a !== void 0 ? _a : '',
                    password: (_b = proxy.password) !== null && _b !== void 0 ? _b : '',
                    proxyDNS: (_c = proxy.proxyDNS) !== null && _c !== void 0 ? _c : true
                };
            case _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Socks4:
                return {
                    type,
                    ...base,
                    proxyDNS: (_d = proxy.proxyDNS) !== null && _d !== void 0 ? _d : true
                };
            case _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Http:
                return {
                    type,
                    ...base
                };
            case _domain_ProxyType__WEBPACK_IMPORTED_MODULE_0__.ProxyType.Https:
                return {
                    type,
                    ...base,
                    proxyAuthorizationHeader: (0,_options_util__WEBPACK_IMPORTED_MODULE_1__.generateAuthorizationHeader)((_e = proxy.username) !== null && _e !== void 0 ? _e : '', (_f = proxy.password) !== null && _f !== void 0 ? _f : '')
                };
        }
    }
    ProxyDao.toProxyInfo = toProxyInfo;
})(ProxyDao || (ProxyDao = {}));
class Store {
    async getAllProxies() {
        const proxyDaos = await this.getAllProxyDaos();
        const result = proxyDaos.map(tryFromDao).filter(p => p !== undefined);
        return result;
    }
    async getProxyById(id) {
        const proxies = await this.getAllProxies();
        const index = proxies.findIndex(p => p.id === id);
        if (index === -1) {
            return null;
        }
        else {
            return proxies[index];
        }
    }
    async putProxy(proxy) {
        const proxies = await this.getAllProxyDaos();
        const index = proxies.findIndex(p => p.id === proxy.id);
        if (index !== -1) {
            proxies[index] = proxy.asDao();
        }
        else {
            proxies.push(proxy.asDao());
        }
        await this.saveProxyDaos(proxies);
    }
    async deleteProxyById(id) {
        const proxies = await this.getAllProxyDaos();
        const index = proxies.findIndex(p => p.id === id);
        if (index !== -1) {
            proxies.splice(index, 1);
            await this.saveProxyDaos(proxies);
        }
    }
    async getRelations() {
        var _a;
        const result = await browser.storage.local.get('relations');
        return (_a = result.relations) !== null && _a !== void 0 ? _a : {};
    }
    async setContainerProxyRelation(cookieStoreId, proxyId) {
        const relations = await this.getRelations();
        relations[cookieStoreId] = [proxyId];
        await browser.storage.local.set({ relations: relations });
    }
    async getProxiesForContainer(cookieStoreId) {
        var _a;
        const relations = await this.getRelations();
        const proxyIds = (_a = relations[cookieStoreId]) !== null && _a !== void 0 ? _a : [];
        if (proxyIds.length === 0) {
            return [];
        }
        const proxies = await this.getAllProxies();
        const proxyById = {};
        proxies.forEach(function (p) { proxyById[p.id] = p; });
        return proxyIds.map(pId => proxyById[pId])
            .filter(p => p !== undefined)
            .map(fillInDefaults)
            .map(tryFromDao)
            .filter(p => p !== undefined);
    }
    async saveProxyDaos(p) {
        await browser.storage.local.set({ proxies: p });
    }
    async getAllProxyDaos() {
        var _a;
        const fetched = await browser.storage.local.get('proxies');
        const proxies = (_a = fetched.proxies) !== null && _a !== void 0 ? _a : [];
        const proxyDaoList = proxies.map(fillInDefaults);
        return proxyDaoList;
    }
}
function fillInDefaults(proxy) {
    if (proxy.title === undefined) {
        proxy.title = '';
    }
    if (typeof proxy.doNotProxyLocal === 'undefined') {
        proxy.doNotProxyLocal = true;
    }
    if (typeof proxy.proxyDNS === 'undefined') {
        if (proxy.type === 'socks' || proxy.type === 'socks4') {
            proxy.proxyDNS = true;
        }
    }
    return proxy;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/background/index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/Store */ "./src/store/Store.ts");
/* harmony import */ var _BackgroundMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BackgroundMain */ "./src/background/BackgroundMain.ts");


console.log('Background script started');
// const browser = browser
const store = new _store_Store__WEBPACK_IMPORTED_MODULE_0__.Store();
const backgroundListener = new _BackgroundMain__WEBPACK_IMPORTED_MODULE_1__["default"]({ store });
backgroundListener.run(browser);

})();

/******/ })()
;
//# sourceMappingURL=index.js.map