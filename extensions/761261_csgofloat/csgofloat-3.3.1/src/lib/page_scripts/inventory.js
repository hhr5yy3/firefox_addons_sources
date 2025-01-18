/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _bridge_handlers_execute_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _bridge_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _utils_snips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _bridge_handlers_execute_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _bridge_handlers_fetch_extension_file__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _utils_detect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _bus_post_message_bus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function initiateChromium(scriptPath) {
    return __awaiter(this, void 0, void 0, function* () {
        (0,_bridge_client__WEBPACK_IMPORTED_MODULE_1__.ClientSend)(_bridge_handlers_execute_css__WEBPACK_IMPORTED_MODULE_3__.ExecuteCssOnPage, {
            path: 'src/global.css',
        });
        (0,_bridge_client__WEBPACK_IMPORTED_MODULE_1__.ClientSend)(_bridge_handlers_execute_script__WEBPACK_IMPORTED_MODULE_0__.ExecuteScriptOnPage, {
            path: scriptPath,
        });
    });
}
function initiateFirefox(scriptPath) {
    return __awaiter(this, void 0, void 0, function* () {
        _bus_post_message_bus__WEBPACK_IMPORTED_MODULE_6__.g_PostMessageBus.handleRequests();
        // Why do we need to use manual DOM script injection and
        // fetch the text of the script?
        // See https://github.com/csfloat/extension/issues/155#issuecomment-1639781914
        // We want to inject the ID of the extension
        const id = browser.runtime.id;
        const modelUrl = browser.runtime.getURL('src/model_frame.html');
        const entryScript = document.createElement('script');
        entryScript.appendChild(document.createTextNode(`
        window.CSFLOAT_EXTENSION_ID = '${id}';
        window.CSFLOAT_MODEL_FRAME_URL = '${modelUrl}';
    `));
        document.head.appendChild(entryScript);
        const scriptResp = yield (0,_bridge_client__WEBPACK_IMPORTED_MODULE_1__.ClientSend)(_bridge_handlers_fetch_extension_file__WEBPACK_IMPORTED_MODULE_4__.FetchExtensionFile, {
            path: scriptPath,
        });
        const script = document.createElement('script');
        script.appendChild(document.createTextNode(scriptResp.text));
        document.head.appendChild(script);
        const styleResp = yield (0,_bridge_client__WEBPACK_IMPORTED_MODULE_1__.ClientSend)(_bridge_handlers_fetch_extension_file__WEBPACK_IMPORTED_MODULE_4__.FetchExtensionFile, {
            path: 'src/global.css',
        });
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(styleResp.text));
        document.head.appendChild(style);
    });
}
/**
 * Initializes a page script, executing it in the page context if necessary
 *
 * @param scriptPath Relative path of the script (always in .js)
 * @param ifPage Fn to run if we are in the page's execution context
 */
function init(scriptPath, ifPage) {
    return __awaiter(this, void 0, void 0, function* () {
        // Don't allow the page script to run this.
        if ((0,_utils_snips__WEBPACK_IMPORTED_MODULE_2__.inPageContext)()) {
            // @ts-ignore Set global identifier for other extensions to use
            window.csfloat = true;
            // @ts-ignore Deprecated name
            window.csgofloat = true;
            ifPage();
            return;
        }
        if ((0,_utils_detect__WEBPACK_IMPORTED_MODULE_5__.isFirefox)()) {
            yield initiateFirefox(scriptPath);
        }
        else {
            yield initiateChromium(scriptPath);
        }
        console.log(`%c CSFloat Market Checker (v${chrome.runtime.getManifest().version}) by Step7750 `, 'background: #004594; color: #fff;');
        console.log('%c Changelog can be found here: https://github.com/csfloat/extension ', 'background: #004594; color: #fff;');
    });
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExecuteScriptOnPage": () => (/* binding */ ExecuteScriptOnPage)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _wrappers_privileged__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const ExecuteScriptOnPage = new _wrappers_privileged__WEBPACK_IMPORTED_MODULE_2__.PrivilegedHandler(new _main__WEBPACK_IMPORTED_MODULE_0__.EmptyResponseHandler(_types__WEBPACK_IMPORTED_MODULE_1__.RequestType.EXECUTE_SCRIPT_ON_PAGE, (req, sender) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // We need to inject the extension ID dynamically so the client knows who to
    // communicate with.
    //
    // On Firefox, extension IDs are random, so this is necessary.
    yield chrome.scripting.executeScript({
        target: { tabId: (_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id },
        world: 'MAIN',
        args: [chrome.runtime.id, chrome.runtime.getURL('src/model_frame.html')],
        func: function ExtensionId(extensionId, modelFrameUrl) {
            window.CSFLOAT_EXTENSION_ID = extensionId;
            window.CSFLOAT_MODEL_FRAME_URL = modelFrameUrl;
        },
    });
    yield chrome.scripting.executeScript({
        target: { tabId: (_b = sender.tab) === null || _b === void 0 ? void 0 : _b.id },
        files: [req.path],
        world: 'MAIN',
    });
})));


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmptyResponseHandler": () => (/* binding */ EmptyResponseHandler),
/* harmony export */   "SimpleHandler": () => (/* binding */ SimpleHandler)
/* harmony export */ });
/* unused harmony export EmptyRequestHandler */
class SimpleHandler {
    constructor(type, handler) {
        this.type = type;
        this.handler = handler;
    }
    getType() {
        return this.type;
    }
    handleRequest(request, sender) {
        return this.handler(request, sender);
    }
}
class EmptyRequestHandler {
    constructor(type, handler) {
        this.type = type;
        this.handler = handler;
    }
    getType() {
        return this.type;
    }
    handleRequest(request, sender) {
        return this.handler(sender);
    }
}
class EmptyResponseHandler {
    constructor(type, handler) {
        this.type = type;
        this.handler = handler;
    }
    getType() {
        return this.type;
    }
    handleRequest(request, sender) {
        return this.handler(request, sender);
    }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestType": () => (/* binding */ RequestType)
/* harmony export */ });
var RequestType;
(function (RequestType) {
    RequestType[RequestType["EXECUTE_SCRIPT_ON_PAGE"] = 0] = "EXECUTE_SCRIPT_ON_PAGE";
    RequestType[RequestType["EXECUTE_CSS_ON_PAGE"] = 1] = "EXECUTE_CSS_ON_PAGE";
    RequestType[RequestType["FETCH_INSPECT_INFO"] = 2] = "FETCH_INSPECT_INFO";
    RequestType[RequestType["FETCH_STALL"] = 3] = "FETCH_STALL";
    RequestType[RequestType["STORAGE_GET"] = 4] = "STORAGE_GET";
    RequestType[RequestType["STORAGE_SET"] = 5] = "STORAGE_SET";
    RequestType[RequestType["STORAGE_REMOVE"] = 6] = "STORAGE_REMOVE";
    RequestType[RequestType["FETCH_PENDING_TRADES"] = 7] = "FETCH_PENDING_TRADES";
    RequestType[RequestType["FETCH_SKIN_MODEL"] = 8] = "FETCH_SKIN_MODEL";
    RequestType[RequestType["FETCH_EXTENSION_FILE"] = 9] = "FETCH_EXTENSION_FILE";
    RequestType[RequestType["ANNOTATE_OFFER"] = 10] = "ANNOTATE_OFFER";
    RequestType[RequestType["EXTENSION_VERSION"] = 11] = "EXTENSION_VERSION";
})(RequestType || (RequestType = {}));


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivilegedHandler": () => (/* binding */ PrivilegedHandler)
/* harmony export */ });
/**
 * Restricts a given handler such that it can only run if the sender is
 * verified to be from the extension's origin (ie. content script)
 */
class PrivilegedHandler {
    constructor(handler) {
        this.handler = handler;
    }
    getType() {
        return this.handler.getType();
    }
    handleRequest(request, sender) {
        if (sender.id !== chrome.runtime.id) {
            throw new Error('Attempt to access restricted method outside of secure context (ie. content script)');
        }
        return this.handler.handleRequest(request, sender);
    }
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientSend": () => (/* binding */ ClientSend)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _utils_detect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _utils_snips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _bus_post_message_bus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




function canUseSendMessage() {
    // Not supported in Firefox Page Context
    return !((0,_utils_detect__WEBPACK_IMPORTED_MODULE_1__.isFirefox)() && (0,_utils_snips__WEBPACK_IMPORTED_MODULE_2__.inPageContext)());
}
/**
 * Send a request to be handled by the background worker
 *
 * Can be called from a content script or page itself
 */
function ClientSend(handler, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const bundle = {
            version: _types__WEBPACK_IMPORTED_MODULE_0__.Version.V1,
            request_type: handler.getType(),
            request: args,
            id: Math.ceil(Math.random() * 100000000000),
        };
        if (canUseSendMessage()) {
            return new Promise((resolve, reject) => {
                // @ts-ignore Bad types
                (0,_utils_detect__WEBPACK_IMPORTED_MODULE_1__.runtimeNamespace)().runtime.sendMessage(window.CSFLOAT_EXTENSION_ID || chrome.runtime.id, bundle, 
                // @ts-ignore Bad types
                (resp) => {
                    if (resp === null || resp === void 0 ? void 0 : resp.response) {
                        resolve(resp.response);
                    }
                    else {
                        reject(resp === null || resp === void 0 ? void 0 : resp.error);
                    }
                });
            });
        }
        else {
            // Fallback to postmessage bus for browsers that don't implement
            // specs fully
            return _bus_post_message_bus__WEBPACK_IMPORTED_MODULE_3__.g_PostMessageBus.sendRequest(bundle);
        }
    });
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Version": () => (/* binding */ Version)
/* harmony export */ });
var Version;
(function (Version) {
    Version["V1"] = "CSFLOAT_V1";
})(Version || (Version = {}));


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFirefox": () => (/* binding */ isFirefox),
/* harmony export */   "runtimeNamespace": () => (/* binding */ runtimeNamespace)
/* harmony export */ });
function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}
/**
 * Thanks to our browser overlords, we have two namespaces for `x.runtime.fn()`
 */
function runtimeNamespace() {
    if (isFirefox()) {
        return browser;
    }
    else {
        return chrome;
    }
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inPageContext": () => (/* binding */ inPageContext)
/* harmony export */ });
function inPageContext() {
    return typeof chrome === 'undefined' || !chrome.extension;
}


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g_PostMessageBus": () => (/* binding */ g_PostMessageBus)
/* harmony export */ });
/* harmony import */ var _bridge_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _utils_detect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


/**
 * Message bus that uses `postMessage` in order to communicate with the background
 * service worker/script.
 *
 * Why? Because the client page (ie. Steam page) on Firefox is not capable of
 * sending a message directly to the extension background.
 *
 * So it requires us to do the following dance:
 * page <--(postmessage)--> content script <--(sendmessage)--> background script
 *
 * This dance is abstracted in `ClientSend`, and only uses this bus if
 * `sendmessage` is not supported in the page.
 */
class PostMessageBus {
    /**
     * For the requester (ie. page), to wait until it gets a response
     * from the content script via. postMessage for the given request ID
     *
     * @param id Request ID
     */
    waitUntilResponseFor(id) {
        return new Promise((resolve, reject) => {
            const handler = (e) => {
                const resp = e.data;
                if (resp.id !== id || !resp.response) {
                    return;
                }
                // Prevent leaks
                window.removeEventListener('message', handler, false);
                if (resp === null || resp === void 0 ? void 0 : resp.response) {
                    resolve(resp.response);
                }
                else {
                    reject(resp === null || resp === void 0 ? void 0 : resp.error);
                }
            };
            window.addEventListener('message', handler);
        });
    }
    /**
     * Sends a request to be done through the bus, returns the appropriate
     * response for the input bundle handler
     *
     * @param bundle Request Bundle
     */
    sendRequest(bundle) {
        window.postMessage(bundle);
        return this.waitUntilResponseFor(bundle.id);
    }
    /**
     * Request handler (content script) for new requests from the page.
     *
     * Each request is effectively "proxied" to the background script/worker
     * to actually execute it's handler.
     */
    handleRequests() {
        const h = (e) => {
            if (e.data.version !== _bridge_types__WEBPACK_IMPORTED_MODULE_0__.Version.V1 || !e.data.request) {
                // Ignore messages that aren't for this bridge
                return;
            }
            // Send to the background script
            // @ts-ignore Bad types
            (0,_utils_detect__WEBPACK_IMPORTED_MODULE_1__.runtimeNamespace)().runtime.sendMessage(chrome.runtime.id, e.data, 
            // @ts-ignore Bad types
            (resp) => {
                window.postMessage(resp);
            });
        };
        window.addEventListener('message', h);
    }
}
const g_PostMessageBus = new PostMessageBus();


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExecuteCssOnPage": () => (/* binding */ ExecuteCssOnPage)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _wrappers_privileged__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const ExecuteCssOnPage = new _wrappers_privileged__WEBPACK_IMPORTED_MODULE_2__.PrivilegedHandler(new _main__WEBPACK_IMPORTED_MODULE_0__.EmptyResponseHandler(_types__WEBPACK_IMPORTED_MODULE_1__.RequestType.EXECUTE_CSS_ON_PAGE, (req, sender) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield chrome.scripting.insertCSS({
        target: { tabId: (_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id },
        files: [req.path],
    });
})));


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FetchExtensionFile": () => (/* binding */ FetchExtensionFile)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _wrappers_privileged__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const FetchExtensionFile = new _wrappers_privileged__WEBPACK_IMPORTED_MODULE_2__.PrivilegedHandler(new _main__WEBPACK_IMPORTED_MODULE_0__.SimpleHandler(_types__WEBPACK_IMPORTED_MODULE_1__.RequestType.FETCH_EXTENSION_FILE, (req) => __awaiter(void 0, void 0, void 0, function* () {
    const url = chrome.runtime.getURL(req.path);
    const r = yield fetch(url);
    const text = yield r.text();
    return {
        text,
    };
})));


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export InventoryItemHolderMetadata */
/* harmony import */ var _injectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _common_item_holder_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let InventoryItemHolderMetadata = class InventoryItemHolderMetadata extends _common_item_holder_metadata__WEBPACK_IMPORTED_MODULE_1__.ItemHolderMetadata {
    get asset() {
        var _a;
        if (!this.assetId)
            return;
        return (_a = g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.m_rgAssets[this.assetId]) === null || _a === void 0 ? void 0 : _a.description;
    }
    get ownerSteamId() {
        var _a, _b;
        if (g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.m_owner) {
            return (_a = g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.m_owner) === null || _a === void 0 ? void 0 : _a.strSteamId;
        }
        else if (g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.owner) {
            return (_b = g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.owner) === null || _b === void 0 ? void 0 : _b.strSteamId;
        }
    }
};
InventoryItemHolderMetadata = __decorate([
    (0,_injectors__WEBPACK_IMPORTED_MODULE_0__.CustomElement)(),
    (0,_injectors__WEBPACK_IMPORTED_MODULE_0__.InjectAppend)('#active_inventory_page div.inventory_page:not([style*="display: none"]) .itemHolder div.app730', _injectors__WEBPACK_IMPORTED_MODULE_0__.InjectionMode.CONTINUOUS)
], InventoryItemHolderMetadata);



/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomElement": () => (/* binding */ CustomElement),
/* harmony export */   "InjectAfter": () => (/* binding */ InjectAfter),
/* harmony export */   "InjectAppend": () => (/* binding */ InjectAppend),
/* harmony export */   "InjectionMode": () => (/* binding */ InjectionMode)
/* harmony export */ });
/* unused harmony export InjectBefore */
/* harmony import */ var lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _utils_snips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);


var InjectionMode;
(function (InjectionMode) {
    // Injects once at page load for elements matching the selector
    InjectionMode[InjectionMode["ONCE"] = 0] = "ONCE";
    // Continually injects whenever new elements that match the
    // selector exist that haven't been injected into yet
    //
    // Should be use for "dynamic" elements
    InjectionMode[InjectionMode["CONTINUOUS"] = 1] = "CONTINUOUS";
})(InjectionMode || (InjectionMode = {}));
var InjectionType;
(function (InjectionType) {
    InjectionType[InjectionType["Append"] = 0] = "Append";
    InjectionType[InjectionType["Before"] = 1] = "Before";
    InjectionType[InjectionType["After"] = 2] = "After";
})(InjectionType || (InjectionType = {}));
const InjectionConfigs = {
    [InjectionType.Append]: {
        exists: (ctx, selector) => !!ctx.children(selector).length,
        op: (ctx, target) => ctx.append(target.elem()),
    },
    [InjectionType.Before]: {
        exists: (ctx, selector) => !!ctx.parent().children(selector).length,
        op: (ctx, target) => ctx.before(target.elem()),
    },
    [InjectionType.After]: {
        exists: (ctx, selector) => !!ctx.parent().children(selector).length,
        op: (ctx, target) => ctx.after(target.elem()),
    },
};
function CustomElement() {
    return function (target, propertyKey, descriptor) {
        if (!(0,_utils_snips__WEBPACK_IMPORTED_MODULE_1__.inPageContext)()) {
            return;
        }
        if (customElements.get(target.tag())) {
            // Already defined
            return;
        }
        (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.customElement)(target.tag())(target);
    };
}
function Inject(selector, mode, type) {
    return function (target, propertyKey, descriptor) {
        if (!(0,_utils_snips__WEBPACK_IMPORTED_MODULE_1__.inPageContext)()) {
            return;
        }
        switch (mode) {
            case InjectionMode.ONCE:
                $J(selector).each(function () {
                    InjectionConfigs[type].op($J(this), target);
                });
                break;
            case InjectionMode.CONTINUOUS:
                setInterval(() => {
                    $J(selector).each(function () {
                        // Don't add the item again if we already have
                        if (InjectionConfigs[type].exists($J(this), target.tag()))
                            return;
                        InjectionConfigs[type].op($J(this), target);
                    });
                }, 250);
                break;
        }
    };
}
function InjectAppend(selector, mode = InjectionMode.ONCE) {
    return Inject(selector, mode, InjectionType.Append);
}
function InjectBefore(selector, mode = InjectionMode.ONCE) {
    return Inject(selector, mode, InjectionType.Before);
}
function InjectAfter(selector, mode = InjectionMode.ONCE) {
    return Inject(selector, mode, InjectionType.After);
}


/***/ }),
/* 17 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customElement": () => (/* reexport safe */ _lit_reactive_element_decorators_custom_element_js__WEBPACK_IMPORTED_MODULE_0__.customElement),
/* harmony export */   "state": () => (/* reexport safe */ _lit_reactive_element_decorators_state_js__WEBPACK_IMPORTED_MODULE_2__.state)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element_decorators_custom_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _lit_reactive_element_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _lit_reactive_element_decorators_state_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _lit_reactive_element_decorators_event_options_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _lit_reactive_element_decorators_query_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var _lit_reactive_element_decorators_query_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var _lit_reactive_element_decorators_query_async_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(25);
/* harmony import */ var _lit_reactive_element_decorators_query_assigned_elements_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(26);
/* harmony import */ var _lit_reactive_element_decorators_query_assigned_nodes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(27);

//# sourceMappingURL=decorators.js.map


/***/ }),
/* 18 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customElement": () => (/* binding */ e)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return{kind:t,elements:s,finisher(n){customElements.define(e,n)}}})(e,n);
//# sourceMappingURL=custom-element.js.map


/***/ }),
/* 19 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "property": () => (/* binding */ e)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,i)}};function e(e){return(n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i)})(e,n,t):i(e,n)}
//# sourceMappingURL=property.js.map


/***/ }),
/* 20 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "state": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return (0,_property_js__WEBPACK_IMPORTED_MODULE_0__.property)({...t,state:!0})}
//# sourceMappingURL=state.js.map


/***/ }),
/* 21 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export eventOptions */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e(e){return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({finisher:(r,t)=>{Object.assign(r.prototype[t],e)}})}
//# sourceMappingURL=event-options.js.map


/***/ }),
/* 22 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decorateProperty": () => (/* binding */ o)
/* harmony export */ });
/* unused harmony exports legacyPrototypeMethod, standardPrototypeMethod */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=(e,t,o)=>{Object.defineProperty(t,o,e)},t=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),o=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n)}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n)}};
//# sourceMappingURL=base.js.map


/***/ }),
/* 23 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export query */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i(i,n){return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]}}return t}})}
//# sourceMappingURL=query.js.map


/***/ }),
/* 24 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export queryAll */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e(e){return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({descriptor:r=>({get(){var r,o;return null!==(o=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelectorAll(e))&&void 0!==o?o:[]},enumerable:!0,configurable:!0})})}
//# sourceMappingURL=query-all.js.map


/***/ }),
/* 25 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export queryAsync */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e){return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({descriptor:r=>({async get(){var r;return await this.updateComplete,null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(e)},enumerable:!0,configurable:!0})})}
//# sourceMappingURL=query-async.js.map


/***/ }),
/* 26 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "queryAssignedElements": () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;const e=null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));function l(n){const{slot:l,selector:t}=null!=n?n:{};return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({descriptor:o=>({get(){var o;const r="slot"+(l?`[name=${l}]`:":not([name])"),i=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(r),s=null!=i?e(i,n):[];return t?s.filter((o=>o.matches(t))):s},enumerable:!0,configurable:!0})})}
//# sourceMappingURL=query-assigned-elements.js.map


/***/ }),
/* 27 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export queryAssignedNodes */
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _query_assigned_elements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function o(o,n,r){let l,s=o;return"object"==typeof o?(s=o.slot,l=o):l={flatten:n},r?(0,_query_assigned_elements_js__WEBPACK_IMPORTED_MODULE_1__.queryAssignedElements)({slot:s,flatten:n,selector:r}):(0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({descriptor:e=>({get(){var e,t;const o="slot"+(s?`[name=${s}]`:":not([name])"),n=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(o);return null!==(t=null==n?void 0:n.assignedNodes(l))&&void 0!==t?t:[]},enumerable:!0,configurable:!0})})}
//# sourceMappingURL=query-assigned-nodes.js.map


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ItemHolderMetadata": () => (/* binding */ ItemHolderMetadata)
/* harmony export */ });
/* harmony import */ var _custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var lit_decorators_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _services_float_fetcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35);
/* harmony import */ var _utils_skin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40);
/* harmony import */ var _utils_ranks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(48);
/* harmony import */ var _utils_observers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








// Generic annotator of item holder metadata (float, seed, etc...)
// Must be extended to use as a component
class ItemHolderMetadata extends _custom__WEBPACK_IMPORTED_MODULE_0__.FloatElement {
    get assetId() {
        var _a;
        return (_a = $J(this).parent().attr('id')) === null || _a === void 0 ? void 0 : _a.split('_')[2];
    }
    get inspectLink() {
        var _a, _b, _c, _d;
        if (!this.asset)
            return;
        if (!((_a = this.asset) === null || _a === void 0 ? void 0 : _a.actions) || ((_c = (_b = this.asset) === null || _b === void 0 ? void 0 : _b.actions) === null || _c === void 0 ? void 0 : _c.length) === 0)
            return;
        if (!this.ownerSteamId) {
            return;
        }
        return (_d = this.asset) === null || _d === void 0 ? void 0 : _d.actions[0].link.replace('%owner_steamid%', this.ownerSteamId).replace('%assetid%', this.assetId);
    }
    render() {
        if (!this.itemInfo)
            return lit__WEBPACK_IMPORTED_MODULE_1__.html ``;
        const fadePercentage = this.asset && (0,_utils_skin__WEBPACK_IMPORTED_MODULE_4__.getFadePercentage)(this.asset, this.itemInfo);
        if (fadePercentage === 100) {
            $J(this).parent().addClass('full-fade-border');
        }
        const rank = (0,_utils_skin__WEBPACK_IMPORTED_MODULE_4__.getLowestRank)(this.itemInfo);
        return lit__WEBPACK_IMPORTED_MODULE_1__.html `
            <span>
                <span class="float">${(0,_utils_skin__WEBPACK_IMPORTED_MODULE_4__.formatFloatWithRank)(this.itemInfo, 6)}</span>
                <span class="seed"
                    >${(0,_utils_skin__WEBPACK_IMPORTED_MODULE_4__.formatSeed)(this.itemInfo)}
                    ${fadePercentage !== undefined
            ? lit__WEBPACK_IMPORTED_MODULE_1__.html `<span class="fade ${rank && rank <= 5 ? 'csfloat-shine-fade-text' : ''}"
                              >(${(0,_utils_skin__WEBPACK_IMPORTED_MODULE_4__.floor)(fadePercentage, 1)}%)</span
                          >`
            : lit__WEBPACK_IMPORTED_MODULE_1__.nothing}</span
                >
            </span>
        `;
    }
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.connectedCallback.call(this);
            if (this.inspectLink) {
                this.onInit();
            }
            else {
                // Wait until the asset exists
                (0,_utils_observers__WEBPACK_IMPORTED_MODULE_6__.Observe)(() => this.inspectLink, () => {
                    if (this.inspectLink) {
                        this.onInit();
                    }
                }, 200);
            }
        });
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.asset)
                return;
            if (!(0,_utils_skin__WEBPACK_IMPORTED_MODULE_4__.isSkin)(this.asset))
                return;
            // Commodities won't have inspect links
            if (!this.inspectLink)
                return;
            try {
                this.itemInfo = yield _services_float_fetcher__WEBPACK_IMPORTED_MODULE_3__.gFloatFetcher.fetch({
                    link: this.inspectLink,
                });
            }
            catch (e) {
                console.error(`Failed to fetch float for ${this.assetId}: ${e.toString()}`);
            }
            if (this.itemInfo) {
                this.annotateRankShine(this.itemInfo);
            }
        });
    }
    annotateRankShine(info) {
        const rank = (0,_utils_skin__WEBPACK_IMPORTED_MODULE_4__.getLowestRank)(info);
        if (!rank || rank > 5) {
            return;
        }
        // Make the inventory box coloured ;)
        $J(this).parent().css('color', 'black');
        $J(this).parent().find('img').css('background-color', (0,_utils_ranks__WEBPACK_IMPORTED_MODULE_5__.getRankColour)(rank));
        $J(this).parent().addClass('csfloat-shine');
    }
}
ItemHolderMetadata.styles = [
    ..._custom__WEBPACK_IMPORTED_MODULE_0__.FloatElement.styles,
    lit__WEBPACK_IMPORTED_MODULE_1__.css `
            .float {
                position: absolute;
                bottom: 3px;
                right: 3px;
                font-size: 12px;
            }

            .seed {
                position: absolute;
                top: 3px;
                right: 3px;
                font-size: 12px;
            }

            .fade {
                background: -webkit-linear-gradient(0deg, #d9bba5 0%, #e5903b 33%, #db5977 66%, #6775e1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .csfloat-shine-fade-text {
                font-weight: 1000;
                -webkit-text-stroke: 1px black;
            }
        `,
];
__decorate([
    (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_2__.state)()
], ItemHolderMetadata.prototype, "itemInfo", void 0);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FloatElement": () => (/* binding */ FloatElement)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);

function camelToDashCase(str) {
    return str
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
}
// LitElement wrapper with a pre-determined tag
class FloatElement extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {
    static tag() {
        return `csfloat-${camelToDashCase(this.name)}`;
    }
    static elem() {
        return document.createElement(this.tag());
    }
}
FloatElement.styles = [
    lit__WEBPACK_IMPORTED_MODULE_0__.css `
            hr {
                background-color: #1b2939;
                border-style: solid none none;
                border-color: black;
                border-width: 1px 0 0;
                height: 2px;
            }

            a {
                color: #ebebeb;
                cursor: pointer;
            }

            input[type='text'],
            input[type='password'],
            input[type='number'],
            select {
                color: #909090;
                background-color: rgba(0, 0, 0, 0.2);
                border: 1px solid #000;
                border-radius: 3px;
            }

            input[type='color'] {
                float: left;
                margin-top: 2px;
                -webkit-appearance: none;
                border: none;
                width: 20px;
                height: 20px;
                padding: 0;
            }

            input[type='color']::-webkit-color-swatch-wrapper {
                padding: 0;
            }

            input[type='color']::-webkit-color-swatch {
                border: none;
            }
        `,
];


/***/ }),
/* 30 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LitElement": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.LitElement),
/* harmony export */   "css": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.css),
/* harmony export */   "html": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.html),
/* harmony export */   "nothing": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.nothing)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);

//# sourceMappingURL=index.js.map


/***/ }),
/* 31 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactiveElement": () => (/* binding */ d),
/* harmony export */   "css": () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.css)
/* harmony export */ });
/* unused harmony exports defaultConverter, notEqual */
/* harmony import */ var _css_tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s;const e=window,r=e.trustedTypes,h=r?r.emptyScript:"",o=e.reactiveElementPolyfillSupport,n={toAttribute(t,i){switch(i){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},a=(t,i)=>i!==t&&(i==i||t==t),l={attribute:!0,type:String,converter:n,reflect:!1,hasChanged:a};class d extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var i;null!==(i=this.h)&&void 0!==i||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e))})),t}static createProperty(t,i=l){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle)(i))}else void 0!==i&&s.push((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle)(i));return s}static _$Ep(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return (0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.adoptStyles)(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$EO(t,i,s=l){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}d.finalized=!0,d.elementProperties=new Map,d.elementStyles=[],d.shadowRootOptions={mode:"open"},null==o||o({ReactiveElement:d}),(null!==(s=e.reactiveElementVersions)&&void 0!==s?s:e.reactiveElementVersions=[]).push("1.4.0");
//# sourceMappingURL=reactive-element.js.map


/***/ }),
/* 32 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adoptStyles": () => (/* binding */ S),
/* harmony export */   "css": () => (/* binding */ i),
/* harmony export */   "getCompatibleStyle": () => (/* binding */ c)
/* harmony export */ });
/* unused harmony exports CSSResult, supportsAdoptingStyleSheets, unsafeCSS */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(s,t))}return t}toString(){return this.cssText}}const r=t=>new o("string"==typeof t?t:t+"",void 0,s),i=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o(n,t,s)},S=(s,n)=>{e?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n)}))},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e)})(t):t;
//# sourceMappingURL=css-tag.js.map


