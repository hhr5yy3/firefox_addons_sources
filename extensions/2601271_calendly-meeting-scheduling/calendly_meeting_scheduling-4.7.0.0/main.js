"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["main"],{

/***/ "./src/app/background.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/syncstore/src/index.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/environments/environment.production.ts");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/app/platform.tsx");





const defaultStore = (0,_client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.connectProxyStores)(_client_core_store__WEBPACK_IMPORTED_MODULE_1__.StoreNames.dataStore, _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.sharedDataStore);
const uiStore = (0,_client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.connectProxyStores)(_client_core_store__WEBPACK_IMPORTED_MODULE_1__.StoreNames.uiStore, _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.sharedUiStore);
const firefoxNetwork = _platform__WEBPACK_IMPORTED_MODULE_4__.platform.network;
const firefoxFlow = _platform__WEBPACK_IMPORTED_MODULE_4__.platform.flow;
if (defaultStore.getState().userToken !== null) {
  firefoxNetwork.setToken(defaultStore.getState().userToken);
}
defaultStore.subscribe((state, prev) => {
  if (state.userToken !== prev.userToken) {
    firefoxNetwork.setToken(state.userToken);
  }
});
firefoxNetwork.setTokenHandler(defaultStore.getState().setUserToken);
firefoxFlow.setTokenHandler(defaultStore.getState().setUserToken);
const main = async () => {
  defaultStore.platformMiddleware.setPlatform({
    platform: _platform__WEBPACK_IMPORTED_MODULE_4__.platform,
    dataStore: defaultStore,
    uiStore
  });
  defaultStore.subscribe((state, prev) => {
    var _state$user, _prev$user;
    if (((_state$user = state.user) == null ? void 0 : _state$user.email) !== ((_prev$user = prev.user) == null ? void 0 : _prev$user.email)) setUninstallUrl(state.user);
  });
  setBadgeText();
  _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.sharedDataStore.getState().fetchEventTypes();
};
main();
function isUnsupportedUri(url) {
  if (url.startsWith('https://chrome.google.com')) {
    return true;
  }
  if (url.startsWith('https://addons.mozilla.org')) {
    return true;
  }
  return url.match(new RegExp('^(http|https|ftp|file|chrome-extension|moz-extension)://', 'i')) ? false : true;
}
async function setBadgeText() {
  if ((webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().extension).inIncognitoContext) {
    return;
  }
  const settings = await _platform__WEBPACK_IMPORTED_MODULE_4__.platform.settings.get();
  await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().browserAction.setBadgeText({
    text: settings.badgeText
  });
  _platform__WEBPACK_IMPORTED_MODULE_4__.platform.settings.addEventListener(async () => {
    const newSettings = await _platform__WEBPACK_IMPORTED_MODULE_4__.platform.settings.get();
    await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().browserAction.setBadgeText({
      text: newSettings.badgeText
    });
  });
}

