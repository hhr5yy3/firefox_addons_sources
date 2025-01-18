// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4CQwz":[function(require,module,exports) {
var _webextensionPolyfill = require('webextension-polyfill');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _webextensionPolyfillDefault = _parcelHelpers.interopDefault(_webextensionPolyfill);
var _delay = require('delay');
var _delayDefault = _parcelHelpers.interopDefault(_delay);
var _optionsStorageJs = require('./options-storage.js');
var _optionsStorageJsDefault = _parcelHelpers.interopDefault(_optionsStorageJs);
var _libLocalStoreJs = require('./lib/local-store.js');
var _libLocalStoreJsDefault = _parcelHelpers.interopDefault(_libLocalStoreJs);
var _libTabsServiceJs = require('./lib/tabs-service.js');
var _libPermissionsServiceJs = require('./lib/permissions-service.js');
var _libApiJs = require('./lib/api.js');
var _libBadgeJs = require('./lib/badge.js');
var _libNotificationsServiceJs = require('./lib/notifications-service.js');
var _utilJs = require('./util.js');
async function scheduleNextAlarm(interval) {
  const intervalSetting = await _libLocalStoreJsDefault.default.get('interval') || 60;
  const intervalValue = interval || 60;
  if (intervalSetting !== intervalValue) {
    _libLocalStoreJsDefault.default.set('interval', intervalValue);
  }
  // Delay less than 1 minute will cause a warning
  const delayInMinutes = Math.max(Math.ceil(intervalValue / 60), 1);
  _webextensionPolyfillDefault.default.alarms.clearAll();
  _webextensionPolyfillDefault.default.alarms.create('update', {
    delayInMinutes
  });
}
async function handleLastModified(newLastModified) {
  const lastModified = await _libLocalStoreJsDefault.default.get('lastModified') || new Date(0).toUTCString();
  // Something has changed since we last accessed, display any new notifications
  if (newLastModified !== lastModified) {
    const {showDesktopNotif, playNotifSound} = await _optionsStorageJsDefault.default.getAll();
    if (showDesktopNotif === true || playNotifSound === true) {
      await _libNotificationsServiceJs.checkNotifications(lastModified);
    }
    await _libLocalStoreJsDefault.default.set('lastModified', newLastModified);
  }
}
async function updateNotificationCount() {
  const response = await _libApiJs.getNotificationCount();
  const {count, interval, lastModified} = response;
  _libBadgeJs.renderCount(count);
  scheduleNextAlarm(interval);
  handleLastModified(lastModified);
}
function handleError(error) {
  scheduleNextAlarm();
  _libBadgeJs.renderError(error);
}
function handleOfflineStatus() {
  scheduleNextAlarm();
  _libBadgeJs.renderWarning('offline');
}
async function update() {
  if (navigator.onLine) {
    try {
      await updateNotificationCount();
    } catch (error) {
      handleError(error);
    }
  } else {
    handleOfflineStatus();
  }
}
async function handleBrowserActionClick() {
  await _libTabsServiceJs.openTab(await _libApiJs.getTabUrl());
}
function handleInstalled(details) {
  if (details.reason === 'install') {
    _webextensionPolyfillDefault.default.runtime.openOptionsPage();
  }
}
async function onMessage(message) {
  if (message === 'update') {
    await addHandlers();
    await update();
  }
}
async function onTabUpdated(tabId, changeInfo, tab) {
  if (changeInfo.status !== 'complete') {
    return;
  }
  if (await _utilJs.isNotificationTargetPage(tab.url)) {
    await _delayDefault.default(1000);
    await update();
  }
}
function onNotificationClick(id) {
  _libNotificationsServiceJs.openNotification(id);
}
async function addHandlers() {
  const {updateCountOnNavigation} = await _optionsStorageJsDefault.default.getAll();
  if (await _libPermissionsServiceJs.queryPermission('notifications')) {
    _webextensionPolyfillDefault.default.notifications.onClicked.addListener(onNotificationClick);
  }
  if (await _libPermissionsServiceJs.queryPermission('tabs')) {
    if (updateCountOnNavigation) {
      _webextensionPolyfillDefault.default.tabs.onUpdated.addListener(onTabUpdated);
    } else {
      _webextensionPolyfillDefault.default.tabs.onUpdated.removeListener(onTabUpdated);
    }
  }
}
function init() {
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  _webextensionPolyfillDefault.default.alarms.onAlarm.addListener(update);
  scheduleNextAlarm();
  _webextensionPolyfillDefault.default.runtime.onMessage.addListener(onMessage);
  _webextensionPolyfillDefault.default.runtime.onInstalled.addListener(handleInstalled);
  // Chrome specific API
  if (_utilJs.isChrome()) {
    _webextensionPolyfillDefault.default.permissions.onAdded.addListener(addHandlers);
  }
  _webextensionPolyfillDefault.default.browserAction.onClicked.addListener(handleBrowserActionClick);
  addHandlers();
  update();
}
init();

},{"webextension-polyfill":"6Pxrh","delay":"2sXVs","./options-storage.js":"5Cca6","./lib/local-store.js":"55Zbq","./lib/tabs-service.js":"Y1LAD","./lib/permissions-service.js":"4kKxW","./lib/api.js":"6v60q","./lib/badge.js":"1wveU","./lib/notifications-service.js":"72X5R","./util.js":"64wup","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"6Pxrh":[function(require,module,exports) {
var define;
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("webextension-polyfill", ["module"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.browser = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /*webextension-polyfill - v0.7.0 - Tue Nov 10 2020 20:24:04*/
  /*-*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*-*/
  /*vim: set sts=2 sw=2 et tw=80:*/
  /*This Source Code Form is subject to the terms of the Mozilla Public
  * License, v. 2.0. If a copy of the MPL was not distributed with this
  * file, You can obtain one at http://mozilla.org/MPL/2.0/.*/
  "use strict";
  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)";
    // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.
    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };
      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
      * A WeakMap subclass which creates and stores a value for any key which does
      * not exist when accessed, but behaves exactly as an ordinary WeakMap
      * otherwise.
      *
      * @param {function} createItem
      *        A function which will be called in order to create the value for any
      *        key which does not exist, the first time it is accessed. The
      *        function receives, as its only argument, the key being created.
      */
      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }
        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }
          return super.get(key);
        }
      }
      /**
      * Returns true if the given object is an object with a `then` method, and can
      * therefore be assumed to behave as a Promise.
      *
      * @param {*} value The value to test.
      * @returns {boolean} True if the value is thenable.
      */
      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
      * Creates and returns a function which, when called, will resolve or reject
      * the given promise based on how it is called:
      *
      * - If, when called, `chrome.runtime.lastError` contains a non-null object,
      *   the promise is rejected with that value.
      * - If the function is called with exactly one argument, the promise is
      *   resolved to that value.
      * - Otherwise, the promise is resolved to an array containing all of the
      *   function's arguments.
      *
      * @param {object} promise
      *        An object containing the resolution and rejection functions of a
      *        promise.
      * @param {function} promise.resolve
      *        The promise's resolution function.
      * @param {function} promise.rejection
      *        The promise's rejection function.
      * @param {object} metadata
      *        Metadata about the wrapped method which has created the callback.
      * @param {integer} metadata.maxResolvedArgs
      *        The maximum number of arguments which may be passed to the
      *        callback created by the wrapped async function.
      *
      * @returns {function}
      *        The generated callback function.
      */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(extensionAPIs.runtime.lastError);
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };
      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
      * Creates a wrapper function for a method with the given name and metadata.
      *
      * @param {string} name
      *        The name of the method which is being wrapped.
      * @param {object} metadata
      *        Metadata about the method being wrapped.
      * @param {integer} metadata.minArgs
      *        The minimum number of arguments which must be passed to the
      *        function. If called with fewer than this number of arguments, the
      *        wrapper will raise an exception.
      * @param {integer} metadata.maxArgs
      *        The maximum number of arguments which may be passed to the
      *        function. If called with more than this number of arguments, the
      *        wrapper will raise an exception.
      * @param {integer} metadata.maxResolvedArgs
      *        The maximum number of arguments which may be passed to the
      *        callback created by the wrapped async function.
      *
      * @returns {function(object, ...*)}
      *       The generated wrapper function.
      */
      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }
          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }
          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args);
                // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.
                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
      * Wraps an existing method of the target object, so that calls to it are
      * intercepted by the given wrapper function. The wrapper function receives,
      * as its first argument, the original `target` object, followed by each of
      * the arguments passed to the original method.
      *
      * @param {object} target
      *        The original target object that the wrapped method belongs to.
      * @param {function} method
      *        The method being wrapped. This is used as the target of the Proxy
      *        object which is created to wrap the method.
      * @param {function} wrapper
      *        The wrapper function which is called in place of a direct invocation
      *        of the wrapped method.
      *
      * @returns {Proxy<function>}
      *        A Proxy object for the given method, which invokes the given wrapper
      *        method in its place.
      */
      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }
        });
      };
      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
      * Wraps an object in a Proxy which intercepts and wraps certain methods
      * based on the given `wrappers` and `metadata` objects.
      *
      * @param {object} target
      *        The target object to wrap.
      *
      * @param {object} [wrappers = {}]
      *        An object tree containing wrapper functions for special cases. Any
      *        function present in this object tree is called in place of the
      *        method in the same location in the `target` object tree. These
      *        wrapper methods are invoked as described in {@see wrapMethod}.
      *
      * @param {object} [metadata = {}]
      *        An object tree containing metadata used to automatically generate
      *        Promise-based wrapper functions for asynchronous. Any function in
      *        the `target` object tree which has a corresponding metadata object
      *        in the same location in the `metadata` tree is replaced with an
      *        automatically-generated wrapper function, as described in
      *        {@see wrapAsyncFunction}
      *
      * @returns {Proxy<object>}
      */
      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return (prop in target) || (prop in cache);
          },
          get(proxyTarget, prop, receiver) {
            if ((prop in cache)) {
              return cache[prop];
            }
            if (!((prop in target))) {
              return undefined;
            }
            let value = target[prop];
            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,
                get() {
                  return target[prop];
                },
                set(value) {
                  target[prop] = value;
                }
              });
              return value;
            }
            cache[prop] = value;
            return value;
          },
          set(proxyTarget, prop, value, receiver) {
            if ((prop in cache)) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }
            return true;
          },
          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },
          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }
        };
        // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        // 
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.
        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
      * Creates a set of wrapper functions for an event object, which handles
      * wrapping of listener functions that those messages are passed.
      *
      * A single wrapper is created for each listener function, and stored in a
      * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
      * retrieve the original wrapper, so that  attempts to remove a
      * previously-added listener work as expected.
      *
      * @param {DefaultWeakMap<function, function>} wrapperMap
      *        A DefaultWeakMap object which will create the appropriate wrapper
      *        for a given listener function when one does not exist, and retrieve
      *        an existing one when it does.
      *
      * @returns {object}
      */
      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },
        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },
        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }
      });
      // Keep track if the deprecation warning has been logged at least once.
      let loggedSendResponseDeprecationWarning = false;
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
        * Wraps a message listener function so that it may send responses based on
        * its return value, rather than by returning a sentinel value and calling a
        * callback. If the listener function returns a Promise, the response is
        * sent when the promise either resolves or rejects.
        *
        * @param {*} message
        *        The message sent by the other end of the channel.
        * @param {object} sender
        *        Details about the sender of the message.
        * @param {function(*)} sendResponse
        *        A callback which, when called with an arbitrary argument, sends
        *        that value as a response.
        * @returns {boolean}
        *        True if the wrapped listener returned a Promise, which will later
        *        yield a response. False otherwise.
        */
        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }
              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;
          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }
          const isResultThenable = result !== true && isThenable(result);
          // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.
          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          }
          // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).
          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;
              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }
              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          };
          // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.
          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          }
          // Let Chrome know that the listener is replying.
          return true;
        };
      });
      const wrappedSendMessageCallback = ({reject, resolve}, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(extensionAPIs.runtime.lastError);
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };
      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }
        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }
        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };
      const staticWrappers = {
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };
    if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
      throw new Error("This script should only be loaded in a browser extension.");
    }
    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = browser;
  }
});

},{}],"2sXVs":[function(require,module,exports) {
'use strict';

// From https://github.com/sindresorhus/random-int/blob/c37741b56f76b9160b0b63dae4e9c64875128146/index.js#L13-L15
const randomInteger = (minimum, maximum) => Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);

const createAbortError = () => {
	const error = new Error('Delay aborted');
	error.name = 'AbortError';
	return error;
};

const createDelay = ({clearTimeout: defaultClear, setTimeout: set, willResolve}) => (ms, {value, signal} = {}) => {
	if (signal && signal.aborted) {
		return Promise.reject(createAbortError());
	}

	let timeoutId;
	let settle;
	let rejectFn;
	const clear = defaultClear || clearTimeout;

	const signalListener = () => {
		clear(timeoutId);
		rejectFn(createAbortError());
	};

	const cleanup = () => {
		if (signal) {
			signal.removeEventListener('abort', signalListener);
		}
	};

	const delayPromise = new Promise((resolve, reject) => {
		settle = () => {
			cleanup();
			if (willResolve) {
				resolve(value);
			} else {
				reject(value);
			}
		};

		rejectFn = reject;
		timeoutId = (set || setTimeout)(settle, ms);
	});

	if (signal) {
		signal.addEventListener('abort', signalListener, {once: true});
	}

	delayPromise.clear = () => {
		clear(timeoutId);
		timeoutId = null;
		settle();
	};

	return delayPromise;
};

const createWithTimers = clearAndSet => {
	const delay = createDelay({...clearAndSet, willResolve: true});
	delay.reject = createDelay({...clearAndSet, willResolve: false});
	delay.range = (minimum, maximum, options) => delay(randomInteger(minimum, maximum), options);
	return delay;
};

const delay = createWithTimers();
delay.createWithTimers = createWithTimers;

module.exports = delay;
// TODO: Remove this for the next major release
module.exports.default = delay;

},{}],"5Cca6":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _webextOptionsSync = require('webext-options-sync');
var _webextOptionsSyncDefault = _parcelHelpers.interopDefault(_webextOptionsSync);
const optionsStorage = new _webextOptionsSyncDefault.default({
  defaults: {
    token: '',
    rootUrl: 'https://api.github.com/',
    playNotifSound: false,
    showDesktopNotif: false,
    onlyParticipating: false,
    reuseTabs: false,
    updateCountOnNavigation: false,
    filterNotifications: false
  },
  migrations: [_webextOptionsSyncDefault.default.migrations.removeUnused]
});
exports.default = optionsStorage;

},{"webext-options-sync":"22Sdi","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"22Sdi":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _webextDetectPage = require("webext-detect-page");
function throttle(delay, noTrailing, callback, debounceMode) {
  var timeoutID;
  var cancelled = false;
  var lastExec = 0;
  function clearExistingTimeout() {
    timeoutID && clearTimeout(timeoutID);
  }
  if ("boolean" != typeof noTrailing) {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = void 0;
  }
  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) arguments_[_key] = arguments[_key];
    var self = this;
    var elapsed = Date.now() - lastExec;
    if (!cancelled) {
      debounceMode && !timeoutID && exec();
      clearExistingTimeout();
      void 0 === debounceMode && elapsed > delay ? exec() : true !== noTrailing && (timeoutID = setTimeout(debounceMode ? clear : exec, void 0 === debounceMode ? delay - elapsed : delay));
    }
    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    function clear() {
      timeoutID = void 0;
    }
  }
  wrapper.cancel = function () {
    clearExistingTimeout();
    cancelled = true;
  };
  return wrapper;
}
class TypeRegistry {
  constructor(initial = {}) {
    this.registeredTypes = initial;
  }
  get(type) {
    return void 0 !== this.registeredTypes[type] ? this.registeredTypes[type] : this.registeredTypes.default;
  }
  register(type, item) {
    void 0 === this.registeredTypes[type] && (this.registeredTypes[type] = item);
  }
  registerDefault(item) {
    this.register("default", item);
  }
}
class KeyExtractors extends TypeRegistry {
  constructor(options) {
    super(options);
    this.registerDefault(el => el.getAttribute("name") || "");
  }
}
class InputReaders extends TypeRegistry {
  constructor(options) {
    super(options);
    this.registerDefault(el => el.value);
    this.register("checkbox", el => null !== el.getAttribute("value") ? el.checked ? el.getAttribute("value") : null : el.checked);
    this.register("select", el => (function (elem) {
      var value, option, i;
      var options = elem.options;
      var index = elem.selectedIndex;
      var one = "select-one" === elem.type;
      var values = one ? null : [];
      var max = one ? index + 1 : options.length;
      i = index < 0 ? max : one ? index : 0;
      for (; i < max; i++) if (((option = options[i]).selected || i === index) && !option.disabled && !(option.parentNode.disabled && "optgroup" === option.parentNode.tagName.toLowerCase())) {
        value = option.value;
        if (one) return value;
        values.push(value);
      }
      return values;
    })(el));
  }
}
class KeyAssignmentValidators extends TypeRegistry {
  constructor(options) {
    super(options);
    this.registerDefault(() => true);
    this.register("radio", el => el.checked);
  }
}
function keySplitter(key) {
  let matches = key.match(/[^[\]]+/g);
  let lastKey;
  if (key.length > 1 && key.indexOf("[]") === key.length - 2) {
    lastKey = matches.pop();
    matches.push([lastKey]);
  }
  return matches;
}
var proto = "undefined" != typeof Element ? Element.prototype : {};
var vendor = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
var matchesSelector = function (el, selector) {
  if (!el || 1 !== el.nodeType) return false;
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) if (nodes[i] == el) return true;
  return false;
};
function getElementType(el) {
  let typeAttr;
  let tagName = el.tagName;
  let type = tagName;
  if ("input" === tagName.toLowerCase()) {
    typeAttr = el.getAttribute("type");
    type = typeAttr || "text";
  }
  return type.toLowerCase();
}
function getInputElements(element, options) {
  return Array.prototype.filter.call(element.querySelectorAll("input,select,textarea"), el => {
    if ("input" === el.tagName.toLowerCase() && ("submit" === el.type || "reset" === el.type)) return false;
    let myType = getElementType(el);
    let identifier = options.keyExtractors.get(myType)(el);
    let foundInInclude = -1 !== (options.include || []).indexOf(identifier);
    let foundInExclude = -1 !== (options.exclude || []).indexOf(identifier);
    let foundInIgnored = false;
    let reject = false;
    if (options.ignoredTypes) for (let selector of options.ignoredTypes) matchesSelector(el, selector) && (foundInIgnored = true);
    reject = !foundInInclude && (!!options.include || (foundInExclude || foundInIgnored));
    return !reject;
  });
}
function assignKeyValue(obj, keychain, value) {
  if (!keychain) return obj;
  var key = keychain.shift();
  obj[key] || (obj[key] = Array.isArray(key) ? [] : {});
  0 === keychain.length && (Array.isArray(obj[key]) ? null !== value && obj[key].push(value) : obj[key] = value);
  keychain.length > 0 && assignKeyValue(obj[key], keychain, value);
  return obj;
}
function serialize(element, options = {}) {
  let data = {};
  options.keySplitter = options.keySplitter || keySplitter;
  options.keyExtractors = new KeyExtractors(options.keyExtractors || ({}));
  options.inputReaders = new InputReaders(options.inputReaders || ({}));
  options.keyAssignmentValidators = new KeyAssignmentValidators(options.keyAssignmentValidators || ({}));
  Array.prototype.forEach.call(getInputElements(element, options), el => {
    let type = getElementType(el);
    let key = options.keyExtractors.get(type)(el);
    let value = options.inputReaders.get(type)(el);
    if (options.keyAssignmentValidators.get(type)(el, key, value)) {
      let keychain = options.keySplitter(key);
      data = assignKeyValue(data, keychain, value);
    }
  });
  return data;
}
class InputWriters extends TypeRegistry {
  constructor(options) {
    super(options);
    this.registerDefault((el, value) => {
      el.value = value;
    });
    this.register("checkbox", (el, value) => {
      null === value ? el.indeterminate = true : el.checked = Array.isArray(value) ? -1 !== value.indexOf(el.value) : value;
    });
    this.register("radio", function (el, value) {
      void 0 !== value && (el.checked = el.value === value.toString());
    });
    this.register("select", setSelectValue);
  }
}
function setSelectValue(elem, value) {
  var optionSet, option;
  var options = elem.options;
  var values = (function (arr) {
    var ret = [];
    null !== arr && (Array.isArray(arr) ? ret.push.apply(ret, arr) : ret.push(arr));
    return ret;
  })(value);
  var i = options.length;
  for (; i--; ) {
    option = options[i];
    if (values.indexOf(option.value) > -1) {
      option.setAttribute("selected", true);
      optionSet = true;
    }
  }
  optionSet || (elem.selectedIndex = -1);
}
function keyJoiner(parentKey, childKey) {
  return parentKey + "[" + childKey + "]";
}
function flattenData(data, parentKey, options = {}) {
  let flatData = {};
  let keyJoiner$1 = options.keyJoiner || keyJoiner;
  for (let keyName in data) {
    if (!data.hasOwnProperty(keyName)) continue;
    let value = data[keyName];
    let hash = {};
    parentKey && (keyName = keyJoiner$1(parentKey, keyName));
    if (Array.isArray(value)) {
      hash[keyName + "[]"] = value;
      hash[keyName] = value;
    } else "object" == typeof value ? hash = flattenData(value, keyName, options) : hash[keyName] = value;
    Object.assign(flatData, hash);
  }
  return flatData;
}
function deserialize(form, data, options = {}) {
  let flattenedData = flattenData(data, null, options);
  options.keyExtractors = new KeyExtractors(options.keyExtractors || ({}));
  options.inputWriters = new InputWriters(options.inputWriters || ({}));
  Array.prototype.forEach.call(getInputElements(form, options), el => {
    let type = getElementType(el);
    let key = options.keyExtractors.get(type)(el);
    options.inputWriters.get(type)(el, flattenedData[key]);
  });
}
var lzString = ((function (module) {
  var LZString = (function () {
    var f = String.fromCharCode;
    var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var baseReverseDic = {};
    function getBaseValue(alphabet, character) {
      if (!baseReverseDic[alphabet]) {
        baseReverseDic[alphabet] = {};
        for (var i = 0; i < alphabet.length; i++) baseReverseDic[alphabet][alphabet.charAt(i)] = i;
      }
      return baseReverseDic[alphabet][character];
    }
    var LZString = {
      compressToBase64: function (input) {
        if (null == input) return "";
        var res = LZString._compress(input, 6, function (a) {
          return keyStrBase64.charAt(a);
        });
        switch (res.length % 4) {
          default:
          case 0:
            return res;
          case 1:
            return res + "===";
          case 2:
            return res + "==";
          case 3:
            return res + "=";
        }
      },
      decompressFromBase64: function (input) {
        return null == input ? "" : "" == input ? null : LZString._decompress(input.length, 32, function (index) {
          return getBaseValue(keyStrBase64, input.charAt(index));
        });
      },
      compressToUTF16: function (input) {
        return null == input ? "" : LZString._compress(input, 15, function (a) {
          return f(a + 32);
        }) + " ";
      },
      decompressFromUTF16: function (compressed) {
        return null == compressed ? "" : "" == compressed ? null : LZString._decompress(compressed.length, 16384, function (index) {
          return compressed.charCodeAt(index) - 32;
        });
      },
      compressToUint8Array: function (uncompressed) {
        var compressed = LZString.compress(uncompressed);
        var buf = new Uint8Array(2 * compressed.length);
        for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
          var current_value = compressed.charCodeAt(i);
          buf[2 * i] = current_value >>> 8;
          buf[2 * i + 1] = current_value % 256;
        }
        return buf;
      },
      decompressFromUint8Array: function (compressed) {
        if (null == compressed) return LZString.decompress(compressed);
        var buf = new Array(compressed.length / 2);
        for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) buf[i] = 256 * compressed[2 * i] + compressed[2 * i + 1];
        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return LZString.decompress(result.join(""));
      },
      compressToEncodedURIComponent: function (input) {
        return null == input ? "" : LZString._compress(input, 6, function (a) {
          return keyStrUriSafe.charAt(a);
        });
      },
      decompressFromEncodedURIComponent: function (input) {
        if (null == input) return "";
        if ("" == input) return null;
        input = input.replace(/ /g, "+");
        return LZString._decompress(input.length, 32, function (index) {
          return getBaseValue(keyStrUriSafe, input.charAt(index));
        });
      },
      compress: function (uncompressed) {
        return LZString._compress(uncompressed, 16, function (a) {
          return f(a);
        });
      },
      _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
        if (null == uncompressed) return "";
        var i, value, ii, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0;
        for (ii = 0; ii < uncompressed.length; ii += 1) {
          context_c = uncompressed.charAt(ii);
          if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
            context_dictionary[context_c] = context_dictSize++;
            context_dictionaryToCreate[context_c] = true;
          }
          context_wc = context_w + context_c;
          if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) context_w = context_wc; else {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val <<= 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else context_data_position++;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | 1 & value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else context_data_position++;
                  value >>= 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else context_data_position++;
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | 1 & value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else context_data_position++;
                  value >>= 1;
                }
              }
              if (0 == --context_enlargeIn) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | 1 & value;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else context_data_position++;
                value >>= 1;
              }
            }
            if (0 == --context_enlargeIn) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
            context_dictionary[context_wc] = context_dictSize++;
            context_w = String(context_c);
          }
        }
        if ("" !== context_w) {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val <<= 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else context_data_position++;
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 8; i++) {
                context_data_val = context_data_val << 1 | 1 & value;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else context_data_position++;
                value >>= 1;
              }
            } else {
              value = 1;
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else context_data_position++;
                value = 0;
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 16; i++) {
                context_data_val = context_data_val << 1 | 1 & value;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else context_data_position++;
                value >>= 1;
              }
            }
            if (0 == --context_enlargeIn) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
            delete context_dictionaryToCreate[context_w];
          } else {
            value = context_dictionary[context_w];
            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | 1 & value;
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else context_data_position++;
              value >>= 1;
            }
          }
          if (0 == --context_enlargeIn) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
        }
        value = 2;
        for (i = 0; i < context_numBits; i++) {
          context_data_val = context_data_val << 1 | 1 & value;
          if (context_data_position == bitsPerChar - 1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else context_data_position++;
          value >>= 1;
        }
        for (; ; ) {
          context_data_val <<= 1;
          if (context_data_position == bitsPerChar - 1) {
            context_data.push(getCharFromInt(context_data_val));
            break;
          }
          context_data_position++;
        }
        return context_data.join("");
      },
      decompress: function (compressed) {
        return null == compressed ? "" : "" == compressed ? null : LZString._decompress(compressed.length, 32768, function (index) {
          return compressed.charCodeAt(index);
        });
      },
      _decompress: function (length, resetValue, getNextValue) {
        var i, w, bits, resb, maxpower, power, c, dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], data = {
          val: getNextValue(0),
          position: resetValue,
          index: 1
        };
        for (i = 0; i < 3; i += 1) dictionary[i] = i;
        bits = 0;
        maxpower = Math.pow(2, 2);
        power = 1;
        for (; power != maxpower; ) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (0 == data.position) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }
        switch (bits) {
          case 0:
            bits = 0;
            maxpower = Math.pow(2, 8);
            power = 1;
            for (; power != maxpower; ) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (0 == data.position) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            c = f(bits);
            break;
          case 1:
            bits = 0;
            maxpower = Math.pow(2, 16);
            power = 1;
            for (; power != maxpower; ) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (0 == data.position) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            c = f(bits);
            break;
          case 2:
            return "";
        }
        dictionary[3] = c;
        w = c;
        result.push(c);
        for (; ; ) {
          if (data.index > length) return "";
          bits = 0;
          maxpower = Math.pow(2, numBits);
          power = 1;
          for (; power != maxpower; ) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (0 == data.position) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (c = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              for (; power != maxpower; ) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (0 == data.position) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              dictionary[dictSize++] = f(bits);
              c = dictSize - 1;
              enlargeIn--;
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              for (; power != maxpower; ) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (0 == data.position) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              dictionary[dictSize++] = f(bits);
              c = dictSize - 1;
              enlargeIn--;
              break;
            case 2:
              return result.join("");
          }
          if (0 == enlargeIn) {
            enlargeIn = Math.pow(2, numBits);
            numBits++;
          }
          if (dictionary[c]) entry = dictionary[c]; else {
            if (c !== dictSize) return null;
            entry = w + w.charAt(0);
          }
          result.push(entry);
          dictionary[dictSize++] = w + entry.charAt(0);
          w = entry;
          if (0 == --enlargeIn) {
            enlargeIn = Math.pow(2, numBits);
            numBits++;
          }
        }
      }
    };
    return LZString;
  })();
  null != module && (module.exports = LZString);
})(module = {
  exports: {}
}, module.exports), module.exports);
var module;
class OptionsSync {
  constructor({defaults: defaults = {}, storageName: storageName = "options", migrations: migrations = [], logging: logging = true} = {}) {
    Object.defineProperty(this, "storageName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "defaults", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_form", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_migrations", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.storageName = storageName;
    this.defaults = defaults;
    this._handleFormInput = (delay = 300, atBegin = this._handleFormInput.bind(this), void 0 === callback ? throttle(delay, atBegin, false) : throttle(delay, callback, false !== atBegin));
    var delay, atBegin, callback;
    this._handleStorageChangeOnForm = this._handleStorageChangeOnForm.bind(this);
    logging || (this._log = () => {});
    this._migrations = this._runMigrations(migrations);
  }
  async getAll() {
    await this._migrations;
    return this._getAll();
  }
  async setAll(newOptions) {
    await this._migrations;
    return this._setAll(newOptions);
  }
  async set(newOptions) {
    return this.setAll({
      ...await this.getAll(),
      ...newOptions
    });
  }
  async syncForm(form) {
    this._form = form instanceof HTMLFormElement ? form : document.querySelector(form);
    this._form.addEventListener("input", this._handleFormInput);
    this._form.addEventListener("submit", this._handleFormSubmit);
    chrome.storage.onChanged.addListener(this._handleStorageChangeOnForm);
    this._updateForm(this._form, await this.getAll());
  }
  async stopSyncForm() {
    if (this._form) {
      this._form.removeEventListener("input", this._handleFormInput);
      this._form.removeEventListener("submit", this._handleFormSubmit);
      chrome.storage.onChanged.removeListener(this._handleStorageChangeOnForm);
      delete this._form;
    }
  }
  _log(method, ...args) {
    console[method](...args);
  }
  async _getAll() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(this.storageName, result => {
        chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(this._decode(result[this.storageName]));
      });
    });
  }
  async _setAll(newOptions) {
    this._log("log", "Saving options", newOptions);
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({
        [this.storageName]: this._encode(newOptions)
      }, () => {
        chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve();
      });
    });
  }
  _encode(options) {
    const thinnedOptions = {
      ...options
    };
    for (const [key, value] of Object.entries(thinnedOptions)) this.defaults[key] === value && delete thinnedOptions[key];
    this._log("log", "Without the default values", thinnedOptions);
    return lzString.compressToEncodedURIComponent(JSON.stringify(thinnedOptions));
  }
  _decode(options) {
    let decompressed = options;
    "string" == typeof options && (decompressed = JSON.parse(lzString.decompressFromEncodedURIComponent(options)));
    return {
      ...this.defaults,
      ...decompressed
    };
  }
  async _runMigrations(migrations) {
    if (0 === migrations.length || !_webextDetectPage.isBackgroundPage() || !await (async function () {
      return new Promise(resolve => {
        var _a;
        const callback = installType => {
          if ("development" !== installType) {
            chrome.runtime.onInstalled.addListener(() => resolve(true));
            setTimeout(resolve, 500, false);
          } else resolve(true);
        };
        (null === (_a = chrome.management) || void 0 === _a ? void 0 : _a.getSelf) ? chrome.management.getSelf(({installType: installType}) => callback(installType)) : callback("unknown");
      });
    })()) return;
    const options = await this._getAll();
    const initial = JSON.stringify(options);
    this._log("log", "Found these stored options", {
      ...options
    });
    this._log("info", "Will run", migrations.length, 1 === migrations.length ? "migration" : " migrations");
    migrations.forEach(migrate => migrate(options, this.defaults));
    initial !== JSON.stringify(options) && await this._setAll(options);
  }
  async _handleFormInput({target: target}) {
    const field = target;
    if (field.name) {
      await this.set(this._parseForm(field.form));
      field.form.dispatchEvent(new CustomEvent("options-sync:form-synced", {
        bubbles: true
      }));
    }
  }
  _handleFormSubmit(event) {
    event.preventDefault();
  }
  _updateForm(form, options) {
    const currentFormState = this._parseForm(form);
    for (const [key, value] of Object.entries(options)) currentFormState[key] === value && delete options[key];
    const include = Object.keys(options);
    include.length > 0 && deserialize(form, options, {
      include: include
    });
  }
  _parseForm(form) {
    const include = [];
    for (const field of form.querySelectorAll("[name]")) field.validity.valid && !field.disabled && include.push(field.name.replace(/\[.*]/, ""));
    return serialize(form, {
      include: include
    });
  }
  _handleStorageChangeOnForm(changes, areaName) {
    "sync" !== areaName || !changes[this.storageName] || document.hasFocus() && this._form.contains(document.activeElement) || this._updateForm(this._form, this._decode(changes[this.storageName].newValue));
  }
}
Object.defineProperty(OptionsSync, "migrations", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: {
    removeUnused(options, defaults) {
      for (const key of Object.keys(options)) (key in defaults) || delete options[key];
    }
  }
});
exports.default = OptionsSync;

},{"webext-detect-page":"6h5K9","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"6h5K9":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "isContentScript", function () {
  return isContentScript;
});
_parcelHelpers.export(exports, "isBackgroundPage", function () {
  return isBackgroundPage;
});
_parcelHelpers.export(exports, "isOptionsPage", function () {
  return isOptionsPage;
});
const isExtensionContext = typeof chrome === 'object' && chrome && typeof chrome.extension === 'object';
const globalWindow = typeof window === 'object' ? window : undefined;
const isWeb = typeof location === 'object' && location.protocol.startsWith('http');
function isContentScript() {
  return isExtensionContext && isWeb;
}
function isBackgroundPage() {
  var _a, _b;
  return isExtensionContext && (location.pathname === '/_generated_background_page.html' || ((_b = (_a = chrome.extension) === null || _a === void 0 ? void 0 : _a.getBackgroundPage) === null || _b === void 0 ? void 0 : _b.call(_a)) === globalWindow);
}
function isOptionsPage() {
  if (!isExtensionContext || !chrome.runtime.getManifest) {
    return false;
  }
  const {options_ui} = chrome.runtime.getManifest();
  if (typeof options_ui !== 'object' || typeof options_ui.page !== 'string') {
    return false;
  }
  const url = new URL(options_ui.page, location.origin);
  return url.pathname === location.pathname && url.origin === location.origin;
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"01MLZ":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"55Zbq":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _webextensionPolyfill = require('webextension-polyfill');
var _webextensionPolyfillDefault = _parcelHelpers.interopDefault(_webextensionPolyfill);
const localStore = {
  async get(key) {
    const result = await _webextensionPolyfillDefault.default.storage.local.get(key);
    return result[key];
  },
  async set(key, value) {
    return _webextensionPolyfillDefault.default.storage.local.set({
      [key]: value
    });
  },
  async remove(key) {
    return _webextensionPolyfillDefault.default.storage.local.remove(key);
  },
  async clear() {
    return _webextensionPolyfillDefault.default.storage.local.clear();
  }
};
exports.default = localStore;

},{"webextension-polyfill":"6Pxrh","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"Y1LAD":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "emptyTabUrls", function () {
  return emptyTabUrls;
});
_parcelHelpers.export(exports, "createTab", function () {
  return createTab;
});
_parcelHelpers.export(exports, "updateTab", function () {
  return updateTab;
});
_parcelHelpers.export(exports, "queryTabs", function () {
  return queryTabs;
});
_parcelHelpers.export(exports, "openTab", function () {
  return openTab;
});
var _webextensionPolyfill = require('webextension-polyfill');
var _webextensionPolyfillDefault = _parcelHelpers.interopDefault(_webextensionPolyfill);
var _optionsStorageJs = require('../options-storage.js');
var _optionsStorageJsDefault = _parcelHelpers.interopDefault(_optionsStorageJs);
var _utilJs = require('../util.js');
var _permissionsServiceJs = require('./permissions-service.js');
const emptyTabUrls = _utilJs.isChrome() ? ['chrome://newtab/', 'chrome-search://local-ntp/local-ntp.html'] : [];
async function createTab(url) {
  return _webextensionPolyfillDefault.default.tabs.create({
    url
  });
}
async function updateTab(tabId, options) {
  return _webextensionPolyfillDefault.default.tabs.update(tabId, options);
}
async function queryTabs(urlList) {
  const currentWindow = true;
  return _webextensionPolyfillDefault.default.tabs.query({
    currentWindow,
    url: urlList
  });
}
async function openTab(url) {
  const {reuseTabs} = await _optionsStorageJsDefault.default.getAll();
  const permissionGranted = await _permissionsServiceJs.queryPermission('tabs');
  if (reuseTabs && permissionGranted) {
    const matchingUrls = [url];
    if (url.endsWith('/notifications')) {
      matchingUrls.push(url + '?query=is%3Aunread');
    }
    const existingTabs = await queryTabs(matchingUrls);
    if (existingTabs && existingTabs.length > 0) {
      return updateTab(existingTabs[0].id, {
        url,
        active: true
      });
    }
    const emptyTabs = await queryTabs(emptyTabUrls);
    if (emptyTabs && emptyTabs.length > 0) {
      return updateTab(emptyTabs[0].id, {
        url,
        active: true
      });
    }
  }
  return createTab(url);
}

},{"webextension-polyfill":"6Pxrh","../options-storage.js":"5Cca6","../util.js":"64wup","./permissions-service.js":"4kKxW","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"64wup":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "isChrome", function () {
  return isChrome;
});
_parcelHelpers.export(exports, "parseFullName", function () {
  return parseFullName;
});
_parcelHelpers.export(exports, "isNotificationTargetPage", function () {
  return isNotificationTargetPage;
});
_parcelHelpers.export(exports, "parseLinkHeader", function () {
  return parseLinkHeader;
});
_parcelHelpers.export(exports, "background", function () {
  return background;
});
var _webextensionPolyfill = require('webextension-polyfill');
var _webextensionPolyfillDefault = _parcelHelpers.interopDefault(_webextensionPolyfill);
var _libApiJs = require('./lib/api.js');
function isChrome() {
  return navigator.userAgent.includes('Chrome');
}
function parseFullName(fullName) {
  const [, owner, repository] = fullName.match(/^([^/]*)(?:\/(.*))?/);
  return {
    owner,
    repository
  };
}
async function isNotificationTargetPage(url) {
  const urlObject = new URL(url);
  if (urlObject.origin !== await _libApiJs.getGitHubOrigin()) {
    return false;
  }
  const pathname = urlObject.pathname.replace(/^\/|\/$/g, '');
  // Remove trailing and leading slashes
  // For https://github.com/notifications and the beta https://github.com/notifications/beta
  if (pathname === 'notifications' || pathname === 'notifications/beta') {
    return true;
  }
  const repoPath = pathname.split('/').slice(2).join('/');
  // Everything after `user/repo`
  // Issue, PR, commit paths, and per-repo notifications
  return (/^(((issues|pull)\/\d+(\/(commits|files))?)|(commit\/.*)|(notifications$))/).test(repoPath);
}
function parseLinkHeader(header) {
  const links = {};
  for (const part of (header || '').split(',')) {
    const [sectionUrl = '', sectionName = ''] = part.split(';');
    const url = sectionUrl.replace(/<(.+)>/, '$1').trim();
    const name = sectionName.replace(/rel="(.+)"/, '$1').trim();
    if (name && url) {
      links[name] = url;
    }
  }
  return links;
}
const backgroundPage = _webextensionPolyfillDefault.default.extension.getBackgroundPage() || window;
const background = {
  log: backgroundPage.console.log,
  warn: backgroundPage.console.warn,
  error: backgroundPage.console.error,
  info: backgroundPage.console.info
};

},{"webextension-polyfill":"6Pxrh","./lib/api.js":"6v60q","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"6v60q":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getGitHubOrigin", function () {
  return getGitHubOrigin;
});
_parcelHelpers.export(exports, "getTabUrl", function () {
  return getTabUrl;
});
_parcelHelpers.export(exports, "getApiUrl", function () {
  return getApiUrl;
});
_parcelHelpers.export(exports, "getParsedUrl", function () {
  return getParsedUrl;
});
_parcelHelpers.export(exports, "getHeaders", function () {
  return getHeaders;
});
_parcelHelpers.export(exports, "makeApiRequest", function () {
  return makeApiRequest;
});
_parcelHelpers.export(exports, "getNotificationResponse", function () {
  return getNotificationResponse;
});
_parcelHelpers.export(exports, "getNotifications", function () {
  return getNotifications;
});
_parcelHelpers.export(exports, "getNotificationCount", function () {
  return getNotificationCount;
});
var _optionsStorageJs = require('../options-storage.js');
var _optionsStorageJsDefault = _parcelHelpers.interopDefault(_optionsStorageJs);
var _utilJs = require('../util.js');
async function getGitHubOrigin() {
  const {rootUrl} = await _optionsStorageJsDefault.default.getAll();
  const {origin} = new URL(rootUrl);
  // TODO: Drop `api.github.com` check when dropping migrations
  if (origin === 'https://api.github.com' || origin === 'https://github.com') {
    return 'https://github.com';
  }
  return origin;
}
async function getTabUrl() {
  const {onlyParticipating} = await _optionsStorageJsDefault.default.getAll();
  const useParticipating = onlyParticipating ? '/participating' : '';
  return `${await getGitHubOrigin()}/notifications${useParticipating}`;
}
async function getApiUrl() {
  const {rootUrl} = await _optionsStorageJsDefault.default.getAll();
  const {origin} = new URL(rootUrl);
  // TODO: Drop `api.github.com` check when dropping migrations
  if (origin === 'https://api.github.com' || origin === 'https://github.com') {
    return 'https://api.github.com';
  }
  return `${origin}/api/v3`;
}
async function getParsedUrl(endpoint, parameters) {
  const api = await getApiUrl();
  const query = parameters ? '?' + new URLSearchParams(parameters).toString() : '';
  return `${api}${endpoint}${query}`;
}
async function getHeaders() {
  const {token} = await _optionsStorageJsDefault.default.getAll();
  if (!token) {
    throw new Error('missing token');
  }
  return {
    /*eslint-disable quote-props*/
    'Authorization': `Bearer ${token}`,
    'If-Modified-Since': ''
  };
}
async function makeApiRequest(endpoint, parameters) {
  const url = await getParsedUrl(endpoint, parameters);
  let response;
  try {
    response = await fetch(url, {
      headers: await getHeaders()
    });
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error('network error'));
  }
  const {status, headers} = response;
  if (status >= 500) {
    return Promise.reject(new Error('server error'));
  }
  if (status >= 400) {
    return Promise.reject(new Error('client error'));
  }
  try {
    const json = await response.json();
    return {
      headers,
      json
    };
  } catch {
    return Promise.reject(new Error('parse error'));
  }
}
async function getNotificationResponse({page = 1, maxItems = 100, lastModified = ''}) {
  const {onlyParticipating} = await _optionsStorageJsDefault.default.getAll();
  const parameters = {
    page,
    per_page: maxItems
  };
  if (onlyParticipating) {
    parameters.participating = onlyParticipating;
  }
  if (lastModified) {
    parameters.since = lastModified;
  }
  return makeApiRequest('/notifications', parameters);
}
async function getNotifications({page, maxItems, lastModified, notifications = []}) {
  const {headers, json} = await getNotificationResponse({
    page,
    maxItems,
    lastModified
  });
  notifications = [...notifications, ...json];
  const {next} = _utilJs.parseLinkHeader(headers.get('Link'));
  if (!next) {
    return notifications;
  }
  const {searchParams} = new URL(next);
  return getNotifications({
    page: searchParams.get('page'),
    maxItems: searchParams.get('per_page'),
    lastModified,
    notifications
  });
}
async function getNotificationCount() {
  const {headers, json: notifications} = await getNotificationResponse({
    maxItems: 1
  });
  const interval = Number(headers.get('X-Poll-Interval'));
  const lastModified = new Date(headers.get('Last-Modified')).toUTCString();
  const linkHeader = headers.get('Link');
  if (linkHeader === null) {
    return {
      count: notifications.length,
      interval,
      lastModified
    };
  }
  const {last} = _utilJs.parseLinkHeader(linkHeader);
  const {searchParams} = new URL(last);
  // We get notification count by asking the API to give us only one notification
  // for each page, then the last page number gives us the count
  const count = Number(searchParams.get('page'));
  return {
    count,
    interval,
    lastModified
  };
}

},{"../options-storage.js":"5Cca6","../util.js":"64wup","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"4kKxW":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "queryPermission", function () {
  return queryPermission;
});
_parcelHelpers.export(exports, "requestPermission", function () {
  return requestPermission;
});
var _webextensionPolyfill = require('webextension-polyfill');
var _webextensionPolyfillDefault = _parcelHelpers.interopDefault(_webextensionPolyfill);
async function queryPermission(permission) {
  try {
    return _webextensionPolyfillDefault.default.permissions.contains({
      permissions: [permission]
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function requestPermission(permission) {
  try {
    return _webextensionPolyfillDefault.default.permissions.request({
      permissions: [permission]
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

},{"webextension-polyfill":"6Pxrh","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"1wveU":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "renderCount", function () {
  return renderCount;
});
_parcelHelpers.export(exports, "renderError", function () {
  return renderError;
});
_parcelHelpers.export(exports, "renderWarning", function () {
  return renderWarning;
});
var _webextensionPolyfill = require('webextension-polyfill');
var _webextensionPolyfillDefault = _parcelHelpers.interopDefault(_webextensionPolyfill);
var _defaultsJs = require('./defaults.js');
function render(text, color, title) {
  _webextensionPolyfillDefault.default.browserAction.setBadgeText({
    text
  });
  _webextensionPolyfillDefault.default.browserAction.setBadgeBackgroundColor({
    color
  });
  _webextensionPolyfillDefault.default.browserAction.setTitle({
    title
  });
}
function getCountString(count) {
  if (count === 0) {
    return '';
  }
  if (count > 9999) {
    return '∞';
  }
  return String(count);
}
function getErrorData(error) {
  const title = _defaultsJs.getErrorTitle(error);
  const symbol = _defaultsJs.getErrorSymbol(error);
  return {
    symbol,
    title
  };
}
function renderCount(count) {
  const color = _defaultsJs.getBadgeDefaultColor();
  const title = _defaultsJs.defaultTitle;
  render(getCountString(count), color, title);
}
function renderError(error) {
  const color = _defaultsJs.getBadgeErrorColor();
  const {symbol, title} = getErrorData(error);
  render(symbol, color, title);
}
function renderWarning(warning) {
  const color = _defaultsJs.getBadgeWarningColor();
  const title = _defaultsJs.getWarningTitle(warning);
  const symbol = _defaultsJs.getWarningSymbol(warning);
  render(symbol, color, title);
}

},{"webextension-polyfill":"6Pxrh","./defaults.js":"3y9Sx","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"3y9Sx":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "notificationReasons", function () {
  return notificationReasons;
});
_parcelHelpers.export(exports, "errorTitles", function () {
  return errorTitles;
});
_parcelHelpers.export(exports, "errorSymbols", function () {
  return errorSymbols;
});
_parcelHelpers.export(exports, "warningTitles", function () {
  return warningTitles;
});
_parcelHelpers.export(exports, "warningSymbols", function () {
  return warningSymbols;
});
_parcelHelpers.export(exports, "colors", function () {
  return colors;
});
_parcelHelpers.export(exports, "getBadgeDefaultColor", function () {
  return getBadgeDefaultColor;
});
_parcelHelpers.export(exports, "getBadgeErrorColor", function () {
  return getBadgeErrorColor;
});
_parcelHelpers.export(exports, "getBadgeWarningColor", function () {
  return getBadgeWarningColor;
});
_parcelHelpers.export(exports, "getWarningTitle", function () {
  return getWarningTitle;
});
_parcelHelpers.export(exports, "getWarningSymbol", function () {
  return getWarningSymbol;
});
_parcelHelpers.export(exports, "getErrorTitle", function () {
  return getErrorTitle;
});
_parcelHelpers.export(exports, "getErrorSymbol", function () {
  return getErrorSymbol;
});
_parcelHelpers.export(exports, "getNotificationReasonText", function () {
  return getNotificationReasonText;
});
_parcelHelpers.export(exports, "defaultTitle", function () {
  return defaultTitle;
});
const notificationReasons = new Map([['subscribed', 'You are watching the repository'], ['manual', 'You are subscribed to this thread'], ['author', 'You created this thread'], ['comment', 'You commented on this thread'], ['mention', 'New updates from thread'], ['team_mention', 'New updates from thread'], ['state_change', 'Thread status changed'], ['assign', 'You were assigned to the thread'], ['security_alert', 'New security vulnerability found'], ['invitation', 'You accepted an invitation'], ['review_requested', 'PR Review Requested']]);
const errorTitles = new Map([['missing token', 'Missing access token, please create one and enter it in Options'], ['server error', 'GitHub having issues serving requests'], ['client error', 'Invalid token, enter a valid one'], ['network error', 'You have to be connected to the Internet'], ['parse error', 'Unable to handle server response'], ['default', 'Unknown error']]);
const errorSymbols = new Map([['missing token', 'X'], ['client error', '!'], ['default', '?']]);
const warningTitles = new Map([['default', 'Unknown warning'], ['offline', 'No Internet connnection']]);
const warningSymbols = new Map([['default', 'warn'], ['offline', 'off']]);
const colors = new Map([['default', [3, 102, 214, 255]], ['error', [203, 36, 49, 255]], ['warning', [245, 159, 0, 255]]]);
function getBadgeDefaultColor() {
  return colors.get('default');
}
function getBadgeErrorColor() {
  return colors.get('error');
}
function getBadgeWarningColor() {
  return colors.get('warning');
}
function getWarningTitle(warning) {
  return warningTitles.get(warning) || warningTitles.get('default');
}
function getWarningSymbol(warning) {
  return warningSymbols.get(warning) || warningSymbols.get('default');
}
function getErrorTitle(error) {
  return errorTitles.get(error.message) || errorTitles.get('default');
}
function getErrorSymbol(error) {
  return errorSymbols.get(error.message) || errorSymbols.get('default');
}
function getNotificationReasonText(reason) {
  return notificationReasons.get(reason) || '';
}
const defaultTitle = 'Notifier for GitHub';

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"72X5R":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "closeNotification", function () {
  return closeNotification;
});
_parcelHelpers.export(exports, "openNotification", function () {
  return openNotification;
});
_parcelHelpers.export(exports, "removeNotification", function () {
  return removeNotification;
});
_parcelHelpers.export(exports, "getNotificationObject", function () {
  return getNotificationObject;
});
_parcelHelpers.export(exports, "showNotifications", function () {
  return showNotifications;
});
_parcelHelpers.export(exports, "playNotificationSound", function () {
  return playNotificationSound;
});
_parcelHelpers.export(exports, "checkNotifications", function () {
  return checkNotifications;
});
var _delay = require('delay');
var _delayDefault = _parcelHelpers.interopDefault(_delay);
var _webextensionPolyfill = require('webextension-polyfill');
var _webextensionPolyfillDefault = _parcelHelpers.interopDefault(_webextensionPolyfill);
var _optionsStorageJs = require('../options-storage.js');
var _optionsStorageJsDefault = _parcelHelpers.interopDefault(_optionsStorageJs);
var _repositoriesStorageJs = require('../repositories-storage.js');
var _repositoriesStorageJsDefault = _parcelHelpers.interopDefault(_repositoriesStorageJs);
var _utilJs = require('../util.js');
var _apiJs = require('./api.js');
var _defaultsJs = require('./defaults.js');
var _tabsServiceJs = require('./tabs-service.js');
var _localStoreJs = require('./local-store.js');
var _localStoreJsDefault = _parcelHelpers.interopDefault(_localStoreJs);
var _permissionsServiceJs = require('./permissions-service.js');
function getLastReadForNotification(notification) {
  // Extract the specific fragment URL for a notification
  // This allows you to directly jump to a specific comment as if you were using
  // the notifications page
  const lastReadTime = notification.last_read_at;
  const lastRead = new Date(lastReadTime || notification.updated_at);
  if (lastReadTime) {
    lastRead.setSeconds(lastRead.getSeconds() + 1);
  }
  return lastRead.toISOString();
}
async function issueOrPRHandler(notification) {
  const notificationUrl = notification.subject.url;
  try {
    // Try to construct a URL object, if that fails, bail to open the notifications URL
    const url = new URL(notificationUrl);
    try {
      // Try to get the latest comment that the user has not read
      const lastRead = getLastReadForNotification(notification);
      const {json: comments} = await _apiJs.makeApiRequest(`${url.pathname}/comments`, {
        since: lastRead,
        per_page: 1
      });
      const comment = comments[0];
      if (comment) {
        return comment.html_url;
      }
      // If there are not comments or events, then just open the url
      const {json: response} = await _apiJs.makeApiRequest(url.pathname);
      const targetUrl = response.message === 'Not Found' ? await _apiJs.getTabUrl() : response.html_url;
      return targetUrl;
    } catch {
      // If anything related to querying the API fails, extract the URL to issue/PR from the API url
      const alterateURL = new URL(await _apiJs.getGitHubOrigin() + url.pathname);
      // On GitHub Enterprise, the pathname is preceeded with `/api/v3`
      alterateURL.pathname = alterateURL.pathname.replace('/api/v3', '');
      // Pathname is generally of the form `/repos/user/reponame/pulls/2294`
      // we only need the last part of the path (adjusted for frontend use) #185
      alterateURL.pathname = alterateURL.pathname.replace('/repos', '');
      alterateURL.pathname = alterateURL.pathname.replace('/pulls/', '/pull/');
      return alterateURL.href;
    }
  } catch (error) {
    throw error;
  }
}
const notificationHandlers = {
  /*eslint-disable quote-props*/
  'Issue': issueOrPRHandler,
  'PullRequest': issueOrPRHandler,
  'RepositoryInvitation': notification => {
    return `${notification.repository.html_url}/invitations`;
  }
};
async function closeNotification(notificationId) {
  return _webextensionPolyfillDefault.default.notifications.clear(notificationId);
}
async function openNotification(notificationId) {
  const notification = await _localStoreJsDefault.default.get(notificationId);
  await closeNotification(notificationId);
  await removeNotification(notificationId);
  try {
    const urlToOpen = await notificationHandlers[notification.subject.type](notification);
    return _tabsServiceJs.openTab(urlToOpen);
  } catch {
    return _tabsServiceJs.openTab(await _apiJs.getTabUrl());
  }
}
async function removeNotification(notificationId) {
  return _localStoreJsDefault.default.remove(notificationId);
}
function getNotificationObject(notificationInfo) {
  return {
    title: notificationInfo.subject.title,
    iconUrl: _webextensionPolyfillDefault.default.runtime.getURL('icon-notif.png'),
    type: 'basic',
    message: notificationInfo.repository.full_name,
    contextMessage: _defaultsJs.getNotificationReasonText(notificationInfo.reason)
  };
}
async function showNotifications(notifications) {
  const permissionGranted = await _permissionsServiceJs.queryPermission('notifications');
  if (!permissionGranted) {
    return;
  }
  for (const notification of notifications) {
    const notificationId = `github-notifier-${notification.id}`;
    const notificationObject = getNotificationObject(notification);
    await _webextensionPolyfillDefault.default.notifications.create(notificationId, notificationObject);
    await _localStoreJsDefault.default.set(notificationId, notification);
    await _delayDefault.default(50);
  }
}
function playNotificationSound() {
  const audio = new Audio();
  audio.src = _webextensionPolyfillDefault.default.runtime.getURL('sounds/bell.ogg');
  audio.play();
}
async function checkNotifications(lastModified) {
  let notifications = await _apiJs.getNotifications({
    lastModified
  });
  const {showDesktopNotif, playNotifSound, filterNotifications} = await _optionsStorageJsDefault.default.getAll();
  if (filterNotifications) {
    const repositories = await _repositoriesStorageJsDefault.default.getAll();
    /*eslint-disable camelcase*/
    notifications = notifications.filter(({repository: {full_name}}) => {
      const {owner, repository} = _utilJs.parseFullName(full_name);
      return Boolean(repositories[owner] && repositories[owner][repository]);
    });
  }
  if (playNotifSound && notifications.length > 0) {
    playNotificationSound();
  }
  if (showDesktopNotif) {
    await showNotifications(notifications);
  }
}

},{"delay":"2sXVs","webextension-polyfill":"6Pxrh","../options-storage.js":"5Cca6","../repositories-storage.js":"1abYf","../util.js":"64wup","./api.js":"6v60q","./defaults.js":"3y9Sx","./tabs-service.js":"Y1LAD","./local-store.js":"55Zbq","./permissions-service.js":"4kKxW","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"1abYf":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _webextOptionsSync = require('webext-options-sync');
var _webextOptionsSyncDefault = _parcelHelpers.interopDefault(_webextOptionsSync);
const repositoriesStorage = new _webextOptionsSyncDefault.default({
  storageName: 'repositories',
  defaults: {}
});
exports.default = repositoriesStorage;

},{"webext-options-sync":"22Sdi","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}]},["4CQwz"], "4CQwz", "parcelRequire427e")

