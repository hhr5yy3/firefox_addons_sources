"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["default-src_app_platform_tsx"],{

/***/ "./src/app/platform.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   platform: () => (/* binding */ platform)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/platform/src/index.ts");
/* harmony import */ var _client_core_platform_firefox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/platform-firefox/src/index.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/environments/environment.production.ts");
// This is currently safe to import in the following chrome contexts -
// - service workers
// - background scripts
// - content scripts
// - chrome-extension:// iframes & pages (self-owned)
//
// It may be nessecary to break this up into multiple files for specific contexts if we keep
// running into cases requiring custom handling (ex - networkproxy)
// ex
// - backgroundPlatform
// - contentScriptPlatform
// - serviceWorkerPlatform
// - etc




const defaultConfig = {
  calendlyButtonEnabled: true,
  gCalEventColorsEnabled: false,
  gmenuBarOpen: false,
  educated: false,
  displayedTab: 'all',
  educatedVersion: 0,
  educationStep: 1,
  educationExistingUser: true,
  educationDismissedIntegrationsNewBadge: false,
  educationDismissedIntegrationsGongNewBadge: false,
  featureFlags: {},
  showSearchScore: false,
  showUserGuidePopup: true,
  showFloatingButtonPopup: true
};
const storage = new _client_core_platform_firefox__WEBPACK_IMPORTED_MODULE_2__.FirefoxStorage();
const settings = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.SettingsManager(_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment, defaultConfig, storage);
const session = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.SessionManager(storage);
const info = new _client_core_platform_firefox__WEBPACK_IMPORTED_MODULE_2__.FirefoxInfo();
let network, analytics, flow, optional, calendlyApi;
if ((webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().extension).getBackgroundPage && webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().extension.getBackgroundPage() === window) {
  analytics = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.ConsoleAnalytics();
  network = new _client_core_platform_firefox__WEBPACK_IMPORTED_MODULE_2__.FirefoxNetwork(settings, info);
  optional = new _client_core_platform_firefox__WEBPACK_IMPORTED_MODULE_2__.FirefoxOptional();
  calendlyApi = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.CalendlyApi(network, settings);
  flow = new _client_core_platform_firefox__WEBPACK_IMPORTED_MODULE_2__.FirefoxFlow(settings, info, calendlyApi);
} else {
  analytics = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.NoopAnalytics();
  network = new _client_core_platform_firefox__WEBPACK_IMPORTED_MODULE_2__.FirefoxNetworkProxy();
  optional = new _client_core_platform_firefox__WEBPACK_IMPORTED_MODULE_2__.FirefoxOptionalProxy();
  calendlyApi = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.CalendlyApi(network, settings);
  flow = new _client_core_platform_firefox__WEBPACK_IMPORTED_MODULE_2__.FirefoxFlowProxy(info);
}
const errorManager = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.ErrorManager(_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment, info, calendlyApi, null);
const scheduledEvents = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.ScheduledEventsManager(storage, calendlyApi);
const platform = {
  info,
  storage,
  analytics,
  settings,
  session,
  network,
  calendlyApi,
  flow,
  optional,
  scheduledEvents,
  errorManager
};

/***/ }),

/***/ "./src/environments/environment.production.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  platform: 'firefox',
  type: 'extension',
  environment: 'production',
  production: true,
  apiHost: 'https://calendly.com',
  host: '',
  flashUrl: 'https://clients-assets.calendly.com/flash/messages.json',
  ebnfUrl: 'https://clients-assets.calendly.com/ebnf/linkedin.json',
  errorMessagesUrl: 'https://clients-assets.calendly.com/errors/messages.json',
  keywordDetectionPhrasesUrl: 'https://clients-assets.calendly.com/keyword_detection/phrases.json',
  segmentKey: 'eUgvkJx1INiT3f5QyhB0l4nZPAtU2zGL',
  optimizelyDataFileUrl: 'https://cdn.optimizely.com/datafiles/CQnhX1Qi5QHy7u4zCvj2z.json',
  mobileQrCodeUrl: 'https://clients-assets.calendly.com/mobileqr/mobile-qr.svg',
  airbrakeId: 308464,
  airbrakeKey: 'e3f790ce7de70cf570a4be2adb627dd9',
  developerSettings: false,
  showWelcome: true,
  showEducation: true,
  badgeText: '',
  oauthClientId: 'Ls9ifXNoFoNZX2hF-G8Ygg8XJ6DgEnUQQJr-AI6Giq8',
  oauthRedirectUri: 'https://clients-assets.calendly.com/clients/auth.html'
};

/***/ }),

