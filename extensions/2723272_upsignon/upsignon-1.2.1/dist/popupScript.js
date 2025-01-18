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

;// ./src/popup/helpers/nodeUtils.ts
function hideNode(node) {
    node.style = "display:none;";
}
function showNode(node) {
    node.style = "";
}

// EXTERNAL MODULE: ./node_modules/.pnpm/webextension-polyfill@0.12.0/node_modules/webextension-polyfill/dist/browser-polyfill.js
var browser_polyfill = __webpack_require__(675);
var browser_polyfill_default = /*#__PURE__*/__webpack_require__.n(browser_polyfill);
;// ./src/backgroundAndPopupHelpers/browserStorage.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class BrowserStorage {
    static removeDeprecatedKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_polyfill_default().storage.local.remove([
                "search",
                "unfoldedItems",
                "unfoldedVaults",
            ]);
        });
    }
    static clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_polyfill_default().storage.local.clear();
            yield browser_polyfill_default().storage.session.clear();
        });
    }
    static setAuthorization(authorizationId, secretKey, isSetupComplete) {
        return browser_polyfill_default().storage.local.set({
            authorizationId,
            secretKey,
            isSetupComplete,
        });
    }
    static getAuthorization() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield browser_polyfill_default().storage.local.get([
                "authorizationId",
                "secretKey",
                "isSetupComplete",
            ]);
            return {
                authorizationId: result.authorizationId || null,
                secretKey: result.secretKey || null,
                isSetupComplete: result.isSetupComplete || null,
            };
        });
    }
    static setSetupComplete() {
        return browser_polyfill_default().storage.local.set({ isSetupComplete: true });
    }
    static clearSearch() {
        return browser_polyfill_default().storage.session.set({ search: "" });
    }
    static getSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = (yield browser_polyfill_default().storage.session.get("search"))["search"]) !== null && _a !== void 0 ? _a : "");
        });
    }
    static setSearch(s) {
        return browser_polyfill_default().storage.session.set({ search: s });
    }
    static getUnfoldedItems() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = (yield browser_polyfill_default().storage.session.get("unfoldedItems"))["unfoldedItems"]) !== null && _a !== void 0 ? _a : []);
        });
    }
    static setUnfoldedItems(nextUnfoldedItems) {
        return browser_polyfill_default().storage.session.set({ unfoldedItems: nextUnfoldedItems });
    }
    static getUnfoldedVaults() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = (yield browser_polyfill_default().storage.session.get("unfoldedVaults"))["unfoldedVaults"]) !== null && _a !== void 0 ? _a : []);
        });
    }
    static setUnfoldedVaults(nextUnfoldedVaults) {
        return browser_polyfill_default().storage.session.set({ unfoldedVaults: nextUnfoldedVaults });
    }
    static setPreventAutosaveByDefaultOnWebsite(hostname, shouldPreventAutosaveByDefault) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentDoNotSaveList = (yield browser_polyfill_default().storage.local.get(["doNotSaveList"]))["doNotSaveList"];
            if (!currentDoNotSaveList) {
                currentDoNotSaveList = [];
            }
            if (shouldPreventAutosaveByDefault) {
                if (currentDoNotSaveList.indexOf(hostname) >= 0) {
                    return;
                }
                else {
                    currentDoNotSaveList.push(hostname);
                }
            }
            else {
                currentDoNotSaveList = currentDoNotSaveList.filter((u) => u !== hostname);
            }
            return browser_polyfill_default().storage.local.set({ doNotSaveList: currentDoNotSaveList });
        });
    }
    static shouldPreventAutosaveByDefaultOnWebsite(hostname) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDoNotSaveList = (yield browser_polyfill_default().storage.local.get(["doNotSaveList"]))["doNotSaveList"];
            if (!currentDoNotSaveList)
                return false;
            return currentDoNotSaveList.indexOf(hostname) >= 0;
        });
    }
    static setShouldPreventAutosaveByDefaultForAllWebsites(shouldPreventAutosaveByDefault) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_polyfill_default().storage.local.set({
                preventAutosaveByDefault: shouldPreventAutosaveByDefault,
            });
        });
    }
    static shouldPreventAutosaveByDefaultForAllWebsites() {
        return __awaiter(this, void 0, void 0, function* () {
            const preventAutosaveByDefault = (yield browser_polyfill_default().storage.local.get(["preventAutosaveByDefault"]))["preventAutosaveByDefault"];
            return !!preventAutosaveByDefault;
        });
    }
    static getUnsavedPasswords() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = (yield browser_polyfill_default().storage.session.get("unsavedPasswords"))["unsavedPasswords"]) !== null && _a !== void 0 ? _a : []);
        });
    }
    static setUnsavedPasswords(up) {
        return browser_polyfill_default().storage.session.set({ unsavedPasswords: up });
    }
    static getTabMemory() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const cachedTabMem = yield browser_polyfill_default().storage.session.get("tabMemory");
            if (cachedTabMem)
                return ((_a = cachedTabMem["tabMemory"]) !== null && _a !== void 0 ? _a : {});
            return {};
        });
    }
    static setTabMemory(tabMem) {
        return browser_polyfill_default().storage.session.set({ tabMemory: tabMem });
    }
}

;// ./src/popup/popup/backgroundMessaging.ts
var backgroundMessaging_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const sendMessageToBackground = (messageId, data) => backgroundMessaging_awaiter(void 0, void 0, void 0, function* () {
    return browser_polyfill_default().runtime.sendMessage({ msgFromPopup: messageId, data });
});
const onMessageFromBackground = (messageId, callback) => {
    browser_polyfill_default().runtime.onMessage.addListener((message) => {
        if (message.msgFromBackgroundToPopup == messageId) {
            return callback(message.data);
        }
        return;
    });
};

;// ./src/popup/popup/browserName.ts
var browserName_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function isSafari() {
    var c = chrome;
    return (c.runtime.id === "eu.upsignon-test.UpSignOnSafari (W85N9SKBSN)" ||
        c.runtime.id === "eu.upsignon-beta.UpSignOnSafari (W85N9SKBSN)" ||
        c.runtime.id === "eu.upsignon.UpSignOnSafari (W85N9SKBSN)");
}
function getBrowserName() {
    return browserName_awaiter(this, void 0, void 0, function* () {
        var c = chrome;
        var n = navigator;
        var w = window;
        if (typeof browser !== "undefined" &&
            typeof browser.runtime.getBrowserInfo !== "undefined") {
            const declaredBrowserInfo = yield browser.runtime.getBrowserInfo();
            return declaredBrowserInfo.name;
        }
        if (n.brave && (yield n.brave.isBrave())) {
            return "Brave";
        }
        if (Object.prototype.toString.call(w.opera) == "[object Opera]") {
            return "Opera";
        }
        if (c.runtime.id === "jhglfkcppgkgenonjpoopfbobcdlffgg") {
            return "Edge";
        }
        if (c.runtime.id === "upsignon@upsignon.eu") {
            return "Firefox";
        }
        if (isSafari()) {
            return "Safari";
        }
        if (c.runtime.id === "ikddeecpbbbnfmnkldhnhjlljddnjbon") {
            return "Google Chrome";
        }
        return "Unknown browser";
    });
}

;// ./src/popup/popup/nodesHelper.ts
var nodesHelper_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





document.getElementById("app_report_issue").innerText =
    browser_polyfill_default().i18n.getMessage("app_report_issue");
