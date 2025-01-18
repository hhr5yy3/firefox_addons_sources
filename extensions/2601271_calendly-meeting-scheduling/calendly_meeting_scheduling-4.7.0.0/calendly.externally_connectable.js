"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["calendly.externally_connectable"],{

/***/ "./src/app/content/calendly_externally_connectable.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/app/platform.tsx");


window.addEventListener('message', msg => {
  if (msg.data.action === 'isInstalled') {
    console.log('handling installed case');
    window.postMessage({
      action: 'isInstalledResponse',
      isInstalled: true,
      version: _platform__WEBPACK_IMPORTED_MODULE_1__.platform.info.version
    });
  } else if (msg.data.action === 'getUsageStats') {
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      action: 'getUsageStats'
    }).then(stats => {
      window.postMessage(Object.assign({
        action: 'getUsageStatsResponse'
      }, stats));
    });
  }
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","default-libs_platform_src_index_ts","default-src_app_platform_tsx"], () => (__webpack_exec__("./src/app/content/calendly_externally_connectable.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);