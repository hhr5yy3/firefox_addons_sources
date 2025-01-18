/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 675:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.12.0 - Tue May 14 2024 18:01:29 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
    throw new Error("This script should only be loaded in a browser extension.");
  }
  if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";

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
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
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
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
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
            return prop in target || prop in cache;
          },
          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }
            if (!(prop in target)) {
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
            if (prop in cache) {
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
      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */
        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {} /* wrappers */, {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      });
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
      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
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
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
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

    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = globalThis.browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/.pnpm/webextension-polyfill@0.12.0/node_modules/webextension-polyfill/dist/browser-polyfill.js
var browser_polyfill = __webpack_require__(675);
var browser_polyfill_default = /*#__PURE__*/__webpack_require__.n(browser_polyfill);
;// ./src/contentScript/injectedUI/encoding.ts
const textDecoder = new TextDecoder();
const decodeASCIIString = (m) => textDecoder.decode(new Uint8Array(JSON.parse(`[${atob(m)}]`)));

;// ./src/contentScript/injectedUI/constants.ts
const draggableElementSuffix = "-dragging-header";
const draggableMinWidth = 150;
const draggableMinMargin = 5;
const contentPopupViewId = "upsignon-content-popup";
const autofillContentViewId = "upsignon-autofill-content";
const autofillContentSuggestionsViewId = "upsignon-autofill-content-suggestions";
const generatorButtonId = "generator-button";
const generatedPasswordViewId = "generated-password-view";
const autosaveContentViewId = "upsignon-autosave-content";
const upsignonPwdWarningClass = "upsignon-pwd-warning";

;// ./src/contentScript/injectedUI/logo.ts
function getUpSignOnLogo(size) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", size.toString());
    svg.setAttribute("height", size.toString());
    svg.setAttribute("viewBox", "0 0 140 140");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    const disk = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    disk.setAttribute("fill", "rgb(0,171,169)");
    disk.setAttribute("cx", "70");
    disk.setAttribute("cy", "70");
    disk.setAttribute("r", "70");
    svg.appendChild(disk);
    const shapeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    shapeSvg.setAttribute("fill", "white");
    shapeSvg.setAttribute("x", "20");
    shapeSvg.setAttribute("y", "20");
    const shapePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    shapePath.setAttribute("d", "M50.00,3.00a17 17 0 1 0 0,34a17 17 0 1 0 0,-34Z M50,7a10 10 0 0 1 0,20a10 10 0 1 1 0,-20ZM24.63,29.23 A30 30 0 0 0 75.37,29.23 A3.5 3.5 20 1 1 81.95,31.63 A34 34 0 0 1 18.05,31.63 A3.5 3.5 -20 1 1 24.63,29.23Z M8.65,35.05 A47 47 0 0 0 91.35,35.05 A3.5 3.5 20 1 1 97.92,37.44 A51 51 0 0 1 2.08,37.44 A3.5 3.5 -20 1 1 8.65,35.05Z M50.00,97.00a10,10 0 0 0 0,-20a10,10 0 0 0 0,20Z");
    shapeSvg.appendChild(shapePath);
    svg.appendChild(shapeSvg);
    return svg;
}

;// ./src/contentScript/injectedUI/draggable.ts