var appConnectionErrorPage = document.getElementById("app_connection_error_page");
var appConnectionErrorTitle = document.getElementById("app_connection_error_title");
var appConnectionErrorDetails = document.getElementById("app_connection_error_details");
var appConnectionErrorStartAppButton = document.getElementById("app_connection_error_start_app_button");
var appConnectionErrorResetup = document.getElementById("app_connection_error_resetup");
var appConnectionErrorResetupPart1 = document.getElementById("app_connection_error_resetup_part_1");
var appConnectionErrorResetupPart2 = document.getElementById("app_connection_error_resetup_part_2");
var appConnectionErrorResetupPart3 = document.getElementById("app_connection_error_resetup_part_3");
BrowserStorage.getAuthorization().then((res) => {
    if (res.isSetupComplete) {
        appConnectionErrorResetup.classList.toggle("hidden", false);
    }
});
var resetClicCounter = 0;
appConnectionErrorResetup.addEventListener("click", () => {
    resetClicCounter++;
    if (resetClicCounter >= 7) {
        resetClicCounter = 0;
        sendMessageToBackground("RESET_EXTENSION", undefined);
        window.location.reload();
    }
});
var appConnectionErrorRefreshButton = document.getElementById("app_connection_error_refresh");
var appConnectionSetupPage = document.getElementById("app_connection_setup_page");
var appConnectionSetupTitle = document.getElementById("app_connection_setup_title");
var appConnectionSetupDetails = document.getElementById("app_connection_setup_details");
var appConnectionSetupStep1 = document.getElementById("app_connection_setup_step1");
var appConnectionSetupLink = document.getElementById("app_connection_setup_download_link");
var appConnectionSetupStep2 = document.getElementById("app_connection_setup_step2");
var appConnectionSetupButton = document.getElementById("app_connection_setup_button");
var appConnectionSetupStep2AltMethod = document.getElementById("app_connection_setup_step2_alt_method");
var appConnectionSetupStep3 = document.getElementById("app_connection_setup_step3");
var appConnectionSetupCopyCodeText = document.getElementById("app_connection_setup_copy_code");
var appConnectionSetupForm = document.getElementById("app_connection_setup_form");
var appConnectionSetupCodeInput = document.getElementById("app_connection_setup_code_input");
var appConnectionSetupCodeInputError = document.getElementById("app_connection_setup_code_input_error");
var appConnectionSetupCodeSubmitButton = document.getElementById("app_connection_setup_code_submit_btn");
var appConnectionAltMethodPage = document.getElementById("app_connection_alternative_method_page");
var appConnectionAlternativeCancelBtn = document.getElementById("app_connection_alternative_method_cancel");
var appConnectionAlternativeSubmitButton = document.getElementById("app_connection_alternative_setup_submit_btn");
var appConnectionAlternativeInputError = document.getElementById("app_connection_alternative_method_input_error");
var appConnectionAlternativeInput = document.getElementById("app_connection_alternative_method_input");
var loaderPage = document.getElementById("loader_page");
var loader = document.getElementById("loader");
var vaultListPage = document.getElementById("vault_list_page");
var searchInput = document.getElementById("vault_list_page_search_input");
var searchClearButton = document.getElementById("vault_list_page_search_clear_btn");
var vaultListPageEmpty = document.getElementById("vault_list_page_empty");
var vaultListPageList = document.getElementById("vault_list_page_list");
var pwdNotSavedContainer = document.getElementById("passwords_not_saved");
var pwdNotSavedTitle = document.getElementById("passwords_not_saved_title");
pwdNotSavedTitle.innerText = browser_polyfill_default().i18n.getMessage("passwords_not_saved_title");
var pwdNotSavedTitleRow = document.getElementById("passwords_not_saved_title_row");
pwdNotSavedTitleRow.setAttribute("title", browser_polyfill_default().i18n.getMessage("show_hide"));
pwdNotSavedTitleRow.addEventListener("click", () => {
    pwdNotSavedContainer.classList.toggle("unfolded");
});
var pwdNotSavedExplanation = document.getElementById("passwords_not_saved_explanation");
pwdNotSavedExplanation.innerText = browser_polyfill_default().i18n.getMessage("passwords_not_saved_explanation");
var pwdNotSavedList = document.getElementById("passwords_not_saved_list");
function nodesHelperMain() {
    return nodesHelper_awaiter(this, void 0, void 0, function* () {
        appConnectionErrorTitle.innerText = browser_polyfill_default().i18n.getMessage("app_connection_error_title");
        appConnectionErrorDetails.innerText = browser_polyfill_default().i18n.getMessage("app_connection_error_details");
        appConnectionErrorStartAppButton.innerText = browser_polyfill_default().i18n.getMessage("app_connection_error_start_app_button");
        appConnectionErrorResetupPart1.innerText = browser_polyfill_default().i18n.getMessage("app_connection_error_resetup_part_1");
        appConnectionErrorResetupPart2.innerText = browser_polyfill_default().i18n.getMessage("app_connection_error_resetup_part_2");
        appConnectionErrorResetupPart3.innerText = browser_polyfill_default().i18n.getMessage("app_connection_error_resetup_part_3");
        appConnectionErrorRefreshButton.innerText = browser_polyfill_default().i18n.getMessage("app_connection_error_refresh");
        appConnectionSetupTitle.innerText = browser_polyfill_default().i18n.getMessage("app_connection_setup_title");
        appConnectionSetupDetails.innerText = browser_polyfill_default().i18n.getMessage("app_connection_setup_details");
        appConnectionSetupStep1.innerText = browser_polyfill_default().i18n.getMessage("app_connection_setup_step1");
        appConnectionSetupLink.innerText = browser_polyfill_default().i18n.getMessage("app_connection_setup_download_link_text");
        appConnectionSetupLink.setAttribute("href", browser_polyfill_default().i18n.getMessage("app_connection_setup_download_link"));
        appConnectionSetupStep2.innerText = browser_polyfill_default().i18n.getMessage("app_connection_setup_step2");
        appConnectionSetupButton.innerText = browser_polyfill_default().i18n.getMessage("app_connection_setup_button");
        appConnectionSetupStep3.innerText = browser_polyfill_default().i18n.getMessage("app_connection_setup_step3");
        appConnectionSetupCopyCodeText.innerText = browser_polyfill_default().i18n.getMessage("app_connection_setup_copy_code");
        appConnectionSetupCodeSubmitButton.innerText = browser_polyfill_default().i18n.getMessage("app_connection_setup_code_submit_btn");
        document.getElementById("app_connection_setup_step2_alt").innerText =
            browser_polyfill_default().i18n.getMessage("app_connection_setup_step2_alt");
        document.getElementById("app_connection_setup_step2_alt_method").innerText =
            browser_polyfill_default().i18n.getMessage("app_connection_setup_step2_alt_method");
        appConnectionAlternativeCancelBtn.innerText = browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_cancel");
        document.getElementById("app_connection_alternative_method_title").innerText = browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_title");
        document.getElementById("app_connection_alternative_method_1").innerText =
            browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_1");
        document.getElementById("app_connection_alternative_method_2").innerText =
            browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_2");
        document.getElementById("app_connection_alternative_method_3").innerText =
            browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_3");
        document.getElementById("app_connection_alternative_method_4").innerText =
            browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_4");
        appConnectionAlternativeInputError.innerText = browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_input_error");
        appConnectionAlternativeSubmitButton.innerText = browser_polyfill_default().i18n.getMessage("app_connection_alternative_setup_submit_btn");
        appConnectionAlternativeInput.setAttribute("placeholder", browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_input"));
        if (isSafari()) {
            appConnectionSetupStep2.innerText =
                appConnectionSetupStep2.innerText.replace("2", "1");
            appConnectionSetupStep3.innerText =
                appConnectionSetupStep3.innerText.replace("3", "2");
        }
        else {
            showNode(appConnectionSetupStep1);
            showNode(appConnectionSetupLink);
        }
        searchInput.setAttribute("placeholder", browser_polyfill_default().i18n.getMessage("vault_list_page_search_input_placeholder"));
        vaultListPageEmpty.innerText = browser_polyfill_default().i18n.getMessage("vault_list_page_empty");
        searchInput.value = yield BrowserStorage.getSearch();
    });
}

;// ./src/popup/helpers/footer.ts
var footer_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function initFooter() {
    const manifest = browser_polyfill_default().runtime.getManifest();
    const footer = document.getElementsByTagName("footer")[0];
    footer.innerText = `${browser_polyfill_default().i18n.getMessage("footer_version")} ${manifest.version}`;
    var clicks = 0;
    var resetTimer = null;
    footer.addEventListener("click", () => footer_awaiter(this, void 0, void 0, function* () {
        clicks++;
        if (clicks >= 7) {
            clicks = 0;
            if (resetTimer) {
                clearTimeout(resetTimer);
                resetTimer = null;
            }
            sendMessageToBackground("RESET_EXTENSION", undefined);
            window.location.reload();
        }
        if (!resetTimer) {
            resetTimer = setTimeout(() => {
                clicks = 0;
                resetTimer = null;
            }, 10000);
        }
    }));
}

;// ./src/popup/popup/autosavePreference.ts
var autosavePreference_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var autosavePrefContainer = document.getElementById("autosave_pref");
var autosavePrefCheckbox = document.getElementById("autosave_pref_checkbox");
var autosavePrefTitle = document.getElementById("autosave_pref_title");
autosavePrefTitle.innerText = browser_polyfill_default().i18n.getMessage("popup_autosave_pref_title");
const updateAutosavePrefUI = (shouldAutosaveByDefault) => {
    if (shouldAutosaveByDefault) {
        autosavePrefCheckbox.setAttribute("checked", "true");
    }
    else {
        autosavePrefCheckbox.removeAttribute("checked");
    }
};
const toggleAutosavePref = () => autosavePreference_awaiter(void 0, void 0, void 0, function* () {
    const shouldPreventAutosaveByDefault = yield BrowserStorage.shouldPreventAutosaveByDefaultForAllWebsites();
    yield BrowserStorage.setShouldPreventAutosaveByDefaultForAllWebsites(!shouldPreventAutosaveByDefault);
    updateAutosavePrefUI(shouldPreventAutosaveByDefault);
});
autosavePrefContainer.addEventListener("click", toggleAutosavePref);
const initAutosavePref = () => {
    BrowserStorage.shouldPreventAutosaveByDefaultForAllWebsites().then((shouldPreventAutosaveByDefault) => {
        updateAutosavePrefUI(!shouldPreventAutosaveByDefault);
    });
};

;// ./src/popup/popup/helpers.ts
var helpers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




function showPage(pageNode) {
    for (var p of [
        loaderPage,
        appConnectionSetupPage,
        vaultListPage,
        appConnectionErrorPage,
        appConnectionAltMethodPage,
    ]) {
        if (p == pageNode) {
            showNode(p);
        }
        else {
            hideNode(p);
        }
    }
}
function removeAllChildren(node) {
    if (!node)
        return;
    while (node.hasChildNodes()) {
        node.firstChild.remove();
    }
}
function getActiveTabUrlAndId() {
    return helpers_awaiter(this, void 0, void 0, function* () {
        const tabs = yield browser_polyfill_default().tabs.query({
            active: true,
            currentWindow: true,
        });
        if (!tabs[0]) {
            return null;
        }
        return { url: tabs[0].pendingUrl || tabs[0].url, id: tabs[0].id };
    });
}
function isSearching() {
    return helpers_awaiter(this, void 0, void 0, function* () {
        const search = yield BrowserStorage.getSearch();
        return !!search;
    });
}
function isItemUnfolded(vaultId, itemId) {
    return helpers_awaiter(this, void 0, void 0, function* () {
        const unfoldedItems = yield BrowserStorage.getUnfoldedItems();
        const prefixedId = `${vaultId}.${itemId}`;
        return (unfoldedItems === null || unfoldedItems === void 0 ? void 0 : unfoldedItems.indexOf(prefixedId)) >= 0;
    });
}
function toggleItemFolding(vaultId, itemId, willBeUnfolded) {
    return helpers_awaiter(this, void 0, void 0, function* () {
        const unfoldedItems = yield BrowserStorage.getUnfoldedItems();
        const prefixedId = `${vaultId}.${itemId}`;
        const nextUnfoldedItems = (unfoldedItems === null || unfoldedItems === void 0 ? void 0 : unfoldedItems.filter((i) => i !== prefixedId)) || [];
        if (willBeUnfolded) {
            nextUnfoldedItems.push(prefixedId);
        }
        yield BrowserStorage.setUnfoldedItems(nextUnfoldedItems);
    });
}
function isVaultUnfolded(vaultId) {
    return helpers_awaiter(this, void 0, void 0, function* () {
        const unfoldedVaults = yield BrowserStorage.getUnfoldedVaults();
        return unfoldedVaults.indexOf(vaultId) >= 0;
    });
}
function toggleVaultFolding(vaultId, willBeUnfolded) {
    return helpers_awaiter(this, void 0, void 0, function* () {
        const unfoldedVaults = yield BrowserStorage.getUnfoldedVaults();
        const nextUnfoldedVaults = (unfoldedVaults === null || unfoldedVaults === void 0 ? void 0 : unfoldedVaults.filter((i) => i !== vaultId)) || [];
        if (willBeUnfolded) {
            nextUnfoldedVaults.push(vaultId);
        }
        yield BrowserStorage.setUnfoldedVaults(nextUnfoldedVaults);
    });
}

;// ./src/popup/helpers/icons.ts
function _initIcon(viewboxSize, className, path) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "" + viewboxSize);
    svg.setAttribute("height", "" + viewboxSize);
    svg.setAttribute("viewBox", `0 0 ${viewboxSize} ${viewboxSize}`);
    svg.classList.add(className);
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", path);
    svg.appendChild(svgPath);
    return svg;
}
function getUnlockedIcon() {
    return _initIcon(768, "unlockedIcon", "M576 640.5v-321h-384v321h384zM576 256.5q25.5 0 45 18.75t19.5 44.25v321q0 25.5-19.5 44.25t-45 18.75h-384q-25.5 0-45-18.75t-19.5-44.25v-321q0-25.5 19.5-44.25t45-18.75h291v-64.5q0-40.5-29.25-69.75t-69.75-29.25-69.75 29.25-29.25 69.75h-61.5q0-66 47.25-113.25t113.25-47.25 113.25 47.25 47.25 113.25v64.5h31.5zM384 544.5q-25.5 0-45-19.5t-19.5-45 19.5-45 45-19.5 45 19.5 19.5 45-19.5 45-45 19.5z");
}
function getLockedIcon() {
    return _initIcon(768, "lockedIcon", "M576 640.5v-321h-384v321h384zM285 192v64.5h198v-64.5q0-40.5-29.25-69.75t-69.75-29.25-69.75 29.25-29.25 69.75zM576 256.5q25.5 0 45 18.75t19.5 44.25v321q0 25.5-19.5 44.25t-45 18.75h-384q-25.5 0-45-18.75t-19.5-44.25v-321q0-25.5 19.5-44.25t45-18.75h31.5v-64.5q0-66 47.25-113.25t113.25-47.25 113.25 47.25 47.25 113.25v64.5h31.5zM384 544.5q-25.5 0-45-19.5t-19.5-45 19.5-45 45-19.5 45 19.5 19.5 45-19.5 45-45 19.5z");
}
function getFoldIcon() {
    return _initIcon(768, "vaultActionIcon", "M531 172.5l-147 147-147-147 45-45 102 102 102-102zM237 595.5l147-147 147 147-45 45-102-102-102 102z");
}
function getUnfoldIcon() {
    return _initIcon(768, "vaultActionIcon", "M384 582l102-102 45 45-147 147-147-147 45-45zM384 186l-102 102-45-45 147-147 147 147-45 45z");
}
function getFolderFoldedIcon() {
    return _initIcon(768, "foldIcon", "M319.5 192l192 192-192 192-45-45 147-147-147-147z");
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
    return _initIcon(24, "pwdUnknown", "M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M18,11.09c0,4-2.55,7.7-6,8.83 c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6,2.25V11.09z");
}
function getVisibilityIcon() {
    const icon = _initIcon(24, "visibility", "M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z");
    icon.setAttribute("viewBox", `0 -960 960 960`);
    return icon;
}
function getCopyIcon() {
    const icon = _initIcon(24, "copy", "M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z");
    icon.setAttribute("viewBox", `0 -960 960 960`);
    return icon;
}
function getDeleteIcon() {
    const icon = _initIcon(24, "delete", "m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z");
    icon.setAttribute("viewBox", `0 -960 960 960`);
    return icon;
}

