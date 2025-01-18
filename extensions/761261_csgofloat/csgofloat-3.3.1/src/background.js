/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 6:
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

/***/ 398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnnotateOffer": () => (/* binding */ AnnotateOffer)
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


const AnnotateOffer = new _main__WEBPACK_IMPORTED_MODULE_0__.SimpleHandler(_types__WEBPACK_IMPORTED_MODULE_1__.RequestType.ANNOTATE_OFFER, (req) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch(`https://csfloat.com/api/v1/trades/annotate-offer`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    });
    if (resp.status !== 200) {
        throw new Error('invalid status');
    }
    return resp.json();
}));


/***/ }),

/***/ 11:
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

/***/ 2:
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

/***/ 13:
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


/***/ }),

/***/ 12:
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

/***/ 39:
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

/***/ 395:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FetchPendingTrades": () => (/* binding */ FetchPendingTrades)
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


const FetchPendingTrades = new _main__WEBPACK_IMPORTED_MODULE_0__.SimpleHandler(_types__WEBPACK_IMPORTED_MODULE_1__.RequestType.FETCH_PENDING_TRADES, (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield fetch(`https://csfloat.com/api/v1/me/pending-trades`, {
            credentials: 'include',
        });
        if (resp.status !== 200) {
            throw new Error('invalid status');
        }
        return resp.json();
    }
    catch (e) {
        // Try the old CSGOFloat URL (in case they have an old session from there)
        // Of note, this can be removed ~1 week after the migration.
        const resp = yield fetch(`https://csgofloat.com/api/v1/me/pending-trades`, {
            credentials: 'include',
        });
        if (resp.status !== 200) {
            throw new Error('invalid status');
        }
        return resp.json();
    }
}));


/***/ }),

/***/ 376:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FetchSkinModel": () => (/* binding */ FetchSkinModel)
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


const FetchSkinModel = new _main__WEBPACK_IMPORTED_MODULE_0__.SimpleHandler(_types__WEBPACK_IMPORTED_MODULE_1__.RequestType.FETCH_SKIN_MODEL, (req) => __awaiter(void 0, void 0, void 0, function* () {
    return fetch(`https://money.csgofloat.com/model?url=${req.inspectLink}`).then((resp) => {
        return resp.json().then((data) => {
            if (resp.ok) {
                return data;
            }
            else {
                throw new Error(data.error);
            }
        });
    });
}));


/***/ }),

/***/ 52:
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


/***/ }),

/***/ 402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HANDLERS_MAP": () => (/* binding */ HANDLERS_MAP)
/* harmony export */ });
/* harmony import */ var _execute_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _fetch_stall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var _fetch_inspect_info__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var _execute_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _storage_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60);
/* harmony import */ var _storage_set__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65);
/* harmony import */ var _fetch_pending_trades__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(395);
/* harmony import */ var _fetch_skin_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(376);
/* harmony import */ var _storage_remove__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(351);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4);
/* harmony import */ var _fetch_extension_file__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(12);
/* harmony import */ var _annotate_offer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(398);
/* harmony import */ var _extension_version__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(13);













const HANDLERS_MAP = {
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.EXECUTE_SCRIPT_ON_PAGE]: _execute_script__WEBPACK_IMPORTED_MODULE_0__.ExecuteScriptOnPage,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.EXECUTE_CSS_ON_PAGE]: _execute_css__WEBPACK_IMPORTED_MODULE_3__.ExecuteCssOnPage,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.FETCH_INSPECT_INFO]: _fetch_inspect_info__WEBPACK_IMPORTED_MODULE_2__.FetchInspectInfo,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.FETCH_STALL]: _fetch_stall__WEBPACK_IMPORTED_MODULE_1__.FetchStall,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.STORAGE_GET]: _storage_get__WEBPACK_IMPORTED_MODULE_4__.StorageGet,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.STORAGE_SET]: _storage_set__WEBPACK_IMPORTED_MODULE_5__.StorageSet,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.STORAGE_REMOVE]: _storage_remove__WEBPACK_IMPORTED_MODULE_8__.StorageRemove,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.FETCH_PENDING_TRADES]: _fetch_pending_trades__WEBPACK_IMPORTED_MODULE_6__.FetchPendingTrades,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.FETCH_SKIN_MODEL]: _fetch_skin_model__WEBPACK_IMPORTED_MODULE_7__.FetchSkinModel,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.FETCH_EXTENSION_FILE]: _fetch_extension_file__WEBPACK_IMPORTED_MODULE_10__.FetchExtensionFile,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.ANNOTATE_OFFER]: _annotate_offer__WEBPACK_IMPORTED_MODULE_11__.AnnotateOffer,
    [_types__WEBPACK_IMPORTED_MODULE_9__.RequestType.EXTENSION_VERSION]: _extension_version__WEBPACK_IMPORTED_MODULE_12__.ExtensionVersion,
};


/***/ }),

/***/ 3:
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

/***/ 60:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageGet": () => (/* binding */ StorageGet)
/* harmony export */ });
/* unused harmony export Get */
/* harmony import */ var _storage_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class StorageGetHandler {
    getType() {
        return _types__WEBPACK_IMPORTED_MODULE_2__.RequestType.STORAGE_GET;
    }
    handleRequest(request, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield _storage_store__WEBPACK_IMPORTED_MODULE_0__.gStore.get(request.key);
            return { value };
        });
    }
}
function Get(row) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield (0,_client__WEBPACK_IMPORTED_MODULE_1__.ClientSend)(new StorageGetHandler(), { key: row.key });
        return resp.value;
    });
}
const StorageGet = new StorageGetHandler();


/***/ }),

/***/ 351:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageRemove": () => (/* binding */ StorageRemove)
/* harmony export */ });
/* unused harmony export Remove */
/* harmony import */ var _storage_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class StorageRemoveHandler {
    getType() {
        return _types__WEBPACK_IMPORTED_MODULE_2__.RequestType.STORAGE_REMOVE;
    }
    handleRequest(request, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            yield _storage_store__WEBPACK_IMPORTED_MODULE_0__.gStore.remove(request.key);
            return {};
        });
    }
}
const StorageRemove = new StorageRemoveHandler();
function Remove(row) {
    return (0,_client__WEBPACK_IMPORTED_MODULE_1__.ClientSend)(StorageRemove, { key: row.key });
}


/***/ }),

/***/ 65:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageSet": () => (/* binding */ StorageSet)
/* harmony export */ });
/* unused harmony export Set */
/* harmony import */ var _storage_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class StorageSetHandler {
    getType() {
        return _types__WEBPACK_IMPORTED_MODULE_2__.RequestType.STORAGE_SET;
    }
    handleRequest(request, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            yield _storage_store__WEBPACK_IMPORTED_MODULE_0__.gStore.set(request.key, request.value);
            return {};
        });
    }
}
const StorageSet = new StorageSetHandler();
function Set(row, value) {
    return (0,_client__WEBPACK_IMPORTED_MODULE_1__.ClientSend)(StorageSet, { key: row.key, value });
}


/***/ }),

/***/ 4:
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

