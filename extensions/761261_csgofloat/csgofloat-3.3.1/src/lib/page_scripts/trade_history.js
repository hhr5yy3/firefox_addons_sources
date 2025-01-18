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

/***/ 3:
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

/***/ 377:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export SteamButton */
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var lit_html_directives_class_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(378);
/* harmony import */ var lit_decorators_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _injectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _custom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);
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





var ButtonType;
(function (ButtonType) {
    ButtonType["GreenWhite"] = "green_white";
    ButtonType["GreyWhite"] = "grey_white";
})(ButtonType || (ButtonType = {}));
let SteamButton = class SteamButton extends _custom__WEBPACK_IMPORTED_MODULE_4__.FloatElement {
    constructor() {
        super(...arguments);
        this.text = '';
        this.type = ButtonType.GreenWhite;
    }
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.connectedCallback.call(this);
        });
    }
    btnClass() {
        const r = { btn_small: true };
        r[`btn_${this.type}_innerfade`] = true;
        return (0,lit_html_directives_class_map_js__WEBPACK_IMPORTED_MODULE_1__.classMap)(r);
    }
    render() {
        return lit__WEBPACK_IMPORTED_MODULE_0__.html `
            <a class="${this.btnClass()}">
                <span>${this.text}</span>
            </a>
        `;
    }
};
SteamButton.styles = [
    ..._custom__WEBPACK_IMPORTED_MODULE_4__.FloatElement.styles,
    lit__WEBPACK_IMPORTED_MODULE_0__.css `
            .btn_green_white_innerfade {
                border-radius: 2px;
                border: none;
                padding: 1px;
                display: inline-block;
                cursor: pointer;
                text-decoration: none !important;
                color: #d2e885 !important;

                background: #a4d007;
                background: -webkit-linear-gradient(top, #a4d007 5%, #536904 95%);
                background: linear-gradient(to bottom, #a4d007 5%, #536904 95%);
            }

            .btn_green_white_innerfade > span {
                border-radius: 2px;
                display: block;

                background: #799905;
                background: -webkit-linear-gradient(top, #799905 5%, #536904 95%);
                background: linear-gradient(to bottom, #799905 5%, #536904 95%);
            }

            .btn_green_white_innerfade:not(.btn_disabled):not(:disabled):not(.btn_active):not(.active):hover {
                text-decoration: none !important;
                color: #fff !important;

                background: #b6d908;
                background: -webkit-linear-gradient(top, #b6d908 5%, #80a006 95%);
                background: linear-gradient(to bottom, #b6d908 5%, #80a006 95%);
            }

            .btn_green_white_innerfade:not(.btn_disabled):not(:disabled):not(.btn_active):not(.active):hover > span {
                background: #a1bf07;
                background: -webkit-linear-gradient(top, #a1bf07 5%, #80a006 95%);
                background: linear-gradient(to bottom, #a1bf07 5%, #80a006 95%);
            }

            .btn_grey_white_innerfade {
                border-radius: 2px;
                border: none;
                padding: 1px;
                display: inline-block;
                cursor: pointer;
                text-decoration: none !important;
                color: #fff !important;

                background: #acb5bd;
                background: -webkit-linear-gradient(top, #acb5bd 5%, #414a52 95%);
                background: linear-gradient(to bottom, #acb5bd 5%, #414a52 95%);
            }

            .btn_grey_white_innerfade > span {
                border-radius: 2px;
                display: block;

                background: #778088;
                background: -webkit-linear-gradient(top, #778088 5%, #414a52 95%);
                background: linear-gradient(to bottom, #778088 5%, #414a52 95%);
            }

            .btn_grey_white_innerfade:not(.btn_disabled):not(:disabled):not(.btn_active):not(.active):hover {
                text-decoration: none !important;
                color: #fff !important;

                background: #cfd8e0;
                background: -webkit-linear-gradient(top, #cfd8e0 5%, #565f67 95%);
                background: linear-gradient(to bottom, #cfd8e0 5%, #565f67 95%);
            }

            .btn_grey_white_innerfade:not(.btn_disabled):not(:disabled):not(.btn_active):not(.active):hover > span {
                background: #99a2aa;
                background: -webkit-linear-gradient(top, #99a2aa 5%, #565f67 95%);
                background: linear-gradient(to bottom, #99a2aa 5%, #565f67 95%);
            }

            .btn_small > span {
                padding: 0 15px;
                font-size: 12px;
                line-height: 20px;
            }
        `,
];
__decorate([
    (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_2__.property)({ type: String })
], SteamButton.prototype, "text", void 0);
__decorate([
    (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_2__.property)({ type: String })
], SteamButton.prototype, "type", void 0);
SteamButton = __decorate([
    (0,_injectors__WEBPACK_IMPORTED_MODULE_3__.CustomElement)()
], SteamButton);



/***/ }),

/***/ 29:
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

/***/ 16:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomElement": () => (/* binding */ CustomElement),
/* harmony export */   "InjectAppend": () => (/* binding */ InjectAppend),
/* harmony export */   "InjectionMode": () => (/* binding */ InjectionMode)
/* harmony export */ });
/* unused harmony exports InjectBefore, InjectAfter */
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

/***/ 391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchListingTime": () => (/* binding */ fetchListingTime)
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
function historyRowHashcode(row) {
    const text = row.innerText.replace(/\W/g, '');
    /* Based on https://stackoverflow.com/a/8831937 (Java's hashCode() method) */
    if (text.length === 0) {
        return '';
    }
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash.toString();
}
function getTimestampFromTrade(row) {
    const dateDiv = row.querySelector('.tradehistory_date');
    if (!dateDiv) {
        return null;
    }
    const date = dateDiv.firstChild.nodeValue.trim();
    const time = dateDiv.querySelector('.tradehistory_timestamp').innerText;
    const d = new Date(date);
    const pure = time.replace('am', '').replace('pm', '');
    let hours = parseInt(pure.split(':')[0]);
    const minutes = parseInt(pure.split(':')[1]);
    if (time.includes('pm') && hours !== 12) {
        /* Prevent 12:XXpm from getting 12 hours added */
        hours += 12;
    }
    else if (time.includes('am') && hours === 12) {
        /* Prevent 12:XXam from getting 12 hours instead of being 0 */
        hours -= 12;
    }
    d.setHours(hours);
    d.setMinutes(minutes);
    return d.getTime() / 1000;
}
function hasTradeBeforeTime(hashCode, timestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`${location.protocol}//${location.host}${location.pathname}?after_time=${timestamp}&l=english`, {
            credentials: 'same-origin',
        });
        const body = yield resp.text();
        if (body.includes('too many requests')) {
            alert('You need to wait a couple seconds before generating the proof due to Valve rate-limits');
            throw 'Too many requests';
        }
        const doc = new DOMParser().parseFromString(body, 'text/html');
        const rows = doc.querySelectorAll('.tradehistoryrow');
        for (const row of rows) {
            const thisCode = historyRowHashcode(row);
            if (thisCode === hashCode) {
                return true;
            }
        }
        return false;
    });
}
function fetchEnglishRow(index) {
    return __awaiter(this, void 0, void 0, function* () {
        let queryParams = location.search;
        if (queryParams === '') {
            queryParams = '?l=english';
        }
        else {
            queryParams += '&l=english';
        }
        /* Forces us to fetch the english version of the row at a given index no matter what */
        const resp = yield fetch(`${location.protocol}//${location.host}${location.pathname}${queryParams}`, {
            credentials: 'same-origin',
        });
        const body = yield resp.text();
        const doc = new DOMParser().parseFromString(body, 'text/html');
        const rows = doc.querySelectorAll('.tradehistoryrow');
        return rows[index];
    });
}
/**
 * Returns the listing time of the row at {@param index}
 * @param index Index of the trade history row on the page
 */
function fetchListingTime(index) {
    return __awaiter(this, void 0, void 0, function* () {
        const node = yield fetchEnglishRow(index);
        const hashCode = historyRowHashcode(node);
        const timestamp = getTimestampFromTrade(node);
        if (!timestamp) {
            throw 'failed timestamp creation';
        }
        let left = 0, right = 60;
        let amt = 0;
        while (left < right && amt < 5) {
            const middle = left + Math.floor((right - left) / 2);
            const hasTrade = yield hasTradeBeforeTime(hashCode, timestamp + middle);
            if (hasTrade) {
                right = middle;
            }
            else {
                left = middle;
            }
            amt++;
        }
        /* Hello to all the reversers */
        return timestamp + Math.floor((right + left) / 2);
    });
}


/***/ }),

/***/ 390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export TradeProof */
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _injectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _custom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(391);
/* harmony import */ var _common_ui_steam_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(377);
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






let TradeProof = class TradeProof extends _custom__WEBPACK_IMPORTED_MODULE_3__.FloatElement {
    constructor() {
        super(...arguments);
        this.isProcessing = false;
    }
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.connectedCallback.call(this);
        });
    }
    render() {
        return this.proofNumber
            ? lit__WEBPACK_IMPORTED_MODULE_0__.html ` <span>Proof: ${this.proofNumber}</span> `
            : lit__WEBPACK_IMPORTED_MODULE_0__.html `
                  <csfloat-steam-button
                      @click="${this.onClick}"
                      .text="${this.isProcessing ? 'Computing Proof...' : 'CSFloat Proof'}"
                  >
                  </csfloat-steam-button>
              `;
    }
    onClick() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isProcessing = true;
            const index = $J('.tradehistoryrow').index($J(this).parent().parent());
            try {
                this.proofNumber = yield (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.fetchListingTime)(index);
            }
            catch (e) {
                alert("Failed to parse time, make sure you're on an english version of the page by appending ?l=english to the url");
            }
            this.isProcessing = false;
        });
    }
};
__decorate([
    (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.state)()
], TradeProof.prototype, "proofNumber", void 0);
__decorate([
    (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.state)()
], TradeProof.prototype, "isProcessing", void 0);
TradeProof = __decorate([
    (0,_injectors__WEBPACK_IMPORTED_MODULE_2__.CustomElement)(),
    (0,_injectors__WEBPACK_IMPORTED_MODULE_2__.InjectAppend)('.tradehistoryrow .tradehistory_content', _injectors__WEBPACK_IMPORTED_MODULE_2__.InjectionMode.CONTINUOUS)
], TradeProof);



/***/ }),

/***/ 1:
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


/***/ }),

/***/ 32:
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

/***/ 22:
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

/***/ 18:
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

/***/ 21:
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

/***/ 19:
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

/***/ 24:
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

/***/ 26:
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

/***/ 27:
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

/***/ 25:
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

/***/ 23:
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

/***/ 20:
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

/***/ 31:
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

/***/ 34:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LitElement": () => (/* binding */ s),
/* harmony export */   "css": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.css),
/* harmony export */   "html": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.html)
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

/***/ 379:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Directive": () => (/* binding */ i),
/* harmony export */   "PartType": () => (/* binding */ t),
/* harmony export */   "directive": () => (/* binding */ e)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
//# sourceMappingURL=directive.js.map


/***/ }),

/***/ 378:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "classMap": () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(379);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=(0,_directive_js__WEBPACK_IMPORTED_MODULE_1__.directive)(class extends _directive_js__WEBPACK_IMPORTED_MODULE_1__.Directive{constructor(t){var i;if(super(t),t.type!==_directive_js__WEBPACK_IMPORTED_MODULE_1__.PartType.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.nt){this.nt=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(t))&&this.nt.add(t);return this.render(s)}const e=i.element.classList;this.nt.forEach((t=>{t in s||(e.remove(t),this.nt.delete(t))}));for(const t in s){const i=!!s[t];i===this.nt.has(t)||(null===(o=this.st)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.nt.add(t)):(e.remove(t),this.nt.delete(t)))}return _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.noChange}});
//# sourceMappingURL=class-map.js.map


/***/ }),