;// ./src/popup/popup/renderAccount.ts
var renderAccount_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




function _openTab(url) {
    if (url.indexOf(":") === -1) {
        browser_polyfill_default().tabs.create({ url: "https://" + url });
    }
    else {
        browser_polyfill_default().tabs.create({ url });
    }
}
function renderAccountRow(parentNode, acc, withMarker, vaultId, isMatching) {
    return renderAccount_awaiter(this, void 0, void 0, function* () {
        try {
            const accountBlock = document.createElement("div");
            accountBlock.classList.add("account-block");
            if (!acc.name) {
                return;
            }
            const accountButton = document.createElement("div");
            accountButton.classList.add("account");
            accountButton.innerText = acc.name;
            if (withMarker) {
                accountButton.classList.add("with-marker");
            }
            accountBlock.appendChild(accountButton);
            const accountContent = document.createElement("div");
            accountContent.classList.add("account-content");
            accountContent.classList.add("hidden");
            accountBlock.appendChild(accountContent);
            if (!!acc.passwordShield) {
                const shieldContainer = document.createElement("div");
                shieldContainer.classList.add("shield-container");
                accountContent.appendChild(shieldContainer);
                if (acc.passwordShield == "strong") {
                    shieldContainer.classList.add("strong");
                    const shieldIcon = getPwdStrongIcon();
                    shieldContainer.appendChild(shieldIcon);
                    const shieldComment = document.createElement("div");
                    shieldComment.innerText = browser_polyfill_default().i18n.getMessage("popup_account_pwd_strong");
                    shieldContainer.appendChild(shieldComment);
                }
                else if (acc.passwordShield == "medium") {
                    shieldContainer.classList.add("medium");
                    const shieldIcon = getPwdMediumIcon();
                    shieldContainer.appendChild(shieldIcon);
                    const shieldComment = document.createElement("div");
                    shieldComment.innerText = browser_polyfill_default().i18n.getMessage("popup_account_pwd_medium");
                    shieldContainer.appendChild(shieldComment);
                }
                else if (acc.passwordShield == "weak") {
                    shieldContainer.classList.add("weak");
                    const shieldIcon = getPwdWeakIcon();
                    shieldContainer.appendChild(shieldIcon);
                    const shieldComment = document.createElement("div");
                    shieldComment.innerText = browser_polyfill_default().i18n.getMessage("popup_account_pwd_weak");
                    shieldContainer.appendChild(shieldComment);
                }
                else if (acc.passwordShield == "unknown") {
                    shieldContainer.classList.add("unknown");
                    const shieldIcon = getPwdUnknownIcon();
                    shieldContainer.appendChild(shieldIcon);
                    const shieldComment = document.createElement("div");
                    shieldComment.innerText = browser_polyfill_default().i18n.getMessage("popup_account_pwd_unknown");
                    shieldContainer.appendChild(shieldComment);
                }
            }
            let accountLogin, accountPassword, accountLink;
            if (acc.login || acc.hasPassword) {
                const autofillButton = document.createElement("div");
                autofillButton.classList.add("account-login");
                if (isMatching) {
                    autofillButton.innerText = browser_polyfill_default().i18n.getMessage("popup_account_autofill");
                    autofillButton.addEventListener("click", () => renderAccount_awaiter(this, void 0, void 0, function* () {
                        try {
                            const activeTab = yield getActiveTabUrlAndId();
                            if (activeTab == null)
                                return;
                            yield sendMessageToBackground("FORCE_FILL_FROM_POPUP", {
                                vaultId,
                                accountId: acc.id,
                                activeTabUrl: activeTab.url,
                                activeTabId: activeTab.id,
                            });
                        }
                        catch (_) {
                            return;
                        }
                    }));
                }
                else {
                    autofillButton.innerText = browser_polyfill_default().i18n.getMessage("popup_account_autofill_and_save");
                    autofillButton.addEventListener("click", () => renderAccount_awaiter(this, void 0, void 0, function* () {
                        try {
                            const activeTab = yield getActiveTabUrlAndId();
                            if (activeTab == null)
                                return;
                            if (!activeTab.url.startsWith("https://") &&
                                !activeTab.url.startsWith("http://")) {
                                return;
                            }
                            yield sendMessageToBackground("FORCE_FILL_AND_SAVE_FROM_POPUP", {
                                vaultId,
                                accountId: acc.id,
                                activeTabUrl: activeTab.url,
                                activeTabId: activeTab.id,
                            });
                        }
                        catch (_) {
                            return;
                        }
                    }));
                }
                accountContent.appendChild(autofillButton);
            }
            if (acc.login) {
                accountLogin = document.createElement("div");
                accountLogin.classList.add("account-login");
                accountLogin.innerText =
                    browser_polyfill_default().i18n.getMessage("popup_account_copy") + " " + acc.login;
                accountLogin.addEventListener("click", () => {
                    navigator.clipboard.writeText(acc.login);
                });
                accountContent.appendChild(accountLogin);
            }
            if (acc.hasPassword) {
                accountPassword = document.createElement("div");
                accountPassword.classList.add("account-password");
                accountPassword.innerText =
                    browser_polyfill_default().i18n.getMessage("popup_account_copy") +
                        " " +
                        "*".repeat(acc.pwdLength);
                accountPassword.addEventListener("click", () => renderAccount_awaiter(this, void 0, void 0, function* () {
                    try {
                        const pwd = yield sendMessageToBackground("COPY_PASSWORD", {
                            vaultId,
                            accountId: acc.id,
                        });
                        if (pwd)
                            yield navigator.clipboard.writeText(pwd);
                    }
                    catch (_) {
                        return;
                    }
                }));
                accountContent.appendChild(accountPassword);
            }
            if (acc.hasTotp) {
                var accountTotpButton = document.createElement("div");
                accountTotpButton.innerText = browser_polyfill_default().i18n.getMessage("popup_totp_show");
                accountTotpButton.classList.add("popup-totp-show");
                accountContent.appendChild(accountTotpButton);
                var accountTotpContainer = document.createElement("div");
                accountTotpContainer.classList.add("account-totp-container");
                accountTotpContainer.classList.add("hidden");
                var accountTotp = document.createElement("div");
                accountTotp.classList.add("account-totp");
                var timerDiv = document.createElement("div");
                timerDiv.classList.add("popup_totp_timer");
                accountTotpContainer.appendChild(accountTotp);
                accountTotpContainer.appendChild(timerDiv);
                accountContent.appendChild(accountTotpContainer);
                accountTotpButton.addEventListener("click", () => renderAccount_awaiter(this, void 0, void 0, function* () {
                    try {
                        const totpResult = yield sendMessageToBackground("GET_ACCOUNT_TOTP", {
                            vaultId,
                            accountId: acc.id,
                        });
                        if (!totpResult)
                            return;
                        accountTotpButton.classList.add("hidden");
                        accountTotp.innerText =
                            browser_polyfill_default().i18n.getMessage("popup_account_copy") +
                                " " +
                                totpResult.totp;
                        const copyTotpFunction = () => {
                            navigator.clipboard.writeText(totpResult.totp);
                        };
                        accountTotpButton.addEventListener("click", copyTotpFunction);
                        var remainingSeconds = totpResult.remainingSeconds;
                        timerDiv.innerText = "" + remainingSeconds;
                        var timer = setInterval(() => {
                            remainingSeconds--;
                            timerDiv.innerText = "" + remainingSeconds;
                            if (remainingSeconds <= 0) {
                                accountTotpContainer.classList.add("hidden");
                                accountTotpButton.classList.remove("hidden");
                                accountTotp.innerText = "";
                                timerDiv.innerText = "";
                                accountTotp.removeEventListener("click", copyTotpFunction);
                                clearInterval(timer);
                            }
                        }, 1000);
                        accountTotpContainer.classList.remove("hidden");
                    }
                    catch (_) {
                        return;
                    }
                }));
            }
            for (let u = 0; u < acc.redirectUrls.length; u++) {
                const url = acc.redirectUrls[u];
                accountLink = document.createElement("div");
                accountLink.classList.add("account-link");
                let accountLinkTitle = document.createElement("div");
                accountLinkTitle.innerText =
                    browser_polyfill_default().i18n.getMessage("popup_account_link");
                accountLink.appendChild(accountLinkTitle);
                let accountLinkUrl = document.createElement("div");
                accountLinkUrl.innerText = url || "";
                accountLink.appendChild(accountLinkUrl);
                accountLink.addEventListener("click", function () {
                    return renderAccount_awaiter(this, void 0, void 0, function* () {
                        const usesHTTPBasic = false;
                        if (usesHTTPBasic) {
                            try {
                                const authenticatedUrl = yield sendMessageToBackground("GET_HTTP_BASIC_AUTHENTICATED_URL", { vaultId, accountId: acc.id, url });
                                if (authenticatedUrl)
                                    _openTab(authenticatedUrl);
                            }
                            catch (_) {
                                _openTab(url);
                            }
                        }
                        else {
                            _openTab(url);
                        }
                    });
                });
                accountContent.appendChild(accountLink);
            }
            parentNode.appendChild(accountBlock);
            const isUnfolded = yield isItemUnfolded(vaultId, acc.id);
            accountContent.classList.toggle("hidden", !isUnfolded);
            accountButton.addEventListener("click", () => {
                accountContent.classList.toggle("hidden");
                let isFolded = accountContent.classList.contains("hidden");
                toggleItemFolding(vaultId, acc.id, !isFolded);
            });
        }
        catch (e) {
            console.error(e.message, e);
        }
    });
}