/***/ }),
/* 33 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "html": () => (/* binding */ y),
/* harmony export */   "noChange": () => (/* binding */ x),
/* harmony export */   "nothing": () => (/* binding */ b),
/* harmony export */   "render": () => (/* binding */ A)
/* harmony export */ });
/* unused harmony exports _$LH, svg */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i=window,s=i.trustedTypes,e=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,o=`lit$${(Math.random()+"").slice(9)}$`,n="?"+o,l=`<${n}>`,h=document,r=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),w=g(2),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new S(i.insertBefore(r(),t),t,void 0,null!=s?s:{})}return l._$AI(t),l},E=h.createTreeWalker(h,129,null,!1),C=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a:void 0!==u[1]?d=f:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a||d===f?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o+y):s+o+(-2===c?(n.push(void 0),i):y)}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==e?e.createHTML(u):u,n]};class P{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,i);if(this.el=P.createElement(v,e),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(l=E.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?R:"?"===i[1]?H:"@"===i[1]?I:M})}else c.push({type:6,index:h})}for(const i of t)l.removeAttribute(i)}if($.test(l.tagName)){const t=l.textContent.split(o),i=t.length-1;if(i>0){l.textContent=s?s.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r()),E.nextNode(),c.push({type:2,index:++h});l.append(t[i],r())}}}else if(8===l.nodeType)if(l.data===n)c.push({type:2,index:h});else{let t=-1;for(;-1!==(t=l.data.indexOf(o,t+1));)c.push({type:7,index:h}),t+=o.length-1}h++}}static createElement(t,i){const s=h.createElement("template");return s.innerHTML=t,s}}function V(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=d(i)?void 0:i._$litDirective$;return(null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=r:s._$Cu=r),void 0!==r&&(i=V(t,r._$AS(t,i.values),r,e)),i}class N{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h).importNode(s,!0);E.currentNode=o;let n=E.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new S(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r]}l!==(null==d?void 0:d.index)&&(n=E.nextNode(),l++)}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class S{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$C_=null===(o=null==e?void 0:e.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$C_}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=V(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):c(t)?this.O(t):this.$(t)}S(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}$(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.k(h.createTextNode(t)),this._$AH=t}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=P.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else{const t=new N(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new P(t)),i}O(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new S(this.S(r()),this.S(r()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$C_=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class M{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=V(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else{const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=V(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h}n&&!e&&this.P(t)}P(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class R extends M{constructor(){super(...arguments),this.type=3}P(t){this.element[this.name]=t===b?void 0:t}}const k=s?s.emptyScript:"";class H extends M{constructor(){super(...arguments),this.type=4}P(t){t&&t!==b?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class I extends M{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=V(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const z={A:"$lit$",M:o,C:n,L:1,R:C,D:N,V:c,I:V,H:S,N:M,U:H,B:I,F:R,W:L},Z=i.litHtmlPolyfillSupport;null==Z||Z(P,S),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.3.1");
//# sourceMappingURL=lit-html.js.map


/***/ }),
/* 34 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LitElement": () => (/* binding */ s),
/* harmony export */   "css": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.css),
/* harmony export */   "html": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.html),
/* harmony export */   "nothing": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.nothing)
/* harmony export */ });
/* unused harmony exports UpdatingElement, _$LE */
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;const r=_lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement;class s extends _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=(0,lit_html__WEBPACK_IMPORTED_MODULE_1__.render)(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return lit_html__WEBPACK_IMPORTED_MODULE_1__.noChange}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});const h={_$AK:(t,e,i)=>{t._$AK(e,i)},_$AL:t=>t._$AL};(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.2");
//# sourceMappingURL=lit-element.js.map


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gFloatFetcher": () => (/* binding */ gFloatFetcher)
/* harmony export */ });
/* harmony import */ var _utils_queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _bridge_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _bridge_handlers_fetch_inspect_info__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class InspectJob extends _utils_queue__WEBPACK_IMPORTED_MODULE_0__.Job {
    hashCode() {
        return this.data.link;
    }
}
class FloatFetcher extends _utils_queue__WEBPACK_IMPORTED_MODULE_0__.SimpleCachedQueue {
    constructor() {
        /** allow up to 10 simultaneous float fetch reqs */
        super(10);
    }
    fetch(req) {
        return this.add(new InspectJob(req));
    }
    process(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0,_bridge_client__WEBPACK_IMPORTED_MODULE_1__.ClientSend)(_bridge_handlers_fetch_inspect_info__WEBPACK_IMPORTED_MODULE_2__.FetchInspectInfo, req);
            return resp.iteminfo;
        });
    }
}
const gFloatFetcher = new FloatFetcher();


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenericJob": () => (/* binding */ GenericJob),
/* harmony export */   "Job": () => (/* binding */ Job),
/* harmony export */   "SimpleCachedQueue": () => (/* binding */ SimpleCachedQueue)
/* harmony export */ });
/* unused harmony exports Queue, CachedQueue, TTLCachedQueue */
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var _deferred_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Job {
    constructor(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
    /**
     * Hash that uniquely identifies this job.
     *
     * If two jobs have the same hashcode, they are considered identical.
     * */
    hashCode() {
        return JSON.stringify(this.data);
    }
}
class GenericJob extends Job {
}
/**
 * Queue to handle processing of "Jobs" with a request that
 * return a response. Ensures a max concurrency of processing
 * simultaneous jobs.
 */
class Queue {
    constructor(maxConcurrency) {
        this.maxConcurrency = maxConcurrency;
        this.internalQueue = [];
        this.jobsProcessing = 0;
    }
    /** Amount of jobs currently in the queue */
    size() {
        return this.internalQueue.length;
    }
    has(job) {
        return !!this.internalQueue.find((e) => e.job.hashCode() === job.hashCode());
    }
    getOrThrow(job) {
        if (!this.has(job)) {
            throw new Error(`Job[${job.hashCode()}] is not queued`);
        }
        // Guaranteed
        return this.internalQueue.find((e) => e.job.hashCode() === job.hashCode());
    }
    checkQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.internalQueue.length === 0 || this.jobsProcessing >= this.maxConcurrency) {
                // Don't want to launch more instances
                return;
            }
            this.jobsProcessing += 1;
            const queuedJob = this.internalQueue.shift();
            const req = queuedJob.job.getData();
            try {
                const resp = yield this.process(req);
                queuedJob.deferredPromise.resolve(resp);
            }
            catch (e) {
                queuedJob.deferredPromise.reject(e.toString());
            }
            this.jobsProcessing -= 1;
            this.checkQueue();
        });
    }
    add(job) {
        var _a;
        if (this.has(job)) {
            return (_a = this.getOrThrow(job)) === null || _a === void 0 ? void 0 : _a.deferredPromise.promise();
        }
        const promise = new _deferred_promise__WEBPACK_IMPORTED_MODULE_1__.DeferredPromise();
        this.internalQueue.push({ job, deferredPromise: promise });
        setTimeout(() => this.checkQueue(), 0);
        return promise.promise();
    }
}
/**
 * Like a queue, but has an internal cache for elements already requested
 */
class CachedQueue extends Queue {
    /** Amount of previously requested jobs stored in the cache */
    cacheSize() {
        return this.cache().size();
    }
    getCached(job) {
        if (this.cache().has(job.hashCode())) {
            return this.cache().getOrThrow(job.hashCode());
        }
        else {
            return null;
        }
    }
    setCached(job, resp) {
        this.cache().set(job.hashCode(), resp);
    }
    add(job) {
        if (this.getCached(job)) {
            return Promise.resolve(this.getCached(job));
        }
        return super.add(job).then((resp) => {
            this.setCached(job, resp);
            return resp;
        });
    }
}
class SimpleCachedQueue extends CachedQueue {
    constructor() {
        super(...arguments);
        this.cache_ = new _cache__WEBPACK_IMPORTED_MODULE_0__.Cache();
    }
    cache() {
        return this.cache_;
    }
}
class TTLCachedQueue extends CachedQueue {
    constructor(maxConcurrency, ttlMs) {
        super(maxConcurrency);
        this.ttlMs = ttlMs;
        this.cache_ = new _cache__WEBPACK_IMPORTED_MODULE_0__.TTLCache(ttlMs);
    }
    cache() {
        return this.cache_;
    }
}


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cache": () => (/* binding */ Cache),
/* harmony export */   "TTLCache": () => (/* binding */ TTLCache)
/* harmony export */ });
/**
 * Simple Generic Cache with stringified keys
 */
class Cache {
    constructor() {
        this.cache_ = {};
    }
    set(key, value) {
        this.cache_[key] = value;
    }
    get(key) {
        return this.cache_[key];
    }
    getOrThrow(key) {
        if (!this.has(key)) {
            throw new Error(`key ${key} does not exist in map [getOrThrow]`);
        }
        return this.cache_[key];
    }
    has(key) {
        return key in this.cache_;
    }
    size() {
        return Object.keys(this.cache_).length;
    }
}
/**
 * Extension of {@link Cache} that allows setting a TTL (time-to-live) on a key
 * such that automatically expires after a specified time.
 *
 * By default, keys will expire with {@link defaultTTLMs}.
 */
class TTLCache {
    constructor(defaultTTLMs) {
        this.defaultTTLMs = defaultTTLMs;
        this.cache_ = {};
    }
    get(key) {
        const value = this.cache_[key];
        if (!value) {
            return;
        }
        // Check if it also respects TTL
        if (value.expiresEpoch < Date.now()) {
            return;
        }
        return value.data;
    }
    has(key) {
        return !!this.get(key);
    }
    getOrThrow(key) {
        if (!this.has(key)) {
            throw new Error(`key ${key} does not exist in map [getOrThrow]`);
        }
        return this.get(key);
    }
    setWithTTL(key, value, ttlMs) {
        this.cache_[key] = {
            data: value,
            expiresEpoch: Date.now() + ttlMs,
        };
    }
    set(key, value) {
        this.setWithTTL(key, value, this.defaultTTLMs);
    }
    size() {
        return Object.keys(this.cache_).length;
    }
}


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeferredPromise": () => (/* binding */ DeferredPromise)
/* harmony export */ });
/**
 * Similar to a promise, but allows the ability to resolve/reject in a different context
 * */
class DeferredPromise {
    constructor() {
        this.promise_ = new Promise((resolve, reject) => {
            this.resolve_ = resolve;
            this.reject_ = reject;
        });
    }
    resolve(value) {
        this.resolve_(value);
    }
    reject(reason) {
        this.reject_(reason);
    }
    promise() {
        return this.promise_;
    }
}


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FetchInspectInfo": () => (/* binding */ FetchInspectInfo)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


const FetchInspectInfo = new _main__WEBPACK_IMPORTED_MODULE_0__.SimpleHandler(_types__WEBPACK_IMPORTED_MODULE_1__.RequestType.FETCH_INSPECT_INFO, (req) => {
    const apiUrl = `https://api.csfloat.com/?url=${req.link}&minimal=true${req.listPrice ? '&listPrice=' + req.listPrice : ''}`;
    return fetch(apiUrl).then((resp) => {
        return resp.json().then((json) => {
            if (resp.ok) {
                return json;
            }
            else {
                throw Error(json.error);
            }
        });
    });
});


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "formatFloatWithRank": () => (/* binding */ formatFloatWithRank),
/* harmony export */   "formatSeed": () => (/* binding */ formatSeed),
/* harmony export */   "getFadePercentage": () => (/* binding */ getFadePercentage),
/* harmony export */   "getLowestRank": () => (/* binding */ getLowestRank),
/* harmony export */   "isSkin": () => (/* binding */ isSkin),
/* harmony export */   "renderClickableRank": () => (/* binding */ renderClickableRank)
/* harmony export */ });
/* unused harmony exports rangeFromWear, parseRank, getFadeCalculatorAndSupportedWeapon */
/* harmony import */ var _dopplers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var csgo_fade_percentage_calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);



function rangeFromWear(wear) {
    const wearRanges = [
        [0.0, 0.07],
        [0.07, 0.15],
        [0.15, 0.38],
        [0.38, 0.45],
        [0.45, 1.0],
    ];
    for (const range of wearRanges) {
        if (wear > range[0] && wear <= range[1]) {
            return range;
        }
    }
    return null;
}
function getLowestRank(info) {
    if (!info.low_rank && !info.high_rank) {
        // Item has no rank to return
        return;
    }
    return (info.low_rank || 1001) < (info.high_rank || 1001) ? info.low_rank : info.high_rank;
}
function parseRank(info) {
    const rank = getLowestRank(info);
    if (rank && rank <= 1000) {
        return {
            order: rank === info.low_rank ? OrderType.LOW_RANK : OrderType.HIGH_RANK,
            rank,
        };
    }
}
function formatFloatWithRank(info, precisionDigits = 14) {
    let r = info.floatvalue.toFixed(precisionDigits);
    const ranked = parseRank(info);
    if (ranked) {
        r += ` (#${ranked.rank})`;
    }
    return r;
}
function formatSeed(info) {
    let r = info.paintseed.toString();
    if ((0,_dopplers__WEBPACK_IMPORTED_MODULE_0__.hasDopplerPhase)(info.paintindex)) {
        r += ` (${(0,_dopplers__WEBPACK_IMPORTED_MODULE_0__.getDopplerPhase)(info.paintindex)})`;
    }
    return r;
}
var OrderType;
(function (OrderType) {
    OrderType[OrderType["LOW_RANK"] = 1] = "LOW_RANK";
    OrderType[OrderType["HIGH_RANK"] = -1] = "HIGH_RANK";
})(OrderType || (OrderType = {}));
/**
 * Gets formatted link for floatdb for the specified item type and order
 * @param info item properties dict
 * @param order 1 for low float, -1 for high float ordering
 */
function getFloatDbLink(info, order) {
    function getFloatDbCategory(item) {
        var _a, _b;
        if ((_a = item.full_item_name) === null || _a === void 0 ? void 0 : _a.includes('StatTrak')) {
            return 2;
        }
        else if ((_b = item.full_item_name) === null || _b === void 0 ? void 0 : _b.includes('Souvenir')) {
            return 3;
        }
        else {
            // "Normal"
            return 1;
        }
    }
    return `https://csfloat.com/db?defIndex=${info.defindex}&paintIndex=${info.paintindex}&order=${order}&category=${getFloatDbCategory(info)}`;
}
function renderClickableRank(info) {
    const parsedRank = parseRank(info);
    if (!parsedRank) {
        return lit__WEBPACK_IMPORTED_MODULE_1__.html ``;
    }
    return lit__WEBPACK_IMPORTED_MODULE_1__.html ` <a
        style="color: #ebebeb; text-decoration: none; cursor: pointer;"
        href="${getFloatDbLink(info, parsedRank.order)}"
        target="_blank"
    >
        (Rank #${parsedRank.rank})
    </a>`;
}
function isSkin(asset) {
    return asset.tags
        ? asset.tags.some((a) => a.category === 'Weapon' || (a.category === 'Type' && a.internal_name === 'Type_Hands'))
        : ['★', 'Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred'].some((keyword) => asset.market_hash_name.includes(keyword));
}
function getFadeCalculatorAndSupportedWeapon(asset) {
    const FADE_TYPE_TO_CALCULATOR = {
        Fade: csgo_fade_percentage_calculator__WEBPACK_IMPORTED_MODULE_2__.FadeCalculator,
        'Acid Fade': csgo_fade_percentage_calculator__WEBPACK_IMPORTED_MODULE_2__.AcidFadeCalculator,
        'Amber Fade': csgo_fade_percentage_calculator__WEBPACK_IMPORTED_MODULE_2__.AmberFadeCalculator,
    };
    for (const [fadeType, calculator] of Object.entries(FADE_TYPE_TO_CALCULATOR)) {
        for (const supportedWeapon of calculator.getSupportedWeapons()) {
            if (asset.market_hash_name.includes(`${supportedWeapon} | ${fadeType}`)) {
                return [calculator, supportedWeapon.toString()];
            }
        }
    }
}
function getFadePercentage(asset, itemInfo) {
    const fadeCalculatorAndSupportedWeapon = getFadeCalculatorAndSupportedWeapon(asset);
    if (fadeCalculatorAndSupportedWeapon !== undefined) {
        const [calculator, supportedWeapon] = fadeCalculatorAndSupportedWeapon;
        return calculator.getFadePercentage(supportedWeapon, itemInfo.paintseed).percentage;
    }
}
function floor(n, precision) {
    const p = Math.pow(10, (precision || 0));
    return Math.floor(n * p) / p;
}


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDopplerPhase": () => (/* binding */ getDopplerPhase),
/* harmony export */   "hasDopplerPhase": () => (/* binding */ hasDopplerPhase)
/* harmony export */ });
const dopplerPhases = {
    418: 'Phase 1',
    419: 'Phase 2',
    420: 'Phase 3',
    421: 'Phase 4',
    415: 'Ruby',
    416: 'Sapphire',
    417: 'Black Pearl',
    569: 'Phase 1',
    570: 'Phase 2',
    571: 'Phase 3',
    572: 'Phase 4',
    568: 'Emerald',
    618: 'Phase 2',
    619: 'Sapphire',
    617: 'Black Pearl',
    852: 'Phase 1',
    853: 'Phase 2',
    854: 'Phase 3',
    855: 'Phase 4',
    1119: 'Emerald',
    1120: 'Phase 1',
    1121: 'Phase 2',
    1122: 'Phase 3',
    1123: 'Phase 4',
};
function hasDopplerPhase(paintIndex) {
    return paintIndex in dopplerPhases;
}
function getDopplerPhase(paintIndex) {
    return dopplerPhases[paintIndex];
}


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcidFadeCalculator": () => (/* binding */ AcidFadeCalculator),
/* harmony export */   "AmberFadeCalculator": () => (/* binding */ AmberFadeCalculator),
/* harmony export */   "FadeCalculator": () => (/* binding */ FadeCalculator)
/* harmony export */ });
/* harmony import */ var _modules_FadeCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
/* harmony import */ var _modules_AmberFadeCalculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46);
/* harmony import */ var _modules_AcidFadeCalculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);



const FadeCalculator = new _modules_FadeCalculator__WEBPACK_IMPORTED_MODULE_0__["default"]();
const AmberFadeCalculator = new _modules_AmberFadeCalculator__WEBPACK_IMPORTED_MODULE_1__["default"]();
const AcidFadeCalculator = new _modules_AcidFadeCalculator__WEBPACK_IMPORTED_MODULE_2__["default"]();
//# sourceMappingURL=index.js.map

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);

class FadeCalculator extends _BaseCalculator__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.weapons = [
            'AWP',
            'Bayonet',
            'Bowie Knife',
            'Butterfly Knife',
            'Classic Knife',
            'Falchion Knife',
            'Flip Knife',
            'Glock-18',
            'Gut Knife',
            'Huntsman Knife',
            'Karambit',
            'M9 Bayonet',
            'MAC-10',
            'MP7',
            'Navaja Knife',
            'Nomad Knife',
            'Paracord Knife',
            'R8 Revolver',
            'Shadow Daggers',
            'Skeleton Knife',
            'Stiletto Knife',
            'Survival Knife',
            'Talon Knife',
            'UMP-45',
            'Ursus Knife',
        ];
        this.reversedWeapons = [
            'AWP',
            'Karambit',
            'Talon Knife',
        ];
        this.tradeUpWeapons = [
            'AWP',
            'Glock-18',
            'MAC-10',
            'MP7',
            'R8 Revolver',
            'UMP-45',
        ];
        this.configs = {
            default: {
                pattern_offset_x_start: -0.7,
                pattern_offset_x_end: -0.7,
                pattern_offset_y_start: -0.7,
                pattern_offset_y_end: -0.7,
                pattern_rotate_start: -55,
                pattern_rotate_end: -65,
            },
            MP7: {
                pattern_offset_x_start: -0.9,
                pattern_offset_x_end: -0.3,
                pattern_offset_y_start: -0.7,
                pattern_offset_y_end: -0.5,
                pattern_rotate_start: -55,
                pattern_rotate_end: -65,
            },
        };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FadeCalculator);
//# sourceMappingURL=FadeCalculator.js.map

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RandomNumberGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);

class BaseCalculator {
    constructor() {
        this.minPercentage = 80;
    }
    getSupportedWeapons() {
        return this.weapons;
    }
    getFadePercentage(weapon, seed) {
        const percentages = this.getFadePercentages(weapon);
        return percentages[seed];
    }
    getAllFadePercentages() {
        return this.weapons.map((weapon) => ({
            weapon,
            percentages: this.getFadePercentages(weapon),
        }));
    }
    getFadePercentages(weapon) {
        if (!this.weapons.includes(weapon)) {
            throw new Error(`The weapon "${weapon}" is currently not supported.`);
        }
        const config = this.configs[weapon] || this.configs.default;
        const rawResults = [];
        const maxSeed = this.tradeUpWeapons.includes(weapon)
            ? 1000
            : 999;
        for (let i = 0; i <= maxSeed; i += 1) {
            const randomNumberGenerator = new _RandomNumberGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
            randomNumberGenerator.setSeed(i);
            const xOffset = randomNumberGenerator.randomFloat(config.pattern_offset_x_start, config.pattern_offset_x_end);
            randomNumberGenerator.randomFloat(config.pattern_offset_y_start, config.pattern_offset_y_end);
            const rotation = randomNumberGenerator.randomFloat(config.pattern_rotate_start, config.pattern_rotate_end);
            let rawResult;
            if (config.pattern_offset_x_start !== config.pattern_offset_x_end) {
                rawResult = rotation * xOffset;
            }
            else {
                rawResult = rotation;
            }
            rawResults.push(Math.abs(rawResult));
        }
        const isReversed = this.reversedWeapons.includes(weapon);
        let bestResult;
        let worstResult;
        if (isReversed) {
            bestResult = Math.max(...rawResults);
            worstResult = Math.min(...rawResults);
        }
        else {
            bestResult = Math.min(...rawResults);
            worstResult = Math.max(...rawResults);
        }
        const resultRange = worstResult - bestResult;
        const percentageResults = rawResults.map((rawResult) => (worstResult - rawResult) / resultRange);
        const sortedPercentageResults = [...percentageResults].sort((a, b) => a - b);
        return percentageResults.map((percentageResult, i) => ({
            seed: i,
            percentage: this.minPercentage + (percentageResult * (100 - this.minPercentage)),
            ranking: Math.min(sortedPercentageResults.indexOf(percentageResult) + 1, sortedPercentageResults.length - sortedPercentageResults.indexOf(percentageResult)),
        }));
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseCalculator);
//# sourceMappingURL=BaseCalculator.js.map

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class RandomNumberGenerator {
    constructor() {
        this.mIdum = 0;
        this.mIy = 0;
        this.mIv = [];
        this.NTAB = 32;
        this.IA = 16807;
        this.IM = 2147483647;
        this.IQ = 127773;
        this.IR = 2836;
        this.NDIV = 1 + (this.IM - 1) / this.NTAB;
        this.AM = 1.0 / this.IM;
        this.RNMX = 1.0 - 1.2e-7;
    }
    setSeed(seed) {
        this.mIdum = seed;
        if (seed >= 0) {
            this.mIdum = -seed;
        }
        this.mIy = 0;
    }
    generateRandomNumber() {
        let k;
        let j;
        if (this.mIdum <= 0 || this.mIy === 0) {
            if (-this.mIdum < 1) {
                this.mIdum = 1;
            }
            else {
                this.mIdum = -this.mIdum;
            }
            for (j = this.NTAB + 7; j >= 0; j -= 1) {
                k = Math.floor(this.mIdum / this.IQ);
                this.mIdum = Math.floor(this.IA * (this.mIdum - k * this.IQ) - this.IR * k);
                if (this.mIdum < 0) {
                    this.mIdum += this.IM;
                }
                if (j < this.NTAB) {
                    this.mIv[j] = this.mIdum;
                }
            }
            [this.mIy] = this.mIv;
        }
        k = Math.floor(this.mIdum / this.IQ);
        this.mIdum = Math.floor(this.IA * (this.mIdum - k * this.IQ) - this.IR * k);
        if (this.mIdum < 0) {
            this.mIdum += this.IM;
        }
        j = Math.floor(this.mIy / this.NDIV);
        this.mIy = Math.floor(this.mIv[j]);
        this.mIv[j] = this.mIdum;
        return this.mIy;
    }
    randomFloat(low, high) {
        let float = this.AM * this.generateRandomNumber();
        if (float > this.RNMX) {
            float = this.RNMX;
        }
        return (float * (high - low)) + low;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomNumberGenerator);
//# sourceMappingURL=RandomNumberGenerator.js.map

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);

class AmberFadeCalculator extends _BaseCalculator__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.weapons = [
            'AUG',
            'Galil AR',
            'MAC-10',
            'P2000',
            'R8 Revolver',
            'Sawed-Off',
        ];
        this.reversedWeapons = [];
        this.tradeUpWeapons = [
            'AUG',
            'Galil AR',
            'MAC-10',
            'P2000',
            'R8 Revolver',
            'Sawed-Off',
        ];
        this.configs = {
            default: {
                pattern_offset_x_start: -0.7,
                pattern_offset_x_end: -0.7,
                pattern_offset_y_start: -0.7,
                pattern_offset_y_end: -0.7,
                pattern_rotate_start: -55,
                pattern_rotate_end: -65,
            },
        };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AmberFadeCalculator);
//# sourceMappingURL=AmberFadeCalculator.js.map

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);

class AcidFadeCalculator extends _BaseCalculator__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.weapons = [
            'SSG 08',
        ];
        this.reversedWeapons = [];
        this.tradeUpWeapons = [
            'SSG 08',
        ];
        this.configs = {
            default: {
                pattern_offset_x_start: -2.4,
                pattern_offset_x_end: -2.1,
                pattern_offset_y_start: 0.0,
                pattern_offset_y_end: 0.0,
                pattern_rotate_start: -55,
                pattern_rotate_end: -65,
            },
        };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcidFadeCalculator);
//# sourceMappingURL=AcidFadeCalculator.js.map

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRankColour": () => (/* binding */ getRankColour)
/* harmony export */ });
function getRankColour(rank) {
    switch (rank) {
        case 1:
            return '#c3a508';
        case 2:
        case 3:
            return '#9a9999';
        case 4:
        case 5:
            return '#8a5929';
        default:
            return '';
    }
}


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observe": () => (/* binding */ Observe)
/* harmony export */ });
function Observe(computeObject, cb, pollRateMs = 50) {
    let prev = computeObject();
    setInterval(() => {
        const now = computeObject();
        if (prev !== now) {
            cb();
        }
        prev = now;
    }, pollRateMs);
}


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export SelectedItemInfo */
/* harmony import */ var _custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _injectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony import */ var lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _services_float_fetcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35);
/* harmony import */ var _utils_skin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);
/* harmony import */ var _utils_observers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49);
/* harmony import */ var _services_stall_fetcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(51);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








/**
 * Why do we bind to iteminfo0 AND iteminfo1?
 *
 * Steam uses two divs that are interchanged (presumably to make a "fade" animation between them) for each selected
 * item click.
 */
let SelectedItemInfo = class SelectedItemInfo extends _custom__WEBPACK_IMPORTED_MODULE_0__.FloatElement {
    constructor() {
        super(...arguments);
        this.loading = false;
    }
    get asset() {
        return g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.selectedItem;
    }
    get inspectLink() {
        var _a, _b, _c, _d;
        if (!this.asset)
            return;
        if (!((_a = this.asset.description) === null || _a === void 0 ? void 0 : _a.actions) || ((_c = (_b = this.asset.description) === null || _b === void 0 ? void 0 : _b.actions) === null || _c === void 0 ? void 0 : _c.length) === 0)
            return;
        if (!(g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.m_owner)) {
            return;
        }
        return (_d = this.asset.description) === null || _d === void 0 ? void 0 : _d.actions[0].link.replace('%owner_steamid%', g_ActiveInventory.m_owner.strSteamId).replace('%assetid%', this.asset.assetid);
    }
    get stallListing() {
        if (!this.stall) {
            return;
        }
        return (this.stall.data || []).find((e) => { var _a; return e.item.asset_id === ((_a = this.asset) === null || _a === void 0 ? void 0 : _a.assetid); });
    }
    render() {
        if (this.loading) {
            return lit__WEBPACK_IMPORTED_MODULE_2__.html `<div>Loading...</div>`;
        }
        if (!this.itemInfo) {
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        }
        const fadePercentage = this.asset && (0,_utils_skin__WEBPACK_IMPORTED_MODULE_5__.getFadePercentage)(this.asset.description, this.itemInfo);
        return lit__WEBPACK_IMPORTED_MODULE_2__.html `
            <div class="container">
                <div>Float: ${this.itemInfo.floatvalue.toFixed(14)} ${(0,_utils_skin__WEBPACK_IMPORTED_MODULE_5__.renderClickableRank)(this.itemInfo)}</div>
                <div>Paint Seed: ${(0,_utils_skin__WEBPACK_IMPORTED_MODULE_5__.formatSeed)(this.itemInfo)}</div>
                ${fadePercentage !== undefined ? lit__WEBPACK_IMPORTED_MODULE_2__.html `<div>Fade: ${(0,_utils_skin__WEBPACK_IMPORTED_MODULE_5__.floor)(fadePercentage, 5)}%</div>` : lit__WEBPACK_IMPORTED_MODULE_2__.nothing}
                ${this.renderListOnCSFloat()} ${this.renderFloatMarketListing()}
            </div>
        `;
    }
    renderFloatMarketListing() {
        if (!this.stallListing) {
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        }
        return lit__WEBPACK_IMPORTED_MODULE_2__.html `
            <div class="market-btn-container">
                <a class="market-btn" href="https://csfloat.com/item/${this.stallListing.id}" target="_blank">
                    <img src="https://csfloat.com/assets/n_full_logo.png" height="21" style="margin-right: 5px;" />
                    <span>
                        Listed for
                        <b>$${(this.stallListing.price / 100).toFixed(2)}</b>
                    </span>
                </a>
            </div>
        `;
    }
    renderListOnCSFloat() {
        var _a;
        if (this.stallListing) {
            // Don't tell them to list it if it's already listed...
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        }
        if (((_a = g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.m_owner) === null || _a === void 0 ? void 0 : _a.strSteamId) !== g_steamID) {
            // Not the signed-in user, don't show
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        }
        return lit__WEBPACK_IMPORTED_MODULE_2__.html `
            <div class="market-btn-container">
                <a class="market-btn" href="https://csfloat.com" target="_blank">
                    <span>List on </span>
                    <img src="https://csfloat.com/assets/n_full_logo.png" height="21" style="margin-left: 5px;" />
                </a>
            </div>
        `;
    }
    processSelectChange() {
        return __awaiter(this, void 0, void 0, function* () {
            // Reset state in-case they swap between skin and non-skin
            this.itemInfo = undefined;
            if (!this.asset)
                return;
            if (!(0,_utils_skin__WEBPACK_IMPORTED_MODULE_5__.isSkin)(this.asset.description))
                return;
            // Commodities won't have inspect links
            if (!this.inspectLink)
                return;
            try {
                this.loading = true;
                this.itemInfo = yield _services_float_fetcher__WEBPACK_IMPORTED_MODULE_4__.gFloatFetcher.fetch({
                    link: this.inspectLink,
                });
            }
            catch (e) {
                console.error(`Failed to fetch float for ${this.asset.assetid}: ${e.toString()}`);
            }
            finally {
                this.loading = false;
            }
        });
    }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        // For the initial load, in case an item is pre-selected
        this.processSelectChange();
        (0,_utils_observers__WEBPACK_IMPORTED_MODULE_6__.Observe)(() => this.asset, () => {
            this.processSelectChange();
        });
        if ((_a = g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.m_owner) === null || _a === void 0 ? void 0 : _a.strSteamId) {
            // Ignore errors
            _services_stall_fetcher__WEBPACK_IMPORTED_MODULE_7__.gStallFetcher.fetch({ steam_id64: g_ActiveInventory === null || g_ActiveInventory === void 0 ? void 0 : g_ActiveInventory.m_owner.strSteamId })
                .then((stall) => (this.stall = stall));
        }
    }
};
SelectedItemInfo.styles = [
    ..._custom__WEBPACK_IMPORTED_MODULE_0__.FloatElement.styles,
    lit__WEBPACK_IMPORTED_MODULE_2__.css `
            .container {
                margin-bottom: 10px;
            }

            .market-btn-container {
                margin: 10px 0 10px 0;
                padding: 5px;
                width: fit-content;
                border: 1px #5a5a5a solid;
                background-color: #383838;
                border-radius: 3px;
            }

            .market-btn {
                font-size: 15px;
                display: flex;
                align-items: center;
                color: #ebebeb;
                text-decoration: none;
            }
        `,
];
__decorate([
    (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.state)()
], SelectedItemInfo.prototype, "itemInfo", void 0);
__decorate([
    (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.state)()
], SelectedItemInfo.prototype, "loading", void 0);
SelectedItemInfo = __decorate([
    (0,_injectors__WEBPACK_IMPORTED_MODULE_1__.CustomElement)(),
    (0,_injectors__WEBPACK_IMPORTED_MODULE_1__.InjectAfter)('div#iteminfo0_content .item_desc_description div.item_desc_game_info', _injectors__WEBPACK_IMPORTED_MODULE_1__.InjectionMode.CONTINUOUS),
    (0,_injectors__WEBPACK_IMPORTED_MODULE_1__.InjectAfter)('div#iteminfo1_content .item_desc_description div.item_desc_game_info', _injectors__WEBPACK_IMPORTED_MODULE_1__.InjectionMode.CONTINUOUS)
], SelectedItemInfo);