/***/ 33:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "html": () => (/* binding */ y),
/* harmony export */   "noChange": () => (/* binding */ x),
/* harmony export */   "render": () => (/* binding */ A)
/* harmony export */ });
/* unused harmony exports _$LH, nothing, svg */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i=window,s=i.trustedTypes,e=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,o=`lit$${(Math.random()+"").slice(9)}$`,n="?"+o,l=`<${n}>`,h=document,r=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),w=g(2),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new S(i.insertBefore(r(),t),t,void 0,null!=s?s:{})}return l._$AI(t),l},E=h.createTreeWalker(h,129,null,!1),C=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a:void 0!==u[1]?d=f:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a||d===f?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o+y):s+o+(-2===c?(n.push(void 0),i):y)}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==e?e.createHTML(u):u,n]};class P{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,i);if(this.el=P.createElement(v,e),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(l=E.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?R:"?"===i[1]?H:"@"===i[1]?I:M})}else c.push({type:6,index:h})}for(const i of t)l.removeAttribute(i)}if($.test(l.tagName)){const t=l.textContent.split(o),i=t.length-1;if(i>0){l.textContent=s?s.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r()),E.nextNode(),c.push({type:2,index:++h});l.append(t[i],r())}}}else if(8===l.nodeType)if(l.data===n)c.push({type:2,index:h});else{let t=-1;for(;-1!==(t=l.data.indexOf(o,t+1));)c.push({type:7,index:h}),t+=o.length-1}h++}}static createElement(t,i){const s=h.createElement("template");return s.innerHTML=t,s}}function V(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=d(i)?void 0:i._$litDirective$;return(null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=r:s._$Cu=r),void 0!==r&&(i=V(t,r._$AS(t,i.values),r,e)),i}class N{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h).importNode(s,!0);E.currentNode=o;let n=E.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new S(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r]}l!==(null==d?void 0:d.index)&&(n=E.nextNode(),l++)}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class S{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$C_=null===(o=null==e?void 0:e.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$C_}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=V(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):c(t)?this.O(t):this.$(t)}S(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}$(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.k(h.createTextNode(t)),this._$AH=t}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=P.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else{const t=new N(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new P(t)),i}O(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new S(this.S(r()),this.S(r()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$C_=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class M{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=V(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else{const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=V(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h}n&&!e&&this.P(t)}P(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class R extends M{constructor(){super(...arguments),this.type=3}P(t){this.element[this.name]=t===b?void 0:t}}const k=s?s.emptyScript:"";class H extends M{constructor(){super(...arguments),this.type=4}P(t){t&&t!==b?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class I extends M{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=V(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const z={A:"$lit$",M:o,C:n,L:1,R:C,D:N,V:c,I:V,H:S,N:M,U:H,B:I,F:R,W:L},Z=i.litHtmlPolyfillSupport;null==Z||Z(P,S),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.3.1");
//# sourceMappingURL=lit-html.js.map


/***/ }),

/***/ 17:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customElement": () => (/* reexport safe */ _lit_reactive_element_decorators_custom_element_js__WEBPACK_IMPORTED_MODULE_0__.customElement),
/* harmony export */   "property": () => (/* reexport safe */ _lit_reactive_element_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.property),
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

/***/ 30:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LitElement": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.LitElement),
/* harmony export */   "css": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.css),
/* harmony export */   "html": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.html)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);

//# sourceMappingURL=index.js.map


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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _components_trade_history_trade_proof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(390);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


(0,_utils__WEBPACK_IMPORTED_MODULE_0__.init)('src/lib/page_scripts/trade_history.js', main);
function main() {
    return __awaiter(this, void 0, void 0, function* () { });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2V4ZWN1dGVfY3NzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2V4ZWN1dGVfc2NyaXB0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2ZldGNoX2V4dGVuc2lvbl9maWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvaGFuZGxlcnMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2Uvd3JhcHBlcnMvcHJpdmlsZWdlZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2J1cy9wb3N0X21lc3NhZ2VfYnVzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29tcG9uZW50cy9jb21tb24vdWkvc3RlYW0tYnV0dG9uLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29tcG9uZW50cy9jdXN0b20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jb21wb25lbnRzL2luamVjdG9ycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbXBvbmVudHMvdHJhZGVfaGlzdG9yeS9oZWxwZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29tcG9uZW50cy90cmFkZV9oaXN0b3J5L3RyYWRlX3Byb29mLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcGFnZV9zY3JpcHRzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvZGV0ZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvc25pcHMudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9jc3MtdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9jdXN0b20tZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvZXZlbnQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcXVlcnktYXNzaWduZWQtZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFzc2lnbmVkLW5vZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9xdWVyeS1hc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3N0YXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvcmVhY3RpdmUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0LWVsZW1lbnQvbGl0LWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2RpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvZGlyZWN0aXZlcy9jbGFzcy1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpdC1odG1sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQvZGVjb3JhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0L2luZGV4LmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy8uL3NyYy9saWIvcGFnZV9zY3JpcHRzL3RyYWRlX2hpc3RvcnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbnRlcm5hbFJlcXVlc3RCdW5kbGUsIEludGVybmFsUmVzcG9uc2VCdW5kbGUsIFJlcXVlc3RIYW5kbGVyLCBWZXJzaW9ufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7aXNGaXJlZm94LCBydW50aW1lTmFtZXNwYWNlfSBmcm9tICcuLi91dGlscy9kZXRlY3QnO1xuaW1wb3J0IHtpblBhZ2VDb250ZXh0fSBmcm9tICcuLi91dGlscy9zbmlwcyc7XG5pbXBvcnQge2dfUG9zdE1lc3NhZ2VCdXN9IGZyb20gJy4uL2J1cy9wb3N0X21lc3NhZ2VfYnVzJztcblxuZnVuY3Rpb24gY2FuVXNlU2VuZE1lc3NhZ2UoKSB7XG4gICAgLy8gTm90IHN1cHBvcnRlZCBpbiBGaXJlZm94IFBhZ2UgQ29udGV4dFxuICAgIHJldHVybiAhKGlzRmlyZWZveCgpICYmIGluUGFnZUNvbnRleHQoKSk7XG59XG5cbi8qKlxuICogU2VuZCBhIHJlcXVlc3QgdG8gYmUgaGFuZGxlZCBieSB0aGUgYmFja2dyb3VuZCB3b3JrZXJcbiAqXG4gKiBDYW4gYmUgY2FsbGVkIGZyb20gYSBjb250ZW50IHNjcmlwdCBvciBwYWdlIGl0c2VsZlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ2xpZW50U2VuZDxSZXEsIFJlc3A+KGhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyPFJlcSwgUmVzcD4sIGFyZ3M6IFJlcSk6IFByb21pc2U8UmVzcD4ge1xuICAgIGNvbnN0IGJ1bmRsZTogSW50ZXJuYWxSZXF1ZXN0QnVuZGxlID0ge1xuICAgICAgICB2ZXJzaW9uOiBWZXJzaW9uLlYxLFxuICAgICAgICByZXF1ZXN0X3R5cGU6IGhhbmRsZXIuZ2V0VHlwZSgpLFxuICAgICAgICByZXF1ZXN0OiBhcmdzLFxuICAgICAgICBpZDogTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwMDApLFxuICAgIH07XG5cbiAgICBpZiAoY2FuVXNlU2VuZE1lc3NhZ2UoKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBCYWQgdHlwZXNcbiAgICAgICAgICAgIHJ1bnRpbWVOYW1lc3BhY2UoKS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAgICAgIHdpbmRvdy5DU0ZMT0FUX0VYVEVOU0lPTl9JRCB8fCBjaHJvbWUucnVudGltZS5pZCxcbiAgICAgICAgICAgICAgICBidW5kbGUsXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBCYWQgdHlwZXNcbiAgICAgICAgICAgICAgICAocmVzcDogSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcD8ucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcD8uZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmFsbGJhY2sgdG8gcG9zdG1lc3NhZ2UgYnVzIGZvciBicm93c2VycyB0aGF0IGRvbid0IGltcGxlbWVudFxuICAgICAgICAvLyBzcGVjcyBmdWxseVxuICAgICAgICByZXR1cm4gZ19Qb3N0TWVzc2FnZUJ1cy5zZW5kUmVxdWVzdChidW5kbGUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RW1wdHlSZXNwb25zZUhhbmRsZXJ9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7UHJpdmlsZWdlZEhhbmRsZXJ9IGZyb20gJy4uL3dyYXBwZXJzL3ByaXZpbGVnZWQnO1xuXG5pbnRlcmZhY2UgRXhlY3V0ZUNzc1JlcXVlc3Qge1xuICAgIHBhdGg6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEV4ZWN1dGVDc3NPblBhZ2UgPSBuZXcgUHJpdmlsZWdlZEhhbmRsZXIoXG4gICAgbmV3IEVtcHR5UmVzcG9uc2VIYW5kbGVyPEV4ZWN1dGVDc3NSZXF1ZXN0PihSZXF1ZXN0VHlwZS5FWEVDVVRFX0NTU19PTl9QQUdFLCBhc3luYyAocmVxLCBzZW5kZXIpID0+IHtcbiAgICAgICAgYXdhaXQgY2hyb21lLnNjcmlwdGluZy5pbnNlcnRDU1Moe1xuICAgICAgICAgICAgdGFyZ2V0OiB7dGFiSWQ6IHNlbmRlci50YWI/LmlkIGFzIG51bWJlcn0sXG4gICAgICAgICAgICBmaWxlczogW3JlcS5wYXRoXSxcbiAgICAgICAgfSk7XG4gICAgfSlcbik7XG4iLCJpbXBvcnQge0VtcHR5UmVzcG9uc2VIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1ByaXZpbGVnZWRIYW5kbGVyfSBmcm9tICcuLi93cmFwcGVycy9wcml2aWxlZ2VkJztcblxuaW50ZXJmYWNlIEV4ZWN1dGVTY3JpcHRSZXF1ZXN0IHtcbiAgICBwYXRoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBFeGVjdXRlU2NyaXB0T25QYWdlID0gbmV3IFByaXZpbGVnZWRIYW5kbGVyKFxuICAgIG5ldyBFbXB0eVJlc3BvbnNlSGFuZGxlcjxFeGVjdXRlU2NyaXB0UmVxdWVzdD4oUmVxdWVzdFR5cGUuRVhFQ1VURV9TQ1JJUFRfT05fUEFHRSwgYXN5bmMgKHJlcSwgc2VuZGVyKSA9PiB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gaW5qZWN0IHRoZSBleHRlbnNpb24gSUQgZHluYW1pY2FsbHkgc28gdGhlIGNsaWVudCBrbm93cyB3aG8gdG9cbiAgICAgICAgLy8gY29tbXVuaWNhdGUgd2l0aC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gT24gRmlyZWZveCwgZXh0ZW5zaW9uIElEcyBhcmUgcmFuZG9tLCBzbyB0aGlzIGlzIG5lY2Vzc2FyeS5cbiAgICAgICAgYXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgICAgIHRhcmdldDoge3RhYklkOiBzZW5kZXIudGFiPy5pZCBhcyBudW1iZXJ9LFxuICAgICAgICAgICAgd29ybGQ6ICdNQUlOJyxcbiAgICAgICAgICAgIGFyZ3M6IFtjaHJvbWUucnVudGltZS5pZCwgY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKCdzcmMvbW9kZWxfZnJhbWUuaHRtbCcpXSxcbiAgICAgICAgICAgIGZ1bmM6IGZ1bmN0aW9uIEV4dGVuc2lvbklkKGV4dGVuc2lvbklkLCBtb2RlbEZyYW1lVXJsKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LkNTRkxPQVRfRVhURU5TSU9OX0lEID0gZXh0ZW5zaW9uSWQ7XG4gICAgICAgICAgICAgICAgd2luZG93LkNTRkxPQVRfTU9ERUxfRlJBTUVfVVJMID0gbW9kZWxGcmFtZVVybDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHt0YWJJZDogc2VuZGVyLnRhYj8uaWQgYXMgbnVtYmVyfSxcbiAgICAgICAgICAgIGZpbGVzOiBbcmVxLnBhdGhdLFxuICAgICAgICAgICAgd29ybGQ6ICdNQUlOJyxcbiAgICAgICAgfSk7XG4gICAgfSlcbik7XG4iLCJpbXBvcnQge1NpbXBsZUhhbmRsZXJ9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7UHJpdmlsZWdlZEhhbmRsZXJ9IGZyb20gJy4uL3dyYXBwZXJzL3ByaXZpbGVnZWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoRXh0ZW5zaW9uRmlsZVJlcXVlc3Qge1xuICAgIHBhdGg6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEV4dGVuc2lvbkZpbGVSZXNwb25zZSB7XG4gICAgdGV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRmV0Y2hFeHRlbnNpb25GaWxlID0gbmV3IFByaXZpbGVnZWRIYW5kbGVyKFxuICAgIG5ldyBTaW1wbGVIYW5kbGVyPEZldGNoRXh0ZW5zaW9uRmlsZVJlcXVlc3QsIEZldGNoRXh0ZW5zaW9uRmlsZVJlc3BvbnNlPihcbiAgICAgICAgUmVxdWVzdFR5cGUuRkVUQ0hfRVhURU5TSU9OX0ZJTEUsXG4gICAgICAgIGFzeW5jIChyZXEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGNocm9tZS5ydW50aW1lLmdldFVSTChyZXEucGF0aCk7XG4gICAgICAgICAgICBjb25zdCByID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByLnRleHQoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICApXG4pO1xuIiwiaW1wb3J0IHtSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgPSBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVIYW5kbGVyPFJlcSwgUmVzcD4gaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFJlcXVlc3RUeXBlLCBwcml2YXRlIGhhbmRsZXI6IChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcikgPT4gUHJvbWlzZTxSZXNwPikge31cblxuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPFJlc3A+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlcihyZXF1ZXN0LCBzZW5kZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbXB0eSB7fVxuXG5leHBvcnQgY2xhc3MgRW1wdHlSZXF1ZXN0SGFuZGxlcjxSZXNwPiBpbXBsZW1lbnRzIFJlcXVlc3RIYW5kbGVyPEVtcHR5LCBSZXNwPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBSZXF1ZXN0VHlwZSwgcHJpdmF0ZSBoYW5kbGVyOiAoc2VuZGVyOiBNZXNzYWdlU2VuZGVyKSA9PiBQcm9taXNlPFJlc3A+KSB7fVxuXG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBFbXB0eSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKTogUHJvbWlzZTxSZXNwPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIoc2VuZGVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbXB0eVJlc3BvbnNlSGFuZGxlcjxSZXE+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8UmVxLCB2b2lkPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBSZXF1ZXN0VHlwZSwgcHJpdmF0ZSBoYW5kbGVyOiAocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpID0+IFByb21pc2U8dm9pZD4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXF1ZXN0KHJlcXVlc3Q6IFJlcSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCwgc2VuZGVyKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZW51bSBSZXF1ZXN0VHlwZSB7XG4gICAgRVhFQ1VURV9TQ1JJUFRfT05fUEFHRSxcbiAgICBFWEVDVVRFX0NTU19PTl9QQUdFLFxuICAgIEZFVENIX0lOU1BFQ1RfSU5GTyxcbiAgICBGRVRDSF9TVEFMTCxcbiAgICBTVE9SQUdFX0dFVCxcbiAgICBTVE9SQUdFX1NFVCxcbiAgICBTVE9SQUdFX1JFTU9WRSxcbiAgICBGRVRDSF9QRU5ESU5HX1RSQURFUyxcbiAgICBGRVRDSF9TS0lOX01PREVMLFxuICAgIEZFVENIX0VYVEVOU0lPTl9GSUxFLFxuICAgIEFOTk9UQVRFX09GRkVSLFxuICAgIEVYVEVOU0lPTl9WRVJTSU9OLFxufVxuIiwiaW1wb3J0IE1lc3NhZ2VTZW5kZXIgPSBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi9oYW5kbGVycy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiB7XG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8UmVzcD47XG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZTtcbn1cblxuZXhwb3J0IGVudW0gVmVyc2lvbiB7XG4gICAgVjEgPSAnQ1NGTE9BVF9WMScsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxSZXF1ZXN0QnVuZGxlIHtcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG5cbiAgICByZXF1ZXN0X3R5cGU6IFJlcXVlc3RUeXBlO1xuXG4gICAgLy8gSW5wdXQgcmVxdWVzdFxuICAgIHJlcXVlc3Q6IGFueTtcblxuICAgIC8vIFJhbmRvbSBJRCB0byBpZGVudGlmeSB0aGUgcmVxdWVzdFxuICAgIGlkOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSB7XG4gICAgcmVxdWVzdF90eXBlOiBSZXF1ZXN0VHlwZTtcblxuICAgIC8vIFJlc3BvbnNlXG4gICAgcmVzcG9uc2U6IGFueTtcblxuICAgIGVycm9yOiBzdHJpbmc7XG5cbiAgICAvLyBSYW5kb20gSUQgdG8gaWRlbnRpZnkgdGhlIHJlcXVlc3RcbiAgICBpZDogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHtSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi4vaGFuZGxlcnMvdHlwZXMnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgPSBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyO1xuXG4vKipcbiAqIFJlc3RyaWN0cyBhIGdpdmVuIGhhbmRsZXIgc3VjaCB0aGF0IGl0IGNhbiBvbmx5IHJ1biBpZiB0aGUgc2VuZGVyIGlzXG4gKiB2ZXJpZmllZCB0byBiZSBmcm9tIHRoZSBleHRlbnNpb24ncyBvcmlnaW4gKGllLiBjb250ZW50IHNjcmlwdClcbiAqL1xuZXhwb3J0IGNsYXNzIFByaXZpbGVnZWRIYW5kbGVyPFJlcSwgUmVzcD4gaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyPFJlcSwgUmVzcD4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5nZXRUeXBlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8UmVzcD4ge1xuICAgICAgICBpZiAoc2VuZGVyLmlkICE9PSBjaHJvbWUucnVudGltZS5pZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0IHRvIGFjY2VzcyByZXN0cmljdGVkIG1ldGhvZCBvdXRzaWRlIG9mIHNlY3VyZSBjb250ZXh0IChpZS4gY29udGVudCBzY3JpcHQpJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmhhbmRsZVJlcXVlc3QocmVxdWVzdCwgc2VuZGVyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0ludGVybmFsUmVxdWVzdEJ1bmRsZSwgSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSwgVmVyc2lvbn0gZnJvbSAnLi4vYnJpZGdlL3R5cGVzJztcbmltcG9ydCB7cnVudGltZU5hbWVzcGFjZX0gZnJvbSAnLi4vdXRpbHMvZGV0ZWN0JztcblxuLyoqXG4gKiBNZXNzYWdlIGJ1cyB0aGF0IHVzZXMgYHBvc3RNZXNzYWdlYCBpbiBvcmRlciB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBiYWNrZ3JvdW5kXG4gKiBzZXJ2aWNlIHdvcmtlci9zY3JpcHQuXG4gKlxuICogV2h5PyBCZWNhdXNlIHRoZSBjbGllbnQgcGFnZSAoaWUuIFN0ZWFtIHBhZ2UpIG9uIEZpcmVmb3ggaXMgbm90IGNhcGFibGUgb2ZcbiAqIHNlbmRpbmcgYSBtZXNzYWdlIGRpcmVjdGx5IHRvIHRoZSBleHRlbnNpb24gYmFja2dyb3VuZC5cbiAqXG4gKiBTbyBpdCByZXF1aXJlcyB1cyB0byBkbyB0aGUgZm9sbG93aW5nIGRhbmNlOlxuICogcGFnZSA8LS0ocG9zdG1lc3NhZ2UpLS0+IGNvbnRlbnQgc2NyaXB0IDwtLShzZW5kbWVzc2FnZSktLT4gYmFja2dyb3VuZCBzY3JpcHRcbiAqXG4gKiBUaGlzIGRhbmNlIGlzIGFic3RyYWN0ZWQgaW4gYENsaWVudFNlbmRgLCBhbmQgb25seSB1c2VzIHRoaXMgYnVzIGlmXG4gKiBgc2VuZG1lc3NhZ2VgIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIHBhZ2UuXG4gKi9cbmNsYXNzIFBvc3RNZXNzYWdlQnVzIHtcbiAgICAvKipcbiAgICAgKiBGb3IgdGhlIHJlcXVlc3RlciAoaWUuIHBhZ2UpLCB0byB3YWl0IHVudGlsIGl0IGdldHMgYSByZXNwb25zZVxuICAgICAqIGZyb20gdGhlIGNvbnRlbnQgc2NyaXB0IHZpYS4gcG9zdE1lc3NhZ2UgZm9yIHRoZSBnaXZlbiByZXF1ZXN0IElEXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgUmVxdWVzdCBJRFxuICAgICAqL1xuICAgIHdhaXRVbnRpbFJlc3BvbnNlRm9yKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IChlOiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwID0gZS5kYXRhIGFzIEludGVybmFsUmVzcG9uc2VCdW5kbGU7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuaWQgIT09IGlkIHx8ICFyZXNwLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGxlYWtzXG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVyLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcD8ucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcD8uZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcmVxdWVzdCB0byBiZSBkb25lIHRocm91Z2ggdGhlIGJ1cywgcmV0dXJucyB0aGUgYXBwcm9wcmlhdGVcbiAgICAgKiByZXNwb25zZSBmb3IgdGhlIGlucHV0IGJ1bmRsZSBoYW5kbGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYnVuZGxlIFJlcXVlc3QgQnVuZGxlXG4gICAgICovXG4gICAgc2VuZFJlcXVlc3QoYnVuZGxlOiBJbnRlcm5hbFJlcXVlc3RCdW5kbGUpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoYnVuZGxlKTtcblxuICAgICAgICByZXR1cm4gdGhpcy53YWl0VW50aWxSZXNwb25zZUZvcihidW5kbGUuaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgaGFuZGxlciAoY29udGVudCBzY3JpcHQpIGZvciBuZXcgcmVxdWVzdHMgZnJvbSB0aGUgcGFnZS5cbiAgICAgKlxuICAgICAqIEVhY2ggcmVxdWVzdCBpcyBlZmZlY3RpdmVseSBcInByb3hpZWRcIiB0byB0aGUgYmFja2dyb3VuZCBzY3JpcHQvd29ya2VyXG4gICAgICogdG8gYWN0dWFsbHkgZXhlY3V0ZSBpdCdzIGhhbmRsZXIuXG4gICAgICovXG4gICAgaGFuZGxlUmVxdWVzdHMoKSB7XG4gICAgICAgIGNvbnN0IGggPSAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5kYXRhLnZlcnNpb24gIT09IFZlcnNpb24uVjEgfHwgIWUuZGF0YS5yZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIG1lc3NhZ2VzIHRoYXQgYXJlbid0IGZvciB0aGlzIGJyaWRnZVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VuZCB0byB0aGUgYmFja2dyb3VuZCBzY3JpcHRcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgQmFkIHR5cGVzXG4gICAgICAgICAgICBydW50aW1lTmFtZXNwYWNlKCkucnVudGltZS5zZW5kTWVzc2FnZShcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5pZCxcbiAgICAgICAgICAgICAgICBlLmRhdGEsXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBCYWQgdHlwZXNcbiAgICAgICAgICAgICAgICAocmVzcDogSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UocmVzcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdfUG9zdE1lc3NhZ2VCdXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoKTtcbiIsImltcG9ydCB7Y3NzLCBodG1sfSBmcm9tICdsaXQnO1xuaW1wb3J0IHtjbGFzc01hcH0gZnJvbSAnbGl0LWh0bWwvZGlyZWN0aXZlcy9jbGFzcy1tYXAuanMnO1xuXG5pbXBvcnQge3Byb3BlcnR5fSBmcm9tICdsaXQvZGVjb3JhdG9ycy5qcyc7XG5pbXBvcnQge0N1c3RvbUVsZW1lbnR9IGZyb20gJy4uLy4uL2luamVjdG9ycyc7XG5pbXBvcnQge0Zsb2F0RWxlbWVudH0gZnJvbSAnLi4vLi4vY3VzdG9tJztcblxuZW51bSBCdXR0b25UeXBlIHtcbiAgICBHcmVlbldoaXRlID0gJ2dyZWVuX3doaXRlJyxcbiAgICBHcmV5V2hpdGUgPSAnZ3JleV93aGl0ZScsXG59XG5cbkBDdXN0b21FbGVtZW50KClcbmV4cG9ydCBjbGFzcyBTdGVhbUJ1dHRvbiBleHRlbmRzIEZsb2F0RWxlbWVudCB7XG4gICAgQHByb3BlcnR5KHt0eXBlOiBTdHJpbmd9KVxuICAgIHByaXZhdGUgdGV4dDogc3RyaW5nID0gJyc7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6IFN0cmluZ30pXG4gICAgcHJpdmF0ZSB0eXBlOiBCdXR0b25UeXBlID0gQnV0dG9uVHlwZS5HcmVlbldoaXRlO1xuXG4gICAgc3RhdGljIHN0eWxlcyA9IFtcbiAgICAgICAgLi4uRmxvYXRFbGVtZW50LnN0eWxlcyxcbiAgICAgICAgY3NzYFxuICAgICAgICAgICAgLmJ0bl9ncmVlbl93aGl0ZV9pbm5lcmZhZGUge1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMXB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNkMmU4ODUgIWltcG9ydGFudDtcblxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNhNGQwMDc7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjYTRkMDA3IDUlLCAjNTM2OTA0IDk1JSk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgI2E0ZDAwNyA1JSwgIzUzNjkwNCA5NSUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuYnRuX2dyZWVuX3doaXRlX2lubmVyZmFkZSA+IHNwYW4ge1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcblxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICM3OTk5MDU7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjNzk5OTA1IDUlLCAjNTM2OTA0IDk1JSk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgIzc5OTkwNSA1JSwgIzUzNjkwNCA5NSUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuYnRuX2dyZWVuX3doaXRlX2lubmVyZmFkZTpub3QoLmJ0bl9kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCk6bm90KC5idG5fYWN0aXZlKTpub3QoLmFjdGl2ZSk6aG92ZXIge1xuICAgICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG5cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjYjZkOTA4O1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2I2ZDkwOCA1JSwgIzgwYTAwNiA5NSUpO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNiNmQ5MDggNSUsICM4MGEwMDYgOTUlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmJ0bl9ncmVlbl93aGl0ZV9pbm5lcmZhZGU6bm90KC5idG5fZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpOm5vdCguYnRuX2FjdGl2ZSk6bm90KC5hY3RpdmUpOmhvdmVyID4gc3BhbiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ExYmYwNztcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNhMWJmMDcgNSUsICM4MGEwMDYgOTUlKTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjYTFiZjA3IDUlLCAjODBhMDA2IDk1JSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5idG5fZ3JleV93aGl0ZV9pbm5lcmZhZGUge1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMXB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcblxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNhY2I1YmQ7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjYWNiNWJkIDUlLCAjNDE0YTUyIDk1JSk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgI2FjYjViZCA1JSwgIzQxNGE1MiA5NSUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuYnRuX2dyZXlfd2hpdGVfaW5uZXJmYWRlID4gc3BhbiB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzc3ODA4ODtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICM3NzgwODggNSUsICM0MTRhNTIgOTUlKTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjNzc4MDg4IDUlLCAjNDE0YTUyIDk1JSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5idG5fZ3JleV93aGl0ZV9pbm5lcmZhZGU6bm90KC5idG5fZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpOm5vdCguYnRuX2FjdGl2ZSk6bm90KC5hY3RpdmUpOmhvdmVyIHtcbiAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xuXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2NmZDhlMDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNjZmQ4ZTAgNSUsICM1NjVmNjcgOTUlKTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjY2ZkOGUwIDUlLCAjNTY1ZjY3IDk1JSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5idG5fZ3JleV93aGl0ZV9pbm5lcmZhZGU6bm90KC5idG5fZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpOm5vdCguYnRuX2FjdGl2ZSk6bm90KC5hY3RpdmUpOmhvdmVyID4gc3BhbiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzk5YTJhYTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICM5OWEyYWEgNSUsICM1NjVmNjcgOTUlKTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjOTlhMmFhIDUlLCAjNTY1ZjY3IDk1JSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5idG5fc21hbGwgPiBzcGFuIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwIDE1cHg7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICBgLFxuICAgIF07XG5cbiAgICBhc3luYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBidG5DbGFzcygpIHtcbiAgICAgICAgY29uc3Qgcjoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge2J0bl9zbWFsbDogdHJ1ZX07XG4gICAgICAgIHJbYGJ0bl8ke3RoaXMudHlwZX1faW5uZXJmYWRlYF0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gY2xhc3NNYXAocik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gaHRtbGBcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiJHt0aGlzLmJ0bkNsYXNzKCl9XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+JHt0aGlzLnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICBgO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Y3NzLCBMaXRFbGVtZW50fSBmcm9tICdsaXQnO1xuXG5mdW5jdGlvbiBjYW1lbFRvRGFzaENhc2Uoc3RyOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAgICAgLmpvaW4oJy0nKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbn1cblxuLy8gTGl0RWxlbWVudCB3cmFwcGVyIHdpdGggYSBwcmUtZGV0ZXJtaW5lZCB0YWdcbmV4cG9ydCBjbGFzcyBGbG9hdEVsZW1lbnQgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgICBzdGF0aWMgc3R5bGVzID0gW1xuICAgICAgICBjc3NgXG4gICAgICAgICAgICBociB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzFiMjkzOTtcbiAgICAgICAgICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkIG5vbmUgbm9uZTtcbiAgICAgICAgICAgICAgICBib3JkZXItY29sb3I6IGJsYWNrO1xuICAgICAgICAgICAgICAgIGJvcmRlci13aWR0aDogMXB4IDAgMDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYSB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNlYmViZWI7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbnB1dFt0eXBlPSd0ZXh0J10sXG4gICAgICAgICAgICBpbnB1dFt0eXBlPSdwYXNzd29yZCddLFxuICAgICAgICAgICAgaW5wdXRbdHlwZT0nbnVtYmVyJ10sXG4gICAgICAgICAgICBzZWxlY3Qge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjOTA5MDkwO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5wdXRbdHlwZT0nY29sb3InXSB7XG4gICAgICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgICAgICAgICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0W3R5cGU9J2NvbG9yJ106Oi13ZWJraXQtY29sb3Itc3dhdGNoLXdyYXBwZXIge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0W3R5cGU9J2NvbG9yJ106Oi13ZWJraXQtY29sb3Itc3dhdGNoIHtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIGAsXG4gICAgXTtcblxuICAgIHN0YXRpYyB0YWcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBjc2Zsb2F0LSR7Y2FtZWxUb0Rhc2hDYXNlKHRoaXMubmFtZSl9YDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZWxlbSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZygpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge2N1c3RvbUVsZW1lbnR9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcbmltcG9ydCB7RmxvYXRFbGVtZW50fSBmcm9tICcuL2N1c3RvbSc7XG5pbXBvcnQge2luUGFnZUNvbnRleHR9IGZyb20gJy4uL3V0aWxzL3NuaXBzJztcblxuZXhwb3J0IGVudW0gSW5qZWN0aW9uTW9kZSB7XG4gICAgLy8gSW5qZWN0cyBvbmNlIGF0IHBhZ2UgbG9hZCBmb3IgZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yXG4gICAgT05DRSxcbiAgICAvLyBDb250aW51YWxseSBpbmplY3RzIHdoZW5ldmVyIG5ldyBlbGVtZW50cyB0aGF0IG1hdGNoIHRoZVxuICAgIC8vIHNlbGVjdG9yIGV4aXN0IHRoYXQgaGF2ZW4ndCBiZWVuIGluamVjdGVkIGludG8geWV0XG4gICAgLy9cbiAgICAvLyBTaG91bGQgYmUgdXNlIGZvciBcImR5bmFtaWNcIiBlbGVtZW50c1xuICAgIENPTlRJTlVPVVMsXG59XG5cbmVudW0gSW5qZWN0aW9uVHlwZSB7XG4gICAgQXBwZW5kLFxuICAgIEJlZm9yZSxcbiAgICBBZnRlcixcbn1cblxuaW50ZXJmYWNlIEluamVjdGlvbkNvbmZpZyB7XG4gICAgZXhpc3RzOiAoY3R4OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBzZWxlY3Rvcjogc3RyaW5nKSA9PiBib29sZWFuO1xuICAgIG9wOiAoY3R4OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB0YXJnZXQ6IHR5cGVvZiBGbG9hdEVsZW1lbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEluamVjdGlvbkNvbmZpZ3M6IHtba2V5IGluIEluamVjdGlvblR5cGVdOiBJbmplY3Rpb25Db25maWd9ID0ge1xuICAgIFtJbmplY3Rpb25UeXBlLkFwcGVuZF06IHtcbiAgICAgICAgZXhpc3RzOiAoY3R4LCBzZWxlY3RvcikgPT4gISFjdHguY2hpbGRyZW4oc2VsZWN0b3IpLmxlbmd0aCxcbiAgICAgICAgb3A6IChjdHgsIHRhcmdldCkgPT4gY3R4LmFwcGVuZCh0YXJnZXQuZWxlbSgpKSxcbiAgICB9LFxuICAgIFtJbmplY3Rpb25UeXBlLkJlZm9yZV06IHtcbiAgICAgICAgZXhpc3RzOiAoY3R4LCBzZWxlY3RvcikgPT4gISFjdHgucGFyZW50KCkuY2hpbGRyZW4oc2VsZWN0b3IpLmxlbmd0aCxcbiAgICAgICAgb3A6IChjdHgsIHRhcmdldCkgPT4gY3R4LmJlZm9yZSh0YXJnZXQuZWxlbSgpKSxcbiAgICB9LFxuICAgIFtJbmplY3Rpb25UeXBlLkFmdGVyXToge1xuICAgICAgICBleGlzdHM6IChjdHgsIHNlbGVjdG9yKSA9PiAhIWN0eC5wYXJlbnQoKS5jaGlsZHJlbihzZWxlY3RvcikubGVuZ3RoLFxuICAgICAgICBvcDogKGN0eCwgdGFyZ2V0KSA9PiBjdHguYWZ0ZXIodGFyZ2V0LmVsZW0oKSksXG4gICAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBDdXN0b21FbGVtZW50KCk6IGFueSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IHR5cGVvZiBGbG9hdEVsZW1lbnQsIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgICAgICBpZiAoIWluUGFnZUNvbnRleHQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1c3RvbUVsZW1lbnRzLmdldCh0YXJnZXQudGFnKCkpKSB7XG4gICAgICAgICAgICAvLyBBbHJlYWR5IGRlZmluZWRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1c3RvbUVsZW1lbnQodGFyZ2V0LnRhZygpKSh0YXJnZXQpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIEluamVjdChzZWxlY3Rvcjogc3RyaW5nLCBtb2RlOiBJbmplY3Rpb25Nb2RlLCB0eXBlOiBJbmplY3Rpb25UeXBlKTogYW55IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldDogdHlwZW9mIEZsb2F0RWxlbWVudCwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgICAgIGlmICghaW5QYWdlQ29udGV4dCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlIEluamVjdGlvbk1vZGUuT05DRTpcbiAgICAgICAgICAgICAgICAkSihzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIEluamVjdGlvbkNvbmZpZ3NbdHlwZV0ub3AoJEoodGhpcyksIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEluamVjdGlvbk1vZGUuQ09OVElOVU9VUzpcbiAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICRKKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGFkZCB0aGUgaXRlbSBhZ2FpbiBpZiB3ZSBhbHJlYWR5IGhhdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJbmplY3Rpb25Db25maWdzW3R5cGVdLmV4aXN0cygkSih0aGlzKSwgdGFyZ2V0LnRhZygpKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBJbmplY3Rpb25Db25maWdzW3R5cGVdLm9wKCRKKHRoaXMpLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAyNTApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEluamVjdEFwcGVuZChzZWxlY3Rvcjogc3RyaW5nLCBtb2RlOiBJbmplY3Rpb25Nb2RlID0gSW5qZWN0aW9uTW9kZS5PTkNFKTogYW55IHtcbiAgICByZXR1cm4gSW5qZWN0KHNlbGVjdG9yLCBtb2RlLCBJbmplY3Rpb25UeXBlLkFwcGVuZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmplY3RCZWZvcmUoc2VsZWN0b3I6IHN0cmluZywgbW9kZTogSW5qZWN0aW9uTW9kZSA9IEluamVjdGlvbk1vZGUuT05DRSk6IGFueSB7XG4gICAgcmV0dXJuIEluamVjdChzZWxlY3RvciwgbW9kZSwgSW5qZWN0aW9uVHlwZS5CZWZvcmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW5qZWN0QWZ0ZXIoc2VsZWN0b3I6IHN0cmluZywgbW9kZTogSW5qZWN0aW9uTW9kZSA9IEluamVjdGlvbk1vZGUuT05DRSk6IGFueSB7XG4gICAgcmV0dXJuIEluamVjdChzZWxlY3RvciwgbW9kZSwgSW5qZWN0aW9uVHlwZS5BZnRlcik7XG59XG4iLCJmdW5jdGlvbiBoaXN0b3J5Um93SGFzaGNvZGUocm93OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgY29uc3QgdGV4dCA9IHJvdy5pbm5lclRleHQucmVwbGFjZSgvXFxXL2csICcnKTtcblxuICAgIC8qIEJhc2VkIG9uIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84ODMxOTM3IChKYXZhJ3MgaGFzaENvZGUoKSBtZXRob2QpICovXG4gICAgaWYgKHRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBsZXQgaGFzaCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoYXIgPSB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGhhc2ggPSAoaGFzaCA8PCA1KSAtIGhhc2ggKyBjaGFyO1xuICAgICAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc2gudG9TdHJpbmcoKTtcbn1cblxuZnVuY3Rpb24gZ2V0VGltZXN0YW1wRnJvbVRyYWRlKHJvdzogSFRNTEVsZW1lbnQpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBkYXRlRGl2ID0gcm93LnF1ZXJ5U2VsZWN0b3IoJy50cmFkZWhpc3RvcnlfZGF0ZScpO1xuICAgIGlmICghZGF0ZURpdikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRlID0gZGF0ZURpdi5maXJzdENoaWxkIS5ub2RlVmFsdWUhLnRyaW0oKTtcbiAgICBjb25zdCB0aW1lID0gKGRhdGVEaXYucXVlcnlTZWxlY3RvcignLnRyYWRlaGlzdG9yeV90aW1lc3RhbXAnKSEgYXMgSFRNTEVsZW1lbnQpLmlubmVyVGV4dDtcblxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICBjb25zdCBwdXJlID0gdGltZS5yZXBsYWNlKCdhbScsICcnKS5yZXBsYWNlKCdwbScsICcnKTtcbiAgICBsZXQgaG91cnMgPSBwYXJzZUludChwdXJlLnNwbGl0KCc6JylbMF0pO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZUludChwdXJlLnNwbGl0KCc6JylbMV0pO1xuICAgIGlmICh0aW1lLmluY2x1ZGVzKCdwbScpICYmIGhvdXJzICE9PSAxMikge1xuICAgICAgICAvKiBQcmV2ZW50IDEyOlhYcG0gZnJvbSBnZXR0aW5nIDEyIGhvdXJzIGFkZGVkICovXG4gICAgICAgIGhvdXJzICs9IDEyO1xuICAgIH0gZWxzZSBpZiAodGltZS5pbmNsdWRlcygnYW0nKSAmJiBob3VycyA9PT0gMTIpIHtcbiAgICAgICAgLyogUHJldmVudCAxMjpYWGFtIGZyb20gZ2V0dGluZyAxMiBob3VycyBpbnN0ZWFkIG9mIGJlaW5nIDAgKi9cbiAgICAgICAgaG91cnMgLT0gMTI7XG4gICAgfVxuXG4gICAgZC5zZXRIb3Vycyhob3Vycyk7XG4gICAgZC5zZXRNaW51dGVzKG1pbnV0ZXMpO1xuICAgIHJldHVybiBkLmdldFRpbWUoKSAvIDEwMDA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhc1RyYWRlQmVmb3JlVGltZShoYXNoQ29kZTogc3RyaW5nLCB0aW1lc3RhbXA6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYCR7bG9jYXRpb24ucHJvdG9jb2x9Ly8ke2xvY2F0aW9uLmhvc3R9JHtsb2NhdGlvbi5wYXRobmFtZX0/YWZ0ZXJfdGltZT0ke3RpbWVzdGFtcH0mbD1lbmdsaXNoYCxcbiAgICAgICAge1xuICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlc3AudGV4dCgpO1xuXG4gICAgaWYgKGJvZHkuaW5jbHVkZXMoJ3RvbyBtYW55IHJlcXVlc3RzJykpIHtcbiAgICAgICAgYWxlcnQoJ1lvdSBuZWVkIHRvIHdhaXQgYSBjb3VwbGUgc2Vjb25kcyBiZWZvcmUgZ2VuZXJhdGluZyB0aGUgcHJvb2YgZHVlIHRvIFZhbHZlIHJhdGUtbGltaXRzJyk7XG4gICAgICAgIHRocm93ICdUb28gbWFueSByZXF1ZXN0cyc7XG4gICAgfVxuXG4gICAgY29uc3QgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhib2R5LCAndGV4dC9odG1sJyk7XG4gICAgY29uc3Qgcm93cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCcudHJhZGVoaXN0b3J5cm93JykgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG5cbiAgICBmb3IgKGNvbnN0IHJvdyBvZiByb3dzKSB7XG4gICAgICAgIGNvbnN0IHRoaXNDb2RlID0gaGlzdG9yeVJvd0hhc2hjb2RlKHJvdyk7XG4gICAgICAgIGlmICh0aGlzQ29kZSA9PT0gaGFzaENvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEVuZ2xpc2hSb3coaW5kZXg6IG51bWJlcik6IFByb21pc2U8SFRNTEVsZW1lbnQ+IHtcbiAgICBsZXQgcXVlcnlQYXJhbXMgPSBsb2NhdGlvbi5zZWFyY2g7XG4gICAgaWYgKHF1ZXJ5UGFyYW1zID09PSAnJykge1xuICAgICAgICBxdWVyeVBhcmFtcyA9ICc/bD1lbmdsaXNoJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeVBhcmFtcyArPSAnJmw9ZW5nbGlzaCc7XG4gICAgfVxuXG4gICAgLyogRm9yY2VzIHVzIHRvIGZldGNoIHRoZSBlbmdsaXNoIHZlcnNpb24gb2YgdGhlIHJvdyBhdCBhIGdpdmVuIGluZGV4IG5vIG1hdHRlciB3aGF0ICovXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKGAke2xvY2F0aW9uLnByb3RvY29sfS8vJHtsb2NhdGlvbi5ob3N0fSR7bG9jYXRpb24ucGF0aG5hbWV9JHtxdWVyeVBhcmFtc31gLCB7XG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlc3AudGV4dCgpO1xuXG4gICAgY29uc3QgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhib2R5LCAndGV4dC9odG1sJyk7XG4gICAgY29uc3Qgcm93cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCcudHJhZGVoaXN0b3J5cm93Jyk7XG4gICAgcmV0dXJuIHJvd3NbaW5kZXhdIGFzIEhUTUxFbGVtZW50O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGxpc3RpbmcgdGltZSBvZiB0aGUgcm93IGF0IHtAcGFyYW0gaW5kZXh9XG4gKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGhlIHRyYWRlIGhpc3Rvcnkgcm93IG9uIHRoZSBwYWdlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaExpc3RpbmdUaW1lKGluZGV4OiBudW1iZXIpOiBQcm9taXNlPG51bWJlciB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IG5vZGUgPSBhd2FpdCBmZXRjaEVuZ2xpc2hSb3coaW5kZXgpO1xuICAgIGNvbnN0IGhhc2hDb2RlID0gaGlzdG9yeVJvd0hhc2hjb2RlKG5vZGUpO1xuXG4gICAgY29uc3QgdGltZXN0YW1wID0gZ2V0VGltZXN0YW1wRnJvbVRyYWRlKG5vZGUpO1xuICAgIGlmICghdGltZXN0YW1wKSB7XG4gICAgICAgIHRocm93ICdmYWlsZWQgdGltZXN0YW1wIGNyZWF0aW9uJztcbiAgICB9XG5cbiAgICBsZXQgbGVmdCA9IDAsXG4gICAgICAgIHJpZ2h0ID0gNjA7XG4gICAgbGV0IGFtdCA9IDA7XG4gICAgd2hpbGUgKGxlZnQgPCByaWdodCAmJiBhbXQgPCA1KSB7XG4gICAgICAgIGNvbnN0IG1pZGRsZSA9IGxlZnQgKyBNYXRoLmZsb29yKChyaWdodCAtIGxlZnQpIC8gMik7XG4gICAgICAgIGNvbnN0IGhhc1RyYWRlID0gYXdhaXQgaGFzVHJhZGVCZWZvcmVUaW1lKGhhc2hDb2RlLCB0aW1lc3RhbXAgKyBtaWRkbGUpO1xuICAgICAgICBpZiAoaGFzVHJhZGUpIHtcbiAgICAgICAgICAgIHJpZ2h0ID0gbWlkZGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGVmdCA9IG1pZGRsZTtcbiAgICAgICAgfVxuICAgICAgICBhbXQrKztcbiAgICB9XG5cbiAgICAvKiBIZWxsbyB0byBhbGwgdGhlIHJldmVyc2VycyAqL1xuICAgIHJldHVybiB0aW1lc3RhbXAgKyBNYXRoLmZsb29yKChyaWdodCArIGxlZnQpIC8gMik7XG59XG4iLCJpbXBvcnQge2h0bWx9IGZyb20gJ2xpdCc7XG5cbmltcG9ydCB7c3RhdGV9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcbmltcG9ydCB7Q3VzdG9tRWxlbWVudCwgSW5qZWN0QXBwZW5kLCBJbmplY3Rpb25Nb2RlfSBmcm9tICcuLi9pbmplY3RvcnMnO1xuaW1wb3J0IHtGbG9hdEVsZW1lbnR9IGZyb20gJy4uL2N1c3RvbSc7XG5pbXBvcnQge2ZldGNoTGlzdGluZ1RpbWV9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgJy4uL2NvbW1vbi91aS9zdGVhbS1idXR0b24nO1xuXG5AQ3VzdG9tRWxlbWVudCgpXG5ASW5qZWN0QXBwZW5kKCcudHJhZGVoaXN0b3J5cm93IC50cmFkZWhpc3RvcnlfY29udGVudCcsIEluamVjdGlvbk1vZGUuQ09OVElOVU9VUylcbmV4cG9ydCBjbGFzcyBUcmFkZVByb29mIGV4dGVuZHMgRmxvYXRFbGVtZW50IHtcbiAgICBAc3RhdGUoKVxuICAgIHByaXZhdGUgcHJvb2ZOdW1iZXI6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBzdGF0ZSgpXG4gICAgcHJpdmF0ZSBpc1Byb2Nlc3NpbmcgPSBmYWxzZTtcblxuICAgIGFzeW5jIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvb2ZOdW1iZXJcbiAgICAgICAgICAgID8gaHRtbGAgPHNwYW4+UHJvb2Y6ICR7dGhpcy5wcm9vZk51bWJlcn08L3NwYW4+IGBcbiAgICAgICAgICAgIDogaHRtbGBcbiAgICAgICAgICAgICAgICAgIDxjc2Zsb2F0LXN0ZWFtLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5vbkNsaWNrfVwiXG4gICAgICAgICAgICAgICAgICAgICAgLnRleHQ9XCIke3RoaXMuaXNQcm9jZXNzaW5nID8gJ0NvbXB1dGluZyBQcm9vZi4uLicgOiAnQ1NGbG9hdCBQcm9vZid9XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDwvY3NmbG9hdC1zdGVhbS1idXR0b24+XG4gICAgICAgICAgICAgIGA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBvbkNsaWNrKCkge1xuICAgICAgICB0aGlzLmlzUHJvY2Vzc2luZyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSAkSignLnRyYWRlaGlzdG9yeXJvdycpLmluZGV4KCRKKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucHJvb2ZOdW1iZXIgPSBhd2FpdCBmZXRjaExpc3RpbmdUaW1lKGluZGV4KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYWxlcnQoXG4gICAgICAgICAgICAgICAgXCJGYWlsZWQgdG8gcGFyc2UgdGltZSwgbWFrZSBzdXJlIHlvdSdyZSBvbiBhbiBlbmdsaXNoIHZlcnNpb24gb2YgdGhlIHBhZ2UgYnkgYXBwZW5kaW5nID9sPWVuZ2xpc2ggdG8gdGhlIHVybFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFeGVjdXRlU2NyaXB0T25QYWdlfSBmcm9tICcuLi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9zY3JpcHQnO1xuaW1wb3J0IHtDbGllbnRTZW5kfSBmcm9tICcuLi9icmlkZ2UvY2xpZW50JztcbmltcG9ydCB7aW5QYWdlQ29udGV4dH0gZnJvbSAnLi4vdXRpbHMvc25pcHMnO1xuaW1wb3J0IHtFeGVjdXRlQ3NzT25QYWdlfSBmcm9tICcuLi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9jc3MnO1xuaW1wb3J0IHtGZXRjaEV4dGVuc2lvbkZpbGV9IGZyb20gJy4uL2JyaWRnZS9oYW5kbGVycy9mZXRjaF9leHRlbnNpb25fZmlsZSc7XG5pbXBvcnQge2lzRmlyZWZveH0gZnJvbSAnLi4vdXRpbHMvZGV0ZWN0JztcbmltcG9ydCB7Z19Qb3N0TWVzc2FnZUJ1c30gZnJvbSAnLi4vYnVzL3Bvc3RfbWVzc2FnZV9idXMnO1xuXG5hc3luYyBmdW5jdGlvbiBpbml0aWF0ZUNocm9taXVtKHNjcmlwdFBhdGg6IHN0cmluZykge1xuICAgIENsaWVudFNlbmQoRXhlY3V0ZUNzc09uUGFnZSwge1xuICAgICAgICBwYXRoOiAnc3JjL2dsb2JhbC5jc3MnLFxuICAgIH0pO1xuXG4gICAgQ2xpZW50U2VuZChFeGVjdXRlU2NyaXB0T25QYWdlLCB7XG4gICAgICAgIHBhdGg6IHNjcmlwdFBhdGgsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYXRlRmlyZWZveChzY3JpcHRQYXRoOiBzdHJpbmcpIHtcbiAgICBnX1Bvc3RNZXNzYWdlQnVzLmhhbmRsZVJlcXVlc3RzKCk7XG5cbiAgICAvLyBXaHkgZG8gd2UgbmVlZCB0byB1c2UgbWFudWFsIERPTSBzY3JpcHQgaW5qZWN0aW9uIGFuZFxuICAgIC8vIGZldGNoIHRoZSB0ZXh0IG9mIHRoZSBzY3JpcHQ/XG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jc2Zsb2F0L2V4dGVuc2lvbi9pc3N1ZXMvMTU1I2lzc3VlY29tbWVudC0xNjM5NzgxOTE0XG5cbiAgICAvLyBXZSB3YW50IHRvIGluamVjdCB0aGUgSUQgb2YgdGhlIGV4dGVuc2lvblxuICAgIGNvbnN0IGlkID0gYnJvd3Nlci5ydW50aW1lLmlkO1xuICAgIGNvbnN0IG1vZGVsVXJsID0gYnJvd3Nlci5ydW50aW1lLmdldFVSTCgnc3JjL21vZGVsX2ZyYW1lLmh0bWwnKTtcbiAgICBjb25zdCBlbnRyeVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIGVudHJ5U2NyaXB0LmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgXG4gICAgICAgIHdpbmRvdy5DU0ZMT0FUX0VYVEVOU0lPTl9JRCA9ICcke2lkfSc7XG4gICAgICAgIHdpbmRvdy5DU0ZMT0FUX01PREVMX0ZSQU1FX1VSTCA9ICcke21vZGVsVXJsfSc7XG4gICAgYClcbiAgICApO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW50cnlTY3JpcHQpO1xuXG4gICAgY29uc3Qgc2NyaXB0UmVzcCA9IGF3YWl0IENsaWVudFNlbmQoRmV0Y2hFeHRlbnNpb25GaWxlLCB7XG4gICAgICAgIHBhdGg6IHNjcmlwdFBhdGgsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2NyaXB0UmVzcC50ZXh0KSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gICAgY29uc3Qgc3R5bGVSZXNwID0gYXdhaXQgQ2xpZW50U2VuZChGZXRjaEV4dGVuc2lvbkZpbGUsIHtcbiAgICAgICAgcGF0aDogJ3NyYy9nbG9iYWwuY3NzJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHlsZVJlc3AudGV4dCkpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhZ2Ugc2NyaXB0LCBleGVjdXRpbmcgaXQgaW4gdGhlIHBhZ2UgY29udGV4dCBpZiBuZWNlc3NhcnlcbiAqXG4gKiBAcGFyYW0gc2NyaXB0UGF0aCBSZWxhdGl2ZSBwYXRoIG9mIHRoZSBzY3JpcHQgKGFsd2F5cyBpbiAuanMpXG4gKiBAcGFyYW0gaWZQYWdlIEZuIHRvIHJ1biBpZiB3ZSBhcmUgaW4gdGhlIHBhZ2UncyBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdChzY3JpcHRQYXRoOiBzdHJpbmcsIGlmUGFnZTogKCkgPT4gYW55KSB7XG4gICAgLy8gRG9uJ3QgYWxsb3cgdGhlIHBhZ2Ugc2NyaXB0IHRvIHJ1biB0aGlzLlxuICAgIGlmIChpblBhZ2VDb250ZXh0KCkpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBTZXQgZ2xvYmFsIGlkZW50aWZpZXIgZm9yIG90aGVyIGV4dGVuc2lvbnMgdG8gdXNlXG4gICAgICAgIHdpbmRvdy5jc2Zsb2F0ID0gdHJ1ZTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBEZXByZWNhdGVkIG5hbWVcbiAgICAgICAgd2luZG93LmNzZ29mbG9hdCA9IHRydWU7XG5cbiAgICAgICAgaWZQYWdlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNGaXJlZm94KCkpIHtcbiAgICAgICAgYXdhaXQgaW5pdGlhdGVGaXJlZm94KHNjcmlwdFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGluaXRpYXRlQ2hyb21pdW0oc2NyaXB0UGF0aCk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYyBDU0Zsb2F0IE1hcmtldCBDaGVja2VyICh2JHtjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLnZlcnNpb259KSBieSBTdGVwNzc1MCBgLFxuICAgICAgICAnYmFja2dyb3VuZDogIzAwNDU5NDsgY29sb3I6ICNmZmY7J1xuICAgICk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAgICclYyBDaGFuZ2Vsb2cgY2FuIGJlIGZvdW5kIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9jc2Zsb2F0L2V4dGVuc2lvbiAnLFxuICAgICAgICAnYmFja2dyb3VuZDogIzAwNDU5NDsgY29sb3I6ICNmZmY7J1xuICAgICk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaXNGaXJlZm94KCkge1xuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpID4gLTE7XG59XG5cbi8qKlxuICogVGhhbmtzIHRvIG91ciBicm93c2VyIG92ZXJsb3Jkcywgd2UgaGF2ZSB0d28gbmFtZXNwYWNlcyBmb3IgYHgucnVudGltZS5mbigpYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcnVudGltZU5hbWVzcGFjZSgpIHtcbiAgICBpZiAoaXNGaXJlZm94KCkpIHtcbiAgICAgICAgcmV0dXJuIGJyb3dzZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNocm9tZTtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaW5QYWdlQ29udGV4dCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIGNocm9tZSA9PT0gJ3VuZGVmaW5lZCcgfHwgIWNocm9tZS5leHRlbnNpb247XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmNvbnN0IHQ9d2luZG93LGU9dC5TaGFkb3dSb290JiYodm9pZCAwPT09dC5TaGFkeUNTU3x8dC5TaGFkeUNTUy5uYXRpdmVTaGFkb3cpJiZcImFkb3B0ZWRTdHlsZVNoZWV0c1wiaW4gRG9jdW1lbnQucHJvdG90eXBlJiZcInJlcGxhY2VcImluIENTU1N0eWxlU2hlZXQucHJvdG90eXBlLHM9U3ltYm9sKCksbj1uZXcgV2Vha01hcDtjbGFzcyBve2NvbnN0cnVjdG9yKHQsZSxuKXtpZih0aGlzLl8kY3NzUmVzdWx0JD0hMCxuIT09cyl0aHJvdyBFcnJvcihcIkNTU1Jlc3VsdCBpcyBub3QgY29uc3RydWN0YWJsZS4gVXNlIGB1bnNhZmVDU1NgIG9yIGBjc3NgIGluc3RlYWQuXCIpO3RoaXMuY3NzVGV4dD10LHRoaXMudD1lfWdldCBzdHlsZVNoZWV0KCl7bGV0IHQ9dGhpcy5vO2NvbnN0IHM9dGhpcy50O2lmKGUmJnZvaWQgMD09PXQpe2NvbnN0IGU9dm9pZCAwIT09cyYmMT09PXMubGVuZ3RoO2UmJih0PW4uZ2V0KHMpKSx2b2lkIDA9PT10JiYoKHRoaXMubz10PW5ldyBDU1NTdHlsZVNoZWV0KS5yZXBsYWNlU3luYyh0aGlzLmNzc1RleHQpLGUmJm4uc2V0KHMsdCkpfXJldHVybiB0fXRvU3RyaW5nKCl7cmV0dXJuIHRoaXMuY3NzVGV4dH19Y29uc3Qgcj10PT5uZXcgbyhcInN0cmluZ1wiPT10eXBlb2YgdD90OnQrXCJcIix2b2lkIDAscyksaT0odCwuLi5lKT0+e2NvbnN0IG49MT09PXQubGVuZ3RoP3RbMF06ZS5yZWR1Y2UoKChlLHMsbik9PmUrKHQ9PntpZighMD09PXQuXyRjc3NSZXN1bHQkKXJldHVybiB0LmNzc1RleHQ7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpcmV0dXJuIHQ7dGhyb3cgRXJyb3IoXCJWYWx1ZSBwYXNzZWQgdG8gJ2NzcycgZnVuY3Rpb24gbXVzdCBiZSBhICdjc3MnIGZ1bmN0aW9uIHJlc3VsdDogXCIrdCtcIi4gVXNlICd1bnNhZmVDU1MnIHRvIHBhc3Mgbm9uLWxpdGVyYWwgdmFsdWVzLCBidXQgdGFrZSBjYXJlIHRvIGVuc3VyZSBwYWdlIHNlY3VyaXR5LlwiKX0pKHMpK3RbbisxXSksdFswXSk7cmV0dXJuIG5ldyBvKG4sdCxzKX0sUz0ocyxuKT0+e2U/cy5hZG9wdGVkU3R5bGVTaGVldHM9bi5tYXAoKHQ9PnQgaW5zdGFuY2VvZiBDU1NTdHlsZVNoZWV0P3Q6dC5zdHlsZVNoZWV0KSk6bi5mb3JFYWNoKChlPT57Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiksbz10LmxpdE5vbmNlO3ZvaWQgMCE9PW8mJm4uc2V0QXR0cmlidXRlKFwibm9uY2VcIixvKSxuLnRleHRDb250ZW50PWUuY3NzVGV4dCxzLmFwcGVuZENoaWxkKG4pfSkpfSxjPWU/dD0+dDp0PT50IGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldD8odD0+e2xldCBlPVwiXCI7Zm9yKGNvbnN0IHMgb2YgdC5jc3NSdWxlcyllKz1zLmNzc1RleHQ7cmV0dXJuIHIoZSl9KSh0KTp0O2V4cG9ydHtvIGFzIENTU1Jlc3VsdCxTIGFzIGFkb3B0U3R5bGVzLGkgYXMgY3NzLGMgYXMgZ2V0Q29tcGF0aWJsZVN0eWxlLGUgYXMgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzLHIgYXMgdW5zYWZlQ1NTfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNzcy10YWcuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmNvbnN0IGU9KGUsdCxvKT0+e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG8sZSl9LHQ9KGUsdCk9Pih7a2luZDpcIm1ldGhvZFwiLHBsYWNlbWVudDpcInByb3RvdHlwZVwiLGtleTp0LmtleSxkZXNjcmlwdG9yOmV9KSxvPSh7ZmluaXNoZXI6ZSxkZXNjcmlwdG9yOnR9KT0+KG8sbik9Pnt2YXIgcjtpZih2b2lkIDA9PT1uKXtjb25zdCBuPW51bGwhPT0ocj1vLm9yaWdpbmFsS2V5KSYmdm9pZCAwIT09cj9yOm8ua2V5LGk9bnVsbCE9dD97a2luZDpcIm1ldGhvZFwiLHBsYWNlbWVudDpcInByb3RvdHlwZVwiLGtleTpuLGRlc2NyaXB0b3I6dChvLmtleSl9OnsuLi5vLGtleTpufTtyZXR1cm4gbnVsbCE9ZSYmKGkuZmluaXNoZXI9ZnVuY3Rpb24odCl7ZSh0LG4pfSksaX17Y29uc3Qgcj1vLmNvbnN0cnVjdG9yO3ZvaWQgMCE9PXQmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLG4sdChuKSksbnVsbD09ZXx8ZShyLG4pfX07ZXhwb3J0e28gYXMgZGVjb3JhdGVQcm9wZXJ0eSxlIGFzIGxlZ2FjeVByb3RvdHlwZU1ldGhvZCx0IGFzIHN0YW5kYXJkUHJvdG90eXBlTWV0aG9kfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2UuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmNvbnN0IGU9ZT0+bj0+XCJmdW5jdGlvblwiPT10eXBlb2Ygbj8oKGUsbik9PihjdXN0b21FbGVtZW50cy5kZWZpbmUoZSxuKSxuKSkoZSxuKTooKGUsbik9Pntjb25zdHtraW5kOnQsZWxlbWVudHM6c309bjtyZXR1cm57a2luZDp0LGVsZW1lbnRzOnMsZmluaXNoZXIobil7Y3VzdG9tRWxlbWVudHMuZGVmaW5lKGUsbil9fX0pKGUsbik7ZXhwb3J0e2UgYXMgY3VzdG9tRWxlbWVudH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jdXN0b20tZWxlbWVudC5qcy5tYXBcbiIsImltcG9ydHtkZWNvcmF0ZVByb3BlcnR5IGFzIHJ9ZnJvbVwiLi9iYXNlLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9mdW5jdGlvbiBlKGUpe3JldHVybiByKHtmaW5pc2hlcjoocix0KT0+e09iamVjdC5hc3NpZ24oci5wcm90b3R5cGVbdF0sZSl9fSl9ZXhwb3J0e2UgYXMgZXZlbnRPcHRpb25zfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50LW9wdGlvbnMuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmNvbnN0IGk9KGksZSk9PlwibWV0aG9kXCI9PT1lLmtpbmQmJmUuZGVzY3JpcHRvciYmIShcInZhbHVlXCJpbiBlLmRlc2NyaXB0b3IpP3suLi5lLGZpbmlzaGVyKG4pe24uY3JlYXRlUHJvcGVydHkoZS5rZXksaSl9fTp7a2luZDpcImZpZWxkXCIsa2V5OlN5bWJvbCgpLHBsYWNlbWVudDpcIm93blwiLGRlc2NyaXB0b3I6e30sb3JpZ2luYWxLZXk6ZS5rZXksaW5pdGlhbGl6ZXIoKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmluaXRpYWxpemVyJiYodGhpc1tlLmtleV09ZS5pbml0aWFsaXplci5jYWxsKHRoaXMpKX0sZmluaXNoZXIobil7bi5jcmVhdGVQcm9wZXJ0eShlLmtleSxpKX19O2Z1bmN0aW9uIGUoZSl7cmV0dXJuKG4sdCk9PnZvaWQgMCE9PXQ/KChpLGUsbik9PntlLmNvbnN0cnVjdG9yLmNyZWF0ZVByb3BlcnR5KG4saSl9KShlLG4sdCk6aShlLG4pfWV4cG9ydHtlIGFzIHByb3BlcnR5fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BlcnR5LmpzLm1hcFxuIiwiaW1wb3J0e2RlY29yYXRlUHJvcGVydHkgYXMgcn1mcm9tXCIuL2Jhc2UuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL2Z1bmN0aW9uIGUoZSl7cmV0dXJuIHIoe2Rlc2NyaXB0b3I6cj0+KHtnZXQoKXt2YXIgcixvO3JldHVybiBudWxsIT09KG89bnVsbD09PShyPXRoaXMucmVuZGVyUm9vdCl8fHZvaWQgMD09PXI/dm9pZCAwOnIucXVlcnlTZWxlY3RvckFsbChlKSkmJnZvaWQgMCE9PW8/bzpbXX0sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0pfWV4cG9ydHtlIGFzIHF1ZXJ5QWxsfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXF1ZXJ5LWFsbC5qcy5tYXBcbiIsImltcG9ydHtkZWNvcmF0ZVByb3BlcnR5IGFzIG99ZnJvbVwiLi9iYXNlLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi92YXIgbjtjb25zdCBlPW51bGwhPShudWxsPT09KG49d2luZG93LkhUTUxTbG90RWxlbWVudCl8fHZvaWQgMD09PW4/dm9pZCAwOm4ucHJvdG90eXBlLmFzc2lnbmVkRWxlbWVudHMpPyhvLG4pPT5vLmFzc2lnbmVkRWxlbWVudHMobik6KG8sbik9Pm8uYXNzaWduZWROb2RlcyhuKS5maWx0ZXIoKG89Pm8ubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSkpO2Z1bmN0aW9uIGwobil7Y29uc3R7c2xvdDpsLHNlbGVjdG9yOnR9PW51bGwhPW4/bjp7fTtyZXR1cm4gbyh7ZGVzY3JpcHRvcjpvPT4oe2dldCgpe3ZhciBvO2NvbnN0IHI9XCJzbG90XCIrKGw/YFtuYW1lPSR7bH1dYDpcIjpub3QoW25hbWVdKVwiKSxpPW51bGw9PT0obz10aGlzLnJlbmRlclJvb3QpfHx2b2lkIDA9PT1vP3ZvaWQgMDpvLnF1ZXJ5U2VsZWN0b3Iocikscz1udWxsIT1pP2UoaSxuKTpbXTtyZXR1cm4gdD9zLmZpbHRlcigobz0+by5tYXRjaGVzKHQpKSk6c30sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0pfWV4cG9ydHtsIGFzIHF1ZXJ5QXNzaWduZWRFbGVtZW50c307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1xdWVyeS1hc3NpZ25lZC1lbGVtZW50cy5qcy5tYXBcbiIsImltcG9ydHtkZWNvcmF0ZVByb3BlcnR5IGFzIGV9ZnJvbVwiLi9iYXNlLmpzXCI7aW1wb3J0e3F1ZXJ5QXNzaWduZWRFbGVtZW50cyBhcyB0fWZyb21cIi4vcXVlcnktYXNzaWduZWQtZWxlbWVudHMuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL2Z1bmN0aW9uIG8obyxuLHIpe2xldCBsLHM9bztyZXR1cm5cIm9iamVjdFwiPT10eXBlb2Ygbz8ocz1vLnNsb3QsbD1vKTpsPXtmbGF0dGVuOm59LHI/dCh7c2xvdDpzLGZsYXR0ZW46bixzZWxlY3RvcjpyfSk6ZSh7ZGVzY3JpcHRvcjplPT4oe2dldCgpe3ZhciBlLHQ7Y29uc3Qgbz1cInNsb3RcIisocz9gW25hbWU9JHtzfV1gOlwiOm5vdChbbmFtZV0pXCIpLG49bnVsbD09PShlPXRoaXMucmVuZGVyUm9vdCl8fHZvaWQgMD09PWU/dm9pZCAwOmUucXVlcnlTZWxlY3RvcihvKTtyZXR1cm4gbnVsbCE9PSh0PW51bGw9PW4/dm9pZCAwOm4uYXNzaWduZWROb2RlcyhsKSkmJnZvaWQgMCE9PXQ/dDpbXX0sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0pfWV4cG9ydHtvIGFzIHF1ZXJ5QXNzaWduZWROb2Rlc307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1xdWVyeS1hc3NpZ25lZC1ub2Rlcy5qcy5tYXBcbiIsImltcG9ydHtkZWNvcmF0ZVByb3BlcnR5IGFzIHJ9ZnJvbVwiLi9iYXNlLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmZ1bmN0aW9uIGUoZSl7cmV0dXJuIHIoe2Rlc2NyaXB0b3I6cj0+KHthc3luYyBnZXQoKXt2YXIgcjtyZXR1cm4gYXdhaXQgdGhpcy51cGRhdGVDb21wbGV0ZSxudWxsPT09KHI9dGhpcy5yZW5kZXJSb290KXx8dm9pZCAwPT09cj92b2lkIDA6ci5xdWVyeVNlbGVjdG9yKGUpfSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSl9ZXhwb3J0e2UgYXMgcXVlcnlBc3luY307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1xdWVyeS1hc3luYy5qcy5tYXBcbiIsImltcG9ydHtkZWNvcmF0ZVByb3BlcnR5IGFzIG99ZnJvbVwiLi9iYXNlLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9mdW5jdGlvbiBpKGksbil7cmV0dXJuIG8oe2Rlc2NyaXB0b3I6bz0+e2NvbnN0IHQ9e2dldCgpe3ZhciBvLG47cmV0dXJuIG51bGwhPT0obj1udWxsPT09KG89dGhpcy5yZW5kZXJSb290KXx8dm9pZCAwPT09bz92b2lkIDA6by5xdWVyeVNlbGVjdG9yKGkpKSYmdm9pZCAwIT09bj9uOm51bGx9LGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwfTtpZihuKXtjb25zdCBuPVwic3ltYm9sXCI9PXR5cGVvZiBvP1N5bWJvbCgpOlwiX19cIitvO3QuZ2V0PWZ1bmN0aW9uKCl7dmFyIG8sdDtyZXR1cm4gdm9pZCAwPT09dGhpc1tuXSYmKHRoaXNbbl09bnVsbCE9PSh0PW51bGw9PT0obz10aGlzLnJlbmRlclJvb3QpfHx2b2lkIDA9PT1vP3ZvaWQgMDpvLnF1ZXJ5U2VsZWN0b3IoaSkpJiZ2b2lkIDAhPT10P3Q6bnVsbCksdGhpc1tuXX19cmV0dXJuIHR9fSl9ZXhwb3J0e2kgYXMgcXVlcnl9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cXVlcnkuanMubWFwXG4iLCJpbXBvcnR7cHJvcGVydHkgYXMgcn1mcm9tXCIuL3Byb3BlcnR5LmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9mdW5jdGlvbiB0KHQpe3JldHVybiByKHsuLi50LHN0YXRlOiEwfSl9ZXhwb3J0e3QgYXMgc3RhdGV9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdGUuanMubWFwXG4iLCJpbXBvcnR7Z2V0Q29tcGF0aWJsZVN0eWxlIGFzIHQsYWRvcHRTdHlsZXMgYXMgaX1mcm9tXCIuL2Nzcy10YWcuanNcIjtleHBvcnR7Q1NTUmVzdWx0LGFkb3B0U3R5bGVzLGNzcyxnZXRDb21wYXRpYmxlU3R5bGUsc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzLHVuc2FmZUNTU31mcm9tXCIuL2Nzcy10YWcuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL3ZhciBzO2NvbnN0IGU9d2luZG93LHI9ZS50cnVzdGVkVHlwZXMsaD1yP3IuZW1wdHlTY3JpcHQ6XCJcIixvPWUucmVhY3RpdmVFbGVtZW50UG9seWZpbGxTdXBwb3J0LG49e3RvQXR0cmlidXRlKHQsaSl7c3dpdGNoKGkpe2Nhc2UgQm9vbGVhbjp0PXQ/aDpudWxsO2JyZWFrO2Nhc2UgT2JqZWN0OmNhc2UgQXJyYXk6dD1udWxsPT10P3Q6SlNPTi5zdHJpbmdpZnkodCl9cmV0dXJuIHR9LGZyb21BdHRyaWJ1dGUodCxpKXtsZXQgcz10O3N3aXRjaChpKXtjYXNlIEJvb2xlYW46cz1udWxsIT09dDticmVhaztjYXNlIE51bWJlcjpzPW51bGw9PT10P251bGw6TnVtYmVyKHQpO2JyZWFrO2Nhc2UgT2JqZWN0OmNhc2UgQXJyYXk6dHJ5e3M9SlNPTi5wYXJzZSh0KX1jYXRjaCh0KXtzPW51bGx9fXJldHVybiBzfX0sYT0odCxpKT0+aSE9PXQmJihpPT1pfHx0PT10KSxsPXthdHRyaWJ1dGU6ITAsdHlwZTpTdHJpbmcsY29udmVydGVyOm4scmVmbGVjdDohMSxoYXNDaGFuZ2VkOmF9O2NsYXNzIGQgZXh0ZW5kcyBIVE1MRWxlbWVudHtjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5fJEVpPW5ldyBNYXAsdGhpcy5pc1VwZGF0ZVBlbmRpbmc9ITEsdGhpcy5oYXNVcGRhdGVkPSExLHRoaXMuXyRFbD1udWxsLHRoaXMudSgpfXN0YXRpYyBhZGRJbml0aWFsaXplcih0KXt2YXIgaTtudWxsIT09KGk9dGhpcy5oKSYmdm9pZCAwIT09aXx8KHRoaXMuaD1bXSksdGhpcy5oLnB1c2godCl9c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKXt0aGlzLmZpbmFsaXplKCk7Y29uc3QgdD1bXTtyZXR1cm4gdGhpcy5lbGVtZW50UHJvcGVydGllcy5mb3JFYWNoKCgoaSxzKT0+e2NvbnN0IGU9dGhpcy5fJEVwKHMsaSk7dm9pZCAwIT09ZSYmKHRoaXMuXyRFdi5zZXQoZSxzKSx0LnB1c2goZSkpfSkpLHR9c3RhdGljIGNyZWF0ZVByb3BlcnR5KHQsaT1sKXtpZihpLnN0YXRlJiYoaS5hdHRyaWJ1dGU9ITEpLHRoaXMuZmluYWxpemUoKSx0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLnNldCh0LGkpLCFpLm5vQWNjZXNzb3ImJiF0aGlzLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0KSl7Y29uc3Qgcz1cInN5bWJvbFwiPT10eXBlb2YgdD9TeW1ib2woKTpcIl9fXCIrdCxlPXRoaXMuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHQscyxpKTt2b2lkIDAhPT1lJiZPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5wcm90b3R5cGUsdCxlKX19c3RhdGljIGdldFByb3BlcnR5RGVzY3JpcHRvcih0LGkscyl7cmV0dXJue2dldCgpe3JldHVybiB0aGlzW2ldfSxzZXQoZSl7Y29uc3Qgcj10aGlzW3RdO3RoaXNbaV09ZSx0aGlzLnJlcXVlc3RVcGRhdGUodCxyLHMpfSxjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMH19c3RhdGljIGdldFByb3BlcnR5T3B0aW9ucyh0KXtyZXR1cm4gdGhpcy5lbGVtZW50UHJvcGVydGllcy5nZXQodCl8fGx9c3RhdGljIGZpbmFsaXplKCl7aWYodGhpcy5oYXNPd25Qcm9wZXJ0eShcImZpbmFsaXplZFwiKSlyZXR1cm4hMTt0aGlzLmZpbmFsaXplZD0hMDtjb25zdCB0PU9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtpZih0LmZpbmFsaXplKCksdGhpcy5lbGVtZW50UHJvcGVydGllcz1uZXcgTWFwKHQuZWxlbWVudFByb3BlcnRpZXMpLHRoaXMuXyRFdj1uZXcgTWFwLHRoaXMuaGFzT3duUHJvcGVydHkoXCJwcm9wZXJ0aWVzXCIpKXtjb25zdCB0PXRoaXMucHJvcGVydGllcyxpPVsuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0KSwuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHQpXTtmb3IoY29uc3QgcyBvZiBpKXRoaXMuY3JlYXRlUHJvcGVydHkocyx0W3NdKX1yZXR1cm4gdGhpcy5lbGVtZW50U3R5bGVzPXRoaXMuZmluYWxpemVTdHlsZXModGhpcy5zdHlsZXMpLCEwfXN0YXRpYyBmaW5hbGl6ZVN0eWxlcyhpKXtjb25zdCBzPVtdO2lmKEFycmF5LmlzQXJyYXkoaSkpe2NvbnN0IGU9bmV3IFNldChpLmZsYXQoMS8wKS5yZXZlcnNlKCkpO2Zvcihjb25zdCBpIG9mIGUpcy51bnNoaWZ0KHQoaSkpfWVsc2Ugdm9pZCAwIT09aSYmcy5wdXNoKHQoaSkpO3JldHVybiBzfXN0YXRpYyBfJEVwKHQsaSl7Y29uc3Qgcz1pLmF0dHJpYnV0ZTtyZXR1cm4hMT09PXM/dm9pZCAwOlwic3RyaW5nXCI9PXR5cGVvZiBzP3M6XCJzdHJpbmdcIj09dHlwZW9mIHQ/dC50b0xvd2VyQ2FzZSgpOnZvaWQgMH11KCl7dmFyIHQ7dGhpcy5fJEVfPW5ldyBQcm9taXNlKCh0PT50aGlzLmVuYWJsZVVwZGF0aW5nPXQpKSx0aGlzLl8kQUw9bmV3IE1hcCx0aGlzLl8kRWcoKSx0aGlzLnJlcXVlc3RVcGRhdGUoKSxudWxsPT09KHQ9dGhpcy5jb25zdHJ1Y3Rvci5oKXx8dm9pZCAwPT09dHx8dC5mb3JFYWNoKCh0PT50KHRoaXMpKSl9YWRkQ29udHJvbGxlcih0KXt2YXIgaSxzOyhudWxsIT09KGk9dGhpcy5fJEVTKSYmdm9pZCAwIT09aT9pOnRoaXMuXyRFUz1bXSkucHVzaCh0KSx2b2lkIDAhPT10aGlzLnJlbmRlclJvb3QmJnRoaXMuaXNDb25uZWN0ZWQmJihudWxsPT09KHM9dC5ob3N0Q29ubmVjdGVkKXx8dm9pZCAwPT09c3x8cy5jYWxsKHQpKX1yZW1vdmVDb250cm9sbGVyKHQpe3ZhciBpO251bGw9PT0oaT10aGlzLl8kRVMpfHx2b2lkIDA9PT1pfHxpLnNwbGljZSh0aGlzLl8kRVMuaW5kZXhPZih0KT4+PjAsMSl9XyRFZygpe3RoaXMuY29uc3RydWN0b3IuZWxlbWVudFByb3BlcnRpZXMuZm9yRWFjaCgoKHQsaSk9Pnt0aGlzLmhhc093blByb3BlcnR5KGkpJiYodGhpcy5fJEVpLnNldChpLHRoaXNbaV0pLGRlbGV0ZSB0aGlzW2ldKX0pKX1jcmVhdGVSZW5kZXJSb290KCl7dmFyIHQ7Y29uc3Qgcz1udWxsIT09KHQ9dGhpcy5zaGFkb3dSb290KSYmdm9pZCAwIT09dD90OnRoaXMuYXR0YWNoU2hhZG93KHRoaXMuY29uc3RydWN0b3Iuc2hhZG93Um9vdE9wdGlvbnMpO3JldHVybiBpKHMsdGhpcy5jb25zdHJ1Y3Rvci5lbGVtZW50U3R5bGVzKSxzfWNvbm5lY3RlZENhbGxiYWNrKCl7dmFyIHQ7dm9pZCAwPT09dGhpcy5yZW5kZXJSb290JiYodGhpcy5yZW5kZXJSb290PXRoaXMuY3JlYXRlUmVuZGVyUm9vdCgpKSx0aGlzLmVuYWJsZVVwZGF0aW5nKCEwKSxudWxsPT09KHQ9dGhpcy5fJEVTKXx8dm9pZCAwPT09dHx8dC5mb3JFYWNoKCh0PT57dmFyIGk7cmV0dXJuIG51bGw9PT0oaT10Lmhvc3RDb25uZWN0ZWQpfHx2b2lkIDA9PT1pP3ZvaWQgMDppLmNhbGwodCl9KSl9ZW5hYmxlVXBkYXRpbmcodCl7fWRpc2Nvbm5lY3RlZENhbGxiYWNrKCl7dmFyIHQ7bnVsbD09PSh0PXRoaXMuXyRFUyl8fHZvaWQgMD09PXR8fHQuZm9yRWFjaCgodD0+e3ZhciBpO3JldHVybiBudWxsPT09KGk9dC5ob3N0RGlzY29ubmVjdGVkKXx8dm9pZCAwPT09aT92b2lkIDA6aS5jYWxsKHQpfSkpfWF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0LGkscyl7dGhpcy5fJEFLKHQscyl9XyRFTyh0LGkscz1sKXt2YXIgZTtjb25zdCByPXRoaXMuY29uc3RydWN0b3IuXyRFcCh0LHMpO2lmKHZvaWQgMCE9PXImJiEwPT09cy5yZWZsZWN0KXtjb25zdCBoPSh2b2lkIDAhPT0obnVsbD09PShlPXMuY29udmVydGVyKXx8dm9pZCAwPT09ZT92b2lkIDA6ZS50b0F0dHJpYnV0ZSk/cy5jb252ZXJ0ZXI6bikudG9BdHRyaWJ1dGUoaSxzLnR5cGUpO3RoaXMuXyRFbD10LG51bGw9PWg/dGhpcy5yZW1vdmVBdHRyaWJ1dGUocik6dGhpcy5zZXRBdHRyaWJ1dGUocixoKSx0aGlzLl8kRWw9bnVsbH19XyRBSyh0LGkpe3ZhciBzO2NvbnN0IGU9dGhpcy5jb25zdHJ1Y3RvcixyPWUuXyRFdi5nZXQodCk7aWYodm9pZCAwIT09ciYmdGhpcy5fJEVsIT09cil7Y29uc3QgdD1lLmdldFByb3BlcnR5T3B0aW9ucyhyKSxoPVwiZnVuY3Rpb25cIj09dHlwZW9mIHQuY29udmVydGVyP3tmcm9tQXR0cmlidXRlOnQuY29udmVydGVyfTp2b2lkIDAhPT0obnVsbD09PShzPXQuY29udmVydGVyKXx8dm9pZCAwPT09cz92b2lkIDA6cy5mcm9tQXR0cmlidXRlKT90LmNvbnZlcnRlcjpuO3RoaXMuXyRFbD1yLHRoaXNbcl09aC5mcm9tQXR0cmlidXRlKGksdC50eXBlKSx0aGlzLl8kRWw9bnVsbH19cmVxdWVzdFVwZGF0ZSh0LGkscyl7bGV0IGU9ITA7dm9pZCAwIT09dCYmKCgocz1zfHx0aGlzLmNvbnN0cnVjdG9yLmdldFByb3BlcnR5T3B0aW9ucyh0KSkuaGFzQ2hhbmdlZHx8YSkodGhpc1t0XSxpKT8odGhpcy5fJEFMLmhhcyh0KXx8dGhpcy5fJEFMLnNldCh0LGkpLCEwPT09cy5yZWZsZWN0JiZ0aGlzLl8kRWwhPT10JiYodm9pZCAwPT09dGhpcy5fJEVDJiYodGhpcy5fJEVDPW5ldyBNYXApLHRoaXMuXyRFQy5zZXQodCxzKSkpOmU9ITEpLCF0aGlzLmlzVXBkYXRlUGVuZGluZyYmZSYmKHRoaXMuXyRFXz10aGlzLl8kRWooKSl9YXN5bmMgXyRFaigpe3RoaXMuaXNVcGRhdGVQZW5kaW5nPSEwO3RyeXthd2FpdCB0aGlzLl8kRV99Y2F0Y2godCl7UHJvbWlzZS5yZWplY3QodCl9Y29uc3QgdD10aGlzLnNjaGVkdWxlVXBkYXRlKCk7cmV0dXJuIG51bGwhPXQmJmF3YWl0IHQsIXRoaXMuaXNVcGRhdGVQZW5kaW5nfXNjaGVkdWxlVXBkYXRlKCl7cmV0dXJuIHRoaXMucGVyZm9ybVVwZGF0ZSgpfXBlcmZvcm1VcGRhdGUoKXt2YXIgdDtpZighdGhpcy5pc1VwZGF0ZVBlbmRpbmcpcmV0dXJuO3RoaXMuaGFzVXBkYXRlZCx0aGlzLl8kRWkmJih0aGlzLl8kRWkuZm9yRWFjaCgoKHQsaSk9PnRoaXNbaV09dCkpLHRoaXMuXyRFaT12b2lkIDApO2xldCBpPSExO2NvbnN0IHM9dGhpcy5fJEFMO3RyeXtpPXRoaXMuc2hvdWxkVXBkYXRlKHMpLGk/KHRoaXMud2lsbFVwZGF0ZShzKSxudWxsPT09KHQ9dGhpcy5fJEVTKXx8dm9pZCAwPT09dHx8dC5mb3JFYWNoKCh0PT57dmFyIGk7cmV0dXJuIG51bGw9PT0oaT10Lmhvc3RVcGRhdGUpfHx2b2lkIDA9PT1pP3ZvaWQgMDppLmNhbGwodCl9KSksdGhpcy51cGRhdGUocykpOnRoaXMuXyRFaygpfWNhdGNoKHQpe3Rocm93IGk9ITEsdGhpcy5fJEVrKCksdH1pJiZ0aGlzLl8kQUUocyl9d2lsbFVwZGF0ZSh0KXt9XyRBRSh0KXt2YXIgaTtudWxsPT09KGk9dGhpcy5fJEVTKXx8dm9pZCAwPT09aXx8aS5mb3JFYWNoKCh0PT57dmFyIGk7cmV0dXJuIG51bGw9PT0oaT10Lmhvc3RVcGRhdGVkKXx8dm9pZCAwPT09aT92b2lkIDA6aS5jYWxsKHQpfSkpLHRoaXMuaGFzVXBkYXRlZHx8KHRoaXMuaGFzVXBkYXRlZD0hMCx0aGlzLmZpcnN0VXBkYXRlZCh0KSksdGhpcy51cGRhdGVkKHQpfV8kRWsoKXt0aGlzLl8kQUw9bmV3IE1hcCx0aGlzLmlzVXBkYXRlUGVuZGluZz0hMX1nZXQgdXBkYXRlQ29tcGxldGUoKXtyZXR1cm4gdGhpcy5nZXRVcGRhdGVDb21wbGV0ZSgpfWdldFVwZGF0ZUNvbXBsZXRlKCl7cmV0dXJuIHRoaXMuXyRFX31zaG91bGRVcGRhdGUodCl7cmV0dXJuITB9dXBkYXRlKHQpe3ZvaWQgMCE9PXRoaXMuXyRFQyYmKHRoaXMuXyRFQy5mb3JFYWNoKCgodCxpKT0+dGhpcy5fJEVPKGksdGhpc1tpXSx0KSkpLHRoaXMuXyRFQz12b2lkIDApLHRoaXMuXyRFaygpfXVwZGF0ZWQodCl7fWZpcnN0VXBkYXRlZCh0KXt9fWQuZmluYWxpemVkPSEwLGQuZWxlbWVudFByb3BlcnRpZXM9bmV3IE1hcCxkLmVsZW1lbnRTdHlsZXM9W10sZC5zaGFkb3dSb290T3B0aW9ucz17bW9kZTpcIm9wZW5cIn0sbnVsbD09b3x8byh7UmVhY3RpdmVFbGVtZW50OmR9KSwobnVsbCE9PShzPWUucmVhY3RpdmVFbGVtZW50VmVyc2lvbnMpJiZ2b2lkIDAhPT1zP3M6ZS5yZWFjdGl2ZUVsZW1lbnRWZXJzaW9ucz1bXSkucHVzaChcIjEuNC4wXCIpO2V4cG9ydHtkIGFzIFJlYWN0aXZlRWxlbWVudCxuIGFzIGRlZmF1bHRDb252ZXJ0ZXIsYSBhcyBub3RFcXVhbH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdGl2ZS1lbGVtZW50LmpzLm1hcFxuIiwiaW1wb3J0e1JlYWN0aXZlRWxlbWVudCBhcyB0fWZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudFwiO2V4cG9ydCpmcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnRcIjtpbXBvcnR7cmVuZGVyIGFzIGUsbm9DaGFuZ2UgYXMgaX1mcm9tXCJsaXQtaHRtbFwiO2V4cG9ydCpmcm9tXCJsaXQtaHRtbFwiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovdmFyIGwsbztjb25zdCByPXQ7Y2xhc3MgcyBleHRlbmRzIHR7Y29uc3RydWN0b3IoKXtzdXBlciguLi5hcmd1bWVudHMpLHRoaXMucmVuZGVyT3B0aW9ucz17aG9zdDp0aGlzfSx0aGlzLl8kRG89dm9pZCAwfWNyZWF0ZVJlbmRlclJvb3QoKXt2YXIgdCxlO2NvbnN0IGk9c3VwZXIuY3JlYXRlUmVuZGVyUm9vdCgpO3JldHVybiBudWxsIT09KHQ9KGU9dGhpcy5yZW5kZXJPcHRpb25zKS5yZW5kZXJCZWZvcmUpJiZ2b2lkIDAhPT10fHwoZS5yZW5kZXJCZWZvcmU9aS5maXJzdENoaWxkKSxpfXVwZGF0ZSh0KXtjb25zdCBpPXRoaXMucmVuZGVyKCk7dGhpcy5oYXNVcGRhdGVkfHwodGhpcy5yZW5kZXJPcHRpb25zLmlzQ29ubmVjdGVkPXRoaXMuaXNDb25uZWN0ZWQpLHN1cGVyLnVwZGF0ZSh0KSx0aGlzLl8kRG89ZShpLHRoaXMucmVuZGVyUm9vdCx0aGlzLnJlbmRlck9wdGlvbnMpfWNvbm5lY3RlZENhbGxiYWNrKCl7dmFyIHQ7c3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKSxudWxsPT09KHQ9dGhpcy5fJERvKXx8dm9pZCAwPT09dHx8dC5zZXRDb25uZWN0ZWQoITApfWRpc2Nvbm5lY3RlZENhbGxiYWNrKCl7dmFyIHQ7c3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKSxudWxsPT09KHQ9dGhpcy5fJERvKXx8dm9pZCAwPT09dHx8dC5zZXRDb25uZWN0ZWQoITEpfXJlbmRlcigpe3JldHVybiBpfX1zLmZpbmFsaXplZD0hMCxzLl8kbGl0RWxlbWVudCQ9ITAsbnVsbD09PShsPWdsb2JhbFRoaXMubGl0RWxlbWVudEh5ZHJhdGVTdXBwb3J0KXx8dm9pZCAwPT09bHx8bC5jYWxsKGdsb2JhbFRoaXMse0xpdEVsZW1lbnQ6c30pO2NvbnN0IG49Z2xvYmFsVGhpcy5saXRFbGVtZW50UG9seWZpbGxTdXBwb3J0O251bGw9PW58fG4oe0xpdEVsZW1lbnQ6c30pO2NvbnN0IGg9e18kQUs6KHQsZSxpKT0+e3QuXyRBSyhlLGkpfSxfJEFMOnQ9PnQuXyRBTH07KG51bGwhPT0obz1nbG9iYWxUaGlzLmxpdEVsZW1lbnRWZXJzaW9ucykmJnZvaWQgMCE9PW8/bzpnbG9iYWxUaGlzLmxpdEVsZW1lbnRWZXJzaW9ucz1bXSkucHVzaChcIjMuMi4yXCIpO2V4cG9ydHtzIGFzIExpdEVsZW1lbnQsciBhcyBVcGRhdGluZ0VsZW1lbnQsaCBhcyBfJExFfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpdC1lbGVtZW50LmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5jb25zdCB0PXtBVFRSSUJVVEU6MSxDSElMRDoyLFBST1BFUlRZOjMsQk9PTEVBTl9BVFRSSUJVVEU6NCxFVkVOVDo1LEVMRU1FTlQ6Nn0sZT10PT4oLi4uZSk9Pih7XyRsaXREaXJlY3RpdmUkOnQsdmFsdWVzOmV9KTtjbGFzcyBpe2NvbnN0cnVjdG9yKHQpe31nZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0uXyRBVX1fJEFUKHQsZSxpKXt0aGlzLl8kQ3Q9dCx0aGlzLl8kQU09ZSx0aGlzLl8kQ2k9aX1fJEFTKHQsZSl7cmV0dXJuIHRoaXMudXBkYXRlKHQsZSl9dXBkYXRlKHQsZSl7cmV0dXJuIHRoaXMucmVuZGVyKC4uLmUpfX1leHBvcnR7aSBhcyBEaXJlY3RpdmUsdCBhcyBQYXJ0VHlwZSxlIGFzIGRpcmVjdGl2ZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXJlY3RpdmUuanMubWFwXG4iLCJpbXBvcnR7bm9DaGFuZ2UgYXMgdH1mcm9tXCIuLi9saXQtaHRtbC5qc1wiO2ltcG9ydHtkaXJlY3RpdmUgYXMgaSxEaXJlY3RpdmUgYXMgcyxQYXJ0VHlwZSBhcyByfWZyb21cIi4uL2RpcmVjdGl2ZS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovY29uc3Qgbz1pKGNsYXNzIGV4dGVuZHMgc3tjb25zdHJ1Y3Rvcih0KXt2YXIgaTtpZihzdXBlcih0KSx0LnR5cGUhPT1yLkFUVFJJQlVURXx8XCJjbGFzc1wiIT09dC5uYW1lfHwobnVsbD09PShpPXQuc3RyaW5ncyl8fHZvaWQgMD09PWk/dm9pZCAwOmkubGVuZ3RoKT4yKXRocm93IEVycm9yKFwiYGNsYXNzTWFwKClgIGNhbiBvbmx5IGJlIHVzZWQgaW4gdGhlIGBjbGFzc2AgYXR0cmlidXRlIGFuZCBtdXN0IGJlIHRoZSBvbmx5IHBhcnQgaW4gdGhlIGF0dHJpYnV0ZS5cIil9cmVuZGVyKHQpe3JldHVyblwiIFwiK09iamVjdC5rZXlzKHQpLmZpbHRlcigoaT0+dFtpXSkpLmpvaW4oXCIgXCIpK1wiIFwifXVwZGF0ZShpLFtzXSl7dmFyIHIsbztpZih2b2lkIDA9PT10aGlzLm50KXt0aGlzLm50PW5ldyBTZXQsdm9pZCAwIT09aS5zdHJpbmdzJiYodGhpcy5zdD1uZXcgU2V0KGkuc3RyaW5ncy5qb2luKFwiIFwiKS5zcGxpdCgvXFxzLykuZmlsdGVyKCh0PT5cIlwiIT09dCkpKSk7Zm9yKGNvbnN0IHQgaW4gcylzW3RdJiYhKG51bGw9PT0ocj10aGlzLnN0KXx8dm9pZCAwPT09cj92b2lkIDA6ci5oYXModCkpJiZ0aGlzLm50LmFkZCh0KTtyZXR1cm4gdGhpcy5yZW5kZXIocyl9Y29uc3QgZT1pLmVsZW1lbnQuY2xhc3NMaXN0O3RoaXMubnQuZm9yRWFjaCgodD0+e3QgaW4gc3x8KGUucmVtb3ZlKHQpLHRoaXMubnQuZGVsZXRlKHQpKX0pKTtmb3IoY29uc3QgdCBpbiBzKXtjb25zdCBpPSEhc1t0XTtpPT09dGhpcy5udC5oYXModCl8fChudWxsPT09KG89dGhpcy5zdCl8fHZvaWQgMD09PW8/dm9pZCAwOm8uaGFzKHQpKXx8KGk/KGUuYWRkKHQpLHRoaXMubnQuYWRkKHQpKTooZS5yZW1vdmUodCksdGhpcy5udC5kZWxldGUodCkpKX1yZXR1cm4gdH19KTtleHBvcnR7byBhcyBjbGFzc01hcH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGFzcy1tYXAuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbnZhciB0O2NvbnN0IGk9d2luZG93LHM9aS50cnVzdGVkVHlwZXMsZT1zP3MuY3JlYXRlUG9saWN5KFwibGl0LWh0bWxcIix7Y3JlYXRlSFRNTDp0PT50fSk6dm9pZCAwLG89YGxpdCQkeyhNYXRoLnJhbmRvbSgpK1wiXCIpLnNsaWNlKDkpfSRgLG49XCI/XCIrbyxsPWA8JHtufT5gLGg9ZG9jdW1lbnQscj0odD1cIlwiKT0+aC5jcmVhdGVDb21tZW50KHQpLGQ9dD0+bnVsbD09PXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0LHU9QXJyYXkuaXNBcnJheSxjPXQ9PnUodCl8fFwiZnVuY3Rpb25cIj09dHlwZW9mKG51bGw9PXQ/dm9pZCAwOnRbU3ltYm9sLml0ZXJhdG9yXSksdj0vPCg/OighLS18XFwvW15hLXpBLVpdKXwoXFwvP1thLXpBLVpdW14+XFxzXSopfChcXC8/JCkpL2csYT0vLS0+L2csZj0vPi9nLF89UmVnRXhwKFwiPnxbIFxcdFxcblxcZlxccl0oPzooW15cXFxcc1xcXCInPj0vXSspKFsgXFx0XFxuXFxmXFxyXSo9WyBcXHRcXG5cXGZcXHJdKig/OlteIFxcdFxcblxcZlxcclxcXCInYDw+PV18KFxcXCJ8Jyl8KSl8JClcIixcImdcIiksbT0vJy9nLHA9L1wiL2csJD0vXig/OnNjcmlwdHxzdHlsZXx0ZXh0YXJlYXx0aXRsZSkkL2ksZz10PT4oaSwuLi5zKT0+KHtfJGxpdFR5cGUkOnQsc3RyaW5nczppLHZhbHVlczpzfSkseT1nKDEpLHc9ZygyKSx4PVN5bWJvbC5mb3IoXCJsaXQtbm9DaGFuZ2VcIiksYj1TeW1ib2wuZm9yKFwibGl0LW5vdGhpbmdcIiksVD1uZXcgV2Vha01hcCxBPSh0LGkscyk9Pnt2YXIgZSxvO2NvbnN0IG49bnVsbCE9PShlPW51bGw9PXM/dm9pZCAwOnMucmVuZGVyQmVmb3JlKSYmdm9pZCAwIT09ZT9lOmk7bGV0IGw9bi5fJGxpdFBhcnQkO2lmKHZvaWQgMD09PWwpe2NvbnN0IHQ9bnVsbCE9PShvPW51bGw9PXM/dm9pZCAwOnMucmVuZGVyQmVmb3JlKSYmdm9pZCAwIT09bz9vOm51bGw7bi5fJGxpdFBhcnQkPWw9bmV3IFMoaS5pbnNlcnRCZWZvcmUocigpLHQpLHQsdm9pZCAwLG51bGwhPXM/czp7fSl9cmV0dXJuIGwuXyRBSSh0KSxsfSxFPWguY3JlYXRlVHJlZVdhbGtlcihoLDEyOSxudWxsLCExKSxDPSh0LGkpPT57Y29uc3Qgcz10Lmxlbmd0aC0xLG49W107bGV0IGgscj0yPT09aT9cIjxzdmc+XCI6XCJcIixkPXY7Zm9yKGxldCBpPTA7aTxzO2krKyl7Y29uc3Qgcz10W2ldO2xldCBlLHUsYz0tMSxnPTA7Zm9yKDtnPHMubGVuZ3RoJiYoZC5sYXN0SW5kZXg9Zyx1PWQuZXhlYyhzKSxudWxsIT09dSk7KWc9ZC5sYXN0SW5kZXgsZD09PXY/XCIhLS1cIj09PXVbMV0/ZD1hOnZvaWQgMCE9PXVbMV0/ZD1mOnZvaWQgMCE9PXVbMl0/KCQudGVzdCh1WzJdKSYmKGg9UmVnRXhwKFwiPC9cIit1WzJdLFwiZ1wiKSksZD1fKTp2b2lkIDAhPT11WzNdJiYoZD1fKTpkPT09Xz9cIj5cIj09PXVbMF0/KGQ9bnVsbCE9aD9oOnYsYz0tMSk6dm9pZCAwPT09dVsxXT9jPS0yOihjPWQubGFzdEluZGV4LXVbMl0ubGVuZ3RoLGU9dVsxXSxkPXZvaWQgMD09PXVbM10/XzonXCInPT09dVszXT9wOm0pOmQ9PT1wfHxkPT09bT9kPV86ZD09PWF8fGQ9PT1mP2Q9djooZD1fLGg9dm9pZCAwKTtjb25zdCB5PWQ9PT1fJiZ0W2krMV0uc3RhcnRzV2l0aChcIi8+XCIpP1wiIFwiOlwiXCI7cis9ZD09PXY/cytsOmM+PTA/KG4ucHVzaChlKSxzLnNsaWNlKDAsYykrXCIkbGl0JFwiK3Muc2xpY2UoYykrbyt5KTpzK28rKC0yPT09Yz8obi5wdXNoKHZvaWQgMCksaSk6eSl9Y29uc3QgdT1yKyh0W3NdfHxcIjw/PlwiKSsoMj09PWk/XCI8L3N2Zz5cIjpcIlwiKTtpZighQXJyYXkuaXNBcnJheSh0KXx8IXQuaGFzT3duUHJvcGVydHkoXCJyYXdcIikpdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHRlbXBsYXRlIHN0cmluZ3MgYXJyYXlcIik7cmV0dXJuW3ZvaWQgMCE9PWU/ZS5jcmVhdGVIVE1MKHUpOnUsbl19O2NsYXNzIFB7Y29uc3RydWN0b3Ioe3N0cmluZ3M6dCxfJGxpdFR5cGUkOml9LGUpe2xldCBsO3RoaXMucGFydHM9W107bGV0IGg9MCxkPTA7Y29uc3QgdT10Lmxlbmd0aC0xLGM9dGhpcy5wYXJ0cyxbdixhXT1DKHQsaSk7aWYodGhpcy5lbD1QLmNyZWF0ZUVsZW1lbnQodixlKSxFLmN1cnJlbnROb2RlPXRoaXMuZWwuY29udGVudCwyPT09aSl7Y29uc3QgdD10aGlzLmVsLmNvbnRlbnQsaT10LmZpcnN0Q2hpbGQ7aS5yZW1vdmUoKSx0LmFwcGVuZCguLi5pLmNoaWxkTm9kZXMpfWZvcig7bnVsbCE9PShsPUUubmV4dE5vZGUoKSkmJmMubGVuZ3RoPHU7KXtpZigxPT09bC5ub2RlVHlwZSl7aWYobC5oYXNBdHRyaWJ1dGVzKCkpe2NvbnN0IHQ9W107Zm9yKGNvbnN0IGkgb2YgbC5nZXRBdHRyaWJ1dGVOYW1lcygpKWlmKGkuZW5kc1dpdGgoXCIkbGl0JFwiKXx8aS5zdGFydHNXaXRoKG8pKXtjb25zdCBzPWFbZCsrXTtpZih0LnB1c2goaSksdm9pZCAwIT09cyl7Y29uc3QgdD1sLmdldEF0dHJpYnV0ZShzLnRvTG93ZXJDYXNlKCkrXCIkbGl0JFwiKS5zcGxpdChvKSxpPS8oWy4/QF0pPyguKikvLmV4ZWMocyk7Yy5wdXNoKHt0eXBlOjEsaW5kZXg6aCxuYW1lOmlbMl0sc3RyaW5nczp0LGN0b3I6XCIuXCI9PT1pWzFdP1I6XCI/XCI9PT1pWzFdP0g6XCJAXCI9PT1pWzFdP0k6TX0pfWVsc2UgYy5wdXNoKHt0eXBlOjYsaW5kZXg6aH0pfWZvcihjb25zdCBpIG9mIHQpbC5yZW1vdmVBdHRyaWJ1dGUoaSl9aWYoJC50ZXN0KGwudGFnTmFtZSkpe2NvbnN0IHQ9bC50ZXh0Q29udGVudC5zcGxpdChvKSxpPXQubGVuZ3RoLTE7aWYoaT4wKXtsLnRleHRDb250ZW50PXM/cy5lbXB0eVNjcmlwdDpcIlwiO2ZvcihsZXQgcz0wO3M8aTtzKyspbC5hcHBlbmQodFtzXSxyKCkpLEUubmV4dE5vZGUoKSxjLnB1c2goe3R5cGU6MixpbmRleDorK2h9KTtsLmFwcGVuZCh0W2ldLHIoKSl9fX1lbHNlIGlmKDg9PT1sLm5vZGVUeXBlKWlmKGwuZGF0YT09PW4pYy5wdXNoKHt0eXBlOjIsaW5kZXg6aH0pO2Vsc2V7bGV0IHQ9LTE7Zm9yKDstMSE9PSh0PWwuZGF0YS5pbmRleE9mKG8sdCsxKSk7KWMucHVzaCh7dHlwZTo3LGluZGV4Omh9KSx0Kz1vLmxlbmd0aC0xfWgrK319c3RhdGljIGNyZWF0ZUVsZW1lbnQodCxpKXtjb25zdCBzPWguY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO3JldHVybiBzLmlubmVySFRNTD10LHN9fWZ1bmN0aW9uIFYodCxpLHM9dCxlKXt2YXIgbyxuLGwsaDtpZihpPT09eClyZXR1cm4gaTtsZXQgcj12b2lkIDAhPT1lP251bGw9PT0obz1zLl8kQ2wpfHx2b2lkIDA9PT1vP3ZvaWQgMDpvW2VdOnMuXyRDdTtjb25zdCB1PWQoaSk/dm9pZCAwOmkuXyRsaXREaXJlY3RpdmUkO3JldHVybihudWxsPT1yP3ZvaWQgMDpyLmNvbnN0cnVjdG9yKSE9PXUmJihudWxsPT09KG49bnVsbD09cj92b2lkIDA6ci5fJEFPKXx8dm9pZCAwPT09bnx8bi5jYWxsKHIsITEpLHZvaWQgMD09PXU/cj12b2lkIDA6KHI9bmV3IHUodCksci5fJEFUKHQscyxlKSksdm9pZCAwIT09ZT8obnVsbCE9PShsPShoPXMpLl8kQ2wpJiZ2b2lkIDAhPT1sP2w6aC5fJENsPVtdKVtlXT1yOnMuXyRDdT1yKSx2b2lkIDAhPT1yJiYoaT1WKHQsci5fJEFTKHQsaS52YWx1ZXMpLHIsZSkpLGl9Y2xhc3MgTntjb25zdHJ1Y3Rvcih0LGkpe3RoaXMudj1bXSx0aGlzLl8kQU49dm9pZCAwLHRoaXMuXyRBRD10LHRoaXMuXyRBTT1pfWdldCBwYXJlbnROb2RlKCl7cmV0dXJuIHRoaXMuXyRBTS5wYXJlbnROb2RlfWdldCBfJEFVKCl7cmV0dXJuIHRoaXMuXyRBTS5fJEFVfXAodCl7dmFyIGk7Y29uc3R7ZWw6e2NvbnRlbnQ6c30scGFydHM6ZX09dGhpcy5fJEFELG89KG51bGwhPT0oaT1udWxsPT10P3ZvaWQgMDp0LmNyZWF0aW9uU2NvcGUpJiZ2b2lkIDAhPT1pP2k6aCkuaW1wb3J0Tm9kZShzLCEwKTtFLmN1cnJlbnROb2RlPW87bGV0IG49RS5uZXh0Tm9kZSgpLGw9MCxyPTAsZD1lWzBdO2Zvcig7dm9pZCAwIT09ZDspe2lmKGw9PT1kLmluZGV4KXtsZXQgaTsyPT09ZC50eXBlP2k9bmV3IFMobixuLm5leHRTaWJsaW5nLHRoaXMsdCk6MT09PWQudHlwZT9pPW5ldyBkLmN0b3IobixkLm5hbWUsZC5zdHJpbmdzLHRoaXMsdCk6Nj09PWQudHlwZSYmKGk9bmV3IEwobix0aGlzLHQpKSx0aGlzLnYucHVzaChpKSxkPWVbKytyXX1sIT09KG51bGw9PWQ/dm9pZCAwOmQuaW5kZXgpJiYobj1FLm5leHROb2RlKCksbCsrKX1yZXR1cm4gb31tKHQpe2xldCBpPTA7Zm9yKGNvbnN0IHMgb2YgdGhpcy52KXZvaWQgMCE9PXMmJih2b2lkIDAhPT1zLnN0cmluZ3M/KHMuXyRBSSh0LHMsaSksaSs9cy5zdHJpbmdzLmxlbmd0aC0yKTpzLl8kQUkodFtpXSkpLGkrK319Y2xhc3MgU3tjb25zdHJ1Y3Rvcih0LGkscyxlKXt2YXIgbzt0aGlzLnR5cGU9Mix0aGlzLl8kQUg9Yix0aGlzLl8kQU49dm9pZCAwLHRoaXMuXyRBQT10LHRoaXMuXyRBQj1pLHRoaXMuXyRBTT1zLHRoaXMub3B0aW9ucz1lLHRoaXMuXyRDXz1udWxsPT09KG89bnVsbD09ZT92b2lkIDA6ZS5pc0Nvbm5lY3RlZCl8fHZvaWQgMD09PW98fG99Z2V0IF8kQVUoKXt2YXIgdCxpO3JldHVybiBudWxsIT09KGk9bnVsbD09PSh0PXRoaXMuXyRBTSl8fHZvaWQgMD09PXQ/dm9pZCAwOnQuXyRBVSkmJnZvaWQgMCE9PWk/aTp0aGlzLl8kQ199Z2V0IHBhcmVudE5vZGUoKXtsZXQgdD10aGlzLl8kQUEucGFyZW50Tm9kZTtjb25zdCBpPXRoaXMuXyRBTTtyZXR1cm4gdm9pZCAwIT09aSYmMTE9PT10Lm5vZGVUeXBlJiYodD1pLnBhcmVudE5vZGUpLHR9Z2V0IHN0YXJ0Tm9kZSgpe3JldHVybiB0aGlzLl8kQUF9Z2V0IGVuZE5vZGUoKXtyZXR1cm4gdGhpcy5fJEFCfV8kQUkodCxpPXRoaXMpe3Q9Vih0aGlzLHQsaSksZCh0KT90PT09Ynx8bnVsbD09dHx8XCJcIj09PXQ/KHRoaXMuXyRBSCE9PWImJnRoaXMuXyRBUigpLHRoaXMuXyRBSD1iKTp0IT09dGhpcy5fJEFIJiZ0IT09eCYmdGhpcy4kKHQpOnZvaWQgMCE9PXQuXyRsaXRUeXBlJD90aGlzLlQodCk6dm9pZCAwIT09dC5ub2RlVHlwZT90aGlzLmsodCk6Yyh0KT90aGlzLk8odCk6dGhpcy4kKHQpfVModCxpPXRoaXMuXyRBQil7cmV0dXJuIHRoaXMuXyRBQS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0LGkpfWsodCl7dGhpcy5fJEFIIT09dCYmKHRoaXMuXyRBUigpLHRoaXMuXyRBSD10aGlzLlModCkpfSQodCl7dGhpcy5fJEFIIT09YiYmZCh0aGlzLl8kQUgpP3RoaXMuXyRBQS5uZXh0U2libGluZy5kYXRhPXQ6dGhpcy5rKGguY3JlYXRlVGV4dE5vZGUodCkpLHRoaXMuXyRBSD10fVQodCl7dmFyIGk7Y29uc3R7dmFsdWVzOnMsXyRsaXRUeXBlJDplfT10LG89XCJudW1iZXJcIj09dHlwZW9mIGU/dGhpcy5fJEFDKHQpOih2b2lkIDA9PT1lLmVsJiYoZS5lbD1QLmNyZWF0ZUVsZW1lbnQoZS5oLHRoaXMub3B0aW9ucykpLGUpO2lmKChudWxsPT09KGk9dGhpcy5fJEFIKXx8dm9pZCAwPT09aT92b2lkIDA6aS5fJEFEKT09PW8pdGhpcy5fJEFILm0ocyk7ZWxzZXtjb25zdCB0PW5ldyBOKG8sdGhpcyksaT10LnAodGhpcy5vcHRpb25zKTt0Lm0ocyksdGhpcy5rKGkpLHRoaXMuXyRBSD10fX1fJEFDKHQpe2xldCBpPVQuZ2V0KHQuc3RyaW5ncyk7cmV0dXJuIHZvaWQgMD09PWkmJlQuc2V0KHQuc3RyaW5ncyxpPW5ldyBQKHQpKSxpfU8odCl7dSh0aGlzLl8kQUgpfHwodGhpcy5fJEFIPVtdLHRoaXMuXyRBUigpKTtjb25zdCBpPXRoaXMuXyRBSDtsZXQgcyxlPTA7Zm9yKGNvbnN0IG8gb2YgdCllPT09aS5sZW5ndGg/aS5wdXNoKHM9bmV3IFModGhpcy5TKHIoKSksdGhpcy5TKHIoKSksdGhpcyx0aGlzLm9wdGlvbnMpKTpzPWlbZV0scy5fJEFJKG8pLGUrKztlPGkubGVuZ3RoJiYodGhpcy5fJEFSKHMmJnMuXyRBQi5uZXh0U2libGluZyxlKSxpLmxlbmd0aD1lKX1fJEFSKHQ9dGhpcy5fJEFBLm5leHRTaWJsaW5nLGkpe3ZhciBzO2ZvcihudWxsPT09KHM9dGhpcy5fJEFQKXx8dm9pZCAwPT09c3x8cy5jYWxsKHRoaXMsITEsITAsaSk7dCYmdCE9PXRoaXMuXyRBQjspe2NvbnN0IGk9dC5uZXh0U2libGluZzt0LnJlbW92ZSgpLHQ9aX19c2V0Q29ubmVjdGVkKHQpe3ZhciBpO3ZvaWQgMD09PXRoaXMuXyRBTSYmKHRoaXMuXyRDXz10LG51bGw9PT0oaT10aGlzLl8kQVApfHx2b2lkIDA9PT1pfHxpLmNhbGwodGhpcyx0KSl9fWNsYXNzIE17Y29uc3RydWN0b3IodCxpLHMsZSxvKXt0aGlzLnR5cGU9MSx0aGlzLl8kQUg9Yix0aGlzLl8kQU49dm9pZCAwLHRoaXMuZWxlbWVudD10LHRoaXMubmFtZT1pLHRoaXMuXyRBTT1lLHRoaXMub3B0aW9ucz1vLHMubGVuZ3RoPjJ8fFwiXCIhPT1zWzBdfHxcIlwiIT09c1sxXT8odGhpcy5fJEFIPUFycmF5KHMubGVuZ3RoLTEpLmZpbGwobmV3IFN0cmluZyksdGhpcy5zdHJpbmdzPXMpOnRoaXMuXyRBSD1ifWdldCB0YWdOYW1lKCl7cmV0dXJuIHRoaXMuZWxlbWVudC50YWdOYW1lfWdldCBfJEFVKCl7cmV0dXJuIHRoaXMuXyRBTS5fJEFVfV8kQUkodCxpPXRoaXMscyxlKXtjb25zdCBvPXRoaXMuc3RyaW5ncztsZXQgbj0hMTtpZih2b2lkIDA9PT1vKXQ9Vih0aGlzLHQsaSwwKSxuPSFkKHQpfHx0IT09dGhpcy5fJEFIJiZ0IT09eCxuJiYodGhpcy5fJEFIPXQpO2Vsc2V7Y29uc3QgZT10O2xldCBsLGg7Zm9yKHQ9b1swXSxsPTA7bDxvLmxlbmd0aC0xO2wrKyloPVYodGhpcyxlW3MrbF0saSxsKSxoPT09eCYmKGg9dGhpcy5fJEFIW2xdKSxufHwobj0hZChoKXx8aCE9PXRoaXMuXyRBSFtsXSksaD09PWI/dD1iOnQhPT1iJiYodCs9KG51bGwhPWg/aDpcIlwiKStvW2wrMV0pLHRoaXMuXyRBSFtsXT1ofW4mJiFlJiZ0aGlzLlAodCl9UCh0KXt0PT09Yj90aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHRoaXMubmFtZSk6dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsbnVsbCE9dD90OlwiXCIpfX1jbGFzcyBSIGV4dGVuZHMgTXtjb25zdHJ1Y3Rvcigpe3N1cGVyKC4uLmFyZ3VtZW50cyksdGhpcy50eXBlPTN9UCh0KXt0aGlzLmVsZW1lbnRbdGhpcy5uYW1lXT10PT09Yj92b2lkIDA6dH19Y29uc3Qgaz1zP3MuZW1wdHlTY3JpcHQ6XCJcIjtjbGFzcyBIIGV4dGVuZHMgTXtjb25zdHJ1Y3Rvcigpe3N1cGVyKC4uLmFyZ3VtZW50cyksdGhpcy50eXBlPTR9UCh0KXt0JiZ0IT09Yj90aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKHRoaXMubmFtZSxrKTp0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHRoaXMubmFtZSl9fWNsYXNzIEkgZXh0ZW5kcyBNe2NvbnN0cnVjdG9yKHQsaSxzLGUsbyl7c3VwZXIodCxpLHMsZSxvKSx0aGlzLnR5cGU9NX1fJEFJKHQsaT10aGlzKXt2YXIgcztpZigodD1udWxsIT09KHM9Vih0aGlzLHQsaSwwKSkmJnZvaWQgMCE9PXM/czpiKT09PXgpcmV0dXJuO2NvbnN0IGU9dGhpcy5fJEFILG89dD09PWImJmUhPT1ifHx0LmNhcHR1cmUhPT1lLmNhcHR1cmV8fHQub25jZSE9PWUub25jZXx8dC5wYXNzaXZlIT09ZS5wYXNzaXZlLG49dCE9PWImJihlPT09Ynx8byk7byYmdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5uYW1lLHRoaXMsZSksbiYmdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5uYW1lLHRoaXMsdCksdGhpcy5fJEFIPXR9aGFuZGxlRXZlbnQodCl7dmFyIGkscztcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLl8kQUg/dGhpcy5fJEFILmNhbGwobnVsbCE9PShzPW51bGw9PT0oaT10aGlzLm9wdGlvbnMpfHx2b2lkIDA9PT1pP3ZvaWQgMDppLmhvc3QpJiZ2b2lkIDAhPT1zP3M6dGhpcy5lbGVtZW50LHQpOnRoaXMuXyRBSC5oYW5kbGVFdmVudCh0KX19Y2xhc3MgTHtjb25zdHJ1Y3Rvcih0LGkscyl7dGhpcy5lbGVtZW50PXQsdGhpcy50eXBlPTYsdGhpcy5fJEFOPXZvaWQgMCx0aGlzLl8kQU09aSx0aGlzLm9wdGlvbnM9c31nZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0uXyRBVX1fJEFJKHQpe1YodGhpcyx0KX19Y29uc3Qgej17QTpcIiRsaXQkXCIsTTpvLEM6bixMOjEsUjpDLEQ6TixWOmMsSTpWLEg6UyxOOk0sVTpILEI6SSxGOlIsVzpMfSxaPWkubGl0SHRtbFBvbHlmaWxsU3VwcG9ydDtudWxsPT1afHxaKFAsUyksKG51bGwhPT0odD1pLmxpdEh0bWxWZXJzaW9ucykmJnZvaWQgMCE9PXQ/dDppLmxpdEh0bWxWZXJzaW9ucz1bXSkucHVzaChcIjIuMy4xXCIpO2V4cG9ydHt6IGFzIF8kTEgseSBhcyBodG1sLHggYXMgbm9DaGFuZ2UsYiBhcyBub3RoaW5nLEEgYXMgcmVuZGVyLHcgYXMgc3ZnfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpdC1odG1sLmpzLm1hcFxuIiwiZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL2N1c3RvbS1lbGVtZW50LmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3Byb3BlcnR5LmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3N0YXRlLmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL2V2ZW50LW9wdGlvbnMuanNcIjtleHBvcnQqZnJvbVwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcXVlcnkuanNcIjtleHBvcnQqZnJvbVwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcXVlcnktYWxsLmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFzeW5jLmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFzc2lnbmVkLWVsZW1lbnRzLmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFzc2lnbmVkLW5vZGVzLmpzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWNvcmF0b3JzLmpzLm1hcFxuIiwiaW1wb3J0XCJAbGl0L3JlYWN0aXZlLWVsZW1lbnRcIjtpbXBvcnRcImxpdC1odG1sXCI7ZXhwb3J0KmZyb21cImxpdC1lbGVtZW50L2xpdC1lbGVtZW50LmpzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiaW1wb3J0IHtpbml0fSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAnLi4vY29tcG9uZW50cy90cmFkZV9oaXN0b3J5L3RyYWRlX3Byb29mJztcblxuaW5pdCgnc3JjL2xpYi9wYWdlX3NjcmlwdHMvdHJhZGVfaGlzdG9yeS5qcycsIG1haW4pO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge31cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==