;// ./src/popup/popup/renderFolder.ts
var renderFolder_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function renderFolder(parentNode, folder, vaultId, matchingAccounts) {
    return renderFolder_awaiter(this, void 0, void 0, function* () {
        const folderTitleContainer = document.createElement("div");
        folderTitleContainer.classList.add("folderTitleContainer");
        folderTitleContainer.dataset["id"] = `${vaultId}.${folder.id}`;
        const foldIcon = document.createElement("div");
        foldIcon.classList.add("foldIconContainer");
        foldIcon.appendChild(getFolderFoldedIcon());
        folderTitleContainer.appendChild(foldIcon);
        const folderTitle = document.createElement("div");
        folderTitle.innerText = folder.name;
        folderTitleContainer.appendChild(folderTitle);
        parentNode.appendChild(folderTitleContainer);
        const folderItemsContainer = document.createElement("div");
        folderItemsContainer.classList.add("folderItemsContainer");
        parentNode.appendChild(folderItemsContainer);
        const isUnfolded = (yield isSearching()) || (yield isItemUnfolded(vaultId, folder.id));
        folderItemsContainer.classList.toggle("hidden", !isUnfolded);
        if (isUnfolded) {
            foldIcon.classList.add("rotatedFoldIcon");
        }
        folderTitleContainer.addEventListener("click", () => {
            folderItemsContainer.classList.toggle("hidden");
            let isFolded = folderItemsContainer.classList.contains("hidden");
            toggleItemFolding(vaultId, folder.id, !isFolded);
            foldIcon.classList.toggle("rotatedFoldIcon", !isFolded);
        });
        renderFolderChildren(folderItemsContainer, folder.children, vaultId, matchingAccounts);
    });
}
function renderFolderChildren(parentNode, children, vaultId, matchingAccounts) {
    for (let c = 0; c < children.length; c++) {
        const child = children[c];
        if (child.type == "folder") {
            renderFolder(parentNode, child, vaultId, matchingAccounts);
        }
        else {
            const isMatching = matchingAccounts.some((ac) => ac.id === child.id);
            renderAccountRow(parentNode, child, false, vaultId, isMatching);
        }
    }
}