/***/ "../../libs/platform-firefox/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirefoxEventManager: () => (/* reexport safe */ _lib_eventManager__WEBPACK_IMPORTED_MODULE_7__.FirefoxEventManager),
/* harmony export */   FirefoxFlow: () => (/* reexport safe */ _lib_flow__WEBPACK_IMPORTED_MODULE_3__.FirefoxFlow),
/* harmony export */   FirefoxFlowProxy: () => (/* reexport safe */ _lib_flowProxy__WEBPACK_IMPORTED_MODULE_4__.FirefoxFlowProxy),
/* harmony export */   FirefoxInfo: () => (/* reexport safe */ _lib_info__WEBPACK_IMPORTED_MODULE_5__.FirefoxInfo),
/* harmony export */   FirefoxNetwork: () => (/* reexport safe */ _lib_network__WEBPACK_IMPORTED_MODULE_0__.FirefoxNetwork),
/* harmony export */   FirefoxNetworkProxy: () => (/* reexport safe */ _lib_networkProxy__WEBPACK_IMPORTED_MODULE_1__.FirefoxNetworkProxy),
/* harmony export */   FirefoxOptional: () => (/* reexport safe */ _lib_optional__WEBPACK_IMPORTED_MODULE_6__.FirefoxOptional),
/* harmony export */   FirefoxOptionalProxy: () => (/* reexport safe */ _lib_optional__WEBPACK_IMPORTED_MODULE_6__.FirefoxOptionalProxy),
/* harmony export */   FirefoxStorage: () => (/* reexport safe */ _lib_storage__WEBPACK_IMPORTED_MODULE_2__.FirefoxStorage)
/* harmony export */ });
/* harmony import */ var _lib_network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/platform-firefox/src/lib/network.ts");
/* harmony import */ var _lib_networkProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/platform-firefox/src/lib/networkProxy.ts");
/* harmony import */ var _lib_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/platform-firefox/src/lib/storage.ts");
/* harmony import */ var _lib_flow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/platform-firefox/src/lib/flow.ts");
/* harmony import */ var _lib_flowProxy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/platform-firefox/src/lib/flowProxy.ts");
/* harmony import */ var _lib_info__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/platform-firefox/src/lib/info.ts");
/* harmony import */ var _lib_optional__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/platform-firefox/src/lib/optional.ts");
/* harmony import */ var _lib_eventManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/platform-firefox/src/lib/eventManager.ts");









/***/ }),

/***/ "../../libs/platform-firefox/src/lib/eventManager.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirefoxEventManager: () => (/* binding */ FirefoxEventManager)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

class FirefoxEventManager {
  onEvent(callback) {
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(data => callback(data));
  }
  async emitEvent(data) {
    const tabs = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.query({
      active: true,
      currentWindow: true
    });
    tabs.forEach(async function (tab) {
      if (tab.id) {
        webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.sendMessage(tab.id, data);
      }
    });
  }
}

/***/ }),

/***/ "../../libs/platform-firefox/src/lib/flow.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirefoxFlow: () => (/* binding */ FirefoxFlow)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/platform/src/index.ts");
/* harmony import */ var _util_openWindow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/platform-firefox/src/lib/util/openWindow.ts");
/* eslint-disable no-restricted-globals */



