(() => {
  // webpackBootstrap
  var __webpack_modules__ = {
    364: function(__unused_webpack_module, exports) {
      "use strict";
      0;
      0;
      function jsonEqualish(actual, expected) {
        if (Object.is(actual, expected)) return true;
        // For non-objects, use Object.is. This will cause 'undefined' and 'null' to
        // be different, as desired.
                if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") 
        // Except for numbers, since we want '-0' and '+0' to be equivalent
        // (We should really just use JSON.stringify here. Might be slower but would
        // it matter?)
        return typeof actual === "number" ? actual === expected : Object.is(actual, expected);
        return objEquiv(actual, expected);
      }
      0;
      function objEquiv(a, b) {
        if (typeof a !== typeof b) return false;
        if (a instanceof Date) return b instanceof Date && a.getTime() == b.getTime();
        if (Array.isArray(a) !== Array.isArray(b)) return false;
        // We only deal with POD at the moment.
                if (a.constructor && a.constructor !== Object && a.constructor !== Array || b.constructor && b.constructor !== Object && b.constructor !== Array) throw new Error("Trying to compare something fancy");
        const aKeys = definedKeys(a);
        const bKeys = definedKeys(b);
        if (aKeys.length !== bKeys.length) return false;
        aKeys.sort();
        bKeys.sort();
        // Compare keys first
                for (let i = 0; i < aKeys.length; ++i) if (aKeys[i] != bKeys[i]) return false;
        // Compare values
                for (const key of aKeys) if (!jsonEqualish(a[key], b[key])) return false;
        return true;
      }
      function definedKeys(a) {
        return Object.keys(a).filter((key => typeof a[key] !== "undefined"));
      }
      0;
    },
    687: function(module, __unused_webpack_exports, __webpack_require__) {
      /* module decorator */ module = __webpack_require__.nmd(module);
      (function(global, factory) {
        if (typeof define === "function" && define.amd) define("webextension-polyfill", [ "module" ], factory); else if (true) factory(module); else ;
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" && self, (function(module) {
        /* webextension-polyfill - v0.12.0 - Tue May 14 2024 18:01:29 */
        /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
        /* vim: set sts=2 sw=2 et tw=80: */
        /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
        "use strict";
        if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) throw new Error("This script should only be loaded in a browser extension.");
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
              alarms: {
                clear: {
                  minArgs: 0,
                  maxArgs: 1
                },
                clearAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              bookmarks: {
                create: {
                  minArgs: 1,
                  maxArgs: 1
                },
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getChildren: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getRecent: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getSubTree: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getTree: {
                  minArgs: 0,
                  maxArgs: 0
                },
                move: {
                  minArgs: 2,
                  maxArgs: 2
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeTree: {
                  minArgs: 1,
                  maxArgs: 1
                },
                search: {
                  minArgs: 1,
                  maxArgs: 1
                },
                update: {
                  minArgs: 2,
                  maxArgs: 2
                }
              },
              browserAction: {
                disable: {
                  minArgs: 0,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                },
                enable: {
                  minArgs: 0,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                },
                getBadgeBackgroundColor: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getBadgeText: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getPopup: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getTitle: {
                  minArgs: 1,
                  maxArgs: 1
                },
                openPopup: {
                  minArgs: 0,
                  maxArgs: 0
                },
                setBadgeBackgroundColor: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                },
                setBadgeText: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                },
                setIcon: {
                  minArgs: 1,
                  maxArgs: 1
                },
                setPopup: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                },
                setTitle: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                }
              },
              browsingData: {
                remove: {
                  minArgs: 2,
                  maxArgs: 2
                },
                removeCache: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeCookies: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeDownloads: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeFormData: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeHistory: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeLocalStorage: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removePasswords: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removePluginData: {
                  minArgs: 1,
                  maxArgs: 1
                },
                settings: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              commands: {
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              contextMenus: {
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                update: {
                  minArgs: 2,
                  maxArgs: 2
                }
              },
              cookies: {
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAll: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAllCookieStores: {
                  minArgs: 0,
                  maxArgs: 0
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              devtools: {
                inspectedWindow: {
                  eval: {
                    minArgs: 1,
                    maxArgs: 2,
                    singleCallbackArg: false
                  }
                },
                panels: {
                  create: {
                    minArgs: 3,
                    maxArgs: 3,
                    singleCallbackArg: true
                  },
                  elements: {
                    createSidebarPane: {
                      minArgs: 1,
                      maxArgs: 1
                    }
                  }
                }
              },
              downloads: {
                cancel: {
                  minArgs: 1,
                  maxArgs: 1
                },
                download: {
                  minArgs: 1,
                  maxArgs: 1
                },
                erase: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getFileIcon: {
                  minArgs: 1,
                  maxArgs: 2
                },
                open: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                },
                pause: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeFile: {
                  minArgs: 1,
                  maxArgs: 1
                },
                resume: {
                  minArgs: 1,
                  maxArgs: 1
                },
                search: {
                  minArgs: 1,
                  maxArgs: 1
                },
                show: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                }
              },
              extension: {
                isAllowedFileSchemeAccess: {
                  minArgs: 0,
                  maxArgs: 0
                },
                isAllowedIncognitoAccess: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              history: {
                addUrl: {
                  minArgs: 1,
                  maxArgs: 1
                },
                deleteAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                deleteRange: {
                  minArgs: 1,
                  maxArgs: 1
                },
                deleteUrl: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getVisits: {
                  minArgs: 1,
                  maxArgs: 1
                },
                search: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              i18n: {
                detectLanguage: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAcceptLanguages: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              identity: {
                launchWebAuthFlow: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              idle: {
                queryState: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              management: {
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                getSelf: {
                  minArgs: 0,
                  maxArgs: 0
                },
                setEnabled: {
                  minArgs: 2,
                  maxArgs: 2
                },
                uninstallSelf: {
                  minArgs: 0,
                  maxArgs: 1
                }
              },
              notifications: {
                clear: {
                  minArgs: 1,
                  maxArgs: 1
                },
                create: {
                  minArgs: 1,
                  maxArgs: 2
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                getPermissionLevel: {
                  minArgs: 0,
                  maxArgs: 0
                },
                update: {
                  minArgs: 2,
                  maxArgs: 2
                }
              },
              pageAction: {
                getPopup: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getTitle: {
                  minArgs: 1,
                  maxArgs: 1
                },
                hide: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                },
                setIcon: {
                  minArgs: 1,
                  maxArgs: 1
                },
                setPopup: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                },
                setTitle: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                },
                show: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: true
                }
              },
              permissions: {
                contains: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                request: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              runtime: {
                getBackgroundPage: {
                  minArgs: 0,
                  maxArgs: 0
                },
                getPlatformInfo: {
                  minArgs: 0,
                  maxArgs: 0
                },
                openOptionsPage: {
                  minArgs: 0,
                  maxArgs: 0
                },
                requestUpdateCheck: {
                  minArgs: 0,
                  maxArgs: 0
                },
                sendMessage: {
                  minArgs: 1,
                  maxArgs: 3
                },
                sendNativeMessage: {
                  minArgs: 2,
                  maxArgs: 2
                },
                setUninstallURL: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              sessions: {
                getDevices: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getRecentlyClosed: {
                  minArgs: 0,
                  maxArgs: 1
                },
                restore: {
                  minArgs: 0,
                  maxArgs: 1
                }
              },
              storage: {
                local: {
                  clear: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  get: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getBytesInUse: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  set: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                },
                managed: {
                  get: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getBytesInUse: {
                    minArgs: 0,
                    maxArgs: 1
                  }
                },
                sync: {
                  clear: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  get: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getBytesInUse: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  set: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                }
              },
              tabs: {
                captureVisibleTab: {
                  minArgs: 0,
                  maxArgs: 2
                },
                create: {
                  minArgs: 1,
                  maxArgs: 1
                },
                detectLanguage: {
                  minArgs: 0,
                  maxArgs: 1
                },
                discard: {
                  minArgs: 0,
                  maxArgs: 1
                },
                duplicate: {
                  minArgs: 1,
                  maxArgs: 1
                },
                executeScript: {
                  minArgs: 1,
                  maxArgs: 2
                },
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getCurrent: {
                  minArgs: 0,
                  maxArgs: 0
                },
                getZoom: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getZoomSettings: {
                  minArgs: 0,
                  maxArgs: 1
                },
                goBack: {
                  minArgs: 0,
                  maxArgs: 1
                },
                goForward: {
                  minArgs: 0,
                  maxArgs: 1
                },
                highlight: {
                  minArgs: 1,
                  maxArgs: 1
                },
                insertCSS: {
                  minArgs: 1,
                  maxArgs: 2
                },
                move: {
                  minArgs: 2,
                  maxArgs: 2
                },
                query: {
                  minArgs: 1,
                  maxArgs: 1
                },
                reload: {
                  minArgs: 0,
                  maxArgs: 2
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeCSS: {
                  minArgs: 1,
                  maxArgs: 2
                },
                sendMessage: {
                  minArgs: 2,
                  maxArgs: 3
                },
                setZoom: {
                  minArgs: 1,
                  maxArgs: 2
                },
                setZoomSettings: {
                  minArgs: 1,
                  maxArgs: 2
                },
                update: {
                  minArgs: 1,
                  maxArgs: 2
                }
              },
              topSites: {
                get: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              webNavigation: {
                getAllFrames: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getFrame: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              webRequest: {
                handlerBehaviorChanged: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              windows: {
                create: {
                  minArgs: 0,
                  maxArgs: 1
                },
                get: {
                  minArgs: 1,
                  maxArgs: 2
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getCurrent: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getLastFocused: {
                  minArgs: 0,
                  maxArgs: 1
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                update: {
                  minArgs: 2,
                  maxArgs: 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) throw new Error("api-metadata.json has not been included in browser-polyfill");
            /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key) {
                if (!this.has(key)) this.set(key, this.createItem(key));
                return super.get(key);
              }
            }
            /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */            const isThenable = value => value && typeof value === "object" && typeof value.then === "function";
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
       */            const makeCallback = (promise, metadata) => (...callbackArgs) => {
              if (extensionAPIs.runtime.lastError) promise.reject(new Error(extensionAPIs.runtime.lastError.message)); else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) promise.resolve(callbackArgs[0]); else promise.resolve(callbackArgs);
            };
            const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments"
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
       */;
            const wrapAsyncFunction = (name, metadata) => function(target, ...args) {
              if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              return new Promise(((resolve, reject) => {
                if (metadata.fallbackToNoCallback) 
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
                } else if (metadata.noCallback) {
                  target[name](...args);
                  resolve();
                } else target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              }));
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
       */            const wrapMethod = (target, method, wrapper) => new Proxy(method, {
              apply(targetMethod, thisObj, args) {
                return wrapper.call(thisObj, target, ...args);
              }
            });
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
       */            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = Object.create(null);
              let handlers = {
                has(proxyTarget, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget, prop, receiver) {
                  if (prop in cache) return cache[prop];
                  if (!(prop in target)) return;
                  let value = target[prop];
                  if (typeof value === "function") 
                  // This is a method on the underlying object. Check if we need to do
                  // any wrapping.
                  if (typeof wrappers[prop] === "function") 
                  // We have a special-case wrapper for this method.
                  value = wrapMethod(target, target[prop], wrappers[prop]); else if (hasOwnProperty(metadata, prop)) {
                    // This is an async method that we have metadata for. Create a
                    // Promise wrapper for it.
                    let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                    value = wrapMethod(target, target[prop], wrapper);
                  } else 
                  // This is a method that we don't know or care about. Return the
                  // original method, bound to the underlying object.
                  value = value.bind(target); else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) 
                  // This is an object that we need to do some wrapping for the children
                  // of. Create a sub-object wrapper for it with the appropriate child
                  // metadata.
                  value = wrapObject(value, wrappers[prop], metadata[prop]); else if (hasOwnProperty(metadata, "*")) 
                  // Wrap all properties in * namespace.
                  value = wrapObject(value, wrappers[prop], metadata["*"]); else {
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
                  if (prop in cache) cache[prop] = value; else target[prop] = value;
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
       */            const wrapEvent = wrapperMap => ({
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
            const onRequestFinishedWrappers = new DefaultWeakMap((listener => {
              if (typeof listener !== "function") return listener;
              /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */              return function(req) {
                const wrappedReq = wrapObject(req, {} /* wrappers */ , {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedReq);
              };
            }));
            const onMessageWrappers = new DefaultWeakMap((listener => {
              if (typeof listener !== "function") return listener;
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
         */              return function(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve(response);
                  };
                }));
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
                                if (result !== true && !isResultThenable && !didCallSendResponse) return false;
                // A small helper to send the message if the promise resolves
                // and an error if the promise rejects (a wrapped sendMessage has
                // to translate the message into a resolved promise or a rejected
                // promise).
                                const sendPromisedResult = promise => {
                  promise.then((msg => {
                    // send the message value.
                    sendResponse(msg);
                  }), (error => {
                    // Send a JSON representation of the error if the rejected value
                    // is an instance of error, or the object itself otherwise.
                    let message;
                    if (error && (error instanceof Error || typeof error.message === "string")) message = error.message; else message = "An unexpected error occurred";
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message
                    });
                  })).catch((err => {
                    // Print an error on the console if unable to send the response.
                    console.error("Failed to send onMessage rejected reply", err);
                  }));
                };
                // If the listener returned a Promise, send the resolved value as a
                // result, otherwise wait the promise related to the wrappedSendResponse
                // callback to resolve and send it as a response.
                                if (isResultThenable) sendPromisedResult(result); else sendPromisedResult(sendResponsePromise);
                // Let Chrome know that the listener is replying.
                                return true;
              };
            }));
            const wrappedSendMessageCallback = ({reject, resolve}, reply) => {
              if (extensionAPIs.runtime.lastError) 
              // Detect when none of the listeners replied to the sendMessage call and resolve
              // the promise to undefined as in Firefox.
              // See https://github.com/mozilla/webextension-polyfill/issues/130
              if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) resolve(); else reject(new Error(extensionAPIs.runtime.lastError.message)); else if (reply && reply.__mozWebExtensionPolyfillReject__) 
              // Convert back the JSON representation of the error into
              // an Error instance.
              reject(new Error(reply.message)); else resolve(reply);
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              return new Promise(((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              }));
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
        } else module.exports = globalThis.browser;
      }));
    }
  };
  /************************************************************************/
  // The module cache
    var __webpack_module_cache__ = {};
  // The require function
    function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== void 0) return cachedModule.exports;
    // Create a new module (and put it into the cache)
        var module = __webpack_module_cache__[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {}
    };
    // Execute the module function
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
        module.loaded = true;
    // Return the exports of the module
        return module.exports;
  }
  /************************************************************************/
  // webpack/runtime/compat_get_default_export
    (() => {
    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function(module) {
      var getter = module && module.__esModule ? function() {
        return module["default"];
      } : function() {
        return module;
      };
      __webpack_require__.d(getter, {
        a: getter
      });
      return getter;
    };
  })();
  // webpack/runtime/define_property_getters
    (() => {
    __webpack_require__.d = function(exports, definition) {
      for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key]
      });
    };
  })();
  // webpack/runtime/has_own_property
    (() => {
    __webpack_require__.o = function(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
  })();
  // webpack/runtime/node_module_decorator
    (() => {
    __webpack_require__.nmd = function(module) {
      module.paths = [];
      if (!module.children) module.children = [];
      return module;
    };
  })();
  // webpack/runtime/rspack_version
    (() => {
    __webpack_require__.rv = function() {
      return "1.0.10";
    };
  })();
  // webpack/runtime/rspack_unique_id
    (() => {
    __webpack_require__.ruid = "bundler=rspack@1.0.10";
  })();
  /************************************************************************/  
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";
    // UNUSED EXPORTS: ContentHandler, isTouchClickEvent
        // CONCATENATED MODULE: ./node_modules/.pnpm/superstruct@2.0.2/node_modules/superstruct/dist/index.mjs
    /**
 * A `StructFailure` represents a single specific failure in validation.
 */
    /**
 * `StructError` objects are thrown (or returned) when validation fails.
 *
 * Validation logic is design to exit early for maximum performance. The error
 * represents the first error encountered during validation. For more detail,
 * the `error.failures` property is a generator function that can be run to
 * continue validation and receive all the failures in the data.
 */
    class StructError extends TypeError {
      constructor(failure, failures) {
        let cached;
        const {message, explanation, ...rest} = failure;
        const {path} = failure;
        const msg = path.length === 0 ? message : `At path: ${path.join(".")} -- ${message}`;
        super(explanation ?? msg);
        if (explanation != null) this.cause = msg;
        Object.assign(this, rest);
        this.name = this.constructor.name;
        this.failures = () => cached ?? (cached = [ failure, ...failures() ]);
      }
    }
    /**
 * Check if a value is an iterator.
 */    function isIterable(x) {
      return isObject(x) && typeof x[Symbol.iterator] === "function";
    }
    /**
 * Check if a value is a plain object.
 */    function isObject(x) {
      return typeof x === "object" && x != null;
    }
    /**
 * Check if a value is a non-array object.
 */    function isNonArrayObject(x) {
      return isObject(x) && !Array.isArray(x);
    }
    /**
 * Check if a value is a plain object.
 */    
    /**
 * Return a value as a printable string.
 */
    function print(value) {
      if (typeof value === "symbol") return value.toString();
      return typeof value === "string" ? JSON.stringify(value) : `${value}`;
    }
    /**
 * Shifts (removes and returns) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 */    function shiftIterator(input) {
      const {done, value} = input.next();
      return done ? void 0 : value;
    }
    /**
 * Convert a single validation result to a failure.
 */    function toFailure(result, context, struct, value) {
      if (result === true) return; else if (result === false) result = {}; else if (typeof result === "string") result = {
        message: result
      };
      const {path, branch} = context;
      const {type} = struct;
      const {refinement, message = `Expected a value of type \`${type}\`${refinement ? ` with refinement \`${refinement}\`` : ""}, but received: \`${print(value)}\``} = result;
      return {
        value,
        type,
        refinement,
        key: path[path.length - 1],
        path,
        branch,
        ...result,
        message
      };
    }
    /**
 * Convert a validation result to an iterable of failures.
 */    function* toFailures(result, context, struct, value) {
      if (!isIterable(result)) result = [ result ];
      for (const r of result) {
        const failure = toFailure(r, context, struct, value);
        if (failure) yield failure;
      }
    }
    /**
 * Check a value against a struct, traversing deeply into nested values, and
 * returning an iterator of failures or success.
 */    function* run(value, struct, options = {}) {
      const {path = [], branch = [ value ], coerce = false, mask = false} = options;
      const ctx = {
        path,
        branch,
        mask
      };
      if (coerce) value = struct.coercer(value, ctx);
      let status = "valid";
      for (const failure of struct.validator(value, ctx)) {
        failure.explanation = options.message;
        status = "not_valid";
        yield [ failure, void 0 ];
      }
      for (let [k, v, s] of struct.entries(value, ctx)) {
        const ts = run(v, s, {
          path: k === void 0 ? path : [ ...path, k ],
          branch: k === void 0 ? branch : [ ...branch, v ],
          coerce,
          mask,
          message: options.message
        });
        for (const t of ts) if (t[0]) {
          status = t[0].refinement != null ? "not_refined" : "not_valid";
          yield [ t[0], void 0 ];
        } else if (coerce) {
          v = t[1];
          if (k === void 0) value = v; else if (value instanceof Map) value.set(k, v); else if (value instanceof Set) value.add(v); else if (isObject(value)) if (v !== void 0 || k in value) value[k] = v;
        }
      }
      if (status !== "not_valid") for (const failure of struct.refiner(value, ctx)) {
        failure.explanation = options.message;
        status = "not_refined";
        yield [ failure, void 0 ];
      }
      if (status === "valid") yield [ void 0, value ];
    }
    /**
 * `Struct` objects encapsulate the validation logic for a specific type of
 * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
 * validate unknown input data against the struct.
 */    class Struct {
      constructor(props) {
        const {type, schema, validator, refiner, coercer = value => value, entries = function*() {}} = props;
        this.type = type;
        this.schema = schema;
        this.entries = entries;
        this.coercer = coercer;
        if (validator) this.validator = (value, context) => {
          const result = validator(value, context);
          return toFailures(result, context, this, value);
        }; else this.validator = () => [];
        if (refiner) this.refiner = (value, context) => {
          const result = refiner(value, context);
          return toFailures(result, context, this, value);
        }; else this.refiner = () => [];
      }
      /**
     * Assert that a value passes the struct's validation, throwing if it doesn't.
     */      assert(value, message) {
        return assert(value, this, message);
      }
      /**
     * Create a value with the struct's coercion logic, then validate it.
     */      create(value, message) {
        return create(value, this, message);
      }
      /**
     * Check if a value passes the struct's validation.
     */      is(value) {
        return is(value, this);
      }
      /**
     * Mask a value, coercing and validating it, but returning only the subset of
     * properties defined by the struct's schema. Masking applies recursively to
     * props of `object` structs only.
     */      mask(value, message) {
        return dist_mask(value, this, message);
      }
      /**
     * Validate a value with the struct's validation logic, returning a tuple
     * representing the result.
     *
     * You may optionally pass `true` for the `coerce` argument to coerce
     * the value before attempting to validate it. If you do, the result will
     * contain the coerced result when successful. Also, `mask` will turn on
     * masking of the unknown `object` props recursively if passed.
     */      validate(value, options = {}) {
        return validate(value, this, options);
      }
    }
    /**
 * Assert that a value passes a struct, throwing if it doesn't.
 */    function assert(value, struct, message) {
      const result = validate(value, struct, {
        message
      });
      if (result[0]) throw result[0];
    }
    /**
 * Create a value with the coercion logic of struct and validate it.
 */    function create(value, struct, message) {
      const result = validate(value, struct, {
        coerce: true,
        message
      });
      if (result[0]) throw result[0]; else return result[1];
    }
    /**
 * Mask a value, returning only the subset of properties defined by a struct.
 */    function dist_mask(value, struct, message) {
      const result = validate(value, struct, {
        coerce: true,
        mask: true,
        message
      });
      if (result[0]) throw result[0]; else return result[1];
    }
    /**
 * Check if a value passes a struct.
 */    function is(value, struct) {
      const result = validate(value, struct);
      return !result[0];
    }
    /**
 * Validate a value against a struct, returning an error if invalid, or the
 * value (with potential coercion) if valid.
 */    function validate(value, struct, options = {}) {
      const tuples = run(value, struct, options);
      const tuple = shiftIterator(tuples);
      if (tuple[0]) {
        const error = new StructError(tuple[0], (function*() {
          for (const t of tuples) if (t[0]) yield t[0];
        }));
        return [ error, void 0 ];
      } else {
        const v = tuple[1];
        return [ void 0, v ];
      }
    }
    function dist_assign(...Structs) {
      const isType = Structs[0].type === "type";
      const schemas = Structs.map((s => s.schema));
      const schema = Object.assign({}, ...schemas);
      return isType ? dist_type(schema) : dist_object(schema);
    }
    /**
 * Define a new struct type with a custom validation function.
 */    function dist_define(name, validator) {
      return new Struct({
        type: name,
        schema: null,
        validator
      });
    }
    /**
 * Create a new struct based on an existing struct, but the value is allowed to
 * be `undefined`. `log` will be called if the value is not `undefined`.
 */    function array(Element) {
      return new Struct({
        type: "array",
        schema: Element,
        * entries(value) {
          if (Element && Array.isArray(value)) for (const [i, v] of value.entries()) yield [ i, v, Element ];
        },
        coercer(value) {
          return Array.isArray(value) ? value.slice() : value;
        },
        validator(value) {
          return Array.isArray(value) || `Expected an array value, but received: ${print(value)}`;
        }
      });
    }
    /**
 * Ensure that a value is a bigint.
 */    
    /**
 * Ensure that a value is a boolean.
 */
    function dist_boolean() {
      return dist_define("boolean", (value => typeof value === "boolean"));
    }
    /**
 * Ensure that a value is a valid `Date`.
 *
 * Note: this also ensures that the value is *not* an invalid `Date` object,
 * which can occur when parsing a date fails but still returns a `Date`.
 */    function enums(values) {
      const schema = {};
      const description = values.map((v => print(v))).join();
      for (const key of values) schema[key] = key;
      return new Struct({
        type: "enums",
        schema,
        validator(value) {
          return values.includes(value) || `Expected one of \`${description}\`, but received: ${print(value)}`;
        }
      });
    }
    /**
 * Ensure that a value is a function.
 */    
    /**
 * Ensure that a value is an integer.
 */
    function integer() {
      return dist_define("integer", (value => typeof value === "number" && !isNaN(value) && Number.isInteger(value) || `Expected an integer, but received: ${print(value)}`));
    }
    /**
 * Ensure that a value matches all of a set of types.
 */    function literal(constant) {
      const description = print(constant);
      const t = typeof constant;
      return new Struct({
        type: "literal",
        schema: t === "string" || t === "number" || t === "boolean" ? constant : null,
        validator(value) {
          return value === constant || `Expected the literal \`${description}\`, but received: ${print(value)}`;
        }
      });
    }
    /**
 * Ensure that no value ever passes validation.
 */
    function never() {
      return dist_define("never", (() => false));
    }
    /**
 * Augment an existing struct to allow `null` values.
 */    
    /**
 * Ensure that a value is a number.
 */
    function dist_number() {
      return dist_define("number", (value => typeof value === "number" && !isNaN(value) || `Expected a number, but received: ${print(value)}`));
    }
    function dist_object(schema) {
      const knowns = schema ? Object.keys(schema) : [];
      const Never = never();
      return new Struct({
        type: "object",
        schema: schema ? schema : null,
        * entries(value) {
          if (schema && isObject(value)) {
            const unknowns = new Set(Object.keys(value));
            for (const key of knowns) {
              unknowns.delete(key);
              yield [ key, value[key], schema[key] ];
            }
            for (const key of unknowns) yield [ key, value[key], Never ];
          }
        },
        validator(value) {
          return isNonArrayObject(value) || `Expected an object, but received: ${print(value)}`;
        },
        coercer(value, ctx) {
          if (!isNonArrayObject(value)) return value;
          const coerced = {
            ...value
          };
          // The `object` struct has special behaviour enabled by the mask flag.
          // When masking, properties that are not in the schema are deleted from
          // the coerced object instead of eventually failing validaiton.
                    if (ctx.mask && schema) for (const key in coerced) if (schema[key] === void 0) delete coerced[key];
          return coerced;
        }
      });
    }
    /**
 * Augment a struct to allow `undefined` values.
 */    function optional(struct) {
      return new Struct({
        ...struct,
        validator: (value, ctx) => value === void 0 || struct.validator(value, ctx),
        refiner: (value, ctx) => value === void 0 || struct.refiner(value, ctx)
      });
    }
    /**
 * Ensure that a value is an object with keys and values of specific types, but
 * without ensuring any specific shape of properties.
 *
 * Like TypeScript's `Record` utility.
 */    function record(Key, Value) {
      return new Struct({
        type: "record",
        schema: null,
        * entries(value) {
          if (isObject(value)) for (const k in value) {
            const v = value[k];
            yield [ k, k, Key ];
            yield [ k, v, Value ];
          }
        },
        validator(value) {
          return isNonArrayObject(value) || `Expected an object, but received: ${print(value)}`;
        },
        coercer(value) {
          return isNonArrayObject(value) ? {
            ...value
          } : value;
        }
      });
    }
    /**
 * Ensure that a value is a `RegExp`.
 *
 * Note: this does not test the value against the regular expression! For that
 * you need to use the `pattern()` refinement.
 */    
    /**
 * Ensure that a value is a string.
 */
    function string() {
      return dist_define("string", (value => typeof value === "string" || `Expected a string, but received: ${print(value)}`));
    }
    /**
 * Ensure that a value is a tuple of a specific length, and that each of its
 * elements is of a specific type.
 */    
    /**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 */
    function dist_type(schema) {
      const keys = Object.keys(schema);
      return new Struct({
        type: "type",
        schema,
        * entries(value) {
          if (isObject(value)) for (const k of keys) yield [ k, value[k], schema[k] ];
        },
        validator(value) {
          return isNonArrayObject(value) || `Expected an object, but received: ${print(value)}`;
        },
        coercer(value) {
          return isNonArrayObject(value) ? {
            ...value
          } : value;
        }
      });
    }
    /**
 * Ensure that a value matches one of a set of types.
 */    function union(Structs) {
      const description = Structs.map((s => s.type)).join(" | ");
      return new Struct({
        type: "union",
        schema: null,
        coercer(value, ctx) {
          for (const S of Structs) {
            const [error, coerced] = S.validate(value, {
              coerce: true,
              mask: ctx.mask
            });
            if (!error) return coerced;
          }
          return value;
        },
        validator(value, ctx) {
          const failures = [];
          for (const S of Structs) {
            const [...tuples] = run(value, S, ctx);
            const [first] = tuples;
            if (!first[0]) return []; else for (const [failure] of tuples) if (failure) failures.push(failure);
          }
          return [ `Expected the value to satisfy a union of \`${description}\`, but received: ${print(value)}`, ...failures ];
        }
      });
    }
    /**
 * Ensure that any value passes validation, without widening its type to `any`.
 */    function getSize(value) {
      if (value instanceof Map || value instanceof Set) return value.size; else return value.length;
    }
    /**
 * Ensure that a number or date is below a threshold.
 */    
    /**
 * Ensure that a number or date is above a threshold.
 */
    function dist_min(struct, threshold, options = {}) {
      const {exclusive} = options;
      return refine(struct, "min", (value => exclusive ? value > threshold : value >= threshold || `Expected a ${struct.type} greater than ${exclusive ? "" : "or equal to "}${threshold} but received \`${value}\``));
    }
    /**
 * Ensure that a string, array, map or set is not empty.
 */    function nonempty(struct) {
      return refine(struct, "nonempty", (value => {
        const size = getSize(value);
        return size > 0 || `Expected a nonempty ${struct.type} but received an empty one`;
      }));
    }
    /**
 * Ensure that a string matches a regular expression.
 */    
    /**
 * Augment a `Struct` to add an additional refinement to the validation.
 *
 * The refiner function is guaranteed to receive a value of the struct's type,
 * because the struct's existing validation will already have passed. This
 * allows you to layer additional validation on top of existing structs.
 */
    function refine(struct, name, refiner) {
      return new Struct({
        ...struct,
        * refiner(value, ctx) {
          yield* struct.refiner(value, ctx);
          const result = refiner(value, ctx);
          const failures = toFailures(result, ctx, struct, value);
          for (const failure of failures) yield {
            ...failure,
            refinement: name
          };
        }
      });
    }
    // EXTERNAL MODULE: ./node_modules/.pnpm/webextension-polyfill@0.12.0/node_modules/webextension-polyfill/dist/browser-polyfill.js
        var browser_polyfill = __webpack_require__("687");
    var browser_polyfill_default =  __webpack_require__.n(browser_polyfill);
    // CONCATENATED MODULE: ./node_modules/.pnpm/@birchill+discriminator@0.3.0_superstruct@2.0.2/node_modules/@birchill/discriminator/dist/index.js
    // src/index.ts
    function extend(a, b) {
      if (a.type === "discriminator") {
        const discriminatorSchema = a.schema;
        const mapping = {};
        for (const [key, value] of Object.entries(discriminatorSchema.mapping)) mapping[key] = dist_assign(value, b);
        return discriminator(a.schema.field, mapping);
      }
      return dist_assign(a, b);
    }
    function dist_print(value) {
      if (typeof value === "string" || typeof value === "object" && value.toString === Object.prototype.toString) return JSON.stringify(value);
      return `${value}`;
    }
    function dist_isObject(a) {
      return typeof a === "object" && a !== null && !Array.isArray(a);
    }
    var discriminator = (field, mapping) => {
      const keys = Object.keys(mapping);
      const getStructForValue = value => {
        if (!dist_isObject(value) || typeof value[field] !== "string" || !keys.includes(value[field])) return;
        const branch = value[field];
        const branchStruct = mapping[branch];
        if (!branchStruct) return;
        return extend(branchStruct, dist_object({
          [field]: literal(branch)
        }));
      };
      return new Struct({
        type: "discriminator",
        schema: {
          field,
          mapping
        },
        * entries(value, context) {
          const struct = getStructForValue(value);
          if (struct) yield* struct.entries(value, context);
        },
        validator(value, context) {
          if (!dist_isObject(value)) return `Expected an object, but received: ${dist_print(value)}`;
          if (!(field in value) || typeof value[field] !== "string") return `Expected an object with '${field}' property, but received: ${dist_print(value)}`;
          if (!keys.includes(value[field])) return `Expected '${field}' to be one of ${keys.map((key => `'${key}'`)).join(", ")}, but received: '${value[field]}'`;
          const struct = getStructForValue(value);
          if (!struct) return true;
          return struct.validator(value, context);
        }
      });
    };
    // CONCATENATED MODULE: ./src/content/popup-state.ts
    const PopupStateSchema = dist_type({
      // Record the position of the window
      pos: optional(dist_type({
        // The frame to which the coordinates are relative.
        frameId: dist_number(),
        // Page coordinates
        x: dist_number(),
        y: dist_number(),
        width: dist_number(),
        height: dist_number(),
        direction: enums([ "vertical", "horizontal", "disjoint" ]),
        side: enums([ "before", "after", "disjoint" ]),
        // Whether or not the popup is allowed to overlap the lookup point.
        allowOverlap: dist_boolean(),
        // Reference lookup point we should use for determining if a mouse move is
        // "between" the lookup point and the popup.
        lookupPoint: optional(dist_type({
          // Page coordinates
          x: dist_number(),
          y: dist_number(),
          // Area around the lookup point that should be treated as being "on"
          // the point.
          // For example, when the lookup point is the center of a text
          // character, we want to treat the whole the bbox of the character as
          // being part of the "point'.
          // This is only needed when the popup transitions from hover -> ghost
          // display mode and hold-to-show keys are configured (but no longer
          // pressed, hence the transition). Without this, we can easily get
          // mousemove events that are outside the lookup point and not on the
          // path to the popup but where we really don't want to close the
          // popup since they're still in roughly the same place.
          // When we _don't_ have hold-to-show keys configured this is not
          // a problem because, provided the mouse is still inside the character
          // that triggered the lookup, we'll keep showing the popup.
          // This is expressed as a margin simply so that we don't have to
          // convert it when transferring between frames.
          marginX: dist_number(),
          marginY: dist_number()
        }))
      })),
      // The type of content the popup is positioned relative to.
      contentType: enums([ "text", "image" ]),
      // The particular appearance and behavior of the popup
      display: discriminator("mode", {
        // static: no interactivity, small tabs, no close button etc.
        static: dist_type({}),
        // ghost: not interactive yet, shows tabs etc. but has a dotted outline,
        // has no pointer events, and no arrow. Used while scanning using the mouse
        // before settling on a word to lookup.
        ghost: discriminator("trigger", {
          // Transition to hover when the timeout expires
          timeout: dist_type({
            timeout: dist_number()
          }),
          // Transition to hover when the following keys are no longer held
          keys: dist_type({
            keyType: dist_number()
          })
        }),
        // hover: interactive using the mouse by hovering over it. Shows an arrow
        // to the lookup point.
        hover: dist_type({}),
        // pinned: similar to hover but remains visible even if the mouse moves
        // outside the popup.
        pinned: dist_type({}),
        // touch: interactive using touch events. Has no arrow to the lookup point
        // and does not allowing hovering over using the mouse.
        touch: dist_type({})
      })
    });
    function clearPopupTimeout(popupState) {
      if (popupState?.display.mode === "ghost" && popupState.display.trigger === "timeout") window.clearTimeout(popupState.display.timeout);
    }
    // CONCATENATED MODULE: ./src/background/background-message.ts
    const BackgroundMessageSchema = discriminator("type", {
      disable: dist_type({
        frame: literal("*")
      }),
      enable: dist_type({
        // We don't validate the contents of the config object yet
        config: dist_type({}),
        id: optional(dist_number()),
        frame: literal("*")
      }),
      dbUpdated: dist_type({
        frame: literal("*")
      }),
      isTopMost: dist_type({
        frame: dist_number()
      }),
      // Relayed messages from other content scripts
      // Popup showing status
      popupShown: dist_type({
        frame: union([ literal("children"), dist_number() ]),
        state: PopupStateSchema
      }),
      popupHidden: dist_type({
        frame: literal("children")
      }),
      isPopupShowing: dist_type({
        frameId: dist_number(),
        frame: literal("top")
      }),
      // Text highlighting
      highlightText: dist_type({
        length: dist_number(),
        frame: dist_number()
      }),
      clearTextHighlight: dist_type({
        frame: dist_number()
      }),
      // Lookup-related messages
      lookup: dist_type({
        dictMode: enums([ "default", "kanji" ]),
        // We don't validate the contents of meta (yet)
        meta: optional(dist_type({})),
        point: dist_type({
          x: dist_number(),
          y: dist_number()
        }),
        // Likewise, we don't validate target props (yet)
        targetProps: dist_type({}),
        text: string(),
        wordLookup: dist_boolean(),
        // Parameters for designating the iframe source
        source: dist_type({
          frameId: dist_number(),
          initialSrc: optional(string()),
          currentSrc: string(),
          dimensions: dist_type({
            width: dist_number(),
            height: dist_number()
          })
        }),
        frame: literal("top")
      }),
      pinPopup: dist_type({
        frame: literal("top")
      }),
      unpinPopup: dist_type({
        frame: literal("top")
      }),
      commitPopup: dist_type({
        frame: literal("top")
      }),
      clearResult: dist_type({
        frame: literal("top")
      }),
      nextDictionary: dist_type({
        frame: literal("top")
      }),
      toggleDefinition: dist_type({
        frame: literal("top")
      }),
      expandPopup: dist_type({
        frame: literal("top")
      }),
      movePopup: dist_type({
        direction: enums([ "up", "down" ]),
        frame: literal("top")
      }),
      // Copy mode messages
      enterCopyMode: dist_type({
        frame: literal("top")
      }),
      exitCopyMode: dist_type({
        frame: literal("top")
      }),
      nextCopyEntry: dist_type({
        frame: literal("top")
      }),
      copyCurrentEntry: dist_type({
        copyType: enums([ "entry", "tab", "word" ]),
        frame: literal("top")
      })
    });
    // CONCATENATED MODULE: ./src/common/copy-keys.ts
    // Various common definitions used for the keys supported in copy mode.
    const CopyKeys = [ {
      type: "entry",
      key: "e",
      optionsString: "options_popup_copy_entry",
      popupString: "content_copy_keys_entry_label"
    }, {
      type: "tab",
      key: "t",
      optionsString: "options_popup_copy_fields",
      popupString: "content_copy_keys_fields_label"
    }, {
      type: "word",
      key: "w",
      optionsString: "options_popup_copy_word_kanji",
      popupString: "content_copy_keys_word_label"
    } ];
    const CopyKanjiKeyStrings = {
      popupString: "content_copy_keys_kanji_label"
    };
    const CopyNextKeyStrings = {
      optionsString: "options_popup_copy_next",
      popupString: "content_copy_keys_next_label"
    };
    // CONCATENATED MODULE: ./src/utils/dom-utils.ts
    const SVG_NS = "http://www.w3.org/2000/svg";
    const HTML_NS = "http://www.w3.org/1999/xhtml";
    function dom_utils_empty(elem) {
      while (elem.firstChild) elem.firstChild.remove();
    }
    function isContentEditableNode(node) {
      if (!node) return false;
      const nodeOrParent = nodeOrParentElement(node);
      if (!(nodeOrParent instanceof HTMLElement)) return false;
      let currentNode = nodeOrParent;
      while (currentNode) {
        if (currentNode.contentEditable === "true") return true; else if (currentNode.contentEditable === "false") return false;
        currentNode = currentNode.parentElement;
      }
      return false;
    }
    function nodeOrParentElement(node) {
      return node.nodeType !== Node.ELEMENT_NODE ? node.parentElement : node;
    }
    function isEditableNode(node) {
      return isTextInputNode(node) || isContentEditableNode(node);
    }
    /**
 * Tests whether an element is 'interactive', i.e. an element
 * that we should not do lookups on when tapped on mobile.
 */    function isInteractiveElement(node) {
      return isContentEditableNode(node) || isElement(node) && (node.tagName === "A" || node.tagName === "BUTTON" || node.tagName === "INPUT" || node.tagName === "TEXTAREA" || node.tagName === "SELECT" || node.tagName === "DATALIST" || node.tagName === "OPTGROUP" || node.tagName === "OPTION");
    }
    // Both HTMLElement and SVGElement interfaces have a focus() method but I guess
    // Edge doesn't currently support focus() on SVGElement so we just duck-type
    // this.
        function isFocusable(element) {
      return element && typeof element.focus === "function" && element.focus.length === 0;
    }
    function isTextInputNode(node) {
      const allowedInputTypes = [ "button", "email", "search", "submit", "text", "url" ];
      return !!node && node.nodeType === Node.ELEMENT_NODE && (node.tagName === "INPUT" && allowedInputTypes.includes(node.type) || node.tagName === "TEXTAREA");
    }
    const isTextNode = node => !!node && node.nodeType === Node.TEXT_NODE;
    const isElement = node => !!node && node.nodeType === Node.ELEMENT_NODE;
    function isSvg(node) {
      return node.nodeType === Node.ELEMENT_NODE ? node instanceof SVGElement : node.parentElement instanceof SVGElement;
    }
    function dom_utils_isVerticalText(node) {
      const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
      return !!element && !!element.ownerDocument.defaultView?.getComputedStyle(element).writingMode.startsWith("vertical");
    }
    // CONCATENATED MODULE: ./src/utils/geometry.ts
    // Conversion utilities
    function addMarginToPoint(margin, point) {
      return {
        left: point.x - margin.left,
        top: point.y - margin.top,
        width: margin.left + margin.right,
        height: margin.top + margin.bottom
      };
    }
    function getMarginAroundPoint(point, rect) {
      return {
        left: Math.max(0, point.x - rect.left),
        top: Math.max(0, point.y - rect.top),
        right: Math.max(0, rect.left + rect.width - point.x),
        bottom: Math.max(0, rect.top + rect.height - point.y)
      };
    }
    // Geometry utils
        function geometry_union(a, b) {
      return {
        left: Math.min(a.left, b.left),
        top: Math.min(a.top, b.top),
        width: Math.max(a.left + a.width, b.left + b.width) - Math.min(a.left, b.left),
        height: Math.max(a.top + a.height, b.top + b.height) - Math.min(a.top, b.top)
      };
    }
    function bboxIncludesPoint({bbox, margin = 0, point}) {
      return bbox.left - margin <= point.x && bbox.left + bbox.width + margin >= point.x && bbox.top - margin <= point.y && bbox.top + bbox.height + margin >= point.y;
    }
    // DOM geometry utils
        function getBboxForNodeList(nodes) {
      return [ ...nodes ].reduce(((bbox, child) => {
        let thisBbox = null;
        if (isTextNode(child)) {
          const range = new Range;
          range.selectNode(child);
          thisBbox = range.getBoundingClientRect();
        } else if (isElement(child)) if (getComputedStyle(child).display === "none") thisBbox = getBboxForNodeList(child.childNodes); else thisBbox = child.getBoundingClientRect();
        if (!thisBbox) return bbox;
        return bbox ? geometry_union(bbox, thisBbox) : thisBbox;
      }), null);
    }
    // CONCATENATED MODULE: ./src/utils/mod.ts
    // JS % operator is a _remainder_ operator
    function mod(a, n) {
      return (a % n + n) % n;
    }
    // CONCATENATED MODULE: ./src/utils/strip-fields.ts
    /**
 * A helper to strip certain fields from an object.
 */
    function stripFields(o, fields) {
      const result = {
        ...o
      };
      for (const field of fields) delete result[field];
      return result;
    }
    // CONCATENATED MODULE: ./src/utils/ua-utils.ts
    function isFirefox() {
      return navigator.userAgent.indexOf("Firefox/") !== -1;
    }
    function isFenix() {
      return isFirefox() && navigator.userAgent.indexOf("Android") !== -1;
    }
    function isChromium() {
      return navigator.userAgent.indexOf("Chrome/") !== -1 || navigator.userAgent.indexOf("Chromium/") !== -1;
    }
    function isSafari() {
      return navigator.userAgent.indexOf("Safari/") !== -1 && !isChromium();
    }
    function ua_utils_isIOS() {
      return [ "iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod" ].includes(navigator.platform) || // iPad on iOS 13 detection
      navigator.userAgent.includes("Mac") && "ontouchend" in document;
    }
    /** @public */    // CONCATENATED MODULE: ./src/utils/builder.ts
    // Little helper to simplify creating HTML elements that takes care of:
    // - Adding the HTML namespace (needed so the popup works in standalong SVG
    //   documents)
    // - Returning the correct type (TypeScript's lib.dom.d.ts has createElementNS
    //   returning an HTMLElement in all cases, unlike createElement).
    // - Setting attributes (for convenience)
    function html(tagName, attributes, ...children) {
      const elem = document.createElementNS(HTML_NS, tagName);
      if (attributes) for (const key in attributes) {
        const val = attributes[key];
        if (typeof val !== "undefined") elem.setAttribute(key, val);
      }
      if (children) elem.append(...children);
      return elem;
    }
    function builder_svg(tagName, attributes, ...children) {
      const elem = document.createElementNS(SVG_NS, tagName);
      if (attributes) for (const key in attributes) {
        const val = attributes[key];
        if (typeof val !== "undefined") elem.setAttribute(key, val);
      }
      if (children) elem.append(...children);
      return elem;
    }
    // CONCATENATED MODULE: ./src/content/clipboard.ts
    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback for non-HTTPS pages
        // We generate a copy event and then fill in the data in the event handler
        let callbackCalled = false;
        const copy = function(event) {
          event.clipboardData.setData("text/plain", text);
          event.preventDefault();
          callbackCalled = true;
        };
        document.addEventListener("copy", copy);
        document.execCommand("copy");
        document.removeEventListener("copy", copy);
        if (callbackCalled) return;
        // However, on Safari (of course it's Safari), if there is no current
        // selection in the page, the copy event callback will not be fired.
        
        // In that case, try generating a selection to copy instead.
                const selection = document.getSelection();
        if (!selection) throw new Error("No selection to work with");
        // This isn't going to work if this is an SVG document but I'm quite happy
        // to accept that you can't copy text from SVG documents served over
        // insecure HTTP in Safari.
                const span = html("span", {}, text);
        (document.body || document.documentElement).append(span);
        // We would like to build up a specific Range here so we can cleanly remove
        // it later but Safari doesn't seem to handle `selection.addRange` properly.
        
        // (From the console it works, but only if we use document.createRange,
        // _not_ if we use the Range constructor. From code, however, it doesn't
        // seem to work with either approach, possibly because the selection is
        // updated async?)
        
        // Given that we only expect this to occur when there's no selection _and_
        // we're on an HTTP page it's probably not so bad if we end up moving the
        // selection.
                try {
          selection.selectAllChildren(span);
          document.execCommand("copy");
        } finally {
          // Tidy up
          // It turns out Safari doesn't support Selection.removeRange anyway so we're
          // stuck dropping all the ranges even if we could create them.
          selection.removeAllRanges();
          span.remove();
        }
      }
    }
    // Detect if the primary input means is capable of hovering. If it is NOT
    // we show the puck by default.
    // e.g. if we're on a laptop device that has a touchpad or mouse we generally
    // _don't_ want to show the puck unless the user explicitly enables it.
    // For a smartphone or tablet, however, we want to show the puck by default.
    function getHoverCapabilityMql() {
      // The undefined case here is just for the sake of our unit tests.
      return window.matchMedia ? window.matchMedia("(hover: hover)") : void 0;
    }
    function getMouseCapabilityMql() {
      return window.matchMedia ? window.matchMedia("(hover: hover) and (pointer: fine)") : void 0;
    }
    // CONCATENATED MODULE: ./src/content/content-config.ts
    function _define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class ContentConfig {
      set(params) {
        const before = {};
        if (this.params) for (const key of Object.keys(params)) {
          const contentKey = key;
          if (typeof this[contentKey] === "undefined") continue;
          before[contentKey] = this[contentKey];
        }
        this.params = {
          ...params
        };
        const changes = [];
        const objectKeysWeCareAbout = [ "autoExpand", "puckState" ];
        for (const [key, value] of Object.entries(before)) {
          // We don't care about changes to most object-typed settings
          if (typeof value === "object") {
            if (objectKeysWeCareAbout.includes(key) && JSON.stringify(value) !== JSON.stringify(this[key])) changes.push({
              key,
              value: this[key]
            });
            continue;
          }
          if (this[key] !== value) changes.push({
            key,
            value: this[key]
          });
        }
        if (changes.length) this.notifyListeners(changes);
      }
      addListener(listener) {
        const hadListeners = this.listeners.length !== 0;
        if (!this.listeners.includes(listener)) this.listeners.push(listener);
        if (!hadListeners) {
          this.mouseCapabilityMql?.addEventListener("change", this.onMouseCapabilityChange);
          this.hoverCapabilityMql?.addEventListener("change", this.onHoverCapabilityChange);
        }
      }
      removeListener(listener) {
        const hadListeners = this.listeners.length !== 0;
        this.listeners = this.listeners.filter((l => l !== listener));
        if (hadListeners && this.listeners.length === 0) {
          this.mouseCapabilityMql?.removeEventListener("change", this.onMouseCapabilityChange);
          this.hoverCapabilityMql?.removeEventListener("change", this.onHoverCapabilityChange);
        }
      }
      notifyListeners(changes) {
        const listenersCopy = this.listeners.slice();
        for (const listener of listenersCopy) listener(changes);
      }
      get accentDisplay() {
        return this.params.accentDisplay;
      }
      get autoExpand() {
        return this.params.autoExpand;
      }
      get copyHeadwords() {
        return this.params.copyHeadwords;
      }
      get copyPos() {
        return this.params.copyPos;
      }
      get copySenses() {
        return this.params.copySenses;
      }
      get bunproDisplay() {
        return this.params.bunproDisplay;
      }
      get dictLang() {
        return this.params.dictLang;
      }
      get enableTapLookup() {
        return this.params.enableTapLookup;
      }
      get fx() {
        return this.params.fx;
      }
      get fontFace() {
        return this.params.fontFace;
      }
      get fontSize() {
        return this.params.fontSize;
      }
      get highlightStyle() {
        return this.params.highlightStyle;
      }
      get holdToShowKeys() {
        return this.params.holdToShowKeys;
      }
      get holdToShowImageKeys() {
        return this.params.holdToShowImageKeys;
      }
      get kanjiReferences() {
        return this.params.kanjiReferences;
      }
      get keys() {
        return this.params.keys;
      }
      get noTextHighlight() {
        return this.params.noTextHighlight;
      }
      get popupInteractive() {
        // Even if `this.params.popupInteractive` is false, if there's no mouse we
        // should force it to true.
        return this.params.popupInteractive || !this.mouseCapabilityMql;
      }
      get popupStyle() {
        return this.params.popupStyle;
      }
      get posDisplay() {
        return this.params.posDisplay;
      }
      get preferredUnits() {
        return this.params.preferredUnits;
      }
      get puckState() {
        return this.params.puckState;
      }
      get readingOnly() {
        return this.params.readingOnly;
      }
      set readingOnly(value) {
        this.params.readingOnly = value;
      }
      get showKanjiComponents() {
        return this.params.showKanjiComponents;
      }
      get showPriority() {
        return this.params.showPriority;
      }
      get showPuck() {
        return this.params.showPuck === "auto" ? this.canHover ? "hide" : "show" : this.params.showPuck;
      }
      get showRomaji() {
        return this.params.showRomaji;
      }
      get tabDisplay() {
        return this.params.tabDisplay;
      }
      get toolbarIcon() {
        return this.params.toolbarIcon;
      }
      get waniKaniVocabDisplay() {
        return this.params.waniKaniVocabDisplay;
      }
      // Extra computed properties
      get canHover() {
        return !!this.hoverCapabilityMql?.matches;
      }
      onMouseCapabilityChange() {
        // If this.params.popupInteractive is false then any change to the
        // mouseCapabilityMql will cause the computed value of `popupInteractive` to
        // change.
        if (!this.params.popupInteractive) this.notifyListeners([ {
          key: "popupInteractive",
          value: this.popupInteractive
        } ]);
      }
      onHoverCapabilityChange(event) {
        if (this.params.showPuck === "auto") this.notifyListeners([ {
          key: "showPuck",
          value: this.showPuck
        }, {
          key: "canHover",
          value: event.matches
        } ]);
      }
      constructor(params) {
        _define_property(this, "params", void 0);
        _define_property(this, "mouseCapabilityMql", getMouseCapabilityMql());
        _define_property(this, "hoverCapabilityMql", getHoverCapabilityMql());
        _define_property(this, "listeners", []);
        this.set(params);
        this.onMouseCapabilityChange = this.onMouseCapabilityChange.bind(this);
        this.onHoverCapabilityChange = this.onHoverCapabilityChange.bind(this);
      }
    }
    // CONCATENATED MODULE: ./src/common/priority-labels.ts
    const highPriorityLabels = [ "i1", "n1", "s1", "s2", "g1" ];
    // CONCATENATED MODULE: ./src/common/refs.ts
    const SUPPORTED_REFERENCES = [ 
    // The radical for the kanji (number and character, from rad field)
    "radical", 
    // Nelson radical (from rad field)
    "nelson_r", 
    // Kanji kentei (from misc field)
    "kk", 
    // WaniKani level (from misc field)
    "wk", 
    // Pinyin reading
    "py", 
    // JLPT level (from misc field)
    "jlpt", 
    // Unicode codepoint (generated)
    "unicode", 
    // Conning, The Kodansha Kanji Learner's Course
    "conning", 
    // New Japanese-English Character Dictionary
    "halpern_njecd", 
    // Learners Dictionary 2nd ed.
    "halpern_kkld_2ed", 
    // Remembering the Kanji (6th ed.)
    "heisig6", 
    // A Guide To Remembering Japanese Characters
    "henshall", 
    // Kanji and Kana (2011 edition)
    "sh_kk2", 
    // Japanese For Busy People vols I-III
    "busy_people", 
    // Kanji in Context by Nishiguchi and Kono
    "kanji_in_context", 
    // the Kodansha Compact Kanji Guide
    "kodansha_compact", 
    // Yves Maniette's "Les Kanjis dans la tete" French adaptation of Heisig
    // (Only included for lang:fr)
    "maniette", 
    // "Classic" Nelson - Modern Reader's Japanese-English Character Dictionary
    "nelson_c", 
    // The New Nelson Japanese-English Character Dictionary
    "nelson_n", 
    // Halpern's SKIP (System of Kanji Indexing by Patterns)
    "skip", 
    // Descriptor codes for The Kanji Dictionary
    "sh_desc" ];
    // Note that when adding or modifying labels here, it is important that the full
    // and short versions sort roughly the same so that they appear to be in
    // alphabetical order in both the popup (where we use the short form) and
    // options page (where we use the long form).
    // We sort by the short label, where available, which enables, for example,
    // showing an initial "The" in the long label but still sorting by the short
    // label (which does not include the "The"). Such exceptions aside, however, the
    // full and short versions should generally start with the same first few words.
    const REFERENCE_LABELS = {
      conning: {
        full: "Conning - Kodansha Kanji Learner's Course",
        short: "Conning",
        lang: "en"
      },
      sh_kk2: {
        full: "Kanji & Kana (Hadamitzky, Tuttle, 2011)",
        short: "Kanji & Kana",
        lang: "en"
      },
      halpern_njecd: {
        full: "Halpern - New Japanese-English Character Dictionary",
        short: "Halpern",
        lang: "en"
      },
      halpern_kkld_2ed: {
        full: "Kanji Learner's Dictionary (Halpbern, Kodansha, 2nd ed.)",
        short: "Kanji Learner's Dictionary",
        lang: "en"
      },
      heisig6: {
        full: "Heisig - Rembering the Kanji (6th ed.)",
        short: "Heisig",
        lang: "en"
      },
      henshall: {
        full: "Henshall - A Guide to Remembering Japanese Characters",
        short: "Henshall",
        lang: "en"
      },
      busy_people: {
        full: "Japanese for Busy People",
        lang: "en"
      },
      kanji_in_context: {
        full: "Kanji in Context",
        lang: "en"
      },
      kodansha_compact: {
        full: "Compact Kanji Guide (Kodansha)",
        short: "Compact Kanji Guide",
        lang: "en"
      },
      maniette: {
        full: "Les Kanjis dans la tete",
        lang: "fr"
      },
      nelson_c: {
        full: "Classic Nelson - Modern Reader's Japanese-English Character Dictionary",
        short: "Classic Nelson",
        lang: "en"
      },
      nelson_n: {
        full: "New Nelson Japanese-English Character Dictionary",
        short: "New Nelson",
        lang: "en"
      },
      py: {
        full: "Pinyin",
        lang: "en"
      },
      skip: {
        full: "SKIP",
        lang: "en"
      },
      sh_desc: {
        full: "The Kanji Dictionary (Spahn)",
        short: "Kanji Dictionary",
        lang: "en"
      },
      wk: {
        full: "WaniKani level",
        short: "WaniKani",
        lang: "en"
      }
    };
    function getSelectedReferenceLabels(selectedRefs, t) {
      const result = [];
      const selectedRefsSet = new Set(selectedRefs);
      for (const ref of SUPPORTED_REFERENCES) {
        if (!selectedRefsSet.has(ref)) continue;
        result.push({
          ref,
          ...getLabelForReference(ref, t)
        });
      }
      // Sort by short version first since this is what will be shown in the pop-up.
            result.sort(((a, b) => (a.short || a.full).localeCompare(b.short || b.full)));
      return result;
    }
    function getLabelForReference(ref, t) {
      const lang = t("lang_tag");
      switch (ref) {
       case "radical":
        return {
          full: t("ref_label_radical"),
          lang
        };

       case "nelson_r":
        return {
          full: t("ref_label_nelson_r"),
          lang
        };

       case "kk":
        return {
          full: t("ref_label_kk"),
          lang
        };

       case "jlpt":
        return {
          full: t("ref_label_jlpt"),
          lang
        };

       case "py":
        return {
          full: t("ref_label_py"),
          lang
        };

       case "unicode":
        return {
          full: t("ref_label_unicode"),
          lang
        };

       default:
        return REFERENCE_LABELS[ref];
      }
    }
    // CONCATENATED MODULE: ./src/content/reference-value.ts
    function getReferenceValue(entry, ref, t) {
      switch (ref) {
       case "nelson_r":
        // If the Nelson radical is empty, it means it's the same as the regular
        // radical so we should fall through to that branch.
        if (entry.rad.nelson) return `${entry.rad.nelson} ${String.fromCodePoint(entry.rad.nelson + 0x2eff)}`;

        // Fall through
               case "radical":
        {
          const {rad} = entry;
          const radChar = rad.base ? rad.base.b || rad.base.k : rad.b || rad.k;
          return `${rad.x} ${radChar}`;
        }

       case "kk":
        return renderKanKen(entry.misc.kk, t);

       case "jlpt":
        return entry.misc.jlpt ? String(entry.misc.jlpt) : "";

       case "py":
        return entry.r.py ? entry.r.py.join(", ") : "";

       case "unicode":
        return `U+${entry.c.codePointAt(0).toString(16).toUpperCase()}`;

       case "wk":
        return entry.misc.wk ? String(entry.misc.wk) : "";

       default:
        return entry.refs[ref] ? String(entry.refs[ref]) : "";
      }
    }
    function renderKanKen(level, t) {
      if (!level) return "\u2014";
      if (level === 15) return t("content_kanji_kentei_level_pre", [ "1" ]);
      if (level === 25) return t("content_kanji_kentei_level_pre", [ "2" ]);
      return t("content_kanji_kentei_level", [ String(level) ]);
    }
    // CONCATENATED MODULE: ./src/content/copy-text.ts
    function getTextToCopy({entry, copyType, getMessage, includeAllSenses = true, includeLessCommonHeadwords = true, includePartOfSpeech = true, kanjiReferences = [], showKanjiComponents = true}) {
      switch (copyType) {
       case "entry":
        return getEntryToCopy(entry, {
          getMessage,
          includeAllSenses,
          includeLessCommonHeadwords,
          includePartOfSpeech,
          kanjiReferences,
          showKanjiComponents
        });

       case "tab":
        return getFieldsToCopy(entry, {
          getMessage,
          includeAllSenses,
          includeLessCommonHeadwords,
          includePartOfSpeech,
          kanjiReferences,
          showKanjiComponents
        });

       case "word":
        return getWordToCopy(entry);
      }
    }
    function getWordToCopy(entry) {
      let result;
      switch (entry.type) {
       case "word":
        {
          let headwords = entry.data.k?.length ? entry.data.k.filter((k => !k.i?.includes("sK"))) : entry.data.r.filter((r => !r.i?.includes("sk")));
          // Only show matches -- unless our only matches were search-only
          // terms -- in which case we want to include all headwords.
                    if (headwords.some((h => h.match))) headwords = headwords.filter((entry => entry.match));
          result = headwords.map((entry => entry.ent)).join(", ");
        }
        break;

       case "name":
        result = (entry.data.k || entry.data.r).join(", ");
        break;

       case "kanji":
        result = entry.data.c;
        break;
      }
      return result;
    }
    function getEntryToCopy(entry, {getMessage, includeAllSenses = true, includeLessCommonHeadwords = true, includePartOfSpeech = true, kanjiReferences = [], showKanjiComponents = true}) {
      let result;
      switch (entry.type) {
       case "word":
        {
          const kanjiHeadwords = entry.data.k ? filterRelevantKanjiHeadwords(entry.data.k, {
            includeLessCommonHeadwords
          }).map((k => k.ent)) : [];
          const kanaHeadwords = filterRelevantKanaHeadwords(entry.data.r, {
            includeLessCommonHeadwords
          }).map((r => r.ent));
          result = kanjiHeadwords.length ? `${kanjiHeadwords.join(", ")} [${kanaHeadwords.join(", ")}]` : kanaHeadwords.join(", ");
          if (entry.data.romaji?.length) result += ` (${entry.data.romaji.join(", ")})`;
          result += (includeAllSenses ? "\n" : " ") + serializeDefinition(entry.data, {
            getMessage,
            includeAllSenses,
            includePartOfSpeech,
            oneSensePerLine: true
          });
        }
        break;

       case "name":
        result = entry.data.k ? `${entry.data.k.join(", ")} [${entry.data.r.join(", ")}]${includeAllSenses ? "\n" : " "}` : entry.data.r.join(", ") + (includeAllSenses ? "\n" : " ");
        for (const [i, tr] of entry.data.tr.entries()) {
          if (i) result += "; ";
          if (includePartOfSpeech && tr.type) result += `(${tr.type.join(", ")}) `;
          result += tr.det.join(", ");
        }
        break;

       case "kanji":
        {
          const {c, r, m, rad, comp} = entry.data;
          result = c;
          const readings = getKanjiReadings(entry.data);
          if (readings) result += ` [${readings}]`;
          if (r.na && r.na.length) result += ` (${r.na.join("\u3001")})`;
          result += ` ${m.join(", ")}`;
          const radicalLabel = getMessage("content_kanji_radical_label");
          result += `; ${radicalLabel}: ${rad.b || rad.k}\uff08${rad.na.join("\u3001")}\uff09`;
          if (rad.base) {
            const baseChar = rad.base.b || rad.base.k;
            const baseReadings = rad.base.na.join("\u3001");
            result += " " + getMessage("content_kanji_base_radical", [ baseChar, baseReadings ]);
          }
          if (showKanjiComponents && comp.length) {
            const componentsLabel = getMessage("content_kanji_components_label");
            const components = [];
            for (const component of comp) components.push(`${component.c} (${component.na.length ? component.na[0] + ", " : ""}${component.m.length ? component.m[0] : ""})`);
            result += `; ${componentsLabel}: ${components.join(", ")}`;
          }
          if (kanjiReferences.length) {
            const labels = getSelectedReferenceLabels(kanjiReferences, getMessage);
            for (const label of labels) {
              if (label.ref === "nelson_r" && !rad.nelson && kanjiReferences.includes("radical")) continue;
              result += `; ${label.short || label.full} ${getReferenceValue(entry.data, label.ref, getMessage) || "-"}`;
            }
          }
        }
        break;
      }
      return result;
    }
    const copy_text_highPriorityLabelsSet = new Set(highPriorityLabels);
    function filterRelevantKanjiHeadwords(headwords, {includeLessCommonHeadwords}) {
      if (includeLessCommonHeadwords) return headwords.filter((k => !k.i?.includes("sK")));
      const commonHeadwords = headwords.filter((k => !k.i?.includes("sK") && !k.i?.includes("rK")));
      const highPriorityHeadwords = commonHeadwords.filter((k => k.p?.some((p => copy_text_highPriorityLabelsSet.has(p)))));
      if (highPriorityHeadwords.length) return highPriorityHeadwords;
      const hasPriorityHeadwords = commonHeadwords.filter((k => k.p?.length));
      if (hasPriorityHeadwords.length) return hasPriorityHeadwords;
      return commonHeadwords;
    }
    function filterRelevantKanaHeadwords(headwords, {includeLessCommonHeadwords}) {
      if (includeLessCommonHeadwords) return headwords.filter((k => !k.i?.includes("sk")));
      const commonHeadwords = headwords.filter((k => !k.i?.includes("sk") && !k.i?.includes("rk")));
      const highPriorityHeadwords = commonHeadwords.filter((k => k.p?.some((p => copy_text_highPriorityLabelsSet.has(p)))));
      if (highPriorityHeadwords.length) return highPriorityHeadwords;
      const hasPriorityHeadwords = commonHeadwords.filter((k => k.p?.length));
      if (hasPriorityHeadwords.length) return hasPriorityHeadwords;
      return commonHeadwords;
    }
    function serializeDefinition(entry, {getMessage, includeAllSenses = true, includePartOfSpeech = true, oneSensePerLine = false}) {
      const senses = entry.s;
      if (senses.length > 1 && includeAllSenses) {
        const nativeSenses = senses.filter((s => s.lang && s.lang !== "en")).map((s => `\u2022 ${serializeSense(s, {
          getMessage,
          includePartOfSpeech
        })}`));
        const enSenses = senses.filter((s => !s.lang || s.lang === "en")).map(((s, index) => `(${index + 1}) ${serializeSense(s, {
          getMessage,
          includePartOfSpeech
        })}`));
        return [ ...nativeSenses, ...enSenses ].join(oneSensePerLine ? "\n" : " ");
      } else return serializeSense(senses[0], {
        getMessage,
        includePartOfSpeech
      });
    }
    // Match the formatting in Edict
        const dialects = {
      bra: "bra:",
      ho: "hob:",
      tsug: "tsug:",
      th: "thb:",
      na: "nab:",
      kt: "ktb:",
      ks: "ksb:",
      ky: "kyb:",
      os: "osb:",
      ts: "tsb:",
      "9s": "kyu:",
      ok: "rkb:"
    };
    function serializeSense(sense, {getMessage, includePartOfSpeech = true}) {
      let result = "";
      if (includePartOfSpeech && sense.pos) result += `(${sense.pos.join(",")}) `;
      result += sense.field ? `(${sense.field.join(",")}) ` : "";
      result += sense.misc ? `(${sense.misc.join(",")}) ` : "";
      result += sense.dial ? `(${sense.dial.map((dial => dial in dialects ? dialects[dial] : dial)).join(",")}) ` : "";
      const glosses = [];
      for (const g of sense.g) {
        let gloss = "";
        if (g.type && g.type !== "tm" && g.type !== "none") {
          const glossTypeStr = getMessage(`gloss_type_short_${g.type}`);
          if (glossTypeStr) gloss = `(${glossTypeStr}) `;
        }
        gloss += g.str;
        if (g.type === "tm") gloss += "\u2122";
        glosses.push(gloss);
      }
      result += glosses.join("; ");
      result += sense.lsrc ? ` (${sense.lsrc.map(serializeLangSrc).join(", ")})` : "";
      result += sense.inf ? ` (${sense.inf})` : "";
      return result;
    }
    function serializeLangSrc(lsrc) {
      const lang = lsrc.wasei ? "wasei" : lsrc.lang;
      const parts = [];
      if (lang) parts.push(lang);
      if (lsrc.src) parts.push(lsrc.src);
      return parts.join(": ");
    }
    function getFieldsToCopy(entry, {getMessage, includeAllSenses = true, includeLessCommonHeadwords = true, includePartOfSpeech = true, kanjiReferences = [], showKanjiComponents = true}) {
      let result;
      switch (entry.type) {
       case "word":
        result = entry.data.k ? filterRelevantKanjiHeadwords(entry.data.k, {
          includeLessCommonHeadwords
        }).map((k => k.ent)).join("; ") : "";
        result += "\t" + filterRelevantKanaHeadwords(entry.data.r, {
          includeLessCommonHeadwords
        }).map((r => r.ent)).join("; ");
        if (entry.data.romaji?.length) result += "\t" + entry.data.romaji.join("; ");
        result += "\t" + serializeDefinition(entry.data, {
          getMessage,
          includeAllSenses,
          includePartOfSpeech
        });
        break;

       case "name":
        {
          let definition = "";
          for (const [i, tr] of entry.data.tr.entries()) {
            if (i) definition += "; ";
            if (includePartOfSpeech && tr.type) definition += `(${tr.type.join(", ")}) `;
            definition += tr.det.join(", ");
          }
          // Split each kanji name out into a separate row
                    result = "";
          for (const [i, kanji] of (entry.data.k || [ "" ]).entries()) {
            if (i) result += "\n";
            result += `${kanji}\t${entry.data.r.join(", ")}\t${definition}`;
          }
        }
        break;

       case "kanji":
        {
          const {c, r, m, comp} = entry.data;
          result = c;
          const readings = getKanjiReadings(entry.data);
          result += `\t${readings}`;
          result += `\t${(r.na || []).join("\u3001")}`;
          result += `\t${m.join(", ")}`;
          if (showKanjiComponents) {
            const components = comp.map((comp => comp.c)).join("");
            result += `\t${components}`;
          }
          if (kanjiReferences.length) {
            const labels = getSelectedReferenceLabels(kanjiReferences, getMessage);
            for (const label of labels) 
            // For some common types we don't produce the label
            switch (label.ref) {
             case "radical":
             case "unicode":
             case "nelson_r":
              // All the above types also either always exist (radical,
              // unicode) or if they don't exist we want to produce an empty
              // value (not '-') hence why we don't include the ... || '-'
              // from the next block.
              result += "\t" + getReferenceValue(entry.data, label.ref, getMessage);
              break;

             default:
              result += `\t${label.short || label.full} ${getReferenceValue(entry.data, label.ref, getMessage) || "-"}`;
              break;
            }
          }
        }
        break;
      }
      return result;
    }
    function getKanjiReadings(kanji) {
      return [ ...kanji.r.on ? kanji.r.on : [], ...kanji.r.kun ? kanji.r.kun : [] ].join("\u3001");
    }
    // CONCATENATED MODULE: ./src/content/gdocs-canvas.ts
    function injectGdocsStyles() {
      removeGdocsStyles();
      const style = document.createElement("style");
      style.id = "tenten-gdocs-styles";
      style.textContent = `.kix-canvas-tile-selection { pointer-events: none }\n.kix-canvas-tile-content g rect[aria-label] { pointer-events: all }\n#tenten-gdocs-highlight {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 100;\n  opacity: 0.3;\n}\n#tenten-gdocs-highlight .box {\n  position: absolute;\n  pointer-events: none;\n  background-color: yellow;\n}\n#tenten-gdocs-highlight .box.blue {\n  background-color: #2698fb;\n}`;
      (document.head || document.documentElement).appendChild(style);
    }
    function removeGdocsStyles() {
      document.getElementById("tenten-gdocs-styles")?.remove();
    }
    function getTextFromAnnotatedCanvas({maxLength, point}) {
      const elem = document.elementFromPoint(point.x, point.y);
      if (!elem || !isGdocsSpan(elem)) return {
        position: null,
        text: ""
      };
      let text = elem.getAttribute("aria-label");
      if (!text) return {
        position: null,
        text: ""
      };
      const font = elem.getAttribute("data-font-css");
      if (!font) return {
        position: null,
        text: ""
      };
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return {
        position: null,
        text: ""
      };
      const docScale = getDocScale(elem);
      // Do a binary search to find the start of the string
            const xPos = point.x - elem.getBoundingClientRect().left;
      ctx.font = font;
      let start = 0;
      let end = text.length;
      while (start < end && Math.abs(end - start) > 1) {
        const mid = Math.floor((start + end) / 2);
        const width = ctx.measureText(text.substring(0, mid)).width * docScale;
        if (width > xPos) end = mid; else if (width < xPos) start = mid; else {
          start = mid;
          break;
        }
      }
      // If maxLength is not set, we just stop at the end of the current span.
      
      // If it _is_ set and we don't have enough characters, look up subsequent
      // spans.
            let currentSpan = elem;
      while (maxLength && text.substring(start).length < maxLength) {
        const nextSpan = currentSpan.nextSibling;
        if (!isGdocsSpan(nextSpan)) break;
        const remainingLength = maxLength - text.substring(start).length;
        text += nextSpan.getAttribute("aria-label")?.substring(0, remainingLength) || "";
        currentSpan = nextSpan;
      }
      return {
        position: {
          offset: start,
          offsetNode: elem
        },
        text
      };
    }
    function getDocScale(gdocsSpanElem) {
      const transform = gdocsSpanElem.getAttribute("transform");
      if (!transform) return 1;
      const matches = transform.match(/matrix\((.*)\)\s?/);
      if (!matches) return 1;
      const [, inner] = matches;
      const parts = inner.split(/\s*,\s*/);
      // We expect the document scale to be uniform (i.e. a =~ d) but we also happen
      // to know we only ever scale width (horizontal) values so we can just fetch
      // the horizontal scale value.
            if (!parts.length) return 1;
      const a = parseFloat(parts[0]);
      return a > 0 ? a : 1;
    }
    function isGdocsSpan(node) {
      return !!node && node.nodeType === Node.ELEMENT_NODE && node.namespaceURI === SVG_NS && node.tagName === "rect" && node.hasAttribute("aria-label");
    }
    function isGdocsOverlayElem(node) {
      return !!node && node.nodeType === Node.ELEMENT_NODE && node.namespaceURI === SVG_NS && (node.tagName === "g" || node.tagName === "rect");
    }
    function getGdocsRangeBboxes({startSpan, offset, length}) {
      const boxes = [];
      const text = startSpan.getAttribute("aria-label");
      if (!text) return boxes;
      const font = startSpan.getAttribute("data-font-css");
      if (!font) return boxes;
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return boxes;
      const docScale = getDocScale(startSpan);
      const {x, y: top, height} = startSpan.getBoundingClientRect();
      ctx.font = font;
      const leadingWidth = offset ? ctx.measureText(text.substring(0, offset)).width * docScale : 0;
      const width = ctx.measureText(text.substring(offset, offset + length)).width * docScale;
      boxes.push({
        left: x + leadingWidth,
        top,
        width,
        height
      });
      let currentSpan = startSpan;
      let accumulatedLength = text.length - offset;
      while (accumulatedLength < length) {
        if (!isGdocsSpan(currentSpan.nextSibling)) break;
        currentSpan = currentSpan.nextSibling;
        const text = currentSpan.getAttribute("aria-label");
        const font = currentSpan.getAttribute("data-font-css");
        if (!text || !font) continue;
        const lengthToMeasure = Math.min(length - accumulatedLength, text.length);
        accumulatedLength += lengthToMeasure;
        const {x: left, y: top, height} = currentSpan.getBoundingClientRect();
        ctx.font = font;
        const width = ctx.measureText(text.substring(0, lengthToMeasure)).width * docScale;
        boxes.push({
          left,
          top,
          width,
          height
        });
      }
      return boxes;
    }
    function highlightGdocsRange({startSpan, offset, length, style}) {
      let highlightContainer = document.getElementById("tenten-gdocs-highlight");
      if (highlightContainer) dom_utils_empty(highlightContainer);
      const boxes = getGdocsRangeBboxes({
        startSpan,
        offset,
        length
      });
      if (!boxes.length) return;
      if (!highlightContainer) {
        highlightContainer = document.createElement("div");
        highlightContainer.id = "tenten-gdocs-highlight";
        const parent = document.querySelector(".kix-appview-editor") || document.body;
        parent.append(highlightContainer);
      }
      const containerBbox = highlightContainer.getBoundingClientRect();
      for (const box of boxes) {
        const boxElem = document.createElement("div");
        boxElem.classList.add("box");
        boxElem.classList.toggle("blue", style === "blue");
        boxElem.style.left = `${box.left - containerBbox.left}px`;
        boxElem.style.top = `${box.top - containerBbox.top}px`;
        boxElem.style.width = `${box.width}px`;
        boxElem.style.height = `${box.height}px`;
        highlightContainer.append(boxElem);
      }
    }
    function clearGdocsHighlight() {
      document.getElementById("tenten-gdocs-highlight")?.remove();
    }
    // CONCATENATED MODULE: ./src/content/get-copy-entry.ts
    function getCopyEntryFromResult({series, result, index}) {
      // Get the actual index to use.
      let numberOfCopyableEntries;
      if (series === "words") {
        const {namePreview} = result;
        numberOfCopyableEntries = (namePreview?.names.length ?? 0) + (result.words?.data.length ?? 0);
      } else if (series === "names") numberOfCopyableEntries = result.names?.data.length ?? 0; else if (series === "kanji") numberOfCopyableEntries = result.kanji?.data.length ?? 0;
      if (!numberOfCopyableEntries) return null;
      const wrappedIndex = index % numberOfCopyableEntries;
      // Find the corresponding entry
            if (series === "words") {
        const {namePreview} = result;
        const namesLength = namePreview?.names.length ?? 0;
        const inNamePreviewRange = wrappedIndex < namesLength;
        if (inNamePreviewRange) return {
          type: "name",
          data: namePreview.names[wrappedIndex]
        };
        return result.words ? {
          type: "word",
          data: result.words.data[wrappedIndex - namesLength]
        } : null;
      } else if (series === "names") return result.names ? {
        type: "name",
        data: result.names.data[wrappedIndex]
      } : null; else if (series === "kanji") return result.kanji ? {
        type: "kanji",
        data: result.kanji.data[wrappedIndex]
      } : null;
      return null;
    }
    // CONCATENATED MODULE: ./src/utils/range.ts
    /**
 * Gets a Range for a single codepoint given a character offset and optional
 * direction.
 */
    function getRangeForSingleCodepoint({source, offset, direction = "forwards"}) {
      // Adjust the offset if it's in the middle of a surrogate pair.
      if (direction === "forwards" && offset < source.data.length && isLowSurrogate(source.data.charCodeAt(offset))) if (offset < source.data.length - 1) offset++; else offset--; else if (direction === "backwards" && offset > 0 && isHighSurrogate(source.data.charCodeAt(offset - 1))) offset++;
      let end;
      if (direction === "forwards") 
      // If the offset is at the start of a surrogate pair, we need to include
      // the low surrogate as well.
      if (offset >= source.data.length) end = offset; else if (isHighSurrogate(source.data.charCodeAt(offset))) end = offset + 2; else end = offset + 1; else if (offset <= 0) end = offset; else if (isLowSurrogate(source.data.charCodeAt(offset - 1))) end = offset - 2; else end = offset - 1;
      const range = new Range;
      range.setStart(source, Math.max(Math.min(offset, end, source.data.length), 0));
      range.setEnd(source, Math.min(Math.max(offset, end, 0), source.data.length));
      return range;
    }
    function isLowSurrogate(codepoint) {
      return codepoint >= 0xdc00 && codepoint <= 0xdfff;
    }
    function isHighSurrogate(codepoint) {
      return codepoint >= 0xd800 && codepoint <= 0xdbff;
    }
    function getBboxForSingleCodepointRange(range) {
      // In Safari when a range is at the start of a line, getClientRects()
      // returns two bounding boxes: an empty (zero-width) one at the end of the
      // line and a non-empty one for the first character at the start of the line.
      // Worse still, getBoundingClientRect() returns the union of the two producing
      // a massive (and very wrong) bounding box.
      // Here we get the individual client rects and then return the widest one.
      return [ ...range.getClientRects() ].reduce(((result, bbox) => (result?.width || 0) >= bbox.width ? result : bbox), void 0);
    }
    // CONCATENATED MODULE: ./src/content/content-type.ts
    function getContentType(elem) {
      return [ "IMG", "PICTURE", "VIDEO" ].includes(elem.tagName) ? "image" : "text";
    }
    // CONCATENATED MODULE: ./src/content/popup/popup-container.ts
    function getPopupContainer() {
      const hostElem = document.getElementById("tenten-ja-window");
      return hostElem && hostElem.shadowRoot ? hostElem.shadowRoot.querySelector(".container") : null;
    }
    function isPopupWindowHostElem(target) {
      return target instanceof HTMLElement && target.id === "tenten-ja-window";
    }
    // CONCATENATED MODULE: ./src/content/scroll-offset.ts
    function getScrollOffset() {
      // If we're in full screen mode, we should use the scroll position of the
      // full-screen element (which is always zero?).
      if (document.fullscreenElement) return {
        scrollX: document.fullscreenElement.scrollLeft,
        scrollY: document.fullscreenElement.scrollTop
      };
      const {scrollX, scrollY} = document.defaultView;
      return {
        scrollX,
        scrollY
      };
    }
    function toPageCoords(screen, scrollOffset) {
      const {scrollX, scrollY} = scrollOffset || getScrollOffset();
      // The following is a mess because Typescript doesn't do narrow for generics
      // yet: https://github.com/microsoft/TypeScript/issues/33014
            if (isPoint(screen)) return {
        x: screen.x + scrollX,
        y: screen.y + scrollY
      }; else return {
        left: screen.left + scrollX,
        top: screen.top + scrollY,
        width: screen.width,
        height: screen.height
      };
    }
    function toScreenCoords(page, scrollOffset) {
      const {scrollX, scrollY} = scrollOffset || getScrollOffset();
      if (isPoint(page)) return {
        x: page.x - scrollX,
        y: page.y - scrollY
      }; else return {
        left: page.left - scrollX,
        top: page.top - scrollY,
        width: page.width,
        height: page.height
      };
    }
    function isPoint(pointOrRect) {
      // Sometimes we get Rect-like things that have an 'x' and 'y' member on them
      // so it's better to test the input is _not_ a rect.
      return typeof pointOrRect.width !== "number";
    }
    // CONCATENATED MODULE: ./src/content/get-cursor-position.ts
    /**
 * Wrapper around document.caretPositionFromPoint / document.caretRangeFromPoint
 * that works around browser inconsistencies and bugs and digs into elements
 * that otherwise would be hidden or unselectable.
 */
    function getCursorPosition({point, elements: initialElements}) {
      if (!initialElements.length) return null;
      // Do an initial lookup
            const initialResult = getCursorPositionForElement({
        point,
        element: initialElements[0]
      });
      // Check if our initial result is good enough
            if (isTextNodePosition(initialResult) || isTextInputPosition(initialResult) || isGdocsOverlayPosition(initialResult)) return initialResult;
      // Otherwise see if we can get a better result by disabling pointer-events on
      // any transparent elements from the hit list and checking again.
            const stylesToRestore = new Map;
      try {
        const elements = [ ...initialElements ];
        let firstElement = true;
        for (let element = elements.shift(); element; element = elements.shift(), firstElement = false) {
          // Skip elements without a style attribute (since we have no easy way to
          // toggle their pointer-events state).
          if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) continue;
          // Skip elements that are already visible
          
          // We need special handling here to account for "covering links".
          
          // Normally we can just check if the current element is invisible or not
          // but for asahi.com we have a special case where it effectively makes the
          // covering content invisible by setting the dimensions of a _child_
          // element to 1x1.
          
          // To detect that case we check for a non-auto z-index since that has
          // proven to be the most reliable indicator of this pattern. If we simply
          // decide to treat the element as invisible whenever its bounding box
          // doesn't line up, we'll run this too often and cause a performance
          // regression when the the cursor is moving around empty space on the Web
          // page.
          
          // We only do this for the initial lookup for now because so far that's
          // proved sufficient (and is probably cheaper than trying to perform this
          // check on every element in the hit list).
                    const treatElementAsInvisible = firstElement && getComputedStyle(element).zIndex !== "auto";
          if (!treatElementAsInvisible && isVisible(element)) continue;
          // Temporarily turn off pointer-events on the (invisible) element
                    stylesToRestore.set(element, element.getAttribute("style"));
          element.style.setProperty("pointer-events", "none", "important");
          // See if we get a better result now
                    const result = getCursorPositionForElement({
            point,
            element
          });
          if (isTextNodePosition(result) || isTextInputPosition(result)) return result;
        }
      } finally {
        restoreStyles(stylesToRestore);
      }
      // We didn't find anything better by toggling pointer-events, so use the
      // original result.
            return initialResult;
    }
    function isTextNodePosition(position) {
      return !!position && isTextNode(position.offsetNode);
    }
    function isTextInputPosition(position) {
      return !!position && isTextInputNode(position.offsetNode);
    }
    function isGdocsOverlayPosition(position) {
      return !!position && document.location.host === "docs.google.com" && isGdocsOverlayElem(position.offsetNode);
    }
    function getElementForPosition(position) {
      return position?.offsetNode?.nodeType === Node.ELEMENT_NODE ? position.offsetNode : position?.offsetNode?.parentElement || null;
    }
    function getCursorPositionForElement({point, element}) {
      // Lookup point
      let position = get_cursor_position_lookupPoint({
        point,
        element
      });
      // If the position is in a text input element or Google Docs element return it
      // immediately.
            if (isTextInputPosition(position)) 
      // For a textarea we still need to check it overlaps since at least in
      // Firefox, if it is display: block, caretPositionFromPoint might return it
      // even when the point is outside the element.
      // And although we've never encountered such a case, we should probably
      // check that the element is visible too.
      return positionIntersectsPoint(position, point) && isVisible(position.offsetNode) ? position : null;
      // For Google Docs, presumably the element is overlapping and visible.
            if (isGdocsOverlayPosition(position)) return position;
      // If we have any other kind of node, see if we need to override the
      // user-select style to get a better result.
      
      // This addresses two issues:
      
      // 1. In Firefox, content with `user-select: all` will cause
      //    caretPositionFromPoint to return the parent element.
      
      // 2. In Safari, content with `-webkit-user-select: none` will not be found by
      //    caretRangeFromPoint.
      
            if (!isTextNodePosition(position)) {
        const userSelectResult = lookupPointWithNormalizedUserSelect({
          point,
          element
        });
        // If we got back a text node, prefer it to our previous result
                if (isTextNodePosition(userSelectResult)) position = userSelectResult;
      }
      // Check that the element intersects the point
      
      // This can happen when the Web page sets the geometry of the element we
      // picked up in a way that hides it (see the extended comment before
      // `positionIntersectsPoint` for details).
            if (position && !positionIntersectsPoint(position, point)) return null;
      // Check that the position is close to the lookup point since sometimes
      // due to line-wrapping etc. caretPositionFromPoint can return a point far
      // away from the cursor.
            if (isTextNodePosition(position) && !isResultCloseToPoint(position, point)) return null;
      // Check that the element is visible
            const positionElement = getElementForPosition(position);
      if (positionElement && !isVisible(positionElement)) return null;
      return position;
    }
    function isVisible(element) {
      // Use the checkVisibility API when available
      if ("checkVisibility" in element) return element.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true
      });
      const {opacity, visibility} = getComputedStyle(element);
      return opacity !== "0" && visibility !== "hidden";
    }
    function get_cursor_position_lookupPoint({point, element}) {
      const position = getCaretPosition({
        point,
        element
      });
      if (!position) return null;
      if (isTextNodePosition(position) && position.offset) position.offset = getVisualOffset({
        position,
        point
      });
      return position;
    }
    function getCaretPosition({point, element}) {
      if (typeof document.caretPositionFromPoint === "function") {
        const shadowRoots = getDescendantShadowRoots(element);
        const position = document.caretPositionFromPoint(point.x, point.y, {
          shadowRoots
        });
        return position?.offsetNode ? {
          offset: position.offset,
          offsetNode: position.offsetNode
        } : null;
      }
      return caretRangeFromPoint({
        point,
        element
      });
    }
    // If the cursor is more than half way across a character,
    // caretPositionFromPoint will choose the _next_ character since that's where
    // the cursor would be placed if you clicked there and started editing the
    // text.
    
    // (Or something like that, it looks like when editing it's more like if the
    // character is 70% or so of the way across the character it inserts before
    // the next character. In any case, caretPositionFromPoint et. al appear to
    // consistently choose the next character after about the 50% mark in at least
    // Firefox and Chromium.)
    
    // For _looking up_ text, however, it's more intuitive if we look up starting
    // from the character you're pointing at.
    
    // Here we see if the point is within the bounding box of the _previous_
    // character in the inline direction and, if it is, start from there instead.
        function getVisualOffset({position, point}) {
      const range = getRangeForSingleCodepoint({
        source: position.offsetNode,
        offset: position.offset,
        direction: "backwards"
      });
      const previousCharacterBbox = getBboxForSingleCodepointRange(range);
      return previousCharacterBbox && bboxIncludesPoint({
        bbox: previousCharacterBbox,
        point
      }) ? range.startOffset : position.offset;
    }
    function lookupPointWithNormalizedUserSelect({point, element}) {
      const stylesToRestore = new Map;
      let currentElem = element;
      while (currentElem) {
        // If the element doesn't have a style attribute we can't override it
        if (!(currentElem instanceof HTMLElement) && !(currentElem instanceof SVGElement)) {
          currentElem = currentElem.parentElement;
          continue;
        }
        const {userSelect, webkitUserSelect} = getComputedStyle(currentElem);
        const ok = [ "auto", "text", "" ];
        if (!ok.includes(userSelect) || !ok.includes(webkitUserSelect)) {
          stylesToRestore.set(currentElem, currentElem.getAttribute("style"));
          // We set the styles directly on the element (as opposed to temporarily
          // installing a stylesheet) since this should work better on shadow DOM
          // elements.
                    currentElem.style.setProperty("user-select", "text", "important");
          currentElem.style.setProperty("-webkit-user-select", "text", "important");
        }
        currentElem = currentElem.parentElement;
      }
      if (!stylesToRestore.size) return null;
      // Look up again
            const result = get_cursor_position_lookupPoint({
        point,
        element
      });
      restoreStyles(stylesToRestore);
      return result;
    }
    function restoreStyles(styles) {
      for (const [elem, style] of styles) if (style) elem.setAttribute("style", style); else elem.removeAttribute("style");
    }
    // --------------------------------------------------------------------------
    
    // Intersection checking
    
    // --------------------------------------------------------------------------
    // Check that the element's bounding box encapsulates the point, roughly.
    
    // This is needed for at least two cases:
    
    // 1) When the cursor is between two paragraphs. In that case the distance
    //    check below is not sufficient since we'll still be fairly close to the
    //    text we picked up (perhaps we should make the distance check based on
    //    the writing mode?).
    
    // 2) For the "covering link" case found on sites like asahi.com which have
    //    a structure like the following:
    
    //    <div>
    //      <a href="/articles/" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1">
    //        <span aria-hidden="true" style="display: block; width: 1px; height: 1px; overflow: hidden">
    //          あいうえお
    //        </span>
    //      </a>
    //    </div>
    //    <div>
    //      <div style="position: relative; width: 100%">
    //        <h2 style="z-index: auto">
    //          <a href="/articles/" id="innerLink">
    //            あいうえお
    //          </a>
    //        </h2>
    //      </div>
    //    </div>
    
    //    In this case caretPositionFromPoint will return a position inside the
    //    first <span> (inside the "covering link") but that span is effectively
    //    made invisible by giving it a width and height of 1px.
    
    //    We need to reject that result so we have a chance to look for the text
    //    in the covered <div> (the second <a> element).
        function positionIntersectsPoint(position, point) {
      const bbox = getBboxForPosition(position);
      return !bbox || bboxIncludesPoint({
        bbox,
        margin: 5,
        point
      });
    }
    function getBboxForPosition(position) {
      const node = position.offsetNode;
      if (isTextNode(node)) {
        const range = new Range;
        range.selectNode(node);
        return range.getBoundingClientRect();
      }
      if (isElement(node)) {
        if (getComputedStyle(node).display === "contents") return getBboxForNodeList(node.childNodes);
        return node.getBoundingClientRect();
      }
      return null;
    }
    // --------------------------------------------------------------------------
    
    // Distance checking
    
    // --------------------------------------------------------------------------
        function isResultCloseToPoint(position, point) {
      const distanceResult = getDistanceFromTextNode(position, point);
      // We should be within the space of about three characters
            return !distanceResult || distanceResult.distance <= distanceResult.glyphExtent * 3;
    }
    function getDistanceFromTextNode(position, point) {
      const {offsetNode: node, offset} = position;
      if (!node.parentElement) return null;
      // Ignore SVG content (it doesn't normally need distance checking).
            if (node.parentElement.namespaceURI === SVG_NS) return null;
      // Get bbox of first character in range (since that's where we select from).
            const range = getRangeForSingleCodepoint({
        source: node,
        offset
      });
      const bbox = getBboxForSingleCodepointRange(range);
      if (!bbox) return null;
      // Find the distance from the cursor to the closest edge of that character
      // since if we have a large font size the two distances could be quite
      // different.
            const xDist = Math.min(Math.abs(point.x - bbox.left), Math.abs(point.x - bbox.right));
      const yDist = Math.min(Math.abs(point.y - bbox.top), Math.abs(point.y - bbox.bottom));
      const distance = Math.sqrt(xDist * xDist + yDist * yDist);
      const glyphExtent = Math.sqrt(bbox.width * bbox.width + bbox.height * bbox.height);
      return {
        distance,
        glyphExtent
      };
    }
    // --------------------------------------------------------------------------
    
    // caretRangeFromPoint helpers
    
    // --------------------------------------------------------------------------
    /**
 * Wrapper for document.caretRangeFromPoint that fixes some deficiencies when
 * compared with caretPositionFromPoint (at least with regards to the Firefox
 * implementation of caretPositionFromPoint).
 */    function caretRangeFromPoint({point, element, limitToDescendants = false}) {
      // Special handling for text boxes.
      // 1. In Chromium, caretRangeFromPoint doesn't return text input elements.
      //    Instead it returns one of their ancestors.
      // 2. In WebKit, caretRangeFromPoint returns text input elements, but always
      //    sets the offset to 0.
      if (isTextInputNode(element)) return getCursorPositionFromTextInput({
        input: element,
        point
      });
      let range = document.caretRangeFromPoint(point.x, point.y);
      if (!range || // Normally we don't perform a lookup if we detect a pointermove event over
      // the popup window, but when using the puck we allow it as otherwise when
      // the puck pointer passes over the window, we'll fail to dismiss it.
      isPopupWindowHostElem(range.startContainer) || limitToDescendants && !element.contains(range.startContainer)) return null;
      // Unlike `document.caretPositionFromPoint` in Gecko,
      // `document.caretRangeFromPoint` in Blink/WebKit doesn't dig into shadow DOM
      // so we need to do it manually.
            range = expandShadowDomInRange({
        range,
        point
      });
      // Check if we are now pointing at an input text node.
            if (isTextInputNode(range.startContainer)) return getCursorPositionFromTextInput({
        input: range.startContainer,
        point
      });
      // Range adjustment for Safari
            range = adjustForRangeBoundary({
        range,
        point
      });
      return range ? {
        offsetNode: range.startContainer,
        offset: range.startOffset
      } : null;
    }
    /**
 * Helper for caretRangeFromPoint to look up text input elements.
 */    function getCursorPositionFromTextInput({input, point}) {
      // Empty input elements
      if (!input.value.trim().length) return null;
      // This is only called when the platform APIs failed to give us the correct
      // result so we need to synthesize an element with the same layout as the
      // text area, read the text position, then drop it.
      
      // We currently only expect to use it together with caretRangeFromPoint since
      // caretPositionFromPoint should look up text inputs correctly.
            if (!("caretRangeFromPoint" in document)) throw new Error("caretRangeFromPoint not available");
      // Create the element
            const mirrorElement = createMirrorElement(input, input.value);
      // Read the offset
      
      // We need to be careful not to allow caretRangeFromPoint to visit elements
      // outside the mirror element or else we can end up in a case of infinite
      // recursion where we pick up the same input element all over again.
      
      // We _could_ just call `document.caretRangeFromPoint` here which would avoid
      // recursion but then we'd miss out on the position adjustment we do in
      // `caretRangeFromPoint` (which maybe would be ok? It's what we do for shadow
      // DOM after all?).
            const result = caretRangeFromPoint({
        point,
        element: mirrorElement,
        limitToDescendants: true
      });
      if (result) {
        // Adjust the offset before we drop the mirror element
        if (isTextNodePosition(result)) result.offset = getVisualOffset({
          position: result,
          point
        });
        result.offsetNode = input;
      }
      // Drop the element
            mirrorElement.remove();
      return result;
    }
    function createMirrorElement(source, text) {
      // Create the element
      const mirrorElement = html("div");
      // Fill in the text/child content
            if (text !== void 0) mirrorElement.append(text); else {
        // If we don't have a specific string to use, we duplicate all the source
        // element's children.
        // Often we'll know which `Text` child of the source element we're
        // interested in but unfortunately it's not enough to duplicate that one
        // `Text` child in isolation since it could appear amongst other inline
        // siblings and if we don't duplicate them, it won't get the correct
        // position.
        // We _can_ get the position of the text node, but it might wrap over
        // several lines and we need to duplicate that wrapping too in order to get
        // the correct positioning.
        // We can get the bbox for each line via getClientRects() but we don't know
        // what _characters_ are in each box.
        // In order to do that we'd probably need to make up many ranges and bisect
        // them until we could assign characters to boxes but that's quite involved
        // so currently we just duplicate all the descendant elements.
        // That has some limitations such as not being able to reproduce
        // pseudo-elements so in future we probably should attempt to get just the
        // text and bounding box for the range we're interested in and reproducing
        // that.
        // For now, however, this approach of duplicating all the descendants works
        // for all the content we've encountered.
        const childNodes = source.shadowRoot ? source.shadowRoot.childNodes : source.childNodes;
        for (const child of childNodes) mirrorElement.append(cloneNodeWithStyles(child));
      }
      // Set its styles to be the same
            const cs = document.defaultView.getComputedStyle(source);
      const stylesToSet = {};
      for (let i = 0; i < cs.length; i++) {
        const prop = cs.item(i);
        stylesToSet[prop] = cs.getPropertyValue(prop);
      }
      for (const [name, value] of Object.entries(stylesToSet)) mirrorElement.style.setProperty(name, value);
      // Special handling for Chromium which does _not_ include the scrollbars in
      // the width/height when box-sizing is 'content-box'.
            if (isChromium() && cs.boxSizing === "content-box") {
        const {paddingLeft, paddingRight, paddingTop, paddingBottom} = cs;
        const {borderLeftWidth, borderRightWidth, borderTopWidth, borderBottomWidth} = cs;
        const width = source.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight) - parseFloat(borderLeftWidth) - parseFloat(borderRightWidth);
        if (Number.isFinite(width)) mirrorElement.style.width = `${width}px`;
        const height = source.offsetHeight - parseFloat(paddingTop) - parseFloat(paddingBottom) - parseFloat(borderTopWidth) - parseFloat(borderBottomWidth);
        if (Number.isFinite(height)) mirrorElement.style.height = `${height}px`;
      }
      // Set its position in the document to be to be the same
            mirrorElement.style.position = "absolute";
      const bbox = source.getBoundingClientRect();
      // Fetch the top/left coordinates, bearing in mind that the bbox returned by
      // getBoundingClientRect is the position exclusive of margins and is in screen
      // coordinates.
            const marginTop = parseFloat(cs.marginTop);
      const marginLeft = parseFloat(cs.marginLeft);
      const screenPoint = {
        x: bbox.left - marginLeft,
        y: bbox.top - marginTop
      };
      const {x: left, y: top} = toPageCoords(screenPoint);
      mirrorElement.style.top = top + "px";
      mirrorElement.style.left = left + "px";
      // Finally, make sure our element is on top
            mirrorElement.style.zIndex = "2147483647";
      // Append the element to the document. We need to do this before adjusting
      // the scroll offset or else it won't update.
            document.documentElement.appendChild(mirrorElement);
      // Match the scroll position
            const {scrollLeft, scrollTop} = source;
      mirrorElement.scrollTo(scrollLeft, scrollTop);
      return mirrorElement;
    }
    function cloneNodeWithStyles(node) {
      if (!isElement(node) || !(node instanceof HTMLElement) && !(node instanceof SVGElement)) return node.cloneNode(true);
      const clone = node.cloneNode(false);
      const cs = document.defaultView.getComputedStyle(node);
      const stylesToSet = {};
      for (let i = 0; i < cs.length; i++) {
        const prop = cs.item(i);
        stylesToSet[prop] = cs.getPropertyValue(prop);
      }
      for (const [name, value] of Object.entries(stylesToSet)) clone.style.setProperty(name, value);
      for (const child of node.childNodes) clone.appendChild(cloneNodeWithStyles(child));
      return clone;
    }
    // --------------------------------------------------------------------------
    
    // Shadow DOM helpers
    
    // --------------------------------------------------------------------------
        function expandShadowDomInRange({range, point}) {
      if (!isElement(range.startContainer)) return range;
      // Get the shadowRoot at the given point, if any.
      
      // (This is complicated by the fact in Blink, `caretRangeFromPoint` seems to
      // return the _parent_ of elements with a shadow root.)
            const shadowRoot = getShadowRoot({
        element: range.startContainer,
        point
      });
      if (!shadowRoot) return range;
      // See if we can find a shadow element at the given point
            const shadowNode = getShadowNodeAtPoint({
        shadowRoot,
        point
      });
      if (!shadowNode || shadowNode === range.startContainer) return range;
      // If we got a text input element, return it as a range
            if (isTextInputNode(shadowNode)) {
        const range = new Range;
        range.setStart(shadowNode, 0);
        range.setEnd(shadowNode, 0);
        return range;
      }
      // Text nodes require special handling since we want to use the styles from
      // the host with the text from the shadow DOM.
            if (isTextNode(shadowNode)) {
        // We should only get a text node if it's the direct child of a shadow root
        // (but that might not be the same shadow root as `shadowRoot` above).
        const localShadowRoot = shadowNode.getRootNode();
        const host = localShadowRoot instanceof ShadowRoot ? localShadowRoot.host : null;
        if (!(host instanceof HTMLElement)) return range;
        const shadowRange = getRangeForShadowTextNode({
          shadowContainer: host,
          text: shadowNode,
          point
        });
        return shadowRange || range;
      }
      const shadowRange = getRangeForShadowElement({
        shadowElement: shadowNode,
        point
      });
      return shadowRange || range;
    }
    // In Chrome, `caretRangeFromPoint` will return the _parent_ element of a shadow
    // DOM host so we need to dig down to find the _child_ node with the shadowRoot,
    // if any.
        function getShadowRoot({element, point}) {
      if (element.shadowRoot) return element.shadowRoot;
      for (const child of element.children) {
        const {shadowRoot} = child;
        if (!shadowRoot) continue;
        // Get the bbox of the child to check that it overlaps the point but bear in
        // mind that custom elements are often marked as display: contents.
                const bbox = getBboxForShadowHost(child);
        if (!bbox) continue;
        // Only return a child shadowRoot if it actually overlaps the point
                if (shadowRoot && bboxIncludesPoint({
          bbox,
          point
        })) return shadowRoot;
      }
      return null;
    }
    function getDescendantShadowRoots(root) {
      const shadowRoots = [];
      function traverse(element) {
        if (element.shadowRoot) {
          shadowRoots.push(element.shadowRoot);
          for (const child of element.shadowRoot.children) traverse(child);
        }
        for (const child of element.children) traverse(child);
      }
      traverse(root);
      return shadowRoots;
    }
    function getBboxForShadowHost(element) {
      // For display: contents, `getBoundingClientRect()` will return an empty
      // bounding box so we need to return the contents of the shadow root instead.
      if (getComputedStyle(element).display === "contents") return getBboxForNodeList(element.shadowRoot.childNodes);
      return element.getBoundingClientRect();
    }
    function getShadowNodeAtPoint({shadowRoot, point}) {
      // elementsFromPoint can only detect _elements_ but shadow roots can have Text
      // nodes as children so first look for any direct Text children whose tight
      // bounding box fits.
      const textChildren = [ ...shadowRoot.childNodes ].filter(isTextNode);
      for (const child of textChildren) {
        const range = new Range;
        range.selectNode(child);
        const bboxes = range.getClientRects();
        if ([ ...bboxes ].some((bbox => bboxIncludesPoint({
          bbox,
          point
        })))) return child;
      }
      // Find the first visible element in the shadow tree under the cursor
            const hitElements = shadowRoot.elementsFromPoint(point.x, point.y);
      const hitElement = hitElements.find((elem => (getComputedStyle(elem).display === "contents" || isVisible(elem)) && shadowRoot.contains(elem)));
      // Recursively visit shadow roots
            const nestedShadowRoot = hitElement ? getShadowRoot({
        element: hitElement,
        point
      }) : null;
      if (nestedShadowRoot) return getShadowNodeAtPoint({
        shadowRoot: nestedShadowRoot,
        point
      });
      return hitElement || null;
    }
    function getRangeForShadowTextNode({shadowContainer, text, point}) {
      if (!text.data.trim().length) return null;
      // Make up a mirror element in the light DOM that we can run
      // `document.caretRangeFromPoint` on.
            const mirrorElement = createMirrorElement(shadowContainer);
      const newRange = document.caretRangeFromPoint(point.x, point.y);
      if (!newRange || !mirrorElement.contains(newRange.startContainer)) {
        mirrorElement.remove();
        return null;
      }
      // We need to store the offset before removing the mirror element or else
      // the range will be updated
            const offset = newRange.startOffset;
      mirrorElement.remove();
      const shadowRange = new Range;
      shadowRange.setStart(text, offset);
      shadowRange.setEnd(text, offset);
      return shadowRange;
    }
    function getRangeForShadowElement({shadowElement, point}) {
      // Check if the element has text
      if (!(shadowElement instanceof HTMLElement) || !(shadowElement.textContent || "").trim().length) return null;
      // Get the block ancestor, since inline children might be split over several
      // lines.
            let blockAncestor = shadowElement;
      while (blockAncestor && blockAncestor.parentElement && [ "inline", "ruby", "contents", "inline flow" ].includes(getComputedStyle(blockAncestor).display)) blockAncestor = blockAncestor.parentElement;
      // Make up a mirror element in the light DOM that we can run
      // `document.caretRangeFromPoint` on.
            const mirrorElement = createMirrorElement(blockAncestor);
      const newRange = document.caretRangeFromPoint(point.x, point.y);
      if (!newRange || !mirrorElement.contains(newRange.startContainer)) {
        mirrorElement.remove();
        return null;
      }
      // Translate the range in the light DOM to the one in the shadow DOM
            const path = [];
      for (let node = newRange.startContainer, depth = 0; node.parentElement && node !== mirrorElement && depth < 10; node = node.parentElement, 
      depth++) {
        const index = [ ...node.parentElement.childNodes ].indexOf(node);
        path.unshift(index);
      }
      // We need to store the offset before removing the mirror element or else
      // the range will be updated
            const offset = newRange.startOffset;
      mirrorElement.remove();
      let shadowTarget = blockAncestor;
      while (shadowTarget && path.length) shadowTarget = shadowTarget.childNodes[path.shift()];
      if (!isTextNode(shadowTarget)) return null;
      const shadowRange = new Range;
      shadowRange.setStart(shadowTarget, offset);
      shadowRange.setEnd(shadowTarget, offset);
      return shadowRange;
    }
    // --------------------------------------------------------------------------
    
    // More caretRangeFromPoint helpers
    
    // --------------------------------------------------------------------------
    // On Safari, if you pass a point into caretRangeFromPoint that is less than
    // about 60~70% of the way across the first character in a text node it will
    // return the previous text node instead.
    
    // Here we try to detect that situation and return the "next" text node instead.
        function adjustForRangeBoundary({range, point}) {
      // Check we got a range with the offset set to the end of a text node
      if (!range || !range.startOffset || range.startContainer.nodeType !== Node.TEXT_NODE || range.startOffset !== range.startContainer.textContent?.length) return range;
      // Check there is a _different_ text node under the cursor
            const elemFromPoint = document.elementFromPoint(point.x, point.y);
      if (!(elemFromPoint instanceof HTMLElement) || elemFromPoint === range.startContainer || !elemFromPoint.innerText.length) return range;
      // Check the first character in the new element is actually the one under the
      // cursor.
            const firstNonEmptyTextNode = Array.from(elemFromPoint.childNodes).find((elem => elem.nodeType === Node.TEXT_NODE && !!elem.length));
      if (!firstNonEmptyTextNode) return range;
      const firstCharRange = getRangeForSingleCodepoint({
        source: firstNonEmptyTextNode,
        offset: 0
      });
      const firstCharBbox = getBboxForSingleCodepointRange(firstCharRange);
      if (!firstCharBbox || !bboxIncludesPoint({
        bbox: firstCharBbox,
        point
      })) return range;
      firstCharRange.setEnd(firstNonEmptyTextNode, 0);
      return firstCharRange;
    }
    // CONCATENATED MODULE: ./src/utils/char-range.ts
    /** @public */ const halfWidthNumbers = /[0-9]/;
    // U+FF01~U+FF5E is for full-width alphanumerics (includes some punctuation
    // like ＆ and ～ because they appear in the kanji headwords for some entries)
    
    // Note that U+FF5E is full-width tilde ～ (not 〜 which is a wave dash).
    
    // U+FF61~U+FF65 is some halfwidth ideographic symbols, e.g. ｡ but we skip them
    // (although previous rikai-tachi included them) since they're mostly going to
    // be delimiters
    /** @public */    const fullWidthAlphanumerics = /[\uff01-\uff5e]/;
    // On some platforms, Google Docs puts zero-width joiner characters between
    // _all_ the characters so we need to match on them in order to match runs of
    // characters.
    /** @public */    const zeroWidthNonJoiner = /[\u200c]/;
    // * U+25CB is 'white circle' often used to represent a blank
    //   (U+3007 is an ideographic zero that is also sometimes used for this
    //   purpose, but this is included in the U+3001~U+30FF range.)
    /** @public */    const whiteCircle = /[\u25cb]/;
    // U+2E80~U+2EF3 is the CJK radicals supplement block
    // U+2F00~U+2FD5 is the Kangxi radicals block
    /** @public */    const char_range_radicals = /[\u2e80-\u2ef3\u2f00-\u2fd5]/u;
    // * U+3000~U+3039 is ideographic punctuation but we skip:
    
    //    U+3000 (ideographic space),
    //    U+3001 (、 ideographic comma),
    //    U+3002 (。 ideographic full stop),
    //    U+3003 (〃 ditto mark),
    //    U+3008,U+3009 (〈〉),
    //    U+300A,U+300B (《》),
    //    U+300C,U+300D (「」 corner brackets for quotations),
    //                  [ENAMDICT actually uses this in one entry,
    //                  "ウィリアム「バッファロービル」コーディ", but I think we
    //                  can live without being able to recognize that)
    //    U+300E,U+300F (『 』), and
    //    U+3010,U+3011 (【 】),
    
    //   since these are typically only going to delimit words.
    /** @public */    const nonDelimitingIdeographicPunctuation = /[\u3004-\u3007\u3012-\u3039]/;
    // U+3041~U+309F is the hiragana range
    /** @public */    const char_range_hiragana = /[\u3041-\u309f\u{1b001}]/u;
    // U+30A0~U+30FF is the katakana range
    /** @public */    const katakana = /[\u30a0-\u30ff\u{1b000}]/u;
    // * U+3220~U+3247 is various enclosed characters like ㈵
    // * U+3280~U+32B0 is various enclosed characters like ㊞
    // * U+32D0~U+32FF is various enclosed characters like ㋐ and ㋿.
        const enclosedChars = /[\u3220-\u3247\u3280-\u32b0\u32d0-\u32ff]/;
    // U+3300~U+3357 is various shorthand characters from the CJK compatibility
    // block like ㍍
        const shorthandChars = /[\u3300-\u3357]/;
    // U+3358~U+3370 is numbers composed with 点 e.g. ㍘
        const tenChars = /[\u3358-\u3370]/;
    // U+337B~U+337E is various era names e.g. ㍻
        const eraChars = /[\u337B-\u337E]/;
    // U+337F is ㍿
        const kabushikiGaisha = /[\u337F]/;
    // U+4E00~U+9FFF is the CJK Unified Ideographs block ("the kanji")
    /** @public */    const char_range_kanji = /[\u4e00-\u9fff]/;
    // * U+3400~U+4DBF is the CJK Unified Ideographs Extension A block (rare
    //   kanji)
    // * U+F900~U+FAFF is the CJK Compatibility Ideographs block (random odd
    //   kanji, because standards)
    // * U+20000~U+2A6DF is CJK Unified Ideographs Extension B (more rare kanji)
    /** @public */    const rareKanji = /[\u3400-\u4dbf\uf900-\ufaff\u{20000}-\u{2a6df}]/u;
    // U+FF66~U+FF9F is halfwidth katakana
    /** @public */    const halfwidthKatakanaChar = /[\uff66-\uff9f]/;
    // U+1B002-U+1B0FF is hentaigana
    /** @public */    const hentaigana = /[\u{1b002}-\u{1b0ff}]/u;
    function getCombinedCharRange(ranges) {
      let source = "[";
      let flags = "";
      for (const range of ranges) {
        // Check we have a character class
        if (!isCharacterClassRange(range)) throw new Error(`Expected a character class range, got: ${range.source}`);
        // Check it is not negated
                if (range.source[1] === "^") throw new Error(`Expected a non-negated character class range, got ${range.source}`);
        source += range.source.substring(1, range.source.length - 1);
        if (range.flags.indexOf("u") !== -1) flags = "u";
      }
      source += "]";
      return new RegExp(source, flags);
    }
    // This is far from complete but all the RegExps we deal with are ones we've
    // written so hopefully it's a good-enough sanity check.
        function isCharacterClassRange(re) {
      return re.source.length >= 2 && re.source.startsWith("[") && re.source.endsWith("]");
    }
    // "Japanese" here simply means any character we treat as worth attempting to
    // translate, including full-width alphanumerics etc. but NOT characters that
    // typically delimit words.
    /** @public */    const japaneseChar = getCombinedCharRange([ 
    // We include half-width numbers so we can recognize things like 小1
    halfWidthNumbers, fullWidthAlphanumerics, zeroWidthNonJoiner, whiteCircle, char_range_radicals, nonDelimitingIdeographicPunctuation, char_range_hiragana, katakana, enclosedChars, shorthandChars, tenChars, eraChars, kabushikiGaisha, char_range_kanji, rareKanji, halfwidthKatakanaChar, hentaigana ]);
    function getNegatedCharRange(range) {
      // Check if we got a character class range
      if (!isCharacterClassRange(range)) throw new Error(`Expected a character class range, got: ${range.source}`);
      const negated = range.source[1] === "^";
      const source = `[${negated ? "" : "^"}${range.source.substring(negated ? 2 : 1, range.source.length - 1)}]`;
      return new RegExp(source, range.flags);
    }
    const nonJapaneseChar = getNegatedCharRange(japaneseChar);
    function hasKatakana(text) {
      return katakana.test(text);
    }
    function startsWithDigit(input) {
      const c = input.length ? input.charCodeAt(0) : 0;
      return c >= 48 && c <= 57 || c >= 65296 && c <= 65305;
    }
    const kanjiNumerals = [ "\u3007", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u767e", "\u5343", "\u4e07", "\u5104", "\u5146", "\u4eac" ];
    function startsWithNumeral(input) {
      return startsWithDigit(input) || !!input.length && kanjiNumerals.includes(input[0]);
    }
    // CONCATENATED MODULE: ./src/content/numbers.ts
    // The following is based heavily on:
    // http://ginstrom.com/scribbles/2009/04/28/converting-kanji-numbers-to-integers-with-python/
    // Following are the digits we recognize for numbers specified as a series of
    // digits e.g. 五六. We call this a transliterated number.
    const transliterateMap = new Map([ [ "\u3007", 0 ], [ "\u4e00", 1 ], [ "\u4e8c", 2 ], [ "\u4e09", 3 ], [ "\u56db", 4 ], [ "\u4e94", 5 ], [ "\u516d", 6 ], [ "\u4e03", 7 ], [ "\u516b", 8 ], [ "\u4e5d", 9 ], [ "\uff10", 0 ], [ "\uff11", 1 ], [ "\uff12", 2 ], [ "\uff13", 3 ], [ "\uff14", 4 ], [ "\uff15", 5 ], [ "\uff16", 6 ], [ "\uff17", 7 ], [ "\uff18", 8 ], [ "\uff19", 9 ], [ "0", 0 ], [ "1", 1 ], [ "2", 2 ], [ "3", 3 ], [ "4", 4 ], [ "5", 5 ], [ "6", 6 ], [ "7", 7 ], [ "8", 8 ], [ "9", 9 ], [ ".", -1 ], [ "\u3002", -1 ], [ "\uff0e", -1 ] ]);
    // Following are the digits we recognize for numbers that specify powers of 10,
    // e.g. 五十六.
        const kanjiToNumberMap = new Map([ [ "\u3007", 0 ], [ "\u4e00", 1 ], [ "\u4e8c", 2 ], [ "\u4e09", 3 ], [ "\u56db", 4 ], [ "\u4e94", 5 ], [ "\u516d", 6 ], [ "\u4e03", 7 ], [ "\u516b", 8 ], [ "\u4e5d", 9 ], [ "\uff10", 0 ], [ "\uff11", 1 ], [ "\uff12", 2 ], [ "\uff13", 3 ], [ "\uff14", 4 ], [ "\uff15", 5 ], [ "\uff16", 6 ], [ "\uff17", 7 ], [ "\uff18", 8 ], [ "\uff19", 9 ], [ "0", 0 ], [ "1", 1 ], [ "2", 2 ], [ "3", 3 ], [ "4", 4 ], [ "5", 5 ], [ "6", 6 ], [ "7", 7 ], [ "8", 8 ], [ "9", 9 ], [ "\u5341", 10 ], [ "\u767e", 100 ], [ "\u5343", 1000 ], [ "\u4e07", 10000 ], [ "\u5104", 100000000 ], [ "\u5146", 1000000000000 ], [ ".", -1 ], [ "\u3002", -1 ], [ "\uff0e", -1 ] ]);
    function parseNumber(inputText) {
      // Drop any commas in the string first
      const text = inputText.replace(/[,\u3001]/g, "");
      // Try a transliterated number first since inputs like 二二一 would also be
      // found in kanjiToNumberMap.
            let digits = [ ...text ].map((ch => transliterateMap.get(ch)));
      if (digits.length && !digits.some((digit => typeof digit === "undefined"))) if (digits.indexOf(-1) === -1) return parseInt(digits.join(""), 10); else return parseFloat(digits.map((digit => digit === -1 ? "." : digit)).join(""));
      // Otherwise, try processing as a number with powers of ten.
            digits = [ ...text ].map((ch => kanjiToNumberMap.get(ch)));
      if (!digits.length || digits.some((ch => typeof ch === "undefined"))) 
      // If that failed, it's not something we know how to parse as a number.
      return null;
      let numbers = digits;
      // Special case where we have a series of digits followed by a power of ten,
      // e.g. 39,800万円 and 11,786百万. These don't follow the usual rules of
      // numbers so we treat them separately.
            const digitsAndPowersOfTen = getDigitsAndPowersOfTen(numbers);
      if (digitsAndPowersOfTen) {
        const [digits, powersOfTen] = digitsAndPowersOfTen;
        const multiplier = digits.reduce(((acc, d) => acc * 10 + d), 0);
        const base = powersOfTen.reduce(((acc, p) => acc * p), 1);
        return multiplier * base;
      }
      let result = 0;
      while (numbers.length > 1) {
        const [first, second, ...rest] = numbers;
        // Detect strings of digits and combine them
                if (first < 10 && second < 10) {
          let decimal = 0;
          while (numbers.length > 1 && numbers[1] < 10) if (numbers[1] === -1) {
            if (decimal) return null;
            decimal = 1;
            numbers = [ numbers[0], ...numbers.slice(2) ];
          } else if (decimal) numbers = [ numbers[0] + numbers[1] * Math.pow(10, -decimal++), ...numbers.slice(2) ]; else numbers = [ numbers[0] * 10 + numbers[1], ...numbers.slice(2) ];
          continue;
        }
        if (!validSequence(first, second)) return null;
        if (second < first) 
        // Detected a step down, check if there are any multipliers on what we
        // currently have.
        if (rest.some((x => x > first))) numbers = breakDownNumbers(numbers); else {
          // No multipliers on what we currently have accumualated so store what
          // we have and process the remainder.
          result += first;
          numbers = [ second, ...rest ];
        } else numbers = [ first * second, ...rest ];
      }
      return result + (numbers.length ? numbers[0] : 0);
    }
    function getDigitsAndPowersOfTen(arr) {
      let lastPowerOfTen = arr.length;
      while (lastPowerOfTen && arr[lastPowerOfTen - 1] >= 100) --lastPowerOfTen;
      if (lastPowerOfTen === 0 || lastPowerOfTen === arr.length) return null;
      const digits = arr.slice(0, lastPowerOfTen);
      if (!digits.every((d => d >= 0 && d < 10))) return null;
      return [ digits, arr.slice(lastPowerOfTen) ];
    }
    function validSequence(c1, c2) {
      // If we have xxx万, xxx億, xxx兆 then the only requirement is that xxx is less
      // than the 'base'.
      if (c2 >= 10000 && c1 < c2) return true;
      if (c1 >= 10000 && c2 <= 1000) return true;
      if (c1 >= 100 && c2 < c1 && c2 >= 10 && c2 <= 1000) return true;
      // Don't allow 一十 or 一百
            if (c1 === 1 && (c2 === 10 || c2 === 100)) return false;
      return c1 < 10 !== c2 < 10;
    }
    function breakDownNumbers(numbers) {
      // If this is called, we already know that second < first.
      // Furthermore, we know that there is something after 'second' that is
      // greater than 'first'.
      // Most often, the second value will be the 'unit' (i.e. value < 10) and the
      // third value will be the base-10 multiplier.
      // e.g. [300, 2, 10, 10000], i.e. 3,200,000
      // In this case we want to multiply the second and third values together
      // i.e. [300, 20, 10000]
      // There are two cases where we can't do this:
      // (a) When the third value is actually a multiplier not just on the second
      //     value, but on everything we've accumulated in the first value.
      //     In this case it will be greater than the first value.
      //     e.g. [300, 2, 10000], i.e. 3,020,000
      //     Here we can add the first two together and proceed.
      //     i.e. [302, 10000]
      // (b) When the third value is less than the second, i.e. is _not_ a
      //     multiplier on it.
      //     This mostly happens when lining up powers of 10 since they we don't
      //     need a 'unit' in this case.
      //     e.g. [1000, 100, 10, 10000], i.e. 11,100,000
      //     Here too we can just add the first two together and proceed.
      //     i.e. [1100, 10, 10000]
      const [first, second, third, ...rest] = numbers;
      if (first < third || third < second) return [ first + second, third, ...rest ]; else return [ first, second * third, ...rest ];
    }
    // This very long regex is really just trying to say: only recognize a number
    // that
    
    // - is at least two digits long, and
    // - has at least one kanji digit
    
        const numberRegex = /^([\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u5104\u5146\u4eac][0-9.,\uff10-\uff19\u3002\uff0e\u3001\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u5104\u5146\u4eac]+)|([0-9,\uff10-\uff19\u3001]+([.\u3002\uff0e][0-9\uff10-\uff19]+)?[\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u5104\u5146\u4eac][0-9.,\uff10-\uff19\u3002\uff0e\u3001\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u5104\u5146\u4eac]*)/;
    function extractNumberMetadata(text) {
      const matches = numberRegex.exec(text);
      if (!matches || matches.index !== 0) return;
      const valueStr = matches[0];
      if (!valueStr) return;
      const value = parseNumber(valueStr);
      if (!value) return;
      return {
        type: "number",
        value,
        src: valueStr,
        matchLen: valueStr.length
      };
    }
    // CONCATENATED MODULE: ./src/content/currency.ts
    function lookForCurrency({currentText, nodeText, textDelimiter: originalTextDelimiter}) {
      // If the source text might be a currency, expand our text delimiter to allow
      // extra symbols that would normally be ignored.
      const sourceText = currentText + nodeText;
      const mightBeCurrency = sourceText[0] === "\xa5" || sourceText[0] === "\uffe5" || sourceText.startsWith("JPY") || startsWithNumeral(sourceText) && (sourceText.indexOf("\u5186") > 0 || sourceText.toLowerCase().indexOf("yen") > 0);
      if (!mightBeCurrency) return null;
      const japaneseOrPrice = getCombinedCharRange([ getNegatedCharRange(originalTextDelimiter), /[\xa5\uffe5\s,\u3001.\uff0e\u3002kKmMbBtTyYeEnNJPY]/ ]);
      const textDelimiter = getNegatedCharRange(japaneseOrPrice);
      return {
        textDelimiter,
        textEnd: nodeText.search(textDelimiter)
      };
    }
    const currencyRegex = /((?:[\uffe5\xa5]|JPY)\s*([0-9.,\uff10-\uff19\u3002\uff0e\u3001\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u5104\u5146\u4eac]+)([kKmMbBtT]\b)?)|(([0-9.,\uff10-\uff19\u3002\uff0e\u3001\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u5104\u5146\u4eac]+)([kKmMbBtT])?\s*(?:\u5186|(?:[yY][eE][nN]\b)))/;
    function extractCurrencyMetadata(text) {
      const matches = currencyRegex.exec(text);
      if (!matches || matches.index !== 0) return;
      const valueStr = matches[2] ?? matches[5];
      if (!valueStr) return;
      let value = parseNumber(valueStr);
      if (value === null) return;
      // Handle metric suffixes---we handle them here instead of in parseNumber
      // because we only support them when they are part of a currency.
            const metricSuffix = matches[2] ? matches[3] : matches[6];
      switch (metricSuffix) {
       case "k":
       case "K":
        value *= 1000;
        break;

       case "m":
       case "M":
        value *= 1000000;
        break;

       case "b":
       case "B":
        value *= 1000000000;
        break;

       case "t":
       case "T":
        value *= 1000000000000;
        break;
      }
      return {
        type: "currency",
        value,
        matchLen: matches[0].length
      };
    }
    // CONCATENATED MODULE: ./src/content/measure.ts
    function lookForMeasure({nodeText, textDelimiter: originalTextDelimiter}) {
      if (!startsWithNumeral(nodeText)) return null;
      const includeSeparators = startsWithDigit(nodeText);
      const japaneseOrUnit = getCombinedCharRange([ getNegatedCharRange(originalTextDelimiter), includeSeparators ? /[\sm2\u33a1\xb2,\u3001.\uff0e]/ : /[\sm2\u33a1\xb2]/ ]);
      const textDelimiter = getNegatedCharRange(japaneseOrUnit);
      return {
        textDelimiter,
        textEnd: nodeText.search(textDelimiter)
      };
    }
    const jouRegex = /([0-9.\uff10-\uff19\u3002\uff0e\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e]+)\s*(\u7573|\u5e16)(\u534a?)/;
    const squareMeterRegex = /([0-9.\uff10-\uff19\u3002\uff0e\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07]+)\s*(\u33a1|(?:m2)|(?:m\xb2)|(?:\u5e73\u65b9\u30e1\u30fc\u30c8\u30eb)|(?:\u5e73\u65b9\uff92\uff70\uff84\uff99)|(?:\u5e73\u65b9\u334d)|(?:\u5e73\u334d)|(?:\u5e73\u7c73)|(?:\u5e73\u65b9\u7c73))/;
    function extractMeasureMetadata(text) {
      let type;
      // Try either of our regexs
            let matches = jouRegex.exec(text);
      if (matches && matches.index === 0 && matches.length === 4) type = "jou"; else {
        matches = squareMeterRegex.exec(text);
        if (!matches || matches.index !== 0 || matches.length !== 3) return;
        type = "m2";
      }
      // Parse value
            if (typeof matches[1] !== "string") return;
      const valueStr = matches[1];
      let value = parseNumber(valueStr);
      if (value === null) return;
      // Parse unit
            let unit;
      if (type === "jou") {
        if (matches[2] !== "\u7573" && matches[2] !== "\u5e16") return;
        unit = matches[2];
      } else unit = type;
      // Add final 半
            if (type === "jou" && matches[3] === "\u534a") value += 0.5;
      return {
        type: "measure",
        unit,
        value,
        matchLen: matches[0].length
      };
    }
    const alternateJouSizes = [ {
      type: "kyouma",
      label: "\u4eac\u9593",
      ratio: 1.82405
    }, {
      type: "chuukyouma",
      label: "\u4e2d\u4eac\u9593",
      ratio: 1.6562
    }, {
      type: "edoma",
      label: "\u6c5f\u6238\u9593",
      ratio: 1.5488
    }, {
      type: "danchima",
      label: "\u56e3\u5730\u9593",
      ratio: 1.445
    } ];
    function convertMeasure(measure, preferredUnits) {
      if (measure.unit === "m2") return {
        unit: "\u5e16",
        value: measure.value / 1.62,
        alt: alternateJouSizes.map((size => ({
          type: size.type,
          label: size.label,
          unit: "\u7573",
          value: measure.value / size.ratio
        })))
      };
      const m2Conversion = {
        unit: "m2",
        value: measure.value * 1.62,
        alt: // Only show alternative sizes of the unit is 畳. If it's 帖 it
        // means 1.62m2.
        measure.unit === "\u7573" ? alternateJouSizes.map((size => ({
          type: size.type,
          label: size.label,
          unit: "m2",
          value: measure.value * size.ratio
        }))) : void 0
      };
      // Since feet are defined in terms of meters,
      // we can do the conversion from the metric one.
            if (preferredUnits === "imperial") {
        const m2f = 10.763915;
        return {
          unit: "sq ft",
          value: m2Conversion.value * m2f,
          alt: m2Conversion.alt ? m2Conversion.alt.map((({type, label, value}) => ({
            type,
            label,
            unit: "sq ft",
            value: value * m2f
          }))) : void 0
        };
      }
      return m2Conversion;
    }
    // CONCATENATED MODULE: ./src/content/shogi.ts
    // ---------------------------------------------------------------------------
    // Parsing
    // ---------------------------------------------------------------------------
    function lookForShogi({nodeText, textDelimiter: originalTextDelimiter}) {
      if (!nodeText.length) return null;
      // If the test starts with one of the shogi side indicators, then we assume
      // that the text is a shogi move and we can use the shogi delimiter.
            if ([ "\u25b2", "\u25b3", "\u2617", "\u2616" ].includes(nodeText[0])) return {
        textDelimiter: shogiDelimiter,
        textEnd: nodeText.search(shogiDelimiter)
      };
      // Otherwise, if it starts with an Arabic number followed by a kanji number
      // OR it starts with one of the characters meaning "same position" then
      // expand the delimiter range to include all the shogi characters.
            if (!unprefixedShogiStart.test(nodeText)) return null;
      const expandedDelimiter = getCombinedCharRange([ getNegatedCharRange(originalTextDelimiter), /[\u2191]/ ]);
      const textDelimiter = getNegatedCharRange(expandedDelimiter);
      return {
        textDelimiter,
        textEnd: nodeText.search(textDelimiter)
      };
    }
    // This needs to be kept in sync with the regexes below.
        const shogiDelimiter = /[^\u25b2\u25b3\u2617\u26161-9\uff11-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u540c\u4edd\uff0d\ud841\udd3c\u30c9\u6b69\u5175\u4e36\u30d5\u309d\u30fb\u9999\u79be\u30ad\u2191\u6842\u571f\u9280\u30e8\u89d2\u30af\u98db\u30d2\u4e59\u91d1\u4eba\u3068\u6210\u30ca\u99ac\u30de\u30a6\u9f8d\u7adc\u7acb\u30ea\u7389\u738b\u25cb\u6253\u5f15\u5bc4\u4e0a\u884c\u5165\u53f3\u5de6\u76f4\u884c\u5165\u4e0d\u751f]/u;
    const unprefixedShogiStart = /^[1-9\uff11-\uff19][\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]|[\u540c\u4edd\uff0d\ud841\udd3c\u30c9]/u;
    // Based on https://devurandom.xyz/shogi_parser.html by @devurandom
    // which in turn is based on the description at
    // https://en.wikipedia.org/wiki/Shogi_notation#Japanese_notation
        const shogiRegex = /([\u25b2\u25b3\u2617\u2616])([1-9\uff11-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d][1-9\uff11-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d][\u540c\u4edd\uff0d\ud841\udd3c\u30c9]?|[\u540c\u4edd\uff0d\ud841\udd3c\u30c9])(\u6b69|\u5175|\u4e36|\u30d5|\u309d|\u30fb|\u9999|\u79be|\u30ad|\u2191|\u6842|\u571f|\u9280|\u30e8|\u89d2|\u30af|\u98db|\u30d2|\u4e59|\u91d1|\u4eba|\u3068|\u6210\u9999|\u6210\u79be|\u6210\u30ad|\u6210\u2191|\u30ca\u9999|\u30ca\u79be|\u30ca\u30ad|\u30ca\u2191|\u6210\u6842|\u6210\u571f|\u30ca\u6842|\u30ca\u571f|\u6210\u9280|\u6210\u30e8|\u30ca\u9280|\u30ca\u30e8|\u99ac|\u30de|\u30a6|\u9f8d|\u7adc|\u7acb|\u30ea|\u7389|\u738b|\u25cb)([\u6253\u5f15\u5bc4\u4e0a\u884c\u5165\u53f3\u5de6\u76f4\u884c\u5165]?)(\u6210|\u30ca|\u4e0d\u6210|\u751f|\u30d5\u30ca|\u4e0d\u30ca)?/u;
    const shogiWithoutPrefixRegex = /([1-9\uff11-\uff19][\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d][\u540c\u4edd\uff0d\ud841\udd3c\u30c9]?|[\u540c\u4edd\uff0d\ud841\udd3c\u30c9])(\u6b69|\u5175|\u4e36|\u30d5|\u309d|\u30fb|\u9999|\u79be|\u30ad|\u2191|\u6842|\u571f|\u9280|\u30e8|\u89d2|\u30af|\u98db|\u30d2|\u4e59|\u91d1|\u4eba|\u3068|\u6210\u9999|\u6210\u79be|\u6210\u30ad|\u6210\u2191|\u30ca\u9999|\u30ca\u79be|\u30ca\u30ad|\u30ca\u2191|\u6210\u6842|\u6210\u571f|\u30ca\u6842|\u30ca\u571f|\u6210\u9280|\u6210\u30e8|\u30ca\u9280|\u30ca\u30e8|\u99ac|\u30de|\u30a6|\u9f8d|\u7adc|\u7acb|\u30ea|\u7389|\u738b|\u25cb)([\u6253\u5f15\u5bc4\u4e0a\u884c\u5165\u53f3\u5de6\u76f4\u884c\u5165]?)(\u6210|\u30ca|\u4e0d\u6210|\u751f|\u30d5\u30ca|\u4e0d\u30ca)?/u;
    const shogi_sides = new Map([ [ "\u25b2", "black" ], [ "\u25b3", "white" ], [ "\u2617", "black" ], [ "\u2616", "white" ] ]);
    const sameDest = new Set([ "\u540c", "\u4edd", "\uff0d", "\u{2053c}", "\u30c9" ]);
    const pieces = new Map([ [ "\u6b69", "p" ], [ "\u5175", "p" ], [ "\u4e36", "p" ], [ "\u30d5", "p" ], [ "\u309d", "p" ], [ "\u30fb", "p" ], [ "\u9999", "l" ], [ "\u79be", "l" ], [ "\u30ad", "l" ], [ "\u2191", "l" ], [ "\u6842", "n" ], [ "\u571f", "n" ], [ "\u9280", "s" ], [ "\u30e8", "s" ], [ "\u89d2", "b" ], [ "\u30af", "b" ], [ "\u98db", "r" ], [ "\u30d2", "r" ], [ "\u4e59", "r" ], [ "\u91d1", "g" ], [ "\u4eba", "g" ], [ "\u3068", "pro_p" ], [ "\u6210\u9999", "pro_l" ], [ "\u6210\u79be", "pro_l" ], [ "\u6210\u30ad", "pro_l" ], [ "\u6210\u2191", "pro_l" ], [ "\u30ca\u9999", "pro_l" ], [ "\u30ca\u79be", "pro_l" ], [ "\u30ca\u30ad", "pro_l" ], [ "\u30ca\u2191", "pro_l" ], [ "\u6210\u6842", "pro_n" ], [ "\u6210\u571f", "pro_n" ], [ "\u30ca\u6842", "pro_n" ], [ "\u30ca\u571f", "pro_n" ], [ "\u6210\u9280", "pro_s" ], [ "\u6210\u30e8", "pro_s" ], [ "\u30ca\u9280", "pro_s" ], [ "\u30ca\u30e8", "pro_s" ], [ "\u99ac", "pro_b" ], [ "\u30de", "pro_b" ], [ "\u30a6", "pro_b" ], [ "\u9f8d", "pro_r" ], [ "\u7adc", "pro_r" ], [ "\u7acb", "pro_r" ], [ "\u30ea", "pro_r" ], [ "\u7389", "k" ], [ "\u738b", "k" ], [ "\u25cb", "k" ] ]);
    const movements = new Map([ [ "\u6253", "drop" ], [ "\u5f15", "down" ], [ "\u5bc4", "horiz" ], [ "\u4e0a", "up" ], [ "\u884c", "up" ], [ "\u5165", "up" ], [ "\u53f3", "right" ], [ "\u5de6", "left" ], [ "\u76f4", "vert" ] ]);
    const promotions = new Set([ "\u6210", "\u30ca" ]);
    const nonPromotions = new Set([ "\u4e0d\u6210", "\u751f", "\u30d5\u30ca", "\u4e0d\u30ca" ]);
    function extractShogiMetadata(text) {
      let matches = shogiRegex.exec(text);
      if (!matches || matches.index !== 0) {
        matches = shogiWithoutPrefixRegex.exec(text);
        if (!matches || matches.index !== 0) return;
        // Lined up the match indices line up between the two regexes
                matches.splice(1, 0, "");
      }
      const [src, sideStr, destStr, pieceStr, movementStr, promotionStr] = matches;
      // Side
            const side = sideStr ? shogi_sides.get(sideStr) : void 0;
      // Destination
            let dest;
      if (!sameDest.has(destStr)) {
        const parts = destStr.split("");
        dest = parts.slice(0, 2).map(parseNumber);
        // Check for a "same" indication (we need to check for > 2 instead of === 3
        // because if the "same" character is 𠔼 the string will have length 4 since
        // that charater is non-BMP).
                if (parts.length > 2) dest.push(1);
      }
      // Piece
            const piece = pieces.get(pieceStr);
      // Movement
            const movement = movements.get(movementStr);
      // Promotion
            let promotion;
      if (promotions.has(promotionStr)) promotion = true; else if (nonPromotions.has(promotionStr)) promotion = false;
      return {
        type: "shogi",
        matchLen: src.length,
        side,
        dest,
        piece,
        movement,
        promotion
      };
    }
    // ---------------------------------------------------------------------------
    
    // Serialization
    
    // ---------------------------------------------------------------------------
        const standardPieceNotation = {
      p: "\u6b69",
      l: "\u9999",
      n: "\u6842",
      s: "\u9280",
      b: "\u89d2",
      r: "\u98db",
      g: "\u91d1",
      pro_p: "\u3068",
      pro_l: "\u6210\u9999",
      pro_n: "\u6210\u6842",
      pro_s: "\u6210\u9280",
      pro_b: "\u99ac",
      pro_r: "\u9f8d",
      k: "\u738b"
    };
    const standardMovementNotation = {
      drop: "\u6253",
      down: "\u5f15",
      horiz: "\u5bc4",
      up: "\u4e0a",
      right: "\u53f3",
      left: "\u5de6",
      vert: "\u76f4"
    };
    function serializeShogi({side, dest, piece, movement, promotion}) {
      let result = "";
      if (side) result += side === "black" ? "\u2617" : "\u2616";
      if (dest) result += serializeShogiDest(dest);
      if (!dest || dest.length === 3) result += "\u540c";
      result += standardPieceNotation[piece];
      if (movement) result += standardMovementNotation[movement];
      if (typeof promotion === "boolean") result += promotion ? "\u6210" : "\u4e0d\u6210";
      return result;
    }
    const numberToKanji = [ "\u3007", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d" ];
    function serializeShogiDest(dest) {
      return `${String.fromCodePoint(dest[0] + 0xff10)}${numberToKanji[dest[1]]}`;
    }
    // CONCATENATED MODULE: ./src/content/years.ts
    function lookForEra({currentText, nodeText, textDelimiter: originalTextDelimiter, textEnd}) {
      // We only want to _extend_ the current range so if `textEnd` is already -1
      // (i.e. end of the text) then we don't need to do anything.
      if (textEnd < 0 || !startsWithEraName(currentText)) return null;
      // The original text delimiter should include all the characters needed to
      // match Japanese years except spaces between the era and the year, and
      // spaces between the year and the final 年 character, if any.
            const japaneseOrSpace = getCombinedCharRange([ getNegatedCharRange(originalTextDelimiter), /[\s]/ ]);
      const textDelimiter = getNegatedCharRange(japaneseOrSpace);
      const endOfEra = nodeText.substring(textEnd).search(textDelimiter);
      return {
        textDelimiter,
        textEnd: endOfEra === -1 ? -1 : textEnd + endOfEra
      };
    }
    function startsWithEraName(text) {
      const maxEraLength = Math.max(...Array.from(yearMap.keys()).map((key => key.length)));
      for (let i = 1; i <= text.length && i <= maxEraLength; i++) if (yearMap.has(text.substring(0, i))) return true;
      return false;
    }
    const yearMap = new Map([ [ "\u5927\u5316", {
      reading: "\u305f\u3044\u304b",
      start: 645,
      yomi: "Taika"
    } ], [ "\u767d\u96c9", {
      reading: "\u306f\u304f\u3061",
      start: 650,
      yomi: "Hakuchi"
    } ], [ "\u6731\u9ce5", {
      reading: "\u3057\u3085\u3061\u3087\u3046",
      start: 686,
      yomi: "Shuch\u014d"
    } ], [ "\u5927\u5b9d", {
      reading: "\u305f\u3044\u307b\u3046",
      start: 701,
      yomi: "Taih\u014d"
    } ], [ "\u6176\u96f2", {
      reading: "\u3051\u3044\u3046\u3093",
      start: 704,
      yomi: "Keiun"
    } ], [ "\u548c\u9285", {
      reading: "\u308f\u3069\u3046",
      start: 708,
      yomi: "Wad\u014d"
    } ], [ "\u970a\u4e80", {
      reading: "\u308c\u3044\u304d",
      start: 715,
      yomi: "Reiki"
    } ], [ "\u990a\u8001", {
      reading: "\u3088\u3046\u308d\u3046",
      start: 717,
      yomi: "Y\u014dr\u014d"
    } ], [ "\u795e\u4e80", {
      reading: "\u3058\u3093\u304d",
      start: 724,
      yomi: "Jinki"
    } ], [ "\u5929\u5e73", {
      reading: "\u3066\u3093\u3074\u3087\u3046",
      start: 729,
      yomi: "Tempy\u014d"
    } ], [ "\u5929\u5e73\u611f\u5b9d", {
      reading: "\u3066\u3093\u3074\u3087\u3046\u304b\u3093\u307d\u3046",
      start: 749,
      yomi: "Tempy\u014dkamp\u014d"
    } ], [ "\u5929\u5e73\u52dd\u5b9d", {
      reading: "\u3066\u3093\u3074\u3087\u3046\u3057\u3087\u3046\u307b\u3046",
      start: 749,
      yomi: "Tempy\u014dsh\u014dh\u014d"
    } ], [ "\u5929\u5e73\u5b9d\u5b57", {
      reading: "\u3066\u3093\u3074\u3087\u3046\u3058\u3087\u3046\u3058",
      start: 757,
      yomi: "Tempy\u014dj\u014dji"
    } ], [ "\u5929\u5e73\u795e\u8b77", {
      reading: "\u3066\u3093\u3074\u3087\u3046\u3058\u3093\u3054",
      start: 765,
      yomi: "Tempy\u014djingo"
    } ], [ "\u795e\u8b77\u666f\u96f2", {
      reading: "\u3058\u3093\u3054\u3051\u3044\u3046\u3093",
      start: 767,
      yomi: "Jingokeiun"
    } ], [ "\u5b9d\u4e80", {
      reading: "\u307b\u3046\u304d",
      start: 770,
      yomi: "H\u014dki"
    } ], [ "\u5929\u5fdc", {
      reading: "\u3066\u3093\u304a\u3046",
      start: 781,
      yomi: "Ten'\u014d"
    } ], [ "\u5ef6\u66a6", {
      reading: "\u3048\u3093\u308a\u3083\u304f",
      start: 782,
      yomi: "Enryaku"
    } ], [ "\u5927\u540c", {
      reading: "\u3060\u3044\u3069\u3046",
      start: 806,
      yomi: "Daid\u014d"
    } ], [ "\u5f18\u4ec1", {
      reading: "\u3053\u3046\u306b\u3093",
      start: 810,
      yomi: "K\u014dnin"
    } ], [ "\u5929\u9577", {
      reading: "\u3066\u3093\u3061\u3087\u3046",
      start: 823,
      yomi: "Tench\u014d"
    } ], [ "\u627f\u548c", {
      reading: "\u3058\u3087\u3046\u308f",
      start: 834,
      yomi: "J\u014dwa"
    } ], [ "\u5609\u7965", {
      reading: "\u304b\u3057\u3087\u3046",
      start: 848,
      yomi: "Kash\u014d"
    } ], [ "\u4ec1\u5bff", {
      reading: "\u306b\u3093\u3058\u3085",
      start: 851,
      yomi: "Ninju"
    } ], [ "\u6589\u8861", {
      reading: "\u3055\u3044\u3053\u3046",
      start: 855,
      yomi: "Saik\u014d"
    } ], [ "\u5929\u5b89", {
      reading: "\u3066\u3093\u3042\u3093",
      start: 857,
      yomi: "Ten'an"
    } ], [ "\u8c9e\u89b3", {
      reading: "\u3058\u3087\u3046\u304c\u3093",
      start: 859,
      yomi: "J\u014dgan"
    } ], [ "\u5143\u6176", {
      reading: "\u304c\u3093\u304e\u3087\u3046",
      start: 877,
      yomi: "Gangy\u014d"
    } ], [ "\u4ec1\u548c", {
      reading: "\u306b\u3093\u306a",
      start: 885,
      yomi: "Ninna"
    } ], [ "\u5bdb\u5e73", {
      reading: "\u304b\u3093\u3074\u3087\u3046",
      start: 889,
      yomi: "Kampy\u014d"
    } ], [ "\u660c\u6cf0", {
      reading: "\u3057\u3087\u3046\u305f\u3044",
      start: 898,
      yomi: "Sh\u014dtai"
    } ], [ "\u5ef6\u559c", {
      reading: "\u3048\u3093\u304e",
      start: 901,
      yomi: "Engi"
    } ], [ "\u5ef6\u9577", {
      reading: "\u3048\u3093\u3061\u3087\u3046",
      start: 923,
      yomi: "Ench\u014d"
    } ], [ "\u627f\u5e73", {
      reading: "\u3058\u3087\u3046\u3078\u3044",
      start: 931,
      yomi: "J\u014dhei"
    } ], [ "\u5929\u6176", {
      reading: "\u3066\u3093\u304e\u3087\u3046",
      start: 938,
      yomi: "Tengy\u014d"
    } ], [ "\u5929\u66a6", {
      reading: "\u3066\u3093\u308a\u3083\u304f",
      start: 947,
      yomi: "Tenryaku"
    } ], [ "\u5929\u5fb3", {
      reading: "\u3066\u3093\u3068\u304f",
      start: 957,
      yomi: "Tentoku"
    } ], [ "\u5fdc\u548c", {
      reading: "\u304a\u3046\u308f",
      start: 961,
      yomi: "\u014cwa"
    } ], [ "\u5eb7\u4fdd", {
      reading: "\u3053\u3046\u307b\u3046",
      start: 964,
      yomi: "K\u014dh\u014d"
    } ], [ "\u5b89\u548c", {
      reading: "\u3042\u3093\u306a",
      start: 968,
      yomi: "Anna"
    } ], [ "\u5929\u7984", {
      reading: "\u3066\u3093\u308d\u304f",
      start: 970,
      yomi: "Tenroku"
    } ], [ "\u5929\u5ef6", {
      reading: "\u3066\u3093\u3048\u3093",
      start: 974,
      yomi: "Ten'en"
    } ], [ "\u8c9e\u5143", {
      reading: "\u3058\u3087\u3046\u3052\u3093",
      start: 976,
      yomi: "J\u014dgen"
    } ], [ "\u5929\u5143", {
      reading: "\u3066\u3093\u3052\u3093",
      start: 979,
      yomi: "Tengen"
    } ], [ "\u6c38\u89b3", {
      reading: "\u3048\u3044\u304b\u3093",
      start: 983,
      yomi: "Eikan"
    } ], [ "\u5bdb\u548c", {
      reading: "\u304b\u3093\u306a",
      start: 985,
      yomi: "Kanna"
    } ], [ "\u6c38\u5ef6", {
      reading: "\u3048\u3044\u3048\u3093",
      start: 987,
      yomi: "Eien"
    } ], [ "\u6c38\u795a", {
      reading: "\u3048\u3044\u305d",
      start: 989,
      yomi: "Eiso"
    } ], [ "\u6b63\u66a6", {
      reading: "\u3057\u3087\u3046\u308a\u3083\u304f",
      start: 990,
      yomi: "Sh\u014dryaku"
    } ], [ "\u9577\u5fb3", {
      reading: "\u3061\u3087\u3046\u3068\u304f",
      start: 995,
      yomi: "Ch\u014dtoku"
    } ], [ "\u9577\u4fdd", {
      reading: "\u3061\u3087\u3046\u307b\u3046",
      start: 999,
      yomi: "Ch\u014dh\u014d"
    } ], [ "\u5bdb\u5f18", {
      reading: "\u304b\u3093\u3053\u3046",
      start: 1004,
      yomi: "Kank\u014d"
    } ], [ "\u9577\u548c", {
      reading: "\u3061\u3087\u3046\u308f",
      start: 1013,
      yomi: "Ch\u014dwa"
    } ], [ "\u5bdb\u4ec1", {
      reading: "\u304b\u3093\u306b\u3093",
      start: 1017,
      yomi: "Kannin"
    } ], [ "\u6cbb\u5b89", {
      reading: "\u3058\u3042\u3093",
      start: 1021,
      yomi: "Jian"
    } ], [ "\u4e07\u5bff", {
      reading: "\u307e\u3093\u3058\u3085",
      start: 1024,
      yomi: "Manju"
    } ], [ "\u9577\u5143", {
      reading: "\u3061\u3087\u3046\u3052\u3093",
      start: 1028,
      yomi: "Ch\u014dgen"
    } ], [ "\u9577\u66a6", {
      reading: "\u3061\u3087\u3046\u308a\u3083\u304f",
      start: 1037,
      yomi: "Ch\u014dryaku"
    } ], [ "\u9577\u4e45", {
      reading: "\u3061\u3087\u3046\u304d\u3085\u3046",
      start: 1040,
      yomi: "Ch\u014dky\u016b"
    } ], [ "\u5bdb\u5fb3", {
      reading: "\u304b\u3093\u3068\u304f",
      start: 1045,
      yomi: "Kantoku"
    } ], [ "\u6c38\u627f", {
      reading: "\u3048\u3044\u3057\u3087\u3046",
      start: 1046,
      yomi: "Eish\u014d"
    } ], [ "\u5929\u559c", {
      reading: "\u3066\u3093\u304e",
      start: 1053,
      yomi: "Tengi"
    } ], [ "\u5eb7\u5e73", {
      reading: "\u3053\u3046\u3078\u3044",
      start: 1058,
      yomi: "K\u014dhei"
    } ], [ "\u6cbb\u66a6", {
      reading: "\u3058\u308a\u3083\u304f",
      start: 1065,
      yomi: "Jiryaku"
    } ], [ "\u5ef6\u4e45", {
      reading: "\u3048\u3093\u304d\u3085\u3046",
      start: 1069,
      yomi: "Enky\u016b"
    } ], [ "\u627f\u4fdd", {
      reading: "\u3058\u3087\u3046\u307b\u3046",
      start: 1074,
      yomi: "J\u014dh\u014d"
    } ], [ "\u627f\u66a6", {
      reading: "\u3058\u3087\u3046\u308a\u3083\u304f",
      start: 1078,
      yomi: "J\u014dryaku"
    } ], [ "\u6c38\u4fdd", {
      reading: "\u3048\u3044\u307b\u3046",
      start: 1081,
      yomi: "Eih\u014d"
    } ], [ "\u5fdc\u5fb3", {
      reading: "\u304a\u3046\u3068\u304f",
      start: 1084,
      yomi: "\u014ctoku"
    } ], [ "\u5bdb\u6cbb", {
      reading: "\u304b\u3093\u3058",
      start: 1087,
      yomi: "Kanji"
    } ], [ "\u5609\u4fdd", {
      reading: "\u304b\u307b\u3046",
      start: 1095,
      yomi: "Kah\u014d"
    } ], [ "\u6c38\u9577", {
      reading: "\u3048\u3044\u3061\u3087\u3046",
      start: 1097,
      yomi: "Eich\u014d"
    } ], [ "\u627f\u5fb3", {
      reading: "\u3058\u3087\u3046\u3068\u304f",
      start: 1098,
      yomi: "J\u014dtoku"
    } ], [ "\u5eb7\u548c", {
      reading: "\u3053\u3046\u308f",
      start: 1099,
      yomi: "K\u014dwa"
    } ], [ "\u9577\u6cbb", {
      reading: "\u3061\u3087\u3046\u3058",
      start: 1104,
      yomi: "Ch\u014dji"
    } ], [ "\u5609\u627f", {
      reading: "\u304b\u3058\u3087\u3046",
      start: 1106,
      yomi: "Kaj\u014d"
    } ], [ "\u5929\u4ec1", {
      reading: "\u3066\u3093\u306b\u3093",
      start: 1108,
      yomi: "Tennin"
    } ], [ "\u5929\u6c38", {
      reading: "\u3066\u3093\u306d\u3044",
      start: 1110,
      yomi: "Tennei"
    } ], [ "\u6c38\u4e45", {
      reading: "\u3048\u3044\u304d\u3085\u3046",
      start: 1113,
      yomi: "Eiky\u016b"
    } ], [ "\u5143\u6c38", {
      reading: "\u3052\u3093\u3048\u3044",
      start: 1118,
      yomi: "Gen'ei"
    } ], [ "\u4fdd\u5b89", {
      reading: "\u307b\u3046\u3042\u3093",
      start: 1120,
      yomi: "H\u014dan"
    } ], [ "\u5929\u6cbb", {
      reading: "\u3066\u3093\u3058",
      start: 1124,
      yomi: "Tenji"
    } ], [ "\u5927\u6cbb", {
      reading: "\u3060\u3044\u3058",
      start: 1126,
      yomi: "Daiji"
    } ], [ "\u5929\u627f", {
      reading: "\u3066\u3093\u3057\u3087\u3046",
      start: 1131,
      yomi: "Tensh\u014d"
    } ], [ "\u9577\u627f", {
      reading: "\u3061\u3087\u3046\u3057\u3087\u3046",
      start: 1132,
      yomi: "Ch\u014dsh\u014d"
    } ], [ "\u4fdd\u5ef6", {
      reading: "\u307b\u3046\u3048\u3093",
      start: 1135,
      yomi: "H\u014den"
    } ], [ "\u6c38\u6cbb", {
      reading: "\u3048\u3044\u3058",
      start: 1141,
      yomi: "Eiji"
    } ], [ "\u5eb7\u6cbb", {
      reading: "\u3053\u3046\u3058",
      start: 1142,
      yomi: "K\u014dji"
    } ], [ "\u5929\u990a", {
      reading: "\u3066\u3093\u3088\u3046",
      start: 1144,
      yomi: "Ten'y\u014d"
    } ], [ "\u4e45\u5b89", {
      reading: "\u304d\u3085\u3046\u3042\u3093",
      start: 1145,
      yomi: "Ky\u016ban"
    } ], [ "\u4ec1\u5e73", {
      reading: "\u306b\u3093\u307a\u3044",
      start: 1151,
      yomi: "Nimpei"
    } ], [ "\u4e45\u5bff", {
      reading: "\u304d\u3085\u3046\u3058\u3085",
      start: 1154,
      yomi: "Ky\u016bju"
    } ], [ "\u4fdd\u5143", {
      reading: "\u307b\u3046\u3052\u3093",
      start: 1156,
      yomi: "H\u014dgen"
    } ], [ "\u5e73\u6cbb", {
      reading: "\u3078\u3044\u3058",
      start: 1159,
      yomi: "Heiji"
    } ], [ "\u6c38\u66a6", {
      reading: "\u3048\u3044\u308a\u3083\u304f",
      start: 1160,
      yomi: "Eiryaku"
    } ], [ "\u5fdc\u4fdd", {
      reading: "\u304a\u3046\u307b\u3046",
      start: 1161,
      yomi: "\u014ch\u014d"
    } ], [ "\u9577\u5bdb", {
      reading: "\u3061\u3087\u3046\u304b\u3093",
      start: 1163,
      yomi: "Ch\u014dkan"
    } ], [ "\u6c38\u4e07", {
      reading: "\u3048\u3044\u307e\u3093",
      start: 1165,
      yomi: "Eiman"
    } ], [ "\u4ec1\u5b89", {
      reading: "\u306b\u3093\u3042\u3093",
      start: 1166,
      yomi: "Nin'an"
    } ], [ "\u5609\u5fdc", {
      reading: "\u304b\u304a\u3046",
      start: 1169,
      yomi: "Ka\u014d"
    } ], [ "\u627f\u5b89", {
      reading: "\u3057\u3087\u3046\u3042\u3093",
      start: 1171,
      yomi: "Sh\u014dan"
    } ], [ "\u5b89\u5143", {
      reading: "\u3042\u3093\u3052\u3093",
      start: 1175,
      yomi: "Angen"
    } ], [ "\u6cbb\u627f", {
      reading: "\u3058\u3057\u3087\u3046",
      start: 1177,
      yomi: "Jish\u014d"
    } ], [ "\u990a\u548c", {
      reading: "\u3088\u3046\u308f",
      start: 1181,
      yomi: "Y\u014dwa"
    } ], [ "\u5bff\u6c38", {
      reading: "\u3058\u3085\u3048\u3044",
      start: 1182,
      yomi: "Juei"
    } ], [ "\u5143\u66a6", {
      reading: "\u3052\u3093\u308a\u3083\u304f",
      start: 1184,
      yomi: "Genryaku"
    } ], [ "\u6587\u6cbb", {
      reading: "\u3076\u3093\u3058",
      start: 1185,
      yomi: "Bunji"
    } ], [ "\u5efa\u4e45", {
      reading: "\u3051\u3093\u304d\u3085\u3046",
      start: 1190,
      yomi: "Kenky\u016b"
    } ], [ "\u6b63\u6cbb", {
      reading: "\u3057\u3087\u3046\u3058",
      start: 1199,
      yomi: "Sh\u014dji"
    } ], [ "\u5efa\u4ec1", {
      reading: "\u3051\u3093\u306b\u3093",
      start: 1201,
      yomi: "Kennin"
    } ], [ "\u5143\u4e45", {
      reading: "\u3052\u3093\u304d\u3085\u3046",
      start: 1204,
      yomi: "Genky\u016b"
    } ], [ "\u5efa\u6c38", {
      reading: "\u3051\u3093\u3048\u3044",
      start: 1206,
      yomi: "Ken'ei"
    } ], [ "\u627f\u5143", {
      reading: "\u3058\u3087\u3046\u3052\u3093",
      start: 1207,
      yomi: "J\u014dgen"
    } ], [ "\u5efa\u66a6", {
      reading: "\u3051\u3093\u308a\u3083\u304f",
      start: 1211,
      yomi: "Kenryaku"
    } ], [ "\u5efa\u4fdd", {
      reading: "\u3051\u3093\u307d\u3046",
      start: 1214,
      yomi: "Kemp\u014d"
    } ], [ "\u627f\u4e45", {
      reading: "\u3058\u3087\u3046\u304d\u3085\u3046",
      start: 1219,
      yomi: "J\u014dky\u016b"
    } ], [ "\u8c9e\u5fdc", {
      reading: "\u3058\u3087\u3046\u304a\u3046",
      start: 1222,
      yomi: "J\u014d\u014d"
    } ], [ "\u5143\u4ec1", {
      reading: "\u3052\u3093\u306b\u3093",
      start: 1225,
      yomi: "Gennin"
    } ], [ "\u5609\u7984", {
      reading: "\u304b\u308d\u304f",
      start: 1225,
      yomi: "Karoku"
    } ], [ "\u5b89\u8c9e", {
      reading: "\u3042\u3093\u3066\u3044",
      start: 1228,
      yomi: "Antei"
    } ], [ "\u5bdb\u559c", {
      reading: "\u304b\u3093\u304d",
      start: 1229,
      yomi: "Kanki"
    } ], [ "\u8c9e\u6c38", {
      reading: "\u3058\u3087\u3046\u3048\u3044",
      start: 1232,
      yomi: "J\u014dei"
    } ], [ "\u5929\u798f", {
      reading: "\u3066\u3093\u3077\u304f",
      start: 1233,
      yomi: "Tempuku"
    } ], [ "\u6587\u66a6", {
      reading: "\u3076\u3093\u308a\u3083\u304f",
      start: 1235,
      yomi: "Bunryaku"
    } ], [ "\u5609\u798e", {
      reading: "\u304b\u3066\u3044",
      start: 1235,
      yomi: "Katei"
    } ], [ "\u66a6\u4ec1", {
      reading: "\u308a\u3083\u304f\u306b\u3093",
      start: 1239,
      yomi: "Ryakunin"
    } ], [ "\u5ef6\u5fdc", {
      reading: "\u3048\u3093\u304a\u3046",
      start: 1239,
      yomi: "En'\u014d"
    } ], [ "\u4ec1\u6cbb", {
      reading: "\u306b\u3093\u3058",
      start: 1240,
      yomi: "Ninji"
    } ], [ "\u5bdb\u5143", {
      reading: "\u304b\u3093\u3052\u3093",
      start: 1243,
      yomi: "Kangen"
    } ], [ "\u5b9d\u6cbb", {
      reading: "\u307b\u3046\u3058",
      start: 1247,
      yomi: "H\u014dji"
    } ], [ "\u5efa\u9577", {
      reading: "\u3051\u3093\u3061\u3087\u3046",
      start: 1249,
      yomi: "Kench\u014d"
    } ], [ "\u5eb7\u5143", {
      reading: "\u3053\u3046\u3052\u3093",
      start: 1256,
      yomi: "K\u014dgen"
    } ], [ "\u6b63\u5609", {
      reading: "\u3057\u3087\u3046\u304b",
      start: 1257,
      yomi: "Sh\u014dka"
    } ], [ "\u6b63\u5143", {
      reading: "\u3057\u3087\u3046\u3052\u3093",
      start: 1259,
      yomi: "Sh\u014dgen"
    } ], [ "\u6587\u5fdc", {
      reading: "\u3076\u3093\u304a\u3046",
      start: 1260,
      yomi: "Bun'\u014d"
    } ], [ "\u5f18\u9577", {
      reading: "\u3053\u3046\u3061\u3087\u3046",
      start: 1261,
      yomi: "K\u014dch\u014d"
    } ], [ "\u6587\u6c38", {
      reading: "\u3076\u3093\u3048\u3044",
      start: 1264,
      yomi: "Bun'ei"
    } ], [ "\u5065\u6cbb", {
      reading: "\u3051\u3093\u3058",
      start: 1275,
      yomi: "Kenji"
    } ], [ "\u5f18\u5b89", {
      reading: "\u3053\u3046\u3042\u3093",
      start: 1278,
      yomi: "K\u014dan"
    } ], [ "\u6b63\u5fdc", {
      reading: "\u3057\u3087\u3046\u304a\u3046",
      start: 1288,
      yomi: "Sh\u014d\u014d"
    } ], [ "\u6c38\u4ec1", {
      reading: "\u3048\u3044\u306b\u3093",
      start: 1293,
      yomi: "Einin"
    } ], [ "\u6b63\u5b89", {
      reading: "\u3057\u3087\u3046\u3042\u3093",
      start: 1299,
      yomi: "Sh\u014dan"
    } ], [ "\u4e7e\u5143", {
      reading: "\u3051\u3093\u3052\u3093",
      start: 1303,
      yomi: "Kengen"
    } ], [ "\u5609\u5143", {
      reading: "\u304b\u3052\u3093",
      start: 1303,
      yomi: "Kagen"
    } ], [ "\u5fb3\u6cbb", {
      reading: "\u3068\u304f\u3058",
      start: 1307,
      yomi: "Tokuji"
    } ], [ "\u5ef6\u6176", {
      reading: "\u3048\u3093\u304d\u3087\u3046",
      start: 1308,
      yomi: "Enky\u014d"
    } ], [ "\u5fdc\u9577", {
      reading: "\u304a\u3046\u3061\u3087\u3046",
      start: 1311,
      yomi: "\u014cch\u014d"
    } ], [ "\u6b63\u548c", {
      reading: "\u3057\u3087\u3046\u308f",
      start: 1312,
      yomi: "Sh\u014dwa"
    } ], [ "\u6587\u4fdd", {
      reading: "\u3076\u3093\u307d\u3046",
      start: 1317,
      yomi: "Bump\u014d"
    } ], [ "\u5143\u5fdc", {
      reading: "\u3052\u3093\u304a\u3046",
      start: 1319,
      yomi: "Gen'\u014d"
    } ], [ "\u5143\u4ea8", {
      reading: "\u3052\u3093\u3053\u3046",
      start: 1321,
      yomi: "Genk\u014d"
    } ], [ "\u6b63\u4e2d", {
      reading: "\u3057\u3087\u3046\u3061\u3085",
      start: 1325,
      yomi: "Sh\u014dchu"
    } ], [ "\u5609\u66a6", {
      reading: "\u304b\u308a\u3083\u304f",
      start: 1326,
      yomi: "Karyaku"
    } ], [ "\u5143\u5fb3", {
      reading: "\u3052\u3093\u3068\u304f",
      start: 1329,
      yomi: "Gentoku"
    } ], [ "\u5143\u5f18", {
      reading: "\u3052\u3093\u3053\u3046",
      start: 1331,
      yomi: "Genk\u014d (Southern)"
    } ], [ "\u6b63\u6176", {
      reading: "\u3057\u3087\u3046\u3051\u3044",
      start: 1332,
      yomi: "Sh\u014dkei"
    } ], [ "\u5efa\u6b66", {
      reading: "\u3051\u3093\u3080",
      start: 1334,
      yomi: "Kemmu (Southern)"
    } ], [ "\u5ef6\u5143", {
      reading: "\u3048\u3044\u3052\u3093",
      start: 1336,
      yomi: "Eigen (Southern)"
    } ], [ "\u66a6\u5fdc", {
      reading: "\u308a\u3083\u304f\u304a\u3046",
      start: 1338,
      yomi: "Ryaku\u014d"
    } ], [ "\u8208\u56fd", {
      reading: "\u3053\u3046\u3053\u304f",
      start: 1340,
      yomi: "K\u014dkoku (Southern)"
    } ], [ "\u5eb7\u6c38", {
      reading: "\u3053\u3046\u3048\u3044",
      start: 1342,
      yomi: "K\u014dei"
    } ], [ "\u8c9e\u548c", {
      reading: "\u3058\u3087\u3046\u308f",
      start: 1345,
      yomi: "J\u014dwa"
    } ], [ "\u6b63\u5e73", {
      reading: "\u3057\u3087\u3046\u3078\u3044",
      start: 1347,
      yomi: "Sh\u014dhei (Southern)"
    } ], [ "\u89b3\u5fdc", {
      reading: "\u304b\u3093\u304a\u3046",
      start: 1350,
      yomi: "Kan'\u014d"
    } ], [ "\u6587\u548c", {
      reading: "\u3076\u3093\u306a",
      start: 1352,
      yomi: "Bunna"
    } ], [ "\u5ef6\u6587", {
      reading: "\u3048\u3093\u3076\u3093",
      start: 1356,
      yomi: "Embun"
    } ], [ "\u5eb7\u5b89", {
      reading: "\u3053\u3046\u3042\u3093",
      start: 1361,
      yomi: "K\u014dan"
    } ], [ "\u8c9e\u6cbb", {
      reading: "\u3058\u3087\u3046\u3058",
      start: 1362,
      yomi: "J\u014dji"
    } ], [ "\u5fdc\u5b89", {
      reading: "\u304a\u3046\u3042\u3093",
      start: 1368,
      yomi: "\u014can"
    } ], [ "\u5efa\u5fb3", {
      reading: "\u3051\u3093\u3068\u304f",
      start: 1370,
      yomi: "Kentoku (Southern)"
    } ], [ "\u6587\u4e2d", {
      reading: "\u3076\u3093\u3061\u3085\u3046",
      start: 1372,
      yomi: "Bunch\u016b (Southern)"
    } ], [ "\u6c38\u548c", {
      reading: "\u3048\u3044\u308f",
      start: 1375,
      yomi: "Eiwa"
    } ], [ "\u5929\u6388", {
      reading: "\u3066\u3093\u3058\u3085",
      start: 1375,
      yomi: "Tenju (Southern)"
    } ], [ "\u5eb7\u66a6", {
      reading: "\u3053\u3046\u308a\u3083\u304f",
      start: 1379,
      yomi: "K\u014dryaku"
    } ], [ "\u6c38\u5fb3", {
      reading: "\u3048\u3044\u3068\u304f",
      start: 1381,
      yomi: "Eitoku"
    } ], [ "\u5f18\u548c", {
      reading: "\u3053\u3046\u308f",
      start: 1381,
      yomi: "K\u014dwa (Southern)"
    } ], [ "\u81f3\u5fb3", {
      reading: "\u3057\u3068\u304f",
      start: 1384,
      yomi: "Shitoku"
    } ], [ "\u5143\u4e2d", {
      reading: "\u3052\u3093\u3061\u3085\u3046",
      start: 1384,
      yomi: "Gench\u016b (Southern)"
    } ], [ "\u5609\u6176", {
      reading: "\u304b\u3051\u3044",
      start: 1387,
      yomi: "Kakei"
    } ], [ "\u5eb7\u5fdc", {
      reading: "\u3053\u3046\u304a\u3046",
      start: 1389,
      yomi: "K\u014d\u014d"
    } ], [ "\u660e\u5fb3", {
      reading: "\u3081\u3044\u3068\u304f",
      start: 1390,
      yomi: "Meitoku"
    } ], [ "\u5fdc\u6c38", {
      reading: "\u304a\u3046\u3048\u3044",
      start: 1394,
      yomi: "\u014cei"
    } ], [ "\u6b63\u9577", {
      reading: "\u3057\u3087\u3046\u3061\u3087\u3046",
      start: 1428,
      yomi: "Sh\u014dch\u014d"
    } ], [ "\u6c38\u4eab", {
      reading: "\u3048\u3044\u304d\u3087\u3046",
      start: 1429,
      yomi: "Eiky\u014d"
    } ], [ "\u5609\u5409", {
      reading: "\u304b\u304d\u3064",
      start: 1441,
      yomi: "Kakitsu"
    } ], [ "\u6587\u5b89", {
      reading: "\u3076\u3093\u3042\u3093",
      start: 1444,
      yomi: "Bun'an"
    } ], [ "\u5b9d\u5fb3", {
      reading: "\u307b\u3046\u3068\u304f",
      start: 1449,
      yomi: "H\u014dtoku"
    } ], [ "\u4eab\u5fb3", {
      reading: "\u304d\u3087\u3046\u3068\u304f",
      start: 1452,
      yomi: "Ky\u014dtoku"
    } ], [ "\u5eb7\u6b63", {
      reading: "\u3053\u3046\u3057\u3087\u3046",
      start: 1455,
      yomi: "K\u014dsh\u014d"
    } ], [ "\u9577\u7984", {
      reading: "\u3061\u3087\u3046\u308d\u304f",
      start: 1457,
      yomi: "Ch\u014droku"
    } ], [ "\u5bdb\u6b63", {
      reading: "\u304b\u3093\u3057\u3087\u3046",
      start: 1461,
      yomi: "Kansh\u014d"
    } ], [ "\u6587\u6b63", {
      reading: "\u3076\u3093\u3057\u3087\u3046",
      start: 1466,
      yomi: "Bunsh\u014d"
    } ], [ "\u5fdc\u4ec1", {
      reading: "\u304a\u3046\u306b\u3093",
      start: 1467,
      yomi: "\u014cnin"
    } ], [ "\u6587\u660e", {
      reading: "\u3076\u3093\u3081\u3044",
      start: 1469,
      yomi: "Bummei"
    } ], [ "\u9577\u4eab", {
      reading: "\u3061\u3087\u3046\u304d\u3087\u3046",
      start: 1487,
      yomi: "Ch\u014dky\u014d"
    } ], [ "\u5ef6\u5fb3", {
      reading: "\u3048\u3093\u3068\u304f",
      start: 1489,
      yomi: "Entoku"
    } ], [ "\u660e\u5fdc", {
      reading: "\u3081\u3044\u304a\u3046",
      start: 1492,
      yomi: "Mei\u014d"
    } ], [ "\u6587\u4e80", {
      reading: "\u3076\u3093\u304d",
      start: 1501,
      yomi: "Bunki"
    } ], [ "\u6c38\u6b63", {
      reading: "\u3048\u3044\u3057\u3087\u3046",
      start: 1504,
      yomi: "Eish\u014d"
    } ], [ "\u5927\u6c38", {
      reading: "\u3060\u3044\u3048\u3044",
      start: 1521,
      yomi: "Daiei"
    } ], [ "\u4eab\u7984", {
      reading: "\u304d\u3087\u3046\u308d\u304f",
      start: 1528,
      yomi: "Ky\u014droku"
    } ], [ "\u5929\u6587", {
      reading: "\u3066\u3093\u3076\u3093",
      start: 1532,
      yomi: "Tembun"
    } ], [ "\u5f18\u6cbb", {
      reading: "\u3053\u3046\u3058",
      start: 1555,
      yomi: "K\u014dji"
    } ], [ "\u6c38\u7984", {
      reading: "\u3048\u3044\u308d\u304f",
      start: 1558,
      yomi: "Eiroku"
    } ], [ "\u5143\u4e80", {
      reading: "\u3052\u3093\u304d",
      start: 1570,
      yomi: "Genki"
    } ], [ "\u5929\u6b63", {
      reading: "\u3066\u3093\u3057\u3087\u3046",
      start: 1573,
      yomi: "Tensh\u014d"
    } ], [ "\u6587\u7984", {
      reading: "\u3076\u3093\u308d\u304f",
      start: 1593,
      yomi: "Bunroku"
    } ], [ "\u6176\u9577", {
      reading: "\u3051\u3044\u3061\u3087\u3046",
      start: 1596,
      yomi: "Keich\u014d"
    } ], [ "\u5143\u548c", {
      reading: "\u3052\u3093\u306a",
      start: 1615,
      yomi: "Genna"
    } ], [ "\u5bdb\u6c38", {
      reading: "\u304b\u3093\u3048\u3044",
      start: 1624,
      yomi: "Kan'ei"
    } ], [ "\u6b63\u4fdd", {
      reading: "\u3057\u3087\u3046\u307b\u3046",
      start: 1645,
      yomi: "Sh\u014dh\u014d"
    } ], [ "\u6176\u5b89", {
      reading: "\u3051\u3044\u3042\u3093",
      start: 1648,
      yomi: "Keian"
    } ], [ "\u627f\u5fdc", {
      reading: "\u3058\u3087\u3046\u304a\u3046",
      start: 1652,
      yomi: "J\u014d\u014d"
    } ], [ "\u660e\u66a6", {
      reading: "\u3081\u3044\u308c\u304d",
      start: 1655,
      yomi: "Meireki"
    } ], [ "\u4e07\u6cbb", {
      reading: "\u307e\u3093\u3058",
      start: 1658,
      yomi: "Manji"
    } ], [ "\u5bdb\u6587", {
      reading: "\u304b\u3093\u3076\u3093",
      start: 1661,
      yomi: "Kambun"
    } ], [ "\u5ef6\u5b9d", {
      reading: "\u3048\u3093\u307d\u3046",
      start: 1673,
      yomi: "Emp\u014d"
    } ], [ "\u5929\u548c", {
      reading: "\u3066\u3093\u306a",
      start: 1681,
      yomi: "Tenna"
    } ], [ "\u8c9e\u4eab", {
      reading: "\u3058\u3087\u3046\u304d\u3087\u3046",
      start: 1684,
      yomi: "J\u014dky\u014d"
    } ], [ "\u5143\u7984", {
      reading: "\u3052\u3093\u308d\u304f",
      start: 1688,
      yomi: "Genroku"
    } ], [ "\u5b9d\u6c38", {
      reading: "\u307b\u3046\u3048\u3044",
      start: 1704,
      yomi: "H\u014dei"
    } ], [ "\u6b63\u5fb3", {
      reading: "\u3057\u3087\u3046\u3068\u304f",
      start: 1711,
      yomi: "Sh\u014dtoku"
    } ], [ "\u4eab\u4fdd", {
      reading: "\u304d\u3087\u3046\u307b\u3046",
      start: 1716,
      yomi: "Ky\u014dh\u014d"
    } ], [ "\u5143\u6587", {
      reading: "\u3052\u3093\u3076\u3093",
      start: 1736,
      yomi: "Gembun"
    } ], [ "\u5bdb\u4fdd", {
      reading: "\u304b\u3093\u307d\u3046",
      start: 1741,
      yomi: "Kamp\u014d"
    } ], [ "\u5ef6\u4eab", {
      reading: "\u3048\u3093\u304d\u3087\u3046",
      start: 1744,
      yomi: "Enky\u014d"
    } ], [ "\u5bdb\u5ef6", {
      reading: "\u304b\u3093\u3048\u3093",
      start: 1748,
      yomi: "Kan'en"
    } ], [ "\u5b9d\u66a6", {
      reading: "\u307b\u3046\u308c\u304d",
      start: 1751,
      yomi: "H\u014dreki"
    } ], [ "\u660e\u548c", {
      reading: "\u3081\u3044\u308f",
      start: 1764,
      yomi: "Meiwa"
    } ], [ "\u5b89\u6c38", {
      reading: "\u3042\u3093\u3048\u3044",
      start: 1773,
      yomi: "An'ei"
    } ], [ "\u5929\u660e", {
      reading: "\u3066\u3093\u3081\u3044",
      start: 1781,
      yomi: "Temmei"
    } ], [ "\u5bdb\u653f", {
      reading: "\u304b\u3093\u305b\u3044",
      start: 1801,
      yomi: "Kansei"
    } ], [ "\u4eab\u548c", {
      reading: "\u304d\u3087\u3046\u308f",
      start: 1802,
      yomi: "Ky\u014dwa"
    } ], [ "\u6587\u5316", {
      reading: "\u3076\u3093\u304b",
      start: 1804,
      yomi: "Bunka"
    } ], [ "\u6587\u653f", {
      reading: "\u3076\u3093\u305b\u3044",
      start: 1818,
      yomi: "Bunsei"
    } ], [ "\u5929\u4fdd", {
      reading: "\u3066\u3093\u307d\u3046",
      start: 1831,
      yomi: "Temp\u014d"
    } ], [ "\u5f18\u5316", {
      reading: "\u3053\u3046\u304b",
      start: 1845,
      yomi: "K\u014dka"
    } ], [ "\u5609\u6c38", {
      reading: "\u304b\u3048\u3044",
      start: 1848,
      yomi: "Kaei"
    } ], [ "\u5b89\u653f", {
      reading: "\u3042\u3093\u305b\u3044",
      start: 1855,
      yomi: "Ansei"
    } ], [ "\u4e07\u5ef6", {
      reading: "\u307e\u3093\u3048\u3044",
      start: 1860,
      yomi: "Man'ei"
    } ], [ "\u6587\u4e45", {
      reading: "\u3076\u3093\u304d\u3085\u3046",
      start: 1861,
      yomi: "Bunky\u016b"
    } ], [ "\u5143\u6cbb", {
      reading: "\u3052\u3093\u3058",
      start: 1864,
      yomi: "Genji"
    } ], [ "\u6176\u5fdc", {
      reading: "\u3051\u3044\u304a\u3046",
      start: 1865,
      yomi: "Kei\u014d"
    } ], [ "\u660e\u6cbb", {
      reading: "\u3081\u3044\u3058",
      start: 1868,
      yomi: "Meiji"
    } ], [ "\u337e", {
      reading: "\u3081\u3044\u3058",
      start: 1868,
      yomi: "Meiji"
    } ], [ "\u5927\u6b63", {
      reading: "\u305f\u3044\u3057\u3087\u3046",
      start: 1912,
      yomi: "Taish\u014d"
    } ], [ "\u337d", {
      reading: "\u305f\u3044\u3057\u3087\u3046",
      start: 1912,
      yomi: "Taish\u014d"
    } ], [ "\u662d\u548c", {
      reading: "\u3057\u3087\u3046\u308f",
      start: 1926,
      yomi: "Sh\u014dwa"
    } ], [ "\u337c", {
      reading: "\u3057\u3087\u3046\u308f",
      start: 1926,
      yomi: "Sh\u014dwa"
    } ], [ "\u5e73\u6210", {
      reading: "\u3078\u3044\u305b\u3044",
      start: 1989,
      yomi: "Heisei"
    } ], [ "\u337b", {
      reading: "\u3078\u3044\u305b\u3044",
      start: 1989,
      yomi: "Heisei"
    } ], [ "\u4ee4\u548c", {
      reading: "\u308c\u3044\u308f",
      start: 2019,
      yomi: "Reiwa"
    } ], [ "\u32ff", {
      reading: "\u308c\u3044\u308f",
      start: 2019,
      yomi: "Reiwa"
    } ] ]);
    // This is a bit complicated because for a numeric year we don't require the
    // 年 but for 元年 we do. i.e. '令和2' is valid but '令和元' is not.
        const yearRegex = /(?:([0-9\uff10-\uff19\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e]+)\s*\u5e74?|(?:\u5143\s*\u5e74))/;
    function extractEraMetadata(text) {
      // Look for a year
      const matches = yearRegex.exec(text);
      if (!matches || matches.index === 0) return;
      // Look for an era
            const era = text.substring(0, matches.index).trim();
      if (!isEraName(era)) return;
      // Parse year
            let year = 0;
      if (typeof matches[1] !== "undefined") {
        year = parseNumber(matches[1]);
        if (typeof year === "number" && year < 1) year = null;
      }
      if (year === null) return;
      const matchLen = matches.index + matches[0].length;
      return {
        type: "era",
        era,
        year,
        matchLen
      };
    }
    function isEraName(text) {
      return yearMap.has(text);
    }
    function getEraInfo(text) {
      return yearMap.get(text);
    }
    // CONCATENATED MODULE: ./src/content/meta.ts
    function lookForMetadata({currentText, nodeText, matchCurrency, textEnd, textDelimiter}) {
      return (matchCurrency ? lookForCurrency({
        currentText,
        nodeText,
        textDelimiter
      }) : void 0) || lookForEra({
        currentText,
        nodeText,
        textEnd,
        textDelimiter
      }) || lookForShogi({
        nodeText,
        textDelimiter
      }) || lookForMeasure({
        nodeText,
        textDelimiter
      }) || {
        textDelimiter,
        textEnd
      };
    }
    function extractGetTextMetadata({text, matchCurrency}) {
      return (matchCurrency ? extractCurrencyMetadata(text) : void 0) || extractEraMetadata(text) || extractShogiMetadata(text) || extractMeasureMetadata(text) || extractNumberMetadata(text);
    }
    // CONCATENATED MODULE: ./src/content/scan-text.ts
    function scanText({startPosition, matchCurrency, maxLength}) {
      const {offsetNode: startNode, offset: startOffset} = startPosition;
      // Get the ancestor node for all inline nodes
            let inlineAncestor = startNode.parentElement;
      while (isInline(inlineAncestor) && !isRubyAnnotationElement(inlineAncestor)) inlineAncestor = inlineAncestor.parentElement;
      // Skip ruby annotation elements when traversing. However, don't do that
      // if the inline ancestor is itself a ruby annotation element or else
      // we'll never be able to find the starting point within the tree walker.
            let filter;
      if (!isRubyAnnotationElement(inlineAncestor)) filter = {
        acceptNode: node => node.parentElement?.closest("rp, rt") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      };
      // Setup a treewalker starting at the current node
            const treeWalker = document.createNodeIterator(inlineAncestor || startNode, NodeFilter.SHOW_TEXT, filter);
      /* eslint-disable curly */      while (treeWalker.referenceNode !== startNode && treeWalker.nextNode()) ;
      if (treeWalker.referenceNode !== startNode) {
        console.error("Could not find node in tree", startNode);
        return null;
      }
      // Look for start, skipping any initial whitespace
            let node = startNode;
      let offset = startOffset;
      do {
        const nodeText = node.data.substring(offset);
        const textStart = nodeText.search(/\S/);
        if (textStart !== -1) {
          offset += textStart;
          break;
        }
        // Curiously with our synthesized text nodes, the next node can sometimes
        // be the same node. We only tend to reach that case, however, when our
        // offset corresponds to the end of the text so we just detect that case
        // earlier on and don't bother checking it here.
                node = treeWalker.nextNode();
        offset = 0;
      } while (node);
      // (This should probably not traverse block siblings but oh well)
            if (!node) return null;
      const result = {
        text: "",
        textRange: []
      };
      let textDelimiter = nonJapaneseChar;
      // Look for range ends
            do {
        const nodeText = node.data.substring(offset);
        let textEnd = nodeText.search(textDelimiter);
        // Check if we are looking at a special string that accepts a different
        // range of characters.
                if (textDelimiter === nonJapaneseChar) {
          const currentText = result.text + nodeText.substring(0, textEnd === -1 ? void 0 : textEnd);
          // Check if we should further expand the set of allowed characters in
          // order to recognize certain types of metadata-type strings (e.g. years
          // or floor space measurements).
                    ({textDelimiter, textEnd} = lookForMetadata({
            currentText,
            matchCurrency,
            nodeText,
            textDelimiter,
            textEnd
          }));
        }
        if (typeof maxLength === "number" && maxLength >= 0) {
          const maxEnd = maxLength - result.text.length;
          if (textEnd === -1) 
          // The >= here is important since it means that if the node has
          // exactly enough characters to reach the maxLength then we will
          // stop walking the tree at this point.
          textEnd = node.data.length - offset >= maxEnd ? maxEnd : -1; else textEnd = Math.min(textEnd, maxEnd);
        }
        if (textEnd === 0) break; else if (textEnd !== -1) {
          // The text node has disallowed characters mid-way through so
          // return up to that point.
          result.text += nodeText.substring(0, textEnd);
          result.textRange.push({
            node,
            start: offset,
            end: offset + textEnd
          });
          break;
        }
        // The whole text node is allowed characters, keep going.
                result.text += nodeText;
        result.textRange.push({
          node,
          start: offset,
          end: node.data.length
        });
        node = treeWalker.nextNode();
        offset = 0;
      } while (node && inlineAncestor && (node.parentElement === inlineAncestor || isInline(node.parentElement)));
      // Check if we didn't find any suitable characters
            if (!result.textRange.length) return null;
      result.meta = extractGetTextMetadata({
        text: result.text,
        matchCurrency
      });
      return result;
    }
    function isRubyAnnotationElement(element) {
      return element?.matches("rp, rt");
    }
    function isInline(element) {
      return element && (// We always treat <rb> and <ruby> tags as inline regardless of the styling
      // since sites like renshuu.org do faux-ruby styling where they give these
      // elements styles like 'display: table-row-group'.
      // We also make an exception for <span> because pdf.js uses
      // absolutely-positioned (and hence `display: block`) spans to lay out
      // characters in vertical text.
      // Furthermore, we treat inline-block as inline because YouTube puts
      // okurigana in a separate inline-block span when using ruby.
      // Finally, if an element's parent is inline-block, then the element will
      // still be laid out "inline" so we allow that too (and that appears to be
      // used by Kanshudo at least).
      // Given all these exceptions, I wonder if we should even both checking
      // the display property.
      [ "RB", "RUBY", "SPAN" ].includes(element.tagName) || [ "inline", "inline-block", "ruby", "ruby-base", "ruby-text" ].includes(getComputedStyle(element).display) || element.parentElement && getComputedStyle(element.parentElement)?.display === "inline-block");
    }
    // CONCATENATED MODULE: ./src/content/get-text.ts
    // Cache of previous result (since often the mouse position will change but
    // the cursor position will not).
    let previousResult;
    function getTextAtPoint({matchCurrency = true, matchText = true, matchImages = true, point, maxLength}) {
      // First check for a cache hit on the glyph bounding box
      // This will often be the case when scanning along a line of text
      if (previousResult?.firstCharBbox && bboxIncludesPoint({
        bbox: previousResult.firstCharBbox,
        point
      })) return previousResult.result;
      // First fetch the hit elements (dropping duplicates)
            const elements = [ ...new Set(document.elementsFromPoint(point.x, point.y)) ];
      // Look for text matches
            const [position, scanNode] = matchText ? getTextNodeStart({
        elements,
        maxLength,
        point
      }) : [ null, null ];
      // Check if we have a cache hit on the position
      
      // This will mostly happen when we are working with non-text nodes (e.g. input
      // boxes) or when the cursor is moving just outside the glyph bounds (e.g.
      // along the top of a line).
            if (position && position.offsetNode === previousResult?.position?.offsetNode && position.offset === previousResult?.position?.offset) return previousResult.result;
      const synthesizedPosition = position ? {
        offsetNode: scanNode || position.offsetNode,
        offset: position.offset
      } : void 0;
      if (position && isTextNodePosition(synthesizedPosition)) {
        const result = scanText({
          startPosition: synthesizedPosition,
          matchCurrency,
          maxLength
        });
        if (result) {
          console.assert(!!result.textRange, "There should be a text range when getting text from a text node");
          // If we synthesized a text node, substitute the original node into the
          // result.
                    if (position.offsetNode !== synthesizedPosition.offsetNode) {
            console.assert(result.textRange?.length === 1, "When using a synthesized text node there should be a single range");
            console.assert(result.textRange[0].node === scanNode, "When using a synthesized text node the range should start" + " from that node");
            result.textRange[0].node = position.offsetNode;
          }
          previousResult = {
            point,
            position,
            result,
            firstCharBbox: getFirstCharBbox(position)
          };
          return result;
        }
      }
      // Otherwise just pull whatever text we can off the element
            const elem = elements[0];
      if (elem) {
        const text = getTextFromRandomElement({
          elem,
          matchImages,
          matchText
        });
        if (text) {
          const result = {
            text,
            textRange: null
          };
          previousResult = {
            point,
            position: void 0,
            result
          };
          return result;
        }
      }
      // We haven't found anything, but if the cursor hasn't moved far we should
      // just re-use the last result so the user doesn't have try to keep the
      // mouse over the text precisely in order to read the result.
            if (previousResult) {
        const dx = previousResult.point.x - point.x;
        const dy = previousResult.point.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 4) return previousResult.result;
      }
      previousResult = void 0;
      return null;
    }
    // For unit testing
        function getFirstCharBbox(position) {
      if (!isTextNodePosition(position)) return;
      const firstCharRange = getRangeForSingleCodepoint({
        source: position.offsetNode,
        offset: position.offset
      });
      // Skip empty ranges
            if (firstCharRange.collapsed) return;
      return getBboxForSingleCodepointRange(firstCharRange);
    }
    function getTextNodeStart({elements, maxLength, point}) {
      let position = getCursorPosition({
        point,
        elements
      });
      // If we have a textual <input> node or a <textarea> we synthesize a
      // text node and use that for finding text since it allows us to re-use
      // the same handling for text nodes and 'value' attributes.
            if (isTextInputPosition(position)) {
        if (position.offset === position.offsetNode.value.length) return [ null, null ];
        return [ position, document.createTextNode(position.offsetNode.value) ];
      }
      // Similarly, if we have a Google Docs node, synthesize a node to scan.
            if (isGdocsOverlayPosition(position)) {
        let text = "";
        ({position, text} = getTextFromAnnotatedCanvas({
          maxLength,
          point
        }));
        return position ? [ position, document.createTextNode(text) ] : [ null, null ];
      }
      return [ position, null ];
    }
    function getTextFromRandomElement({elem, matchImages, matchText}) {
      // Don't return anything for an iframe since this script will run inside the
      // iframe's contents as well.
      if (elem.nodeName === "IFRAME") return null;
      // We divide the world into two types of elements: image-like elements and the
      // rest which we presume to be "text" elements.
            const isImage = getContentType(elem) === "image";
      if (isImage && !matchImages || !isImage && !matchText) return null;
      if (hasTitleAttribute(elem) && elem.title.length) return elem.title;
      if (hasAltAttribute(elem) && elem.alt.length) 
      // Ignore the default '画像' alt text Twitter and others put on many of their
      // images.
      return elem.alt !== "\u753b\u50cf" ? elem.alt : null;
      if (elem.nodeName === "OPTION") return elem.text;
      if (isSelectElement(elem)) return elem.options[elem.selectedIndex].text;
      return null;
    }
    function hasTitleAttribute(elem) {
      return typeof elem.title === "string";
    }
    function hasAltAttribute(elem) {
      return typeof elem.alt === "string";
    }
    function isSelectElement(elem) {
      return elem.nodeName === "SELECT";
    }
    // CONCATENATED MODULE: ./src/content/iframes.ts
    function findIframeElement(params) {
      // First collect together all the iframes we can.
      const iframes = getIframes(document);
      if (!iframes.length) return;
      if (iframes.length === 1) return iframes[0];
      // Look for an iframe that matches on frameId
            if (typeof params.frameId === "number") {
        // Use the getFrameId API if available
        // If it is available, we treat this as definitive since, at least in
        // Firefox, it should work for cross-origin iframes, unlike when using the
        // data attribute.
        if (typeof browser_polyfill_default().runtime.getFrameId === "function") return iframes.find((iframe => browser_polyfill_default().runtime.getFrameId(iframe) === params.frameId));
        // Otherwise look for a frameId stored in a data attribute
                const frameIdMatch = iframes.find((f => f.dataset.frameId === String(params.frameId)));
        if (frameIdMatch) return frameIdMatch;
      }
      // Then try to narrow the list by matches on initialSrc or currentSrc
            let candidates = iframes.filter((f => f.src && (f.src === params.initialSrc || f.src === params.currentSrc)));
      if (!candidates.length) candidates = iframes;
      if (candidates.length === 1) return candidates[0];
      // We have multiple candidates, so try to sort by those with the closest
      // dimensions.
            if (params.dimensions) candidates.sort(((a, b) => {
        const aDimensions = getIframeDimensions(a);
        const aDiff = Math.abs(params.dimensions.width - aDimensions.width) + Math.abs(params.dimensions.height - aDimensions.height);
        const bDimensions = getIframeDimensions(b);
        const bDiff = Math.abs(params.dimensions.width - bDimensions.width) + Math.abs(params.dimensions.height - bDimensions.height);
        return aDiff - bDiff;
      }));
      return candidates[0];
    }
    function getIframes(doc) {
      const iframes = [ ...doc.getElementsByTagName("iframe"), ...doc.getElementsByTagName("frame") ];
      // For same-origin iframes, fetch their child iframe elements recursively.
            for (const iframe of iframes) {
        // If we try to access iframe.contentDocument and it's cross-origin,
        // Safari will print an error to the console. In fact, even if we just use
        // `typeof iframe.contentDocument` it will print the same message.
        // Inspecting the contentWindow doesn't seem to provide any clues either.
        // However, if we try to access `iframe.contentWindow.frameElement` it
        // will throw a SecurityError which we can detect and it won't print
        // anything to the console.
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          iframe.contentWindow?.frameElement;
        } catch {
          continue;
        }
        if (iframe.contentDocument) iframes.push(...getIframes(iframe.contentDocument));
      }
      return iframes;
    }
    function getIframeDimensions(elem) {
      // In order to get dimensions that will correspond with the innerHeight /
      // innerWidth that the iframe sees on its document element we should use the
      // offsetWidth / offsetHeight and subtract and borders and padding.
      const cs = getComputedStyle(elem);
      const width = elem.offsetWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth);
      const height = elem.offsetHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - parseFloat(cs.borderTopWidth) - parseFloat(cs.borderBottomWidth);
      return {
        width,
        height
      };
    }
    let cachedOrigin;
    function getIframeOrigin(iframeElement) {
      if (cachedOrigin?.iframe === iframeElement) return cachedOrigin.origin; else if (cachedOrigin) {
        cachedOrigin.resizeObserver.disconnect();
        cachedOrigin = void 0;
      }
      const resizeObserver = new ResizeObserver((() => {
        cachedOrigin = void 0;
        resizeObserver.disconnect();
      }));
      let x = 0;
      let y = 0;
      let currentIframe = iframeElement;
      let iterationCount = 0;
      while (currentIframe && iterationCount < 20) {
        // I don't _think_ you can ever have circular references of iframes but just
        // in case, we'll limit the number of iterations.
        iterationCount++;
        let {left: currentX, top: currentY} = currentIframe.getBoundingClientRect();
        // The bounding client rect includes the element and its borders and padding.
        // However, the coordinates within the iframe are minus the borders and
        // padding.
        
        // Note that if these values change, the ResizeObserver _should_ fire because
        // it is supposed to fire when either the iframe's border box _or_ content box
        // size changes.
                const cs = getComputedStyle(currentIframe);
        currentX += parseFloat(cs.borderLeftWidth);
        currentY += parseFloat(cs.paddingLeft);
        currentX += parseFloat(cs.borderTopWidth);
        currentY += parseFloat(cs.paddingTop);
        x += currentX;
        y += currentY;
        resizeObserver.observe(currentIframe);
        // See if there are parent iframes we need to account for.
                try {
          const parentIframe = currentIframe.ownerDocument.defaultView?.frameElement;
          if (parentIframe instanceof HTMLIFrameElement || parentIframe instanceof HTMLFrameElement) currentIframe = parentIframe; else currentIframe = null;
        } catch {
          currentIframe = null;
        }
      }
      cachedOrigin = {
        iframe: iframeElement,
        origin: {
          x,
          y
        },
        resizeObserver
      };
      return cachedOrigin.origin;
    }
    // Called from within an iframe, returns the window dimensions using a size that
    // should match the size we expect when expecting the <iframe> element from its
    // parent.
        function getWindowDimensions() {
      if (document.compatMode === "BackCompat") return {
        width: document.body?.clientWidth ?? window.innerWidth,
        height: document.body?.clientHeight ?? window.innerHeight
      }; else return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    // CONCATENATED MODULE: ./src/content/keyboard.ts
    function normalizeKey(key) {
      const upperKey = key.toUpperCase();
      switch (upperKey) {
       case "ESCAPE":
        return "ESC";

       case "CONTROL":
        return "CTRL";

       case " ":
        return "SPACE";
      }
      return upperKey;
    }
    function normalizeKeys(keys) {
      return keys.map(normalizeKey);
    }
    function hasModifiers(event) {
      const key = normalizeKey(event.key);
      return event.ctrlKey && key !== "CTRL" || (event.altKey || event.getModifierState("AltGraph")) && key !== "ALT" || event.shiftKey && key !== "SHIFT" || event.metaKey && key !== "META";
    }
    // CONCATENATED MODULE: ./src/content/popup/copy-state.ts
    // Convenience method to extract the mode
    function getCopyMode(state) {
      return state.kind !== "inactive" ? state.mode : "n/a";
    }
    // CONCATENATED MODULE: ./src/utils/themes.ts
    function getThemeClass(theme) {
      if (theme !== "default") return `theme-${theme}`;
      // It is up to the call site to register for media query updates if they
      // need to respond to dark mode changes. Generally, e.g. for popups etc.,
      // however, the usage of this value is short-lived enough that it's not
      // needed.
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "theme-black";
      return "theme-light";
    }
    // CONCATENATED MODULE: ./src/utils/hash.ts
    function getHash(input) {
      // Based on https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
      // I really have no idea if it's right. All we really use it for is to detect
      // if we need to replace the stylesheet data or not.
      let h1 = 0xdeadbeef;
      let h2 = 0x41c6ce57;
      for (let ch, i = 0; i < input.length; i++) {
        ch = input.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
      h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
      const asNum = 4294967296 * (2097151 & h2) + (h1 >>> 0);
      return ("0000000000000" + asNum.toString(16)).substr(-14);
    }
    // CONCATENATED MODULE: ./src/content/svg.ts
    const isSvgDoc = doc => doc.documentElement.namespaceURI === SVG_NS;
    const isForeignObjectElement = elem => !!elem && elem.namespaceURI === SVG_NS && elem.nodeName.toUpperCase() === "FOREIGNOBJECT"
    // This is only needed because Edge's WebIDL definitions are wrong
    // (they have documentElement as having type HTMLElement)
    ;
    const isSvgSvgElement = elem => !!elem && elem.namespaceURI === SVG_NS && elem.nodeName.toUpperCase() === "SVG";
    // CONCATENATED MODULE: ./src/content/content-container.ts
    function getOrCreateEmptyContainer({id, styles, before, legacyIds}) {
      // Drop any legacy containers
      if (legacyIds?.length) {
        const legacyContainers = document.querySelectorAll(legacyIds.map((id => `#${id}`)).join(", "));
        for (const container of legacyContainers) removeContainerElement(container);
      }
      // Look for an existing container we can re-use
            const existingContainers = Array.from(document.querySelectorAll(`#${id}`));
      if (existingContainers.length) {
        // Drop any duplicate containers, returning only the last one
        while (existingContainers.length > 1) removeContainerElement(existingContainers.shift());
        // Drop any existing content (except styles)
                resetContent(existingContainers[0]);
        // Make sure the styles are up-to-date
                resetStyles({
          container: existingContainers[0],
          styles
        });
        // Make sure we have a fullscreenchange callback registered
                addFullScreenChangeCallback({
          id,
          before
        });
        return existingContainers[0];
      }
      // We didn't find an existing content container so create a new one
            const container = document.createElementNS(HTML_NS, "div");
      container.id = id;
      addContainerElement({
        elem: container,
        before
      });
      // Reset any styles the page may have applied.
            container.style.all = "initial";
      // Add the necessary style element
            resetStyles({
        container,
        styles
      });
      // Update the position in the document if we go to/from fullscreen mode
            addFullScreenChangeCallback({
        id,
        before
      });
      return container;
    }
    function removeContentContainer(id) {
      const containerIds = typeof id === "string" ? [ id ] : id;
      const containers = Array.from(document.querySelectorAll(containerIds.map((id => `#${id}`)).join(", ")));
      for (const container of containers) removeContainerElement(container);
      for (const id of containerIds) removeFullScreenChangeCallback(id);
    }
    // --------------------------------------------------------------------------
    
    // Implementation helpers
    
    // --------------------------------------------------------------------------
        function addContainerElement({elem, before}) {
      const previousParent = elem.parentElement;
      // Set up a method to add to the DOM, respecting any `before` ID we might
      // have.
            const insertBefore = (parent, elem) => {
        const beforeElem = before ? parent.children.namedItem(before) : null;
        if (beforeElem) parent.insertBefore(elem, beforeElem); else parent.append(elem);
      };
      let parent;
      if (document.fullscreenElement) parent = document.fullscreenElement; else if (isSvgDoc(document)) {
        // For SVG documents we put the container <div> inside a <foreignObject>.
        const foreignObject = document.createElementNS(SVG_NS, "foreignObject");
        foreignObject.setAttribute("width", "100%");
        foreignObject.setAttribute("height", "100%");
        foreignObject.style.setProperty("pointer-events", "none", "important");
        foreignObject.style.setProperty("overflow", "visible", "important");
        insertBefore(document.documentElement, foreignObject);
        parent = foreignObject;
      } else parent = document.documentElement;
      insertBefore(parent, elem);
      // If our previous parent was a foreignObject wrapper, drop it
            if (isForeignObjectElement(previousParent)) previousParent.remove();
    }
    function removeContainerElement(elem) {
      if (isForeignObjectElement(elem.parentElement)) elem.parentElement.remove(); else elem.remove();
    }
    const fullScreenChangedCallbacks = {};
    function addFullScreenChangeCallback({id, before}) {
      const existingCallback = fullScreenChangedCallbacks[id];
      if (typeof existingCallback !== "undefined") return;
      const callback = () => {
        const container = document.getElementById(id);
        if (!container) return;
        // Re-add the container element, respecting the updated
        // document.fullScreenElement property.
                addContainerElement({
          elem: container,
          before
        });
      };
      document.addEventListener("fullscreenchange", callback);
      fullScreenChangedCallbacks[id] = callback;
    }
    function removeFullScreenChangeCallback(id) {
      const callback = fullScreenChangedCallbacks[id];
      if (callback) document.removeEventListener("fullscreenchange", callback);
    }
    function resetContent(elem) {
      if (!elem.shadowRoot) return;
      const children = Array.from(elem.shadowRoot.children);
      for (const child of children) 
      // We need to convert to uppercase because for standalone SVG documents the
      // tag name case is not normalized.
      if (child.tagName.toUpperCase() !== "STYLE") child.remove();
    }
    function resetStyles({container, styles}) {
      const styleHash = getHash(styles);
      if (!container.shadowRoot) {
        container.attachShadow({
          mode: "open"
        });
        // Add <style>
                const style = document.createElementNS(HTML_NS, "style");
        style.textContent = styles;
        style.dataset.hash = styleHash;
        container.shadowRoot.append(style);
      } else {
        // Reset style
        let existingStyle = container.shadowRoot.querySelector("style");
        if (existingStyle && existingStyle.dataset.hash !== styleHash) {
          existingStyle.remove();
          existingStyle = null;
        }
        if (!existingStyle) {
          const style = document.createElementNS(HTML_NS, "style");
          style.textContent = styles;
          style.dataset.hash = styleHash;
          container.shadowRoot.append(style);
        }
      }
    }
    // CONCATENATED MODULE: ./src/content/popup/font-styles.ts
    function addFontStyles() {
      if (document.getElementById("tenten-font-styles")) return;
      (document.head || document.documentElement).append(html("link", {
        id: "tenten-font-styles",
        rel: "stylesheet",
        href: browser_polyfill_default().runtime.getURL("css/popup-fonts.css")
      }));
    }
    function removeFontStyles() {
      document.getElementById("tenten-font-styles")?.remove();
    }
    // CONCATENATED MODULE: ./src/content/popup/popup.ts
    function isPopupVisible() {
      const popupContainer = getPopupContainer();
      return !!popupContainer && !popupContainer.classList.contains("hidden");
    }
    function hidePopup() {
      getPopupContainer()?.classList.add("hidden");
    }
    function removePopup() {
      removeContentContainer([ "rikaichamp-window", "tenten-ja-window" ]);
      removeFontStyles();
    }
    function setFontFace(fontFace) {
      const popupWindow = getPopupWindow();
      if (!popupWindow) return;
      if (fontFace === "bundled") {
        addFontStyles();
        popupWindow.classList.add("bundled-fonts");
      } else {
        removeFontStyles();
        popupWindow.classList.remove("bundled-fonts");
      }
    }
    function setFontSize(size) {
      const popupWindow = getPopupWindow();
      if (!popupWindow) return;
      for (const className of popupWindow.classList.values()) if (className.startsWith("font-")) popupWindow.classList.remove(className);
      if (size !== "normal") popupWindow.classList.add(`font-${size}`);
    }
    function setPopupStyle(style) {
      const elems = [ getPopupWindow(), getPopupArrow() ];
      for (const elem of elems) {
        if (!elem) continue;
        for (const className of elem.classList.values()) if (className.startsWith("theme-")) elem.classList.remove(className);
        elem.classList.add(getThemeClass(style));
      }
    }
    function getPopupWindow() {
      const hostElem = document.getElementById("tenten-ja-window");
      return hostElem && hostElem.shadowRoot ? hostElem.shadowRoot.querySelector(".window") : null;
    }
    function getPopupArrow() {
      const hostElem = document.getElementById("tenten-ja-window");
      return hostElem && hostElem.shadowRoot ? hostElem.shadowRoot.querySelector(".arrow") : null;
    }
    // CONCATENATED MODULE: ./src/content/popup/popup-position.ts
    var popup_position_PopupPositionMode =  function(PopupPositionMode) {
      PopupPositionMode[PopupPositionMode["Start"] = 0] = "Start";
      PopupPositionMode[PopupPositionMode["TopLeft"] = 0] = "TopLeft";
      PopupPositionMode[PopupPositionMode["Auto"] = 1] = "Auto";
      PopupPositionMode[PopupPositionMode["BottomRight"] = 2] = "BottomRight";
      PopupPositionMode[PopupPositionMode["End"] = 2] = "End";
      return PopupPositionMode;
    }({});
    // Minimum space to leave between the edge of the pop-up and the edge of the
    // stage.
        const GUTTER = 5;
    // Minimum space to leave between the edge of the pop-up and the cursor when in
    // interactive mode.
    
    // We don't want this value to be too large or else it becomes too hard to move
    // the mouse over the popup.
        const INTERACTIVE_MARGIN_TO_POPUP = 10;
    // Minimum space to leave between the edge of the pop-up and the cursor when we
    // are NOT in interactive mode. In future we'd probably like to make this the
    // same value as INTERACTIVE_MARGIN_TO_POPUP but for now it's safest to keep
    // things as they are.
        const NON_INTERACTIVE_MARGIN_TO_POPUP = 25;
    function getPopupPosition({allowVerticalOverlap, cursorClearance, cursorPos, fixedPosition, interactive, isVerticalText, popupSize, positionMode, safeArea: initialSafeArea, pointerType}) {
      const {scrollX, scrollY} = getScrollOffset();
      // Use the clientWidth (as opposed to doc.defaultView.innerWidth) since this
      // excludes the width of any scrollbars.
            const stageWidth = document.documentElement.clientWidth;
      // For the height, we'd like to similarly use clientHeight...
            let stageHeight = document.documentElement.clientHeight;
      // ... but we need to be careful because:
      
      // (a) in quirks mode, the body has the viewport height;
            if (document.compatMode === "BackCompat") stageHeight = document.body?.clientHeight || document.defaultView.innerHeight;
      // (b) at least in iOS 15 Safari, the safe area appears to be measured from
      // the innerHeight so if we have a non-zero vertical safe area inset, we
      // should use the innerHeight instead.
            if (initialSafeArea.top !== 0 || initialSafeArea.bottom !== 0) stageHeight = document.defaultView.innerHeight;
      // Now that we have finished detecting the absence/presence of a vertical safe
      // area, merge our gutter into the safe area.
            const safeArea = {
        left: initialSafeArea.left + GUTTER,
        right: initialSafeArea.right + GUTTER,
        top: initialSafeArea.top + GUTTER,
        bottom: initialSafeArea.bottom + GUTTER
      };
      if (fixedPosition) return getFixedPosition({
        allowVerticalOverlap,
        cursorClearance,
        cursorPos,
        fixedPosition,
        interactive,
        popupSize,
        safeArea,
        scrollX,
        scrollY,
        stageWidth,
        stageHeight
      });
      if (positionMode === 1) return getAutoPosition({
        allowVerticalOverlap,
        cursorClearance,
        cursorPos,
        interactive,
        isVerticalText,
        popupSize,
        safeArea,
        scrollX,
        scrollY,
        stageWidth,
        stageHeight,
        pointerType
      });
      
      // Manual positioning
      
            const availableStageHeight = stageHeight - (safeArea.top + safeArea.bottom);
      const left = scrollX + safeArea.left;
      const top = scrollY + safeArea.top;
      const right = scrollX + stageWidth - popupSize.width - safeArea.right;
      const bottom = scrollY + stageHeight - Math.min(popupSize.height, availableStageHeight) - safeArea.bottom;
      // We could calculate a value for constrainHeight as something like:
      
      //   constrainHeight = popupSize.height > availableWindowHeight
      //                     ? availableWindowHeight
      //                     : null;
      
      // and we'd get the nice fade effect to show in that case, but it's probably
      // more useful to NOT constrain it and let the user scroll if the content
      // overflows the viewport.
            switch (positionMode) {
       case 0:
        return {
          x: left,
          y: top,
          constrainWidth: null,
          constrainHeight: null,
          direction: "disjoint",
          side: "disjoint"
        };

       case 2:
        return {
          x: right,
          y: bottom,
          constrainWidth: null,
          constrainHeight: null,
          direction: "disjoint",
          side: "disjoint"
        };
      }
    }
    function getFixedPosition({allowVerticalOverlap, cursorClearance, cursorPos, fixedPosition, interactive, popupSize, safeArea, scrollX, scrollY, stageWidth, stageHeight}) {
      // Work out our safe area in screen coordinates (as opposed to an inset).
      let {left: safeLeft, top: safeTop} = safeArea;
      let safeRight = stageWidth - safeArea.right;
      const stageBottom = stageHeight - safeArea.bottom;
      let safeBottom = stageBottom;
      // Convert inputs to screen coordinates
            let screenY = fixedPosition.y - scrollY;
      let screenX = fixedPosition.x - scrollX;
      // See if we can further constrain the area to place the popup in based on
      // the text being highlighted.
            const {direction, anchor, side} = fixedPosition;
      if (direction !== "disjoint" && side !== "disjoint" && cursorPos) {
        const [min, max] = getRangeForPopup({
          axis: direction,
          cursorClearance,
          interactive,
          side,
          safeBoundaries: {
            safeLeft,
            safeRight,
            safeTop,
            safeBottom
          },
          target: cursorPos
        });
        if (direction === "vertical") safeBottom = max; else {
          safeLeft = min;
          safeRight = max;
        }
      }
      // Height constraints
            let constrainHeight = null;
      let verticalOverflow = Math.max(screenY + popupSize.height - safeBottom, 0);
      // See if we can unconstrain the height by overlapping the cursor.
            if (verticalOverflow && allowVerticalOverlap) {
        const nudgeAmount = Math.min(verticalOverflow, screenY - safeTop);
        screenY -= nudgeAmount;
        verticalOverflow = Math.max(screenY + popupSize.height - stageBottom, 0);
      }
      if (verticalOverflow && shouldConstrainHeight({
        interactive,
        direction,
        side
      })) constrainHeight = popupSize.height - verticalOverflow;
      // The x position and width will depend on if we are anchoring to the left or
      // right.
            let constrainWidth;
      if (anchor !== "right") constrainWidth = screenX + popupSize.width > safeRight ? safeRight - screenX : null; else {
        constrainWidth = screenX - popupSize.width < safeLeft ? screenX - safeLeft : null;
        screenX = constrainWidth !== null ? screenX - constrainWidth : screenX - popupSize.width;
      }
      return {
        x: screenX + scrollX,
        y: screenY + scrollY,
        constrainWidth,
        constrainHeight,
        direction,
        side
      };
    }
    function shouldConstrainHeight(options) {
      // If we're not interactive, we don't want to constrain the height because
      // the user can't scroll the popup to see the rest of the content (but they
      // _can_ scroll the page).
      // However, if the popup is positioned above the cursor, we need to constrain
      // the height otherwise it will cover up the cursor.
      return options.interactive || options.direction === "vertical" && options.side === "before";
    }
    function getAutoPosition({allowVerticalOverlap, cursorClearance, cursorPos, interactive, isVerticalText, popupSize, safeArea, scrollX, scrollY, stageWidth, stageHeight, pointerType}) {
      const extendedPosition = getScreenAutoPosition({
        allowVerticalOverlap,
        cursorClearance,
        cursorPos,
        interactive,
        isVerticalText,
        popupSize,
        safeArea,
        stageWidth,
        stageHeight,
        pointerType
      });
      return extendedPosition ? {
        ...extendedPosition.position,
        x: extendedPosition.position.x + scrollX,
        y: extendedPosition.position.y + scrollY,
        constrainHeight: shouldConstrainHeight({
          interactive,
          direction: extendedPosition.axis,
          side: extendedPosition.side
        }) ? extendedPosition.position.constrainHeight : null
      } : {
        x: scrollX,
        y: scrollY,
        constrainWidth: null,
        constrainHeight: null,
        direction: "disjoint",
        side: "disjoint"
      };
    }
    function getScreenAutoPosition({allowVerticalOverlap, cursorClearance, cursorPos, interactive, isVerticalText, popupSize, safeArea, stageWidth, stageHeight, pointerType}) {
      // Set up a few useful variables...
      const x = cursorPos?.x || 0;
      const y = cursorPos?.y || 0;
      const {left: safeLeft, top: safeTop} = safeArea;
      const safeRight = stageWidth - safeArea.right;
      const safeBottom = stageHeight - safeArea.bottom;
      // Generate the possible position sizes in order of preference.
      
      // We prefer positions in the block direction on the 'after' side unless we
      // are looking up horizontal text with the puck, in which case we prefer the
      // 'before' side (i.e. above the target text).
      // Prefer the block direction
            const axisOrder = isVerticalText ? [ "horizontal", "vertical" ] : [ "vertical", "horizontal" ];
      // Prefer the 'after' side
            const sides = [ "after", "before" ];
      // Store the possible layouts
            const candidates = [];
      for (const axis of axisOrder) {
        // Prefer the 'before' side when we are looking up horizontal text with the
        // puck.
        const swapSides = pointerType === "puck" && axis === "vertical";
        for (const side of swapSides ? sides.slice().reverse() : sides) {
          const position = calculatePosition({
            axis,
            cursorClearance,
            interactive,
            popupSize,
            safeBoundaries: {
              safeLeft,
              safeRight,
              safeTop,
              safeBottom
            },
            target: {
              x,
              y
            },
            side
          });
          candidates.push(position ? {
            axis,
            side,
            position
          } : void 0);
        }
      }
      // See if we have an unconstrained position in the block direction, and if so,
      // use that.
            const blockCandidates = candidates.slice(0, 2);
      const blockPosition = blockCandidates.find((candidate => candidate && (isVerticalText ? candidate.position.constrainWidth : candidate.position.constrainHeight) === null));
      if (blockPosition) return blockPosition;
      // Beyond that, our behavior depends on the sort of screen we're dealing with.
      
      // There are two modes:
      
      // A) In the general case, we want to stick to one of the block direction
      //    positions so we need to work out which direction is _less_ constrained.
      
      // B) However, if the user is on a small screen which has more room in the
      //    inline direction (i.e. it's in "landscape mode" as far as the block
      //    direction is concerned) then putting the popup to the side could be
      //    quite helpful so we should check all the possible positions.
            let bestPosition;
      if (!isSmallLandscapeScreen({
        isVerticalText,
        safeBoundaries: {
          safeLeft,
          safeRight,
          safeTop,
          safeBottom
        }
      })) bestPosition = blockCandidates.sort(sizeComparator(popupSize))[0];
      // Otherwise, use the layout with the greatest width/area.
            if (!bestPosition) bestPosition = candidates.sort(sizeComparator(popupSize))[0];
      if (!bestPosition) return;
      // Now that we have our best position, see if we can unconstrain it by
      // allowing overlap.
            if (allowVerticalOverlap && bestPosition.axis === "vertical" && bestPosition.position.constrainHeight) {
        const {position} = bestPosition;
        // Nudge up the top
                const nudgeAmount = Math.min(popupSize.height - position.constrainHeight, position.y - safeTop);
        position.y -= nudgeAmount;
        // See if we are still constrained
                if (position.y + popupSize.height > safeBottom) position.constrainHeight = safeBottom - position.y; else position.constrainHeight = null;
      }
      return bestPosition;
    }
    function calculatePosition({axis, cursorClearance, interactive, popupSize, safeBoundaries: {safeLeft, safeRight, safeTop, safeBottom}, side, target}) {
      // Cross-axis position
      // (e.g. horizontal position when we are laying the popup out on the vertical
      // axis).
      // We want the popup to be positioned slightly "before" the target position so
      // that if we are showing an arrow from the popup to the target position there
      // is enough slack to position the arrow inside the popup and still have it
      // line up with the target.
      // Graphically,
      //    x <-- target
      //  ╭^─────╮
      //   ⏟
      //   Cross offset
      // At minimum we want to push the popup "back" by the width of the popup
      // rounding and half the width of the arrow.
      // We _could_ fetch those values from computed style but we'd rather avoid
      // adding even more layout flushes so we just fudge it.
      // At the time of writing the rounding is 5px and the arrow width is 20px, or
      // actually 28px if you add in the margin we allow for the shadow.
      // That would give us an offset of 5px + 28px / 2 = 19px so we just use 20px
      // to allow us some leeway if those values change marginally.
      const CROSS_OFFSET = 20;
      const idealCrossPos = axis === "vertical" ? target.x - CROSS_OFFSET : target.y - CROSS_OFFSET;
      const crossPopupSize = axis === "vertical" ? popupSize.width : popupSize.height;
      const maxCrossExtent = axis === "vertical" ? safeRight : safeBottom;
      const minCrossExtent = axis === "vertical" ? safeLeft : safeTop;
      const crossPos = idealCrossPos + crossPopupSize > maxCrossExtent ? Math.max(minCrossExtent, maxCrossExtent - crossPopupSize) : idealCrossPos;
      const constrainCrossExtent = crossPos + crossPopupSize > maxCrossExtent ? maxCrossExtent - crossPos : null;
      // Axis position
      
      // (e.g. vertical position when we are laying the popup out on the vertical
      // axis).
            const [axisMin, axisMax] = getRangeForPopup({
        axis,
        cursorClearance,
        interactive,
        side,
        safeBoundaries: {
          safeLeft,
          safeRight,
          safeTop,
          safeBottom
        },
        target
      });
      const axisPopupSize = axis === "vertical" ? popupSize.height : popupSize.width;
      let axisPos;
      if (side === "before") {
        axisPos = Math.max(axisMin, axisMax - axisPopupSize);
        if (axisPos >= axisMax) return;
      } else {
        axisPos = axisMin;
        if (axisPos >= axisMax) return;
      }
      const constrainAxisExtent = axisPos + axisPopupSize > axisMax ? axisMax - axisPos : null;
      return axis === "vertical" ? {
        x: crossPos,
        y: axisPos,
        constrainWidth: constrainCrossExtent,
        constrainHeight: constrainAxisExtent,
        direction: axis,
        side
      } : {
        x: axisPos,
        y: crossPos,
        constrainWidth: constrainAxisExtent,
        constrainHeight: constrainCrossExtent,
        direction: axis,
        side
      };
    }
    function getRangeForPopup({axis, cursorClearance, interactive, side, safeBoundaries: {safeLeft, safeRight, safeTop, safeBottom}, target}) {
      const targetAxisPos = axis === "vertical" ? target.y : target.x;
      const marginToPopup = interactive ? INTERACTIVE_MARGIN_TO_POPUP : NON_INTERACTIVE_MARGIN_TO_POPUP;
      let minAxisExtent;
      let maxAxisExtent;
      if (side === "before") {
        minAxisExtent = axis === "vertical" ? safeTop : safeLeft;
        const clearanceAtFarEdge = axis === "vertical" ? cursorClearance.top : cursorClearance.left;
        const marginAtFarEdge = clearanceAtFarEdge + marginToPopup;
        maxAxisExtent = targetAxisPos - marginAtFarEdge;
      } else {
        const clearanceAtNearEdge = axis === "vertical" ? cursorClearance.bottom : cursorClearance.right;
        const marginAtNearEdge = clearanceAtNearEdge + marginToPopup;
        minAxisExtent = targetAxisPos + marginAtNearEdge;
        maxAxisExtent = axis === "vertical" ? safeBottom : safeRight;
      }
      return [ minAxisExtent, maxAxisExtent ];
    }
    function isSmallLandscapeScreen({isVerticalText, safeBoundaries: {safeLeft, safeRight, safeTop, safeBottom}}) {
      const verticalRange = safeBottom - safeTop;
      const horizontalRange = safeRight - safeLeft;
      const [blockRange, inlineRange] = isVerticalText ? [ horizontalRange, verticalRange ] : [ verticalRange, horizontalRange ];
      const isLandscape = inlineRange > blockRange;
      const isSmallScreen = blockRange < 500;
      return isLandscape && isSmallScreen;
    }
    function sizeComparator(popupSize) {
      return (a, b) => {
        // Sort undefined entries last
        if (!b) return 0;
        if (!a) return 1;
        const widthA = a.position.constrainWidth ?? popupSize.width;
        const heightA = a.position.constrainHeight ?? popupSize.height;
        const areaA = widthA * heightA;
        const widthB = b.position.constrainWidth ?? popupSize.width;
        const heightB = b.position.constrainHeight ?? popupSize.height;
        const areaB = widthB * heightB;
        if (widthA === widthB) return areaB - areaA;
        // Prefer wider results wherever possible, as it's okay to lose a few entries
        // from the bottom of the popup, but disastrous for all the entries to be
        // clipped off on the right.
                return widthB - widthA;
      };
    }
    // CONCATENATED MODULE: ./css/puck.css?inline
    const puckinline_namespaceObject = '@charset "UTF-8";\n\n:root,\n:host {\n  --tag-green: #43a047aa;\n  --tag-pink: #f24b59aa;\n  --tag-blue: #2698fbaa;\n\n  --selected-bg: #fffde5;\n  --selected-reading-highlight: #2e7d32;\n  --selected-conj-color: #fc7600;\n  --selected-def-color: #1a1d1f;\n  --selected-tag-color: #1a1d1f;\n  --selected-tag-border: rgba(0, 0, 0, 0.3);\n}\n\n/*\n * Theme - light\n */\n\n.theme-light {\n  --text-color: #1d1a19;\n  --bg-rgb: 254, 254, 244;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #b1ad96;\n  --shadow-color: rgba(0, 0, 0, 0.2);\n\n  --primary-highlight: hsl(356, 73%, 40%);\n  --reading-highlight: hsl(52, 8.5%, 35%);\n  --conj-color: hsl(356, 55%, 41%);\n\n  --tag-border: rgba(0, 0, 0, 0.3);\n  --bunpro-vocab: #104f8c;\n  --bunpro-grammar: #9f3833;\n  --bunpro-src: #54534b;\n\n  --title-fg: var(--text-color);\n  --title-bg: #ede7c9;\n\n  --reading-label: hsl(49, 9.1%, 42%);\n  --okurigana-color: hsl(356, 73%, 40%);\n  --hi-contrast-pitch-accent: var(--primary-highlight);\n  --cell-highlight-bg: hsl(50, 50%, 90%);\n  --cell-highlight-fg: hsl(12, 4.2%, 20%);\n  --cell-bg-hover: hsl(50.4, 35.2%, 86.1%);\n  --cell-link-fg: var(--primary-highlight);\n\n  --selected-highlight: var(--primary-highlight);\n  --selected-bg: #fff8bf;\n  --hover-bg: rgb(255, 250, 210);\n  --selected-conj-color: hsl(356, 70%, 40%);\n  --selected-reading-highlight: #3e3a39;\n\n  --meta-bg: var(--cell-highlight-bg);\n  --status-bg: var(--cell-highlight-bg);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: var(--title-bg);\n  --puck-bg-highlight: var(--bg-color);\n\n  --status-button-color: #615f52;\n  --status-button-primary-text-color: var(--status-bg);\n\n  --expand-button-rgb: 177, 173, 150;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n.window.theme-light .w-def .tag-fem,\n.window.theme-light .w-def .w-dial {\n  background: #f24b5922;\n  color: #7a282f;\n  --tag-border: #f24b5966;\n}\n\n.window.theme-light .w-def .tag-masc,\n.window.theme-light .w-def .w-misc {\n  background: #2698fb22;\n  color: #144977;\n  --tag-border: #2698fbaa;\n}\n\n.window.theme-light .w-def .tag-place,\n.window.theme-light .w-def .w-field {\n  background: #43a04722;\n  color: #215723;\n  --tag-border: #43a047aa;\n}\n\n/*\n * Theme - blue\n */\n\n.theme-blue {\n  --text-color: white;\n  --bg-rgb: 68, 110, 160;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #17588e;\n  --shadow-color: rgba(0, 0, 0, 0.2);\n\n  --primary-highlight: #bcdffe;\n  --reading-highlight: #c0ffc0;\n  --conj-color: #fff394;\n\n  --tag-border: rgba(255, 255, 255, 0.4);\n  --bunpro-vocab: #b4d1ed;\n  --bunpro-grammar: #ffc6c4;\n  --bunpro-src: #cde1ef;\n\n  --title-bg: var(--cell-highlight-bg);\n  --title-fg: var(--text-color);\n\n  --reading-label: #e7ffe7;\n  --okurigana-color: #a8cfef;\n  --hi-contrast-pitch-accent: white;\n  --cell-highlight-bg: #17588e;\n  --cell-highlight-fg: var(--primary-highlight);\n  --cell-bg-hover: hsl(206.3, 86%, 28%);\n  --cell-link-fg: var(--reading-highlight);\n\n  --selected-highlight: var(--bg-color);\n  --selected-bg: rgb(220, 225, 255);\n  --hover-bg: rgb(233, 238, 255, 0.8);\n\n  --status-bg: rgba(255, 255, 255, 0.2);\n  --meta-bg: rgba(255, 255, 255, 0.2);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: var(--bg-color);\n  --puck-bg-highlight: #5f87bb;\n\n  --status-button-color: white;\n  --status-button-primary-text-color: var(--bg-color);\n\n  --expand-button-rgb: 144, 173, 197;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n/*\n * Theme - black\n */\n\n.theme-black {\n  --text-color: white;\n  --bg-rgb: 29, 26, 25;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #999493;\n  --shadow-color: rgba(255, 255, 255, 0.2);\n\n  --primary-highlight: #4bbffb;\n  --reading-highlight: #7beb7e;\n  --conj-color: #c1a4a0;\n\n  --tag-border: rgba(255, 255, 255, 0.4);\n  --bunpro-vocab: #64a6e5;\n  --bunpro-grammar: #da918e;\n  --bunpro-src: #c5c0af;\n\n  --title-bg: #3e3a39;\n  --title-fg: #ede8e6;\n\n  --reading-label: #e7ffe7;\n  --okurigana-color: #ede8e6;\n  --hi-contrast-pitch-accent: white;\n  --cell-highlight-bg: #504c4b;\n  --cell-highlight-fg: #f0ecea;\n  --cell-bg-hover: hsl(12, 4.4%, 22.2%);\n  --cell-link-fg: var(--primary-highlight);\n\n  --selected-bg: #555;\n  --hover-bg: #484844;\n\n  /* Reset selection styles */\n  --selected-highlight: var(--primary-highlight);\n  --selected-reading-highlight: var(--reading-highlight);\n  --selected-def-color: var(--text-color);\n  --selected-tag-color: var(--text-color);\n  --selected-tag-border: var(--tag-border);\n\n  --status-bg: rgba(255, 255, 255, 0.2);\n  --meta-bg: rgba(255, 255, 255, 0.2);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: var(--bg-color);\n  --puck-bg-highlight: #555;\n\n  --status-button-color: white;\n  --status-button-primary-text-color: var(--bg-color);\n\n  --expand-button-rgb: 130, 126, 125;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n.window.theme-black .w-def .tag-masc,\n.window.theme-black .w-def .w-misc {\n  --tag-blue: #2698fb88;\n  --tag-border: rgba(255, 255, 255, 0.3);\n}\n\n/*\n * Theme - lightblue\n */\n\n.theme-lightblue {\n  --text-color: #1d1a19;\n  --bg-rgb: 227, 242, 254;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #65b7fc;\n  --shadow-color: rgba(0, 0, 0, 0.2);\n\n  --primary-highlight: #17588e;\n  --reading-highlight: #2e7d32;\n  --conj-color: #817470;\n\n  --tag-border: rgba(0, 0, 0, 0.3);\n  --bunpro-vocab: #185692;\n  --bunpro-grammar: #b42822;\n  --bunpro-src: #475865;\n\n  --title-fg: var(--text-color);\n  --title-bg: #bcdffe;\n\n  --reading-label: #1b5e20;\n  --okurigana-color: #706c6b;\n  --hi-contrast-pitch-accent: var(--primary-highlight);\n  --cell-highlight-bg: #cae6fc;\n  --cell-highlight-fg: var(--primary-highlight);\n  --cell-bg-hover: hsl(206.4, 65.8%, 85.1%);\n  --cell-link-fg: var(--primary-highlight);\n\n  --selected-highlight: var(--primary-highlight);\n  --selected-bg: #fffac5;\n  --hover-bg: #fffde5;\n\n  --meta-bg: var(--cell-highlight-bg);\n  --status-bg: var(--cell-highlight-bg);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: #c5e0f5;\n  --puck-bg-highlight: var(--bg-color);\n\n  --status-button-color: var(--primary-highlight);\n  --status-button-primary-text-color: var(--bg-color);\n\n  --expand-button-rgb: 140, 186, 224;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n/*\n * Theme - yellow\n */\n\n.theme-yellow {\n  --text-color: #1d1a19;\n  --bg-rgb: 255, 248, 191;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #ffd600;\n  --shadow-color: rgba(0, 0, 0, 0.2);\n\n  --primary-highlight: #17588e;\n  --reading-highlight: #2e7d32;\n  --conj-color: #fc7600;\n\n  --tag-border: rgba(0, 0, 0, 0.3);\n  --bunpro-vocab: #0e3f6e;\n  --bunpro-grammar: #ba332d;\n  --bunpro-src: #525047;\n\n  --title-bg: #fffde5;\n  --title-fg: var(--text-color);\n\n  --reading-label: #1b5e20;\n  --okurigana-color: #fc7600;\n  --hi-contrast-pitch-accent: var(--primary-highlight);\n  --cell-highlight-bg: #fffde5;\n  --cell-highlight-fg: #3e3a39;\n  --cell-bg-hover: rgb(255, 254, 247);\n  --cell-link-fg: var(--primary-highlight);\n\n  --selected-bg: #e3f2fe;\n  --hover-bg: #fdfdf4;\n  --selected-highlight: var(--primary-highlight);\n\n  --meta-bg: var(--cell-highlight-bg);\n  --status-bg: var(--cell-highlight-bg);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: #ffeeaa;\n  --puck-bg-highlight: var(--bg-color);\n\n  --status-button-color: var(--primary-highlight);\n  --status-button-primary-text-color: var(--status-bg);\n\n  --expand-button-rgb: 209, 195, 122;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n:root,\n:host {\n  --tenten-puck-safe-area-inset-top: env(safe-area-inset-top, 0px);\n  --tenten-puck-safe-area-inset-right: env(safe-area-inset-right, 0px);\n  --tenten-puck-safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);\n  --tenten-puck-safe-area-inset-left: env(safe-area-inset-left, 0px);\n}\n\n.puck {\n  position: fixed;\n  top: 0;\n  left: 0;\n  /*\n   * Use the same z-index as the popup. This is the empirical maximum value. Because\n   * we ensure the popup appears before the puck in the DOM, even though we use\n   * the same z-index, the puck should appear on top.\n   */\n  z-index: 2147483647;\n  /* Stops the screen scrolling on touch devices while dragging the puck around. */\n  touch-action: none;\n  -webkit-tap-highlight-color: transparent;\n  transition: opacity 0.1s ease-in-out;\n\n  --target-x-offset: 0px;\n  --target-y-offset: 0px;\n\n  --rest-x-offset: -20px;\n  --rest-y-offset: -20px;\n}\n\n.puck.lookup-inactive {\n  opacity: 0.65;\n}\n\n.earth,\n.moon {\n  background: var(--bg-color);\n  background: radial-gradient(\n    farthest-side at 25% 25%,\n    var(--puck-bg-highlight) 0%,\n    var(--puck-bg) 100%\n  );\n\n  border: 1px solid var(--border-color);\n  border-radius: 100px;\n  box-sizing: border-box;\n  box-shadow: 1px 2px 1px rgba(100, 100, 100, 0.2);\n  box-shadow:\n    0px 0.5px 0.5px rgba(100, 100, 100, 0.1),\n    1px 2px 1px rgba(100, 100, 100, 0.1),\n    1.5px 3px 4px rgba(100, 100, 100, 0.1);\n}\n\n.earth {\n  width: 50px;\n  height: 50px;\n  transition: transform 0.3s;\n  --scale-factor-when-dragging: 1.2;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.earth .logo {\n  width: 25px;\n  height: 25px;\n  color: var(--border-color);\n  opacity: 0.5;\n  transition: opacity 0.1s ease-in-out;\n}\n\n.earth .logo * {\n  fill: currentColor;\n}\n\n.puck.lookup-inactive .earth .logo {\n  opacity: 0;\n}\n\n.puck.dragging .earth {\n  transform: scale(var(--scale-factor-when-dragging));\n}\n\n.moon {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n\n  /*\n   * Given that:\n   * - the earth has 50px width and height\n   * - the moon has 10px width and height\n   * Place the centre of the moon at the centre of the the earth (before transformations are applied).\n   * (50px / 2) - (10px / 2) = 20px\n   */\n  top: 20px;\n  left: 20px;\n\n  /*\n   * Given that:\n   * - the earth has 50px width and height\n   * - the moon has 10px width and height\n   * - they both have box-sizing: border-box\n   * - their centres are lined up (before any transformations are applied)\n   * At this offsetY value, the moon will be just touching the earth.\n   * (50px / 2) + (10px / 2) = 30px\n   */\n  --minimum-moon-offset-y: 30px;\n\n  /*\n   * Depending on whether the moon is above or below the earth, some extra\n   * altitude needs to be added to the orbit so that the thumb doesn\'t cover it.\n   */\n  --extra-altitude-to-clear-above-thumb: 30px;\n  --extra-altitude-to-clear-below-thumb: 60px;\n\n  /*\n   * By adding this extra clearance, we avoid the iOS 15 Safari full-size URL\n   * bar springing back into place when dragging the puck too far into the\n   * bottom of the viewport. Hopefully this covers the worst-case scenario.\n   * @see https://github.com/shirakaba/10ten-ja-reader/pull/5#issuecomment-877794905\n   */\n  --extra-altitude-to-clear-ios-15-safari-safe-area-activation-zone: 30px;\n\n  transform: translate(var(--rest-x-offset), var(--rest-y-offset));\n  transition:\n    transform 0.1s,\n    opacity 0.3s;\n\n  pointer-events: none;\n}\n\n.puck.dragging:not(.lookup-inactive) .moon,\n.puck.hold-position .moon {\n  transform: translate(var(--target-x-offset), var(--target-y-offset));\n}\n\n.puck.hold-position:not(.dragging) .moon {\n  opacity: 0.75;\n}\n';
    // CONCATENATED MODULE: ./src/content/puck.ts
    /// <reference path="../common/css.d.ts" />
    function puck_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    function isPuckPointerEvent(pointerEvent) {
      return !!pointerEvent.fromPuck;
    }
    function clickStateHasTimeout(clickState) {
      return typeof clickState.timeout === "number";
    }
    function clearClickTimeout(clickState) {
      if (clickStateHasTimeout(clickState)) clearTimeout(clickState.timeout);
    }
    const LookupPuckId = "tenten-ja-puck";
    const clickHysteresis = 300;
    class LookupPuck {
      setPosition({x, y, safeAreaLeft, safeAreaRight}) {
        this.puckX = x;
        this.puckY = y;
        // Update the puck position (that is, the earth)
                if (this.puck) this.puck.style.transform = `translate(${this.puckX}px, ${this.puckY}px)`;
        // Calculate the corresponding target point (that is, the moon)
        // First determine the actual range of motion of the moon, taking into
        // account any safe area on either side of the screen.
                const {viewportWidth} = this.getViewportDimensions(document);
        const safeAreaWidth = viewportWidth - safeAreaLeft - safeAreaRight;
        // Now work out where the moon is within that range such that it is
        
        // * 0 when the the left side of the earth is touching the left safe area
        //   inset, and
        // * 1 when the right side of the earth is touching the right safe area
        //   inset.
                const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        const horizontalPortion = clamp((this.puckX - safeAreaLeft) / (safeAreaWidth - this.earthWidth), 0, 1);
        // Then we calculate the horizontal offset. We need to ensure that we
        // produce enough displacement that we can reach to the other edge of the
        // safe area in either direction.
        // The range is the amount the moon rotates either side of the moon, in this
        // case 45 degrees in either direction.
                const range = Math.PI / 2;
        // We need to determine the radius of the offset.
        
        // Typically we set this to 10 pixels greater than the radius of the earth
        // itself.
                const radiusOfEarth = this.earthWidth / 2;
        const preferredRadius = radiusOfEarth + 10;
        // However, we may need to extend that to reach the other side of the safe
        // area.
                const safeAreaExtent = Math.max(safeAreaLeft, safeAreaRight);
        const requiredReach = safeAreaExtent + radiusOfEarth;
        const requiredRadius = requiredReach / Math.sin(range / 2);
        // Choose whichever is larger
                const offsetRadius = Math.max(preferredRadius, requiredRadius);
        // Now finally we can calculate the horizontal offset.
                const angle = horizontalPortion * range - range / 2;
        const offsetX = Math.sin(angle) * offsetRadius;
        // For the vertical offset, we don't actually extend the moon out by the
        // same radius but instead try to keep a fixed vertical offset since that
        // makes scanning horizontally easier and allows us to tweak that offset to
        // make room for the user's thumb.
                const offsetYOrientationFactor = this.targetOrientation === "above" ? -1 : 1;
        const offsetY = (this.targetOrientation === "above" ? this.targetAbsoluteOffsetYAbove : this.targetAbsoluteOffsetYBelow) * offsetYOrientationFactor;
        // At rest, make the target land on the surface of the puck.
                const restOffsetX = Math.sin(angle) * radiusOfEarth;
        const restOffsetY = Math.cos(angle) * radiusOfEarth * offsetYOrientationFactor;
        this.targetOffset = {
          x: offsetX,
          y: offsetY
        };
        // Update target position in style
                if (this.puck) {
          this.puck.style.setProperty("--target-x-offset", `${offsetX}px`);
          this.puck.style.setProperty("--target-y-offset", `${offsetY}px`);
          this.puck.style.setProperty("--rest-x-offset", `${restOffsetX}px`);
          this.puck.style.setProperty("--rest-y-offset", `${restOffsetY}px`);
        }
      }
      // Returns the total clearance to allow arround the target offset for the
      // puck.
      getPuckClearance() {
        const moonVerticalClearance = this.moonHeight / 2;
        const earthVerticalClearance = Math.abs(this.targetOffset.y) + this.earthScaleFactorWhenDragging * this.earthHeight / 2;
        return {
          top: this.targetOrientation === "above" ? moonVerticalClearance : earthVerticalClearance,
          bottom: this.targetOrientation === "above" ? earthVerticalClearance : moonVerticalClearance,
          left: this.earthScaleFactorWhenDragging * this.earthWidth / 2 + this.targetOffset.x,
          right: this.earthScaleFactorWhenDragging * this.earthWidth / 2 - this.targetOffset.x
        };
      }
      getTargetOrientation() {
        return this.targetOrientation;
      }
      getViewportDimensions(document1) {
        if (this.cachedViewportDimensions) return this.cachedViewportDimensions;
        // We'd ideally use document.documentElement.clientWidth and
        // document.documentElement.clientHeight for both viewport measurements, but
        // iOS 15 Safari doesn't behave suitably for that.
        
        // iOS 15 Safari:
        
        // - seems to measure its safe area insets from the area defined by
        //   document.defaultView.innerHeight and .innerWidth.
        
        // - decreases both document.defaultView.innerHeight and the
        //   safe-area-inset-bottom in compact mode, and vice versa in non-compact
        //   mode.
        
        // @see https://github.com/shirakaba/10ten-ja-reader/pull/3#issuecomment-875127566
        
        // Another curiousity, if you load a page initially zoomed-in using pinch
        // zoom (e.g. by refreshing it after zooming in), the innerHeight will
        // initially report the zoomed-in viewport height (i.e. the same value as
        // window.visualViewport.height). However, if you zoom all the way out and
        // back in again, it will give you the layout viewport. If you zoom
        // partially out and back in, you get something in between.
                this.cachedViewportDimensions = {
          viewportWidth: document1.documentElement.clientWidth,
          viewportHeight: document1.defaultView?.innerHeight ?? document1.documentElement.clientHeight
        };
        return this.cachedViewportDimensions;
      }
      setPositionWithinSafeArea(x, y) {
        if (!this.puck) return;
        const {top: safeAreaTop, right: safeAreaRight, bottom: safeAreaBottom, left: safeAreaLeft} = this.safeAreaProvider.getSafeArea();
        const {viewportWidth, viewportHeight} = this.getViewportDimensions(document);
        const minX = safeAreaLeft;
        const maxX = viewportWidth - safeAreaRight - this.earthWidth;
        const minY = safeAreaTop;
        const maxY = viewportHeight - safeAreaBottom - this.earthHeight;
        let clampedX = Math.min(Math.max(minX, x), maxX);
        let clampedY = Math.min(Math.max(minY, y), maxY);
        // When we initialize the puck, we put it in the bottom-right corner, but on
        // iOS 15 Safari, if it's flush up against the right edge of the screen then
        // when you try to drag it away, you end up dragging in the next tab.
        
        // To avoid that we detect the initial position coordinates and add a few
        // pixels margin.
                if (x === Number.MAX_SAFE_INTEGER && y === Number.MAX_SAFE_INTEGER) {
          clampedX -= 15;
          clampedY -= 15;
        }
        this.setPosition({
          x: clampedX,
          y: clampedY,
          safeAreaLeft,
          safeAreaRight
        });
      }
      restoreContent() {
        this.contentToRestore?.restore();
        this.contentToRestore = void 0;
      }
      // Look for textBox elements generated by mokuro reader
      // (https://github.com/kha-white/mokuro) since they have hidden paragraph
      // elements that are only shown on hover.
      static uncoverMokuroText(target, targetX, targetY) {
        // Check for a suitable suspect
        if (!(target instanceof HTMLElement) || !target.classList.contains("textBox")) return null;
        // Set the paragraphs to display: table to match the hover style's from
        // mokuro's stylesheet:
        
        // https://github.com/kha-white/mokuro/blob/43c59a3c49100db522db088563297dc609afa031/mokuro/styles.css#L70-L72
        
        // We also record the previous setting on the inline style attribute so we
        // can faithfully restore it when we're done.
                const paragraphs = target.querySelectorAll("p");
        const toRestore = [];
        for (const p of paragraphs) if (getComputedStyle(p).display === "none") {
          toRestore.push([ p, p.style.display || null ]);
          p.style.display = "table";
        }
        // Check if we found any paragraphs to adjust
                if (!toRestore.length) return null;
        // Setup a function to restore the content
                const restore = () => {
          // If we selected part of the content we uncovered we need to clear
          // selection or else we'll be unable to select anything more.
          const selection = window.getSelection();
          if (target && toRestore.some((([p]) => selection?.containsNode(p, true)))) selection.removeAllRanges();
          // Restore the inline style display
                    for (const [p, display] of toRestore) if (display) p.style.display = display; else p.style.removeProperty("display");
        };
        const newTarget = document.elementFromPoint(targetX, targetY);
        if (!newTarget) {
          restore();
          return null;
        }
        return {
          newTarget,
          contentToRestore: {
            root: target,
            restore
          }
        };
      }
      render({icon, theme}) {
        // Set up shadow tree
        const container = getOrCreateEmptyContainer({
          id: LookupPuckId,
          styles: puckinline_namespaceObject.toString()
        });
        // Create puck elem
                this.puck = document.createElement("div");
        this.puck.classList.add("puck");
        const earth = document.createElement("div");
        earth.classList.add("earth");
        this.puck.append(earth);
        // Brand the earth
                const logoSvg = this.renderIcon(icon);
        logoSvg.classList.add("logo");
        earth.append(logoSvg);
        const moon = document.createElement("div");
        moon.classList.add("moon");
        this.puck.append(moon);
        container.shadowRoot.append(this.puck);
        // Set theme styles
                this.puck.classList.add(getThemeClass(theme));
        // Calculate the earth size (which is equal to the puck's overall size)
                if (!this.earthWidth || !this.earthHeight) {
          const {width, height} = earth.getBoundingClientRect();
          this.earthWidth = width;
          this.earthHeight = height;
        }
        // Calculate the moon size
                if (!this.moonWidth || !this.moonHeight) {
          const {width, height} = moon.getBoundingClientRect();
          this.moonWidth = width;
          this.moonHeight = height;
        }
        if (typeof this.earthScaleFactorWhenDragging === "undefined") this.earthScaleFactorWhenDragging = parseFloat(getComputedStyle(earth).getPropertyValue("--scale-factor-when-dragging")) || 0;
        if (typeof this.targetAbsoluteOffsetYAbove === "undefined" || typeof this.targetAbsoluteOffsetYBelow === "undefined") {
          const minimumMoonOffsetY = parseFloat(getComputedStyle(moon).getPropertyValue("--minimum-moon-offset-y")) || 0;
          // Depending on whether the moon is above or below the earth, some extra
          // altitude needs to be added to the orbit so that the thumb doesn't cover
          // it.
                    const extraAltitudeToClearAboveThumb = parseFloat(getComputedStyle(moon).getPropertyValue("--extra-altitude-to-clear-above-thumb")) || 0;
          const extraAltitudeToClearBelowThumb = parseFloat(getComputedStyle(moon).getPropertyValue("--extra-altitude-to-clear-above-thumb")) || 0;
          // By adding this extra clearance, we avoid the iOS 15 Safari full-size
          // URL bar springing back into place when dragging the puck too far into
          // the bottom of the viewport. Hopefully this covers the worst-case
          // scenario.
          // @see https://github.com/shirakaba/10ten-ja-reader/pull/5#issuecomment-877794905
                    const extraAltitudeToClearIos15SafariSafeAreaActivationZone = parseFloat(getComputedStyle(moon).getPropertyValue("--extra-altitude-to-clear-ios-15-safari-safe-area-activation-zone")) || 0;
          this.targetAbsoluteOffsetYAbove = minimumMoonOffsetY + extraAltitudeToClearAboveThumb;
          this.targetAbsoluteOffsetYBelow = minimumMoonOffsetY + extraAltitudeToClearBelowThumb + extraAltitudeToClearIos15SafariSafeAreaActivationZone;
        }
        this.setPositionWithinSafeArea(this.puckX, this.puckY);
        // Add event listeners
        
        // Note: This currently never happens. We always render before enabling.
                if (this.enabledState !== "disabled") {
          this.puck.addEventListener("pointerdown", this.onPuckPointerDown);
          this.puck.addEventListener("mousedown", this.onPuckMouseDown);
          this.puck.addEventListener("mouseup", this.onPuckMouseUp);
        }
        // Start trying to detect a buggy position:fixed implementation.
                window.visualViewport?.addEventListener("resize", this.checkForBuggyPositionFixed);
        // If the viewport has already been scaled, we might be able to detect it
        // right away (and avoid mis-positioning the puck before the viewport is
        // next resized).
                this.checkForBuggyPositionFixed();
      }
      renderIcon(icon) {
        return icon === "default" ? this.renderDefaultIcon() : this.renderSkyIcon();
      }
      renderDefaultIcon() {
        const icon = document.createElementNS(SVG_NS, "svg");
        icon.setAttribute("viewBox", "0 0 20 20");
        const dot1 = document.createElementNS(SVG_NS, "circle");
        dot1.setAttribute("cx", "11.5");
        dot1.setAttribute("cy", "10");
        dot1.setAttribute("r", "1.5");
        icon.append(dot1);
        const dot2 = document.createElementNS(SVG_NS, "circle");
        dot2.setAttribute("cx", "18.5");
        dot2.setAttribute("cy", "15.5");
        dot2.setAttribute("r", "1.5");
        icon.append(dot2);
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", "M4.9 7.1c-.1-.5-.2-.9-.5-1.3-.2-.4-.5-.8-.8-1.1-.2-.3-.5-.5-.8-.7C2 3.3 1 3 0 3v3c1.2 0 1.9.7 2 1.9v9.2h3V8.2c0-.4 0-.8-.1-1.1zM11.5 3c-2.8 0-5 2.3-5 5.1v3.7c0 2.8 2.2 5.1 5 5.1s5-2.3 5-5.1V8.1c0-2.8-2.2-5.1-5-5.1zm2.3 5.1v3.7c0 .3-.1.6-.2.9-.4.8-1.2 1.4-2.1 1.4s-1.7-.6-2.1-1.4c-.1-.3-.2-.6-.2-.9V8.1c0-.3.1-.6.2-.9.4-.8 1.2-1.4 2.1-1.4s1.7.6 2.1 1.4c.1.3.2.6.2.9z");
        icon.append(path);
        return icon;
      }
      renderSkyIcon() {
        const icon = document.createElementNS(SVG_NS, "svg");
        icon.setAttribute("viewBox", "0 0 20 20");
        const dot1 = document.createElementNS(SVG_NS, "circle");
        dot1.setAttribute("cx", "18.5");
        dot1.setAttribute("cy", "15.5");
        dot1.setAttribute("r", "1.5");
        icon.append(dot1);
        const dot2 = document.createElementNS(SVG_NS, "circle");
        dot2.setAttribute("cx", "1.5");
        dot2.setAttribute("cy", "4.5");
        dot2.setAttribute("r", "1.5");
        icon.append(dot2);
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", "M3.4 3.5c.1.3.2.6.2 1s-.1.7-.2 1h4.1V8H3c-.5 0-1 .5-1 1s.5 1 1 1h4.3c-.3.9-.7 1.6-1.5 2.4-1 1-2.3 1.8-3.8 2.3-.6.2-.9.9-.7 1.5.3.5.9.8 1.4.6 2.9-1.1 5-2.9 6-5.2 1 2.3 3.1 4.1 6 5.2.5.2 1.2-.1 1.4-.6.3-.6 0-1.3-.7-1.5a9.7 9.7 0 0 1-3.8-2.3c-.8-.8-1.2-1.5-1.5-2.4h4.4c.5 0 1-.5 1-1s-.4-1-1-1H10V5.5h5.4c.5 0 1-.5 1-1s-.4-1-1-1h-12z");
        icon.append(path);
        return icon;
      }
      setTheme(theme) {
        if (!this.puck) return;
        for (const className of this.puck.classList.values()) if (className.startsWith("theme-")) this.puck.classList.remove(className);
        this.puck.classList.add(getThemeClass(theme));
      }
      setIcon(icon) {
        if (!this.puck) return;
        const logo = this.puck.querySelector(".logo");
        const logoParent = logo?.parentElement;
        if (!logo || !logoParent) return;
        const classes = logo.getAttribute("class") || "";
        logo.remove();
        const newLogo = this.renderIcon(icon);
        newLogo.setAttribute("class", classes);
        logoParent.append(newLogo);
      }
      unmount() {
        this.restoreContent();
        removePuck();
        window.visualViewport?.removeEventListener("resize", this.checkForBuggyPositionFixed);
        this.setEnabledState("disabled");
        this.puck = void 0;
      }
      getEnabledState() {
        return this.enabledState;
      }
      setEnabledState(enabledState) {
        const previousState = this.enabledState;
        this.enabledState = enabledState;
        if (enabledState === "disabled") {
          this.safeAreaProvider.removeEventListener(this.onSafeAreaUpdated);
          if (this.puck) {
            this.stopDraggingPuck();
            this.puck.removeEventListener("pointerdown", this.onPuckPointerDown);
            this.puck.removeEventListener("mousedown", this.onPuckMouseDown);
            this.puck.removeEventListener("mouseup", this.onPuckMouseUp);
          }
          window.removeEventListener("pointerup", this.noOpEventHandler);
          clearClickTimeout(this.clickState);
          this.clickState = {
            kind: "idle"
          };
          // Reset puck position
                    this.puckX = Number.MAX_SAFE_INTEGER;
          this.puckY = Number.MAX_SAFE_INTEGER;
          this.targetOrientation = "above";
          return;
        }
        // Avoid redoing any of this setup (that's common between both 'active'
        // and 'inactive').
                if (previousState === "disabled") {
          this.safeAreaProvider.addEventListener(this.onSafeAreaUpdated);
          if (this.puck) {
            this.puck.addEventListener("pointerdown", this.onPuckPointerDown);
            // The following event handlers are needed to cover the case where iOS
            // Safari sometimes seems to eat the second tap in a double-tap gesture.
            
            // We've tried everything to avoid this (touch-action: none,
            // -webkit-user-select: none, etc. etc.) but it just sometimes does it.
            
            // Furthermore, when debugging, after about ~1hr or so it will sometimes
            // _stop_ eating these events, leading you to believe you've fixed it
            // only for it to start eating them again a few minutes later.
            
            // However, in this case it still dispatches _mouse_ events so we listen
            // to them and trigger the necessary state transitions when needed.
            
            // Note that the mere _presence_ of the mousedown handler is also needed
            // to prevent double-tap being interpreted as a zoom.
                        this.puck.addEventListener("mousedown", this.onPuckMouseDown);
            this.puck.addEventListener("mouseup", this.onPuckMouseUp);
          }
          // Needed to stop iOS Safari from stealing pointer events after we finish
          // scrolling.
                    window.addEventListener("pointerup", this.noOpEventHandler);
        }
        if (this.puck) this.puck.classList.toggle("lookup-inactive", this.enabledState === "inactive");
        if (this.enabledState === "inactive") {
          // Calling this callback allows the owner (ContentHandler) to clear any
          // existing popups.
          this.onLookupDisabled();
          return;
        }
      }
      setState(state) {
        if (this.enabledState === "disabled") return;
        this.targetOrientation = state.orientation;
        this.setPositionWithinSafeArea(state.x, state.y);
        const updatedEnabledState = state.active ? "active" : "inactive";
        if (this.enabledState !== updatedEnabledState) this.setEnabledState(updatedEnabledState);
      }
      notifyPuckStateChanged() {
        if (this.enabledState === "disabled") return;
        this.onPuckStateChanged({
          x: this.puckX,
          y: this.puckY,
          orientation: this.targetOrientation,
          active: this.enabledState === "active"
        });
      }
      highlightMatch() {
        // On iOS the selection API is very unreliable so we don't have a good way
        // of indicating to the user what they looked up, unless they enable the
        // (experimental) CSS Highlight API.
        // So, in that case, whenever our lookup gets a match we make the moon
        // stick to its extended position.
        if (!ua_utils_isIOS() || CSS?.highlights) return;
        this.puck?.classList.add("hold-position");
      }
      clearHighlight() {
        this.puck?.classList.remove("hold-position");
      }
      constructor({initialPosition, safeAreaProvider, onLookupDisabled, onPuckStateChanged}) {
        puck_define_property(this, "puck", void 0);
        puck_define_property(this, "enabledState", "disabled");
        puck_define_property(this, "clickState", {
          kind: "idle"
        });
        puck_define_property(this, "puckX", void 0);
        puck_define_property(this, "puckY", void 0);
        puck_define_property(this, "earthWidth", void 0);
        puck_define_property(this, "earthHeight", void 0);
        puck_define_property(this, "earthScaleFactorWhenDragging", void 0);
        puck_define_property(this, "moonWidth", void 0);
        puck_define_property(this, "moonHeight", void 0);
        // The translateY value to apply to the moon when it is orbiting above the
        // earth. Expressed as an absolute (positive) value.
                puck_define_property(this, "targetAbsoluteOffsetYAbove", void 0);
        // The translateY value to apply to the moon when it is orbiting below the
        // earth. Expressed as an absolute (positive) value.
                puck_define_property(this, "targetAbsoluteOffsetYBelow", void 0);
        // The translate (X and Y) values applied to the moon whilst it is being
        // dragged. They are measured relative to the midpoint of the moon (which is
        // also the midpoint of the earth).
                puck_define_property(this, "targetOffset", {
          x: 0,
          y: 0
        });
        puck_define_property(this, "targetOrientation", "above");
        puck_define_property(this, "cachedViewportDimensions", null);
        // We need to detect if the browser has a buggy position:fixed behavior
        // (as is currently the case for Safari
        // https://bugs.webkit.org/show_bug.cgi?id=207089)
        // so we can adjust the way we position the puck.
        
        // This probably should _also_ apply to the way we position the safe area
        // but we haven't looked into that case just yet.
        
        // undefined means we haven't been able to detect whether or not the bug is
        // present yet.
                puck_define_property(this, "hasBuggyPositionFixed", void 0);
        // We sometimes temporarily modify the content so we can look it up. In such
        // a case we register a `restore` function to return the content back
        // to its original state when we have finished with it.
                puck_define_property(this, "contentToRestore", void 0);
        puck_define_property(this, "safeAreaProvider", void 0);
        // Callbacks
                puck_define_property(this, "onLookupDisabled", void 0);
        puck_define_property(this, "onPuckStateChanged", void 0);
        puck_define_property(this, "onSafeAreaUpdated", (() => {
          this.cachedViewportDimensions = null;
          this.setPositionWithinSafeArea(this.puckX, this.puckY);
        }));
        puck_define_property(this, "onWindowPointerMove", (event => {
          if (isPuckPointerEvent(event)) return;
          if (!this.puck || !this.earthWidth || !this.earthHeight || this.enabledState === "disabled" || // If we're not being pressed or dragged, ignore
          !(this.clickState.kind === "dragging" || this.clickState.kind === "firstpointerdown" || this.clickState.kind === "secondpointerdown")) return;
          event.preventDefault();
          let {clientX, clientY} = event;
          // Factor in any viewport offset needed to make up for Safari iOS's buggy
          // implementation of position:fixed.
                    let viewportOffsetLeft = 0;
          let viewportOffsetTop = 0;
          if (this.hasBuggyPositionFixed) {
            viewportOffsetLeft = window.visualViewport?.offsetLeft ?? 0;
            viewportOffsetTop = window.visualViewport?.offsetTop ?? 0;
          }
          clientX += viewportOffsetLeft;
          clientY += viewportOffsetTop;
          // Translate the midpoint of the earth to the position of the pointer event.
          // This updates the moon offset
                    this.setPositionWithinSafeArea(clientX - this.earthWidth / 2, clientY - this.earthHeight / 2);
          if (this.enabledState !== "active") return;
          // Before applying the transformations to the earth and the moon, they
          // both share the same midpoint.
          // Work out the midpoint of the moon post-transformations. This is where
          // we'll fire the mousemove event to trigger a lookup.
          
          // We drop any zoom offsets here since both elementFromPoint and the mouse
          // event handlers we pass these coordinates to will expect an unadjusted
          // value.
                    const targetX = this.puckX + this.earthWidth / 2 + this.targetOffset.x - viewportOffsetLeft;
          const targetY = this.puckY + this.earthHeight / 2 + this.targetOffset.y - viewportOffsetTop;
          // See what we are pointing at
                    let target = document.elementsFromPoint(targetX, targetY).find((target => !isPopupWindowHostElem(target))) || null;
          // Check if we need to adjust the content to look it up.
          
          // But first check we aren't pointing at the same content as we adjusted
          // last time (or one of its descendents).
                    if (!this.contentToRestore?.root.contains(target)) {
            // Restore any content we previously adjusted.
            this.restoreContent();
            // Look for hidden textboxes on mokuro reader pages
                        const mokuroResult = LookupPuck.uncoverMokuroText(target, targetX, targetY);
            if (mokuroResult) {
              target = mokuroResult.newTarget;
              this.contentToRestore = mokuroResult.contentToRestore;
            }
          }
          // Make sure the target is an actual element since the mousemove handler
          // expects that.
                    if (!target) return;
          // When the target is an iframe, simply firing a 'mousemove' event at it
          // does not have the desired effect of prompting a lookup at the target
          // location within the iframe.
          
          // Instead, we send a 'puckMoved' message to the iframe. Our injected
          // content script ensures that the iframe has a listener in place to handle
          // this message. Upon receiving this message, the iframe will fire a
          // 'mousemove' event at the indicated location, ultimately resulting in a
          // lookup at the target point.
          
          // Note that this is the one and only case where we use postMessage, the
          // reasons for which are described here:
          
          //  https://github.com/birchill/10ten-ja-reader/issues/747#issuecomment-918774588
          
          // For any other cross-frame messaging we should very very strongly prefer
          // passing messages via the background page.
                    if (target.tagName === "IFRAME") {
            const iframeElement = target;
            const contentWindow = iframeElement.contentWindow;
            if (!contentWindow) return;
            // Adjust the target position by the offset of the iframe itself within
            // the viewport.
                        const originPoint = getIframeOrigin(iframeElement);
            if (!originPoint) return;
            const {x, y} = originPoint;
            contentWindow.postMessage({
              type: "10ten(ja):puckMoved",
              clientX: targetX - x,
              clientY: targetY - y
            }, "*");
            return;
          }
          const pointerEvent = new PointerEvent("pointermove", {
            // Make sure the event bubbles up to the listener on the window
            bubbles: true,
            clientX: targetX,
            clientY: targetY,
            pointerType: "mouse"
          });
          pointerEvent.fromPuck = true;
          target.dispatchEvent(pointerEvent);
        }));
        puck_define_property(this, "checkForBuggyPositionFixed", (() => {
          // Check if we've already run this check
          if (typeof this.hasBuggyPositionFixed !== "undefined") return;
          // Check we have the visual viewport API available.
          
          // If not, it's hard to detect the browser bug (since we don't know if we're
          // scaled or not) and it's hard to work around it too without flushing style
          // on every pointer event so we just act as if there's no bug.
          
          // (Normally this function won't be called in the first place if we don't
          // have the visual viewport API since we can't register for viewport resize
          // events, but we manually call this function initially after rendering so
          // we can still arrive here even without the API.)
                    if (typeof window.visualViewport === "undefined" || window.visualViewport === null) {
            this.hasBuggyPositionFixed = false;
            return;
          }
          // Check that there is a suitable viewport scale applied so that we could
          // potentially detect the bug
                    if (Math.abs(window.visualViewport.scale - 1) < 0.01 || Math.abs(window.visualViewport.offsetLeft) <= 1 && Math.abs(window.visualViewport.offsetTop) <= 1) return;
          // Check the puck is actually being rendered
                    if (!this.puck) return;
          // Clear the transform on the puck and check if its resting position is
          // actually equal to the offset of the visual viewport.
          
          // When that's the case we've got iOS's buggy position:fixed that makes the
          // element not actually fixed.
          
          // https://bugs.webkit.org/show_bug.cgi?id=207089
          
          // Furthermore, because the offsets match we know we can work around it
          // by factoring the viewport offset into our calculations.
                    const previousTransform = this.puck.style.transform || "none";
          this.puck.style.transform = "none";
          const bbox = this.puck.getBoundingClientRect();
          this.hasBuggyPositionFixed = Math.abs(bbox.left + window.visualViewport.offsetLeft) < 1 && Math.abs(bbox.top + window.visualViewport.offsetTop) < 1;
          this.puck.style.transform = previousTransform;
          // Don't listen for any more viewport resize events
                    window.visualViewport.removeEventListener("resize", this.checkForBuggyPositionFixed);
        }));
        puck_define_property(this, "onPuckPointerDown", (event => {
          if (this.enabledState === "disabled" || !this.puck) return;
          // Ignore right-clicks
                    if (event.button) return;
          // NOTE: Some of the code in this function is duplicated in onPuckMouseDown
          // so please make sure to keep these two functions in sync.
                    if (this.clickState.kind === "idle") 
          // If no transition to 'pointerup' occurs during the click hysteresis
          // period, then we transition to 'dragging'. This avoids onPuckClick()
          // being fired every time the puck gets parked.
          this.clickState = {
            kind: "firstpointerdown",
            timeout: window.setTimeout((() => {
              if (this.clickState.kind === "firstpointerdown") this.clickState = {
                kind: "dragging"
              };
            }), clickHysteresis)
          }; else if (this.clickState.kind === "firstclick") 
          // Carry across the timeout from 'firstclick', as we still want to
          // transition back to 'idle' if no 'pointerdown' event came within
          // the hysteresis period of the preceding 'firstclick' state.
          this.clickState = {
            ...this.clickState,
            kind: "secondpointerdown"
          };
          event.preventDefault();
          event.stopPropagation();
          this.puck.classList.add("dragging");
          this.puck.setPointerCapture(event.pointerId);
          // We need to register in the capture phase because Bibi reader (which
          // apparently is based on Epub.js) registers a pointermove handler on the
          // window in the capture phase and calls `stopPropagation()` on the events
          // so if we don't register in the capture phase, we'll never see the events.
                    window.addEventListener("pointermove", this.onWindowPointerMove, {
            capture: true
          });
          window.addEventListener("pointerup", this.stopDraggingPuck);
          window.addEventListener("pointercancel", this.stopDraggingPuck);
        }));
        // See notes where we register the following two functions (onPuckMouseDown
        // and onPuckMouseUp) for why they are needed. The summary is that they are
        // only here to work around iOS swallowing pointerevents during the _second_
        // tap of a double-tap gesture.
        
        // As a result these event listeners are _only_ interested in when we are
        // detecting the second tap of a double-tap gesture.
        
        // When the pointer events are _not_ swallowed, because we call preventDefault
        // on the pointerdown / pointerup events, these functions should never be
        // called.
                puck_define_property(this, "onPuckMouseDown", (event => {
          // This is only needed for iOS Safari and on Firefox for Android, calling
          // preventDefault on a pointerdown event will _not_ prevent it from
          // triggering subsequent mousedown/mouseup events (see
          // https://codepen.io/birtles/pen/rNPKNQJ) so we should _not_ run this code
          // on platforms other than iOS.
          if (!ua_utils_isIOS()) return;
          if (this.enabledState === "disabled" || !this.puck) return;
          // Ignore right-clicks
                    if (event.button) return;
          // We only care about detecting the start of a second tap
                    if (this.clickState.kind !== "firstclick") return;
          // Following are the important bits of onPuckPointerDown.
          
          // Eventually we should find a way to share this code better with that
          // function.
                    this.clickState = {
            ...this.clickState,
            kind: "secondpointerdown"
          };
          event.preventDefault();
          // See note in onPointerDown for why we need to register in the capture
          // phase.
                    window.addEventListener("pointermove", this.onWindowPointerMove, {
            capture: true
          });
          window.addEventListener("pointerup", this.stopDraggingPuck);
          window.addEventListener("pointercancel", this.stopDraggingPuck);
        }));
        puck_define_property(this, "onPuckMouseUp", (event => {
          // This is only needed for iOS Safari and on Firefox for Android, calling
          // preventDefault on a pointerdown event will _not_ prevent it from
          // triggering subsequent mousedown/mouseup events (see
          // https://codepen.io/birtles/pen/rNPKNQJ) so we should _not_ run this code
          // on platforms other than iOS.
          if (!ua_utils_isIOS()) return;
          if (this.enabledState === "disabled" || !this.puck) return;
          // Ignore right-clicks
                    if (event.button) return;
          // We only care about detecting the end of the second tap in a double-tap
          // gesture.
                    if (this.clickState.kind !== "secondpointerdown") return;
          event.preventDefault();
          event.stopPropagation();
          this.stopDraggingPuck();
          this.onPuckDoubleClick();
        }));
        puck_define_property(this, "onPuckSingleClick", (() => {
          this.setEnabledState(this.enabledState === "active" ? "inactive" : "active");
          this.notifyPuckStateChanged();
        }));
        puck_define_property(this, "onPuckDoubleClick", (() => {
          this.targetOrientation = this.targetOrientation === "above" ? "below" : "above";
          this.setPositionWithinSafeArea(this.puckX, this.puckY);
          this.notifyPuckStateChanged();
        }));
        // May be called manually (without an event), or upon 'pointerup' or
        // 'pointercancel'.
                puck_define_property(this, "stopDraggingPuck", (event => {
          // Ignore right-clicks
          if (event?.button) return;
          if (this.puck) {
            this.puck.classList.remove("dragging");
            this.setPositionWithinSafeArea(this.puckX, this.puckY);
            this.notifyPuckStateChanged();
          }
          window.removeEventListener("pointermove", this.onWindowPointerMove, {
            capture: true
          });
          window.removeEventListener("pointerup", this.stopDraggingPuck);
          window.removeEventListener("pointercancel", this.stopDraggingPuck);
          if (!event || event.type === "pointercancel") {
            clearClickTimeout(this.clickState);
            this.clickState = {
              kind: "idle"
            };
            return;
          }
          // Prevent any double-taps turning into a zoom
                    event.preventDefault();
          event.stopPropagation();
          if (this.clickState.kind === "firstpointerdown") {
            // Prevent 'firstpointerdown' transitioning to 'dragging' state.
            clearClickTimeout(this.clickState);
            // Wait for the hysteresis period to expire before calling
            // this.onPuckSingleClick() (to rule out a double-click).
                        this.clickState = {
              kind: "firstclick",
              timeout: window.setTimeout((() => {
                if (this.clickState.kind === "firstclick") {
                  this.clickState = {
                    kind: "idle"
                  };
                  this.onPuckSingleClick();
                } else if (this.clickState.kind === "secondpointerdown") this.clickState = {
                  kind: "dragging"
                };
              }), clickHysteresis)
            };
          } else if (this.clickState.kind === "secondpointerdown") {
            clearClickTimeout(this.clickState);
            this.clickState = {
              kind: "idle"
            };
            this.onPuckDoubleClick();
          } else if (this.clickState.kind === "dragging") this.clickState = {
            kind: "idle"
          };
        }));
        puck_define_property(this, "noOpEventHandler", (() => {}));
        if (initialPosition) {
          this.puckX = initialPosition.x;
          this.puckY = initialPosition.y;
          this.targetOrientation = initialPosition.orientation;
        } else {
          // Initially position the puck in the bottom-right corner of the screen
          this.puckX = Number.MAX_SAFE_INTEGER;
          this.puckY = Number.MAX_SAFE_INTEGER;
        }
        this.safeAreaProvider = safeAreaProvider;
        this.onLookupDisabled = onLookupDisabled;
        this.onPuckStateChanged = onPuckStateChanged;
      }
    }
    function removePuck() {
      removeContentContainer(LookupPuckId);
    }
    // CONCATENATED MODULE: ./src/content/popup/arrow.ts
    const POPUP_ROUNDING = 5;
    function renderArrow({direction, popupContainer, popupPos: {x: popupX, y: popupY}, popupSize, side, target, theme}) {
      const arrow = document.createElement("div");
      arrow.classList.add("arrow");
      arrow.classList.add(getThemeClass(theme));
      popupContainer.append(arrow);
      const arrowWidth = parseFloat(getComputedStyle(arrow).width);
      const arrowHeight = parseFloat(getComputedStyle(arrow).height);
      // XXX Make the CSS rule that causes us to ignore the constrained width when
      // tabs are on top, _not_ apply when positioning the popup left/right of
      // vertical text.
            if (direction === "vertical") {
        let left = target.x - arrowWidth / 2 - popupX;
        // Make sure the arrow does not overlap with the rounding of the popup
                left = Math.max(left, POPUP_ROUNDING);
        arrow.style.left = `${left}px`;
        if (side === "before") {
          arrow.style.top = `${popupSize.height}px`;
          arrow.classList.add("-bottom");
        } else {
          arrow.style.top = `${-arrowHeight}px`;
          arrow.classList.add("-top");
        }
      } else {
        let top = target.y - arrowWidth / 2 - popupY;
        top = Math.max(top, POPUP_ROUNDING);
        arrow.style.top = `${top}px`;
        if (side === "before") {
          arrow.style.left = `${popupSize.width}px`;
          arrow.classList.add("-right");
        } else {
          arrow.style.left = `${-arrowHeight}px`;
          arrow.classList.add("-left");
        }
      }
    }
    // CONCATENATED MODULE: ./src/content/popup/icons.ts
    function renderBook() {
      const bookSvg = builder_svg("svg", {
        viewBox: "0 0 16 16",
        role: "presentation"
      }, builder_svg("path", {
        d: "M14,2H10.09a2.16,2.16,0,0,0-.71.12l-1.11.41a.83.83,0,0,1-.54,0L6.62,2.12A2.16,2.16,0,0,0,5.91,2H2A2,2,0,0,0,0,4v8a2,2,0,0,0,2.05,2H5.91a.76.76,0,0,1,.27.05l1.12.4a1.95,1.95,0,0,0,1.4,0L10.33,14l.84,0a.84.84,0,0,0,.71-.8c0-.67-.76-.69-.76-.69a5.17,5.17,0,0,0-1.25.12L9,13V4l.07,0,1.11-.4a.86.86,0,0,1,.27,0h3.27a.78.78,0,0,1,.78.78V9A.75.75,0,0,0,16,9V4A2,2,0,0,0,14,2ZM7,13l-.76-.33a1.85,1.85,0,0,0-.7-.13H2.28a.78.78,0,0,1-.78-.78V4.28a.78.78,0,0,1,.78-.78H5.54a.75.75,0,0,1,.26,0L6.92,4,7,4Z"
      }));
      const lineGroup = builder_svg("g", {
        fill: "none",
        stroke: "currentColor",
        "stroke-linecap": "round"
      });
      bookSvg.append(lineGroup);
      const lines = [ [ 3, 7.5, 5.5, 7.5 ], [ 3, 5.5, 5.5, 5.5 ], [ 3, 9.5, 5.5, 9.5 ], [ 10.5, 7.5, 13, 7.5 ], [ 10.5, 5.5, 13, 5.5 ], [ 10.5, 9.5, 11.5, 9.5 ] ];
      for (const [x1, y1, x2, y2] of lines) {
        const line = builder_svg("line", {
          x1: String(x1),
          y1: String(y1),
          x2: String(x2),
          y2: String(y2)
        });
        lineGroup.append(line);
      }
      const circle = builder_svg("circle", {
        cx: "14.5",
        cy: "12.5",
        r: "1.5"
      });
      bookSvg.append(circle);
      return bookSvg;
    }
    function renderClipboard() {
      return builder_svg("svg", {
        viewBox: "0 0 24 24",
        role: "presentation",
        fill: "currentColor"
      }, builder_svg("circle", {
        cx: "19.5",
        cy: "21.5",
        r: "1.5"
      }), builder_svg("path", {
        d: "M10.46 5.54c0-.89.7-1.61 1.54-1.61s1.54.72 1.54 1.61v.65c0 .17-.14.32-.31.32h-2.46a.32.32 0 0 1-.31-.32v-.65zM15.97 20H6.9c-.5 0-.9-.46-.9-1V7.48c0-.54.4-.97.9-.97h1.74a2.19 2.19 0 0 0 2.13 1.94h2.46c1.07 0 1.98-.83 2.13-1.94h1.7c.5 0 .94.43.94.97V18a1 1 0 0 0 2 0V7.48c0-1.6-1.42-2.9-2.94-2.9h-1.8a3.37 3.37 0 0 0-4.2-2.44c-1.12.33-2 1.26-2.32 2.43H6.9c-1.53 0-2.9 1.3-2.9 2.9V19c0 1.6 1.47 3 3 3h8.97a1 1 0 1 0 0-2z"
      }));
    }
    function renderCog() {
      return builder_svg("svg", {
        viewBox: "0 0 24 24"
      }, builder_svg("circle", {
        cx: "21.5",
        cy: "21.5",
        r: "1.5",
        fill: "currentColor",
        stroke: "none"
      }), builder_svg("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }), builder_svg("path", {
        d: "M10.48 3.28a2 2 0 003 0 2.05 2.05 0 013.57 1.48 2.05 2.05 0 002.15 2.15 2.05 2.05 0 011.48 3.57 2 2 0 000 3 2.05 2.05 0 01-1.48 3.57 2.05 2.05 0 00-2.15 2.15 2.05 2.05 0 01-3.57 1.48 2 2 0 00-3 0 2.05 2.05 0 01-3.57-1.48 2.05 2.05 0 00-2.15-2.15 2.05 2.05 0 01-1.48-3.57 2 2 0 000-3 2.05 2.05 0 011.48-3.57 2.05 2.05 0 002.15-2.15 2.05 2.05 0 013.57-1.48z"
      }));
    }
    function renderCross() {
      return builder_svg("svg", {
        viewBox: "0 0 24 24"
      }, builder_svg("path", {
        d: "M6 18L18 6M6 6l12 12"
      }));
    }
    function renderKanjiIcon() {
      return builder_svg("svg", {
        viewBox: "0 0 16 16",
        role: "presentation"
      }, builder_svg("circle", {
        cx: "14.5",
        cy: "14.5",
        r: "1.5"
      }), builder_svg("path", {
        d: "M11,15H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H13a2,2,0,0,1,2,2v9a1,1,0,0,1-2,0V2H2V13h9a1,1,0,0,1,0,2Z"
      }), builder_svg("path", {
        d: "M8.5,7H5V6h5V7H9.5l-1,1H12V9H8v2a1,1,0,0,1-.24.71A1.15,1.15,0,0,1,7,12H6V11H7V9H3V8H7.5ZM8,4h4V6H11V5H4V6H3V4H7V3H8Z"
      }));
    }
    function renderPerson() {
      return builder_svg("svg", {
        viewBox: "0 0 16 16",
        role: "presentation"
      }, builder_svg("circle", {
        cx: "14.5",
        cy: "14.5",
        r: "1.5"
      }), builder_svg("path", {
        d: "M8,0A2.87,2.87,0,0,0,5,2.72v2.5A2.92,2.92,0,0,0,8,8a2.92,2.92,0,0,0,3-2.78V2.72A2.87,2.87,0,0,0,8,0Z"
      }), builder_svg("path", {
        d: "M13.91,11.71A5.09,5.09,0,0,0,9.45,9H5.09A5.18,5.18,0,0,0,0,14.25.74.74,0,0,0,.73,15h10.9a.74.74,0,0,0,.73-.75,1.49,1.49,0,0,1,1.09-1.45.75.75,0,0,0,.49-.43A.76.76,0,0,0,13.91,11.71Z"
      }));
    }
    function renderPin() {
      return builder_svg("svg", {
        role: "presentation",
        viewBox: "0 0 24 24"
      }, builder_svg("path", {
        d: "m14 3 .593 1.833c.104.295.157.604.157.917v3.42l.666.236a2.759 2.759 0 0 1 1.834 2.591c0 .05 0 .197-.33.253a3.504 3.504 0 0 0-3.42 3.499c-.029.065-.283.251-.5.251h-1v4.75V16H8.904a2.156 2.156 0 0 1-2.154-2.154v-1.849a2.75 2.75 0 0 1 1.833-2.592l.667-.235V5.75c0-.313.053-.622.157-.916L10 3H8h8-2z",
        fill: "none",
        stroke: "currentColor"
      }), builder_svg("circle", {
        cx: "18",
        cy: "16.5",
        r: "1.5",
        fill: "currentColor",
        stroke: "none"
      }));
    }
    function renderSpinner() {
      return builder_svg("svg", {
        viewBox: "0 0 16 16",
        role: "presentation"
      }, builder_svg("path", {
        d: "M8.54,2.11l.66-.65A.78.78,0,0,0,9.2.38a.76.76,0,0,0-1.08,0L6.19,2.31A.81.81,0,0,0,6,2.55a.8.8,0,0,0-.06.3A.72.72,0,0,0,6,3.14a.74.74,0,0,0,.17.25L8.12,5.32a.73.73,0,0,0,.54.22.76.76,0,0,0,.54-.22.78.78,0,0,0,0-1.08l-.58-.58A4.38,4.38,0,1,1,3.68,8.82a.76.76,0,0,0-1.5.28,5.92,5.92,0,1,0,6.36-7Z"
      }), builder_svg("circle", {
        cx: "2.673",
        cy: "6.71",
        r: "0.965"
      }));
    }
    function renderStar(style) {
      const message = style === "full" ? "entry_priority_label_high" : "entry_priority_label_regular";
      return builder_svg("svg", {
        class: "svgicon",
        viewBox: "0 0 98.6 93.2",
        style: "opacity: 0.5"
      }, builder_svg("title", {}, browser_polyfill_default().i18n.getMessage(message)), builder_svg("path", {
        d: style === "full" ? "M98 34a4 4 0 00-3-1l-30-4L53 2a4 4 0 00-7 0L33 29 4 33a4 4 0 00-3 6l22 20-6 29a4 4 0 004 5 4 4 0 002 0l26-15 26 15a4 4 0 002 0 4 4 0 004-4 4 4 0 000-1l-6-29 22-20a4 4 0 001-5z" : "M77 93a4 4 0 004-4 4 4 0 000-1l-6-29 22-20a4 4 0 00-2-6l-30-4L53 2a4 4 0 00-7 0L33 29 4 33a4 4 0 00-3 6l22 20-6 29a4 4 0 004 5 4 4 0 002 0l26-15 26 15a4 4 0 002 0zm-5-12L51 70a4 4 0 00-4 0L27 81l5-22a4 4 0 00-1-4L13 40l23-3a4 4 0 004-2l9-21 10 21a4 4 0 003 2l23 3-17 15a4 4 0 00-1 4z"
      }));
    }
    // CONCATENATED MODULE: ./src/content/popup/close.ts
    function renderCloseButton(onClosePopup, closeShortcuts) {
      const label = browser_polyfill_default().i18n.getMessage("popup_close_label");
      const title = closeShortcuts.length ? `${label} (${closeShortcuts.join(" / ")})` : label;
      const closeButton = html("button", {
        "aria-label": label,
        title,
        class: "close-button",
        type: "button"
      }, renderCross());
      closeButton.onclick = event => {
        event.preventDefault();
        onClosePopup();
      };
      return html("div", {
        class: "close"
      }, closeButton);
    }
    // CONCATENATED MODULE: ./src/content/popup/lang-tag.ts
    // Cache language tag since we fetch it a lot
    let lang_tag_langTag = null;
    function getLangTag() {
      if (lang_tag_langTag === null) lang_tag_langTag = browser_polyfill_default().i18n.getMessage("lang_tag");
      return lang_tag_langTag;
    }
    // CONCATENATED MODULE: ./src/content/popup/copy-overlay.ts
    function renderCopyOverlay({copyState, includeAllSenses, includeLessCommonHeadwords, includePartOfSpeech, kanjiReferences, onCancelCopy, onCopy, result, series, showKanjiComponents}) {
      const copyOverlay = html("div", {
        class: "copy-overlay"
      });
      // Work out what we would copy so we can generate suitable preview text
            const entryToCopy = result ? getCopyEntryFromResult({
        result,
        series,
        index: copyState.kind !== "inactive" ? copyState.index : 0
      }) : null;
      // Heading
            const wordToCopy = entryToCopy ? getTextToCopy({
        entry: entryToCopy,
        copyType: "word",
        getMessage: browser_polyfill_default().i18n.getMessage.bind(browser_polyfill_default().i18n)
      }) : null;
      const heading = wordToCopy ? browser_polyfill_default().i18n.getMessage("content_copy_overlay_copy_title_with_word", wordToCopy) : browser_polyfill_default().i18n.getMessage("content_copy_overlay_copy_title");
      copyOverlay.append(html("div", {
        role: "heading",
        class: "copy-heading",
        lang: getLangTag()
      }, heading));
      // Options
            const list = copyOverlay.appendChild(html("ul", {
        class: "copy-options"
      }));
      // Entry button
            {
        const entryPreviewText = entryToCopy ? getTextToCopy({
          entry: entryToCopy,
          copyType: "entry",
          getMessage: browser_polyfill_default().i18n.getMessage.bind(browser_polyfill_default().i18n),
          includeAllSenses,
          includeLessCommonHeadwords,
          includePartOfSpeech,
          kanjiReferences,
          showKanjiComponents
        }) : void 0;
        const button = renderButtonWithPreview({
          label: browser_polyfill_default().i18n.getMessage("content_copy_overlay_entry_button"),
          previewText: entryPreviewText
        });
        button.addEventListener("click", (() => onCopy?.("entry")));
        list.append(html("li", {}, button));
      }
      // Tab-separated button
            {
        const tabSeparatedPreviewText = entryToCopy ? getTextToCopy({
          entry: entryToCopy,
          copyType: "tab",
          getMessage: browser_polyfill_default().i18n.getMessage.bind(browser_polyfill_default().i18n),
          includeAllSenses,
          includeLessCommonHeadwords,
          includePartOfSpeech,
          kanjiReferences,
          showKanjiComponents
        }).replace(/\t/g, " \u2192 ") : void 0;
        const button = renderButtonWithPreview({
          label: browser_polyfill_default().i18n.getMessage("content_copy_overlay_tab_separated_button"),
          previewText: tabSeparatedPreviewText
        });
        button.addEventListener("click", (() => onCopy?.("tab")));
        list.append(html("li", {}, button));
      }
      // Word button
            {
        const copyWordButton = list.appendChild(html("li")).appendChild(html("button", {
          class: "-icon-label"
        }));
        if (wordToCopy) {
          const icon = renderClipboard();
          icon.classList.add("icon");
          copyWordButton.append(icon);
        }
        const copyWordLabel = html("span");
        if (wordToCopy) {
          copyWordLabel.append(wordToCopy);
          copyWordLabel.lang = "ja";
        } else {
          copyWordLabel.append(browser_polyfill_default().i18n.getMessage(series === "kanji" ? "content_copy_overlay_kanji_button" : "content_copy_overlay_word_button"));
          copyWordLabel.lang = getLangTag();
        }
        copyWordButton.append(copyWordLabel);
        copyWordButton.addEventListener("click", (() => onCopy?.("word")));
      }
      // Cancel button
            const cancelButton = html("button", {
        class: "cancel-button",
        lang: getLangTag()
      }, builder_svg("svg", {
        class: "icon",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        "stroke-width": "2"
      }, builder_svg("path", {
        d: "M6 18L18 6M6 6l12 12"
      })), browser_polyfill_default().i18n.getMessage("content_copy_overlay_cancel_button"));
      cancelButton.addEventListener("click", (() => onCancelCopy?.()));
      copyOverlay.append(cancelButton);
      return copyOverlay;
    }
    function renderButtonWithPreview({label, previewText}) {
      const button = html("button", {
        lang: getLangTag()
      }, label);
      if (previewText) {
        const previewRow = html("div", {
          class: "copy-preview",
          role: "presentation"
        });
        const icon = renderClipboard();
        icon.classList.add("icon");
        previewRow.append(icon);
        previewRow.append(html("span", {
          lang: "ja"
        }, previewText));
        button.append(previewRow);
      }
      return button;
    }
    // CONCATENATED MODULE: ./src/utils/round.ts
    function round(number, precision) {
      const factor = Math.pow(10, precision);
      return Math.round((number + Number.EPSILON) * factor) / factor;
    }
    // CONCATENATED MODULE: ./src/content/popup/expandable.ts
    function updateExpandable(expandable, options) {
      if (options.isExpanded) {
        // We style kanji content differently depending on whether or not we're in
        // the (manually) expanded state.
        // Specifically, when we're not expanded, we lay out the kanji in a grid
        // such that each kanji table has the same height so that you can scroll
        // through the kanji one-by-one and even if later kanji tables are bigger,
        // they still fit in the popup.
        // When the popup is expanded, however, that's not necessary. Ironically,
        // that means that the "expanded" state is actually smaller than the
        // "collapsed" state.
        expandable.classList.add("expanded");
        // In all cases, if we're in the (manually) expanded state we never need to
        // worry about constraining the height or showing the expand button so we're
        // done here.
                return;
      }
      // Calculate the preferred expanded height
      
      // Note that this is the height _before_ adding the expand button.
      // i.e. if we have this much room, we don't need the expand button and the
      // extra space it requires.
            const {top: expandableTop, height: expandedHeight} = expandable.getBoundingClientRect();
      // Calculate the collapsed height
            const foldPoint = getFoldPoint(expandable);
      const collapsedHeight = foldPoint === null ? expandedHeight : foldPoint - expandableTop;
      // Work out if we are effectively collapsed
      
      // Note that "effectively" collapsed is not quite the same as
      // `!options.isExpanded` as if we have no fold point (or the fold point occurs
      // at the end of the content) then even if `options.isExpanded` is false,
      // we are not collapsed.
      
      // This is almost always going to be the same as `foldPoint !== null` but just
      // in case we add a fold point at the end of the content we compare the
      // collapsedHeight to the expandedHeight.
            const isCollapsed = expandedHeight - collapsedHeight > 1;
      // Set an explicit height on the expandable so that we can add a
      // `position: sticky` expand button without it affecting the height.
            expandable.style.height = isCollapsed ? `calc(${round(collapsedHeight, 2)}px + var(--expand-button-allowance))` : `${expandedHeight}px`;
      // Add a `position: sticky` expand button to the bottom of the content
            const label = browser_polyfill_default().i18n.getMessage("popup_expand_label");
      const title = options.expandShortcuts?.length ? `${label} (${options.expandShortcuts.join(" / ")})` : label;
      const expandButton = html("button", {
        class: "expand-button",
        title,
        type: "button"
      }, builder_svg("svg", {
        class: "icon",
        viewBox: "0 0 24 24",
        role: "presentation"
      }, builder_svg("path", {
        fill: "currentColor",
        d: "M21 6c1.7 0 2.6 2 1.4 3.2L13.5 20c-.7.9-2.3.9-3 0L1.6 9.2C.4 8 1.3 6 3 6h18z"
      })));
      expandButton.addEventListener("click", (() => {
        options.onExpandPopup?.();
      }));
      if (options.showKeyboardShortcut && options.expandShortcuts?.length) expandButton.append(html("kbd", {}, options.expandShortcuts[0]));
      expandable.append(expandButton);
      // Hide the button if we are not currently collapsed
            if (!isCollapsed) expandButton.style.display = "none";
      // Hide/show the expand button in response to changes to the available content
      // height.
      
      // There are two cases where this is necessary.
      
      // a) Once we apply any height constraints to the popup, even if there is no
      //    fold point, there might not be enough room for the content so we want
      //    to show the expand button to provide a consistent experience.
      
      //    (The user doesn't care if the content is hidden due to the popup height
      //    constraints or self-inflicted "hide everything below the fold point"
      //    constraints. They just expect to be able to press the expand button to
      //    see everything.)
      
      //    However, until we actually position the popup and possibly constrain its
      //    height we won't know whether or not the content fits.
      
      // b) A specific case where we actually enlarge the content area by activating
      //    and then clearing the copy overlay:
      
      //    1. The expandable is collapsed.
      //    2. The user clicks on the top entry to activate the copy screen
      //       overlay.
      //    3. When the copy screen overlay is active, we enlarge the size of the
      //       popup so that all the copy buttons are visible.
      //    4. Then, when the user exits copy mode we ensure that the height
      //       doesn't change (unless they've pinned the window) so that they don't
      //       suddenly find themselves in a situation where their mouse is outside
      //       the window.
      
      //    At this point, depending on the size of the content being shown, we can
      //    arrive at a situation where the content in the expandable is fully
      //    visible, despite having a fold point.
      
      //    If we continue showing the expand button in that situation it not only
      //    looks odd, if the user _were_ to click it the window would shrink
      //    leaving their mouse outside of it.
      
      //    We _could_ handle this by simply forcing the popup to be expanded as
      //    soon as the user ends copy mode. That would be simplest but it sometimes
      //    means that when you go to copy an entry the popup becomes MASSIVE which
      //    is not the nicest user experience.
      
      //    Instead, we try to do the nice thing and expand the popup just enough
      //    to show the copy controls, then keep it just that big when the user
      //    exits copy mode.
      
            const resizeObserver = new ResizeObserver((entries => {
        for (const entry of entries) {
          const {blockSize: expandableRenderedHeight} = entry.contentBoxSize[0];
          if (!expandableRenderedHeight) return;
          // From my tests in Firefox and Chrome, even if we refer to the button
          // via `expandButton`, once the popup is removed from the DOM, the
          // ResizeObserver closure is successfully garbage/cycle collected
          // (despite claims to the contrary [1][2]).
          
          // With Safari I don't know what is going on. It never seems to reclaim
          // the memory but that might just be because garbage collection is very
          // lazy.
          
          // In any case, it's probably safer to _not_ hold onto a reference to
          // the expandable or any of its contents and instead look up the button
          // from the ResizeObserver entry.
          
          // [1] https://github.com/w3c/csswg-drafts/issues/5155#issuecomment-1382387212
          // [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1596992#c10
                    const button = entry.target.querySelector(".expand-button");
          if (!button) return;
          button.style.display = expandedHeight - expandableRenderedHeight < 1 ? "none" : "";
        }
      }));
      resizeObserver.observe(expandable);
      // Turn on scroll snapping after the window has been resized
      
      // In Firefox we can set this from the outset but for Chrome and Safari if
      // we do that, it seems like we end up re-snapping at some point and the list
      // jumps randomly, often to somewhere in the middle or end.
            requestAnimationFrame((() => {
        expandable.style.scrollSnapType = "y mandatory";
      }));
    }
    function getFoldPoint(expandable) {
      const foldPointElem = expandable.querySelector(".fold-point");
      if (!foldPointElem) return null;
      // The fold point is `display: contents` so that it doesn't affect the layout
      // of any grid or flex elements it is added too but that also means that we
      // can't measure it's position directly.
      
      // Instead we take the point between its direct siblings.
            const prev = foldPointElem.previousElementSibling;
      const next = foldPointElem.nextElementSibling;
      if (!prev || !next) return null;
      const {bottom: previousBottom} = prev.getBoundingClientRect();
      const {top: nextTop} = next.getBoundingClientRect();
      return previousBottom + (nextTop - previousBottom) / 2;
    }
    // CONCATENATED MODULE: ./node_modules/.pnpm/preact@10.24.2/node_modules/preact/dist/preact.module.js
    var preact_module_n, preact_module_l, preact_module_u, preact_module_i, preact_module_o, preact_module_r, preact_module_f, preact_module_e, preact_module_c, preact_module_s, preact_module_a, preact_module_h = {}, preact_module_v = [], preact_module_p = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, preact_module_y = Array.isArray;
    function preact_module_d(n, l) {
      for (var u in l) n[u] = l[u];
      return n;
    }
    function preact_module_w(n) {
      n && n.parentNode && n.parentNode.removeChild(n);
    }
    function preact_module_(l, u, t) {
      var i, o, r, f = {};
      for (r in u) "key" == r ? i = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
      if (arguments.length > 2 && (f.children = arguments.length > 3 ? preact_module_n.call(arguments, 2) : t), 
      "function" == typeof l && null != l.defaultProps) for (r in l.defaultProps) void 0 === f[r] && (f[r] = l.defaultProps[r]);
      return preact_module_g(l, f, i, o, null);
    }
    function preact_module_g(n, t, i, o, r) {
      var f = {
        type: n,
        props: t,
        key: i,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: null == r ? ++preact_module_u : r,
        __i: -1,
        __u: 0
      };
      return null == r && null != preact_module_l.vnode && preact_module_l.vnode(f), f;
    }
    function preact_module_b(n) {
      return n.children;
    }
    function preact_module_k(n, l) {
      this.props = n, this.context = l;
    }
    function preact_module_x(n, l) {
      if (null == l) return n.__ ? preact_module_x(n.__, n.__i + 1) : null;
      for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
      return "function" == typeof n.type ? preact_module_x(n) : null;
    }
    function preact_module_C(n) {
      var l, u;
      if (null != (n = n.__) && null != n.__c) {
        for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
          n.__e = n.__c.base = u.__e;
          break;
        }
        return preact_module_C(n);
      }
    }
    function preact_module_M(n) {
      (!n.__d && (n.__d = !0) && preact_module_i.push(n) && !preact_module_P.__r++ || preact_module_o !== preact_module_l.debounceRendering) && ((preact_module_o = preact_module_l.debounceRendering) || preact_module_r)(preact_module_P);
    }
    function preact_module_P() {
      var n, u, t, o, r, e, c, s;
      for (preact_module_i.sort(preact_module_f); n = preact_module_i.shift(); ) n.__d && (u = preact_module_i.length, 
      o = void 0, e = (r = (t = n).__v).__e, c = [], s = [], t.__P && ((o = preact_module_d({}, r)).__v = r.__v + 1, 
      preact_module_l.vnode && preact_module_l.vnode(o), O(t.__P, o, r, t.__n, t.__P.namespaceURI, 32 & r.__u ? [ e ] : null, c, null == e ? preact_module_x(r) : e, !!(32 & r.__u), s), 
      o.__v = r.__v, o.__.__k[o.__i] = o, j(c, o, s), o.__e != e && preact_module_C(o)), 
      preact_module_i.length > u && preact_module_i.sort(preact_module_f));
      preact_module_P.__r = 0;
    }
    function preact_module_S(n, l, u, t, i, o, r, f, e, c, s) {
      var a, p, y, d, w, _ = t && t.__k || preact_module_v, g = l.length;
      for (u.__d = e, preact_module_$(u, l, _), e = u.__d, a = 0; a < g; a++) null != (y = u.__k[a]) && (p = -1 === y.__i ? preact_module_h : _[y.__i] || preact_module_h, 
      y.__i = a, O(n, y, p, i, o, r, f, e, c, s), d = y.__e, y.ref && p.ref != y.ref && (p.ref && N(p.ref, null, y), 
      s.push(y.ref, y.__c || d, y)), null == w && null != d && (w = d), 65536 & y.__u || p.__k === y.__k ? e = preact_module_I(y, e, n) : "function" == typeof y.type && void 0 !== y.__d ? e = y.__d : d && (e = d.nextSibling), 
      y.__d = void 0, y.__u &= -196609);
      u.__d = e, u.__e = w;
    }
    function preact_module_$(n, l, u) {
      var t, i, o, r, f, e = l.length, c = u.length, s = c, a = 0;
      for (n.__k = [], t = 0; t < e; t++) null != (i = l[t]) && "boolean" != typeof i && "function" != typeof i ? (r = t + a, 
      (i = n.__k[t] = "string" == typeof i || "number" == typeof i || "bigint" == typeof i || i.constructor == String ? preact_module_g(null, i, null, null, null) : preact_module_y(i) ? preact_module_g(preact_module_b, {
        children: i
      }, null, null, null) : void 0 === i.constructor && i.__b > 0 ? preact_module_g(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i).__ = n, 
      i.__b = n.__b + 1, o = null, -1 !== (f = i.__i = preact_module_L(i, u, r, s)) && (s--, 
      (o = u[f]) && (o.__u |= 131072)), null == o || null === o.__v ? (-1 == f && a--, 
      "function" != typeof i.type && (i.__u |= 65536)) : f !== r && (f == r - 1 ? a-- : f == r + 1 ? a++ : (f > r ? a-- : a++, 
      i.__u |= 65536))) : i = n.__k[t] = null;
      if (s) for (t = 0; t < c; t++) null != (o = u[t]) && 0 == (131072 & o.__u) && (o.__e == n.__d && (n.__d = preact_module_x(o)), 
      V(o, o));
    }
    function preact_module_I(n, l, u) {
      var t, i;
      if ("function" == typeof n.type) {
        for (t = n.__k, i = 0; t && i < t.length; i++) t[i] && (t[i].__ = n, l = preact_module_I(t[i], l, u));
        return l;
      }
      n.__e != l && (l && n.type && !u.contains(l) && (l = preact_module_x(n)), u.insertBefore(n.__e, l || null), 
      l = n.__e);
      do {
        l = l && l.nextSibling;
      } while (null != l && 8 === l.nodeType);
      return l;
    }
    function preact_module_H(n, l) {
      return l = l || [], null == n || "boolean" == typeof n || (preact_module_y(n) ? n.some((function(n) {
        preact_module_H(n, l);
      })) : l.push(n)), l;
    }
    function preact_module_L(n, l, u, t) {
      var i = n.key, o = n.type, r = u - 1, f = u + 1, e = l[u];
      if (null === e || e && i == e.key && o === e.type && 0 == (131072 & e.__u)) return u;
      if (t > (null != e && 0 == (131072 & e.__u) ? 1 : 0)) for (;r >= 0 || f < l.length; ) {
        if (r >= 0) {
          if ((e = l[r]) && 0 == (131072 & e.__u) && i == e.key && o === e.type) return r;
          r--;
        }
        if (f < l.length) {
          if ((e = l[f]) && 0 == (131072 & e.__u) && i == e.key && o === e.type) return f;
          f++;
        }
      }
      return -1;
    }
    function preact_module_T(n, l, u) {
      "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || preact_module_p.test(l) ? u : u + "px";
    }
    function A(n, l, u, t, i) {
      var o;
      n: if ("style" === l) if ("string" == typeof u) n.style.cssText = u; else {
        if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || preact_module_T(n.style, l, "");
        if (u) for (l in u) t && u[l] === t[l] || preact_module_T(n.style, l, u[l]);
      } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/(PointerCapture)$|Capture$/i, "$1")), 
      l = l.toLowerCase() in n || "onFocusOut" === l || "onFocusIn" === l ? l.toLowerCase().slice(2) : l.slice(2), 
      n.l || (n.l = {}), n.l[l + o] = u, u ? t ? u.u = t.u : (u.u = preact_module_e, n.addEventListener(l, o ? preact_module_s : preact_module_c, o)) : n.removeEventListener(l, o ? preact_module_s : preact_module_c, o); else {
        if ("http://www.w3.org/2000/svg" == i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s"); else if ("width" != l && "height" != l && "href" != l && "list" != l && "form" != l && "tabIndex" != l && "download" != l && "rowSpan" != l && "colSpan" != l && "role" != l && "popover" != l && l in n) try {
          n[l] = null == u ? "" : u;
          break n;
        } catch (n) {}
        "function" == typeof u || (null == u || !1 === u && "-" !== l[4] ? n.removeAttribute(l) : n.setAttribute(l, "popover" == l && 1 == u ? "" : u));
      }
    }
    function F(n) {
      return function(u) {
        if (this.l) {
          var t = this.l[u.type + n];
          if (null == u.t) u.t = preact_module_e++; else if (u.t < t.u) return;
          return t(preact_module_l.event ? preact_module_l.event(u) : u);
        }
      };
    }
    function O(n, u, t, i, o, r, f, e, c, s) {
      var a, h, v, p, w, _, g, m, x, C, M, P, $, I, H, L, T = u.type;
      if (void 0 !== u.constructor) return null;
      128 & t.__u && (c = !!(32 & t.__u), r = [ e = u.__e = t.__e ]), (a = preact_module_l.__b) && a(u);
      n: if ("function" == typeof T) try {
        if (m = u.props, x = "prototype" in T && T.prototype.render, C = (a = T.contextType) && i[a.__c], 
        M = a ? C ? C.props.value : a.__ : i, t.__c ? g = (h = u.__c = t.__c).__ = h.__E : (x ? u.__c = h = new T(m, M) : (u.__c = h = new preact_module_k(m, M), 
        h.constructor = T, h.render = preact_module_q), C && C.sub(h), h.props = m, h.state || (h.state = {}), 
        h.context = M, h.__n = i, v = h.__d = !0, h.__h = [], h._sb = []), x && null == h.__s && (h.__s = h.state), 
        x && null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = preact_module_d({}, h.__s)), 
        preact_module_d(h.__s, T.getDerivedStateFromProps(m, h.__s))), p = h.props, w = h.state, 
        h.__v = u, v) x && null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), 
        x && null != h.componentDidMount && h.__h.push(h.componentDidMount); else {
          if (x && null == T.getDerivedStateFromProps && m !== p && null != h.componentWillReceiveProps && h.componentWillReceiveProps(m, M), 
          !h.__e && (null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, M) || u.__v === t.__v)) {
            for (u.__v !== t.__v && (h.props = m, h.state = h.__s, h.__d = !1), u.__e = t.__e, 
            u.__k = t.__k, u.__k.some((function(n) {
              n && (n.__ = u);
            })), P = 0; P < h._sb.length; P++) h.__h.push(h._sb[P]);
            h._sb = [], h.__h.length && f.push(h);
            break n;
          }
          null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, M), x && null != h.componentDidUpdate && h.__h.push((function() {
            h.componentDidUpdate(p, w, _);
          }));
        }
        if (h.context = M, h.props = m, h.__P = n, h.__e = !1, $ = preact_module_l.__r, 
        I = 0, x) {
          for (h.state = h.__s, h.__d = !1, $ && $(u), a = h.render(h.props, h.state, h.context), 
          H = 0; H < h._sb.length; H++) h.__h.push(h._sb[H]);
          h._sb = [];
        } else do {
          h.__d = !1, $ && $(u), a = h.render(h.props, h.state, h.context), h.state = h.__s;
        } while (h.__d && ++I < 25);
        h.state = h.__s, null != h.getChildContext && (i = preact_module_d(preact_module_d({}, i), h.getChildContext())), 
        x && !v && null != h.getSnapshotBeforeUpdate && (_ = h.getSnapshotBeforeUpdate(p, w)), 
        preact_module_S(n, preact_module_y(L = null != a && a.type === preact_module_b && null == a.key ? a.props.children : a) ? L : [ L ], u, t, i, o, r, f, e, c, s), 
        h.base = u.__e, u.__u &= -161, h.__h.length && f.push(h), g && (h.__E = h.__ = null);
      } catch (n) {
        if (u.__v = null, c || null != r) {
          for (u.__u |= c ? 160 : 32; e && 8 === e.nodeType && e.nextSibling; ) e = e.nextSibling;
          r[r.indexOf(e)] = null, u.__e = e;
        } else u.__e = t.__e, u.__k = t.__k;
        preact_module_l.__e(n, u, t);
      } else null == r && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = z(t.__e, u, t, i, o, r, f, c, s);
      (a = preact_module_l.diffed) && a(u);
    }
    function j(n, u, t) {
      u.__d = void 0;
      for (var i = 0; i < t.length; i++) N(t[i], t[++i], t[++i]);
      preact_module_l.__c && preact_module_l.__c(u, n), n.some((function(u) {
        try {
          n = u.__h, u.__h = [], n.some((function(n) {
            n.call(u);
          }));
        } catch (n) {
          preact_module_l.__e(n, u.__v);
        }
      }));
    }
    function z(u, t, i, o, r, f, e, c, s) {
      var a, v, p, d, _, g, m, b = i.props, k = t.props, C = t.type;
      if ("svg" === C ? r = "http://www.w3.org/2000/svg" : "math" === C ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), 
      null != f) for (a = 0; a < f.length; a++) if ((_ = f[a]) && "setAttribute" in _ == !!C && (C ? _.localName === C : 3 === _.nodeType)) {
        u = _, f[a] = null;
        break;
      }
      if (null == u) {
        if (null === C) return document.createTextNode(k);
        u = document.createElementNS(r, C, k.is && k), c && (preact_module_l.__m && preact_module_l.__m(t, f), 
        c = !1), f = null;
      }
      if (null === C) b === k || c && u.data === k || (u.data = k); else {
        if (f = f && preact_module_n.call(u.childNodes), b = i.props || preact_module_h, 
        !c && null != f) for (b = {}, a = 0; a < u.attributes.length; a++) b[(_ = u.attributes[a]).name] = _.value;
        for (a in b) if (_ = b[a], "children" == a) ; else if ("dangerouslySetInnerHTML" == a) p = _; else if (!(a in k)) {
          if ("value" == a && "defaultValue" in k || "checked" == a && "defaultChecked" in k) continue;
          A(u, a, null, _, r);
        }
        for (a in k) _ = k[a], "children" == a ? d = _ : "dangerouslySetInnerHTML" == a ? v = _ : "value" == a ? g = _ : "checked" == a ? m = _ : c && "function" != typeof _ || b[a] === _ || A(u, a, _, b[a], r);
        if (v) c || p && (v.__html === p.__html || v.__html === u.innerHTML) || (u.innerHTML = v.__html), 
        t.__k = []; else if (p && (u.innerHTML = ""), preact_module_S(u, preact_module_y(d) ? d : [ d ], t, i, o, "foreignObject" === C ? "http://www.w3.org/1999/xhtml" : r, f, e, f ? f[0] : i.__k && preact_module_x(i, 0), c, s), 
        null != f) for (a = f.length; a--; ) preact_module_w(f[a]);
        c || (a = "value", "progress" === C && null == g ? u.removeAttribute("value") : void 0 !== g && (g !== u[a] || "progress" === C && !g || "option" === C && g !== b[a]) && A(u, a, g, b[a], r), 
        a = "checked", void 0 !== m && m !== u[a] && A(u, a, m, b[a], r));
      }
      return u;
    }
    function N(n, u, t) {
      try {
        if ("function" == typeof n) {
          var i = "function" == typeof n.__u;
          i && n.__u(), i && null == u || (n.__u = n(u));
        } else n.current = u;
      } catch (n) {
        preact_module_l.__e(n, t);
      }
    }
    function V(n, u, t) {
      var i, o;
      if (preact_module_l.unmount && preact_module_l.unmount(n), (i = n.ref) && (i.current && i.current !== n.__e || N(i, null, u)), 
      null != (i = n.__c)) {
        if (i.componentWillUnmount) try {
          i.componentWillUnmount();
        } catch (n) {
          preact_module_l.__e(n, u);
        }
        i.base = i.__P = null;
      }
      if (i = n.__k) for (o = 0; o < i.length; o++) i[o] && V(i[o], u, t || "function" != typeof n.type);
      t || preact_module_w(n.__e), n.__c = n.__ = n.__e = n.__d = void 0;
    }
    function preact_module_q(n, l, u) {
      return this.constructor(n, u);
    }
    function B(u, t, i) {
      var o, r, f, e;
      preact_module_l.__ && preact_module_l.__(u, t), r = (o = "function" == typeof i) ? null : i && i.__k || t.__k, 
      f = [], e = [], O(t, u = (!o && i || t).__k = preact_module_(preact_module_b, null, [ u ]), r || preact_module_h, preact_module_h, t.namespaceURI, !o && i ? [ i ] : r ? null : t.firstChild ? preact_module_n.call(t.childNodes) : null, f, !o && i ? i : r ? r.__e : t.firstChild, o, e), 
      j(f, u, e);
    }
    function G(n, l) {
      var u = {
        __c: l = "__cC" + preact_module_a++,
        __: n,
        Consumer: function(n, l) {
          return n.children(l);
        },
        Provider: function(n) {
          var u, t;
          return this.getChildContext || (u = [], (t = {})[l] = this, this.getChildContext = function() {
            return t;
          }, this.componentWillUnmount = function() {
            u = null;
          }, this.shouldComponentUpdate = function(n) {
            this.props.value !== n.value && u.some((function(n) {
              n.__e = !0, preact_module_M(n);
            }));
          }, this.sub = function(n) {
            u.push(n);
            var l = n.componentWillUnmount;
            n.componentWillUnmount = function() {
              u && u.splice(u.indexOf(n), 1), l && l.call(n);
            };
          }), n.children;
        }
      };
      return u.Provider.__ = u.Consumer.contextType = u;
    }
    preact_module_n = preact_module_v.slice, preact_module_l = {
      __e: function(n, l, u, t) {
        for (var i, o, r; l = l.__; ) if ((i = l.__c) && !i.__) try {
          if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(n)), 
          r = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), r = i.__d), 
          r) return i.__E = i;
        } catch (l) {
          n = l;
        }
        throw n;
      }
    }, preact_module_u = 0, preact_module_k.prototype.setState = function(n, l) {
      var u;
      u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = preact_module_d({}, this.state), 
      "function" == typeof n && (n = n(preact_module_d({}, u), this.props)), n && preact_module_d(u, n), 
      null != n && this.__v && (l && this._sb.push(l), preact_module_M(this));
    }, preact_module_k.prototype.forceUpdate = function(n) {
      this.__v && (this.__e = !0, n && this.__h.push(n), preact_module_M(this));
    }, preact_module_k.prototype.render = preact_module_b, preact_module_i = [], preact_module_r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
    preact_module_f = function(n, l) {
      return n.__v.__b - l.__v.__b;
    }, preact_module_P.__r = 0, preact_module_e = 0, preact_module_c = F(!1), preact_module_s = F(!0), 
    preact_module_a = 0;
    // CONCATENATED MODULE: ./node_modules/.pnpm/preact@10.24.2/node_modules/preact/hooks/dist/hooks.module.js
    var hooks_module_t, hooks_module_r, hooks_module_u, hooks_module_i, hooks_module_o = 0, hooks_module_f = [], hooks_module_c = preact_module_l, hooks_module_e = hooks_module_c.__b, hooks_module_a = hooks_module_c.__r, hooks_module_v = hooks_module_c.diffed, hooks_module_l = hooks_module_c.__c, hooks_module_m = hooks_module_c.unmount, hooks_module_s = hooks_module_c.__;
    function hooks_module_d(n, t) {
      hooks_module_c.__h && hooks_module_c.__h(hooks_module_r, n, hooks_module_o || t), 
      hooks_module_o = 0;
      var u = hooks_module_r.__H || (hooks_module_r.__H = {
        __: [],
        __h: []
      });
      return n >= u.__.length && u.__.push({}), u.__[n];
    }
    function hooks_module_h(n) {
      return hooks_module_o = 1, hooks_module_p(hooks_module_D, n);
    }
    function hooks_module_p(n, u, i) {
      var o = hooks_module_d(hooks_module_t++, 2);
      if (o.t = n, !o.__c && (o.__ = [ i ? i(u) : hooks_module_D(void 0, u), function(n) {
        var t = o.__N ? o.__N[0] : o.__[0], r = o.t(t, n);
        t !== r && (o.__N = [ r, o.__[1] ], o.__c.setState({}));
      } ], o.__c = hooks_module_r, !hooks_module_r.u)) {
        var f = function(n, t, r) {
          if (!o.__c.__H) return !0;
          var u = o.__c.__H.__.filter((function(n) {
            return !!n.__c;
          }));
          if (u.every((function(n) {
            return !n.__N;
          }))) return !c || c.call(this, n, t, r);
          var i = !1;
          return u.forEach((function(n) {
            if (n.__N) {
              var t = n.__[0];
              n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = !0);
            }
          })), !(!i && o.__c.props === n) && (!c || c.call(this, n, t, r));
        };
        hooks_module_r.u = !0;
        var c = hooks_module_r.shouldComponentUpdate, e = hooks_module_r.componentWillUpdate;
        hooks_module_r.componentWillUpdate = function(n, t, r) {
          if (this.__e) {
            var u = c;
            c = void 0, f(n, t, r), c = u;
          }
          e && e.call(this, n, t, r);
        }, hooks_module_r.shouldComponentUpdate = f;
      }
      return o.__N || o.__;
    }
    function hooks_module_y(n, u) {
      var i = hooks_module_d(hooks_module_t++, 3);
      !hooks_module_c.__s && hooks_module_C(i.__H, u) && (i.__ = n, i.i = u, hooks_module_r.__H.__h.push(i));
    }
    function hooks_module_(n, u) {
      var i = hooks_module_d(hooks_module_t++, 4);
      !hooks_module_c.__s && hooks_module_C(i.__H, u) && (i.__ = n, i.i = u, hooks_module_r.__h.push(i));
    }
    function hooks_module_A(n) {
      return hooks_module_o = 5, hooks_module_T((function() {
        return {
          current: n
        };
      }), []);
    }
    function hooks_module_T(n, r) {
      var u = hooks_module_d(hooks_module_t++, 7);
      return hooks_module_C(u.__H, r) && (u.__ = n(), u.__H = r, u.__h = n), u.__;
    }
    function hooks_module_q(n, t) {
      return hooks_module_o = 8, hooks_module_T((function() {
        return n;
      }), t);
    }
    function hooks_module_x(n) {
      var u = hooks_module_r.context[n.__c], i = hooks_module_d(hooks_module_t++, 9);
      return i.c = n, u ? (null == i.__ && (i.__ = !0, u.sub(hooks_module_r)), u.props.value) : n.__;
    }
    function hooks_module_j() {
      for (var n; n = hooks_module_f.shift(); ) if (n.__P && n.__H) try {
        n.__H.__h.forEach(hooks_module_z), n.__H.__h.forEach(hooks_module_B), n.__H.__h = [];
      } catch (t) {
        n.__H.__h = [], hooks_module_c.__e(t, n.__v);
      }
    }
    hooks_module_c.__b = function(n) {
      hooks_module_r = null, hooks_module_e && hooks_module_e(n);
    }, hooks_module_c.__ = function(n, t) {
      n && t.__k && t.__k.__m && (n.__m = t.__k.__m), hooks_module_s && hooks_module_s(n, t);
    }, hooks_module_c.__r = function(n) {
      hooks_module_a && hooks_module_a(n), hooks_module_t = 0;
      var i = (hooks_module_r = n.__c).__H;
      i && (hooks_module_u === hooks_module_r ? (i.__h = [], hooks_module_r.__h = [], 
      i.__.forEach((function(n) {
        n.__N && (n.__ = n.__N), n.i = n.__N = void 0;
      }))) : (i.__h.forEach(hooks_module_z), i.__h.forEach(hooks_module_B), i.__h = [], 
      hooks_module_t = 0)), hooks_module_u = hooks_module_r;
    }, hooks_module_c.diffed = function(n) {
      hooks_module_v && hooks_module_v(n);
      var t = n.__c;
      t && t.__H && (t.__H.__h.length && (1 !== hooks_module_f.push(t) && hooks_module_i === hooks_module_c.requestAnimationFrame || ((hooks_module_i = hooks_module_c.requestAnimationFrame) || hooks_module_w)(hooks_module_j)), 
      t.__H.__.forEach((function(n) {
        n.i && (n.__H = n.i), n.i = void 0;
      }))), hooks_module_u = hooks_module_r = null;
    }, hooks_module_c.__c = function(n, t) {
      t.some((function(n) {
        try {
          n.__h.forEach(hooks_module_z), n.__h = n.__h.filter((function(n) {
            return !n.__ || hooks_module_B(n);
          }));
        } catch (r) {
          t.some((function(n) {
            n.__h && (n.__h = []);
          })), t = [], hooks_module_c.__e(r, n.__v);
        }
      })), hooks_module_l && hooks_module_l(n, t);
    }, hooks_module_c.unmount = function(n) {
      hooks_module_m && hooks_module_m(n);
      var t, r = n.__c;
      r && r.__H && (r.__H.__.forEach((function(n) {
        try {
          hooks_module_z(n);
        } catch (n) {
          t = n;
        }
      })), r.__H = void 0, t && hooks_module_c.__e(t, r.__v));
    };
    var hooks_module_k = "function" == typeof requestAnimationFrame;
    function hooks_module_w(n) {
      var t, r = function() {
        clearTimeout(u), hooks_module_k && cancelAnimationFrame(t), setTimeout(n);
      }, u = setTimeout(r, 100);
      hooks_module_k && (t = requestAnimationFrame(r));
    }
    function hooks_module_z(n) {
      var t = hooks_module_r, u = n.__c;
      "function" == typeof u && (n.__c = void 0, u()), hooks_module_r = t;
    }
    function hooks_module_B(n) {
      var t = hooks_module_r;
      n.__c = n.__(), hooks_module_r = t;
    }
    function hooks_module_C(n, t) {
      return !n || n.length !== t.length || t.some((function(t, r) {
        return t !== n[r];
      }));
    }
    function hooks_module_D(n, t) {
      return "function" == typeof t ? t(n) : t;
    }
    // CONCATENATED MODULE: ./node_modules/.pnpm/preact@10.24.2/node_modules/preact/compat/dist/compat.module.js
    function compat_module_g(n, t) {
      for (var e in n) if ("__source" !== e && !(e in t)) return !0;
      for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;
      return !1;
    }
    function compat_module_E(n, t) {
      this.props = n, this.context = t;
    }
    function compat_module_C(n, e) {
      function r(n) {
        var t = this.props.ref, r = t == n.ref;
        return !r && t && (t.call ? t(null) : t.current = null), e ? !e(this.props, n) || !r : compat_module_g(this.props, n);
      }
      function u(e) {
        return this.shouldComponentUpdate = r, t(n, e);
      }
      return u.displayName = "Memo(" + (n.displayName || n.name) + ")", u.prototype.isReactComponent = !0, 
      u.__f = !0, u;
    }
    (compat_module_E.prototype = new preact_module_k).isPureReactComponent = !0, compat_module_E.prototype.shouldComponentUpdate = function(n, t) {
      return compat_module_g(this.props, n) || compat_module_g(this.state, t);
    };
    var compat_module_x = preact_module_l.__b;
    preact_module_l.__b = function(n) {
      n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), compat_module_x && compat_module_x(n);
    };
    var R = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    function compat_module_w(n) {
      function t(t) {
        if (!("ref" in t)) return n(t, null);
        var e = t.ref;
        delete t.ref;
        var r = n(t, e);
        return t.ref = e, r;
      }
      return t.$$typeof = R, t.render = t, t.prototype.isReactComponent = t.__f = !0, 
      t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
    }
    var compat_module_k = function(n, t) {
      return null == n ? null : r(r(n).map(t));
    }, compat_module_I = /* unused pure expression or super */ null && {
      map: compat_module_k,
      forEach: compat_module_k,
      count: function(n) {
        return n ? r(n).length : 0;
      },
      only: function(n) {
        var t = r(n);
        if (1 !== t.length) throw "Children.only";
        return t[0];
      },
      toArray: r
    }, compat_module_N = preact_module_l.__e;
    preact_module_l.__e = function(n, t, e, r) {
      if (n.then) for (var u, o = t; o = o.__; ) if ((u = o.__c) && u.__c) return null == t.__e && (t.__e = e.__e, 
      t.__k = e.__k), u.__c(n, t);
      compat_module_N(n, t, e, r);
    };
    var compat_module_M = preact_module_l.unmount;
    function compat_module_T(n, t, e) {
      return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach((function(n) {
        "function" == typeof n.__c && n.__c();
      })), n.__c.__H = null), null != (n = function(n, t) {
        for (var e in t) n[e] = t[e];
        return n;
      }({}, n)).__c && (n.__c.__P === e && (n.__c.__P = t), n.__c = null), n.__k = n.__k && n.__k.map((function(n) {
        return compat_module_T(n, t, e);
      }))), n;
    }
    function compat_module_A(n, t, e) {
      return n && e && (n.__v = null, n.__k = n.__k && n.__k.map((function(n) {
        return compat_module_A(n, t, e);
      })), n.__c && n.__c.__P === t && (n.__e && e.appendChild(n.__e), n.__c.__e = !0, 
      n.__c.__P = e)), n;
    }
    function compat_module_D() {
      this.__u = 0, this.t = null, this.__b = null;
    }
    function compat_module_L(n) {
      var t = n.__.__c;
      return t && t.__a && t.__a(n);
    }
    function compat_module_O(n) {
      var e, r, u;
      function o(o) {
        if (e || n().then((function(n) {
          n.default || n;
        }), (function(n) {
          0;
        })), u) throw u;
        if (!r) throw e;
        return t(r, o);
      }
      return o.displayName = "Lazy", o.__f = !0, o;
    }
    function compat_module_F() {
      this.u = null, this.o = null;
    }
    preact_module_l.unmount = function(n) {
      var t = n.__c;
      t && t.__R && t.__R(), t && 32 & n.__u && (n.type = null), compat_module_M && compat_module_M(n);
    }, (compat_module_D.prototype = new preact_module_k).__c = function(n, t) {
      var e = t.__c, r = this;
      null == r.t && (r.t = []), r.t.push(e);
      var u = compat_module_L(r.__v), o = !1, i = function() {
        o || (o = !0, e.__R = null, u ? u(c) : c());
      };
      e.__R = i;
      var c = function() {
        if (! --r.__u) {
          if (r.state.__a) {
            var n = r.state.__a;
            r.__v.__k[0] = compat_module_A(n, n.__c.__P, n.__c.__O);
          }
          var t;
          for (r.setState({
            __a: r.__b = null
          }); t = r.t.pop(); ) t.forceUpdate();
        }
      };
      r.__u++ || 32 & t.__u || r.setState({
        __a: r.__b = r.__v.__k[0]
      }), n.then(i, i);
    }, compat_module_D.prototype.componentWillUnmount = function() {
      this.t = [];
    }, compat_module_D.prototype.render = function(n, e) {
      if (this.__b) {
        if (this.__v.__k) {
          var r = document.createElement("div"), o = this.__v.__k[0].__c;
          this.__v.__k[0] = compat_module_T(this.__b, r, o.__O = o.__P);
        }
        this.__b = null;
      }
      var i = e.__a && preact_module_(preact_module_b, null, n.fallback);
      return i && (i.__u &= -33), [ preact_module_(preact_module_b, null, e.__a ? null : n.children), i ];
    };
    var U = function(n, t, e) {
      if (++e[1] === e[0] && n.o.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size)) for (e = n.u; e; ) {
        for (;e.length > 3; ) e.pop()();
        if (e[1] < e[0]) break;
        n.u = e = e[2];
      }
    };
    function compat_module_V(n) {
      return this.getChildContext = function() {
        return n.context;
      }, n.children;
    }
    function W(n) {
      var e = this, r = n.i;
      e.componentWillUnmount = function() {
        o(null, e.l), e.l = null, e.i = null;
      }, e.i && e.i !== r && e.componentWillUnmount(), e.l || (e.i = r, e.l = {
        nodeType: 1,
        parentNode: r,
        childNodes: [],
        contains: function() {
          return !0;
        },
        appendChild: function(n) {
          this.childNodes.push(n), e.i.appendChild(n);
        },
        insertBefore: function(n, t) {
          this.childNodes.push(n), e.i.appendChild(n);
        },
        removeChild: function(n) {
          this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), e.i.removeChild(n);
        }
      }), o(t(compat_module_V, {
        context: e.context
      }, n.__v), e.l);
    }
    function compat_module_P(n, e) {
      var r = t(W, {
        __v: n,
        i: e
      });
      return r.containerInfo = e, r;
    }
    (compat_module_F.prototype = new preact_module_k).__a = function(n) {
      var t = this, e = compat_module_L(t.__v), r = t.o.get(n);
      return r[0]++, function(u) {
        var o = function() {
          t.props.revealOrder ? (r.push(u), U(t, n, r)) : u();
        };
        e ? e(o) : o();
      };
    }, compat_module_F.prototype.render = function(n) {
      this.u = null, this.o = new Map;
      var t = preact_module_H(n.children);
      n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
      for (var e = t.length; e--; ) this.o.set(t[e], this.u = [ 1, 0, this.u ]);
      return n.children;
    }, compat_module_F.prototype.componentDidUpdate = compat_module_F.prototype.componentDidMount = function() {
      var n = this;
      this.o.forEach((function(t, e) {
        U(n, e, t);
      }));
    };
    var compat_module_j = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, compat_module_z = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, compat_module_B = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, compat_module_H = /[A-Z0-9]/g, Z = "undefined" != typeof document, Y = function(n) {
      return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
    };
    function compat_module_$(n, t, e) {
      return null == t.__k && (t.textContent = ""), o(n, t), "function" == typeof e && e(), 
      n ? n.__c : null;
    }
    function compat_module_q(n, t, e) {
      return i(n, t), "function" == typeof e && e(), n ? n.__c : null;
    }
    preact_module_k.prototype.isReactComponent = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach((function(t) {
      Object.defineProperty(preact_module_k.prototype, t, {
        configurable: !0,
        get: function() {
          return this["UNSAFE_" + t];
        },
        set: function(n) {
          Object.defineProperty(this, t, {
            configurable: !0,
            writable: !0,
            value: n
          });
        }
      });
    }));
    var compat_module_G = preact_module_l.event;
    function J() {}
    function K() {
      return this.cancelBubble;
    }
    function Q() {
      return this.defaultPrevented;
    }
    preact_module_l.event = function(n) {
      return compat_module_G && (n = compat_module_G(n)), n.persist = J, n.isPropagationStopped = K, 
      n.isDefaultPrevented = Q, n.nativeEvent = n;
    };
    var X, nn = {
      enumerable: !1,
      configurable: !0,
      get: function() {
        return this.class;
      }
    }, tn = preact_module_l.vnode;
    preact_module_l.vnode = function(n) {
      "string" == typeof n.type && function(n) {
        var t = n.props, e = n.type, u = {}, o = -1 === e.indexOf("-");
        for (var i in t) {
          var c = t[i];
          if (!("value" === i && "defaultValue" in t && null == c || Z && "children" === i && "noscript" === e || "class" === i || "className" === i)) {
            var f = i.toLowerCase();
            "defaultValue" === i && "value" in t && null == t.value ? i = "value" : "download" === i && !0 === c ? c = "" : "translate" === f && "no" === c ? c = !1 : "o" === f[0] && "n" === f[1] ? "ondoubleclick" === f ? i = "ondblclick" : "onchange" !== f || "input" !== e && "textarea" !== e || Y(t.type) ? "onfocus" === f ? i = "onfocusin" : "onblur" === f ? i = "onfocusout" : compat_module_B.test(i) && (i = f) : f = i = "oninput" : o && compat_module_z.test(i) ? i = i.replace(compat_module_H, "-$&").toLowerCase() : null === c && (c = void 0), 
            "oninput" === f && u[i = f] && (i = "oninputCapture"), u[i] = c;
          }
        }
        "select" == e && u.multiple && Array.isArray(u.value) && (u.value = preact_module_H(t.children).forEach((function(n) {
          n.props.selected = -1 != u.value.indexOf(n.props.value);
        }))), "select" == e && null != u.defaultValue && (u.value = preact_module_H(t.children).forEach((function(n) {
          n.props.selected = u.multiple ? -1 != u.defaultValue.indexOf(n.props.value) : u.defaultValue == n.props.value;
        }))), t.class && !t.className ? (u.class = t.class, Object.defineProperty(u, "className", nn)) : (t.className && !t.class || t.class && t.className) && (u.class = u.className = t.className), 
        n.props = u;
      }(n), n.$$typeof = compat_module_j, tn && tn(n);
    };
    var en = preact_module_l.__r;
    preact_module_l.__r = function(n) {
      en && en(n), X = n.__c;
    };
    var rn = preact_module_l.diffed;
    preact_module_l.diffed = function(n) {
      rn && rn(n);
      var t = n.props, e = n.__e;
      null != e && "textarea" === n.type && "value" in t && t.value !== e.value && (e.value = null == t.value ? "" : t.value), 
      X = null;
    };
    var un = /* unused pure expression or super */ null && {
      ReactCurrentDispatcher: {
        current: {
          readContext: function(n) {
            return X.__n[n.__c].props.value;
          },
          useCallback: a,
          useContext: s,
          useDebugValue: h,
          useDeferredValue: _n,
          useEffect: v,
          useId: d,
          useImperativeHandle: p,
          useInsertionEffect: Sn,
          useLayoutEffect: m,
          useMemo: y,
          useReducer: _,
          useRef: b,
          useState: S,
          useSyncExternalStore: En,
          useTransition: bn
        }
      }
    };
    function cn(n) {
      return t.bind(null, n);
    }
    function compat_module_fn(n) {
      return !!n && n.$$typeof === compat_module_j;
    }
    function ln(n) {
      return compat_module_fn(n) && n.type === u;
    }
    function an(n) {
      return !!n && !!n.displayName && ("string" == typeof n.displayName || n.displayName instanceof String) && n.displayName.startsWith("Memo(");
    }
    function sn(n) {
      return compat_module_fn(n) ? l.apply(null, arguments) : n;
    }
    function hn(n) {
      return !!n.__k && (o(null, n), !0);
    }
    function vn(n) {
      return n && (n.base || 1 === n.nodeType && n) || null;
    }
    var dn = function(n, t) {
      return n(t);
    }, pn = function(n, t) {
      return n(t);
    }, mn = /* unused pure expression or super */ null && u;
    function yn(n) {
      n();
    }
    function _n(n) {
      return n;
    }
    function bn() {
      return [ !1, yn ];
    }
    var Sn = /* unused pure expression or super */ null && m, gn = /* unused pure expression or super */ null && compat_module_fn;
    function En(n, t) {
      var e = t(), r = S({
        h: {
          __: e,
          v: t
        }
      }), u = r[0].h, o = r[1];
      return m((function() {
        u.__ = e, u.v = t, Cn(u) && o({
          h: u
        });
      }), [ n, e, t ]), v((function() {
        return Cn(u) && o({
          h: u
        }), n((function() {
          Cn(u) && o({
            h: u
          });
        }));
      }), [ n ]), e;
    }
    function Cn(n) {
      var t, e, r = n.v, u = n.__;
      try {
        var o = r();
        return !((t = u) === (e = o) && (0 !== t || 1 / t == 1 / e) || t != t && e != e);
      } catch (n) {
        return !0;
      }
    }
    /* unused pure expression or super */ null && (S, d, _, v, m, b, p, y, a, s, h, 
    t, c, f, u, n);
    var jsxRuntime_module_f = 0;
    Array.isArray;
    function jsxRuntime_module_u(e, t, n, o, i, u) {
      t || (t = {});
      var a, c, l = t;
      "ref" in t && (a = t.ref, delete t.ref);
      var p = {
        type: e,
        props: l,
        key: n,
        ref: a,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: --jsxRuntime_module_f,
        __i: -1,
        __u: 0,
        __source: i,
        __self: u
      };
      if ("function" == typeof e && (a = e.defaultProps)) for (c in a) void 0 === l[c] && (l[c] = a[c]);
      return preact_module_l.vnode && preact_module_l.vnode(p), p;
    }
    // CONCATENATED MODULE: ./src/utils/classes.ts
    function classes_classes(...classNames) {
      return classNames.filter(Boolean).join(" ");
    }
    // CONCATENATED MODULE: ./src/common/i18n.tsx
    const contextValue = {
      t: browser_polyfill_default().i18n.getMessage.bind(browser_polyfill_default().i18n),
      langTag: browser_polyfill_default().i18n.getMessage("lang_tag")
    };
    const i18nContext = G(contextValue);
    function useLocale() {
      return hooks_module_x(i18nContext);
    }
    // CONCATENATED MODULE: ./src/content/popup/FrequencyIndicator.tsx
    function FrequencyIndicator(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u("div", {
        class: "tp-flex tp-gap-1.5 tp-items-center tp-text-smish",
        children: [ 
         jsxRuntime_module_u("svg", {
          class: "tp-block tp-h-[12px] tp-w-[12px] tp-fill-current",
          role: "presentation",
          viewBox: "0 0 8 8",
          children: [ 
           jsxRuntime_module_u("rect", {
            x: "0",
            y: "5",
            width: "2",
            height: "3",
            rx: "0.5",
            ry: "0.5",
            opacity: !props.frequency ? "0.5" : void 0
          }), 
           jsxRuntime_module_u("rect", {
            x: "3",
            y: "3",
            width: "2",
            height: "5",
            rx: "0.5",
            ry: "0.5",
            opacity: !props.frequency || props.frequency >= 2500 * 2 / 3 ? "0.5" : void 0
          }), 
           jsxRuntime_module_u("rect", {
            x: "6",
            width: "2",
            height: "8",
            rx: "0.5",
            ry: "0.5",
            opacity: !props.frequency || props.frequency >= 2500 / 3 ? "0.5" : void 0
          }) ]
        }), 
         jsxRuntime_module_u("span", {
          children: props.frequency ?  jsxRuntime_module_u(preact_module_b, {
            children: [ `${t("content_kanji_frequency_label")} ${props.frequency.toLocaleString()}`
             , jsxRuntime_module_u("span", {
              class: "tp-text-xs",
              children: [ " / ", Number(2500).toLocaleString() ]
            }) ]
          }) : "-"
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/GradeIndicator.tsx
    function GradeIndicator(props) {
      const {t} = useLocale();
      let label;
      switch (props.gr || 0) {
       case 8:
        label = t("content_kanji_grade_general_use");
        break;

       case 9:
        label = t("content_kanji_grade_name_use");
        break;

       default:
        if (props.gr === void 0) label = "-"; else label = t("content_kanji_grade_label", [ String(props.gr) ]);
        break;
      }
      
      return jsxRuntime_module_u("div", {
        class: "tp-flex tp-gap-1.5 tp-items-center tp-text-smish",
        children: [ 
         jsxRuntime_module_u("svg", {
          class: "tp-block tp-h-[12px] tp-w-[12px] tp-fill-current tp-opacity-50",
          role: "presentation",
          viewBox: "0 0 16 16",
          children: [ 
           jsxRuntime_module_u("circle", {
            cx: "14.5",
            cy: "14.5",
            r: "1.5"
          }), 
           jsxRuntime_module_u("path", {
            d: "M8,0A2.87,2.87,0,0,0,5,2.72v2.5A2.92,2.92,0,0,0,8,8a2.92,2.92,0,0,0,3-2.78V2.72A2.87,2.87,0,0,0,8,0Z"
          }), 
           jsxRuntime_module_u("path", {
            d: "M13.91,11.71A5.09,5.09,0,0,0,9.45,9H5.09A5.18,5.18,0,0,0,0,14.25.74.74,0,0,0,.73,15h10.9a.74.74,0,0,0,.73-.75,1.49,1.49,0,0,1,1.09-1.45.75.75,0,0,0,.49-.43A.76.76,0,0,0,13.91,11.71Z"
          }) ]
        }), 
         jsxRuntime_module_u("span", {
          children: label
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/KanjiComponents.tsx
    function KanjiComponents(props) {
      const componentsIncludesRadical = props.comp.some((comp => comp.c === props.rad.b || comp.c === props.rad.k));
      
      return jsxRuntime_module_u("div", {
        children:  jsxRuntime_module_u("table", {
          // There's something odd in Firefox where, when you're viewing a
          // text/plain document, the text color rule on the window doesn't
          // inherit into the table so we have to explicitly re-establish the
          // color here.
          class: "-tp-mx-3 tp-border-collapse tp-text-[--text-color] tp-text-xs tp-leading-normal",
          children: [ !componentsIncludesRadical &&  jsxRuntime_module_u(RadicalRow, {
            ...props.rad
          }), props.comp.map((comp => {
            if (comp.c === props.rad.b || comp.c === props.rad.k) 
            return jsxRuntime_module_u(RadicalRow, {
              ...props.rad
            }, comp.c);
            
            return jsxRuntime_module_u("tr", {
              class: "*:tp-align-top *:tp-py-1",
              children: [ 
               jsxRuntime_module_u("td", {
                class: "tp-px-3",
                lang: "ja",
                children: comp.c
              }), 
               jsxRuntime_module_u("td", {
                class: "tp-px-1.5",
                lang: "ja",
                children: comp.na[0] || "-"
              }), 
               jsxRuntime_module_u("td", {
                class: "tp-px-3",
                lang: comp.m_lang,
                children: comp.m[0] || "-"
              }) ]
            }, comp.c);
          })) ]
        })
      });
    }
    function RadicalRow(props) {
      const {t, langTag} = useLocale();
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("tr", {
          class: "*:tp-bg-[--cell-highlight-bg] *:tp-text-[--cell-highlight-fg] *:tp-align-top *:tp-py-1",
          children: [ 
           jsxRuntime_module_u("td", {
            class: "tp-px-3 tp-rounded-s-md",
            lang: "ja",
            children: props.b || props.k
          }), 
           jsxRuntime_module_u("td", {
            class: "tp-px-1.5",
            lang: "ja",
            children: props.na.join("\u3001")
          }), 
           jsxRuntime_module_u("td", {
            class: "tp-px-3 tp-rounded-e-md",
            lang: props.m_lang,
            children: props.m.join(", ")
          }) ]
        }), !!props.base &&  jsxRuntime_module_u("tr", {
          class: "-baseradical",
          lang: langTag,
          children:  jsxRuntime_module_u("td", {
            colspan: 3,
            class: "tp-text-[--cell-highlight-fg] tp-align-top tp-py-1 tp-px-3 tp-italic",
            children: t("content_kanji_base_radical", [ props.base.b || props.base.k, props.base.na.join("\u3001") ])
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/KanjiMeta.tsx
    function KanjiMeta(props) {
      const {t, langTag} = useLocale();
      
      return jsxRuntime_module_u("div", {
        class: "tp-flex tp-gap-2 -tp-mx-1",
        children: props.tags.map((tag =>  jsxRuntime_module_u("span", {
          class: "tp-text-sm tp-border tp-border-current tp-border-solid tp-rounded tp-py-0.5 tp-px-1",
          lang: langTag,
          children: t(`content_kanji_meta_${tag.replace(" ", "_")}`)
        }, tag)))
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/KanjiReadings.tsx
    function KanjiReadings(props) {
      const {t, langTag} = useLocale();
      
      return jsxRuntime_module_u("div", {
        lang: "ja",
        class: "tp-text-[--reading-highlight] tp-text-base",
        children: [ props.r.on?.join("\u3001") || null, props.r.kun?.map(((k, i) => {
          const hasPreceding = i !== 0 || !!props.r.on?.length;
          
          return jsxRuntime_module_u(preact_module_b, {
            children: [ hasPreceding ? "\u3001" : null, 
             jsxRuntime_module_u(KunReading, {
              k
            }) ]
          });
        })) || null, props.r.na?.length ?  jsxRuntime_module_u(preact_module_b, {
          children: [ 
           jsxRuntime_module_u("br", {}), 
           jsxRuntime_module_u("span", {
            class: "tp-text-[--reading-label] tp-text-xs",
            lang: langTag,
            children: t("content_kanji_nanori_label")
          }), " ", props.r.na.join("\u3001") ]
        }) : null ]
      });
    }
    // Kun readings sometimes have a . in them separating the initial part that
    // represents the kanji, from the okurigana.
    
    // e.g. あた.える
    
    // We want to take the bit after the '.' and wrap it in a span with an
    // appropriate class.
        function KunReading(props) {
      const highlightIndex = props.k.indexOf(".");
      return highlightIndex === -1 ?  jsxRuntime_module_u(preact_module_b, {
        children: props.k
      }) :  jsxRuntime_module_u(preact_module_b, {
        children: [ props.k.substring(0, highlightIndex), 
         jsxRuntime_module_u("span", {
          class: "tp-text-[--okurigana-color]",
          children: props.k.substring(highlightIndex + 1)
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/StrokeCount.tsx
    function StrokeCount(props) {
      const {t} = useLocale();
      const strokeLabel = props.sc === 1 ? t("content_kanji_strokes_label_1") : t("content_kanji_strokes_label", [ String(props.sc) ]);
      
      return jsxRuntime_module_u("div", {
        class: "tp-flex tp-gap-1.5 tp-items-center tp-text-smish",
        children: [ 
         jsxRuntime_module_u("svg", {
          class: "tp-block tp-h-[12px] tp-w-[12px] tp-fill-current tp-opacity-50",
          role: "presentation",
          viewBox: "0 0 16 16",
          children: [ 
           jsxRuntime_module_u("circle", {
            cx: "14.5",
            cy: "1.5",
            r: "1.5"
          }), 
           jsxRuntime_module_u("polyline", {
            points: "13 4.5 4 13.5 1 15 2.5 12 11.5 3",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }) ]
        }), 
         jsxRuntime_module_u("span", {
          children: strokeLabel
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/KanjiInfo.tsx
    function KanjiInfo(props) {
      const {langTag} = useLocale();
      
      return jsxRuntime_module_u("div", {
        class: "tp-flex tp-flex-col tp-gap-3",
        children: [ 
         jsxRuntime_module_u(KanjiReadings, {
          r: props.r
        }), !!props.misc.meta?.length &&  jsxRuntime_module_u("div", {
          class: "-tp-mt-1.5",
          children:  jsxRuntime_module_u(KanjiMeta, {
            tags: props.misc.meta
          })
        }), 
         jsxRuntime_module_u("div", {
          class: "tp-text-base tp-leading-snug",
          lang: props.m_lang,
          children: props.m.join(", ")
        }), 
         jsxRuntime_module_u("div", {
          class: "tp-flex tp-items-base tp-gap-3.5 *:tp-grow",
          lang: langTag,
          children: [ 
           jsxRuntime_module_u(StrokeCount, {
            sc: props.misc.sc
          }), 
           jsxRuntime_module_u(FrequencyIndicator, {
            frequency: props.misc.freq
          }), 
           jsxRuntime_module_u(GradeIndicator, {
            gr: props.misc.gr
          }) ]
        }), props.showComponents !== false &&  jsxRuntime_module_u(KanjiComponents, {
          rad: props.rad,
          comp: props.comp
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/KanjiReferencesTable.tsx
    function KanjiReferencesTable({entry, kanjiReferences}) {
      const {t, langTag} = useLocale();
      const referenceTableInfo = hooks_module_T((() => {
        const referenceNames = getSelectedReferenceLabels(kanjiReferences, t);
        const referenceTableInfo = [];
        for (const ref of referenceNames) {
          // Don't show the Nelson radical if it's the same as the regular radical
          // (in which case it will be empty) and we're showing the regular radical.
          if (ref.ref === "nelson_r" && !entry.rad.nelson && kanjiReferences.includes("radical")) continue;
          const value = getReferenceValue(entry, ref.ref, t) || "-";
          referenceTableInfo.push({
            ref: ref.ref,
            name: {
              lang: ref.lang,
              value: ref.short || ref.full
            },
            value: {
              lang: ref.ref === "radical" || ref.ref === "nelson_r" ? "ja" : void 0,
              value
            },
            highlight: false
          });
        }
        // Now we go through and toggle the styles to get the desired alternating
        // effect.
        
        // We can't easily use nth-child voodoo here because we need to
        // handle unbalanced columns etc. We also can't easily do this in the loop
        // where we generate the cells because we don't know how many references we
        // will generate at that point.
                for (const [index, cellInfo] of [ ...referenceTableInfo ].entries()) {
          const row = index % Math.ceil(referenceTableInfo.length / 2);
          if (row % 2 === 0) cellInfo.highlight = true;
        }
        return referenceTableInfo;
      }), [ t, kanjiReferences ]);
      // The layout we want is something in-between what CSS grid and CSS multicol
      // can do. See:
      
      //   https://twitter.com/brianskold/status/1186198347184398336
      
      // In the stylesheet we make let the table flow horizontally, but then here
      // where we know the number of rows, we update it to produce the desired
      // vertical flow.
            let gridAutoFlow;
      let gridTemplateRows;
      if (referenceTableInfo.length > 1) {
        gridAutoFlow = "column";
        gridTemplateRows = `repeat(${Math.ceil(referenceTableInfo.length / 2)}, minmax(min-content, max-content))`;
      }
      
      return jsxRuntime_module_u("div", {
        class: classes_classes("tp-grid tp-grid-cols-[repeat(2,minmax(200px,1fr))] tp-gap-x-2", "max-[450px]:tp-grid-cols-none", "[--bg-overhang:8px]", "-tp-mx-[--bg-overhang] tp-w-[calc(100%+2*var(--bg-overhang))]"),
        lang: langTag,
        style: {
          gridAutoFlow,
          gridTemplateRows
        },
        children: referenceTableInfo.map((cellInfo =>  jsxRuntime_module_u(ReferenceEntryWrapper, {
          c: entry.c,
          highlight: cellInfo.highlight,
          refCode: cellInfo.ref,
          children: [ 
           jsxRuntime_module_u("span", {
            lang: cellInfo.name.lang,
            children: cellInfo.name.value
          }), 
           jsxRuntime_module_u("span", {
            class: "tp-ml-2",
            lang: cellInfo.value.lang,
            children: cellInfo.value.value
          }) ]
        }, cellInfo.name.value)))
      });
    }
    function ReferenceEntryWrapper(props) {
      const {t} = useLocale();
      const href = props.refCode === "wk" ? `https://wanikani.com/kanji/${encodeURIComponent(props.c)}` : void 0;
      const containerStyles = classes_classes("tp-flex tp-justify-between", "tp-rounded-lg tp-px-[--bg-overhang] tp-py-0.5", "tp-text-sm tp-leading-normal", href && "tp-cursor-pointer hover:tp-bg-[--cell-bg-hover] tp-underline-offset-2", href ? "tp-text-[--cell-link-fg]" : props.highlight ? "tp-text-[--cell-highlight-fg]" : "", props.highlight && "tp-bg-[--cell-highlight-bg]");
      if (href) 
      return jsxRuntime_module_u("a", {
        href,
        target: "_blank",
        rel: "noreferrer",
        class: containerStyles,
        title: t("content_wk_link_title", props.c),
        children: props.children
      }); else 
      return jsxRuntime_module_u("div", {
        class: containerStyles,
        children: props.children
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/KanjiStrokeAnimation.tsx
    const STROKE_SPEED = 150;
 // User units / second
        const STROKE_GAP = 250;
 // ms
        const FREEZE_LENGTH = 1000;
 // ms
        const TIMELINE_RANGE = 50;
 // px in SVG user unit space
    // This is a bit larger than the actual range the scrubber moves
    // so that you have a bit more control over seeking.
        const SCRUBBER_DRAG_RANGE = TIMELINE_RANGE + 10;
 // px in SVG user unit space
    // How far the timeline is from the left edge of the SVG
        const TIMELINE_OFFSET = 35;
 // px in SVG user unit space
        function KanjiStrokeAnimation(props) {
      const {t} = useLocale();
      // References
            const animatedStrokeContainer = hooks_module_A(null);
      const timelineSvg = hooks_module_A(null);
      const scrubberContainer = hooks_module_A(null);
      // Animation state
            const [isPlaying, setIsPlaying] = hooks_module_h(false);
      const currentAnimations = hooks_module_A([]);
      // Scrubber handling
            const {applySeek, onScrubberPointerDown, onTimelineClick} = useScrubber(timelineSvg, currentAnimations);
      // Update the animation parameters
            const subpaths = hooks_module_T((() => props.st.split(/(?=M[0-9])/)), [ props.st ]);
      hooks_module_((() => {
        if (!animatedStrokeContainer.current || !isPlaying) {
          currentAnimations.current = [];
          return;
        }
        const animations = [];
        // Stroke animations
                const paths = Array.from(animatedStrokeContainer.current.querySelectorAll("path"));
        const strokeDurations = paths.map((stroke => stroke.getTotalLength() * (1000 / STROKE_SPEED)));
        const totalDuration = strokeDurations.reduce(((acc, length) => acc + length), 0) + STROKE_GAP * (paths.length - 1) + FREEZE_LENGTH;
        let cumulativeDuration = 0;
        for (const [i, stroke] of paths.entries()) {
          const duration = strokeDurations[i];
          const startOffset = cumulativeDuration / totalDuration;
          const endOffset = Math.min((cumulativeDuration + duration) / totalDuration, 1);
          animations.push(stroke.animate({
            strokeDashoffset: [ 100, 100, 0, 0 ],
            offset: [ 0, startOffset, endOffset, 1 ],
            easing: "cubic-bezier(.28,.08,.79,.6)"
          }, {
            duration: totalDuration,
            iterations: 1 / 0
          }));
          cumulativeDuration += duration + STROKE_GAP;
        }
        // Scrubber animation
                if (scrubberContainer.current) animations.push(scrubberContainer.current.animate({
          transform: [ "translate(0)", `translate(${TIMELINE_RANGE}px)`, `translate(${TIMELINE_RANGE}px)` ],
          offset: [ 0, (totalDuration - FREEZE_LENGTH) / totalDuration ]
        }, {
          duration: totalDuration,
          iterations: 1 / 0
        }));
        // If we are currently seeking, fast-forward to the appropriate point
                applySeek(animations);
        currentAnimations.current = animations;
        return () => {
          currentAnimations.current.forEach((animation => animation.cancel()));
          currentAnimations.current = [];
        };
      }), [ subpaths, isPlaying ]);
      // Rendering parameters
            const strokeWidth = subpaths.length > 16 ? 4 : 5;
      // Copy state
            const lastPointerType = hooks_module_A("touch");
      
      return jsxRuntime_module_u("div", {
        class: "tp-flex tp-flex-col tp-items-center tp-gap-3",
        children: [ 
         jsxRuntime_module_u("svg", {
          class: classes_classes("tp-group", "tp-h-big-kanji tp-w-big-kanji tp-rounded-md", "hh:hover:tp-bg-[--hover-bg]", "hh:hover:tp-cursor-pointer", // Fade _out_ the color change
          "hh:tp-transition-colors hh:interactive:tp-duration-100", "hh:tp-ease-out", "hh:hover:tp-transition-none", // Ensure any selection colors are applied before fading in the
          // overlay
          props.selectState === "selected" && "no-overlay:tp-text-[--selected-highlight] no-overlay:tp-bg-[--selected-bg]", // Run the flash animation, but not until the overlay has
          // disappeared.
          props.selectState === "flash" && "no-overlay:tp-animate-flash"),
          viewBox: "0 0 109 109",
          onPointerUp: evt => {
            lastPointerType.current = evt.pointerType;
          },
          onClick: () => {
            const trigger = lastPointerType.current === "mouse" ? "mouse" : "touch";
            props.onClick?.(trigger);
          },
          children: [ 
           jsxRuntime_module_u("g", {
            "stroke-width": strokeWidth,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            stroke: "var(--text-color)",
            opacity: "0.3",
            fill: "none",
            children: subpaths.map(((path, index) =>  jsxRuntime_module_u("path", {
              d: path,
              fill: "none"
            }, index)))
          }), 
           jsxRuntime_module_u("g", {
            class: classes_classes("tp-stroke-[--primary-highlight] hh:group-hover:tp-stroke-[--selected-highlight]", "hh:tp-transition-colors hh:interactive:tp-duration-100", "hh:tp-ease-out", "hh:hover:tp-transition-none", props.selectState === "selected" && "no-overlay:tp-stroke-[--selected-highlight]"),
            "stroke-width": strokeWidth,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            stroke: "var(--primary-highlight)",
            "stroke-dasharray": "100 100",
            "stroke-dashoffset": isPlaying ? 100 : 0,
            fill: "none",
            ref: animatedStrokeContainer,
            children: subpaths.map(((path, index) =>  jsxRuntime_module_u("path", {
              d: path,
              fill: "none",
              // We use 99.5 instead of 100 to work around path length
              // inaccuracies in Chrome. Without this you'd occasionally see a
              // dot at the end of a stroke that should be invisible.
              pathLength: 99.5
            }, index)))
          }) ]
        }), 
         jsxRuntime_module_u("div", {
          children:  jsxRuntime_module_u("svg", {
            class: "tp-w-big-kanji",
            ref: timelineSvg,
            viewBox: "0 0 100 50",
            style: {
              webkitTapHighlightColor: "transparent"
            },
            children: [ 
             jsxRuntime_module_u("g", {
              onClick: () => setIsPlaying((prev => !prev)),
              "pointer-events": "all",
              class: "tp-cursor-pointer tp-opacity-30 hh:hover:tp-opacity-100 tp-fill-[--text-color] hh:hover:tp-fill-[--primary-highlight] tp-transition-transform tp-duration-500",
              style: {
                transform: isPlaying ? "none" : "translate(40px)"
              },
              children: [ 
               jsxRuntime_module_u("title", {
                children: t(isPlaying ? "content_stroke_animation_stop" : "content_stroke_animation_play")
              }), 
               jsxRuntime_module_u("rect", {
                x: isPlaying ? 0 : -40,
                width: isPlaying ? 25 : 100,
                height: 50,
                fill: "none"
              }), 
               jsxRuntime_module_u("path", {
                d: isPlaying ? "M20 12.5v6a4 4 0 01-4 4l-12 0c0 0 0 0 0 0a4 4 90 01-4-4v-12a4 4 90 014-4c0 0 0 0 0 0l12 0a4 4 0 014 4z" : "M20 12.5v0a2 2 0 01-1 1.7l-16.1 8.1c-.3.1-.6.2-.9.2a2 2 90 01-2-2v-16a2 2 90 012-2c.3 0 .7.1 1 .2l16 8.1a2 2 0 011 1.7z",
                class: "tp-transition-[d] tp-duration-500",
                transform: "scale(0.9)",
                "transform-origin": "10px 12.5px"
              }) ]
            }), 
             jsxRuntime_module_u("g", {
              style: {
                transform: isPlaying ? "translate(25px)" : "translate(65px)"
              },
              class: classes_classes("tp-transition-transform tp-duration-500", isPlaying ? "tp-delay-100" : "tp-pointer-events-none"),
              children: [ 
               jsxRuntime_module_u("g", {
                fill: "var(--primary-highlight)",
                opacity: "0.1",
                style: {
                  transform: isPlaying ? "scale(1)" : "scale(0)",
                  transformOrigin: "12.5px 12.5px"
                },
                class: classes_classes("tp-transition-transform", !isPlaying && "tp-delay-[450ms]"),
                onClick: onTimelineClick,
                children: [ 
                 jsxRuntime_module_u("rect", {
                  x: 12.5,
                  // Add an extra pixel to the width to avoid a gap between the
                  // scrubber and the right end of the timeline.
                  width: TIMELINE_RANGE + 1,
                  height: 25,
                  style: {
                    transform: isPlaying ? "scale(1)" : "scale(0, 1)",
                    transformOrigin: "12.5px 12.5px"
                  },
                  class: classes_classes("tp-transition-transform tp-duration-500", isPlaying && "tp-delay-100")
                }), 
                 jsxRuntime_module_u("path", {
                  d: "M12.5 0a12.5 12.5 0 0 0 0 25z"
                }), 
                 jsxRuntime_module_u("path", {
                  d: `M${TIMELINE_RANGE + 12.5} 0a12.5 12.5 0 0 1 0 25z`,
                  style: {
                    transform: isPlaying ? "translate(0)" : `translate(-${TIMELINE_RANGE}px)`
                  },
                  class: classes_classes("tp-transition-transform tp-duration-500", isPlaying && "tp-delay-100")
                }) ]
              }), 
               jsxRuntime_module_u("g", {
                ref: scrubberContainer,
                children:  jsxRuntime_module_u("g", {
                  style: {
                    transform: isPlaying ? "scale(1)" : "scale(0)",
                    transformOrigin: "12.5px 12.5px"
                  },
                  class: classes_classes("tp-transition-transform", !isPlaying ? "tp-delay-[400ms]" : "tp-delay-50"),
                  children: [ 
                   jsxRuntime_module_u("rect", {
                    x: -10,
                    width: 40,
                    height: 50,
                    fill: "none",
                    class: "tp-cursor-pointer tp-peer",
                    "pointer-events": "all",
                    onPointerDown: onScrubberPointerDown,
                    // This is needed to prevent the container from scrolling
                    onTouchStart: evt => evt.preventDefault()
                  }), 
                   jsxRuntime_module_u("circle", {
                    cx: 12.5,
                    cy: 12.5,
                    r: 8,
                    class: "tp-fill-[--primary-highlight] tp-opacity-50 peer-hover:tp-opacity-100",
                    "pointer-events": "none"
                  }) ]
                })
              }) ]
            }) ]
          })
        }) ]
      });
    }
    function useScrubber(timelineSvg, currentAnimations) {
      const seekState = hooks_module_A(null);
      // The following callback needs to be stable so that the caller doesn't need
      // to mark it as a dependency in their effects.
            const applySeek = hooks_module_q((animations => {
        if (!seekState.current) return;
        for (const animation of animations) {
          if (animation.playState !== "paused") animation.pause();
          const timing = animation.effect.getComputedTiming();
          animation.currentTime = seekState.current.offset * (timing.duration - FREEZE_LENGTH);
        }
      }), []);
      // The following callbacks need to be stable so we can unregister them from
      // the window when dragging stops or the component unmounts.
            const onWindowPointerMove = hooks_module_q((event => {
        if (!seekState.current || !timelineSvg.current) return;
        // Calculate the offset of the scrubber
                const [svgX] = toSvgCoords(timelineSvg.current, event.clientX, 0);
        const offset = Math.min(Math.max((svgX - seekState.current.scrubberStart) / SCRUBBER_DRAG_RANGE, 0), 1);
        seekState.current.offset = offset;
        // Seek each of the animations to the equivalent point
                applySeek(currentAnimations.current);
      }), []);
      const onWindowPointerUpOrCancel = hooks_module_q((() => {
        if (!seekState.current) return;
        currentAnimations.current.forEach((animation => animation.play()));
        seekState.current = null;
        window.removeEventListener("pointermove", onWindowPointerMove);
        window.removeEventListener("pointerup", onWindowPointerUpOrCancel);
        window.removeEventListener("pointercancel", onWindowPointerUpOrCancel);
      }), []);
      hooks_module_y((() => () => {
        if (seekState.current) {
          window.removeEventListener("pointermove", onWindowPointerMove);
          window.removeEventListener("pointerup", onWindowPointerUpOrCancel);
          window.removeEventListener("pointercancel", onWindowPointerUpOrCancel);
        }
      }), []);
      const onScrubberPointerDown = event => {
        if (seekState.current || !timelineSvg.current) return;
        // Work out how far we are into the animation
                if (currentAnimations.current.length === 0) return;
        const animationTiming = currentAnimations.current[0].effect.getComputedTiming();
        const iterationProgress = animationTiming.progress;
        const iterationDuration = animationTiming.duration;
        const strokeAnimationProgress = Math.min(iterationProgress * (iterationDuration / (iterationDuration - FREEZE_LENGTH)), 1);
        // Based on that, work out where the scrubber should start
                const [svgX] = toSvgCoords(timelineSvg.current, event.clientX, 0);
        const scrubberStart = svgX - strokeAnimationProgress * SCRUBBER_DRAG_RANGE;
        seekState.current = {
          scrubberStart,
          offset: strokeAnimationProgress
        };
        // Pause the animations
                currentAnimations.current.forEach((animation => animation.pause()));
        // Register the move/up/cancel events
                window.addEventListener("pointermove", onWindowPointerMove);
        window.addEventListener("pointerup", onWindowPointerUpOrCancel);
        window.addEventListener("pointercancel", onWindowPointerUpOrCancel);
      };
      const onTimelineClick = hooks_module_q((event => {
        if (seekState.current || !timelineSvg.current) return;
        const [svgX] = toSvgCoords(timelineSvg.current, event.clientX, 0);
        const offset = Math.min(Math.max((svgX - TIMELINE_OFFSET) / TIMELINE_RANGE, 0), 1);
        // Seek the animations to that point
                for (const animation of currentAnimations.current) {
          const timing = animation.effect.getComputedTiming();
          animation.currentTime = offset * (timing.duration - FREEZE_LENGTH);
        }
      }), []);
      return {
        onScrubberPointerDown,
        onTimelineClick,
        applySeek
      };
    }
    function toSvgCoords(svg, x, y) {
      const ctm = svg.getScreenCTM();
      const point = svg.createSVGPoint();
      point.x = x;
      point.y = y;
      const transformed = point.matrixTransform(ctm.inverse());
      return [ transformed.x, transformed.y ];
    }
    // CONCATENATED MODULE: ./src/content/popup/options-context.tsx
    const options_context_contextValue = {
      interactive: true
    };
    const popupOptionsContext = G(options_context_contextValue);
    function PopupOptionsProvider(props) {
      
      return jsxRuntime_module_u(popupOptionsContext.Provider, {
        value: props,
        children: props.children
      });
    }
    function usePopupOptions() {
      return hooks_module_x(popupOptionsContext);
    }
    // CONCATENATED MODULE: ./src/content/popup/selection.ts
    function containerHasSelectedText(container) {
      const selection = window.getSelection();
      return selection && !selection.isCollapsed && container.contains(selection.focusNode);
    }
    // CONCATENATED MODULE: ./src/content/popup/KanjiEntry.tsx
    function KanjiEntry(props) {
      const kanjiTable = hooks_module_A(null);
      
      return jsxRuntime_module_u("div", {
        class: classes_classes("tp-flex tp-flex-col tp-gap-3.5 tp-px-5 tp-py-3", // Set the -selected / -flash class since we use that we scroll into
        // view any selected item during / after copying.
        // Once everything is converted to Preact we hopefully won't need this
        // anymore (since we'll do minimal DOM updates) but if we do, then we
        // should prefer using a data attribute to a CSS class.
        props.selectState === "selected" && "-selected", props.selectState === "flash" && "-flash"),
        ref: kanjiTable,
        children: [ 
         jsxRuntime_module_u("div", {
          class: "tp-flex tp-items-start tp-gap-[20px]",
          children: [ 
           jsxRuntime_module_u(KanjiCharacter, {
            c: props.entry.c,
            onClick: trigger => {
              if (containerHasSelectedText(kanjiTable.current)) return;
              props.onStartCopy?.(props.index, trigger);
            },
            selectState: props.selectState,
            st: props.entry.st
          }), 
           jsxRuntime_module_u("div", {
            class: "tp-mt-1.5 tp-grow",
            children:  jsxRuntime_module_u(KanjiInfo, {
              ...props.entry,
              showComponents: props.showComponents
            })
          }) ]
        }), !!props.kanjiReferences.length &&  jsxRuntime_module_u("div", {
          children:  jsxRuntime_module_u(KanjiReferencesTable, {
            entry: props.entry,
            kanjiReferences: props.kanjiReferences
          })
        }) ]
      });
    }
    function KanjiCharacter(props) {
      const {interactive} = usePopupOptions();
      // There's no way to trigger the animation when we're not in "mouse
      // interactive" mode so just show the static character in that case.
            return props.st && interactive ?  jsxRuntime_module_u(KanjiStrokeAnimation, {
        onClick: props.onClick,
        selectState: props.selectState,
        st: props.st
      }) :  jsxRuntime_module_u(StaticKanjiCharacter, {
        c: props.c,
        onClick: props.onClick,
        selectState: props.selectState
      });
    }
    function StaticKanjiCharacter(props) {
      const lastPointerType = hooks_module_A("touch");
      const {interactive} = usePopupOptions();
      
      return jsxRuntime_module_u("div", {
        class: classes_classes("tp-text-[--primary-highlight] tp-text-big-kanji tp-text-center tp-pt-2 tp-rounded-md", "[text-shadow:var(--shadow-color)_1px_1px_4px]", ...interactive ? [ "hh:hover:tp-text-[--selected-highlight]", "hh:hover:tp-bg-[--hover-bg]", "hh:hover:tp-cursor-pointer", 
        // Fade _out_ the color change
        "hh:tp-transition-colors hh:interactive:tp-duration-100", "hh:tp-ease-out", "hh:hover:tp-transition-none" ] : [], // Ensure any selection colors are applied before fading in the
        // overlay
        props.selectState === "selected" && "no-overlay:tp-text-[--selected-highlight] no-overlay:tp-bg-[--selected-bg]", // Run the flash animation, but not until the overlay has
        // disappeared.
        props.selectState === "flash" && "no-overlay:tp-animate-flash"),
        lang: "ja",
        onPointerUp: evt => {
          lastPointerType.current = evt.pointerType;
        },
        onClick: () => {
          const trigger = lastPointerType.current === "mouse" ? "mouse" : "touch";
          props.onClick?.(trigger);
        },
        children: props.c
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/selected-index.ts
    function getSelectedIndex(copyState, numEntries) {
      return copyState.kind !== "inactive" && numEntries ? copyState.index % numEntries : -1;
    }
    // CONCATENATED MODULE: ./src/content/popup/kanji.ts
    function renderKanjiEntries({entries, options}) {
      const container = html("div", {
        class: "kanjilist entry-data"
      });
      const selectedIndex = getSelectedIndex(options.copyState, entries.length);
      for (const [i, entry] of entries.entries()) {
        if (i === 1) container.append(html("div", {
          class: "fold-point"
        }));
        container.append(renderKanjiEntry({
          entry,
          index: i,
          options,
          selectState: selectedIndex === i ? options.copyState.kind === "active" ? "selected" : "flash" : "unselected"
        }));
      }
      return container;
    }
    function renderKanjiEntry({entry, index, options, selectState}) {
      const containerElement = html("div", {
        /* Make sure it's possible to scroll all the way to the bottom of each kanji
     * table. */
        style: "scroll-snap-align: start; scroll-margin-bottom: var(--expand-button-allowance);"
      });
      B(preact_module_(PopupOptionsProvider, {
        interactive: options.interactive
      }, preact_module_(KanjiEntry, {
        entry,
        index,
        kanjiReferences: options.kanjiReferences,
        onStartCopy: options.onStartCopy,
        selectState,
        showComponents: options.showKanjiComponents
      })), containerElement);
      return containerElement;
    }
    // CONCATENATED MODULE: ./src/content/popup/metadata.ts
    function renderMetadata({fxData, preferredUnits, isCombinedResult, matchLen, meta}) {
      switch (meta.type) {
       case "era":
        {
          const eraInfo = getEraInfo(meta.era);
          if (eraInfo) return renderEraInfo(meta, eraInfo);
        }
        break;

       case "measure":
        return renderMeasureInfo(meta, preferredUnits);

       case "currency":
        return fxData ? renderCurrencyInfo(meta, fxData) : null;

       case "number":
        return meta.matchLen > matchLen ? renderNumberInfo(meta, {
          isCombinedResult
        }) : null;

       case "shogi":
        return renderShogiInfo(meta);
      }
      return null;
    }
    function renderEraInfo(meta, eraInfo) {
      const seireki = meta.year === 0 ? eraInfo.start : meta.year - 1 + eraInfo.start;
      return html("div", {
        class: "meta era",
        lang: "ja"
      }, html("span", {
        class: "era-name"
      }, html("ruby", {}, meta.era, html("rp", {}, "("), html("rt", {}, eraInfo.reading), html("rp", {}, ")"), meta.year === 0 ? "\u5143\u5e74" : `${meta.year}\u5e74`)), html("span", {
        class: "equals"
      }, "="), html("span", {
        class: "seireki"
      }, `${seireki}\u5e74`));
    }
    function renderMeasureInfo(meta, preferredUnits) {
      const converted = convertMeasure(meta, preferredUnits);
      const metaDiv = html("div", {
        class: "meta measure",
        lang: "ja"
      }, html("span", {
        class: "main"
      }, html("span", {
        class: "value"
      }, meta.value.toLocaleString(), renderUnit(meta.unit)), html("span", {
        class: "equals"
      }, "="), html("span", {
        class: "value"
      }, renderValue(converted.value), renderUnit(converted.unit))));
      if (converted.alt) for (const {type, label, unit, value} of converted.alt) {
        const altRow = html("div", {
          class: "alt"
        });
        const altLabel = html("span", {});
        if (label) altLabel.append(label);
        const expl = browser_polyfill_default().i18n.getMessage(`measure_expl_${type}`);
        if (expl) {
          const altExplLabel = html("span", {
            lang: getLangTag()
          }, expl);
          altLabel.append(altExplLabel);
        }
        altRow.append(altLabel, html("span", {
          class: "equals"
        }, "="), html("span", {
          class: "measure"
        }, renderValue(value), renderUnit(unit, {
          showRuby: false
        })));
        metaDiv.append(altRow);
      }
      return metaDiv;
    }
    function renderValue(value) {
      // Round to two decimal places, then to five significant figures
      return parseFloat(metadata_round(value, 2).toPrecision(5)).toLocaleString();
    }
    function metadata_round(value, places) {
      const base = Math.pow(10, places);
      return Math.round(value * base) / base;
    }
    function renderUnit(unit, {showRuby = true} = {}) {
      const unitSpan = html("span", {
        class: "unit"
      });
      if (unit === "m2") unitSpan.append("m", html("sup", {}, "2")); else if (unit === "sq ft") unitSpan.append("ft", html("sup", {}, "2")); else if (showRuby) unitSpan.append(html("ruby", {}, unit, html("rp", {}, "("), html("rt", {}, "\u3058\u3087\u3046"), html("rp", {}, ")"))); else unitSpan.append(unit);
      return unitSpan;
    }
    function renderCurrencyInfo(meta, fxData) {
      const metaDiv = html("div", {
        class: "meta currency",
        lang: "ja"
      }, html("div", {
        class: "main"
      }, // LHS
      html("div", {
        class: "equation-part"
      }, html("span", {
        class: "curr"
      }, "JPY"), html("span", {
        class: "src"
      }, new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY"
      }).format(meta.value)), html("span", {
        class: "equals"
      }, "\u2248")), // RHS
      html("div", {
        class: "equation-part"
      }, html("span", {
        class: "curr"
      }, fxData.currency), html("span", {
        class: "value"
      }, renderCurrencyValue({
        currency: fxData.currency,
        value: meta.value * fxData.rate
      })))));
      const timestampRow = html("div", {
        class: "timestamp"
      });
      const timestampAsDate = new Date(fxData.timestamp);
      const timestampAsString = timestampAsDate.toLocaleString(void 0, {
        dateStyle: "medium",
        timeStyle: "short"
      });
      const expl = browser_polyfill_default().i18n.getMessage("currency_data_updated_label", timestampAsString);
      timestampRow.append(expl);
      metaDiv.append(timestampRow);
      return metaDiv;
    }
    function renderCurrencyValue({currency, value}) {
      // BTC is a bit special because Intl.NumberFormat doesn't support it and if we
      // let it do its fallback rounding to two decimal places we'll lose most of
      // the information.
      // In fact, the convention for BTC appears to be to always use 8 decimal
      // places.
      if (currency === "BTC") return `\u20bf${value.toFixed(8)}`;
      let formattedValue;
      try {
        formattedValue = new Intl.NumberFormat(void 0, {
          style: "currency",
          currency,
          currencyDisplay: "narrowSymbol"
        }).format(value);
      } catch {
        // Some older browsers may not support all the options above so fall back to
        // general number formatting in that case.
        formattedValue = (new Intl.NumberFormat).format(value);
      }
      // Drop redundant currency code.
      
      // If the browser doesn't have a specific symbol (e.g. $) for the currency,
      // it generally just prepends the currency code (e.g. USD) but that's
      // redundant with our valueCurrencyLabel so we try to detect and drop it in
      // that case.
            formattedValue = formattedValue.replace(new RegExp(`^\\s*${currency}\\s*`), "");
      return formattedValue;
    }
    function renderNumberInfo(meta, {isCombinedResult}) {
      const metaDiv = html("div", {
        class: "meta number"
      });
      if (isCombinedResult) metaDiv.append(html("span", {
        class: "src",
        lang: "ja"
      }, meta.src), html("span", {
        class: "equals"
      }, "="));
      metaDiv.append(html("span", {
        class: "value"
      }, meta.value.toLocaleString()));
      return metaDiv;
    }
    function renderShogiInfo(meta) {
      const metaDiv = html("div", {
        class: "meta shogi"
      });
      metaDiv.append(html("span", {
        class: "label",
        lang: getLangTag()
      }, browser_polyfill_default().i18n.getMessage("shogi_label")), html("span", {
        class: "src",
        lang: "ja"
      }, serializeShogi(meta)), html("span", {
        class: "equals"
      }, "="));
      // For Chinese we use the Japanese expansion anyway
            let lang = getLangTag();
      if (lang === "zh-Hans") lang = "ja";
      // Side
            const side = meta.side ? browser_polyfill_default().i18n.getMessage(`shogi_side_${meta.side}`) : void 0;
      // Piece
            const piece = browser_polyfill_default().i18n.getMessage(`shogi_piece_${meta.piece}`);
      // Destination
            let dest;
      if (meta.dest) {
        dest = lang === "ja" ? serializeShogiDest(meta.dest) : meta.dest.slice(0, 2).map(String).join("");
        if (meta.dest.length === 3) dest += browser_polyfill_default().i18n.getMessage("shogi_dest_same_suffix");
      } else dest = browser_polyfill_default().i18n.getMessage("shogi_dest_same");
      // Movement
            const movement = meta.movement ? browser_polyfill_default().i18n.getMessage(`shogi_movement_${meta.movement}`) : void 0;
      // Get the combined string
            let move;
      if (side && movement) move = browser_polyfill_default().i18n.getMessage("shogi_move_side_piece_dest_movement", [ side, piece, dest, movement ]); else if (side) move = browser_polyfill_default().i18n.getMessage("shogi_move_side_piece_dest", [ side, piece, dest ]); else if (movement) move = browser_polyfill_default().i18n.getMessage("shogi_move_piece_dest_movement", [ piece, dest, movement ]); else move = browser_polyfill_default().i18n.getMessage("shogi_move_piece_dest", [ piece, dest ]);
      // Add promotion annotation
            if (typeof meta.promotion === "boolean") move += browser_polyfill_default().i18n.getMessage(meta.promotion ? "shogi_promoted_suffix" : "shogi_not_promoted_suffix");
      metaDiv.append(html("span", {
        class: "value",
        lang
      }, move));
      return metaDiv;
    }
    // CONCATENATED MODULE: ./src/utils/age.ts
    const regularAgeRegex = /(\d{4})\.(\d{1,2})(?:\.(\d{1,2}))?-[;)]/;
    const backwardsAgeRegex = /(\d{1,2})\.(\d{1,2})\.(\d{4})?-[;)]/;
    function getDob(text) {
      let year;
      let month;
      let approx;
      let day;
      let matches = regularAgeRegex.exec(text);
      if (matches) {
        year = parseInt(matches[1], 10);
        month = parseInt(matches[2], 10) - 1;
        approx = typeof matches[3] === "undefined";
        day = !approx ? parseInt(matches[3], 10) : 1;
      } else {
        matches = backwardsAgeRegex.exec(text);
        if (matches) {
          year = parseInt(matches[3], 10);
          month = parseInt(matches[1], 10) - 1;
          day = parseInt(matches[2], 10);
          approx = false;
        } else return null;
      }
      // Sanity check
            if (year > 2100 || year < 100 || month < 0 || month > 11 || day < 1 || day > 31) return null;
      return {
        // This will create a date in the current user's timezone but that's fine
        // since we're going to compare this to the user's local time anyway.
        date: new Date(year, month, day),
        approx
      };
    }
    // CONCATENATED MODULE: ./src/content/popup/names.ts
    function renderNamesEntries({entries, matchLen, more, options}) {
      const namesTable = html("div", {
        class: "name-table entry-data"
      });
      if (options.meta) {
        const metadata = renderMetadata({
          fxData: options.fxData,
          preferredUnits: options.preferredUnits,
          isCombinedResult: true,
          matchLen,
          meta: options.meta
        });
        if (metadata) namesTable.append(metadata);
      }
      if (entries.length > 4) namesTable.classList.add("-multicol");
      let lastPointerType = "touch";
      const selectedIndex = getSelectedIndex(options.copyState, entries.length);
      for (const [index, entry] of entries.entries()) {
        const entryDiv = renderName(entry);
        if (index === selectedIndex) entryDiv.classList.add(options.copyState.kind === "active" ? "-selected" : "-flash");
        entryDiv.addEventListener("pointerup", (evt => {
          lastPointerType = evt.pointerType;
        }));
        entryDiv.addEventListener("click", (() => {
          if (containerHasSelectedText(namesTable)) return;
          const trigger = lastPointerType === "mouse" ? "mouse" : "touch";
          options.onStartCopy?.(index, trigger);
        }));
        namesTable.append(entryDiv);
      }
      if (more) namesTable.append(html("span", {
        class: "more"
      }, "\u2026"));
      return namesTable;
    }
    function renderName(entry) {
      const entryDiv = html("div", {
        class: "entry"
      });
      const entryTitleDiv = html("div", {
        class: "w-title",
        lang: "ja"
      });
      entryDiv.append(entryTitleDiv);
      if (entry.k) {
        const MAX_KANJI = 15;
        const trimKanji = entry.k.length > MAX_KANJI;
        const kanjiToDisplay = trimKanji ? entry.k.slice(0, MAX_KANJI) : entry.k;
        let kanji = kanjiToDisplay.join("\u3001");
        if (trimKanji) kanji += "\u2026";
        entryTitleDiv.append(html("span", {
          class: "w-kanji"
        }, kanji));
      }
      const kana = entry.r.join("\u3001");
      entryTitleDiv.append(html("span", {
        class: "w-kana"
      }, kana));
      const definitionBlock = html("div", {
        class: "w-def"
      });
      for (const tr of entry.tr) definitionBlock.append(renderNameTranslation(tr));
      entryDiv.append(definitionBlock);
      return entryDiv;
    }
    function renderNameTranslation(tr) {
      const definitionSpan = html("div", {
        // ENAMDICT only has English glosses
        lang: "en"
      });
      // Only add age annotations if the name is for a person
            const annotateDetailFn = tr.type?.includes("person") ? annotateAge : det => det;
      definitionSpan.append(tr.det.map(annotateDetailFn).join(", "));
      for (const tag of tr.type || []) {
        const tagText = browser_polyfill_default().i18n.getMessage(`content_names_tag_${tag}`);
        if (!tagText) continue;
        definitionSpan.append(html("span", {
          class: `tag tag-${tag}`,
          lang: getLangTag()
        }, tagText));
      }
      return definitionSpan;
    }
    function annotateAge(text) {
      const dob = getDob(text);
      if (!dob) return text;
      // Calculate age
            const {date, approx} = dob;
      const today = new Date;
      let age = today.getFullYear() - date.getFullYear();
      const month = today.getMonth() - date.getMonth();
      if (month < 0 || month === 0 && today.getDate() < date.getDate()) age--;
      // Sanity check
            if (age < 1 || age > 150) return text;
      const ageString = approx ? browser_polyfill_default().i18n.getMessage("content_names_age_approx", [ String(age) ]) : browser_polyfill_default().i18n.getMessage("content_names_age", [ String(age) ]);
      return `${text} (${ageString})`;
    }
    // CONCATENATED MODULE: ./src/content/popup/popup.css?inline
    const popupinline_namespaceObject = "@charset \"UTF-8\";\n\n:root,\n:host {\n  --tag-green: #43a047aa;\n  --tag-pink: #f24b59aa;\n  --tag-blue: #2698fbaa;\n\n  --selected-bg: #fffde5;\n  --selected-reading-highlight: #2e7d32;\n  --selected-conj-color: #fc7600;\n  --selected-def-color: #1a1d1f;\n  --selected-tag-color: #1a1d1f;\n  --selected-tag-border: rgba(0, 0, 0, 0.3);\n}\n\n/*\n * Theme - light\n */\n\n.theme-light {\n  --text-color: #1d1a19;\n  --bg-rgb: 254, 254, 244;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #b1ad96;\n  --shadow-color: rgba(0, 0, 0, 0.2);\n\n  --primary-highlight: hsl(356, 73%, 40%);\n  --reading-highlight: hsl(52, 8.5%, 35%);\n  --conj-color: hsl(356, 55%, 41%);\n\n  --tag-border: rgba(0, 0, 0, 0.3);\n  --bunpro-vocab: #104f8c;\n  --bunpro-grammar: #9f3833;\n  --bunpro-src: #54534b;\n\n  --title-fg: var(--text-color);\n  --title-bg: #ede7c9;\n\n  --reading-label: hsl(49, 9.1%, 42%);\n  --okurigana-color: hsl(356, 73%, 40%);\n  --hi-contrast-pitch-accent: var(--primary-highlight);\n  --cell-highlight-bg: hsl(50, 50%, 90%);\n  --cell-highlight-fg: hsl(12, 4.2%, 20%);\n  --cell-bg-hover: hsl(50.4, 35.2%, 86.1%);\n  --cell-link-fg: var(--primary-highlight);\n\n  --selected-highlight: var(--primary-highlight);\n  --selected-bg: #fff8bf;\n  --hover-bg: rgb(255, 250, 210);\n  --selected-conj-color: hsl(356, 70%, 40%);\n  --selected-reading-highlight: #3e3a39;\n\n  --meta-bg: var(--cell-highlight-bg);\n  --status-bg: var(--cell-highlight-bg);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: var(--title-bg);\n  --puck-bg-highlight: var(--bg-color);\n\n  --status-button-color: #615f52;\n  --status-button-primary-text-color: var(--status-bg);\n\n  --expand-button-rgb: 177, 173, 150;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n.window.theme-light .w-def .tag-fem,\n.window.theme-light .w-def .w-dial {\n  background: #f24b5922;\n  color: #7a282f;\n  --tag-border: #f24b5966;\n}\n\n.window.theme-light .w-def .tag-masc,\n.window.theme-light .w-def .w-misc {\n  background: #2698fb22;\n  color: #144977;\n  --tag-border: #2698fbaa;\n}\n\n.window.theme-light .w-def .tag-place,\n.window.theme-light .w-def .w-field {\n  background: #43a04722;\n  color: #215723;\n  --tag-border: #43a047aa;\n}\n\n/*\n * Theme - blue\n */\n\n.theme-blue {\n  --text-color: white;\n  --bg-rgb: 68, 110, 160;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #17588e;\n  --shadow-color: rgba(0, 0, 0, 0.2);\n\n  --primary-highlight: #bcdffe;\n  --reading-highlight: #c0ffc0;\n  --conj-color: #fff394;\n\n  --tag-border: rgba(255, 255, 255, 0.4);\n  --bunpro-vocab: #b4d1ed;\n  --bunpro-grammar: #ffc6c4;\n  --bunpro-src: #cde1ef;\n\n  --title-bg: var(--cell-highlight-bg);\n  --title-fg: var(--text-color);\n\n  --reading-label: #e7ffe7;\n  --okurigana-color: #a8cfef;\n  --hi-contrast-pitch-accent: white;\n  --cell-highlight-bg: #17588e;\n  --cell-highlight-fg: var(--primary-highlight);\n  --cell-bg-hover: hsl(206.3, 86%, 28%);\n  --cell-link-fg: var(--reading-highlight);\n\n  --selected-highlight: var(--bg-color);\n  --selected-bg: rgb(220, 225, 255);\n  --hover-bg: rgb(233, 238, 255, 0.8);\n\n  --status-bg: rgba(255, 255, 255, 0.2);\n  --meta-bg: rgba(255, 255, 255, 0.2);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: var(--bg-color);\n  --puck-bg-highlight: #5f87bb;\n\n  --status-button-color: white;\n  --status-button-primary-text-color: var(--bg-color);\n\n  --expand-button-rgb: 144, 173, 197;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n/*\n * Theme - black\n */\n\n.theme-black {\n  --text-color: white;\n  --bg-rgb: 29, 26, 25;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #999493;\n  --shadow-color: rgba(255, 255, 255, 0.2);\n\n  --primary-highlight: #4bbffb;\n  --reading-highlight: #7beb7e;\n  --conj-color: #c1a4a0;\n\n  --tag-border: rgba(255, 255, 255, 0.4);\n  --bunpro-vocab: #64a6e5;\n  --bunpro-grammar: #da918e;\n  --bunpro-src: #c5c0af;\n\n  --title-bg: #3e3a39;\n  --title-fg: #ede8e6;\n\n  --reading-label: #e7ffe7;\n  --okurigana-color: #ede8e6;\n  --hi-contrast-pitch-accent: white;\n  --cell-highlight-bg: #504c4b;\n  --cell-highlight-fg: #f0ecea;\n  --cell-bg-hover: hsl(12, 4.4%, 22.2%);\n  --cell-link-fg: var(--primary-highlight);\n\n  --selected-bg: #555;\n  --hover-bg: #484844;\n\n  /* Reset selection styles */\n  --selected-highlight: var(--primary-highlight);\n  --selected-reading-highlight: var(--reading-highlight);\n  --selected-def-color: var(--text-color);\n  --selected-tag-color: var(--text-color);\n  --selected-tag-border: var(--tag-border);\n\n  --status-bg: rgba(255, 255, 255, 0.2);\n  --meta-bg: rgba(255, 255, 255, 0.2);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: var(--bg-color);\n  --puck-bg-highlight: #555;\n\n  --status-button-color: white;\n  --status-button-primary-text-color: var(--bg-color);\n\n  --expand-button-rgb: 130, 126, 125;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n.window.theme-black .w-def .tag-masc,\n.window.theme-black .w-def .w-misc {\n  --tag-blue: #2698fb88;\n  --tag-border: rgba(255, 255, 255, 0.3);\n}\n\n/*\n * Theme - lightblue\n */\n\n.theme-lightblue {\n  --text-color: #1d1a19;\n  --bg-rgb: 227, 242, 254;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #65b7fc;\n  --shadow-color: rgba(0, 0, 0, 0.2);\n\n  --primary-highlight: #17588e;\n  --reading-highlight: #2e7d32;\n  --conj-color: #817470;\n\n  --tag-border: rgba(0, 0, 0, 0.3);\n  --bunpro-vocab: #185692;\n  --bunpro-grammar: #b42822;\n  --bunpro-src: #475865;\n\n  --title-fg: var(--text-color);\n  --title-bg: #bcdffe;\n\n  --reading-label: #1b5e20;\n  --okurigana-color: #706c6b;\n  --hi-contrast-pitch-accent: var(--primary-highlight);\n  --cell-highlight-bg: #cae6fc;\n  --cell-highlight-fg: var(--primary-highlight);\n  --cell-bg-hover: hsl(206.4, 65.8%, 85.1%);\n  --cell-link-fg: var(--primary-highlight);\n\n  --selected-highlight: var(--primary-highlight);\n  --selected-bg: #fffac5;\n  --hover-bg: #fffde5;\n\n  --meta-bg: var(--cell-highlight-bg);\n  --status-bg: var(--cell-highlight-bg);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: #c5e0f5;\n  --puck-bg-highlight: var(--bg-color);\n\n  --status-button-color: var(--primary-highlight);\n  --status-button-primary-text-color: var(--bg-color);\n\n  --expand-button-rgb: 140, 186, 224;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n/*\n * Theme - yellow\n */\n\n.theme-yellow {\n  --text-color: #1d1a19;\n  --bg-rgb: 255, 248, 191;\n  --bg-color: rgb(var(--bg-rgb));\n  --border-color: #ffd600;\n  --shadow-color: rgba(0, 0, 0, 0.2);\n\n  --primary-highlight: #17588e;\n  --reading-highlight: #2e7d32;\n  --conj-color: #fc7600;\n\n  --tag-border: rgba(0, 0, 0, 0.3);\n  --bunpro-vocab: #0e3f6e;\n  --bunpro-grammar: #ba332d;\n  --bunpro-src: #525047;\n\n  --title-bg: #fffde5;\n  --title-fg: var(--text-color);\n\n  --reading-label: #1b5e20;\n  --okurigana-color: #fc7600;\n  --hi-contrast-pitch-accent: var(--primary-highlight);\n  --cell-highlight-bg: #fffde5;\n  --cell-highlight-fg: #3e3a39;\n  --cell-bg-hover: rgb(255, 254, 247);\n  --cell-link-fg: var(--primary-highlight);\n\n  --selected-bg: #e3f2fe;\n  --hover-bg: #fdfdf4;\n  --selected-highlight: var(--primary-highlight);\n\n  --meta-bg: var(--cell-highlight-bg);\n  --status-bg: var(--cell-highlight-bg);\n\n  --scrollbar-fg: var(--cell-highlight-bg);\n  --scrollbar-bg: var(--bg-color);\n\n  --puck-bg: #ffeeaa;\n  --puck-bg-highlight: var(--bg-color);\n\n  --status-button-color: var(--primary-highlight);\n  --status-button-primary-text-color: var(--status-bg);\n\n  --expand-button-rgb: 209, 195, 122;\n  --expand-button-color: rgb(var(--expand-button-rgb));\n}\n\n*, ::before, ::after{\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}\n\n::backdrop{\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}\n\n:host {\n    /*\n     * The following is because there appears to be some (yet unidentified)\n     * add-on that sets `position: absolute` on various div elements. As a\n     * result, our popup will end up being positioned at the very end of the\n     * page unless we ensure we set left/top ourselves.\n     *\n     * See: https://github.com/birchill/10ten-ja-reader/issues/947\n     */\n    position: revert !important;\n\n    /*\n     * However, supposing our rule above loses out to the interfering add-on?\n     *\n     * Assuming said add-on sets `position: absolute` on the popup we can make it\n     * work for us by setting the left/top/bottom/right properties.\n     */\n    position: absolute !important;\n    left: 0 !important;\n    top: 0 !important;\n    right: 0 !important;\n    bottom: 0 !important;\n    pointer-events: none !important;\n\n    /*\n     * It's conceivable add-ons might interfere with our z-index too so make\n     * sure that's covered.\n     */\n    z-index: 2147483647 !important;\n  }\n\n:root,\n  :host {\n    --normal-font-size: 14px;\n    --large-font-size: 17px;\n    --xl-font-size: 19px;\n\n    --base-font-size: var(--normal-font-size);\n  }\n\n.container {\n    position: absolute;\n    left: var(--left, auto);\n    top: var(--top, auto);\n\n    /*\n    * Use the empirical maximum z-index since some sites (e.g. TimeTree) use this\n    * for their popups.\n    */\n    z-index: 2147483647;\n\n    /* Make sure the drop shadow on the window doesn't get cut off */\n    padding-right: 4px;\n    padding-bottom: 4px;\n\n    overflow-y: visible;\n    pointer-events: all;\n  }\n\n.container:not(.interactive) {\n    pointer-events: none;\n  }\n\n/*\n  * Variation on the interactive container when it is not yet actually\n  * interactive.\n  */\n\n.container.interactive.ghost {\n    pointer-events: none;\n  }\n\n.container.interactive.ghost .window {\n    border-style: dashed;\n  }\n\n.container.hidden {\n    display: none;\n  }\n\n.-inline > .container {\n    position: revert;\n    z-index: revert;\n    pointer-events: revert;\n  }\n\n/*\n  * When the popup is interactive we make the window scrollable, but for\n  * non-interactive cases we just fade it out.\n  *\n  * To make the window scrollable we need to set the max-height on the\n  * window itself.\n  *\n  * For the fade-effect, however, we set the max-height and fade effect\n  * on the container so that the mask doesn't end up clipping the drop shadow\n  * on the popup.\n  */\n\n.container.interactive .window {\n    max-height: var(--max-height, none);\n  }\n\n.container:not(.interactive) {\n    max-height: var(--max-height, none);\n    -webkit-mask-image: linear-gradient(\n      to bottom,\n      black calc(var(--max-height) - 5px),\n      transparent\n    );\n    mask-image: linear-gradient(\n      to bottom,\n      black calc(var(--max-height) - 5px),\n      transparent\n    );\n  }\n\n.container .window {\n    min-height: var(--min-height, none);\n  }\n\n.window {\n    max-width: var(--max-width, 600px);\n    max-width: var(--max-width, min(600px, calc(100vw - 30px)));\n\n    contain: content;\n    border-radius: 5px;\n    box-shadow:\n      0px 0.5px 0.5px rgba(100, 100, 100, 0.15),\n      1px 2px 1px rgba(100, 100, 100, 0.15),\n      2px 4px 8px rgba(100, 100, 100, 0.15);\n    font: normal 14px;\n\n    color: var(--text-color);\n    background: var(--bg-color);\n    border: 1px solid var(--border-color);\n\n    font-family: Meiryo, sans-serif;\n  }\n\n.window.bundled-fonts {\n    font-family: '10ten Inter', '10ten Noto Sans JP', sans-serif;\n    font-feature-settings: 'calt', 'case', 'cv01', 'cv03', 'cv04', 'cv11',\n      'ss03';\n    font-weight: 380;\n  }\n\n/* When the tabs are shown on top, make the window have a consistent width\n    so the tabs don't jump around. */\n\n.window[data-tab-side='top'] {\n    display: flex;\n    max-width: none;\n    /* Fallback for the below */\n    width: 500px;\n    /* The 30px here is to accommodate scrollbars on Windows plus a bit of\n      padding. */\n    width: min(500px, calc(100vw - 30px));\n  }\n\n.container:not(.hidden) .window {\n    display: flex;\n    flex-direction: column;\n  }\n\n.container.interactive .content {\n    overflow: auto;\n    overscroll-behavior: contain;\n  }\n\n@supports (scrollbar-width: thin) {\n    .window .content {\n      scrollbar-width: thin;\n      scrollbar-color: var(--scrollbar-fg) var(--scrollbar-bg);\n    }\n  }\n\n@supports not (scrollbar-width: thin) {\n    .window .content::-webkit-scrollbar {\n      width: 7px;\n      background-color: var(--scrollbar-bg);\n    }\n\n    .window .content::-webkit-scrollbar-thumb {\n      background-color: var(--scrollbar-fg);\n    }\n  }\n\n.window .status-bar-wrapper {\n    flex-grow: 1;\n\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n  }\n\n.window .status-bar-wrapper > :first-child {\n    flex-grow: 1;\n  }\n\n.window .status-bar-wrapper > .status-bar {\n    flex-shrink: 0;\n  }\n\n.window .content {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n  }\n\n.window .content > :first-child {\n    flex-grow: 1;\n  }\n\n.window {\n    font-size: var(--base-font-size);\n  }\n\n.window.font-large {\n    --base-font-size: var(--large-font-size);\n  }\n\n.window.font-xl {\n    --base-font-size: var(--xl-font-size);\n  }\n\n/* Tab bar */\n\n.tab-bar {\n    flex-shrink: 0;\n\n    display: flex;\n    padding: 0;\n    margin: 0;\n    /* Safari appears to need the following */\n    overflow: hidden;\n\n    background: var(--cell-highlight-bg);\n    color: var(--cell-highlight-fg);\n\n    /* Make sure we are above the content area. This is mostly needed when we are\n    * showing the copy overlay since the entry data might overflow its region in\n    * that case. */\n    z-index: 1;\n  }\n\n.tabs {\n    flex-grow: 1;\n    display: flex;\n    padding: 0;\n    margin: 0;\n  }\n\n.tabs .tab {\n    flex-grow: 1;\n    list-style: none;\n    font-size: calc(var(--base-font-size) * 0.8);\n    -webkit-user-select: none;\n    user-select: none;\n  }\n\n/* Make the tabs bigger in interactive mode so they are easier to click */\n\n.container.interactive .tabs .tab {\n    font-size: var(--base-font-size);\n  }\n\n/* Don't increase the tab font size too much or else it looks childish */\n\n.window.font-large .tabs .tab,\n  .window.font-xl .tabs .tab {\n    font-size: calc(var(--base-font-size) * 0.8);\n  }\n\n.tabs .tab button {\n    /* Reset button styles */\n    -webkit-appearance: none;\n    appearance: none;\n    background: transparent;\n    margin: 0;\n    border: 0;\n    font: inherit;\n    color: inherit;\n    cursor: pointer;\n\n    opacity: 0.7;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    padding: 0.5em 18px;\n    line-height: 1;\n    text-decoration: none;\n  }\n\n@media (max-width: 400px) {\n    .window[data-tab-side='top'] .tabs .tab button span:lang(en) {\n      font-size: calc(var(--base-font-size) * 0.7);\n    }\n  }\n\n@media (max-width: 350px) {\n    .window[data-tab-side='top'] .tabs .tab {\n      flex-grow: 0;\n    }\n    .window[data-tab-side='top'] .tabs .tab button span {\n      display: none;\n    }\n    .window[data-tab-side='top'] .tabs .tab button .icon {\n      margin-right: 0px;\n    }\n  }\n\n.container.interactive .tabs .tab button {\n    padding: 0.7em 18px;\n  }\n\n.tabs .tab button .icon {\n    display: block;\n    width: 12px;\n    height: 12px;\n    margin-right: 5px;\n    /* Push the icon up a little so it looks more aligned with the text */\n    margin-bottom: 1px;\n    fill: currentcolor;\n  }\n\n.container.interactive .tabs .tab button .icon {\n    width: 14px;\n    height: 14px;\n  }\n\n.tabs .tab[aria-selected] {\n    background: var(--bg-color);\n  }\n\n.tabs .tab[aria-selected] button {\n    color: var(--text-color);\n  }\n\n.tabs .tab:not([aria-selected]) button {\n    opacity: 0.8;\n    color: var(--cell-highlight-fg);\n  }\n\n.tabs .tab:not([aria-selected]):hover {\n    filter: brightness(1.1);\n  }\n\n.tabs .tab:not([aria-selected]):hover button {\n    opacity: 1;\n  }\n\n.tabs .tab.disabled {\n    opacity: 0.3;\n    pointer-events: none;\n  }\n\n.container:not(.interactive) .settings,\n  .container:not(.interactive) .pin,\n  .container:not(.interactive) .close {\n    display: none;\n  }\n\n.tab-bar .settings,\n  .tab-bar .pin,\n  .tab-bar .close {\n    flex-shrink: 0;\n    align-self: center;\n    margin: 2px;\n  }\n\n.window .close-button-wrapper {\n    flex-grow: 1;\n\n    display: flex;\n    overflow: auto;\n  }\n\n.window .close-button-wrapper .close {\n    z-index: 1;\n    flex: 0 0 auto;\n    margin: 4px;\n    /* Drop margin since the meta element should have sufficient padding */\n    margin-left: 0px;\n  }\n\n/*\n  * The following uses .close .close-button because we have two configurations:\n  * a) The close button is a child of the tab bar\n  * b) The close button is a child of the close-button-wrapper\n  */\n\n.settings-button,\n  .pin-button,\n  .close .close-button {\n    appearance: none;\n    border: none;\n    line-height: 1;\n    padding: 6px;\n    border-radius: 20px;\n    color: var(--text-color);\n  }\n\n.settings-button,\n  .pin-button {\n    cursor: pointer;\n    background: transparent;\n  }\n\n.settings-button:hover,\n  .pin-button:hover,\n  .close .close-button {\n    background: var(--bg-color);\n  }\n\n.settings-button:hover,\n  .pin-button:hover,\n  .close .close-button:hover {\n    filter: brightness(1.1);\n  }\n\n.settings-button svg,\n  .pin-button svg,\n  .close .close-button svg {\n    display: block;\n    width: 15px;\n    height: 15px;\n    stroke: currentColor;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-opacity: 0.7;\n    fill-opacity: 0.7;\n    fill: none;\n  }\n\n.settings-button svg,\n  .pin-button svg {\n    stroke-width: 2px;\n  }\n\n.close .close-button svg {\n    stroke-width: 5px;\n  }\n\n.settings-button:hover svg,\n  .pin-button:hover svg,\n  .close .close-button:hover svg {\n    stroke-opacity: 1;\n    fill-opacity: 1;\n  }\n\n.container.pinned .pin-button svg path {\n    fill: currentColor;\n  }\n\n/* Tab bar on the side */\n\n.container:not(.hidden) .window[data-tab-side='left'],\n  .container:not(.hidden) .window[data-tab-side='right'] {\n    display: flex;\n    flex-direction: row;\n  }\n\n.container .window[data-tab-side='left'] .tab-bar,\n  .container .window[data-tab-side='right'] .tab-bar {\n    flex-direction: column;\n    overflow: visible;\n  }\n\n.container .window[data-tab-side='right'] .tab-bar {\n    order: 1;\n  }\n\n.container .window[data-tab-side='left'] .tab-bar .tabs,\n  .container .window[data-tab-side='right'] .tab-bar .tabs {\n    display: flex;\n    flex-direction: column;\n  }\n\n.container .window[data-tab-side='left'] .tab-bar .settings,\n  .container .window[data-tab-side='right'] .tab-bar .settings {\n    margin-bottom: 0.5em;\n  }\n\n.container .window[data-tab-side='top'] .tab-bar .close {\n    margin-left: 1em;\n  }\n\n.container .window[data-tab-side='left'] .tab-bar .close,\n  .container .window[data-tab-side='right'] .tab-bar .close {\n    order: -1;\n    margin-top: 0.5em;\n    margin-bottom: 1em;\n  }\n\n.container .window[data-tab-side='left'] .tabs .tab,\n  .container .window[data-tab-side='right'] .tabs .tab {\n    flex-grow: 0;\n  }\n\n.container .window[data-tab-side='left'] .tabs .tab button,\n  .container .window[data-tab-side='right'] .tabs .tab button {\n    padding: 0.7em;\n  }\n\n.container .window[data-tab-side='left'] .tabs .tab button svg,\n  .container .window[data-tab-side='right'] .tabs .tab button svg {\n    margin: 0;\n  }\n\n.container .window[data-tab-side='left'] .tabs .tab button span,\n  .container .window[data-tab-side='right'] .tabs .tab button span {\n    display: none;\n  }\n\n/* Expandable container */\n\n.window .content .expandable {\n    overflow: auto;\n    overscroll-behavior: contain;\n    scrollbar-gutter: stable;\n  }\n\n@supports (scrollbar-width: thin) {\n    .window .content .expandable {\n      scrollbar-width: thin;\n      scrollbar-color: var(--scrollbar-fg) var(--scrollbar-bg);\n    }\n  }\n\n@supports not (scrollbar-width: thin) {\n    .window .content .expandable::-webkit-scrollbar {\n      width: 7px;\n      background-color: var(--scrollbar-bg);\n    }\n\n    .window .content .expandable::-webkit-scrollbar-thumb {\n      background-color: var(--scrollbar-fg);\n    }\n  }\n\n.window .content .expandable .fold-point {\n    display: contents;\n  }\n\n/* Expand button */\n\n.window .content .expand-button {\n    /* Box layout */\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    padding: 8px;\n\n    /* Positioning */\n    position: sticky;\n    bottom: 0;\n\n    /* Reset button styles */\n    appearance: none;\n    border: 0;\n    margin: 0;\n    cursor: pointer;\n    font: inherit;\n    line-height: 1;\n    text-decoration: none;\n\n    /* Colors */\n    background: linear-gradient(\n      to bottom,\n      rgba(var(--bg-rgb), 0.3),\n      var(--bg-color) 80%\n    );\n    color: rgba(var(--expand-button-rgb), 0.8);\n  }\n\n.window .content {\n    /* Extra space to add to the end of the content so the expand button doesn't\n    * overlap with the last entry. */\n    --expand-button-allowance: 35px;\n  }\n\n.window .content .expand-button:hover {\n    color: var(--expand-button-color);\n    /* Use outline instead of border so it doesn't affect the layout (even if we\n    * try to reserve space for the border using a transparent border it will not\n    * blend with the underlying element since you can't have a fully transparent\n    * border on a non-transparent background. */\n    outline: 1px var(--expand-button-color) dotted;\n    background: linear-gradient(\n      to bottom,\n      rgba(var(--bg-rgb), 0.8),\n      var(--bg-color) 80%\n    );\n  }\n\n.window .content .expand-button .icon {\n    width: 16px;\n    height: 16px;\n    flex-grow: 1;\n  }\n\n.window .content .expand-button kbd {\n    color: var(--expand-button-color);\n    font-family: monospace;\n    font-weight: 800;\n    padding: 0.1rem 0.2rem;\n    border-radius: 0.2rem;\n    background: rgba(255, 255, 255, 0.1);\n    border: 1px solid var(--expand-button-color) !important;\n  }\n\n/* Word display */\n\n.wordlist {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    margin-top: 8px;\n    margin-bottom: 8px;\n  }\n\n.wordlist .entry {\n    scroll-snap-align: start;\n    /* This matches the margin at the top of the word list */\n    scroll-margin-top: 8px;\n    scroll-margin-bottom: var(--expand-button-allowance);\n  }\n\n.entry,\n  .more {\n    padding: 4px 14px;\n  }\n\n.window.font-large .wordlist {\n    gap: 12px;\n  }\n\n.window.font-xl .wordlist {\n    gap: 16px;\n  }\n\n.entry,\n  .entry * {\n    line-height: 1.3;\n  }\n\n.w-kanji {\n    font-size: calc(20 / 14 * var(--base-font-size));\n    margin-right: 0.7em;\n    color: var(--primary-highlight);\n  }\n\n.w-kanji .dimmed,\n  .w-kanji .separator,\n  .w-kana .dimmed,\n  .w-kana .separator {\n    opacity: 0.6;\n  }\n\n.w-kanji .wk-level,\n  .w-kanji .bp-tag,\n  .w-kana .bp-tag {\n    display: inline-block;\n    font-size: calc(10 / 14 * var(--base-font-size));\n    border-radius: 3px;\n    margin-left: 0.5em;\n    margin-right: 0.5em;\n    padding: 3px 3px 2px;\n    line-height: 1;\n    white-space: nowrap;\n    transform: translateY(-3px);\n  }\n\n.w-kanji .wk-level {\n    color: var(--primary-highlight);\n    border: 1px solid var(--primary-highlight);\n    text-underline-offset: 2px;\n  }\n\n/*\n   * Make sure to only show the dotted link underline when the popup is\n   * interactive.\n   */\n\n.w-kanji .wk-level,\n  .w-kanji .wk-level::before {\n    text-decoration: none;\n  }\n\n.container.interactive .w-kanji .wk-level,\n  .container.interactive .w-kanji .wk-level::before {\n    text-decoration: underline dotted;\n  }\n\n.w-kanji .wk-level::before {\n    display: inline-block;\n    content: 'WK';\n    margin-right: 0.2em;\n  }\n\n.window .entry.-selected .w-kanji .wk-level {\n    border-color: var(--selected-highlight);\n  }\n\n@media (hover) {\n    .container.interactive .w-kanji .wk-level:hover {\n      background: color(from var(--selected-highlight) srgb r g b / 0.1);\n    }\n\n    .container.interactive .entry:hover .w-kanji .wk-level {\n      color: var(--selected-highlight);\n      border-color: var(--selected-highlight);\n    }\n  }\n\n.w-kanji .bp-tag.-vocab,\n  .w-kana .bp-tag.-vocab {\n    border: 1px solid var(--bunpro-vocab);\n    color: var(--bunpro-vocab);\n  }\n\n.w-kanji .bp-tag.-grammar,\n  .w-kana .bp-tag.-grammar {\n    border: 1px solid var(--bunpro-grammar);\n    color: var(--bunpro-grammar);\n  }\n\n.w-kanji .bp-tag .bp-src,\n  .w-kana .bp-tag .bp-src {\n    margin-left: 0.3em;\n    color: var(--bunpro-src);\n  }\n\n.w-kana {\n    font-size: calc(18 / 14 * var(--base-font-size));\n    margin-right: 0.3em;\n  }\n\n.w-kana > .w-heiban {\n    border-top: 1.5px dotted currentcolor !important;\n  }\n\n.w-kana > .w-binary {\n    /* Add a gap below so the border doesn't overlap with the definition */\n    display: inline-block;\n    margin-bottom: 0.2em;\n  }\n\n.w-kana > .w-binary > * {\n    /* Drop gaps between borders */\n    margin: 0;\n    /* Make room for the borders\n    * (and to compensate for the extra margin we added to the wrapper above) */\n    font-size: 90%;\n    border: 0 dotted currentcolor;\n    --border-width: 1.5px;\n  }\n\n.w-kana > .w-binary.-hi-contrast > * {\n    border-color: var(--hi-contrast-pitch-accent);\n    --border-width: 2px;\n  }\n\n.w-kana > .w-binary > .h-l {\n    border-top-width: var(--border-width);\n    border-right-width: var(--border-width);\n  }\n\n.w-kana > .w-binary > .l-h {\n    border-bottom-width: var(--border-width);\n    border-right-width: var(--border-width);\n  }\n\n.w-kana > .w-binary > .h {\n    border-top-width: var(--border-width);\n  }\n\n.w-kana > .w-binary > .l {\n    border-bottom-width: var(--border-width);\n  }\n\n.w-romaji {\n    font-size: var(--base-font-size);\n    margin-right: 0.3em;\n  }\n\n.w-kana + .w-romaji {\n    margin-left: 0.3em;\n  }\n\n.w-kana,\n  .w-romaji {\n    color: var(--reading-highlight);\n  }\n\n.w-kanji .w-head-info,\n  .w-kana .w-head-info {\n    margin-left: 0.3em;\n    font-size: calc(10 / 14 * var(--base-font-size));\n  }\n\n.w-kanji .svgicon,\n  .w-kana .svgicon {\n    display: inline-block;\n    width: 12px;\n    height: 12px;\n    margin-left: 3px;\n    margin-right: 3px;\n    fill: currentcolor;\n  }\n\n.w-kanji .svgicon path,\n  .w-kana .svgicon path {\n    fill: currentcolor;\n  }\n\n.w-conj {\n    font-size: calc(12 / 14 * var(--base-font-size));\n    color: var(--conj-color);\n  }\n\n.w-def {\n    font-size: var(--base-font-size);\n  }\n\n.w-def .w-inf {\n    font-size: calc(12 / 14 * var(--base-font-size));\n  }\n\n/* Give group headings a bit more space. They typically consist of a series of\n  * which can easily look cramped when there are tags on the line above or below\n  * it. */\n\n.w-def .w-group-head {\n    margin-top: 2px;\n    margin-bottom: 3px;\n  }\n\n/* Especially when we have group headings amongst other definitions, we want a\n  * bit more vertical space before they start. */\n\n.w-def ol + .w-group-head {\n    margin-top: 6px;\n  }\n\n.w-def ul {\n    padding-left: 1.5em;\n    margin: 0;\n  }\n\n/* Add a little breathing space between native language definitions and\n  * subsequent English definitions. */\n\n.w-def ul + .w-group-head,\n  .w-def ul + ol {\n    margin-top: 6px;\n  }\n\n.w-def ol {\n    padding-left: 1.5em;\n    list-style-type: decimal !important;\n    margin: 0;\n  }\n\n.w-def ol li {\n    list-style-type: decimal !important;\n    font-size: var(--base-font-size);\n    line-height: 1.5;\n  }\n\n.w-def ul li {\n    list-style-type: circle !important;\n    font-size: var(--base-font-size);\n    line-height: 1.5;\n  }\n\n.w-def.foreign,\n  .w-def .foreign {\n    opacity: 0.85;\n  }\n\n.w-def .w-type {\n    font-size: calc(12 / 14 * var(--base-font-size));\n  }\n\n.w-def .tag {\n    font-size: calc(10 / 14 * var(--base-font-size));\n    border: 1px solid var(--tag-border) !important;\n    border-radius: 3px;\n    margin-left: 0.5em;\n    padding: 0px 3px;\n    white-space: nowrap;\n  }\n\n.w-def .tag-fem {\n    background: var(--tag-pink);\n  }\n\n.w-def .tag-masc {\n    background: var(--tag-blue);\n  }\n\n.w-def .tag-place {\n    background: var(--tag-green);\n  }\n\n.w-def .w-field {\n    background: var(--tag-green);\n  }\n\n.w-def .w-misc {\n    background: var(--tag-blue);\n  }\n\n.w-def .w-dial {\n    background: var(--tag-pink);\n  }\n\n.w-def .w-pos,\n  .w-def .w-field,\n  .w-def .w-misc,\n  .w-def .w-dial {\n    margin-left: 0em;\n    margin-right: 0.5em;\n  }\n\n.w-def .w-lsrc,\n  .w-def .w-lsrc * {\n    font-size: calc(12 / 14 * var(--base-font-size));\n  }\n\n.window:not(.-has-overlay) .entry.-selected {\n    color: var(--selected-highlight);\n    background: var(--selected-bg);\n    border-radius: 2px;\n  }\n\n@media (hover) {\n    .container.interactive .entry:not(:hover) {\n      transition: background-color 0.08s ease-out;\n    }\n    .container.interactive .entry:hover {\n      color: var(--selected-highlight);\n      background: var(--hover-bg);\n      border-radius: 2px;\n      cursor: pointer;\n    }\n    .container.interactive .entry.-selected:hover {\n      background: var(--selected-bg);\n    }\n  }\n\n.window .entry.-selected .w-def .tag {\n    color: var(--selected-tag-color);\n    border-color: var(--selected-tag-border) !important;\n  }\n\n@media (hover) {\n    .container.interactive .entry:hover .w-def .tag {\n      color: var(--selected-tag-color);\n      border-color: var(--selected-tag-border) !important;\n    }\n  }\n\n.window .entry.-selected .w-kanji {\n    color: var(--selected-highlight);\n  }\n\n@media (hover) {\n    .container.interactive .entry:hover .w-kanji {\n      color: var(--selected-highlight);\n    }\n  }\n\n.window .entry.-selected .w-kana,\n  .window .entry.-selected .w-romaji {\n    color: var(--selected-reading-highlight);\n  }\n\n@media (hover) {\n    .container.interactive .entry:hover .w-kana,\n    .container.interactive .entry:hover .w-romaji {\n      color: var(--selected-reading-highlight);\n    }\n  }\n\n.window .entry.-selected .w-def,\n  .window .entry.-selected .w-def * {\n    color: var(--selected-def-color);\n  }\n\n@media (hover) {\n    .container.interactive .entry:hover .w-def,\n    .container.interactive .entry:hover .w-def * {\n      color: var(--selected-def-color);\n    }\n  }\n\n.window .entry.-selected .w-conj {\n    color: var(--selected-conj-color);\n  }\n\n@media (hover) {\n    .container.interactive .entry:hover .w-conj {\n      color: var(--selected-conj-color);\n    }\n  }\n\n.window .entry.-flash {\n    animation: tenten-ja-flash 0.5s;\n  }\n\n@keyframes tenten-ja-flash {\n    from {\n      background: white;\n      color: white;\n    }\n  }\n\n.title {\n    background: var(--title-bg);\n    color: var(--title-fg);\n    font-size: calc(10 / 14 * var(--base-font-size));\n    padding: 10px 14px 6px;\n    border-radius: 5px 5px 0 0;\n    margin-bottom: 3px;\n  }\n\n.name-table {\n    padding-bottom: 6px;\n    margin-top: 8px;\n  }\n\n.name-table.-multicol {\n    column-count: 2;\n    column-gap: 1em;\n  }\n\n.name-table.-multicol .entry {\n    /* Avoid column breaks within an entry */\n    page-break-inside: avoid;\n    break-inside: avoid;\n  }\n\n.name-table.-multicol .meta {\n    column-span: all;\n  }\n\n.name-table .entry {\n    margin-bottom: 3px;\n  }\n\n.name-table .w-def div {\n    margin-bottom: 2px;\n  }\n\n/* Kanji display */\n\n.kanjilist {\n    /*\n    * Make each kanji item have the same height so that when we scroll the next\n    * one into view it fits.\n    */\n    display: grid;\n    grid-auto-rows: 1fr;\n  }\n\n/*\n   * If the list has been expanded, however, there is no need to space the kanji\n   * items out evenly.\n   */\n\n.expandable.expanded .kanjilist {\n    grid-auto-rows: auto;\n  }\n\n/*\n   * Status bar\n   */\n\n.status-bar {\n    position: relative;\n    width: 100%;\n    background: var(--status-bg);\n    max-height: calc(4 * var(--base-font-size));\n  }\n\n.window.font-xl .status-bar {\n    font-size: calc(0.8 * var(--base-font-size));\n  }\n\n.status-bar > .status {\n    display: flex;\n    align-items: baseline;\n  }\n\n.status-bar > * {\n    padding: 5px 8px 5px;\n  }\n\n.status-bar.-subdued {\n    opacity: 0.7;\n  }\n\n.status-bar kbd {\n    color: rgb(10, 10, 10);\n    font-size: 0.8em;\n    font-family: monospace;\n    height: 1.2rem;\n    padding: 0.2rem;\n    border-radius: 0.2rem;\n    background: white;\n    border: 1px solid #909090 !important;\n  }\n\n.status-bar .spinner {\n    display: inline-block;\n    width: 12px;\n    height: 12px;\n    margin-right: 7px;\n    fill: currentcolor;\n    animation: spin-ccw 0.8s linear infinite;\n  }\n\n.window.-copy-finished .status-bar > .keys,\n  .window.-copy-error .status-bar > .keys {\n    animation: fade-out 0.4s linear forwards;\n  }\n\n.window.-copy-finished .status-bar > .status {\n    opacity: 0;\n    animation:\n      fade-in 0.4s linear forwards,\n      fade-out 0.3s 0.9s forwards;\n  }\n\n.window.-copy-finished .status-bar {\n    animation: roll-up 0.3s 1s forwards;\n  }\n\n@keyframes fade-out {\n    to {\n      opacity: 0;\n    }\n  }\n\n@keyframes fade-in {\n    to {\n      opacity: 1;\n    }\n  }\n\n@keyframes roll-up {\n    to {\n      max-height: 0;\n    }\n  }\n\n@keyframes spin-ccw {\n    to {\n      transform: rotate(-360deg);\n    }\n  }\n\n.window.-copy-error .status-bar > .status {\n    opacity: 0;\n    animation: fade-in 0.4s linear forwards;\n    background: rgba(255, 204, 204, 0.8);\n    color: #b43e3e;\n  }\n\n/*\n  * Bonus name\n  */\n\n.wordlist .bonus-name {\n    margin-top: 8px;\n    margin-bottom: 3px;\n    background: var(--meta-bg);\n    scroll-snap-align: start;\n    scroll-margin-top: 8px;\n  }\n\n.wordlist .bonus-name .more {\n    padding: 0px 14px;\n  }\n\n/*\n  * Meta information\n  */\n\n.wordlist .meta,\n  .name-table .meta {\n    margin-top: 8px;\n    margin-bottom: 3px;\n    padding: 3px 14px;\n    background: var(--meta-bg);\n    scroll-snap-align: start;\n    scroll-margin-top: 8px;\n  }\n\n.wordlist .meta:last-child,\n  .name-table .meta:last-child {\n    margin-bottom: 8px;\n  }\n\n.wordlist .meta.-metaonly {\n    background: transparent;\n  }\n\n.wordlist .meta.era,\n  .wordlist .meta.measure > *,\n  .name-table .meta.era,\n  .name-table .meta.measure > * {\n    display: flex;\n    align-items: baseline;\n  }\n\n.wordlist .meta .equals,\n  .name-table .meta .equals {\n    padding-left: 5px;\n    padding-right: 5px;\n  }\n\n/* Meta: currency */\n\n.meta.currency > .main {\n    font-size: calc(18 / 14 * var(--base-font-size));\n  }\n\n.meta.currency > .main .equation-part {\n    display: inline-flex;\n    align-items: baseline;\n  }\n\n.meta.currency .main .curr {\n    opacity: 0.6;\n    font-size: var(--base-font-size);\n    margin-right: 0.3em;\n  }\n\n.meta.currency > .timestamp {\n    opacity: 0.6;\n    font-size: calc(10 / 14 * var(--base-font-size));\n  }\n\n/* Meta: era */\n\n.meta.era .era-name,\n  .meta.era .era-name ruby,\n  .meta.era .equals,\n  .meta.era .seireki {\n    font-size: calc(22 / 14 * var(--base-font-size));\n  }\n\n.meta.era .era-name,\n  .meta.era .era-name * {\n    color: var(--primary-highlight);\n  }\n\n.meta.era .era-name rt {\n    font-size: calc(12 / 14 * var(--base-font-size));\n  }\n\n.meta.era .seireki {\n    color: var(--reading-highlight);\n  }\n\n/* Meta: measure */\n\n.meta.measure .main {\n    font-size: calc(18 / 14 * var(--base-font-size));\n  }\n\n.meta.measure .unit {\n    padding-left: 3px;\n  }\n\n.meta.measure .alt {\n    opacity: 0.6;\n    margin-top: 3px;\n  }\n\n/* Meta: number */\n\n.meta.number {\n    line-height: 1;\n    padding-bottom: 6px;\n    padding-top: 6px;\n  }\n\n/* Meta: shogi */\n\n.meta.shogi .label {\n    font-size: calc(10 / 14 * var(--base-font-size));\n    border: 1px solid var(--tag-border) !important;\n    border-radius: 3px;\n    margin-right: 0.5em;\n    padding: 0px 3px;\n    white-space: nowrap;\n  }\n\n/*\n  * Copy overlay for when the popup is interactive\n  */\n\n.copy-overlay {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    /* It's important to align to the top so that if the popup is very long we\n    * don't end up putting the copy buttons off screen somewhere. */\n    justify-content: start;\n    align-items: center;\n    padding-top: 24px;\n    padding-bottom: 24px;\n    isolation: isolate;\n    overflow: hidden;\n\n    /* We fade the background so we always want a dark foreground color here,\n    * regardless of the theme. */\n    color: #1d1a19;\n  }\n\n/* Blurring for the entry area when the copy overlay is showing */\n\n.window.-has-overlay .content .grid-stack > :first-child {\n    pointer-events: none;\n    filter: blur(20px);\n    transition: filter 0.3s ease-in-out;\n  }\n\n.window.-has-overlay .content .grid-stack > .copy-overlay {\n    background: hsla(0, 0%, 97%, 0.6);\n    transition: background-color 0.3s ease-in-out;\n  }\n\n/* If the overlay is showing, don't constrain the window height since it might\n  * mean that the buttons on the overlay get cut off. */\n\n.window.-has-overlay {\n    max-height: none;\n  }\n\n/* Let the size of the overlay determine the overall size of the popup contents.\n  *\n  * This prevents the window from suddenly getting very large when we drop the\n  * max-height definition above.\n  *\n  * Ideally we'd only do this if we were actually going to constrain the height\n  * anyway, but that's hard to detect so we just do this unconditionally and so\n  * far it seems to work ok. */\n\n.window.-has-overlay .content .grid-stack > .entry-data {\n    position: absolute;\n    width: 100%;\n  }\n\n.copy-overlay .copy-heading {\n    opacity: 0.8;\n  }\n\n.copy-overlay .copy-options {\n    max-width: 90%;\n    list-style: none;\n    margin: 0 8px;\n    padding: 0;\n  }\n\n.copy-overlay .copy-options li {\n    margin-top: 12px;\n    margin-bottom: 12px;\n  }\n\n/* Reset some button styles */\n\n.copy-overlay button {\n    -webkit-appearance: none;\n    appearance: none;\n    background: transparent;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font: inherit;\n    color: inherit;\n    cursor: pointer;\n  }\n\n.copy-overlay .copy-options li button {\n    font-size: calc(16 / 14 * var(--base-font-size));\n    font-weight: 600;\n    width: 100%;\n    min-height: 60px;\n    background: white;\n    padding: 8px 32px;\n    border-radius: 16px;\n    --shadow-color: 0deg 0% 0%;\n    box-shadow:\n      0.2px 0.6px 0.5px hsl(var(--shadow-color) / 0.12),\n      0.4px 1.2px 1.1px -1.5px hsl(var(--shadow-color) / 0.09),\n      1.4px 3.7px 3.3px -3px hsl(var(--shadow-color) / 0.06),\n      3.8px 10.3px 9.1px -4.4px hsl(var(--shadow-color) / 0.04);\n    border: 0.1px solid hsla(0deg, 0%, 0%, 0.1);\n  }\n\n.copy-overlay .copy-options .copy-preview {\n    margin-top: calc(4 / 14 * var(--base-font-size));\n    display: flex;\n    align-items: center;\n    white-space: nowrap;\n    color: #817470;\n    font-size: calc(12 / 14 * var(--base-font-size));\n    font-weight: 400;\n    max-width: 200px;\n    overflow: hidden;\n    -webkit-mask-image: linear-gradient(to right, black 180px, transparent);\n    mask-image: linear-gradient(to right, black 180px, transparent);\n  }\n\n.copy-overlay .copy-options .copy-preview .icon {\n    flex-shrink: 0;\n    width: 1.2em;\n    height: 1.2em;\n    margin-right: 6px;\n    opacity: 0.6;\n  }\n\n.copy-overlay .copy-options .copy-preview span {\n    min-width: 0;\n  }\n\n.copy-overlay .copy-options button.-icon-label,\n  .copy-overlay .cancel-button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    line-height: 1.5;\n  }\n\n.copy-overlay .copy-options button.-icon-label .icon,\n  .copy-overlay .cancel-button .icon {\n    width: 1.2em;\n    height: 1.2em;\n    margin-right: 6px;\n    margin-top: -0.2em;\n    opacity: 0.6;\n  }\n\n.copy-overlay .cancel-button {\n    padding: 12px 36px;\n    color: rgba(0, 0, 0, 0.4);\n  }\n\n/*\n  * Utility: grid stack\n  */\n\n.grid-stack,\n  .-stack {\n    display: grid;\n    grid-template-rows: [stack-start] auto [stack-end];\n  }\n\n.grid-stack > *,\n  .-stack > * {\n    grid-column: 1 / -1;\n    grid-row: stack-start / stack-end;\n  }\n\n/*\n  * Arrow\n  */\n\n.arrow {\n    position: absolute;\n    overflow: hidden;\n\n    /* Desired width of the arrow */\n    --arrow-width: 20px;\n\n    /*\n    * Amount of room to allow for the shadow.\n    */\n    --shadow-radius: 8px;\n    --shadow-margin: calc(var(--shadow-radius) / 2);\n\n    /*\n    * Crop the arrow region to show half the arrow plus allow room for margins.\n    */\n    width: calc(var(--arrow-width) + 2 * var(--shadow-margin));\n    height: calc(var(--arrow-width) / 2 + var(--shadow-margin));\n\n    z-index: 2147483647;\n  }\n\n.arrow.-left,\n  .arrow.-right {\n    width: calc(var(--arrow-width) / 2 + var(--shadow-margin));\n    height: calc(var(--arrow-width) + 2 * var(--shadow-margin));\n  }\n\n.arrow::before {\n    position: absolute;\n    content: '';\n\n    /* Make sure the border is included in the size. */\n    box-sizing: border-box;\n\n    /* Don't inherit any rounded corners. */\n    border-radius: 0;\n\n    /*\n    * When the box is rotated, it should have width <arrow-width>. That makes the\n    * length of one side of the box equal to:\n    *\n    *    (<arrow-width> / 2) / sin 45\n    */\n    --sin-45: 0.707106781;\n    --square-side: calc(var(--arrow-width) / 2 / var(--sin-45));\n    width: var(--square-side);\n    height: var(--square-side);\n\n    /*\n    * The rotated square will overshoot the left / top side and need to be\n    * shifted in by:\n    *\n    *   (<arrow-width> - <square side>) / 2\n    *\n    * But we also want to shift it in so that the box-shadow is not clipped when\n    * we clip the parent so we add a suitable margin for that.\n    */\n    --overhang: calc((var(--arrow-width) - var(--square-side)) / 2);\n    margin-left: calc(var(--overhang) + var(--shadow-margin));\n    margin-top: calc(var(--overhang) + var(--shadow-margin));\n\n    background: var(--bg-color);\n    border: 1px solid var(--border-color);\n  }\n\n.arrow.-bottom {\n    margin-top: -1px;\n  }\n\n.arrow.-bottom::before {\n    transform: rotate(45deg);\n    margin-top: calc(var(--square-side) / -2);\n    box-shadow:\n      0px 0.5px 0.5px rgba(100, 100, 100, 0.15),\n      2px 2px 1px rgba(100, 100, 100, 0.15),\n      4px 4px 8px rgba(100, 100, 100, 0.15);\n  }\n\n.arrow.-top {\n    margin-top: 1px;\n  }\n\n.arrow.-top::before {\n    transform: rotate(225deg);\n    box-shadow:\n      0px 0.5px 0.5px rgba(100, 100, 100, 0.15),\n      -1px 2px 1px rgba(100, 100, 100, 0.15);\n  }\n\n.arrow.-right {\n    margin-left: -1px;\n  }\n\n.arrow.-right::before {\n    transform: rotate(225deg);\n    margin-left: calc(var(--square-side) / -2);\n    box-shadow:\n      0px 0.5px 0.5px rgba(100, 100, 100, 0.15),\n      -2px 2px 1px rgba(100, 100, 100, 0.15),\n      -2px 2px 8px rgba(100, 100, 100, 0.15);\n  }\n\n.arrow.-left {\n    margin-left: 1px;\n  }\n\n.arrow.-left::before {\n    transform: rotate(45deg);\n  }\n\n.tp-pointer-events-none{\n  pointer-events: none;\n}\n\n.-tp-mx-1{\n  margin-left: calc(calc(0.25 * var(--base-font-size)) * -1);\n  margin-right: calc(calc(0.25 * var(--base-font-size)) * -1);\n}\n\n.-tp-mx-3{\n  margin-left: calc(calc(0.75 * var(--base-font-size)) * -1);\n  margin-right: calc(calc(0.75 * var(--base-font-size)) * -1);\n}\n\n.-tp-mx-\\[--bg-overhang\\]{\n  margin-left: calc(var(--bg-overhang) * -1);\n  margin-right: calc(var(--bg-overhang) * -1);\n}\n\n.-tp-mt-1\\.5{\n  margin-top: calc(calc(0.375 * var(--base-font-size)) * -1);\n}\n\n.tp-mb-1{\n  margin-bottom: calc(0.25 * var(--base-font-size));\n}\n\n.tp-ml-2{\n  margin-left: calc(0.5 * var(--base-font-size));\n}\n\n.tp-mt-1\\.5{\n  margin-top: calc(0.375 * var(--base-font-size));\n}\n\n.tp-block{\n  display: block;\n}\n\n.tp-flex{\n  display: flex;\n}\n\n.tp-grid{\n  display: grid;\n}\n\n.tp-h-\\[12px\\]{\n  height: 12px;\n}\n\n.tp-h-big-kanji{\n  height: calc(60 / 14 * var(--base-font-size));\n}\n\n.tp-w-\\[12px\\]{\n  width: 12px;\n}\n\n.tp-w-\\[calc\\(100\\%\\+2\\*var\\(--bg-overhang\\)\\)\\]{\n  width: calc(100% + 2 * var(--bg-overhang));\n}\n\n.tp-w-big-kanji{\n  width: calc(60 / 14 * var(--base-font-size));\n}\n\n.tp-grow{\n  flex-grow: 1;\n}\n\n.tp-border-collapse{\n  border-collapse: collapse;\n}\n\n.tp-cursor-pointer{\n  cursor: pointer;\n}\n\n.tp-grid-cols-\\[repeat\\(2\\,minmax\\(200px\\,1fr\\)\\)\\]{\n  grid-template-columns: repeat(2,minmax(200px,1fr));\n}\n\n.tp-flex-col{\n  flex-direction: column;\n}\n\n.tp-items-start{\n  align-items: flex-start;\n}\n\n.tp-items-center{\n  align-items: center;\n}\n\n.tp-justify-between{\n  justify-content: space-between;\n}\n\n.tp-gap-1\\.5{\n  gap: calc(0.375 * var(--base-font-size));\n}\n\n.tp-gap-2{\n  gap: calc(0.5 * var(--base-font-size));\n}\n\n.tp-gap-3{\n  gap: calc(0.75 * var(--base-font-size));\n}\n\n.tp-gap-3\\.5{\n  gap: calc(0.875 * var(--base-font-size));\n}\n\n.tp-gap-\\[20px\\]{\n  gap: 20px;\n}\n\n.tp-gap-x-2{\n  column-gap: calc(0.5 * var(--base-font-size));\n}\n\n.tp-rounded{\n  border-radius: calc(0.25 * var(--base-font-size));\n}\n\n.tp-rounded-lg{\n  border-radius: calc(0.5 * var(--base-font-size));\n}\n\n.tp-rounded-md{\n  border-radius: calc(0.375 * var(--base-font-size));\n}\n\n.tp-rounded-e-md{\n  border-start-end-radius: calc(0.375 * var(--base-font-size));\n  border-end-end-radius: calc(0.375 * var(--base-font-size));\n}\n\n.tp-rounded-s-md{\n  border-start-start-radius: calc(0.375 * var(--base-font-size));\n  border-end-start-radius: calc(0.375 * var(--base-font-size));\n}\n\n.tp-border{\n  border-width: 1px;\n}\n\n.tp-border-solid{\n  border-style: solid;\n}\n\n.tp-border-current{\n  border-color: currentColor;\n}\n\n.tp-bg-\\[--cell-highlight-bg\\]{\n  background-color: var(--cell-highlight-bg);\n}\n\n.tp-fill-\\[--primary-highlight\\]{\n  fill: var(--primary-highlight);\n}\n\n.tp-fill-\\[--text-color\\]{\n  fill: var(--text-color);\n}\n\n.tp-fill-current{\n  fill: currentColor;\n}\n\n.tp-stroke-\\[--primary-highlight\\]{\n  stroke: var(--primary-highlight);\n}\n\n.tp-px-1{\n  padding-left: calc(0.25 * var(--base-font-size));\n  padding-right: calc(0.25 * var(--base-font-size));\n}\n\n.tp-px-1\\.5{\n  padding-left: calc(0.375 * var(--base-font-size));\n  padding-right: calc(0.375 * var(--base-font-size));\n}\n\n.tp-px-3{\n  padding-left: calc(0.75 * var(--base-font-size));\n  padding-right: calc(0.75 * var(--base-font-size));\n}\n\n.tp-px-5{\n  padding-left: calc(1.25 * var(--base-font-size));\n  padding-right: calc(1.25 * var(--base-font-size));\n}\n\n.tp-px-\\[--bg-overhang\\]{\n  padding-left: var(--bg-overhang);\n  padding-right: var(--bg-overhang);\n}\n\n.tp-py-0\\.5{\n  padding-top: calc(0.125 * var(--base-font-size));\n  padding-bottom: calc(0.125 * var(--base-font-size));\n}\n\n.tp-py-1{\n  padding-top: calc(0.25 * var(--base-font-size));\n  padding-bottom: calc(0.25 * var(--base-font-size));\n}\n\n.tp-py-3{\n  padding-top: calc(0.75 * var(--base-font-size));\n  padding-bottom: calc(0.75 * var(--base-font-size));\n}\n\n.tp-pt-2{\n  padding-top: calc(0.5 * var(--base-font-size));\n}\n\n.tp-text-center{\n  text-align: center;\n}\n\n.tp-align-top{\n  vertical-align: top;\n}\n\n.tp-text-base{\n  font-size: var(--base-font-size);\n  line-height: calc(1.5 * var(--base-font-size));\n}\n\n.tp-text-big-kanji{\n  font-size: calc(60 / 14 * var(--base-font-size));\n  line-height: 1;\n}\n\n.tp-text-sm{\n  font-size: calc(12 / 14 * var(--base-font-size));\n  line-height: calc(1.25 * var(--base-font-size));\n}\n\n.tp-text-smish{\n  font-size: calc(13 / 14 * var(--base-font-size));\n  line-height: calc(1.4 * var(--base-font-size));\n}\n\n.tp-text-xs{\n  font-size: calc(11 / 14 * var(--base-font-size));\n  line-height: var(--base-font-size);\n}\n\n.tp-italic{\n  font-style: italic;\n}\n\n.tp-leading-normal{\n  line-height: 1.5;\n}\n\n.tp-leading-snug{\n  line-height: 1.375;\n}\n\n.tp-text-\\[--cell-highlight-fg\\]{\n  color: var(--cell-highlight-fg);\n}\n\n.tp-text-\\[--cell-link-fg\\]{\n  color: var(--cell-link-fg);\n}\n\n.tp-text-\\[--okurigana-color\\]{\n  color: var(--okurigana-color);\n}\n\n.tp-text-\\[--primary-highlight\\]{\n  color: var(--primary-highlight);\n}\n\n.tp-text-\\[--reading-highlight\\]{\n  color: var(--reading-highlight);\n}\n\n.tp-text-\\[--reading-label\\]{\n  color: var(--reading-label);\n}\n\n.tp-text-\\[--text-color\\]{\n  color: var(--text-color);\n}\n\n.tp-underline-offset-2{\n  text-underline-offset: 2px;\n}\n\n.tp-opacity-30{\n  opacity: 0.3;\n}\n\n.tp-opacity-50{\n  opacity: 0.5;\n}\n\n.tp-opacity-70{\n  opacity: 0.7;\n}\n\n.tp-transition-\\[d\\]{\n  transition-property: d;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.tp-transition-transform{\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.tp-delay-100{\n  transition-delay: 100ms;\n}\n\n.tp-delay-\\[400ms\\]{\n  transition-delay: 400ms;\n}\n\n.tp-delay-\\[450ms\\]{\n  transition-delay: 450ms;\n}\n\n.tp-duration-500{\n  transition-duration: 500ms;\n}\n\n.\\[--bg-overhang\\:8px\\]{\n  --bg-overhang: 8px;\n}\n\n.\\[text-shadow\\:var\\(--shadow-color\\)_1px_1px_4px\\]{\n  text-shadow: var(--shadow-color) 1px 1px 4px;\n}\n\n.\\*\\:tp-grow > *{\n  flex-grow: 1;\n}\n\n.\\*\\:tp-bg-\\[--cell-highlight-bg\\] > *{\n  background-color: var(--cell-highlight-bg);\n}\n\n.\\*\\:tp-py-1 > *{\n  padding-top: calc(0.25 * var(--base-font-size));\n  padding-bottom: calc(0.25 * var(--base-font-size));\n}\n\n.\\*\\:tp-align-top > *{\n  vertical-align: top;\n}\n\n.\\*\\:tp-text-\\[--cell-highlight-fg\\] > *{\n  color: var(--cell-highlight-fg);\n}\n\n.hover\\:tp-bg-\\[--cell-bg-hover\\]:hover{\n  background-color: var(--cell-bg-hover);\n}\n\n.tp-peer:hover ~ .peer-hover\\:tp-opacity-100{\n  opacity: 1;\n}\n\n@keyframes tp-flash{\n\n  from{\n    background: white;\n    color: white;\n  }\n}\n\n[data-type=\"window\"]:not([data-has-overlay]) .no-overlay\\:tp-animate-flash{\n  animation: tp-flash 0.5s;\n}\n\n[data-type=\"window\"]:not([data-has-overlay]) .no-overlay\\:tp-bg-\\[--selected-bg\\]{\n  background-color: var(--selected-bg);\n}\n\n[data-type=\"window\"]:not([data-has-overlay]) .no-overlay\\:tp-stroke-\\[--selected-highlight\\]{\n  stroke: var(--selected-highlight);\n}\n\n[data-type=\"window\"]:not([data-has-overlay]) .no-overlay\\:tp-text-\\[--selected-highlight\\]{\n  color: var(--selected-highlight);\n}\n\n@media (hover){\n\n  .hh\\:tp-transition-colors{\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transition-duration: 150ms;\n  }\n\n  .hh\\:tp-ease-out{\n    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n\n  .hh\\:hover\\:tp-cursor-pointer:hover{\n    cursor: pointer;\n  }\n\n  .hh\\:hover\\:tp-bg-\\[--hover-bg\\]:hover{\n    background-color: var(--hover-bg);\n  }\n\n  .hh\\:hover\\:tp-fill-\\[--primary-highlight\\]:hover{\n    fill: var(--primary-highlight);\n  }\n\n  .hh\\:hover\\:tp-text-\\[--selected-highlight\\]:hover{\n    color: var(--selected-highlight);\n  }\n\n  .hh\\:hover\\:tp-opacity-100:hover{\n    opacity: 1;\n  }\n\n  .hh\\:hover\\:tp-transition-none:hover{\n    transition-property: none;\n  }\n\n  .tp-group:hover .hh\\:group-hover\\:tp-stroke-\\[--selected-highlight\\]{\n    stroke: var(--selected-highlight);\n  }\n}\n";
    // CONCATENATED MODULE: ./src/content/popup/status.ts
    function renderCopyDetails({copyNextKey, copyState, series}) {
      if (copyState.kind === "inactive") return null;
      // In interactive mode, we only use the status bar to show the finished and
      // error states.
            if (copyState.mode !== "keyboard" && copyState.kind === "active") return null;
      const statusDiv = html("div", {
        class: "status-bar -stack",
        lang: getLangTag()
      });
      if (copyState.mode === "keyboard") {
        const keysDiv = html("div", {
          class: "keys"
        }, browser_polyfill_default().i18n.getMessage("content_copy_keys_label") + " ");
        statusDiv.append(keysDiv);
        const copyKeys = CopyKeys.map((({key, type, popupString}) => {
          if (type === "word" && series === "kanji") return {
            key,
            l10nKey: CopyKanjiKeyStrings.popupString
          }; else return {
            key,
            l10nKey: popupString
          };
        }));
        copyKeys.push({
          key: copyNextKey,
          l10nKey: CopyNextKeyStrings.popupString
        });
        for (const copyKey of copyKeys) {
          keysDiv.append(html("kbd", {}, copyKey.key), " = " + browser_polyfill_default().i18n.getMessage(copyKey.l10nKey));
          if (copyKey.key !== copyNextKey) keysDiv.append(", ");
        }
      }
      if (copyState.kind === "finished") statusDiv.append(renderCopyStatus(getCopiedString(copyState.type))); else if (copyState.kind === "error") statusDiv.append(renderCopyStatus(browser_polyfill_default().i18n.getMessage("content_copy_error")));
      return statusDiv;
    }
    function getCopiedString(target) {
      switch (target) {
       case "entry":
        return browser_polyfill_default().i18n.getMessage("content_copied_entry");

       case "tab":
        return browser_polyfill_default().i18n.getMessage("content_copied_fields");

       case "word":
        return browser_polyfill_default().i18n.getMessage("content_copied_word");
      }
    }
    function renderCopyStatus(message) {
      return html("div", {
        class: "status"
      }, message);
    }
    function renderUpdatingStatus() {
      const statusDiv = html("div", {
        class: "status-bar -subdued",
        lang: getLangTag()
      });
      const statusText = html("div", {
        class: "status"
      });
      const spinner = renderSpinner();
      spinner.classList.add("spinner");
      statusText.append(spinner, browser_polyfill_default().i18n.getMessage("content_database_updating"));
      statusDiv.append(statusText);
      return statusDiv;
    }
    // CONCATENATED MODULE: ./src/content/popup/swipe.ts
    function onHorizontalSwipe(element, handler) {
      // Min x distance traveled to be considered swipe
      const xMinThreshold = 50;
      // Max y distance that can be traveled before
      // it's no longer considered a horizontal swipe
            const yMaxThreshold = 100;
      // Max time allowed to travel that distance
            const allowedTime = 200;
      let startTime = 0;
      let startX;
      let startY;
      element.addEventListener("touchstart", (function(e) {
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
        startTime = performance.now();
      }), false);
      element.addEventListener("touchend", (function(e) {
        const touch = e.changedTouches[0];
        const deltaX = touch.pageX - startX;
        const deltaY = touch.pageY - startY;
        const elapsedTime = performance.now() - startTime;
        // Check that elapsed time is within specified, horizontal dist
        // traveled >= threshold, and vertical dist traveled <= 100
                const isSwipe = elapsedTime <= allowedTime && Math.abs(deltaX) >= xMinThreshold && Math.abs(deltaY) <= yMaxThreshold;
        if (isSwipe) handler(deltaX < 0 ? "right" : "left");
      }), false);
    }
    // CONCATENATED MODULE: ./src/content/popup/tabs.ts
    function renderTabBar({closeShortcuts, displayMode, enabledTabs, onClosePopup, onShowSettings, onSwitchDictionary, onTogglePin, pinShortcuts, selectedTab}) {
      const tabBar = html("div", {
        class: "tab-bar",
        lang: getLangTag()
      });
      tabBar.addEventListener("pointerup", (() => {}));
      const list = html("ul", {
        class: "tabs"
      });
      const sections = [ {
        series: "words",
        renderIcon: renderBook
      }, {
        series: "kanji",
        renderIcon: renderKanjiIcon
      }, {
        series: "names",
        renderIcon: renderPerson
      } ];
      for (const {series, renderIcon} of sections) {
        const li = html("li", {
          class: "tab",
          role: "presentation"
        });
        if (series === selectedTab) li.setAttribute("aria-selected", "true"); else if (!enabledTabs[series]) li.classList.add("disabled");
        // We use a button because if it's a link there will be a little tooltip
        // show in the corner of the browser when the user hovers over the tab.
                const button = html("button", {});
        if (series !== selectedTab && onSwitchDictionary) button.onclick = event => {
          event.preventDefault();
          onSwitchDictionary(series);
        };
        li.append(button);
        const icon = renderIcon();
        icon.classList.add("icon");
        button.append(icon);
        button.append(html("span", {}, browser_polyfill_default().i18n.getMessage(`tabs_${series}_label`)));
        list.append(li);
      }
      tabBar.append(list);
      // We don't want to show the pin on devices that don't have a mouse since it's
      // generally not useful there (and just takes up room).
      
      // If, however, the user somehow managed to get the popup into a pinned state,
      // we should show the icon just so they don't get confused (and can get out of
      // that state).
            const showPin = onTogglePin && (getMouseCapabilityMql()?.matches !== false || displayMode === "pinned");
      if (showPin) tabBar.append(renderPinButton(onTogglePin, pinShortcuts || []));
      // Firefox for Android has a bug that when calling
      // `browser.runtime.openOptionsPage` a new tab is opened but nothing is
      // displayed.
      
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1795449
      
      // Until that is fixed, we don't show the settings button on Firefox for
      // Android to avoid confusion.
            if (onShowSettings && !isFenix()) tabBar.append(renderSettingsButton(onShowSettings));
      if (onClosePopup) tabBar.append(renderCloseButton(onClosePopup, closeShortcuts || []));
      return tabBar;
    }
    function renderPinButton(onTogglePin, pinShortcuts) {
      const label = browser_polyfill_default().i18n.getMessage("popup_pin_label");
      const title = pinShortcuts.length ? `${label} (${pinShortcuts.join(" / ")})` : label;
      const pinButton = html("button", {
        "aria-label": label,
        title,
        class: "pin-button",
        type: "button"
      }, renderPin());
      pinButton.onclick = onTogglePin;
      return html("div", {
        class: "pin"
      }, pinButton);
    }
    function renderSettingsButton(onShowSettings) {
      const label = browser_polyfill_default().i18n.getMessage("popup_settings_label");
      const settingsButton = html("button", {
        "aria-label": label,
        title: label,
        class: "settings-button",
        type: "button"
      }, renderCog());
      settingsButton.onclick = onShowSettings;
      return html("div", {
        class: "settings"
      }, settingsButton);
    }
    // EXTERNAL MODULE: ./node_modules/.pnpm/@birchill+json-equalish@1.1.2/node_modules/@birchill/json-equalish/dist/index.js
        __webpack_require__("364");
    // CONCATENATED MODULE: ./node_modules/.pnpm/idb@8.0.0/node_modules/idb/build/index.js
    const instanceOfAny = (object, constructors) => constructors.some((c => object instanceof c));
    let idbProxyableTypes;
    let cursorAdvanceMethods;
    // This is a function to prevent it throwing up in node environments.
        function getIdbProxyableTypes() {
      return idbProxyableTypes || (idbProxyableTypes = [ IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction ]);
    }
    // This is a function to prevent it throwing up in node environments.
        function getCursorAdvanceMethods() {
      return cursorAdvanceMethods || (cursorAdvanceMethods = [ IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey ]);
    }
    const transactionDoneMap = new WeakMap;
    const transformCache = new WeakMap;
    const reverseTransformCache = new WeakMap;
    function promisifyRequest(request) {
      const promise = new Promise(((resolve, reject) => {
        const unlisten = () => {
          request.removeEventListener("success", success);
          request.removeEventListener("error", error);
        };
        const success = () => {
          resolve(wrap(request.result));
          unlisten();
        };
        const error = () => {
          reject(request.error);
          unlisten();
        };
        request.addEventListener("success", success);
        request.addEventListener("error", error);
      }));
      // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
      // is because we create many promises from a single IDBRequest.
            reverseTransformCache.set(promise, request);
      return promise;
    }
    function cacheDonePromiseForTransaction(tx) {
      // Early bail if we've already created a done promise for this transaction.
      if (transactionDoneMap.has(tx)) return;
      const done = new Promise(((resolve, reject) => {
        const unlisten = () => {
          tx.removeEventListener("complete", complete);
          tx.removeEventListener("error", error);
          tx.removeEventListener("abort", error);
        };
        const complete = () => {
          resolve();
          unlisten();
        };
        const error = () => {
          reject(tx.error || new DOMException("AbortError", "AbortError"));
          unlisten();
        };
        tx.addEventListener("complete", complete);
        tx.addEventListener("error", error);
        tx.addEventListener("abort", error);
      }));
      // Cache it for later retrieval.
            transactionDoneMap.set(tx, done);
    }
    let idbProxyTraps = {
      get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
          // Special handling for transaction.done.
          if (prop === "done") return transactionDoneMap.get(target);
          // Make tx.store return the only store in the transaction, or undefined if there are many.
                    if (prop === "store") return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
        }
        // Else transform whatever we get back.
                return wrap(target[prop]);
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      },
      has(target, prop) {
        if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) return true;
        return prop in target;
      }
    };
    function replaceTraps(callback) {
      idbProxyTraps = callback(idbProxyTraps);
    }
    function wrapFunction(func) {
      // Due to expected object equality (which is enforced by the caching in `wrap`), we
      // only create one new func per func.
      // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
      // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
      // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
      // with real promises, so each advance methods returns a new promise for the cursor object, or
      // undefined if the end of the cursor has been reached.
      if (getCursorAdvanceMethods().includes(func)) return function(...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        func.apply(unwrap(this), args);
        return wrap(this.request);
      };
      return function(...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
      };
    }
    function transformCachableValue(value) {
      if (typeof value === "function") return wrapFunction(value);
      // This doesn't return, it just creates a 'done' promise for the transaction,
      // which is later returned for transaction.done (see idbObjectHandler).
            if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
      if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
      // Return the same value back if we're not going to transform it.
            return value;
    }
    function wrap(value) {
      // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
      // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
      if (value instanceof IDBRequest) return promisifyRequest(value);
      // If we've already transformed this value before, reuse the transformed value.
      // This is faster, but it also provides object equality.
            if (transformCache.has(value)) return transformCache.get(value);
      const newValue = transformCachableValue(value);
      // Not all types are transformed.
      // These may be primitive types, so they can't be WeakMap keys.
            if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
      }
      return newValue;
    }
    const unwrap = value => reverseTransformCache.get(value)
    /**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */;
    const readMethods = [ "get", "getKey", "getAll", "getAllKeys", "count" ];
    const writeMethods = [ "put", "add", "delete", "clear" ];
    const cachedMethods = new Map;
    function getMethod(target, prop) {
      if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) return;
      if (cachedMethods.get(prop)) return cachedMethods.get(prop);
      const targetFuncName = prop.replace(/FromIndex$/, "");
      const useIndex = prop !== targetFuncName;
      const isWrite = writeMethods.includes(targetFuncName);
      if (
      // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
      !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) return;
      const method = async function(storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
        let target = tx.store;
        if (useIndex) target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
                return (await Promise.all([ target[targetFuncName](...args), isWrite && tx.done ]))[0];
      };
      cachedMethods.set(prop, method);
      return method;
    }
    replaceTraps((oldTraps => ({
      ...oldTraps,
      get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
      has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
    })));
    const advanceMethodProps = [ "continue", "continuePrimaryKey", "advance" ];
    const methodMap = {};
    const advanceResults = new WeakMap;
    const ittrProxiedCursorToOriginalProxy = new WeakMap;
    const cursorIteratorTraps = {
      get(target, prop) {
        if (!advanceMethodProps.includes(prop)) return target[prop];
        let cachedFunc = methodMap[prop];
        if (!cachedFunc) cachedFunc = methodMap[prop] = function(...args) {
          advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
        };
        return cachedFunc;
      }
    };
    async function* iterate(...args) {
      // tslint:disable-next-line:no-this-assignment
      let cursor = this;
      if (!(cursor instanceof IDBCursor)) cursor = await cursor.openCursor(...args);
      if (!cursor) return;
      cursor;
      const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
      ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
      // Map this double-proxy back to the original, so other cursor methods work.
            reverseTransformCache.set(proxiedCursor, unwrap(cursor));
      while (cursor) {
        yield proxiedCursor;
        // If one of the advancing methods was not called, call continue().
                cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
        advanceResults.delete(proxiedCursor);
      }
    }
    function isIteratorProp(target, prop) {
      return prop === Symbol.asyncIterator && instanceOfAny(target, [ IDBIndex, IDBObjectStore, IDBCursor ]) || prop === "iterate" && instanceOfAny(target, [ IDBIndex, IDBObjectStore ]);
    }
    replaceTraps((oldTraps => ({
      ...oldTraps,
      get(target, prop, receiver) {
        if (isIteratorProp(target, prop)) return iterate;
        return oldTraps.get(target, prop, receiver);
      },
      has(target, prop) {
        return isIteratorProp(target, prop) || oldTraps.has(target, prop);
      }
    })));
     new Map([ [ 12358, 12436 ], [ 12363, 12364 ], [ 12365, 12366 ], [ 12367, 12368 ], [ 12369, 12370 ], [ 12371, 12372 ], [ 12373, 12374 ], [ 12375, 12376 ], [ 12377, 12378 ], [ 12379, 12380 ], [ 12381, 12382 ], [ 12383, 12384 ], [ 12385, 12386 ], [ 12388, 12389 ], [ 12390, 12391 ], [ 12392, 12393 ], [ 12399, 12400 ], [ 12402, 12403 ], [ 12405, 12406 ], [ 12408, 12409 ], [ 12411, 12412 ], [ 12445, 12446 ], [ 12459, 12460 ], [ 12461, 12462 ], [ 12454, 12532 ], [ 12463, 12464 ], [ 12465, 12466 ], [ 12467, 12468 ], [ 12469, 12470 ], [ 12471, 12472 ], [ 12473, 12474 ], [ 12475, 12476 ], [ 12477, 12478 ], [ 12479, 12480 ], [ 12481, 12482 ], [ 12484, 12485 ], [ 12486, 12487 ], [ 12488, 12489 ], [ 12495, 12496 ], [ 12498, 12499 ], [ 12501, 12502 ], [ 12504, 12505 ], [ 12507, 12508 ], [ 12527, 12535 ], [ 12528, 12536 ], [ 12529, 12537 ], [ 12530, 12538 ], [ 12541, 12542 ] ]);
     new Map([ [ 12399, 12401 ], [ 12402, 12404 ], [ 12405, 12407 ], [ 12408, 12410 ], [ 12411, 12413 ], [ 12495, 12497 ], [ 12498, 12500 ], [ 12501, 12503 ], [ 12504, 12506 ], [ 12507, 12509 ] ]);
    // src/mora.ts
    var SKIP_FOR_MORA_COUNT = [ 12353, 12355, 12357, 12359, 12361, 12419, 12421, 12423, 12430, 12449, 12451, 12453, 12455, 12457, 12515, 12517, 12519, 12526 ];
    function countMora(text) {
      return [ ...text ].filter(((c, i) => i === 0 || !SKIP_FOR_MORA_COUNT.includes(c.codePointAt(0)))).length;
    }
    function moraSubstring(input, _start, _end) {
      let start = _start;
      let end = _end;
      if (start < 0) start = 0;
      if (typeof end !== "undefined" && end < 0) end = 0;
      const moraLength = countMora(input);
      if (start > moraLength) start = moraLength;
      if (typeof end !== "undefined" && end > moraLength) end = moraLength;
      if (start === end) return "";
      if (typeof end !== "undefined" && start > end) {
        const temp = end;
        end = start;
        start = temp;
      }
      let moraIndex = 0;
      let charStart = input.length;
      let charEnd;
      for (let i = 0; i < input.length; i++, moraIndex++) {
        if (moraIndex === start) {
          charStart = i;
          if (typeof end === "undefined") break;
        }
        if (moraIndex === end) {
          charEnd = i;
          break;
        }
        if (i < input.length - 1 && SKIP_FOR_MORA_COUNT.includes(input.codePointAt(i + 1))) i++;
      }
      return input.substring(charStart, charEnd);
    }
    // CONCATENATED MODULE: ./node_modules/.pnpm/@birchill+jpdict-idb@2.6.1/node_modules/@birchill/jpdict-idb/dist/index.js
    // src/abort-error.ts
    /* unused pure expression or super */ null && Error;
    // src/data-series.ts
        // src/database.ts
    // src/download.ts
    // src/download-error.ts
    /* unused pure expression or super */ null && Error;
    // src/download-version-info.ts
    // src/is-object.ts
        // src/validation-helpers.ts
    var safeInteger = () => refine(integer(), "safeInteger", (value => Number.isSafeInteger(value)))
    // src/download-version-info.ts
    ;
    var VersionInfoStruct = dist_type({
      major: dist_min(safeInteger(), 1),
      minor: dist_min(safeInteger(), 0),
      patch: dist_min(safeInteger(), 0),
      parts: optional(dist_min(safeInteger(), 1)),
      databaseVersion: optional(string()),
      dateOfCreation: nonempty(string())
    });
    record(string(), record(string(), VersionInfoStruct));
    dist_type({
      type: literal("header"),
      version: dist_type({
        major: dist_min(safeInteger(), 1),
        minor: dist_min(safeInteger(), 0),
        patch: dist_min(safeInteger(), 0),
        databaseVersion: optional(string()),
        dateOfCreation: nonempty(string())
      }),
      records: dist_min(safeInteger(), 0),
      part: optional(dist_min(safeInteger(), 0)),
      format: enums([ "patch", "full" ])
    });
    dist_type({
      _: enums([ "+", "-", "~" ])
    });
    // src/store.ts
    // src/quota-exceeded-error.ts
    Error;
    // src/store-types.ts
    // src/japanese.ts
        // src/download-types.ts
    var KanjiMetaSchema = dist_type({
      i: optional(array(string())),
      p: optional(array(string())),
      bv: optional(string()),
      bg: optional(string())
    });
    var AccentSchema = dist_type({
      i: dist_min(safeInteger(), 0),
      pos: optional(array(string()))
    });
    var ReadingMetaSchema = dist_type({
      i: optional(array(string())),
      p: optional(array(string())),
      app: optional(dist_min(safeInteger(), 0)),
      a: optional(union([ dist_min(safeInteger(), 0), array(AccentSchema) ])),
      bv: optional(string()),
      bg: optional(string())
    });
    var CrossReferenceSchema = union([ dist_type({
      k: nonempty(string()),
      sense: optional(dist_min(safeInteger(), 0))
    }), dist_type({
      r: nonempty(string()),
      sense: optional(dist_min(safeInteger(), 0))
    }), dist_type({
      k: nonempty(string()),
      r: string(),
      sense: optional(dist_min(safeInteger(), 0))
    }) ]);
    var LangSourceSchema = dist_type({
      lang: optional(nonempty(string())),
      src: optional(string()),
      // The following should be:
      //   part: s.optional(s.literal(true)),
      //   wasei: s.optional(s.literal(true)),
      // But Describe doesn't seem to handle optional boolean literals so we try
      // this way for now.
      part: union([ literal(true), literal(void 0) ]),
      wasei: union([ literal(true), literal(void 0) ])
    });
    var WordSenseSchema = dist_type({
      g: nonempty(array(nonempty(string()))),
      gt: optional(dist_min(safeInteger(), 1)),
      lang: optional(nonempty(string())),
      kapp: optional(dist_min(safeInteger(), 0)),
      rapp: optional(dist_min(safeInteger(), 0)),
      pos: optional(array(string())),
      field: optional(array(string())),
      misc: optional(array(string())),
      dial: optional(array(string())),
      inf: optional(nonempty(string())),
      xref: optional(nonempty(array(CrossReferenceSchema))),
      ant: optional(nonempty(array(CrossReferenceSchema))),
      lsrc: optional(nonempty(array(LangSourceSchema)))
    });
    var WordIdSchema = dist_min(safeInteger(), 1);
    dist_type({
      id: WordIdSchema,
      k: optional(nonempty(array(string()))),
      km: optional(nonempty(array(union([ literal(0), KanjiMetaSchema ])))),
      r: array(nonempty(nonempty(string()))),
      rm: optional(nonempty(array(union([ literal(0), ReadingMetaSchema ])))),
      s: array(WordSenseSchema)
    });
    dist_type({
      id: WordIdSchema
    });
    var NameTranslationSchema = dist_type({
      type: optional(array(string())),
      det: array(nonempty(string())),
      cf: optional(array(nonempty(string())))
    });
    var NameIdSchema = dist_min(safeInteger(), 1);
    dist_type({
      id: NameIdSchema,
      k: optional(array(nonempty(string()))),
      r: nonempty(array(nonempty(string()))),
      tr: array(NameTranslationSchema)
    });
    dist_type({
      id: NameIdSchema
    });
    var ReadingsStruct = dist_type({
      on: optional(array(string())),
      kun: optional(array(string())),
      na: optional(array(string())),
      py: optional(array(string()))
    });
    var RadicalStruct = dist_type({
      x: dist_min(safeInteger(), 0),
      nelson: optional(dist_min(safeInteger(), 0)),
      name: optional(array(string())),
      var: optional(string())
    });
    var MiscSchema = dist_type({
      gr: optional(safeInteger()),
      sc: dist_min(safeInteger(), 1),
      freq: optional(dist_min(safeInteger(), 0)),
      // The following three items should really have a minimum value of 1, but in
      // the interests of being (a bit) forgiving in what we accept, we allow 0 too.
      jlpt: optional(dist_min(safeInteger(), 0)),
      jlptn: optional(dist_min(safeInteger(), 0)),
      kk: optional(dist_min(safeInteger(), 0)),
      // As with jlpt(n), we allow 0 here even though we expect WaniKani levels to
      // be between 1 and 60.
      wk: optional(dist_min(safeInteger(), 0)),
      meta: optional(array(string()))
    });
    var KanjiIdSchema = nonempty(string());
    dist_type({
      c: KanjiIdSchema,
      r: ReadingsStruct,
      m: array(string()),
      m_lang: optional(string()),
      rad: RadicalStruct,
      refs: record(string(), union([ string(), dist_number() ])),
      misc: MiscSchema,
      st: optional(string()),
      comp: optional(string()),
      var: optional(array(string())),
      cf: optional(union([ string(), array(string()) ]))
    });
    dist_type({
      c: KanjiIdSchema
    });
    var RadicalIdSchema = nonempty(string());
    dist_type({
      id: RadicalIdSchema,
      r: dist_min(safeInteger(), 1),
      b: optional(nonempty(string())),
      k: optional(nonempty(string())),
      pua: optional(safeInteger()),
      s: safeInteger(),
      na: array(nonempty(string())),
      posn: optional(nonempty(string())),
      m: array(nonempty(string())),
      m_lang: optional(nonempty(string()))
    });
    dist_type({
      id: RadicalIdSchema
    });
    // src/grouping.ts
    function groupSenses(senses) {
      var _a;
      const groups = [];
      let previousPos;
      for (const sense of senses) if (previousPos && sense.pos && sense.pos.includes(previousPos) || !previousPos && groups.length && (!sense.pos || !sense.pos.length)) groups[groups.length - 1].senses.push(dropPos(sense, previousPos)); else {
        const thisPos = ((_a = sense.pos) == null ? void 0 : _a.length) ? sense.pos[0] : void 0;
        const pos = thisPos ? [ thisPos ] : [];
        groups.push({
          pos,
          misc: [],
          senses: [ dropPos(sense, thisPos) ]
        });
        previousPos = thisPos;
      }
      for (const group of groups) {
        let commonPos = group.senses[0].pos;
        if (!commonPos) continue;
        for (const sense of group.senses.slice(1)) {
          commonPos = commonPos.filter((pos => sense.pos && sense.pos.includes(pos)));
          if (!commonPos.length) break;
        }
        if (commonPos.length) {
          group.pos.push(...commonPos);
          group.senses = group.senses.map((sense => dropPos(sense, commonPos)));
        }
      }
      for (const group of groups) {
        let commonMisc = group.senses[0].misc;
        if (!commonMisc) continue;
        for (const sense of group.senses.slice(1)) {
          commonMisc = commonMisc.filter((misc => sense.misc && sense.misc.includes(misc)));
          if (!commonMisc.length) break;
        }
        if (commonMisc.length) {
          group.misc = commonMisc;
          group.senses = group.senses.map((sense => {
            var _a2;
            return {
              ...sense,
              misc: (_a2 = sense.misc) == null ? void 0 : _a2.filter((misc => !commonMisc.includes(misc)))
            };
          }));
        }
      }
      return groups;
    }
    function dropPos(sense, posToDrop) {
      let pos = sense.pos ? sense.pos.filter((pos2 => Array.isArray(posToDrop) ? !posToDrop.includes(pos2) : pos2 !== posToDrop)) : void 0;
      if (pos && !pos.length) pos = void 0;
      return {
        ...sense,
        pos
      };
    }
    // src/names.ts
        // src/offline-error.ts
    /* unused pure expression or super */ null && Error;
    // src/query.ts
    // src/to-word-result.ts
    // src/words.ts
        var GlossTypes = [ "none", "expl", "lit", "fig", "tm" ];
    var GLOSS_TYPE_MAX = GlossTypes.length;
    /* unused pure expression or super */ null && Math.floor(Math.log2(GLOSS_TYPE_MAX));
     new Map([ [ "i1", 50 ], 
    // Top 10,000 words minus i2 (from 1998) (P)
    [ "i2", 20 ], [ "n1", 40 ], 
    // Top 12,000 words in newspapers (from 2003?) (P)
    [ "n2", 20 ], 
    // Next 12,000
    [ "s1", 32 ], 
    // "Speculative" annotations? Seem pretty common to me. (P)
    [ "s2", 20 ], 
    // (P)
    [ "g1", 30 ], 
    // (P)
    [ "g2", 15 ] ]);
    if (typeof self === "object" && typeof self.requestIdleCallback === "function" && typeof self.cancelIdleCallback === "function") {
      self.requestIdleCallback;
      self.cancelIdleCallback;
    } else {
      0;
      0;
    }
    // src/uuid.ts
        // src/update-key.ts
     new Map;
     new Map;
    // CONCATENATED MODULE: ./src/utils/verb-tags.ts
    const proverbTag = "proverb";
    const verbTags = [ "v1", "v1-s", "v2a-s", "v4h", "v4r", "v5aru", "v5b", "v5g", "v5k", "v5k-s", "v5m", "v5n", "v5r", "v5r-i", "v5s", "v5t", "v5u", "v5u-s", "v5uru", "vz", "vi", "vk", "vn", "vr", "vs", "vs-c", "vs-s", "vs-i", "vt", "v-unspec", "v4k", "v4g", "v4s", "v4t", "v4n", "v4b", "v4m", "v2k-k", "v2g-k", "v2t-k", "v2d-k", "v2h-k", "v2b-k", "v2m-k", "v2y-k", "v2r-k", "v2k-s", "v2g-s", "v2s-s", "v2z-s", "v2t-s", "v2d-s", "v2n-s", "v2h-s", "v2b-s", "v2m-s", "v2y-s", "v2r-s", "v2w-s" ];
    function getFilteredTags(pos, misc) {
      if (pos === void 0) return [];
      if (misc === void 0) return pos;
      if (misc.includes(proverbTag)) return pos.filter((tag => !verbTags.includes(tag)));
      return pos;
    }
    // CONCATENATED MODULE: ./src/content/popup/words.ts
    function renderWordEntries({entries, matchLen, more, namePreview, options, title}) {
      const container = html("div", {
        class: "wordlist entry-data"
      });
      if (title) container.append(html("div", {
        class: "title",
        lang: "ja"
      }, title));
      // Pre-filter metadata
      
      // If we have word matches longer than shogi metadata we drop the shogi
      // metadata because the shogi shorthand in particular can turn up false
      // positives on words like ドクター and ドキュメンテーション.
            if (options.meta?.type === "shogi" && matchLen >= options.meta.matchLen) delete options.meta;
      if (options.meta) {
        const metadata = renderMetadata({
          fxData: options.fxData,
          preferredUnits: options.preferredUnits,
          isCombinedResult: true,
          matchLen,
          meta: options.meta
        });
        if (metadata) container.append(metadata);
      }
      const numNames = namePreview?.names.length ?? 0;
      const totalEntries = entries.length + numNames;
      const selectedIndex = getSelectedIndex(options.copyState, totalEntries);
      if (namePreview) container.append(renderNamePreview(namePreview, {
        copyKind: options.copyState.kind,
        onStartCopy: options.onStartCopy,
        selectedIndex
      }));
      let lastPointerType = "touch";
      let longestMatch = 0;
      for (const [index, entry] of entries.entries()) {
        // Work out where the fold is so we can make later entries appear in the
        // scrolled-out-of-view range.
        const matchLength = Math.max(...entry.k.filter((k => k.matchRange)).map((k => k.matchRange[1] - k.matchRange[0])), ...entry.r.filter((r => r.matchRange)).map((r => r.matchRange[1] - r.matchRange[0])), 0);
        if (matchLength < longestMatch) {
          container.append(html("div", {
            class: "fold-point"
          }));
          // Prevent adding any more fold points
                    longestMatch = -1 / 0;
        } else if (!longestMatch) longestMatch = matchLength;
        const entryDiv = html("div", {
          class: "entry"
        });
        container.append(entryDiv);
        if (index === selectedIndex - numNames) entryDiv.classList.add(options.copyState.kind === "active" ? "-selected" : "-flash");
        entryDiv.addEventListener("pointerup", (evt => {
          lastPointerType = evt.pointerType;
        }));
        entryDiv.addEventListener("click", (evt => {
          if (containerHasSelectedText(container)) return;
          // Don't trigger copy mode if we clicked a nested link
                    if (evt.target instanceof HTMLAnchorElement) return;
          const trigger = lastPointerType === "mouse" ? "mouse" : "touch";
          options.onStartCopy?.(index + numNames, trigger);
        }));
        const headingDiv = html("div", {});
        entryDiv.append(headingDiv);
        const matchedOnKana = entry.r.some((r => r.matchRange));
        // If we matched on a search-only kanji or kana headword we want to show it
        // prior to the main entry.
                const matchedOnlyOnSearchOnlyKanji = !matchedOnKana && entry.k.every((k => !k.match || k.i?.includes("sK")));
        const matchedOnlyOnSearchOnlyKana = matchedOnKana && entry.r.every((r => !r.match || r.i?.includes("sk")));
        const searchOnlyMatch = matchedOnKana ? matchedOnlyOnSearchOnlyKana ? entry.r.find((r => !!r.matchRange))?.ent : void 0 : matchedOnlyOnSearchOnlyKanji ? entry.k.find((k => !!k.matchRange))?.ent : void 0;
        if (searchOnlyMatch) {
          const searchOnlyDiv = html("div", {
            class: "tp-mb-1 tp-text-sm tp-opacity-70"
          }, browser_polyfill_default().i18n.getMessage("content_sk_match_src", searchOnlyMatch));
          headingDiv.append(searchOnlyDiv);
        }
        const kanjiHeadwords = entry.k ? entry.k.filter((k => !k.i?.includes("sK"))) : [];
        // If we matched on kana, then any headwords which are _not_ matches should
        // be hidden since they don't apply to the kana.
        
        // This is because we mostly only show matching kana headwords and so if we
        // start showing kanji that don't correspond to the kana headwords, the
        // result will be misleading.
        
        // For example, take the string さいだん. Entry 1385120 has readings
        // さいだん and せつだん but さいだん is specifically bound to the 截断
        // kanji.
        
        // As a result if we look up さいだん we'll mark the さいだん kana headword
        // as a match and the 截断 kanji headword too. As per our usual processing,
        // we'll only show the さいだん kana headword, however, not せつだん.
        
        // If we were also to show the unmatched 切断 kanji headword we'd end up
        // displaying:
        
        // 截断、切断  さいだん
        
        // which would be misleading since 切断 can never have that reading.
                const matchingKanji = matchedOnKana ? kanjiHeadwords.filter((k => k.match)) : kanjiHeadwords;
        // Sort matched kanji entries first
                matchingKanji.sort(((a, b) => Number(b.match) - Number(a.match)));
        if (matchingKanji.length) {
          const kanjiSpan = html("span", {
            class: "w-kanji",
            lang: "ja"
          });
          for (const [i, kanji] of matchingKanji.entries()) {
            if (i) kanjiSpan.append(html("span", {
              class: "separator"
            }, "\u3001"));
            let headwordSpan = kanjiSpan;
            const ki = new Set(kanji.i || []);
            if (// Always dim search-only kanji
            ki.has("sK") || // Dim the non-matching kanji unless there are none because we
            // matched only on search-only kanji headwords.
            !kanji.match && !matchedOnlyOnSearchOnlyKanji || // If we matched on the reading, dim any kanji headwords that are
            // irregular, old, or rare.
            matchedOnKana && (ki.has("iK") || ki.has("oK") || ki.has("rK"))) {
              const dimmedSpan = html("span", {
                class: "dimmed"
              });
              kanjiSpan.append(dimmedSpan);
              headwordSpan = dimmedSpan;
            }
            headwordSpan.append(kanji.ent);
            appendHeadwordInfo(kanji.i, headwordSpan);
            if (options.showPriority) appendPriorityMark(kanji.p, headwordSpan);
            if (options.waniKaniVocabDisplay !== "hide" && kanji.wk) appendWaniKaniLevelTag(kanji.wk, kanji.ent, headwordSpan);
            if (options.bunproDisplay && kanji.bv) appendBunproTag(kanji.bv, "vocab", headwordSpan);
            if (options.bunproDisplay && kanji.bg) appendBunproTag(kanji.bg, "grammar", headwordSpan);
          }
          headingDiv.append(kanjiSpan);
        }
        // Typically we only show the matching kana headwords but if we matched on
        // an irregular form or a search-only form, we should show the regular kana
        // headwords too, for reference.
        
        // For example, if we looked up ふんいき (雰囲気) we should only show that
        // headword, but if we looked up ふいんき, we should show the more correct
        // ふんいき too.
                const matchedOnIrregularKana = matchedOnKana && entry.r.every((r => !r.match || r.i?.includes("ik") || r.i?.includes("ok") || r.i?.includes("rk") || r.i?.includes("sk")));
        // For search-only kanji, we show them only if they are the ONLY matches.
                const matchingKana = entry.r.filter((r => !r.i?.includes("sk") && (r.match || matchedOnIrregularKana && !r.i?.includes("ik") && !r.i?.includes("ok") && !r.i?.includes("rk") && !r.i?.includes("sk"))));
        if (matchingKana.length) {
          const kanaSpan = html("span", {
            class: "w-kana",
            lang: "ja"
          });
          for (const [i, kana] of matchingKana.entries()) {
            if (i) kanaSpan.append(html("span", {
              class: "separator"
            }, "\u3001"));
            // Dim irrelevant headwords
                        let headwordSpan = kanaSpan;
            if (// If we looked up by kanji, dim any kana headwords that are
            // irregular, old, or rare.
            !matchedOnKana && (kana.i?.includes("ik") || kana.i?.includes("ok") || kana.i?.includes("rk"))) {
              const dimmedSpan = html("span", {
                class: "dimmed"
              });
              kanaSpan.append(dimmedSpan);
              headwordSpan = dimmedSpan;
            }
            headwordSpan.append(renderKana(kana, options));
            appendHeadwordInfo(kana.i, headwordSpan);
            if (options.showPriority) appendPriorityMark(kana.p, headwordSpan);
            if (options.bunproDisplay && kana.bv) appendBunproTag(kana.bv, "vocab", headwordSpan);
            if (options.bunproDisplay && kana.bg) appendBunproTag(kana.bg, "grammar", headwordSpan);
          }
          headingDiv.append(kanaSpan);
        }
        if (entry.romaji?.length) headingDiv.append(html("span", {
          class: "w-romaji",
          lang: "ja"
        }, entry.romaji.join(", ")));
        if (entry.reason) headingDiv.append(html("span", {
          class: "w-conj",
          lang: getLangTag()
        }, `(${entry.reason})`));
        if (options.showDefinitions) {
          // If we have hidden all the kanji headwords, then we shouldn't show
          // "usually kana" annotations on definitions.
          if (!matchingKanji.length) entry.s = entry.s.map((s => ({
            ...s,
            misc: s.misc?.filter((m => m !== "uk"))
          })));
          entryDiv.append(renderDefinitions(entry, options));
        }
      }
      if (more) container.append(html("div", {
        class: "more"
      }, "\u2026"));
      return container;
    }
    function renderNamePreview({names, more}, {copyKind, onStartCopy, selectedIndex}) {
      const container = html("div", {
        class: "bonus-name"
      });
      let lastPointerType = "touch";
      for (const [index, name] of names.entries()) {
        const nameEntry = renderName(name);
        if (index === selectedIndex) nameEntry.classList.add(copyKind === "active" ? "-selected" : "-flash");
        nameEntry.addEventListener("pointerup", (evt => {
          lastPointerType = evt.pointerType;
        }));
        nameEntry.addEventListener("click", (() => {
          if (containerHasSelectedText(container)) return;
          const trigger = lastPointerType === "mouse" ? "mouse" : "touch";
          onStartCopy?.(index, trigger);
        }));
        container.append(nameEntry);
      }
      if (more) container.append(html("span", {
        class: "more"
      }, "\u2026"));
      return container;
    }
    function appendHeadwordInfo(info, parent) {
      if (!info || !info.length) return;
      for (const i of info) {
        const span = html("span", {
          class: "w-head-info",
          lang: getLangTag()
        }, "(");
        // Some KanjiInfo/RadicalInfo values differ only by case but
        // addons-linter (as used by webext etc.) does not allow WebExtension i18n
        // keys to differ by case only.
        
        // I couldn't find the rationale for this, the rule just magically
        // appears in https://github.com/mozilla/addons-linter/commit/3923b399f8166b59617071730b87048f45122c7e
        // it seems.
                const specialKeys = {
          iK: "ikanji",
          ik: "ikana",
          oK: "okanji",
          ok: "okana",
          rK: "rkanji",
          rk: "rkana",
          // We normally don't show search-only kanji/kana headwords unless they are
          // exact matches. In those cases we should probably just indicate them as
          // "irregular" kanji/kana.
          sK: "ikanji",
          sk: "ikana"
        };
        const key = specialKeys.hasOwnProperty(i) ? specialKeys[i] : i;
        span.append(browser_polyfill_default().i18n.getMessage(`head_info_label_${key}`) || i, ")");
        parent.append(span);
      }
    }
    function appendPriorityMark(priority, parent) {
      if (!priority || !priority.length) return;
      // These are the ones that are annotated with a (P) in the EDICT file.
            const highPriorityLabelsSet = new Set(highPriorityLabels);
      const highPriority = priority.some((p => highPriorityLabelsSet.has(p)));
      parent.append(renderStar(highPriority ? "full" : "hollow"));
    }
    function appendWaniKaniLevelTag(level, ent, parent) {
      parent.append(html("a", {
        class: "wk-level",
        href: `https://wanikani.com/vocabulary/${encodeURIComponent(ent)}`,
        target: "_blank",
        rel: "noreferrer",
        title: browser_polyfill_default().i18n.getMessage("content_wk_link_title", ent)
      }, html("span", {}, String(level))));
    }
    function appendBunproTag(data, type, parent) {
      const label = browser_polyfill_default().i18n.getMessage(type === "vocab" ? "popup_bp_vocab_tag" : "popup_bp_grammar_tag", [ String(data.l) ]);
      const outerSpan = html("span", {
        class: `bp-tag -${type}`
      }, html("span", {}, label));
      if (data.src) outerSpan.append(html("span", {
        class: "bp-src"
      }, data.src));
      parent.append(outerSpan);
    }
    function renderKana(kana, options) {
      const accents = kana.a;
      if (options.accentDisplay === "none" || typeof accents === "undefined" || Array.isArray(accents) && !accents.length) return kana.ent;
      const accentPos = typeof accents === "number" ? accents : accents[0].i;
      if (options.accentDisplay === "downstep") if (!accentPos) 
      // accentPos 0 (heiban) is special since there's no accent to show.
      // At the same time we want to distinguish between heiban and
      // "no accent information". So we indicate heiban with a dotted line
      // across the top instead.
      return html("span", {
        class: "w-heiban"
      }, kana.ent); else return moraSubstring(kana.ent, 0, accentPos) + "\ua71c" + moraSubstring(kana.ent, accentPos);
      // Generate binary pitch display
            const wrapperSpan = html("span", {
        class: "w-binary"
      });
      if (options.accentDisplay === "binary-hi-contrast") wrapperSpan.classList.add("-hi-contrast");
      // Accent position 0 (heiban: LHHHHH) and accent position 1 (atamadaka: HLLLL)
      // are sufficiently similar that we handle them together.
            if (accentPos === 0 || accentPos === 1) {
        const len = countMora(kana.ent);
        wrapperSpan.append(html("span", {
          class: accentPos ? "h-l" : len > 1 ? "l-h" : "h"
        }, moraSubstring(kana.ent, 0, 1)));
        if (len > 1) wrapperSpan.append(html("span", {
          class: accentPos ? "l" : "h"
        }, moraSubstring(kana.ent, 1)));
      } else {
        // Otherwise we have nakadaka (LHHHHL) or odaka (LHHHH)
        wrapperSpan.append(html("span", {
          class: "l-h"
        }, moraSubstring(kana.ent, 0, 1)));
        wrapperSpan.append(html("span", {
          class: "h-l"
        }, moraSubstring(kana.ent, 1, accentPos)));
        if (accentPos < countMora(kana.ent)) wrapperSpan.append(html("span", {
          class: "l"
        }, moraSubstring(kana.ent, accentPos)));
      }
      return wrapperSpan;
    }
    function renderDefinitions(entry, options) {
      const senses = entry.s.filter((s => s.match));
      if (!senses.length) return "";
      const definitionsDiv = html("div", {
        class: "w-def"
      });
      if (senses.length === 1) {
        definitionsDiv.append(renderSense(senses[0], options));
        definitionsDiv.lang = senses[0].lang || "en";
        if (options.dictLang && options.dictLang !== "en" && senses[0].lang !== options.dictLang) definitionsDiv.classList.add("foreign");
      } else {
        // First extract any native language senses
        const nativeSenses = senses.filter((s => s.lang && s.lang !== "en"));
        if (nativeSenses.length) {
          const definitionList = html("ul", {});
          for (const sense of nativeSenses) definitionList.append(html("li", {
            lang: sense.lang || "en"
          }, renderSense(sense, options)));
          definitionsDiv.append(definitionList);
        }
        // Try grouping the remaining (English) definitions by part-of-speech.
                const enSenses = senses.filter((s => !s.lang || s.lang === "en"));
        const posGroups = options.posDisplay !== "none" ? groupSenses(enSenses) : [];
        const isForeign = !!options.dictLang && options.dictLang !== "en";
        // Determine if the grouping makes sense
        
        // If the group headings make the number of lines used to represent
        // all the senses (ignoring word wrapping) grow by more than 50%, we should
        // skip using groups. This will typically be the case where there are no
        // common parts-of-speech, or at least very few.
                const linesWithGrouping = posGroups.length + enSenses.length;
        const linesWithoutGrouping = enSenses.length;
        const useGroups = posGroups.length && linesWithGrouping / linesWithoutGrouping <= 1.5;
        if (useGroups) {
          let startIndex = 1;
          for (const group of posGroups) {
            // Group heading
            const groupHeading = html("p", {
              class: "w-group-head"
            });
            // Verb class tags were added to proverbs for inflection handling but
            // aren't user-facing. Filter them out here.
                        const filteredPos = getFilteredTags(group.pos, group.misc);
            for (const pos of filteredPos) {
              const posSpan = html("span", {
                class: "w-pos tag"
              });
              if (options.posDisplay === "expl") {
                posSpan.lang = getLangTag();
                posSpan.textContent = browser_polyfill_default().i18n.getMessage(`pos_label_${pos.replace(/-/g, "_")}`) || pos;
              } else posSpan.textContent = pos;
              groupHeading.append(posSpan);
            }
            for (const misc of group.misc) groupHeading.append(html("span", {
              class: "w-misc tag",
              lang: getLangTag()
            }, browser_polyfill_default().i18n.getMessage(`misc_label_${misc.replace(/-/g, "_")}`) || misc));
            // If there is no group heading, just add a '-' placeholder
                        if (!group.pos.length && !group.misc.length) groupHeading.append(html("span", {
              class: "w-pos tag"
            }, "-"));
            definitionsDiv.append(groupHeading);
            // Group items
                        const definitionList = html("ol", {
              start: String(startIndex)
            });
            for (const sense of group.senses) {
              definitionList.append(html("li", {
                class: isForeign ? "foreign" : void 0,
                lang: sense.lang || "en"
              }, renderSense(sense, options)));
              startIndex++;
            }
            definitionsDiv.append(definitionList);
          }
        } else {
          const definitionList = html("ol", {});
          for (const sense of enSenses) definitionList.append(html("li", {
            class: isForeign ? "foreign" : "",
            lang: sense.lang || "en"
          }, renderSense(sense, options)));
          definitionsDiv.append(definitionList);
        }
      }
      return definitionsDiv;
    }
    function renderSense(sense, options) {
      const fragment = document.createDocumentFragment();
      // Verb class tags were added to proverbs for inflection handling but
      // aren't user-facing. Filter them out here.
            const filteredPos = getFilteredTags(sense.pos, sense.misc);
      if (options.posDisplay !== "none") for (const pos of filteredPos) {
        const posSpan = html("span", {
          class: "w-pos tag"
        });
        switch (options.posDisplay) {
         case "expl":
          posSpan.lang = getLangTag();
          posSpan.append(browser_polyfill_default().i18n.getMessage(`pos_label_${pos.replace(/-/g, "_")}`) || pos);
          break;

         case "code":
          posSpan.append(pos);
          break;
        }
        fragment.append(posSpan);
      }
      if (sense.field) for (const field of sense.field) fragment.append(html("span", {
        class: "w-field tag",
        lang: getLangTag()
      }, browser_polyfill_default().i18n.getMessage(`field_label_${field}`) || field));
      if (sense.misc) for (const misc of sense.misc) fragment.append(html("span", {
        class: "w-misc tag",
        lang: getLangTag()
      }, browser_polyfill_default().i18n.getMessage(`misc_label_${misc.replace(/-/g, "_")}`) || misc));
      if (sense.dial) for (const dial of sense.dial) fragment.append(html("span", {
        class: "w-dial tag",
        lang: getLangTag()
      }, browser_polyfill_default().i18n.getMessage(`dial_label_${dial}`) || dial));
      appendGlosses(sense.g, fragment);
      if (sense.inf) fragment.append(html("span", {
        class: "w-inf",
        // Mark inf as Japanese because it often contains Japanese text
        lang: "ja"
      }, ` (${sense.inf})`));
      if (sense.lsrc?.length) fragment.append(renderLangSources(sense.lsrc));
      return fragment;
    }
    function appendGlosses(glosses, parent) {
      for (const [i, gloss] of glosses.entries()) {
        if (i) parent.append("; ");
        if (gloss.type && gloss.type !== "tm" && gloss.type !== "none") {
          const typeStr = browser_polyfill_default().i18n.getMessage(`gloss_type_label_${gloss.type}`);
          if (typeStr) parent.append(html("span", {
            class: "w-type",
            lang: getLangTag()
          }, `(${typeStr}) `));
        }
        parent.append(gloss.str);
        if (gloss.type === "tm") parent.append("\u2122");
      }
    }
    function renderLangSources(sources) {
      const sourceLangSpan = html("span", {
        class: "w-lsrc",
        lang: getLangTag()
      });
      const startsWithWasei = sources[0]?.wasei;
      sourceLangSpan.append(browser_polyfill_default().i18n.getMessage(startsWithWasei ? "lang_lsrc_wasei_prefix" : "lang_lsrc_prefix"));
      for (const [i, lsrc] of sources.entries()) {
        if (i) sourceLangSpan.append(", ");
        const lang = browser_polyfill_default().i18n.getMessage(`lang_label_${lsrc.lang || "en"}`) || lsrc.lang || "English";
        const prefix = lsrc.wasei ? browser_polyfill_default().i18n.getMessage("lang_lsrc_wasei", [ lang ]) : lang;
        sourceLangSpan.append(lsrc.src ? `${prefix}: ` : prefix);
        if (lsrc.src) sourceLangSpan.append(html("span", {
          lang: lsrc.lang || "en"
        }, lsrc.src));
      }
      sourceLangSpan.append(browser_polyfill_default().i18n.getMessage("lang_lsrc_suffix"));
      return sourceLangSpan;
    }
    // CONCATENATED MODULE: ./src/content/popup/render-popup.ts
    /// <reference path="../../common/css.d.ts" />
    function renderPopup(result, options) {
      // We add most styles to the shadow DOM but it turns out that browsers don't
      // load @font-face fonts from the shadow DOM [1], so we need to add @font-face
      // definitions to the main document.
      // [1] e.g see https://issues.chromium.org/issues/41085401
      if (!options.fontFace || options.fontFace === "bundled") addFontStyles(); else removeFontStyles();
      const container = options.container || getDefaultContainer();
      const windowElem = resetContainer({
        host: container,
        displayMode: options.displayMode,
        fontFace: options.fontFace || "bundled",
        fontSize: options.fontSize || "normal",
        popupStyle: options.popupStyle
      });
      const contentContainer = html("div", {
        class: "content"
      });
      const hasResult = result && (result.words || result.kanji || result.names);
      const showTabs = hasResult && result.resultType !== "db-unavailable" && !result.title && options.tabDisplay !== "none";
      if (showTabs) {
        const enabledTabs = {
          words: !!result?.words || !!options.meta,
          kanji: !!result?.kanji,
          names: !!result?.names
        };
        windowElem.append(renderTabBar({
          closeShortcuts: options.closeShortcuts,
          displayMode: options.displayMode,
          enabledTabs,
          onClosePopup: options.onClosePopup,
          onShowSettings: options.onShowSettings,
          onSwitchDictionary: options.onSwitchDictionary,
          onTogglePin: options.onTogglePin,
          pinShortcuts: options.pinShortcuts,
          selectedTab: options.dictToShow
        }));
        windowElem.dataset.tabSide = options.tabDisplay || "top";
        onHorizontalSwipe(contentContainer, (direction => {
          options.onSwitchDictionary?.(direction === "left" ? "prev" : "next");
        }));
      }
      const resultToShow = result?.[options.dictToShow];
      switch (resultToShow?.type) {
       case "kanji":
        contentContainer.append(html("div", {
          class: "expandable"
        }, renderKanjiEntries({
          entries: resultToShow.data,
          options
        })));
        break;

       case "names":
        contentContainer.append(renderNamesEntries({
          entries: resultToShow.data,
          matchLen: resultToShow.matchLen,
          more: resultToShow.more,
          options: {
            ...options,
            // Hide the meta if we have already shown it on the words tab
            meta: result?.words ? void 0 : options.meta
          }
        }));
        break;

       case "words":
        contentContainer.append(html("div", {
          class: "expandable"
        }, renderWordEntries({
          entries: resultToShow.data,
          matchLen: resultToShow.matchLen,
          more: resultToShow.more,
          namePreview: result.namePreview,
          options,
          title: result.title
        })));
        break;

       default:
        {
          if (!options.meta) return null;
          const metadata = renderMetadata({
            fxData: options.fxData,
            preferredUnits: options.preferredUnits,
            isCombinedResult: false,
            matchLen: 0,
            meta: options.meta
          });
          if (!metadata) return null;
          metadata.classList.add("-metaonly");
          contentContainer.append(html("div", {
            class: "wordlist entry-data"
          }, metadata));
        }
        break;
      }
      // Render the copy overlay if needed
            if (showOverlay(options.copyState)) {
        contentContainer.append(html("div", {
          class: "grid-stack"
        }, // Dictionary content
        html("div", {}, ...contentContainer.children), renderCopyOverlay({
          copyState: options.copyState,
          includeAllSenses: options.copy?.includeAllSenses !== false,
          includeLessCommonHeadwords: options.copy?.includeLessCommonHeadwords !== false,
          includePartOfSpeech: options.copy?.includePartOfSpeech !== false,
          kanjiReferences: options.kanjiReferences,
          onCancelCopy: options.onCancelCopy,
          onCopy: options.onCopy,
          result: resultToShow ? result : void 0,
          series: options.dictToShow,
          showKanjiComponents: options.showKanjiComponents
        })));
        // Set the overlay styles for the window, but wait a moment so we can
        // transition the styles in.
                requestAnimationFrame((() => {
          // TODO: Drop the class and just keep the data attribute once we've
          // converted everything to Tailwind
          windowElem.classList.add("-has-overlay");
          windowElem.dataset.hasOverlay = "true";
        }));
      }
      // Set copy styles
            switch (options.copyState.kind) {
       case "active":
        windowElem.classList.add("-copy-active");
        break;

       case "error":
        windowElem.classList.add("-copy-error");
        break;

       case "finished":
        windowElem.classList.add("-copy-finished");
        break;
      }
      // Generate status bar contents
            const copyDetails = renderCopyDetails({
        copyNextKey: options.copyNextKey,
        copyState: options.copyState,
        series: resultToShow?.type || "words"
      });
      let statusBar = null;
      if (copyDetails) statusBar = copyDetails; else if (hasResult && result?.resultType === "db-updating") statusBar = renderUpdatingStatus();
      let contentWrapper = contentContainer;
      if (statusBar) contentWrapper = html("div", {
        class: "status-bar-wrapper"
      }, contentContainer, statusBar);
      if (!showTabs && options.onClosePopup) windowElem.append(html("div", {
        class: "close-button-wrapper"
      }, contentWrapper, renderCloseButton(options.onClosePopup, options.closeShortcuts || []))); else windowElem.append(contentWrapper);
      // Collapse expandable containers
            for (const expandable of contentContainer.querySelectorAll(".expandable")) updateExpandable(expandable, {
        ...options,
        showKeyboardShortcut: options.displayMode === "static"
      });
      // Scroll any selected items into view.
      
      // We need to wait until after the popup has been positioned, however, as
      // otherwise we won't know if it's in view or not.
            requestAnimationFrame((() => {
        const selectedElem = contentContainer.querySelector(".expandable .-selected") || contentContainer.querySelector(".-flash");
        selectedElem?.scrollIntoView({
          block: "nearest"
        });
      }));
      return container;
    }
    function getDefaultContainer() {
      const defaultContainer = getOrCreateEmptyContainer({
        id: "tenten-ja-window",
        styles: popupinline_namespaceObject.toString(),
        // Make sure the popup container appears _before_ the puck container so that
        // we can assign them the same z-index and have the puck appear on top.
        before: LookupPuckId,
        legacyIds: [ "rikaichamp-window" ]
      });
      // Make sure our popup doesn't get inverted by Wikipedia's (experimental) dark
      // mode.
            if (document.location.hostname.endsWith("wikipedia.org")) {
        defaultContainer.classList.add("mw-no-invert");
        defaultContainer.style.filter = "inherit";
      }
      return defaultContainer;
    }
    function resetContainer({host, displayMode, fontFace, fontSize, popupStyle}) {
      const container = html("div", {
        class: "container"
      });
      const windowDiv = html("div", {
        class: "window",
        "data-type": "window"
      });
      container.append(windowDiv);
      // Set initial and interactive status
            container.classList.toggle("ghost", displayMode === "ghost");
      container.classList.toggle("interactive", displayMode !== "static");
      container.classList.toggle("pinned", displayMode === "pinned");
      // Set theme
            windowDiv.classList.add(getThemeClass(popupStyle));
      // Font face
            if (fontFace === "bundled") windowDiv.classList.add("bundled-fonts");
      // Font size
            if (fontSize !== "normal") windowDiv.classList.add(`font-${fontSize}`);
      if (host.shadowRoot) host.shadowRoot.append(container); else host.append(container);
      // Reset the container position and size so that we can consistently measure
      // the size of the popup.
            host.style.removeProperty("--left");
      host.style.removeProperty("--top");
      host.style.removeProperty("--max-width");
      host.style.removeProperty("--max-height");
      return windowDiv;
    }
    function showOverlay(copyState) {
      return (copyState.kind === "active" || copyState.kind === "error") && (copyState.mode === "touch" || copyState.mode === "mouse");
    }
    function renderPopupArrow(options) {
      const popupContainer = getPopupContainer();
      if (!popupContainer) return;
      // Check for cases where the popup overlaps the target element
            const {popupPos, popupSize, target} = options;
      if (options.direction === "vertical") {
        if (options.side === "before" && popupPos.y + popupSize.height > target.y) return; else if (options.side === "after" && popupPos.y < target.y) return;
      } else if (options.side === "before" && popupPos.x + popupSize.width > target.x) return; else if (options.side === "after" && popupPos.x < target.x) return;
      renderArrow({
        ...options,
        popupContainer,
        target
      });
    }
    // CONCATENATED MODULE: ./src/content/popup/show-popup.ts
    function showPopup(result, options) {
      const popup = renderPopup(result, options);
      if (!popup) return null;
      const {cursorClearance, cursorPos} = options.getCursorClearanceAndPos();
      // Get the initial popup size
            let popupSize = getPopupDimensions(popup);
      // Apply any min height to the popup
            let minHeight = 0;
      if (options.fixMinHeight && options.previousHeight && popupSize.height < options.previousHeight) minHeight = popupSize.height = options.previousHeight;
      // Get the popup position
            const popupPos = getPopupPosition({
        allowVerticalOverlap: options.allowOverlap || !!options.fixMinHeight,
        cursorClearance,
        cursorPos,
        fixedPosition: options.fixedPosition,
        interactive: options.interactive,
        isVerticalText: options.isVerticalText,
        positionMode: options.positionMode,
        popupSize,
        safeArea: options.safeArea,
        pointerType: options.pointerType
      });
      
      // Apply the popup position
      
            if (isSvgDoc(document) && isSvgSvgElement(document.documentElement) && isForeignObjectElement(popup.parentElement)) {
        // Set the x/y attributes on the <foreignObject> wrapper after converting
        // to document space.
        const svg = document.documentElement;
        const wrapper = popup.parentElement;
        wrapper.x.baseVal.value = popupPos.x;
        wrapper.y.baseVal.value = popupPos.y;
        const ctm = svg.getScreenCTM();
        if (ctm) {
          const transform = svg.createSVGTransformFromMatrix(ctm.inverse());
          wrapper.transform.baseVal.initialize(transform);
        }
      } else {
        popup.style.setProperty("--left", `${popupPos.x}px`);
        popup.style.setProperty("--top", `${popupPos.y}px`);
        if (popupPos.constrainWidth) popup.style.setProperty("--max-width", `${popupPos.constrainWidth}px`); else popup.style.removeProperty("--max-width");
        if (popupPos.constrainHeight) {
          popup.style.removeProperty("--min-height");
          popup.style.setProperty("--max-height", `${popupPos.constrainHeight}px`);
        } else if (minHeight) {
          popup.style.setProperty("--min-height", `${minHeight}px`);
          popup.style.removeProperty("--max-height");
        } else {
          popup.style.removeProperty("--min-height");
          popup.style.removeProperty("--max-height");
        }
      }
      
      // Maybe add an arrow to it
      
      // This needs to happen after positioning the popup so we can read back its
      // final size (after applying any edge case CSS rules) and determine if
      // there is room for the arrow or not.
      
            if (cursorPos && (options.displayMode === "hover" || options.displayMode === "pinned") && popupPos.direction !== "disjoint" && popupPos.side !== "disjoint") {
        // Update the popup size now that we have positioned it.
        popupSize = getPopupDimensions(popup);
        renderPopupArrow({
          direction: popupPos.direction,
          popupPos: toScreenCoords({
            x: popupPos.x,
            y: popupPos.y
          }),
          popupSize,
          side: popupPos.side,
          target: cursorPos,
          theme: options.popupStyle
        });
      }
      return {
        popup,
        size: {
          width: popupPos.constrainWidth ?? popupSize.width,
          height: popupPos.constrainHeight ?? popupSize.height
        },
        pos: stripFields(popupPos, [ "constrainWidth", "constrainHeight" ])
      };
    }
    function getPopupDimensions(hostElem) {
      // Measure the size of the inner window so that we don't include the padding
      // for the shadow
      const windowElem = hostElem.shadowRoot?.querySelector(".window");
      const width = (windowElem instanceof HTMLElement ? windowElem.offsetWidth : 0) || 200;
      const height = windowElem instanceof HTMLElement ? windowElem.offsetHeight : 0;
      return {
        width,
        height
      };
    }
    // CONCATENATED MODULE: ./src/content/query.ts
    let queryCache = [];
    async function query(text, options) {
      // Add a very very basic cache
      const key = getCacheKey({
        ...options,
        text
      });
      // You'd think we'd use an actual hashmap (object) here but then we'd need to
      // work out some sort of LRU scheme for removing entries. While there are
      // plenty of libraries for that and we even use one such in the background
      // script, this code is part of the content script which goes into every page
      // so we try to keep it lean.
      
      // As a result, we limit our cache size to 10 entries and just do a linear
      // search of the array.
            const cachedEntry = queryCache.find((q => q.key === key));
      if (cachedEntry) switch (cachedEntry.state) {
       case "searching":
        void cachedEntry.fullQuery.then((result => {
          options.updateQueryResult(result);
        }));
        return cachedEntry.wordsQuery;

       case "complete":
        return cachedEntry.result;
      }
      // Limit the cache to 10 entries. This cache is really just here for the case
      // when the user is moving the cursor back and forward along a word and
      // therefore running the same query multiple times.
            if (queryCache.length > 10) queryCache.shift();
      // If the query throws, comes back empty, or is a result from the fallback
      // database, drop it from the cache.
            const rawWordsQuery = queryWords(text, options);
      const fullQuery = queryOther(text, options, rawWordsQuery).then((result => {
        // Update the cache accordingly
        if (!result || result === "aborted") {
          queryCache = queryCache.filter((q => q.key !== key));
          return null;
        } else if (result.resultType === "full") {
          const cacheIndex = queryCache.findIndex((q => q.key === key));
          if (cacheIndex !== -1) queryCache[cacheIndex] = {
            key,
            state: "complete",
            result
          };
        } else queryCache = queryCache.filter((q => q.key !== key));
        return result;
      })).catch((() => {
        queryCache = queryCache.filter((q => q.key !== key));
        return null;
      }));
      // The rawWordsQuery can return the 'aborted' value or an object with a
      // null `words` property (so we can read its dbStatus property) so that the
      // queryOther knows not to proceed, but we should simplify the result before
      // returning it to the caller.
            const wordsQuery = rawWordsQuery.then((result => result === "aborted" || !result?.words ? null : result));
      queryCache.push({
        key,
        state: "searching",
        wordsQuery,
        fullQuery
      });
      void fullQuery.then((result => options.updateQueryResult(result)));
      return wordsQuery;
    }
    async function queryWords(text, options) {
      const message = {
        type: options.wordLookup ? "searchWords" : "translate",
        input: text,
        includeRomaji: options.includeRomaji
      };
      let searchResult;
      try {
        searchResult = await browser_polyfill_default().runtime.sendMessage(message);
      } catch (e) {
        console.error("[10ten-ja-reader] Failed to call query. The page might need to be refreshed.", e);
        searchResult = null;
      }
      if (!searchResult || searchResult === "aborted") return searchResult;
      // Convert the result into a suitably shaped QueryResult
            let queryResult;
      let resultType = "initial";
      const {dbStatus} = searchResult;
      if (dbStatus === "unavailable") resultType = "db-unavailable"; else if (dbStatus === "updating") resultType = "db-updating";
      if (isTranslateResult(searchResult)) {
        let title = text.substring(0, searchResult.textLen);
        if (text.length > searchResult.textLen) title += "...";
        queryResult = {
          words: {
            ...stripFields(searchResult, [ "dbStatus", "textLen" ]),
            type: "words",
            matchLen: searchResult.textLen
          },
          title,
          resultType
        };
      } else queryResult = {
        ...stripFields(searchResult, [ "dbStatus" ]),
        resultType
      };
      return queryResult;
    }
    function isTranslateResult(result) {
      return result.type === "translate";
    }
    async function queryOther(text, options, wordsQuery) {
      const words = await wordsQuery;
      if (words === "aborted") return "aborted";
      if (words?.resultType.startsWith("db-")) return words;
      const message = {
        type: "searchOther",
        input: text,
        includeRomaji: options.includeRomaji,
        wordsMatchLen: Math.max(words?.words?.matchLen || 0, options.metaMatchLen || 0)
      };
      let searchResult;
      try {
        searchResult = await browser_polyfill_default().runtime.sendMessage(message);
      } catch (e) {
        console.error("[10ten-ja-reader] Failed to call searchOther. The page might need to be refreshed.", e);
        searchResult = null;
      }
      if (!searchResult) 
      // If the words query was empty too, make sure the final result is null.
      return words?.words ? words : null;
      if (searchResult === "aborted") return searchResult;
      return addNamePreview({
        words: words?.words ?? null,
        names: searchResult.names,
        kanji: searchResult.kanji,
        resultType: "full"
      });
    }
    function addNamePreview(result) {
      if (!result.words || !result.names) return result;
      // If we have a word result, check for a longer match in the names dictionary,
      // but only if the existing match has some non-hiragana characters in it.
      
      // The names dictionary contains mostly entries with at least some kanji or
      // katakana but it also contains entries that are solely hiragana (e.g.  はなこ
      // without any corresponding kanji). Generally we only want to show a name
      // preview if it matches on some kanji or katakana as otherwise it's likely to
      // be a false positive.
      
      // While it might seem like it would be enough to check if the existing match
      // from the words dictionary is hiragana-only, we can get cases where a longer
      // match in the names dictionary _starts_ with hiragana but has kanji/katakana
      // later, e.g. ほとけ沢.
            const names = [];
      let more = false;
      // Add up to three results provided that:
      
      // - they have a kanji reading or katakana reading,
      // - and are all are as long as the longest names match,
      // - are all longer than the longest words match
            const minLength = Math.max(result.names.matchLen, result.words.matchLen + 1);
      for (const name of result.names.data) {
        // Names should be in descending order of length so if any of them is less
        // than the minimum length, we can skip the rest.
        if (name.matchLen < minLength) break;
        if (!name.k && !name.r.some(hasKatakana)) continue;
        if (names.length > 2) {
          more = true;
          break;
        }
        names.push(name);
      }
      if (!names.length) return result;
      // If we got a match, extend the matchLen of the words result.
      
      // Reaching into the words result like this is cheating a little bit but it
      // simplifies the places where we use the word result.
            const matchLen = names[0].matchLen;
      return {
        ...result,
        words: {
          ...result.words,
          matchLen
        },
        namePreview: {
          names,
          more
        }
      };
    }
    function getCacheKey({text, includeRomaji, wordLookup}) {
      return [ text, includeRomaji ? "1" : "0", wordLookup ? "1" : "0" ].join("-");
    }
    // CONCATENATED MODULE: ./css/safe-area-provider.css?inline
    const safe_area_providerinline_namespaceObject = '@charset "UTF-8";\n\n:root,\n:host {\n  --tenten-safe-area-inset-top: env(safe-area-inset-top, 0px);\n  --tenten-safe-area-inset-right: env(safe-area-inset-right, 0px);\n  --tenten-safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);\n  --tenten-safe-area-inset-left: env(safe-area-inset-left, 0px);\n}\n\n.safe-area-provider {\n  position: fixed;\n  top: var(--tenten-safe-area-inset-top, 0px);\n  right: var(--tenten-safe-area-inset-right, 0px);\n  bottom: var(--tenten-safe-area-inset-bottom, 0px);\n  left: var(--tenten-safe-area-inset-left, 0px);\n  box-sizing: border-box;\n  touch-action: none;\n  pointer-events: none;\n  visibility: hidden;\n}\n';
    // CONCATENATED MODULE: ./src/content/safe-area-provider.ts
    /// <reference path="../common/css.d.ts" />
    function safe_area_provider_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class SafeAreaProvider {
      getSafeArea() {
        const safeAreaElem = this.element || this.startListening();
        if (this.cachedSafeArea) return this.cachedSafeArea;
        const computedStyle = getComputedStyle(safeAreaElem);
        const safeArea = {
          top: parseFloat(computedStyle.getPropertyValue("--tenten-safe-area-inset-top")) || 0,
          right: parseFloat(computedStyle.getPropertyValue("--tenten-safe-area-inset-right")) || 0,
          bottom: parseFloat(computedStyle.getPropertyValue("--tenten-safe-area-inset-bottom")) || 0,
          left: parseFloat(computedStyle.getPropertyValue("--tenten-safe-area-inset-left")) || 0
        };
        this.setCachedSafeArea(safeArea);
        return safeArea;
      }
      destroy() {
        this.stopListening();
      }
      // Listeners
      addEventListener(listener) {
        if (this.listeners.includes(listener)) return;
        this.listeners.push(listener);
      }
      removeEventListener(listener) {
        this.listeners = this.listeners.filter((l => l !== listener));
      }
      // Implementation helpers
      startListening() {
        // Set up shadow tree
        const container = getOrCreateEmptyContainer({
          id: SafeAreaProvider.id,
          styles: safe_area_providerinline_namespaceObject.toString()
        });
        // Create safe area provider element
                this.element = document.createElement("div");
        this.element.classList.add("safe-area-provider");
        container.shadowRoot.append(this.element);
        // Listen for changes
                if ("ResizeObserver" in window) {
          // Ideally use ResizeObserver, as it fires updates even whilst the puck
          // is being dragged.
          this.resizeObserver = new ResizeObserver(this.onResizeObserved);
          this.resizeObserver.observe(this.element, {
            box: "border-box"
          });
        } else 
        // Otherwise, fall back to using window "resize" events.
        window.addEventListener("resize", this.onWindowResize);
        return this.element;
      }
      stopListening() {
        // Stop listening
        if (this.resizeObserver) {
          if (this.element) this.resizeObserver.unobserve(this.element);
          this.resizeObserver = void 0;
        } else window.removeEventListener("resize", this.onWindowResize);
        // Drop the element
                removeSafeAreaProvider();
        this.element = void 0;
      }
      setCachedSafeArea(safeArea) {
        this.cachedSafeArea = safeArea;
        this.notifyListeners(safeArea);
      }
      notifyListeners(safeArea) {
        const listenersCopy = [ ...this.listeners ];
        for (const listener of listenersCopy) listener(safeArea);
      }
      constructor() {
        safe_area_provider_define_property(this, "cachedSafeArea", null);
        safe_area_provider_define_property(this, "element", void 0);
        safe_area_provider_define_property(this, "resizeObserver", void 0);
        safe_area_provider_define_property(this, "listeners", []);
        safe_area_provider_define_property(this, "onResizeObserved", (entries => {
          for (const entry of entries) if (entry.contentRect) {
            // contentRect has changed, so invalidate our cached safe area insets.
            this.setCachedSafeArea(null);
            break;
          }
        }));
        safe_area_provider_define_property(this, "onWindowResize", (() => {
          this.setCachedSafeArea(null);
        }));
      }
    }
    safe_area_provider_define_property(SafeAreaProvider, "id", "tenten-safe-area-provider");
    // We expose this separately so that when the extension is upgraded, we can
    // clear up any artifacts left behind by the previous version.
        function removeSafeAreaProvider() {
      removeContentContainer(SafeAreaProvider.id);
    }
    // CONCATENATED MODULE: ./src/content/target-props.ts
    // Guaranteed to be arranged in ascending order
    const textBoxSizeLengths = [ 1, 4, 8, 12, 16 ];
    function getPageTargetProps({fromPuck, fromTouch, target, textRange}) {
      let textBoxSizes;
      if (textRange) {
        textBoxSizes = getInitialClientBboxofTextSelection(textRange);
        // Return as page coordinates
                if (textBoxSizes) {
          const scrollOffset = getScrollOffset();
          for (const size of textBoxSizeLengths) textBoxSizes[size] = toPageCoords(textBoxSizes[size], scrollOffset);
        }
      }
      return {
        contentType: getContentType(target),
        fromPuck,
        fromTouch,
        hasTitle: !!(target || null)?.title,
        textBoxSizes,
        isVerticalText: dom_utils_isVerticalText(target)
      };
    }
    function getInitialClientBboxofTextSelection(textRange) {
      // Check we actually have some text selection available
      // (We easily can't get the bbox of text selections in input elements
      // unfortunately.)
      if (!textRange.length || isTextInputNode(textRange[0].node)) return;
      // All this fiddling we do do get bboxes for Google docs spans is possibly
      // not necessary. The bboxes are mostly useful on mobile devices when we are
      // trying to position the popup to the side of the selection, but the Web
      // version of Google docs is probably not often used on mobile devices.
      
      // However, it's fairly easy to calculate these bboxes and doing so means we
      // get a more consistent vertical gutter in non-Google docs cases so for now
      // we put up with the complexity.
            const node = textRange[0].node;
      const gDocsStartSpan = isGdocsSpan(node) ? node : void 0;
      const range = gDocsStartSpan ? void 0 : node.ownerDocument.createRange();
      if (range) range.setStart(node, textRange[0].start);
      let lastEnd = -1;
      let lastSize;
      const result = {};
      for (const size of textBoxSizeLengths) {
        const end = Math.min(textRange[0].start + size, textRange[0].end);
        if (end <= lastEnd) result[size] = lastSize; else {
          if (gDocsStartSpan) result[size] = getGdocsRangeBboxes({
            startSpan: gDocsStartSpan,
            offset: textRange[0].start,
            length: end - textRange[0].start
          })[0]; else if (range) {
            range.setEnd(node, end);
            // Safari will sometimes return zero-width bboxes when the range starts
            // on a new line so we should make sure to choose the wider bbox.
                        const bbox = [ ...range.getClientRects() ].reduce(((result, bbox) => (result?.width || 0) >= bbox.width ? result : bbox), void 0);
            // Sometimes getClientRects can return an empty array
                        if (!bbox) return;
            result[size] = bbox;
          }
          lastEnd = end;
          lastSize = result[size];
        }
      }
      return result;
    }
    function getBestFitSize({sizes, length}) {
      // If the length is zero, it's probably best to say no size
      if (!length) return;
      // Otherwise, find the first size that is _bigger_ than the provided length.
      // And if there is none, just choose the biggest size.
            const bestFitSize = textBoxSizeLengths.slice().find((len => len > length)) || textBoxSizeLengths[textBoxSizeLengths.length - 1];
      return sizes[bestFitSize];
    }
    function selectionSizesToScreenCoords(sizes) {
      if (!sizes) return;
      const converted = {
        ...sizes
      };
      const scrollOffset = getScrollOffset();
      for (const size of textBoxSizeLengths) converted[size] = toScreenCoords(sizes[size], scrollOffset);
      return converted;
    }
    // CONCATENATED MODULE: ./src/content/text-highlighter.ts
    function text_highlighter_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class TextHighlighter {
      detach() {
        window.removeEventListener("focusin", this.onFocusIn);
        this.clearHighlight();
        this.dropHighlightStyles();
      }
      highlight({length, textRange, style}) {
        console.assert(textRange.length, "Should have a non-empty range");
        const selectedWindow = textRange[0].node.ownerDocument.defaultView;
        // Check that the window isn't closed
                if (!selectedWindow || selectedWindow.closed) {
          this.clearHighlight();
          return;
        }
        // Look for an existing selection.
        
        // If there is no selection, we're probably dealing with an iframe that
        // has now become display:none.
                const selection = selectedWindow.getSelection();
        if (!selection) {
          this.clearHighlight();
          return;
        }
        const canUseHighlightApi = this.canUseHighlightApi({
          textRange,
          length
        });
        // If there is already something selected in the page that is *not*
        // what we selected then generally want to leave it alone, unless of course
        // we're able to use the CSS Highlight API.
        
        // The one exception to this is if the selection is in a contenteditable
        // node. In that case we want to store and restore it to mimic the behavior
        // of textboxes.
                if (isContentEditableNode(selection.anchorNode)) {
          if (!this.previousSelection && selection.toString() !== this.selectedText) this.storeContentEditableSelection(selectedWindow);
        } else if (!canUseHighlightApi && !selection.isCollapsed && selection.toString() !== this.selectedText) {
          this.clearHighlight();
          return;
        }
        // Unconditionally clear any existing CSS highlights since we might end up
        // using regular DOM selections in some cases.
                CSS?.highlights?.delete("tenten-selection");
        CSS?.highlights?.delete("tenten-selection-blue");
        const startNode = textRange[0].node;
        if (isTextInputNode(startNode)) this.highlightTextBox({
          length,
          offset: textRange[0].start,
          selectedWindow,
          textBox: startNode
        }); else if (isGdocsSpan(startNode)) {
          highlightGdocsRange({
            startSpan: startNode,
            offset: textRange[0].start,
            length,
            style
          });
          this.selectedText = null;
          this.selectedWindow = selectedWindow;
        } else this.highlightRegularNode({
          canUseHighlightApi,
          length,
          selectedWindow,
          style,
          textRange
        });
      }
      // The optional `currentElement` parameter here indicates the element we are
      // currently interacting with.
      // This is only used when we have been an interacting with a text box.
      // As part of highlighting text in that text box we can cause it to scroll
      // its contents. In particular, when we _clear_ the highlight in the text box
      // we will restore its previous selection, but doing that might scroll the
      // text box. If we are still interacting with that same text box (e.g. the
      // mouse is still over the text box) then we take care not to restore its
      // scroll position.
      clearHighlight({currentElement = null} = {}) {
        if (this.selectedWindow && !this.selectedWindow.closed) {
          // Clear the selection if it's something we made.
          const selection = this.selectedWindow.getSelection();
          if (selection?.toString() && selection.toString() === this.selectedText) if (this.previousSelection) this.restoreContentEditableSelection(); else selection.removeAllRanges();
          // Delete any highlight we may have added using the CSS Highlight API.
                    CSS?.highlights?.delete("tenten-selection");
          CSS?.highlights?.delete("tenten-selection-blue");
          this.dropHighlightStyles();
          // Likewise any Google docs selection
                    clearGdocsHighlight();
          this.clearTextBoxSelection(currentElement);
        }
        this.selectedWindow = null;
        this.selectedText = null;
        this.selectedTextBox = null;
        this.previousFocus = null;
        this.previousSelection = null;
      }
      isUpdatingFocus() {
        return this.updatingFocus;
      }
      storeContentEditableSelection(selectedWindow) {
        const selection = selectedWindow.getSelection();
        if (selection && isContentEditableNode(selection.anchorNode)) 
        // We don't actually store the full selection, basically because we're
        // lazy. Remembering the cursor position is hopefully good enough for
        // now anyway.
        this.previousSelection = {
          node: selection.anchorNode,
          offset: selection.anchorOffset
        }; else this.previousSelection = null;
      }
      restoreContentEditableSelection() {
        if (!this.previousSelection) return;
        const {node, offset} = this.previousSelection;
        const range = node.ownerDocument.createRange();
        range.setStart(node, offset);
        range.setEnd(node, offset);
        const selection = node.ownerDocument.defaultView.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        this.previousSelection = null;
      }
      highlightTextBox({length, offset, selectedWindow, textBox}) {
        const start = offset;
        const end = start + length;
        // If we were previously interacting with a different text box, restore
        // its range.
                if (this.selectedTextBox && textBox !== this.selectedTextBox.node) this.restoreTextBoxSelection();
        // If we were not already interacting with this text box, store its
        // existing range and focus it.
                if (!this.selectedTextBox || textBox !== this.selectedTextBox.node) {
          // Record the original focus if we haven't already, so that we can
          // restore it.
          if (!this.previousFocus) this.previousFocus = document.activeElement;
          // We want to be able to distinguish between changes to focus made by
          // the user/app (which we want to reflect when we go to restore the focus)
          // and changes to focus made by us.
                    const previousUpdatingFocus = this.updatingFocus;
          this.updatingFocus = true;
          textBox.focus();
          this.updatingFocus = previousUpdatingFocus;
          this.selectedTextBox = {
            node: textBox,
            previousStart: textBox.selectionStart,
            previousEnd: textBox.selectionEnd,
            previousDirection: textBox.selectionDirection || void 0
          };
        }
        // Store the current scroll range so we can restore it.
                const {scrollTop, scrollLeft} = textBox;
        // Clear any other selection happening in the page.
                selectedWindow.getSelection()?.removeAllRanges();
        textBox.setSelectionRange(start, end);
        this.selectedText = textBox.value.substring(start, end);
        this.selectedWindow = selectedWindow;
        // Restore the scroll range. We need to do this on the next tick or else
        // something else (not sure what) will clobber it.
                requestAnimationFrame((() => {
          textBox.scrollTo(scrollLeft, scrollTop);
        }));
      }
      clearTextBoxSelection(currentElement) {
        if (!this.selectedTextBox) return;
        const textBox = this.selectedTextBox.node;
        // Store the previous scroll position so we can restore it, if need be.
                const {scrollTop, scrollLeft} = textBox;
        this.restoreTextBoxSelection();
        // If we are still interacting with the text box, make sure to maintain its
        // scroll position (rather than jumping back to wherever the restored
        // selection is just because we didn't find a match).
                if (currentElement === textBox) 
        // Restore this in the next tick or else it will get clobbered.
        // (Empirically two ticks seems to work better still.)
        requestAnimationFrame((() => {
          requestAnimationFrame((() => {
            textBox.scrollTo(scrollLeft, scrollTop);
          }));
        }));
        // If we only focussed the textbox in order to highlight text, restore the
        // previous focus.
        
        // (We need to do this even if currentElement === textBox since we'll lose
        // the previous focus when we reset _selectedTextBox and we if we don't
        // restore the focus now, when we next go to set previousFocus we'll end up
        // using `textBox` instead.)
                if (isFocusable(this.previousFocus) && this.previousFocus !== textBox) {
          // First blur the text box since some Elements' focus() method does
          // nothing.
          this.selectedTextBox.node.blur();
          // Very hacky approach to filtering out our own focus handling.
                    const previousUpdatingFocus = this.updatingFocus;
          this.updatingFocus = true;
          this.previousFocus.focus();
          this.updatingFocus = previousUpdatingFocus;
        }
        this.selectedTextBox = null;
        this.previousFocus = null;
      }
      restoreTextBoxSelection() {
        if (!this.selectedTextBox) return;
        const {node: textBox, previousStart, previousEnd, previousDirection} = this.selectedTextBox;
        textBox.setSelectionRange(previousStart, previousEnd, previousDirection);
      }
      canUseHighlightApi({length, textRange}) {
        if (!CSS?.highlights) return false;
        // We cannot highlight SVG
                for (const {node} of new TextRangeWithLength(textRange, length)) if (isSvg(node)) return false;
        // Chrome can't do highlights properly on vertical text
        
        // https://bugs.chromium.org/p/chromium/issues/detail?id=1360724
                if (isChromium()) for (const {node} of new TextRangeWithLength(textRange, length)) if (dom_utils_isVerticalText(node)) return false;
        return true;
      }
      highlightRegularNode({canUseHighlightApi, length, style, selectedWindow, textRange}) {
        // If we were previously interacting with a text box, restore its range
        // and blur it.
        this.clearTextBoxSelection(null);
        const startNode = textRange[0].node;
        const startOffset = textRange[0].start;
        let endNode = startNode;
        let endOffset = startOffset;
        for (const {node, end} of new TextRangeWithLength(textRange, length)) {
          endNode = node;
          endOffset = end;
        }
        if (canUseHighlightApi) {
          const range = new StaticRange({
            startContainer: startNode,
            startOffset,
            endContainer: endNode,
            endOffset
          });
          CSS.highlights.set(style === "blue" ? "tenten-selection-blue" : "tenten-selection", new Highlight(range));
          this.ensureHighlightStyles();
          this.selectedText = null;
        } else {
          const range = startNode.ownerDocument.createRange();
          range.setStart(startNode, startOffset);
          range.setEnd(endNode, endOffset);
          // We only call this method if selectedWindow.getSelection() is not null.
                    this.updatingFocus = true;
          const selection = selectedWindow.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          this.updatingFocus = false;
          this.selectedText = selection.toString();
        }
        this.selectedWindow = selectedWindow;
      }
      onFocusIn(event) {
        if (this.updatingFocus) return;
        // Update the previous focus but only if we're already tracking the previous
        // focus.
                if (this.previousFocus && this.previousFocus !== event.target) {
          this.previousFocus = event.target instanceof Element ? event.target : null;
          // Possibly updating the selection to restore if we're working with a
          // contenteditable element.
                    if (this.previousFocus) this.storeContentEditableSelection(this.previousFocus.ownerDocument.defaultView);
        }
      }
      ensureHighlightStyles() {
        if (document.getElementById("tenten-selection-styles")) return;
        (document.head || document.documentElement).append(html("link", {
          id: "tenten-selection-styles",
          rel: "stylesheet",
          href: browser_polyfill_default().runtime.getURL("css/selection.css")
        }));
      }
      dropHighlightStyles() {
        document.getElementById("tenten-selection-styles")?.remove();
      }
      constructor() {
        text_highlighter_define_property(this, "selectedWindow", null);
        text_highlighter_define_property(this, "selectedText", null);
        // Used to restore the selection of a textbox after we stop interacting
        // with it (since we clobber the text box selection in order to highlight it).
                text_highlighter_define_property(this, "selectedTextBox", null);
        // Used restore the selection of a contenteditable node similar to the way
        // we treat text boxes.
                text_highlighter_define_property(this, "previousSelection", void 0);
        // We need to focus a textbox in order to set its selection so we store the
        // previously focussed node so we can restore it after we're done.
                text_highlighter_define_property(this, "previousFocus", void 0);
        // Gross hack to ignore our own focus events.
                text_highlighter_define_property(this, "updatingFocus", false);
        this.onFocusIn = this.onFocusIn.bind(this);
        window.addEventListener("focusin", this.onFocusIn);
      }
    }
    let _Symbol_iterator = Symbol.iterator;
    // Iterator for a TextRange that enforces the supplied length
        class TextRangeWithLength {
      [_Symbol_iterator]() {
        let i = 0;
        let currentLen = 0;
        return {
          next: () => {
            if (currentLen >= this.length || i >= this.textRange.length) return {
              done: true,
              value: void 0
            };
            const {start, end, node} = this.textRange[i];
            const len = Math.min(end - start, this.length - currentLen);
            currentLen += len;
            i++;
            return {
              value: {
                start,
                end: start + len,
                node
              }
            };
          }
        };
      }
      constructor(textRange, length) {
        text_highlighter_define_property(this, "textRange", void 0);
        text_highlighter_define_property(this, "length", void 0);
        this.textRange = textRange;
        this.length = length;
      }
    }
    // CONCATENATED MODULE: ./src/content/text-range.ts
    function textRangesEqual(a, b) {
      if (!a && !b) return true;
      if (!a || !b) return false;
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; ++i) if (a[i].node !== b[i].node || a[i].start !== b[i].start || a[i].end !== b[i].end) return false;
      return true;
    }
    // CONCATENATED MODULE: ./src/content/timer-precision.ts
    async function hasReasonableTimerResolution() {
      const waitALittle = async () => new Promise((resolve => setTimeout(resolve, 10)))
      // If performance.now() returns different times at least three out of five
      // times then we can assume that we're not doing timer clamping of the sort
      // that would confuse our speed calculations.
      ;
      const numSamples = 5;
      const samples = [];
      samples.push(performance.now());
      for (let i = 1; i < numSamples; i++) {
        await waitALittle();
        samples.push(performance.now());
      }
      const context = {
        same: 0
      };
      const {same: identicalPairs} = samples.reduce(((context, current) => ({
        same: current === context.previous ? context.same + 1 : context.same,
        previous: current
      })), context);
      return identicalPairs < 2;
    }
    // CONCATENATED MODULE: ./src/content/touch-click-tracker.ts
    function touch_click_tracker_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class TouchClickTracker {
      destroy() {
        this.removeEventListeners();
      }
      disable() {
        if (this.disabled) return;
        this.disabled = true;
        this.removeEventListeners();
      }
      enable() {
        if (!this.disabled) return;
        this.disabled = false;
        this.addEventListeners();
      }
      startIgnoringClicks() {
        this.ignoring = true;
      }
      stopIgnoringClicks() {
        this.ignoring = false;
      }
      addEventListeners() {
        window.addEventListener("touchstart", this.onTouchStart, {
          passive: true
        });
        window.addEventListener("touchend", this.onTouchEnd, {
          passive: true
        });
        // We need to register for clicks on the _body_ because if there is no
        // click handler on the body element, iOS won't generate click events
        // from touch taps.
                document.body?.addEventListener("click", this.onClick);
        this.clickHandlerRegistered = !!document.body;
      }
      removeEventListeners() {
        window.removeEventListener("touchstart", this.onTouchStart);
        window.removeEventListener("touchend", this.onTouchEnd);
        document.body?.removeEventListener("click", this.onClick);
        this.clickHandlerRegistered = false;
      }
      onTouchStart() {
        if (!this.clickHandlerRegistered) {
          document.body?.addEventListener("click", this.onClick);
          this.clickHandlerRegistered = !!document.body;
        }
        this.wasTouch = false;
      }
      onTouchEnd() {
        this.wasTouch = !this.ignoring;
      }
      onClick(event) {
        const {wasTouch} = this;
        this.wasTouch = false;
        if (wasTouch) this.onTouchClick?.(event);
      }
      constructor() {
        touch_click_tracker_define_property(this, "wasTouch", false);
        touch_click_tracker_define_property(this, "ignoring", false);
        touch_click_tracker_define_property(this, "disabled", false);
        touch_click_tracker_define_property(this, "clickHandlerRegistered", false);
        touch_click_tracker_define_property(this, "onTouchClick", void 0);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onClick = this.onClick.bind(this);
        this.addEventListeners();
      }
    }
    // CONCATENATED MODULE: ./src/content/content.ts
    /// <reference path="../common/constants.d.ts" />
    /*

  10ten Japanese Reader
  by Brian Birtles
  https://github.com/birchill/10ten-ja-reader

  ---

  Originally based on Rikaikun
  by Erek Speed
  http://code.google.com/p/rikaikun/

  ---

  Originally based on Rikaichan 1.07
  by Jonathan Zarate
  http://www.polarcloud.com/

  ---

  Originally based on RikaiXUL 0.4 by Todd Rudick
  http://www.rikai.com/
  http://rikaixul.mozdev.org/

  ---

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

  ---

  Please do not change or remove any of the copyrights or links to web pages
  when modifying any of the files. - Jon

*/
    function content_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class ContentHandler {
      applyPuckConfig() {
        if (!this.isTopMostWindow()) return;
        if (this.config.showPuck === "show") this.setUpPuck(); else this.tearDownPuck();
      }
      setUpPuck() {
        if (!this.puck) this.puck = new LookupPuck({
          initialPosition: this.config.puckState,
          safeAreaProvider: this.safeAreaProvider,
          onLookupDisabled: () => {
            this.clearResult();
          },
          onPuckStateChanged: state => {
            void browser_polyfill_default().runtime.sendMessage({
              type: "puckStateChanged",
              value: state
            });
          }
        });
        this.puck.render({
          icon: this.config.toolbarIcon,
          theme: this.config.popupStyle
        });
        this.puck.setEnabledState(this.config.puckState?.active === false ? "inactive" : "active");
      }
      tearDownPuck() {
        this.puck?.unmount();
        this.puck = null;
        removePuck();
      }
      setConfig(config) {
        this.config.set(config);
      }
      get canHover() {
        return this.config.canHover;
      }
      onConfigChange(changes) {
        for (const {key, value} of changes) switch (key) {
         case "accentDisplay":
         case "posDisplay":
         case "readingOnly":
         case "showKanjiComponents":
         case "showPriority":
         case "tabDisplay":
          if (this.isTopMostWindow()) this.updatePopup();
          break;

         case "enableTapLookup":
          if (value) this.touchClickTracker.enable(); else this.touchClickTracker.disable();
          break;

         case "fontFace":
          setFontFace(value);
          break;

         case "fontSize":
          setFontSize(value);
          break;

         case "showRomaji":
          // Enabling romaji currently means we need to re-run the lookup
          if (this.isTopMostWindow() && this.currentLookupParams && this.currentTargetProps) {
            const lookupParams = {
              dictMode: "default",
              ...this.currentLookupParams,
              targetProps: this.currentTargetProps
            };
            void this.lookupText(lookupParams);
          }
          break;

         case "popupInteractive":
          if (this.isTopMostWindow()) 
          // We can't use updatePopup here since it will try to re-use the
          // existing popup display mode but we specifically want to change it
          // in this case.
          this.showPopup({
            allowOverlap: this.popupState?.pos?.allowOverlap,
            displayMode: value ? "hover" : "static"
          });
          break;

         case "popupStyle":
          setPopupStyle(value);
          this.puck?.setTheme(value);
          break;

         case "puckState":
          if (value) this.puck?.setState(value);
          break;

         case "showPuck":
          this.applyPuckConfig();
          break;

         case "toolbarIcon":
          this.puck?.setIcon(value);
          break;

         case "canHover":
          void browser_polyfill_default().runtime.sendMessage({
            type: "canHoverChanged",
            value
          });
          break;
        }
      }
      onDbUpdated() {
        // Re-trigger lookup now that the database has been updated (typically going
        // from being in the initial updating state to the updated state).
        if (this.isTopMostWindow() && this.currentLookupParams && this.currentTargetProps) {
          const lookupParams = {
            dictMode: "default",
            ...this.currentLookupParams,
            targetProps: this.currentTargetProps
          };
          void this.lookupText(lookupParams);
        }
      }
      detach() {
        this.config.removeListener(this.onConfigChange);
        window.removeEventListener("pointermove", this.onPointerMove);
        window.removeEventListener("mousedown", this.onMouseDown);
        window.removeEventListener("keydown", this.onKeyDown, {
          capture: true
        });
        window.removeEventListener("keyup", this.onKeyUp, {
          capture: true
        });
        window.removeEventListener("focusin", this.onFocusIn);
        window.removeEventListener("fullscreenchange", this.onFullScreenChange);
        window.removeEventListener("message", this.onInterFrameMessage, {
          capture: true
        });
        browser_polyfill_default().runtime.onMessage.removeListener(this.onBackgroundMessage);
        this.clearResult();
        this.tearDownPuck();
        this.textHighlighter.detach();
        this.copyState = {
          kind: "inactive"
        };
        this.isPopupExpanded = false;
        this.safeAreaProvider.destroy();
        this.touchClickTracker.destroy();
        removePopup();
        removeGdocsStyles();
      }
      setEffectiveTopMostWindow() {
        const wasTopMost = this.isTopMostWindow();
        this.isEffectiveTopMostWindow = true;
        // If we are now the top most we might now be the puck host
                if (!wasTopMost) this.applyPuckConfig();
      }
      isTopMostWindow() {
        // If a descendant of an iframe is being displayed full-screen, that iframe
        // can temporarily act as the topmost window.
        if (document.fullscreenElement) {
          if (document.fullscreenElement.tagName === "IFRAME") return false;
          if (document.fullscreenElement.ownerDocument === document) return true;
        }
        return this.isEffectiveTopMostWindow || window.self === this.getTopMostWindow();
      }
      getTopMostWindow() {
        return this.isEffectiveTopMostWindow ? window.self : window.top || window.self;
      }
      getFrameId() {
        if (typeof this.frameId === "number") return this.frameId;
        if (typeof browser_polyfill_default().runtime.getFrameId === "function") {
          const frameId = browser_polyfill_default().runtime.getFrameId(window);
          if (frameId !== -1) return frameId;
        }
        return;
      }
      setFrameId(frameId) {
        this.frameId = frameId;
      }
      onPointerMove(event) {
        this.typingMode = false;
        // Safari has an odd bug where it dispatches extra pointermove/mousemove
        // events when you press any modifier key (e.g. Shift).
        
        // It goes something like this:
        
        // * Press Shift down
        // -> mousemove with shiftKey = true
        // -> keydown with shiftKey = true
        
        // * Release Shift key
        // -> mousemove with shiftKey = false
        // -> keyup with shiftKey = false
        
        // We really need to ignore these events since they will intefere with
        // detecting taps of the "pin popup" key as well as when using Shift to only
        // show kanji.
        
        // For now the best way we know of doing that is to just check if the
        // position has changed.
        
        // 2022-09-12: This is tracked as WebKit bug
        // https://bugs.webkit.org/show_bug.cgi?id=16271
        // which was apparently fixed in July 2021 but in September 2022 I can still
        // reproduce it, at least with the control key.
        
        // 2023-08-03: It looks like this was finally fixed in May 2023 in
        // https://github.com/WebKit/WebKit/pull/14221
        // It will be some time before that's available in release Safari everywhere
        // we care about.
                if (isSafari()) {
          if ((event.shiftKey || event.altKey || event.metaKey || event.ctrlKey || this.ignoreNextPointerMove) && this.lastMouseMoveScreenPoint.x === event.clientX && this.lastMouseMoveScreenPoint.y === event.clientY) {
            // We need to ignore the mousemove event corresponding to the keyup
            // event too.
            this.ignoreNextPointerMove = !this.ignoreNextPointerMove;
            return;
          }
          this.ignoreNextPointerMove = false;
        }
        this.lastMouseMoveScreenPoint = {
          x: event.clientX,
          y: event.clientY
        };
        // If we start moving the mouse, we should stop trying to recognize a tap on
        // the "pin" key as such since it's no longer a tap (and very often these
        // keys overlap with the hold-to-show keys which are held while moving the
        // mouse).
        
        // Note that it's not enough just to check if `pinToggleState` is in the
        // 'keydown' state because it seems like sometimes browsers (at least
        // Firefox) batch up input events so that all the mousemove events arrive
        // before the keyboard events.
        
        // In order to handle that case, we need to check if the relevant key for
        // pinning are being held (and hence we are likely to get a keydown event
        // soon).
                if (this.pinToggleState === "keydown" || this.pinToggleState === "idle" && this.hasPinKeysPressed(event)) this.pinToggleState = "ignore";
        // Ignore mouse events while buttons are being pressed.
                if (event.buttons) return;
        // If we are ignoring taps, ignore events that are not from the mouse
        
        // You might think, "Why don't we just listen for mousemove events in the
        // first place?" but iOS Safari will dispatch mousemove events for touch
        // events too (e.g. if you start to select text) and we need to ignore them
        // so we need to know what kind of "mousemove" event we got.
        
        // If we are NOT ignoring taps then we probably should allow other pointer
        // types since it's probably useful to look up things with a pen?
                if (!this.config.enableTapLookup && event.pointerType !== "mouse") return;
        // We don't know how to deal with anything that's not an element
                if (!(event.target instanceof Element)) return;
        // Ignore mouse moves if we are pinned
                if (!isTouchClickEvent(event) && this.popupState?.display.mode === "pinned") {
          this.lastMouseTarget = event.target;
          return;
        }
        // Ignore mouse events on the popup window
                if (isPopupWindowHostElem(event.target)) return;
        // Check if we have released the hold-to-show keys such that a ghosted popup
        // should be committed.
        
        // Normally we'd handle this case in onKeyUp, but it's possible, even common
        // to have the focus in a different window/frame while mousing over content.
        
        // Our window/frame will still get mousemove events with the corresponding
        // modifier key attributes set so we can _show_ the popup, but we _won't_
        // get the `keyup` event(s) when the modifier(s) are released so instead
        // we need to try and detect when that happens on the next mousemove event.
                if (!isTouchClickEvent(event) && this.popupState?.display.mode === "ghost" && this.popupState.display.trigger === "keys" && !(this.getActiveHoldToShowKeys(event) & this.popupState.display.keyType)) {
          this.commitPopup();
          return;
        }
        // Check if any required "hold to show keys" are held.
        
        // We do this before checking throttling since that can be expensive and
        // when this is configured, typically the user will have the extension
        // more-or-less permanently enabled so we don't want to add unnecessary
        // latency to regular mouse events.
        
        // Note that the "hold to show keys" setting is only relevant for mouse
        // events, not puck events.
                const contentsToMatch = this.getActiveHoldToShowKeys(event) | (isPuckPointerEvent(event) || isTouchClickEvent(event) ? 3 : 0);
        const matchText = !!(contentsToMatch & 1);
        const matchImages = !!(contentsToMatch & 2);
        // If nothing is going to match, close the popup. If we're in hover mode,
        // however, we need to proceed with the regular processing to see if we are
        // hovering over the arrow area or not.
        
        // (For pinned mode and touch mode, contentsToMatch is guaranteed to be
        // non-zero. For static mode we certainly want to close the popup, and we
        // never seem to hit this case in ghost mode but presumably if we did we'd
        // want to close the popup.)
                if (!contentsToMatch && this.popupState?.display.mode !== "hover") {
          if (this.popupState) this.clearResult({
            currentElement: event.target
          });
          // We still want to set the current position and element information so
          // that if the user presses the hold-to-show keys later we can show the
          // popup immediately.
                    this.currentPagePoint = toPageCoords({
            x: event.clientX,
            y: event.clientY
          });
          this.lastMouseTarget = event.target;
          return;
        }
        // If the mouse have moved in a triangular shape between the original popup
        // point and the popup, don't hide it, but instead allow the user to
        // interact with the popup.
                if (this.isEnRouteToPopup(event)) return;
        // If the mouse is moving too quickly, don't show the popup
                if (this.shouldThrottlePopup(event)) {
          this.clearResult({
            currentElement: event.target
          });
          return;
        }
        let dictMode = "default";
        if (event.shiftKey && this.config.keys.kanjiLookup.includes("Shift")) {
          this.kanjiLookupMode = event.shiftKey;
          dictMode = "kanji";
        }
        // Record the last mouse target in case we need to trigger the popup
        // again.
                this.lastMouseTarget = event.target;
        void this.tryToUpdatePopup({
          fromPuck: isPuckPointerEvent(event),
          fromTouch: isTouchClickEvent(event),
          matchText,
          matchImages,
          screenPoint: {
            x: event.clientX,
            y: event.clientY
          },
          eventElement: event.target,
          dictMode
        });
      }
      isEnRouteToPopup(event) {
        if (isPuckPointerEvent(event) || isTouchClickEvent(event)) return false;
        if (this.popupState?.display.mode !== "hover" || !this.popupState.pos?.lookupPoint) return false;
        const {x: popupX, y: popupY, width: popupWidth, height: popupHeight, direction, lookupPoint: {x: lookupX, y: lookupY, marginX: lookupMarginX, marginY: lookupMarginY}} = this.popupState.pos;
        // If the popup is not related to the mouse position we don't want to allow
        // mousing over it as it might require making most of the screen
        // un-scannable.
                if (direction === "disjoint") return false;
        // Check block axis range
                const lookupBlockPos = direction === "vertical" ? lookupY : lookupX;
        // Get the closest edge of the popup edge
                const popupBlockPos = direction === "vertical" ? popupY : popupX;
        const popupBlockSize = direction === "vertical" ? popupHeight : popupWidth;
        const popupEdge = popupBlockPos >= lookupBlockPos ? popupBlockPos : popupBlockPos + popupBlockSize;
        // Work out the distance between the lookup point and the edge of the popup
                const popupDist = popupEdge - lookupBlockPos;
        // Work out the mouse distance from the lookup point
        
        // NOTE: We _don't_ want to use event.pageY/pageX since that will return the
        // wrong result when we are in full-screen mode. Instead we should manually
        // add the scroll offset in.
                const {scrollX, scrollY} = getScrollOffset();
        const mouseBlockPos = direction === "vertical" ? event.clientY + scrollY : event.clientX + scrollX;
        // Work out the portion of the distance we are in the gap between the lookup
        // point and the edge of the popup.
                const blockOffset = popupDist < 0 ? lookupBlockPos - mouseBlockPos : mouseBlockPos - lookupBlockPos;
        const blockRange = Math.abs(popupDist);
        const blockMargin = direction === "vertical" ? lookupMarginY : lookupMarginX;
        // Check if we are in the gap (or the margin)
                if (blockOffset < -blockMargin || blockOffset > blockRange) return false;
        // Check the inline range
        
        // We do this by basically drawing a triangle from the lookup point spanning
        // outwards towards the edge of the popup using the defined angle.
        
        // e.g.
        
        //                    +
        //                  /  \
        //                 / x  \
        //                /<-D-->\
        //               /        \
        //  +----------------------------------------------+
        //  |           <----B---->                        |
        //  |           ^                                  |
        //  |           C                                  |
        //  A
        
        // + = Lookup point (lookup inline position)
        // x = Mouse position
        // A = Inline popup start
        // B = Max inline range (i.e. the inline range at the edge)
        // C = Max inline range start
        // D = Proportional inline range
                const lookupInlinePos = direction === "vertical" ? lookupX : lookupY;
        const mouseInlinePos = direction === "vertical" ? event.clientX + scrollX : event.clientY + scrollY;
        const ENVELOPE_SPREAD_DEGREES = 120;
        const inlineHalfRange = Math.tan(ENVELOPE_SPREAD_DEGREES / 2 * Math.PI / 180) * blockOffset;
        const inlineMargin = direction === "vertical" ? lookupMarginX : lookupMarginY;
        const inlineRangeStart = lookupInlinePos - Math.max(inlineHalfRange, inlineMargin);
        const inlineRangeEnd = lookupInlinePos + Math.max(inlineHalfRange, inlineMargin);
        if (mouseInlinePos < inlineRangeStart || mouseInlinePos > inlineRangeEnd) return false;
        return true;
      }
      shouldThrottlePopup(event) {
        if (!this.hidePopupWhenMovingAtSpeed) return false;
        let averageSpeed = 0;
        if (this.previousMousePosition && this.previousMouseMoveTime) {
          // If the events are backed up their times might be equal. Likewise, if
          // the events are more than a couple of animation frames apart either the
          // mouse stopped, or the system is backed up and the OS can't even
          // dispatch the events.
          // In either case we should:
          // - Update the previous mouse position and time so that when we get the
          //   *next* event we can accurately measure the speed.
          // - Not throttle the popup since for some content we might always be
          //   backed up (YouTube with browser console open seems particularly bad)
          //   and its safer to just allow the popup in this case rather than risk
          //   permanently hiding it.
          if (event.timeStamp === this.previousMouseMoveTime || event.timeStamp - this.previousMouseMoveTime > 32) {
            this.previousMousePosition = {
              x: event.pageX,
              y: event.pageY
            };
            this.previousMouseMoveTime = event.timeStamp;
            return false;
          }
          const distance = Math.sqrt(Math.pow(event.pageX - this.previousMousePosition.x, 2) + Math.pow(event.pageY - this.previousMousePosition.y, 2));
          const speed = distance / (event.timeStamp - this.previousMouseMoveTime);
          this.mouseSpeeds.push(speed);
          this.mouseSpeedRollingSum += speed;
          if (this.mouseSpeeds.length > ContentHandler.MOUSE_SPEED_SAMPLES) this.mouseSpeedRollingSum -= this.mouseSpeeds.shift();
          averageSpeed = this.mouseSpeedRollingSum / this.mouseSpeeds.length;
        }
        this.previousMousePosition = {
          x: event.pageX,
          y: event.pageY
        };
        this.previousMouseMoveTime = event.timeStamp;
        return averageSpeed >= ContentHandler.MOUSE_SPEED_THRESHOLD;
      }
      onMouseDown(event) {
        // Ignore mouse events on the popup window
        if (isPopupWindowHostElem(event.target)) return;
        // Clear the highlight since it interferes with selection.
                this.clearResult({
          currentElement: event.target
        });
      }
      onKeyDown(event) {
        const textBoxInFocus = document.activeElement && isEditableNode(document.activeElement);
        // If the user pressed the hold-to-show key combination, show the popup
        // if possible.
        
        // It's important we only do this when the popup is not visible, however,
        // since these keys may overlap with the keys we've defined for pinning the
        // popup--which only apply when the popup is visible.
                const matchedHoldToShowKeys = this.isHoldToShowKeyStroke(event);
        if (matchedHoldToShowKeys && !this.isVisible()) {
          event.preventDefault();
          // We don't do this when the there is a text box in focus because we
          // we risk interfering with the text selection when, for example, the
          // hold-to-show key is Ctrl and the user presses Ctrl+V etc.
                    if (!textBoxInFocus && this.currentPagePoint && this.lastMouseTarget) void this.tryToUpdatePopup({
            fromPuck: false,
            fromTouch: false,
            matchText: !!(matchedHoldToShowKeys & 1),
            matchImages: !!(matchedHoldToShowKeys & 2),
            screenPoint: toScreenCoords(this.currentPagePoint),
            eventElement: this.lastMouseTarget,
            dictMode: "default"
          });
          return;
        }
        // If we got shift in combination with something else, ignore.
        
        // We need to allow shift by itself because it is used for switching
        // dictionaries. However, if the user presses, Cmd + Shift + 3, for example,
        // we should ignore the last two keystrokes.
        
        // TODO: We should refine this somehow so that it's possible to toggle
        // dictionaries using Shift while pressing the hold-to-show keys.
        
        // See https://github.com/birchill/10ten-ja-reader/issues/658
                if (event.shiftKey && (event.ctrlKey || event.altKey || event.metaKey || event.key !== "Shift")) {
          this.typingMode = true;
          return;
        }
        // If we're not visible we should ignore any keystrokes.
                if (!this.isVisible()) {
          this.typingMode = true;
          return;
        }
        // If we're focussed on a text-editable node and in typing mode, don't try
        // to handle keystrokes. This is so that if the user has accidentally left
        // their mouse sitting over some Japanese text we don't interfere with
        // typing.
        
        // The one exception to this is Google Docs. In Google Docs when the
        // document canvas is in focus it puts the focus on a contenteditable
        // element in a 1 pixel high iframe.
        
        // Normally, whenever we see a mousemove event we will reset the
        // `typingMode` flag but becuase the iframe is only 1 pixel high, the iframe
        // will never see those mousemove events and hence `typingMode` will only
        // get cleared on the top-most document and not the iframe.
        
        // The `keydown` events, however, will go to the iframe. If we ignore them
        // because `typingMode` is true we will end up ignoring all keyboard events
        // while the canvas is in focus.
        
        // Instead we just allow these events through on Google docs and accept that
        // if the popup is showing it might interfere with typing.
                const isGoogleDocsIframe = () => {
          try {
            // On Firefox the iframe src is javascript:undefined which ends up
            // getting host docs.google.com, while on Chrome the iframe src is
            // about:blank which has an empty host.
            // We wrap the whole thing in try/catch because I'm paranoid about
            // cross-origin things throwing security exceptions.
            return (document.location.host === "docs.google.com" || window.top?.location.host === "docs.google.com") && window.frameElement;
          } catch {
            return false;
          }
        };
        if (textBoxInFocus && this.typingMode && !isGoogleDocsIframe()) return;
        if (this.handleKey(event)) {
          // We handled the key stroke so we should break out of typing mode.
          this.typingMode = false;
          event.stopPropagation();
          event.preventDefault();
        } else if (textBoxInFocus) {
          // If we are focussed on a textbox and the keystroke wasn't one we handle
          // one, enter typing mode and hide the pop-up.
          this.clearResult({
            currentElement: this.lastMouseTarget
          });
          this.typingMode = true;
        }
      }
      onKeyUp(event) {
        // If we are showing a popup that required certain hold keys, check if they
        // are now no longer held, and, if they are not, trigger an update of the
        // popup where we mark it as interactive
        if (this.popupState?.display.mode === "ghost" && this.popupState.display.trigger === "keys" && !(this.getActiveHoldToShowKeys(event) & this.popupState.display.keyType)) this.commitPopup();
        const pinPopup = normalizeKeys(this.config.keys.pinPopup);
        // On Chrome, if we auto-fill a text box, the event.key member can be
        // undefined.
                const key = event.key ? normalizeKey(event.key) : "";
        if (pinPopup.includes(key)) {
          if (this.pinToggleState === "keydown" && this.togglePin()) event.preventDefault();
          this.pinToggleState = "idle";
        }
        if (!this.kanjiLookupMode) return;
        if (event.key === "Shift") {
          this.kanjiLookupMode = false;
          event.preventDefault();
        }
      }
      handleKey(event) {
        // Make an upper-case version of the list of keys so that we can do
        // a case-insensitive comparison. This is so that the keys continue to work
        // even when the user has Caps Lock on.
        const {keys} = this.config;
        const [nextDictionary, toggleDefinition, expandPopup, closePopup, pinPopup, movePopupUp, movePopupDown, startCopy] = [ normalizeKeys(keys.nextDictionary), normalizeKeys(keys.toggleDefinition), normalizeKeys(keys.expandPopup), normalizeKeys(keys.closePopup), normalizeKeys(keys.pinPopup), normalizeKeys(keys.movePopupUp), normalizeKeys(keys.movePopupDown), normalizeKeys(keys.startCopy) ];
        const key = normalizeKey(event.key);
        if (nextDictionary.includes(key)) {
          // If we are in kanji lookup mode, ignore 'Shift' keydown events since it
          // is also the key we use to trigger lookup mode.
          if (key === "SHIFT" && this.kanjiLookupMode) return true;
          this.showNextDictionary();
        } else if (toggleDefinition.includes(key)) {
          try {
            // We don't wait on the following because we're only really interested
            // in synchronous failures which occur in some browsers when the content
            // script is stale.
            void browser_polyfill_default().runtime.sendMessage({
              type: "toggleDefinition"
            });
          } catch {
            console.warn("[10ten-ja-reader] Failed to call toggleDefinition. The page might need to be refreshed.");
            return false;
          }
          this.toggleDefinition();
        } else if (movePopupDown.includes(key)) this.movePopup("down"); else if (movePopupUp.includes(key)) this.movePopup("up"); else if (// It's important we _don't_ enter copy mode when the Ctrl key is being
        // pressed since otherwise if the user simply wants to copy the selected
        // text by pressing Ctrl+C they will end up entering copy mode.
        !hasModifiers(event) && startCopy.includes(key)) if (this.copyState.kind === "inactive" || this.copyState.kind === "finished") this.enterCopyMode({
          trigger: "keyboard"
        }); else this.nextCopyEntry(); else if (this.copyState.kind !== "inactive" && key === "ESC") this.exitCopyMode(); else if (expandPopup.includes(key)) this.expandPopup(); else if (closePopup.includes(key)) this.clearResult(); else if (pinPopup.includes(key) && // We don't want to detect a pin keystroke if we are still in the ghost
        // state since otherwise when the hold-to-show keys and pin keys overlap
        // we'll end up going straight into the pin state if the user happens
        // to be still when they release the hold-to-show keys.
        this.popupState?.display.mode !== "ghost" && // Likewise if we got a mouse move since the first keydown event occurred
        // we should ignore subsequent keydown events.
        this.pinToggleState !== "ignore") this.pinToggleState = "keydown"; else if (this.isHoldToShowKeyStroke(event)) return true; else if (this.copyState.kind !== "inactive" && this.copyState.kind !== "finished") {
          let copyType;
          for (const copyKey of CopyKeys) if (key === copyKey.key.toUpperCase()) {
            copyType = copyKey.type;
            break;
          }
          if (typeof copyType === "undefined") 
          // Unrecognized key
          return false;
          this.copyCurrentEntry(copyType);
        } else return false;
        return true;
      }
      onFocusIn(event) {
        if (this.textHighlighter.isUpdatingFocus()) return;
        // If we focussed on a text box, assume we want to type in it and ignore
        // keystrokes until we get another mousemove.
                this.typingMode = !!event.target && isEditableNode(event.target);
        // If we entered typing mode clear the highlight.
                if (this.typingMode) this.clearResult({
          currentElement: this.lastMouseTarget
        });
      }
      // Test if an incoming keyboard event matches the hold-to-show key sequence.
      isHoldToShowKeyStroke(event) {
        // Check if it is a modifier at all
        if (![ "Alt", "AltGraph", "Control" ].includes(event.key)) return 0;
        const definedKeys = (this.config.holdToShowKeys.length ? 1 : 0) | (this.config.holdToShowImageKeys.length ? 2 : 0);
        return definedKeys & this.getActiveHoldToShowKeys(event);
      }
      // Test if hold-to-show keys are set for a given a UI event
      getActiveHoldToShowKeys(event) {
        const areKeysDownForSetting = setting => {
          if (typeof this.config[setting] === "undefined" || !Array.isArray(this.config[setting]) || !this.config[setting].length) return true;
          // Check if all the configured hold-to-show keys are pressed down
                    const hasAltGraph = event.getModifierState("AltGraph");
          if (this.config[setting].includes("Alt") && !event.altKey && !hasAltGraph) return false;
          if (this.config[setting].includes("Ctrl") && !event.ctrlKey) return false;
          return true;
        };
        return (areKeysDownForSetting("holdToShowKeys") ? 1 : 0) | (areKeysDownForSetting("holdToShowImageKeys") ? 2 : 0);
      }
      hasPinKeysPressed(event) {
        const pinPopupKeys = this.config.keys.pinPopup;
        const hasAltGraph = event.getModifierState("AltGraph");
        return pinPopupKeys.includes("Ctrl") && event.ctrlKey || pinPopupKeys.includes("Alt") && (event.altKey || hasAltGraph);
      }
      isVisible() {
        return this.isTopMostWindow() ? isPopupVisible() : !!this.popupState;
      }
      onFullScreenChange() {
        if (this.popupState?.display.mode === "pinned") this.unpinPopup();
        // If entering / leaving fullscreen caused a change in who is the topmost
        // window we might have some setup / clean up to do.
                if (this.isTopMostWindow()) this.applyPuckConfig(); else {
          removePopup();
          this.clearResult();
          this.tearDownPuck();
        }
      }
      onInterFrameMessage(event) {
        // NOTE: Please do not add additional messages here.
        // We want to avoid using postMessage at all costs. Please see the rationale
        // for this one exception here:
        // https://github.com/birchill/10ten-ja-reader/issues/747#issuecomment-918774588
        const PuckMovedMessageSchema = dist_type({
          type: literal("10ten(ja):puckMoved"),
          clientX: dist_number(),
          clientY: dist_number()
        });
        if (!is(event.data, PuckMovedMessageSchema)) return;
        // Make sure no-one else sees this message since some apps will get confused
        // if they see unrecognized messages.
                event.stopImmediatePropagation();
        event.preventDefault();
        const {clientX, clientY} = event.data;
        const pointerEvent = new PointerEvent("pointermove", {
          // Make sure the event bubbles up to the listener on the window
          bubbles: true,
          clientX,
          clientY,
          pointerType: "mouse"
        });
        pointerEvent.fromPuck = true;
        const documentBody = window.self.document.body;
        if (!documentBody) 
        // Hasn't loaded yet
        return;
        documentBody.dispatchEvent(pointerEvent);
      }
      async onBackgroundMessage(request) {
        assert(request, BackgroundMessageSchema);
        // Most messages are targeted at specific frames and should only arrive
        // there. However, Safari doesn't support sending to specific frames so we
        // also explicitly indicate the target within each message so we can ignore
        // those not intended for us.
                if (request.frame === "top" && !this.isTopMostWindow()) return "ok";
        if (request.frame === "children" && this.isTopMostWindow()) return "ok";
        if (typeof request.frame === "number" && this.getFrameId() !== request.frame) return "ok";
        switch (request.type) {
         case "popupShown":
          {
            // Check if this request has translated the popup geometry for us
            // If not, we should leave `pos` as undefined so we know not to use
            // it.
            let pos;
            const {pos: requestPos} = request.state;
            if (requestPos && this.getFrameId() === requestPos.frameId) {
              const {scrollX, scrollY} = getScrollOffset();
              const {x, y, lookupPoint} = requestPos;
              pos = {
                ...requestPos,
                x: x + scrollX,
                y: y + scrollY,
                lookupPoint: lookupPoint ? {
                  x: lookupPoint.x + scrollX,
                  y: lookupPoint.y + scrollY,
                  marginX: lookupPoint.marginX,
                  marginY: lookupPoint.marginY
                } : void 0
              };
            }
            // We don't need to worry about clearing any timeout that may have
            // been set in `this.popupState.ghost.timeout` because that timeout
            // is cleared by the top-most window (which we are not).
                        this.popupState = {
              ...request.state,
              pos
            };
          }
          break;

         case "popupHidden":
          this.currentTextRange = void 0;
          this.currentPagePoint = void 0;
          this.copyState = {
            kind: "inactive"
          };
          this.isPopupExpanded = false;
          this.popupState = void 0;
          break;

         case "isPopupShowing":
          if (this.isVisible() && this.popupState) void browser_polyfill_default().runtime.sendMessage({
            type: "frame:popupShown",
            frameId: request.frameId,
            state: this.getTranslatedPopupState({
              frameId: request.frameId
            }, this.popupState)
          });
          break;

         case "highlightText":
          this.highlightText(request.length);
          break;

         case "clearTextHighlight":
          this.clearTextHighlight();
          break;

         case "lookup":
          {
            const iframe = findIframeElement({
              frameId: request.source.frameId,
              initialSrc: request.source.initialSrc,
              currentSrc: request.source.currentSrc,
              dimensions: request.source.dimensions
            });
            let iframeOriginPoint;
            if (!iframe) {
              console.warn("[10ten-ja-reader] Couldn't find iframe element");
              // Just use the top-left corner since that's probably better than
              // not showing the popup at all.
                            iframeOriginPoint = {
                x: 0,
                y: 0
              };
            } else iframeOriginPoint = getIframeOrigin(iframe);
            // Translate the point from the iframe's coordinate system to ours.
                        const {point} = request;
            this.currentPagePoint = toPageCoords({
              x: point.x + iframeOriginPoint.x,
              y: point.y + iframeOriginPoint.y
            });
            // Similarly translate any text box sizes.
                        let targetProps = request.targetProps;
            if (targetProps.textBoxSizes) {
              const scrollOffset = getScrollOffset();
              targetProps = JSON.parse(JSON.stringify(targetProps));
              const {textBoxSizes} = targetProps;
              for (const size of textBoxSizeLengths) {
                const {left, top, width, height} = textBoxSizes[size];
                // We pass sizes around in screen coordinates but store them in
                // page coordinates.
                                textBoxSizes[size] = toPageCoords({
                  left: left + iframeOriginPoint.x,
                  top: top + iframeOriginPoint.y,
                  width,
                  height
                }, scrollOffset);
              }
            }
            // We are doing a lookup based on an iframe's contents so we should
            // clear any mouse target we previously stored.
                        this.lastMouseTarget = null;
            const meta = request.meta;
            void this.lookupText({
              ...request,
              meta,
              targetProps,
              source: request.source
            });
          }
          break;

         case "pinPopup":
          this.pinPopup();
          break;

         case "unpinPopup":
          this.unpinPopup();
          break;

         case "commitPopup":
          this.commitPopup();
          break;

         case "clearResult":
          this.clearResult();
          break;

         case "nextDictionary":
          this.showNextDictionary();
          break;

         case "toggleDefinition":
          this.toggleDefinition();
          break;

         case "expandPopup":
          this.expandPopup();
          break;

         case "movePopup":
          this.movePopup(request.direction);
          break;

         case "enterCopyMode":
          this.enterCopyMode({
            trigger: "keyboard"
          });
          break;

         case "exitCopyMode":
          this.exitCopyMode();
          break;

         case "nextCopyEntry":
          this.nextCopyEntry();
          break;

         case "copyCurrentEntry":
          this.copyCurrentEntry(request.copyType);
          break;
        }
        return "ok";
      }
      showNextDictionary() {
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:nextDictionary"
          });
          return;
        }
        if (this.currentPagePoint) this.showDictionary("next");
      }
      toggleDefinition() {
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:toggleDefinition"
          });
          return;
        }
        this.config.readingOnly = !this.config.readingOnly;
        this.updatePopup();
      }
      expandPopup() {
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:expandPopup"
          });
          return;
        }
        if (this.isPopupExpanded) return;
        this.isPopupExpanded = true;
        this.updatePopup({
          allowOverlap: true,
          fixPosition: true
        });
      }
      movePopup(direction) {
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:movePopup",
            direction
          });
          return;
        }
        if (direction === "down") this.popupPositionMode = (this.popupPositionMode + 1) % (popup_position_PopupPositionMode.End + 1); else this.popupPositionMode = mod(this.popupPositionMode - 1, popup_position_PopupPositionMode.End + 1);
        this.updatePopup();
      }
      enterCopyMode({trigger, index = 0}) {
        // In the iframe case, we mirror the copyMode state in both iframe and
        // topmost window because:
        // - The topmost window needs to know the copyMode state so that it can
        //   render the popup correctly, but
        // - The iframe needs to know the copyMode state so that it can determine
        //   how to handle copyMode-specific keystrokes.
        this.copyState = {
          kind: "active",
          index,
          mode: trigger
        };
        if (!this.isTopMostWindow()) {
          console.assert(trigger === "keyboard", "[10ten-ja-reader] We probably should't be receiving touch or mouse events in the iframe");
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:enterCopyMode"
          });
          return;
        }
        this.updatePopup({
          allowOverlap: true,
          fixPosition: true
        });
      }
      exitCopyMode() {
        // Use the existing copyState to determine if we need to maintain the popup
        // size and position.
        const fixPopup = this.shouldFixPopupWhenExitingCopyMode();
        // As with enterCopyMode, we mirror the copyMode state in both iframe and
        // topmost window.
                this.copyState = {
          kind: "inactive"
        };
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:exitCopyMode"
          });
          return;
        }
        this.updatePopup({
          fixPosition: fixPopup,
          fixMinHeight: fixPopup
        });
      }
      shouldFixPopupWhenExitingCopyMode() {
        return getCopyMode(this.copyState) === "mouse" && // If the popup is pinned, there's no need to fix the height
        this.popupState?.display.mode !== "pinned";
      }
      nextCopyEntry() {
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:nextCopyEntry"
          });
          return;
        }
        if (this.copyState.kind === "active" || this.copyState.kind === "error") this.copyState = {
          kind: "active",
          index: this.copyState.index + 1,
          mode: this.copyState.mode
        };
        this.updatePopup({
          fixPosition: true
        });
      }
      copyCurrentEntry(copyType) {
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:copyCurrentEntry",
            copyType
          });
          return;
        }
        const copyEntry = this.getCopyEntry();
        if (!copyEntry) return;
        const textToCopy = getTextToCopy({
          entry: copyEntry,
          copyType,
          getMessage: browser_polyfill_default().i18n.getMessage.bind(browser_polyfill_default().i18n),
          includeAllSenses: this.config.copySenses !== "first",
          includePartOfSpeech: this.config.copyPos !== "none",
          includeLessCommonHeadwords: this.config.copyHeadwords !== "common",
          kanjiReferences: this.config.kanjiReferences,
          showKanjiComponents: this.config.showKanjiComponents
        });
        void this.copyString(textToCopy, copyType);
      }
      getCopyEntry() {
        if (this.copyState.kind !== "active") {
          console.error("[10ten-ja-reader] Expected to be in copy mode");
          return null;
        }
        if (!this.currentSearchResult) return null;
        const copyEntry = getCopyEntryFromResult({
          result: this.currentSearchResult,
          series: this.currentDict,
          index: this.copyState.index
        });
        if (!copyEntry) {
          const fixPopup = this.shouldFixPopupWhenExitingCopyMode();
          this.copyState = {
            kind: "inactive"
          };
          this.updatePopup({
            fixPosition: fixPopup,
            fixMinHeight: fixPopup
          });
        }
        return copyEntry;
      }
      async copyString(message, copyType) {
        if (this.copyState.kind === "inactive") return;
        const fixPopup = this.shouldFixPopupWhenExitingCopyMode();
        const {index, mode} = this.copyState;
        try {
          await copyText(message);
          this.copyState = {
            kind: "finished",
            type: copyType,
            index,
            mode
          };
        } catch (e) {
          console.error(e);
          this.copyState = {
            kind: "error",
            index,
            mode
          };
        }
        this.updatePopup({
          fixPosition: fixPopup,
          fixMinHeight: fixPopup
        });
        // Reset the copy state so that it doesn't re-appear next time we re-render
        // the popup.
                this.copyState = {
          kind: "inactive"
        };
      }
      highlightText(length) {
        if (!this.currentTextRange?.length) return;
        this.textHighlighter.highlight({
          length,
          textRange: this.currentTextRange,
          style: this.config.highlightStyle
        });
        this.puck?.highlightMatch();
      }
      clearTextHighlight(currentElement = null) {
        this.textHighlighter.clearHighlight({
          currentElement
        });
        this.puck?.clearHighlight();
      }
      // The currentElement here is _only_ used to avoid resetting the scroll
      // position when we clear the text selection of a text box.
      // That is, if we go to clear the text selection of a text box but we are
      // still interacting with that element, then we take extra steps to ensure
      // the scroll position does not change.
      clearResult({currentElement = null} = {}) {
        this.currentTextRange = void 0;
        this.currentPagePoint = void 0;
        this.lastMouseTarget = null;
        this.copyState = {
          kind: "inactive"
        };
        clearPopupTimeout(this.popupState);
        this.popupState = void 0;
        if (this.isTopMostWindow() && this.currentLookupParams?.source) {
          const {source: {frameId}} = this.currentLookupParams;
          void browser_polyfill_default().runtime.sendMessage({
            type: "frame:clearTextHighlight",
            frameId
          });
          this.puck?.clearHighlight();
        } else this.clearTextHighlight(currentElement);
        if (this.isTopMostWindow()) this.hidePopup(); else void browser_polyfill_default().runtime.sendMessage({
          type: "top:clearResult"
        });
        // Start tracking touch taps again now that the window is hidden.
                this.touchClickTracker.stopIgnoringClicks();
      }
      async tryToUpdatePopup({fromPuck, fromTouch, matchText, matchImages, screenPoint, eventElement, dictMode}) {
        const textAtPoint = getTextAtPoint({
          matchCurrency: !!this.config.fx,
          matchText,
          matchImages,
          point: screenPoint,
          maxLength: ContentHandler.MAX_LENGTH
        });
        // We might have failed to find a match because we didn't have the
        // necessary keys held down.
        
        // In that case, we still want to store the current point so that if those
        // keys are pressed later, we can show the pop-up immediately.
                if (!textAtPoint && (!matchText || !matchImages)) this.currentPagePoint = toPageCoords(screenPoint);
        // Check if the text range was the same as the last time.
        
        // The following is not strictly correct since if dictMode was 'kanji'
        // but is now 'default' then technically we shouldn't return early
        // since the result will likely differ.
        
        // In practice, however, locking the result to the previously shown
        // dictionary in this case is not a problem. On the contrary it makes
        // toggling dictionaries a little less sensitive to minor mouse movements
        // and hence easier to work with.
                if (// We require that at least one of the text ranges was set (or for there
        // to be no text discovered at all), however, since otherwise for the case
        // of a non-text element (e.g. an <img> with a title attribute) where
        // textAtPoint.textRange is null but textAtPoint.text is set, we'll end up
        // returning early and not displaying the popup.
        (this.currentTextRange || !textAtPoint || textAtPoint.textRange) && textRangesEqual(this.currentTextRange, textAtPoint?.textRange) && dictMode === "default") return;
        // If we got no result, clear the result.
                if (!textAtPoint) {
          this.clearResult({
            currentElement: eventElement
          });
          return;
        }
        this.currentPagePoint = toPageCoords(screenPoint);
        this.currentTextRange = textAtPoint?.textRange || void 0;
        const pageTargetProps = getPageTargetProps({
          fromPuck,
          fromTouch,
          target: eventElement,
          textRange: textAtPoint?.textRange || void 0
        });
        const lookupParams = {
          dictMode,
          meta: textAtPoint.meta,
          source: null,
          text: textAtPoint.text,
          targetProps: pageTargetProps,
          wordLookup: !!textAtPoint.textRange
        };
        if (this.isTopMostWindow()) void this.lookupText(lookupParams); else void browser_polyfill_default().runtime.sendMessage({
          ...lookupParams,
          type: "top:lookup",
          // We use screen coordinates for values we pass between frames
          point: screenPoint,
          targetProps: {
            ...pageTargetProps,
            textBoxSizes: selectionSizesToScreenCoords(pageTargetProps.textBoxSizes)
          },
          source: {
            // The background page will fill in our frame ID for us
            src: document.location.href,
            dimensions: getWindowDimensions()
          }
        });
      }
      // ------------------------------------------------------------------------
      // (Mostly) Top-most window concerns
      // ------------------------------------------------------------------------
      async lookupText({dictMode, meta, source, text, targetProps, wordLookup}) {
        this.currentLookupParams = {
          text,
          meta,
          wordLookup,
          source
        };
        // Presumably the text or dictionary has changed so break out of copy mode
                this.copyState = {
          kind: "inactive"
        };
        // Likewise reset the expanded state
                this.isPopupExpanded = false;
        const queryResult = await query(text, {
          includeRomaji: this.config.showRomaji,
          metaMatchLen: meta?.matchLen,
          wordLookup,
          updateQueryResult: queryResult => {
            void this.applyQueryResult({
              dictMode,
              meta,
              queryResult,
              targetProps,
              text,
              wordLookup
            });
          }
        });
        void this.applyQueryResult({
          dictMode,
          meta,
          queryResult,
          targetProps,
          text,
          wordLookup
        });
      }
      async applyQueryResult({dictMode, meta, queryResult, targetProps, text, wordLookup}) {
        const lookupParams = {
          text,
          meta,
          wordLookup
        };
        // Check if we have triggered a new query or been disabled while running
        // the previous query.
                if (!this.currentLookupParams || JSON.stringify(lookupParams) !== JSON.stringify(stripFields(this.currentLookupParams, [ "source" ]))) return;
        if (!queryResult && !meta) {
          this.clearResult({
            currentElement: this.lastMouseTarget
          });
          return;
        }
        // Determine the dictionary to show
                let dict = "words";
        if (queryResult) {
          switch (dictMode) {
           case "default":
            if (!queryResult.words && !meta) 
            // Prefer the names dictionary if we have a names result of more
            // than one character or if we have no kanji results.
            // Otherwise, follow the usual fallback order words -> kanji ->
            // names.
            dict = queryResult.names && queryResult.names.matchLen > 1 || !queryResult.kanji ? "names" : "kanji";
            break;

           case "kanji":
            if (!queryResult.kanji) queryResult = null; else dict = "kanji";
            break;
          }
          this.currentDict = dict;
        }
        this.currentSearchResult = queryResult || void 0;
        this.currentTargetProps = targetProps;
        this.highlightTextForCurrentResult();
        this.showPopup();
      }
      showDictionary(dictToShow, options = {}) {
        if (!this.currentSearchResult) return;
        let dict;
        const cycleOrder = [ "words", "kanji", "names" ];
        if (dictToShow === "next") {
          dict = this.currentDict;
          let next = (cycleOrder.indexOf(this.currentDict) + 1) % cycleOrder.length;
          while (cycleOrder[next] !== this.currentDict) {
            const nextDict = cycleOrder[next];
            if (this.currentSearchResult[nextDict] || nextDict === "words" && !!this.currentLookupParams?.meta) {
              dict = nextDict;
              break;
            }
            next = ++next % cycleOrder.length;
          }
        } else if (dictToShow === "prev") {
          dict = this.currentDict;
          let prev = mod(cycleOrder.indexOf(this.currentDict) - 1, cycleOrder.length);
          while (cycleOrder[prev] !== this.currentDict) {
            const prevDict = cycleOrder[prev];
            if (this.currentSearchResult[prevDict] || prevDict === "words" && !!this.currentLookupParams?.meta) {
              dict = prevDict;
              break;
            }
            prev = mod(--prev, cycleOrder.length);
          }
        } else dict = dictToShow;
        if (dict === this.currentDict) return;
        this.currentDict = dict;
        // Exit copy state if we are changing tabs
                this.copyState = {
          kind: "inactive"
        };
        // Reset expanded state since we are changing tabs
                this.isPopupExpanded = false;
        this.highlightTextForCurrentResult();
        this.updatePopup({
          allowOverlap: options?.fixPopupPosition,
          fixPosition: options?.fixPopupPosition
        });
      }
      highlightTextForCurrentResult() {
        const highlightLength = this.getHighlightLengthForCurrentResult();
        // Check we have something to highlight
                if (highlightLength < 1) return;
        if (this.currentLookupParams?.source) {
          const {source: {frameId}} = this.currentLookupParams;
          void browser_polyfill_default().runtime.sendMessage({
            type: "frame:highlightText",
            frameId,
            length: highlightLength
          });
          this.puck?.highlightMatch();
          return;
        }
        this.highlightText(highlightLength);
      }
      getHighlightLengthForCurrentResult() {
        if (this.config.noTextHighlight) return 0;
        const searchResult = this.currentSearchResult?.[this.currentDict];
        return Math.max(searchResult?.matchLen || 0, this.currentLookupParams?.meta?.matchLen || 0);
      }
      showPopup(options = {}) {
        if (!this.isTopMostWindow()) {
          console.warn("[10ten-ja-reader] Called showPopup from iframe.");
          return;
        }
        if (!this.currentSearchResult && !this.currentLookupParams?.meta) {
          this.clearResult({
            currentElement: this.lastMouseTarget
          });
          return;
        }
        const allowOverlap = options.allowOverlap || false;
        const displayMode = options.displayMode || this.getInitialDisplayMode("ghost");
        // Precalculate the selection sizes
                const {textBoxSizes: pageTextBoxSizes} = this.currentTargetProps || {};
        const screenTextBoxSizes = selectionSizesToScreenCoords(pageTextBoxSizes);
        const popupOptions = {
          allowOverlap: options.allowOverlap,
          accentDisplay: this.config.accentDisplay,
          bunproDisplay: this.config.bunproDisplay,
          closeShortcuts: this.config.keys.closePopup,
          copy: {
            includeAllSenses: this.config.copySenses !== "first",
            includePartOfSpeech: this.config.copyPos !== "none",
            includeLessCommonHeadwords: this.config.copyHeadwords !== "common"
          },
          copyNextKey: this.config.keys.startCopy[0] || "",
          copyState: this.copyState,
          dictLang: this.config.dictLang,
          dictToShow: this.currentDict,
          displayMode,
          fixedPosition: options?.fixPosition ? this.getFixedPosition() : void 0,
          fixMinHeight: options.fixMinHeight,
          fontFace: this.config.fontFace,
          fontSize: this.config.fontSize,
          fxData: this.config.fx,
          getCursorClearanceAndPos: this.getCursorClearanceAndPos.bind(this, screenTextBoxSizes),
          expandShortcuts: this.config.keys.expandPopup,
          interactive: this.config.popupInteractive,
          isExpanded: this.isPopupExpanded || this.config.autoExpand.includes(this.currentDict) || // When selecting items by keyboard, expand the content so the user can
          // see what else is available to select, but not for kanji since it
          // would make the window massive.
          this.copyState.kind === "active" && this.copyState.mode === "keyboard" && this.currentDict !== "kanji",
          isVerticalText: !!this.currentTargetProps?.isVerticalText,
          kanjiReferences: this.config.kanjiReferences,
          meta: this.currentLookupParams?.meta,
          onCancelCopy: () => this.exitCopyMode(),
          onExpandPopup: () => this.expandPopup(),
          onStartCopy: (index, trigger) => this.enterCopyMode({
            trigger,
            index
          }),
          onCopy: copyType => this.copyCurrentEntry(copyType),
          onClosePopup: () => {
            this.clearResult({
              currentElement: this.lastMouseTarget
            });
          },
          onShowSettings: () => {
            browser_polyfill_default().runtime.sendMessage({
              type: "options"
            }).catch((() => {}));
          },
          onSwitchDictionary: dict => {
            this.showDictionary(dict, {
              fixPopupPosition: true
            });
          },
          onTogglePin: () => {
            if (displayMode === "pinned") this.unpinPopup(); else this.pinPopup();
          },
          pinShortcuts: this.config.keys.pinPopup,
          pointerType: this.currentTargetProps?.fromPuck ? "puck" : "cursor",
          popupStyle: this.config.popupStyle,
          posDisplay: this.config.posDisplay,
          positionMode: this.popupPositionMode,
          preferredUnits: this.config.preferredUnits,
          previousHeight: this.popupState?.pos?.height,
          safeArea: this.safeAreaProvider.getSafeArea(),
          showDefinitions: !this.config.readingOnly,
          showKanjiComponents: this.config.showKanjiComponents,
          showPriority: this.config.showPriority,
          switchDictionaryKeys: this.config.keys.nextDictionary,
          tabDisplay: this.config.tabDisplay,
          waniKaniVocabDisplay: this.config.waniKaniVocabDisplay
        };
        const showPopupResult = showPopup(this.currentSearchResult, popupOptions);
        if (!showPopupResult) {
          this.clearResult({
            currentElement: this.lastMouseTarget
          });
          return;
        }
        const {size: popupSize, pos: popupPos} = showPopupResult;
        // Inform the touch click tracker to ignore taps since the popup is now
        // showing.
        
        // We can't simply check if the popup is visible when we get the touch click
        // callback since by that point we will already have hidden it.
                this.touchClickTracker.startIgnoringClicks();
        // Store the popup's display mode so that:
        
        // (a) we can fix the popup's position when changing tabs, and
        // (b) we can detect if future mouse events lie between the popup and
        //     the lookup point (and _not_ close or update the popup in that case)
        // (c) we know how to handle keyboard events based on whether or not the
        //     popup is showing
                clearPopupTimeout(this.popupState);
        this.popupState = {
          pos: {
            frameId: this.getFrameId() || 0,
            x: popupPos.x,
            y: popupPos.y,
            width: popupSize.width,
            height: popupSize.height,
            direction: popupPos.direction,
            side: popupPos.side,
            allowOverlap,
            lookupPoint: this.getPopupLookupPoint({
              currentPagePoint: this.currentPagePoint,
              firstCharBbox: screenTextBoxSizes?.[1]
            })
          },
          contentType: this.currentTargetProps?.contentType || "text",
          display: this.getNextDisplay(displayMode)
        };
        
        // Tell child iframes
        
                let childState = this.popupState;
        if (this.currentLookupParams?.source) childState = this.getTranslatedPopupState(this.currentLookupParams.source, this.popupState);
        void browser_polyfill_default().runtime.sendMessage({
          type: "children:popupShown",
          state: childState
        });
      }
      getCursorClearanceAndPos(screenTextBoxSizes) {
        const cursorPos = this.currentPagePoint ? toScreenCoords(this.currentPagePoint) : void 0;
        let cursorClearance;
        if (this.currentTargetProps?.fromPuck && this.puck) {
          const {top, bottom, left, right} = this.puck.getPuckClearance();
          // Although we can't tell whether the left or right thumb is in use
          // (so we don't make corresponding adjustments to left/right), we can at
          // least be reasonably sure that the thumb extends downwards!
                    const extraMarginToClearThumb = this.puck.getTargetOrientation() === "above" ? 100 : 0;
          cursorClearance = {
            top,
            right,
            bottom: bottom + extraMarginToClearThumb,
            left
          };
        } else {
          const tooltipClearance = this.currentTargetProps?.hasTitle ? 20 : 0;
          cursorClearance = {
            top: 0,
            right: 0,
            bottom: tooltipClearance,
            left: 0
          };
        }
        // Add the first part of the matched text to the cursor clearance.
        
        // We don't want to add _all_ of it since we might have a selection that
        // wraps lines and that would produce a massive area that would be too hard
        // to avoid.
                if (screenTextBoxSizes && cursorPos) {
          const bbox = getBestFitSize({
            sizes: screenTextBoxSizes,
            length: this.getHighlightLengthForCurrentResult()
          });
          if (bbox) {
            const cursorClearanceAsRect = addMarginToPoint(cursorClearance, cursorPos);
            // Adjust the cursorPos to use the middle of the first character of
            // the selected text.
            
            // This should cause the popup to be better aligned with the selected
            // text which, apart from appearing a little bit neater, also makes
            // mousing over the popup easier since it should be closer.
            
            // (It's important we do this _after_ calling addMarginToPoint above
            // since, when we are using the puck, the original value of
            // `cursorClearance` is relative to this.currentPoint, i.e. the
            // original value of cursorPos, so we need to supply that value when
            // converting to a rect.)
                        const firstCharBbox = screenTextBoxSizes[1];
            cursorPos.x = Math.max(0, firstCharBbox.left + firstCharBbox.width / 2);
            cursorPos.y = Math.max(0, firstCharBbox.top + firstCharBbox.height / 2);
            const expandedClearance = geometry_union(bbox, cursorClearanceAsRect);
            cursorClearance = getMarginAroundPoint(cursorPos, expandedClearance);
          }
        }
        return {
          cursorClearance,
          cursorPos
        };
      }
      getInitialDisplayMode(interactive) {
        if (this.currentTargetProps?.fromPuck || this.currentTargetProps?.fromTouch) return "touch"; else if (this.config.popupInteractive) return interactive; else return "static";
      }
      getNextDisplay(prevDisplayMode) {
        let display;
        if (prevDisplayMode === "ghost") if (this.config.holdToShowKeys.length && this.currentTargetProps?.contentType === "text") display = {
          mode: "ghost",
          trigger: "keys",
          keyType: 1
        }; else if (this.config.holdToShowImageKeys.length && this.currentTargetProps?.contentType === "image") display = {
          mode: "ghost",
          trigger: "keys",
          keyType: 2
        }; else display = {
          mode: "ghost",
          trigger: "timeout",
          timeout: window.setTimeout((() => this.commitPopup()), 400)
        }; else display = {
          mode: prevDisplayMode
        };
        return display;
      }
      updatePopup(options = {}) {
        if (!this.isTopMostWindow()) {
          console.warn("[10ten-ja-reader] Called updatePopup within iframe");
          return;
        }
        const displayMode = this.popupState?.display.mode;
        this.showPopup({
          allowOverlap: options.allowOverlap ?? this.popupState?.pos?.allowOverlap,
          displayMode,
          fixPosition: options.fixPosition,
          fixMinHeight: options.fixMinHeight
        });
      }
      pinPopup() {
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:pinPopup"
          });
          return;
        }
        // If the popup is interactive, then we shouldn't move it when pinning it
        // but if, for example, the user has turned off popup interactivity and so
        // the popup is rendered with the narrow tab bar, when we go to pin it
        // we'll expand the tab bar so we should re-position it as necessary since
        // it might take more space.
                this.showPopup({
          allowOverlap: this.popupState?.pos?.allowOverlap,
          displayMode: "pinned",
          fixPosition: this.config.popupInteractive
        });
      }
      unpinPopup() {
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:unpinPopup"
          });
          return;
        }
        this.showPopup({
          allowOverlap: this.popupState?.pos?.allowOverlap,
          displayMode: this.getInitialDisplayMode("hover"),
          fixPosition: this.config.popupInteractive
        });
        // Typically when you unpin the popup you want it to disappear immediately
        // (unless the mouse is currently over it or still over the original text).
        
        // To try to make that happen we dispatch another mouse event with the last
        // mouse position.
        
        // Unfortunately this won't necessarily help if the user has since moused
        // over an iframe since our last recorded mouse position and target element
        // will be based on the last mousemove event we received in _this_ frame.
                if (this.lastMouseTarget) {
          const mouseMoveEvent = new MouseEvent("mousemove", {
            bubbles: true,
            screenX: this.lastMouseMoveScreenPoint.x,
            screenY: this.lastMouseMoveScreenPoint.y,
            clientX: this.lastMouseMoveScreenPoint.x,
            clientY: this.lastMouseMoveScreenPoint.y,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            metaKey: false,
            button: 0,
            buttons: 0
          });
          this.lastMouseTarget.dispatchEvent(mouseMoveEvent);
        }
      }
      togglePin() {
        if (!this.popupState) return false;
        if (this.popupState.display.mode === "pinned") this.unpinPopup(); else this.pinPopup();
        return true;
      }
      commitPopup() {
        if (!this.isTopMostWindow()) {
          void browser_polyfill_default().runtime.sendMessage({
            type: "top:commitPopup"
          });
          return;
        }
        if (this.popupState?.display.mode !== "ghost") return;
        this.showPopup({
          allowOverlap: this.popupState?.pos?.allowOverlap,
          displayMode: "hover",
          fixPosition: false
        });
      }
      hidePopup() {
        const wasShowing = !!this.currentSearchResult;
        this.currentLookupParams = void 0;
        this.currentSearchResult = void 0;
        this.currentTargetProps = void 0;
        hidePopup();
        if (wasShowing && this.isTopMostWindow()) void browser_polyfill_default().runtime.sendMessage({
          type: "children:popupHidden"
        });
      }
      getFixedPosition() {
        if (!this.popupState?.pos || this.config.tabDisplay === "none") return;
        const {x, y, width, direction, side} = this.popupState.pos;
        return {
          // If the tabs are on the right, the x position is the right edge of the
          // popup.
          x: this.config.tabDisplay === "right" ? x + width : x,
          y,
          anchor: this.config.tabDisplay,
          direction,
          side
        };
      }
      getPopupLookupPoint({currentPagePoint, firstCharBbox}) {
        const {scrollX, scrollY} = getScrollOffset();
        if (firstCharBbox) {
          const marginX = firstCharBbox.width / 2;
          const marginY = firstCharBbox.height / 2;
          const x = firstCharBbox.left + marginX + scrollX;
          const y = firstCharBbox.top + marginY + scrollY;
          return {
            x,
            y,
            marginX,
            marginY
          };
        }
        return currentPagePoint ? {
          x: currentPagePoint.x,
          y: currentPagePoint.y,
          marginX: 10,
          marginY: 10
        } : void 0;
      }
      getTranslatedPopupState(frameSource, popupState) {
        const iframe = findIframeElement(frameSource);
        if (!iframe) return popupState;
        if (!popupState.pos) return popupState;
        const iframeOrigin = getIframeOrigin(iframe);
        const {scrollX, scrollY} = getScrollOffset();
        const {x, y, lookupPoint} = popupState.pos;
        return {
          ...popupState,
          pos: {
            ...popupState.pos,
            frameId: frameSource.frameId,
            x: x - iframeOrigin.x - scrollX,
            y: y - iframeOrigin.y - scrollY,
            lookupPoint: lookupPoint ? {
              x: lookupPoint.x - iframeOrigin.x - scrollX,
              y: lookupPoint.y - iframeOrigin.y - scrollY,
              marginX: lookupPoint.marginX,
              marginY: lookupPoint.marginY
            } : void 0
          }
        };
      }
      constructor(config) {
        // The content script is injected into every frame in a page but we delegate
        // some responsibilities to the top-most window since that allows us to,
        // for example, show the popup without it being clipped by its iframe
        // boundary. Furthermore, we want to handle key events regardless of which
        // iframe is currently in focus.
        // As a result, we can divide the state and methods in this class into:
        // 1. Things done by the window / iframe where the text lives,
        //    e.g. processing mouse events, extracting text, highlighting text, etc.
        // 2. Things only the topmost window does,
        //    e.g. querying the dictionary, showing the popup, etc.
        // There are a few exceptions like copyMode which is mirrored in both and
        // popup visibility tracking which only iframes need to care about but
        // roughly these categories hold.
        // One day we might actually separating these out into separate classes but
        // for now we just document which is which here.
        // Common concerns
        content_define_property(this, "config", void 0);
        content_define_property(this, "frameId", void 0);
        
        // Text handling window concerns
        
                content_define_property(this, "textHighlighter", void 0);
        content_define_property(this, "currentTextRange", void 0);
        // The current point is used both by the text handling window to detect
        // redundant mouse moves and by the topmost window to know where to position
        // the popup.
                content_define_property(this, "currentPagePoint", void 0);
        // We keep track of the last element that was the target of a mouse move so
        // that we can popup the window later using its properties.
                content_define_property(this, "lastMouseTarget", null);
        content_define_property(this, "lastMouseMoveScreenPoint", {
          x: -1,
          y: -1
        });
        // Safari-only redundant pointermove/mousemove event handling
        
        // See notes in `onPointerMove` for why we need to do this.
                content_define_property(this, "ignoreNextPointerMove", false);
        // Track the state of the popup
        
        // This is used by top-most windows and child iframes alike to detect if
        // a mouse movement is "between" `currentPoint` and the popup so we can avoid
        // hiding the popup in that case (provided the popup is configured to be
        // interactive).
        
        // Note, however, that the position of the popup (i.e. the `pos` member) is
        // only ever stored on the top-most window and on the child iframe which
        // contains the content that the popup is positioned relative to (if any).
        
        // This is also used to determine how to handle keyboard keys since. For
        // example, we should ignore keyboard events (and certainly _not_ call
        // preventDefault on them) if the popup is not showing.
                content_define_property(this, "popupState", void 0);
        content_define_property(this, "mouseSpeedRollingSum", 0);
        content_define_property(this, "mouseSpeeds", []);
        content_define_property(this, "previousMousePosition", void 0);
        content_define_property(this, "previousMouseMoveTime", void 0);
        // We disable this feature by default and only turn it on once we've
        // established that we have a sufficiently precise timer. If
        // privacy.resistFingerprinting is enabled then the timer won't be precise
        // enough for us to test the speed of the mouse.
                content_define_property(this, "hidePopupWhenMovingAtSpeed", false);
        // Keyboard support
                content_define_property(this, "kanjiLookupMode", false);
        content_define_property(this, "pinToggleState", "idle");
        // Used to try to detect when we are typing so we know when to ignore key
        // events.
                content_define_property(this, "typingMode", false);
        // Detect touch taps so we can show the popup for them, but not for
        // regular mouse clicks.
                content_define_property(this, "touchClickTracker", new TouchClickTracker);
        content_define_property(this, "isEffectiveTopMostWindow", false);
        content_define_property(this, "currentLookupParams", void 0);
        content_define_property(this, "currentSearchResult", void 0);
        content_define_property(this, "currentTargetProps", void 0);
        content_define_property(this, "currentDict", "words");
        // Copy support
        
        // (copyMode is actually used by the text-handling window too to know which
        // keyboard events to handle and how to interpret them.)
                content_define_property(this, "copyState", {
          kind: "inactive"
        });
        // Manual positioning support
                content_define_property(this, "popupPositionMode", popup_position_PopupPositionMode.Auto);
        // Content collapsing
                content_define_property(this, "isPopupExpanded", false);
        // Consulted in order to determine safe area
                content_define_property(this, "safeAreaProvider", new SafeAreaProvider);
        // Consulted in order to determine popup positioning
                content_define_property(this, "puck", null);
        this.config = new ContentConfig(config);
        this.textHighlighter = new TextHighlighter;
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onFocusIn = this.onFocusIn.bind(this);
        this.onFullScreenChange = this.onFullScreenChange.bind(this);
        this.onInterFrameMessage = this.onInterFrameMessage.bind(this);
        this.onBackgroundMessage = this.onBackgroundMessage.bind(this);
        this.onConfigChange = this.onConfigChange.bind(this);
        this.config.addListener(this.onConfigChange);
        window.addEventListener("pointermove", this.onPointerMove);
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("keydown", this.onKeyDown, {
          capture: true
        });
        window.addEventListener("keyup", this.onKeyUp, {
          capture: true
        });
        window.addEventListener("focusin", this.onFocusIn);
        window.addEventListener("fullscreenchange", this.onFullScreenChange);
        window.addEventListener("message", this.onInterFrameMessage, {
          capture: true
        });
        browser_polyfill_default().runtime.onMessage.addListener(this.onBackgroundMessage);
        this.touchClickTracker.onTouchClick = event => {
          // Ignore clicks on interactive elements
          if (event.target instanceof Node && isInteractiveElement(event.target)) return;
          // If the puck is showing but inactive, use that as a signal that the user
          // doesn't want to do lookups at the moment.
                    if (this.puck?.getEnabledState() === "inactive") return;
          // We need to ensure the 'buttons' field of the event is zero since
          // normally we ignore mousemoves when the buttons are being pressed, but
          // we've decided to allow this "click".
          
          // This is, unfortunately, a little involved since:
          
          // (a) the 'buttons' member of `event` is readonly,
          // (b) the object spread operator only deals with enumerable _own_
          //     properties so we can't just spread the values from `event` into a
          //     new object, and
          // (c) we use `getModifierState` etc. on `PointerEvent` elsewhere so we
          //     actually need to generate a `PointerEvent` object rather than just
          //     a property bag.
                    const pointerMoveEvent = new PointerEvent("pointermove", {
            altKey: event.altKey,
            bubbles: true,
            button: 0,
            buttons: 0,
            clientX: event.clientX,
            clientY: event.clientY,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            pointerType: "mouse",
            relatedTarget: event.relatedTarget,
            screenX: event.screenX,
            screenY: event.screenY,
            shiftKey: event.shiftKey
          });
          pointerMoveEvent.fromTouch = true;
          (event.target || document.body).dispatchEvent(pointerMoveEvent);
        };
        if (!this.config.enableTapLookup) this.touchClickTracker.disable();
        void hasReasonableTimerResolution().then((isReasonable => {
          if (isReasonable) this.hidePopupWhenMovingAtSpeed = true;
        }));
        // If we are an iframe, check if the popup is currently showing
                if (!this.isTopMostWindow()) void browser_polyfill_default().runtime.sendMessage({
          type: "top:isPopupShowing"
        });
        this.applyPuckConfig();
        if (document.location.host === "docs.google.com") injectGdocsStyles();
      }
    }
    // Mouse tracking
    
    // We don't show the popup when the mouse is moving at speed because it's
    // mostly distracting and introduces unnecessary work.
        content_define_property(ContentHandler, "MOUSE_SPEED_SAMPLES", 2);
    content_define_property(ContentHandler, "MOUSE_SPEED_THRESHOLD", 0.5);
    
    // Top-most window concerns
    
    // This should be enough for most (but not all) entries for now.
    
    // See https://github.com/birchill/10ten-ja-reader/issues/319#issuecomment-655545971
    // for a snapshot of the entry lengths by frequency.
    
    // Once we have switched all databases to IndexedDB, we should investigate the
    // performance impact of increasing this further.
        content_define_property(ContentHandler, "MAX_LENGTH", 16);
    function isTouchClickEvent(pointerEvent) {
      return !!pointerEvent.fromTouch;
    }
    (function() {
      // Check that we should be running at all. We can only handle HTML and SVG
      // content and if we start messing with other documents (e.g. random XML
      // documents) we can break their styling.
      const {namespaceURI} = document.documentElement;
      if (namespaceURI !== "http://www.w3.org/1999/xhtml" && namespaceURI !== "http://www.w3.org/2000/svg") return;
      // Ensure the content script is not loaded twice or that an incompatible
      // version of the script is not used.
      
      // This is only needed when we are injecting the script via executeScript
      // when running in "activeTab" mode.
      
      // Furthermore, with regards to incompatible versions, as far as I can tell
      // Firefox will remove old versions of injected scripts when it reloads an
      // add-on. I'm not sure if that behavior is reliable across all browsers,
      // however, (update: it's not) so for now we try our best to ensure we have
      // the correct version of the script here.
            if (window.readerScriptVer === "1.22.0") return; else if (typeof window.readerScriptVer !== "undefined" && typeof window.removeReaderScript === "function") {
        console.info("[10ten-ja-reader] Found incompatible version of script. Removing.");
        try {
          window.removeReaderScript();
        } catch (e) {
          console.error(e);
        }
      }
      let contentHandler = null;
      // Port to the background page.
      
      // This is only used when we are running in "activeTab" mode. It serves to:
      
      // - Provide an extra means to ensure the tab is removed from the list of
      //   enabled tabs when the tab is destroyed (in case we fail to get a pagehide
      //   event), and
      
      // - Ensure the background page is kept alive so long as we have an enabled
      //   tab when the background page is running as an event page.
      
            let port;
      window.readerScriptVer = "1.22.0";
      window.removeReaderScript = () => {
        disable();
        browser_polyfill_default().runtime.onMessage.removeListener(onMessage);
      };
      // Track if we are the top-most window or not.
      
      // Normally we detect the top-most window by comparing window.top ===
      // window.self but in some cases the actual top-most window does not have the
      // content script injected and hence we have a concept of the effective
      // top-most window.
      
      // This only happens in Firefox and only really with the Live TL extension
      // where the top-most window in some cases is a moz-extension:// URL and hence
      // does not have the content script injected. Instead a child iframe (a
      // regular YouTube page) has the content script injected and should be treated
      // as the top-most window for the purposes of showing the popup.
            let isEffectiveTopMostWindow = false;
      function isTopMostWindow() {
        return isEffectiveTopMostWindow || window.self === window.top;
      }
      browser_polyfill_default().runtime.onMessage.addListener(onMessage);
      // Check if we should be enabled or not.
      
      // We don't need to do this in activeTab mode since the background page will
      // send us an 'enable' message after injecting the script.
      
      // However, when the content script is injected using content_scripts the
      // background script might not have been initialized yet in which case this
      // will fail. However, presumably once the background script has initialized
      // it will call us if we need to be enabled.
            if (true) browser_polyfill_default().runtime.sendMessage({
        type: "enable?"
      }).catch((() => {}));
      // Poll the background page until it finishes updating
            void async function checkIfUpdating() {
        try {
          const isDbUpdating = await browser_polyfill_default().runtime.sendMessage({
            type: "isDbUpdating"
          });
          if (isDbUpdating) 
          // Wait 20s between checks
          setTimeout(checkIfUpdating, 20000);
        } catch {
          // Ignore, probably we're out of date with the background
        }
      }();
      async function onMessage(request) {
        assert(request, BackgroundMessageSchema);
        // As with onBackgroundMessage we need to ensure that we are the
        // intended recipient for these messages because Safari.
                switch (request.type) {
         case "enable":
          console.assert(typeof request.config === "object", "No config object provided with enable message");
          console.assert(request.frame === "*");
          enable({
            tabId: request.id,
            config: request.config
          });
          break;

         case "disable":
          console.assert(request.frame === "*");
          disable();
          break;

         case "dbUpdated":
          contentHandler?.onDbUpdated();
          break;

         case "isTopMost":
          if (contentHandler?.getFrameId() === request.frame) {
            isEffectiveTopMostWindow = true;
            contentHandler?.setEffectiveTopMostWindow();
          }
          break;
        }
        return "ok";
      }
      function enable({tabId, config}) {
        if (contentHandler) {
          contentHandler.setConfig(config);
          if (isEffectiveTopMostWindow) contentHandler.setEffectiveTopMostWindow();
        } else {
          // When the extension is upgraded, we can still have the old popup window
          // or puck hanging around so make sure to clear it.
          removePopup();
          removePuck();
          removeSafeAreaProvider();
          removeGdocsStyles();
          contentHandler = new ContentHandler(config);
        }
        // If we are running in "activeTab" mode we will get passed our tab ID
        // so we can set up a Port which will allow the background script to
        // know when we disappear so it can update the browser action status.
        
        // We only need to do that if we're the root-most frame, however.
                if (typeof tabId !== "undefined" && isTopMostWindow() && !port) try {
          port = browser_polyfill_default().runtime.connect(void 0, {
            name: `tab-${tabId}`
          });
        } catch (e) {
          console.error(e);
        }
        browser_polyfill_default().runtime.sendMessage({
          type: "enabled",
          src: document.location.href
        }).then((resp => {
          if (!resp) return;
          const {frameId} = resp;
          if (contentHandler) contentHandler.setFrameId(frameId);
          if (window.frameElement instanceof HTMLElement) window.frameElement.dataset.frameId = frameId.toString();
        })).catch((e => {
          console.warn(e);
        }));
        // Let the background know the current state of hover devices since this
        // might be its first chance to access the DOM.
                void browser_polyfill_default().runtime.sendMessage({
          type: "canHoverChanged",
          value: contentHandler.canHover
        });
        window.addEventListener("pageshow", onPageShow);
        window.addEventListener("pagehide", onPageHide);
      }
      function disable() {
        if (contentHandler) {
          contentHandler.detach();
          contentHandler = null;
        }
        if (port) {
          port.disconnect();
          port = void 0;
        }
        window.removeEventListener("pageshow", onPageShow);
        window.removeEventListener("pagehide", onPageHide);
      }
      function onPageShow() {
        void browser_polyfill_default().runtime.sendMessage({
          type: "enable?"
        });
      }
      function onPageHide() {
        void browser_polyfill_default().runtime.sendMessage({
          type: "disabled"
        });
      }
    })();
  })();
})();
//# sourceMappingURL=10ten-ja-content.js.map