;// ./src/popup/popup/renderVault.ts
var renderVault_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






function _toggleVaultList(vaultId, listNode, forcedValue) {
    if (typeof forcedValue === "undefined") {
        listNode.classList.toggle("hidden");
    }
    else {
        listNode.classList.toggle("hidden", forcedValue);
    }
    let isFolded = listNode.classList.contains("hidden");
    toggleVaultFolding(vaultId, !isFolded);
    const foldBtn = document.querySelector(`.foldBtn[data-vault-id='${vaultId}']`);
    removeAllChildren(foldBtn);
    if (isFolded) {
        foldBtn.appendChild(getUnfoldIcon());
    }
    else {
        foldBtn.appendChild(getFoldIcon());
    }
}
function _toggleVaultContentFolding(vaultId) {
    return function (ev) {
        if (!searchInput.value) {
            const lists = document.getElementsByClassName("account-list");
            for (let i = 0; i < lists.length; i++) {
                const list = lists[i];
                if (Number.parseInt(list.dataset["vaultId"]) === vaultId) {
                    _toggleVaultList(vaultId, list);
                }
            }
        }
    };
}
function _getVaultHeader({ isLocked, isFolded, vaultId, vaultName, email, }) {
    const lockButton = document.createElement("div");
    lockButton.classList.add(isLocked ? "unlockBtn" : "lockBtn");
    lockButton.appendChild(isLocked ? getLockedIcon() : getUnlockedIcon());
    if (isLocked) {
        lockButton.addEventListener("click", function () {
            return renderVault_awaiter(this, void 0, void 0, function* () {
                try {
                    yield sendMessageToBackground("UNLOCK_VAULT", { vaultId });
                }
                catch (_) {
                    return;
                }
            });
        });
    }
    else {
        lockButton.addEventListener("click", function () {
            return renderVault_awaiter(this, void 0, void 0, function* () {
                try {
                    yield sendMessageToBackground("LOCK_VAULT", { vaultId });
                }
                catch (_) {
                    return;
                }
            });
        });
    }
    const vaultTitle = document.createElement("div");
    vaultTitle.classList.add(isLocked ? "unlockTitleBtn" : "unlockTitleBtnLike");
    vaultTitle.dataset["vaultId"] = "" + vaultId;
    if (isLocked) {
        vaultTitle.addEventListener("click", function () {
            return renderVault_awaiter(this, void 0, void 0, function* () {
                try {
                    yield sendMessageToBackground("UNLOCK_VAULT", { vaultId });
                }
                catch (_) {
                    return;
                }
            });
        });
    }
    else {
        vaultTitle.addEventListener("click", _toggleVaultContentFolding(vaultId));
    }
    const vaultTitleFirstLine = document.createElement("div");
    vaultTitleFirstLine.classList.add("vaultTitle");
    vaultTitleFirstLine.innerText = vaultName;
    vaultTitle.appendChild(vaultTitleFirstLine);
    if (!!email) {
        const vaultTitleSecondLine = document.createElement("div");
        vaultTitleSecondLine.innerText = email;
        vaultTitle.appendChild(vaultTitleSecondLine);
    }
    const vaultHeader = document.createElement("div");
    vaultHeader.classList.add("vaultHeaderContainer");
    vaultHeader.appendChild(lockButton);
    vaultHeader.appendChild(vaultTitle);
    if (!isLocked && !searchInput.value) {
        const foldBtn = document.createElement("div");
        foldBtn.dataset["vaultId"] = "" + vaultId;
        foldBtn.classList.add("foldBtn");
        foldBtn.appendChild(isFolded ? getUnfoldIcon() : getFoldIcon());
        foldBtn.addEventListener("click", _toggleVaultContentFolding(vaultId));
        vaultHeader.appendChild(foldBtn);
    }
    return vaultHeader;
}
function renderVault(vault, targetNode) {
    return renderVault_awaiter(this, void 0, void 0, function* () {
        const isUnfolded = !!searchInput.value || (yield isVaultUnfolded(vault.id));
        var vaultHeader = _getVaultHeader({
            isLocked: vault.isLocked,
            isFolded: !isUnfolded,
            vaultId: vault.id,
            vaultName: (vault.name || vault.bankName),
            email: vault.userEmail || null,
        });
        targetNode.appendChild(vaultHeader);
        const matchingListNode = document.createElement("div");
        matchingListNode.classList.add("matching-list");
        targetNode.appendChild(matchingListNode);
        if (vault.matchingAccounts) {
            for (let ma = 0; ma < vault.matchingAccounts.length; ma++) {
                renderAccountRow(matchingListNode, vault.matchingAccounts[ma], true, vault.id, true);
            }
        }
        const listNode = document.createElement("div");
        listNode.classList.add("account-list");
        if (!isUnfolded)
            listNode.classList.add("hidden");
        listNode.dataset["vaultId"] = "" + vault.id;
        targetNode.appendChild(listNode);
        renderFolderChildren(listNode, vault.children, vault.id, vault.matchingAccounts);
    });
}