/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gStallFetcher": () => (/* binding */ gStallFetcher)
/* harmony export */ });
/* harmony import */ var _utils_queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _bridge_handlers_fetch_stall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var _bridge_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class StallFetcher extends _utils_queue__WEBPACK_IMPORTED_MODULE_0__.SimpleCachedQueue {
    fetch(req) {
        return this.add(new _utils_queue__WEBPACK_IMPORTED_MODULE_0__.GenericJob(req));
    }
    process(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0,_bridge_client__WEBPACK_IMPORTED_MODULE_2__.ClientSend)(_bridge_handlers_fetch_stall__WEBPACK_IMPORTED_MODULE_1__.FetchStall, req);
            }
            catch (e) {
                // Stub out to prevent future calls
                return { data: [] };
            }
        });
    }
}
const gStallFetcher = new StallFetcher(1);


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FetchStall": () => (/* binding */ FetchStall)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const FetchStall = new _main__WEBPACK_IMPORTED_MODULE_0__.SimpleHandler(_types__WEBPACK_IMPORTED_MODULE_1__.RequestType.FETCH_STALL, (req) => __awaiter(void 0, void 0, void 0, function* () {
    return fetch(`https://csfloat.com/api/v1/users/${req.steam_id64}/stall`).then((resp) => {
        return resp.json().then((json) => {
            if (resp.ok) {
                return json;
            }
            else {
                throw Error(json.message);
            }
        });
    });
}));


/***/ })
/******/ 	]);
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _components_inventory_inventory_item_holder_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _components_inventory_selected_item_info__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