function makeElementDraggable(elmnt) {
    var initialElementX = 0, initialElementY = 0, initialCursorX = 0, initialCursorY = 0;
    if (document.getElementById(elmnt.id + draggableElementSuffix)) {
        document.getElementById(elmnt.id + draggableElementSuffix).onmousedown =
            dragMouseDown;
    }
    else {
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        initialCursorX = e.clientX;
        initialCursorY = e.clientY;
        initialElementX = elmnt.offsetLeft;
        initialElementY = elmnt.offsetTop;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        var newX = Math.min(Math.max(draggableMinMargin, initialElementX + e.clientX - initialCursorX), window.innerWidth - draggableMinWidth - draggableMinMargin);
        var newY = Math.min(Math.max(draggableMinMargin, initialElementY + e.clientY - initialCursorY), window.innerHeight - 20 - draggableMinMargin);
        elmnt.style.left = newX + "px";
        elmnt.style.top = newY + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
const _isMouseOverElement = (dimensions, cursorX, cursorY) => {
    return (dimensions.left <= cursorX &&
        dimensions.right >= cursorX &&
        dimensions.top <= cursorY &&
        dimensions.bottom >= cursorY);
};
var curMouseX = 0;
var curMouseY = 0;
document.body.addEventListener("mousemove", (ev) => {
    curMouseX = ev.clientX;
    curMouseY = ev.clientY;
});
const moveOutOfMouse = (element) => {
    if (element == null)
        return;
    var dimensions = element === null || element === void 0 ? void 0 : element.getBoundingClientRect();
    if (_isMouseOverElement(dimensions, curMouseX, curMouseY)) {
        element.style.left = draggableMinMargin + "px";
        dimensions = element === null || element === void 0 ? void 0 : element.getBoundingClientRect();
        if (_isMouseOverElement(dimensions, curMouseX, curMouseY)) {
            element.style.bottom = draggableMinMargin + "px";
            dimensions = element === null || element === void 0 ? void 0 : element.getBoundingClientRect();
            if (_isMouseOverElement(dimensions, curMouseX, curMouseY)) {
                element.style.width = curMouseX - draggableMinMargin * 2 + "px";
                element.style.height = curMouseY - draggableMinMargin * 2 + "px";
            }
        }
    }
};

;// ./src/contentScript/injectedUI/contentPopup.ts





function showContentBubble() {
    const contentContainer = document.getElementById(contentPopupViewId);
    if (contentContainer) {
        contentContainer === null || contentContainer === void 0 ? void 0 : contentContainer.classList.remove("force-hide");
    }
    moveOutOfMouse(contentContainer);
}
function hideContentBubble() {
    const contentContainer = document.getElementById(contentPopupViewId);
    if (contentContainer) {
        contentContainer.classList.add("force-hide");
    }
}
function showAutofill(forceShowThisTab) {
    const contentContainer = document.getElementById(autofillContentViewId);
    if (!contentContainer)
        return;
    if (!contentContainer.lastElementChild)
        return;
    const container = document.getElementById(contentPopupViewId);
    if (forceShowThisTab || !(container === null || container === void 0 ? void 0 : container.classList.contains("show-autosave"))) {
        container === null || container === void 0 ? void 0 : container.setAttribute("data-active-tab", "autofill");
    }
    container === null || container === void 0 ? void 0 : container.classList.add("show-autofill");
    showContentBubble();
}
function hideAutofillBlock() {
    const container = document.getElementById(contentPopupViewId);
    container === null || container === void 0 ? void 0 : container.classList.remove("show-autofill");
}
function hideAutosaveBlock() {
    const container = document.getElementById(contentPopupViewId);
    container === null || container === void 0 ? void 0 : container.classList.remove("show-autosave");
}
function showAutosaveTab() {
    const container = document.getElementById(contentPopupViewId);
    container === null || container === void 0 ? void 0 : container.setAttribute("data-active-tab", "autosave");
    container === null || container === void 0 ? void 0 : container.classList.add("show-autosave");
    showContentBubble();
}
function createContentPopup() {
    if (document.getElementById(contentPopupViewId) != null)
        return;
    const mainContainer = document.createElement("div");
    mainContainer.setAttribute("id", contentPopupViewId);
    mainContainer.setAttribute("style", `
  z-index: ${Number.MAX_SAFE_INTEGER};
  top: ${draggableMinMargin}px;
  right: ${draggableMinMargin}px;
  max-height: calc(100vh - ${draggableMinMargin}px);
  min-width: ${draggableMinWidth}px;
`);
    const draggingHeader = document.createElement("div");
    draggingHeader.setAttribute("id", mainContainer.id + draggableElementSuffix);
    const logoContainer = document.createElement("div");
    logoContainer.setAttribute("style", "margin: 5px 10px;");
    logoContainer.appendChild(getUpSignOnLogo(20));
    draggingHeader.appendChild(logoContainer);
    const closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.addEventListener("click", hideContentBubble);
    draggingHeader.appendChild(closeButton);
    const contentContainer = document.createElement("div");
    contentContainer.setAttribute("style", "padding: 5px 10px;");
    const tabHeader = document.createElement("div");
    tabHeader.classList.add("tab-header");
    const autofillTab = document.createElement("div");
    autofillTab.classList.add("autofill-tab-header");
    autofillTab.innerText = browser_polyfill_default().i18n.getMessage("content_script_tab_autofill");
    tabHeader.appendChild(autofillTab);
    autofillTab.addEventListener("click", function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        showAutofill(true);
    });
    const autosaveTab = document.createElement("div");
    autosaveTab.classList.add("autosave-tab-header");
    autosaveTab.innerText = browser_polyfill_default().i18n.getMessage("content_script_tab_autosave");
    tabHeader.appendChild(autosaveTab);
    autosaveTab.addEventListener("click", function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        showAutosaveTab();
    });
    contentContainer.appendChild(tabHeader);
    const autofillContent = document.createElement("div");
    autofillContent.setAttribute("id", autofillContentViewId);
    contentContainer.appendChild(autofillContent);
    const untrustedExplanation = document.createElement("details");
    const preventInputUnfocus = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    };
    untrustedExplanation.addEventListener("mousedown", preventInputUnfocus);
    untrustedExplanation.addEventListener("mouseup", preventInputUnfocus);
    untrustedExplanation.addEventListener("click", (ev) => {
        preventInputUnfocus(ev);
        untrustedExplanation.toggleAttribute("open");
    });
    untrustedExplanation.classList.add("untrustedExplanation");
    const untrustedExplanationSummary = document.createElement("summary");
    untrustedExplanationSummary.setAttribute("style", "display: list-item;");
    const untrustedExplanationContent = document.createElement("div");
    untrustedExplanationSummary.innerText = browser_polyfill_default().i18n.getMessage("content_script_untrusted_explanation_summary");
    untrustedExplanationContent.innerText = browser_polyfill_default().i18n.getMessage("content_script_untrusted_explanation");
    untrustedExplanation.appendChild(untrustedExplanationSummary);
    untrustedExplanation.appendChild(untrustedExplanationContent);
    autofillContent.appendChild(untrustedExplanation);
    const autofillContentSuggestions = document.createElement("div");
    autofillContentSuggestions.id = autofillContentSuggestionsViewId;
    autofillContent.appendChild(autofillContentSuggestions);
    const generatorButton = getPasswordGeneratorButton();
    autofillContent.appendChild(generatorButton);
    const autosaveContent = document.createElement("div");
    autosaveContent.id = autosaveContentViewId;
    contentContainer.appendChild(autosaveContent);
    mainContainer.appendChild(draggingHeader);
    mainContainer.appendChild(contentContainer);
    document.body.appendChild(mainContainer);
    showAutofill(true);
    makeElementDraggable(mainContainer);
}
function updateAutofillSuggestions(suggestionElements) {
    const contentContainer = document.getElementById(autofillContentSuggestionsViewId);
    if (!contentContainer)
        return;
    while (contentContainer.lastElementChild) {
        contentContainer.removeChild(contentContainer.lastElementChild);
    }
    for (var i = 0; i < suggestionElements.length; i++) {
        contentContainer.appendChild(suggestionElements[i]);
    }
    if (suggestionElements.length === 0) {
        hideAutofillBlock();
    }
}
function updateAutosaveSuggestions(suggestionElements) {
    const contentContainer = document.getElementById(autosaveContentViewId);
    if (!contentContainer)
        return;
    while (contentContainer.lastElementChild) {
        contentContainer.removeChild(contentContainer.lastElementChild);
    }
    for (var i = 0; i < suggestionElements.length; i++) {
        contentContainer.appendChild(suggestionElements[i]);
    }
    if (suggestionElements.length === 0) {
        hideAutosaveBlock();
    }
}
function setCanShowAutosaveTab(canShow) {
    const container = document.getElementById(contentPopupViewId);
    if (!container)
        return;
    if (canShow) {
        container.classList.add("show-autosave");
        container.setAttribute("data-active-tab", "autosave");
    }
    else {
        container.classList.remove("show-autosave");
        container.setAttribute("data-active-tab", "autofill");
    }
}
function getItemView(itemName, itemLogin, path, vaultName, vaultEmail) {
    const itemView = document.createElement("div");
    itemView.setAttribute("class", "upsignon-account-to-update-view");
    const itemElement = document.createElement("div");
    itemElement.setAttribute("class", "upsignon-account-view-name");
    itemElement.innerText = itemName;
    itemView.appendChild(itemElement);
    const itemLoginText = document.createElement("div");
    itemLoginText.innerText = itemLogin || "";
    itemLoginText.setAttribute("class", "upsignon-account-view-credential");
    itemView.appendChild(itemLoginText);
    const vaultLabel = document.createElement("div");
    vaultLabel.setAttribute("class", "upsignon-account-view-vault-name");
    vaultLabel.innerText = vaultName + (vaultEmail ? " - " + vaultEmail : "");
    itemView.appendChild(vaultLabel);
    if (path) {
        const itemPath = document.createElement("div");
        itemPath.setAttribute("class", "upsignon-account-view-vault-path");
        itemPath.innerText = path;
        itemView.appendChild(itemPath);
    }
    return itemView;
}

;// ./src/contentScript/backgroundMessaging.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const sendMessageFromScriptToBackground = (messageId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return browser_polyfill_default().runtime.sendMessage({
        msgFromContentScript: messageId,
        data,
    });
});
function requestAutofillOnPageLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("AUTO_FILL_ON_PAGE_LOAD", undefined);
    });
}
function signalAllInputsRemoved() {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("ALL_INPUTS_REMOVED", undefined);
    });
}
function generateStrongPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("GENERATE_STRONG_PASSWORD", undefined);
    });
}
function getPlaceholderCredentials() {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("GET_PLACEHOLDER_CREDENTIALS", undefined);
    });
}
function forceFillFromContentScript(vaultId, accountId) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("FORCE_FILL_FROM_CONTENT_SCRIPT", {
            vaultId,
            accountId,
        });
    });
}
function toggleAutosave(shouldAutosave) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("TOGGLE_AUTOSAVE", {
            shouldAutosave,
        });
    });
}
function togglePreventAutosaveByDefault(shouldPreventAutosaveByDefault) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("TOGGLE_AUTOSAVE_BY_DEFAULT", {
            shouldPreventAutosaveByDefault,
        });
    });
}
function selectVaultIdToCreateTo(vaultId) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("SELECT_VAULT_ID_TO_CREATE_TO", {
            vaultId,
        });
    });
}
function selectItemToUpdateInsteadOfCreation(item) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("SELECT_ITEM_TO_UPDATE_INSTEAD_OF_CREATION", { item });
    });
}
function formUpdated(formDescription, isAutofillingFromVault) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("FORM_UPDATED", {
            formDescription,
            isAutofillingFromVault,
        });
    });
}
function formSubmitted(formDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMessageFromScriptToBackground("FORM_SUBMITTED", {
            formDescription,
        });
    });
}

;// ./src/contentScript/injectedUI/passwordGenerator.ts







