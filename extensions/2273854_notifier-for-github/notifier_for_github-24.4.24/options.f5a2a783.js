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
})({"LnJSS":[function(require,module,exports) {
var _webextensionPolyfill = require('webextension-polyfill');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _webextensionPolyfillDefault = _parcelHelpers.interopDefault(_webextensionPolyfill);
var _optionsStorageJs = require('./options-storage.js');
var _optionsStorageJsDefault = _parcelHelpers.interopDefault(_optionsStorageJs);
var _repositoriesJs = require('./repositories.js');
var _repositoriesJsDefault = _parcelHelpers.interopDefault(_repositoriesJs);
var _libPermissionsServiceJs = require('./lib/permissions-service.js');
var _utilJs = require('./util.js');
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await initOptionsForm();
    await _repositoriesJsDefault.default();
    initGlobalSyncListener();
  } catch (error) {
    console.error(error);
    _utilJs.background.error(error);
  }
});
function initGlobalSyncListener() {
  document.addEventListener('options-sync:form-synced', () => {
    _webextensionPolyfillDefault.default.runtime.sendMessage('update');
  });
}
function checkRelatedInputStates(inputElement) {
  if (inputElement.name === 'showDesktopNotif') {
    const filterCheckbox = document.querySelector('[name="filterNotifications"]');
    filterCheckbox.disabled = !inputElement.checked;
  }
}
async function initOptionsForm() {
  const form = document.querySelector('#options-form');
  await _optionsStorageJsDefault.default.syncForm(form);
  for (const inputElement of form.querySelectorAll('[name]')) {
    checkRelatedInputStates(inputElement);
    if (inputElement.dataset.requestPermission) {
      inputElement.parentElement.addEventListener('click', async event => {
        if (event.target !== inputElement) {
          return;
        }
        checkRelatedInputStates(inputElement);
        if (inputElement.checked) {
          inputElement.checked = await _libPermissionsServiceJs.requestPermission(inputElement.dataset.requestPermission);
          // Programatically changing input value does not trigger input events, so save options manually
          _optionsStorageJsDefault.default.set({
            [inputElement.name]: inputElement.checked
          });
        }
      });
    }
  }
}
// Detect Chromium based Microsoft Edge for some CSS styling
if (navigator.userAgent.includes('Edg/')) {
  document.documentElement.classList.add('is-edgium');
}

},{"webextension-polyfill":"6Pxrh","./options-storage.js":"5Cca6","./repositories.js":"e4mYC","./lib/permissions-service.js":"4kKxW","./util.js":"64wup","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"6Pxrh":[function(require,module,exports) {
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
},{}],"e4mYC":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _repositoriesStorageJs = require('./repositories-storage.js');
var _repositoriesStorageJsDefault = _parcelHelpers.interopDefault(_repositoriesStorageJs);
var _optionsStorageJs = require('./options-storage.js');
var _optionsStorageJsDefault = _parcelHelpers.interopDefault(_optionsStorageJs);
var _libRepositoriesServiceJs = require('./lib/repositories-service.js');
var _libUserServiceJs = require('./lib/user-service.js');
var _utilJs = require('./util.js');
const form = document.querySelector('#repositories-form');
const button = document.querySelector('#reload-repositories');
const errorMessage = document.querySelector('#error-message');
const filterCheckbox = document.querySelector('[name="filterNotifications"]');
button.addEventListener('click', () => {
  errorMessage.classList.add('hidden');
  if (!button.classList.contains('loading')) {
    init(true);
  }
});
filterCheckbox.addEventListener('change', async () => {
  await _optionsStorageJsDefault.default.set({
    filterNotifications: filterCheckbox.checked
  });
  init();
});
async function init(update) {
  button.classList.add('loading');
  const {filterNotifications} = await _optionsStorageJsDefault.default.getAll();
  if (!filterNotifications) {
    button.classList.remove('loading');
    form.classList.add('hidden');
    return;
  }
  form.classList.remove('hidden');
  try {
    await renderCheckboxes(update);
  } catch (error) {
    _utilJs.background.error(error);
    errorMessage.textContent = `Loading repositories failed: "${error.message}"`;
    errorMessage.classList.remove('hidden');
  }
  await setupListeners();
  button.classList.remove('loading');
}
exports.default = init;
async function renderCheckboxes(update) {
  const tree = await _libRepositoriesServiceJs.listRepositories(update);
  const {login: user} = await _libUserServiceJs.getUser(update);
  const html = Object.keys(tree).sort((a, b) => a === user ? -1 : a.localeCompare(b)).map(org => getListMarkup(org, tree[org])).join('\n');
  const parsed = new DOMParser().parseFromString(`<div class="repos">${html}</div>`, 'text/html');
  const wrapper = document.querySelector('.repo-wrapper');
  if (wrapper.firstChild) {
    wrapper.firstChild.remove();
  }
  wrapper.append(parsed.body.firstChild);
}
function getListMarkup(owner, repositories) {
  const repos = Object.keys(repositories);
  const list = repos.sort((a, b) => a.localeCompare(b)).map(repository => {
    return `
				<li>
					<label>
						<input type="checkbox" data-owner="${owner}" name="${repository}"
							${repositories[repository] ? 'checked' : ''}>
						${repository}
					</label>
				</li>
			`;
  }).join('\n');
  return `
		<details>
			<summary>
				<label class="${owner}">
					<input type="checkbox" name="${owner}" />
					${owner} <span class="count small">(${repos.length})</span>
				</label>
			</summary>

			<ul>${list}</ul>
		</details>
	`;
}
function dispatchEvent() {
  // Needs to be called manually - due to the incompatible data structure
  form.dispatchEvent(new CustomEvent('options-sync:form-synced', {
    bubbles: true
  }));
}
async function setupListeners() {
  const wrapper = document.querySelector('.repo-wrapper');
  for (const ownerCheckbox of wrapper.querySelectorAll('[name]:not([data-owner])')) {
    checkState(ownerCheckbox);
    ownerCheckbox.addEventListener('click', async evt => {
      const {name: owner, checked} = evt.target;
      let options = {};
      for (const childInput of wrapper.querySelectorAll(`[data-owner="${owner}"]`)) {
        childInput.checked = checked;
        options = Object.assign({}, options, {
          [childInput.name]: checked
        });
      }
      checkState(ownerCheckbox);
      _repositoriesStorageJsDefault.default.set({
        [owner]: options
      });
      dispatchEvent();
    });
  }
  for (const repositoryCheckbox of wrapper.querySelectorAll('[data-owner]')) {
    repositoryCheckbox.addEventListener('click', async evt => {
      const {name: repository, checked, dataset: {owner}} = evt.target;
      const stored = await _repositoriesStorageJsDefault.default.getAll();
      checkState(wrapper.querySelector(`[name="${owner}"]`));
      _repositoriesStorageJsDefault.default.set({
        [owner]: Object.assign(stored[owner], {
          [repository]: checked
        })
      });
      dispatchEvent();
    });
  }
}
function checkState(element) {
  const qs = `[data-owner="${element.name}"]`;
  const allCheckboxesCount = document.querySelectorAll(qs).length;
  const checkedCount = document.querySelectorAll(`${qs}:checked`).length;
  element.checked = checkedCount === allCheckboxesCount;
  element.indeterminate = checkedCount > 0 && !element.checked;
  element.parentElement.querySelector('.count').textContent = `(${checkedCount}/${allCheckboxesCount})`;
  return element;
}

},{"./repositories-storage.js":"1abYf","./options-storage.js":"5Cca6","./lib/repositories-service.js":"53hQS","./lib/user-service.js":"6PkvY","./util.js":"64wup","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"1abYf":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _webextOptionsSync = require('webext-options-sync');
var _webextOptionsSyncDefault = _parcelHelpers.interopDefault(_webextOptionsSync);
const repositoriesStorage = new _webextOptionsSyncDefault.default({
  storageName: 'repositories',
  defaults: {}
});
exports.default = repositoriesStorage;

},{"webext-options-sync":"22Sdi","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"53hQS":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getRepositories", function () {
  return getRepositories;
});
_parcelHelpers.export(exports, "listRepositories", function () {
  return listRepositories;
});
var _utilJs = require('../util.js');
var _repositoriesStorageJs = require('../repositories-storage.js');
var _repositoriesStorageJsDefault = _parcelHelpers.interopDefault(_repositoriesStorageJs);
var _apiJs = require('./api.js');
async function getRepositories(repos = [], parameters = {}) {
  parameters = {
    page: '1',
    per_page: '100',
    // eslint-disable-line camelcase
    ...parameters
  };
  const {headers, json} = await _apiJs.makeApiRequest('/user/subscriptions', parameters);
  repos = [...repos, ...json];
  const {next} = _utilJs.parseLinkHeader(headers.get('Link'));
  if (!next) {
    return repos;
  }
  const {searchParams} = new URL(next);
  return getRepositories(repos, {
    page: searchParams.get('page'),
    per_page: searchParams.get('per_page')
  });
}
async function listRepositories(update) {
  const stored = await _repositoriesStorageJsDefault.default.getAll();
  const tree = stored;
  if (update || !tree || Object.keys(tree).length <= 0) {
    const fetched = await getRepositories();
    /*eslint-disable camelcase*/
    for (const {full_name} of fetched) {
      const {owner, repository} = _utilJs.parseFullName(full_name);
      tree[owner] = tree[owner] || ({});
      tree[owner][repository] = Boolean(stored && stored[owner] && stored[owner][repository]);
    }
    /*eslint-enable camelcase*/
    await _repositoriesStorageJsDefault.default.set(tree);
  }
  return tree;
}

},{"../util.js":"64wup","../repositories-storage.js":"1abYf","./api.js":"6v60q","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"64wup":[function(require,module,exports) {
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

},{"../options-storage.js":"5Cca6","../util.js":"64wup","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"6PkvY":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getUser", function () {
  return getUser;
});
var _apiJs = require('./api.js');
var _localStoreJs = require('./local-store.js');
var _localStoreJsDefault = _parcelHelpers.interopDefault(_localStoreJs);
async function getUser(update) {
  let user = await _localStoreJsDefault.default.get('user');
  if (update || !user) {
    const {json} = await _apiJs.makeApiRequest('/user');
    await _localStoreJsDefault.default.set('user', json);
    user = json;
  }
  return user;
}

},{"./api.js":"6v60q","./local-store.js":"55Zbq","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"55Zbq":[function(require,module,exports) {
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

},{"webextension-polyfill":"6Pxrh","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}],"4kKxW":[function(require,module,exports) {
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

},{"webextension-polyfill":"6Pxrh","@parcel/transformer-js/lib/esmodule-helpers.js":"01MLZ"}]},["LnJSS"], "LnJSS", "parcelRequire427e")