(0,_utils__WEBPACK_IMPORTED_MODULE_0__.init)('src/lib/page_scripts/inventory.js', main);
function main() {
    return __awaiter(this, void 0, void 0, function* () { });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixDQUFPLEdBQUcsRUFBRSxFQUFFO0lBQ1YsT0FBTyxLQUFLLENBQUMsb0NBQW9DLEdBQUcsQ0FBQyxVQUFVLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25GLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQWtELEVBQUUsRUFBRTtZQUMzRSxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxJQUFJLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxNQUFNLEtBQUssQ0FBRSxJQUFnQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFEO1FBQ0wsQ0FBQyxDQUFnQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxFQUNKLENBQUM7Ozs7OztVQzlCRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQTZCO0FBQ21DO0FBQ1o7QUFFcEQsNENBQUksQ0FBQyxtQ0FBbUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVoRCxTQUFlLElBQUk7MERBQUksQ0FBQztDQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9wYWdlX3NjcmlwdHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy90eXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS93cmFwcGVycy9wcml2aWxlZ2VkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS90eXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL2RldGVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL3NuaXBzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnVzL3Bvc3RfbWVzc2FnZV9idXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9jc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZmV0Y2hfZXh0ZW5zaW9uX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jb21wb25lbnRzL2ludmVudG9yeS9pbnZlbnRvcnlfaXRlbV9ob2xkZXJfbWV0YWRhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jb21wb25lbnRzL2luamVjdG9ycy50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0L2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL2N1c3RvbS1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL2V2ZW50LW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9xdWVyeS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFzeW5jLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9xdWVyeS1hc3NpZ25lZC1lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcXVlcnktYXNzaWduZWQtbm9kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jb21wb25lbnRzL2NvbW1vbi9pdGVtX2hvbGRlcl9tZXRhZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbXBvbmVudHMvY3VzdG9tLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9yZWFjdGl2ZS1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvY3NzLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvbGl0LWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L2xpdC1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvc2VydmljZXMvZmxvYXRfZmV0Y2hlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL3F1ZXVlLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvY2FjaGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi91dGlscy9kZWZlcnJlZF9wcm9taXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2ZldGNoX2luc3BlY3RfaW5mby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL3NraW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi91dGlscy9kb3BwbGVycy50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3Nnby1mYWRlLXBlcmNlbnRhZ2UtY2FsY3VsYXRvci9kaXN0L2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3Nnby1mYWRlLXBlcmNlbnRhZ2UtY2FsY3VsYXRvci9kaXN0L2VzbS9tb2R1bGVzL0ZhZGVDYWxjdWxhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc2dvLWZhZGUtcGVyY2VudGFnZS1jYWxjdWxhdG9yL2Rpc3QvZXNtL21vZHVsZXMvQmFzZUNhbGN1bGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NzZ28tZmFkZS1wZXJjZW50YWdlLWNhbGN1bGF0b3IvZGlzdC9lc20vbW9kdWxlcy9SYW5kb21OdW1iZXJHZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NzZ28tZmFkZS1wZXJjZW50YWdlLWNhbGN1bGF0b3IvZGlzdC9lc20vbW9kdWxlcy9BbWJlckZhZGVDYWxjdWxhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc2dvLWZhZGUtcGVyY2VudGFnZS1jYWxjdWxhdG9yL2Rpc3QvZXNtL21vZHVsZXMvQWNpZEZhZGVDYWxjdWxhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvcmFua3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi91dGlscy9vYnNlcnZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jb21wb25lbnRzL2ludmVudG9yeS9zZWxlY3RlZF9pdGVtX2luZm8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9zZXJ2aWNlcy9zdGFsbF9mZXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2ZldGNoX3N0YWxsLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy8uL3NyYy9saWIvcGFnZV9zY3JpcHRzL2ludmVudG9yeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V4ZWN1dGVTY3JpcHRPblBhZ2V9IGZyb20gJy4uL2JyaWRnZS9oYW5kbGVycy9leGVjdXRlX3NjcmlwdCc7XG5pbXBvcnQge0NsaWVudFNlbmR9IGZyb20gJy4uL2JyaWRnZS9jbGllbnQnO1xuaW1wb3J0IHtpblBhZ2VDb250ZXh0fSBmcm9tICcuLi91dGlscy9zbmlwcyc7XG5pbXBvcnQge0V4ZWN1dGVDc3NPblBhZ2V9IGZyb20gJy4uL2JyaWRnZS9oYW5kbGVycy9leGVjdXRlX2Nzcyc7XG5pbXBvcnQge0ZldGNoRXh0ZW5zaW9uRmlsZX0gZnJvbSAnLi4vYnJpZGdlL2hhbmRsZXJzL2ZldGNoX2V4dGVuc2lvbl9maWxlJztcbmltcG9ydCB7aXNGaXJlZm94fSBmcm9tICcuLi91dGlscy9kZXRlY3QnO1xuaW1wb3J0IHtnX1Bvc3RNZXNzYWdlQnVzfSBmcm9tICcuLi9idXMvcG9zdF9tZXNzYWdlX2J1cyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYXRlQ2hyb21pdW0oc2NyaXB0UGF0aDogc3RyaW5nKSB7XG4gICAgQ2xpZW50U2VuZChFeGVjdXRlQ3NzT25QYWdlLCB7XG4gICAgICAgIHBhdGg6ICdzcmMvZ2xvYmFsLmNzcycsXG4gICAgfSk7XG5cbiAgICBDbGllbnRTZW5kKEV4ZWN1dGVTY3JpcHRPblBhZ2UsIHtcbiAgICAgICAgcGF0aDogc2NyaXB0UGF0aCxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5pdGlhdGVGaXJlZm94KHNjcmlwdFBhdGg6IHN0cmluZykge1xuICAgIGdfUG9zdE1lc3NhZ2VCdXMuaGFuZGxlUmVxdWVzdHMoKTtcblxuICAgIC8vIFdoeSBkbyB3ZSBuZWVkIHRvIHVzZSBtYW51YWwgRE9NIHNjcmlwdCBpbmplY3Rpb24gYW5kXG4gICAgLy8gZmV0Y2ggdGhlIHRleHQgb2YgdGhlIHNjcmlwdD9cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2NzZmxvYXQvZXh0ZW5zaW9uL2lzc3Vlcy8xNTUjaXNzdWVjb21tZW50LTE2Mzk3ODE5MTRcblxuICAgIC8vIFdlIHdhbnQgdG8gaW5qZWN0IHRoZSBJRCBvZiB0aGUgZXh0ZW5zaW9uXG4gICAgY29uc3QgaWQgPSBicm93c2VyLnJ1bnRpbWUuaWQ7XG4gICAgY29uc3QgbW9kZWxVcmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKCdzcmMvbW9kZWxfZnJhbWUuaHRtbCcpO1xuICAgIGNvbnN0IGVudHJ5U2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgZW50cnlTY3JpcHQuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBcbiAgICAgICAgd2luZG93LkNTRkxPQVRfRVhURU5TSU9OX0lEID0gJyR7aWR9JztcbiAgICAgICAgd2luZG93LkNTRkxPQVRfTU9ERUxfRlJBTUVfVVJMID0gJyR7bW9kZWxVcmx9JztcbiAgICBgKVxuICAgICk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbnRyeVNjcmlwdCk7XG5cbiAgICBjb25zdCBzY3JpcHRSZXNwID0gYXdhaXQgQ2xpZW50U2VuZChGZXRjaEV4dGVuc2lvbkZpbGUsIHtcbiAgICAgICAgcGF0aDogc2NyaXB0UGF0aCxcbiAgICB9KTtcblxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzY3JpcHRSZXNwLnRleHQpKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgICBjb25zdCBzdHlsZVJlc3AgPSBhd2FpdCBDbGllbnRTZW5kKEZldGNoRXh0ZW5zaW9uRmlsZSwge1xuICAgICAgICBwYXRoOiAnc3JjL2dsb2JhbC5jc3MnLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0eWxlUmVzcC50ZXh0KSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFnZSBzY3JpcHQsIGV4ZWN1dGluZyBpdCBpbiB0aGUgcGFnZSBjb250ZXh0IGlmIG5lY2Vzc2FyeVxuICpcbiAqIEBwYXJhbSBzY3JpcHRQYXRoIFJlbGF0aXZlIHBhdGggb2YgdGhlIHNjcmlwdCAoYWx3YXlzIGluIC5qcylcbiAqIEBwYXJhbSBpZlBhZ2UgRm4gdG8gcnVuIGlmIHdlIGFyZSBpbiB0aGUgcGFnZSdzIGV4ZWN1dGlvbiBjb250ZXh0XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KHNjcmlwdFBhdGg6IHN0cmluZywgaWZQYWdlOiAoKSA9PiBhbnkpIHtcbiAgICAvLyBEb24ndCBhbGxvdyB0aGUgcGFnZSBzY3JpcHQgdG8gcnVuIHRoaXMuXG4gICAgaWYgKGluUGFnZUNvbnRleHQoKSkge1xuICAgICAgICAvLyBAdHMtaWdub3JlIFNldCBnbG9iYWwgaWRlbnRpZmllciBmb3Igb3RoZXIgZXh0ZW5zaW9ucyB0byB1c2VcbiAgICAgICAgd2luZG93LmNzZmxvYXQgPSB0cnVlO1xuICAgICAgICAvLyBAdHMtaWdub3JlIERlcHJlY2F0ZWQgbmFtZVxuICAgICAgICB3aW5kb3cuY3Nnb2Zsb2F0ID0gdHJ1ZTtcblxuICAgICAgICBpZlBhZ2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0ZpcmVmb3goKSkge1xuICAgICAgICBhd2FpdCBpbml0aWF0ZUZpcmVmb3goc2NyaXB0UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgaW5pdGlhdGVDaHJvbWl1bShzY3JpcHRQYXRoKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjIENTRmxvYXQgTWFya2V0IENoZWNrZXIgKHYke2Nocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkudmVyc2lvbn0pIGJ5IFN0ZXA3NzUwIGAsXG4gICAgICAgICdiYWNrZ3JvdW5kOiAjMDA0NTk0OyBjb2xvcjogI2ZmZjsnXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgJyVjIENoYW5nZWxvZyBjYW4gYmUgZm91bmQgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2NzZmxvYXQvZXh0ZW5zaW9uICcsXG4gICAgICAgICdiYWNrZ3JvdW5kOiAjMDA0NTk0OyBjb2xvcjogI2ZmZjsnXG4gICAgKTtcbn1cbiIsImltcG9ydCB7RW1wdHlSZXNwb25zZUhhbmRsZXJ9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7UHJpdmlsZWdlZEhhbmRsZXJ9IGZyb20gJy4uL3dyYXBwZXJzL3ByaXZpbGVnZWQnO1xuXG5pbnRlcmZhY2UgRXhlY3V0ZVNjcmlwdFJlcXVlc3Qge1xuICAgIHBhdGg6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEV4ZWN1dGVTY3JpcHRPblBhZ2UgPSBuZXcgUHJpdmlsZWdlZEhhbmRsZXIoXG4gICAgbmV3IEVtcHR5UmVzcG9uc2VIYW5kbGVyPEV4ZWN1dGVTY3JpcHRSZXF1ZXN0PihSZXF1ZXN0VHlwZS5FWEVDVVRFX1NDUklQVF9PTl9QQUdFLCBhc3luYyAocmVxLCBzZW5kZXIpID0+IHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBpbmplY3QgdGhlIGV4dGVuc2lvbiBJRCBkeW5hbWljYWxseSBzbyB0aGUgY2xpZW50IGtub3dzIHdobyB0b1xuICAgICAgICAvLyBjb21tdW5pY2F0ZSB3aXRoLlxuICAgICAgICAvL1xuICAgICAgICAvLyBPbiBGaXJlZm94LCBleHRlbnNpb24gSURzIGFyZSByYW5kb20sIHNvIHRoaXMgaXMgbmVjZXNzYXJ5LlxuICAgICAgICBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgdGFyZ2V0OiB7dGFiSWQ6IHNlbmRlci50YWI/LmlkIGFzIG51bWJlcn0sXG4gICAgICAgICAgICB3b3JsZDogJ01BSU4nLFxuICAgICAgICAgICAgYXJnczogW2Nocm9tZS5ydW50aW1lLmlkLCBjaHJvbWUucnVudGltZS5nZXRVUkwoJ3NyYy9tb2RlbF9mcmFtZS5odG1sJyldLFxuICAgICAgICAgICAgZnVuYzogZnVuY3Rpb24gRXh0ZW5zaW9uSWQoZXh0ZW5zaW9uSWQsIG1vZGVsRnJhbWVVcmwpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuQ1NGTE9BVF9FWFRFTlNJT05fSUQgPSBleHRlbnNpb25JZDtcbiAgICAgICAgICAgICAgICB3aW5kb3cuQ1NGTE9BVF9NT0RFTF9GUkFNRV9VUkwgPSBtb2RlbEZyYW1lVXJsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgICAgIHRhcmdldDoge3RhYklkOiBzZW5kZXIudGFiPy5pZCBhcyBudW1iZXJ9LFxuICAgICAgICAgICAgZmlsZXM6IFtyZXEucGF0aF0sXG4gICAgICAgICAgICB3b3JsZDogJ01BSU4nLFxuICAgICAgICB9KTtcbiAgICB9KVxuKTtcbiIsImltcG9ydCB7UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgU2ltcGxlSGFuZGxlcjxSZXEsIFJlc3A+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBSZXF1ZXN0VHlwZSwgcHJpdmF0ZSBoYW5kbGVyOiAocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpID0+IFByb21pc2U8UmVzcD4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXF1ZXN0KHJlcXVlc3Q6IFJlcSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKTogUHJvbWlzZTxSZXNwPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCwgc2VuZGVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1wdHkge31cblxuZXhwb3J0IGNsYXNzIEVtcHR5UmVxdWVzdEhhbmRsZXI8UmVzcD4gaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxFbXB0eSwgUmVzcD4ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogUmVxdWVzdFR5cGUsIHByaXZhdGUgaGFuZGxlcjogKHNlbmRlcjogTWVzc2FnZVNlbmRlcikgPT4gUHJvbWlzZTxSZXNwPikge31cblxuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogRW1wdHksIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8UmVzcD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHNlbmRlcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1wdHlSZXNwb25zZUhhbmRsZXI8UmVxPiBpbXBsZW1lbnRzIFJlcXVlc3RIYW5kbGVyPFJlcSwgdm9pZD4ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogUmVxdWVzdFR5cGUsIHByaXZhdGUgaGFuZGxlcjogKHJlcXVlc3Q6IFJlcSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKSA9PiBQcm9taXNlPHZvaWQ+KSB7fVxuXG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHJlcXVlc3QsIHNlbmRlcik7XG4gICAgfVxufVxuIiwiZXhwb3J0IGVudW0gUmVxdWVzdFR5cGUge1xuICAgIEVYRUNVVEVfU0NSSVBUX09OX1BBR0UsXG4gICAgRVhFQ1VURV9DU1NfT05fUEFHRSxcbiAgICBGRVRDSF9JTlNQRUNUX0lORk8sXG4gICAgRkVUQ0hfU1RBTEwsXG4gICAgU1RPUkFHRV9HRVQsXG4gICAgU1RPUkFHRV9TRVQsXG4gICAgU1RPUkFHRV9SRU1PVkUsXG4gICAgRkVUQ0hfUEVORElOR19UUkFERVMsXG4gICAgRkVUQ0hfU0tJTl9NT0RFTCxcbiAgICBGRVRDSF9FWFRFTlNJT05fRklMRSxcbiAgICBBTk5PVEFURV9PRkZFUixcbiAgICBFWFRFTlNJT05fVkVSU0lPTixcbn1cbiIsImltcG9ydCB7UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4uL2hhbmRsZXJzL3R5cGVzJztcbmltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcblxuLyoqXG4gKiBSZXN0cmljdHMgYSBnaXZlbiBoYW5kbGVyIHN1Y2ggdGhhdCBpdCBjYW4gb25seSBydW4gaWYgdGhlIHNlbmRlciBpc1xuICogdmVyaWZpZWQgdG8gYmUgZnJvbSB0aGUgZXh0ZW5zaW9uJ3Mgb3JpZ2luIChpZS4gY29udGVudCBzY3JpcHQpXG4gKi9cbmV4cG9ydCBjbGFzcyBQcml2aWxlZ2VkSGFuZGxlcjxSZXEsIFJlc3A+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBoYW5kbGVyOiBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+KSB7fVxuXG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZ2V0VHlwZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPFJlc3A+IHtcbiAgICAgICAgaWYgKHNlbmRlci5pZCAhPT0gY2hyb21lLnJ1bnRpbWUuaWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdCB0byBhY2Nlc3MgcmVzdHJpY3RlZCBtZXRob2Qgb3V0c2lkZSBvZiBzZWN1cmUgY29udGV4dCAoaWUuIGNvbnRlbnQgc2NyaXB0KScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5oYW5kbGVSZXF1ZXN0KHJlcXVlc3QsIHNlbmRlcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtJbnRlcm5hbFJlcXVlc3RCdW5kbGUsIEludGVybmFsUmVzcG9uc2VCdW5kbGUsIFJlcXVlc3RIYW5kbGVyLCBWZXJzaW9ufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7aXNGaXJlZm94LCBydW50aW1lTmFtZXNwYWNlfSBmcm9tICcuLi91dGlscy9kZXRlY3QnO1xuaW1wb3J0IHtpblBhZ2VDb250ZXh0fSBmcm9tICcuLi91dGlscy9zbmlwcyc7XG5pbXBvcnQge2dfUG9zdE1lc3NhZ2VCdXN9IGZyb20gJy4uL2J1cy9wb3N0X21lc3NhZ2VfYnVzJztcblxuZnVuY3Rpb24gY2FuVXNlU2VuZE1lc3NhZ2UoKSB7XG4gICAgLy8gTm90IHN1cHBvcnRlZCBpbiBGaXJlZm94IFBhZ2UgQ29udGV4dFxuICAgIHJldHVybiAhKGlzRmlyZWZveCgpICYmIGluUGFnZUNvbnRleHQoKSk7XG59XG5cbi8qKlxuICogU2VuZCBhIHJlcXVlc3QgdG8gYmUgaGFuZGxlZCBieSB0aGUgYmFja2dyb3VuZCB3b3JrZXJcbiAqXG4gKiBDYW4gYmUgY2FsbGVkIGZyb20gYSBjb250ZW50IHNjcmlwdCBvciBwYWdlIGl0c2VsZlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ2xpZW50U2VuZDxSZXEsIFJlc3A+KGhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyPFJlcSwgUmVzcD4sIGFyZ3M6IFJlcSk6IFByb21pc2U8UmVzcD4ge1xuICAgIGNvbnN0IGJ1bmRsZTogSW50ZXJuYWxSZXF1ZXN0QnVuZGxlID0ge1xuICAgICAgICB2ZXJzaW9uOiBWZXJzaW9uLlYxLFxuICAgICAgICByZXF1ZXN0X3R5cGU6IGhhbmRsZXIuZ2V0VHlwZSgpLFxuICAgICAgICByZXF1ZXN0OiBhcmdzLFxuICAgICAgICBpZDogTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwMDApLFxuICAgIH07XG5cbiAgICBpZiAoY2FuVXNlU2VuZE1lc3NhZ2UoKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBCYWQgdHlwZXNcbiAgICAgICAgICAgIHJ1bnRpbWVOYW1lc3BhY2UoKS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAgICAgIHdpbmRvdy5DU0ZMT0FUX0VYVEVOU0lPTl9JRCB8fCBjaHJvbWUucnVudGltZS5pZCxcbiAgICAgICAgICAgICAgICBidW5kbGUsXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBCYWQgdHlwZXNcbiAgICAgICAgICAgICAgICAocmVzcDogSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcD8ucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcD8uZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmFsbGJhY2sgdG8gcG9zdG1lc3NhZ2UgYnVzIGZvciBicm93c2VycyB0aGF0IGRvbid0IGltcGxlbWVudFxuICAgICAgICAvLyBzcGVjcyBmdWxseVxuICAgICAgICByZXR1cm4gZ19Qb3N0TWVzc2FnZUJ1cy5zZW5kUmVxdWVzdChidW5kbGUpO1xuICAgIH1cbn1cbiIsImltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vaGFuZGxlcnMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RIYW5kbGVyPFJlcSwgUmVzcD4ge1xuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPFJlc3A+O1xuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGU7XG59XG5cbmV4cG9ydCBlbnVtIFZlcnNpb24ge1xuICAgIFYxID0gJ0NTRkxPQVRfVjEnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsUmVxdWVzdEJ1bmRsZSB7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuXG4gICAgcmVxdWVzdF90eXBlOiBSZXF1ZXN0VHlwZTtcblxuICAgIC8vIElucHV0IHJlcXVlc3RcbiAgICByZXF1ZXN0OiBhbnk7XG5cbiAgICAvLyBSYW5kb20gSUQgdG8gaWRlbnRpZnkgdGhlIHJlcXVlc3RcbiAgICBpZDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsUmVzcG9uc2VCdW5kbGUge1xuICAgIHJlcXVlc3RfdHlwZTogUmVxdWVzdFR5cGU7XG5cbiAgICAvLyBSZXNwb25zZVxuICAgIHJlc3BvbnNlOiBhbnk7XG5cbiAgICBlcnJvcjogc3RyaW5nO1xuXG4gICAgLy8gUmFuZG9tIElEIHRvIGlkZW50aWZ5IHRoZSByZXF1ZXN0XG4gICAgaWQ6IG51bWJlcjtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBpc0ZpcmVmb3goKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMTtcbn1cblxuLyoqXG4gKiBUaGFua3MgdG8gb3VyIGJyb3dzZXIgb3ZlcmxvcmRzLCB3ZSBoYXZlIHR3byBuYW1lc3BhY2VzIGZvciBgeC5ydW50aW1lLmZuKClgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydW50aW1lTmFtZXNwYWNlKCkge1xuICAgIGlmIChpc0ZpcmVmb3goKSkge1xuICAgICAgICByZXR1cm4gYnJvd3NlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2hyb21lO1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBpblBhZ2VDb250ZXh0KCkge1xuICAgIHJldHVybiB0eXBlb2YgY2hyb21lID09PSAndW5kZWZpbmVkJyB8fCAhY2hyb21lLmV4dGVuc2lvbjtcbn1cbiIsImltcG9ydCB7SW50ZXJuYWxSZXF1ZXN0QnVuZGxlLCBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlLCBWZXJzaW9ufSBmcm9tICcuLi9icmlkZ2UvdHlwZXMnO1xuaW1wb3J0IHtydW50aW1lTmFtZXNwYWNlfSBmcm9tICcuLi91dGlscy9kZXRlY3QnO1xuXG4vKipcbiAqIE1lc3NhZ2UgYnVzIHRoYXQgdXNlcyBgcG9zdE1lc3NhZ2VgIGluIG9yZGVyIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIGJhY2tncm91bmRcbiAqIHNlcnZpY2Ugd29ya2VyL3NjcmlwdC5cbiAqXG4gKiBXaHk/IEJlY2F1c2UgdGhlIGNsaWVudCBwYWdlIChpZS4gU3RlYW0gcGFnZSkgb24gRmlyZWZveCBpcyBub3QgY2FwYWJsZSBvZlxuICogc2VuZGluZyBhIG1lc3NhZ2UgZGlyZWN0bHkgdG8gdGhlIGV4dGVuc2lvbiBiYWNrZ3JvdW5kLlxuICpcbiAqIFNvIGl0IHJlcXVpcmVzIHVzIHRvIGRvIHRoZSBmb2xsb3dpbmcgZGFuY2U6XG4gKiBwYWdlIDwtLShwb3N0bWVzc2FnZSktLT4gY29udGVudCBzY3JpcHQgPC0tKHNlbmRtZXNzYWdlKS0tPiBiYWNrZ3JvdW5kIHNjcmlwdFxuICpcbiAqIFRoaXMgZGFuY2UgaXMgYWJzdHJhY3RlZCBpbiBgQ2xpZW50U2VuZGAsIGFuZCBvbmx5IHVzZXMgdGhpcyBidXMgaWZcbiAqIGBzZW5kbWVzc2FnZWAgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgcGFnZS5cbiAqL1xuY2xhc3MgUG9zdE1lc3NhZ2VCdXMge1xuICAgIC8qKlxuICAgICAqIEZvciB0aGUgcmVxdWVzdGVyIChpZS4gcGFnZSksIHRvIHdhaXQgdW50aWwgaXQgZ2V0cyBhIHJlc3BvbnNlXG4gICAgICogZnJvbSB0aGUgY29udGVudCBzY3JpcHQgdmlhLiBwb3N0TWVzc2FnZSBmb3IgdGhlIGdpdmVuIHJlcXVlc3QgSURcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBSZXF1ZXN0IElEXG4gICAgICovXG4gICAgd2FpdFVudGlsUmVzcG9uc2VGb3IoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3AgPSBlLmRhdGEgYXMgSW50ZXJuYWxSZXNwb25zZUJ1bmRsZTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5pZCAhPT0gaWQgfHwgIXJlc3AucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgbGVha3NcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZXIsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXNwPy5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3AucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwPy5lcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSByZXF1ZXN0IHRvIGJlIGRvbmUgdGhyb3VnaCB0aGUgYnVzLCByZXR1cm5zIHRoZSBhcHByb3ByaWF0ZVxuICAgICAqIHJlc3BvbnNlIGZvciB0aGUgaW5wdXQgYnVuZGxlIGhhbmRsZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBidW5kbGUgUmVxdWVzdCBCdW5kbGVcbiAgICAgKi9cbiAgICBzZW5kUmVxdWVzdChidW5kbGU6IEludGVybmFsUmVxdWVzdEJ1bmRsZSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShidW5kbGUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLndhaXRVbnRpbFJlc3BvbnNlRm9yKGJ1bmRsZS5pZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBoYW5kbGVyIChjb250ZW50IHNjcmlwdCkgZm9yIG5ldyByZXF1ZXN0cyBmcm9tIHRoZSBwYWdlLlxuICAgICAqXG4gICAgICogRWFjaCByZXF1ZXN0IGlzIGVmZmVjdGl2ZWx5IFwicHJveGllZFwiIHRvIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdC93b3JrZXJcbiAgICAgKiB0byBhY3R1YWxseSBleGVjdXRlIGl0J3MgaGFuZGxlci5cbiAgICAgKi9cbiAgICBoYW5kbGVSZXF1ZXN0cygpIHtcbiAgICAgICAgY29uc3QgaCA9IChlOiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmRhdGEudmVyc2lvbiAhPT0gVmVyc2lvbi5WMSB8fCAhZS5kYXRhLnJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgbWVzc2FnZXMgdGhhdCBhcmVuJ3QgZm9yIHRoaXMgYnJpZGdlXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZW5kIHRvIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBCYWQgdHlwZXNcbiAgICAgICAgICAgIHJ1bnRpbWVOYW1lc3BhY2UoKS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLmlkLFxuICAgICAgICAgICAgICAgIGUuZGF0YSxcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgICAgIChyZXNwOiBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShyZXNwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaCk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZ19Qb3N0TWVzc2FnZUJ1cyA9IG5ldyBQb3N0TWVzc2FnZUJ1cygpO1xuIiwiaW1wb3J0IHtFbXB0eVJlc3BvbnNlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtQcml2aWxlZ2VkSGFuZGxlcn0gZnJvbSAnLi4vd3JhcHBlcnMvcHJpdmlsZWdlZCc7XG5cbmludGVyZmFjZSBFeGVjdXRlQ3NzUmVxdWVzdCB7XG4gICAgcGF0aDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRXhlY3V0ZUNzc09uUGFnZSA9IG5ldyBQcml2aWxlZ2VkSGFuZGxlcihcbiAgICBuZXcgRW1wdHlSZXNwb25zZUhhbmRsZXI8RXhlY3V0ZUNzc1JlcXVlc3Q+KFJlcXVlc3RUeXBlLkVYRUNVVEVfQ1NTX09OX1BBR0UsIGFzeW5jIChyZXEsIHNlbmRlcikgPT4ge1xuICAgICAgICBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmluc2VydENTUyh7XG4gICAgICAgICAgICB0YXJnZXQ6IHt0YWJJZDogc2VuZGVyLnRhYj8uaWQgYXMgbnVtYmVyfSxcbiAgICAgICAgICAgIGZpbGVzOiBbcmVxLnBhdGhdLFxuICAgICAgICB9KTtcbiAgICB9KVxuKTtcbiIsImltcG9ydCB7U2ltcGxlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtQcml2aWxlZ2VkSGFuZGxlcn0gZnJvbSAnLi4vd3JhcHBlcnMvcHJpdmlsZWdlZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hFeHRlbnNpb25GaWxlUmVxdWVzdCB7XG4gICAgcGF0aDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoRXh0ZW5zaW9uRmlsZVJlc3BvbnNlIHtcbiAgICB0ZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBGZXRjaEV4dGVuc2lvbkZpbGUgPSBuZXcgUHJpdmlsZWdlZEhhbmRsZXIoXG4gICAgbmV3IFNpbXBsZUhhbmRsZXI8RmV0Y2hFeHRlbnNpb25GaWxlUmVxdWVzdCwgRmV0Y2hFeHRlbnNpb25GaWxlUmVzcG9uc2U+KFxuICAgICAgICBSZXF1ZXN0VHlwZS5GRVRDSF9FWFRFTlNJT05fRklMRSxcbiAgICAgICAgYXN5bmMgKHJlcSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKHJlcS5wYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHIudGV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0ZXh0LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIClcbik7XG4iLCJpbXBvcnQge0N1c3RvbUVsZW1lbnQsIEluamVjdEFwcGVuZCwgSW5qZWN0aW9uTW9kZX0gZnJvbSAnLi4vaW5qZWN0b3JzJztcbmltcG9ydCB7cmdBc3NldH0gZnJvbSAnLi4vLi4vdHlwZXMvc3RlYW0nO1xuaW1wb3J0IHtJdGVtSG9sZGVyTWV0YWRhdGF9IGZyb20gJy4uL2NvbW1vbi9pdGVtX2hvbGRlcl9tZXRhZGF0YSc7XG5cbkBDdXN0b21FbGVtZW50KClcbkBJbmplY3RBcHBlbmQoXG4gICAgJyNhY3RpdmVfaW52ZW50b3J5X3BhZ2UgZGl2LmludmVudG9yeV9wYWdlOm5vdChbc3R5bGUqPVwiZGlzcGxheTogbm9uZVwiXSkgLml0ZW1Ib2xkZXIgZGl2LmFwcDczMCcsXG4gICAgSW5qZWN0aW9uTW9kZS5DT05USU5VT1VTXG4pXG5leHBvcnQgY2xhc3MgSW52ZW50b3J5SXRlbUhvbGRlck1ldGFkYXRhIGV4dGVuZHMgSXRlbUhvbGRlck1ldGFkYXRhIHtcbiAgICBnZXQgYXNzZXQoKTogcmdBc3NldCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICghdGhpcy5hc3NldElkKSByZXR1cm47XG5cbiAgICAgICAgcmV0dXJuIGdfQWN0aXZlSW52ZW50b3J5Py5tX3JnQXNzZXRzW3RoaXMuYXNzZXRJZF0/LmRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGdldCBvd25lclN0ZWFtSWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGdfQWN0aXZlSW52ZW50b3J5Py5tX293bmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZ19BY3RpdmVJbnZlbnRvcnk/Lm1fb3duZXI/LnN0clN0ZWFtSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZ19BY3RpdmVJbnZlbnRvcnk/Lm93bmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZ19BY3RpdmVJbnZlbnRvcnk/Lm93bmVyPy5zdHJTdGVhbUlkO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtjdXN0b21FbGVtZW50fSBmcm9tICdsaXQvZGVjb3JhdG9ycy5qcyc7XG5pbXBvcnQge0Zsb2F0RWxlbWVudH0gZnJvbSAnLi9jdXN0b20nO1xuaW1wb3J0IHtpblBhZ2VDb250ZXh0fSBmcm9tICcuLi91dGlscy9zbmlwcyc7XG5cbmV4cG9ydCBlbnVtIEluamVjdGlvbk1vZGUge1xuICAgIC8vIEluamVjdHMgb25jZSBhdCBwYWdlIGxvYWQgZm9yIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBzZWxlY3RvclxuICAgIE9OQ0UsXG4gICAgLy8gQ29udGludWFsbHkgaW5qZWN0cyB3aGVuZXZlciBuZXcgZWxlbWVudHMgdGhhdCBtYXRjaCB0aGVcbiAgICAvLyBzZWxlY3RvciBleGlzdCB0aGF0IGhhdmVuJ3QgYmVlbiBpbmplY3RlZCBpbnRvIHlldFxuICAgIC8vXG4gICAgLy8gU2hvdWxkIGJlIHVzZSBmb3IgXCJkeW5hbWljXCIgZWxlbWVudHNcbiAgICBDT05USU5VT1VTLFxufVxuXG5lbnVtIEluamVjdGlvblR5cGUge1xuICAgIEFwcGVuZCxcbiAgICBCZWZvcmUsXG4gICAgQWZ0ZXIsXG59XG5cbmludGVyZmFjZSBJbmplY3Rpb25Db25maWcge1xuICAgIGV4aXN0czogKGN0eDogSlF1ZXJ5PEhUTUxFbGVtZW50Piwgc2VsZWN0b3I6IHN0cmluZykgPT4gYm9vbGVhbjtcbiAgICBvcDogKGN0eDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgdGFyZ2V0OiB0eXBlb2YgRmxvYXRFbGVtZW50KSA9PiB2b2lkO1xufVxuXG5jb25zdCBJbmplY3Rpb25Db25maWdzOiB7W2tleSBpbiBJbmplY3Rpb25UeXBlXTogSW5qZWN0aW9uQ29uZmlnfSA9IHtcbiAgICBbSW5qZWN0aW9uVHlwZS5BcHBlbmRdOiB7XG4gICAgICAgIGV4aXN0czogKGN0eCwgc2VsZWN0b3IpID0+ICEhY3R4LmNoaWxkcmVuKHNlbGVjdG9yKS5sZW5ndGgsXG4gICAgICAgIG9wOiAoY3R4LCB0YXJnZXQpID0+IGN0eC5hcHBlbmQodGFyZ2V0LmVsZW0oKSksXG4gICAgfSxcbiAgICBbSW5qZWN0aW9uVHlwZS5CZWZvcmVdOiB7XG4gICAgICAgIGV4aXN0czogKGN0eCwgc2VsZWN0b3IpID0+ICEhY3R4LnBhcmVudCgpLmNoaWxkcmVuKHNlbGVjdG9yKS5sZW5ndGgsXG4gICAgICAgIG9wOiAoY3R4LCB0YXJnZXQpID0+IGN0eC5iZWZvcmUodGFyZ2V0LmVsZW0oKSksXG4gICAgfSxcbiAgICBbSW5qZWN0aW9uVHlwZS5BZnRlcl06IHtcbiAgICAgICAgZXhpc3RzOiAoY3R4LCBzZWxlY3RvcikgPT4gISFjdHgucGFyZW50KCkuY2hpbGRyZW4oc2VsZWN0b3IpLmxlbmd0aCxcbiAgICAgICAgb3A6IChjdHgsIHRhcmdldCkgPT4gY3R4LmFmdGVyKHRhcmdldC5lbGVtKCkpLFxuICAgIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gQ3VzdG9tRWxlbWVudCgpOiBhbnkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiB0eXBlb2YgRmxvYXRFbGVtZW50LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICAgICAgaWYgKCFpblBhZ2VDb250ZXh0KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXN0b21FbGVtZW50cy5nZXQodGFyZ2V0LnRhZygpKSkge1xuICAgICAgICAgICAgLy8gQWxyZWFkeSBkZWZpbmVkXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjdXN0b21FbGVtZW50KHRhcmdldC50YWcoKSkodGFyZ2V0KTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBJbmplY3Qoc2VsZWN0b3I6IHN0cmluZywgbW9kZTogSW5qZWN0aW9uTW9kZSwgdHlwZTogSW5qZWN0aW9uVHlwZSk6IGFueSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IHR5cGVvZiBGbG9hdEVsZW1lbnQsIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgICAgICBpZiAoIWluUGFnZUNvbnRleHQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgY2FzZSBJbmplY3Rpb25Nb2RlLk9OQ0U6XG4gICAgICAgICAgICAgICAgJEooc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBJbmplY3Rpb25Db25maWdzW3R5cGVdLm9wKCRKKHRoaXMpLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBJbmplY3Rpb25Nb2RlLkNPTlRJTlVPVVM6XG4gICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkSihzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBhZGQgdGhlIGl0ZW0gYWdhaW4gaWYgd2UgYWxyZWFkeSBoYXZlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSW5qZWN0aW9uQ29uZmlnc1t0eXBlXS5leGlzdHMoJEoodGhpcyksIHRhcmdldC50YWcoKSkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgSW5qZWN0aW9uQ29uZmlnc1t0eXBlXS5vcCgkSih0aGlzKSwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmplY3RBcHBlbmQoc2VsZWN0b3I6IHN0cmluZywgbW9kZTogSW5qZWN0aW9uTW9kZSA9IEluamVjdGlvbk1vZGUuT05DRSk6IGFueSB7XG4gICAgcmV0dXJuIEluamVjdChzZWxlY3RvciwgbW9kZSwgSW5qZWN0aW9uVHlwZS5BcHBlbmQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW5qZWN0QmVmb3JlKHNlbGVjdG9yOiBzdHJpbmcsIG1vZGU6IEluamVjdGlvbk1vZGUgPSBJbmplY3Rpb25Nb2RlLk9OQ0UpOiBhbnkge1xuICAgIHJldHVybiBJbmplY3Qoc2VsZWN0b3IsIG1vZGUsIEluamVjdGlvblR5cGUuQmVmb3JlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEluamVjdEFmdGVyKHNlbGVjdG9yOiBzdHJpbmcsIG1vZGU6IEluamVjdGlvbk1vZGUgPSBJbmplY3Rpb25Nb2RlLk9OQ0UpOiBhbnkge1xuICAgIHJldHVybiBJbmplY3Qoc2VsZWN0b3IsIG1vZGUsIEluamVjdGlvblR5cGUuQWZ0ZXIpO1xufVxuIiwiZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL2N1c3RvbS1lbGVtZW50LmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3Byb3BlcnR5LmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3N0YXRlLmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL2V2ZW50LW9wdGlvbnMuanNcIjtleHBvcnQqZnJvbVwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcXVlcnkuanNcIjtleHBvcnQqZnJvbVwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcXVlcnktYWxsLmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFzeW5jLmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFzc2lnbmVkLWVsZW1lbnRzLmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFzc2lnbmVkLW5vZGVzLmpzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWNvcmF0b3JzLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5jb25zdCBlPWU9Pm49PlwiZnVuY3Rpb25cIj09dHlwZW9mIG4/KChlLG4pPT4oY3VzdG9tRWxlbWVudHMuZGVmaW5lKGUsbiksbikpKGUsbik6KChlLG4pPT57Y29uc3R7a2luZDp0LGVsZW1lbnRzOnN9PW47cmV0dXJue2tpbmQ6dCxlbGVtZW50czpzLGZpbmlzaGVyKG4pe2N1c3RvbUVsZW1lbnRzLmRlZmluZShlLG4pfX19KShlLG4pO2V4cG9ydHtlIGFzIGN1c3RvbUVsZW1lbnR9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3VzdG9tLWVsZW1lbnQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmNvbnN0IGk9KGksZSk9PlwibWV0aG9kXCI9PT1lLmtpbmQmJmUuZGVzY3JpcHRvciYmIShcInZhbHVlXCJpbiBlLmRlc2NyaXB0b3IpP3suLi5lLGZpbmlzaGVyKG4pe24uY3JlYXRlUHJvcGVydHkoZS5rZXksaSl9fTp7a2luZDpcImZpZWxkXCIsa2V5OlN5bWJvbCgpLHBsYWNlbWVudDpcIm93blwiLGRlc2NyaXB0b3I6e30sb3JpZ2luYWxLZXk6ZS5rZXksaW5pdGlhbGl6ZXIoKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmluaXRpYWxpemVyJiYodGhpc1tlLmtleV09ZS5pbml0aWFsaXplci5jYWxsKHRoaXMpKX0sZmluaXNoZXIobil7bi5jcmVhdGVQcm9wZXJ0eShlLmtleSxpKX19O2Z1bmN0aW9uIGUoZSl7cmV0dXJuKG4sdCk9PnZvaWQgMCE9PXQ/KChpLGUsbik9PntlLmNvbnN0cnVjdG9yLmNyZWF0ZVByb3BlcnR5KG4saSl9KShlLG4sdCk6aShlLG4pfWV4cG9ydHtlIGFzIHByb3BlcnR5fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BlcnR5LmpzLm1hcFxuIiwiaW1wb3J0e3Byb3BlcnR5IGFzIHJ9ZnJvbVwiLi9wcm9wZXJ0eS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovZnVuY3Rpb24gdCh0KXtyZXR1cm4gcih7Li4udCxzdGF0ZTohMH0pfWV4cG9ydHt0IGFzIHN0YXRlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YXRlLmpzLm1hcFxuIiwiaW1wb3J0e2RlY29yYXRlUHJvcGVydHkgYXMgcn1mcm9tXCIuL2Jhc2UuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL2Z1bmN0aW9uIGUoZSl7cmV0dXJuIHIoe2ZpbmlzaGVyOihyLHQpPT57T2JqZWN0LmFzc2lnbihyLnByb3RvdHlwZVt0XSxlKX19KX1leHBvcnR7ZSBhcyBldmVudE9wdGlvbnN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnQtb3B0aW9ucy5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuY29uc3QgZT0oZSx0LG8pPT57T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbyxlKX0sdD0oZSx0KT0+KHtraW5kOlwibWV0aG9kXCIscGxhY2VtZW50OlwicHJvdG90eXBlXCIsa2V5OnQua2V5LGRlc2NyaXB0b3I6ZX0pLG89KHtmaW5pc2hlcjplLGRlc2NyaXB0b3I6dH0pPT4obyxuKT0+e3ZhciByO2lmKHZvaWQgMD09PW4pe2NvbnN0IG49bnVsbCE9PShyPW8ub3JpZ2luYWxLZXkpJiZ2b2lkIDAhPT1yP3I6by5rZXksaT1udWxsIT10P3traW5kOlwibWV0aG9kXCIscGxhY2VtZW50OlwicHJvdG90eXBlXCIsa2V5Om4sZGVzY3JpcHRvcjp0KG8ua2V5KX06ey4uLm8sa2V5Om59O3JldHVybiBudWxsIT1lJiYoaS5maW5pc2hlcj1mdW5jdGlvbih0KXtlKHQsbil9KSxpfXtjb25zdCByPW8uY29uc3RydWN0b3I7dm9pZCAwIT09dCYmT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sbix0KG4pKSxudWxsPT1lfHxlKHIsbil9fTtleHBvcnR7byBhcyBkZWNvcmF0ZVByb3BlcnR5LGUgYXMgbGVnYWN5UHJvdG90eXBlTWV0aG9kLHQgYXMgc3RhbmRhcmRQcm90b3R5cGVNZXRob2R9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZS5qcy5tYXBcbiIsImltcG9ydHtkZWNvcmF0ZVByb3BlcnR5IGFzIG99ZnJvbVwiLi9iYXNlLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9mdW5jdGlvbiBpKGksbil7cmV0dXJuIG8oe2Rlc2NyaXB0b3I6bz0+e2NvbnN0IHQ9e2dldCgpe3ZhciBvLG47cmV0dXJuIG51bGwhPT0obj1udWxsPT09KG89dGhpcy5yZW5kZXJSb290KXx8dm9pZCAwPT09bz92b2lkIDA6by5xdWVyeVNlbGVjdG9yKGkpKSYmdm9pZCAwIT09bj9uOm51bGx9LGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwfTtpZihuKXtjb25zdCBuPVwic3ltYm9sXCI9PXR5cGVvZiBvP1N5bWJvbCgpOlwiX19cIitvO3QuZ2V0PWZ1bmN0aW9uKCl7dmFyIG8sdDtyZXR1cm4gdm9pZCAwPT09dGhpc1tuXSYmKHRoaXNbbl09bnVsbCE9PSh0PW51bGw9PT0obz10aGlzLnJlbmRlclJvb3QpfHx2b2lkIDA9PT1vP3ZvaWQgMDpvLnF1ZXJ5U2VsZWN0b3IoaSkpJiZ2b2lkIDAhPT10P3Q6bnVsbCksdGhpc1tuXX19cmV0dXJuIHR9fSl9ZXhwb3J0e2kgYXMgcXVlcnl9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cXVlcnkuanMubWFwXG4iLCJpbXBvcnR7ZGVjb3JhdGVQcm9wZXJ0eSBhcyByfWZyb21cIi4vYmFzZS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovZnVuY3Rpb24gZShlKXtyZXR1cm4gcih7ZGVzY3JpcHRvcjpyPT4oe2dldCgpe3ZhciByLG87cmV0dXJuIG51bGwhPT0obz1udWxsPT09KHI9dGhpcy5yZW5kZXJSb290KXx8dm9pZCAwPT09cj92b2lkIDA6ci5xdWVyeVNlbGVjdG9yQWxsKGUpKSYmdm9pZCAwIT09bz9vOltdfSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSl9ZXhwb3J0e2UgYXMgcXVlcnlBbGx9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cXVlcnktYWxsLmpzLm1hcFxuIiwiaW1wb3J0e2RlY29yYXRlUHJvcGVydHkgYXMgcn1mcm9tXCIuL2Jhc2UuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuZnVuY3Rpb24gZShlKXtyZXR1cm4gcih7ZGVzY3JpcHRvcjpyPT4oe2FzeW5jIGdldCgpe3ZhciByO3JldHVybiBhd2FpdCB0aGlzLnVwZGF0ZUNvbXBsZXRlLG51bGw9PT0ocj10aGlzLnJlbmRlclJvb3QpfHx2b2lkIDA9PT1yP3ZvaWQgMDpyLnF1ZXJ5U2VsZWN0b3IoZSl9LGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9KX1leHBvcnR7ZSBhcyBxdWVyeUFzeW5jfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXF1ZXJ5LWFzeW5jLmpzLm1hcFxuIiwiaW1wb3J0e2RlY29yYXRlUHJvcGVydHkgYXMgb31mcm9tXCIuL2Jhc2UuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL3ZhciBuO2NvbnN0IGU9bnVsbCE9KG51bGw9PT0obj13aW5kb3cuSFRNTFNsb3RFbGVtZW50KXx8dm9pZCAwPT09bj92b2lkIDA6bi5wcm90b3R5cGUuYXNzaWduZWRFbGVtZW50cyk/KG8sbik9Pm8uYXNzaWduZWRFbGVtZW50cyhuKToobyxuKT0+by5hc3NpZ25lZE5vZGVzKG4pLmZpbHRlcigobz0+by5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFKSk7ZnVuY3Rpb24gbChuKXtjb25zdHtzbG90Omwsc2VsZWN0b3I6dH09bnVsbCE9bj9uOnt9O3JldHVybiBvKHtkZXNjcmlwdG9yOm89Pih7Z2V0KCl7dmFyIG87Y29uc3Qgcj1cInNsb3RcIisobD9gW25hbWU9JHtsfV1gOlwiOm5vdChbbmFtZV0pXCIpLGk9bnVsbD09PShvPXRoaXMucmVuZGVyUm9vdCl8fHZvaWQgMD09PW8/dm9pZCAwOm8ucXVlcnlTZWxlY3RvcihyKSxzPW51bGwhPWk/ZShpLG4pOltdO3JldHVybiB0P3MuZmlsdGVyKChvPT5vLm1hdGNoZXModCkpKTpzfSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSl9ZXhwb3J0e2wgYXMgcXVlcnlBc3NpZ25lZEVsZW1lbnRzfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXF1ZXJ5LWFzc2lnbmVkLWVsZW1lbnRzLmpzLm1hcFxuIiwiaW1wb3J0e2RlY29yYXRlUHJvcGVydHkgYXMgZX1mcm9tXCIuL2Jhc2UuanNcIjtpbXBvcnR7cXVlcnlBc3NpZ25lZEVsZW1lbnRzIGFzIHR9ZnJvbVwiLi9xdWVyeS1hc3NpZ25lZC1lbGVtZW50cy5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovZnVuY3Rpb24gbyhvLG4scil7bGV0IGwscz1vO3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiBvPyhzPW8uc2xvdCxsPW8pOmw9e2ZsYXR0ZW46bn0scj90KHtzbG90OnMsZmxhdHRlbjpuLHNlbGVjdG9yOnJ9KTplKHtkZXNjcmlwdG9yOmU9Pih7Z2V0KCl7dmFyIGUsdDtjb25zdCBvPVwic2xvdFwiKyhzP2BbbmFtZT0ke3N9XWA6XCI6bm90KFtuYW1lXSlcIiksbj1udWxsPT09KGU9dGhpcy5yZW5kZXJSb290KXx8dm9pZCAwPT09ZT92b2lkIDA6ZS5xdWVyeVNlbGVjdG9yKG8pO3JldHVybiBudWxsIT09KHQ9bnVsbD09bj92b2lkIDA6bi5hc3NpZ25lZE5vZGVzKGwpKSYmdm9pZCAwIT09dD90OltdfSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSl9ZXhwb3J0e28gYXMgcXVlcnlBc3NpZ25lZE5vZGVzfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXF1ZXJ5LWFzc2lnbmVkLW5vZGVzLmpzLm1hcFxuIiwiaW1wb3J0IHtGbG9hdEVsZW1lbnR9IGZyb20gJy4uL2N1c3RvbSc7XG5pbXBvcnQge2h0bWwsIGNzcywgSFRNTFRlbXBsYXRlUmVzdWx0LCBub3RoaW5nfSBmcm9tICdsaXQnO1xuaW1wb3J0IHtzdGF0ZX0gZnJvbSAnbGl0L2RlY29yYXRvcnMuanMnO1xuaW1wb3J0IHtyZ0Fzc2V0fSBmcm9tICcuLi8uLi90eXBlcy9zdGVhbSc7XG5pbXBvcnQge2dGbG9hdEZldGNoZXJ9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Zsb2F0X2ZldGNoZXInO1xuaW1wb3J0IHtJdGVtSW5mb30gZnJvbSAnLi4vLi4vYnJpZGdlL2hhbmRsZXJzL2ZldGNoX2luc3BlY3RfaW5mbyc7XG5pbXBvcnQge2Zvcm1hdEZsb2F0V2l0aFJhbmssIGZvcm1hdFNlZWQsIGdldEZhZGVQZXJjZW50YWdlLCBnZXRMb3dlc3RSYW5rfSBmcm9tICcuLi8uLi91dGlscy9za2luJztcbmltcG9ydCB7aXNTa2luLCBmbG9vcn0gZnJvbSAnLi4vLi4vdXRpbHMvc2tpbic7XG5pbXBvcnQge2dldFJhbmtDb2xvdXJ9IGZyb20gJy4uLy4uL3V0aWxzL3JhbmtzJztcbmltcG9ydCB7T2JzZXJ2ZX0gZnJvbSAnLi4vLi4vdXRpbHMvb2JzZXJ2ZXJzJztcblxuLy8gR2VuZXJpYyBhbm5vdGF0b3Igb2YgaXRlbSBob2xkZXIgbWV0YWRhdGEgKGZsb2F0LCBzZWVkLCBldGMuLi4pXG4vLyBNdXN0IGJlIGV4dGVuZGVkIHRvIHVzZSBhcyBhIGNvbXBvbmVudFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEl0ZW1Ib2xkZXJNZXRhZGF0YSBleHRlbmRzIEZsb2F0RWxlbWVudCB7XG4gICAgc3RhdGljIHN0eWxlcyA9IFtcbiAgICAgICAgLi4uRmxvYXRFbGVtZW50LnN0eWxlcyxcbiAgICAgICAgY3NzYFxuICAgICAgICAgICAgLmZsb2F0IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgYm90dG9tOiAzcHg7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IDNweDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5zZWVkIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgdG9wOiAzcHg7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IDNweDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5mYWRlIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgwZGVnLCAjZDliYmE1IDAlLCAjZTU5MDNiIDMzJSwgI2RiNTk3NyA2NiUsICM2Nzc1ZTEgMTAwJSk7XG4gICAgICAgICAgICAgICAgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gICAgICAgICAgICAgICAgLXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuY3NmbG9hdC1zaGluZS1mYWRlLXRleHQge1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiAxMDAwO1xuICAgICAgICAgICAgICAgIC13ZWJraXQtdGV4dC1zdHJva2U6IDFweCBibGFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgYCxcbiAgICBdO1xuXG4gICAgQHN0YXRlKClcbiAgICBwcml2YXRlIGl0ZW1JbmZvOiBJdGVtSW5mbyB8IHVuZGVmaW5lZDtcblxuICAgIGdldCBhc3NldElkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiAkSih0aGlzKS5wYXJlbnQoKS5hdHRyKCdpZCcpPy5zcGxpdCgnXycpWzJdO1xuICAgIH1cblxuICAgIGFic3RyYWN0IGdldCBhc3NldCgpOiByZ0Fzc2V0IHwgdW5kZWZpbmVkO1xuICAgIGFic3RyYWN0IGdldCBvd25lclN0ZWFtSWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgZ2V0IGluc3BlY3RMaW5rKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICghdGhpcy5hc3NldCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghdGhpcy5hc3NldD8uYWN0aW9ucyB8fCB0aGlzLmFzc2V0Py5hY3Rpb25zPy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBpZiAoIXRoaXMub3duZXJTdGVhbUlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5hc3NldFxuICAgICAgICAgICAgPy5hY3Rpb25zIVswXS5saW5rLnJlcGxhY2UoJyVvd25lcl9zdGVhbWlkJScsIHRoaXMub3duZXJTdGVhbUlkKVxuICAgICAgICAgICAgLnJlcGxhY2UoJyVhc3NldGlkJScsIHRoaXMuYXNzZXRJZCEpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW5kZXIoKTogSFRNTFRlbXBsYXRlUmVzdWx0IHtcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1JbmZvKSByZXR1cm4gaHRtbGBgO1xuXG4gICAgICAgIGNvbnN0IGZhZGVQZXJjZW50YWdlID0gdGhpcy5hc3NldCAmJiBnZXRGYWRlUGVyY2VudGFnZSh0aGlzLmFzc2V0LCB0aGlzLml0ZW1JbmZvKTtcblxuICAgICAgICBpZiAoZmFkZVBlcmNlbnRhZ2UgPT09IDEwMCkge1xuICAgICAgICAgICAgJEoodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2Z1bGwtZmFkZS1ib3JkZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJhbmsgPSBnZXRMb3dlc3RSYW5rKHRoaXMuaXRlbUluZm8pO1xuXG4gICAgICAgIHJldHVybiBodG1sYFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbG9hdFwiPiR7Zm9ybWF0RmxvYXRXaXRoUmFuayh0aGlzLml0ZW1JbmZvLCA2KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWVkXCJcbiAgICAgICAgICAgICAgICAgICAgPiR7Zm9ybWF0U2VlZCh0aGlzLml0ZW1JbmZvKX1cbiAgICAgICAgICAgICAgICAgICAgJHtmYWRlUGVyY2VudGFnZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGh0bWxgPHNwYW4gY2xhc3M9XCJmYWRlICR7cmFuayAmJiByYW5rIDw9IDUgPyAnY3NmbG9hdC1zaGluZS1mYWRlLXRleHQnIDogJyd9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4oJHtmbG9vcihmYWRlUGVyY2VudGFnZSwgMSl9JSk8L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPmBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbm90aGluZ308L3NwYW5cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgYXN5bmMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5zcGVjdExpbmspIHtcbiAgICAgICAgICAgIHRoaXMub25Jbml0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBXYWl0IHVudGlsIHRoZSBhc3NldCBleGlzdHNcbiAgICAgICAgICAgIE9ic2VydmUoXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5pbnNwZWN0TGluayxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmluc3BlY3RMaW5rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAyMDBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5hc3NldCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghaXNTa2luKHRoaXMuYXNzZXQpKSByZXR1cm47XG5cbiAgICAgICAgLy8gQ29tbW9kaXRpZXMgd29uJ3QgaGF2ZSBpbnNwZWN0IGxpbmtzXG4gICAgICAgIGlmICghdGhpcy5pbnNwZWN0TGluaykgcmV0dXJuO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1JbmZvID0gYXdhaXQgZ0Zsb2F0RmV0Y2hlci5mZXRjaCh7XG4gICAgICAgICAgICAgICAgbGluazogdGhpcy5pbnNwZWN0TGluayxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBmZXRjaCBmbG9hdCBmb3IgJHt0aGlzLmFzc2V0SWR9OiAke2UudG9TdHJpbmcoKX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLml0ZW1JbmZvKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRlUmFua1NoaW5lKHRoaXMuaXRlbUluZm8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5ub3RhdGVSYW5rU2hpbmUoaW5mbzogSXRlbUluZm8pIHtcbiAgICAgICAgY29uc3QgcmFuayA9IGdldExvd2VzdFJhbmsoaW5mbyk7XG4gICAgICAgIGlmICghcmFuayB8fCByYW5rID4gNSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFrZSB0aGUgaW52ZW50b3J5IGJveCBjb2xvdXJlZCA7KVxuICAgICAgICAkSih0aGlzKS5wYXJlbnQoKS5jc3MoJ2NvbG9yJywgJ2JsYWNrJyk7XG4gICAgICAgICRKKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2ltZycpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGdldFJhbmtDb2xvdXIocmFuaykpO1xuICAgICAgICAkSih0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnY3NmbG9hdC1zaGluZScpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Y3NzLCBMaXRFbGVtZW50fSBmcm9tICdsaXQnO1xuXG5mdW5jdGlvbiBjYW1lbFRvRGFzaENhc2Uoc3RyOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAgICAgLmpvaW4oJy0nKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbn1cblxuLy8gTGl0RWxlbWVudCB3cmFwcGVyIHdpdGggYSBwcmUtZGV0ZXJtaW5lZCB0YWdcbmV4cG9ydCBjbGFzcyBGbG9hdEVsZW1lbnQgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgICBzdGF0aWMgc3R5bGVzID0gW1xuICAgICAgICBjc3NgXG4gICAgICAgICAgICBociB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzFiMjkzOTtcbiAgICAgICAgICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkIG5vbmUgbm9uZTtcbiAgICAgICAgICAgICAgICBib3JkZXItY29sb3I6IGJsYWNrO1xuICAgICAgICAgICAgICAgIGJvcmRlci13aWR0aDogMXB4IDAgMDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYSB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNlYmViZWI7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbnB1dFt0eXBlPSd0ZXh0J10sXG4gICAgICAgICAgICBpbnB1dFt0eXBlPSdwYXNzd29yZCddLFxuICAgICAgICAgICAgaW5wdXRbdHlwZT0nbnVtYmVyJ10sXG4gICAgICAgICAgICBzZWxlY3Qge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjOTA5MDkwO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5wdXRbdHlwZT0nY29sb3InXSB7XG4gICAgICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgICAgICAgICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0W3R5cGU9J2NvbG9yJ106Oi13ZWJraXQtY29sb3Itc3dhdGNoLXdyYXBwZXIge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0W3R5cGU9J2NvbG9yJ106Oi13ZWJraXQtY29sb3Itc3dhdGNoIHtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIGAsXG4gICAgXTtcblxuICAgIHN0YXRpYyB0YWcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBjc2Zsb2F0LSR7Y2FtZWxUb0Rhc2hDYXNlKHRoaXMubmFtZSl9YDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZWxlbSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZygpKTtcbiAgICB9XG59XG4iLCJpbXBvcnRcIkBsaXQvcmVhY3RpdmUtZWxlbWVudFwiO2ltcG9ydFwibGl0LWh0bWxcIjtleHBvcnQqZnJvbVwibGl0LWVsZW1lbnQvbGl0LWVsZW1lbnQuanNcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiaW1wb3J0e2dldENvbXBhdGlibGVTdHlsZSBhcyB0LGFkb3B0U3R5bGVzIGFzIGl9ZnJvbVwiLi9jc3MtdGFnLmpzXCI7ZXhwb3J0e0NTU1Jlc3VsdCxhZG9wdFN0eWxlcyxjc3MsZ2V0Q29tcGF0aWJsZVN0eWxlLHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyx1bnNhZmVDU1N9ZnJvbVwiLi9jc3MtdGFnLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi92YXIgcztjb25zdCBlPXdpbmRvdyxyPWUudHJ1c3RlZFR5cGVzLGg9cj9yLmVtcHR5U2NyaXB0OlwiXCIsbz1lLnJlYWN0aXZlRWxlbWVudFBvbHlmaWxsU3VwcG9ydCxuPXt0b0F0dHJpYnV0ZSh0LGkpe3N3aXRjaChpKXtjYXNlIEJvb2xlYW46dD10P2g6bnVsbDticmVhaztjYXNlIE9iamVjdDpjYXNlIEFycmF5OnQ9bnVsbD09dD90OkpTT04uc3RyaW5naWZ5KHQpfXJldHVybiB0fSxmcm9tQXR0cmlidXRlKHQsaSl7bGV0IHM9dDtzd2l0Y2goaSl7Y2FzZSBCb29sZWFuOnM9bnVsbCE9PXQ7YnJlYWs7Y2FzZSBOdW1iZXI6cz1udWxsPT09dD9udWxsOk51bWJlcih0KTticmVhaztjYXNlIE9iamVjdDpjYXNlIEFycmF5OnRyeXtzPUpTT04ucGFyc2UodCl9Y2F0Y2godCl7cz1udWxsfX1yZXR1cm4gc319LGE9KHQsaSk9PmkhPT10JiYoaT09aXx8dD09dCksbD17YXR0cmlidXRlOiEwLHR5cGU6U3RyaW5nLGNvbnZlcnRlcjpuLHJlZmxlY3Q6ITEsaGFzQ2hhbmdlZDphfTtjbGFzcyBkIGV4dGVuZHMgSFRNTEVsZW1lbnR7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuXyRFaT1uZXcgTWFwLHRoaXMuaXNVcGRhdGVQZW5kaW5nPSExLHRoaXMuaGFzVXBkYXRlZD0hMSx0aGlzLl8kRWw9bnVsbCx0aGlzLnUoKX1zdGF0aWMgYWRkSW5pdGlhbGl6ZXIodCl7dmFyIGk7bnVsbCE9PShpPXRoaXMuaCkmJnZvaWQgMCE9PWl8fCh0aGlzLmg9W10pLHRoaXMuaC5wdXNoKHQpfXN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCl7dGhpcy5maW5hbGl6ZSgpO2NvbnN0IHQ9W107cmV0dXJuIHRoaXMuZWxlbWVudFByb3BlcnRpZXMuZm9yRWFjaCgoKGkscyk9Pntjb25zdCBlPXRoaXMuXyRFcChzLGkpO3ZvaWQgMCE9PWUmJih0aGlzLl8kRXYuc2V0KGUscyksdC5wdXNoKGUpKX0pKSx0fXN0YXRpYyBjcmVhdGVQcm9wZXJ0eSh0LGk9bCl7aWYoaS5zdGF0ZSYmKGkuYXR0cmlidXRlPSExKSx0aGlzLmZpbmFsaXplKCksdGhpcy5lbGVtZW50UHJvcGVydGllcy5zZXQodCxpKSwhaS5ub0FjY2Vzc29yJiYhdGhpcy5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkodCkpe2NvbnN0IHM9XCJzeW1ib2xcIj09dHlwZW9mIHQ/U3ltYm9sKCk6XCJfX1wiK3QsZT10aGlzLmdldFByb3BlcnR5RGVzY3JpcHRvcih0LHMsaSk7dm9pZCAwIT09ZSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLHQsZSl9fXN0YXRpYyBnZXRQcm9wZXJ0eURlc2NyaXB0b3IodCxpLHMpe3JldHVybntnZXQoKXtyZXR1cm4gdGhpc1tpXX0sc2V0KGUpe2NvbnN0IHI9dGhpc1t0XTt0aGlzW2ldPWUsdGhpcy5yZXF1ZXN0VXBkYXRlKHQscixzKX0sY29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITB9fXN0YXRpYyBnZXRQcm9wZXJ0eU9wdGlvbnModCl7cmV0dXJuIHRoaXMuZWxlbWVudFByb3BlcnRpZXMuZ2V0KHQpfHxsfXN0YXRpYyBmaW5hbGl6ZSgpe2lmKHRoaXMuaGFzT3duUHJvcGVydHkoXCJmaW5hbGl6ZWRcIikpcmV0dXJuITE7dGhpcy5maW5hbGl6ZWQ9ITA7Y29uc3QgdD1PYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7aWYodC5maW5hbGl6ZSgpLHRoaXMuZWxlbWVudFByb3BlcnRpZXM9bmV3IE1hcCh0LmVsZW1lbnRQcm9wZXJ0aWVzKSx0aGlzLl8kRXY9bmV3IE1hcCx0aGlzLmhhc093blByb3BlcnR5KFwicHJvcGVydGllc1wiKSl7Y29uc3QgdD10aGlzLnByb3BlcnRpZXMsaT1bLi4uT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModCksLi4uT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0KV07Zm9yKGNvbnN0IHMgb2YgaSl0aGlzLmNyZWF0ZVByb3BlcnR5KHMsdFtzXSl9cmV0dXJuIHRoaXMuZWxlbWVudFN0eWxlcz10aGlzLmZpbmFsaXplU3R5bGVzKHRoaXMuc3R5bGVzKSwhMH1zdGF0aWMgZmluYWxpemVTdHlsZXMoaSl7Y29uc3Qgcz1bXTtpZihBcnJheS5pc0FycmF5KGkpKXtjb25zdCBlPW5ldyBTZXQoaS5mbGF0KDEvMCkucmV2ZXJzZSgpKTtmb3IoY29uc3QgaSBvZiBlKXMudW5zaGlmdCh0KGkpKX1lbHNlIHZvaWQgMCE9PWkmJnMucHVzaCh0KGkpKTtyZXR1cm4gc31zdGF0aWMgXyRFcCh0LGkpe2NvbnN0IHM9aS5hdHRyaWJ1dGU7cmV0dXJuITE9PT1zP3ZvaWQgMDpcInN0cmluZ1wiPT10eXBlb2Ygcz9zOlwic3RyaW5nXCI9PXR5cGVvZiB0P3QudG9Mb3dlckNhc2UoKTp2b2lkIDB9dSgpe3ZhciB0O3RoaXMuXyRFXz1uZXcgUHJvbWlzZSgodD0+dGhpcy5lbmFibGVVcGRhdGluZz10KSksdGhpcy5fJEFMPW5ldyBNYXAsdGhpcy5fJEVnKCksdGhpcy5yZXF1ZXN0VXBkYXRlKCksbnVsbD09PSh0PXRoaXMuY29uc3RydWN0b3IuaCl8fHZvaWQgMD09PXR8fHQuZm9yRWFjaCgodD0+dCh0aGlzKSkpfWFkZENvbnRyb2xsZXIodCl7dmFyIGksczsobnVsbCE9PShpPXRoaXMuXyRFUykmJnZvaWQgMCE9PWk/aTp0aGlzLl8kRVM9W10pLnB1c2godCksdm9pZCAwIT09dGhpcy5yZW5kZXJSb290JiZ0aGlzLmlzQ29ubmVjdGVkJiYobnVsbD09PShzPXQuaG9zdENvbm5lY3RlZCl8fHZvaWQgMD09PXN8fHMuY2FsbCh0KSl9cmVtb3ZlQ29udHJvbGxlcih0KXt2YXIgaTtudWxsPT09KGk9dGhpcy5fJEVTKXx8dm9pZCAwPT09aXx8aS5zcGxpY2UodGhpcy5fJEVTLmluZGV4T2YodCk+Pj4wLDEpfV8kRWcoKXt0aGlzLmNvbnN0cnVjdG9yLmVsZW1lbnRQcm9wZXJ0aWVzLmZvckVhY2goKCh0LGkpPT57dGhpcy5oYXNPd25Qcm9wZXJ0eShpKSYmKHRoaXMuXyRFaS5zZXQoaSx0aGlzW2ldKSxkZWxldGUgdGhpc1tpXSl9KSl9Y3JlYXRlUmVuZGVyUm9vdCgpe3ZhciB0O2NvbnN0IHM9bnVsbCE9PSh0PXRoaXMuc2hhZG93Um9vdCkmJnZvaWQgMCE9PXQ/dDp0aGlzLmF0dGFjaFNoYWRvdyh0aGlzLmNvbnN0cnVjdG9yLnNoYWRvd1Jvb3RPcHRpb25zKTtyZXR1cm4gaShzLHRoaXMuY29uc3RydWN0b3IuZWxlbWVudFN0eWxlcyksc31jb25uZWN0ZWRDYWxsYmFjaygpe3ZhciB0O3ZvaWQgMD09PXRoaXMucmVuZGVyUm9vdCYmKHRoaXMucmVuZGVyUm9vdD10aGlzLmNyZWF0ZVJlbmRlclJvb3QoKSksdGhpcy5lbmFibGVVcGRhdGluZyghMCksbnVsbD09PSh0PXRoaXMuXyRFUyl8fHZvaWQgMD09PXR8fHQuZm9yRWFjaCgodD0+e3ZhciBpO3JldHVybiBudWxsPT09KGk9dC5ob3N0Q29ubmVjdGVkKXx8dm9pZCAwPT09aT92b2lkIDA6aS5jYWxsKHQpfSkpfWVuYWJsZVVwZGF0aW5nKHQpe31kaXNjb25uZWN0ZWRDYWxsYmFjaygpe3ZhciB0O251bGw9PT0odD10aGlzLl8kRVMpfHx2b2lkIDA9PT10fHx0LmZvckVhY2goKHQ9Pnt2YXIgaTtyZXR1cm4gbnVsbD09PShpPXQuaG9zdERpc2Nvbm5lY3RlZCl8fHZvaWQgMD09PWk/dm9pZCAwOmkuY2FsbCh0KX0pKX1hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodCxpLHMpe3RoaXMuXyRBSyh0LHMpfV8kRU8odCxpLHM9bCl7dmFyIGU7Y29uc3Qgcj10aGlzLmNvbnN0cnVjdG9yLl8kRXAodCxzKTtpZih2b2lkIDAhPT1yJiYhMD09PXMucmVmbGVjdCl7Y29uc3QgaD0odm9pZCAwIT09KG51bGw9PT0oZT1zLmNvbnZlcnRlcil8fHZvaWQgMD09PWU/dm9pZCAwOmUudG9BdHRyaWJ1dGUpP3MuY29udmVydGVyOm4pLnRvQXR0cmlidXRlKGkscy50eXBlKTt0aGlzLl8kRWw9dCxudWxsPT1oP3RoaXMucmVtb3ZlQXR0cmlidXRlKHIpOnRoaXMuc2V0QXR0cmlidXRlKHIsaCksdGhpcy5fJEVsPW51bGx9fV8kQUsodCxpKXt2YXIgcztjb25zdCBlPXRoaXMuY29uc3RydWN0b3Iscj1lLl8kRXYuZ2V0KHQpO2lmKHZvaWQgMCE9PXImJnRoaXMuXyRFbCE9PXIpe2NvbnN0IHQ9ZS5nZXRQcm9wZXJ0eU9wdGlvbnMociksaD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmNvbnZlcnRlcj97ZnJvbUF0dHJpYnV0ZTp0LmNvbnZlcnRlcn06dm9pZCAwIT09KG51bGw9PT0ocz10LmNvbnZlcnRlcil8fHZvaWQgMD09PXM/dm9pZCAwOnMuZnJvbUF0dHJpYnV0ZSk/dC5jb252ZXJ0ZXI6bjt0aGlzLl8kRWw9cix0aGlzW3JdPWguZnJvbUF0dHJpYnV0ZShpLHQudHlwZSksdGhpcy5fJEVsPW51bGx9fXJlcXVlc3RVcGRhdGUodCxpLHMpe2xldCBlPSEwO3ZvaWQgMCE9PXQmJigoKHM9c3x8dGhpcy5jb25zdHJ1Y3Rvci5nZXRQcm9wZXJ0eU9wdGlvbnModCkpLmhhc0NoYW5nZWR8fGEpKHRoaXNbdF0saSk/KHRoaXMuXyRBTC5oYXModCl8fHRoaXMuXyRBTC5zZXQodCxpKSwhMD09PXMucmVmbGVjdCYmdGhpcy5fJEVsIT09dCYmKHZvaWQgMD09PXRoaXMuXyRFQyYmKHRoaXMuXyRFQz1uZXcgTWFwKSx0aGlzLl8kRUMuc2V0KHQscykpKTplPSExKSwhdGhpcy5pc1VwZGF0ZVBlbmRpbmcmJmUmJih0aGlzLl8kRV89dGhpcy5fJEVqKCkpfWFzeW5jIF8kRWooKXt0aGlzLmlzVXBkYXRlUGVuZGluZz0hMDt0cnl7YXdhaXQgdGhpcy5fJEVffWNhdGNoKHQpe1Byb21pc2UucmVqZWN0KHQpfWNvbnN0IHQ9dGhpcy5zY2hlZHVsZVVwZGF0ZSgpO3JldHVybiBudWxsIT10JiZhd2FpdCB0LCF0aGlzLmlzVXBkYXRlUGVuZGluZ31zY2hlZHVsZVVwZGF0ZSgpe3JldHVybiB0aGlzLnBlcmZvcm1VcGRhdGUoKX1wZXJmb3JtVXBkYXRlKCl7dmFyIHQ7aWYoIXRoaXMuaXNVcGRhdGVQZW5kaW5nKXJldHVybjt0aGlzLmhhc1VwZGF0ZWQsdGhpcy5fJEVpJiYodGhpcy5fJEVpLmZvckVhY2goKCh0LGkpPT50aGlzW2ldPXQpKSx0aGlzLl8kRWk9dm9pZCAwKTtsZXQgaT0hMTtjb25zdCBzPXRoaXMuXyRBTDt0cnl7aT10aGlzLnNob3VsZFVwZGF0ZShzKSxpPyh0aGlzLndpbGxVcGRhdGUocyksbnVsbD09PSh0PXRoaXMuXyRFUyl8fHZvaWQgMD09PXR8fHQuZm9yRWFjaCgodD0+e3ZhciBpO3JldHVybiBudWxsPT09KGk9dC5ob3N0VXBkYXRlKXx8dm9pZCAwPT09aT92b2lkIDA6aS5jYWxsKHQpfSkpLHRoaXMudXBkYXRlKHMpKTp0aGlzLl8kRWsoKX1jYXRjaCh0KXt0aHJvdyBpPSExLHRoaXMuXyRFaygpLHR9aSYmdGhpcy5fJEFFKHMpfXdpbGxVcGRhdGUodCl7fV8kQUUodCl7dmFyIGk7bnVsbD09PShpPXRoaXMuXyRFUyl8fHZvaWQgMD09PWl8fGkuZm9yRWFjaCgodD0+e3ZhciBpO3JldHVybiBudWxsPT09KGk9dC5ob3N0VXBkYXRlZCl8fHZvaWQgMD09PWk/dm9pZCAwOmkuY2FsbCh0KX0pKSx0aGlzLmhhc1VwZGF0ZWR8fCh0aGlzLmhhc1VwZGF0ZWQ9ITAsdGhpcy5maXJzdFVwZGF0ZWQodCkpLHRoaXMudXBkYXRlZCh0KX1fJEVrKCl7dGhpcy5fJEFMPW5ldyBNYXAsdGhpcy5pc1VwZGF0ZVBlbmRpbmc9ITF9Z2V0IHVwZGF0ZUNvbXBsZXRlKCl7cmV0dXJuIHRoaXMuZ2V0VXBkYXRlQ29tcGxldGUoKX1nZXRVcGRhdGVDb21wbGV0ZSgpe3JldHVybiB0aGlzLl8kRV99c2hvdWxkVXBkYXRlKHQpe3JldHVybiEwfXVwZGF0ZSh0KXt2b2lkIDAhPT10aGlzLl8kRUMmJih0aGlzLl8kRUMuZm9yRWFjaCgoKHQsaSk9PnRoaXMuXyRFTyhpLHRoaXNbaV0sdCkpKSx0aGlzLl8kRUM9dm9pZCAwKSx0aGlzLl8kRWsoKX11cGRhdGVkKHQpe31maXJzdFVwZGF0ZWQodCl7fX1kLmZpbmFsaXplZD0hMCxkLmVsZW1lbnRQcm9wZXJ0aWVzPW5ldyBNYXAsZC5lbGVtZW50U3R5bGVzPVtdLGQuc2hhZG93Um9vdE9wdGlvbnM9e21vZGU6XCJvcGVuXCJ9LG51bGw9PW98fG8oe1JlYWN0aXZlRWxlbWVudDpkfSksKG51bGwhPT0ocz1lLnJlYWN0aXZlRWxlbWVudFZlcnNpb25zKSYmdm9pZCAwIT09cz9zOmUucmVhY3RpdmVFbGVtZW50VmVyc2lvbnM9W10pLnB1c2goXCIxLjQuMFwiKTtleHBvcnR7ZCBhcyBSZWFjdGl2ZUVsZW1lbnQsbiBhcyBkZWZhdWx0Q29udmVydGVyLGEgYXMgbm90RXF1YWx9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3RpdmUtZWxlbWVudC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuY29uc3QgdD13aW5kb3csZT10LlNoYWRvd1Jvb3QmJih2b2lkIDA9PT10LlNoYWR5Q1NTfHx0LlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykmJlwiYWRvcHRlZFN0eWxlU2hlZXRzXCJpbiBEb2N1bWVudC5wcm90b3R5cGUmJlwicmVwbGFjZVwiaW4gQ1NTU3R5bGVTaGVldC5wcm90b3R5cGUscz1TeW1ib2woKSxuPW5ldyBXZWFrTWFwO2NsYXNzIG97Y29uc3RydWN0b3IodCxlLG4pe2lmKHRoaXMuXyRjc3NSZXN1bHQkPSEwLG4hPT1zKXRocm93IEVycm9yKFwiQ1NTUmVzdWx0IGlzIG5vdCBjb25zdHJ1Y3RhYmxlLiBVc2UgYHVuc2FmZUNTU2Agb3IgYGNzc2AgaW5zdGVhZC5cIik7dGhpcy5jc3NUZXh0PXQsdGhpcy50PWV9Z2V0IHN0eWxlU2hlZXQoKXtsZXQgdD10aGlzLm87Y29uc3Qgcz10aGlzLnQ7aWYoZSYmdm9pZCAwPT09dCl7Y29uc3QgZT12b2lkIDAhPT1zJiYxPT09cy5sZW5ndGg7ZSYmKHQ9bi5nZXQocykpLHZvaWQgMD09PXQmJigodGhpcy5vPXQ9bmV3IENTU1N0eWxlU2hlZXQpLnJlcGxhY2VTeW5jKHRoaXMuY3NzVGV4dCksZSYmbi5zZXQocyx0KSl9cmV0dXJuIHR9dG9TdHJpbmcoKXtyZXR1cm4gdGhpcy5jc3NUZXh0fX1jb25zdCByPXQ9Pm5ldyBvKFwic3RyaW5nXCI9PXR5cGVvZiB0P3Q6dCtcIlwiLHZvaWQgMCxzKSxpPSh0LC4uLmUpPT57Y29uc3Qgbj0xPT09dC5sZW5ndGg/dFswXTplLnJlZHVjZSgoKGUscyxuKT0+ZSsodD0+e2lmKCEwPT09dC5fJGNzc1Jlc3VsdCQpcmV0dXJuIHQuY3NzVGV4dDtpZihcIm51bWJlclwiPT10eXBlb2YgdClyZXR1cm4gdDt0aHJvdyBFcnJvcihcIlZhbHVlIHBhc3NlZCB0byAnY3NzJyBmdW5jdGlvbiBtdXN0IGJlIGEgJ2NzcycgZnVuY3Rpb24gcmVzdWx0OiBcIit0K1wiLiBVc2UgJ3Vuc2FmZUNTUycgdG8gcGFzcyBub24tbGl0ZXJhbCB2YWx1ZXMsIGJ1dCB0YWtlIGNhcmUgdG8gZW5zdXJlIHBhZ2Ugc2VjdXJpdHkuXCIpfSkocykrdFtuKzFdKSx0WzBdKTtyZXR1cm4gbmV3IG8obix0LHMpfSxTPShzLG4pPT57ZT9zLmFkb3B0ZWRTdHlsZVNoZWV0cz1uLm1hcCgodD0+dCBpbnN0YW5jZW9mIENTU1N0eWxlU2hlZXQ/dDp0LnN0eWxlU2hlZXQpKTpuLmZvckVhY2goKGU9Pntjb25zdCBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKSxvPXQubGl0Tm9uY2U7dm9pZCAwIT09byYmbi5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLG8pLG4udGV4dENvbnRlbnQ9ZS5jc3NUZXh0LHMuYXBwZW5kQ2hpbGQobil9KSl9LGM9ZT90PT50OnQ9PnQgaW5zdGFuY2VvZiBDU1NTdHlsZVNoZWV0Pyh0PT57bGV0IGU9XCJcIjtmb3IoY29uc3QgcyBvZiB0LmNzc1J1bGVzKWUrPXMuY3NzVGV4dDtyZXR1cm4gcihlKX0pKHQpOnQ7ZXhwb3J0e28gYXMgQ1NTUmVzdWx0LFMgYXMgYWRvcHRTdHlsZXMsaSBhcyBjc3MsYyBhcyBnZXRDb21wYXRpYmxlU3R5bGUsZSBhcyBzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHMsciBhcyB1bnNhZmVDU1N9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3NzLXRhZy5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xudmFyIHQ7Y29uc3QgaT13aW5kb3cscz1pLnRydXN0ZWRUeXBlcyxlPXM/cy5jcmVhdGVQb2xpY3koXCJsaXQtaHRtbFwiLHtjcmVhdGVIVE1MOnQ9PnR9KTp2b2lkIDAsbz1gbGl0JCR7KE1hdGgucmFuZG9tKCkrXCJcIikuc2xpY2UoOSl9JGAsbj1cIj9cIitvLGw9YDwke259PmAsaD1kb2N1bWVudCxyPSh0PVwiXCIpPT5oLmNyZWF0ZUNvbW1lbnQodCksZD10PT5udWxsPT09dHx8XCJvYmplY3RcIiE9dHlwZW9mIHQmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQsdT1BcnJheS5pc0FycmF5LGM9dD0+dSh0KXx8XCJmdW5jdGlvblwiPT10eXBlb2YobnVsbD09dD92b2lkIDA6dFtTeW1ib2wuaXRlcmF0b3JdKSx2PS88KD86KCEtLXxcXC9bXmEtekEtWl0pfChcXC8/W2EtekEtWl1bXj5cXHNdKil8KFxcLz8kKSkvZyxhPS8tLT4vZyxmPS8+L2csXz1SZWdFeHAoXCI+fFsgXFx0XFxuXFxmXFxyXSg/OihbXlxcXFxzXFxcIic+PS9dKykoWyBcXHRcXG5cXGZcXHJdKj1bIFxcdFxcblxcZlxccl0qKD86W14gXFx0XFxuXFxmXFxyXFxcIidgPD49XXwoXFxcInwnKXwpKXwkKVwiLFwiZ1wiKSxtPS8nL2cscD0vXCIvZywkPS9eKD86c2NyaXB0fHN0eWxlfHRleHRhcmVhfHRpdGxlKSQvaSxnPXQ9PihpLC4uLnMpPT4oe18kbGl0VHlwZSQ6dCxzdHJpbmdzOmksdmFsdWVzOnN9KSx5PWcoMSksdz1nKDIpLHg9U3ltYm9sLmZvcihcImxpdC1ub0NoYW5nZVwiKSxiPVN5bWJvbC5mb3IoXCJsaXQtbm90aGluZ1wiKSxUPW5ldyBXZWFrTWFwLEE9KHQsaSxzKT0+e3ZhciBlLG87Y29uc3Qgbj1udWxsIT09KGU9bnVsbD09cz92b2lkIDA6cy5yZW5kZXJCZWZvcmUpJiZ2b2lkIDAhPT1lP2U6aTtsZXQgbD1uLl8kbGl0UGFydCQ7aWYodm9pZCAwPT09bCl7Y29uc3QgdD1udWxsIT09KG89bnVsbD09cz92b2lkIDA6cy5yZW5kZXJCZWZvcmUpJiZ2b2lkIDAhPT1vP286bnVsbDtuLl8kbGl0UGFydCQ9bD1uZXcgUyhpLmluc2VydEJlZm9yZShyKCksdCksdCx2b2lkIDAsbnVsbCE9cz9zOnt9KX1yZXR1cm4gbC5fJEFJKHQpLGx9LEU9aC5jcmVhdGVUcmVlV2Fsa2VyKGgsMTI5LG51bGwsITEpLEM9KHQsaSk9Pntjb25zdCBzPXQubGVuZ3RoLTEsbj1bXTtsZXQgaCxyPTI9PT1pP1wiPHN2Zz5cIjpcIlwiLGQ9djtmb3IobGV0IGk9MDtpPHM7aSsrKXtjb25zdCBzPXRbaV07bGV0IGUsdSxjPS0xLGc9MDtmb3IoO2c8cy5sZW5ndGgmJihkLmxhc3RJbmRleD1nLHU9ZC5leGVjKHMpLG51bGwhPT11KTspZz1kLmxhc3RJbmRleCxkPT09dj9cIiEtLVwiPT09dVsxXT9kPWE6dm9pZCAwIT09dVsxXT9kPWY6dm9pZCAwIT09dVsyXT8oJC50ZXN0KHVbMl0pJiYoaD1SZWdFeHAoXCI8L1wiK3VbMl0sXCJnXCIpKSxkPV8pOnZvaWQgMCE9PXVbM10mJihkPV8pOmQ9PT1fP1wiPlwiPT09dVswXT8oZD1udWxsIT1oP2g6dixjPS0xKTp2b2lkIDA9PT11WzFdP2M9LTI6KGM9ZC5sYXN0SW5kZXgtdVsyXS5sZW5ndGgsZT11WzFdLGQ9dm9pZCAwPT09dVszXT9fOidcIic9PT11WzNdP3A6bSk6ZD09PXB8fGQ9PT1tP2Q9XzpkPT09YXx8ZD09PWY/ZD12OihkPV8saD12b2lkIDApO2NvbnN0IHk9ZD09PV8mJnRbaSsxXS5zdGFydHNXaXRoKFwiLz5cIik/XCIgXCI6XCJcIjtyKz1kPT09dj9zK2w6Yz49MD8obi5wdXNoKGUpLHMuc2xpY2UoMCxjKStcIiRsaXQkXCIrcy5zbGljZShjKStvK3kpOnMrbysoLTI9PT1jPyhuLnB1c2godm9pZCAwKSxpKTp5KX1jb25zdCB1PXIrKHRbc118fFwiPD8+XCIpKygyPT09aT9cIjwvc3ZnPlwiOlwiXCIpO2lmKCFBcnJheS5pc0FycmF5KHQpfHwhdC5oYXNPd25Qcm9wZXJ0eShcInJhd1wiKSl0aHJvdyBFcnJvcihcImludmFsaWQgdGVtcGxhdGUgc3RyaW5ncyBhcnJheVwiKTtyZXR1cm5bdm9pZCAwIT09ZT9lLmNyZWF0ZUhUTUwodSk6dSxuXX07Y2xhc3MgUHtjb25zdHJ1Y3Rvcih7c3RyaW5nczp0LF8kbGl0VHlwZSQ6aX0sZSl7bGV0IGw7dGhpcy5wYXJ0cz1bXTtsZXQgaD0wLGQ9MDtjb25zdCB1PXQubGVuZ3RoLTEsYz10aGlzLnBhcnRzLFt2LGFdPUModCxpKTtpZih0aGlzLmVsPVAuY3JlYXRlRWxlbWVudCh2LGUpLEUuY3VycmVudE5vZGU9dGhpcy5lbC5jb250ZW50LDI9PT1pKXtjb25zdCB0PXRoaXMuZWwuY29udGVudCxpPXQuZmlyc3RDaGlsZDtpLnJlbW92ZSgpLHQuYXBwZW5kKC4uLmkuY2hpbGROb2Rlcyl9Zm9yKDtudWxsIT09KGw9RS5uZXh0Tm9kZSgpKSYmYy5sZW5ndGg8dTspe2lmKDE9PT1sLm5vZGVUeXBlKXtpZihsLmhhc0F0dHJpYnV0ZXMoKSl7Y29uc3QgdD1bXTtmb3IoY29uc3QgaSBvZiBsLmdldEF0dHJpYnV0ZU5hbWVzKCkpaWYoaS5lbmRzV2l0aChcIiRsaXQkXCIpfHxpLnN0YXJ0c1dpdGgobykpe2NvbnN0IHM9YVtkKytdO2lmKHQucHVzaChpKSx2b2lkIDAhPT1zKXtjb25zdCB0PWwuZ2V0QXR0cmlidXRlKHMudG9Mb3dlckNhc2UoKStcIiRsaXQkXCIpLnNwbGl0KG8pLGk9LyhbLj9AXSk/KC4qKS8uZXhlYyhzKTtjLnB1c2goe3R5cGU6MSxpbmRleDpoLG5hbWU6aVsyXSxzdHJpbmdzOnQsY3RvcjpcIi5cIj09PWlbMV0/UjpcIj9cIj09PWlbMV0/SDpcIkBcIj09PWlbMV0/STpNfSl9ZWxzZSBjLnB1c2goe3R5cGU6NixpbmRleDpofSl9Zm9yKGNvbnN0IGkgb2YgdClsLnJlbW92ZUF0dHJpYnV0ZShpKX1pZigkLnRlc3QobC50YWdOYW1lKSl7Y29uc3QgdD1sLnRleHRDb250ZW50LnNwbGl0KG8pLGk9dC5sZW5ndGgtMTtpZihpPjApe2wudGV4dENvbnRlbnQ9cz9zLmVtcHR5U2NyaXB0OlwiXCI7Zm9yKGxldCBzPTA7czxpO3MrKylsLmFwcGVuZCh0W3NdLHIoKSksRS5uZXh0Tm9kZSgpLGMucHVzaCh7dHlwZToyLGluZGV4OisraH0pO2wuYXBwZW5kKHRbaV0scigpKX19fWVsc2UgaWYoOD09PWwubm9kZVR5cGUpaWYobC5kYXRhPT09biljLnB1c2goe3R5cGU6MixpbmRleDpofSk7ZWxzZXtsZXQgdD0tMTtmb3IoOy0xIT09KHQ9bC5kYXRhLmluZGV4T2Yobyx0KzEpKTspYy5wdXNoKHt0eXBlOjcsaW5kZXg6aH0pLHQrPW8ubGVuZ3RoLTF9aCsrfX1zdGF0aWMgY3JlYXRlRWxlbWVudCh0LGkpe2NvbnN0IHM9aC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7cmV0dXJuIHMuaW5uZXJIVE1MPXQsc319ZnVuY3Rpb24gVih0LGkscz10LGUpe3ZhciBvLG4sbCxoO2lmKGk9PT14KXJldHVybiBpO2xldCByPXZvaWQgMCE9PWU/bnVsbD09PShvPXMuXyRDbCl8fHZvaWQgMD09PW8/dm9pZCAwOm9bZV06cy5fJEN1O2NvbnN0IHU9ZChpKT92b2lkIDA6aS5fJGxpdERpcmVjdGl2ZSQ7cmV0dXJuKG51bGw9PXI/dm9pZCAwOnIuY29uc3RydWN0b3IpIT09dSYmKG51bGw9PT0obj1udWxsPT1yP3ZvaWQgMDpyLl8kQU8pfHx2b2lkIDA9PT1ufHxuLmNhbGwociwhMSksdm9pZCAwPT09dT9yPXZvaWQgMDoocj1uZXcgdSh0KSxyLl8kQVQodCxzLGUpKSx2b2lkIDAhPT1lPyhudWxsIT09KGw9KGg9cykuXyRDbCkmJnZvaWQgMCE9PWw/bDpoLl8kQ2w9W10pW2VdPXI6cy5fJEN1PXIpLHZvaWQgMCE9PXImJihpPVYodCxyLl8kQVModCxpLnZhbHVlcykscixlKSksaX1jbGFzcyBOe2NvbnN0cnVjdG9yKHQsaSl7dGhpcy52PVtdLHRoaXMuXyRBTj12b2lkIDAsdGhpcy5fJEFEPXQsdGhpcy5fJEFNPWl9Z2V0IHBhcmVudE5vZGUoKXtyZXR1cm4gdGhpcy5fJEFNLnBhcmVudE5vZGV9Z2V0IF8kQVUoKXtyZXR1cm4gdGhpcy5fJEFNLl8kQVV9cCh0KXt2YXIgaTtjb25zdHtlbDp7Y29udGVudDpzfSxwYXJ0czplfT10aGlzLl8kQUQsbz0obnVsbCE9PShpPW51bGw9PXQ/dm9pZCAwOnQuY3JlYXRpb25TY29wZSkmJnZvaWQgMCE9PWk/aTpoKS5pbXBvcnROb2RlKHMsITApO0UuY3VycmVudE5vZGU9bztsZXQgbj1FLm5leHROb2RlKCksbD0wLHI9MCxkPWVbMF07Zm9yKDt2b2lkIDAhPT1kOyl7aWYobD09PWQuaW5kZXgpe2xldCBpOzI9PT1kLnR5cGU/aT1uZXcgUyhuLG4ubmV4dFNpYmxpbmcsdGhpcyx0KToxPT09ZC50eXBlP2k9bmV3IGQuY3RvcihuLGQubmFtZSxkLnN0cmluZ3MsdGhpcyx0KTo2PT09ZC50eXBlJiYoaT1uZXcgTChuLHRoaXMsdCkpLHRoaXMudi5wdXNoKGkpLGQ9ZVsrK3JdfWwhPT0obnVsbD09ZD92b2lkIDA6ZC5pbmRleCkmJihuPUUubmV4dE5vZGUoKSxsKyspfXJldHVybiBvfW0odCl7bGV0IGk9MDtmb3IoY29uc3QgcyBvZiB0aGlzLnYpdm9pZCAwIT09cyYmKHZvaWQgMCE9PXMuc3RyaW5ncz8ocy5fJEFJKHQscyxpKSxpKz1zLnN0cmluZ3MubGVuZ3RoLTIpOnMuXyRBSSh0W2ldKSksaSsrfX1jbGFzcyBTe2NvbnN0cnVjdG9yKHQsaSxzLGUpe3ZhciBvO3RoaXMudHlwZT0yLHRoaXMuXyRBSD1iLHRoaXMuXyRBTj12b2lkIDAsdGhpcy5fJEFBPXQsdGhpcy5fJEFCPWksdGhpcy5fJEFNPXMsdGhpcy5vcHRpb25zPWUsdGhpcy5fJENfPW51bGw9PT0obz1udWxsPT1lP3ZvaWQgMDplLmlzQ29ubmVjdGVkKXx8dm9pZCAwPT09b3x8b31nZXQgXyRBVSgpe3ZhciB0LGk7cmV0dXJuIG51bGwhPT0oaT1udWxsPT09KHQ9dGhpcy5fJEFNKXx8dm9pZCAwPT09dD92b2lkIDA6dC5fJEFVKSYmdm9pZCAwIT09aT9pOnRoaXMuXyRDX31nZXQgcGFyZW50Tm9kZSgpe2xldCB0PXRoaXMuXyRBQS5wYXJlbnROb2RlO2NvbnN0IGk9dGhpcy5fJEFNO3JldHVybiB2b2lkIDAhPT1pJiYxMT09PXQubm9kZVR5cGUmJih0PWkucGFyZW50Tm9kZSksdH1nZXQgc3RhcnROb2RlKCl7cmV0dXJuIHRoaXMuXyRBQX1nZXQgZW5kTm9kZSgpe3JldHVybiB0aGlzLl8kQUJ9XyRBSSh0LGk9dGhpcyl7dD1WKHRoaXMsdCxpKSxkKHQpP3Q9PT1ifHxudWxsPT10fHxcIlwiPT09dD8odGhpcy5fJEFIIT09YiYmdGhpcy5fJEFSKCksdGhpcy5fJEFIPWIpOnQhPT10aGlzLl8kQUgmJnQhPT14JiZ0aGlzLiQodCk6dm9pZCAwIT09dC5fJGxpdFR5cGUkP3RoaXMuVCh0KTp2b2lkIDAhPT10Lm5vZGVUeXBlP3RoaXMuayh0KTpjKHQpP3RoaXMuTyh0KTp0aGlzLiQodCl9Uyh0LGk9dGhpcy5fJEFCKXtyZXR1cm4gdGhpcy5fJEFBLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHQsaSl9ayh0KXt0aGlzLl8kQUghPT10JiYodGhpcy5fJEFSKCksdGhpcy5fJEFIPXRoaXMuUyh0KSl9JCh0KXt0aGlzLl8kQUghPT1iJiZkKHRoaXMuXyRBSCk/dGhpcy5fJEFBLm5leHRTaWJsaW5nLmRhdGE9dDp0aGlzLmsoaC5jcmVhdGVUZXh0Tm9kZSh0KSksdGhpcy5fJEFIPXR9VCh0KXt2YXIgaTtjb25zdHt2YWx1ZXM6cyxfJGxpdFR5cGUkOmV9PXQsbz1cIm51bWJlclwiPT10eXBlb2YgZT90aGlzLl8kQUModCk6KHZvaWQgMD09PWUuZWwmJihlLmVsPVAuY3JlYXRlRWxlbWVudChlLmgsdGhpcy5vcHRpb25zKSksZSk7aWYoKG51bGw9PT0oaT10aGlzLl8kQUgpfHx2b2lkIDA9PT1pP3ZvaWQgMDppLl8kQUQpPT09byl0aGlzLl8kQUgubShzKTtlbHNle2NvbnN0IHQ9bmV3IE4obyx0aGlzKSxpPXQucCh0aGlzLm9wdGlvbnMpO3QubShzKSx0aGlzLmsoaSksdGhpcy5fJEFIPXR9fV8kQUModCl7bGV0IGk9VC5nZXQodC5zdHJpbmdzKTtyZXR1cm4gdm9pZCAwPT09aSYmVC5zZXQodC5zdHJpbmdzLGk9bmV3IFAodCkpLGl9Tyh0KXt1KHRoaXMuXyRBSCl8fCh0aGlzLl8kQUg9W10sdGhpcy5fJEFSKCkpO2NvbnN0IGk9dGhpcy5fJEFIO2xldCBzLGU9MDtmb3IoY29uc3QgbyBvZiB0KWU9PT1pLmxlbmd0aD9pLnB1c2gocz1uZXcgUyh0aGlzLlMocigpKSx0aGlzLlMocigpKSx0aGlzLHRoaXMub3B0aW9ucykpOnM9aVtlXSxzLl8kQUkobyksZSsrO2U8aS5sZW5ndGgmJih0aGlzLl8kQVIocyYmcy5fJEFCLm5leHRTaWJsaW5nLGUpLGkubGVuZ3RoPWUpfV8kQVIodD10aGlzLl8kQUEubmV4dFNpYmxpbmcsaSl7dmFyIHM7Zm9yKG51bGw9PT0ocz10aGlzLl8kQVApfHx2b2lkIDA9PT1zfHxzLmNhbGwodGhpcywhMSwhMCxpKTt0JiZ0IT09dGhpcy5fJEFCOyl7Y29uc3QgaT10Lm5leHRTaWJsaW5nO3QucmVtb3ZlKCksdD1pfX1zZXRDb25uZWN0ZWQodCl7dmFyIGk7dm9pZCAwPT09dGhpcy5fJEFNJiYodGhpcy5fJENfPXQsbnVsbD09PShpPXRoaXMuXyRBUCl8fHZvaWQgMD09PWl8fGkuY2FsbCh0aGlzLHQpKX19Y2xhc3MgTXtjb25zdHJ1Y3Rvcih0LGkscyxlLG8pe3RoaXMudHlwZT0xLHRoaXMuXyRBSD1iLHRoaXMuXyRBTj12b2lkIDAsdGhpcy5lbGVtZW50PXQsdGhpcy5uYW1lPWksdGhpcy5fJEFNPWUsdGhpcy5vcHRpb25zPW8scy5sZW5ndGg+Mnx8XCJcIiE9PXNbMF18fFwiXCIhPT1zWzFdPyh0aGlzLl8kQUg9QXJyYXkocy5sZW5ndGgtMSkuZmlsbChuZXcgU3RyaW5nKSx0aGlzLnN0cmluZ3M9cyk6dGhpcy5fJEFIPWJ9Z2V0IHRhZ05hbWUoKXtyZXR1cm4gdGhpcy5lbGVtZW50LnRhZ05hbWV9Z2V0IF8kQVUoKXtyZXR1cm4gdGhpcy5fJEFNLl8kQVV9XyRBSSh0LGk9dGhpcyxzLGUpe2NvbnN0IG89dGhpcy5zdHJpbmdzO2xldCBuPSExO2lmKHZvaWQgMD09PW8pdD1WKHRoaXMsdCxpLDApLG49IWQodCl8fHQhPT10aGlzLl8kQUgmJnQhPT14LG4mJih0aGlzLl8kQUg9dCk7ZWxzZXtjb25zdCBlPXQ7bGV0IGwsaDtmb3IodD1vWzBdLGw9MDtsPG8ubGVuZ3RoLTE7bCsrKWg9Vih0aGlzLGVbcytsXSxpLGwpLGg9PT14JiYoaD10aGlzLl8kQUhbbF0pLG58fChuPSFkKGgpfHxoIT09dGhpcy5fJEFIW2xdKSxoPT09Yj90PWI6dCE9PWImJih0Kz0obnVsbCE9aD9oOlwiXCIpK29bbCsxXSksdGhpcy5fJEFIW2xdPWh9biYmIWUmJnRoaXMuUCh0KX1QKHQpe3Q9PT1iP3RoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUodGhpcy5uYW1lKTp0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKHRoaXMubmFtZSxudWxsIT10P3Q6XCJcIil9fWNsYXNzIFIgZXh0ZW5kcyBNe2NvbnN0cnVjdG9yKCl7c3VwZXIoLi4uYXJndW1lbnRzKSx0aGlzLnR5cGU9M31QKHQpe3RoaXMuZWxlbWVudFt0aGlzLm5hbWVdPXQ9PT1iP3ZvaWQgMDp0fX1jb25zdCBrPXM/cy5lbXB0eVNjcmlwdDpcIlwiO2NsYXNzIEggZXh0ZW5kcyBNe2NvbnN0cnVjdG9yKCl7c3VwZXIoLi4uYXJndW1lbnRzKSx0aGlzLnR5cGU9NH1QKHQpe3QmJnQhPT1iP3RoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLGspOnRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUodGhpcy5uYW1lKX19Y2xhc3MgSSBleHRlbmRzIE17Y29uc3RydWN0b3IodCxpLHMsZSxvKXtzdXBlcih0LGkscyxlLG8pLHRoaXMudHlwZT01fV8kQUkodCxpPXRoaXMpe3ZhciBzO2lmKCh0PW51bGwhPT0ocz1WKHRoaXMsdCxpLDApKSYmdm9pZCAwIT09cz9zOmIpPT09eClyZXR1cm47Y29uc3QgZT10aGlzLl8kQUgsbz10PT09YiYmZSE9PWJ8fHQuY2FwdHVyZSE9PWUuY2FwdHVyZXx8dC5vbmNlIT09ZS5vbmNlfHx0LnBhc3NpdmUhPT1lLnBhc3NpdmUsbj10IT09YiYmKGU9PT1ifHxvKTtvJiZ0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLm5hbWUsdGhpcyxlKSxuJiZ0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLm5hbWUsdGhpcyx0KSx0aGlzLl8kQUg9dH1oYW5kbGVFdmVudCh0KXt2YXIgaSxzO1wiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMuXyRBSD90aGlzLl8kQUguY2FsbChudWxsIT09KHM9bnVsbD09PShpPXRoaXMub3B0aW9ucyl8fHZvaWQgMD09PWk/dm9pZCAwOmkuaG9zdCkmJnZvaWQgMCE9PXM/czp0aGlzLmVsZW1lbnQsdCk6dGhpcy5fJEFILmhhbmRsZUV2ZW50KHQpfX1jbGFzcyBMe2NvbnN0cnVjdG9yKHQsaSxzKXt0aGlzLmVsZW1lbnQ9dCx0aGlzLnR5cGU9Nix0aGlzLl8kQU49dm9pZCAwLHRoaXMuXyRBTT1pLHRoaXMub3B0aW9ucz1zfWdldCBfJEFVKCl7cmV0dXJuIHRoaXMuXyRBTS5fJEFVfV8kQUkodCl7Vih0aGlzLHQpfX1jb25zdCB6PXtBOlwiJGxpdCRcIixNOm8sQzpuLEw6MSxSOkMsRDpOLFY6YyxJOlYsSDpTLE46TSxVOkgsQjpJLEY6UixXOkx9LFo9aS5saXRIdG1sUG9seWZpbGxTdXBwb3J0O251bGw9PVp8fFooUCxTKSwobnVsbCE9PSh0PWkubGl0SHRtbFZlcnNpb25zKSYmdm9pZCAwIT09dD90OmkubGl0SHRtbFZlcnNpb25zPVtdKS5wdXNoKFwiMi4zLjFcIik7ZXhwb3J0e3ogYXMgXyRMSCx5IGFzIGh0bWwseCBhcyBub0NoYW5nZSxiIGFzIG5vdGhpbmcsQSBhcyByZW5kZXIsdyBhcyBzdmd9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGl0LWh0bWwuanMubWFwXG4iLCJpbXBvcnR7UmVhY3RpdmVFbGVtZW50IGFzIHR9ZnJvbVwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50XCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudFwiO2ltcG9ydHtyZW5kZXIgYXMgZSxub0NoYW5nZSBhcyBpfWZyb21cImxpdC1odG1sXCI7ZXhwb3J0KmZyb21cImxpdC1odG1sXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi92YXIgbCxvO2NvbnN0IHI9dDtjbGFzcyBzIGV4dGVuZHMgdHtjb25zdHJ1Y3Rvcigpe3N1cGVyKC4uLmFyZ3VtZW50cyksdGhpcy5yZW5kZXJPcHRpb25zPXtob3N0OnRoaXN9LHRoaXMuXyREbz12b2lkIDB9Y3JlYXRlUmVuZGVyUm9vdCgpe3ZhciB0LGU7Y29uc3QgaT1zdXBlci5jcmVhdGVSZW5kZXJSb290KCk7cmV0dXJuIG51bGwhPT0odD0oZT10aGlzLnJlbmRlck9wdGlvbnMpLnJlbmRlckJlZm9yZSkmJnZvaWQgMCE9PXR8fChlLnJlbmRlckJlZm9yZT1pLmZpcnN0Q2hpbGQpLGl9dXBkYXRlKHQpe2NvbnN0IGk9dGhpcy5yZW5kZXIoKTt0aGlzLmhhc1VwZGF0ZWR8fCh0aGlzLnJlbmRlck9wdGlvbnMuaXNDb25uZWN0ZWQ9dGhpcy5pc0Nvbm5lY3RlZCksc3VwZXIudXBkYXRlKHQpLHRoaXMuXyREbz1lKGksdGhpcy5yZW5kZXJSb290LHRoaXMucmVuZGVyT3B0aW9ucyl9Y29ubmVjdGVkQ2FsbGJhY2soKXt2YXIgdDtzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpLG51bGw9PT0odD10aGlzLl8kRG8pfHx2b2lkIDA9PT10fHx0LnNldENvbm5lY3RlZCghMCl9ZGlzY29ubmVjdGVkQ2FsbGJhY2soKXt2YXIgdDtzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpLG51bGw9PT0odD10aGlzLl8kRG8pfHx2b2lkIDA9PT10fHx0LnNldENvbm5lY3RlZCghMSl9cmVuZGVyKCl7cmV0dXJuIGl9fXMuZmluYWxpemVkPSEwLHMuXyRsaXRFbGVtZW50JD0hMCxudWxsPT09KGw9Z2xvYmFsVGhpcy5saXRFbGVtZW50SHlkcmF0ZVN1cHBvcnQpfHx2b2lkIDA9PT1sfHxsLmNhbGwoZ2xvYmFsVGhpcyx7TGl0RWxlbWVudDpzfSk7Y29uc3Qgbj1nbG9iYWxUaGlzLmxpdEVsZW1lbnRQb2x5ZmlsbFN1cHBvcnQ7bnVsbD09bnx8bih7TGl0RWxlbWVudDpzfSk7Y29uc3QgaD17XyRBSzoodCxlLGkpPT57dC5fJEFLKGUsaSl9LF8kQUw6dD0+dC5fJEFMfTsobnVsbCE9PShvPWdsb2JhbFRoaXMubGl0RWxlbWVudFZlcnNpb25zKSYmdm9pZCAwIT09bz9vOmdsb2JhbFRoaXMubGl0RWxlbWVudFZlcnNpb25zPVtdKS5wdXNoKFwiMy4yLjJcIik7ZXhwb3J0e3MgYXMgTGl0RWxlbWVudCxyIGFzIFVwZGF0aW5nRWxlbWVudCxoIGFzIF8kTEV9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGl0LWVsZW1lbnQuanMubWFwXG4iLCJpbXBvcnQge0pvYiwgU2ltcGxlQ2FjaGVkUXVldWV9IGZyb20gJy4uL3V0aWxzL3F1ZXVlJztcbmltcG9ydCB7Q2xpZW50U2VuZH0gZnJvbSAnLi4vYnJpZGdlL2NsaWVudCc7XG5pbXBvcnQge0ZldGNoSW5zcGVjdEluZm8sIEZldGNoSW5zcGVjdEluZm9SZXF1ZXN0LCBJdGVtSW5mb30gZnJvbSAnLi4vYnJpZGdlL2hhbmRsZXJzL2ZldGNoX2luc3BlY3RfaW5mbyc7XG5cbmNsYXNzIEluc3BlY3RKb2IgZXh0ZW5kcyBKb2I8RmV0Y2hJbnNwZWN0SW5mb1JlcXVlc3Q+IHtcbiAgICBoYXNoQ29kZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxpbms7XG4gICAgfVxufVxuXG5jbGFzcyBGbG9hdEZldGNoZXIgZXh0ZW5kcyBTaW1wbGVDYWNoZWRRdWV1ZTxGZXRjaEluc3BlY3RJbmZvUmVxdWVzdCwgSXRlbUluZm8+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqIGFsbG93IHVwIHRvIDEwIHNpbXVsdGFuZW91cyBmbG9hdCBmZXRjaCByZXFzICovXG4gICAgICAgIHN1cGVyKDEwKTtcbiAgICB9XG5cbiAgICBmZXRjaChyZXE6IEZldGNoSW5zcGVjdEluZm9SZXF1ZXN0KTogUHJvbWlzZTxJdGVtSW5mbz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQobmV3IEluc3BlY3RKb2IocmVxKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHByb2Nlc3MocmVxOiBGZXRjaEluc3BlY3RJbmZvUmVxdWVzdCk6IFByb21pc2U8SXRlbUluZm8+IHtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IENsaWVudFNlbmQoRmV0Y2hJbnNwZWN0SW5mbywgcmVxKTtcbiAgICAgICAgcmV0dXJuIHJlc3AuaXRlbWluZm87XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZ0Zsb2F0RmV0Y2hlciA9IG5ldyBGbG9hdEZldGNoZXIoKTtcbiIsImltcG9ydCB7Q2FjaGUsIElDYWNoZSwgVFRMQ2FjaGV9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHtEZWZlcnJlZFByb21pc2V9IGZyb20gJy4vZGVmZXJyZWRfcHJvbWlzZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBKb2I8VD4ge1xuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkYXRhOiBUKSB7fVxuXG4gICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYXNoIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyB0aGlzIGpvYi5cbiAgICAgKlxuICAgICAqIElmIHR3byBqb2JzIGhhdmUgdGhlIHNhbWUgaGFzaGNvZGUsIHRoZXkgYXJlIGNvbnNpZGVyZWQgaWRlbnRpY2FsLlxuICAgICAqICovXG4gICAgaGFzaENvZGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2VuZXJpY0pvYjxUPiBleHRlbmRzIEpvYjxUPiB7fVxuXG5pbnRlcmZhY2UgUXVldWVkSm9iPFJlcSwgUmVzcD4ge1xuICAgIGpvYjogSm9iPFJlcT47XG4gICAgZGVmZXJyZWRQcm9taXNlOiBEZWZlcnJlZFByb21pc2U8UmVzcD47XG59XG5cbi8qKlxuICogUXVldWUgdG8gaGFuZGxlIHByb2Nlc3Npbmcgb2YgXCJKb2JzXCIgd2l0aCBhIHJlcXVlc3QgdGhhdFxuICogcmV0dXJuIGEgcmVzcG9uc2UuIEVuc3VyZXMgYSBtYXggY29uY3VycmVuY3kgb2YgcHJvY2Vzc2luZ1xuICogc2ltdWx0YW5lb3VzIGpvYnMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBRdWV1ZTxSZXEsIFJlc3A+IHtcbiAgICBwcml2YXRlIGludGVybmFsUXVldWU6IFF1ZXVlZEpvYjxSZXEsIFJlc3A+W10gPSBbXTtcbiAgICBwcml2YXRlIGpvYnNQcm9jZXNzaW5nOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXhDb25jdXJyZW5jeTogbnVtYmVyKSB7fVxuXG4gICAgLyoqIEFtb3VudCBvZiBqb2JzIGN1cnJlbnRseSBpbiB0aGUgcXVldWUgKi9cbiAgICBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsUXVldWUubGVuZ3RoO1xuICAgIH1cblxuICAgIGhhcyhqb2I6IEpvYjxSZXE+KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuaW50ZXJuYWxRdWV1ZS5maW5kKChlKSA9PiBlLmpvYi5oYXNoQ29kZSgpID09PSBqb2IuaGFzaENvZGUoKSk7XG4gICAgfVxuXG4gICAgZ2V0T3JUaHJvdyhqb2I6IEpvYjxSZXE+KTogUXVldWVkSm9iPFJlcSwgUmVzcD4ge1xuICAgICAgICBpZiAoIXRoaXMuaGFzKGpvYikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSm9iWyR7am9iLmhhc2hDb2RlKCl9XSBpcyBub3QgcXVldWVkYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHdWFyYW50ZWVkXG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsUXVldWUuZmluZCgoZSkgPT4gZS5qb2IuaGFzaENvZGUoKSA9PT0gam9iLmhhc2hDb2RlKCkpITtcbiAgICB9XG5cbiAgICBhc3luYyBjaGVja1F1ZXVlKCkge1xuICAgICAgICBpZiAodGhpcy5pbnRlcm5hbFF1ZXVlLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmpvYnNQcm9jZXNzaW5nID49IHRoaXMubWF4Q29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgIC8vIERvbid0IHdhbnQgdG8gbGF1bmNoIG1vcmUgaW5zdGFuY2VzXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmpvYnNQcm9jZXNzaW5nICs9IDE7XG5cbiAgICAgICAgY29uc3QgcXVldWVkSm9iID0gdGhpcy5pbnRlcm5hbFF1ZXVlLnNoaWZ0KCkhO1xuICAgICAgICBjb25zdCByZXE6IFJlcSA9IHF1ZXVlZEpvYi5qb2IuZ2V0RGF0YSgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5wcm9jZXNzKHJlcSk7XG4gICAgICAgICAgICBxdWV1ZWRKb2IuZGVmZXJyZWRQcm9taXNlLnJlc29sdmUocmVzcCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHF1ZXVlZEpvYi5kZWZlcnJlZFByb21pc2UucmVqZWN0KChlIGFzIGFueSkudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmpvYnNQcm9jZXNzaW5nIC09IDE7XG4gICAgICAgIHRoaXMuY2hlY2tRdWV1ZSgpO1xuICAgIH1cblxuICAgIGFkZChqb2I6IEpvYjxSZXE+KTogUHJvbWlzZTxSZXNwPiB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhqb2IpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPclRocm93KGpvYik/LmRlZmVycmVkUHJvbWlzZS5wcm9taXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3IERlZmVycmVkUHJvbWlzZTxSZXNwPigpO1xuICAgICAgICB0aGlzLmludGVybmFsUXVldWUucHVzaCh7am9iLCBkZWZlcnJlZFByb21pc2U6IHByb21pc2V9KTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2hlY2tRdWV1ZSgpLCAwKTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZS5wcm9taXNlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHByb2Nlc3MocmVxOiBSZXEpOiBQcm9taXNlPFJlc3A+O1xufVxuXG4vKipcbiAqIExpa2UgYSBxdWV1ZSwgYnV0IGhhcyBhbiBpbnRlcm5hbCBjYWNoZSBmb3IgZWxlbWVudHMgYWxyZWFkeSByZXF1ZXN0ZWRcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENhY2hlZFF1ZXVlPFJlcSwgUmVzcD4gZXh0ZW5kcyBRdWV1ZTxSZXEsIFJlc3A+IHtcbiAgICAvKiogVW5kZXJseWluZyBpbXBsZW1lbnRhdGlvbiBvZiBhIGNhY2hlICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNhY2hlKCk6IElDYWNoZTxSZXNwPjtcblxuICAgIC8qKiBBbW91bnQgb2YgcHJldmlvdXNseSByZXF1ZXN0ZWQgam9icyBzdG9yZWQgaW4gdGhlIGNhY2hlICovXG4gICAgY2FjaGVTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlKCkuc2l6ZSgpO1xuICAgIH1cblxuICAgIGdldENhY2hlZChqb2I6IEpvYjxSZXE+KTogUmVzcCB8IG51bGwge1xuICAgICAgICBpZiAodGhpcy5jYWNoZSgpLmhhcyhqb2IuaGFzaENvZGUoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlKCkuZ2V0T3JUaHJvdyhqb2IuaGFzaENvZGUoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENhY2hlZChqb2I6IEpvYjxSZXE+LCByZXNwOiBSZXNwKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FjaGUoKS5zZXQoam9iLmhhc2hDb2RlKCksIHJlc3ApO1xuICAgIH1cblxuICAgIGFkZChqb2I6IEpvYjxSZXE+KTogUHJvbWlzZTxSZXNwPiB7XG4gICAgICAgIGlmICh0aGlzLmdldENhY2hlZChqb2IpKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZ2V0Q2FjaGVkKGpvYikhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBlci5hZGQoam9iKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldENhY2hlZChqb2IsIHJlc3ApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3A7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBwcm9jZXNzKHJlcTogUmVxKTogUHJvbWlzZTxSZXNwPjtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBsZUNhY2hlZFF1ZXVlPFJlcSwgUmVzcD4gZXh0ZW5kcyBDYWNoZWRRdWV1ZTxSZXEsIFJlc3A+IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhY2hlXyA9IG5ldyBDYWNoZTxSZXNwPigpO1xuXG4gICAgcHJvdGVjdGVkIGNhY2hlKCk6IElDYWNoZTxSZXNwPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlXztcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUVExDYWNoZWRRdWV1ZTxSZXEsIFJlc3A+IGV4dGVuZHMgQ2FjaGVkUXVldWU8UmVxLCBSZXNwPiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjYWNoZV86IFRUTENhY2hlPFJlc3A+O1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1heENvbmN1cnJlbmN5OiBudW1iZXIsIHByaXZhdGUgdHRsTXM6IG51bWJlcikge1xuICAgICAgICBzdXBlcihtYXhDb25jdXJyZW5jeSk7XG4gICAgICAgIHRoaXMuY2FjaGVfID0gbmV3IFRUTENhY2hlPFJlc3A+KHR0bE1zKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2FjaGUoKTogSUNhY2hlPFJlc3A+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVfO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSUNhY2hlPFQ+IHtcbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZDtcbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkO1xuICAgIGdldE9yVGhyb3coa2V5OiBzdHJpbmcpOiBUO1xuICAgIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW47XG4gICAgc2l6ZSgpOiBudW1iZXI7XG59XG5cbi8qKlxuICogU2ltcGxlIEdlbmVyaWMgQ2FjaGUgd2l0aCBzdHJpbmdpZmllZCBrZXlzXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWNoZTxUPiBpbXBsZW1lbnRzIElDYWNoZTxUPiB7XG4gICAgcHJpdmF0ZSBjYWNoZV86IHtba2V5OiBzdHJpbmddOiBUfSA9IHt9O1xuXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogVCkge1xuICAgICAgICB0aGlzLmNhY2hlX1trZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0KGtleTogc3RyaW5nKTogVCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlX1trZXldO1xuICAgIH1cblxuICAgIGdldE9yVGhyb3coa2V5OiBzdHJpbmcpOiBUIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGtleSAke2tleX0gZG9lcyBub3QgZXhpc3QgaW4gbWFwIFtnZXRPclRocm93XWApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVfW2tleV07XG4gICAgfVxuXG4gICAgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBrZXkgaW4gdGhpcy5jYWNoZV87XG4gICAgfVxuXG4gICAgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5jYWNoZV8pLmxlbmd0aDtcbiAgICB9XG59XG5cbmludGVyZmFjZSBUVExXcmFwcGVyPFQ+IHtcbiAgICBkYXRhOiBUO1xuICAgIGV4cGlyZXNFcG9jaDogbnVtYmVyO1xufVxuXG4vKipcbiAqIEV4dGVuc2lvbiBvZiB7QGxpbmsgQ2FjaGV9IHRoYXQgYWxsb3dzIHNldHRpbmcgYSBUVEwgKHRpbWUtdG8tbGl2ZSkgb24gYSBrZXlcbiAqIHN1Y2ggdGhhdCBhdXRvbWF0aWNhbGx5IGV4cGlyZXMgYWZ0ZXIgYSBzcGVjaWZpZWQgdGltZS5cbiAqXG4gKiBCeSBkZWZhdWx0LCBrZXlzIHdpbGwgZXhwaXJlIHdpdGgge0BsaW5rIGRlZmF1bHRUVExNc30uXG4gKi9cbmV4cG9ydCBjbGFzcyBUVExDYWNoZTxUPiBpbXBsZW1lbnRzIElDYWNoZTxUPiB7XG4gICAgcHJpdmF0ZSBjYWNoZV86IHtba2V5OiBzdHJpbmddOiBUVExXcmFwcGVyPFQ+fSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWZhdWx0VFRMTXM6IG51bWJlcikge31cblxuICAgIGdldChrZXk6IHN0cmluZyk6IFQgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY2FjaGVfW2tleV07XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGFsc28gcmVzcGVjdHMgVFRMXG4gICAgICAgIGlmICh2YWx1ZS5leHBpcmVzRXBvY2ggPCBEYXRlLm5vdygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWUuZGF0YTtcbiAgICB9XG5cbiAgICBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBnZXRPclRocm93KGtleTogc3RyaW5nKTogVCB7XG4gICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBrZXkgJHtrZXl9IGRvZXMgbm90IGV4aXN0IGluIG1hcCBbZ2V0T3JUaHJvd11gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldChrZXkpITtcbiAgICB9XG5cbiAgICBzZXRXaXRoVFRMKGtleTogc3RyaW5nLCB2YWx1ZTogVCwgdHRsTXM6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNhY2hlX1trZXldID0ge1xuICAgICAgICAgICAgZGF0YTogdmFsdWUsXG4gICAgICAgICAgICBleHBpcmVzRXBvY2g6IERhdGUubm93KCkgKyB0dGxNcyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBUKSB7XG4gICAgICAgIHRoaXMuc2V0V2l0aFRUTChrZXksIHZhbHVlLCB0aGlzLmRlZmF1bHRUVExNcyk7XG4gICAgfVxuXG4gICAgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5jYWNoZV8pLmxlbmd0aDtcbiAgICB9XG59XG4iLCIvKipcbiAqIFNpbWlsYXIgdG8gYSBwcm9taXNlLCBidXQgYWxsb3dzIHRoZSBhYmlsaXR5IHRvIHJlc29sdmUvcmVqZWN0IGluIGEgZGlmZmVyZW50IGNvbnRleHRcbiAqICovXG5leHBvcnQgY2xhc3MgRGVmZXJyZWRQcm9taXNlPFQ+IHtcbiAgICBwcml2YXRlIHJlc29sdmVfOiAoKHZhbHVlOiBUKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIHJlamVjdF86ICgocmVhc29uOiBzdHJpbmcpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcHJvbWlzZV86IFByb21pc2U8VD47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wcm9taXNlXyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZV8gPSByZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5yZWplY3RfID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNvbHZlKHZhbHVlOiBUKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZV8hKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZWplY3QocmVhc29uOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yZWplY3RfIShyZWFzb24pO1xuICAgIH1cblxuICAgIHByb21pc2UoKTogUHJvbWlzZTxUPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2VfO1xuICAgIH1cbn1cbiIsImltcG9ydCB7U2ltcGxlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgU3RpY2tlciB7XG4gICAgc2xvdDogbnVtYmVyO1xuICAgIHN0aWNrZXJJZDogbnVtYmVyO1xuICAgIGNvZGVuYW1lPzogc3RyaW5nO1xuICAgIG1hdGVyaWFsPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgd2Vhcj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJdGVtSW5mbyB7XG4gICAgc3RpY2tlcnM6IFN0aWNrZXJbXTtcbiAgICBpdGVtaWQ6IHN0cmluZztcbiAgICBkZWZpbmRleDogbnVtYmVyO1xuICAgIHBhaW50aW5kZXg6IG51bWJlcjtcbiAgICByYXJpdHk6IG51bWJlcjtcbiAgICBxdWFsaXR5OiBudW1iZXI7XG4gICAgcGFpbnRzZWVkOiBudW1iZXI7XG4gICAgaW52ZW50b3J5OiBudW1iZXI7XG4gICAgb3JpZ2luOiBudW1iZXI7XG4gICAgczogc3RyaW5nO1xuICAgIGE6IHN0cmluZztcbiAgICBkOiBzdHJpbmc7XG4gICAgbTogc3RyaW5nO1xuICAgIGZsb2F0dmFsdWU6IG51bWJlcjtcbiAgICBpbWFnZXVybDogc3RyaW5nO1xuICAgIG1pbjogbnVtYmVyO1xuICAgIG1heDogbnVtYmVyO1xuICAgIHdlYXBvbl90eXBlPzogc3RyaW5nO1xuICAgIGl0ZW1fbmFtZT86IHN0cmluZztcbiAgICByYXJpdHlfbmFtZT86IHN0cmluZztcbiAgICBxdWFsaXR5X25hbWU/OiBzdHJpbmc7XG4gICAgb3JpZ2luX25hbWU/OiBzdHJpbmc7XG4gICAgd2Vhcl9uYW1lPzogc3RyaW5nO1xuICAgIGZ1bGxfaXRlbV9uYW1lPzogc3RyaW5nO1xuICAgIGxvd19yYW5rPzogbnVtYmVyO1xuICAgIGhpZ2hfcmFuaz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEluc3BlY3RJbmZvUmVxdWVzdCB7XG4gICAgbGluazogc3RyaW5nO1xuICAgIGxpc3RQcmljZT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEluc3BlY3RJbmZvUmVzcG9uc2Uge1xuICAgIGl0ZW1pbmZvOiBJdGVtSW5mbztcbiAgICBlcnJvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEZldGNoSW5zcGVjdEluZm8gPSBuZXcgU2ltcGxlSGFuZGxlcjxGZXRjaEluc3BlY3RJbmZvUmVxdWVzdCwgRmV0Y2hJbnNwZWN0SW5mb1Jlc3BvbnNlPihcbiAgICBSZXF1ZXN0VHlwZS5GRVRDSF9JTlNQRUNUX0lORk8sXG4gICAgKHJlcSkgPT4ge1xuICAgICAgICBjb25zdCBhcGlVcmwgPSBgaHR0cHM6Ly9hcGkuY3NmbG9hdC5jb20vP3VybD0ke3JlcS5saW5rfSZtaW5pbWFsPXRydWUke1xuICAgICAgICAgICAgcmVxLmxpc3RQcmljZSA/ICcmbGlzdFByaWNlPScgKyByZXEubGlzdFByaWNlIDogJydcbiAgICAgICAgfWA7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVcmwpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXNwLmpzb24oKS50aGVuKChqc29uOiBGZXRjaEluc3BlY3RJbmZvUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5vaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihqc29uLmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSBhcyBQcm9taXNlPEZldGNoSW5zcGVjdEluZm9SZXNwb25zZT47XG4gICAgICAgIH0pO1xuICAgIH1cbik7XG4iLCJpbXBvcnQge3JnQXNzZXR9IGZyb20gJy4uL3R5cGVzL3N0ZWFtJztcbmltcG9ydCB7SXRlbUluZm99IGZyb20gJy4uL2JyaWRnZS9oYW5kbGVycy9mZXRjaF9pbnNwZWN0X2luZm8nO1xuaW1wb3J0IHtnZXREb3BwbGVyUGhhc2UsIGhhc0RvcHBsZXJQaGFzZX0gZnJvbSAnLi9kb3BwbGVycyc7XG5pbXBvcnQge2h0bWwsIFRlbXBsYXRlUmVzdWx0fSBmcm9tICdsaXQnO1xuaW1wb3J0IHtBY2lkRmFkZUNhbGN1bGF0b3IsIEFtYmVyRmFkZUNhbGN1bGF0b3IsIEZhZGVDYWxjdWxhdG9yfSBmcm9tICdjc2dvLWZhZGUtcGVyY2VudGFnZS1jYWxjdWxhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlRnJvbVdlYXIod2VhcjogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICAgIGNvbnN0IHdlYXJSYW5nZXM6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtcbiAgICAgICAgWzAuMCwgMC4wN10sXG4gICAgICAgIFswLjA3LCAwLjE1XSxcbiAgICAgICAgWzAuMTUsIDAuMzhdLFxuICAgICAgICBbMC4zOCwgMC40NV0sXG4gICAgICAgIFswLjQ1LCAxLjBdLFxuICAgIF07XG5cbiAgICBmb3IgKGNvbnN0IHJhbmdlIG9mIHdlYXJSYW5nZXMpIHtcbiAgICAgICAgaWYgKHdlYXIgPiByYW5nZVswXSAmJiB3ZWFyIDw9IHJhbmdlWzFdKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvd2VzdFJhbmsoaW5mbzogSXRlbUluZm8pOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGlmICghaW5mby5sb3dfcmFuayAmJiAhaW5mby5oaWdoX3JhbmspIHtcbiAgICAgICAgLy8gSXRlbSBoYXMgbm8gcmFuayB0byByZXR1cm5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiAoaW5mby5sb3dfcmFuayB8fCAxMDAxKSA8IChpbmZvLmhpZ2hfcmFuayB8fCAxMDAxKSA/IGluZm8ubG93X3JhbmsgOiBpbmZvLmhpZ2hfcmFuaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmFuayhpbmZvOiBJdGVtSW5mbyk6IHtvcmRlcjogT3JkZXJUeXBlOyByYW5rOiBudW1iZXJ9IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCByYW5rID0gZ2V0TG93ZXN0UmFuayhpbmZvKTtcbiAgICBpZiAocmFuayAmJiByYW5rIDw9IDEwMDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9yZGVyOiByYW5rID09PSBpbmZvLmxvd19yYW5rID8gT3JkZXJUeXBlLkxPV19SQU5LIDogT3JkZXJUeXBlLkhJR0hfUkFOSyxcbiAgICAgICAgICAgIHJhbmssXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RmxvYXRXaXRoUmFuayhpbmZvOiBJdGVtSW5mbywgcHJlY2lzaW9uRGlnaXRzID0gMTQpOiBzdHJpbmcge1xuICAgIGxldCByID0gaW5mby5mbG9hdHZhbHVlLnRvRml4ZWQocHJlY2lzaW9uRGlnaXRzKTtcblxuICAgIGNvbnN0IHJhbmtlZCA9IHBhcnNlUmFuayhpbmZvKTtcbiAgICBpZiAocmFua2VkKSB7XG4gICAgICAgIHIgKz0gYCAoIyR7cmFua2VkLnJhbmt9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRTZWVkKGluZm86IEl0ZW1JbmZvKTogc3RyaW5nIHtcbiAgICBsZXQgciA9IGluZm8ucGFpbnRzZWVkLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAoaGFzRG9wcGxlclBoYXNlKGluZm8ucGFpbnRpbmRleCkpIHtcbiAgICAgICAgciArPSBgICgke2dldERvcHBsZXJQaGFzZShpbmZvLnBhaW50aW5kZXgpfSlgO1xuICAgIH1cblxuICAgIHJldHVybiByO1xufVxuXG5lbnVtIE9yZGVyVHlwZSB7XG4gICAgTE9XX1JBTksgPSAxLFxuICAgIEhJR0hfUkFOSyA9IC0xLFxufVxuXG4vKipcbiAqIEdldHMgZm9ybWF0dGVkIGxpbmsgZm9yIGZsb2F0ZGIgZm9yIHRoZSBzcGVjaWZpZWQgaXRlbSB0eXBlIGFuZCBvcmRlclxuICogQHBhcmFtIGluZm8gaXRlbSBwcm9wZXJ0aWVzIGRpY3RcbiAqIEBwYXJhbSBvcmRlciAxIGZvciBsb3cgZmxvYXQsIC0xIGZvciBoaWdoIGZsb2F0IG9yZGVyaW5nXG4gKi9cbmZ1bmN0aW9uIGdldEZsb2F0RGJMaW5rKGluZm86IEl0ZW1JbmZvLCBvcmRlcjogT3JkZXJUeXBlKTogc3RyaW5nIHtcbiAgICBmdW5jdGlvbiBnZXRGbG9hdERiQ2F0ZWdvcnkoaXRlbTogSXRlbUluZm8pOiBudW1iZXIge1xuICAgICAgICBpZiAoaXRlbS5mdWxsX2l0ZW1fbmFtZT8uaW5jbHVkZXMoJ1N0YXRUcmFrJykpIHtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uZnVsbF9pdGVtX25hbWU/LmluY2x1ZGVzKCdTb3V2ZW5pcicpKSB7XG4gICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFwiTm9ybWFsXCJcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGBodHRwczovL2NzZmxvYXQuY29tL2RiP2RlZkluZGV4PSR7aW5mby5kZWZpbmRleH0mcGFpbnRJbmRleD0ke1xuICAgICAgICBpbmZvLnBhaW50aW5kZXhcbiAgICB9Jm9yZGVyPSR7b3JkZXJ9JmNhdGVnb3J5PSR7Z2V0RmxvYXREYkNhdGVnb3J5KGluZm8pfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJDbGlja2FibGVSYW5rKGluZm86IEl0ZW1JbmZvKTogVGVtcGxhdGVSZXN1bHQ8MT4ge1xuICAgIGNvbnN0IHBhcnNlZFJhbmsgPSBwYXJzZVJhbmsoaW5mbyk7XG4gICAgaWYgKCFwYXJzZWRSYW5rKSB7XG4gICAgICAgIHJldHVybiBodG1sYGA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh0bWxgIDxhXG4gICAgICAgIHN0eWxlPVwiY29sb3I6ICNlYmViZWI7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgY3Vyc29yOiBwb2ludGVyO1wiXG4gICAgICAgIGhyZWY9XCIke2dldEZsb2F0RGJMaW5rKGluZm8sIHBhcnNlZFJhbmsub3JkZXIpfVwiXG4gICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgPlxuICAgICAgICAoUmFuayAjJHtwYXJzZWRSYW5rLnJhbmt9KVxuICAgIDwvYT5gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTa2luKGFzc2V0OiByZ0Fzc2V0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGFzc2V0LnRhZ3NcbiAgICAgICAgPyBhc3NldC50YWdzLnNvbWUoKGEpID0+IGEuY2F0ZWdvcnkgPT09ICdXZWFwb24nIHx8IChhLmNhdGVnb3J5ID09PSAnVHlwZScgJiYgYS5pbnRlcm5hbF9uYW1lID09PSAnVHlwZV9IYW5kcycpKVxuICAgICAgICA6IFsn4piFJywgJ0ZhY3RvcnkgTmV3JywgJ01pbmltYWwgV2VhcicsICdGaWVsZC1UZXN0ZWQnLCAnV2VsbC1Xb3JuJywgJ0JhdHRsZS1TY2FycmVkJ10uc29tZSgoa2V5d29yZCkgPT5cbiAgICAgICAgICAgICAgYXNzZXQubWFya2V0X2hhc2hfbmFtZS5pbmNsdWRlcyhrZXl3b3JkKVxuICAgICAgICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGYWRlQ2FsY3VsYXRvckFuZFN1cHBvcnRlZFdlYXBvbihcbiAgICBhc3NldDogcmdBc3NldFxuKTogW3R5cGVvZiBGYWRlQ2FsY3VsYXRvciB8IHR5cGVvZiBBY2lkRmFkZUNhbGN1bGF0b3IgfCB0eXBlb2YgQW1iZXJGYWRlQ2FsY3VsYXRvciwgc3RyaW5nXSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgRkFERV9UWVBFX1RPX0NBTENVTEFUT1IgPSB7XG4gICAgICAgIEZhZGU6IEZhZGVDYWxjdWxhdG9yLFxuICAgICAgICAnQWNpZCBGYWRlJzogQWNpZEZhZGVDYWxjdWxhdG9yLFxuICAgICAgICAnQW1iZXIgRmFkZSc6IEFtYmVyRmFkZUNhbGN1bGF0b3IsXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgW2ZhZGVUeXBlLCBjYWxjdWxhdG9yXSBvZiBPYmplY3QuZW50cmllcyhGQURFX1RZUEVfVE9fQ0FMQ1VMQVRPUikpIHtcbiAgICAgICAgZm9yIChjb25zdCBzdXBwb3J0ZWRXZWFwb24gb2YgY2FsY3VsYXRvci5nZXRTdXBwb3J0ZWRXZWFwb25zKCkpIHtcbiAgICAgICAgICAgIGlmIChhc3NldC5tYXJrZXRfaGFzaF9uYW1lLmluY2x1ZGVzKGAke3N1cHBvcnRlZFdlYXBvbn0gfCAke2ZhZGVUeXBlfWApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtjYWxjdWxhdG9yLCBzdXBwb3J0ZWRXZWFwb24udG9TdHJpbmcoKV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGYWRlUGVyY2VudGFnZShhc3NldDogcmdBc3NldCwgaXRlbUluZm86IEl0ZW1JbmZvKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBmYWRlQ2FsY3VsYXRvckFuZFN1cHBvcnRlZFdlYXBvbiA9IGdldEZhZGVDYWxjdWxhdG9yQW5kU3VwcG9ydGVkV2VhcG9uKGFzc2V0KTtcblxuICAgIGlmIChmYWRlQ2FsY3VsYXRvckFuZFN1cHBvcnRlZFdlYXBvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IFtjYWxjdWxhdG9yLCBzdXBwb3J0ZWRXZWFwb25dID0gZmFkZUNhbGN1bGF0b3JBbmRTdXBwb3J0ZWRXZWFwb247XG5cbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0b3IuZ2V0RmFkZVBlcmNlbnRhZ2Uoc3VwcG9ydGVkV2VhcG9uLCBpdGVtSW5mby5wYWludHNlZWQpLnBlcmNlbnRhZ2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxvb3IobjogbnVtYmVyLCBwcmVjaXNpb24/OiBudW1iZXIpIHtcbiAgICBjb25zdCBwID0gMTAgKiogKHByZWNpc2lvbiB8fCAwKTtcblxuICAgIHJldHVybiBNYXRoLmZsb29yKG4gKiBwKSAvIHA7XG59XG4iLCJjb25zdCBkb3BwbGVyUGhhc2VzOiB7W3BhaW50SW5kZXg6IG51bWJlcl06IHN0cmluZ30gPSB7XG4gICAgNDE4OiAnUGhhc2UgMScsXG4gICAgNDE5OiAnUGhhc2UgMicsXG4gICAgNDIwOiAnUGhhc2UgMycsXG4gICAgNDIxOiAnUGhhc2UgNCcsXG4gICAgNDE1OiAnUnVieScsXG4gICAgNDE2OiAnU2FwcGhpcmUnLFxuICAgIDQxNzogJ0JsYWNrIFBlYXJsJyxcbiAgICA1Njk6ICdQaGFzZSAxJyxcbiAgICA1NzA6ICdQaGFzZSAyJyxcbiAgICA1NzE6ICdQaGFzZSAzJyxcbiAgICA1NzI6ICdQaGFzZSA0JyxcbiAgICA1Njg6ICdFbWVyYWxkJyxcbiAgICA2MTg6ICdQaGFzZSAyJyxcbiAgICA2MTk6ICdTYXBwaGlyZScsXG4gICAgNjE3OiAnQmxhY2sgUGVhcmwnLFxuICAgIDg1MjogJ1BoYXNlIDEnLFxuICAgIDg1MzogJ1BoYXNlIDInLFxuICAgIDg1NDogJ1BoYXNlIDMnLFxuICAgIDg1NTogJ1BoYXNlIDQnLFxuICAgIDExMTk6ICdFbWVyYWxkJyxcbiAgICAxMTIwOiAnUGhhc2UgMScsXG4gICAgMTEyMTogJ1BoYXNlIDInLFxuICAgIDExMjI6ICdQaGFzZSAzJyxcbiAgICAxMTIzOiAnUGhhc2UgNCcsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzRG9wcGxlclBoYXNlKHBhaW50SW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiBwYWludEluZGV4IGluIGRvcHBsZXJQaGFzZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREb3BwbGVyUGhhc2UocGFpbnRJbmRleDogbnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gZG9wcGxlclBoYXNlc1twYWludEluZGV4XTtcbn1cbiIsImltcG9ydCBGYWRlQ2FsY3VsYXRvck1vZHVsZSBmcm9tICcuL21vZHVsZXMvRmFkZUNhbGN1bGF0b3InO1xuaW1wb3J0IEFtYmVyRmFkZUNhbGN1bGF0b3JNb2R1bGUgZnJvbSAnLi9tb2R1bGVzL0FtYmVyRmFkZUNhbGN1bGF0b3InO1xuaW1wb3J0IEFjaWRGYWRlQ2FsY3VsYXRvck1vZHVsZSBmcm9tICcuL21vZHVsZXMvQWNpZEZhZGVDYWxjdWxhdG9yJztcbmV4cG9ydCBjb25zdCBGYWRlQ2FsY3VsYXRvciA9IG5ldyBGYWRlQ2FsY3VsYXRvck1vZHVsZSgpO1xuZXhwb3J0IGNvbnN0IEFtYmVyRmFkZUNhbGN1bGF0b3IgPSBuZXcgQW1iZXJGYWRlQ2FsY3VsYXRvck1vZHVsZSgpO1xuZXhwb3J0IGNvbnN0IEFjaWRGYWRlQ2FsY3VsYXRvciA9IG5ldyBBY2lkRmFkZUNhbGN1bGF0b3JNb2R1bGUoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCBCYXNlQ2FsY3VsYXRvciBmcm9tICcuL0Jhc2VDYWxjdWxhdG9yJztcbmNsYXNzIEZhZGVDYWxjdWxhdG9yIGV4dGVuZHMgQmFzZUNhbGN1bGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLndlYXBvbnMgPSBbXG4gICAgICAgICAgICAnQVdQJyxcbiAgICAgICAgICAgICdCYXlvbmV0JyxcbiAgICAgICAgICAgICdCb3dpZSBLbmlmZScsXG4gICAgICAgICAgICAnQnV0dGVyZmx5IEtuaWZlJyxcbiAgICAgICAgICAgICdDbGFzc2ljIEtuaWZlJyxcbiAgICAgICAgICAgICdGYWxjaGlvbiBLbmlmZScsXG4gICAgICAgICAgICAnRmxpcCBLbmlmZScsXG4gICAgICAgICAgICAnR2xvY2stMTgnLFxuICAgICAgICAgICAgJ0d1dCBLbmlmZScsXG4gICAgICAgICAgICAnSHVudHNtYW4gS25pZmUnLFxuICAgICAgICAgICAgJ0thcmFtYml0JyxcbiAgICAgICAgICAgICdNOSBCYXlvbmV0JyxcbiAgICAgICAgICAgICdNQUMtMTAnLFxuICAgICAgICAgICAgJ01QNycsXG4gICAgICAgICAgICAnTmF2YWphIEtuaWZlJyxcbiAgICAgICAgICAgICdOb21hZCBLbmlmZScsXG4gICAgICAgICAgICAnUGFyYWNvcmQgS25pZmUnLFxuICAgICAgICAgICAgJ1I4IFJldm9sdmVyJyxcbiAgICAgICAgICAgICdTaGFkb3cgRGFnZ2VycycsXG4gICAgICAgICAgICAnU2tlbGV0b24gS25pZmUnLFxuICAgICAgICAgICAgJ1N0aWxldHRvIEtuaWZlJyxcbiAgICAgICAgICAgICdTdXJ2aXZhbCBLbmlmZScsXG4gICAgICAgICAgICAnVGFsb24gS25pZmUnLFxuICAgICAgICAgICAgJ1VNUC00NScsXG4gICAgICAgICAgICAnVXJzdXMgS25pZmUnLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnJldmVyc2VkV2VhcG9ucyA9IFtcbiAgICAgICAgICAgICdBV1AnLFxuICAgICAgICAgICAgJ0thcmFtYml0JyxcbiAgICAgICAgICAgICdUYWxvbiBLbmlmZScsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMudHJhZGVVcFdlYXBvbnMgPSBbXG4gICAgICAgICAgICAnQVdQJyxcbiAgICAgICAgICAgICdHbG9jay0xOCcsXG4gICAgICAgICAgICAnTUFDLTEwJyxcbiAgICAgICAgICAgICdNUDcnLFxuICAgICAgICAgICAgJ1I4IFJldm9sdmVyJyxcbiAgICAgICAgICAgICdVTVAtNDUnLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmNvbmZpZ3MgPSB7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeF9zdGFydDogLTAuNyxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF94X2VuZDogLTAuNyxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF95X3N0YXJ0OiAtMC43LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3lfZW5kOiAtMC43LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fcm90YXRlX3N0YXJ0OiAtNTUsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9yb3RhdGVfZW5kOiAtNjUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgTVA3OiB7XG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeF9zdGFydDogLTAuOSxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF94X2VuZDogLTAuMyxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF95X3N0YXJ0OiAtMC43LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3lfZW5kOiAtMC41LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fcm90YXRlX3N0YXJ0OiAtNTUsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9yb3RhdGVfZW5kOiAtNjUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEZhZGVDYWxjdWxhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmFkZUNhbGN1bGF0b3IuanMubWFwIiwiaW1wb3J0IFJhbmRvbU51bWJlckdlbmVyYXRvciBmcm9tICcuL1JhbmRvbU51bWJlckdlbmVyYXRvcic7XG5jbGFzcyBCYXNlQ2FsY3VsYXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWluUGVyY2VudGFnZSA9IDgwO1xuICAgIH1cbiAgICBnZXRTdXBwb3J0ZWRXZWFwb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWFwb25zO1xuICAgIH1cbiAgICBnZXRGYWRlUGVyY2VudGFnZSh3ZWFwb24sIHNlZWQpIHtcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZXMgPSB0aGlzLmdldEZhZGVQZXJjZW50YWdlcyh3ZWFwb24pO1xuICAgICAgICByZXR1cm4gcGVyY2VudGFnZXNbc2VlZF07XG4gICAgfVxuICAgIGdldEFsbEZhZGVQZXJjZW50YWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2VhcG9ucy5tYXAoKHdlYXBvbikgPT4gKHtcbiAgICAgICAgICAgIHdlYXBvbixcbiAgICAgICAgICAgIHBlcmNlbnRhZ2VzOiB0aGlzLmdldEZhZGVQZXJjZW50YWdlcyh3ZWFwb24pLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGdldEZhZGVQZXJjZW50YWdlcyh3ZWFwb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLndlYXBvbnMuaW5jbHVkZXMod2VhcG9uKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgd2VhcG9uIFwiJHt3ZWFwb259XCIgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWdzW3dlYXBvbl0gfHwgdGhpcy5jb25maWdzLmRlZmF1bHQ7XG4gICAgICAgIGNvbnN0IHJhd1Jlc3VsdHMgPSBbXTtcbiAgICAgICAgY29uc3QgbWF4U2VlZCA9IHRoaXMudHJhZGVVcFdlYXBvbnMuaW5jbHVkZXMod2VhcG9uKVxuICAgICAgICAgICAgPyAxMDAwXG4gICAgICAgICAgICA6IDk5OTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbWF4U2VlZDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCByYW5kb21OdW1iZXJHZW5lcmF0b3IgPSBuZXcgUmFuZG9tTnVtYmVyR2VuZXJhdG9yKCk7XG4gICAgICAgICAgICByYW5kb21OdW1iZXJHZW5lcmF0b3Iuc2V0U2VlZChpKTtcbiAgICAgICAgICAgIGNvbnN0IHhPZmZzZXQgPSByYW5kb21OdW1iZXJHZW5lcmF0b3IucmFuZG9tRmxvYXQoY29uZmlnLnBhdHRlcm5fb2Zmc2V0X3hfc3RhcnQsIGNvbmZpZy5wYXR0ZXJuX29mZnNldF94X2VuZCk7XG4gICAgICAgICAgICByYW5kb21OdW1iZXJHZW5lcmF0b3IucmFuZG9tRmxvYXQoY29uZmlnLnBhdHRlcm5fb2Zmc2V0X3lfc3RhcnQsIGNvbmZpZy5wYXR0ZXJuX29mZnNldF95X2VuZCk7XG4gICAgICAgICAgICBjb25zdCByb3RhdGlvbiA9IHJhbmRvbU51bWJlckdlbmVyYXRvci5yYW5kb21GbG9hdChjb25maWcucGF0dGVybl9yb3RhdGVfc3RhcnQsIGNvbmZpZy5wYXR0ZXJuX3JvdGF0ZV9lbmQpO1xuICAgICAgICAgICAgbGV0IHJhd1Jlc3VsdDtcbiAgICAgICAgICAgIGlmIChjb25maWcucGF0dGVybl9vZmZzZXRfeF9zdGFydCAhPT0gY29uZmlnLnBhdHRlcm5fb2Zmc2V0X3hfZW5kKSB7XG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0ID0gcm90YXRpb24gKiB4T2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0ID0gcm90YXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYXdSZXN1bHRzLnB1c2goTWF0aC5hYnMocmF3UmVzdWx0KSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNSZXZlcnNlZCA9IHRoaXMucmV2ZXJzZWRXZWFwb25zLmluY2x1ZGVzKHdlYXBvbik7XG4gICAgICAgIGxldCBiZXN0UmVzdWx0O1xuICAgICAgICBsZXQgd29yc3RSZXN1bHQ7XG4gICAgICAgIGlmIChpc1JldmVyc2VkKSB7XG4gICAgICAgICAgICBiZXN0UmVzdWx0ID0gTWF0aC5tYXgoLi4ucmF3UmVzdWx0cyk7XG4gICAgICAgICAgICB3b3JzdFJlc3VsdCA9IE1hdGgubWluKC4uLnJhd1Jlc3VsdHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYmVzdFJlc3VsdCA9IE1hdGgubWluKC4uLnJhd1Jlc3VsdHMpO1xuICAgICAgICAgICAgd29yc3RSZXN1bHQgPSBNYXRoLm1heCguLi5yYXdSZXN1bHRzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHRSYW5nZSA9IHdvcnN0UmVzdWx0IC0gYmVzdFJlc3VsdDtcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZVJlc3VsdHMgPSByYXdSZXN1bHRzLm1hcCgocmF3UmVzdWx0KSA9PiAod29yc3RSZXN1bHQgLSByYXdSZXN1bHQpIC8gcmVzdWx0UmFuZ2UpO1xuICAgICAgICBjb25zdCBzb3J0ZWRQZXJjZW50YWdlUmVzdWx0cyA9IFsuLi5wZXJjZW50YWdlUmVzdWx0c10uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICByZXR1cm4gcGVyY2VudGFnZVJlc3VsdHMubWFwKChwZXJjZW50YWdlUmVzdWx0LCBpKSA9PiAoe1xuICAgICAgICAgICAgc2VlZDogaSxcbiAgICAgICAgICAgIHBlcmNlbnRhZ2U6IHRoaXMubWluUGVyY2VudGFnZSArIChwZXJjZW50YWdlUmVzdWx0ICogKDEwMCAtIHRoaXMubWluUGVyY2VudGFnZSkpLFxuICAgICAgICAgICAgcmFua2luZzogTWF0aC5taW4oc29ydGVkUGVyY2VudGFnZVJlc3VsdHMuaW5kZXhPZihwZXJjZW50YWdlUmVzdWx0KSArIDEsIHNvcnRlZFBlcmNlbnRhZ2VSZXN1bHRzLmxlbmd0aCAtIHNvcnRlZFBlcmNlbnRhZ2VSZXN1bHRzLmluZGV4T2YocGVyY2VudGFnZVJlc3VsdCkpLFxuICAgICAgICB9KSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQmFzZUNhbGN1bGF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CYXNlQ2FsY3VsYXRvci5qcy5tYXAiLCJjbGFzcyBSYW5kb21OdW1iZXJHZW5lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm1JZHVtID0gMDtcbiAgICAgICAgdGhpcy5tSXkgPSAwO1xuICAgICAgICB0aGlzLm1JdiA9IFtdO1xuICAgICAgICB0aGlzLk5UQUIgPSAzMjtcbiAgICAgICAgdGhpcy5JQSA9IDE2ODA3O1xuICAgICAgICB0aGlzLklNID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5JUSA9IDEyNzc3MztcbiAgICAgICAgdGhpcy5JUiA9IDI4MzY7XG4gICAgICAgIHRoaXMuTkRJViA9IDEgKyAodGhpcy5JTSAtIDEpIC8gdGhpcy5OVEFCO1xuICAgICAgICB0aGlzLkFNID0gMS4wIC8gdGhpcy5JTTtcbiAgICAgICAgdGhpcy5STk1YID0gMS4wIC0gMS4yZS03O1xuICAgIH1cbiAgICBzZXRTZWVkKHNlZWQpIHtcbiAgICAgICAgdGhpcy5tSWR1bSA9IHNlZWQ7XG4gICAgICAgIGlmIChzZWVkID49IDApIHtcbiAgICAgICAgICAgIHRoaXMubUlkdW0gPSAtc2VlZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1JeSA9IDA7XG4gICAgfVxuICAgIGdlbmVyYXRlUmFuZG9tTnVtYmVyKCkge1xuICAgICAgICBsZXQgaztcbiAgICAgICAgbGV0IGo7XG4gICAgICAgIGlmICh0aGlzLm1JZHVtIDw9IDAgfHwgdGhpcy5tSXkgPT09IDApIHtcbiAgICAgICAgICAgIGlmICgtdGhpcy5tSWR1bSA8IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1JZHVtID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubUlkdW0gPSAtdGhpcy5tSWR1bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaiA9IHRoaXMuTlRBQiArIDc7IGogPj0gMDsgaiAtPSAxKSB7XG4gICAgICAgICAgICAgICAgayA9IE1hdGguZmxvb3IodGhpcy5tSWR1bSAvIHRoaXMuSVEpO1xuICAgICAgICAgICAgICAgIHRoaXMubUlkdW0gPSBNYXRoLmZsb29yKHRoaXMuSUEgKiAodGhpcy5tSWR1bSAtIGsgKiB0aGlzLklRKSAtIHRoaXMuSVIgKiBrKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tSWR1bSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tSWR1bSArPSB0aGlzLklNO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaiA8IHRoaXMuTlRBQikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1JdltqXSA9IHRoaXMubUlkdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgW3RoaXMubUl5XSA9IHRoaXMubUl2O1xuICAgICAgICB9XG4gICAgICAgIGsgPSBNYXRoLmZsb29yKHRoaXMubUlkdW0gLyB0aGlzLklRKTtcbiAgICAgICAgdGhpcy5tSWR1bSA9IE1hdGguZmxvb3IodGhpcy5JQSAqICh0aGlzLm1JZHVtIC0gayAqIHRoaXMuSVEpIC0gdGhpcy5JUiAqIGspO1xuICAgICAgICBpZiAodGhpcy5tSWR1bSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubUlkdW0gKz0gdGhpcy5JTTtcbiAgICAgICAgfVxuICAgICAgICBqID0gTWF0aC5mbG9vcih0aGlzLm1JeSAvIHRoaXMuTkRJVik7XG4gICAgICAgIHRoaXMubUl5ID0gTWF0aC5mbG9vcih0aGlzLm1JdltqXSk7XG4gICAgICAgIHRoaXMubUl2W2pdID0gdGhpcy5tSWR1bTtcbiAgICAgICAgcmV0dXJuIHRoaXMubUl5O1xuICAgIH1cbiAgICByYW5kb21GbG9hdChsb3csIGhpZ2gpIHtcbiAgICAgICAgbGV0IGZsb2F0ID0gdGhpcy5BTSAqIHRoaXMuZ2VuZXJhdGVSYW5kb21OdW1iZXIoKTtcbiAgICAgICAgaWYgKGZsb2F0ID4gdGhpcy5STk1YKSB7XG4gICAgICAgICAgICBmbG9hdCA9IHRoaXMuUk5NWDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGZsb2F0ICogKGhpZ2ggLSBsb3cpKSArIGxvdztcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBSYW5kb21OdW1iZXJHZW5lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SYW5kb21OdW1iZXJHZW5lcmF0b3IuanMubWFwIiwiaW1wb3J0IEJhc2VDYWxjdWxhdG9yIGZyb20gJy4vQmFzZUNhbGN1bGF0b3InO1xuY2xhc3MgQW1iZXJGYWRlQ2FsY3VsYXRvciBleHRlbmRzIEJhc2VDYWxjdWxhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy53ZWFwb25zID0gW1xuICAgICAgICAgICAgJ0FVRycsXG4gICAgICAgICAgICAnR2FsaWwgQVInLFxuICAgICAgICAgICAgJ01BQy0xMCcsXG4gICAgICAgICAgICAnUDIwMDAnLFxuICAgICAgICAgICAgJ1I4IFJldm9sdmVyJyxcbiAgICAgICAgICAgICdTYXdlZC1PZmYnLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnJldmVyc2VkV2VhcG9ucyA9IFtdO1xuICAgICAgICB0aGlzLnRyYWRlVXBXZWFwb25zID0gW1xuICAgICAgICAgICAgJ0FVRycsXG4gICAgICAgICAgICAnR2FsaWwgQVInLFxuICAgICAgICAgICAgJ01BQy0xMCcsXG4gICAgICAgICAgICAnUDIwMDAnLFxuICAgICAgICAgICAgJ1I4IFJldm9sdmVyJyxcbiAgICAgICAgICAgICdTYXdlZC1PZmYnLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmNvbmZpZ3MgPSB7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeF9zdGFydDogLTAuNyxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF94X2VuZDogLTAuNyxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF95X3N0YXJ0OiAtMC43LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3lfZW5kOiAtMC43LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fcm90YXRlX3N0YXJ0OiAtNTUsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9yb3RhdGVfZW5kOiAtNjUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFtYmVyRmFkZUNhbGN1bGF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BbWJlckZhZGVDYWxjdWxhdG9yLmpzLm1hcCIsImltcG9ydCBCYXNlQ2FsY3VsYXRvciBmcm9tICcuL0Jhc2VDYWxjdWxhdG9yJztcbmNsYXNzIEFjaWRGYWRlQ2FsY3VsYXRvciBleHRlbmRzIEJhc2VDYWxjdWxhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy53ZWFwb25zID0gW1xuICAgICAgICAgICAgJ1NTRyAwOCcsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMucmV2ZXJzZWRXZWFwb25zID0gW107XG4gICAgICAgIHRoaXMudHJhZGVVcFdlYXBvbnMgPSBbXG4gICAgICAgICAgICAnU1NHIDA4JyxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jb25maWdzID0ge1xuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3hfc3RhcnQ6IC0yLjQsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeF9lbmQ6IC0yLjEsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeV9zdGFydDogMC4wLFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3lfZW5kOiAwLjAsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9yb3RhdGVfc3RhcnQ6IC01NSxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX3JvdGF0ZV9lbmQ6IC02NSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQWNpZEZhZGVDYWxjdWxhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWNpZEZhZGVDYWxjdWxhdG9yLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBnZXRSYW5rQ29sb3VyKHJhbms6IG51bWJlcikge1xuICAgIHN3aXRjaCAocmFuaykge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gJyNjM2E1MDgnO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiAnIzlhOTk5OSc7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgcmV0dXJuICcjOGE1OTI5JztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gT2JzZXJ2ZTxUPihjb21wdXRlT2JqZWN0OiAoKSA9PiBULCBjYjogKCkgPT4gYW55LCBwb2xsUmF0ZU1zID0gNTApIHtcbiAgICBsZXQgcHJldiA9IGNvbXB1dGVPYmplY3QoKTtcblxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm93ID0gY29tcHV0ZU9iamVjdCgpO1xuICAgICAgICBpZiAocHJldiAhPT0gbm93KSB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIHByZXYgPSBub3c7XG4gICAgfSwgcG9sbFJhdGVNcyk7XG59XG4iLCJpbXBvcnQge0Zsb2F0RWxlbWVudH0gZnJvbSAnLi4vY3VzdG9tJztcbmltcG9ydCB7Q3VzdG9tRWxlbWVudCwgSW5qZWN0QWZ0ZXIsIEluamVjdGlvbk1vZGV9IGZyb20gJy4uL2luamVjdG9ycyc7XG5pbXBvcnQge2h0bWwsIGNzcywgVGVtcGxhdGVSZXN1bHQsIEhUTUxUZW1wbGF0ZVJlc3VsdCwgbm90aGluZ30gZnJvbSAnbGl0JztcbmltcG9ydCB7c3RhdGV9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcbmltcG9ydCB7SW52ZW50b3J5QXNzZXR9IGZyb20gJy4uLy4uL3R5cGVzL3N0ZWFtJztcbmltcG9ydCB7Z0Zsb2F0RmV0Y2hlcn0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmxvYXRfZmV0Y2hlcic7XG5pbXBvcnQge0l0ZW1JbmZvfSBmcm9tICcuLi8uLi9icmlkZ2UvaGFuZGxlcnMvZmV0Y2hfaW5zcGVjdF9pbmZvJztcbmltcG9ydCB7Zm9ybWF0U2VlZCwgZ2V0RmFkZVBlcmNlbnRhZ2UsIGlzU2tpbiwgcmVuZGVyQ2xpY2thYmxlUmFuaywgZmxvb3J9IGZyb20gJy4uLy4uL3V0aWxzL3NraW4nO1xuaW1wb3J0IHtPYnNlcnZlfSBmcm9tICcuLi8uLi91dGlscy9vYnNlcnZlcnMnO1xuaW1wb3J0IHtGZXRjaFN0YWxsUmVzcG9uc2V9IGZyb20gJy4uLy4uL2JyaWRnZS9oYW5kbGVycy9mZXRjaF9zdGFsbCc7XG5pbXBvcnQge2dTdGFsbEZldGNoZXJ9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3N0YWxsX2ZldGNoZXInO1xuaW1wb3J0IHtDb250cmFjdH0gZnJvbSAnLi4vLi4vdHlwZXMvZmxvYXRfbWFya2V0JztcblxuLyoqXG4gKiBXaHkgZG8gd2UgYmluZCB0byBpdGVtaW5mbzAgQU5EIGl0ZW1pbmZvMT9cbiAqXG4gKiBTdGVhbSB1c2VzIHR3byBkaXZzIHRoYXQgYXJlIGludGVyY2hhbmdlZCAocHJlc3VtYWJseSB0byBtYWtlIGEgXCJmYWRlXCIgYW5pbWF0aW9uIGJldHdlZW4gdGhlbSkgZm9yIGVhY2ggc2VsZWN0ZWRcbiAqIGl0ZW0gY2xpY2suXG4gKi9cbkBDdXN0b21FbGVtZW50KClcbkBJbmplY3RBZnRlcignZGl2I2l0ZW1pbmZvMF9jb250ZW50IC5pdGVtX2Rlc2NfZGVzY3JpcHRpb24gZGl2Lml0ZW1fZGVzY19nYW1lX2luZm8nLCBJbmplY3Rpb25Nb2RlLkNPTlRJTlVPVVMpXG5ASW5qZWN0QWZ0ZXIoJ2RpdiNpdGVtaW5mbzFfY29udGVudCAuaXRlbV9kZXNjX2Rlc2NyaXB0aW9uIGRpdi5pdGVtX2Rlc2NfZ2FtZV9pbmZvJywgSW5qZWN0aW9uTW9kZS5DT05USU5VT1VTKVxuZXhwb3J0IGNsYXNzIFNlbGVjdGVkSXRlbUluZm8gZXh0ZW5kcyBGbG9hdEVsZW1lbnQge1xuICAgIHN0YXRpYyBzdHlsZXMgPSBbXG4gICAgICAgIC4uLkZsb2F0RWxlbWVudC5zdHlsZXMsXG4gICAgICAgIGNzc2BcbiAgICAgICAgICAgIC5jb250YWluZXIge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5tYXJrZXQtYnRuLWNvbnRhaW5lciB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMHB4IDAgMTBweCAwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgICAgICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggIzVhNWE1YSBzb2xpZDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzODM4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLm1hcmtldC1idG4ge1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNlYmViZWI7XG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICBgLFxuICAgIF07XG5cbiAgICBAc3RhdGUoKVxuICAgIHByaXZhdGUgaXRlbUluZm86IEl0ZW1JbmZvIHwgdW5kZWZpbmVkO1xuXG4gICAgQHN0YXRlKClcbiAgICBwcml2YXRlIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgc3RhbGw6IEZldGNoU3RhbGxSZXNwb25zZSB8IHVuZGVmaW5lZDtcblxuICAgIGdldCBhc3NldCgpOiBJbnZlbnRvcnlBc3NldCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBnX0FjdGl2ZUludmVudG9yeT8uc2VsZWN0ZWRJdGVtO1xuICAgIH1cblxuICAgIGdldCBpbnNwZWN0TGluaygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMuYXNzZXQpIHJldHVybjtcblxuICAgICAgICBpZiAoIXRoaXMuYXNzZXQuZGVzY3JpcHRpb24/LmFjdGlvbnMgfHwgdGhpcy5hc3NldC5kZXNjcmlwdGlvbj8uYWN0aW9ucz8ubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFnX0FjdGl2ZUludmVudG9yeT8ubV9vd25lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXNzZXQuZGVzY3JpcHRpb25cbiAgICAgICAgICAgID8uYWN0aW9ucyFbMF0ubGluay5yZXBsYWNlKCclb3duZXJfc3RlYW1pZCUnLCBnX0FjdGl2ZUludmVudG9yeS5tX293bmVyLnN0clN0ZWFtSWQhKVxuICAgICAgICAgICAgLnJlcGxhY2UoJyVhc3NldGlkJScsIHRoaXMuYXNzZXQuYXNzZXRpZCEpO1xuICAgIH1cblxuICAgIGdldCBzdGFsbExpc3RpbmcoKTogQ29udHJhY3QgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMuc3RhbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAodGhpcy5zdGFsbC5kYXRhIHx8IFtdKS5maW5kKChlKSA9PiBlLml0ZW0uYXNzZXRfaWQgPT09IHRoaXMuYXNzZXQ/LmFzc2V0aWQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW5kZXIoKTogSFRNTFRlbXBsYXRlUmVzdWx0IHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxgPGRpdj5Mb2FkaW5nLi4uPC9kaXY+YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5pdGVtSW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxgYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZhZGVQZXJjZW50YWdlID0gdGhpcy5hc3NldCAmJiBnZXRGYWRlUGVyY2VudGFnZSh0aGlzLmFzc2V0LmRlc2NyaXB0aW9uLCB0aGlzLml0ZW1JbmZvKTtcblxuICAgICAgICByZXR1cm4gaHRtbGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PkZsb2F0OiAke3RoaXMuaXRlbUluZm8uZmxvYXR2YWx1ZS50b0ZpeGVkKDE0KX0gJHtyZW5kZXJDbGlja2FibGVSYW5rKHRoaXMuaXRlbUluZm8pfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+UGFpbnQgU2VlZDogJHtmb3JtYXRTZWVkKHRoaXMuaXRlbUluZm8pfTwvZGl2PlxuICAgICAgICAgICAgICAgICR7ZmFkZVBlcmNlbnRhZ2UgIT09IHVuZGVmaW5lZCA/IGh0bWxgPGRpdj5GYWRlOiAke2Zsb29yKGZhZGVQZXJjZW50YWdlLCA1KX0lPC9kaXY+YCA6IG5vdGhpbmd9XG4gICAgICAgICAgICAgICAgJHt0aGlzLnJlbmRlckxpc3RPbkNTRmxvYXQoKX0gJHt0aGlzLnJlbmRlckZsb2F0TWFya2V0TGlzdGluZygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgcmVuZGVyRmxvYXRNYXJrZXRMaXN0aW5nKCk6IFRlbXBsYXRlUmVzdWx0PDE+IHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YWxsTGlzdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxgYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBodG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hcmtldC1idG4tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJtYXJrZXQtYnRuXCIgaHJlZj1cImh0dHBzOi8vY3NmbG9hdC5jb20vaXRlbS8ke3RoaXMuc3RhbGxMaXN0aW5nLmlkfVwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vY3NmbG9hdC5jb20vYXNzZXRzL25fZnVsbF9sb2dvLnBuZ1wiIGhlaWdodD1cIjIxXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDVweDtcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIExpc3RlZCBmb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIDxiPiQkeyh0aGlzLnN0YWxsTGlzdGluZy5wcmljZSAvIDEwMCkudG9GaXhlZCgyKX08L2I+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICByZW5kZXJMaXN0T25DU0Zsb2F0KCk6IFRlbXBsYXRlUmVzdWx0PDE+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhbGxMaXN0aW5nKSB7XG4gICAgICAgICAgICAvLyBEb24ndCB0ZWxsIHRoZW0gdG8gbGlzdCBpdCBpZiBpdCdzIGFscmVhZHkgbGlzdGVkLi4uXG4gICAgICAgICAgICByZXR1cm4gaHRtbGBgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdfQWN0aXZlSW52ZW50b3J5Py5tX293bmVyPy5zdHJTdGVhbUlkICE9PSBnX3N0ZWFtSUQpIHtcbiAgICAgICAgICAgIC8vIE5vdCB0aGUgc2lnbmVkLWluIHVzZXIsIGRvbid0IHNob3dcbiAgICAgICAgICAgIHJldHVybiBodG1sYGA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHRtbGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXJrZXQtYnRuLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibWFya2V0LWJ0blwiIGhyZWY9XCJodHRwczovL2NzZmxvYXQuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkxpc3Qgb24gPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vY3NmbG9hdC5jb20vYXNzZXRzL25fZnVsbF9sb2dvLnBuZ1wiIGhlaWdodD1cIjIxXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDogNXB4O1wiIC8+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgYXN5bmMgcHJvY2Vzc1NlbGVjdENoYW5nZSgpIHtcbiAgICAgICAgLy8gUmVzZXQgc3RhdGUgaW4tY2FzZSB0aGV5IHN3YXAgYmV0d2VlbiBza2luIGFuZCBub24tc2tpblxuICAgICAgICB0aGlzLml0ZW1JbmZvID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICghdGhpcy5hc3NldCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghaXNTa2luKHRoaXMuYXNzZXQuZGVzY3JpcHRpb24pKSByZXR1cm47XG5cbiAgICAgICAgLy8gQ29tbW9kaXRpZXMgd29uJ3QgaGF2ZSBpbnNwZWN0IGxpbmtzXG4gICAgICAgIGlmICghdGhpcy5pbnNwZWN0TGluaykgcmV0dXJuO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pdGVtSW5mbyA9IGF3YWl0IGdGbG9hdEZldGNoZXIuZmV0Y2goe1xuICAgICAgICAgICAgICAgIGxpbms6IHRoaXMuaW5zcGVjdExpbmssXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggZmxvYXQgZm9yICR7dGhpcy5hc3NldC5hc3NldGlkfTogJHtlLnRvU3RyaW5nKCl9YCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuXG4gICAgICAgIC8vIEZvciB0aGUgaW5pdGlhbCBsb2FkLCBpbiBjYXNlIGFuIGl0ZW0gaXMgcHJlLXNlbGVjdGVkXG4gICAgICAgIHRoaXMucHJvY2Vzc1NlbGVjdENoYW5nZSgpO1xuXG4gICAgICAgIE9ic2VydmUoXG4gICAgICAgICAgICAoKSA9PiB0aGlzLmFzc2V0LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlbGVjdENoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChnX0FjdGl2ZUludmVudG9yeT8ubV9vd25lcj8uc3RyU3RlYW1JZCkge1xuICAgICAgICAgICAgLy8gSWdub3JlIGVycm9yc1xuICAgICAgICAgICAgZ1N0YWxsRmV0Y2hlclxuICAgICAgICAgICAgICAgIC5mZXRjaCh7c3RlYW1faWQ2NDogZ19BY3RpdmVJbnZlbnRvcnk/Lm1fb3duZXIuc3RyU3RlYW1JZH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHN0YWxsKSA9PiAodGhpcy5zdGFsbCA9IHN0YWxsKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0dlbmVyaWNKb2IsIFNpbXBsZUNhY2hlZFF1ZXVlfSBmcm9tICcuLi91dGlscy9xdWV1ZSc7XG5pbXBvcnQge0ZldGNoU3RhbGwsIEZldGNoU3RhbGxSZXF1ZXN0LCBGZXRjaFN0YWxsUmVzcG9uc2V9IGZyb20gJy4uL2JyaWRnZS9oYW5kbGVycy9mZXRjaF9zdGFsbCc7XG5pbXBvcnQge0NsaWVudFNlbmR9IGZyb20gJy4uL2JyaWRnZS9jbGllbnQnO1xuXG5jbGFzcyBTdGFsbEZldGNoZXIgZXh0ZW5kcyBTaW1wbGVDYWNoZWRRdWV1ZTxGZXRjaFN0YWxsUmVxdWVzdCwgRmV0Y2hTdGFsbFJlc3BvbnNlPiB7XG4gICAgZmV0Y2gocmVxOiBGZXRjaFN0YWxsUmVxdWVzdCk6IFByb21pc2U8RmV0Y2hTdGFsbFJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChuZXcgR2VuZXJpY0pvYihyZXEpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgcHJvY2VzcyhyZXE6IEZldGNoU3RhbGxSZXF1ZXN0KTogUHJvbWlzZTxGZXRjaFN0YWxsUmVzcG9uc2U+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBDbGllbnRTZW5kKEZldGNoU3RhbGwsIHJlcSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIFN0dWIgb3V0IHRvIHByZXZlbnQgZnV0dXJlIGNhbGxzXG4gICAgICAgICAgICByZXR1cm4ge2RhdGE6IFtdfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdTdGFsbEZldGNoZXIgPSBuZXcgU3RhbGxGZXRjaGVyKDEpO1xuIiwiaW1wb3J0IHtTaW1wbGVIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtDb250cmFjdH0gZnJvbSAnLi4vLi4vdHlwZXMvZmxvYXRfbWFya2V0JztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoU3RhbGxSZXF1ZXN0IHtcbiAgICBzdGVhbV9pZDY0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hTdGFsbFJlc3BvbnNlIHtcbiAgICBkYXRhPzogQ29udHJhY3RbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaFN0YWxsUmVzcG9uc2VFcnJvciB7XG4gICAgY29kZT86IHN0cmluZztcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRmV0Y2hTdGFsbCA9IG5ldyBTaW1wbGVIYW5kbGVyPEZldGNoU3RhbGxSZXF1ZXN0LCBGZXRjaFN0YWxsUmVzcG9uc2U+KFxuICAgIFJlcXVlc3RUeXBlLkZFVENIX1NUQUxMLFxuICAgIGFzeW5jIChyZXEpID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwczovL2NzZmxvYXQuY29tL2FwaS92MS91c2Vycy8ke3JlcS5zdGVhbV9pZDY0fS9zdGFsbGApLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXNwLmpzb24oKS50aGVuKChqc29uOiBGZXRjaFN0YWxsUmVzcG9uc2UgfCBGZXRjaFN0YWxsUmVzcG9uc2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKChqc29uIGFzIEZldGNoU3RhbGxSZXNwb25zZUVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSBhcyBQcm9taXNlPEZldGNoU3RhbGxSZXNwb25zZT47XG4gICAgICAgIH0pO1xuICAgIH1cbik7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsImltcG9ydCB7aW5pdH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgJy4uL2NvbXBvbmVudHMvaW52ZW50b3J5L2ludmVudG9yeV9pdGVtX2hvbGRlcl9tZXRhZGF0YSc7XG5pbXBvcnQgJy4uL2NvbXBvbmVudHMvaW52ZW50b3J5L3NlbGVjdGVkX2l0ZW1faW5mbyc7XG5cbmluaXQoJ3NyYy9saWIvcGFnZV9zY3JpcHRzL2ludmVudG9yeS5qcycsIG1haW4pO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge31cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==