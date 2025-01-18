/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		4: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([121,1,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
const general_vue_1 = __importDefault(__webpack_require__(123));
const index_vue_1 = __importDefault(__webpack_require__(124));
const index_vue_2 = __importDefault(__webpack_require__(128));
const statistics_vue_1 = __importDefault(__webpack_require__(78));
const export_import_vue_1 = __importDefault(__webpack_require__(135));
const message_vue_1 = __importDefault(__webpack_require__(79));
const index_vue_3 = __importDefault(__webpack_require__(80));
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    components: {
        General: general_vue_1.default,
        Isolation: index_vue_1.default,
        Advanced: index_vue_2.default,
        Statistics: statistics_vue_1.default,
        ExportImport: export_import_vue_1.default,
        Message: message_vue_1.default,
        Glossary: index_vue_3.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            installed: false,
        };
    },
    async mounted() {
        if (window.location.search === '?installed') {
            this.installed = true;
        }
        this.initTabs();
        browser.runtime.onMessage.addListener((message) => {
            if (typeof message !== 'object') {
                return;
            }
            if (message.info &&
                message.info === 'preferencesUpdated' &&
                (!message.fromTabId || message.fromTabId !== this.app.currentTab.id)) {
                this.$root.$emit('initialize');
            }
        });
    },
    methods: {
        initTabs() {
            $('.menu .item').tab({
                history: true,
                historyType: 'hash',
            });
            let stateChanged = false;
            $.address.change(() => (stateChanged = true));
            setTimeout(() => {
                if (!stateChanged) {
                    // looks like jquery.address fired before tabs mounted, retrigger
                    const hash = document.location.hash;
                    $.address.value('_');
                    $.address.value(hash.replace('#/', ''));
                }
            }, 100);
        },
    },
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
const shared_1 = __webpack_require__(5);
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            preferences: this.app.preferences,
            permissions: this.app.permissions,
            initialized: false,
            show: false,
            containerColors: shared_1.CONTAINER_COLORS.map((containerColor) => ({
                id: containerColor,
                text: this.t(`optionsGeneralContainerColor${containerColor.capitalize()}`),
            })),
            containerIcons: shared_1.CONTAINER_ICONS.map((containerIcon) => ({
                id: containerIcon,
                text: this.t(`optionsGeneralContainerIcon${containerIcon.capitalize()}`),
            })),
            toolbarIconColors: shared_1.TOOLBAR_ICON_COLORS.map((toolbarIconColor) => ({
                id: toolbarIconColor,
                text: this.t(`optionsGeneralToolbarIconColor${toolbarIconColor
                    .capitalize()
                    .replace('-s', 'S')}`),
            })),
        };
    },
    async mounted() {
        $('#general .ui.dropdown').dropdown();
        $('#general .ui.checkbox').checkbox();
        $('#containerColorRandomExcluded').dropdown({
            placeholder: 'Select colors to exclude from random selection',
            values: this.containerColors.map((color) => ({
                name: color.text,
                value: color.id,
                selected: !!this.preferences.container.colorRandomExcluded.includes(color.id),
            })),
            maxSelections: this.containerColors.length - 2,
            onAdd: (addedColor) => {
                if (this.preferences.container.colorRandomExcluded.includes(addedColor)) {
                    return;
                }
                this.preferences.container.colorRandomExcluded.push(addedColor);
            },
            onRemove: (removedColor) => {
                this.$delete(this.preferences.container.colorRandomExcluded, this.preferences.container.colorRandomExcluded.findIndex((excludedColor) => excludedColor === removedColor));
            },
        });
        $('#containerIconRandomExcluded').dropdown({
            placeholder: 'Select icons to exclude from random selection',
            values: this.containerIcons.map((icon) => {
                return {
                    name: icon.text,
                    value: icon.id,
                    selected: !!this.preferences.container.iconRandomExcluded.includes(icon.id),
                };
            }),
            maxSelections: this.containerIcons.length - 2,
            onAdd: (addedIcon) => {
                if (this.preferences.container.iconRandomExcluded.includes(addedIcon)) {
                    return;
                }
                this.preferences.container.iconRandomExcluded.push(addedIcon);
            },
            onRemove: (removedIcon) => {
                this.$delete(this.preferences.container.iconRandomExcluded, this.preferences.container.iconRandomExcluded.findIndex((excludedIcon) => excludedIcon === removedIcon));
            },
        });
        this.show = true;
    },
    methods: {
        resetContainerNumber() {
            if (!window.confirm(`
        Reset current number ${this.app.storage.tempContainerCounter} to 0?
      `)) {
                return;
            }
            browser.runtime.sendMessage({
                method: 'resetContainerNumber',
            });
            this.app.storage.tempContainerCounter = 0;
        },
    },
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(1));
const global_vue_1 = __importDefault(__webpack_require__(74));
const perdomain_vue_1 = __importDefault(__webpack_require__(76));
exports.default = vue_1.default.extend({
    components: {
        Global: global_vue_1.default,
        PerDomain: perdomain_vue_1.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
});


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(1));
const general_vue_1 = __importDefault(__webpack_require__(129));
const cookies_vue_1 = __importDefault(__webpack_require__(132));
const scripts_vue_1 = __importDefault(__webpack_require__(133));
const deletehistory_vue_1 = __importDefault(__webpack_require__(134));
exports.default = vue_1.default.extend({
    components: {
        General: general_vue_1.default,
        Cookies: cookies_vue_1.default,
        Scripts: scripts_vue_1.default,
        DeleteHistory: deletehistory_vue_1.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
});


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
const domainpattern_vue_1 = __importDefault(__webpack_require__(6));
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    components: {
        DomainPattern: domainpattern_vue_1.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            preferences: this.app.preferences,
            permissions: this.app.permissions,
            excludeDomainPattern: '',
        };
    },
    async mounted() {
        $('#advancedGeneral .ui.dropdown').dropdown();
        $('#advancedGeneral .ui.checkbox').checkbox();
        $('#advancedGeneral .ui.accordion').accordion({ exclusive: false });
        $('#advancedIgnoreRequestsForm').form({
            fields: {
                advancedIgnoreRequestsPattern: 'empty',
            },
            onSuccess: (event) => {
                event.preventDefault();
                if (!this.preferences.ignoreRequests.includes(this.excludeDomainPattern)) {
                    this.preferences.ignoreRequests.push(this.excludeDomainPattern);
                }
                this.excludeDomainPattern = '';
            },
        });
    },
    methods: {
        async resetStorage() {
            if (!window.confirm(`
        Wipe storage and reset it to default?\n
        This can't be undone.
      `)) {
                return;
            }
            let resetError;
            let reset = false;
            try {
                reset = await browser.runtime.sendMessage({
                    method: 'resetStorage',
                });
            }
            catch (error) {
                console.error('[resetStorage] failed', error);
                resetError = error;
            }
            if (!reset) {
                this.$root.$emit('showError', `Storage reset failed
          ${resetError ? `: ${resetError}` : ''}
        `);
            }
            else {
                this.$root.$emit('initialize', {
                    showMessage: 'Storage successfully reset',
                });
            }
        },
        removeIgnoredDomain(ignoredPattern) {
            this.preferences.ignoreRequests = this.preferences.ignoreRequests.filter((_ignoredPattern) => ignoredPattern !== _ignoredPattern);
        },
    },
});


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(131);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(8).default
var update = add("124bacad", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const domainpattern_vue_1 = __importDefault(__webpack_require__(6));
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
const cookieDefaults = {
    domain: '',
    expirationDate: '',
    firstPartyDomain: '',
    httpOnly: '',
    name: '',
    path: '',
    sameSite: '',
    secure: '',
    url: '',
    value: '',
};
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    components: {
        DomainPattern: domainpattern_vue_1.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            preferences: this.app.preferences,
            domainPattern: '',
            domainPatternDisabled: false,
            cookie: this.clone(cookieDefaults),
            editing: false,
            editingIndex: -1,
        };
    },
    mounted() {
        $('#cookieForm').form({
            fields: {
                cookieDomainPattern: 'empty',
                cookieUrl: 'empty',
            },
            onSuccess: (event) => {
                event.preventDefault();
                if (!this.editing) {
                    this.addCookie();
                }
                else {
                    this.saveCookie();
                }
            },
        });
        this.$nextTick(() => {
            $('#cookieForm .ui.accordion').accordion();
            $('#cookieForm .ui.dropdown').dropdown();
            $('#cookieForm .ui.checkbox').checkbox();
        });
    },
    methods: {
        addCookie() {
            const domain = this.preferences.cookies.domain;
            if (!domain[this.domainPattern]) {
                this.$set(domain, this.domainPattern, []);
            }
            domain[this.domainPattern].unshift({ ...this.cookie });
            this.resetForm();
        },
        saveCookie() {
            if (!this.editing) {
                return;
            }
            this.$set(this.preferences.cookies.domain[this.domainPattern], this.editingIndex, {
                ...this.cookie,
            });
            this.resetForm();
        },
        editCookie(cookieDomainPattern, index) {
            if (!this.preferences.cookies.domain[cookieDomainPattern][index]) {
                return;
            }
            this.domainPatternDisabled = true;
            this.editing = true;
            this.editingIndex = index;
            this.domainPattern = cookieDomainPattern;
            this.cookie = this.preferences.cookies.domain[cookieDomainPattern][index];
            this.resetDropdowns();
        },
        removeCookie(cookiesDomainPattern, index) {
            if (!window.confirm('Remove cookie?')) {
                return;
            }
            this.preferences.cookies.domain[cookiesDomainPattern].splice(index, 1);
            if (!this.preferences.cookies.domain[cookiesDomainPattern].length) {
                this.$delete(this.preferences.cookies.domain, cookiesDomainPattern);
            }
        },
        cookieKeys(domainCookie) {
            return Object.keys(this.cookie).filter((key) => domainCookie[key]);
        },
        cookieMouseEnter(event) {
            event.target.classList.add('red');
        },
        cookieMouseLeave(event) {
            event.target.classList.remove('red');
        },
        resetForm() {
            this.editing = false;
            this.domainPattern = '';
            this.domainPatternDisabled = false;
            this.cookie = this.clone(cookieDefaults);
            this.resetDropdowns();
            $('#cookieAccordion').accordion('close', 0);
        },
        resetDropdowns() {
            $('#cookieForm .ui.dropdown').dropdown('destroy');
            this.$nextTick(() => {
                $('#cookieForm .ui.dropdown').dropdown();
            });
        },
    },
});


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const domainpattern_vue_1 = __importDefault(__webpack_require__(6));
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
const scriptDefauls = {
    code: '',
    runAt: 'document_idle',
};
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    components: {
        DomainPattern: domainpattern_vue_1.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            preferences: this.app.preferences,
            domainPattern: '',
            domainPatternDisabled: false,
            script: this.clone(scriptDefauls),
            editing: false,
            editingIndex: -1,
        };
    },
    mounted() {
        $('#scriptForm').form({
            fields: {
                scriptDomainPattern: 'empty',
                scriptCode: 'empty',
            },
            onSuccess: (event) => {
                event.preventDefault();
                if (!this.editing) {
                    this.addScript();
                }
                else {
                    this.saveScript();
                }
            },
        });
        $('#scriptForm .ui.dropdown').dropdown();
        $('#scriptForm .ui.checkbox').checkbox();
    },
    methods: {
        addScript() {
            const domain = this.preferences.scripts.domain;
            if (!domain[this.domainPattern]) {
                this.$set(domain, this.domainPattern, []);
            }
            domain[this.domainPattern].unshift({ ...this.script });
            this.resetForm();
        },
        saveScript() {
            if (!this.editing) {
                return;
            }
            this.$set(this.preferences.scripts.domain[this.domainPattern], this.editingIndex, {
                ...this.script,
            });
            this.resetForm();
        },
        editScript(scriptDomainPattern, index) {
            if (!this.preferences.scripts.domain[scriptDomainPattern][index]) {
                return;
            }
            this.domainPatternDisabled = true;
            this.editing = true;
            this.editingIndex = index;
            this.domainPattern = scriptDomainPattern;
            this.script = this.preferences.scripts.domain[scriptDomainPattern][index];
            this.resetDropdowns();
        },
        removeScript(scriptDomainPattern, index) {
            if (!window.confirm('Remove script?')) {
                return;
            }
            this.preferences.scripts.domain[scriptDomainPattern].splice(index, 1);
            if (!this.preferences.scripts.domain[scriptDomainPattern].length) {
                this.$delete(this.preferences.scripts.domain, scriptDomainPattern);
            }
        },
        resetForm() {
            this.editing = false;
            this.domainPattern = '';
            this.domainPatternDisabled = false;
            this.script = this.clone(scriptDefauls);
            this.resetDropdowns();
        },
        resetDropdowns() {
            $('#scriptForm .ui.dropdown').dropdown('destroy');
            this.$nextTick(() => {
                $('#scriptForm .ui.dropdown').dropdown();
            });
        },
    },
});


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(1));
exports.default = vue_1.default.extend({
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            preferences: this.app.preferences,
        };
    },
    mounted() {
        $('#advancedDeletesHistory .ui.checkbox').checkbox();
        $('#advancedDeletesHistory .ui.dropdown').dropdown();
    },
});