function getGeneratedPasswordView(randomASCIIPassword) {
    const generatedPasswordView = document.createElement("div");
    generatedPasswordView.id = generatedPasswordViewId;
    const utf8Password = decodeASCIIString(randomASCIIPassword);
    const passwordText = document.createElement("div");
    passwordText.innerText = utf8Password;
    passwordText.setAttribute("style", "cursor: pointer;");
    generatedPasswordView.appendChild(passwordText);
    const passwordCopyButton = document.createElement("div");
    passwordCopyButton.innerText = `-> ${browser_polyfill_default().i18n.getMessage("content_script_pwd_generator_copy_button")}`;
    passwordCopyButton.classList.add("upsignon-password-generator-action");
    generatedPasswordView.appendChild(passwordCopyButton);
    passwordCopyButton.addEventListener("mousedown", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    });
    passwordCopyButton.addEventListener("mouseup", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
        navigator.clipboard.writeText(utf8Password);
    });
    passwordCopyButton.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    });
    return generatedPasswordView;
}
function getPasswordGeneratorButton() {
    const passwordGeneratorContainer = document.createElement("div");
    passwordGeneratorContainer.id = generatorButtonId;
    hidePasswordGeneratorButton();
    const generatorButton = document.createElement("div");
    generatorButton.setAttribute("style", "background-color: rgb(0,171,169); padding: 10px; border-radius: 4px; cursor: pointer; color: white;");
    generatorButton.innerText = browser_polyfill_default().i18n.getMessage("content_script_generate_new_password_button");
    passwordGeneratorContainer.appendChild(generatorButton);
    generatorButton.addEventListener("mousedown", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    });
    generatorButton.addEventListener("mouseup", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
        generateStrongPassword().then((randomASCIIPassword) => {
            var _a;
            (_a = document.getElementById(generatedPasswordViewId)) === null || _a === void 0 ? void 0 : _a.remove();
            const generatedPasswordView = getGeneratedPasswordView(randomASCIIPassword);
            passwordGeneratorContainer.appendChild(generatedPasswordView);
            hidePasswordWarning();
            let someNewPasswordInputFound = false;
            for (let i = 0; i < parsedContent.inputs.length; i++) {
                const inputDesc = parsedContent.inputs[i];
                if (inputDesc.isInputTypeNewPassword) {
                    someNewPasswordInputFound = true;
                    fillInput(inputDesc.node, randomASCIIPassword, true);
                }
            }
            if (!someNewPasswordInputFound) {
                var nbFilledPasswords = 0;
                for (let i = 0; i < parsedContent.inputs.length; i++) {
                    const inputDesc = parsedContent.inputs[i];
                    if (inputDesc.isInputTypeCurrentPassword &&
                        (inputDesc.node === document.activeElement ||
                            nbFilledPasswords === 1)) {
                        fillInput(inputDesc.node, randomASCIIPassword, true);
                        nbFilledPasswords++;
                    }
                }
            }
        });
    });
    generatorButton.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    });
    return passwordGeneratorContainer;
}
function showGenerateNewPasswordBlock() {
    createContentPopup();
    showPasswordGeneratorButton();
    showAutofill(true);
}
function showPasswordGeneratorButton() {
    var _a;
    (_a = document
        .getElementById(generatorButtonId)) === null || _a === void 0 ? void 0 : _a.classList.remove("upsignon-hidden");
}
function hidePasswordGeneratorButton() {
    var _a;
    (_a = document.getElementById(generatorButtonId)) === null || _a === void 0 ? void 0 : _a.classList.add("upsignon-hidden");
}

;// ./src/backgroundAndContentScriptHelpers/encodingHelper.ts
const textEncoder = new TextEncoder();
function stringToASCII(s) {
    const bytes = textEncoder.encode(s);
    return btoa(bytes);
}
function arrayBufferToBase64(byteArray) {
    let byteString = "";
    for (let i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCharCode(byteArray[i]);
    }
    const b64 = btoa(byteString);
    return b64;
}
function base64ToArrayBuffer(base64) {
    const byteString = atob(base64);
    const buf = new ArrayBuffer(byteString.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = byteString.length; i < strLen; i++) {
        bufView[i] = byteString.charCodeAt(i);
    }
    return buf;
}

;// ./src/contentScript/injectedUI/accountView.ts
var accountView_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





function getAccountView(account) {
    const element = document.createElement("div");
    element.setAttribute("class", "upsignon-account-view");
    element.setAttribute("style", "cursor:pointer;");
    const accountName = document.createElement("div");
    accountName.setAttribute("class", "upsignon-account-view-name");
    accountName.innerText = account.name;
    element.appendChild(accountName);
    const login = account.ASCIILogin ? decodeASCIIString(account.ASCIILogin) : "";
    const hiddenPassword = "*".repeat(account.pwdLength);
    const accountCredentials = document.createElement("div");
    accountCredentials.setAttribute("class", "upsignon-account-view-credential");
    accountCredentials.innerText = `${login} - ${hiddenPassword}`;
    element.appendChild(accountCredentials);
    const accountVaultName = document.createElement("div");
    accountVaultName.setAttribute("class", "upsignon-account-view-vault-name");
    accountVaultName.innerText = account.vaultFullName;
    element.appendChild(accountVaultName);
    if (account.path) {
        const accountPath = document.createElement("div");
        accountPath.setAttribute("class", "upsignon-account-view-vault-path");
        accountPath.innerText = account.path;
        element.appendChild(accountPath);
    }
    element.addEventListener("mouseenter", function (ev) {
        fillLogic(account.ASCIILogin, stringToASCII(hiddenPassword), true, true, false, false, "unknown");
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    });
    element.addEventListener("mouseleave", function mouseLeaveAction(ev) {
        unPrefillInputs();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    });
    element.addEventListener("mousedown", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    });
    element.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    });
    element.addEventListener("mouseup", function (ev) {
        return accountView_awaiter(this, void 0, void 0, function* () {
            if (!ev.isTrusted)
                return;
            hideAutofillBlock();
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            yield forceFillFromContentScript(account.vaultId, account.id);
        });
    });
    return element;
}

;// ./src/contentScript/pageAnalysis/uiAnalysisHelpers.ts
function isTextEditable(input) {
    var _a, _b, _c, _d;
    const readOnlyValue = (_a = input.getAttribute("readonly")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (readOnlyValue === "" || readOnlyValue === "true")
        return false;
    const disabledValue = (_b = input.getAttribute("disabled")) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    if (disabledValue === "" || disabledValue === "true")
        return false;
    const ariaHiddenValue = (_c = input.getAttribute("aria-hidden")) === null || _c === void 0 ? void 0 : _c.toLowerCase();
    if (ariaHiddenValue === "" || ariaHiddenValue === "true")
        return false;
    const ariaDisabledValue = (_d = input.getAttribute("aria-disabled")) === null || _d === void 0 ? void 0 : _d.toLowerCase();
    if (ariaDisabledValue === "" || ariaDisabledValue === "true")
        return false;
    return true;
}
function isVisibleOnPage(elem) {
    const style = getComputedStyle(elem);
    if (elem.offsetParent === null)
        return false;
    if (style.visibility !== "visible")
        return false;
    if (Number.parseFloat(style.opacity) < 0.1)
        return false;
    if (elem.offsetWidth +
        elem.offsetHeight +
        elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width ===
        0) {
        return false;
    }
    const elemCenter = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
    };
    if (elemCenter.x < 0)
        return false;
    if (elemCenter.x > document.documentElement.offsetWidth)
        return false;
    if (elemCenter.y < 0)
        return false;
    return true;
}

