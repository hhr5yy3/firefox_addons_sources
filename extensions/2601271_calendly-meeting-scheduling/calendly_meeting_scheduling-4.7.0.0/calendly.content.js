"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["calendly.content"],{

/***/ "./src/app/content/calendly.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

(async () => {
  if (window.location.pathname === '/extensions/client_invitee_rescheduled') {
    var _params$get;
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString.replace(/\?/g, '&'));
    const uuid = (_params$get = params.get('uuid')) == null ? void 0 : _params$get.split('&')[0];
    const rescheduled = params.get('rescheduled');
    const newEventUuid = params.get('eventUuid');
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      message: 'invitee_rescheduled',
      uuid,
      rescheduled,
      newEventUuid
    });
  } else if (window.location.pathname === '/extensions/client_invitee_canceled') {
    var _params$get2;
    const params = new URLSearchParams(window.location.search);
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      message: 'invitee_canceled',
      uuid: (_params$get2 = params.get('uuid')) == null ? void 0 : _params$get2.split('?')[0],
      success: params.get('success') === 'true',
      resource: params.get('resource')
    });
  } else if (window.location.pathname === '/extensions/client_event_booked') {
    var _params$get3;
    const params = new URLSearchParams(window.location.search);
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      message: 'event_booked',
      success: params.get('success') === 'true',
      uuid: (_params$get3 = params.get('uuid')) == null ? void 0 : _params$get3.split('?')[0]
    });
  } else if (window.location.pathname === '/extensions/client_event_type_creation') {
    const params = new URLSearchParams(window.location.search);
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      message: 'event_type_creation_response',
      openEditEventType: params.get('open_edit_event_type')
    });
  } else if (window.location.pathname === '/extensions/client_logout_submit') {
    const search = window.location.search.replace('?', '');
    const params = new URLSearchParams(search);
    if (params.get('status') === 'cancel') {
      const port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.connect({
        name: 'auth-port'
      });
      port.postMessage({
        message: 'logoutcanceled'
      });
    } else {
      const port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.connect({
        name: 'auth-port'
      });
      port.postMessage({
        message: 'loggedout'
      });
    }
  }
})();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js"], () => (__webpack_exec__("./src/app/content/calendly.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);