/***/ }),
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            preferences: this.app.preferences,
            permissions: this.app.permissions,
            lastSyncExport: false,
            lastFileExport: false,
            download: false,
            addonVersion: browser.runtime.getManifest().version,
        };
    },
    async mounted() {
        const { export: importPreferences } = await browser.storage.sync.get('export');
        if (importPreferences) {
            this.lastSyncExport = {
                date: importPreferences.date,
                version: importPreferences.version,
            };
        }
        const { lastFileExport } = await browser.storage.local.get('lastFileExport');
        if (lastFileExport) {
            this.lastFileExport = lastFileExport;
        }
        browser.storage.onChanged.addListener((changes, areaName) => {
            if (areaName !== 'sync' || !changes.export || !changes.export.newValue) {
                return;
            }
            this.lastSyncExport = {
                date: changes.export.newValue.date,
                version: changes.export.newValue.version,
            };
        });
        if (this.permissions.downloads) {
            this.addDownloadListener();
        }
    },
    methods: {
        getPreferences() {
            const preferences = this.clone(this.preferences);
            preferences.isolation.global.excludedContainers = [];
            return {
                version: browser.runtime.getManifest().version,
                date: Date.now(),
                preferences,
            };
        },
        async exportPreferences() {
            if (!this.permissions.downloads) {
                this.permissions.downloads = await browser.permissions.request({
                    permissions: ['downloads'],
                });
                if (!this.permissions.downloads) {
                    return;
                }
                this.addDownloadListener();
            }
            const preferences = this.getPreferences();
            const exportedPreferences = JSON.stringify(preferences, null, 2);
            const date = new Date(preferences.date);
            const dateString = [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
            ]
                .map((s) => s.toString().padStart(2, '0'))
                .join('-');
            const timeString = [date.getHours(), date.getMinutes(), date.getSeconds()]
                .map((s) => s.toString().padStart(2, '0'))
                .join('.');
            const blob = new Blob([exportedPreferences], {
                type: 'application/json',
            });
            const url = URL.createObjectURL(blob);
            try {
                this.download = {
                    id: await browser.downloads.download({
                        url,
                        filename: `temporary_containers_preferences_${dateString}_${timeString}.json`,
                        saveAs: true,
                    }),
                    date: preferences.date,
                    version: preferences.version,
                };
            }
            catch (error) {
                this.$root.$emit('showError', `Exporting to file failed: ${error.toString()}`, { close: true });
            }
        },
        async exportPreferencesSync() {
            try {
                const { export: importPreferences } = await browser.storage.sync.get('export');
                if (importPreferences &&
                    !window.confirm(`
          There's already an export in Firefox Sync:\n
          Date: ${new Date(importPreferences.date).toLocaleString()}\n
          Version: ${importPreferences.version}\n\n
          Overwrite Firefox Sync export?\n
        `)) {
                    return;
                }
                await browser.storage.sync.set({
                    export: this.getPreferences(),
                });
                this.$root.$emit('showMessage', 'Successfully exported to Firefox Sync');
            }
            catch (error) {
                this.$root.$emit('showError', `Exporting to Firefox Sync failed: ${error.toString()}`);
            }
        },
        async importPreferencesSync() {
            try {
                const { export: importPreferences } = await browser.storage.sync.get('export');
                if (!importPreferences || !Object.keys(importPreferences).length) {
                    this.$root.$emit('showError', 'No preferences found in Firefox Sync', { close: true });
                    return;
                }
                if (this.confirmedImportPreferences(importPreferences)) {
                    this.saveImportedPreferences(importPreferences);
                }
            }
            catch (error) {
                this.$root.$emit('showError', `Importing from Firefox Sync failed: ${error.toString()}`);
            }
        },
        confirmedImportPreferences(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        importPreferences, fileName) {
            return window.confirm(`
        ${fileName
                ? `Import preferences from ${fileName}?`
                : 'Import preferences?'}\n
        Date: ${new Date(importPreferences.date).toLocaleString()}\n
        Version: ${importPreferences.version}\n\n
        All existing preferences are overwritten.
      `);
        },
        async importPreferences({ target, }) {
            const [file] = target.files;
            if (!file) {
                return;
            }
            const importPreferences = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = async (event) => {
                    try {
                        if (!event.target || typeof event.target.result !== 'string') {
                            throw new Error('invalid input');
                        }
                        resolve(JSON.parse(event.target.result));
                    }
                    catch (error) {
                        console.error('error while importing preferences', error);
                        this.$root.$emit('showError', 'Error while importing preferences!');
                    }
                };
            });
            if (this.confirmedImportPreferences(importPreferences, file.name)) {
                this.saveImportedPreferences(importPreferences);
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async saveImportedPreferences(importedPreferences) {
            // firefox can't request permissions after async calls in user input handlers
            if (!this.permissions.notifications) {
                importedPreferences.preferences.notifications = false;
            }
            if (!this.permissions.bookmarks) {
                importedPreferences.preferences.contextMenuBookmarks = false;
                importedPreferences.preferences.deletesHistory.contextMenuBookmarks = false;
            }
            if (!this.permissions.history) {
                importedPreferences.preferences.deletesHistory.active = false;
            }
            if (!this.permissions.webNavigation) {
                importedPreferences.preferences.scripts.active = false;
            }
            await browser.runtime.sendMessage({
                method: 'importPreferences',
                payload: {
                    preferences: importedPreferences.preferences,
                    previousVersion: importedPreferences.version,
                },
            });
            this.$root.$emit('initialize', { showMessage: 'Preferences imported.' });
        },
        async wipePreferencesSync() {
            if (!window.confirm(`
        Wipe Firefox sync export?\n
        This can't be undone.
      `)) {
                return;
            }
            try {
                await browser.storage.sync.clear();
                this.lastSyncExport = false;
                this.$root.$emit('showMessage', 'Successfully wiped Firefox Sync export');
            }
            catch (error) {
                this.$root.$emit('showError', `Wiping Firefox Sync failed: ${error.toString()}`);
            }
        },
        addDownloadListener() {
            browser.downloads.onChanged.addListener(async (downloadDelta) => {
                console.log('downloadDelta', downloadDelta);
                if (!this.download ||
                    this.download.id !== downloadDelta.id ||
                    !downloadDelta.state ||
                    downloadDelta.state.current !== 'complete') {
                    return;
                }
                const lastFileExport = {
                    date: this.download.date,
                    version: this.download.version,
                };
                this.lastFileExport = lastFileExport;
                this.download = false;
                browser.runtime.sendMessage({
                    method: 'lastFileExport',
                    payload: { lastFileExport },
                });
            });
        },
    },
});


