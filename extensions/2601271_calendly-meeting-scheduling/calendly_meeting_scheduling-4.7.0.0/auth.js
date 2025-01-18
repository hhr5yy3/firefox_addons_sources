"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["auth"],{

/***/ "./src/app/auth.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

const handleRedirect = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  window.calendlyBrowserOauth = true;
  if (!code || !state) {
    throw new Error('Unable to determine correct action for this redirect. Missing Code or State.');
  }
  const port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.connect({
    name: 'oauth_port'
  });
  postOauthMessage(port, code, state);
  let oauthMessageCount = 0;
  const oauthMessageInterval = window.setInterval(() => {
    postOauthMessage(port, code, state);
    oauthMessageCount++;
    if (oauthMessageCount === 8) {
      clearInterval(oauthMessageInterval);
    }
  }, 500);
};
const postOauthMessage = (port, code, state) => {
  port.postMessage({
    action: 'OAuth_Redirect',
    details: {
      code,
      state
    }
  });
};
handleRedirect();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js"], () => (__webpack_exec__("./src/app/auth.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);