;// ./src/popup/helpers/searchUtils.ts
function formatForSearchMatch(s) {
    if (!s)
        return "";
    return s
        .toLowerCase()
        .trim()
        .replace(/[àâªæáäãåā]/g, "a")
        .replace(/[éèêëęėeē]/g, "e")
        .replace(/[îïìíįī]/g, "i")
        .replace(/[ôœºöòóõøoō]/g, "o")
        .replace(/[ûùüúū]/g, "u")
        .replace(/[ÿ]/g, "y")
        .replace(/[çćč]/g, "c")
        .replace(/[ñń]/g, "n")
        .replace(/[^a-z0-9]/g, "");
}

;// ./src/backgroundAndPopupHelpers/urlUtils.ts
function getHostname(url) {
    if (url == null)
        return null;
    if (url.length === 0)
        return "";
    return url
        .toLowerCase()
        .replace(/^(https?:\/\/)?/, "")
        .split("/")[0]
        .split("?")[0]
        .split("#")[0];
}

;// ./src/popup/helpers/csLoader.ts
function createLoaderElement() {
    const loader = document.createElement("div");
    loader.classList.add("cs-loader");
    const inner = document.createElement("div");
    inner.classList.add("cs-loader-inner");
    const dot = document.createElement("div");
    dot.innerText = "●";
    inner.appendChild(dot);
    inner.appendChild(dot.cloneNode(true));
    inner.appendChild(dot.cloneNode(true));
    inner.appendChild(dot.cloneNode(true));
    inner.appendChild(dot.cloneNode(true));
    loader.appendChild(inner);
    return loader;
}