;// ./src/contentScript/injectedUI/icons.ts
function _initIcon(viewboxSize, className, path) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "" + viewboxSize);
    svg.setAttribute("height", "" + viewboxSize);
    svg.setAttribute("viewBox", `0 0 ${viewboxSize} ${viewboxSize}`);
    svg.setAttribute("fill", "white");
    svg.setAttribute("style", "flex-shrink: 0");
    svg.classList.add(className);
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", path);
    svg.appendChild(svgPath);
    return svg;
}
function getPwdStrongIcon() {
    return _initIcon(24, "pwdStrong", "M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M18,11.09c0,4-2.55,7.7-6,8.83 c-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12l6,2.12V11.09z M8.82,10.59L7.4,12l3.54,3.54l5.66-5.66l-1.41-1.41l-4.24,4.24L8.82,10.59z");
}
function getPwdMediumIcon() {
    return _initIcon(24, "pwdMedium", "M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M18,11.09c0,4-2.55,7.7-6,8.83 c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6,2.25V11.09z M11,14h2v2h-2z M11,7h2v5h-2z");
}
function getPwdWeakIcon() {
    return _initIcon(24, "pwdWeak", "M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M18,11.09c0,4-2.55,7.7-6,8.83 c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6,2.25V11.09z M9.91,8.5L8.5,9.91L10.59,12L8.5,14.09l1.41,1.41L12,13.42l2.09,2.08 l1.41-1.41L13.42,12l2.08-2.09L14.09,8.5L12,10.59L9.91,8.5z");
}
function getPwdUnknownIcon() {
    return _initIcon(24, "pwdWeak", "M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M18,11.09c0,4-2.55,7.7-6,8.83 c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6,2.25V11.09z");
}
function getCloseIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("fill", "white");
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z");
    svg.appendChild(svgPath);
    return svg;
}

;// ./src/contentScript/autofill.ts
var autofill_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










function inputListenerCallback(withPasswordGenerator) {
    return autofill_awaiter(this, void 0, void 0, function* () {
        const creds = yield getPlaceholderCredentials();
        addAutofillContentAndShow(creds, withPasswordGenerator);
    });
}
let inputsThatWerePrefilled = [];
function preFillInput(inputNode, value) {
    if (inputNode.value != value) {
        if (!inputsThatWerePrefilled.find((itwp) => itwp.node === inputNode)) {
            inputsThatWerePrefilled.push({
                node: inputNode,
                previousValue: inputNode.value,
            });
        }
        else {
            inputsThatWerePrefilled = inputsThatWerePrefilled.map((itwp) => {
                if (itwp.node === inputNode) {
                    return Object.assign(Object.assign({}, itwp), { previousValue: inputNode.value });
                }
                else {
                    return itwp;
                }
            });
        }
        inputNode.value = value;
    }
}
function unPrefillInputs() {
    inputsThatWerePrefilled.forEach((prefillObject) => {
        prefillObject.node.value = prefillObject.previousValue;
    });
    inputsThatWerePrefilled = [];
}
function fillInput(inputNode, ASCIIValue, dispatchEvents) {
    if (!ASCIIValue)
        return;
    const value = decodeASCIIString(ASCIIValue);
    if (dispatchEvents) {
        unPrefillInputs();
        inputNode.value = value;
        inputNode.focus();
        inputNode.dispatchEvent(new InputEvent("input", { data: value, bubbles: true }));
        inputNode.dispatchEvent(new InputEvent("change", { data: value, bubbles: true }));
        inputNode.blur();
    }
    else {
        preFillInput(inputNode, value);
    }
}
function fillLogic(ASCIILogin, ASCIIPassword, forceFillIfNonEmpty, laxLoginFieldDetection, isPageLoadFillRequest, dispatchEvents, passwordStrength) {
    if (self.origin == "null") {
        console.log("sandboxed page, autofill disabled");
        return;
    }
    const firstCurrentPasswordInputIndex = parsedContent.inputs.findIndex((input) => input.isInputTypeCurrentPassword && input.isTextEditableAndVisibleOnPage) ||
        parsedContent.inputs.findIndex((input) => input.isInputTypeCurrentPassword);
    const firstNewPasswordInputIndex = parsedContent.inputs.findIndex((input) => input.isInputTypeNewPassword && input.isTextEditableAndVisibleOnPage) ||
        parsedContent.inputs.findIndex((input) => input.isInputTypeNewPassword);
    const firstPasswordInputIndex = firstCurrentPasswordInputIndex >= 0
        ? firstCurrentPasswordInputIndex
        : firstNewPasswordInputIndex;
    const hasAtLeastOnePasswordInput = parsedContent.inputs.some((input) => input.isInputTypeCurrentPassword || input.isInputTypeNewPassword);
    for (let i = 0; i < parsedContent.inputs.length; i++) {
        const input = parsedContent.inputs[i];
        if ((input.isInputTypeCurrentPassword || input.isInputTypeNewPassword) &&
            i !== firstPasswordInputIndex) {
            continue;
        }
        const inputNode = input.node;
        if (!!inputNode.value && !forceFillIfNonEmpty) {
            continue;
        }
        if (isPageLoadFillRequest && input.hasBeenAutofilledOnce) {
            continue;
        }
        if (!isTextEditable(inputNode)) {
            continue;
        }
        if (!isVisibleOnPage(inputNode)) {
            continue;
        }
        if ((input.isInputTypeCurrentPassword || input.isInputTypeNewPassword) &&
            !!ASCIIPassword) {
            input.isAutofillingFromVault = true;
            fillInput(inputNode, ASCIIPassword, dispatchEvents);
            showPasswordWarning(inputNode, passwordStrength);
            if (isPageLoadFillRequest) {
                input.hasBeenAutofilledOnce = true;
            }
        }
        else if ((input.isInputTypeLogin ||
            (input.isInputTypeLoginLax &&
                (laxLoginFieldDetection || hasAtLeastOnePasswordInput))) &&
            !!ASCIILogin) {
            input.isAutofillingFromVault = true;
            fillInput(inputNode, ASCIILogin, dispatchEvents);
            if (isPageLoadFillRequest) {
                input.hasBeenAutofilledOnce = true;
            }
        }
    }
}
function showPasswordWarning(inputElement, strength) {
    if (strength === "strong" || strength === "unknown" || strength === null) {
        return;
    }
    hidePasswordWarning();
    const rect = inputElement.getBoundingClientRect();
    const warningX = rect.left + window.scrollX;
    const warningY = rect.bottom + window.scrollY + 2;
    const warningW = Math.max(100, rect.width);
    const warning = document.createElement("div");
    warning.classList.add(upsignonPwdWarningClass);
    warning.setAttribute("style", `position: absolute;
    box-sizing: border-box;
    background-color: ${strength === "weak" ? "#b00020" : "#f6a400"};
    padding: 5px;
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    top: ${warningY}px;
    left: ${warningX}px;
    width: ${warningW}px;
    display: flex;
    align-items: center;`);
    warning.appendChild(strength === "weak" ? getPwdWeakIcon() : getPwdMediumIcon());
    const shieldComment = document.createElement("div");
    shieldComment.innerText = browser_polyfill_default().i18n.getMessage(strength === "weak" ? "popup_account_pwd_weak" : "popup_account_pwd_medium");
    shieldComment.setAttribute("style", "margin: 0 5px;");
    warning.appendChild(shieldComment);
    const closeIcon = getCloseIcon();
    closeIcon.setAttribute("style", "align-self: flex-start; flex-shrink: 0; cursor: pointer;");
    closeIcon.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        ev.stopPropagation();
        document.body.removeChild(warning);
    });
    warning.appendChild(closeIcon);
    document.body.appendChild(warning);
    setTimeout(() => {
        document.body.removeChild(warning);
    }, 6000);
}
function hidePasswordWarning() {
    const nodes = document.getElementsByClassName(upsignonPwdWarningClass);
    for (let i = 0; i < nodes.length; i++) {
        document.body.removeChild(nodes[i]);
    }
}
function tryAutoFillInputs(inputDescriptions) {
    if (inputDescriptions.length > 0) {
        requestAutofillOnPageLoad();
    }
}
function addAutofillContentAndShow(matchingCredentials, withPasswordGenerator) {
    const listOfChildren = [];
    if (window.location.href.indexOf("https://") === -1) {
        const isInAuthorizedInsecureList = matchingCredentials === null || matchingCredentials === void 0 ? void 0 : matchingCredentials.some((ac) => ac.isAuthorizedInsecureUrl);
        if (!isInAuthorizedInsecureList) {
            const insecureWarning = document.createElement("div");
            insecureWarning.setAttribute("style", "color:red; margin-bottom: 10px; text-align:center;");
            insecureWarning.innerText = browser_polyfill_default().i18n.getMessage("content_script_insecure_page");
            listOfChildren.push(insecureWarning);
        }
    }
    matchingCredentials === null || matchingCredentials === void 0 ? void 0 : matchingCredentials.forEach((account) => {
        listOfChildren.push(getAccountView(account));
    });
    createContentPopup();
    updateAutofillSuggestions(listOfChildren);
    if (withPasswordGenerator) {
        showPasswordGeneratorButton();
    }
    else {
        hidePasswordGeneratorButton();
    }
    if (listOfChildren.length > 0 || withPasswordGenerator) {
        showAutofill(false);
    }
}
var nodesWithFocus = [];
function _rememberFocusedNode(node) {
    if (nodesWithFocus.indexOf(node) === -1) {
        nodesWithFocus.push(node);
    }
}
function _rememberUnfocusedNode(node) {
    nodesWithFocus = nodesWithFocus.filter((n) => n !== node);
}
function _hasSomeNodeFocused() {
    return nodesWithFocus.length > 0;
}
function registerAutofillListener(inputDescription) {
    if (inputDescription.isInputTypeLogin) {
        inputDescription.node.addEventListener("focus", () => {
            _rememberFocusedNode(inputDescription.node);
            inputListenerCallback(false);
        });
        inputDescription.node.addEventListener("click", () => {
            inputListenerCallback(false);
        });
        inputDescription.node.addEventListener("blur", () => {
            _rememberUnfocusedNode(inputDescription.node);
            if (!_hasSomeNodeFocused()) {
                hideAutofillBlock();
            }
        });
    }
    else if (inputDescription.isInputTypeCurrentPassword) {
        inputDescription.node.addEventListener("focus", () => {
            _rememberFocusedNode(inputDescription.node);
            inputListenerCallback(true);
        });
        inputDescription.node.addEventListener("click", () => {
            inputListenerCallback(true);
        });
        inputDescription.node.addEventListener("blur", () => {
            _rememberUnfocusedNode(inputDescription.node);
            if (!_hasSomeNodeFocused()) {
                hideAutofillBlock();
            }
        });
    }
    else if (inputDescription.isInputTypeNewPassword) {
        inputDescription.node.addEventListener("focus", () => {
            _rememberFocusedNode(inputDescription.node);
            showGenerateNewPasswordBlock();
        });
        inputDescription.node.addEventListener("click", showGenerateNewPasswordBlock);
        inputDescription.node.addEventListener("blur", () => {
            _rememberUnfocusedNode(inputDescription.node);
            if (!_hasSomeNodeFocused()) {
                hideAutofillBlock();
            }
        });
    }
}

