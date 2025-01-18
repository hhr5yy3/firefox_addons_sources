"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["linkedIn.content"],{

/***/ "./src/app/linkedIn/contentscript.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_features_linkedin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/features/linkedin/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_syncstore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/syncstore/src/index.ts");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/app/platform.tsx");







// Runonce check
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
webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(async (msg, sender) => {
  if (msg && msg.action && msg.action === 'content_script_check') {
    return 'known-good-response';
  }
});
const storePromise = (0,_client_core_syncstore__WEBPACK_IMPORTED_MODULE_4__.makeProxyStores)();
class FrameManager {
  get popupsShownSinceUse() {
    return this._popupsShownSinceUse;
  }
  set popupsShownSinceUse(p) {
    this._popupsShownSinceUse = p;
  }
  get composes() {
    return this._composes;
  }
  set composes(arg) {
    this._composes = arg;
    this.reconcileComposes();
  }
  constructor(tabId, store) {
    var _this = this;
    this.ebnf = {};
    this._popupsShownSinceUse = 0;
    this.maxPopupsShownSinceUse = 1;
    this.observer = void 0;
    this.started = false;
    this._composes = [];
    this.tabId = tabId;
    this.store = store;
    this.observer = this.makeMutationObserver();
    this.onClick = this.onClick.bind(this);
    this.onUnload = this.onUnload.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    const checkEnabled = state => {
      const self = state.integrations[_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.linkedinv1];
      if (!this.started && self.enabled) {
        setTimeout(() => {
          this.start();
        }, 1000);
      }
      if (this.started && !self.enabled) {
        this.stop();
      }
    };
    const setup = async function setup() {
      checkEnabled(store.getState());
      _this.store.subscribe(state => {
        _platform__WEBPACK_IMPORTED_MODULE_5__.platform.analytics.setUser(state.user);
        checkEnabled(state);
        _this.reconcileComposes();
      });
      _this.reconcileComposes();
    };
    setup();
    const loadEBNF = async function loadEBNF() {
      _this.ebnf = await _platform__WEBPACK_IMPORTED_MODULE_5__.platform.calendlyApi.getEBNF('linkedin');
    };
    loadEBNF();
    window.addEventListener('message', this.onWindowMessage.bind(this));
  }
  onUnload() {
    this.stop();
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(this.handleMessage);
  }
  handleMessage(data, sender, sendResponse) {
    if (!data) return;
    if (data.action === 'unload' && data.integration === 'linkedinv1') {
      this.stop();
    } else if (data.action === 'load' && data.integration === 'linkedinv1') {
      this.start();
      if (sendResponse) sendResponse(true);
    }
  }
  onClick(evt) {
    this.store.getState().updatePopoverData(_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.linkedinv1, {
      showPopover: false
    });
  }
  onResize() {
    this.composes.forEach(compose => {
      compose.handleWindowResize();
    });
  }
  onScroll() {
    this.composes.forEach(compose => {
      compose.handleWindowScroll();
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async onWindowMessage(evt) {
    if (evt.data.action) {
      switch (evt.data.action) {
        case 'insert':
          {
            var _document$querySelect;
            const popoverId = (_document$querySelect = document.querySelector('#linkedInPopover')) == null ? void 0 : _document$querySelect.getAttribute('data-compose-id');
            const compose = this.composes.find(c => c.id === popoverId);
            if (!compose) {
              console.log('Found no compose for popover: ', popoverId);
              return;
            }
            compose.insertIntoCompose(evt.data.text);
            this.store.getState().updatePopoverData(_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.linkedinv1, {
              showPopover: false
            });
          }
          break;
        case 'focusLinkedInPopover':
          {
            const iframe = document.getElementById('linkedInPopover');
            if (iframe instanceof HTMLIFrameElement) {
              var _iframe$contentWindow;
              (_iframe$contentWindow = iframe.contentWindow) == null || _iframe$contentWindow.postMessage(evt.data, '*');
            }
            break;
          }
        case 'focusLinkedInButton':
          {
            const iframe = document.getElementById(`button-frame-${evt.data.composeId}`);
            if (iframe instanceof HTMLIFrameElement) {
              var _iframe$contentWindow2;
              (_iframe$contentWindow2 = iframe.contentWindow) == null || _iframe$contentWindow2.postMessage(evt.data, '*');
            }
            break;
          }
        case 'focusLinkedInButtonPrevElement':
          {
            const td = document.getElementById(`button-${evt.data.composeId}`);
            (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_2__.focusPrevSibling)(td);
            break;
          }
        case 'focusLinkedInButtonNextElement':
          {
            var _document$getElementB;
            const td = (_document$getElementB = document.getElementById(`button-${evt.data.composeId}`)) == null ? void 0 : _document$getElementB.parentElement;
            (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_2__.focusNextSibling)(td);
            break;
          }
      }
    }
  }
  async reconcileComposes() {
    const state = this.store.getState();
    const self = state.integrations[_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.linkedinv1];
    const popoverEtCount = state.recentlyUsedEventTypes.length;
    const showPopover = self.popoverData.showPopover;
    const popoverComposeId = self.popoverData.popoverComposeId;
    this.composes.forEach(c => {
      if (showPopover && popoverComposeId === c.id) {
        c.showPopover(popoverEtCount);
      } else {
        c.hidePopover();
      }
    });
  }
  processDOM() {
    const tasks = this.ebnf;
    this.composes = this.composes.filter(c => {
      if (c.exists()) {
        return true;
      }
      c.cleanup();
      return false;
    });
    for (const [key, value] of Object.entries(tasks)) {
      (0,_client_core_features_linkedin__WEBPACK_IMPORTED_MODULE_1__.ebnf)(value, (element, button, frame, insertElement) => {
        const newCompose = new _client_core_features_linkedin__WEBPACK_IMPORTED_MODULE_1__.LinkedInCompose(element, button, insertElement, frame, key, true);
        this.composes = [...this.composes, newCompose];
      });
    }
  }
  excessivePopups() {
    return this._popupsShownSinceUse >= this.maxPopupsShownSinceUse;
  }
  makeMutationObserver() {
    return new MutationObserver(() => {
      this.processDOM();
    });
  }
  start() {
    window.addEventListener('click', this.onClick);
    window.addEventListener('beforeunload', this.onUnload);
    document.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
    const contentMain = document.getElementById('content-main');
    if (contentMain) {
      contentMain.addEventListener('scroll', this.onScroll);
    }
    this.processDOM();
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(this.handleMessage);
    this.observer.observe(document.body, {
      attributes: false,
      childList: true,
      subtree: true
    });
    this.started = true;
  }
  stop() {
    window.removeEventListener('click', this.onClick);
    document.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    const contentMain = document.getElementById('content-main');
    if (contentMain) {
      contentMain.removeEventListener('scroll', this.onScroll);
    }
    this.composes.forEach(c => {
      c.cleanup();
    });
    this.composes = [];
    this.observer.disconnect();
    this.started = false;
  }
}
Promise.all([tabIdPromise, storePromise]).then(([tab, store]) => {
  new FrameManager(tab.id, store[0]);
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef","vendors-_calendly_ui_node_modules_classnames_index_js-node_modules_nx_js_node_modules_babel_r-b95540","vendors-node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty_js-3472f0","default-libs_platform_src_index_ts","default-libs_syncstore_src_index_ts","default-src_app_platform_tsx","default-libs_assets_src_index_ts-libs_hooks_src_index_ts-_calendly_ui_dist_components_bare-bu-5822a1","default-libs_shared_components_src_index_ts-_calendly_ui_dist_components_bare-button_styles_j-49f944","default-libs_features_linkedin_src_index_ts"], () => (__webpack_exec__("./src/app/linkedIn/contentscript.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);