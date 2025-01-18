"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["gCalBarActionsMenu.iframe"],{

/***/ "./src/app/gcal/barActionsMenu.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react-dom/client.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client_core_contexts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/contexts/src/index.ts");
/* harmony import */ var _client_core_features_gcal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/features/gcal/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_syncstore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/syncstore/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/app/platform.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/apps/firefox/src/app/gcal/barActionsMenu.tsx";










const render = async () => {
  const tab = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.sendMessage({
    action: 'getOwnTab'
  });
  if (typeof tab.id === 'undefined') {
    throw new Error('Frame needs a tab id to operate in chrome.');
  }
  const [dataStore, uiStore] = await (0,_client_core_syncstore__WEBPACK_IMPORTED_MODULE_5__.makeProxyStores)();
  dataStore.subscribe(state => {
    _platform__WEBPACK_IMPORTED_MODULE_7__.platform.analytics.setUser(state.user);
  });
  const target = document.getElementById('root');
  if (!target) {
    console.error('Missing element #root');
    return;
  }
  const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(target);
  root.render( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.UiStoreContext.Provider, {
    value: uiStore,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_client_core_contexts__WEBPACK_IMPORTED_MODULE_2__.PlatformContext.Provider, {
      value: _platform__WEBPACK_IMPORTED_MODULE_7__.platform,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.DataStoreContext.Provider, {
        value: dataStore,
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(styled_components__WEBPACK_IMPORTED_MODULE_9__.ThemeProvider, {
          theme: {},
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_client_core_theme__WEBPACK_IMPORTED_MODULE_6__.GlobalStyles, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_client_core_features_gcal__WEBPACK_IMPORTED_MODULE_3__.BarActionsMenu, {
            tabId: String(tab.id)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 39,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, undefined));
};
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  render();
} else {
  window.addEventListener('load', render);
}

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
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef","vendors-_calendly_ui_node_modules_classnames_index_js-node_modules_nx_js_node_modules_babel_r-b95540","vendors-node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty_js-3472f0","default-libs_platform_src_index_ts","default-libs_syncstore_src_index_ts","default-src_app_platform_tsx","default-libs_assets_src_index_ts-libs_hooks_src_index_ts-_calendly_ui_dist_components_bare-bu-5822a1","default-libs_shared_components_src_index_ts-_calendly_ui_dist_components_bare-button_styles_j-49f944","default-libs_features_gcal_src_index_ts"], () => (__webpack_exec__("./src/app/gcal/barActionsMenu.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);