;// ./src/contentScript/injectedUI/autosaveBubble.ts
var autosaveBubble_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function showAutosaveBubble(data) {
    const unlockedVaults = (data === null || data === void 0 ? void 0 : data.unlockedVaults) || [];
    const vaultIdToSaveTo = data === null || data === void 0 ? void 0 : data.vaultIdToSaveTo;
    const itemToUpdate = data === null || data === void 0 ? void 0 : data.itemToUpdate;
    const shouldPreventAutosave = data === null || data === void 0 ? void 0 : data.shouldPreventAutosave;
    const shouldPreventAutosaveByDefault = data === null || data === void 0 ? void 0 : data.shouldPreventAutosaveByDefaultOnPage;
    const itemsThatCouldMatch = data === null || data === void 0 ? void 0 : data.itemsThatCouldMatch;
    const selectedItemToUpdate = data === null || data === void 0 ? void 0 : data.selectedItemToUpdate;
    const listOfChildren = [];
    if (unlockedVaults.length === 0) {
        const explanation = document.createElement("div");
        explanation.setAttribute("style", "margin: 10px 0;");
        explanation.innerText = browser_polyfill_default().i18n.getMessage("content_script_cannot_autosave");
        listOfChildren.push(explanation);
    }
    else {
        const creationContainer = document.createElement("div");
        if (shouldPreventAutosave) {
            creationContainer.setAttribute("style", "display:none;");
        }
        const updateContainer = document.createElement("div");
        const shouldSaveContainer = document.createElement("div");
        shouldSaveContainer.classList.add("upsignon-should-save-container");
        const shouldSaveItem = document.createElement("div");
        shouldSaveItem.setAttribute("class", "upsignon-should-save");
        shouldSaveContainer.appendChild(shouldSaveItem);
        const shouldSaveSwitchContainer = document.createElement("div");
        shouldSaveSwitchContainer.classList.add("upsignon-switch");
        const shouldSaveCheckbox = document.createElement("input");
        shouldSaveCheckbox.type = "checkbox";
        if (!shouldPreventAutosave) {
            shouldSaveCheckbox.checked = true;
        }
        const shouldSaveSlider = document.createElement("span");
        shouldSaveSlider.classList.add("upsignon-slider");
        shouldSaveSwitchContainer.appendChild(shouldSaveCheckbox);
        shouldSaveSwitchContainer.appendChild(shouldSaveSlider);
        const shouldSaveText = document.createElement("span");
        shouldSaveText.innerText = browser_polyfill_default().i18n.getMessage("content_script_should_autosave");
        shouldSaveItem.appendChild(shouldSaveText);
        shouldSaveItem.appendChild(shouldSaveSwitchContainer);
        shouldSaveItem.addEventListener("mousedown", function (ev) {
            return autosaveBubble_awaiter(this, void 0, void 0, function* () {
                ev.preventDefault();
                ev.stopPropagation();
                const willBeChecked = !shouldSaveCheckbox.checked;
                shouldSaveCheckbox.checked = willBeChecked;
                if (!willBeChecked) {
                    creationContainer.setAttribute("style", "display: none;");
                }
                else {
                    creationContainer.setAttribute("style", "");
                }
                yield toggleAutosave(willBeChecked);
            });
        });
        listOfChildren.push(shouldSaveContainer);
        const shouldPreventAutosaveByDefaultContainer = document.createElement("div");
        shouldPreventAutosaveByDefaultContainer.classList.add("upsignon-should-save-by-default-container");
        const shouldPreventAutosaveByDefaultCheckbox = document.createElement("input");
        shouldPreventAutosaveByDefaultCheckbox.type = "checkbox";
        if (shouldPreventAutosaveByDefault) {
            shouldPreventAutosaveByDefaultCheckbox.checked = true;
        }
        const shouldPreventAutosaveByDefaultText = document.createElement("span");
        shouldPreventAutosaveByDefaultText.innerText = browser_polyfill_default().i18n.getMessage("content_script_should_autosave_by_default");
        shouldPreventAutosaveByDefaultContainer.appendChild(shouldPreventAutosaveByDefaultCheckbox);
        shouldPreventAutosaveByDefaultContainer.appendChild(shouldPreventAutosaveByDefaultText);
        const onClick = function (ev) {
            return autosaveBubble_awaiter(this, void 0, void 0, function* () {
                ev.preventDefault();
                ev.stopPropagation();
                ev.stopImmediatePropagation();
                const willBeChecked = !shouldPreventAutosaveByDefaultCheckbox.checked;
                shouldPreventAutosaveByDefaultCheckbox.checked = willBeChecked;
                yield togglePreventAutosaveByDefault(willBeChecked);
            });
        };
        shouldPreventAutosaveByDefaultCheckbox.addEventListener("click", onClick);
        shouldPreventAutosaveByDefaultContainer.addEventListener("mousedown", onClick);
        listOfChildren.push(shouldPreventAutosaveByDefaultContainer);
        if (itemToUpdate) {
            const titleNode = document.createElement("div");
            titleNode.classList.add("autosave-subtitle");
            titleNode.innerText = browser_polyfill_default().i18n.getMessage("content_script_update_item_title");
            updateContainer.appendChild(titleNode);
            const vault = unlockedVaults.find((v) => v.id === vaultIdToSaveTo);
            if (!vault)
                return;
            const itemView = getItemView(itemToUpdate.name, itemToUpdate.login, itemToUpdate.path, (vault.bankName || vault.name), vault.userEmail || null);
            updateContainer.appendChild(itemView);
        }
        else {
            const titleNode = document.createElement("div");
            titleNode.classList.add("autosave-subtitle");
            titleNode.innerText = browser_polyfill_default().i18n.getMessage("content_script_create_item_title");
            creationContainer.appendChild(titleNode);
            unlockedVaults.forEach((v) => {
                const vaultElement = document.createElement("div");
                vaultElement.classList.add("upsignon-vault-to-save-to");
                const vaultRadioCheck = document.createElement("input");
                vaultRadioCheck.type = "radio";
                vaultRadioCheck.name = "upsignon-choice";
                vaultRadioCheck.classList.add("upsignon-radio");
                if (selectedItemToUpdate == null && vaultIdToSaveTo === v.id) {
                    vaultRadioCheck.checked = true;
                }
                const vaultLabel = document.createElement("span");
                vaultLabel.innerText = (v.bankName ? v.bankName + " - " + v.userEmail : v.name);
                vaultElement.appendChild(vaultRadioCheck);
                vaultElement.appendChild(vaultLabel);
                vaultElement.addEventListener("click", function (ev) {
                    return autosaveBubble_awaiter(this, void 0, void 0, function* () {
                        for (var el of document.querySelectorAll("input[name=upsignon-choice]")) {
                            el.setAttribute("checked", "false");
                        }
                        vaultRadioCheck.checked = true;
                        yield selectVaultIdToCreateTo(v.id);
                    });
                });
                creationContainer.appendChild(vaultElement);
            });
            if (itemsThatCouldMatch.length > 0) {
                const updateTitleNode = document.createElement("div");
                updateTitleNode.classList.add("autosave-subtitle");
                updateTitleNode.innerText = browser_polyfill_default().i18n.getMessage("content_script_update_item_title");
                creationContainer.appendChild(updateTitleNode);
                itemsThatCouldMatch.forEach((item) => {
                    const itemElement = document.createElement("div");
                    itemElement.classList.add("upsignon-item-to-update");
                    const itemRadioCheck = document.createElement("input");
                    itemRadioCheck.type = "radio";
                    itemRadioCheck.name = "upsignon-choice";
                    itemRadioCheck.classList.add("upsignon-radio");
                    if ((selectedItemToUpdate === null || selectedItemToUpdate === void 0 ? void 0 : selectedItemToUpdate.id) === item.id) {
                        itemRadioCheck.checked = true;
                    }
                    const itemView = getItemView(item.name, item.login, item.path, item.vaultName, item.vaultEmail);
                    itemElement.appendChild(itemRadioCheck);
                    itemElement.appendChild(itemView);
                    itemElement.addEventListener("click", function (ev) {
                        return autosaveBubble_awaiter(this, void 0, void 0, function* () {
                            for (var el of document.querySelectorAll("input[name=upsignon-choice]")) {
                                el.setAttribute("checked", "false");
                            }
                            itemRadioCheck.checked = true;
                            yield selectItemToUpdateInsteadOfCreation(item);
                        });
                    });
                    creationContainer.appendChild(itemElement);
                });
            }
            if (data.hasMatchingNotOwnedSharedAccount) {
                const warning = document.createElement("div");
                warning.classList.add("matching-not-owned-account-warning");
                warning.innerText = browser_polyfill_default().i18n.getMessage("matching_not_owned_account_warning");
                creationContainer.appendChild(warning);
            }
        }
        listOfChildren.push(updateContainer);
        listOfChildren.push(creationContainer);
    }
    updateAutosaveSuggestions(listOfChildren);
}