/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(140);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(8).default
var update = add("70b8ebe9", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/options.vue?vue&type=template&id=1f34fc12&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ui container", attrs: { id: "container" } },
    [
      !_vm.app.initialized ? _c("message") : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.app.initialized,
              expression: "app.initialized"
            }
          ]
        },
        [
          _c("div", { staticClass: "ui menu" }, [
            _c("a", { staticClass: "item", attrs: { "data-tab": "general" } }, [
              _c("i", {
                staticClass: "icon-cog-alt",
                staticStyle: { "margin-right": "5px" }
              }),
              _vm._v("\n        " + _vm._s(_vm.t("optionsNavGeneral")))
            ]),
            _vm._v(" "),
            _c(
              "a",
              { staticClass: "item", attrs: { "data-tab": "isolation" } },
              [
                _c("i", {
                  staticClass: "icon-circle-empty",
                  staticStyle: { "margin-right": "2px" }
                }),
                _vm._v("\n        " + _vm._s(_vm.t("optionsNavIsolation")))
              ]
            ),
            _vm._v(" "),
            _c(
              "a",
              { staticClass: "item", attrs: { "data-tab": "advanced" } },
              [
                _c("i", {
                  staticClass: "graduation cap icon",
                  staticStyle: { "margin-right": "5px" }
                }),
                _vm._v("\n        " + _vm._s(_vm.t("optionsNavAdvanced")))
              ]
            ),
            _vm._v(" "),
            _c(
              "a",
              { staticClass: "item", attrs: { "data-tab": "statistics" } },
              [
                _c("i", {
                  staticClass: "icon-chart-bar",
                  staticStyle: { "margin-right": "5px" }
                }),
                _vm._v("\n        " + _vm._s(_vm.t("optionsNavStatistics")))
              ]
            ),
            _vm._v(" "),
            _c(
              "a",
              { staticClass: "item", attrs: { "data-tab": "export-import" } },
              [
                _c("i", {
                  staticClass: "save icon",
                  staticStyle: { "margin-right": "5px" }
                }),
                _vm._v(
                  "\n        " +
                    _vm._s(_vm.t("optionsNavExportImport")) +
                    "\n      "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c("message"),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "ui tab segment", attrs: { "data-tab": "general" } },
            [
              _vm.app.initialized
                ? _c("general", { attrs: { app: _vm.app } })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "ui tab segment",
              attrs: { "data-tab": "isolation" }
            },
            [_c("isolation", { attrs: { app: _vm.app } })],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "ui tab segment",
              attrs: { "data-tab": "advanced" }
            },
            [_c("advanced", { attrs: { app: _vm.app } })],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "ui tab segment",
              attrs: { "data-tab": "statistics" }
            },
            [
              _vm.app.initialized
                ? _c("statistics", { attrs: { app: _vm.app } })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "ui tab segment",
              attrs: { "data-tab": "export-import" }
            },
            [
              _vm.app.initialized
                ? _c("export-import", { attrs: { app: _vm.app } })
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("glossary", { attrs: { app: _vm.app } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/options.vue?vue&type=template&id=1f34fc12&


/***/ }),
/* 55 */,
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/general.vue?vue&type=template&id=3919cf41&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      attrs: { id: "general" }
    },
    [
      _c("div", { staticClass: "ui form" }, [
        _c(
          "div",
          { staticClass: "field", attrs: { id: "automaticModeField" } },
          [
            _c("div", { staticClass: "ui checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.preferences.automaticMode.active,
                    expression: "preferences.automaticMode.active"
                  }
                ],
                attrs: { id: "automaticMode", type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.preferences.automaticMode.active)
                    ? _vm._i(_vm.preferences.automaticMode.active, null) > -1
                    : _vm.preferences.automaticMode.active
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.preferences.automaticMode.active,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.preferences.automaticMode,
                            "active",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.preferences.automaticMode,
                            "active",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.preferences.automaticMode, "active", $$c)
                    }
                  }
                }
              }),
              _vm._v(" "),
              _c("label", [
                _c("span", {
                  attrs: {
                    "data-glossary": "Automatic Mode",
                    "data-glossary-label": _vm.t("automaticMode")
                  }
                })
              ])
            ])
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "field", attrs: { id: "popupField" } }, [
          _c("div", { staticClass: "ui checkbox" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.preferences.browserActionPopup,
                  expression: "preferences.browserActionPopup"
                }
              ],
              attrs: { id: "browserActionPopup", type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.preferences.browserActionPopup)
                  ? _vm._i(_vm.preferences.browserActionPopup, null) > -1
                  : _vm.preferences.browserActionPopup
              },
              on: {
                change: function($event) {
                  var $$a = _vm.preferences.browserActionPopup,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 &&
                        _vm.$set(
                          _vm.preferences,
                          "browserActionPopup",
                          $$a.concat([$$v])
                        )
                    } else {
                      $$i > -1 &&
                        _vm.$set(
                          _vm.preferences,
                          "browserActionPopup",
                          $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                        )
                    }
                  } else {
                    _vm.$set(_vm.preferences, "browserActionPopup", $$c)
                  }
                }
              }
            }),
            _vm._v(" "),
            _vm._m(0)
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c(
            "div",
            { staticClass: "ui checkbox", attrs: { id: "notifications" } },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.preferences.notifications,
                    expression: "preferences.notifications"
                  }
                ],
                attrs: { id: "notificationsCheckbox", type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.preferences.notifications)
                    ? _vm._i(_vm.preferences.notifications, null) > -1
                    : _vm.preferences.notifications
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.preferences.notifications,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.preferences,
                            "notifications",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.preferences,
                            "notifications",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.preferences, "notifications", $$c)
                    }
                  }
                }
              }),
              _vm._v(" "),
              _c("label", [
                _vm._v(_vm._s(_vm.t("optionsGeneralNotifications")))
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("label", [
            _vm._v(_vm._s(_vm.t("optionsGeneralContainerNamePrefix")))
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.preferences.container.namePrefix,
                expression: "preferences.container.namePrefix"
              }
            ],
            attrs: { id: "containerNamePrefix", type: "text" },
            domProps: { value: _vm.preferences.container.namePrefix },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(
                  _vm.preferences.container,
                  "namePrefix",
                  $event.target.value
                )
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field", attrs: { id: "containerColor" } }, [
          !_vm.preferences.container.colorRandom
            ? _c("label", [
                _vm._v(
                  "\n        " +
                    _vm._s(_vm.t("optionsGeneralContainerColor")) +
                    "\n      "
                )
              ])
            : _c("label", [
                _vm._v(
                  "\n        Container Colors excluded from random selection\n      "
                )
              ]),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.preferences.container.colorRandom,
                  expression: "!preferences.container.colorRandom"
                }
              ]
            },
            [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.container.color,
                      expression: "preferences.container.color"
                    }
                  ],
                  staticClass: "ui fluid dropdown",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.preferences.container,
                        "color",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                _vm._l(_vm.containerColors, function(containerColor) {
                  return _c(
                    "option",
                    {
                      key: containerColor.id,
                      domProps: { value: containerColor.id }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(containerColor.text) +
                          "\n          "
                      )
                    ]
                  )
                }),
                0
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.preferences.container.colorRandom,
                  expression: "preferences.container.colorRandom"
                }
              ],
              staticClass: "ui dropdown fluid selection multiple",
              attrs: { id: "containerColorRandomExcluded" }
            },
            [
              _c("div", { staticClass: "text" }),
              _vm._v(" "),
              _c("i", { staticClass: "dropdown icon" })
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("div", { staticClass: "ui checkbox" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.preferences.container.colorRandom,
                  expression: "preferences.container.colorRandom"
                }
              ],
              attrs: { id: "containerColorRandom", type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.preferences.container.colorRandom)
                  ? _vm._i(_vm.preferences.container.colorRandom, null) > -1
                  : _vm.preferences.container.colorRandom
              },
              on: {
                change: function($event) {
                  var $$a = _vm.preferences.container.colorRandom,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 &&
                        _vm.$set(
                          _vm.preferences.container,
                          "colorRandom",
                          $$a.concat([$$v])
                        )
                    } else {
                      $$i > -1 &&
                        _vm.$set(
                          _vm.preferences.container,
                          "colorRandom",
                          $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                        )
                    }
                  } else {
                    _vm.$set(_vm.preferences.container, "colorRandom", $$c)
                  }
                }
              }
            }),
            _vm._v(" "),
            _c("label", [
              _vm._v(_vm._s(_vm.t("optionsGeneralContainerRandomColor")))
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field", attrs: { id: "containerIcon" } }, [
          !_vm.preferences.container.iconRandom
            ? _c("label", [
                _vm._v(
                  "\n        " +
                    _vm._s(_vm.t("optionsGeneralContainerIcon")) +
                    "\n      "
                )
              ])
            : _c("label", [
                _vm._v(
                  "\n        Container Icons excluded from random selection\n      "
                )
              ]),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.preferences.container.iconRandom,
                  expression: "!preferences.container.iconRandom"
                }
              ]
            },
            [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.container.icon,
                      expression: "preferences.container.icon"
                    }
                  ],
                  staticClass: "ui fluid dropdown",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.preferences.container,
                        "icon",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                _vm._l(_vm.containerIcons, function(containerIcon) {
                  return _c(
                    "option",
                    {
                      key: containerIcon.id,
                      domProps: { value: containerIcon.id }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(containerIcon.text) +
                          "\n          "
                      )
                    ]
                  )
                }),
                0
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.preferences.container.iconRandom,
                  expression: "preferences.container.iconRandom"
                }
              ],
              staticClass: "ui dropdown fluid selection multiple",
              attrs: { id: "containerIconRandomExcluded" }
            },
            [
              _c("div", { staticClass: "text" }),
              _vm._v(" "),
              _c("i", { staticClass: "dropdown icon" })
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("div", { staticClass: "ui checkbox" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.preferences.container.iconRandom,
                  expression: "preferences.container.iconRandom"
                }
              ],
              attrs: { id: "containerIconRandom", type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.preferences.container.iconRandom)
                  ? _vm._i(_vm.preferences.container.iconRandom, null) > -1
                  : _vm.preferences.container.iconRandom
              },
              on: {
                change: function($event) {
                  var $$a = _vm.preferences.container.iconRandom,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 &&
                        _vm.$set(
                          _vm.preferences.container,
                          "iconRandom",
                          $$a.concat([$$v])
                        )
                    } else {
                      $$i > -1 &&
                        _vm.$set(
                          _vm.preferences.container,
                          "iconRandom",
                          $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                        )
                    }
                  } else {
                    _vm.$set(_vm.preferences.container, "iconRandom", $$c)
                  }
                }
              }
            }),
            _vm._v(" "),
            _c("label", [
              _vm._v(_vm._s(_vm.t("optionsGeneralContainerIconRandom")))
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("label", [_vm._v(_vm._s(_vm.t("optionsGeneralContainerNumber")))]),
          _vm._v(" "),
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.preferences.container.numberMode,
                  expression: "preferences.container.numberMode"
                }
              ],
              staticClass: "ui fluid dropdown",
              attrs: { id: "containerNumberMode" },
              on: {
                change: function($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function(o) {
                      return o.selected
                    })
                    .map(function(o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.$set(
                    _vm.preferences.container,
                    "numberMode",
                    $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                  )
                }
              }
            },
            [
              _c("option", { attrs: { value: "keep" } }, [
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.t("optionsGeneralContainerNumberKeepCounting")) +
                    "\n        "
                )
              ]),
              _vm._v(" "),
              _c("option", { attrs: { value: "keepuntilrestart" } }, [
                _vm._v(
                  "\n          " +
                    _vm._s(
                      _vm.t(
                        "optionsGeneralContainerNumberKeepCountingUntilRestart"
                      )
                    ) +
                    "\n        "
                )
              ]),
              _vm._v(" "),
              _c("option", { attrs: { value: "reuse" } }, [
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.t("optionsGeneralContainerNumberReuseNumbers")) +
                    "\n        "
                )
              ]),
              _vm._v(" "),
              _c("option", { attrs: { value: "hide" } }, [
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.t("optionsGeneralContainerNumberHide")) +
                    "\n        "
                )
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _vm._v(
            "\n      " + _vm._s(_vm.app.tempContainerCounter) + "\n      "
          ),
          _vm.preferences.container.numberMode === "keep" &&
          _vm.app.storage.tempContainerCounter > 0
            ? _c("div", [
                _c(
                  "button",
                  {
                    staticClass: "ui tiny button",
                    on: {
                      click: function($event) {
                        return _vm.resetContainerNumber()
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n          Reset current number " +
                        _vm._s(_vm.app.storage.tempContainerCounter) +
                        " to 0\n        "
                    )
                  ]
                )
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "field",
            attrs: {
              "data-tooltip": _vm.t("optionsGeneralContainerRemovalTooltip")
            }
          },
          [
            _c("label", [
              _vm._v(_vm._s(_vm.t("optionsGeneralContainerRemoval")))
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.preferences.container.removal,
                    expression: "preferences.container.removal"
                  }
                ],
                staticClass: "ui fluid dropdown",
                attrs: { id: "containerRemoval" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.preferences.container,
                      "removal",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { domProps: { value: 900000 } }, [
                  _vm._v(
                    "\n          " +
                      _vm._s(_vm.t("optionsGeneralContainerRemoval15Minutes")) +
                      "\n        "
                  )
                ]),
                _vm._v(" "),
                _c("option", { domProps: { value: 300000 } }, [
                  _vm._v(
                    "\n          " +
                      _vm._s(_vm.t("optionsGeneralContainerRemoval5Minutes")) +
                      "\n        "
                  )
                ]),
                _vm._v(" "),
                _c("option", { domProps: { value: 120000 } }, [
                  _vm._v(
                    "\n          " +
                      _vm._s(_vm.t("optionsGeneralContainerRemoval2Minutes")) +
                      "\n        "
                  )
                ]),
                _vm._v(" "),
                _c("option", { domProps: { value: 0 } }, [
                  _vm._v(
                    "\n          " +
                      _vm._s(_vm.t("optionsGeneralContainerRemovalInstant")) +
                      "\n        "
                  )
                ])
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "field",
            attrs: {
              "data-tooltip": _vm.t("optionsGeneralToolbarIconColorTooltip")
            }
          },
          [
            _c("label", [
              _vm._v(_vm._s(_vm.t("optionsGeneralToolbarIconColor")))
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.preferences.iconColor,
                    expression: "preferences.iconColor"
                  }
                ],
                staticClass: "ui fluid dropdown",
                attrs: { id: "iconColor" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.preferences,
                      "iconColor",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              _vm._l(_vm.toolbarIconColors, function(toolbarIconColor) {
                return _c(
                  "option",
                  {
                    key: toolbarIconColor.id,
                    domProps: { value: toolbarIconColor.id }
                  },
                  [
                    _vm._v(
                      "\n          " +
                        _vm._s(toolbarIconColor.text) +
                        "\n        "
                    )
                  ]
                )
              }),
              0
            )
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("span", {
        attrs: {
          id: "popupbug",
          "data-glossary": "Toolbar Popup",
          "data-glossary-label": "Show popup when clicking the toolbar icon"
        }
      })
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/general.vue?vue&type=template&id=3919cf41&


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/isolation/index.vue?vue&type=template&id=978c99ac&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.app.initialized,
          expression: "app.initialized"
        }
      ]
    },
    [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ui bottom attached active tab segment",
          attrs: { "data-tab": "isolation/global" }
        },
        [
          _vm.app.initialized
            ? _c("global", { attrs: { app: _vm.app } })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ui bottom attached tab segment",
          attrs: { "data-tab": "isolation/perdomain" }
        },
        [
          _vm.app.initialized
            ? _c("per-domain", { attrs: { app: _vm.app } })
            : _vm._e()
        ],
        1
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui top attached tabular menu" }, [
      _c(
        "a",
        {
          staticClass: "active item",
          attrs: { "data-tab": "isolation/global" }
        },
        [_c("span", { attrs: { "data-glossary": "Global" } })]
      ),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "item", attrs: { "data-tab": "isolation/perdomain" } },
        [_c("span", { attrs: { "data-glossary": "Per Domain" } })]
      )
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/isolation/index.vue?vue&type=template&id=978c99ac&


