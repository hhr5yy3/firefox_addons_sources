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
        h.constructor = T, h.render = q), C && C.sub(h), h.props = m, h.state || (h.state = {}), 
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
    function q(n, l, u) {
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
    // CONCATENATED MODULE: ./node_modules/.pnpm/@birchill+bugsnag-zero@0.6.9/node_modules/@birchill/bugsnag-zero/dist/esm/index.js
    class FetchDelivery {
      client;
      constructor(client) {
        this.client = client;
      }
      async sendEvent({apiKey, events, notifier, payloadVersion}) {
        const sentAt = (new Date).toISOString();
        const body = JSON.stringify({
          apiKey,
          payloadVersion,
          notifier,
          events
        });
        await fetch(this.client.endpoints.notify, {
          method: "POST",
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-Type": "application/json",
            "Bugsnag-Api-Key": apiKey,
            "Bugsnag-Payload-Version": payloadVersion,
            "Bugsnag-Sent-At": sentAt
          },
          referrerPolicy: "no-referrer",
          body
        });
      }
    }
    const CircularReference = Symbol("Circular");
    const AccessError = Symbol("AccessError");
    /**
 * Iterate through an object's properties and return a copy with the values
 * replaced by the result of the replacer function.
 *
 * Detects circular references and replaces them with the `CircularReference`
 * symbol.
 *
 * Detects errors accessing properties and replaces them with the `AccessError`
 * symbol.
 *
 * For any objects with a `toJSON` function, it will be called instead of
 * traversing the object's properties.
 */    function safeFilter(input, replacer, options) {
      return filter({
        key: "",
        value: input,
        replacer,
        seen: [],
        depth: 0,
        depthLimit: options?.depthLimit,
        edgeIndex: 0,
        edgesLimit: options?.edgesLimit
      });
    }
    function filter({key, value, replacer, seen, depthLimit = 1 / 0, depth, edgeIndex, edgesLimit = 1 / 0}) {
      let replacement = value;
      if (seen.includes(replacement)) replacement = CircularReference;
      if (replacer) replacement = replacer(key, replacement);
      if (hasToJson(replacement)) replacement = safeAccess((() => replacement.toJSON(String(key))));
      // TODO: We really should re-run our cyclic dependency check at this point in
      // case the replacer or toJSON has created a new cyclic dependency.
      
      // Surely no-one would do that though, right?
            if (replacement === null || typeof replacement !== "object") return replacement;
      if (depth > depthLimit || edgeIndex + 1 > edgesLimit) return "[...]";
      seen.push(value);
      if (Array.isArray(replacement)) {
        const copy = [];
        const limit = Math.min(replacement.length, edgesLimit);
        for (let i = 0; i < limit; i++) {
          const item = safeAccess((() => replacement[i]));
          copy.push(filter({
            key: i,
            value: item,
            replacer,
            seen,
            depth,
            depthLimit,
            edgeIndex: i,
            edgesLimit
          }));
        }
        if (limit < replacement.length) copy.push("[...]");
        replacement = copy;
      } else {
        const copy = {};
        const keys = Object.keys(replacement);
        for (let i = 0; i < keys.length; i++) {
          const currentKey = keys[i];
          const value = safeAccess((() => replacement[currentKey]));
          copy[currentKey] = filter({
            key: currentKey,
            value,
            replacer,
            seen,
            depth,
            depthLimit,
            edgeIndex: i,
            edgesLimit
          });
        }
        replacement = copy;
      }
      seen.pop();
      return replacement;
    }
    function safeAccess(accessor) {
      try {
        return accessor();
      } catch {
        return AccessError;
      }
    }
    function hasToJson(value) {
      return typeof value === "object" && value !== null && "toJSON" in value && typeof value.toJSON === "function";
    }
    // Based heavily on: https://github.com/mk-pmb/is-error-js
    
    // which has the following license:
    
    // Copyright (c) 2015 is-error.
    
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    // THE SOFTWARE.
        const objectToString = Object.prototype.toString;
    const getPrototypeOf = Object.getPrototypeOf;
    const ERROR_TYPE = "[object Error]";
    function isError(a) {
      if (a instanceof Error) return true;
      let err = a;
      while (err) {
        if (objectToString.call(err) === ERROR_TYPE) return true;
        err = getPrototypeOf(err);
      }
      return false;
    }
    function isObject(a) {
      return typeof a === "object" && a !== null && !Array.isArray(a);
    }
    // The following code is based on:
    
    // https://github.com/stacktracejs/error-stack-parser/blob/master/error-stack-parser.js
    
    // which is released under the MIT license. Its copyright and license terms
    // are as follows:
    
    // Copyright (c) 2017 Eric Wendelin and other contributors
    
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    // SOFTWARE.
    
    // It has been modified to match Bugsnag's stackframe format, remove unneeded
    // Opera stackframe handling, and use TypeScript and more modern JavaScript.
        const CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
    const SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
    function parseStack(stackString) {
      const partialResult = stackString.match(CHROME_IE_STACK_REGEXP) ? parseV8OrIE(stackString) : parseFFOrSafari(stackString);
      return partialResult.reduce(((result, stack) => {
        // Drop empty stack frames
        if (JSON.stringify(stack) === "{}") return result;
        // If we have no file or method but we _do_ have a line number, it must be
        // global code.
                let file = !stack.file && !stack.method && typeof stack.lineNumber === "number" ? "global code" : stack.file || "(unknown file)";
        // Strip the query string / fragment from filenames
                file = file.replace(/\?.*$/, "").replace(/#.*$/, "");
        // Case normalize "global code" function names
                let method = stack.method || "(unknown function)";
        method = /^global code$/i.test(method) ? "global code" : method;
        return result.concat([ {
          file,
          lineNumber: stack.lineNumber,
          columnNumber: stack.columnNumber,
          method
        } ]);
      }), []);
    }
    function parseV8OrIE(stackString) {
      const filtered = stackString.split("\n").filter((line => !!line.match(CHROME_IE_STACK_REGEXP)));
      return filtered.map((line => {
        // Bugsnag stack frames don't have a way of representing eval origins
        // so we just throw that information away for now.
        // stacktrace.js can represent this but it still throws this information
        // away.
        if (line.indexOf("(eval ") > -1) line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(\),.*$)/g, "");
        let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(");
        // Capture and preserve the parenthesized location "(/foo/my bar.js:12:87)"
        // in case it has spaces in it, as the string is split on \s+ later on.
                const location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);
        // Remove the parenthesized location from the line, if it was matched.
                sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
        const tokens = sanitizedLine.split(/\s+/).slice(1);
        // If a location was matched, pass it to extractLocation(), otherwise pop
        // the last token.
                const locationParts = extractLocation(location ? location[1] : tokens.pop() || "(no location)");
        const method = tokens.join(" ") || void 0;
        const file = [ "eval", "<anonymous>" ].indexOf(locationParts[0]) > -1 ? void 0 : locationParts[0];
        return {
          file,
          lineNumber: locationParts[1],
          columnNumber: locationParts[2],
          method
        };
      }));
    }
    function parseFFOrSafari(stackString) {
      const filtered = stackString.split("\n").filter((line => !line.match(SAFARI_NATIVE_CODE_REGEXP)));
      return filtered.map((line => {
        // Bugsnag stack frames don't have a way of representing eval origins
        // so we just throw that information away for now.
        // stacktrace.js can represent this but it still throws this information
        // away.
        if (line.indexOf(" > eval") > -1) line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
        if (line.indexOf("@") === -1 && line.indexOf(":") === -1) 
        // Safari eval frames only have function names and nothing else
        return {
          method: line
        }; else {
          const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
          const matches = line.match(functionNameRegex);
          const method = matches && matches[1] ? matches[1] : void 0;
          const locationParts = extractLocation(line.replace(functionNameRegex, ""));
          return {
            file: locationParts[0],
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            method
          };
        }
      }));
    }
    // Separate line and column numbers from a string of the form: (URI:Line:Column)
        function extractLocation(urlLike) {
      // Fail-fast but return locations like "(native)"
      if (urlLike.indexOf(":") === -1) return [ urlLike ];
      const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
      const parts = regExp.exec(urlLike.replace(/[()]/g, ""));
      if (!parts) return [ urlLike ];
      const line = parts[2] ? parseInt(parts[2], 10) : void 0;
      const col = parts[3] ? parseInt(parts[3], 10) : void 0;
      return [ parts[1], line, col ];
    }
    function toExceptions(maybeError, component) {
      const error = normalizeError(maybeError, component);
      // Add metadata for non-errors
            let metadata;
      if (error.name === "InvalidError") metadata = {
        [component]: {
          "non-error parameter": maybeError
        }
      };
      // Merge any metadata defined on the object itself
            if (typeof error.metadata !== "undefined" && isObject(error.metadata)) metadata = {
        ...metadata,
        [error.name]: error.metadata
      };
      const exceptions = [ makeException(error) ];
      // Add any causes
            exceptions.push(...getCauses(error).map((cause => makeException(cause, {
        backtrace: false
      }))));
      return {
        exceptions,
        metadata
      };
    }
    function normalizeError(maybeError, component) {
      if (isError(maybeError)) return maybeError;
      let error = fromSimpleError(maybeError);
      if (error) return error;
      switch (typeof error) {
       case "string":
       case "number":
       case "boolean":
        return new Error(String(maybeError));

       default:
        error = new Error(`${component} received a non-error. See "${component}" tab for more detail.`);
        error.name = "InvalidError";
        return error;
      }
    }
    function fromSimpleError(error) {
      if (!isObject(error)) return null;
      const getStringMember = field => typeof error[field] === "string" && error[field].length ? error[field] : void 0;
      const name = getStringMember("name") || getStringMember("errorClass");
      const message = getStringMember("message") || getStringMember("errorMessage");
      if (!name || !message) return null;
      const newError = new Error(message);
      newError.name = name;
      return newError;
    }
    function makeException(error, stackOptions = {
      backtrace: false
    }) {
      return {
        errorClass: error.name,
        message: error.message,
        stacktrace: getStacktrace(error, stackOptions),
        type: typeof self === "object" && self.navigator ? "browserjs" : "nodejs"
      };
    }
    function getStacktrace(error, {backtrace}) {
      const stackString = getStackString(error);
      if (stackString) return parseStack(stackString); else if (backtrace) 
      // TODO: We'll probably want to trim this to remove some of our own
      // frames from it but let's wait until we actually have some examples of
      // that to work with.
      return generateBacktrace(); else return [];
    }
    function getStackString(error) {
      const stack = error.stack || error.stacktrace;
      return typeof stack === "string" && stack.length && stack !== `${error.name}: ${error.message}` ? stack : void 0;
    }
    const MAX_STACK_SIZE = 20;
    // The following is based on
    
    // https://github.com/stacktracejs/stack-generator/blob/master/stack-generator.js
    
    // which is licensed to the Public Domain.
        function generateBacktrace() {
      const stack = [];
      // arguments.callee cannot be accessed in strict mode.
            let curr;
      try {
        // eslint-disable-next-line no-caller
        curr = arguments.callee;
      } catch (_e) {
        return [];
      }
      while (curr && stack.length < MAX_STACK_SIZE) {
        if (curr.name) stack.push({
          method: curr.name,
          file: "(unknown file)"
        }); else if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) stack.push({
          method: RegExp.$1,
          file: "(unknown file)"
        });
        try {
          curr = curr.caller;
        } catch (e) {
          break;
        }
      }
      return stack;
    }
    function getCauses(error) {
      if (!error.cause) return [];
      const cause = normalizeError(error.cause, "cause");
      if (cause.name === "InvalidError") return [];
      return [ cause ].concat(getCauses(cause));
    }
    const browserNotifyUnhandledExceptions = {
      name: "browserNotifyUnhandledExceptions",
      load(client) {
        self.addEventListener("error", (evt => {
          let exceptions;
          let metadata;
          if (evt instanceof ErrorEvent) {
            const {message, filename: file, lineno, colno, error} = evt;
            const lineNumber = Number.isSafeInteger(lineno) ? lineno : void 0;
            if (lineNumber === 0 && /Script error\.?/.test(message)) {
              console.log("Ignoring cross-domain or eval script error.");
              return;
            }
            ({exceptions, metadata} = toExceptions(error, "window onerror"));
            // Augment first stacktrace if we have more info in the ErrorEvent than
            // the stack trace we got.
                        const columnNumber = Number.isSafeInteger(colno) ? colno : void 0;
            const {stacktrace} = exceptions[0];
            if (!stacktrace.length) stacktrace.push({
              file,
              lineNumber,
              columnNumber,
              method: "(unknown file)"
            }); else {
              const firstStackFrame = stacktrace[0];
              firstStackFrame.file = firstStackFrame.file || file;
              firstStackFrame.lineNumber = firstStackFrame.lineNumber ?? lineNumber;
              firstStackFrame.columnNumber = firstStackFrame.columnNumber ?? columnNumber;
            }
          } else ({exceptions, metadata} = toExceptions(evt, "window onerror"));
          client.notifyEvent({
            exceptions,
            unhandled: true,
            severity: "error",
            severityReason: {
              type: "unhandledException"
            },
            metadata
          }, evt);
        }));
      }
    };
    const browserNotifyUnhandledRejections = {
      name: "browserNotifyUnhandledRejections",
      load(client) {
        self.addEventListener("unhandledrejection", (evt => {
          const error = evt.reason;
          const {exceptions, metadata} = toExceptions(error, "unhandledrejection");
          // The official bugsnag client digs into `error` and, if it has no
          // stack, but is an Error object, it pulls out the name, message, code
          // and adds them to a metadata tab called 'unhandledRejection handler'.
          
          // I don't understand this. Surely we'll have the same information in
          // our exception object already?
                    client.notifyEvent({
            exceptions,
            unhandled: true,
            severity: "error",
            severityReason: {
              type: "unhandledPromiseRejection"
            },
            metadata
          }, error);
        }));
      }
    };
    const consoleBreadcrumbs = {
      name: "consoleBreadcrumbs",
      load(client) {
        const methodsToHook = [ "log", "debug", "info", "warn", "error" ].filter((method => typeof console !== "undefined" && typeof console[method] === "function"));
        for (const method of methodsToHook) {
          const original = console[method];
          console[method] = (...args) => {
            client.leaveBreadcrumb("Console output", args.reduce(((metadata, arg, i) => {
              // Try to stringify each argument
              let stringified = "[Unknown value]";
              // Try to use toString.
              
              // This may fail if the input is:
              
              // - an object whose [[Prototype]] is null (no toString), or
              // - an object with a broken toString or @@toPrimitive
              //   implementation
                            try {
                stringified = String(arg);
              } catch (_e) {
                /* Ignore */}
              // If it stringifies to [object Object] attempt to JSON stringify
                            if (stringified === "[object Object]") 
              // But catch any stringify errors (falling back to
              // [object Object])
              try {
                stringified = JSON.stringify(arg);
              } catch (_e) {
                /* Ignore */}
              metadata[`[${i}]`] = stringified;
              return metadata;
            }), {
              // The official client attempts to map console.group to 'log' here
              // but it never actually hooks console.group.
              severity: method
            }), "log");
            original.apply(console, args);
          };
        }
      }
    };
    const errorBreadcrumbs = {
      name: "errorBreadcrumbs",
      load(client) {
        client.addOnPostError((event => {
          client.leaveBreadcrumb(event.exceptions[0].errorClass, {
            errorClass: event.exceptions[0].errorClass,
            errorMessage: event.exceptions[0].message,
            severity: event.severity
          }, "error");
        }));
      }
    };
    // Unlike the official bugsnag JS client this does NOT cover XHR.
    // Furthermore, it does not provide a way to be cleaned up.
        const fetchBreadcrumbs = {
      name: "fetchBreadcrumbs",
      load(client) {
        if (!("fetch" in self)) return;
        const oldFetch = self.fetch;
        self.fetch = function(input, init) {
          let method = "GET";
          let url;
          if (isRequest(input)) {
            url = input.url;
            method = input.method;
          } else url = input.toString();
          // Per the fetch algorithm, the method specified in the RequestInit takes
          // precedence over the method specified in the Request.
                    if (init && typeof init.method === "string" && init.method.length) method = init.method;
          const leaveBreadcrumb = client.leaveBreadcrumb.bind(client);
          return new Promise(((resolve, reject) => {
            oldFetch(input, init).then((response => {
              handleFetchSuccess({
                response,
                method,
                url,
                leaveBreadcrumb
              });
              resolve(response);
            })).catch((error => {
              handleFetchError({
                method,
                url,
                leaveBreadcrumb
              });
              reject(error);
            }));
          }));
        };
      }
    };
    function isRequest(input) {
      // instanceof alone won't work for objects from different realms
      return input instanceof Request || isObject(input) && "url" in input;
    }
    function handleFetchSuccess({response, method, url, leaveBreadcrumb}) {
      // The official bugsnag client ignores bugsnag requests for XHR but not for
      // fetch. I think it means to ignore it for fetch, though.
      if (url.startsWith("https://notify.bugsnag.com")) return;
      const metadata = {
        status: response.status,
        request: `${method} ${url}`
      };
      if (response.status >= 400) leaveBreadcrumb("fetch() failed", metadata, "request"); else leaveBreadcrumb("fetch() succeeded", metadata, "request");
    }
    function handleFetchError({method, url, leaveBreadcrumb}) {
      if (url.startsWith("https://notify.bugsnag.com")) return;
      leaveBreadcrumb("fetch() error", {
        request: `${method} ${url}`
      }, "request");
    }
    const interactionBreadcrumbs = {
      name: "interactionBreadcrumbs",
      load(client) {
        if (!("addEventListener" in self)) return;
        self.addEventListener("click", (event => {
          let targetText, targetSelector;
          try {
            targetText = isHtmlElement(event.target) ? getNodeText(event.target) : "(Non-HTML Element)";
            targetSelector = isElement(event.target) ? getNodeSelector(event.target) : "(Non-element target)";
          } catch (e) {
            targetText = "[hidden]";
            targetSelector = "[hidden]";
          }
          client.leaveBreadcrumb("UI click", {
            targetText,
            targetSelector
          }, "user");
        }), true);
      }
    };
    function isElement(target) {
      return isObject(target) && target.nodeType === Node.ELEMENT_NODE;
    }
    function isHtmlElement(target) {
      return isElement(target) && target.namespaceURI === "http://www.w3.org/1999/xhtml";
    }
    function getNodeText(elem) {
      let text = elem.textContent || elem.innerText || "";
      if (!text && (elem.type === "submit" || elem.type === "button")) text = elem.value;
      return truncate(text.trim(), 140);
    }
    // Create a label from tagname, id and css class of the element
        function getNodeSelector(elem) {
      // Generate an initial selector using ID + class names
      // (This is particularly unsuitable for utility CSS frameworks like Tailwind
      // but oh well)
      const parts = [ elem.tagName ];
      if (elem.id) parts.push("#" + elem.id);
      if (elem.className && elem.className.length) parts.push(`.${elem.className.split(" ").join(".")}`);
      // We can't try out the selector in this context so just return it as-is.
            if (!self.document.querySelectorAll) return parts.join("");
      // See if the selector we have generated is sufficiently specific
            try {
        if (self.document.querySelectorAll(parts.join("")).length === 1) return parts.join("");
      } catch {
        // Sometimes the query selector can be invalid just return it as-is.
        return parts.join("");
      }
      // Try to get a more specific selector if this one matches more than one
      // element.
            if (elem.parentNode && elem.parentNode.childNodes.length > 1) {
        const index = Array.from(elem.parentNode.children).indexOf(elem) + 1;
        parts.push(`:nth-child(${index})`);
      }
      if (self.document.querySelectorAll(parts.join("")).length === 1) return parts.join("");
      // Try prepending the parent element selector
            if (elem.parentElement) return `${getNodeSelector(elem.parentElement)} > ${parts.join("")}`;
      return parts.join("");
    }
    function truncate(value, length) {
      const ommision = "(...)";
      return value.length <= length ? value : value.slice(0, length - ommision.length) + ommision;
    }
    const navigationBreadcrumbs = {
      name: "navigationBreadcrumbs",
      load(client) {
        if (!("addEventListener" in self)) return;
        const drop = name => () => client.leaveBreadcrumb(name, void 0, "navigation");
        self.addEventListener("pagehide", drop("Page hidden"), true);
        self.addEventListener("pageshow", drop("Page shown"), true);
        self.addEventListener("load", drop("Page loaded"), true);
        if (self.document) self.document.addEventListener("DOMContentLoaded", drop("DOMContentLoaded"), true);
        // Some browsers like to emit popstate when the page loads, so only add the
        // popstate listener after that
                self.addEventListener("load", (() => self.addEventListener("popstate", drop("Navigated back"), true)));
        // hashchange has some metadata that we care about
                if (self.location) self.addEventListener("hashchange", (event => {
          const metadata = event.oldURL ? {
            from: relativeLocation(event.oldURL),
            to: relativeLocation(event.newURL),
            state: getCurrentState(self)
          } : {
            to: relativeLocation(self.location.href)
          };
          client.leaveBreadcrumb("Hash changed", metadata, "navigation");
        }), true);
        // Wrap replaceState/pushState
                const leaveBreadcrumb = client.leaveBreadcrumb.bind(client);
        if (self.history && self instanceof Window) {
          if (typeof self.history.replaceState === "function") wrapHistoryFn({
            fn: "replaceState",
            target: self.history,
            leaveBreadcrumb,
            win: self
          });
          if (typeof self.history.pushState === "function") wrapHistoryFn({
            fn: "pushState",
            target: self.history,
            leaveBreadcrumb,
            win: self
          });
        }
      }
    };
    // Takes a full url like http://foo.com:1234/pages/01.html?yes=no#section-2 and
    // returns just the path and hash parts, e.g. /pages/01.html?yes=no#section-2
    
    // Compatibility: This uses the URL constructor which is not available in IE
    // or Edge < 12.
        function relativeLocation(url) {
      try {
        const urlObj = new URL(url);
        return `${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
      } catch (e) {
        return url;
      }
    }
    function getCurrentState(win) {
      try {
        return win.history.state;
      } catch (e) {
        return {};
      }
    }
    function wrapHistoryFn({fn, leaveBreadcrumb, target, win}) {
      const orig = target[fn];
      target[fn] = (state, title, url) => {
        leaveBreadcrumb(`History ${fn}`, stateChangeToMetadata({
          win,
          state,
          title,
          url
        }), "navigation");
        // TODO: If we implement maxEvents, reset that count here.
                orig.apply(target, [ state, title, url ]);
      };
    }
    function stateChangeToMetadata({win, state, title, url}) {
      const currentPath = relativeLocation(win.location.href);
      return {
        title,
        state,
        prevState: getCurrentState(win),
        to: url || currentPath,
        from: currentPath
      };
    }
    let appStart = Date.now();
    const esm_reset = () => {
      appStart = Date.now();
    };
    const appDuration = {
      name: "appDuration",
      load(client) {
        client.addOnError((event => {
          const now = Date.now();
          event.app = event.app || {};
          event.app.duration = now - appStart;
        }));
        return {
          reset: esm_reset
        };
      }
    };
    // The Bugsnag v5 API requires doing your own UA string parsing, requiring a
    // `browserName`, `browserVersion`, `osName`, `osVersion`, etc.
    
    // That's very unfriendly and probably why the official client still uses the v4
    // API which takes a `userAgent` parameter and appears to parse it on the
    // server.
    
    // Nevertheless, we're using the v5 API for now so we should do the parsing
    // ourselves.
    
    // Note that UA parser libraries typically are very heavyweight since they try
    // to cover every user agent that ever existed including various bots etc.
    
    // However, all we really care about is differentiating between the most common
    // _browsers_ and their respective platforms / OSes.
    
    // Furthermore, we want this to be as lightweight as possible so this is very
    // deliberately a very barebones approach. We can add other user agents if and
    // when they become interesting.
    
    // This is based on
    // https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts but
    // adapted quite heavily.
        function parseUserAgent(userAgent) {
      const matchedRule = matchUserAgent(userAgent);
      if (!matchedRule) return {};
      const [name, match] = matchedRule;
      const os = detectOS(userAgent);
      const device = os?.osName === "iOS" ? detectAppleDevice(userAgent) : {};
      return {
        browserName: name,
        browserVersion: match[1],
        osName: os?.osName,
        osVersion: os?.osVersion,
        manufacturer: device?.manufacturer,
        model: device?.model
      };
    }
    const userAgentRules = [ [ "Edge (EdgeHTML)", /Edge\/([0-9._]+)/ ], [ "Edge (iOS)", /EdgiOS\/([0-9._]+)/ ], [ "Yandex", /YaBrowser\/([0-9._]+)/ ], [ "KakaoTalk", /KAKAOTALK\s([0-9.]+)/ ], [ "Samsung", /SamsungBrowser\/([0-9.]+)/ ], [ "Silk", /\bSilk\/([0-9._-]+)\b/ ], [ "MIUI", /MiuiBrowser\/([0-9.]+)$/ ], [ "Beaker", /BeakerBrowser\/([0-9.]+)/ ], [ "Edge (Chromium)", /EdgA?\/([0-9.]+)/ ], [ "Chromium WebView", /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/ ], [ "Chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/ ], [ "Chrome (iOS)", /CriOS\/([0-9.]+)(:?\s|$)/ ], [ "Firefox", /Firefox\/([0-9.]+)(?:\s|$)/ ], [ "Firefox (iOS)", /FxiOS\/([0-9.]+)/ ], [ "Opera Mini", /Opera Mini.*Version\/([0-9.]+)/ ], [ "Opera", /Opera\/([0-9.]+)(?:\s|$)/ ], [ "Opera", /OPR\/([0-9.]+)(:?\s|$)/ ], [ "Internet Explorer", /Trident\/7\.0.*rv:([0-9.]+).*\).*Gecko$/ ], [ "Internet Explorer", /MSIE\s([0-9.]+);.*Trident\/[4-7].0/ ], [ "Internet Explorer", /MSIE\s(7\.0)/ ], [ "Blackberry", /BB10;\sTouch.*Version\/([0-9.]+)/ ], [ "Android", /Android\s([0-9.]+)/ ], [ "Safari (iOS)", /Version\/([0-9._]+).*Mobile.*Safari.*/ ], [ "Safari", /Version\/([0-9._]+).*Safari/ ], [ "Facebook", /FB[AS]V\/([0-9.]+)/ ], [ "Instagram", /Instagram\s([0-9.]+)/ ], [ "iOS WebView", /AppleWebKit\/([0-9.]+).*Mobile/ ], [ "iOS WebView", /AppleWebKit\/([0-9.]+).*Gecko\)$/ ] ];
    function matchUserAgent(userAgent) {
      return userAgent !== "" && userAgentRules.reduce(((matched, [browser, regex]) => {
        if (matched) return matched;
        const uaMatch = regex.exec(userAgent);
        return !!uaMatch && [ browser, uaMatch ];
      }), false);
    }
    const operatingSystemRules = [ [ "iOS", void 0, /iP(hone|od|ad)/ ], [ "Android", void 0, /Android/ ], [ "BlackBerry", void 0, /BlackBerry|BB10/ ], [ "Windows Mobile", void 0, /IEMobile/ ], [ "Kindle", void 0, /Kindle/ ], [ "Windows", "3.11", /Win16/ ], [ "Windows", "95", /(Windows 95)|(Win95)|(Windows_95)/ ], [ "Windows", "98", /(Windows 98)|(Win98)/ ], [ "Windows", "2000", /(Windows NT 5.0)|(Windows 2000)/ ], [ "Windows", "XP", /(Windows NT 5.1)|(Windows XP)/ ], [ "Windows", "Server 2003", /(Windows NT 5.2)/ ], [ "Windows", "Vista", /(Windows NT 6.0)/ ], [ "Windows", "7", /(Windows NT 6.1)/ ], [ "Windows", "8", /(Windows NT 6.2)/ ], [ "Windows", "8.1", /(Windows NT 6.3)/ ], [ "Windows", "10+", /(Windows NT 10.0)/ ], [ "Windows", "ME", /Windows ME/ ], [ "Open BSD", void 0, /OpenBSD/ ], [ "Sun OS", void 0, /SunOS/ ], [ "Chrome OS", void 0, /CrOS/ ], [ "Linux", void 0, /(Linux)|(X11)/ ], [ "Mac OS", void 0, /(Mac_PowerPC)|(Macintosh)/ ], [ "QNX", void 0, /QNX/ ], [ "BeOS", void 0, /BeOS/ ], [ "OS/2", void 0, /OS\/2/ ] ];
    function detectOS(userAgent) {
      for (const [osName, osVersion, regex] of operatingSystemRules) {
        const match = regex.exec(userAgent);
        if (match) return {
          osName,
          osVersion
        };
      }
      return null;
    }
    function detectAppleDevice(userAgent) {
      const matches = /iPad|iPhone|iPod/.exec(userAgent);
      if (matches) return {
        manufacturer: "Apple",
        model: matches[0]
      };
      if (/MacIntel/.test(userAgent) && self.navigator && self.navigator.maxTouchPoints && self.navigator.maxTouchPoints > 2) return {
        manufacturer: "Apple",
        model: "iPad"
      };
      return null;
    }
    const browserContextWithUaParser = uaParser => ({
      name: "browserContext",
      load(client) {
        client.addOnError((event => {
          event.request = {
            ...event.request,
            url: self.location.href
          };
          event.context = event.context || self.location.pathname;
          event.device = {
            ...event.device,
            ...uaParser(self.navigator.userAgent),
            locale: self.navigator.language,
            userAgent: self.navigator.userAgent
          };
          let languages = [ "n/a" ];
          try {
            languages = self.navigator.languages;
          } catch {
            /* Ignore */}
          event.metaData = {
            ...event.metaData,
            language: {
              language: self.navigator.language,
              languages
            }
          };
        }));
      }
    });
    const browserContext = browserContextWithUaParser(parseUserAgent);
    const deviceOrientation = {
      name: "deviceOrientation",
      load(client) {
        client.addOnError((event => {
          let orientation;
          const screen = self.screen;
          if (screen && screen.orientation && screen.orientation.type) orientation = screen.orientation.type; else if (self.document && self.document.documentElement) orientation = self.document.documentElement.clientWidth > self.document.documentElement.clientHeight ? "landscape" : "portrait";
          if (orientation) event.device = {
            ...event.device,
            orientation
          };
        }));
      }
    };
    const limitEvents = limit => {
      let n = 0;
      const reset = () => {
        n = 0;
      };
      if (typeof window !== "undefined") window.addEventListener("popstate", reset);
      return {
        name: "limitEvents",
        load(client) {
          client.addOnError((function() {
            if (n >= limit) return false;
            n++;
          }));
          return {
            reset
          };
        }
      };
    };
    function stringify(input, options) {
      return safeFilter(input, ((_key, value) => {
        if (value === CircularReference) return "[Circular]";
        if (value === AccessError) return "[Error]";
        if (typeof value === "bigint" || typeof value === "symbol" || value instanceof RegExp) return safeAccess((() => value.toString()));
        if (value instanceof Map) return {
          type: "Map",
          value: safeAccess((() => [ ...value.entries() ]))
        };
        if (value instanceof Set) return {
          type: "Set",
          value: safeAccess((() => [ ...value.values() ]))
        };
        if (typeof value === "function") return safeAccess((() => truncateString(value.toString().replace(/\s+/g, " "), 50)));
        if (value instanceof Error) {
          const replacement = {};
          for (const key of Object.getOwnPropertyNames(value)) replacement[key] = safeAccess((() => value[key]));
          return replacement;
        }
        if (value instanceof ArrayBuffer) return `ArrayBuffer(${value.byteLength})`;
        return value;
      }), options);
    }
    function truncateString(input, maxLength) {
      return input.length > maxLength ? input.substring(0, maxLength - 3) + "..." : input;
    }
    /**
 * Plugin to try to stringify various unserializable JS objects (e.g. bigints,
 * Maps, Sets, functions, Error objects, Regexps) in Bugsnag events.
 */    const esm_stringifyValues = {
      name: "stringifyValues",
      load(client) {
        client.addOnError((function(event) {
          if (event.metaData) event.metaData = stringify(event.metaData);
          if (event.breadcrumbs) event.breadcrumbs = event.breadcrumbs.map((breadcrumb => ({
            ...breadcrumb,
            metaData: stringify(breadcrumb.metaData)
          })));
        }));
      }
    };
    // Auto-detect errors
        const browserHandledRejectionBreadcrumbs = {
      name: "browserHandledRejectionBreadcrumbs",
      load(client) {
        self.addEventListener("rejectionhandled", (evt => {
          const error = evt.reason;
          const {exceptions} = toExceptions(error, "handledrejection");
          const message = `Handled Promise rejection: [${exceptions[0].errorClass}] ${exceptions[0].message}`;
          client.leaveBreadcrumb(message, {
            stacktrace: exceptions[0].stacktrace
          }, "error");
        }));
      }
    };
    // eslint-disable-next-line typescript-eslint(no-unsafe-declaration-merging)
    class BugsnagStatic {
      breadcrumbs=[];
      config;
      delivery=new FetchDelivery(this);
      errorCallbacks=new Set;
      postErrorCallbacks=new Set;
      plugins=[];
      start(config) {
        if (this.config) {
          console.error("Bugsnag.start called multiple times. Subsequent invocations will be ignored");
          return this;
        }
        this.config = config;
        let errorCallbacks;
        if (this.config.onError) errorCallbacks = typeof this.config.onError === "function" ? [ this.config.onError ] : this.config.onError;
        this.errorCallbacks = new Set(errorCallbacks);
        for (const plugin of this.config.plugins || []) this.plugins.push({
          name: plugin.name || "unknown",
          plugin: plugin.load(this)
        });
        this.leaveBreadcrumb("Bugsnag loaded", {}, "state");
        return this;
      }
      get endpoints() {
        return {
          notify: this.config?.endpoints?.notify || "https://notify.bugsnag.com/"
        };
      }
      notify(error, options = {}) {
        let {exceptions, metadata} = toExceptions(error, "notify");
        let onError;
        let severity;
        if (typeof options === "function") onError = options; else {
          severity = options.severity;
          if (options.metadata) metadata = {
            ...metadata,
            ...options.metadata
          };
        }
        return this.notifyEvent({
          exceptions,
          metadata,
          severity,
          onError
        }, error);
      }
      leaveBreadcrumb(message, metadata, type) {
        if (!this.config) 
        // The official bugsnag client will produce a console eror in this case
        // but that's annoying since often unit tests will exercise code that
        // calls notify/leaveBreadcrumb and we don't want to have to either:
        // (a) wrap each call to bugsnag in an "isTest" conditional, or
        // (b) ensure the bugsnag client is initialized at the start of each
        //     test
        return;
        // It appears we sometimes get non-string `message` values here.
                if (typeof message !== "string") try {
          message = String(message);
        } catch {
          message = "Unable to stringify breadcrumb message";
        }
        if (!message.length) return;
        this.breadcrumbs.push({
          name: message,
          metaData: metadata,
          type: type || "manual",
          timestamp: (new Date).toISOString()
        });
        const {maxBreadcrumbs = 25} = this.config;
        if (this.breadcrumbs.length > maxBreadcrumbs) this.breadcrumbs.splice(0, this.breadcrumbs.length - maxBreadcrumbs);
      }
      async notifyEvent({exceptions, unhandled, severity, severityReason, metadata, onError}, originalError) {
        if (!this.config) 
        // The official bugsnag client will produce a console eror in this case
        // but that's annoying since often unit tests will exercise code that
        // calls notify/leaveBreadcrumb and we don't want to have to either:
        // (a) wrap each call to bugsnag in an "isTest" conditional, or
        // (b) ensure the bugsnag client is initialized at the start of each
        //     test
        return;
        // Check if the current release stage is enabled
                const releaseStage = this.config.releaseStage || "production";
        if (this.config.enabledReleaseStages && !this.config.enabledReleaseStages.includes(releaseStage)) return;
        const event = {
          exceptions,
          breadcrumbs: this.breadcrumbs.length ? this.breadcrumbs : void 0,
          originalError,
          unhandled: typeof unhandled !== "boolean" ? false : unhandled,
          severity: severity || "warning",
          severityReason,
          user: this.config.user || void 0,
          app: {
            releaseStage,
            version: this.config.appVersion,
            type: this.config.appType || (typeof window === "object" ? "browser" : "node")
          },
          device: {
            time: (new Date).toISOString()
          },
          metaData: metadata || {}
        };
        // Error callbacks
                const errorCallbacks = [ ...this.errorCallbacks ];
        if (onError) errorCallbacks.push(onError);
        // Make sure the redact and stringifyValues callbacks come last
                const sortLast = [ "stringifyValues", "redact" ];
        errorCallbacks.sort(((a, b) => {
          if (sortLast.includes(a.name) && sortLast.includes(b.name)) return 0; else if (sortLast.includes(a.name)) return 1; else if (sortLast.includes(b.name)) return -1; else return 0;
        }));
        for (const callback of errorCallbacks) {
          const callbackResult = await callback(event);
          if (typeof callbackResult === "boolean" && !callbackResult) return;
        }
        const notifier = {
          name: "@birchill/bugsnag-zero",
          version: "1",
          url: "https://github.com/birchill/bugsnag-zero"
        };
        const eventForDelivery = safeFilter(event, ((key, value) => {
          if (key === "originalError") return;
          return value;
        }), {
          depthLimit: 20,
          edgesLimit: 500
        });
        let body;
        const payload = {
          apiKey: this.config.apiKey,
          payloadVersion: "5",
          notifier,
          events: [ eventForDelivery ]
        };
        try {
          body = JSON.stringify(payload);
        } catch {
          eventForDelivery.metaData = {
            notifier: "Unable to serialize metadata"
          };
          body = JSON.stringify(payload);
        }
        // Check the size of the payload
                if (body.length > 10e5) {
          eventForDelivery.metaData = {
            notifier: `Payload was ${body.length / 10e5}Mb. Metadata removed.`
          };
          body = JSON.stringify(payload);
          if (body.length > 10e5) throw new Error("Payload exceeded 1Mb limit");
        }
        // Although it's called "post error" we run these callbacks before we
        // actually send the event over the network since sending is async and if
        // the callback is logging the fact that an error was recorded then we want
        // that log entry to appear in the correct sequence, particularly if other
        // things take place while the fetch is still happenning.
                for (const callback of this.postErrorCallbacks) callback(event);
        try {
          await this.delivery.sendEvent(payload);
        } catch (e) {
          console.error("Failed to post report to Bugsnag", e);
        }
      }
      getUser() {
        return this.config?.user || {};
      }
      setUser(id, email, name) {
        if (!this.config) return;
        this.config.user = {
          id,
          email,
          name
        };
      }
      addOnError(fn) {
        this.errorCallbacks.add(fn);
      }
      removeOnError(fn) {
        this.errorCallbacks.delete(fn);
      }
      addOnPostError(fn) {
        this.postErrorCallbacks.add(fn);
      }
      removeOnPostError(fn) {
        this.postErrorCallbacks.delete(fn);
      }
      getPlugin(name) {
        return this.plugins.find((plugin => plugin.name === name))?.plugin;
      }
      setDelivery(delivery) {
        this.delivery = delivery;
      }
    }
    const Bugsnag = new BugsnagStatic;
    // EXTERNAL MODULE: ./node_modules/.pnpm/webextension-polyfill@0.12.0/node_modules/webextension-polyfill/dist/browser-polyfill.js
        var browser_polyfill = __webpack_require__("687");
    var browser_polyfill_default =  __webpack_require__.n(browser_polyfill);
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
      return dist_isObject(x) && typeof x[Symbol.iterator] === "function";
    }
    /**
 * Check if a value is a plain object.
 */    function dist_isObject(x) {
      return typeof x === "object" && x != null;
    }
    /**
 * Check if a value is a non-array object.
 */    function isNonArrayObject(x) {
      return dist_isObject(x) && !Array.isArray(x);
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
          if (k === void 0) value = v; else if (value instanceof Map) value.set(k, v); else if (value instanceof Set) value.add(v); else if (dist_isObject(value)) if (v !== void 0 || k in value) value[k] = v;
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
    /**
 * Define a new struct type with a custom validation function.
 */
    function dist_define(name, validator) {
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
 * Ensure that a value is a number.
 */
    function dist_number() {
      return dist_define("number", (value => typeof value === "number" && !isNaN(value) || `Expected a number, but received: ${print(value)}`));
    }
    /**
 * Augment a struct to allow `undefined` values.
 */
    function optional(struct) {
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
          if (dist_isObject(value)) for (const k in value) {
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
          if (dist_isObject(value)) for (const k of keys) yield [ k, value[k], schema[k] ];
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
    // CONCATENATED MODULE: ./src/background/fx-data.ts
    const FxLocalDataSchema = dist_type({
      timestamp: dist_min(integer(), 0),
      rates: record(string(), dist_number()),
      updated: dist_min(integer(), 0)
    });
    async function getLocalFxData(onUpdate) {
      if (onUpdate) browser_polyfill_default().storage.onChanged.addListener(getStorageChangeCallback(onUpdate));
      try {
        const fxData = (await browser_polyfill_default().storage.local.get("fx"))?.fx;
        if (!fxData) return;
        const [error, validated] = validate(fxData, FxLocalDataSchema);
        if (validated) return validated; else void Bugsnag.notify(error, {
          severity: "warning"
        });
      } catch {
        console.warn("Failed to get fx data from storage");
      }
      return;
    }
    function getStorageChangeCallback(onChange) {
      return (changes, areaName) => {
        if (areaName !== "local") return;
        if ("fx" in changes) {
          const [error, validated] = validate(changes.fx.newValue, FxLocalDataSchema);
          if (validated) onChange(validated); else void Bugsnag.notify(error, {
            severity: "warning"
          });
        }
      };
    }
    // CONCATENATED MODULE: ./src/utils/is-object.ts
    function is_object_isObject(a) {
      return typeof a === "object" && a !== null && !Array.isArray(a);
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
    function isEdge() {
      return navigator.userAgent.indexOf("Edg/") !== -1;
    }
    function isSafari() {
      return navigator.userAgent.indexOf("Safari/") !== -1 && !isChromium();
    }
    function ua_utils_isMac() {
      return /^Mac/i.test(navigator.platform);
    }
    function isIOS() {
      return [ "iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod" ].includes(navigator.platform) || // iPad on iOS 13 detection
      navigator.userAgent.includes("Mac") && "ontouchend" in document;
    }
    /** @public */    // CONCATENATED MODULE: ./src/common/db-languages.ts
    const dbLanguages = [ "de", "en", "es", "fr", "hu", "nl", "pt", "ru", "sl", "sv" ];
    const dbLanguageMeta = [ [ "de", {
      name: "Deutsch",
      hasWords: true
    } ], [ "en", {
      name: "English",
      hasKanji: true,
      hasWords: true
    } ], [ "es", {
      name: "Espa\xf1ol",
      hasKanji: true,
      hasWords: true
    } ], [ "fr", {
      name: "Fran\xe7ais",
      hasKanji: true,
      hasWords: true
    } ], [ "hu", {
      name: "Magyar",
      hasWords: true
    } ], [ "nl", {
      name: "Nederlands",
      hasWords: true
    } ], [ "pt", {
      name: "Portugu\xeas",
      hasKanji: true
    } ], [ "ru", {
      name: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
      hasWords: true
    } ], [ "sl", {
      name: "Sloven\u0161\u010dina",
      hasWords: true
    } ], [ "sv", {
      name: "Svenska",
      hasWords: true
    } ] ];
    function isDbLanguageId(id) {
      return dbLanguages.includes(id);
    }
    // CONCATENATED MODULE: ./src/common/extension-storage-error.ts
    function _define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class ExtensionStorageError extends Error {
      constructor({key, action}, ...params) {
        super(...params), _define_property(this, "key", void 0), _define_property(this, "action", void 0);
        Object.setPrototypeOf(this, ExtensionStorageError.prototype);
        if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, ExtensionStorageError);
        this.name = "ExtensionStorageError";
        this.message = `Failed to ${action} '${key}'`;
        this.key = key;
        this.action = action;
      }
    }
    // CONCATENATED MODULE: ./src/common/popup-keys.ts
    const PopupKeys = [ {
      name: "nextDictionary",
      keys: [ "Shift", "Enter", "n" ],
      enabledKeys: [ "Shift", "Enter" ],
      l10nKey: "options_popup_switch_dictionaries"
    }, {
      name: "kanjiLookup",
      keys: [ "Shift" ],
      enabledKeys: [],
      l10nKey: "options_popup_kanji_lookup"
    }, {
      name: "toggleDefinition",
      keys: [ "d" ],
      enabledKeys: [],
      l10nKey: "options_popup_toggle_definition"
    }, {
      name: "expandPopup",
      keys: [ "x" ],
      enabledKeys: [ "x" ],
      l10nKey: "options_popup_expand_popup"
    }, {
      name: "closePopup",
      keys: [ "Esc", "x" ],
      enabledKeys: [ "Esc" ],
      l10nKey: "options_popup_close_popup"
    }, {
      name: "pinPopup",
      keys: [ "Alt", "Ctrl", "Space" ],
      enabledKeys: [ "Ctrl" ],
      l10nKey: "options_popup_pin_popup"
    }, {
      name: "movePopupDownOrUp",
      keys: [ "j,k" ],
      enabledKeys: [],
      l10nKey: "options_popup_move_popup_down_or_up"
    }, {
      name: "startCopy",
      keys: [ "c" ],
      enabledKeys: [ "c" ],
      l10nKey: "options_popup_start_copy"
    } ];
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
    function getReferencesForLang(lang) {
      if (lang !== "fr") return SUPPORTED_REFERENCES.filter((ref => ref !== "maniette"));
      return SUPPORTED_REFERENCES;
    }
    const REFERENCE_ABBREV_MAPPING = {
      CO: "conning",
      H: "halpern_njecd",
      L: "heisig6",
      E: "henshall",
      KK: "kk",
      DK: "halpern_kkld_2ed",
      N: "nelson_c",
      NR: "nelson_r",
      V: "nelson_n",
      P: "skip",
      IN: "sh_kk2",
      I: "sh_desc",
      U: "unicode",
      Y: "py",
      WK: "wk"
    };
    function convertLegacyReference(ref) {
      return REFERENCE_ABBREV_MAPPING.hasOwnProperty(ref) ? REFERENCE_ABBREV_MAPPING[ref] : void 0;
    }
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
    function getReferenceLabelsForLang(lang, t) {
      const result = [];
      for (const ref of SUPPORTED_REFERENCES) {
        if (lang !== "fr" && ref === "maniette") continue;
        result.push({
          ref,
          ...getLabelForReference(ref, t)
        });
      }
      // Sort by short version first since this is what will be shown in the pop-up.
            result.sort(((a, b) => (a.short || a.full).localeCompare(b.short || b.full)));
      return result;
    }
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
    // CONCATENATED MODULE: ./src/common/config.ts
    // This is largely a wrapper about the browser.sync.settings API which provides
    // following important features:
    // * Only options that are explicitly set get saved. (This prevents the
    //   "FoxClocks problem" where, when you install the FoxClocks add-on on a new
    //   computer it sets all the settings to their default values before a sync
    //   happens so then all other synchronized computers end up having their
    //   settings reset to their default values.)
    // * Provides a snapshot of all options with their default values filled-in for
    //   passing to the content process.
    function config_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    // The following references were added to this extension in a later version and
    // so we turn them off by default to avoid overwhelming users with too many
    // references.
        const OFF_BY_DEFAULT_REFERENCES = new Set([ "busy_people", "kanji_in_context", "kodansha_compact", "maniette", "wk" ]);
    class Config {
      async readSettings() {
        let settings;
        try {
          settings = await browser_polyfill_default().storage.sync.get(null);
        } catch {
          settings = {};
        }
        try {
          settings.localSettings = (await browser_polyfill_default().storage.local.get("settings")).settings;
        } catch {
          // Ignore
        }
        this.settings = settings;
        await this.upgradeSettings();
      }
      async upgradeSettings() {
        // If we have old kanji reference settings but not new ones, upgrade them.
        if (this.settings.hasOwnProperty("kanjiReferences") && !this.settings.kanjiReferencesV2) {
          const newSettings = {};
          const existingSettings = this.settings.kanjiReferences;
          for (const [ref, enabled] of Object.entries(existingSettings)) {
            const newRef = convertLegacyReference(ref);
            if (newRef) newSettings[newRef] = enabled;
          }
          this.settings.kanjiReferencesV2 = newSettings;
          try {
            await browser_polyfill_default().storage.sync.set({
              kanjiReferencesV2: newSettings
            });
          } catch {
            // If we failed to store the upgraded settings that's fine since at
            // least the in-memory version of the settings has been upgraded.
            // We'll try upgrading the stored settings next time we're loaded
            // anyway.
            console.error("Failed to upgrade kanji references settings");
          }
        }
        // If we have old mouse onboarding prefs, drop them
                if (this.settings.hasOwnProperty("hasDismissedMouseOnboarding")) try {
          await browser_polyfill_default().storage.sync.remove("hasDismissedMouseOnboarding");
        } catch {
          // Ignore
        }
        if (this.settings.localSettings?.hasOwnProperty("hasUpgradedFromPreMouse") || this.settings.localSettings?.hasOwnProperty("numLookupsWithMouseOnboarding")) {
          const localSettings = {
            ...this.settings.localSettings
          };
          delete localSettings.hasUpgradedFromPreMouse;
          delete localSettings.numLookupsWithMouseOnboarding;
          this.settings.localSettings = localSettings;
          try {
            await browser_polyfill_default().storage.local.set({
              settings: localSettings
            });
          } catch {
            // Ignore
          }
        }
      }
      get ready() {
        return this.readyPromise;
      }
      async onChange(changes, areaName) {
        // Safari bug https://bugs.webkit.org/show_bug.cgi?id=281644 means that
        // `areaName` is undefined in Safari 18.
        if (!isSafari() && areaName !== "sync" && areaName !== "local") return;
        // Re-read settings in case the changes were made by a different instance of
        // this class.
                await this.readSettings();
        // Extract the changes in a suitable form
        
        // We should be able to key this on `areaName` but since Safari 18 doesn't
        // set that properly, we have to inspect the actual changes instead.
                let updatedChanges = {
          ...changes
        };
        if (typeof updatedChanges.settings !== "undefined") {
          const localSettings = updatedChanges.settings;
          delete updatedChanges.settings;
          updatedChanges = {
            ...updatedChanges,
            ...this.extractLocalSettingChanges(localSettings)
          };
        }
        // Fill in default setting values
                for (const key of Object.keys(updatedChanges)) switch (key) {
         case "dictLang":
          updatedChanges.dictLang = {
            ...changes.dictLang
          };
          if (!updatedChanges.dictLang.newValue) updatedChanges.dictLang.newValue = this.dictLang;
          if (!updatedChanges.dictLang.oldValue) updatedChanges.dictLang.oldValue = this.previousDefaultLang;
          break;

          // Following is just the set of properties we know we actually inspect
          // the `newValue` of. We don't have a convenient means of fetching the
          // default value to fill in the oldValue, but we don't currently need
          // it either.
                   case "contextMenuEnable":
         case "popupStyle":
         case "toolbarIcon":
          updatedChanges[key] = {
            ...changes[key]
          };
          if (typeof updatedChanges[key].newValue === "undefined" || updatedChanges[key].newValue === null) updatedChanges[key].newValue = this[key];
          break;

          // Rename the kanji reference key since the name we use to store it
          // differs from the name we expose via our API.
                   case "kanjiReferencesV2":
          updatedChanges.kanjiReferences = changes.kanjiReferencesV2;
          delete updatedChanges.kanjiReferencesV2;
          break;

          // In some cases, the pinPopup key is calculated from the holdToShowKeys
          // value so we might need to report that too.
                   case "holdToShowKeys":
          // If...
          if (// We are already reporting a change to `keys`, or
          Object.keys(updatedChanges).includes("keys") || // The pinPopup key is already explicitly set
          this.settings.keys?.pinPopup) break;
          updatedChanges.keys = {
            newValue: this.keys
          };
          break;
        }
        if (!Object.keys(updatedChanges).length) return;
        Bugsnag.leaveBreadcrumb("Settings change", updatedChanges);
        for (const listener of this.changeListeners) listener(updatedChanges);
      }
      async onFxDataChange(fxData) {
        this.fxData = fxData;
        const updatedChanges = {
          fxCurrencies: {
            newValue: this.fxCurrencies
          },
          fx: {
            newValue: this.contentConfig.fx
          }
        };
        for (const listener of this.changeListeners) listener(updatedChanges);
      }
      extractLocalSettingChanges(settingsChange) {
        if (!is_object_isObject(settingsChange)) return {};
        const settings = [ ...new Set([ ...Object.keys(settingsChange.newValue || {}), ...Object.keys(settingsChange.oldValue || {}) ]) ];
        const result = {};
        for (const setting of settings) result[setting] = {
          newValue: settingsChange.newValue?.[setting],
          oldValue: settingsChange.oldValue?.[setting]
        };
        return result;
      }
      addChangeListener(callback) {
        if (this.changeListeners.indexOf(callback) !== -1) return;
        this.changeListeners.push(callback);
      }
      removeChangeListener(callback) {
        const index = this.changeListeners.indexOf(callback);
        if (index === -1) return;
        this.changeListeners.splice(index, 1);
      }
      // Property accessors
      // Ultimately we want to do away with all this boilerplate and use decorators
      // to generate this code.
      // Something like:
      //   function syncedPref<T>(defaultValue: T) {
      //     return (
      //       _value: {
      //         get: () => T;
      //         set: (value: T) => void;
      //       },
      //       context: {
      //         kind: 'accessor';
      //         name: keyof Settings;
      //         static: boolean;
      //         private: boolean;
      //         access: {
      //           get: (object: Config) => T;
      //           set: (object: Config, value: T) => void;
      //         };
      //         addInitializer(initializer: () => void): void;
      //       }
      //     ): {
      //       get?: (this: Config) => T;
      //       set?: (this: Config, value: unknown) => void;
      //       init?: (this: Config, initialValue: T) => T;
      //     } | void => {
      //       return {
      //         get: () => this.settings[context.name] ?? defaultValue,
      //         set: (value: T) => {
      //           if (this.settings[context.name] === value) {
      //             return;
      //           }
      //           if (value === defaultValue) {
      //             delete this.settings[context.name];
      //             void browser.storage.sync.remove(context.name);
      //           } else {
      //             this.settings[context.name] = value;
      //             void browser.storage.sync.set({ [context.name]: value });
      //           }
      //         },
      //       };
      //     };
      //   }
      // Usage:
      //   @syncedPref<'common' | 'regular' | undefined>('regular')
      //   accessor copyHeadwords: 'common' | 'regular' | undefined;
      // (Come to think of it, once we do that each accessor will have its own
      // storage so we can skip writing to this.settings and just use
      // _value.get.call(this) etc.)
      // (Also, we should make the generated getter/setter exclude `undefined` from
      // `T`).
      // Unfortunately, while TypeScript can transpile that, we use vitest for our
      // unit tests which uses esbuild under the hood which doesn't yet support
      // decorators and in any case, won't transpile them:
      //   https://github.com/evanw/esbuild/issues/104
      // UPDATE: Looks like support was added for decorators as of esbuild v0.21.3
      // https://github.com/evanw/esbuild/releases/tag/v0.21.3
      // Our options are either to use SWC (which runs the risk of behaving a bit
      // differently to TypeScript) or try to get TSC to transpile the relevant
      // files, e.g. using https://github.com/thomaschaaf/esbuild-plugin-tsc
      // Unfortunately apparently vitest doesn't support esbuild plugins so that
      // last option probably won't work.
      // Decorators are being implemented in browsers (e.g. Firefox bug:
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1781212) so one day they should
      // be available in esbuild and vitest too.
      // accentDisplay: Defaults to binary
      get accentDisplay() {
        return typeof this.settings.accentDisplay === "undefined" ? "binary" : this.settings.accentDisplay;
      }
      set accentDisplay(value) {
        if (typeof this.settings.accentDisplay !== "undefined" && this.settings.accentDisplay === value) return;
        this.settings.accentDisplay = value;
        void browser_polyfill_default().storage.sync.set({
          accentDisplay: value
        });
      }
      // autoExpand: Defaults to an empty array
      get autoExpand() {
        return typeof this.settings.autoExpand === "undefined" ? [] : [ ...new Set(this.settings.autoExpand) ];
      }
      toggleAutoExpand(type, value) {
        const enabled = new Set(this.settings.autoExpand);
        if (value === enabled.has(type)) return;
        if (value) enabled.add(type); else enabled.delete(type);
        if (enabled.size) {
          this.settings.autoExpand = [ ...enabled ];
          void browser_polyfill_default().storage.sync.set({
            autoExpand: [ ...enabled ]
          });
        } else {
          delete this.settings.autoExpand;
          void browser_polyfill_default().storage.sync.remove("autoExpand");
        }
      }
      // canHover (local): Defaults to true
      get canHover() {
        return this.settings.localSettings?.canHover ?? true;
      }
      set canHover(value) {
        const storedSetting = this.settings.localSettings?.canHover;
        if (storedSetting === value || storedSetting === void 0 && value) return;
        const localSettings = {
          ...this.settings.localSettings
        };
        if (value) delete localSettings.canHover; else localSettings.canHover = false;
        this.settings.localSettings = localSettings;
        void browser_polyfill_default().storage.local.set({
          settings: localSettings
        });
      }
      // bunproDisplay: Defaults to false
      get bunproDisplay() {
        return !!this.settings.bunproDisplay;
      }
      set bunproDisplay(value) {
        if (this.settings.bunproDisplay === (value || void 0)) return;
        if (!value) {
          delete this.settings.bunproDisplay;
          void browser_polyfill_default().storage.sync.remove("bunproDisplay");
        } else {
          this.settings.bunproDisplay = value;
          void browser_polyfill_default().storage.sync.set({
            bunproDisplay: value
          });
        }
      }
      // contextMenuEnable: Defaults to true
      get contextMenuEnable() {
        return typeof this.settings.contextMenuEnable === "undefined" || this.settings.contextMenuEnable;
      }
      set contextMenuEnable(value) {
        if (typeof this.settings.contextMenuEnable !== "undefined" && this.settings.contextMenuEnable === value) return;
        this.settings.contextMenuEnable = value;
        void browser_polyfill_default().storage.sync.set({
          contextMenuEnable: value
        });
      }
      // copyHeadwords: Defaults to 'regular'
      get copyHeadwords() {
        return this.settings.copyHeadwords || "regular";
      }
      set copyHeadwords(value) {
        if (this.settings.copyHeadwords === value) return;
        if (value === "regular") {
          delete this.settings.copyHeadwords;
          void browser_polyfill_default().storage.sync.remove("copyHeadwords");
        } else {
          this.settings.copyHeadwords = value;
          void browser_polyfill_default().storage.sync.set({
            copyHeadwords: value
          });
        }
      }
      // copyPos: Defaults to 'code'
      get copyPos() {
        return this.settings.copyPos || "code";
      }
      set copyPos(value) {
        if (this.settings.copyPos === value) return;
        if (value === "code") {
          delete this.settings.copyPos;
          void browser_polyfill_default().storage.sync.remove("copyPos");
        } else {
          this.settings.copyPos = value;
          void browser_polyfill_default().storage.sync.set({
            copyPos: value
          });
        }
      }
      // copySenses: Defaults to 'all'
      get copySenses() {
        return this.settings.copySenses || "all";
      }
      set copySenses(value) {
        if (this.settings.copySenses === value) return;
        if (value === "all") {
          delete this.settings.copySenses;
          void browser_polyfill_default().storage.sync.remove("copySenses");
        } else {
          this.settings.copySenses = value;
          void browser_polyfill_default().storage.sync.set({
            copySenses: value
          });
        }
      }
      // dictLang: Defaults to the first match from navigator.languages found in
      // dbLanguages, or 'en' otherwise.
      get dictLang() {
        return this.useDefaultLang() ? this.getDefaultLang() : this.settings.dictLang;
      }
      set dictLang(value) {
        if (this.settings.dictLang && this.settings.dictLang === value) return;
        // Note that we don't need to check that `value` is valid since TypeScript
        // does that for us.
        // If the value to set matches the default we clear the setting. This is so
        // that if we later support one of the user's more preferred languages we
        // can update them automatically.
                if (value === this.getDefaultLang()) {
          browser_polyfill_default().storage.sync.remove("dictLang").catch((e => {
            void Bugsnag.notify(new ExtensionStorageError({
              key: "dictLang",
              action: "remove"
            }, {
              cause: e
            }), {
              severity: "warning"
            });
          }));
          delete this.settings.dictLang;
        } else {
          browser_polyfill_default().storage.sync.set({
            dictLang: value
          }).catch((e => {
            void Bugsnag.notify(new ExtensionStorageError({
              key: "dictLang",
              action: "set"
            }, {
              cause: e
            }), {
              severity: "warning"
            });
          }));
          this.settings.dictLang = value;
        }
      }
      useDefaultLang() {
        // Check that the language that is set is valid. It might be invalid if we
        // deprecated a language or we synced a value from a newer version of the
        // extension.
        if (this.settings.dictLang) return !dbLanguages.includes(this.settings.dictLang);
        return true;
      }
      getDefaultLang() {
        const availableLanguages = new Set(dbLanguages);
        for (const lang of navigator.languages) {
          const langCode = lang.split("-")[0];
          if (availableLanguages.has(langCode)) return langCode;
        }
        return "en";
      }
      onLanguageChange() {
        // If the user's accept-languages setting changed AND we are basing the
        // dictLang value on that we should notify listeners of the change.
        if (!this.useDefaultLang()) return;
        const newValue = this.getDefaultLang();
        if (this.previousDefaultLang !== newValue) {
          const oldValue = this.previousDefaultLang;
          this.previousDefaultLang = newValue;
          const changes = {
            dictLang: {
              newValue,
              oldValue
            }
          };
          for (const listener of this.changeListeners) listener(changes);
        }
      }
      // enableTapLookup: Defaults to true
      get enableTapLookup() {
        return this.settings.enableTapLookup ?? true;
      }
      set enableTapLookup(value) {
        const storedSetting = this.settings.enableTapLookup;
        if (storedSetting === value) return;
        if (value) {
          void browser_polyfill_default().storage.sync.remove("enableTapLookup");
          delete this.settings.enableTapLookup;
        } else {
          void browser_polyfill_default().storage.sync.set({
            enableTapLookup: value
          });
          this.settings.enableTapLookup = value;
        }
      }
      // fontFace: Defaults to 'bundled'
      get fontFace() {
        return this.settings.fontFace === void 0 ? "bundled" : this.settings.fontFace;
      }
      set fontFace(value) {
        if (this.settings.fontFace !== void 0 && this.settings.fontFace === value || typeof this.settings.fontFace === "undefined" && value === "bundled") return;
        if (value !== "bundled") {
          this.settings.fontFace = value;
          void browser_polyfill_default().storage.sync.set({
            fontFace: value
          });
        } else {
          this.settings.fontFace = void 0;
          void browser_polyfill_default().storage.sync.remove("fontFace");
        }
      }
      // fontSize: Defaults to normal
      get fontSize() {
        return typeof this.settings.fontSize === "undefined" ? "normal" : this.settings.fontSize;
      }
      set fontSize(value) {
        if (typeof this.settings.fontSize !== "undefined" && this.settings.fontSize === value) return;
        if (value === "normal") {
          this.settings.fontSize = void 0;
          void browser_polyfill_default().storage.sync.remove("fontSize");
        } else {
          this.settings.fontSize = value;
          void browser_polyfill_default().storage.sync.set({
            fontSize: value
          });
        }
      }
      // fxCurrency: Defaults to USD
      get fxCurrency() {
        return typeof this.settings.fxCurrency === "string" ? this.settings.fxCurrency : "USD";
      }
      set fxCurrency(value) {
        const storedSetting = this.settings.fxCurrency;
        if (value === storedSetting) return;
        // Unlike many other settings, we don't reset the setting if the user
        // chooses the default value ('USD') since in this case we treat it as an
        // explicit signal they want currencies displayed in USD even if we later
        // change the default.
                void browser_polyfill_default().storage.sync.set({
          fxCurrency: value
        });
        this.settings.fxCurrency = value;
      }
      get fxCurrencies() {
        return this.fxData ? Object.keys(this.fxData.rates).sort(((a, b) => a.localeCompare(b))) : void 0;
      }
      // highlightStyle: Defaults to 'yellow'
      get highlightStyle() {
        return this.settings.highlightStyle ?? "yellow";
      }
      set highlightStyle(value) {
        if (this.highlightStyle === value) return;
        if (value === "yellow") {
          this.settings.highlightStyle = void 0;
          void browser_polyfill_default().storage.sync.remove("highlightStyle");
        } else {
          this.settings.highlightStyle = value;
          void browser_polyfill_default().storage.sync.set({
            highlightStyle: value
          });
        }
      }
      // holdToShowKeys: Defaults to null
      get holdToShowKeys() {
        return typeof this.settings.holdToShowKeys === "string" ? this.settings.holdToShowKeys : null;
      }
      set holdToShowKeys(value) {
        const storedSetting = this.settings.holdToShowKeys || null;
        if (value === storedSetting) return;
        if (value === null) {
          void browser_polyfill_default().storage.sync.remove("holdToShowKeys");
          delete this.settings.holdToShowKeys;
        } else {
          void browser_polyfill_default().storage.sync.set({
            holdToShowKeys: value
          });
          this.settings.holdToShowKeys = value;
        }
        // If holdToShowImageKeys was mirroring this setting, save the previous
        // value as its own value.
                if (typeof this.settings.holdToShowImageKeys === "undefined") this.holdToShowImageKeys = storedSetting; else if (!value && this.settings.holdToShowImageKeys === "none") this.holdToShowImageKeys = null;
      }
      // holdToShowImageKeys: Default is... complicated.
      // This setting was introduced after the "holdToShowKeys" setting was
      // introduced and we want the default behavior to be:
      // - For new users, nothing, since that's the default for "holdToShow" keys
      //   and it makes sense to surface this by default and let users who find it
      //   annoying turn it off.
      // - For users who have previously configured a "holdToShowKeys" setting,
      //   the same value as the "holdToShowKeys" setting since previously that
      //   setting controlled this behavior.
      // But how do we distinguish between a user who has previously configured the
      // "holdToShowKeys" setting (meaning we should mirror that value here) vs one
      // who has configured the "holdToShowKeys" setting _since_ this setting was
      // introduced and deliberately wants different behavior to that setting?
      // We achieve that by deliberately storing "none" as the value for this
      // setting any time we alter the "holdToShowKeys" setting while this is null.
      get holdToShowImageKeys() {
        // If there is an explicit setting for this value, use that.
        if (typeof this.settings.holdToShowImageKeys === "string") return this.settings.holdToShowImageKeys === "none" ? null : this.settings.holdToShowImageKeys;
        // Otherwise, mirror the holdToShowKeys setting
                return this.holdToShowKeys;
      }
      set holdToShowImageKeys(value) {
        // If this is null AND holdToShowKeys is null, then we can clear the local
        // setting. We only need to store 'none' if holdToShowKeys is set (in order
        // to ensure we DON'T mirror that setting).
        const settingToStore = value === null && this.holdToShowKeys ? "none" : value;
        // Ignore null-op changes
                const storedSetting = this.settings.holdToShowImageKeys || null;
        if (settingToStore === storedSetting) return;
        if (settingToStore === null) {
          void browser_polyfill_default().storage.sync.remove("holdToShowImageKeys");
          delete this.settings.holdToShowImageKeys;
        } else {
          void browser_polyfill_default().storage.sync.set({
            holdToShowImageKeys: settingToStore
          });
          this.settings.holdToShowImageKeys = settingToStore;
        }
      }
      // kanjiReferences: Defaults to true for all but a few references
      // that were added more recently.
      get kanjiReferences() {
        const setValues = this.settings.kanjiReferencesV2 || {};
        const result = [];
        for (const ref of getReferencesForLang(this.dictLang)) if (typeof setValues[ref] === "undefined") {
          if (!OFF_BY_DEFAULT_REFERENCES.has(ref)) result.push(ref);
        } else if (setValues[ref]) result.push(ref);
        return result;
      }
      updateKanjiReferences(updatedReferences) {
        const existingSettings = this.settings.kanjiReferencesV2 || {};
        this.settings.kanjiReferencesV2 = {
          ...existingSettings,
          ...updatedReferences
        };
        void browser_polyfill_default().storage.sync.set({
          kanjiReferencesV2: this.settings.kanjiReferencesV2
        });
      }
      // keys: Defaults are defined by DEFAULT_KEY_SETTINGS, and particularly the
      // enabledKeys member.
      getDefaultEnabledKeys() {
        return PopupKeys.reduce(((defaultKeys, setting) => {
          defaultKeys[setting.name] = setting.enabledKeys;
          return defaultKeys;
        }), {});
      }
      get keys() {
        const setValues = this.settings.keys || {};
        const keys = {
          ...this.getDefaultEnabledKeys(),
          ...setValues
        };
        // If there is no key set for the pin popup key, but there _is_ a suitable
        // hold-to-show key set, we should use that as the default value.
        
        // (Note that all this complexity might be meaningless. At least on Firefox
        // on Windows, no one in their right mind would configure Alt as their
        // hold-to-show key. Every time you release it the menu pops up!)
                if (!("pinPopup" in setValues)) {
          // Hold-to-show keys contains a string like `Alt+Ctrl` but we can only
          // re-use the hold-to-show keys when it's a single item like 'Alt'.
          const holdToShowKeys = this.holdToShowKeys?.split("+");
          if (holdToShowKeys?.length === 1) {
            const holdToShowKey = holdToShowKeys[0];
            const availableKeys = PopupKeys.find((k => k.name === "pinPopup"));
            if (availableKeys?.keys.includes(holdToShowKey)) keys.pinPopup = [ holdToShowKey ];
          }
        }
        // When we first released the `expandPopup` key ('x') we didn't notice
        // that it was already possible to assign 'x' to `closePopup`.
        
        // We _could_ try to make it so that if you assign 'x' to `expandPopup` we
        // remove it from `closePopup`. But it might be slightly more useful to
        // allow it to be assigned to both and simply report it as being assigned to
        // `closePopup` in that case.
        
        // That has the advantages that:
        
        // 1. If you go to enable it for `closePopup` and notice that doing so
        //    clears it from `expandPopup`, you can just untick it from `closePopup`
        //    and it will automatically be restored to `expandPopup`.
        
        // 2. We need to handle the case when they're both selected anyway since
        //    it's already possible to get it into that state in a released version.
                if (keys.expandPopup.includes("x") && keys.closePopup.includes("x")) keys.expandPopup = keys.expandPopup.filter((k => k !== "x"));
        return keys;
      }
      get keysNormalized() {
        const storedKeys = this.keys;
        const [down, up] = this.keys.movePopupDownOrUp.map((key => key.split(",", 2))).reduce((([existingDown, existingUp], [down, up]) => [ [ ...existingDown, down ], [ ...existingUp, up ] ]), [ [], [] ]);
        return {
          ...stripFields(storedKeys, [ "movePopupDownOrUp" ]),
          movePopupDown: down,
          movePopupUp: up
        };
      }
      updateKeys(keys) {
        const existingSettings = this.settings.keys || {};
        this.settings.keys = {
          ...existingSettings,
          ...keys
        };
        void browser_polyfill_default().storage.sync.set({
          keys: this.settings.keys
        });
      }
      // noTextHighlight: Defaults to false
      get noTextHighlight() {
        return !!this.settings.noTextHighlight;
      }
      set noTextHighlight(value) {
        if (typeof this.settings.noTextHighlight !== "undefined" && this.settings.noTextHighlight === value) return;
        this.settings.noTextHighlight = value;
        void browser_polyfill_default().storage.sync.set({
          noTextHighlight: value
        });
      }
      // popupInteractive (local): Defaults to true
      get popupInteractive() {
        return this.settings.localSettings?.popupInteractive ?? true;
      }
      set popupInteractive(value) {
        const storedSetting = this.settings.localSettings?.popupInteractive;
        if (storedSetting === value) return;
        const localSettings = {
          ...this.settings.localSettings
        };
        if (value) delete localSettings.popupInteractive; else localSettings.popupInteractive = false;
        this.settings.localSettings = localSettings;
        void browser_polyfill_default().storage.local.set({
          settings: localSettings
        });
      }
      // popupStyle: Defaults to 'default'
      get popupStyle() {
        return typeof this.settings.popupStyle === "undefined" ? "default" : this.settings.popupStyle;
      }
      set popupStyle(value) {
        if (typeof this.settings.popupStyle !== "undefined" && this.settings.popupStyle === value || typeof this.settings.popupStyle === "undefined" && value === "default") return;
        if (value !== "default") {
          this.settings.popupStyle = value;
          void browser_polyfill_default().storage.sync.set({
            popupStyle: value
          });
        } else {
          this.settings.popupStyle = void 0;
          void browser_polyfill_default().storage.sync.remove("popupStyle");
        }
      }
      // posDisplay: Defaults to expl
      get posDisplay() {
        return typeof this.settings.posDisplay === "undefined" ? "expl" : this.settings.posDisplay;
      }
      set posDisplay(value) {
        if (typeof this.settings.posDisplay !== "undefined" && this.settings.posDisplay === value) return;
        this.settings.posDisplay = value;
        void browser_polyfill_default().storage.sync.set({
          posDisplay: value
        });
      }
      // preferredUnits: Defaults to 'metric'
      get preferredUnits() {
        return this.settings.preferredUnits || "metric";
      }
      set preferredUnits(value) {
        if (this.settings.preferredUnits === value) return;
        this.settings.preferredUnits = value;
        void browser_polyfill_default().storage.sync.set({
          preferredUnits: value
        });
      }
      // readingOnly: Defaults to false
      get readingOnly() {
        return !!this.settings.readingOnly;
      }
      set readingOnly(value) {
        if (typeof this.settings.readingOnly !== "undefined" && this.settings.readingOnly === value) return;
        this.settings.readingOnly = value;
        void browser_polyfill_default().storage.sync.set({
          readingOnly: value
        });
      }
      toggleReadingOnly() {
        this.readingOnly = !this.settings.readingOnly;
      }
      // showKanjiComponents: Defaults to true
      get showKanjiComponents() {
        return typeof this.settings.showKanjiComponents === "undefined" || this.settings.showKanjiComponents;
      }
      set showKanjiComponents(value) {
        this.settings.showKanjiComponents = value;
        void browser_polyfill_default().storage.sync.set({
          showKanjiComponents: value
        });
      }
      // showPriority: Defaults to true
      get showPriority() {
        return typeof this.settings.showPriority === "undefined" || this.settings.showPriority;
      }
      set showPriority(value) {
        this.settings.showPriority = value;
        void browser_polyfill_default().storage.sync.set({
          showPriority: value
        });
      }
      // showPuck (local): Defaults to 'auto'
      get showPuck() {
        return this.settings.localSettings?.showPuck || "auto";
      }
      set showPuck(value) {
        const storedSetting = this.settings.localSettings?.showPuck || "auto";
        if (storedSetting === value) return;
        const localSettings = {
          ...this.settings.localSettings
        };
        if (value === "auto") delete localSettings.showPuck; else localSettings.showPuck = value;
        this.settings.localSettings = localSettings;
        // If value is 'hide' we should reset the puck state but since that writes
        // to the same key in local storage we should wait for the current write to
        // complete first.
                void browser_polyfill_default().storage.local.set({
          settings: localSettings
        }).finally((() => {
          if (value === "hide") this.puckState = void 0;
        }));
      }
      get computedShowPuck() {
        return this.showPuck !== "auto" ? this.showPuck : this.canHover ? "hide" : "show";
      }
      // Puck state (local): Defaults to undefined
      get puckState() {
        return this.settings.localSettings?.puckState;
      }
      set puckState(value) {
        const storedSetting = this.settings.localSettings?.puckState;
        if (JSON.stringify(storedSetting) === JSON.stringify(value)) return;
        const localSettings = {
          ...this.settings.localSettings
        };
        if (!value) delete localSettings.puckState; else localSettings.puckState = value;
        this.settings.localSettings = localSettings;
        void browser_polyfill_default().storage.local.set({
          settings: localSettings
        });
      }
      // showRomaji: Defaults to false
      get showRomaji() {
        return !!this.settings.showRomaji;
      }
      set showRomaji(value) {
        if (this.settings.showRomaji === value) return;
        if (!value) {
          delete this.settings.showRomaji;
          void browser_polyfill_default().storage.sync.remove("showRomaji");
        } else {
          this.settings.showRomaji = value;
          void browser_polyfill_default().storage.sync.set({
            showRomaji: value
          });
        }
      }
      // waniKaniVocabDisplay: Defaults to 'hide'
      get waniKaniVocabDisplay() {
        return this.settings.waniKaniVocabDisplay || "hide";
      }
      set waniKaniVocabDisplay(value) {
        if (this.settings.waniKaniVocabDisplay === value) return;
        if (value === "hide") {
          delete this.settings.waniKaniVocabDisplay;
          void browser_polyfill_default().storage.sync.remove("waniKaniVocabDisplay");
        } else {
          this.settings.waniKaniVocabDisplay = value;
          void browser_polyfill_default().storage.sync.set({
            waniKaniVocabDisplay: value
          });
        }
      }
      // tabDisplay: Defaults to 'top'
      get tabDisplay() {
        return typeof this.settings.tabDisplay === "undefined" ? "top" : this.settings.tabDisplay;
      }
      set tabDisplay(value) {
        if (typeof this.settings.tabDisplay !== "undefined" && this.settings.tabDisplay === value || typeof this.settings.tabDisplay === "undefined" && value === "top") return;
        if (value !== "top") {
          this.settings.tabDisplay = value;
          void browser_polyfill_default().storage.sync.set({
            tabDisplay: value
          });
        } else {
          this.settings.tabDisplay = void 0;
          void browser_polyfill_default().storage.sync.remove("tabDisplay");
        }
      }
      // toolbarIcon: Defaults to 'default'
      get toolbarIcon() {
        return typeof this.settings.toolbarIcon === "undefined" ? "default" : this.settings.toolbarIcon;
      }
      set toolbarIcon(value) {
        if (typeof this.settings.toolbarIcon !== "undefined" && this.settings.toolbarIcon === value || typeof this.settings.toolbarIcon === "undefined" && value === "default") return;
        if (value !== "default") {
          this.settings.toolbarIcon = value;
          void browser_polyfill_default().storage.sync.set({
            toolbarIcon: value
          });
        } else {
          this.settings.toolbarIcon = void 0;
          void browser_polyfill_default().storage.sync.remove("toolbarIcon");
        }
      }
      // Get all the options the content process cares about at once
      get contentConfig() {
        return {
          accentDisplay: this.accentDisplay,
          autoExpand: this.autoExpand,
          bunproDisplay: this.bunproDisplay,
          copyHeadwords: this.copyHeadwords,
          copyPos: this.copyPos,
          copySenses: this.copySenses,
          dictLang: this.dictLang,
          enableTapLookup: this.enableTapLookup,
          fx: this.fxData && this.fxCurrency in this.fxData.rates ? {
            currency: this.fxCurrency,
            rate: this.fxData.rates[this.fxCurrency],
            timestamp: this.fxData.timestamp
          } : void 0,
          fontFace: this.fontFace,
          fontSize: this.fontSize,
          highlightStyle: this.highlightStyle,
          holdToShowKeys: this.holdToShowKeys ? this.holdToShowKeys.split("+") : [],
          holdToShowImageKeys: this.holdToShowImageKeys ? this.holdToShowImageKeys.split("+") : [],
          kanjiReferences: this.kanjiReferences,
          keys: this.keysNormalized,
          noTextHighlight: this.noTextHighlight,
          popupInteractive: this.popupInteractive,
          popupStyle: this.popupStyle,
          posDisplay: this.posDisplay,
          preferredUnits: this.preferredUnits,
          puckState: this.puckState,
          readingOnly: this.readingOnly,
          showKanjiComponents: this.showKanjiComponents,
          showPriority: this.showPriority,
          showPuck: this.showPuck,
          showRomaji: this.showRomaji,
          tabDisplay: this.tabDisplay,
          toolbarIcon: this.toolbarIcon,
          waniKaniVocabDisplay: this.waniKaniVocabDisplay
        };
      }
      constructor() {
        config_define_property(this, "fxData", void 0);
        config_define_property(this, "settings", {});
        config_define_property(this, "readyPromise", void 0);
        config_define_property(this, "changeListeners", []);
        config_define_property(this, "previousDefaultLang", void 0);
        this.readyPromise = this.readSettings().then((async () => {
          this.fxData = await getLocalFxData(this.onFxDataChange.bind(this));
        }));
        this.previousDefaultLang = this.getDefaultLang();
        this.onChange = this.onChange.bind(this);
        browser_polyfill_default().storage.onChanged.addListener(this.onChange);
        this.onLanguageChange = this.onLanguageChange.bind(this);
        self.addEventListener("languagechange", this.onLanguageChange);
      }
    }
    // CONCATENATED MODULE: ./src/utils/release-stage.ts
    let release_stage_releaseStage = "production";
    if (browser_polyfill_default().management) browser_polyfill_default().management.getSelf().then((info => {
      if (info.installType === "development") release_stage_releaseStage = "development";
    })).catch((e => {
      console.warn(e);
    }));
    function getReleaseStage() {
      return release_stage_releaseStage;
    }
    // CONCATENATED MODULE: ./src/utils/bugsnag.ts
    const getExtensionInstallId = async () => {
      let internalUuid;
      try {
        // In Firefox, each install gets a unique internal UUID which differs from
        // the extension ID (provided it is set through the
        // browser_specific_settings in manifest.json).
        // Specifically:
        // browser.runtime.id = Extension ID
        // browser.runtime.getURL('yer').host = Internal UUID
        // browser.getMessage('@@extension_id') = Internal UUID
        // In other browsers I think all of the above return the Extension ID.
        // (I haven't checked Safari, however.)
        // If that internal UUID is available, we use it because it is sometimes
        // helpful when Firefox users contact us describing a bug, to be able to
        // find error reports generated from their installation.
        internalUuid = new URL(browser_polyfill_default().runtime.getURL("yer")).host;
      } catch {
        // Ignore
      }
      if (internalUuid && internalUuid !== browser_polyfill_default().runtime.id) return internalUuid;
      // Generate/fetch a unique install ID since the browser doesn't provide one.
            try {
        let storedInstallId = (await browser_polyfill_default().storage.local.get("installid"))?.installid;
        if (typeof storedInstallId !== "string") {
          const installId = getRandomId();
          await browser_polyfill_default().storage.local.set({
            installid: installId
          });
          storedInstallId = installId;
        }
        return storedInstallId;
      } catch {
        // Ignore because we are probably already in the middle of reporting an error
      }
      return "unknown";
    };
    function getRandomId() {
      const number = getRandomNumber(10);
      return `${"0".repeat(10)}${number.toString(36)}`.slice(-10);
    }
    // |length| here is the maximum number of base-36 digits we want to generate.
        function getRandomNumber(length) {
      if (Math.pow(36, length) > Number.MAX_SAFE_INTEGER) console.error(`A base-36 number with ${length} digits overflows the range of an integer`);
      const values = new Uint8Array(length);
      crypto.getRandomValues(values);
      const max = Math.pow(2, 8);
      let result = 0;
      for (let i = 0; i < values.length; i++) {
        result *= 36;
        result += Math.round(values[i] / max * 35);
      }
      return result;
    }
    function startBugsnag() {
      const manifest = browser_polyfill_default().runtime.getManifest();
      const plugins = [ appDuration, browserContext, browserHandledRejectionBreadcrumbs, browserNotifyUnhandledExceptions, browserNotifyUnhandledRejections, deviceOrientation, errorBreadcrumbs, fetchBreadcrumbs, interactionBreadcrumbs, limitEvents(20), navigationBreadcrumbs, esm_stringifyValues ];
      if (getReleaseStage() !== "development") plugins.push(consoleBreadcrumbs);
      Bugsnag.start({
        apiKey: "e707c9ae84265d122b019103641e6462",
        appVersion: manifest.version_name || manifest.version,
        collectUserIp: false,
        onError: async event => {
          // Fill out the user ID
          event.user = {
            id: await getExtensionInstallId()
          };
          // Group download errors by URL and error code
                    if (isDownloadError(event.originalError)) {
            event.groupingHash = String(event.originalError.code) + event.originalError.url;
            if (!event.request) event.request = {};
            event.request.url = event.originalError.url;
          }
          // Group extension errors by action and key
                    if (event.originalError instanceof ExtensionStorageError) {
            const {key, action} = event.originalError;
            event.groupingHash = `${action}:${key}`;
          }
          // Update release stage here since we can only fetch this async but
          // bugsnag doesn't allow updating the instance after initializing.
                    if (!event.app) event.app = {};
          event.app.releaseStage = getReleaseStage();
          // Update paths in stack trace so that:
          
          // (a) They are the same across installations of the same version (since
          //     the installed extension ID in the path differs per installation).
          // (b) They point to where the source is available publicly.
          
          // Note that this is also necessary because Bugsnag's backend discards stack
          // frames from extensions.
          
          // See: https://docs.bugsnag.com/platforms/javascript/faq/?#how-can-i-get-error-reports-from-browser-extensions
                    const basePath = `https://github.com/birchill/10ten-ja-reader/releases/download/v${manifest.version_name || manifest.version}`;
          for (const error of event.exceptions) for (const frame of error.stacktrace) frame.file = frame.file.replace(/^(moz-extension|chrome-extension|extension|safari-extension|safari-web-extension):\/\/[0-9a-z-]+/, basePath);
          // If we get a QuotaExceededError, report how much disk space was available.
                    if (event.exceptions[0].errorClass === "QuotaExceededError") try {
            const {quota, usage} = await navigator.storage.estimate();
            if (!event.metaData) event.metaData = {};
            event.metaData.storage = {
              quota,
              usage
            };
          } catch {
            console.warn("Failed to get storage estimate");
          }
          return true;
        },
        plugins
      });
    }
    function isDownloadError(error) {
      return is_object_isObject(error) && typeof error.name === "string" && (typeof error.url === "string" || typeof error.url === "undefined") && (typeof error.code === "number" || typeof error.url === "string");
    }
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
    function hooks_module_g() {
      var n = hooks_module_d(hooks_module_t++, 11);
      if (!n.__) {
        for (var u = hooks_module_r.__v; null !== u && !u.__m && null !== u.__; ) u = u.__;
        var i = u.__m || (u.__m = [ 0, 0 ]);
        n.__ = "P" + i[0] + "-" + i[1]++;
      }
      return n.__;
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
    // CONCATENATED MODULE: ./src/common/i18n.tsx
    const contextValue = {
      t: browser_polyfill_default().i18n.getMessage.bind(browser_polyfill_default().i18n),
      langTag: browser_polyfill_default().i18n.getMessage("lang_tag")
    };
    const i18nContext = G(contextValue);
    function I18nProvider(props) {
      if (props.locale !== void 0) throw new Error("Changing locale is not supported");
      
      return jsxRuntime_module_u(i18nContext.Provider, {
        value: contextValue,
        children: props.children
      });
    }
    function useLocale() {
      return hooks_module_x(i18nContext);
    }
    // CONCATENATED MODULE: ./src/utils/device.ts
    function isTouchDevice() {
      if (window.PointerEvent && "maxTouchPoints" in navigator) return navigator.maxTouchPoints > 0;
      if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches) return true;
      // The following will give a false positive in Chrome desktop but hopefully
      // one of the above checks will cover us there.
            return "TouchEvent" in window;
    }
    function possiblyHasPhysicalKeyboard() {
      const desktopOsStrings = [ "Windows", "Win32", "Win64", "Mac", "Linux" ];
      // In general, if the device has a fine pointer (e.g. mouse) we assume
      // it also has a keyboard.
      return window.matchMedia("(hover) and (pointer: fine)").matches || // However, we've encountered at least one notebook device which returns
      // `any-pointer: coarse` and `any-hover: none` for its trackpad on Firefox.
      // That seems to be a bug somewhere (at very least, a trackpad can hover)
      // in either Firefox or the OS/device driver, we shouldn't prevent users of
      // such a device from being able to configure the keyboard so we _also_
      // assume we have a keyboard when we're on an OS that we know to be
      // a desktop OS.
      desktopOsStrings.some((osString => navigator.userAgent.indexOf(osString) !== -1)) && // Exclude iOS, however, because the UA string there has "like Mac OS X"
      !isIOS();
    }
    // Detect if the primary input means is capable of hovering. If it is NOT
    // we show the puck by default.
    
    // e.g. if we're on a laptop device that has a touchpad or mouse we generally
    // _don't_ want to show the puck unless the user explicitly enables it.
    // For a smartphone or tablet, however, we want to show the puck by default.
        // CONCATENATED MODULE: ./src/common/priority-labels.ts
    const highPriorityLabels = [ "i1", "n1", "s1", "s2", "g1" ];
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
    const highPriorityLabelsSet = new Set(highPriorityLabels);
    function filterRelevantKanjiHeadwords(headwords, {includeLessCommonHeadwords}) {
      if (includeLessCommonHeadwords) return headwords.filter((k => !k.i?.includes("sK")));
      const commonHeadwords = headwords.filter((k => !k.i?.includes("sK") && !k.i?.includes("rK")));
      const highPriorityHeadwords = commonHeadwords.filter((k => k.p?.some((p => highPriorityLabelsSet.has(p)))));
      if (highPriorityHeadwords.length) return highPriorityHeadwords;
      const hasPriorityHeadwords = commonHeadwords.filter((k => k.p?.length));
      if (hasPriorityHeadwords.length) return hasPriorityHeadwords;
      return commonHeadwords;
    }
    function filterRelevantKanaHeadwords(headwords, {includeLessCommonHeadwords}) {
      if (includeLessCommonHeadwords) return headwords.filter((k => !k.i?.includes("sk")));
      const commonHeadwords = headwords.filter((k => !k.i?.includes("sk") && !k.i?.includes("rk")));
      const highPriorityHeadwords = commonHeadwords.filter((k => k.p?.some((p => highPriorityLabelsSet.has(p)))));
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
    // CONCATENATED MODULE: ./src/options/CheckboxRow.tsx
    function CheckboxRow(props) {
      
      return jsxRuntime_module_u("div", {
        ...props,
        class: "flex items-baseline gap-1.5 leading-snug [&>:not(input)]:flex-1 [&>input]:translate-y-px [&>label]:cursor-pointer [&>label]:select-none",
        children: props.children
      });
    }
    // CONCATENATED MODULE: ./src/options/NewBadge.tsx
    function NewBadge(props) {
      const {t} = useLocale();
      return new Date < props.expiry ?  jsxRuntime_module_u("span", {
        class: "mx-2 mt-[5px] inline-block rounded-full bg-rose-100 px-3 py-[2px] text-[12px] font-medium leading-none text-rose-900 dark:bg-rose-800 dark:text-rose-100",
        children: t("options_new_badge_text")
      }) : null;
    }
    // CONCATENATED MODULE: ./src/options/CopySettingsForm.tsx
    function CopySettingsForm(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u("div", {
        class: "flex flex-col gap-4",
        children: [ 
         jsxRuntime_module_u(CheckboxRow, {
          children: [ 
           jsxRuntime_module_u("input", {
            id: "simplifiedCopy",
            name: "simplifiedCopy",
            type: "checkbox",
            checked: props.simplifiedCopy,
            onChange: e => props.onChangeSimplifiedCopy(e.currentTarget.checked)
          }), 
           jsxRuntime_module_u("label", {
            for: "simplifiedCopy",
            children: [ t("options_simplified_copy"), 
             jsxRuntime_module_u(NewBadge, {
              expiry: new Date("2024-05-01")
            }) ]
          }) ]
        }), 
         jsxRuntime_module_u("div", {
          class: "rounded-lg border border-solid border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800",
          children: [ 
           jsxRuntime_module_u("p", {
            class: "m-0 mb-2 text-xs text-zinc-500 dark:text-zinc-400",
            children: t("options_copy_preview")
          }), 
           jsxRuntime_module_u("code", {
            class: "whitespace-pre-wrap text-sm font-medium text-zinc-700 dark:text-zinc-300",
            children: getTextToCopy({
              entry: {
                type: "word",
                data: {
                  id: 1704220,
                  k: [ {
                    ent: "\u8ee2\u3005",
                    p: [ "n1", "nf15" ],
                    match: true,
                    bv: {
                      l: 3
                    }
                  }, {
                    ent: "\u8ee2\u8ee2",
                    match: true
                  } ],
                  r: [ {
                    ent: "\u3066\u3093\u3066\u3093",
                    p: [ "n1", "nf15" ],
                    a: [ {
                      i: 0
                    }, {
                      i: 3
                    } ],
                    match: true,
                    matchRange: [ 0, 4 ]
                  } ],
                  s: [ {
                    g: [ {
                      str: "moving from place to place"
                    }, {
                      str: "being passed around repeatedly"
                    } ],
                    pos: [ "adv", "adv-to", "n", "vs" ],
                    match: true
                  }, {
                    g: [ {
                      str: "rolling about"
                    } ],
                    pos: [ "adv", "adv-to", "n", "vs" ],
                    match: true
                  } ],
                  romaji: props.showRomaji ? [ "tenten" ] : void 0
                }
              },
              copyType: "entry",
              getMessage: CopySettingsForm_getMessage,
              includeAllSenses: !props.simplifiedCopy,
              includeLessCommonHeadwords: !props.simplifiedCopy,
              includePartOfSpeech: !props.simplifiedCopy
            })
          }) ]
        }) ]
      });
    }
    function CopySettingsForm_getMessage(id) {
      return id;
    }
    // CONCATENATED MODULE: ./src/options/SectionHeading.tsx
    function SectionHeading(props) {
      
      return jsxRuntime_module_u("h1", {
        class: "mb-2 mt-4 border-0 border-t border-solid border-t-zinc-300 pt-4 text-2xl font-light first-of-type:mt-2 first-of-type:border-none first-of-type:pt-0",
        children: props.children
      });
    }
    // CONCATENATED MODULE: ./src/options/use-config-value.ts
    function useConfigValue(config, key) {
      const [value, setValue] = hooks_module_h(config[key]);
      hooks_module_y((() => {
        const changeCallback = changes => {
          if (Object.keys(changes).includes(key)) setValue(config[key]);
        };
        config.addChangeListener(changeCallback);
        return () => config.removeChangeListener(changeCallback);
      }), [ config, key ]);
      return value;
    }
    // CONCATENATED MODULE: ./src/options/CopySettings.tsx
    function CopySettings(props) {
      const {t} = useLocale();
      const copyHeadwords = useConfigValue(props.config, "copyHeadwords");
      const copyPos = useConfigValue(props.config, "copyPos");
      const copySenses = useConfigValue(props.config, "copySenses");
      const simplifiedCopy = copyHeadwords === "common" || copyPos === "none" || copySenses === "first";
      const onChangeSimplifiedCopy = hooks_module_q((value => {
        if (value) {
          props.config.copyHeadwords = "common";
          props.config.copyPos = "none";
          props.config.copySenses = "first";
        } else {
          props.config.copyHeadwords = "regular";
          props.config.copyPos = "code";
          props.config.copySenses = "all";
        }
      }), [ props.config ]);
      const showRomaji = useConfigValue(props.config, "showRomaji");
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_copy_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(CopySettingsForm, {
            showRomaji,
            simplifiedCopy,
            onChangeSimplifiedCopy
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/CurrencySettingsForm.tsx
    function CurrencySettingsForm(props) {
      const {t} = useLocale();
      const currencyNames = Intl.DisplayNames ? new Intl.DisplayNames([ "en" ], {
        type: "currency"
      }) : void 0;
      const options = [ [ "none", t("options_currency_none_label") ], ...props.currencies.map((c => {
        const label = currencyNames ? `${c} - ${currencyNames.of(c)}` : c;
        return [ c, label ];
      })) ];
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("label", {
          for: "fxCurrency",
          children: t("options_currency_label")
        }), 
         jsxRuntime_module_u("select", {
          id: "fxCurrency",
          name: "fxCurrency",
          onInput: event => {
            props.onChange(event.currentTarget.value);
          },
          children: options.map((([value, label]) =>  jsxRuntime_module_u("option", {
            value,
            selected: value === props.selectedCurrency,
            children: label
          }, value)))
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/CurrencySettings.tsx
    function CurrencySettings(props) {
      const {t} = useLocale();
      const fxCurrency = useConfigValue(props.config, "fxCurrency");
      const fxCurrencies = useConfigValue(props.config, "fxCurrencies");
      const onChangeCurrency = hooks_module_q((value => {
        props.config.fxCurrency = value;
      }), [ props.config ]);
      if (!fxCurrencies) return null;
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_currency_conversion_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(CurrencySettingsForm, {
            currencies: fxCurrencies,
            selectedCurrency: fxCurrency,
            onChange: onChangeCurrency
          })
        }) ]
      });
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
    // CONCATENATED MODULE: ./node_modules/.pnpm/@birchill+jpdict-idb@2.6.1/node_modules/@birchill/jpdict-idb/dist/index.js
    // src/abort-error.ts
    /* unused pure expression or super */ null && Error;
    // src/data-series.ts
        var allDataSeries = [ "words", "kanji", "radicals", "names" ];
    var allMajorDataSeries = [ "words", "kanji", "names" ];
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
    // CONCATENATED MODULE: ./node_modules/.pnpm/classname-variants@1.5.0/node_modules/classname-variants/lib/index.js
    const lib_classNames = {
      combine: (...classes) => classes.filter(Boolean).join(" ")
    };
    function lib_variants(config) {
      const {base, variants, compoundVariants, defaultVariants} = config;
      const isBooleanVariant = name => {
        const v = variants === null || variants === void 0 ? void 0 : variants[name];
        return v && ("false" in v || "true" in v);
      };
      return props => {
        var _a;
        const classes = base ? [ base ] : [];
        const getSelected = name => {
          var _a, _b;
          return (_b = (_a = props[name]) !== null && _a !== void 0 ? _a : defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[name]) !== null && _b !== void 0 ? _b : isBooleanVariant(name) ? false : void 0;
        };
        for (let name in variants) {
          const selected = getSelected(name);
          if (selected !== void 0) classes.push((_a = variants[name]) === null || _a === void 0 ? void 0 : _a[selected]);
        }
        for (let {variants, className} of compoundVariants !== null && compoundVariants !== void 0 ? compoundVariants : []) {
          const isSelected = name => getSelected(name) === variants[name];
          if (Object.keys(variants).every(isSelected)) classes.push(className);
        }
        return lib_classNames.combine(...classes);
      };
    }
    /**
 * No-op function to mark template literals as tailwind strings.
 */    String.raw;
    // CONCATENATED MODULE: ./node_modules/.pnpm/classname-variants@1.5.0/node_modules/classname-variants/lib/react.js
    function variantProps(config) {
      const variantClassName = lib_variants(config);
      return props => {
        const result = {};
        // Pass-through all unrelated props
                for (let prop in props) if (config.variants && !(prop in config.variants)) result[prop] = props[prop];
        // Add the optionally passed className prop for chaining
                result.className = lib_classNames.combine(variantClassName(props), props.className);
        return result;
      };
    }
    /**
 * No-op function to mark template literals as tailwind strings.
 */
    String.raw;
    // CONCATENATED MODULE: ./src/common/data-series-labels.ts
    const localizedDataSeriesKey = {
      kanji: "options_kanji_data_name",
      radicals: "options_bushu_data_name",
      names: "options_name_data_name",
      words: "options_words_data_name"
    };
    // CONCATENATED MODULE: ./src/utils/classes.ts
    function classes_classes(...classNames) {
      return classNames.filter(Boolean).join(" ");
    }
    // CONCATENATED MODULE: ./src/options/Linkify.tsx
    function Linkify(props) {
      const matchedReplacements = [];
      for (const link of props.links) {
        const index = props.text.indexOf(link.keyword);
        if (index !== -1) matchedReplacements.push({
          index,
          ...link
        });
      }
      matchedReplacements.sort(((a, b) => a.index - b.index));
      let position = 0;
      const parts = [];
      for (const replacement of matchedReplacements) {
        if (position < replacement.index) parts.push(props.text.substring(position, replacement.index));
        parts.push({
          href: replacement.href,
          keyword: replacement.keyword
        });
        position = replacement.index + replacement.keyword.length;
      }
      if (position < props.text.length) parts.push(props.text.substring(position, props.text.length));
      
      return jsxRuntime_module_u(preact_module_b, {
        children: parts.map((part => typeof part === "string" ? part :  jsxRuntime_module_u("a", {
          href: part.href,
          target: "_blank",
          rel: "noreferrer",
          children: part.keyword
        }, part.keyword)))
      });
    }
    // CONCATENATED MODULE: ./src/options/format.ts
    // Our special date formatting that is a simplified ISO 8601 in local time
    // without seconds.
    function formatDate(date) {
      const pad = n => n < 10 ? "0" + n : n;
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }
    function formatSize(sizeInBytes) {
      const kilobyte = 1024;
      const megabyte = kilobyte * 1024;
      const gigabyte = megabyte * 1024;
      const terabyte = gigabyte * 1024;
      // We don't bother localizing any of this. Anyone able to make sense of a
      // file size, can probably understand an English file size prefix.
            if (sizeInBytes >= terabyte) return (sizeInBytes / terabyte).toFixed(3) + "Tb";
      if (sizeInBytes >= gigabyte) return (sizeInBytes / gigabyte).toFixed(2) + "Gb";
      if (sizeInBytes >= megabyte) return (sizeInBytes / megabyte).toFixed(1) + "Mb";
      if (sizeInBytes >= kilobyte) return Math.round(sizeInBytes / kilobyte) + "Kb";
      return sizeInBytes + " bytes";
    }
    // CONCATENATED MODULE: ./src/options/DbStatus.tsx
    function DbStatus(props) {
      
      return jsxRuntime_module_u("div", {
        class: "flex flex-col gap-4 py-4",
        children: [ 
         jsxRuntime_module_u(DbSummaryBlurb, {}), 
         jsxRuntime_module_u(DbSummaryStatus, {
          dbState: props.dbState,
          onCancelDbUpdate: props.onCancelDbUpdate,
          onUpdateDb: props.onUpdateDb
        }), props.devMode &&  jsxRuntime_module_u("div", {
          class: "rounded-lg border border-solid border-red-900 bg-red-50 px-4 py-2 text-red-900 dark:border-red-200/50 dark:bg-red-900/30 dark:text-red-50",
          children: [ 
           jsxRuntime_module_u("span", {
            children: "Database testing features: "
          }), 
           jsxRuntime_module_u("button", {
            onClick: props.onDeleteDb,
            children: "Delete database"
          }) ]
        }) ]
      });
    }
    function DbSummaryBlurb() {
      const {t} = useLocale();
      const attribution = t("options_data_source");
      const license = t("options_edrdg_license");
      const licenseKeyword = t("options_edrdg_license_keyword");
      const accentAttribution = t("options_accent_data_source");
      const strokeAttribution = t("options_stroke_data_source");
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("p", {
          class: "m-0",
          children: [ 
           jsxRuntime_module_u(Linkify, {
            text: attribution,
            links: [ {
              keyword: "JMdict/EDICT",
              href: "https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project"
            }, {
              keyword: "KANJIDIC",
              href: "https://www.edrdg.org/wiki/index.php/KANJIDIC_Project"
            }, {
              keyword: "JMnedict/ENAMDICT",
              href: "https://www.edrdg.org/enamdict/enamdict_doc.html"
            } ]
          }), 
           jsxRuntime_module_u(Linkify, {
            text: license,
            links: [ {
              keyword: "Electronic Dictionary Research and Development Group",
              href: "https://www.edrdg.org/"
            }, {
              keyword: licenseKeyword,
              href: "https://www.edrdg.org/edrdg/licence.html"
            } ]
          }) ]
        }), 
         jsxRuntime_module_u("p", {
          class: "m-0",
          children: accentAttribution
        }), 
         jsxRuntime_module_u("p", {
          class: "m-0",
          children:  jsxRuntime_module_u(Linkify, {
            text: strokeAttribution,
            links: [ {
              keyword: "KanjiVG",
              href: "https://kanjivg.tagaini.net"
            }, {
              keyword: "Creative Commons Attribution-Share Alike 3.0",
              href: "https://creativecommons.org/licenses/by-sa/3.0/"
            } ]
          })
        }) ]
      });
    }
    function DbSummaryStatus(props) {
      const {t} = useLocale();
      if (props.dbState.updateState.type === "idle") 
      return jsxRuntime_module_u(IdleStateSummary, {
        dbState: props.dbState,
        onUpdateDb: props.onUpdateDb
      });
      if (props.dbState.updateState.type === "checking") 
      return jsxRuntime_module_u(DbSummaryContainer, {
        children: [ 
         jsxRuntime_module_u("div", {
          children: t("options_checking_for_updates")
        }), 
         jsxRuntime_module_u(CancelUpdateButton, {
          onClick: props.onCancelDbUpdate
        }) ]
      });
      const {dbState: {updateState: {series, totalProgress, version: {major, minor, patch}}}} = props;
      const versionString = `${major}.${minor}.${patch}`;
      const progressAsPercent = Math.round(totalProgress * 100);
      const dbLabel = t(localizedDataSeriesKey[series]);
      
      return jsxRuntime_module_u(DbSummaryContainer, {
        children: [ 
         jsxRuntime_module_u("div", {
          children: [ 
           jsxRuntime_module_u("progress", {
            class: "mb-2 block",
            max: 100,
            id: "update-progress",
            value: totalProgress * 100
          }), 
           jsxRuntime_module_u("label", {
            class: "block italic",
            for: "update-progress",
            children: t("options_downloading_data", [ dbLabel, versionString, String(progressAsPercent) ])
          }) ]
        }), 
         jsxRuntime_module_u(CancelUpdateButton, {
          onClick: props.onCancelDbUpdate
        }) ]
      });
    }
    const dbSummaryContainerProps = variantProps({
      base: "flex flex-wrap items-center gap-x-4 gap-y-2 [&>:first-child]:grow",
      variants: {
        errorClass: {
          none: "",
          warning: classes_classes("rounded-lg border border-solid px-4 py-2", // Light mode
          "border-yellow-800 bg-yellow-50 text-yellow-800", // Dark mode
          "dark:border-yellow-400/50 dark:bg-yellow-900/50 dark:text-yellow-50"),
          error: classes_classes("rounded-lg border border-solid px-4 py-2", // Light mode
          "border-red-900 bg-red-50 text-red-900", // Dark mode
          "dark:border-red-200/50 dark:bg-red-900/30 dark:text-red-50")
        }
      },
      defaultVariants: {
        errorClass: "none"
      }
    });
    function DbSummaryContainer(props) {
      
      return jsxRuntime_module_u("div", {
        ...dbSummaryContainerProps(props),
        children: props.children
      });
    }
    function IdleStateSummary(props) {
      const {t} = useLocale();
      const isUnavailable = allDataSeries.some((series => props.dbState[series].state === "unavailable"));
      const errorDetails = useErrorDetails(props.dbState);
      if (errorDetails) {
        const {class: errorClass, errorMessage, nextRetry} = errorDetails;
        
        return jsxRuntime_module_u(DbSummaryContainer, {
          errorClass,
          children: [ 
           jsxRuntime_module_u("div", {
            children: errorMessage
          }), nextRetry &&  jsxRuntime_module_u("div", {
            class: "grow self-start",
            children: t("options_db_update_next_retry", formatDate(nextRetry))
          }), 
           jsxRuntime_module_u(UpdateButton, {
            label: isUnavailable ? "retry" : "check",
            lastCheck: props.dbState.updateState.lastCheck,
            onClick: props.onUpdateDb
          }) ]
        });
      }
      
      return jsxRuntime_module_u(DbSummaryContainer, {
        children: [ 
         jsxRuntime_module_u("div", {
          class: "grid auto-cols-fr grid-flow-col grid-rows-[repeat(2,_auto)] gap-x-2 sm:gap-x-4",
          children: allMajorDataSeries.map((series => {
            const versionInfo = props.dbState[series].version;
            return versionInfo ?  jsxRuntime_module_u(DataSeriesVersion, {
              series,
              version: versionInfo
            }) : null;
          }))
        }), 
         jsxRuntime_module_u("div", {
          class: "mt-2",
          children:  jsxRuntime_module_u(UpdateButton, {
            label: isUnavailable ? "retry" : "check",
            lastCheck: props.dbState.updateState.lastCheck,
            onClick: props.onUpdateDb
          })
        }) ]
      });
    }
    function useErrorDetails(dbState) {
      const {t} = useLocale();
      const {updateError} = dbState;
      const quota = useStorageQuota(updateError?.name === "QuotaExceededError");
      // Offline errors
            if (updateError?.name === "OfflineError") return {
        class: "warning",
        errorMessage: t("options_offline_explanation")
      };
      // Quote exceeded errors have a special message.
            if (updateError?.name === "QuotaExceededError" && quota !== void 0) return {
        class: "error",
        errorMessage: t("options_db_update_quota_error", formatSize(quota)),
        nextRetry: updateError.nextRetry
      };
      // Generic update errors
            if (updateError && updateError?.name !== "AbortError") return {
        class: "error",
        errorMessage: t("options_db_update_error", updateError.message),
        nextRetry: updateError.nextRetry
      };
      // Check if we have any version info
            const hasVersionInfo = allMajorDataSeries.some((series => !!dbState[series].version));
      if (hasVersionInfo) return null;
      // Otherwise, return a suitable summary error
            const summaryStates = [ [ "init", "options_database_initializing" ], [ "unavailable", isFirefox() ? "options_database_unavailable_firefox" : "options_database_unavailable" ], [ "empty", "options_no_database" ] ];
      for (const [state, key] of summaryStates) if (allMajorDataSeries.some((series => dbState[series].state === state))) return {
        class: "error",
        errorMessage: t(key)
      };
      return null;
    }
    function useStorageQuota(enable) {
      const [quota, setQuota] = hooks_module_h(void 0);
      hooks_module_y((() => {
        if (!enable) {
          setQuota(void 0);
          return;
        }
        navigator.storage.estimate().then((({quota}) => {
          if (typeof quota !== "undefined") 
          // For Firefox, typically origins get a maximum of 20% of the global
          // limit. When we have unlimitedStorage permission, however, we can
          // use up to the full amount of the global limit. The storage API,
          // however, still returns 20% as the quota, so multiplying by 5 will
          // give the actual quota.
          if (isFirefox()) quota *= 5;
          setQuota(quota);
        })).catch((() => {}));
      }), [ enable ]);
      return quota;
    }
    function DataSeriesVersion(props) {
      const {t} = useLocale();
      const titleKeys = {
        kanji: "options_kanji_data_title",
        names: "options_name_data_title",
        words: "options_words_data_title"
      };
      const {major, minor, patch, lang} = props.version;
      const titleString = t(titleKeys[props.series], `${major}.${minor}.${patch} (${lang})`);
      const sourceNames = {
        kanji: "KANJIDIC",
        names: "JMnedict/ENAMDICT",
        words: "JMdict/EDICT"
      };
      const {databaseVersion, dateOfCreation} = props.version;
      const sourceName = sourceNames[props.series];
      let sourceString;
      if (databaseVersion && databaseVersion !== "n/a") sourceString = t("options_data_series_version_and_date", [ sourceName, databaseVersion, dateOfCreation ]); else sourceString = t("options_data_series_date_only", [ sourceName, dateOfCreation ]);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("div", {
          children: titleString
        }), 
         jsxRuntime_module_u("div", {
          class: "text-sm text-zinc-500 dark:text-zinc-400",
          children: sourceString
        }) ]
      });
    }
    function UpdateButton(props) {
      const {t} = useLocale();
      const buttonLabel = t(props.label === "retry" ? "options_update_retry_button_label" : "options_update_check_button_label");
      
      return jsxRuntime_module_u("div", {
        children: [ 
         jsxRuntime_module_u("button", {
          type: "button",
          onClick: props.onClick,
          children: buttonLabel
        }), props.lastCheck &&  jsxRuntime_module_u("div", {
          class: "mt-1.5 text-xs italic",
          children: t("options_last_database_check", formatDate(props.lastCheck))
        }) ]
      });
    }
    function CancelUpdateButton(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u("button", {
        type: "button",
        onClick: props.onClick,
        children: t("options_cancel_update_button_label")
      });
    }
    const updateDb = () => ({
      type: "updatedb"
    });
    const cancelDbUpdate = () => ({
      type: "cancelupdatedb"
    });
    const deleteDb = () => ({
      type: "deletedb"
    });
    // CONCATENATED MODULE: ./src/options/use-db.ts
    const initialDbstate = {
      words: {
        state: "init",
        version: null
      },
      kanji: {
        state: "init",
        version: null
      },
      radicals: {
        state: "init",
        version: null
      },
      names: {
        state: "init",
        version: null
      },
      updateState: {
        type: "idle",
        lastCheck: null
      }
    };
    function useDb() {
      const [dbState, setDbState] = hooks_module_h(initialDbstate);
      const browserPortRef = hooks_module_A(void 0);
      hooks_module_y((() => {
        let browserPort = browser_polyfill_default().runtime.connect(void 0, {
          name: "options"
        });
        browserPortRef.current = browserPort;
        const onMessage = event => {
          if (isDbStateUpdatedMessage(event)) {
            // For Runtime.Port.postMessage Chrome appears to serialize objects
            // using JSON serialization (not structured cloned). As a result, any
            // Date objects will be transformed into strings.
            // Ideally we'd introduce a new type for these deserialized objects that
            // converts `Date` to `Date | string` but that is likely to take a full
            // day of TypeScript wrestling so instead we just manually reach into
            // this object and convert the fields known to possibly contain dates
            // into dates.
            if (typeof event.state.updateState.lastCheck === "string") event.state.updateState.lastCheck = new Date(event.state.updateState.lastCheck);
            if (typeof event.state.updateError?.nextRetry === "string") event.state.updateError.nextRetry = new Date(event.state.updateError.nextRetry);
            setDbState(event.state);
          }
        };
        // It's possible this might be disconnected on iOS which doesn't seem to
        // keep inactive ports alive. I've observed this happening on Chrome too.
        
        // Note that according to the docs, this should not be called when _we_ call
        // disconnect():
        
        //  https://developer.chrome.com/docs/extensions/mv3/messaging/#port-lifetime
        
        // Nevertheless, we check that `browserPort` is not undefined before trying
        // to re-connect just in case some browsers behave differently here.
                const onDisconnect = port => {
          // Firefox annotates `port` with an `error` but Chrome does not.
          const error = is_object_isObject(port.error) && typeof port.error.message === "string" ? port.error.message : browser_polyfill_default().runtime.lastError;
          Bugsnag.leaveBreadcrumb(`Options page disconnected from background page${error ? `: ${error}` : ""}`);
          browserPortRef.current = void 0;
          // Wait a moment and try to reconnect
                    setTimeout((() => {
            try {
              // Check that browserPort is still set to _something_. If it is
              // undefined it probably means we are shutting down.
              if (!browserPort) {
                Bugsnag.leaveBreadcrumb("Not reconnecting to background page because we are probably shutting down");
                return;
              }
              browserPort = browser_polyfill_default().runtime.connect(void 0, {
                name: "options"
              });
              browserPortRef.current = browserPort;
              Bugsnag.leaveBreadcrumb("Options page reconnected to background page");
              browserPort.onMessage.addListener(onMessage);
              browserPort.onDisconnect.addListener(onDisconnect);
            } catch (e) {
              void Bugsnag.notify(e);
            }
          }), 700);
        };
        browserPort.onMessage.addListener(onMessage);
        browserPort.onDisconnect.addListener(onDisconnect);
        window.addEventListener("unload", (() => {
          browserPort?.disconnect();
          browserPortRef.current = void 0;
        }));
        return () => {
          browserPort?.disconnect();
          browserPortRef.current = void 0;
        };
      }), []);
      const startDatabaseUpdate = hooks_module_q((() => {
        browserPortRef.current?.postMessage(updateDb());
      }), []);
      const cancelDatabaseUpdate = hooks_module_q((() => {
        browserPortRef.current?.postMessage(cancelDbUpdate());
      }), []);
      const deleteDatabase = hooks_module_q((() => {
        browserPortRef.current?.postMessage(deleteDb());
      }), []);
      return {
        dbState,
        startDatabaseUpdate,
        cancelDatabaseUpdate,
        deleteDatabase
      };
    }
    function isDbStateUpdatedMessage(event) {
      return is_object_isObject(event) && typeof event.type === "string" && event.type === "dbstateupdated";
    }
    // CONCATENATED MODULE: ./src/options/DictionaryDataSettings.tsx
    function DictionaryDataSettings() {
      const {t} = useLocale();
      const {dbState, startDatabaseUpdate, cancelDatabaseUpdate, deleteDatabase} = useDb();
      const releaseStage = getReleaseStage();
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_dictionary_data_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(DbStatus, {
            dbState,
            devMode: releaseStage === "development",
            onCancelDbUpdate: cancelDatabaseUpdate,
            onDeleteDb: deleteDatabase,
            onUpdateDb: startDatabaseUpdate
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/DictionaryLanguageSettingsForm.tsx
    function DictionaryLanguageSettingsForm(props) {
      const {t} = useLocale();
      const onChange = hooks_module_q((event => {
        const value = event.currentTarget.value;
        if (!isDbLanguageId(value)) {
          const msg = `Got unexpected language code: ${value}`;
          console.error(msg);
          void Bugsnag.notify(new Error(msg));
          return;
        }
        props.onChangeDictLang(value);
      }), [ props.onChangeDictLang ]);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("select", {
          id: "lang",
          class: "w-40",
          name: "lang",
          onChange,
          children: dbLanguageMeta.map((([id, data]) => {
            let label = data.name;
            if (data.hasWords && !data.hasKanji) label += t("options_lang_words_only"); else if (!data.hasWords && data.hasKanji) label += t("options_lang_kanji_only");
            
            return jsxRuntime_module_u("option", {
              value: id,
              selected: id === props.dictLang,
              children: label
            }, id);
          }))
        }), 
         jsxRuntime_module_u("div", {
          class: classes_classes("mt-4 rounded-lg border border-solid px-4 py-2 leading-normal", "border-yellow-800 bg-yellow-50 text-yellow-800", "dark:border-yellow-400/50 dark:bg-yellow-900/50 dark:text-yellow-50"),
          children: [ 
           jsxRuntime_module_u("p", {
            children: t("options_lang_warning_please_note")
          }), 
           jsxRuntime_module_u("ul", {
            children: [ 
             jsxRuntime_module_u("li", {
              children: t("options_lang_warning_other_lang_when_available")
            }), 
             jsxRuntime_module_u("li", {
              children: t("options_lang_warning_always_en")
            }), 
             jsxRuntime_module_u("li", {
              children: t("options_lang_warning_names_en_only")
            }), 
             jsxRuntime_module_u("li", {
              children: t("options_lang_warning_change_lang_redownload")
            }), 
             jsxRuntime_module_u("li", {
              children: t("options_lang_warning_temporary_en_fallback")
            }) ]
          }) ]
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/DictionaryLanguageSettings.tsx
    function DictionaryLanguageSettings(props) {
      const {t} = useLocale();
      const dictLang = useConfigValue(props.config, "dictLang");
      const onChangeDictLang = hooks_module_q((value => {
        props.config.dictLang = value;
      }), [ props.config ]);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_dictionary_language_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(DictionaryLanguageSettingsForm, {
            dictLang,
            onChangeDictLang
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/IconRadio.tsx
    const IconRadio = compat_module_w(((props, ref) => {
      const id = hooks_module_g();
      
      return jsxRuntime_module_u("div", {
        children: [ 
         jsxRuntime_module_u("input", {
          ref,
          id,
          type: "radio",
          class: "peer sr-only",
          ...props,
          children: void 0
        }), 
         jsxRuntime_module_u("label", {
          class: classes_classes("peer-focus-visible:outline-auto group cursor-pointer rounded-md border border-solid", "text-center transition duration-300", !props.checked && "opacity-50 grayscale hover:opacity-100 hover:grayscale-0 active:opacity-100 active:grayscale-0", props.label ? "flex flex-col items-center overflow-hidden rounded-md border-zinc-500 bg-white dark:border-zinc-100/20 dark:bg-zinc-900" : "border-transparent"),
          for: id,
          children: [ 
           jsxRuntime_module_u("div", {
            class: props.label ? "w-full bg-zinc-100 group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700" : "",
            children: props.children
          }), !!props.label &&  jsxRuntime_module_u("div", {
            class: "flex w-full items-center gap-1.5 border-0 border-t border-solid border-t-zinc-500 px-2 py-1.5 dark:border-t-zinc-100/20",
            children: [ 
             jsxRuntime_module_u(Radio, {
              checked: props.checked
            }), props.label ]
          }) ]
        }) ]
      });
    }));
    function Radio(props) {
      
      return jsxRuntime_module_u("span", {
        class: classes_classes("inline-block size-4 rounded-full border border-solid border-zinc-500 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-700", props.checked ? "border-blue-700 bg-white shadow-[inset_0_0_0_2.5px_theme(colors.blue.500)] dark:bg-zinc-900" : "group-hover:bg-zinc-200 dark:group-hover:bg-zinc-600")
      });
    }
    // CONCATENATED MODULE: ./src/options/HighlightStyleRadio.tsx
    function HighlightStyleRadio(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u("div", {
        class: "grid w-max grid-cols-3 gap-2",
        children: [ 
         jsxRuntime_module_u(IconRadio, {
          checked: props.value === "none",
          label: t("options_highlight_style_none"),
          name: "highlightStyle",
          onChange: () => props.onChange("none"),
          value: "none",
          children:  jsxRuntime_module_u(HighlightPreview, {})
        }), 
         jsxRuntime_module_u(IconRadio, {
          checked: props.value === "yellow",
          label: t("options_highlight_style_yellow"),
          name: "highlightStyle",
          onChange: () => props.onChange("yellow"),
          value: "yellow",
          children:  jsxRuntime_module_u(HighlightPreview, {
            rangeClass: "bg-yellow-300 text-black"
          })
        }), 
         jsxRuntime_module_u(IconRadio, {
          checked: props.value === "blue",
          label: t("options_highlight_style_blue"),
          name: "highlightStyle",
          onChange: () => props.onChange("blue"),
          value: "blue",
          children:  jsxRuntime_module_u(HighlightPreview, {
            rangeClass: "bg-blue-600 text-white"
          })
        }) ]
      });
    }
    function HighlightPreview(props) {
      
      return jsxRuntime_module_u("div", {
        class: "flex items-center justify-center px-2 py-4 text-[15px] min-[300px]:text-[20px] min-[400px]:min-h-[calc(48px+16px*2)] min-[400px]:min-w-[calc(48px+32px*2)] min-[400px]:text-[25px]",
        children:  jsxRuntime_module_u("span", {
          class: "fade-ends-x",
          children: [ "\u306b", 
           jsxRuntime_module_u("span", {
            class: props.rangeClass,
            children: "\u70b9\u3005"
          }), "\u3068" ]
        })
      });
    }
    // CONCATENATED MODULE: ./src/options/ToolbarIconRadio.tsx
    function ToolbarIconRadio(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u("div", {
        class: "grid w-max grid-cols-2 gap-2",
        children: [ 
         jsxRuntime_module_u(IconRadio, {
          checked: props.value === "default",
          label: t("options_toolbar_icon_classic_label"),
          name: "toolbarIcon",
          onChange: () => props.onChange("default"),
          value: "default",
          children:  jsxRuntime_module_u(IconPreview, {
            alt: t("options_toolbar_icon_default_alt"),
            checked: props.value === "default",
            src: "/images/10ten.svg"
          })
        }), 
         jsxRuntime_module_u(IconRadio, {
          checked: props.value === "sky",
          label: t("options_toolbar_icon_kanji_label"),
          name: "toolbarIcon",
          onChange: () => props.onChange("sky"),
          value: "sky",
          children:  jsxRuntime_module_u(IconPreview, {
            alt: t("options_toolbar_icon_sky_alt"),
            checked: props.value === "sky",
            src: "/images/10ten-sky.svg"
          })
        }) ]
      });
    }
    function IconPreview(props) {
      
      return jsxRuntime_module_u("div", {
        class: "align-center px-[32px] py-[16px]",
        children:  jsxRuntime_module_u("img", {
          class: classes_classes("h-[48px] w-[48px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.25)]", props.checked && "dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]"),
          src: props.src,
          alt: props.alt
        })
      });
    }
    // CONCATENATED MODULE: ./src/options/GeneralSettingsForm.tsx
    function GeneralSettingsForm(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u("div", {
        class: "flex flex-col gap-3",
        children: [ 
         jsxRuntime_module_u("p", {
          class: "m-0",
          children: t("options_toolbar_icon_label")
        }), 
         jsxRuntime_module_u(ToolbarIconRadio, {
          value: props.toolbarIcon,
          onChange: props.onChangeToolbarIcon
        }), props.supportsCssHighlight &&  jsxRuntime_module_u(preact_module_b, {
          children: [ 
           jsxRuntime_module_u("p", {
            class: "m-0",
            children: t("options_highlight_style_label")
          }), 
           jsxRuntime_module_u(HighlightStyleRadio, {
            value: props.highlightStyle,
            onChange: props.onChangeHighlightStyle
          }) ]
        }), 
         jsxRuntime_module_u("div", {}), !props.supportsCssHighlight &&  jsxRuntime_module_u(CheckboxRow, {
          children: [ 
           jsxRuntime_module_u("input", {
            id: "highlightText",
            name: "highlightText",
            type: "checkbox",
            checked: props.highlightStyle !== "none",
            onChange: e => props.onChangeHighlightStyle(e.currentTarget.checked ? "yellow" : "none")
          }), 
           jsxRuntime_module_u("label", {
            for: "highlightText",
            children: t("options_highlight_matched_text")
          }) ]
        }), 
         jsxRuntime_module_u(CheckboxRow, {
          children: [ 
           jsxRuntime_module_u("input", {
            id: "contextMenuEnable",
            name: "contextMenuEnable",
            type: "checkbox",
            checked: props.contextMenuEnable,
            onChange: e => props.onChangeContextMenuEnable(e.currentTarget.checked)
          }), 
           jsxRuntime_module_u("label", {
            for: "contextMenuEnable",
            children: t("options_show_context_menu_item")
          }) ]
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/GeneralSettings.tsx
    function GeneralSettings(props) {
      const {t} = useLocale();
      const toolbarIcon = useConfigValue(props.config, "toolbarIcon");
      const onChangeToolbarIcon = hooks_module_q((value => {
        props.config.toolbarIcon = value;
      }), [ props.config ]);
      const noTextHighlight = useConfigValue(props.config, "noTextHighlight");
      const rawHighlightStyle = useConfigValue(props.config, "highlightStyle");
      const highlightStyle = noTextHighlight ? "none" : rawHighlightStyle;
      const onChangeHighlightStyle = hooks_module_q((value => {
        if (value === "none") props.config.noTextHighlight = true; else {
          props.config.highlightStyle = value;
          props.config.noTextHighlight = false;
        }
      }), [ props.config ]);
      const contextMenuEnable = useConfigValue(props.config, "contextMenuEnable");
      const onChangeContextMenuEnable = hooks_module_q((value => {
        props.config.contextMenuEnable = value;
      }), [ props.config ]);
      const [supportsCssHighlight] = hooks_module_h(CSS.supports("selector(::highlight(yer))"));
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_general_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(GeneralSettingsForm, {
            contextMenuEnable,
            highlightStyle,
            onChangeContextMenuEnable,
            onChangeHighlightStyle,
            onChangeToolbarIcon,
            supportsCssHighlight,
            toolbarIcon
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/KanjiReferenceSettingsForm.tsx
    function KanjiReferenceSettingsForm(props) {
      const {t} = useLocale();
      const lang = t("lang_tag");
      const references = hooks_module_T((() => [ {
        ref: "kanjiComponents",
        full: t("options_kanji_components")
      }, ...getReferenceLabelsForLang(props.dictLang, t) ]), [ props.dictLang, lang ]);
      const enabledReferences = hooks_module_T((() => new Set(props.enabledReferences)), [ props.enabledReferences ]);
      // We want to match the arrangement of references when they are displayed,
      // that is, in a vertically flowing grid. See comments where we generate the
      // popup styles for more explanation.
            const gridTemplateRows = `repeat(${Math.ceil(references.length / 2)}, minmax(min-content, max-content))`;
      
      return jsxRuntime_module_u("div", {
        class: "grid w-[95%] grid-cols-[minmax(250px,1fr)] gap-x-4 gap-y-3 sm:grid-flow-col sm:grid-cols-[repeat(2,minmax(250px,1fr))]",
        style: {
          gridTemplateRows
        },
        children: references.map((({ref, full}) =>  jsxRuntime_module_u(CheckboxRow, {
          children: [ 
           jsxRuntime_module_u("input", {
            type: "checkbox",
            id: `ref-${ref}`,
            name: ref,
            checked: ref === "kanjiComponents" ? props.showKanjiComponents : enabledReferences.has(ref),
            onClick: event => {
              const value = event.currentTarget.checked;
              if (ref === "kanjiComponents") props.onToggleKanjiComponents(value); else props.onToggleReference(ref, value);
            }
          }), 
           jsxRuntime_module_u("label", {
            class: "cursor-pointer select-none",
            for: `ref-${ref}`,
            children: full
          }) ]
        }, ref)))
      });
    }
    // CONCATENATED MODULE: ./src/options/KanjiReferenceSettings.tsx
    function KanjiReferenceSettings(props) {
      const {t} = useLocale();
      const dictLang = useConfigValue(props.config, "dictLang");
      const enabledReferences = useConfigValue(props.config, "kanjiReferences");
      const showKanjiComponents = useConfigValue(props.config, "showKanjiComponents");
      const onToggleReference = hooks_module_q(((ref, value) => {
        props.config.updateKanjiReferences({
          [ref]: value
        });
      }), [ props.config ]);
      const onToggleKanjiComponents = hooks_module_q((value => {
        props.config.showKanjiComponents = value;
      }), [ props.config ]);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_kanji_dictionary_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(KanjiReferenceSettingsForm, {
            dictLang,
            enabledReferences,
            showKanjiComponents,
            onToggleReference,
            onToggleKanjiComponents
          })
        }) ]
      });
    }
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
    const CopyNextKeyStrings = {
      optionsString: "options_popup_copy_next",
      popupString: "content_copy_keys_next_label"
    };
    // CONCATENATED MODULE: ./src/options/KeyBox.tsx
    function KeyBox(props) {
      
      return jsxRuntime_module_u("kbd", {
        class: classes_classes("font-inherit my-0.5 inline-flex h-9 min-w-[2.5em] p-2 text-sm", "flex-col items-center justify-center", "rounded-lg border border-solid border-zinc-400 bg-white dark:bg-zinc-800", "border-b-[3px] border-b-zinc-500"),
        children: translateKey(props.label, !!props.isMac)
      });
    }
    function translateKey(key, isMac) {
      if (!isMac) return key;
      switch (key) {
       case "Command":
        return "\u2318";

       case "Ctrl":
        return "Control";

       case "Alt":
        return "\u2325";

       default:
        return key;
      }
    }
    const KeyCheckbox = compat_module_w(((props, ref) => {
      const id = hooks_module_g();
      // If we use align-items: normal etc. the checkboxes line up with the label
      // text nicely but we want to use align-items: baseline (`items-baseline`) so
      // that we can line up any descriptive text with the checkbox labels (i.e.
      // make this flexbox container into a container that "participates in baseline
      // alignment" (https://drafts.csswg.org/css-flexbox-1/#baseline-participation).
      
      // Doing that, however, pushes the checkboxes up a bit so they no longer
      // appear vertically centered with the label text. To fix that we nudge the
      // checkboxes down a bit with `translate-y-0.5` which seems to do the trick in
      // at least Firefox and Chrome.
            
      return jsxRuntime_module_u("div", {
        class: "flex items-baseline gap-1",
        children: [ 
         jsxRuntime_module_u("input", {
          class: "translate-y-0.5 [&:disabled+label]:opacity-50 [&:not(:checked)+label]:opacity-50",
          id: props.id || id,
          type: "checkbox",
          ref,
          ...props
        }), 
         jsxRuntime_module_u("label", {
          for: props.id || id,
          children: props.children
        }) ]
      });
    }));
    const KeyInput = compat_module_w(((props, ref) =>  jsxRuntime_module_u("input", {
      class: classes_classes("transparent-caret font-inherit my-0.5 h-9 w-20 p-2 text-center text-sm", "rounded-lg border border-solid border-zinc-400 bg-white dark:bg-zinc-800", "border-b-[3px] border-b-zinc-500 disabled:opacity-50"),
      ref,
      ...props
    })));
    // CONCATENATED MODULE: ./src/options/PopupKeysForm.tsx
    const newKeys = [ "expandPopup" ];
    function PopupKeysForm(props) {
      const hasClipboardApi = navigator.clipboard && typeof navigator.clipboard.writeText === "function";
      
      return jsxRuntime_module_u("div", {
        class: "grid-cols-keys grid items-baseline gap-x-8 gap-y-2",
        children: PopupKeys.filter((key => key.name !== "startCopy" || hasClipboardApi)).map((key =>  jsxRuntime_module_u(PopupKey, {
          isMac: props.isMac,
          keys: key.keys,
          l10nKey: key.l10nKey,
          name: key.name,
          onUpdate: props.onUpdateKey,
          value: props.keys[key.name]
        }, key.name)))
      });
    }
    function PopupKey(props) {
      const {t} = useLocale();
      const keysRef = hooks_module_A(null);
      const onClick = () => {
        const checkboxes = [ ...keysRef.current?.querySelectorAll("input[type=checkbox]") || [] ];
        const value = checkboxes.filter((checkbox => checkbox.checked)).map((checkbox => checkbox.value));
        props.onUpdate(props.name, value);
      };
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("div", {
          class: "flex flex-wrap items-baseline gap-x-2",
          ref: keysRef,
          children: props.keys.map(((key, i) => {
            const checked = props.value.includes(key);
            const priorEnabled = props.keys.slice(0, i).some((key => props.value.includes(key)));
            const orEnabled = checked && priorEnabled;
            
            return jsxRuntime_module_u(preact_module_b, {
              children: [ i > 0 &&  jsxRuntime_module_u("span", {
                class: classes_classes("italic", !orEnabled && "opacity-50"),
                children: t("options_key_alternative")
              }), 
               jsxRuntime_module_u(KeyCheckbox, {
                checked,
                onClick,
                value: key,
                children: props.name === "movePopupDownOrUp" ? (() => {
                  const [down, up] = key.split(",", 2);
                  
                  return jsxRuntime_module_u(preact_module_b, {
                    children: [ 
                     jsxRuntime_module_u(KeyBox, {
                      label: down
                    }), 
                     jsxRuntime_module_u("span", {
                      class: "mx-2",
                      children: "/"
                    }), 
                     jsxRuntime_module_u(KeyBox, {
                      label: up
                    }) ]
                  });
                })() :  jsxRuntime_module_u(KeyBox, {
                  label: key,
                  isMac: props.isMac
                })
              }) ]
            });
          }))
        }), 
         jsxRuntime_module_u("div", {
          children: [ t(props.l10nKey), newKeys.includes(props.name) &&  jsxRuntime_module_u(NewBadge, {
            expiry: new Date("2023-10-10")
          }), props.name === "startCopy" &&  jsxRuntime_module_u("ul", {
            class: "m-0 mt-4 flex list-none flex-col gap-2 p-0",
            children: [ ...CopyKeys, {
              key: props.keys[0],
              optionsString: CopyNextKeyStrings.optionsString
            } ].map((({key, optionsString}) =>  jsxRuntime_module_u("li", {
              class: "flex list-none items-baseline gap-3",
              children: [ 
               jsxRuntime_module_u(KeyBox, {
                label: key
              }), t(optionsString) ]
            }, key)))
          }) ]
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/ShowPopupKeysForm.tsx
    function ShowPopupKeysForm(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u("fieldset", {
        class: "border border-solid border-zinc-300 px-6 py-3 dark:border-zinc-500",
        children: [ 
         jsxRuntime_module_u("p", {
          class: "my-3 italic leading-6",
          children: t("options_show_popup_explanation")
        }), 
         jsxRuntime_module_u("div", {
          class: "grid auto-cols-max items-center gap-x-8",
          children: [ 
           jsxRuntime_module_u("div", {
            class: "col-span-2",
            children: t("options_show_popup_text_subheading")
          }), 
           jsxRuntime_module_u(KeyCheckboxes, {
            isMac: props.isMac,
            value: props.holdToShowKeys,
            onChange: props.onChangeHoldToShowKeys
          }), 
           jsxRuntime_module_u("div", {
            children:  jsxRuntime_module_u("svg", {
              viewBox: "0 0 120 90",
              class: "w-24 text-zinc-400 dark:text-zinc-300",
              children:  jsxRuntime_module_u("use", {
                href: "#text-with-cursor"
              })
            })
          }), 
           jsxRuntime_module_u("div", {
            class: "col-span-2",
            children: t("options_show_popup_images_subheading")
          }), 
           jsxRuntime_module_u(KeyCheckboxes, {
            isMac: props.isMac,
            value: props.holdToShowImageKeys,
            onChange: props.onChangeHoldToShowImageKeys
          }), 
           jsxRuntime_module_u("div", {
            children:  jsxRuntime_module_u("svg", {
              viewBox: "0 0 120 90",
              class: "w-24 text-zinc-400 dark:text-zinc-300",
              children:  jsxRuntime_module_u("use", {
                href: "#image-with-cursor"
              })
            })
          }) ]
        }) ]
      });
    }
    function KeyCheckboxes(props) {
      const altRef = hooks_module_A(null);
      const ctrlRef = hooks_module_A(null);
      const onChange = () => {
        props.onChange({
          alt: altRef.current?.checked ?? false,
          ctrl: ctrlRef.current?.checked ?? false
        });
      };
      
      return jsxRuntime_module_u("div", {
        class: "flex items-baseline gap-2",
        children: [ 
         jsxRuntime_module_u(KeyCheckbox, {
          checked: props.value.alt,
          onClick: onChange,
          ref: altRef,
          children:  jsxRuntime_module_u(KeyBox, {
            label: "Alt",
            isMac: props.isMac
          })
        }), 
         jsxRuntime_module_u("span", {
          class: !props.value.alt || !props.value.ctrl ? "opacity-50" : "",
          children: "+"
        }), 
         jsxRuntime_module_u(KeyCheckbox, {
          checked: props.value.ctrl,
          onClick: onChange,
          ref: ctrlRef,
          children:  jsxRuntime_module_u(KeyBox, {
            label: "Ctrl",
            isMac: props.isMac
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/commands.ts
    function _check_private_redeclaration(obj, privateCollection) {
      if (privateCollection.has(obj)) throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
    function _class_apply_descriptor_get(receiver, descriptor) {
      if (descriptor.get) return descriptor.get.call(receiver);
      return descriptor.value;
    }
    function _class_apply_descriptor_set(receiver, descriptor, value) {
      if (descriptor.set) descriptor.set.call(receiver, value); else {
        if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
        descriptor.value = value;
      }
    }
    function _class_extract_field_descriptor(receiver, privateMap, action) {
      if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
      return privateMap.get(receiver);
    }
    function _class_private_field_get(receiver, privateMap) {
      var descriptor = _class_extract_field_descriptor(receiver, privateMap, "get");
      return _class_apply_descriptor_get(receiver, descriptor);
    }
    function _class_private_field_init(obj, privateMap, value) {
      _check_private_redeclaration(obj, privateMap);
      privateMap.set(obj, value);
    }
    function _class_private_field_set(receiver, privateMap, value) {
      var descriptor = _class_extract_field_descriptor(receiver, privateMap, "set");
      _class_apply_descriptor_set(receiver, descriptor, value);
      return value;
    }
    function commands_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    const PRIMARY_MODIFIERS = [ "Ctrl", "Alt", "MacCtrl" ];
    const SECONDARY_MODIFIERS = [ ...PRIMARY_MODIFIERS, "Shift" ];
    // Conversion from various input formats to standard modifier syntax.
    
    // We use lowercase for the inputs to make it easier to do a case-insensitive
    // comparison with input from the user since at least Edge in some locales seems
    // to uppercase modifiers.
        const MODIFIER_MAP = {
      ctrl: "Ctrl",
      command: "Ctrl",
      "\u2318": "Ctrl",
      strg: "Ctrl",
      alt: "Alt",
      "\u2325": "Alt",
      alternatif: "Alt",
      macctrl: "MacCtrl",
      "\u2303": "MacCtrl",
      shift: "Shift",
      "\u21e7": "Shift"
    };
    const MEDIA_KEYS = [ "MediaNextTrack", "MediaPlayPause", "MediaPrevTrack", "MediaStop" ];
    class CommandError extends Error {
      constructor(code, substitutions, ...params) {
        super(...params), // This is just an l10n key
        commands_define_property(this, "code", void 0), // And these are substitutions
        commands_define_property(this, "substitutions", void 0);
        Object.setPrototypeOf(this, CommandError.prototype);
        if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, CommandError);
        this.name = "CommandError";
        this.code = code;
        this.substitutions = substitutions;
      }
    }
    var _modifier =  new WeakMap, _secondaryModifier =  new WeakMap, commands_key =  new WeakMap;
    class Command {
      static fromString(value) {
        value = value.trim();
        if (MEDIA_KEYS.includes(value)) return new Command(value);
        // Normally keys take the form Alt+Ctrl+R etc. but Chrome on Mac represents
        // the different modifiers as ⌥⇧⌃⌘.
                const parts = value.split(/([\u2325\u21e7\u2303\u2318])|\+/).filter(Boolean).map((key => key.trim())).map((key => MODIFIER_MAP[key.toLowerCase()] || key));
        // Validate we have a suitable number of components.
                if (!parts.length || parts.length > 3) throw new CommandError("error_command_could_not_parse", value);
        // The last part is the key
                let key = parts.pop();
        if (!key?.length) throw new CommandError("error_command_has_no_key");
        // Single character keys should be uppercase
                if (key.length === 1) key = key.toUpperCase();
        // We need at least one modifier unless the key is a function key
                if (!isFunctionKey(key) && !parts.length) throw new CommandError("error_command_is_missing_modifier_key");
        // Swap the primary and secondary modifiers if necessary
        
        // We've seen this on Chrome which can produce ⇧⌘K
                let [primary, secondary] = parts;
        if (primary && !isPrimaryModifier(primary) && secondary && isPrimaryModifier(secondary)) [primary, secondary] = [ secondary, primary ];
        // Now validate our modifiers
                let modifier;
        if (primary) {
          if (!isPrimaryModifier(primary)) throw new CommandError("error_command_disallowed_modifier_key", primary);
          modifier = primary;
        }
        let secondaryModifier;
        if (secondary) {
          if (!isSecondaryModifier(secondary)) throw new CommandError("error_command_disallowed_modifier_key", secondary);
          secondaryModifier = secondary;
        }
        // There are a few other checks we _could_ do such as:
        
        // - Checking that we don't have BOTH Ctrl and Command (since Ctrl maps to
        //   Command on Macs and Command doesn't exist on other platforms).
        // - Checking that we don't use MacCtrl or Command on non-Mac platforms.
        
        // However, since we no longer sync toggle keys, they can only be set by
        // our UI or the browser UI, presumably both of which ensure the key is
        // valid for the above cases.
                return new Command(key, modifier, secondaryModifier);
      }
      static fromParams(params) {
        if (MEDIA_KEYS.includes(params.key)) {
          if (params.alt || params.ctrl || params.shift) throw new CommandError("error_command_media_key_with_modifier_key");
          return new Command(params.key);
        }
        let key = params.key.trim();
        if (key.length === 1) key = key.toUpperCase();
        if (!key.length) throw new CommandError("error_command_has_no_key");
        if (!isFunctionKey(key) && !(params.alt || params.ctrl || params.macCtrl)) throw new CommandError("error_command_is_missing_modifier_key");
        // Function key + Shift only is not allowed
                if (isFunctionKey(key) && params.shift && !(params.alt || params.ctrl || params.macCtrl)) throw new CommandError("error_command_disallowed_modifier_key", "Shift");
        const modifierCount = [ params.alt ? 1 : 0, params.shift ? 1 : 0, params.ctrl ? 1 : 0, params.macCtrl ? 1 : 0 ].reduce(((value, currentValue) => currentValue + value));
        if (modifierCount > 2) throw new CommandError("error_command_too_many_modifiers");
        let modifier;
        if (params.alt) modifier = "Alt"; else if (params.ctrl) modifier = "Ctrl"; else if (params.macCtrl) modifier = "MacCtrl";
        let secondaryModifier;
        if (modifier) if (params.ctrl && modifier !== "Ctrl") secondaryModifier = "Ctrl"; else if (params.macCtrl && modifier !== "MacCtrl") secondaryModifier = "MacCtrl"; else if (params.shift) secondaryModifier = "Shift";
        return new Command(key, modifier, secondaryModifier);
      }
      isValid() {
        return isValidKey(_class_private_field_get(this, commands_key));
      }
      // This should be taken to mean "Command" when on Mac
      get ctrl() {
        return _class_private_field_get(this, _modifier) === "Ctrl" || _class_private_field_get(this, _secondaryModifier) === "Ctrl";
      }
      get alt() {
        return _class_private_field_get(this, _modifier) === "Alt" || _class_private_field_get(this, _secondaryModifier) === "Alt";
      }
      get shift() {
        return _class_private_field_get(this, _secondaryModifier) === "Shift";
      }
      get macCtrl() {
        return _class_private_field_get(this, _modifier) === "MacCtrl" || _class_private_field_get(this, _secondaryModifier) === "MacCtrl";
      }
      get key() {
        return _class_private_field_get(this, commands_key);
      }
      toString() {
        const parts = [];
        if (_class_private_field_get(this, _modifier)) parts.push(_class_private_field_get(this, _modifier));
        if (_class_private_field_get(this, _secondaryModifier)) parts.push(_class_private_field_get(this, _secondaryModifier));
        parts.push(_class_private_field_get(this, commands_key));
        return parts.join("+");
      }
      constructor(key, modifier, secondaryModifier) {
        _class_private_field_init(this, _modifier, {
          writable: true,
          value: void 0
        });
        _class_private_field_init(this, _secondaryModifier, {
          writable: true,
          value: void 0
        });
        _class_private_field_init(this, commands_key, {
          writable: true,
          value: void 0
        });
        _class_private_field_set(this, commands_key, key);
        _class_private_field_set(this, _modifier, modifier);
        _class_private_field_set(this, _secondaryModifier, secondaryModifier);
      }
    }
    function isPrimaryModifier(key) {
      return PRIMARY_MODIFIERS.includes(key);
    }
    function isSecondaryModifier(key) {
      return SECONDARY_MODIFIERS.includes(key);
    }
    const isFunctionKey = key => /^F([1-9]|(1[0-2]))$/.test(key);
    const SPECIAL_KEYS = [ "Comma", "Period", "Home", "End", "PageUp", "PageDown", "Space", "Insert", "Delete", "Up", "Down", "Left", "Right" ];
    const isValidKey = key => /^[A-Z0-9]$/.test(key) || isFunctionKey(key) || SPECIAL_KEYS.includes(key);
    // CONCATENATED MODULE: ./src/options/ToggleKeyForm.tsx
    const ResetShortcut = Symbol("reset");
    function ToggleKeyForm(props) {
      const {t} = useLocale();
      const [toggleKeyError, setToggleKeyError] = hooks_module_h(void 0);
      const altKeyRef = hooks_module_A(null);
      const macCtrlKeyRef = hooks_module_A(null);
      const ctrlKeyRef = hooks_module_A(null);
      const shiftKeyRef = hooks_module_A(null);
      const keyRef = hooks_module_A(null);
      // Track the form state separately to the input toggle key because we want to
      // allow the form state to be invalid (e.g. the user might clear one modifier
      // before setting another meaning that the state is temporarily invalid).
            const [formState, setFormState] = hooks_module_h({
        alt: !!props?.toggleKey?.alt,
        macCtrl: !!props?.toggleKey?.macCtrl,
        ctrl: !!props?.toggleKey?.ctrl,
        shift: !!props?.toggleKey?.shift,
        key: props.toggleKey?.key || ""
      });
      const isEmpty = !formState.alt && !formState.macCtrl && !formState.ctrl && !formState.shift && !formState.key.length;
      // Any time the input toggle key changes, however, we should reset the form
      // state to match and clear any error.
            hooks_module_y((() => {
        setFormState({
          alt: !!props?.toggleKey?.alt,
          macCtrl: !!props?.toggleKey?.macCtrl,
          ctrl: !!props?.toggleKey?.ctrl,
          shift: !!props?.toggleKey?.shift,
          key: props.toggleKey?.key || ""
        });
        setToggleKeyError(void 0);
      }), [ props.toggleKey ]);
      const onToggleKeyChange = () => {
        const params = {
          alt: altKeyRef.current?.checked,
          ctrl: ctrlKeyRef.current?.checked,
          macCtrl: macCtrlKeyRef.current?.checked,
          shift: shiftKeyRef.current?.checked,
          key: keyRef.current?.value || ""
        };
        setFormState(params);
        try {
          const command = Command.fromParams(params);
          if (!command.isValid()) {
            setToggleKeyError(t("error_command_key_is_not_allowed", command.key));
            return;
          }
          props.onChangeToggleKey(command);
          setToggleKeyError(void 0);
        } catch (e) {
          setToggleKeyError(e instanceof CommandError ? t(e.code, e.substitutions) : e.message || String(e));
        }
      };
      const onToggleKeyDown = e => {
        let key = e.key;
        // Translate single letter keys to uppercase.
                if (e.key.length === 1) key = key.toUpperCase();
        // For keys like , or . we want to use event.code instead.
                key = isValidKey(e.code) ? e.code : key;
        // For the arrow keys we need to translate ArrowLeft to Left etc.
                if (key.startsWith("Arrow")) key = key.slice("Arrow".length);
        if (!isValidKey(key)) {
          // Most printable keys are one character in length so make sure we don't
          // allow the default action of adding them to the text input. For other
          // keys we don't handle though (e.g. Tab) we probably want to allow the
          // default action (except Backspace).
          if (e.key.length === 1 || e.key === "Backspace") e.preventDefault();
          return;
        }
        e.currentTarget.value = key;
        e.preventDefault();
        onToggleKeyChange();
      };
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("div", {
          class: "flex flex-row-reverse flex-wrap items-center justify-end gap-x-6 gap-y-2",
          children: [ 
           jsxRuntime_module_u("div", {
            class: "flex grow flex-wrap gap-x-6",
            children: [ 
             jsxRuntime_module_u("div", {
              class: "w-min grow",
              children: [ t("command_toggle_description"), !!toggleKeyError?.length &&  jsxRuntime_module_u("div", {
                class: "bg-warning-red ml-2 inline-block size-6 bg-cover bg-no-repeat align-top",
                id: "toggle-key-icon",
                title: toggleKeyError
              }) ]
            }), !props.disabled &&  jsxRuntime_module_u("div", {
              children:  jsxRuntime_module_u("button", {
                class: "cursor-pointer appearance-none rounded-md border-none bg-transparent p-0.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-300",
                disabled: !!props.disabled,
                title: isEmpty ? t("options_restore_toggle_shortcut") : t("options_disable_toggle_shortcut"),
                type: "button",
                onClick: () => {
                  props.onChangeToggleKey(isEmpty ? ResetShortcut : void 0);
                  setToggleKeyError(void 0);
                },
                children: isEmpty ?  jsxRuntime_module_u("svg", {
                  class: "block size-5 fill-current",
                  viewBox: "0 0 16 16",
                  children: [ 
                   jsxRuntime_module_u("path", {
                    d: "M8.54,2.11l.66-.65A.78.78,0,0,0,9.2.38a.76.76,0,0,0-1.08,0L6.19,2.31A.81.81,0,0,0,6,2.55a.8.8,0,0,0-.06.3A.72.72,0,0,0,6,3.14a.74.74,0,0,0,.17.25L8.12,5.32a.73.73,0,0,0,.54.22.76.76,0,0,0,.54-.22.78.78,0,0,0,0-1.08l-.58-.58A4.38,4.38,0,1,1,3.68,8.82a.76.76,0,0,0-1.5.28,5.92,5.92,0,1,0,6.36-7Z"
                  }), 
                   jsxRuntime_module_u("circle", {
                    cx: 2.673,
                    cy: 6.71,
                    r: 0.965
                  }) ]
                }) :  jsxRuntime_module_u("svg", {
                  class: "block size-5",
                  viewBox: "0 0 24 24",
                  children:  jsxRuntime_module_u("path", {
                    d: "M6 18L18 6M6 6l12 12",
                    stroke: "currentColor",
                    strokeWidth: 3,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })
              })
            }) ]
          }), 
           jsxRuntime_module_u("div", {
            class: "flex flex-wrap gap-2",
            children: [ 
             jsxRuntime_module_u(KeyCheckbox, {
              checked: formState.alt,
              disabled: !!props.disabled,
              onClick: onToggleKeyChange,
              ref: altKeyRef,
              children: [ 
               jsxRuntime_module_u(KeyBox, {
                label: "Alt",
                isMac: props.isMac
              }), 
               jsxRuntime_module_u("span", {
                class: "ml-2",
                children: "+"
              }) ]
            }), props.isMac &&  jsxRuntime_module_u(KeyCheckbox, {
              checked: formState.macCtrl,
              disabled: !!props.disabled,
              onClick: onToggleKeyChange,
              ref: macCtrlKeyRef,
              children: [ 
               jsxRuntime_module_u(KeyBox, {
                label: "Ctrl",
                isMac: props.isMac
              }), 
               jsxRuntime_module_u("span", {
                class: "ml-2",
                children: "+"
              }) ]
            }), 
             jsxRuntime_module_u(KeyCheckbox, {
              checked: formState.ctrl,
              disabled: !!props.disabled,
              onClick: onToggleKeyChange,
              ref: ctrlKeyRef,
              children: [ 
               jsxRuntime_module_u(KeyBox, {
                // A few notes about modifier keys on Mac
                // In DOM, `ctrlKey` corresponds to "Control" on Mac (and "Ctrl"
                // on PC).
                // `metaKey` represents the "Command" (⌘) key.
                // Ref: https://w3c.github.io/uievents/#dom-keyboardevent-ctrlkey
                // In Web extension command shortcuts, "Ctrl" is mapped to
                // "Command".
                // `macCtrl` is used for "Control".
                // Ref: https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands#key_combinations
                // This deviation probably makes sense in the context of
                // specifying a cross-platform keyboard shortcut because if your
                // shortcut is Ctrl+R on Windows it would most naturally be ⌘+R
                // on Mac.
                // Now, for the shortcut keys _we_ handle (i.e. the popup shortcut
                // keys) we use DOM conventions. That is, we pass "Ctrl" to the
                // content script and have it check if `ctrlKey` is true.
                // As a result, when we describe these keys to the user, they
                // should show "Control", and that's what KeyBox does when it sees
                // a label of "Ctrl".
                // However, for the special case of the toggle key, the "Ctrl" we
                // get from the manifest/browser etc. should be shown as "Command".
                label: props.isMac ? "Command" : "Ctrl",
                isMac: props.isMac
              }), 
               jsxRuntime_module_u("span", {
                class: "ml-2",
                children: "+"
              }) ]
            }), 
             jsxRuntime_module_u(KeyCheckbox, {
              checked: formState.shift,
              disabled: !!props.disabled,
              onClick: onToggleKeyChange,
              ref: shiftKeyRef,
              children: [ 
               jsxRuntime_module_u(KeyBox, {
                label: "Shift",
                isMac: props.isMac
              }), 
               jsxRuntime_module_u("span", {
                class: "ml-2",
                children: "+"
              }) ]
            }), 
             jsxRuntime_module_u(KeyInput, {
              disabled: !!props.disabled,
              onKeyDown: onToggleKeyDown,
              onCompositionStart: event => {
                event.currentTarget.value = "";
              },
              onCompositionEnd: event => {
                event.currentTarget.value = event.currentTarget.value.toUpperCase();
                onToggleKeyChange();
              },
              ref: keyRef,
              size: 1,
              type: "text",
              value: formState.key || ""
            }) ]
          }) ]
        }), !!props.disabled &&  jsxRuntime_module_u("div", {
          class: "my-2 rounded-lg border border-solid border-zinc-500 px-4 py-2",
          onClick: handleChromeLinks,
          children:  jsxRuntime_module_u(Linkify, {
            text: t(props.disabled === "chrome" ? "options_browser_commands_no_toggle_key_chrome" : props.disabled === "edge" ? "options_browser_commands_no_toggle_key_edge" : "options_browser_commands_no_toggle_key"),
            links: [ {
              keyword: "chrome://extensions/shortcuts",
              href: "chrome://extensions/shortcuts"
            }, {
              keyword: "edge://extensions/shortcuts",
              href: "edge://extensions/shortcuts"
            } ]
          })
        }) ]
      });
    }
    function handleChromeLinks(e) {
      if (e.target instanceof HTMLAnchorElement && (e.target.href.startsWith("chrome://") || e.target.href.startsWith("edge://"))) {
        chrome.tabs.create({
          url: e.target.href
        });
        e.preventDefault();
      }
    }
    // CONCATENATED MODULE: ./src/options/KeyboardSettingsForm.tsx
    function KeyboardSettingsForm(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(ToggleKeyForm, {
          disabled: props.toggleKeyDisabled,
          isMac: props.isMac,
          onChangeToggleKey: props.onChangeToggleKey,
          toggleKey: props.toggleKey
        }), 
         jsxRuntime_module_u("p", {
          children: t("options_show_popup_subheading")
        }), 
         jsxRuntime_module_u(ShowPopupKeysForm, {
          holdToShowImageKeys: props.holdToShowImageKeys,
          holdToShowKeys: props.holdToShowKeys,
          isMac: props.isMac,
          onChangeHoldToShowImageKeys: props.onChangeHoldToShowImageKeys,
          onChangeHoldToShowKeys: props.onChangeHoldToShowKeys
        }), 
         jsxRuntime_module_u("p", {
          children: t("options_popup_keys_subheading")
        }), 
         jsxRuntime_module_u(PopupKeysForm, {
          isMac: props.isMac,
          keys: props.popupKeys,
          onUpdateKey: props.onUpdatePopupKey
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/KeyboardSettings.tsx
    const mac = ua_utils_isMac();
    function KeyboardSettings(props) {
      const {t} = useLocale();
      
      // Toggle key
      
            const [toggleKey, setToggleKey] = hooks_module_h(void 0);
      // Fetch the current toggle key when the component mounts and set up a
      // listener to update the toggle key when it changes.
            hooks_module_y((() => {
        void getToggleKey().then((toggleKey => setToggleKey(toggleKey)));
        if (!browser_polyfill_default().commands || typeof browser_polyfill_default().commands.onChanged !== "object") return;
        const listener = changeInfo => {
          if (changeInfo.name !== (false ? 0 : "_execute_browser_action")) return;
          try {
            setToggleKey(changeInfo.newShortcut ? Command.fromString(changeInfo.newShortcut) : void 0);
          } catch (e) {
            console.error(`Failed to parse key: ${changeInfo.newShortcut}`);
            const error = e instanceof CommandError ? browser_polyfill_default().i18n.getMessage(e.code, e.substitutions) : e;
            void Bugsnag.notify(error);
          }
        };
        browser_polyfill_default().commands.onChanged.addListener(listener);
        return () => {
          browser_polyfill_default().commands.onChanged.removeListener(listener);
        };
      }), []);
      const onChangeToggleKey = key => {
        void (async () => {
          try {
            if (key === ResetShortcut) {
              await browser_polyfill_default().commands.reset(false ? 0 : "_execute_browser_action");
              setToggleKey(await getToggleKey());
            } else {
              await browser_polyfill_default().commands.update({
                name: false ? 0 : "_execute_browser_action",
                shortcut: key ? key.toString() : ""
              });
              setToggleKey(key);
            }
          } catch (e) {
            console.error(`Failed to set toggle key to ${key?.toString()}`, e);
            void Bugsnag.notify(e);
            // Set the key back to its previous value
                        setToggleKey(await getToggleKey());
          }
        })();
      };
      const [toggleKeyDisabled] = hooks_module_h((() => {
        // Disable any controls associated with configuring browser.commands if the
        // necessary APIs are not available.
        const canConfigureCommands = browser_polyfill_default().commands && typeof browser_polyfill_default().commands.update === "function" && typeof browser_polyfill_default().commands.reset === "function";
        if (canConfigureCommands) return;
        if (isEdge()) return "edge";
        if (isChromium()) return "chrome";
        return "other";
      }));
      
      // Hold-to-show keys
      
            const [holdToShowKeys, setHoldToShowKeys] = useHoldToShowKeysSetting(props.config, "holdToShowKeys");
      const [holdToShowImageKeys, setHoldToShowImageKeys] = useHoldToShowKeysSetting(props.config, "holdToShowImageKeys");
      
      // Popup keys
      
            const popupKeys = useConfigValue(props.config, "keys");
      const onUpdatePopupKey = hooks_module_q(((key, value) => {
        props.config.updateKeys({
          [key]: value
        });
      }), [ props.config ]);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_keyboard_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(KeyboardSettingsForm, {
            holdToShowKeys,
            holdToShowImageKeys,
            isMac: mac,
            toggleKey,
            toggleKeyDisabled,
            onChangeToggleKey,
            onChangeHoldToShowKeys: setHoldToShowKeys,
            onChangeHoldToShowImageKeys: setHoldToShowImageKeys,
            onUpdatePopupKey,
            popupKeys
          })
        }) ]
      });
    }
    async function getToggleKey() {
      // Firefox for Android does not support the browser.commands API at all
      // but probably not many people want to use keyboard shortcuts on Android
      // anyway so we can just return null from here in that case.
      if (!browser_polyfill_default().commands) return;
      const commands = await browser_polyfill_default().commands.getAll();
      // Safari (14.1.1) has a very broken implementation of
      // chrome.commands.getAll(). It returns an object but it has no properties
      // and is not iterable.
      
      // There's not much we can do in that case so we just hard code the default
      // key since Safari also has no way of changing shortcut keys. Hopefully
      // Safari will fix chrome.commands.getAll() before or at the same time it
      // provides a way of re-assigning shortcut keys.
      
      // (See notes below for more recent versions of Safari.)
            if (typeof commands === "object" && typeof commands[Symbol.iterator] !== "function") return new Command("R", "MacCtrl", "Ctrl");
      for (const command of commands) if (command.name === (false ? 0 : "_execute_browser_action") && command.shortcut) try {
        return Command.fromString(command.shortcut);
      } catch (e) {
        console.error(`Failed to parse key: ${command.shortcut}`);
        const error = e instanceof CommandError ? browser_polyfill_default().i18n.getMessage(e.code, e.substitutions) : e;
        void Bugsnag.notify(error);
      }
      // In Safari 17.1, getAll returns an array of opaque WBSWebExtensionCommand
      // objects.
      
      // Again, just return the hard-coded default key in this case.
            if (isSafari()) return new Command("R", "MacCtrl", "Ctrl");
      return;
    }
    function useHoldToShowKeysSetting(config, key) {
      const value = useConfigValue(config, key);
      const setting = hooks_module_T((() => {
        const parts = typeof value === "string" ? value.split("+").map((part => part.trim().toLowerCase())) : [];
        return {
          ctrl: parts.includes("ctrl"),
          alt: parts.includes("alt")
        };
      }), [ value ]);
      const setValue = hooks_module_q((value => {
        const parts = [];
        if (value.ctrl) parts.push("Ctrl");
        if (value.alt) parts.push("Alt");
        config[key] = parts.length ? parts.join("+") : null;
      }), [ config, key ]);
      return [ setting, setValue ];
    }
    // CONCATENATED MODULE: ./src/utils/use-has-mouse.ts
    function useHasMouse() {
      const mql = hooks_module_T((() => window.matchMedia("(any-hover:hover), (any-pointer:fine)")), []);
      const [hasMouse, setHasMouse] = hooks_module_h(mql.matches);
      hooks_module_y((() => {
        const onMqlChange = evt => {
          setHasMouse(evt.matches);
        };
        mql.addEventListener("change", onMqlChange);
        return () => {
          mql.removeEventListener("change", onMqlChange);
        };
      }), []);
      return hasMouse;
    }
    // CONCATENATED MODULE: ./src/utils/use-has-touch.ts
    function useHasTouch() {
      const mql = hooks_module_T((() => window.matchMedia("(any-pointer:coarse)")), []);
      const [hasCoarsePointer, setHasCoarsePointer] = hooks_module_h(mql.matches);
      hooks_module_y((() => {
        const onMqlChange = evt => {
          setHasCoarsePointer(evt.matches);
        };
        mql.addEventListener("change", onMqlChange);
        return () => {
          mql.removeEventListener("change", onMqlChange);
        };
      }), []);
      return hooks_module_T((() => isTouchDevice()), [ hasCoarsePointer ]);
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
    // CONCATENATED MODULE: ./src/utils/use-theme-class.ts
    function useThemeClass(theme) {
      const [darkMode, setDarkMode] = hooks_module_h(false);
      // Only register for dark mode changes if the theme is the default one.
            hooks_module_y((() => {
        if (theme !== "default") return;
        const onMqlChange = evt => {
          setDarkMode(evt.matches);
        };
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        mql.addEventListener("change", onMqlChange);
        setDarkMode(mql.matches);
        return () => {
          mql.removeEventListener("change", onMqlChange);
        };
      }), [ theme ]);
      return hooks_module_T((() => getThemeClass(theme)), [ darkMode, theme ]);
    }
    // CONCATENATED MODULE: ./src/options/MouseInteractivityRadio.tsx
    function MouseInteractivityRadio(props) {
      const {t} = useLocale();
      const themeClass = useThemeClass(props.theme);
      
      return jsxRuntime_module_u("div", {
        class: "grid w-max grid-cols-1 gap-2 min-[400px]:grid-cols-2",
        children: [ 
         jsxRuntime_module_u(IconRadio, {
          checked: !props.value,
          label: t("options_mouse_interactivity_disable"),
          name: "mouseInteractivity",
          onChange: () => props.onChange(false),
          value: "disable",
          children:  jsxRuntime_module_u("div", {
            class: "flex items-center justify-center px-4 py-3",
            children:  jsxRuntime_module_u("svg", {
              class: `${themeClass} w-[150px] select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]`,
              viewBox: "0 0 200 150",
              children:  jsxRuntime_module_u("use", {
                href: "#interactivity-disabled-popup"
              })
            })
          })
        }), 
         jsxRuntime_module_u(IconRadio, {
          checked: props.value,
          label: t("options_mouse_interactivity_enable"),
          name: "mouseInteractivity",
          onChange: () => props.onChange(true),
          value: "enable",
          children:  jsxRuntime_module_u("div", {
            class: "flex items-center justify-center px-4 py-3",
            children:  jsxRuntime_module_u("svg", {
              class: `${themeClass} w-[150px] select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]`,
              viewBox: "0 0 200 150",
              children:  jsxRuntime_module_u("use", {
                href: "#interactivity-enabled-popup"
              })
            })
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/TabDisplayRadio.tsx
    function TabDisplayRadio(props) {
      const {t} = useLocale();
      const themeClass = useThemeClass(props.theme);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("svg", {
          class: "sr-only",
          role: "presentation",
          children:  jsxRuntime_module_u("defs", {
            children: [ 
             jsxRuntime_module_u("clipPath", {
              id: "popup-outline",
              children:  jsxRuntime_module_u("rect", {
                x: "1",
                y: "1",
                rx: "5",
                width: "46",
                height: "46"
              })
            }), 
             jsxRuntime_module_u("rect", {
              id: "tabicon-popup",
              x: "1",
              y: "1",
              rx: "5",
              width: "46",
              height: "46"
            }) ]
          })
        }), 
         jsxRuntime_module_u("div", {
          class: "grid w-max grid-cols-[repeat(1,80px)] gap-2 min-[300px]:grid-cols-[repeat(2,100px)] min-[440px]:grid-cols-[repeat(4,100px)] min-[600px]:grid-cols-[repeat(4,120px)]",
          children: [ 
           jsxRuntime_module_u(IconRadio, {
            checked: props.value === "top",
            label: t("options_tab_position_top"),
            name: "tabDisplay",
            onChange: () => props.onChange("top"),
            value: "top",
            children:  jsxRuntime_module_u(PopupIconBase, {
              themeClass,
              children:  jsxRuntime_module_u("rect", {
                class: "fill-[--cell-highlight-bg] stroke-[--border-color] stroke-[0.5px]",
                clipPath: "url(#popup-outline)",
                x: "16",
                y: "1",
                width: "32",
                height: "8"
              })
            })
          }), 
           jsxRuntime_module_u(IconRadio, {
            checked: props.value === "left",
            label: t("options_tab_position_left"),
            name: "tabDisplay",
            onChange: () => props.onChange("left"),
            value: "left",
            children:  jsxRuntime_module_u(PopupIconBase, {
              themeClass,
              children:  jsxRuntime_module_u("rect", {
                class: "fill-[--cell-highlight-bg] stroke-[--border-color] stroke-[0.5px]",
                clipPath: "url(#popup-outline)",
                x: "0",
                y: "8",
                width: "8",
                height: "40"
              })
            })
          }), 
           jsxRuntime_module_u(IconRadio, {
            checked: props.value === "right",
            label: t("options_tab_position_right"),
            name: "tabDisplay",
            onChange: () => props.onChange("right"),
            value: "right",
            children:  jsxRuntime_module_u(PopupIconBase, {
              themeClass,
              children:  jsxRuntime_module_u("rect", {
                class: "fill-[--cell-highlight-bg] stroke-[--border-color] stroke-[0.5px]",
                clipPath: "url(#popup-outline)",
                x: "40",
                y: "8",
                width: "8",
                height: "40"
              })
            })
          }), 
           jsxRuntime_module_u(IconRadio, {
            checked: props.value === "none",
            label: t("options_tab_position_none"),
            name: "tabDisplay",
            onChange: () => props.onChange("none"),
            value: "none",
            children:  jsxRuntime_module_u(PopupIconBase, {
              themeClass
            })
          }) ]
        }) ]
      });
    }
    function PopupIconBase(props) {
      
      return jsxRuntime_module_u("div", {
        class: "flex items-center justify-center px-4 py-3",
        children:  jsxRuntime_module_u("svg", {
          class: `${props.themeClass} size-12 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]`,
          viewBox: "0 0 48 48",
          children: [ 
           jsxRuntime_module_u("use", {
            class: "fill-[--bg-color] stroke-[--border-color] stroke-[0.5px]",
            href: "#tabicon-popup"
          }), props.children ]
        })
      });
    }
    // CONCATENATED MODULE: ./src/options/PopupInteractivitySettingsForm.tsx
    function PopupInteractivitySettingsForm(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u("div", {
        class: "flex flex-col gap-4",
        children: [ props.hasMouse &&  jsxRuntime_module_u("div", {
          class: "flex flex-col gap-4",
          children: [ 
           jsxRuntime_module_u("p", {
            class: "m-0",
            children: t("options_mouse_interactivity_label")
          }), 
           jsxRuntime_module_u(MouseInteractivityRadio, {
            onChange: props.onChangeMouseInteractivity,
            theme: props.theme,
            value: props.mouseInteractivity
          }) ]
        }), props.hasTouch &&  jsxRuntime_module_u("div", {
          class: "my-1",
          children:  jsxRuntime_module_u(CheckboxRow, {
            children: [ 
             jsxRuntime_module_u("input", {
              checked: props.enableTapLookup,
              id: "enableTapLookup",
              name: "enableTapLookup",
              onClick: event => {
                props.onChangeEnableTapLookup(event.currentTarget.checked);
              },
              type: "checkbox"
            }), 
             jsxRuntime_module_u("label", {
              class: "cursor-pointer select-none",
              for: "enableTapLookup",
              children: t("options_touch_enable_tap_lookup")
            }) ]
          })
        }), 
         jsxRuntime_module_u("div", {
          class: "flex flex-col gap-4",
          children: [ 
           jsxRuntime_module_u("p", {
            class: "m-0",
            children: t("options_tab_position_label")
          }), 
           jsxRuntime_module_u(TabDisplayRadio, {
            onChange: props.onChangeTabDisplay,
            theme: props.theme,
            value: props.tabDisplay
          }) ]
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/PopupInteractivitySettings.tsx
    function PopupInteractivitySettings(props) {
      const {t} = useLocale();
      const hasMouse = useHasMouse();
      const hasTouch = useHasTouch();
      const theme = useConfigValue(props.config, "popupStyle");
      const mouseInteractivity = useConfigValue(props.config, "popupInteractive");
      const onChangeMouseInteractivity = hooks_module_q((value => {
        props.config.popupInteractive = value;
      }), [ props.config ]);
      const enableTapLookup = useConfigValue(props.config, "enableTapLookup");
      const onChangeEnableTapLookup = hooks_module_q((value => {
        props.config.enableTapLookup = value;
      }), [ props.config ]);
      const tabDisplay = useConfigValue(props.config, "tabDisplay");
      const onChangeTabDisplay = hooks_module_q((value => {
        props.config.tabDisplay = value;
      }), [ props.config ]);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_popup_interactivity_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(PopupInteractivitySettingsForm, {
            enableTapLookup,
            hasMouse,
            hasTouch,
            mouseInteractivity,
            onChangeEnableTapLookup,
            onChangeMouseInteractivity,
            onChangeTabDisplay,
            tabDisplay,
            theme
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/PopupThemeRadio.tsx
    function PopupThemeRadio(props) {
      
      return jsxRuntime_module_u("div", {
        class: "grid grid-cols-1 sm:grid-cols-2",
        children: [ "default", "light", "blue", "lightblue", "black", "yellow" ].map((theme =>  jsxRuntime_module_u(PopupRadio, {
          name: "popupStyle",
          value: theme,
          checked: props.theme === theme,
          onChange: () => props.onChangeTheme(theme),
          children: theme === "default" ?  jsxRuntime_module_u("div", {
            class: "stacked",
            children: [ 
             jsxRuntime_module_u(PopupPreview, {
              ...props,
              theme: "light"
            }), 
             jsxRuntime_module_u("div", {
              class: "cover-tl flex",
              children:  jsxRuntime_module_u(PopupPreview, {
                ...props,
                theme: "black"
              })
            }) ]
          }) :  jsxRuntime_module_u(PopupPreview, {
            ...props,
            theme
          })
        }, theme)))
      });
    }
    const PopupRadio = compat_module_w(((props, ref) => {
      const id = hooks_module_g();
      
      return jsxRuntime_module_u("div", {
        children: [ 
         jsxRuntime_module_u("input", {
          ref,
          id,
          type: "radio",
          class: "peer sr-only",
          ...props,
          children: void 0
        }), 
         jsxRuntime_module_u("label", {
          class: classes_classes("peer-focus-visible:outline-auto group block cursor-pointer rounded-md border border-solid p-2", "border-transparent text-center transition duration-300", props.checked ? "border-zinc-300 bg-zinc-200 dark:border-zinc-500 dark:bg-zinc-600" : "opacity-50 hover:opacity-100 active:opacity-100"),
          for: id,
          children: props.children
        }) ]
      });
    }));
    function PopupPreview(props) {
      const {t} = useLocale();
      const themeClass = useThemeClass(props.theme);
      
      return jsxRuntime_module_u("div", {
        class: classes_classes(themeClass, "window inline-block min-w-[180px] py-2 text-left", props.fontFace === "bundled" && "bundled-fonts", props.fontSize !== "normal" && `font-${props.fontSize}`),
        children:  jsxRuntime_module_u("div", {
          class: "entry",
          children: [ 
           jsxRuntime_module_u("div", {
            children: [ 
             jsxRuntime_module_u("span", {
              class: "w-kanji",
              children: [ "\u7406\u89e3", props.showPriority &&  jsxRuntime_module_u(Star, {}), props.showWaniKaniLevel &&  jsxRuntime_module_u("span", {
                class: "wk-level",
                children:  jsxRuntime_module_u("span", {
                  children: "21"
                })
              }), props.showBunproDecks &&  jsxRuntime_module_u("span", {
                class: "bp-tag -vocab",
                children:  jsxRuntime_module_u("span", {
                  children: t("popup_bp_vocab_tag", [ "3" ])
                })
              }) ]
            }), 
             jsxRuntime_module_u("span", {
              class: "w-kana",
              children: [ renderKana(props.accentDisplay), props.showPriority &&  jsxRuntime_module_u(Star, {}) ]
            }), props.showRomaji &&  jsxRuntime_module_u("span", {
              class: "w-romaji",
              lang: "ja",
              children: "rikai"
            }) ]
          }), props.showDefinitions &&  jsxRuntime_module_u("span", {
            class: "w-def",
            lang: "en",
            children: [ renderPos(props.posDisplay), "\u200bunderstanding" ]
          }) ]
        })
      });
    }
    function Star() {
      
      return jsxRuntime_module_u("svg", {
        class: "svgicon opacity-50",
        viewBox: "0 0 98.6 93.2",
        children:  jsxRuntime_module_u("path", {
          d: "M98 34a4 4 0 00-3-1l-30-4L53 2a4 4 0 00-7 0L33 29 4 33a4 4 0 00-3 6l22 20-6 29a4 4 0 004 5 4 4 0 002 0l26-15 26 15a4 4 0 002 0 4 4 0 004-4 4 4 0 000-1l-6-29 22-20a4 4 0 001-5z"
        })
      });
    }
    function renderKana(accentDisplay) {
      switch (accentDisplay) {
       case "downstep":
        return "\u308a\ua71c\u304b\u3044";

       case "binary":
       case "binary-hi-contrast":
        
        return jsxRuntime_module_u("span", {
          class: classes_classes("w-binary", accentDisplay === "binary-hi-contrast" ? "-hi-contrast" : ""),
          children: [ 
           jsxRuntime_module_u("span", {
            class: "h-l",
            children: "\u308a"
          }), 
           jsxRuntime_module_u("span", {
            class: "l",
            children: "\u304b\u3044"
          }) ]
        });

       case "none":
        return "\u308a\u304b\u3044";
      }
    }
    function renderPos(posDisplay) {
      const {t} = useLocale();
      switch (posDisplay) {
       case "expl":
        
        return jsxRuntime_module_u("span", {
          class: "w-pos tag",
          lang: t("lang_tag"),
          children: `${t("pos_label_n")},  ${t("pos_label_vs")}`
        });

       case "code":
        
        return jsxRuntime_module_u("span", {
          class: "w-pos tag",
          children: "n, vs"
        });

       case "none":
        return null;
      }
    }
    // CONCATENATED MODULE: ./src/options/PopupStyleForm.tsx
    function PopupStyleForm(props) {
      const {t} = useLocale();
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("div", {
          class: "mx-auto w-fit pb-6",
          children:  jsxRuntime_module_u(PopupThemeRadio, {
            ...props
          })
        }), 
         jsxRuntime_module_u("div", {
          class: "flex flex-col gap-3 pb-6",
          children: [ 
           jsxRuntime_module_u(CheckboxRow, {
            children: [ 
             jsxRuntime_module_u("input", {
              id: "showPriority",
              name: "showPriority",
              type: "checkbox",
              checked: props.showPriority,
              onChange: e => props.onChangeShowPriority(e.currentTarget.checked)
            }), 
             jsxRuntime_module_u("label", {
              for: "showPriority",
              children: t("options_show_priority")
            }) ]
          }), 
           jsxRuntime_module_u(CheckboxRow, {
            children: [ 
             jsxRuntime_module_u("input", {
              id: "showWaniKaniLevel",
              name: "showWaniKaniLevel",
              type: "checkbox",
              checked: props.showWaniKaniLevel,
              onChange: e => props.onChangeShowWaniKaniLevel(e.currentTarget.checked)
            }), 
             jsxRuntime_module_u("label", {
              for: "showWaniKaniLevel",
              children: t("options_show_wanikani_levels")
            }) ]
          }), 
           jsxRuntime_module_u(CheckboxRow, {
            children: [ 
             jsxRuntime_module_u("input", {
              id: "showBunproDecks",
              name: "showBunproDecks",
              type: "checkbox",
              checked: props.showBunproDecks,
              onChange: e => props.onChangeShowBunproDecks(e.currentTarget.checked)
            }), 
             jsxRuntime_module_u("label", {
              for: "showBunproDecks",
              children: t("options_show_bunpro_decks")
            }) ]
          }), 
           jsxRuntime_module_u(CheckboxRow, {
            children: [ 
             jsxRuntime_module_u("input", {
              id: "showRomaji",
              name: "showRomaji",
              type: "checkbox",
              checked: props.showRomaji,
              onChange: e => props.onChangeShowRomaji(e.currentTarget.checked)
            }), 
             jsxRuntime_module_u("label", {
              for: "showRomaji",
              children: t("options_show_romaji")
            }) ]
          }), 
           jsxRuntime_module_u(CheckboxRow, {
            children: [ 
             jsxRuntime_module_u("input", {
              id: "showDefinitions",
              name: "showDefinitions",
              type: "checkbox",
              checked: props.showDefinitions,
              onChange: e => props.onChangeShowDefinitions(e.currentTarget.checked)
            }), 
             jsxRuntime_module_u("label", {
              for: "showDefinitions",
              children: t("options_show_definitions")
            }) ]
          }) ]
        }), 
         jsxRuntime_module_u("div", {
          class: "grid w-fit grid-cols-[repeat(2,auto)] items-baseline gap-4",
          children: [ 
           jsxRuntime_module_u("label", {
            for: "accentDisplay",
            children: t("options_accent_display_label")
          }), 
           jsxRuntime_module_u("select", {
            id: "accentDisplay",
            name: "accentDisplay",
            onChange: evt => {
              props.onChangeAccentDisplay(evt.currentTarget.value);
            },
            children: [ 
             jsxRuntime_module_u("option", {
              value: "downstep",
              selected: props.accentDisplay === "downstep",
              children: t("options_accent_display_downstep")
            }), 
             jsxRuntime_module_u("option", {
              value: "binary",
              selected: props.accentDisplay === "binary",
              children: t("options_accent_display_binary")
            }), 
             jsxRuntime_module_u("option", {
              value: "binary-hi-contrast",
              selected: props.accentDisplay === "binary-hi-contrast",
              children: t("options_accent_display_binary_high_contrast")
            }), 
             jsxRuntime_module_u("option", {
              value: "none",
              selected: props.accentDisplay === "none",
              children: t("options_accent_display_none")
            }) ]
          }), 
           jsxRuntime_module_u("label", {
            for: "posDisplay",
            children: t("options_pos_display_label")
          }), 
           jsxRuntime_module_u("select", {
            id: "posDisplay",
            name: "posDisplay",
            onChange: evt => {
              props.onChangePosDisplay(evt.currentTarget.value);
            },
            children: [ 
             jsxRuntime_module_u("option", {
              value: "expl",
              selected: props.posDisplay === "expl",
              children: t("options_pos_display_expl")
            }), 
             jsxRuntime_module_u("option", {
              value: "code",
              selected: props.posDisplay === "code",
              children: t("options_pos_display_code")
            }), 
             jsxRuntime_module_u("option", {
              value: "none",
              selected: props.posDisplay === "none",
              children: t("options_pos_display_none")
            }) ]
          }), 
           jsxRuntime_module_u("label", {
            for: "fontSize",
            children: t("options_font_size_label")
          }), 
           jsxRuntime_module_u("select", {
            id: "fontSize",
            name: "fontSize",
            onChange: evt => {
              props.onChangeFontSize(evt.currentTarget.value);
            },
            children: [ 
             jsxRuntime_module_u("option", {
              value: "normal",
              selected: props.fontSize === "normal",
              children: t("options_font_size_normal")
            }), 
             jsxRuntime_module_u("option", {
              value: "large",
              selected: props.fontSize === "large",
              children: t("options_font_size_large")
            }), 
             jsxRuntime_module_u("option", {
              value: "xl",
              selected: props.fontSize === "xl",
              children: t("options_font_size_xl")
            }) ]
          }), 
           jsxRuntime_module_u("label", {
            for: "fontFace",
            children: [ t("options_font_face_label"), 
             jsxRuntime_module_u(NewBadge, {
              expiry: new Date("2024-08-15")
            }) ]
          }), 
           jsxRuntime_module_u("select", {
            id: "fontFace",
            name: "fontFace",
            onChange: evt => {
              props.onChangeFontFace(evt.currentTarget.value);
            },
            children: [ 
             jsxRuntime_module_u("option", {
              value: "bundled",
              selected: props.fontFace === "bundled",
              children: t("options_font_face_bundled")
            }), 
             jsxRuntime_module_u("option", {
              value: "system",
              selected: props.fontFace === "system",
              children: t("options_font_face_system")
            }) ]
          }), 
           jsxRuntime_module_u("div", {
            children: t("options_expand_all_entries")
          }), 
           jsxRuntime_module_u("div", {
            class: "flex gap-5 px-2 pt-1",
            children: [ 
             jsxRuntime_module_u(CheckboxRow, {
              children: [ 
               jsxRuntime_module_u("input", {
                id: "expandWords",
                name: "expandWords",
                type: "checkbox",
                checked: props.autoExpand.includes("words"),
                onChange: e => props.onChangeAutoExpand("words", e.currentTarget.checked)
              }), 
               jsxRuntime_module_u("label", {
                for: "expandWords",
                children: t("options_expand_words_label")
              }) ]
            }), 
             jsxRuntime_module_u(CheckboxRow, {
              children: [ 
               jsxRuntime_module_u("input", {
                id: "expandKanji",
                name: "expandKanji",
                type: "checkbox",
                checked: props.autoExpand.includes("kanji"),
                onChange: e => props.onChangeAutoExpand("kanji", e.currentTarget.checked)
              }), 
               jsxRuntime_module_u("label", {
                for: "expandKanji",
                children: t("options_expand_kanji_label")
              }) ]
            }) ]
          }) ]
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/PopupStyleSettings.tsx
    function PopupStyleSettings(props) {
      const {t} = useLocale();
      const theme = useConfigValue(props.config, "popupStyle");
      const onChangeTheme = hooks_module_q((value => {
        props.config.popupStyle = value;
      }), [ props.config ]);
      const showPriority = useConfigValue(props.config, "showPriority");
      const onChangeShowPriority = hooks_module_q((value => {
        props.config.showPriority = value;
      }), [ props.config ]);
      const waniKaniVocabDisplay = useConfigValue(props.config, "waniKaniVocabDisplay");
      const onChangeShowWaniKaniLevel = hooks_module_q((value => {
        props.config.waniKaniVocabDisplay = value ? "show-matches" : "hide";
      }), [ props.config ]);
      const showBunproDecks = useConfigValue(props.config, "bunproDisplay");
      const onChangeShowBunproDecks = hooks_module_q((value => {
        props.config.bunproDisplay = value;
      }), [ props.config ]);
      const showRomaji = useConfigValue(props.config, "showRomaji");
      const onChangeShowRomaji = hooks_module_q((value => {
        props.config.showRomaji = value;
      }), [ props.config ]);
      const showDefinitions = !useConfigValue(props.config, "readingOnly");
      const onChangeShowDefinitions = hooks_module_q((value => {
        props.config.readingOnly = !value;
      }), [ props.config ]);
      const accentDisplay = useConfigValue(props.config, "accentDisplay");
      const onChangeAccentDisplay = hooks_module_q((value => {
        props.config.accentDisplay = value;
      }), [ props.config ]);
      const autoExpand = useConfigValue(props.config, "autoExpand");
      const onChangeAutoExpand = hooks_module_q(((type, value) => {
        props.config.toggleAutoExpand(type, value);
      }), [ props.config ]);
      const posDisplay = useConfigValue(props.config, "posDisplay");
      const onChangePosDisplay = hooks_module_q((value => {
        props.config.posDisplay = value;
      }), [ props.config ]);
      const fontSize = useConfigValue(props.config, "fontSize");
      const onChangeFontSize = hooks_module_q((value => {
        props.config.fontSize = value;
      }), [ props.config ]);
      const fontFace = useConfigValue(props.config, "fontFace");
      const onChangeFontFace = hooks_module_q((value => {
        props.config.fontFace = value;
      }), [ props.config ]);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_popup_style_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(PopupStyleForm, {
            accentDisplay,
            autoExpand,
            fontFace,
            fontSize,
            onChangeAccentDisplay,
            onChangeAutoExpand,
            onChangeFontFace,
            onChangeFontSize,
            onChangePosDisplay,
            onChangeShowBunproDecks,
            onChangeShowDefinitions,
            onChangeShowPriority,
            onChangeShowRomaji,
            onChangeShowWaniKaniLevel,
            onChangeTheme,
            posDisplay,
            showBunproDecks,
            showDefinitions,
            showPriority,
            showRomaji,
            showWaniKaniLevel: waniKaniVocabDisplay === "show-matches",
            theme
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/PuckSettingsForm.tsx
    const labelKeys = {
      auto: "options_show_puck_option_auto",
      show: "options_show_puck_option_show",
      hide: "options_show_puck_option_hide"
    };
    function PuckSettingsForm(props) {
      const {t} = useLocale();
      const onChange = hooks_module_q((event => {
        const setting = event.currentTarget.value;
        props.onChange(setting);
      }), [ props.onChange ]);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("p", {
          class: "mt-0",
          children: t("options_show_puck_label")
        }), [ "auto", "show", "hide" ].map((value =>  jsxRuntime_module_u(preact_module_b, {
          children: [ 
           jsxRuntime_module_u("input", {
            type: "radio",
            name: "showPuck",
            id: `showPuck-${value}`,
            value,
            onChange,
            checked: props.showPuck === value
          }), 
           jsxRuntime_module_u("label", {
            class: "ml-1 mr-2",
            for: `showPuck-${value}`,
            children: t(labelKeys[value])
          }) ]
        }))) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/PuckSettings.tsx
    function PuckSettings(props) {
      const {t} = useLocale();
      const showPuck = useConfigValue(props.config, "showPuck");
      const onChangeShowPuck = hooks_module_q((value => {
        props.config.showPuck = value;
      }), [ props.config ]);
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_lookup_puck_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(PuckSettingsForm, {
            showPuck,
            onChange: onChangeShowPuck
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/UnitSettingsForm.tsx
    function UnitSettingsForm(props) {
      const {t} = useLocale();
      const options = [ [ "metric", t("options_units_metric_label") ], [ "imperial", t("options_units_imperial_label") ] ];
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u("label", {
          for: "preferredUnits",
          children: t("options_units_label")
        }), 
         jsxRuntime_module_u(NewBadge, {
          expiry: new Date("2024-09-30")
        }), 
         jsxRuntime_module_u("select", {
          id: "preferredUnits",
          name: "preferredUnits",
          onInput: event => {
            props.onChange(event.currentTarget.value);
          },
          children: options.map((([value, label]) =>  jsxRuntime_module_u("option", {
            value,
            selected: value === props.selectedUnits,
            children: label
          }, value)))
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/UnitSettings.tsx
    function UnitSettings(props) {
      const {t} = useLocale();
      const preferredUnits = useConfigValue(props.config, "preferredUnits");
      const onChangeUnits = hooks_module_q((value => {
        props.config.preferredUnits = value;
      }), [ props.config ]);
      if (!preferredUnits) return null;
      
      return jsxRuntime_module_u(preact_module_b, {
        children: [ 
         jsxRuntime_module_u(SectionHeading, {
          children: t("options_unit_conversion_heading")
        }), 
         jsxRuntime_module_u("div", {
          class: "py-4",
          children:  jsxRuntime_module_u(UnitSettingsForm, {
            selectedUnits: preferredUnits,
            onChange: onChangeUnits
          })
        }) ]
      });
    }
    // CONCATENATED MODULE: ./src/options/OptionsPage.tsx
    function OptionsPage(props) {
      const hasKeyboard = possiblyHasPhysicalKeyboard();
      
      return jsxRuntime_module_u(I18nProvider, {
        children:  jsxRuntime_module_u("div", {
          class: "mx-auto max-w-[780px] px-6 pt-6",
          children: [ 
           jsxRuntime_module_u(GeneralSettings, {
            config: props.config
          }), 
           jsxRuntime_module_u(PopupStyleSettings, {
            config: props.config
          }), 
           jsxRuntime_module_u(PopupInteractivitySettings, {
            config: props.config
          }), 
           jsxRuntime_module_u(CurrencySettings, {
            config: props.config
          }), 
           jsxRuntime_module_u(UnitSettings, {
            config: props.config
          }), hasKeyboard &&  jsxRuntime_module_u(KeyboardSettings, {
            config: props.config
          }), 
           jsxRuntime_module_u(CopySettings, {
            config: props.config
          }), 
           jsxRuntime_module_u(PuckSettings, {
            config: props.config
          }), 
           jsxRuntime_module_u(DictionaryLanguageSettings, {
            config: props.config
          }), 
           jsxRuntime_module_u(KanjiReferenceSettings, {
            config: props.config
          }), 
           jsxRuntime_module_u(DictionaryDataSettings, {}) ]
        })
      });
    }
    // CONCATENATED MODULE: ./src/options/options.ts
    /// <reference path="../common/constants.d.ts" />
    startBugsnag();
    const options_config = new Config;
    function completeForm() {
      // UA-specific styles
      // We only add the 'firefox' class on desktop Firefox since Fenix doesn't
      // include browser styles.
      if (isFirefox() && !isFenix()) document.documentElement.classList.add("firefox");
      if (isChromium()) document.documentElement.classList.add("chromium");
      if (isEdge()) document.documentElement.classList.add("edge");
      if (isSafari()) document.documentElement.classList.add("safari");
      const container = document.getElementById("container");
      B(preact_module_(OptionsPage, {
        config: options_config
      }), container);
    }
    window.onload = async () => {
      await options_config.ready;
      completeForm();
    };
  })();
})();
//# sourceMappingURL=10ten-ja-options.js.map