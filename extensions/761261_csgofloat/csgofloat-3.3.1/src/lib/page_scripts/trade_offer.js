/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 42:
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

/***/ 47:
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

/***/ 46:
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

/***/ 44:
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

/***/ 43:
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

/***/ 45:
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

/***/ 28:
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
/* harmony export */   "InjectBefore": () => (/* binding */ InjectBefore),
/* harmony export */   "InjectionMode": () => (/* binding */ InjectionMode)
/* harmony export */ });
/* unused harmony export InjectAfter */
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

/***/ 394:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export AutoFill */
/* harmony import */ var _custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _injectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony import */ var _bridge_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _bridge_handlers_fetch_pending_trades__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(395);
/* harmony import */ var _types_float_market__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(396);
/* harmony import */ var lit_decorators_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var _utils_observers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(49);
/* harmony import */ var _common_ui_steam_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(377);
/* harmony import */ var _types_steam_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(57);
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










let AutoFill = class AutoFill extends _custom__WEBPACK_IMPORTED_MODULE_0__.FloatElement {
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.connectedCallback.call(this);
            try {
                this.pendingTradesResponse = yield (0,_bridge_client__WEBPACK_IMPORTED_MODULE_3__.ClientSend)(_bridge_handlers_fetch_pending_trades__WEBPACK_IMPORTED_MODULE_4__.FetchPendingTrades, {});
            }
            catch (e) {
                console.error('failed to fetch pending trades on CSFloat Market, they are likely not logged in.', e.toString());
            }
            (0,_utils_observers__WEBPACK_IMPORTED_MODULE_7__.Observe)(() => g_rgCurrentTradeStatus.me.assets.length, () => {
                // Items they are giving changed, we can potentially hide/show an auto-fill dialog
                this.requestUpdate();
            });
        });
    }
    renderAutoFillDialog(trade) {
        if (trade.state !== _types_float_market__WEBPACK_IMPORTED_MODULE_5__.TradeState.PENDING) {
            // Make sure they accepted the sale on CSFloat first
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        }
        const item = trade.contract.item;
        if (g_rgCurrentTradeStatus.me.assets.find((a) => a.assetid === item.asset_id)) {
            // Item is already included in the trade offer
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        }
        return lit__WEBPACK_IMPORTED_MODULE_2__.html `
            <div class="container">
                <div>
                    <div class="float-icon">
                        <img
                            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/79/798a12316637ad8fbb91ddb7dc63f770b680bd19_full.jpg"
                            style="height: 32px;"
                        />
                    </div>
                    <span class="item-name"> ${item.market_hash_name} </span>
                    ${this.getSaleInfo(item)}
                </div>
                <csfloat-steam-button
                    .text="${'Auto-Fill'}"
                    @click="${() => this.autoFill(trade)}"
                ></csfloat-steam-button>
            </div>
        `;
    }
    renderBulkAutoFillDialog(rawTrades) {
        // Remove items already included and non-pending
        const fTrades = rawTrades
            .filter((trade) => !g_rgCurrentTradeStatus.me.assets.find((a) => a.assetid === trade.contract.item.asset_id))
            .filter((trade) => trade.state === _types_float_market__WEBPACK_IMPORTED_MODULE_5__.TradeState.PENDING);
        // Bulk implies > 1
        if (fTrades.length <= 1) {
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        }
        const totalValue = fTrades.map((e) => e.contract.price).reduce((acc, e) => acc + e, 0);
        return lit__WEBPACK_IMPORTED_MODULE_2__.html `
            <div class="container" style="margin: 20px 0 20px 0;">
                <div>
                    <div class="float-icon">
                        <img
                            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/79/798a12316637ad8fbb91ddb7dc63f770b680bd19_full.jpg"
                            style="height: 32px;"
                        />
                    </div>
                    <span class="item-name"> Detected ${fTrades.length} Sales </span>
                    <div class="sale-info">Total Value: $${(totalValue / 100).toFixed(2)}</div>
                </div>
                <csfloat-steam-button
                    .text="${'Auto-Fill All Items'}"
                    @click="${() => this.autoFillAll(fTrades)}"
                ></csfloat-steam-button>
            </div>
        `;
    }
    getSaleInfo(item) {
        if (item.float_value) {
            return lit__WEBPACK_IMPORTED_MODULE_2__.html `
                <div class="sale-info">
                    Detected Sale (Float: ${item.float_value.toFixed(12)}, Seed: ${item.paint_seed})
                </div>
            `;
        }
        else {
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ` <div class="sale-info">Detected Sale (Asset ID: ${item.asset_id})</div> `;
        }
    }
    /**
     * Show a warning to users if trade includes item with csfloat note that doesn't match an existing sale
     *
     * Tries to prevent scenarios where malicious actors send offer with CSFloat text requesting an item
     */
    showWarningDialog() {
        if (!this.hasAutoFillText()) {
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        }
        const hasItemWithNoSale = g_rgCurrentTradeStatus.me.assets.find((a) => { var _a; return !((_a = this.pendingTradesResponse) === null || _a === void 0 ? void 0 : _a.trades_to_send.find((b) => b.contract.item.asset_id === a.assetid)); });
        if (!hasItemWithNoSale) {
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        }
        return lit__WEBPACK_IMPORTED_MODULE_2__.html `
            <div class="container warning">
                <div>
                    <div class="float-icon">
                        <img
                            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/79/798a12316637ad8fbb91ddb7dc63f770b680bd19_full.jpg"
                            style="height: 32px;"
                        />
                    </div>
                    <span class="item-name"> Warning! </span>
                    <div class="sale-info">
                        Some of the items in the offer were not purchased from you on CSFloat Market (or you're logged
                        into the wrong account)
                    </div>
                </div>
            </div>
        `;
    }
    render() {
        if (!this.pendingTradesResponse)
            return lit__WEBPACK_IMPORTED_MODULE_2__.html ``;
        const tradesToBuyer = this.pendingTradesResponse.trades_to_send.filter((e) => e.buyer_id === (UserThem === null || UserThem === void 0 ? void 0 : UserThem.strSteamId));
        return lit__WEBPACK_IMPORTED_MODULE_2__.html `
            ${this.renderBulkAutoFillDialog(tradesToBuyer)} ${tradesToBuyer.map((e) => this.renderAutoFillDialog(e))}
            ${this.showWarningDialog()}
        `;
    }
    autoFillAll(trades) {
        for (const trade of trades) {
            this.autoFill(trade);
        }
    }
    autoFill(trade) {
        var _a;
        $J('#inventory_select_your_inventory').click();
        const el = (_a = UserYou === null || UserYou === void 0 ? void 0 : UserYou.findAsset(_types_steam_constants__WEBPACK_IMPORTED_MODULE_9__.AppId.CSGO, _types_steam_constants__WEBPACK_IMPORTED_MODULE_9__.ContextId.PRIMARY, trade.contract.item.asset_id)) === null || _a === void 0 ? void 0 : _a.element;
        if (!el) {
            console.error('failed to find asset element for id ' + trade.contract.item.asset_id);
            return;
        }
        MoveItemToTrade(el);
        const note = document.getElementById('trade_offer_note');
        if (note) {
            note.value = `CSFloat Market Trade Offer #${trade.id} \n\nThanks for using CSFloat!`;
        }
    }
    hasAutoFillText() {
        const tradeMessages = document.getElementsByClassName('included_trade_offer_note_ctn');
        if (tradeMessages.length > 0) {
            const sanitized = tradeMessages[0].innerText.trim().replace(/ /g, '').toLowerCase();
            return (sanitized.includes('csgofloat') || sanitized.includes('floatmarket') || sanitized.includes('csfloat'));
        }
        return false;
    }
};
AutoFill.styles = [
    ..._custom__WEBPACK_IMPORTED_MODULE_0__.FloatElement.styles,
    lit__WEBPACK_IMPORTED_MODULE_2__.css `
            .container {
                margin-top: 10px;
                margin-bottom: 10px;
                padding: 15px;
                background-color: rgb(48, 48, 48);
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .container.warning {
                background-color: rgb(179, 0, 0);
            }

            .float-icon {
                float: left;
            }

            .item-name {
                font-size: 18px;
                margin-left: 15px;
                line-height: 32px;
            }

            .sale-info {
                padding-left: 45px;
                color: darkgrey;
            }
        `,
];
__decorate([
    (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_6__.state)()
], AutoFill.prototype, "pendingTradesResponse", void 0);
AutoFill = __decorate([
    (0,_injectors__WEBPACK_IMPORTED_MODULE_1__.CustomElement)(),
    (0,_injectors__WEBPACK_IMPORTED_MODULE_1__.InjectBefore)('div.trade_area')
], AutoFill);



/***/ }),

/***/ 393:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export TradeItemHolderMetadata */
/* harmony import */ var _injectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _common_item_holder_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _types_steam_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TradeItemHolderMetadata_1;



// Annotates item info (float, seed, etc...) in boxes on the Trade Offer Page
let TradeItemHolderMetadata = TradeItemHolderMetadata_1 = class TradeItemHolderMetadata extends _common_item_holder_metadata__WEBPACK_IMPORTED_MODULE_1__.ItemHolderMetadata {
    get owningUser() {
        if (!this.assetId)
            return;
        if (UserThem && TradeItemHolderMetadata_1.getAssetFromUser(UserThem, this.assetId)) {
            return UserThem;
        }
        else if (UserYou && TradeItemHolderMetadata_1.getAssetFromUser(UserYou, this.assetId)) {
            return UserYou;
        }
    }
    get ownerSteamId() {
        var _a;
        if (!this.assetId)
            return;
        return (_a = this.owningUser) === null || _a === void 0 ? void 0 : _a.strSteamId;
    }
    get asset() {
        if (!this.assetId)
            return;
        if (!this.owningUser)
            return;
        return TradeItemHolderMetadata_1.getAssetFromUser(this.owningUser, this.assetId);
    }
    static getAssetFromUser(user, assetId) {
        var _a;
        if ((_a = user.rgContexts[_types_steam_constants__WEBPACK_IMPORTED_MODULE_2__.AppId.CSGO][_types_steam_constants__WEBPACK_IMPORTED_MODULE_2__.ContextId.PRIMARY].inventory) === null || _a === void 0 ? void 0 : _a.rgInventory[assetId]) {
            const inventory = user.rgContexts[_types_steam_constants__WEBPACK_IMPORTED_MODULE_2__.AppId.CSGO][_types_steam_constants__WEBPACK_IMPORTED_MODULE_2__.ContextId.PRIMARY].inventory;
            return inventory === null || inventory === void 0 ? void 0 : inventory.rgInventory[assetId];
        }
    }
};
TradeItemHolderMetadata = TradeItemHolderMetadata_1 = __decorate([
    (0,_injectors__WEBPACK_IMPORTED_MODULE_0__.CustomElement)()
    // Items when browsing their/your inventory
    ,
    (0,_injectors__WEBPACK_IMPORTED_MODULE_0__.InjectAppend)('div.inventory_page:not([style*="display: none"]) .itemHolder div.app730', _injectors__WEBPACK_IMPORTED_MODULE_0__.InjectionMode.CONTINUOUS)
    // Items selected within the trade offer
    ,
    (0,_injectors__WEBPACK_IMPORTED_MODULE_0__.InjectAppend)('.trade_offer .itemHolder div.app730', _injectors__WEBPACK_IMPORTED_MODULE_0__.InjectionMode.CONTINUOUS)
], TradeItemHolderMetadata);



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

/***/ 35:
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

/***/ 396:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TradeState": () => (/* binding */ TradeState)
/* harmony export */ });
/* unused harmony exports ContractState, ContractType */
/**
 * Types related to CSFloat Market
 */
var ContractState;
(function (ContractState) {
    ContractState["SOLD"] = "sold";
    ContractState["LISTED"] = "listed";
    ContractState["DELISTED"] = "delisted";
    ContractState["REFUNDED"] = "refunded";
})(ContractState || (ContractState = {}));
var ContractType;
(function (ContractType) {
    ContractType["BUY_NOW"] = "buy_now";
    ContractType["AUCTION"] = "auction";
})(ContractType || (ContractType = {}));
var TradeState;
(function (TradeState) {
    TradeState["QUEUED"] = "queued";
    TradeState["PENDING"] = "pending";
    TradeState["VERIFIED"] = "verified";
    TradeState["FAILED"] = "failed";
    TradeState["CANCELLED"] = "cancelled";
})(TradeState || (TradeState = {}));


/***/ }),

/***/ 57:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppId": () => (/* binding */ AppId),
/* harmony export */   "ContextId": () => (/* binding */ ContextId)
/* harmony export */ });
/* unused harmony export Currency */
// See g_rgCurrencyData
var Currency;
(function (Currency) {
    Currency[Currency["USD"] = 2001] = "USD";
})(Currency || (Currency = {}));
var AppId;
(function (AppId) {
    AppId[AppId["CSGO"] = 730] = "CSGO";
})(AppId || (AppId = {}));
var ContextId;
(function (ContextId) {
    ContextId[ContextId["PRIMARY"] = 2] = "PRIMARY";
})(ContextId || (ContextId = {}));


/***/ }),

/***/ 382:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deserializeForm": () => (/* binding */ deserializeForm)
/* harmony export */ });
/* unused harmony exports getQueryParameter, hasQueryParameter */
/*
 * Functions related to the browser page (ie. parsing the URL)
 */
function getQueryParameter(param) {
    const url = new URL(window.location.href);
    return url.searchParams.get(param);
}
function hasQueryParameter(param) {
    return !!getQueryParameter(param);
}
function deserializeForm(serialized) {
    if (serialized.slice(0, 1) === '?') {
        serialized = serialized.slice(1);
    }
    if (!serialized) {
        return {};
    }
    return serialized.split('&').reduce((acc, e) => {
        const pair = e.split('=');
        if (pair.length < 2) {
            return acc;
        }
        acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        return acc;
    }, {});
}


/***/ }),

/***/ 37:
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

/***/ 38:
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

/***/ 41:
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

/***/ 397:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchRegisteredSteamAPIKey": () => (/* binding */ fetchRegisteredSteamAPIKey)
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
/**
 * Returns the registered Steam Web API key for the user, if it exists.
 *
 * If the key cannot be found, throws an error.
 */
function fetchRegisteredSteamAPIKey() {
    return __awaiter(this, void 0, void 0, function* () {
        const pageResponse = yield fetch('https://steamcommunity.com/dev/apikey');
        const pageText = yield pageResponse.text();
        const match = pageText.match(/: ([0-9A-Z]{32})[^0-9A-Z]/);
        if (match) {
            return match[1];
        }
        throw new Error('failed to find registered API key');
    });
}


/***/ }),

/***/ 49:
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

/***/ 36:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Job": () => (/* binding */ Job),
/* harmony export */   "SimpleCachedQueue": () => (/* binding */ SimpleCachedQueue)
/* harmony export */ });
/* unused harmony exports GenericJob, Queue, CachedQueue, TTLCachedQueue */
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

/***/ 48:
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

/***/ 40:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "formatFloatWithRank": () => (/* binding */ formatFloatWithRank),
/* harmony export */   "formatSeed": () => (/* binding */ formatSeed),
/* harmony export */   "getFadePercentage": () => (/* binding */ getFadePercentage),
/* harmony export */   "getLowestRank": () => (/* binding */ getLowestRank),
/* harmony export */   "isSkin": () => (/* binding */ isSkin)
/* harmony export */ });
/* unused harmony exports rangeFromWear, parseRank, renderClickableRank, getFadeCalculatorAndSupportedWeapon */
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
/* harmony export */   "html": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.html),
/* harmony export */   "nothing": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.nothing)
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
/* harmony import */ var _components_trade_offer_trade_item_holder_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(393);
/* harmony import */ var _components_trade_offer_auto_fill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(394);
/* harmony import */ var _utils_key__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(397);
/* harmony import */ var _utils_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(382);
/* harmony import */ var _types_steam_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(57);
/* harmony import */ var _bridge_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);
/* harmony import */ var _bridge_handlers_annotate_offer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(398);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








(0,_utils__WEBPACK_IMPORTED_MODULE_0__.init)('src/lib/page_scripts/trade_offer.js', main);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        injectAnnotateOffer();
        injectInventoryFallback();
    });
}
/**
 * Converts the API Key inventory response to match the "Trade" inventory
 * response for Steam's client code.
 */
