"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["gMenuButton.iframe"],{

/***/ "./src/app/gmail/button.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react-dom/client.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_contexts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/contexts/src/index.ts");
/* harmony import */ var _client_core_features_gmenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/features/gmenu/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_syncstore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/syncstore/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/app/platform.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/apps/firefox/src/app/gmail/button.tsx";













const render = async () => {
  const [dataStore, uiStore] = await (0,_client_core_syncstore__WEBPACK_IMPORTED_MODULE_6__.makeProxyStores)();
  dataStore.subscribe(state => {
    _platform__WEBPACK_IMPORTED_MODULE_9__.platform.analytics.setUser(state.user);
  });
  function ComposeToggleContainer() {
    const store = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.DataStoreContext);
    const user = (0,zustand__WEBPACK_IMPORTED_MODULE_11__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.userSelector);
    const userLoaded = (0,zustand__WEBPACK_IMPORTED_MODULE_11__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.userLoadedSelector);
    const barOpen = (0,zustand__WEBPACK_IMPORTED_MODULE_11__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.gmailLegacyBarSelector);
    const updatePopover = (0,zustand__WEBPACK_IMPORTED_MODULE_11__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.updatePopoverDataSelector);
    const params = new URLSearchParams(window.location.search);
    const composeId = params.get('composeid') || '';
    const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_4__.usePlatform)();
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_client_core_features_gmenu__WEBPACK_IMPORTED_MODULE_3__.ComposeToggle, {
      pressed: user !== null && barOpen,
      onClick: async () => {
        if (userLoaded && user !== null) {
          if (barOpen) {
            updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
              showBar: false,
              showPopover: false,
              popoverComposeId: undefined
            });
          } else {
            updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
              showBar: true,
              showPopover: false,
              popoverComposeId: undefined
            });
          }
          await platform.analytics.track(barOpen ? _client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.GMenuClose : _client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.GMenuOpen);
        } else {
          platform.flow.sidebar();
          platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.GMenuOpenSidebar);
        }
      },
      onKeyDown: e => {
        if (barOpen && e.code === 'Tab' && !e.shiftKey) {
          e.preventDefault();
          window.parent.postMessage({
            action: 'focusGmailBar',
            composeId
          }, '*');
        }

        // Firefox focuses on the iframe before going to the previous element.
        // So we prevent this behavior and manually focus the previous element.
        if (e.code === 'Tab' && e.shiftKey) {
          e.preventDefault();
          window.parent.postMessage({
            action: 'focusGmailButtonPrevElement',
            composeId
          }, '*');
        }
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }, this);
  }
  const target = document.getElementById('root');
  if (!target) {
    console.error('Missing element #root');
    return;
  }
  const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(target);
  root.render( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.UiStoreContext.Provider, {
    value: uiStore,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_client_core_contexts__WEBPACK_IMPORTED_MODULE_2__.PlatformContext.Provider, {
      value: _platform__WEBPACK_IMPORTED_MODULE_9__.platform,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.DataStoreContext.Provider, {
        value: dataStore,
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(styled_components__WEBPACK_IMPORTED_MODULE_12__.ThemeProvider, {
          theme: {},
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_client_core_theme__WEBPACK_IMPORTED_MODULE_7__.GlobalStyles, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 100,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(ComposeToggleContainer, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 101,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 99,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 96,
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef","vendors-_calendly_ui_node_modules_classnames_index_js-node_modules_nx_js_node_modules_babel_r-b95540","vendors-node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty_js-3472f0","vendors-node_modules_prop-types_index_js","default-libs_platform_src_index_ts","default-libs_syncstore_src_index_ts","default-src_app_platform_tsx","default-libs_assets_src_index_ts-libs_hooks_src_index_ts-_calendly_ui_dist_components_bare-bu-5822a1","default-libs_shared_components_src_index_ts-_calendly_ui_dist_components_bare-button_styles_j-49f944","default-libs_features_gmenu_src_index_ts"], () => (__webpack_exec__("./src/app/gmail/button.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);