/***/ }),
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/advanced/index.vue?vue&type=template&id=0d8a39dc&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.app.initialized,
          expression: "app.initialized"
        }
      ]
    },
    [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ui bottom attached active tab segment",
          attrs: { "data-tab": "advanced/general" }
        },
        [
          _vm.app.initialized
            ? _c("general", { attrs: { app: _vm.app } })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ui bottom attached tab segment",
          attrs: { "data-tab": "advanced/cookies" }
        },
        [
          _vm.app.initialized
            ? _c("cookies", { attrs: { app: _vm.app } })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ui bottom attached tab segment",
          attrs: { "data-tab": "advanced/scripts" }
        },
        [
          _vm.app.initialized
            ? _c("scripts", { attrs: { app: _vm.app } })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ui bottom attached tab segment",
          attrs: { "data-tab": "advanced/deletehistory" }
        },
        [
          _vm.app.initialized
            ? _c("delete-history", { attrs: { app: _vm.app } })
            : _vm._e()
        ],
        1
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui top attached tabular menu" }, [
      _c(
        "a",
        {
          staticClass: "active item",
          attrs: { "data-tab": "advanced/general" }
        },
        [_vm._v("\n      General\n    ")]
      ),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "item", attrs: { "data-tab": "advanced/cookies" } },
        [_vm._v("\n      Cookies\n    ")]
      ),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "item", attrs: { "data-tab": "advanced/scripts" } },
        [_vm._v("\n      Scripts\n    ")]
      ),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "item",
          attrs: { "data-tab": "advanced/deletehistory" }
        },
        [_vm._v("\n      Delete History\n    ")]
      )
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/advanced/index.vue?vue&type=template&id=0d8a39dc&