function convertKeyInventoryIntoTradeInventory(raw) {
    var _a, _b;
    // Populate missing fields
    (_a = raw.response.assets) === null || _a === void 0 ? void 0 : _a.forEach((asset, index) => {
        asset.id = asset.assetid;
        asset.pos = index + 1;
        asset.hide_in_china = 0;
    });
    const rgInventory = raw.response.assets.reduce((acc, v) => {
        acc[v.id] = v;
        return acc;
    }, {});
    const rgDescriptions = (_b = raw.response.descriptions) === null || _b === void 0 ? void 0 : _b.reduce((acc, v) => {
        (v.tags || []).forEach((tag) => {
            // # Valve consistency, this field was renamed
            tag.name = tag.localized_tag_name;
        });
        acc[`${v.classid}_${v.instanceid}`] = v;
        return acc;
    }, {});
    return {
        more: false,
        more_start: false,
        rgCurrency: [],
        rgDescriptions,
        rgInventory,
        success: true,
    };
}
function fetchInventoryWithAPIKey() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield (0,_utils_key__WEBPACK_IMPORTED_MODULE_3__.fetchRegisteredSteamAPIKey)();
        const resp = yield fetch(`https://api.steampowered.com/IEconService/GetInventoryItemsWithDescriptions/v1/?appid=730&contextid=2&count=5000&get_descriptions=true&key=${key}&steamid=${UserYou === null || UserYou === void 0 ? void 0 : UserYou.strSteamId}`);
        if (!resp.ok) {
            throw new Error('key inventory fetch response was not OK');
        }
        const data = (yield resp.json());
        // Sometimes Steam likes to return an empty response...
        if (!((_a = data.response.assets) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new Error('key inventory response had no assets');
        }
        return convertKeyInventoryIntoTradeInventory(data);
    });
}
function injectInventoryFallback() {
    /**
     * Valve can rate limit user's requests to their own inventory. As a result,
     * some people can't send a trade offer since they can't load their inventory.
     *
     * This mitigation uses the API Key fallback method instead, which only
     * works if they have a Steam Web API key on their account.
     */
    const g_ContinueFullInventoryRequestIfNecessary = ContinueFullInventoryRequestIfNecessary;
    ContinueFullInventoryRequestIfNecessary = function (transport, mergedResponse, strUrl, oParams, fOnSuccess, fOnFailure, fOnComplete) {
        return __awaiter(this, void 0, void 0, function* () {
            if (strUrl.startsWith(g_strInventoryLoadURL) && transport.status >= 400) {
                // User was rate limited... try the fallback.
                try {
                    const newInventory = yield fetchInventoryWithAPIKey();
                    transport.responseJSON = newInventory;
                }
                catch (e) {
                    console.debug('failed to fetch fallback inventory via key', e);
                }
            }
            // Call upstream
            return g_ContinueFullInventoryRequestIfNecessary(transport, mergedResponse, strUrl, oParams, fOnSuccess, fOnFailure, fOnComplete);
        });
    };
}
function injectAnnotateOffer() {
    // Annotate offers for use in CSFloat Market, if the user isn't logged into CSFloat this does nothing
    // Similarly if they don't have an active sale, it does nothing
    $J(document).on('ajaxComplete', (event, request, settings) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!settings.url.includes('tradeoffer/new/send')) {
            // Ignore requests that aren't a new trade offer
            return;
        }
        const offer_id = (_a = request === null || request === void 0 ? void 0 : request.responseJSON) === null || _a === void 0 ? void 0 : _a.tradeofferid;
        if (!offer_id) {
            // Something wrong with the format
            return;
        }
        let assets_to_send = [];
        let assets_to_receive = [];
        const deserialized = (0,_utils_browser__WEBPACK_IMPORTED_MODULE_4__.deserializeForm)(settings.data);
        if (deserialized && deserialized.json_tradeoffer) {
            try {
                const parsed = JSON.parse(deserialized.json_tradeoffer);
                assets_to_send = parsed.me.assets.filter((e) => e.appid === _types_steam_constants__WEBPACK_IMPORTED_MODULE_5__.AppId.CSGO).map((e) => e.assetid);
                assets_to_receive = parsed.them.assets.filter((e) => e.appid === _types_steam_constants__WEBPACK_IMPORTED_MODULE_5__.AppId.CSGO).map((e) => e.assetid);
            }
            catch (e) {
                console.error('failed to parse json tradeoffer', e, deserialized.json_tradeoffer);
                // Still proceed with annotating the offer id on a best-effort
            }
        }
        yield (0,_bridge_client__WEBPACK_IMPORTED_MODULE_6__.ClientSend)(_bridge_handlers_annotate_offer__WEBPACK_IMPORTED_MODULE_7__.AnnotateOffer, {
            assets_to_send,
            assets_to_receive,
            offer_id: offer_id,
        });
    }));
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUYsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLDhEQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN0RztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbEYsOERBQThEO2FBQ2pFO1NBQ0o7UUFFRCxNQUFNLDBEQUFVLENBQUMsMEVBQWEsRUFBRTtZQUM1QixjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUMsRUFBQyxDQUFDO0FBQ1AsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc2dvLWZhZGUtcGVyY2VudGFnZS1jYWxjdWxhdG9yL2Rpc3QvZXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc2dvLWZhZGUtcGVyY2VudGFnZS1jYWxjdWxhdG9yL2Rpc3QvZXNtL21vZHVsZXMvQWNpZEZhZGVDYWxjdWxhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc2dvLWZhZGUtcGVyY2VudGFnZS1jYWxjdWxhdG9yL2Rpc3QvZXNtL21vZHVsZXMvQW1iZXJGYWRlQ2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3Nnby1mYWRlLXBlcmNlbnRhZ2UtY2FsY3VsYXRvci9kaXN0L2VzbS9tb2R1bGVzL0Jhc2VDYWxjdWxhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc2dvLWZhZGUtcGVyY2VudGFnZS1jYWxjdWxhdG9yL2Rpc3QvZXNtL21vZHVsZXMvRmFkZUNhbGN1bGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NzZ28tZmFkZS1wZXJjZW50YWdlLWNhbGN1bGF0b3IvZGlzdC9lc20vbW9kdWxlcy9SYW5kb21OdW1iZXJHZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9icmlkZ2UvY2xpZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2Fubm90YXRlX29mZmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2V4ZWN1dGVfY3NzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2V4ZWN1dGVfc2NyaXB0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2ZldGNoX2V4dGVuc2lvbl9maWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL2ZldGNoX2luc3BlY3RfaW5mby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9mZXRjaF9wZW5kaW5nX3RyYWRlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2JyaWRnZS9oYW5kbGVycy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL2hhbmRsZXJzL3R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL3R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYnJpZGdlL3dyYXBwZXJzL3ByaXZpbGVnZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9idXMvcG9zdF9tZXNzYWdlX2J1cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbXBvbmVudHMvY29tbW9uL2l0ZW1faG9sZGVyX21ldGFkYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29tcG9uZW50cy9jb21tb24vdWkvc3RlYW0tYnV0dG9uLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29tcG9uZW50cy9jdXN0b20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jb21wb25lbnRzL2luamVjdG9ycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbXBvbmVudHMvdHJhZGVfb2ZmZXIvYXV0b19maWxsLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29tcG9uZW50cy90cmFkZV9vZmZlci90cmFkZV9pdGVtX2hvbGRlcl9tZXRhZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3BhZ2Vfc2NyaXB0cy91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3NlcnZpY2VzL2Zsb2F0X2ZldGNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi90eXBlcy9mbG9hdF9tYXJrZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi90eXBlcy9zdGVhbV9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi91dGlscy9icm93c2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvY2FjaGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi91dGlscy9kZWZlcnJlZF9wcm9taXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvZGV0ZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvZG9wcGxlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi91dGlscy9rZXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi91dGlscy9vYnNlcnZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi91dGlscy9xdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL3JhbmtzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvc2tpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL3NuaXBzLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvY3NzLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvY3VzdG9tLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL2V2ZW50LW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3Byb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9xdWVyeS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFzc2lnbmVkLWVsZW1lbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9xdWVyeS1hc3NpZ25lZC1ub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcXVlcnktYXN5bmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3JlYWN0aXZlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L2xpdC1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2RpcmVjdGl2ZXMvY2xhc3MtbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saXQtaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0L2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3BhZ2Vfc2NyaXB0cy90cmFkZV9vZmZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmFkZUNhbGN1bGF0b3JNb2R1bGUgZnJvbSAnLi9tb2R1bGVzL0ZhZGVDYWxjdWxhdG9yJztcbmltcG9ydCBBbWJlckZhZGVDYWxjdWxhdG9yTW9kdWxlIGZyb20gJy4vbW9kdWxlcy9BbWJlckZhZGVDYWxjdWxhdG9yJztcbmltcG9ydCBBY2lkRmFkZUNhbGN1bGF0b3JNb2R1bGUgZnJvbSAnLi9tb2R1bGVzL0FjaWRGYWRlQ2FsY3VsYXRvcic7XG5leHBvcnQgY29uc3QgRmFkZUNhbGN1bGF0b3IgPSBuZXcgRmFkZUNhbGN1bGF0b3JNb2R1bGUoKTtcbmV4cG9ydCBjb25zdCBBbWJlckZhZGVDYWxjdWxhdG9yID0gbmV3IEFtYmVyRmFkZUNhbGN1bGF0b3JNb2R1bGUoKTtcbmV4cG9ydCBjb25zdCBBY2lkRmFkZUNhbGN1bGF0b3IgPSBuZXcgQWNpZEZhZGVDYWxjdWxhdG9yTW9kdWxlKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgQmFzZUNhbGN1bGF0b3IgZnJvbSAnLi9CYXNlQ2FsY3VsYXRvcic7XG5jbGFzcyBBY2lkRmFkZUNhbGN1bGF0b3IgZXh0ZW5kcyBCYXNlQ2FsY3VsYXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMud2VhcG9ucyA9IFtcbiAgICAgICAgICAgICdTU0cgMDgnLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnJldmVyc2VkV2VhcG9ucyA9IFtdO1xuICAgICAgICB0aGlzLnRyYWRlVXBXZWFwb25zID0gW1xuICAgICAgICAgICAgJ1NTRyAwOCcsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY29uZmlncyA9IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF94X3N0YXJ0OiAtMi40LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3hfZW5kOiAtMi4xLFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3lfc3RhcnQ6IDAuMCxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF95X2VuZDogMC4wLFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fcm90YXRlX3N0YXJ0OiAtNTUsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9yb3RhdGVfZW5kOiAtNjUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFjaWRGYWRlQ2FsY3VsYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFjaWRGYWRlQ2FsY3VsYXRvci5qcy5tYXAiLCJpbXBvcnQgQmFzZUNhbGN1bGF0b3IgZnJvbSAnLi9CYXNlQ2FsY3VsYXRvcic7XG5jbGFzcyBBbWJlckZhZGVDYWxjdWxhdG9yIGV4dGVuZHMgQmFzZUNhbGN1bGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLndlYXBvbnMgPSBbXG4gICAgICAgICAgICAnQVVHJyxcbiAgICAgICAgICAgICdHYWxpbCBBUicsXG4gICAgICAgICAgICAnTUFDLTEwJyxcbiAgICAgICAgICAgICdQMjAwMCcsXG4gICAgICAgICAgICAnUjggUmV2b2x2ZXInLFxuICAgICAgICAgICAgJ1Nhd2VkLU9mZicsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMucmV2ZXJzZWRXZWFwb25zID0gW107XG4gICAgICAgIHRoaXMudHJhZGVVcFdlYXBvbnMgPSBbXG4gICAgICAgICAgICAnQVVHJyxcbiAgICAgICAgICAgICdHYWxpbCBBUicsXG4gICAgICAgICAgICAnTUFDLTEwJyxcbiAgICAgICAgICAgICdQMjAwMCcsXG4gICAgICAgICAgICAnUjggUmV2b2x2ZXInLFxuICAgICAgICAgICAgJ1Nhd2VkLU9mZicsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY29uZmlncyA9IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF94X3N0YXJ0OiAtMC43LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3hfZW5kOiAtMC43LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3lfc3RhcnQ6IC0wLjcsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeV9lbmQ6IC0wLjcsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9yb3RhdGVfc3RhcnQ6IC01NSxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX3JvdGF0ZV9lbmQ6IC02NSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQW1iZXJGYWRlQ2FsY3VsYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFtYmVyRmFkZUNhbGN1bGF0b3IuanMubWFwIiwiaW1wb3J0IFJhbmRvbU51bWJlckdlbmVyYXRvciBmcm9tICcuL1JhbmRvbU51bWJlckdlbmVyYXRvcic7XG5jbGFzcyBCYXNlQ2FsY3VsYXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWluUGVyY2VudGFnZSA9IDgwO1xuICAgIH1cbiAgICBnZXRTdXBwb3J0ZWRXZWFwb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWFwb25zO1xuICAgIH1cbiAgICBnZXRGYWRlUGVyY2VudGFnZSh3ZWFwb24sIHNlZWQpIHtcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZXMgPSB0aGlzLmdldEZhZGVQZXJjZW50YWdlcyh3ZWFwb24pO1xuICAgICAgICByZXR1cm4gcGVyY2VudGFnZXNbc2VlZF07XG4gICAgfVxuICAgIGdldEFsbEZhZGVQZXJjZW50YWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2VhcG9ucy5tYXAoKHdlYXBvbikgPT4gKHtcbiAgICAgICAgICAgIHdlYXBvbixcbiAgICAgICAgICAgIHBlcmNlbnRhZ2VzOiB0aGlzLmdldEZhZGVQZXJjZW50YWdlcyh3ZWFwb24pLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGdldEZhZGVQZXJjZW50YWdlcyh3ZWFwb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLndlYXBvbnMuaW5jbHVkZXMod2VhcG9uKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgd2VhcG9uIFwiJHt3ZWFwb259XCIgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWdzW3dlYXBvbl0gfHwgdGhpcy5jb25maWdzLmRlZmF1bHQ7XG4gICAgICAgIGNvbnN0IHJhd1Jlc3VsdHMgPSBbXTtcbiAgICAgICAgY29uc3QgbWF4U2VlZCA9IHRoaXMudHJhZGVVcFdlYXBvbnMuaW5jbHVkZXMod2VhcG9uKVxuICAgICAgICAgICAgPyAxMDAwXG4gICAgICAgICAgICA6IDk5OTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbWF4U2VlZDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCByYW5kb21OdW1iZXJHZW5lcmF0b3IgPSBuZXcgUmFuZG9tTnVtYmVyR2VuZXJhdG9yKCk7XG4gICAgICAgICAgICByYW5kb21OdW1iZXJHZW5lcmF0b3Iuc2V0U2VlZChpKTtcbiAgICAgICAgICAgIGNvbnN0IHhPZmZzZXQgPSByYW5kb21OdW1iZXJHZW5lcmF0b3IucmFuZG9tRmxvYXQoY29uZmlnLnBhdHRlcm5fb2Zmc2V0X3hfc3RhcnQsIGNvbmZpZy5wYXR0ZXJuX29mZnNldF94X2VuZCk7XG4gICAgICAgICAgICByYW5kb21OdW1iZXJHZW5lcmF0b3IucmFuZG9tRmxvYXQoY29uZmlnLnBhdHRlcm5fb2Zmc2V0X3lfc3RhcnQsIGNvbmZpZy5wYXR0ZXJuX29mZnNldF95X2VuZCk7XG4gICAgICAgICAgICBjb25zdCByb3RhdGlvbiA9IHJhbmRvbU51bWJlckdlbmVyYXRvci5yYW5kb21GbG9hdChjb25maWcucGF0dGVybl9yb3RhdGVfc3RhcnQsIGNvbmZpZy5wYXR0ZXJuX3JvdGF0ZV9lbmQpO1xuICAgICAgICAgICAgbGV0IHJhd1Jlc3VsdDtcbiAgICAgICAgICAgIGlmIChjb25maWcucGF0dGVybl9vZmZzZXRfeF9zdGFydCAhPT0gY29uZmlnLnBhdHRlcm5fb2Zmc2V0X3hfZW5kKSB7XG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0ID0gcm90YXRpb24gKiB4T2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmF3UmVzdWx0ID0gcm90YXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYXdSZXN1bHRzLnB1c2goTWF0aC5hYnMocmF3UmVzdWx0KSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNSZXZlcnNlZCA9IHRoaXMucmV2ZXJzZWRXZWFwb25zLmluY2x1ZGVzKHdlYXBvbik7XG4gICAgICAgIGxldCBiZXN0UmVzdWx0O1xuICAgICAgICBsZXQgd29yc3RSZXN1bHQ7XG4gICAgICAgIGlmIChpc1JldmVyc2VkKSB7XG4gICAgICAgICAgICBiZXN0UmVzdWx0ID0gTWF0aC5tYXgoLi4ucmF3UmVzdWx0cyk7XG4gICAgICAgICAgICB3b3JzdFJlc3VsdCA9IE1hdGgubWluKC4uLnJhd1Jlc3VsdHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYmVzdFJlc3VsdCA9IE1hdGgubWluKC4uLnJhd1Jlc3VsdHMpO1xuICAgICAgICAgICAgd29yc3RSZXN1bHQgPSBNYXRoLm1heCguLi5yYXdSZXN1bHRzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHRSYW5nZSA9IHdvcnN0UmVzdWx0IC0gYmVzdFJlc3VsdDtcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZVJlc3VsdHMgPSByYXdSZXN1bHRzLm1hcCgocmF3UmVzdWx0KSA9PiAod29yc3RSZXN1bHQgLSByYXdSZXN1bHQpIC8gcmVzdWx0UmFuZ2UpO1xuICAgICAgICBjb25zdCBzb3J0ZWRQZXJjZW50YWdlUmVzdWx0cyA9IFsuLi5wZXJjZW50YWdlUmVzdWx0c10uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICByZXR1cm4gcGVyY2VudGFnZVJlc3VsdHMubWFwKChwZXJjZW50YWdlUmVzdWx0LCBpKSA9PiAoe1xuICAgICAgICAgICAgc2VlZDogaSxcbiAgICAgICAgICAgIHBlcmNlbnRhZ2U6IHRoaXMubWluUGVyY2VudGFnZSArIChwZXJjZW50YWdlUmVzdWx0ICogKDEwMCAtIHRoaXMubWluUGVyY2VudGFnZSkpLFxuICAgICAgICAgICAgcmFua2luZzogTWF0aC5taW4oc29ydGVkUGVyY2VudGFnZVJlc3VsdHMuaW5kZXhPZihwZXJjZW50YWdlUmVzdWx0KSArIDEsIHNvcnRlZFBlcmNlbnRhZ2VSZXN1bHRzLmxlbmd0aCAtIHNvcnRlZFBlcmNlbnRhZ2VSZXN1bHRzLmluZGV4T2YocGVyY2VudGFnZVJlc3VsdCkpLFxuICAgICAgICB9KSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQmFzZUNhbGN1bGF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CYXNlQ2FsY3VsYXRvci5qcy5tYXAiLCJpbXBvcnQgQmFzZUNhbGN1bGF0b3IgZnJvbSAnLi9CYXNlQ2FsY3VsYXRvcic7XG5jbGFzcyBGYWRlQ2FsY3VsYXRvciBleHRlbmRzIEJhc2VDYWxjdWxhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy53ZWFwb25zID0gW1xuICAgICAgICAgICAgJ0FXUCcsXG4gICAgICAgICAgICAnQmF5b25ldCcsXG4gICAgICAgICAgICAnQm93aWUgS25pZmUnLFxuICAgICAgICAgICAgJ0J1dHRlcmZseSBLbmlmZScsXG4gICAgICAgICAgICAnQ2xhc3NpYyBLbmlmZScsXG4gICAgICAgICAgICAnRmFsY2hpb24gS25pZmUnLFxuICAgICAgICAgICAgJ0ZsaXAgS25pZmUnLFxuICAgICAgICAgICAgJ0dsb2NrLTE4JyxcbiAgICAgICAgICAgICdHdXQgS25pZmUnLFxuICAgICAgICAgICAgJ0h1bnRzbWFuIEtuaWZlJyxcbiAgICAgICAgICAgICdLYXJhbWJpdCcsXG4gICAgICAgICAgICAnTTkgQmF5b25ldCcsXG4gICAgICAgICAgICAnTUFDLTEwJyxcbiAgICAgICAgICAgICdNUDcnLFxuICAgICAgICAgICAgJ05hdmFqYSBLbmlmZScsXG4gICAgICAgICAgICAnTm9tYWQgS25pZmUnLFxuICAgICAgICAgICAgJ1BhcmFjb3JkIEtuaWZlJyxcbiAgICAgICAgICAgICdSOCBSZXZvbHZlcicsXG4gICAgICAgICAgICAnU2hhZG93IERhZ2dlcnMnLFxuICAgICAgICAgICAgJ1NrZWxldG9uIEtuaWZlJyxcbiAgICAgICAgICAgICdTdGlsZXR0byBLbmlmZScsXG4gICAgICAgICAgICAnU3Vydml2YWwgS25pZmUnLFxuICAgICAgICAgICAgJ1RhbG9uIEtuaWZlJyxcbiAgICAgICAgICAgICdVTVAtNDUnLFxuICAgICAgICAgICAgJ1Vyc3VzIEtuaWZlJyxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5yZXZlcnNlZFdlYXBvbnMgPSBbXG4gICAgICAgICAgICAnQVdQJyxcbiAgICAgICAgICAgICdLYXJhbWJpdCcsXG4gICAgICAgICAgICAnVGFsb24gS25pZmUnLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnRyYWRlVXBXZWFwb25zID0gW1xuICAgICAgICAgICAgJ0FXUCcsXG4gICAgICAgICAgICAnR2xvY2stMTgnLFxuICAgICAgICAgICAgJ01BQy0xMCcsXG4gICAgICAgICAgICAnTVA3JyxcbiAgICAgICAgICAgICdSOCBSZXZvbHZlcicsXG4gICAgICAgICAgICAnVU1QLTQ1JyxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jb25maWdzID0ge1xuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3hfc3RhcnQ6IC0wLjcsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeF9lbmQ6IC0wLjcsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeV9zdGFydDogLTAuNyxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF95X2VuZDogLTAuNyxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX3JvdGF0ZV9zdGFydDogLTU1LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fcm90YXRlX2VuZDogLTY1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIE1QNzoge1xuICAgICAgICAgICAgICAgIHBhdHRlcm5fb2Zmc2V0X3hfc3RhcnQ6IC0wLjksXG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeF9lbmQ6IC0wLjMsXG4gICAgICAgICAgICAgICAgcGF0dGVybl9vZmZzZXRfeV9zdGFydDogLTAuNyxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX29mZnNldF95X2VuZDogLTAuNSxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuX3JvdGF0ZV9zdGFydDogLTU1LFxuICAgICAgICAgICAgICAgIHBhdHRlcm5fcm90YXRlX2VuZDogLTY1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBGYWRlQ2FsY3VsYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZhZGVDYWxjdWxhdG9yLmpzLm1hcCIsImNsYXNzIFJhbmRvbU51bWJlckdlbmVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubUlkdW0gPSAwO1xuICAgICAgICB0aGlzLm1JeSA9IDA7XG4gICAgICAgIHRoaXMubUl2ID0gW107XG4gICAgICAgIHRoaXMuTlRBQiA9IDMyO1xuICAgICAgICB0aGlzLklBID0gMTY4MDc7XG4gICAgICAgIHRoaXMuSU0gPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLklRID0gMTI3NzczO1xuICAgICAgICB0aGlzLklSID0gMjgzNjtcbiAgICAgICAgdGhpcy5ORElWID0gMSArICh0aGlzLklNIC0gMSkgLyB0aGlzLk5UQUI7XG4gICAgICAgIHRoaXMuQU0gPSAxLjAgLyB0aGlzLklNO1xuICAgICAgICB0aGlzLlJOTVggPSAxLjAgLSAxLjJlLTc7XG4gICAgfVxuICAgIHNldFNlZWQoc2VlZCkge1xuICAgICAgICB0aGlzLm1JZHVtID0gc2VlZDtcbiAgICAgICAgaWYgKHNlZWQgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5tSWR1bSA9IC1zZWVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubUl5ID0gMDtcbiAgICB9XG4gICAgZ2VuZXJhdGVSYW5kb21OdW1iZXIoKSB7XG4gICAgICAgIGxldCBrO1xuICAgICAgICBsZXQgajtcbiAgICAgICAgaWYgKHRoaXMubUlkdW0gPD0gMCB8fCB0aGlzLm1JeSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKC10aGlzLm1JZHVtIDwgMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubUlkdW0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tSWR1bSA9IC10aGlzLm1JZHVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChqID0gdGhpcy5OVEFCICsgNzsgaiA+PSAwOyBqIC09IDEpIHtcbiAgICAgICAgICAgICAgICBrID0gTWF0aC5mbG9vcih0aGlzLm1JZHVtIC8gdGhpcy5JUSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tSWR1bSA9IE1hdGguZmxvb3IodGhpcy5JQSAqICh0aGlzLm1JZHVtIC0gayAqIHRoaXMuSVEpIC0gdGhpcy5JUiAqIGspO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1JZHVtIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1JZHVtICs9IHRoaXMuSU07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChqIDwgdGhpcy5OVEFCKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubUl2W2pdID0gdGhpcy5tSWR1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBbdGhpcy5tSXldID0gdGhpcy5tSXY7XG4gICAgICAgIH1cbiAgICAgICAgayA9IE1hdGguZmxvb3IodGhpcy5tSWR1bSAvIHRoaXMuSVEpO1xuICAgICAgICB0aGlzLm1JZHVtID0gTWF0aC5mbG9vcih0aGlzLklBICogKHRoaXMubUlkdW0gLSBrICogdGhpcy5JUSkgLSB0aGlzLklSICogayk7XG4gICAgICAgIGlmICh0aGlzLm1JZHVtIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5tSWR1bSArPSB0aGlzLklNO1xuICAgICAgICB9XG4gICAgICAgIGogPSBNYXRoLmZsb29yKHRoaXMubUl5IC8gdGhpcy5ORElWKTtcbiAgICAgICAgdGhpcy5tSXkgPSBNYXRoLmZsb29yKHRoaXMubUl2W2pdKTtcbiAgICAgICAgdGhpcy5tSXZbal0gPSB0aGlzLm1JZHVtO1xuICAgICAgICByZXR1cm4gdGhpcy5tSXk7XG4gICAgfVxuICAgIHJhbmRvbUZsb2F0KGxvdywgaGlnaCkge1xuICAgICAgICBsZXQgZmxvYXQgPSB0aGlzLkFNICogdGhpcy5nZW5lcmF0ZVJhbmRvbU51bWJlcigpO1xuICAgICAgICBpZiAoZmxvYXQgPiB0aGlzLlJOTVgpIHtcbiAgICAgICAgICAgIGZsb2F0ID0gdGhpcy5STk1YO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoZmxvYXQgKiAoaGlnaCAtIGxvdykpICsgbG93O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFJhbmRvbU51bWJlckdlbmVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJhbmRvbU51bWJlckdlbmVyYXRvci5qcy5tYXAiLCJpbXBvcnQge0ludGVybmFsUmVxdWVzdEJ1bmRsZSwgSW50ZXJuYWxSZXNwb25zZUJ1bmRsZSwgUmVxdWVzdEhhbmRsZXIsIFZlcnNpb259IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtpc0ZpcmVmb3gsIHJ1bnRpbWVOYW1lc3BhY2V9IGZyb20gJy4uL3V0aWxzL2RldGVjdCc7XG5pbXBvcnQge2luUGFnZUNvbnRleHR9IGZyb20gJy4uL3V0aWxzL3NuaXBzJztcbmltcG9ydCB7Z19Qb3N0TWVzc2FnZUJ1c30gZnJvbSAnLi4vYnVzL3Bvc3RfbWVzc2FnZV9idXMnO1xuXG5mdW5jdGlvbiBjYW5Vc2VTZW5kTWVzc2FnZSgpIHtcbiAgICAvLyBOb3Qgc3VwcG9ydGVkIGluIEZpcmVmb3ggUGFnZSBDb250ZXh0XG4gICAgcmV0dXJuICEoaXNGaXJlZm94KCkgJiYgaW5QYWdlQ29udGV4dCgpKTtcbn1cblxuLyoqXG4gKiBTZW5kIGEgcmVxdWVzdCB0byBiZSBoYW5kbGVkIGJ5IHRoZSBiYWNrZ3JvdW5kIHdvcmtlclxuICpcbiAqIENhbiBiZSBjYWxsZWQgZnJvbSBhIGNvbnRlbnQgc2NyaXB0IG9yIHBhZ2UgaXRzZWxmXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBDbGllbnRTZW5kPFJlcSwgUmVzcD4oaGFuZGxlcjogUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiwgYXJnczogUmVxKTogUHJvbWlzZTxSZXNwPiB7XG4gICAgY29uc3QgYnVuZGxlOiBJbnRlcm5hbFJlcXVlc3RCdW5kbGUgPSB7XG4gICAgICAgIHZlcnNpb246IFZlcnNpb24uVjEsXG4gICAgICAgIHJlcXVlc3RfdHlwZTogaGFuZGxlci5nZXRUeXBlKCksXG4gICAgICAgIHJlcXVlc3Q6IGFyZ3MsXG4gICAgICAgIGlkOiBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDAwMCksXG4gICAgfTtcblxuICAgIGlmIChjYW5Vc2VTZW5kTWVzc2FnZSgpKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgcnVudGltZU5hbWVzcGFjZSgpLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgd2luZG93LkNTRkxPQVRfRVhURU5TSU9OX0lEIHx8IGNocm9tZS5ydW50aW1lLmlkLFxuICAgICAgICAgICAgICAgIGJ1bmRsZSxcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgICAgIChyZXNwOiBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwPy5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwPy5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsYmFjayB0byBwb3N0bWVzc2FnZSBidXMgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3QgaW1wbGVtZW50XG4gICAgICAgIC8vIHNwZWNzIGZ1bGx5XG4gICAgICAgIHJldHVybiBnX1Bvc3RNZXNzYWdlQnVzLnNlbmRSZXF1ZXN0KGJ1bmRsZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtTaW1wbGVIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ub3RhdGVPZmZlclJlcXVlc3Qge1xuICAgIGFzc2V0c190b19zZW5kOiBzdHJpbmdbXTtcbiAgICBhc3NldHNfdG9fcmVjZWl2ZTogc3RyaW5nW107XG4gICAgb2ZmZXJfaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbm5vdGF0ZU9mZmVyUmVzcG9uc2Uge31cblxuZXhwb3J0IGNvbnN0IEFubm90YXRlT2ZmZXIgPSBuZXcgU2ltcGxlSGFuZGxlcjxBbm5vdGF0ZU9mZmVyUmVxdWVzdCwgQW5ub3RhdGVPZmZlclJlc3BvbnNlPihcbiAgICBSZXF1ZXN0VHlwZS5BTk5PVEFURV9PRkZFUixcbiAgICBhc3luYyAocmVxKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9jc2Zsb2F0LmNvbS9hcGkvdjEvdHJhZGVzL2Fubm90YXRlLW9mZmVyYCwge1xuICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3Auc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzdGF0dXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwLmpzb24oKSBhcyBQcm9taXNlPEFubm90YXRlT2ZmZXJSZXNwb25zZT47XG4gICAgfVxuKTtcbiIsImltcG9ydCB7RW1wdHlSZXNwb25zZUhhbmRsZXJ9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7UHJpdmlsZWdlZEhhbmRsZXJ9IGZyb20gJy4uL3dyYXBwZXJzL3ByaXZpbGVnZWQnO1xuXG5pbnRlcmZhY2UgRXhlY3V0ZUNzc1JlcXVlc3Qge1xuICAgIHBhdGg6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEV4ZWN1dGVDc3NPblBhZ2UgPSBuZXcgUHJpdmlsZWdlZEhhbmRsZXIoXG4gICAgbmV3IEVtcHR5UmVzcG9uc2VIYW5kbGVyPEV4ZWN1dGVDc3NSZXF1ZXN0PihSZXF1ZXN0VHlwZS5FWEVDVVRFX0NTU19PTl9QQUdFLCBhc3luYyAocmVxLCBzZW5kZXIpID0+IHtcbiAgICAgICAgYXdhaXQgY2hyb21lLnNjcmlwdGluZy5pbnNlcnRDU1Moe1xuICAgICAgICAgICAgdGFyZ2V0OiB7dGFiSWQ6IHNlbmRlci50YWI/LmlkIGFzIG51bWJlcn0sXG4gICAgICAgICAgICBmaWxlczogW3JlcS5wYXRoXSxcbiAgICAgICAgfSk7XG4gICAgfSlcbik7XG4iLCJpbXBvcnQge0VtcHR5UmVzcG9uc2VIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1ByaXZpbGVnZWRIYW5kbGVyfSBmcm9tICcuLi93cmFwcGVycy9wcml2aWxlZ2VkJztcblxuaW50ZXJmYWNlIEV4ZWN1dGVTY3JpcHRSZXF1ZXN0IHtcbiAgICBwYXRoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBFeGVjdXRlU2NyaXB0T25QYWdlID0gbmV3IFByaXZpbGVnZWRIYW5kbGVyKFxuICAgIG5ldyBFbXB0eVJlc3BvbnNlSGFuZGxlcjxFeGVjdXRlU2NyaXB0UmVxdWVzdD4oUmVxdWVzdFR5cGUuRVhFQ1VURV9TQ1JJUFRfT05fUEFHRSwgYXN5bmMgKHJlcSwgc2VuZGVyKSA9PiB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gaW5qZWN0IHRoZSBleHRlbnNpb24gSUQgZHluYW1pY2FsbHkgc28gdGhlIGNsaWVudCBrbm93cyB3aG8gdG9cbiAgICAgICAgLy8gY29tbXVuaWNhdGUgd2l0aC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gT24gRmlyZWZveCwgZXh0ZW5zaW9uIElEcyBhcmUgcmFuZG9tLCBzbyB0aGlzIGlzIG5lY2Vzc2FyeS5cbiAgICAgICAgYXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgICAgIHRhcmdldDoge3RhYklkOiBzZW5kZXIudGFiPy5pZCBhcyBudW1iZXJ9LFxuICAgICAgICAgICAgd29ybGQ6ICdNQUlOJyxcbiAgICAgICAgICAgIGFyZ3M6IFtjaHJvbWUucnVudGltZS5pZCwgY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKCdzcmMvbW9kZWxfZnJhbWUuaHRtbCcpXSxcbiAgICAgICAgICAgIGZ1bmM6IGZ1bmN0aW9uIEV4dGVuc2lvbklkKGV4dGVuc2lvbklkLCBtb2RlbEZyYW1lVXJsKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LkNTRkxPQVRfRVhURU5TSU9OX0lEID0gZXh0ZW5zaW9uSWQ7XG4gICAgICAgICAgICAgICAgd2luZG93LkNTRkxPQVRfTU9ERUxfRlJBTUVfVVJMID0gbW9kZWxGcmFtZVVybDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHt0YWJJZDogc2VuZGVyLnRhYj8uaWQgYXMgbnVtYmVyfSxcbiAgICAgICAgICAgIGZpbGVzOiBbcmVxLnBhdGhdLFxuICAgICAgICAgICAgd29ybGQ6ICdNQUlOJyxcbiAgICAgICAgfSk7XG4gICAgfSlcbik7XG4iLCJpbXBvcnQge1NpbXBsZUhhbmRsZXJ9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7UHJpdmlsZWdlZEhhbmRsZXJ9IGZyb20gJy4uL3dyYXBwZXJzL3ByaXZpbGVnZWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoRXh0ZW5zaW9uRmlsZVJlcXVlc3Qge1xuICAgIHBhdGg6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEV4dGVuc2lvbkZpbGVSZXNwb25zZSB7XG4gICAgdGV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRmV0Y2hFeHRlbnNpb25GaWxlID0gbmV3IFByaXZpbGVnZWRIYW5kbGVyKFxuICAgIG5ldyBTaW1wbGVIYW5kbGVyPEZldGNoRXh0ZW5zaW9uRmlsZVJlcXVlc3QsIEZldGNoRXh0ZW5zaW9uRmlsZVJlc3BvbnNlPihcbiAgICAgICAgUmVxdWVzdFR5cGUuRkVUQ0hfRVhURU5TSU9OX0ZJTEUsXG4gICAgICAgIGFzeW5jIChyZXEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGNocm9tZS5ydW50aW1lLmdldFVSTChyZXEucGF0aCk7XG4gICAgICAgICAgICBjb25zdCByID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByLnRleHQoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICApXG4pO1xuIiwiaW1wb3J0IHtTaW1wbGVIYW5kbGVyfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtSZXF1ZXN0VHlwZX0gZnJvbSAnLi90eXBlcyc7XG5cbmludGVyZmFjZSBTdGlja2VyIHtcbiAgICBzbG90OiBudW1iZXI7XG4gICAgc3RpY2tlcklkOiBudW1iZXI7XG4gICAgY29kZW5hbWU/OiBzdHJpbmc7XG4gICAgbWF0ZXJpYWw/OiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICB3ZWFyPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW1JbmZvIHtcbiAgICBzdGlja2VyczogU3RpY2tlcltdO1xuICAgIGl0ZW1pZDogc3RyaW5nO1xuICAgIGRlZmluZGV4OiBudW1iZXI7XG4gICAgcGFpbnRpbmRleDogbnVtYmVyO1xuICAgIHJhcml0eTogbnVtYmVyO1xuICAgIHF1YWxpdHk6IG51bWJlcjtcbiAgICBwYWludHNlZWQ6IG51bWJlcjtcbiAgICBpbnZlbnRvcnk6IG51bWJlcjtcbiAgICBvcmlnaW46IG51bWJlcjtcbiAgICBzOiBzdHJpbmc7XG4gICAgYTogc3RyaW5nO1xuICAgIGQ6IHN0cmluZztcbiAgICBtOiBzdHJpbmc7XG4gICAgZmxvYXR2YWx1ZTogbnVtYmVyO1xuICAgIGltYWdldXJsOiBzdHJpbmc7XG4gICAgbWluOiBudW1iZXI7XG4gICAgbWF4OiBudW1iZXI7XG4gICAgd2VhcG9uX3R5cGU/OiBzdHJpbmc7XG4gICAgaXRlbV9uYW1lPzogc3RyaW5nO1xuICAgIHJhcml0eV9uYW1lPzogc3RyaW5nO1xuICAgIHF1YWxpdHlfbmFtZT86IHN0cmluZztcbiAgICBvcmlnaW5fbmFtZT86IHN0cmluZztcbiAgICB3ZWFyX25hbWU/OiBzdHJpbmc7XG4gICAgZnVsbF9pdGVtX25hbWU/OiBzdHJpbmc7XG4gICAgbG93X3Jhbms/OiBudW1iZXI7XG4gICAgaGlnaF9yYW5rPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoSW5zcGVjdEluZm9SZXF1ZXN0IHtcbiAgICBsaW5rOiBzdHJpbmc7XG4gICAgbGlzdFByaWNlPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoSW5zcGVjdEluZm9SZXNwb25zZSB7XG4gICAgaXRlbWluZm86IEl0ZW1JbmZvO1xuICAgIGVycm9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRmV0Y2hJbnNwZWN0SW5mbyA9IG5ldyBTaW1wbGVIYW5kbGVyPEZldGNoSW5zcGVjdEluZm9SZXF1ZXN0LCBGZXRjaEluc3BlY3RJbmZvUmVzcG9uc2U+KFxuICAgIFJlcXVlc3RUeXBlLkZFVENIX0lOU1BFQ1RfSU5GTyxcbiAgICAocmVxKSA9PiB7XG4gICAgICAgIGNvbnN0IGFwaVVybCA9IGBodHRwczovL2FwaS5jc2Zsb2F0LmNvbS8/dXJsPSR7cmVxLmxpbmt9Jm1pbmltYWw9dHJ1ZSR7XG4gICAgICAgICAgICByZXEubGlzdFByaWNlID8gJyZsaXN0UHJpY2U9JyArIHJlcS5saXN0UHJpY2UgOiAnJ1xuICAgICAgICB9YDtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVybCkudGhlbigocmVzcCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3AuanNvbigpLnRoZW4oKGpzb246IEZldGNoSW5zcGVjdEluZm9SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGpzb24uZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pIGFzIFByb21pc2U8RmV0Y2hJbnNwZWN0SW5mb1Jlc3BvbnNlPjtcbiAgICAgICAgfSk7XG4gICAgfVxuKTtcbiIsImltcG9ydCB7U2ltcGxlSGFuZGxlcn0gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7VHJhZGV9IGZyb20gJy4uLy4uL3R5cGVzL2Zsb2F0X21hcmtldCc7XG5pbXBvcnQge1JlcXVlc3RUeXBlfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaFBlbmRpbmdUcmFkZXNSZXF1ZXN0IHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hQZW5kaW5nVHJhZGVzUmVzcG9uc2Uge1xuICAgIHRyYWRlc190b19zZW5kOiBUcmFkZVtdO1xuICAgIHRyYWRlc190b19yZWNlaXZlOiBUcmFkZVtdO1xufVxuXG5leHBvcnQgY29uc3QgRmV0Y2hQZW5kaW5nVHJhZGVzID0gbmV3IFNpbXBsZUhhbmRsZXI8RmV0Y2hQZW5kaW5nVHJhZGVzUmVxdWVzdCwgRmV0Y2hQZW5kaW5nVHJhZGVzUmVzcG9uc2U+KFxuICAgIFJlcXVlc3RUeXBlLkZFVENIX1BFTkRJTkdfVFJBREVTLFxuICAgIGFzeW5jIChyZXEpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9jc2Zsb2F0LmNvbS9hcGkvdjEvbWUvcGVuZGluZy10cmFkZXNgLCB7XG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmVzcC5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzdGF0dXMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3AuanNvbigpIGFzIFByb21pc2U8RmV0Y2hQZW5kaW5nVHJhZGVzUmVzcG9uc2U+O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUcnkgdGhlIG9sZCBDU0dPRmxvYXQgVVJMIChpbiBjYXNlIHRoZXkgaGF2ZSBhbiBvbGQgc2Vzc2lvbiBmcm9tIHRoZXJlKVxuICAgICAgICAgICAgLy8gT2Ygbm90ZSwgdGhpcyBjYW4gYmUgcmVtb3ZlZCB+MSB3ZWVrIGFmdGVyIHRoZSBtaWdyYXRpb24uXG4gICAgICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vY3Nnb2Zsb2F0LmNvbS9hcGkvdjEvbWUvcGVuZGluZy10cmFkZXNgLCB7XG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmVzcC5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzdGF0dXMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3AuanNvbigpO1xuICAgICAgICB9XG4gICAgfVxuKTtcbiIsImltcG9ydCB7UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgU2ltcGxlSGFuZGxlcjxSZXEsIFJlc3A+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBSZXF1ZXN0VHlwZSwgcHJpdmF0ZSBoYW5kbGVyOiAocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpID0+IFByb21pc2U8UmVzcD4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IFJlcXVlc3RUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXF1ZXN0KHJlcXVlc3Q6IFJlcSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKTogUHJvbWlzZTxSZXNwPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCwgc2VuZGVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1wdHkge31cblxuZXhwb3J0IGNsYXNzIEVtcHR5UmVxdWVzdEhhbmRsZXI8UmVzcD4gaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxFbXB0eSwgUmVzcD4ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogUmVxdWVzdFR5cGUsIHByaXZhdGUgaGFuZGxlcjogKHNlbmRlcjogTWVzc2FnZVNlbmRlcikgPT4gUHJvbWlzZTxSZXNwPikge31cblxuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogRW1wdHksIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8UmVzcD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHNlbmRlcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1wdHlSZXNwb25zZUhhbmRsZXI8UmVxPiBpbXBsZW1lbnRzIFJlcXVlc3RIYW5kbGVyPFJlcSwgdm9pZD4ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogUmVxdWVzdFR5cGUsIHByaXZhdGUgaGFuZGxlcjogKHJlcXVlc3Q6IFJlcSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyKSA9PiBQcm9taXNlPHZvaWQ+KSB7fVxuXG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBSZXEsIHNlbmRlcjogTWVzc2FnZVNlbmRlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHJlcXVlc3QsIHNlbmRlcik7XG4gICAgfVxufVxuIiwiZXhwb3J0IGVudW0gUmVxdWVzdFR5cGUge1xuICAgIEVYRUNVVEVfU0NSSVBUX09OX1BBR0UsXG4gICAgRVhFQ1VURV9DU1NfT05fUEFHRSxcbiAgICBGRVRDSF9JTlNQRUNUX0lORk8sXG4gICAgRkVUQ0hfU1RBTEwsXG4gICAgU1RPUkFHRV9HRVQsXG4gICAgU1RPUkFHRV9TRVQsXG4gICAgU1RPUkFHRV9SRU1PVkUsXG4gICAgRkVUQ0hfUEVORElOR19UUkFERVMsXG4gICAgRkVUQ0hfU0tJTl9NT0RFTCxcbiAgICBGRVRDSF9FWFRFTlNJT05fRklMRSxcbiAgICBBTk5PVEFURV9PRkZFUixcbiAgICBFWFRFTlNJT05fVkVSU0lPTixcbn1cbiIsImltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4vaGFuZGxlcnMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RIYW5kbGVyPFJlcSwgUmVzcD4ge1xuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPFJlc3A+O1xuICAgIGdldFR5cGUoKTogUmVxdWVzdFR5cGU7XG59XG5cbmV4cG9ydCBlbnVtIFZlcnNpb24ge1xuICAgIFYxID0gJ0NTRkxPQVRfVjEnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsUmVxdWVzdEJ1bmRsZSB7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuXG4gICAgcmVxdWVzdF90eXBlOiBSZXF1ZXN0VHlwZTtcblxuICAgIC8vIElucHV0IHJlcXVlc3RcbiAgICByZXF1ZXN0OiBhbnk7XG5cbiAgICAvLyBSYW5kb20gSUQgdG8gaWRlbnRpZnkgdGhlIHJlcXVlc3RcbiAgICBpZDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsUmVzcG9uc2VCdW5kbGUge1xuICAgIHJlcXVlc3RfdHlwZTogUmVxdWVzdFR5cGU7XG5cbiAgICAvLyBSZXNwb25zZVxuICAgIHJlc3BvbnNlOiBhbnk7XG5cbiAgICBlcnJvcjogc3RyaW5nO1xuXG4gICAgLy8gUmFuZG9tIElEIHRvIGlkZW50aWZ5IHRoZSByZXF1ZXN0XG4gICAgaWQ6IG51bWJlcjtcbn1cbiIsImltcG9ydCB7UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7UmVxdWVzdFR5cGV9IGZyb20gJy4uL2hhbmRsZXJzL3R5cGVzJztcbmltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcblxuLyoqXG4gKiBSZXN0cmljdHMgYSBnaXZlbiBoYW5kbGVyIHN1Y2ggdGhhdCBpdCBjYW4gb25seSBydW4gaWYgdGhlIHNlbmRlciBpc1xuICogdmVyaWZpZWQgdG8gYmUgZnJvbSB0aGUgZXh0ZW5zaW9uJ3Mgb3JpZ2luIChpZS4gY29udGVudCBzY3JpcHQpXG4gKi9cbmV4cG9ydCBjbGFzcyBQcml2aWxlZ2VkSGFuZGxlcjxSZXEsIFJlc3A+IGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8UmVxLCBSZXNwPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBoYW5kbGVyOiBSZXF1ZXN0SGFuZGxlcjxSZXEsIFJlc3A+KSB7fVxuXG4gICAgZ2V0VHlwZSgpOiBSZXF1ZXN0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZ2V0VHlwZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogUmVxLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPFJlc3A+IHtcbiAgICAgICAgaWYgKHNlbmRlci5pZCAhPT0gY2hyb21lLnJ1bnRpbWUuaWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdCB0byBhY2Nlc3MgcmVzdHJpY3RlZCBtZXRob2Qgb3V0c2lkZSBvZiBzZWN1cmUgY29udGV4dCAoaWUuIGNvbnRlbnQgc2NyaXB0KScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5oYW5kbGVSZXF1ZXN0KHJlcXVlc3QsIHNlbmRlcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtJbnRlcm5hbFJlcXVlc3RCdW5kbGUsIEludGVybmFsUmVzcG9uc2VCdW5kbGUsIFZlcnNpb259IGZyb20gJy4uL2JyaWRnZS90eXBlcyc7XG5pbXBvcnQge3J1bnRpbWVOYW1lc3BhY2V9IGZyb20gJy4uL3V0aWxzL2RldGVjdCc7XG5cbi8qKlxuICogTWVzc2FnZSBidXMgdGhhdCB1c2VzIGBwb3N0TWVzc2FnZWAgaW4gb3JkZXIgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgYmFja2dyb3VuZFxuICogc2VydmljZSB3b3JrZXIvc2NyaXB0LlxuICpcbiAqIFdoeT8gQmVjYXVzZSB0aGUgY2xpZW50IHBhZ2UgKGllLiBTdGVhbSBwYWdlKSBvbiBGaXJlZm94IGlzIG5vdCBjYXBhYmxlIG9mXG4gKiBzZW5kaW5nIGEgbWVzc2FnZSBkaXJlY3RseSB0byB0aGUgZXh0ZW5zaW9uIGJhY2tncm91bmQuXG4gKlxuICogU28gaXQgcmVxdWlyZXMgdXMgdG8gZG8gdGhlIGZvbGxvd2luZyBkYW5jZTpcbiAqIHBhZ2UgPC0tKHBvc3RtZXNzYWdlKS0tPiBjb250ZW50IHNjcmlwdCA8LS0oc2VuZG1lc3NhZ2UpLS0+IGJhY2tncm91bmQgc2NyaXB0XG4gKlxuICogVGhpcyBkYW5jZSBpcyBhYnN0cmFjdGVkIGluIGBDbGllbnRTZW5kYCwgYW5kIG9ubHkgdXNlcyB0aGlzIGJ1cyBpZlxuICogYHNlbmRtZXNzYWdlYCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBwYWdlLlxuICovXG5jbGFzcyBQb3N0TWVzc2FnZUJ1cyB7XG4gICAgLyoqXG4gICAgICogRm9yIHRoZSByZXF1ZXN0ZXIgKGllLiBwYWdlKSwgdG8gd2FpdCB1bnRpbCBpdCBnZXRzIGEgcmVzcG9uc2VcbiAgICAgKiBmcm9tIHRoZSBjb250ZW50IHNjcmlwdCB2aWEuIHBvc3RNZXNzYWdlIGZvciB0aGUgZ2l2ZW4gcmVxdWVzdCBJRFxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFJlcXVlc3QgSURcbiAgICAgKi9cbiAgICB3YWl0VW50aWxSZXNwb25zZUZvcihpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcCA9IGUuZGF0YSBhcyBJbnRlcm5hbFJlc3BvbnNlQnVuZGxlO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLmlkICE9PSBpZCB8fCAhcmVzcC5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBsZWFrc1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlciwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3A/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3A/LmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHJlcXVlc3QgdG8gYmUgZG9uZSB0aHJvdWdoIHRoZSBidXMsIHJldHVybnMgdGhlIGFwcHJvcHJpYXRlXG4gICAgICogcmVzcG9uc2UgZm9yIHRoZSBpbnB1dCBidW5kbGUgaGFuZGxlclxuICAgICAqXG4gICAgICogQHBhcmFtIGJ1bmRsZSBSZXF1ZXN0IEJ1bmRsZVxuICAgICAqL1xuICAgIHNlbmRSZXF1ZXN0KGJ1bmRsZTogSW50ZXJuYWxSZXF1ZXN0QnVuZGxlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKGJ1bmRsZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2FpdFVudGlsUmVzcG9uc2VGb3IoYnVuZGxlLmlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGhhbmRsZXIgKGNvbnRlbnQgc2NyaXB0KSBmb3IgbmV3IHJlcXVlc3RzIGZyb20gdGhlIHBhZ2UuXG4gICAgICpcbiAgICAgKiBFYWNoIHJlcXVlc3QgaXMgZWZmZWN0aXZlbHkgXCJwcm94aWVkXCIgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0L3dvcmtlclxuICAgICAqIHRvIGFjdHVhbGx5IGV4ZWN1dGUgaXQncyBoYW5kbGVyLlxuICAgICAqL1xuICAgIGhhbmRsZVJlcXVlc3RzKCkge1xuICAgICAgICBjb25zdCBoID0gKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGUuZGF0YS52ZXJzaW9uICE9PSBWZXJzaW9uLlYxIHx8ICFlLmRhdGEucmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBtZXNzYWdlcyB0aGF0IGFyZW4ndCBmb3IgdGhpcyBicmlkZ2VcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlbmQgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIEJhZCB0eXBlc1xuICAgICAgICAgICAgcnVudGltZU5hbWVzcGFjZSgpLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuaWQsXG4gICAgICAgICAgICAgICAgZS5kYXRhLFxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgQmFkIHR5cGVzXG4gICAgICAgICAgICAgICAgKHJlc3A6IEludGVybmFsUmVzcG9uc2VCdW5kbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHJlc3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBnX1Bvc3RNZXNzYWdlQnVzID0gbmV3IFBvc3RNZXNzYWdlQnVzKCk7XG4iLCJpbXBvcnQge0Zsb2F0RWxlbWVudH0gZnJvbSAnLi4vY3VzdG9tJztcbmltcG9ydCB7aHRtbCwgY3NzLCBIVE1MVGVtcGxhdGVSZXN1bHQsIG5vdGhpbmd9IGZyb20gJ2xpdCc7XG5pbXBvcnQge3N0YXRlfSBmcm9tICdsaXQvZGVjb3JhdG9ycy5qcyc7XG5pbXBvcnQge3JnQXNzZXR9IGZyb20gJy4uLy4uL3R5cGVzL3N0ZWFtJztcbmltcG9ydCB7Z0Zsb2F0RmV0Y2hlcn0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmxvYXRfZmV0Y2hlcic7XG5pbXBvcnQge0l0ZW1JbmZvfSBmcm9tICcuLi8uLi9icmlkZ2UvaGFuZGxlcnMvZmV0Y2hfaW5zcGVjdF9pbmZvJztcbmltcG9ydCB7Zm9ybWF0RmxvYXRXaXRoUmFuaywgZm9ybWF0U2VlZCwgZ2V0RmFkZVBlcmNlbnRhZ2UsIGdldExvd2VzdFJhbmt9IGZyb20gJy4uLy4uL3V0aWxzL3NraW4nO1xuaW1wb3J0IHtpc1NraW4sIGZsb29yfSBmcm9tICcuLi8uLi91dGlscy9za2luJztcbmltcG9ydCB7Z2V0UmFua0NvbG91cn0gZnJvbSAnLi4vLi4vdXRpbHMvcmFua3MnO1xuaW1wb3J0IHtPYnNlcnZlfSBmcm9tICcuLi8uLi91dGlscy9vYnNlcnZlcnMnO1xuXG4vLyBHZW5lcmljIGFubm90YXRvciBvZiBpdGVtIGhvbGRlciBtZXRhZGF0YSAoZmxvYXQsIHNlZWQsIGV0Yy4uLilcbi8vIE11c3QgYmUgZXh0ZW5kZWQgdG8gdXNlIGFzIGEgY29tcG9uZW50XG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSXRlbUhvbGRlck1ldGFkYXRhIGV4dGVuZHMgRmxvYXRFbGVtZW50IHtcbiAgICBzdGF0aWMgc3R5bGVzID0gW1xuICAgICAgICAuLi5GbG9hdEVsZW1lbnQuc3R5bGVzLFxuICAgICAgICBjc3NgXG4gICAgICAgICAgICAuZmxvYXQge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICBib3R0b206IDNweDtcbiAgICAgICAgICAgICAgICByaWdodDogM3B4O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnNlZWQge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICB0b3A6IDNweDtcbiAgICAgICAgICAgICAgICByaWdodDogM3B4O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmZhZGUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KDBkZWcsICNkOWJiYTUgMCUsICNlNTkwM2IgMzMlLCAjZGI1OTc3IDY2JSwgIzY3NzVlMSAxMDAlKTtcbiAgICAgICAgICAgICAgICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcbiAgICAgICAgICAgICAgICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5jc2Zsb2F0LXNoaW5lLWZhZGUtdGV4dCB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDEwMDA7XG4gICAgICAgICAgICAgICAgLXdlYmtpdC10ZXh0LXN0cm9rZTogMXB4IGJsYWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICBgLFxuICAgIF07XG5cbiAgICBAc3RhdGUoKVxuICAgIHByaXZhdGUgaXRlbUluZm86IEl0ZW1JbmZvIHwgdW5kZWZpbmVkO1xuXG4gICAgZ2V0IGFzc2V0SWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuICRKKHRoaXMpLnBhcmVudCgpLmF0dHIoJ2lkJyk/LnNwbGl0KCdfJylbMl07XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IGFzc2V0KCk6IHJnQXNzZXQgfCB1bmRlZmluZWQ7XG4gICAgYWJzdHJhY3QgZ2V0IG93bmVyU3RlYW1JZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBnZXQgaW5zcGVjdExpbmsoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCF0aGlzLmFzc2V0KSByZXR1cm47XG5cbiAgICAgICAgaWYgKCF0aGlzLmFzc2V0Py5hY3Rpb25zIHx8IHRoaXMuYXNzZXQ/LmFjdGlvbnM/Lmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghdGhpcy5vd25lclN0ZWFtSWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmFzc2V0XG4gICAgICAgICAgICA/LmFjdGlvbnMhWzBdLmxpbmsucmVwbGFjZSgnJW93bmVyX3N0ZWFtaWQlJywgdGhpcy5vd25lclN0ZWFtSWQpXG4gICAgICAgICAgICAucmVwbGFjZSgnJWFzc2V0aWQlJywgdGhpcy5hc3NldElkISk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbmRlcigpOiBIVE1MVGVtcGxhdGVSZXN1bHQge1xuICAgICAgICBpZiAoIXRoaXMuaXRlbUluZm8pIHJldHVybiBodG1sYGA7XG5cbiAgICAgICAgY29uc3QgZmFkZVBlcmNlbnRhZ2UgPSB0aGlzLmFzc2V0ICYmIGdldEZhZGVQZXJjZW50YWdlKHRoaXMuYXNzZXQsIHRoaXMuaXRlbUluZm8pO1xuXG4gICAgICAgIGlmIChmYWRlUGVyY2VudGFnZSA9PT0gMTAwKSB7XG4gICAgICAgICAgICAkSih0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnZnVsbC1mYWRlLWJvcmRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmFuayA9IGdldExvd2VzdFJhbmsodGhpcy5pdGVtSW5mbyk7XG5cbiAgICAgICAgcmV0dXJuIGh0bWxgXG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZsb2F0XCI+JHtmb3JtYXRGbG9hdFdpdGhSYW5rKHRoaXMuaXRlbUluZm8sIDYpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlZWRcIlxuICAgICAgICAgICAgICAgICAgICA+JHtmb3JtYXRTZWVkKHRoaXMuaXRlbUluZm8pfVxuICAgICAgICAgICAgICAgICAgICAke2ZhZGVQZXJjZW50YWdlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gaHRtbGA8c3BhbiBjbGFzcz1cImZhZGUgJHtyYW5rICYmIHJhbmsgPD0gNSA/ICdjc2Zsb2F0LXNoaW5lLWZhZGUtdGV4dCcgOiAnJ31cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPigke2Zsb29yKGZhZGVQZXJjZW50YWdlLCAxKX0lKTwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICA+YFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBub3RoaW5nfTwvc3BhblxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBhc3luYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcblxuICAgICAgICBpZiAodGhpcy5pbnNwZWN0TGluaykge1xuICAgICAgICAgICAgdGhpcy5vbkluaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFdhaXQgdW50aWwgdGhlIGFzc2V0IGV4aXN0c1xuICAgICAgICAgICAgT2JzZXJ2ZShcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLmluc3BlY3RMaW5rLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5zcGVjdExpbmspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Jbml0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDIwMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIG9uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFzc2V0KSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFpc1NraW4odGhpcy5hc3NldCkpIHJldHVybjtcblxuICAgICAgICAvLyBDb21tb2RpdGllcyB3b24ndCBoYXZlIGluc3BlY3QgbGlua3NcbiAgICAgICAgaWYgKCF0aGlzLmluc3BlY3RMaW5rKSByZXR1cm47XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbUluZm8gPSBhd2FpdCBnRmxvYXRGZXRjaGVyLmZldGNoKHtcbiAgICAgICAgICAgICAgICBsaW5rOiB0aGlzLmluc3BlY3RMaW5rLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGZldGNoIGZsb2F0IGZvciAke3RoaXMuYXNzZXRJZH06ICR7ZS50b1N0cmluZygpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbUluZm8pIHtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGVSYW5rU2hpbmUodGhpcy5pdGVtSW5mbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbm5vdGF0ZVJhbmtTaGluZShpbmZvOiBJdGVtSW5mbykge1xuICAgICAgICBjb25zdCByYW5rID0gZ2V0TG93ZXN0UmFuayhpbmZvKTtcbiAgICAgICAgaWYgKCFyYW5rIHx8IHJhbmsgPiA1KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNYWtlIHRoZSBpbnZlbnRvcnkgYm94IGNvbG91cmVkIDspXG4gICAgICAgICRKKHRoaXMpLnBhcmVudCgpLmNzcygnY29sb3InLCAnYmxhY2snKTtcbiAgICAgICAgJEoodGhpcykucGFyZW50KCkuZmluZCgnaW1nJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZ2V0UmFua0NvbG91cihyYW5rKSk7XG4gICAgICAgICRKKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjc2Zsb2F0LXNoaW5lJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtjc3MsIGh0bWx9IGZyb20gJ2xpdCc7XG5pbXBvcnQge2NsYXNzTWFwfSBmcm9tICdsaXQtaHRtbC9kaXJlY3RpdmVzL2NsYXNzLW1hcC5qcyc7XG5cbmltcG9ydCB7cHJvcGVydHl9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcbmltcG9ydCB7Q3VzdG9tRWxlbWVudH0gZnJvbSAnLi4vLi4vaW5qZWN0b3JzJztcbmltcG9ydCB7RmxvYXRFbGVtZW50fSBmcm9tICcuLi8uLi9jdXN0b20nO1xuXG5lbnVtIEJ1dHRvblR5cGUge1xuICAgIEdyZWVuV2hpdGUgPSAnZ3JlZW5fd2hpdGUnLFxuICAgIEdyZXlXaGl0ZSA9ICdncmV5X3doaXRlJyxcbn1cblxuQEN1c3RvbUVsZW1lbnQoKVxuZXhwb3J0IGNsYXNzIFN0ZWFtQnV0dG9uIGV4dGVuZHMgRmxvYXRFbGVtZW50IHtcbiAgICBAcHJvcGVydHkoe3R5cGU6IFN0cmluZ30pXG4gICAgcHJpdmF0ZSB0ZXh0OiBzdHJpbmcgPSAnJztcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTogU3RyaW5nfSlcbiAgICBwcml2YXRlIHR5cGU6IEJ1dHRvblR5cGUgPSBCdXR0b25UeXBlLkdyZWVuV2hpdGU7XG5cbiAgICBzdGF0aWMgc3R5bGVzID0gW1xuICAgICAgICAuLi5GbG9hdEVsZW1lbnQuc3R5bGVzLFxuICAgICAgICBjc3NgXG4gICAgICAgICAgICAuYnRuX2dyZWVuX3doaXRlX2lubmVyZmFkZSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxcHg7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2QyZTg4NSAhaW1wb3J0YW50O1xuXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2E0ZDAwNztcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNhNGQwMDcgNSUsICM1MzY5MDQgOTUlKTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjYTRkMDA3IDUlLCAjNTM2OTA0IDk1JSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5idG5fZ3JlZW5fd2hpdGVfaW5uZXJmYWRlID4gc3BhbiB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzc5OTkwNTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICM3OTk5MDUgNSUsICM1MzY5MDQgOTUlKTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjNzk5OTA1IDUlLCAjNTM2OTA0IDk1JSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5idG5fZ3JlZW5fd2hpdGVfaW5uZXJmYWRlOm5vdCguYnRuX2Rpc2FibGVkKTpub3QoOmRpc2FibGVkKTpub3QoLmJ0bl9hY3RpdmUpOm5vdCguYWN0aXZlKTpob3ZlciB7XG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcblxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNiNmQ5MDg7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjYjZkOTA4IDUlLCAjODBhMDA2IDk1JSk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgI2I2ZDkwOCA1JSwgIzgwYTAwNiA5NSUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuYnRuX2dyZWVuX3doaXRlX2lubmVyZmFkZTpub3QoLmJ0bl9kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCk6bm90KC5idG5fYWN0aXZlKTpub3QoLmFjdGl2ZSk6aG92ZXIgPiBzcGFuIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjYTFiZjA3O1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2ExYmYwNyA1JSwgIzgwYTAwNiA5NSUpO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNhMWJmMDcgNSUsICM4MGEwMDYgOTUlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmJ0bl9ncmV5X3doaXRlX2lubmVyZmFkZSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxcHg7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xuXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2FjYjViZDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNhY2I1YmQgNSUsICM0MTRhNTIgOTUlKTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjYWNiNWJkIDUlLCAjNDE0YTUyIDk1JSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5idG5fZ3JleV93aGl0ZV9pbm5lcmZhZGUgPiBzcGFuIHtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG5cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNzc4MDg4O1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgIzc3ODA4OCA1JSwgIzQxNGE1MiA5NSUpO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICM3NzgwODggNSUsICM0MTRhNTIgOTUlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmJ0bl9ncmV5X3doaXRlX2lubmVyZmFkZTpub3QoLmJ0bl9kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCk6bm90KC5idG5fYWN0aXZlKTpub3QoLmFjdGl2ZSk6aG92ZXIge1xuICAgICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG5cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjY2ZkOGUwO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2NmZDhlMCA1JSwgIzU2NWY2NyA5NSUpO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNjZmQ4ZTAgNSUsICM1NjVmNjcgOTUlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmJ0bl9ncmV5X3doaXRlX2lubmVyZmFkZTpub3QoLmJ0bl9kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCk6bm90KC5idG5fYWN0aXZlKTpub3QoLmFjdGl2ZSk6aG92ZXIgPiBzcGFuIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjOTlhMmFhO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgIzk5YTJhYSA1JSwgIzU2NWY2NyA5NSUpO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICM5OWEyYWEgNSUsICM1NjVmNjcgOTUlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmJ0bl9zbWFsbCA+IHNwYW4ge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgMTVweDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIGAsXG4gICAgXTtcblxuICAgIGFzeW5jIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIGJ0bkNsYXNzKCkge1xuICAgICAgICBjb25zdCByOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7YnRuX3NtYWxsOiB0cnVlfTtcbiAgICAgICAgcltgYnRuXyR7dGhpcy50eXBlfV9pbm5lcmZhZGVgXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBjbGFzc01hcChyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBodG1sYFxuICAgICAgICAgICAgPGEgY2xhc3M9XCIke3RoaXMuYnRuQ2xhc3MoKX1cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4ke3RoaXMudGV4dH08L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIGA7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtjc3MsIExpdEVsZW1lbnR9IGZyb20gJ2xpdCc7XG5cbmZ1bmN0aW9uIGNhbWVsVG9EYXNoQ2FzZShzdHI6IHN0cmluZykge1xuICAgIHJldHVybiBzdHJcbiAgICAgICAgLnNwbGl0KC8oPz1bQS1aXSkvKVxuICAgICAgICAuam9pbignLScpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xufVxuXG4vLyBMaXRFbGVtZW50IHdyYXBwZXIgd2l0aCBhIHByZS1kZXRlcm1pbmVkIHRhZ1xuZXhwb3J0IGNsYXNzIEZsb2F0RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICAgIHN0YXRpYyBzdHlsZXMgPSBbXG4gICAgICAgIGNzc2BcbiAgICAgICAgICAgIGhyIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWIyOTM5O1xuICAgICAgICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQgbm9uZSBub25lO1xuICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogYmxhY2s7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHggMCAwO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMnB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ViZWJlYjtcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0W3R5cGU9J3RleHQnXSxcbiAgICAgICAgICAgIGlucHV0W3R5cGU9J3Bhc3N3b3JkJ10sXG4gICAgICAgICAgICBpbnB1dFt0eXBlPSdudW1iZXInXSxcbiAgICAgICAgICAgIHNlbGVjdCB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICM5MDkwOTA7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbnB1dFt0eXBlPSdjb2xvciddIHtcbiAgICAgICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgICAgICAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5wdXRbdHlwZT0nY29sb3InXTo6LXdlYmtpdC1jb2xvci1zd2F0Y2gtd3JhcHBlciB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5wdXRbdHlwZT0nY29sb3InXTo6LXdlYmtpdC1jb2xvci1zd2F0Y2gge1xuICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYCxcbiAgICBdO1xuXG4gICAgc3RhdGljIHRhZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYGNzZmxvYXQtJHtjYW1lbFRvRGFzaENhc2UodGhpcy5uYW1lKX1gO1xuICAgIH1cblxuICAgIHN0YXRpYyBlbGVtKCk6IGFueSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnKCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Y3VzdG9tRWxlbWVudH0gZnJvbSAnbGl0L2RlY29yYXRvcnMuanMnO1xuaW1wb3J0IHtGbG9hdEVsZW1lbnR9IGZyb20gJy4vY3VzdG9tJztcbmltcG9ydCB7aW5QYWdlQ29udGV4dH0gZnJvbSAnLi4vdXRpbHMvc25pcHMnO1xuXG5leHBvcnQgZW51bSBJbmplY3Rpb25Nb2RlIHtcbiAgICAvLyBJbmplY3RzIG9uY2UgYXQgcGFnZSBsb2FkIGZvciBlbGVtZW50cyBtYXRjaGluZyB0aGUgc2VsZWN0b3JcbiAgICBPTkNFLFxuICAgIC8vIENvbnRpbnVhbGx5IGluamVjdHMgd2hlbmV2ZXIgbmV3IGVsZW1lbnRzIHRoYXQgbWF0Y2ggdGhlXG4gICAgLy8gc2VsZWN0b3IgZXhpc3QgdGhhdCBoYXZlbid0IGJlZW4gaW5qZWN0ZWQgaW50byB5ZXRcbiAgICAvL1xuICAgIC8vIFNob3VsZCBiZSB1c2UgZm9yIFwiZHluYW1pY1wiIGVsZW1lbnRzXG4gICAgQ09OVElOVU9VUyxcbn1cblxuZW51bSBJbmplY3Rpb25UeXBlIHtcbiAgICBBcHBlbmQsXG4gICAgQmVmb3JlLFxuICAgIEFmdGVyLFxufVxuXG5pbnRlcmZhY2UgSW5qZWN0aW9uQ29uZmlnIHtcbiAgICBleGlzdHM6IChjdHg6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHNlbGVjdG9yOiBzdHJpbmcpID0+IGJvb2xlYW47XG4gICAgb3A6IChjdHg6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHRhcmdldDogdHlwZW9mIEZsb2F0RWxlbWVudCkgPT4gdm9pZDtcbn1cblxuY29uc3QgSW5qZWN0aW9uQ29uZmlnczoge1trZXkgaW4gSW5qZWN0aW9uVHlwZV06IEluamVjdGlvbkNvbmZpZ30gPSB7XG4gICAgW0luamVjdGlvblR5cGUuQXBwZW5kXToge1xuICAgICAgICBleGlzdHM6IChjdHgsIHNlbGVjdG9yKSA9PiAhIWN0eC5jaGlsZHJlbihzZWxlY3RvcikubGVuZ3RoLFxuICAgICAgICBvcDogKGN0eCwgdGFyZ2V0KSA9PiBjdHguYXBwZW5kKHRhcmdldC5lbGVtKCkpLFxuICAgIH0sXG4gICAgW0luamVjdGlvblR5cGUuQmVmb3JlXToge1xuICAgICAgICBleGlzdHM6IChjdHgsIHNlbGVjdG9yKSA9PiAhIWN0eC5wYXJlbnQoKS5jaGlsZHJlbihzZWxlY3RvcikubGVuZ3RoLFxuICAgICAgICBvcDogKGN0eCwgdGFyZ2V0KSA9PiBjdHguYmVmb3JlKHRhcmdldC5lbGVtKCkpLFxuICAgIH0sXG4gICAgW0luamVjdGlvblR5cGUuQWZ0ZXJdOiB7XG4gICAgICAgIGV4aXN0czogKGN0eCwgc2VsZWN0b3IpID0+ICEhY3R4LnBhcmVudCgpLmNoaWxkcmVuKHNlbGVjdG9yKS5sZW5ndGgsXG4gICAgICAgIG9wOiAoY3R4LCB0YXJnZXQpID0+IGN0eC5hZnRlcih0YXJnZXQuZWxlbSgpKSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIEN1c3RvbUVsZW1lbnQoKTogYW55IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldDogdHlwZW9mIEZsb2F0RWxlbWVudCwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgICAgIGlmICghaW5QYWdlQ29udGV4dCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VzdG9tRWxlbWVudHMuZ2V0KHRhcmdldC50YWcoKSkpIHtcbiAgICAgICAgICAgIC8vIEFscmVhZHkgZGVmaW5lZFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VzdG9tRWxlbWVudCh0YXJnZXQudGFnKCkpKHRhcmdldCk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gSW5qZWN0KHNlbGVjdG9yOiBzdHJpbmcsIG1vZGU6IEluamVjdGlvbk1vZGUsIHR5cGU6IEluamVjdGlvblR5cGUpOiBhbnkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiB0eXBlb2YgRmxvYXRFbGVtZW50LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICAgICAgaWYgKCFpblBhZ2VDb250ZXh0KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgSW5qZWN0aW9uTW9kZS5PTkNFOlxuICAgICAgICAgICAgICAgICRKKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgSW5qZWN0aW9uQ29uZmlnc1t0eXBlXS5vcCgkSih0aGlzKSwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgSW5qZWN0aW9uTW9kZS5DT05USU5VT1VTOlxuICAgICAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJEooc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgYWRkIHRoZSBpdGVtIGFnYWluIGlmIHdlIGFscmVhZHkgaGF2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEluamVjdGlvbkNvbmZpZ3NbdHlwZV0uZXhpc3RzKCRKKHRoaXMpLCB0YXJnZXQudGFnKCkpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEluamVjdGlvbkNvbmZpZ3NbdHlwZV0ub3AoJEoodGhpcyksIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIDI1MCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW5qZWN0QXBwZW5kKHNlbGVjdG9yOiBzdHJpbmcsIG1vZGU6IEluamVjdGlvbk1vZGUgPSBJbmplY3Rpb25Nb2RlLk9OQ0UpOiBhbnkge1xuICAgIHJldHVybiBJbmplY3Qoc2VsZWN0b3IsIG1vZGUsIEluamVjdGlvblR5cGUuQXBwZW5kKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEluamVjdEJlZm9yZShzZWxlY3Rvcjogc3RyaW5nLCBtb2RlOiBJbmplY3Rpb25Nb2RlID0gSW5qZWN0aW9uTW9kZS5PTkNFKTogYW55IHtcbiAgICByZXR1cm4gSW5qZWN0KHNlbGVjdG9yLCBtb2RlLCBJbmplY3Rpb25UeXBlLkJlZm9yZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmplY3RBZnRlcihzZWxlY3Rvcjogc3RyaW5nLCBtb2RlOiBJbmplY3Rpb25Nb2RlID0gSW5qZWN0aW9uTW9kZS5PTkNFKTogYW55IHtcbiAgICByZXR1cm4gSW5qZWN0KHNlbGVjdG9yLCBtb2RlLCBJbmplY3Rpb25UeXBlLkFmdGVyKTtcbn1cbiIsImltcG9ydCB7RmxvYXRFbGVtZW50fSBmcm9tICcuLi9jdXN0b20nO1xuaW1wb3J0IHtDdXN0b21FbGVtZW50LCBJbmplY3RCZWZvcmV9IGZyb20gJy4uL2luamVjdG9ycyc7XG5pbXBvcnQge2NzcywgaHRtbCwgSFRNTFRlbXBsYXRlUmVzdWx0fSBmcm9tICdsaXQnO1xuaW1wb3J0IHtDbGllbnRTZW5kfSBmcm9tICcuLi8uLi9icmlkZ2UvY2xpZW50JztcbmltcG9ydCB7RmV0Y2hQZW5kaW5nVHJhZGVzLCBGZXRjaFBlbmRpbmdUcmFkZXNSZXNwb25zZX0gZnJvbSAnLi4vLi4vYnJpZGdlL2hhbmRsZXJzL2ZldGNoX3BlbmRpbmdfdHJhZGVzJztcbmltcG9ydCB7SXRlbSwgVHJhZGUsIFRyYWRlU3RhdGV9IGZyb20gJy4uLy4uL3R5cGVzL2Zsb2F0X21hcmtldCc7XG5pbXBvcnQge3N0YXRlfSBmcm9tICdsaXQvZGVjb3JhdG9ycy5qcyc7XG5pbXBvcnQge09ic2VydmV9IGZyb20gJy4uLy4uL3V0aWxzL29ic2VydmVycyc7XG5cbmltcG9ydCAnLi4vY29tbW9uL3VpL3N0ZWFtLWJ1dHRvbic7XG5pbXBvcnQge0FwcElkLCBDb250ZXh0SWR9IGZyb20gJy4uLy4uL3R5cGVzL3N0ZWFtX2NvbnN0YW50cyc7XG5cbkBDdXN0b21FbGVtZW50KClcbkBJbmplY3RCZWZvcmUoJ2Rpdi50cmFkZV9hcmVhJylcbmV4cG9ydCBjbGFzcyBBdXRvRmlsbCBleHRlbmRzIEZsb2F0RWxlbWVudCB7XG4gICAgQHN0YXRlKClcbiAgICBwcml2YXRlIHBlbmRpbmdUcmFkZXNSZXNwb25zZTogRmV0Y2hQZW5kaW5nVHJhZGVzUmVzcG9uc2UgfCB1bmRlZmluZWQ7XG5cbiAgICBzdGF0aWMgc3R5bGVzID0gW1xuICAgICAgICAuLi5GbG9hdEVsZW1lbnQuc3R5bGVzLFxuICAgICAgICBjc3NgXG4gICAgICAgICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMTVweDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNDgsIDQ4LCA0OCk7XG4gICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5jb250YWluZXIud2FybmluZyB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE3OSwgMCwgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5mbG9hdC1pY29uIHtcbiAgICAgICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLml0ZW0tbmFtZSB7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNXB4O1xuICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzMnB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuc2FsZS1pbmZvIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDQ1cHg7XG4gICAgICAgICAgICAgICAgY29sb3I6IGRhcmtncmV5O1xuICAgICAgICAgICAgfVxuICAgICAgICBgLFxuICAgIF07XG5cbiAgICBhc3luYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nVHJhZGVzUmVzcG9uc2UgPSBhd2FpdCBDbGllbnRTZW5kKEZldGNoUGVuZGluZ1RyYWRlcywge30pO1xuICAgICAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgJ2ZhaWxlZCB0byBmZXRjaCBwZW5kaW5nIHRyYWRlcyBvbiBDU0Zsb2F0IE1hcmtldCwgdGhleSBhcmUgbGlrZWx5IG5vdCBsb2dnZWQgaW4uJyxcbiAgICAgICAgICAgICAgICBlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBPYnNlcnZlKFxuICAgICAgICAgICAgKCkgPT4gZ19yZ0N1cnJlbnRUcmFkZVN0YXR1cy5tZS5hc3NldHMubGVuZ3RoLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEl0ZW1zIHRoZXkgYXJlIGdpdmluZyBjaGFuZ2VkLCB3ZSBjYW4gcG90ZW50aWFsbHkgaGlkZS9zaG93IGFuIGF1dG8tZmlsbCBkaWFsb2dcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJBdXRvRmlsbERpYWxvZyh0cmFkZTogVHJhZGUpOiBIVE1MVGVtcGxhdGVSZXN1bHQge1xuICAgICAgICBpZiAodHJhZGUuc3RhdGUgIT09IFRyYWRlU3RhdGUuUEVORElORykge1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZXkgYWNjZXB0ZWQgdGhlIHNhbGUgb24gQ1NGbG9hdCBmaXJzdFxuICAgICAgICAgICAgcmV0dXJuIGh0bWxgYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0cmFkZS5jb250cmFjdC5pdGVtO1xuXG4gICAgICAgIGlmIChnX3JnQ3VycmVudFRyYWRlU3RhdHVzLm1lLmFzc2V0cy5maW5kKChhKSA9PiBhLmFzc2V0aWQgPT09IGl0ZW0uYXNzZXRfaWQpKSB7XG4gICAgICAgICAgICAvLyBJdGVtIGlzIGFscmVhZHkgaW5jbHVkZWQgaW4gdGhlIHRyYWRlIG9mZmVyXG4gICAgICAgICAgICByZXR1cm4gaHRtbGBgO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWxgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsb2F0LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL3N0ZWFtY2RuLWEuYWthbWFpaGQubmV0L3N0ZWFtY29tbXVuaXR5L3B1YmxpYy9pbWFnZXMvYXZhdGFycy83OS83OThhMTIzMTY2MzdhZDhmYmI5MWRkYjdkYzYzZjc3MGI2ODBiZDE5X2Z1bGwuanBnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImhlaWdodDogMzJweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+ICR7aXRlbS5tYXJrZXRfaGFzaF9uYW1lfSA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICR7dGhpcy5nZXRTYWxlSW5mbyhpdGVtKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Y3NmbG9hdC1zdGVhbS1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgLnRleHQ9XCIkeydBdXRvLUZpbGwnfVwiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIiR7KCkgPT4gdGhpcy5hdXRvRmlsbCh0cmFkZSl9XCJcbiAgICAgICAgICAgICAgICA+PC9jc2Zsb2F0LXN0ZWFtLWJ1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH1cblxuICAgIHJlbmRlckJ1bGtBdXRvRmlsbERpYWxvZyhyYXdUcmFkZXM6IFRyYWRlW10pOiBIVE1MVGVtcGxhdGVSZXN1bHQge1xuICAgICAgICAvLyBSZW1vdmUgaXRlbXMgYWxyZWFkeSBpbmNsdWRlZCBhbmQgbm9uLXBlbmRpbmdcbiAgICAgICAgY29uc3QgZlRyYWRlcyA9IHJhd1RyYWRlc1xuICAgICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgICAgICAodHJhZGUpID0+ICFnX3JnQ3VycmVudFRyYWRlU3RhdHVzLm1lLmFzc2V0cy5maW5kKChhKSA9PiBhLmFzc2V0aWQgPT09IHRyYWRlLmNvbnRyYWN0Lml0ZW0uYXNzZXRfaWQpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZmlsdGVyKCh0cmFkZSkgPT4gdHJhZGUuc3RhdGUgPT09IFRyYWRlU3RhdGUuUEVORElORyk7XG5cbiAgICAgICAgLy8gQnVsayBpbXBsaWVzID4gMVxuICAgICAgICBpZiAoZlRyYWRlcy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxgYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRvdGFsVmFsdWUgPSBmVHJhZGVzLm1hcCgoZSkgPT4gZS5jb250cmFjdC5wcmljZSkucmVkdWNlKChhY2MsIGUpID0+IGFjYyArIGUsIDApO1xuXG4gICAgICAgIHJldHVybiBodG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPVwibWFyZ2luOiAyMHB4IDAgMjBweCAwO1wiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbG9hdC1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9zdGVhbWNkbi1hLmFrYW1haWhkLm5ldC9zdGVhbWNvbW11bml0eS9wdWJsaWMvaW1hZ2VzL2F2YXRhcnMvNzkvNzk4YTEyMzE2NjM3YWQ4ZmJiOTFkZGI3ZGM2M2Y3NzBiNjgwYmQxOV9mdWxsLmpwZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJoZWlnaHQ6IDMycHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPiBEZXRlY3RlZCAke2ZUcmFkZXMubGVuZ3RofSBTYWxlcyA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYWxlLWluZm9cIj5Ub3RhbCBWYWx1ZTogJCR7KHRvdGFsVmFsdWUgLyAxMDApLnRvRml4ZWQoMil9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGNzZmxvYXQtc3RlYW0tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0PVwiJHsnQXV0by1GaWxsIEFsbCBJdGVtcyd9XCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiJHsoKSA9PiB0aGlzLmF1dG9GaWxsQWxsKGZUcmFkZXMpfVwiXG4gICAgICAgICAgICAgICAgPjwvY3NmbG9hdC1zdGVhbS1idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBnZXRTYWxlSW5mbyhpdGVtOiBJdGVtKTogSFRNTFRlbXBsYXRlUmVzdWx0IHtcbiAgICAgICAgaWYgKGl0ZW0uZmxvYXRfdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBodG1sYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYWxlLWluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgRGV0ZWN0ZWQgU2FsZSAoRmxvYXQ6ICR7aXRlbS5mbG9hdF92YWx1ZS50b0ZpeGVkKDEyKX0sIFNlZWQ6ICR7aXRlbS5wYWludF9zZWVkfSlcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaHRtbGAgPGRpdiBjbGFzcz1cInNhbGUtaW5mb1wiPkRldGVjdGVkIFNhbGUgKEFzc2V0IElEOiAke2l0ZW0uYXNzZXRfaWR9KTwvZGl2PiBgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBhIHdhcm5pbmcgdG8gdXNlcnMgaWYgdHJhZGUgaW5jbHVkZXMgaXRlbSB3aXRoIGNzZmxvYXQgbm90ZSB0aGF0IGRvZXNuJ3QgbWF0Y2ggYW4gZXhpc3Rpbmcgc2FsZVxuICAgICAqXG4gICAgICogVHJpZXMgdG8gcHJldmVudCBzY2VuYXJpb3Mgd2hlcmUgbWFsaWNpb3VzIGFjdG9ycyBzZW5kIG9mZmVyIHdpdGggQ1NGbG9hdCB0ZXh0IHJlcXVlc3RpbmcgYW4gaXRlbVxuICAgICAqL1xuICAgIHNob3dXYXJuaW5nRGlhbG9nKCk6IEhUTUxUZW1wbGF0ZVJlc3VsdCB7XG4gICAgICAgIGlmICghdGhpcy5oYXNBdXRvRmlsbFRleHQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxgYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhhc0l0ZW1XaXRoTm9TYWxlID0gZ19yZ0N1cnJlbnRUcmFkZVN0YXR1cy5tZS5hc3NldHMuZmluZChcbiAgICAgICAgICAgIChhKSA9PiAhdGhpcy5wZW5kaW5nVHJhZGVzUmVzcG9uc2U/LnRyYWRlc190b19zZW5kLmZpbmQoKGIpID0+IGIuY29udHJhY3QuaXRlbS5hc3NldF9pZCA9PT0gYS5hc3NldGlkKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghaGFzSXRlbVdpdGhOb1NhbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBodG1sYGA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHRtbGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgd2FybmluZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbG9hdC1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9zdGVhbWNkbi1hLmFrYW1haWhkLm5ldC9zdGVhbWNvbW11bml0eS9wdWJsaWMvaW1hZ2VzL2F2YXRhcnMvNzkvNzk4YTEyMzE2NjM3YWQ4ZmJiOTFkZGI3ZGM2M2Y3NzBiNjgwYmQxOV9mdWxsLmpwZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJoZWlnaHQ6IDMycHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPiBXYXJuaW5nISA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYWxlLWluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNvbWUgb2YgdGhlIGl0ZW1zIGluIHRoZSBvZmZlciB3ZXJlIG5vdCBwdXJjaGFzZWQgZnJvbSB5b3Ugb24gQ1NGbG9hdCBNYXJrZXQgKG9yIHlvdSdyZSBsb2dnZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGludG8gdGhlIHdyb25nIGFjY291bnQpXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbmRlcigpOiBIVE1MVGVtcGxhdGVSZXN1bHQge1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ1RyYWRlc1Jlc3BvbnNlKSByZXR1cm4gaHRtbGBgO1xuXG4gICAgICAgIGNvbnN0IHRyYWRlc1RvQnV5ZXIgPSB0aGlzLnBlbmRpbmdUcmFkZXNSZXNwb25zZS50cmFkZXNfdG9fc2VuZC5maWx0ZXIoXG4gICAgICAgICAgICAoZSkgPT4gZS5idXllcl9pZCA9PT0gVXNlclRoZW0/LnN0clN0ZWFtSWRcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gaHRtbGBcbiAgICAgICAgICAgICR7dGhpcy5yZW5kZXJCdWxrQXV0b0ZpbGxEaWFsb2codHJhZGVzVG9CdXllcil9ICR7dHJhZGVzVG9CdXllci5tYXAoKGUpID0+IHRoaXMucmVuZGVyQXV0b0ZpbGxEaWFsb2coZSkpfVxuICAgICAgICAgICAgJHt0aGlzLnNob3dXYXJuaW5nRGlhbG9nKCl9XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgYXV0b0ZpbGxBbGwodHJhZGVzOiBUcmFkZVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgdHJhZGUgb2YgdHJhZGVzKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9GaWxsKHRyYWRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF1dG9GaWxsKHRyYWRlOiBUcmFkZSkge1xuICAgICAgICAkSignI2ludmVudG9yeV9zZWxlY3RfeW91cl9pbnZlbnRvcnknKS5jbGljaygpO1xuICAgICAgICBjb25zdCBlbCA9IFVzZXJZb3U/LmZpbmRBc3NldChBcHBJZC5DU0dPLCBDb250ZXh0SWQuUFJJTUFSWSwgdHJhZGUuY29udHJhY3QuaXRlbS5hc3NldF9pZCk/LmVsZW1lbnQ7XG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2ZhaWxlZCB0byBmaW5kIGFzc2V0IGVsZW1lbnQgZm9yIGlkICcgKyB0cmFkZS5jb250cmFjdC5pdGVtLmFzc2V0X2lkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIE1vdmVJdGVtVG9UcmFkZShlbCk7XG5cbiAgICAgICAgY29uc3Qgbm90ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFkZV9vZmZlcl9ub3RlJyk7XG4gICAgICAgIGlmIChub3RlKSB7XG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgbm90ZSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50XG4gICAgICAgICAgICApLnZhbHVlID0gYENTRmxvYXQgTWFya2V0IFRyYWRlIE9mZmVyICMke3RyYWRlLmlkfSBcXG5cXG5UaGFua3MgZm9yIHVzaW5nIENTRmxvYXQhYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0F1dG9GaWxsVGV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdHJhZGVNZXNzYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2luY2x1ZGVkX3RyYWRlX29mZmVyX25vdGVfY3RuJyk7XG4gICAgICAgIGlmICh0cmFkZU1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNhbml0aXplZCA9ICh0cmFkZU1lc3NhZ2VzWzBdIGFzIEhUTUxFbGVtZW50KS5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoLyAvZywgJycpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgc2FuaXRpemVkLmluY2x1ZGVzKCdjc2dvZmxvYXQnKSB8fCBzYW5pdGl6ZWQuaW5jbHVkZXMoJ2Zsb2F0bWFya2V0JykgfHwgc2FuaXRpemVkLmluY2x1ZGVzKCdjc2Zsb2F0JylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDdXN0b21FbGVtZW50LCBJbmplY3RBcHBlbmQsIEluamVjdGlvbk1vZGV9IGZyb20gJy4uL2luamVjdG9ycyc7XG5pbXBvcnQge3JnQXNzZXQsIFVzZXJTb21lb25lfSBmcm9tICcuLi8uLi90eXBlcy9zdGVhbSc7XG5pbXBvcnQge0l0ZW1Ib2xkZXJNZXRhZGF0YX0gZnJvbSAnLi4vY29tbW9uL2l0ZW1faG9sZGVyX21ldGFkYXRhJztcbmltcG9ydCB7QXBwSWQsIENvbnRleHRJZH0gZnJvbSAnLi4vLi4vdHlwZXMvc3RlYW1fY29uc3RhbnRzJztcblxuLy8gQW5ub3RhdGVzIGl0ZW0gaW5mbyAoZmxvYXQsIHNlZWQsIGV0Yy4uLikgaW4gYm94ZXMgb24gdGhlIFRyYWRlIE9mZmVyIFBhZ2VcbkBDdXN0b21FbGVtZW50KClcbi8vIEl0ZW1zIHdoZW4gYnJvd3NpbmcgdGhlaXIveW91ciBpbnZlbnRvcnlcbkBJbmplY3RBcHBlbmQoJ2Rpdi5pbnZlbnRvcnlfcGFnZTpub3QoW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0pIC5pdGVtSG9sZGVyIGRpdi5hcHA3MzAnLCBJbmplY3Rpb25Nb2RlLkNPTlRJTlVPVVMpXG4vLyBJdGVtcyBzZWxlY3RlZCB3aXRoaW4gdGhlIHRyYWRlIG9mZmVyXG5ASW5qZWN0QXBwZW5kKCcudHJhZGVfb2ZmZXIgLml0ZW1Ib2xkZXIgZGl2LmFwcDczMCcsIEluamVjdGlvbk1vZGUuQ09OVElOVU9VUylcbmV4cG9ydCBjbGFzcyBUcmFkZUl0ZW1Ib2xkZXJNZXRhZGF0YSBleHRlbmRzIEl0ZW1Ib2xkZXJNZXRhZGF0YSB7XG4gICAgZ2V0IG93bmluZ1VzZXIoKTogVXNlclNvbWVvbmUgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMuYXNzZXRJZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChVc2VyVGhlbSAmJiBUcmFkZUl0ZW1Ib2xkZXJNZXRhZGF0YS5nZXRBc3NldEZyb21Vc2VyKFVzZXJUaGVtLCB0aGlzLmFzc2V0SWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gVXNlclRoZW07XG4gICAgICAgIH0gZWxzZSBpZiAoVXNlcllvdSAmJiBUcmFkZUl0ZW1Ib2xkZXJNZXRhZGF0YS5nZXRBc3NldEZyb21Vc2VyKFVzZXJZb3UsIHRoaXMuYXNzZXRJZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBVc2VyWW91O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG93bmVyU3RlYW1JZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMuYXNzZXRJZCkgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm93bmluZ1VzZXI/LnN0clN0ZWFtSWQ7XG4gICAgfVxuXG4gICAgZ2V0IGFzc2V0KCk6IHJnQXNzZXQgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMuYXNzZXRJZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghdGhpcy5vd25pbmdVc2VyKSByZXR1cm47XG5cbiAgICAgICAgcmV0dXJuIFRyYWRlSXRlbUhvbGRlck1ldGFkYXRhLmdldEFzc2V0RnJvbVVzZXIodGhpcy5vd25pbmdVc2VyLCB0aGlzLmFzc2V0SWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldEFzc2V0RnJvbVVzZXIodXNlcjogVXNlclNvbWVvbmUsIGFzc2V0SWQ6IHN0cmluZyk6IHJnQXNzZXQgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodXNlci5yZ0NvbnRleHRzW0FwcElkLkNTR09dW0NvbnRleHRJZC5QUklNQVJZXS5pbnZlbnRvcnk/LnJnSW52ZW50b3J5W2Fzc2V0SWRdKSB7XG4gICAgICAgICAgICBjb25zdCBpbnZlbnRvcnkgPSB1c2VyLnJnQ29udGV4dHNbQXBwSWQuQ1NHT11bQ29udGV4dElkLlBSSU1BUlldLmludmVudG9yeTtcbiAgICAgICAgICAgIHJldHVybiBpbnZlbnRvcnk/LnJnSW52ZW50b3J5W2Fzc2V0SWRdO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFeGVjdXRlU2NyaXB0T25QYWdlfSBmcm9tICcuLi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9zY3JpcHQnO1xuaW1wb3J0IHtDbGllbnRTZW5kfSBmcm9tICcuLi9icmlkZ2UvY2xpZW50JztcbmltcG9ydCB7aW5QYWdlQ29udGV4dH0gZnJvbSAnLi4vdXRpbHMvc25pcHMnO1xuaW1wb3J0IHtFeGVjdXRlQ3NzT25QYWdlfSBmcm9tICcuLi9icmlkZ2UvaGFuZGxlcnMvZXhlY3V0ZV9jc3MnO1xuaW1wb3J0IHtGZXRjaEV4dGVuc2lvbkZpbGV9IGZyb20gJy4uL2JyaWRnZS9oYW5kbGVycy9mZXRjaF9leHRlbnNpb25fZmlsZSc7XG5pbXBvcnQge2lzRmlyZWZveH0gZnJvbSAnLi4vdXRpbHMvZGV0ZWN0JztcbmltcG9ydCB7Z19Qb3N0TWVzc2FnZUJ1c30gZnJvbSAnLi4vYnVzL3Bvc3RfbWVzc2FnZV9idXMnO1xuXG5hc3luYyBmdW5jdGlvbiBpbml0aWF0ZUNocm9taXVtKHNjcmlwdFBhdGg6IHN0cmluZykge1xuICAgIENsaWVudFNlbmQoRXhlY3V0ZUNzc09uUGFnZSwge1xuICAgICAgICBwYXRoOiAnc3JjL2dsb2JhbC5jc3MnLFxuICAgIH0pO1xuXG4gICAgQ2xpZW50U2VuZChFeGVjdXRlU2NyaXB0T25QYWdlLCB7XG4gICAgICAgIHBhdGg6IHNjcmlwdFBhdGgsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYXRlRmlyZWZveChzY3JpcHRQYXRoOiBzdHJpbmcpIHtcbiAgICBnX1Bvc3RNZXNzYWdlQnVzLmhhbmRsZVJlcXVlc3RzKCk7XG5cbiAgICAvLyBXaHkgZG8gd2UgbmVlZCB0byB1c2UgbWFudWFsIERPTSBzY3JpcHQgaW5qZWN0aW9uIGFuZFxuICAgIC8vIGZldGNoIHRoZSB0ZXh0IG9mIHRoZSBzY3JpcHQ/XG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jc2Zsb2F0L2V4dGVuc2lvbi9pc3N1ZXMvMTU1I2lzc3VlY29tbWVudC0xNjM5NzgxOTE0XG5cbiAgICAvLyBXZSB3YW50IHRvIGluamVjdCB0aGUgSUQgb2YgdGhlIGV4dGVuc2lvblxuICAgIGNvbnN0IGlkID0gYnJvd3Nlci5ydW50aW1lLmlkO1xuICAgIGNvbnN0IG1vZGVsVXJsID0gYnJvd3Nlci5ydW50aW1lLmdldFVSTCgnc3JjL21vZGVsX2ZyYW1lLmh0bWwnKTtcbiAgICBjb25zdCBlbnRyeVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIGVudHJ5U2NyaXB0LmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgXG4gICAgICAgIHdpbmRvdy5DU0ZMT0FUX0VYVEVOU0lPTl9JRCA9ICcke2lkfSc7XG4gICAgICAgIHdpbmRvdy5DU0ZMT0FUX01PREVMX0ZSQU1FX1VSTCA9ICcke21vZGVsVXJsfSc7XG4gICAgYClcbiAgICApO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW50cnlTY3JpcHQpO1xuXG4gICAgY29uc3Qgc2NyaXB0UmVzcCA9IGF3YWl0IENsaWVudFNlbmQoRmV0Y2hFeHRlbnNpb25GaWxlLCB7XG4gICAgICAgIHBhdGg6IHNjcmlwdFBhdGgsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2NyaXB0UmVzcC50ZXh0KSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gICAgY29uc3Qgc3R5bGVSZXNwID0gYXdhaXQgQ2xpZW50U2VuZChGZXRjaEV4dGVuc2lvbkZpbGUsIHtcbiAgICAgICAgcGF0aDogJ3NyYy9nbG9iYWwuY3NzJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHlsZVJlc3AudGV4dCkpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhZ2Ugc2NyaXB0LCBleGVjdXRpbmcgaXQgaW4gdGhlIHBhZ2UgY29udGV4dCBpZiBuZWNlc3NhcnlcbiAqXG4gKiBAcGFyYW0gc2NyaXB0UGF0aCBSZWxhdGl2ZSBwYXRoIG9mIHRoZSBzY3JpcHQgKGFsd2F5cyBpbiAuanMpXG4gKiBAcGFyYW0gaWZQYWdlIEZuIHRvIHJ1biBpZiB3ZSBhcmUgaW4gdGhlIHBhZ2UncyBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdChzY3JpcHRQYXRoOiBzdHJpbmcsIGlmUGFnZTogKCkgPT4gYW55KSB7XG4gICAgLy8gRG9uJ3QgYWxsb3cgdGhlIHBhZ2Ugc2NyaXB0IHRvIHJ1biB0aGlzLlxuICAgIGlmIChpblBhZ2VDb250ZXh0KCkpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBTZXQgZ2xvYmFsIGlkZW50aWZpZXIgZm9yIG90aGVyIGV4dGVuc2lvbnMgdG8gdXNlXG4gICAgICAgIHdpbmRvdy5jc2Zsb2F0ID0gdHJ1ZTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBEZXByZWNhdGVkIG5hbWVcbiAgICAgICAgd2luZG93LmNzZ29mbG9hdCA9IHRydWU7XG5cbiAgICAgICAgaWZQYWdlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNGaXJlZm94KCkpIHtcbiAgICAgICAgYXdhaXQgaW5pdGlhdGVGaXJlZm94KHNjcmlwdFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGluaXRpYXRlQ2hyb21pdW0oc2NyaXB0UGF0aCk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYyBDU0Zsb2F0IE1hcmtldCBDaGVja2VyICh2JHtjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLnZlcnNpb259KSBieSBTdGVwNzc1MCBgLFxuICAgICAgICAnYmFja2dyb3VuZDogIzAwNDU5NDsgY29sb3I6ICNmZmY7J1xuICAgICk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAgICclYyBDaGFuZ2Vsb2cgY2FuIGJlIGZvdW5kIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9jc2Zsb2F0L2V4dGVuc2lvbiAnLFxuICAgICAgICAnYmFja2dyb3VuZDogIzAwNDU5NDsgY29sb3I6ICNmZmY7J1xuICAgICk7XG59XG4iLCJpbXBvcnQge0pvYiwgU2ltcGxlQ2FjaGVkUXVldWV9IGZyb20gJy4uL3V0aWxzL3F1ZXVlJztcbmltcG9ydCB7Q2xpZW50U2VuZH0gZnJvbSAnLi4vYnJpZGdlL2NsaWVudCc7XG5pbXBvcnQge0ZldGNoSW5zcGVjdEluZm8sIEZldGNoSW5zcGVjdEluZm9SZXF1ZXN0LCBJdGVtSW5mb30gZnJvbSAnLi4vYnJpZGdlL2hhbmRsZXJzL2ZldGNoX2luc3BlY3RfaW5mbyc7XG5cbmNsYXNzIEluc3BlY3RKb2IgZXh0ZW5kcyBKb2I8RmV0Y2hJbnNwZWN0SW5mb1JlcXVlc3Q+IHtcbiAgICBoYXNoQ29kZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxpbms7XG4gICAgfVxufVxuXG5jbGFzcyBGbG9hdEZldGNoZXIgZXh0ZW5kcyBTaW1wbGVDYWNoZWRRdWV1ZTxGZXRjaEluc3BlY3RJbmZvUmVxdWVzdCwgSXRlbUluZm8+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqIGFsbG93IHVwIHRvIDEwIHNpbXVsdGFuZW91cyBmbG9hdCBmZXRjaCByZXFzICovXG4gICAgICAgIHN1cGVyKDEwKTtcbiAgICB9XG5cbiAgICBmZXRjaChyZXE6IEZldGNoSW5zcGVjdEluZm9SZXF1ZXN0KTogUHJvbWlzZTxJdGVtSW5mbz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQobmV3IEluc3BlY3RKb2IocmVxKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHByb2Nlc3MocmVxOiBGZXRjaEluc3BlY3RJbmZvUmVxdWVzdCk6IFByb21pc2U8SXRlbUluZm8+IHtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IENsaWVudFNlbmQoRmV0Y2hJbnNwZWN0SW5mbywgcmVxKTtcbiAgICAgICAgcmV0dXJuIHJlc3AuaXRlbWluZm87XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZ0Zsb2F0RmV0Y2hlciA9IG5ldyBGbG9hdEZldGNoZXIoKTtcbiIsIi8qKlxuICogVHlwZXMgcmVsYXRlZCB0byBDU0Zsb2F0IE1hcmtldFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlbSB7XG4gICAgYXNzZXRfaWQ6IHN0cmluZztcbiAgICBkX3BhcmFtOiBzdHJpbmc7XG4gICAgZGVmX2luZGV4OiBudW1iZXI7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBmbG9hdF92YWx1ZTogbnVtYmVyO1xuICAgIGhhc19zY3JlZW5zaG90OiBib29sZWFuO1xuICAgIGhpZ2hfcmFuazogbnVtYmVyO1xuICAgIGljb25fdXJsOiBzdHJpbmc7XG4gICAgaW5zcGVjdF9saW5rOiBzdHJpbmc7XG4gICAgaXNfc291dmVuaXI6IGZhbHNlO1xuICAgIGlzX3N0YXR0cmFrOiBmYWxzZTtcbiAgICBpdGVtX25hbWU6IHN0cmluZztcbiAgICBsb3dfcmFuazogbnVtYmVyO1xuICAgIG1hcmtldF9oYXNoX25hbWU6IHN0cmluZztcbiAgICBwYWludF9pbmRleDogbnVtYmVyO1xuICAgIHBhaW50X3NlZWQ6IG51bWJlcjtcbiAgICBwaGFzZT86IHN0cmluZztcbiAgICBxdWFsaXR5OiBudW1iZXI7XG4gICAgcmFyaXR5OiBudW1iZXI7XG4gICAgd2Vhcl9uYW1lOiBzdHJpbmc7XG4gICAgc2NtPzoge1xuICAgICAgICBwcmljZT86IG51bWJlcjtcbiAgICAgICAgdm9sdW1lPzogbnVtYmVyO1xuICAgIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XG4gICAgYXZhdGFyOiBzdHJpbmc7XG4gICAgZmxhZ3M6IG51bWJlcjtcbiAgICBvbmxpbmU6IGJvb2xlYW47XG4gICAgc3RhbGxfcHVibGljOiBib29sZWFuO1xuICAgIHN0YXRpc3RpY3M6IHtcbiAgICAgICAgbWVkaWFuX3RyYWRlX3RpbWU6IG51bWJlcjtcbiAgICAgICAgdG90YWxfYXZvaWRlZF90cmFkZXM6IG51bWJlcjtcbiAgICAgICAgdG90YWxfZmFpbGVkX3RyYWRlczogbnVtYmVyO1xuICAgICAgICB0b3RhbF90cmFkZXM6IG51bWJlcjtcbiAgICAgICAgdG90YWxfdmVyaWZpZWRfdHJhZGVzOiBudW1iZXI7XG4gICAgfTtcbiAgICBzdGVhbV9pZDogc3RyaW5nO1xuICAgIHVzZXJuYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIENvbnRyYWN0U3RhdGUge1xuICAgIFNPTEQgPSAnc29sZCcsXG4gICAgTElTVEVEID0gJ2xpc3RlZCcsXG4gICAgREVMSVNURUQgPSAnZGVsaXN0ZWQnLFxuICAgIFJFRlVOREVEID0gJ3JlZnVuZGVkJyxcbn1cblxuZXhwb3J0IGVudW0gQ29udHJhY3RUeXBlIHtcbiAgICBCVVlfTk9XID0gJ2J1eV9ub3cnLFxuICAgIEFVQ1RJT04gPSAnYXVjdGlvbicsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJhY3Qge1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIGlzX3NlbGxlcjogYm9vbGVhbjtcbiAgICBpc193YXRjaGxpc3RlZDogYm9vbGVhbjtcbiAgICBpdGVtOiBJdGVtO1xuICAgIG1heF9vZmZlcl9kaXNjb3VudD86IG51bWJlcjtcbiAgICBtaW5fb2ZmZXJfcHJpY2U/OiBudW1iZXI7XG4gICAgcHJpY2U6IG51bWJlcjtcbiAgICBzZWxsZXI6IFVzZXI7XG4gICAgc3RhdGU6IENvbnRyYWN0U3RhdGU7XG4gICAgdHlwZTogQ29udHJhY3RUeXBlO1xuICAgIHdhdGNoZXJzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIFRyYWRlU3RhdGUge1xuICAgIFFVRVVFRCA9ICdxdWV1ZWQnLFxuICAgIFBFTkRJTkcgPSAncGVuZGluZycsXG4gICAgVkVSSUZJRUQgPSAndmVyaWZpZWQnLFxuICAgIEZBSUxFRCA9ICdmYWlsZWQnLFxuICAgIENBTkNFTExFRCA9ICdjYW5jZWxsZWQnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWRlIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGFjY2VwdGVkX2F0Pzogc3RyaW5nO1xuICAgIGJ1eWVyOiBVc2VyO1xuICAgIGJ1eWVyX2lkOiBzdHJpbmc7XG4gICAgY29udHJhY3Q6IENvbnRyYWN0O1xuICAgIGNvbnRyYWN0X2lkOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICAgIGV4cGlyZXNfYXQ/OiBzdHJpbmc7XG4gICAgZ3JhY2VfcGVyaW9kX3N0YXJ0OiBzdHJpbmc7XG4gICAgbWFudWFsX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgICBtYW51YWxfdmVyaWZpY2F0aW9uX2F0Pzogc3RyaW5nO1xuICAgIHNlbGxlcl9pZDogc3RyaW5nO1xuICAgIHN0YXRlOiBUcmFkZVN0YXRlO1xuICAgIHRyYWRlX3VybDogc3RyaW5nO1xufVxuIiwiLy8gU2VlIGdfcmdDdXJyZW5jeURhdGFcbmV4cG9ydCBlbnVtIEN1cnJlbmN5IHtcbiAgICBVU0QgPSAyMDAxLFxufVxuXG5leHBvcnQgZW51bSBBcHBJZCB7XG4gICAgQ1NHTyA9IDczMCxcbn1cblxuZXhwb3J0IGVudW0gQ29udGV4dElkIHtcbiAgICBQUklNQVJZID0gMixcbn1cbiIsIi8qXG4gKiBGdW5jdGlvbnMgcmVsYXRlZCB0byB0aGUgYnJvd3NlciBwYWdlIChpZS4gcGFyc2luZyB0aGUgVVJMKVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWVyeVBhcmFtZXRlcihwYXJhbTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgcmV0dXJuIHVybC5zZWFyY2hQYXJhbXMuZ2V0KHBhcmFtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1F1ZXJ5UGFyYW1ldGVyKHBhcmFtOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFnZXRRdWVyeVBhcmFtZXRlcihwYXJhbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZUZvcm0oc2VyaWFsaXplZDogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoc2VyaWFsaXplZC5zbGljZSgwLCAxKSA9PT0gJz8nKSB7XG4gICAgICAgIHNlcmlhbGl6ZWQgPSBzZXJpYWxpemVkLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIGlmICghc2VyaWFsaXplZCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlcmlhbGl6ZWQuc3BsaXQoJyYnKS5yZWR1Y2UoKGFjYzogYW55LCBlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhaXIgPSBlLnNwbGl0KCc9Jyk7XG4gICAgICAgIGlmIChwYWlyLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH1cblxuICAgICAgICBhY2NbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIElDYWNoZTxUPiB7XG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogVCk6IHZvaWQ7XG4gICAgZ2V0KGtleTogc3RyaW5nKTogVCB8IHVuZGVmaW5lZDtcbiAgICBnZXRPclRocm93KGtleTogc3RyaW5nKTogVDtcbiAgICBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuO1xuICAgIHNpemUoKTogbnVtYmVyO1xufVxuXG4vKipcbiAqIFNpbXBsZSBHZW5lcmljIENhY2hlIHdpdGggc3RyaW5naWZpZWQga2V5c1xuICovXG5leHBvcnQgY2xhc3MgQ2FjaGU8VD4gaW1wbGVtZW50cyBJQ2FjaGU8VD4ge1xuICAgIHByaXZhdGUgY2FjaGVfOiB7W2tleTogc3RyaW5nXTogVH0gPSB7fTtcblxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IFQpIHtcbiAgICAgICAgdGhpcy5jYWNoZV9ba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldChrZXk6IHN0cmluZyk6IFQgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZV9ba2V5XTtcbiAgICB9XG5cbiAgICBnZXRPclRocm93KGtleTogc3RyaW5nKTogVCB7XG4gICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBrZXkgJHtrZXl9IGRvZXMgbm90IGV4aXN0IGluIG1hcCBbZ2V0T3JUaHJvd11gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlX1trZXldO1xuICAgIH1cblxuICAgIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4ga2V5IGluIHRoaXMuY2FjaGVfO1xuICAgIH1cblxuICAgIHNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY2FjaGVfKS5sZW5ndGg7XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgVFRMV3JhcHBlcjxUPiB7XG4gICAgZGF0YTogVDtcbiAgICBleHBpcmVzRXBvY2g6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBFeHRlbnNpb24gb2Yge0BsaW5rIENhY2hlfSB0aGF0IGFsbG93cyBzZXR0aW5nIGEgVFRMICh0aW1lLXRvLWxpdmUpIG9uIGEga2V5XG4gKiBzdWNoIHRoYXQgYXV0b21hdGljYWxseSBleHBpcmVzIGFmdGVyIGEgc3BlY2lmaWVkIHRpbWUuXG4gKlxuICogQnkgZGVmYXVsdCwga2V5cyB3aWxsIGV4cGlyZSB3aXRoIHtAbGluayBkZWZhdWx0VFRMTXN9LlxuICovXG5leHBvcnQgY2xhc3MgVFRMQ2FjaGU8VD4gaW1wbGVtZW50cyBJQ2FjaGU8VD4ge1xuICAgIHByaXZhdGUgY2FjaGVfOiB7W2tleTogc3RyaW5nXTogVFRMV3JhcHBlcjxUPn0gPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVmYXVsdFRUTE1zOiBudW1iZXIpIHt9XG5cbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNhY2hlX1trZXldO1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBpdCBhbHNvIHJlc3BlY3RzIFRUTFxuICAgICAgICBpZiAodmFsdWUuZXhwaXJlc0Vwb2NoIDwgRGF0ZS5ub3coKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlLmRhdGE7XG4gICAgfVxuXG4gICAgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgZ2V0T3JUaHJvdyhrZXk6IHN0cmluZyk6IFQge1xuICAgICAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihga2V5ICR7a2V5fSBkb2VzIG5vdCBleGlzdCBpbiBtYXAgW2dldE9yVGhyb3ddYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoa2V5KSE7XG4gICAgfVxuXG4gICAgc2V0V2l0aFRUTChrZXk6IHN0cmluZywgdmFsdWU6IFQsIHR0bE1zOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jYWNoZV9ba2V5XSA9IHtcbiAgICAgICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICAgICAgZXhwaXJlc0Vwb2NoOiBEYXRlLm5vdygpICsgdHRsTXMsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogVCkge1xuICAgICAgICB0aGlzLnNldFdpdGhUVEwoa2V5LCB2YWx1ZSwgdGhpcy5kZWZhdWx0VFRMTXMpO1xuICAgIH1cblxuICAgIHNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY2FjaGVfKS5sZW5ndGg7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBTaW1pbGFyIHRvIGEgcHJvbWlzZSwgYnV0IGFsbG93cyB0aGUgYWJpbGl0eSB0byByZXNvbHZlL3JlamVjdCBpbiBhIGRpZmZlcmVudCBjb250ZXh0XG4gKiAqL1xuZXhwb3J0IGNsYXNzIERlZmVycmVkUHJvbWlzZTxUPiB7XG4gICAgcHJpdmF0ZSByZXNvbHZlXzogKCh2YWx1ZTogVCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSByZWplY3RfOiAoKHJlYXNvbjogc3RyaW5nKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHByb21pc2VfOiBQcm9taXNlPFQ+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJvbWlzZV8gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVfID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0XyA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzb2x2ZSh2YWx1ZTogVCkge1xuICAgICAgICB0aGlzLnJlc29sdmVfISh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVqZWN0KHJlYXNvbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucmVqZWN0XyEocmVhc29uKTtcbiAgICB9XG5cbiAgICBwcm9taXNlKCk6IFByb21pc2U8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlXztcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaXNGaXJlZm94KCkge1xuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpID4gLTE7XG59XG5cbi8qKlxuICogVGhhbmtzIHRvIG91ciBicm93c2VyIG92ZXJsb3Jkcywgd2UgaGF2ZSB0d28gbmFtZXNwYWNlcyBmb3IgYHgucnVudGltZS5mbigpYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcnVudGltZU5hbWVzcGFjZSgpIHtcbiAgICBpZiAoaXNGaXJlZm94KCkpIHtcbiAgICAgICAgcmV0dXJuIGJyb3dzZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNocm9tZTtcbiAgICB9XG59XG4iLCJjb25zdCBkb3BwbGVyUGhhc2VzOiB7W3BhaW50SW5kZXg6IG51bWJlcl06IHN0cmluZ30gPSB7XG4gICAgNDE4OiAnUGhhc2UgMScsXG4gICAgNDE5OiAnUGhhc2UgMicsXG4gICAgNDIwOiAnUGhhc2UgMycsXG4gICAgNDIxOiAnUGhhc2UgNCcsXG4gICAgNDE1OiAnUnVieScsXG4gICAgNDE2OiAnU2FwcGhpcmUnLFxuICAgIDQxNzogJ0JsYWNrIFBlYXJsJyxcbiAgICA1Njk6ICdQaGFzZSAxJyxcbiAgICA1NzA6ICdQaGFzZSAyJyxcbiAgICA1NzE6ICdQaGFzZSAzJyxcbiAgICA1NzI6ICdQaGFzZSA0JyxcbiAgICA1Njg6ICdFbWVyYWxkJyxcbiAgICA2MTg6ICdQaGFzZSAyJyxcbiAgICA2MTk6ICdTYXBwaGlyZScsXG4gICAgNjE3OiAnQmxhY2sgUGVhcmwnLFxuICAgIDg1MjogJ1BoYXNlIDEnLFxuICAgIDg1MzogJ1BoYXNlIDInLFxuICAgIDg1NDogJ1BoYXNlIDMnLFxuICAgIDg1NTogJ1BoYXNlIDQnLFxuICAgIDExMTk6ICdFbWVyYWxkJyxcbiAgICAxMTIwOiAnUGhhc2UgMScsXG4gICAgMTEyMTogJ1BoYXNlIDInLFxuICAgIDExMjI6ICdQaGFzZSAzJyxcbiAgICAxMTIzOiAnUGhhc2UgNCcsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzRG9wcGxlclBoYXNlKHBhaW50SW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiBwYWludEluZGV4IGluIGRvcHBsZXJQaGFzZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREb3BwbGVyUGhhc2UocGFpbnRJbmRleDogbnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gZG9wcGxlclBoYXNlc1twYWludEluZGV4XTtcbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgcmVnaXN0ZXJlZCBTdGVhbSBXZWIgQVBJIGtleSBmb3IgdGhlIHVzZXIsIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBJZiB0aGUga2V5IGNhbm5vdCBiZSBmb3VuZCwgdGhyb3dzIGFuIGVycm9yLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hSZWdpc3RlcmVkU3RlYW1BUElLZXkoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBwYWdlUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zdGVhbWNvbW11bml0eS5jb20vZGV2L2FwaWtleScpO1xuICAgIGNvbnN0IHBhZ2VUZXh0ID0gYXdhaXQgcGFnZVJlc3BvbnNlLnRleHQoKTtcblxuICAgIGNvbnN0IG1hdGNoID0gcGFnZVRleHQubWF0Y2goLzogKFswLTlBLVpdezMyfSlbXjAtOUEtWl0vKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcignZmFpbGVkIHRvIGZpbmQgcmVnaXN0ZXJlZCBBUEkga2V5Jyk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gT2JzZXJ2ZTxUPihjb21wdXRlT2JqZWN0OiAoKSA9PiBULCBjYjogKCkgPT4gYW55LCBwb2xsUmF0ZU1zID0gNTApIHtcbiAgICBsZXQgcHJldiA9IGNvbXB1dGVPYmplY3QoKTtcblxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm93ID0gY29tcHV0ZU9iamVjdCgpO1xuICAgICAgICBpZiAocHJldiAhPT0gbm93KSB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIHByZXYgPSBub3c7XG4gICAgfSwgcG9sbFJhdGVNcyk7XG59XG4iLCJpbXBvcnQge0NhY2hlLCBJQ2FjaGUsIFRUTENhY2hlfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7RGVmZXJyZWRQcm9taXNlfSBmcm9tICcuL2RlZmVycmVkX3Byb21pc2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSm9iPFQ+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGF0YTogVCkge31cblxuICAgIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFzaCB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgdGhpcyBqb2IuXG4gICAgICpcbiAgICAgKiBJZiB0d28gam9icyBoYXZlIHRoZSBzYW1lIGhhc2hjb2RlLCB0aGV5IGFyZSBjb25zaWRlcmVkIGlkZW50aWNhbC5cbiAgICAgKiAqL1xuICAgIGhhc2hDb2RlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdlbmVyaWNKb2I8VD4gZXh0ZW5kcyBKb2I8VD4ge31cblxuaW50ZXJmYWNlIFF1ZXVlZEpvYjxSZXEsIFJlc3A+IHtcbiAgICBqb2I6IEpvYjxSZXE+O1xuICAgIGRlZmVycmVkUHJvbWlzZTogRGVmZXJyZWRQcm9taXNlPFJlc3A+O1xufVxuXG4vKipcbiAqIFF1ZXVlIHRvIGhhbmRsZSBwcm9jZXNzaW5nIG9mIFwiSm9ic1wiIHdpdGggYSByZXF1ZXN0IHRoYXRcbiAqIHJldHVybiBhIHJlc3BvbnNlLiBFbnN1cmVzIGEgbWF4IGNvbmN1cnJlbmN5IG9mIHByb2Nlc3NpbmdcbiAqIHNpbXVsdGFuZW91cyBqb2JzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUXVldWU8UmVxLCBSZXNwPiB7XG4gICAgcHJpdmF0ZSBpbnRlcm5hbFF1ZXVlOiBRdWV1ZWRKb2I8UmVxLCBSZXNwPltdID0gW107XG4gICAgcHJpdmF0ZSBqb2JzUHJvY2Vzc2luZzogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWF4Q29uY3VycmVuY3k6IG51bWJlcikge31cblxuICAgIC8qKiBBbW91bnQgb2Ygam9icyBjdXJyZW50bHkgaW4gdGhlIHF1ZXVlICovXG4gICAgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbFF1ZXVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBoYXMoam9iOiBKb2I8UmVxPik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmludGVybmFsUXVldWUuZmluZCgoZSkgPT4gZS5qb2IuaGFzaENvZGUoKSA9PT0gam9iLmhhc2hDb2RlKCkpO1xuICAgIH1cblxuICAgIGdldE9yVGhyb3coam9iOiBKb2I8UmVxPik6IFF1ZXVlZEpvYjxSZXEsIFJlc3A+IHtcbiAgICAgICAgaWYgKCF0aGlzLmhhcyhqb2IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEpvYlske2pvYi5oYXNoQ29kZSgpfV0gaXMgbm90IHF1ZXVlZGApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR3VhcmFudGVlZFxuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbFF1ZXVlLmZpbmQoKGUpID0+IGUuam9iLmhhc2hDb2RlKCkgPT09IGpvYi5oYXNoQ29kZSgpKSE7XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tRdWV1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJuYWxRdWV1ZS5sZW5ndGggPT09IDAgfHwgdGhpcy5qb2JzUHJvY2Vzc2luZyA+PSB0aGlzLm1heENvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICAvLyBEb24ndCB3YW50IHRvIGxhdW5jaCBtb3JlIGluc3RhbmNlc1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5qb2JzUHJvY2Vzc2luZyArPSAxO1xuXG4gICAgICAgIGNvbnN0IHF1ZXVlZEpvYiA9IHRoaXMuaW50ZXJuYWxRdWV1ZS5zaGlmdCgpITtcbiAgICAgICAgY29uc3QgcmVxOiBSZXEgPSBxdWV1ZWRKb2Iuam9iLmdldERhdGEoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMucHJvY2VzcyhyZXEpO1xuICAgICAgICAgICAgcXVldWVkSm9iLmRlZmVycmVkUHJvbWlzZS5yZXNvbHZlKHJlc3ApO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBxdWV1ZWRKb2IuZGVmZXJyZWRQcm9taXNlLnJlamVjdCgoZSBhcyBhbnkpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5qb2JzUHJvY2Vzc2luZyAtPSAxO1xuICAgICAgICB0aGlzLmNoZWNrUXVldWUoKTtcbiAgICB9XG5cbiAgICBhZGQoam9iOiBKb2I8UmVxPik6IFByb21pc2U8UmVzcD4ge1xuICAgICAgICBpZiAodGhpcy5oYXMoam9iKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3JUaHJvdyhqb2IpPy5kZWZlcnJlZFByb21pc2UucHJvbWlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBEZWZlcnJlZFByb21pc2U8UmVzcD4oKTtcbiAgICAgICAgdGhpcy5pbnRlcm5hbFF1ZXVlLnB1c2goe2pvYiwgZGVmZXJyZWRQcm9taXNlOiBwcm9taXNlfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNoZWNrUXVldWUoKSwgMCk7XG5cbiAgICAgICAgcmV0dXJuIHByb21pc2UucHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBwcm9jZXNzKHJlcTogUmVxKTogUHJvbWlzZTxSZXNwPjtcbn1cblxuLyoqXG4gKiBMaWtlIGEgcXVldWUsIGJ1dCBoYXMgYW4gaW50ZXJuYWwgY2FjaGUgZm9yIGVsZW1lbnRzIGFscmVhZHkgcmVxdWVzdGVkXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYWNoZWRRdWV1ZTxSZXEsIFJlc3A+IGV4dGVuZHMgUXVldWU8UmVxLCBSZXNwPiB7XG4gICAgLyoqIFVuZGVybHlpbmcgaW1wbGVtZW50YXRpb24gb2YgYSBjYWNoZSAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBjYWNoZSgpOiBJQ2FjaGU8UmVzcD47XG5cbiAgICAvKiogQW1vdW50IG9mIHByZXZpb3VzbHkgcmVxdWVzdGVkIGpvYnMgc3RvcmVkIGluIHRoZSBjYWNoZSAqL1xuICAgIGNhY2hlU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZSgpLnNpemUoKTtcbiAgICB9XG5cbiAgICBnZXRDYWNoZWQoam9iOiBKb2I8UmVxPik6IFJlc3AgfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuY2FjaGUoKS5oYXMoam9iLmhhc2hDb2RlKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZSgpLmdldE9yVGhyb3coam9iLmhhc2hDb2RlKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDYWNoZWQoam9iOiBKb2I8UmVxPiwgcmVzcDogUmVzcCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNhY2hlKCkuc2V0KGpvYi5oYXNoQ29kZSgpLCByZXNwKTtcbiAgICB9XG5cbiAgICBhZGQoam9iOiBKb2I8UmVxPik6IFByb21pc2U8UmVzcD4ge1xuICAgICAgICBpZiAodGhpcy5nZXRDYWNoZWQoam9iKSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmdldENhY2hlZChqb2IpISk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwZXIuYWRkKGpvYikudGhlbigocmVzcCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRDYWNoZWQoam9iLCByZXNwKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcHJvY2VzcyhyZXE6IFJlcSk6IFByb21pc2U8UmVzcD47XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaW1wbGVDYWNoZWRRdWV1ZTxSZXEsIFJlc3A+IGV4dGVuZHMgQ2FjaGVkUXVldWU8UmVxLCBSZXNwPiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjYWNoZV8gPSBuZXcgQ2FjaGU8UmVzcD4oKTtcblxuICAgIHByb3RlY3RlZCBjYWNoZSgpOiBJQ2FjaGU8UmVzcD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZV87XG4gICAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVFRMQ2FjaGVkUXVldWU8UmVxLCBSZXNwPiBleHRlbmRzIENhY2hlZFF1ZXVlPFJlcSwgUmVzcD4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FjaGVfOiBUVExDYWNoZTxSZXNwPjtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihtYXhDb25jdXJyZW5jeTogbnVtYmVyLCBwcml2YXRlIHR0bE1zOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIobWF4Q29uY3VycmVuY3kpO1xuICAgICAgICB0aGlzLmNhY2hlXyA9IG5ldyBUVExDYWNoZTxSZXNwPih0dGxNcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNhY2hlKCk6IElDYWNoZTxSZXNwPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlXztcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0UmFua0NvbG91cihyYW5rOiBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKHJhbmspIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuICcjYzNhNTA4JztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4gJyM5YTk5OTknO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHJldHVybiAnIzhhNTkyOSc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtyZ0Fzc2V0fSBmcm9tICcuLi90eXBlcy9zdGVhbSc7XG5pbXBvcnQge0l0ZW1JbmZvfSBmcm9tICcuLi9icmlkZ2UvaGFuZGxlcnMvZmV0Y2hfaW5zcGVjdF9pbmZvJztcbmltcG9ydCB7Z2V0RG9wcGxlclBoYXNlLCBoYXNEb3BwbGVyUGhhc2V9IGZyb20gJy4vZG9wcGxlcnMnO1xuaW1wb3J0IHtodG1sLCBUZW1wbGF0ZVJlc3VsdH0gZnJvbSAnbGl0JztcbmltcG9ydCB7QWNpZEZhZGVDYWxjdWxhdG9yLCBBbWJlckZhZGVDYWxjdWxhdG9yLCBGYWRlQ2FsY3VsYXRvcn0gZnJvbSAnY3Nnby1mYWRlLXBlcmNlbnRhZ2UtY2FsY3VsYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5nZUZyb21XZWFyKHdlYXI6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsIHtcbiAgICBjb25zdCB3ZWFyUmFuZ2VzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBbXG4gICAgICAgIFswLjAsIDAuMDddLFxuICAgICAgICBbMC4wNywgMC4xNV0sXG4gICAgICAgIFswLjE1LCAwLjM4XSxcbiAgICAgICAgWzAuMzgsIDAuNDVdLFxuICAgICAgICBbMC40NSwgMS4wXSxcbiAgICBdO1xuXG4gICAgZm9yIChjb25zdCByYW5nZSBvZiB3ZWFyUmFuZ2VzKSB7XG4gICAgICAgIGlmICh3ZWFyID4gcmFuZ2VbMF0gJiYgd2VhciA8PSByYW5nZVsxXSkge1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb3dlc3RSYW5rKGluZm86IEl0ZW1JbmZvKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWluZm8ubG93X3JhbmsgJiYgIWluZm8uaGlnaF9yYW5rKSB7XG4gICAgICAgIC8vIEl0ZW0gaGFzIG5vIHJhbmsgdG8gcmV0dXJuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gKGluZm8ubG93X3JhbmsgfHwgMTAwMSkgPCAoaW5mby5oaWdoX3JhbmsgfHwgMTAwMSkgPyBpbmZvLmxvd19yYW5rIDogaW5mby5oaWdoX3Jhbms7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJhbmsoaW5mbzogSXRlbUluZm8pOiB7b3JkZXI6IE9yZGVyVHlwZTsgcmFuazogbnVtYmVyfSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcmFuayA9IGdldExvd2VzdFJhbmsoaW5mbyk7XG4gICAgaWYgKHJhbmsgJiYgcmFuayA8PSAxMDAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmRlcjogcmFuayA9PT0gaW5mby5sb3dfcmFuayA/IE9yZGVyVHlwZS5MT1dfUkFOSyA6IE9yZGVyVHlwZS5ISUdIX1JBTkssXG4gICAgICAgICAgICByYW5rLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEZsb2F0V2l0aFJhbmsoaW5mbzogSXRlbUluZm8sIHByZWNpc2lvbkRpZ2l0cyA9IDE0KTogc3RyaW5nIHtcbiAgICBsZXQgciA9IGluZm8uZmxvYXR2YWx1ZS50b0ZpeGVkKHByZWNpc2lvbkRpZ2l0cyk7XG5cbiAgICBjb25zdCByYW5rZWQgPSBwYXJzZVJhbmsoaW5mbyk7XG4gICAgaWYgKHJhbmtlZCkge1xuICAgICAgICByICs9IGAgKCMke3JhbmtlZC5yYW5rfSlgO1xuICAgIH1cblxuICAgIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0U2VlZChpbmZvOiBJdGVtSW5mbyk6IHN0cmluZyB7XG4gICAgbGV0IHIgPSBpbmZvLnBhaW50c2VlZC50b1N0cmluZygpO1xuXG4gICAgaWYgKGhhc0RvcHBsZXJQaGFzZShpbmZvLnBhaW50aW5kZXgpKSB7XG4gICAgICAgIHIgKz0gYCAoJHtnZXREb3BwbGVyUGhhc2UoaW5mby5wYWludGluZGV4KX0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcjtcbn1cblxuZW51bSBPcmRlclR5cGUge1xuICAgIExPV19SQU5LID0gMSxcbiAgICBISUdIX1JBTksgPSAtMSxcbn1cblxuLyoqXG4gKiBHZXRzIGZvcm1hdHRlZCBsaW5rIGZvciBmbG9hdGRiIGZvciB0aGUgc3BlY2lmaWVkIGl0ZW0gdHlwZSBhbmQgb3JkZXJcbiAqIEBwYXJhbSBpbmZvIGl0ZW0gcHJvcGVydGllcyBkaWN0XG4gKiBAcGFyYW0gb3JkZXIgMSBmb3IgbG93IGZsb2F0LCAtMSBmb3IgaGlnaCBmbG9hdCBvcmRlcmluZ1xuICovXG5mdW5jdGlvbiBnZXRGbG9hdERiTGluayhpbmZvOiBJdGVtSW5mbywgb3JkZXI6IE9yZGVyVHlwZSk6IHN0cmluZyB7XG4gICAgZnVuY3Rpb24gZ2V0RmxvYXREYkNhdGVnb3J5KGl0ZW06IEl0ZW1JbmZvKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGl0ZW0uZnVsbF9pdGVtX25hbWU/LmluY2x1ZGVzKCdTdGF0VHJhaycpKSB7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLmZ1bGxfaXRlbV9uYW1lPy5pbmNsdWRlcygnU291dmVuaXInKSkge1xuICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBcIk5vcm1hbFwiXG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBgaHR0cHM6Ly9jc2Zsb2F0LmNvbS9kYj9kZWZJbmRleD0ke2luZm8uZGVmaW5kZXh9JnBhaW50SW5kZXg9JHtcbiAgICAgICAgaW5mby5wYWludGluZGV4XG4gICAgfSZvcmRlcj0ke29yZGVyfSZjYXRlZ29yeT0ke2dldEZsb2F0RGJDYXRlZ29yeShpbmZvKX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQ2xpY2thYmxlUmFuayhpbmZvOiBJdGVtSW5mbyk6IFRlbXBsYXRlUmVzdWx0PDE+IHtcbiAgICBjb25zdCBwYXJzZWRSYW5rID0gcGFyc2VSYW5rKGluZm8pO1xuICAgIGlmICghcGFyc2VkUmFuaykge1xuICAgICAgICByZXR1cm4gaHRtbGBgO1xuICAgIH1cblxuICAgIHJldHVybiBodG1sYCA8YVxuICAgICAgICBzdHlsZT1cImNvbG9yOiAjZWJlYmViOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGN1cnNvcjogcG9pbnRlcjtcIlxuICAgICAgICBocmVmPVwiJHtnZXRGbG9hdERiTGluayhpbmZvLCBwYXJzZWRSYW5rLm9yZGVyKX1cIlxuICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgID5cbiAgICAgICAgKFJhbmsgIyR7cGFyc2VkUmFuay5yYW5rfSlcbiAgICA8L2E+YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2tpbihhc3NldDogcmdBc3NldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhc3NldC50YWdzXG4gICAgICAgID8gYXNzZXQudGFncy5zb21lKChhKSA9PiBhLmNhdGVnb3J5ID09PSAnV2VhcG9uJyB8fCAoYS5jYXRlZ29yeSA9PT0gJ1R5cGUnICYmIGEuaW50ZXJuYWxfbmFtZSA9PT0gJ1R5cGVfSGFuZHMnKSlcbiAgICAgICAgOiBbJ+KYhScsICdGYWN0b3J5IE5ldycsICdNaW5pbWFsIFdlYXInLCAnRmllbGQtVGVzdGVkJywgJ1dlbGwtV29ybicsICdCYXR0bGUtU2NhcnJlZCddLnNvbWUoKGtleXdvcmQpID0+XG4gICAgICAgICAgICAgIGFzc2V0Lm1hcmtldF9oYXNoX25hbWUuaW5jbHVkZXMoa2V5d29yZClcbiAgICAgICAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmFkZUNhbGN1bGF0b3JBbmRTdXBwb3J0ZWRXZWFwb24oXG4gICAgYXNzZXQ6IHJnQXNzZXRcbik6IFt0eXBlb2YgRmFkZUNhbGN1bGF0b3IgfCB0eXBlb2YgQWNpZEZhZGVDYWxjdWxhdG9yIHwgdHlwZW9mIEFtYmVyRmFkZUNhbGN1bGF0b3IsIHN0cmluZ10gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IEZBREVfVFlQRV9UT19DQUxDVUxBVE9SID0ge1xuICAgICAgICBGYWRlOiBGYWRlQ2FsY3VsYXRvcixcbiAgICAgICAgJ0FjaWQgRmFkZSc6IEFjaWRGYWRlQ2FsY3VsYXRvcixcbiAgICAgICAgJ0FtYmVyIEZhZGUnOiBBbWJlckZhZGVDYWxjdWxhdG9yLFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IFtmYWRlVHlwZSwgY2FsY3VsYXRvcl0gb2YgT2JqZWN0LmVudHJpZXMoRkFERV9UWVBFX1RPX0NBTENVTEFUT1IpKSB7XG4gICAgICAgIGZvciAoY29uc3Qgc3VwcG9ydGVkV2VhcG9uIG9mIGNhbGN1bGF0b3IuZ2V0U3VwcG9ydGVkV2VhcG9ucygpKSB7XG4gICAgICAgICAgICBpZiAoYXNzZXQubWFya2V0X2hhc2hfbmFtZS5pbmNsdWRlcyhgJHtzdXBwb3J0ZWRXZWFwb259IHwgJHtmYWRlVHlwZX1gKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbY2FsY3VsYXRvciwgc3VwcG9ydGVkV2VhcG9uLnRvU3RyaW5nKCldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmFkZVBlcmNlbnRhZ2UoYXNzZXQ6IHJnQXNzZXQsIGl0ZW1JbmZvOiBJdGVtSW5mbyk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZmFkZUNhbGN1bGF0b3JBbmRTdXBwb3J0ZWRXZWFwb24gPSBnZXRGYWRlQ2FsY3VsYXRvckFuZFN1cHBvcnRlZFdlYXBvbihhc3NldCk7XG5cbiAgICBpZiAoZmFkZUNhbGN1bGF0b3JBbmRTdXBwb3J0ZWRXZWFwb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBbY2FsY3VsYXRvciwgc3VwcG9ydGVkV2VhcG9uXSA9IGZhZGVDYWxjdWxhdG9yQW5kU3VwcG9ydGVkV2VhcG9uO1xuXG4gICAgICAgIHJldHVybiBjYWxjdWxhdG9yLmdldEZhZGVQZXJjZW50YWdlKHN1cHBvcnRlZFdlYXBvbiwgaXRlbUluZm8ucGFpbnRzZWVkKS5wZXJjZW50YWdlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsb29yKG46IG51bWJlciwgcHJlY2lzaW9uPzogbnVtYmVyKSB7XG4gICAgY29uc3QgcCA9IDEwICoqIChwcmVjaXNpb24gfHwgMCk7XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihuICogcCkgLyBwO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGluUGFnZUNvbnRleHQoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBjaHJvbWUgPT09ICd1bmRlZmluZWQnIHx8ICFjaHJvbWUuZXh0ZW5zaW9uO1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5jb25zdCB0PXdpbmRvdyxlPXQuU2hhZG93Um9vdCYmKHZvaWQgMD09PXQuU2hhZHlDU1N8fHQuU2hhZHlDU1MubmF0aXZlU2hhZG93KSYmXCJhZG9wdGVkU3R5bGVTaGVldHNcImluIERvY3VtZW50LnByb3RvdHlwZSYmXCJyZXBsYWNlXCJpbiBDU1NTdHlsZVNoZWV0LnByb3RvdHlwZSxzPVN5bWJvbCgpLG49bmV3IFdlYWtNYXA7Y2xhc3Mgb3tjb25zdHJ1Y3Rvcih0LGUsbil7aWYodGhpcy5fJGNzc1Jlc3VsdCQ9ITAsbiE9PXMpdGhyb3cgRXJyb3IoXCJDU1NSZXN1bHQgaXMgbm90IGNvbnN0cnVjdGFibGUuIFVzZSBgdW5zYWZlQ1NTYCBvciBgY3NzYCBpbnN0ZWFkLlwiKTt0aGlzLmNzc1RleHQ9dCx0aGlzLnQ9ZX1nZXQgc3R5bGVTaGVldCgpe2xldCB0PXRoaXMubztjb25zdCBzPXRoaXMudDtpZihlJiZ2b2lkIDA9PT10KXtjb25zdCBlPXZvaWQgMCE9PXMmJjE9PT1zLmxlbmd0aDtlJiYodD1uLmdldChzKSksdm9pZCAwPT09dCYmKCh0aGlzLm89dD1uZXcgQ1NTU3R5bGVTaGVldCkucmVwbGFjZVN5bmModGhpcy5jc3NUZXh0KSxlJiZuLnNldChzLHQpKX1yZXR1cm4gdH10b1N0cmluZygpe3JldHVybiB0aGlzLmNzc1RleHR9fWNvbnN0IHI9dD0+bmV3IG8oXCJzdHJpbmdcIj09dHlwZW9mIHQ/dDp0K1wiXCIsdm9pZCAwLHMpLGk9KHQsLi4uZSk9Pntjb25zdCBuPTE9PT10Lmxlbmd0aD90WzBdOmUucmVkdWNlKCgoZSxzLG4pPT5lKyh0PT57aWYoITA9PT10Ll8kY3NzUmVzdWx0JClyZXR1cm4gdC5jc3NUZXh0O2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KXJldHVybiB0O3Rocm93IEVycm9yKFwiVmFsdWUgcGFzc2VkIHRvICdjc3MnIGZ1bmN0aW9uIG11c3QgYmUgYSAnY3NzJyBmdW5jdGlvbiByZXN1bHQ6IFwiK3QrXCIuIFVzZSAndW5zYWZlQ1NTJyB0byBwYXNzIG5vbi1saXRlcmFsIHZhbHVlcywgYnV0IHRha2UgY2FyZSB0byBlbnN1cmUgcGFnZSBzZWN1cml0eS5cIil9KShzKSt0W24rMV0pLHRbMF0pO3JldHVybiBuZXcgbyhuLHQscyl9LFM9KHMsbik9PntlP3MuYWRvcHRlZFN0eWxlU2hlZXRzPW4ubWFwKCh0PT50IGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldD90OnQuc3R5bGVTaGVldCkpOm4uZm9yRWFjaCgoZT0+e2NvbnN0IG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpLG89dC5saXROb25jZTt2b2lkIDAhPT1vJiZuLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsbyksbi50ZXh0Q29udGVudD1lLmNzc1RleHQscy5hcHBlbmRDaGlsZChuKX0pKX0sYz1lP3Q9PnQ6dD0+dCBpbnN0YW5jZW9mIENTU1N0eWxlU2hlZXQ/KHQ9PntsZXQgZT1cIlwiO2Zvcihjb25zdCBzIG9mIHQuY3NzUnVsZXMpZSs9cy5jc3NUZXh0O3JldHVybiByKGUpfSkodCk6dDtleHBvcnR7byBhcyBDU1NSZXN1bHQsUyBhcyBhZG9wdFN0eWxlcyxpIGFzIGNzcyxjIGFzIGdldENvbXBhdGlibGVTdHlsZSxlIGFzIHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyxyIGFzIHVuc2FmZUNTU307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jc3MtdGFnLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5jb25zdCBlPShlLHQsbyk9PntPYmplY3QuZGVmaW5lUHJvcGVydHkodCxvLGUpfSx0PShlLHQpPT4oe2tpbmQ6XCJtZXRob2RcIixwbGFjZW1lbnQ6XCJwcm90b3R5cGVcIixrZXk6dC5rZXksZGVzY3JpcHRvcjplfSksbz0oe2ZpbmlzaGVyOmUsZGVzY3JpcHRvcjp0fSk9PihvLG4pPT57dmFyIHI7aWYodm9pZCAwPT09bil7Y29uc3Qgbj1udWxsIT09KHI9by5vcmlnaW5hbEtleSkmJnZvaWQgMCE9PXI/cjpvLmtleSxpPW51bGwhPXQ/e2tpbmQ6XCJtZXRob2RcIixwbGFjZW1lbnQ6XCJwcm90b3R5cGVcIixrZXk6bixkZXNjcmlwdG9yOnQoby5rZXkpfTp7Li4ubyxrZXk6bn07cmV0dXJuIG51bGwhPWUmJihpLmZpbmlzaGVyPWZ1bmN0aW9uKHQpe2UodCxuKX0pLGl9e2NvbnN0IHI9by5jb25zdHJ1Y3Rvcjt2b2lkIDAhPT10JiZPYmplY3QuZGVmaW5lUHJvcGVydHkobyxuLHQobikpLG51bGw9PWV8fGUocixuKX19O2V4cG9ydHtvIGFzIGRlY29yYXRlUHJvcGVydHksZSBhcyBsZWdhY3lQcm90b3R5cGVNZXRob2QsdCBhcyBzdGFuZGFyZFByb3RvdHlwZU1ldGhvZH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5jb25zdCBlPWU9Pm49PlwiZnVuY3Rpb25cIj09dHlwZW9mIG4/KChlLG4pPT4oY3VzdG9tRWxlbWVudHMuZGVmaW5lKGUsbiksbikpKGUsbik6KChlLG4pPT57Y29uc3R7a2luZDp0LGVsZW1lbnRzOnN9PW47cmV0dXJue2tpbmQ6dCxlbGVtZW50czpzLGZpbmlzaGVyKG4pe2N1c3RvbUVsZW1lbnRzLmRlZmluZShlLG4pfX19KShlLG4pO2V4cG9ydHtlIGFzIGN1c3RvbUVsZW1lbnR9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3VzdG9tLWVsZW1lbnQuanMubWFwXG4iLCJpbXBvcnR7ZGVjb3JhdGVQcm9wZXJ0eSBhcyByfWZyb21cIi4vYmFzZS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovZnVuY3Rpb24gZShlKXtyZXR1cm4gcih7ZmluaXNoZXI6KHIsdCk9PntPYmplY3QuYXNzaWduKHIucHJvdG90eXBlW3RdLGUpfX0pfWV4cG9ydHtlIGFzIGV2ZW50T3B0aW9uc307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudC1vcHRpb25zLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5jb25zdCBpPShpLGUpPT5cIm1ldGhvZFwiPT09ZS5raW5kJiZlLmRlc2NyaXB0b3ImJiEoXCJ2YWx1ZVwiaW4gZS5kZXNjcmlwdG9yKT97Li4uZSxmaW5pc2hlcihuKXtuLmNyZWF0ZVByb3BlcnR5KGUua2V5LGkpfX06e2tpbmQ6XCJmaWVsZFwiLGtleTpTeW1ib2woKSxwbGFjZW1lbnQ6XCJvd25cIixkZXNjcmlwdG9yOnt9LG9yaWdpbmFsS2V5OmUua2V5LGluaXRpYWxpemVyKCl7XCJmdW5jdGlvblwiPT10eXBlb2YgZS5pbml0aWFsaXplciYmKHRoaXNbZS5rZXldPWUuaW5pdGlhbGl6ZXIuY2FsbCh0aGlzKSl9LGZpbmlzaGVyKG4pe24uY3JlYXRlUHJvcGVydHkoZS5rZXksaSl9fTtmdW5jdGlvbiBlKGUpe3JldHVybihuLHQpPT52b2lkIDAhPT10PygoaSxlLG4pPT57ZS5jb25zdHJ1Y3Rvci5jcmVhdGVQcm9wZXJ0eShuLGkpfSkoZSxuLHQpOmkoZSxuKX1leHBvcnR7ZSBhcyBwcm9wZXJ0eX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wZXJ0eS5qcy5tYXBcbiIsImltcG9ydHtkZWNvcmF0ZVByb3BlcnR5IGFzIHJ9ZnJvbVwiLi9iYXNlLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9mdW5jdGlvbiBlKGUpe3JldHVybiByKHtkZXNjcmlwdG9yOnI9Pih7Z2V0KCl7dmFyIHIsbztyZXR1cm4gbnVsbCE9PShvPW51bGw9PT0ocj10aGlzLnJlbmRlclJvb3QpfHx2b2lkIDA9PT1yP3ZvaWQgMDpyLnF1ZXJ5U2VsZWN0b3JBbGwoZSkpJiZ2b2lkIDAhPT1vP286W119LGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9KX1leHBvcnR7ZSBhcyBxdWVyeUFsbH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1xdWVyeS1hbGwuanMubWFwXG4iLCJpbXBvcnR7ZGVjb3JhdGVQcm9wZXJ0eSBhcyBvfWZyb21cIi4vYmFzZS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovdmFyIG47Y29uc3QgZT1udWxsIT0obnVsbD09PShuPXdpbmRvdy5IVE1MU2xvdEVsZW1lbnQpfHx2b2lkIDA9PT1uP3ZvaWQgMDpuLnByb3RvdHlwZS5hc3NpZ25lZEVsZW1lbnRzKT8obyxuKT0+by5hc3NpZ25lZEVsZW1lbnRzKG4pOihvLG4pPT5vLmFzc2lnbmVkTm9kZXMobikuZmlsdGVyKChvPT5vLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUpKTtmdW5jdGlvbiBsKG4pe2NvbnN0e3Nsb3Q6bCxzZWxlY3Rvcjp0fT1udWxsIT1uP246e307cmV0dXJuIG8oe2Rlc2NyaXB0b3I6bz0+KHtnZXQoKXt2YXIgbztjb25zdCByPVwic2xvdFwiKyhsP2BbbmFtZT0ke2x9XWA6XCI6bm90KFtuYW1lXSlcIiksaT1udWxsPT09KG89dGhpcy5yZW5kZXJSb290KXx8dm9pZCAwPT09bz92b2lkIDA6by5xdWVyeVNlbGVjdG9yKHIpLHM9bnVsbCE9aT9lKGksbik6W107cmV0dXJuIHQ/cy5maWx0ZXIoKG89Pm8ubWF0Y2hlcyh0KSkpOnN9LGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9KX1leHBvcnR7bCBhcyBxdWVyeUFzc2lnbmVkRWxlbWVudHN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cXVlcnktYXNzaWduZWQtZWxlbWVudHMuanMubWFwXG4iLCJpbXBvcnR7ZGVjb3JhdGVQcm9wZXJ0eSBhcyBlfWZyb21cIi4vYmFzZS5qc1wiO2ltcG9ydHtxdWVyeUFzc2lnbmVkRWxlbWVudHMgYXMgdH1mcm9tXCIuL3F1ZXJ5LWFzc2lnbmVkLWVsZW1lbnRzLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9mdW5jdGlvbiBvKG8sbixyKXtsZXQgbCxzPW87cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIG8/KHM9by5zbG90LGw9byk6bD17ZmxhdHRlbjpufSxyP3Qoe3Nsb3Q6cyxmbGF0dGVuOm4sc2VsZWN0b3I6cn0pOmUoe2Rlc2NyaXB0b3I6ZT0+KHtnZXQoKXt2YXIgZSx0O2NvbnN0IG89XCJzbG90XCIrKHM/YFtuYW1lPSR7c31dYDpcIjpub3QoW25hbWVdKVwiKSxuPW51bGw9PT0oZT10aGlzLnJlbmRlclJvb3QpfHx2b2lkIDA9PT1lP3ZvaWQgMDplLnF1ZXJ5U2VsZWN0b3Iobyk7cmV0dXJuIG51bGwhPT0odD1udWxsPT1uP3ZvaWQgMDpuLmFzc2lnbmVkTm9kZXMobCkpJiZ2b2lkIDAhPT10P3Q6W119LGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9KX1leHBvcnR7byBhcyBxdWVyeUFzc2lnbmVkTm9kZXN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cXVlcnktYXNzaWduZWQtbm9kZXMuanMubWFwXG4iLCJpbXBvcnR7ZGVjb3JhdGVQcm9wZXJ0eSBhcyByfWZyb21cIi4vYmFzZS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5mdW5jdGlvbiBlKGUpe3JldHVybiByKHtkZXNjcmlwdG9yOnI9Pih7YXN5bmMgZ2V0KCl7dmFyIHI7cmV0dXJuIGF3YWl0IHRoaXMudXBkYXRlQ29tcGxldGUsbnVsbD09PShyPXRoaXMucmVuZGVyUm9vdCl8fHZvaWQgMD09PXI/dm9pZCAwOnIucXVlcnlTZWxlY3RvcihlKX0sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0pfWV4cG9ydHtlIGFzIHF1ZXJ5QXN5bmN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cXVlcnktYXN5bmMuanMubWFwXG4iLCJpbXBvcnR7ZGVjb3JhdGVQcm9wZXJ0eSBhcyBvfWZyb21cIi4vYmFzZS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovZnVuY3Rpb24gaShpLG4pe3JldHVybiBvKHtkZXNjcmlwdG9yOm89Pntjb25zdCB0PXtnZXQoKXt2YXIgbyxuO3JldHVybiBudWxsIT09KG49bnVsbD09PShvPXRoaXMucmVuZGVyUm9vdCl8fHZvaWQgMD09PW8/dm9pZCAwOm8ucXVlcnlTZWxlY3RvcihpKSkmJnZvaWQgMCE9PW4/bjpudWxsfSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH07aWYobil7Y29uc3Qgbj1cInN5bWJvbFwiPT10eXBlb2Ygbz9TeW1ib2woKTpcIl9fXCIrbzt0LmdldD1mdW5jdGlvbigpe3ZhciBvLHQ7cmV0dXJuIHZvaWQgMD09PXRoaXNbbl0mJih0aGlzW25dPW51bGwhPT0odD1udWxsPT09KG89dGhpcy5yZW5kZXJSb290KXx8dm9pZCAwPT09bz92b2lkIDA6by5xdWVyeVNlbGVjdG9yKGkpKSYmdm9pZCAwIT09dD90Om51bGwpLHRoaXNbbl19fXJldHVybiB0fX0pfWV4cG9ydHtpIGFzIHF1ZXJ5fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXF1ZXJ5LmpzLm1hcFxuIiwiaW1wb3J0e3Byb3BlcnR5IGFzIHJ9ZnJvbVwiLi9wcm9wZXJ0eS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovZnVuY3Rpb24gdCh0KXtyZXR1cm4gcih7Li4udCxzdGF0ZTohMH0pfWV4cG9ydHt0IGFzIHN0YXRlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YXRlLmpzLm1hcFxuIiwiaW1wb3J0e2dldENvbXBhdGlibGVTdHlsZSBhcyB0LGFkb3B0U3R5bGVzIGFzIGl9ZnJvbVwiLi9jc3MtdGFnLmpzXCI7ZXhwb3J0e0NTU1Jlc3VsdCxhZG9wdFN0eWxlcyxjc3MsZ2V0Q29tcGF0aWJsZVN0eWxlLHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyx1bnNhZmVDU1N9ZnJvbVwiLi9jc3MtdGFnLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi92YXIgcztjb25zdCBlPXdpbmRvdyxyPWUudHJ1c3RlZFR5cGVzLGg9cj9yLmVtcHR5U2NyaXB0OlwiXCIsbz1lLnJlYWN0aXZlRWxlbWVudFBvbHlmaWxsU3VwcG9ydCxuPXt0b0F0dHJpYnV0ZSh0LGkpe3N3aXRjaChpKXtjYXNlIEJvb2xlYW46dD10P2g6bnVsbDticmVhaztjYXNlIE9iamVjdDpjYXNlIEFycmF5OnQ9bnVsbD09dD90OkpTT04uc3RyaW5naWZ5KHQpfXJldHVybiB0fSxmcm9tQXR0cmlidXRlKHQsaSl7bGV0IHM9dDtzd2l0Y2goaSl7Y2FzZSBCb29sZWFuOnM9bnVsbCE9PXQ7YnJlYWs7Y2FzZSBOdW1iZXI6cz1udWxsPT09dD9udWxsOk51bWJlcih0KTticmVhaztjYXNlIE9iamVjdDpjYXNlIEFycmF5OnRyeXtzPUpTT04ucGFyc2UodCl9Y2F0Y2godCl7cz1udWxsfX1yZXR1cm4gc319LGE9KHQsaSk9PmkhPT10JiYoaT09aXx8dD09dCksbD17YXR0cmlidXRlOiEwLHR5cGU6U3RyaW5nLGNvbnZlcnRlcjpuLHJlZmxlY3Q6ITEsaGFzQ2hhbmdlZDphfTtjbGFzcyBkIGV4dGVuZHMgSFRNTEVsZW1lbnR7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuXyRFaT1uZXcgTWFwLHRoaXMuaXNVcGRhdGVQZW5kaW5nPSExLHRoaXMuaGFzVXBkYXRlZD0hMSx0aGlzLl8kRWw9bnVsbCx0aGlzLnUoKX1zdGF0aWMgYWRkSW5pdGlhbGl6ZXIodCl7dmFyIGk7bnVsbCE9PShpPXRoaXMuaCkmJnZvaWQgMCE9PWl8fCh0aGlzLmg9W10pLHRoaXMuaC5wdXNoKHQpfXN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCl7dGhpcy5maW5hbGl6ZSgpO2NvbnN0IHQ9W107cmV0dXJuIHRoaXMuZWxlbWVudFByb3BlcnRpZXMuZm9yRWFjaCgoKGkscyk9Pntjb25zdCBlPXRoaXMuXyRFcChzLGkpO3ZvaWQgMCE9PWUmJih0aGlzLl8kRXYuc2V0KGUscyksdC5wdXNoKGUpKX0pKSx0fXN0YXRpYyBjcmVhdGVQcm9wZXJ0eSh0LGk9bCl7aWYoaS5zdGF0ZSYmKGkuYXR0cmlidXRlPSExKSx0aGlzLmZpbmFsaXplKCksdGhpcy5lbGVtZW50UHJvcGVydGllcy5zZXQodCxpKSwhaS5ub0FjY2Vzc29yJiYhdGhpcy5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkodCkpe2NvbnN0IHM9XCJzeW1ib2xcIj09dHlwZW9mIHQ/U3ltYm9sKCk6XCJfX1wiK3QsZT10aGlzLmdldFByb3BlcnR5RGVzY3JpcHRvcih0LHMsaSk7dm9pZCAwIT09ZSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLHQsZSl9fXN0YXRpYyBnZXRQcm9wZXJ0eURlc2NyaXB0b3IodCxpLHMpe3JldHVybntnZXQoKXtyZXR1cm4gdGhpc1tpXX0sc2V0KGUpe2NvbnN0IHI9dGhpc1t0XTt0aGlzW2ldPWUsdGhpcy5yZXF1ZXN0VXBkYXRlKHQscixzKX0sY29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITB9fXN0YXRpYyBnZXRQcm9wZXJ0eU9wdGlvbnModCl7cmV0dXJuIHRoaXMuZWxlbWVudFByb3BlcnRpZXMuZ2V0KHQpfHxsfXN0YXRpYyBmaW5hbGl6ZSgpe2lmKHRoaXMuaGFzT3duUHJvcGVydHkoXCJmaW5hbGl6ZWRcIikpcmV0dXJuITE7dGhpcy5maW5hbGl6ZWQ9ITA7Y29uc3QgdD1PYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7aWYodC5maW5hbGl6ZSgpLHRoaXMuZWxlbWVudFByb3BlcnRpZXM9bmV3IE1hcCh0LmVsZW1lbnRQcm9wZXJ0aWVzKSx0aGlzLl8kRXY9bmV3IE1hcCx0aGlzLmhhc093blByb3BlcnR5KFwicHJvcGVydGllc1wiKSl7Y29uc3QgdD10aGlzLnByb3BlcnRpZXMsaT1bLi4uT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModCksLi4uT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0KV07Zm9yKGNvbnN0IHMgb2YgaSl0aGlzLmNyZWF0ZVByb3BlcnR5KHMsdFtzXSl9cmV0dXJuIHRoaXMuZWxlbWVudFN0eWxlcz10aGlzLmZpbmFsaXplU3R5bGVzKHRoaXMuc3R5bGVzKSwhMH1zdGF0aWMgZmluYWxpemVTdHlsZXMoaSl7Y29uc3Qgcz1bXTtpZihBcnJheS5pc0FycmF5KGkpKXtjb25zdCBlPW5ldyBTZXQoaS5mbGF0KDEvMCkucmV2ZXJzZSgpKTtmb3IoY29uc3QgaSBvZiBlKXMudW5zaGlmdCh0KGkpKX1lbHNlIHZvaWQgMCE9PWkmJnMucHVzaCh0KGkpKTtyZXR1cm4gc31zdGF0aWMgXyRFcCh0LGkpe2NvbnN0IHM9aS5hdHRyaWJ1dGU7cmV0dXJuITE9PT1zP3ZvaWQgMDpcInN0cmluZ1wiPT10eXBlb2Ygcz9zOlwic3RyaW5nXCI9PXR5cGVvZiB0P3QudG9Mb3dlckNhc2UoKTp2b2lkIDB9dSgpe3ZhciB0O3RoaXMuXyRFXz1uZXcgUHJvbWlzZSgodD0+dGhpcy5lbmFibGVVcGRhdGluZz10KSksdGhpcy5fJEFMPW5ldyBNYXAsdGhpcy5fJEVnKCksdGhpcy5yZXF1ZXN0VXBkYXRlKCksbnVsbD09PSh0PXRoaXMuY29uc3RydWN0b3IuaCl8fHZvaWQgMD09PXR8fHQuZm9yRWFjaCgodD0+dCh0aGlzKSkpfWFkZENvbnRyb2xsZXIodCl7dmFyIGksczsobnVsbCE9PShpPXRoaXMuXyRFUykmJnZvaWQgMCE9PWk/aTp0aGlzLl8kRVM9W10pLnB1c2godCksdm9pZCAwIT09dGhpcy5yZW5kZXJSb290JiZ0aGlzLmlzQ29ubmVjdGVkJiYobnVsbD09PShzPXQuaG9zdENvbm5lY3RlZCl8fHZvaWQgMD09PXN8fHMuY2FsbCh0KSl9cmVtb3ZlQ29udHJvbGxlcih0KXt2YXIgaTtudWxsPT09KGk9dGhpcy5fJEVTKXx8dm9pZCAwPT09aXx8aS5zcGxpY2UodGhpcy5fJEVTLmluZGV4T2YodCk+Pj4wLDEpfV8kRWcoKXt0aGlzLmNvbnN0cnVjdG9yLmVsZW1lbnRQcm9wZXJ0aWVzLmZvckVhY2goKCh0LGkpPT57dGhpcy5oYXNPd25Qcm9wZXJ0eShpKSYmKHRoaXMuXyRFaS5zZXQoaSx0aGlzW2ldKSxkZWxldGUgdGhpc1tpXSl9KSl9Y3JlYXRlUmVuZGVyUm9vdCgpe3ZhciB0O2NvbnN0IHM9bnVsbCE9PSh0PXRoaXMuc2hhZG93Um9vdCkmJnZvaWQgMCE9PXQ/dDp0aGlzLmF0dGFjaFNoYWRvdyh0aGlzLmNvbnN0cnVjdG9yLnNoYWRvd1Jvb3RPcHRpb25zKTtyZXR1cm4gaShzLHRoaXMuY29uc3RydWN0b3IuZWxlbWVudFN0eWxlcyksc31jb25uZWN0ZWRDYWxsYmFjaygpe3ZhciB0O3ZvaWQgMD09PXRoaXMucmVuZGVyUm9vdCYmKHRoaXMucmVuZGVyUm9vdD10aGlzLmNyZWF0ZVJlbmRlclJvb3QoKSksdGhpcy5lbmFibGVVcGRhdGluZyghMCksbnVsbD09PSh0PXRoaXMuXyRFUyl8fHZvaWQgMD09PXR8fHQuZm9yRWFjaCgodD0+e3ZhciBpO3JldHVybiBudWxsPT09KGk9dC5ob3N0Q29ubmVjdGVkKXx8dm9pZCAwPT09aT92b2lkIDA6aS5jYWxsKHQpfSkpfWVuYWJsZVVwZGF0aW5nKHQpe31kaXNjb25uZWN0ZWRDYWxsYmFjaygpe3ZhciB0O251bGw9PT0odD10aGlzLl8kRVMpfHx2b2lkIDA9PT10fHx0LmZvckVhY2goKHQ9Pnt2YXIgaTtyZXR1cm4gbnVsbD09PShpPXQuaG9zdERpc2Nvbm5lY3RlZCl8fHZvaWQgMD09PWk/dm9pZCAwOmkuY2FsbCh0KX0pKX1hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodCxpLHMpe3RoaXMuXyRBSyh0LHMpfV8kRU8odCxpLHM9bCl7dmFyIGU7Y29uc3Qgcj10aGlzLmNvbnN0cnVjdG9yLl8kRXAodCxzKTtpZih2b2lkIDAhPT1yJiYhMD09PXMucmVmbGVjdCl7Y29uc3QgaD0odm9pZCAwIT09KG51bGw9PT0oZT1zLmNvbnZlcnRlcil8fHZvaWQgMD09PWU/dm9pZCAwOmUudG9BdHRyaWJ1dGUpP3MuY29udmVydGVyOm4pLnRvQXR0cmlidXRlKGkscy50eXBlKTt0aGlzLl8kRWw9dCxudWxsPT1oP3RoaXMucmVtb3ZlQXR0cmlidXRlKHIpOnRoaXMuc2V0QXR0cmlidXRlKHIsaCksdGhpcy5fJEVsPW51bGx9fV8kQUsodCxpKXt2YXIgcztjb25zdCBlPXRoaXMuY29uc3RydWN0b3Iscj1lLl8kRXYuZ2V0KHQpO2lmKHZvaWQgMCE9PXImJnRoaXMuXyRFbCE9PXIpe2NvbnN0IHQ9ZS5nZXRQcm9wZXJ0eU9wdGlvbnMociksaD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmNvbnZlcnRlcj97ZnJvbUF0dHJpYnV0ZTp0LmNvbnZlcnRlcn06dm9pZCAwIT09KG51bGw9PT0ocz10LmNvbnZlcnRlcil8fHZvaWQgMD09PXM/dm9pZCAwOnMuZnJvbUF0dHJpYnV0ZSk/dC5jb252ZXJ0ZXI6bjt0aGlzLl8kRWw9cix0aGlzW3JdPWguZnJvbUF0dHJpYnV0ZShpLHQudHlwZSksdGhpcy5fJEVsPW51bGx9fXJlcXVlc3RVcGRhdGUodCxpLHMpe2xldCBlPSEwO3ZvaWQgMCE9PXQmJigoKHM9c3x8dGhpcy5jb25zdHJ1Y3Rvci5nZXRQcm9wZXJ0eU9wdGlvbnModCkpLmhhc0NoYW5nZWR8fGEpKHRoaXNbdF0saSk/KHRoaXMuXyRBTC5oYXModCl8fHRoaXMuXyRBTC5zZXQodCxpKSwhMD09PXMucmVmbGVjdCYmdGhpcy5fJEVsIT09dCYmKHZvaWQgMD09PXRoaXMuXyRFQyYmKHRoaXMuXyRFQz1uZXcgTWFwKSx0aGlzLl8kRUMuc2V0KHQscykpKTplPSExKSwhdGhpcy5pc1VwZGF0ZVBlbmRpbmcmJmUmJih0aGlzLl8kRV89dGhpcy5fJEVqKCkpfWFzeW5jIF8kRWooKXt0aGlzLmlzVXBkYXRlUGVuZGluZz0hMDt0cnl7YXdhaXQgdGhpcy5fJEVffWNhdGNoKHQpe1Byb21pc2UucmVqZWN0KHQpfWNvbnN0IHQ9dGhpcy5zY2hlZHVsZVVwZGF0ZSgpO3JldHVybiBudWxsIT10JiZhd2FpdCB0LCF0aGlzLmlzVXBkYXRlUGVuZGluZ31zY2hlZHVsZVVwZGF0ZSgpe3JldHVybiB0aGlzLnBlcmZvcm1VcGRhdGUoKX1wZXJmb3JtVXBkYXRlKCl7dmFyIHQ7aWYoIXRoaXMuaXNVcGRhdGVQZW5kaW5nKXJldHVybjt0aGlzLmhhc1VwZGF0ZWQsdGhpcy5fJEVpJiYodGhpcy5fJEVpLmZvckVhY2goKCh0LGkpPT50aGlzW2ldPXQpKSx0aGlzLl8kRWk9dm9pZCAwKTtsZXQgaT0hMTtjb25zdCBzPXRoaXMuXyRBTDt0cnl7aT10aGlzLnNob3VsZFVwZGF0ZShzKSxpPyh0aGlzLndpbGxVcGRhdGUocyksbnVsbD09PSh0PXRoaXMuXyRFUyl8fHZvaWQgMD09PXR8fHQuZm9yRWFjaCgodD0+e3ZhciBpO3JldHVybiBudWxsPT09KGk9dC5ob3N0VXBkYXRlKXx8dm9pZCAwPT09aT92b2lkIDA6aS5jYWxsKHQpfSkpLHRoaXMudXBkYXRlKHMpKTp0aGlzLl8kRWsoKX1jYXRjaCh0KXt0aHJvdyBpPSExLHRoaXMuXyRFaygpLHR9aSYmdGhpcy5fJEFFKHMpfXdpbGxVcGRhdGUodCl7fV8kQUUodCl7dmFyIGk7bnVsbD09PShpPXRoaXMuXyRFUyl8fHZvaWQgMD09PWl8fGkuZm9yRWFjaCgodD0+e3ZhciBpO3JldHVybiBudWxsPT09KGk9dC5ob3N0VXBkYXRlZCl8fHZvaWQgMD09PWk/dm9pZCAwOmkuY2FsbCh0KX0pKSx0aGlzLmhhc1VwZGF0ZWR8fCh0aGlzLmhhc1VwZGF0ZWQ9ITAsdGhpcy5maXJzdFVwZGF0ZWQodCkpLHRoaXMudXBkYXRlZCh0KX1fJEVrKCl7dGhpcy5fJEFMPW5ldyBNYXAsdGhpcy5pc1VwZGF0ZVBlbmRpbmc9ITF9Z2V0IHVwZGF0ZUNvbXBsZXRlKCl7cmV0dXJuIHRoaXMuZ2V0VXBkYXRlQ29tcGxldGUoKX1nZXRVcGRhdGVDb21wbGV0ZSgpe3JldHVybiB0aGlzLl8kRV99c2hvdWxkVXBkYXRlKHQpe3JldHVybiEwfXVwZGF0ZSh0KXt2b2lkIDAhPT10aGlzLl8kRUMmJih0aGlzLl8kRUMuZm9yRWFjaCgoKHQsaSk9PnRoaXMuXyRFTyhpLHRoaXNbaV0sdCkpKSx0aGlzLl8kRUM9dm9pZCAwKSx0aGlzLl8kRWsoKX11cGRhdGVkKHQpe31maXJzdFVwZGF0ZWQodCl7fX1kLmZpbmFsaXplZD0hMCxkLmVsZW1lbnRQcm9wZXJ0aWVzPW5ldyBNYXAsZC5lbGVtZW50U3R5bGVzPVtdLGQuc2hhZG93Um9vdE9wdGlvbnM9e21vZGU6XCJvcGVuXCJ9LG51bGw9PW98fG8oe1JlYWN0aXZlRWxlbWVudDpkfSksKG51bGwhPT0ocz1lLnJlYWN0aXZlRWxlbWVudFZlcnNpb25zKSYmdm9pZCAwIT09cz9zOmUucmVhY3RpdmVFbGVtZW50VmVyc2lvbnM9W10pLnB1c2goXCIxLjQuMFwiKTtleHBvcnR7ZCBhcyBSZWFjdGl2ZUVsZW1lbnQsbiBhcyBkZWZhdWx0Q29udmVydGVyLGEgYXMgbm90RXF1YWx9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3RpdmUtZWxlbWVudC5qcy5tYXBcbiIsImltcG9ydHtSZWFjdGl2ZUVsZW1lbnQgYXMgdH1mcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnRcIjtleHBvcnQqZnJvbVwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50XCI7aW1wb3J0e3JlbmRlciBhcyBlLG5vQ2hhbmdlIGFzIGl9ZnJvbVwibGl0LWh0bWxcIjtleHBvcnQqZnJvbVwibGl0LWh0bWxcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL3ZhciBsLG87Y29uc3Qgcj10O2NsYXNzIHMgZXh0ZW5kcyB0e2NvbnN0cnVjdG9yKCl7c3VwZXIoLi4uYXJndW1lbnRzKSx0aGlzLnJlbmRlck9wdGlvbnM9e2hvc3Q6dGhpc30sdGhpcy5fJERvPXZvaWQgMH1jcmVhdGVSZW5kZXJSb290KCl7dmFyIHQsZTtjb25zdCBpPXN1cGVyLmNyZWF0ZVJlbmRlclJvb3QoKTtyZXR1cm4gbnVsbCE9PSh0PShlPXRoaXMucmVuZGVyT3B0aW9ucykucmVuZGVyQmVmb3JlKSYmdm9pZCAwIT09dHx8KGUucmVuZGVyQmVmb3JlPWkuZmlyc3RDaGlsZCksaX11cGRhdGUodCl7Y29uc3QgaT10aGlzLnJlbmRlcigpO3RoaXMuaGFzVXBkYXRlZHx8KHRoaXMucmVuZGVyT3B0aW9ucy5pc0Nvbm5lY3RlZD10aGlzLmlzQ29ubmVjdGVkKSxzdXBlci51cGRhdGUodCksdGhpcy5fJERvPWUoaSx0aGlzLnJlbmRlclJvb3QsdGhpcy5yZW5kZXJPcHRpb25zKX1jb25uZWN0ZWRDYWxsYmFjaygpe3ZhciB0O3N1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCksbnVsbD09PSh0PXRoaXMuXyREbyl8fHZvaWQgMD09PXR8fHQuc2V0Q29ubmVjdGVkKCEwKX1kaXNjb25uZWN0ZWRDYWxsYmFjaygpe3ZhciB0O3N1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCksbnVsbD09PSh0PXRoaXMuXyREbyl8fHZvaWQgMD09PXR8fHQuc2V0Q29ubmVjdGVkKCExKX1yZW5kZXIoKXtyZXR1cm4gaX19cy5maW5hbGl6ZWQ9ITAscy5fJGxpdEVsZW1lbnQkPSEwLG51bGw9PT0obD1nbG9iYWxUaGlzLmxpdEVsZW1lbnRIeWRyYXRlU3VwcG9ydCl8fHZvaWQgMD09PWx8fGwuY2FsbChnbG9iYWxUaGlzLHtMaXRFbGVtZW50OnN9KTtjb25zdCBuPWdsb2JhbFRoaXMubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydDtudWxsPT1ufHxuKHtMaXRFbGVtZW50OnN9KTtjb25zdCBoPXtfJEFLOih0LGUsaSk9Pnt0Ll8kQUsoZSxpKX0sXyRBTDp0PT50Ll8kQUx9OyhudWxsIT09KG89Z2xvYmFsVGhpcy5saXRFbGVtZW50VmVyc2lvbnMpJiZ2b2lkIDAhPT1vP286Z2xvYmFsVGhpcy5saXRFbGVtZW50VmVyc2lvbnM9W10pLnB1c2goXCIzLjIuMlwiKTtleHBvcnR7cyBhcyBMaXRFbGVtZW50LHIgYXMgVXBkYXRpbmdFbGVtZW50LGggYXMgXyRMRX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXQtZWxlbWVudC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuY29uc3QgdD17QVRUUklCVVRFOjEsQ0hJTEQ6MixQUk9QRVJUWTozLEJPT0xFQU5fQVRUUklCVVRFOjQsRVZFTlQ6NSxFTEVNRU5UOjZ9LGU9dD0+KC4uLmUpPT4oe18kbGl0RGlyZWN0aXZlJDp0LHZhbHVlczplfSk7Y2xhc3MgaXtjb25zdHJ1Y3Rvcih0KXt9Z2V0IF8kQVUoKXtyZXR1cm4gdGhpcy5fJEFNLl8kQVV9XyRBVCh0LGUsaSl7dGhpcy5fJEN0PXQsdGhpcy5fJEFNPWUsdGhpcy5fJENpPWl9XyRBUyh0LGUpe3JldHVybiB0aGlzLnVwZGF0ZSh0LGUpfXVwZGF0ZSh0LGUpe3JldHVybiB0aGlzLnJlbmRlciguLi5lKX19ZXhwb3J0e2kgYXMgRGlyZWN0aXZlLHQgYXMgUGFydFR5cGUsZSBhcyBkaXJlY3RpdmV9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlyZWN0aXZlLmpzLm1hcFxuIiwiaW1wb3J0e25vQ2hhbmdlIGFzIHR9ZnJvbVwiLi4vbGl0LWh0bWwuanNcIjtpbXBvcnR7ZGlyZWN0aXZlIGFzIGksRGlyZWN0aXZlIGFzIHMsUGFydFR5cGUgYXMgcn1mcm9tXCIuLi9kaXJlY3RpdmUuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL2NvbnN0IG89aShjbGFzcyBleHRlbmRzIHN7Y29uc3RydWN0b3IodCl7dmFyIGk7aWYoc3VwZXIodCksdC50eXBlIT09ci5BVFRSSUJVVEV8fFwiY2xhc3NcIiE9PXQubmFtZXx8KG51bGw9PT0oaT10LnN0cmluZ3MpfHx2b2lkIDA9PT1pP3ZvaWQgMDppLmxlbmd0aCk+Mil0aHJvdyBFcnJvcihcImBjbGFzc01hcCgpYCBjYW4gb25seSBiZSB1c2VkIGluIHRoZSBgY2xhc3NgIGF0dHJpYnV0ZSBhbmQgbXVzdCBiZSB0aGUgb25seSBwYXJ0IGluIHRoZSBhdHRyaWJ1dGUuXCIpfXJlbmRlcih0KXtyZXR1cm5cIiBcIitPYmplY3Qua2V5cyh0KS5maWx0ZXIoKGk9PnRbaV0pKS5qb2luKFwiIFwiKStcIiBcIn11cGRhdGUoaSxbc10pe3ZhciByLG87aWYodm9pZCAwPT09dGhpcy5udCl7dGhpcy5udD1uZXcgU2V0LHZvaWQgMCE9PWkuc3RyaW5ncyYmKHRoaXMuc3Q9bmV3IFNldChpLnN0cmluZ3Muam9pbihcIiBcIikuc3BsaXQoL1xccy8pLmZpbHRlcigodD0+XCJcIiE9PXQpKSkpO2Zvcihjb25zdCB0IGluIHMpc1t0XSYmIShudWxsPT09KHI9dGhpcy5zdCl8fHZvaWQgMD09PXI/dm9pZCAwOnIuaGFzKHQpKSYmdGhpcy5udC5hZGQodCk7cmV0dXJuIHRoaXMucmVuZGVyKHMpfWNvbnN0IGU9aS5lbGVtZW50LmNsYXNzTGlzdDt0aGlzLm50LmZvckVhY2goKHQ9Pnt0IGluIHN8fChlLnJlbW92ZSh0KSx0aGlzLm50LmRlbGV0ZSh0KSl9KSk7Zm9yKGNvbnN0IHQgaW4gcyl7Y29uc3QgaT0hIXNbdF07aT09PXRoaXMubnQuaGFzKHQpfHwobnVsbD09PShvPXRoaXMuc3QpfHx2b2lkIDA9PT1vP3ZvaWQgMDpvLmhhcyh0KSl8fChpPyhlLmFkZCh0KSx0aGlzLm50LmFkZCh0KSk6KGUucmVtb3ZlKHQpLHRoaXMubnQuZGVsZXRlKHQpKSl9cmV0dXJuIHR9fSk7ZXhwb3J0e28gYXMgY2xhc3NNYXB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2xhc3MtbWFwLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG52YXIgdDtjb25zdCBpPXdpbmRvdyxzPWkudHJ1c3RlZFR5cGVzLGU9cz9zLmNyZWF0ZVBvbGljeShcImxpdC1odG1sXCIse2NyZWF0ZUhUTUw6dD0+dH0pOnZvaWQgMCxvPWBsaXQkJHsoTWF0aC5yYW5kb20oKStcIlwiKS5zbGljZSg5KX0kYCxuPVwiP1wiK28sbD1gPCR7bn0+YCxoPWRvY3VtZW50LHI9KHQ9XCJcIik9PmguY3JlYXRlQ29tbWVudCh0KSxkPXQ9Pm51bGw9PT10fHxcIm9iamVjdFwiIT10eXBlb2YgdCYmXCJmdW5jdGlvblwiIT10eXBlb2YgdCx1PUFycmF5LmlzQXJyYXksYz10PT51KHQpfHxcImZ1bmN0aW9uXCI9PXR5cGVvZihudWxsPT10P3ZvaWQgMDp0W1N5bWJvbC5pdGVyYXRvcl0pLHY9LzwoPzooIS0tfFxcL1teYS16QS1aXSl8KFxcLz9bYS16QS1aXVtePlxcc10qKXwoXFwvPyQpKS9nLGE9Ly0tPi9nLGY9Lz4vZyxfPVJlZ0V4cChcIj58WyBcXHRcXG5cXGZcXHJdKD86KFteXFxcXHNcXFwiJz49L10rKShbIFxcdFxcblxcZlxccl0qPVsgXFx0XFxuXFxmXFxyXSooPzpbXiBcXHRcXG5cXGZcXHJcXFwiJ2A8Pj1dfChcXFwifCcpfCkpfCQpXCIsXCJnXCIpLG09LycvZyxwPS9cIi9nLCQ9L14oPzpzY3JpcHR8c3R5bGV8dGV4dGFyZWF8dGl0bGUpJC9pLGc9dD0+KGksLi4ucyk9Pih7XyRsaXRUeXBlJDp0LHN0cmluZ3M6aSx2YWx1ZXM6c30pLHk9ZygxKSx3PWcoMikseD1TeW1ib2wuZm9yKFwibGl0LW5vQ2hhbmdlXCIpLGI9U3ltYm9sLmZvcihcImxpdC1ub3RoaW5nXCIpLFQ9bmV3IFdlYWtNYXAsQT0odCxpLHMpPT57dmFyIGUsbztjb25zdCBuPW51bGwhPT0oZT1udWxsPT1zP3ZvaWQgMDpzLnJlbmRlckJlZm9yZSkmJnZvaWQgMCE9PWU/ZTppO2xldCBsPW4uXyRsaXRQYXJ0JDtpZih2b2lkIDA9PT1sKXtjb25zdCB0PW51bGwhPT0obz1udWxsPT1zP3ZvaWQgMDpzLnJlbmRlckJlZm9yZSkmJnZvaWQgMCE9PW8/bzpudWxsO24uXyRsaXRQYXJ0JD1sPW5ldyBTKGkuaW5zZXJ0QmVmb3JlKHIoKSx0KSx0LHZvaWQgMCxudWxsIT1zP3M6e30pfXJldHVybiBsLl8kQUkodCksbH0sRT1oLmNyZWF0ZVRyZWVXYWxrZXIoaCwxMjksbnVsbCwhMSksQz0odCxpKT0+e2NvbnN0IHM9dC5sZW5ndGgtMSxuPVtdO2xldCBoLHI9Mj09PWk/XCI8c3ZnPlwiOlwiXCIsZD12O2ZvcihsZXQgaT0wO2k8cztpKyspe2NvbnN0IHM9dFtpXTtsZXQgZSx1LGM9LTEsZz0wO2Zvcig7ZzxzLmxlbmd0aCYmKGQubGFzdEluZGV4PWcsdT1kLmV4ZWMocyksbnVsbCE9PXUpOylnPWQubGFzdEluZGV4LGQ9PT12P1wiIS0tXCI9PT11WzFdP2Q9YTp2b2lkIDAhPT11WzFdP2Q9Zjp2b2lkIDAhPT11WzJdPygkLnRlc3QodVsyXSkmJihoPVJlZ0V4cChcIjwvXCIrdVsyXSxcImdcIikpLGQ9Xyk6dm9pZCAwIT09dVszXSYmKGQ9Xyk6ZD09PV8/XCI+XCI9PT11WzBdPyhkPW51bGwhPWg/aDp2LGM9LTEpOnZvaWQgMD09PXVbMV0/Yz0tMjooYz1kLmxhc3RJbmRleC11WzJdLmxlbmd0aCxlPXVbMV0sZD12b2lkIDA9PT11WzNdP186J1wiJz09PXVbM10/cDptKTpkPT09cHx8ZD09PW0/ZD1fOmQ9PT1hfHxkPT09Zj9kPXY6KGQ9XyxoPXZvaWQgMCk7Y29uc3QgeT1kPT09XyYmdFtpKzFdLnN0YXJ0c1dpdGgoXCIvPlwiKT9cIiBcIjpcIlwiO3IrPWQ9PT12P3MrbDpjPj0wPyhuLnB1c2goZSkscy5zbGljZSgwLGMpK1wiJGxpdCRcIitzLnNsaWNlKGMpK28reSk6cytvKygtMj09PWM/KG4ucHVzaCh2b2lkIDApLGkpOnkpfWNvbnN0IHU9cisodFtzXXx8XCI8Pz5cIikrKDI9PT1pP1wiPC9zdmc+XCI6XCJcIik7aWYoIUFycmF5LmlzQXJyYXkodCl8fCF0Lmhhc093blByb3BlcnR5KFwicmF3XCIpKXRocm93IEVycm9yKFwiaW52YWxpZCB0ZW1wbGF0ZSBzdHJpbmdzIGFycmF5XCIpO3JldHVyblt2b2lkIDAhPT1lP2UuY3JlYXRlSFRNTCh1KTp1LG5dfTtjbGFzcyBQe2NvbnN0cnVjdG9yKHtzdHJpbmdzOnQsXyRsaXRUeXBlJDppfSxlKXtsZXQgbDt0aGlzLnBhcnRzPVtdO2xldCBoPTAsZD0wO2NvbnN0IHU9dC5sZW5ndGgtMSxjPXRoaXMucGFydHMsW3YsYV09Qyh0LGkpO2lmKHRoaXMuZWw9UC5jcmVhdGVFbGVtZW50KHYsZSksRS5jdXJyZW50Tm9kZT10aGlzLmVsLmNvbnRlbnQsMj09PWkpe2NvbnN0IHQ9dGhpcy5lbC5jb250ZW50LGk9dC5maXJzdENoaWxkO2kucmVtb3ZlKCksdC5hcHBlbmQoLi4uaS5jaGlsZE5vZGVzKX1mb3IoO251bGwhPT0obD1FLm5leHROb2RlKCkpJiZjLmxlbmd0aDx1Oyl7aWYoMT09PWwubm9kZVR5cGUpe2lmKGwuaGFzQXR0cmlidXRlcygpKXtjb25zdCB0PVtdO2Zvcihjb25zdCBpIG9mIGwuZ2V0QXR0cmlidXRlTmFtZXMoKSlpZihpLmVuZHNXaXRoKFwiJGxpdCRcIil8fGkuc3RhcnRzV2l0aChvKSl7Y29uc3Qgcz1hW2QrK107aWYodC5wdXNoKGkpLHZvaWQgMCE9PXMpe2NvbnN0IHQ9bC5nZXRBdHRyaWJ1dGUocy50b0xvd2VyQ2FzZSgpK1wiJGxpdCRcIikuc3BsaXQobyksaT0vKFsuP0BdKT8oLiopLy5leGVjKHMpO2MucHVzaCh7dHlwZToxLGluZGV4OmgsbmFtZTppWzJdLHN0cmluZ3M6dCxjdG9yOlwiLlwiPT09aVsxXT9SOlwiP1wiPT09aVsxXT9IOlwiQFwiPT09aVsxXT9JOk19KX1lbHNlIGMucHVzaCh7dHlwZTo2LGluZGV4Omh9KX1mb3IoY29uc3QgaSBvZiB0KWwucmVtb3ZlQXR0cmlidXRlKGkpfWlmKCQudGVzdChsLnRhZ05hbWUpKXtjb25zdCB0PWwudGV4dENvbnRlbnQuc3BsaXQobyksaT10Lmxlbmd0aC0xO2lmKGk+MCl7bC50ZXh0Q29udGVudD1zP3MuZW1wdHlTY3JpcHQ6XCJcIjtmb3IobGV0IHM9MDtzPGk7cysrKWwuYXBwZW5kKHRbc10scigpKSxFLm5leHROb2RlKCksYy5wdXNoKHt0eXBlOjIsaW5kZXg6KytofSk7bC5hcHBlbmQodFtpXSxyKCkpfX19ZWxzZSBpZig4PT09bC5ub2RlVHlwZSlpZihsLmRhdGE9PT1uKWMucHVzaCh7dHlwZToyLGluZGV4Omh9KTtlbHNle2xldCB0PS0xO2Zvcig7LTEhPT0odD1sLmRhdGEuaW5kZXhPZihvLHQrMSkpOyljLnB1c2goe3R5cGU6NyxpbmRleDpofSksdCs9by5sZW5ndGgtMX1oKyt9fXN0YXRpYyBjcmVhdGVFbGVtZW50KHQsaSl7Y29uc3Qgcz1oLmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtyZXR1cm4gcy5pbm5lckhUTUw9dCxzfX1mdW5jdGlvbiBWKHQsaSxzPXQsZSl7dmFyIG8sbixsLGg7aWYoaT09PXgpcmV0dXJuIGk7bGV0IHI9dm9pZCAwIT09ZT9udWxsPT09KG89cy5fJENsKXx8dm9pZCAwPT09bz92b2lkIDA6b1tlXTpzLl8kQ3U7Y29uc3QgdT1kKGkpP3ZvaWQgMDppLl8kbGl0RGlyZWN0aXZlJDtyZXR1cm4obnVsbD09cj92b2lkIDA6ci5jb25zdHJ1Y3RvcikhPT11JiYobnVsbD09PShuPW51bGw9PXI/dm9pZCAwOnIuXyRBTyl8fHZvaWQgMD09PW58fG4uY2FsbChyLCExKSx2b2lkIDA9PT11P3I9dm9pZCAwOihyPW5ldyB1KHQpLHIuXyRBVCh0LHMsZSkpLHZvaWQgMCE9PWU/KG51bGwhPT0obD0oaD1zKS5fJENsKSYmdm9pZCAwIT09bD9sOmguXyRDbD1bXSlbZV09cjpzLl8kQ3U9ciksdm9pZCAwIT09ciYmKGk9Vih0LHIuXyRBUyh0LGkudmFsdWVzKSxyLGUpKSxpfWNsYXNzIE57Y29uc3RydWN0b3IodCxpKXt0aGlzLnY9W10sdGhpcy5fJEFOPXZvaWQgMCx0aGlzLl8kQUQ9dCx0aGlzLl8kQU09aX1nZXQgcGFyZW50Tm9kZSgpe3JldHVybiB0aGlzLl8kQU0ucGFyZW50Tm9kZX1nZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0uXyRBVX1wKHQpe3ZhciBpO2NvbnN0e2VsOntjb250ZW50OnN9LHBhcnRzOmV9PXRoaXMuXyRBRCxvPShudWxsIT09KGk9bnVsbD09dD92b2lkIDA6dC5jcmVhdGlvblNjb3BlKSYmdm9pZCAwIT09aT9pOmgpLmltcG9ydE5vZGUocywhMCk7RS5jdXJyZW50Tm9kZT1vO2xldCBuPUUubmV4dE5vZGUoKSxsPTAscj0wLGQ9ZVswXTtmb3IoO3ZvaWQgMCE9PWQ7KXtpZihsPT09ZC5pbmRleCl7bGV0IGk7Mj09PWQudHlwZT9pPW5ldyBTKG4sbi5uZXh0U2libGluZyx0aGlzLHQpOjE9PT1kLnR5cGU/aT1uZXcgZC5jdG9yKG4sZC5uYW1lLGQuc3RyaW5ncyx0aGlzLHQpOjY9PT1kLnR5cGUmJihpPW5ldyBMKG4sdGhpcyx0KSksdGhpcy52LnB1c2goaSksZD1lWysrcl19bCE9PShudWxsPT1kP3ZvaWQgMDpkLmluZGV4KSYmKG49RS5uZXh0Tm9kZSgpLGwrKyl9cmV0dXJuIG99bSh0KXtsZXQgaT0wO2Zvcihjb25zdCBzIG9mIHRoaXMudil2b2lkIDAhPT1zJiYodm9pZCAwIT09cy5zdHJpbmdzPyhzLl8kQUkodCxzLGkpLGkrPXMuc3RyaW5ncy5sZW5ndGgtMik6cy5fJEFJKHRbaV0pKSxpKyt9fWNsYXNzIFN7Y29uc3RydWN0b3IodCxpLHMsZSl7dmFyIG87dGhpcy50eXBlPTIsdGhpcy5fJEFIPWIsdGhpcy5fJEFOPXZvaWQgMCx0aGlzLl8kQUE9dCx0aGlzLl8kQUI9aSx0aGlzLl8kQU09cyx0aGlzLm9wdGlvbnM9ZSx0aGlzLl8kQ189bnVsbD09PShvPW51bGw9PWU/dm9pZCAwOmUuaXNDb25uZWN0ZWQpfHx2b2lkIDA9PT1vfHxvfWdldCBfJEFVKCl7dmFyIHQsaTtyZXR1cm4gbnVsbCE9PShpPW51bGw9PT0odD10aGlzLl8kQU0pfHx2b2lkIDA9PT10P3ZvaWQgMDp0Ll8kQVUpJiZ2b2lkIDAhPT1pP2k6dGhpcy5fJENffWdldCBwYXJlbnROb2RlKCl7bGV0IHQ9dGhpcy5fJEFBLnBhcmVudE5vZGU7Y29uc3QgaT10aGlzLl8kQU07cmV0dXJuIHZvaWQgMCE9PWkmJjExPT09dC5ub2RlVHlwZSYmKHQ9aS5wYXJlbnROb2RlKSx0fWdldCBzdGFydE5vZGUoKXtyZXR1cm4gdGhpcy5fJEFBfWdldCBlbmROb2RlKCl7cmV0dXJuIHRoaXMuXyRBQn1fJEFJKHQsaT10aGlzKXt0PVYodGhpcyx0LGkpLGQodCk/dD09PWJ8fG51bGw9PXR8fFwiXCI9PT10Pyh0aGlzLl8kQUghPT1iJiZ0aGlzLl8kQVIoKSx0aGlzLl8kQUg9Yik6dCE9PXRoaXMuXyRBSCYmdCE9PXgmJnRoaXMuJCh0KTp2b2lkIDAhPT10Ll8kbGl0VHlwZSQ/dGhpcy5UKHQpOnZvaWQgMCE9PXQubm9kZVR5cGU/dGhpcy5rKHQpOmModCk/dGhpcy5PKHQpOnRoaXMuJCh0KX1TKHQsaT10aGlzLl8kQUIpe3JldHVybiB0aGlzLl8kQUEucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodCxpKX1rKHQpe3RoaXMuXyRBSCE9PXQmJih0aGlzLl8kQVIoKSx0aGlzLl8kQUg9dGhpcy5TKHQpKX0kKHQpe3RoaXMuXyRBSCE9PWImJmQodGhpcy5fJEFIKT90aGlzLl8kQUEubmV4dFNpYmxpbmcuZGF0YT10OnRoaXMuayhoLmNyZWF0ZVRleHROb2RlKHQpKSx0aGlzLl8kQUg9dH1UKHQpe3ZhciBpO2NvbnN0e3ZhbHVlczpzLF8kbGl0VHlwZSQ6ZX09dCxvPVwibnVtYmVyXCI9PXR5cGVvZiBlP3RoaXMuXyRBQyh0KToodm9pZCAwPT09ZS5lbCYmKGUuZWw9UC5jcmVhdGVFbGVtZW50KGUuaCx0aGlzLm9wdGlvbnMpKSxlKTtpZigobnVsbD09PShpPXRoaXMuXyRBSCl8fHZvaWQgMD09PWk/dm9pZCAwOmkuXyRBRCk9PT1vKXRoaXMuXyRBSC5tKHMpO2Vsc2V7Y29uc3QgdD1uZXcgTihvLHRoaXMpLGk9dC5wKHRoaXMub3B0aW9ucyk7dC5tKHMpLHRoaXMuayhpKSx0aGlzLl8kQUg9dH19XyRBQyh0KXtsZXQgaT1ULmdldCh0LnN0cmluZ3MpO3JldHVybiB2b2lkIDA9PT1pJiZULnNldCh0LnN0cmluZ3MsaT1uZXcgUCh0KSksaX1PKHQpe3UodGhpcy5fJEFIKXx8KHRoaXMuXyRBSD1bXSx0aGlzLl8kQVIoKSk7Y29uc3QgaT10aGlzLl8kQUg7bGV0IHMsZT0wO2Zvcihjb25zdCBvIG9mIHQpZT09PWkubGVuZ3RoP2kucHVzaChzPW5ldyBTKHRoaXMuUyhyKCkpLHRoaXMuUyhyKCkpLHRoaXMsdGhpcy5vcHRpb25zKSk6cz1pW2VdLHMuXyRBSShvKSxlKys7ZTxpLmxlbmd0aCYmKHRoaXMuXyRBUihzJiZzLl8kQUIubmV4dFNpYmxpbmcsZSksaS5sZW5ndGg9ZSl9XyRBUih0PXRoaXMuXyRBQS5uZXh0U2libGluZyxpKXt2YXIgcztmb3IobnVsbD09PShzPXRoaXMuXyRBUCl8fHZvaWQgMD09PXN8fHMuY2FsbCh0aGlzLCExLCEwLGkpO3QmJnQhPT10aGlzLl8kQUI7KXtjb25zdCBpPXQubmV4dFNpYmxpbmc7dC5yZW1vdmUoKSx0PWl9fXNldENvbm5lY3RlZCh0KXt2YXIgaTt2b2lkIDA9PT10aGlzLl8kQU0mJih0aGlzLl8kQ189dCxudWxsPT09KGk9dGhpcy5fJEFQKXx8dm9pZCAwPT09aXx8aS5jYWxsKHRoaXMsdCkpfX1jbGFzcyBNe2NvbnN0cnVjdG9yKHQsaSxzLGUsbyl7dGhpcy50eXBlPTEsdGhpcy5fJEFIPWIsdGhpcy5fJEFOPXZvaWQgMCx0aGlzLmVsZW1lbnQ9dCx0aGlzLm5hbWU9aSx0aGlzLl8kQU09ZSx0aGlzLm9wdGlvbnM9byxzLmxlbmd0aD4yfHxcIlwiIT09c1swXXx8XCJcIiE9PXNbMV0/KHRoaXMuXyRBSD1BcnJheShzLmxlbmd0aC0xKS5maWxsKG5ldyBTdHJpbmcpLHRoaXMuc3RyaW5ncz1zKTp0aGlzLl8kQUg9Yn1nZXQgdGFnTmFtZSgpe3JldHVybiB0aGlzLmVsZW1lbnQudGFnTmFtZX1nZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0uXyRBVX1fJEFJKHQsaT10aGlzLHMsZSl7Y29uc3Qgbz10aGlzLnN0cmluZ3M7bGV0IG49ITE7aWYodm9pZCAwPT09byl0PVYodGhpcyx0LGksMCksbj0hZCh0KXx8dCE9PXRoaXMuXyRBSCYmdCE9PXgsbiYmKHRoaXMuXyRBSD10KTtlbHNle2NvbnN0IGU9dDtsZXQgbCxoO2Zvcih0PW9bMF0sbD0wO2w8by5sZW5ndGgtMTtsKyspaD1WKHRoaXMsZVtzK2xdLGksbCksaD09PXgmJihoPXRoaXMuXyRBSFtsXSksbnx8KG49IWQoaCl8fGghPT10aGlzLl8kQUhbbF0pLGg9PT1iP3Q9Yjp0IT09YiYmKHQrPShudWxsIT1oP2g6XCJcIikrb1tsKzFdKSx0aGlzLl8kQUhbbF09aH1uJiYhZSYmdGhpcy5QKHQpfVAodCl7dD09PWI/dGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm5hbWUpOnRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLG51bGwhPXQ/dDpcIlwiKX19Y2xhc3MgUiBleHRlbmRzIE17Y29uc3RydWN0b3IoKXtzdXBlciguLi5hcmd1bWVudHMpLHRoaXMudHlwZT0zfVAodCl7dGhpcy5lbGVtZW50W3RoaXMubmFtZV09dD09PWI/dm9pZCAwOnR9fWNvbnN0IGs9cz9zLmVtcHR5U2NyaXB0OlwiXCI7Y2xhc3MgSCBleHRlbmRzIE17Y29uc3RydWN0b3IoKXtzdXBlciguLi5hcmd1bWVudHMpLHRoaXMudHlwZT00fVAodCl7dCYmdCE9PWI/dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsayk6dGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm5hbWUpfX1jbGFzcyBJIGV4dGVuZHMgTXtjb25zdHJ1Y3Rvcih0LGkscyxlLG8pe3N1cGVyKHQsaSxzLGUsbyksdGhpcy50eXBlPTV9XyRBSSh0LGk9dGhpcyl7dmFyIHM7aWYoKHQ9bnVsbCE9PShzPVYodGhpcyx0LGksMCkpJiZ2b2lkIDAhPT1zP3M6Yik9PT14KXJldHVybjtjb25zdCBlPXRoaXMuXyRBSCxvPXQ9PT1iJiZlIT09Ynx8dC5jYXB0dXJlIT09ZS5jYXB0dXJlfHx0Lm9uY2UhPT1lLm9uY2V8fHQucGFzc2l2ZSE9PWUucGFzc2l2ZSxuPXQhPT1iJiYoZT09PWJ8fG8pO28mJnRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMubmFtZSx0aGlzLGUpLG4mJnRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMubmFtZSx0aGlzLHQpLHRoaXMuXyRBSD10fWhhbmRsZUV2ZW50KHQpe3ZhciBpLHM7XCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5fJEFIP3RoaXMuXyRBSC5jYWxsKG51bGwhPT0ocz1udWxsPT09KGk9dGhpcy5vcHRpb25zKXx8dm9pZCAwPT09aT92b2lkIDA6aS5ob3N0KSYmdm9pZCAwIT09cz9zOnRoaXMuZWxlbWVudCx0KTp0aGlzLl8kQUguaGFuZGxlRXZlbnQodCl9fWNsYXNzIEx7Y29uc3RydWN0b3IodCxpLHMpe3RoaXMuZWxlbWVudD10LHRoaXMudHlwZT02LHRoaXMuXyRBTj12b2lkIDAsdGhpcy5fJEFNPWksdGhpcy5vcHRpb25zPXN9Z2V0IF8kQVUoKXtyZXR1cm4gdGhpcy5fJEFNLl8kQVV9XyRBSSh0KXtWKHRoaXMsdCl9fWNvbnN0IHo9e0E6XCIkbGl0JFwiLE06byxDOm4sTDoxLFI6QyxEOk4sVjpjLEk6VixIOlMsTjpNLFU6SCxCOkksRjpSLFc6TH0sWj1pLmxpdEh0bWxQb2x5ZmlsbFN1cHBvcnQ7bnVsbD09Wnx8WihQLFMpLChudWxsIT09KHQ9aS5saXRIdG1sVmVyc2lvbnMpJiZ2b2lkIDAhPT10P3Q6aS5saXRIdG1sVmVyc2lvbnM9W10pLnB1c2goXCIyLjMuMVwiKTtleHBvcnR7eiBhcyBfJExILHkgYXMgaHRtbCx4IGFzIG5vQ2hhbmdlLGIgYXMgbm90aGluZyxBIGFzIHJlbmRlcix3IGFzIHN2Z307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXQtaHRtbC5qcy5tYXBcbiIsImV4cG9ydCpmcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9jdXN0b20tZWxlbWVudC5qc1wiO2V4cG9ydCpmcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9wcm9wZXJ0eS5qc1wiO2V4cG9ydCpmcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9zdGF0ZS5qc1wiO2V4cG9ydCpmcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9ldmVudC1vcHRpb25zLmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LmpzXCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudC9kZWNvcmF0b3JzL3F1ZXJ5LWFsbC5qc1wiO2V4cG9ydCpmcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9xdWVyeS1hc3luYy5qc1wiO2V4cG9ydCpmcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9xdWVyeS1hc3NpZ25lZC1lbGVtZW50cy5qc1wiO2V4cG9ydCpmcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9xdWVyeS1hc3NpZ25lZC1ub2Rlcy5qc1wiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVjb3JhdG9ycy5qcy5tYXBcbiIsImltcG9ydFwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50XCI7aW1wb3J0XCJsaXQtaHRtbFwiO2V4cG9ydCpmcm9tXCJsaXQtZWxlbWVudC9saXQtZWxlbWVudC5qc1wiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsImltcG9ydCB7aW5pdH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgJy4uL2NvbXBvbmVudHMvdHJhZGVfb2ZmZXIvdHJhZGVfaXRlbV9ob2xkZXJfbWV0YWRhdGEnO1xuaW1wb3J0ICcuLi9jb21wb25lbnRzL3RyYWRlX29mZmVyL2F1dG9fZmlsbCc7XG5pbXBvcnQge0NsYXNzSWRBbmRJbnN0YW5jZUlkLCByZ0Rlc2NyaXB0aW9uLCByZ0ludmVudG9yeUFzc2V0LCBUcmFkZUludmVudG9yeX0gZnJvbSAnLi4vdHlwZXMvc3RlYW0nO1xuaW1wb3J0IHtmZXRjaFJlZ2lzdGVyZWRTdGVhbUFQSUtleX0gZnJvbSAnLi4vdXRpbHMva2V5JztcbmltcG9ydCB7ZGVzZXJpYWxpemVGb3JtfSBmcm9tICcuLi91dGlscy9icm93c2VyJztcbmltcG9ydCB7QXBwSWR9IGZyb20gJy4uL3R5cGVzL3N0ZWFtX2NvbnN0YW50cyc7XG5pbXBvcnQge0NsaWVudFNlbmR9IGZyb20gJy4uL2JyaWRnZS9jbGllbnQnO1xuaW1wb3J0IHtBbm5vdGF0ZU9mZmVyfSBmcm9tICcuLi9icmlkZ2UvaGFuZGxlcnMvYW5ub3RhdGVfb2ZmZXInO1xuXG5pbml0KCdzcmMvbGliL3BhZ2Vfc2NyaXB0cy90cmFkZV9vZmZlci5qcycsIG1haW4pO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIGluamVjdEFubm90YXRlT2ZmZXIoKTtcbiAgICBpbmplY3RJbnZlbnRvcnlGYWxsYmFjaygpO1xufVxuXG5pbnRlcmZhY2UgS2V5SW52ZW50b3J5UmVzcG9uc2Uge1xuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIGFzc2V0cz86IHJnSW52ZW50b3J5QXNzZXRbXTtcbiAgICAgICAgZGVzY3JpcHRpb25zOiByZ0Rlc2NyaXB0aW9uW107XG4gICAgICAgIHRvdGFsX2ludmVudG9yeV9jb3VudDogbnVtYmVyO1xuICAgIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgdGhlIEFQSSBLZXkgaW52ZW50b3J5IHJlc3BvbnNlIHRvIG1hdGNoIHRoZSBcIlRyYWRlXCIgaW52ZW50b3J5XG4gKiByZXNwb25zZSBmb3IgU3RlYW0ncyBjbGllbnQgY29kZS5cbiAqL1xuZnVuY3Rpb24gY29udmVydEtleUludmVudG9yeUludG9UcmFkZUludmVudG9yeShyYXc6IEtleUludmVudG9yeVJlc3BvbnNlKTogVHJhZGVJbnZlbnRvcnkge1xuICAgIC8vIFBvcHVsYXRlIG1pc3NpbmcgZmllbGRzXG4gICAgcmF3LnJlc3BvbnNlLmFzc2V0cz8uZm9yRWFjaCgoYXNzZXQsIGluZGV4KSA9PiB7XG4gICAgICAgIGFzc2V0LmlkID0gYXNzZXQuYXNzZXRpZCE7XG4gICAgICAgIGFzc2V0LnBvcyA9IGluZGV4ICsgMTtcbiAgICAgICAgYXNzZXQuaGlkZV9pbl9jaGluYSA9IDA7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZ0ludmVudG9yeSA9IHJhdy5yZXNwb25zZS5hc3NldHMhLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgIGFjY1t2LmlkXSA9IHY7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMge1trOiBzdHJpbmddOiByZ0ludmVudG9yeUFzc2V0fSk7XG5cbiAgICBjb25zdCByZ0Rlc2NyaXB0aW9ucyA9IHJhdy5yZXNwb25zZS5kZXNjcmlwdGlvbnM/LnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICh2LnRhZ3MgfHwgW10pLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgICAgICAgLy8gIyBWYWx2ZSBjb25zaXN0ZW5jeSwgdGhpcyBmaWVsZCB3YXMgcmVuYW1lZFxuICAgICAgICAgICAgdGFnLm5hbWUgPSB0YWcubG9jYWxpemVkX3RhZ19uYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICBhY2NbYCR7di5jbGFzc2lkfV8ke3YuaW5zdGFuY2VpZH1gIGFzIENsYXNzSWRBbmRJbnN0YW5jZUlkXSA9IHY7XG5cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyB7W2s6IENsYXNzSWRBbmRJbnN0YW5jZUlkXTogcmdEZXNjcmlwdGlvbn0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbW9yZTogZmFsc2UsXG4gICAgICAgIG1vcmVfc3RhcnQ6IGZhbHNlLFxuICAgICAgICByZ0N1cnJlbmN5OiBbXSxcbiAgICAgICAgcmdEZXNjcmlwdGlvbnMsXG4gICAgICAgIHJnSW52ZW50b3J5LFxuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoSW52ZW50b3J5V2l0aEFQSUtleSgpOiBQcm9taXNlPFRyYWRlSW52ZW50b3J5PiB7XG4gICAgY29uc3Qga2V5ID0gYXdhaXQgZmV0Y2hSZWdpc3RlcmVkU3RlYW1BUElLZXkoKTtcblxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLnN0ZWFtcG93ZXJlZC5jb20vSUVjb25TZXJ2aWNlL0dldEludmVudG9yeUl0ZW1zV2l0aERlc2NyaXB0aW9ucy92MS8/YXBwaWQ9NzMwJmNvbnRleHRpZD0yJmNvdW50PTUwMDAmZ2V0X2Rlc2NyaXB0aW9ucz10cnVlJmtleT0ke2tleX0mc3RlYW1pZD0ke1VzZXJZb3U/LnN0clN0ZWFtSWR9YFxuICAgICk7XG4gICAgaWYgKCFyZXNwLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigna2V5IGludmVudG9yeSBmZXRjaCByZXNwb25zZSB3YXMgbm90IE9LJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IChhd2FpdCByZXNwLmpzb24oKSkgYXMgS2V5SW52ZW50b3J5UmVzcG9uc2U7XG5cbiAgICAvLyBTb21ldGltZXMgU3RlYW0gbGlrZXMgdG8gcmV0dXJuIGFuIGVtcHR5IHJlc3BvbnNlLi4uXG4gICAgaWYgKCFkYXRhLnJlc3BvbnNlLmFzc2V0cz8ubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigna2V5IGludmVudG9yeSByZXNwb25zZSBoYWQgbm8gYXNzZXRzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnZlcnRLZXlJbnZlbnRvcnlJbnRvVHJhZGVJbnZlbnRvcnkoZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGluamVjdEludmVudG9yeUZhbGxiYWNrKCkge1xuICAgIC8qKlxuICAgICAqIFZhbHZlIGNhbiByYXRlIGxpbWl0IHVzZXIncyByZXF1ZXN0cyB0byB0aGVpciBvd24gaW52ZW50b3J5LiBBcyBhIHJlc3VsdCxcbiAgICAgKiBzb21lIHBlb3BsZSBjYW4ndCBzZW5kIGEgdHJhZGUgb2ZmZXIgc2luY2UgdGhleSBjYW4ndCBsb2FkIHRoZWlyIGludmVudG9yeS5cbiAgICAgKlxuICAgICAqIFRoaXMgbWl0aWdhdGlvbiB1c2VzIHRoZSBBUEkgS2V5IGZhbGxiYWNrIG1ldGhvZCBpbnN0ZWFkLCB3aGljaCBvbmx5XG4gICAgICogd29ya3MgaWYgdGhleSBoYXZlIGEgU3RlYW0gV2ViIEFQSSBrZXkgb24gdGhlaXIgYWNjb3VudC5cbiAgICAgKi9cbiAgICBjb25zdCBnX0NvbnRpbnVlRnVsbEludmVudG9yeVJlcXVlc3RJZk5lY2Vzc2FyeSA9IENvbnRpbnVlRnVsbEludmVudG9yeVJlcXVlc3RJZk5lY2Vzc2FyeTtcblxuICAgIENvbnRpbnVlRnVsbEludmVudG9yeVJlcXVlc3RJZk5lY2Vzc2FyeSA9IGFzeW5jIGZ1bmN0aW9uIChcbiAgICAgICAgdHJhbnNwb3J0OiBKUXVlcnkuanFYSFIsXG4gICAgICAgIG1lcmdlZFJlc3BvbnNlOiBhbnksXG4gICAgICAgIHN0clVybDogc3RyaW5nLFxuICAgICAgICBvUGFyYW1zOiBhbnksXG4gICAgICAgIGZPblN1Y2Nlc3M6ICgpID0+IGFueSxcbiAgICAgICAgZk9uRmFpbHVyZTogKCkgPT4gYW55LFxuICAgICAgICBmT25Db21wbGV0ZTogKCkgPT4gYW55XG4gICAgKSB7XG4gICAgICAgIGlmIChzdHJVcmwuc3RhcnRzV2l0aChnX3N0ckludmVudG9yeUxvYWRVUkwhKSAmJiB0cmFuc3BvcnQuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgLy8gVXNlciB3YXMgcmF0ZSBsaW1pdGVkLi4uIHRyeSB0aGUgZmFsbGJhY2suXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ludmVudG9yeSA9IGF3YWl0IGZldGNoSW52ZW50b3J5V2l0aEFQSUtleSgpO1xuICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5yZXNwb25zZUpTT04gPSBuZXdJbnZlbnRvcnk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnZmFpbGVkIHRvIGZldGNoIGZhbGxiYWNrIGludmVudG9yeSB2aWEga2V5JywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxsIHVwc3RyZWFtXG4gICAgICAgIHJldHVybiBnX0NvbnRpbnVlRnVsbEludmVudG9yeVJlcXVlc3RJZk5lY2Vzc2FyeShcbiAgICAgICAgICAgIHRyYW5zcG9ydCxcbiAgICAgICAgICAgIG1lcmdlZFJlc3BvbnNlLFxuICAgICAgICAgICAgc3RyVXJsLFxuICAgICAgICAgICAgb1BhcmFtcyxcbiAgICAgICAgICAgIGZPblN1Y2Nlc3MsXG4gICAgICAgICAgICBmT25GYWlsdXJlLFxuICAgICAgICAgICAgZk9uQ29tcGxldGVcbiAgICAgICAgKTtcbiAgICB9O1xufVxuXG5pbnRlcmZhY2UgSnNvblRyYWRlb2ZmZXJBc3NldCB7XG4gICAgYXBwaWQ6IG51bWJlcjtcbiAgICBjb250ZXh0aWQ6IHN0cmluZztcbiAgICBhbW91bnQ6IG51bWJlcjtcbiAgICBhc3NldGlkOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBKc29uVHJhZGVvZmZlciB7XG4gICAgbWU6IHtcbiAgICAgICAgYXNzZXRzOiBKc29uVHJhZGVvZmZlckFzc2V0W107XG4gICAgfTtcbiAgICB0aGVtOiB7XG4gICAgICAgIGFzc2V0czogSnNvblRyYWRlb2ZmZXJBc3NldFtdO1xuICAgIH07XG4gICAgdmVyc2lvbjogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBpbmplY3RBbm5vdGF0ZU9mZmVyKCkge1xuICAgIC8vIEFubm90YXRlIG9mZmVycyBmb3IgdXNlIGluIENTRmxvYXQgTWFya2V0LCBpZiB0aGUgdXNlciBpc24ndCBsb2dnZWQgaW50byBDU0Zsb2F0IHRoaXMgZG9lcyBub3RoaW5nXG4gICAgLy8gU2ltaWxhcmx5IGlmIHRoZXkgZG9uJ3QgaGF2ZSBhbiBhY3RpdmUgc2FsZSwgaXQgZG9lcyBub3RoaW5nXG4gICAgJEooZG9jdW1lbnQpLm9uKCdhamF4Q29tcGxldGUnLCBhc3luYyAoZXZlbnQsIHJlcXVlc3QsIHNldHRpbmdzKSA9PiB7XG4gICAgICAgIGlmICghc2V0dGluZ3MudXJsLmluY2x1ZGVzKCd0cmFkZW9mZmVyL25ldy9zZW5kJykpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSByZXF1ZXN0cyB0aGF0IGFyZW4ndCBhIG5ldyB0cmFkZSBvZmZlclxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2ZmZXJfaWQgPSByZXF1ZXN0Py5yZXNwb25zZUpTT04/LnRyYWRlb2ZmZXJpZDtcblxuICAgICAgICBpZiAoIW9mZmVyX2lkKSB7XG4gICAgICAgICAgICAvLyBTb21ldGhpbmcgd3Jvbmcgd2l0aCB0aGUgZm9ybWF0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYXNzZXRzX3RvX3NlbmQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGxldCBhc3NldHNfdG9fcmVjZWl2ZTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemVkID0gZGVzZXJpYWxpemVGb3JtKHNldHRpbmdzLmRhdGEpIGFzIHtqc29uX3RyYWRlb2ZmZXI/OiBzdHJpbmd9O1xuXG4gICAgICAgIGlmIChkZXNlcmlhbGl6ZWQgJiYgZGVzZXJpYWxpemVkLmpzb25fdHJhZGVvZmZlcikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGRlc2VyaWFsaXplZC5qc29uX3RyYWRlb2ZmZXIpIGFzIEpzb25UcmFkZW9mZmVyO1xuICAgICAgICAgICAgICAgIGFzc2V0c190b19zZW5kID0gcGFyc2VkLm1lLmFzc2V0cy5maWx0ZXIoKGUpID0+IGUuYXBwaWQgPT09IEFwcElkLkNTR08pLm1hcCgoZSkgPT4gZS5hc3NldGlkKTtcbiAgICAgICAgICAgICAgICBhc3NldHNfdG9fcmVjZWl2ZSA9IHBhcnNlZC50aGVtLmFzc2V0cy5maWx0ZXIoKGUpID0+IGUuYXBwaWQgPT09IEFwcElkLkNTR08pLm1hcCgoZSkgPT4gZS5hc3NldGlkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdmYWlsZWQgdG8gcGFyc2UganNvbiB0cmFkZW9mZmVyJywgZSwgZGVzZXJpYWxpemVkLmpzb25fdHJhZGVvZmZlcik7XG4gICAgICAgICAgICAgICAgLy8gU3RpbGwgcHJvY2VlZCB3aXRoIGFubm90YXRpbmcgdGhlIG9mZmVyIGlkIG9uIGEgYmVzdC1lZmZvcnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IENsaWVudFNlbmQoQW5ub3RhdGVPZmZlciwge1xuICAgICAgICAgICAgYXNzZXRzX3RvX3NlbmQsXG4gICAgICAgICAgICBhc3NldHNfdG9fcmVjZWl2ZSxcbiAgICAgICAgICAgIG9mZmVyX2lkOiBvZmZlcl9pZCxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=