/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
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
/* unused harmony export init */
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLENBQUM7WUFDVCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLHdEQUFTLEVBQUUsRUFBRTtZQUNiLE1BQU0sZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDSCxNQUFNLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCwrQkFBK0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLGdCQUFnQixFQUNuRixtQ0FBbUMsQ0FDdEMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQ1AsdUVBQXVFLEVBQ3ZFLG1DQUFtQyxDQUN0QyxDQUFDO0lBQ04sQ0FBQztDQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy90eXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS93cmFwcGVycy9wcml2aWxlZ2VkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS90eXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL2RldGVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL3NuaXBzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnVzL3Bvc3RfbWVzc2FnZV9idXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9jc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZmV0Y2hfZXh0ZW5zaW9uX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9wYWdlX3NjcmlwdHMvdXRpbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbXB0eVJlc3BvbnNlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtQcml2aWxlZ2VkSGFuZGxlcn0gZnJvbSAnLi4vd3JhcHBlcnMvcHJpdmlsZWdlZCc7XG5cbmludGVyZmFjZSBFeGVjdXRlU2NyaXB0UmVxdWVzdCB7XG4gICAgcGF0aDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRXhlY3V0ZVNjcmlwdE9uUGFnZSA9IG5ldyBQcml2aWxlZ2VkSGFuZGxlcihcbiAgICBuZXcgRW1wdHlSZXNwb25zZUhhbmRsZXI8RXhlY3V0ZVNjcmlwdFJlcXVlc3Q+KFJlcXVlc3RUeXBlLkVYRUNVVEVfU0NSSVBUX09OX1BBR0UsIGFzeW5jIChyZXEsIHNlbmRlcikgPT4ge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIGluamVjdCB0aGUgZXh0ZW5zaW9uIElEIGR5bmFtaWNhbGx5IHNvIHRoZSBjbGllbnQga25vd3Mgd2hvIHRvXG4gICAgICAgIC8vIGNvbW11bmljYXRlIHdpdGguXG4gICAgICAgIC8vXG4gICAgICAgIC8vIE9uIEZpcmVmb3gsIGV4dGVuc2lvbiBJRHMgYXJlIHJhbmRvbSwgc28gdGhpcyBpcyBuZWNlc3NhcnkuXG4gICAgICAgIGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHt0YWJJZDogc2VuZGVyLnRhYj8uaWQgYXMgbnVtYmVyfSxcbiAgICAgICAgICAgIHdvcmxkOiAnTUFJTicsXG4gICAgICAgICAgICBhcmdzOiBbY2hyb21lLnJ1bnRpbWUuaWQsIGNocm9tZS5ydW50aW1lLmdldFVSTCgnc3JjL21vZGVsX2ZyYW1lLmh0bWwnKV0sXG4gICAgICAgICAgICBmdW5jOiBmdW5jdGlvbiBFeHRlbnNpb25JZChleHRlbnNpb25JZCwgbW9kZWxGcmFtZVVybCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5DU0ZMT0FUX0VYVEVOU0lPTl9JRCA9IGV4dGVuc2lvbklkO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5DU0ZMT0FUX01PREVMX0ZSQU1FX1VSTCA9IG1vZGVsRnJhbWVVcmw7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgdGFyZ2V0OiB7dGFiSWQ6IHNlbmRlci50YWI/LmlkIGFzIG51bWJlcn0sXG4gICAgICAgICAgICBmaWxlczogW3JlcS5wYXRoXSxcbiAgICAgICAgICAgIHdvcmxkOiAnTUFJTicsXG4gICAgICAgIH0pO1xuICAgIH0pXG4pO1xuIiwiaW1wb3J0IHtSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgPSBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVIYW5kbGVyPFJlcSwgUmVzcD4gaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFJlcXVlc3RUeXBlLCBwcml2YXRlIGhhbmRsZXI6IChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcikgPT4gUHJvbWlzZTxSZXNwPikge31cblxuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPFJlc3A+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlcihyZXF1ZXN0LCBzZW5kZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbXB0eSB7fVxuXG5leHBvcnQgY2xhc3MgRW1wdHlSZXF1ZXN0SGFuZGxlcjxSZXNwPiBpbXBsZW1lbnRzIFJlcXVlc3RIYW5kbGVyPEVtcHR5LCBSZXNwPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBSZXF1ZXN0VHlwZSwgcHJpdmF0ZSBoYW5kbGVyOiAoc2VuZGVyOiBNZXNzYWdlU2VuZGVyKSA9PiBQcm9taXNlPFJlc3A+KSB7fVxuXG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBFbXB0eSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKTogUHJvbWlzZTxSZXNwPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIoc2VuZGVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbXB0eVJlc3BvbnNlSGFuZGxlcjxSZXE+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8UmVxLCB2b2lkPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBSZXF1ZXN0VHlwZSwgcHJpdmF0ZSBoYW5kbGVyOiAocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpID0+IFByb21pc2U8dm9pZD4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXF1ZXN0KHJlcXVlc3Q6IFJlcSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCwgc2VuZGVyKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZW51bSBSZXF1ZXN0VHlwZSB7XG4gICAgRVhFQ1VURV9TQ1JJUFRfT05fUEFHRSxcbiAgICBFWEVDVVRFX0NTU19PTl9QQUdFLFxuICAgIEZFVENIX0lOU1BFQ1RfSU5GTyxcbiAgICBGRVRDSF9TVEFMTCxcbiAgICBTVE9SQUdFX0dFVCxcbiAgICBTVE9SQUdFX1NFVCxcbiAgICBTVE9SQUdFX1JFTU9WRSxcbiAgICBGRVRDSF9QRU5ESU5HX1RSQURFUyxcbiAgICBGRVRDSF9TS0lOX01PREVMLFxuICAgIEZFVENIX0VYVEVOU0lPTl9GSUxFLFxuICAgIEFOTk9UQVRFX09GRkVSLFxuICAgIEVYVEVOU0lPTl9WRVJTSU9OLFxufVxuIiwiaW1wb3J0IHtSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi4vaGFuZGxlcnMvdHlwZXMnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgPSBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyO1xuXG4vKipcbiAqIFJlc3RyaWN0cyBhIGdpdmVuIGhhbmRsZXIgc3VjaCB0aGF0IGl0IGNhbiBvbmx5IHJ1biBpZiB0aGUgc2VuZGVyIGlzXG4gKiB2ZXJpZmllZCB0byBiZSBmcm9tIHRoZSBleHRlbnNpb24ncyBvcmlnaW4gKGllLiBjb250ZW50IHNjcmlwdClcbiAqL1xuZXhwb3J0IGNsYXNzIFByaXZpbGVnZWRIYW5kbGVyPFJlcSwgUmVzcD4gaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyPFJlcSwgUmVzcD4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5nZXRUeXBlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8UmVzcD4ge1xuICAgICAgICBpZiAoc2VuZGVyLmlkICE9PSBjaHJvbWUucnVudGltZS5pZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0IHRvIGFjY2VzcyByZXN0cmljdGVkIG1ldGhvZCBvdXRzaWRlIG9mIHNlY3VyZSBjb250ZXh0IChpZS4gY29udGVudCBzY3JpcHQpJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmhhbmRsZVJlcXVlc3QocmVxdWVzdCwgc2VuZGVyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0ludGVybmFsUmVxdWVzdEJ1bmRsZSwgSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSwgUmVxdWVzdEhhbmRsZXIsIFZlcnNpb259IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtpc0ZpcmVmb3gsIHJ1bnRpbWVOYW1lc3BhY2V9IGZyb20gJy4uL3V0aWxzL2RldGVjdCc7XG5pbXBvcnQge2luUGFnZUNvbnRleHR9IGZyb20gJy4uL3V0aWxzL3NuaXBzJztcbmltcG9ydCB7Z19Qb3N0TWVzc2FnZUJ1c30gZnJvbSAnLi4vYnVzL3Bvc3RfbWVzc2FnZV9idXMnO1xuXG5mdW5jdGlvbiBjYW5Vc2VTZW5kTWVzc2FnZSgpIHtcbiAgICAvLyBOb3Qgc3VwcG9ydGVkIGluIEZpcmVmb3ggUGFnZSBDb250ZXh0XG4gICAgcmV0dXJuICEoaXNGaXJlZm94KCkgJiYgaW5QYWdlQ29udGV4dCgpKTtcbn1cblxuLyoqXG4gKiBTZW5kIGEgcmVxdWVzdCB0byBiZSBoYW5kbGVkIGJ5IHRoZSBiYWNrZ3JvdW5kIHdvcmtlclxuICpcbiAqIENhbiBiZSBjYWxsZWQgZnJvbSBhIGNvbnRlbnQgc2NyaXB0IG9yIHBhZ2UgaXRzZWxmXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBDbGllbnRTZW5kPFJlcSwgUmVzcD4oaGFuZGxlcjogUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiwgYXJnczogUmVxKTogUHJvbWlzZTxSZXNwPiB7XG4gICAgY29uc3QgYnVuZGxlOiBJbnRlcm5hbFJlcXVlc3RCdW5kbGUgPSB7XG4gICAgICAgIHZlcnNpb246IFZlcnNpb24uVjEsXG4gICAgICAgIHJlcXVlc3RfdHlwZTogaGFuZGxlci5nZXRUeXBlKCksXG4gICAgICAgIHJlcXVlc3Q6IGFyZ3MsXG4gICAgICAgIGlkOiBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDAwMCksXG4gICAgfTtcblxuICAgIGlmIChjYW5Vc2VTZW5kTWVzc2FnZSgpKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgcnVudGltZU5hbWVzcGFjZSgpLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgd2luZG93LkNTRkxPQVRfRVhURU5TSU9OX0lEIHx8IGNocm9tZS5ydW50aW1lLmlkLFxuICAgICAgICAgICAgICAgIGJ1bmRsZSxcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgICAgIChyZXNwOiBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwPy5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwPy5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsYmFjayB0byBwb3N0bWVzc2FnZSBidXMgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3QgaW1wbGVtZW50XG4gICAgICAgIC8vIHNwZWNzIGZ1bGx5XG4gICAgICAgIHJldHVybiBnX1Bvc3RNZXNzYWdlQnVzLnNlbmRSZXF1ZXN0KGJ1bmRsZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1lc3NhZ2VTZW5kZXIgPSBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi9oYW5kbGVycy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiB7XG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8UmVzcD47XG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZTtcbn1cblxuZXhwb3J0IGVudW0gVmVyc2lvbiB7XG4gICAgVjEgPSAnQ1NGTE9BVF9WMScsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxSZXF1ZXN0QnVuZGxlIHtcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG5cbiAgICByZXF1ZXN0X3R5cGU6IFJlcXVlc3RUeXBlO1xuXG4gICAgLy8gSW5wdXQgcmVxdWVzdFxuICAgIHJlcXVlc3Q6IGFueTtcblxuICAgIC8vIFJhbmRvbSBJRCB0byBpZGVudGlmeSB0aGUgcmVxdWVzdFxuICAgIGlkOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSB7XG4gICAgcmVxdWVzdF90eXBlOiBSZXF1ZXN0VHlwZTtcblxuICAgIC8vIFJlc3BvbnNlXG4gICAgcmVzcG9uc2U6IGFueTtcblxuICAgIGVycm9yOiBzdHJpbmc7XG5cbiAgICAvLyBSYW5kb20gSUQgdG8gaWRlbnRpZnkgdGhlIHJlcXVlc3RcbiAgICBpZDogbnVtYmVyO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRmlyZWZveCgpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xO1xufVxuXG4vKipcbiAqIFRoYW5rcyB0byBvdXIgYnJvd3NlciBvdmVybG9yZHMsIHdlIGhhdmUgdHdvIG5hbWVzcGFjZXMgZm9yIGB4LnJ1bnRpbWUuZm4oKWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bnRpbWVOYW1lc3BhY2UoKSB7XG4gICAgaWYgKGlzRmlyZWZveCgpKSB7XG4gICAgICAgIHJldHVybiBicm93c2VyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjaHJvbWU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGluUGFnZUNvbnRleHQoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBjaHJvbWUgPT09ICd1bmRlZmluZWQnIHx8ICFjaHJvbWUuZXh0ZW5zaW9uO1xufVxuIiwiaW1wb3J0IHtJbnRlcm5hbFJlcXVlc3RCdW5kbGUsIEludGVybmFsUmVzcG9uc2VCdW5kbGUsIFZlcnNpb259IGZyb20gJy4uL2JyaWRnZS90eXBlcyc7XG5pbXBvcnQge3J1bnRpbWVOYW1lc3BhY2V9IGZyb20gJy4uL3V0aWxzL2RldGVjdCc7XG5cbi8qKlxuICogTWVzc2FnZSBidXMgdGhhdCB1c2VzIGBwb3N0TWVzc2FnZWAgaW4gb3JkZXIgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgYmFja2dyb3VuZFxuICogc2VydmljZSB3b3JrZXIvc2NyaXB0LlxuICpcbiAqIFdoeT8gQmVjYXVzZSB0aGUgY2xpZW50IHBhZ2UgKGllLiBTdGVhbSBwYWdlKSBvbiBGaXJlZm94IGlzIG5vdCBjYXBhYmxlIG9mXG4gKiBzZW5kaW5nIGEgbWVzc2FnZSBkaXJlY3RseSB0byB0aGUgZXh0ZW5zaW9uIGJhY2tncm91bmQuXG4gKlxuICogU28gaXQgcmVxdWlyZXMgdXMgdG8gZG8gdGhlIGZvbGxvd2luZyBkYW5jZTpcbiAqIHBhZ2UgPC0tKHBvc3RtZXNzYWdlKS0tPiBjb250ZW50IHNjcmlwdCA8LS0oc2VuZG1lc3NhZ2UpLS0+IGJhY2tncm91bmQgc2NyaXB0XG4gKlxuICogVGhpcyBkYW5jZSBpcyBhYnN0cmFjdGVkIGluIGBDbGllbnRTZW5kYCwgYW5kIG9ubHkgdXNlcyB0aGlzIGJ1cyBpZlxuICogYHNlbmRtZXNzYWdlYCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBwYWdlLlxuICovXG5jbGFzcyBQb3N0TWVzc2FnZUJ1cyB7XG4gICAgLyoqXG4gICAgICogRm9yIHRoZSByZXF1ZXN0ZXIgKGllLiBwYWdlKSwgdG8gd2FpdCB1bnRpbCBpdCBnZXRzIGEgcmVzcG9uc2VcbiAgICAgKiBmcm9tIHRoZSBjb250ZW50IHNjcmlwdCB2aWEuIHBvc3RNZXNzYWdlIGZvciB0aGUgZ2l2ZW4gcmVxdWVzdCBJRFxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFJlcXVlc3QgSURcbiAgICAgKi9cbiAgICB3YWl0VW50aWxSZXNwb25zZUZvcihpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcCA9IGUuZGF0YSBhcyBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLmlkICE9PSBpZCB8fCAhcmVzcC5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBsZWFrc1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlciwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3A/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3A/LmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHJlcXVlc3QgdG8gYmUgZG9uZSB0aHJvdWdoIHRoZSBidXMsIHJldHVybnMgdGhlIGFwcHJvcHJpYXRlXG4gICAgICogcmVzcG9uc2UgZm9yIHRoZSBpbnB1dCBidW5kbGUgaGFuZGxlclxuICAgICAqXG4gICAgICogQHBhcmFtIGJ1bmRsZSBSZXF1ZXN0IEJ1bmRsZVxuICAgICAqL1xuICAgIHNlbmRSZXF1ZXN0KGJ1bmRsZTogSW50ZXJuYWxSZXF1ZXN0QnVuZGxlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKGJ1bmRsZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2FpdFVudGlsUmVzcG9uc2VGb3IoYnVuZGxlLmlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGhhbmRsZXIgKGNvbnRlbnQgc2NyaXB0KSBmb3IgbmV3IHJlcXVlc3RzIGZyb20gdGhlIHBhZ2UuXG4gICAgICpcbiAgICAgKiBFYWNoIHJlcXVlc3QgaXMgZWZmZWN0aXZlbHkgXCJwcm94aWVkXCIgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0L3dvcmtlclxuICAgICAqIHRvIGFjdHVhbGx5IGV4ZWN1dGUgaXQncyBoYW5kbGVyLlxuICAgICAqL1xuICAgIGhhbmRsZVJlcXVlc3RzKCkge1xuICAgICAgICBjb25zdCBoID0gKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGUuZGF0YS52ZXJzaW9uICE9PSBWZXJzaW9uLlYxIHx8ICFlLmRhdGEucmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBtZXNzYWdlcyB0aGF0IGFyZW4ndCBmb3IgdGhpcyBicmlkZ2VcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlbmQgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgcnVudGltZU5hbWVzcGFjZSgpLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuaWQsXG4gICAgICAgICAgICAgICAgZS5kYXRhLFxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgQmFkIHR5cGVzXG4gICAgICAgICAgICAgICAgKHJlc3A6IEludGVybmFsUmVzcG9uc2VCdW5kbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHJlc3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBnX1Bvc3RNZXNzYWdlQnVzID0gbmV3IFBvc3RNZXNzYWdlQnVzKCk7XG4iLCJpbXBvcnQge0VtcHR5UmVzcG9uc2VIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1ByaXZpbGVnZWRIYW5kbGVyfSBmcm9tICcuLi93cmFwcGVycy9wcml2aWxlZ2VkJztcblxuaW50ZXJmYWNlIEV4ZWN1dGVDc3NSZXF1ZXN0IHtcbiAgICBwYXRoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBFeGVjdXRlQ3NzT25QYWdlID0gbmV3IFByaXZpbGVnZWRIYW5kbGVyKFxuICAgIG5ldyBFbXB0eVJlc3BvbnNlSGFuZGxlcjxFeGVjdXRlQ3NzUmVxdWVzdD4oUmVxdWVzdFR5cGUuRVhFQ1VURV9DU1NfT05fUEFHRSwgYXN5bmMgKHJlcSwgc2VuZGVyKSA9PiB7XG4gICAgICAgIGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuaW5zZXJ0Q1NTKHtcbiAgICAgICAgICAgIHRhcmdldDoge3RhYklkOiBzZW5kZXIudGFiPy5pZCBhcyBudW1iZXJ9LFxuICAgICAgICAgICAgZmlsZXM6IFtyZXEucGF0aF0sXG4gICAgICAgIH0pO1xuICAgIH0pXG4pO1xuIiwiaW1wb3J0IHtTaW1wbGVIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1ByaXZpbGVnZWRIYW5kbGVyfSBmcm9tICcuLi93cmFwcGVycy9wcml2aWxlZ2VkJztcblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEV4dGVuc2lvbkZpbGVSZXF1ZXN0IHtcbiAgICBwYXRoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hFeHRlbnNpb25GaWxlUmVzcG9uc2Uge1xuICAgIHRleHQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEZldGNoRXh0ZW5zaW9uRmlsZSA9IG5ldyBQcml2aWxlZ2VkSGFuZGxlcihcbiAgICBuZXcgU2ltcGxlSGFuZGxlcjxGZXRjaEV4dGVuc2lvbkZpbGVSZXF1ZXN0LCBGZXRjaEV4dGVuc2lvbkZpbGVSZXNwb25zZT4oXG4gICAgICAgIFJlcXVlc3RUeXBlLkZFVENIX0VYVEVOU0lPTl9GSUxFLFxuICAgICAgICBhc3luYyAocmVxKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjaHJvbWUucnVudGltZS5nZXRVUkwocmVxLnBhdGgpO1xuICAgICAgICAgICAgY29uc3QgciA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgci50ZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgKVxuKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiaW1wb3J0IHtFeGVjdXRlU2NyaXB0T25QYWdlfSBmcm9tICcuLi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9zY3JpcHQnO1xuaW1wb3J0IHtDbGllbnRTZW5kfSBmcm9tICcuLi9icmlkZ2UvY2xpZW50JztcbmltcG9ydCB7aW5QYWdlQ29udGV4dH0gZnJvbSAnLi4vdXRpbHMvc25pcHMnO1xuaW1wb3J0IHtFeGVjdXRlQ3NzT25QYWdlfSBmcm9tICcuLi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9jc3MnO1xuaW1wb3J0IHtGZXRjaEV4dGVuc2lvbkZpbGV9IGZyb20gJy4uL2JyaWRnZS9oYW5kbGVycy9mZXRjaF9leHRlbnNpb25fZmlsZSc7XG5pbXBvcnQge2lzRmlyZWZveH0gZnJvbSAnLi4vdXRpbHMvZGV0ZWN0JztcbmltcG9ydCB7Z19Qb3N0TWVzc2FnZUJ1c30gZnJvbSAnLi4vYnVzL3Bvc3RfbWVzc2FnZV9idXMnO1xuXG5hc3luYyBmdW5jdGlvbiBpbml0aWF0ZUNocm9taXVtKHNjcmlwdFBhdGg6IHN0cmluZykge1xuICAgIENsaWVudFNlbmQoRXhlY3V0ZUNzc09uUGFnZSwge1xuICAgICAgICBwYXRoOiAnc3JjL2dsb2JhbC5jc3MnLFxuICAgIH0pO1xuXG4gICAgQ2xpZW50U2VuZChFeGVjdXRlU2NyaXB0T25QYWdlLCB7XG4gICAgICAgIHBhdGg6IHNjcmlwdFBhdGgsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYXRlRmlyZWZveChzY3JpcHRQYXRoOiBzdHJpbmcpIHtcbiAgICBnX1Bvc3RNZXNzYWdlQnVzLmhhbmRsZVJlcXVlc3RzKCk7XG5cbiAgICAvLyBXaHkgZG8gd2UgbmVlZCB0byB1c2UgbWFudWFsIERPTSBzY3JpcHQgaW5qZWN0aW9uIGFuZFxuICAgIC8vIGZldGNoIHRoZSB0ZXh0IG9mIHRoZSBzY3JpcHQ/XG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jc2Zsb2F0L2V4dGVuc2lvbi9pc3N1ZXMvMTU1I2lzc3VlY29tbWVudC0xNjM5NzgxOTE0XG5cbiAgICAvLyBXZSB3YW50IHRvIGluamVjdCB0aGUgSUQgb2YgdGhlIGV4dGVuc2lvblxuICAgIGNvbnN0IGlkID0gYnJvd3Nlci5ydW50aW1lLmlkO1xuICAgIGNvbnN0IG1vZGVsVXJsID0gYnJvd3Nlci5ydW50aW1lLmdldFVSTCgnc3JjL21vZGVsX2ZyYW1lLmh0bWwnKTtcbiAgICBjb25zdCBlbnRyeVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIGVudHJ5U2NyaXB0LmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgXG4gICAgICAgIHdpbmRvdy5DU0ZMT0FUX0VYVEVOU0lPTl9JRCA9ICcke2lkfSc7XG4gICAgICAgIHdpbmRvdy5DU0ZMT0FUX01PREVMX0ZSQU1FX1VSTCA9ICcke21vZGVsVXJsfSc7XG4gICAgYClcbiAgICApO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW50cnlTY3JpcHQpO1xuXG4gICAgY29uc3Qgc2NyaXB0UmVzcCA9IGF3YWl0IENsaWVudFNlbmQoRmV0Y2hFeHRlbnNpb25GaWxlLCB7XG4gICAgICAgIHBhdGg6IHNjcmlwdFBhdGgsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2NyaXB0UmVzcC50ZXh0KSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gICAgY29uc3Qgc3R5bGVSZXNwID0gYXdhaXQgQ2xpZW50U2VuZChGZXRjaEV4dGVuc2lvbkZpbGUsIHtcbiAgICAgICAgcGF0aDogJ3NyYy9nbG9iYWwuY3NzJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHlsZVJlc3AudGV4dCkpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhZ2Ugc2NyaXB0LCBleGVjdXRpbmcgaXQgaW4gdGhlIHBhZ2UgY29udGV4dCBpZiBuZWNlc3NhcnlcbiAqXG4gKiBAcGFyYW0gc2NyaXB0UGF0aCBSZWxhdGl2ZSBwYXRoIG9mIHRoZSBzY3JpcHQgKGFsd2F5cyBpbiAuanMpXG4gKiBAcGFyYW0gaWZQYWdlIEZuIHRvIHJ1biBpZiB3ZSBhcmUgaW4gdGhlIHBhZ2UncyBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdChzY3JpcHRQYXRoOiBzdHJpbmcsIGlmUGFnZTogKCkgPT4gYW55KSB7XG4gICAgLy8gRG9uJ3QgYWxsb3cgdGhlIHBhZ2Ugc2NyaXB0IHRvIHJ1biB0aGlzLlxuICAgIGlmIChpblBhZ2VDb250ZXh0KCkpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBTZXQgZ2xvYmFsIGlkZW50aWZpZXIgZm9yIG90aGVyIGV4dGVuc2lvbnMgdG8gdXNlXG4gICAgICAgIHdpbmRvdy5jc2Zsb2F0ID0gdHJ1ZTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBEZXByZWNhdGVkIG5hbWVcbiAgICAgICAgd2luZG93LmNzZ29mbG9hdCA9IHRydWU7XG5cbiAgICAgICAgaWZQYWdlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNGaXJlZm94KCkpIHtcbiAgICAgICAgYXdhaXQgaW5pdGlhdGVGaXJlZm94KHNjcmlwdFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGluaXRpYXRlQ2hyb21pdW0oc2NyaXB0UGF0aCk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYyBDU0Zsb2F0IE1hcmtldCBDaGVja2VyICh2JHtjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLnZlcnNpb259KSBieSBTdGVwNzc1MCBgLFxuICAgICAgICAnYmFja2dyb3VuZDogIzAwNDU5NDsgY29sb3I6ICNmZmY7J1xuICAgICk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAgICclYyBDaGFuZ2Vsb2cgY2FuIGJlIGZvdW5kIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9jc2Zsb2F0L2V4dGVuc2lvbiAnLFxuICAgICAgICAnYmFja2dyb3VuZDogIzAwNDU5NDsgY29sb3I6ICNmZmY7J1xuICAgICk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=