/***/ }),
/* 61 */,
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/export-import.vue?vue&type=template&id=549ebe77&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ui form" }, [
    _c("div", { staticClass: "ui two column very relaxed grid" }, [
      _c("div", { staticClass: "column" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "ui small notice message" }, [
          _vm._v(
            "\n        Preferences that include permanent containers are stripped from the\n        export since it's not possible to make sure that those containers\n        exist when importing, which would lead to unexpected behavior.\n        "
          ),
          _c("br"),
          _c("br"),
          _vm._v(" "),
          _c("i", [
            _vm._v("Installed Add-on version: "),
            _c("strong", [_vm._v(_vm._s(_vm.addonVersion))])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c(
            "button",
            {
              staticClass: "ui button primary",
              on: { click: _vm.exportPreferences }
            },
            [_vm._v("\n          Export to local file\n        ")]
          )
        ]),
        _vm._v(" "),
        _vm.lastFileExport
          ? _c(
              "div",
              {
                staticClass: "field",
                staticStyle: { "margin-bottom": "30px" }
              },
              [
                _c("h5", [_vm._v("Last local file export")]),
                _vm._v(" "),
                _c("div", [
                  _c("ul", [
                    _c("li", [
                      _vm._v(
                        "\n              Date: " +
                          _vm._s(
                            new Date(_vm.lastFileExport.date).toLocaleString()
                          ) +
                          "\n            "
                      )
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _vm._v("Version: " + _vm._s(_vm.lastFileExport.version))
                    ])
                  ])
                ])
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c(
            "button",
            {
              staticClass: "ui button primary",
              on: { click: _vm.exportPreferencesSync }
            },
            [_vm._v("\n          Export to Firefox Sync\n        ")]
          )
        ]),
        _vm._v(" "),
        _vm.lastSyncExport
          ? _c("div", { staticClass: "field" }, [
              _c(
                "button",
                {
                  staticClass: "ui button negative primary",
                  on: { click: _vm.wipePreferencesSync }
                },
                [_vm._v("\n          Wipe Firefox Sync export\n        ")]
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.lastSyncExport
          ? _c("div", { staticClass: "field" }, [
              _c("h5", [_vm._v("Last Firefox Sync export")]),
              _vm._v(" "),
              _c("div", [
                _c("ul", [
                  _c("li", [
                    _vm._v(
                      "\n              Date: " +
                        _vm._s(
                          new Date(_vm.lastSyncExport.date).toLocaleString()
                        ) +
                        "\n            "
                    )
                  ]),
                  _vm._v(" "),
                  _c("li", [
                    _vm._v("Version: " + _vm._s(_vm.lastSyncExport.version))
                  ])
                ])
              ])
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "column" }, [
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "ui small notice message" }, [
          _vm._v(
            "\n        Currently it's not possible to request permissions while importing, so\n        if you have notifications, bookmarks context menu, or deletes history\n        preferences in your import, those will get ignored and you have to\n        reconfigure them.\n      "
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("label", [
            _c("input", {
              staticClass: "hidden",
              attrs: { id: "importPreferences", type: "file" },
              on: { change: _vm.importPreferences }
            }),
            _vm._v(" "),
            _c("div", { staticClass: "ui button primary" }, [
              _vm._v("\n            Import from local file\n          ")
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c(
            "button",
            {
              staticClass: "ui button primary",
              on: { click: _vm.importPreferencesSync }
            },
            [_vm._v("\n          Import from Firefox Sync\n        ")]
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "field" }, [
      _c("label", [_vm._v("Export Preferences")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "field" }, [
      _c("label", [_vm._v("Import Preferences")])
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/export-import.vue?vue&type=template&id=549ebe77&


/***/ }),
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/advanced/general.vue?vue&type=template&id=11b3eb1c&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ui form", attrs: { id: "advancedGeneral" } },
    [
      _c(
        "div",
        {
          staticClass: "ui accordion",
          attrs: { id: "advancedGeneralAccordion" }
        },
        [
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "content" }, [
            _c(
              "div",
              {
                attrs: {
                  "data-tooltip": _vm.app.permissions.history
                    ? '"Deletes History Temporary Containers" always reopen new tabs to avoid leaving traces in recently closed tabs'
                    : false
                }
              },
              [
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.preferences.automaticMode.newTab,
                        expression: "preferences.automaticMode.newTab"
                      }
                    ],
                    staticClass: "ui fluid dropdown",
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.$set(
                          _vm.preferences.automaticMode,
                          "newTab",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "created" } }, [
                      _vm._v(
                        "\n            Instantly reopen new tabs in Temporary Containers. You might lose\n            the first few already typed characters in the address bar when\n            reopening takes too long, but it prevents new tabs from writing\n            and reading cookies in the default container (default)\n          "
                      )
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "navigation" } }, [
                      _vm._v(
                        "\n            Don't instantly reopen new tabs in Temporary Containers but\n            instead when new tabs start to navigate to a website. Already\n            typed characters in the address bar are never lost, but new tabs\n            can set and read cookies in the default container\n          "
                      )
                    ])
                  ]
                )
              ]
            ),
            _vm._v(" "),
            _vm.preferences.automaticMode.newTab === "navigation"
              ? _c("div", { staticClass: "ui small negative message" }, [
                  _c("strong", [_vm._v("Warning:")]),
                  _vm._v(
                    " New tabs (about:newtab and about:blank) can\n        make network requests and set cookies, as long as they're not reopened\n        in a Temporary Container, especially when you use the address bar for\n        search engines.\n        "
                  ),
                  _c("br"),
                  _vm._v(
                    '\n        If you have a Cookie-Deletion-Add-on that automatically keeps your\n        default/permanent containers clean and you use privacy-oriented\n        search-engines like Startpage.com or DuckDuckGo, then it should be no\n        problem to use the "Don\'t instantly reopen new tabs" preference.\n      '
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "m-b" })
          ]),
          _vm._v(" "),
          _vm._m(1),
          _vm._v(" "),
          _c("div", { staticClass: "content" }, [
            _c("div", { staticClass: "item field" }, [
              _c("label", [_vm._v("\n          Default Tab\n        ")]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.ui.popupDefaultTab,
                      expression: "preferences.ui.popupDefaultTab"
                    }
                  ],
                  staticClass: "ui fluid dropdown",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.preferences.ui,
                        "popupDefaultTab",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "isolation-global" } }, [
                    _vm._v("\n            Isolation Global\n          ")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "isolation-per-domain" } }, [
                    _vm._v("\n            Isolation Per Domain\n          ")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "actions" } }, [
                    _vm._v("\n            Actions\n          ")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "statistics" } }, [
                    _vm._v("\n            Statistics\n          ")
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.pageAction,
                      expression: "preferences.pageAction"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.preferences.pageAction)
                      ? _vm._i(_vm.preferences.pageAction, null) > -1
                      : _vm.preferences.pageAction
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.pageAction,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences,
                              "pageAction",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences,
                              "pageAction",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences, "pageAction", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v("Show icon in the address bar that reveals the popup")
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "m-b" })
          ]),
          _vm._v(" "),
          _vm._m(2),
          _vm._v(" "),
          _c("div", { staticClass: "content" }, [
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.contextMenu,
                      expression: "preferences.contextMenu"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.preferences.contextMenu)
                      ? _vm._i(_vm.preferences.contextMenu, null) > -1
                      : _vm.preferences.contextMenu
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.contextMenu,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences,
                              "contextMenu",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences,
                              "contextMenu",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences, "contextMenu", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v(
                    "Show Temporary Container entry in the right click on links\n            context menu"
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.contextMenuBookmarks,
                      expression: "preferences.contextMenuBookmarks"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.preferences.contextMenuBookmarks)
                      ? _vm._i(_vm.preferences.contextMenuBookmarks, null) > -1
                      : _vm.preferences.contextMenuBookmarks
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.contextMenuBookmarks,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences,
                              "contextMenuBookmarks",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences,
                              "contextMenuBookmarks",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences, "contextMenuBookmarks", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v(
                    "Show Temporary Container entry in the right click on bookmarks\n            context menu"
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "m-b" })
          ]),
          _vm._v(" "),
          _vm._m(3),
          _vm._v(" "),
          _c("div", { staticClass: "content" }, [
            _c("div", { staticClass: "ui small message" }, [
              _vm._v(
                "\n        Since Firefox 66 it's possible to reassign keyboard shortcuts on the\n        Firefox Add-ons overview page (Ctrl+Shift+A) with the top-right cog\n        icon.\n      "
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.keyboardShortcuts.AltC,
                      expression: "preferences.keyboardShortcuts.AltC"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.preferences.keyboardShortcuts.AltC
                    )
                      ? _vm._i(_vm.preferences.keyboardShortcuts.AltC, null) >
                        -1
                      : _vm.preferences.keyboardShortcuts.AltC
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.keyboardShortcuts.AltC,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltC",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltC",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences.keyboardShortcuts, "AltC", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v("Alt+C - Open a new tab in a new Temporary Container")
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "div",
                {
                  staticClass: "ui checkbox",
                  class: { hidden: !_vm.permissions.history }
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.preferences.keyboardShortcuts.AltP,
                        expression: "preferences.keyboardShortcuts.AltP"
                      }
                    ],
                    attrs: { type: "checkbox" },
                    domProps: {
                      checked: Array.isArray(
                        _vm.preferences.keyboardShortcuts.AltP
                      )
                        ? _vm._i(_vm.preferences.keyboardShortcuts.AltP, null) >
                          -1
                        : _vm.preferences.keyboardShortcuts.AltP
                    },
                    on: {
                      change: function($event) {
                        var $$a = _vm.preferences.keyboardShortcuts.AltP,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(
                                _vm.preferences.keyboardShortcuts,
                                "AltP",
                                $$a.concat([$$v])
                              )
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.preferences.keyboardShortcuts,
                                "AltP",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(
                            _vm.preferences.keyboardShortcuts,
                            "AltP",
                            $$c
                          )
                        }
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", [
                    _vm._v(
                      "Alt+P - Open a new tab in a new 'Deletes History Temporary\n            Container'"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.keyboardShortcuts.AltN,
                      expression: "preferences.keyboardShortcuts.AltN"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.preferences.keyboardShortcuts.AltN
                    )
                      ? _vm._i(_vm.preferences.keyboardShortcuts.AltN, null) >
                        -1
                      : _vm.preferences.keyboardShortcuts.AltN
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.keyboardShortcuts.AltN,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltN",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltN",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences.keyboardShortcuts, "AltN", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [_vm._v("Alt+N - Open a new 'No Container' tab")])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.keyboardShortcuts.AltShiftC,
                      expression: "preferences.keyboardShortcuts.AltShiftC"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.preferences.keyboardShortcuts.AltShiftC
                    )
                      ? _vm._i(
                          _vm.preferences.keyboardShortcuts.AltShiftC,
                          null
                        ) > -1
                      : _vm.preferences.keyboardShortcuts.AltShiftC
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.keyboardShortcuts.AltShiftC,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltShiftC",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltShiftC",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(
                          _vm.preferences.keyboardShortcuts,
                          "AltShiftC",
                          $$c
                        )
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v(
                    "Alt+Shift+C - Open a new 'No Container' tab in a new\n            window"
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.keyboardShortcuts.AltX,
                      expression: "preferences.keyboardShortcuts.AltX"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.preferences.keyboardShortcuts.AltX
                    )
                      ? _vm._i(_vm.preferences.keyboardShortcuts.AltX, null) >
                        -1
                      : _vm.preferences.keyboardShortcuts.AltX
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.keyboardShortcuts.AltX,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltX",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltX",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences.keyboardShortcuts, "AltX", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v(
                    "Alt+X - Open a new tab in the same container as the current\n            tab"
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.keyboardShortcuts.AltO,
                      expression: "preferences.keyboardShortcuts.AltO"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.preferences.keyboardShortcuts.AltO
                    )
                      ? _vm._i(_vm.preferences.keyboardShortcuts.AltO, null) >
                        -1
                      : _vm.preferences.keyboardShortcuts.AltO
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.keyboardShortcuts.AltO,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltO",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltO",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences.keyboardShortcuts, "AltO", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v(
                    "Alt+O - Open current tab URL in a new Temporary Container\n            tab"
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.keyboardShortcuts.AltI,
                      expression: "preferences.keyboardShortcuts.AltI"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.preferences.keyboardShortcuts.AltI
                    )
                      ? _vm._i(_vm.preferences.keyboardShortcuts.AltI, null) >
                        -1
                      : _vm.preferences.keyboardShortcuts.AltI
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.keyboardShortcuts.AltI,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltI",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences.keyboardShortcuts,
                              "AltI",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences.keyboardShortcuts, "AltI", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [_vm._v("Alt+I - Toggle isolation ON and OFF")])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "m-b" })
          ]),
          _vm._v(" "),
          _vm._m(4),
          _vm._v(" "),
          _c("div", { staticClass: "content" }, [
            _vm._m(5),
            _vm._v(" "),
            _c("div", { staticStyle: { "margin-left": "20px" } }, [
              !_vm.preferences.ignoreRequests.length
                ? _c("div", [
                    _vm._v("\n          No domains ignored\n        ")
                  ])
                : _c(
                    "div",
                    _vm._l(_vm.preferences.ignoreRequests, function(
                      ignoredPattern
                    ) {
                      return _c("div", { key: ignoredPattern }, [
                        _c("div", { staticStyle: { "margin-top": "5px" } }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticStyle: { color: "red", cursor: "pointer" },
                            attrs: { "data-tooltip": "Remove" },
                            on: {
                              click: function($event) {
                                return _vm.removeIgnoredDomain(ignoredPattern)
                              }
                            }
                          },
                          [_c("i", { staticClass: "icon-trash-empty" })]
                        ),
                        _vm._v(
                          "\n            " +
                            _vm._s(ignoredPattern) +
                            "\n          "
                        )
                      ])
                    }),
                    0
                  )
            ]),
            _vm._v(" "),
            _c(
              "form",
              {
                staticClass: "ui form",
                staticStyle: { "margin-left": "20px", "margin-top": "20px" },
                attrs: { id: "advancedIgnoreRequestsForm" }
              },
              [
                _c("domain-pattern", {
                  attrs: {
                    id: "advancedIgnoreRequestsPattern",
                    "domain-pattern": _vm.excludeDomainPattern
                  },
                  on: {
                    "update:domainPattern": function($event) {
                      _vm.excludeDomainPattern = $event
                    },
                    "update:domain-pattern": function($event) {
                      _vm.excludeDomainPattern = $event
                    }
                  }
                }),
                _vm._v(" "),
                _vm._m(6)
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "m-b" })
          ]),
          _vm._v(" "),
          _vm._m(7),
          _vm._v(" "),
          _c("div", { staticClass: "content" }, [
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.replaceTabs,
                      expression: "preferences.replaceTabs"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.preferences.replaceTabs)
                      ? _vm._i(_vm.preferences.replaceTabs, null) > -1
                      : _vm.preferences.replaceTabs
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.replaceTabs,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences,
                              "replaceTabs",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences,
                              "replaceTabs",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences, "replaceTabs", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v(
                    "Instead of creating a new tab replace the current tab in case of\n            Isolation"
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.closeRedirectorTabs.active,
                      expression: "preferences.closeRedirectorTabs.active"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.preferences.closeRedirectorTabs.active
                    )
                      ? _vm._i(
                          _vm.preferences.closeRedirectorTabs.active,
                          null
                        ) > -1
                      : _vm.preferences.closeRedirectorTabs.active
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.closeRedirectorTabs.active,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences.closeRedirectorTabs,
                              "active",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences.closeRedirectorTabs,
                              "active",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(
                          _vm.preferences.closeRedirectorTabs,
                          "active",
                          $$c
                        )
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _vm._m(8)
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "m-b" }),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", [
                _vm._v(
                  "Automatically re-enable Isolation after n seconds (0 =\n          disabled)"
                )
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.preferences.isolation.reactivateDelay,
                    expression: "preferences.isolation.reactivateDelay"
                  }
                ],
                attrs: { id: "reactivateDelay", type: "text" },
                domProps: { value: _vm.preferences.isolation.reactivateDelay },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.preferences.isolation,
                      "reactivateDelay",
                      $event.target.value
                    )
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "m-b" }),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _vm._m(9),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.isolation.mac.action,
                      expression: "preferences.isolation.mac.action"
                    }
                  ],
                  staticClass: "ui fluid dropdown",
                  attrs: { id: "isolationMac" },
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.preferences.isolation.mac,
                        "action",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "disabled" } }, [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.t("optionsIsolationDisabled")) +
                        "\n          "
                    )
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "enabled" } }, [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.t("optionsIsolationMacIsolateNonMac")) +
                        "\n          "
                    )
                  ])
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _vm._m(10),
          _vm._v(" "),
          _c("div", { staticClass: "content" }, [
            _c(
              "button",
              {
                staticClass: "ui negative button",
                on: { click: _vm.resetStorage }
              },
              [
                _vm._v(
                  "\n        Wipe local storage and reset it to default\n      "
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "m-b" })
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "m-b" }),
      _vm._v(" "),
      _c("div", { staticClass: "field" }, [
        _c("div", { staticClass: "ui checkbox" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.preferences.ui.expandPreferences,
                expression: "preferences.ui.expandPreferences"
              }
            ],
            attrs: { type: "checkbox" },
            domProps: {
              checked: Array.isArray(_vm.preferences.ui.expandPreferences)
                ? _vm._i(_vm.preferences.ui.expandPreferences, null) > -1
                : _vm.preferences.ui.expandPreferences
            },
            on: {
              change: function($event) {
                var $$a = _vm.preferences.ui.expandPreferences,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 &&
                      _vm.$set(
                        _vm.preferences.ui,
                        "expandPreferences",
                        $$a.concat([$$v])
                      )
                  } else {
                    $$i > -1 &&
                      _vm.$set(
                        _vm.preferences.ui,
                        "expandPreferences",
                        $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                      )
                  }
                } else {
                  _vm.$set(_vm.preferences.ui, "expandPreferences", $$c)
                }
              }
            }
          }),
          _vm._v(" "),
          _c("label", [_vm._v("Expand all preferences by default")])
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("h4", [
        _c("i", { staticClass: "dropdown icon" }),
        _vm._v("\n        Automatic Mode\n      ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("h4", [
        _c("i", { staticClass: "dropdown icon" }),
        _vm._v("\n        Popup\n      ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("h4", [
        _c("i", { staticClass: "dropdown icon" }),
        _vm._v("\n        Context Menu\n      ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("h4", [
        _c("i", { staticClass: "dropdown icon" }),
        _vm._v("\n        Keyboard shortcuts\n      ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("h4", [
        _c("i", { staticClass: "dropdown icon" }),
        _vm._v("\n        Ignoring requests to\n      ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui small message" }, [
      _vm._v("\n        Note: Domains on the "),
      _c("i", [_vm._v("about:config")]),
      _vm._v(" "),
      _c("strong", [_vm._v("extensions.webextensions.restrictedDomains")]),
      _vm._v(" list can't\n        be unignored. You should "),
      _c("strong", [_vm._v("never")]),
      _vm._v(" change that list, nor\n        configure\n        "),
      _c("strong", [
        _vm._v("privacy.resistFingerprinting.block_mozAddonManager")
      ]),
      _vm._v(" to\n        Boolean "),
      _c("strong", [_vm._v("true")]),
      _vm._v(" to unignore "),
      _c("i", [_vm._v("addons.mozilla.org")]),
      _vm._v(
        ",\n        since it's deemed a serious security risk by Mozilla.\n      "
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "field" }, [
      _c("button", { staticClass: "ui button primary" }, [
        _vm._v("\n            Ignore\n          ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("h4", [
        _c("i", { staticClass: "dropdown icon" }),
        _vm._v("\n        Isolation\n      ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v(
        "Automatically close leftover redirector tabs after 2 seconds:\n            "
      ),
      _c("strong", [_vm._v("t.co")]),
      _vm._v(" (Twitter),\n            "),
      _c("strong", [_vm._v("outgoing.prod.mozaws.net")]),
      _vm._v(" (AMO),\n            "),
      _c("strong", [_vm._v("slack-redir.net")]),
      _vm._v(" (Slack)")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("span", { attrs: { "data-glossary": "Multi-Account Containers" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("h4", [
        _c("i", { staticClass: "dropdown icon" }),
        _vm._v("\n        Reset Storage\n      ")
      ])
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/advanced/general.vue?vue&type=template&id=11b3eb1c&


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/advanced/cookies.vue?vue&type=template&id=5d1b1899&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "form",
      { staticClass: "ui form", attrs: { id: "cookieForm" } },
      [
        _c("h4", [
          _vm._v(
            "\n      Configure cookies to be set on certain domains in Temporary Containers\n    "
          )
        ]),
        _vm._v(" "),
        _vm._m(0),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _c("domain-pattern", {
          attrs: {
            id: "cookieDomainPattern",
            disabled: _vm.domainPatternDisabled,
            glossary: true,
            "domain-pattern": _vm.domainPattern
          },
          on: {
            "update:domainPattern": function($event) {
              _vm.domainPattern = $event
            },
            "update:domain-pattern": function($event) {
              _vm.domainPattern = $event
            }
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("label", [_vm._v("name")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.cookie.name,
                expression: "cookie.name"
              }
            ],
            attrs: { id: "setCookiesDomainName", type: "text" },
            domProps: { value: _vm.cookie.name },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.cookie, "name", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("label", [_vm._v("value")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.cookie.value,
                expression: "cookie.value"
              }
            ],
            attrs: { type: "text" },
            domProps: { value: _vm.cookie.value },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.cookie, "value", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("label", [_vm._v("domain")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.cookie.domain,
                expression: "cookie.domain"
              }
            ],
            attrs: { type: "text" },
            domProps: { value: _vm.cookie.domain },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.cookie, "domain", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("label", [_vm._v("url")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.cookie.url,
                expression: "cookie.url"
              }
            ],
            attrs: { id: "cookieUrl", type: "text" },
            domProps: { value: _vm.cookie.url },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.cookie, "url", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "ui accordion",
            staticStyle: { "margin-top": "15px", "margin-bottom": "15px" },
            attrs: { id: "cookieAccordion" }
          },
          [
            _vm._m(2),
            _vm._v(" "),
            _c("div", { staticClass: "content" }, [
              _c("div", { staticClass: "field" }, [
                _c("label", [_vm._v("expirationDate")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.cookie.expirationDate,
                      expression: "cookie.expirationDate"
                    }
                  ],
                  attrs: { type: "text" },
                  domProps: { value: _vm.cookie.expirationDate },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.cookie,
                        "expirationDate",
                        $event.target.value
                      )
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field" }, [
                _c("label", [_vm._v("firstPartyDomain")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.cookie.firstPartyDomain,
                      expression: "cookie.firstPartyDomain"
                    }
                  ],
                  attrs: { type: "text" },
                  domProps: { value: _vm.cookie.firstPartyDomain },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.cookie,
                        "firstPartyDomain",
                        $event.target.value
                      )
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field" }, [
                _c("label", [_vm._v("httpOnly")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.cookie.httpOnly,
                        expression: "cookie.httpOnly"
                      }
                    ],
                    staticClass: "ui fluid dropdown",
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.$set(
                          _vm.cookie,
                          "httpOnly",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "" } }, [
                      _vm._v("\n              httpOnly\n            ")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "false" } }, [
                      _vm._v("\n              false\n            ")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "true" } }, [
                      _vm._v("\n              true\n            ")
                    ])
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field" }, [
                _c("label", [_vm._v("path")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.cookie.path,
                      expression: "cookie.path"
                    }
                  ],
                  attrs: { type: "text" },
                  domProps: { value: _vm.cookie.path },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.cookie, "path", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field" }, [
                _c("label", [_vm._v("sameSite")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.cookie.sameSite,
                        expression: "cookie.sameSite"
                      }
                    ],
                    staticClass: "ui fluid dropdown",
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.$set(
                          _vm.cookie,
                          "sameSite",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "" } }, [
                      _vm._v("\n              sameSite\n            ")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "no_restriction" } }, [
                      _vm._v("\n              no_restriction\n            ")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "lax" } }, [
                      _vm._v("\n              lax\n            ")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "strict" } }, [
                      _vm._v("\n              strict\n            ")
                    ])
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field" }, [
                _c("label", [_vm._v("secure")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.cookie.secure,
                        expression: "cookie.secure"
                      }
                    ],
                    staticClass: "ui fluid dropdown",
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.$set(
                          _vm.cookie,
                          "secure",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "" } }, [
                      _vm._v("\n              secure\n            ")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "false" } }, [
                      _vm._v("\n              false\n            ")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "true" } }, [
                      _vm._v("\n              true\n            ")
                    ])
                  ]
                )
              ])
            ])
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("button", { staticClass: "ui button primary" }, [
            _vm._v(
              "\n        " + _vm._s(!_vm.editing ? "Add" : "Save") + "\n      "
            )
          ])
        ])
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { class: { hidden: _vm.editing }, staticStyle: { "margin-top": "30px" } },
      [
        _c("h3", [_vm._v("Cookies")]),
        _vm._v(" "),
        _c("div", [
          !Object.keys(_vm.preferences.cookies.domain).length
            ? _c("div", [_vm._v("\n        No Cookies added\n      ")])
            : _c(
                "div",
                _vm._l(_vm.preferences.cookies.domain, function(
                  cookies,
                  cookiesDomainPattern
                ) {
                  return _c(
                    "div",
                    { key: cookiesDomainPattern, staticClass: "ui segments" },
                    [
                      _c("div", { staticClass: "ui segment" }, [
                        _c("h5", [_vm._v(_vm._s(cookiesDomainPattern))])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "ui segments" },
                        _vm._l(cookies, function(domainCookie, index) {
                          return _c(
                            "div",
                            {
                              key: index,
                              staticClass: "ui segment",
                              on: {
                                mouseenter: _vm.cookieMouseEnter,
                                mouseleave: _vm.cookieMouseLeave
                              }
                            },
                            [
                              domainCookie
                                ? _c(
                                    "div",
                                    { staticClass: "ui divided list" },
                                    [
                                      _vm._l(
                                        _vm.cookieKeys(domainCookie),
                                        function(cookieKey) {
                                          return _c(
                                            "div",
                                            {
                                              key: cookieKey,
                                              staticClass: "item",
                                              staticStyle: {
                                                "padding-bottom": "5px"
                                              }
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "ui horizontal label",
                                                  staticStyle: {
                                                    "margin-top": "5px"
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                    " +
                                                      _vm._s(cookieKey) +
                                                      "\n                  "
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              cookieKey == "value"
                                                ? _c("div", {
                                                    staticStyle: {
                                                      "margin-top": "8px"
                                                    }
                                                  })
                                                : _vm._e(),
                                              _vm._v(
                                                "\n                  " +
                                                  _vm._s(
                                                    domainCookie[cookieKey]
                                                  ) +
                                                  "\n                "
                                              )
                                            ]
                                          )
                                        }
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "item" }, [
                                        _c(
                                          "button",
                                          {
                                            staticClass:
                                              "ui right primary small button",
                                            staticStyle: {
                                              "margin-top": "10px"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.editCookie(
                                                  cookiesDomainPattern,
                                                  index
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "icon-pencil"
                                            }),
                                            _vm._v(
                                              "\n                    Edit\n                  "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "button",
                                          {
                                            staticClass:
                                              "ui right negative small button",
                                            staticStyle: {
                                              "margin-top": "10px"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.removeCookie(
                                                  cookiesDomainPattern,
                                                  index
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "icon-trash-empty"
                                            }),
                                            _vm._v(
                                              "\n                    Remove\n                  "
                                            )
                                          ]
                                        )
                                      ])
                                    ],
                                    2
                                  )
                                : _vm._e()
                            ]
                          )
                        }),
                        0
                      )
                    ]
                  )
                }),
                0
              )
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui small negative message" }, [
      _c("strong", [_vm._v("Warning:")]),
      _vm._v(
        " Setting cookies can make you easier\n      fingerprintable. Especially when they contain user/session-specific\n      data. Avoid setting cookies if you can.\n    "
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui small notice message" }, [
      _vm._v("\n      This will call\n      "),
      _c(
        "a",
        {
          attrs: {
            href:
              "https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies/set",
            target: "_blank"
          }
        },
        [_vm._v("cookies.set")]
      ),
      _vm._v(
        "\n      and add the cookie to the header (if allowed) during\n      "
      ),
      _c(
        "a",
        {
          attrs: {
            href:
              "https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest/onBeforeSendHeaders",
            target: "_blank"
          }
        },
        [_vm._v("webRequest.onBeforeSendHeaders")]
      ),
      _vm._v(
        "\n      if the request belongs to a Temporary Container and the domain matches\n      the given pattern. Make sure that the cookie name and value are\n      correctly encoded, or you might break the header being sent.\n    "
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("h4", [
        _c("i", { staticClass: "dropdown icon" }),
        _vm._v("\n          Advanced\n        ")
      ])
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/advanced/cookies.vue?vue&type=template&id=5d1b1899&


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/advanced/scripts.vue?vue&type=template&id=9e378adc&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("form", { staticClass: "ui form", attrs: { id: "scriptForm" } }, [
      _c("h4", [
        _vm._v(
          "\n      Configure scripts to execute for certain domains in Temporary Containers\n    "
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "ui small negative message" }, [
        _c("strong", [
          _vm._v("Warning: Never add scripts from untrusted sources!")
        ]),
        _vm._v(
          "\n      Also keep in mind that Firefox Sync storage is limited to 100KB, so\n      adding huge scripts here will prevent you from exporting preferences to\n      Firefox Sync since the scripts are stored as preferences. The local\n      storage limit is 5MB, so adding scripts exceeding that might prevent the\n      Add-on from working at all.\n      "
        ),
        _c("br"),
        _c("br"),
        _vm._v(" "),
        _c("strong", [
          _c(
            "div",
            {
              staticClass: "ui small checkbox",
              attrs: { id: "scriptsContainerWarningRead" }
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.preferences.scripts.active,
                    expression: "preferences.scripts.active"
                  }
                ],
                attrs: {
                  id: "scriptsContainerWarningReadCheckbox",
                  disabled: _vm.preferences.scripts.active,
                  type: "checkbox"
                },
                domProps: {
                  checked: Array.isArray(_vm.preferences.scripts.active)
                    ? _vm._i(_vm.preferences.scripts.active, null) > -1
                    : _vm.preferences.scripts.active
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.preferences.scripts.active,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.preferences.scripts,
                            "active",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.preferences.scripts,
                            "active",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.preferences.scripts, "active", $$c)
                    }
                  }
                }
              }),
              _vm._v(" "),
              _c("label", [
                _vm._v(
                  '\n            I have read the warning and understand the implications that come\n            with using "Scripts". When ticking the checkbox Firefox will ask\n            you for "Access browser activity" permissions.\n          '
                )
              ])
            ]
          )
        ])
      ]),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        {
          style: !_vm.preferences.scripts.active
            ? "opacity: 0.3; pointer-events: none"
            : ""
        },
        [
          _c("domain-pattern", {
            attrs: {
              id: "scriptDomainPattern",
              disabled: _vm.domainPatternDisabled,
              glossary: true,
              "domain-pattern": _vm.domainPattern
            },
            on: {
              "update:domainPattern": function($event) {
                _vm.domainPattern = $event
              },
              "update:domain-pattern": function($event) {
                _vm.domainPattern = $event
              }
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", [_vm._v("code")]),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.script.code,
                  expression: "script.code"
                }
              ],
              attrs: { id: "scriptCode" },
              domProps: { value: _vm.script.code },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.script, "code", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", [_vm._v("runAt")]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.script.runAt,
                    expression: "script.runAt"
                  }
                ],
                staticClass: "ui fluid dropdown",
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.script,
                      "runAt",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "document_start" } }, [
                  _vm._v("document_start")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "document_end" } }, [
                  _vm._v("document_end")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "document_idle" } }, [
                  _vm._v("document_idle")
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("button", { staticClass: "ui button primary" }, [
              _vm._v(
                "\n          " +
                  _vm._s(!_vm.editing ? "Add" : "Save") +
                  "\n        "
              )
            ])
          ])
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        style: !_vm.preferences.scripts.active
          ? "opacity: 0.3; pointer-events: none"
          : ""
      },
      [
        _c(
          "div",
          {
            class: { hidden: _vm.editing },
            staticStyle: { "margin-top": "30px" }
          },
          [
            _c("h3", [_vm._v("Scripts")]),
            _vm._v(" "),
            _c("div", [
              !Object.keys(_vm.preferences.scripts.domain).length
                ? _c("div", [_vm._v("\n          No Scripts added\n        ")])
                : _c(
                    "div",
                    _vm._l(_vm.preferences.scripts.domain, function(
                      scripts,
                      scriptDomainPattern
                    ) {
                      return _c(
                        "div",
                        {
                          key: scriptDomainPattern,
                          staticClass: "ui segments"
                        },
                        [
                          _c("div", { staticClass: "ui segment" }, [
                            _c("h5", [_vm._v(_vm._s(scriptDomainPattern))])
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "ui segments" },
                            _vm._l(scripts, function(domainScript, index) {
                              return _c(
                                "div",
                                { key: index, staticClass: "ui segment" },
                                [
                                  _c("div", { staticClass: "item" }, [
                                    _vm._v(
                                      "\n                  Script #" +
                                        _vm._s(index) +
                                        "\n                  "
                                    ),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "ui right small primary button",
                                        staticStyle: {
                                          "margin-top": "10px",
                                          "margin-left": "10px"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.editScript(
                                              scriptDomainPattern,
                                              index
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c("i", { staticClass: "icon-pencil" }),
                                        _vm._v(
                                          "\n                    Edit\n                  "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "ui right negative small button",
                                        staticStyle: { "margin-top": "10px" },
                                        on: {
                                          click: function($event) {
                                            return _vm.removeScript(
                                              scriptDomainPattern,
                                              index
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "icon-trash-empty"
                                        }),
                                        _vm._v(
                                          "\n                    Remove\n                  "
                                        )
                                      ]
                                    )
                                  ])
                                ]
                              )
                            }),
                            0
                          )
                        ]
                      )
                    }),
                    0
                  )
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui small notice message" }, [
      _vm._v("\n      This will call\n      "),
      _c(
        "a",
        {
          attrs: {
            href:
              "https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/executeScript",
            target: "_blank"
          }
        },
        [_vm._v("tabs.executeScript")]
      ),
      _vm._v(
        "\n      if the tab url being loaded belongs to a Temporary Container and its\n      domain matches the given pattern. Pro-tip: You can use\n      "
      ),
      _c(
        "a",
        {
          attrs: {
            href:
              "https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Xray_vision#Waiving_Xray_vision",
            target: "_blank"
          }
        },
        [_vm._v("window.wrappedJSObject")]
      ),
      _vm._v("\n      to access the original window.\n    ")
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/advanced/scripts.vue?vue&type=template&id=9e378adc&


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/advanced/deletehistory.vue?vue&type=template&id=14878413&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ui form", attrs: { id: "advancedDeletesHistory" } },
    [
      _c("div", { staticClass: "field" }, [
        _c("label", [_vm._v('"Deletes History Temporary Containers"')]),
        _vm._v(" "),
        _c("div", { staticClass: "ui small negative message" }, [
          _c("strong", [_vm._v("Warning:")]),
          _vm._v(
            ' Every website URL that you visit in a "Deletes\n      History Temporary Container" will get deleted from your entire history.\n      This means if you visited the same website URL in another Container,\n      Temporary Container or in the Default Container before or while visiting\n      it in a "Deletes History Temporary Container" then those visits will get\n      deleted from history too. This is true until Firefox supports a special\n      history for container tabs.\n      '
          ),
          _c(
            "a",
            {
              attrs: {
                href: "https://bugzilla.mozilla.org/show_bug.cgi?id=1283320",
                target: "_blank"
              }
            },
            [_vm._v("The related Firefox bug can be found here")]
          ),
          _vm._v("."),
          _c("br"),
          _vm._v(" "),
          _c("br"),
          _vm._v(
            '\n      Be careful. You have been warned. "Deletes History Temporary Containers"\n      tabs have a "-deletes-history" suffix in the container name to remind\n      you.\n      '
          ),
          _c("br"),
          _c("br"),
          _vm._v(" "),
          _c("strong", [
            _c(
              "div",
              {
                staticClass: "ui small checkbox",
                attrs: { id: "deletesHistoryContainerWarningRead" }
              },
              [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.deletesHistory.active,
                      expression: "preferences.deletesHistory.active"
                    }
                  ],
                  attrs: {
                    id: "deletesHistoryContainerWarningReadCheckbox",
                    disabled: _vm.preferences.deletesHistory.active,
                    type: "checkbox"
                  },
                  domProps: {
                    checked: Array.isArray(
                      _vm.preferences.deletesHistory.active
                    )
                      ? _vm._i(_vm.preferences.deletesHistory.active, null) > -1
                      : _vm.preferences.deletesHistory.active
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.preferences.deletesHistory.active,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences.deletesHistory,
                              "active",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences.deletesHistory,
                              "active",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.preferences.deletesHistory, "active", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v(
                    'I have read the Warning and understand the implications that come\n            with using "Deletes History Temporary Containers". When ticking\n            the checkbox Firefox will ask you for "Access browsing history"\n            permissions.'
                  )
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _vm._m(0)
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          style: !_vm.preferences.deletesHistory.active
            ? "opacity: 0.3; pointer-events: none"
            : ""
        },
        [
          _c(
            "div",
            {
              staticClass: "field",
              attrs: {
                "data-tooltip":
                  "This affects Automatic Mode, Toolbar Icon and the right-click context menu entry"
              }
            },
            [
              _c("label", [
                _vm._v(
                  'Automatically create "Deletes History Temporary Containers"'
                )
              ]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.deletesHistory.automaticMode,
                      expression: "preferences.deletesHistory.automaticMode"
                    }
                  ],
                  staticClass: "ui fluid dropdown",
                  attrs: { id: "deletesHistoryContainer" },
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.preferences.deletesHistory,
                        "automaticMode",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "never" } }, [
                    _vm._v(
                      '\n          Don\'t automatically create "Deletes History Temporary Containers"\n          instead of normal Temporary Containers (default)\n        '
                    )
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "automatic" } }, [
                    _vm._v(
                      '\n          Automatically create "Deletes History Temporary Containers" instead\n          of normal Temporary Containers\n        '
                    )
                  ])
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", [_vm._v("Context Menu")]),
            _vm._v(" "),
            _c("div", { staticClass: "ui checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.preferences.deletesHistory.contextMenu,
                    expression: "preferences.deletesHistory.contextMenu"
                  }
                ],
                attrs: { id: "deletesHistoryContextMenu", type: "checkbox" },
                domProps: {
                  checked: Array.isArray(
                    _vm.preferences.deletesHistory.contextMenu
                  )
                    ? _vm._i(_vm.preferences.deletesHistory.contextMenu, null) >
                      -1
                    : _vm.preferences.deletesHistory.contextMenu
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.preferences.deletesHistory.contextMenu,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.preferences.deletesHistory,
                            "contextMenu",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.preferences.deletesHistory,
                            "contextMenu",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(
                        _vm.preferences.deletesHistory,
                        "contextMenu",
                        $$c
                      )
                    }
                  }
                }
              }),
              _vm._v(" "),
              _c("label", [
                _vm._v(
                  'Show additional "Deletes History Temporary Containers" entry in the\n          right click on links context menu'
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c(
              "div",
              {
                staticClass: "ui checkbox",
                attrs: { id: "deletesHistoryContextMenuBookmarks" }
              },
              [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value:
                        _vm.preferences.deletesHistory.contextMenuBookmarks,
                      expression:
                        "preferences.deletesHistory.contextMenuBookmarks"
                    }
                  ],
                  attrs: {
                    id: "deletesHistoryContextMenuBookmarksCheckbox",
                    type: "checkbox"
                  },
                  domProps: {
                    checked: Array.isArray(
                      _vm.preferences.deletesHistory.contextMenuBookmarks
                    )
                      ? _vm._i(
                          _vm.preferences.deletesHistory.contextMenuBookmarks,
                          null
                        ) > -1
                      : _vm.preferences.deletesHistory.contextMenuBookmarks
                  },
                  on: {
                    change: function($event) {
                      var $$a =
                          _vm.preferences.deletesHistory.contextMenuBookmarks,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.preferences.deletesHistory,
                              "contextMenuBookmarks",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.preferences.deletesHistory,
                              "contextMenuBookmarks",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(
                          _vm.preferences.deletesHistory,
                          "contextMenuBookmarks",
                          $$c
                        )
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", [
                  _vm._v(
                    'Show additional "Deletes History Temporary Containers" entry in the\n          right click on bookmarks context menu'
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "field",
              attrs: {
                "data-tooltip":
                  '"15minutes" lets you "Undo Close Tab" in that timeframe'
              }
            },
            [
              _c("label", [
                _vm._v(
                  'Delete no longer needed "Deletes History Temporary Containers"'
                )
              ]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.preferences.deletesHistory.containerRemoval,
                      expression: "preferences.deletesHistory.containerRemoval"
                    }
                  ],
                  staticClass: "ui fluid dropdown",
                  attrs: { id: "deletesHistoryContainerRemoval" },
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.preferences.deletesHistory,
                        "containerRemoval",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                [
                  _c("option", { domProps: { value: 900000 } }, [
                    _vm._v(
                      "\n          15 minutes after the last tab in it closes\n        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("option", { domProps: { value: 0 } }, [
                    _vm._v(
                      "\n          After the last tab in it closes (default)\n        "
                    )
                  ])
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", [_vm._v("Isolation - Always per domain")]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value:
                      _vm.preferences.deletesHistory.containerAlwaysPerDomain,
                    expression:
                      "preferences.deletesHistory.containerAlwaysPerDomain"
                  }
                ],
                staticClass: "ui fluid dropdown",
                attrs: { id: "deletesHistorycontainerAlwaysPerDomain" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.preferences.deletesHistory,
                      "containerAlwaysPerDomain",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "never" } }, [
                  _vm._v("\n          Default\n        ")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "automatic" } }, [
                  _vm._v(
                    '\n          Open new "Deletes History Temporary Containers" for Domains\n          configured "Isolation Always" instead of normal Temporary Containers\n        '
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", [_vm._v("Isolation - Navigating in tabs")]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.preferences.deletesHistory.containerIsolation,
                    expression: "preferences.deletesHistory.containerIsolation"
                  }
                ],
                staticClass: "ui fluid dropdown",
                attrs: { id: "deletesHistoryContainerIsolation" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.preferences.deletesHistory,
                      "containerIsolation",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "never" } }, [
                  _vm._v("\n          Default\n        ")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "automatic" } }, [
                  _vm._v(
                    '\n          Open new "Deletes History Temporary Containers" when "Navigating in\n          tabs Isolation" takes place instead of normal Temporary Containers\n        '
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", [
              _vm._v(
                'Isolation - Mouse clicks in "Deletes History Temporary\n        Containers"'
              )
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.preferences.deletesHistory.containerMouseClicks,
                    expression:
                      "preferences.deletesHistory.containerMouseClicks"
                  }
                ],
                staticClass: "ui fluid dropdown",
                attrs: { id: "deletesHistoryContainerMouseClicks" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.preferences.deletesHistory,
                      "containerMouseClicks",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "never" } }, [
                  _vm._v("\n          Default\n        ")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "automatic" } }, [
                  _vm._v(
                    '\n          Open new "Deletes History Temporary Containers" with Mouse clicks on\n          links in "Deletes History Temporary Containers" instead of normal\n          Temporary Containers\n        '
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", [
              _vm._v("Isolation - Middle Mouse Click in Temporary Containers")
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value:
                      _vm.preferences.isolation.global.mouseClick.middle
                        .container,
                    expression:
                      "preferences.isolation.global.mouseClick.middle.container"
                  }
                ],
                staticClass: "ui fluid dropdown",
                attrs: { id: "linkClickGlobalMiddleCreatesContainer" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.preferences.isolation.global.mouseClick.middle,
                      "container",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "default" } }, [
                  _vm._v("\n          Default\n        ")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "deleteshistory" } }, [
                  _vm._v(
                    '\n          Open new "Deletes History Temporary Containers" with Middle Mouse\n          clicks instead of Temporary Containers\n        '
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", [
              _vm._v(
                "Isolation - Ctrl/Cmd+Left Mouse Click in Temporary Containers"
              )
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value:
                      _vm.preferences.isolation.global.mouseClick.ctrlleft
                        .container,
                    expression:
                      "preferences.isolation.global.mouseClick.ctrlleft.container"
                  }
                ],
                staticClass: "ui fluid dropdown",
                attrs: { id: "linkClickGlobalCtrlLeftCreatesContainer" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.preferences.isolation.global.mouseClick.ctrlleft,
                      "container",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "default" } }, [
                  _vm._v("\n          Default\n        ")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "deleteshistory" } }, [
                  _vm._v(
                    '\n          Open new "Deletes History Temporary Containers" with Ctrl/Cmd+Left\n          Mouse clicks instead of Temporary Containers\n        '
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", [
              _vm._v("Isolation - Left Mouse Click in Temporary Containers")
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value:
                      _vm.preferences.isolation.global.mouseClick.left
                        .container,
                    expression:
                      "preferences.isolation.global.mouseClick.left.container"
                  }
                ],
                staticClass: "ui fluid dropdown",
                attrs: { id: "linkClickGlobalLeftCreatesContainer" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.preferences.isolation.global.mouseClick.left,
                      "container",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "default" } }, [
                  _vm._v("\n          Default\n        ")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "deleteshistory" } }, [
                  _vm._v(
                    '\n          Open new "Deletes History Temporary Containers" with Left Mouse\n          clicks instead of Temporary Containers\n        '
                  )
                ])
              ]
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui small notice message" }, [
      _vm._v(
        '\n      You can open "Deletes History Temporary Containers" - also with the\n      keyboard shortcut Alt+P - after you read the Warning and ticked the\n      checkbox.'
      ),
      _c("br"),
      _vm._v(" "),
      _c("br"),
      _vm._v(
        '\n      The deletion applies to the full website URL, not only the domain. That\n      means, if you e.g. open a news article on your favorite news site in a\n      "Deletes History Temporary Container" it won\'t delete all your previous\n      visits to other news articles that you made outside of "Deletes History\n      Temporary Containers" because the full website URLs are different.'
      ),
      _c("br"),
      _vm._v(" "),
      _c("br"),
      _vm._v(
        '\n      "Deletes History Temporary Containers" will delete history when the\n      "Deletes History Temporary Container" itself gets deleted after the last\n      tab in it closes.\n    '
      )
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/advanced/deletehistory.vue?vue&type=template&id=14878413&