/***/ 401:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Handle": () => (/* binding */ Handle)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _handlers_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(402);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function findHandler(type) {
    return _handlers_handlers__WEBPACK_IMPORTED_MODULE_1__.HANDLERS_MAP[type];
}
function Handle(blob, sender) {
    return __awaiter(this, void 0, void 0, function* () {
        if (blob.version !== _types__WEBPACK_IMPORTED_MODULE_0__.Version.V1) {
            // Ignore messages that aren't for this bridge
            return;
        }
        const req = blob;
        const handler = findHandler(req.request_type);
        if (!handler) {
            throw new Error(`couldn't find handler for request type ${req.request_type}`);
        }
        return handler.handleRequest(req.request, sender);
    });
}


/***/ }),

/***/ 7:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Version": () => (/* binding */ Version)
/* harmony export */ });
var Version;
(function (Version) {
    Version["V1"] = "CSFLOAT_V1";
})(Version || (Version = {}));


/***/ }),

/***/ 5:
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

/***/ 10:
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

/***/ 61:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gStore": () => (/* binding */ gStore)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Store {
    // Prefer to use sync storage if possible
    get storage() {
        return chrome.storage.sync ? chrome.storage.sync : chrome.storage.local;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = yield this.storage.get(key);
            if (!a || !(key in a)) {
                return null;
            }
            try {
                return JSON.parse(a[key]);
            }
            catch (e) {
                // Fallback if this is an old key not stored as JSON
                return a[key];
            }
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storage.set({ [key]: JSON.stringify(value) });
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storage.remove([key]);
        });
    }
}
const gStore = new Store();


/***/ }),

/***/ 8:
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