class FirefoxFlow {
  constructor(settings, platformInfo, api) {
    this.OAuthPKCE = void 0;
    this.onTokenChange = null;
    this.settings = settings;
    this.platformInfo = platformInfo;
    this.api = api;
    this.OAuthPKCE = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.OAuthGenericPKCE();
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onConnect.addListener(port => {
      if (port.name === 'flow-port') {
        port.onMessage.addListener(msg => {
          const sendResponse = resp => {
            port.postMessage(resp);
            port.disconnect();
          };
          this.handleMessage(msg, sendResponse, port.sender);
        });
      }
    });
  }
  async copyToEmail(target) {
    const selection = window.getSelection();
    selection == null || selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(target);
    selection == null || selection.addRange(range);
    document.execCommand('copy');
  }
  handleMessage(msg, sendResponse, sender) {
    var _sender$tab;
    if ((0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.isProxiedFlow)(msg)) {
      let wait = Promise.resolve(null);
      switch (msg.flow) {
        case 'oneOff':
          wait = this.webOneOff({
            source: msg.source || 'sidebar'
          });
          break;
        case 'poll':
          wait = this.webPolls({
            source: msg.source || 'sidebar'
          });
          break;
        case 'webReschedulings':
          if (!msg.data || !msg.source) return false;
          wait = this.webReschedulings({
            inviteeUuid: msg.data.inviteeUuid,
            rescheduleUrl: msg.data.rescheduleUrl,
            source: msg.source,
            barId: msg.data.barId,
            tabId: msg.data.tabId,
            closeRescheduleModal: msg.data.closeRescheduleModal
          });
          break;
        case 'webCancel':
          if (!msg.data || !msg.source) return false;
          wait = this.webCancel({
            inviteeUuid: msg.data.inviteeUuid,
            cancelUrl: msg.data.cancelUrl,
            source: msg.source
          });
          break;
        case 'webCustomizeAndShare':
          if (!msg.data || !msg.source) return false;
          wait = this.webCustomizeAndShare({
            etId: msg.data.etId,
            source: msg.source,
            searchView: Boolean(msg.data.searchView)
          });
          break;
        case 'webBook':
          if (!msg.data || !msg.source) return false;
          wait = this.webBook({
            etId: msg.data.etId,
            etType: msg.data.etType,
            etOwnerType: msg.data.etOwnerType,
            etOwnerId: msg.data.etOwnerId,
            inviteeName: msg.data.inviteeName,
            inviteeEmail: msg.data.inviteeEmail,
            inviteeTimezone: msg.data.inviteeTimezone,
            guests: msg.data.guests,
            meetingUuid: msg.data.meetingUuid,
            source: msg.source
          });
          break;
        case 'webNewEventType':
          wait = this.webNewEventType({
            source: msg.source || 'sidebar'
          });
          break;
        case 'webPopup':
          wait = this.webPopup(msg.data);
          break;
        case 'addTimes':
          wait = Promise.reject('addTimes proxy flow is not supported - use window.postMessage & iframeManager');
          break;
        case 'sidebar':
          wait = Promise.reject('sidebar proxy flow is not yet supported - use window.postMessage & iframeManager');
          break;
        case 'login':
          wait = Promise.reject('Please use the store login method instead.');
          break;
        case 'logout':
          wait = this.logout();
          break;
        case 'options':
          wait = this.options();
          break;
        case 'openUrl':
          wait = this.openCalendlyUrl(msg.data, sender == null || (_sender$tab = sender.tab) == null ? void 0 : _sender$tab.id);
          break;
        case 'reload':
          wait = this.reload();
          break;
        case 'viewScheduledEvents':
          wait = this.viewScheduledEvents({
            inviteeEmails: msg.data.inviteeEmails,
            period: msg.data.period,
            status_ids: msg.data.status_ids,
            host_ids: msg.data.host_ids
          });
          break;
        case 'copyToEmail':
          wait = this.copyToEmail(msg.data);
          break;
      }
      wait.then(data => {
        sendResponse({
          error: false,
          data
        });
      }).catch(async function (err) {
        console.warn('Flow Error!', err, JSON.stringify(err));
        if (err instanceof Error) {
          sendResponse({
            error: err.stack || err.message
          });
        } else {
          sendResponse({
            error: true
          });
        }
      });
      return true;
    }
    return false;
  }
  setTokenHandler(handler) {
    this.onTokenChange = handler;
  }
  async webOneOff(args) {
    await this.api.ensureCookieSession();
    const host = (await this.settings.get()).apiHost;
    const platform = this.platformInfo.name;
    const version = this.platformInfo.version;
    const oneOffUrl = `${host}/extensions/one_offs?platform=${platform}&version=${version}&source=${args.source}&client=true`;
    await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
      url: oneOffUrl,
      type: 'popup'
    });
  }
  async webPolls(args) {
    await this.api.ensureCookieSession();
    const host = (await this.settings.get()).apiHost;
    const platform = this.platformInfo.name;
    const version = this.platformInfo.version;
    const oneOffPollUrl = `${host}/extensions/one_offs?platform=${platform}&version=${version}&source=${args.source}&poll=true&client=true`;
    await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
      url: oneOffPollUrl,
      type: 'popup'
    });
  }
  async webAddTimes(args) {
    console.warn('web add times is undergoing review and not currently supported');
    throw new Error('not implemented');
  }
  async webReschedulings(args) {
    await this.api.ensureCookieSession();
    const platform = this.platformInfo.name;
    const version = this.platformInfo.version;
    const url = new URL(args.rescheduleUrl);
    url.searchParams.set('source', args.source);
    url.searchParams.set('platform', platform);
    url.searchParams.set('version', version);
    url.searchParams.set('client', 'true');
    url.searchParams.set('return_to', `/extensions/client_invitee_rescheduled?uuid=${args.inviteeUuid}`);
    const newWindow = await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
      url: url.toString(),
      type: 'popup'
    });
    if (args.closeRescheduleModal && args.tabId) {
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.sendMessage(args.tabId, {
        action: 'close',
        component: 'reschedule_modal',
        barId: args.barId
      });
    }
    return new Promise(function (resolve) {
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(function onMessage(request) {
        if (request.message === 'invitee_rescheduled' && request.uuid === args.inviteeUuid && newWindow.id) {
          resolve({
            success: true,
            newEventUuid: request.newEventUuid,
            rescheduled: request.rescheduled
          });
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.remove(newWindow.id);
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(onMessage);
        }
      });
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.onRemoved.addListener(function onRemoved(removedId) {
        if (newWindow.id === removedId) {
          resolve({
            success: false
          });
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(onRemoved);
        }
      });
    });
  }
  async webCancel(args) {
    await this.api.ensureCookieSession();
    const platform = this.platformInfo.name;
    const version = this.platformInfo.version;
    const url = new URL(args.cancelUrl);
    url.searchParams.set('source', args.source);
    url.searchParams.set('platform', platform);
    url.searchParams.set('version', version);
    url.searchParams.set('client', 'true');
    url.searchParams.set('return_to', `extension_invitee_canceled`);
    const newWindow = await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
      url: url.toString(),
      type: 'popup'
    });
    return new Promise(function (resolve) {
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(async function onMessage(request) {
        if (request.message === 'invitee_canceled' && newWindow.id) {
          resolve({
            success: request.success,
            resource: request.resource
          });
          await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.remove(newWindow.id);
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(onMessage);
        }
      });
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.onRemoved.addListener(function onRemoved(removedId) {
        if (newWindow.id === removedId) {
          resolve({
            success: false
          });
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(onRemoved);
        }
      });
    });
  }
  async webCustomizeAndShare(args) {
    await this.api.ensureCookieSession();
    const host = (await this.settings.get()).apiHost;
    const platform = this.platformInfo.name;
    const version = this.platformInfo.version;
    const url = new URL(`${host}/extensions/modify_and_share`);
    url.searchParams.set('id', args.etId);
    url.searchParams.set('source', args.source);
    url.searchParams.set('platform', platform);
    url.searchParams.set('version', version);
    url.searchParams.set('client', 'true');
    if (args.searchView) {
      url.searchParams.set('sidebar_view', 'search');
    }
    await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
      url: url.toString(),
      type: 'popup'
    });
  }
  async webBook(args) {
    await this.api.ensureCookieSession();
    const host = (await this.settings.get()).apiHost;
    const platform = this.platformInfo.name;
    const version = this.platformInfo.version;
    const url = new URL(`${host}/extensions/book`);
    url.searchParams.set('eventTypeId', args.etId || '');
    url.searchParams.set('eventTypeType', args.etType || '');
    url.searchParams.set('eventTypeOwnerType', args.etOwnerType || '');
    if (args.etOwnerId) {
      url.searchParams.set('eventTypeOwnerId', args.etOwnerId.toString());
    }
    url.searchParams.set('inviteeName', args.inviteeName || '');
    url.searchParams.set('inviteeEmail', args.inviteeEmail || '');
    url.searchParams.set('inviteeTimezone', args.inviteeTimezone || '');
    url.searchParams.set('guests', args.guests || '');
    url.searchParams.set('source', args.source);
    url.searchParams.set('platform', platform);
    url.searchParams.set('version', version);
    url.searchParams.set('client', 'true');
    url.searchParams.set('return_to', 'extension_event_booked');
    url.searchParams.set('meetingUuid', args.meetingUuid || '');
    const newWindow = await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
      url: url.toString(),
      type: 'popup'
    });
    return new Promise(function (resolve) {
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(function onMessage(request) {
        if (request.message === 'event_booked' && newWindow.id) {
          resolve({
            success: request.success && request.uuid,
            uuid: request.uuid
          });
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.remove(newWindow.id);
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(onMessage);
        }
      });
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.onRemoved.addListener(function onRemoved(removedId) {
        if (newWindow.id === removedId) {
          resolve({
            success: false
          });
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(onRemoved);
        }
      });
    });
  }
  async webNewEventType(args) {
    await this.api.ensureCookieSession();
    const host = (await this.settings.get()).apiHost;
    const platform = this.platformInfo.name;
    const version = this.platformInfo.version;
    const url = new URL(`${host}/extensions/new_event_type`);
    url.searchParams.set('source', args.source);
    url.searchParams.set('platform', platform);
    url.searchParams.set('version', version);
    url.searchParams.set('client', 'true');
    url.searchParams.set('return_to', '/extensions/client_event_type_creation');
    const newWindow = await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
      url: url.toString(),
      type: 'popup'
    });
    const res = await new Promise(function (resolve) {
      const onMessage = async function onMessage(request) {
        if (request.message === 'event_type_creation_response' && newWindow.id) {
          resolve({
            openEditEventType: request.openEditEventType
          });
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.remove(newWindow.id);
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(onMessage);
        }
      };
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(onMessage);
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.onRemoved.addListener(function onRemoved(removedId) {
        if (newWindow.id === removedId) {
          resolve({});
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(onRemoved);
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.removeListener(onMessage);
        }
      });
    });
    if (res != null && res.openEditEventType) {
      this.openCalendlyUrl(`${host}${res.openEditEventType}`);
    }
    return res;
  }
  async webPopup(args) {
    await this.api.ensureCookieSession();
    const platform = this.platformInfo.name;
    const version = this.platformInfo.version;
    const popupUrl = `${args.url}?platform=${platform}&version=${version}&source=sidebar&client=true`;
    await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
      url: popupUrl,
      type: 'popup'
    });
  }
  async sidebar(args) {
    var _window$top;
    (_window$top = window.top) == null || _window$top.postMessage({
      action: 'open',
      component: 'sidebar'
    }, '*');
  }
  async sidebarAddTimes(args) {
    var _window$top2;
    (_window$top2 = window.top) == null || _window$top2.postMessage({
      action: 'open',
      component: 'add_times',
      etId: args.etId,
      source: args.source
    }, '*');
  }
  async openCalendlyUrl(url, tabId) {
    if (url) {
      await this.api.ensureCookieSession();
      await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.create({
        url,
        openerTabId: tabId
      });
    }
  }
  async login(existing, handler) {
    if (existing) {
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.remove(existing);
    }
    const settings = await this.settings.get();
    const result = await this.OAuthPKCE.createAuthorizeUri({
      host: settings.apiHost,
      clientId: settings.oauthClientId,
      redirectUri: settings.oauthRedirectUri
    });
    const window = await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
      url: result.uri,
      type: 'popup'
    });
    handler(window.id);
    const redirectDetails = await new Promise((resolve, reject) => {
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onConnect.addListener(port => {
        if (port.name === 'oauth_port') {
          port.onMessage.addListener(msg => {
            if (msg.action && msg.action === 'OAuth_Redirect') {
              port.disconnect();
              if (window.id) {
                webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.remove(window.id).then(() => {
                  resolve(msg.details);
                });
              } else {
                resolve(msg.details);
              }
            }
          });
        }
      });
    });
    const token = await this.OAuthPKCE.upgradeAuthorizationCode(this.platformInfo, {
      host: settings.apiHost,
      clientId: settings.oauthClientId,
      redirectUri: settings.oauthRedirectUri,
      state: result.state,
      codeVerifier: result.codeVerifier,
      codeParam: redirectDetails.code,
      stateParam: redirectDetails.state
    });
    if (this.onTokenChange) {
      this.onTokenChange(token);
    } else {
      console.warn('Missing token handler!', this);
    }
    handler(undefined);
    return true;
  }
  async logout() {
    var _this = this;
    return new Promise((resolve, reject) => {
      const run = async function run() {
        const settings = await _this.settings.get();
        const newWindow = await (0,_util_openWindow__WEBPACK_IMPORTED_MODULE_2__.openWindow)({
          url: `${settings.apiHost}/extensions/client_logout`,
          type: 'popup'
        });
        const logoutVerified = await new Promise((resolve, reject) => {
          function onConnectHandler(port) {
            if (port.name === 'auth-port') {
              port.onMessage.addListener(msg => {
                const cleanup = () => {
                  webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onConnect.removeListener(onConnectHandler);
                  newWindow.id && webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.remove(newWindow.id);
                  port.disconnect();
                };
                if (msg.message === 'loggedout') {
                  resolve(true);
                  cleanup();
                }
                if (msg.message === 'logoutcanceled') {
                  resolve(false);
                  cleanup();
                }
              });
            }
          }
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onConnect.addListener(onConnectHandler);
          webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.onRemoved.addListener(function onRemoved(removedId) {
            if (newWindow.id === removedId) {
              resolve(false);
              webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onConnect.removeListener(onConnectHandler);
            }
          });
        });
        if (logoutVerified) {
          return resolve();
        } else {
          return reject('user exited process');
        }
      };
      run();
    });
  }
  async options() {
    throw new Error('flow.options is not yet implemented');
  }
  async reload() {
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.reload();
  }
  flashMessage(message, type) {
    var _window$top3;
    (_window$top3 = window.top) == null || _window$top3.postMessage({
      action: 'open',
      component: 'alert',
      data: {
        type: type || 'success',
        text: message
      }
    }, '*');
  }
  async viewScheduledEvents(args) {
    const host = (await this.settings.get()).apiHost;
    const url = new URL(`${host}/app/scheduled_events`);
    if (args.inviteeEmails) {
      args.inviteeEmails.forEach(email => {
        url.searchParams.append('invitee_emails[]', email);
      });
    }
    url.searchParams.set('period', args.period || '');
    if (args.status_ids) {
      args.status_ids.forEach(status => {
        url.searchParams.append('status_ids[]', status);
      });
    }
    if (args.host_ids) {
      args.host_ids.forEach(host_id => {
        url.searchParams.append('host_ids[]', host_id);
      });
    }
    await this.openCalendlyUrl(`${url.toString()}`);
  }
}

