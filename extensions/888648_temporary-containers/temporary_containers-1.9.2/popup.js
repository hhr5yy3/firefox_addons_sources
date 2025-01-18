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
/******/ 		5: 0
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
/******/ 	deferredModules.push([144,1,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const popup_vue_1 = __importDefault(__webpack_require__(145));
const root_1 = __importDefault(__webpack_require__(81));
root_1.default(popup_vue_1.default, { popup: true });


/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popup_vue_vue_type_template_id_435eb145___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);
/* harmony import */ var _popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(148);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _popup_vue_vue_type_template_id_435eb145___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _popup_vue_vue_type_template_id_435eb145___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/popup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_vue_vue_type_template_id_6428fcd6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _actions_vue_vue_type_template_id_6428fcd6___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _actions_vue_vue_type_template_id_6428fcd6___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/actions.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _breadcrumb_vue_vue_type_template_id_57b4848c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66);
/* harmony import */ var _breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(51);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _breadcrumb_vue_vue_type_template_id_57b4848c___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _breadcrumb_vue_vue_type_template_id_57b4848c___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/breadcrumb.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(7);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n#container {\n  padding: 10px;\n  padding-top: 5px;\n  min-width: 370px;\n  min-height: 470px;\n}\n.hidden {\n  display: none;\n}\n.popup-margin {\n  margin: 0 20px 10px 0;\n}\n.popup-exclude-margin {\n  margin: 0 15px 10px 25px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
const global_vue_1 = __importDefault(__webpack_require__(74));
const perdomain_vue_1 = __importDefault(__webpack_require__(76));
const actions_vue_1 = __importDefault(__webpack_require__(146));
const statistics_vue_1 = __importDefault(__webpack_require__(78));
const message_vue_1 = __importDefault(__webpack_require__(79));
const breadcrumb_vue_1 = __importDefault(__webpack_require__(147));
const index_vue_1 = __importDefault(__webpack_require__(80));
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    components: {
        IsolationGlobal: global_vue_1.default,
        IsolationPerDomain: perdomain_vue_1.default,
        Actions: actions_vue_1.default,
        Statistics: statistics_vue_1.default,
        Message: message_vue_1.default,
        Breadcrumb: breadcrumb_vue_1.default,
        Glossary: index_vue_1.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            initialized: false,
            show: false,
        };
    },
    watch: {
        app(app) {
            if (!app.initialized) {
                return;
            }
            this.initialized = true;
            this.$nextTick(() => {
                $('.ui.accordion').accordion({
                    animateChildren: false,
                    duration: 0,
                });
                $('.ui.sidebar').sidebar({
                    transition: 'overlay',
                });
                this.show = true;
                $(document).tab('change tab', this.app.preferences.ui.popupDefaultTab);
            });
        },
    },
    methods: {
        changeTab(tab) {
            $('.ui.sidebar').sidebar('hide');
            $(document).tab('change tab', tab);
        },
        toggleSidebar() {
            $('.ui.sidebar').sidebar('toggle');
        },
        createTmp() {
            browser.runtime.sendMessage({
                method: 'createTabInTempContainer',
            });
            window.close();
        },
        createDeletesHistoryTmp() {
            browser.runtime.sendMessage({
                method: 'createTabInTempContainer',
                payload: {
                    deletesHistory: true,
                },
            });
            window.close();
        },
        async openPreferences() {
            const [tab] = await browser.tabs.query({
                url: browser.runtime.getURL('options.html'),
            });
            if (tab && tab.id && tab.windowId) {
                await browser.tabs.update(tab.id, { active: true });
                await browser.tabs.reload(tab.id);
                if (tab.windowId !== browser.windows.WINDOW_ID_CURRENT) {
                    await browser.windows.update(tab.windowId, { focused: true });
                }
            }
            else {
                await browser.tabs.create({
                    url: browser.runtime.getURL('options.html'),
                });
            }
            window.close();
        },
        toggleIsolation() {
            this.app.storage.isolation.active = !this.app.storage.isolation.active;
            browser.runtime.sendMessage({
                method: 'saveIsolation',
                payload: {
                    isolation: this.app.storage.isolation,
                },
            });
        },
    },
});


