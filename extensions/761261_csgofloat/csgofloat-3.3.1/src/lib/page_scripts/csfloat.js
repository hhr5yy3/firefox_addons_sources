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
/* harmony export */   "EmptyRequestHandler": () => (/* binding */ EmptyRequestHandler),
/* harmony export */   "EmptyResponseHandler": () => (/* binding */ EmptyResponseHandler),
/* harmony export */   "SimpleHandler": () => (/* binding */ SimpleHandler)
/* harmony export */ });
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
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtensionVersion": () => (/* binding */ ExtensionVersion)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _utils_detect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const ExtensionVersion = new _main__WEBPACK_IMPORTED_MODULE_0__.EmptyRequestHandler(_types__WEBPACK_IMPORTED_MODULE_1__.RequestType.EXTENSION_VERSION, (req) => __awaiter(void 0, void 0, void 0, function* () {
    const manifest = (0,_utils_detect__WEBPACK_IMPORTED_MODULE_2__.runtimeNamespace)().runtime.getManifest();
    return {
        version: manifest.version,
    };
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
/* harmony import */ var _bridge_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _bridge_handlers_extension_version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



(0,_utils__WEBPACK_IMPORTED_MODULE_0__.init)('src/lib/page_scripts/csfloat.js', main);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        window.CSFLOAT_EXTENSION_ENABLED = true;
        const resp = yield (0,_bridge_client__WEBPACK_IMPORTED_MODULE_1__.ClientSend)(_bridge_handlers_extension_version__WEBPACK_IMPORTED_MODULE_2__.ExtensionVersion, {});
        // @ts-ignore
        window.CSFLOAT_EXTENSION_VERSION = resp.version;
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9leGVjdXRlX3NjcmlwdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL3R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL3dyYXBwZXJzL3ByaXZpbGVnZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvY2xpZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL3R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvZGV0ZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvc25pcHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9idXMvcG9zdF9tZXNzYWdlX2J1cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9leGVjdXRlX2Nzcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9mZXRjaF9leHRlbnNpb25fZmlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9leHRlbnNpb25fdmVyc2lvbi50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3BhZ2Vfc2NyaXB0cy9jc2Zsb2F0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXhlY3V0ZVNjcmlwdE9uUGFnZX0gZnJvbSAnLi4vYnJpZGdlL2hhbmRsZXJzL2V4ZWN1dGVfc2NyaXB0JztcbmltcG9ydCB7Q2xpZW50U2VuZH0gZnJvbSAnLi4vYnJpZGdlL2NsaWVudCc7XG5pbXBvcnQge2luUGFnZUNvbnRleHR9IGZyb20gJy4uL3V0aWxzL3NuaXBzJztcbmltcG9ydCB7RXhlY3V0ZUNzc09uUGFnZX0gZnJvbSAnLi4vYnJpZGdlL2hhbmRsZXJzL2V4ZWN1dGVfY3NzJztcbmltcG9ydCB7RmV0Y2hFeHRlbnNpb25GaWxlfSBmcm9tICcuLi9icmlkZ2UvaGFuZGxlcnMvZmV0Y2hfZXh0ZW5zaW9uX2ZpbGUnO1xuaW1wb3J0IHtpc0ZpcmVmb3h9IGZyb20gJy4uL3V0aWxzL2RldGVjdCc7XG5pbXBvcnQge2dfUG9zdE1lc3NhZ2VCdXN9IGZyb20gJy4uL2J1cy9wb3N0X21lc3NhZ2VfYnVzJztcblxuYXN5bmMgZnVuY3Rpb24gaW5pdGlhdGVDaHJvbWl1bShzY3JpcHRQYXRoOiBzdHJpbmcpIHtcbiAgICBDbGllbnRTZW5kKEV4ZWN1dGVDc3NPblBhZ2UsIHtcbiAgICAgICAgcGF0aDogJ3NyYy9nbG9iYWwuY3NzJyxcbiAgICB9KTtcblxuICAgIENsaWVudFNlbmQoRXhlY3V0ZVNjcmlwdE9uUGFnZSwge1xuICAgICAgICBwYXRoOiBzY3JpcHRQYXRoLFxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0aWF0ZUZpcmVmb3goc2NyaXB0UGF0aDogc3RyaW5nKSB7XG4gICAgZ19Qb3N0TWVzc2FnZUJ1cy5oYW5kbGVSZXF1ZXN0cygpO1xuXG4gICAgLy8gV2h5IGRvIHdlIG5lZWQgdG8gdXNlIG1hbnVhbCBET00gc2NyaXB0IGluamVjdGlvbiBhbmRcbiAgICAvLyBmZXRjaCB0aGUgdGV4dCBvZiB0aGUgc2NyaXB0P1xuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vY3NmbG9hdC9leHRlbnNpb24vaXNzdWVzLzE1NSNpc3N1ZWNvbW1lbnQtMTYzOTc4MTkxNFxuXG4gICAgLy8gV2Ugd2FudCB0byBpbmplY3QgdGhlIElEIG9mIHRoZSBleHRlbnNpb25cbiAgICBjb25zdCBpZCA9IGJyb3dzZXIucnVudGltZS5pZDtcbiAgICBjb25zdCBtb2RlbFVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoJ3NyYy9tb2RlbF9mcmFtZS5odG1sJyk7XG4gICAgY29uc3QgZW50cnlTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBlbnRyeVNjcmlwdC5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYFxuICAgICAgICB3aW5kb3cuQ1NGTE9BVF9FWFRFTlNJT05fSUQgPSAnJHtpZH0nO1xuICAgICAgICB3aW5kb3cuQ1NGTE9BVF9NT0RFTF9GUkFNRV9VUkwgPSAnJHttb2RlbFVybH0nO1xuICAgIGApXG4gICAgKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVudHJ5U2NyaXB0KTtcblxuICAgIGNvbnN0IHNjcmlwdFJlc3AgPSBhd2FpdCBDbGllbnRTZW5kKEZldGNoRXh0ZW5zaW9uRmlsZSwge1xuICAgICAgICBwYXRoOiBzY3JpcHRQYXRoLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNjcmlwdFJlc3AudGV4dCkpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIGNvbnN0IHN0eWxlUmVzcCA9IGF3YWl0IENsaWVudFNlbmQoRmV0Y2hFeHRlbnNpb25GaWxlLCB7XG4gICAgICAgIHBhdGg6ICdzcmMvZ2xvYmFsLmNzcycsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3R5bGVSZXNwLnRleHQpKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYWdlIHNjcmlwdCwgZXhlY3V0aW5nIGl0IGluIHRoZSBwYWdlIGNvbnRleHQgaWYgbmVjZXNzYXJ5XG4gKlxuICogQHBhcmFtIHNjcmlwdFBhdGggUmVsYXRpdmUgcGF0aCBvZiB0aGUgc2NyaXB0IChhbHdheXMgaW4gLmpzKVxuICogQHBhcmFtIGlmUGFnZSBGbiB0byBydW4gaWYgd2UgYXJlIGluIHRoZSBwYWdlJ3MgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoc2NyaXB0UGF0aDogc3RyaW5nLCBpZlBhZ2U6ICgpID0+IGFueSkge1xuICAgIC8vIERvbid0IGFsbG93IHRoZSBwYWdlIHNjcmlwdCB0byBydW4gdGhpcy5cbiAgICBpZiAoaW5QYWdlQ29udGV4dCgpKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgU2V0IGdsb2JhbCBpZGVudGlmaWVyIGZvciBvdGhlciBleHRlbnNpb25zIHRvIHVzZVxuICAgICAgICB3aW5kb3cuY3NmbG9hdCA9IHRydWU7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgRGVwcmVjYXRlZCBuYW1lXG4gICAgICAgIHdpbmRvdy5jc2dvZmxvYXQgPSB0cnVlO1xuXG4gICAgICAgIGlmUGFnZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzRmlyZWZveCgpKSB7XG4gICAgICAgIGF3YWl0IGluaXRpYXRlRmlyZWZveChzY3JpcHRQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBpbml0aWF0ZUNocm9taXVtKHNjcmlwdFBhdGgpO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWMgQ1NGbG9hdCBNYXJrZXQgQ2hlY2tlciAodiR7Y2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS52ZXJzaW9ufSkgYnkgU3RlcDc3NTAgYCxcbiAgICAgICAgJ2JhY2tncm91bmQ6ICMwMDQ1OTQ7IGNvbG9yOiAjZmZmOydcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAnJWMgQ2hhbmdlbG9nIGNhbiBiZSBmb3VuZCBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vY3NmbG9hdC9leHRlbnNpb24gJyxcbiAgICAgICAgJ2JhY2tncm91bmQ6ICMwMDQ1OTQ7IGNvbG9yOiAjZmZmOydcbiAgICApO1xufVxuIiwiaW1wb3J0IHtFbXB0eVJlc3BvbnNlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtQcml2aWxlZ2VkSGFuZGxlcn0gZnJvbSAnLi4vd3JhcHBlcnMvcHJpdmlsZWdlZCc7XG5cbmludGVyZmFjZSBFeGVjdXRlU2NyaXB0UmVxdWVzdCB7XG4gICAgcGF0aDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRXhlY3V0ZVNjcmlwdE9uUGFnZSA9IG5ldyBQcml2aWxlZ2VkSGFuZGxlcihcbiAgICBuZXcgRW1wdHlSZXNwb25zZUhhbmRsZXI8RXhlY3V0ZVNjcmlwdFJlcXVlc3Q+KFJlcXVlc3RUeXBlLkVYRUNVVEVfU0NSSVBUX09OX1BBR0UsIGFzeW5jIChyZXEsIHNlbmRlcikgPT4ge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIGluamVjdCB0aGUgZXh0ZW5zaW9uIElEIGR5bmFtaWNhbGx5IHNvIHRoZSBjbGllbnQga25vd3Mgd2hvIHRvXG4gICAgICAgIC8vIGNvbW11bmljYXRlIHdpdGguXG4gICAgICAgIC8vXG4gICAgICAgIC8vIE9uIEZpcmVmb3gsIGV4dGVuc2lvbiBJRHMgYXJlIHJhbmRvbSwgc28gdGhpcyBpcyBuZWNlc3NhcnkuXG4gICAgICAgIGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHt0YWJJZDogc2VuZGVyLnRhYj8uaWQgYXMgbnVtYmVyfSxcbiAgICAgICAgICAgIHdvcmxkOiAnTUFJTicsXG4gICAgICAgICAgICBhcmdzOiBbY2hyb21lLnJ1bnRpbWUuaWQsIGNocm9tZS5ydW50aW1lLmdldFVSTCgnc3JjL21vZGVsX2ZyYW1lLmh0bWwnKV0sXG4gICAgICAgICAgICBmdW5jOiBmdW5jdGlvbiBFeHRlbnNpb25JZChleHRlbnNpb25JZCwgbW9kZWxGcmFtZVVybCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5DU0ZMT0FUX0VYVEVOU0lPTl9JRCA9IGV4dGVuc2lvbklkO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5DU0ZMT0FUX01PREVMX0ZSQU1FX1VSTCA9IG1vZGVsRnJhbWVVcmw7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgdGFyZ2V0OiB7dGFiSWQ6IHNlbmRlci50YWI/LmlkIGFzIG51bWJlcn0sXG4gICAgICAgICAgICBmaWxlczogW3JlcS5wYXRoXSxcbiAgICAgICAgICAgIHdvcmxkOiAnTUFJTicsXG4gICAgICAgIH0pO1xuICAgIH0pXG4pO1xuIiwiaW1wb3J0IHtSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgPSBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVIYW5kbGVyPFJlcSwgUmVzcD4gaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFJlcXVlc3RUeXBlLCBwcml2YXRlIGhhbmRsZXI6IChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcikgPT4gUHJvbWlzZTxSZXNwPikge31cblxuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPFJlc3A+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlcihyZXF1ZXN0LCBzZW5kZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbXB0eSB7fVxuXG5leHBvcnQgY2xhc3MgRW1wdHlSZXF1ZXN0SGFuZGxlcjxSZXNwPiBpbXBsZW1lbnRzIFJlcXVlc3RIYW5kbGVyPEVtcHR5LCBSZXNwPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBSZXF1ZXN0VHlwZSwgcHJpdmF0ZSBoYW5kbGVyOiAoc2VuZGVyOiBNZXNzYWdlU2VuZGVyKSA9PiBQcm9taXNlPFJlc3A+KSB7fVxuXG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBFbXB0eSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKTogUHJvbWlzZTxSZXNwPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIoc2VuZGVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbXB0eVJlc3BvbnNlSGFuZGxlcjxSZXE+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8UmVxLCB2b2lkPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBSZXF1ZXN0VHlwZSwgcHJpdmF0ZSBoYW5kbGVyOiAocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpID0+IFByb21pc2U8dm9pZD4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXF1ZXN0KHJlcXVlc3Q6IFJlcSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCwgc2VuZGVyKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZW51bSBSZXF1ZXN0VHlwZSB7XG4gICAgRVhFQ1VURV9TQ1JJUFRfT05fUEFHRSxcbiAgICBFWEVDVVRFX0NTU19PTl9QQUdFLFxuICAgIEZFVENIX0lOU1BFQ1RfSU5GTyxcbiAgICBGRVRDSF9TVEFMTCxcbiAgICBTVE9SQUdFX0dFVCxcbiAgICBTVE9SQUdFX1NFVCxcbiAgICBTVE9SQUdFX1JFTU9WRSxcbiAgICBGRVRDSF9QRU5ESU5HX1RSQURFUyxcbiAgICBGRVRDSF9TS0lOX01PREVMLFxuICAgIEZFVENIX0VYVEVOU0lPTl9GSUxFLFxuICAgIEFOTk9UQVRFX09GRkVSLFxuICAgIEVYVEVOU0lPTl9WRVJTSU9OLFxufVxuIiwiaW1wb3J0IHtSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi4vaGFuZGxlcnMvdHlwZXMnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgPSBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyO1xuXG4vKipcbiAqIFJlc3RyaWN0cyBhIGdpdmVuIGhhbmRsZXIgc3VjaCB0aGF0IGl0IGNhbiBvbmx5IHJ1biBpZiB0aGUgc2VuZGVyIGlzXG4gKiB2ZXJpZmllZCB0byBiZSBmcm9tIHRoZSBleHRlbnNpb24ncyBvcmlnaW4gKGllLiBjb250ZW50IHNjcmlwdClcbiAqL1xuZXhwb3J0IGNsYXNzIFByaXZpbGVnZWRIYW5kbGVyPFJlcSwgUmVzcD4gaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyPFJlcSwgUmVzcD4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5nZXRUeXBlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8UmVzcD4ge1xuICAgICAgICBpZiAoc2VuZGVyLmlkICE9PSBjaHJvbWUucnVudGltZS5pZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0IHRvIGFjY2VzcyByZXN0cmljdGVkIG1ldGhvZCBvdXRzaWRlIG9mIHNlY3VyZSBjb250ZXh0IChpZS4gY29udGVudCBzY3JpcHQpJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmhhbmRsZVJlcXVlc3QocmVxdWVzdCwgc2VuZGVyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0ludGVybmFsUmVxdWVzdEJ1bmRsZSwgSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSwgUmVxdWVzdEhhbmRsZXIsIFZlcnNpb259IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtpc0ZpcmVmb3gsIHJ1bnRpbWVOYW1lc3BhY2V9IGZyb20gJy4uL3V0aWxzL2RldGVjdCc7XG5pbXBvcnQge2luUGFnZUNvbnRleHR9IGZyb20gJy4uL3V0aWxzL3NuaXBzJztcbmltcG9ydCB7Z19Qb3N0TWVzc2FnZUJ1c30gZnJvbSAnLi4vYnVzL3Bvc3RfbWVzc2FnZV9idXMnO1xuXG5mdW5jdGlvbiBjYW5Vc2VTZW5kTWVzc2FnZSgpIHtcbiAgICAvLyBOb3Qgc3VwcG9ydGVkIGluIEZpcmVmb3ggUGFnZSBDb250ZXh0XG4gICAgcmV0dXJuICEoaXNGaXJlZm94KCkgJiYgaW5QYWdlQ29udGV4dCgpKTtcbn1cblxuLyoqXG4gKiBTZW5kIGEgcmVxdWVzdCB0byBiZSBoYW5kbGVkIGJ5IHRoZSBiYWNrZ3JvdW5kIHdvcmtlclxuICpcbiAqIENhbiBiZSBjYWxsZWQgZnJvbSBhIGNvbnRlbnQgc2NyaXB0IG9yIHBhZ2UgaXRzZWxmXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBDbGllbnRTZW5kPFJlcSwgUmVzcD4oaGFuZGxlcjogUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiwgYXJnczogUmVxKTogUHJvbWlzZTxSZXNwPiB7XG4gICAgY29uc3QgYnVuZGxlOiBJbnRlcm5hbFJlcXVlc3RCdW5kbGUgPSB7XG4gICAgICAgIHZlcnNpb246IFZlcnNpb24uVjEsXG4gICAgICAgIHJlcXVlc3RfdHlwZTogaGFuZGxlci5nZXRUeXBlKCksXG4gICAgICAgIHJlcXVlc3Q6IGFyZ3MsXG4gICAgICAgIGlkOiBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDAwMCksXG4gICAgfTtcblxuICAgIGlmIChjYW5Vc2VTZW5kTWVzc2FnZSgpKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgcnVudGltZU5hbWVzcGFjZSgpLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgd2luZG93LkNTRkxPQVRfRVhURU5TSU9OX0lEIHx8IGNocm9tZS5ydW50aW1lLmlkLFxuICAgICAgICAgICAgICAgIGJ1bmRsZSxcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgICAgIChyZXNwOiBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwPy5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwPy5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsYmFjayB0byBwb3N0bWVzc2FnZSBidXMgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3QgaW1wbGVtZW50XG4gICAgICAgIC8vIHNwZWNzIGZ1bGx5XG4gICAgICAgIHJldHVybiBnX1Bvc3RNZXNzYWdlQnVzLnNlbmRSZXF1ZXN0KGJ1bmRsZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1lc3NhZ2VTZW5kZXIgPSBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi9oYW5kbGVycy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiB7XG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8UmVzcD47XG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZTtcbn1cblxuZXhwb3J0IGVudW0gVmVyc2lvbiB7XG4gICAgVjEgPSAnQ1NGTE9BVF9WMScsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxSZXF1ZXN0QnVuZGxlIHtcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG5cbiAgICByZXF1ZXN0X3R5cGU6IFJlcXVlc3RUeXBlO1xuXG4gICAgLy8gSW5wdXQgcmVxdWVzdFxuICAgIHJlcXVlc3Q6IGFueTtcblxuICAgIC8vIFJhbmRvbSBJRCB0byBpZGVudGlmeSB0aGUgcmVxdWVzdFxuICAgIGlkOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSB7XG4gICAgcmVxdWVzdF90eXBlOiBSZXF1ZXN0VHlwZTtcblxuICAgIC8vIFJlc3BvbnNlXG4gICAgcmVzcG9uc2U6IGFueTtcblxuICAgIGVycm9yOiBzdHJpbmc7XG5cbiAgICAvLyBSYW5kb20gSUQgdG8gaWRlbnRpZnkgdGhlIHJlcXVlc3RcbiAgICBpZDogbnVtYmVyO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRmlyZWZveCgpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xO1xufVxuXG4vKipcbiAqIFRoYW5rcyB0byBvdXIgYnJvd3NlciBvdmVybG9yZHMsIHdlIGhhdmUgdHdvIG5hbWVzcGFjZXMgZm9yIGB4LnJ1bnRpbWUuZm4oKWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bnRpbWVOYW1lc3BhY2UoKSB7XG4gICAgaWYgKGlzRmlyZWZveCgpKSB7XG4gICAgICAgIHJldHVybiBicm93c2VyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjaHJvbWU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGluUGFnZUNvbnRleHQoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBjaHJvbWUgPT09ICd1bmRlZmluZWQnIHx8ICFjaHJvbWUuZXh0ZW5zaW9uO1xufVxuIiwiaW1wb3J0IHtJbnRlcm5hbFJlcXVlc3RCdW5kbGUsIEludGVybmFsUmVzcG9uc2VCdW5kbGUsIFZlcnNpb259IGZyb20gJy4uL2JyaWRnZS90eXBlcyc7XG5pbXBvcnQge3J1bnRpbWVOYW1lc3BhY2V9IGZyb20gJy4uL3V0aWxzL2RldGVjdCc7XG5cbi8qKlxuICogTWVzc2FnZSBidXMgdGhhdCB1c2VzIGBwb3N0TWVzc2FnZWAgaW4gb3JkZXIgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgYmFja2dyb3VuZFxuICogc2VydmljZSB3b3JrZXIvc2NyaXB0LlxuICpcbiAqIFdoeT8gQmVjYXVzZSB0aGUgY2xpZW50IHBhZ2UgKGllLiBTdGVhbSBwYWdlKSBvbiBGaXJlZm94IGlzIG5vdCBjYXBhYmxlIG9mXG4gKiBzZW5kaW5nIGEgbWVzc2FnZSBkaXJlY3RseSB0byB0aGUgZXh0ZW5zaW9uIGJhY2tncm91bmQuXG4gKlxuICogU28gaXQgcmVxdWlyZXMgdXMgdG8gZG8gdGhlIGZvbGxvd2luZyBkYW5jZTpcbiAqIHBhZ2UgPC0tKHBvc3RtZXNzYWdlKS0tPiBjb250ZW50IHNjcmlwdCA8LS0oc2VuZG1lc3NhZ2UpLS0+IGJhY2tncm91bmQgc2NyaXB0XG4gKlxuICogVGhpcyBkYW5jZSBpcyBhYnN0cmFjdGVkIGluIGBDbGllbnRTZW5kYCwgYW5kIG9ubHkgdXNlcyB0aGlzIGJ1cyBpZlxuICogYHNlbmRtZXNzYWdlYCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBwYWdlLlxuICovXG5jbGFzcyBQb3N0TWVzc2FnZUJ1cyB7XG4gICAgLyoqXG4gICAgICogRm9yIHRoZSByZXF1ZXN0ZXIgKGllLiBwYWdlKSwgdG8gd2FpdCB1bnRpbCBpdCBnZXRzIGEgcmVzcG9uc2VcbiAgICAgKiBmcm9tIHRoZSBjb250ZW50IHNjcmlwdCB2aWEuIHBvc3RNZXNzYWdlIGZvciB0aGUgZ2l2ZW4gcmVxdWVzdCBJRFxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFJlcXVlc3QgSURcbiAgICAgKi9cbiAgICB3YWl0VW50aWxSZXNwb25zZUZvcihpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcCA9IGUuZGF0YSBhcyBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLmlkICE9PSBpZCB8fCAhcmVzcC5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBsZWFrc1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlciwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3A/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3A/LmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHJlcXVlc3QgdG8gYmUgZG9uZSB0aHJvdWdoIHRoZSBidXMsIHJldHVybnMgdGhlIGFwcHJvcHJpYXRlXG4gICAgICogcmVzcG9uc2UgZm9yIHRoZSBpbnB1dCBidW5kbGUgaGFuZGxlclxuICAgICAqXG4gICAgICogQHBhcmFtIGJ1bmRsZSBSZXF1ZXN0IEJ1bmRsZVxuICAgICAqL1xuICAgIHNlbmRSZXF1ZXN0KGJ1bmRsZTogSW50ZXJuYWxSZXF1ZXN0QnVuZGxlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKGJ1bmRsZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2FpdFVudGlsUmVzcG9uc2VGb3IoYnVuZGxlLmlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGhhbmRsZXIgKGNvbnRlbnQgc2NyaXB0KSBmb3IgbmV3IHJlcXVlc3RzIGZyb20gdGhlIHBhZ2UuXG4gICAgICpcbiAgICAgKiBFYWNoIHJlcXVlc3QgaXMgZWZmZWN0aXZlbHkgXCJwcm94aWVkXCIgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0L3dvcmtlclxuICAgICAqIHRvIGFjdHVhbGx5IGV4ZWN1dGUgaXQncyBoYW5kbGVyLlxuICAgICAqL1xuICAgIGhhbmRsZVJlcXVlc3RzKCkge1xuICAgICAgICBjb25zdCBoID0gKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGUuZGF0YS52ZXJzaW9uICE9PSBWZXJzaW9uLlYxIHx8ICFlLmRhdGEucmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBtZXNzYWdlcyB0aGF0IGFyZW4ndCBmb3IgdGhpcyBicmlkZ2VcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlbmQgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgcnVudGltZU5hbWVzcGFjZSgpLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuaWQsXG4gICAgICAgICAgICAgICAgZS5kYXRhLFxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgQmFkIHR5cGVzXG4gICAgICAgICAgICAgICAgKHJlc3A6IEludGVybmFsUmVzcG9uc2VCdW5kbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHJlc3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBnX1Bvc3RNZXNzYWdlQnVzID0gbmV3IFBvc3RNZXNzYWdlQnVzKCk7XG4iLCJpbXBvcnQge0VtcHR5UmVzcG9uc2VIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1ByaXZpbGVnZWRIYW5kbGVyfSBmcm9tICcuLi93cmFwcGVycy9wcml2aWxlZ2VkJztcblxuaW50ZXJmYWNlIEV4ZWN1dGVDc3NSZXF1ZXN0IHtcbiAgICBwYXRoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBFeGVjdXRlQ3NzT25QYWdlID0gbmV3IFByaXZpbGVnZWRIYW5kbGVyKFxuICAgIG5ldyBFbXB0eVJlc3BvbnNlSGFuZGxlcjxFeGVjdXRlQ3NzUmVxdWVzdD4oUmVxdWVzdFR5cGUuRVhFQ1VURV9DU1NfT05fUEFHRSwgYXN5bmMgKHJlcSwgc2VuZGVyKSA9PiB7XG4gICAgICAgIGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuaW5zZXJ0Q1NTKHtcbiAgICAgICAgICAgIHRhcmdldDoge3RhYklkOiBzZW5kZXIudGFiPy5pZCBhcyBudW1iZXJ9LFxuICAgICAgICAgICAgZmlsZXM6IFtyZXEucGF0aF0sXG4gICAgICAgIH0pO1xuICAgIH0pXG4pO1xuIiwiaW1wb3J0IHtTaW1wbGVIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1ByaXZpbGVnZWRIYW5kbGVyfSBmcm9tICcuLi93cmFwcGVycy9wcml2aWxlZ2VkJztcblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEV4dGVuc2lvbkZpbGVSZXF1ZXN0IHtcbiAgICBwYXRoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hFeHRlbnNpb25GaWxlUmVzcG9uc2Uge1xuICAgIHRleHQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEZldGNoRXh0ZW5zaW9uRmlsZSA9IG5ldyBQcml2aWxlZ2VkSGFuZGxlcihcbiAgICBuZXcgU2ltcGxlSGFuZGxlcjxGZXRjaEV4dGVuc2lvbkZpbGVSZXF1ZXN0LCBGZXRjaEV4dGVuc2lvbkZpbGVSZXNwb25zZT4oXG4gICAgICAgIFJlcXVlc3RUeXBlLkZFVENIX0VYVEVOU0lPTl9GSUxFLFxuICAgICAgICBhc3luYyAocmVxKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjaHJvbWUucnVudGltZS5nZXRVUkwocmVxLnBhdGgpO1xuICAgICAgICAgICAgY29uc3QgciA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgci50ZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgKVxuKTtcbiIsImltcG9ydCB7RW1wdHlSZXF1ZXN0SGFuZGxlciwgU2ltcGxlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtBbm5vdGF0ZU9mZmVyUmVxdWVzdCwgQW5ub3RhdGVPZmZlclJlc3BvbnNlfSBmcm9tICcuL2Fubm90YXRlX29mZmVyJztcbmltcG9ydCB7cnVudGltZU5hbWVzcGFjZX0gZnJvbSAnLi4vLi4vdXRpbHMvZGV0ZWN0JztcblxuZXhwb3J0IGludGVyZmFjZSBFeHRlbnNpb25WZXJzaW9uUmVzcG9uc2Uge1xuICAgIHZlcnNpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEV4dGVuc2lvblZlcnNpb24gPSBuZXcgRW1wdHlSZXF1ZXN0SGFuZGxlcjxFeHRlbnNpb25WZXJzaW9uUmVzcG9uc2U+KFxuICAgIFJlcXVlc3RUeXBlLkVYVEVOU0lPTl9WRVJTSU9OLFxuICAgIGFzeW5jIChyZXEpID0+IHtcbiAgICAgICAgY29uc3QgbWFuaWZlc3QgPSBydW50aW1lTmFtZXNwYWNlKCkucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVyc2lvbjogbWFuaWZlc3QudmVyc2lvbixcbiAgICAgICAgfTtcbiAgICB9XG4pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJpbXBvcnQge2luaXR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtDbGllbnRTZW5kfSBmcm9tICcuLi9icmlkZ2UvY2xpZW50JztcbmltcG9ydCB7RXh0ZW5zaW9uVmVyc2lvbn0gZnJvbSAnLi4vYnJpZGdlL2hhbmRsZXJzL2V4dGVuc2lvbl92ZXJzaW9uJztcblxuaW5pdCgnc3JjL2xpYi9wYWdlX3NjcmlwdHMvY3NmbG9hdC5qcycsIG1haW4pO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB3aW5kb3cuQ1NGTE9BVF9FWFRFTlNJT05fRU5BQkxFRCA9IHRydWU7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IENsaWVudFNlbmQoRXh0ZW5zaW9uVmVyc2lvbiwge30pO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB3aW5kb3cuQ1NGTE9BVF9FWFRFTlNJT05fVkVSU0lPTiA9IHJlc3AudmVyc2lvbjtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==