;// ./src/contentScript/submitLabels.ts
const possibleLabels = [
    "suivant",
    "connexion",
    "se connecter",
    "s'identifier",
    "identification",
    "accéder à mon compte",
    "entrer",
    "accès",
    "valider",
    "envoyer",
    "confirmer",
    "changer de mot de passe",
    "mettre à jour le mot de passe",
    "modifier le mot de passe",
    "réinitialiser le mot de passe",
    "enregistrer le nouveau mot de passe",
    "soumettre",
    "continuer",
    "next",
    "Log in",
    "Sign in",
    "Login",
    "Sign up",
    "Enter",
    "Access my account",
    "Submit",
    "Send",
    "Confirm",
    "Change password",
    "Update password",
    "Reset password",
    "Save new password",
    "Modify password",
    "Proceed",
    "Continue",
    "Accedi",
    "Entra",
    "Logga in",
    "Connetti",
    "Accesso",
    "Invio",
    "Conferma",
    "Cambia password",
    "Aggiorna password",
    "Reimposta password",
    "Salva nuova password",
    "Modifica password",
    "Prosegui",
    "Continua",
    "Iniciar sesión",
    "Entrar",
    "Acceder",
    "Conectarse",
    "Ingresar",
    "Enviar",
    "Confirmar",
    "Cambiar contraseña",
    "Actualizar contraseña",
    "Restablecer contraseña",
    "Guardar nueva contraseña",
    "Modificar contraseña",
    "Continuar",
    "Proceder",
    "Anmelden",
    "Einloggen",
    "Login",
    "Zugang",
    "Senden",
    "Bestätigen",
    "Passwort ändern",
    "Passwort aktualisieren",
    "Passwort zurücksetzen",
    "Neues Passwort speichern",
    "Passwort bearbeiten",
    "Weiter",
    "Fortfahren",
].map((t) => t.toLowerCase());

