"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["gMenu.content"],{

/***/ "./src/app/gmail/contentscript.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_features_gmenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/features/gmenu/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_syncstore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/syncstore/src/index.ts");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/app/platform.tsx");






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
  constructor(tabId, store, uiStore) {
    this.observer = void 0;
    // ComposeData, reflecting the desired state for each gmail compose window
    this.lastKnownRange = new Range();
    this.started = false;
    this._composes = [];
    this.tabId = tabId;
    this.store = store;
    this.uiStore = uiStore;
    this.observer = this.makeMutationObserver();
    this.onClick = this.onClick.bind(this);
    this.onUnload = this.onUnload.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    const checkEnabled = state => {
      const self = state.integrations[_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.gmailv1];
      if (!this.started && self.enabled) {
        this.start();
      }
      if (this.started && !self.enabled) {
        this.stop();
      }
      this.composes.forEach(c => {
        c.etCount = state.recentlyUsedEventTypes.length;
        c.handlePopover();
      });
      this.reconcileComposes();
    };
    checkEnabled(store.getState());
    store.subscribe((state, lastState) => {
      checkEnabled(state);
    });
    window.addEventListener('message', this.onWindowMessage.bind(this));
  }
  onUnload() {
    this.stop();
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(this.handleMessage);
  }
  handleMessage(data, sender, sendResponse) {
    if (!data) return;
    if (data.action === 'unload' && data.integration === 'gmailv1') {
      this.stop();
    } else if (data.action === 'load' && data.integration === 'gmailv1') {
      this.start();
      if (sendResponse) sendResponse(true);
    }
  }
  async onClick(evt) {
    this.composes.forEach(compose => {
      compose.handlePopover();
    });
    this.store.getState().updatePopoverData(_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.gmailv1, {
      showPopover: false
    });
  }
  onResize() {
    requestAnimationFrame(() => {
      this.composes.forEach(c => c.handlePopover());
    });
  }
  onScroll() {
    this.composes.forEach(compose => {
      compose.handlePopover();
    });
  }
  findCompose() {
    var _document$querySelect;
    const popoverId = (_document$querySelect = document.querySelector('#gMenuPopover')) == null ? void 0 : _document$querySelect.getAttribute('data-compose-id');
    const compose = this.composes.find(c => c.id === popoverId);
    if (!compose) {
      console.log('Found no compose for popover: ', popoverId);
    }
    return compose;
  }
  async handleInsertMessage(message) {
    const compose = this.findCompose();
    this.store.getState().updatePopoverData(_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.gmailv1, {
      showPopover: false
    });
    compose == null || compose.insertIntoCompose(this.lastKnownRange, message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async onWindowMessage(evt) {
    if (evt.data.action) {
      switch (evt.data.action) {
        case 'insert':
          this.handleInsertMessage(evt.data.text);
          break;
        case 'focusGmailPopover':
          {
            const iframe = document.getElementById('gMenuPopover');
            if (iframe instanceof HTMLIFrameElement) {
              var _iframe$contentWindow;
              (_iframe$contentWindow = iframe.contentWindow) == null || _iframe$contentWindow.postMessage(evt.data, '*');
            }
            break;
          }
        case 'focusGmailBar':
        case 'focusGmailBarNextElement':
          {
            const iframe = document.getElementById(`bar-frame-${evt.data.composeId}`);
            if (iframe instanceof HTMLIFrameElement) {
              var _iframe$contentWindow2;
              (_iframe$contentWindow2 = iframe.contentWindow) == null || _iframe$contentWindow2.postMessage(evt.data, '*');
            }
            break;
          }
        case 'focusGmailButton':
          {
            const iframe = document.getElementById(`button-frame-${evt.data.composeId}`);
            if (iframe instanceof HTMLIFrameElement) {
              var _iframe$contentWindow3;
              (_iframe$contentWindow3 = iframe.contentWindow) == null || _iframe$contentWindow3.postMessage(evt.data, '*');
            }
            break;
          }
        case 'focusGmailButtonPrevElement':
          {
            var _this$composes$find;
            (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_2__.focusLastChild)((_this$composes$find = this.composes.find(c => c.id === evt.data.composeId)) == null ? void 0 : _this$composes$find.sendRow().get(0));
            break;
          }
        case 'focusGmailButtonNextElement':
          {
            const td = document.getElementById(`button-${evt.data.composeId}`);
            (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_2__.focusNextSibling)(td);
            break;
          }
      }
    }
  }
  async reconcileComposes() {
    const state = this.store.getState();
    const self = state.integrations[_client_core_store__WEBPACK_IMPORTED_MODULE_3__.IntegrationId.gmailv1];
    const popoverEtCount = state.recentlyUsedEventTypes.length;
    const showBar = self.popoverData.showBar && state.user;
    const showPopover = self.popoverData.showPopover && state.user;
    const composeId = self.popoverData.popoverComposeId;
    this.composes.forEach(c => {
      showBar ? c.showBar() : c.hideBar();
      if (showPopover && composeId === c.id) {
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
    Array.from(document.getElementsByClassName('An')).forEach(node => {
      const match = node.closest('div.M9');
      if (!match) return;
      const composerMatch = match.querySelector("[contenteditable='true']");
      if (!composerMatch) return;
      if (match.classList.contains('calendly-handled')) return;
      match.classList.add('calendly-handled');
      const compose = new _client_core_features_gmenu__WEBPACK_IMPORTED_MODULE_1__.GMailCompose(match, this.tabId, true, this.store, this.uiStore, _platform__WEBPACK_IMPORTED_MODULE_5__.platform, () => {
        requestAnimationFrame(() => {
          this.composes.forEach(c => c.handlePopover());
        });
      });
      this.composes = [...this.composes, compose];
      this.reconcileComposes();
    });
  }
  onSelection() {
    const messageBody = document.querySelector('[g_editable="true"][role="textbox"]');
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
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(this.handleMessage);
    this.observer.observe(document.body, {
      attributes: true,
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
  new FrameManager(tab.id, store[0], store[1]);
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef","vendors-_calendly_ui_node_modules_classnames_index_js-node_modules_nx_js_node_modules_babel_r-b95540","vendors-node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty_js-3472f0","vendors-node_modules_prop-types_index_js","default-libs_platform_src_index_ts","default-libs_syncstore_src_index_ts","default-src_app_platform_tsx","default-libs_assets_src_index_ts-libs_hooks_src_index_ts-_calendly_ui_dist_components_bare-bu-5822a1","default-libs_shared_components_src_index_ts-_calendly_ui_dist_components_bare-button_styles_j-49f944","default-libs_features_gmenu_src_index_ts"], () => (__webpack_exec__("./src/app/gmail/contentscript.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);