/***/ }),

/***/ "../../libs/platform-firefox/src/lib/flowProxy.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirefoxFlowProxy: () => (/* binding */ FirefoxFlowProxy)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-restricted-globals */

class FirefoxFlowProxy {
  constructor(platformInfo) {
    this.platformInfo = platformInfo;
  }
  async copyToEmail(target) {
    const selection = window.getSelection();
    selection == null || selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(target);
    selection == null || selection.addRange(range);
    document.execCommand('copy');
  }
  async webOneOff(args) {
    return this.send({
      action: 'proxy_flow',
      source: args.source,
      flow: 'oneOff'
    });
  }
  async webPolls(args) {
    return this.send({
      action: 'proxy_flow',
      source: args.source,
      flow: 'poll'
    });
  }
  async webAddTimes(args) {
    console.warn('web add times is undergoing review and not currently supported');
    throw new Error('not implemented');
  }
  async webReschedulings(args) {
    var _res$data, _res$data2;
    const res = await this.send({
      action: 'proxy_flow',
      source: args.source,
      flow: 'webReschedulings',
      data: {
        inviteeUuid: args.inviteeUuid,
        rescheduleUrl: args.rescheduleUrl,
        barId: args.barId,
        tabId: args.tabId,
        closeRescheduleModal: args.closeRescheduleModal
      }
    });
    if (res != null && (_res$data = res.data) != null && _res$data.success) {
      var _window$top;
      (_window$top = window.top) == null || _window$top.postMessage({
        action: 'invitee_rescheduled',
        source: args.source
      }, '*');
    }
    if (res != null && (_res$data2 = res.data) != null && _res$data2.success) {
      var _window$top2, _res$data3;
      (_window$top2 = window.top) == null || _window$top2.postMessage({
        action: 'open',
        component: 'alert',
        data: {
          type: 'success',
          text: (res == null || (_res$data3 = res.data) == null ? void 0 : _res$data3.rescheduled) === 'event' ? 'Event rescheduled.' : 'Invitee rescheduled.'
        }
      }, '*');
    }
    return res == null ? void 0 : res.data;
  }
  async webCancel(args) {
    var _res$data4, _res$data5;
    const res = await this.send({
      action: 'proxy_flow',
      source: args.source,
      flow: 'webCancel',
      data: {
        inviteeUuid: args.inviteeUuid,
        cancelUrl: args.cancelUrl
      }
    });
    if (res != null && (_res$data4 = res.data) != null && _res$data4.success) {
      this.flashMessage('Event canceled.');
    }
    return {
      success: res == null || (_res$data5 = res.data) == null ? void 0 : _res$data5.success
    };
  }
  async webCustomizeAndShare(args) {
    return this.send({
      action: 'proxy_flow',
      flow: 'webCustomizeAndShare',
      source: args.source,
      data: {
        etId: args.etId,
        searchView: args.searchView
      }
    });
  }
  async webBook(args) {
    var _res$data6;
    const res = await this.send({
      action: 'proxy_flow',
      flow: 'webBook',
      source: args.source,
      data: {
        etId: args.etId,
        etType: args.etType,
        etOwnerType: args.etOwnerType,
        etOwnerId: args.etOwnerId,
        inviteeName: args.inviteeName,
        inviteeEmail: args.inviteeEmail,
        inviteeTimezone: args.inviteeTimezone,
        guests: args.guests,
        meetingUuid: args.meetingUuid
      }
    });
    if (res != null && (_res$data6 = res.data) != null && _res$data6.success) {
      this.flashMessage('Event booked. A notification has been sent.');
    }
    return res == null ? void 0 : res.data;
  }
  async webNewEventType(args) {
    const res = await this.send({
      action: 'proxy_flow',
      source: args.source,
      flow: 'webNewEventType'
    });
    window.postMessage({
      action: 'getAllEventTypes'
    }, '*');
    return res == null ? void 0 : res.data;
  }
  async webPopup(args) {
    return this.send({
      action: 'proxy_flow',
      data: args,
      flow: 'webPopup'
    });
  }
  async sidebar(args) {
    var _window$top3;
    (_window$top3 = window.top) == null || _window$top3.postMessage({
      action: 'open',
      component: 'sidebar',
      tabName: args == null ? void 0 : args.tabName
    }, '*');
  }
  async sidebarAddTimes(args) {
    var _window$top4;
    (_window$top4 = window.top) == null || _window$top4.postMessage({
      action: 'open',
      component: 'add_times',
      etId: args.etId,
      source: args.source
    }, '*');
  }
  async openCalendlyUrl(url) {
    if (url) {
      return this.send({
        action: 'proxy_flow',
        flow: 'openUrl',
        data: url
      });
    }
  }
  async login() {
    return this.send({
      action: 'proxy_flow',
      flow: 'login'
    });
  }
  async logout() {
    const res = await this.send({
      action: 'proxy_flow',
      flow: 'logout'
    });
    return res;
  }
  async options() {
    return this.send({
      action: 'proxy_flow',
      flow: 'options'
    });
  }
  async reload() {
    return this.send({
      action: 'proxy_flow',
      flow: 'reload'
    });
  }
  flashMessage(message, type) {
    var _window$top5;
    (_window$top5 = window.top) == null || _window$top5.postMessage({
      action: 'open',
      component: 'alert',
      data: {
        type: type || 'success',
        text: message
      }
    }, '*');
  }
  async send(req) {
    return new Promise((resolve, reject) => {
      const port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.connect({
        name: 'flow-port'
      });
      port.onMessage.addListener(response => {
        if (typeof response === 'object' && response !== null) {
          if (response.error) {
            reject(response);
          }
          resolve(response);
        } else {
          console.log('unexpected response for', req);
          reject(`Unexpected response for ${req.action}`);
        }
      });
      port.onDisconnect.addListener(() => {
        reject('Port disconnected before sending a response.');
      });
      port.postMessage(req);
    });
  }
  async viewScheduledEvents(args) {
    const res = await this.send({
      action: 'proxy_flow',
      flow: 'viewScheduledEvents',
      data: {
        inviteeEmails: args.inviteeEmails,
        period: args.period,
        status_ids: args.status_ids,
        host_ids: args.host_ids
      }
    });
    return res;
  }
}

