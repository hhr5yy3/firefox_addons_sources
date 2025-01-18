"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["gong.content"],{

/***/ "./src/app/gong/contentscript.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_features_gong__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/features/gong/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_syncstore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/syncstore/src/index.ts");





const tabIdPromise = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
  action: 'getOwnTab'
});
const storePromise = (0,_client_core_syncstore__WEBPACK_IMPORTED_MODULE_4__.makeProxyStores)();
class FrameManager {
  get composes() {
    return this._composes;
  }
  set composes(arg) {
    this._composes = arg;
    this.reconcileComposes();
  }
  constructor(tabId, store) {
    this.observer = void 0;
    this._composes = [];
    this.lastKnownRange = new Range();
    this.started = false;
    this.tabId = tabId;
    this.store = store;
    this.observer = this.makeMutationObserver();
    this.onClick = this.onClick.bind(this);
    this.onUnload = this.onUnload.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onSelection = this.onSelection.bind(this);
    const checkEnabled = state => {
      const self = state.integrations[_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.gongv1];
      if (!this.started && self.enabled) {
        this.start();
      }
      if (this.started && !self.enabled) {
        this.stop();
      }
      this.reconcileComposes();
    };
    checkEnabled(store.getState());
    store.subscribe((state, lastState) => {
      checkEnabled(state);
    });
    window.addEventListener('message', this.onWindowMessage.bind(this));
  }
  async onSettingChange(newSettings) {
    this.reconcileComposes();
  }
  onUnload() {
    this.stop();
  }
  onClick(evt) {
    this.store.getState().updatePopoverData(_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.gongv1, {
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
            const popoverId = (_document$querySelect = document.querySelector('#gongPopover')) == null ? void 0 : _document$querySelect.getAttribute('data-compose-id');
            const compose = this.composes.find(c => c.id === popoverId);
            compose == null || compose.insertIntoCompose(this.lastKnownRange, evt.data.text);
            this.store.getState().updatePopoverData(_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.gongv1, {
              showPopover: false
            });
          }
          break;
        case 'focusGongPopover':
          {
            const iframe = document.getElementById('gongPopover');
            if (iframe instanceof HTMLIFrameElement) {
              var _iframe$contentWindow;
              (_iframe$contentWindow = iframe.contentWindow) == null || _iframe$contentWindow.postMessage(evt.data, '*');
            }
            break;
          }
        case 'focusGongButton':
          {
            const iframe = document.getElementById(`button-frame-${evt.data.composeId}`);
            if (iframe instanceof HTMLIFrameElement) {
              var _iframe$contentWindow2;
              (_iframe$contentWindow2 = iframe.contentWindow) == null || _iframe$contentWindow2.postMessage(evt.data, '*');
            }
            break;
          }
        case 'focusGongButtonPrevElement':
          {
            const frame = document.getElementById(`button-frame-${evt.data.composeId}`);
            (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_2__.focusPrevSibling)(frame);
            break;
          }
        case 'focusGongButtonNextElement':
          {
            const frame = document.getElementById(`button-frame-${evt.data.composeId}`);
            (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_2__.focusNextSibling)(frame);
            break;
          }
      }
    }
  }
  async reconcileComposes() {
    const state = this.store.getState();
    const self = state.integrations[_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.gongv1];
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
    this.composes = this.composes.filter(c => {
      if (c.exists()) {
        return true;
      }
      c.cleanup();
      return false;
    });
    document.querySelectorAll('.mail-editor-window__content:not(.calendly-handled)').forEach(el => {
      el.classList.add('calendly-handled');
      if (el instanceof HTMLElement) {
        const compose = new _client_core_features_gong__WEBPACK_IMPORTED_MODULE_1__.GongCompose(el, true);
        this.composes = [...this.composes, compose];
      }
    });
  }
  onSelection() {
    const messageBody = document.querySelector('#mail-editor-body');
    const selection = window.getSelection();
    if (messageBody === null || selection === null || selection.type === 'None' || selection.rangeCount === 0 || !messageBody.contains(selection.anchorNode)) {
      return;
    }
    this.lastKnownRange = selection.getRangeAt(0).cloneRange();
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
    document.addEventListener('selectionchange', this.onSelection);
    const contentMain = document.getElementById('content-main');
    if (contentMain) {
      contentMain.addEventListener('scroll', this.onScroll);
    }
    this.processDOM();
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef","vendors-_calendly_ui_node_modules_classnames_index_js-node_modules_nx_js_node_modules_babel_r-b95540","vendors-node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty_js-3472f0","default-libs_platform_src_index_ts","default-libs_syncstore_src_index_ts","default-libs_assets_src_index_ts-libs_hooks_src_index_ts-_calendly_ui_dist_components_bare-bu-5822a1","default-libs_shared_components_src_index_ts-_calendly_ui_dist_components_bare-button_styles_j-49f944","default-libs_features_gong_src_index_ts"], () => (__webpack_exec__("./src/app/gong/contentscript.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);