;// ./src/popup/popup/unsavedPasswordList.ts
var unsavedPasswordList_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function refreshUnsavedPasswordList(unsavedPasswords) {
    if (unsavedPasswords.length === 0) {
        hideNode(pwdNotSavedContainer);
    }
    else {
        showNode(pwdNotSavedContainer);
    }
    while (pwdNotSavedList.lastElementChild) {
        pwdNotSavedList.removeChild(pwdNotSavedList.lastElementChild);
    }
    for (let i = 0; i < unsavedPasswords.length; i++) {
        const unsavedPwd = unsavedPasswords[i];
        const unsavedPwdElement = document.createElement("div");
        unsavedPwdElement.classList.add("unsaved_password_item");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("password_not_saved_button");
        deleteButton.setAttribute("style", "align-self: flex-end");
        const deleteIcon = getDeleteIcon();
        deleteIcon.setAttribute("style", "fill: white; cursor: pointer; height: 20px; width: 20px;");
        deleteButton.appendChild(deleteIcon);
        deleteButton.setAttribute("title", browser_polyfill_default().i18n.getMessage("passwords_not_saved_delete"));
        deleteButton.addEventListener("click", function () {
            try {
                sendMessageToBackground("FORGET_UNSAVED_PASSWORD", { index: i });
            }
            catch (e) {
                console.error(e);
            }
        });
        unsavedPwdElement.appendChild(deleteButton);
        if (unsavedPwd.url) {
            const urlEl = document.createElement("div");
            urlEl.innerText = unsavedPwd.url;
            urlEl.classList.add("unsaved_password_item_url");
            unsavedPwdElement.appendChild(urlEl);
        }
        if (unsavedPwd.login) {
            const loginEl = document.createElement("div");
            loginEl.innerText = unsavedPwd.login;
            unsavedPwdElement.appendChild(loginEl);
        }
        const passwordContainer = document.createElement("div");
        passwordContainer.setAttribute("style", "display:flex; align-items: center;");
        unsavedPwdElement.appendChild(passwordContainer);
        const passwordEl = document.createElement("div");
        passwordEl.setAttribute("title", browser_polyfill_default().i18n.getMessage("view_password"));
        passwordEl.setAttribute("style", "margin-right: 10px; flex: 1; cursor: pointer;");
        passwordEl.innerText = "*".repeat(unsavedPwd.password.length);
        passwordContainer.appendChild(passwordEl);
        passwordEl.addEventListener("mousedown", function () {
            passwordEl.innerText = unsavedPwd.password;
        });
        passwordEl.addEventListener("mouseleave", function () {
            passwordEl.innerText = "*".repeat(unsavedPwd.password.length);
        });
        passwordEl.addEventListener("mouseup", function () {
            passwordEl.innerText = "*".repeat(unsavedPwd.password.length);
        });
        const viewButton = document.createElement("button");
        viewButton.classList.add("password_not_saved_button");
        viewButton.setAttribute("title", browser_polyfill_default().i18n.getMessage("view_password"));
        const viewIcon = getVisibilityIcon();
        viewIcon.setAttribute("style", "fill: white; cursor: pointer; height: 20px; width: 20px; margin-right: 10px;");
        viewButton.appendChild(viewIcon);
        passwordContainer.appendChild(viewButton);
        viewButton.addEventListener("mousedown", function () {
            passwordEl.innerText = unsavedPwd.password;
        });
        viewButton.addEventListener("mouseleave", function () {
            passwordEl.innerText = "*".repeat(unsavedPwd.password.length);
        });
        viewButton.addEventListener("mouseup", function () {
            passwordEl.innerText = "*".repeat(unsavedPwd.password.length);
        });
        const copyButton = document.createElement("button");
        copyButton.setAttribute("title", browser_polyfill_default().i18n.getMessage("copy_password"));
        copyButton.classList.add("password_not_saved_button");
        const copyIcon = getCopyIcon();
        copyIcon.setAttribute("style", "fill: white; cursor: pointer; height: 20px; width: 20px; margin-right: 10px;");
        copyButton.appendChild(copyIcon);
        copyButton.addEventListener("click", function () {
            navigator.clipboard.writeText(unsavedPwd.password);
            copyButton.setAttribute("style", "font-weight: bold;");
            setTimeout(() => {
                copyButton.setAttribute("style", "");
            }, 200);
        });
        passwordContainer.appendChild(copyButton);
        const createButton = document.createElement("button");
        createButton.classList.add("password_not_saved_button");
        createButton.setAttribute("style", "align-self: flex-end; font-weight: bold;");
        createButton.innerText = browser_polyfill_default().i18n.getMessage("passwords_not_saved_create");
        createButton.addEventListener("click", function () {
            return unsavedPasswordList_awaiter(this, void 0, void 0, function* () {
                try {
                    showLoaderOnUnsavedPasswordTile(unsavedPwdElement);
                    const success = yield sendMessageToBackground("CREATE_UNSAVED_PASSWORD", { index: i });
                    if (!success) {
                        window.alert(browser_polyfill_default().i18n.getMessage("passwords_not_saved_create_error"));
                    }
                }
                catch (e) {
                    console.error(e);
                }
                finally {
                    hideLoaderOnUnsavedPasswordTile(unsavedPwdElement);
                    yield refreshVaultListPage();
                }
            });
        });
        unsavedPwdElement.appendChild(createButton);
        pwdNotSavedList.appendChild(unsavedPwdElement);
    }
}
function showLoaderOnUnsavedPasswordTile(element) {
    const loaderContainer = document.createElement("div");
    loaderContainer.classList.add("loaderContainer");
    loaderContainer.setAttribute("style", "display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; position: absolute; z-index: 100; background-color: rgba(255, 255, 255, 0.5); top: 0; left: 0;");
    element.appendChild(loaderContainer);
    const loader = createLoaderElement();
    loaderContainer.appendChild(loader);
}
function hideLoaderOnUnsavedPasswordTile(element) {
    if (element) {
        for (let i = 0; i < element.children.length; i++) {
            const child = element.children[i];
            if (child === null || child === void 0 ? void 0 : child.classList.contains("loaderContainer")) {
                element.removeChild(child);
            }
        }
    }
}

;// ./src/popup/popup/vaultListPage.ts
var vaultListPage_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









function _emptyListNodes() {
    vaultListPageList.remove();
    vaultListPageList = document.createElement("div");
    vaultListPageList.dataset["id"] = "vault_list_page_list";
    vaultListPage.appendChild(vaultListPageList);
}
function _displayVaultListContent(vaultListContent) {
    _emptyListNodes();
    if (vaultListContent.persoVaults.length == 0 &&
        vaultListContent.proVaults.length == 0) {
        showNode(vaultListPageEmpty);
        return;
    }
    for (let v = 0; v < vaultListContent.persoVaults.length; v++) {
        renderVault(vaultListContent.persoVaults[v], vaultListPageList);
    }
    for (let v = 0; v < vaultListContent.proVaults.length; v++) {
        renderVault(vaultListContent.proVaults[v], vaultListPageList);
    }
}
function _filterChildren(children, search) {
    const filteredChildren = [];
    for (let child of children) {
        if (child.type === "folder") {
            if (formatForSearchMatch(child.name).indexOf(search) >= 0) {
                filteredChildren.push(child);
            }
            else {
                const filteredSubChildren = _filterChildren(child.children, search);
                if (filteredSubChildren.length > 0) {
                    const resFolder = {
                        type: "folder",
                        id: child.id,
                        name: child.name,
                        children: filteredSubChildren,
                        isShared: child.isShared,
                        isOwner: child.isOwner,
                    };
                    filteredChildren.push(resFolder);
                }
            }
        }
        else {
            if (formatForSearchMatch(child.name).indexOf(search) >= 0 ||
                child.redirectUrls.some((u) => formatForSearchMatch(getHostname(u)).indexOf(search) >= 0)) {
                filteredChildren.push(child);
            }
        }
    }
    return filteredChildren;
}
function _findMatchingAccounts(children, activeTabHostname) {
    var matchingAccounts = [];
    if (!activeTabHostname)
        return matchingAccounts;
    for (let child of children) {
        if (child.type === "folder") {
            const matchingChildren = _findMatchingAccounts(child.children, activeTabHostname);
            matchingAccounts = [...matchingAccounts, ...matchingChildren];
        }
        else {
            if (child.redirectUrls.some((u) => getHostname(u) === activeTabHostname)) {
                matchingAccounts.push(child);
            }
        }
    }
    return matchingAccounts;
}
function refreshVaultListPage() {
    return vaultListPage_awaiter(this, void 0, void 0, function* () {
        const search = yield BrowserStorage.getSearch();
        const formattedSearch = formatForSearchMatch(search);
        const activeTab = yield getActiveTabUrlAndId();
        const activeTabHostname = activeTab ? getHostname(activeTab.url) : null;
        try {
            const vaultListContent = yield sendMessageToBackground("REFRESH_VAULT_LIST_CONTENT", undefined);
            const filteredVaultListContent = {
                persoVaults: (vaultListContent === null || vaultListContent === void 0 ? void 0 : vaultListContent.persoVaults.map((pv) => {
                    if (pv.isLocked)
                        return pv;
                    const filteredChildren = _filterChildren(pv.children, formattedSearch);
                    const r = {
                        id: pv.id,
                        name: pv.name,
                        isLocked: false,
                        children: filteredChildren,
                        matchingAccounts: _findMatchingAccounts(filteredChildren, activeTabHostname).map((ac) => (Object.assign(Object.assign({}, ac), { vaultId: pv.id }))),
                        ownedSharedVaultIds: pv.ownedSharedVaultIds,
                    };
                    return r;
                })) || [],
                proVaults: (vaultListContent === null || vaultListContent === void 0 ? void 0 : vaultListContent.proVaults.map((pv) => {
                    if (pv.isLocked)
                        return pv;
                    const filteredChildren = _filterChildren(pv.children, formattedSearch);
                    const r = {
                        id: pv.id,
                        bankName: pv.bankName,
                        userEmail: pv.userEmail,
                        isLocked: false,
                        children: filteredChildren,
                        matchingAccounts: _findMatchingAccounts(filteredChildren, activeTabHostname).map((ac) => (Object.assign(Object.assign({}, ac), { vaultId: pv.id }))),
                        ownedSharedVaultIds: pv.ownedSharedVaultIds,
                    };
                    return r;
                })) || [],
            };
            _displayVaultListContent(filteredVaultListContent);
            showPage(vaultListPage);
        }
        catch (e) {
            console.error(e);
        }
        try {
            const unsavedPasswords = yield sendMessageToBackground("GET_UNSAVED_PASSWORDS", undefined);
            refreshUnsavedPasswordList(unsavedPasswords);
        }
        catch (e) {
            console.error(e);
        }
    });
}
function vaultListPageMain() {
    searchInput.addEventListener("input", function (ev) {
        return vaultListPage_awaiter(this, void 0, void 0, function* () {
            yield BrowserStorage.setSearch(ev.target.value);
            refreshVaultListPage();
        });
    });
    searchClearButton.addEventListener("click", function () {
        return vaultListPage_awaiter(this, void 0, void 0, function* () {
            searchInput.value = "";
            yield BrowserStorage.clearSearch();
            refreshVaultListPage();
        });
    });
    onMessageFromBackground("FORCE_REFRESH", refreshVaultListPage);
    onMessageFromBackground("SHOW_ERROR_PAGE", () => vaultListPage_awaiter(this, void 0, void 0, function* () {
        if (appConnectionSetupPage.style.display === "none") {
            showPage(appConnectionErrorPage);
        }
    }));
    onMessageFromBackground("SHOW_SETUP_PAGE", () => vaultListPage_awaiter(this, void 0, void 0, function* () {
        showPage(appConnectionSetupPage);
    }));
    onMessageFromBackground("REFRESH_UNSAVED_PASSWORDS", (unsavedPasswords) => Promise.resolve(refreshUnsavedPasswordList(unsavedPasswords)));
}