// Do not place these event registration calls in an async method
// They will randomly fail on chrome, even if there is no await call
// beforehand. (chrome - why have you started sucking?)
//-----------------------------------------------------------------
webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onInstalled.addListener(async details => {
  try {
    if (details.reason === 'install') {
      // Firefox hangs onto storage values - very annoying.
      // Force clear them on install events
      clearStorage();
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.showWelcome) {
        await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.create({
          url: '/pages/frame.html?id=welcome&showsidebar=true'
        });
      }
    } else if (details.reason === 'update') {
      const updatedAlready = uiStore.getState().isUpdate;
      if (!updatedAlready) {
        uiStore.getState().setIsUpdate();
      }

      //Integration cleanup
      const _tabs = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.query({
        url: ['https://mail.google.com/*', 'https://calendar.google.com/*', 'https://www.linkedin.com/*', 'https://*.app.gong.io/*']
      });
      const cleanup = () => {
        window.location.reload();
      };
      _tabs.forEach(async tab => {
        if (!tab.id) return;
        await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().scripting.executeScript({
          target: {
            tabId: tab.id
          },
          func: cleanup
        });
      });
    }
    setUninstallUrl(defaultStore.getState().user);
    //Integration cleanup
    const tabs = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.query({
      url: ['https://mail.google.com/*', 'https://calendar.google.com/*', 'https://www.linkedin.com/*', 'https://*.app.gong.io/*']
    });
    tabs.forEach(async tab => {
      await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.executeScript(tab.id, {
        file: '/module_async_cleanup.js'
      });
    });
  } catch (error) {
    console.error('Failed during onInstall', error);
  }
});
webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().browserAction.onClicked.addListener(async tab => {
  if (!tab.id) {
    throw new Error(`Tab missing id - ${tab}`);
  }
  const tabs = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.query({});
  const validFrames = _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.sharedUiStore.getState().frames.filter(f => {
    return typeof tabs.find(t => t.id === Number(f.tabId)) !== 'undefined';
  });
  _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.sharedUiStore.getState().setFrames(validFrames);
  let tabId = String(tab.id);
  if (!tab.url || isUnsupportedUri(tab.url)) {
    const newtab = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.create({
      url: '/pages/frame.html?id=welcome'
    });
    tabId = String(newtab.id);
  }

  // Now Toggle the sidebar on this tab
  // Remove if existing
  const defaultView = uiStore.getState().defaultView;
  const existing = validFrames.find(f => f.tabId === tabId && f.role === defaultView);
  const existingPopups = validFrames.filter(f => f.tabId === tabId && f.role === 'popup');
  if (existing) {
    _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.sharedUiStore.getState().removeFrame(existing.id);
    existingPopups.forEach(popup => {
      _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.sharedUiStore.getState().removeFrame(popup.id);
    });
  } else {
    _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.sharedUiStore.getState().addAgendaFrame(tabId);
  }
});
webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener((msg, sender) => {
  try {
    if (msg.action && msg.action === 'getOwnTab') {
      return Promise.resolve(sender.tab);
    } else if (msg.action && msg.action === 'close-tab') {
      var _sender$tab;
      if ((_sender$tab = sender.tab) != null && _sender$tab.id) {
        webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.remove(sender.tab.id);
      }
      return Promise.resolve();
    } else if (msg.action === 'uninstall') {
      uninstallSelf();
    } else if (msg.action === 'refresh') {
      _client_core_syncstore__WEBPACK_IMPORTED_MODULE_2__.sharedDataStore.getState().fetchEventTypes();
    } else if (msg.action === 'options') {
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.openOptionsPage();
    } else if (msg.action === 'getUsageStats') {
      return Promise.resolve(getUsageStats());
    } else if (msg.action === 'setUninstallUrl') {
      if (!_platform__WEBPACK_IMPORTED_MODULE_4__.platform.optional.setUninstallUrl) {
        throw new Error('This platform does not support SetUninstallUrl');
      }
      _platform__WEBPACK_IMPORTED_MODULE_4__.platform.optional.setUninstallUrl(msg.url);
    }
  } catch (error) {
    console.error('Failed during onMessage', error);
  }
});
async function setUninstallUrl(user) {
  const settings = await _platform__WEBPACK_IMPORTED_MODULE_4__.platform.settings.get();
  if (!_platform__WEBPACK_IMPORTED_MODULE_4__.platform.optional.setUninstallUrl) {
    throw new Error('this platform does not support SetUninstallUrl');
  }
  _platform__WEBPACK_IMPORTED_MODULE_4__.platform.optional.setUninstallUrl(`${settings.apiHost}/extensions/${_platform__WEBPACK_IMPORTED_MODULE_4__.platform.info.name}-uninstall?version=${_platform__WEBPACK_IMPORTED_MODULE_4__.platform.info.version}${user && `&email=${encodeURIComponent(user.email)}`}`);
}
async function uninstallSelf() {
  const settings = await _platform__WEBPACK_IMPORTED_MODULE_4__.platform.settings.get();
  if (settings.environment !== 'test') {
    throw new Error('refusing to uninstall in non-test env.');
  }
  webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().management.uninstallSelf();
}
async function clearStorage() {
  const settings = await _platform__WEBPACK_IMPORTED_MODULE_4__.platform.settings.get();
  if (settings.environment !== 'test') {
    defaultStore.getState().purge();
    await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage.local.clear();
    await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage.sync.clear();
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.reload();
  }
}
function getUsageStats() {
  const resp = {};
  const state = defaultStore.getState();
  if (state.userToken) {
    var _state$user2;
    resp.userId = (_state$user2 = state.user) == null ? void 0 : _state$user2.id;
    resp.userAuthTime = String(state.userToken.created_at);
  }
  if (state.userLastUsed) {
    resp.sidebarOpenTime = state.userLastUsed;
  }
  return resp;
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef","default-libs_platform_src_index_ts","default-libs_syncstore_src_index_ts","default-src_app_platform_tsx"], () => (__webpack_exec__("./src/app/background.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);