/***/ }),

/***/ "../../libs/platform-firefox/src/lib/info.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirefoxInfo: () => (/* binding */ FirefoxInfo)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

class FirefoxInfo {
  constructor() {
    this.version = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.getManifest().version;
    this.name = 'firefox';
  }
}

/***/ }),

/***/ "../../libs/platform-firefox/src/lib/network.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirefoxNetwork: () => (/* binding */ FirefoxNetwork)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/platform/src/index.ts");


class FirefoxNetwork {
  constructor(settings, info) {
    this.oauth = void 0;
    this.token = null;
    this.onTokenChange = null;
    this.abortControllers = new Map();
    this.settings = settings;
    this.info = info;
    this.oauth = new _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.OAuthGenericPKCE();
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onConnect.addListener(port => {
      if (port.name === 'network-port') {
        port.onMessage.addListener(msg => {
          const sendResponse = resp => {
            port.postMessage(resp);
            port.disconnect();
          };
          this.handleMessage(msg, {}, sendResponse);
        });
      }
    });
  }
  setTokenHandler(handler) {
    this.onTokenChange = handler;
  }
  setToken(t) {
    this.token = t;
  }
  async getSafeJson(response) {
    if (response.status === 204) {
      // We have no content to read - 204
      return Promise.resolve({
        error: false,
        body: {},
        status: 204
      });
    } else {
      return await response.json();
    }
  }
  handleMessage(msg, sender, sendResponse) {
    if ((0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.isProxiedRequest)(msg)) {
      var _msg$options;
      const cancellationId = (_msg$options = msg.options) == null ? void 0 : _msg$options.cancellationId;
      let wait;
      switch (msg.method) {
        case 'GET':
          if (cancellationId) {
            const controller = new AbortController();
            this.abortControllers.set(cancellationId, controller);
          }
          wait = this.get(msg.url, msg.options);
          break;
        case 'PUT':
          wait = this.put(msg.url, msg.data || {}, msg.options);
          break;
        case 'POST':
          wait = this.post(msg.url, msg.data || {}, msg.options);
          break;
        case 'PATCH':
          wait = this.patch(msg.url, msg.data || {}, msg.options);
          break;
        case 'DELETE':
          wait = this.delete(msg.url, msg.options);
          break;
        case 'CANCEL':
          wait = this.cancelPendingRequest(msg.options || {});
          break;
      }
      wait.then(val => {
        sendResponse(val);
      }).catch(async function (err) {
        console.warn('Network Error!', msg.url, err);
        let status = 0;
        let body = {};
        if (err.name === 'AbortError') {
          status = err.status;
          body = err.body;
        } else {
          try {
            const errorResponse = err;
            status = errorResponse.status;
            body = errorResponse.json ? await errorResponse.json() : {};
          } catch (e) {
            console.warn('unable to parse error body from message.', e);
          }
        }
        sendResponse({
          error: true,
          body,
          status
        });
      }).finally(() => cancellationId && this.abortControllers.delete(cancellationId));
      return true;
    }
    return false;
  }
  async get(url, options) {
    if (!this.onTokenChange) throw new Error('Missing token handler in GET');
    const controller = options != null && options.cancellationId ? this.abortControllers.get(options == null ? void 0 : options.cancellationId) : undefined;
    let request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.VersionedRequest)(this.info, url, {
      credentials: (options == null ? void 0 : options.credentials) || 'omit',
      signal: controller == null ? void 0 : controller.signal
    });
    if (typeof (options == null ? void 0 : options.noAuth) === 'undefined' || options.noAuth === false) {
      request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.BearerAuthedRequest)(this.info, this.token, this.onTokenChange, await this.settings.get(), this.oauth, request, undefined, controller == null ? void 0 : controller.signal);
    }
    const response = await fetch(request);
    if (!response.ok) {
      return Promise.reject(response);
    }
    return await this.getSafeJson(response);
  }
  async post(url, data, options) {
    if (!this.onTokenChange) throw new Error('Missing token handler in POST');
    let request = options != null && options.asFormData ? (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.MakeFormDataRequest)(url, data, 'POST', options.credentials) : (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.MakeJsonRequest)(url, data, 'POST', options == null ? void 0 : options.credentials);
    request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.VersionedRequest)(this.info, request);
    if (typeof (options == null ? void 0 : options.noAuth) === 'undefined' || options.noAuth === false) {
      request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.BearerAuthedRequest)(this.info, this.token, this.onTokenChange, await this.settings.get(), this.oauth, request);
    }
    const response = await fetch(request);
    if (!response.ok) {
      return Promise.reject(response);
    }
    return await this.getSafeJson(response);
  }
  async put(url, data, options) {
    if (!this.onTokenChange) throw new Error('Missing token handler in PUT');
    let request = options != null && options.asFormData ? (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.MakeFormDataRequest)(url, data, 'PUT', options.credentials) : (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.MakeJsonRequest)(url, data, 'PUT', options == null ? void 0 : options.credentials);
    request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.VersionedRequest)(this.info, request);
    if (typeof (options == null ? void 0 : options.noAuth) === 'undefined' || options.noAuth === false) {
      request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.BearerAuthedRequest)(this.info, this.token, this.onTokenChange, await this.settings.get(), this.oauth, request);
    }
    const response = await fetch(request);
    if (!response.ok) {
      return Promise.reject(response);
    }
    return await this.getSafeJson(response);
  }
  async patch(url, data, options) {
    if (!this.onTokenChange) throw new Error('Missing token handler in PATCH');
    let request = options != null && options.asFormData ? (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.MakeFormDataRequest)(url, data, 'PATCH', options.credentials) : (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.MakeJsonRequest)(url, data, 'PATCH', options == null ? void 0 : options.credentials);
    request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.VersionedRequest)(this.info, request);
    if (typeof (options == null ? void 0 : options.noAuth) === 'undefined' || options.noAuth === false) {
      request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.BearerAuthedRequest)(this.info, this.token, this.onTokenChange, await this.settings.get(), this.oauth, request);
    }
    const response = await fetch(request);
    if (!response.ok) {
      return Promise.reject(response);
    }
    return await this.getSafeJson(response);
  }
  async delete(url, options) {
    if (!this.onTokenChange) throw new Error('Missing token handler in DELETE');
    let request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.VersionedRequest)(this.info, url, {
      method: 'DELETE',
      credentials: (options == null ? void 0 : options.credentials) || 'omit'
    });
    if (typeof (options == null ? void 0 : options.noAuth) === 'undefined' || options.noAuth === false) {
      request = await (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_1__.BearerAuthedRequest)(this.info, this.token, this.onTokenChange, await this.settings.get(), this.oauth, request);
    }
    const response = await fetch(request);
    if (!response.ok) {
      return Promise.reject(response);
    }
    let responseBody = {};
    try {
      const text = await response.text();
      if (text) {
        responseBody = JSON.parse(text);
      }
    } catch (error) {
      console.error('Failed to parse the response body:', error);
    }
    return {
      error: false,
      body: responseBody,
      status: response.status
    };
  }
  async cancelPendingRequest(options) {
    return new Promise((resolve, reject) => {
      if (!options || !options.cancellationId) {
        reject({
          error: true,
          body: {
            message: 'Invalid options.'
          },
          status: 400
        });
        return;
      }
      const controller = this.abortControllers.get(options.cancellationId);
      if (controller) {
        controller.abort({
          name: 'AbortError',
          body: {
            message: `Request cancelled with reason: ${options.reason || 'No reason provided'}`
          },
          status: 499
        });
        resolve({
          error: false,
          body: {
            message: `Request successfully cancelled with reason: ${options.reason || 'No reason provided'}`
          },
          status: 200
        });
      } else {
        reject({
          error: true,
          body: {
            message: 'No abort controller found for the request.'
          },
          status: 404
        });
      }
    });
  }
}