;// ./src/popup/popup/popupInit.ts
var popupInit_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




function popupInit() {
    return popupInit_awaiter(this, void 0, void 0, function* () {
        try {
            showPage(loaderPage);
            const connectionStatus = yield sendMessageToBackground("GET_NATIVE_APP_CONNECTION_STATUS", undefined);
            console.log("popup setup status", connectionStatus.status);
            if (connectionStatus.status === "NEEDS_SETUP") {
                showPage(appConnectionSetupPage);
            }
            else if (connectionStatus.status === "OK") {
                try {
                    refreshVaultListPage();
                }
                catch (e) {
                    console.error(e);
                }
            }
            else {
                showPage(appConnectionErrorPage);
            }
        }
        catch (e) {
            console.error("error in popupInit:", e.toString(), e.stack);
            showPage(appConnectionErrorPage);
        }
    });
}

;// ./src/popup/popup/appConnectionSetupPage.ts
var appConnectionSetupPage_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function doSetupBrowser(ev) {
    return appConnectionSetupPage_awaiter(this, void 0, void 0, function* () {
        try {
            ev.preventDefault();
            const browserName = yield getBrowserName();
            const { authorizationId, secretKey } = yield sendMessageToBackground("GET_NATIVE_APP_CONNECTION_SETUP", undefined);
            const urlEncodedBrowserName = encodeURIComponent(browserName);
            const urlEncodedAuthorizationId = encodeURIComponent(authorizationId);
            const urlEncodedSecretKey = encodeURIComponent(secretKey);
            let link = `upsignon://browser-setup?name=${urlEncodedBrowserName}&authorizationId=${urlEncodedAuthorizationId}&secretKey=${urlEncodedSecretKey}`;
            window.open(link, "_blank");
        }
        catch (e) {
            console.error(e);
        }
    });
}
function appConnectionSetupPageMain() {
    appConnectionSetupButton.addEventListener("click", doSetupBrowser);
    appConnectionSetupStep2AltMethod.addEventListener("click", () => {
        showPage(appConnectionAltMethodPage);
    });
    appConnectionSetupCodeInput.addEventListener("change", function () {
        hideNode(appConnectionSetupCodeInputError);
    });
    appConnectionSetupForm.addEventListener("submit", function (e) {
        return appConnectionSetupPage_awaiter(this, void 0, void 0, function* () {
            var timer;
            var showPageWithError = (msg) => {
                appConnectionSetupCodeInputError.innerText = msg;
                showNode(appConnectionSetupCodeInputError);
                showPage(appConnectionSetupPage);
            };
            try {
                e.preventDefault();
                const code = appConnectionSetupCodeInput.value;
                showPage(loaderPage);
                timer = setTimeout(() => {
                    showPageWithError(browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_input_timeout_error"));
                }, 5000);
                const { isVerified } = yield sendMessageToBackground("SUBMIT_SETUP_CODE", { code: code });
                clearTimeout(timer);
                if (isVerified) {
                    yield popupInit();
                }
                else {
                    showPageWithError(browser_polyfill_default().i18n.getMessage("app_connection_setup_copy_code_error"));
                }
            }
            catch (e) {
                console.error(e);
                showPageWithError(browser_polyfill_default().i18n.getMessage("app_connection_setup_copy_code_websocket_error"));
            }
        });
    });
}
function appConnectionSetupAlternativePageMain() {
    appConnectionAlternativeCancelBtn.addEventListener("click", () => {
        showPage(appConnectionSetupPage);
    });
    appConnectionAlternativeSubmitButton.addEventListener("click", () => appConnectionSetupPage_awaiter(this, void 0, void 0, function* () {
        var showPageWithError = (msg) => {
            appConnectionSetupCodeInputError.innerText = msg;
            showNode(appConnectionAlternativeInputError);
            showPage(appConnectionAltMethodPage);
        };
        try {
            const appSetupValue = appConnectionAlternativeInput.value;
            hideNode(appConnectionAlternativeInputError);
            showPage(loaderPage);
            const browserName = yield getBrowserName();
            var timer = setTimeout(() => {
                showPageWithError(browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_input_timeout_error"));
            }, 5000);
            const { setupStarted } = yield sendMessageToBackground("SUBMIT_ALTERNATIVE_APP_SETUP_VALUE", {
                appSetupValue: appSetupValue,
                browserName,
            });
            clearTimeout(timer);
            if (setupStarted) {
                showPage(appConnectionSetupPage);
            }
            else {
                showPageWithError(browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_input_error"));
            }
        }
        catch (e) {
            console.error(e);
            showPageWithError(browser_polyfill_default().i18n.getMessage("app_connection_alternative_method_input_websocket_error"));
        }
    }));
    appConnectionAlternativeInput.addEventListener("change", function () {
        hideNode(appConnectionAlternativeInputError);
    });
}

;// ./src/popup/popup/appConnectionErrorPage.ts


function appConnectionErrorPageMain() {
    appConnectionErrorStartAppButton.addEventListener("click", function (ev) {
        ev.preventDefault();
        window.open("upsignon://");
    });
    appConnectionErrorRefreshButton.addEventListener("click", function (ev) {
        ev.preventDefault();
        popupInit();
    });
}

;// ./src/popup/main.ts








initFooter();
const popup = document.getElementById("popup");
hideNode(loaderPage);
showNode(popup);
initAutosavePref();
nodesHelperMain();
appConnectionSetupPageMain();
appConnectionSetupAlternativePageMain();
appConnectionErrorPageMain();
vaultListPageMain();
popupInit();

})();

/******/ })()
;
//# sourceMappingURL=popupScript.js.map