/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_actions_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 50:
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
            permissions: this.app.permissions,
            activeTab: this.app.activeTab,
            isHttpTab: this.app.activeTab.url.startsWith('http'),
        };
    },
    methods: {
        openInTmp() {
            browser.runtime.sendMessage({
                method: 'createTabInTempContainer',
                payload: {
                    url: this.activeTab.url,
                },
            });
            window.close();
        },
        openInDeletesHistoryTmp() {
            browser.runtime.sendMessage({
                method: 'createTabInTempContainer',
                payload: {
                    url: this.activeTab.url,
                    deletesHistory: true,
                },
            });
            window.close();
        },
        convertToRegular() {
            browser.runtime.sendMessage({
                method: 'convertTempContainerToRegular',
                payload: {
                    cookieStoreId: this.activeTab.cookieStoreId,
                    tabId: this.activeTab.id,
                    url: this.activeTab.url,
                },
            });
            window.close();
        },
        convertToPermanent() {
            browser.runtime.sendMessage({
                method: 'convertTempContainerToPermanent',
                payload: {
                    cookieStoreId: this.activeTab.cookieStoreId,
                    tabId: this.activeTab.id,
                    name: this.activeTab.parsedUrl.hostname,
                    url: this.activeTab.url,
                },
            });
            window.close();
        },
        convertToTemporary() {
            browser.runtime.sendMessage({
                method: 'convertPermanentToTempContainer',
                payload: {
                    cookieStoreId: this.activeTab.cookieStoreId,
                    tabId: this.activeTab.id,
                    url: this.activeTab.url,
                },
            });
            window.close();
        },
    },
});


