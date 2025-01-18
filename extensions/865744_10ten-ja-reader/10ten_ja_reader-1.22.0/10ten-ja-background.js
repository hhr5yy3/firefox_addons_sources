(() => {
  // webpackBootstrap
  var __webpack_modules__ = {
    364: function(__unused_webpack_module, exports) {
      "use strict";
      0;
      exports.jsonEqualish = void 0;
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
      exports.jsonEqualish = jsonEqualish;
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
    698: function(__unused_webpack_module, exports) {
      !function(g, c) {
        true ? c(exports) : 0;
      }(0, (function(g) {
        const c = Symbol("newer"), e = Symbol("older");
        class n {
          constructor(a, b) {
            typeof a !== "number" && (b = a, a = 0), this.size = 0, this.limit = a, this.oldest = this.newest = void 0, 
            this._keymap = new Map, b && (this.assign(b), a < 1 && (this.limit = this.size));
          }
          _markEntryAsUsed(a) {
            if (a === this.newest) return;
            a[c] && (a === this.oldest && (this.oldest = a[c]), a[c][e] = a[e]), a[e] && (a[e][c] = a[c]), 
            a[c] = void 0, a[e] = this.newest, this.newest && (this.newest[c] = a), this.newest = a;
          }
          assign(a) {
            let b, d = this.limit || Number.MAX_VALUE;
            this._keymap.clear();
            let m = a[Symbol.iterator]();
            for (let h = m.next(); !h.done; h = m.next()) {
              let f = new l(h.value[0], h.value[1]);
              this._keymap.set(f.key, f), b ? (b[c] = f, f[e] = b) : this.oldest = f, b = f;
              if (d-- == 0) throw new Error("overflow");
            }
            this.newest = b, this.size = this._keymap.size;
          }
          get(a) {
            var b = this._keymap.get(a);
            return b ? (this._markEntryAsUsed(b), b.value) : void 0;
          }
          set(a, b) {
            var d = this._keymap.get(a);
            return d ? (d.value = b, this._markEntryAsUsed(d), this) : (this._keymap.set(a, d = new l(a, b)), 
            this.newest ? (this.newest[c] = d, d[e] = this.newest) : this.oldest = d, this.newest = d, 
            ++this.size, this.size > this.limit && this.shift(), this);
          }
          shift() {
            var a = this.oldest;
            if (a) return this.oldest[c] ? (this.oldest = this.oldest[c], this.oldest[e] = void 0) : (this.oldest = void 0, 
            this.newest = void 0), a[c] = a[e] = void 0, this._keymap.delete(a.key), --this.size, 
            [ a.key, a.value ];
          }
          find(a) {
            let b = this._keymap.get(a);
            return b ? b.value : void 0;
          }
          has(a) {
            return this._keymap.has(a);
          }
          delete(a) {
            var b = this._keymap.get(a);
            return b ? (this._keymap.delete(b.key), b[c] && b[e] ? (b[e][c] = b[c], b[c][e] = b[e]) : b[c] ? (b[c][e] = void 0, 
            this.oldest = b[c]) : b[e] ? (b[e][c] = void 0, this.newest = b[e]) : this.oldest = this.newest = void 0, 
            this.size--, b.value) : void 0;
          }
          clear() {
            this.oldest = this.newest = void 0, this.size = 0, this._keymap.clear();
          }
          keys() {
            return new j(this.oldest);
          }
          values() {
            return new k(this.oldest);
          }
          entries() {
            return this;
          }
          [Symbol.iterator]() {
            return new i(this.oldest);
          }
          forEach(a, b) {
            typeof b !== "object" && (b = this);
            let d = this.oldest;
            for (;d; ) a.call(b, d.value, d.key, this), d = d[c];
          }
          toJSON() {
            for (var a = new Array(this.size), b = 0, d = this.oldest; d; ) a[b++] = {
              key: d.key,
              value: d.value
            }, d = d[c];
            return a;
          }
          toString() {
            for (var a = "", b = this.oldest; b; ) a += String(b.key) + ":" + b.value, b = b[c], 
            b && (a += " < ");
            return a;
          }
        }
        g.LRUMap = n;
        function l(a, b) {
          this.key = a, this.value = b, this[c] = void 0, this[e] = void 0;
        }
        function i(a) {
          this.entry = a;
        }
        i.prototype[Symbol.iterator] = function() {
          return this;
        }, i.prototype.next = function() {
          let a = this.entry;
          return a ? (this.entry = a[c], {
            done: !1,
            value: [ a.key, a.value ]
          }) : {
            done: !0,
            value: void 0
          };
        };
        function j(a) {
          this.entry = a;
        }
        j.prototype[Symbol.iterator] = function() {
          return this;
        }, j.prototype.next = function() {
          let a = this.entry;
          return a ? (this.entry = a[c], {
            done: !1,
            value: a.key
          }) : {
            done: !0,
            value: void 0
          };
        };
        function k(a) {
          this.entry = a;
        }
        k.prototype[Symbol.iterator] = function() {
          return this;
        }, k.prototype.next = function() {
          let a = this.entry;
          return a ? (this.entry = a[c], {
            done: !1,
            value: a.value
          }) : {
            done: !0,
            value: void 0
          };
        };
      }));
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
    // EXTERNAL MODULE: ./node_modules/.pnpm/@birchill+json-equalish@1.1.2/node_modules/@birchill/json-equalish/dist/index.js
        var dist = __webpack_require__("364");
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
 */    function* dist_run(value, struct, options = {}) {
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
        const ts = dist_run(v, s, {
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
      const tuples = dist_run(value, struct, options);
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
 */    function dist_array(Element) {
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
          if (schema && dist_isObject(value)) {
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
            const [...tuples] = dist_run(value, S, ctx);
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
    function openDB(name, version, {blocked, upgrade, blocking, terminated} = {}) {
      const request = indexedDB.open(name, version);
      const openPromise = wrap(request);
      if (upgrade) request.addEventListener("upgradeneeded", (event => {
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
      }));
      if (blocked) request.addEventListener("blocked", (event => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion, event.newVersion, event)));
      openPromise.then((db => {
        if (terminated) db.addEventListener("close", (() => terminated()));
        if (blocking) db.addEventListener("versionchange", (event => blocking(event.oldVersion, event.newVersion, event)));
      })).catch((() => {}));
      return openPromise;
    }
    /**
 * Delete a database.
 *
 * @param name Name of the database.
 */    function deleteDB(name, {blocked} = {}) {
      const request = indexedDB.deleteDatabase(name);
      if (blocked) request.addEventListener("blocked", (event => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion, event)));
      return wrap(request).then((() => {}));
    }
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
    // CONCATENATED MODULE: ./node_modules/.pnpm/@birchill+normal-jp@1.5.2/node_modules/@birchill/normal-jp/dist/index.js
    // src/expand-choon.ts
    function expandChoon(input) {
      if (input.indexOf("\u30fc") === -1) return [];
      const replacer = vowel => (match, start) => `${start}${vowel.repeat(match.length - 1)}`;
      const initialResult = input.replace(/([\u3046\u304f\u3050\u3059\u305a\u3064\u3065\u306c\u3075\u3076\u3077\u3080\u3086\u3085\u308b])\u30fc+/g, replacer("\u3046")).replace(/([\u30a6\u30af\u30b0\u30b9\u30ba\u30c4\u30c5\u30cc\u30d5\u30d6\u30d7\u30e0\u30e6\u30e5\u30eb])\u30fc+/g, replacer("\u30a6")).replace(/([\u3042\u304b\u304c\u3055\u3056\u305f\u3060\u306a\u306f\u3070\u3071\u307e\u3084\u3083\u3089\u308f])\u30fc+/g, replacer("\u3042")).replace(/([\u30a2\u30ab\u30ac\u30b5\u30b6\u30bf\u30c0\u30ca\u30cf\u30d0\u30d1\u30de\u30e4\u30e3\u30e9\u30ef])\u30fc+/g, replacer("\u30a2")).replace(/([\u3044\u304d\u304e\u3057\u3058\u3061\u3062\u306b\u3072\u3073\u3074\u307f\u308a])\u30fc+/g, replacer("\u3044")).replace(/([\u30a4\u30ad\u30ae\u30b7\u30b8\u30c1\u30c2\u30cb\u30a4\u30d6\u30d4\u30df\u30ea])\u30fc+/g, replacer("\u30a4")).replace(/([\u3048\u3051\u3052\u305b\u305c\u3066\u3067\u306d\u3078\u3079\u307a\u3081\u308c])\u30fc+/g, replacer("\u3048")).replace(/([\u30a8\u30b1\u30b2\u30bb\u30bc\u30c6\u30c7\u30cd\u30d8\u30d9\u30da\u30e1\u30ec])\u30fc+/g, replacer("\u30a8"));
      const result = [];
      const matchO = /([\u304a\u3053\u3054\u305d\u305e\u3068\u3069\u306e\u307b\u307c\u307d\u3082\u3088\u3087\u308d\u3092])\u30fc+/;
      const matchKatakanaO = /([\u30aa\u30b3\u30b4\u30bd\u30be\u30c8\u30c9\u30ce\u30db\u30dc\u30dd\u30e2\u30e8\u30e7\u30ed\u30f2])\u30fc+/;
      const expandO = base => {
        let expandedWithU = base.replace(matchO, replacer("\u3046"));
        if (expandedWithU === base) expandedWithU = base.replace(matchKatakanaO, replacer("\u30a6"));
        if (expandedWithU === base) {
          if (base !== input) result.push(expandedWithU);
          return;
        }
        expandO(expandedWithU);
        let expandedWithO = base.replace(matchO, replacer("\u304a"));
        if (expandedWithO === base) expandedWithO = base.replace(matchKatakanaO, replacer("\u30aa"));
        expandO(expandedWithO);
      };
      expandO(initialResult);
      return result;
    }
    // src/kana-to-hiragana.ts
        function kanaToHiragana(input) {
      let result = "";
      for (const char of input) {
        let c = char.codePointAt(0);
        if (c >= 12449 && c <= 12534 || c === 12541 || c === 12542) c -= 96;
        result += String.fromCodePoint(c);
      }
      return result;
    }
    // src/kyuujitai.ts
        function kyuujitaiToShinjitai(input) {
      const inputCodePoints = [ ...input ].map((c => c.codePointAt(0)));
      const outputCodePoints = [];
      for (const c of inputCodePoints) outputCodePoints.push(KYUU_TO_SHIN[c] || c);
      return String.fromCodePoint(...outputCodePoints);
    }
    var KYUU_TO_SHIN = {
      20056: 20055,
      20098: 20081,
      20121: 20120,
      20126: 20124,
      20315: 20175,
      20358: 26469,
      20482: 20341,
      20551: 20206,
      20659: 20253,
      20702: 20605,
      20729: 20385,
      20745: 20537,
      20818: 20816,
      20841: 20001,
      20839: 20869,
      20904: 23500,
      20937: 28092,
      20955: 20956,
      21097: 21104,
      21133: 21091,
      21137: 21092,
      21214: 21172,
      21235: 21234,
      21237: 21169,
      21240: 21223,
      21312: 21306,
      21367: 24059,
      21373: 21363,
      21443: 21442,
      21854: 21782,
      21934: 21336,
      22169: 22107,
      22196: 21427,
      22225: 22065,
      22280: 22287,
      22283: 22269,
      22285: 22258,
      22291: 20870,
      22294: 22259,
      22296: 22243,
      22492: 37326,
      22575: 23597,
      22686: 22679,
      22702: 22549,
      22739: 22311,
      22744: 22593,
      22750: 22730,
      22756: 22732,
      22767: 22766,
      22777: 22769,
      22781: 23551,
      22887: 22885,
      22892: 22888,
      23363: 23330,
      23416: 23398,
      23522: 23517,
      23526: 23455,
      23531: 20889,
      23532: 23515,
      23542: 23453,
      23559: 23558,
      23560: 23554,
      23565: 23550,
      23622: 23626,
      23643: 23631,
      23660: 23646,
      23791: 23792,
      23805: 23777,
      23947: 23798,
      23997: 23731,
      24022: 24012,
      24034: 24035,
      24118: 24111,
      24183: 24182,
      24290: 24259,
      24291: 24195,
      24307: 24193,
      24392: 24382,
      24396: 24357,
      24398: 24367,
      24465: 24452,
      24478: 24467,
      24501: 24500,
      24503: 24499,
      24646: 24658,
      24800: 24693,
      24801: 24746,
      24817: 24745,
      24892: 24910,
      24920: 24808,
      25033: 24540,
      25079: 25040,
      25088: 24651,
      25136: 25126,
      25138: 25135,
      25142: 25144,
      25150: 25147,
      25282: 25173,
      25300: 25244,
      25308: 25309,
      25406: 25375,
      25554: 25407,
      25581: 25522,
      25620: 25531,
      25622: 25594,
      25628: 25436,
      25799: 25246,
      25802: 25731,
      25812: 25285,
      25818: 25312,
      25831: 25369,
      25844: 25313,
      25885: 25666,
      25898: 25785,
      25910: 21454,
      25928: 21177,
      25933: 21465,
      25941: 21189,
      25976: 25968,
      26039: 26029,
      26180: 26179,
      26202: 26217,
      26205: 26172,
      26310: 26278,
      26313: 26241,
      26366: 26365,
      26371: 20250,
      26781: 26465,
      26855: 26719,
      27054: 26628,
      27079: 27097,
      27114: 27010,
      27138: 27005,
      27155: 27004,
      27166: 26530,
      27171: 27096,
      27243: 27178,
      27292: 26727,
      27298: 26908,
      27387: 26716,
      27402: 27177,
      27472: 27431,
      27489: 27475,
      27493: 27497,
      27511: 27508,
      27512: 24112,
      27544: 27531,
      27580: 27579,
      27590: 27572,
      27599: 27598,
      27683: 27671,
      28041: 28169,
      28122: 28057,
      28136: 27972,
      28154: 27973,
      28212: 28167,
      28330: 28179,
      28331: 28201,
      28399: 28382,
      28415: 28288,
      28497: 28300,
      28507: 28508,
      28545: 28171,
      28580: 27810,
      28629: 28287,
      28639: 28168,
      28657: 27996,
      28670: 27818,
      28711: 28381,
      28712: 28716,
      28771: 28286,
      28976: 28948,
      29128: 28783,
      29138: 28988,
      29151: 21942,
      29200: 28809,
      29229: 20105,
      29234: 28858,
      29351: 29344,
      29376: 29366,
      29433: 29421,
      29518: 22888,
      29544: 29420,
      29557: 29471,
      29560: 29539,
      29563: 29486,
      29923: 24321,
      29953: 29942,
      30059: 30011,
      30070: 24403,
      30090: 30067,
      30246: 30185,
      30305: 30196,
      30332: 30330,
      30403: 26479,
      30428: 30423,
      30433: 23613,
      30494: 30495,
      30799: 30740,
      30862: 30741,
      31014: 30783,
      31061: 31192,
      31103: 31108,
      31146: 31109,
      31150: 31036,
      31152: 31074,
      31153: 31095,
      31281: 31216,
      31291: 31282,
      31310: 38964,
      31319: 31298,
      31337: 31311,
      31344: 31331,
      31434: 31363,
      31453: 20006,
      31929: 31883,
      32114: 31992,
      32147: 32076,
      32160: 32209,
      32214: 32210,
      32227: 32257,
      32291: 30476,
      32305: 32294,
      32317: 32207,
      32353: 32333,
      32361: 32260,
      32362: 32117,
      32363: 32331,
      32380: 32153,
      32396: 32154,
      32406: 32330,
      32570: 27424,
      32592: 32566,
      32882: 22768,
      32893: 32884,
      32901: 31899,
      33126: 33075,
      33213: 32966,
      33247: 33235,
      33274: 21488,
      33287: 19982,
      33290: 26087,
      33399: 33398,
      33674: 33624,
      33686: 33550,
      33824: 33804,
      33836: 19975,
      34083: 33931,
      34199: 22290,
      34224: 34219,
      34255: 34101,
      34269: 33464,
      34277: 34220,
      34310: 33446,
      34389: 20966,
      34395: 34394,
      34399: 21495,
      34722: 34509,
      34802: 34411,
      34847: 34635,
      34870: 34453,
      34875: 34542,
      34910: 34907,
      35037: 35013,
      35139: 35090,
      35258: 35226,
      35261: 35239,
      35264: 35251,
      35320: 35302,
      35616: 35617,
      35657: 35388,
      35695: 35379,
      35709: 35465,
      35712: 35501,
      35722: 22793,
      35731: 35698,
      35738: 35715,
      35920: 35914,
      35924: 33398,
      35947: 20104,
      36019: 24336,
      36067: 22770,
      36084: 38972,
      36106: 36059,
      36368: 36341,
      36544: 36527,
      36629: 36605,
      36635: 36620,
      36681: 36578,
      36776: 24321,
      36781: 36766,
      36783: 24321,
      36953: 36965,
      36958: 36883,
      36978: 36933,
      37002: 36794,
      37086: 37070,
      37141: 37111,
      37257: 37204,
      37291: 21307,
      37292: 37284,
      37297: 37271,
      37312: 37304,
      37323: 37320,
      37636: 37682,
      37666: 37549,
      37706: 37676,
      37805: 37806,
      37941: 37444,
      37956: 37619,
      37979: 37489,
      38364: 38306,
      38519: 38501,
      38568: 38543,
      38570: 38522,
      38577: 38560,
      38617: 21452,
      38620: 38609,
      38712: 35207,
      38728: 38666,
      38748: 38745,
      39002: 39003,
      39023: 38997,
      39132: 32763,
      39192: 20313,
      39200: 39173,
      39368: 39366,
      39479: 39442,
      39493: 39366,
      39511: 39443,
      39515: 39365,
      39635: 39620,
      39636: 20307,
      39662: 39658,
      39725: 38360,
      40388: 40335,
      40407: 40206,
      40572: 40568,
      40573: 22633,
      40613: 40614,
      40628: 40633,
      40629: 40634,
      40643: 40644,
      40657: 40658,
      40664: 40665,
      40670: 28857,
      40680: 20826,
      40778: 25993,
      40779: 25998,
      40786: 27503,
      40801: 40802,
      40845: 31452,
      40860: 20096
    };
    // src/numbers.ts
        function halfToFullWidthNum(input) {
      let result = "";
      for (const char of input) {
        let c = char.codePointAt(0);
        if (c >= 48 && c <= 57) c += 65296 - 48; else if (c >= 44 && c <= 46) c += 65292 - 44;
        result += String.fromCodePoint(c);
      }
      return result;
    }
    // src/to-normalized.ts
        var HANKAKU_KATAKANA_TO_ZENKAKU = [ 12290, 12300, 12301, 12289, 12539, 12530, 12449, 12451, 12453, 12455, 12457, 12515, 12517, 12519, 12483, 12540, 12450, 12452, 12454, 12456, 12458, 12459, 12461, 12463, 12465, 12467, 12469, 12471, 12473, 12475, 12477, 12479, 12481, 12484, 12486, 12488, 12490, 12491, 12492, 12493, 12494, 12495, 12498, 12501, 12504, 12507, 12510, 12511, 12512, 12513, 12514, 12516, 12518, 12520, 12521, 12522, 12523, 12524, 12525, 12527, 12531, 12441, 12442 ];
    var VOICED_TO_COMPOSED =  new Map([ [ 12358, 12436 ], [ 12363, 12364 ], [ 12365, 12366 ], [ 12367, 12368 ], [ 12369, 12370 ], [ 12371, 12372 ], [ 12373, 12374 ], [ 12375, 12376 ], [ 12377, 12378 ], [ 12379, 12380 ], [ 12381, 12382 ], [ 12383, 12384 ], [ 12385, 12386 ], [ 12388, 12389 ], [ 12390, 12391 ], [ 12392, 12393 ], [ 12399, 12400 ], [ 12402, 12403 ], [ 12405, 12406 ], [ 12408, 12409 ], [ 12411, 12412 ], [ 12445, 12446 ], [ 12459, 12460 ], [ 12461, 12462 ], [ 12454, 12532 ], [ 12463, 12464 ], [ 12465, 12466 ], [ 12467, 12468 ], [ 12469, 12470 ], [ 12471, 12472 ], [ 12473, 12474 ], [ 12475, 12476 ], [ 12477, 12478 ], [ 12479, 12480 ], [ 12481, 12482 ], [ 12484, 12485 ], [ 12486, 12487 ], [ 12488, 12489 ], [ 12495, 12496 ], [ 12498, 12499 ], [ 12501, 12502 ], [ 12504, 12505 ], [ 12507, 12508 ], [ 12527, 12535 ], [ 12528, 12536 ], [ 12529, 12537 ], [ 12530, 12538 ], [ 12541, 12542 ] ]);
    var SEMIVOICED_TO_COMPOSED =  new Map([ [ 12399, 12401 ], [ 12402, 12404 ], [ 12405, 12407 ], [ 12408, 12410 ], [ 12411, 12413 ], [ 12495, 12497 ], [ 12498, 12500 ], [ 12501, 12503 ], [ 12504, 12506 ], [ 12507, 12509 ] ]);
    var COMBINED_CHARS_A = [ "\u30a2\u30d1\u30fc\u30c8", "\u30a2\u30eb\u30d5\u30a1", "\u30a2\u30f3\u30da\u30a2", "\u30a2\u30fc\u30eb", "\u30a4\u30cb\u30f3\u30b0", "\u30a4\u30f3\u30c1", "\u30a6\u30a9\u30f3", "\u30a8\u30b9\u30af\u30fc\u30c9", "\u30a8\u30fc\u30ab\u30fc", "\u30aa\u30f3\u30b9", "\u30aa\u30fc\u30e0", "\u30ab\u30a4\u30ea", "\u30ab\u30e9\u30c3\u30c8", "\u30ab\u30ed\u30ea\u30fc", "\u30ac\u30ed\u30f3", "\u30ac\u30f3\u30de", "\u30ae\u30ac", "\u30ae\u30cb\u30fc", "\u30ad\u30e5\u30ea\u30fc", "\u30ae\u30eb\u30c0\u30fc", "\u30ad\u30ed", "\u30ad\u30ed\u30b0\u30e9\u30e0", "\u30ad\u30ed\u30e1\u30fc\u30c8\u30eb", "\u30ad\u30ed\u30ef\u30c3\u30c8", "\u30b0\u30e9\u30e0", "\u30b0\u30e9\u30e0\u30c8\u30f3", "\u30af\u30eb\u30bc\u30a4\u30ed", "\u30af\u30ed\u30fc\u30cd", "\u30b1\u30fc\u30b9", "\u30b3\u30eb\u30ca", "\u30b3\u30fc\u30dd", "\u30b5\u30a4\u30af\u30eb", "\u30b5\u30f3\u30c1\u30fc\u30e0", "\u30b7\u30ea\u30f3\u30b0", "\u30bb\u30f3\u30c1", "\u30bb\u30f3\u30c8", "\u30c0\u30fc\u30b9", "\u30c7\u30b7", "\u30c9\u30eb", "\u30c8\u30f3", "\u30ca\u30ce", "\u30ce\u30c3\u30c8", "\u30cf\u30a4\u30c4", "\u30d1\u30fc\u30bb\u30f3\u30c8", "\u30d1\u30fc\u30c4", "\u30d0\u30fc\u30ec\u30eb", "\u30d4\u30a2\u30b9\u30c8\u30eb", "\u30d4\u30af\u30eb", "\u30d4\u30b3", "\u30d3\u30eb", "\u30d5\u30a1\u30e9\u30c3\u30c9", "\u30d5\u30a3\u30fc\u30c8", "\u30d6\u30c3\u30b7\u30a7\u30eb", "\u30d5\u30e9\u30f3", "\u30d8\u30af\u30bf\u30fc\u30eb", "\u30da\u30bd", "\u30da\u30cb\u30d2", "\u30d8\u30eb\u30c4", "\u30da\u30f3\u30b9", "\u30da\u30fc\u30b8", "\u30d9\u30fc\u30bf", "\u30dd\u30a4\u30f3\u30c8", "\u30dc\u30eb\u30c8", "\u30db\u30f3", "\u30dd\u30f3\u30c9", "\u30db\u30fc\u30eb", "\u30db\u30fc\u30f3", "\u30de\u30a4\u30af\u30ed", "\u30de\u30a4\u30eb", "\u30de\u30c3\u30cf", "\u30de\u30eb\u30af", "\u30de\u30f3\u30b7\u30e7\u30f3", "\u30df\u30af\u30ed\u30f3", "\u30df\u30ea", "\u30df\u30ea\u30d0\u30fc\u30eb", "\u30e1\u30ac", "\u30e1\u30ac\u30c8\u30f3", "\u30e1\u30fc\u30c8\u30eb", "\u30e4\u30fc\u30c9", "\u30e4\u30fc\u30eb", "\u30e6\u30a2\u30f3", "\u30ea\u30c3\u30c8\u30eb", "\u30ea\u30e9", "\u30eb\u30d4\u30fc", "\u30eb\u30fc\u30d6\u30eb", "\u30ec\u30e0", "\u30ec\u30f3\u30c8\u30b2\u30f3", "\u30ef\u30c3\u30c8", "0\u70b9", "1\u70b9", "2\u70b9", "3\u70b9", "4\u70b9", "5\u70b9", "6\u70b9", "7\u70b9", "8\u70b9", "9\u70b9", "10\u70b9", "11\u70b9", "12\u70b9", "13\u70b9", "14\u70b9", "15\u70b9", "16\u70b9", "17\u70b9", "18\u70b9", "19\u70b9", "20\u70b9", "21\u70b9", "22\u70b9", "23\u70b9", "24\u70b9" ];
    var COMBINED_CHARS_B = [ "\u5e73\u6210", "\u662d\u548c", "\u5927\u6b63", "\u660e\u6cbb", "\u682a\u5f0f\u4f1a\u793e" ];
    var ENCLOSED_CHARS_A = [ "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f", "\u65e5", "\u682a", "\u6709", "\u793e", "\u540d", "\u7279", "\u8ca1", "\u795d", "\u52b4", "\u4ee3", "\u547c", "\u5b66", "\u76e3", "\u4f01", "\u8cc7", "\u5354", "\u796d", "\u4f11", "\u81ea", "\u81f3", "\u554f", "\u5e7c", "\u6587", "\u7b8f" ];
    var ENCLOSED_CHARS_B = [ "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f", "\u65e5", "\u682a", "\u6709", "\u793e", "\u540d", "\u7279", "\u8ca1", "\u795d", "\u52b4", "\u79d8", "\u7537", "\u5973", "\u9069", "\u512a", "\u5370", "\u6ce8", "\u9802", "\u4f11", "\u5199", "\u6b63", "\u4e0a", "\u4e2d", "\u4e0b", "\u5de6", "\u53f3", "\u533b", "\u5b97", "\u5b66", "\u76e3", "\u4f01", "\u8cc7", "\u5354", "\u591c" ];
    var ENCLOSED_CHARS_C = [ "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708" ];
    var ENCLOSED_CHARS_D = [ "\u30a2", "\u30a4", "\u30a6", "\u30a8", "\u30aa", "\u30ab", "\u30ad", "\u30af", "\u30b1", "\u30b3", "\u30b5", "\u30b7", "\u30b9", "\u30bb", "\u30bd", "\u30bf", "\u30c1", "\u30c4", "\u30c6", "\u30c8", "\u30ca", "\u30cb", "\u30cc", "\u30cd", "\u30ce", "\u30cf", "\u30d2", "\u30d5", "\u30d8", "\u30db", "\u30de", "\u30df", "\u30e0", "\u30e1", "\u30e2", "\u30e4", "\u30e6", "\u30e8", "\u30e9", "\u30ea", "\u30eb", "\u30ec", "\u30ed", "\u30ef", "\u30f0", "\u30f1", "\u30f2", "\u4ee4\u548c" ];
    var RADICAL_TO_KANJI_CHARS = [ 
    // ⼀ → 一
    [ 12032, 19968 ], 
    // ⼁ → 丨
    [ 12033, 20008 ], 
    // ⼂ → 丶
    [ 12034, 20022 ], 
    // ⼃ → 丿
    [ 12035, 20031 ], 
    // ⼄ → 乙
    [ 12036, 20057 ], 
    // ⼅ → 亅
    [ 12037, 20101 ], 
    // ⼆ → 二
    [ 12038, 20108 ], 
    // ⼇ → 亠
    [ 12039, 20128 ], 
    // ⼈ → 人
    [ 12040, 20154 ], 
    // ⼉ → 儿
    [ 12041, 20799 ], 
    // ⼊ → 入
    [ 12042, 20837 ], 
    // ⼋ → 八
    [ 12043, 20843 ], 
    // ⼌ → 冂
    [ 12044, 20866 ], 
    // ⼍ → 冖
    [ 12045, 20886 ], 
    // ⼎ → 冫
    [ 12046, 20907 ], 
    // ⼏ → 几
    [ 12047, 20960 ], 
    // ⼐ → 凵
    [ 12048, 20981 ], 
    // ⼑ → 刀
    [ 12049, 20992 ], 
    // ⼒ → 力
    [ 12050, 21147 ], 
    // ⼓ → 勹
    [ 12051, 21241 ], 
    // ⼔ → 匕
    [ 12052, 21269 ], 
    // ⼕ → 匚
    [ 12053, 21274 ], 
    // ⼖ → 匸
    [ 12054, 21304 ], 
    // ⼗ → 十
    [ 12055, 21313 ], 
    // ⼘ → 卜
    [ 12056, 21340 ], 
    // ⼙ → 卩
    [ 12057, 21353 ], 
    // ⼚ → 厂
    [ 12058, 21378 ], 
    // ⼛ → 厶
    [ 12059, 21430 ], 
    // ⼜ → 又
    [ 12060, 21448 ], 
    // ⼝ → 口
    [ 12061, 21475 ], 
    // ⼞ → 囗
    [ 12062, 22231 ], 
    // ⼟ → 土
    [ 12063, 22303 ], 
    // ⼠ → 士
    [ 12064, 22763 ], 
    // ⼡ → 夂
    [ 12065, 22786 ], 
    // ⼢ → 夊
    [ 12066, 22794 ], 
    // ⼣ → 夕
    [ 12067, 22805 ], 
    // ⼤ → 大
    [ 12068, 22823 ], 
    // ⼥ → 女
    [ 12069, 22899 ], 
    // ⼦ → 子
    [ 12070, 23376 ], 
    // ⼧ → 宀
    [ 12071, 23424 ], 
    // ⼨ → 寸
    [ 12072, 23544 ], 
    // ⼩ → 小
    [ 12073, 23567 ], 
    // ⼪ → 尢
    [ 12074, 23586 ], 
    // ⼫ → 尸
    [ 12075, 23608 ], 
    // ⼬ → 屮
    [ 12076, 23662 ], 
    // ⼭ → 山
    [ 12077, 23665 ], 
    // ⼮ → 巛
    [ 12078, 24027 ], 
    // ⼯ → 工
    [ 12079, 24037 ], 
    // ⼰ → 己
    [ 12080, 24049 ], 
    // ⼱ → 巾
    [ 12081, 24062 ], 
    // ⼲ → 干
    [ 12082, 24178 ], 
    // ⼳ → 幺
    [ 12083, 24186 ], 
    // ⼴ → 广
    [ 12084, 24191 ], 
    // ⼵ → 廴
    [ 12085, 24308 ], 
    // ⼶ → 廾
    [ 12086, 24318 ], 
    // ⼷ → 弋
    [ 12087, 24331 ], 
    // ⼸ → 弓
    [ 12088, 24339 ], 
    // ⼹ → 彐
    [ 12089, 24400 ], 
    // ⼺ → 彡
    [ 12090, 24417 ], 
    // ⼻ → 彳
    [ 12091, 24435 ], 
    // ⼼ → 心
    [ 12092, 24515 ], 
    // ⼽ → 戈
    [ 12093, 25096 ], 
    // ⼾ → 戶
    [ 12094, 25142 ], 
    // ⼿ → 手
    [ 12095, 25163 ], 
    // ⽀ → 支
    [ 12096, 25903 ], 
    // ⽁ → 攴
    [ 12097, 25908 ], 
    // ⽂ → 文
    [ 12098, 25991 ], 
    // ⽃ → 斗
    [ 12099, 26007 ], 
    // ⽄ → 斤
    [ 12100, 26020 ], 
    // ⽅ → 方
    [ 12101, 26041 ], 
    // ⽆ → 无
    [ 12102, 26080 ], 
    // ⽇ → 日
    [ 12103, 26085 ], 
    // ⽈ → 曰
    [ 12104, 26352 ], 
    // ⽉ → 月
    [ 12105, 26376 ], 
    // ⽊ → 木
    [ 12106, 26408 ], 
    // ⽋ → 欠
    [ 12107, 27424 ], 
    // ⽌ → 止
    [ 12108, 27490 ], 
    // ⽍ → 歹
    [ 12109, 27513 ], 
    // ⽎ → 殳
    [ 12110, 27571 ], 
    // ⽏ → 毋
    [ 12111, 27595 ], 
    // ⽐ → 比
    [ 12112, 27604 ], 
    // ⽑ → 毛
    [ 12113, 27611 ], 
    // ⽒ → 氏
    [ 12114, 27663 ], 
    // ⽓ → 气
    [ 12115, 27668 ], 
    // ⽔ → 水
    [ 12116, 27700 ], 
    // ⽕ → 火
    [ 12117, 28779 ], 
    // ⽖ → 爪
    [ 12118, 29226 ], 
    // ⽗ → 父
    [ 12119, 29238 ], 
    // ⽘ → 爻
    [ 12120, 29243 ], 
    // ⽙ → 爿
    [ 12121, 29247 ], 
    // ⽚ → 片
    [ 12122, 29255 ], 
    // ⽛ → 牙
    [ 12123, 29273 ], 
    // ⽜ → 牛
    [ 12124, 29275 ], 
    // ⽝ → 犬
    [ 12125, 29356 ], 
    // ⽞ → 玄
    [ 12126, 29572 ], 
    // ⽟ → 玉
    [ 12127, 29577 ], 
    // ⽠ → 瓜
    [ 12128, 29916 ], 
    // ⽡ → 瓦
    [ 12129, 29926 ], 
    // ⽢ → 甘
    [ 12130, 29976 ], 
    // ⽣ → 生
    [ 12131, 29983 ], 
    // ⽤ → 用
    [ 12132, 29992 ], 
    // ⽥ → 田
    [ 12133, 3e4 ], 
    // ⽦ → 疋
    [ 12134, 30091 ], 
    // ⽧ → 疒
    [ 12135, 30098 ], 
    // ⽨ → 癶
    [ 12136, 30326 ], 
    // ⽩ → 白
    [ 12137, 30333 ], 
    // ⽪ → 皮
    [ 12138, 30382 ], 
    // ⽫ → 皿
    [ 12139, 30399 ], 
    // ⽬ → 目
    [ 12140, 30446 ], 
    // ⽭ → 矛
    [ 12141, 30683 ], 
    // ⽮ → 矢
    [ 12142, 30690 ], 
    // ⽯ → 石
    [ 12143, 30707 ], 
    // ⽰ → 示
    [ 12144, 31034 ], 
    // ⽱ → 禸
    [ 12145, 31160 ], 
    // ⽲ → 禾
    [ 12146, 31166 ], 
    // ⽳ → 穴
    [ 12147, 31348 ], 
    // ⽴ → 立
    [ 12148, 31435 ], 
    // ⽵ → 竹
    [ 12149, 31481 ], 
    // ⽶ → 米
    [ 12150, 31859 ], 
    // ⽷ → 糸
    [ 12151, 31992 ], 
    // ⽸ → 缶
    [ 12152, 32566 ], 
    // ⽹ → 网
    [ 12153, 32593 ], 
    // ⽺ → 羊
    [ 12154, 32650 ], 
    // ⽻ → 羽
    [ 12155, 32701 ], 
    // ⽼ → 老
    [ 12156, 32769 ], 
    // ⽽ → 而
    [ 12157, 32780 ], 
    // ⽾ → 耒
    [ 12158, 32786 ], 
    // ⽿ → 耳
    [ 12159, 32819 ], 
    // ⾀ → 聿
    [ 12160, 32895 ], 
    // ⾁ → 肉
    [ 12161, 32905 ], 
    // ⾂ → 臣
    [ 12162, 33251 ], 
    // ⾃ → 自
    [ 12163, 33258 ], 
    // ⾄ → 至
    [ 12164, 33267 ], 
    // ⾅ → 臼
    [ 12165, 33276 ], 
    // ⾆ → 舌
    [ 12166, 33292 ], 
    // ⾇ → 舛
    [ 12167, 33307 ], 
    // ⾈ → 舟
    [ 12168, 33311 ], 
    // ⾉ → 艮
    [ 12169, 33390 ], 
    // ⾊ → 色
    [ 12170, 33394 ], 
    // ⾋ → 艸
    [ 12171, 33400 ], 
    // ⾌ → 虍
    [ 12172, 34381 ], 
    // ⾍ → 虫
    [ 12173, 34411 ], 
    // ⾎ → 血
    [ 12174, 34880 ], 
    // ⾏ → 行
    [ 12175, 34892 ], 
    // ⾐ → 衣
    [ 12176, 34915 ], 
    // ⾑ → 襾
    [ 12177, 35198 ], 
    // ⾒ → 見
    [ 12178, 35211 ], 
    // ⾓ → 角
    [ 12179, 35282 ], 
    // ⾔ → 言
    [ 12180, 35328 ], 
    // ⾕ → 谷
    [ 12181, 35895 ], 
    // ⾖ → 豆
    [ 12182, 35910 ], 
    // ⾗ → 豕
    [ 12183, 35925 ], 
    // ⾘ → 豸
    [ 12184, 35960 ], 
    // ⾙ → 貝
    [ 12185, 35997 ], 
    // ⾚ → 赤
    [ 12186, 36196 ], 
    // ⾛ → 走
    [ 12187, 36208 ], 
    // ⾜ → 足
    [ 12188, 36275 ], 
    // ⾝ → 身
    [ 12189, 36523 ], 
    // ⾞ → 車
    [ 12190, 36554 ], 
    // ⾟ → 辛
    [ 12191, 36763 ], 
    // ⾠ → 辰
    [ 12192, 36784 ], 
    // ⾡ → 辵
    [ 12193, 36789 ], 
    // ⾢ → 邑
    [ 12194, 37009 ], 
    // ⾣ → 酉
    [ 12195, 37193 ], 
    // ⾤ → 釆
    [ 12196, 37318 ], 
    // ⾥ → 里
    [ 12197, 37324 ], 
    // ⾦ → 金
    [ 12198, 37329 ], 
    // ⾧ → 長
    [ 12199, 38263 ], 
    // ⾨ → 門
    [ 12200, 38272 ], 
    // ⾩ → 阜
    [ 12201, 38428 ], 
    // ⾪ → 隶
    [ 12202, 38582 ], 
    // ⾫ → 隹
    [ 12203, 38585 ], 
    // ⾬ → 雨
    [ 12204, 38632 ], 
    // ⾭ → 靑
    [ 12205, 38737 ], 
    // ⾮ → 非
    [ 12206, 38750 ], 
    // ⾯ → 面
    [ 12207, 38754 ], 
    // ⾰ → 革
    [ 12208, 38761 ], 
    // ⾱ → 韋
    [ 12209, 38859 ], 
    // ⾲ → 韭
    [ 12210, 38893 ], 
    // ⾳ → 音
    [ 12211, 38899 ], 
    // ⾴ → 頁
    [ 12212, 38913 ], 
    // ⾵ → 風
    [ 12213, 39080 ], 
    // ⾶ → 飛
    [ 12214, 39131 ], 
    // ⾷ → 食
    [ 12215, 39135 ], 
    // ⾸ → 首
    [ 12216, 39318 ], 
    // ⾹ → 香
    [ 12217, 39321 ], 
    // ⾺ → 馬
    [ 12218, 39340 ], 
    // ⾻ → 骨
    [ 12219, 39592 ], 
    // ⾼ → 高
    [ 12220, 39640 ], 
    // ⾽ → 髟
    [ 12221, 39647 ], 
    // ⾾ → 鬥
    [ 12222, 39717 ], 
    // ⾿ → 鬯
    [ 12223, 39727 ], 
    // ⿀ → 鬲
    [ 12224, 39730 ], 
    // ⿁ → 鬼
    [ 12225, 39740 ], 
    // ⿂ → 魚
    [ 12226, 39770 ], 
    // ⿃ → 鳥
    [ 12227, 40165 ], 
    // ⿄ → 鹵
    [ 12228, 40565 ], 
    // ⿅ → 鹿
    [ 12229, 40575 ], 
    // ⿆ → 麥
    [ 12230, 40613 ], 
    // ⿇ → 麻
    [ 12231, 40635 ], 
    // ⿈ → 黃
    [ 12232, 40643 ], 
    // ⿉ → 黍
    [ 12233, 40653 ], 
    // ⿊ → 黑
    [ 12234, 40657 ], 
    // ⿋ → 黹
    [ 12235, 40697 ], 
    // ⿌ → 黽
    [ 12236, 40701 ], 
    // ⿍ → 鼎
    [ 12237, 40718 ], 
    // ⿎ → 鼓
    [ 12238, 40723 ], 
    // ⿏ → 鼠
    [ 12239, 40736 ], 
    // ⿐ → 鼻
    [ 12240, 40763 ], 
    // ⿑ → 齊
    [ 12241, 40778 ], 
    // ⿒ → 齒
    [ 12242, 40786 ], 
    // ⿓ → 龍
    [ 12243, 40845 ], 
    // ⿔ → 龜
    [ 12244, 40860 ], 
    // ⿕ → 龠
    [ 12245, 40864 ], 
    // ⺁ → 厂
    [ 11905, 21378 ], 
    // ⺃ → 乚
    [ 11907, 20058 ], 
    // ⺅ → 亻
    [ 11909, 20155 ], 
    // ⺆ → 冂
    [ 11910, 20866 ], 
    // ⺇ → 几
    [ 11911, 20960 ], 
    // ⺉ → 刂
    [ 11913, 20994 ], 
    // ⺎ → 兀
    [ 11918, 20800 ], 
    // ⺏ → 尣
    [ 11919, 23587 ], 
    // ⺐ → 尢
    [ 11920, 23586 ], 
    // ⺑ → 尣
    [ 11921, 23587 ], 
    // ⺒ → 巳
    [ 11922, 24051 ], 
    // ⺓ → 幺
    [ 11923, 24186 ], 
    // ⺔ → 彑
    [ 11924, 24401 ], 
    // ⺕ → 彐
    [ 11925, 24400 ], 
    // ⺖ → 忄
    [ 11926, 24516 ], 
    // ⺘ → 扌
    [ 11928, 25164 ], 
    // ⺙ → 攵
    [ 11929, 25909 ], 
    // ⺛ → 旡
    [ 11931, 26081 ], 
    // ⺝ → 月
    [ 11933, 26376 ], 
    // ⺞ → 歺
    [ 11934, 27514 ], 
    // ⺟ → 母
    [ 11935, 27597 ], 
    // ⺠ → 民
    [ 11936, 27665 ], 
    // ⺡ → 氵
    [ 11937, 27701 ], 
    // ⺢ → 氺
    [ 11938, 27706 ], 
    // ⺣ → 灬
    [ 11939, 28780 ], 
    // ⺤ → 爫
    [ 11940, 29227 ], 
    // ⺥ → 爫
    [ 11941, 29227 ], 
    // ⺦ → 丬
    [ 11942, 20012 ], 
    // ⺨ → 犭
    [ 11944, 29357 ], 
    // ⺫ → 罒
    [ 11947, 32594 ], 
    // ⺯ → 糹
    [ 11951, 31993 ], 
    // ⺰ → 纟
    [ 11952, 32415 ], 
    // ⺱ → 罓
    [ 11953, 32595 ], 
    // ⺴ → 㓁
    [ 11956, 13505 ], 
    // ⺸ → 羋
    [ 11960, 32651 ], 
    // ⺹ → 耂
    [ 11961, 32770 ], 
    // ⺺ → 肀
    [ 11962, 32896 ], 
    // ⺽ → 臼
    [ 11965, 33276 ], 
    // ⺾ → 艹
    [ 11966, 33401 ], 
    // ⻁ → 虎
    [ 11969, 34382 ], 
    // ⻂ → 衤
    [ 11970, 34916 ], 
    // ⻃ → 覀
    [ 11971, 35200 ], 
    // ⻄ → 西
    [ 11972, 35199 ], 
    // ⻅ → 见
    [ 11973, 35265 ], 
    // ⻆ → 角
    [ 11974, 35282 ], 
    // ⻈ → 讠
    [ 11976, 35744 ], 
    // ⻉ → 贝
    [ 11977, 36125 ], 
    // ⻋ → 车
    [ 11979, 36710 ], 
    // ⻐ → 钅
    [ 11984, 38021 ], 
    // ⻑ → 長
    [ 11985, 38263 ], 
    // ⻒ → 镸
    [ 11986, 38264 ], 
    // ⻓ → 长
    [ 11987, 38271 ], 
    // ⻔ → 门
    [ 11988, 38376 ], 
    // ⻖ → 阝
    [ 11990, 38429 ], 
    // ⻘ → 青
    [ 11992, 38738 ], 
    // ⻙ → 韦
    [ 11993, 38886 ], 
    // ⻚ → 页
    [ 11994, 39029 ], 
    // ⻛ → 风
    [ 11995, 39118 ], 
    // ⻜ → 飞
    [ 11996, 39134 ], 
    // ⻝ → 食
    [ 11997, 39135 ], 
    // ⻟ → 飠
    [ 11999, 39136 ], 
    // ⻠ → 饣
    [ 12e3, 39267 ], 
    // ⻢ → 马
    [ 12002, 39532 ], 
    // ⻣ → 骨
    [ 12003, 39592 ], 
    // ⻤ → 鬼
    [ 12004, 39740 ], 
    // ⻥ → 鱼
    [ 12005, 40060 ], 
    // ⻦ → 鸟
    [ 12006, 40479 ], 
    // ⻧ → 卤
    [ 12007, 21348 ], 
    // ⻨ → 麦
    [ 12008, 40614 ], 
    // ⻩ → 黄
    [ 12009, 40644 ], 
    // ⻪ → 黾
    [ 12010, 40702 ], 
    // ⻫ → 斉
    [ 12011, 25993 ], 
    // ⻬ → 齐
    [ 12012, 40784 ], 
    // ⻭ → 歯
    [ 12013, 27503 ], 
    // ⻮ → 齿
    [ 12014, 40831 ], 
    // ⻯ → 竜
    [ 12015, 31452 ], 
    // ⻰ → 龙
    [ 12016, 40857 ], 
    // ⻱ → 龜
    [ 12017, 40860 ], 
    // ⻲ → 亀
    [ 12018, 20096 ], 
    // ⻳ → 龟
    [ 12019, 40863 ] ];
    var RADICAL_TO_KANJI;
    function toNormalized(input) {
      if (!RADICAL_TO_KANJI) RADICAL_TO_KANJI = new Map(RADICAL_TO_KANJI_CHARS);
      let inputLengths = [ 0 ];
      let result = "";
      for (let i = 0; i < input.length; ++i) {
        let c = input.charCodeAt(i);
        if (c >= 65024 && c <= 65039 || c >= 917760 && c <= 917791) {
          inputLengths[result.length] = i + 1;
          continue;
        }
        if (c >= 65377 && c <= 65439) c = HANKAKU_KATAKANA_TO_ZENKAKU[c - 65377];
        const prevChar = result.length ? result.charCodeAt(result.length - 1) : 0;
        if (c === 12441) {
          const composed = VOICED_TO_COMPOSED.get(prevChar);
          if (composed) {
            result = result.slice(0, -1);
            c = composed;
          }
        } else if (c === 12442) {
          const composed = SEMIVOICED_TO_COMPOSED.get(prevChar);
          if (composed) {
            result = result.slice(0, -1);
            c = composed;
          }
        }
        let expanded;
        if (c >= 13056 && c <= 13168) expanded = COMBINED_CHARS_A[c - 13056]; else if (c >= 13179 && c <= 13183) expanded = COMBINED_CHARS_B[c - 13179]; else if (c >= 12832 && c <= 12871) expanded = ENCLOSED_CHARS_A[c - 12832]; else if (c >= 12928 && c <= 12976) expanded = ENCLOSED_CHARS_B[c - 12928]; else if (c >= 12992 && c <= 13003) expanded = ENCLOSED_CHARS_C[c - 12992]; else if (c >= 13008 && c <= 13055) expanded = ENCLOSED_CHARS_D[c - 13008];
        const radical = !expanded ? RADICAL_TO_KANJI.get(c) : void 0;
        if (radical) expanded = String.fromCodePoint(radical);
        if (expanded) {
          result += expanded;
          inputLengths.push(...Array(expanded.length - 1).fill(i));
        } else result += String.fromCharCode(c);
        inputLengths[result.length] = i + 1;
      }
      return [ result, inputLengths ];
    }
    // src/mora.ts
        // CONCATENATED MODULE: ./node_modules/.pnpm/@birchill+jpdict-idb@2.6.1/node_modules/@birchill/jpdict-idb/dist/index.js
    // src/abort-error.ts
    var AbortError = class _AbortError extends Error {
      constructor(...params) {
        super(...params);
        Object.setPrototypeOf(this, _AbortError.prototype);
        if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, _AbortError);
        this.name = "AbortError";
      }
    };
    // src/data-series.ts
        var allDataSeries = [ "words", "kanji", "radicals", "names" ];
    var allMajorDataSeries = [ "words", "kanji", "names" ];
    // src/database.ts
    // src/download.ts
    // src/download-error.ts
    var DownloadError = class _DownloadError extends Error {
      constructor({code, url}, ...params) {
        super(...params);
        Object.setPrototypeOf(this, _DownloadError.prototype);
        if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, _DownloadError);
        this.name = "DownloadError";
        this.code = code;
        this.url = url;
      }
    };
    // src/download-version-info.ts
    // src/is-object.ts
        function jpdict_idb_dist_isObject(a) {
      return typeof a === "object" && a !== null && !Array.isArray(a);
    }
    // src/error-parsing.ts
        function isAbortError(e) {
      return jpdict_idb_dist_isObject(e) && "name" in e && e.name === "AbortError";
    }
    function isDownloadError(e) {
      return jpdict_idb_dist_isObject(e) && "name" in e && e.name === "DownloadError";
    }
    function getErrorMessage(e) {
      return jpdict_idb_dist_isObject(e) && typeof e.message === "string" ? e.message : String(e);
    }
    // src/fetch.ts
        async function fetchWithTimeout(resource, options) {
      var _a, _b;
      const controller = new AbortController;
      const onAbort = () => controller.abort();
      (_a = options == null ? void 0 : options.signal) == null ? void 0 : _a.addEventListener("abort", onAbort);
      const {timeout} = options;
      let didTimeout = false;
      let timeoutId;
      if (timeout && timeout !== 1 / 0) timeoutId = setTimeout((() => {
        didTimeout = true;
        controller.abort();
      }), timeout);
      try {
        const response = await fetch(resource, {
          ...options,
          signal: controller.signal
        });
        if (timeoutId) clearTimeout(timeoutId);
        return response;
      } catch (e) {
        if (didTimeout && isAbortError(e)) throw new DownloadError({
          code: "Timeout",
          url: typeof resource === "string" ? resource : resource.url
        }, `Download timed out after ${timeout / 1e3} second(s).`);
        throw e;
      } finally {
        (_b = options == null ? void 0 : options.signal) == null ? void 0 : _b.removeEventListener("abort", onAbort);
      }
    }
    // src/validation-helpers.ts
        var safeInteger = () => refine(integer(), "safeInteger", (value => Number.isSafeInteger(value)))
    // src/download-version-info.ts
    ;
    async function getVersionInfo({baseUrl, series, lang, majorVersion, timeout, signal}) {
      const versionInfoFile = await getVersionInfoFile({
        baseUrl,
        lang,
        timeout,
        signal
      });
      const dbVersionInfo = getCurrentVersionInfo(versionInfoFile, series, majorVersion);
      if (!dbVersionInfo) throw new DownloadError({
        code: "VersionFileInvalid"
      }, `Invalid version object: the requested series, ${series} was not available in this language ('${lang}')`);
      return dbVersionInfo;
    }
    function clearCachedVersionInfo() {
      cachedVersionInfo = void 0;
    }
    var CACHE_TIMEOUT = 3e3 * 60;
    var cachedVersionInfo;
    async function getVersionInfoFile({baseUrl, lang, timeout, signal}) {
      if ((cachedVersionInfo == null ? void 0 : cachedVersionInfo.lang) === lang && cachedVersionInfo.accessTime > Date.now() - CACHE_TIMEOUT) return cachedVersionInfo.versionInfoFile;
      cachedVersionInfo = void 0;
      const accessTime = Date.now();
      let rawVersionInfoFile;
      const url = `${baseUrl}jpdict/reader/version-${lang}.json`;
      let response;
      try {
        response = await fetchWithTimeout(url, {
          signal,
          timeout
        });
      } catch (e) {
        if (isAbortError(e) || isDownloadError(e)) throw e;
        throw new DownloadError({
          code: "VersionFileNotAccessible",
          url
        }, `Version file ${url} not accessible (${getErrorMessage(e)})`);
      }
      if (!response.ok) {
        const code = response.status === 404 ? "VersionFileNotFound" : "VersionFileNotAccessible";
        throw new DownloadError({
          code,
          url
        }, `Version file ${url} not accessible (status: ${response.status})`);
      }
      try {
        rawVersionInfoFile = await response.json();
      } catch (e) {
        throw new DownloadError({
          code: "VersionFileInvalid",
          url
        }, `Invalid version object: ${getErrorMessage(e) || "(No detailed error message)"}`);
      }
      if (signal == null ? void 0 : signal.aborted) throw new AbortError;
      const versionInfoFile = parseVersionInfoFile(rawVersionInfoFile);
      cachedVersionInfo = {
        lang,
        versionInfoFile,
        accessTime
      };
      return versionInfoFile;
    }
    var VersionInfoStruct = dist_type({
      major: dist_min(safeInteger(), 1),
      minor: dist_min(safeInteger(), 0),
      patch: dist_min(safeInteger(), 0),
      parts: optional(dist_min(safeInteger(), 1)),
      databaseVersion: optional(string()),
      dateOfCreation: nonempty(string())
    });
    var VersionInfoFileStruct = record(string(), record(string(), VersionInfoStruct));
    function parseVersionInfoFile(rawVersionInfoFile) {
      if (!rawVersionInfoFile) throw new DownloadError({
        code: "VersionFileInvalid"
      }, "Empty version info file");
      const [error, versionInfoFile] = validate(rawVersionInfoFile, VersionInfoFileStruct);
      if (error) throw new DownloadError({
        code: "VersionFileInvalid"
      }, `Version file was invalid: ${error}`);
      return versionInfoFile;
    }
    function getCurrentVersionInfo(versionInfoFile, series, majorVersion) {
      if (!(series in versionInfoFile)) return null;
      if (!(majorVersion in versionInfoFile[series])) throw new DownloadError({
        code: "MajorVersionNotFound"
      }, `No ${majorVersion}.x version information for ${series} data`);
      return versionInfoFile[series][majorVersion];
    }
    // src/ljson-stream.ts
        async function* ljsonStreamIterator({stream, signal, timeout, url}) {
      const reader = stream.getReader();
      const lineEnd = /\n|\r|\r\n/m;
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      const parseLine = line => {
        try {
          return JSON.parse(line);
        } catch {
          try {
            reader.releaseLock();
          } catch {}
          throw new DownloadError({
            code: "DatabaseFileInvalidJSON",
            url
          }, `Could not parse JSON in database file: ${line}`);
        }
      };
      while (true) {
        let readResult;
        try {
          readResult = await waitWithTimeout({
            promise: reader.read(),
            timeout,
            url
          });
        } catch (e) {
          try {
            reader.releaseLock();
          } catch {}
          if (isAbortError(e) || isDownloadError(e)) throw e;
          throw new DownloadError({
            code: "DatabaseFileNotAccessible",
            url
          }, `Could not read database file (${getErrorMessage(e)})`);
        }
        const {done, value} = readResult;
        if (done) {
          buffer += decoder.decode();
          if (buffer) {
            yield parseLine(buffer);
            buffer = "";
          }
          return;
        }
        buffer += decoder.decode(value, {
          stream: true
        });
        const lines = buffer.split(lineEnd);
        buffer = lines.length ? lines.splice(lines.length - 1, 1)[0] : "";
        for (const line of lines) {
          if (signal.aborted) throw new AbortError;
          if (!line) continue;
          yield parseLine(line);
        }
      }
    }
    function waitWithTimeout({promise, timeout, url}) {
      let timeoutId;
      const timeoutPromise = new Promise(((_, reject) => {
        timeoutId = self.setTimeout((() => {
          clearTimeout(timeoutId);
          reject(new DownloadError({
            code: "Timeout",
            url
          }, `Download timed out after ${timeout / 1e3} seconds.`));
        }), timeout);
      }));
      return Promise.race([ promise, timeoutPromise ]).then((val => {
        clearTimeout(timeoutId);
        return val;
      }));
    }
    // src/utils.ts
        function stripFields(o, fields) {
      const result = {
        ...o
      };
      for (const field of fields) delete result[field];
      return result;
    }
    // src/version-number.ts
        function compareVersions(a, b) {
      if (a.major < b.major) return -1;
      if (a.major > b.major) return 1;
      if (a.minor < b.minor) return -1;
      if (a.minor > b.minor) return 1;
      if (a.patch < b.patch) return -1;
      if (a.patch > b.patch) return 1;
      return 0;
    }
    // src/download.ts
        var BASE_URL = "https://data.10ten.life/";
    var DOWNLOAD_TIMEOUT = 2e4;
    async function hasLanguage({series, majorVersion, lang, signal}) {
      try {
        const result = await getVersionInfo({
          baseUrl: BASE_URL,
          series,
          lang,
          majorVersion,
          timeout: DOWNLOAD_TIMEOUT,
          signal
        });
        return !!result;
      } catch {
        return false;
      }
    }
    async function* download({series, majorVersion, currentVersion, lang, signal}) {
      const versionInfo = await getVersionInfo({
        baseUrl: BASE_URL,
        series,
        lang,
        majorVersion,
        timeout: DOWNLOAD_TIMEOUT,
        signal
      });
      const {files, type: type4} = getDownloadList({
        currentVersion,
        latestVersion: versionInfo
      });
      if (type4 === "reset" && currentVersion) yield {
        type: "reset"
      };
      yield {
        type: "downloadstart",
        files: files.length
      };
      for (const file of files) yield* getEvents({
        baseUrl: BASE_URL,
        series,
        lang,
        version: file.version,
        signal,
        format: file.format,
        partInfo: file.partInfo
      });
      yield {
        type: "downloadend"
      };
    }
    function getDownloadList({currentVersion, latestVersion}) {
      if (currentVersion && compareVersions(currentVersion, latestVersion) > 0) {
        const versionToString = ({major, minor, patch}) => `${major}.${minor}.${patch}`;
        throw new DownloadError({
          code: "DatabaseTooOld"
        }, `Database version (${versionToString(latestVersion)}) is older than the current version (${versionToString(currentVersion)})`);
      }
      let downloadType = !currentVersion || compareVersions(currentVersion, {
        ...latestVersion,
        patch: 0
      }) < 0 ? "reset" : "update";
      if (downloadType === "update" && (currentVersion == null ? void 0 : currentVersion.partInfo) && latestVersion.patch - currentVersion.patch > 10) downloadType = "reset";
      if (downloadType === "reset" && latestVersion.parts) {
        const files2 = [];
        let nextPart = 1;
        while (nextPart <= latestVersion.parts) {
          files2.push({
            format: "full",
            version: {
              major: latestVersion.major,
              minor: latestVersion.minor,
              patch: latestVersion.patch
            },
            partInfo: {
              part: nextPart,
              parts: latestVersion.parts
            }
          });
          nextPart++;
        }
        return {
          type: downloadType,
          files: files2
        };
      }
      if (downloadType === "reset") return {
        type: downloadType,
        files: [ {
          format: "full",
          version: {
            major: latestVersion.major,
            minor: latestVersion.minor,
            patch: latestVersion.patch
          }
        } ]
      };
      if (!currentVersion) throw new Error("We should have already dealt with the initial download case");
      const files = [];
      if (currentVersion.partInfo) {
        let nextPart = currentVersion.partInfo.part + 1;
        while (nextPart <= currentVersion.partInfo.parts) {
          files.push({
            format: "full",
            version: {
              major: currentVersion.major,
              minor: currentVersion.minor,
              patch: currentVersion.patch
            },
            partInfo: {
              part: nextPart,
              parts: currentVersion.partInfo.parts
            }
          });
          nextPart++;
        }
      }
      let nextPatch = currentVersion.patch + 1;
      while (nextPatch <= latestVersion.patch) {
        files.push({
          format: "patch",
          version: {
            major: latestVersion.major,
            minor: latestVersion.minor,
            patch: nextPatch
          }
        });
        nextPatch++;
      }
      return {
        type: downloadType,
        files
      };
    }
    var HeaderLineStruct = dist_type({
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
    var PatchLineStruct = dist_type({
      _: enums([ "+", "-", "~" ])
    });
    async function* getEvents({baseUrl, series, lang, version, signal, format, partInfo}) {
      const dottedVersion = `${version.major}.${version.minor}.${version.patch}`;
      const commonUrlStart = `${baseUrl}jpdict/reader/${series}/${lang}/${dottedVersion}`;
      const url = format === "patch" ? `${commonUrlStart}-patch.jsonl` : partInfo ? `${commonUrlStart}-${partInfo.part}.jsonl` : `${commonUrlStart}.jsonl`;
      let response;
      try {
        response = await fetchWithTimeout(url, {
          signal,
          timeout: DOWNLOAD_TIMEOUT
        });
      } catch (e) {
        if (isAbortError(e) || isDownloadError(e)) throw e;
        throw new DownloadError({
          code: "DatabaseFileNotFound",
          url
        }, `Database file ${url} not accessible (${getErrorMessage(e)})`);
      }
      if (!response.ok) {
        const code = response.status === 404 ? "DatabaseFileNotFound" : "DatabaseFileNotAccessible";
        throw new DownloadError({
          code,
          url
        }, `Database file ${url} not accessible (status: ${response.status})`);
      }
      if (response.body === null) throw new DownloadError({
        code: "DatabaseFileNotAccessible",
        url
      }, "Body is null");
      let headerRead = false;
      for await (const line of ljsonStreamIterator({
        stream: response.body,
        signal,
        timeout: DOWNLOAD_TIMEOUT,
        url
      })) if (is(line, HeaderLineStruct)) {
        if (headerRead) throw new DownloadError({
          code: "DatabaseFileHeaderDuplicate",
          url
        }, `Got duplicate database header: ${JSON.stringify(line)}`);
        if (compareVersions(line.version, version) !== 0) throw new DownloadError({
          code: "DatabaseFileVersionMismatch",
          url
        }, `Got mismatched database versions (Expected: ${JSON.stringify(version)} got: ${JSON.stringify(line.version)})`);
        if (line.part !== (partInfo == null ? void 0 : partInfo.part)) throw new DownloadError({
          code: "DatabaseFileVersionMismatch",
          url
        }, `Got mismatched database part number (Expected: ${partInfo == null ? void 0 : partInfo.part}, got: ${line.part})`);
        if (line.format !== format) throw new DownloadError({
          code: "DatabaseFileVersionMismatch",
          url
        }, `Expected to get a data file in ${format} format but got '${line.format}' format instead`);
        let fileStartEvent;
        if (line.part !== void 0) fileStartEvent = {
          type: "filestart",
          totalRecords: line.records,
          version: {
            ...line.version,
            partInfo: {
              part: line.part,
              parts: partInfo.parts
            },
            lang
          }
        }; else fileStartEvent = {
          type: "filestart",
          totalRecords: line.records,
          version: {
            ...line.version,
            lang
          }
        };
        yield fileStartEvent;
        headerRead = true;
      } else if (format === "patch" && is(line, PatchLineStruct)) {
        if (!headerRead) throw new DownloadError({
          code: "DatabaseFileHeaderMissing",
          url
        }, `Expected database version but got ${JSON.stringify(line)}`);
        const mode = line._ === "+" ? "add" : line._ === "-" ? "delete" : "change";
        yield {
          type: "record",
          mode,
          record: stripFields(line, [ "_" ])
        };
      } else if (format === "full" && jpdict_idb_dist_isObject(line)) {
        if (!headerRead) throw new DownloadError({
          code: "DatabaseFileHeaderMissing",
          url
        }, `Expected database version but got ${JSON.stringify(line)}`);
        if ("_" in line) throw new DownloadError({
          code: "DatabaseFileInvalidRecord",
          url
        }, `Got patch-like '_' field in non-patch record: ${JSON.stringify(line)}`);
        yield {
          type: "record",
          mode: "add",
          record: line
        };
      } else throw new DownloadError({
        code: "DatabaseFileInvalidRecord",
        url
      }, `Got unexpected record: ${JSON.stringify(line)}`);
      yield {
        type: "fileend"
      };
    }
    // src/store.ts
    // src/quota-exceeded-error.ts
        var QuotaExceededError = class _QuotaExceededError extends Error {
      constructor(...params) {
        super(...params);
        Object.setPrototypeOf(this, _QuotaExceededError.prototype);
        if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, _QuotaExceededError);
        this.name = "QuotaExceededError";
        this.message = "The current transaction exceeded its quota limitations.";
      }
    };
    // src/store-types.ts
    // src/japanese.ts
        function hasHiragana(str) {
      return [ ...str ].map((c => c.codePointAt(0))).some((c => c >= 12353 && c <= 12447));
    }
    // src/store-types.ts
        function toWordStoreRecord(record3) {
      const result = {
        ...record3,
        rm: record3.rm ? record3.rm.map((elem => elem === 0 ? null : elem)) : void 0,
        km: record3.km ? record3.km.map((elem => elem === 0 ? null : elem)) : void 0,
        h: keysToHiragana([ ...record3.k || [], ...record3.r ]),
        kc: [],
        gt_en: [],
        gt_l: []
      };
      if (!result.rm) delete result.rm;
      if (!result.km) delete result.km;
      return result;
    }
    function getStoreIdForWordRecord(record3) {
      return record3.id;
    }
    function toNameStoreRecord(entry) {
      return {
        ...entry,
        h: keysToHiragana([ ...entry.k || [], ...entry.r ])
      };
    }
    function getStoreIdForNameRecord(record3) {
      return record3.id;
    }
    function toKanjiStoreRecord(record3) {
      return {
        ...record3,
        c: record3.c.codePointAt(0)
      };
    }
    function getStoreIdForKanjiRecord(record3) {
      return record3.c.codePointAt(0);
    }
    function toRadicalStoreRecord(record3) {
      return record3;
    }
    function getStoreIdForRadicalRecord(record3) {
      return record3.id;
    }
    function keysToHiragana(values) {
      return Array.from(new Set(values.map((value => kanaToHiragana(value))).filter(hasHiragana)));
    }
    // src/store.ts
        function getVersionKey(series) {
      switch (series) {
       case "words":
        return 4;

       case "kanji":
        return 1;

       case "radicals":
        return 2;

       case "names":
        return 3;
      }
    }
    var JpdictStore = class {
      constructor() {
        this.state = "idle";
        this.toStoreRecord = {
          words: toWordStoreRecord,
          names: toNameStoreRecord,
          kanji: toKanjiStoreRecord,
          radicals: toRadicalStoreRecord
        };
        this.getStoreId = {
          words: getStoreIdForWordRecord,
          names: getStoreIdForNameRecord,
          kanji: getStoreIdForKanjiRecord,
          radicals: getStoreIdForRadicalRecord
        };
      }
      async open() {
        if (this.state === "open") return this.db;
        if (this.state === "opening") return this.openPromise;
        if (this.state === "deleting") await this.deletePromise;
        this.state = "opening";
        const self2 = this;
        this.openPromise = openDB("jpdict", 4, {
          upgrade(db, oldVersion, _newVersion, transaction) {
            if (oldVersion < 1) {
              const kanjiTable = db.createObjectStore("kanji", {
                keyPath: "c"
              });
              kanjiTable.createIndex("r.on", "r.on", {
                multiEntry: true
              });
              kanjiTable.createIndex("r.kun", "r.kun", {
                multiEntry: true
              });
              kanjiTable.createIndex("r.na", "r.na", {
                multiEntry: true
              });
              const radicalsTable = db.createObjectStore("radicals", {
                keyPath: "id"
              });
              radicalsTable.createIndex("r", "r");
              radicalsTable.createIndex("b", "b");
              radicalsTable.createIndex("k", "k");
              db.createObjectStore("version", {
                keyPath: "id"
              });
            }
            if (oldVersion < 2) {
              const namesTable = db.createObjectStore("names", {
                keyPath: "id"
              });
              namesTable.createIndex("k", "k", {
                multiEntry: true
              });
              namesTable.createIndex("r", "r", {
                multiEntry: true
              });
            }
            if (oldVersion < 3) {
              const namesTable = transaction.objectStore("names");
              namesTable.createIndex("h", "h", {
                multiEntry: true
              });
            }
            if (oldVersion < 4) {
              const wordsTable = db.createObjectStore("words", {
                keyPath: "id"
              });
              wordsTable.createIndex("k", "k", {
                multiEntry: true
              });
              wordsTable.createIndex("r", "r", {
                multiEntry: true
              });
              wordsTable.createIndex("h", "h", {
                multiEntry: true
              });
              wordsTable.createIndex("kc", "kc", {
                multiEntry: true
              });
              wordsTable.createIndex("gt_en", "gt_en", {
                multiEntry: true
              });
              wordsTable.createIndex("gt_l", "gt_l", {
                multiEntry: true
              });
            }
          },
          blocked() {
            console.log("Opening blocked");
          },
          blocking() {
            if (self2.db) {
              try {
                self2.db.close();
              } catch {}
              self2.db = void 0;
              self2.state = "idle";
            }
          }
        }).then((db => {
          self2.db = db;
          self2.state = "open";
          return db;
        }));
        try {
          await this.openPromise;
        } catch (e) {
          this.state = "error";
          throw e;
        } finally {
          this.openPromise = void 0;
        }
        deleteDB("KanjiStore").catch((() => {}));
        return this.db;
      }
      async close() {
        var _a;
        if (this.state === "idle") return;
        if (this.state === "deleting") return this.deletePromise;
        if (this.state === "opening") await this.openPromise;
        (_a = this.db) == null ? void 0 : _a.close();
        this.db = void 0;
        this.state = "idle";
      }
      async destroy() {
        if (this.state !== "idle") await this.close();
        this.state = "deleting";
        this.deletePromise = deleteDB("jpdict", {
          blocked() {
            console.log("Deletion blocked");
          }
        });
        await this.deletePromise;
        this.deletePromise = void 0;
        this.state = "idle";
      }
      async clearSeries(series) {
        const db = await this.open();
        const tx = db.transaction([ series, "version" ], "readwrite");
        try {
          const targetTable = tx.objectStore(series);
          await targetTable.clear();
          const versionTable = tx.objectStore("version");
          const id = getVersionKey(series);
          void versionTable.delete(id);
        } catch (e) {
          console.error(`Error deleting data series '${series}'`, e);
          tx.done.catch((() => {}));
          try {
            tx.abort();
          } catch {}
          throw e;
        }
        await tx.done;
      }
      async getDataVersion(series) {
        await this.open();
        const key = getVersionKey(series);
        const versionDoc = await this.db.get("version", key);
        if (!versionDoc) return null;
        return stripFields(versionDoc, [ "id" ]);
      }
      async updateDataVersion({series, version}) {
        await this.open();
        try {
          const id = getVersionKey(series);
          await this.db.put("version", {
            ...version,
            id
          });
        } catch (e) {
          console.error(`Error updating version of '${series}' to ${JSON.stringify(version)}`, e);
          throw e;
        }
      }
      async updateSeries({series, updates}) {
        await this.open();
        const tx = this.db.transaction(series, "readwrite", {
          durability: "relaxed"
        });
        const table = tx.store;
        try {
          for (const update2 of updates) if (update2.mode === "delete") void table.delete(this.getStoreId[series](update2.record)); else void table.put(this.toStoreRecord[series](update2.record));
          await tx.done;
        } catch (e) {
          console.error(`Error updating series ${series}`, e);
          tx.done.catch((() => {}));
          try {
            tx.abort();
          } catch {}
          if (isVeryGenericError(e) && await atOrNearQuota()) {
            console.info("Detected generic error masking a quota exceeded situation");
            throw new QuotaExceededError;
          }
          throw e;
        }
      }
      // Test API
      async _getKanji(kanji) {
        await this.open();
        const result = [];
        {
          const tx = this.db.transaction("kanji");
          for (const c of kanji) {
            const record3 = await tx.store.get(c);
            if (record3) result.push(record3);
          }
        }
        return result;
      }
    };
    function isVeryGenericError(e) {
      if (typeof e === "undefined") return true;
      return e instanceof Error && !(e == null ? void 0 : e.name) || (e == null ? void 0 : e.name) === "Error" && !(e == null ? void 0 : e.message);
    }
    async function atOrNearQuota() {
      try {
        const estimate = await self.navigator.storage.estimate();
        return typeof estimate.usage !== "undefined" && typeof estimate.quota !== "undefined" && estimate.usage / estimate.quota > 0.9;
      } catch {
        return false;
      }
    }
    // src/update-state-reducer.ts
        function reducer(state, action) {
      switch (action.type) {
       case "start":
        return {
          type: "checking",
          series: action.series,
          lastCheck: state.lastCheck
        };

       case "end":
        return {
          type: "idle",
          lastCheck: action.checkDate
        };

       case "error":
        return {
          type: "idle",
          lastCheck: action.checkDate || state.lastCheck
        };

       case "updatestart":
       case "updateend":
        return state;

       case "filestart":
        if (state.type === "idle") {
          console.error("Should not get filestart event in the idle state");
          return state;
        }
        return {
          type: "updating",
          series: state.series,
          version: action.version,
          fileProgress: 0,
          totalProgress: state.type === "updating" ? state.totalProgress : 0,
          lastCheck: state.lastCheck
        };

       case "fileend":
        return state;

       case "progress":
        if (state.type !== "updating") {
          console.error(`Should not get progress event in '${state.type}' state`);
          return state;
        }
        return {
          ...state,
          fileProgress: action.fileProgress,
          totalProgress: action.totalProgress
        };

       case "parseerror":
        return state;
      }
    }
    // src/download-types.ts
        var KanjiMetaSchema = dist_type({
      i: optional(dist_array(string())),
      p: optional(dist_array(string())),
      bv: optional(string()),
      bg: optional(string())
    });
    var AccentSchema = dist_type({
      i: dist_min(safeInteger(), 0),
      pos: optional(dist_array(string()))
    });
    var ReadingMetaSchema = dist_type({
      i: optional(dist_array(string())),
      p: optional(dist_array(string())),
      app: optional(dist_min(safeInteger(), 0)),
      a: optional(union([ dist_min(safeInteger(), 0), dist_array(AccentSchema) ])),
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
      g: nonempty(dist_array(nonempty(string()))),
      gt: optional(dist_min(safeInteger(), 1)),
      lang: optional(nonempty(string())),
      kapp: optional(dist_min(safeInteger(), 0)),
      rapp: optional(dist_min(safeInteger(), 0)),
      pos: optional(dist_array(string())),
      field: optional(dist_array(string())),
      misc: optional(dist_array(string())),
      dial: optional(dist_array(string())),
      inf: optional(nonempty(string())),
      xref: optional(nonempty(dist_array(CrossReferenceSchema))),
      ant: optional(nonempty(dist_array(CrossReferenceSchema))),
      lsrc: optional(nonempty(dist_array(LangSourceSchema)))
    });
    var WordIdSchema = dist_min(safeInteger(), 1);
    var WordDownloadRecordSchema = dist_type({
      id: WordIdSchema,
      k: optional(nonempty(dist_array(string()))),
      km: optional(nonempty(dist_array(union([ literal(0), KanjiMetaSchema ])))),
      r: dist_array(nonempty(nonempty(string()))),
      rm: optional(nonempty(dist_array(union([ literal(0), ReadingMetaSchema ])))),
      s: dist_array(WordSenseSchema)
    });
    function validateWordDownloadRecord(record3) {
      return validate(record3, WordDownloadRecordSchema);
    }
    var WordDownloadDeleteRecordSchema = dist_type({
      id: WordIdSchema
    });
    function validateWordDownloadDeleteRecord(record3) {
      return validate(record3, WordDownloadDeleteRecordSchema);
    }
    var NameTranslationSchema = dist_type({
      type: optional(dist_array(string())),
      det: dist_array(nonempty(string())),
      cf: optional(dist_array(nonempty(string())))
    });
    var NameIdSchema = dist_min(safeInteger(), 1);
    var NameDownloadRecordSchema = dist_type({
      id: NameIdSchema,
      k: optional(dist_array(nonempty(string()))),
      r: nonempty(dist_array(nonempty(string()))),
      tr: dist_array(NameTranslationSchema)
    });
    function validateNameDownloadRecord(record3) {
      return validate(record3, NameDownloadRecordSchema);
    }
    var NameDownloadDeleteRecordSchema = dist_type({
      id: NameIdSchema
    });
    function validateNameDownloadDeleteRecord(record3) {
      return validate(record3, NameDownloadDeleteRecordSchema);
    }
    var ReadingsStruct = dist_type({
      on: optional(dist_array(string())),
      kun: optional(dist_array(string())),
      na: optional(dist_array(string())),
      py: optional(dist_array(string()))
    });
    var RadicalStruct = dist_type({
      x: dist_min(safeInteger(), 0),
      nelson: optional(dist_min(safeInteger(), 0)),
      name: optional(dist_array(string())),
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
      meta: optional(dist_array(string()))
    });
    var KanjiIdSchema = nonempty(string());
    var KanjiDownloadRecordSchema = dist_type({
      c: KanjiIdSchema,
      r: ReadingsStruct,
      m: dist_array(string()),
      m_lang: optional(string()),
      rad: RadicalStruct,
      refs: record(string(), union([ string(), dist_number() ])),
      misc: MiscSchema,
      st: optional(string()),
      comp: optional(string()),
      var: optional(dist_array(string())),
      cf: optional(union([ string(), dist_array(string()) ]))
    });
    function validateKanjiDownloadRecord(record3) {
      return validate(record3, KanjiDownloadRecordSchema);
    }
    var KanjiDownloadDeleteRecordSchema = dist_type({
      c: KanjiIdSchema
    });
    function validateKanjiDownloadDeleteRecord(record3) {
      return validate(record3, KanjiDownloadDeleteRecordSchema);
    }
    var RadicalIdSchema = nonempty(string());
    var RadicalDownloadRecordSchema = dist_type({
      id: RadicalIdSchema,
      r: dist_min(safeInteger(), 1),
      b: optional(nonempty(string())),
      k: optional(nonempty(string())),
      pua: optional(safeInteger()),
      s: safeInteger(),
      na: dist_array(nonempty(string())),
      posn: optional(nonempty(string())),
      m: dist_array(nonempty(string())),
      m_lang: optional(nonempty(string()))
    });
    function validateRadicalDownloadRecord(record3) {
      return validate(record3, RadicalDownloadRecordSchema);
    }
    var RadicalDownloadDeleteRecordSchema = dist_type({
      id: RadicalIdSchema
    });
    function validateRadicalDownloadDeleteRecord(record3) {
      return validate(record3, RadicalDownloadDeleteRecordSchema);
    }
    var validateDownloadRecordMapping = {
      words: validateWordDownloadRecord,
      names: validateNameDownloadRecord,
      kanji: validateKanjiDownloadRecord,
      radicals: validateRadicalDownloadRecord
    };
    function validateDownloadRecord({series, record: record3}) {
      return validateDownloadRecordMapping[series](record3);
    }
    var validateDownloadDeleteRecordMapping = {
      words: validateWordDownloadDeleteRecord,
      names: validateNameDownloadDeleteRecord,
      kanji: validateKanjiDownloadDeleteRecord,
      radicals: validateRadicalDownloadDeleteRecord
    };
    function validateDownloadDeleteRecord({series, record: record3}) {
      return validateDownloadDeleteRecordMapping[series](record3);
    }
    // src/update.ts
        var BATCH_SIZE = 4e3;
    var MAX_PROGRESS_RESOLUTION = 0.01;
    async function update({callback, currentVersion, lang, majorVersion, series, signal, store}) {
      return doUpdate({
        callback,
        currentVersion,
        lang,
        majorVersion,
        series,
        signal,
        store
      });
    }
    async function doUpdate({callback, currentVersion, lang, majorVersion, series, signal, store}) {
      if (!currentVersion) await store.clearSeries(series);
      let currentFile = 0;
      let currentFileVersion;
      let totalFiles = 0;
      let currentRecord = 0;
      let totalRecords = 0;
      let updates = [];
      let lastReportedTotalProgress;
      for await (const event of download({
        series,
        majorVersion,
        currentVersion,
        lang,
        signal
      })) {
        if (signal.aborted) throw new AbortError;
        switch (event.type) {
         case "reset":
          await store.clearSeries(series);
          break;

         case "downloadstart":
          totalFiles = event.files;
          callback({
            type: "updatestart"
          });
          break;

         case "downloadend":
          callback({
            type: "updateend"
          });
          break;

         case "filestart":
          currentFile++;
          currentRecord = 0;
          totalRecords = event.totalRecords;
          currentFileVersion = event.version;
          callback({
            type: "filestart",
            version: event.version
          });
          if (currentFile === 1) {
            callback({
              type: "progress",
              fileProgress: 0,
              totalProgress: 0
            });
            lastReportedTotalProgress = 0;
          }
          break;

         case "fileend":
          {
            if (updates.length) {
              await store.updateSeries({
                series,
                updates
              });
              updates = [];
            }
            const versionToWrite = currentFileVersion;
            if (versionToWrite.partInfo && versionToWrite.partInfo.part === versionToWrite.partInfo.parts) delete versionToWrite.partInfo;
            await store.updateDataVersion({
              series,
              version: versionToWrite
            });
            const totalProgress = currentFile / totalFiles;
            callback({
              type: "progress",
              fileProgress: 1,
              totalProgress
            });
            lastReportedTotalProgress = totalProgress;
            callback({
              type: "fileend",
              version: versionToWrite
            });
          }
          break;

         case "record":
          {
            const [error, update2] = parseRecordEvent({
              series,
              event
            });
            if (error) callback({
              type: "parseerror",
              message: error.message,
              record: event.record
            }); else {
              updates.push(update2);
              if (updates.length >= BATCH_SIZE) {
                await store.updateSeries({
                  series,
                  updates
                });
                updates = [];
              }
            }
            currentRecord++;
            const fileProgress = currentRecord / totalRecords;
            const totalProgress = (currentFile - 1 + fileProgress) / totalFiles;
            if (
            // Don't dispatch a 100% file progress event until after we've
            // updated the version database (as part of processing the 'fileend'
            // event.)
            fileProgress < 1 && (lastReportedTotalProgress === void 0 || totalProgress - lastReportedTotalProgress > MAX_PROGRESS_RESOLUTION)) {
              callback({
                type: "progress",
                fileProgress,
                totalProgress
              });
              lastReportedTotalProgress = totalProgress;
            }
          }
          break;
        }
      }
    }
    function parseRecordEvent({series, event}) {
      const {mode, record: unvalidatedRecord} = event;
      if (mode === "delete") {
        const [err2, record4] = validateDownloadDeleteRecord({
          series,
          record: unvalidatedRecord
        });
        return err2 ? [ err2, void 0 ] : [ void 0, {
          mode,
          record: record4
        } ];
      }
      const [err, record3] = validateDownloadRecord({
        series,
        record: unvalidatedRecord
      });
      return err ? [ err, void 0 ] : [ void 0, {
        mode,
        record: record3
      } ];
    }
    // src/database.ts
        var MAJOR_VERSION = {
      kanji: 4,
      radicals: 4,
      names: 3,
      words: 2
    };
    var JpdictIdb = class {
      // -------------------------------------------------------------------------
      // Initialization
      // -------------------------------------------------------------------------
      constructor({verbose = false} = {}) {
        this.kanji = {
          state: "init",
          version: null,
          updateState: {
            type: "idle",
            lastCheck: null
          }
        };
        this.radicals = {
          state: "init",
          version: null,
          updateState: {
            type: "idle",
            lastCheck: null
          }
        };
        this.names = {
          state: "init",
          version: null,
          updateState: {
            type: "idle",
            lastCheck: null
          }
        };
        this.words = {
          state: "init",
          version: null,
          updateState: {
            type: "idle",
            lastCheck: null
          }
        };
        this.verbose = false;
        this.changeListeners = [];
        this.inProgressUpdates = {
          words: void 0,
          kanji: void 0,
          names: void 0
        };
        this.store = new JpdictStore;
        this.verbose = verbose;
        this.readyPromise = (async () => {
          try {
            for (const series of allDataSeries) {
              const dataVersion = await this.store.getDataVersion(series);
              this.updateDataVersion(series, dataVersion);
            }
          } catch (e) {
            console.error("Failed to open IndexedDB");
            console.error(e);
            for (const series of allDataSeries) this[series] = {
              ...this[series],
              state: "unavailable",
              version: null
            };
            throw e;
          } finally {
            this.notifyChanged("stateupdated");
          }
        })();
      }
      get ready() {
        return this.readyPromise;
      }
      // -------------------------------------------------------------------------
      // Destruction
      // -------------------------------------------------------------------------
      async destroy() {
        try {
          await this.ready;
        } catch {}
        const hasData = allDataSeries.some((key => this[key].state !== "unavailable"));
        if (hasData) await this.store.destroy();
        const hasInProgressUpdate = allMajorDataSeries.some((s5 => typeof this.inProgressUpdates[s5] !== "undefined"));
        if (this.verbose && hasInProgressUpdate) console.info("Destroying database while there is an in-progress update");
        this.store = new JpdictStore;
        for (const series of allDataSeries) this[series] = {
          state: "empty",
          version: null,
          updateState: {
            type: "idle",
            lastCheck: null
          }
        };
        this.notifyChanged("deleted");
      }
      async deleteSeries(series) {
        if (this.inProgressUpdates[series]) this.cancelUpdate(series);
        await this.store.clearSeries(series);
        this.updateDataVersion(series, null);
        if (series === "kanji") {
          await this.store.clearSeries("radicals");
          this.updateDataVersion("radicals", null);
        }
      }
      // -------------------------------------------------------------------------
      // Change listeners
      // -------------------------------------------------------------------------
      addChangeListener(callback) {
        if (this.changeListeners.indexOf(callback) !== -1) return;
        this.changeListeners.push(callback);
      }
      removeChangeListener(callback) {
        const index = this.changeListeners.indexOf(callback);
        if (index === -1) return;
        this.changeListeners.splice(index, 1);
      }
      notifyChanged(topic) {
        const changeListeners = this.changeListeners.slice();
        for (const callback of changeListeners) callback(topic);
      }
      // -------------------------------------------------------------------------
      // Updating
      // -------------------------------------------------------------------------
      async update({series, lang}) {
        const existingUpdate = this.inProgressUpdates[series];
        if (existingUpdate && existingUpdate.lang === lang) {
          if (this.verbose) console.info(`Detected overlapping update for '${series}' series. Re-using existing update.`);
          return existingUpdate.promise;
        }
        if (existingUpdate) {
          if (this.verbose) console.info(`Cancelling existing update for '${series}' series since the requested language (${lang}) doesn't match that of the existing update(${existingUpdate.lang})`);
          this.cancelUpdate(series);
        }
        const controller = new AbortController;
        const signal = controller.signal;
        const updatePromise = (async () => {
          await this.ready;
          if (signal.aborted) throw new AbortError;
          switch (series) {
           case "words":
            await this.doUpdate({
              series: "words",
              signal,
              lang
            });
            break;

           case "kanji":
            await this.doUpdate({
              series: "kanji",
              signal,
              lang
            });
            if (signal.aborted) throw new AbortError;
            await this.doUpdate({
              series: "radicals",
              signal,
              lang
            });
            break;

           case "names":
            await this.doUpdate({
              series: "names",
              signal,
              lang
            });
            break;
          }
          if (signal.aborted) throw new AbortError;
        })();
        this.inProgressUpdates[series] = {
          lang,
          controller,
          promise: updatePromise.catch((() => {})).finally((() => {
            if (this.inProgressUpdates[series] && this.inProgressUpdates[series].lang === lang) this.inProgressUpdates[series] = void 0;
            this.notifyChanged("stateupdated");
          }))
        };
        return updatePromise;
      }
      async doUpdate({series, signal, lang: requestedLang}) {
        var _a;
        let wroteSomething = false;
        const reducer2 = action => {
          this[series].updateState = reducer(this[series].updateState, action);
          if (action.type === "fileend") {
            wroteSomething = true;
            this.updateDataVersion(series, action.version);
          }
          if (action.type === "parseerror" && this.verbose) console.warn("Encountered parse error", action.message, action.record);
          this.notifyChanged("stateupdated");
        };
        if (signal.aborted) {
          reducer2({
            type: "error",
            checkDate: null
          });
          throw new AbortError;
        }
        const checkDate =  new Date;
        try {
          reducer2({
            type: "start",
            series
          });
          const lang = requestedLang !== "en" && await hasLanguage({
            series,
            lang: requestedLang,
            majorVersion: MAJOR_VERSION[series],
            signal
          }) ? requestedLang : "en";
          const currentLang = this[series].state === "ok" ? (_a = this[series].version) == null ? void 0 : _a.lang : void 0;
          if (currentLang && currentLang !== lang) {
            if (this.verbose) console.info(`Clobbering '${series}' data to change lang to '${lang}'`);
            await this.store.clearSeries(series);
            this.updateDataVersion(series, null);
          }
          if (signal.aborted) throw new AbortError;
          if (this.verbose) console.info(`Requesting download for '${series}' series with current version ${JSON.stringify(this[series].version || void 0)}`);
          await update({
            callback: reducer2,
            currentVersion: this[series].version || void 0,
            lang,
            majorVersion: MAJOR_VERSION[series],
            signal,
            series,
            store: this.store
          });
          if (signal.aborted) throw new AbortError;
          reducer2({
            type: "end",
            checkDate
          });
        } catch (e) {
          reducer2({
            type: "error",
            checkDate: wroteSomething ? checkDate : null
          });
          throw e;
        }
      }
      updateDataVersion(series, version) {
        if (this[series].state !== "init" && this[series].state !== "unavailable" && (0, 
        dist.jsonEqualish)(this[series].version, version)) return;
        this[series].version = version;
        this[series].state = version ? "ok" : "empty";
        this.notifyChanged("stateupdated");
      }
      cancelUpdate(series) {
        const inProgressUpdate = this.inProgressUpdates[series];
        if (!inProgressUpdate) return false;
        inProgressUpdate.controller.abort();
        return true;
      }
      // -------------------------------------------------------------------------
      // Misc
      // -------------------------------------------------------------------------
      get isVerbose() {
        return this.verbose;
      }
    };
    // src/tokenizer.ts
        // src/offline-error.ts
    var OfflineError = class _OfflineError extends Error {
      constructor(...params) {
        super(...params);
        Object.setPrototypeOf(this, _OfflineError.prototype);
        if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, _OfflineError);
        this.name = "OfflineError";
      }
    };
    // src/query.ts
    // src/to-word-result.ts
    // src/words.ts
        var GlossTypes = [ "none", "expl", "lit", "fig", "tm" ];
    var GLOSS_TYPE_MAX = GlossTypes.length;
    var BITS_PER_GLOSS_TYPE = Math.floor(Math.log2(GLOSS_TYPE_MAX)) + 1;
    // src/to-word-result.ts
    function toWordResult(record3, search, matchMode) {
      let kanjiMatches, kanjiMatchRanges, kanaMatches, kanaMatchRanges, senseMatches;
      if (typeof search !== "string") [kanjiMatches, kanjiMatchRanges, kanaMatches, kanaMatchRanges, senseMatches] = getMatchMetadataForCrossRefLookup(record3, search, matchMode); else [kanjiMatches, kanjiMatchRanges, kanaMatches, kanaMatchRanges, senseMatches] = getMatchMetadata(record3, search, matchMode);
      return makeWordResult(record3, kanjiMatches, kanjiMatchRanges, kanaMatches, kanaMatchRanges, senseMatches, []);
    }
    function makeWordResult(record3, kanjiMatches, kanjiMatchRanges, kanaMatches, kanaMatchRanges, senseMatches, matchedGlossRanges) {
      return {
        id: record3.id,
        k: mergeMeta(record3.k, record3.km, kanjiMatches, kanjiMatchRanges, ((key, match, matchRange, meta) => {
          var _a;
          const result = {
            ent: key,
            ...meta ? stripFields(meta, [ "bv", "bg" ]) : void 0,
            match
          };
          let wk;
          let bv;
          let bg;
          const p = (_a = meta == null ? void 0 : meta.p) == null ? void 0 : _a.filter((p2 => {
            if (/^wk\d+$/.test(p2)) {
              const wkLevel = parseInt(p2.slice(2), 10);
              if (typeof wk === "undefined" || wkLevel < wk) wk = wkLevel;
              return false;
            }
            if (/^bv\d+$/.test(p2)) {
              const bvLevel = parseInt(p2.slice(2), 10);
              if (typeof bv === "undefined" || bvLevel < bv) bv = bvLevel;
              return false;
            }
            if (/^bg\d+$/.test(p2)) {
              const bgLevel = parseInt(p2.slice(2), 10);
              if (typeof bg === "undefined" || bgLevel < bg) bg = bgLevel;
              return false;
            }
            return true;
          }));
          if (p == null ? void 0 : p.length) result.p = p; else delete result.p;
          if (wk) result.wk = wk;
          if (typeof bv === "number") result.bv = Object.assign({
            l: bv
          }, (meta == null ? void 0 : meta.bv) ? {
            src: meta == null ? void 0 : meta.bv
          } : void 0);
          if (typeof bg === "number") result.bg = Object.assign({
            l: bg
          }, (meta == null ? void 0 : meta.bg) ? {
            src: meta == null ? void 0 : meta.bg
          } : void 0);
          if (matchRange) result.matchRange = matchRange;
          return result;
        })),
        r: mergeMeta(record3.r, record3.rm, kanaMatches, kanaMatchRanges, ((key, match, matchRange, meta) => {
          var _a;
          const result = {
            ent: key,
            ...meta ? stripFields(meta, [ "bv", "bg" ]) : void 0,
            match
          };
          let bv;
          let bg;
          const p = (_a = meta == null ? void 0 : meta.p) == null ? void 0 : _a.filter((p2 => {
            if (/^bv\d+$/.test(p2)) {
              const bvLevel = parseInt(p2.slice(2), 10);
              if (typeof bv === "undefined" || bvLevel < bv) bv = bvLevel;
              return false;
            }
            if (/^bg\d+$/.test(p2)) {
              const bgLevel = parseInt(p2.slice(2), 10);
              if (typeof bg === "undefined" || bgLevel < bg) bg = bgLevel;
              return false;
            }
            return true;
          }));
          if (p == null ? void 0 : p.length) result.p = p; else delete result.p;
          if (typeof bv === "number") result.bv = Object.assign({
            l: bv
          }, (meta == null ? void 0 : meta.bv) ? {
            src: meta == null ? void 0 : meta.bv
          } : void 0);
          if (typeof bg === "number") result.bg = Object.assign({
            l: bg
          }, (meta == null ? void 0 : meta.bg) ? {
            src: meta == null ? void 0 : meta.bg
          } : void 0);
          if (matchRange) result.matchRange = matchRange;
          return result;
        })),
        s: expandSenses(record3.s, senseMatches, matchedGlossRanges)
      };
    }
    function getMatchMetadata(record3, search, matchMode) {
      var _a, _b, _c, _d, _e, _f, _g;
      const matcher = str => {
        switch (matchMode) {
         case "lexeme":
          return str === search;

         case "kana-equivalent":
          return kanaToHiragana(str) === search;

         case "starts-with":
          return str.startsWith(search);

         case "starts-with-kana-equivalent":
          return kanaToHiragana(str).startsWith(search);

         case "kanji":
          return [ ...str ].includes(search);
        }
      };
      let kanjiMatches = arrayToBitfield(record3.k || [], matcher);
      const kanjiMatchRanges = [];
      let searchOnlyHeadwordMatch = false;
      for (let i = 0; i < (((_a = record3.k) == null ? void 0 : _a.length) || 0); i++) if (kanjiMatches & 1 << i) {
        switch (matchMode) {
         case "lexeme":
         case "kana-equivalent":
         case "starts-with":
         case "starts-with-kana-equivalent":
          kanjiMatchRanges.push([ i, 0, search.length ]);
          break;

         case "kanji":
          {
            const index = [ ...record3.k[i] ].indexOf(search);
            kanjiMatchRanges.push([ i, index, index + 1 ]);
          }
          break;
        }
        searchOnlyHeadwordMatch || (searchOnlyHeadwordMatch = !!((_d = (_c = (_b = record3.km) == null ? void 0 : _b[i]) == null ? void 0 : _c.i) == null ? void 0 : _d.includes("sK")));
      }
      let kanaMatches = 0;
      let senseMatches = 0;
      const kanaMatchRanges = [];
      if (kanjiMatches) {
        kanaMatches = kanaMatchesForKanji(record3, kanjiMatches);
        senseMatches = arrayToBitfield(record3.s, (sense => {
          if (searchOnlyHeadwordMatch) return true;
          if (typeof sense.kapp !== "undefined") return !!(sense.kapp & kanjiMatches); else if (typeof sense.rapp !== "undefined") return !!(sense.rapp & kanaMatches); else return true;
        }));
      } else if (matchMode === "lexeme" || matchMode === "kana-equivalent" || matchMode === "starts-with" || matchMode === "starts-with-kana-equivalent") {
        kanaMatches = arrayToBitfield(record3.r, matcher);
        kanjiMatches = kanjiMatchesForKana(record3, kanaMatches);
        for (let i = 0; i < record3.r.length; i++) if (kanaMatches & 1 << i) {
          kanaMatchRanges.push([ i, 0, search.length ]);
          searchOnlyHeadwordMatch || (searchOnlyHeadwordMatch = !!((_g = (_f = (_e = record3.rm) == null ? void 0 : _e[i]) == null ? void 0 : _f.i) == null ? void 0 : _g.includes("sk")));
        }
        senseMatches = arrayToBitfield(record3.s, (sense => {
          if (searchOnlyHeadwordMatch) return true;
          if (typeof sense.rapp !== "undefined") return !!(sense.rapp & kanaMatches); else if (typeof sense.kapp !== "undefined") return !!(sense.kapp & kanjiMatches); else return true;
        }));
      }
      return [ kanjiMatches, kanjiMatchRanges, kanaMatches, kanaMatchRanges, senseMatches ];
    }
    function getMatchMetadataForCrossRefLookup(record3, xref, matchMode) {
      var _a;
      let kanjiMatches = 0;
      let kanjiMatchRanges = [];
      let kanaMatches = 0;
      let kanaMatchRanges = [];
      let senseMatches = 0;
      const xRefK = xref.k;
      const xRefR = xref.r;
      if (xRefK && xRefR) {
        kanjiMatches = arrayToBitfield(record3.k || [], (k => k === xRefK));
        for (let i = 0; i < (((_a = record3.k) == null ? void 0 : _a.length) || 0); i++) if (kanjiMatches & 1 << i) kanjiMatchRanges.push([ i, 0, xRefK.length ]);
        kanaMatches = arrayToBitfield(record3.r, (r => r === xRefR));
        for (let i = 0; i < record3.r.length; i++) if (kanaMatches & 1 << i) kanaMatchRanges.push([ i, 0, xRefR.length ]);
        senseMatches = arrayToBitfield(record3.s, (sense => {
          if (typeof sense.kapp !== "undefined") return !!(sense.kapp & kanjiMatches); else if (typeof sense.rapp !== "undefined") return !!(sense.rapp & kanaMatches); else return true;
        }));
      } else [kanjiMatches, kanjiMatchRanges, kanaMatches, kanaMatchRanges, senseMatches] = getMatchMetadata(record3, xRefK || xRefR, matchMode);
      if (xref.sense) senseMatches = 1 << xref.sense - 1;
      return [ kanjiMatches, kanjiMatchRanges, kanaMatches, kanaMatchRanges, senseMatches ];
    }
    function kanaMatchesForKanji(record3, kanjiMatches) {
      const kanaIsMatch = rm => !rm || typeof rm.app === "undefined" || !!(rm.app & kanjiMatches);
      return arrayToBitfield(
      // We need to extend the rm array with nulls so that any readings without
      // meta fields are treated as applying to all kanji.
      extendWithNulls(record3.rm || [], record3.r.length), kanaIsMatch);
    }
    function extendWithNulls(arr, len) {
      const extra = Math.max(len - arr.length, 0);
      return arr.concat(Array(extra).fill(null));
    }
    function kanjiMatchesForKana(record3, kanaMatches) {
      const wildCardMatch = (1 << (record3.k || []).length) - 1;
      const matchingKanjiAtIndex = i => {
        var _a;
        if (!record3.rm || record3.rm.length < i + 1 || record3.rm[i] === null) return wildCardMatch;
        return (_a = record3.rm[i].app) != null ? _a : wildCardMatch;
      };
      let matches = 0;
      for (let i = 0; i < record3.r.length; i++) matches |= kanaMatches & 1 << i ? matchingKanjiAtIndex(i) : 0;
      return matches;
    }
    function arrayToBitfield(arr, test) {
      return arr.reduce(((value, elem, i) => test(elem) ? value | 1 << i : value), 0);
    }
    function mergeMeta(keys, metaArray, matches, matchRanges, merge) {
      var _a;
      const result = [];
      for (const [i, key] of (keys || []).entries()) {
        const match = !!(matches & 1 << i);
        const meta = metaArray && metaArray.length >= i + 1 && metaArray[i] !== null ? metaArray[i] : void 0;
        const matchRange = (_a = matchRanges.find((item => item[0] === i))) == null ? void 0 : _a.slice(1);
        result.push(merge(key, match, matchRange, meta));
      }
      return result;
    }
    function expandSenses(senses, senseMatches, matchedGlossRanges) {
      const getRangesForSense = i => matchedGlossRanges.filter((([senseIndex]) => senseIndex === i)).map((([, gloss, start, end]) => [ gloss, start, end ]));
      return senses.map(((sense, i) => ({
        g: expandGlosses(sense, getRangesForSense(i)),
        ...stripFields(sense, [ "g", "gt" ]),
        match: !!(senseMatches & 1 << i)
      })));
    }
    function expandGlosses(sense, matchedRanges) {
      const gt = sense.gt || 0;
      const typeMask = (1 << BITS_PER_GLOSS_TYPE) - 1;
      const glossTypeAtIndex = i => GlossTypes[gt >> i * BITS_PER_GLOSS_TYPE & typeMask];
      return sense.g.map(((gloss, i) => {
        const result = {
          str: gloss
        };
        const type4 = glossTypeAtIndex(i);
        if (type4 !== "none") result.type = type4;
        let range;
        while (matchedRanges.length && matchedRanges[0][0] <= i) range = matchedRanges.shift();
        if (range) result.matchRange = range.slice(1);
        return result;
      }));
    }
    // src/word-result-sorting.ts
        function sortWordResults(results, {searchLength} = {}) {
      const sortMeta =  new Map;
      for (const result of results) {
        const matchingHeadword = result.k.find((k => k.matchRange)) || result.r.find((r => r.matchRange));
        const excessChars = searchLength && matchingHeadword ? matchingHeadword.ent.length - searchLength : void 0;
        const kanaReading = result.r.find((r => !!r.matchRange));
        const rt = kanaReading ? getKanaHeadwordType(kanaReading, result) : 1;
        const priority = getPriority(result);
        sortMeta.set(result.id, {
          excessChars,
          priority,
          type: rt
        });
      }
      results.sort(((a, b) => {
        const metaA = sortMeta.get(a.id);
        const metaB = sortMeta.get(b.id);
        if (metaA.excessChars !== void 0 && metaB.excessChars !== void 0 && metaA.excessChars !== metaB.excessChars) return metaA.excessChars - metaB.excessChars;
        if (metaA.type !== metaB.type) return metaA.type - metaB.type;
        return metaB.priority - metaA.priority;
      }));
      return results;
    }
    function getKanaHeadwordType(r, result) {
      var _a, _b, _c, _d;
      const isReadingObscure = ((_a = r.i) == null ? void 0 : _a.includes("ok")) || ((_b = r.i) == null ? void 0 : _b.includes("rk")) || ((_c = r.i) == null ? void 0 : _c.includes("sk")) || ((_d = r.i) == null ? void 0 : _d.includes("ik"));
      if (isReadingObscure) return 2;
      if (!result.k.length || result.k.every((k => {
        var _a2, _b2, _c2;
        return ((_a2 = k.i) == null ? void 0 : _a2.includes("rK")) || ((_b2 = k.i) == null ? void 0 : _b2.includes("sK")) || ((_c2 = k.i) == null ? void 0 : _c2.includes("iK"));
      }))) return 1;
      if (mostMatchedEnSensesAreUk(result.s)) return 1;
      return r.app === 0 ? 1 : 2;
    }
    function mostMatchedEnSensesAreUk(senses) {
      const matchedEnSenses = senses.filter((s5 => s5.match && (s5.lang === void 0 || s5.lang === "en")));
      if (matchedEnSenses.length === 0) return false;
      const ukEnSenseCount = matchedEnSenses.filter((s5 => {
        var _a;
        return (_a = s5.misc) == null ? void 0 : _a.includes("uk");
      })).length;
      return ukEnSenseCount >= matchedEnSenses.length / 2;
    }
    function getPriority(result) {
      const scores = [ 0 ];
      const isHeadwordSearch = result.k.some((k => !!k.matchRange)) || result.r.some((r => !!r.matchRange));
      for (const k of result.k) {
        if ((isHeadwordSearch ? !k.matchRange : !k.match) || !k.p) continue;
        scores.push(getPrioritySum(k.p));
      }
      for (const r of result.r) {
        if ((isHeadwordSearch ? !r.matchRange : !r.match) || !r.p) continue;
        scores.push(getPrioritySum(r.p));
      }
      return Math.max(...scores);
    }
    function getPrioritySum(priorities) {
      const scores = priorities.map(getPriorityScore).sort().reverse();
      return scores.length ? scores[0] + scores.slice(1).reduce(((total, score, index) => total + score / Math.pow(10, index + 1)), 0) : 0;
    }
    var PRIORITY_ASSIGNMENTS =  new Map([ [ "i1", 50 ], 
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
    function getPriorityScore(p) {
      if (PRIORITY_ASSIGNMENTS.has(p)) return PRIORITY_ASSIGNMENTS.get(p);
      if (p.startsWith("nf")) {
        const wordfreq = parseInt(p.substring(2), 10);
        if (wordfreq > 0 && wordfreq < 48) return 48 - wordfreq / 2;
      }
      return 0;
    }
    // src/query.ts
        var _state = "idle";
    var _db;
    var _openPromise;
    function dist_open() {
      if (_state === "open") return Promise.resolve(_db);
      if (_state === "opening") return _openPromise;
      _state = "opening";
      _openPromise = openDB("jpdict", 4, {
        upgrade(_db2, _oldVersion, _newVersion, transaction) {
          transaction.abort();
        },
        blocked() {
          console.log("Opening blocked");
        },
        blocking() {
          if (_db) {
            _db.close();
            _db = void 0;
            _state = "idle";
          }
        },
        terminated() {
          _db = void 0;
          _state = "idle";
        }
      }).then((db => {
        _db = db;
        _state = "open";
        return db;
      })).catch((() => {
        _state = "idle";
        _db = void 0;
        return null;
      })).finally((() => {
        _openPromise = void 0;
      }));
      return _openPromise;
    }
    async function dist_getWords(search, options) {
      var _a, _b;
      const db = await dist_open();
      if (!db) return [];
      const matchType = (_a = options == null ? void 0 : options.matchType) != null ? _a : "exact";
      const limit = (_b = options == null ? void 0 : options.limit) != null ? _b : 1 / 0;
      const lookup = search.normalize();
      const addedRecords =  new Set;
      const results = [];
      const maybeAddRecord = (record3, term, kanaMatching = "exact") => {
        if (addedRecords.has(record3.id)) return;
        let matchMode;
        if (matchType === "exact") matchMode = kanaMatching === "exact" ? "lexeme" : "kana-equivalent"; else matchMode = kanaMatching === "exact" ? "starts-with" : "starts-with-kana-equivalent";
        results.push(toWordResult(record3, term, matchMode));
        addedRecords.add(record3.id);
      };
      const kanjiIndex = db.transaction("words").store.index("k");
      const key = matchType === "exact" ? IDBKeyRange.only(lookup) : IDBKeyRange.bound(lookup, lookup + "\uffff");
      for await (const cursor of kanjiIndex.iterate(key)) maybeAddRecord(cursor.value, lookup);
      const readingIndex = db.transaction("words").store.index("r");
      for await (const cursor of readingIndex.iterate(key)) maybeAddRecord(cursor.value, lookup);
      {
        const hiraganaIndex = db.transaction("words").store.index("h");
        const hiragana = kanaToHiragana(lookup);
        const hiraganaKey = matchType === "exact" ? IDBKeyRange.only(hiragana) : IDBKeyRange.bound(hiragana, hiragana + "\uffff");
        for await (const cursor of hiraganaIndex.iterate(hiraganaKey)) maybeAddRecord(cursor.value, hiragana, "kana-equivalent");
      }
      let sortedResult;
      if (matchType === "exact") sortedResult = sortWordResults(results); else sortedResult = sortWordResults(results, {
        searchLength: lookup.length
      });
      if (limit) sortedResult.splice(limit);
      return sortedResult;
    }
    async function getKanji({kanji, lang, logWarningMessage = console.log}) {
      const ids = kanji.map((kanji2 => kanji2.codePointAt(0)));
      const kanjiRecords = await getKanjiById(ids);
      const radicalResults = await getRadicalForKanji({
        kanjiRecords,
        lang,
        logWarningMessage
      });
      if (kanjiRecords.length !== radicalResults.length) throw new Error(`There should be as many kanji records (${kanjiRecords.length}) as radical blocks (${radicalResults.length})`);
      const componentResults = await getComponentsForKanji({
        kanjiRecords,
        lang,
        logWarningMessage
      });
      if (kanjiRecords.length !== componentResults.length) throw new Error(`There should be as many kanji records (${kanjiRecords.length}) as component arrays (${componentResults.length})`);
      const relatedResults = await getRelatedKanji(kanjiRecords, lang);
      if (kanjiRecords.length !== relatedResults.length) throw new Error(`There should be as many kanji records (${kanjiRecords.length}) as related kanji arrays (${relatedResults.length})`);
      return kanjiRecords.map(((record3, i) => stripFields({
        ...record3,
        c: String.fromCodePoint(record3.c),
        m_lang: record3.m_lang || lang,
        rad: radicalResults[i],
        comp: componentResults[i],
        cf: relatedResults[i]
      }, [ "var" ])));
    }
    async function getKanjiById(ids) {
      const db = await dist_open();
      if (!db) return [];
      const kanjiRecords = [];
      {
        const tx = db.transaction("kanji");
        for (const c of ids) {
          const record3 = await tx.store.get(c);
          if (record3) kanjiRecords.push(record3);
        }
      }
      return kanjiRecords;
    }
    async function getRadicalForKanji({kanjiRecords, lang, logWarningMessage}) {
      const radicals = await getRadicals();
      return kanjiRecords.map((record3 => {
        const variantId = getRadicalVariantId(record3);
        const baseId = formatRadicalId(record3.rad.x);
        const radicalVariant = radicals.get(variantId || baseId);
        let rad;
        if (radicalVariant) {
          rad = {
            x: record3.rad.x,
            b: radicalVariant.b,
            k: radicalVariant.k,
            na: radicalVariant.na,
            m: radicalVariant.m,
            m_lang: radicalVariant.m_lang || lang
          };
          if (record3.rad.nelson) rad.nelson = record3.rad.nelson;
        } else {
          logWarningMessage(`Failed to find radical: ${variantId || baseId}`);
          rad = {
            ...record3.rad,
            // We generally maintain the invariant that either 'b' or 'k' is
            // filled in (or both for a base radical) so even though the TS
            // typings don't require it, we should provide one here.
            b: "\ufffd",
            na: [ "" ],
            m: [ "" ],
            m_lang: lang
          };
        }
        if (variantId) {
          const baseRadical = radicals.get(baseId);
          if (baseRadical) {
            const {b, k, na, m, m_lang} = baseRadical;
            rad.base = {
              b,
              k,
              na,
              m,
              m_lang: m_lang || lang
            };
          }
        }
        return rad;
      }));
    }
    function formatRadicalId(id) {
      return id.toString().padStart(3, "0");
    }
    function parseVariants(record3) {
      const variants = [];
      if (record3.var) for (const variantId of record3.var) {
        const matches = variantId.match(/^(\d+)-/);
        if (matches) {
          const [, radical] = matches;
          variants.push({
            radical: parseInt(radical, 10),
            id: variantId
          });
        }
      }
      return variants;
    }
    function popVariantForRadical(radical, variants) {
      const variantIndex = variants.findIndex((a => a.radical === radical || radical === 74 && a.id === "130-2"));
      if (variantIndex === -1) return;
      const id = variants[variantIndex].id;
      variants.splice(variantIndex, 1);
      return id;
    }
    function getRadicalVariantId(record3) {
      const variants = parseVariants(record3);
      const variant = variants.find((a => a.radical === record3.rad.x));
      return variant == null ? void 0 : variant.id;
    }
    var katakanaToRoman = [ [ "\u30a1", "a" ], [ "\u30a2", "a" ], [ "\u30a3", "i" ], [ "\u30a4", "i" ], [ "\u30a5", "u" ], [ "\u30a6", "u" ], [ "\u30a7", "e" ], [ "\u30a8", "e" ], [ "\u30a9", "o" ], [ "\u30aa", "o" ], [ "\u30ab", "ka" ], [ "\u30ac", "ga" ], [ "\u30ad", "ki" ], [ "\u30ae", "gi" ], [ "\u30af", "ku" ], [ "\u30b0", "gu" ], [ "\u30b1", "ke" ], [ "\u30b2", "ge" ], [ "\u30b3", "ko" ], [ "\u30b4", "go" ], [ "\u30b5", "sa" ], [ "\u30b6", "za" ], [ "\u30b7", "shi" ], [ "\u30b8", "ji" ], [ "\u30b9", "su" ], [ "\u30ba", "zu" ], [ "\u30bb", "se" ], [ "\u30bc", "ze" ], [ "\u30bd", "so" ], [ "\u30be", "zo" ], [ "\u30bf", "ta" ], [ "\u30c0", "da" ], [ "\u30c1", "chi" ], [ "\u30c2", "di" ], [ "\u30c3", "tsu" ], [ "\u30c4", "tsu" ], [ "\u30c5", "dzu" ], [ "\u30c6", "te" ], [ "\u30c7", "de" ], [ "\u30c8", "to" ], [ "\u30c9", "do" ], [ "\u30ca", "na" ], [ "\u30cb", "ni" ], [ "\u30cc", "nu" ], [ "\u30cd", "ne" ], [ "\u30ce", "no" ], [ "\u30cf", "ha" ], [ "\u30d0", "ba" ], [ "\u30d1", "pa" ], [ "\u30d2", "hi" ], [ "\u30d3", "bi" ], [ "\u30d4", "pi" ], [ "\u30d5", "fu" ], [ "\u30d6", "bu" ], [ "\u30d7", "pu" ], [ "\u30d8", "he" ], [ "\u30d9", "be" ], [ "\u30da", "pe" ], [ "\u30db", "ho" ], [ "\u30dc", "bo" ], [ "\u30dd", "po" ], [ "\u30de", "ma" ], [ "\u30df", "mi" ], [ "\u30e0", "mu" ], [ "\u30e1", "me" ], [ "\u30e2", "mo" ], [ "\u30e3", "ya" ], [ "\u30e4", "ya" ], [ "\u30e5", "yu" ], [ "\u30e6", "yu" ], [ "\u30e7", "yo" ], [ "\u30e8", "yo" ], [ "\u30e9", "ra" ], [ "\u30ea", "ri" ], [ "\u30eb", "ru" ], [ "\u30ec", "re" ], [ "\u30ed", "ro" ], [ "\u30ee", "wa" ], [ "\u30ef", "wa" ], [ "\u30f0", "wi" ], [ "\u30f1", "we" ], [ "\u30f2", "wo" ], [ "\u30f3", "n" ], [ "\u30f4", "vu" ], [ "\u30f5", "ka" ], [ "\u30f6", "ke" ], [ "\u30f7", "ga" ], [ "\u30f8", "vi" ], [ "\u30f9", "ve" ], [ "\u30fa", "vo" ] ];
    async function getComponentsForKanji({kanjiRecords, lang, logWarningMessage}) {
      const components = kanjiRecords.reduce(((components2, record3) => components2.concat(record3.comp ? [ ...record3.comp ] : [])), []);
      const radicalMap = await getCharToRadicalMapping();
      const kanjiToLookup =  new Set;
      for (const c of components) if (c && !radicalMap.has(c)) kanjiToLookup.add(c.codePointAt(0));
      let kanjiMap =  new Map;
      if (kanjiToLookup.size) {
        const kanjiRecords2 = await getKanjiById([ ...kanjiToLookup ]);
        kanjiMap = new Map(kanjiRecords2.map((record3 => [ String.fromCodePoint(record3.c), record3 ])));
      }
      const radicals = await getRadicals();
      const result = [];
      for (const record3 of kanjiRecords) {
        const comp = [];
        const variants = parseVariants(record3);
        for (const c of record3.comp ? [ ...record3.comp ] : []) if (radicalMap.has(c)) {
          let radicalRecord = radicals.get(radicalMap.get(c));
          if (radicalRecord) {
            const variantId = popVariantForRadical(radicalRecord.r, variants);
            if (typeof variantId !== "undefined") {
              const variantRadical = radicals.get(variantId);
              if (variantRadical) radicalRecord = variantRadical; else logWarningMessage(`Couldn't find radical record for variant ${variantId}`);
            }
            const component = {
              c,
              na: radicalRecord.na,
              m: radicalRecord.m,
              m_lang: radicalRecord.m_lang || lang
            };
            const baseRadical = radicals.get(formatRadicalId(radicalRecord.r));
            if (baseRadical && baseRadical.k) component.k = baseRadical.k;
            comp.push(component);
          } else logWarningMessage(`Couldn't find radical record for ${c}`);
        } else if (kanjiMap.has(c)) {
          const kanjiRecord = kanjiMap.get(c);
          if (kanjiRecord) {
            let na = [];
            if (kanjiRecord.r.kun && kanjiRecord.r.kun.length) na = kanjiRecord.r.kun.map((reading => reading.replace(".", ""))); else if (kanjiRecord.r.on && kanjiRecord.r.on.length) na = kanjiRecord.r.on;
            comp.push({
              c,
              na,
              m: kanjiRecord.m,
              m_lang: kanjiRecord.m_lang || lang
            });
          }
        } else if (c.codePointAt(0) >= 12449 && c.codePointAt(0) <= 12538) if (lang === "ja") comp.push({
          c,
          na: [ c ],
          m: [ `\u7247\u4eee\u540d\u306e${c}` ],
          m_lang: lang
        }); else {
          const asRoman = katakanaToRoman[c.codePointAt(0) - 12449][1];
          if (![ "en", "es", "pt", "fr" ].includes(lang)) logWarningMessage(`Generating katakana record for unknown language: ${lang}`);
          comp.push({
            c,
            na: [ c ],
            m: [ `katakana ${asRoman}` ],
            m_lang: lang
          });
        } else logWarningMessage(`Couldn't find a radical or kanji entry for ${c}`);
        result.push(comp);
      }
      return result;
    }
    async function getRelatedKanji(kanjiRecords, lang) {
      const cf = kanjiRecords.reduce(((cf2, record3) => cf2.concat(record3.cf ? [ ...record3.cf ].map((c => c.codePointAt(0) || 0)) : [])), []);
      const kanjiToLookup = new Set(cf);
      let kanjiMap =  new Map;
      if (kanjiToLookup.size) {
        const kanjiRecords2 = await getKanjiById([ ...kanjiToLookup ]);
        kanjiMap = new Map(kanjiRecords2.map((record3 => [ String.fromCodePoint(record3.c), record3 ])));
      }
      const result = [];
      for (const record3 of kanjiRecords) {
        const relatedKanji = [];
        for (const cfChar of record3.cf ? [ ...record3.cf ] : []) {
          const kanji = kanjiMap.get(cfChar);
          if (!kanji) continue;
          const {r, m, m_lang, misc} = kanji;
          relatedKanji.push({
            c: cfChar,
            r,
            m,
            m_lang: m_lang || lang,
            misc
          });
        }
        result.push(relatedKanji);
      }
      return result;
    }
    async function getRadicals() {
      const db = await dist_open();
      if (!db) 
      return new Map;
      return db.getAll("radicals").then((records => new Map(records.map((record3 => [ record3.id, record3 ])))));
    }
    async function getCharToRadicalMapping() {
      const radicals = await getRadicals();
      let baseRadical;
      const mapping =  new Map;
      for (const radical of radicals.values()) if (radical.id.indexOf("-") === -1) {
        baseRadical = radical;
        if (radical.b) mapping.set(radical.b, radical.id);
        if (radical.k) mapping.set(radical.k, radical.id);
      } else {
        if (!baseRadical) throw new Error("Radicals out of order--no base radical found");
        if (radical.r !== baseRadical.r) throw new Error("Radicals out of order--ID mismatch");
        if (radical.id === "130-2") continue;
        if (radical.b && radical.b !== baseRadical.b) mapping.set(radical.b, radical.id);
        if (radical.k && radical.k !== baseRadical.k) mapping.set(radical.k, radical.id);
      }
      return mapping;
    }
    async function getNames(search) {
      const db = await dist_open();
      if (!db) return [];
      const lookup = search.normalize();
      const addedRecords =  new Set;
      const result = [];
      const maybeAddRecord = record3 => {
        if (!addedRecords.has(record3.id)) {
          result.push(stripFields(record3, [ "h" ]));
          addedRecords.add(record3.id);
        }
      };
      const kanjiIndex = db.transaction("names").store.index("k");
      for await (const cursor of kanjiIndex.iterate(IDBKeyRange.only(lookup))) maybeAddRecord(cursor.value);
      const readingIndex = db.transaction("names").store.index("r");
      for await (const cursor of readingIndex.iterate(IDBKeyRange.only(lookup))) maybeAddRecord(cursor.value);
      const hiraganaIndex = db.transaction("names").store.index("h");
      const hiragana = kanaToHiragana(lookup);
      for await (const cursor of hiraganaIndex.iterate(IDBKeyRange.only(hiragana))) maybeAddRecord(cursor.value);
      return result;
    }
    // src/update-error-state.ts
        function toUpdateErrorState({error, nextRetry, retryCount}) {
      return {
        name: error.name,
        message: error.message,
        code: error instanceof DownloadError ? error.code : void 0,
        url: error instanceof DownloadError ? error.url : void 0,
        nextRetry,
        retryCount
      };
    }
    // src/request-idle-callback.ts
        var requestIdleCallback;
    var cancelIdleCallback;
    if (typeof self === "object" && typeof self.requestIdleCallback === "function" && typeof self.cancelIdleCallback === "function") {
      requestIdleCallback = self.requestIdleCallback;
      cancelIdleCallback = self.cancelIdleCallback;
    } else {
      requestIdleCallback = (callback, options) => {
        const timeout = options ? options.timeout / 2 : 0;
        return self.setTimeout((() => {
          callback({
            timeRemaining: () => 0,
            didTimeout: true
          });
        }), timeout);
      };
      cancelIdleCallback = handle => {
        clearTimeout(handle);
      };
    }
    // src/uuid.ts
        function uuid() {
      return (1e7.toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)));
    }
    // src/update-key.ts
        var dbToUuid =  new Map;
    function getUpdateKey(obj, series) {
      if (!dbToUuid.has(obj)) dbToUuid.set(obj, uuid());
      const baseId = dbToUuid.get(obj);
      return `${baseId}-${series}`;
    }
    // src/update-with-retry.ts
        function updateWithRetry({db, lang, series, onUpdateComplete, onUpdateError, setTimeout: setTimeout2 = self.setTimeout, updateNow = false}) {
      startUpdate({
        db,
        lang,
        series,
        setTimeout: setTimeout2,
        onUpdateComplete,
        onUpdateError,
        updateNow
      });
    }
    function runUpdate({db, lang, series, setTimeout: setTimeout2, onUpdateComplete, onUpdateError}) {
      if (!navigator.onLine) {
        const onlineCallback = async () => {
          runUpdate({
            db,
            lang,
            series,
            setTimeout: setTimeout2,
            onUpdateComplete,
            onUpdateError
          });
        };
        addEventListener("online", onlineCallback, {
          once: true
        });
        goOffline({
          db,
          series,
          lang,
          onlineCallback
        });
        onUpdateError == null ? void 0 : onUpdateError({
          error: new OfflineError
        });
        return;
      }
      beginUpdating({
        db,
        series,
        lang
      });
      void (async () => {
        try {
          await db.update({
            series,
            lang
          });
          resetUpdate({
            db,
            series
          });
          if (db.isVerbose) console.log("Successfully completed update.");
          onUpdateComplete == null ? void 0 : onUpdateComplete();
        } catch (e) {
          if (db.isVerbose) console.error("Got error while updating", e);
          let retryCount;
          let nextRetry;
          let suppressError = false;
          const isNetworkError = e instanceof DownloadError;
          if (isNetworkError) {
            const scheduleResult = maybeScheduleRetry({
              db,
              lang,
              series,
              setTimeout: setTimeout2,
              onUpdateComplete,
              onUpdateError
            });
            if (scheduleResult) ({nextRetry, retryCount} = scheduleResult);
          } else if (e && e instanceof Error && e.name === "ConstraintError") {
            const scheduleResult = maybeScheduleIdleRetry({
              db,
              lang,
              series,
              setTimeout: setTimeout2,
              onUpdateComplete,
              onUpdateError
            });
            if (scheduleResult) ({retryCount} = scheduleResult);
            suppressError = !!scheduleResult;
          } else resetUpdate({
            db,
            series
          });
          if (!suppressError && onUpdateError) {
            const error = e instanceof Error ? e : new Error(String(e));
            onUpdateError({
              error,
              nextRetry,
              retryCount
            });
          }
        }
      })();
    }
    function onDatabaseChange({db, series, topic}) {
      if (topic === "deleted") {
        resetUpdate({
          db,
          series
        });
        return;
      }
      const seriesHasProgress = series2 => db[series2].updateState.type === "updating" && db[series2].updateState.fileProgress > 0;
      const downloadedSomething = series === "kanji" ? seriesHasProgress("kanji") || seriesHasProgress("radicals") : seriesHasProgress(series);
      if (downloadedSomething) clearRetryInterval({
        db,
        series
      });
    }
    function cancelUpdateWithRetry({db, series}) {
      resetUpdate({
        db,
        series
      });
    }
    var inProgressUpdates =  new Map;
    function startUpdate({db, lang, series, setTimeout: setTimeout2, onUpdateComplete, onUpdateError, updateNow}) {
      const updateKey = getUpdateKey(db, series);
      let retryState = inProgressUpdates.get(updateKey);
      if (retryState && retryState.lang !== lang) {
        if (db.isVerbose) console.info("Canceling existing call to updateWithRetry because the requested language has changed.");
        resetUpdate({
          db,
          series
        });
      }
      retryState = inProgressUpdates.get(updateKey);
      if (retryState) {
        if (!updateNow) {
          if (db.isVerbose) console.info("Overlapping calls to updateWithRetry. Re-using existing invocation. This could be problematic if different callback functions were passed on each invocation.");
          return;
        }
        if (retryState.type === "offline") {
          if (db.isVerbose) console.info("Deferring forced update. Currently offline.");
          return;
        }
        if (retryState.type === "updating") {
          if (db.isVerbose) console.info("Skipping forced update. Already updating presently.");
          return;
        }
        if (db.isVerbose) console.log("Canceling existing queued retry.");
        resetUpdate({
          db,
          series
        });
      }
      retryState = inProgressUpdates.get(updateKey);
      if (retryState) {
        if (db.isVerbose) console.log("Skipping overlapping auto-retry request.");
        return;
      }
      runUpdate({
        db,
        lang,
        series,
        setTimeout: setTimeout2,
        onUpdateComplete,
        onUpdateError
      });
    }
    function resetUpdate({db, series}) {
      const updateKey = getUpdateKey(db, series);
      const retryState = inProgressUpdates.get(updateKey);
      if (!retryState) return;
      switch (retryState.type) {
       case "offline":
        removeEventListener("online", retryState.onlineCallback);
        break;

       case "waiting-for-timeout":
        clearTimeout(retryState.setTimeoutHandle);
        break;

       case "waiting-for-idle":
        cancelIdleCallback(retryState.requestIdleCallbackHandle);
        break;
      }
      db.removeChangeListener(retryState.changeCallback);
      inProgressUpdates.delete(updateKey);
      db.cancelUpdate(series);
    }
    function goOffline({db, lang, onlineCallback, series}) {
      const updateKey = getUpdateKey(db, series);
      const retryState = inProgressUpdates.get(updateKey);
      if (retryState) resetUpdate({
        db,
        series
      });
      inProgressUpdates.set(updateKey, {
        type: "offline",
        lang,
        onlineCallback,
        changeCallback: getOrRegisterChangeCallback({
          db,
          series
        })
      });
    }
    function beginUpdating({db, lang, series}) {
      const updateKey = getUpdateKey(db, series);
      const retryState = inProgressUpdates.get(updateKey);
      inProgressUpdates.set(updateKey, {
        type: "updating",
        lang,
        changeCallback: getOrRegisterChangeCallback({
          db,
          series
        }),
        retryCount: getRetryCount(retryState),
        retryIntervalMs: getRetryIntervalMs(retryState)
      });
    }
    function maybeScheduleRetry({db, lang, series, setTimeout: setTimeout2, onUpdateComplete, onUpdateError}) {
      const updateKey = getUpdateKey(db, series);
      const retryState = inProgressUpdates.get(updateKey);
      if ((retryState == null ? void 0 : retryState.type) !== "updating") return;
      let retryIntervalMs = retryState.retryIntervalMs;
      if (retryIntervalMs) retryIntervalMs = Math.min(retryIntervalMs * 2, 12 * 60 * 60 * 1e3); else retryIntervalMs = 3e3 + Math.random() * 3e3;
      let retryCount = retryState.retryCount;
      retryCount = typeof retryCount === "number" ? retryCount + 1 : 0;
      if (db.isVerbose) console.log(`Scheduling retry of update in ${retryIntervalMs}ms`);
      const setTimeoutHandle = setTimeout2((() => {
        if (db.isVerbose) console.log("Running automatic retry of update...");
        runUpdate({
          db,
          lang,
          series,
          setTimeout: setTimeout2,
          onUpdateComplete,
          onUpdateError
        });
      }), retryIntervalMs);
      const nextRetry = new Date(Date.now() + retryIntervalMs);
      inProgressUpdates.set(updateKey, {
        type: "waiting-for-timeout",
        lang,
        changeCallback: getOrRegisterChangeCallback({
          db,
          series
        }),
        retryCount,
        retryIntervalMs,
        setTimeoutHandle
      });
      return {
        nextRetry,
        retryCount
      };
    }
    function clearRetryInterval({db, series}) {
      const updateKey = getUpdateKey(db, series);
      const retryState = inProgressUpdates.get(updateKey);
      if ((retryState == null ? void 0 : retryState.type) !== "updating" || !retryState.retryIntervalMs) return;
      inProgressUpdates.set(updateKey, {
        ...retryState,
        retryIntervalMs: void 0,
        retryCount: void 0
      });
    }
    function maybeScheduleIdleRetry({db, lang, series, setTimeout: setTimeout2, onUpdateComplete, onUpdateError}) {
      const updateKey = getUpdateKey(db, series);
      const retryState = inProgressUpdates.get(updateKey);
      if ((retryState == null ? void 0 : retryState.type) !== "updating") return;
      let retryCount = retryState.retryCount;
      if (retryCount && retryCount >= 2) return;
      retryCount = typeof retryCount === "number" ? retryCount + 1 : 0;
      if (db.isVerbose) console.log("Retrying update momentarily");
      const requestIdleCallbackHandle = requestIdleCallback((() => {
        if (db.isVerbose) console.log("Running automatic retry of update...");
        runUpdate({
          db,
          lang,
          series,
          setTimeout: setTimeout2,
          onUpdateComplete,
          onUpdateError
        });
      }), {
        timeout: 2e3
      });
      inProgressUpdates.set(updateKey, {
        type: "waiting-for-idle",
        lang,
        changeCallback: getOrRegisterChangeCallback({
          db,
          series
        }),
        requestIdleCallbackHandle,
        retryCount
      });
      return {
        retryCount
      };
    }
    function getOrRegisterChangeCallback({db, series}) {
      const updateKey = getUpdateKey(db, series);
      const retryState = inProgressUpdates.get(updateKey);
      if (retryState) return retryState.changeCallback;
      const changeCallback = topic => onDatabaseChange({
        db,
        series,
        topic
      });
      db.addChangeListener(changeCallback);
      return changeCallback;
    }
    function getRetryCount(retryState) {
      return (retryState == null ? void 0 : retryState.type) !== "offline" ? retryState == null ? void 0 : retryState.retryCount : void 0;
    }
    function getRetryIntervalMs(retryState) {
      return (retryState == null ? void 0 : retryState.type) === "waiting-for-timeout" || (retryState == null ? void 0 : retryState.type) === "updating" ? retryState == null ? void 0 : retryState.retryIntervalMs : void 0;
    }
    // EXTERNAL MODULE: ./node_modules/.pnpm/webextension-polyfill@0.12.0/node_modules/webextension-polyfill/dist/browser-polyfill.js
        var browser_polyfill = __webpack_require__("687");
    var browser_polyfill_default =  __webpack_require__.n(browser_polyfill);
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
    function strip_fields_stripFields(o, fields) {
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
    // CONCATENATED MODULE: ./src/common/db-languages.ts
    const dbLanguages = [ "de", "en", "es", "fr", "hu", "nl", "pt", "ru", "sl", "sv" ];
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
          ...strip_fields_stripFields(storedKeys, [ "movePopupDownOrUp" ]),
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
    // CONCATENATED MODULE: ./src/common/db-listener-messages.ts
    const notifyDbStateUpdated = state => ({
      type: "dbstateupdated",
      state
    });
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
                    if (bugsnag_isDownloadError(event.originalError)) {
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
    function bugsnag_isDownloadError(error) {
      return is_object_isObject(error) && typeof error.name === "string" && (typeof error.url === "string" || typeof error.url === "undefined") && (typeof error.code === "number" || typeof error.url === "string");
    }
    // CONCATENATED MODULE: ./src/utils/request-idle-callback.ts
    // This is in part:
    // - Missing typings for requestIdleCallback
    // - Polyfill for browsers that don't support requestIdleCallback
    // - Polyfill for non-Window contexts (e.g. workers)
    /** @public */ let request_idle_callback_requestIdleCallback;
    /** @public */    let request_idle_callback_cancelIdleCallback;
    if (self.requestIdleCallback && self.cancelIdleCallback) {
      request_idle_callback_requestIdleCallback = self.requestIdleCallback.bind(self);
      request_idle_callback_cancelIdleCallback = self.cancelIdleCallback.bind(self);
    } else {
      request_idle_callback_requestIdleCallback = (callback, options) => {
        // Use half the specified timeout since it probably represents a worst-case
        // scenario.
        const timeout = options ? options.timeout / 2 : 0;
        return self.setTimeout((() => {
          callback({
            timeRemaining: () => 0,
            didTimeout: true
          });
        }), timeout);
      };
      request_idle_callback_cancelIdleCallback = handle => {
        self.clearTimeout(handle);
      };
    }
    /** @public */    function requestIdleCallbackPromise(options) {
      return new Promise((resolve => request_idle_callback_requestIdleCallback((() => {
        resolve();
      }), options)));
    }
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
    function discriminator_dist_isObject(a) {
      return typeof a === "object" && a !== null && !Array.isArray(a);
    }
    var discriminator = (field, mapping) => {
      const keys = Object.keys(mapping);
      const getStructForValue = value => {
        if (!discriminator_dist_isObject(value) || typeof value[field] !== "string" || !keys.includes(value[field])) return;
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
          if (!discriminator_dist_isObject(value)) return `Expected an object, but received: ${dist_print(value)}`;
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
    // CONCATENATED MODULE: ./src/background/background-request.ts
    const SearchRequestSchema = dist_type({
      input: string(),
      includeRomaji: optional(dist_boolean())
    });
    const SearchOtherRequestSchema = dist_assign(SearchRequestSchema, dist_type({
      wordsMatchLen: dist_number()
    }));
    const BackgroundRequestSchema = discriminator("type", {
      // Requests for the background page
      canHoverChanged: dist_type({
        value: dist_boolean()
      }),
      disabled: dist_type({}),
      disableMouseInteraction: dist_type({}),
      "enable?": dist_type({}),
      enabled: dist_type({
        src: string()
      }),
      isDbUpdating: dist_type({}),
      options: dist_type({}),
      puckStateChanged: dist_type({
        value: dist_object({
          x: dist_number(),
          y: dist_number(),
          orientation: enums([ "above", "below" ]),
          active: dist_boolean()
        })
      }),
      searchWords: SearchRequestSchema,
      searchOther: SearchOtherRequestSchema,
      toggleDefinition: dist_type({}),
      translate: dist_type({
        input: string(),
        includeRomaji: optional(dist_boolean())
      }),
      // Requests to be forwarded to different frames
      // We send these messages via the background page simply because using
      // postMessage causes some Web pages to break when they encounter unrecognized
      // messages.
      // Popup showing status
      "frame:popupShown": dist_type({
        frameId: dist_number(),
        state: optional(PopupStateSchema)
      }),
      "children:popupShown": dist_type({
        state: optional(PopupStateSchema)
      }),
      "children:popupHidden": dist_type({}),
      "top:isPopupShowing": dist_type({}),
      // Text highlighting
      "frame:highlightText": dist_type({
        length: dist_number(),
        frameId: dist_number()
      }),
      "frame:clearTextHighlight": dist_type({
        frameId: dist_number()
      }),
      // Lookup-related requests
      "top:lookup": dist_type({
        // We don't validate the bulk of the contents here but leave that to the
        // receiving end.
        // Parameters for designating the iframe source properties
        source: dist_type({
          src: string(),
          dimensions: dist_type({
            width: dist_number(),
            height: dist_number()
          })
        })
      }),
      "top:pinPopup": dist_type({}),
      "top:unpinPopup": dist_type({}),
      "top:commitPopup": dist_type({}),
      "top:clearResult": dist_type({}),
      "top:nextDictionary": dist_type({}),
      "top:toggleDefinition": dist_type({}),
      "top:expandPopup": dist_type({}),
      "top:movePopup": dist_type({
        direction: enums([ "up", "down" ])
      }),
      // Copy mode requests
      "top:enterCopyMode": dist_type({}),
      "top:exitCopyMode": dist_type({}),
      "top:nextCopyEntry": dist_type({}),
      "top:copyCurrentEntry": dist_type({
        copyType: enums([ "entry", "tab", "word" ])
      })
    });
    // CONCATENATED MODULE: ./src/background/all-tab-manager.ts
    /// <reference path="./mail-extensions.d.ts" />
    function all_tab_manager_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class AllTabManager {
      async init(config) {
        if (this.initPromise) {
          if (JSON.stringify(this.config) !== JSON.stringify(config)) {
            const error = new Error("AllTabManager::init called multiple times with different configurations");
            console.error(error);
            void Bugsnag.notify(error);
          }
          return this.initPromise;
        }
        this.initPromise = this.doInit(config);
        return this.initPromise;
      }
      async doInit(config) {
        this.config = config;
        // Try to fetch our previous enabled state from local storage
                this.enabled = await this.getStoredEnabledState();
        // Notify listeners
                if (this.enabled) this.notifyListeners(true);
        // Try to enable the active tab in each window
                if (this.enabled) this.enableActiveTabs().catch((e => Bugsnag.notify(e)));
        // Since we only enable the content script in the active tabs, if any other
        // tab becomes active we should make sure it gets enabled too.
                browser_polyfill_default().tabs.onActivated.addListener((({tabId}) => this.enableTab(tabId)));
        // Response to enabling-related messages
                browser_polyfill_default().runtime.onMessage.addListener(((request, sender) => {
          if (!is(request, BackgroundRequestSchema)) return;
          switch (request.type) {
           case "enable?":
            if (!sender.tab || typeof sender.tab.id !== "number") return;
            void this.enableTab(sender.tab.id, sender.frameId);
            break;

           case "enabled":
            if (!sender.tab || typeof sender.tab.id !== "number" || typeof sender.frameId !== "number") return;
            this.updateFrames({
              tabId: sender.tab.id,
              frameId: sender.frameId,
              src: request.src
            });
            return Promise.resolve({
              frameId: sender.frameId
            });

           case "disabled":
            if (!sender.tab || typeof sender.tab.id !== "number") return;
            this.dropFrame({
              tabId: sender.tab.id,
              frameId: sender.frameId
            });
            break;
          }
          return;
        }));
        this.initComplete = true;
      }
      async getStoredEnabledState() {
        let getEnabledResult;
        try {
          getEnabledResult = await browser_polyfill_default().storage.local.get("enabled");
        } catch {
          // This error occurs too frequently to be useful to report to Bugsnag.
          return false;
        }
        return getEnabledResult.hasOwnProperty("enabled") && !!getEnabledResult.enabled;
      }
      async enableActiveTabs() {
        // browser.tabs.query sometimes fails with a generic Error with message "An
        // unexpected error occurred". I don't know why. Maybe it should fail? Maybe
        // it's a timing thing? Who knows �‍♂️
        // For now, we just do a single retry, two seconds later. If that fails,
        // I suppose the user will have to try again.
        const tryToEnable = async () => {
          const tabs = await browser_polyfill_default().tabs.query({
            active: true
          });
          if (!tabs) return;
          for (const tab of tabs) if (typeof tab.id === "number") await this.enableTab(tab.id);
        };
        // Try to enable but only wait on the first attempt.
                try {
          await tryToEnable();
        } catch {
          console.log("Failed to re-enable. Will retry in two seconds.");
          setTimeout((() => {
            tryToEnable().catch((() => {
              console.log("Second attempt to re-enable failed. Giving up.");
            }));
          }), 2000);
        }
      }
      // State queries
      getEnabledState() {
        return Promise.resolve([ {
          enabled: this.enabled,
          tabId: void 0
        } ]);
      }
      // Toggling related interface
      async toggleTab(_tab, config) {
        if (!this.initPromise) throw new Error("Should have called init before toggleTab");
        await this.initPromise;
        // Update our local copy of the config
                this.config = config;
        if (!this.enabled) Bugsnag.leaveBreadcrumb("Enabling active tabs from toggle");
        // Update local state
                this.enabled = !this.enabled;
        // Update tabs
                if (this.enabled) 
        // Enable the active tabs
        await this.enableActiveTabs(); else 
        // Disable all tabs
        await sendMessageToAllTabs({
          type: "disable",
          frame: "*"
        });
        // Store our local value
                if (this.enabled) browser_polyfill_default().storage.local.set({
          enabled: true
        }).catch((() => {})); else browser_polyfill_default().storage.local.remove("enabled").catch((() => {}));
        this.notifyListeners(this.enabled);
      }
      async enableTab(tabId, frameId) {
        if (!this.config) throw new Error("Should have called init before enableTab");
        if (!this.enabled) return;
        try {
          await browser_polyfill_default().tabs.sendMessage(tabId, {
            type: "enable",
            config: this.config,
            // At the point when the listener gets this message it won't know what
            // its frameId is so it's pointless to specify it here.
            frame: "*"
          }, {
            frameId
          });
        } catch {
          // Some tabs don't have the content script so just ignore
          // connection failures here.
        }
      }
      // Config updates
      async updateConfig(config) {
        // Ignore redundant changes
        if (JSON.stringify(this.config) === JSON.stringify(config)) return;
        this.config = config;
        if (!this.enabled) return;
        await sendMessageToAllTabs({
          type: "enable",
          config,
          frame: "*"
        });
      }
      async notifyDbUpdated() {
        await sendMessageToAllTabs({
          type: "dbUpdated",
          frame: "*"
        });
      }
      // Frame management
      sendMessageToFrame({tabId, message, frameId}) {
        browser_polyfill_default().tabs.sendMessage(tabId, {
          ...message,
          frame: frameId
        }, {
          frameId
        }).catch((() => {}));
      }
      sendMessageToTopFrame({tabId, message}) {
        const frameId = this.getTopFrameId(tabId);
        if (frameId === null) return;
        browser_polyfill_default().tabs.sendMessage(tabId, {
          ...message,
          frame: "top"
        }, {
          frameId
        }).catch((() => {}));
      }
      getTopFrameId(tabId) {
        if (!(tabId in this.tabs)) return null;
        return Number(Object.keys(this.tabs[tabId].frames)[0]);
      }
      getInitialFrameSrc({tabId, frameId}) {
        return this.tabs[tabId]?.frames[frameId]?.initialSrc;
      }
      updateFrames({tabId, frameId, src}) {
        if (tabId in this.tabs) {
          const tab = this.tabs[tabId];
          if (frameId === 0) tab.src = src;
          // If we have navigated the root frame, blow away all the child frames
                    if (frameId === 0 && tab.src !== src && tab.src !== "") tab.frames = [];
        } else this.tabs[tabId] = {
          src: frameId === 0 ? src : "",
          frames: []
        };
        const tab = this.tabs[tabId];
        const addedFrame = !(frameId in tab.frames);
        tab.frames[frameId] = {
          initialSrc: src
        };
        // Try to detect the "no content script in the root window" case
                if (addedFrame && !tab.frames[0] && !tab.rootWindowCheckTimeout) tab.rootWindowCheckTimeout = self.setTimeout((() => {
          if (!this.tabs[tabId] || !Object.keys(this.tabs[tabId].frames).length) return;
          this.tabs[tabId].rootWindowCheckTimeout = void 0;
          const topMostFrameId = Number(Object.keys(this.tabs[tabId].frames)[0]);
          if (topMostFrameId !== 0) this.sendMessageToFrame({
            tabId,
            message: {
              type: "isTopMost"
            },
            frameId: topMostFrameId
          });
        }), 3000);
        // Schedule a task to clean up any tabs that have been closed
                if (!this.tabsCleanupTask) this.tabsCleanupTask = request_idle_callback_requestIdleCallback((async () => {
          this.tabsCleanupTask = void 0;
          try {
            const allTabs = await browser_polyfill_default().tabs.query({});
            const ourTabs = Object.keys(this.tabs).map(Number);
            for (const tabId of ourTabs) if (!allTabs.some((t => t.id === tabId))) delete this.tabs[tabId];
          } catch (e) {
            // Sometimes tabs.query will fail (e.g. if the user is dragging tabs).
            // That's fine since presumably this task will get scheduled again
            // eventually.
            Bugsnag.leaveBreadcrumb("Error cleaning up tabs", e);
          }
        }));
      }
      dropFrame({tabId, frameId}) {
        if (!this.tabs[tabId]) return;
        if (typeof frameId === "number") {
          const tab = this.tabs[tabId];
          delete tab.frames[frameId];
          if (!tab.frames.length) delete this.tabs[tabId];
        } else delete this.tabs[tabId];
      }
      // Listeners
      addListener(listener) {
        if (!this.listeners.includes(listener)) this.listeners.push(listener);
        if (this.initComplete) listener({
          enabled: this.enabled,
          anyEnabled: this.enabled
        });
        // If we are still initializing, all the listeners will get notified at the
        // end of initialization if we are enabled.
            }
      removeListener(listener) {
        this.listeners = this.listeners.filter((l => l !== listener));
      }
      notifyListeners(enabled) {
        for (const listener of this.listeners.slice()) listener({
          enabled,
          anyEnabled: enabled
        });
      }
      constructor() {
        all_tab_manager_define_property(this, "config", void 0);
        all_tab_manager_define_property(this, "initPromise", void 0);
        all_tab_manager_define_property(this, "initComplete", false);
        all_tab_manager_define_property(this, "enabled", false);
        all_tab_manager_define_property(this, "listeners", []);
        all_tab_manager_define_property(this, "tabs", []);
        all_tab_manager_define_property(this, "tabsCleanupTask", void 0);
      }
    }
    async function sendMessageToAllTabs(message) {
      const allTabs = [];
      // We could probably always just use `browser.tabs.query` but for some reason
      // I decided to use browser.window.getAll. We use `browser.tabs.query` as a
      // fallback when that is not available (e.g. Firefox for Android).
      
      // 2021-09-20: I think we prefer windows.getAll over tabs.query because
      // tabs.query is not particularly reliable (e.g. when the user is dragging
      // tabs it will fail).
            if (browser_polyfill_default().windows) {
        let windows = [];
        const windowTypes = [ "normal" ];
        // Firefox will just return an empty array if we pass a window type it
        // doesn't recognize so we need to "feature-detect" if we are in a mail
        // extension context or not. For now the presence/absence of the
        // composeAction member will do.
                if (browser_polyfill_default().composeAction) windowTypes.push("messageCompose", "messageDisplay");
        try {
          windows = await browser_polyfill_default().windows.getAll({
            populate: true,
            windowTypes
          });
        } catch (e) {
          Bugsnag.leaveBreadcrumb("Error getting windows", {
            error: e
          });
        }
        for (const win of windows) {
          if (!win.tabs) continue;
          allTabs.push(...win.tabs);
        }
      } else {
        const tabs = await browser_polyfill_default().tabs.query({});
        allTabs.push(...tabs);
      }
      for (const tab of allTabs) {
        if (!tab.id) continue;
        browser_polyfill_default().tabs.sendMessage(tab.id, message).catch((() => {}));
      }
    }
    // CONCATENATED MODULE: ./src/common/data-series-labels.ts
    const localizedDataSeriesKey = {
      kanji: "options_kanji_data_name",
      radicals: "options_bushu_data_name",
      names: "options_name_data_name",
      words: "options_words_data_name"
    };
    // CONCATENATED MODULE: ./src/utils/throttle.ts
    function throttle_throttle(func, limit) {
      let lastInvocationTimeout;
      let lastRan;
      return function(...args) {
        /* eslint @typescript-eslint/no-this-alias: 0 */ const context = this;
        const run = () => {
          func.apply(context, args);
          lastRan = Date.now();
        };
        if (!lastRan) run(); else {
          self.clearTimeout(lastInvocationTimeout);
          lastInvocationTimeout = self.setTimeout((function() {
            if (Date.now() - lastRan >= limit) run();
          }), limit - (Date.now() - lastRan));
        }
      };
    }
    // CONCATENATED MODULE: ./src/background/browser-action.ts
    /// <reference path="../common/constants.d.ts" />
    /// <reference path="./mail-extensions.d.ts" />
    const browser_action_action = false ? 0 : browser_polyfill_default().browserAction;
    // Chrome makes the tooltip disappear for a second or so if we try updating it
    // while it is showing so if we update it too quickly it becomes impossible to
    // read. Instead we need to throttle our updates. 2.5s or so seems like a good
    // balance between being up-to-date and being readable.
        const throttledSetTitle = throttle_throttle(((...args) => {
      try {
        browser_action_action.setTitle(...args).catch((e => {
          // Safari seems to frequently throw an exception when calling this
          // method:
          // "Invalid call to action.setTitle(). Tab not found."
          // I'm not sure why.
          console.warn(e);
        }));
      } catch (e) {
        // I think Safari might actually throw an exception synchronously here
        // as opposed to rejecting the Promise.
        console.warn(e);
      }
    }), 2500);
    let currentUpdate;
    function updateBrowserAction(params) {
      // If we are already trying to update the browser action, queue our changes,
      // clobbering any other queued changes.
      // We need to ensure only one update runs at a time because in Chromium-based
      // browsers setIcon is not FIFO and we can have earlier changes clobbering
      // later ones.
      if (currentUpdate) {
        currentUpdate.next = params;
        return;
      }
      void (async () => {
        let nextParams = params;
        while (nextParams) {
          try {
            // Indicate an update is running
            currentUpdate = {};
            await doUpdateBrowserAction(nextParams);
          } catch {
            // Ignore
          }
          // Look for the next update
                    nextParams = currentUpdate?.next;
        }
        // No updates left
                currentUpdate = void 0;
      })();
    }
    async function doUpdateBrowserAction({enabled, jpdictState, tabId, toolbarIcon}) {
      const iconFilenameParts = [ "10ten" ];
      let tooltip;
      // Apply the variant, if needed
            if (toolbarIcon === "sky") iconFilenameParts.push("sky");
      // First choose the base icon type / text
            if (enabled) {
        const jpdictWords = jpdictState.words.state;
        const fallbackWords = jpdictState.words.fallbackState;
        if (jpdictWords === "ok" || fallbackWords === "ok") tooltip = browser_polyfill_default().i18n.getMessage("command_toggle_enabled"); else if (jpdictWords === "init" || fallbackWords === "loading") tooltip = browser_polyfill_default().i18n.getMessage("command_toggle_loading"); else if (fallbackWords === "unloaded") 
        // If we get this far, we've either failed to load the jpdict database or
        // we simply haven't got around to populating it yet (e.g. we're still
        // downloading the other databases).
        // However, we won't load the fallback database until the user actually
        // tries to look something up so we don't know if it's available yet or
        // not. For now, assume everything is ok.
        tooltip = browser_polyfill_default().i18n.getMessage("command_toggle_enabled"); else {
          iconFilenameParts.push("error");
          tooltip = browser_polyfill_default().i18n.getMessage("error_loading_dictionary");
        }
      } else {
        iconFilenameParts.push("disabled");
        tooltip = browser_polyfill_default().i18n.getMessage("command_toggle_disabled");
      }
      const seriesColors = {
        words: "green",
        names: "blue",
        kanji: "purple",
        radicals: "purple"
      };
      // Next determine if we need to overlay any additional information.
            switch (jpdictState.updateState.type) {
       case "checking":
        // Technically the 'indeterminate' icon would be more correct here but
        // using '0' instead leads to less flicker.
        iconFilenameParts.push("0p", seriesColors[jpdictState.updateState.series]);
        tooltip = browser_polyfill_default().i18n.getMessage("command_toggle_checking");
        break;

       case "updating":
        {
          const {totalProgress, series} = jpdictState.updateState;
          // We only have progress variants for the regular and disabled styles.
                    if (!iconFilenameParts.includes("error")) iconFilenameParts.push(Math.round(totalProgress * 5) * 20 + "p", seriesColors[series]);
          const dbLabel = browser_polyfill_default().i18n.getMessage(localizedDataSeriesKey[series]);
          const progressAsPercent = Math.round(totalProgress * 100);
          tooltip = browser_polyfill_default().i18n.getMessage("command_toggle_downloading", [ dbLabel, String(progressAsPercent) ]);
        }
        break;
      }
      // Set the icon
      
      // We'd like to feature-detect if SVG icons are supported but Safari will
      // just fail silently if we try.
            const iconFilename = iconFilenameParts.join("-");
      await setIcon(iconFilename, tabId);
      // Add a warning overlay and update the string if there was a fatal
      // update error.
            const hasNotOkDatabase = allMajorDataSeries.some((series => jpdictState[series].state !== "ok"));
      if (hasNotOkDatabase && !!jpdictState.updateError && jpdictState.updateError.name !== "AbortError" && // Don't show quota exceeded errors. If the quota is exceeded, there's not
      // a lot the user can do about it, and we don't want to bother them with
      // a constant error signal.
      jpdictState.updateError.name !== "QuotaExceededError") {
        await browser_action_action.setBadgeText({
          text: "!",
          tabId
        });
        await (browser_polyfill_default().composeAction?.setBadgeText({
          text: "!"
        }));
        await browser_action_action.setBadgeBackgroundColor({
          color: "yellow",
          tabId
        });
        await (browser_polyfill_default().composeAction?.setBadgeBackgroundColor({
          color: "yellow"
        }));
        tooltip = browser_polyfill_default().i18n.getMessage("command_toggle_update_error");
      } else {
        await browser_action_action.setBadgeText({
          text: "",
          tabId
        });
        await (browser_polyfill_default().composeAction?.setBadgeText({
          text: ""
        }));
      }
      // Set the caption
            throttledSetTitle({
        title: tooltip,
        tabId
      });
      await (browser_polyfill_default().composeAction?.setTitle({
        title: tooltip
      }));
    }
    async function setIcon(iconFilename, tabId) {
      // We'd like to feature-detect if SVG icons are supported but Safari will
      // just fail silently if we try.
      if (true) {
        const details = {
          path: `images/${iconFilename}.svg`
        };
        await browser_action_action.setIcon({
          ...details,
          tabId
        });
        await (browser_polyfill_default().composeAction?.setIcon(details));
      }
    }
    // This will clobber any existing icon settings so it is only intended
    // to be used on startup (when no existing icon is already set) or when the icon
    // setting is changed (in which case we will update the browser action for
    // enabled tabs immediately afterwards anyway).
        function setDefaultToolbarIcon(toolbarIcon) {
      const iconFilename = toolbarIcon === "sky" ? "10ten-disabled" : "10ten-sky-disabled";
      void setIcon(iconFilename);
    }
    // CONCATENATED MODULE: ./src/background/context-menus.ts
    /// <reference path="../common/constants.d.ts" />
    const TOGGLE_MENU_ID = "context-toggle";
    const ENABLE_PUCK_MENU_ID = "context-enable-puck";
    // Thunderbird does not support contextMenus, only menus.
    
    // iOS does not support either.
        const contextMenus = browser_polyfill_default().contextMenus || browser_polyfill_default().menus;
    function registerMenuListeners(options) {
      contextMenus?.onClicked.addListener(((info, tab) => {
        if (info.menuItemId === TOGGLE_MENU_ID) options.onToggleMenu(tab); else if (info.menuItemId === ENABLE_PUCK_MENU_ID) options.onTogglePuck(!!info.checked);
      }));
    }
    /**
 * Create / update the context menu items based on the current state.
 *
 * This is a little bit of a funny function because:
 *
 * 1. We can't programmatically tell if a menu item exists or not.
 *
 * 2. Firefox will destroy the context menu if an add-on is disabled.
 *    See bug 1771328 / bug 1817287.
 *
 *    The proposed workaround is to simply unconditionally create the menus at
 *    the top-level and ignore any errors that occur if the menu already
 *    exists.
 *
 *    See: https://bugzilla.mozilla.org/show_bug.cgi?id=1771328#c1
 *
 * As a result of that, we simply try to create each menu item each time and, if
 * it fails, we try to update it instead.
 */    async function updateContextMenus(options) {
      // Fenix does not support context menus (but I'm not sure if it actually sets
      // contextMenus to undefined).
      if (!contextMenus || isFenix()) return;
      const {tabEnabled, toggleMenuEnabled, showPuck} = options;
      if (toggleMenuEnabled) try {
        await addToggleMenu(tabEnabled);
      } catch {
        try {
          await contextMenus.update(TOGGLE_MENU_ID, {
            checked: tabEnabled
          });
        } catch {
          // Ignore
        }
      } else await removeMenuItem(TOGGLE_MENU_ID);
      // We only show the enable puck menu if the tab is enabled
            if (tabEnabled) try {
        await addEnablePuckMenu(showPuck);
      } catch {
        try {
          await contextMenus.update(ENABLE_PUCK_MENU_ID, {
            checked: showPuck
          });
        } catch {
          // Ignore
        }
      } else await removeMenuItem(ENABLE_PUCK_MENU_ID);
    }
    async function addToggleMenu(enabled) {
      const contexts = [ false ? 0 : "browser_action", "editable", "frame", "image", "link", "page", "selection", "video" ];
      // Safari throws if we try to include 'tab' in the set of contexts.
      // (Chrome just ignores it, despite not supporting it.)
            if (true) contexts.push("tab");
      return createMenuItem({
        id: TOGGLE_MENU_ID,
        type: "checkbox",
        title: browser_polyfill_default().i18n.getMessage("menu_enable_extension"),
        contexts,
        checked: enabled
      });
    }
    async function addEnablePuckMenu(enabled) {
      return createMenuItem({
        id: ENABLE_PUCK_MENU_ID,
        type: "checkbox",
        title: browser_polyfill_default().i18n.getMessage("menu_enable_puck"),
        contexts: [ false ? 0 : "browser_action" ],
        checked: enabled
      });
    }
    async function createMenuItem(createProperties) {
      // It's important we don't handle errors here so that the caller can detect a
      // failure to create the menu item and try to update the existing one instead.
      return new Promise(((resolve, reject) => {
        if (!contextMenus) {
          reject(new Error("contextMenus is undefined"));
          return;
        }
        contextMenus.create(createProperties, (() => {
          if (browser_polyfill_default().runtime.lastError) reject(browser_polyfill_default().runtime.lastError);
          resolve();
        }));
      }));
    }
    async function removeMenuItem(menuItemId) {
      try {
        await (contextMenus?.remove(menuItemId));
      } catch {
        // Ignore
      }
    }
    // CONCATENATED MODULE: ./src/utils/fetch.ts
    /** @public */ class TimeoutError extends Error {
      constructor(...params) {
        super(...params);
        Object.setPrototypeOf(this, TimeoutError.prototype);
        if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, TimeoutError);
        this.name = "TimeoutError";
      }
    }
    function fetch_fetchWithTimeout(resource, options) {
      const controller = new AbortController;
      if (options?.signal) options.signal.addEventListener("abort", (() => {
        controller.abort();
      }));
      // Set up timeout callback
            const {timeout = 5000} = options || {};
      let didTimeout = false;
      let timeoutId;
      if (timeout && timeout !== 1 / 0) 
      // This should be safe to use even in service workers because if the worker
      // is terminated before the timeout happens, presumably the fetch will be
      // cancelled anyway.
      timeoutId = self.setTimeout((() => {
        didTimeout = true;
        controller.abort();
      }), timeout);
      const responsePromise = new Promise(((resolve, reject) => {
        fetch(resource, {
          ...options,
          signal: controller.signal
        }).then((response => {
          if (timeoutId) self.clearTimeout(timeoutId);
          resolve(response);
        })).catch((e => {
          if (e?.name === "AbortError" && didTimeout) reject(new TimeoutError); else reject(e);
        }));
      }));
      return responsePromise;
    }
    // CONCATENATED MODULE: ./src/utils/is-error.ts
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
    const is_error_objectToString = Object.prototype.toString;
    const is_error_getPrototypeOf = Object.getPrototypeOf;
    const is_error_ERROR_TYPE = "[object Error]";
    function is_error_isError(a) {
      if (a instanceof Error) return true;
      let err = a;
      while (err) {
        if (is_error_objectToString.call(err) === is_error_ERROR_TYPE) return true;
        err = is_error_getPrototypeOf(err);
      }
      return false;
    }
    // CONCATENATED MODULE: ./src/background/fx-fetcher.ts
    function fx_fetcher_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    const FxDataSchema = dist_type({
      timestamp: dist_min(integer(), 0),
      rates: record(string(), dist_number())
    });
    // Hopefully this is sufficiently similar enough to the DownloadError class used
    // by jpdict-idb that our Bugsnag grouping code should treat them as the same.
        class fx_fetcher_DownloadError extends Error {
      constructor(url, code, ...params) {
        super(...params), fx_fetcher_define_property(this, "code", void 0), fx_fetcher_define_property(this, "url", void 0);
        Object.setPrototypeOf(this, fx_fetcher_DownloadError.prototype);
        if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, fx_fetcher_DownloadError);
        this.name = "DownloadError";
        this.code = code;
        this.url = url;
      }
    }
    const ONE_MINUTE = 60 * 1000;
    const ONE_HOUR = 60 * ONE_MINUTE;
    const ONE_DAY = 24 * ONE_HOUR;
    class FxFetcher {
      async fetchData() {
        // Don't try fetching if we are offline
        if (!self.navigator.onLine) {
          Bugsnag.leaveBreadcrumb("Deferring FX data update until we are online");
          self.addEventListener("online", (() => {
            Bugsnag.leaveBreadcrumb("Fetching FX data update now that we are online");
            void this.fetchData();
          }));
          return;
        }
        // Don't try if we are already fetching
                if (this.fetchState.type === "fetching") {
          Bugsnag.leaveBreadcrumb("Overlapping attempt to fetch FX data.");
          return;
        }
        // Abort any timeout to retry
                if (this.fetchState.type === "waiting to retry") self.clearTimeout(this.fetchState.timeout);
        // Update our state
                this.fetchState = {
          type: "fetching",
          retryCount: this.fetchState.type === "waiting to retry" ? this.fetchState.retryCount + 1 : void 0
        };
        // Set up base URL
                let url = "https://data.10ten.life/fx/jpy.json";
        // Set up query string
                const manifest = browser_polyfill_default().runtime.getManifest();
        const queryParams = new URLSearchParams({
          sp: "10ten-ja-reader",
          sv: manifest.version_name || manifest.version,
          sc: getReleaseStage() === "production" ? "prod" : "dev"
        });
        url += `?${queryParams.toString()}`;
        // Do the fetch
                let fxData;
        try {
          const response = await fetch_fetchWithTimeout(url, {
            mode: "cors",
            timeout: 20000
          });
          // Check the response
                    if (!response.ok) throw new fx_fetcher_DownloadError(url, response.status, response.statusText);
          // Parse the response
                    const result = await response.json();
          assert(result, FxDataSchema);
          fxData = result;
        } catch (e) {
          // Convert network errors disguised as TypeErrors to DownloadErrors
          let error = e;
          if (is_error_isError(e) && e instanceof TypeError && (e.message.startsWith("NetworkError") || e.message === "Failed to fetch")) 
          // Use 418 just so that we pass the check for a retry-able error below
          // which looks for a status code in the 4xx~5xx range.
          error = new fx_fetcher_DownloadError(url, 418, e.message);
          // Possibly schedule a retry
                    const retryAbleError = is_error_isError(error) && (error.name === "TimeoutError" || error.name === "NetworkError" || error.name === "DownloadError" && error.code >= 400 && error.code < 500);
          const retryCount = this.fetchState.type === "fetching" && typeof this.fetchState.retryCount === "number" ? this.fetchState.retryCount : 0;
          if (retryAbleError && retryCount < 3) {
            console.warn(error);
            Bugsnag.leaveBreadcrumb(`Failed attempt #${retryCount + 1} to fetch FX data. Will retry.`, {
              error
            });
            // We're using setTimeout here but in the case of event pages or service
            // workers (as we use on some platforms) these are not guaranteed to
            // run.
            
            // That's fine though because if the background page gets killed then
            // when it restarts it will trigger a new fetch anyway.
                        const timeout = self.setTimeout((() => this.fetchData()), 10000);
            this.fetchState = {
              type: "waiting to retry",
              retryCount,
              timeout
            };
          } else {
            console.error(error);
            void Bugsnag.notify(error);
            this.fetchState = {
              type: "idle",
              didFail: true
            };
          }
        }
        if (fxData) {
          // Store the response
          // If this fails (e.g. due to a QuotaExceededError) there's not much we
          // can do since we communicate the FX data with other components via
          // local storage.
          const updated = Date.now();
          try {
            await browser_polyfill_default().storage.local.set({
              fx: {
                ...fxData,
                updated
              }
            });
            // Update our local state now that everything succeeded
                        this.updated = updated;
            this.fetchState = {
              type: "idle"
            };
          } catch {
            // Don't report to Bugsnag because this is really common in Firefox for
            // some reason.
            this.fetchState = {
              type: "idle",
              didFail: true
            };
          }
        }
        // Clear any alarm that might have triggered us so we can set a new alarm.
                await this.cancelScheduledUpdate();
        // If we succeeded, or failed outright, schedule our next update.
        
        // For the failed outright case, we determined that retrying isn't going to
        // help but who knows, maybe in an hour it will?
                await this.scheduleNextUpdate();
      }
      async scheduleNextUpdate() {
        // If we have an existing alarm, it's not likely to be later than we
        const existingAlarm = await browser_polyfill_default().alarms.get("fx-update");
        if (existingAlarm) return;
        // If we are already fetching (or waiting to re-fetch) let it run. It will
        // schedule the next run when it completes.
                if (this.fetchState.type !== "idle") return;
        // Schedule the next run to run in a day from the last update.
        
        // If we failed the last update (or failed _every_ update) try again in an
        // hour. We don't want to re-trigger too soon, however, or else we'll ping
        // the server unnecessarily.
                const now = Date.now();
        let nextRun;
        if (typeof this.updated === "undefined" || this.fetchState.didFail) nextRun = now + ONE_HOUR; else nextRun = Math.max(this.updated + ONE_DAY, now);
        // If the next UTC day is before we're scheduled to run next, bring the next
        // run forwards so that we get the data when it is as fresh as possible.
                const nextUtcDay = now + ONE_DAY - now % ONE_DAY;
        if (nextUtcDay < nextRun) 
        // ... but add a few minutes to avoid all the clients hitting the server
        // at the same time.
        nextRun = nextUtcDay + Math.random() * ONE_HOUR;
        // If the next run is within a minute or so, run it now. Otherwise, schedule
        // it for later.
                if (nextRun <= now + ONE_MINUTE) 
        // Don't wait on fetchData -- it does its own error handling and caller's
        // of this function shouldn't have to wait for us to run the fetch, only
        // to schedule it.
        void this.fetchData(); else try {
          Bugsnag.leaveBreadcrumb(`Scheduling next FX data update for ${new Date(nextRun)}`);
          browser_polyfill_default().alarms.create("fx-update", {
            when: nextRun
          });
        } catch (e) {
          console.error("Error creating alarm for FX data update", e);
          void Bugsnag.notify(e);
        }
      }
      async cancelScheduledUpdate() {
        await browser_polyfill_default().alarms.clear("fx-update");
      }
      constructor() {
        fx_fetcher_define_property(this, "fetchState", {
          type: "idle"
        });
        fx_fetcher_define_property(this, "updated", void 0);
        browser_polyfill_default().alarms.onAlarm.addListener((alarm => {
          if (alarm.name === "fx-update") {
            Bugsnag.leaveBreadcrumb("Running FX data update from alarm");
            this.fetchData().catch((e => Bugsnag.notify(e)));
          }
        }));
        // Fetch the latest update date and if we've never downloaded the data,
        // do it now.
        
        // No need to catch errors here, getLocalFxData does its own error
        // handling.
                void getLocalFxData().then((fxData => {
          if (!fxData) {
            Bugsnag.leaveBreadcrumb("No stored FX data. Doing initial fetch.");
            this.fetchData().catch((e => Bugsnag.notify(e)));
          } else {
            Bugsnag.leaveBreadcrumb(`Got stored FX data from ${new Date(fxData.timestamp)}. Last updated ${new Date(fxData.updated)}.`);
            this.updated = fxData.updated;
          }
        }));
      }
    }
    // CONCATENATED MODULE: ./src/background/is-current-tab-enabled.ts
    // Determining if the tab is enabled or not is not straightforward since
    // different windows can have different enabled states.
    // So if we get multiple windows, we should try to find out which one is the
    // current window and use that.
    async function isCurrentTabEnabled(tabManager) {
      const enabledStates = await tabManager.getEnabledState();
      if (enabledStates.length < 1) return false;
      if (enabledStates.length === 1) return enabledStates[0].enabled;
      try {
        const currentWindowTabs = await browser_polyfill_default().tabs.query({
          active: true,
          currentWindow: true
        });
        // We've received at least one error report where `currentWindowTabs` was
        // `undefined` on Safari. That shouldn't ever happen, but let's handle it just
        // in case.
                if (!currentWindowTabs) return false;
        // Typically there's only one active tab per window so let's just query that
        // (rather than introducing something potentially O(n^2)).
                const activeTab = currentWindowTabs[0];
        return activeTab && enabledStates.some((state => state.tabId === activeTab.id && state.enabled));
      } catch (e) {
        void Bugsnag.notify(e);
        return false;
      }
    }
    // CONCATENATED MODULE: ./src/utils/normalize-input.ts
    // This method returns an array of input lengths which use 16-bit character
    // offsets as opposed to Unicode codepoints.
    // That allows us to use .length, .substring etc. on the matched string.
    // If we make this return the positions of Unicode codepoints we will need to
    // update all users of this output to be non-BMP character aware.
    function normalizeInput(input) {
      // Convert to full-width, normalize decomposed characters, expand combined
      // characters etc.
      const fullWidthInput = halfToFullWidthNum(input);
      let [normalized, inputLengths] = toNormalized(fullWidthInput);
      // Strip out any zero-width non-joiners (as Google Docs sometimes likes to
      // stick them between every single character).
            [normalized, inputLengths] = stripZwnj(normalized, inputLengths);
      // Truncate if we find characters outside the expected range.
            for (let i = 0; i < fullWidthInput.length; ++i) {
        const char = fullWidthInput.codePointAt(i);
        // If we find a character out of range, we need to trim both normalized
        // and inputLengths
                if (char <= 0x2e80 && char != 0x200c || char >= 0x3000 && char <= 0x3002) {
          let outputIndex = 0;
          while (inputLengths[outputIndex] < i) outputIndex++;
          normalized = normalized.substring(0, outputIndex);
          inputLengths = inputLengths.slice(0, outputIndex ? outputIndex + 1 : 0);
          break;
        }
      }
      return [ normalized, inputLengths ];
    }
    function stripZwnj(input, inputLengths) {
      let normalized = "";
      const lengths = [];
      let last = 0;
      for (let i = 0; i < input.length; ++i) if (input.codePointAt(i) !== 0x200c) {
        normalized += input[i];
        lengths.push(inputLengths[i]);
        last = inputLengths[i + 1];
      }
      if (last) lengths.push(last);
      return [ normalized, lengths ];
    }
    // CONCATENATED MODULE: ./src/utils/serialize-error.ts
    // Convert an error into a form that able to sent with postMessage and that
    // is also compatible with Bugsnag's NotifiableError type.
    function serializeError(error) {
      let name;
      // Occasionally we get an undefined error object. We saw this at least once
      // on Firefox 68. Note sure where it's coming from.
            if (!error) {
        // Generate a stack in the hope of getting some clue where this is coming
        // from.
        let stack;
        try {
          throw new Error("(Unknown error)");
        } catch (e) {
          stack = e.stack;
        }
        return {
          name: "(Unknown error)",
          message: stack || ""
        };
      }
      // We need to be careful not to read the 'code' field unless it's a string
      // because DOMExceptions, for example, have a code field that is a number
      // but what we really want from them is their 'name' field.
            if (typeof error.code === "string") name = error.code; else name = error.name || error.message;
      // Also, if we get a generic "Error" with a more specific message field, we
      // should use that.
            if (name === "Error" && typeof error.message === "string" && error.message.length) name = error.message;
      // Common conversions to more specific/useful error classes.
            if (error instanceof TypeError && error.message.startsWith("NetworkError")) name = "NetworkError";
      if (name === "NetworkError" && !self.navigator.onLine) name = "OfflineError";
      // Set the message to the message field, unless we're already using that as
      // the name.
            let message = error.message || "";
      if (message === name) message = "";
      return {
        name,
        message
      };
    }
    // CONCATENATED MODULE: ./src/background/jpdict-events.ts
    const queryState = () => ({
      type: "querystate"
    });
    const jpdict_events_updateDb = ({lang, force}) => ({
      type: "update",
      lang,
      force
    });
    const cancelUpdateDb = () => ({
      type: "cancelupdate"
    });
    const jpdict_events_deleteDb = () => ({
      type: "delete"
    });
    const jpdict_events_notifyDbStateUpdated = state => ({
      type: "dbstateupdated",
      state
    });
    const notifyDbUpdateComplete = lastCheck => ({
      type: "dbupdatecomplete",
      lastCheck
    });
    const jpdict_events_leaveBreadcrumb = ({message}) => ({
      type: "breadcrumb",
      message
    });
    const notifyError = ({error, severity = "error"}) => ({
      type: "error",
      severity,
      ...serializeError(error),
      stack: error.stack
    });
    // CONCATENATED MODULE: ./src/worker/jpdict-worker-backend.ts
    function jpdict_worker_backend_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class JpdictWorkerBackend {
      updateDb(params) {
        this.worker.postMessage(jpdict_events_updateDb(params));
      }
      cancelUpdateDb() {
        this.worker.postMessage(cancelUpdateDb());
      }
      deleteDb() {
        this.worker.postMessage(jpdict_events_deleteDb());
      }
      queryState() {
        this.worker.postMessage(queryState());
      }
      addEventListener(listener) {
        if (!this.listeners.includes(listener)) this.listeners.push(listener);
      }
      removeEventListener(listener) {
        this.listeners = this.listeners.filter((l => l !== listener));
      }
      notifyListeners(message) {
        const listenersCopy = this.listeners.slice();
        for (const listener of listenersCopy) listener(message);
      }
      constructor() {
        jpdict_worker_backend_define_property(this, "worker", void 0);
        jpdict_worker_backend_define_property(this, "listeners", []);
        this.worker = new Worker("./10ten-ja-jpdict.js");
        this.worker.onmessageerror = event => {
          console.error(`Worker error: ${JSON.stringify(event)}`);
          void Bugsnag.notify(`Worker error: ${JSON.stringify(event)}`);
        };
        this.worker.onmessage = async event => {
          const message = event.data;
          this.notifyListeners(message);
        };
      }
    }
    // EXTERNAL MODULE: ./node_modules/.pnpm/lru_map@0.4.1/node_modules/lru_map/dist/lru.js
        var lru = __webpack_require__("698");
    // CONCATENATED MODULE: ./src/background/word-match-sorting.ts
    // This is duplicated from jpdict-idb's sorting of entries.
    // We use it for sorting:
    // 1) Between various deinflected results (e.g. so that 進む comes before 進ぶ
    //    when looking up 進んでいます), and
    // 2) In the case where we've fallen back to the flat file database.
    // As with Array.prototype.sort, sorts `results` in-place, but returns the
    // result to support chaining.
    function word_match_sorting_sortWordResults(results) {
      const sortMeta = new Map;
      for (const result of results) {
        const length = (result.k.find((k => k.matchRange)) || result.r.find((r => r.matchRange)))?.ent.length;
        // Determine the headword match type
        
        // 1 = match on a kanji, or kana which is not just the reading for a kanji
        // 2 = match on a kana reading for a kanji
                const kanaReading = result.r.find((r => !!r.matchRange));
        const rt = kanaReading ? word_match_sorting_getKanaHeadwordType(kanaReading, result) : 1;
        // Priority
                const priority = word_match_sorting_getPriority(result);
        sortMeta.set(result.id, {
          length,
          priority,
          type: rt
        });
      }
      results.sort(((a, b) => {
        const metaA = sortMeta.get(a.id);
        const metaB = sortMeta.get(b.id);
        if (metaA.length !== void 0 && metaB.length !== void 0 && metaA.length !== metaB.length) return metaB.length - metaA.length;
        if (metaA.type !== metaB.type) return metaA.type - metaB.type;
        return metaB.priority - metaA.priority;
      }));
      return results;
    }
    function word_match_sorting_getKanaHeadwordType(r, result) {
      // We don't want to prioritize readings marked as `ok` etc. or else we'll end
      // up prioritizing words like `檜` and `羆` being prioritized when searching
      // for `ひ`.
      const isReadingObscure = r.i?.includes("ok") || r.i?.includes("rk") || r.i?.includes("sk") || r.i?.includes("ik");
      if (isReadingObscure) return 2;
      // Kana headwords are type 1 (i.e. they are a primary headword, not just a
      // reading for a kanji headword) if:
      
      // (a) the entry has no kanji headwords or all the kanji headwords are marked
      //     as `rK`, `sK`, or `iK`.
            if (!result.k.length || result.k.every((k => k.i?.includes("rK") || k.i?.includes("sK") || k.i?.includes("iK")))) return 1;
      // (b) most of the English senses for the entry have a `uk` (usually kana)
      //     `misc` field and the reading is not marked as `ok` (old kana usage).
      
      // We wanted to make the condition here be just one sense being marked as `uk`
      // but then you get words like `梓` being prioritized when searching for `し`
      // because of one sense out of many being usually kana.
      
      // Furthermore, we don't want to require _all_ senses to be marked as `uk` or
      // else that will mean that 成る fails to be prioritized when searching for
      // `なる` because one sense out of 11 is not marked as `uk`.
            if (word_match_sorting_mostMatchedEnSensesAreUk(result.s)) return 1;
      // (c) the headword is marked as `nokanji`
            return r.app === 0 ? 1 : 2;
    }
    function word_match_sorting_mostMatchedEnSensesAreUk(senses) {
      const matchedEnSenses = senses.filter((s => s.match && (s.lang === void 0 || s.lang === "en")));
      if (matchedEnSenses.length === 0) return false;
      const ukEnSenseCount = matchedEnSenses.filter((s => s.misc?.includes("uk"))).length;
      return ukEnSenseCount >= matchedEnSenses.length / 2;
    }
    function word_match_sorting_getPriority(result) {
      const scores = [ 0 ];
      // Scores from kanji readings
            for (const k of result.k || []) {
        if (!k.matchRange || !k.p) continue;
        scores.push(word_match_sorting_getPrioritySum(k.p));
      }
      // Scores from kana readings
            for (const r of result.r) {
        if (!r.matchRange || !r.p) continue;
        scores.push(word_match_sorting_getPrioritySum(r.p));
      }
      // Return top score
            return Math.max(...scores);
    }
    // Produce an overall priority from a series of priority strings.
    
    // This should produce a value somewhere in the range 0~67.
    
    // In general we report the highest priority, but if we have several priority
    // scores we add a decreasing fraction (10%) of the lesser scores as an
    // indication that several sources have attested to the priority.
    
    // That should typically produce a maximum attainable score of 66.8.
    // Having a bounded range like this makes it easier to combine this value with
    // other metrics when sorting.
        function word_match_sorting_getPrioritySum(priorities) {
      const scores = priorities.map(word_match_sorting_getPriorityScore).sort().reverse();
      return scores.length ? scores[0] + scores.slice(1).reduce(((total, score, index) => total + score / Math.pow(10, index + 1)), 0) : 0;
    }
    // This assignment is pretty arbitrary however it's mostly used for sorting
    // entries where all we need to do is distinguish between the really common ones
    // and the obscure academic ones.
    
    // Entries with (P) are those ones that are marked with (P) in Edict.
        const word_match_sorting_PRIORITY_ASSIGNMENTS = new Map([ [ "i1", 50 ], [ "i2", 20 ], [ "n1", 40 ], [ "n2", 20 ], [ "s1", 32 ], [ "s2", 20 ], [ "g1", 30 ], [ "g2", 15 ] ]);
    function word_match_sorting_getPriorityScore(p) {
      if (word_match_sorting_PRIORITY_ASSIGNMENTS.has(p)) return word_match_sorting_PRIORITY_ASSIGNMENTS.get(p);
      if (p.startsWith("nf")) {
        // The wordfreq scores are groups of 500 words.
        // e.g. nf01 is the top 500 words, and nf48 is the 23,501 ~ 24,000
        // most popular words.
        const wordfreq = parseInt(p.substring(2), 10);
        if (wordfreq > 0 && wordfreq < 48) return 48 - wordfreq / 2;
      }
      return 0;
    }
    // CONCATENATED MODULE: ./src/background/flat-file.ts
    function flat_file_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class FlatFileDatabase {
      // Loading
      async loadData() {
        try {
          // Read in series to reduce contention
          this.wordDict = await this.readFileWithAutoRetry(browser_polyfill_default().runtime.getURL("data/words.ljson"));
          this.wordIndex = await this.readFileWithAutoRetry(browser_polyfill_default().runtime.getURL("data/words.idx"));
          this.notifyListeners({
            type: "loaded"
          });
        } catch (e) {
          this.notifyListeners({
            type: "error",
            error: e,
            willRetry: false
          });
        }
      }
      async readFileWithAutoRetry(url) {
        let attempts = 0;
        // Bugsnag only gives us 30 characters for the breadcrumb but it's the
        // end of the url we really want to record.
                const makeBreadcrumb = (prefix, url) => {
          const urlStart = Math.max(0, url.length - (30 - prefix.length - 1));
          return prefix + "\u2026" + url.substring(urlStart);
        };
        if (this.bugsnag) this.bugsnag.leaveBreadcrumb(makeBreadcrumb("Loading: ", url));
        while (true) {
          // We seem to occasionally hit loads that never finish (particularly on
          // Linux and particularly on startup / upgrade). Set a timeout so that
          // we can at least abort and try again.
          const TIMEOUT_MS = 5 * 1000;
          let timeoutId;
          try {
            let controller;
            let requestOptions;
            // It turns out some people are still using Firefox < 57. :/
                        if (typeof AbortController === "function") {
              controller = new AbortController;
              requestOptions = {
                signal: controller.signal
              };
            }
            timeoutId = self.setTimeout((() => {
              timeoutId = void 0;
              if (controller) {
                console.error(`Load of ${url} timed out. Aborting.`);
                if (this.bugsnag) this.bugsnag.leaveBreadcrumb(makeBreadcrumb("Aborting: ", url));
                controller.abort();
              } else {
                // TODO: This error doesn't actually propagate and do anything
                // useful yet. But for now at least it means Firefox 56 doesn't
                // break altogether.
                if (this.bugsnag) void this.bugsnag.notify("[Pre FF57] Load timed out");
                throw new Error(`Load of ${url} timed out.`);
              }
            }), TIMEOUT_MS * (attempts + 1));
            const response = await fetch(url, requestOptions);
            const responseText = await response.text();
            clearTimeout(timeoutId);
            if (this.bugsnag) this.bugsnag.leaveBreadcrumb(makeBreadcrumb("Loaded: ", url));
            return responseText;
          } catch (e) {
            if (typeof timeoutId === "number") clearTimeout(timeoutId);
            if (this.bugsnag) this.bugsnag.leaveBreadcrumb(makeBreadcrumb(`Failed(#${attempts + 1}): `, url));
            if (++attempts >= 3) {
              console.error(`Failed to load ${url} after ${attempts} attempts`);
              throw e;
            }
            this.notifyListeners({
              type: "error",
              error: e,
              willRetry: true
            });
            // Wait for a (probably) increasing interval before trying again
                        const intervalToWait = Math.round(Math.random() * attempts * 1000);
            console.log(`Failed to load ${url}. Trying again in ${intervalToWait}ms`);
            await new Promise((resolve => setTimeout(resolve, intervalToWait)));
          }
        }
      }
      // Searching
      async getWords({input, maxResults}) {
        await this.loaded;
        let offsets = this.lookupCache.get(input);
        if (!offsets) {
          const lookupResult = findLineStartingWith({
            source: this.wordIndex,
            text: input + ","
          });
          if (!lookupResult) {
            this.lookupCache.set(input, []);
            return [];
          }
          offsets = lookupResult.split(",").slice(1).map(Number);
          this.lookupCache.set(input, offsets);
        }
        const result = [];
        for (const offset of offsets) {
          const entry = JSON.parse(this.wordDict.substring(offset, this.wordDict.indexOf("\n", offset)));
          result.push(toDictionaryWordResult({
            entry,
            matchingText: input,
            offset
          }));
        }
        // Sort before capping the number of results
                word_match_sorting_sortWordResults(result);
        result.splice(maxResults);
        return result;
      }
      // Listeners
      addListener(listener) {
        if (this.listeners.includes(listener)) return;
        this.listeners.push(listener);
      }
      removeListener(listener) {
        this.listeners = this.listeners.filter((l => l !== listener));
      }
      notifyListeners(event) {
        const listenersCopy = this.listeners.slice();
        for (const listener of listenersCopy) listener(event);
      }
      constructor(options) {
        flat_file_define_property(this, "bugsnag", void 0);
        flat_file_define_property(this, "listeners", []);
        flat_file_define_property(this, "loaded", void 0);
        flat_file_define_property(this, "lookupCache", new lru.LRUMap(500));
        flat_file_define_property(this, "wordDict", void 0);
        flat_file_define_property(this, "wordIndex", void 0);
        this.bugsnag = options.bugsnag;
        this.loaded = this.loadData();
      }
    }
    // Performs a binary search of a linefeed delimited string, |data|, for |text|.
        function findLineStartingWith({source, text}) {
      const tlen = text.length;
      let start = 0;
      let end = source.length - 1;
      while (start < end) {
        const midpoint = start + end >> 1;
        const i = source.lastIndexOf("\n", midpoint) + 1;
        const candidate = source.substring(i, i + tlen);
        if (text < candidate) end = i - 1; else if (text > candidate) start = source.indexOf("\n", midpoint + 1) + 1; else return source.substring(i, source.indexOf("\n", midpoint + 1));
      }
      return null;
    }
    function toDictionaryWordResult({entry, matchingText, offset}) {
      const kanjiMatch = !!entry.k && entry.k.some((k => kanaToHiragana(k) === matchingText));
      const kanaMatch = !kanjiMatch && entry.r.some((r => kanaToHiragana(r) === matchingText));
      return {
        id: offset,
        k: flat_file_mergeMeta(entry.k, entry.km, ((key, meta) => ({
          ent: key,
          ...meta,
          match: kanjiMatch && kanaToHiragana(key) === matchingText || !kanjiMatch,
          matchRange: kanaToHiragana(key) === matchingText ? [ 0, key.length ] : void 0
        }))),
        r: flat_file_mergeMeta(entry.r, entry.rm, ((key, meta) => ({
          ent: key,
          ...meta,
          match: kanaMatch && kanaToHiragana(key) === matchingText || !kanaMatch,
          matchRange: kanaToHiragana(key) === matchingText ? [ 0, key.length ] : void 0
        }))),
        s: flat_file_expandSenses(entry.s)
      };
    }
    function flat_file_mergeMeta(keys, metaArray, merge) {
      const result = [];
      for (const [i, key] of (keys || []).entries()) {
        const meta = metaArray && metaArray.length >= i + 1 && metaArray[i] !== 0 ? metaArray[i] : void 0;
        // The following is taken from jpdict-idb's `makeWordResult` function.
        
        // WaniKani levels are stored in the `p` (priority) field for simplicity
        // in the form `wk{N}` where N is the level number.
        // We need to extract any such levels and store them in the `wk` field
        // instead.
        
        // Likewise for Bunpro levels which need to be combined with an `bv` /
        // `bg` fields since these contain the original source text for a fuzzy
        // match.
                let wk;
        let bv;
        let bg;
        const p = meta?.p?.filter((p => {
          if (/^wk\d+$/.test(p)) {
            const wkLevel = parseInt(p.slice(2), 10);
            if (typeof wk === "undefined" || wkLevel < wk) wk = wkLevel;
            return false;
          }
          if (/^bv\d+$/.test(p)) {
            const bvLevel = parseInt(p.slice(2), 10);
            if (typeof bv === "undefined" || bvLevel < bv) bv = bvLevel;
            return false;
          }
          if (/^bg\d+$/.test(p)) {
            const bgLevel = parseInt(p.slice(2), 10);
            if (typeof bg === "undefined" || bgLevel < bg) bg = bgLevel;
            return false;
          }
          return true;
        }));
        if (p?.length) meta.p = p; else delete meta?.p;
        const extendedMeta = meta;
        if (wk) extendedMeta.wk = wk;
        if (typeof bv === "number") extendedMeta.bv = Object.assign({
          l: bv
        }, meta?.bv ? {
          src: meta?.bv
        } : void 0);
        if (typeof bg === "number") extendedMeta.bg = Object.assign({
          l: bg
        }, meta?.bg ? {
          src: meta?.bg
        } : void 0);
        result.push(merge(key, extendedMeta));
      }
      return result;
    }
    function flat_file_expandSenses(senses) {
      return senses.map((sense => ({
        g: flat_file_expandGlosses(sense),
        ...strip_fields_stripFields(sense, [ "g", "gt" ]),
        match: true
      })));
    }
    function flat_file_expandGlosses(sense) {
      // Helpers to work out the gloss type
      const gt = sense.gt || 0;
      const typeMask = (1 << BITS_PER_GLOSS_TYPE) - 1;
      const glossTypeAtIndex = i => GlossTypes[gt >> i * BITS_PER_GLOSS_TYPE & typeMask];
      return sense.g.map(((gloss, i) => {
        // This rather convoluted mess is because our test harness differentiates
        // between properties that are not set and those that are set to
        // undefined.
        const result = {
          str: gloss
        };
        const type = glossTypeAtIndex(i);
        if (type !== "none") result.type = type;
        return result;
      }));
    }
    class FlatFileDatabaseLoader {
      resetIfNotLoaded() {
        if (this.loadState === "ok") return;
        if (this.flatFileDatabase) {
          this.flatFileDatabase.removeListener(this.onFlatFileDatabaseUpdated);
          this.flatFileDatabase = void 0;
        }
        this.loadState = "unloaded";
      }
      load() {
        if (this.flatFileDatabase && this.loadPromise) return this.loadPromise;
        this.flatFileDatabase = new FlatFileDatabase({
          bugsnag: this.bugsnag
        });
        this.flatFileDatabase.addListener(this.onFlatFileDatabaseUpdated);
        this.loadPromise = new Promise(((resolve, reject) => {
          this.resolveLoad = resolve;
          this.rejectLoad = reject;
        }));
        this.loadState = "loading";
        if (this.onUpdate) this.onUpdate(this.loadState);
        return this.loadPromise;
      }
      onFlatFileDatabaseUpdated(event) {
        switch (event.type) {
         case "loaded":
          this.loadState = "ok";
          this.loadError = void 0;
          // If this is the initial load, make sure to resolve the load promise.
          
          // (If it is NOT the initial load, resolveLoad will be a no-op since
          // rejectLoad will have already been called.)
                    if (this.resolveLoad && this.flatFileDatabase) this.resolveLoad(this.flatFileDatabase);
          // If this is not the initial load, make sure to replace the loadPromise
          // so that anyone who waits on it from now on will get the resolved
          // database.
                    if (this.flatFileDatabase) this.loadPromise = Promise.resolve(this.flatFileDatabase);
          break;

         case "error":
          if (event.willRetry) this.loadState = "retrying"; else {
            this.loadState = "error";
            // Reset the flat file database so that subsequence calls to load()
            // will retry loading.
                        this.flatFileDatabase?.removeListener(this.onFlatFileDatabaseUpdated);
            this.flatFileDatabase = void 0;
          }
          this.loadError = event.error;
          if (this.rejectLoad) this.rejectLoad(event.error);
          break;
        }
        if (this.onUpdate) this.onUpdate(this.loadState);
      }
      get database() {
        switch (this.loadState) {
         case "unloaded":
          return this.load();

         case "loading":
          return this.loadPromise;

         case "retrying":
 // This should fail since we don't want the caller to wait on retries so
          // this falls through
                   case "error":
          return Promise.reject(this.loadError);

         case "ok":
          return Promise.resolve(this.flatFileDatabase);
        }
      }
      constructor(options) {
        flat_file_define_property(this, "loadState", "unloaded");
        flat_file_define_property(this, "onUpdate", void 0);
        flat_file_define_property(this, "bugsnag", void 0);
        flat_file_define_property(this, "flatFileDatabase", void 0);
        flat_file_define_property(this, "loadError", void 0);
        flat_file_define_property(this, "loadPromise", void 0);
        flat_file_define_property(this, "resolveLoad", void 0);
        flat_file_define_property(this, "rejectLoad", void 0);
        this.bugsnag = options.bugsnag;
        this.onFlatFileDatabaseUpdated = this.onFlatFileDatabaseUpdated.bind(this);
      }
    }
    // CONCATENATED MODULE: ./src/background/jpdict-backend.ts
    function jpdict_backend_define_property(obj, key, value) {
      if (key in obj) Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }); else obj[key] = value;
      return obj;
    }
    class JpdictLocalBackend {
      addEventListener(listener) {
        if (!this.listeners.includes(listener)) this.listeners.push(listener);
      }
      removeEventListener(listener) {
        this.listeners = this.listeners.filter((l => l !== listener));
      }
      async updateDb({lang, force}) {
        try {
          await this.updateAllSeries({
            lang,
            forceUpdate: force
          });
        } catch (error) {
          this.notifyListeners(notifyError({
            error
          }));
        }
      }
      cancelUpdateDb() {
        if (!this.currentUpdate) return;
        cancelUpdateWithRetry({
          db: this.db,
          series: this.currentUpdate.series
        });
        this.currentUpdate = void 0;
      }
      async deleteDb() {
        if (this.db) try {
          await this.db.destroy();
        } catch (error) {
          this.notifyListeners(notifyError({
            error
          }));
        }
      }
      async queryState() {
        if (await this.dbIsInitialized) this.doDbStateNotification();
      }
      // Implementation helpers
      async initDb() {
        let retryCount = 0;
        while (true) {
          if (this.db) try {
            await this.db.destroy();
          } catch {
            console.log("Failed to destroy previous database");
          }
          try {
            this.db = new JpdictIdb({
              verbose: true
            });
            this.db.addChangeListener(this.doDbStateNotification);
            await this.db.ready;
            return this.db;
          } catch (e) {
            if (retryCount >= 3) {
              console.log("Giving up opening database. Likely in permanent private browsing mode.");
              throw e;
            }
            retryCount++;
            console.log(`Failed to open database. Retrying shortly (attempt: ${retryCount})...`);
            await requestIdleCallbackPromise({
              timeout: 1000
            });
          }
        }
      }
      async updateAllSeries({lang, forceUpdate}) {
        if (!await this.dbIsInitialized) return;
        // Check for a current update
                let wasForcedUpdate = false;
        if (this.currentUpdate) {
          // If the language matches and we're not (newly) forcing an update, then
          // just let the current update run.
          if (this.currentUpdate.lang === lang && (this.currentUpdate.forceUpdate || !forceUpdate)) return;
          // Otherwise, cancel the current update but make sure to propagate the
          // forced flag if we were forced.
                    wasForcedUpdate = this.currentUpdate.forceUpdate;
          this.cancelUpdateDb();
          this.currentUpdate = void 0;
        }
        // Firefox 112+ (and presumably Thunderbird 112+) has an unfortunate bug
        // where, when we try to clear an objectStore, it just hangs:
        
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1860486
        
        // Until that bug is fixed (or we replace our database storage entirely), we
        // need to detect when we are likely to want to clear an object store and
        // simply blow away the whole database and replace it.
        
        // That's quite unfortunate because it means we'll need to download all the
        // names data again which is massive but it's better than having the user be
        // stuck.
                if (hasBuggyObjectStoreClear()) {
          // Check if we need to replace the data, i.e. if running an update is
          // likely to try and clear a data series' object store.
          // There are basically two cases where this happens:
          // 1. We are changing the language
          // 2. The major/minor version of a data series has changed
          // Working out if the language is changed is hard. Not all series have all
          // languages so a mismatch between the passed-in `lang` and the series'
          // language doesn't necessarily mean that the language has changed.
          // Instead, if there are _no_ series that match the language we can assume
          // it has changed.
          const langChanged = this.db && this.db.kanji.state === "ok" && this.db.kanji.version?.lang !== lang && this.db.radicals.state === "ok" && this.db.radicals.version?.lang !== lang && this.db.words.state === "ok" && this.db.words.version?.lang !== lang;
          // Working out if the major/minor version has changed is impossible
          // without either:
          
          // 1. Duplicating the logic to download the version info metadata here and
          //    comparing it, or
          
          // 2. Passing some sort of flag into `updateWithRetry` to indicate that
          //    if the version has changed we should replace the database.
          
          // Both are very invasive so we'll just have to commit to not updating the
          // major/minor version until either the bug is fixed in Firefox or we
          // replace our database storage.
                    if (langChanged) try {
            this.notifyListeners(jpdict_events_leaveBreadcrumb({
              message: "Detected language change on buggy version of Firefox. Replacing database."
            }));
            await this.initDb();
          } catch (error) {
            this.notifyListeners(notifyError({
              error
            }));
          }
        }
        const onUpdateError = series => params => {
          const {error, nextRetry, retryCount} = params;
          if (nextRetry) {
            const diffInMs = nextRetry.getTime() - Date.now();
            this.notifyListeners(jpdict_events_leaveBreadcrumb({
              message: `Encountered ${error.name} error updating ${series} database. Retrying in ${diffInMs}ms.`
            }));
            // We don't want to report all download errors since the auto-retry
            // behavior will mean we get too many. Also, we don't care about
            // intermittent failures for users on flaky network connections.
            
            // However, if a lot of clients are failing multiple times to fetch
            // a particular resource, we want to know.
                        if (retryCount === 5) this.notifyListeners(notifyError({
              error,
              severity: "warning"
            }));
          } else if (error.name !== "AbortError" && error.name !== "OfflineError") this.notifyListeners(notifyError({
            error
          })); else this.notifyListeners(jpdict_events_leaveBreadcrumb({
            message: `Database update for ${series} database encountered ${error.name} error`
          }));
          this.lastUpdateError = toUpdateErrorState(params);
          this.doDbStateNotification();
        };
        const runNextUpdate = () => {
          // Check if we successfully updated a series
          if (this.currentUpdate) {
            this.lastUpdateError = void 0;
            this.notifyListeners(jpdict_events_leaveBreadcrumb({
              message: `Successfully updated ${this.currentUpdate.series} database`
            }));
            this.doDbStateNotification();
          }
          // Cycle through data series
          
          // We use the following order:
          
          // 1. Kanji
          // 2. Names
          // 3. Words
          
          // Although the words dictionary is the most important one, we already have
          // the flat-file version available for words so, if we're going to run out
          // of disk space, it would be good to try and get as much of the other data
          // in first.
                    if (!this.currentUpdate) this.currentUpdate = {
            lang,
            series: "kanji",
            forceUpdate: forceUpdate || wasForcedUpdate
          }; else if (this.currentUpdate.series === "kanji") this.currentUpdate.series = "names"; else if (this.currentUpdate.series === "names") this.currentUpdate.series = "words"; else {
            this.currentUpdate = void 0;
            this.notifyListeners(notifyDbUpdateComplete(getLatestCheckTime(this.db)));
            return;
          }
          if (forceUpdate || wasForcedUpdate) clearCachedVersionInfo();
          void updateWithRetry({
            db: this.db,
            series: this.currentUpdate.series,
            lang,
            onUpdateComplete: runNextUpdate,
            onUpdateError: onUpdateError(this.currentUpdate.series)
          });
        };
        runNextUpdate();
      }
      doDbStateNotification() {
        // Wait until we have finished resolving the database versions before
        // reporting anything.
        if (!this.db || this.db.words.state === "init" || this.db.kanji.state === "init" || this.db.radicals.state === "init" || this.db.names.state === "init") return;
        // Merge update states to show the current / latest update
                const lastCheck = getLatestCheckTime(this.db);
        const updateState = this.currentUpdate ? this.db[this.currentUpdate.series].updateState : {
          type: "idle",
          lastCheck
        };
        const state = {
          words: {
            state: this.db.words.state,
            version: this.db.words.version
          },
          kanji: {
            state: this.db.kanji.state,
            version: this.db.kanji.version
          },
          radicals: {
            state: this.db.radicals.state,
            version: this.db.radicals.version
          },
          names: {
            state: this.db.names.state,
            version: this.db.names.version
          },
          updateState,
          updateError: this.lastUpdateError
        };
        this.notifyListeners(jpdict_events_notifyDbStateUpdated(state));
      }
      notifyListeners(message) {
        const listenersCopy = this.listeners.slice();
        for (const listener of listenersCopy) listener(message);
      }
      constructor() {
        jpdict_backend_define_property(this, "db", void 0);
        jpdict_backend_define_property(this, "dbIsInitialized", void 0);
        jpdict_backend_define_property(this, "currentUpdate", void 0);
        jpdict_backend_define_property(this, "lastUpdateError", void 0);
        jpdict_backend_define_property(this, "listeners", []);
        this.doDbStateNotification = this.doDbStateNotification.bind(this);
        this.dbIsInitialized = this.initDb().then((() => true)).catch((() => false));
      }
    }
    function getLatestCheckTime(db) {
      const latestCheckAsNumber = Math.max.apply(null, allMajorDataSeries.map((series => db[series].updateState.lastCheck)));
      return latestCheckAsNumber !== 0 ? new Date(latestCheckAsNumber) : null;
    }
    function hasBuggyObjectStoreClear() {
      const userAgent = navigator.userAgent;
      const firefoxOrThunderbird = /(Firefox|Thunderbird)\/(\d+)/.exec(userAgent);
      if (firefoxOrThunderbird && firefoxOrThunderbird[2]) {
        const version = parseInt(firefoxOrThunderbird[2], 10);
        // The bug has been fixed in Firefox 123.
                return version >= 112 && (firefoxOrThunderbird[1] !== "Firefox" || version < 123);
      }
      return false;
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
    getNegatedCharRange(japaneseChar);
    const onlyDigits = /^[0-9\uff10-\uff19,\uff0c\u3001.\uff0e]+$/;
    function isOnlyDigits(input) {
      return onlyDigits.test(input);
    }
    // CONCATENATED MODULE: ./src/background/yoon.ts
    // きしちにひみりぎじびぴ
    const yoonStart = [ 0x304d, 0x3057, 0x3061, 0x306b, 0x3072, 0x307f, 0x308a, 0x304e, 0x3058, 0x3073, 0x3074 ];
    // ゃゅょ
        const smallY = [ 0x3083, 0x3085, 0x3087 ];
    function endsInYoon(input) {
      const length = [ ...input ].length;
      return length > 1 && smallY.includes(input.codePointAt(length - 1)) && yoonStart.includes(input.codePointAt(length - 2));
    }
    // CONCATENATED MODULE: ./src/background/name-search.ts
    async function nameSearch({abortSignal, input, inputLengths, minInputLength, maxResults}) {
      const result = {
        type: "names",
        data: [],
        more: false,
        matchLen: 0
      };
      // Record the position of existing entries for grouping purposes
            const existingItems = new Map;
      // Record which entries we have already seen so we don't try to merge the same
      // entries when matching on variants
            const have = new Set;
      let currentString = input;
      while (currentString.length > 0) {
        // Check if we have been aborted
        if (abortSignal?.aborted) throw new AbortError;
        const currentInputLength = inputLengths[currentString.length];
        if (minInputLength && minInputLength > currentInputLength) break;
        // Don't lookup the input if we only have digits remaining.
                if (isOnlyDigits(input)) break;
        // Expand ー to its various possibilities
                const variations = [ currentString, ...expandChoon(currentString) ];
        // See if there are any 旧字体 we can convert to 新字体
                const toNew = kyuujitaiToShinjitai(currentString);
        if (toNew !== currentString) variations.push(toNew);
        for (const variant of variations) {
          let names;
          try {
            names = await getNames(variant);
          } catch (e) {
            console.error("Error looking up names", e);
            void Bugsnag.notify(e || "(Error looking up names)");
            return null;
          }
          // Filter out entries we already have
                    names = names.filter((name => !have.has(name.id)));
          if (!names.length) continue;
          result.matchLen = Math.max(result.matchLen, currentInputLength);
          for (const name of names) {
            have.add(name.id);
            // We group together entries where the kana readings and translation
            // details are all equal.
                        const nameContents = getNameEntryHash(name);
            // Check for an existing entry to combine with
                        const existingIndex = existingItems.get(nameContents);
            if (typeof existingIndex !== "undefined") {
              const existingEntry = result.data[existingIndex];
              if (name.k) {
                if (!existingEntry.k) existingEntry.k = [];
                existingEntry.k.push(...name.k);
              }
            } else {
              result.data.push({
                ...name,
                matchLen: currentInputLength
              });
              existingItems.set(nameContents, result.data.length - 1);
            }
            if (result.data.length >= maxResults) return result;
          }
          // Unlike word searching, we don't restrict subsequent searches to this
          // variant since if we get a search for オーサカ we want to return matches
          // for _both_ おうさか and おおさか and name entries.
                }
        // Shorten input, but don't split a ようおん (e.g. きゃ).
                const lengthToShorten = endsInYoon(currentString) ? 2 : 1;
        currentString = currentString.substr(0, currentString.length - lengthToShorten);
      }
      if (!result.data.length) return null;
      return result;
    }
    function getNameEntryHash(name) {
      return name.r.join("-") + "#" + name.tr.map((tr => `${(tr.type || []).join(",")}-${tr.det.join(",")}${tr.cf ? "-" + tr.cf.join(",") : ""}`)).join(";");
    }
    // CONCATENATED MODULE: ./src/utils/romaji.ts
    // Convert using a modified Hepburn-ish romajification
    const replacements = [ [ "\u3042", "a" ], [ "\u3044", "i" ], [ "\u3046", "u" ], [ "\u3048", "e" ], [ "\u304a", "o" ], [ "\u304b", "ka" ], [ "\u304d", "ki" ], [ "\u304f", "ku" ], [ "\u3051", "ke" ], [ "\u3053", "ko" ], [ "\u304d\u3083", "kya" ], [ "\u304d\u3085", "kyu" ], [ "\u304d\u3087", "kyo" ], [ "\u3055", "sa" ], [ "\u3057", "shi" ], [ "\u3059", "su" ], [ "\u305b", "se" ], [ "\u305d", "so" ], [ "\u3057\u3083", "sha" ], [ "\u3057\u3085", "shu" ], [ "\u3057\u3087", "sho" ], [ "\u305f", "ta" ], [ "\u3061", "chi" ], [ "\u3064", "tsu" ], [ "\u3066", "te" ], [ "\u3068", "to" ], [ "\u3061\u3083", "cha" ], [ "\u3061\u3085", "chu" ], [ "\u3061\u3087", "cho" ], [ "\u306a", "na" ], [ "\u306b", "ni" ], [ "\u306c", "nu" ], [ "\u306d", "ne" ], [ "\u306e", "no" ], [ "\u306b\u3083", "nya" ], [ "\u306b\u3085", "nyu" ], [ "\u306b\u3087", "nyo" ], [ "\u306f", "ha" ], [ "\u3072", "hi" ], [ "\u3075", "fu" ], [ "\u3078", "he" ], [ "\u307b", "ho" ], [ "\u3072\u3083", "hya" ], [ "\u3072\u3085", "hyu" ], [ "\u3072\u3087", "hyo" ], [ "\u307e", "ma" ], [ "\u307f", "mi" ], [ "\u3080", "mu" ], [ "\u3081", "me" ], [ "\u3082", "mo" ], [ "\u307f\u3083", "mya" ], [ "\u307f\u3085", "myu" ], [ "\u307f\u3087", "myo" ], [ "\u3084", "ya" ], [ "\u3086", "yu" ], [ "\u3088", "yo" ], [ "\u3089", "ra" ], [ "\u308a", "ri" ], [ "\u308b", "ru" ], [ "\u308c", "re" ], [ "\u308d", "ro" ], [ "\u308a\u3083", "rya" ], [ "\u308a\u3085", "ryu" ], [ "\u308a\u3087", "ryo" ], [ "\u308f", "wa" ], [ "\u3090", "i" ], [ "\u3091", "e" ], [ "\u3092", "o" ], [ "\u3093", "n" ], [ "\u304c", "ga" ], [ "\u304e", "gi" ], [ "\u3050", "gu" ], [ "\u3052", "ge" ], [ "\u3054", "go" ], [ "\u304e\u3083", "gya" ], [ "\u304e\u3085", "gyu" ], [ "\u304e\u3087", "gyo" ], [ "\u3056", "za" ], [ "\u3058", "ji" ], [ "\u305a", "zu" ], [ "\u305c", "ze" ], [ "\u305e", "zo" ], [ "\u3058\u3083", "ja" ], [ "\u3058\u3085", "ju" ], [ "\u3058\u3087", "jo" ], [ "\u3060", "da" ], [ "\u3062", "ji" ], [ "\u3065", "zu" ], [ "\u3067", "de" ], [ "\u3069", "do" ], [ "\u3062\u3083", "ja" ], [ "\u3062\u3085", "ju" ], [ "\u3062\u3087", "jo" ], [ "\u3070", "ba" ], [ "\u3073", "bi" ], [ "\u3076", "bu" ], [ "\u3079", "be" ], [ "\u307c", "bo" ], [ "\u3073\u3083", "bya" ], [ "\u3073\u3085", "byu" ], [ "\u3073\u3087", "byo" ], [ "\u3071", "pa" ], [ "\u3074", "pi" ], [ "\u3077", "pu" ], [ "\u307a", "pe" ], [ "\u307d", "po" ], [ "\u3074\u3083", "pya" ], [ "\u3074\u3085", "pyu" ], [ "\u3074\u3087", "pyo" ], 
    // The following almost always appear in katakana, but well, people do crazy
    // stuff so let's handle them in hiragana too (and it makes handling this
    // easier too since we can just blindly convert everything to hiragana as
    // a pre-processing step).
    [ "\u3044\u3043", "yi" ], [ "\u3044\u3047", "ye" ], [ "\u3046\u3041", "wa" ], [ "\u3046\u3043", "wi" ], [ "\u3046\u3045", "wu" ], [ "\u3046\u3047", "we" ], [ "\u3046\u3049", "wo" ], [ "\u3046\u3085", "wyu" ], [ "\u3094\u3041", "va" ], [ "\u3094\u3043", "vi" ], [ "\u3094", "vu" ], [ "\u3094\u3047", "ve" ], [ "\u3094\u3049", "vo" ], [ "\u3094\u3083", "vya" ], [ "\u3094\u3085", "vyu" ], [ "\u3094\u3043\u3047", "vye" ], [ "\u3094\u3087", "vyo" ], [ "\u304d\u3047", "kye" ], [ "\u304e\u3047", "gye" ], [ "\u304f\u3041", "kwa" ], [ "\u304f\u3043", "kwi" ], [ "\u304f\u3047", "kwe" ], [ "\u304f\u3049", "kwo" ], [ "\u304f\u308e", "kwa" ], [ "\u3050\u3041", "gwa" ], [ "\u3050\u3043", "gwi" ], [ "\u3050\u3047", "gwe" ], [ "\u3050\u3049", "gwo" ], [ "\u3050\u308e", "gwa" ], [ "\u3057\u3047", "she" ], [ "\u3058\u3047", "je" ], [ "\u3059\u3043", "si" ], [ "\u305a\u3043", "zi" ], [ "\u3061\u3047", "che" ], [ "\u3064\u3041", "tsa" ], [ "\u3064\u3043", "tsi" ], [ "\u3064\u3047", "tse" ], [ "\u3064\u3049", "tso" ], [ "\u3064\u3085", "tsyu" ], [ "\u3066\u3043", "ti" ], [ "\u3068\u3045", "tu" ], [ "\u3066\u3085", "tyu" ], [ "\u3067\u3043", "di" ], [ "\u3069\u3045", "du" ], [ "\u3067\u3085", "dyu" ], [ "\u306b\u3047", "nye" ], [ "\u3072\u3047", "hye" ], [ "\u3073\u3047", "bye" ], [ "\u3074\u3047", "pye" ], [ "\u3075\u3041", "fa" ], [ "\u3075\u3043", "fi" ], [ "\u3075\u3047", "fe" ], [ "\u3075\u3049", "fo" ], [ "\u3075\u3083", "fya" ], [ "\u3075\u3085", "fyu" ], [ "\u3075\u3043\u3047", "fye" ], [ "\u3075\u3087", "fyo" ], [ "\u307b\u3045", "hu" ], [ "\u307f\u3047", "mye" ], [ "\u308a\u3047", "rye" ], [ "\u3089\u309c", "la" ], [ "\u308a\u309c", "li" ], [ "\u308b\u309c", "lu" ], [ "\u308c\u309c", "le" ], [ "\u308d\u309c", "lo" ], [ "\u308a\u309c\u3083", "lya" ], [ "\u308a\u309c\u3085", "lyu" ], [ "\u308a\u309c\u3047", "lye" ], [ "\u308a\u309c\u3087", "lyo" ], 
    // These ones don't have hiragana equivalents, but these are basically for
    // マニアック anyway.
    [ "\u30f7", "va" ], [ "\u30f8", "vi" ], [ "\u30f9", "ve" ], [ "\u30fa", "vo" ], [ "\u30fc", "-" ], 
    // Seriously maniac territory here
    [ "\u309f", "yori" ], [ "\u30ff", "koto" ] ];
    const maxReplacementLength = Math.max(...replacements.map((([a]) => a.length)));
    const replacementMap = new Map(replacements);
    function toRomaji(kana) {
      // We don't currently convert half-width katakana simply because we're not
      // expecting to encounter it. If we do, we can use toNormalize for that.
      const hiragana = kanaToHiragana(kana);
      let result = "";
      // Special handling for っ so we can handle すっっっっっっごく high-tension
      // expressions.
      
      // (This will probably never appear in any dictionary entries, but in the
      // interests of making this function a little more general-use we handle it
      // anyway.)
            let explosiveness = 0;
      // Apply any built-up explosiveness when we don't have any following hiragana
      // to apply it to.
            const explode = () => {
        if (explosiveness) {
          result += "'".repeat(explosiveness);
          explosiveness = 0;
        }
      };
      let i = 0;
      while (i < hiragana.length) {
        const firstCharCode = hiragana.charCodeAt(i);
        // Check for っ
                if (firstCharCode === 0x3063) {
          explosiveness++;
          i++;
          continue;
        }
        // Skip anything that is clearly out of range
                if (firstCharCode < 0x3041) {
          explode();
          result += hiragana.substr(i, 1);
          i++;
          continue;
        }
        let substringLength = Math.max(maxReplacementLength, hiragana.length - i);
        while (substringLength) {
          const substring = hiragana.substr(i, substringLength);
          const replacement = replacementMap.get(substring);
          if (replacement) {
            if (explosiveness) {
              const initial = replacement[0] === "c" ? "t" : replacement[0];
              result += initial.repeat(explosiveness);
              explosiveness = 0;
            }
            // Separate a vowel from a previous ん
                        if (replacement.length === 1 && result && result[result.length - 1] === "n" && [ "a", "e", "i", "o", "u" ].includes(replacement)) result += "-";
            result += replacement;
            break;
          }
          substringLength--;
        }
        // No match found, just append the character as-is.
                if (!substringLength) {
          explode();
          result += hiragana.substr(i, 1);
          substringLength = 1;
        }
        i += substringLength;
      }
      // Handle final っ (e.g. あつっ → atsu')
            explode();
      return result;
    }
    // CONCATENATED MODULE: ./src/background/deinflect.ts
     /* unused pure expression or super */ null && function(Reason) {
      Reason[Reason["PolitePastNegative"] = 0] = "PolitePastNegative";
      Reason[Reason["PoliteNegative"] = 1] = "PoliteNegative";
      Reason[Reason["PoliteVolitional"] = 2] = "PoliteVolitional";
      Reason[Reason["Chau"] = 3] = "Chau";
      Reason[Reason["Sugiru"] = 4] = "Sugiru";
      Reason[Reason["PolitePast"] = 5] = "PolitePast";
      Reason[Reason["Tara"] = 6] = "Tara";
      Reason[Reason["Tari"] = 7] = "Tari";
      Reason[Reason["Causative"] = 8] = "Causative";
      Reason[Reason["PotentialOrPassive"] = 9] = "PotentialOrPassive";
      Reason[Reason["Toku"] = 10] = "Toku";
      Reason[Reason["Sou"] = 11] = "Sou";
      Reason[Reason["Tai"] = 12] = "Tai";
      Reason[Reason["Polite"] = 13] = "Polite";
      Reason[Reason["Respectful"] = 14] = "Respectful";
      Reason[Reason["Humble"] = 15] = "Humble";
      Reason[Reason["HumbleOrKansaiDialect"] = 16] = "HumbleOrKansaiDialect";
      Reason[Reason["Past"] = 17] = "Past";
      Reason[Reason["Negative"] = 18] = "Negative";
      Reason[Reason["Passive"] = 19] = "Passive";
      Reason[Reason["Ba"] = 20] = "Ba";
      Reason[Reason["Volitional"] = 21] = "Volitional";
      Reason[Reason["Potential"] = 22] = "Potential";
      Reason[Reason["CausativePassive"] = 23] = "CausativePassive";
      Reason[Reason["Te"] = 24] = "Te";
      Reason[Reason["Zu"] = 25] = "Zu";
      Reason[Reason["Imperative"] = 26] = "Imperative";
      Reason[Reason["MasuStem"] = 27] = "MasuStem";
      Reason[Reason["Adv"] = 28] = "Adv";
      Reason[Reason["Noun"] = 29] = "Noun";
      Reason[Reason["ImperativeNegative"] = 30] = "ImperativeNegative";
      Reason[Reason["Continuous"] = 31] = "Continuous";
      Reason[Reason["Ki"] = 32] = "Ki";
      Reason[Reason["SuruNoun"] = 33] = "SuruNoun";
      Reason[Reason["ZaruWoEnai"] = 34] = "ZaruWoEnai";
      Reason[Reason["NegativeTe"] = 35] = "NegativeTe";
      Reason[Reason["Irregular"] = 36] = "Irregular";
    }({});
    const deinflectL10NKeys = {
      [14]: "deinflect_respectful",
      [15]: "deinflect_humble",
      [16]: "deinflect_humble_or_kansai_dialect",
      [0]: "deinflect_polite_past_negative",
      [1]: "deinflect_polite_negative",
      [2]: "deinflect_polite_volitional",
      [3]: "deinflect_chau",
      [4]: "deinflect_sugiru",
      [5]: "deinflect_polite_past",
      [6]: "deinflect_tara",
      [7]: "deinflect_tari",
      [8]: "deinflect_causative",
      [9]: "deinflect_potential_or_passive",
      [11]: "deinflect_sou",
      [10]: "deinflect_toku",
      [12]: "deinflect_tai",
      [13]: "deinflect_polite",
      [17]: "deinflect_past",
      [18]: "deinflect_negative",
      [19]: "deinflect_passive",
      [20]: "deinflect_ba",
      [21]: "deinflect_volitional",
      [22]: "deinflect_potential",
      [23]: "deinflect_causative_passive",
      [24]: "deinflect_te",
      [25]: "deinflect_zu",
      [26]: "deinflect_imperative",
      [27]: "deinflect_masu_stem",
      [28]: "deinflect_adv",
      [29]: "deinflect_noun",
      [30]: "deinflect_imperative_negative",
      [31]: "deinflect_continuous",
      [32]: "deinflect_ki",
      [33]: "deinflect_suru_noun",
      [34]: "deinflect_zaru_wo_enai",
      [35]: "deinflect_negative_te",
      [36]: "deinflect_irregular"
    };
    var deinflect_Type =  function(Type) {
      // Final word type
      Type[Type["IchidanVerb"] = 1] = "IchidanVerb";
      Type[Type["GodanVerb"] = 2] = "GodanVerb";
      Type[Type["IAdj"] = 4] = "IAdj";
      Type[Type["KuruVerb"] = 8] = "KuruVerb";
      Type[Type["SuruVerb"] = 16] = "SuruVerb";
      Type[Type["SpecialSuruVerb"] = 32] = "SpecialSuruVerb";
      Type[Type["NounVS"] = 64] = "NounVS";
      Type[Type["All"] = 127] = "All";
      // Intermediate types
            Type[Type["Initial"] = 128] = "Initial";
      Type[Type["TaTeStem"] = 256] = "TaTeStem";
      Type[Type["DaDeStem"] = 512] = "DaDeStem";
      Type[Type["MasuStem"] = 1024] = "MasuStem";
      Type[Type["IrrealisStem"] = 2048] = "IrrealisStem";
      return Type;
    }(deinflect_Type || {});
    // prettier-ignore
        const deinflectRuleData = [ 
    // -------------- 7 --------------
    [ "\u3066\u3044\u3089\u3063\u3057\u3083\u3044", "", 128, 256, [ 14, 31, 26 ] ], [ "\u3066\u3044\u3089\u3063\u3057\u3083\u308b", "", 2, 256, [ 14, 31 ] ], [ "\u3067\u3044\u3089\u3063\u3057\u3083\u3044", "", 128, 512, [ 14, 31, 26 ] ], [ "\u3067\u3044\u3089\u3063\u3057\u3083\u308b", "", 2, 512, [ 14, 31 ] ], 
    // -------------- 6 --------------
    [ "\u3044\u3089\u3063\u3057\u3083\u3044", "\u3044\u3089\u3063\u3057\u3083\u308b", 1024, 2, [ 27 ] ], [ "\u3044\u3089\u3063\u3057\u3083\u3044", "\u3044\u3089\u3063\u3057\u3083\u308b", 128, 2, [ 26 ] ], [ "\u304f\u3042\u308a\u307e\u305b\u3093", "\u3044", 128, 4, [ 1 ] ], [ "\u3056\u308b\u3092\u3048\u306a\u3044", "", 4, 2048, [ 34 ] ], [ "\u3056\u308b\u3092\u5f97\u306a\u3044", "", 4, 2048, [ 34 ] ], [ "\u307e\u305b\u3093\u3067\u3057\u305f", "", 128, 1024, [ 0 ] ], [ "\u3066\u3089\u3063\u3057\u3083\u3044", "", 128, 256, [ 14, 31, 26 ] ], [ "\u3066\u3089\u3063\u3057\u3083\u3044", "\u3066\u3089\u3063\u3057\u3083\u308b", 1024, 2, [ 27 ] ], [ "\u3066\u3089\u3063\u3057\u3083\u308b", "", 2, 256, [ 14, 31 ] ], [ "\u3067\u3089\u3063\u3057\u3083\u3044", "", 128, 512, [ 14, 31, 26 ] ], [ "\u3067\u3089\u3063\u3057\u3083\u3044", "\u3067\u3089\u3063\u3057\u3083\u308b", 1024, 2, [ 27 ] ], [ "\u3067\u3089\u3063\u3057\u3083\u308b", "", 2, 512, [ 14, 31 ] ], 
    // -------------- 5 --------------
    [ "\u304a\u3063\u3057\u3083\u3044", "\u304a\u3063\u3057\u3083\u308b", 1024, 2, [ 27 ] ], [ "\u304a\u3063\u3057\u3083\u3044", "\u304a\u3063\u3057\u3083\u308b", 128, 2, [ 26 ] ], [ "\u3056\u308b\u3048\u306a\u3044", "", 4, 2048, [ 34 ] ], [ "\u3056\u308b\u5f97\u306a\u3044", "", 4, 2048, [ 34 ] ], [ "\u3056\u308b\u3092\u3048\u306c", "", 4, 2048, [ 34 ] ], [ "\u3056\u308b\u3092\u5f97\u306c", "", 4, 2048, [ 34 ] ], 
    // -------------- 4 --------------
    [ "\u304b\u3063\u305f\u3089", "\u3044", 128, 4, [ 6 ] ], [ "\u304b\u3063\u305f\u308a", "\u3044", 128, 4, [ 7 ] ], [ "\u304f\u3060\u3055\u3044", "\u304f\u3060\u3055\u308b", 1024, 2, [ 27 ] ], [ "\u304f\u3060\u3055\u3044", "\u304f\u3060\u3055\u308b", 128, 2, [ 26 ] ], [ "\u3053\u3055\u305b\u308b", "\u304f\u308b", 1, 8, [ 8 ] ], [ "\u3053\u3089\u308c\u308b", "\u304f\u308b", 1, 8, [ 9 ] ], [ "\u3056\u308b\u3048\u306c", "", 4, 2048, [ 34 ] ], [ "\u3056\u308b\u5f97\u306c", "", 4, 2048, [ 34 ] ], [ "\u3057\u306a\u3044\u3067", "\u3059\u308b", 128, 16, [ 35 ] ], [ "\u3057\u3055\u305b\u308b", "\u3059\u308b", 1, 32, [ 36, 8 ] ], [ "\u3057\u3089\u308c\u308b", "\u3059\u308b", 1, 32, [ 36, 9 ] ], [ "\u305b\u3055\u305b\u308b", "\u3059\u308b", 1, 32, [ 36, 8 ] ], [ "\u305b\u3089\u308c\u308b", "\u3059\u308b", 1, 32, [ 36, 9 ] ], [ "\u305c\u3055\u305b\u308b", "\u305a\u308b", 1, 32, [ 36, 8 ] ], [ "\u305c\u3089\u308c\u308b", "\u305a\u308b", 1, 32, [ 36, 9 ] ], [ "\u305f\u3086\u305f\u3046", "\u305f\u3086\u305f\u3046", 256, 2, [] ], [ "\u305f\u3086\u3068\u3046", "\u305f\u3086\u3068\u3046", 256, 2, [] ], [ "\u306e\u305f\u307e\u3046", "\u306e\u305f\u307e\u3046", 256, 2, [] ], [ "\u306e\u305f\u3082\u3046", "\u306e\u305f\u3082\u3046", 256, 2, [] ], [ "\u307e\u3057\u305f\u3089", "", 128, 1024, [ 13, 6 ] ], [ "\u307e\u3057\u305f\u308a", "", 128, 1024, [ 13, 7 ] ], [ "\u307e\u3057\u3087\u3046", "", 128, 1024, [ 2 ] ], 
    // -------------- 3 --------------
    [ "\u3044\u305f\u3059", "", 2, 1024, [ 15 ] ], [ "\u3044\u305f\u3059", "", 2, 64, [ 33, 15 ] ], [ "\u304b\u3063\u305f", "\u3044", 128, 4, [ 17 ] ], [ "\u4e0b\u3055\u3044", "\u4e0b\u3055\u308b", 1024, 2, [ 27 ] ], [ "\u4e0b\u3055\u3044", "\u4e0b\u3055\u308b", 128, 2, [ 26 ] ], [ "\u304f\u306a\u3044", "\u3044", 4, 4, [ 18 ] ], [ "\u3051\u308c\u3070", "\u3044", 128, 4, [ 20 ] ], [ "\u3053\u3088\u3046", "\u304f\u308b", 128, 8, [ 21 ] ], [ "\u3053\u308c\u308b", "\u304f\u308b", 1, 8, [ 22 ] ], [ "\u6765\u308c\u308b", "\u6765\u308b", 1, 8, [ 22 ] ], [ "\u4f86\u308c\u308b", "\u4f86\u308b", 1, 8, [ 22 ] ], [ "\u3054\u3056\u3044", "\u3054\u3056\u308b", 1024, 2, [ 27 ] ], [ "\u3054\u5ea7\u3044", "\u3054\u5ea7\u308b", 1024, 2, [ 27 ] ], [ "\u5fa1\u5ea7\u3044", "\u5fa1\u5ea7\u308b", 1024, 2, [ 27 ] ], [ "\u3055\u305b\u308b", "\u308b", 1, 1 | 8, [ 8 ] ], [ "\u3055\u305b\u308b", "\u3059\u308b", 1, 16, [ 8 ] ], [ "\u3055\u306a\u3044", "\u3059\u308b", 4, 32, [ 36, 18 ] ], [ "\u3055\u308c\u308b", "", 1, 2048, [ 23 ] ], [ "\u3055\u308c\u308b", "\u3059\u308b", 1, 16, [ 19 ] ], [ "\u3057\u306a\u3044", "\u3059\u308b", 4, 16, [ 18 ] ], [ "\u3057\u3088\u3046", "\u3059\u308b", 128, 16, [ 21 ] ], [ "\u3058\u3083\u3046", "", 2, 512, [ 3 ] ], [ "\u3059\u304e\u308b", "\u3044", 1, 4, [ 4 ] ], [ "\u3059\u304e\u308b", "", 1, 1024, [ 4 ] ], [ "\u904e\u304e\u308b", "\u3044", 1, 4, [ 4 ] ], [ "\u904e\u304e\u308b", "", 1, 1024, [ 4 ] ], [ "\u305a\u308c\u3070", "\u305a\u308b", 128, 32, [ 36, 20 ] ], [ "\u305f\u307e\u3046", "\u305f\u307e\u3046", 256, 2, [] ], [ "\u305f\u3082\u3046", "\u305f\u3082\u3046", 256, 2, [] ], [ "\u63fa\u8569\u3046", "\u63fa\u8569\u3046", 256, 2, [] ], [ "\u3061\u3083\u3046", "", 2, 256, [ 3 ] ], [ "\u3066\u3044\u308b", "", 1, 256, [ 31 ] ], [ "\u3066\u304a\u308b", "", 2, 256, [ 16, 31 ] ], [ "\u3067\u3044\u308b", "", 1, 512, [ 31 ] ], [ "\u3067\u304a\u308b", "", 2, 512, [ 16, 31 ] ], [ "\u3067\u304d\u308b", "\u3059\u308b", 1, 16, [ 22 ] ], [ "\u306a\u3044\u3067", "", 128, 2048, [ 35 ] ], [ "\u306a\u3055\u3044", "", 128, 1024, [ 14, 26 ] ], [ "\u306a\u3055\u3044", "\u306a\u3055\u308b", 1024, 2, [ 27 ] ], [ "\u306a\u3055\u3044", "\u306a\u3055\u308b", 128, 2, [ 26 ] ], [ "\u306a\u3055\u308b", "", 2, 1024, [ 14 ] ], [ "\u306a\u3055\u308b", "", 2, 64, [ 33, 14 ] ], [ "\u306b\u306a\u308b", "", 2, 1024, [ 14 ] ], [ "\u306b\u306a\u308b", "", 2, 64, [ 33, 14 ] ], [ "\u307e\u3057\u305f", "", 128, 1024, [ 5 ] ], [ "\u307e\u3057\u3066", "", 128, 1024, [ 13, 24 ] ], [ "\u307e\u305b\u3093", "", 128, 1024, [ 1 ] ], [ "\u3089\u308c\u308b", "\u308b", 1, 1 | 8, [ 9 ] ], 
    // -------------- 2 --------------
    [ "\u81f4\u3059", "", 2, 1024, [ 15 ] ], [ "\u81f4\u3059", "", 2, 64, [ 33, 15 ] ], [ "\u3048\u3070", "\u3046", 128, 2, [ 20 ] ], [ "\u3048\u308b", "\u3046", 1, 2, [ 22 ] ], [ "\u304a\u3046", "\u3046", 128, 2, [ 21 ] ], [ "\u4ef0\u3044", "\u4ef0\u308b", 1024, 2, [ 27 ] ], [ "\u4ef0\u3044", "\u4ef0\u308b", 128, 2, [ 26 ] ], [ "\u304f\u3066", "\u3044", 128, 4, [ 24 ] ], [ "\u3051\u3070", "\u304f", 128, 2, [ 20 ] ], [ "\u3052\u3070", "\u3050", 128, 2, [ 20 ] ], [ "\u3051\u308b", "\u304f", 1, 2, [ 22 ] ], [ "\u3052\u308b", "\u3050", 1, 2, [ 22 ] ], [ "\u3053\u3044", "\u304f\u308b", 128, 8, [ 26 ] ], [ "\u3053\u3046", "\u304f", 128, 2, [ 21 ] ], [ "\u3054\u3046", "\u3050", 128, 2, [ 21 ] ], [ "\u3057\u308d", "\u3059\u308b", 128, 16, [ 26 ] ], [ "\u3055\u305a", "\u3059\u308b", 128, 32, [ 36, 25 ] ], [ "\u3059\u304e", "\u3044", 128, 4, [ 4 ] ], [ "\u3059\u304e", "", 128, 1024, [ 4 ] ], [ "\u904e\u304e", "\u3044", 128, 4, [ 4 ] ], [ "\u904e\u304e", "", 128, 1024, [ 4 ] ], [ "\u3059\u308b", "", 16, 64, [ 33 ] ], [ "\u305b\u305a", "\u3059\u308b", 128, 16, [ 25 ] ], [ "\u305b\u306c", "\u3059\u308b", 128, 16, [ 18 ] ], [ "\u305b\u3093", "\u3059\u308b", 128, 16, [ 18 ] ], [ "\u305b\u3070", "\u3059", 128, 2, [ 20 ] ], [ "\u305b\u3070", "\u3059\u308b", 128, 32, [ 36, 20 ] ], [ "\u305b\u3088", "\u3059\u308b", 128, 16, [ 26 ] ], [ "\u305b\u308b", "\u3059", 1, 2, [ 22 ] ], [ "\u305b\u308b", "", 1, 2048, [ 8 ] ], [ "\u305c\u305a", "\u305a\u308b", 128, 32, [ 36, 25 ] ], [ "\u305c\u306c", "\u305a\u308b", 128, 32, [ 36, 18 ] ], [ "\u305c\u3088", "\u305a\u308b", 128, 32, [ 36, 26 ] ], [ "\u305d\u3046", "", 128, 1024, [ 11 ] ], [ "\u305d\u3046", "\u3044", 128, 4, [ 11 ] ], [ "\u305d\u3046", "\u3059", 128, 2, [ 21 ] ], [ "\u305d\u3046", "\u3059\u308b", 128, 32, [ 36, 21 ] ], [ "\u305f\u3044", "", 4, 1024, [ 12 ] ], [ "\u305f\u3089", "", 128, 256, [ 6 ] ], [ "\u3060\u3089", "", 128, 512, [ 6 ] ], [ "\u305f\u308a", "", 128, 256, [ 7 ] ], [ "\u3060\u308a", "", 128, 512, [ 7 ] ], [ "\u3066\u3070", "\u3064", 128, 2, [ 20 ] ], [ "\u3066\u308b", "\u3064", 1, 2, [ 22 ] ], [ "\u3066\u308b", "", 1, 256, [ 31 ] ], [ "\u3067\u308b", "", 1, 512, [ 31 ] ], [ "\u3068\u3046", "\u3064", 128, 2, [ 21 ] ], [ "\u3068\u304f", "", 2, 256, [ 10 ] ], [ "\u3068\u308b", "", 2, 256, [ 16, 31 ] ], [ "\u3069\u304f", "", 2, 512, [ 10 ] ], [ "\u3069\u308b", "", 2, 512, [ 16, 31 ] ], [ "\u306a\u3044", "", 4, 2048, [ 18 ] ], [ "\u306d\u3070", "\u306c", 128, 2, [ 20 ] ], [ "\u306d\u308b", "\u306c", 1, 2, [ 22 ] ], [ "\u306e\u3046", "\u306c", 128, 2, [ 21 ] ], [ "\u3079\u3070", "\u3076", 128, 2, [ 20 ] ], [ "\u3079\u308b", "\u3076", 1, 2, [ 22 ] ], [ "\u307c\u3046", "\u3076", 128, 2, [ 21 ] ], [ "\u307e\u3059", "", 128, 1024, [ 13 ] ], [ "\u307e\u305b", "", 128, 1024, [ 13, 26 ] ], [ "\u3081\u3070", "\u3080", 128, 2, [ 20 ] ], [ "\u3081\u308b", "\u3080", 1, 2, [ 22 ] ], [ "\u3082\u3046", "\u3080", 128, 2, [ 21 ] ], [ "\u3088\u3046", "\u308b", 128, 1 | 8, [ 21 ] ], [ "\u308c\u3070", "\u308b", 128, 1 | 2 | 8 | 16, [ 20 ] ], [ "\u308c\u308b", "\u308b", 1, 1 | 2, [ 22 ] ], [ "\u308c\u308b", "", 1, 2048, [ 19 ] ], [ "\u308d\u3046", "\u308b", 128, 2, [ 21 ] ], 
    // Irregular て-form stems
    [ "\u3044\u3063", "\u3044\u304f", 256, 2, [] ], [ "\u304a\u3046", "\u304a\u3046", 256, 2, [] ], [ "\u3053\u3046", "\u3053\u3046", 256, 2, [] ], [ "\u305d\u3046", "\u305d\u3046", 256, 2, [] ], [ "\u3068\u3046", "\u3068\u3046", 256, 2, [] ], [ "\u884c\u3063", "\u884c\u304f", 256, 2, [] ], [ "\u901d\u3063", "\u901d\u304f", 256, 2, [] ], [ "\u5f80\u3063", "\u5f80\u304f", 256, 2, [] ], [ "\u8acb\u3046", "\u8acb\u3046", 256, 2, [] ], [ "\u4e5e\u3046", "\u4e5e\u3046", 256, 2, [] ], [ "\u604b\u3046", "\u604b\u3046", 256, 2, [] ], [ "\u554f\u3046", "\u554f\u3046", 256, 2, [] ], [ "\u8ca0\u3046", "\u8ca0\u3046", 256, 2, [] ], [ "\u6cbf\u3046", "\u6cbf\u3046", 256, 2, [] ], [ "\u6dfb\u3046", "\u6dfb\u3046", 256, 2, [] ], [ "\u526f\u3046", "\u526f\u3046", 256, 2, [] ], [ "\u53ad\u3046", "\u53ad\u3046", 256, 2, [] ], [ "\u7d66\u3046", "\u7d66\u3046", 256, 2, [] ], [ "\u8cdc\u3046", "\u8cdc\u3046", 256, 2, [] ], [ "\u5ba3\u3046", "\u5ba3\u3046", 256, 2, [] ], [ "\u66f0\u3046", "\u66f0\u3046", 256, 2, [] ], 
    // -------------- 1 --------------
    [ "\u3044", "\u3046", 1024, 2, [ 27 ] ], [ "\u3044", "\u304f", 256, 2, [] ], [ "\u3044", "\u3050", 512, 2, [] ], [ "\u3044", "\u308b", 128, 8, [ 26 ] ], [ "\u3048", "\u3046", 128, 2, [ 26 ] ], [ "\u304b", "\u304f", 2048, 2, [] ], [ "\u304c", "\u3050", 2048, 2, [] ], [ "\u304d", "\u3044", 128, 4, [ 32 ] ], [ "\u304d", "\u304f", 1024, 2, [ 27 ] ], [ "\u304d", "\u304f\u308b", 256, 8, [] ], [ "\u304d", "\u304f\u308b", 1024, 8, [ 27 ] ], [ "\u304e", "\u3050", 1024, 2, [ 27 ] ], [ "\u304f", "\u3044", 128, 4, [ 28 ] ], [ "\u3051", "\u304f", 128, 2, [ 26 ] ], [ "\u3052", "\u3050", 128, 2, [ 26 ] ], [ "\u3053", "\u304f\u308b", 2048, 8, [] ], [ "\u3055", "\u3044", 128, 4, [ 29 ] ], [ "\u3055", "\u3059", 2048, 2, [] ], [ "\u3057", "\u3059", 1024, 2, [ 27 ] ], [ "\u3057", "\u3059\u308b", 1024, 16, [ 27 ] ], [ "\u3057", "\u3059", 256, 2, [] ], [ "\u3057", "\u3059\u308b", 256, 16, [] ], [ "\u305a", "", 128, 2048, [ 25 ] ], [ "\u305b", "\u3059", 128, 2, [ 26 ] ], [ "\u305b", "\u3059\u308b", 128, 32, [ 36, 26 ] ], [ "\u305f", "\u3064", 2048, 2, [] ], [ "\u305f", "", 128, 256, [ 17 ] ], [ "\u3060", "", 128, 512, [ 17 ] ], [ "\u3061", "\u3064", 1024, 2, [ 27 ] ], [ "\u3063", "\u3046", 256, 2, [] ], [ "\u3063", "\u3064", 256, 2, [] ], [ "\u3063", "\u308b", 256, 2, [] ], [ "\u3066", "", 128, 256, [ 24 ] ], [ "\u3066", "\u3064", 128, 2, [ 26 ] ], [ "\u3067", "", 128, 512, [ 24 ] ], [ "\u306a", "\u306c", 2048, 2, [] ], [ "\u306a", "", 128, 1 | 2 | 8 | 16, [ 30 ] ], [ "\u306b", "\u306c", 1024, 2, [ 27 ] ], [ "\u306c", "", 128, 2048, [ 18 ] ], [ "\u306d", "\u306c", 128, 2, [ 26 ] ], [ "\u3070", "\u3076", 2048, 2, [] ], [ "\u3073", "\u3076", 1024, 2, [ 27 ] ], [ "\u3079", "\u3076", 128, 2, [ 26 ] ], [ "\u307e", "\u3080", 2048, 2, [] ], [ "\u307f", "\u3080", 1024, 2, [ 27 ] ], [ "\u3081", "\u3080", 128, 2, [ 26 ] ], [ "\u3088", "\u308b", 128, 1, [ 26 ] ], [ "\u3089", "\u308b", 2048, 2, [] ], [ "\u308a", "\u308b", 1024, 2, [ 27 ] ], [ "\u308c", "\u308b", 128, 2, [ 26 ] ], [ "\u308d", "\u308b", 128, 1, [ 26 ] ], [ "\u308f", "\u3046", 2048, 2, [] ], [ "\u3093", "\u306c", 512, 2, [] ], [ "\u3093", "\u3076", 512, 2, [] ], [ "\u3093", "\u3080", 512, 2, [] ], [ "\u3093", "", 128, 2048, [ 18 ] ] ];
    const deinflectRuleGroups = [];
    function getDeinflectRuleGroups() {
      if (!deinflectRuleGroups.length) {
        let prevLen = -1;
        let ruleGroup;
        for (const [from, to, fromType, toType, reasons] of deinflectRuleData) {
          const rule = {
            from,
            to,
            fromType,
            toType,
            reasons
          };
          if (prevLen !== rule.from.length) {
            prevLen = rule.from.length;
            ruleGroup = {
              rules: [],
              fromLen: prevLen
            };
            deinflectRuleGroups.push(ruleGroup);
          }
          ruleGroup.rules.push(rule);
        }
      }
      return deinflectRuleGroups;
    }
    // Returns an array of possible de-inflected versions of |word|.
        function deinflect(word) {
      let result = [];
      const resultIndex = {};
      const ruleGroups = getDeinflectRuleGroups();
      const original = {
        word,
        // Initially, the type of word is unknown, so we set the type mask to
        // match all rules except stems, that don't make sense on their own.
        type: 0xffff ^ (256 | 512 | 2048),
        reasonChains: []
      };
      result.push(original);
      resultIndex[word] = 0;
      let i = 0;
      do {
        const thisCandidate = result[i];
        // Don't deinflect masu-stem results of Ichidan verbs any further since
        // they should already be the plain form.
        
        // Without this we would take something like 食べて, try deinflecting it as
        // a masu stem into 食べてる and then try de-inflecting it as a continuous
        // form. However, we should just stop immediately after de-inflecting to
        // the plain form.
                if (thisCandidate.type & 1 && thisCandidate.reasonChains.length === 1 && thisCandidate.reasonChains[0].length === 1 && thisCandidate.reasonChains[0][0] === 27) continue;
        const word = thisCandidate.word;
        const type = thisCandidate.type;
        // Ichidan verbs have only one stem, which is the plain form minus the
        // final る. Since the stem is shorter than the plain form, to avoid
        // adding multiple entries for all possible stem variations to the rule
        // data array, we forward the stem to the plain form programmatically.
                if (type & (1024 | 256 | 2048)) {
          const reason = [];
          // Add the "masu" reason only if the word is solely the masu stem.
                    if (type & 1024 && !thisCandidate.reasonChains.length) reason.push([ 27 ]);
          // Ichidan verbs attach the auxiliary verbs られる and させる instead of
          // れる and せる for the passive and causative forms to their stem. Since
          // られる and させる exist as separate rules that bypass the irrealis stem
          // type, we ignore the the rules with a to-type of IrrealisStem for the
          // passive and causative, i.e. the rules for れる and せる.
          // Similarly, we need to ignore the rule for the causative passive, as
          // the contraction of せられる to される is incorrect for Ichidan verbs.
                    const inapplicableForm = type & 2048 && (thisCandidate.reasonChains[0][0] == 19 || thisCandidate.reasonChains[0][0] == 8 || thisCandidate.reasonChains[0][0] == 23);
          if (!inapplicableForm) result.push({
            word: word + "\u308b",
            type: 1 | 8,
            reasonChains: [ ...thisCandidate.reasonChains, ...reason ]
          });
        }
        for (const ruleGroup of ruleGroups) {
          if (ruleGroup.fromLen > word.length) continue;
          const ending = word.slice(-ruleGroup.fromLen);
          const hiraganaEnding = kanaToHiragana(ending);
          for (const rule of ruleGroup.rules) {
            if (!(type & rule.fromType)) continue;
            if (ending !== rule.from && hiraganaEnding !== rule.from) continue;
            const newWord = word.substring(0, word.length - rule.from.length) + rule.to;
            if (!newWord.length) continue;
            // Continue if the rule introduces a duplicate in the reason chain,
            // as it wouldn't make sense grammatically.
                        const ruleReasons = new Set(rule.reasons);
            if (thisCandidate.reasonChains.flat().some((r => ruleReasons.has(r)))) continue;
            // If we already have a candidate for this word with the same
            // 'to' type(s), expand the possible reasons by starting a new
            // reason chain.
            
            // We do not want to start a new reason chain with a pure forwarding
            // rule, represented by an empty reasons array, as it cannot stand on
            // its own and needs a preceding rule to make sense.
            
            // If the 'to' type(s) differ, then we'll add a separate candidate
            // and just hope that when we go to match against dictionary words
            // we'll filter out the mismatching one(s).
                        if (resultIndex[newWord]) {
              const candidate = result[resultIndex[newWord]];
              if (candidate.type === rule.toType) {
                if (rule.reasons.length) 
                // Start a new reason chain
                candidate.reasonChains.unshift([ ...rule.reasons ]);
                continue;
              }
            }
            resultIndex[newWord] = result.length;
            
            // Start a new candidate
            
            // Deep clone multidimensional array
                        const reasonChains = [];
            for (const array of thisCandidate.reasonChains) reasonChains.push([ ...array ]);
            // We only need to add something to the reason chain if the rule is
            // not a pure forwarding rule, i.e. the reasons array is not empty.
                        if (rule.reasons.length) 
            // Add our new reason in
            // If we already have reason chains, prepend to the first chain
            if (reasonChains.length) {
              const firstReasonChain = reasonChains[0];
              // Rather having causative + passive, combine the two rules into
              // "causative passive":
                            if (rule.reasons[0] === 8 && firstReasonChain.length && firstReasonChain[0] === 9) firstReasonChain.splice(0, 1, 23); else if (// Add the "masu" reason only if the word is solely the masu stem.
              rule.reasons[0] === 27 && firstReasonChain.length) ; else firstReasonChain.unshift(...rule.reasons);
            } else 
            // Add new reason to the start of the chain
            reasonChains.push([ ...rule.reasons ]);
            const candidate = {
              reasonChains,
              type: rule.toType,
              word: newWord
            };
            result.push(candidate);
          }
        }
      } while (++i < result.length);
      // Post-process to filter out any lingering intermediate forms
            result = result.filter((r => r.type & 127));
      return result;
    }
    // CONCATENATED MODULE: ./src/background/word-search.ts
    async function wordSearch({abortSignal, getWords, input, inputLengths, maxResults, includeRomaji}) {
      let longestMatch = 0;
      let have = new Set;
      const result = {
        type: "words",
        data: [],
        more: false,
        matchLen: 0
      };
      let includeVariants = true;
      while (input.length) {
        // Check if we have been aborted
        if (abortSignal?.aborted) throw new AbortError;
        // If we only have digits left, don't bother looking them up since we don't
        // want to bother the user by showing the popup every time they hover over a
        // digit.
                if (isOnlyDigits(input)) break;
        // If we include a de-inflected substring we show it in the reasons string.
                const showInflections = !!result.data.length;
        const variations = [ input ];
        // Generate variations on this substring
                if (includeVariants) {
          // Expand ー to its various possibilities
          variations.push(...expandChoon(input));
          // See if there are any 旧字体 we can convert to 新字体
                    const toNew = kyuujitaiToShinjitai(input);
          if (toNew !== input) variations.push(toNew);
        }
        for (const variant of variations) {
          const wordResults = await lookupCandidates({
            abortSignal,
            existingEntries: have,
            getWords,
            input: variant,
            includeRomaji,
            maxResults,
            showInflections
          });
          if (!wordResults.length) continue;
          // Now that we have filtered our set of matches to those we plan to keep,
          // update our duplicates set.
                    have = new Set([ ...have, ...wordResults.map((word => word.id)) ]);
          // And now that we know we will add at least one entry for this candidate
          // we can update our longest match length.
                    longestMatch = Math.max(longestMatch, inputLengths[input.length]);
          // Add the results to the list
          
          // TODO: This is not right. If we end up with exactly maxResults, we
          // shouldn't set `more` to true unless we know that there were actually
          // more results. Fixing this will require changing the signature
          // GetWordsFunction, however.
                    if (result.data.length + wordResults.length >= maxResults) result.more = true;
          result.data.push(...wordResults.slice(0, maxResults - result.data.length));
          // Continue refining this variant excluding all others
                    input = variant;
          includeVariants = false;
          break;
        }
        if (result.data.length >= maxResults) break;
        // Shorten input, but don't split a ようおん (e.g. きゃ).
                const lengthToShorten = endsInYoon(input) ? 2 : 1;
        input = input.substring(0, input.length - lengthToShorten);
      }
      if (!result.data.length) return null;
      result.matchLen = longestMatch;
      return result;
    }
    async function lookupCandidates({abortSignal, existingEntries, getWords, includeRomaji, input, maxResults, showInflections}) {
      const result = [];
      const candidates = deinflect(input);
      for (const [candidateIndex, candidate] of candidates.entries()) {
        if (abortSignal?.aborted) throw new AbortError;
        let wordResults = await lookupCandidate({
          candidate,
          getWords,
          includeRomaji,
          originalInput: input,
          isDeinflection: candidateIndex !== 0,
          maxResults,
          showInflections
        });
        // Drop redundant results
                wordResults = wordResults.filter((word => !existingEntries.has(word.id)));
        result.push(...wordResults);
      }
      // The results are currently sorted for each candidate lookup but we really
      // want to sort _across_ all the candidate lookups.
            word_match_sorting_sortWordResults(result);
      return result;
    }
    async function lookupCandidate({candidate, getWords, includeRomaji, originalInput: input, isDeinflection, maxResults, showInflections}) {
      let matches = await getWords({
        input: candidate.word,
        maxResults
      });
      // The deinflection code doesn't know anything about the actual words. It just
      // produces possible deinflections along with a type that says what kind of a
      // word (e.g. godan verb, i-adjective etc.) it must be in order for that
      // deinflection to be valid.
      
      // So, if we have a possible deinflection, we need to check that it matches
      // the kind of word we looked up.
            matches = matches.filter((match => !isDeinflection || entryMatchesType(match, candidate.type)));
      if (!matches.length) return [];
      // Generate the reason string
            let reason;
      if (candidate.reasonChains.length) {
        reason = "< " + candidate.reasonChains.map((reasonList => reasonList.map((reason => browser_polyfill_default().i18n.getMessage(deinflectL10NKeys[reason]))).join(" < "))).join(browser_polyfill_default().i18n.getMessage("deinflect_alternate"));
        if (showInflections) reason += ` < ${input}`;
      }
      // Process each match into a suitable result
            const result = [];
      for (const match of matches) {
        const wordResult = {
          ...match,
          reason
        };
        if (includeRomaji) wordResult.romaji = match.r.map((r => toRomaji(r.ent)));
        result.push(wordResult);
      }
      return result;
    }
    // Tests if a given entry matches the type of a generated deflection
        function entryMatchesType(entry, type) {
      const hasMatchingSense = test => entry.s.some((sense => sense.pos?.some(test)));
      if (type & deinflect_Type.IchidanVerb && hasMatchingSense((pos => pos.startsWith("v1")))) return true;
      if (type & deinflect_Type.GodanVerb && hasMatchingSense((pos => pos.startsWith("v5") || pos.startsWith("v4")))) return true;
      if (type & deinflect_Type.IAdj && hasMatchingSense((pos => pos.startsWith("adj-i")))) return true;
      if (type & deinflect_Type.KuruVerb && hasMatchingSense((pos => pos === "vk"))) return true;
      if (type & deinflect_Type.SuruVerb && hasMatchingSense((pos => pos === "vs-i" || pos === "vs-s"))) return true;
      if (type & deinflect_Type.SpecialSuruVerb && hasMatchingSense((pos => pos === "vs-s" || pos === "vz"))) return true;
      if (type & deinflect_Type.NounVS && hasMatchingSense((pos => pos === "vs"))) return true;
      return false;
    }
    // CONCATENATED MODULE: ./src/background/jpdict.ts
    // Minimum amount of time to wait before checking for database updates.
    const UPDATE_THRESHOLD_MS = 12 * 60 * 60 * 1000;
 // 12 hours
    
    // Backend setup
    
        const backend = "Worker" in self ? new JpdictWorkerBackend : new JpdictLocalBackend;
    // Local state tracking
    
    // We track some state locally because we want to avoid querying the database
    // when it is being updated since this can block for several seconds.
        let dbState = {
      words: {
        state: "init",
        version: null,
        fallbackState: "unloaded"
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
    // Is the IDB database available for the given series?
    
    // We structure the tables and access them in a way that means we _should_ be
    // able to use, e.g., the 'words' table in a performant manner while the 'names'
    // table is being updated, but this doesn't appear to work for Chrome which
    // suffers significant lag when any tables in the database are being accessed.
    
    // As a result we simply don't touch IDB while it's being updated.
        function getDataSeriesStatus(series) {
      // If we're unavailable or initializing, treat the database as unavailable
      // regardless of whether or not we're updating.
      if (dbState[series].state === "unavailable" || dbState[series].state === "init") return "unavailable";
      // Otherwise, whether we're empty or ok, check if we're updating.
            if (dbState.updateState.type !== "idle") return "updating";
      // Otherwise treat empty as unavailable.
            return dbState[series].state === "ok" ? "ok" : "unavailable";
    }
    // Fallback words database to use if we can't read the IndexedDB one (e.g.
    // because we hit a quota error, or because it is currently being updated).
        const fallbackDatabaseLoader = new FlatFileDatabaseLoader({
      // If 'process' is defined, we're running in a node environment, which
      // which probably means we're running in a test environment and should not
      // bother trying to call bugsnag.
      bugsnag: typeof process === "object" ? void 0 : Bugsnag
    });
    // We also need to track the lastUpdateTime locally. That's because if
    // we tried to read it from extension storage when we get worker messages,
    // because the API is async, on Chrome we can get situations where we actually
    // end up applying the database state messages in the wrong order.
        let lastUpdateTime = null;
    
    // Public API
    
        let initPromise;
    let initComplete = false;
    async function initDb({lang, onUpdate}) {
      if (initPromise) {
        await initPromise;
        return;
      }
      let resolveInitPromise;
      initPromise = new Promise((resolve => {
        resolveInitPromise = resolve;
      }));
      lastUpdateTime = await getLastUpdateTime();
      Bugsnag.leaveBreadcrumb(`Got last update time of ${lastUpdateTime}`);
      // Register the listener
            backend.addEventListener((async event => {
        switch (event.type) {
         case "dbstateupdated":
          {
            // Prepare the new state while preserving the existing fallback state.
            const state = {
              ...event.state,
              words: {
                ...event.state.words,
                fallbackState: dbState.words.fallbackState
              }
            };
            // Fill out the lastCheck field in the updateState.
            
            // This value will only be set if we already did a check this session.
            // It is _not_ a stored value.  So, if it is not set, use the value we
            // stored instead.
                        if (state.updateState.lastCheck === null && lastUpdateTime) state.updateState.lastCheck = new Date(lastUpdateTime);
            dbState = state;
            try {
              onUpdate(state);
            } catch (e) {
              void Bugsnag.notify(e);
            }
            if (!initComplete) {
              initComplete = true;
              resolveInitPromise();
            }
          }
          break;

         case "dbupdatecomplete":
          if (event.lastCheck) void setLastUpdateTime(event.lastCheck.getTime());
          break;

         case "breadcrumb":
          Bugsnag.leaveBreadcrumb(event.message);
          break;

         case "error":
          {
            const error = new Error(event.message);
            error.name = event.name;
            error.stack = event.stack;
            void Bugsnag.notify(error, {
              severity: event.severity
            });
          }
          break;
        }
      }));
      // Make sure updates to the fallback database loading state are also reported.
      
      // But first, reset any loads that might have errored or hung so that the
      // user can retry the load by disabling/enabling the add-on.
            fallbackDatabaseLoader.resetIfNotLoaded();
      fallbackDatabaseLoader.onUpdate = fallbackDatabaseState => {
        dbState.words.fallbackState = fallbackDatabaseState;
        onUpdate(dbState);
      };
      // Fetch the initial state
            backend.queryState();
      // If we updated within the minimum window then we don't need to update
            if (lastUpdateTime && Date.now() - lastUpdateTime < UPDATE_THRESHOLD_MS) Bugsnag.leaveBreadcrumb("Downloaded data is up-to-date"); else jpdict_updateDb({
        lang,
        force: false
      });
      await initPromise;
    }
    async function getLastUpdateTime() {
      try {
        const getResult = await browser_polyfill_default().storage.local.get("lastDbUpdateTime");
        if (typeof getResult.lastDbUpdateTime === "number") return getResult.lastDbUpdateTime;
      } catch {
        // Extension storage can sometimes randomly fail with 'An unexpected error
        // occurred'. Ignore, but log it.
        console.warn("Failed to get last update time from storage");
      }
      return null;
    }
    async function setLastUpdateTime(time) {
      // Make sure to update the local version too.
      lastUpdateTime = time;
      // Extension storage can randomly fail with "An unexpected error occurred".
            try {
        if (time) await browser_polyfill_default().storage.local.set({
          lastDbUpdateTime: time
        }); else await browser_polyfill_default().storage.local.remove("lastDbUpdateTime");
        // Try to remove any old value we stored so we don't end up using it
        // accidentally.
                browser_polyfill_default().storage.local.remove("lastUpdateKanjiDb").catch((() => {}));
      } catch {
        // Don't notify Bugsnag because this is a common error in Firefox.
      }
    }
    function jpdict_updateDb(params) {
      backend.updateDb(params);
    }
    function jpdict_cancelUpdateDb() {
      backend.cancelUpdateDb();
    }
    function jpdict_deleteDb() {
      backend.deleteDb();
      void setLastUpdateTime(null);
    }
    // ---------------------------------------------------------------------------
    
    // Words
    
    // ---------------------------------------------------------------------------
        const WORDS_MAX_ENTRIES = 7;
    async function searchWords({input, abortSignal, includeRomaji = false, max = 0}) {
      let [word, inputLengths] = normalizeInput(input);
      const maxResults = max > 0 ? Math.min(WORDS_MAX_ENTRIES, max) : WORDS_MAX_ENTRIES;
      // Determine which dictionary to use: The IndexedDB one or the flat-file
      // fallback dictionary.
            let getWords;
      const dbStatus = getDataSeriesStatus("words");
      if (dbStatus === "ok") getWords = ({input, maxResults}) => dist_getWords(input, {
        matchType: "exact",
        limit: maxResults
      }); else try {
        const flatFileDatabase = await fallbackDatabaseLoader.database;
        getWords = flatFileDatabase.getWords.bind(flatFileDatabase);
        // The IDB database handles kana variations but for the flat file database
        // we need to do it ourselves.
                word = kanaToHiragana(word);
      } catch {
        return [ null, dbStatus ];
      }
      return [ await wordSearch({
        abortSignal,
        getWords,
        input: word,
        inputLengths,
        maxResults,
        includeRomaji
      }), dbStatus !== "ok" ? dbStatus : void 0 ];
    }
    // ---------------------------------------------------------------------------
    
    // Translate
    
    // ---------------------------------------------------------------------------
        async function translate({text, includeRomaji = false}) {
      const result = {
        type: "translate",
        data: [],
        textLen: text.length,
        more: false
      };
      let skip;
      while (text.length > 0) {
        const [searchResult, dbStatus] = await searchWords({
          input: text,
          max: 1,
          includeRomaji
        });
        if (searchResult && searchResult.data) {
          if (result.data.length >= WORDS_MAX_ENTRIES) {
            result.more = true;
            break;
          }
          // Just take first match
                    result.data.push(searchResult.data[0]);
          skip = searchResult.matchLen;
        } else skip = 1;
        if (searchResult && dbStatus) result.dbStatus = dbStatus;
        text = text.substring(skip);
      }
      if (result.data.length === 0) return null;
      result.textLen -= text.length;
      return result;
    }
    // ---------------------------------------------------------------------------
    
    // Kanji
    
    // ---------------------------------------------------------------------------
        async function searchKanji(input) {
      const kanjiStatus = getDataSeriesStatus("kanji");
      const radicalStatus = getDataSeriesStatus("radicals");
      if (kanjiStatus === "unavailable" || radicalStatus === "unavailable") return "unavailable";
      if (kanjiStatus === "updating" || radicalStatus === "updating") return "updating";
      // Normalize the input in order to be able to parse radicals as kanji.
            const [normalized] = normalizeInput(input);
      // Do some very elementary filtering on kanji
      
      // We know that the input should be mostly Japanese so we just do some very
      // basic filtering to drop any hiragana / katakana.
      
      // We _could_ do a more thoroughgoing check based on all the different Unicode
      // ranges but they're constantly being expanded and if some obscure character
      // ends up in the kanji database we want to show it even if it doesn't match
      // our expectations of what characters are kanji.
            const kanjiLastIndex = new Map;
      const kanji = [ ...new Set([ ...normalized ].filter(((c, i) => {
        const cp = c.codePointAt(0);
        const isKanji = // Don't bother looking up Latin text
        cp >= 0x3000 && // Or hiragana (yeah, 0x1b0001 is also hiragana but this is good enough)
        !(cp >= 0x3040 && cp <= 0x309f) && // Or katakana
        !(cp >= 0x30a0 && cp <= 0x30ff) && !(cp >= 0x31f0 && cp <= 0x31ff) && // Or half-width katakana
        !(cp >= 0xff65 && cp <= 0xff9f);
        if (isKanji) kanjiLastIndex.set(c, i);
        return isKanji;
      }))) ];
      const logWarningMessage = message => {
        // Ignore certain warnings that are not currently meaningful
        if (message.startsWith("Couldn't find a radical or kanji entry for")) return;
        void Bugsnag.notify(message, {
          severity: "warning"
        });
      };
      let result;
      try {
        result = await getKanji({
          kanji,
          lang: dbState.kanji.version?.lang ?? "en",
          logWarningMessage
        });
      } catch (e) {
        console.error("Error looking up kanji", e);
        void Bugsnag.notify(e || "(Error looking up kanji)");
        return null;
      }
      if (!result.length) return null;
      // Work out what the last matched character was
            const matchLen = Math.max(...result.map((r => kanjiLastIndex.get(r.c) || 0))) + 1;
      return {
        type: "kanji",
        data: result,
        matchLen
      };
    }
    // ---------------------------------------------------------------------------
    
    // Names
    
    // ---------------------------------------------------------------------------
        const NAMES_MAX_ENTRIES = 20;
    async function searchNames({abortSignal, input, minLength}) {
      const dbStatus = getDataSeriesStatus("names");
      if (dbStatus !== "ok") return dbStatus;
      const [normalized, inputLengths] = normalizeInput(input);
      return nameSearch({
        abortSignal,
        input: normalized,
        inputLengths,
        minInputLength: minLength,
        maxResults: NAMES_MAX_ENTRIES
      });
    }
    // CONCATENATED MODULE: ./src/background/quota-management.ts
    async function shouldRequestPersistentStorage() {
      // Prior to Firefox 77, Firefox would prompt the user if we request persistent
      // storage. That could be annyoing (especially if the user denies the request)
      // so we don't request persistent storage unless it looks like the user needs
      // it.
      const firefoxMajorVersion = getFirefoxMajorVersion();
      return firefoxMajorVersion === null || firefoxMajorVersion >= 77 || await wouldBenefitFromPersistentStorage();
    }
    function getFirefoxMajorVersion() {
      const matches = navigator.userAgent.match(/\sFirefox\/([0-9.]+)/);
      if (!matches) return null;
      return Math.floor(parseFloat(matches[1]));
    }
    async function wouldBenefitFromPersistentStorage() {
      let estimate;
      try {
        estimate = await navigator.storage.estimate();
      } catch {
        return false;
      }
      // If we couldn't get an estimate, assume attempting to persist storage will
      // fail so just return false.
            if (typeof estimate.quota === "undefined" || typeof estimate.usage === "undefined") return false;
      // We could use persistent storage if we have less than 200Mb for our quota or
      // are over 80% of our quota.
            const quotaInMb = estimate.quota / (1024 * 1024);
      const usageAsPercent = estimate.usage / estimate.quota;
      return quotaInMb < 200 || usageAsPercent > 0.8;
    }
    // CONCATENATED MODULE: ./src/background/background.ts
    /// <reference path="../common/constants.d.ts" />
    /// <reference path="./mail-extensions.d.ts" />
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

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <https://www.gnu.org/licenses/>.

  ---

  Please do not change or remove any of the copyrights or links to web pages
  when modifying any of the files. - Jon

*/
    // Setup bugsnag
    startBugsnag();
    
    // Setup tab manager
    
        const background_tabManager = new AllTabManager;
    const fxFetcher = new FxFetcher;
    background_tabManager.addListener((async ({enabled, tabId, anyEnabled}) => {
      try {
        await background_config.ready;
      } catch (e) {
        void Bugsnag.notify(e || "(No error)");
        return;
      }
      // Update browser action with enabled state
            updateBrowserAction({
        enabled,
        jpdictState: background_jpdictState,
        tabId,
        toolbarIcon: background_config.toolbarIcon
      });
      // Update context menus
            await updateContextMenus({
        tabEnabled: enabled,
        toggleMenuEnabled: background_config.contextMenuEnable,
        showPuck: background_config.computedShowPuck === "show"
      });
      // If we have enabled a tab, make sure we update our FX data.
      
      // We don't do this unless a tab is enabled because some users may have the
      // add-on installed but never enabled and we shouldn't download FX data each
      // day in that case.
            if (anyEnabled) await fxFetcher.scheduleNextUpdate(); else await fxFetcher.cancelScheduledUpdate();
    }));
    
    // Setup config
    
        const background_config = new Config;
    background_config.addChangeListener((async changes => {
      // Update toolbar icon as needed
      if (changes.hasOwnProperty("toolbarIcon")) {
        const toolbarIcon = changes.toolbarIcon.newValue;
        // Update all the different windows separately since they may have differing
        // enabled states.
                const enabledStates = await background_tabManager.getEnabledState();
        // If we are targetting individual tabs, however, first update the default
        // icon for all tabs.
                if (!enabledStates.length || typeof enabledStates[0].tabId !== "undefined") setDefaultToolbarIcon(background_config.toolbarIcon);
        for (const tabState of enabledStates) updateBrowserAction({
          enabled: tabState.enabled,
          jpdictState: background_jpdictState,
          tabId: tabState.tabId,
          toolbarIcon
        });
      }
      // Update context menus as needed
            const toggleMenuEnabled = changes.contextMenuEnable?.newValue;
      let showPuck;
      if (changes.hasOwnProperty("showPuck") || changes.hasOwnProperty("canHover")) showPuck = background_config.computedShowPuck;
      if (typeof toggleMenuEnabled !== "undefined" || typeof showPuck !== "undefined") try {
        const tabEnabled = await isCurrentTabEnabled(background_tabManager);
        await updateContextMenus({
          tabEnabled,
          toggleMenuEnabled: typeof toggleMenuEnabled === "undefined" ? background_config.contextMenuEnable : toggleMenuEnabled,
          showPuck: (typeof showPuck === "undefined" ? background_config.computedShowPuck : showPuck) === "show"
        });
      } catch (e) {
        void Bugsnag.notify(e);
      }
      // Update dictionary language
            if (changes.hasOwnProperty("dictLang")) {
        const newLang = changes.dictLang.newValue;
        Bugsnag.leaveBreadcrumb(`Changing language of database to ${newLang}.`);
        jpdict_updateDb({
          lang: newLang,
          force: true
        });
      }
      // Tell the content scripts about any changes
            await background_tabManager.updateConfig(background_config.contentConfig);
    }));
    void background_config.ready.then((async () => {
      // If we have a non-default toolbar icon, set it for all tabs now so that
      // when we open a new tab, etc. it will be set correctly.
      if (background_config.toolbarIcon !== "default") setDefaultToolbarIcon(background_config.toolbarIcon);
      // Initialize the tab manager first since we'll need its enabled state for
      // a number of other things.
            await background_tabManager.init(background_config.contentConfig);
      const tabEnabled = await isCurrentTabEnabled(background_tabManager);
      await updateContextMenus({
        tabEnabled,
        toggleMenuEnabled: background_config.contextMenuEnable,
        showPuck: background_config.computedShowPuck === "show"
      });
    }));
    
    // Jpdict database
    
        let background_jpdictState = {
      words: {
        state: "init",
        version: null,
        fallbackState: "unloaded"
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
    let dbInitialized = false;
    const dbReady = (async () => {
      if (dbInitialized) return true;
      Bugsnag.leaveBreadcrumb("Initializing dictionary...");
      await background_config.ready;
      await initDb({
        lang: background_config.dictLang,
        onUpdate: onDbStatusUpdated
      });
      dbInitialized = true;
      return true;
    })().catch((e => {
      console.error("Error initializing dictionary", e);
      void Bugsnag.notify(e);
      return false;
    }));
    async function onDbStatusUpdated(state) {
      const dbWasUnavailable = background_jpdictState.words.state === "empty" || background_jpdictState.words.state === "unavailable";
      const dbWasUpdating = background_jpdictState.updateState.type === "updating";
      background_jpdictState = state;
      // Update all the different windows separately since they may have differing
      // enabled states.
            const enabledStates = await background_tabManager.getEnabledState();
      for (const tabState of enabledStates) updateBrowserAction({
        enabled: tabState.enabled,
        jpdictState: state,
        tabId: tabState.tabId,
        toolbarIcon: background_config.toolbarIcon
      });
      notifyDbListeners();
      const dbIsAvailable = background_jpdictState.words.state === "ok";
      const dbIsUpdating = background_jpdictState.updateState.type === "updating";
      if ((dbWasUnavailable || dbWasUpdating) && dbIsAvailable && !dbIsUpdating) await background_tabManager.notifyDbUpdated();
    }
    function isDbUpdating() {
      if (!dbInitialized) return true;
      for (const series of allDataSeries) if (background_jpdictState[series].state === "init") return true;
      return background_jpdictState.updateState.type !== "idle";
    }
    
    // Database listeners
    
        const dbListeners = [];
    function isDbListenerMessage(event) {
      return typeof event === "object" && typeof event.type === "string";
    }
    browser_polyfill_default().runtime.onConnect.addListener((port => {
      if (port.name !== "options") return;
      dbListeners.push(port);
      // Push initial state to new listener
            notifyDbListeners(port);
      port.onMessage.addListener((async event => {
        if (!isDbListenerMessage(event)) return;
        switch (event.type) {
         case "updatedb":
          await background_config.ready;
          Bugsnag.leaveBreadcrumb("Manually triggering database update");
          jpdict_updateDb({
            lang: background_config.dictLang,
            force: true
          });
          break;

         case "cancelupdatedb":
          Bugsnag.leaveBreadcrumb("Manually canceling database update");
          jpdict_cancelUpdateDb();
          break;

         case "deletedb":
          Bugsnag.leaveBreadcrumb("Manually deleting database");
          jpdict_deleteDb();
          break;
        }
      }));
      port.onDisconnect.addListener((() => {
        const index = dbListeners.indexOf(port);
        if (index !== -1) dbListeners.splice(index, 1);
      }));
    }));
    function notifyDbListeners(specifiedListener) {
      if (!dbListeners.length) return;
      const message = notifyDbStateUpdated(background_jpdictState);
      for (const listener of dbListeners) {
        if (specifiedListener && listener !== specifiedListener) continue;
        try {
          listener.postMessage(message);
        } catch (e) {
          console.error("Error posting message", e);
          void Bugsnag.notify(e || "(Error posting message update message)");
        }
      }
    }
    
    // Search
    
        async function background_searchWords({input, includeRomaji, abortSignal}) {
      await dbReady;
      const [words, dbStatus] = await searchWords({
        abortSignal,
        input,
        includeRomaji
      });
      return {
        words,
        dbStatus
      };
    }
    async function searchOther({input, wordsMatchLen, abortSignal}) {
      await dbReady;
      // Names
            const nameResult = await searchNames({
        abortSignal,
        input
      });
      const names = typeof nameResult === "string" ? null : nameResult;
      if (abortSignal.aborted) throw new AbortError;
      // Kanji
            const longestMatch = Math.max(wordsMatchLen, names?.matchLen ?? 0);
      const kanjiResult = await searchKanji(input.slice(0, longestMatch || 1));
      const kanji = typeof kanjiResult === "string" ? null : kanjiResult;
      if (abortSignal.aborted) throw new AbortError;
      if (!kanji && !names) return null;
      return {
        kanji,
        names
      };
    }
    
    // Browser event handlers
    
        async function toggle(tab) {
      await background_config.ready;
      await background_tabManager.toggleTab(tab, background_config.contentConfig);
    }
    if (false) ; else browser_polyfill_default().browserAction.onClicked.addListener(toggle);
    browser_polyfill_default().composeAction?.onClicked.addListener(toggle);
    // We can sometimes find ourselves in a situation where we have a backlog of
    // search requests. To avoid that, we simply cancel any previous request.
        let pendingSearchWordsRequest;
    let pendingSearchOtherRequest;
    browser_polyfill_default().runtime.onMessage.addListener(((request, sender) => {
      if (!is(request, BackgroundRequestSchema)) {
        // We can sometimes get requests here from other extensions?
        // We've observed requests such as the following:
        //   {"type":"cs-frame-forget"}
        //   {"action":"requestBackendReadySignal"}
        //   {"type":"cs-frame-connect","data":{"isDark":true}}
        // Curiously in all cases the user agent was not identified so I'm not
        // sure if this can happen in all browsers or not.
        console.warn(`Unrecognized request: ${JSON.stringify(request)}`);
        return;
      }
      switch (request.type) {
       case "options":
        return browser_polyfill_default().runtime.openOptionsPage();

       case "searchWords":
        Bugsnag.leaveBreadcrumb("Searching for words", {
          ...request,
          input: "x".repeat(request.input.length)
        });
        if (pendingSearchWordsRequest) {
          Bugsnag.leaveBreadcrumb("Canceling previous search");
          pendingSearchWordsRequest.controller.abort();
          pendingSearchWordsRequest = void 0;
        }
        // Go ahead and stop any searches of other dictionaries too since they
        // are no longer relevant and will only make this search take longer.
                if (pendingSearchOtherRequest) {
          pendingSearchOtherRequest.controller.abort();
          pendingSearchOtherRequest = void 0;
        }
        pendingSearchWordsRequest = {
          input: request.input,
          controller: new AbortController
        };
        return (async () => {
          try {
            return await background_searchWords({
              ...request,
              abortSignal: pendingSearchWordsRequest.controller.signal
            });
          } catch (e) {
            if (e.name === "AbortError") return "aborted";
            void Bugsnag.notify(e);
            return null;
          } finally {
            if (pendingSearchWordsRequest?.input === request.input) pendingSearchWordsRequest = void 0;
          }
        })();

       case "searchOther":
        Bugsnag.leaveBreadcrumb("Searching for non-words", {
          ...request,
          input: "x".repeat(request.input.length)
        });
        if (pendingSearchOtherRequest) {
          Bugsnag.leaveBreadcrumb("Canceling previous search");
          pendingSearchOtherRequest.controller.abort();
          pendingSearchOtherRequest = void 0;
        }
        pendingSearchOtherRequest = {
          input: request.input,
          controller: new AbortController
        };
        return (async () => {
          try {
            return await searchOther({
              ...request,
              abortSignal: pendingSearchOtherRequest.controller.signal
            });
          } catch (e) {
            if (e.name === "AbortError") return "aborted";
            void Bugsnag.notify(e);
            return null;
          } finally {
            if (pendingSearchOtherRequest?.input === request.input) pendingSearchOtherRequest = void 0;
          }
        })();

       case "translate":
        Bugsnag.leaveBreadcrumb("Translating string", {
          ...request,
          input: "x".repeat(request.input.length)
        });
        return dbReady.then((() => translate({
          text: request.input,
          includeRomaji: request.includeRomaji
        }))).catch((e => {
          if (e.name === "AbortError") return "aborted";
          void Bugsnag.notify(e);
          return null;
        }));

       case "toggleDefinition":
        Bugsnag.leaveBreadcrumb("Toggling definitions on/off");
        void background_config.ready.then((() => {
          background_config.toggleReadingOnly();
        }));
        break;

       case "disableMouseInteraction":
        Bugsnag.leaveBreadcrumb("Disabling mouse interaction");
        void background_config.ready.then((() => {
          background_config.popupInteractive = false;
        }));
        break;

       case "canHoverChanged":
        Bugsnag.leaveBreadcrumb("Changing hover ability setting", request);
        void background_config.ready.then((() => {
          background_config.canHover = request.value;
        }));
        break;

       case "puckStateChanged":
        void background_config.ready.then((() => {
          background_config.puckState = request.value;
        }));
        break;

       case "isDbUpdating":
        return Promise.resolve(isDbUpdating());

        
        // Forwarded messages
        
               case "frame:popupShown":
       case "frame:highlightText":
       case "frame:clearTextHighlight":
        {
          const [, type] = request.type.split(":");
          if (sender.tab?.id) background_tabManager.sendMessageToFrame({
            tabId: sender.tab.id,
            message: {
              ...strip_fields_stripFields(request, [ "frameId" ]),
              type
            },
            frameId: request.frameId
          });
        }
        break;

       case "children:popupHidden":
       case "children:popupShown":
        {
          if (!sender.tab?.id) break;
          const [, type] = request.type.split(":");
          const message = {
            ...request,
            type,
            frame: "children"
          };
          browser_polyfill_default().tabs.sendMessage(sender.tab.id, message).catch((() => {}));
        }
        break;

       case "top:lookup":
        {
          if (!sender.tab?.id || typeof sender.frameId !== "number") break;
          const initialSrc = background_tabManager.getInitialFrameSrc({
            tabId: sender.tab.id,
            frameId: sender.frameId
          });
          background_tabManager.sendMessageToTopFrame({
            tabId: sender.tab.id,
            message: {
              ...request,
              type: "lookup",
              source: {
                frameId: sender.frameId,
                initialSrc,
                currentSrc: request.source.src,
                dimensions: request.source.dimensions
              }
            }
          });
        }
        break;

       case "top:isPopupShowing":
       case "top:pinPopup":
       case "top:unpinPopup":
       case "top:commitPopup":
       case "top:clearResult":
       case "top:nextDictionary":
       case "top:toggleDefinition":
       case "top:expandPopup":
       case "top:movePopup":
       case "top:enterCopyMode":
       case "top:exitCopyMode":
       case "top:nextCopyEntry":
       case "top:copyCurrentEntry":
        {
          if (!sender.tab?.id) break;
          const [, type] = request.type.split(":");
          background_tabManager.sendMessageToTopFrame({
            tabId: sender.tab.id,
            message: {
              ...request,
              type
            }
          });
        }
        break;
      }
      return;
    }));
    browser_polyfill_default().runtime.onInstalled.addListener((async details => {
      // Request persistent storage permission
      if (navigator.storage) {
        let persisted = await navigator.storage.persisted();
        if (!persisted && // navigator.storage.persist is not available in ServiceWorker contexts
        "persist" in navigator.storage && await shouldRequestPersistentStorage()) {
          persisted = await navigator.storage.persist();
          if (persisted) Bugsnag.leaveBreadcrumb("Got persistent storage permission"); else Bugsnag.leaveBreadcrumb("Failed to get persistent storage permission");
        }
      }
      if (details.reason === "update" && details.previousVersion && !details.temporary) Bugsnag.leaveBreadcrumb(`Updated from version ${details.previousVersion} to ${browser_polyfill_default().runtime.getManifest().version}`);
    }));
    browser_polyfill_default().runtime.onPerformanceWarning?.addListener((async details => {
      // We'd really like to know which site this is happening on so we can debug
      // and try to fix it.
      // It's hard to be sure what is an acceptable amount of information to send,
      // however.
      // We'd like to report the full URL but even after stripping query strings,
      // there's still the possibility of leaking private information such as with
      // capability URLs.
      // The hostname is probably safe but ideally we'd add an opt-out before
      // sending that.
      // Example code for fetching the hostname:
      // let host: string | undefined;
      // if (typeof details.tabId === 'number' && details.tabId) {
      //   try {
      //     const rawUrl = (await browser.tabs.get(details.tabId)).url;
      //     if (rawUrl) {
      //       const urlObj = new URL(rawUrl);
      //       host = urlObj.hostname;
      //     }
      //   } catch {
      //     /* Ignore */
      //   }
      // }
      // For now we'll just see if we get these reports at all and decide if we need
      // more information to fix them.
      void Bugsnag.notify({
        name: "PerformanceWarning",
        message: details.description
      }, {
        metadata: {
          "Performance warning": details
        }
      });
    }));
    registerMenuListeners({
      onToggleMenu: toggle,
      onTogglePuck: enabled => {
        background_config.showPuck = enabled ? "show" : "hide";
      }
    });
    // Mail extension steps
        void (async () => {
      if (browser_polyfill_default().messageDisplayScripts || browser_polyfill_default().composeScripts) try {
        await (browser_polyfill_default().messageDisplayScripts?.register({
          js: [ {
            file: "/10ten-ja-content.js"
          } ]
        }));
        await (browser_polyfill_default().composeScripts?.register({
          js: [ {
            file: "/10ten-ja-content.js"
          } ]
        }));
      } catch (e) {
        console.error("Failed to register message display or compose scripts", e);
        void Bugsnag.notify(e);
      }
    })();
  })();
})();
//# sourceMappingURL=10ten-ja-background.js.map