/***/ }),

/***/ "../../libs/platform-firefox/src/lib/networkProxy.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirefoxNetworkProxy: () => (/* binding */ FirefoxNetworkProxy)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

class FirefoxNetworkProxy {
  get(url, options) {
    const proxy = {
      action: 'proxy_request',
      method: 'GET',
      options,
      url
    };
    return this.send(proxy);
  }
  post(url, data, options) {
    const proxy = {
      action: 'proxy_request',
      method: 'POST',
      data,
      options,
      url
    };
    return this.send(proxy);
  }
  put(url, data, options) {
    const proxy = {
      action: 'proxy_request',
      method: 'PUT',
      data,
      options,
      url
    };
    return this.send(proxy);
  }
  patch(url, data, options) {
    const proxy = {
      action: 'proxy_request',
      method: 'PATCH',
      data,
      options,
      url
    };
    return this.send(proxy);
  }
  delete(url, options) {
    const proxy = {
      action: 'proxy_request',
      method: 'DELETE',
      options,
      url
    };
    return this.send(proxy);
  }
  cancelPendingRequest(options) {
    const proxy = {
      action: 'proxy_request',
      method: 'CANCEL',
      options,
      url: ''
    };
    return this.send(proxy);
  }
  async send(req) {
    return new Promise((resolve, reject) => {
      const port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.connect({
        name: 'network-port'
      });
      port.onMessage.addListener(resp => {
        if (resp.error) {
          reject(resp);
        }
        resolve(resp);
      });
      port.onDisconnect.addListener(() => {
        reject('port disconnected without sending a response');
      });
      port.postMessage(req);
    });
  }
}

