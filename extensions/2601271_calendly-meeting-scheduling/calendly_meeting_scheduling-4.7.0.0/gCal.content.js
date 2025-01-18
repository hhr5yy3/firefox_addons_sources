"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["gCal.content"],{

/***/ "./src/app/gcal/contentscript.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_features_gcal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/features/gcal/src/index.ts");
/* harmony import */ var _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/syncstore/src/index.ts");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/app/platform.tsx");





// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasRun = window.CalendlyRuntimeCheck;
if (!hasRun) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.CalendlyRuntimeCheck = true;
} else {
  throw new Error('duplicate content_script detected.');
}
const tabIdPromise = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
  action: 'getOwnTab'
});
const storePromise = (0,_client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.makeProxyStores)();
webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(async (msg, sender) => {
  if ((msg == null ? void 0 : msg.action) === 'content_script_check') {
    return 'known-good-response';
  }
});
Promise.all([tabIdPromise, storePromise]).then(async ([tab, store]) => {
  new _client_core_features_gcal__WEBPACK_IMPORTED_MODULE_1__.FrameManager(tab.id, store[0], _platform__WEBPACK_IMPORTED_MODULE_3__.platform);
});

/***/ }),

/***/ "../../node_modules/react-dom/client.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__("../../node_modules/react-dom/index.js");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef","vendors-_calendly_ui_node_modules_classnames_index_js-node_modules_nx_js_node_modules_babel_r-b95540","vendors-node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty_js-3472f0","default-libs_platform_src_index_ts","default-libs_syncstore_src_index_ts","default-src_app_platform_tsx","default-libs_assets_src_index_ts-libs_hooks_src_index_ts-_calendly_ui_dist_components_bare-bu-5822a1","default-libs_shared_components_src_index_ts-_calendly_ui_dist_components_bare-button_styles_j-49f944","default-libs_features_gcal_src_index_ts"], () => (__webpack_exec__("./src/app/gcal/contentscript.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);