;// ./src/contentScript/autosave.ts
var autosave_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function forceFakeFormUpdate() {
    if (parsedContent.inputs.length > 0) {
        const inputNode = parsedContent.inputs[0].node;
        inputNode.dispatchEvent(new InputEvent("input", { data: inputNode.value, bubbles: true }));
    }
}
function getParentFormDescription(node) {
    const parentFormNode = node.form || "root";
    let parentFormDescription = parsedContent.forms.find((form) => form.node === parentFormNode);
    return parentFormDescription;
}
function onInputAutosaveListener(ev) {
    return autosave_awaiter(this, void 0, void 0, function* () {
        if (ev.isTrusted) {
            hidePasswordWarning();
        }
        const inputTarget = ev.target;
        const inputDescription = parsedContent.inputs.find((inputDesc) => inputDesc.node == inputTarget);
        if (!inputDescription)
            return;
        const parentFormDescription = getParentFormDescription(inputTarget);
        if (!parentFormDescription)
            return;
        if (inputDescription.isInputTypeCurrentPassword) {
            parentFormDescription.currentPassword = inputTarget.value;
        }
        else if (inputDescription.isInputTypeNewPassword) {
            parentFormDescription.newPassword = inputTarget.value;
        }
        else if (inputDescription.isInputTypeLogin) {
            parentFormDescription.login = inputTarget.value;
        }
        else if (inputDescription.isInputTypeLoginLax) {
            parentFormDescription.loginLax = inputTarget.value;
        }
        parentFormDescription.hasBeenSubmitted = false;
        let parentFormDescriptionWithoutNode = Object.assign({}, parentFormDescription);
        delete parentFormDescriptionWithoutNode.node;
        const bestVaultAndItemToSaveTo = yield formUpdated(parentFormDescriptionWithoutNode, inputDescription.isAutofillingFromVault || false);
        inputDescription.isAutofillingFromVault = false;
        if (!parentFormDescriptionWithoutNode.currentPassword &&
            !parentFormDescriptionWithoutNode.newPassword &&
            !parentFormDescriptionWithoutNode.login) {
            setCanShowAutosaveTab(false);
        }
        else if (bestVaultAndItemToSaveTo) {
            if (bestVaultAndItemToSaveTo.itemToUpdate &&
                !bestVaultAndItemToSaveTo.itemToUpdate.hasNewPassword) {
                setCanShowAutosaveTab(false);
            }
            else {
                setCanShowAutosaveTab(true);
                showAutosaveBubble(bestVaultAndItemToSaveTo);
            }
        }
        else {
            setCanShowAutosaveTab(false);
        }
    });
}
function registerInputAutosaveListener(inputNode) {
    inputNode.addEventListener("input", onInputAutosaveListener);
    inputNode.addEventListener("change", onInputAutosaveListener);
}
function isProbableSubmitterButton(button) {
    var _a, _b, _c;
    if (!isVisibleOnPage(button)) {
        return false;
    }
    const textLowerCase = (_a = button.innerText) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const matchesText = !!textLowerCase && possibleLabels.indexOf(textLowerCase) >= 0;
    if (matchesText) {
        return true;
    }
    const ariaLabelLowerCase = (_b = button.getAttribute("aria-label")) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    const matchesAriaLabel = !!ariaLabelLowerCase && possibleLabels.indexOf(ariaLabelLowerCase) >= 0;
    if (matchesAriaLabel) {
        return true;
    }
    const titleLowerCase = (_c = button.getAttribute("title")) === null || _c === void 0 ? void 0 : _c.toLowerCase();
    const matchesTitle = !!titleLowerCase && possibleLabels.indexOf(titleLowerCase) >= 0;
    if (matchesTitle) {
        return true;
    }
    return false;
}
function registerFormAutosaveListener(formDescription) {
    if (!formDescription.node || formDescription.node === "root")
        return;
    const onSubmit = () => autosave_awaiter(this, void 0, void 0, function* () {
        if (!formDescription.hasBeenSubmitted) {
            formDescription.hasBeenSubmitted = true;
            let formDescriptionWithoutNode = Object.assign({}, formDescription);
            delete formDescriptionWithoutNode.node;
            yield formSubmitted(formDescriptionWithoutNode);
        }
    });
    formDescription.node.addEventListener("submit", onSubmit);
    const submiters = Array.from(formDescription.node.querySelectorAll("[type=submit]"));
    const otherButtons = formDescription.node.querySelectorAll("button:not([type=button])");
    for (let i = 0; i < otherButtons.length; i++) {
        if (submiters.indexOf(otherButtons[i]) === -1) {
            submiters.push(otherButtons[i]);
        }
    }
    const formId = formDescription.node.getAttribute("id");
    if (formId) {
        const outsideFormSubmitButtons = document.querySelectorAll(`button[form=${formId}]`);
        for (let i = 0; i < outsideFormSubmitButtons.length; i++) {
            if (submiters.indexOf(outsideFormSubmitButtons[i]) === -1) {
                submiters.push(outsideFormSubmitButtons[i]);
            }
        }
    }
    const pageButtons = document.getElementsByTagName("button");
    for (let i = 0; i < pageButtons.length; i++) {
        const b = pageButtons[i];
        if (submiters.indexOf(b) === -1 && isProbableSubmitterButton(b)) {
            submiters.push(b);
        }
    }
    for (let i = 0; i < submiters.length; i++) {
        submiters[i].addEventListener("click", onSubmit);
        document.addEventListener("keydown", (ev) => {
            if (ev.target !== submiters[i])
                return;
            if (ev.key === "Enter" || ev.key === " " || ev.key === "Spacebar") {
                onSubmit();
            }
        });
    }
}

;// ./src/contentScript/pageAnalysis/domAnalysisHelper.ts