/***/ }),

/***/ "../../libs/platform-firefox/src/lib/optional.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirefoxOptional: () => (/* binding */ FirefoxOptional),
/* harmony export */   FirefoxOptionalProxy: () => (/* binding */ FirefoxOptionalProxy)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

class FirefoxOptional {
  async setUninstallUrl(url) {
    return webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.setUninstallURL(url);
  }
}
class FirefoxOptionalProxy {
  async setUninstallUrl(url) {
    await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage({
      action: 'setUninstallUrl',
      url
    });
  }
}

/***/ }),

/***/ "../../libs/platform-firefox/src/lib/storage.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirefoxStorage: () => (/* binding */ FirefoxStorage)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

class FirefoxStorage {
  constructor() {
    this.listeners = {};
    this.incognito = void 0;
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage.onChanged.addListener((changes, areaName) => {
      Object.keys(this.listeners).forEach(key => {
        const keyListeners = this.listeners[key];
        if (keyListeners) {
          if (key === '*') {
            keyListeners.forEach(l => l(changes, {
              areaName
            }));
          } else if (changes[key]) {
            const {
              newValue,
              oldValue
            } = changes[key];
            keyListeners.forEach(l => l(changes, {
              areaName,
              newValue,
              oldValue
            }));
          }
        }
      });
    });
    this.incognito = this.isIncognito();
  }
  isIncognito() {
    return (webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().extension).inIncognitoContext || false;
  }
  addListener(listener, key = '*') {
    this.removeListener(listener, key);
    let keyListeners = this.listeners[key];
    if (!keyListeners) {
      keyListeners = [];
      this.listeners[key] = keyListeners;
    }
    keyListeners.push(listener);
  }
  removeListener(listener, key = '*') {
    let keyListeners = this.listeners[key];
    if (keyListeners) {
      keyListeners = keyListeners.filter(l => l !== listener);
      if (keyListeners.length) {
        this.listeners[key] = keyListeners;
      } else {
        delete this.listeners[key];
      }
    }
  }
  async get(key) {
    if (this.incognito) {
      key = `${key}_incognito`;
    }
    const record = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage.local.get(key);
    const value = record[key];
    return value;
  }
  async set(key, val) {
    if (this.incognito) {
      key = `${key}_incognito`;
    }
    await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage.local.set({
      [key]: val
    });
  }
  async remove(keys) {
    return webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage.local.remove(keys);
  }
}

/***/ }),

/***/ "../../libs/platform-firefox/src/lib/util/openWindow.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   openWindow: () => (/* binding */ openWindow)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

let openWindows = [];
async function openWindow(props) {
  openWindows.forEach(async win => {
    if (win.id) {
      try {
        await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.remove(win.id);
      } catch (e) {
        return;
      }
    }
  });
  openWindows = [];
  const newWindow = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().windows.create({
    url: props.url,
    width: props.width,
    height: props.height,
    top: props.top,
    left: props.left,
    type: 'popup'
  });
  openWindows.push(newWindow);
  return newWindow;
}

/***/ })

}]);