/***/ 9:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inPageContext": () => (/* binding */ inPageContext)
/* harmony export */ });
function inPageContext() {
    return typeof chrome === 'undefined' || !chrome.extension;
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony import */ var _lib_bridge_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(401);

function unifiedHandler(request, sender, sendResponse) {
    (0,_lib_bridge_server__WEBPACK_IMPORTED_MODULE_0__.Handle)(request, sender)
        .then((response) => {
        sendResponse({
            request_type: request.request_type,
            id: request.id,
            response,
        });
    })
        .catch((error) => {
        sendResponse({
            request_type: request.request_type,
            id: request.id,
            error: error.toString(),
        });
    });
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    unifiedHandler(request, sender, sendResponse);
    return true;
});
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    unifiedHandler(request, sender, sendResponse);
    return true;
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixFQUFFLFlBQXNDO0lBQy9GLDBEQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztTQUNsQixJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNmLFlBQVksQ0FBQztZQUNULFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNsQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDZCxRQUFRO1NBQ2UsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2IsWUFBWSxDQUFDO1lBQ1QsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ2xDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFO1NBQ0EsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUU7SUFDbkUsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDOUMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUU7SUFDM0UsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDOUMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvYW5ub3RhdGVfb2ZmZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9jc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZXh0ZW5zaW9uX3ZlcnNpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZmV0Y2hfZXh0ZW5zaW9uX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZmV0Y2hfaW5zcGVjdF9pbmZvLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2ZldGNoX3BlbmRpbmdfdHJhZGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2ZldGNoX3NraW5fbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvZmV0Y2hfc3RhbGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvaGFuZGxlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9zdG9yYWdlX2dldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9zdG9yYWdlX3JlbW92ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9zdG9yYWdlX3NldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy90eXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2Uvd3JhcHBlcnMvcHJpdmlsZWdlZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2J1cy9wb3N0X21lc3NhZ2VfYnVzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc3RvcmFnZS9zdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL2RldGVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL3NuaXBzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW50ZXJuYWxSZXF1ZXN0QnVuZGxlLCBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlLCBSZXF1ZXN0SGFuZGxlciwgVmVyc2lvbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge2lzRmlyZWZveCwgcnVudGltZU5hbWVzcGFjZX0gZnJvbSAnLi4vdXRpbHMvZGV0ZWN0JztcbmltcG9ydCB7aW5QYWdlQ29udGV4dH0gZnJvbSAnLi4vdXRpbHMvc25pcHMnO1xuaW1wb3J0IHtnX1Bvc3RNZXNzYWdlQnVzfSBmcm9tICcuLi9idXMvcG9zdF9tZXNzYWdlX2J1cyc7XG5cbmZ1bmN0aW9uIGNhblVzZVNlbmRNZXNzYWdlKCkge1xuICAgIC8vIE5vdCBzdXBwb3J0ZWQgaW4gRmlyZWZveCBQYWdlIENvbnRleHRcbiAgICByZXR1cm4gIShpc0ZpcmVmb3goKSAmJiBpblBhZ2VDb250ZXh0KCkpO1xufVxuXG4vKipcbiAqIFNlbmQgYSByZXF1ZXN0IHRvIGJlIGhhbmRsZWQgYnkgdGhlIGJhY2tncm91bmQgd29ya2VyXG4gKlxuICogQ2FuIGJlIGNhbGxlZCBmcm9tIGEgY29udGVudCBzY3JpcHQgb3IgcGFnZSBpdHNlbGZcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIENsaWVudFNlbmQ8UmVxLCBSZXNwPihoYW5kbGVyOiBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+LCBhcmdzOiBSZXEpOiBQcm9taXNlPFJlc3A+IHtcbiAgICBjb25zdCBidW5kbGU6IEludGVybmFsUmVxdWVzdEJ1bmRsZSA9IHtcbiAgICAgICAgdmVyc2lvbjogVmVyc2lvbi5WMSxcbiAgICAgICAgcmVxdWVzdF90eXBlOiBoYW5kbGVyLmdldFR5cGUoKSxcbiAgICAgICAgcmVxdWVzdDogYXJncyxcbiAgICAgICAgaWQ6IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwMDAwKSxcbiAgICB9O1xuXG4gICAgaWYgKGNhblVzZVNlbmRNZXNzYWdlKCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgQmFkIHR5cGVzXG4gICAgICAgICAgICBydW50aW1lTmFtZXNwYWNlKCkucnVudGltZS5zZW5kTWVzc2FnZShcbiAgICAgICAgICAgICAgICB3aW5kb3cuQ1NGTE9BVF9FWFRFTlNJT05fSUQgfHwgY2hyb21lLnJ1bnRpbWUuaWQsXG4gICAgICAgICAgICAgICAgYnVuZGxlLFxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgQmFkIHR5cGVzXG4gICAgICAgICAgICAgICAgKHJlc3A6IEludGVybmFsUmVzcG9uc2VCdW5kbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3A/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3AucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3A/LmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZhbGxiYWNrIHRvIHBvc3RtZXNzYWdlIGJ1cyBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBpbXBsZW1lbnRcbiAgICAgICAgLy8gc3BlY3MgZnVsbHlcbiAgICAgICAgcmV0dXJuIGdfUG9zdE1lc3NhZ2VCdXMuc2VuZFJlcXVlc3QoYnVuZGxlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1NpbXBsZUhhbmRsZXJ9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBBbm5vdGF0ZU9mZmVyUmVxdWVzdCB7XG4gICAgYXNzZXRzX3RvX3NlbmQ6IHN0cmluZ1tdO1xuICAgIGFzc2V0c190b19yZWNlaXZlOiBzdHJpbmdbXTtcbiAgICBvZmZlcl9pZDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFubm90YXRlT2ZmZXJSZXNwb25zZSB7fVxuXG5leHBvcnQgY29uc3QgQW5ub3RhdGVPZmZlciA9IG5ldyBTaW1wbGVIYW5kbGVyPEFubm90YXRlT2ZmZXJSZXF1ZXN0LCBBbm5vdGF0ZU9mZmVyUmVzcG9uc2U+KFxuICAgIFJlcXVlc3RUeXBlLkFOTk9UQVRFX09GRkVSLFxuICAgIGFzeW5jIChyZXEpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKGBodHRwczovL2NzZmxvYXQuY29tL2FwaS92MS90cmFkZXMvYW5ub3RhdGUtb2ZmZXJgLCB7XG4gICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXEpLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcC5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHN0YXR1cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3AuanNvbigpIGFzIFByb21pc2U8QW5ub3RhdGVPZmZlclJlc3BvbnNlPjtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHtFbXB0eVJlc3BvbnNlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtQcml2aWxlZ2VkSGFuZGxlcn0gZnJvbSAnLi4vd3JhcHBlcnMvcHJpdmlsZWdlZCc7XG5cbmludGVyZmFjZSBFeGVjdXRlQ3NzUmVxdWVzdCB7XG4gICAgcGF0aDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRXhlY3V0ZUNzc09uUGFnZSA9IG5ldyBQcml2aWxlZ2VkSGFuZGxlcihcbiAgICBuZXcgRW1wdHlSZXNwb25zZUhhbmRsZXI8RXhlY3V0ZUNzc1JlcXVlc3Q+KFJlcXVlc3RUeXBlLkVYRUNVVEVfQ1NTX09OX1BBR0UsIGFzeW5jIChyZXEsIHNlbmRlcikgPT4ge1xuICAgICAgICBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmluc2VydENTUyh7XG4gICAgICAgICAgICB0YXJnZXQ6IHt0YWJJZDogc2VuZGVyLnRhYj8uaWQgYXMgbnVtYmVyfSxcbiAgICAgICAgICAgIGZpbGVzOiBbcmVxLnBhdGhdLFxuICAgICAgICB9KTtcbiAgICB9KVxuKTtcbiIsImltcG9ydCB7RW1wdHlSZXNwb25zZUhhbmRsZXJ9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7UHJpdmlsZWdlZEhhbmRsZXJ9IGZyb20gJy4uL3dyYXBwZXJzL3ByaXZpbGVnZWQnO1xuXG5pbnRlcmZhY2UgRXhlY3V0ZVNjcmlwdFJlcXVlc3Qge1xuICAgIHBhdGg6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEV4ZWN1dGVTY3JpcHRPblBhZ2UgPSBuZXcgUHJpdmlsZWdlZEhhbmRsZXIoXG4gICAgbmV3IEVtcHR5UmVzcG9uc2VIYW5kbGVyPEV4ZWN1dGVTY3JpcHRSZXF1ZXN0PihSZXF1ZXN0VHlwZS5FWEVDVVRFX1NDUklQVF9PTl9QQUdFLCBhc3luYyAocmVxLCBzZW5kZXIpID0+IHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBpbmplY3QgdGhlIGV4dGVuc2lvbiBJRCBkeW5hbWljYWxseSBzbyB0aGUgY2xpZW50IGtub3dzIHdobyB0b1xuICAgICAgICAvLyBjb21tdW5pY2F0ZSB3aXRoLlxuICAgICAgICAvL1xuICAgICAgICAvLyBPbiBGaXJlZm94LCBleHRlbnNpb24gSURzIGFyZSByYW5kb20sIHNvIHRoaXMgaXMgbmVjZXNzYXJ5LlxuICAgICAgICBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgdGFyZ2V0OiB7dGFiSWQ6IHNlbmRlci50YWI/LmlkIGFzIG51bWJlcn0sXG4gICAgICAgICAgICB3b3JsZDogJ01BSU4nLFxuICAgICAgICAgICAgYXJnczogW2Nocm9tZS5ydW50aW1lLmlkLCBjaHJvbWUucnVudGltZS5nZXRVUkwoJ3NyYy9tb2RlbF9mcmFtZS5odG1sJyldLFxuICAgICAgICAgICAgZnVuYzogZnVuY3Rpb24gRXh0ZW5zaW9uSWQoZXh0ZW5zaW9uSWQsIG1vZGVsRnJhbWVVcmwpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuQ1NGTE9BVF9FWFRFTlNJT05fSUQgPSBleHRlbnNpb25JZDtcbiAgICAgICAgICAgICAgICB3aW5kb3cuQ1NGTE9BVF9NT0RFTF9GUkFNRV9VUkwgPSBtb2RlbEZyYW1lVXJsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgICAgIHRhcmdldDoge3RhYklkOiBzZW5kZXIudGFiPy5pZCBhcyBudW1iZXJ9LFxuICAgICAgICAgICAgZmlsZXM6IFtyZXEucGF0aF0sXG4gICAgICAgICAgICB3b3JsZDogJ01BSU4nLFxuICAgICAgICB9KTtcbiAgICB9KVxuKTtcbiIsImltcG9ydCB7RW1wdHlSZXF1ZXN0SGFuZGxlciwgU2ltcGxlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtBbm5vdGF0ZU9mZmVyUmVxdWVzdCwgQW5ub3RhdGVPZmZlclJlc3BvbnNlfSBmcm9tICcuL2Fubm90YXRlX29mZmVyJztcbmltcG9ydCB7cnVudGltZU5hbWVzcGFjZX0gZnJvbSAnLi4vLi4vdXRpbHMvZGV0ZWN0JztcblxuZXhwb3J0IGludGVyZmFjZSBFeHRlbnNpb25WZXJzaW9uUmVzcG9uc2Uge1xuICAgIHZlcnNpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEV4dGVuc2lvblZlcnNpb24gPSBuZXcgRW1wdHlSZXF1ZXN0SGFuZGxlcjxFeHRlbnNpb25WZXJzaW9uUmVzcG9uc2U+KFxuICAgIFJlcXVlc3RUeXBlLkVYVEVOU0lPTl9WRVJTSU9OLFxuICAgIGFzeW5jIChyZXEpID0+IHtcbiAgICAgICAgY29uc3QgbWFuaWZlc3QgPSBydW50aW1lTmFtZXNwYWNlKCkucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVyc2lvbjogbWFuaWZlc3QudmVyc2lvbixcbiAgICAgICAgfTtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHtTaW1wbGVIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1ByaXZpbGVnZWRIYW5kbGVyfSBmcm9tICcuLi93cmFwcGVycy9wcml2aWxlZ2VkJztcblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEV4dGVuc2lvbkZpbGVSZXF1ZXN0IHtcbiAgICBwYXRoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hFeHRlbnNpb25GaWxlUmVzcG9uc2Uge1xuICAgIHRleHQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEZldGNoRXh0ZW5zaW9uRmlsZSA9IG5ldyBQcml2aWxlZ2VkSGFuZGxlcihcbiAgICBuZXcgU2ltcGxlSGFuZGxlcjxGZXRjaEV4dGVuc2lvbkZpbGVSZXF1ZXN0LCBGZXRjaEV4dGVuc2lvbkZpbGVSZXNwb25zZT4oXG4gICAgICAgIFJlcXVlc3RUeXBlLkZFVENIX0VYVEVOU0lPTl9GSUxFLFxuICAgICAgICBhc3luYyAocmVxKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjaHJvbWUucnVudGltZS5nZXRVUkwocmVxLnBhdGgpO1xuICAgICAgICAgICAgY29uc3QgciA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgci50ZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgKVxuKTtcbiIsImltcG9ydCB7U2ltcGxlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgU3RpY2tlciB7XG4gICAgc2xvdDogbnVtYmVyO1xuICAgIHN0aWNrZXJJZDogbnVtYmVyO1xuICAgIGNvZGVuYW1lPzogc3RyaW5nO1xuICAgIG1hdGVyaWFsPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgd2Vhcj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJdGVtSW5mbyB7XG4gICAgc3RpY2tlcnM6IFN0aWNrZXJbXTtcbiAgICBpdGVtaWQ6IHN0cmluZztcbiAgICBkZWZpbmRleDogbnVtYmVyO1xuICAgIHBhaW50aW5kZXg6IG51bWJlcjtcbiAgICByYXJpdHk6IG51bWJlcjtcbiAgICBxdWFsaXR5OiBudW1iZXI7XG4gICAgcGFpbnRzZWVkOiBudW1iZXI7XG4gICAgaW52ZW50b3J5OiBudW1iZXI7XG4gICAgb3JpZ2luOiBudW1iZXI7XG4gICAgczogc3RyaW5nO1xuICAgIGE6IHN0cmluZztcbiAgICBkOiBzdHJpbmc7XG4gICAgbTogc3RyaW5nO1xuICAgIGZsb2F0dmFsdWU6IG51bWJlcjtcbiAgICBpbWFnZXVybDogc3RyaW5nO1xuICAgIG1pbjogbnVtYmVyO1xuICAgIG1heDogbnVtYmVyO1xuICAgIHdlYXBvbl90eXBlPzogc3RyaW5nO1xuICAgIGl0ZW1fbmFtZT86IHN0cmluZztcbiAgICByYXJpdHlfbmFtZT86IHN0cmluZztcbiAgICBxdWFsaXR5X25hbWU/OiBzdHJpbmc7XG4gICAgb3JpZ2luX25hbWU/OiBzdHJpbmc7XG4gICAgd2Vhcl9uYW1lPzogc3RyaW5nO1xuICAgIGZ1bGxfaXRlbV9uYW1lPzogc3RyaW5nO1xuICAgIGxvd19yYW5rPzogbnVtYmVyO1xuICAgIGhpZ2hfcmFuaz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEluc3BlY3RJbmZvUmVxdWVzdCB7XG4gICAgbGluazogc3RyaW5nO1xuICAgIGxpc3RQcmljZT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEluc3BlY3RJbmZvUmVzcG9uc2Uge1xuICAgIGl0ZW1pbmZvOiBJdGVtSW5mbztcbiAgICBlcnJvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEZldGNoSW5zcGVjdEluZm8gPSBuZXcgU2ltcGxlSGFuZGxlcjxGZXRjaEluc3BlY3RJbmZvUmVxdWVzdCwgRmV0Y2hJbnNwZWN0SW5mb1Jlc3BvbnNlPihcbiAgICBSZXF1ZXN0VHlwZS5GRVRDSF9JTlNQRUNUX0lORk8sXG4gICAgKHJlcSkgPT4ge1xuICAgICAgICBjb25zdCBhcGlVcmwgPSBgaHR0cHM6Ly9hcGkuY3NmbG9hdC5jb20vP3VybD0ke3JlcS5saW5rfSZtaW5pbWFsPXRydWUke1xuICAgICAgICAgICAgcmVxLmxpc3RQcmljZSA/ICcmbGlzdFByaWNlPScgKyByZXEubGlzdFByaWNlIDogJydcbiAgICAgICAgfWA7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVcmwpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXNwLmpzb24oKS50aGVuKChqc29uOiBGZXRjaEluc3BlY3RJbmZvUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5vaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihqc29uLmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSBhcyBQcm9taXNlPEZldGNoSW5zcGVjdEluZm9SZXNwb25zZT47XG4gICAgICAgIH0pO1xuICAgIH1cbik7XG4iLCJpbXBvcnQge1NpbXBsZUhhbmRsZXJ9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1RyYWRlfSBmcm9tICcuLi8uLi90eXBlcy9mbG9hdF9tYXJrZXQnO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hQZW5kaW5nVHJhZGVzUmVxdWVzdCB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoUGVuZGluZ1RyYWRlc1Jlc3BvbnNlIHtcbiAgICB0cmFkZXNfdG9fc2VuZDogVHJhZGVbXTtcbiAgICB0cmFkZXNfdG9fcmVjZWl2ZTogVHJhZGVbXTtcbn1cblxuZXhwb3J0IGNvbnN0IEZldGNoUGVuZGluZ1RyYWRlcyA9IG5ldyBTaW1wbGVIYW5kbGVyPEZldGNoUGVuZGluZ1RyYWRlc1JlcXVlc3QsIEZldGNoUGVuZGluZ1RyYWRlc1Jlc3BvbnNlPihcbiAgICBSZXF1ZXN0VHlwZS5GRVRDSF9QRU5ESU5HX1RSQURFUyxcbiAgICBhc3luYyAocmVxKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vY3NmbG9hdC5jb20vYXBpL3YxL21lL3BlbmRpbmctdHJhZGVzYCwge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJlc3Auc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3RhdHVzJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNwLmpzb24oKSBhcyBQcm9taXNlPEZldGNoUGVuZGluZ1RyYWRlc1Jlc3BvbnNlPjtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRoZSBvbGQgQ1NHT0Zsb2F0IFVSTCAoaW4gY2FzZSB0aGV5IGhhdmUgYW4gb2xkIHNlc3Npb24gZnJvbSB0aGVyZSlcbiAgICAgICAgICAgIC8vIE9mIG5vdGUsIHRoaXMgY2FuIGJlIHJlbW92ZWQgfjEgd2VlayBhZnRlciB0aGUgbWlncmF0aW9uLlxuICAgICAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKGBodHRwczovL2NzZ29mbG9hdC5jb20vYXBpL3YxL21lL3BlbmRpbmctdHJhZGVzYCwge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJlc3Auc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3RhdHVzJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNwLmpzb24oKTtcbiAgICAgICAgfVxuICAgIH1cbik7XG4iLCJpbXBvcnQge1NpbXBsZUhhbmRsZXJ9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaFNraW5Nb2RlbFJlcXVlc3Qge1xuICAgIGluc3BlY3RMaW5rOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hTa2luTW9kZWxSZXNwb25zZSB7XG4gICAgbW9kZWxMaW5rOiBzdHJpbmc7XG4gICAgc2NyZWVuc2hvdExpbms6IHN0cmluZztcblxuICAgIGVycm9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRmV0Y2hTa2luTW9kZWwgPSBuZXcgU2ltcGxlSGFuZGxlcjxGZXRjaFNraW5Nb2RlbFJlcXVlc3QsIEZldGNoU2tpbk1vZGVsUmVzcG9uc2U+KFxuICAgIFJlcXVlc3RUeXBlLkZFVENIX1NLSU5fTU9ERUwsXG4gICAgYXN5bmMgKHJlcSkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHBzOi8vbW9uZXkuY3Nnb2Zsb2F0LmNvbS9tb2RlbD91cmw9JHtyZXEuaW5zcGVjdExpbmt9YCkudGhlbigocmVzcCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3AuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5vaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkgYXMgUHJvbWlzZTxGZXRjaFNraW5Nb2RlbFJlc3BvbnNlPjtcbiAgICAgICAgfSk7XG4gICAgfVxuKTtcbiIsImltcG9ydCB7U2ltcGxlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7Q29udHJhY3R9IGZyb20gJy4uLy4uL3R5cGVzL2Zsb2F0X21hcmtldCc7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaFN0YWxsUmVxdWVzdCB7XG4gICAgc3RlYW1faWQ2NDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoU3RhbGxSZXNwb25zZSB7XG4gICAgZGF0YT86IENvbnRyYWN0W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hTdGFsbFJlc3BvbnNlRXJyb3Ige1xuICAgIGNvZGU/OiBzdHJpbmc7XG4gICAgbWVzc2FnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEZldGNoU3RhbGwgPSBuZXcgU2ltcGxlSGFuZGxlcjxGZXRjaFN0YWxsUmVxdWVzdCwgRmV0Y2hTdGFsbFJlc3BvbnNlPihcbiAgICBSZXF1ZXN0VHlwZS5GRVRDSF9TVEFMTCxcbiAgICBhc3luYyAocmVxKSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cHM6Ly9jc2Zsb2F0LmNvbS9hcGkvdjEvdXNlcnMvJHtyZXEuc3RlYW1faWQ2NH0vc3RhbGxgKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcC5qc29uKCkudGhlbigoanNvbjogRmV0Y2hTdGFsbFJlc3BvbnNlIHwgRmV0Y2hTdGFsbFJlc3BvbnNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5vaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigoanNvbiBhcyBGZXRjaFN0YWxsUmVzcG9uc2VFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkgYXMgUHJvbWlzZTxGZXRjaFN0YWxsUmVzcG9uc2U+O1xuICAgICAgICB9KTtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHtFeGVjdXRlU2NyaXB0T25QYWdlfSBmcm9tICcuL2V4ZWN1dGVfc2NyaXB0JztcbmltcG9ydCB7RmV0Y2hTdGFsbH0gZnJvbSAnLi9mZXRjaF9zdGFsbCc7XG5pbXBvcnQge0ZldGNoSW5zcGVjdEluZm99IGZyb20gJy4vZmV0Y2hfaW5zcGVjdF9pbmZvJztcbmltcG9ydCB7RXhlY3V0ZUNzc09uUGFnZX0gZnJvbSAnLi9leGVjdXRlX2Nzcyc7XG5pbXBvcnQge1N0b3JhZ2VHZXR9IGZyb20gJy4vc3RvcmFnZV9nZXQnO1xuaW1wb3J0IHtTdG9yYWdlU2V0fSBmcm9tICcuL3N0b3JhZ2Vfc2V0JztcbmltcG9ydCB7UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7RmV0Y2hQZW5kaW5nVHJhZGVzfSBmcm9tICcuL2ZldGNoX3BlbmRpbmdfdHJhZGVzJztcbmltcG9ydCB7RmV0Y2hTa2luTW9kZWx9IGZyb20gJy4vZmV0Y2hfc2tpbl9tb2RlbCc7XG5pbXBvcnQge1N0b3JhZ2VSZW1vdmV9IGZyb20gJy4vc3RvcmFnZV9yZW1vdmUnO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge0ZldGNoRXh0ZW5zaW9uRmlsZX0gZnJvbSAnLi9mZXRjaF9leHRlbnNpb25fZmlsZSc7XG5pbXBvcnQge0Fubm90YXRlT2ZmZXJ9IGZyb20gJy4vYW5ub3RhdGVfb2ZmZXInO1xuaW1wb3J0IHtFeHRlbnNpb25WZXJzaW9ufSBmcm9tICcuL2V4dGVuc2lvbl92ZXJzaW9uJztcblxuZXhwb3J0IGNvbnN0IEhBTkRMRVJTX01BUDoge1trZXkgaW4gUmVxdWVzdFR5cGVdOiBSZXF1ZXN0SGFuZGxlcjxhbnksIGFueT59ID0ge1xuICAgIFtSZXF1ZXN0VHlwZS5FWEVDVVRFX1NDUklQVF9PTl9QQUdFXTogRXhlY3V0ZVNjcmlwdE9uUGFnZSxcbiAgICBbUmVxdWVzdFR5cGUuRVhFQ1VURV9DU1NfT05fUEFHRV06IEV4ZWN1dGVDc3NPblBhZ2UsXG4gICAgW1JlcXVlc3RUeXBlLkZFVENIX0lOU1BFQ1RfSU5GT106IEZldGNoSW5zcGVjdEluZm8sXG4gICAgW1JlcXVlc3RUeXBlLkZFVENIX1NUQUxMXTogRmV0Y2hTdGFsbCxcbiAgICBbUmVxdWVzdFR5cGUuU1RPUkFHRV9HRVRdOiBTdG9yYWdlR2V0LFxuICAgIFtSZXF1ZXN0VHlwZS5TVE9SQUdFX1NFVF06IFN0b3JhZ2VTZXQsXG4gICAgW1JlcXVlc3RUeXBlLlNUT1JBR0VfUkVNT1ZFXTogU3RvcmFnZVJlbW92ZSxcbiAgICBbUmVxdWVzdFR5cGUuRkVUQ0hfUEVORElOR19UUkFERVNdOiBGZXRjaFBlbmRpbmdUcmFkZXMsXG4gICAgW1JlcXVlc3RUeXBlLkZFVENIX1NLSU5fTU9ERUxdOiBGZXRjaFNraW5Nb2RlbCxcbiAgICBbUmVxdWVzdFR5cGUuRkVUQ0hfRVhURU5TSU9OX0ZJTEVdOiBGZXRjaEV4dGVuc2lvbkZpbGUsXG4gICAgW1JlcXVlc3RUeXBlLkFOTk9UQVRFX09GRkVSXTogQW5ub3RhdGVPZmZlcixcbiAgICBbUmVxdWVzdFR5cGUuRVhURU5TSU9OX1ZFUlNJT05dOiBFeHRlbnNpb25WZXJzaW9uLFxufTtcbiIsImltcG9ydCB7UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgU2ltcGxlSGFuZGxlcjxSZXEsIFJlc3A+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBSZXF1ZXN0VHlwZSwgcHJpdmF0ZSBoYW5kbGVyOiAocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpID0+IFByb21pc2U8UmVzcD4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXF1ZXN0KHJlcXVlc3Q6IFJlcSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKTogUHJvbWlzZTxSZXNwPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCwgc2VuZGVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1wdHkge31cblxuZXhwb3J0IGNsYXNzIEVtcHR5UmVxdWVzdEhhbmRsZXI8UmVzcD4gaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxFbXB0eSwgUmVzcD4ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogUmVxdWVzdFR5cGUsIHByaXZhdGUgaGFuZGxlcjogKHNlbmRlcjogTWVzc2FnZVNlbmRlcikgPT4gUHJvbWlzZTxSZXNwPikge31cblxuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogRW1wdHksIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8UmVzcD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHNlbmRlcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1wdHlSZXNwb25zZUhhbmRsZXI8UmVxPiBpbXBsZW1lbnRzIFJlcXVlc3RIYW5kbGVyPFJlcSwgdm9pZD4ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogUmVxdWVzdFR5cGUsIHByaXZhdGUgaGFuZGxlcjogKHJlcXVlc3Q6IFJlcSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKSA9PiBQcm9taXNlPHZvaWQ+KSB7fVxuXG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHJlcXVlc3QsIHNlbmRlcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtnU3RvcmV9IGZyb20gJy4uLy4uL3N0b3JhZ2Uvc3RvcmUnO1xuaW1wb3J0IHtDbGllbnRTZW5kfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHtEeW5hbWljU3RvcmFnZUtleSwgU3RvcmFnZUtleSwgU3RvcmFnZVJvd30gZnJvbSAnLi4vLi4vc3RvcmFnZS9rZXlzJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgU3RvcmFnZUdldFJlcXVlc3Qge1xuICAgIGtleTogU3RvcmFnZUtleSB8IER5bmFtaWNTdG9yYWdlS2V5O1xufVxuXG5pbnRlcmZhY2UgU3RvcmFnZUdldFJlc3BvbnNlPFQ+IHtcbiAgICB2YWx1ZTogVCB8IG51bGw7XG59XG5cbmNsYXNzIFN0b3JhZ2VHZXRIYW5kbGVyPFQ+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8U3RvcmFnZUdldFJlcXVlc3QsIFN0b3JhZ2VHZXRSZXNwb25zZTxUPj4ge1xuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGUge1xuICAgICAgICByZXR1cm4gUmVxdWVzdFR5cGUuU1RPUkFHRV9HRVQ7XG4gICAgfVxuXG4gICAgYXN5bmMgaGFuZGxlUmVxdWVzdChcbiAgICAgICAgcmVxdWVzdDogU3RvcmFnZUdldFJlcXVlc3QsXG4gICAgICAgIHNlbmRlcjogY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlclxuICAgICk6IFByb21pc2U8U3RvcmFnZUdldFJlc3BvbnNlPFQ+PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgZ1N0b3JlLmdldDxUPihyZXF1ZXN0LmtleSk7XG4gICAgICAgIHJldHVybiB7dmFsdWV9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdldDxUPihyb3c6IFN0b3JhZ2VSb3c8VD4pOiBQcm9taXNlPFQgfCBudWxsPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IENsaWVudFNlbmQobmV3IFN0b3JhZ2VHZXRIYW5kbGVyPFQ+KCksIHtrZXk6IHJvdy5rZXl9KTtcbiAgICByZXR1cm4gcmVzcC52YWx1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IFN0b3JhZ2VHZXQgPSBuZXcgU3RvcmFnZUdldEhhbmRsZXIoKTtcbiIsImltcG9ydCB7UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7Z1N0b3JlfSBmcm9tICcuLi8uLi9zdG9yYWdlL3N0b3JlJztcbmltcG9ydCB7Q2xpZW50U2VuZH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7RHluYW1pY1N0b3JhZ2VLZXksIFN0b3JhZ2VLZXksIFN0b3JhZ2VSb3d9IGZyb20gJy4uLy4uL3N0b3JhZ2Uva2V5cyc7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcblxuaW50ZXJmYWNlIFN0b3JhZ2VSZW1vdmVSZXF1ZXN0IHtcbiAgICBrZXk6IFN0b3JhZ2VLZXkgfCBEeW5hbWljU3RvcmFnZUtleTtcbn1cblxuaW50ZXJmYWNlIFN0b3JhZ2VSZW1vdmVSZXNwb25zZSB7fVxuXG5jbGFzcyBTdG9yYWdlUmVtb3ZlSGFuZGxlcjxUPiBpbXBsZW1lbnRzIFJlcXVlc3RIYW5kbGVyPFN0b3JhZ2VSZW1vdmVSZXF1ZXN0LCBTdG9yYWdlUmVtb3ZlUmVzcG9uc2U+IHtcbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIFJlcXVlc3RUeXBlLlNUT1JBR0VfUkVNT1ZFO1xuICAgIH1cblxuICAgIGFzeW5jIGhhbmRsZVJlcXVlc3QoXG4gICAgICAgIHJlcXVlc3Q6IFN0b3JhZ2VSZW1vdmVSZXF1ZXN0LFxuICAgICAgICBzZW5kZXI6IGNocm9tZS5ydW50aW1lLk1lc3NhZ2VTZW5kZXJcbiAgICApOiBQcm9taXNlPFN0b3JhZ2VSZW1vdmVSZXNwb25zZT4ge1xuICAgICAgICBhd2FpdCBnU3RvcmUucmVtb3ZlKHJlcXVlc3Qua2V5KTtcbiAgICAgICAgcmV0dXJuIHt9IGFzIFN0b3JhZ2VSZW1vdmVSZXNwb25zZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBTdG9yYWdlUmVtb3ZlID0gbmV3IFN0b3JhZ2VSZW1vdmVIYW5kbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZW1vdmUocm93OiBTdG9yYWdlUm93PGFueT4pOiBQcm9taXNlPFN0b3JhZ2VSZW1vdmVSZXNwb25zZT4ge1xuICAgIHJldHVybiBDbGllbnRTZW5kKFN0b3JhZ2VSZW1vdmUsIHtrZXk6IHJvdy5rZXl9KTtcbn1cbiIsImltcG9ydCB7UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7Z1N0b3JlfSBmcm9tICcuLi8uLi9zdG9yYWdlL3N0b3JlJztcbmltcG9ydCB7Q2xpZW50U2VuZH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7RHluYW1pY1N0b3JhZ2VLZXksIFN0b3JhZ2VLZXksIFN0b3JhZ2VSb3d9IGZyb20gJy4uLy4uL3N0b3JhZ2Uva2V5cyc7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcblxuaW50ZXJmYWNlIFN0b3JhZ2VTZXRSZXF1ZXN0PFQ+IHtcbiAgICBrZXk6IFN0b3JhZ2VLZXkgfCBEeW5hbWljU3RvcmFnZUtleTtcbiAgICB2YWx1ZTogVDtcbn1cblxuaW50ZXJmYWNlIFN0b3JhZ2VTZXRSZXNwb25zZSB7fVxuXG5jbGFzcyBTdG9yYWdlU2V0SGFuZGxlcjxUPiBpbXBsZW1lbnRzIFJlcXVlc3RIYW5kbGVyPFN0b3JhZ2VTZXRSZXF1ZXN0PFQ+LCBTdG9yYWdlU2V0UmVzcG9uc2U+IHtcbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIFJlcXVlc3RUeXBlLlNUT1JBR0VfU0VUO1xuICAgIH1cblxuICAgIGFzeW5jIGhhbmRsZVJlcXVlc3QoXG4gICAgICAgIHJlcXVlc3Q6IFN0b3JhZ2VTZXRSZXF1ZXN0PFQ+LFxuICAgICAgICBzZW5kZXI6IGNocm9tZS5ydW50aW1lLk1lc3NhZ2VTZW5kZXJcbiAgICApOiBQcm9taXNlPFN0b3JhZ2VTZXRSZXNwb25zZT4ge1xuICAgICAgICBhd2FpdCBnU3RvcmUuc2V0PFQ+KHJlcXVlc3Qua2V5LCByZXF1ZXN0LnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHt9IGFzIFN0b3JhZ2VTZXRSZXNwb25zZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBTdG9yYWdlU2V0ID0gbmV3IFN0b3JhZ2VTZXRIYW5kbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXQ8VD4ocm93OiBTdG9yYWdlUm93PGFueT4sIHZhbHVlOiBUKTogUHJvbWlzZTxTdG9yYWdlU2V0UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gQ2xpZW50U2VuZChTdG9yYWdlU2V0LCB7a2V5OiByb3cua2V5LCB2YWx1ZX0pO1xufVxuIiwiZXhwb3J0IGVudW0gUmVxdWVzdFR5cGUge1xuICAgIEVYRUNVVEVfU0NSSVBUX09OX1BBR0UsXG4gICAgRVhFQ1VURV9DU1NfT05fUEFHRSxcbiAgICBGRVRDSF9JTlNQRUNUX0lORk8sXG4gICAgRkVUQ0hfU1RBTEwsXG4gICAgU1RPUkFHRV9HRVQsXG4gICAgU1RPUkFHRV9TRVQsXG4gICAgU1RPUkFHRV9SRU1PVkUsXG4gICAgRkVUQ0hfUEVORElOR19UUkFERVMsXG4gICAgRkVUQ0hfU0tJTl9NT0RFTCxcbiAgICBGRVRDSF9FWFRFTlNJT05fRklMRSxcbiAgICBBTk5PVEFURV9PRkZFUixcbiAgICBFWFRFTlNJT05fVkVSU0lPTixcbn1cbiIsImltcG9ydCB7SW50ZXJuYWxSZXF1ZXN0QnVuZGxlLCBSZXF1ZXN0SGFuZGxlciwgVmVyc2lvbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgTWVzc2FnZVNlbmRlciA9IGNocm9tZS5ydW50aW1lLk1lc3NhZ2VTZW5kZXI7XG5pbXBvcnQge0hBTkRMRVJTX01BUH0gZnJvbSAnLi9oYW5kbGVycy9oYW5kbGVycyc7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL2hhbmRsZXJzL3R5cGVzJztcblxuZnVuY3Rpb24gZmluZEhhbmRsZXIodHlwZTogUmVxdWVzdFR5cGUpOiBSZXF1ZXN0SGFuZGxlcjxhbnksIGFueT4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBIQU5ETEVSU19NQVBbdHlwZV07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBIYW5kbGUoYmxvYjogYW55LCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChibG9iLnZlcnNpb24gIT09IFZlcnNpb24uVjEpIHtcbiAgICAgICAgLy8gSWdub3JlIG1lc3NhZ2VzIHRoYXQgYXJlbid0IGZvciB0aGlzIGJyaWRnZVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVxOiBJbnRlcm5hbFJlcXVlc3RCdW5kbGUgPSBibG9iIGFzIEludGVybmFsUmVxdWVzdEJ1bmRsZTtcblxuICAgIGNvbnN0IGhhbmRsZXIgPSBmaW5kSGFuZGxlcihyZXEucmVxdWVzdF90eXBlKTtcbiAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb3VsZG4ndCBmaW5kIGhhbmRsZXIgZm9yIHJlcXVlc3QgdHlwZSAke3JlcS5yZXF1ZXN0X3R5cGV9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhbmRsZXIuaGFuZGxlUmVxdWVzdChyZXEucmVxdWVzdCwgc2VuZGVyKTtcbn1cbiIsImltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vaGFuZGxlcnMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RIYW5kbGVyPFJlcSwgUmVzcD4ge1xuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPFJlc3A+O1xuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGU7XG59XG5cbmV4cG9ydCBlbnVtIFZlcnNpb24ge1xuICAgIFYxID0gJ0NTRkxPQVRfVjEnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsUmVxdWVzdEJ1bmRsZSB7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuXG4gICAgcmVxdWVzdF90eXBlOiBSZXF1ZXN0VHlwZTtcblxuICAgIC8vIElucHV0IHJlcXVlc3RcbiAgICByZXF1ZXN0OiBhbnk7XG5cbiAgICAvLyBSYW5kb20gSUQgdG8gaWRlbnRpZnkgdGhlIHJlcXVlc3RcbiAgICBpZDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsUmVzcG9uc2VCdW5kbGUge1xuICAgIHJlcXVlc3RfdHlwZTogUmVxdWVzdFR5cGU7XG5cbiAgICAvLyBSZXNwb25zZVxuICAgIHJlc3BvbnNlOiBhbnk7XG5cbiAgICBlcnJvcjogc3RyaW5nO1xuXG4gICAgLy8gUmFuZG9tIElEIHRvIGlkZW50aWZ5IHRoZSByZXF1ZXN0XG4gICAgaWQ6IG51bWJlcjtcbn1cbiIsImltcG9ydCB7UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4uL2hhbmRsZXJzL3R5cGVzJztcbmltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcblxuLyoqXG4gKiBSZXN0cmljdHMgYSBnaXZlbiBoYW5kbGVyIHN1Y2ggdGhhdCBpdCBjYW4gb25seSBydW4gaWYgdGhlIHNlbmRlciBpc1xuICogdmVyaWZpZWQgdG8gYmUgZnJvbSB0aGUgZXh0ZW5zaW9uJ3Mgb3JpZ2luIChpZS4gY29udGVudCBzY3JpcHQpXG4gKi9cbmV4cG9ydCBjbGFzcyBQcml2aWxlZ2VkSGFuZGxlcjxSZXEsIFJlc3A+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBoYW5kbGVyOiBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+KSB7fVxuXG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZ2V0VHlwZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPFJlc3A+IHtcbiAgICAgICAgaWYgKHNlbmRlci5pZCAhPT0gY2hyb21lLnJ1bnRpbWUuaWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdCB0byBhY2Nlc3MgcmVzdHJpY3RlZCBtZXRob2Qgb3V0c2lkZSBvZiBzZWN1cmUgY29udGV4dCAoaWUuIGNvbnRlbnQgc2NyaXB0KScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5oYW5kbGVSZXF1ZXN0KHJlcXVlc3QsIHNlbmRlcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtJbnRlcm5hbFJlcXVlc3RCdW5kbGUsIEludGVybmFsUmVzcG9uc2VCdW5kbGUsIFZlcnNpb259IGZyb20gJy4uL2JyaWRnZS90eXBlcyc7XG5pbXBvcnQge3J1bnRpbWVOYW1lc3BhY2V9IGZyb20gJy4uL3V0aWxzL2RldGVjdCc7XG5cbi8qKlxuICogTWVzc2FnZSBidXMgdGhhdCB1c2VzIGBwb3N0TWVzc2FnZWAgaW4gb3JkZXIgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgYmFja2dyb3VuZFxuICogc2VydmljZSB3b3JrZXIvc2NyaXB0LlxuICpcbiAqIFdoeT8gQmVjYXVzZSB0aGUgY2xpZW50IHBhZ2UgKGllLiBTdGVhbSBwYWdlKSBvbiBGaXJlZm94IGlzIG5vdCBjYXBhYmxlIG9mXG4gKiBzZW5kaW5nIGEgbWVzc2FnZSBkaXJlY3RseSB0byB0aGUgZXh0ZW5zaW9uIGJhY2tncm91bmQuXG4gKlxuICogU28gaXQgcmVxdWlyZXMgdXMgdG8gZG8gdGhlIGZvbGxvd2luZyBkYW5jZTpcbiAqIHBhZ2UgPC0tKHBvc3RtZXNzYWdlKS0tPiBjb250ZW50IHNjcmlwdCA8LS0oc2VuZG1lc3NhZ2UpLS0+IGJhY2tncm91bmQgc2NyaXB0XG4gKlxuICogVGhpcyBkYW5jZSBpcyBhYnN0cmFjdGVkIGluIGBDbGllbnRTZW5kYCwgYW5kIG9ubHkgdXNlcyB0aGlzIGJ1cyBpZlxuICogYHNlbmRtZXNzYWdlYCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBwYWdlLlxuICovXG5jbGFzcyBQb3N0TWVzc2FnZUJ1cyB7XG4gICAgLyoqXG4gICAgICogRm9yIHRoZSByZXF1ZXN0ZXIgKGllLiBwYWdlKSwgdG8gd2FpdCB1bnRpbCBpdCBnZXRzIGEgcmVzcG9uc2VcbiAgICAgKiBmcm9tIHRoZSBjb250ZW50IHNjcmlwdCB2aWEuIHBvc3RNZXNzYWdlIGZvciB0aGUgZ2l2ZW4gcmVxdWVzdCBJRFxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFJlcXVlc3QgSURcbiAgICAgKi9cbiAgICB3YWl0VW50aWxSZXNwb25zZUZvcihpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcCA9IGUuZGF0YSBhcyBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLmlkICE9PSBpZCB8fCAhcmVzcC5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBsZWFrc1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlciwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3A/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3A/LmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHJlcXVlc3QgdG8gYmUgZG9uZSB0aHJvdWdoIHRoZSBidXMsIHJldHVybnMgdGhlIGFwcHJvcHJpYXRlXG4gICAgICogcmVzcG9uc2UgZm9yIHRoZSBpbnB1dCBidW5kbGUgaGFuZGxlclxuICAgICAqXG4gICAgICogQHBhcmFtIGJ1bmRsZSBSZXF1ZXN0IEJ1bmRsZVxuICAgICAqL1xuICAgIHNlbmRSZXF1ZXN0KGJ1bmRsZTogSW50ZXJuYWxSZXF1ZXN0QnVuZGxlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKGJ1bmRsZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2FpdFVudGlsUmVzcG9uc2VGb3IoYnVuZGxlLmlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGhhbmRsZXIgKGNvbnRlbnQgc2NyaXB0KSBmb3IgbmV3IHJlcXVlc3RzIGZyb20gdGhlIHBhZ2UuXG4gICAgICpcbiAgICAgKiBFYWNoIHJlcXVlc3QgaXMgZWZmZWN0aXZlbHkgXCJwcm94aWVkXCIgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0L3dvcmtlclxuICAgICAqIHRvIGFjdHVhbGx5IGV4ZWN1dGUgaXQncyBoYW5kbGVyLlxuICAgICAqL1xuICAgIGhhbmRsZVJlcXVlc3RzKCkge1xuICAgICAgICBjb25zdCBoID0gKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGUuZGF0YS52ZXJzaW9uICE9PSBWZXJzaW9uLlYxIHx8ICFlLmRhdGEucmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBtZXNzYWdlcyB0aGF0IGFyZW4ndCBmb3IgdGhpcyBicmlkZ2VcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlbmQgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgcnVudGltZU5hbWVzcGFjZSgpLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuaWQsXG4gICAgICAgICAgICAgICAgZS5kYXRhLFxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgQmFkIHR5cGVzXG4gICAgICAgICAgICAgICAgKHJlc3A6IEludGVybmFsUmVzcG9uc2VCdW5kbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHJlc3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBnX1Bvc3RNZXNzYWdlQnVzID0gbmV3IFBvc3RNZXNzYWdlQnVzKCk7XG4iLCJpbXBvcnQge0R5bmFtaWNTdG9yYWdlS2V5LCBTdG9yYWdlS2V5fSBmcm9tICcuL2tleXMnO1xuXG5jbGFzcyBTdG9yZSB7XG4gICAgLy8gUHJlZmVyIHRvIHVzZSBzeW5jIHN0b3JhZ2UgaWYgcG9zc2libGVcbiAgICBnZXQgc3RvcmFnZSgpOiBjaHJvbWUuc3RvcmFnZS5TeW5jU3RvcmFnZUFyZWEgfCBjaHJvbWUuc3RvcmFnZS5Mb2NhbFN0b3JhZ2VBcmVhIHtcbiAgICAgICAgcmV0dXJuIGNocm9tZS5zdG9yYWdlLnN5bmMgPyBjaHJvbWUuc3RvcmFnZS5zeW5jIDogY2hyb21lLnN0b3JhZ2UubG9jYWw7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0PFQ+KGtleTogU3RvcmFnZUtleSB8IER5bmFtaWNTdG9yYWdlS2V5KTogUHJvbWlzZTxUIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBhID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldChrZXkpO1xuICAgICAgICBpZiAoIWEgfHwgIShrZXkgaW4gYSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGFba2V5XSkgYXMgVDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gRmFsbGJhY2sgaWYgdGhpcyBpcyBhbiBvbGQga2V5IG5vdCBzdG9yZWQgYXMgSlNPTlxuICAgICAgICAgICAgcmV0dXJuIGFba2V5XSBhcyBUO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0PFQ+KGtleTogU3RvcmFnZUtleSB8IER5bmFtaWNTdG9yYWdlS2V5LCB2YWx1ZTogVCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnNldCh7W2tleV06IEpTT04uc3RyaW5naWZ5KHZhbHVlKX0pO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbW92ZShrZXk6IFN0b3JhZ2VLZXkgfCBEeW5hbWljU3RvcmFnZUtleSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnJlbW92ZShba2V5XSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZ1N0b3JlID0gbmV3IFN0b3JlKCk7XG4iLCJleHBvcnQgZnVuY3Rpb24gaXNGaXJlZm94KCkge1xuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpID4gLTE7XG59XG5cbi8qKlxuICogVGhhbmtzIHRvIG91ciBicm93c2VyIG92ZXJsb3Jkcywgd2UgaGF2ZSB0d28gbmFtZXNwYWNlcyBmb3IgYHgucnVudGltZS5mbigpYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcnVudGltZU5hbWVzcGFjZSgpIHtcbiAgICBpZiAoaXNGaXJlZm94KCkpIHtcbiAgICAgICAgcmV0dXJuIGJyb3dzZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNocm9tZTtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaW5QYWdlQ29udGV4dCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIGNocm9tZSA9PT0gJ3VuZGVmaW5lZCcgfHwgIWNocm9tZS5leHRlbnNpb247XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsImltcG9ydCB7SGFuZGxlfSBmcm9tICcuL2xpYi9icmlkZ2Uvc2VydmVyJztcbmltcG9ydCB7SW50ZXJuYWxSZXNwb25zZUJ1bmRsZX0gZnJvbSAnLi9saWIvYnJpZGdlL3R5cGVzJztcbmltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcblxuZnVuY3Rpb24gdW5pZmllZEhhbmRsZXIocmVxdWVzdDogYW55LCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIsIHNlbmRSZXNwb25zZTogKHJlc3BvbnNlPzogYW55KSA9PiB2b2lkKSB7XG4gICAgSGFuZGxlKHJlcXVlc3QsIHNlbmRlcilcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIHJlcXVlc3RfdHlwZTogcmVxdWVzdC5yZXF1ZXN0X3R5cGUsXG4gICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICB9IGFzIEludGVybmFsUmVzcG9uc2VCdW5kbGUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIHJlcXVlc3RfdHlwZTogcmVxdWVzdC5yZXF1ZXN0X3R5cGUsXG4gICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLnRvU3RyaW5nKCksXG4gICAgICAgICAgICB9IGFzIEludGVybmFsUmVzcG9uc2VCdW5kbGUpO1xuICAgICAgICB9KTtcbn1cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgIHVuaWZpZWRIYW5kbGVyKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2VFeHRlcm5hbC5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICB1bmlmaWVkSGFuZGxlcihyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSk7XG4gICAgcmV0dXJuIHRydWU7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==