/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_breadcrumb_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(1));
exports.default = vue_1.default.extend({
    props: {
        tab: {
            type: String,
            required: true,
        },
    },
});


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(149);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(8).default
var update = add("6df4b0e9", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/popup.vue?vue&type=template&id=435eb145&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "pusher" },
    [
      !_vm.app.initialized ? _c("message") : _vm._e(),
      _vm._v(" "),
      _vm.initialized
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.show,
                  expression: "show"
                }
              ]
            },
            [
              _c("div", { staticClass: "ui sidebar vertical menu" }, [
                _c(
                  "a",
                  {
                    staticClass: "item",
                    on: {
                      click: function($event) {
                        return _vm.changeTab("isolation-global")
                      }
                    }
                  },
                  [
                    _c("i", { staticClass: "icon-circle-empty" }),
                    _vm._v(" Isolation Global\n      ")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "item",
                    on: {
                      click: function($event) {
                        return _vm.changeTab("isolation-per-domain")
                      }
                    }
                  },
                  [
                    _c("i", { staticClass: "icon-circle-empty" }),
                    _vm._v(" Isolation Per Domain\n      ")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "item",
                    on: {
                      click: function($event) {
                        return _vm.changeTab("actions")
                      }
                    }
                  },
                  [
                    _c("i", { staticClass: "icon-exchange" }),
                    _vm._v(" Actions\n      ")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "item",
                    on: {
                      click: function($event) {
                        return _vm.changeTab("statistics")
                      }
                    }
                  },
                  [
                    _c("i", { staticClass: "icon-chart-bar" }),
                    _vm._v(" Statistics\n      ")
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", [
                _c("div", { staticClass: "ui pushable" }, [
                  _c(
                    "div",
                    { staticClass: "ui", attrs: { id: "container" } },
                    [
                      _c("div", { staticClass: "ui icon menu" }, [
                        _c(
                          "a",
                          {
                            staticClass: "item",
                            on: { click: _vm.toggleSidebar }
                          },
                          [_c("i", { staticClass: "icon-menu" })]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "right menu" }, [
                          _vm.app.storage.isolation.active
                            ? _c(
                                "a",
                                {
                                  staticClass: "item",
                                  attrs: { title: "Disable Isolation" },
                                  on: { click: _vm.toggleIsolation }
                                },
                                [_c("i", { staticClass: "dont icon" })]
                              )
                            : _c(
                                "a",
                                {
                                  staticClass: "item",
                                  attrs: { title: "Enable Isolation" },
                                  on: { click: _vm.toggleIsolation }
                                },
                                [
                                  _c("i", {
                                    staticClass: "exclamation red icon"
                                  })
                                ]
                              ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              staticClass: "item",
                              attrs: { title: "Open Preferences/Options" },
                              on: { click: _vm.openPreferences }
                            },
                            [_c("i", { staticClass: "icon-cog-alt" })]
                          ),
                          _vm._v(" "),
                          _vm.app.initialized && _vm.app.permissions.history
                            ? _c(
                                "a",
                                {
                                  staticClass: "item",
                                  attrs: {
                                    title:
                                      "Open new 'Deletes History Temporary Container'"
                                  },
                                  on: { click: _vm.createDeletesHistoryTmp }
                                },
                                [_c("i", { staticClass: "icon-user-secret" })]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              staticClass: "item",
                              attrs: { title: "Open new Temporary Container" },
                              on: { click: _vm.createTmp }
                            },
                            [
                              _c(
                                "svg",
                                { attrs: { width: "16", height: "16" } },
                                [
                                  _c("image", {
                                    attrs: {
                                      "xlink:href": "/icons/page-w-16.svg",
                                      x: "0",
                                      y: "0",
                                      width: "100%",
                                      height: "100%"
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("message"),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "ui tab",
                          attrs: { "data-tab": "isolation-global" }
                        },
                        [
                          _c("breadcrumb", {
                            attrs: { tab: _vm.t("optionsIsolationTabGlobal") }
                          }),
                          _vm._v(" "),
                          _c("isolation-global", { attrs: { app: _vm.app } })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "ui tab",
                          attrs: { "data-tab": "isolation-per-domain" }
                        },
                        [
                          _c("breadcrumb", {
                            attrs: {
                              tab: _vm.t("optionsIsolationTabPerDomain")
                            }
                          }),
                          _vm._v(" "),
                          _c("isolation-per-domain", {
                            attrs: { app: _vm.app }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "ui tab",
                          attrs: { "data-tab": "actions" }
                        },
                        [_c("actions", { attrs: { app: _vm.app } })],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "ui tab",
                          attrs: { "data-tab": "statistics" }
                        },
                        [_c("statistics", { attrs: { app: _vm.app } })],
                        1
                      )
                    ],
                    1
                  )
                ])
              ])
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("glossary", { attrs: { app: _vm.app } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/popup.vue?vue&type=template&id=435eb145&


/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/actions.vue?vue&type=template&id=6428fcd6&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ui segment" }, [
    !_vm.isHttpTab
      ? _c("div", { staticClass: "ui small message" }, [
          _vm._v("\n    Actions aren't available in this tab\n  ")
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "ui primary button",
        attrs: { disabled: !_vm.isHttpTab },
        on: { click: _vm.openInTmp }
      },
      [_vm._v("\n    Open tab URL in new Temporary Container\n  ")]
    ),
    _vm._v(" "),
    _c("br"),
    _c("br"),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "ui negative button",
        attrs: {
          disabled:
            !_vm.isHttpTab ||
            !_vm.app.storage.tempContainers[_vm.activeTab.cookieStoreId]
        },
        on: { click: _vm.convertToPermanent }
      },
      [_vm._v("\n    Convert Temporary to Permanent Container\n  ")]
    ),
    _vm._v(" "),
    _c("br"),
    _c("br"),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "ui negative button",
        attrs: {
          disabled:
            !_vm.isHttpTab ||
            _vm.activeTab.cookieStoreId === "firefox-default" ||
            _vm.app.storage.tempContainers[_vm.activeTab.cookieStoreId]
        },
        on: { click: _vm.convertToTemporary }
      },
      [_vm._v("\n    Convert Permanent to Temporary Container\n  ")]
    ),
    _vm._v(" "),
    _c("br"),
    _c("br"),
    _vm._v(" "),
    _vm.permissions.history
      ? _c(
          "button",
          {
            staticClass: "ui negative button",
            attrs: {
              disabled:
                !_vm.isHttpTab ||
                !_vm.app.storage.tempContainers[_vm.activeTab.cookieStoreId] ||
                !_vm.app.storage.tempContainers[_vm.activeTab.cookieStoreId]
                  .deletesHistory
            },
            on: { click: _vm.convertToRegular }
          },
          [
            _vm._v(
              '\n    Convert from "Deletes History" to Regular Temporary Container\n  '
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _c("br"),
    _c("br"),
    _vm._v(" "),
    _vm.permissions.history
      ? _c(
          "button",
          {
            staticClass: "ui negative button",
            attrs: { disabled: !_vm.isHttpTab },
            on: { click: _vm.openInDeletesHistoryTmp }
          },
          [
            _vm._v(
              '\n    Open tab URL in new "Deletes History Temporary Container"\n  '
            )
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/actions.vue?vue&type=template&id=6428fcd6&


/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/breadcrumb.vue?vue&type=template&id=57b4848c&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "ui breadcrumb",
        staticStyle: { "font-size": "13px" },
        attrs: { "data-glossary": _vm.tab, "data-glossary-label": "" }
      },
      [
        _c("div", { staticClass: "section" }, [
          _vm._v("\n      Isolation\n    ")
        ]),
        _vm._v(" "),
        _c("i", { staticClass: "right angle icon divider" }),
        _vm._v(" "),
        _c("div", { staticClass: "active section" }, [
          _vm._v("\n      " + _vm._s(_vm.tab) + "\n    ")
        ])
      ]
    ),
    _vm._v(" "),
    _c("div", {
      staticClass: "ui divider",
      staticStyle: { margin: "5px 0 10px 0" }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/breadcrumb.vue?vue&type=template&id=57b4848c&


/***/ })

/******/ });