/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const options_vue_1 = __importDefault(__webpack_require__(122));
const root_1 = __importDefault(__webpack_require__(81));
root_1.default(options_vue_1.default, {});


/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _options_vue_vue_type_template_id_1f34fc12___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54);
/* harmony import */ var _options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _options_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(139);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _options_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _options_vue_vue_type_template_id_1f34fc12___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _options_vue_vue_type_template_id_1f34fc12___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/options.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _general_vue_vue_type_template_id_3919cf41___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);
/* harmony import */ var _general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _general_vue_vue_type_template_id_3919cf41___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _general_vue_vue_type_template_id_3919cf41___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/general.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_978c99ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(57);
/* harmony import */ var _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_978c99ac___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _index_vue_vue_type_template_id_978c99ac___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/isolation/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_0d8a39dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);
/* harmony import */ var _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_0d8a39dc___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _index_vue_vue_type_template_id_0d8a39dc___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/advanced/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _general_vue_vue_type_template_id_11b3eb1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69);
/* harmony import */ var _general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _general_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(130);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _general_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _general_vue_vue_type_template_id_11b3eb1c___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _general_vue_vue_type_template_id_11b3eb1c___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/advanced/general.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_general_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(7);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.m-b {\n  margin-bottom: 20px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cookies_vue_vue_type_template_id_5d1b1899___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70);
/* harmony import */ var _cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _cookies_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _cookies_vue_vue_type_template_id_5d1b1899___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _cookies_vue_vue_type_template_id_5d1b1899___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/advanced/cookies.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_vue_vue_type_template_id_9e378adc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(71);
/* harmony import */ var _scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _scripts_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _scripts_vue_vue_type_template_id_9e378adc___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _scripts_vue_vue_type_template_id_9e378adc___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/advanced/scripts.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deletehistory_vue_vue_type_template_id_14878413___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var _deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _deletehistory_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _deletehistory_vue_vue_type_template_id_14878413___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _deletehistory_vue_vue_type_template_id_14878413___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/advanced/deletehistory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _export_import_vue_vue_type_template_id_549ebe77___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
/* harmony import */ var _export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _export_import_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _export_import_vue_vue_type_template_id_549ebe77___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _export_import_vue_vue_type_template_id_549ebe77___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/export-import.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_options_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(7);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n#container {\n  padding: 25px;\n}\n.hidden {\n  display: none !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })
/******/ ]);