function hasMatchOnTagsOrContent(inputNode, regex, checkForPassword) {
    var _a, _b, _c, _d, _e, _f;
    if ((_a = inputNode.getAttribute("name")) === null || _a === void 0 ? void 0 : _a.match(regex))
        return true;
    if ((_b = inputNode.getAttribute("id")) === null || _b === void 0 ? void 0 : _b.match(regex))
        return true;
    if ((_c = inputNode.getAttribute("class")) === null || _c === void 0 ? void 0 : _c.match(regex))
        return true;
    if ((_d = inputNode.getAttribute("placeholder")) === null || _d === void 0 ? void 0 : _d.match(regex))
        return true;
    if ((_e = inputNode.getAttribute("label")) === null || _e === void 0 ? void 0 : _e.match(regex))
        return true;
    let hasLabelMatch = false;
    if (checkForPassword && ((_f = inputNode.labels) === null || _f === void 0 ? void 0 : _f.length) === 1) {
        hasLabelMatch = inputNode.labels[0].innerText.match(regex) != null;
    }
    else if (!checkForPassword && inputNode.labels) {
        for (let i = 0; i < inputNode.labels.length; i++) {
            hasLabelMatch = inputNode.labels[i].innerText.match(regex) != null;
        }
    }
    if (hasLabelMatch)
        return true;
    return false;
}
function isLoginForm(input) {
    var _a, _b, _c;
    const signinRegex = /login|signin|auth/i;
    if (window.location.pathname.match(signinRegex))
        return true;
    if (typeof input.formAction === "string" &&
        input.formAction.match(signinRegex))
        return true;
    if (typeof ((_a = input.form) === null || _a === void 0 ? void 0 : _a.action) === "string" &&
        input.form.action.match(signinRegex))
        return true;
    if (typeof ((_b = input.form) === null || _b === void 0 ? void 0 : _b.name) === "string" &&
        input.form.name.match(signinRegex))
        return true;
    if (typeof ((_c = input.form) === null || _c === void 0 ? void 0 : _c.id) === "string" && input.form.id.match(signinRegex))
        return true;
    return false;
}
function isInputNodeTypeLogin(input, lax) {
    var _a, _b;
    const type = (_a = input.getAttribute("type")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!!type &&
        type !== "undefined" &&
        type !== "null" &&
        type !== "number" &&
        type !== "tel" &&
        type !== "text" &&
        type !== "email" &&
        type !== "mail")
        return false;
    const autocomplete = (_b = input.getAttribute("autocomplete")) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    if (autocomplete === "email" || autocomplete === "username")
        return true;
    if (!lax && !isLoginForm(input))
        return false;
    if (type === "email")
        return true;
    if (hasMatchOnTagsOrContent(input, /mail|login|user|identifi|utilisateur/i, false))
        return true;
    var ariaLabelledBy = input.getAttribute("aria-labelledby");
    if (ariaLabelledBy) {
        var label = document.getElementById(ariaLabelledBy);
        if (label &&
            label.innerText.match(/mail|login|user|identifi|utilisateur/i) != null) {
            return true;
        }
    }
    return false;
}
function isInputNodeTypeCurrentPassword(input) {
    var _a, _b;
    const type = (_a = input.getAttribute("type")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!!type &&
        type !== "undefined" &&
        type !== "null" &&
        type !== "password" &&
        type !== "text")
        return false;
    const autocomplete = (_b = input.getAttribute("autocomplete")) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    if (type == "password" ||
        autocomplete === "current-password" ||
        autocomplete === "password")
        return true;
    if (hasMatchOnTagsOrContent(input, /password|passwort|kennwort|(\b|_|-)(passe|pwd|psswd)(\b|_|-)|contraseña|senha|密码|adgangskode|hasło|wachtwoord/i, true))
        return true;
    return false;
}
function isInputTypeStrictlyPassword(input) {
    var _a;
    return (((_a = input.getAttribute("type")) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "password" &&
        isTextEditable(input));
}
function isInputNodeTypeNewPassword(input) {
    var _a, _b;
    const type = (_a = input.getAttribute("type")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!!type &&
        type !== "undefined" &&
        type !== "null" &&
        type !== "password" &&
        type !== "text")
        return false;
    const autocomplete = (_b = input.getAttribute("autocomplete")) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    if ((autocomplete === null || autocomplete === void 0 ? void 0 : autocomplete.startsWith("new-password")) ||
        autocomplete === "repeat-password")
        return true;
    if (input.getAttribute("new-password") === "" ||
        input.getAttribute("new-password") === "true")
        return true;
    if (hasMatchOnTagsOrContent(input, /newPassword|new-password|newPwd|new-pwd/gi, true))
        return true;
    return false;
}
function isInputTypeStrictlyNewPassword(input) {
    var _a, _b, _c;
    return (((_a = input.getAttribute("type")) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "password" &&
        (((_b = input.getAttribute("autocomplete")) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === "new-password" ||
            ((_c = input.getAttribute("autocomplete")) === null || _c === void 0 ? void 0 : _c.toLowerCase()) ===
                "repeat-password") &&
        isTextEditable(input));
}
function filterExplicitlyHiddenInputs(inputs) {
    var _a;
    const filteredInputs = [];
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const type = (_a = input === null || input === void 0 ? void 0 : input.getAttribute("type")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (input != null && type !== "hidden") {
            filteredInputs.push(input);
        }
    }
    return filteredInputs;
}

;// ./src/contentScript/pageAnalysis/parsedContent.ts






const parsedContent = {
    inputs: [],
    forms: [],
};
const doesCachedInputNeedNewAutofill = (prev, next) => {
    const hasNewProps = prev.isInputTypeLogin != next.isInputTypeLogin ||
        prev.isInputTypeLoginLax != next.isInputTypeLoginLax ||
        prev.isInputTypeCurrentPassword != next.isInputTypeCurrentPassword ||
        prev.isInputTypeNewPassword != next.isInputTypeNewPassword ||
        prev.isTextEditableAndVisibleOnPage != next.isTextEditableAndVisibleOnPage;
    if (hasNewProps) {
        return next.isTextEditableAndVisibleOnPage;
    }
    return false;
};
const parseForms = (inputNode, parseLaxPasswordInputs) => {
    const isInputTypeNewPassword = parseLaxPasswordInputs
        ? isInputNodeTypeNewPassword(inputNode)
        : isInputTypeStrictlyNewPassword(inputNode);
    const isInputTypeCurrentPassword = !isInputTypeNewPassword &&
        (parseLaxPasswordInputs
            ? isInputNodeTypeCurrentPassword(inputNode)
            : isInputTypeStrictlyPassword(inputNode));
    const isInputTypeLogin = !isInputTypeNewPassword &&
        !isInputTypeCurrentPassword &&
        isInputNodeTypeLogin(inputNode, false);
    const isInputTypeLoginLax = !isInputTypeNewPassword &&
        !isInputTypeCurrentPassword &&
        !isInputTypeLogin &&
        isInputNodeTypeLogin(inputNode, true);
    var shouldTriggerAutofill = false;
    if (isInputTypeCurrentPassword ||
        isInputTypeNewPassword ||
        isInputTypeLogin ||
        isInputTypeLoginLax) {
        const alreadyRegisteredNodeIndex = parsedContent.inputs.findIndex((n) => n.node === inputNode);
        const isEditable = isTextEditable(inputNode);
        const isVisible = isVisibleOnPage(inputNode);
        const isTextEditableAndVisibleOnPage = isEditable && isVisible;
        const newCachedInput = {
            node: inputNode,
            isInputTypeCurrentPassword,
            isInputTypeNewPassword,
            isInputTypeLogin,
            isInputTypeLoginLax,
            isTextEditableAndVisibleOnPage,
            hasBeenAutofilledOnce: false,
        };
        if (alreadyRegisteredNodeIndex >= 0) {
            let previousCachedInput = parsedContent.inputs[alreadyRegisteredNodeIndex];
            if (doesCachedInputNeedNewAutofill(previousCachedInput, newCachedInput)) {
                shouldTriggerAutofill = true;
            }
            parsedContent.inputs[alreadyRegisteredNodeIndex] = newCachedInput;
        }
        else {
            const parentFormNode = inputNode.form || "root";
            let parentFormDescription = parsedContent.forms.find((form) => form.node === parentFormNode);
            if (!parentFormDescription) {
                const newFormLength = parsedContent.forms.push({
                    node: parentFormNode,
                    hasBeenSubmitted: false,
                });
                parentFormDescription = parsedContent.forms[newFormLength - 1];
                registerFormAutosaveListener(parentFormDescription);
            }
            if (isInputTypeCurrentPassword) {
                parentFormDescription.currentPassword = inputNode.value;
            }
            else if (isInputTypeNewPassword) {
                parentFormDescription.newPassword = inputNode.value;
            }
            else if (isInputTypeLogin) {
                parentFormDescription.login = inputNode.value;
            }
            else if (isInputTypeLoginLax) {
                parentFormDescription.loginLax = inputNode.value;
            }
            parsedContent.inputs.push(newCachedInput);
            if (isTextEditableAndVisibleOnPage) {
                shouldTriggerAutofill = true;
            }
            registerAutofillListener(newCachedInput);
            registerInputAutosaveListener(inputNode);
        }
    }
    return shouldTriggerAutofill;
};
function analysePage() {
    const allInputs = document.getElementsByTagName("input");
    let inputs = filterExplicitlyHiddenInputs(allInputs);
    const strictPwdInputs = inputs.filter((input) => isInputTypeStrictlyPassword(input));
    if (inputs.length > 20) {
        if (strictPwdInputs.length !== 1 && strictPwdInputs.length !== 2) {
            return;
        }
    }
    var shouldTriggerAutofill = false;
    let parseLaxPasswordInputs = strictPwdInputs.length === 0;
    for (let i = 0; i < inputs.length; i++) {
        const shouldTriggerAutofillForInput = parseForms(inputs[i], parseLaxPasswordInputs);
        shouldTriggerAutofill =
            shouldTriggerAutofill || shouldTriggerAutofillForInput;
    }
    if (shouldTriggerAutofill) {
        tryAutoFillInputs(parsedContent.inputs);
        shouldTriggerAutofill = false;
    }
    for (let j = 0; j < parsedContent.inputs.length; j++) {
        let nodeStillExists = false;
        for (let k = 0; k < inputs.length; k++) {
            if (inputs[k] === parsedContent.inputs[j].node) {
                nodeStillExists = true;
                break;
            }
        }
        if (!nodeStillExists) {
            parsedContent.inputs = parsedContent.inputs.filter((_, index) => index != j);
        }
    }
    if (parsedContent.inputs.length === 0) {
        hideAutofillBlock();
        hideAutosaveBlock();
        signalAllInputsRemoved();
    }
}
function contentScript() {
    analysePage();
    setInterval(() => {
        analysePage();
    }, 400);
}

;// ./src/contentScript/main.ts




function inIframe() {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return false;
    }
}
function inIframeWithSameOrigin() {
    var _a;
    try {
        return (window.self != window.top &&
            window.self.location.origin === ((_a = window.top) === null || _a === void 0 ? void 0 : _a.location.origin));
    }
    catch (e) {
        return false;
    }
}
if (!inIframe() || inIframeWithSameOrigin()) {
    window.UpSignOnConstantFunctionReferences = {
        fillLogic: fillLogic,
        forceFakeFormUpdate: forceFakeFormUpdate,
        hideAutosaveBlock: hideAutosaveBlock,
    };
    contentScript();
}

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map