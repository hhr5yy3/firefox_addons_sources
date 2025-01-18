"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["wdioHarness.content"],{

/***/ "./src/app/content/wdioHarness.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_core_features_webext_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/webext-shared/src/index.ts");

(0,_client_core_features_webext_shared__WEBPACK_IMPORTED_MODULE_0__.addWDIOHarness)();

/***/ }),

/***/ "../../libs/features/webext-shared/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addWDIOHarness: () => (/* reexport safe */ _lib_wdioHarness__WEBPACK_IMPORTED_MODULE_0__.addWDIOHarness)
/* harmony export */ });
/* harmony import */ var _lib_wdioHarness__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/webext-shared/src/lib/wdioHarness.ts");


/***/ }),

/***/ "../../libs/features/webext-shared/src/lib/wdioHarness.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addWDIOHarness: () => (/* binding */ addWDIOHarness)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_syncstore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/syncstore/src/index.ts");


const addWDIOHarness = () => {
  const params = new URLSearchParams(document.location.search);
  const uninstall = params.get('uninstall') === 'true';
  const options = params.get('options') === 'true';
  const reloadFlags = params.get('reloadFlags') === 'true';
  if (uninstall) {
    console.log('sending msg to background');
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      action: 'uninstall'
    });
  } else if (options) {
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      action: 'options'
    });
  } else if (reloadFlags) {
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      action: 'feature-flag-action',
      details: {
        type: 'reload'
      }
    });
  }
  window.addEventListener('message', async msg => {
    const tab = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      action: 'getOwnTab'
    });
    if (!tab.id) {
      throw new Error('unable to determine tab id!');
    }
    if (msg.data.action === 'open' && msg.data.component === 'sidebar') {
      const store = await (0,_client_core_syncstore__WEBPACK_IMPORTED_MODULE_1__.makeProxyStores)();
      store[1].getState().setFrames([]);
      store[1].getState().addAgendaFrame(String(tab.id));
    }
    if (msg.data.action === 'open' && msg.data.component === 'welcome') {
      window.location.href = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.getURL('/pages/frame.html?id=welcome');
    }
  });
};

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef","default-libs_platform_src_index_ts","default-libs_syncstore_src_index_ts"], () => (__webpack_exec__("./src/app/content/wdioHarness.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);