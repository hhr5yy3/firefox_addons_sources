(() => {
  function e(e, t, n, r) {
    Object.defineProperty(e, t, {
      get: n,
      set: r,
      enumerable: !0,
      configurable: !0
    });
  }
  var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {};
  function n(e) {
    return e && e.__esModule ? e.default : e;
  }
  var r = {}, a = {}, i = t.parcelRequire94c2;
  null == i && ((i = function(e) {
    if (e in r) return r[e].exports;
    if (e in a) {
      var t = a[e];
      delete a[e];
      var n = {
        id: e,
        exports: {}
      };
      return r[e] = n, t.call(n.exports, n, n.exports), n.exports;
    }
    var i = new Error("Cannot find module '" + e + "'");
    throw i.code = "MODULE_NOT_FOUND", i;
  }).register = function(e, t) {
    a[e] = t;
  }, t.parcelRequire94c2 = i), i.register("dBVaG", (function(e, t) {
    var n;
    "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self, 
    n = function(e) {
      "use strict";
      if ("undefined" == typeof browser || Object.getPrototypeOf(browser) !== Object.prototype) {
        const t = "The message port closed before a response was received.", n = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)", r = e => {
          const r = {
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
                fallbackToNoCallback: !0
              },
              enable: {
                minArgs: 0,
                maxArgs: 1,
                fallbackToNoCallback: !0
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
                fallbackToNoCallback: !0
              },
              setBadgeText: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setIcon: {
                minArgs: 1,
                maxArgs: 1
              },
              setPopup: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setTitle: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
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
                  singleCallbackArg: !1
                }
              },
              panels: {
                create: {
                  minArgs: 3,
                  maxArgs: 3,
                  singleCallbackArg: !0
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
                fallbackToNoCallback: !0
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
                fallbackToNoCallback: !0
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
                fallbackToNoCallback: !0
              },
              setIcon: {
                minArgs: 1,
                maxArgs: 1
              },
              setPopup: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setTitle: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              show: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
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
          if (0 === Object.keys(r).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
          class a extends WeakMap {
            constructor(e, t) {
              super(t), this.createItem = e;
            }
            get(e) {
              return this.has(e) || this.set(e, this.createItem(e)), super.get(e);
            }
          }
          const i = (t, n) => (...r) => {
            e.runtime.lastError ? t.reject(new Error(e.runtime.lastError.message)) : n.singleCallbackArg || r.length <= 1 && !1 !== n.singleCallbackArg ? t.resolve(r[0]) : t.resolve(r);
          }, o = e => 1 == e ? "argument" : "arguments", s = (e, t, n) => new Proxy(t, {
            apply: (t, r, a) => n.call(r, e, ...a)
          });
          let l = Function.call.bind(Object.prototype.hasOwnProperty);
          const u = (e, t = {}, n = {}) => {
            let r = Object.create(null), a = {
              has: (t, n) => n in e || n in r,
              get(a, c, f) {
                if (c in r) return r[c];
                if (!(c in e)) return;
                let d = e[c];
                if ("function" == typeof d) if ("function" == typeof t[c]) d = s(e, e[c], t[c]); else if (l(n, c)) {
                  let t = ((e, t) => function(n, ...r) {
                    if (r.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${o(t.minArgs)} for ${e}(), got ${r.length}`);
                    if (r.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${o(t.maxArgs)} for ${e}(), got ${r.length}`);
                    return new Promise(((a, o) => {
                      if (t.fallbackToNoCallback) try {
                        n[e](...r, i({
                          resolve: a,
                          reject: o
                        }, t));
                      } catch (i) {
                        console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, i), 
                        n[e](...r), t.fallbackToNoCallback = !1, t.noCallback = !0, a();
                      } else t.noCallback ? (n[e](...r), a()) : n[e](...r, i({
                        resolve: a,
                        reject: o
                      }, t));
                    }));
                  })(c, n[c]);
                  d = s(e, e[c], t);
                } else d = d.bind(e); else if ("object" == typeof d && null !== d && (l(t, c) || l(n, c))) d = u(d, t[c], n[c]); else {
                  if (!l(n, "*")) return Object.defineProperty(r, c, {
                    configurable: !0,
                    enumerable: !0,
                    get: () => e[c],
                    set(t) {
                      e[c] = t;
                    }
                  }), d;
                  d = u(d, t[c], n["*"]);
                }
                return r[c] = d, d;
              },
              set: (t, n, a, i) => (n in r ? r[n] = a : e[n] = a, !0),
              defineProperty: (e, t, n) => Reflect.defineProperty(r, t, n),
              deleteProperty: (e, t) => Reflect.deleteProperty(r, t)
            }, c = Object.create(e);
            return new Proxy(c, a);
          }, c = e => ({
            addListener(t, n, ...r) {
              t.addListener(e.get(n), ...r);
            },
            hasListener: (t, n) => t.hasListener(e.get(n)),
            removeListener(t, n) {
              t.removeListener(e.get(n));
            }
          }), f = new a((e => "function" != typeof e ? e : function(t) {
            const n = u(t, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            e(n);
          }));
          let d = !1;
          const p = new a((e => "function" != typeof e ? e : function(t, r, a) {
            let i, o, s = !1, l = new Promise((e => {
              i = function(t) {
                d || (console.warn(n, (new Error).stack), d = !0), s = !0, e(t);
              };
            }));
            try {
              o = e(t, r, i);
            } catch (e) {
              o = Promise.reject(e);
            }
            const u = !0 !== o && (c = o) && "object" == typeof c && "function" == typeof c.then;
            var c;
            if (!0 !== o && !u && !s) return !1;
            const f = e => {
              e.then((e => {
                a(e);
              }), (e => {
                let t;
                t = e && (e instanceof Error || "string" == typeof e.message) ? e.message : "An unexpected error occurred", 
                a({
                  __mozWebExtensionPolyfillReject__: !0,
                  message: t
                });
              })).catch((e => {
                console.error("Failed to send onMessage rejected reply", e);
              }));
            };
            return f(u ? o : l), !0;
          })), h = ({reject: n, resolve: r}, a) => {
            e.runtime.lastError ? e.runtime.lastError.message === t ? r() : n(new Error(e.runtime.lastError.message)) : a && a.__mozWebExtensionPolyfillReject__ ? n(new Error(a.message)) : r(a);
          }, m = (e, t, n, ...r) => {
            if (r.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${o(t.minArgs)} for ${e}(), got ${r.length}`);
            if (r.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${o(t.maxArgs)} for ${e}(), got ${r.length}`);
            return new Promise(((e, t) => {
              const a = h.bind(null, {
                resolve: e,
                reject: t
              });
              r.push(a), n.sendMessage(...r);
            }));
          }, g = {
            devtools: {
              network: {
                onRequestFinished: c(f)
              }
            },
            runtime: {
              onMessage: c(p),
              onMessageExternal: c(p),
              sendMessage: m.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: m.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          }, v = {
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
          return r.privacy = {
            network: {
              "*": v
            },
            services: {
              "*": v
            },
            websites: {
              "*": v
            }
          }, u(e, g, r);
        };
        if ("object" != typeof chrome || !chrome || !chrome.runtime || !chrome.runtime.id) throw new Error("This script should only be loaded in a browser extension.");
        e.exports = r(chrome);
      } else e.exports = browser;
    }, "function" == typeof define && define.amd ? define("webextension-polyfill", [ "module" ], n) : n(e);
  })), i.register("69aeE", (function(t, n) {
    /**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
    var r, a, o;
    e(t.exports, "Fragment", (() => r), (e => r = e)), e(t.exports, "jsx", (() => a), (e => a = e)), 
    e(t.exports, "jsxs", (() => o), (e => o = e));
    var s = i("bNwRF"), l = Symbol.for("react.element"), u = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, f = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    };
    function p(e, t, n) {
      var r, a = {}, i = null, o = null;
      for (r in void 0 !== n && (i = "" + n), void 0 !== t.key && (i = "" + t.key), void 0 !== t.ref && (o = t.ref), 
      t) c.call(t, r) && !d.hasOwnProperty(r) && (a[r] = t[r]);
      if (e && e.defaultProps) for (r in t = e.defaultProps) void 0 === a[r] && (a[r] = t[r]);
      return {
        $$typeof: l,
        type: e,
        key: i,
        ref: o,
        props: a,
        _owner: f.current
      };
    }
    r = u, a = p, o = p;
  })), i.register("bNwRF", (function(e, t) {
    "use strict";
    e.exports = i("aym88");
  })), i.register("aym88", (function(t, n) {
    /**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
    var r, a, i, o, s, l, u, c, f, d, p, h, m, g, v, y, b, w, x, k, _, E, S, A, C, T, O, N, M, I, L, j, P, R, z;
    e(t.exports, "Children", (() => r), (e => r = e)), e(t.exports, "Component", (() => a), (e => a = e)), 
    e(t.exports, "Fragment", (() => i), (e => i = e)), e(t.exports, "Profiler", (() => o), (e => o = e)), 
    e(t.exports, "PureComponent", (() => s), (e => s = e)), e(t.exports, "StrictMode", (() => l), (e => l = e)), 
    e(t.exports, "Suspense", (() => u), (e => u = e)), e(t.exports, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", (() => c), (e => c = e)), 
    e(t.exports, "cloneElement", (() => f), (e => f = e)), e(t.exports, "createContext", (() => d), (e => d = e)), 
    e(t.exports, "createElement", (() => p), (e => p = e)), e(t.exports, "createFactory", (() => h), (e => h = e)), 
    e(t.exports, "createRef", (() => m), (e => m = e)), e(t.exports, "forwardRef", (() => g), (e => g = e)), 
    e(t.exports, "isValidElement", (() => v), (e => v = e)), e(t.exports, "lazy", (() => y), (e => y = e)), 
    e(t.exports, "memo", (() => b), (e => b = e)), e(t.exports, "startTransition", (() => w), (e => w = e)), 
    e(t.exports, "unstable_act", (() => x), (e => x = e)), e(t.exports, "useCallback", (() => k), (e => k = e)), 
    e(t.exports, "useContext", (() => _), (e => _ = e)), e(t.exports, "useDebugValue", (() => E), (e => E = e)), 
    e(t.exports, "useDeferredValue", (() => S), (e => S = e)), e(t.exports, "useEffect", (() => A), (e => A = e)), 
    e(t.exports, "useId", (() => C), (e => C = e)), e(t.exports, "useImperativeHandle", (() => T), (e => T = e)), 
    e(t.exports, "useInsertionEffect", (() => O), (e => O = e)), e(t.exports, "useLayoutEffect", (() => N), (e => N = e)), 
    e(t.exports, "useMemo", (() => M), (e => M = e)), e(t.exports, "useReducer", (() => I), (e => I = e)), 
    e(t.exports, "useRef", (() => L), (e => L = e)), e(t.exports, "useState", (() => j), (e => j = e)), 
    e(t.exports, "useSyncExternalStore", (() => P), (e => P = e)), e(t.exports, "useTransition", (() => R), (e => R = e)), 
    e(t.exports, "version", (() => z), (e => z = e));
    var D = Symbol.for("react.element"), F = Symbol.for("react.portal"), H = Symbol.for("react.fragment"), $ = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), W = Symbol.for("react.provider"), U = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), Z = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), Y = Symbol.iterator;
    var Q = {
      isMounted: function() {
        return !1;
      },
      enqueueForceUpdate: function() {},
      enqueueReplaceState: function() {},
      enqueueSetState: function() {}
    }, G = Object.assign, X = {};
    function J(e, t, n) {
      this.props = e, this.context = t, this.refs = X, this.updater = n || Q;
    }
    function ee() {}
    function te(e, t, n) {
      this.props = e, this.context = t, this.refs = X, this.updater = n || Q;
    }
    J.prototype.isReactComponent = {}, J.prototype.setState = function(e, t) {
      if ("object" != typeof e && "function" != typeof e && null != e) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, e, t, "setState");
    }, J.prototype.forceUpdate = function(e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    }, ee.prototype = J.prototype;
    var ne = te.prototype = new ee;
    ne.constructor = te, G(ne, J.prototype), ne.isPureReactComponent = !0;
    var re = Array.isArray, ae = Object.prototype.hasOwnProperty, ie = {
      current: null
    }, oe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    };
    function se(e, t, n) {
      var r, a = {}, i = null, o = null;
      if (null != t) for (r in void 0 !== t.ref && (o = t.ref), void 0 !== t.key && (i = "" + t.key), 
      t) ae.call(t, r) && !oe.hasOwnProperty(r) && (a[r] = t[r]);
      var s = arguments.length - 2;
      if (1 === s) a.children = n; else if (1 < s) {
        for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
        a.children = l;
      }
      if (e && e.defaultProps) for (r in s = e.defaultProps) void 0 === a[r] && (a[r] = s[r]);
      return {
        $$typeof: D,
        type: e,
        key: i,
        ref: o,
        props: a,
        _owner: ie.current
      };
    }
    function le(e) {
      return "object" == typeof e && null !== e && e.$$typeof === D;
    }
    var ue = /\/+/g;
    function ce(e, t) {
      return "object" == typeof e && null !== e && null != e.key ? function(e) {
        var t = {
          "=": "=0",
          ":": "=2"
        };
        return "$" + e.replace(/[=:]/g, (function(e) {
          return t[e];
        }));
      }("" + e.key) : t.toString(36);
    }
    function fe(e, t, n, r, a) {
      var i = typeof e;
      "undefined" !== i && "boolean" !== i || (e = null);
      var o = !1;
      if (null === e) o = !0; else switch (i) {
       case "string":
       case "number":
        o = !0;
        break;

       case "object":
        switch (e.$$typeof) {
         case D:
         case F:
          o = !0;
        }
      }
      if (o) return a = a(o = e), e = "" === r ? "." + ce(o, 0) : r, re(a) ? (n = "", 
      null != e && (n = e.replace(ue, "$&/") + "/"), fe(a, t, n, "", (function(e) {
        return e;
      }))) : null != a && (le(a) && (a = function(e, t) {
        return {
          $$typeof: D,
          type: e.type,
          key: t,
          ref: e.ref,
          props: e.props,
          _owner: e._owner
        };
      }(a, n + (!a.key || o && o.key === a.key ? "" : ("" + a.key).replace(ue, "$&/") + "/") + e)), 
      t.push(a)), 1;
      if (o = 0, r = "" === r ? "." : r + ":", re(e)) for (var s = 0; s < e.length; s++) {
        var l = r + ce(i = e[s], s);
        o += fe(i, t, n, l, a);
      } else if (l = function(e) {
        return null === e || "object" != typeof e ? null : "function" == typeof (e = Y && e[Y] || e["@@iterator"]) ? e : null;
      }(e), "function" == typeof l) for (e = l.call(e), s = 0; !(i = e.next()).done; ) o += fe(i = i.value, t, n, l = r + ce(i, s++), a); else if ("object" === i) throw t = String(e), 
      Error("Objects are not valid as a React child (found: " + ("[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
      return o;
    }
    function de(e, t, n) {
      if (null == e) return e;
      var r = [], a = 0;
      return fe(e, r, "", "", (function(e) {
        return t.call(n, e, a++);
      })), r;
    }
    function pe(e) {
      if (-1 === e._status) {
        var t = e._result;
        (t = t()).then((function(t) {
          0 !== e._status && -1 !== e._status || (e._status = 1, e._result = t);
        }), (function(t) {
          0 !== e._status && -1 !== e._status || (e._status = 2, e._result = t);
        })), -1 === e._status && (e._status = 0, e._result = t);
      }
      if (1 === e._status) return e._result.default;
      throw e._result;
    }
    var he = {
      current: null
    }, me = {
      transition: null
    };
    r = {
      map: de,
      forEach: function(e, t, n) {
        de(e, (function() {
          t.apply(this, arguments);
        }), n);
      },
      count: function(e) {
        var t = 0;
        return de(e, (function() {
          t++;
        })), t;
      },
      toArray: function(e) {
        return de(e, (function(e) {
          return e;
        })) || [];
      },
      only: function(e) {
        if (!le(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
    }, a = J, i = H, o = B, s = te, l = $, u = q, c = {
      ReactCurrentDispatcher: he,
      ReactCurrentBatchConfig: me,
      ReactCurrentOwner: ie
    }, f = function(e, t, n) {
      if (null == e) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
      var r = G({}, e.props), a = e.key, i = e.ref, o = e._owner;
      if (null != t) {
        if (void 0 !== t.ref && (i = t.ref, o = ie.current), void 0 !== t.key && (a = "" + t.key), 
        e.type && e.type.defaultProps) var s = e.type.defaultProps;
        for (l in t) ae.call(t, l) && !oe.hasOwnProperty(l) && (r[l] = void 0 === t[l] && void 0 !== s ? s[l] : t[l]);
      }
      var l = arguments.length - 2;
      if (1 === l) r.children = n; else if (1 < l) {
        s = Array(l);
        for (var u = 0; u < l; u++) s[u] = arguments[u + 2];
        r.children = s;
      }
      return {
        $$typeof: D,
        type: e.type,
        key: a,
        ref: i,
        props: r,
        _owner: o
      };
    }, d = function(e) {
      return (e = {
        $$typeof: U,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
      }).Provider = {
        $$typeof: W,
        _context: e
      }, e.Consumer = e;
    }, p = se, h = function(e) {
      var t = se.bind(null, e);
      return t.type = e, t;
    }, m = function() {
      return {
        current: null
      };
    }, g = function(e) {
      return {
        $$typeof: V,
        render: e
      };
    }, v = le, y = function(e) {
      return {
        $$typeof: K,
        _payload: {
          _status: -1,
          _result: e
        },
        _init: pe
      };
    }, b = function(e, t) {
      return {
        $$typeof: Z,
        type: e,
        compare: void 0 === t ? null : t
      };
    }, w = function(e) {
      var t = me.transition;
      me.transition = {};
      try {
        e();
      } finally {
        me.transition = t;
      }
    }, x = function() {
      throw Error("act(...) is not supported in production builds of React.");
    }, k = function(e, t) {
      return he.current.useCallback(e, t);
    }, _ = function(e) {
      return he.current.useContext(e);
    }, E = function() {}, S = function(e) {
      return he.current.useDeferredValue(e);
    }, A = function(e, t) {
      return he.current.useEffect(e, t);
    }, C = function() {
      return he.current.useId();
    }, T = function(e, t, n) {
      return he.current.useImperativeHandle(e, t, n);
    }, O = function(e, t) {
      return he.current.useInsertionEffect(e, t);
    }, N = function(e, t) {
      return he.current.useLayoutEffect(e, t);
    }, M = function(e, t) {
      return he.current.useMemo(e, t);
    }, I = function(e, t, n) {
      return he.current.useReducer(e, t, n);
    }, L = function(e) {
      return he.current.useRef(e);
    }, j = function(e) {
      return he.current.useState(e);
    }, P = function(e, t, n) {
      return he.current.useSyncExternalStore(e, t, n);
    }, R = function() {
      return he.current.useTransition();
    }, z = "18.2.0";
  })), i.register("dTM1Y", (function(t, n) {
    /**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
    var r, a, o, s, l, u, c, f, d, p, h, m;
    e(t.exports, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", (() => r), (e => r = e)), 
    e(t.exports, "createPortal", (() => a), (e => a = e)), e(t.exports, "createRoot", (() => o), (e => o = e)), 
    e(t.exports, "findDOMNode", (() => s), (e => s = e)), e(t.exports, "flushSync", (() => l), (e => l = e)), 
    e(t.exports, "hydrate", (() => u), (e => u = e)), e(t.exports, "hydrateRoot", (() => c), (e => c = e)), 
    e(t.exports, "render", (() => f), (e => f = e)), e(t.exports, "unmountComponentAtNode", (() => d), (e => d = e)), 
    e(t.exports, "unstable_batchedUpdates", (() => p), (e => p = e)), e(t.exports, "unstable_renderSubtreeIntoContainer", (() => h), (e => h = e)), 
    e(t.exports, "version", (() => m), (e => m = e));
    var g = i("bNwRF"), v = i("iEyFW");
    function y(e) {
      for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
      return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var b = new Set, w = {};
    function x(e, t) {
      k(e, t), k(e + "Capture", t);
    }
    function k(e, t) {
      for (w[e] = t, e = 0; e < t.length; e++) b.add(t[e]);
    }
    var _ = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement), E = Object.prototype.hasOwnProperty, S = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, A = {}, C = {};
    function T(e, t, n, r, a, i, o) {
      this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = a, 
      this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, 
      this.removeEmptyString = o;
    }
    var O = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e) {
      O[e] = new T(e, 0, !1, e, null, !1, !1);
    })), [ [ "acceptCharset", "accept-charset" ], [ "className", "class" ], [ "htmlFor", "for" ], [ "httpEquiv", "http-equiv" ] ].forEach((function(e) {
      var t = e[0];
      O[t] = new T(t, 1, !1, e[1], null, !1, !1);
    })), [ "contentEditable", "draggable", "spellCheck", "value" ].forEach((function(e) {
      O[e] = new T(e, 2, !1, e.toLowerCase(), null, !1, !1);
    })), [ "autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha" ].forEach((function(e) {
      O[e] = new T(e, 2, !1, e, null, !1, !1);
    })), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e) {
      O[e] = new T(e, 3, !1, e.toLowerCase(), null, !1, !1);
    })), [ "checked", "multiple", "muted", "selected" ].forEach((function(e) {
      O[e] = new T(e, 3, !0, e, null, !1, !1);
    })), [ "capture", "download" ].forEach((function(e) {
      O[e] = new T(e, 4, !1, e, null, !1, !1);
    })), [ "cols", "rows", "size", "span" ].forEach((function(e) {
      O[e] = new T(e, 6, !1, e, null, !1, !1);
    })), [ "rowSpan", "start" ].forEach((function(e) {
      O[e] = new T(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
    var N = /[\-:]([a-z])/g;
    function M(e) {
      return e[1].toUpperCase();
    }
    function I(e, t, n, r) {
      var a = O.hasOwnProperty(t) ? O[t] : null;
      (null !== a ? 0 !== a.type : r || !(2 < t.length) || "o" !== t[0] && "O" !== t[0] || "n" !== t[1] && "N" !== t[1]) && (function(e, t, n, r) {
        if (null == t || function(e, t, n, r) {
          if (null !== n && 0 === n.type) return !1;
          switch (typeof t) {
           case "function":
           case "symbol":
            return !0;

           case "boolean":
            return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);

           default:
            return !1;
          }
        }(e, t, n, r)) return !0;
        if (r) return !1;
        if (null !== n) switch (n.type) {
         case 3:
          return !t;

         case 4:
          return !1 === t;

         case 5:
          return isNaN(t);

         case 6:
          return isNaN(t) || 1 > t;
        }
        return !1;
      }(t, n, a, r) && (n = null), r || null === a ? function(e) {
        return !!E.call(C, e) || !E.call(A, e) && (S.test(e) ? C[e] = !0 : (A[e] = !0, !1));
      }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = null === n ? 3 !== a.type && "" : n : (t = a.attributeName, 
      r = a.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (a = a.type) || 4 === a && !0 === n ? "" : "" + n, 
      r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e) {
      var t = e.replace(N, M);
      O[t] = new T(t, 1, !1, e, null, !1, !1);
    })), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e) {
      var t = e.replace(N, M);
      O[t] = new T(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    })), [ "xml:base", "xml:lang", "xml:space" ].forEach((function(e) {
      var t = e.replace(N, M);
      O[t] = new T(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    })), [ "tabIndex", "crossOrigin" ].forEach((function(e) {
      O[e] = new T(e, 1, !1, e.toLowerCase(), null, !1, !1);
    })), O.xlinkHref = new T("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), 
    [ "src", "href", "action", "formAction" ].forEach((function(e) {
      O[e] = new T(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
    var L = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, j = Symbol.for("react.element"), P = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), z = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), F = Symbol.for("react.provider"), H = Symbol.for("react.context"), $ = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), V = Symbol.for("react.lazy");
    Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
    var q = Symbol.for("react.offscreen");
    Symbol.for("react.legacy_hidden"), Symbol.for("react.cache"), Symbol.for("react.tracing_marker");
    var Z = Symbol.iterator;
    function K(e) {
      return null === e || "object" != typeof e ? null : "function" == typeof (e = Z && e[Z] || e["@@iterator"]) ? e : null;
    }
    var Y, Q = Object.assign;
    function G(e) {
      if (void 0 === Y) try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        Y = t && t[1] || "";
      }
      return "\n" + Y + e;
    }
    var X = !1;
    function J(e, t) {
      if (!e || X) return "";
      X = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (t) if (t = function() {
          throw Error();
        }, Object.defineProperty(t.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), "object" == typeof Reflect && Reflect.construct) {
          try {
            Reflect.construct(t, []);
          } catch (e) {
            var r = e;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (e) {
            r = e;
          }
          e.call(t.prototype);
        } else {
          try {
            throw Error();
          } catch (e) {
            r = e;
          }
          e();
        }
      } catch (t) {
        if (t && r && "string" == typeof t.stack) {
          for (var a = t.stack.split("\n"), i = r.stack.split("\n"), o = a.length - 1, s = i.length - 1; 1 <= o && 0 <= s && a[o] !== i[s]; ) s--;
          for (;1 <= o && 0 <= s; o--, s--) if (a[o] !== i[s]) {
            if (1 !== o || 1 !== s) do {
              if (o--, 0 > --s || a[o] !== i[s]) {
                var l = "\n" + a[o].replace(" at new ", " at ");
                return e.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", e.displayName)), 
                l;
              }
            } while (1 <= o && 0 <= s);
            break;
          }
        }
      } finally {
        X = !1, Error.prepareStackTrace = n;
      }
      return (e = e ? e.displayName || e.name : "") ? G(e) : "";
    }
    function ee(e) {
      switch (e.tag) {
       case 5:
        return G(e.type);

       case 16:
        return G("Lazy");

       case 13:
        return G("Suspense");

       case 19:
        return G("SuspenseList");

       case 0:
       case 2:
       case 15:
        return e = J(e.type, !1);

       case 11:
        return e = J(e.type.render, !1);

       case 1:
        return e = J(e.type, !0);

       default:
        return "";
      }
    }
    function te(e) {
      if (null == e) return null;
      if ("function" == typeof e) return e.displayName || e.name || null;
      if ("string" == typeof e) return e;
      switch (e) {
       case R:
        return "Fragment";

       case P:
        return "Portal";

       case D:
        return "Profiler";

       case z:
        return "StrictMode";

       case B:
        return "Suspense";

       case W:
        return "SuspenseList";
      }
      if ("object" == typeof e) switch (e.$$typeof) {
       case H:
        return (e.displayName || "Context") + ".Consumer";

       case F:
        return (e._context.displayName || "Context") + ".Provider";

       case $:
        var t = e.render;
        return (e = e.displayName) || (e = "" !== (e = t.displayName || t.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"), 
        e;

       case U:
        return null !== (t = e.displayName || null) ? t : te(e.type) || "Memo";

       case V:
        t = e._payload, e = e._init;
        try {
          return te(e(t));
        } catch (e) {}
      }
      return null;
    }
    function ne(e) {
      var t = e.type;
      switch (e.tag) {
       case 24:
        return "Cache";

       case 9:
        return (t.displayName || "Context") + ".Consumer";

       case 10:
        return (t._context.displayName || "Context") + ".Provider";

       case 18:
        return "DehydratedFragment";

       case 11:
        return e = (e = t.render).displayName || e.name || "", t.displayName || ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef");

       case 7:
        return "Fragment";

       case 5:
        return t;

       case 4:
        return "Portal";

       case 3:
        return "Root";

       case 6:
        return "Text";

       case 16:
        return te(t);

       case 8:
        return t === z ? "StrictMode" : "Mode";

       case 22:
        return "Offscreen";

       case 12:
        return "Profiler";

       case 21:
        return "Scope";

       case 13:
        return "Suspense";

       case 19:
        return "SuspenseList";

       case 25:
        return "TracingMarker";

       case 1:
       case 0:
       case 17:
       case 2:
       case 14:
       case 15:
        if ("function" == typeof t) return t.displayName || t.name || null;
        if ("string" == typeof t) return t;
      }
      return null;
    }
    function re(e) {
      switch (typeof e) {
       case "boolean":
       case "number":
       case "string":
       case "undefined":
       case "object":
        return e;

       default:
        return "";
      }
    }
    function ae(e) {
      var t = e.type;
      return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t);
    }
    function ie(e) {
      e._valueTracker || (e._valueTracker = function(e) {
        var t = ae(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
        if (!e.hasOwnProperty(t) && void 0 !== n && "function" == typeof n.get && "function" == typeof n.set) {
          var a = n.get, i = n.set;
          return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
              return a.call(this);
            },
            set: function(e) {
              r = "" + e, i.call(this, e);
            }
          }), Object.defineProperty(e, t, {
            enumerable: n.enumerable
          }), {
            getValue: function() {
              return r;
            },
            setValue: function(e) {
              r = "" + e;
            },
            stopTracking: function() {
              e._valueTracker = null, delete e[t];
            }
          };
        }
      }(e));
    }
    function oe(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(), r = "";
      return e && (r = ae(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), 
      !0);
    }
    function se(e) {
      if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;
      try {
        return e.activeElement || e.body;
      } catch (t) {
        return e.body;
      }
    }
    function le(e, t) {
      var n = t.checked;
      return Q({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: null != n ? n : e._wrapperState.initialChecked
      });
    }
    function ue(e, t) {
      var n = null == t.defaultValue ? "" : t.defaultValue, r = null != t.checked ? t.checked : t.defaultChecked;
      n = re(null != t.value ? t.value : n), e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
      };
    }
    function ce(e, t) {
      null != (t = t.checked) && I(e, "checked", t, !1);
    }
    function fe(e, t) {
      ce(e, t);
      var n = re(t.value), r = t.type;
      if (null != n) "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n); else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
      t.hasOwnProperty("value") ? pe(e, t.type, n) : t.hasOwnProperty("defaultValue") && pe(e, t.type, re(t.defaultValue)), 
      null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked);
    }
    function de(e, t, n) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value)) return;
        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
      }
      "" !== (n = e.name) && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, 
      "" !== n && (e.name = n);
    }
    function pe(e, t, n) {
      "number" === t && se(e.ownerDocument) === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
    }
    var he = Array.isArray;
    function me(e, t, n, r) {
      if (e = e.options, t) {
        t = {};
        for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
        for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), 
        a && r && (e[n].defaultSelected = !0);
      } else {
        for (n = "" + re(n), t = null, a = 0; a < e.length; a++) {
          if (e[a].value === n) return e[a].selected = !0, void (r && (e[a].defaultSelected = !0));
          null !== t || e[a].disabled || (t = e[a]);
        }
        null !== t && (t.selected = !0);
      }
    }
    function ge(e, t) {
      if (null != t.dangerouslySetInnerHTML) throw Error(y(91));
      return Q({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
      });
    }
    function ve(e, t) {
      var n = t.value;
      if (null == n) {
        if (n = t.children, t = t.defaultValue, null != n) {
          if (null != t) throw Error(y(92));
          if (he(n)) {
            if (1 < n.length) throw Error(y(93));
            n = n[0];
          }
          t = n;
        }
        null == t && (t = ""), n = t;
      }
      e._wrapperState = {
        initialValue: re(n)
      };
    }
    function ye(e, t) {
      var n = re(t.value), r = re(t.defaultValue);
      null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), 
      null != r && (e.defaultValue = "" + r);
    }
    function be(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t);
    }
    function we(e) {
      switch (e) {
       case "svg":
        return "http://www.w3.org/2000/svg";

       case "math":
        return "http://www.w3.org/1998/Math/MathML";

       default:
        return "http://www.w3.org/1999/xhtml";
      }
    }
    function xe(e, t) {
      return null == e || "http://www.w3.org/1999/xhtml" === e ? we(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e;
    }
    var ke, _e, Ee = (_e = function(e, t) {
      if ("http://www.w3.org/2000/svg" !== e.namespaceURI || "innerHTML" in e) e.innerHTML = t; else {
        for ((ke = ke || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", 
        t = ke.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
        for (;t.firstChild; ) e.appendChild(t.firstChild);
      }
    }, "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(e, t, n, r) {
      MSApp.execUnsafeLocalFunction((function() {
        return _e(e, t);
      }));
    } : _e);
    function Se(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
      }
      e.textContent = t;
    }
    var Ae = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    }, Ce = [ "Webkit", "ms", "Moz", "O" ];
    function Te(e, t, n) {
      return null == t || "boolean" == typeof t || "" === t ? "" : n || "number" != typeof t || 0 === t || Ae.hasOwnProperty(e) && Ae[e] ? ("" + t).trim() : t + "px";
    }
    function Oe(e, t) {
      for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
        var r = 0 === n.indexOf("--"), a = Te(n, t[n], r);
        "float" === n && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a;
      }
    }
    Object.keys(Ae).forEach((function(e) {
      Ce.forEach((function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), Ae[t] = Ae[e];
      }));
    }));
    var Ne = Q({
      menuitem: !0
    }, {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
    });
    function Me(e, t) {
      if (t) {
        if (Ne[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(y(137, e));
        if (null != t.dangerouslySetInnerHTML) {
          if (null != t.children) throw Error(y(60));
          if ("object" != typeof t.dangerouslySetInnerHTML || !("__html" in t.dangerouslySetInnerHTML)) throw Error(y(61));
        }
        if (null != t.style && "object" != typeof t.style) throw Error(y(62));
      }
    }
    function Ie(e, t) {
      if (-1 === e.indexOf("-")) return "string" == typeof t.is;
      switch (e) {
       case "annotation-xml":
       case "color-profile":
       case "font-face":
       case "font-face-src":
       case "font-face-uri":
       case "font-face-format":
       case "font-face-name":
       case "missing-glyph":
        return !1;

       default:
        return !0;
      }
    }
    var Le = null;
    function je(e) {
      return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 
      3 === e.nodeType ? e.parentNode : e;
    }
    var Pe = null, Re = null, ze = null;
    function De(e) {
      if (e = Ia(e)) {
        if ("function" != typeof Pe) throw Error(y(280));
        var t = e.stateNode;
        t && (t = ja(t), Pe(e.stateNode, e.type, t));
      }
    }
    function Fe(e) {
      Re ? ze ? ze.push(e) : ze = [ e ] : Re = e;
    }
    function He() {
      if (Re) {
        var e = Re, t = ze;
        if (ze = Re = null, De(e), t) for (e = 0; e < t.length; e++) De(t[e]);
      }
    }
    function $e(e, t) {
      return e(t);
    }
    function Be() {}
    var We = !1;
    function Ue(e, t, n) {
      if (We) return e(t, n);
      We = !0;
      try {
        return $e(e, t, n);
      } finally {
        We = !1, (null !== Re || null !== ze) && (Be(), He());
      }
    }
    function Ve(e, t) {
      var n = e.stateNode;
      if (null === n) return null;
      var r = ja(n);
      if (null === r) return null;
      n = r[t];
      e: switch (t) {
       case "onClick":
       case "onClickCapture":
       case "onDoubleClick":
       case "onDoubleClickCapture":
       case "onMouseDown":
       case "onMouseDownCapture":
       case "onMouseMove":
       case "onMouseMoveCapture":
       case "onMouseUp":
       case "onMouseUpCapture":
       case "onMouseEnter":
        (r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), 
        e = !r;
        break e;

       default:
        e = !1;
      }
      if (e) return null;
      if (n && "function" != typeof n) throw Error(y(231, t, typeof n));
      return n;
    }
    var qe = !1;
    if (_) try {
      var Ze = {};
      Object.defineProperty(Ze, "passive", {
        get: function() {
          qe = !0;
        }
      }), window.addEventListener("test", Ze, Ze), window.removeEventListener("test", Ze, Ze);
    } catch (_e) {
      qe = !1;
    }
    function Ke(e, t, n, r, a, i, o, s, l) {
      var u = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, u);
      } catch (e) {
        this.onError(e);
      }
    }
    var Ye = !1, Qe = null, Ge = !1, Xe = null, Je = {
      onError: function(e) {
        Ye = !0, Qe = e;
      }
    };
    function et(e, t, n, r, a, i, o, s, l) {
      Ye = !1, Qe = null, Ke.apply(Je, arguments);
    }
    function tt(e) {
      var t = e, n = e;
      if (e.alternate) for (;t.return; ) t = t.return; else {
        e = t;
        do {
          0 != (4098 & (t = e).flags) && (n = t.return), e = t.return;
        } while (e);
      }
      return 3 === t.tag ? n : null;
    }
    function nt(e) {
      if (13 === e.tag) {
        var t = e.memoizedState;
        if (null === t && (null !== (e = e.alternate) && (t = e.memoizedState)), null !== t) return t.dehydrated;
      }
      return null;
    }
    function rt(e) {
      if (tt(e) !== e) throw Error(y(188));
    }
    function at(e) {
      return null !== (e = function(e) {
        var t = e.alternate;
        if (!t) {
          if (null === (t = tt(e))) throw Error(y(188));
          return t !== e ? null : e;
        }
        for (var n = e, r = t; ;) {
          var a = n.return;
          if (null === a) break;
          var i = a.alternate;
          if (null === i) {
            if (null !== (r = a.return)) {
              n = r;
              continue;
            }
            break;
          }
          if (a.child === i.child) {
            for (i = a.child; i; ) {
              if (i === n) return rt(a), e;
              if (i === r) return rt(a), t;
              i = i.sibling;
            }
            throw Error(y(188));
          }
          if (n.return !== r.return) n = a, r = i; else {
            for (var o = !1, s = a.child; s; ) {
              if (s === n) {
                o = !0, n = a, r = i;
                break;
              }
              if (s === r) {
                o = !0, r = a, n = i;
                break;
              }
              s = s.sibling;
            }
            if (!o) {
              for (s = i.child; s; ) {
                if (s === n) {
                  o = !0, n = i, r = a;
                  break;
                }
                if (s === r) {
                  o = !0, r = i, n = a;
                  break;
                }
                s = s.sibling;
              }
              if (!o) throw Error(y(189));
            }
          }
          if (n.alternate !== r) throw Error(y(190));
        }
        if (3 !== n.tag) throw Error(y(188));
        return n.stateNode.current === n ? e : t;
      }(e)) ? it(e) : null;
    }
    function it(e) {
      if (5 === e.tag || 6 === e.tag) return e;
      for (e = e.child; null !== e; ) {
        var t = it(e);
        if (null !== t) return t;
        e = e.sibling;
      }
      return null;
    }
    var ot = v.unstable_scheduleCallback, st = v.unstable_cancelCallback, lt = v.unstable_shouldYield, ut = v.unstable_requestPaint, ct = v.unstable_now, ft = v.unstable_getCurrentPriorityLevel, dt = v.unstable_ImmediatePriority, pt = v.unstable_UserBlockingPriority, ht = v.unstable_NormalPriority, mt = v.unstable_LowPriority, gt = v.unstable_IdlePriority, vt = null, yt = null;
    var bt = Math.clz32 ? Math.clz32 : function(e) {
      return e >>>= 0, 0 === e ? 32 : 31 - (wt(e) / xt | 0) | 0;
    }, wt = Math.log, xt = Math.LN2;
    var kt = 64, _t = 4194304;
    function Et(e) {
      switch (e & -e) {
       case 1:
        return 1;

       case 2:
        return 2;

       case 4:
        return 4;

       case 8:
        return 8;

       case 16:
        return 16;

       case 32:
        return 32;

       case 64:
       case 128:
       case 256:
       case 512:
       case 1024:
       case 2048:
       case 4096:
       case 8192:
       case 16384:
       case 32768:
       case 65536:
       case 131072:
       case 262144:
       case 524288:
       case 1048576:
       case 2097152:
        return 4194240 & e;

       case 4194304:
       case 8388608:
       case 16777216:
       case 33554432:
       case 67108864:
        return 130023424 & e;

       case 134217728:
        return 134217728;

       case 268435456:
        return 268435456;

       case 536870912:
        return 536870912;

       case 1073741824:
        return 1073741824;

       default:
        return e;
      }
    }
    function St(e, t) {
      var n = e.pendingLanes;
      if (0 === n) return 0;
      var r = 0, a = e.suspendedLanes, i = e.pingedLanes, o = 268435455 & n;
      if (0 !== o) {
        var s = o & ~a;
        0 !== s ? r = Et(s) : 0 !== (i &= o) && (r = Et(i));
      } else 0 !== (o = n & ~a) ? r = Et(o) : 0 !== i && (r = Et(i));
      if (0 === r) return 0;
      if (0 !== t && t !== r && 0 == (t & a) && ((a = r & -r) >= (i = t & -t) || 16 === a && 0 != (4194240 & i))) return t;
      if (0 != (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)) for (e = e.entanglements, 
      t &= r; 0 < t; ) a = 1 << (n = 31 - bt(t)), r |= e[n], t &= ~a;
      return r;
    }
    function At(e, t) {
      switch (e) {
       case 1:
       case 2:
       case 4:
        return t + 250;

       case 8:
       case 16:
       case 32:
       case 64:
       case 128:
       case 256:
       case 512:
       case 1024:
       case 2048:
       case 4096:
       case 8192:
       case 16384:
       case 32768:
       case 65536:
       case 131072:
       case 262144:
       case 524288:
       case 1048576:
       case 2097152:
        return t + 5e3;

       default:
        return -1;
      }
    }
    function Ct(e) {
      return 0 !== (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0;
    }
    function Tt() {
      var e = kt;
      return 0 == (4194240 & (kt <<= 1)) && (kt = 64), e;
    }
    function Ot(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function Nt(e, t, n) {
      e.pendingLanes |= t, 536870912 !== t && (e.suspendedLanes = 0, e.pingedLanes = 0), 
      (e = e.eventTimes)[t = 31 - bt(t)] = n;
    }
    function Mt(e, t) {
      var n = e.entangledLanes |= t;
      for (e = e.entanglements; n; ) {
        var r = 31 - bt(n), a = 1 << r;
        a & t | e[r] & t && (e[r] |= t), n &= ~a;
      }
    }
    var It = 0;
    function Lt(e) {
      return 1 < (e &= -e) ? 4 < e ? 0 != (268435455 & e) ? 16 : 536870912 : 4 : 1;
    }
    var jt, Pt, Rt, zt, Dt, Ft = !1, Ht = [], $t = null, Bt = null, Wt = null, Ut = new Map, Vt = new Map, qt = [], Zt = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Kt(e, t) {
      switch (e) {
       case "focusin":
       case "focusout":
        $t = null;
        break;

       case "dragenter":
       case "dragleave":
        Bt = null;
        break;

       case "mouseover":
       case "mouseout":
        Wt = null;
        break;

       case "pointerover":
       case "pointerout":
        Ut.delete(t.pointerId);
        break;

       case "gotpointercapture":
       case "lostpointercapture":
        Vt.delete(t.pointerId);
      }
    }
    function Yt(e, t, n, r, a, i) {
      return null === e || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [ a ]
      }, null !== t && (null !== (t = Ia(t)) && Pt(t)), e) : (e.eventSystemFlags |= r, 
      t = e.targetContainers, null !== a && -1 === t.indexOf(a) && t.push(a), e);
    }
    function Qt(e) {
      var t = Ma(e.target);
      if (null !== t) {
        var n = tt(t);
        if (null !== n) if (13 === (t = n.tag)) {
          if (null !== (t = nt(n))) return e.blockedOn = t, void Dt(e.priority, (function() {
            Rt(n);
          }));
        } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated) return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null);
      }
      e.blockedOn = null;
    }
    function Gt(e) {
      if (null !== e.blockedOn) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = un(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (null !== n) return null !== (t = Ia(n)) && Pt(t), e.blockedOn = n, !1;
        var r = new (n = e.nativeEvent).constructor(n.type, n);
        Le = r, n.target.dispatchEvent(r), Le = null, t.shift();
      }
      return !0;
    }
    function Xt(e, t, n) {
      Gt(e) && n.delete(t);
    }
    function Jt() {
      Ft = !1, null !== $t && Gt($t) && ($t = null), null !== Bt && Gt(Bt) && (Bt = null), 
      null !== Wt && Gt(Wt) && (Wt = null), Ut.forEach(Xt), Vt.forEach(Xt);
    }
    function en(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Ft || (Ft = !0, v.unstable_scheduleCallback(v.unstable_NormalPriority, Jt)));
    }
    function tn(e) {
      function t(t) {
        return en(t, e);
      }
      if (0 < Ht.length) {
        en(Ht[0], e);
        for (var n = 1; n < Ht.length; n++) {
          var r = Ht[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (null !== $t && en($t, e), null !== Bt && en(Bt, e), null !== Wt && en(Wt, e), 
      Ut.forEach(t), Vt.forEach(t), n = 0; n < qt.length; n++) (r = qt[n]).blockedOn === e && (r.blockedOn = null);
      for (;0 < qt.length && null === (n = qt[0]).blockedOn; ) Qt(n), null === n.blockedOn && qt.shift();
    }
    var nn = L.ReactCurrentBatchConfig, rn = !0;
    function an(e, t, n, r) {
      var a = It, i = nn.transition;
      nn.transition = null;
      try {
        It = 1, sn(e, t, n, r);
      } finally {
        It = a, nn.transition = i;
      }
    }
    function on(e, t, n, r) {
      var a = It, i = nn.transition;
      nn.transition = null;
      try {
        It = 4, sn(e, t, n, r);
      } finally {
        It = a, nn.transition = i;
      }
    }
    function sn(e, t, n, r) {
      if (rn) {
        var a = un(e, t, n, r);
        if (null === a) ra(e, t, r, ln, n), Kt(e, r); else if (function(e, t, n, r, a) {
          switch (t) {
           case "focusin":
            return $t = Yt($t, e, t, n, r, a), !0;

           case "dragenter":
            return Bt = Yt(Bt, e, t, n, r, a), !0;

           case "mouseover":
            return Wt = Yt(Wt, e, t, n, r, a), !0;

           case "pointerover":
            var i = a.pointerId;
            return Ut.set(i, Yt(Ut.get(i) || null, e, t, n, r, a)), !0;

           case "gotpointercapture":
            return i = a.pointerId, Vt.set(i, Yt(Vt.get(i) || null, e, t, n, r, a)), !0;
          }
          return !1;
        }(a, e, t, n, r)) r.stopPropagation(); else if (Kt(e, r), 4 & t && -1 < Zt.indexOf(e)) {
          for (;null !== a; ) {
            var i = Ia(a);
            if (null !== i && jt(i), null === (i = un(e, t, n, r)) && ra(e, t, r, ln, n), i === a) break;
            a = i;
          }
          null !== a && r.stopPropagation();
        } else ra(e, t, r, null, n);
      }
    }
    var ln = null;
    function un(e, t, n, r) {
      if (ln = null, null !== (e = Ma(e = je(r)))) if (null === (t = tt(e))) e = null; else if (13 === (n = t.tag)) {
        if (null !== (e = nt(t))) return e;
        e = null;
      } else if (3 === n) {
        if (t.stateNode.current.memoizedState.isDehydrated) return 3 === t.tag ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
      return ln = e, null;
    }
    function cn(e) {
      switch (e) {
       case "cancel":
       case "click":
       case "close":
       case "contextmenu":
       case "copy":
       case "cut":
       case "auxclick":
       case "dblclick":
       case "dragend":
       case "dragstart":
       case "drop":
       case "focusin":
       case "focusout":
       case "input":
       case "invalid":
       case "keydown":
       case "keypress":
       case "keyup":
       case "mousedown":
       case "mouseup":
       case "paste":
       case "pause":
       case "play":
       case "pointercancel":
       case "pointerdown":
       case "pointerup":
       case "ratechange":
       case "reset":
       case "resize":
       case "seeked":
       case "submit":
       case "touchcancel":
       case "touchend":
       case "touchstart":
       case "volumechange":
       case "change":
       case "selectionchange":
       case "textInput":
       case "compositionstart":
       case "compositionend":
       case "compositionupdate":
       case "beforeblur":
       case "afterblur":
       case "beforeinput":
       case "blur":
       case "fullscreenchange":
       case "focus":
       case "hashchange":
       case "popstate":
       case "select":
       case "selectstart":
        return 1;

       case "drag":
       case "dragenter":
       case "dragexit":
       case "dragleave":
       case "dragover":
       case "mousemove":
       case "mouseout":
       case "mouseover":
       case "pointermove":
       case "pointerout":
       case "pointerover":
       case "scroll":
       case "toggle":
       case "touchmove":
       case "wheel":
       case "mouseenter":
       case "mouseleave":
       case "pointerenter":
       case "pointerleave":
        return 4;

       case "message":
        switch (ft()) {
         case dt:
          return 1;

         case pt:
          return 4;

         case ht:
         case mt:
          return 16;

         case gt:
          return 536870912;

         default:
          return 16;
        }

       default:
        return 16;
      }
    }
    var fn = null, dn = null, pn = null;
    function hn() {
      if (pn) return pn;
      var e, t, n = dn, r = n.length, a = "value" in fn ? fn.value : fn.textContent, i = a.length;
      for (e = 0; e < r && n[e] === a[e]; e++) ;
      var o = r - e;
      for (t = 1; t <= o && n[r - t] === a[i - t]; t++) ;
      return pn = a.slice(e, 1 < t ? 1 - t : void 0);
    }
    function mn(e) {
      var t = e.keyCode;
      return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 
      10 === e && (e = 13), 32 <= e || 13 === e ? e : 0;
    }
    function gn() {
      return !0;
    }
    function vn() {
      return !1;
    }
    function yn(e) {
      function t(t, n, r, a, i) {
        for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = a, 
        this.target = i, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], 
        this[o] = t ? t(a) : a[o]);
        return this.isDefaultPrevented = (null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue) ? gn : vn, 
        this.isPropagationStopped = vn, this;
      }
      return Q(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), 
          this.isDefaultPrevented = gn);
        },
        stopPropagation: function() {
          var e = this.nativeEvent;
          e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), 
          this.isPropagationStopped = gn);
        },
        persist: function() {},
        isPersistent: gn
      }), t;
    }
    var bn, wn, xn, kn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, _n = yn(kn), En = Q({}, kn, {
      view: 0,
      detail: 0
    }), Sn = yn(En), An = Q({}, En, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Dn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return void 0 === e.relatedTarget ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== xn && (xn && "mousemove" === e.type ? (bn = e.screenX - xn.screenX, 
        wn = e.screenY - xn.screenY) : wn = bn = 0, xn = e), bn);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : wn;
      }
    }), Cn = yn(An), Tn = yn(Q({}, An, {
      dataTransfer: 0
    })), On = yn(Q({}, En, {
      relatedTarget: 0
    })), Nn = yn(Q({}, kn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    })), Mn = Q({}, kn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), In = yn(Mn), Ln = yn(Q({}, kn, {
      data: 0
    })), jn = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Pn = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, Rn = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function zn(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : !!(e = Rn[e]) && !!t[e];
    }
    function Dn() {
      return zn;
    }
    var Fn = Q({}, En, {
      key: function(e) {
        if (e.key) {
          var t = jn[e.key] || e.key;
          if ("Unidentified" !== t) return t;
        }
        return "keypress" === e.type ? 13 === (e = mn(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? Pn[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Dn,
      charCode: function(e) {
        return "keypress" === e.type ? mn(e) : 0;
      },
      keyCode: function(e) {
        return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
      },
      which: function(e) {
        return "keypress" === e.type ? mn(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
      }
    }), Hn = yn(Fn), $n = yn(Q({}, An, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    })), Bn = yn(Q({}, En, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Dn
    })), Wn = yn(Q({}, kn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    })), Un = Q({}, An, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), Vn = yn(Un), qn = [ 9, 13, 27, 32 ], Zn = _ && "CompositionEvent" in window, Kn = null;
    _ && "documentMode" in document && (Kn = document.documentMode);
    var Yn = _ && "TextEvent" in window && !Kn, Qn = _ && (!Zn || Kn && 8 < Kn && 11 >= Kn), Gn = String.fromCharCode(32), Xn = !1;
    function Jn(e, t) {
      switch (e) {
       case "keyup":
        return -1 !== qn.indexOf(t.keyCode);

       case "keydown":
        return 229 !== t.keyCode;

       case "keypress":
       case "mousedown":
       case "focusout":
        return !0;

       default:
        return !1;
      }
    }
    function er(e) {
      return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
    }
    var tr = !1;
    var nr = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function rr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return "input" === t ? !!nr[e.type] : "textarea" === t;
    }
    function ar(e, t, n, r) {
      Fe(r), 0 < (t = ia(t, "onChange")).length && (n = new _n("onChange", "change", null, n, r), 
      e.push({
        event: n,
        listeners: t
      }));
    }
    var ir = null, or = null;
    function sr(e) {
      Gr(e, 0);
    }
    function lr(e) {
      if (oe(La(e))) return e;
    }
    function ur(e, t) {
      if ("change" === e) return t;
    }
    var cr = !1;
    if (_) {
      var fr;
      if (_) {
        var dr = "oninput" in document;
        if (!dr) {
          var pr = document.createElement("div");
          pr.setAttribute("oninput", "return;"), dr = "function" == typeof pr.oninput;
        }
        fr = dr;
      } else fr = !1;
      cr = fr && (!document.documentMode || 9 < document.documentMode);
    }
    function hr() {
      ir && (ir.detachEvent("onpropertychange", mr), or = ir = null);
    }
    function mr(e) {
      if ("value" === e.propertyName && lr(or)) {
        var t = [];
        ar(t, or, e, je(e)), Ue(sr, t);
      }
    }
    function gr(e, t, n) {
      "focusin" === e ? (hr(), or = n, (ir = t).attachEvent("onpropertychange", mr)) : "focusout" === e && hr();
    }
    function vr(e) {
      if ("selectionchange" === e || "keyup" === e || "keydown" === e) return lr(or);
    }
    function yr(e, t) {
      if ("click" === e) return lr(t);
    }
    function br(e, t) {
      if ("input" === e || "change" === e) return lr(t);
    }
    var wr = "function" == typeof Object.is ? Object.is : function(e, t) {
      return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
    };
    function xr(e, t) {
      if (wr(e, t)) return !0;
      if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
      var n = Object.keys(e), r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var a = n[r];
        if (!E.call(t, a) || !wr(e[a], t[a])) return !1;
      }
      return !0;
    }
    function kr(e) {
      for (;e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function _r(e, t) {
      var n, r = kr(e);
      for (e = 0; r; ) {
        if (3 === r.nodeType) {
          if (n = e + r.textContent.length, e <= t && n >= t) return {
            node: r,
            offset: t - e
          };
          e = n;
        }
        e: {
          for (;r; ) {
            if (r.nextSibling) {
              r = r.nextSibling;
              break e;
            }
            r = r.parentNode;
          }
          r = void 0;
        }
        r = kr(r);
      }
    }
    function Er(e, t) {
      return !(!e || !t) && (e === t || (!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? Er(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))));
    }
    function Sr() {
      for (var e = window, t = se(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = "string" == typeof t.contentWindow.location.href;
        } catch (e) {
          n = !1;
        }
        if (!n) break;
        t = se((e = t.contentWindow).document);
      }
      return t;
    }
    function Ar(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable);
    }
    function Cr(e) {
      var t = Sr(), n = e.focusedElem, r = e.selectionRange;
      if (t !== n && n && n.ownerDocument && Er(n.ownerDocument.documentElement, n)) {
        if (null !== r && Ar(n)) if (t = r.start, void 0 === (e = r.end) && (e = t), "selectionStart" in n) n.selectionStart = t, 
        n.selectionEnd = Math.min(e, n.value.length); else if ((e = (t = n.ownerDocument || document) && t.defaultView || window).getSelection) {
          e = e.getSelection();
          var a = n.textContent.length, i = Math.min(r.start, a);
          r = void 0 === r.end ? i : Math.min(r.end, a), !e.extend && i > r && (a = r, r = i, 
          i = a), a = _r(n, i);
          var o = _r(n, r);
          a && o && (1 !== e.rangeCount || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && ((t = t.createRange()).setStart(a.node, a.offset), 
          e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), 
          e.addRange(t)));
        }
        for (t = [], e = n; e = e.parentNode; ) 1 === e.nodeType && t.push({
          element: e,
          left: e.scrollLeft,
          top: e.scrollTop
        });
        for ("function" == typeof n.focus && n.focus(), n = 0; n < t.length; n++) (e = t[n]).element.scrollLeft = e.left, 
        e.element.scrollTop = e.top;
      }
    }
    var Tr = _ && "documentMode" in document && 11 >= document.documentMode, Or = null, Nr = null, Mr = null, Ir = !1;
    function Lr(e, t, n) {
      var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
      Ir || null == Or || Or !== se(r) || ("selectionStart" in (r = Or) && Ar(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
      } : r = {
        anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
      }, Mr && xr(Mr, r) || (Mr = r, 0 < (r = ia(Nr, "onSelect")).length && (t = new _n("onSelect", "select", null, t, n), 
      e.push({
        event: t,
        listeners: r
      }), t.target = Or)));
    }
    function jr(e, t) {
      var n = {};
      return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, 
      n;
    }
    var Pr = {
      animationend: jr("Animation", "AnimationEnd"),
      animationiteration: jr("Animation", "AnimationIteration"),
      animationstart: jr("Animation", "AnimationStart"),
      transitionend: jr("Transition", "TransitionEnd")
    }, Rr = {}, zr = {};
    function Dr(e) {
      if (Rr[e]) return Rr[e];
      if (!Pr[e]) return e;
      var t, n = Pr[e];
      for (t in n) if (n.hasOwnProperty(t) && t in zr) return Rr[e] = n[t];
      return e;
    }
    _ && (zr = document.createElement("div").style, "AnimationEvent" in window || (delete Pr.animationend.animation, 
    delete Pr.animationiteration.animation, delete Pr.animationstart.animation), "TransitionEvent" in window || delete Pr.transitionend.transition);
    var Fr = Dr("animationend"), Hr = Dr("animationiteration"), $r = Dr("animationstart"), Br = Dr("transitionend"), Wr = new Map, Ur = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function Vr(e, t) {
      Wr.set(e, t), x(t, [ e ]);
    }
    for (var qr = 0; qr < Ur.length; qr++) {
      var Zr = Ur[qr];
      Vr(Zr.toLowerCase(), "on" + (Zr[0].toUpperCase() + Zr.slice(1)));
    }
    Vr(Fr, "onAnimationEnd"), Vr(Hr, "onAnimationIteration"), Vr($r, "onAnimationStart"), 
    Vr("dblclick", "onDoubleClick"), Vr("focusin", "onFocus"), Vr("focusout", "onBlur"), 
    Vr(Br, "onTransitionEnd"), k("onMouseEnter", [ "mouseout", "mouseover" ]), k("onMouseLeave", [ "mouseout", "mouseover" ]), 
    k("onPointerEnter", [ "pointerout", "pointerover" ]), k("onPointerLeave", [ "pointerout", "pointerover" ]), 
    x("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), 
    x("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), 
    x("onBeforeInput", [ "compositionend", "keypress", "textInput", "paste" ]), x("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), 
    x("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), 
    x("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Kr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Yr = new Set("cancel close invalid load scroll toggle".split(" ").concat(Kr));
    function Qr(e, t, n) {
      var r = e.type || "unknown-event";
      e.currentTarget = n, function(e, t, n, r, a, i, o, s, l) {
        if (et.apply(this, arguments), Ye) {
          if (!Ye) throw Error(y(198));
          var u = Qe;
          Ye = !1, Qe = null, Ge || (Ge = !0, Xe = u);
        }
      }(r, t, void 0, e), e.currentTarget = null;
    }
    function Gr(e, t) {
      t = 0 != (4 & t);
      for (var n = 0; n < e.length; n++) {
        var r = e[n], a = r.event;
        r = r.listeners;
        e: {
          var i = void 0;
          if (t) for (var o = r.length - 1; 0 <= o; o--) {
            var s = r[o], l = s.instance, u = s.currentTarget;
            if (s = s.listener, l !== i && a.isPropagationStopped()) break e;
            Qr(a, s, u), i = l;
          } else for (o = 0; o < r.length; o++) {
            if (l = (s = r[o]).instance, u = s.currentTarget, s = s.listener, l !== i && a.isPropagationStopped()) break e;
            Qr(a, s, u), i = l;
          }
        }
      }
      if (Ge) throw e = Xe, Ge = !1, Xe = null, e;
    }
    function Xr(e, t) {
      var n = t[Ta];
      void 0 === n && (n = t[Ta] = new Set);
      var r = e + "__bubble";
      n.has(r) || (na(t, e, 2, !1), n.add(r));
    }
    function Jr(e, t, n) {
      var r = 0;
      t && (r |= 4), na(n, e, r, t);
    }
    var ea = "_reactListening" + Math.random().toString(36).slice(2);
    function ta(e) {
      if (!e[ea]) {
        e[ea] = !0, b.forEach((function(t) {
          "selectionchange" !== t && (Yr.has(t) || Jr(t, !1, e), Jr(t, !0, e));
        }));
        var t = 9 === e.nodeType ? e : e.ownerDocument;
        null === t || t[ea] || (t[ea] = !0, Jr("selectionchange", !1, t));
      }
    }
    function na(e, t, n, r) {
      switch (cn(t)) {
       case 1:
        var a = an;
        break;

       case 4:
        a = on;
        break;

       default:
        a = sn;
      }
      n = a.bind(null, t, n, e), a = void 0, !qe || "touchstart" !== t && "touchmove" !== t && "wheel" !== t || (a = !0), 
      r ? void 0 !== a ? e.addEventListener(t, n, {
        capture: !0,
        passive: a
      }) : e.addEventListener(t, n, !0) : void 0 !== a ? e.addEventListener(t, n, {
        passive: a
      }) : e.addEventListener(t, n, !1);
    }
    function ra(e, t, n, r, a) {
      var i = r;
      if (0 == (1 & t) && 0 == (2 & t) && null !== r) e: for (;;) {
        if (null === r) return;
        var o = r.tag;
        if (3 === o || 4 === o) {
          var s = r.stateNode.containerInfo;
          if (s === a || 8 === s.nodeType && s.parentNode === a) break;
          if (4 === o) for (o = r.return; null !== o; ) {
            var l = o.tag;
            if ((3 === l || 4 === l) && ((l = o.stateNode.containerInfo) === a || 8 === l.nodeType && l.parentNode === a)) return;
            o = o.return;
          }
          for (;null !== s; ) {
            if (null === (o = Ma(s))) return;
            if (5 === (l = o.tag) || 6 === l) {
              r = i = o;
              continue e;
            }
            s = s.parentNode;
          }
        }
        r = r.return;
      }
      Ue((function() {
        var r = i, a = je(n), o = [];
        e: {
          var s = Wr.get(e);
          if (void 0 !== s) {
            var l = _n, u = e;
            switch (e) {
             case "keypress":
              if (0 === mn(n)) break e;

             case "keydown":
             case "keyup":
              l = Hn;
              break;

             case "focusin":
              u = "focus", l = On;
              break;

             case "focusout":
              u = "blur", l = On;
              break;

             case "beforeblur":
             case "afterblur":
              l = On;
              break;

             case "click":
              if (2 === n.button) break e;

             case "auxclick":
             case "dblclick":
             case "mousedown":
             case "mousemove":
             case "mouseup":
             case "mouseout":
             case "mouseover":
             case "contextmenu":
              l = Cn;
              break;

             case "drag":
             case "dragend":
             case "dragenter":
             case "dragexit":
             case "dragleave":
             case "dragover":
             case "dragstart":
             case "drop":
              l = Tn;
              break;

             case "touchcancel":
             case "touchend":
             case "touchmove":
             case "touchstart":
              l = Bn;
              break;

             case Fr:
             case Hr:
             case $r:
              l = Nn;
              break;

             case Br:
              l = Wn;
              break;

             case "scroll":
              l = Sn;
              break;

             case "wheel":
              l = Vn;
              break;

             case "copy":
             case "cut":
             case "paste":
              l = In;
              break;

             case "gotpointercapture":
             case "lostpointercapture":
             case "pointercancel":
             case "pointerdown":
             case "pointermove":
             case "pointerout":
             case "pointerover":
             case "pointerup":
              l = $n;
            }
            var c = 0 != (4 & t), f = !c && "scroll" === e, d = c ? null !== s ? s + "Capture" : null : s;
            c = [];
            for (var p, h = r; null !== h; ) {
              var m = (p = h).stateNode;
              if (5 === p.tag && null !== m && (p = m, null !== d && (null != (m = Ve(h, d)) && c.push(aa(h, m, p)))), 
              f) break;
              h = h.return;
            }
            0 < c.length && (s = new l(s, u, null, n, a), o.push({
              event: s,
              listeners: c
            }));
          }
        }
        if (0 == (7 & t)) {
          if (l = "mouseout" === e || "pointerout" === e, (!(s = "mouseover" === e || "pointerover" === e) || n === Le || !(u = n.relatedTarget || n.fromElement) || !Ma(u) && !u[Ca]) && (l || s) && (s = a.window === a ? a : (s = a.ownerDocument) ? s.defaultView || s.parentWindow : window, 
          l ? (l = r, null !== (u = (u = n.relatedTarget || n.toElement) ? Ma(u) : null) && (u !== (f = tt(u)) || 5 !== u.tag && 6 !== u.tag) && (u = null)) : (l = null, 
          u = r), l !== u)) {
            if (c = Cn, m = "onMouseLeave", d = "onMouseEnter", h = "mouse", "pointerout" !== e && "pointerover" !== e || (c = $n, 
            m = "onPointerLeave", d = "onPointerEnter", h = "pointer"), f = null == l ? s : La(l), 
            p = null == u ? s : La(u), (s = new c(m, h + "leave", l, n, a)).target = f, s.relatedTarget = p, 
            m = null, Ma(a) === r && ((c = new c(d, h + "enter", u, n, a)).target = p, c.relatedTarget = f, 
            m = c), f = m, l && u) e: {
              for (d = u, h = 0, p = c = l; p; p = oa(p)) h++;
              for (p = 0, m = d; m; m = oa(m)) p++;
              for (;0 < h - p; ) c = oa(c), h--;
              for (;0 < p - h; ) d = oa(d), p--;
              for (;h--; ) {
                if (c === d || null !== d && c === d.alternate) break e;
                c = oa(c), d = oa(d);
              }
              c = null;
            } else c = null;
            null !== l && sa(o, s, l, c, !1), null !== u && null !== f && sa(o, f, u, c, !0);
          }
          if ("select" === (l = (s = r ? La(r) : window).nodeName && s.nodeName.toLowerCase()) || "input" === l && "file" === s.type) var g = ur; else if (rr(s)) if (cr) g = br; else {
            g = vr;
            var v = gr;
          } else (l = s.nodeName) && "input" === l.toLowerCase() && ("checkbox" === s.type || "radio" === s.type) && (g = yr);
          switch (g && (g = g(e, r)) ? ar(o, g, n, a) : (v && v(e, s, r), "focusout" === e && (v = s._wrapperState) && v.controlled && "number" === s.type && pe(s, "number", s.value)), 
          v = r ? La(r) : window, e) {
           case "focusin":
            (rr(v) || "true" === v.contentEditable) && (Or = v, Nr = r, Mr = null);
            break;

           case "focusout":
            Mr = Nr = Or = null;
            break;

           case "mousedown":
            Ir = !0;
            break;

           case "contextmenu":
           case "mouseup":
           case "dragend":
            Ir = !1, Lr(o, n, a);
            break;

           case "selectionchange":
            if (Tr) break;

           case "keydown":
           case "keyup":
            Lr(o, n, a);
          }
          var y;
          if (Zn) e: {
            switch (e) {
             case "compositionstart":
              var b = "onCompositionStart";
              break e;

             case "compositionend":
              b = "onCompositionEnd";
              break e;

             case "compositionupdate":
              b = "onCompositionUpdate";
              break e;
            }
            b = void 0;
          } else tr ? Jn(e, n) && (b = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (b = "onCompositionStart");
          b && (Qn && "ko" !== n.locale && (tr || "onCompositionStart" !== b ? "onCompositionEnd" === b && tr && (y = hn()) : (dn = "value" in (fn = a) ? fn.value : fn.textContent, 
          tr = !0)), 0 < (v = ia(r, b)).length && (b = new Ln(b, e, null, n, a), o.push({
            event: b,
            listeners: v
          }), y ? b.data = y : null !== (y = er(n)) && (b.data = y))), (y = Yn ? function(e, t) {
            switch (e) {
             case "compositionend":
              return er(t);

             case "keypress":
              return 32 !== t.which ? null : (Xn = !0, Gn);

             case "textInput":
              return (e = t.data) === Gn && Xn ? null : e;

             default:
              return null;
            }
          }(e, n) : function(e, t) {
            if (tr) return "compositionend" === e || !Zn && Jn(e, t) ? (e = hn(), pn = dn = fn = null, 
            tr = !1, e) : null;
            switch (e) {
             case "paste":
             default:
              return null;

             case "keypress":
              if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
              }
              return null;

             case "compositionend":
              return Qn && "ko" !== t.locale ? null : t.data;
            }
          }(e, n)) && (0 < (r = ia(r, "onBeforeInput")).length && (a = new Ln("onBeforeInput", "beforeinput", null, n, a), 
          o.push({
            event: a,
            listeners: r
          }), a.data = y));
        }
        Gr(o, t);
      }));
    }
    function aa(e, t, n) {
      return {
        instance: e,
        listener: t,
        currentTarget: n
      };
    }
    function ia(e, t) {
      for (var n = t + "Capture", r = []; null !== e; ) {
        var a = e, i = a.stateNode;
        5 === a.tag && null !== i && (a = i, null != (i = Ve(e, n)) && r.unshift(aa(e, i, a)), 
        null != (i = Ve(e, t)) && r.push(aa(e, i, a))), e = e.return;
      }
      return r;
    }
    function oa(e) {
      if (null === e) return null;
      do {
        e = e.return;
      } while (e && 5 !== e.tag);
      return e || null;
    }
    function sa(e, t, n, r, a) {
      for (var i = t._reactName, o = []; null !== n && n !== r; ) {
        var s = n, l = s.alternate, u = s.stateNode;
        if (null !== l && l === r) break;
        5 === s.tag && null !== u && (s = u, a ? null != (l = Ve(n, i)) && o.unshift(aa(n, l, s)) : a || null != (l = Ve(n, i)) && o.push(aa(n, l, s))), 
        n = n.return;
      }
      0 !== o.length && e.push({
        event: t,
        listeners: o
      });
    }
    var la = /\r\n?/g, ua = /\u0000|\uFFFD/g;
    function ca(e) {
      return ("string" == typeof e ? e : "" + e).replace(la, "\n").replace(ua, "");
    }
    function fa(e, t, n) {
      if (t = ca(t), ca(e) !== t && n) throw Error(y(425));
    }
    function da() {}
    var pa = null, ha = null;
    function ma(e, t) {
      return "textarea" === e || "noscript" === e || "string" == typeof t.children || "number" == typeof t.children || "object" == typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html;
    }
    var ga = "function" == typeof setTimeout ? setTimeout : void 0, va = "function" == typeof clearTimeout ? clearTimeout : void 0, ya = "function" == typeof Promise ? Promise : void 0, ba = "function" == typeof queueMicrotask ? queueMicrotask : void 0 !== ya ? function(e) {
      return ya.resolve(null).then(e).catch(wa);
    } : ga;
    function wa(e) {
      setTimeout((function() {
        throw e;
      }));
    }
    function xa(e, t) {
      var n = t, r = 0;
      do {
        var a = n.nextSibling;
        if (e.removeChild(n), a && 8 === a.nodeType) if ("/$" === (n = a.data)) {
          if (0 === r) return e.removeChild(a), void tn(t);
          r--;
        } else "$" !== n && "$?" !== n && "$!" !== n || r++;
        n = a;
      } while (n);
      tn(t);
    }
    function ka(e) {
      for (;null != e; e = e.nextSibling) {
        var t = e.nodeType;
        if (1 === t || 3 === t) break;
        if (8 === t) {
          if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
          if ("/$" === t) return null;
        }
      }
      return e;
    }
    function _a(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (8 === e.nodeType) {
          var n = e.data;
          if ("$" === n || "$!" === n || "$?" === n) {
            if (0 === t) return e;
            t--;
          } else "/$" === n && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var Ea = Math.random().toString(36).slice(2), Sa = "__reactFiber$" + Ea, Aa = "__reactProps$" + Ea, Ca = "__reactContainer$" + Ea, Ta = "__reactEvents$" + Ea, Oa = "__reactListeners$" + Ea, Na = "__reactHandles$" + Ea;
    function Ma(e) {
      var t = e[Sa];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if (t = n[Ca] || n[Sa]) {
          if (n = t.alternate, null !== t.child || null !== n && null !== n.child) for (e = _a(e); null !== e; ) {
            if (n = e[Sa]) return n;
            e = _a(e);
          }
          return t;
        }
        n = (e = n).parentNode;
      }
      return null;
    }
    function Ia(e) {
      return !(e = e[Sa] || e[Ca]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e;
    }
    function La(e) {
      if (5 === e.tag || 6 === e.tag) return e.stateNode;
      throw Error(y(33));
    }
    function ja(e) {
      return e[Aa] || null;
    }
    var Pa = [], Ra = -1;
    function za(e) {
      return {
        current: e
      };
    }
    function Da(e) {
      0 > Ra || (e.current = Pa[Ra], Pa[Ra] = null, Ra--);
    }
    function Fa(e, t) {
      Ra++, Pa[Ra] = e.current, e.current = t;
    }
    var Ha = {}, $a = za(Ha), Ba = za(!1), Wa = Ha;
    function Ua(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Ha;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
      var a, i = {};
      for (a in n) i[a] = t[a];
      return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, 
      e.__reactInternalMemoizedMaskedChildContext = i), i;
    }
    function Va(e) {
      return null != (e = e.childContextTypes);
    }
    function qa() {
      Da(Ba), Da($a);
    }
    function Za(e, t, n) {
      if ($a.current !== Ha) throw Error(y(168));
      Fa($a, t), Fa(Ba, n);
    }
    function Ka(e, t, n) {
      var r = e.stateNode;
      if (t = t.childContextTypes, "function" != typeof r.getChildContext) return n;
      for (var a in r = r.getChildContext()) if (!(a in t)) throw Error(y(108, ne(e) || "Unknown", a));
      return Q({}, n, r);
    }
    function Ya(e) {
      return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ha, 
      Wa = $a.current, Fa($a, e), Fa(Ba, Ba.current), !0;
    }
    function Qa(e, t, n) {
      var r = e.stateNode;
      if (!r) throw Error(y(169));
      n ? (e = Ka(e, t, Wa), r.__reactInternalMemoizedMergedChildContext = e, Da(Ba), 
      Da($a), Fa($a, e)) : Da(Ba), Fa(Ba, n);
    }
    var Ga = null, Xa = !1, Ja = !1;
    function ei(e) {
      null === Ga ? Ga = [ e ] : Ga.push(e);
    }
    function ti() {
      if (!Ja && null !== Ga) {
        Ja = !0;
        var e = 0, t = It;
        try {
          var n = Ga;
          for (It = 1; e < n.length; e++) {
            var r = n[e];
            do {
              r = r(!0);
            } while (null !== r);
          }
          Ga = null, Xa = !1;
        } catch (t) {
          throw null !== Ga && (Ga = Ga.slice(e + 1)), ot(dt, ti), t;
        } finally {
          It = t, Ja = !1;
        }
      }
      return null;
    }
    var ni = [], ri = 0, ai = null, ii = 0, oi = [], si = 0, li = null, ui = 1, ci = "";
    function fi(e, t) {
      ni[ri++] = ii, ni[ri++] = ai, ai = e, ii = t;
    }
    function di(e, t, n) {
      oi[si++] = ui, oi[si++] = ci, oi[si++] = li, li = e;
      var r = ui;
      e = ci;
      var a = 32 - bt(r) - 1;
      r &= ~(1 << a), n += 1;
      var i = 32 - bt(t) + a;
      if (30 < i) {
        var o = a - a % 5;
        i = (r & (1 << o) - 1).toString(32), r >>= o, a -= o, ui = 1 << 32 - bt(t) + a | n << a | r, 
        ci = i + e;
      } else ui = 1 << i | n << a | r, ci = e;
    }
    function pi(e) {
      null !== e.return && (fi(e, 1), di(e, 1, 0));
    }
    function hi(e) {
      for (;e === ai; ) ai = ni[--ri], ni[ri] = null, ii = ni[--ri], ni[ri] = null;
      for (;e === li; ) li = oi[--si], oi[si] = null, ci = oi[--si], oi[si] = null, ui = oi[--si], 
      oi[si] = null;
    }
    var mi = null, gi = null, vi = !1, yi = null;
    function bi(e, t) {
      var n = Uu(5, null, null, 0);
      n.elementType = "DELETED", n.stateNode = t, n.return = e, null === (t = e.deletions) ? (e.deletions = [ n ], 
      e.flags |= 16) : t.push(n);
    }
    function wi(e, t) {
      switch (e.tag) {
       case 5:
        var n = e.type;
        return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t, 
        mi = e, gi = ka(t.firstChild), !0);

       case 6:
        return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t, 
        mi = e, gi = null, !0);

       case 13:
        return null !== (t = 8 !== t.nodeType ? null : t) && (n = null !== li ? {
          id: ui,
          overflow: ci
        } : null, e.memoizedState = {
          dehydrated: t,
          treeContext: n,
          retryLane: 1073741824
        }, (n = Uu(18, null, null, 0)).stateNode = t, n.return = e, e.child = n, mi = e, 
        gi = null, !0);

       default:
        return !1;
      }
    }
    function xi(e) {
      return 0 != (1 & e.mode) && 0 == (128 & e.flags);
    }
    function ki(e) {
      if (vi) {
        var t = gi;
        if (t) {
          var n = t;
          if (!wi(e, t)) {
            if (xi(e)) throw Error(y(418));
            t = ka(n.nextSibling);
            var r = mi;
            t && wi(e, t) ? bi(r, n) : (e.flags = -4097 & e.flags | 2, vi = !1, mi = e);
          }
        } else {
          if (xi(e)) throw Error(y(418));
          e.flags = -4097 & e.flags | 2, vi = !1, mi = e;
        }
      }
    }
    function _i(e) {
      for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag; ) e = e.return;
      mi = e;
    }
    function Ei(e) {
      if (e !== mi) return !1;
      if (!vi) return _i(e), vi = !0, !1;
      var t;
      if ((t = 3 !== e.tag) && !(t = 5 !== e.tag) && (t = "head" !== (t = e.type) && "body" !== t && !ma(e.type, e.memoizedProps)), 
      t && (t = gi)) {
        if (xi(e)) throw Si(), Error(y(418));
        for (;t; ) bi(e, t), t = ka(t.nextSibling);
      }
      if (_i(e), 13 === e.tag) {
        if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(y(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if ("/$" === n) {
                if (0 === t) {
                  gi = ka(e.nextSibling);
                  break e;
                }
                t--;
              } else "$" !== n && "$!" !== n && "$?" !== n || t++;
            }
            e = e.nextSibling;
          }
          gi = null;
        }
      } else gi = mi ? ka(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Si() {
      for (var e = gi; e; ) e = ka(e.nextSibling);
    }
    function Ai() {
      gi = mi = null, vi = !1;
    }
    function Ci(e) {
      null === yi ? yi = [ e ] : yi.push(e);
    }
    var Ti = L.ReactCurrentBatchConfig;
    function Oi(e, t) {
      if (e && e.defaultProps) {
        for (var n in t = Q({}, t), e = e.defaultProps) void 0 === t[n] && (t[n] = e[n]);
        return t;
      }
      return t;
    }
    var Ni = za(null), Mi = null, Ii = null, Li = null;
    function ji() {
      Li = Ii = Mi = null;
    }
    function Pi(e) {
      var t = Ni.current;
      Da(Ni), e._currentValue = t;
    }
    function Ri(e, t, n) {
      for (;null !== e; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, null !== r && (r.childLanes |= t)) : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t), 
        e === n) break;
        e = e.return;
      }
    }
    function zi(e, t) {
      Mi = e, Li = Ii = null, null !== (e = e.dependencies) && null !== e.firstContext && (0 != (e.lanes & t) && (Ls = !0), 
      e.firstContext = null);
    }
    function Di(e) {
      var t = e._currentValue;
      if (Li !== e) if (e = {
        context: e,
        memoizedValue: t,
        next: null
      }, null === Ii) {
        if (null === Mi) throw Error(y(308));
        Ii = e, Mi.dependencies = {
          lanes: 0,
          firstContext: e
        };
      } else Ii = Ii.next = e;
      return t;
    }
    var Fi = null;
    function Hi(e) {
      null === Fi ? Fi = [ e ] : Fi.push(e);
    }
    function $i(e, t, n, r) {
      var a = t.interleaved;
      return null === a ? (n.next = n, Hi(t)) : (n.next = a.next, a.next = n), t.interleaved = n, 
      Bi(e, r);
    }
    function Bi(e, t) {
      e.lanes |= t;
      var n = e.alternate;
      for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; ) e.childLanes |= t, 
      null !== (n = e.alternate) && (n.childLanes |= t), n = e, e = e.return;
      return 3 === n.tag ? n.stateNode : null;
    }
    var Wi = !1;
    function Ui(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: 0
        },
        effects: null
      };
    }
    function Vi(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
      });
    }
    function qi(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function Zi(e, t, n) {
      var r = e.updateQueue;
      if (null === r) return null;
      if (r = r.shared, 0 != (2 & $l)) {
        var a = r.pending;
        return null === a ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, Bi(e, n);
      }
      return null === (a = r.interleaved) ? (t.next = t, Hi(r)) : (t.next = a.next, a.next = t), 
      r.interleaved = t, Bi(e, n);
    }
    function Ki(e, t, n) {
      if (null !== (t = t.updateQueue) && (t = t.shared, 0 != (4194240 & n))) {
        var r = t.lanes;
        n |= r &= e.pendingLanes, t.lanes = n, Mt(e, n);
      }
    }
    function Yi(e, t) {
      var n = e.updateQueue, r = e.alternate;
      if (null !== r && n === (r = r.updateQueue)) {
        var a = null, i = null;
        if (null !== (n = n.firstBaseUpdate)) {
          do {
            var o = {
              eventTime: n.eventTime,
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: n.callback,
              next: null
            };
            null === i ? a = i = o : i = i.next = o, n = n.next;
          } while (null !== n);
          null === i ? a = i = t : i = i.next = t;
        } else a = i = t;
        return n = {
          baseState: r.baseState,
          firstBaseUpdate: a,
          lastBaseUpdate: i,
          shared: r.shared,
          effects: r.effects
        }, void (e.updateQueue = n);
      }
      null === (e = n.lastBaseUpdate) ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
    }
    function Qi(e, t, n, r) {
      var a = e.updateQueue;
      Wi = !1;
      var i = a.firstBaseUpdate, o = a.lastBaseUpdate, s = a.shared.pending;
      if (null !== s) {
        a.shared.pending = null;
        var l = s, u = l.next;
        l.next = null, null === o ? i = u : o.next = u, o = l;
        var c = e.alternate;
        null !== c && ((s = (c = c.updateQueue).lastBaseUpdate) !== o && (null === s ? c.firstBaseUpdate = u : s.next = u, 
        c.lastBaseUpdate = l));
      }
      if (null !== i) {
        var f = a.baseState;
        for (o = 0, c = u = l = null, s = i; ;) {
          var d = s.lane, p = s.eventTime;
          if ((r & d) === d) {
            null !== c && (c = c.next = {
              eventTime: p,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null
            });
            e: {
              var h = e, m = s;
              switch (d = t, p = n, m.tag) {
               case 1:
                if ("function" == typeof (h = m.payload)) {
                  f = h.call(p, f, d);
                  break e;
                }
                f = h;
                break e;

               case 3:
                h.flags = -65537 & h.flags | 128;

               case 0:
                if (null == (d = "function" == typeof (h = m.payload) ? h.call(p, f, d) : h)) break e;
                f = Q({}, f, d);
                break e;

               case 2:
                Wi = !0;
              }
            }
            null !== s.callback && 0 !== s.lane && (e.flags |= 64, null === (d = a.effects) ? a.effects = [ s ] : d.push(s));
          } else p = {
            eventTime: p,
            lane: d,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, null === c ? (u = c = p, l = f) : c = c.next = p, o |= d;
          if (null === (s = s.next)) {
            if (null === (s = a.shared.pending)) break;
            s = (d = s).next, d.next = null, a.lastBaseUpdate = d, a.shared.pending = null;
          }
        }
        if (null === c && (l = f), a.baseState = l, a.firstBaseUpdate = u, a.lastBaseUpdate = c, 
        null !== (t = a.shared.interleaved)) {
          a = t;
          do {
            o |= a.lane, a = a.next;
          } while (a !== t);
        } else null === i && (a.shared.lanes = 0);
        Yl |= o, e.lanes = o, e.memoizedState = f;
      }
    }
    function Gi(e, t, n) {
      if (e = t.effects, t.effects = null, null !== e) for (t = 0; t < e.length; t++) {
        var r = e[t], a = r.callback;
        if (null !== a) {
          if (r.callback = null, r = n, "function" != typeof a) throw Error(y(191, a));
          a.call(r);
        }
      }
    }
    var Xi = (new g.Component).refs;
    function Ji(e, t, n, r) {
      n = null == (n = n(r, t = e.memoizedState)) ? t : Q({}, t, n), e.memoizedState = n, 
      0 === e.lanes && (e.updateQueue.baseState = n);
    }
    var eo = {
      isMounted: function(e) {
        return !!(e = e._reactInternals) && tt(e) === e;
      },
      enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = pu(), a = hu(e), i = qi(r, a);
        i.payload = t, null != n && (i.callback = n), null !== (t = Zi(e, i, a)) && (mu(t, e, a, r), 
        Ki(t, e, a));
      },
      enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = pu(), a = hu(e), i = qi(r, a);
        i.tag = 1, i.payload = t, null != n && (i.callback = n), null !== (t = Zi(e, i, a)) && (mu(t, e, a, r), 
        Ki(t, e, a));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = pu(), r = hu(e), a = qi(n, r);
        a.tag = 2, null != t && (a.callback = t), null !== (t = Zi(e, a, r)) && (mu(t, e, r, n), 
        Ki(t, e, r));
      }
    };
    function to(e, t, n, r, a, i, o) {
      return "function" == typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, i, o) : !t.prototype || !t.prototype.isPureReactComponent || (!xr(n, r) || !xr(a, i));
    }
    function no(e, t, n) {
      var r = !1, a = Ha, i = t.contextType;
      return "object" == typeof i && null !== i ? i = Di(i) : (a = Va(t) ? Wa : $a.current, 
      i = (r = null != (r = t.contextTypes)) ? Ua(e, a) : Ha), t = new t(n, i), e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null, 
      t.updater = eo, e.stateNode = t, t._reactInternals = e, r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a, 
      e.__reactInternalMemoizedMaskedChildContext = i), t;
    }
    function ro(e, t, n, r) {
      e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), 
      "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), 
      t.state !== e && eo.enqueueReplaceState(t, t.state, null);
    }
    function ao(e, t, n, r) {
      var a = e.stateNode;
      a.props = n, a.state = e.memoizedState, a.refs = Xi, Ui(e);
      var i = t.contextType;
      "object" == typeof i && null !== i ? a.context = Di(i) : (i = Va(t) ? Wa : $a.current, 
      a.context = Ua(e, i)), a.state = e.memoizedState, "function" == typeof (i = t.getDerivedStateFromProps) && (Ji(e, t, i, n), 
      a.state = e.memoizedState), "function" == typeof t.getDerivedStateFromProps || "function" == typeof a.getSnapshotBeforeUpdate || "function" != typeof a.UNSAFE_componentWillMount && "function" != typeof a.componentWillMount || (t = a.state, 
      "function" == typeof a.componentWillMount && a.componentWillMount(), "function" == typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), 
      t !== a.state && eo.enqueueReplaceState(a, a.state, null), Qi(e, n, a, r), a.state = e.memoizedState), 
      "function" == typeof a.componentDidMount && (e.flags |= 4194308);
    }
    function io(e, t, n) {
      if (null !== (e = n.ref) && "function" != typeof e && "object" != typeof e) {
        if (n._owner) {
          if (n = n._owner) {
            if (1 !== n.tag) throw Error(y(309));
            var r = n.stateNode;
          }
          if (!r) throw Error(y(147, e));
          var a = r, i = "" + e;
          return null !== t && null !== t.ref && "function" == typeof t.ref && t.ref._stringRef === i ? t.ref : (t = function(e) {
            var t = a.refs;
            t === Xi && (t = a.refs = {}), null === e ? delete t[i] : t[i] = e;
          }, t._stringRef = i, t);
        }
        if ("string" != typeof e) throw Error(y(284));
        if (!n._owner) throw Error(y(290, e));
      }
      return e;
    }
    function oo(e, t) {
      throw e = Object.prototype.toString.call(t), Error(y(31, "[object Object]" === e ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
    }
    function so(e) {
      return (0, e._init)(e._payload);
    }
    function lo(e) {
      function t(t, n) {
        if (e) {
          var r = t.deletions;
          null === r ? (t.deletions = [ n ], t.flags |= 16) : r.push(n);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (;null !== r; ) t(n, r), r = r.sibling;
        return null;
      }
      function r(e, t) {
        for (e = new Map; null !== t; ) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), 
        t = t.sibling;
        return e;
      }
      function a(e, t) {
        return (e = qu(e, t)).index = 0, e.sibling = null, e;
      }
      function i(t, n, r) {
        return t.index = r, e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.flags |= 2, 
        n) : r : (t.flags |= 2, n) : (t.flags |= 1048576, n);
      }
      function o(t) {
        return e && null === t.alternate && (t.flags |= 2), t;
      }
      function s(e, t, n, r) {
        return null === t || 6 !== t.tag ? ((t = Qu(n, e.mode, r)).return = e, t) : ((t = a(t, n)).return = e, 
        t);
      }
      function l(e, t, n, r) {
        var i = n.type;
        return i === R ? c(e, t, n.props.children, r, n.key) : null !== t && (t.elementType === i || "object" == typeof i && null !== i && i.$$typeof === V && so(i) === t.type) ? ((r = a(t, n.props)).ref = io(e, t, n), 
        r.return = e, r) : ((r = Zu(n.type, n.key, n.props, null, e.mode, r)).ref = io(e, t, n), 
        r.return = e, r);
      }
      function u(e, t, n, r) {
        return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Gu(n, e.mode, r)).return = e, 
        t) : ((t = a(t, n.children || [])).return = e, t);
      }
      function c(e, t, n, r, i) {
        return null === t || 7 !== t.tag ? ((t = Ku(n, e.mode, r, i)).return = e, t) : ((t = a(t, n)).return = e, 
        t);
      }
      function f(e, t, n) {
        if ("string" == typeof t && "" !== t || "number" == typeof t) return (t = Qu("" + t, e.mode, n)).return = e, 
        t;
        if ("object" == typeof t && null !== t) {
          switch (t.$$typeof) {
           case j:
            return (n = Zu(t.type, t.key, t.props, null, e.mode, n)).ref = io(e, null, t), n.return = e, 
            n;

           case P:
            return (t = Gu(t, e.mode, n)).return = e, t;

           case V:
            return f(e, (0, t._init)(t._payload), n);
          }
          if (he(t) || K(t)) return (t = Ku(t, e.mode, n, null)).return = e, t;
          oo(e, t);
        }
        return null;
      }
      function d(e, t, n, r) {
        var a = null !== t ? t.key : null;
        if ("string" == typeof n && "" !== n || "number" == typeof n) return null !== a ? null : s(e, t, "" + n, r);
        if ("object" == typeof n && null !== n) {
          switch (n.$$typeof) {
           case j:
            return n.key === a ? l(e, t, n, r) : null;

           case P:
            return n.key === a ? u(e, t, n, r) : null;

           case V:
            return d(e, t, (a = n._init)(n._payload), r);
          }
          if (he(n) || K(n)) return null !== a ? null : c(e, t, n, r, null);
          oo(e, n);
        }
        return null;
      }
      function p(e, t, n, r, a) {
        if ("string" == typeof r && "" !== r || "number" == typeof r) return s(t, e = e.get(n) || null, "" + r, a);
        if ("object" == typeof r && null !== r) {
          switch (r.$$typeof) {
           case j:
            return l(t, e = e.get(null === r.key ? n : r.key) || null, r, a);

           case P:
            return u(t, e = e.get(null === r.key ? n : r.key) || null, r, a);

           case V:
            return p(e, t, n, (0, r._init)(r._payload), a);
          }
          if (he(r) || K(r)) return c(t, e = e.get(n) || null, r, a, null);
          oo(t, r);
        }
        return null;
      }
      function h(a, o, s, l) {
        for (var u = null, c = null, h = o, m = o = 0, g = null; null !== h && m < s.length; m++) {
          h.index > m ? (g = h, h = null) : g = h.sibling;
          var v = d(a, h, s[m], l);
          if (null === v) {
            null === h && (h = g);
            break;
          }
          e && h && null === v.alternate && t(a, h), o = i(v, o, m), null === c ? u = v : c.sibling = v, 
          c = v, h = g;
        }
        if (m === s.length) return n(a, h), vi && fi(a, m), u;
        if (null === h) {
          for (;m < s.length; m++) null !== (h = f(a, s[m], l)) && (o = i(h, o, m), null === c ? u = h : c.sibling = h, 
          c = h);
          return vi && fi(a, m), u;
        }
        for (h = r(a, h); m < s.length; m++) null !== (g = p(h, a, m, s[m], l)) && (e && null !== g.alternate && h.delete(null === g.key ? m : g.key), 
        o = i(g, o, m), null === c ? u = g : c.sibling = g, c = g);
        return e && h.forEach((function(e) {
          return t(a, e);
        })), vi && fi(a, m), u;
      }
      function m(a, o, s, l) {
        var u = K(s);
        if ("function" != typeof u) throw Error(y(150));
        if (null == (s = u.call(s))) throw Error(y(151));
        for (var c = u = null, h = o, m = o = 0, g = null, v = s.next(); null !== h && !v.done; m++, 
        v = s.next()) {
          h.index > m ? (g = h, h = null) : g = h.sibling;
          var b = d(a, h, v.value, l);
          if (null === b) {
            null === h && (h = g);
            break;
          }
          e && h && null === b.alternate && t(a, h), o = i(b, o, m), null === c ? u = b : c.sibling = b, 
          c = b, h = g;
        }
        if (v.done) return n(a, h), vi && fi(a, m), u;
        if (null === h) {
          for (;!v.done; m++, v = s.next()) null !== (v = f(a, v.value, l)) && (o = i(v, o, m), 
          null === c ? u = v : c.sibling = v, c = v);
          return vi && fi(a, m), u;
        }
        for (h = r(a, h); !v.done; m++, v = s.next()) null !== (v = p(h, a, m, v.value, l)) && (e && null !== v.alternate && h.delete(null === v.key ? m : v.key), 
        o = i(v, o, m), null === c ? u = v : c.sibling = v, c = v);
        return e && h.forEach((function(e) {
          return t(a, e);
        })), vi && fi(a, m), u;
      }
      return function e(r, i, s, l) {
        if ("object" == typeof s && null !== s && s.type === R && null === s.key && (s = s.props.children), 
        "object" == typeof s && null !== s) {
          switch (s.$$typeof) {
           case j:
            e: {
              for (var u = s.key, c = i; null !== c; ) {
                if (c.key === u) {
                  if ((u = s.type) === R) {
                    if (7 === c.tag) {
                      n(r, c.sibling), (i = a(c, s.props.children)).return = r, r = i;
                      break e;
                    }
                  } else if (c.elementType === u || "object" == typeof u && null !== u && u.$$typeof === V && so(u) === c.type) {
                    n(r, c.sibling), (i = a(c, s.props)).ref = io(r, c, s), i.return = r, r = i;
                    break e;
                  }
                  n(r, c);
                  break;
                }
                t(r, c), c = c.sibling;
              }
              s.type === R ? ((i = Ku(s.props.children, r.mode, l, s.key)).return = r, r = i) : ((l = Zu(s.type, s.key, s.props, null, r.mode, l)).ref = io(r, i, s), 
              l.return = r, r = l);
            }
            return o(r);

           case P:
            e: {
              for (c = s.key; null !== i; ) {
                if (i.key === c) {
                  if (4 === i.tag && i.stateNode.containerInfo === s.containerInfo && i.stateNode.implementation === s.implementation) {
                    n(r, i.sibling), (i = a(i, s.children || [])).return = r, r = i;
                    break e;
                  }
                  n(r, i);
                  break;
                }
                t(r, i), i = i.sibling;
              }
              (i = Gu(s, r.mode, l)).return = r, r = i;
            }
            return o(r);

           case V:
            return e(r, i, (c = s._init)(s._payload), l);
          }
          if (he(s)) return h(r, i, s, l);
          if (K(s)) return m(r, i, s, l);
          oo(r, s);
        }
        return "string" == typeof s && "" !== s || "number" == typeof s ? (s = "" + s, null !== i && 6 === i.tag ? (n(r, i.sibling), 
        (i = a(i, s)).return = r, r = i) : (n(r, i), (i = Qu(s, r.mode, l)).return = r, 
        r = i), o(r)) : n(r, i);
      };
    }
    var uo = lo(!0), co = lo(!1), fo = {}, po = za(fo), ho = za(fo), mo = za(fo);
    function go(e) {
      if (e === fo) throw Error(y(174));
      return e;
    }
    function vo(e, t) {
      switch (Fa(mo, t), Fa(ho, e), Fa(po, fo), e = t.nodeType) {
       case 9:
       case 11:
        t = (t = t.documentElement) ? t.namespaceURI : xe(null, "");
        break;

       default:
        t = xe(t = (e = 8 === e ? t.parentNode : t).namespaceURI || null, e = e.tagName);
      }
      Da(po), Fa(po, t);
    }
    function yo() {
      Da(po), Da(ho), Da(mo);
    }
    function bo(e) {
      go(mo.current);
      var t = go(po.current), n = xe(t, e.type);
      t !== n && (Fa(ho, e), Fa(po, n));
    }
    function wo(e) {
      ho.current === e && (Da(po), Da(ho));
    }
    var xo = za(0);
    function ko(e) {
      for (var t = e; null !== t; ) {
        if (13 === t.tag) {
          var n = t.memoizedState;
          if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)) return t;
        } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
          if (0 != (128 & t.flags)) return t;
        } else if (null !== t.child) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (;null === t.sibling; ) {
          if (null === t.return || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var _o = [];
    function Eo() {
      for (var e = 0; e < _o.length; e++) _o[e]._workInProgressVersionPrimary = null;
      _o.length = 0;
    }
    var So = L.ReactCurrentDispatcher, Ao = L.ReactCurrentBatchConfig, Co = 0, To = null, Oo = null, No = null, Mo = !1, Io = !1, Lo = 0, jo = 0;
    function Po() {
      throw Error(y(321));
    }
    function Ro(e, t) {
      if (null === t) return !1;
      for (var n = 0; n < t.length && n < e.length; n++) if (!wr(e[n], t[n])) return !1;
      return !0;
    }
    function zo(e, t, n, r, a, i) {
      if (Co = i, To = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, So.current = null === e || null === e.memoizedState ? ws : xs, 
      e = n(r, a), Io) {
        i = 0;
        do {
          if (Io = !1, Lo = 0, 25 <= i) throw Error(y(301));
          i += 1, No = Oo = null, t.updateQueue = null, So.current = ks, e = n(r, a);
        } while (Io);
      }
      if (So.current = bs, t = null !== Oo && null !== Oo.next, Co = 0, No = Oo = To = null, 
      Mo = !1, t) throw Error(y(300));
      return e;
    }
    function Do() {
      var e = 0 !== Lo;
      return Lo = 0, e;
    }
    function Fo() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return null === No ? To.memoizedState = No = e : No = No.next = e, No;
    }
    function Ho() {
      if (null === Oo) {
        var e = To.alternate;
        e = null !== e ? e.memoizedState : null;
      } else e = Oo.next;
      var t = null === No ? To.memoizedState : No.next;
      if (null !== t) No = t, Oo = e; else {
        if (null === e) throw Error(y(310));
        e = {
          memoizedState: (Oo = e).memoizedState,
          baseState: Oo.baseState,
          baseQueue: Oo.baseQueue,
          queue: Oo.queue,
          next: null
        }, null === No ? To.memoizedState = No = e : No = No.next = e;
      }
      return No;
    }
    function $o(e, t) {
      return "function" == typeof t ? t(e) : t;
    }
    function Bo(e) {
      var t = Ho(), n = t.queue;
      if (null === n) throw Error(y(311));
      n.lastRenderedReducer = e;
      var r = Oo, a = r.baseQueue, i = n.pending;
      if (null !== i) {
        if (null !== a) {
          var o = a.next;
          a.next = i.next, i.next = o;
        }
        r.baseQueue = a = i, n.pending = null;
      }
      if (null !== a) {
        i = a.next, r = r.baseState;
        var s = o = null, l = null, u = i;
        do {
          var c = u.lane;
          if ((Co & c) === c) null !== l && (l = l.next = {
            lane: 0,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null
          }), r = u.hasEagerState ? u.eagerState : e(r, u.action); else {
            var f = {
              lane: c,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null
            };
            null === l ? (s = l = f, o = r) : l = l.next = f, To.lanes |= c, Yl |= c;
          }
          u = u.next;
        } while (null !== u && u !== i);
        null === l ? o = r : l.next = s, wr(r, t.memoizedState) || (Ls = !0), t.memoizedState = r, 
        t.baseState = o, t.baseQueue = l, n.lastRenderedState = r;
      }
      if (null !== (e = n.interleaved)) {
        a = e;
        do {
          i = a.lane, To.lanes |= i, Yl |= i, a = a.next;
        } while (a !== e);
      } else null === a && (n.lanes = 0);
      return [ t.memoizedState, n.dispatch ];
    }
    function Wo(e) {
      var t = Ho(), n = t.queue;
      if (null === n) throw Error(y(311));
      n.lastRenderedReducer = e;
      var r = n.dispatch, a = n.pending, i = t.memoizedState;
      if (null !== a) {
        n.pending = null;
        var o = a = a.next;
        do {
          i = e(i, o.action), o = o.next;
        } while (o !== a);
        wr(i, t.memoizedState) || (Ls = !0), t.memoizedState = i, null === t.baseQueue && (t.baseState = i), 
        n.lastRenderedState = i;
      }
      return [ i, r ];
    }
    function Uo() {}
    function Vo(e, t) {
      var n = To, r = Ho(), a = t(), i = !wr(r.memoizedState, a);
      if (i && (r.memoizedState = a, Ls = !0), r = r.queue, rs(Ko.bind(null, n, r, e), [ e ]), 
      r.getSnapshot !== t || i || null !== No && 1 & No.memoizedState.tag) {
        if (n.flags |= 2048, Xo(9, Zo.bind(null, n, r, a, t), void 0, null), null === Bl) throw Error(y(349));
        0 != (30 & Co) || qo(n, t, a);
      }
      return a;
    }
    function qo(e, t, n) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: n
      }, null === (t = To.updateQueue) ? (t = {
        lastEffect: null,
        stores: null
      }, To.updateQueue = t, t.stores = [ e ]) : null === (n = t.stores) ? t.stores = [ e ] : n.push(e);
    }
    function Zo(e, t, n, r) {
      t.value = n, t.getSnapshot = r, Yo(t) && Qo(e);
    }
    function Ko(e, t, n) {
      return n((function() {
        Yo(t) && Qo(e);
      }));
    }
    function Yo(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !wr(e, n);
      } catch (e) {
        return !0;
      }
    }
    function Qo(e) {
      var t = Bi(e, 1);
      null !== t && mu(t, e, 1, -1);
    }
    function Go(e) {
      var t = Fo();
      return "function" == typeof e && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $o,
        lastRenderedState: e
      }, t.queue = e, e = e.dispatch = ms.bind(null, To, e), [ t.memoizedState, e ];
    }
    function Xo(e, t, n, r) {
      return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
      }, null === (t = To.updateQueue) ? (t = {
        lastEffect: null,
        stores: null
      }, To.updateQueue = t, t.lastEffect = e.next = e) : null === (n = t.lastEffect) ? t.lastEffect = e.next = e : (r = n.next, 
      n.next = e, e.next = r, t.lastEffect = e), e;
    }
    function Jo() {
      return Ho().memoizedState;
    }
    function es(e, t, n, r) {
      var a = Fo();
      To.flags |= e, a.memoizedState = Xo(1 | t, n, void 0, void 0 === r ? null : r);
    }
    function ts(e, t, n, r) {
      var a = Ho();
      r = void 0 === r ? null : r;
      var i = void 0;
      if (null !== Oo) {
        var o = Oo.memoizedState;
        if (i = o.destroy, null !== r && Ro(r, o.deps)) return void (a.memoizedState = Xo(t, n, i, r));
      }
      To.flags |= e, a.memoizedState = Xo(1 | t, n, i, r);
    }
    function ns(e, t) {
      return es(8390656, 8, e, t);
    }
    function rs(e, t) {
      return ts(2048, 8, e, t);
    }
    function as(e, t) {
      return ts(4, 2, e, t);
    }
    function is(e, t) {
      return ts(4, 4, e, t);
    }
    function os(e, t) {
      return "function" == typeof t ? (e = e(), t(e), function() {
        t(null);
      }) : null != t ? (e = e(), t.current = e, function() {
        t.current = null;
      }) : void 0;
    }
    function ss(e, t, n) {
      return n = null != n ? n.concat([ e ]) : null, ts(4, 4, os.bind(null, t, e), n);
    }
    function ls() {}
    function us(e, t) {
      var n = Ho();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && Ro(t, r[1]) ? r[0] : (n.memoizedState = [ e, t ], 
      e);
    }
    function cs(e, t) {
      var n = Ho();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && Ro(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [ e, t ], 
      e);
    }
    function fs(e, t, n) {
      return 0 == (21 & Co) ? (e.baseState && (e.baseState = !1, Ls = !0), e.memoizedState = n) : (wr(n, t) || (n = Tt(), 
      To.lanes |= n, Yl |= n, e.baseState = !0), t);
    }
    function ds(e, t) {
      var n = It;
      It = 0 !== n && 4 > n ? n : 4, e(!0);
      var r = Ao.transition;
      Ao.transition = {};
      try {
        e(!1), t();
      } finally {
        It = n, Ao.transition = r;
      }
    }
    function ps() {
      return Ho().memoizedState;
    }
    function hs(e, t, n) {
      var r = hu(e);
      if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, gs(e)) vs(t, n); else if (null !== (n = $i(e, t, n, r))) {
        mu(n, e, r, pu()), ys(n, t, r);
      }
    }
    function ms(e, t, n) {
      var r = hu(e), a = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (gs(e)) vs(t, a); else {
        var i = e.alternate;
        if (0 === e.lanes && (null === i || 0 === i.lanes) && null !== (i = t.lastRenderedReducer)) try {
          var o = t.lastRenderedState, s = i(o, n);
          if (a.hasEagerState = !0, a.eagerState = s, wr(s, o)) {
            var l = t.interleaved;
            return null === l ? (a.next = a, Hi(t)) : (a.next = l.next, l.next = a), void (t.interleaved = a);
          }
        } catch (e) {}
        null !== (n = $i(e, t, a, r)) && (mu(n, e, r, a = pu()), ys(n, t, r));
      }
    }
    function gs(e) {
      var t = e.alternate;
      return e === To || null !== t && t === To;
    }
    function vs(e, t) {
      Io = Mo = !0;
      var n = e.pending;
      null === n ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
    }
    function ys(e, t, n) {
      if (0 != (4194240 & n)) {
        var r = t.lanes;
        n |= r &= e.pendingLanes, t.lanes = n, Mt(e, n);
      }
    }
    var bs = {
      readContext: Di,
      useCallback: Po,
      useContext: Po,
      useEffect: Po,
      useImperativeHandle: Po,
      useInsertionEffect: Po,
      useLayoutEffect: Po,
      useMemo: Po,
      useReducer: Po,
      useRef: Po,
      useState: Po,
      useDebugValue: Po,
      useDeferredValue: Po,
      useTransition: Po,
      useMutableSource: Po,
      useSyncExternalStore: Po,
      useId: Po,
      unstable_isNewReconciler: !1
    }, ws = {
      readContext: Di,
      useCallback: function(e, t) {
        return Fo().memoizedState = [ e, void 0 === t ? null : t ], e;
      },
      useContext: Di,
      useEffect: ns,
      useImperativeHandle: function(e, t, n) {
        return n = null != n ? n.concat([ e ]) : null, es(4194308, 4, os.bind(null, t, e), n);
      },
      useLayoutEffect: function(e, t) {
        return es(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        return es(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var n = Fo();
        return t = void 0 === t ? null : t, e = e(), n.memoizedState = [ e, t ], e;
      },
      useReducer: function(e, t, n) {
        var r = Fo();
        return t = void 0 !== n ? n(t) : t, r.memoizedState = r.baseState = t, e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t
        }, r.queue = e, e = e.dispatch = hs.bind(null, To, e), [ r.memoizedState, e ];
      },
      useRef: function(e) {
        return e = {
          current: e
        }, Fo().memoizedState = e;
      },
      useState: Go,
      useDebugValue: ls,
      useDeferredValue: function(e) {
        return Fo().memoizedState = e;
      },
      useTransition: function() {
        var e = Go(!1), t = e[0];
        return e = ds.bind(null, e[1]), Fo().memoizedState = e, [ t, e ];
      },
      useMutableSource: function() {},
      useSyncExternalStore: function(e, t, n) {
        var r = To, a = Fo();
        if (vi) {
          if (void 0 === n) throw Error(y(407));
          n = n();
        } else {
          if (n = t(), null === Bl) throw Error(y(349));
          0 != (30 & Co) || qo(r, t, n);
        }
        a.memoizedState = n;
        var i = {
          value: n,
          getSnapshot: t
        };
        return a.queue = i, ns(Ko.bind(null, r, i, e), [ e ]), r.flags |= 2048, Xo(9, Zo.bind(null, r, i, n, t), void 0, null), 
        n;
      },
      useId: function() {
        var e = Fo(), t = Bl.identifierPrefix;
        if (vi) {
          var n = ci;
          t = ":" + t + "R" + (n = (ui & ~(1 << 32 - bt(ui) - 1)).toString(32) + n), 0 < (n = Lo++) && (t += "H" + n.toString(32)), 
          t += ":";
        } else t = ":" + t + "r" + (n = jo++).toString(32) + ":";
        return e.memoizedState = t;
      },
      unstable_isNewReconciler: !1
    }, xs = {
      readContext: Di,
      useCallback: us,
      useContext: Di,
      useEffect: rs,
      useImperativeHandle: ss,
      useInsertionEffect: as,
      useLayoutEffect: is,
      useMemo: cs,
      useReducer: Bo,
      useRef: Jo,
      useState: function() {
        return Bo($o);
      },
      useDebugValue: ls,
      useDeferredValue: function(e) {
        return fs(Ho(), Oo.memoizedState, e);
      },
      useTransition: function() {
        return [ Bo($o)[0], Ho().memoizedState ];
      },
      useMutableSource: Uo,
      useSyncExternalStore: Vo,
      useId: ps,
      unstable_isNewReconciler: !1
    }, ks = {
      readContext: Di,
      useCallback: us,
      useContext: Di,
      useEffect: rs,
      useImperativeHandle: ss,
      useInsertionEffect: as,
      useLayoutEffect: is,
      useMemo: cs,
      useReducer: Wo,
      useRef: Jo,
      useState: function() {
        return Wo($o);
      },
      useDebugValue: ls,
      useDeferredValue: function(e) {
        var t = Ho();
        return null === Oo ? t.memoizedState = e : fs(t, Oo.memoizedState, e);
      },
      useTransition: function() {
        return [ Wo($o)[0], Ho().memoizedState ];
      },
      useMutableSource: Uo,
      useSyncExternalStore: Vo,
      useId: ps,
      unstable_isNewReconciler: !1
    };
    function _s(e, t) {
      try {
        var n = "", r = t;
        do {
          n += ee(r), r = r.return;
        } while (r);
        var a = n;
      } catch (e) {
        a = "\nError generating stack: " + e.message + "\n" + e.stack;
      }
      return {
        value: e,
        source: t,
        stack: a,
        digest: null
      };
    }
    function Es(e, t, n) {
      return {
        value: e,
        source: null,
        stack: null != n ? n : null,
        digest: null != t ? t : null
      };
    }
    function Ss(e, t) {
      try {
        console.error(t.value);
      } catch (e) {
        setTimeout((function() {
          throw e;
        }));
      }
    }
    var As = "function" == typeof WeakMap ? WeakMap : Map;
    function Cs(e, t, n) {
      (n = qi(-1, n)).tag = 3, n.payload = {
        element: null
      };
      var r = t.value;
      return n.callback = function() {
        ru || (ru = !0, au = r), Ss(0, t);
      }, n;
    }
    function Ts(e, t, n) {
      (n = qi(-1, n)).tag = 3;
      var r = e.type.getDerivedStateFromError;
      if ("function" == typeof r) {
        var a = t.value;
        n.payload = function() {
          return r(a);
        }, n.callback = function() {
          Ss(0, t);
        };
      }
      var i = e.stateNode;
      return null !== i && "function" == typeof i.componentDidCatch && (n.callback = function() {
        Ss(0, t), "function" != typeof r && (null === iu ? iu = new Set([ this ]) : iu.add(this));
        var e = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: null !== e ? e : ""
        });
      }), n;
    }
    function Os(e, t, n) {
      var r = e.pingCache;
      if (null === r) {
        r = e.pingCache = new As;
        var a = new Set;
        r.set(t, a);
      } else void 0 === (a = r.get(t)) && (a = new Set, r.set(t, a));
      a.has(n) || (a.add(n), e = Du.bind(null, e, t, n), t.then(e, e));
    }
    function Ns(e) {
      do {
        var t;
        if ((t = 13 === e.tag) && (t = null === (t = e.memoizedState) || null !== t.dehydrated), 
        t) return e;
        e = e.return;
      } while (null !== e);
      return null;
    }
    function Ms(e, t, n, r, a) {
      return 0 == (1 & e.mode) ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, 
      n.flags &= -52805, 1 === n.tag && (null === n.alternate ? n.tag = 17 : ((t = qi(-1, 1)).tag = 2, 
      Zi(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = a, e);
    }
    var Is = L.ReactCurrentOwner, Ls = !1;
    function js(e, t, n, r) {
      t.child = null === e ? co(t, null, n, r) : uo(t, e.child, n, r);
    }
    function Ps(e, t, n, r, a) {
      n = n.render;
      var i = t.ref;
      return zi(t, a), r = zo(e, t, n, r, i, a), n = Do(), null === e || Ls ? (vi && n && pi(t), 
      t.flags |= 1, js(e, t, r, a), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, 
      e.lanes &= ~a, rl(e, t, a));
    }
    function Rs(e, t, n, r, a) {
      if (null === e) {
        var i = n.type;
        return "function" != typeof i || Vu(i) || void 0 !== i.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = Zu(n.type, null, r, t, t.mode, a)).ref = t.ref, 
        e.return = t, t.child = e) : (t.tag = 15, t.type = i, zs(e, t, i, r, a));
      }
      if (i = e.child, 0 == (e.lanes & a)) {
        var o = i.memoizedProps;
        if ((n = null !== (n = n.compare) ? n : xr)(o, r) && e.ref === t.ref) return rl(e, t, a);
      }
      return t.flags |= 1, (e = qu(i, r)).ref = t.ref, e.return = t, t.child = e;
    }
    function zs(e, t, n, r, a) {
      if (null !== e) {
        var i = e.memoizedProps;
        if (xr(i, r) && e.ref === t.ref) {
          if (Ls = !1, t.pendingProps = r = i, 0 == (e.lanes & a)) return t.lanes = e.lanes, 
          rl(e, t, a);
          0 != (131072 & e.flags) && (Ls = !0);
        }
      }
      return Hs(e, t, n, r, a);
    }
    function Ds(e, t, n) {
      var r = t.pendingProps, a = r.children, i = null !== e ? e.memoizedState : null;
      if ("hidden" === r.mode) if (0 == (1 & t.mode)) t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, Fa(ql, Vl), Vl |= n; else {
        if (0 == (1073741824 & n)) return e = null !== i ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, 
        t.memoizedState = {
          baseLanes: e,
          cachePool: null,
          transitions: null
        }, t.updateQueue = null, Fa(ql, Vl), Vl |= e, null;
        t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        }, r = null !== i ? i.baseLanes : n, Fa(ql, Vl), Vl |= r;
      } else null !== i ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, Fa(ql, Vl), 
      Vl |= r;
      return js(e, t, a, n), t.child;
    }
    function Fs(e, t) {
      var n = t.ref;
      (null === e && null !== n || null !== e && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
    }
    function Hs(e, t, n, r, a) {
      var i = Va(n) ? Wa : $a.current;
      return i = Ua(t, i), zi(t, a), n = zo(e, t, n, r, i, a), r = Do(), null === e || Ls ? (vi && r && pi(t), 
      t.flags |= 1, js(e, t, n, a), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, 
      e.lanes &= ~a, rl(e, t, a));
    }
    function $s(e, t, n, r, a) {
      if (Va(n)) {
        var i = !0;
        Ya(t);
      } else i = !1;
      if (zi(t, a), null === t.stateNode) nl(e, t), no(t, n, r), ao(t, n, r, a), r = !0; else if (null === e) {
        var o = t.stateNode, s = t.memoizedProps;
        o.props = s;
        var l = o.context, u = n.contextType;
        "object" == typeof u && null !== u ? u = Di(u) : u = Ua(t, u = Va(n) ? Wa : $a.current);
        var c = n.getDerivedStateFromProps, f = "function" == typeof c || "function" == typeof o.getSnapshotBeforeUpdate;
        f || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (s !== r || l !== u) && ro(t, o, r, u), 
        Wi = !1;
        var d = t.memoizedState;
        o.state = d, Qi(t, r, o, a), l = t.memoizedState, s !== r || d !== l || Ba.current || Wi ? ("function" == typeof c && (Ji(t, n, c, r), 
        l = t.memoizedState), (s = Wi || to(t, n, s, r, d, l, u)) ? (f || "function" != typeof o.UNSAFE_componentWillMount && "function" != typeof o.componentWillMount || ("function" == typeof o.componentWillMount && o.componentWillMount(), 
        "function" == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount()), 
        "function" == typeof o.componentDidMount && (t.flags |= 4194308)) : ("function" == typeof o.componentDidMount && (t.flags |= 4194308), 
        t.memoizedProps = r, t.memoizedState = l), o.props = r, o.state = l, o.context = u, 
        r = s) : ("function" == typeof o.componentDidMount && (t.flags |= 4194308), r = !1);
      } else {
        o = t.stateNode, Vi(e, t), s = t.memoizedProps, u = t.type === t.elementType ? s : Oi(t.type, s), 
        o.props = u, f = t.pendingProps, d = o.context, "object" == typeof (l = n.contextType) && null !== l ? l = Di(l) : l = Ua(t, l = Va(n) ? Wa : $a.current);
        var p = n.getDerivedStateFromProps;
        (c = "function" == typeof p || "function" == typeof o.getSnapshotBeforeUpdate) || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (s !== f || d !== l) && ro(t, o, r, l), 
        Wi = !1, d = t.memoizedState, o.state = d, Qi(t, r, o, a);
        var h = t.memoizedState;
        s !== f || d !== h || Ba.current || Wi ? ("function" == typeof p && (Ji(t, n, p, r), 
        h = t.memoizedState), (u = Wi || to(t, n, u, r, d, h, l) || !1) ? (c || "function" != typeof o.UNSAFE_componentWillUpdate && "function" != typeof o.componentWillUpdate || ("function" == typeof o.componentWillUpdate && o.componentWillUpdate(r, h, l), 
        "function" == typeof o.UNSAFE_componentWillUpdate && o.UNSAFE_componentWillUpdate(r, h, l)), 
        "function" == typeof o.componentDidUpdate && (t.flags |= 4), "function" == typeof o.getSnapshotBeforeUpdate && (t.flags |= 1024)) : ("function" != typeof o.componentDidUpdate || s === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), 
        "function" != typeof o.getSnapshotBeforeUpdate || s === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), 
        t.memoizedProps = r, t.memoizedState = h), o.props = r, o.state = h, o.context = l, 
        r = u) : ("function" != typeof o.componentDidUpdate || s === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), 
        "function" != typeof o.getSnapshotBeforeUpdate || s === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), 
        r = !1);
      }
      return Bs(e, t, n, r, i, a);
    }
    function Bs(e, t, n, r, a, i) {
      Fs(e, t);
      var o = 0 != (128 & t.flags);
      if (!r && !o) return a && Qa(t, n, !1), rl(e, t, i);
      r = t.stateNode, Is.current = t;
      var s = o && "function" != typeof n.getDerivedStateFromError ? null : r.render();
      return t.flags |= 1, null !== e && o ? (t.child = uo(t, e.child, null, i), t.child = uo(t, null, s, i)) : js(e, t, s, i), 
      t.memoizedState = r.state, a && Qa(t, n, !0), t.child;
    }
    function Ws(e) {
      var t = e.stateNode;
      t.pendingContext ? Za(0, t.pendingContext, t.pendingContext !== t.context) : t.context && Za(0, t.context, !1), 
      vo(e, t.containerInfo);
    }
    function Us(e, t, n, r, a) {
      return Ai(), Ci(a), t.flags |= 256, js(e, t, n, r), t.child;
    }
    var Vs, qs, Zs, Ks = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0
    };
    function Ys(e) {
      return {
        baseLanes: e,
        cachePool: null,
        transitions: null
      };
    }
    function Qs(e, t, n) {
      var r, a = t.pendingProps, i = xo.current, o = !1, s = 0 != (128 & t.flags);
      if ((r = s) || (r = (null === e || null !== e.memoizedState) && 0 != (2 & i)), r ? (o = !0, 
      t.flags &= -129) : null !== e && null === e.memoizedState || (i |= 1), Fa(xo, 1 & i), 
      null === e) return ki(t), null !== (e = t.memoizedState) && null !== (e = e.dehydrated) ? (0 == (1 & t.mode) ? t.lanes = 1 : "$!" === e.data ? t.lanes = 8 : t.lanes = 1073741824, 
      null) : (s = a.children, e = a.fallback, o ? (a = t.mode, o = t.child, s = {
        mode: "hidden",
        children: s
      }, 0 == (1 & a) && null !== o ? (o.childLanes = 0, o.pendingProps = s) : o = Yu(s, a, 0, null), 
      e = Ku(e, a, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ys(n), 
      t.memoizedState = Ks, e) : Gs(t, s));
      if (null !== (i = e.memoizedState) && null !== (r = i.dehydrated)) return function(e, t, n, r, a, i, o) {
        if (n) return 256 & t.flags ? (t.flags &= -257, Xs(e, t, o, r = Es(Error(y(422))))) : null !== t.memoizedState ? (t.child = e.child, 
        t.flags |= 128, null) : (i = r.fallback, a = t.mode, r = Yu({
          mode: "visible",
          children: r.children
        }, a, 0, null), (i = Ku(i, a, o, null)).flags |= 2, r.return = t, i.return = t, 
        r.sibling = i, t.child = r, 0 != (1 & t.mode) && uo(t, e.child, null, o), t.child.memoizedState = Ys(o), 
        t.memoizedState = Ks, i);
        if (0 == (1 & t.mode)) return Xs(e, t, o, null);
        if ("$!" === a.data) {
          if (r = a.nextSibling && a.nextSibling.dataset) var s = r.dgst;
          return r = s, Xs(e, t, o, r = Es(i = Error(y(419)), r, void 0));
        }
        if (s = 0 != (o & e.childLanes), Ls || s) {
          if (null !== (r = Bl)) {
            switch (o & -o) {
             case 4:
              a = 2;
              break;

             case 16:
              a = 8;
              break;

             case 64:
             case 128:
             case 256:
             case 512:
             case 1024:
             case 2048:
             case 4096:
             case 8192:
             case 16384:
             case 32768:
             case 65536:
             case 131072:
             case 262144:
             case 524288:
             case 1048576:
             case 2097152:
             case 4194304:
             case 8388608:
             case 16777216:
             case 33554432:
             case 67108864:
              a = 32;
              break;

             case 536870912:
              a = 268435456;
              break;

             default:
              a = 0;
            }
            0 !== (a = 0 != (a & (r.suspendedLanes | o)) ? 0 : a) && a !== i.retryLane && (i.retryLane = a, 
            Bi(e, a), mu(r, e, a, -1));
          }
          return Tu(), Xs(e, t, o, r = Es(Error(y(421))));
        }
        return "$?" === a.data ? (t.flags |= 128, t.child = e.child, t = Hu.bind(null, e), 
        a._reactRetry = t, null) : (e = i.treeContext, gi = ka(a.nextSibling), mi = t, vi = !0, 
        yi = null, null !== e && (oi[si++] = ui, oi[si++] = ci, oi[si++] = li, ui = e.id, 
        ci = e.overflow, li = t), t = Gs(t, r.children), t.flags |= 4096, t);
      }(e, t, s, a, r, i, n);
      if (o) {
        o = a.fallback, s = t.mode, r = (i = e.child).sibling;
        var l = {
          mode: "hidden",
          children: a.children
        };
        return 0 == (1 & s) && t.child !== i ? ((a = t.child).childLanes = 0, a.pendingProps = l, 
        t.deletions = null) : (a = qu(i, l)).subtreeFlags = 14680064 & i.subtreeFlags, null !== r ? o = qu(r, o) : (o = Ku(o, s, n, null)).flags |= 2, 
        o.return = t, a.return = t, a.sibling = o, t.child = a, a = o, o = t.child, s = null === (s = e.child.memoizedState) ? Ys(n) : {
          baseLanes: s.baseLanes | n,
          cachePool: null,
          transitions: s.transitions
        }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = Ks, 
        a;
      }
      return e = (o = e.child).sibling, a = qu(o, {
        mode: "visible",
        children: a.children
      }), 0 == (1 & t.mode) && (a.lanes = n), a.return = t, a.sibling = null, null !== e && (null === (n = t.deletions) ? (t.deletions = [ e ], 
      t.flags |= 16) : n.push(e)), t.child = a, t.memoizedState = null, a;
    }
    function Gs(e, t) {
      return (t = Yu({
        mode: "visible",
        children: t
      }, e.mode, 0, null)).return = e, e.child = t;
    }
    function Xs(e, t, n, r) {
      return null !== r && Ci(r), uo(t, e.child, null, n), (e = Gs(t, t.pendingProps.children)).flags |= 2, 
      t.memoizedState = null, e;
    }
    function Js(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      null !== r && (r.lanes |= t), Ri(e.return, t, n);
    }
    function el(e, t, n, r, a) {
      var i = e.memoizedState;
      null === i ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: a
      } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, 
      i.tail = n, i.tailMode = a);
    }
    function tl(e, t, n) {
      var r = t.pendingProps, a = r.revealOrder, i = r.tail;
      if (js(e, t, r.children, n), 0 != (2 & (r = xo.current))) r = 1 & r | 2, t.flags |= 128; else {
        if (null !== e && 0 != (128 & e.flags)) e: for (e = t.child; null !== e; ) {
          if (13 === e.tag) null !== e.memoizedState && Js(e, n, t); else if (19 === e.tag) Js(e, n, t); else if (null !== e.child) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === t) break e;
          for (;null === e.sibling; ) {
            if (null === e.return || e.return === t) break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
        r &= 1;
      }
      if (Fa(xo, r), 0 == (1 & t.mode)) t.memoizedState = null; else switch (a) {
       case "forwards":
        for (n = t.child, a = null; null !== n; ) null !== (e = n.alternate) && null === ko(e) && (a = n), 
        n = n.sibling;
        null === (n = a) ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), 
        el(t, !1, a, n, i);
        break;

       case "backwards":
        for (n = null, a = t.child, t.child = null; null !== a; ) {
          if (null !== (e = a.alternate) && null === ko(e)) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = n, n = a, a = e;
        }
        el(t, !0, n, null, i);
        break;

       case "together":
        el(t, !1, null, null, void 0);
        break;

       default:
        t.memoizedState = null;
      }
      return t.child;
    }
    function nl(e, t) {
      0 == (1 & t.mode) && null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2);
    }
    function rl(e, t, n) {
      if (null !== e && (t.dependencies = e.dependencies), Yl |= t.lanes, 0 == (n & t.childLanes)) return null;
      if (null !== e && t.child !== e.child) throw Error(y(153));
      if (null !== t.child) {
        for (n = qu(e = t.child, e.pendingProps), t.child = n, n.return = t; null !== e.sibling; ) e = e.sibling, 
        (n = n.sibling = qu(e, e.pendingProps)).return = t;
        n.sibling = null;
      }
      return t.child;
    }
    function al(e, t) {
      if (!vi) switch (e.tailMode) {
       case "hidden":
        t = e.tail;
        for (var n = null; null !== t; ) null !== t.alternate && (n = t), t = t.sibling;
        null === n ? e.tail = null : n.sibling = null;
        break;

       case "collapsed":
        n = e.tail;
        for (var r = null; null !== n; ) null !== n.alternate && (r = n), n = n.sibling;
        null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
    }
    function il(e) {
      var t = null !== e.alternate && e.alternate.child === e.child, n = 0, r = 0;
      if (t) for (var a = e.child; null !== a; ) n |= a.lanes | a.childLanes, r |= 14680064 & a.subtreeFlags, 
      r |= 14680064 & a.flags, a.return = e, a = a.sibling; else for (a = e.child; null !== a; ) n |= a.lanes | a.childLanes, 
      r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
      return e.subtreeFlags |= r, e.childLanes = n, t;
    }
    function ol(e, t, n) {
      var r = t.pendingProps;
      switch (hi(t), t.tag) {
       case 2:
       case 16:
       case 15:
       case 0:
       case 11:
       case 7:
       case 8:
       case 12:
       case 9:
       case 14:
        return il(t), null;

       case 1:
       case 17:
        return Va(t.type) && qa(), il(t), null;

       case 3:
        return r = t.stateNode, yo(), Da(Ba), Da($a), Eo(), r.pendingContext && (r.context = r.pendingContext, 
        r.pendingContext = null), null !== e && null !== e.child || (Ei(t) ? t.flags |= 4 : null === e || e.memoizedState.isDehydrated && 0 == (256 & t.flags) || (t.flags |= 1024, 
        null !== yi && (bu(yi), yi = null))), il(t), null;

       case 5:
        wo(t);
        var a = go(mo.current);
        if (n = t.type, null !== e && null != t.stateNode) qs(e, t, n, r), e.ref !== t.ref && (t.flags |= 512, 
        t.flags |= 2097152); else {
          if (!r) {
            if (null === t.stateNode) throw Error(y(166));
            return il(t), null;
          }
          if (e = go(po.current), Ei(t)) {
            r = t.stateNode, n = t.type;
            var i = t.memoizedProps;
            switch (r[Sa] = t, r[Aa] = i, e = 0 != (1 & t.mode), n) {
             case "dialog":
              Xr("cancel", r), Xr("close", r);
              break;

             case "iframe":
             case "object":
             case "embed":
              Xr("load", r);
              break;

             case "video":
             case "audio":
              for (a = 0; a < Kr.length; a++) Xr(Kr[a], r);
              break;

             case "source":
              Xr("error", r);
              break;

             case "img":
             case "image":
             case "link":
              Xr("error", r), Xr("load", r);
              break;

             case "details":
              Xr("toggle", r);
              break;

             case "input":
              ue(r, i), Xr("invalid", r);
              break;

             case "select":
              r._wrapperState = {
                wasMultiple: !!i.multiple
              }, Xr("invalid", r);
              break;

             case "textarea":
              ve(r, i), Xr("invalid", r);
            }
            for (var o in Me(n, i), a = null, i) if (i.hasOwnProperty(o)) {
              var s = i[o];
              "children" === o ? "string" == typeof s ? r.textContent !== s && (!0 !== i.suppressHydrationWarning && fa(r.textContent, s, e), 
              a = [ "children", s ]) : "number" == typeof s && r.textContent !== "" + s && (!0 !== i.suppressHydrationWarning && fa(r.textContent, s, e), 
              a = [ "children", "" + s ]) : w.hasOwnProperty(o) && null != s && "onScroll" === o && Xr("scroll", r);
            }
            switch (n) {
             case "input":
              ie(r), de(r, i, !0);
              break;

             case "textarea":
              ie(r), be(r);
              break;

             case "select":
             case "option":
              break;

             default:
              "function" == typeof i.onClick && (r.onclick = da);
            }
            r = a, t.updateQueue = r, null !== r && (t.flags |= 4);
          } else {
            o = 9 === a.nodeType ? a : a.ownerDocument, "http://www.w3.org/1999/xhtml" === e && (e = we(n)), 
            "http://www.w3.org/1999/xhtml" === e ? "script" === n ? ((e = o.createElement("div")).innerHTML = "<script><\/script>", 
            e = e.removeChild(e.firstChild)) : "string" == typeof r.is ? e = o.createElement(n, {
              is: r.is
            }) : (e = o.createElement(n), "select" === n && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), 
            e[Sa] = t, e[Aa] = r, Vs(e, t), t.stateNode = e;
            e: {
              switch (o = Ie(n, r), n) {
               case "dialog":
                Xr("cancel", e), Xr("close", e), a = r;
                break;

               case "iframe":
               case "object":
               case "embed":
                Xr("load", e), a = r;
                break;

               case "video":
               case "audio":
                for (a = 0; a < Kr.length; a++) Xr(Kr[a], e);
                a = r;
                break;

               case "source":
                Xr("error", e), a = r;
                break;

               case "img":
               case "image":
               case "link":
                Xr("error", e), Xr("load", e), a = r;
                break;

               case "details":
                Xr("toggle", e), a = r;
                break;

               case "input":
                ue(e, r), a = le(e, r), Xr("invalid", e);
                break;

               case "option":
               default:
                a = r;
                break;

               case "select":
                e._wrapperState = {
                  wasMultiple: !!r.multiple
                }, a = Q({}, r, {
                  value: void 0
                }), Xr("invalid", e);
                break;

               case "textarea":
                ve(e, r), a = ge(e, r), Xr("invalid", e);
              }
              for (i in Me(n, a), s = a) if (s.hasOwnProperty(i)) {
                var l = s[i];
                "style" === i ? Oe(e, l) : "dangerouslySetInnerHTML" === i ? null != (l = l ? l.__html : void 0) && Ee(e, l) : "children" === i ? "string" == typeof l ? ("textarea" !== n || "" !== l) && Se(e, l) : "number" == typeof l && Se(e, "" + l) : "suppressContentEditableWarning" !== i && "suppressHydrationWarning" !== i && "autoFocus" !== i && (w.hasOwnProperty(i) ? null != l && "onScroll" === i && Xr("scroll", e) : null != l && I(e, i, l, o));
              }
              switch (n) {
               case "input":
                ie(e), de(e, r, !1);
                break;

               case "textarea":
                ie(e), be(e);
                break;

               case "option":
                null != r.value && e.setAttribute("value", "" + re(r.value));
                break;

               case "select":
                e.multiple = !!r.multiple, null != (i = r.value) ? me(e, !!r.multiple, i, !1) : null != r.defaultValue && me(e, !!r.multiple, r.defaultValue, !0);
                break;

               default:
                "function" == typeof a.onClick && (e.onclick = da);
              }
              switch (n) {
               case "button":
               case "input":
               case "select":
               case "textarea":
                r = !!r.autoFocus;
                break e;

               case "img":
                r = !0;
                break e;

               default:
                r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          null !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        }
        return il(t), null;

       case 6:
        if (e && null != t.stateNode) Zs(0, t, e.memoizedProps, r); else {
          if ("string" != typeof r && null === t.stateNode) throw Error(y(166));
          if (n = go(mo.current), go(po.current), Ei(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[Sa] = t, (i = r.nodeValue !== n) && null !== (e = mi)) switch (e.tag) {
             case 3:
              fa(r.nodeValue, n, 0 != (1 & e.mode));
              break;

             case 5:
              !0 !== e.memoizedProps.suppressHydrationWarning && fa(r.nodeValue, n, 0 != (1 & e.mode));
            }
            i && (t.flags |= 4);
          } else (r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[Sa] = t, 
          t.stateNode = r;
        }
        return il(t), null;

       case 13:
        if (Da(xo), r = t.memoizedState, null === e || null !== e.memoizedState && null !== e.memoizedState.dehydrated) {
          if (vi && null !== gi && 0 != (1 & t.mode) && 0 == (128 & t.flags)) Si(), Ai(), 
          t.flags |= 98560, i = !1; else if (i = Ei(t), null !== r && null !== r.dehydrated) {
            if (null === e) {
              if (!i) throw Error(y(318));
              if (!(i = null !== (i = t.memoizedState) ? i.dehydrated : null)) throw Error(y(317));
              i[Sa] = t;
            } else Ai(), 0 == (128 & t.flags) && (t.memoizedState = null), t.flags |= 4;
            il(t), i = !1;
          } else null !== yi && (bu(yi), yi = null), i = !0;
          if (!i) return 65536 & t.flags ? t : null;
        }
        return 0 != (128 & t.flags) ? (t.lanes = n, t) : ((r = null !== r) !== (null !== e && null !== e.memoizedState) && r && (t.child.flags |= 8192, 
        0 != (1 & t.mode) && (null === e || 0 != (1 & xo.current) ? 0 === Zl && (Zl = 3) : Tu())), 
        null !== t.updateQueue && (t.flags |= 4), il(t), null);

       case 4:
        return yo(), null === e && ta(t.stateNode.containerInfo), il(t), null;

       case 10:
        return Pi(t.type._context), il(t), null;

       case 19:
        if (Da(xo), null === (i = t.memoizedState)) return il(t), null;
        if (r = 0 != (128 & t.flags), null === (o = i.rendering)) if (r) al(i, !1); else {
          if (0 !== Zl || null !== e && 0 != (128 & e.flags)) for (e = t.child; null !== e; ) {
            if (null !== (o = ko(e))) {
              for (t.flags |= 128, al(i, !1), null !== (r = o.updateQueue) && (t.updateQueue = r, 
              t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; null !== n; ) e = r, (i = n).flags &= 14680066, 
              null === (o = i.alternate) ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, 
              i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, 
              i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, 
              i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, 
              i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = null === e ? null : {
                lanes: e.lanes,
                firstContext: e.firstContext
              }), n = n.sibling;
              return Fa(xo, 1 & xo.current | 2), t.child;
            }
            e = e.sibling;
          }
          null !== i.tail && ct() > tu && (t.flags |= 128, r = !0, al(i, !1), t.lanes = 4194304);
        } else {
          if (!r) if (null !== (e = ko(o))) {
            if (t.flags |= 128, r = !0, null !== (n = e.updateQueue) && (t.updateQueue = n, 
            t.flags |= 4), al(i, !0), null === i.tail && "hidden" === i.tailMode && !o.alternate && !vi) return il(t), 
            null;
          } else 2 * ct() - i.renderingStartTime > tu && 1073741824 !== n && (t.flags |= 128, 
          r = !0, al(i, !1), t.lanes = 4194304);
          i.isBackwards ? (o.sibling = t.child, t.child = o) : (null !== (n = i.last) ? n.sibling = o : t.child = o, 
          i.last = o);
        }
        return null !== i.tail ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = ct(), 
        t.sibling = null, n = xo.current, Fa(xo, r ? 1 & n | 2 : 1 & n), t) : (il(t), null);

       case 22:
       case 23:
        return Eu(), r = null !== t.memoizedState, null !== e && null !== e.memoizedState !== r && (t.flags |= 8192), 
        r && 0 != (1 & t.mode) ? 0 != (1073741824 & Vl) && (il(t), 6 & t.subtreeFlags && (t.flags |= 8192)) : il(t), 
        null;

       case 24:
       case 25:
        return null;
      }
      throw Error(y(156, t.tag));
    }
    function sl(e, t) {
      switch (hi(t), t.tag) {
       case 1:
        return Va(t.type) && qa(), 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, 
        t) : null;

       case 3:
        return yo(), Da(Ba), Da($a), Eo(), 0 != (65536 & (e = t.flags)) && 0 == (128 & e) ? (t.flags = -65537 & e | 128, 
        t) : null;

       case 5:
        return wo(t), null;

       case 13:
        if (Da(xo), null !== (e = t.memoizedState) && null !== e.dehydrated) {
          if (null === t.alternate) throw Error(y(340));
          Ai();
        }
        return 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;

       case 19:
        return Da(xo), null;

       case 4:
        return yo(), null;

       case 10:
        return Pi(t.type._context), null;

       case 22:
       case 23:
        return Eu(), null;

       default:
        return null;
      }
    }
    Vs = function(e, t) {
      for (var n = t.child; null !== n; ) {
        if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode); else if (4 !== n.tag && null !== n.child) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === t) break;
        for (;null === n.sibling; ) {
          if (null === n.return || n.return === t) return;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }, qs = function(e, t, n, r) {
      var a = e.memoizedProps;
      if (a !== r) {
        e = t.stateNode, go(po.current);
        var i, o = null;
        switch (n) {
         case "input":
          a = le(e, a), r = le(e, r), o = [];
          break;

         case "select":
          a = Q({}, a, {
            value: void 0
          }), r = Q({}, r, {
            value: void 0
          }), o = [];
          break;

         case "textarea":
          a = ge(e, a), r = ge(e, r), o = [];
          break;

         default:
          "function" != typeof a.onClick && "function" == typeof r.onClick && (e.onclick = da);
        }
        for (u in Me(n, r), n = null, a) if (!r.hasOwnProperty(u) && a.hasOwnProperty(u) && null != a[u]) if ("style" === u) {
          var s = a[u];
          for (i in s) s.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
        } else "dangerouslySetInnerHTML" !== u && "children" !== u && "suppressContentEditableWarning" !== u && "suppressHydrationWarning" !== u && "autoFocus" !== u && (w.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
        for (u in r) {
          var l = r[u];
          if (s = null != a ? a[u] : void 0, r.hasOwnProperty(u) && l !== s && (null != l || null != s)) if ("style" === u) if (s) {
            for (i in s) !s.hasOwnProperty(i) || l && l.hasOwnProperty(i) || (n || (n = {}), 
            n[i] = "");
            for (i in l) l.hasOwnProperty(i) && s[i] !== l[i] && (n || (n = {}), n[i] = l[i]);
          } else n || (o || (o = []), o.push(u, n)), n = l; else "dangerouslySetInnerHTML" === u ? (l = l ? l.__html : void 0, 
          s = s ? s.__html : void 0, null != l && s !== l && (o = o || []).push(u, l)) : "children" === u ? "string" != typeof l && "number" != typeof l || (o = o || []).push(u, "" + l) : "suppressContentEditableWarning" !== u && "suppressHydrationWarning" !== u && (w.hasOwnProperty(u) ? (null != l && "onScroll" === u && Xr("scroll", e), 
          o || s === l || (o = [])) : (o = o || []).push(u, l));
        }
        n && (o = o || []).push("style", n);
        var u = o;
        (t.updateQueue = u) && (t.flags |= 4);
      }
    }, Zs = function(e, t, n, r) {
      n !== r && (t.flags |= 4);
    };
    var ll = !1, ul = !1, cl = "function" == typeof WeakSet ? WeakSet : Set, fl = null;
    function dl(e, t) {
      var n = e.ref;
      if (null !== n) if ("function" == typeof n) try {
        n(null);
      } catch (n) {
        zu(e, t, n);
      } else n.current = null;
    }
    function pl(e, t, n) {
      try {
        n();
      } catch (n) {
        zu(e, t, n);
      }
    }
    var hl = !1;
    function ml(e, t, n) {
      var r = t.updateQueue;
      if (null !== (r = null !== r ? r.lastEffect : null)) {
        var a = r = r.next;
        do {
          if ((a.tag & e) === e) {
            var i = a.destroy;
            a.destroy = void 0, void 0 !== i && pl(t, n, i);
          }
          a = a.next;
        } while (a !== r);
      }
    }
    function gl(e, t) {
      if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
        var n = t = t.next;
        do {
          if ((n.tag & e) === e) {
            var r = n.create;
            n.destroy = r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function vl(e) {
      var t = e.ref;
      if (null !== t) {
        var n = e.stateNode;
        e.tag, e = n, "function" == typeof t ? t(e) : t.current = e;
      }
    }
    function yl(e) {
      var t = e.alternate;
      null !== t && (e.alternate = null, yl(t)), e.child = null, e.deletions = null, e.sibling = null, 
      5 === e.tag && (null !== (t = e.stateNode) && (delete t[Sa], delete t[Aa], delete t[Ta], 
      delete t[Oa], delete t[Na])), e.stateNode = null, e.return = null, e.dependencies = null, 
      e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, 
      e.updateQueue = null;
    }
    function bl(e) {
      return 5 === e.tag || 3 === e.tag || 4 === e.tag;
    }
    function wl(e) {
      e: for (;;) {
        for (;null === e.sibling; ) {
          if (null === e.return || bl(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; 5 !== e.tag && 6 !== e.tag && 18 !== e.tag; ) {
          if (2 & e.flags) continue e;
          if (null === e.child || 4 === e.tag) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(2 & e.flags)) return e.stateNode;
      }
    }
    function xl(e, t, n) {
      var r = e.tag;
      if (5 === r || 6 === r) e = e.stateNode, t ? 8 === n.nodeType ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e), 
      null != (n = n._reactRootContainer) || null !== t.onclick || (t.onclick = da)); else if (4 !== r && null !== (e = e.child)) for (xl(e, t, n), 
      e = e.sibling; null !== e; ) xl(e, t, n), e = e.sibling;
    }
    function kl(e, t, n) {
      var r = e.tag;
      if (5 === r || 6 === r) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e); else if (4 !== r && null !== (e = e.child)) for (kl(e, t, n), 
      e = e.sibling; null !== e; ) kl(e, t, n), e = e.sibling;
    }
    var _l = null, El = !1;
    function Sl(e, t, n) {
      for (n = n.child; null !== n; ) Al(e, t, n), n = n.sibling;
    }
    function Al(e, t, n) {
      if (yt && "function" == typeof yt.onCommitFiberUnmount) try {
        yt.onCommitFiberUnmount(vt, n);
      } catch (e) {}
      switch (n.tag) {
       case 5:
        ul || dl(n, t);

       case 6:
        var r = _l, a = El;
        _l = null, Sl(e, t, n), El = a, null !== (_l = r) && (El ? (e = _l, n = n.stateNode, 
        8 === e.nodeType ? e.parentNode.removeChild(n) : e.removeChild(n)) : _l.removeChild(n.stateNode));
        break;

       case 18:
        null !== _l && (El ? (e = _l, n = n.stateNode, 8 === e.nodeType ? xa(e.parentNode, n) : 1 === e.nodeType && xa(e, n), 
        tn(e)) : xa(_l, n.stateNode));
        break;

       case 4:
        r = _l, a = El, _l = n.stateNode.containerInfo, El = !0, Sl(e, t, n), _l = r, El = a;
        break;

       case 0:
       case 11:
       case 14:
       case 15:
        if (!ul && (null !== (r = n.updateQueue) && null !== (r = r.lastEffect))) {
          a = r = r.next;
          do {
            var i = a, o = i.destroy;
            i = i.tag, void 0 !== o && (0 != (2 & i) || 0 != (4 & i)) && pl(n, t, o), a = a.next;
          } while (a !== r);
        }
        Sl(e, t, n);
        break;

       case 1:
        if (!ul && (dl(n, t), "function" == typeof (r = n.stateNode).componentWillUnmount)) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (e) {
          zu(n, t, e);
        }
        Sl(e, t, n);
        break;

       case 21:
        Sl(e, t, n);
        break;

       case 22:
        1 & n.mode ? (ul = (r = ul) || null !== n.memoizedState, Sl(e, t, n), ul = r) : Sl(e, t, n);
        break;

       default:
        Sl(e, t, n);
      }
    }
    function Cl(e) {
      var t = e.updateQueue;
      if (null !== t) {
        e.updateQueue = null;
        var n = e.stateNode;
        null === n && (n = e.stateNode = new cl), t.forEach((function(t) {
          var r = $u.bind(null, e, t);
          n.has(t) || (n.add(t), t.then(r, r));
        }));
      }
    }
    function Tl(e, t) {
      var n = t.deletions;
      if (null !== n) for (var r = 0; r < n.length; r++) {
        var a = n[r];
        try {
          var i = e, o = t, s = o;
          e: for (;null !== s; ) {
            switch (s.tag) {
             case 5:
              _l = s.stateNode, El = !1;
              break e;

             case 3:
             case 4:
              _l = s.stateNode.containerInfo, El = !0;
              break e;
            }
            s = s.return;
          }
          if (null === _l) throw Error(y(160));
          Al(i, o, a), _l = null, El = !1;
          var l = a.alternate;
          null !== l && (l.return = null), a.return = null;
        } catch (e) {
          zu(a, t, e);
        }
      }
      if (12854 & t.subtreeFlags) for (t = t.child; null !== t; ) Ol(t, e), t = t.sibling;
    }
    function Ol(e, t) {
      var n = e.alternate, r = e.flags;
      switch (e.tag) {
       case 0:
       case 11:
       case 14:
       case 15:
        if (Tl(t, e), Nl(e), 4 & r) {
          try {
            ml(3, e, e.return), gl(3, e);
          } catch (t) {
            zu(e, e.return, t);
          }
          try {
            ml(5, e, e.return);
          } catch (t) {
            zu(e, e.return, t);
          }
        }
        break;

       case 1:
        Tl(t, e), Nl(e), 512 & r && null !== n && dl(n, n.return);
        break;

       case 5:
        if (Tl(t, e), Nl(e), 512 & r && null !== n && dl(n, n.return), 32 & e.flags) {
          var a = e.stateNode;
          try {
            Se(a, "");
          } catch (t) {
            zu(e, e.return, t);
          }
        }
        if (4 & r && null != (a = e.stateNode)) {
          var i = e.memoizedProps, o = null !== n ? n.memoizedProps : i, s = e.type, l = e.updateQueue;
          if (e.updateQueue = null, null !== l) try {
            "input" === s && "radio" === i.type && null != i.name && ce(a, i), Ie(s, o);
            var u = Ie(s, i);
            for (o = 0; o < l.length; o += 2) {
              var c = l[o], f = l[o + 1];
              "style" === c ? Oe(a, f) : "dangerouslySetInnerHTML" === c ? Ee(a, f) : "children" === c ? Se(a, f) : I(a, c, f, u);
            }
            switch (s) {
             case "input":
              fe(a, i);
              break;

             case "textarea":
              ye(a, i);
              break;

             case "select":
              var d = a._wrapperState.wasMultiple;
              a._wrapperState.wasMultiple = !!i.multiple;
              var p = i.value;
              null != p ? me(a, !!i.multiple, p, !1) : d !== !!i.multiple && (null != i.defaultValue ? me(a, !!i.multiple, i.defaultValue, !0) : me(a, !!i.multiple, i.multiple ? [] : "", !1));
            }
            a[Aa] = i;
          } catch (t) {
            zu(e, e.return, t);
          }
        }
        break;

       case 6:
        if (Tl(t, e), Nl(e), 4 & r) {
          if (null === e.stateNode) throw Error(y(162));
          a = e.stateNode, i = e.memoizedProps;
          try {
            a.nodeValue = i;
          } catch (t) {
            zu(e, e.return, t);
          }
        }
        break;

       case 3:
        if (Tl(t, e), Nl(e), 4 & r && null !== n && n.memoizedState.isDehydrated) try {
          tn(t.containerInfo);
        } catch (t) {
          zu(e, e.return, t);
        }
        break;

       case 4:
       default:
        Tl(t, e), Nl(e);
        break;

       case 13:
        Tl(t, e), Nl(e), 8192 & (a = e.child).flags && (i = null !== a.memoizedState, a.stateNode.isHidden = i, 
        !i || null !== a.alternate && null !== a.alternate.memoizedState || (eu = ct())), 
        4 & r && Cl(e);
        break;

       case 22:
        if (c = null !== n && null !== n.memoizedState, 1 & e.mode ? (ul = (u = ul) || c, 
        Tl(t, e), ul = u) : Tl(t, e), Nl(e), 8192 & r) {
          if (u = null !== e.memoizedState, (e.stateNode.isHidden = u) && !c && 0 != (1 & e.mode)) for (fl = e, 
          c = e.child; null !== c; ) {
            for (f = fl = c; null !== fl; ) {
              switch (p = (d = fl).child, d.tag) {
               case 0:
               case 11:
               case 14:
               case 15:
                ml(4, d, d.return);
                break;

               case 1:
                dl(d, d.return);
                var h = d.stateNode;
                if ("function" == typeof h.componentWillUnmount) {
                  r = d, n = d.return;
                  try {
                    t = r, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
                  } catch (e) {
                    zu(r, n, e);
                  }
                }
                break;

               case 5:
                dl(d, d.return);
                break;

               case 22:
                if (null !== d.memoizedState) {
                  jl(f);
                  continue;
                }
              }
              null !== p ? (p.return = d, fl = p) : jl(f);
            }
            c = c.sibling;
          }
          e: for (c = null, f = e; ;) {
            if (5 === f.tag) {
              if (null === c) {
                c = f;
                try {
                  a = f.stateNode, u ? "function" == typeof (i = a.style).setProperty ? i.setProperty("display", "none", "important") : i.display = "none" : (s = f.stateNode, 
                  o = null != (l = f.memoizedProps.style) && l.hasOwnProperty("display") ? l.display : null, 
                  s.style.display = Te("display", o));
                } catch (t) {
                  zu(e, e.return, t);
                }
              }
            } else if (6 === f.tag) {
              if (null === c) try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (t) {
                zu(e, e.return, t);
              }
            } else if ((22 !== f.tag && 23 !== f.tag || null === f.memoizedState || f === e) && null !== f.child) {
              f.child.return = f, f = f.child;
              continue;
            }
            if (f === e) break e;
            for (;null === f.sibling; ) {
              if (null === f.return || f.return === e) break e;
              c === f && (c = null), f = f.return;
            }
            c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
          }
        }
        break;

       case 19:
        Tl(t, e), Nl(e), 4 & r && Cl(e);

       case 21:
      }
    }
    function Nl(e) {
      var t = e.flags;
      if (2 & t) {
        try {
          e: {
            for (var n = e.return; null !== n; ) {
              if (bl(n)) {
                var r = n;
                break e;
              }
              n = n.return;
            }
            throw Error(y(160));
          }
          switch (r.tag) {
           case 5:
            var a = r.stateNode;
            32 & r.flags && (Se(a, ""), r.flags &= -33), kl(e, wl(e), a);
            break;

           case 3:
           case 4:
            var i = r.stateNode.containerInfo;
            xl(e, wl(e), i);
            break;

           default:
            throw Error(y(161));
          }
        } catch (t) {
          zu(e, e.return, t);
        }
        e.flags &= -3;
      }
      4096 & t && (e.flags &= -4097);
    }
    function Ml(e, t, n) {
      fl = e, Il(e, t, n);
    }
    function Il(e, t, n) {
      for (var r = 0 != (1 & e.mode); null !== fl; ) {
        var a = fl, i = a.child;
        if (22 === a.tag && r) {
          var o = null !== a.memoizedState || ll;
          if (!o) {
            var s = a.alternate, l = null !== s && null !== s.memoizedState || ul;
            s = ll;
            var u = ul;
            if (ll = o, (ul = l) && !u) for (fl = a; null !== fl; ) l = (o = fl).child, 22 === o.tag && null !== o.memoizedState ? Pl(a) : null !== l ? (l.return = o, 
            fl = l) : Pl(a);
            for (;null !== i; ) fl = i, Il(i, t, n), i = i.sibling;
            fl = a, ll = s, ul = u;
          }
          Ll(e);
        } else 0 != (8772 & a.subtreeFlags) && null !== i ? (i.return = a, fl = i) : Ll(e);
      }
    }
    function Ll(e) {
      for (;null !== fl; ) {
        var t = fl;
        if (0 != (8772 & t.flags)) {
          var n = t.alternate;
          try {
            if (0 != (8772 & t.flags)) switch (t.tag) {
             case 0:
             case 11:
             case 15:
              ul || gl(5, t);
              break;

             case 1:
              var r = t.stateNode;
              if (4 & t.flags && !ul) if (null === n) r.componentDidMount(); else {
                var a = t.elementType === t.type ? n.memoizedProps : Oi(t.type, n.memoizedProps);
                r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var i = t.updateQueue;
              null !== i && Gi(t, i, r);
              break;

             case 3:
              var o = t.updateQueue;
              if (null !== o) {
                if (n = null, null !== t.child) switch (t.child.tag) {
                 case 5:
                 case 1:
                  n = t.child.stateNode;
                }
                Gi(t, o, n);
              }
              break;

             case 5:
              var s = t.stateNode;
              if (null === n && 4 & t.flags) {
                n = s;
                var l = t.memoizedProps;
                switch (t.type) {
                 case "button":
                 case "input":
                 case "select":
                 case "textarea":
                  l.autoFocus && n.focus();
                  break;

                 case "img":
                  l.src && (n.src = l.src);
                }
              }
              break;

             case 6:
             case 4:
             case 12:
             case 19:
             case 17:
             case 21:
             case 22:
             case 23:
             case 25:
              break;

             case 13:
              if (null === t.memoizedState) {
                var u = t.alternate;
                if (null !== u) {
                  var c = u.memoizedState;
                  if (null !== c) {
                    var f = c.dehydrated;
                    null !== f && tn(f);
                  }
                }
              }
              break;

             default:
              throw Error(y(163));
            }
            ul || 512 & t.flags && vl(t);
          } catch (e) {
            zu(t, t.return, e);
          }
        }
        if (t === e) {
          fl = null;
          break;
        }
        if (null !== (n = t.sibling)) {
          n.return = t.return, fl = n;
          break;
        }
        fl = t.return;
      }
    }
    function jl(e) {
      for (;null !== fl; ) {
        var t = fl;
        if (t === e) {
          fl = null;
          break;
        }
        var n = t.sibling;
        if (null !== n) {
          n.return = t.return, fl = n;
          break;
        }
        fl = t.return;
      }
    }
    function Pl(e) {
      for (;null !== fl; ) {
        var t = fl;
        try {
          switch (t.tag) {
           case 0:
           case 11:
           case 15:
            var n = t.return;
            try {
              gl(4, t);
            } catch (e) {
              zu(t, n, e);
            }
            break;

           case 1:
            var r = t.stateNode;
            if ("function" == typeof r.componentDidMount) {
              var a = t.return;
              try {
                r.componentDidMount();
              } catch (e) {
                zu(t, a, e);
              }
            }
            var i = t.return;
            try {
              vl(t);
            } catch (e) {
              zu(t, i, e);
            }
            break;

           case 5:
            var o = t.return;
            try {
              vl(t);
            } catch (e) {
              zu(t, o, e);
            }
          }
        } catch (e) {
          zu(t, t.return, e);
        }
        if (t === e) {
          fl = null;
          break;
        }
        var s = t.sibling;
        if (null !== s) {
          s.return = t.return, fl = s;
          break;
        }
        fl = t.return;
      }
    }
    var Rl, zl = Math.ceil, Dl = L.ReactCurrentDispatcher, Fl = L.ReactCurrentOwner, Hl = L.ReactCurrentBatchConfig, $l = 0, Bl = null, Wl = null, Ul = 0, Vl = 0, ql = za(0), Zl = 0, Kl = null, Yl = 0, Ql = 0, Gl = 0, Xl = null, Jl = null, eu = 0, tu = 1 / 0, nu = null, ru = !1, au = null, iu = null, ou = !1, su = null, lu = 0, uu = 0, cu = null, fu = -1, du = 0;
    function pu() {
      return 0 != (6 & $l) ? ct() : -1 !== fu ? fu : fu = ct();
    }
    function hu(e) {
      return 0 == (1 & e.mode) ? 1 : 0 != (2 & $l) && 0 !== Ul ? Ul & -Ul : null !== Ti.transition ? (0 === du && (du = Tt()), 
      du) : 0 !== (e = It) ? e : e = void 0 === (e = window.event) ? 16 : cn(e.type);
    }
    function mu(e, t, n, r) {
      if (50 < uu) throw uu = 0, cu = null, Error(y(185));
      Nt(e, n, r), 0 != (2 & $l) && e === Bl || (e === Bl && (0 == (2 & $l) && (Ql |= n), 
      4 === Zl && wu(e, Ul)), gu(e, r), 1 === n && 0 === $l && 0 == (1 & t.mode) && (tu = ct() + 500, 
      Xa && ti()));
    }
    function gu(e, t) {
      var n = e.callbackNode;
      !function(e, t) {
        for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
          var o = 31 - bt(i), s = 1 << o, l = a[o];
          -1 === l ? 0 != (s & n) && 0 == (s & r) || (a[o] = At(s, t)) : l <= t && (e.expiredLanes |= s), 
          i &= ~s;
        }
      }(e, t);
      var r = St(e, e === Bl ? Ul : 0);
      if (0 === r) null !== n && st(n), e.callbackNode = null, e.callbackPriority = 0; else if (t = r & -r, 
      e.callbackPriority !== t) {
        if (null != n && st(n), 1 === t) 0 === e.tag ? function(e) {
          Xa = !0, ei(e);
        }(xu.bind(null, e)) : ei(xu.bind(null, e)), ba((function() {
          0 == (6 & $l) && ti();
        })), n = null; else {
          switch (Lt(r)) {
           case 1:
            n = dt;
            break;

           case 4:
            n = pt;
            break;

           case 16:
           default:
            n = ht;
            break;

           case 536870912:
            n = gt;
          }
          n = Bu(n, vu.bind(null, e));
        }
        e.callbackPriority = t, e.callbackNode = n;
      }
    }
    function vu(e, t) {
      if (fu = -1, du = 0, 0 != (6 & $l)) throw Error(y(327));
      var n = e.callbackNode;
      if (Pu() && e.callbackNode !== n) return null;
      var r = St(e, e === Bl ? Ul : 0);
      if (0 === r) return null;
      if (0 != (30 & r) || 0 != (r & e.expiredLanes) || t) t = Ou(e, r); else {
        t = r;
        var a = $l;
        $l |= 2;
        var i = Cu();
        for (Bl === e && Ul === t || (nu = null, tu = ct() + 500, Su(e, t)); ;) try {
          Mu();
          break;
        } catch (t) {
          Au(e, t);
        }
        ji(), Dl.current = i, $l = a, null !== Wl ? t = 0 : (Bl = null, Ul = 0, t = Zl);
      }
      if (0 !== t) {
        if (2 === t && (0 !== (a = Ct(e)) && (r = a, t = yu(e, a))), 1 === t) throw n = Kl, 
        Su(e, 0), wu(e, r), gu(e, ct()), n;
        if (6 === t) wu(e, r); else {
          if (a = e.current.alternate, 0 == (30 & r) && !function(e) {
            for (var t = e; ;) {
              if (16384 & t.flags) {
                var n = t.updateQueue;
                if (null !== n && null !== (n = n.stores)) for (var r = 0; r < n.length; r++) {
                  var a = n[r], i = a.getSnapshot;
                  a = a.value;
                  try {
                    if (!wr(i(), a)) return !1;
                  } catch (e) {
                    return !1;
                  }
                }
              }
              if (n = t.child, 16384 & t.subtreeFlags && null !== n) n.return = t, t = n; else {
                if (t === e) break;
                for (;null === t.sibling; ) {
                  if (null === t.return || t.return === e) return !0;
                  t = t.return;
                }
                t.sibling.return = t.return, t = t.sibling;
              }
            }
            return !0;
          }(a) && (2 === (t = Ou(e, r)) && (0 !== (i = Ct(e)) && (r = i, t = yu(e, i))), 1 === t)) throw n = Kl, 
          Su(e, 0), wu(e, r), gu(e, ct()), n;
          switch (e.finishedWork = a, e.finishedLanes = r, t) {
           case 0:
           case 1:
            throw Error(y(345));

           case 2:
           case 5:
            ju(e, Jl, nu);
            break;

           case 3:
            if (wu(e, r), (130023424 & r) === r && 10 < (t = eu + 500 - ct())) {
              if (0 !== St(e, 0)) break;
              if (((a = e.suspendedLanes) & r) !== r) {
                pu(), e.pingedLanes |= e.suspendedLanes & a;
                break;
              }
              e.timeoutHandle = ga(ju.bind(null, e, Jl, nu), t);
              break;
            }
            ju(e, Jl, nu);
            break;

           case 4:
            if (wu(e, r), (4194240 & r) === r) break;
            for (t = e.eventTimes, a = -1; 0 < r; ) {
              var o = 31 - bt(r);
              i = 1 << o, (o = t[o]) > a && (a = o), r &= ~i;
            }
            if (r = a, 10 < (r = (120 > (r = ct() - r) ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * zl(r / 1960)) - r)) {
              e.timeoutHandle = ga(ju.bind(null, e, Jl, nu), r);
              break;
            }
            ju(e, Jl, nu);
            break;

           default:
            throw Error(y(329));
          }
        }
      }
      return gu(e, ct()), e.callbackNode === n ? vu.bind(null, e) : null;
    }
    function yu(e, t) {
      var n = Xl;
      return e.current.memoizedState.isDehydrated && (Su(e, t).flags |= 256), 2 !== (e = Ou(e, t)) && (t = Jl, 
      Jl = n, null !== t && bu(t)), e;
    }
    function bu(e) {
      null === Jl ? Jl = e : Jl.push.apply(Jl, e);
    }
    function wu(e, t) {
      for (t &= ~Gl, t &= ~Ql, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
        var n = 31 - bt(t), r = 1 << n;
        e[n] = -1, t &= ~r;
      }
    }
    function xu(e) {
      if (0 != (6 & $l)) throw Error(y(327));
      Pu();
      var t = St(e, 0);
      if (0 == (1 & t)) return gu(e, ct()), null;
      var n = Ou(e, t);
      if (0 !== e.tag && 2 === n) {
        var r = Ct(e);
        0 !== r && (t = r, n = yu(e, r));
      }
      if (1 === n) throw n = Kl, Su(e, 0), wu(e, t), gu(e, ct()), n;
      if (6 === n) throw Error(y(345));
      return e.finishedWork = e.current.alternate, e.finishedLanes = t, ju(e, Jl, nu), 
      gu(e, ct()), null;
    }
    function ku(e, t) {
      var n = $l;
      $l |= 1;
      try {
        return e(t);
      } finally {
        0 === ($l = n) && (tu = ct() + 500, Xa && ti());
      }
    }
    function _u(e) {
      null !== su && 0 === su.tag && 0 == (6 & $l) && Pu();
      var t = $l;
      $l |= 1;
      var n = Hl.transition, r = It;
      try {
        if (Hl.transition = null, It = 1, e) return e();
      } finally {
        It = r, Hl.transition = n, 0 == (6 & ($l = t)) && ti();
      }
    }
    function Eu() {
      Vl = ql.current, Da(ql);
    }
    function Su(e, t) {
      e.finishedWork = null, e.finishedLanes = 0;
      var n = e.timeoutHandle;
      if (-1 !== n && (e.timeoutHandle = -1, va(n)), null !== Wl) for (n = Wl.return; null !== n; ) {
        var r = n;
        switch (hi(r), r.tag) {
         case 1:
          null != (r = r.type.childContextTypes) && qa();
          break;

         case 3:
          yo(), Da(Ba), Da($a), Eo();
          break;

         case 5:
          wo(r);
          break;

         case 4:
          yo();
          break;

         case 13:
         case 19:
          Da(xo);
          break;

         case 10:
          Pi(r.type._context);
          break;

         case 22:
         case 23:
          Eu();
        }
        n = n.return;
      }
      if (Bl = e, Wl = e = qu(e.current, null), Ul = Vl = t, Zl = 0, Kl = null, Gl = Ql = Yl = 0, 
      Jl = Xl = null, null !== Fi) {
        for (t = 0; t < Fi.length; t++) if (null !== (r = (n = Fi[t]).interleaved)) {
          n.interleaved = null;
          var a = r.next, i = n.pending;
          if (null !== i) {
            var o = i.next;
            i.next = a, r.next = o;
          }
          n.pending = r;
        }
        Fi = null;
      }
      return e;
    }
    function Au(e, t) {
      for (;;) {
        var n = Wl;
        try {
          if (ji(), So.current = bs, Mo) {
            for (var r = To.memoizedState; null !== r; ) {
              var a = r.queue;
              null !== a && (a.pending = null), r = r.next;
            }
            Mo = !1;
          }
          if (Co = 0, No = Oo = To = null, Io = !1, Lo = 0, Fl.current = null, null === n || null === n.return) {
            Zl = 1, Kl = t, Wl = null;
            break;
          }
          e: {
            var i = e, o = n.return, s = n, l = t;
            if (t = Ul, s.flags |= 32768, null !== l && "object" == typeof l && "function" == typeof l.then) {
              var u = l, c = s, f = c.tag;
              if (0 == (1 & c.mode) && (0 === f || 11 === f || 15 === f)) {
                var d = c.alternate;
                d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, 
                c.memoizedState = null);
              }
              var p = Ns(o);
              if (null !== p) {
                p.flags &= -257, Ms(p, o, s, 0, t), 1 & p.mode && Os(i, u, t), l = u;
                var h = (t = p).updateQueue;
                if (null === h) {
                  var m = new Set;
                  m.add(l), t.updateQueue = m;
                } else h.add(l);
                break e;
              }
              if (0 == (1 & t)) {
                Os(i, u, t), Tu();
                break e;
              }
              l = Error(y(426));
            } else if (vi && 1 & s.mode) {
              var g = Ns(o);
              if (null !== g) {
                0 == (65536 & g.flags) && (g.flags |= 256), Ms(g, o, s, 0, t), Ci(_s(l, s));
                break e;
              }
            }
            i = l = _s(l, s), 4 !== Zl && (Zl = 2), null === Xl ? Xl = [ i ] : Xl.push(i), i = o;
            do {
              switch (i.tag) {
               case 3:
                i.flags |= 65536, t &= -t, i.lanes |= t, Yi(i, Cs(0, l, t));
                break e;

               case 1:
                s = l;
                var v = i.type, b = i.stateNode;
                if (0 == (128 & i.flags) && ("function" == typeof v.getDerivedStateFromError || null !== b && "function" == typeof b.componentDidCatch && (null === iu || !iu.has(b)))) {
                  i.flags |= 65536, t &= -t, i.lanes |= t, Yi(i, Ts(i, s, t));
                  break e;
                }
              }
              i = i.return;
            } while (null !== i);
          }
          Lu(n);
        } catch (e) {
          t = e, Wl === n && null !== n && (Wl = n = n.return);
          continue;
        }
        break;
      }
    }
    function Cu() {
      var e = Dl.current;
      return Dl.current = bs, null === e ? bs : e;
    }
    function Tu() {
      0 !== Zl && 3 !== Zl && 2 !== Zl || (Zl = 4), null === Bl || 0 == (268435455 & Yl) && 0 == (268435455 & Ql) || wu(Bl, Ul);
    }
    function Ou(e, t) {
      var n = $l;
      $l |= 2;
      var r = Cu();
      for (Bl === e && Ul === t || (nu = null, Su(e, t)); ;) try {
        Nu();
        break;
      } catch (t) {
        Au(e, t);
      }
      if (ji(), $l = n, Dl.current = r, null !== Wl) throw Error(y(261));
      return Bl = null, Ul = 0, Zl;
    }
    function Nu() {
      for (;null !== Wl; ) Iu(Wl);
    }
    function Mu() {
      for (;null !== Wl && !lt(); ) Iu(Wl);
    }
    function Iu(e) {
      var t = Rl(e.alternate, e, Vl);
      e.memoizedProps = e.pendingProps, null === t ? Lu(e) : Wl = t, Fl.current = null;
    }
    function Lu(e) {
      var t = e;
      do {
        var n = t.alternate;
        if (e = t.return, 0 == (32768 & t.flags)) {
          if (null !== (n = ol(n, t, Vl))) return void (Wl = n);
        } else {
          if (null !== (n = sl(n, t))) return n.flags &= 32767, void (Wl = n);
          if (null === e) return Zl = 6, void (Wl = null);
          e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        }
        if (null !== (t = t.sibling)) return void (Wl = t);
        Wl = t = e;
      } while (null !== t);
      0 === Zl && (Zl = 5);
    }
    function ju(e, t, n) {
      var r = It, a = Hl.transition;
      try {
        Hl.transition = null, It = 1, function(e, t, n, r) {
          do {
            Pu();
          } while (null !== su);
          if (0 != (6 & $l)) throw Error(y(327));
          n = e.finishedWork;
          var a = e.finishedLanes;
          if (null === n) return null;
          if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(y(177));
          e.callbackNode = null, e.callbackPriority = 0;
          var i = n.lanes | n.childLanes;
          if (function(e, t) {
            var n = e.pendingLanes & ~t;
            e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, 
            e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
            var r = e.eventTimes;
            for (e = e.expirationTimes; 0 < n; ) {
              var a = 31 - bt(n), i = 1 << a;
              t[a] = 0, r[a] = -1, e[a] = -1, n &= ~i;
            }
          }(e, i), e === Bl && (Wl = Bl = null, Ul = 0), 0 == (2064 & n.subtreeFlags) && 0 == (2064 & n.flags) || ou || (ou = !0, 
          Bu(ht, (function() {
            return Pu(), null;
          }))), i = 0 != (15990 & n.flags), 0 != (15990 & n.subtreeFlags) || i) {
            i = Hl.transition, Hl.transition = null;
            var o = It;
            It = 1;
            var s = $l;
            $l |= 4, Fl.current = null, function(e, t) {
              if (pa = rn, Ar(e = Sr())) {
                if ("selectionStart" in e) var n = {
                  start: e.selectionStart,
                  end: e.selectionEnd
                }; else e: {
                  var r = (n = (n = e.ownerDocument) && n.defaultView || window).getSelection && n.getSelection();
                  if (r && 0 !== r.rangeCount) {
                    n = r.anchorNode;
                    var a = r.anchorOffset, i = r.focusNode;
                    r = r.focusOffset;
                    try {
                      n.nodeType, i.nodeType;
                    } catch (e) {
                      n = null;
                      break e;
                    }
                    var o = 0, s = -1, l = -1, u = 0, c = 0, f = e, d = null;
                    t: for (;;) {
                      for (var p; f !== n || 0 !== a && 3 !== f.nodeType || (s = o + a), f !== i || 0 !== r && 3 !== f.nodeType || (l = o + r), 
                      3 === f.nodeType && (o += f.nodeValue.length), null !== (p = f.firstChild); ) d = f, 
                      f = p;
                      for (;;) {
                        if (f === e) break t;
                        if (d === n && ++u === a && (s = o), d === i && ++c === r && (l = o), null !== (p = f.nextSibling)) break;
                        d = (f = d).parentNode;
                      }
                      f = p;
                    }
                    n = -1 === s || -1 === l ? null : {
                      start: s,
                      end: l
                    };
                  } else n = null;
                }
                n = n || {
                  start: 0,
                  end: 0
                };
              } else n = null;
              for (ha = {
                focusedElem: e,
                selectionRange: n
              }, rn = !1, fl = t; null !== fl; ) if (e = (t = fl).child, 0 != (1028 & t.subtreeFlags) && null !== e) e.return = t, 
              fl = e; else for (;null !== fl; ) {
                t = fl;
                try {
                  var h = t.alternate;
                  if (0 != (1024 & t.flags)) switch (t.tag) {
                   case 0:
                   case 11:
                   case 15:
                   case 5:
                   case 6:
                   case 4:
                   case 17:
                    break;

                   case 1:
                    if (null !== h) {
                      var m = h.memoizedProps, g = h.memoizedState, v = t.stateNode, b = v.getSnapshotBeforeUpdate(t.elementType === t.type ? m : Oi(t.type, m), g);
                      v.__reactInternalSnapshotBeforeUpdate = b;
                    }
                    break;

                   case 3:
                    var w = t.stateNode.containerInfo;
                    1 === w.nodeType ? w.textContent = "" : 9 === w.nodeType && w.documentElement && w.removeChild(w.documentElement);
                    break;

                   default:
                    throw Error(y(163));
                  }
                } catch (e) {
                  zu(t, t.return, e);
                }
                if (null !== (e = t.sibling)) {
                  e.return = t.return, fl = e;
                  break;
                }
                fl = t.return;
              }
              h = hl, hl = !1;
            }(e, n), Ol(n, e), Cr(ha), rn = !!pa, ha = pa = null, e.current = n, Ml(n, e, a), 
            ut(), $l = s, It = o, Hl.transition = i;
          } else e.current = n;
          if (ou && (ou = !1, su = e, lu = a), i = e.pendingLanes, 0 === i && (iu = null), 
          function(e) {
            if (yt && "function" == typeof yt.onCommitFiberRoot) try {
              yt.onCommitFiberRoot(vt, e, void 0, 128 == (128 & e.current.flags));
            } catch (e) {}
          }(n.stateNode), gu(e, ct()), null !== t) for (r = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], 
          r(a.value, {
            componentStack: a.stack,
            digest: a.digest
          });
          if (ru) throw ru = !1, e = au, au = null, e;
          0 != (1 & lu) && 0 !== e.tag && Pu(), i = e.pendingLanes, 0 != (1 & i) ? e === cu ? uu++ : (uu = 0, 
          cu = e) : uu = 0, ti();
        }(e, t, n, r);
      } finally {
        Hl.transition = a, It = r;
      }
      return null;
    }
    function Pu() {
      if (null !== su) {
        var e = Lt(lu), t = Hl.transition, n = It;
        try {
          if (Hl.transition = null, It = 16 > e ? 16 : e, null === su) var r = !1; else {
            if (e = su, su = null, lu = 0, 0 != (6 & $l)) throw Error(y(331));
            var a = $l;
            for ($l |= 4, fl = e.current; null !== fl; ) {
              var i = fl, o = i.child;
              if (0 != (16 & fl.flags)) {
                var s = i.deletions;
                if (null !== s) {
                  for (var l = 0; l < s.length; l++) {
                    var u = s[l];
                    for (fl = u; null !== fl; ) {
                      var c = fl;
                      switch (c.tag) {
                       case 0:
                       case 11:
                       case 15:
                        ml(8, c, i);
                      }
                      var f = c.child;
                      if (null !== f) f.return = c, fl = f; else for (;null !== fl; ) {
                        var d = (c = fl).sibling, p = c.return;
                        if (yl(c), c === u) {
                          fl = null;
                          break;
                        }
                        if (null !== d) {
                          d.return = p, fl = d;
                          break;
                        }
                        fl = p;
                      }
                    }
                  }
                  var h = i.alternate;
                  if (null !== h) {
                    var m = h.child;
                    if (null !== m) {
                      h.child = null;
                      do {
                        var g = m.sibling;
                        m.sibling = null, m = g;
                      } while (null !== m);
                    }
                  }
                  fl = i;
                }
              }
              if (0 != (2064 & i.subtreeFlags) && null !== o) o.return = i, fl = o; else e: for (;null !== fl; ) {
                if (0 != (2048 & (i = fl).flags)) switch (i.tag) {
                 case 0:
                 case 11:
                 case 15:
                  ml(9, i, i.return);
                }
                var v = i.sibling;
                if (null !== v) {
                  v.return = i.return, fl = v;
                  break e;
                }
                fl = i.return;
              }
            }
            var b = e.current;
            for (fl = b; null !== fl; ) {
              var w = (o = fl).child;
              if (0 != (2064 & o.subtreeFlags) && null !== w) w.return = o, fl = w; else e: for (o = b; null !== fl; ) {
                if (0 != (2048 & (s = fl).flags)) try {
                  switch (s.tag) {
                   case 0:
                   case 11:
                   case 15:
                    gl(9, s);
                  }
                } catch (e) {
                  zu(s, s.return, e);
                }
                if (s === o) {
                  fl = null;
                  break e;
                }
                var x = s.sibling;
                if (null !== x) {
                  x.return = s.return, fl = x;
                  break e;
                }
                fl = s.return;
              }
            }
            if ($l = a, ti(), yt && "function" == typeof yt.onPostCommitFiberRoot) try {
              yt.onPostCommitFiberRoot(vt, e);
            } catch (e) {}
            r = !0;
          }
          return r;
        } finally {
          It = n, Hl.transition = t;
        }
      }
      return !1;
    }
    function Ru(e, t, n) {
      e = Zi(e, t = Cs(0, t = _s(n, t), 1), 1), t = pu(), null !== e && (Nt(e, 1, t), 
      gu(e, t));
    }
    function zu(e, t, n) {
      if (3 === e.tag) Ru(e, e, n); else for (;null !== t; ) {
        if (3 === t.tag) {
          Ru(t, e, n);
          break;
        }
        if (1 === t.tag) {
          var r = t.stateNode;
          if ("function" == typeof t.type.getDerivedStateFromError || "function" == typeof r.componentDidCatch && (null === iu || !iu.has(r))) {
            t = Zi(t, e = Ts(t, e = _s(n, e), 1), 1), e = pu(), null !== t && (Nt(t, 1, e), 
            gu(t, e));
            break;
          }
        }
        t = t.return;
      }
    }
    function Du(e, t, n) {
      var r = e.pingCache;
      null !== r && r.delete(t), t = pu(), e.pingedLanes |= e.suspendedLanes & n, Bl === e && (Ul & n) === n && (4 === Zl || 3 === Zl && (130023424 & Ul) === Ul && 500 > ct() - eu ? Su(e, 0) : Gl |= n), 
      gu(e, t);
    }
    function Fu(e, t) {
      0 === t && (0 == (1 & e.mode) ? t = 1 : (t = _t, 0 == (130023424 & (_t <<= 1)) && (_t = 4194304)));
      var n = pu();
      null !== (e = Bi(e, t)) && (Nt(e, t, n), gu(e, n));
    }
    function Hu(e) {
      var t = e.memoizedState, n = 0;
      null !== t && (n = t.retryLane), Fu(e, n);
    }
    function $u(e, t) {
      var n = 0;
      switch (e.tag) {
       case 13:
        var r = e.stateNode, a = e.memoizedState;
        null !== a && (n = a.retryLane);
        break;

       case 19:
        r = e.stateNode;
        break;

       default:
        throw Error(y(314));
      }
      null !== r && r.delete(t), Fu(e, n);
    }
    function Bu(e, t) {
      return ot(e, t);
    }
    function Wu(e, t, n, r) {
      this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, 
      this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, 
      this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, 
      this.alternate = null;
    }
    function Uu(e, t, n, r) {
      return new Wu(e, t, n, r);
    }
    function Vu(e) {
      return !(!(e = e.prototype) || !e.isReactComponent);
    }
    function qu(e, t) {
      var n = e.alternate;
      return null === n ? ((n = Uu(e.tag, t, e.key, e.mode)).elementType = e.elementType, 
      n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, 
      n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = 14680064 & e.flags, 
      n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, 
      n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, 
      n.dependencies = null === t ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
    }
    function Zu(e, t, n, r, a, i) {
      var o = 2;
      if (r = e, "function" == typeof e) Vu(e) && (o = 1); else if ("string" == typeof e) o = 5; else e: switch (e) {
       case R:
        return Ku(n.children, a, i, t);

       case z:
        o = 8, a |= 8;
        break;

       case D:
        return (e = Uu(12, n, t, 2 | a)).elementType = D, e.lanes = i, e;

       case B:
        return (e = Uu(13, n, t, a)).elementType = B, e.lanes = i, e;

       case W:
        return (e = Uu(19, n, t, a)).elementType = W, e.lanes = i, e;

       case q:
        return Yu(n, a, i, t);

       default:
        if ("object" == typeof e && null !== e) switch (e.$$typeof) {
         case F:
          o = 10;
          break e;

         case H:
          o = 9;
          break e;

         case $:
          o = 11;
          break e;

         case U:
          o = 14;
          break e;

         case V:
          o = 16, r = null;
          break e;
        }
        throw Error(y(130, null == e ? e : typeof e, ""));
      }
      return (t = Uu(o, n, t, a)).elementType = e, t.type = r, t.lanes = i, t;
    }
    function Ku(e, t, n, r) {
      return (e = Uu(7, e, r, t)).lanes = n, e;
    }
    function Yu(e, t, n, r) {
      return (e = Uu(22, e, r, t)).elementType = q, e.lanes = n, e.stateNode = {
        isHidden: !1
      }, e;
    }
    function Qu(e, t, n) {
      return (e = Uu(6, e, null, t)).lanes = n, e;
    }
    function Gu(e, t, n) {
      return (t = Uu(4, null !== e.children ? e.children : [], e.key, t)).lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function Xu(e, t, n, r, a) {
      this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, 
      this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, 
      this.callbackPriority = 0, this.eventTimes = Ot(0), this.expirationTimes = Ot(-1), 
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, 
      this.entanglements = Ot(0), this.identifierPrefix = r, this.onRecoverableError = a, 
      this.mutableSourceEagerHydrationData = null;
    }
    function Ju(e, t, n, r, a, i, o, s, l) {
      return e = new Xu(e, t, n, s, l), 1 === t ? (t = 1, !0 === i && (t |= 8)) : t = 0, 
      i = Uu(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
      }, Ui(i), e;
    }
    function ec(e, t, n) {
      var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: P,
        key: null == r ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
      };
    }
    function tc(e) {
      if (!e) return Ha;
      e: {
        if (tt(e = e._reactInternals) !== e || 1 !== e.tag) throw Error(y(170));
        var t = e;
        do {
          switch (t.tag) {
           case 3:
            t = t.stateNode.context;
            break e;

           case 1:
            if (Va(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
          }
          t = t.return;
        } while (null !== t);
        throw Error(y(171));
      }
      if (1 === e.tag) {
        var n = e.type;
        if (Va(n)) return Ka(e, n, t);
      }
      return t;
    }
    function nc(e, t, n, r, a, i, o, s, l) {
      return (e = Ju(n, r, !0, e, 0, i, 0, s, l)).context = tc(null), n = e.current, (i = qi(r = pu(), a = hu(n))).callback = null != t ? t : null, 
      Zi(n, i, a), e.current.lanes = a, Nt(e, a, r), gu(e, r), e;
    }
    function rc(e, t, n, r) {
      var a = t.current, i = pu(), o = hu(a);
      return n = tc(n), null === t.context ? t.context = n : t.pendingContext = n, (t = qi(i, o)).payload = {
        element: e
      }, null !== (r = void 0 === r ? null : r) && (t.callback = r), null !== (e = Zi(a, t, o)) && (mu(e, a, o, i), 
      Ki(e, a, o)), o;
    }
    function ac(e) {
      return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null;
    }
    function ic(e, t) {
      if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
        var n = e.retryLane;
        e.retryLane = 0 !== n && n < t ? n : t;
      }
    }
    function oc(e, t) {
      ic(e, t), (e = e.alternate) && ic(e, t);
    }
    Rl = function(e, t, n) {
      if (null !== e) if (e.memoizedProps !== t.pendingProps || Ba.current) Ls = !0; else {
        if (0 == (e.lanes & n) && 0 == (128 & t.flags)) return Ls = !1, function(e, t, n) {
          switch (t.tag) {
           case 3:
            Ws(t), Ai();
            break;

           case 5:
            bo(t);
            break;

           case 1:
            Va(t.type) && Ya(t);
            break;

           case 4:
            vo(t, t.stateNode.containerInfo);
            break;

           case 10:
            var r = t.type._context, a = t.memoizedProps.value;
            Fa(Ni, r._currentValue), r._currentValue = a;
            break;

           case 13:
            if (null !== (r = t.memoizedState)) return null !== r.dehydrated ? (Fa(xo, 1 & xo.current), 
            t.flags |= 128, null) : 0 != (n & t.child.childLanes) ? Qs(e, t, n) : (Fa(xo, 1 & xo.current), 
            null !== (e = rl(e, t, n)) ? e.sibling : null);
            Fa(xo, 1 & xo.current);
            break;

           case 19:
            if (r = 0 != (n & t.childLanes), 0 != (128 & e.flags)) {
              if (r) return tl(e, t, n);
              t.flags |= 128;
            }
            if (null !== (a = t.memoizedState) && (a.rendering = null, a.tail = null, a.lastEffect = null), 
            Fa(xo, xo.current), r) break;
            return null;

           case 22:
           case 23:
            return t.lanes = 0, Ds(e, t, n);
          }
          return rl(e, t, n);
        }(e, t, n);
        Ls = 0 != (131072 & e.flags);
      } else Ls = !1, vi && 0 != (1048576 & t.flags) && di(t, ii, t.index);
      switch (t.lanes = 0, t.tag) {
       case 2:
        var r = t.type;
        nl(e, t), e = t.pendingProps;
        var a = Ua(t, $a.current);
        zi(t, n), a = zo(null, t, r, e, a, n);
        var i = Do();
        return t.flags |= 1, "object" == typeof a && null !== a && "function" == typeof a.render && void 0 === a.$$typeof ? (t.tag = 1, 
        t.memoizedState = null, t.updateQueue = null, Va(r) ? (i = !0, Ya(t)) : i = !1, 
        t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null, Ui(t), 
        a.updater = eo, t.stateNode = a, a._reactInternals = t, ao(t, r, e, n), t = Bs(null, t, r, !0, i, n)) : (t.tag = 0, 
        vi && i && pi(t), js(null, t, a, n), t = t.child), t;

       case 16:
        r = t.elementType;
        e: {
          switch (nl(e, t), e = t.pendingProps, r = (a = r._init)(r._payload), t.type = r, 
          a = t.tag = function(e) {
            if ("function" == typeof e) return Vu(e) ? 1 : 0;
            if (null != e) {
              if ((e = e.$$typeof) === $) return 11;
              if (e === U) return 14;
            }
            return 2;
          }(r), e = Oi(r, e), a) {
           case 0:
            t = Hs(null, t, r, e, n);
            break e;

           case 1:
            t = $s(null, t, r, e, n);
            break e;

           case 11:
            t = Ps(null, t, r, e, n);
            break e;

           case 14:
            t = Rs(null, t, r, Oi(r.type, e), n);
            break e;
          }
          throw Error(y(306, r, ""));
        }
        return t;

       case 0:
        return r = t.type, a = t.pendingProps, Hs(e, t, r, a = t.elementType === r ? a : Oi(r, a), n);

       case 1:
        return r = t.type, a = t.pendingProps, $s(e, t, r, a = t.elementType === r ? a : Oi(r, a), n);

       case 3:
        e: {
          if (Ws(t), null === e) throw Error(y(387));
          r = t.pendingProps, a = (i = t.memoizedState).element, Vi(e, t), Qi(t, r, null, n);
          var o = t.memoizedState;
          if (r = o.element, i.isDehydrated) {
            if (i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions
            }, t.updateQueue.baseState = i, t.memoizedState = i, 256 & t.flags) {
              t = Us(e, t, r, n, a = _s(Error(y(423)), t));
              break e;
            }
            if (r !== a) {
              t = Us(e, t, r, n, a = _s(Error(y(424)), t));
              break e;
            }
            for (gi = ka(t.stateNode.containerInfo.firstChild), mi = t, vi = !0, yi = null, 
            n = co(t, null, r, n), t.child = n; n; ) n.flags = -3 & n.flags | 4096, n = n.sibling;
          } else {
            if (Ai(), r === a) {
              t = rl(e, t, n);
              break e;
            }
            js(e, t, r, n);
          }
          t = t.child;
        }
        return t;

       case 5:
        return bo(t), null === e && ki(t), r = t.type, a = t.pendingProps, i = null !== e ? e.memoizedProps : null, 
        o = a.children, ma(r, a) ? o = null : null !== i && ma(r, i) && (t.flags |= 32), 
        Fs(e, t), js(e, t, o, n), t.child;

       case 6:
        return null === e && ki(t), null;

       case 13:
        return Qs(e, t, n);

       case 4:
        return vo(t, t.stateNode.containerInfo), r = t.pendingProps, null === e ? t.child = uo(t, null, r, n) : js(e, t, r, n), 
        t.child;

       case 11:
        return r = t.type, a = t.pendingProps, Ps(e, t, r, a = t.elementType === r ? a : Oi(r, a), n);

       case 7:
        return js(e, t, t.pendingProps, n), t.child;

       case 8:
       case 12:
        return js(e, t, t.pendingProps.children, n), t.child;

       case 10:
        e: {
          if (r = t.type._context, a = t.pendingProps, i = t.memoizedProps, o = a.value, Fa(Ni, r._currentValue), 
          r._currentValue = o, null !== i) if (wr(i.value, o)) {
            if (i.children === a.children && !Ba.current) {
              t = rl(e, t, n);
              break e;
            }
          } else for (null !== (i = t.child) && (i.return = t); null !== i; ) {
            var s = i.dependencies;
            if (null !== s) {
              o = i.child;
              for (var l = s.firstContext; null !== l; ) {
                if (l.context === r) {
                  if (1 === i.tag) {
                    (l = qi(-1, n & -n)).tag = 2;
                    var u = i.updateQueue;
                    if (null !== u) {
                      var c = (u = u.shared).pending;
                      null === c ? l.next = l : (l.next = c.next, c.next = l), u.pending = l;
                    }
                  }
                  i.lanes |= n, null !== (l = i.alternate) && (l.lanes |= n), Ri(i.return, n, t), 
                  s.lanes |= n;
                  break;
                }
                l = l.next;
              }
            } else if (10 === i.tag) o = i.type === t.type ? null : i.child; else if (18 === i.tag) {
              if (null === (o = i.return)) throw Error(y(341));
              o.lanes |= n, null !== (s = o.alternate) && (s.lanes |= n), Ri(o, n, t), o = i.sibling;
            } else o = i.child;
            if (null !== o) o.return = i; else for (o = i; null !== o; ) {
              if (o === t) {
                o = null;
                break;
              }
              if (null !== (i = o.sibling)) {
                i.return = o.return, o = i;
                break;
              }
              o = o.return;
            }
            i = o;
          }
          js(e, t, a.children, n), t = t.child;
        }
        return t;

       case 9:
        return a = t.type, r = t.pendingProps.children, zi(t, n), r = r(a = Di(a)), t.flags |= 1, 
        js(e, t, r, n), t.child;

       case 14:
        return a = Oi(r = t.type, t.pendingProps), Rs(e, t, r, a = Oi(r.type, a), n);

       case 15:
        return zs(e, t, t.type, t.pendingProps, n);

       case 17:
        return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Oi(r, a), nl(e, t), 
        t.tag = 1, Va(r) ? (e = !0, Ya(t)) : e = !1, zi(t, n), no(t, r, a), ao(t, r, a, n), 
        Bs(null, t, r, !0, e, n);

       case 19:
        return tl(e, t, n);

       case 22:
        return Ds(e, t, n);
      }
      throw Error(y(156, t.tag));
    };
    var sc = "function" == typeof reportError ? reportError : function(e) {
      console.error(e);
    };
    function lc(e) {
      this._internalRoot = e;
    }
    function uc(e) {
      this._internalRoot = e;
    }
    function cc(e) {
      return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType);
    }
    function fc(e) {
      return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue));
    }
    function dc() {}
    function pc(e, t, n, r, a) {
      var i = n._reactRootContainer;
      if (i) {
        var o = i;
        if ("function" == typeof a) {
          var s = a;
          a = function() {
            var e = ac(o);
            s.call(e);
          };
        }
        rc(t, o, e, a);
      } else o = function(e, t, n, r, a) {
        if (a) {
          if ("function" == typeof r) {
            var i = r;
            r = function() {
              var e = ac(o);
              i.call(e);
            };
          }
          var o = nc(t, r, e, 0, null, !1, 0, "", dc);
          return e._reactRootContainer = o, e[Ca] = o.current, ta(8 === e.nodeType ? e.parentNode : e), 
          _u(), o;
        }
        for (;a = e.lastChild; ) e.removeChild(a);
        if ("function" == typeof r) {
          var s = r;
          r = function() {
            var e = ac(l);
            s.call(e);
          };
        }
        var l = Ju(e, 0, !1, null, 0, !1, 0, "", dc);
        return e._reactRootContainer = l, e[Ca] = l.current, ta(8 === e.nodeType ? e.parentNode : e), 
        _u((function() {
          rc(t, l, n, r);
        })), l;
      }(n, t, e, a, r);
      return ac(o);
    }
    uc.prototype.render = lc.prototype.render = function(e) {
      var t = this._internalRoot;
      if (null === t) throw Error(y(409));
      rc(e, t, null, null);
    }, uc.prototype.unmount = lc.prototype.unmount = function() {
      var e = this._internalRoot;
      if (null !== e) {
        this._internalRoot = null;
        var t = e.containerInfo;
        _u((function() {
          rc(null, e, null, null);
        })), t[Ca] = null;
      }
    }, uc.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = zt();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var n = 0; n < qt.length && 0 !== t && t < qt[n].priority; n++) ;
        qt.splice(n, 0, e), 0 === n && Qt(e);
      }
    }, jt = function(e) {
      switch (e.tag) {
       case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Et(t.pendingLanes);
          0 !== n && (Mt(t, 1 | n), gu(t, ct()), 0 == (6 & $l) && (tu = ct() + 500, ti()));
        }
        break;

       case 13:
        _u((function() {
          var t = Bi(e, 1);
          if (null !== t) {
            var n = pu();
            mu(t, e, 1, n);
          }
        })), oc(e, 1);
      }
    }, Pt = function(e) {
      if (13 === e.tag) {
        var t = Bi(e, 134217728);
        if (null !== t) mu(t, e, 134217728, pu());
        oc(e, 134217728);
      }
    }, Rt = function(e) {
      if (13 === e.tag) {
        var t = hu(e), n = Bi(e, t);
        if (null !== n) mu(n, e, t, pu());
        oc(e, t);
      }
    }, zt = function() {
      return It;
    }, Dt = function(e, t) {
      var n = It;
      try {
        return It = e, t();
      } finally {
        It = n;
      }
    }, Pe = function(e, t, n) {
      switch (t) {
       case "input":
        if (fe(e, n), t = n.name, "radio" === n.type && null != t) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), 
          t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var a = ja(r);
              if (!a) throw Error(y(90));
              oe(r), fe(r, a);
            }
          }
        }
        break;

       case "textarea":
        ye(e, n);
        break;

       case "select":
        null != (t = n.value) && me(e, !!n.multiple, t, !1);
      }
    }, $e = ku, Be = _u;
    var hc = {
      usingClientEntryPoint: !1,
      Events: [ Ia, La, ja, Fe, He, ku ]
    }, mc = {
      findFiberByHostInstance: Ma,
      bundleType: 0,
      version: "18.2.0",
      rendererPackageName: "react-dom"
    }, gc = {
      bundleType: mc.bundleType,
      version: mc.version,
      rendererPackageName: mc.rendererPackageName,
      rendererConfig: mc.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: L.ReactCurrentDispatcher,
      findHostInstanceByFiber: function(e) {
        return null === (e = at(e)) ? null : e.stateNode;
      },
      findFiberByHostInstance: mc.findFiberByHostInstance || function() {
        return null;
      },
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
    };
    if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
      var vc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!vc.isDisabled && vc.supportsFiber) try {
        vt = vc.inject(gc), yt = vc;
      } catch (_e) {}
    }
    r = hc, a = function(e, t) {
      var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!cc(t)) throw Error(y(200));
      return ec(e, t, null, n);
    }, o = function(e, t) {
      if (!cc(e)) throw Error(y(299));
      var n = !1, r = "", a = sc;
      return null != t && (!0 === t.unstable_strictMode && (n = !0), void 0 !== t.identifierPrefix && (r = t.identifierPrefix), 
      void 0 !== t.onRecoverableError && (a = t.onRecoverableError)), t = Ju(e, 1, !1, null, 0, n, 0, r, a), 
      e[Ca] = t.current, ta(8 === e.nodeType ? e.parentNode : e), new lc(t);
    }, s = function(e) {
      if (null == e) return null;
      if (1 === e.nodeType) return e;
      var t = e._reactInternals;
      if (void 0 === t) {
        if ("function" == typeof e.render) throw Error(y(188));
        throw e = Object.keys(e).join(","), Error(y(268, e));
      }
      return e = null === (e = at(t)) ? null : e.stateNode;
    }, l = function(e) {
      return _u(e);
    }, u = function(e, t, n) {
      if (!fc(t)) throw Error(y(200));
      return pc(null, e, t, !0, n);
    }, c = function(e, t, n) {
      if (!cc(e)) throw Error(y(405));
      var r = null != n && n.hydratedSources || null, a = !1, i = "", o = sc;
      if (null != n && (!0 === n.unstable_strictMode && (a = !0), void 0 !== n.identifierPrefix && (i = n.identifierPrefix), 
      void 0 !== n.onRecoverableError && (o = n.onRecoverableError)), t = nc(t, null, e, 1, null != n ? n : null, a, 0, i, o), 
      e[Ca] = t.current, ta(e), r) for (e = 0; e < r.length; e++) a = (a = (n = r[e])._getVersion)(n._source), 
      null == t.mutableSourceEagerHydrationData ? t.mutableSourceEagerHydrationData = [ n, a ] : t.mutableSourceEagerHydrationData.push(n, a);
      return new uc(t);
    }, f = function(e, t, n) {
      if (!fc(t)) throw Error(y(200));
      return pc(null, e, t, !1, n);
    }, d = function(e) {
      if (!fc(e)) throw Error(y(40));
      return !!e._reactRootContainer && (_u((function() {
        pc(null, null, e, !1, (function() {
          e._reactRootContainer = null, e[Ca] = null;
        }));
      })), !0);
    }, p = ku, h = function(e, t, n, r) {
      if (!fc(n)) throw Error(y(200));
      if (null == e || void 0 === e._reactInternals) throw Error(y(38));
      return pc(e, t, n, !1, r);
    }, m = "18.2.0-next-9e3b772b8-20220608";
  })), i.register("iEyFW", (function(e, t) {
    "use strict";
    e.exports = i("jnwy7");
  })), i.register("jnwy7", (function(t, n) {
    /**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
    var r, a, i, o, s, l, u, c, f, d, p, h, m, g, v, y, b, w, x;
    function k(e, t) {
      var n = e.length;
      e.push(t);
      e: for (;0 < n; ) {
        var r = n - 1 >>> 1, a = e[r];
        if (!(0 < S(a, t))) break e;
        e[r] = t, e[n] = a, n = r;
      }
    }
    function _(e) {
      return 0 === e.length ? null : e[0];
    }
    function E(e) {
      if (0 === e.length) return null;
      var t = e[0], n = e.pop();
      if (n !== t) {
        e[0] = n;
        e: for (var r = 0, a = e.length, i = a >>> 1; r < i; ) {
          var o = 2 * (r + 1) - 1, s = e[o], l = o + 1, u = e[l];
          if (0 > S(s, n)) l < a && 0 > S(u, s) ? (e[r] = u, e[l] = n, r = l) : (e[r] = s, 
          e[o] = n, r = o); else {
            if (!(l < a && 0 > S(u, n))) break e;
            e[r] = u, e[l] = n, r = l;
          }
        }
      }
      return t;
    }
    function S(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return 0 !== n ? n : e.id - t.id;
    }
    if (e(t.exports, "unstable_now", (() => r), (e => r = e)), e(t.exports, "unstable_IdlePriority", (() => a), (e => a = e)), 
    e(t.exports, "unstable_ImmediatePriority", (() => i), (e => i = e)), e(t.exports, "unstable_LowPriority", (() => o), (e => o = e)), 
    e(t.exports, "unstable_NormalPriority", (() => s), (e => s = e)), e(t.exports, "unstable_Profiling", (() => l), (e => l = e)), 
    e(t.exports, "unstable_UserBlockingPriority", (() => u), (e => u = e)), e(t.exports, "unstable_cancelCallback", (() => c), (e => c = e)), 
    e(t.exports, "unstable_continueExecution", (() => f), (e => f = e)), e(t.exports, "unstable_forceFrameRate", (() => d), (e => d = e)), 
    e(t.exports, "unstable_getCurrentPriorityLevel", (() => p), (e => p = e)), e(t.exports, "unstable_getFirstCallbackNode", (() => h), (e => h = e)), 
    e(t.exports, "unstable_next", (() => m), (e => m = e)), e(t.exports, "unstable_pauseExecution", (() => g), (e => g = e)), 
    e(t.exports, "unstable_requestPaint", (() => v), (e => v = e)), e(t.exports, "unstable_runWithPriority", (() => y), (e => y = e)), 
    e(t.exports, "unstable_scheduleCallback", (() => b), (e => b = e)), e(t.exports, "unstable_shouldYield", (() => w), (e => w = e)), 
    e(t.exports, "unstable_wrapCallback", (() => x), (e => x = e)), "object" == typeof performance && "function" == typeof performance.now) {
      var A = performance;
      r = function() {
        return A.now();
      };
    } else {
      var C = Date, T = C.now();
      r = function() {
        return C.now() - T;
      };
    }
    var O = [], N = [], M = 1, I = null, L = 3, j = !1, P = !1, R = !1, z = "function" == typeof setTimeout ? setTimeout : null, D = "function" == typeof clearTimeout ? clearTimeout : null, F = "undefined" != typeof setImmediate ? setImmediate : null;
    function H(e) {
      for (var t = _(N); null !== t; ) {
        if (null === t.callback) E(N); else {
          if (!(t.startTime <= e)) break;
          E(N), t.sortIndex = t.expirationTime, k(O, t);
        }
        t = _(N);
      }
    }
    function $(e) {
      if (R = !1, H(e), !P) if (null !== _(O)) P = !0, J(B); else {
        var t = _(N);
        null !== t && ee($, t.startTime - e);
      }
    }
    function B(e, t) {
      P = !1, R && (R = !1, D(q), q = -1), j = !0;
      var n = L;
      try {
        for (H(t), I = _(O); null !== I && (!(I.expirationTime > t) || e && !Y()); ) {
          var a = I.callback;
          if ("function" == typeof a) {
            I.callback = null, L = I.priorityLevel;
            var i = a(I.expirationTime <= t);
            t = r(), "function" == typeof i ? I.callback = i : I === _(O) && E(O), H(t);
          } else E(O);
          I = _(O);
        }
        if (null !== I) var o = !0; else {
          var s = _(N);
          null !== s && ee($, s.startTime - t), o = !1;
        }
        return o;
      } finally {
        I = null, L = n, j = !1;
      }
    }
    "undefined" != typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    var W, U = !1, V = null, q = -1, Z = 5, K = -1;
    function Y() {
      return !(r() - K < Z);
    }
    function Q() {
      if (null !== V) {
        var e = r();
        K = e;
        var t = !0;
        try {
          t = V(!0, e);
        } finally {
          t ? W() : (U = !1, V = null);
        }
      } else U = !1;
    }
    if ("function" == typeof F) W = function() {
      F(Q);
    }; else if ("undefined" != typeof MessageChannel) {
      var G = new MessageChannel, X = G.port2;
      G.port1.onmessage = Q, W = function() {
        X.postMessage(null);
      };
    } else W = function() {
      z(Q, 0);
    };
    function J(e) {
      V = e, U || (U = !0, W());
    }
    function ee(e, t) {
      q = z((function() {
        e(r());
      }), t);
    }
    a = 5, i = 1, o = 4, s = 3, l = null, u = 2, c = function(e) {
      e.callback = null;
    }, f = function() {
      P || j || (P = !0, J(B));
    }, d = function(e) {
      0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Z = 0 < e ? Math.floor(1e3 / e) : 5;
    }, p = function() {
      return L;
    }, h = function() {
      return _(O);
    }, m = function(e) {
      switch (L) {
       case 1:
       case 2:
       case 3:
        var t = 3;
        break;

       default:
        t = L;
      }
      var n = L;
      L = t;
      try {
        return e();
      } finally {
        L = n;
      }
    }, g = function() {}, v = function() {}, y = function(e, t) {
      switch (e) {
       case 1:
       case 2:
       case 3:
       case 4:
       case 5:
        break;

       default:
        e = 3;
      }
      var n = L;
      L = e;
      try {
        return t();
      } finally {
        L = n;
      }
    }, b = function(e, t, n) {
      var a = r();
      switch ("object" == typeof n && null !== n ? n = "number" == typeof (n = n.delay) && 0 < n ? a + n : a : n = a, 
      e) {
       case 1:
        var i = -1;
        break;

       case 2:
        i = 250;
        break;

       case 5:
        i = 1073741823;
        break;

       case 4:
        i = 1e4;
        break;

       default:
        i = 5e3;
      }
      return e = {
        id: M++,
        callback: t,
        priorityLevel: e,
        startTime: n,
        expirationTime: i = n + i,
        sortIndex: -1
      }, n > a ? (e.sortIndex = n, k(N, e), null === _(O) && e === _(N) && (R ? (D(q), 
      q = -1) : R = !0, ee($, n - a))) : (e.sortIndex = i, k(O, e), P || j || (P = !0, 
      J(B))), e;
    }, w = Y, x = function(e) {
      var t = L;
      return function() {
        var n = L;
        L = t;
        try {
          return e.apply(this, arguments);
        } finally {
          L = n;
        }
      };
    };
  })), i.register("UOAc5", (function(e, t) {
    "use strict";
    var n = i("jEajF");
    function r() {}
    function a() {}
    a.resetWarningCache = r, e.exports = function() {
      function e(e, t, r, a, i, o) {
        if (o !== n) {
          var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
          throw s.name = "Invariant Violation", s;
        }
      }
      function t() {
        return e;
      }
      e.isRequired = e;
      var i = {
        array: e,
        bigint: e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        elementType: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t,
        checkPropTypes: a,
        resetWarningCache: r
      };
      return i.PropTypes = i, i;
    };
  })), i.register("jEajF", (function(e, t) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  })), i.register("jLEOZ", (function(e, n) {
    (function() {
      var r, a = "Expected a function", i = "__lodash_hash_undefined__", o = "__lodash_placeholder__", s = 16, l = 32, u = 64, c = 128, f = 256, d = 1 / 0, p = 9007199254740991, h = NaN, m = 4294967295, g = [ [ "ary", c ], [ "bind", 1 ], [ "bindKey", 2 ], [ "curry", 8 ], [ "curryRight", s ], [ "flip", 512 ], [ "partial", l ], [ "partialRight", u ], [ "rearg", f ] ], v = "[object Arguments]", y = "[object Array]", b = "[object Boolean]", w = "[object Date]", x = "[object Error]", k = "[object Function]", _ = "[object GeneratorFunction]", E = "[object Map]", S = "[object Number]", A = "[object Object]", C = "[object Promise]", T = "[object RegExp]", O = "[object Set]", N = "[object String]", M = "[object Symbol]", I = "[object WeakMap]", L = "[object ArrayBuffer]", j = "[object DataView]", P = "[object Float32Array]", R = "[object Float64Array]", z = "[object Int8Array]", D = "[object Int16Array]", F = "[object Int32Array]", H = "[object Uint8Array]", $ = "[object Uint8ClampedArray]", B = "[object Uint16Array]", W = "[object Uint32Array]", U = /\b__p \+= '';/g, V = /\b(__p \+=) '' \+/g, q = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Z = /&(?:amp|lt|gt|quot|#39);/g, K = /[&<>"']/g, Y = RegExp(Z.source), Q = RegExp(K.source), G = /<%-([\s\S]+?)%>/g, X = /<%([\s\S]+?)%>/g, J = /<%=([\s\S]+?)%>/g, ee = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, te = /^\w*$/, ne = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, re = /[\\^$.*+?()[\]{}|]/g, ae = RegExp(re.source), ie = /^\s+/, oe = /\s/, se = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, le = /\{\n\/\* \[wrapped with (.+)\] \*/, ue = /,? & /, ce = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, fe = /[()=,{}\[\]\/\s]/, de = /\\(\\)?/g, pe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, he = /\w*$/, me = /^[-+]0x[0-9a-f]+$/i, ge = /^0b[01]+$/i, ve = /^\[object .+?Constructor\]$/, ye = /^0o[0-7]+$/i, be = /^(?:0|[1-9]\d*)$/, we = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, xe = /($^)/, ke = /['\n\r\u2028\u2029\\]/g, _e = "\ud800-\udfff", Ee = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", Se = "\\u2700-\\u27bf", Ae = "a-z\\xdf-\\xf6\\xf8-\\xff", Ce = "A-Z\\xc0-\\xd6\\xd8-\\xde", Te = "\\ufe0e\\ufe0f", Oe = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ne = "['’]", Me = "[\ud800-\udfff]", Ie = "[" + Oe + "]", Le = "[" + Ee + "]", je = "\\d+", Pe = "[" + Se + "]", Re = "[" + Ae + "]", ze = "[^" + _e + Oe + je + Se + Ae + Ce + "]", De = "\ud83c[\udffb-\udfff]", Fe = "[^\ud800-\udfff]", He = "(?:\ud83c[\udde6-\uddff]){2}", $e = "[\ud800-\udbff][\udc00-\udfff]", Be = "[" + Ce + "]", We = "\\u200d", Ue = "(?:" + Re + "|" + ze + ")", Ve = "(?:" + Be + "|" + ze + ")", qe = "(?:['’](?:d|ll|m|re|s|t|ve))?", Ze = "(?:['’](?:D|LL|M|RE|S|T|VE))?", Ke = "(?:" + Le + "|" + De + ")" + "?", Ye = "[" + Te + "]?", Qe = Ye + Ke + ("(?:" + We + "(?:" + [ Fe, He, $e ].join("|") + ")" + Ye + Ke + ")*"), Ge = "(?:" + [ Pe, He, $e ].join("|") + ")" + Qe, Xe = "(?:" + [ Fe + Le + "?", Le, He, $e, Me ].join("|") + ")", Je = RegExp(Ne, "g"), et = RegExp(Le, "g"), tt = RegExp(De + "(?=" + De + ")|" + Xe + Qe, "g"), nt = RegExp([ Be + "?" + Re + "+" + qe + "(?=" + [ Ie, Be, "$" ].join("|") + ")", Ve + "+" + Ze + "(?=" + [ Ie, Be + Ue, "$" ].join("|") + ")", Be + "?" + Ue + "+" + qe, Be + "+" + Ze, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", je, Ge ].join("|"), "g"), rt = RegExp("[" + We + _e + Ee + Te + "]"), at = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, it = [ "Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout" ], ot = -1, st = {};
      st[P] = st[R] = st[z] = st[D] = st[F] = st[H] = st[$] = st[B] = st[W] = !0, st[v] = st[y] = st[L] = st[b] = st[j] = st[w] = st[x] = st[k] = st[E] = st[S] = st[A] = st[T] = st[O] = st[N] = st[I] = !1;
      var lt = {};
      lt[v] = lt[y] = lt[L] = lt[j] = lt[b] = lt[w] = lt[P] = lt[R] = lt[z] = lt[D] = lt[F] = lt[E] = lt[S] = lt[A] = lt[T] = lt[O] = lt[N] = lt[M] = lt[H] = lt[$] = lt[B] = lt[W] = !0, 
      lt[x] = lt[k] = lt[I] = !1;
      var ut = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, ct = parseFloat, ft = parseInt, dt = "object" == typeof t && t && t.Object === Object && t, pt = "object" == typeof self && self && self.Object === Object && self, ht = dt || pt || Function("return this")(), mt = n && !n.nodeType && n, gt = mt && e && !e.nodeType && e, vt = gt && gt.exports === mt, yt = vt && dt.process, bt = function() {
        try {
          var e = gt && gt.require && gt.require("util").types;
          return e || yt && yt.binding && yt.binding("util");
        } catch (e) {}
      }(), wt = bt && bt.isArrayBuffer, xt = bt && bt.isDate, kt = bt && bt.isMap, _t = bt && bt.isRegExp, Et = bt && bt.isSet, St = bt && bt.isTypedArray;
      function At(e, t, n) {
        switch (n.length) {
         case 0:
          return e.call(t);

         case 1:
          return e.call(t, n[0]);

         case 2:
          return e.call(t, n[0], n[1]);

         case 3:
          return e.call(t, n[0], n[1], n[2]);
        }
        return e.apply(t, n);
      }
      function Ct(e, t, n, r) {
        for (var a = -1, i = null == e ? 0 : e.length; ++a < i; ) {
          var o = e[a];
          t(r, o, n(o), e);
        }
        return r;
      }
      function Tt(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length; ++n < r && !1 !== t(e[n], n, e); ) ;
        return e;
      }
      function Ot(e, t) {
        for (var n = null == e ? 0 : e.length; n-- && !1 !== t(e[n], n, e); ) ;
        return e;
      }
      function Nt(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length; ++n < r; ) if (!t(e[n], n, e)) return !1;
        return !0;
      }
      function Mt(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length, a = 0, i = []; ++n < r; ) {
          var o = e[n];
          t(o, n, e) && (i[a++] = o);
        }
        return i;
      }
      function It(e, t) {
        return !!(null == e ? 0 : e.length) && Bt(e, t, 0) > -1;
      }
      function Lt(e, t, n) {
        for (var r = -1, a = null == e ? 0 : e.length; ++r < a; ) if (n(t, e[r])) return !0;
        return !1;
      }
      function jt(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length, a = Array(r); ++n < r; ) a[n] = t(e[n], n, e);
        return a;
      }
      function Pt(e, t) {
        for (var n = -1, r = t.length, a = e.length; ++n < r; ) e[a + n] = t[n];
        return e;
      }
      function Rt(e, t, n, r) {
        var a = -1, i = null == e ? 0 : e.length;
        for (r && i && (n = e[++a]); ++a < i; ) n = t(n, e[a], a, e);
        return n;
      }
      function zt(e, t, n, r) {
        var a = null == e ? 0 : e.length;
        for (r && a && (n = e[--a]); a--; ) n = t(n, e[a], a, e);
        return n;
      }
      function Dt(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length; ++n < r; ) if (t(e[n], n, e)) return !0;
        return !1;
      }
      var Ft = qt("length");
      function Ht(e, t, n) {
        var r;
        return n(e, (function(e, n, a) {
          if (t(e, n, a)) return r = n, !1;
        })), r;
      }
      function $t(e, t, n, r) {
        for (var a = e.length, i = n + (r ? 1 : -1); r ? i-- : ++i < a; ) if (t(e[i], i, e)) return i;
        return -1;
      }
      function Bt(e, t, n) {
        return t == t ? function(e, t, n) {
          var r = n - 1, a = e.length;
          for (;++r < a; ) if (e[r] === t) return r;
          return -1;
        }(e, t, n) : $t(e, Ut, n);
      }
      function Wt(e, t, n, r) {
        for (var a = n - 1, i = e.length; ++a < i; ) if (r(e[a], t)) return a;
        return -1;
      }
      function Ut(e) {
        return e != e;
      }
      function Vt(e, t) {
        var n = null == e ? 0 : e.length;
        return n ? Yt(e, t) / n : h;
      }
      function qt(e) {
        return function(t) {
          return null == t ? r : t[e];
        };
      }
      function Zt(e) {
        return function(t) {
          return null == e ? r : e[t];
        };
      }
      function Kt(e, t, n, r, a) {
        return a(e, (function(e, a, i) {
          n = r ? (r = !1, e) : t(n, e, a, i);
        })), n;
      }
      function Yt(e, t) {
        for (var n, a = -1, i = e.length; ++a < i; ) {
          var o = t(e[a]);
          o !== r && (n = n === r ? o : n + o);
        }
        return n;
      }
      function Qt(e, t) {
        for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
        return r;
      }
      function Gt(e) {
        return e ? e.slice(0, mn(e) + 1).replace(ie, "") : e;
      }
      function Xt(e) {
        return function(t) {
          return e(t);
        };
      }
      function Jt(e, t) {
        return jt(t, (function(t) {
          return e[t];
        }));
      }
      function en(e, t) {
        return e.has(t);
      }
      function tn(e, t) {
        for (var n = -1, r = e.length; ++n < r && Bt(t, e[n], 0) > -1; ) ;
        return n;
      }
      function nn(e, t) {
        for (var n = e.length; n-- && Bt(t, e[n], 0) > -1; ) ;
        return n;
      }
      function rn(e, t) {
        for (var n = e.length, r = 0; n--; ) e[n] === t && ++r;
        return r;
      }
      var an = Zt({
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "Ç": "C",
        "ç": "c",
        "Ð": "D",
        "ð": "d",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "Ñ": "N",
        "ñ": "n",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "Ý": "Y",
        "ý": "y",
        "ÿ": "y",
        "Æ": "Ae",
        "æ": "ae",
        "Þ": "Th",
        "þ": "th",
        "ß": "ss",
        "Ā": "A",
        "Ă": "A",
        "Ą": "A",
        "ā": "a",
        "ă": "a",
        "ą": "a",
        "Ć": "C",
        "Ĉ": "C",
        "Ċ": "C",
        "Č": "C",
        "ć": "c",
        "ĉ": "c",
        "ċ": "c",
        "č": "c",
        "Ď": "D",
        "Đ": "D",
        "ď": "d",
        "đ": "d",
        "Ē": "E",
        "Ĕ": "E",
        "Ė": "E",
        "Ę": "E",
        "Ě": "E",
        "ē": "e",
        "ĕ": "e",
        "ė": "e",
        "ę": "e",
        "ě": "e",
        "Ĝ": "G",
        "Ğ": "G",
        "Ġ": "G",
        "Ģ": "G",
        "ĝ": "g",
        "ğ": "g",
        "ġ": "g",
        "ģ": "g",
        "Ĥ": "H",
        "Ħ": "H",
        "ĥ": "h",
        "ħ": "h",
        "Ĩ": "I",
        "Ī": "I",
        "Ĭ": "I",
        "Į": "I",
        "İ": "I",
        "ĩ": "i",
        "ī": "i",
        "ĭ": "i",
        "į": "i",
        "ı": "i",
        "Ĵ": "J",
        "ĵ": "j",
        "Ķ": "K",
        "ķ": "k",
        "ĸ": "k",
        "Ĺ": "L",
        "Ļ": "L",
        "Ľ": "L",
        "Ŀ": "L",
        "Ł": "L",
        "ĺ": "l",
        "ļ": "l",
        "ľ": "l",
        "ŀ": "l",
        "ł": "l",
        "Ń": "N",
        "Ņ": "N",
        "Ň": "N",
        "Ŋ": "N",
        "ń": "n",
        "ņ": "n",
        "ň": "n",
        "ŋ": "n",
        "Ō": "O",
        "Ŏ": "O",
        "Ő": "O",
        "ō": "o",
        "ŏ": "o",
        "ő": "o",
        "Ŕ": "R",
        "Ŗ": "R",
        "Ř": "R",
        "ŕ": "r",
        "ŗ": "r",
        "ř": "r",
        "Ś": "S",
        "Ŝ": "S",
        "Ş": "S",
        "Š": "S",
        "ś": "s",
        "ŝ": "s",
        "ş": "s",
        "š": "s",
        "Ţ": "T",
        "Ť": "T",
        "Ŧ": "T",
        "ţ": "t",
        "ť": "t",
        "ŧ": "t",
        "Ũ": "U",
        "Ū": "U",
        "Ŭ": "U",
        "Ů": "U",
        "Ű": "U",
        "Ų": "U",
        "ũ": "u",
        "ū": "u",
        "ŭ": "u",
        "ů": "u",
        "ű": "u",
        "ų": "u",
        "Ŵ": "W",
        "ŵ": "w",
        "Ŷ": "Y",
        "ŷ": "y",
        "Ÿ": "Y",
        "Ź": "Z",
        "Ż": "Z",
        "Ž": "Z",
        "ź": "z",
        "ż": "z",
        "ž": "z",
        "Ĳ": "IJ",
        "ĳ": "ij",
        "Œ": "Oe",
        "œ": "oe",
        "ŉ": "'n",
        "ſ": "s"
      }), on = Zt({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      });
      function sn(e) {
        return "\\" + ut[e];
      }
      function ln(e) {
        return rt.test(e);
      }
      function un(e) {
        var t = -1, n = Array(e.size);
        return e.forEach((function(e, r) {
          n[++t] = [ r, e ];
        })), n;
      }
      function cn(e, t) {
        return function(n) {
          return e(t(n));
        };
      }
      function fn(e, t) {
        for (var n = -1, r = e.length, a = 0, i = []; ++n < r; ) {
          var s = e[n];
          s !== t && s !== o || (e[n] = o, i[a++] = n);
        }
        return i;
      }
      function dn(e) {
        var t = -1, n = Array(e.size);
        return e.forEach((function(e) {
          n[++t] = e;
        })), n;
      }
      function pn(e) {
        return ln(e) ? function(e) {
          var t = tt.lastIndex = 0;
          for (;tt.test(e); ) ++t;
          return t;
        }(e) : Ft(e);
      }
      function hn(e) {
        return ln(e) ? function(e) {
          return e.match(tt) || [];
        }(e) : function(e) {
          return e.split("");
        }(e);
      }
      function mn(e) {
        for (var t = e.length; t-- && oe.test(e.charAt(t)); ) ;
        return t;
      }
      var gn = Zt({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      });
      var vn = function e(t) {
        var n, oe = (t = null == t ? ht : vn.defaults(ht.Object(), t, vn.pick(ht, it))).Array, _e = t.Date, Ee = t.Error, Se = t.Function, Ae = t.Math, Ce = t.Object, Te = t.RegExp, Oe = t.String, Ne = t.TypeError, Me = oe.prototype, Ie = Se.prototype, Le = Ce.prototype, je = t["__core-js_shared__"], Pe = Ie.toString, Re = Le.hasOwnProperty, ze = 0, De = (n = /[^.]+$/.exec(je && je.keys && je.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "", Fe = Le.toString, He = Pe.call(Ce), $e = ht._, Be = Te("^" + Pe.call(Re).replace(re, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), We = vt ? t.Buffer : r, Ue = t.Symbol, Ve = t.Uint8Array, qe = We ? We.allocUnsafe : r, Ze = cn(Ce.getPrototypeOf, Ce), Ke = Ce.create, Ye = Le.propertyIsEnumerable, Qe = Me.splice, Ge = Ue ? Ue.isConcatSpreadable : r, Xe = Ue ? Ue.iterator : r, tt = Ue ? Ue.toStringTag : r, rt = function() {
          try {
            var e = di(Ce, "defineProperty");
            return e({}, "", {}), e;
          } catch (e) {}
        }(), ut = t.clearTimeout !== ht.clearTimeout && t.clearTimeout, dt = _e && _e.now !== ht.Date.now && _e.now, pt = t.setTimeout !== ht.setTimeout && t.setTimeout, mt = Ae.ceil, gt = Ae.floor, yt = Ce.getOwnPropertySymbols, bt = We ? We.isBuffer : r, Ft = t.isFinite, Zt = Me.join, yn = cn(Ce.keys, Ce), bn = Ae.max, wn = Ae.min, xn = _e.now, kn = t.parseInt, _n = Ae.random, En = Me.reverse, Sn = di(t, "DataView"), An = di(t, "Map"), Cn = di(t, "Promise"), Tn = di(t, "Set"), On = di(t, "WeakMap"), Nn = di(Ce, "create"), Mn = On && new On, In = {}, Ln = Fi(Sn), jn = Fi(An), Pn = Fi(Cn), Rn = Fi(Tn), zn = Fi(On), Dn = Ue ? Ue.prototype : r, Fn = Dn ? Dn.valueOf : r, Hn = Dn ? Dn.toString : r;
        function $n(e) {
          if (rs(e) && !qo(e) && !(e instanceof Vn)) {
            if (e instanceof Un) return e;
            if (Re.call(e, "__wrapped__")) return Hi(e);
          }
          return new Un(e);
        }
        var Bn = function() {
          function e() {}
          return function(t) {
            if (!ns(t)) return {};
            if (Ke) return Ke(t);
            e.prototype = t;
            var n = new e;
            return e.prototype = r, n;
          };
        }();
        function Wn() {}
        function Un(e, t) {
          this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, 
          this.__values__ = r;
        }
        function Vn(e) {
          this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, 
          this.__iteratees__ = [], this.__takeCount__ = m, this.__views__ = [];
        }
        function qn(e) {
          var t = -1, n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function Zn(e) {
          var t = -1, n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function Kn(e) {
          var t = -1, n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function Yn(e) {
          var t = -1, n = null == e ? 0 : e.length;
          for (this.__data__ = new Kn; ++t < n; ) this.add(e[t]);
        }
        function Qn(e) {
          var t = this.__data__ = new Zn(e);
          this.size = t.size;
        }
        function Gn(e, t) {
          var n = qo(e), r = !n && Vo(e), a = !n && !r && Qo(e), i = !n && !r && !a && fs(e), o = n || r || a || i, s = o ? Qt(e.length, Oe) : [], l = s.length;
          for (var u in e) !t && !Re.call(e, u) || o && ("length" == u || a && ("offset" == u || "parent" == u) || i && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || bi(u, l)) || s.push(u);
          return s;
        }
        function Xn(e) {
          var t = e.length;
          return t ? e[Yr(0, t - 1)] : r;
        }
        function Jn(e, t) {
          return Ri(Na(e), lr(t, 0, e.length));
        }
        function er(e) {
          return Ri(Na(e));
        }
        function tr(e, t, n) {
          (n !== r && !Bo(e[t], n) || n === r && !(t in e)) && or(e, t, n);
        }
        function nr(e, t, n) {
          var a = e[t];
          Re.call(e, t) && Bo(a, n) && (n !== r || t in e) || or(e, t, n);
        }
        function rr(e, t) {
          for (var n = e.length; n--; ) if (Bo(e[n][0], t)) return n;
          return -1;
        }
        function ar(e, t, n, r) {
          return pr(e, (function(e, a, i) {
            t(r, e, n(e), i);
          })), r;
        }
        function ir(e, t) {
          return e && Ma(t, Ls(t), e);
        }
        function or(e, t, n) {
          "__proto__" == t && rt ? rt(e, t, {
            configurable: !0,
            enumerable: !0,
            value: n,
            writable: !0
          }) : e[t] = n;
        }
        function sr(e, t) {
          for (var n = -1, a = t.length, i = oe(a), o = null == e; ++n < a; ) i[n] = o ? r : Ts(e, t[n]);
          return i;
        }
        function lr(e, t, n) {
          return e == e && (n !== r && (e = e <= n ? e : n), t !== r && (e = e >= t ? e : t)), 
          e;
        }
        function ur(e, t, n, a, i, o) {
          var s, l = 1 & t, u = 2 & t, c = 4 & t;
          if (n && (s = i ? n(e, a, i, o) : n(e)), s !== r) return s;
          if (!ns(e)) return e;
          var f = qo(e);
          if (f) {
            if (s = function(e) {
              var t = e.length, n = new e.constructor(t);
              t && "string" == typeof e[0] && Re.call(e, "index") && (n.index = e.index, n.input = e.input);
              return n;
            }(e), !l) return Na(e, s);
          } else {
            var d = mi(e), p = d == k || d == _;
            if (Qo(e)) return Ea(e, l);
            if (d == A || d == v || p && !i) {
              if (s = u || p ? {} : vi(e), !l) return u ? function(e, t) {
                return Ma(e, hi(e), t);
              }(e, function(e, t) {
                return e && Ma(t, js(t), e);
              }(s, e)) : function(e, t) {
                return Ma(e, pi(e), t);
              }(e, ir(s, e));
            } else {
              if (!lt[d]) return i ? e : {};
              s = function(e, t, n) {
                var r = e.constructor;
                switch (t) {
                 case L:
                  return Sa(e);

                 case b:
                 case w:
                  return new r(+e);

                 case j:
                  return function(e, t) {
                    var n = t ? Sa(e.buffer) : e.buffer;
                    return new e.constructor(n, e.byteOffset, e.byteLength);
                  }(e, n);

                 case P:
                 case R:
                 case z:
                 case D:
                 case F:
                 case H:
                 case $:
                 case B:
                 case W:
                  return Aa(e, n);

                 case E:
                  return new r;

                 case S:
                 case N:
                  return new r(e);

                 case T:
                  return function(e) {
                    var t = new e.constructor(e.source, he.exec(e));
                    return t.lastIndex = e.lastIndex, t;
                  }(e);

                 case O:
                  return new r;

                 case M:
                  return a = e, Fn ? Ce(Fn.call(a)) : {};
                }
                var a;
              }(e, d, l);
            }
          }
          o || (o = new Qn);
          var h = o.get(e);
          if (h) return h;
          o.set(e, s), ls(e) ? e.forEach((function(r) {
            s.add(ur(r, t, n, r, e, o));
          })) : as(e) && e.forEach((function(r, a) {
            s.set(a, ur(r, t, n, a, e, o));
          }));
          var m = f ? r : (c ? u ? ii : ai : u ? js : Ls)(e);
          return Tt(m || e, (function(r, a) {
            m && (r = e[a = r]), nr(s, a, ur(r, t, n, a, e, o));
          })), s;
        }
        function cr(e, t, n) {
          var a = n.length;
          if (null == e) return !a;
          for (e = Ce(e); a--; ) {
            var i = n[a], o = t[i], s = e[i];
            if (s === r && !(i in e) || !o(s)) return !1;
          }
          return !0;
        }
        function fr(e, t, n) {
          if ("function" != typeof e) throw new Ne(a);
          return Ii((function() {
            e.apply(r, n);
          }), t);
        }
        function dr(e, t, n, r) {
          var a = -1, i = It, o = !0, s = e.length, l = [], u = t.length;
          if (!s) return l;
          n && (t = jt(t, Xt(n))), r ? (i = Lt, o = !1) : t.length >= 200 && (i = en, o = !1, 
          t = new Yn(t));
          e: for (;++a < s; ) {
            var c = e[a], f = null == n ? c : n(c);
            if (c = r || 0 !== c ? c : 0, o && f == f) {
              for (var d = u; d--; ) if (t[d] === f) continue e;
              l.push(c);
            } else i(t, f, r) || l.push(c);
          }
          return l;
        }
        $n.templateSettings = {
          escape: G,
          evaluate: X,
          interpolate: J,
          variable: "",
          imports: {
            _: $n
          }
        }, $n.prototype = Wn.prototype, $n.prototype.constructor = $n, Un.prototype = Bn(Wn.prototype), 
        Un.prototype.constructor = Un, Vn.prototype = Bn(Wn.prototype), Vn.prototype.constructor = Vn, 
        qn.prototype.clear = function() {
          this.__data__ = Nn ? Nn(null) : {}, this.size = 0;
        }, qn.prototype.delete = function(e) {
          var t = this.has(e) && delete this.__data__[e];
          return this.size -= t ? 1 : 0, t;
        }, qn.prototype.get = function(e) {
          var t = this.__data__;
          if (Nn) {
            var n = t[e];
            return n === i ? r : n;
          }
          return Re.call(t, e) ? t[e] : r;
        }, qn.prototype.has = function(e) {
          var t = this.__data__;
          return Nn ? t[e] !== r : Re.call(t, e);
        }, qn.prototype.set = function(e, t) {
          var n = this.__data__;
          return this.size += this.has(e) ? 0 : 1, n[e] = Nn && t === r ? i : t, this;
        }, Zn.prototype.clear = function() {
          this.__data__ = [], this.size = 0;
        }, Zn.prototype.delete = function(e) {
          var t = this.__data__, n = rr(t, e);
          return !(n < 0) && (n == t.length - 1 ? t.pop() : Qe.call(t, n, 1), --this.size, 
          !0);
        }, Zn.prototype.get = function(e) {
          var t = this.__data__, n = rr(t, e);
          return n < 0 ? r : t[n][1];
        }, Zn.prototype.has = function(e) {
          return rr(this.__data__, e) > -1;
        }, Zn.prototype.set = function(e, t) {
          var n = this.__data__, r = rr(n, e);
          return r < 0 ? (++this.size, n.push([ e, t ])) : n[r][1] = t, this;
        }, Kn.prototype.clear = function() {
          this.size = 0, this.__data__ = {
            hash: new qn,
            map: new (An || Zn),
            string: new qn
          };
        }, Kn.prototype.delete = function(e) {
          var t = ci(this, e).delete(e);
          return this.size -= t ? 1 : 0, t;
        }, Kn.prototype.get = function(e) {
          return ci(this, e).get(e);
        }, Kn.prototype.has = function(e) {
          return ci(this, e).has(e);
        }, Kn.prototype.set = function(e, t) {
          var n = ci(this, e), r = n.size;
          return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
        }, Yn.prototype.add = Yn.prototype.push = function(e) {
          return this.__data__.set(e, i), this;
        }, Yn.prototype.has = function(e) {
          return this.__data__.has(e);
        }, Qn.prototype.clear = function() {
          this.__data__ = new Zn, this.size = 0;
        }, Qn.prototype.delete = function(e) {
          var t = this.__data__, n = t.delete(e);
          return this.size = t.size, n;
        }, Qn.prototype.get = function(e) {
          return this.__data__.get(e);
        }, Qn.prototype.has = function(e) {
          return this.__data__.has(e);
        }, Qn.prototype.set = function(e, t) {
          var n = this.__data__;
          if (n instanceof Zn) {
            var r = n.__data__;
            if (!An || r.length < 199) return r.push([ e, t ]), this.size = ++n.size, this;
            n = this.__data__ = new Kn(r);
          }
          return n.set(e, t), this.size = n.size, this;
        };
        var pr = ja(xr), hr = ja(kr, !0);
        function mr(e, t) {
          var n = !0;
          return pr(e, (function(e, r, a) {
            return n = !!t(e, r, a);
          })), n;
        }
        function gr(e, t, n) {
          for (var a = -1, i = e.length; ++a < i; ) {
            var o = e[a], s = t(o);
            if (null != s && (l === r ? s == s && !cs(s) : n(s, l))) var l = s, u = o;
          }
          return u;
        }
        function vr(e, t) {
          var n = [];
          return pr(e, (function(e, r, a) {
            t(e, r, a) && n.push(e);
          })), n;
        }
        function yr(e, t, n, r, a) {
          var i = -1, o = e.length;
          for (n || (n = yi), a || (a = []); ++i < o; ) {
            var s = e[i];
            t > 0 && n(s) ? t > 1 ? yr(s, t - 1, n, r, a) : Pt(a, s) : r || (a[a.length] = s);
          }
          return a;
        }
        var br = Pa(), wr = Pa(!0);
        function xr(e, t) {
          return e && br(e, t, Ls);
        }
        function kr(e, t) {
          return e && wr(e, t, Ls);
        }
        function _r(e, t) {
          return Mt(t, (function(t) {
            return Jo(e[t]);
          }));
        }
        function Er(e, t) {
          for (var n = 0, a = (t = wa(t, e)).length; null != e && n < a; ) e = e[Di(t[n++])];
          return n && n == a ? e : r;
        }
        function Sr(e, t, n) {
          var r = t(e);
          return qo(e) ? r : Pt(r, n(e));
        }
        function Ar(e) {
          return null == e ? e === r ? "[object Undefined]" : "[object Null]" : tt && tt in Ce(e) ? function(e) {
            var t = Re.call(e, tt), n = e[tt];
            try {
              e[tt] = r;
              var a = !0;
            } catch (e) {}
            var i = Fe.call(e);
            a && (t ? e[tt] = n : delete e[tt]);
            return i;
          }(e) : function(e) {
            return Fe.call(e);
          }(e);
        }
        function Cr(e, t) {
          return e > t;
        }
        function Tr(e, t) {
          return null != e && Re.call(e, t);
        }
        function Or(e, t) {
          return null != e && t in Ce(e);
        }
        function Nr(e, t, n) {
          for (var a = n ? Lt : It, i = e[0].length, o = e.length, s = o, l = oe(o), u = 1 / 0, c = []; s--; ) {
            var f = e[s];
            s && t && (f = jt(f, Xt(t))), u = wn(f.length, u), l[s] = !n && (t || i >= 120 && f.length >= 120) ? new Yn(s && f) : r;
          }
          f = e[0];
          var d = -1, p = l[0];
          e: for (;++d < i && c.length < u; ) {
            var h = f[d], m = t ? t(h) : h;
            if (h = n || 0 !== h ? h : 0, !(p ? en(p, m) : a(c, m, n))) {
              for (s = o; --s; ) {
                var g = l[s];
                if (!(g ? en(g, m) : a(e[s], m, n))) continue e;
              }
              p && p.push(m), c.push(h);
            }
          }
          return c;
        }
        function Mr(e, t, n) {
          var a = null == (e = Ti(e, t = wa(t, e))) ? e : e[Di(Gi(t))];
          return null == a ? r : At(a, e, n);
        }
        function Ir(e) {
          return rs(e) && Ar(e) == v;
        }
        function Lr(e, t, n, a, i) {
          return e === t || (null == e || null == t || !rs(e) && !rs(t) ? e != e && t != t : function(e, t, n, a, i, o) {
            var s = qo(e), l = qo(t), u = s ? y : mi(e), c = l ? y : mi(t), f = (u = u == v ? A : u) == A, d = (c = c == v ? A : c) == A, p = u == c;
            if (p && Qo(e)) {
              if (!Qo(t)) return !1;
              s = !0, f = !1;
            }
            if (p && !f) return o || (o = new Qn), s || fs(e) ? ni(e, t, n, a, i, o) : function(e, t, n, r, a, i, o) {
              switch (n) {
               case j:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                e = e.buffer, t = t.buffer;

               case L:
                return !(e.byteLength != t.byteLength || !i(new Ve(e), new Ve(t)));

               case b:
               case w:
               case S:
                return Bo(+e, +t);

               case x:
                return e.name == t.name && e.message == t.message;

               case T:
               case N:
                return e == t + "";

               case E:
                var s = un;

               case O:
                var l = 1 & r;
                if (s || (s = dn), e.size != t.size && !l) return !1;
                var u = o.get(e);
                if (u) return u == t;
                r |= 2, o.set(e, t);
                var c = ni(s(e), s(t), r, a, i, o);
                return o.delete(e), c;

               case M:
                if (Fn) return Fn.call(e) == Fn.call(t);
              }
              return !1;
            }(e, t, u, n, a, i, o);
            if (!(1 & n)) {
              var h = f && Re.call(e, "__wrapped__"), m = d && Re.call(t, "__wrapped__");
              if (h || m) {
                var g = h ? e.value() : e, k = m ? t.value() : t;
                return o || (o = new Qn), i(g, k, n, a, o);
              }
            }
            return !!p && (o || (o = new Qn), function(e, t, n, a, i, o) {
              var s = 1 & n, l = ai(e), u = l.length, c = ai(t), f = c.length;
              if (u != f && !s) return !1;
              var d = u;
              for (;d--; ) {
                var p = l[d];
                if (!(s ? p in t : Re.call(t, p))) return !1;
              }
              var h = o.get(e), m = o.get(t);
              if (h && m) return h == t && m == e;
              var g = !0;
              o.set(e, t), o.set(t, e);
              var v = s;
              for (;++d < u; ) {
                var y = e[p = l[d]], b = t[p];
                if (a) var w = s ? a(b, y, p, t, e, o) : a(y, b, p, e, t, o);
                if (!(w === r ? y === b || i(y, b, n, a, o) : w)) {
                  g = !1;
                  break;
                }
                v || (v = "constructor" == p);
              }
              if (g && !v) {
                var x = e.constructor, k = t.constructor;
                x == k || !("constructor" in e) || !("constructor" in t) || "function" == typeof x && x instanceof x && "function" == typeof k && k instanceof k || (g = !1);
              }
              return o.delete(e), o.delete(t), g;
            }(e, t, n, a, i, o));
          }(e, t, n, a, Lr, i));
        }
        function jr(e, t, n, a) {
          var i = n.length, o = i, s = !a;
          if (null == e) return !o;
          for (e = Ce(e); i--; ) {
            var l = n[i];
            if (s && l[2] ? l[1] !== e[l[0]] : !(l[0] in e)) return !1;
          }
          for (;++i < o; ) {
            var u = (l = n[i])[0], c = e[u], f = l[1];
            if (s && l[2]) {
              if (c === r && !(u in e)) return !1;
            } else {
              var d = new Qn;
              if (a) var p = a(c, f, u, e, t, d);
              if (!(p === r ? Lr(f, c, 3, a, d) : p)) return !1;
            }
          }
          return !0;
        }
        function Pr(e) {
          return !(!ns(e) || (t = e, De && De in t)) && (Jo(e) ? Be : ve).test(Fi(e));
          var t;
        }
        function Rr(e) {
          return "function" == typeof e ? e : null == e ? il : "object" == typeof e ? qo(e) ? Br(e[0], e[1]) : $r(e) : hl(e);
        }
        function zr(e) {
          if (!Ei(e)) return yn(e);
          var t = [];
          for (var n in Ce(e)) Re.call(e, n) && "constructor" != n && t.push(n);
          return t;
        }
        function Dr(e) {
          if (!ns(e)) return function(e) {
            var t = [];
            if (null != e) for (var n in Ce(e)) t.push(n);
            return t;
          }(e);
          var t = Ei(e), n = [];
          for (var r in e) ("constructor" != r || !t && Re.call(e, r)) && n.push(r);
          return n;
        }
        function Fr(e, t) {
          return e < t;
        }
        function Hr(e, t) {
          var n = -1, r = Ko(e) ? oe(e.length) : [];
          return pr(e, (function(e, a, i) {
            r[++n] = t(e, a, i);
          })), r;
        }
        function $r(e) {
          var t = fi(e);
          return 1 == t.length && t[0][2] ? Ai(t[0][0], t[0][1]) : function(n) {
            return n === e || jr(n, e, t);
          };
        }
        function Br(e, t) {
          return xi(e) && Si(t) ? Ai(Di(e), t) : function(n) {
            var a = Ts(n, e);
            return a === r && a === t ? Os(n, e) : Lr(t, a, 3);
          };
        }
        function Wr(e, t, n, a, i) {
          e !== t && br(t, (function(o, s) {
            if (i || (i = new Qn), ns(o)) !function(e, t, n, a, i, o, s) {
              var l = Ni(e, n), u = Ni(t, n), c = s.get(u);
              if (c) return void tr(e, n, c);
              var f = o ? o(l, u, n + "", e, t, s) : r, d = f === r;
              if (d) {
                var p = qo(u), h = !p && Qo(u), m = !p && !h && fs(u);
                f = u, p || h || m ? qo(l) ? f = l : Yo(l) ? f = Na(l) : h ? (d = !1, f = Ea(u, !0)) : m ? (d = !1, 
                f = Aa(u, !0)) : f = [] : os(u) || Vo(u) ? (f = l, Vo(l) ? f = bs(l) : ns(l) && !Jo(l) || (f = vi(u))) : d = !1;
              }
              d && (s.set(u, f), i(f, u, a, o, s), s.delete(u));
              tr(e, n, f);
            }(e, t, s, n, Wr, a, i); else {
              var l = a ? a(Ni(e, s), o, s + "", e, t, i) : r;
              l === r && (l = o), tr(e, s, l);
            }
          }), js);
        }
        function Ur(e, t) {
          var n = e.length;
          if (n) return bi(t += t < 0 ? n : 0, n) ? e[t] : r;
        }
        function Vr(e, t, n) {
          t = t.length ? jt(t, (function(e) {
            return qo(e) ? function(t) {
              return Er(t, 1 === e.length ? e[0] : e);
            } : e;
          })) : [ il ];
          var r = -1;
          t = jt(t, Xt(ui()));
          var a = Hr(e, (function(e, n, a) {
            var i = jt(t, (function(t) {
              return t(e);
            }));
            return {
              criteria: i,
              index: ++r,
              value: e
            };
          }));
          return function(e, t) {
            var n = e.length;
            for (e.sort(t); n--; ) e[n] = e[n].value;
            return e;
          }(a, (function(e, t) {
            return function(e, t, n) {
              var r = -1, a = e.criteria, i = t.criteria, o = a.length, s = n.length;
              for (;++r < o; ) {
                var l = Ca(a[r], i[r]);
                if (l) return r >= s ? l : l * ("desc" == n[r] ? -1 : 1);
              }
              return e.index - t.index;
            }(e, t, n);
          }));
        }
        function qr(e, t, n) {
          for (var r = -1, a = t.length, i = {}; ++r < a; ) {
            var o = t[r], s = Er(e, o);
            n(s, o) && ea(i, wa(o, e), s);
          }
          return i;
        }
        function Zr(e, t, n, r) {
          var a = r ? Wt : Bt, i = -1, o = t.length, s = e;
          for (e === t && (t = Na(t)), n && (s = jt(e, Xt(n))); ++i < o; ) for (var l = 0, u = t[i], c = n ? n(u) : u; (l = a(s, c, l, r)) > -1; ) s !== e && Qe.call(s, l, 1), 
          Qe.call(e, l, 1);
          return e;
        }
        function Kr(e, t) {
          for (var n = e ? t.length : 0, r = n - 1; n--; ) {
            var a = t[n];
            if (n == r || a !== i) {
              var i = a;
              bi(a) ? Qe.call(e, a, 1) : da(e, a);
            }
          }
          return e;
        }
        function Yr(e, t) {
          return e + gt(_n() * (t - e + 1));
        }
        function Qr(e, t) {
          var n = "";
          if (!e || t < 1 || t > p) return n;
          do {
            t % 2 && (n += e), (t = gt(t / 2)) && (e += e);
          } while (t);
          return n;
        }
        function Gr(e, t) {
          return Li(Ci(e, t, il), e + "");
        }
        function Xr(e) {
          return Xn(Bs(e));
        }
        function Jr(e, t) {
          var n = Bs(e);
          return Ri(n, lr(t, 0, n.length));
        }
        function ea(e, t, n, a) {
          if (!ns(e)) return e;
          for (var i = -1, o = (t = wa(t, e)).length, s = o - 1, l = e; null != l && ++i < o; ) {
            var u = Di(t[i]), c = n;
            if ("__proto__" === u || "constructor" === u || "prototype" === u) return e;
            if (i != s) {
              var f = l[u];
              (c = a ? a(f, u, l) : r) === r && (c = ns(f) ? f : bi(t[i + 1]) ? [] : {});
            }
            nr(l, u, c), l = l[u];
          }
          return e;
        }
        var ta = Mn ? function(e, t) {
          return Mn.set(e, t), e;
        } : il, na = rt ? function(e, t) {
          return rt(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: nl(t),
            writable: !0
          });
        } : il;
        function ra(e) {
          return Ri(Bs(e));
        }
        function aa(e, t, n) {
          var r = -1, a = e.length;
          t < 0 && (t = -t > a ? 0 : a + t), (n = n > a ? a : n) < 0 && (n += a), a = t > n ? 0 : n - t >>> 0, 
          t >>>= 0;
          for (var i = oe(a); ++r < a; ) i[r] = e[r + t];
          return i;
        }
        function ia(e, t) {
          var n;
          return pr(e, (function(e, r, a) {
            return !(n = t(e, r, a));
          })), !!n;
        }
        function oa(e, t, n) {
          var r = 0, a = null == e ? r : e.length;
          if ("number" == typeof t && t == t && a <= 2147483647) {
            for (;r < a; ) {
              var i = r + a >>> 1, o = e[i];
              null !== o && !cs(o) && (n ? o <= t : o < t) ? r = i + 1 : a = i;
            }
            return a;
          }
          return sa(e, t, il, n);
        }
        function sa(e, t, n, a) {
          var i = 0, o = null == e ? 0 : e.length;
          if (0 === o) return 0;
          for (var s = (t = n(t)) != t, l = null === t, u = cs(t), c = t === r; i < o; ) {
            var f = gt((i + o) / 2), d = n(e[f]), p = d !== r, h = null === d, m = d == d, g = cs(d);
            if (s) var v = a || m; else v = c ? m && (a || p) : l ? m && p && (a || !h) : u ? m && p && !h && (a || !g) : !h && !g && (a ? d <= t : d < t);
            v ? i = f + 1 : o = f;
          }
          return wn(o, 4294967294);
        }
        function la(e, t) {
          for (var n = -1, r = e.length, a = 0, i = []; ++n < r; ) {
            var o = e[n], s = t ? t(o) : o;
            if (!n || !Bo(s, l)) {
              var l = s;
              i[a++] = 0 === o ? 0 : o;
            }
          }
          return i;
        }
        function ua(e) {
          return "number" == typeof e ? e : cs(e) ? h : +e;
        }
        function ca(e) {
          if ("string" == typeof e) return e;
          if (qo(e)) return jt(e, ca) + "";
          if (cs(e)) return Hn ? Hn.call(e) : "";
          var t = e + "";
          return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
        }
        function fa(e, t, n) {
          var r = -1, a = It, i = e.length, o = !0, s = [], l = s;
          if (n) o = !1, a = Lt; else if (i >= 200) {
            var u = t ? null : Qa(e);
            if (u) return dn(u);
            o = !1, a = en, l = new Yn;
          } else l = t ? [] : s;
          e: for (;++r < i; ) {
            var c = e[r], f = t ? t(c) : c;
            if (c = n || 0 !== c ? c : 0, o && f == f) {
              for (var d = l.length; d--; ) if (l[d] === f) continue e;
              t && l.push(f), s.push(c);
            } else a(l, f, n) || (l !== s && l.push(f), s.push(c));
          }
          return s;
        }
        function da(e, t) {
          return null == (e = Ti(e, t = wa(t, e))) || delete e[Di(Gi(t))];
        }
        function pa(e, t, n, r) {
          return ea(e, t, n(Er(e, t)), r);
        }
        function ha(e, t, n, r) {
          for (var a = e.length, i = r ? a : -1; (r ? i-- : ++i < a) && t(e[i], i, e); ) ;
          return n ? aa(e, r ? 0 : i, r ? i + 1 : a) : aa(e, r ? i + 1 : 0, r ? a : i);
        }
        function ma(e, t) {
          var n = e;
          return n instanceof Vn && (n = n.value()), Rt(t, (function(e, t) {
            return t.func.apply(t.thisArg, Pt([ e ], t.args));
          }), n);
        }
        function ga(e, t, n) {
          var r = e.length;
          if (r < 2) return r ? fa(e[0]) : [];
          for (var a = -1, i = oe(r); ++a < r; ) for (var o = e[a], s = -1; ++s < r; ) s != a && (i[a] = dr(i[a] || o, e[s], t, n));
          return fa(yr(i, 1), t, n);
        }
        function va(e, t, n) {
          for (var a = -1, i = e.length, o = t.length, s = {}; ++a < i; ) {
            var l = a < o ? t[a] : r;
            n(s, e[a], l);
          }
          return s;
        }
        function ya(e) {
          return Yo(e) ? e : [];
        }
        function ba(e) {
          return "function" == typeof e ? e : il;
        }
        function wa(e, t) {
          return qo(e) ? e : xi(e, t) ? [ e ] : zi(ws(e));
        }
        var xa = Gr;
        function ka(e, t, n) {
          var a = e.length;
          return n = n === r ? a : n, !t && n >= a ? e : aa(e, t, n);
        }
        var _a = ut || function(e) {
          return ht.clearTimeout(e);
        };
        function Ea(e, t) {
          if (t) return e.slice();
          var n = e.length, r = qe ? qe(n) : new e.constructor(n);
          return e.copy(r), r;
        }
        function Sa(e) {
          var t = new e.constructor(e.byteLength);
          return new Ve(t).set(new Ve(e)), t;
        }
        function Aa(e, t) {
          var n = t ? Sa(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.length);
        }
        function Ca(e, t) {
          if (e !== t) {
            var n = e !== r, a = null === e, i = e == e, o = cs(e), s = t !== r, l = null === t, u = t == t, c = cs(t);
            if (!l && !c && !o && e > t || o && s && u && !l && !c || a && s && u || !n && u || !i) return 1;
            if (!a && !o && !c && e < t || c && n && i && !a && !o || l && n && i || !s && i || !u) return -1;
          }
          return 0;
        }
        function Ta(e, t, n, r) {
          for (var a = -1, i = e.length, o = n.length, s = -1, l = t.length, u = bn(i - o, 0), c = oe(l + u), f = !r; ++s < l; ) c[s] = t[s];
          for (;++a < o; ) (f || a < i) && (c[n[a]] = e[a]);
          for (;u--; ) c[s++] = e[a++];
          return c;
        }
        function Oa(e, t, n, r) {
          for (var a = -1, i = e.length, o = -1, s = n.length, l = -1, u = t.length, c = bn(i - s, 0), f = oe(c + u), d = !r; ++a < c; ) f[a] = e[a];
          for (var p = a; ++l < u; ) f[p + l] = t[l];
          for (;++o < s; ) (d || a < i) && (f[p + n[o]] = e[a++]);
          return f;
        }
        function Na(e, t) {
          var n = -1, r = e.length;
          for (t || (t = oe(r)); ++n < r; ) t[n] = e[n];
          return t;
        }
        function Ma(e, t, n, a) {
          var i = !n;
          n || (n = {});
          for (var o = -1, s = t.length; ++o < s; ) {
            var l = t[o], u = a ? a(n[l], e[l], l, n, e) : r;
            u === r && (u = e[l]), i ? or(n, l, u) : nr(n, l, u);
          }
          return n;
        }
        function Ia(e, t) {
          return function(n, r) {
            var a = qo(n) ? Ct : ar, i = t ? t() : {};
            return a(n, e, ui(r, 2), i);
          };
        }
        function La(e) {
          return Gr((function(t, n) {
            var a = -1, i = n.length, o = i > 1 ? n[i - 1] : r, s = i > 2 ? n[2] : r;
            for (o = e.length > 3 && "function" == typeof o ? (i--, o) : r, s && wi(n[0], n[1], s) && (o = i < 3 ? r : o, 
            i = 1), t = Ce(t); ++a < i; ) {
              var l = n[a];
              l && e(t, l, a, o);
            }
            return t;
          }));
        }
        function ja(e, t) {
          return function(n, r) {
            if (null == n) return n;
            if (!Ko(n)) return e(n, r);
            for (var a = n.length, i = t ? a : -1, o = Ce(n); (t ? i-- : ++i < a) && !1 !== r(o[i], i, o); ) ;
            return n;
          };
        }
        function Pa(e) {
          return function(t, n, r) {
            for (var a = -1, i = Ce(t), o = r(t), s = o.length; s--; ) {
              var l = o[e ? s : ++a];
              if (!1 === n(i[l], l, i)) break;
            }
            return t;
          };
        }
        function Ra(e) {
          return function(t) {
            var n = ln(t = ws(t)) ? hn(t) : r, a = n ? n[0] : t.charAt(0), i = n ? ka(n, 1).join("") : t.slice(1);
            return a[e]() + i;
          };
        }
        function za(e) {
          return function(t) {
            return Rt(Js(Vs(t).replace(Je, "")), e, "");
          };
        }
        function Da(e) {
          return function() {
            var t = arguments;
            switch (t.length) {
             case 0:
              return new e;

             case 1:
              return new e(t[0]);

             case 2:
              return new e(t[0], t[1]);

             case 3:
              return new e(t[0], t[1], t[2]);

             case 4:
              return new e(t[0], t[1], t[2], t[3]);

             case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);

             case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);

             case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
            }
            var n = Bn(e.prototype), r = e.apply(n, t);
            return ns(r) ? r : n;
          };
        }
        function Fa(e) {
          return function(t, n, a) {
            var i = Ce(t);
            if (!Ko(t)) {
              var o = ui(n, 3);
              t = Ls(t), n = function(e) {
                return o(i[e], e, i);
              };
            }
            var s = e(t, n, a);
            return s > -1 ? i[o ? t[s] : s] : r;
          };
        }
        function Ha(e) {
          return ri((function(t) {
            var n = t.length, i = n, o = Un.prototype.thru;
            for (e && t.reverse(); i--; ) {
              var s = t[i];
              if ("function" != typeof s) throw new Ne(a);
              if (o && !l && "wrapper" == si(s)) var l = new Un([], !0);
            }
            for (i = l ? i : n; ++i < n; ) {
              var u = si(s = t[i]), c = "wrapper" == u ? oi(s) : r;
              l = c && ki(c[0]) && 424 == c[1] && !c[4].length && 1 == c[9] ? l[si(c[0])].apply(l, c[3]) : 1 == s.length && ki(s) ? l[u]() : l.thru(s);
            }
            return function() {
              var e = arguments, r = e[0];
              if (l && 1 == e.length && qo(r)) return l.plant(r).value();
              for (var a = 0, i = n ? t[a].apply(this, e) : r; ++a < n; ) i = t[a].call(this, i);
              return i;
            };
          }));
        }
        function $a(e, t, n, a, i, o, s, l, u, f) {
          var d = t & c, p = 1 & t, h = 2 & t, m = 24 & t, g = 512 & t, v = h ? r : Da(e);
          return function r() {
            for (var c = arguments.length, y = oe(c), b = c; b--; ) y[b] = arguments[b];
            if (m) var w = li(r), x = rn(y, w);
            if (a && (y = Ta(y, a, i, m)), o && (y = Oa(y, o, s, m)), c -= x, m && c < f) {
              var k = fn(y, w);
              return Ka(e, t, $a, r.placeholder, n, y, k, l, u, f - c);
            }
            var _ = p ? n : this, E = h ? _[e] : e;
            return c = y.length, l ? y = Oi(y, l) : g && c > 1 && y.reverse(), d && u < c && (y.length = u), 
            this && this !== ht && this instanceof r && (E = v || Da(E)), E.apply(_, y);
          };
        }
        function Ba(e, t) {
          return function(n, r) {
            return function(e, t, n, r) {
              return xr(e, (function(e, a, i) {
                t(r, n(e), a, i);
              })), r;
            }(n, e, t(r), {});
          };
        }
        function Wa(e, t) {
          return function(n, a) {
            var i;
            if (n === r && a === r) return t;
            if (n !== r && (i = n), a !== r) {
              if (i === r) return a;
              "string" == typeof n || "string" == typeof a ? (n = ca(n), a = ca(a)) : (n = ua(n), 
              a = ua(a)), i = e(n, a);
            }
            return i;
          };
        }
        function Ua(e) {
          return ri((function(t) {
            return t = jt(t, Xt(ui())), Gr((function(n) {
              var r = this;
              return e(t, (function(e) {
                return At(e, r, n);
              }));
            }));
          }));
        }
        function Va(e, t) {
          var n = (t = t === r ? " " : ca(t)).length;
          if (n < 2) return n ? Qr(t, e) : t;
          var a = Qr(t, mt(e / pn(t)));
          return ln(t) ? ka(hn(a), 0, e).join("") : a.slice(0, e);
        }
        function qa(e) {
          return function(t, n, a) {
            return a && "number" != typeof a && wi(t, n, a) && (n = a = r), t = ms(t), n === r ? (n = t, 
            t = 0) : n = ms(n), function(e, t, n, r) {
              for (var a = -1, i = bn(mt((t - e) / (n || 1)), 0), o = oe(i); i--; ) o[r ? i : ++a] = e, 
              e += n;
              return o;
            }(t, n, a = a === r ? t < n ? 1 : -1 : ms(a), e);
          };
        }
        function Za(e) {
          return function(t, n) {
            return "string" == typeof t && "string" == typeof n || (t = ys(t), n = ys(n)), e(t, n);
          };
        }
        function Ka(e, t, n, a, i, o, s, c, f, d) {
          var p = 8 & t;
          t |= p ? l : u, 4 & (t &= ~(p ? u : l)) || (t &= -4);
          var h = [ e, t, i, p ? o : r, p ? s : r, p ? r : o, p ? r : s, c, f, d ], m = n.apply(r, h);
          return ki(e) && Mi(m, h), m.placeholder = a, ji(m, e, t);
        }
        function Ya(e) {
          var t = Ae[e];
          return function(e, n) {
            if (e = ys(e), (n = null == n ? 0 : wn(gs(n), 292)) && Ft(e)) {
              var r = (ws(e) + "e").split("e");
              return +((r = (ws(t(r[0] + "e" + (+r[1] + n))) + "e").split("e"))[0] + "e" + (+r[1] - n));
            }
            return t(e);
          };
        }
        var Qa = Tn && 1 / dn(new Tn([ , -0 ]))[1] == d ? function(e) {
          return new Tn(e);
        } : cl;
        function Ga(e) {
          return function(t) {
            var n = mi(t);
            return n == E ? un(t) : n == O ? function(e) {
              var t = -1, n = Array(e.size);
              return e.forEach((function(e) {
                n[++t] = [ e, e ];
              })), n;
            }(t) : function(e, t) {
              return jt(t, (function(t) {
                return [ t, e[t] ];
              }));
            }(t, e(t));
          };
        }
        function Xa(e, t, n, i, d, p, h, m) {
          var g = 2 & t;
          if (!g && "function" != typeof e) throw new Ne(a);
          var v = i ? i.length : 0;
          if (v || (t &= -97, i = d = r), h = h === r ? h : bn(gs(h), 0), m = m === r ? m : gs(m), 
          v -= d ? d.length : 0, t & u) {
            var y = i, b = d;
            i = d = r;
          }
          var w = g ? r : oi(e), x = [ e, t, n, i, d, y, b, p, h, m ];
          if (w && function(e, t) {
            var n = e[1], r = t[1], a = n | r, i = a < 131, s = r == c && 8 == n || r == c && n == f && e[7].length <= t[8] || 384 == r && t[7].length <= t[8] && 8 == n;
            if (!i && !s) return e;
            1 & r && (e[2] = t[2], a |= 1 & n ? 0 : 4);
            var l = t[3];
            if (l) {
              var u = e[3];
              e[3] = u ? Ta(u, l, t[4]) : l, e[4] = u ? fn(e[3], o) : t[4];
            }
            (l = t[5]) && (u = e[5], e[5] = u ? Oa(u, l, t[6]) : l, e[6] = u ? fn(e[5], o) : t[6]);
            (l = t[7]) && (e[7] = l);
            r & c && (e[8] = null == e[8] ? t[8] : wn(e[8], t[8]));
            null == e[9] && (e[9] = t[9]);
            e[0] = t[0], e[1] = a;
          }(x, w), e = x[0], t = x[1], n = x[2], i = x[3], d = x[4], !(m = x[9] = x[9] === r ? g ? 0 : e.length : bn(x[9] - v, 0)) && 24 & t && (t &= -25), 
          t && 1 != t) k = 8 == t || t == s ? function(e, t, n) {
            var a = Da(e);
            return function i() {
              for (var o = arguments.length, s = oe(o), l = o, u = li(i); l--; ) s[l] = arguments[l];
              var c = o < 3 && s[0] !== u && s[o - 1] !== u ? [] : fn(s, u);
              return (o -= c.length) < n ? Ka(e, t, $a, i.placeholder, r, s, c, r, r, n - o) : At(this && this !== ht && this instanceof i ? a : e, this, s);
            };
          }(e, t, m) : t != l && 33 != t || d.length ? $a.apply(r, x) : function(e, t, n, r) {
            var a = 1 & t, i = Da(e);
            return function t() {
              for (var o = -1, s = arguments.length, l = -1, u = r.length, c = oe(u + s), f = this && this !== ht && this instanceof t ? i : e; ++l < u; ) c[l] = r[l];
              for (;s--; ) c[l++] = arguments[++o];
              return At(f, a ? n : this, c);
            };
          }(e, t, n, i); else var k = function(e, t, n) {
            var r = 1 & t, a = Da(e);
            return function t() {
              return (this && this !== ht && this instanceof t ? a : e).apply(r ? n : this, arguments);
            };
          }(e, t, n);
          return ji((w ? ta : Mi)(k, x), e, t);
        }
        function Ja(e, t, n, a) {
          return e === r || Bo(e, Le[n]) && !Re.call(a, n) ? t : e;
        }
        function ei(e, t, n, a, i, o) {
          return ns(e) && ns(t) && (o.set(t, e), Wr(e, t, r, ei, o), o.delete(t)), e;
        }
        function ti(e) {
          return os(e) ? r : e;
        }
        function ni(e, t, n, a, i, o) {
          var s = 1 & n, l = e.length, u = t.length;
          if (l != u && !(s && u > l)) return !1;
          var c = o.get(e), f = o.get(t);
          if (c && f) return c == t && f == e;
          var d = -1, p = !0, h = 2 & n ? new Yn : r;
          for (o.set(e, t), o.set(t, e); ++d < l; ) {
            var m = e[d], g = t[d];
            if (a) var v = s ? a(g, m, d, t, e, o) : a(m, g, d, e, t, o);
            if (v !== r) {
              if (v) continue;
              p = !1;
              break;
            }
            if (h) {
              if (!Dt(t, (function(e, t) {
                if (!en(h, t) && (m === e || i(m, e, n, a, o))) return h.push(t);
              }))) {
                p = !1;
                break;
              }
            } else if (m !== g && !i(m, g, n, a, o)) {
              p = !1;
              break;
            }
          }
          return o.delete(e), o.delete(t), p;
        }
        function ri(e) {
          return Li(Ci(e, r, qi), e + "");
        }
        function ai(e) {
          return Sr(e, Ls, pi);
        }
        function ii(e) {
          return Sr(e, js, hi);
        }
        var oi = Mn ? function(e) {
          return Mn.get(e);
        } : cl;
        function si(e) {
          for (var t = e.name + "", n = In[t], r = Re.call(In, t) ? n.length : 0; r--; ) {
            var a = n[r], i = a.func;
            if (null == i || i == e) return a.name;
          }
          return t;
        }
        function li(e) {
          return (Re.call($n, "placeholder") ? $n : e).placeholder;
        }
        function ui() {
          var e = $n.iteratee || ol;
          return e = e === ol ? Rr : e, arguments.length ? e(arguments[0], arguments[1]) : e;
        }
        function ci(e, t) {
          var n, r, a = e.__data__;
          return ("string" == (r = typeof (n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? a["string" == typeof t ? "string" : "hash"] : a.map;
        }
        function fi(e) {
          for (var t = Ls(e), n = t.length; n--; ) {
            var r = t[n], a = e[r];
            t[n] = [ r, a, Si(a) ];
          }
          return t;
        }
        function di(e, t) {
          var n = function(e, t) {
            return null == e ? r : e[t];
          }(e, t);
          return Pr(n) ? n : r;
        }
        var pi = yt ? function(e) {
          return null == e ? [] : (e = Ce(e), Mt(yt(e), (function(t) {
            return Ye.call(e, t);
          })));
        } : vl, hi = yt ? function(e) {
          for (var t = []; e; ) Pt(t, pi(e)), e = Ze(e);
          return t;
        } : vl, mi = Ar;
        function gi(e, t, n) {
          for (var r = -1, a = (t = wa(t, e)).length, i = !1; ++r < a; ) {
            var o = Di(t[r]);
            if (!(i = null != e && n(e, o))) break;
            e = e[o];
          }
          return i || ++r != a ? i : !!(a = null == e ? 0 : e.length) && ts(a) && bi(o, a) && (qo(e) || Vo(e));
        }
        function vi(e) {
          return "function" != typeof e.constructor || Ei(e) ? {} : Bn(Ze(e));
        }
        function yi(e) {
          return qo(e) || Vo(e) || !!(Ge && e && e[Ge]);
        }
        function bi(e, t) {
          var n = typeof e;
          return !!(t = null == t ? p : t) && ("number" == n || "symbol" != n && be.test(e)) && e > -1 && e % 1 == 0 && e < t;
        }
        function wi(e, t, n) {
          if (!ns(n)) return !1;
          var r = typeof t;
          return !!("number" == r ? Ko(n) && bi(t, n.length) : "string" == r && t in n) && Bo(n[t], e);
        }
        function xi(e, t) {
          if (qo(e)) return !1;
          var n = typeof e;
          return !("number" != n && "symbol" != n && "boolean" != n && null != e && !cs(e)) || (te.test(e) || !ee.test(e) || null != t && e in Ce(t));
        }
        function ki(e) {
          var t = si(e), n = $n[t];
          if ("function" != typeof n || !(t in Vn.prototype)) return !1;
          if (e === n) return !0;
          var r = oi(n);
          return !!r && e === r[0];
        }
        (Sn && mi(new Sn(new ArrayBuffer(1))) != j || An && mi(new An) != E || Cn && mi(Cn.resolve()) != C || Tn && mi(new Tn) != O || On && mi(new On) != I) && (mi = function(e) {
          var t = Ar(e), n = t == A ? e.constructor : r, a = n ? Fi(n) : "";
          if (a) switch (a) {
           case Ln:
            return j;

           case jn:
            return E;

           case Pn:
            return C;

           case Rn:
            return O;

           case zn:
            return I;
          }
          return t;
        });
        var _i = je ? Jo : yl;
        function Ei(e) {
          var t = e && e.constructor;
          return e === ("function" == typeof t && t.prototype || Le);
        }
        function Si(e) {
          return e == e && !ns(e);
        }
        function Ai(e, t) {
          return function(n) {
            return null != n && (n[e] === t && (t !== r || e in Ce(n)));
          };
        }
        function Ci(e, t, n) {
          return t = bn(t === r ? e.length - 1 : t, 0), function() {
            for (var r = arguments, a = -1, i = bn(r.length - t, 0), o = oe(i); ++a < i; ) o[a] = r[t + a];
            a = -1;
            for (var s = oe(t + 1); ++a < t; ) s[a] = r[a];
            return s[t] = n(o), At(e, this, s);
          };
        }
        function Ti(e, t) {
          return t.length < 2 ? e : Er(e, aa(t, 0, -1));
        }
        function Oi(e, t) {
          for (var n = e.length, a = wn(t.length, n), i = Na(e); a--; ) {
            var o = t[a];
            e[a] = bi(o, n) ? i[o] : r;
          }
          return e;
        }
        function Ni(e, t) {
          if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t) return e[t];
        }
        var Mi = Pi(ta), Ii = pt || function(e, t) {
          return ht.setTimeout(e, t);
        }, Li = Pi(na);
        function ji(e, t, n) {
          var r = t + "";
          return Li(e, function(e, t) {
            var n = t.length;
            if (!n) return e;
            var r = n - 1;
            return t[r] = (n > 1 ? "& " : "") + t[r], t = t.join(n > 2 ? ", " : " "), e.replace(se, "{\n/* [wrapped with " + t + "] */\n");
          }(r, function(e, t) {
            return Tt(g, (function(n) {
              var r = "_." + n[0];
              t & n[1] && !It(e, r) && e.push(r);
            })), e.sort();
          }(function(e) {
            var t = e.match(le);
            return t ? t[1].split(ue) : [];
          }(r), n)));
        }
        function Pi(e) {
          var t = 0, n = 0;
          return function() {
            var a = xn(), i = 16 - (a - n);
            if (n = a, i > 0) {
              if (++t >= 800) return arguments[0];
            } else t = 0;
            return e.apply(r, arguments);
          };
        }
        function Ri(e, t) {
          var n = -1, a = e.length, i = a - 1;
          for (t = t === r ? a : t; ++n < t; ) {
            var o = Yr(n, i), s = e[o];
            e[o] = e[n], e[n] = s;
          }
          return e.length = t, e;
        }
        var zi = function(e) {
          var t = Ro(e, (function(e) {
            return 500 === n.size && n.clear(), e;
          })), n = t.cache;
          return t;
        }((function(e) {
          var t = [];
          return 46 === e.charCodeAt(0) && t.push(""), e.replace(ne, (function(e, n, r, a) {
            t.push(r ? a.replace(de, "$1") : n || e);
          })), t;
        }));
        function Di(e) {
          if ("string" == typeof e || cs(e)) return e;
          var t = e + "";
          return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
        }
        function Fi(e) {
          if (null != e) {
            try {
              return Pe.call(e);
            } catch (e) {}
            try {
              return e + "";
            } catch (e) {}
          }
          return "";
        }
        function Hi(e) {
          if (e instanceof Vn) return e.clone();
          var t = new Un(e.__wrapped__, e.__chain__);
          return t.__actions__ = Na(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, 
          t;
        }
        var $i = Gr((function(e, t) {
          return Yo(e) ? dr(e, yr(t, 1, Yo, !0)) : [];
        })), Bi = Gr((function(e, t) {
          var n = Gi(t);
          return Yo(n) && (n = r), Yo(e) ? dr(e, yr(t, 1, Yo, !0), ui(n, 2)) : [];
        })), Wi = Gr((function(e, t) {
          var n = Gi(t);
          return Yo(n) && (n = r), Yo(e) ? dr(e, yr(t, 1, Yo, !0), r, n) : [];
        }));
        function Ui(e, t, n) {
          var r = null == e ? 0 : e.length;
          if (!r) return -1;
          var a = null == n ? 0 : gs(n);
          return a < 0 && (a = bn(r + a, 0)), $t(e, ui(t, 3), a);
        }
        function Vi(e, t, n) {
          var a = null == e ? 0 : e.length;
          if (!a) return -1;
          var i = a - 1;
          return n !== r && (i = gs(n), i = n < 0 ? bn(a + i, 0) : wn(i, a - 1)), $t(e, ui(t, 3), i, !0);
        }
        function qi(e) {
          return (null == e ? 0 : e.length) ? yr(e, 1) : [];
        }
        function Zi(e) {
          return e && e.length ? e[0] : r;
        }
        var Ki = Gr((function(e) {
          var t = jt(e, ya);
          return t.length && t[0] === e[0] ? Nr(t) : [];
        })), Yi = Gr((function(e) {
          var t = Gi(e), n = jt(e, ya);
          return t === Gi(n) ? t = r : n.pop(), n.length && n[0] === e[0] ? Nr(n, ui(t, 2)) : [];
        })), Qi = Gr((function(e) {
          var t = Gi(e), n = jt(e, ya);
          return (t = "function" == typeof t ? t : r) && n.pop(), n.length && n[0] === e[0] ? Nr(n, r, t) : [];
        }));
        function Gi(e) {
          var t = null == e ? 0 : e.length;
          return t ? e[t - 1] : r;
        }
        var Xi = Gr(Ji);
        function Ji(e, t) {
          return e && e.length && t && t.length ? Zr(e, t) : e;
        }
        var eo = ri((function(e, t) {
          var n = null == e ? 0 : e.length, r = sr(e, t);
          return Kr(e, jt(t, (function(e) {
            return bi(e, n) ? +e : e;
          })).sort(Ca)), r;
        }));
        function to(e) {
          return null == e ? e : En.call(e);
        }
        var no = Gr((function(e) {
          return fa(yr(e, 1, Yo, !0));
        })), ro = Gr((function(e) {
          var t = Gi(e);
          return Yo(t) && (t = r), fa(yr(e, 1, Yo, !0), ui(t, 2));
        })), ao = Gr((function(e) {
          var t = Gi(e);
          return t = "function" == typeof t ? t : r, fa(yr(e, 1, Yo, !0), r, t);
        }));
        function io(e) {
          if (!e || !e.length) return [];
          var t = 0;
          return e = Mt(e, (function(e) {
            if (Yo(e)) return t = bn(e.length, t), !0;
          })), Qt(t, (function(t) {
            return jt(e, qt(t));
          }));
        }
        function oo(e, t) {
          if (!e || !e.length) return [];
          var n = io(e);
          return null == t ? n : jt(n, (function(e) {
            return At(t, r, e);
          }));
        }
        var so = Gr((function(e, t) {
          return Yo(e) ? dr(e, t) : [];
        })), lo = Gr((function(e) {
          return ga(Mt(e, Yo));
        })), uo = Gr((function(e) {
          var t = Gi(e);
          return Yo(t) && (t = r), ga(Mt(e, Yo), ui(t, 2));
        })), co = Gr((function(e) {
          var t = Gi(e);
          return t = "function" == typeof t ? t : r, ga(Mt(e, Yo), r, t);
        })), fo = Gr(io);
        var po = Gr((function(e) {
          var t = e.length, n = t > 1 ? e[t - 1] : r;
          return n = "function" == typeof n ? (e.pop(), n) : r, oo(e, n);
        }));
        function ho(e) {
          var t = $n(e);
          return t.__chain__ = !0, t;
        }
        function mo(e, t) {
          return t(e);
        }
        var go = ri((function(e) {
          var t = e.length, n = t ? e[0] : 0, a = this.__wrapped__, i = function(t) {
            return sr(t, e);
          };
          return !(t > 1 || this.__actions__.length) && a instanceof Vn && bi(n) ? ((a = a.slice(n, +n + (t ? 1 : 0))).__actions__.push({
            func: mo,
            args: [ i ],
            thisArg: r
          }), new Un(a, this.__chain__).thru((function(e) {
            return t && !e.length && e.push(r), e;
          }))) : this.thru(i);
        }));
        var vo = Ia((function(e, t, n) {
          Re.call(e, n) ? ++e[n] : or(e, n, 1);
        }));
        var yo = Fa(Ui), bo = Fa(Vi);
        function wo(e, t) {
          return (qo(e) ? Tt : pr)(e, ui(t, 3));
        }
        function xo(e, t) {
          return (qo(e) ? Ot : hr)(e, ui(t, 3));
        }
        var ko = Ia((function(e, t, n) {
          Re.call(e, n) ? e[n].push(t) : or(e, n, [ t ]);
        }));
        var _o = Gr((function(e, t, n) {
          var r = -1, a = "function" == typeof t, i = Ko(e) ? oe(e.length) : [];
          return pr(e, (function(e) {
            i[++r] = a ? At(t, e, n) : Mr(e, t, n);
          })), i;
        })), Eo = Ia((function(e, t, n) {
          or(e, n, t);
        }));
        function So(e, t) {
          return (qo(e) ? jt : Hr)(e, ui(t, 3));
        }
        var Ao = Ia((function(e, t, n) {
          e[n ? 0 : 1].push(t);
        }), (function() {
          return [ [], [] ];
        }));
        var Co = Gr((function(e, t) {
          if (null == e) return [];
          var n = t.length;
          return n > 1 && wi(e, t[0], t[1]) ? t = [] : n > 2 && wi(t[0], t[1], t[2]) && (t = [ t[0] ]), 
          Vr(e, yr(t, 1), []);
        })), To = dt || function() {
          return ht.Date.now();
        };
        function Oo(e, t, n) {
          return t = n ? r : t, t = e && null == t ? e.length : t, Xa(e, c, r, r, r, r, t);
        }
        function No(e, t) {
          var n;
          if ("function" != typeof t) throw new Ne(a);
          return e = gs(e), function() {
            return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = r), n;
          };
        }
        var Mo = Gr((function(e, t, n) {
          var r = 1;
          if (n.length) {
            var a = fn(n, li(Mo));
            r |= l;
          }
          return Xa(e, r, t, n, a);
        })), Io = Gr((function(e, t, n) {
          var r = 3;
          if (n.length) {
            var a = fn(n, li(Io));
            r |= l;
          }
          return Xa(t, r, e, n, a);
        }));
        function Lo(e, t, n) {
          var i, o, s, l, u, c, f = 0, d = !1, p = !1, h = !0;
          if ("function" != typeof e) throw new Ne(a);
          function m(t) {
            var n = i, a = o;
            return i = o = r, f = t, l = e.apply(a, n);
          }
          function g(e) {
            return f = e, u = Ii(y, t), d ? m(e) : l;
          }
          function v(e) {
            var n = e - c;
            return c === r || n >= t || n < 0 || p && e - f >= s;
          }
          function y() {
            var e = To();
            if (v(e)) return b(e);
            u = Ii(y, function(e) {
              var n = t - (e - c);
              return p ? wn(n, s - (e - f)) : n;
            }(e));
          }
          function b(e) {
            return u = r, h && i ? m(e) : (i = o = r, l);
          }
          function w() {
            var e = To(), n = v(e);
            if (i = arguments, o = this, c = e, n) {
              if (u === r) return g(c);
              if (p) return _a(u), u = Ii(y, t), m(c);
            }
            return u === r && (u = Ii(y, t)), l;
          }
          return t = ys(t) || 0, ns(n) && (d = !!n.leading, s = (p = "maxWait" in n) ? bn(ys(n.maxWait) || 0, t) : s, 
          h = "trailing" in n ? !!n.trailing : h), w.cancel = function() {
            u !== r && _a(u), f = 0, i = c = o = u = r;
          }, w.flush = function() {
            return u === r ? l : b(To());
          }, w;
        }
        var jo = Gr((function(e, t) {
          return fr(e, 1, t);
        })), Po = Gr((function(e, t, n) {
          return fr(e, ys(t) || 0, n);
        }));
        function Ro(e, t) {
          if ("function" != typeof e || null != t && "function" != typeof t) throw new Ne(a);
          var n = function() {
            var r = arguments, a = t ? t.apply(this, r) : r[0], i = n.cache;
            if (i.has(a)) return i.get(a);
            var o = e.apply(this, r);
            return n.cache = i.set(a, o) || i, o;
          };
          return n.cache = new (Ro.Cache || Kn), n;
        }
        function zo(e) {
          if ("function" != typeof e) throw new Ne(a);
          return function() {
            var t = arguments;
            switch (t.length) {
             case 0:
              return !e.call(this);

             case 1:
              return !e.call(this, t[0]);

             case 2:
              return !e.call(this, t[0], t[1]);

             case 3:
              return !e.call(this, t[0], t[1], t[2]);
            }
            return !e.apply(this, t);
          };
        }
        Ro.Cache = Kn;
        var Do = xa((function(e, t) {
          var n = (t = 1 == t.length && qo(t[0]) ? jt(t[0], Xt(ui())) : jt(yr(t, 1), Xt(ui()))).length;
          return Gr((function(r) {
            for (var a = -1, i = wn(r.length, n); ++a < i; ) r[a] = t[a].call(this, r[a]);
            return At(e, this, r);
          }));
        })), Fo = Gr((function(e, t) {
          var n = fn(t, li(Fo));
          return Xa(e, l, r, t, n);
        })), Ho = Gr((function(e, t) {
          var n = fn(t, li(Ho));
          return Xa(e, u, r, t, n);
        })), $o = ri((function(e, t) {
          return Xa(e, f, r, r, r, t);
        }));
        function Bo(e, t) {
          return e === t || e != e && t != t;
        }
        var Wo = Za(Cr), Uo = Za((function(e, t) {
          return e >= t;
        })), Vo = Ir(function() {
          return arguments;
        }()) ? Ir : function(e) {
          return rs(e) && Re.call(e, "callee") && !Ye.call(e, "callee");
        }, qo = oe.isArray, Zo = wt ? Xt(wt) : function(e) {
          return rs(e) && Ar(e) == L;
        };
        function Ko(e) {
          return null != e && ts(e.length) && !Jo(e);
        }
        function Yo(e) {
          return rs(e) && Ko(e);
        }
        var Qo = bt || yl, Go = xt ? Xt(xt) : function(e) {
          return rs(e) && Ar(e) == w;
        };
        function Xo(e) {
          if (!rs(e)) return !1;
          var t = Ar(e);
          return t == x || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !os(e);
        }
        function Jo(e) {
          if (!ns(e)) return !1;
          var t = Ar(e);
          return t == k || t == _ || "[object AsyncFunction]" == t || "[object Proxy]" == t;
        }
        function es(e) {
          return "number" == typeof e && e == gs(e);
        }
        function ts(e) {
          return "number" == typeof e && e > -1 && e % 1 == 0 && e <= p;
        }
        function ns(e) {
          var t = typeof e;
          return null != e && ("object" == t || "function" == t);
        }
        function rs(e) {
          return null != e && "object" == typeof e;
        }
        var as = kt ? Xt(kt) : function(e) {
          return rs(e) && mi(e) == E;
        };
        function is(e) {
          return "number" == typeof e || rs(e) && Ar(e) == S;
        }
        function os(e) {
          if (!rs(e) || Ar(e) != A) return !1;
          var t = Ze(e);
          if (null === t) return !0;
          var n = Re.call(t, "constructor") && t.constructor;
          return "function" == typeof n && n instanceof n && Pe.call(n) == He;
        }
        var ss = _t ? Xt(_t) : function(e) {
          return rs(e) && Ar(e) == T;
        };
        var ls = Et ? Xt(Et) : function(e) {
          return rs(e) && mi(e) == O;
        };
        function us(e) {
          return "string" == typeof e || !qo(e) && rs(e) && Ar(e) == N;
        }
        function cs(e) {
          return "symbol" == typeof e || rs(e) && Ar(e) == M;
        }
        var fs = St ? Xt(St) : function(e) {
          return rs(e) && ts(e.length) && !!st[Ar(e)];
        };
        var ds = Za(Fr), ps = Za((function(e, t) {
          return e <= t;
        }));
        function hs(e) {
          if (!e) return [];
          if (Ko(e)) return us(e) ? hn(e) : Na(e);
          if (Xe && e[Xe]) return function(e) {
            for (var t, n = []; !(t = e.next()).done; ) n.push(t.value);
            return n;
          }(e[Xe]());
          var t = mi(e);
          return (t == E ? un : t == O ? dn : Bs)(e);
        }
        function ms(e) {
          return e ? (e = ys(e)) === d || e === -1 / 0 ? 17976931348623157e292 * (e < 0 ? -1 : 1) : e == e ? e : 0 : 0 === e ? e : 0;
        }
        function gs(e) {
          var t = ms(e), n = t % 1;
          return t == t ? n ? t - n : t : 0;
        }
        function vs(e) {
          return e ? lr(gs(e), 0, m) : 0;
        }
        function ys(e) {
          if ("number" == typeof e) return e;
          if (cs(e)) return h;
          if (ns(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = ns(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = Gt(e);
          var n = ge.test(e);
          return n || ye.test(e) ? ft(e.slice(2), n ? 2 : 8) : me.test(e) ? h : +e;
        }
        function bs(e) {
          return Ma(e, js(e));
        }
        function ws(e) {
          return null == e ? "" : ca(e);
        }
        var xs = La((function(e, t) {
          if (Ei(t) || Ko(t)) Ma(t, Ls(t), e); else for (var n in t) Re.call(t, n) && nr(e, n, t[n]);
        })), ks = La((function(e, t) {
          Ma(t, js(t), e);
        })), _s = La((function(e, t, n, r) {
          Ma(t, js(t), e, r);
        })), Es = La((function(e, t, n, r) {
          Ma(t, Ls(t), e, r);
        })), Ss = ri(sr);
        var As = Gr((function(e, t) {
          e = Ce(e);
          var n = -1, a = t.length, i = a > 2 ? t[2] : r;
          for (i && wi(t[0], t[1], i) && (a = 1); ++n < a; ) for (var o = t[n], s = js(o), l = -1, u = s.length; ++l < u; ) {
            var c = s[l], f = e[c];
            (f === r || Bo(f, Le[c]) && !Re.call(e, c)) && (e[c] = o[c]);
          }
          return e;
        })), Cs = Gr((function(e) {
          return e.push(r, ei), At(Rs, r, e);
        }));
        function Ts(e, t, n) {
          var a = null == e ? r : Er(e, t);
          return a === r ? n : a;
        }
        function Os(e, t) {
          return null != e && gi(e, t, Or);
        }
        var Ns = Ba((function(e, t, n) {
          null != t && "function" != typeof t.toString && (t = Fe.call(t)), e[t] = n;
        }), nl(il)), Ms = Ba((function(e, t, n) {
          null != t && "function" != typeof t.toString && (t = Fe.call(t)), Re.call(e, t) ? e[t].push(n) : e[t] = [ n ];
        }), ui), Is = Gr(Mr);
        function Ls(e) {
          return Ko(e) ? Gn(e) : zr(e);
        }
        function js(e) {
          return Ko(e) ? Gn(e, !0) : Dr(e);
        }
        var Ps = La((function(e, t, n) {
          Wr(e, t, n);
        })), Rs = La((function(e, t, n, r) {
          Wr(e, t, n, r);
        })), zs = ri((function(e, t) {
          var n = {};
          if (null == e) return n;
          var r = !1;
          t = jt(t, (function(t) {
            return t = wa(t, e), r || (r = t.length > 1), t;
          })), Ma(e, ii(e), n), r && (n = ur(n, 7, ti));
          for (var a = t.length; a--; ) da(n, t[a]);
          return n;
        }));
        var Ds = ri((function(e, t) {
          return null == e ? {} : function(e, t) {
            return qr(e, t, (function(t, n) {
              return Os(e, n);
            }));
          }(e, t);
        }));
        function Fs(e, t) {
          if (null == e) return {};
          var n = jt(ii(e), (function(e) {
            return [ e ];
          }));
          return t = ui(t), qr(e, n, (function(e, n) {
            return t(e, n[0]);
          }));
        }
        var Hs = Ga(Ls), $s = Ga(js);
        function Bs(e) {
          return null == e ? [] : Jt(e, Ls(e));
        }
        var Ws = za((function(e, t, n) {
          return t = t.toLowerCase(), e + (n ? Us(t) : t);
        }));
        function Us(e) {
          return Xs(ws(e).toLowerCase());
        }
        function Vs(e) {
          return (e = ws(e)) && e.replace(we, an).replace(et, "");
        }
        var qs = za((function(e, t, n) {
          return e + (n ? "-" : "") + t.toLowerCase();
        })), Zs = za((function(e, t, n) {
          return e + (n ? " " : "") + t.toLowerCase();
        })), Ks = Ra("toLowerCase");
        var Ys = za((function(e, t, n) {
          return e + (n ? "_" : "") + t.toLowerCase();
        }));
        var Qs = za((function(e, t, n) {
          return e + (n ? " " : "") + Xs(t);
        }));
        var Gs = za((function(e, t, n) {
          return e + (n ? " " : "") + t.toUpperCase();
        })), Xs = Ra("toUpperCase");
        function Js(e, t, n) {
          return e = ws(e), (t = n ? r : t) === r ? function(e) {
            return at.test(e);
          }(e) ? function(e) {
            return e.match(nt) || [];
          }(e) : function(e) {
            return e.match(ce) || [];
          }(e) : e.match(t) || [];
        }
        var el = Gr((function(e, t) {
          try {
            return At(e, r, t);
          } catch (e) {
            return Xo(e) ? e : new Ee(e);
          }
        })), tl = ri((function(e, t) {
          return Tt(t, (function(t) {
            t = Di(t), or(e, t, Mo(e[t], e));
          })), e;
        }));
        function nl(e) {
          return function() {
            return e;
          };
        }
        var rl = Ha(), al = Ha(!0);
        function il(e) {
          return e;
        }
        function ol(e) {
          return Rr("function" == typeof e ? e : ur(e, 1));
        }
        var sl = Gr((function(e, t) {
          return function(n) {
            return Mr(n, e, t);
          };
        })), ll = Gr((function(e, t) {
          return function(n) {
            return Mr(e, n, t);
          };
        }));
        function ul(e, t, n) {
          var r = Ls(t), a = _r(t, r);
          null != n || ns(t) && (a.length || !r.length) || (n = t, t = e, e = this, a = _r(t, Ls(t)));
          var i = !(ns(n) && "chain" in n && !n.chain), o = Jo(e);
          return Tt(a, (function(n) {
            var r = t[n];
            e[n] = r, o && (e.prototype[n] = function() {
              var t = this.__chain__;
              if (i || t) {
                var n = e(this.__wrapped__), a = n.__actions__ = Na(this.__actions__);
                return a.push({
                  func: r,
                  args: arguments,
                  thisArg: e
                }), n.__chain__ = t, n;
              }
              return r.apply(e, Pt([ this.value() ], arguments));
            });
          })), e;
        }
        function cl() {}
        var fl = Ua(jt), dl = Ua(Nt), pl = Ua(Dt);
        function hl(e) {
          return xi(e) ? qt(Di(e)) : function(e) {
            return function(t) {
              return Er(t, e);
            };
          }(e);
        }
        var ml = qa(), gl = qa(!0);
        function vl() {
          return [];
        }
        function yl() {
          return !1;
        }
        var bl = Wa((function(e, t) {
          return e + t;
        }), 0), wl = Ya("ceil"), xl = Wa((function(e, t) {
          return e / t;
        }), 1), kl = Ya("floor");
        var _l, El = Wa((function(e, t) {
          return e * t;
        }), 1), Sl = Ya("round"), Al = Wa((function(e, t) {
          return e - t;
        }), 0);
        return $n.after = function(e, t) {
          if ("function" != typeof t) throw new Ne(a);
          return e = gs(e), function() {
            if (--e < 1) return t.apply(this, arguments);
          };
        }, $n.ary = Oo, $n.assign = xs, $n.assignIn = ks, $n.assignInWith = _s, $n.assignWith = Es, 
        $n.at = Ss, $n.before = No, $n.bind = Mo, $n.bindAll = tl, $n.bindKey = Io, $n.castArray = function() {
          if (!arguments.length) return [];
          var e = arguments[0];
          return qo(e) ? e : [ e ];
        }, $n.chain = ho, $n.chunk = function(e, t, n) {
          t = (n ? wi(e, t, n) : t === r) ? 1 : bn(gs(t), 0);
          var a = null == e ? 0 : e.length;
          if (!a || t < 1) return [];
          for (var i = 0, o = 0, s = oe(mt(a / t)); i < a; ) s[o++] = aa(e, i, i += t);
          return s;
        }, $n.compact = function(e) {
          for (var t = -1, n = null == e ? 0 : e.length, r = 0, a = []; ++t < n; ) {
            var i = e[t];
            i && (a[r++] = i);
          }
          return a;
        }, $n.concat = function() {
          var e = arguments.length;
          if (!e) return [];
          for (var t = oe(e - 1), n = arguments[0], r = e; r--; ) t[r - 1] = arguments[r];
          return Pt(qo(n) ? Na(n) : [ n ], yr(t, 1));
        }, $n.cond = function(e) {
          var t = null == e ? 0 : e.length, n = ui();
          return e = t ? jt(e, (function(e) {
            if ("function" != typeof e[1]) throw new Ne(a);
            return [ n(e[0]), e[1] ];
          })) : [], Gr((function(n) {
            for (var r = -1; ++r < t; ) {
              var a = e[r];
              if (At(a[0], this, n)) return At(a[1], this, n);
            }
          }));
        }, $n.conforms = function(e) {
          return function(e) {
            var t = Ls(e);
            return function(n) {
              return cr(n, e, t);
            };
          }(ur(e, 1));
        }, $n.constant = nl, $n.countBy = vo, $n.create = function(e, t) {
          var n = Bn(e);
          return null == t ? n : ir(n, t);
        }, $n.curry = function e(t, n, a) {
          var i = Xa(t, 8, r, r, r, r, r, n = a ? r : n);
          return i.placeholder = e.placeholder, i;
        }, $n.curryRight = function e(t, n, a) {
          var i = Xa(t, s, r, r, r, r, r, n = a ? r : n);
          return i.placeholder = e.placeholder, i;
        }, $n.debounce = Lo, $n.defaults = As, $n.defaultsDeep = Cs, $n.defer = jo, $n.delay = Po, 
        $n.difference = $i, $n.differenceBy = Bi, $n.differenceWith = Wi, $n.drop = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          return a ? aa(e, (t = n || t === r ? 1 : gs(t)) < 0 ? 0 : t, a) : [];
        }, $n.dropRight = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          return a ? aa(e, 0, (t = a - (t = n || t === r ? 1 : gs(t))) < 0 ? 0 : t) : [];
        }, $n.dropRightWhile = function(e, t) {
          return e && e.length ? ha(e, ui(t, 3), !0, !0) : [];
        }, $n.dropWhile = function(e, t) {
          return e && e.length ? ha(e, ui(t, 3), !0) : [];
        }, $n.fill = function(e, t, n, a) {
          var i = null == e ? 0 : e.length;
          return i ? (n && "number" != typeof n && wi(e, t, n) && (n = 0, a = i), function(e, t, n, a) {
            var i = e.length;
            for ((n = gs(n)) < 0 && (n = -n > i ? 0 : i + n), (a = a === r || a > i ? i : gs(a)) < 0 && (a += i), 
            a = n > a ? 0 : vs(a); n < a; ) e[n++] = t;
            return e;
          }(e, t, n, a)) : [];
        }, $n.filter = function(e, t) {
          return (qo(e) ? Mt : vr)(e, ui(t, 3));
        }, $n.flatMap = function(e, t) {
          return yr(So(e, t), 1);
        }, $n.flatMapDeep = function(e, t) {
          return yr(So(e, t), d);
        }, $n.flatMapDepth = function(e, t, n) {
          return n = n === r ? 1 : gs(n), yr(So(e, t), n);
        }, $n.flatten = qi, $n.flattenDeep = function(e) {
          return (null == e ? 0 : e.length) ? yr(e, d) : [];
        }, $n.flattenDepth = function(e, t) {
          return (null == e ? 0 : e.length) ? yr(e, t = t === r ? 1 : gs(t)) : [];
        }, $n.flip = function(e) {
          return Xa(e, 512);
        }, $n.flow = rl, $n.flowRight = al, $n.fromPairs = function(e) {
          for (var t = -1, n = null == e ? 0 : e.length, r = {}; ++t < n; ) {
            var a = e[t];
            r[a[0]] = a[1];
          }
          return r;
        }, $n.functions = function(e) {
          return null == e ? [] : _r(e, Ls(e));
        }, $n.functionsIn = function(e) {
          return null == e ? [] : _r(e, js(e));
        }, $n.groupBy = ko, $n.initial = function(e) {
          return (null == e ? 0 : e.length) ? aa(e, 0, -1) : [];
        }, $n.intersection = Ki, $n.intersectionBy = Yi, $n.intersectionWith = Qi, $n.invert = Ns, 
        $n.invertBy = Ms, $n.invokeMap = _o, $n.iteratee = ol, $n.keyBy = Eo, $n.keys = Ls, 
        $n.keysIn = js, $n.map = So, $n.mapKeys = function(e, t) {
          var n = {};
          return t = ui(t, 3), xr(e, (function(e, r, a) {
            or(n, t(e, r, a), e);
          })), n;
        }, $n.mapValues = function(e, t) {
          var n = {};
          return t = ui(t, 3), xr(e, (function(e, r, a) {
            or(n, r, t(e, r, a));
          })), n;
        }, $n.matches = function(e) {
          return $r(ur(e, 1));
        }, $n.matchesProperty = function(e, t) {
          return Br(e, ur(t, 1));
        }, $n.memoize = Ro, $n.merge = Ps, $n.mergeWith = Rs, $n.method = sl, $n.methodOf = ll, 
        $n.mixin = ul, $n.negate = zo, $n.nthArg = function(e) {
          return e = gs(e), Gr((function(t) {
            return Ur(t, e);
          }));
        }, $n.omit = zs, $n.omitBy = function(e, t) {
          return Fs(e, zo(ui(t)));
        }, $n.once = function(e) {
          return No(2, e);
        }, $n.orderBy = function(e, t, n, a) {
          return null == e ? [] : (qo(t) || (t = null == t ? [] : [ t ]), qo(n = a ? r : n) || (n = null == n ? [] : [ n ]), 
          Vr(e, t, n));
        }, $n.over = fl, $n.overArgs = Do, $n.overEvery = dl, $n.overSome = pl, $n.partial = Fo, 
        $n.partialRight = Ho, $n.partition = Ao, $n.pick = Ds, $n.pickBy = Fs, $n.property = hl, 
        $n.propertyOf = function(e) {
          return function(t) {
            return null == e ? r : Er(e, t);
          };
        }, $n.pull = Xi, $n.pullAll = Ji, $n.pullAllBy = function(e, t, n) {
          return e && e.length && t && t.length ? Zr(e, t, ui(n, 2)) : e;
        }, $n.pullAllWith = function(e, t, n) {
          return e && e.length && t && t.length ? Zr(e, t, r, n) : e;
        }, $n.pullAt = eo, $n.range = ml, $n.rangeRight = gl, $n.rearg = $o, $n.reject = function(e, t) {
          return (qo(e) ? Mt : vr)(e, zo(ui(t, 3)));
        }, $n.remove = function(e, t) {
          var n = [];
          if (!e || !e.length) return n;
          var r = -1, a = [], i = e.length;
          for (t = ui(t, 3); ++r < i; ) {
            var o = e[r];
            t(o, r, e) && (n.push(o), a.push(r));
          }
          return Kr(e, a), n;
        }, $n.rest = function(e, t) {
          if ("function" != typeof e) throw new Ne(a);
          return Gr(e, t = t === r ? t : gs(t));
        }, $n.reverse = to, $n.sampleSize = function(e, t, n) {
          return t = (n ? wi(e, t, n) : t === r) ? 1 : gs(t), (qo(e) ? Jn : Jr)(e, t);
        }, $n.set = function(e, t, n) {
          return null == e ? e : ea(e, t, n);
        }, $n.setWith = function(e, t, n, a) {
          return a = "function" == typeof a ? a : r, null == e ? e : ea(e, t, n, a);
        }, $n.shuffle = function(e) {
          return (qo(e) ? er : ra)(e);
        }, $n.slice = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          return a ? (n && "number" != typeof n && wi(e, t, n) ? (t = 0, n = a) : (t = null == t ? 0 : gs(t), 
          n = n === r ? a : gs(n)), aa(e, t, n)) : [];
        }, $n.sortBy = Co, $n.sortedUniq = function(e) {
          return e && e.length ? la(e) : [];
        }, $n.sortedUniqBy = function(e, t) {
          return e && e.length ? la(e, ui(t, 2)) : [];
        }, $n.split = function(e, t, n) {
          return n && "number" != typeof n && wi(e, t, n) && (t = n = r), (n = n === r ? m : n >>> 0) ? (e = ws(e)) && ("string" == typeof t || null != t && !ss(t)) && !(t = ca(t)) && ln(e) ? ka(hn(e), 0, n) : e.split(t, n) : [];
        }, $n.spread = function(e, t) {
          if ("function" != typeof e) throw new Ne(a);
          return t = null == t ? 0 : bn(gs(t), 0), Gr((function(n) {
            var r = n[t], a = ka(n, 0, t);
            return r && Pt(a, r), At(e, this, a);
          }));
        }, $n.tail = function(e) {
          var t = null == e ? 0 : e.length;
          return t ? aa(e, 1, t) : [];
        }, $n.take = function(e, t, n) {
          return e && e.length ? aa(e, 0, (t = n || t === r ? 1 : gs(t)) < 0 ? 0 : t) : [];
        }, $n.takeRight = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          return a ? aa(e, (t = a - (t = n || t === r ? 1 : gs(t))) < 0 ? 0 : t, a) : [];
        }, $n.takeRightWhile = function(e, t) {
          return e && e.length ? ha(e, ui(t, 3), !1, !0) : [];
        }, $n.takeWhile = function(e, t) {
          return e && e.length ? ha(e, ui(t, 3)) : [];
        }, $n.tap = function(e, t) {
          return t(e), e;
        }, $n.throttle = function(e, t, n) {
          var r = !0, i = !0;
          if ("function" != typeof e) throw new Ne(a);
          return ns(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), 
          Lo(e, t, {
            leading: r,
            maxWait: t,
            trailing: i
          });
        }, $n.thru = mo, $n.toArray = hs, $n.toPairs = Hs, $n.toPairsIn = $s, $n.toPath = function(e) {
          return qo(e) ? jt(e, Di) : cs(e) ? [ e ] : Na(zi(ws(e)));
        }, $n.toPlainObject = bs, $n.transform = function(e, t, n) {
          var r = qo(e), a = r || Qo(e) || fs(e);
          if (t = ui(t, 4), null == n) {
            var i = e && e.constructor;
            n = a ? r ? new i : [] : ns(e) && Jo(i) ? Bn(Ze(e)) : {};
          }
          return (a ? Tt : xr)(e, (function(e, r, a) {
            return t(n, e, r, a);
          })), n;
        }, $n.unary = function(e) {
          return Oo(e, 1);
        }, $n.union = no, $n.unionBy = ro, $n.unionWith = ao, $n.uniq = function(e) {
          return e && e.length ? fa(e) : [];
        }, $n.uniqBy = function(e, t) {
          return e && e.length ? fa(e, ui(t, 2)) : [];
        }, $n.uniqWith = function(e, t) {
          return t = "function" == typeof t ? t : r, e && e.length ? fa(e, r, t) : [];
        }, $n.unset = function(e, t) {
          return null == e || da(e, t);
        }, $n.unzip = io, $n.unzipWith = oo, $n.update = function(e, t, n) {
          return null == e ? e : pa(e, t, ba(n));
        }, $n.updateWith = function(e, t, n, a) {
          return a = "function" == typeof a ? a : r, null == e ? e : pa(e, t, ba(n), a);
        }, $n.values = Bs, $n.valuesIn = function(e) {
          return null == e ? [] : Jt(e, js(e));
        }, $n.without = so, $n.words = Js, $n.wrap = function(e, t) {
          return Fo(ba(t), e);
        }, $n.xor = lo, $n.xorBy = uo, $n.xorWith = co, $n.zip = fo, $n.zipObject = function(e, t) {
          return va(e || [], t || [], nr);
        }, $n.zipObjectDeep = function(e, t) {
          return va(e || [], t || [], ea);
        }, $n.zipWith = po, $n.entries = Hs, $n.entriesIn = $s, $n.extend = ks, $n.extendWith = _s, 
        ul($n, $n), $n.add = bl, $n.attempt = el, $n.camelCase = Ws, $n.capitalize = Us, 
        $n.ceil = wl, $n.clamp = function(e, t, n) {
          return n === r && (n = t, t = r), n !== r && (n = (n = ys(n)) == n ? n : 0), t !== r && (t = (t = ys(t)) == t ? t : 0), 
          lr(ys(e), t, n);
        }, $n.clone = function(e) {
          return ur(e, 4);
        }, $n.cloneDeep = function(e) {
          return ur(e, 5);
        }, $n.cloneDeepWith = function(e, t) {
          return ur(e, 5, t = "function" == typeof t ? t : r);
        }, $n.cloneWith = function(e, t) {
          return ur(e, 4, t = "function" == typeof t ? t : r);
        }, $n.conformsTo = function(e, t) {
          return null == t || cr(e, t, Ls(t));
        }, $n.deburr = Vs, $n.defaultTo = function(e, t) {
          return null == e || e != e ? t : e;
        }, $n.divide = xl, $n.endsWith = function(e, t, n) {
          e = ws(e), t = ca(t);
          var a = e.length, i = n = n === r ? a : lr(gs(n), 0, a);
          return (n -= t.length) >= 0 && e.slice(n, i) == t;
        }, $n.eq = Bo, $n.escape = function(e) {
          return (e = ws(e)) && Q.test(e) ? e.replace(K, on) : e;
        }, $n.escapeRegExp = function(e) {
          return (e = ws(e)) && ae.test(e) ? e.replace(re, "\\$&") : e;
        }, $n.every = function(e, t, n) {
          var a = qo(e) ? Nt : mr;
          return n && wi(e, t, n) && (t = r), a(e, ui(t, 3));
        }, $n.find = yo, $n.findIndex = Ui, $n.findKey = function(e, t) {
          return Ht(e, ui(t, 3), xr);
        }, $n.findLast = bo, $n.findLastIndex = Vi, $n.findLastKey = function(e, t) {
          return Ht(e, ui(t, 3), kr);
        }, $n.floor = kl, $n.forEach = wo, $n.forEachRight = xo, $n.forIn = function(e, t) {
          return null == e ? e : br(e, ui(t, 3), js);
        }, $n.forInRight = function(e, t) {
          return null == e ? e : wr(e, ui(t, 3), js);
        }, $n.forOwn = function(e, t) {
          return e && xr(e, ui(t, 3));
        }, $n.forOwnRight = function(e, t) {
          return e && kr(e, ui(t, 3));
        }, $n.get = Ts, $n.gt = Wo, $n.gte = Uo, $n.has = function(e, t) {
          return null != e && gi(e, t, Tr);
        }, $n.hasIn = Os, $n.head = Zi, $n.identity = il, $n.includes = function(e, t, n, r) {
          e = Ko(e) ? e : Bs(e), n = n && !r ? gs(n) : 0;
          var a = e.length;
          return n < 0 && (n = bn(a + n, 0)), us(e) ? n <= a && e.indexOf(t, n) > -1 : !!a && Bt(e, t, n) > -1;
        }, $n.indexOf = function(e, t, n) {
          var r = null == e ? 0 : e.length;
          if (!r) return -1;
          var a = null == n ? 0 : gs(n);
          return a < 0 && (a = bn(r + a, 0)), Bt(e, t, a);
        }, $n.inRange = function(e, t, n) {
          return t = ms(t), n === r ? (n = t, t = 0) : n = ms(n), function(e, t, n) {
            return e >= wn(t, n) && e < bn(t, n);
          }(e = ys(e), t, n);
        }, $n.invoke = Is, $n.isArguments = Vo, $n.isArray = qo, $n.isArrayBuffer = Zo, 
        $n.isArrayLike = Ko, $n.isArrayLikeObject = Yo, $n.isBoolean = function(e) {
          return !0 === e || !1 === e || rs(e) && Ar(e) == b;
        }, $n.isBuffer = Qo, $n.isDate = Go, $n.isElement = function(e) {
          return rs(e) && 1 === e.nodeType && !os(e);
        }, $n.isEmpty = function(e) {
          if (null == e) return !0;
          if (Ko(e) && (qo(e) || "string" == typeof e || "function" == typeof e.splice || Qo(e) || fs(e) || Vo(e))) return !e.length;
          var t = mi(e);
          if (t == E || t == O) return !e.size;
          if (Ei(e)) return !zr(e).length;
          for (var n in e) if (Re.call(e, n)) return !1;
          return !0;
        }, $n.isEqual = function(e, t) {
          return Lr(e, t);
        }, $n.isEqualWith = function(e, t, n) {
          var a = (n = "function" == typeof n ? n : r) ? n(e, t) : r;
          return a === r ? Lr(e, t, r, n) : !!a;
        }, $n.isError = Xo, $n.isFinite = function(e) {
          return "number" == typeof e && Ft(e);
        }, $n.isFunction = Jo, $n.isInteger = es, $n.isLength = ts, $n.isMap = as, $n.isMatch = function(e, t) {
          return e === t || jr(e, t, fi(t));
        }, $n.isMatchWith = function(e, t, n) {
          return n = "function" == typeof n ? n : r, jr(e, t, fi(t), n);
        }, $n.isNaN = function(e) {
          return is(e) && e != +e;
        }, $n.isNative = function(e) {
          if (_i(e)) throw new Ee("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
          return Pr(e);
        }, $n.isNil = function(e) {
          return null == e;
        }, $n.isNull = function(e) {
          return null === e;
        }, $n.isNumber = is, $n.isObject = ns, $n.isObjectLike = rs, $n.isPlainObject = os, 
        $n.isRegExp = ss, $n.isSafeInteger = function(e) {
          return es(e) && e >= -9007199254740991 && e <= p;
        }, $n.isSet = ls, $n.isString = us, $n.isSymbol = cs, $n.isTypedArray = fs, $n.isUndefined = function(e) {
          return e === r;
        }, $n.isWeakMap = function(e) {
          return rs(e) && mi(e) == I;
        }, $n.isWeakSet = function(e) {
          return rs(e) && "[object WeakSet]" == Ar(e);
        }, $n.join = function(e, t) {
          return null == e ? "" : Zt.call(e, t);
        }, $n.kebabCase = qs, $n.last = Gi, $n.lastIndexOf = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          if (!a) return -1;
          var i = a;
          return n !== r && (i = (i = gs(n)) < 0 ? bn(a + i, 0) : wn(i, a - 1)), t == t ? function(e, t, n) {
            for (var r = n + 1; r--; ) if (e[r] === t) return r;
            return r;
          }(e, t, i) : $t(e, Ut, i, !0);
        }, $n.lowerCase = Zs, $n.lowerFirst = Ks, $n.lt = ds, $n.lte = ps, $n.max = function(e) {
          return e && e.length ? gr(e, il, Cr) : r;
        }, $n.maxBy = function(e, t) {
          return e && e.length ? gr(e, ui(t, 2), Cr) : r;
        }, $n.mean = function(e) {
          return Vt(e, il);
        }, $n.meanBy = function(e, t) {
          return Vt(e, ui(t, 2));
        }, $n.min = function(e) {
          return e && e.length ? gr(e, il, Fr) : r;
        }, $n.minBy = function(e, t) {
          return e && e.length ? gr(e, ui(t, 2), Fr) : r;
        }, $n.stubArray = vl, $n.stubFalse = yl, $n.stubObject = function() {
          return {};
        }, $n.stubString = function() {
          return "";
        }, $n.stubTrue = function() {
          return !0;
        }, $n.multiply = El, $n.nth = function(e, t) {
          return e && e.length ? Ur(e, gs(t)) : r;
        }, $n.noConflict = function() {
          return ht._ === this && (ht._ = $e), this;
        }, $n.noop = cl, $n.now = To, $n.pad = function(e, t, n) {
          e = ws(e);
          var r = (t = gs(t)) ? pn(e) : 0;
          if (!t || r >= t) return e;
          var a = (t - r) / 2;
          return Va(gt(a), n) + e + Va(mt(a), n);
        }, $n.padEnd = function(e, t, n) {
          e = ws(e);
          var r = (t = gs(t)) ? pn(e) : 0;
          return t && r < t ? e + Va(t - r, n) : e;
        }, $n.padStart = function(e, t, n) {
          e = ws(e);
          var r = (t = gs(t)) ? pn(e) : 0;
          return t && r < t ? Va(t - r, n) + e : e;
        }, $n.parseInt = function(e, t, n) {
          return n || null == t ? t = 0 : t && (t = +t), kn(ws(e).replace(ie, ""), t || 0);
        }, $n.random = function(e, t, n) {
          if (n && "boolean" != typeof n && wi(e, t, n) && (t = n = r), n === r && ("boolean" == typeof t ? (n = t, 
          t = r) : "boolean" == typeof e && (n = e, e = r)), e === r && t === r ? (e = 0, 
          t = 1) : (e = ms(e), t === r ? (t = e, e = 0) : t = ms(t)), e > t) {
            var a = e;
            e = t, t = a;
          }
          if (n || e % 1 || t % 1) {
            var i = _n();
            return wn(e + i * (t - e + ct("1e-" + ((i + "").length - 1))), t);
          }
          return Yr(e, t);
        }, $n.reduce = function(e, t, n) {
          var r = qo(e) ? Rt : Kt, a = arguments.length < 3;
          return r(e, ui(t, 4), n, a, pr);
        }, $n.reduceRight = function(e, t, n) {
          var r = qo(e) ? zt : Kt, a = arguments.length < 3;
          return r(e, ui(t, 4), n, a, hr);
        }, $n.repeat = function(e, t, n) {
          return t = (n ? wi(e, t, n) : t === r) ? 1 : gs(t), Qr(ws(e), t);
        }, $n.replace = function() {
          var e = arguments, t = ws(e[0]);
          return e.length < 3 ? t : t.replace(e[1], e[2]);
        }, $n.result = function(e, t, n) {
          var a = -1, i = (t = wa(t, e)).length;
          for (i || (i = 1, e = r); ++a < i; ) {
            var o = null == e ? r : e[Di(t[a])];
            o === r && (a = i, o = n), e = Jo(o) ? o.call(e) : o;
          }
          return e;
        }, $n.round = Sl, $n.runInContext = e, $n.sample = function(e) {
          return (qo(e) ? Xn : Xr)(e);
        }, $n.size = function(e) {
          if (null == e) return 0;
          if (Ko(e)) return us(e) ? pn(e) : e.length;
          var t = mi(e);
          return t == E || t == O ? e.size : zr(e).length;
        }, $n.snakeCase = Ys, $n.some = function(e, t, n) {
          var a = qo(e) ? Dt : ia;
          return n && wi(e, t, n) && (t = r), a(e, ui(t, 3));
        }, $n.sortedIndex = function(e, t) {
          return oa(e, t);
        }, $n.sortedIndexBy = function(e, t, n) {
          return sa(e, t, ui(n, 2));
        }, $n.sortedIndexOf = function(e, t) {
          var n = null == e ? 0 : e.length;
          if (n) {
            var r = oa(e, t);
            if (r < n && Bo(e[r], t)) return r;
          }
          return -1;
        }, $n.sortedLastIndex = function(e, t) {
          return oa(e, t, !0);
        }, $n.sortedLastIndexBy = function(e, t, n) {
          return sa(e, t, ui(n, 2), !0);
        }, $n.sortedLastIndexOf = function(e, t) {
          if (null == e ? 0 : e.length) {
            var n = oa(e, t, !0) - 1;
            if (Bo(e[n], t)) return n;
          }
          return -1;
        }, $n.startCase = Qs, $n.startsWith = function(e, t, n) {
          return e = ws(e), n = null == n ? 0 : lr(gs(n), 0, e.length), t = ca(t), e.slice(n, n + t.length) == t;
        }, $n.subtract = Al, $n.sum = function(e) {
          return e && e.length ? Yt(e, il) : 0;
        }, $n.sumBy = function(e, t) {
          return e && e.length ? Yt(e, ui(t, 2)) : 0;
        }, $n.template = function(e, t, n) {
          var a = $n.templateSettings;
          n && wi(e, t, n) && (t = r), e = ws(e), t = _s({}, t, a, Ja);
          var i, o, s = _s({}, t.imports, a.imports, Ja), l = Ls(s), u = Jt(s, l), c = 0, f = t.interpolate || xe, d = "__p += '", p = Te((t.escape || xe).source + "|" + f.source + "|" + (f === J ? pe : xe).source + "|" + (t.evaluate || xe).source + "|$", "g"), h = "//# sourceURL=" + (Re.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ot + "]") + "\n";
          e.replace(p, (function(t, n, r, a, s, l) {
            return r || (r = a), d += e.slice(c, l).replace(ke, sn), n && (i = !0, d += "' +\n__e(" + n + ") +\n'"), 
            s && (o = !0, d += "';\n" + s + ";\n__p += '"), r && (d += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), 
            c = l + t.length, t;
          })), d += "';\n";
          var m = Re.call(t, "variable") && t.variable;
          if (m) {
            if (fe.test(m)) throw new Ee("Invalid `variable` option passed into `_.template`");
          } else d = "with (obj) {\n" + d + "\n}\n";
          d = (o ? d.replace(U, "") : d).replace(V, "$1").replace(q, "$1;"), d = "function(" + (m || "obj") + ") {\n" + (m ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (i ? ", __e = _.escape" : "") + (o ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + d + "return __p\n}";
          var g = el((function() {
            return Se(l, h + "return " + d).apply(r, u);
          }));
          if (g.source = d, Xo(g)) throw g;
          return g;
        }, $n.times = function(e, t) {
          if ((e = gs(e)) < 1 || e > p) return [];
          var n = m, r = wn(e, m);
          t = ui(t), e -= m;
          for (var a = Qt(r, t); ++n < e; ) t(n);
          return a;
        }, $n.toFinite = ms, $n.toInteger = gs, $n.toLength = vs, $n.toLower = function(e) {
          return ws(e).toLowerCase();
        }, $n.toNumber = ys, $n.toSafeInteger = function(e) {
          return e ? lr(gs(e), -9007199254740991, p) : 0 === e ? e : 0;
        }, $n.toString = ws, $n.toUpper = function(e) {
          return ws(e).toUpperCase();
        }, $n.trim = function(e, t, n) {
          if ((e = ws(e)) && (n || t === r)) return Gt(e);
          if (!e || !(t = ca(t))) return e;
          var a = hn(e), i = hn(t);
          return ka(a, tn(a, i), nn(a, i) + 1).join("");
        }, $n.trimEnd = function(e, t, n) {
          if ((e = ws(e)) && (n || t === r)) return e.slice(0, mn(e) + 1);
          if (!e || !(t = ca(t))) return e;
          var a = hn(e);
          return ka(a, 0, nn(a, hn(t)) + 1).join("");
        }, $n.trimStart = function(e, t, n) {
          if ((e = ws(e)) && (n || t === r)) return e.replace(ie, "");
          if (!e || !(t = ca(t))) return e;
          var a = hn(e);
          return ka(a, tn(a, hn(t))).join("");
        }, $n.truncate = function(e, t) {
          var n = 30, a = "...";
          if (ns(t)) {
            var i = "separator" in t ? t.separator : i;
            n = "length" in t ? gs(t.length) : n, a = "omission" in t ? ca(t.omission) : a;
          }
          var o = (e = ws(e)).length;
          if (ln(e)) {
            var s = hn(e);
            o = s.length;
          }
          if (n >= o) return e;
          var l = n - pn(a);
          if (l < 1) return a;
          var u = s ? ka(s, 0, l).join("") : e.slice(0, l);
          if (i === r) return u + a;
          if (s && (l += u.length - l), ss(i)) {
            if (e.slice(l).search(i)) {
              var c, f = u;
              for (i.global || (i = Te(i.source, ws(he.exec(i)) + "g")), i.lastIndex = 0; c = i.exec(f); ) var d = c.index;
              u = u.slice(0, d === r ? l : d);
            }
          } else if (e.indexOf(ca(i), l) != l) {
            var p = u.lastIndexOf(i);
            p > -1 && (u = u.slice(0, p));
          }
          return u + a;
        }, $n.unescape = function(e) {
          return (e = ws(e)) && Y.test(e) ? e.replace(Z, gn) : e;
        }, $n.uniqueId = function(e) {
          var t = ++ze;
          return ws(e) + t;
        }, $n.upperCase = Gs, $n.upperFirst = Xs, $n.each = wo, $n.eachRight = xo, $n.first = Zi, 
        ul($n, (_l = {}, xr($n, (function(e, t) {
          Re.call($n.prototype, t) || (_l[t] = e);
        })), _l), {
          chain: !1
        }), $n.VERSION = "4.17.21", Tt([ "bind", "bindKey", "curry", "curryRight", "partial", "partialRight" ], (function(e) {
          $n[e].placeholder = $n;
        })), Tt([ "drop", "take" ], (function(e, t) {
          Vn.prototype[e] = function(n) {
            n = n === r ? 1 : bn(gs(n), 0);
            var a = this.__filtered__ && !t ? new Vn(this) : this.clone();
            return a.__filtered__ ? a.__takeCount__ = wn(n, a.__takeCount__) : a.__views__.push({
              size: wn(n, m),
              type: e + (a.__dir__ < 0 ? "Right" : "")
            }), a;
          }, Vn.prototype[e + "Right"] = function(t) {
            return this.reverse()[e](t).reverse();
          };
        })), Tt([ "filter", "map", "takeWhile" ], (function(e, t) {
          var n = t + 1, r = 1 == n || 3 == n;
          Vn.prototype[e] = function(e) {
            var t = this.clone();
            return t.__iteratees__.push({
              iteratee: ui(e, 3),
              type: n
            }), t.__filtered__ = t.__filtered__ || r, t;
          };
        })), Tt([ "head", "last" ], (function(e, t) {
          var n = "take" + (t ? "Right" : "");
          Vn.prototype[e] = function() {
            return this[n](1).value()[0];
          };
        })), Tt([ "initial", "tail" ], (function(e, t) {
          var n = "drop" + (t ? "" : "Right");
          Vn.prototype[e] = function() {
            return this.__filtered__ ? new Vn(this) : this[n](1);
          };
        })), Vn.prototype.compact = function() {
          return this.filter(il);
        }, Vn.prototype.find = function(e) {
          return this.filter(e).head();
        }, Vn.prototype.findLast = function(e) {
          return this.reverse().find(e);
        }, Vn.prototype.invokeMap = Gr((function(e, t) {
          return "function" == typeof e ? new Vn(this) : this.map((function(n) {
            return Mr(n, e, t);
          }));
        })), Vn.prototype.reject = function(e) {
          return this.filter(zo(ui(e)));
        }, Vn.prototype.slice = function(e, t) {
          e = gs(e);
          var n = this;
          return n.__filtered__ && (e > 0 || t < 0) ? new Vn(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), 
          t !== r && (n = (t = gs(t)) < 0 ? n.dropRight(-t) : n.take(t - e)), n);
        }, Vn.prototype.takeRightWhile = function(e) {
          return this.reverse().takeWhile(e).reverse();
        }, Vn.prototype.toArray = function() {
          return this.take(m);
        }, xr(Vn.prototype, (function(e, t) {
          var n = /^(?:filter|find|map|reject)|While$/.test(t), a = /^(?:head|last)$/.test(t), i = $n[a ? "take" + ("last" == t ? "Right" : "") : t], o = a || /^find/.test(t);
          i && ($n.prototype[t] = function() {
            var t = this.__wrapped__, s = a ? [ 1 ] : arguments, l = t instanceof Vn, u = s[0], c = l || qo(t), f = function(e) {
              var t = i.apply($n, Pt([ e ], s));
              return a && d ? t[0] : t;
            };
            c && n && "function" == typeof u && 1 != u.length && (l = c = !1);
            var d = this.__chain__, p = !!this.__actions__.length, h = o && !d, m = l && !p;
            if (!o && c) {
              t = m ? t : new Vn(this);
              var g = e.apply(t, s);
              return g.__actions__.push({
                func: mo,
                args: [ f ],
                thisArg: r
              }), new Un(g, d);
            }
            return h && m ? e.apply(this, s) : (g = this.thru(f), h ? a ? g.value()[0] : g.value() : g);
          });
        })), Tt([ "pop", "push", "shift", "sort", "splice", "unshift" ], (function(e) {
          var t = Me[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(e);
          $n.prototype[e] = function() {
            var e = arguments;
            if (r && !this.__chain__) {
              var a = this.value();
              return t.apply(qo(a) ? a : [], e);
            }
            return this[n]((function(n) {
              return t.apply(qo(n) ? n : [], e);
            }));
          };
        })), xr(Vn.prototype, (function(e, t) {
          var n = $n[t];
          if (n) {
            var r = n.name + "";
            Re.call(In, r) || (In[r] = []), In[r].push({
              name: t,
              func: n
            });
          }
        })), In[$a(r, 2).name] = [ {
          name: "wrapper",
          func: r
        } ], Vn.prototype.clone = function() {
          var e = new Vn(this.__wrapped__);
          return e.__actions__ = Na(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, 
          e.__iteratees__ = Na(this.__iteratees__), e.__takeCount__ = this.__takeCount__, 
          e.__views__ = Na(this.__views__), e;
        }, Vn.prototype.reverse = function() {
          if (this.__filtered__) {
            var e = new Vn(this);
            e.__dir__ = -1, e.__filtered__ = !0;
          } else (e = this.clone()).__dir__ *= -1;
          return e;
        }, Vn.prototype.value = function() {
          var e = this.__wrapped__.value(), t = this.__dir__, n = qo(e), r = t < 0, a = n ? e.length : 0, i = function(e, t, n) {
            var r = -1, a = n.length;
            for (;++r < a; ) {
              var i = n[r], o = i.size;
              switch (i.type) {
               case "drop":
                e += o;
                break;

               case "dropRight":
                t -= o;
                break;

               case "take":
                t = wn(t, e + o);
                break;

               case "takeRight":
                e = bn(e, t - o);
              }
            }
            return {
              start: e,
              end: t
            };
          }(0, a, this.__views__), o = i.start, s = i.end, l = s - o, u = r ? s : o - 1, c = this.__iteratees__, f = c.length, d = 0, p = wn(l, this.__takeCount__);
          if (!n || !r && a == l && p == l) return ma(e, this.__actions__);
          var h = [];
          e: for (;l-- && d < p; ) {
            for (var m = -1, g = e[u += t]; ++m < f; ) {
              var v = c[m], y = v.iteratee, b = v.type, w = y(g);
              if (2 == b) g = w; else if (!w) {
                if (1 == b) continue e;
                break e;
              }
            }
            h[d++] = g;
          }
          return h;
        }, $n.prototype.at = go, $n.prototype.chain = function() {
          return ho(this);
        }, $n.prototype.commit = function() {
          return new Un(this.value(), this.__chain__);
        }, $n.prototype.next = function() {
          this.__values__ === r && (this.__values__ = hs(this.value()));
          var e = this.__index__ >= this.__values__.length;
          return {
            done: e,
            value: e ? r : this.__values__[this.__index__++]
          };
        }, $n.prototype.plant = function(e) {
          for (var t, n = this; n instanceof Wn; ) {
            var a = Hi(n);
            a.__index__ = 0, a.__values__ = r, t ? i.__wrapped__ = a : t = a;
            var i = a;
            n = n.__wrapped__;
          }
          return i.__wrapped__ = e, t;
        }, $n.prototype.reverse = function() {
          var e = this.__wrapped__;
          if (e instanceof Vn) {
            var t = e;
            return this.__actions__.length && (t = new Vn(this)), (t = t.reverse()).__actions__.push({
              func: mo,
              args: [ to ],
              thisArg: r
            }), new Un(t, this.__chain__);
          }
          return this.thru(to);
        }, $n.prototype.toJSON = $n.prototype.valueOf = $n.prototype.value = function() {
          return ma(this.__wrapped__, this.__actions__);
        }, $n.prototype.first = $n.prototype.head, Xe && ($n.prototype[Xe] = function() {
          return this;
        }), $n;
      }();
      "function" == typeof define && "object" == typeof define.amd && define.amd ? (ht._ = vn, 
      define((function() {
        return vn;
      }))) : gt ? ((gt.exports = vn)._ = vn, mt._ = vn) : ht._ = vn;
    }).call(this);
  }));
  var o = i("dBVaG");
  window.requestIdleCallback = window.requestIdleCallback || function(e) {
    var t = Date.now();
    return setTimeout((function() {
      e({
        didTimeout: !1,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - t));
        }
      });
    }), 1);
  }, window.cancelIdleCallback = window.cancelIdleCallback || function(e) {
    clearTimeout(e);
  };
  o = i("dBVaG");
  let s = [];
  function l() {
    return s;
  }
  o = i("dBVaG");
  let u, c;
  async function f() {
    void 0 !== u && void 0 !== c || ({tabId: u, frameId: c} = await n(o).runtime.sendMessage({
      type: "getContentScriptContext"
    }));
  }
  function d() {
    if (void 0 === u) throw new Error("Unable to retrieve tabId. Context script context is not loaded");
    return u;
  }
  async function p() {
    return await n(o).runtime.sendMessage({
      type: "isCurrentTab"
    });
  }
  function h() {
    if (void 0 === c) throw new Error("Unable to retrieve frameId. Context script context is not loaded");
    return 0 === c;
  }
  async function m() {
    return c || await f(), c;
  }
  function g(e, t, n, r) {
    return new (n || (n = Promise))((function(a, i) {
      function o(e) {
        try {
          l(r.next(e));
        } catch (e) {
          i(e);
        }
      }
      function s(e) {
        try {
          l(r.throw(e));
        } catch (e) {
          i(e);
        }
      }
      function l(e) {
        var t;
        e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
          e(t);
        }))).then(o, s);
      }
      l((r = r.apply(e, t || [])).next());
    }));
  }
  function v(e, t) {
    var n, r, a, i, o = {
      label: 0,
      sent: function() {
        if (1 & a[0]) throw a[1];
        return a[1];
      },
      trys: [],
      ops: []
    };
    return i = {
      next: s(0),
      throw: s(1),
      return: s(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
      return this;
    }), i;
    function s(s) {
      return function(l) {
        return function(s) {
          if (n) throw new TypeError("Generator is already executing.");
          for (;i && (i = 0, s[0] && (o = 0)), o; ) try {
            if (n = 1, r && (a = 2 & s[0] ? r.return : s[0] ? r.throw || ((a = r.return) && a.call(r), 
            0) : r.next) && !(a = a.call(r, s[1])).done) return a;
            switch (r = 0, a && (s = [ 2 & s[0], a.value ]), s[0]) {
             case 0:
             case 1:
              a = s;
              break;

             case 4:
              return o.label++, {
                value: s[1],
                done: !1
              };

             case 5:
              o.label++, r = s[1], s = [ 0 ];
              continue;

             case 7:
              s = o.ops.pop(), o.trys.pop();
              continue;

             default:
              if (!(a = o.trys, (a = a.length > 0 && a[a.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                o = 0;
                continue;
              }
              if (3 === s[0] && (!a || s[1] > a[0] && s[1] < a[3])) {
                o.label = s[1];
                break;
              }
              if (6 === s[0] && o.label < a[1]) {
                o.label = a[1], a = s;
                break;
              }
              if (a && o.label < a[2]) {
                o.label = a[2], o.ops.push(s);
                break;
              }
              a[2] && o.ops.pop(), o.trys.pop();
              continue;
            }
            s = t.call(e, o);
          } catch (e) {
            s = [ 6, e ], r = 0;
          } finally {
            n = a = 0;
          }
          if (5 & s[0]) throw s[1];
          return {
            value: s[0] ? s[1] : void 0,
            done: !0
          };
        }([ s, l ]);
      };
    }
  }
  Object.create;
  Object.create;
  new Error("timeout while waiting for mutex to become available"), new Error("mutex already locked");
  var y = new Error("request for lock canceled"), b = function() {
    function e(e, t) {
      if (void 0 === t && (t = y), this._maxConcurrency = e, this._cancelError = t, this._queue = [], 
      this._waiters = [], e <= 0) throw new Error("semaphore must be initialized to a positive value");
      this._value = e;
    }
    return e.prototype.acquire = function() {
      var e = this, t = this.isLocked(), n = new Promise((function(t, n) {
        return e._queue.push({
          resolve: t,
          reject: n
        });
      }));
      return t || this._dispatch(), n;
    }, e.prototype.runExclusive = function(e) {
      return g(this, void 0, void 0, (function() {
        var t, n, r;
        return v(this, (function(a) {
          switch (a.label) {
           case 0:
            return [ 4, this.acquire() ];

           case 1:
            t = a.sent(), n = t[0], r = t[1], a.label = 2;

           case 2:
            return a.trys.push([ 2, , 4, 5 ]), [ 4, e(n) ];

           case 3:
            return [ 2, a.sent() ];

           case 4:
            return r(), [ 7 ];

           case 5:
            return [ 2 ];
          }
        }));
      }));
    }, e.prototype.waitForUnlock = function() {
      return g(this, void 0, void 0, (function() {
        var e = this;
        return v(this, (function(t) {
          return this.isLocked() ? [ 2, new Promise((function(t) {
            return e._waiters.push({
              resolve: t
            });
          })) ] : [ 2, Promise.resolve() ];
        }));
      }));
    }, e.prototype.isLocked = function() {
      return this._value <= 0;
    }, e.prototype.release = function() {
      if (this._maxConcurrency > 1) throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");
      if (this._currentReleaser) {
        var e = this._currentReleaser;
        this._currentReleaser = void 0, e();
      }
    }, e.prototype.cancel = function() {
      var e = this;
      this._queue.forEach((function(t) {
        return t.reject(e._cancelError);
      })), this._queue = [];
    }, e.prototype._dispatch = function() {
      var e = this, t = this._queue.shift();
      if (t) {
        var n = !1;
        this._currentReleaser = function() {
          n || (n = !0, e._value++, e._resolveWaiters(), e._dispatch());
        }, t.resolve([ this._value--, this._currentReleaser ]);
      }
    }, e.prototype._resolveWaiters = function() {
      this._waiters.forEach((function(e) {
        return e.resolve();
      })), this._waiters = [];
    }, e;
  }(), w = function() {
    function e(e) {
      this._semaphore = new b(1, e);
    }
    return e.prototype.acquire = function() {
      return g(this, void 0, void 0, (function() {
        var e;
        return v(this, (function(t) {
          switch (t.label) {
           case 0:
            return [ 4, this._semaphore.acquire() ];

           case 1:
            return e = t.sent(), [ 2, e[1] ];
          }
        }));
      }));
    }, e.prototype.runExclusive = function(e) {
      return this._semaphore.runExclusive((function() {
        return e();
      }));
    }, e.prototype.isLocked = function() {
      return this._semaphore.isLocked();
    }, e.prototype.waitForUnlock = function() {
      return this._semaphore.waitForUnlock();
    }, e.prototype.release = function() {
      this._semaphore.release();
    }, e.prototype.cancel = function() {
      return this._semaphore.cancel();
    }, e;
  }();
  var x, k, _;
  o = i("dBVaG");
  (k = x || (x = {})).assertEqual = e => e, k.assertIs = function(e) {}, k.assertNever = function(e) {
    throw new Error;
  }, k.arrayToEnum = e => {
    const t = {};
    for (const n of e) t[n] = n;
    return t;
  }, k.getValidEnumValues = e => {
    const t = k.objectKeys(e).filter((t => "number" != typeof e[e[t]])), n = {};
    for (const r of t) n[r] = e[r];
    return k.objectValues(n);
  }, k.objectValues = e => k.objectKeys(e).map((function(t) {
    return e[t];
  })), k.objectKeys = "function" == typeof Object.keys ? e => Object.keys(e) : e => {
    const t = [];
    for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
    return t;
  }, k.find = (e, t) => {
    for (const n of e) if (t(n)) return n;
  }, k.isInteger = "function" == typeof Number.isInteger ? e => Number.isInteger(e) : e => "number" == typeof e && isFinite(e) && Math.floor(e) === e, 
  k.joinValues = function(e, t = " | ") {
    return e.map((e => "string" == typeof e ? `'${e}'` : e)).join(t);
  }, k.jsonStringifyReplacer = (e, t) => "bigint" == typeof t ? t.toString() : t, 
  (_ || (_ = {})).mergeShapes = (e, t) => ({
    ...e,
    ...t
  });
  const E = x.arrayToEnum([ "string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set" ]), S = e => {
    switch (typeof e) {
     case "undefined":
      return E.undefined;

     case "string":
      return E.string;

     case "number":
      return isNaN(e) ? E.nan : E.number;

     case "boolean":
      return E.boolean;

     case "function":
      return E.function;

     case "bigint":
      return E.bigint;

     case "symbol":
      return E.symbol;

     case "object":
      return Array.isArray(e) ? E.array : null === e ? E.null : e.then && "function" == typeof e.then && e.catch && "function" == typeof e.catch ? E.promise : "undefined" != typeof Map && e instanceof Map ? E.map : "undefined" != typeof Set && e instanceof Set ? E.set : "undefined" != typeof Date && e instanceof Date ? E.date : E.object;

     default:
      return E.unknown;
    }
  }, A = x.arrayToEnum([ "invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite" ]);
  class C extends Error {
    constructor(e) {
      super(), this.issues = [], this.addIssue = e => {
        this.issues = [ ...this.issues, e ];
      }, this.addIssues = (e = []) => {
        this.issues = [ ...this.issues, ...e ];
      };
      const t = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", 
      this.issues = e;
    }
    get errors() {
      return this.issues;
    }
    format(e) {
      const t = e || function(e) {
        return e.message;
      }, n = {
        _errors: []
      }, r = e => {
        for (const a of e.issues) if ("invalid_union" === a.code) a.unionErrors.map(r); else if ("invalid_return_type" === a.code) r(a.returnTypeError); else if ("invalid_arguments" === a.code) r(a.argumentsError); else if (0 === a.path.length) n._errors.push(t(a)); else {
          let e = n, r = 0;
          for (;r < a.path.length; ) {
            const n = a.path[r];
            r === a.path.length - 1 ? (e[n] = e[n] || {
              _errors: []
            }, e[n]._errors.push(t(a))) : e[n] = e[n] || {
              _errors: []
            }, e = e[n], r++;
          }
        }
      };
      return r(this), n;
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, x.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return 0 === this.issues.length;
    }
    flatten(e = (e => e.message)) {
      const t = {}, n = [];
      for (const r of this.issues) r.path.length > 0 ? (t[r.path[0]] = t[r.path[0]] || [], 
      t[r.path[0]].push(e(r))) : n.push(e(r));
      return {
        formErrors: n,
        fieldErrors: t
      };
    }
    get formErrors() {
      return this.flatten();
    }
  }
  C.create = e => new C(e);
  const T = (e, t) => {
    let n;
    switch (e.code) {
     case A.invalid_type:
      n = e.received === E.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
      break;

     case A.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, x.jsonStringifyReplacer)}`;
      break;

     case A.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${x.joinValues(e.keys, ", ")}`;
      break;

     case A.invalid_union:
      n = "Invalid input";
      break;

     case A.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${x.joinValues(e.options)}`;
      break;

     case A.invalid_enum_value:
      n = `Invalid enum value. Expected ${x.joinValues(e.options)}, received '${e.received}'`;
      break;

     case A.invalid_arguments:
      n = "Invalid function arguments";
      break;

     case A.invalid_return_type:
      n = "Invalid function return type";
      break;

     case A.invalid_date:
      n = "Invalid date";
      break;

     case A.invalid_string:
      "object" == typeof e.validation ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, 
      "number" == typeof e.validation.position && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : x.assertNever(e.validation) : n = "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid";
      break;

     case A.too_small:
      n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
      break;

     case A.too_big:
      n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "bigint" === e.type ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
      break;

     case A.custom:
      n = "Invalid input";
      break;

     case A.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;

     case A.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;

     case A.not_finite:
      n = "Number must be finite";
      break;

     default:
      n = t.defaultError, x.assertNever(e);
    }
    return {
      message: n
    };
  };
  let O = T;
  function N() {
    return O;
  }
  const M = e => {
    const {data: t, path: n, errorMaps: r, issueData: a} = e, i = [ ...n, ...a.path || [] ], o = {
      ...a,
      path: i
    };
    let s = "";
    const l = r.filter((e => !!e)).slice().reverse();
    for (const e of l) s = e(o, {
      data: t,
      defaultError: s
    }).message;
    return {
      ...a,
      path: i,
      message: a.message || s
    };
  };
  function I(e, t) {
    const n = M({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [ e.common.contextualErrorMap, e.schemaErrorMap, N(), T ].filter((e => !!e))
    });
    e.common.issues.push(n);
  }
  class L {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      "valid" === this.value && (this.value = "dirty");
    }
    abort() {
      "aborted" !== this.value && (this.value = "aborted");
    }
    static mergeArray(e, t) {
      const n = [];
      for (const r of t) {
        if ("aborted" === r.status) return j;
        "dirty" === r.status && e.dirty(), n.push(r.value);
      }
      return {
        status: e.value,
        value: n
      };
    }
    static async mergeObjectAsync(e, t) {
      const n = [];
      for (const e of t) n.push({
        key: await e.key,
        value: await e.value
      });
      return L.mergeObjectSync(e, n);
    }
    static mergeObjectSync(e, t) {
      const n = {};
      for (const r of t) {
        const {key: t, value: a} = r;
        if ("aborted" === t.status) return j;
        if ("aborted" === a.status) return j;
        "dirty" === t.status && e.dirty(), "dirty" === a.status && e.dirty(), "__proto__" === t.value || void 0 === a.value && !r.alwaysSet || (n[t.value] = a.value);
      }
      return {
        status: e.value,
        value: n
      };
    }
  }
  const j = Object.freeze({
    status: "aborted"
  }), P = e => ({
    status: "dirty",
    value: e
  }), R = e => ({
    status: "valid",
    value: e
  }), z = e => "aborted" === e.status, D = e => "dirty" === e.status, F = e => "valid" === e.status, H = e => "undefined" != typeof Promise && e instanceof Promise;
  var $, B;
  (B = $ || ($ = {})).errToObj = e => "string" == typeof e ? {
    message: e
  } : e || {}, B.toString = e => "string" == typeof e ? e : null == e ? void 0 : e.message;
  class W {
    constructor(e, t, n, r) {
      this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), 
      this._cachedPath;
    }
  }
  const U = (e, t) => {
    if (F(t)) return {
      success: !0,
      data: t.value
    };
    if (!e.common.issues.length) throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        const t = new C(e.common.issues);
        return this._error = t, this._error;
      }
    };
  };
  function V(e) {
    if (!e) return {};
    const {errorMap: t, invalid_type_error: n, required_error: r, description: a} = e;
    if (t && (n || r)) throw new Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');
    if (t) return {
      errorMap: t,
      description: a
    };
    return {
      errorMap: (e, t) => "invalid_type" !== e.code ? {
        message: t.defaultError
      } : void 0 === t.data ? {
        message: null != r ? r : t.defaultError
      } : {
        message: null != n ? n : t.defaultError
      },
      description: a
    };
  }
  class q {
    constructor(e) {
      this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), 
      this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), 
      this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), 
      this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), 
      this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), 
      this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), 
      this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), 
      this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), 
      this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), 
      this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), 
      this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(e) {
      return S(e.data);
    }
    _getOrReturnCtx(e, t) {
      return t || {
        common: e.parent.common,
        data: e.data,
        parsedType: S(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      };
    }
    _processInputParams(e) {
      return {
        status: new L,
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: S(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent
        }
      };
    }
    _parseSync(e) {
      const t = this._parse(e);
      if (H(t)) throw new Error("Synchronous parse encountered promise.");
      return t;
    }
    _parseAsync(e) {
      const t = this._parse(e);
      return Promise.resolve(t);
    }
    parse(e, t) {
      const n = this.safeParse(e, t);
      if (n.success) return n.data;
      throw n.error;
    }
    safeParse(e, t) {
      var n;
      const r = {
        common: {
          issues: [],
          async: null !== (n = null == t ? void 0 : t.async) && void 0 !== n && n,
          contextualErrorMap: null == t ? void 0 : t.errorMap
        },
        path: (null == t ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: S(e)
      }, a = this._parseSync({
        data: e,
        path: r.path,
        parent: r
      });
      return U(r, a);
    }
    async parseAsync(e, t) {
      const n = await this.safeParseAsync(e, t);
      if (n.success) return n.data;
      throw n.error;
    }
    async safeParseAsync(e, t) {
      const n = {
        common: {
          issues: [],
          contextualErrorMap: null == t ? void 0 : t.errorMap,
          async: !0
        },
        path: (null == t ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: S(e)
      }, r = this._parse({
        data: e,
        path: n.path,
        parent: n
      }), a = await (H(r) ? r : Promise.resolve(r));
      return U(n, a);
    }
    refine(e, t) {
      const n = e => "string" == typeof t || void 0 === t ? {
        message: t
      } : "function" == typeof t ? t(e) : t;
      return this._refinement(((t, r) => {
        const a = e(t), i = () => r.addIssue({
          code: A.custom,
          ...n(t)
        });
        return "undefined" != typeof Promise && a instanceof Promise ? a.then((e => !!e || (i(), 
        !1))) : !!a || (i(), !1);
      }));
    }
    refinement(e, t) {
      return this._refinement(((n, r) => !!e(n) || (r.addIssue("function" == typeof t ? t(n, r) : t), 
      !1)));
    }
    _refinement(e) {
      return new Le({
        schema: this,
        typeName: Ve.ZodEffects,
        effect: {
          type: "refinement",
          refinement: e
        }
      });
    }
    superRefine(e) {
      return this._refinement(e);
    }
    optional() {
      return je.create(this, this._def);
    }
    nullable() {
      return Pe.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return he.create(this, this._def);
    }
    promise() {
      return Ie.create(this, this._def);
    }
    or(e) {
      return ve.create([ this, e ], this._def);
    }
    and(e) {
      return xe.create(this, e, this._def);
    }
    transform(e) {
      return new Le({
        ...V(this._def),
        schema: this,
        typeName: Ve.ZodEffects,
        effect: {
          type: "transform",
          transform: e
        }
      });
    }
    default(e) {
      const t = "function" == typeof e ? e : () => e;
      return new Re({
        ...V(this._def),
        innerType: this,
        defaultValue: t,
        typeName: Ve.ZodDefault
      });
    }
    brand() {
      return new He({
        typeName: Ve.ZodBranded,
        type: this,
        ...V(this._def)
      });
    }
    catch(e) {
      const t = "function" == typeof e ? e : () => e;
      return new ze({
        ...V(this._def),
        innerType: this,
        catchValue: t,
        typeName: Ve.ZodCatch
      });
    }
    describe(e) {
      return new (0, this.constructor)({
        ...this._def,
        description: e
      });
    }
    pipe(e) {
      return $e.create(this, e);
    }
    readonly() {
      return Be.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  const Z = /^c[^\s-]{8,}$/i, K = /^[a-z][a-z0-9]*$/, Y = /^[0-9A-HJKMNP-TV-Z]{26}$/, Q = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, G = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
  let X;
  const J = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, ee = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
  class te extends q {
    _parse(e) {
      this._def.coerce && (e.data = String(e.data));
      if (this._getType(e) !== E.string) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.string,
          received: t.parsedType
        }), j;
      }
      const t = new L;
      let n;
      for (const o of this._def.checks) if ("min" === o.kind) e.data.length < o.value && (n = this._getOrReturnCtx(e, n), 
      I(n, {
        code: A.too_small,
        minimum: o.value,
        type: "string",
        inclusive: !0,
        exact: !1,
        message: o.message
      }), t.dirty()); else if ("max" === o.kind) e.data.length > o.value && (n = this._getOrReturnCtx(e, n), 
      I(n, {
        code: A.too_big,
        maximum: o.value,
        type: "string",
        inclusive: !0,
        exact: !1,
        message: o.message
      }), t.dirty()); else if ("length" === o.kind) {
        const r = e.data.length > o.value, a = e.data.length < o.value;
        (r || a) && (n = this._getOrReturnCtx(e, n), r ? I(n, {
          code: A.too_big,
          maximum: o.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: o.message
        }) : a && I(n, {
          code: A.too_small,
          minimum: o.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: o.message
        }), t.dirty());
      } else if ("email" === o.kind) G.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      I(n, {
        validation: "email",
        code: A.invalid_string,
        message: o.message
      }), t.dirty()); else if ("emoji" === o.kind) X || (X = new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), 
      X.test(e.data) || (n = this._getOrReturnCtx(e, n), I(n, {
        validation: "emoji",
        code: A.invalid_string,
        message: o.message
      }), t.dirty()); else if ("uuid" === o.kind) Q.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      I(n, {
        validation: "uuid",
        code: A.invalid_string,
        message: o.message
      }), t.dirty()); else if ("cuid" === o.kind) Z.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      I(n, {
        validation: "cuid",
        code: A.invalid_string,
        message: o.message
      }), t.dirty()); else if ("cuid2" === o.kind) K.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      I(n, {
        validation: "cuid2",
        code: A.invalid_string,
        message: o.message
      }), t.dirty()); else if ("ulid" === o.kind) Y.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      I(n, {
        validation: "ulid",
        code: A.invalid_string,
        message: o.message
      }), t.dirty()); else if ("url" === o.kind) try {
        new URL(e.data);
      } catch (r) {
        n = this._getOrReturnCtx(e, n), I(n, {
          validation: "url",
          code: A.invalid_string,
          message: o.message
        }), t.dirty();
      } else if ("regex" === o.kind) {
        o.regex.lastIndex = 0;
        o.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), I(n, {
          validation: "regex",
          code: A.invalid_string,
          message: o.message
        }), t.dirty());
      } else if ("trim" === o.kind) e.data = e.data.trim(); else if ("includes" === o.kind) e.data.includes(o.value, o.position) || (n = this._getOrReturnCtx(e, n), 
      I(n, {
        code: A.invalid_string,
        validation: {
          includes: o.value,
          position: o.position
        },
        message: o.message
      }), t.dirty()); else if ("toLowerCase" === o.kind) e.data = e.data.toLowerCase(); else if ("toUpperCase" === o.kind) e.data = e.data.toUpperCase(); else if ("startsWith" === o.kind) e.data.startsWith(o.value) || (n = this._getOrReturnCtx(e, n), 
      I(n, {
        code: A.invalid_string,
        validation: {
          startsWith: o.value
        },
        message: o.message
      }), t.dirty()); else if ("endsWith" === o.kind) e.data.endsWith(o.value) || (n = this._getOrReturnCtx(e, n), 
      I(n, {
        code: A.invalid_string,
        validation: {
          endsWith: o.value
        },
        message: o.message
      }), t.dirty()); else if ("datetime" === o.kind) {
        ((i = o).precision ? i.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${i.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${i.precision}}Z$`) : 0 === i.precision ? i.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : i.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$")).test(e.data) || (n = this._getOrReturnCtx(e, n), 
        I(n, {
          code: A.invalid_string,
          validation: "datetime",
          message: o.message
        }), t.dirty());
      } else "ip" === o.kind ? (r = e.data, ("v4" !== (a = o.version) && a || !J.test(r)) && ("v6" !== a && a || !ee.test(r)) && (n = this._getOrReturnCtx(e, n), 
      I(n, {
        validation: "ip",
        code: A.invalid_string,
        message: o.message
      }), t.dirty())) : x.assertNever(o);
      var r, a, i;
      return {
        status: t.value,
        value: e.data
      };
    }
    _regex(e, t, n) {
      return this.refinement((t => e.test(t)), {
        validation: t,
        code: A.invalid_string,
        ...$.errToObj(n)
      });
    }
    _addCheck(e) {
      return new te({
        ...this._def,
        checks: [ ...this._def.checks, e ]
      });
    }
    email(e) {
      return this._addCheck({
        kind: "email",
        ...$.errToObj(e)
      });
    }
    url(e) {
      return this._addCheck({
        kind: "url",
        ...$.errToObj(e)
      });
    }
    emoji(e) {
      return this._addCheck({
        kind: "emoji",
        ...$.errToObj(e)
      });
    }
    uuid(e) {
      return this._addCheck({
        kind: "uuid",
        ...$.errToObj(e)
      });
    }
    cuid(e) {
      return this._addCheck({
        kind: "cuid",
        ...$.errToObj(e)
      });
    }
    cuid2(e) {
      return this._addCheck({
        kind: "cuid2",
        ...$.errToObj(e)
      });
    }
    ulid(e) {
      return this._addCheck({
        kind: "ulid",
        ...$.errToObj(e)
      });
    }
    ip(e) {
      return this._addCheck({
        kind: "ip",
        ...$.errToObj(e)
      });
    }
    datetime(e) {
      var t;
      return "string" == typeof e ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: !1,
        message: e
      }) : this._addCheck({
        kind: "datetime",
        precision: void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision,
        offset: null !== (t = null == e ? void 0 : e.offset) && void 0 !== t && t,
        ...$.errToObj(null == e ? void 0 : e.message)
      });
    }
    regex(e, t) {
      return this._addCheck({
        kind: "regex",
        regex: e,
        ...$.errToObj(t)
      });
    }
    includes(e, t) {
      return this._addCheck({
        kind: "includes",
        value: e,
        position: null == t ? void 0 : t.position,
        ...$.errToObj(null == t ? void 0 : t.message)
      });
    }
    startsWith(e, t) {
      return this._addCheck({
        kind: "startsWith",
        value: e,
        ...$.errToObj(t)
      });
    }
    endsWith(e, t) {
      return this._addCheck({
        kind: "endsWith",
        value: e,
        ...$.errToObj(t)
      });
    }
    min(e, t) {
      return this._addCheck({
        kind: "min",
        value: e,
        ...$.errToObj(t)
      });
    }
    max(e, t) {
      return this._addCheck({
        kind: "max",
        value: e,
        ...$.errToObj(t)
      });
    }
    length(e, t) {
      return this._addCheck({
        kind: "length",
        value: e,
        ...$.errToObj(t)
      });
    }
    nonempty(e) {
      return this.min(1, $.errToObj(e));
    }
    trim() {
      return new te({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: "trim"
        } ]
      });
    }
    toLowerCase() {
      return new te({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: "toLowerCase"
        } ]
      });
    }
    toUpperCase() {
      return new te({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: "toUpperCase"
        } ]
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((e => "datetime" === e.kind));
    }
    get isEmail() {
      return !!this._def.checks.find((e => "email" === e.kind));
    }
    get isURL() {
      return !!this._def.checks.find((e => "url" === e.kind));
    }
    get isEmoji() {
      return !!this._def.checks.find((e => "emoji" === e.kind));
    }
    get isUUID() {
      return !!this._def.checks.find((e => "uuid" === e.kind));
    }
    get isCUID() {
      return !!this._def.checks.find((e => "cuid" === e.kind));
    }
    get isCUID2() {
      return !!this._def.checks.find((e => "cuid2" === e.kind));
    }
    get isULID() {
      return !!this._def.checks.find((e => "ulid" === e.kind));
    }
    get isIP() {
      return !!this._def.checks.find((e => "ip" === e.kind));
    }
    get minLength() {
      let e = null;
      for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e;
    }
    get maxLength() {
      let e = null;
      for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e;
    }
  }
  function ne(e, t) {
    const n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, a = n > r ? n : r;
    return parseInt(e.toFixed(a).replace(".", "")) % parseInt(t.toFixed(a).replace(".", "")) / Math.pow(10, a);
  }
  te.create = e => {
    var t;
    return new te({
      checks: [],
      typeName: Ve.ZodString,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...V(e)
    });
  };
  class re extends q {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(e) {
      this._def.coerce && (e.data = Number(e.data));
      if (this._getType(e) !== E.number) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.number,
          received: t.parsedType
        }), j;
      }
      let t;
      const n = new L;
      for (const r of this._def.checks) if ("int" === r.kind) x.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), 
      I(t, {
        code: A.invalid_type,
        expected: "integer",
        received: "float",
        message: r.message
      }), n.dirty()); else if ("min" === r.kind) {
        (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), 
        I(t, {
          code: A.too_small,
          minimum: r.value,
          type: "number",
          inclusive: r.inclusive,
          exact: !1,
          message: r.message
        }), n.dirty());
      } else if ("max" === r.kind) {
        (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), 
        I(t, {
          code: A.too_big,
          maximum: r.value,
          type: "number",
          inclusive: r.inclusive,
          exact: !1,
          message: r.message
        }), n.dirty());
      } else "multipleOf" === r.kind ? 0 !== ne(e.data, r.value) && (t = this._getOrReturnCtx(e, t), 
      I(t, {
        code: A.not_multiple_of,
        multipleOf: r.value,
        message: r.message
      }), n.dirty()) : "finite" === r.kind ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), 
      I(t, {
        code: A.not_finite,
        message: r.message
      }), n.dirty()) : x.assertNever(r);
      return {
        status: n.value,
        value: e.data
      };
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, $.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, $.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, $.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, $.toString(t));
    }
    setLimit(e, t, n, r) {
      return new re({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: e,
          value: t,
          inclusive: n,
          message: $.toString(r)
        } ]
      });
    }
    _addCheck(e) {
      return new re({
        ...this._def,
        checks: [ ...this._def.checks, e ]
      });
    }
    int(e) {
      return this._addCheck({
        kind: "int",
        message: $.toString(e)
      });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: $.toString(e)
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: $.toString(e)
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: $.toString(e)
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: $.toString(e)
      });
    }
    multipleOf(e, t) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: $.toString(t)
      });
    }
    finite(e) {
      return this._addCheck({
        kind: "finite",
        message: $.toString(e)
      });
    }
    safe(e) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: $.toString(e)
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: $.toString(e)
      });
    }
    get minValue() {
      let e = null;
      for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e;
    }
    get isInt() {
      return !!this._def.checks.find((e => "int" === e.kind || "multipleOf" === e.kind && x.isInteger(e.value)));
    }
    get isFinite() {
      let e = null, t = null;
      for (const n of this._def.checks) {
        if ("finite" === n.kind || "int" === n.kind || "multipleOf" === n.kind) return !0;
        "min" === n.kind ? (null === t || n.value > t) && (t = n.value) : "max" === n.kind && (null === e || n.value < e) && (e = n.value);
      }
      return Number.isFinite(t) && Number.isFinite(e);
    }
  }
  re.create = e => new re({
    checks: [],
    typeName: Ve.ZodNumber,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...V(e)
  });
  class ae extends q {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(e) {
      this._def.coerce && (e.data = BigInt(e.data));
      if (this._getType(e) !== E.bigint) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.bigint,
          received: t.parsedType
        }), j;
      }
      let t;
      const n = new L;
      for (const r of this._def.checks) if ("min" === r.kind) {
        (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), 
        I(t, {
          code: A.too_small,
          type: "bigint",
          minimum: r.value,
          inclusive: r.inclusive,
          message: r.message
        }), n.dirty());
      } else if ("max" === r.kind) {
        (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), 
        I(t, {
          code: A.too_big,
          type: "bigint",
          maximum: r.value,
          inclusive: r.inclusive,
          message: r.message
        }), n.dirty());
      } else "multipleOf" === r.kind ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), 
      I(t, {
        code: A.not_multiple_of,
        multipleOf: r.value,
        message: r.message
      }), n.dirty()) : x.assertNever(r);
      return {
        status: n.value,
        value: e.data
      };
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, $.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, $.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, $.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, $.toString(t));
    }
    setLimit(e, t, n, r) {
      return new ae({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: e,
          value: t,
          inclusive: n,
          message: $.toString(r)
        } ]
      });
    }
    _addCheck(e) {
      return new ae({
        ...this._def,
        checks: [ ...this._def.checks, e ]
      });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: $.toString(e)
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: $.toString(e)
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: $.toString(e)
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: $.toString(e)
      });
    }
    multipleOf(e, t) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: $.toString(t)
      });
    }
    get minValue() {
      let e = null;
      for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e;
    }
  }
  ae.create = e => {
    var t;
    return new ae({
      checks: [],
      typeName: Ve.ZodBigInt,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...V(e)
    });
  };
  class ie extends q {
    _parse(e) {
      this._def.coerce && (e.data = Boolean(e.data));
      if (this._getType(e) !== E.boolean) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.boolean,
          received: t.parsedType
        }), j;
      }
      return R(e.data);
    }
  }
  ie.create = e => new ie({
    typeName: Ve.ZodBoolean,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...V(e)
  });
  class oe extends q {
    _parse(e) {
      this._def.coerce && (e.data = new Date(e.data));
      if (this._getType(e) !== E.date) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.date,
          received: t.parsedType
        }), j;
      }
      if (isNaN(e.data.getTime())) {
        return I(this._getOrReturnCtx(e), {
          code: A.invalid_date
        }), j;
      }
      const t = new L;
      let n;
      for (const r of this._def.checks) "min" === r.kind ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n), 
      I(n, {
        code: A.too_small,
        message: r.message,
        inclusive: !0,
        exact: !1,
        minimum: r.value,
        type: "date"
      }), t.dirty()) : "max" === r.kind ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n), 
      I(n, {
        code: A.too_big,
        message: r.message,
        inclusive: !0,
        exact: !1,
        maximum: r.value,
        type: "date"
      }), t.dirty()) : x.assertNever(r);
      return {
        status: t.value,
        value: new Date(e.data.getTime())
      };
    }
    _addCheck(e) {
      return new oe({
        ...this._def,
        checks: [ ...this._def.checks, e ]
      });
    }
    min(e, t) {
      return this._addCheck({
        kind: "min",
        value: e.getTime(),
        message: $.toString(t)
      });
    }
    max(e, t) {
      return this._addCheck({
        kind: "max",
        value: e.getTime(),
        message: $.toString(t)
      });
    }
    get minDate() {
      let e = null;
      for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return null != e ? new Date(e) : null;
    }
    get maxDate() {
      let e = null;
      for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return null != e ? new Date(e) : null;
    }
  }
  oe.create = e => new oe({
    checks: [],
    coerce: (null == e ? void 0 : e.coerce) || !1,
    typeName: Ve.ZodDate,
    ...V(e)
  });
  class se extends q {
    _parse(e) {
      if (this._getType(e) !== E.symbol) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.symbol,
          received: t.parsedType
        }), j;
      }
      return R(e.data);
    }
  }
  se.create = e => new se({
    typeName: Ve.ZodSymbol,
    ...V(e)
  });
  class le extends q {
    _parse(e) {
      if (this._getType(e) !== E.undefined) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.undefined,
          received: t.parsedType
        }), j;
      }
      return R(e.data);
    }
  }
  le.create = e => new le({
    typeName: Ve.ZodUndefined,
    ...V(e)
  });
  class ue extends q {
    _parse(e) {
      if (this._getType(e) !== E.null) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.null,
          received: t.parsedType
        }), j;
      }
      return R(e.data);
    }
  }
  ue.create = e => new ue({
    typeName: Ve.ZodNull,
    ...V(e)
  });
  class ce extends q {
    constructor() {
      super(...arguments), this._any = !0;
    }
    _parse(e) {
      return R(e.data);
    }
  }
  ce.create = e => new ce({
    typeName: Ve.ZodAny,
    ...V(e)
  });
  class fe extends q {
    constructor() {
      super(...arguments), this._unknown = !0;
    }
    _parse(e) {
      return R(e.data);
    }
  }
  fe.create = e => new fe({
    typeName: Ve.ZodUnknown,
    ...V(e)
  });
  class de extends q {
    _parse(e) {
      const t = this._getOrReturnCtx(e);
      return I(t, {
        code: A.invalid_type,
        expected: E.never,
        received: t.parsedType
      }), j;
    }
  }
  de.create = e => new de({
    typeName: Ve.ZodNever,
    ...V(e)
  });
  class pe extends q {
    _parse(e) {
      if (this._getType(e) !== E.undefined) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.void,
          received: t.parsedType
        }), j;
      }
      return R(e.data);
    }
  }
  pe.create = e => new pe({
    typeName: Ve.ZodVoid,
    ...V(e)
  });
  class he extends q {
    _parse(e) {
      const {ctx: t, status: n} = this._processInputParams(e), r = this._def;
      if (t.parsedType !== E.array) return I(t, {
        code: A.invalid_type,
        expected: E.array,
        received: t.parsedType
      }), j;
      if (null !== r.exactLength) {
        const e = t.data.length > r.exactLength.value, a = t.data.length < r.exactLength.value;
        (e || a) && (I(t, {
          code: e ? A.too_big : A.too_small,
          minimum: a ? r.exactLength.value : void 0,
          maximum: e ? r.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: r.exactLength.message
        }), n.dirty());
      }
      if (null !== r.minLength && t.data.length < r.minLength.value && (I(t, {
        code: A.too_small,
        minimum: r.minLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: r.minLength.message
      }), n.dirty()), null !== r.maxLength && t.data.length > r.maxLength.value && (I(t, {
        code: A.too_big,
        maximum: r.maxLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: r.maxLength.message
      }), n.dirty()), t.common.async) return Promise.all([ ...t.data ].map(((e, n) => r.type._parseAsync(new W(t, e, t.path, n))))).then((e => L.mergeArray(n, e)));
      const a = [ ...t.data ].map(((e, n) => r.type._parseSync(new W(t, e, t.path, n))));
      return L.mergeArray(n, a);
    }
    get element() {
      return this._def.type;
    }
    min(e, t) {
      return new he({
        ...this._def,
        minLength: {
          value: e,
          message: $.toString(t)
        }
      });
    }
    max(e, t) {
      return new he({
        ...this._def,
        maxLength: {
          value: e,
          message: $.toString(t)
        }
      });
    }
    length(e, t) {
      return new he({
        ...this._def,
        exactLength: {
          value: e,
          message: $.toString(t)
        }
      });
    }
    nonempty(e) {
      return this.min(1, e);
    }
  }
  function me(e) {
    if (e instanceof ge) {
      const t = {};
      for (const n in e.shape) {
        const r = e.shape[n];
        t[n] = je.create(me(r));
      }
      return new ge({
        ...e._def,
        shape: () => t
      });
    }
    return e instanceof he ? new he({
      ...e._def,
      type: me(e.element)
    }) : e instanceof je ? je.create(me(e.unwrap())) : e instanceof Pe ? Pe.create(me(e.unwrap())) : e instanceof ke ? ke.create(e.items.map((e => me(e)))) : e;
  }
  he.create = (e, t) => new he({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: Ve.ZodArray,
    ...V(t)
  });
  class ge extends q {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (null !== this._cached) return this._cached;
      const e = this._def.shape(), t = x.objectKeys(e);
      return this._cached = {
        shape: e,
        keys: t
      };
    }
    _parse(e) {
      if (this._getType(e) !== E.object) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.object,
          received: t.parsedType
        }), j;
      }
      const {status: t, ctx: n} = this._processInputParams(e), {shape: r, keys: a} = this._getCached(), i = [];
      if (!(this._def.catchall instanceof de && "strip" === this._def.unknownKeys)) for (const e in n.data) a.includes(e) || i.push(e);
      const o = [];
      for (const e of a) {
        const t = r[e], a = n.data[e];
        o.push({
          key: {
            status: "valid",
            value: e
          },
          value: t._parse(new W(n, a, n.path, e)),
          alwaysSet: e in n.data
        });
      }
      if (this._def.catchall instanceof de) {
        const e = this._def.unknownKeys;
        if ("passthrough" === e) for (const e of i) o.push({
          key: {
            status: "valid",
            value: e
          },
          value: {
            status: "valid",
            value: n.data[e]
          }
        }); else if ("strict" === e) i.length > 0 && (I(n, {
          code: A.unrecognized_keys,
          keys: i
        }), t.dirty()); else if ("strip" !== e) throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        const e = this._def.catchall;
        for (const t of i) {
          const r = n.data[t];
          o.push({
            key: {
              status: "valid",
              value: t
            },
            value: e._parse(new W(n, r, n.path, t)),
            alwaysSet: t in n.data
          });
        }
      }
      return n.common.async ? Promise.resolve().then((async () => {
        const e = [];
        for (const t of o) {
          const n = await t.key;
          e.push({
            key: n,
            value: await t.value,
            alwaysSet: t.alwaysSet
          });
        }
        return e;
      })).then((e => L.mergeObjectSync(t, e))) : L.mergeObjectSync(t, o);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e) {
      return $.errToObj, new ge({
        ...this._def,
        unknownKeys: "strict",
        ...void 0 !== e ? {
          errorMap: (t, n) => {
            var r, a, i, o;
            const s = null !== (i = null === (a = (r = this._def).errorMap) || void 0 === a ? void 0 : a.call(r, t, n).message) && void 0 !== i ? i : n.defaultError;
            return "unrecognized_keys" === t.code ? {
              message: null !== (o = $.errToObj(e).message) && void 0 !== o ? o : s
            } : {
              message: s
            };
          }
        } : {}
      });
    }
    strip() {
      return new ge({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new ge({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    extend(e) {
      return new ge({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...e
        })
      });
    }
    merge(e) {
      return new ge({
        unknownKeys: e._def.unknownKeys,
        catchall: e._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...e._def.shape()
        }),
        typeName: Ve.ZodObject
      });
    }
    setKey(e, t) {
      return this.augment({
        [e]: t
      });
    }
    catchall(e) {
      return new ge({
        ...this._def,
        catchall: e
      });
    }
    pick(e) {
      const t = {};
      return x.objectKeys(e).forEach((n => {
        e[n] && this.shape[n] && (t[n] = this.shape[n]);
      })), new ge({
        ...this._def,
        shape: () => t
      });
    }
    omit(e) {
      const t = {};
      return x.objectKeys(this.shape).forEach((n => {
        e[n] || (t[n] = this.shape[n]);
      })), new ge({
        ...this._def,
        shape: () => t
      });
    }
    deepPartial() {
      return me(this);
    }
    partial(e) {
      const t = {};
      return x.objectKeys(this.shape).forEach((n => {
        const r = this.shape[n];
        e && !e[n] ? t[n] = r : t[n] = r.optional();
      })), new ge({
        ...this._def,
        shape: () => t
      });
    }
    required(e) {
      const t = {};
      return x.objectKeys(this.shape).forEach((n => {
        if (e && !e[n]) t[n] = this.shape[n]; else {
          let e = this.shape[n];
          for (;e instanceof je; ) e = e._def.innerType;
          t[n] = e;
        }
      })), new ge({
        ...this._def,
        shape: () => t
      });
    }
    keyof() {
      return Oe(x.objectKeys(this.shape));
    }
  }
  ge.create = (e, t) => new ge({
    shape: () => e,
    unknownKeys: "strip",
    catchall: de.create(),
    typeName: Ve.ZodObject,
    ...V(t)
  }), ge.strictCreate = (e, t) => new ge({
    shape: () => e,
    unknownKeys: "strict",
    catchall: de.create(),
    typeName: Ve.ZodObject,
    ...V(t)
  }), ge.lazycreate = (e, t) => new ge({
    shape: e,
    unknownKeys: "strip",
    catchall: de.create(),
    typeName: Ve.ZodObject,
    ...V(t)
  });
  class ve extends q {
    _parse(e) {
      const {ctx: t} = this._processInputParams(e), n = this._def.options;
      if (t.common.async) return Promise.all(n.map((async e => {
        const n = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await e._parseAsync({
            data: t.data,
            path: t.path,
            parent: n
          }),
          ctx: n
        };
      }))).then((function(e) {
        for (const t of e) if ("valid" === t.result.status) return t.result;
        for (const n of e) if ("dirty" === n.result.status) return t.common.issues.push(...n.ctx.common.issues), 
        n.result;
        const n = e.map((e => new C(e.ctx.common.issues)));
        return I(t, {
          code: A.invalid_union,
          unionErrors: n
        }), j;
      }));
      {
        let e;
        const r = [];
        for (const a of n) {
          const n = {
            ...t,
            common: {
              ...t.common,
              issues: []
            },
            parent: null
          }, i = a._parseSync({
            data: t.data,
            path: t.path,
            parent: n
          });
          if ("valid" === i.status) return i;
          "dirty" !== i.status || e || (e = {
            result: i,
            ctx: n
          }), n.common.issues.length && r.push(n.common.issues);
        }
        if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
        const a = r.map((e => new C(e)));
        return I(t, {
          code: A.invalid_union,
          unionErrors: a
        }), j;
      }
    }
    get options() {
      return this._def.options;
    }
  }
  ve.create = (e, t) => new ve({
    options: e,
    typeName: Ve.ZodUnion,
    ...V(t)
  });
  const ye = e => e instanceof Ce ? ye(e.schema) : e instanceof Le ? ye(e.innerType()) : e instanceof Te ? [ e.value ] : e instanceof Ne ? e.options : e instanceof Me ? Object.keys(e.enum) : e instanceof Re ? ye(e._def.innerType) : e instanceof le ? [ void 0 ] : e instanceof ue ? [ null ] : null;
  class be extends q {
    _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== E.object) return I(t, {
        code: A.invalid_type,
        expected: E.object,
        received: t.parsedType
      }), j;
      const n = this.discriminator, r = t.data[n], a = this.optionsMap.get(r);
      return a ? t.common.async ? a._parseAsync({
        data: t.data,
        path: t.path,
        parent: t
      }) : a._parseSync({
        data: t.data,
        path: t.path,
        parent: t
      }) : (I(t, {
        code: A.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [ n ]
      }), j);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(e, t, n) {
      const r = new Map;
      for (const n of t) {
        const t = ye(n.shape[e]);
        if (!t) throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
        for (const a of t) {
          if (r.has(a)) throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);
          r.set(a, n);
        }
      }
      return new be({
        typeName: Ve.ZodDiscriminatedUnion,
        discriminator: e,
        options: t,
        optionsMap: r,
        ...V(n)
      });
    }
  }
  function we(e, t) {
    const n = S(e), r = S(t);
    if (e === t) return {
      valid: !0,
      data: e
    };
    if (n === E.object && r === E.object) {
      const n = x.objectKeys(t), r = x.objectKeys(e).filter((e => -1 !== n.indexOf(e))), a = {
        ...e,
        ...t
      };
      for (const n of r) {
        const r = we(e[n], t[n]);
        if (!r.valid) return {
          valid: !1
        };
        a[n] = r.data;
      }
      return {
        valid: !0,
        data: a
      };
    }
    if (n === E.array && r === E.array) {
      if (e.length !== t.length) return {
        valid: !1
      };
      const n = [];
      for (let r = 0; r < e.length; r++) {
        const a = we(e[r], t[r]);
        if (!a.valid) return {
          valid: !1
        };
        n.push(a.data);
      }
      return {
        valid: !0,
        data: n
      };
    }
    return n === E.date && r === E.date && +e == +t ? {
      valid: !0,
      data: e
    } : {
      valid: !1
    };
  }
  class xe extends q {
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e), r = (e, r) => {
        if (z(e) || z(r)) return j;
        const a = we(e.value, r.value);
        return a.valid ? ((D(e) || D(r)) && t.dirty(), {
          status: t.value,
          value: a.data
        }) : (I(n, {
          code: A.invalid_intersection_types
        }), j);
      };
      return n.common.async ? Promise.all([ this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }), this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }) ]).then((([e, t]) => r(e, t))) : r(this._def.left._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      }), this._def.right._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      }));
    }
  }
  xe.create = (e, t, n) => new xe({
    left: e,
    right: t,
    typeName: Ve.ZodIntersection,
    ...V(n)
  });
  class ke extends q {
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== E.array) return I(n, {
        code: A.invalid_type,
        expected: E.array,
        received: n.parsedType
      }), j;
      if (n.data.length < this._def.items.length) return I(n, {
        code: A.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), j;
      !this._def.rest && n.data.length > this._def.items.length && (I(n, {
        code: A.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), t.dirty());
      const r = [ ...n.data ].map(((e, t) => {
        const r = this._def.items[t] || this._def.rest;
        return r ? r._parse(new W(n, e, n.path, t)) : null;
      })).filter((e => !!e));
      return n.common.async ? Promise.all(r).then((e => L.mergeArray(t, e))) : L.mergeArray(t, r);
    }
    get items() {
      return this._def.items;
    }
    rest(e) {
      return new ke({
        ...this._def,
        rest: e
      });
    }
  }
  ke.create = (e, t) => {
    if (!Array.isArray(e)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new ke({
      items: e,
      typeName: Ve.ZodTuple,
      rest: null,
      ...V(t)
    });
  };
  class _e extends q {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== E.object) return I(n, {
        code: A.invalid_type,
        expected: E.object,
        received: n.parsedType
      }), j;
      const r = [], a = this._def.keyType, i = this._def.valueType;
      for (const e in n.data) r.push({
        key: a._parse(new W(n, e, n.path, e)),
        value: i._parse(new W(n, n.data[e], n.path, e))
      });
      return n.common.async ? L.mergeObjectAsync(t, r) : L.mergeObjectSync(t, r);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e, t, n) {
      return new _e(t instanceof q ? {
        keyType: e,
        valueType: t,
        typeName: Ve.ZodRecord,
        ...V(n)
      } : {
        keyType: te.create(),
        valueType: e,
        typeName: Ve.ZodRecord,
        ...V(t)
      });
    }
  }
  class Ee extends q {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== E.map) return I(n, {
        code: A.invalid_type,
        expected: E.map,
        received: n.parsedType
      }), j;
      const r = this._def.keyType, a = this._def.valueType, i = [ ...n.data.entries() ].map((([e, t], i) => ({
        key: r._parse(new W(n, e, n.path, [ i, "key" ])),
        value: a._parse(new W(n, t, n.path, [ i, "value" ]))
      })));
      if (n.common.async) {
        const e = new Map;
        return Promise.resolve().then((async () => {
          for (const n of i) {
            const r = await n.key, a = await n.value;
            if ("aborted" === r.status || "aborted" === a.status) return j;
            "dirty" !== r.status && "dirty" !== a.status || t.dirty(), e.set(r.value, a.value);
          }
          return {
            status: t.value,
            value: e
          };
        }));
      }
      {
        const e = new Map;
        for (const n of i) {
          const r = n.key, a = n.value;
          if ("aborted" === r.status || "aborted" === a.status) return j;
          "dirty" !== r.status && "dirty" !== a.status || t.dirty(), e.set(r.value, a.value);
        }
        return {
          status: t.value,
          value: e
        };
      }
    }
  }
  Ee.create = (e, t, n) => new Ee({
    valueType: t,
    keyType: e,
    typeName: Ve.ZodMap,
    ...V(n)
  });
  class Se extends q {
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== E.set) return I(n, {
        code: A.invalid_type,
        expected: E.set,
        received: n.parsedType
      }), j;
      const r = this._def;
      null !== r.minSize && n.data.size < r.minSize.value && (I(n, {
        code: A.too_small,
        minimum: r.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: r.minSize.message
      }), t.dirty()), null !== r.maxSize && n.data.size > r.maxSize.value && (I(n, {
        code: A.too_big,
        maximum: r.maxSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: r.maxSize.message
      }), t.dirty());
      const a = this._def.valueType;
      function i(e) {
        const n = new Set;
        for (const r of e) {
          if ("aborted" === r.status) return j;
          "dirty" === r.status && t.dirty(), n.add(r.value);
        }
        return {
          status: t.value,
          value: n
        };
      }
      const o = [ ...n.data.values() ].map(((e, t) => a._parse(new W(n, e, n.path, t))));
      return n.common.async ? Promise.all(o).then((e => i(e))) : i(o);
    }
    min(e, t) {
      return new Se({
        ...this._def,
        minSize: {
          value: e,
          message: $.toString(t)
        }
      });
    }
    max(e, t) {
      return new Se({
        ...this._def,
        maxSize: {
          value: e,
          message: $.toString(t)
        }
      });
    }
    size(e, t) {
      return this.min(e, t).max(e, t);
    }
    nonempty(e) {
      return this.min(1, e);
    }
  }
  Se.create = (e, t) => new Se({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: Ve.ZodSet,
    ...V(t)
  });
  class Ae extends q {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== E.function) return I(t, {
        code: A.invalid_type,
        expected: E.function,
        received: t.parsedType
      }), j;
      function n(e, n) {
        return M({
          data: e,
          path: t.path,
          errorMaps: [ t.common.contextualErrorMap, t.schemaErrorMap, N(), T ].filter((e => !!e)),
          issueData: {
            code: A.invalid_arguments,
            argumentsError: n
          }
        });
      }
      function r(e, n) {
        return M({
          data: e,
          path: t.path,
          errorMaps: [ t.common.contextualErrorMap, t.schemaErrorMap, N(), T ].filter((e => !!e)),
          issueData: {
            code: A.invalid_return_type,
            returnTypeError: n
          }
        });
      }
      const a = {
        errorMap: t.common.contextualErrorMap
      }, i = t.data;
      if (this._def.returns instanceof Ie) {
        const e = this;
        return R((async function(...t) {
          const o = new C([]), s = await e._def.args.parseAsync(t, a).catch((e => {
            throw o.addIssue(n(t, e)), o;
          })), l = await Reflect.apply(i, this, s);
          return await e._def.returns._def.type.parseAsync(l, a).catch((e => {
            throw o.addIssue(r(l, e)), o;
          }));
        }));
      }
      {
        const e = this;
        return R((function(...t) {
          const o = e._def.args.safeParse(t, a);
          if (!o.success) throw new C([ n(t, o.error) ]);
          const s = Reflect.apply(i, this, o.data), l = e._def.returns.safeParse(s, a);
          if (!l.success) throw new C([ r(s, l.error) ]);
          return l.data;
        }));
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...e) {
      return new Ae({
        ...this._def,
        args: ke.create(e).rest(fe.create())
      });
    }
    returns(e) {
      return new Ae({
        ...this._def,
        returns: e
      });
    }
    implement(e) {
      return this.parse(e);
    }
    strictImplement(e) {
      return this.parse(e);
    }
    static create(e, t, n) {
      return new Ae({
        args: e || ke.create([]).rest(fe.create()),
        returns: t || fe.create(),
        typeName: Ve.ZodFunction,
        ...V(n)
      });
    }
  }
  class Ce extends q {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      return this._def.getter()._parse({
        data: t.data,
        path: t.path,
        parent: t
      });
    }
  }
  Ce.create = (e, t) => new Ce({
    getter: e,
    typeName: Ve.ZodLazy,
    ...V(t)
  });
  class Te extends q {
    _parse(e) {
      if (e.data !== this._def.value) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          received: t.data,
          code: A.invalid_literal,
          expected: this._def.value
        }), j;
      }
      return {
        status: "valid",
        value: e.data
      };
    }
    get value() {
      return this._def.value;
    }
  }
  function Oe(e, t) {
    return new Ne({
      values: e,
      typeName: Ve.ZodEnum,
      ...V(t)
    });
  }
  Te.create = (e, t) => new Te({
    value: e,
    typeName: Ve.ZodLiteral,
    ...V(t)
  });
  class Ne extends q {
    _parse(e) {
      if ("string" != typeof e.data) {
        const t = this._getOrReturnCtx(e), n = this._def.values;
        return I(t, {
          expected: x.joinValues(n),
          received: t.parsedType,
          code: A.invalid_type
        }), j;
      }
      if (-1 === this._def.values.indexOf(e.data)) {
        const t = this._getOrReturnCtx(e), n = this._def.values;
        return I(t, {
          received: t.data,
          code: A.invalid_enum_value,
          options: n
        }), j;
      }
      return R(e.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const e = {};
      for (const t of this._def.values) e[t] = t;
      return e;
    }
    get Values() {
      const e = {};
      for (const t of this._def.values) e[t] = t;
      return e;
    }
    get Enum() {
      const e = {};
      for (const t of this._def.values) e[t] = t;
      return e;
    }
    extract(e) {
      return Ne.create(e);
    }
    exclude(e) {
      return Ne.create(this.options.filter((t => !e.includes(t))));
    }
  }
  Ne.create = Oe;
  class Me extends q {
    _parse(e) {
      const t = x.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
      if (n.parsedType !== E.string && n.parsedType !== E.number) {
        const e = x.objectValues(t);
        return I(n, {
          expected: x.joinValues(e),
          received: n.parsedType,
          code: A.invalid_type
        }), j;
      }
      if (-1 === t.indexOf(e.data)) {
        const e = x.objectValues(t);
        return I(n, {
          received: n.data,
          code: A.invalid_enum_value,
          options: e
        }), j;
      }
      return R(e.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  Me.create = (e, t) => new Me({
    values: e,
    typeName: Ve.ZodNativeEnum,
    ...V(t)
  });
  class Ie extends q {
    unwrap() {
      return this._def.type;
    }
    _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== E.promise && !1 === t.common.async) return I(t, {
        code: A.invalid_type,
        expected: E.promise,
        received: t.parsedType
      }), j;
      const n = t.parsedType === E.promise ? t.data : Promise.resolve(t.data);
      return R(n.then((e => this._def.type.parseAsync(e, {
        path: t.path,
        errorMap: t.common.contextualErrorMap
      }))));
    }
  }
  Ie.create = (e, t) => new Ie({
    type: e,
    typeName: Ve.ZodPromise,
    ...V(t)
  });
  class Le extends q {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === Ve.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e), r = this._def.effect || null, a = {
        addIssue: e => {
          I(n, e), e.fatal ? t.abort() : t.dirty();
        },
        get path() {
          return n.path;
        }
      };
      if (a.addIssue = a.addIssue.bind(a), "preprocess" === r.type) {
        const e = r.transform(n.data, a);
        return n.common.issues.length ? {
          status: "dirty",
          value: n.data
        } : n.common.async ? Promise.resolve(e).then((e => this._def.schema._parseAsync({
          data: e,
          path: n.path,
          parent: n
        }))) : this._def.schema._parseSync({
          data: e,
          path: n.path,
          parent: n
        });
      }
      if ("refinement" === r.type) {
        const e = e => {
          const t = r.refinement(e, a);
          if (n.common.async) return Promise.resolve(t);
          if (t instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return e;
        };
        if (!1 === n.common.async) {
          const r = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n
          });
          return "aborted" === r.status ? j : ("dirty" === r.status && t.dirty(), e(r.value), 
          {
            status: t.value,
            value: r.value
          });
        }
        return this._def.schema._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        }).then((n => "aborted" === n.status ? j : ("dirty" === n.status && t.dirty(), e(n.value).then((() => ({
          status: t.value,
          value: n.value
        }))))));
      }
      if ("transform" === r.type) {
        if (!1 === n.common.async) {
          const e = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n
          });
          if (!F(e)) return e;
          const i = r.transform(e.value, a);
          if (i instanceof Promise) throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
          return {
            status: t.value,
            value: i
          };
        }
        return this._def.schema._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        }).then((e => F(e) ? Promise.resolve(r.transform(e.value, a)).then((e => ({
          status: t.value,
          value: e
        }))) : e));
      }
      x.assertNever(r);
    }
  }
  Le.create = (e, t, n) => new Le({
    schema: e,
    typeName: Ve.ZodEffects,
    effect: t,
    ...V(n)
  }), Le.createWithPreprocess = (e, t, n) => new Le({
    schema: t,
    effect: {
      type: "preprocess",
      transform: e
    },
    typeName: Ve.ZodEffects,
    ...V(n)
  });
  class je extends q {
    _parse(e) {
      return this._getType(e) === E.undefined ? R(void 0) : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  je.create = (e, t) => new je({
    innerType: e,
    typeName: Ve.ZodOptional,
    ...V(t)
  });
  class Pe extends q {
    _parse(e) {
      return this._getType(e) === E.null ? R(null) : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  Pe.create = (e, t) => new Pe({
    innerType: e,
    typeName: Ve.ZodNullable,
    ...V(t)
  });
  class Re extends q {
    _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      let n = t.data;
      return t.parsedType === E.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
        data: n,
        path: t.path,
        parent: t
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  Re.create = (e, t) => new Re({
    innerType: e,
    typeName: Ve.ZodDefault,
    defaultValue: "function" == typeof t.default ? t.default : () => t.default,
    ...V(t)
  });
  class ze extends q {
    _parse(e) {
      const {ctx: t} = this._processInputParams(e), n = {
        ...t,
        common: {
          ...t.common,
          issues: []
        }
      }, r = this._def.innerType._parse({
        data: n.data,
        path: n.path,
        parent: {
          ...n
        }
      });
      return H(r) ? r.then((e => ({
        status: "valid",
        value: "valid" === e.status ? e.value : this._def.catchValue({
          get error() {
            return new C(n.common.issues);
          },
          input: n.data
        })
      }))) : {
        status: "valid",
        value: "valid" === r.status ? r.value : this._def.catchValue({
          get error() {
            return new C(n.common.issues);
          },
          input: n.data
        })
      };
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  ze.create = (e, t) => new ze({
    innerType: e,
    typeName: Ve.ZodCatch,
    catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
    ...V(t)
  });
  class De extends q {
    _parse(e) {
      if (this._getType(e) !== E.nan) {
        const t = this._getOrReturnCtx(e);
        return I(t, {
          code: A.invalid_type,
          expected: E.nan,
          received: t.parsedType
        }), j;
      }
      return {
        status: "valid",
        value: e.data
      };
    }
  }
  De.create = e => new De({
    typeName: Ve.ZodNaN,
    ...V(e)
  });
  const Fe = Symbol("zod_brand");
  class He extends q {
    _parse(e) {
      const {ctx: t} = this._processInputParams(e), n = t.data;
      return this._def.type._parse({
        data: n,
        path: t.path,
        parent: t
      });
    }
    unwrap() {
      return this._def.type;
    }
  }
  class $e extends q {
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.common.async) {
        return (async () => {
          const e = await this._def.in._parseAsync({
            data: n.data,
            path: n.path,
            parent: n
          });
          return "aborted" === e.status ? j : "dirty" === e.status ? (t.dirty(), P(e.value)) : this._def.out._parseAsync({
            data: e.value,
            path: n.path,
            parent: n
          });
        })();
      }
      {
        const e = this._def.in._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return "aborted" === e.status ? j : "dirty" === e.status ? (t.dirty(), {
          status: "dirty",
          value: e.value
        }) : this._def.out._parseSync({
          data: e.value,
          path: n.path,
          parent: n
        });
      }
    }
    static create(e, t) {
      return new $e({
        in: e,
        out: t,
        typeName: Ve.ZodPipeline
      });
    }
  }
  class Be extends q {
    _parse(e) {
      const t = this._def.innerType._parse(e);
      return F(t) && (t.value = Object.freeze(t.value)), t;
    }
  }
  Be.create = (e, t) => new Be({
    innerType: e,
    typeName: Ve.ZodReadonly,
    ...V(t)
  });
  const We = (e, t = {}, n) => e ? ce.create().superRefine(((r, a) => {
    var i, o;
    if (!e(r)) {
      const e = "function" == typeof t ? t(r) : "string" == typeof t ? {
        message: t
      } : t, s = null === (o = null !== (i = e.fatal) && void 0 !== i ? i : n) || void 0 === o || o, l = "string" == typeof e ? {
        message: e
      } : e;
      a.addIssue({
        code: "custom",
        ...l,
        fatal: s
      });
    }
  })) : ce.create(), Ue = {
    object: ge.lazycreate
  };
  var Ve, qe;
  (qe = Ve || (Ve = {})).ZodString = "ZodString", qe.ZodNumber = "ZodNumber", qe.ZodNaN = "ZodNaN", 
  qe.ZodBigInt = "ZodBigInt", qe.ZodBoolean = "ZodBoolean", qe.ZodDate = "ZodDate", 
  qe.ZodSymbol = "ZodSymbol", qe.ZodUndefined = "ZodUndefined", qe.ZodNull = "ZodNull", 
  qe.ZodAny = "ZodAny", qe.ZodUnknown = "ZodUnknown", qe.ZodNever = "ZodNever", qe.ZodVoid = "ZodVoid", 
  qe.ZodArray = "ZodArray", qe.ZodObject = "ZodObject", qe.ZodUnion = "ZodUnion", 
  qe.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", qe.ZodIntersection = "ZodIntersection", 
  qe.ZodTuple = "ZodTuple", qe.ZodRecord = "ZodRecord", qe.ZodMap = "ZodMap", qe.ZodSet = "ZodSet", 
  qe.ZodFunction = "ZodFunction", qe.ZodLazy = "ZodLazy", qe.ZodLiteral = "ZodLiteral", 
  qe.ZodEnum = "ZodEnum", qe.ZodEffects = "ZodEffects", qe.ZodNativeEnum = "ZodNativeEnum", 
  qe.ZodOptional = "ZodOptional", qe.ZodNullable = "ZodNullable", qe.ZodDefault = "ZodDefault", 
  qe.ZodCatch = "ZodCatch", qe.ZodPromise = "ZodPromise", qe.ZodBranded = "ZodBranded", 
  qe.ZodPipeline = "ZodPipeline", qe.ZodReadonly = "ZodReadonly";
  const Ze = te.create, Ke = re.create, Ye = De.create, Qe = ae.create, Ge = ie.create, Xe = oe.create, Je = se.create, et = le.create, tt = ue.create, nt = ce.create, rt = fe.create, at = de.create, it = pe.create, ot = he.create, st = ge.create, lt = ge.strictCreate, ut = ve.create, ct = be.create, ft = xe.create, dt = ke.create, pt = _e.create, ht = Ee.create, mt = Se.create, gt = Ae.create, vt = Ce.create, yt = Te.create, bt = Ne.create, wt = Me.create, xt = Ie.create, kt = Le.create, _t = je.create, Et = Pe.create, St = Le.createWithPreprocess, At = $e.create, Ct = {
    string: e => te.create({
      ...e,
      coerce: !0
    }),
    number: e => re.create({
      ...e,
      coerce: !0
    }),
    boolean: e => ie.create({
      ...e,
      coerce: !0
    }),
    bigint: e => ae.create({
      ...e,
      coerce: !0
    }),
    date: e => oe.create({
      ...e,
      coerce: !0
    })
  }, Tt = j;
  var Ot = Object.freeze({
    __proto__: null,
    defaultErrorMap: T,
    setErrorMap: function(e) {
      O = e;
    },
    getErrorMap: N,
    makeIssue: M,
    EMPTY_PATH: [],
    addIssueToContext: I,
    ParseStatus: L,
    INVALID: j,
    DIRTY: P,
    OK: R,
    isAborted: z,
    isDirty: D,
    isValid: F,
    isAsync: H,
    get util() {
      return x;
    },
    get objectUtil() {
      return _;
    },
    ZodParsedType: E,
    getParsedType: S,
    ZodType: q,
    ZodString: te,
    ZodNumber: re,
    ZodBigInt: ae,
    ZodBoolean: ie,
    ZodDate: oe,
    ZodSymbol: se,
    ZodUndefined: le,
    ZodNull: ue,
    ZodAny: ce,
    ZodUnknown: fe,
    ZodNever: de,
    ZodVoid: pe,
    ZodArray: he,
    ZodObject: ge,
    ZodUnion: ve,
    ZodDiscriminatedUnion: be,
    ZodIntersection: xe,
    ZodTuple: ke,
    ZodRecord: _e,
    ZodMap: Ee,
    ZodSet: Se,
    ZodFunction: Ae,
    ZodLazy: Ce,
    ZodLiteral: Te,
    ZodEnum: Ne,
    ZodNativeEnum: Me,
    ZodPromise: Ie,
    ZodEffects: Le,
    ZodTransformer: Le,
    ZodOptional: je,
    ZodNullable: Pe,
    ZodDefault: Re,
    ZodCatch: ze,
    ZodNaN: De,
    BRAND: Fe,
    ZodBranded: He,
    ZodPipeline: $e,
    ZodReadonly: Be,
    custom: We,
    Schema: q,
    ZodSchema: q,
    late: Ue,
    get ZodFirstPartyTypeKind() {
      return Ve;
    },
    coerce: Ct,
    any: nt,
    array: ot,
    bigint: Qe,
    boolean: Ge,
    date: Xe,
    discriminatedUnion: ct,
    effect: kt,
    enum: bt,
    function: gt,
    instanceof: (e, t = {
      message: `Input not instance of ${e.name}`
    }) => We((t => t instanceof e), t),
    intersection: ft,
    lazy: vt,
    literal: yt,
    map: ht,
    nan: Ye,
    nativeEnum: wt,
    never: at,
    null: tt,
    nullable: Et,
    number: Ke,
    object: st,
    oboolean: () => Ge().optional(),
    onumber: () => Ke().optional(),
    optional: _t,
    ostring: () => Ze().optional(),
    pipeline: At,
    preprocess: St,
    promise: xt,
    record: pt,
    set: mt,
    strictObject: lt,
    string: Ze,
    symbol: Je,
    transformer: kt,
    tuple: dt,
    undefined: et,
    union: ut,
    unknown: rt,
    void: it,
    NEVER: Tt,
    ZodIssueCode: A,
    quotelessJson: e => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
    ZodError: C
  });
  const Nt = Ot.object({
    pattern: Ot.string(),
    type: Ot.enum([ "include", "exclude" ]),
    selector: Ot.string()
  }), Mt = Ot.object({
    free: Ot.array(Ot.string()),
    assigned: Ot.map(Ot.string(), Ot.number())
  }), It = Ot.object({
    free: Ot.array(Ot.string()),
    tabIdsToMarkers: Ot.map(Ot.number(), Ot.string()),
    markersToTabIds: Ot.map(Ot.string(), Ot.number())
  }), Lt = Ot.object({
    hintUppercaseLetters: Ot.boolean(),
    hintFontFamily: Ot.string(),
    hintFontSize: Ot.number(),
    hintWeight: Ot.enum([ "auto", "normal", "bold" ]),
    hintBackgroundColor: Ot.string(),
    hintBackgroundOpacity: Ot.number(),
    hintFontColor: Ot.string(),
    hintMinimumContrastRatio: Ot.number(),
    hintBorderWidth: Ot.number(),
    hintBorderRadius: Ot.number(),
    includeSingleLetterHints: Ot.boolean(),
    useNumberHints: Ot.boolean(),
    hintsToExclude: Ot.string(),
    viewportMargin: Ot.number(),
    scrollBehavior: Ot.enum([ "auto", "smooth", "instant" ]),
    hintsToggleGlobal: Ot.boolean(),
    hintsToggleHosts: Ot.map(Ot.string(), Ot.boolean()),
    hintsTogglePaths: Ot.map(Ot.string(), Ot.boolean()),
    hintsToggleTabs: Ot.map(Ot.number(), Ot.boolean()),
    alwaysComputeHintables: Ot.boolean(),
    enableNotifications: Ot.boolean(),
    notifyWhenTogglingHints: Ot.boolean(),
    toastPosition: Ot.enum([ "top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left" ]),
    toastTransition: Ot.enum([ "slide", "flip", "zoom", "bounce" ]),
    toastDuration: Ot.number(),
    urlInTitle: Ot.boolean(),
    includeTabMarkers: Ot.boolean(),
    hideTabMarkersWithGlobalHintsOff: Ot.boolean(),
    uppercaseTabMarkers: Ot.boolean(),
    keyboardClicking: Ot.boolean(),
    keysToExclude: Ot.array(Ot.tuple([ Ot.string(), Ot.string() ])),
    customSelectors: Ot.array(Nt),
    customScrollPositions: Ot.map(Ot.string(), Ot.map(Ot.string(), Ot.number())),
    references: Ot.map(Ot.string(), Ot.map(Ot.string(), Ot.string())),
    showWhatsNewPageOnUpdate: Ot.boolean(),
    newTabPosition: Ot.enum([ "relatedAfterCurrent", "afterCurrent", "atEnd" ]),
    hasSeenSettingsPage: Ot.boolean(),
    directClickWithNoFocusedDocument: Ot.boolean(),
    directClickWhenEditing: Ot.boolean(),
    tabsByRecency: Ot.map(Ot.number(), Ot.array(Ot.number())),
    hintsStacks: Ot.map(Ot.number(), Mt),
    tabMarkers: It
  }), jt = [];
  for (let e = 999; e > 0; e--) jt.push(e.toString());
  var Pt, Rt, zt = {};
  Rt = {
    aliceblue: [ 240, 248, 255 ],
    antiquewhite: [ 250, 235, 215 ],
    aqua: [ 0, 255, 255 ],
    aquamarine: [ 127, 255, 212 ],
    azure: [ 240, 255, 255 ],
    beige: [ 245, 245, 220 ],
    bisque: [ 255, 228, 196 ],
    black: [ 0, 0, 0 ],
    blanchedalmond: [ 255, 235, 205 ],
    blue: [ 0, 0, 255 ],
    blueviolet: [ 138, 43, 226 ],
    brown: [ 165, 42, 42 ],
    burlywood: [ 222, 184, 135 ],
    cadetblue: [ 95, 158, 160 ],
    chartreuse: [ 127, 255, 0 ],
    chocolate: [ 210, 105, 30 ],
    coral: [ 255, 127, 80 ],
    cornflowerblue: [ 100, 149, 237 ],
    cornsilk: [ 255, 248, 220 ],
    crimson: [ 220, 20, 60 ],
    cyan: [ 0, 255, 255 ],
    darkblue: [ 0, 0, 139 ],
    darkcyan: [ 0, 139, 139 ],
    darkgoldenrod: [ 184, 134, 11 ],
    darkgray: [ 169, 169, 169 ],
    darkgreen: [ 0, 100, 0 ],
    darkgrey: [ 169, 169, 169 ],
    darkkhaki: [ 189, 183, 107 ],
    darkmagenta: [ 139, 0, 139 ],
    darkolivegreen: [ 85, 107, 47 ],
    darkorange: [ 255, 140, 0 ],
    darkorchid: [ 153, 50, 204 ],
    darkred: [ 139, 0, 0 ],
    darksalmon: [ 233, 150, 122 ],
    darkseagreen: [ 143, 188, 143 ],
    darkslateblue: [ 72, 61, 139 ],
    darkslategray: [ 47, 79, 79 ],
    darkslategrey: [ 47, 79, 79 ],
    darkturquoise: [ 0, 206, 209 ],
    darkviolet: [ 148, 0, 211 ],
    deeppink: [ 255, 20, 147 ],
    deepskyblue: [ 0, 191, 255 ],
    dimgray: [ 105, 105, 105 ],
    dimgrey: [ 105, 105, 105 ],
    dodgerblue: [ 30, 144, 255 ],
    firebrick: [ 178, 34, 34 ],
    floralwhite: [ 255, 250, 240 ],
    forestgreen: [ 34, 139, 34 ],
    fuchsia: [ 255, 0, 255 ],
    gainsboro: [ 220, 220, 220 ],
    ghostwhite: [ 248, 248, 255 ],
    gold: [ 255, 215, 0 ],
    goldenrod: [ 218, 165, 32 ],
    gray: [ 128, 128, 128 ],
    green: [ 0, 128, 0 ],
    greenyellow: [ 173, 255, 47 ],
    grey: [ 128, 128, 128 ],
    honeydew: [ 240, 255, 240 ],
    hotpink: [ 255, 105, 180 ],
    indianred: [ 205, 92, 92 ],
    indigo: [ 75, 0, 130 ],
    ivory: [ 255, 255, 240 ],
    khaki: [ 240, 230, 140 ],
    lavender: [ 230, 230, 250 ],
    lavenderblush: [ 255, 240, 245 ],
    lawngreen: [ 124, 252, 0 ],
    lemonchiffon: [ 255, 250, 205 ],
    lightblue: [ 173, 216, 230 ],
    lightcoral: [ 240, 128, 128 ],
    lightcyan: [ 224, 255, 255 ],
    lightgoldenrodyellow: [ 250, 250, 210 ],
    lightgray: [ 211, 211, 211 ],
    lightgreen: [ 144, 238, 144 ],
    lightgrey: [ 211, 211, 211 ],
    lightpink: [ 255, 182, 193 ],
    lightsalmon: [ 255, 160, 122 ],
    lightseagreen: [ 32, 178, 170 ],
    lightskyblue: [ 135, 206, 250 ],
    lightslategray: [ 119, 136, 153 ],
    lightslategrey: [ 119, 136, 153 ],
    lightsteelblue: [ 176, 196, 222 ],
    lightyellow: [ 255, 255, 224 ],
    lime: [ 0, 255, 0 ],
    limegreen: [ 50, 205, 50 ],
    linen: [ 250, 240, 230 ],
    magenta: [ 255, 0, 255 ],
    maroon: [ 128, 0, 0 ],
    mediumaquamarine: [ 102, 205, 170 ],
    mediumblue: [ 0, 0, 205 ],
    mediumorchid: [ 186, 85, 211 ],
    mediumpurple: [ 147, 112, 219 ],
    mediumseagreen: [ 60, 179, 113 ],
    mediumslateblue: [ 123, 104, 238 ],
    mediumspringgreen: [ 0, 250, 154 ],
    mediumturquoise: [ 72, 209, 204 ],
    mediumvioletred: [ 199, 21, 133 ],
    midnightblue: [ 25, 25, 112 ],
    mintcream: [ 245, 255, 250 ],
    mistyrose: [ 255, 228, 225 ],
    moccasin: [ 255, 228, 181 ],
    navajowhite: [ 255, 222, 173 ],
    navy: [ 0, 0, 128 ],
    oldlace: [ 253, 245, 230 ],
    olive: [ 128, 128, 0 ],
    olivedrab: [ 107, 142, 35 ],
    orange: [ 255, 165, 0 ],
    orangered: [ 255, 69, 0 ],
    orchid: [ 218, 112, 214 ],
    palegoldenrod: [ 238, 232, 170 ],
    palegreen: [ 152, 251, 152 ],
    paleturquoise: [ 175, 238, 238 ],
    palevioletred: [ 219, 112, 147 ],
    papayawhip: [ 255, 239, 213 ],
    peachpuff: [ 255, 218, 185 ],
    peru: [ 205, 133, 63 ],
    pink: [ 255, 192, 203 ],
    plum: [ 221, 160, 221 ],
    powderblue: [ 176, 224, 230 ],
    purple: [ 128, 0, 128 ],
    rebeccapurple: [ 102, 51, 153 ],
    red: [ 255, 0, 0 ],
    rosybrown: [ 188, 143, 143 ],
    royalblue: [ 65, 105, 225 ],
    saddlebrown: [ 139, 69, 19 ],
    salmon: [ 250, 128, 114 ],
    sandybrown: [ 244, 164, 96 ],
    seagreen: [ 46, 139, 87 ],
    seashell: [ 255, 245, 238 ],
    sienna: [ 160, 82, 45 ],
    silver: [ 192, 192, 192 ],
    skyblue: [ 135, 206, 235 ],
    slateblue: [ 106, 90, 205 ],
    slategray: [ 112, 128, 144 ],
    slategrey: [ 112, 128, 144 ],
    snow: [ 255, 250, 250 ],
    springgreen: [ 0, 255, 127 ],
    steelblue: [ 70, 130, 180 ],
    tan: [ 210, 180, 140 ],
    teal: [ 0, 128, 128 ],
    thistle: [ 216, 191, 216 ],
    tomato: [ 255, 99, 71 ],
    turquoise: [ 64, 224, 208 ],
    violet: [ 238, 130, 238 ],
    wheat: [ 245, 222, 179 ],
    white: [ 255, 255, 255 ],
    whitesmoke: [ 245, 245, 245 ],
    yellow: [ 255, 255, 0 ],
    yellowgreen: [ 154, 205, 50 ]
  };
  var Dt, Ft;
  Ft = function(e) {
    return !(!e || "string" == typeof e) && (e instanceof Array || Array.isArray(e) || e.length >= 0 && (e.splice instanceof Function || Object.getOwnPropertyDescriptor(e, e.length - 1) && "String" !== e.constructor.name));
  };
  var Ht = Array.prototype.concat, $t = Array.prototype.slice, Bt = Dt = function(e) {
    for (var t = [], n = 0, r = e.length; n < r; n++) {
      var a = e[n];
      Ft(a) ? t = Ht.call(t, $t.call(a)) : t.push(a);
    }
    return t;
  };
  Bt.wrap = function(e) {
    return function() {
      return e(Bt(arguments));
    };
  };
  var Wt = Object.hasOwnProperty, Ut = Object.create(null);
  for (var Vt in Rt) Wt.call(Rt, Vt) && (Ut[Rt[Vt]] = Vt);
  var qt = zt = {
    to: {},
    get: {}
  };
  function Zt(e, t, n) {
    return Math.min(Math.max(t, e), n);
  }
  function Kt(e) {
    var t = Math.round(e).toString(16).toUpperCase();
    return t.length < 2 ? "0" + t : t;
  }
  qt.get = function(e) {
    var t, n;
    switch (e.substring(0, 3).toLowerCase()) {
     case "hsl":
      t = qt.get.hsl(e), n = "hsl";
      break;

     case "hwb":
      t = qt.get.hwb(e), n = "hwb";
      break;

     default:
      t = qt.get.rgb(e), n = "rgb";
    }
    return t ? {
      model: n,
      value: t
    } : null;
  }, qt.get.rgb = function(e) {
    if (!e) return null;
    var t, n, r, a = [ 0, 0, 0, 1 ];
    if (t = e.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)) {
      for (r = t[2], t = t[1], n = 0; n < 3; n++) {
        var i = 2 * n;
        a[n] = parseInt(t.slice(i, i + 2), 16);
      }
      r && (a[3] = parseInt(r, 16) / 255);
    } else if (t = e.match(/^#([a-f0-9]{3,4})$/i)) {
      for (r = (t = t[1])[3], n = 0; n < 3; n++) a[n] = parseInt(t[n] + t[n], 16);
      r && (a[3] = parseInt(r + r, 16) / 255);
    } else if (t = e.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)) {
      for (n = 0; n < 3; n++) a[n] = parseInt(t[n + 1], 0);
      t[4] && (t[5] ? a[3] = .01 * parseFloat(t[4]) : a[3] = parseFloat(t[4]));
    } else {
      if (!(t = e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/))) return (t = e.match(/^(\w+)$/)) ? "transparent" === t[1] ? [ 0, 0, 0, 0 ] : Wt.call(Rt, t[1]) ? ((a = Rt[t[1]])[3] = 1, 
      a) : null : null;
      for (n = 0; n < 3; n++) a[n] = Math.round(2.55 * parseFloat(t[n + 1]));
      t[4] && (t[5] ? a[3] = .01 * parseFloat(t[4]) : a[3] = parseFloat(t[4]));
    }
    for (n = 0; n < 3; n++) a[n] = Zt(a[n], 0, 255);
    return a[3] = Zt(a[3], 0, 1), a;
  }, qt.get.hsl = function(e) {
    if (!e) return null;
    var t = e.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
    if (t) {
      var n = parseFloat(t[4]);
      return [ (parseFloat(t[1]) % 360 + 360) % 360, Zt(parseFloat(t[2]), 0, 100), Zt(parseFloat(t[3]), 0, 100), Zt(isNaN(n) ? 1 : n, 0, 1) ];
    }
    return null;
  }, qt.get.hwb = function(e) {
    if (!e) return null;
    var t = e.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
    if (t) {
      var n = parseFloat(t[4]);
      return [ (parseFloat(t[1]) % 360 + 360) % 360, Zt(parseFloat(t[2]), 0, 100), Zt(parseFloat(t[3]), 0, 100), Zt(isNaN(n) ? 1 : n, 0, 1) ];
    }
    return null;
  }, qt.to.hex = function() {
    var e = Dt(arguments);
    return "#" + Kt(e[0]) + Kt(e[1]) + Kt(e[2]) + (e[3] < 1 ? Kt(Math.round(255 * e[3])) : "");
  }, qt.to.rgb = function() {
    var e = Dt(arguments);
    return e.length < 4 || 1 === e[3] ? "rgb(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ")" : "rgba(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ", " + e[3] + ")";
  }, qt.to.rgb.percent = function() {
    var e = Dt(arguments), t = Math.round(e[0] / 255 * 100), n = Math.round(e[1] / 255 * 100), r = Math.round(e[2] / 255 * 100);
    return e.length < 4 || 1 === e[3] ? "rgb(" + t + "%, " + n + "%, " + r + "%)" : "rgba(" + t + "%, " + n + "%, " + r + "%, " + e[3] + ")";
  }, qt.to.hsl = function() {
    var e = Dt(arguments);
    return e.length < 4 || 1 === e[3] ? "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)" : "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + e[3] + ")";
  }, qt.to.hwb = function() {
    var e = Dt(arguments), t = "";
    return e.length >= 4 && 1 !== e[3] && (t = ", " + e[3]), "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + t + ")";
  }, qt.to.keyword = function(e) {
    return Ut[e.slice(0, 3)];
  };
  var Yt, Qt = {};
  const Gt = {};
  for (const e of Object.keys(Rt)) Gt[Rt[e]] = e;
  const Xt = {
    rgb: {
      channels: 3,
      labels: "rgb"
    },
    hsl: {
      channels: 3,
      labels: "hsl"
    },
    hsv: {
      channels: 3,
      labels: "hsv"
    },
    hwb: {
      channels: 3,
      labels: "hwb"
    },
    cmyk: {
      channels: 4,
      labels: "cmyk"
    },
    xyz: {
      channels: 3,
      labels: "xyz"
    },
    lab: {
      channels: 3,
      labels: "lab"
    },
    lch: {
      channels: 3,
      labels: "lch"
    },
    hex: {
      channels: 1,
      labels: [ "hex" ]
    },
    keyword: {
      channels: 1,
      labels: [ "keyword" ]
    },
    ansi16: {
      channels: 1,
      labels: [ "ansi16" ]
    },
    ansi256: {
      channels: 1,
      labels: [ "ansi256" ]
    },
    hcg: {
      channels: 3,
      labels: [ "h", "c", "g" ]
    },
    apple: {
      channels: 3,
      labels: [ "r16", "g16", "b16" ]
    },
    gray: {
      channels: 1,
      labels: [ "gray" ]
    }
  };
  Yt = Xt;
  for (const e of Object.keys(Xt)) {
    if (!("channels" in Xt[e])) throw new Error("missing channels property: " + e);
    if (!("labels" in Xt[e])) throw new Error("missing channel labels property: " + e);
    if (Xt[e].labels.length !== Xt[e].channels) throw new Error("channel and label counts mismatch: " + e);
    const {channels: t, labels: n} = Xt[e];
    delete Xt[e].channels, delete Xt[e].labels, Object.defineProperty(Xt[e], "channels", {
      value: t
    }), Object.defineProperty(Xt[e], "labels", {
      value: n
    });
  }
  Xt.rgb.hsl = function(e) {
    const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, a = Math.min(t, n, r), i = Math.max(t, n, r), o = i - a;
    let s, l;
    i === a ? s = 0 : t === i ? s = (n - r) / o : n === i ? s = 2 + (r - t) / o : r === i && (s = 4 + (t - n) / o), 
    s = Math.min(60 * s, 360), s < 0 && (s += 360);
    const u = (a + i) / 2;
    return l = i === a ? 0 : u <= .5 ? o / (i + a) : o / (2 - i - a), [ s, 100 * l, 100 * u ];
  }, Xt.rgb.hsv = function(e) {
    let t, n, r, a, i;
    const o = e[0] / 255, s = e[1] / 255, l = e[2] / 255, u = Math.max(o, s, l), c = u - Math.min(o, s, l), f = function(e) {
      return (u - e) / 6 / c + .5;
    };
    return 0 === c ? (a = 0, i = 0) : (i = c / u, t = f(o), n = f(s), r = f(l), o === u ? a = r - n : s === u ? a = 1 / 3 + t - r : l === u && (a = 2 / 3 + n - t), 
    a < 0 ? a += 1 : a > 1 && (a -= 1)), [ 360 * a, 100 * i, 100 * u ];
  }, Xt.rgb.hwb = function(e) {
    const t = e[0], n = e[1];
    let r = e[2];
    const a = Xt.rgb.hsl(e)[0], i = 1 / 255 * Math.min(t, Math.min(n, r));
    return r = 1 - 1 / 255 * Math.max(t, Math.max(n, r)), [ a, 100 * i, 100 * r ];
  }, Xt.rgb.cmyk = function(e) {
    const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, a = Math.min(1 - t, 1 - n, 1 - r);
    return [ 100 * ((1 - t - a) / (1 - a) || 0), 100 * ((1 - n - a) / (1 - a) || 0), 100 * ((1 - r - a) / (1 - a) || 0), 100 * a ];
  }, Xt.rgb.keyword = function(e) {
    const t = Gt[e];
    if (t) return t;
    let n, r = 1 / 0;
    for (const t of Object.keys(Rt)) {
      const o = (i = Rt[t], ((a = e)[0] - i[0]) ** 2 + (a[1] - i[1]) ** 2 + (a[2] - i[2]) ** 2);
      o < r && (r = o, n = t);
    }
    var a, i;
    return n;
  }, Xt.keyword.rgb = function(e) {
    return Rt[e];
  }, Xt.rgb.xyz = function(e) {
    let t = e[0] / 255, n = e[1] / 255, r = e[2] / 255;
    t = t > .04045 ? ((t + .055) / 1.055) ** 2.4 : t / 12.92, n = n > .04045 ? ((n + .055) / 1.055) ** 2.4 : n / 12.92, 
    r = r > .04045 ? ((r + .055) / 1.055) ** 2.4 : r / 12.92;
    return [ 100 * (.4124 * t + .3576 * n + .1805 * r), 100 * (.2126 * t + .7152 * n + .0722 * r), 100 * (.0193 * t + .1192 * n + .9505 * r) ];
  }, Xt.rgb.lab = function(e) {
    const t = Xt.rgb.xyz(e);
    let n = t[0], r = t[1], a = t[2];
    n /= 95.047, r /= 100, a /= 108.883, n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116, 
    r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116, a = a > .008856 ? a ** (1 / 3) : 7.787 * a + 16 / 116;
    return [ 116 * r - 16, 500 * (n - r), 200 * (r - a) ];
  }, Xt.hsl.rgb = function(e) {
    const t = e[0] / 360, n = e[1] / 100, r = e[2] / 100;
    let a, i, o;
    if (0 === n) return o = 255 * r, [ o, o, o ];
    a = r < .5 ? r * (1 + n) : r + n - r * n;
    const s = 2 * r - a, l = [ 0, 0, 0 ];
    for (let e = 0; e < 3; e++) i = t + 1 / 3 * -(e - 1), i < 0 && i++, i > 1 && i--, 
    o = 6 * i < 1 ? s + 6 * (a - s) * i : 2 * i < 1 ? a : 3 * i < 2 ? s + (a - s) * (2 / 3 - i) * 6 : s, 
    l[e] = 255 * o;
    return l;
  }, Xt.hsl.hsv = function(e) {
    const t = e[0];
    let n = e[1] / 100, r = e[2] / 100, a = n;
    const i = Math.max(r, .01);
    r *= 2, n *= r <= 1 ? r : 2 - r, a *= i <= 1 ? i : 2 - i;
    return [ t, 100 * (0 === r ? 2 * a / (i + a) : 2 * n / (r + n)), 100 * ((r + n) / 2) ];
  }, Xt.hsv.rgb = function(e) {
    const t = e[0] / 60, n = e[1] / 100;
    let r = e[2] / 100;
    const a = Math.floor(t) % 6, i = t - Math.floor(t), o = 255 * r * (1 - n), s = 255 * r * (1 - n * i), l = 255 * r * (1 - n * (1 - i));
    switch (r *= 255, a) {
     case 0:
      return [ r, l, o ];

     case 1:
      return [ s, r, o ];

     case 2:
      return [ o, r, l ];

     case 3:
      return [ o, s, r ];

     case 4:
      return [ l, o, r ];

     case 5:
      return [ r, o, s ];
    }
  }, Xt.hsv.hsl = function(e) {
    const t = e[0], n = e[1] / 100, r = e[2] / 100, a = Math.max(r, .01);
    let i, o;
    o = (2 - n) * r;
    const s = (2 - n) * a;
    return i = n * a, i /= s <= 1 ? s : 2 - s, i = i || 0, o /= 2, [ t, 100 * i, 100 * o ];
  }, Xt.hwb.rgb = function(e) {
    const t = e[0] / 360;
    let n = e[1] / 100, r = e[2] / 100;
    const a = n + r;
    let i;
    a > 1 && (n /= a, r /= a);
    const o = Math.floor(6 * t), s = 1 - r;
    i = 6 * t - o, 0 != (1 & o) && (i = 1 - i);
    const l = n + i * (s - n);
    let u, c, f;
    switch (o) {
     default:
     case 6:
     case 0:
      u = s, c = l, f = n;
      break;

     case 1:
      u = l, c = s, f = n;
      break;

     case 2:
      u = n, c = s, f = l;
      break;

     case 3:
      u = n, c = l, f = s;
      break;

     case 4:
      u = l, c = n, f = s;
      break;

     case 5:
      u = s, c = n, f = l;
    }
    return [ 255 * u, 255 * c, 255 * f ];
  }, Xt.cmyk.rgb = function(e) {
    const t = e[0] / 100, n = e[1] / 100, r = e[2] / 100, a = e[3] / 100;
    return [ 255 * (1 - Math.min(1, t * (1 - a) + a)), 255 * (1 - Math.min(1, n * (1 - a) + a)), 255 * (1 - Math.min(1, r * (1 - a) + a)) ];
  }, Xt.xyz.rgb = function(e) {
    const t = e[0] / 100, n = e[1] / 100, r = e[2] / 100;
    let a, i, o;
    return a = 3.2406 * t + -1.5372 * n + -.4986 * r, i = -.9689 * t + 1.8758 * n + .0415 * r, 
    o = .0557 * t + -.204 * n + 1.057 * r, a = a > .0031308 ? 1.055 * a ** (1 / 2.4) - .055 : 12.92 * a, 
    i = i > .0031308 ? 1.055 * i ** (1 / 2.4) - .055 : 12.92 * i, o = o > .0031308 ? 1.055 * o ** (1 / 2.4) - .055 : 12.92 * o, 
    a = Math.min(Math.max(0, a), 1), i = Math.min(Math.max(0, i), 1), o = Math.min(Math.max(0, o), 1), 
    [ 255 * a, 255 * i, 255 * o ];
  }, Xt.xyz.lab = function(e) {
    let t = e[0], n = e[1], r = e[2];
    t /= 95.047, n /= 100, r /= 108.883, t = t > .008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116, 
    n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116, r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116;
    return [ 116 * n - 16, 500 * (t - n), 200 * (n - r) ];
  }, Xt.lab.xyz = function(e) {
    let t, n, r;
    n = (e[0] + 16) / 116, t = e[1] / 500 + n, r = n - e[2] / 200;
    const a = n ** 3, i = t ** 3, o = r ** 3;
    return n = a > .008856 ? a : (n - 16 / 116) / 7.787, t = i > .008856 ? i : (t - 16 / 116) / 7.787, 
    r = o > .008856 ? o : (r - 16 / 116) / 7.787, t *= 95.047, n *= 100, r *= 108.883, 
    [ t, n, r ];
  }, Xt.lab.lch = function(e) {
    const t = e[0], n = e[1], r = e[2];
    let a;
    a = 360 * Math.atan2(r, n) / 2 / Math.PI, a < 0 && (a += 360);
    return [ t, Math.sqrt(n * n + r * r), a ];
  }, Xt.lch.lab = function(e) {
    const t = e[0], n = e[1], r = e[2] / 360 * 2 * Math.PI;
    return [ t, n * Math.cos(r), n * Math.sin(r) ];
  }, Xt.rgb.ansi16 = function(e, t = null) {
    const [n, r, a] = e;
    let i = null === t ? Xt.rgb.hsv(e)[2] : t;
    if (i = Math.round(i / 50), 0 === i) return 30;
    let o = 30 + (Math.round(a / 255) << 2 | Math.round(r / 255) << 1 | Math.round(n / 255));
    return 2 === i && (o += 60), o;
  }, Xt.hsv.ansi16 = function(e) {
    return Xt.rgb.ansi16(Xt.hsv.rgb(e), e[2]);
  }, Xt.rgb.ansi256 = function(e) {
    const t = e[0], n = e[1], r = e[2];
    if (t === n && n === r) return t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232;
    return 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(r / 255 * 5);
  }, Xt.ansi16.rgb = function(e) {
    let t = e % 10;
    if (0 === t || 7 === t) return e > 50 && (t += 3.5), t = t / 10.5 * 255, [ t, t, t ];
    const n = .5 * (1 + ~~(e > 50));
    return [ (1 & t) * n * 255, (t >> 1 & 1) * n * 255, (t >> 2 & 1) * n * 255 ];
  }, Xt.ansi256.rgb = function(e) {
    if (e >= 232) {
      const t = 10 * (e - 232) + 8;
      return [ t, t, t ];
    }
    let t;
    e -= 16;
    return [ Math.floor(e / 36) / 5 * 255, Math.floor((t = e % 36) / 6) / 5 * 255, t % 6 / 5 * 255 ];
  }, Xt.rgb.hex = function(e) {
    const t = (((255 & Math.round(e[0])) << 16) + ((255 & Math.round(e[1])) << 8) + (255 & Math.round(e[2]))).toString(16).toUpperCase();
    return "000000".substring(t.length) + t;
  }, Xt.hex.rgb = function(e) {
    const t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!t) return [ 0, 0, 0 ];
    let n = t[0];
    3 === t[0].length && (n = n.split("").map((e => e + e)).join(""));
    const r = parseInt(n, 16);
    return [ r >> 16 & 255, r >> 8 & 255, 255 & r ];
  }, Xt.rgb.hcg = function(e) {
    const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, a = Math.max(Math.max(t, n), r), i = Math.min(Math.min(t, n), r), o = a - i;
    let s, l;
    return s = o < 1 ? i / (1 - o) : 0, l = o <= 0 ? 0 : a === t ? (n - r) / o % 6 : a === n ? 2 + (r - t) / o : 4 + (t - n) / o, 
    l /= 6, l %= 1, [ 360 * l, 100 * o, 100 * s ];
  }, Xt.hsl.hcg = function(e) {
    const t = e[1] / 100, n = e[2] / 100, r = n < .5 ? 2 * t * n : 2 * t * (1 - n);
    let a = 0;
    return r < 1 && (a = (n - .5 * r) / (1 - r)), [ e[0], 100 * r, 100 * a ];
  }, Xt.hsv.hcg = function(e) {
    const t = e[1] / 100, n = e[2] / 100, r = t * n;
    let a = 0;
    return r < 1 && (a = (n - r) / (1 - r)), [ e[0], 100 * r, 100 * a ];
  }, Xt.hcg.rgb = function(e) {
    const t = e[0] / 360, n = e[1] / 100, r = e[2] / 100;
    if (0 === n) return [ 255 * r, 255 * r, 255 * r ];
    const a = [ 0, 0, 0 ], i = t % 1 * 6, o = i % 1, s = 1 - o;
    let l = 0;
    switch (Math.floor(i)) {
     case 0:
      a[0] = 1, a[1] = o, a[2] = 0;
      break;

     case 1:
      a[0] = s, a[1] = 1, a[2] = 0;
      break;

     case 2:
      a[0] = 0, a[1] = 1, a[2] = o;
      break;

     case 3:
      a[0] = 0, a[1] = s, a[2] = 1;
      break;

     case 4:
      a[0] = o, a[1] = 0, a[2] = 1;
      break;

     default:
      a[0] = 1, a[1] = 0, a[2] = s;
    }
    return l = (1 - n) * r, [ 255 * (n * a[0] + l), 255 * (n * a[1] + l), 255 * (n * a[2] + l) ];
  }, Xt.hcg.hsv = function(e) {
    const t = e[1] / 100, n = t + e[2] / 100 * (1 - t);
    let r = 0;
    return n > 0 && (r = t / n), [ e[0], 100 * r, 100 * n ];
  }, Xt.hcg.hsl = function(e) {
    const t = e[1] / 100, n = e[2] / 100 * (1 - t) + .5 * t;
    let r = 0;
    return n > 0 && n < .5 ? r = t / (2 * n) : n >= .5 && n < 1 && (r = t / (2 * (1 - n))), 
    [ e[0], 100 * r, 100 * n ];
  }, Xt.hcg.hwb = function(e) {
    const t = e[1] / 100, n = t + e[2] / 100 * (1 - t);
    return [ e[0], 100 * (n - t), 100 * (1 - n) ];
  }, Xt.hwb.hcg = function(e) {
    const t = e[1] / 100, n = 1 - e[2] / 100, r = n - t;
    let a = 0;
    return r < 1 && (a = (n - r) / (1 - r)), [ e[0], 100 * r, 100 * a ];
  }, Xt.apple.rgb = function(e) {
    return [ e[0] / 65535 * 255, e[1] / 65535 * 255, e[2] / 65535 * 255 ];
  }, Xt.rgb.apple = function(e) {
    return [ e[0] / 255 * 65535, e[1] / 255 * 65535, e[2] / 255 * 65535 ];
  }, Xt.gray.rgb = function(e) {
    return [ e[0] / 100 * 255, e[0] / 100 * 255, e[0] / 100 * 255 ];
  }, Xt.gray.hsl = function(e) {
    return [ 0, 0, e[0] ];
  }, Xt.gray.hsv = Xt.gray.hsl, Xt.gray.hwb = function(e) {
    return [ 0, 100, e[0] ];
  }, Xt.gray.cmyk = function(e) {
    return [ 0, 0, 0, e[0] ];
  }, Xt.gray.lab = function(e) {
    return [ e[0], 0, 0 ];
  }, Xt.gray.hex = function(e) {
    const t = 255 & Math.round(e[0] / 100 * 255), n = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
    return "000000".substring(n.length) + n;
  }, Xt.rgb.gray = function(e) {
    return [ (e[0] + e[1] + e[2]) / 3 / 255 * 100 ];
  };
  var Jt;
  function en(e) {
    const t = function() {
      const e = {}, t = Object.keys(Yt);
      for (let n = t.length, r = 0; r < n; r++) e[t[r]] = {
        distance: -1,
        parent: null
      };
      return e;
    }(), n = [ e ];
    for (t[e].distance = 0; n.length; ) {
      const e = n.pop(), r = Object.keys(Yt[e]);
      for (let a = r.length, i = 0; i < a; i++) {
        const a = r[i], o = t[a];
        -1 === o.distance && (o.distance = t[e].distance + 1, o.parent = e, n.unshift(a));
      }
    }
    return t;
  }
  function tn(e, t) {
    return function(n) {
      return t(e(n));
    };
  }
  function nn(e, t) {
    const n = [ t[e].parent, e ];
    let r = Yt[t[e].parent][e], a = t[e].parent;
    for (;t[a].parent; ) n.unshift(t[a].parent), r = tn(Yt[t[a].parent][a], r), a = t[a].parent;
    return r.conversion = n, r;
  }
  Jt = function(e) {
    const t = en(e), n = {}, r = Object.keys(t);
    for (let e = r.length, a = 0; a < e; a++) {
      const e = r[a];
      null !== t[e].parent && (n[e] = nn(e, t));
    }
    return n;
  };
  const rn = {};
  Object.keys(Yt).forEach((e => {
    rn[e] = {}, Object.defineProperty(rn[e], "channels", {
      value: Yt[e].channels
    }), Object.defineProperty(rn[e], "labels", {
      value: Yt[e].labels
    });
    const t = Jt(e);
    Object.keys(t).forEach((n => {
      const r = t[n];
      rn[e][n] = function(e) {
        const t = function(...t) {
          const n = t[0];
          if (null == n) return n;
          n.length > 1 && (t = n);
          const r = e(t);
          if ("object" == typeof r) for (let e = r.length, t = 0; t < e; t++) r[t] = Math.round(r[t]);
          return r;
        };
        return "conversion" in e && (t.conversion = e.conversion), t;
      }(r), rn[e][n].raw = function(e) {
        const t = function(...t) {
          const n = t[0];
          return null == n ? n : (n.length > 1 && (t = n), e(t));
        };
        return "conversion" in e && (t.conversion = e.conversion), t;
      }(r);
    }));
  })), Qt = rn;
  const an = [ "keyword", "gray", "hex" ], on = {};
  for (const e of Object.keys(Qt)) on[[ ...Qt[e].labels ].sort().join("")] = e;
  const sn = {};
  function ln(e, t) {
    if (!(this instanceof ln)) return new ln(e, t);
    if (t && t in an && (t = null), t && !(t in Qt)) throw new Error("Unknown model: " + t);
    let n, r;
    if (null == e) this.model = "rgb", this.color = [ 0, 0, 0 ], this.valpha = 1; else if (e instanceof ln) this.model = e.model, 
    this.color = [ ...e.color ], this.valpha = e.valpha; else if ("string" == typeof e) {
      const t = zt.get(e);
      if (null === t) throw new Error("Unable to parse color from string: " + e);
      this.model = t.model, r = Qt[this.model].channels, this.color = t.value.slice(0, r), 
      this.valpha = "number" == typeof t.value[r] ? t.value[r] : 1;
    } else if (e.length > 0) {
      this.model = t || "rgb", r = Qt[this.model].channels;
      const n = Array.prototype.slice.call(e, 0, r);
      this.color = dn(n, r), this.valpha = "number" == typeof e[r] ? e[r] : 1;
    } else if ("number" == typeof e) this.model = "rgb", this.color = [ e >> 16 & 255, e >> 8 & 255, 255 & e ], 
    this.valpha = 1; else {
      this.valpha = 1;
      const t = Object.keys(e);
      "alpha" in e && (t.splice(t.indexOf("alpha"), 1), this.valpha = "number" == typeof e.alpha ? e.alpha : 0);
      const r = t.sort().join("");
      if (!(r in on)) throw new Error("Unable to parse color from object: " + JSON.stringify(e));
      this.model = on[r];
      const {labels: a} = Qt[this.model], i = [];
      for (n = 0; n < a.length; n++) i.push(e[a[n]]);
      this.color = dn(i);
    }
    if (sn[this.model]) for (r = Qt[this.model].channels, n = 0; n < r; n++) {
      const e = sn[this.model][n];
      e && (this.color[n] = e(this.color[n]));
    }
    this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze && Object.freeze(this);
  }
  ln.prototype = {
    toString() {
      return this.string();
    },
    toJSON() {
      return this[this.model]();
    },
    string(e) {
      let t = this.model in zt.to ? this : this.rgb();
      t = t.round("number" == typeof e ? e : 1);
      const n = 1 === t.valpha ? t.color : [ ...t.color, this.valpha ];
      return zt.to[t.model](n);
    },
    percentString(e) {
      const t = this.rgb().round("number" == typeof e ? e : 1), n = 1 === t.valpha ? t.color : [ ...t.color, this.valpha ];
      return zt.to.rgb.percent(n);
    },
    array() {
      return 1 === this.valpha ? [ ...this.color ] : [ ...this.color, this.valpha ];
    },
    object() {
      const e = {}, {channels: t} = Qt[this.model], {labels: n} = Qt[this.model];
      for (let r = 0; r < t; r++) e[n[r]] = this.color[r];
      return 1 !== this.valpha && (e.alpha = this.valpha), e;
    },
    unitArray() {
      const e = this.rgb().color;
      return e[0] /= 255, e[1] /= 255, e[2] /= 255, 1 !== this.valpha && e.push(this.valpha), 
      e;
    },
    unitObject() {
      const e = this.rgb().object();
      return e.r /= 255, e.g /= 255, e.b /= 255, 1 !== this.valpha && (e.alpha = this.valpha), 
      e;
    },
    round(e) {
      return e = Math.max(e || 0, 0), new ln([ ...this.color.map(un(e)), this.valpha ], this.model);
    },
    alpha(e) {
      return void 0 !== e ? new ln([ ...this.color, Math.max(0, Math.min(1, e)) ], this.model) : this.valpha;
    },
    red: cn("rgb", 0, fn(255)),
    green: cn("rgb", 1, fn(255)),
    blue: cn("rgb", 2, fn(255)),
    hue: cn([ "hsl", "hsv", "hsl", "hwb", "hcg" ], 0, (e => (e % 360 + 360) % 360)),
    saturationl: cn("hsl", 1, fn(100)),
    lightness: cn("hsl", 2, fn(100)),
    saturationv: cn("hsv", 1, fn(100)),
    value: cn("hsv", 2, fn(100)),
    chroma: cn("hcg", 1, fn(100)),
    gray: cn("hcg", 2, fn(100)),
    white: cn("hwb", 1, fn(100)),
    wblack: cn("hwb", 2, fn(100)),
    cyan: cn("cmyk", 0, fn(100)),
    magenta: cn("cmyk", 1, fn(100)),
    yellow: cn("cmyk", 2, fn(100)),
    black: cn("cmyk", 3, fn(100)),
    x: cn("xyz", 0, fn(95.047)),
    y: cn("xyz", 1, fn(100)),
    z: cn("xyz", 2, fn(108.833)),
    l: cn("lab", 0, fn(100)),
    a: cn("lab", 1),
    b: cn("lab", 2),
    keyword(e) {
      return void 0 !== e ? new ln(e) : Qt[this.model].keyword(this.color);
    },
    hex(e) {
      return void 0 !== e ? new ln(e) : zt.to.hex(this.rgb().round().color);
    },
    hexa(e) {
      if (void 0 !== e) return new ln(e);
      const t = this.rgb().round().color;
      let n = Math.round(255 * this.valpha).toString(16).toUpperCase();
      return 1 === n.length && (n = "0" + n), zt.to.hex(t) + n;
    },
    rgbNumber() {
      const e = this.rgb().color;
      return (255 & e[0]) << 16 | (255 & e[1]) << 8 | 255 & e[2];
    },
    luminosity() {
      const e = this.rgb().color, t = [];
      for (const [n, r] of e.entries()) {
        const e = r / 255;
        t[n] = e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4;
      }
      return .2126 * t[0] + .7152 * t[1] + .0722 * t[2];
    },
    contrast(e) {
      const t = this.luminosity(), n = e.luminosity();
      return t > n ? (t + .05) / (n + .05) : (n + .05) / (t + .05);
    },
    level(e) {
      const t = this.contrast(e);
      return t >= 7 ? "AAA" : t >= 4.5 ? "AA" : "";
    },
    isDark() {
      const e = this.rgb().color;
      return (2126 * e[0] + 7152 * e[1] + 722 * e[2]) / 1e4 < 128;
    },
    isLight() {
      return !this.isDark();
    },
    negate() {
      const e = this.rgb();
      for (let t = 0; t < 3; t++) e.color[t] = 255 - e.color[t];
      return e;
    },
    lighten(e) {
      const t = this.hsl();
      return t.color[2] += t.color[2] * e, t;
    },
    darken(e) {
      const t = this.hsl();
      return t.color[2] -= t.color[2] * e, t;
    },
    saturate(e) {
      const t = this.hsl();
      return t.color[1] += t.color[1] * e, t;
    },
    desaturate(e) {
      const t = this.hsl();
      return t.color[1] -= t.color[1] * e, t;
    },
    whiten(e) {
      const t = this.hwb();
      return t.color[1] += t.color[1] * e, t;
    },
    blacken(e) {
      const t = this.hwb();
      return t.color[2] += t.color[2] * e, t;
    },
    grayscale() {
      const e = this.rgb().color, t = .3 * e[0] + .59 * e[1] + .11 * e[2];
      return ln.rgb(t, t, t);
    },
    fade(e) {
      return this.alpha(this.valpha - this.valpha * e);
    },
    opaquer(e) {
      return this.alpha(this.valpha + this.valpha * e);
    },
    rotate(e) {
      const t = this.hsl();
      let n = t.color[0];
      return n = (n + e) % 360, n = n < 0 ? 360 + n : n, t.color[0] = n, t;
    },
    mix(e, t) {
      if (!e || !e.rgb) throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof e);
      const n = e.rgb(), r = this.rgb(), a = void 0 === t ? .5 : t, i = 2 * a - 1, o = n.alpha() - r.alpha(), s = ((i * o == -1 ? i : (i + o) / (1 + i * o)) + 1) / 2, l = 1 - s;
      return ln.rgb(s * n.red() + l * r.red(), s * n.green() + l * r.green(), s * n.blue() + l * r.blue(), n.alpha() * a + r.alpha() * (1 - a));
    }
  };
  for (const e of Object.keys(Qt)) {
    if (an.includes(e)) continue;
    const {channels: t} = Qt[e];
    ln.prototype[e] = function(...t) {
      return this.model === e ? new ln(this) : t.length > 0 ? new ln(t, e) : new ln([ ...(n = Qt[this.model][e].raw(this.color), 
      Array.isArray(n) ? n : [ n ]), this.valpha ], e);
      var n;
    }, ln[e] = function(...n) {
      let r = n[0];
      return "number" == typeof r && (r = dn(n, t)), new ln(r, e);
    };
  }
  function un(e) {
    return function(t) {
      return function(e, t) {
        return Number(e.toFixed(t));
      }(t, e);
    };
  }
  function cn(e, t, n) {
    e = Array.isArray(e) ? e : [ e ];
    for (const r of e) (sn[r] || (sn[r] = []))[t] = n;
    return e = e[0], function(r) {
      let a;
      return void 0 !== r ? (n && (r = n(r)), a = this[e](), a.color[t] = r, a) : (a = this[e]().color[t], 
      n && (a = n(a)), a);
    };
  }
  function fn(e) {
    return function(t) {
      return Math.max(0, Math.min(e, t));
    };
  }
  function dn(e, t) {
    for (let n = 0; n < t; n++) "number" != typeof e[n] && (e[n] = 0);
    return e;
  }
  Pt = ln;
  const pn = {
    hintUppercaseLetters: !1,
    hintFontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    hintFontSize: 10,
    hintWeight: "auto",
    hintBackgroundColor: "",
    hintBackgroundOpacity: 1,
    hintFontColor: "",
    hintBorderWidth: 1,
    hintBorderRadius: 3,
    hintMinimumContrastRatio: 4,
    scrollBehavior: "auto",
    hintsToggleGlobal: !0,
    hintsToggleHosts: new Map,
    hintsTogglePaths: new Map,
    hintsToggleTabs: new Map,
    alwaysComputeHintables: !1,
    enableNotifications: !0,
    notifyWhenTogglingHints: !1,
    toastPosition: "top-center",
    toastTransition: "bounce",
    toastDuration: 5e3,
    includeSingleLetterHints: !0,
    useNumberHints: !1,
    hintsToExclude: "",
    viewportMargin: 1e3,
    urlInTitle: !0,
    includeTabMarkers: !0,
    hideTabMarkersWithGlobalHintsOff: !1,
    uppercaseTabMarkers: !0,
    keyboardClicking: !1,
    keysToExclude: new Array,
    customSelectors: new Array,
    customScrollPositions: new Map,
    references: new Map,
    showWhatsNewPageOnUpdate: !0,
    newTabPosition: "relatedAfterCurrent",
    hasSeenSettingsPage: !1,
    directClickWithNoFocusedDocument: !1,
    directClickWhenEditing: !0
  };
  function hn(e) {
    if (!e) return !0;
    try {
      new (n(Pt))(e);
    } catch {
      return !1;
    }
    return !0;
  }
  function mn(e, t, n) {
    return e >= t && e <= n;
  }
  const gn = {
    hintBackgroundColor: hn,
    hintFontColor: hn,
    hintFontSize: e => mn(e, 1, 72),
    hintBorderRadius: e => mn(e, 0, 72),
    hintBorderWidth: e => mn(e, 0, 72),
    hintBackgroundOpacity: e => "" !== e && mn(e, 0, 1),
    hintMinimumContrastRatio: e => mn(e, 2.5, 21),
    viewportMargin: e => mn(e, 0, 2e3)
  };
  function vn(e) {
    return e in pn;
  }
  function yn(e, t) {
    if (!vn(e)) return !1;
    const n = gn[e];
    return void 0 === n || n(t);
  }
  const bn = {
    ...pn,
    tabsByRecency: new Map,
    hintsStacks: new Map,
    tabMarkers: {
      free: [ "zz", "zy", "zx", "zw", "zv", "zu", "zt", "zs", "zr", "zq", "zp", "zo", "zn", "zm", "zl", "zk", "zj", "zi", "zh", "zg", "zf", "ze", "zd", "zc", "zb", "za", "yz", "yy", "yx", "yw", "yv", "yu", "yt", "ys", "yr", "yq", "yp", "yo", "yn", "ym", "yl", "yk", "yj", "yi", "yh", "yg", "yf", "ye", "yd", "yc", "yb", "ya", "xz", "xy", "xx", "xw", "xv", "xu", "xt", "xs", "xr", "xq", "xp", "xo", "xn", "xm", "xl", "xk", "xj", "xi", "xh", "xg", "xf", "xe", "xd", "xc", "xb", "xa", "wz", "wy", "wx", "ww", "wv", "wu", "wt", "ws", "wr", "wq", "wp", "wo", "wn", "wm", "wl", "wk", "wj", "wi", "wh", "wg", "wf", "we", "wd", "wc", "wb", "wa", "vz", "vy", "vx", "vw", "vv", "vu", "vt", "vs", "vr", "vq", "vp", "vo", "vn", "vm", "vl", "vk", "vj", "vi", "vh", "vg", "vf", "ve", "vd", "vc", "vb", "va", "uz", "uy", "ux", "uw", "uv", "uu", "ut", "us", "ur", "uq", "up", "uo", "un", "um", "ul", "uk", "uj", "ui", "uh", "ug", "uf", "ue", "ud", "uc", "ub", "ua", "tz", "ty", "tx", "tw", "tv", "tu", "tt", "ts", "tr", "tq", "tp", "to", "tn", "tm", "tl", "tk", "tj", "ti", "th", "tg", "tf", "te", "td", "tc", "tb", "ta", "sz", "sy", "sx", "sw", "sv", "su", "st", "ss", "sr", "sq", "sp", "so", "sn", "sm", "sl", "sk", "sj", "si", "sh", "sg", "sf", "se", "sd", "sc", "sb", "sa", "rz", "ry", "rx", "rw", "rv", "ru", "rt", "rs", "rr", "rq", "rp", "ro", "rn", "rm", "rl", "rk", "rj", "ri", "rh", "rg", "rf", "re", "rd", "rc", "rb", "ra", "qz", "qy", "qx", "qw", "qv", "qu", "qt", "qs", "qr", "qq", "qp", "qo", "qn", "qm", "ql", "qk", "qj", "qi", "qh", "qg", "qf", "qe", "qd", "qc", "qb", "qa", "pz", "py", "px", "pw", "pv", "pu", "pt", "ps", "pr", "pq", "pp", "po", "pn", "pm", "pl", "pk", "pj", "pi", "ph", "pg", "pf", "pe", "pd", "pc", "pb", "pa", "oz", "oy", "ox", "ow", "ov", "ou", "ot", "os", "or", "oq", "op", "oo", "on", "om", "ol", "ok", "oj", "oi", "oh", "og", "of", "oe", "od", "oc", "ob", "oa", "nz", "ny", "nx", "nw", "nv", "nu", "nt", "ns", "nr", "nq", "np", "no", "nn", "nm", "nl", "nk", "nj", "ni", "nh", "ng", "nf", "ne", "nd", "nc", "nb", "na", "mz", "my", "mx", "mw", "mv", "mu", "mt", "ms", "mr", "mq", "mp", "mo", "mn", "mm", "ml", "mk", "mj", "mi", "mh", "mg", "mf", "me", "md", "mc", "mb", "ma", "lz", "ly", "lx", "lw", "lv", "lu", "lt", "ls", "lr", "lq", "lp", "lo", "ln", "lm", "ll", "lk", "lj", "li", "lh", "lg", "lf", "le", "ld", "lc", "lb", "la", "kz", "ky", "kx", "kw", "kv", "ku", "kt", "ks", "kr", "kq", "kp", "ko", "kn", "km", "kl", "kk", "kj", "ki", "kh", "kg", "kf", "ke", "kd", "kc", "kb", "ka", "jz", "jy", "jx", "jw", "jv", "ju", "jt", "js", "jr", "jq", "jp", "jo", "jn", "jm", "jl", "jk", "jj", "ji", "jh", "jg", "jf", "je", "jd", "jc", "jb", "ja", "iz", "iy", "ix", "iw", "iv", "iu", "it", "is", "ir", "iq", "ip", "io", "in", "im", "il", "ik", "ij", "ii", "ih", "ig", "if", "ie", "id", "ic", "ib", "ia", "hz", "hy", "hx", "hw", "hv", "hu", "ht", "hs", "hr", "hq", "hp", "ho", "hn", "hm", "hl", "hk", "hj", "hi", "hh", "hg", "hf", "he", "hd", "hc", "hb", "ha", "gz", "gy", "gx", "gw", "gv", "gu", "gt", "gs", "gr", "gq", "gp", "go", "gn", "gm", "gl", "gk", "gj", "gi", "gh", "gg", "gf", "ge", "gd", "gc", "gb", "ga", "fz", "fy", "fx", "fw", "fv", "fu", "ft", "fs", "fr", "fq", "fp", "fo", "fn", "fm", "fl", "fk", "fj", "fi", "fh", "fg", "ff", "fe", "fd", "fc", "fb", "fa", "ez", "ey", "ex", "ew", "ev", "eu", "et", "es", "er", "eq", "ep", "eo", "en", "em", "el", "ek", "ej", "ei", "eh", "eg", "ef", "ee", "ed", "ec", "eb", "ea", "dz", "dy", "dx", "dw", "dv", "du", "dt", "ds", "dr", "dq", "dp", "do", "dn", "dm", "dl", "dk", "dj", "di", "dh", "dg", "df", "de", "dd", "dc", "db", "da", "cz", "cy", "cx", "cw", "cv", "cu", "ct", "cs", "cr", "cq", "cp", "co", "cn", "cm", "cl", "ck", "cj", "ci", "ch", "cg", "cf", "ce", "cd", "cc", "cb", "ca", "bz", "by", "bx", "bw", "bv", "bu", "bt", "bs", "br", "bq", "bp", "bo", "bn", "bm", "bl", "bk", "bj", "bi", "bh", "bg", "bf", "be", "bd", "bc", "bb", "ba", "az", "ay", "ax", "aw", "av", "au", "at", "as", "ar", "aq", "ap", "ao", "an", "am", "al", "ak", "aj", "ai", "ah", "ag", "af", "ae", "ad", "ac", "ab", "aa", "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a" ],
      tabIdsToMarkers: new Map,
      markersToTabIds: new Map
    }
  };
  var wn = function(e) {
    var t, n, r, a, i = [];
    for (r = 0, a = (t = e.split(",")).length; r < a; r += 1) (n = t[r]).length > 0 && i.push(xn(n));
    return i;
  }, xn = function(e) {
    var t, n, r = e, a = {
      a: 0,
      b: 0,
      c: 0
    }, i = [];
    return t = function(t, n) {
      var o, s, l, u, c, f;
      if (t.test(r)) for (s = 0, l = (o = r.match(t)).length; s < l; s += 1) a[n] += 1, 
      u = o[s], c = r.indexOf(u), f = u.length, i.push({
        selector: e.substr(c, f),
        type: n,
        index: c,
        length: f
      }), r = r.replace(u, Array(f + 1).join(" "));
    }, (n = function(e) {
      var t, n, a, i;
      if (e.test(r)) for (n = 0, a = (t = r.match(e)).length; n < a; n += 1) i = t[n], 
      r = r.replace(i, Array(i.length + 1).join("A"));
    })(/\\[0-9A-Fa-f]{6}\s?/g), n(/\\[0-9A-Fa-f]{1,5}\s/g), n(/\\./g), function() {
      var e, t, n, a, i = /{[^]*/gm;
      if (i.test(r)) for (t = 0, n = (e = r.match(i)).length; t < n; t += 1) a = e[t], 
      r = r.replace(a, Array(a.length + 1).join(" "));
    }(), t(/(\[[^\]]+\])/g, "b"), t(/(#[^\#\s\+>~\.\[:\)]+)/g, "a"), t(/(\.[^\s\+>~\.\[:\)]+)/g, "b"), 
    t(/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi, "c"), t(/(:(?!not|global|local)[\w-]+\([^\)]*\))/gi, "b"), 
    t(/(:(?!not|global|local)[^\s\+>~\.\[:]+)/g, "b"), r = (r = (r = (r = (r = (r = r.replace(/[\*\s\+>~]/g, " ")).replace(/[#\.]/g, " ")).replace(/:not/g, "    ")).replace(/:local/g, "      ")).replace(/:global/g, "       ")).replace(/[\(\)]/g, " "), 
    t(/([^\s\+>~\.\[:]+)/g, "c"), i.sort((function(e, t) {
      return e.index - t.index;
    })), {
      selector: e,
      specificity: "0," + a.a.toString() + "," + a.b.toString() + "," + a.c.toString(),
      specificityArray: [ 0, a.a, a.b, a.c ],
      parts: i
    };
  };
  function kn(e) {
    const {specificityArray: t} = wn(e)[0];
    return t.reduce(((e, t, n, r) => e + t * 10 ** (r.length - n - 1)));
  }
  function _n(e) {
    try {
      document.querySelector(e);
    } catch (e) {
      if (e instanceof DOMException) return !1;
    }
    return !0;
  }
  function En(e) {
    return wn(e)[0].parts.map((e => e.selector));
  }
  function Sn(e) {
    try {
      return new RegExp(e), !0;
    } catch {
      return !1;
    }
  }
  function An(e) {
    let t;
    const n = Ot.record(Ot.string(), Ot.object({
      include: Ot.array(Ot.string()),
      exclude: Ot.array(Ot.string())
    })).safeParse(e), r = Ot.map(Ot.string(), Ot.object({
      include: Ot.array(Ot.string()),
      exclude: Ot.array(Ot.string())
    })).safeParse(e);
    if (r.success && (t = r.data.entries()), n.success && (t = Object.entries(n.data)), 
    !t) return e;
    const a = new Array;
    for (const [e, {include: n, exclude: r}] of t) {
      for (const t of n) a.push({
        pattern: e,
        type: "include",
        selector: t
      });
      for (const t of r) a.push({
        pattern: e,
        type: "exclude",
        selector: t
      });
    }
    return a;
  }
  function Cn(e, t) {
    switch (e) {
     case "customSelectors":
      return t.filter((({pattern: e, selector: t}) => Sn(e) && _n(t))).sort(((e, t) => e.pattern.localeCompare(t.pattern) || ("include" === e.type ? -1 : 1)));

     case "keysToExclude":
      return t.filter((([e]) => e));

     default:
      return t;
    }
  }
  const Tn = new Set([ "hintsToggleTabs", "tabsByRecency", "hintsStacks", "tabMarkers" ]);
  function On(e, t) {
    return t instanceof Map ? {
      dataType: "Map",
      value: Array.from(t.entries())
    } : t;
  }
  function Nn(e, t) {
    return "object" == typeof t && null !== t && "Map" === t.dataType && t.value ? new Map(t.value) : t;
  }
  async function Mn(e, t) {
    if (vn(e) && !yn(e, t)) return Pn(e);
    const r = Cn(e, t), a = JSON.stringify(Lt.shape[e].parse(r), On);
    return await (Tn.has(e) ? n(o).storage.local.set({
      [e]: a
    }) : n(o).storage.sync.set({
      [e]: a
    })), r;
  }
  async function In(e) {
    const t = Tn.has(e) ? await n(o).storage.local.get(e) : await n(o).storage.sync.get(e);
    try {
      const [e] = Object.values(t);
      if (void 0 === e) return;
      return JSON.parse(e, Nn);
    } catch {
      return console.warn(`Invalid JSON in storage item "${e}". Resetting to default.`), 
      Mn(e, bn[e]);
    }
  }
  async function Ln(e) {
    const t = await In(e);
    if ("customSelectors" === e) try {
      const n = An(t), r = Lt.shape[e].parse(n);
      return await Mn(e, r);
    } catch {
      return Mn(e, bn[e]);
    }
    return Mn(e, bn[e]);
  }
  const jn = new w;
  async function Pn(e) {
    const t = await In(e), n = Lt.shape[e].safeParse(t);
    return n.success ? n.data : jn.runExclusive((async () => {
      const t = await In(e);
      try {
        return Lt.shape[e].parse(t);
      } catch {
        return Ln(e);
      }
    }));
  }
  async function Rn() {
    const e = {};
    let t;
    for (t in pn) Object.prototype.hasOwnProperty.call(pn, t) && (e[t] = await Pn(t));
    return e;
  }
  let zn, Dn;
  async function Fn() {
    zn = await Rn();
  }
  function Hn(e) {
    return zn[e];
  }
  function $n() {
    return zn;
  }
  function Bn() {
    const {hintsToggleGlobal: e, hintsToggleHosts: t, hintsTogglePaths: n, hintsToggleTabs: r} = $n(), a = r.get(d()), i = t.get(window.location.host), o = n.get(window.location.origin + window.location.pathname);
    return {
      computed: Dn ?? o ?? i ?? a ?? e,
      navigation: Dn,
      path: o,
      host: i,
      tab: a,
      global: e
    };
  }
  function Wn(e, t = !0, n = ":not(.rango-hint, #rango-copy-paste-area)") {
    const r = e.shadowRoot ? e.shadowRoot.querySelectorAll("*") : e.querySelectorAll("*"), a = t && e.matches(n) ? [ e ] : [];
    if ([ ...r ].some((e => e.shadowRoot))) {
      const t = e.shadowRoot ? [ ...e.shadowRoot.querySelectorAll("*") ] : [ ...e.querySelectorAll("*") ];
      for (const e of t) e.shadowRoot && "rango-hint" !== e.className ? a.push(...Wn(e)) : a.push(e);
      return a.filter((e => {
        let t;
        try {
          t = e.matches(n);
        } catch (e) {
          e instanceof DOMException && (t = !1);
        }
        return t;
      }));
    }
    const i = e.shadowRoot ? e.shadowRoot.querySelectorAll(n) : e.querySelectorAll(n);
    for (const e of i) a.push(e);
    return a;
  }
  const Un = new Map, Vn = new Map;
  function qn() {
    return [ ...Un.values() ];
  }
  function Zn() {
    return [ ...Vn.values() ];
  }
  function Kn(e) {
    Un.set(e.element, e);
  }
  function Yn(e) {
    let t;
    if (e instanceof Element && (t = Un.get(e)), "string" == typeof e && (t = Vn.get(e)), 
    Array.isArray(e)) {
      if (!Bn().computed) return [];
      t = [];
      for (const n of e) Vn.has(n) && t.push(Vn.get(n));
    }
    return t;
  }
  function Qn(e) {
    return Un.get(e);
  }
  function Gn(e) {
    const t = [];
    for (const n of Un.values()) e.contains(n.element) && t.push(n);
    return t;
  }
  function Xn(e, t) {
    const n = Yn(t);
    n && Vn.set(e, n);
  }
  function Jn(e) {
    Vn.delete(e);
  }
  function er(e) {
    const t = [];
    for (const [n, r] of Vn.entries()) if (!r.isIntersectingViewport && (r.unobserveIntersection(), 
    r.hint?.release(!1), t.push(n), e && t.length >= e)) return t;
    return t;
  }
  function tr(e) {
    const t = Wn(e);
    for (const e of t) {
      const t = Un.get(e);
      t?.hint?.string && Vn.delete(t.hint.string), t?.suspend(), Un.delete(e);
    }
  }
  function nr() {
    for (const e of Un.values()) e?.suspend();
    Un.clear(), Vn.clear();
  }
  function rr() {
    for (const e of Vn.values()) e?.hint?.hide();
  }
  function ar() {
    for (const e of Vn.values()) e?.hint?.show();
  }
  const ir = "input:not(:is([type='button'], [type='checkbox'], [type='color'], [type='file'], [type='hidden'], [type='image'], [type='radio'], [type='range'], [type='reset'], [type='submit'])), textarea, [contenteditable=''], [contenteditable='true']";
  function or(e) {
    return !!e && e.matches(ir);
  }
  function sr(e) {
    let t = e;
    for (;t && !(t instanceof HTMLElement); ) t = t.parentElement;
    return t;
  }
  function lr() {
    let e = document.activeElement;
    for (;e?.shadowRoot; ) e = e.shadowRoot.activeElement;
    return e;
  }
  const ur = ":is(a[href], area[href], input, select, textarea, button, iframe, object, summary, [tabindex]):not(:is([disabled], [tabindex='-1'], [contenteditable='false']))";
  function cr(e) {
    return e.matches(ur) ? e : e.querySelector(ur) ?? e.closest(ur);
  }
  let fr, dr = "";
  function pr(e) {
    const t = Zn().filter((t => t.hint?.string && t.hint.string.startsWith(e)));
    for (const e of t) e?.hint?.keyHighlight();
  }
  function hr() {
    const e = Zn();
    for (const t of e) t.hint?.clearKeyHighlight();
  }
  async function mr(e) {
    if (clearInterval(fr), 1 === dr.length && !/^[A-Za-z]$/.test(e.key)) return dr = "", 
    void await n(o).runtime.sendMessage({
      type: "restoreKeyboardReachableHints"
    });
    const t = new Set(l().map((e => e.slice(0, 1))));
    (1 === dr.length || !dr && t.has(e.key)) && !or(lr()) && /[a-z]/i.test(e.key) && !function(e) {
      return e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    }(e) ? (e.preventDefault(), e.stopImmediatePropagation(), dr += e.key, 2 === dr.length ? (await n(o).runtime.sendMessage({
      type: "restoreKeyboardReachableHints"
    }), l().includes(dr) && await n(o).runtime.sendMessage({
      type: "clickHintInFrame",
      hint: dr
    }), dr = "") : (await n(o).runtime.sendMessage({
      type: "markHintsAsKeyboardReachable",
      letter: e.key
    }), fr = setTimeout((async () => {
      await n(o).runtime.sendMessage({
        type: "restoreKeyboardReachableHints"
      }), dr = "";
    }), 3e3))) : dr = "";
  }
  function gr() {
    window.addEventListener("keydown", mr, !0);
  }
  function vr(e) {
    if (null == e) throw new Error("Fatal error: value must not be null/undefined.");
  }
  function yr(e) {
    return "fulfilled" === e.status;
  }
  function br(e) {
    return "value" in e;
  }
  function wr(e) {
    return "disabled" in e;
  }
  function xr(e) {
    return e instanceof HTMLElement;
  }
  function kr(e, t) {
    const n = Array.isArray(e) ? Object.values(e) : Object.keys(e), r = Object.keys(t);
    return n.some((e => r.includes(e)));
  }
  async function _r(e) {
    return new Promise((t => {
      setTimeout((() => {
        t(!0);
      }), e);
    }));
  }
  var Er;
  Er = i("69aeE");
  var Sr = i("bNwRF");
  function Ar(e) {
    var t, n, r = "";
    if ("string" == typeof e || "number" == typeof e) r += e; else if ("object" == typeof e) if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (n = Ar(e[t])) && (r && (r += " "), 
    r += n); else for (t in e) e[t] && (r && (r += " "), r += t);
    return r;
  }
  var Cr = function() {
    for (var e, t, n = 0, r = ""; n < arguments.length; ) (e = arguments[n++]) && (t = Ar(e)) && (r && (r += " "), 
    r += t);
    return r;
  };
  const Tr = e => "number" == typeof e && !isNaN(e), Or = e => "string" == typeof e, Nr = e => "function" == typeof e, Mr = e => Or(e) || Nr(e) ? e : null, Ir = e => (0, 
  Sr.isValidElement)(e) || Or(e) || Nr(e) || Tr(e);
  function Lr(e) {
    let {enter: t, exit: r, appendPosition: a = !1, collapse: i = !0, collapseDuration: o = 300} = e;
    return function(e) {
      let {children: s, position: l, preventExitTransition: u, done: c, nodeRef: f, isIn: d} = e;
      const p = a ? `${t}--${l}` : t, h = a ? `${r}--${l}` : r, m = (0, Sr.useRef)(0);
      return (0, Sr.useLayoutEffect)((() => {
        const e = f.current, t = p.split(" "), n = r => {
          r.target === f.current && (e.dispatchEvent(new Event("d")), e.removeEventListener("animationend", n), 
          e.removeEventListener("animationcancel", n), 0 === m.current && "animationcancel" !== r.type && e.classList.remove(...t));
        };
        e.classList.add(...t), e.addEventListener("animationend", n), e.addEventListener("animationcancel", n);
      }), []), (0, Sr.useEffect)((() => {
        const e = f.current, t = () => {
          e.removeEventListener("animationend", t), i ? function(e, t, n) {
            void 0 === n && (n = 300);
            const {scrollHeight: r, style: a} = e;
            requestAnimationFrame((() => {
              a.minHeight = "initial", a.height = r + "px", a.transition = `all ${n}ms`, requestAnimationFrame((() => {
                a.height = "0", a.padding = "0", a.margin = "0", setTimeout(t, n);
              }));
            }));
          }(e, c, o) : c();
        };
        d || (u ? t() : (m.current = 1, e.className += ` ${h}`, e.addEventListener("animationend", t)));
      }), [ d ]), n(Sr).createElement(n(Sr).Fragment, null, s);
    };
  }
  function jr(e, t) {
    return {
      content: e.content,
      containerId: e.props.containerId,
      id: e.props.toastId,
      theme: e.props.theme,
      type: e.props.type,
      data: e.props.data || {},
      isLoading: e.props.isLoading,
      icon: e.props.icon,
      status: t
    };
  }
  const Pr = {
    list: new Map,
    emitQueue: new Map,
    on(e, t) {
      return this.list.has(e) || this.list.set(e, []), this.list.get(e).push(t), this;
    },
    off(e, t) {
      if (t) {
        const n = this.list.get(e).filter((e => e !== t));
        return this.list.set(e, n), this;
      }
      return this.list.delete(e), this;
    },
    cancelEmit(e) {
      const t = this.emitQueue.get(e);
      return t && (t.forEach(clearTimeout), this.emitQueue.delete(e)), this;
    },
    emit(e) {
      this.list.has(e) && this.list.get(e).forEach((t => {
        const n = setTimeout((() => {
          t(...[].slice.call(arguments, 1));
        }), 0);
        this.emitQueue.has(e) || this.emitQueue.set(e, []), this.emitQueue.get(e).push(n);
      }));
    }
  }, Rr = e => {
    let {theme: t, type: r, ...a} = e;
    return n(Sr).createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill: "colored" === t ? "currentColor" : `var(--toastify-icon-color-${r})`,
      ...a
    });
  }, zr = {
    info: function(e) {
      return n(Sr).createElement(Rr, {
        ...e
      }, n(Sr).createElement("path", {
        d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"
      }));
    },
    warning: function(e) {
      return n(Sr).createElement(Rr, {
        ...e
      }, n(Sr).createElement("path", {
        d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"
      }));
    },
    success: function(e) {
      return n(Sr).createElement(Rr, {
        ...e
      }, n(Sr).createElement("path", {
        d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"
      }));
    },
    error: function(e) {
      return n(Sr).createElement(Rr, {
        ...e
      }, n(Sr).createElement("path", {
        d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
      }));
    },
    spinner: function() {
      return n(Sr).createElement("div", {
        className: "Toastify__spinner"
      });
    }
  };
  function Dr(e) {
    return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientX : e.clientX;
  }
  function Fr(e) {
    return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientY : e.clientY;
  }
  function Hr(e) {
    let {closeToast: t, theme: r, ariaLabel: a = "close"} = e;
    return n(Sr).createElement("button", {
      className: `Toastify__close-button Toastify__close-button--${r}`,
      type: "button",
      onClick: e => {
        e.stopPropagation(), t(e);
      },
      "aria-label": a
    }, n(Sr).createElement("svg", {
      "aria-hidden": "true",
      viewBox: "0 0 14 16"
    }, n(Sr).createElement("path", {
      fillRule: "evenodd",
      d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
    })));
  }
  function $r(e) {
    let {delay: t, isRunning: r, closeToast: a, type: i = "default", hide: o, className: s, style: l, controlledProgress: u, progress: c, rtl: f, isIn: d, theme: p} = e;
    const h = o || u && 0 === c, m = {
      ...l,
      animationDuration: `${t}ms`,
      animationPlayState: r ? "running" : "paused",
      opacity: h ? 0 : 1
    };
    u && (m.transform = `scaleX(${c})`);
    const g = Cr("Toastify__progress-bar", u ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${p}`, `Toastify__progress-bar--${i}`, {
      "Toastify__progress-bar--rtl": f
    }), v = Nr(s) ? s({
      rtl: f,
      type: i,
      defaultClassName: g
    }) : Cr(g, s);
    return n(Sr).createElement("div", {
      role: "progressbar",
      "aria-hidden": h ? "true" : "false",
      "aria-label": "notification timer",
      className: v,
      style: m,
      [u && c >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: u && c < 1 ? null : () => {
        d && a();
      }
    });
  }
  const Br = e => {
    const {isRunning: t, preventExitTransition: r, toastRef: a, eventHandlers: i} = function(e) {
      const [t, n] = (0, Sr.useState)(!1), [r, a] = (0, Sr.useState)(!1), i = (0, Sr.useRef)(null), o = (0, 
      Sr.useRef)({
        start: 0,
        x: 0,
        y: 0,
        delta: 0,
        removalDistance: 0,
        canCloseOnClick: !0,
        canDrag: !1,
        boundingRect: null,
        didMove: !1
      }).current, s = (0, Sr.useRef)(e), {autoClose: l, pauseOnHover: u, closeToast: c, onClick: f, closeOnClick: d} = e;
      function p(t) {
        if (e.draggable) {
          "touchstart" === t.nativeEvent.type && t.nativeEvent.preventDefault(), o.didMove = !1, 
          document.addEventListener("mousemove", v), document.addEventListener("mouseup", y), 
          document.addEventListener("touchmove", v), document.addEventListener("touchend", y);
          const n = i.current;
          o.canCloseOnClick = !0, o.canDrag = !0, o.boundingRect = n.getBoundingClientRect(), 
          n.style.transition = "", o.x = Dr(t.nativeEvent), o.y = Fr(t.nativeEvent), "x" === e.draggableDirection ? (o.start = o.x, 
          o.removalDistance = n.offsetWidth * (e.draggablePercent / 100)) : (o.start = o.y, 
          o.removalDistance = n.offsetHeight * (80 === e.draggablePercent ? 1.5 * e.draggablePercent : e.draggablePercent / 100));
        }
      }
      function h(t) {
        if (o.boundingRect) {
          const {top: n, bottom: r, left: a, right: i} = o.boundingRect;
          "touchend" !== t.nativeEvent.type && e.pauseOnHover && o.x >= a && o.x <= i && o.y >= n && o.y <= r ? g() : m();
        }
      }
      function m() {
        n(!0);
      }
      function g() {
        n(!1);
      }
      function v(n) {
        const r = i.current;
        o.canDrag && r && (o.didMove = !0, t && g(), o.x = Dr(n), o.y = Fr(n), o.delta = "x" === e.draggableDirection ? o.x - o.start : o.y - o.start, 
        o.start !== o.x && (o.canCloseOnClick = !1), r.style.transform = `translate${e.draggableDirection}(${o.delta}px)`, 
        r.style.opacity = "" + (1 - Math.abs(o.delta / o.removalDistance)));
      }
      function y() {
        document.removeEventListener("mousemove", v), document.removeEventListener("mouseup", y), 
        document.removeEventListener("touchmove", v), document.removeEventListener("touchend", y);
        const t = i.current;
        if (o.canDrag && o.didMove && t) {
          if (o.canDrag = !1, Math.abs(o.delta) > o.removalDistance) return a(!0), void e.closeToast();
          t.style.transition = "transform 0.2s, opacity 0.2s", t.style.transform = `translate${e.draggableDirection}(0)`, 
          t.style.opacity = "1";
        }
      }
      (0, Sr.useEffect)((() => {
        s.current = e;
      })), (0, Sr.useEffect)((() => (i.current && i.current.addEventListener("d", m, {
        once: !0
      }), Nr(e.onOpen) && e.onOpen((0, Sr.isValidElement)(e.children) && e.children.props), 
      () => {
        const e = s.current;
        Nr(e.onClose) && e.onClose((0, Sr.isValidElement)(e.children) && e.children.props);
      })), []), (0, Sr.useEffect)((() => (e.pauseOnFocusLoss && (document.hasFocus() || g(), 
      window.addEventListener("focus", m), window.addEventListener("blur", g)), () => {
        e.pauseOnFocusLoss && (window.removeEventListener("focus", m), window.removeEventListener("blur", g));
      })), [ e.pauseOnFocusLoss ]);
      const b = {
        onMouseDown: p,
        onTouchStart: p,
        onMouseUp: h,
        onTouchEnd: h
      };
      return l && u && (b.onMouseEnter = g, b.onMouseLeave = m), d && (b.onClick = e => {
        f && f(e), o.canCloseOnClick && c();
      }), {
        playToast: m,
        pauseToast: g,
        isRunning: t,
        preventExitTransition: r,
        toastRef: i,
        eventHandlers: b
      };
    }(e), {closeButton: o, children: s, autoClose: l, onClick: u, type: c, hideProgressBar: f, closeToast: d, transition: p, position: h, className: m, style: g, bodyClassName: v, bodyStyle: y, progressClassName: b, progressStyle: w, updateId: x, role: k, progress: _, rtl: E, toastId: S, deleteToast: A, isIn: C, isLoading: T, iconOut: O, closeOnClick: N, theme: M} = e, I = Cr("Toastify__toast", `Toastify__toast-theme--${M}`, `Toastify__toast--${c}`, {
      "Toastify__toast--rtl": E
    }, {
      "Toastify__toast--close-on-click": N
    }), L = Nr(m) ? m({
      rtl: E,
      position: h,
      type: c,
      defaultClassName: I
    }) : Cr(I, m), j = !!_ || !l, P = {
      closeToast: d,
      type: c,
      theme: M
    };
    let R = null;
    return !1 === o || (R = Nr(o) ? o(P) : (0, Sr.isValidElement)(o) ? (0, Sr.cloneElement)(o, P) : Hr(P)), 
    n(Sr).createElement(p, {
      isIn: C,
      done: A,
      position: h,
      preventExitTransition: r,
      nodeRef: a
    }, n(Sr).createElement("div", {
      id: S,
      onClick: u,
      className: L,
      ...i,
      style: g,
      ref: a
    }, n(Sr).createElement("div", {
      ...C && {
        role: k
      },
      className: Nr(v) ? v({
        type: c
      }) : Cr("Toastify__toast-body", v),
      style: y
    }, null != O && n(Sr).createElement("div", {
      className: Cr("Toastify__toast-icon", {
        "Toastify--animate-icon Toastify__zoom-enter": !T
      })
    }, O), n(Sr).createElement("div", null, s)), R, n(Sr).createElement($r, {
      ...x && !j ? {
        key: `pb-${x}`
      } : {},
      rtl: E,
      theme: M,
      delay: l,
      isRunning: t,
      isIn: C,
      closeToast: d,
      hide: f,
      type: c,
      style: w,
      className: b,
      controlledProgress: j,
      progress: _ || 0
    })));
  }, Wr = function(e, t) {
    return void 0 === t && (t = !1), {
      enter: `Toastify--animate Toastify__${e}-enter`,
      exit: `Toastify--animate Toastify__${e}-exit`,
      appendPosition: t
    };
  }, Ur = Lr(Wr("bounce", !0)), Vr = Lr(Wr("slide", !0)), qr = Lr(Wr("zoom")), Zr = Lr(Wr("flip")), Kr = (0, 
  Sr.forwardRef)(((e, t) => {
    const {getToastToRender: r, containerRef: a, isToastActive: i} = function(e) {
      const [, t] = (0, Sr.useReducer)((e => e + 1), 0), [n, r] = (0, Sr.useState)([]), a = (0, 
      Sr.useRef)(null), i = (0, Sr.useRef)(new Map).current, o = e => -1 !== n.indexOf(e), s = (0, 
      Sr.useRef)({
        toastKey: 1,
        displayedToast: 0,
        count: 0,
        queue: [],
        props: e,
        containerId: null,
        isToastActive: o,
        getToast: e => i.get(e)
      }).current;
      function l(e) {
        let {containerId: t} = e;
        const {limit: n} = s.props;
        !n || t && s.containerId !== t || (s.count -= s.queue.length, s.queue = []);
      }
      function u(e) {
        r((t => null == e ? [] : t.filter((t => t !== e))));
      }
      function c() {
        const {toastContent: e, toastProps: t, staleId: n} = s.queue.shift();
        d(e, t, n);
      }
      function f(e, n) {
        let {delay: r, staleId: o, ...l} = n;
        if (!Ir(e) || function(e) {
          return !a.current || s.props.enableMultiContainer && e.containerId !== s.props.containerId || i.has(e.toastId) && null == e.updateId;
        }(l)) return;
        const {toastId: f, updateId: p, data: h} = l, {props: m} = s, g = () => u(f), v = null == p;
        v && s.count++;
        const y = {
          ...m,
          style: m.toastStyle,
          key: s.toastKey++,
          ...Object.fromEntries(Object.entries(l).filter((e => {
            let [t, n] = e;
            return null != n;
          }))),
          toastId: f,
          updateId: p,
          data: h,
          closeToast: g,
          isIn: !1,
          className: Mr(l.className || m.toastClassName),
          bodyClassName: Mr(l.bodyClassName || m.bodyClassName),
          progressClassName: Mr(l.progressClassName || m.progressClassName),
          autoClose: !l.isLoading && (b = l.autoClose, w = m.autoClose, !1 === b || Tr(b) && b > 0 ? b : w),
          deleteToast() {
            const e = jr(i.get(f), "removed");
            i.delete(f), Pr.emit(4, e);
            const n = s.queue.length;
            if (s.count = null == f ? s.count - s.displayedToast : s.count - 1, s.count < 0 && (s.count = 0), 
            n > 0) {
              const e = null == f ? s.props.limit : 1;
              if (1 === n || 1 === e) s.displayedToast++, c(); else {
                const t = e > n ? n : e;
                s.displayedToast = t;
                for (let e = 0; e < t; e++) c();
              }
            } else t();
          }
        };
        var b, w;
        y.iconOut = function(e) {
          let {theme: t, type: n, isLoading: r, icon: a} = e, i = null;
          const o = {
            theme: t,
            type: n
          };
          return !1 === a || (Nr(a) ? i = a(o) : (0, Sr.isValidElement)(a) ? i = (0, Sr.cloneElement)(a, o) : Or(a) || Tr(a) ? i = a : r ? i = zr.spinner() : (e => e in zr)(n) && (i = zr[n](o))), 
          i;
        }(y), Nr(l.onOpen) && (y.onOpen = l.onOpen), Nr(l.onClose) && (y.onClose = l.onClose), 
        y.closeButton = m.closeButton, !1 === l.closeButton || Ir(l.closeButton) ? y.closeButton = l.closeButton : !0 === l.closeButton && (y.closeButton = !Ir(m.closeButton) || m.closeButton);
        let x = e;
        (0, Sr.isValidElement)(e) && !Or(e.type) ? x = (0, Sr.cloneElement)(e, {
          closeToast: g,
          toastProps: y,
          data: h
        }) : Nr(e) && (x = e({
          closeToast: g,
          toastProps: y,
          data: h
        })), m.limit && m.limit > 0 && s.count > m.limit && v ? s.queue.push({
          toastContent: x,
          toastProps: y,
          staleId: o
        }) : Tr(r) ? setTimeout((() => {
          d(x, y, o);
        }), r) : d(x, y, o);
      }
      function d(e, t, n) {
        const {toastId: a} = t;
        n && i.delete(n);
        const o = {
          content: e,
          props: t
        };
        i.set(a, o), r((e => [ ...e, a ].filter((e => e !== n)))), Pr.emit(4, jr(o, null == o.props.updateId ? "added" : "updated"));
      }
      return (0, Sr.useEffect)((() => (s.containerId = e.containerId, Pr.cancelEmit(3).on(0, f).on(1, (e => a.current && u(e))).on(5, l).emit(2, s), 
      () => {
        i.clear(), Pr.emit(3, s);
      })), []), (0, Sr.useEffect)((() => {
        s.props = e, s.isToastActive = o, s.displayedToast = n.length;
      })), {
        getToastToRender: function(t) {
          const n = new Map, r = Array.from(i.values());
          return e.newestOnTop && r.reverse(), r.forEach((e => {
            const {position: t} = e.props;
            n.has(t) || n.set(t, []), n.get(t).push(e);
          })), Array.from(n, (e => t(e[0], e[1])));
        },
        containerRef: a,
        isToastActive: o
      };
    }(e), {className: o, style: s, rtl: l, containerId: u} = e;
    function c(e) {
      const t = Cr("Toastify__toast-container", `Toastify__toast-container--${e}`, {
        "Toastify__toast-container--rtl": l
      });
      return Nr(o) ? o({
        position: e,
        rtl: l,
        defaultClassName: t
      }) : Cr(t, Mr(o));
    }
    return (0, Sr.useEffect)((() => {
      t && (t.current = a.current);
    }), []), n(Sr).createElement("div", {
      ref: a,
      className: "Toastify",
      id: u
    }, r(((e, t) => {
      const r = t.length ? {
        ...s
      } : {
        ...s,
        pointerEvents: "none"
      };
      return n(Sr).createElement("div", {
        className: c(e),
        style: r,
        key: `container-${e}`
      }, t.map(((e, r) => {
        let {content: a, props: o} = e;
        return n(Sr).createElement(Br, {
          ...o,
          isIn: i(o.toastId),
          style: {
            ...o.style,
            "--nth": r + 1,
            "--len": t.length
          },
          key: `toast-${o.key}`
        }, a);
      })));
    })));
  }));
  Kr.displayName = "ToastContainer", Kr.defaultProps = {
    position: "top-right",
    transition: Ur,
    autoClose: 5e3,
    closeButton: Hr,
    pauseOnHover: !0,
    pauseOnFocusLoss: !0,
    closeOnClick: !0,
    draggable: !0,
    draggablePercent: 80,
    draggableDirection: "x",
    role: "alert",
    theme: "light"
  };
  let Yr, Qr = new Map, Gr = [], Xr = 1;
  function Jr() {
    return "" + Xr++;
  }
  function ea(e) {
    return e && (Or(e.toastId) || Tr(e.toastId)) ? e.toastId : Jr();
  }
  function ta(e, t) {
    return Qr.size > 0 ? Pr.emit(0, e, t) : Gr.push({
      content: e,
      options: t
    }), t.toastId;
  }
  function na(e, t) {
    return {
      ...t,
      type: t && t.type || e,
      toastId: ea(t)
    };
  }
  function ra(e) {
    return (t, n) => ta(t, na(e, n));
  }
  function aa(e, t) {
    return ta(e, na("default", t));
  }
  var ia;
  aa.loading = (e, t) => ta(e, na("default", {
    isLoading: !0,
    autoClose: !1,
    closeOnClick: !1,
    closeButton: !1,
    draggable: !1,
    ...t
  })), aa.promise = function(e, t, n) {
    let r, {pending: a, error: i, success: o} = t;
    a && (r = Or(a) ? aa.loading(a, n) : aa.loading(a.render, {
      ...n,
      ...a
    }));
    const s = {
      isLoading: null,
      autoClose: null,
      closeOnClick: null,
      closeButton: null,
      draggable: null
    }, l = (e, t, a) => {
      if (null == t) return void aa.dismiss(r);
      const i = {
        type: e,
        ...s,
        ...n,
        data: a
      }, o = Or(t) ? {
        render: t
      } : t;
      return r ? aa.update(r, {
        ...i,
        ...o
      }) : aa(o.render, {
        ...i,
        ...o
      }), a;
    }, u = Nr(e) ? e() : e;
    return u.then((e => l("success", o, e))).catch((e => l("error", i, e))), u;
  }, aa.success = ra("success"), aa.info = ra("info"), aa.error = ra("error"), aa.warning = ra("warning"), 
  aa.warn = aa.warning, aa.dark = (e, t) => ta(e, na("default", {
    theme: "dark",
    ...t
  })), aa.dismiss = e => {
    Qr.size > 0 ? Pr.emit(1, e) : Gr = Gr.filter((t => null != e && t.options.toastId !== e));
  }, aa.clearWaitingQueue = function(e) {
    return void 0 === e && (e = {}), Pr.emit(5, e);
  }, aa.isActive = e => {
    let t = !1;
    return Qr.forEach((n => {
      n.isToastActive && n.isToastActive(e) && (t = !0);
    })), t;
  }, aa.update = function(e, t) {
    void 0 === t && (t = {}), setTimeout((() => {
      const n = function(e, t) {
        let {containerId: n} = t;
        const r = Qr.get(n || Yr);
        return r && r.getToast(e);
      }(e, t);
      if (n) {
        const {props: r, content: a} = n, i = {
          delay: 100,
          ...r,
          ...t,
          toastId: t.toastId || e,
          updateId: Jr()
        };
        i.toastId !== e && (i.staleId = e);
        const o = i.render || a;
        delete i.render, ta(o, i);
      }
    }), 0);
  }, aa.done = e => {
    aa.update(e, {
      progress: 1
    });
  }, aa.onChange = e => (Pr.on(4, e), () => {
    Pr.off(4, e);
  }), aa.POSITION = {
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
    TOP_CENTER: "top-center",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM_CENTER: "bottom-center"
  }, aa.TYPE = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
    DEFAULT: "default"
  }, Pr.on(2, (e => {
    Yr = e.containerId || e, Qr.set(Yr, e), Gr.forEach((e => {
      Pr.emit(0, e.content, e.options);
    })), Gr = [];
  })).on(3, (e => {
    Qr.delete(e.containerId || e), 0 === Qr.size && Pr.off(0).off(1).off(5);
  }));
  var oa;
  !function e() {
    if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
    } catch (e) {
      console.error(e);
    }
  }(), oa = i("dTM1Y"), ia = oa.createRoot, oa.hydrateRoot;
  const sa = {
    slide: Vr,
    flip: Zr,
    zoom: qr,
    bounce: Ur
  };
  function la() {
    return (0, Er.jsx)(Kr, {
      hideProgressBar: !0,
      closeOnClick: !0,
      draggable: !0,
      pauseOnHover: !0,
      pauseOnFocusLoss: !1,
      autoClose: 5e3,
      newestOnTop: !1,
      rtl: !1,
      theme: "light",
      position: Hn("toastPosition"),
      transition: sa[Hn("toastTransition")]
    });
  }
  function ua({children: e}) {
    return (0, Er.jsxs)("div", {
      className: "ToastMessage",
      children: [ (0, Er.jsx)("h2", {
        children: "Rango"
      }), e, (0, Er.jsxs)("footer", {
        children: [ (0, Er.jsx)("code", {
          children: "dismiss"
        }), " to close" ]
      }) ]
    });
  }
  var ca = {
    prefix: "fas",
    iconName: "toggle-off",
    icon: [ 576, 512, [], "f204", "M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128H192c-70.7 0-128-57.3-128-128s57.3-128 128-128H384zM576 256c0-106-86-192-192-192H192C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192zM192 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" ]
  }, fa = {
    prefix: "fas",
    iconName: "circle-exclamation",
    icon: [ 512, 512, [ "exclamation-circle" ], "f06a", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" ]
  }, da = {
    prefix: "fas",
    iconName: "toggle-on",
    icon: [ 576, 512, [], "f205", "M192 64C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192s-86-192-192-192H192zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" ]
  }, pa = {
    prefix: "fas",
    iconName: "circle-check",
    icon: [ 512, 512, [ 61533, "check-circle" ], "f058", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" ]
  }, ha = {
    prefix: "fas",
    iconName: "trash",
    icon: [ 448, 512, [], "f1f8", "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" ]
  }, ma = {
    prefix: "fas",
    iconName: "circle-info",
    icon: [ 512, 512, [ "info-circle" ], "f05a", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" ]
  }, ga = {
    prefix: "fas",
    iconName: "minus",
    icon: [ 448, 512, [ 8211, 8722, 10134, "subtract" ], "f068", "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" ]
  }, va = {
    prefix: "fas",
    iconName: "triangle-exclamation",
    icon: [ 512, 512, [ 9888, "exclamation-triangle", "warning" ], "f071", "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" ]
  };
  function ya(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter((function(t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      }))), n.push.apply(n, r);
    }
    return n;
  }
  function ba(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? ya(Object(n), !0).forEach((function(t) {
        ka(e, t, n[t]);
      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ya(Object(n)).forEach((function(t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      }));
    }
    return e;
  }
  function wa(e) {
    return wa = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e;
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, wa(e);
  }
  function xa(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
      Object.defineProperty(e, r.key, r);
    }
  }
  function ka(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function _a(e, t) {
    return function(e) {
      if (Array.isArray(e)) return e;
    }(e) || function(e, t) {
      var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null == n) return;
      var r, a, i = [], o = !0, s = !1;
      try {
        for (n = n.call(e); !(o = (r = n.next()).done) && (i.push(r.value), !t || i.length !== t); o = !0) ;
      } catch (e) {
        s = !0, a = e;
      } finally {
        try {
          o || null == n.return || n.return();
        } finally {
          if (s) throw a;
        }
      }
      return i;
    }(e, t) || Sa(e, t) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function Ea(e) {
    return function(e) {
      if (Array.isArray(e)) return Aa(e);
    }(e) || function(e) {
      if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
    }(e) || Sa(e) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function Sa(e, t) {
    if (e) {
      if ("string" == typeof e) return Aa(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Aa(e, t) : void 0;
    }
  }
  function Aa(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  var Ca = function() {}, Ta = {}, Oa = {}, Na = null, Ma = {
    mark: Ca,
    measure: Ca
  };
  try {
    "undefined" != typeof window && (Ta = window), "undefined" != typeof document && (Oa = document), 
    "undefined" != typeof MutationObserver && (Na = MutationObserver), "undefined" != typeof performance && (Ma = performance);
  } catch (e) {}
  var Ia, La, ja, Pa, Ra, za = (Ta.navigator || {}).userAgent, Da = void 0 === za ? "" : za, Fa = Ta, Ha = Oa, $a = Na, Ba = Ma, Wa = (Fa.document, 
  !!Ha.documentElement && !!Ha.head && "function" == typeof Ha.addEventListener && "function" == typeof Ha.createElement), Ua = ~Da.indexOf("MSIE") || ~Da.indexOf("Trident/"), Va = "___FONT_AWESOME___", qa = "svg-inline--fa", Za = "data-fa-i2svg", Ka = "data-fa-pseudo-element", Ya = "data-prefix", Qa = "data-icon", Ga = "fontawesome-i2svg", Xa = [ "HTML", "HEAD", "STYLE", "SCRIPT" ], Ja = function() {
    try {
      return !0;
    } catch (e) {
      return !1;
    }
  }(), ei = "classic", ti = "sharp", ni = [ ei, ti ];
  function ri(e) {
    return new Proxy(e, {
      get: function(e, t) {
        return t in e ? e[t] : e[ei];
      }
    });
  }
  var ai = ri((ka(Ia = {}, ei, {
    fa: "solid",
    fas: "solid",
    "fa-solid": "solid",
    far: "regular",
    "fa-regular": "regular",
    fal: "light",
    "fa-light": "light",
    fat: "thin",
    "fa-thin": "thin",
    fad: "duotone",
    "fa-duotone": "duotone",
    fab: "brands",
    "fa-brands": "brands",
    fak: "kit",
    "fa-kit": "kit"
  }), ka(Ia, ti, {
    fa: "solid",
    fass: "solid",
    "fa-solid": "solid",
    fasr: "regular",
    "fa-regular": "regular",
    fasl: "light",
    "fa-light": "light"
  }), Ia)), ii = ri((ka(La = {}, ei, {
    solid: "fas",
    regular: "far",
    light: "fal",
    thin: "fat",
    duotone: "fad",
    brands: "fab",
    kit: "fak"
  }), ka(La, ti, {
    solid: "fass",
    regular: "fasr",
    light: "fasl"
  }), La)), oi = ri((ka(ja = {}, ei, {
    fab: "fa-brands",
    fad: "fa-duotone",
    fak: "fa-kit",
    fal: "fa-light",
    far: "fa-regular",
    fas: "fa-solid",
    fat: "fa-thin"
  }), ka(ja, ti, {
    fass: "fa-solid",
    fasr: "fa-regular",
    fasl: "fa-light"
  }), ja)), si = ri((ka(Pa = {}, ei, {
    "fa-brands": "fab",
    "fa-duotone": "fad",
    "fa-kit": "fak",
    "fa-light": "fal",
    "fa-regular": "far",
    "fa-solid": "fas",
    "fa-thin": "fat"
  }), ka(Pa, ti, {
    "fa-solid": "fass",
    "fa-regular": "fasr",
    "fa-light": "fasl"
  }), Pa)), li = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/, ui = "fa-layers-text", ci = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i, fi = ri((ka(Ra = {}, ei, {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  }), ka(Ra, ti, {
    900: "fass",
    400: "fasr",
    300: "fasl"
  }), Ra)), di = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], pi = di.concat([ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]), hi = [ "class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask" ], mi = "duotone-group", gi = "swap-opacity", vi = "primary", yi = "secondary", bi = new Set;
  Object.keys(ii[ei]).map(bi.add.bind(bi)), Object.keys(ii[ti]).map(bi.add.bind(bi));
  var wi = [].concat(ni, Ea(bi), [ "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", mi, gi, vi, yi ]).concat(di.map((function(e) {
    return "".concat(e, "x");
  }))).concat(pi.map((function(e) {
    return "w-".concat(e);
  }))), xi = Fa.FontAwesomeConfig || {};
  if (Ha && "function" == typeof Ha.querySelector) {
    [ [ "data-family-prefix", "familyPrefix" ], [ "data-css-prefix", "cssPrefix" ], [ "data-family-default", "familyDefault" ], [ "data-style-default", "styleDefault" ], [ "data-replacement-class", "replacementClass" ], [ "data-auto-replace-svg", "autoReplaceSvg" ], [ "data-auto-add-css", "autoAddCss" ], [ "data-auto-a11y", "autoA11y" ], [ "data-search-pseudo-elements", "searchPseudoElements" ], [ "data-observe-mutations", "observeMutations" ], [ "data-mutate-approach", "mutateApproach" ], [ "data-keep-original-source", "keepOriginalSource" ], [ "data-measure-performance", "measurePerformance" ], [ "data-show-missing-icons", "showMissingIcons" ] ].forEach((function(e) {
      var t = _a(e, 2), n = t[0], r = t[1], a = function(e) {
        return "" === e || "false" !== e && ("true" === e || e);
      }(function(e) {
        var t = Ha.querySelector("script[" + e + "]");
        if (t) return t.getAttribute(e);
      }(n));
      null != a && (xi[r] = a);
    }));
  }
  var ki = {
    styleDefault: "solid",
    familyDefault: "classic",
    cssPrefix: "fa",
    replacementClass: qa,
    autoReplaceSvg: !0,
    autoAddCss: !0,
    autoA11y: !0,
    searchPseudoElements: !1,
    observeMutations: !0,
    mutateApproach: "async",
    keepOriginalSource: !0,
    measurePerformance: !1,
    showMissingIcons: !0
  };
  xi.familyPrefix && (xi.cssPrefix = xi.familyPrefix);
  var _i = ba(ba({}, ki), xi);
  _i.autoReplaceSvg || (_i.observeMutations = !1);
  var Ei = {};
  Object.keys(ki).forEach((function(e) {
    Object.defineProperty(Ei, e, {
      enumerable: !0,
      set: function(t) {
        _i[e] = t, Si.forEach((function(e) {
          return e(Ei);
        }));
      },
      get: function() {
        return _i[e];
      }
    });
  })), Object.defineProperty(Ei, "familyPrefix", {
    enumerable: !0,
    set: function(e) {
      _i.cssPrefix = e, Si.forEach((function(e) {
        return e(Ei);
      }));
    },
    get: function() {
      return _i.cssPrefix;
    }
  }), Fa.FontAwesomeConfig = Ei;
  var Si = [];
  var Ai = 16, Ci = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: !1,
    flipY: !1
  };
  function Ti() {
    for (var e = 12, t = ""; e-- > 0; ) t += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[62 * Math.random() | 0];
    return t;
  }
  function Oi(e) {
    for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
    return t;
  }
  function Ni(e) {
    return e.classList ? Oi(e.classList) : (e.getAttribute("class") || "").split(" ").filter((function(e) {
      return e;
    }));
  }
  function Mi(e) {
    return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function Ii(e) {
    return Object.keys(e || {}).reduce((function(t, n) {
      return t + "".concat(n, ": ").concat(e[n].trim(), ";");
    }), "");
  }
  function Li(e) {
    return e.size !== Ci.size || e.x !== Ci.x || e.y !== Ci.y || e.rotate !== Ci.rotate || e.flipX || e.flipY;
  }
  function ji() {
    var e = "fa", t = qa, n = Ei.cssPrefix, r = Ei.replacementClass, a = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    -webkit-transition-delay: 0s;\n            transition-delay: 0s;\n    -webkit-transition-duration: 0s;\n            transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
    if (n !== e || r !== t) {
      var i = new RegExp("\\.".concat(e, "\\-"), "g"), o = new RegExp("\\--".concat(e, "\\-"), "g"), s = new RegExp("\\.".concat(t), "g");
      a = a.replace(i, ".".concat(n, "-")).replace(o, "--".concat(n, "-")).replace(s, ".".concat(r));
    }
    return a;
  }
  var Pi = !1;
  function Ri() {
    Ei.autoAddCss && !Pi && (!function(e) {
      if (e && Wa) {
        var t = Ha.createElement("style");
        t.setAttribute("type", "text/css"), t.innerHTML = e;
        for (var n = Ha.head.childNodes, r = null, a = n.length - 1; a > -1; a--) {
          var i = n[a], o = (i.tagName || "").toUpperCase();
          [ "STYLE", "LINK" ].indexOf(o) > -1 && (r = i);
        }
        Ha.head.insertBefore(t, r);
      }
    }(ji()), Pi = !0);
  }
  var zi = {
    mixout: function() {
      return {
        dom: {
          css: ji,
          insertCss: Ri
        }
      };
    },
    hooks: function() {
      return {
        beforeDOMElementCreation: function() {
          Ri();
        },
        beforeI2svg: function() {
          Ri();
        }
      };
    }
  }, Di = Fa || {};
  Di[Va] || (Di[Va] = {}), Di[Va].styles || (Di[Va].styles = {}), Di[Va].hooks || (Di[Va].hooks = {}), 
  Di[Va].shims || (Di[Va].shims = []);
  var Fi = Di[Va], Hi = [], $i = !1;
  function Bi(e) {
    Wa && ($i ? setTimeout(e, 0) : Hi.push(e));
  }
  function Wi(e) {
    var t = e.tag, n = e.attributes, r = void 0 === n ? {} : n, a = e.children, i = void 0 === a ? [] : a;
    return "string" == typeof e ? Mi(e) : "<".concat(t, " ").concat(function(e) {
      return Object.keys(e || {}).reduce((function(t, n) {
        return t + "".concat(n, '="').concat(Mi(e[n]), '" ');
      }), "").trim();
    }(r), ">").concat(i.map(Wi).join(""), "</").concat(t, ">");
  }
  function Ui(e, t, n) {
    if (e && e[t] && e[t][n]) return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
  }
  Wa && (($i = (Ha.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(Ha.readyState)) || Ha.addEventListener("DOMContentLoaded", (function e() {
    Ha.removeEventListener("DOMContentLoaded", e), $i = 1, Hi.map((function(e) {
      return e();
    }));
  })));
  var Vi = function(e, t, n, r) {
    var a, i, o, s = Object.keys(e), l = s.length, u = void 0 !== r ? function(e, t) {
      return function(n, r, a, i) {
        return e.call(t, n, r, a, i);
      };
    }(t, r) : t;
    for (void 0 === n ? (a = 1, o = e[s[0]]) : (a = 0, o = n); a < l; a++) o = u(o, e[i = s[a]], i, e);
    return o;
  };
  function qi(e) {
    var t = function(e) {
      for (var t = [], n = 0, r = e.length; n < r; ) {
        var a = e.charCodeAt(n++);
        if (a >= 55296 && a <= 56319 && n < r) {
          var i = e.charCodeAt(n++);
          56320 == (64512 & i) ? t.push(((1023 & a) << 10) + (1023 & i) + 65536) : (t.push(a), 
          n--);
        } else t.push(a);
      }
      return t;
    }(e);
    return 1 === t.length ? t[0].toString(16) : null;
  }
  function Zi(e) {
    return Object.keys(e).reduce((function(t, n) {
      var r = e[n];
      return !!r.icon ? t[r.iconName] = r.icon : t[n] = r, t;
    }), {});
  }
  function Ki(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = n.skipHooks, a = void 0 !== r && r, i = Zi(t);
    "function" != typeof Fi.hooks.addPack || a ? Fi.styles[e] = ba(ba({}, Fi.styles[e] || {}), i) : Fi.hooks.addPack(e, Zi(t)), 
    "fas" === e && Ki("fa", t);
  }
  var Yi, Qi, Gi, Xi = Fi.styles, Ji = Fi.shims, eo = (ka(Yi = {}, ei, Object.values(oi[ei])), 
  ka(Yi, ti, Object.values(oi[ti])), Yi), to = null, no = {}, ro = {}, ao = {}, io = {}, oo = {}, so = (ka(Qi = {}, ei, Object.keys(ai[ei])), 
  ka(Qi, ti, Object.keys(ai[ti])), Qi);
  function lo(e, t) {
    var n, r = t.split("-"), a = r[0], i = r.slice(1).join("-");
    return a !== e || "" === i || (n = i, ~wi.indexOf(n)) ? null : i;
  }
  var uo, co = function() {
    var e = function(e) {
      return Vi(Xi, (function(t, n, r) {
        return t[r] = Vi(n, e, {}), t;
      }), {});
    };
    no = e((function(e, t, n) {
      (t[3] && (e[t[3]] = n), t[2]) && t[2].filter((function(e) {
        return "number" == typeof e;
      })).forEach((function(t) {
        e[t.toString(16)] = n;
      }));
      return e;
    })), ro = e((function(e, t, n) {
      (e[n] = n, t[2]) && t[2].filter((function(e) {
        return "string" == typeof e;
      })).forEach((function(t) {
        e[t] = n;
      }));
      return e;
    })), oo = e((function(e, t, n) {
      var r = t[2];
      return e[n] = n, r.forEach((function(t) {
        e[t] = n;
      })), e;
    }));
    var t = "far" in Xi || Ei.autoFetchSvg, n = Vi(Ji, (function(e, n) {
      var r = n[0], a = n[1], i = n[2];
      return "far" !== a || t || (a = "fas"), "string" == typeof r && (e.names[r] = {
        prefix: a,
        iconName: i
      }), "number" == typeof r && (e.unicodes[r.toString(16)] = {
        prefix: a,
        iconName: i
      }), e;
    }), {
      names: {},
      unicodes: {}
    });
    ao = n.names, io = n.unicodes, to = go(Ei.styleDefault, {
      family: Ei.familyDefault
    });
  };
  function fo(e, t) {
    return (no[e] || {})[t];
  }
  function po(e, t) {
    return (oo[e] || {})[t];
  }
  function ho(e) {
    return ao[e] || {
      prefix: null,
      iconName: null
    };
  }
  function mo() {
    return to;
  }
  uo = function(e) {
    to = go(e.styleDefault, {
      family: Ei.familyDefault
    });
  }, Si.push(uo), co();
  function go(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.family, r = void 0 === n ? ei : n, a = ai[r][e], i = ii[r][e] || ii[r][a], o = e in Fi.styles ? e : null;
    return i || o || null;
  }
  var vo = (ka(Gi = {}, ei, Object.keys(oi[ei])), ka(Gi, ti, Object.keys(oi[ti])), 
  Gi);
  function yo(e) {
    var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = n.skipLookups, a = void 0 !== r && r, i = (ka(t = {}, ei, "".concat(Ei.cssPrefix, "-").concat(ei)), 
    ka(t, ti, "".concat(Ei.cssPrefix, "-").concat(ti)), t), o = null, s = ei;
    (e.includes(i[ei]) || e.some((function(e) {
      return vo[ei].includes(e);
    }))) && (s = ei), (e.includes(i[ti]) || e.some((function(e) {
      return vo[ti].includes(e);
    }))) && (s = ti);
    var l = e.reduce((function(e, t) {
      var n = lo(Ei.cssPrefix, t);
      if (Xi[t] ? (t = eo[s].includes(t) ? si[s][t] : t, o = t, e.prefix = t) : so[s].indexOf(t) > -1 ? (o = t, 
      e.prefix = go(t, {
        family: s
      })) : n ? e.iconName = n : t !== Ei.replacementClass && t !== i[ei] && t !== i[ti] && e.rest.push(t), 
      !a && e.prefix && e.iconName) {
        var r = "fa" === o ? ho(e.iconName) : {}, l = po(e.prefix, e.iconName);
        r.prefix && (o = null), e.iconName = r.iconName || l || e.iconName, e.prefix = r.prefix || e.prefix, 
        "far" !== e.prefix || Xi.far || !Xi.fas || Ei.autoFetchSvg || (e.prefix = "fas");
      }
      return e;
    }), {
      prefix: null,
      iconName: null,
      rest: []
    });
    return (e.includes("fa-brands") || e.includes("fab")) && (l.prefix = "fab"), (e.includes("fa-duotone") || e.includes("fad")) && (l.prefix = "fad"), 
    l.prefix || s !== ti || !Xi.fass && !Ei.autoFetchSvg || (l.prefix = "fass", l.iconName = po(l.prefix, l.iconName) || l.iconName), 
    "fa" !== l.prefix && "fa" !== o || (l.prefix = mo() || "fas"), l;
  }
  var bo = function() {
    function e() {
      !function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, e), this.definitions = {};
    }
    var t, n, r;
    return t = e, n = [ {
      key: "add",
      value: function() {
        for (var e = this, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
        var a = n.reduce(this._pullDefinitions, {});
        Object.keys(a).forEach((function(t) {
          e.definitions[t] = ba(ba({}, e.definitions[t] || {}), a[t]), Ki(t, a[t]);
          var n = oi[ei][t];
          n && Ki(n, a[t]), co();
        }));
      }
    }, {
      key: "reset",
      value: function() {
        this.definitions = {};
      }
    }, {
      key: "_pullDefinitions",
      value: function(e, t) {
        var n = t.prefix && t.iconName && t.icon ? {
          0: t
        } : t;
        return Object.keys(n).map((function(t) {
          var r = n[t], a = r.prefix, i = r.iconName, o = r.icon, s = o[2];
          e[a] || (e[a] = {}), s.length > 0 && s.forEach((function(t) {
            "string" == typeof t && (e[a][t] = o);
          })), e[a][i] = o;
        })), e;
      }
    } ], n && xa(t.prototype, n), r && xa(t, r), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e;
  }(), wo = [], xo = {}, ko = {}, _o = Object.keys(ko);
  function Eo(e, t) {
    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) r[a - 2] = arguments[a];
    var i = xo[e] || [];
    return i.forEach((function(e) {
      t = e.apply(null, [ t ].concat(r));
    })), t;
  }
  function So(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
    var a = xo[e] || [];
    a.forEach((function(e) {
      e.apply(null, n);
    }));
  }
  function Ao() {
    var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
    return ko[e] ? ko[e].apply(null, t) : void 0;
  }
  function Co(e) {
    "fa" === e.prefix && (e.prefix = "fas");
    var t = e.iconName, n = e.prefix || mo();
    if (t) return t = po(n, t) || t, Ui(To.definitions, n, t) || Ui(Fi.styles, n, t);
  }
  var To = new bo, Oo = {
    i2svg: function() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return Wa ? (So("beforeI2svg", e), Ao("pseudoElements2svg", e), Ao("i2svg", e)) : Promise.reject("Operation requires a DOM of some kind.");
    },
    watch: function() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.autoReplaceSvgRoot;
      !1 === Ei.autoReplaceSvg && (Ei.autoReplaceSvg = !0), Ei.observeMutations = !0, 
      Bi((function() {
        Mo({
          autoReplaceSvgRoot: t
        }), So("watch", e);
      }));
    }
  }, No = {
    noAuto: function() {
      Ei.autoReplaceSvg = !1, Ei.observeMutations = !1, So("noAuto");
    },
    config: Ei,
    dom: Oo,
    parse: {
      icon: function(e) {
        if (null === e) return null;
        if ("object" === wa(e) && e.prefix && e.iconName) return {
          prefix: e.prefix,
          iconName: po(e.prefix, e.iconName) || e.iconName
        };
        if (Array.isArray(e) && 2 === e.length) {
          var t = 0 === e[1].indexOf("fa-") ? e[1].slice(3) : e[1], n = go(e[0]);
          return {
            prefix: n,
            iconName: po(n, t) || t
          };
        }
        if ("string" == typeof e && (e.indexOf("".concat(Ei.cssPrefix, "-")) > -1 || e.match(li))) {
          var r = yo(e.split(" "), {
            skipLookups: !0
          });
          return {
            prefix: r.prefix || mo(),
            iconName: po(r.prefix, r.iconName) || r.iconName
          };
        }
        if ("string" == typeof e) {
          var a = mo();
          return {
            prefix: a,
            iconName: po(a, e) || e
          };
        }
      }
    },
    library: To,
    findIconDefinition: Co,
    toHtml: Wi
  }, Mo = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.autoReplaceSvgRoot, n = void 0 === t ? Ha : t;
    (Object.keys(Fi.styles).length > 0 || Ei.autoFetchSvg) && Wa && Ei.autoReplaceSvg && No.dom.i2svg({
      node: n
    });
  };
  function Io(e, t) {
    return Object.defineProperty(e, "abstract", {
      get: t
    }), Object.defineProperty(e, "html", {
      get: function() {
        return e.abstract.map((function(e) {
          return Wi(e);
        }));
      }
    }), Object.defineProperty(e, "node", {
      get: function() {
        if (Wa) {
          var t = Ha.createElement("div");
          return t.innerHTML = e.html, t.children;
        }
      }
    }), e;
  }
  function Lo(e) {
    var t = e.icons, n = t.main, r = t.mask, a = e.prefix, i = e.iconName, o = e.transform, s = e.symbol, l = e.title, u = e.maskId, c = e.titleId, f = e.extra, d = e.watchable, p = void 0 !== d && d, h = r.found ? r : n, m = h.width, g = h.height, v = "fak" === a, y = [ Ei.replacementClass, i ? "".concat(Ei.cssPrefix, "-").concat(i) : "" ].filter((function(e) {
      return -1 === f.classes.indexOf(e);
    })).filter((function(e) {
      return "" !== e || !!e;
    })).concat(f.classes).join(" "), b = {
      children: [],
      attributes: ba(ba({}, f.attributes), {}, {
        "data-prefix": a,
        "data-icon": i,
        class: y,
        role: f.attributes.role || "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 ".concat(m, " ").concat(g)
      })
    }, w = v && !~f.classes.indexOf("fa-fw") ? {
      width: "".concat(m / g * 1, "em")
    } : {};
    p && (b.attributes[Za] = ""), l && (b.children.push({
      tag: "title",
      attributes: {
        id: b.attributes["aria-labelledby"] || "title-".concat(c || Ti())
      },
      children: [ l ]
    }), delete b.attributes.title);
    var x = ba(ba({}, b), {}, {
      prefix: a,
      iconName: i,
      main: n,
      mask: r,
      maskId: u,
      transform: o,
      symbol: s,
      styles: ba(ba({}, w), f.styles)
    }), k = r.found && n.found ? Ao("generateAbstractMask", x) || {
      children: [],
      attributes: {}
    } : Ao("generateAbstractIcon", x) || {
      children: [],
      attributes: {}
    }, _ = k.children, E = k.attributes;
    return x.children = _, x.attributes = E, s ? function(e) {
      var t = e.prefix, n = e.iconName, r = e.children, a = e.attributes, i = e.symbol, o = !0 === i ? "".concat(t, "-").concat(Ei.cssPrefix, "-").concat(n) : i;
      return [ {
        tag: "svg",
        attributes: {
          style: "display: none;"
        },
        children: [ {
          tag: "symbol",
          attributes: ba(ba({}, a), {}, {
            id: o
          }),
          children: r
        } ]
      } ];
    }(x) : function(e) {
      var t = e.children, n = e.main, r = e.mask, a = e.attributes, i = e.styles, o = e.transform;
      if (Li(o) && n.found && !r.found) {
        var s = {
          x: n.width / n.height / 2,
          y: .5
        };
        a.style = Ii(ba(ba({}, i), {}, {
          "transform-origin": "".concat(s.x + o.x / 16, "em ").concat(s.y + o.y / 16, "em")
        }));
      }
      return [ {
        tag: "svg",
        attributes: a,
        children: t
      } ];
    }(x);
  }
  function jo(e) {
    var t = e.content, n = e.width, r = e.height, a = e.transform, i = e.title, o = e.extra, s = e.watchable, l = void 0 !== s && s, u = ba(ba(ba({}, o.attributes), i ? {
      title: i
    } : {}), {}, {
      class: o.classes.join(" ")
    });
    l && (u[Za] = "");
    var c = ba({}, o.styles);
    Li(a) && (c.transform = function(e) {
      var t = e.transform, n = e.width, r = void 0 === n ? 16 : n, a = e.height, i = void 0 === a ? 16 : a, o = e.startCentered, s = void 0 !== o && o, l = "";
      return l += s && Ua ? "translate(".concat(t.x / Ai - r / 2, "em, ").concat(t.y / Ai - i / 2, "em) ") : s ? "translate(calc(-50% + ".concat(t.x / Ai, "em), calc(-50% + ").concat(t.y / Ai, "em)) ") : "translate(".concat(t.x / Ai, "em, ").concat(t.y / Ai, "em) "), 
      l += "scale(".concat(t.size / Ai * (t.flipX ? -1 : 1), ", ").concat(t.size / Ai * (t.flipY ? -1 : 1), ") "), 
      l + "rotate(".concat(t.rotate, "deg) ");
    }({
      transform: a,
      startCentered: !0,
      width: n,
      height: r
    }), c["-webkit-transform"] = c.transform);
    var f = Ii(c);
    f.length > 0 && (u.style = f);
    var d = [];
    return d.push({
      tag: "span",
      attributes: u,
      children: [ t ]
    }), i && d.push({
      tag: "span",
      attributes: {
        class: "sr-only"
      },
      children: [ i ]
    }), d;
  }
  function Po(e) {
    var t = e.content, n = e.title, r = e.extra, a = ba(ba(ba({}, r.attributes), n ? {
      title: n
    } : {}), {}, {
      class: r.classes.join(" ")
    }), i = Ii(r.styles);
    i.length > 0 && (a.style = i);
    var o = [];
    return o.push({
      tag: "span",
      attributes: a,
      children: [ t ]
    }), n && o.push({
      tag: "span",
      attributes: {
        class: "sr-only"
      },
      children: [ n ]
    }), o;
  }
  var Ro = Fi.styles;
  function zo(e) {
    var t = e[0], n = e[1], r = _a(e.slice(4), 1)[0];
    return {
      found: !0,
      width: t,
      height: n,
      icon: Array.isArray(r) ? {
        tag: "g",
        attributes: {
          class: "".concat(Ei.cssPrefix, "-").concat(mi)
        },
        children: [ {
          tag: "path",
          attributes: {
            class: "".concat(Ei.cssPrefix, "-").concat(yi),
            fill: "currentColor",
            d: r[0]
          }
        }, {
          tag: "path",
          attributes: {
            class: "".concat(Ei.cssPrefix, "-").concat(vi),
            fill: "currentColor",
            d: r[1]
          }
        } ]
      } : {
        tag: "path",
        attributes: {
          fill: "currentColor",
          d: r
        }
      }
    };
  }
  var Do = {
    found: !1,
    width: 512,
    height: 512
  };
  function Fo(e, t) {
    var n = t;
    return "fa" === t && null !== Ei.styleDefault && (t = mo()), new Promise((function(r, a) {
      Ao("missingIconAbstract");
      if ("fa" === n) {
        var i = ho(e) || {};
        e = i.iconName || e, t = i.prefix || t;
      }
      if (e && t && Ro[t] && Ro[t][e]) return r(zo(Ro[t][e]));
      !function(e, t) {
        Ja || Ei.showMissingIcons || !e || console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
      }(e, t), r(ba(ba({}, Do), {}, {
        icon: Ei.showMissingIcons && e && Ao("missingIconAbstract") || {}
      }));
    }));
  }
  var Ho = function() {}, $o = Ei.measurePerformance && Ba && Ba.mark && Ba.measure ? Ba : {
    mark: Ho,
    measure: Ho
  }, Bo = 'FA "6.4.0"', Wo = function(e) {
    $o.mark("".concat(Bo, " ").concat(e, " ends")), $o.measure("".concat(Bo, " ").concat(e), "".concat(Bo, " ").concat(e, " begins"), "".concat(Bo, " ").concat(e, " ends"));
  }, Uo = function(e) {
    return $o.mark("".concat(Bo, " ").concat(e, " begins")), function() {
      return Wo(e);
    };
  }, Vo = function() {};
  function qo(e) {
    return "string" == typeof (e.getAttribute ? e.getAttribute(Za) : null);
  }
  function Zo(e) {
    return Ha.createElementNS("http://www.w3.org/2000/svg", e);
  }
  function Ko(e) {
    return Ha.createElement(e);
  }
  function Yo(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.ceFn, r = void 0 === n ? "svg" === e.tag ? Zo : Ko : n;
    if ("string" == typeof e) return Ha.createTextNode(e);
    var a = r(e.tag);
    Object.keys(e.attributes || []).forEach((function(t) {
      a.setAttribute(t, e.attributes[t]);
    }));
    var i = e.children || [];
    return i.forEach((function(e) {
      a.appendChild(Yo(e, {
        ceFn: r
      }));
    })), a;
  }
  var Qo = {
    replace: function(e) {
      var t = e[0];
      if (t.parentNode) if (e[1].forEach((function(e) {
        t.parentNode.insertBefore(Yo(e), t);
      })), null === t.getAttribute(Za) && Ei.keepOriginalSource) {
        var n = Ha.createComment(function(e) {
          var t = " ".concat(e.outerHTML, " ");
          return "".concat(t, "Font Awesome fontawesome.com ");
        }(t));
        t.parentNode.replaceChild(n, t);
      } else t.remove();
    },
    nest: function(e) {
      var t = e[0], n = e[1];
      if (~Ni(t).indexOf(Ei.replacementClass)) return Qo.replace(e);
      var r = new RegExp("".concat(Ei.cssPrefix, "-.*"));
      if (delete n[0].attributes.id, n[0].attributes.class) {
        var a = n[0].attributes.class.split(" ").reduce((function(e, t) {
          return t === Ei.replacementClass || t.match(r) ? e.toSvg.push(t) : e.toNode.push(t), 
          e;
        }), {
          toNode: [],
          toSvg: []
        });
        n[0].attributes.class = a.toSvg.join(" "), 0 === a.toNode.length ? t.removeAttribute("class") : t.setAttribute("class", a.toNode.join(" "));
      }
      var i = n.map((function(e) {
        return Wi(e);
      })).join("\n");
      t.setAttribute(Za, ""), t.innerHTML = i;
    }
  };
  function Go(e) {
    e();
  }
  function Xo(e, t) {
    var n = "function" == typeof t ? t : Vo;
    if (0 === e.length) n(); else {
      var r = Go;
      "async" === Ei.mutateApproach && (r = Fa.requestAnimationFrame || Go), r((function() {
        var t = !0 === Ei.autoReplaceSvg ? Qo.replace : Qo[Ei.autoReplaceSvg] || Qo.replace, r = Uo("mutate");
        e.map(t), r(), n();
      }));
    }
  }
  var Jo = !1;
  function es() {
    Jo = !0;
  }
  function ts() {
    Jo = !1;
  }
  var ns = null;
  function rs(e) {
    if ($a && Ei.observeMutations) {
      var t = e.treeCallback, n = void 0 === t ? Vo : t, r = e.nodeCallback, a = void 0 === r ? Vo : r, i = e.pseudoElementsCallback, o = void 0 === i ? Vo : i, s = e.observeMutationsRoot, l = void 0 === s ? Ha : s;
      ns = new $a((function(e) {
        if (!Jo) {
          var t = mo();
          Oi(e).forEach((function(e) {
            if ("childList" === e.type && e.addedNodes.length > 0 && !qo(e.addedNodes[0]) && (Ei.searchPseudoElements && o(e.target), 
            n(e.target)), "attributes" === e.type && e.target.parentNode && Ei.searchPseudoElements && o(e.target.parentNode), 
            "attributes" === e.type && qo(e.target) && ~hi.indexOf(e.attributeName)) if ("class" === e.attributeName && function(e) {
              var t = e.getAttribute ? e.getAttribute(Ya) : null, n = e.getAttribute ? e.getAttribute(Qa) : null;
              return t && n;
            }(e.target)) {
              var r = yo(Ni(e.target)), i = r.prefix, s = r.iconName;
              e.target.setAttribute(Ya, i || t), s && e.target.setAttribute(Qa, s);
            } else (l = e.target) && l.classList && l.classList.contains && l.classList.contains(Ei.replacementClass) && a(e.target);
            var l;
          }));
        }
      })), Wa && ns.observe(l, {
        childList: !0,
        attributes: !0,
        characterData: !0,
        subtree: !0
      });
    }
  }
  function as(e) {
    var t = e.getAttribute("style"), n = [];
    return t && (n = t.split(";").reduce((function(e, t) {
      var n = t.split(":"), r = n[0], a = n.slice(1);
      return r && a.length > 0 && (e[r] = a.join(":").trim()), e;
    }), {})), n;
  }
  function is(e) {
    var t, n, r = e.getAttribute("data-prefix"), a = e.getAttribute("data-icon"), i = void 0 !== e.innerText ? e.innerText.trim() : "", o = yo(Ni(e));
    return o.prefix || (o.prefix = mo()), r && a && (o.prefix = r, o.iconName = a), 
    o.iconName && o.prefix || (o.prefix && i.length > 0 && (o.iconName = (t = o.prefix, 
    n = e.innerText, (ro[t] || {})[n] || fo(o.prefix, qi(e.innerText)))), !o.iconName && Ei.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (o.iconName = e.firstChild.data)), 
    o;
  }
  function os(e) {
    var t = Oi(e.attributes).reduce((function(e, t) {
      return "class" !== e.name && "style" !== e.name && (e[t.name] = t.value), e;
    }), {}), n = e.getAttribute("title"), r = e.getAttribute("data-fa-title-id");
    return Ei.autoA11y && (n ? t["aria-labelledby"] = "".concat(Ei.replacementClass, "-title-").concat(r || Ti()) : (t["aria-hidden"] = "true", 
    t.focusable = "false")), t;
  }
  function ss(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
      styleParser: !0
    }, n = is(e), r = n.iconName, a = n.prefix, i = n.rest, o = os(e), s = Eo("parseNodeAttributes", {}, e), l = t.styleParser ? as(e) : [];
    return ba({
      iconName: r,
      title: e.getAttribute("title"),
      titleId: e.getAttribute("data-fa-title-id"),
      prefix: a,
      transform: Ci,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      symbol: !1,
      extra: {
        classes: i,
        styles: l,
        attributes: o
      }
    }, s);
  }
  var ls = Fi.styles;
  function us(e) {
    var t = "nest" === Ei.autoReplaceSvg ? ss(e, {
      styleParser: !1
    }) : ss(e);
    return ~t.extra.classes.indexOf(ui) ? Ao("generateLayersText", e, t) : Ao("generateSvgReplacementMutation", e, t);
  }
  var cs = new Set;
  function fs(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    if (!Wa) return Promise.resolve();
    var n = Ha.documentElement.classList, r = function(e) {
      return n.add("".concat(Ga, "-").concat(e));
    }, a = function(e) {
      return n.remove("".concat(Ga, "-").concat(e));
    }, i = Ei.autoFetchSvg ? cs : ni.map((function(e) {
      return "fa-".concat(e);
    })).concat(Object.keys(ls));
    i.includes("fa") || i.push("fa");
    var o = [ ".".concat(ui, ":not([").concat(Za, "])") ].concat(i.map((function(e) {
      return ".".concat(e, ":not([").concat(Za, "])");
    }))).join(", ");
    if (0 === o.length) return Promise.resolve();
    var s = [];
    try {
      s = Oi(e.querySelectorAll(o));
    } catch (e) {}
    if (!(s.length > 0)) return Promise.resolve();
    r("pending"), a("complete");
    var l = Uo("onTree"), u = s.reduce((function(e, t) {
      try {
        var n = us(t);
        n && e.push(n);
      } catch (e) {
        Ja || "MissingIcon" === e.name && console.error(e);
      }
      return e;
    }), []);
    return new Promise((function(e, n) {
      Promise.all(u).then((function(n) {
        Xo(n, (function() {
          r("active"), r("complete"), a("pending"), "function" == typeof t && t(), l(), e();
        }));
      })).catch((function(e) {
        l(), n(e);
      }));
    }));
  }
  function ds(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    us(e).then((function(e) {
      e && Xo([ e ], t);
    }));
  }
  ni.map((function(e) {
    cs.add("fa-".concat(e));
  })), Object.keys(ai[ei]).map(cs.add.bind(cs)), Object.keys(ai[ti]).map(cs.add.bind(cs)), 
  cs = Ea(cs);
  var ps = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.transform, r = void 0 === n ? Ci : n, a = t.symbol, i = void 0 !== a && a, o = t.mask, s = void 0 === o ? null : o, l = t.maskId, u = void 0 === l ? null : l, c = t.title, f = void 0 === c ? null : c, d = t.titleId, p = void 0 === d ? null : d, h = t.classes, m = void 0 === h ? [] : h, g = t.attributes, v = void 0 === g ? {} : g, y = t.styles, b = void 0 === y ? {} : y;
    if (e) {
      var w = e.prefix, x = e.iconName, k = e.icon;
      return Io(ba({
        type: "icon"
      }, e), (function() {
        return So("beforeDOMElementCreation", {
          iconDefinition: e,
          params: t
        }), Ei.autoA11y && (f ? v["aria-labelledby"] = "".concat(Ei.replacementClass, "-title-").concat(p || Ti()) : (v["aria-hidden"] = "true", 
        v.focusable = "false")), Lo({
          icons: {
            main: zo(k),
            mask: s ? zo(s.icon) : {
              found: !1,
              width: null,
              height: null,
              icon: {}
            }
          },
          prefix: w,
          iconName: x,
          transform: ba(ba({}, Ci), r),
          symbol: i,
          title: f,
          maskId: u,
          titleId: p,
          extra: {
            attributes: v,
            styles: b,
            classes: m
          }
        });
      }));
    }
  }, hs = {
    mixout: function() {
      return {
        icon: (e = ps, function(t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = (t || {}).icon ? t : Co(t || {}), a = n.mask;
          return a && (a = (a || {}).icon ? a : Co(a || {})), e(r, ba(ba({}, n), {}, {
            mask: a
          }));
        })
      };
      var e;
    },
    hooks: function() {
      return {
        mutationObserverCallbacks: function(e) {
          return e.treeCallback = fs, e.nodeCallback = ds, e;
        }
      };
    },
    provides: function(e) {
      e.i2svg = function(e) {
        var t = e.node, n = void 0 === t ? Ha : t, r = e.callback;
        return fs(n, void 0 === r ? function() {} : r);
      }, e.generateSvgReplacementMutation = function(e, t) {
        var n = t.iconName, r = t.title, a = t.titleId, i = t.prefix, o = t.transform, s = t.symbol, l = t.mask, u = t.maskId, c = t.extra;
        return new Promise((function(t, f) {
          Promise.all([ Fo(n, i), l.iconName ? Fo(l.iconName, l.prefix) : Promise.resolve({
            found: !1,
            width: 512,
            height: 512,
            icon: {}
          }) ]).then((function(l) {
            var f = _a(l, 2), d = f[0], p = f[1];
            t([ e, Lo({
              icons: {
                main: d,
                mask: p
              },
              prefix: i,
              iconName: n,
              transform: o,
              symbol: s,
              maskId: u,
              title: r,
              titleId: a,
              extra: c,
              watchable: !0
            }) ]);
          })).catch(f);
        }));
      }, e.generateAbstractIcon = function(e) {
        var t, n = e.children, r = e.attributes, a = e.main, i = e.transform, o = Ii(e.styles);
        return o.length > 0 && (r.style = o), Li(i) && (t = Ao("generateAbstractTransformGrouping", {
          main: a,
          transform: i,
          containerWidth: a.width,
          iconWidth: a.width
        })), n.push(t || a.icon), {
          children: n,
          attributes: r
        };
      };
    }
  }, ms = {
    mixout: function() {
      return {
        layer: function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.classes, r = void 0 === n ? [] : n;
          return Io({
            type: "layer"
          }, (function() {
            So("beforeDOMElementCreation", {
              assembler: e,
              params: t
            });
            var n = [];
            return e((function(e) {
              Array.isArray(e) ? e.map((function(e) {
                n = n.concat(e.abstract);
              })) : n = n.concat(e.abstract);
            })), [ {
              tag: "span",
              attributes: {
                class: [ "".concat(Ei.cssPrefix, "-layers") ].concat(Ea(r)).join(" ")
              },
              children: n
            } ];
          }));
        }
      };
    }
  }, gs = {
    mixout: function() {
      return {
        counter: function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.title, r = void 0 === n ? null : n, a = t.classes, i = void 0 === a ? [] : a, o = t.attributes, s = void 0 === o ? {} : o, l = t.styles, u = void 0 === l ? {} : l;
          return Io({
            type: "counter",
            content: e
          }, (function() {
            return So("beforeDOMElementCreation", {
              content: e,
              params: t
            }), Po({
              content: e.toString(),
              title: r,
              extra: {
                attributes: s,
                styles: u,
                classes: [ "".concat(Ei.cssPrefix, "-layers-counter") ].concat(Ea(i))
              }
            });
          }));
        }
      };
    }
  }, vs = {
    mixout: function() {
      return {
        text: function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.transform, r = void 0 === n ? Ci : n, a = t.title, i = void 0 === a ? null : a, o = t.classes, s = void 0 === o ? [] : o, l = t.attributes, u = void 0 === l ? {} : l, c = t.styles, f = void 0 === c ? {} : c;
          return Io({
            type: "text",
            content: e
          }, (function() {
            return So("beforeDOMElementCreation", {
              content: e,
              params: t
            }), jo({
              content: e,
              transform: ba(ba({}, Ci), r),
              title: i,
              extra: {
                attributes: u,
                styles: f,
                classes: [ "".concat(Ei.cssPrefix, "-layers-text") ].concat(Ea(s))
              }
            });
          }));
        }
      };
    },
    provides: function(e) {
      e.generateLayersText = function(e, t) {
        var n = t.title, r = t.transform, a = t.extra, i = null, o = null;
        if (Ua) {
          var s = parseInt(getComputedStyle(e).fontSize, 10), l = e.getBoundingClientRect();
          i = l.width / s, o = l.height / s;
        }
        return Ei.autoA11y && !n && (a.attributes["aria-hidden"] = "true"), Promise.resolve([ e, jo({
          content: e.innerHTML,
          width: i,
          height: o,
          transform: r,
          title: n,
          extra: a,
          watchable: !0
        }) ]);
      };
    }
  }, ys = new RegExp('"', "ug"), bs = [ 1105920, 1112319 ];
  function ws(e, t) {
    var n = "".concat("data-fa-pseudo-element-pending").concat(t.replace(":", "-"));
    return new Promise((function(r, a) {
      if (null !== e.getAttribute(n)) return r();
      var i, o, s, l = Oi(e.children).filter((function(e) {
        return e.getAttribute(Ka) === t;
      }))[0], u = Fa.getComputedStyle(e, t), c = u.getPropertyValue("font-family").match(ci), f = u.getPropertyValue("font-weight"), d = u.getPropertyValue("content");
      if (l && !c) return e.removeChild(l), r();
      if (c && "none" !== d && "" !== d) {
        var p = u.getPropertyValue("content"), h = ~[ "Sharp" ].indexOf(c[2]) ? ti : ei, m = ~[ "Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit" ].indexOf(c[2]) ? ii[h][c[2].toLowerCase()] : fi[h][f], g = function(e) {
          var t, n, r, a, i, o = e.replace(ys, ""), s = (n = 0, a = (t = o).length, (i = t.charCodeAt(n)) >= 55296 && i <= 56319 && a > n + 1 && (r = t.charCodeAt(n + 1)) >= 56320 && r <= 57343 ? 1024 * (i - 55296) + r - 56320 + 65536 : i), l = s >= bs[0] && s <= bs[1], u = 2 === o.length && o[0] === o[1];
          return {
            value: qi(u ? o[0] : o),
            isSecondary: l || u
          };
        }(p), v = g.value, y = g.isSecondary, b = c[0].startsWith("FontAwesome"), w = fo(m, v), x = w;
        if (b) {
          var k = (o = io[i = v], s = fo("fas", i), o || (s ? {
            prefix: "fas",
            iconName: s
          } : null) || {
            prefix: null,
            iconName: null
          });
          k.iconName && k.prefix && (w = k.iconName, m = k.prefix);
        }
        if (!w || y || l && l.getAttribute(Ya) === m && l.getAttribute(Qa) === x) r(); else {
          e.setAttribute(n, x), l && e.removeChild(l);
          var _ = {
            iconName: null,
            title: null,
            titleId: null,
            prefix: null,
            transform: Ci,
            symbol: !1,
            mask: {
              iconName: null,
              prefix: null,
              rest: []
            },
            maskId: null,
            extra: {
              classes: [],
              styles: {},
              attributes: {}
            }
          }, E = _.extra;
          E.attributes[Ka] = t, Fo(w, m).then((function(a) {
            var i = Lo(ba(ba({}, _), {}, {
              icons: {
                main: a,
                mask: {
                  prefix: null,
                  iconName: null,
                  rest: []
                }
              },
              prefix: m,
              iconName: x,
              extra: E,
              watchable: !0
            })), o = Ha.createElement("svg");
            "::before" === t ? e.insertBefore(o, e.firstChild) : e.appendChild(o), o.outerHTML = i.map((function(e) {
              return Wi(e);
            })).join("\n"), e.removeAttribute(n), r();
          })).catch(a);
        }
      } else r();
    }));
  }
  function xs(e) {
    return Promise.all([ ws(e, "::before"), ws(e, "::after") ]);
  }
  function ks(e) {
    return !(e.parentNode === document.head || ~Xa.indexOf(e.tagName.toUpperCase()) || e.getAttribute(Ka) || e.parentNode && "svg" === e.parentNode.tagName);
  }
  function _s(e) {
    if (Wa) return new Promise((function(t, n) {
      var r = Oi(e.querySelectorAll("*")).filter(ks).map(xs), a = Uo("searchPseudoElements");
      es(), Promise.all(r).then((function() {
        a(), ts(), t();
      })).catch((function() {
        a(), ts(), n();
      }));
    }));
  }
  var Es = !1, Ss = function(e) {
    return e.toLowerCase().split(" ").reduce((function(e, t) {
      var n = t.toLowerCase().split("-"), r = n[0], a = n.slice(1).join("-");
      if (r && "h" === a) return e.flipX = !0, e;
      if (r && "v" === a) return e.flipY = !0, e;
      if (a = parseFloat(a), isNaN(a)) return e;
      switch (r) {
       case "grow":
        e.size = e.size + a;
        break;

       case "shrink":
        e.size = e.size - a;
        break;

       case "left":
        e.x = e.x - a;
        break;

       case "right":
        e.x = e.x + a;
        break;

       case "up":
        e.y = e.y - a;
        break;

       case "down":
        e.y = e.y + a;
        break;

       case "rotate":
        e.rotate = e.rotate + a;
      }
      return e;
    }), {
      size: 16,
      x: 0,
      y: 0,
      flipX: !1,
      flipY: !1,
      rotate: 0
    });
  }, As = {
    mixout: function() {
      return {
        parse: {
          transform: function(e) {
            return Ss(e);
          }
        }
      };
    },
    hooks: function() {
      return {
        parseNodeAttributes: function(e, t) {
          var n = t.getAttribute("data-fa-transform");
          return n && (e.transform = Ss(n)), e;
        }
      };
    },
    provides: function(e) {
      e.generateAbstractTransformGrouping = function(e) {
        var t = e.main, n = e.transform, r = e.containerWidth, a = e.iconWidth, i = {
          transform: "translate(".concat(r / 2, " 256)")
        }, o = "translate(".concat(32 * n.x, ", ").concat(32 * n.y, ") "), s = "scale(".concat(n.size / 16 * (n.flipX ? -1 : 1), ", ").concat(n.size / 16 * (n.flipY ? -1 : 1), ") "), l = "rotate(".concat(n.rotate, " 0 0)"), u = {
          outer: i,
          inner: {
            transform: "".concat(o, " ").concat(s, " ").concat(l)
          },
          path: {
            transform: "translate(".concat(a / 2 * -1, " -256)")
          }
        };
        return {
          tag: "g",
          attributes: ba({}, u.outer),
          children: [ {
            tag: "g",
            attributes: ba({}, u.inner),
            children: [ {
              tag: t.icon.tag,
              children: t.icon.children,
              attributes: ba(ba({}, t.icon.attributes), u.path)
            } ]
          } ]
        };
      };
    }
  }, Cs = {
    x: 0,
    y: 0,
    width: "100%",
    height: "100%"
  };
  function Ts(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), 
    e;
  }
  var Os, Ns = {
    hooks: function() {
      return {
        parseNodeAttributes: function(e, t) {
          var n = t.getAttribute("data-fa-mask"), r = n ? yo(n.split(" ").map((function(e) {
            return e.trim();
          }))) : {
            prefix: null,
            iconName: null,
            rest: []
          };
          return r.prefix || (r.prefix = mo()), e.mask = r, e.maskId = t.getAttribute("data-fa-mask-id"), 
          e;
        }
      };
    },
    provides: function(e) {
      e.generateAbstractMask = function(e) {
        var t, n = e.children, r = e.attributes, a = e.main, i = e.mask, o = e.maskId, s = e.transform, l = a.width, u = a.icon, c = i.width, f = i.icon, d = function(e) {
          var t = e.transform, n = e.containerWidth, r = e.iconWidth, a = {
            transform: "translate(".concat(n / 2, " 256)")
          }, i = "translate(".concat(32 * t.x, ", ").concat(32 * t.y, ") "), o = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), s = "rotate(".concat(t.rotate, " 0 0)");
          return {
            outer: a,
            inner: {
              transform: "".concat(i, " ").concat(o, " ").concat(s)
            },
            path: {
              transform: "translate(".concat(r / 2 * -1, " -256)")
            }
          };
        }({
          transform: s,
          containerWidth: c,
          iconWidth: l
        }), p = {
          tag: "rect",
          attributes: ba(ba({}, Cs), {}, {
            fill: "white"
          })
        }, h = u.children ? {
          children: u.children.map(Ts)
        } : {}, m = {
          tag: "g",
          attributes: ba({}, d.inner),
          children: [ Ts(ba({
            tag: u.tag,
            attributes: ba(ba({}, u.attributes), d.path)
          }, h)) ]
        }, g = {
          tag: "g",
          attributes: ba({}, d.outer),
          children: [ m ]
        }, v = "mask-".concat(o || Ti()), y = "clip-".concat(o || Ti()), b = {
          tag: "mask",
          attributes: ba(ba({}, Cs), {}, {
            id: v,
            maskUnits: "userSpaceOnUse",
            maskContentUnits: "userSpaceOnUse"
          }),
          children: [ p, g ]
        }, w = {
          tag: "defs",
          children: [ {
            tag: "clipPath",
            attributes: {
              id: y
            },
            children: (t = f, "g" === t.tag ? t.children : [ t ])
          }, b ]
        };
        return n.push(w, {
          tag: "rect",
          attributes: ba({
            fill: "currentColor",
            "clip-path": "url(#".concat(y, ")"),
            mask: "url(#".concat(v, ")")
          }, Cs)
        }), {
          children: n,
          attributes: r
        };
      };
    }
  };
  Os = {
    mixoutsTo: No
  }.mixoutsTo, wo = [ zi, hs, ms, gs, vs, {
    hooks: function() {
      return {
        mutationObserverCallbacks: function(e) {
          return e.pseudoElementsCallback = _s, e;
        }
      };
    },
    provides: function(e) {
      e.pseudoElements2svg = function(e) {
        var t = e.node, n = void 0 === t ? Ha : t;
        Ei.searchPseudoElements && _s(n);
      };
    }
  }, {
    mixout: function() {
      return {
        dom: {
          unwatch: function() {
            es(), Es = !0;
          }
        }
      };
    },
    hooks: function() {
      return {
        bootstrap: function() {
          rs(Eo("mutationObserverCallbacks", {}));
        },
        noAuto: function() {
          ns && ns.disconnect();
        },
        watch: function(e) {
          var t = e.observeMutationsRoot;
          Es ? ts() : rs(Eo("mutationObserverCallbacks", {
            observeMutationsRoot: t
          }));
        }
      };
    }
  }, As, Ns, {
    provides: function(e) {
      var t = !1;
      Fa.matchMedia && (t = Fa.matchMedia("(prefers-reduced-motion: reduce)").matches), 
      e.missingIconAbstract = function() {
        var e = [], n = {
          fill: "currentColor"
        }, r = {
          attributeType: "XML",
          repeatCount: "indefinite",
          dur: "2s"
        };
        e.push({
          tag: "path",
          attributes: ba(ba({}, n), {}, {
            d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
          })
        });
        var a = ba(ba({}, r), {}, {
          attributeName: "opacity"
        }), i = {
          tag: "circle",
          attributes: ba(ba({}, n), {}, {
            cx: "256",
            cy: "364",
            r: "28"
          }),
          children: []
        };
        return t || i.children.push({
          tag: "animate",
          attributes: ba(ba({}, r), {}, {
            attributeName: "r",
            values: "28;14;28;28;14;28;"
          })
        }, {
          tag: "animate",
          attributes: ba(ba({}, a), {}, {
            values: "1;0;1;1;0;1;"
          })
        }), e.push(i), e.push({
          tag: "path",
          attributes: ba(ba({}, n), {}, {
            opacity: "1",
            d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
          }),
          children: t ? [] : [ {
            tag: "animate",
            attributes: ba(ba({}, a), {}, {
              values: "1;0;0;0;0;1;"
            })
          } ]
        }), t || e.push({
          tag: "path",
          attributes: ba(ba({}, n), {}, {
            opacity: "0",
            d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
          }),
          children: [ {
            tag: "animate",
            attributes: ba(ba({}, a), {}, {
              values: "0;0;1;1;0;0;"
            })
          } ]
        }), {
          tag: "g",
          attributes: {
            class: "missing"
          },
          children: e
        };
      };
    }
  }, {
    hooks: function() {
      return {
        parseNodeAttributes: function(e, t) {
          var n = t.getAttribute("data-fa-symbol"), r = null !== n && ("" === n || n);
          return e.symbol = r, e;
        }
      };
    }
  } ], xo = {}, Object.keys(ko).forEach((function(e) {
    -1 === _o.indexOf(e) && delete ko[e];
  })), wo.forEach((function(e) {
    var t = e.mixout ? e.mixout() : {};
    if (Object.keys(t).forEach((function(e) {
      "function" == typeof t[e] && (Os[e] = t[e]), "object" === wa(t[e]) && Object.keys(t[e]).forEach((function(n) {
        Os[e] || (Os[e] = {}), Os[e][n] = t[e][n];
      }));
    })), e.hooks) {
      var n = e.hooks();
      Object.keys(n).forEach((function(e) {
        xo[e] || (xo[e] = []), xo[e].push(n[e]);
      }));
    }
    e.provides && e.provides(ko);
  }));
  var Ms, Is = No.parse, Ls = No.icon;
  Ms = i("UOAc5")();
  Sr = i("bNwRF");
  function js(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter((function(t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      }))), n.push.apply(n, r);
    }
    return n;
  }
  function Ps(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? js(Object(n), !0).forEach((function(t) {
        zs(e, t, n[t]);
      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : js(Object(n)).forEach((function(t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      }));
    }
    return e;
  }
  function Rs(e) {
    return Rs = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e;
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, Rs(e);
  }
  function zs(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function Ds(e, t) {
    if (null == e) return {};
    var n, r, a = function(e, t) {
      if (null == e) return {};
      var n, r, a = {}, i = Object.keys(e);
      for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
      return a;
    }(e, t);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]);
    }
    return a;
  }
  function Fs(e) {
    return function(e) {
      if (Array.isArray(e)) return Hs(e);
    }(e) || function(e) {
      if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
    }(e) || function(e, t) {
      if (!e) return;
      if ("string" == typeof e) return Hs(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Hs(e, t);
    }(e) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function Hs(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function $s(e) {
    return function(e) {
      return (e -= 0) == e;
    }(e) ? e : (e = e.replace(/[\-_\s]+(.)?/g, (function(e, t) {
      return t ? t.toUpperCase() : "";
    }))).substr(0, 1).toLowerCase() + e.substr(1);
  }
  var Bs = [ "style" ];
  function Ws(e) {
    return e.split(";").map((function(e) {
      return e.trim();
    })).filter((function(e) {
      return e;
    })).reduce((function(e, t) {
      var n, r = t.indexOf(":"), a = $s(t.slice(0, r)), i = t.slice(r + 1).trim();
      return a.startsWith("webkit") ? e[(n = a, n.charAt(0).toUpperCase() + n.slice(1))] = i : e[a] = i, 
      e;
    }), {});
  }
  var Us = !1;
  try {
    Us = !0;
  } catch (e) {}
  function Vs(e) {
    return e && "object" === Rs(e) && e.prefix && e.iconName && e.icon ? e : Is.icon ? Is.icon(e) : null === e ? null : e && "object" === Rs(e) && e.prefix && e.iconName ? e : Array.isArray(e) && 2 === e.length ? {
      prefix: e[0],
      iconName: e[1]
    } : "string" == typeof e ? {
      prefix: "fas",
      iconName: e
    } : void 0;
  }
  function qs(e, t) {
    return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? zs({}, e, t) : {};
  }
  var Zs = n(Sr).forwardRef((function(e, t) {
    var n = e.icon, r = e.mask, a = e.symbol, i = e.className, o = e.title, s = e.titleId, l = e.maskId, u = Vs(n), c = qs("classes", [].concat(Fs(function(e) {
      var t, n = e.beat, r = e.fade, a = e.beatFade, i = e.bounce, o = e.shake, s = e.flash, l = e.spin, u = e.spinPulse, c = e.spinReverse, f = e.pulse, d = e.fixedWidth, p = e.inverse, h = e.border, m = e.listItem, g = e.flip, v = e.size, y = e.rotation, b = e.pull, w = (zs(t = {
        "fa-beat": n,
        "fa-fade": r,
        "fa-beat-fade": a,
        "fa-bounce": i,
        "fa-shake": o,
        "fa-flash": s,
        "fa-spin": l,
        "fa-spin-reverse": c,
        "fa-spin-pulse": u,
        "fa-pulse": f,
        "fa-fw": d,
        "fa-inverse": p,
        "fa-border": h,
        "fa-li": m,
        "fa-flip": !0 === g,
        "fa-flip-horizontal": "horizontal" === g || "both" === g,
        "fa-flip-vertical": "vertical" === g || "both" === g
      }, "fa-".concat(v), null != v), zs(t, "fa-rotate-".concat(y), null != y && 0 !== y), 
      zs(t, "fa-pull-".concat(b), null != b), zs(t, "fa-swap-opacity", e.swapOpacity), 
      t);
      return Object.keys(w).map((function(e) {
        return w[e] ? e : null;
      })).filter((function(e) {
        return e;
      }));
    }(e)), Fs(i.split(" ")))), f = qs("transform", "string" == typeof e.transform ? Is.transform(e.transform) : e.transform), d = qs("mask", Vs(r)), p = Ls(u, Ps(Ps(Ps(Ps({}, c), f), d), {}, {
      symbol: a,
      title: o,
      titleId: s,
      maskId: l
    }));
    if (!p) return function() {
      var e;
      !Us && console && "function" == typeof console.error && (e = console).error.apply(e, arguments);
    }("Could not find icon", u), null;
    var h = p.abstract, m = {
      ref: t
    };
    return Object.keys(e).forEach((function(t) {
      Zs.defaultProps.hasOwnProperty(t) || (m[t] = e[t]);
    })), Ks(h[0], m);
  }));
  Zs.displayName = "FontAwesomeIcon", Zs.propTypes = {
    beat: n(Ms).bool,
    border: n(Ms).bool,
    beatFade: n(Ms).bool,
    bounce: n(Ms).bool,
    className: n(Ms).string,
    fade: n(Ms).bool,
    flash: n(Ms).bool,
    mask: n(Ms).oneOfType([ n(Ms).object, n(Ms).array, n(Ms).string ]),
    maskId: n(Ms).string,
    fixedWidth: n(Ms).bool,
    inverse: n(Ms).bool,
    flip: n(Ms).oneOf([ !0, !1, "horizontal", "vertical", "both" ]),
    icon: n(Ms).oneOfType([ n(Ms).object, n(Ms).array, n(Ms).string ]),
    listItem: n(Ms).bool,
    pull: n(Ms).oneOf([ "right", "left" ]),
    pulse: n(Ms).bool,
    rotation: n(Ms).oneOf([ 0, 90, 180, 270 ]),
    shake: n(Ms).bool,
    size: n(Ms).oneOf([ "2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x" ]),
    spin: n(Ms).bool,
    spinPulse: n(Ms).bool,
    spinReverse: n(Ms).bool,
    symbol: n(Ms).oneOfType([ n(Ms).bool, n(Ms).string ]),
    title: n(Ms).string,
    titleId: n(Ms).string,
    transform: n(Ms).oneOfType([ n(Ms).string, n(Ms).object ]),
    swapOpacity: n(Ms).bool
  }, Zs.defaultProps = {
    border: !1,
    className: "",
    mask: null,
    maskId: null,
    fixedWidth: !1,
    inverse: !1,
    flip: !1,
    icon: null,
    listItem: !1,
    pull: null,
    pulse: !1,
    rotation: null,
    size: null,
    spin: !1,
    spinPulse: !1,
    spinReverse: !1,
    beat: !1,
    fade: !1,
    beatFade: !1,
    bounce: !1,
    shake: !1,
    symbol: !1,
    title: "",
    titleId: null,
    transform: null,
    swapOpacity: !1
  };
  var Ks = function e(t, n) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if ("string" == typeof n) return n;
    var a = (n.children || []).map((function(n) {
      return e(t, n);
    })), i = Object.keys(n.attributes || {}).reduce((function(e, t) {
      var r = n.attributes[t];
      switch (t) {
       case "class":
        e.attrs.className = r, delete n.attributes.class;
        break;

       case "style":
        e.attrs.style = Ws(r);
        break;

       default:
        0 === t.indexOf("aria-") || 0 === t.indexOf("data-") ? e.attrs[t.toLowerCase()] = r : e.attrs[$s(t)] = r;
      }
      return e;
    }), {
      attrs: {}
    }), o = r.style, s = void 0 === o ? {} : o, l = Ds(r, Bs);
    return i.attrs.style = Ps(Ps({}, i.attrs.style), s), t.apply(void 0, [ n.tag, Ps(Ps({}, i.attrs), l) ].concat(Fs(a)));
  }.bind(null, n(Sr).createElement);
  const Ys = {
    info: {
      icon: ma,
      color: "#0ea5e9"
    },
    warning: {
      icon: va,
      color: "#fde047"
    },
    success: {
      icon: pa,
      color: "#22c55e"
    },
    error: {
      icon: fa,
      color: "#ef4444"
    },
    unset: {
      icon: ga,
      color: "#9ca3af"
    },
    enabled: {
      icon: da,
      color: "#22c55e"
    },
    disabled: {
      icon: ca,
      color: "#404040"
    },
    trash: {
      icon: ha,
      color: "#ef4444"
    }
  };
  function Qs({iconType: e}) {
    const t = Ys[e].icon, n = Ys[e].color;
    return (0, Er.jsx)(Zs, {
      icon: t,
      size: "xl",
      style: {
        color: n
      }
    });
  }
  function Gs({label: e, status: t}) {
    return (0, Er.jsxs)("div", {
      className: "ToggleStatus " + (void 0 === t ? "unset" : "set"),
      children: [ e, (0, Er.jsx)(Qs, {
        iconType: (n = t, void 0 === n ? "unset" : n ? "enabled" : "disabled")
      }) ]
    });
    var n;
  }
  function Xs() {
    const {navigation: e, path: t, host: n, tab: r, global: a} = Bn();
    return (0, Er.jsxs)(ua, {
      children: [ (0, Er.jsx)(Gs, {
        label: "Now",
        status: e
      }), (0, Er.jsx)(Gs, {
        label: "Page",
        status: t
      }), (0, Er.jsx)(Gs, {
        label: "Host",
        status: n
      }), (0, Er.jsx)(Gs, {
        label: "Tab",
        status: r
      }), (0, Er.jsx)(Gs, {
        label: "Global",
        status: a
      }) ]
    });
  }
  let Js, el = !1;
  function tl() {
    let e = document.querySelector("#rango-toast");
    if (!e) {
      e = document.createElement("div"), e.id = "rango-toast", document.body.append(e);
      ia(e).render((0, Er.jsx)(la, {}));
    }
  }
  async function nl() {
    return !!(el && "visible" === document.visibilityState && Hn("enableNotifications") && h() && await p());
  }
  async function rl(e, t) {
    if (!await nl()) return;
    tl();
    const n = await Pn("toastDuration");
    "enabled" === (t = Object.assign({
      autoClose: n
    }, t))?.icon && (t.icon = (0, Er.jsx)(Qs, {
      iconType: "enabled"
    })), "disabled" === t?.icon && (t.icon = (0, Er.jsx)(Qs, {
      iconType: "disabled"
    })), "trash" === t?.icon && (t.icon = (0, Er.jsx)(Qs, {
      iconType: "trash"
    })), t?.toastId && aa.isActive(t.toastId) ? aa.update(t.toastId, {
      render: (0, Er.jsx)(ua, {
        children: (0, Er.jsx)("p", {
          children: e
        })
      }),
      ...t
    }) : aa((0, Er.jsx)(ua, {
      children: (0, Er.jsx)("p", {
        children: e
      })
    }), t);
  }
  async function al(e = !1) {
    if (!await nl() || !e && !Hn("notifyWhenTogglingHints")) return;
    tl();
    const t = await Pn("toastDuration");
    aa.isActive("toggles") ? aa.update("toggles") : aa((0, Er.jsx)(Xs, {}), {
      autoClose: t,
      toastId: "toggles"
    });
  }
  async function il(e) {
    if (e.element instanceof HTMLAnchorElement) return void await rl(`The element with hint "${e.hint.string}" is not editable`, {
      type: "error"
    });
    e.click(), await _r(50);
    const t = await async function() {
      return new Promise((e => {
        let t = !1;
        const n = setTimeout((() => {
          t = !0, e(void 0);
        }), 500), r = () => {
          const a = lr();
          or(a) || t ? (clearTimeout(n), e(a)) : setTimeout((() => {
            r();
          }), 20);
        };
        r();
      }));
    }();
    return t ? e.element instanceof HTMLElement && e.element.isContentEditable ? e : Qn(t) : void 0;
  }
  function ol(e) {
    Js = e;
  }
  o = i("dBVaG");
  async function sl(e) {
    const t = e[0], r = e.slice(1);
    vr(t), t.hint?.flash(), t.element instanceof HTMLAnchorElement && n(o).runtime.sendMessage({
      type: "openInNewTab",
      url: t.element.href
    }), r.length > 0 && ll(r);
  }
  async function ll(e) {
    const t = [], r = [];
    for (const n of e) n.element instanceof HTMLAnchorElement && (r.push(n), t.push(n.element.href));
    if (t.length > 0) {
      for (const e of r) e.hint?.flash();
      await n(o).runtime.sendMessage({
        type: "openInBackgroundTab",
        links: t
      });
    }
  }
  async function ul(e) {
    let t = !1;
    if (e.length > 1) {
      const t = e.filter((e => e.element instanceof HTMLAnchorElement));
      e = e.filter((e => !(e.element instanceof HTMLAnchorElement))), await ll(t);
    }
    for (const n of e) {
      n.click() && (t = !0);
    }
    return 1 === e.length && e[0].element instanceof HTMLSelectElement ? [ {
      name: "focusPage"
    }, {
      name: "key",
      key: "alt-down",
      main: !0
    } ] : t ? [ {
      name: "focusPage"
    } ] : void 0;
  }
  /**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/  function cl(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function fl(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return t && t.defaultView || window;
    }
    return e;
  }
  function dl(e) {
    return e instanceof fl(e).Element || e instanceof Element;
  }
  function pl(e) {
    return e instanceof fl(e).HTMLElement || e instanceof HTMLElement;
  }
  function hl(e) {
    return "undefined" != typeof ShadowRoot && (e instanceof fl(e).ShadowRoot || e instanceof ShadowRoot);
  }
  var ml = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function(e) {
      var t = e.state;
      Object.keys(t.elements).forEach((function(e) {
        var n = t.styles[e] || {}, r = t.attributes[e] || {}, a = t.elements[e];
        pl(a) && cl(a) && (Object.assign(a.style, n), Object.keys(r).forEach((function(e) {
          var t = r[e];
          !1 === t ? a.removeAttribute(e) : a.setAttribute(e, !0 === t ? "" : t);
        })));
      }));
    },
    effect: function(e) {
      var t = e.state, n = {
        popper: {
          position: t.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: {
          position: "absolute"
        },
        reference: {}
      };
      return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), 
      function() {
        Object.keys(t.elements).forEach((function(e) {
          var r = t.elements[e], a = t.attributes[e] || {}, i = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
            return e[t] = "", e;
          }), {});
          pl(r) && cl(r) && (Object.assign(r.style, i), Object.keys(a).forEach((function(e) {
            r.removeAttribute(e);
          })));
        }));
      };
    },
    requires: [ "computeStyles" ]
  }, gl = Math.max, vl = Math.min, yl = Math.round;
  function bl() {
    var e = navigator.userAgentData;
    return null != e && e.brands ? e.brands.map((function(e) {
      return e.brand + "/" + e.version;
    })).join(" ") : navigator.userAgent;
  }
  function wl() {
    return !/^((?!chrome|android).)*safari/i.test(bl());
  }
  function xl(e, t, n) {
    void 0 === t && (t = !1), void 0 === n && (n = !1);
    var r = e.getBoundingClientRect(), a = 1, i = 1;
    t && pl(e) && (a = e.offsetWidth > 0 && yl(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && yl(r.height) / e.offsetHeight || 1);
    var o = (dl(e) ? fl(e) : window).visualViewport, s = !wl() && n, l = (r.left + (s && o ? o.offsetLeft : 0)) / a, u = (r.top + (s && o ? o.offsetTop : 0)) / i, c = r.width / a, f = r.height / i;
    return {
      width: c,
      height: f,
      top: u,
      right: l + c,
      bottom: u + f,
      left: l,
      x: l,
      y: u
    };
  }
  function kl(e) {
    var t = fl(e);
    return {
      scrollLeft: t.pageXOffset,
      scrollTop: t.pageYOffset
    };
  }
  function _l(e) {
    return ((dl(e) ? e.ownerDocument : e.document) || window.document).documentElement;
  }
  function El(e) {
    return xl(_l(e)).left + kl(e).scrollLeft;
  }
  function Sl(e) {
    return fl(e).getComputedStyle(e);
  }
  function Al(e) {
    var t = Sl(e), n = t.overflow, r = t.overflowX, a = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + a + r);
  }
  function Cl(e, t, n) {
    void 0 === n && (n = !1);
    var r, a, i = pl(t), o = pl(t) && function(e) {
      var t = e.getBoundingClientRect(), n = yl(t.width) / e.offsetWidth || 1, r = yl(t.height) / e.offsetHeight || 1;
      return 1 !== n || 1 !== r;
    }(t), s = _l(t), l = xl(e, o, n), u = {
      scrollLeft: 0,
      scrollTop: 0
    }, c = {
      x: 0,
      y: 0
    };
    return (i || !i && !n) && (("body" !== cl(t) || Al(s)) && (u = (r = t) !== fl(r) && pl(r) ? {
      scrollLeft: (a = r).scrollLeft,
      scrollTop: a.scrollTop
    } : kl(r)), pl(t) ? ((c = xl(t, !0)).x += t.clientLeft, c.y += t.clientTop) : s && (c.x = El(s))), 
    {
      x: l.left + u.scrollLeft - c.x,
      y: l.top + u.scrollTop - c.y,
      width: l.width,
      height: l.height
    };
  }
  function Tl(e) {
    var t = xl(e), n = e.offsetWidth, r = e.offsetHeight;
    return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), 
    {
      x: e.offsetLeft,
      y: e.offsetTop,
      width: n,
      height: r
    };
  }
  function Ol(e) {
    return "html" === cl(e) ? e : e.assignedSlot || e.parentNode || (hl(e) ? e.host : null) || _l(e);
  }
  function Nl(e) {
    return [ "html", "body", "#document" ].indexOf(cl(e)) >= 0 ? e.ownerDocument.body : pl(e) && Al(e) ? e : Nl(Ol(e));
  }
  function Ml(e, t) {
    var n;
    void 0 === t && (t = []);
    var r = Nl(e), a = r === (null == (n = e.ownerDocument) ? void 0 : n.body), i = fl(r), o = a ? [ i ].concat(i.visualViewport || [], Al(r) ? r : []) : r, s = t.concat(o);
    return a ? s : s.concat(Ml(Ol(o)));
  }
  function Il(e) {
    return [ "table", "td", "th" ].indexOf(cl(e)) >= 0;
  }
  function Ll(e) {
    return pl(e) && "fixed" !== Sl(e).position ? e.offsetParent : null;
  }
  function jl(e) {
    for (var t = fl(e), n = Ll(e); n && Il(n) && "static" === Sl(n).position; ) n = Ll(n);
    return n && ("html" === cl(n) || "body" === cl(n) && "static" === Sl(n).position) ? t : n || function(e) {
      var t = /firefox/i.test(bl());
      if (/Trident/i.test(bl()) && pl(e) && "fixed" === Sl(e).position) return null;
      var n = Ol(e);
      for (hl(n) && (n = n.host); pl(n) && [ "html", "body" ].indexOf(cl(n)) < 0; ) {
        var r = Sl(n);
        if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== [ "transform", "perspective" ].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return n;
        n = n.parentNode;
      }
      return null;
    }(e) || t;
  }
  var Pl = "top", Rl = "bottom", zl = "right", Dl = "left", Fl = "auto", Hl = [ Pl, Rl, zl, Dl ], $l = "start", Bl = "end", Wl = "viewport", Ul = "popper", Vl = Hl.reduce((function(e, t) {
    return e.concat([ t + "-" + $l, t + "-" + Bl ]);
  }), []), ql = [].concat(Hl, [ Fl ]).reduce((function(e, t) {
    return e.concat([ t, t + "-" + $l, t + "-" + Bl ]);
  }), []), Zl = [ "beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite" ];
  function Kl(e) {
    var t = new Map, n = new Set, r = [];
    function a(e) {
      n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach((function(e) {
        if (!n.has(e)) {
          var r = t.get(e);
          r && a(r);
        }
      })), r.push(e);
    }
    return e.forEach((function(e) {
      t.set(e.name, e);
    })), e.forEach((function(e) {
      n.has(e.name) || a(e);
    })), r;
  }
  function Yl(e) {
    var t = Kl(e);
    return Zl.reduce((function(e, n) {
      return e.concat(t.filter((function(e) {
        return e.phase === n;
      })));
    }), []);
  }
  function Ql(e) {
    var t = e.reduce((function(e, t) {
      var n = e[t.name];
      return e[t.name] = n ? Object.assign({}, n, t, {
        options: Object.assign({}, n.options, t.options),
        data: Object.assign({}, n.data, t.data)
      }) : t, e;
    }), {});
    return Object.keys(t).map((function(e) {
      return t[e];
    }));
  }
  var Gl = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function Xl() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return !t.some((function(e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    }));
  }
  function Jl(e) {
    void 0 === e && (e = {});
    var t = e, n = t.defaultModifiers, r = void 0 === n ? [] : n, a = t.defaultOptions, i = void 0 === a ? Gl : a;
    return function(e, t, n) {
      void 0 === n && (n = i);
      var a, o, s = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Gl, i),
        modifiersData: {},
        elements: {
          reference: e,
          popper: t
        },
        attributes: {},
        styles: {}
      }, l = [], u = !1, c = {
        state: s,
        setOptions: function(n) {
          var a = "function" == typeof n ? n(s.options) : n;
          f(), s.options = Object.assign({}, i, s.options, a), s.scrollParents = {
            reference: dl(e) ? Ml(e) : e.contextElement ? Ml(e.contextElement) : [],
            popper: Ml(t)
          };
          var o = Yl(Ql([].concat(r, s.options.modifiers)));
          return s.orderedModifiers = o.filter((function(e) {
            return e.enabled;
          })), s.orderedModifiers.forEach((function(e) {
            var t = e.name, n = e.options, r = void 0 === n ? {} : n, a = e.effect;
            if ("function" == typeof a) {
              var i = a({
                state: s,
                name: t,
                instance: c,
                options: r
              }), o = function() {};
              l.push(i || o);
            }
          })), c.update();
        },
        forceUpdate: function() {
          if (!u) {
            var e = s.elements, t = e.reference, n = e.popper;
            if (Xl(t, n)) {
              s.rects = {
                reference: Cl(t, jl(n), "fixed" === s.options.strategy),
                popper: Tl(n)
              }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                return s.modifiersData[e.name] = Object.assign({}, e.data);
              }));
              for (var r = 0; r < s.orderedModifiers.length; r++) if (!0 !== s.reset) {
                var a = s.orderedModifiers[r], i = a.fn, o = a.options, l = void 0 === o ? {} : o, f = a.name;
                "function" == typeof i && (s = i({
                  state: s,
                  options: l,
                  name: f,
                  instance: c
                }) || s);
              } else s.reset = !1, r = -1;
            }
          }
        },
        update: (a = function() {
          return new Promise((function(e) {
            c.forceUpdate(), e(s);
          }));
        }, function() {
          return o || (o = new Promise((function(e) {
            Promise.resolve().then((function() {
              o = void 0, e(a());
            }));
          }))), o;
        }),
        destroy: function() {
          f(), u = !0;
        }
      };
      if (!Xl(e, t)) return c;
      function f() {
        l.forEach((function(e) {
          return e();
        })), l = [];
      }
      return c.setOptions(n).then((function(e) {
        !u && n.onFirstUpdate && n.onFirstUpdate(e);
      })), c;
    };
  }
  var eu = {
    passive: !0
  };
  var tu = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: function(e) {
      var t = e.state, n = e.instance, r = e.options, a = r.scroll, i = void 0 === a || a, o = r.resize, s = void 0 === o || o, l = fl(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
      return i && u.forEach((function(e) {
        e.addEventListener("scroll", n.update, eu);
      })), s && l.addEventListener("resize", n.update, eu), function() {
        i && u.forEach((function(e) {
          e.removeEventListener("scroll", n.update, eu);
        })), s && l.removeEventListener("resize", n.update, eu);
      };
    },
    data: {}
  };
  function nu(e) {
    return e.split("-")[0];
  }
  function ru(e) {
    return e.split("-")[1];
  }
  function au(e) {
    return [ "top", "bottom" ].indexOf(e) >= 0 ? "x" : "y";
  }
  function iu(e) {
    var t, n = e.reference, r = e.element, a = e.placement, i = a ? nu(a) : null, o = a ? ru(a) : null, s = n.x + n.width / 2 - r.width / 2, l = n.y + n.height / 2 - r.height / 2;
    switch (i) {
     case Pl:
      t = {
        x: s,
        y: n.y - r.height
      };
      break;

     case Rl:
      t = {
        x: s,
        y: n.y + n.height
      };
      break;

     case zl:
      t = {
        x: n.x + n.width,
        y: l
      };
      break;

     case Dl:
      t = {
        x: n.x - r.width,
        y: l
      };
      break;

     default:
      t = {
        x: n.x,
        y: n.y
      };
    }
    var u = i ? au(i) : null;
    if (null != u) {
      var c = "y" === u ? "height" : "width";
      switch (o) {
       case $l:
        t[u] = t[u] - (n[c] / 2 - r[c] / 2);
        break;

       case Bl:
        t[u] = t[u] + (n[c] / 2 - r[c] / 2);
      }
    }
    return t;
  }
  var ou = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: function(e) {
      var t = e.state, n = e.name;
      t.modifiersData[n] = iu({
        reference: t.rects.reference,
        element: t.rects.popper,
        strategy: "absolute",
        placement: t.placement
      });
    },
    data: {}
  }, su = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function lu(e) {
    var t, n = e.popper, r = e.popperRect, a = e.placement, i = e.variation, o = e.offsets, s = e.position, l = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, f = e.isFixed, d = o.x, p = void 0 === d ? 0 : d, h = o.y, m = void 0 === h ? 0 : h, g = "function" == typeof c ? c({
      x: p,
      y: m
    }) : {
      x: p,
      y: m
    };
    p = g.x, m = g.y;
    var v = o.hasOwnProperty("x"), y = o.hasOwnProperty("y"), b = Dl, w = Pl, x = window;
    if (u) {
      var k = jl(n), _ = "clientHeight", E = "clientWidth";
      if (k === fl(n) && "static" !== Sl(k = _l(n)).position && "absolute" === s && (_ = "scrollHeight", 
      E = "scrollWidth"), a === Pl || (a === Dl || a === zl) && i === Bl) w = Rl, m -= (f && k === x && x.visualViewport ? x.visualViewport.height : k[_]) - r.height, 
      m *= l ? 1 : -1;
      if (a === Dl || (a === Pl || a === Rl) && i === Bl) b = zl, p -= (f && k === x && x.visualViewport ? x.visualViewport.width : k[E]) - r.width, 
      p *= l ? 1 : -1;
    }
    var S, A = Object.assign({
      position: s
    }, u && su), C = !0 === c ? function(e) {
      var t = e.x, n = e.y, r = window.devicePixelRatio || 1;
      return {
        x: yl(t * r) / r || 0,
        y: yl(n * r) / r || 0
      };
    }({
      x: p,
      y: m
    }) : {
      x: p,
      y: m
    };
    return p = C.x, m = C.y, l ? Object.assign({}, A, ((S = {})[w] = y ? "0" : "", S[b] = v ? "0" : "", 
    S.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", 
    S)) : Object.assign({}, A, ((t = {})[w] = y ? m + "px" : "", t[b] = v ? p + "px" : "", 
    t.transform = "", t));
  }
  var uu = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: [ "popperOffsets" ],
    fn: function(e) {
      var t = e.state, n = e.options, r = e.name, a = n.offset, i = void 0 === a ? [ 0, 0 ] : a, o = ql.reduce((function(e, n) {
        return e[n] = function(e, t, n) {
          var r = nu(e), a = [ Dl, Pl ].indexOf(r) >= 0 ? -1 : 1, i = "function" == typeof n ? n(Object.assign({}, t, {
            placement: e
          })) : n, o = i[0], s = i[1];
          return o = o || 0, s = (s || 0) * a, [ Dl, zl ].indexOf(r) >= 0 ? {
            x: s,
            y: o
          } : {
            x: o,
            y: s
          };
        }(n, t.rects, i), e;
      }), {}), s = o[t.placement], l = s.x, u = s.y;
      null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l, 
      t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = o;
    }
  }, cu = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function fu(e) {
    return e.replace(/left|right|bottom|top/g, (function(e) {
      return cu[e];
    }));
  }
  var du = {
    start: "end",
    end: "start"
  };
  function pu(e) {
    return e.replace(/start|end/g, (function(e) {
      return du[e];
    }));
  }
  function hu(e, t) {
    var n = fl(e), r = _l(e), a = n.visualViewport, i = r.clientWidth, o = r.clientHeight, s = 0, l = 0;
    if (a) {
      i = a.width, o = a.height;
      var u = wl();
      (u || !u && "fixed" === t) && (s = a.offsetLeft, l = a.offsetTop);
    }
    return {
      width: i,
      height: o,
      x: s + El(e),
      y: l
    };
  }
  function mu(e) {
    var t, n = _l(e), r = kl(e), a = null == (t = e.ownerDocument) ? void 0 : t.body, i = gl(n.scrollWidth, n.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0), o = gl(n.scrollHeight, n.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0), s = -r.scrollLeft + El(e), l = -r.scrollTop;
    return "rtl" === Sl(a || n).direction && (s += gl(n.clientWidth, a ? a.clientWidth : 0) - i), 
    {
      width: i,
      height: o,
      x: s,
      y: l
    };
  }
  function gu(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && hl(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function vu(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height
    });
  }
  function yu(e, t, n) {
    return t === Wl ? vu(hu(e, n)) : dl(t) ? function(e, t) {
      var n = xl(e, !1, "fixed" === t);
      return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, 
      n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, 
      n.x = n.left, n.y = n.top, n;
    }(t, n) : vu(mu(_l(e)));
  }
  function bu(e, t, n, r) {
    var a = "clippingParents" === t ? function(e) {
      var t = Ml(Ol(e)), n = [ "absolute", "fixed" ].indexOf(Sl(e).position) >= 0 && pl(e) ? jl(e) : e;
      return dl(n) ? t.filter((function(e) {
        return dl(e) && gu(e, n) && "body" !== cl(e);
      })) : [];
    }(e) : [].concat(t), i = [].concat(a, [ n ]), o = i[0], s = i.reduce((function(t, n) {
      var a = yu(e, n, r);
      return t.top = gl(a.top, t.top), t.right = vl(a.right, t.right), t.bottom = vl(a.bottom, t.bottom), 
      t.left = gl(a.left, t.left), t;
    }), yu(e, o, r));
    return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, 
    s;
  }
  function wu(e) {
    return Object.assign({}, {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, e);
  }
  function xu(e, t) {
    return t.reduce((function(t, n) {
      return t[n] = e, t;
    }), {});
  }
  function ku(e, t) {
    void 0 === t && (t = {});
    var n = t, r = n.placement, a = void 0 === r ? e.placement : r, i = n.strategy, o = void 0 === i ? e.strategy : i, s = n.boundary, l = void 0 === s ? "clippingParents" : s, u = n.rootBoundary, c = void 0 === u ? Wl : u, f = n.elementContext, d = void 0 === f ? Ul : f, p = n.altBoundary, h = void 0 !== p && p, m = n.padding, g = void 0 === m ? 0 : m, v = wu("number" != typeof g ? g : xu(g, Hl)), y = d === Ul ? "reference" : Ul, b = e.rects.popper, w = e.elements[h ? y : d], x = bu(dl(w) ? w : w.contextElement || _l(e.elements.popper), l, c, o), k = xl(e.elements.reference), _ = iu({
      reference: k,
      element: b,
      strategy: "absolute",
      placement: a
    }), E = vu(Object.assign({}, b, _)), S = d === Ul ? E : k, A = {
      top: x.top - S.top + v.top,
      bottom: S.bottom - x.bottom + v.bottom,
      left: x.left - S.left + v.left,
      right: S.right - x.right + v.right
    }, C = e.modifiersData.offset;
    if (d === Ul && C) {
      var T = C[a];
      Object.keys(A).forEach((function(e) {
        var t = [ zl, Rl ].indexOf(e) >= 0 ? 1 : -1, n = [ Pl, Rl ].indexOf(e) >= 0 ? "y" : "x";
        A[e] += T[n] * t;
      }));
    }
    return A;
  }
  function _u(e, t) {
    void 0 === t && (t = {});
    var n = t, r = n.placement, a = n.boundary, i = n.rootBoundary, o = n.padding, s = n.flipVariations, l = n.allowedAutoPlacements, u = void 0 === l ? ql : l, c = ru(r), f = c ? s ? Vl : Vl.filter((function(e) {
      return ru(e) === c;
    })) : Hl, d = f.filter((function(e) {
      return u.indexOf(e) >= 0;
    }));
    0 === d.length && (d = f);
    var p = d.reduce((function(t, n) {
      return t[n] = ku(e, {
        placement: n,
        boundary: a,
        rootBoundary: i,
        padding: o
      })[nu(n)], t;
    }), {});
    return Object.keys(p).sort((function(e, t) {
      return p[e] - p[t];
    }));
  }
  var Eu = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function(e) {
      var t = e.state, n = e.options, r = e.name;
      if (!t.modifiersData[r]._skip) {
        for (var a = n.mainAxis, i = void 0 === a || a, o = n.altAxis, s = void 0 === o || o, l = n.fallbackPlacements, u = n.padding, c = n.boundary, f = n.rootBoundary, d = n.altBoundary, p = n.flipVariations, h = void 0 === p || p, m = n.allowedAutoPlacements, g = t.options.placement, v = nu(g), y = l || (v === g || !h ? [ fu(g) ] : function(e) {
          if (nu(e) === Fl) return [];
          var t = fu(e);
          return [ pu(e), t, pu(t) ];
        }(g)), b = [ g ].concat(y).reduce((function(e, n) {
          return e.concat(nu(n) === Fl ? _u(t, {
            placement: n,
            boundary: c,
            rootBoundary: f,
            padding: u,
            flipVariations: h,
            allowedAutoPlacements: m
          }) : n);
        }), []), w = t.rects.reference, x = t.rects.popper, k = new Map, _ = !0, E = b[0], S = 0; S < b.length; S++) {
          var A = b[S], C = nu(A), T = ru(A) === $l, O = [ Pl, Rl ].indexOf(C) >= 0, N = O ? "width" : "height", M = ku(t, {
            placement: A,
            boundary: c,
            rootBoundary: f,
            altBoundary: d,
            padding: u
          }), I = O ? T ? zl : Dl : T ? Rl : Pl;
          w[N] > x[N] && (I = fu(I));
          var L = fu(I), j = [];
          if (i && j.push(M[C] <= 0), s && j.push(M[I] <= 0, M[L] <= 0), j.every((function(e) {
            return e;
          }))) {
            E = A, _ = !1;
            break;
          }
          k.set(A, j);
        }
        if (_) for (var P = function(e) {
          var t = b.find((function(t) {
            var n = k.get(t);
            if (n) return n.slice(0, e).every((function(e) {
              return e;
            }));
          }));
          if (t) return E = t, "break";
        }, R = h ? 3 : 1; R > 0; R--) {
          if ("break" === P(R)) break;
        }
        t.placement !== E && (t.modifiersData[r]._skip = !0, t.placement = E, t.reset = !0);
      }
    },
    requiresIfExists: [ "offset" ],
    data: {
      _skip: !1
    }
  };
  function Su(e, t, n) {
    return gl(e, vl(t, n));
  }
  function Au(e, t, n) {
    var r = Su(e, t, n);
    return r > n ? n : r;
  }
  var Cu = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function(e) {
      var t = e.state, n = e.options, r = e.name, a = n.mainAxis, i = void 0 === a || a, o = n.altAxis, s = void 0 !== o && o, l = n.boundary, u = n.rootBoundary, c = n.altBoundary, f = n.padding, d = n.tether, p = void 0 === d || d, h = n.tetherOffset, m = void 0 === h ? 0 : h, g = ku(t, {
        boundary: l,
        rootBoundary: u,
        padding: f,
        altBoundary: c
      }), v = nu(t.placement), y = ru(t.placement), b = !y, w = au(v), x = "x" === w ? "y" : "x", k = t.modifiersData.popperOffsets, _ = t.rects.reference, E = t.rects.popper, S = "function" == typeof m ? m(Object.assign({}, t.rects, {
        placement: t.placement
      })) : m, A = "number" == typeof S ? {
        mainAxis: S,
        altAxis: S
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, S), C = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, T = {
        x: 0,
        y: 0
      };
      if (k) {
        if (i) {
          var O, N = "y" === w ? Pl : Dl, M = "y" === w ? Rl : zl, I = "y" === w ? "height" : "width", L = k[w], j = L + g[N], P = L - g[M], R = p ? -E[I] / 2 : 0, z = y === $l ? _[I] : E[I], D = y === $l ? -E[I] : -_[I], F = t.elements.arrow, H = p && F ? Tl(F) : {
            width: 0,
            height: 0
          }, $ = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }, B = $[N], W = $[M], U = Su(0, _[I], H[I]), V = b ? _[I] / 2 - R - U - B - A.mainAxis : z - U - B - A.mainAxis, q = b ? -_[I] / 2 + R + U + W + A.mainAxis : D + U + W + A.mainAxis, Z = t.elements.arrow && jl(t.elements.arrow), K = Z ? "y" === w ? Z.clientTop || 0 : Z.clientLeft || 0 : 0, Y = null != (O = null == C ? void 0 : C[w]) ? O : 0, Q = L + q - Y, G = Su(p ? vl(j, L + V - Y - K) : j, L, p ? gl(P, Q) : P);
          k[w] = G, T[w] = G - L;
        }
        if (s) {
          var X, J = "x" === w ? Pl : Dl, ee = "x" === w ? Rl : zl, te = k[x], ne = "y" === x ? "height" : "width", re = te + g[J], ae = te - g[ee], ie = -1 !== [ Pl, Dl ].indexOf(v), oe = null != (X = null == C ? void 0 : C[x]) ? X : 0, se = ie ? re : te - _[ne] - E[ne] - oe + A.altAxis, le = ie ? te + _[ne] + E[ne] - oe - A.altAxis : ae, ue = p && ie ? Au(se, te, le) : Su(p ? se : re, te, p ? le : ae);
          k[x] = ue, T[x] = ue - te;
        }
        t.modifiersData[r] = T;
      }
    },
    requiresIfExists: [ "offset" ]
  };
  var Tu = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function(e) {
      var t, n = e.state, r = e.name, a = e.options, i = n.elements.arrow, o = n.modifiersData.popperOffsets, s = nu(n.placement), l = au(s), u = [ Dl, zl ].indexOf(s) >= 0 ? "height" : "width";
      if (i && o) {
        var c = function(e, t) {
          return wu("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {
            placement: t.placement
          })) : e) ? e : xu(e, Hl));
        }(a.padding, n), f = Tl(i), d = "y" === l ? Pl : Dl, p = "y" === l ? Rl : zl, h = n.rects.reference[u] + n.rects.reference[l] - o[l] - n.rects.popper[u], m = o[l] - n.rects.reference[l], g = jl(i), v = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0, y = h / 2 - m / 2, b = c[d], w = v - f[u] - c[p], x = v / 2 - f[u] / 2 + y, k = Su(b, x, w), _ = l;
        n.modifiersData[r] = ((t = {})[_] = k, t.centerOffset = k - x, t);
      }
    },
    effect: function(e) {
      var t = e.state, n = e.options.element, r = void 0 === n ? "[data-popper-arrow]" : n;
      null != r && ("string" != typeof r || (r = t.elements.popper.querySelector(r))) && gu(t.elements.popper, r) && (t.elements.arrow = r);
    },
    requires: [ "popperOffsets" ],
    requiresIfExists: [ "preventOverflow" ]
  };
  function Ou(e, t, n) {
    return void 0 === n && (n = {
      x: 0,
      y: 0
    }), {
      top: e.top - t.height - n.y,
      right: e.right - t.width + n.x,
      bottom: e.bottom - t.height + n.y,
      left: e.left - t.width - n.x
    };
  }
  function Nu(e) {
    return [ Pl, zl, Rl, Dl ].some((function(t) {
      return e[t] >= 0;
    }));
  }
  var Mu = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: [ "preventOverflow" ],
    fn: function(e) {
      var t = e.state, n = e.name, r = t.rects.reference, a = t.rects.popper, i = t.modifiersData.preventOverflow, o = ku(t, {
        elementContext: "reference"
      }), s = ku(t, {
        altBoundary: !0
      }), l = Ou(o, r), u = Ou(s, a, i), c = Nu(l), f = Nu(u);
      t.modifiersData[n] = {
        referenceClippingOffsets: l,
        popperEscapeOffsets: u,
        isReferenceHidden: c,
        hasPopperEscaped: f
      }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-reference-hidden": c,
        "data-popper-escaped": f
      });
    }
  }, Iu = Jl({
    defaultModifiers: [ tu, ou, {
      name: "computeStyles",
      enabled: !0,
      phase: "beforeWrite",
      fn: function(e) {
        var t = e.state, n = e.options, r = n.gpuAcceleration, a = void 0 === r || r, i = n.adaptive, o = void 0 === i || i, s = n.roundOffsets, l = void 0 === s || s, u = {
          placement: nu(t.placement),
          variation: ru(t.placement),
          popper: t.elements.popper,
          popperRect: t.rects.popper,
          gpuAcceleration: a,
          isFixed: "fixed" === t.options.strategy
        };
        null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, lu(Object.assign({}, u, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: o,
          roundOffsets: l
        })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, lu(Object.assign({}, u, {
          offsets: t.modifiersData.arrow,
          position: "absolute",
          adaptive: !1,
          roundOffsets: l
        })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
          "data-popper-placement": t.placement
        });
      },
      data: {}
    }, ml, uu, Eu, Cu, Tu, Mu ]
  }), Lu = "tippy-content", ju = "tippy-backdrop", Pu = "tippy-arrow", Ru = "tippy-svg-arrow", zu = {
    passive: !0,
    capture: !0
  }, Du = function() {
    return document.body;
  };
  function Fu(e, t, n) {
    if (Array.isArray(e)) {
      var r = e[t];
      return null == r ? Array.isArray(n) ? n[t] : n : r;
    }
    return e;
  }
  function Hu(e, t) {
    var n = {}.toString.call(e);
    return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
  }
  function $u(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function Bu(e, t) {
    return 0 === t ? e : function(r) {
      clearTimeout(n), n = setTimeout((function() {
        e(r);
      }), t);
    };
    var n;
  }
  function Wu(e) {
    return [].concat(e);
  }
  function Uu(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function Vu(e) {
    return e.split("-")[0];
  }
  function qu(e) {
    return [].slice.call(e);
  }
  function Zu(e) {
    return Object.keys(e).reduce((function(t, n) {
      return void 0 !== e[n] && (t[n] = e[n]), t;
    }), {});
  }
  function Ku() {
    return document.createElement("div");
  }
  function Yu(e) {
    return [ "Element", "Fragment" ].some((function(t) {
      return Hu(e, t);
    }));
  }
  function Qu(e) {
    return Hu(e, "MouseEvent");
  }
  function Gu(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function Xu(e) {
    return Yu(e) ? [ e ] : function(e) {
      return Hu(e, "NodeList");
    }(e) ? qu(e) : Array.isArray(e) ? e : qu(document.querySelectorAll(e));
  }
  function Ju(e, t) {
    e.forEach((function(e) {
      e && (e.style.transitionDuration = t + "ms");
    }));
  }
  function ec(e, t) {
    e.forEach((function(e) {
      e && e.setAttribute("data-state", t);
    }));
  }
  function tc(e) {
    var t, n = Wu(e)[0];
    return null != n && null != (t = n.ownerDocument) && t.body ? n.ownerDocument : document;
  }
  function nc(e, t, n) {
    var r = t + "EventListener";
    [ "transitionend", "webkitTransitionEnd" ].forEach((function(t) {
      e[r](t, n);
    }));
  }
  function rc(e, t) {
    for (var n = t; n; ) {
      var r;
      if (e.contains(n)) return !0;
      n = null == n.getRootNode || null == (r = n.getRootNode()) ? void 0 : r.host;
    }
    return !1;
  }
  var ac = {
    isTouch: !1
  }, ic = 0;
  function oc() {
    ac.isTouch || (ac.isTouch = !0, window.performance && document.addEventListener("mousemove", sc));
  }
  function sc() {
    var e = performance.now();
    e - ic < 20 && (ac.isTouch = !1, document.removeEventListener("mousemove", sc)), 
    ic = e;
  }
  function lc() {
    var e = document.activeElement;
    if (Gu(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var uc = !!("undefined" != typeof window && "undefined" != typeof document) && !!window.msCrypto;
  var cc = {
    animateFill: !1,
    followCursor: !1,
    inlinePositioning: !1,
    sticky: !1
  }, fc = Object.assign({
    appendTo: Du,
    aria: {
      content: "auto",
      expanded: "auto"
    },
    delay: 0,
    duration: [ 300, 250 ],
    getReferenceClientRect: null,
    hideOnClick: !0,
    ignoreAttributes: !1,
    interactive: !1,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    moveTransition: "",
    offset: [ 0, 10 ],
    onAfterUpdate: function() {},
    onBeforeUpdate: function() {},
    onCreate: function() {},
    onDestroy: function() {},
    onHidden: function() {},
    onHide: function() {},
    onMount: function() {},
    onShow: function() {},
    onShown: function() {},
    onTrigger: function() {},
    onUntrigger: function() {},
    onClickOutside: function() {},
    placement: "top",
    plugins: [],
    popperOptions: {},
    render: null,
    showOnCreate: !1,
    touch: !0,
    trigger: "mouseenter focus",
    triggerTarget: null
  }, cc, {
    allowHTML: !1,
    animation: "fade",
    arrow: !0,
    content: "",
    inertia: !1,
    maxWidth: 350,
    role: "tooltip",
    theme: "",
    zIndex: 9999
  }), dc = Object.keys(fc);
  function pc(e) {
    var t = (e.plugins || []).reduce((function(t, n) {
      var r, a = n.name, i = n.defaultValue;
      a && (t[a] = void 0 !== e[a] ? e[a] : null != (r = fc[a]) ? r : i);
      return t;
    }), {});
    return Object.assign({}, e, t);
  }
  function hc(e, t) {
    var n = Object.assign({}, t, {
      content: $u(t.content, [ e ])
    }, t.ignoreAttributes ? {} : function(e, t) {
      return (t ? Object.keys(pc(Object.assign({}, fc, {
        plugins: t
      }))) : dc).reduce((function(t, n) {
        var r = (e.getAttribute("data-tippy-" + n) || "").trim();
        if (!r) return t;
        if ("content" === n) t[n] = r; else try {
          t[n] = JSON.parse(r);
        } catch (e) {
          t[n] = r;
        }
        return t;
      }), {});
    }(e, t.plugins));
    return n.aria = Object.assign({}, fc.aria, n.aria), n.aria = {
      expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
      content: "auto" === n.aria.content ? t.interactive ? null : "describedby" : n.aria.content
    }, n;
  }
  function mc(e, t) {
    e.innerHTML = t;
  }
  function gc(e) {
    var t = Ku();
    return !0 === e ? t.className = Pu : (t.className = Ru, Yu(e) ? t.appendChild(e) : mc(t, e)), 
    t;
  }
  function vc(e, t) {
    Yu(t.content) ? (mc(e, ""), e.appendChild(t.content)) : "function" != typeof t.content && (t.allowHTML ? mc(e, t.content) : e.textContent = t.content);
  }
  function yc(e) {
    var t = e.firstElementChild, n = qu(t.children);
    return {
      box: t,
      content: n.find((function(e) {
        return e.classList.contains(Lu);
      })),
      arrow: n.find((function(e) {
        return e.classList.contains(Pu) || e.classList.contains(Ru);
      })),
      backdrop: n.find((function(e) {
        return e.classList.contains(ju);
      }))
    };
  }
  function bc(e) {
    var t = Ku(), n = Ku();
    n.className = "tippy-box", n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
    var r = Ku();
    function a(n, r) {
      var a = yc(t), i = a.box, o = a.content, s = a.arrow;
      r.theme ? i.setAttribute("data-theme", r.theme) : i.removeAttribute("data-theme"), 
      "string" == typeof r.animation ? i.setAttribute("data-animation", r.animation) : i.removeAttribute("data-animation"), 
      r.inertia ? i.setAttribute("data-inertia", "") : i.removeAttribute("data-inertia"), 
      i.style.maxWidth = "number" == typeof r.maxWidth ? r.maxWidth + "px" : r.maxWidth, 
      r.role ? i.setAttribute("role", r.role) : i.removeAttribute("role"), n.content === r.content && n.allowHTML === r.allowHTML || vc(o, e.props), 
      r.arrow ? s ? n.arrow !== r.arrow && (i.removeChild(s), i.appendChild(gc(r.arrow))) : i.appendChild(gc(r.arrow)) : s && i.removeChild(s);
    }
    return r.className = Lu, r.setAttribute("data-state", "hidden"), vc(r, e.props), 
    t.appendChild(n), n.appendChild(r), a(e.props, e.props), {
      popper: t,
      onUpdate: a
    };
  }
  bc.$$tippy = !0;
  var wc = 1, xc = [], kc = [];
  function _c(e, t) {
    var n, r, a, i, o, s, l, u, c = hc(e, Object.assign({}, fc, pc(Zu(t)))), f = !1, d = !1, p = !1, h = !1, m = [], g = Bu(Z, c.interactiveDebounce), v = wc++, y = (u = c.plugins).filter((function(e, t) {
      return u.indexOf(e) === t;
    })), b = {
      id: v,
      reference: e,
      popper: Ku(),
      popperInstance: null,
      props: c,
      state: {
        isEnabled: !0,
        isVisible: !1,
        isDestroyed: !1,
        isMounted: !1,
        isShown: !1
      },
      plugins: y,
      clearDelayTimeouts: function() {
        clearTimeout(n), clearTimeout(r), cancelAnimationFrame(a);
      },
      setProps: function(t) {
        if (b.state.isDestroyed) return;
        L("onBeforeUpdate", [ b, t ]), V();
        var n = b.props, r = hc(e, Object.assign({}, n, Zu(t), {
          ignoreAttributes: !0
        }));
        b.props = r, U(), n.interactiveDebounce !== r.interactiveDebounce && (R(), g = Bu(Z, r.interactiveDebounce));
        n.triggerTarget && !r.triggerTarget ? Wu(n.triggerTarget).forEach((function(e) {
          e.removeAttribute("aria-expanded");
        })) : r.triggerTarget && e.removeAttribute("aria-expanded");
        P(), I(), k && k(n, r);
        b.popperInstance && (G(), J().forEach((function(e) {
          requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
        })));
        L("onAfterUpdate", [ b, t ]);
      },
      setContent: function(e) {
        b.setProps({
          content: e
        });
      },
      show: function() {
        var e = b.state.isVisible, t = b.state.isDestroyed, n = !b.state.isEnabled, r = ac.isTouch && !b.props.touch, a = Fu(b.props.duration, 0, fc.duration);
        if (e || t || n || r) return;
        if (T().hasAttribute("disabled")) return;
        if (L("onShow", [ b ], !1), !1 === b.props.onShow(b)) return;
        b.state.isVisible = !0, C() && (x.style.visibility = "visible");
        I(), H(), b.state.isMounted || (x.style.transition = "none");
        if (C()) {
          var i = N();
          Ju([ i.box, i.content ], 0);
        }
        s = function() {
          var e;
          if (b.state.isVisible && !h) {
            if (h = !0, x.offsetHeight, x.style.transition = b.props.moveTransition, C() && b.props.animation) {
              var t = N(), n = t.box, r = t.content;
              Ju([ n, r ], a), ec([ n, r ], "visible");
            }
            j(), P(), Uu(kc, b), null == (e = b.popperInstance) || e.forceUpdate(), L("onMount", [ b ]), 
            b.props.animation && C() && function(e, t) {
              B(e, t);
            }(a, (function() {
              b.state.isShown = !0, L("onShown", [ b ]);
            }));
          }
        }, function() {
          var e, t = b.props.appendTo, n = T();
          e = b.props.interactive && t === Du || "parent" === t ? n.parentNode : $u(t, [ n ]);
          e.contains(x) || e.appendChild(x);
          b.state.isMounted = !0, G();
        }();
      },
      hide: function() {
        var e = !b.state.isVisible, t = b.state.isDestroyed, n = !b.state.isEnabled, r = Fu(b.props.duration, 1, fc.duration);
        if (e || t || n) return;
        if (L("onHide", [ b ], !1), !1 === b.props.onHide(b)) return;
        b.state.isVisible = !1, b.state.isShown = !1, h = !1, f = !1, C() && (x.style.visibility = "hidden");
        if (R(), $(), I(!0), C()) {
          var a = N(), i = a.box, o = a.content;
          b.props.animation && (Ju([ i, o ], r), ec([ i, o ], "hidden"));
        }
        j(), P(), b.props.animation ? C() && function(e, t) {
          B(e, (function() {
            !b.state.isVisible && x.parentNode && x.parentNode.contains(x) && t();
          }));
        }(r, b.unmount) : b.unmount();
      },
      hideWithInteractivity: function(e) {
        O().addEventListener("mousemove", g), Uu(xc, g), g(e);
      },
      enable: function() {
        b.state.isEnabled = !0;
      },
      disable: function() {
        b.hide(), b.state.isEnabled = !1;
      },
      unmount: function() {
        b.state.isVisible && b.hide();
        if (!b.state.isMounted) return;
        X(), J().forEach((function(e) {
          e._tippy.unmount();
        })), x.parentNode && x.parentNode.removeChild(x);
        kc = kc.filter((function(e) {
          return e !== b;
        })), b.state.isMounted = !1, L("onHidden", [ b ]);
      },
      destroy: function() {
        if (b.state.isDestroyed) return;
        b.clearDelayTimeouts(), b.unmount(), V(), delete e._tippy, b.state.isDestroyed = !0, 
        L("onDestroy", [ b ]);
      }
    };
    if (!c.render) return b;
    var w = c.render(b), x = w.popper, k = w.onUpdate;
    x.setAttribute("data-tippy-root", ""), x.id = "tippy-" + b.id, b.popper = x, e._tippy = b, 
    x._tippy = b;
    var _ = y.map((function(e) {
      return e.fn(b);
    })), E = e.hasAttribute("aria-expanded");
    return U(), P(), I(), L("onCreate", [ b ]), c.showOnCreate && ee(), x.addEventListener("mouseenter", (function() {
      b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
    })), x.addEventListener("mouseleave", (function() {
      b.props.interactive && b.props.trigger.indexOf("mouseenter") >= 0 && O().addEventListener("mousemove", g);
    })), b;
    function S() {
      var e = b.props.touch;
      return Array.isArray(e) ? e : [ e, 0 ];
    }
    function A() {
      return "hold" === S()[0];
    }
    function C() {
      var e;
      return !(null == (e = b.props.render) || !e.$$tippy);
    }
    function T() {
      return l || e;
    }
    function O() {
      var e = T().parentNode;
      return e ? tc(e) : document;
    }
    function N() {
      return yc(x);
    }
    function M(e) {
      return b.state.isMounted && !b.state.isVisible || ac.isTouch || i && "focus" === i.type ? 0 : Fu(b.props.delay, e ? 0 : 1, fc.delay);
    }
    function I(e) {
      void 0 === e && (e = !1), x.style.pointerEvents = b.props.interactive && !e ? "" : "none", 
      x.style.zIndex = "" + b.props.zIndex;
    }
    function L(e, t, n) {
      var r;
      (void 0 === n && (n = !0), _.forEach((function(n) {
        n[e] && n[e].apply(n, t);
      })), n) && (r = b.props)[e].apply(r, t);
    }
    function j() {
      var t = b.props.aria;
      if (t.content) {
        var n = "aria-" + t.content, r = x.id;
        Wu(b.props.triggerTarget || e).forEach((function(e) {
          var t = e.getAttribute(n);
          if (b.state.isVisible) e.setAttribute(n, t ? t + " " + r : r); else {
            var a = t && t.replace(r, "").trim();
            a ? e.setAttribute(n, a) : e.removeAttribute(n);
          }
        }));
      }
    }
    function P() {
      !E && b.props.aria.expanded && Wu(b.props.triggerTarget || e).forEach((function(e) {
        b.props.interactive ? e.setAttribute("aria-expanded", b.state.isVisible && e === T() ? "true" : "false") : e.removeAttribute("aria-expanded");
      }));
    }
    function R() {
      O().removeEventListener("mousemove", g), xc = xc.filter((function(e) {
        return e !== g;
      }));
    }
    function z(t) {
      if (!ac.isTouch || !p && "mousedown" !== t.type) {
        var n = t.composedPath && t.composedPath()[0] || t.target;
        if (!b.props.interactive || !rc(x, n)) {
          if (Wu(b.props.triggerTarget || e).some((function(e) {
            return rc(e, n);
          }))) {
            if (ac.isTouch) return;
            if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0) return;
          } else L("onClickOutside", [ b, t ]);
          !0 === b.props.hideOnClick && (b.clearDelayTimeouts(), b.hide(), d = !0, setTimeout((function() {
            d = !1;
          })), b.state.isMounted || $());
        }
      }
    }
    function D() {
      p = !0;
    }
    function F() {
      p = !1;
    }
    function H() {
      var e = O();
      e.addEventListener("mousedown", z, !0), e.addEventListener("touchend", z, zu), e.addEventListener("touchstart", F, zu), 
      e.addEventListener("touchmove", D, zu);
    }
    function $() {
      var e = O();
      e.removeEventListener("mousedown", z, !0), e.removeEventListener("touchend", z, zu), 
      e.removeEventListener("touchstart", F, zu), e.removeEventListener("touchmove", D, zu);
    }
    function B(e, t) {
      var n = N().box;
      function r(e) {
        e.target === n && (nc(n, "remove", r), t());
      }
      if (0 === e) return t();
      nc(n, "remove", o), nc(n, "add", r), o = r;
    }
    function W(t, n, r) {
      void 0 === r && (r = !1), Wu(b.props.triggerTarget || e).forEach((function(e) {
        e.addEventListener(t, n, r), m.push({
          node: e,
          eventType: t,
          handler: n,
          options: r
        });
      }));
    }
    function U() {
      var e;
      A() && (W("touchstart", q, {
        passive: !0
      }), W("touchend", K, {
        passive: !0
      })), (e = b.props.trigger, e.split(/\s+/).filter(Boolean)).forEach((function(e) {
        if ("manual" !== e) switch (W(e, q), e) {
         case "mouseenter":
          W("mouseleave", K);
          break;

         case "focus":
          W(uc ? "focusout" : "blur", Y);
          break;

         case "focusin":
          W("focusout", Y);
        }
      }));
    }
    function V() {
      m.forEach((function(e) {
        var t = e.node, n = e.eventType, r = e.handler, a = e.options;
        t.removeEventListener(n, r, a);
      })), m = [];
    }
    function q(e) {
      var t, n = !1;
      if (b.state.isEnabled && !Q(e) && !d) {
        var r = "focus" === (null == (t = i) ? void 0 : t.type);
        i = e, l = e.currentTarget, P(), !b.state.isVisible && Qu(e) && xc.forEach((function(t) {
          return t(e);
        })), "click" === e.type && (b.props.trigger.indexOf("mouseenter") < 0 || f) && !1 !== b.props.hideOnClick && b.state.isVisible ? n = !0 : ee(e), 
        "click" === e.type && (f = !n), n && !r && te(e);
      }
    }
    function Z(e) {
      var t = e.target, n = T().contains(t) || x.contains(t);
      if ("mousemove" !== e.type || !n) {
        var r = J().concat(x).map((function(e) {
          var t, n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
          return n ? {
            popperRect: e.getBoundingClientRect(),
            popperState: n,
            props: c
          } : null;
        })).filter(Boolean);
        (function(e, t) {
          var n = t.clientX, r = t.clientY;
          return e.every((function(e) {
            var t = e.popperRect, a = e.popperState, i = e.props.interactiveBorder, o = Vu(a.placement), s = a.modifiersData.offset;
            if (!s) return !0;
            var l = "bottom" === o ? s.top.y : 0, u = "top" === o ? s.bottom.y : 0, c = "right" === o ? s.left.x : 0, f = "left" === o ? s.right.x : 0, d = t.top - r + l > i, p = r - t.bottom - u > i, h = t.left - n + c > i, m = n - t.right - f > i;
            return d || p || h || m;
          }));
        })(r, e) && (R(), te(e));
      }
    }
    function K(e) {
      Q(e) || b.props.trigger.indexOf("click") >= 0 && f || (b.props.interactive ? b.hideWithInteractivity(e) : te(e));
    }
    function Y(e) {
      b.props.trigger.indexOf("focusin") < 0 && e.target !== T() || b.props.interactive && e.relatedTarget && x.contains(e.relatedTarget) || te(e);
    }
    function Q(e) {
      return !!ac.isTouch && A() !== e.type.indexOf("touch") >= 0;
    }
    function G() {
      X();
      var t = b.props, n = t.popperOptions, r = t.placement, a = t.offset, i = t.getReferenceClientRect, o = t.moveTransition, l = C() ? yc(x).arrow : null, u = i ? {
        getBoundingClientRect: i,
        contextElement: i.contextElement || T()
      } : e, c = {
        name: "$$tippy",
        enabled: !0,
        phase: "beforeWrite",
        requires: [ "computeStyles" ],
        fn: function(e) {
          var t = e.state;
          if (C()) {
            var n = N().box;
            [ "placement", "reference-hidden", "escaped" ].forEach((function(e) {
              "placement" === e ? n.setAttribute("data-placement", t.placement) : t.attributes.popper["data-popper-" + e] ? n.setAttribute("data-" + e, "") : n.removeAttribute("data-" + e);
            })), t.attributes.popper = {};
          }
        }
      }, f = [ {
        name: "offset",
        options: {
          offset: a
        }
      }, {
        name: "preventOverflow",
        options: {
          padding: {
            top: 2,
            bottom: 2,
            left: 5,
            right: 5
          }
        }
      }, {
        name: "flip",
        options: {
          padding: 5
        }
      }, {
        name: "computeStyles",
        options: {
          adaptive: !o
        }
      }, c ];
      C() && l && f.push({
        name: "arrow",
        options: {
          element: l,
          padding: 3
        }
      }), f.push.apply(f, (null == n ? void 0 : n.modifiers) || []), b.popperInstance = Iu(u, x, Object.assign({}, n, {
        placement: r,
        onFirstUpdate: s,
        modifiers: f
      }));
    }
    function X() {
      b.popperInstance && (b.popperInstance.destroy(), b.popperInstance = null);
    }
    function J() {
      return qu(x.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      b.clearDelayTimeouts(), e && L("onTrigger", [ b, e ]), H();
      var t = M(!0), r = S(), a = r[0], i = r[1];
      ac.isTouch && "hold" === a && i && (t = i), t ? n = setTimeout((function() {
        b.show();
      }), t) : b.show();
    }
    function te(e) {
      if (b.clearDelayTimeouts(), L("onUntrigger", [ b, e ]), b.state.isVisible) {
        if (!(b.props.trigger.indexOf("mouseenter") >= 0 && b.props.trigger.indexOf("click") >= 0 && [ "mouseleave", "mousemove" ].indexOf(e.type) >= 0 && f)) {
          var t = M(!1);
          t ? r = setTimeout((function() {
            b.state.isVisible && b.hide();
          }), t) : a = requestAnimationFrame((function() {
            b.hide();
          }));
        }
      } else $();
    }
  }
  function Ec(e, t) {
    void 0 === t && (t = {});
    var n = fc.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", oc, zu), window.addEventListener("blur", lc);
    var r = Object.assign({}, t, {
      plugins: n
    }), a = Xu(e).reduce((function(e, t) {
      var n = t && _c(t, r);
      return n && e.push(n), e;
    }), []);
    return Yu(e) ? a[0] : a;
  }
  Ec.defaultProps = fc, Ec.setDefaultProps = function(e) {
    Object.keys(e).forEach((function(t) {
      fc[t] = e[t];
    }));
  }, Ec.currentInput = ac;
  Object.assign({}, ml, {
    effect: function(e) {
      var t = e.state, n = {
        popper: {
          position: t.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: {
          position: "absolute"
        },
        reference: {}
      };
      Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
    }
  });
  Ec.setDefaultProps({
    render: bc
  });
  var Sc = Ec;
  function Ac(e, t) {
    for (const [n, r] of Object.entries(t)) e.style.setProperty(n, r, "important");
  }
  function Cc(e, t, n = 3e3) {
    if (!e.hint) return;
    const r = document.createElement("div");
    r.className = "rango-tooltip";
    const {x: a, y: i, width: o, height: s} = e.hint.inner.getBoundingClientRect(), l = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, u = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    Ac(r, {
      width: `${o}px`,
      height: `${s}px`,
      position: "absolute",
      left: `${l + a}px`,
      top: `${u + i}px`
    }), r.dataset.tippyContent = t, document.body.append(r);
    const c = Sc(r, {
      zIndex: 2147483647,
      appendTo: r,
      maxWidth: "none",
      allowHTML: !0
    });
    function f(t) {
      (t.target instanceof Element || t.target instanceof Document) && t.target.contains(e.element) && d();
    }
    function d() {
      window.removeEventListener("scroll", f), clearTimeout(p), c.hide(), e.hint?.clearFlash(), 
      setTimeout((() => {
        r.remove();
      }), 500);
    }
    c.show(), e.hint.flash(n), window.addEventListener("scroll", f, {
      once: !0
    });
    const p = setTimeout((() => {
      d();
    }), n);
  }
  function Tc(e) {
    const t = [];
    for (const n of e) {
      const e = br(n.element) ? n.element.value : n.element.textContent;
      e ? (t.push(e), Cc(n, "Copied!", 1500)) : Cc(n, "No text content to copy", 1500);
    }
    return t.length > 0 ? t.join("\n") : void 0;
  }
  function Oc(e) {
    const t = [];
    for (const n of e) {
      let e;
      n.element instanceof HTMLAnchorElement ? (e = n.element.href, t.push(e), Cc(n, "Copied!", 1500)) : Cc(n, "Not a link", 1500);
    }
    return t.length > 0 ? t.join("\n") : void 0;
  }
  function Nc(e) {
    const t = [];
    for (const n of e) {
      let e, r;
      if (n.element instanceof HTMLAnchorElement) {
        e = n.element.href;
        r = `[${n.element.textContent ?? ""}](${e})`, t.push(r);
      }
      Cc(n, r ? "Copied!" : "Not a link", 1500);
    }
    return t.length > 0 ? t.join("\n") : void 0;
  }
  const Mc = new Map;
  function Ic(e, t) {
    const n = window.getComputedStyle(e).position, r = [];
    let a = e;
    for (;a; ) {
      const e = Mc.get(a);
      if (e) return e;
      const {position: i, overflowX: o, overflowY: s} = window.getComputedStyle(a), {scrollWidth: l, clientWidth: u, scrollHeight: c, clientHeight: f} = a;
      if ("fixed" === i) return a;
      if ("absolute" !== n || "static" !== i) if (a !== document.body || l !== document.documentElement.scrollWidth || c !== document.documentElement.scrollHeight) {
        if (a instanceof HTMLElement && ((!t || "horizontal" === t) && l > u && /scroll|auto/.test(o) || (!t || "vertical" === t) && c > f && /scroll|auto/.test(s))) {
          r.push(a);
          for (const e of r) Mc.set(e, a);
          return a;
        }
        r.push(a), a = a.parentElement;
      } else r.push(a), a = a.parentElement; else a = a.parentElement;
    }
    for (const e of r) Mc.set(e, document.documentElement);
    return document.documentElement;
  }
  let Lc, jc, Pc;
  function Rc() {
    const e = Hn("scrollBehavior");
    if ("auto" === e) {
      const e = window.matchMedia("(prefers-reduced-motion: reduce)");
      return !e || e.matches ? "instant" : "smooth";
    }
    return e;
  }
  function zc(e) {
    const t = window.innerHeight, n = window.innerWidth, {left: r, right: a, top: i, bottom: o} = e.getBoundingClientRect(), s = Math.max(0, r), l = Math.min(a, n), u = Math.max(0, i), c = Math.min(t, o), f = e === document.documentElement || e === document.body;
    return new DOMRect(f ? 0 : s, f ? 0 : u, f ? n : l - s, f ? t : c - u);
  }
  function Dc(e, t) {
    const {clientHeight: n, clientWidth: r, scrollHeight: a, scrollWidth: i} = e, {overflowX: o, overflowY: s} = window.getComputedStyle(e);
    if ("horizontal" === t && r !== i) {
      if (e === document.documentElement) return !0;
      if (e === document.body && document.documentElement.clientWidth === document.documentElement.scrollWidth) return !0;
      if (/scroll|auto/.test(o)) return !0;
    }
    if ("vertical" === t && n !== a) {
      if (e === document.documentElement) return !0;
      if (e === document.body && document.documentElement.clientHeight === document.documentElement.scrollHeight) return !0;
      if (/scroll|auto/.test(s)) return !0;
    }
    return !1;
  }
  function Fc(e) {
    return Dc(document.documentElement, e) ? document.documentElement : Dc(document.body, e) ? document.body : function(e) {
      const t = document.documentElement.clientWidth / 2, n = document.documentElement.clientHeight / 2;
      let r, a = document.elementFromPoint(t, n);
      for (;a; ) a instanceof HTMLElement && Dc(a, e) && (r = a), a = a.parentElement;
      return r;
    }(e);
  }
  function Hc(e, t) {
    const n = t.userScrollableContainer;
    if (!n) throw new Error("Couldn't find userScrollableContainer for element");
    const r = n.matches("body, html"), {top: a, bottom: i, height: o} = zc(n), s = a + o / 2, {top: l, bottom: u, height: c} = t.element.getBoundingClientRect();
    let f = 0;
    "top" === e && (f = r ? l : l - a), "center" === e && (f = l + c / 2 - s), "bottom" === e && (f = r ? -(o - u) : -(i - u));
    let d = 0;
    if ("top" === e) {
      const {x: e, y: r} = t.element.getBoundingClientRect(), a = document.elementsFromPoint(e + 5, r - f + 5);
      for (const e of a) {
        if (e === t.element || e.contains(t.element)) break;
        const {position: n, display: r, visibility: a, opacity: i} = window.getComputedStyle(e);
        if ("none" !== r && "hidden" !== a && "0" !== i && ("sticky" === n || "fixed" === n)) {
          d = e.getBoundingClientRect().height;
          break;
        }
      }
      (n === document.documentElement ? window : n).addEventListener("scrollend", (() => {
        const {x: e, y: r, top: a} = t.element.getBoundingClientRect(), i = document.elementsFromPoint(e + 5, r + 5);
        for (const e of i) {
          if (e === t.element || e.contains(t.element)) break;
          const {position: r, display: i, visibility: o, opacity: s} = window.getComputedStyle(e);
          if ("none" !== i && "hidden" !== o && "0" !== s && ("sticky" === r || "fixed" === r)) {
            const t = e.getBoundingClientRect().bottom;
            n.scrollBy({
              left: 0,
              top: a - t,
              behavior: Rc()
            });
            break;
          }
        }
      }), {
        once: !0
      });
    }
    n.scrollBy({
      left: 0,
      top: f - d,
      behavior: Rc()
    });
  }
  function $c(e) {
    const {dir: t, target: n} = e;
    let r, a = e.factor;
    const i = "left" === t || "right" === t ? "horizontal" : "vertical";
    if (!("repeatLast" !== n || Lc && jc)) throw new Error("Unable to repeat the last scroll");
    if ("string" != typeof n && (r = Ic(n.element, i), !r)) throw new Error("Couldn't find userScrollableContainer for element");
    if ("repeatLast" === n && (r = Lc, a = jc), "page" === n && (r = Fc(i)), "leftAside" === n && (r = function() {
      const e = [ ...document.querySelectorAll("*") ].filter(xr).filter((e => Dc(e, "vertical") && e.matches(":not(html, body)")));
      let t, n;
      for (const r of e) {
        if (r.querySelectorAll("*").length < 5) continue;
        const {right: e} = r.getBoundingClientRect();
        (void 0 === n || e < n) && (t = r, n = e);
      }
      return t;
    }()), "rightAside" === n && (r = function() {
      const e = [ ...document.querySelectorAll("*") ].filter(xr).filter((e => e instanceof HTMLElement && Dc(e, "vertical") && e.matches(":not(html, body)")));
      let t, n;
      for (const r of e) {
        if (r.querySelectorAll("*").length < 5) continue;
        const {left: e} = r.getBoundingClientRect();
        (void 0 === n || e > n) && (t = r, n = e);
      }
      return t;
    }()), !r) throw new Error("No element found to scroll");
    const o = zc(r), {width: s, height: l} = o;
    let u = 0, c = 0;
    a ??= .66, Lc = r, jc = a, "up" === t && (c = -l * a), "down" === t && (c = l * a), 
    "left" === t && (u = -s * a), "right" === t && (u = s * a), r.scrollBy({
      left: u,
      top: c,
      behavior: Rc()
    });
  }
  async function Bc(e) {
    Wc();
    for (const t of e) t.hover();
  }
  function Wc() {
    for (const e of Zn()) e.unhover();
  }
  function Uc(e) {
    for (const t of e) {
      const e = t.element;
      let n = "", r = "";
      if (e instanceof HTMLElement) if (e.title) r = e.title; else {
        const t = e.querySelector("[title");
        t instanceof HTMLElement && t.title && (r = t.title);
      }
      n = e instanceof HTMLAnchorElement ? r ? `<div><strong>${r}</strong></div><div>${e.href}</div>` : `<div>${e.href}</div>` : r, 
      n ? Cc(t, n, 5e3) : t.hint?.flash();
    }
  }
  function Vc(e) {
    const t = new Set([ "INPUT", "TEXTAREA", "title" ]);
    return vr(e.parentElement), !t.has(e.parentElement.tagName);
  }
  function qc(e) {
    const t = document.createRange();
    return t.setStart(e, 0), t.setEnd(e, e.length), t.getBoundingClientRect();
  }
  function Zc(e) {
    if (e.textContent && /\S/.test(e.textContent)) for (const t of e.childNodes) {
      if (vr(t.textContent), t instanceof Text && Vc(t) && /\S/.test(t.textContent)) {
        const e = qc(t);
        if (e.y + e.height > -500 && e.x + e.width > -500) return t;
      }
      if (t instanceof Element && /\S/.test(t.textContent)) {
        if (Qn(t)?.isHintable) continue;
        return Zc(t);
      }
    }
  }
  function Kc(e) {
    if (e instanceof Text) return e;
    for (let t = e.childNodes.length - 1; t >= 0; t--) {
      const n = Kc(e.childNodes[t]);
      if (n) return n;
    }
  }
  function Yc(e) {
    if (e instanceof Text) return e;
    for (const t of e.childNodes) {
      const e = Yc(t);
      if (e) return e;
    }
  }
  function Qc(e, t) {
    if (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) {
      const n = t ? 0 : e.value.length;
      e.setSelectionRange(n, n);
    } else {
      const n = t ? Yc(e) : Kc(e), r = n ? n.parentElement : e, a = document.createRange();
      a.selectNodeContents(r), a.collapse(t);
      const i = window.getSelection();
      vr(i), i.removeAllRanges(), i.addRange(a);
    }
  }
  async function Gc(e) {
    const t = await il(e);
    t && Qc(t.element, !0);
  }
  async function Xc(e) {
    const t = await il(e);
    t && Qc(t.element, !1);
  }
  async function Jc(e, t) {
    for (const n of e) n.hint?.flash(), br(n.element) ? n.element.value = t : "true" === n.element.getAttribute("contenteditable") && (n.element.textContent = t);
    const n = e[e.length - 1];
    await Xc(n), n.element instanceof HTMLElement && n.element.focus();
  }
  function ef(e) {
    if (e.element instanceof HTMLInputElement || e.element instanceof HTMLTextAreaElement) return e.element.select(), 
    e.element.focus(), [ {
      name: "editDelete"
    } ];
    if (e.element instanceof HTMLElement && or(e.element) && (e.click(), e.element.textContent)) {
      const t = document.createRange();
      t.selectNodeContents(e.element);
      const n = window.getSelection();
      return n?.removeAllRanges(), n?.addRange(t), [ {
        name: "sleep"
      }, {
        name: "editDelete",
        main: !0,
        previousName: "editDeleteAfterDelay"
      } ];
    }
  }
  function tf(e) {
    const {x: t, y: n, width: r, height: a} = e.getBoundingClientRect();
    return {
      x: t + r / 2,
      y: n + a / 2
    };
  }
  function nf(e, t, n) {
    return new MouseEvent(e, {
      view: window,
      clientX: t,
      clientY: n,
      composed: !0,
      button: 0,
      buttons: 0,
      bubbles: !0,
      cancelable: !0
    });
  }
  function rf(e, t, n) {
    return new PointerEvent(e, {
      pointerId: 1,
      isPrimary: !0,
      pointerType: "mouse",
      view: window,
      clientX: t,
      clientY: n,
      composed: !0,
      button: -1,
      buttons: 0,
      bubbles: !0,
      cancelable: !0
    });
  }
  function af(e) {
    let t = !1;
    Pc && sf(Pc);
    const {x: n, y: r} = tf(e);
    e.dispatchEvent(rf("pointerdown", n, r)), e.dispatchEvent(nf("mousedown", n, r));
    const a = cr(e);
    if (a instanceof HTMLElement && a.focus({
      focusVisible: or(a)
    }), e instanceof HTMLElement && or(e)) {
      window.focus();
      const n = window.getSelection();
      n && !e.contains(n.anchorNode) && Qc(e, !0), document.hasFocus() || (t = !0);
    }
    return e.dispatchEvent(rf("pointerup", n, r)), e.dispatchEvent(nf("mouseup", n, r)), 
    e.dispatchEvent(nf("click", n, r)), Pc = e, t;
  }
  function of(e) {
    const {x: t, y: n} = tf(e);
    e.dispatchEvent(rf("pointerover", t, n)), e.dispatchEvent(rf("pointerenter", t, n)), 
    e.dispatchEvent(rf("pointermove", t, n)), e.dispatchEvent(nf("mouseover", t, n)), 
    e.dispatchEvent(nf("mouseenter", t, n)), e.dispatchEvent(nf("mousemove", t, n));
  }
  function sf(e) {
    const {x: t, y: n} = tf(e);
    e.dispatchEvent(rf("pointermove", t, n)), e.dispatchEvent(nf("mousemove", t, n)), 
    e.dispatchEvent(rf("pointerout", t, n)), e.dispatchEvent(rf("pointerleave", t, n)), 
    e.dispatchEvent(nf("mouseout", t, n)), e.dispatchEvent(nf("mouseleave", t, n));
  }
  function lf(e, t) {
    const n = new KeyboardEvent("keydown", {
      view: window,
      code: t,
      key: t,
      composed: !0,
      bubbles: !0,
      cancelable: !0
    });
    e.dispatchEvent(n);
  }
  function uf(e, t) {
    const n = new KeyboardEvent("keyup", {
      view: window,
      code: t,
      key: t,
      composed: !0,
      bubbles: !0,
      cancelable: !0
    });
    e.dispatchEvent(n);
  }
  var cf = i("jLEOZ");
  o = i("dBVaG"), o = i("dBVaG");
  function ff(e) {
    try {
      const t = new URL(e);
      return t.protocol.includes("http") ? `https?://${t.host}/*` : t.href;
    } catch {
      return e;
    }
  }
  var df;
  function pf(e) {
    var t = {}, n = e.length - 1, r = e[0], a = e[n];
    for (var i in r) t[r[i]] = 0;
    for (i = 1; i <= n; i++) {
      var o = e[i];
      for (var s in o) {
        t[u = o[s]] === i - 1 && (t[u] = i);
      }
    }
    var l = [];
    for (var i in a) {
      var u;
      t[u = a[i]] === n && l.push(u);
    }
    return l;
  }
  function hf(e, t) {
    if (!t) return pf(e);
    for (var n = [], r = 0; r < e.length; r++) mf(t, e[r]) > -1 && n.push(e[r]);
    return n;
  }
  function mf(e, t) {
    for (var n = 0; n < e.length; n++) if (e[n] === t) return n;
    return -1;
  }
  df = hf, hf.big = function(e, t) {
    if (!t) return pf(e);
    for (var n = [], r = {}, a = 0; a < t.length; a++) r[t[a]] = !0;
    for (a = 0; a < e.length; a++) r[e[a]] && n.push(e[a]);
    return n;
  };
  var gf;
  function vf(e) {
    if (!e) return [];
    if (!Array.isArray(e)) return [];
    if (0 === e.length) return [];
    for (const t of e) if (!Array.isArray(t) || 0 === t.length) return [];
    const t = e.length, n = Array.from({
      length: t
    });
    n.fill(0);
    const r = [];
    let a = yf(n, e);
    for (r.push(a); bf(n, e); ) a = yf(n, e), r.push(a);
    return r;
  }
  function yf(e, t) {
    const n = [];
    for (const [r, a] of e.entries()) n.push(t[r][a]);
    return n;
  }
  function bf(e, t) {
    for (let n = e.length - 1; n >= 0; n--) {
      const r = t[n].length - 1;
      if (e[n] + 1 <= r) return e[n]++, !0;
      if (n - 1 < 0) return !1;
      e[n] = 0;
    }
    return !1;
  }
  function wf(e, t = 7) {
    const r = [];
    let a = 0;
    for (const n of [ ...e ].reverse()) {
      const e = wn(n)[0].parts.map((e => e.selector));
      if (1 === e.length) r.unshift(e[0]); else {
        let n = "";
        for (const r of e) /^[.:]/.test(r) && a < t && (a++, n += r);
        n && (n = e[0] + n, r.unshift(n));
      }
    }
    const i = r.pop(), o = n(gf)(r);
    for (const e of o) e.push(i);
    o.unshift([ i ]);
    const s = [];
    for (const e of o) {
      const t = [];
      for (const [r, a] of e.entries()) {
        const i = wn(a)[0].parts.map((e => e.selector));
        let o;
        if (r === e.length - 1) o = n(gf)(i).map((e => e.join(""))); else {
          const e = i.shift();
          o = n(gf)(i).map((t => `${e}${t.join("")}`));
        }
        t.push(o);
      }
      const r = vf(t).map((e => e.join(" ")));
      s.push(...r);
    }
    return s;
  }
  function xf(e) {
    if (e.parentElement) for (const [t, n] of [ ...e.parentElement.children ].entries()) if (n === e) return t + 1;
  }
  function kf(e) {
    let t = e.tagName.toLowerCase();
    if (e.id && !/[.:]/.test(e.id) && _n(`#${e.id}`) && (t += `#${e.id}`), e.classList.length > 0) {
      const n = `.${[ ...e.classList ].join(".")}`;
      _n(n) && (t += n);
    }
    return t;
  }
  function _f(e) {
    const t = e.parentElement?.closest(":is([class], [id]):not([class=''], [id='']), ul, ol, nav, header, footer, main, aside, article, section");
    return t ?? void 0;
  }
  function Ef(e) {
    const t = e.map((e => function(e) {
      const t = [];
      let n = e;
      for (;n; ) {
        const e = kf(n);
        e && t.unshift(e), n = _f(n);
      }
      return [ ...new Set(t) ];
    }(e))), r = new Set;
    for (const e of t) {
      const t = e[e.length - 1];
      t && r.add(t);
    }
    let a;
    for (const e of r) {
      const t = En(e);
      a = a ? n(df)(a, t) : t;
    }
    if (!a) return [];
    let i = a.join("");
    const o = e[0] ? xf(e[0]) : void 0;
    o && [ ...e ].every((e => xf(e) === o)) && (i += `:nth-child(${o})`);
    for (const e of t) e[e.length - 1] = i;
    return n(df)(t);
  }
  function Sf(e) {
    const t = Ef(e);
    if (0 === t.length) return [];
    const n = wf(t), r = [];
    for (const e of n) {
      let t = 0;
      try {
        t = document.querySelectorAll(e).length;
      } catch (e) {
        e instanceof DOMException && (t = 0);
      }
      t || (t = Wn(document.body, !1, e).length);
      const n = kn(e), a = r.find((e => e.elementsMatching === t));
      a ? n <= a.specificity && (a.selector = e, a.specificity = n) : r.push({
        selector: e,
        specificity: n,
        elementsMatching: t
      });
    }
    return r.sort(((e, t) => e.elementsMatching > t.elementsMatching ? 1 : e.elementsMatching < t.elementsMatching ? -1 : 0));
  }
  gf = function(e, t, n) {
    t = t || 1, n = n < e.length ? n : e.length;
    for (var r = function(e, t, n, a) {
      if (0 != e) for (var i = 0; i < t.length; i++) r(e - 1, t.slice(i + 1), n.concat([ t[i] ]), a); else n.length > 0 && (a[a.length] = n);
    }, a = [], i = t; i < e.length; i++) r(i, e, [], a);
    return e.length == n && a.push(e), a;
  };
  const Af = "button, a, input, summary, textarea, select, label, [role='button'], [role='link'], [role='treeitem'], [role='tab'], [role='option'], [role='radio'], [role='checkbox'], [role='menuitem'], [role='menuitemradio'], [role='menuitemcheckbox'], [contenteditable='true'], [contenteditable='']", Cf = `:is(${Af}):not([aria-hidden='true'], .Toastify__close-button)`, Tf = `:is(${Af}, [aria-hidden='true'], div, span, i, li, td, p, h1, h2, h3, h4, h5, h6):not(#rango-toast *)`;
  let Of = "", Nf = "";
  async function Mf() {
    const e = await Pn("customSelectors");
    e || await Mn("customSelectors", []);
    const t = [], n = [];
    for (const {pattern: r, type: a, selector: i} of e.values()) {
      new RegExp(r).test(window.location.href) && ("include" === a ? t.push(i) : n.push(i));
    }
    Of = t.join(", "), Nf = n.join(", ");
  }
  function If(e) {
    return Of && e.matches(Of);
  }
  function Lf(e) {
    return Nf && e.matches(Nf);
  }
  function jf(e) {
    return e.matches(Cf);
  }
  function Pf(e) {
    return e.matches(Tf);
  }
  let Rf, zf = [], Df = [], Ff = [], Hf = -1;
  async function $f(e, t) {
    const n = e.map((e => e.element));
    Ff = Sf(n);
    return Bf({
      mode: t
    });
  }
  function Bf(e) {
    const t = new Set;
    e.step || (Hf = -1);
    const n = e.mode ?? Rf;
    Rf = n;
    const r = e.step ?? 1, a = Hf + r;
    let i;
    if (Hf = a, a > Ff.length - 1) return void Hf--;
    if (void 0 !== e.step && (i = "include" === n ? zf.pop() : Df.pop()), i && t.add(i), 
    a < 0) return Hf = -1, [ ...t ];
    const o = Ff[a].selector;
    return "include" === n ? zf.push(o) : Df.push(o), t.add(o), [ ...t ];
  }
  async function Wf() {
    const e = ff(window.location.href), t = [];
    for (const n of zf) t.push({
      pattern: e,
      type: "include",
      selector: n
    });
    for (const n of Df) t.push({
      pattern: e,
      type: "exclude",
      selector: n
    });
    return await n(o).runtime.sendMessage({
      type: "storeCustomSelectors",
      url: window.location.href,
      selectors: t
    }), zf = [], Df = [], await Mf(), t;
  }
  async function Uf() {
    zf = [], Df = [], Ff = [], Hf = -1;
  }
  function Vf(e, t) {
    const n = t ? zf : Df;
    for (const t of n) if (e.matches(t)) return !0;
    return !1;
  }
  cf = i("jLEOZ");
  const qf = new Set;
  function Zf(e) {
    for (const t of e) qf.add(t);
  }
  function Kf(e) {
    for (const t of e) qf.delete(t);
  }
  function Yf() {
    qf.clear();
  }
  o = i("dBVaG");
  const Qf = new w;
  async function Gf() {
    return Qf.runExclusive((async () => (Yf(), n(o).runtime.sendMessage({
      type: "initStack"
    }))));
  }
  async function Xf() {
    await Qf.runExclusive((async () => {
      const e = [ ...qf ];
      e.length > 0 && await n(o).runtime.sendMessage({
        type: "storeHintsInFrame",
        hints: e
      });
    }));
  }
  async function Jf(e) {
    return Qf.runExclusive((async () => {
      const t = await n(o).runtime.sendMessage({
        type: "claimHints",
        amount: e
      });
      return Zf(t), t;
    }));
  }
  async function ed(e) {
    return Qf.runExclusive((async () => {
      const t = await n(o).runtime.sendMessage({
        type: "reclaimHintsFromOtherFrames",
        amount: e
      });
      return Zf(t), t;
    }));
  }
  async function td(e) {
    await Qf.runExclusive((async () => {
      Kf(e), await n(o).runtime.sendMessage({
        type: "releaseHints",
        hints: e
      });
    }));
  }
  let nd = [], rd = [], ad = [];
  async function id(e, t) {
    const n = e + t - ad.length;
    if (ad.length > 0 && sd(ad.splice(0, ad.length)), n > 0) {
      const t = Math.min(n, e), r = await Jf(n);
      if (r.length < t && r.push(...er(e - r.length)), r.length < t) {
        sd(await ed(e - r.length));
      }
      sd(r, e);
    } else await td(nd.splice(0, -n));
  }
  function od() {
    let e = nd.pop() ?? rd.pop();
    return e || ([e] = er(1)), e;
  }
  function sd(e, t) {
    const n = [ ...e ], r = t ? n.splice(-t, t) : n.splice(0, e.length);
    nd.push(...r), rd.push(...n), nd.sort(((e, t) => t.length - e.length || t.localeCompare(e))), 
    rd.sort(((e, t) => t.length - e.length || t.localeCompare(e)));
  }
  async function ld() {
    nd = [], rd = [], ad = [], Yf(), h() && await Gf();
  }
  let ud = {
    filterIn: []
  };
  const cd = (0, cf.debounce)((async () => {
    const {hintsStyle: e, hintsColors: t, hintsPosition: n, hintsCharacters: r, isHintable: a, shouldBeHinted: i} = ud, o = function(e) {
      const {hintsCharacters: t, isHintable: n, shouldBeHinted: r} = e, a = n || r ? qn() : Zn(), {filterIn: i} = ud;
      return i?.length ? a.filter((e => e.element.matches(i.join(", ")) || t && e.hint?.string)) : a;
    }(ud);
    r && await async function() {
      const e = Zn();
      for (const t of e) t.hint?.release();
      const t = e.filter((e => e.isIntersectingViewport)).length, n = e.filter((e => e.isIntersecting && !e.isIntersectingViewport)).length;
      await ld(), await id(t, n);
      for (const t of e) t.hint?.claim();
    }();
    for (const s of o) a ? s.updateIsHintable() : i && s.updateShouldBeHinted(), e && s.hint?.applyDefaultStyle(), 
    t && s.hint?.updateColors(), s.hint?.isActive && n && !r && s.hint?.position();
    ud = {
      filterIn: []
    };
  }), 100);
  async function fd(e) {
    e ??= {
      isHintable: !0
    }, 0 === Object.keys(e).filter((e => "filterIn" !== e)).length && (e.isHintable = !0), 
    ud = function(e, t) {
      const n = {
        ...e
      };
      let r;
      for (r in t) if (Object.prototype.hasOwnProperty.call(t, r)) if ("filterIn" === r) {
        if (!e.filterIn) continue;
        n.filterIn = [ ...e.filterIn, ...t.filterIn ?? [] ];
      } else n[r] ||= Boolean(t[r]);
      return t.filterIn || (n.filterIn = void 0), n;
    }(ud, e), await cd();
  }
  let dd = !1, pd = !1;
  function hd() {
    return dd;
  }
  async function md(e) {
    void 0 !== e.extra && (dd = e.extra), void 0 !== e.excluded && (pd = e.excluded);
    let t = Tf;
    Nf && (t = `${t}, ${Nf}`), await fd({
      hintsColors: !0,
      isHintable: !0,
      filterIn: [ t ]
    });
  }
  async function gd(e) {
    const t = await $f(e, "include");
    await fd({
      hintsColors: !0,
      isHintable: !0,
      filterIn: t
    });
  }
  async function vd(e) {
    const t = await $f(e, "exclude");
    await fd({
      hintsColors: !0,
      isHintable: !0,
      filterIn: t
    });
  }
  async function yd() {
    Df = [ "*" ], await fd({
      hintsColors: !0
    });
  }
  async function bd() {
    const e = Bf({
      step: 1
    });
    e && await fd({
      hintsColors: !0,
      isHintable: !0,
      filterIn: e
    });
  }
  async function wd() {
    const e = Bf({
      step: -1
    });
    e && await fd({
      hintsColors: !0,
      isHintable: !0,
      filterIn: e
    });
  }
  async function xd() {
    const e = await Wf();
    e.length > 0 && await fd({
      hintsStyle: !0,
      isHintable: !0,
      filterIn: e.map((({selector: e}) => e))
    }), await md({
      extra: !1,
      excluded: !1
    });
  }
  async function kd() {
    dd = !1, pd = !1, await n(o).runtime.sendMessage({
      type: "resetCustomSelectors",
      url: window.location.href
    }), await Mf(), await Uf(), await fd();
  }
  cf = i("jLEOZ");
  function _d(e, t) {
    const {r: r, g: a, b: i} = e.object(), o = e.object().alpha ?? 1;
    vr(r), vr(a), vr(i), vr(o);
    const [s, l, u] = t.array();
    return vr(s), vr(l), vr(u), new (n(Pt))({
      r: Math.round((1 - o) * s + o * r),
      g: Math.round((1 - o) * l + o * a),
      b: Math.round((1 - o) * u + o * i)
    });
  }
  function Ed(e, t) {
    const [n, r, a, i] = e.replace(/[^\d.\s,]/g, "").split(",").map((e => Number.parseFloat(e))), [o, s, l] = t.replace(/[^\d.\s,]/g, "").split(",").map((e => Number.parseFloat(e)));
    return `rgb(${Math.round((1 - i) * o + i * n)}, ${Math.round((1 - i) * s + i * r)}, ${Math.round((1 - i) * l + i * a)})`;
  }
  function Sd(e) {
    return !e.startsWith("rgba");
  }
  function Ad(e) {
    let t = e.parentElement;
    for (;t; ) {
      const {backgroundColor: e} = window.getComputedStyle(t);
      if (Sd(e)) return e;
      t = t.parentElement;
    }
    return "rgb(255, 255, 255)";
  }
  function Cd(e) {
    let t = e;
    for (;t; ) {
      let {backgroundColor: e} = window.getComputedStyle(t);
      if (e.startsWith("rgb") || (e = "rgb(255, 255, 255)"), e && "rgba(0, 0, 0, 0)" !== e) return Sd(e) ? e : Ed(e, Ad(t));
      t = t.parentElement;
    }
    return "rgb(255, 255, 255)";
  }
  const Td = /\b(?:position|zIndex|opacity|mixBlendMode|transform|filter|backdrop-filter|perspective|clip-path|mask|mask-image|mask-border|isolation)\b/;
  function Od(e) {
    if (e === document.documentElement) return !0;
    const t = getComputedStyle(e);
    return !("auto" === t.zIndex || "static" === t.position && !function(e) {
      const t = e.parentNode instanceof Element && getComputedStyle(e.parentNode).display;
      return "flex" === t || "inline-flex" === t || "-webkit-box" === t || "-webkit-flex" === t || "-ms-flexbox" === t || "grid" === t || "inline-grid" === t;
    }(e)) || ("fixed" === t.position || "sticky" === t.position || (Number(t.opacity) < 1 || ("mixBlendMode" in t && "normal" !== t.mixBlendMode || ("transform" in t && "none" !== t.transform || ("filter" in t && "none" !== t.filter || ("backdrop-filter" in t && "none" !== t.filter || ("perspective" in t && "none" !== t.filter || ("clip-path" in t && "none" !== t.filter || ("mask" in t && "none" !== t.filter || ("mask-image" in t && "none" !== t.filter || ("mask-border" in t && "none" !== t.filter || ("isolation" in t && "isolate" === t.isolation || !!Td.test(t.willChange)))))))))))));
  }
  const Nd = new Map, Md = new Map, Id = new Map, Ld = new Map, jd = new Map, Pd = new Map;
  function Rd() {
    Nd.clear(), Md.clear(), Id.clear(), Ld.clear(), jd.clear(), Pd.clear();
  }
  function zd(e) {
    const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    for (;t.length < 2 && n.nextNode(); ) n.currentNode instanceof Text && n.currentNode.parentElement?.matches(":not(.rango-hint, script, style)") && n.currentNode.textContent && /\S/.test(n.currentNode.textContent) && t.push(n.currentNode);
    return t;
  }
  function Dd(e) {
    const t = document.createRange();
    return t.setStart(e, 0), t.setEnd(e, e.length), t.getBoundingClientRect();
  }
  function Fd(e) {
    if (!e.textContent) return new DOMRect(0, 0, 0, 0);
    const t = e.textContent?.search(/\S/) ?? 0, n = [ ...e.textContent ][t], r = n ? n.length : 0, a = document.createRange();
    a.setStart(e, t), a.setEnd(e, t + r);
    return a.getBoundingClientRect();
  }
  function Hd(e, t = !0) {
    const n = function(e) {
      return !(!e[0] || !("isHintable" in e[0]));
    }(e) ? e.map((e => e.element)) : e, r = new Set, a = new Map;
    for (const e of n) e instanceof Element && t && a.set(e, zd(e));
    for (const e of n) {
      if (e instanceof Element && t) {
        const t = a.get(e);
        if (!t) continue;
        for (const e of t) Id.set(e, Fd(e)), Ld.set(e, Dd(e));
      }
      const n = e instanceof Element ? e.querySelectorAll("*") : [];
      for (const e of n) r.add(e);
      let i = e instanceof Element ? e : null, o = 0;
      for (;i && o < 10 && !r.has(i); ) r.add(i), i = i.parentElement, o++;
    }
    for (const e of r) {
      Nd.set(e, e.getBoundingClientRect());
      const {clientWidth: t, scrollWidth: n, clientHeight: r, scrollHeight: a} = e;
      jd.set(e, {
        clientWidth: t,
        scrollWidth: n,
        clientHeight: r,
        scrollHeight: a,
        offsetWidth: e instanceof HTMLElement ? e.offsetWidth : void 0,
        offsetHeight: e instanceof HTMLElement ? e.offsetHeight : void 0
      }), Pd.set(e, window.getComputedStyle(e)), e instanceof HTMLElement && Md.set(e, e.offsetParent);
    }
  }
  function $d(e) {
    return Nd.get(e) ?? e.getBoundingClientRect();
  }
  function Bd(e) {
    return Id.get(e) ?? Fd(e);
  }
  function Wd(e) {
    const {clientWidth: t, scrollWidth: n, clientHeight: r, scrollHeight: a} = jd.get(e) ?? e;
    return {
      clientWidth: t,
      scrollWidth: n,
      clientHeight: r,
      scrollHeight: a,
      offsetWidth: e instanceof HTMLElement ? jd.get(e)?.offsetWidth ?? e.offsetWidth : void 0,
      offsetHeight: e instanceof HTMLElement ? jd.get(e)?.offsetHeight ?? e.offsetHeight : void 0
    };
  }
  function Ud(e) {
    return Pd.get(e) ?? window.getComputedStyle(e);
  }
  function Vd(e, t) {
    const n = $d(e), r = $d(t), a = 100;
    return 0 !== n.width && 0 !== n.height && 0 !== r.width && 0 !== r.height && !(n.right + a < r.left || r.right + a < n.left || n.bottom + a < r.top || r.bottom + a < n.top);
  }
  function qd(e) {
    if (e.textContent && /\S/.test(e.textContent)) {
      const t = Bd(e);
      return 0 !== t.width && 0 !== t.height;
    }
    return !1;
  }
  function Zd(e) {
    const {textIndent: t} = Ud(e), n = Number.parseInt(t, 10);
    return !(Math.abs(n) > 100) && (("string" != typeof e.className || !e.className.includes("hidden")) && [ ...e.childNodes ].some((e => e instanceof Text && qd(e))));
  }
  function Kd(e) {
    const t = e instanceof HTMLImageElement || e instanceof SVGSVGElement, {backgroundImage: n, maskImage: r} = Ud(e), a = 0 === e.childNodes.length && ("none" !== n || Boolean(r) && "none" !== r), {content: i} = window.getComputedStyle(e, ":before"), o = "I" === e.tagName && "none" !== i && "normal" !== i;
    return t || a || o;
  }
  function Yd(e, t) {
    let n = e;
    for (;n && n !== t; ) {
      if (Qn(n)?.isHintable) return !0;
      n = n.parentElement;
    }
    return !1;
  }
  function Qd(e) {
    const t = Wn(e, !0).filter((e => !(e.matches(".rango-hint") || e instanceof SVGElement && !(e instanceof SVGSVGElement))));
    let n, r;
    for (const a of t) {
      const {opacity: t} = Ud(a);
      "0" !== t && !Yd(a, e) && Vd(e, a) && (Kd(a) && (r ??= a), !n && Zd(a) && (n = a));
    }
    const a = n ? function(e) {
      const t = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
      let n = t.nextNode();
      for (;n; ) {
        if (qd(n) && Vd(e, n.parentElement)) return n;
        n = t.nextNode();
      }
    }(n) : void 0;
    return r && a ? 4 === r.compareDocumentPosition(a) ? r : a : r ?? a;
  }
  function Gd(e) {
    if (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement || e instanceof HTMLOptionElement) return e;
    const t = Qd(e) ?? e;
    if (e instanceof HTMLElement && e.isContentEditable) {
      const n = sr(t);
      if (n && !n.isContentEditable) return e;
    }
    return t;
  }
  function Xd(e) {
    const {clientWidth: t, scrollWidth: n, clientHeight: r, scrollHeight: a} = Wd(e), {overflowX: i, overflowY: o} = Ud(e);
    return e === document.documentElement || n > t && /scroll|auto/.test(i) || a > r && /scroll|auto/.test(o);
  }
  function Jd(e, t) {
    const n = t instanceof Text ? Bd(t) : $d(t), r = e instanceof HTMLElement ? e : e.host, a = $d(r), i = n.left - a.left, o = n.top - a.top, s = function(e) {
      const {borderLeftWidth: t, borderRightWidth: n, borderTopWidth: r, borderBottomWidth: a} = Ud(e), i = Number.parseInt(t, 10), o = Number.parseInt(n, 10), s = Number.parseInt(r, 10), l = Number.parseInt(a, 10), {x: u, y: c, width: f, height: d} = $d(e);
      return new DOMRect(u + i, c + s, f - i - o, d - s - l);
    }(r), l = n.left - s.left, u = n.top - s.top, {position: c, overflow: f, clipPath: d, contentVisibility: p, left: h, top: m} = Ud(r);
    if (Xd(r)) return {
      left: Math.max(r.scrollLeft + l, 0),
      top: Math.max(r.scrollTop + u, 0)
    };
    if ("visible" !== f || "none" !== d || p && "visible" !== p) return {
      left: Math.max(l, 0),
      top: Math.max(u, 0)
    };
    if ("fixed" === c) return {
      left: Math.max(i, 0),
      top: Math.max(o, 0)
    };
    if ("sticky" === c) {
      const e = Number.parseInt(h, 10), t = Number.parseInt(m, 10), n = Number.isNaN(e) ? i : e + i, r = Number.isNaN(t) ? o : t + o;
      return {
        left: Math.max(n, 0),
        top: Math.max(r, 0)
      };
    }
    const g = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft), v = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    return {
      left: Math.max(n.left + g, 0),
      top: Math.max(n.top + v, 0)
    };
  }
  function ep(e) {
    const {position: t} = Ud(e);
    let n = "fixed" === t || "sticky" === t ? e : e.parentNode;
    for (;n; ) {
      if (n instanceof ShadowRoot) return n;
      if (n instanceof HTMLElement && !n.shadowRoot) {
        const {display: e} = Ud(n);
        if (n.matches("thead, tbody, tfoot, caption, colgroup, col, tr, th, td")) n = n.closest("table") ?? n.parentElement; else if ("TABLE" === n.tagName || e.startsWith("table")) n = n.parentElement; else {
          if ("DETAILS" !== n.tagName && "contents" !== e) return n;
          n = n.parentElement;
        }
      } else n = n.parentNode;
    }
    return document.body;
  }
  function tp(e, t) {
    let n;
    const r = [], {position: a} = Ud(e);
    let i, o, s = "sticky" === a || "fixed" === a ? e : e.parentNode;
    for (;s; ) {
      if (s instanceof ShadowRoot) {
        s = s.host;
        continue;
      }
      if (!(s instanceof HTMLElement) || s.shadowRoot) {
        s = s.parentNode;
        continue;
      }
      const {overflow: e, contain: t, clipPath: a, position: i, transform: o, willChange: l, contentVisibility: u} = Ud(s);
      if ((s === document.body || "fixed" === i || "sticky" === i || "none" !== o || "transform" === l || Xd(s) || s.matches("ul.sbsb_b > li.sbsb_c.gsfs")) && (n ??= s), 
      (s === document.body || "visible" !== e || /paint|content|strict/.test(t) || "none" !== a || "fixed" === i || "sticky" === i || u && "visible" !== u) && (r.push(s), 
      n)) break;
      s = s.parentNode;
    }
    vr(n);
    let l, u, c = ep(e);
    for (const e of r) {
      const r = Jd(e, t), a = r.left, s = r.top;
      if (l ??= a, u ??= s, a > 15 && s > 10) {
        o = a > l || s > u ? ep(i) : c, l = a, u = s;
        break;
      }
      if (a > l && l < 15 || s > u && u < 10) {
        const e = ep(i);
        if (!n.contains(e)) break;
        c = e, l = a, u = s;
      }
      i = e;
    }
    return o ??= c, {
      container: o,
      limitParent: n,
      availableSpaceLeft: l,
      availableSpaceTop: u
    };
  }
  const np = new Map;
  function rp(e) {
    const t = np.get(window.location.host)?.find((([t]) => e.matches(t)))?.[1];
    return t ?? [ 0, 0 ];
  }
  np.set("onenote.officeapps.live.com", [ [ ".navItem.sectionItem", [ 8, 0 ] ] ]);
  const ap = new Set;
  function ip(e) {
    ap.add(e), op();
  }
  const op = (0, cf.debounce)((() => {
    const e = new Set(ap), t = [];
    for (const n of e) n.container || t.push(n.target), n.toBeReattached && n.reattach(), 
    n.string || e.delete(n);
    Hd(t);
    for (const t of e) t.target.isConnected ? t.container || t.computeHintContext() : (e.delete(t), 
    ap.delete(t));
    const n = [];
    if (Bn().computed) {
      for (const t of e) Ac(t.inner, {
        display: "block"
      }), t.shadowHost.isConnected || t.container.append(t.shadowHost), t.elementToPositionHint.isConnected || (t.elementToPositionHint = Gd(t.target)), 
      n.push(t.target, t.elementToPositionHint, t.outer, t.inner);
      Hd(n);
      for (const t of e) t.position(), t.shadowHost.dataset.hint = t.string, t.isActive = !0;
      requestAnimationFrame((() => {
        for (const t of e) Ac(t.inner, {
          display: "none"
        });
        for (const t of e) t.toBeReattached || ap.delete(t), t.string && Ac(t.inner, {
          display: "block",
          opacity: "100%",
          transition: "opacity 0.3s"
        });
      })), Rd();
    }
  }), 100);
  const sp = new MutationObserver((e => {
    for (const t of e) for (const e of t.removedNodes) if (e instanceof HTMLDivElement && "rango-hint" === e.className) {
      const t = e.shadowRoot?.querySelector(".inner");
      if (t?.textContent) {
        const e = Yn(t.textContent);
        e?.hint?.string && (e.hint.toBeReattached = !0, ip(e.hint));
      }
    }
  })), lp = new Set, up = new ResizeObserver((async e => {
    let t = !1;
    for (const n of e) lp.has(n.target) ? t = !0 : lp.add(n.target);
    t && await fd({
      hintsPosition: !0
    });
  })), cp = new MutationObserver((e => {
    const t = e.filter((e => ![ ...e.addedNodes, ...e.removedNodes ].some((e => e instanceof HTMLElement && e.className.includes("rango-hint")))));
    for (const e of t) if (e.target instanceof Element && "rango-hint" !== e.target.className && "data-hint" !== e.attributeName) {
      const t = Qn(e.target);
      t?.hint?.container && t.element.isConnected && (t.hint.computeHintContext(), t.hint.position());
    }
  })), fp = new MutationObserver((e => {
    for (const t of e) t.attributeName && "data-hint" !== t.attributeName && t.target.removeAttribute(t.attributeName);
  }));
  class dp {
    constructor(e) {
      this.target = e, this.isActive = !1, this.borderWidth = Hn("hintBorderWidth"), this.shadowHost = document.createElement("div"), 
      this.shadowHost.className = "rango-hint", Ac(this.shadowHost, {
        display: "contents"
      }), fp.observe(this.shadowHost, {
        attributes: !0
      });
      const t = this.shadowHost.attachShadow({
        mode: "open"
      }), n = document.createElement("style");
      n.textContent = "@media print { .outer { visibility: hidden; } }", t.append(n), 
      this.outer = document.createElement("div"), this.outer.className = "outer", this.outer.setAttribute("aria-hidden", "true"), 
      Ac(this.outer, {
        position: "absolute",
        inset: "auto",
        display: "block",
        contain: "layout size style"
      }), this.inner = document.createElement("div"), this.inner.className = "inner", 
      Ac(this.inner, {
        display: "none",
        "user-select": "none",
        position: "absolute",
        "line-height": "1.25",
        "font-family": "monospace",
        padding: "0 0.15em",
        opacity: "0%",
        contain: "layout style",
        "pointer-events": "none",
        "word-break": "keep-all",
        "text-transform": "none",
        "overflow-wrap": "normal",
        "letter-spacing": "normal",
        "text-indent": "0"
      }), this.outer.append(this.inner), t.append(this.outer), this.positioned = !1, this.toBeReattached = !1, 
      this.wasReattached = !1, this.applyDefaultStyle();
    }
    setBackgroundColor(e) {
      e ??= Cd(this.target), Ac(this.inner, {
        "background-color": e
      });
    }
    computeHintContext() {
      this.elementToPositionHint = Gd(this.target), ({container: this.container, limitParent: this.limitParent, availableSpaceLeft: this.availableSpaceLeft, availableSpaceTop: this.availableSpaceTop} = tp(this.target, this.elementToPositionHint)), 
      sp.observe(this.container, {
        childList: !0
      });
      const e = this.container instanceof HTMLElement ? this.container : this.container.host;
      up.observe(e), cp.observe(this.target, {
        attributes: !0,
        childList: !0,
        subtree: !0
      });
    }
    computeColors() {
      let e, t;
      if (Vf(this.target, !1)) e = new (n(Pt))("red"), Ac(this.inner, {
        outline: "2px dashed red",
        "outline-offset": "1px"
      }), t = new (n(Pt))("white"), this.borderColor = t; else if (Vf(this.target, !0)) e = new (n(Pt))("green"), 
      Ac(this.inner, {
        outline: "2px solid green",
        "outline-offset": "1px"
      }), t = new (n(Pt))("white"), this.borderColor = new (n(Pt))("white"); else {
        const r = Hn("hintBackgroundColor"), a = Hn("hintFontColor"), i = Hn("hintBackgroundOpacity");
        if (this.firstTextNodeDescendant = Zc(this.target), r) {
          const t = new (n(Pt))(r);
          e = 1 === t.alpha() ? t.alpha(i) : t;
        } else e = new (n(Pt))(Cd(this.target)).alpha(i);
        if (a && r) t = new (n(Pt))(a); else {
          const r = this.firstTextNodeDescendant?.parentElement;
          let a = window.getComputedStyle(r ?? this.target).color;
          a = a.startsWith("rgb") ? a : "rgb(0, 0, 0)", t = _d(new (n(Pt))(a || "black"), e), 
          r || (e.isDark() && t.isDark() && (t = new (n(Pt))("white")), e.isLight() && t.isLight() && (t = new (n(Pt))("black")));
        }
        e.contrast(t) < Hn("hintMinimumContrastRatio") && !a && (t = e.isLight() ? new (n(Pt))("black") : new (n(Pt))("white")), 
        this.borderWidth = Hn("hintBorderWidth"), this.borderColor = new (n(Pt))(t).alpha(.3);
      }
      this.keyEmphasis && (this.borderColor = new (n(Pt))(this.color).alpha(.7), this.borderWidth += 1), 
      this.backgroundColor = e, this.color = t;
    }
    updateColors() {
      this.computeColors(), this.freezeColors || Ac(this.inner, {
        "background-color": this.backgroundColor.string(),
        color: this.color.string(),
        border: `${this.borderWidth}px solid ${this.borderColor.string()}`
      });
    }
    claim() {
      const e = od();
      if (e) return this.inner.textContent = e, this.string = e, Xn(this.string, this.target), 
      ip(this), e;
      console.warn("No more hint strings available");
    }
    position() {
      if (!this.container) return;
      if (void 0 === this.wrapperRelative) {
        const {display: n} = window.getComputedStyle(this.container instanceof HTMLElement ? this.container : this.container.host), r = (t = this.outer, 
        Md.get(t) ?? t.offsetParent), a = Qn(this.target)?.userScrollableContainer;
        r && a && !a.contains(r) && "grid" !== n ? (this.wrapperRelative = !0, Ac(this.outer, {
          position: "relative",
          display: "inline"
        }), e = this.outer, Nd.delete(e), Md.delete(e), jd.delete(e), Pd.delete(e)) : this.wrapperRelative = !1;
      }
      var e, t;
      void 0 === this.zIndex && (this.zIndex = function(e, t) {
        const n = e.querySelectorAll("*");
        let r = 0;
        for (const e of n) if (Od(e)) {
          const t = Number.parseInt(window.getComputedStyle(e).zIndex, 10);
          Number.isNaN(t) || (r = Math.max(r, t));
        }
        let a = e;
        for (;a && !a.contains(t); ) {
          if (Od(a)) {
            const e = Number.parseInt(window.getComputedStyle(a).zIndex, 10);
            r = Number.isNaN(e) ? 0 : e;
          }
          a = a.parentElement;
        }
        return r + 5;
      }(this.target, this.shadowHost), Ac(this.outer, {
        "z-index": `${this.zIndex}`
      })), this.elementToPositionHint.isConnected || (this.elementToPositionHint = Gd(this.target));
      const {x: n, y: r} = this.elementToPositionHint instanceof Text ? Bd(this.elementToPositionHint) : $d(this.elementToPositionHint), {x: a, y: i} = $d(this.outer);
      let o = .3, s = .5;
      if (this.elementToPositionHint instanceof Text) {
        const {fontSize: e} = window.getComputedStyle(this.elementToPositionHint.parentElement), t = Number.parseInt(e, 10);
        t < 15 ? (o = .3, s = .5) : t < 20 ? (o = .4, s = .6) : (o = .6, s = .8);
      }
      if (!(this.elementToPositionHint instanceof Text)) {
        const {width: e, height: t} = $d(this.elementToPositionHint);
        (e > 30 && t > 30 || this.target instanceof HTMLTextAreaElement) && (o = 1, s = 1);
      }
      const l = Wd(this.inner).offsetWidth * (1 - o), u = Wd(this.inner).offsetHeight * (1 - s), [c, f] = rp(this.target), d = n - a - (void 0 === this.availableSpaceLeft ? l : Math.min(l, this.availableSpaceLeft - 1)) + c, p = r - i - (void 0 === this.availableSpaceTop ? u : Math.min(u, this.availableSpaceTop - 1)) + f;
      Ac(this.inner, {
        left: `${d}px`,
        top: `${p}px`
      }), this.positioned = !0;
    }
    flash(e = 300) {
      Ac(this.inner, {
        "background-color": this.color.string(),
        color: this.backgroundColor.string()
      }), this.freezeColors = !0, setTimeout((() => {
        this.freezeColors = !1, this.updateColors();
      }), e);
    }
    clearFlash() {
      Ac(this.inner, {
        "background-color": this.backgroundColor.string(),
        color: this.color.string()
      }), this.freezeColors = !1;
    }
    release(e = !0, t = !0) {
      var n;
      (ap.has(this) && ap.delete(this), this.isActive = !1, this.string) && (Jn(this.string), 
      t && Ac(this.inner, {
        display: "none"
      }), e && (n = this.string, ad.push(n)), this.inner.textContent = "", this.string = void 0, 
      t && this.shadowHost.remove(), delete this.shadowHost.dataset.hint);
    }
    hide() {
      Ac(this.inner, {
        display: "none",
        opacity: "0%"
      });
    }
    show() {
      ip(this);
    }
    reattach() {
      if (this.toBeReattached = !1, !this.wasReattached) return this.container.append(this.shadowHost), 
      void (this.wasReattached = !0);
      if (this.container === document.body) return void this.release();
      const e = this.container.parentElement;
      if (e) {
        const t = ep(e);
        if (this.limitParent.contains(t)) return this.container = t, this.container.append(this.shadowHost), 
        void sp.observe(this.container, {
          childList: !0
        });
      }
      this.release();
    }
    applyDefaultStyle() {
      const {hintFontFamily: e, hintFontSize: t, hintWeight: n, hintBorderWidth: r, hintBorderRadius: a, hintUppercaseLetters: i} = $n();
      this.computeColors();
      const o = "auto" === n ? this.backgroundColor.contrast(this.color) < 7 && t < 14 ? "bold" : "normal" : n;
      Ac(this.inner, {
        "background-color": this.backgroundColor.string(),
        color: this.color.string(),
        border: `${r}px solid ${this.borderColor.string()}`,
        "font-family": e,
        "font-size": `${t}px`,
        "font-weight": o,
        "border-radius": `${a}px`,
        "text-transform": i ? "uppercase" : "none",
        outline: "none"
      });
    }
    keyHighlight() {
      this.keyEmphasis = !0, this.updateColors();
    }
    clearKeyHighlight() {
      this.keyEmphasis = !1, this.borderWidth = Hn("hintBorderWidth"), this.updateColors();
    }
  }
  cf = i("jLEOZ");
  function pp(e, t) {
    const {top: n, bottom: r, left: a, right: i} = e.getBoundingClientRect(), o = document.documentElement.clientHeight, s = document.documentElement.clientWidth;
    return r > -t && n < o + t && i > -t && a < s + t;
  }
  class hp {
    constructor(e, t) {
      this.callback = e, this.root = t.root ?? null, this.rootMargin = t.rootMargin ?? "0px", 
      this.rootMarginNumber = Number.parseInt(this.rootMargin, 10);
      const n = t.threshold ?? 0;
      if (this.thresholds = Array.isArray(n) ? n : [ n ], this.observationTargets = new Map, 
      this.trueObserver = new IntersectionObserver(this.onIntersection.bind(this), t), 
      this.root && this.root instanceof Element) {
        const e = (0, cf.throttle)((() => {
          const e = [];
          for (const [t, n] of this.observationTargets.entries()) {
            const r = n.isIntersecting;
            n.isIntersectingRoot && (n.isIntersecting = pp(t, this.rootMarginNumber), n.isIntersecting !== r && e.push({
              target: t,
              isIntersecting: n.isIntersecting
            }));
          }
          e.length > 0 && this.callback(e, this);
        }), 50);
        this.root.addEventListener("scroll", e, {
          passive: !0
        }), window.addEventListener("scroll", e, {
          passive: !0
        });
      }
    }
    disconnect() {
      this.observationTargets.clear(), this.trueObserver.disconnect();
    }
    observe(e) {
      this.observationTargets.has(e) || this.observationTargets.set(e, {}), this.trueObserver.observe(e);
    }
    unobserve(e) {
      this.onIntersection(this.trueObserver.takeRecords(), this.trueObserver), this.trueObserver.unobserve(e), 
      this.observationTargets.delete(e);
    }
    onIntersection(e, t) {
      if (null === t.root) this.callback(e, this); else {
        const t = [];
        for (const n of e) {
          const e = this.observationTargets.get(n.target);
          vr(e), e.isIntersectingRoot = n.isIntersecting;
          const r = e.isIntersecting;
          n.isIntersecting ? e.isIntersecting = pp(n.target, this.rootMarginNumber) : e.isIntersecting = !1, 
          e.isIntersecting !== r && t.push({
            target: n.target,
            isIntersecting: e.isIntersecting
          });
        }
        t.length > 0 && this.callback(t, this);
      }
    }
    takeRecords() {
      return [];
    }
  }
  function mp(e) {
    const {x: t, y: n} = tf(e), r = document.elementsFromPoint(t, n);
    for (const t of r) if (e.contains(t)) {
      let n = t, r = !1;
      for (;n && n !== e; ) {
        const e = Qn(n);
        e?.isHintable && e !== Qn(t) && (r = !0), n = n.parentElement;
      }
      if (!r) return t;
    }
    return e;
  }
  function gp(e) {
    const {visibility: t, opacity: n} = window.getComputedStyle(e), {width: r, height: a} = $d(e);
    if ("hidden" === t || r < 5 || a < 5 || "0" === n) return !!(e.matches("input:is([type='checkbox'], [type='radio'])") && e.parentElement && gp(e.parentElement));
    let i = e.parentElement, o = 0;
    for (;i && o < 4; ) {
      const {opacity: e} = window.getComputedStyle(i);
      if ("0" === e) return !1;
      i = i.parentElement, o++;
    }
    return !0;
  }
  function vp(e) {
    return !If(e) && (!(e.parentElement && e.parentElement instanceof HTMLLabelElement && e.parentElement.control === e) && (!(!e.parentElement || !jf(e.parentElement) || function(e) {
      return !!e.parentNode && (e.parentNode.childNodes.length > 10 || [ ...e.parentNode.childNodes ].some((t => t !== e && (t instanceof Element && "rango-hint" !== t.className || t instanceof Text && t.textContent && /\S/.test(t.textContent)))));
    }(e)) || !!(e instanceof HTMLLabelElement && e.control && gp(e.control))));
  }
  function yp(e) {
    const {cursor: t} = window.getComputedStyle(e);
    return !("pointer" !== t && "text" !== t && !e.matches("[class*='button' i], [class*='btn' i], [class*='select' i], [class*='control' i], [jsaction]") || !Pf(e));
  }
  function bp(e) {
    return "https://pad.cogneon.io/static/empty.html" !== document.location.href && (!(!hd() || !jf(e) && !yp(e)) || (!!If(e) || !(Lf(e) && !pd) && (jf(e) && !vp(e) || Vf(e, !0))));
  }
  function wp(e, t = !0) {
    let n = Qn(e);
    return n || (n = new jp(e, t), t && Kn(n)), n;
  }
  function xp(e) {
    Kn(new jp(e)), e.shadowRoot ? Np.observe(e.shadowRoot, Cp) : e.tagName.includes("-") && setTimeout((() => {
      if (e.shadowRoot) {
        const t = Wn(e);
        Np.observe(e.shadowRoot, Cp);
        for (const e of t) Kn(new jp(e));
      }
    }), 1e3);
  }
  function kp(e) {
    const t = Wn(e, !0, ".rango-hint");
    for (const e of t) e.remove();
    const n = Wn(e, !0);
    if (n.length > 25e3) for (const e of n) _p.observe(e); else {
      Hd(n.filter((e => bp(e))), !1);
      for (const e of n) xp(e);
      Rd();
    }
  }
  const _p = new IntersectionObserver((e => {
    Hd(e.filter((e => e.isIntersecting)).filter((e => bp(e.target))).map((e => e.target)), !1);
    for (const t of e) {
      !Qn(t.target) && t.isIntersecting ? xp(t.target) : t.isIntersecting || Qn(t.target)?.suspend();
    }
  }), {
    root: document,
    rootMargin: "1000px",
    threshold: 0
  }), Ep = new Map;
  async function Sp(e) {
    const t = e.filter((e => e.isIntersecting)), n = t.length, r = e.filter((e => !e.isIntersecting));
    for (const e of r) wp(e.target).intersect(e.isIntersecting);
    const a = e.filter((e => e.isIntersecting && !1 === wp(e.target).isIntersectingViewport)).length;
    n && await id(n - a, a);
    for (const e of t) wp(e.target).intersect(e.isIntersecting);
  }
  const Ap = new IntersectionObserver((async e => {
    for (const t of e) Qn(t.target)?.intersectViewport(t.isIntersecting);
  }), {
    root: null,
    rootMargin: "0px",
    threshold: 0
  }), Cp = {
    attributes: !0,
    childList: !0,
    subtree: !0
  }, Tp = "head, head *, .rango-hint, #rango-toast";
  function Op(e) {
    return !("data-hint" === e.attributeName || 1 === e.addedNodes.length && e.addedNodes[0] instanceof Element && "rango-hint" === e.addedNodes[0].className || 1 === e.removedNodes.length && e.removedNodes[0] instanceof Element && "rango-hint" === e.removedNodes[0].className);
  }
  const Np = new MutationObserver((async e => {
    if (0 === e.filter(Op).length) return;
    let t = !1;
    for (const n of e) {
      for (const e of n.addedNodes) e instanceof Element && !e.matches(Tp) && kp(e);
      for (const e of n.removedNodes) e instanceof Element && !e.matches(Tp) && tr(e);
      if (n.attributeName && n.target instanceof Element && !n.target.matches(Tp) && (t = !0, 
      [ "role", "contenteditable", "disabled", "aria-hidden" ].includes(n.attributeName) && wp(n.target).updateIsHintable(), 
      "aria-hidden" === n.attributeName)) {
        const e = Gn(n.target);
        for (const t of e) t.updateIsHintable();
      }
    }
    await fd({
      hintsPosition: !0,
      hintsColors: t,
      shouldBeHinted: t
    });
  })), Mp = new ResizeObserver((e => {
    for (const t of e) t.target.isConnected && wp(t.target).updateShouldBeHinted();
  }));
  function Ip() {
    _p.disconnect(), Np.disconnect(), Ap.disconnect(), Mp.disconnect();
    for (const e of Ep.values()) e.disconnect();
  }
  const Lp = (0, cf.debounce)((async () => {
    await fd({
      shouldBeHinted: !0
    });
  }), 100);
  document.addEventListener("focusin", Lp), document.addEventListener("focusout", Lp);
  class jp {
    constructor(e, t = !0) {
      this.element = e, this.isActiveEditable = this.element === document.activeElement && or(this.element), 
      t && this.updateIsHintable();
    }
    updateIsHintable() {
      this.isHintable = bp(this.element), this.isHintable && (or(this.element) && (this.element.addEventListener("focus", (() => {
        this.isActiveEditable = !0, this.updateShouldBeHinted();
      })), this.element.addEventListener("blur", (() => {
        this.isActiveEditable = !1, this.updateShouldBeHinted();
      }))), Mp.observe(this.element)), this.updateShouldBeHinted();
    }
    updateShouldBeHinted() {
      const e = this.isHintable && !this.isActiveEditable && (gp(this.element) || If(this.element) && !Lf(this.element) || hd()) && !("true" === (t = this.element).getAttribute("aria-disabled") || (t instanceof HTMLLabelElement && t.control && wr(t.control) ? t.control.disabled : wr(t) && t.disabled));
      var t;
      e !== this.shouldBeHinted && (e ? Ap.observe(this.element) : (this.hint?.string && (Jn(this.hint.string), 
      this.hint.release()), Ap.unobserve(this.element), this.unobserveIntersection())), 
      this.shouldBeHinted = e;
    }
    observeIntersection() {
      this.userScrollableContainer = Ic(this.element);
      const e = this.userScrollableContainer !== document.documentElement && this.userScrollableContainer !== document.body && this.userScrollableContainer ? this.userScrollableContainer : null, t = {
        root: e,
        rootMargin: `${Hn("viewportMargin")}px`,
        threshold: 0
      };
      this.intersectionObserver = Ep.get(e) ?? new hp(Sp, t), this.intersectionObserver.observe(this.element), 
      this.observingIntersection = !0, Ep.has(e) || Ep.set(e, this.intersectionObserver);
    }
    unobserveIntersection() {
      this.intersectionObserver?.unobserve(this.element), this.observingIntersection = !1;
    }
    intersect(e) {
      this.isIntersecting = e, this.isIntersecting && this.shouldBeHinted ? (this.hint ??= new dp(this.element), 
      this.hint.claim()) : this.hint?.string && this.hint.release();
    }
    intersectViewport(e) {
      this.isIntersectingViewport = e, this.intersectionObserver || this.observeIntersection(), 
      this.isIntersectingViewport && !this.observingIntersection && (this.intersectionObserver?.observe(this.element), 
      this.observingIntersection = !0);
    }
    click() {
      const e = mp(this.element);
      if (this.hint?.inner.isConnected ? this.hint.flash() : this.flashElement(), this.element instanceof HTMLAnchorElement) {
        const e = this.element.closest("[contenteditable]"), t = e instanceof HTMLElement && e.isContentEditable;
        if (("_blank" === this.element.getAttribute("target") || t) && this.element.getAttribute("href") && ("discord.com" !== window.location.host || window.location.host !== new URL(this.element.href).host)) return sl([ this ]), 
        !1;
      }
      return of(e), af(e);
    }
    flashElement() {
      const e = this.element;
      if (!(e instanceof HTMLElement)) return;
      const t = e.style.outline;
      Ac(e, {
        outline: "2px solid #0891b2"
      }), setTimeout((() => {
        e.style.outline = t;
      }), 150);
    }
    hover() {
      const e = mp(this.element);
      this.hint?.flash(), of(e);
    }
    unhover() {
      sf(mp(this.element));
    }
    suspend() {
      this.unobserveIntersection(), Ap.unobserve(this.element), Mp.unobserve(this.element), 
      this.shouldBeHinted = void 0, this.isIntersectingViewport = void 0, this.hint?.release();
    }
  }
  function Pp(e) {
    window.focus();
    for (const t of e) {
      document.activeElement && lf(document.activeElement, "Tab");
      const e = cr(t.element);
      e instanceof HTMLElement && (e.focus({
        focusVisible: !0
      }), uf(e, "Tab"));
    }
    if (!document.hasFocus()) return [ {
      name: "focusPage"
    } ];
  }
  async function Rp() {
    const e = document.querySelector(ir);
    e ? Pp([ wp(e) ]) : await rl("No input found", {
      type: "error"
    });
  }
  var zp, Dp, Fp, Hp;
  o = i("dBVaG");
  function $p(e) {
    return e && e instanceof Element;
  }
  (Dp = zp || (zp = {})).NONE = "none", Dp.DESCENDANT = "descendant", Dp.CHILD = "child", 
  (Hp = Fp || (Fp = {})).id = "id", Hp.class = "class", Hp.tag = "tag", Hp.attribute = "attribute", 
  Hp.nthchild = "nthchild", Hp.nthoftype = "nthoftype";
  function Bp(e = "unknown problem", ...t) {
    console.warn(`CssSelectorGenerator: ${e}`, ...t);
  }
  const Wp = {
    selectors: [ Fp.id, Fp.class, Fp.tag, Fp.attribute ],
    includeTag: !1,
    whitelist: [],
    blacklist: [],
    combineWithinSelector: !0,
    combineBetweenSelectors: !0,
    root: null,
    maxCombinations: Number.POSITIVE_INFINITY,
    maxCandidates: Number.POSITIVE_INFINITY
  };
  function Up(e) {
    return Array.isArray(e) ? e.filter((e => {
      return t = Fp, n = e, Object.values(t).includes(n);
      var t, n;
    })) : [];
  }
  function Vp(e) {
    return e instanceof RegExp;
  }
  function qp(e) {
    return [ "string", "function" ].includes(typeof e) || Vp(e);
  }
  function Zp(e) {
    return Array.isArray(e) ? e.filter(qp) : [];
  }
  function Kp(e) {
    const t = [ Node.DOCUMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE, Node.ELEMENT_NODE ];
    return function(e) {
      return e instanceof Node;
    }(e) && t.includes(e.nodeType);
  }
  function Yp(e, t) {
    if (Kp(e)) return e.contains(t) || Bp("element root mismatch", "Provided root does not contain the element. This will most likely result in producing a fallback selector using element's real root node. If you plan to use the selector using provided root (e.g. `root.querySelector`), it will nto work as intended."), 
    e;
    const n = t.getRootNode({
      composed: !1
    });
    return Kp(n) ? (n !== document && Bp("shadow root inferred", "You did not provide a root and the element is a child of Shadow DOM. This will produce a selector using ShadowRoot as a root. If you plan to use the selector using document as a root (e.g. `document.querySelector`), it will not work as intended."), 
    n) : t.ownerDocument.querySelector(":root");
  }
  function Qp(e) {
    return "number" == typeof e ? e : Number.POSITIVE_INFINITY;
  }
  function Gp(e, t = {}) {
    const n = Object.assign(Object.assign({}, Wp), t);
    return {
      selectors: Up(n.selectors),
      whitelist: Zp(n.whitelist),
      blacklist: Zp(n.blacklist),
      root: Yp(n.root, e),
      combineWithinSelector: !!n.combineWithinSelector,
      combineBetweenSelectors: !!n.combineBetweenSelectors,
      includeTag: !!n.includeTag,
      maxCombinations: Qp(n.maxCombinations),
      maxCandidates: Qp(n.maxCandidates)
    };
  }
  function Xp(e = []) {
    const [t = [], ...n] = e;
    return 0 === n.length ? t : n.reduce(((e, t) => e.filter((e => t.includes(e)))), t);
  }
  function Jp(e) {
    return [].concat(...e);
  }
  function eh(e) {
    const t = e.map((e => {
      if (Vp(e)) return t => e.test(t);
      if ("function" == typeof e) return t => {
        const n = e(t);
        return "boolean" != typeof n ? (Bp("pattern matcher function invalid", "Provided pattern matching function does not return boolean. It's result will be ignored.", e), 
        !1) : n;
      };
      if ("string" == typeof e) {
        const t = new RegExp("^" + (e.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".+") + "$"));
        return e => t.test(e);
      }
      return Bp("pattern matcher invalid", "Pattern matching only accepts strings, regular expressions and/or functions. This item is invalid and will be ignored.", e), 
      () => !1;
    }));
    return e => t.some((t => t(e)));
  }
  function th(e, t, n) {
    const r = Array.from(Yp(n, e[0]).querySelectorAll(t));
    return r.length === e.length && e.every((e => r.includes(e)));
  }
  function nh(e, t) {
    t = null != t ? t : function(e) {
      return e.ownerDocument.querySelector(":root");
    }(e);
    const n = [];
    let r = e;
    for (;$p(r) && r !== t; ) n.push(r), r = r.parentElement;
    return n;
  }
  function rh(e, t) {
    return Xp(e.map((e => nh(e, t))));
  }
  const ah = {
    [zp.NONE]: {
      type: zp.NONE,
      value: ""
    },
    [zp.DESCENDANT]: {
      type: zp.DESCENDANT,
      value: " > "
    },
    [zp.CHILD]: {
      type: zp.CHILD,
      value: " "
    }
  }, ih = new RegExp([ "^$", "\\s" ].join("|")), oh = new RegExp([ "^$" ].join("|")), sh = [ Fp.nthoftype, Fp.tag, Fp.id, Fp.class, Fp.attribute, Fp.nthchild ], lh = eh([ "class", "id", "ng-*" ]);
  function uh({nodeName: e}) {
    return `[${e}]`;
  }
  function ch({nodeName: e, nodeValue: t}) {
    return `[${e}='${Eh(t)}']`;
  }
  function fh(e) {
    const t = Array.from(e.attributes).filter((t => function({nodeName: e}, t) {
      const n = t.tagName.toLowerCase();
      return !([ "input", "option" ].includes(n) && "value" === e || lh(e));
    }(t, e)));
    return [ ...t.map(uh), ...t.map(ch) ];
  }
  function dh(e) {
    return (e.getAttribute("class") || "").trim().split(/\s+/).filter((e => !oh.test(e))).map((e => `.${Eh(e)}`));
  }
  function ph(e) {
    const t = e.getAttribute("id") || "", n = `#${Eh(t)}`, r = e.getRootNode({
      composed: !1
    });
    return !ih.test(t) && th([ e ], n, r) ? [ n ] : [];
  }
  function hh(e) {
    const t = e.parentNode;
    if (t) {
      const n = Array.from(t.childNodes).filter($p).indexOf(e);
      if (n > -1) return [ `:nth-child(${n + 1})` ];
    }
    return [];
  }
  function mh(e) {
    return [ Eh(e.tagName.toLowerCase()) ];
  }
  function gh(e) {
    const t = [ ...new Set(Jp(e.map(mh))) ];
    return 0 === t.length || t.length > 1 ? [] : [ t[0] ];
  }
  function vh(e) {
    const t = gh([ e ])[0], n = e.parentElement;
    if (n) {
      const r = Array.from(n.children).filter((e => e.tagName.toLowerCase() === t)), a = r.indexOf(e);
      if (a > -1) return [ `${t}:nth-of-type(${a + 1})` ];
    }
    return [];
  }
  function yh(e = [], {maxResults: t = Number.POSITIVE_INFINITY} = {}) {
    const n = [];
    let r = 0, a = wh(1);
    for (;a.length <= e.length && r < t; ) r += 1, n.push(a.map((t => e[t]))), a = bh(a, e.length - 1);
    return n;
  }
  function bh(e = [], t = 0) {
    const n = e.length;
    if (0 === n) return [];
    const r = [ ...e ];
    r[n - 1] += 1;
    for (let e = n - 1; e >= 0; e--) if (r[e] > t) {
      if (0 === e) return wh(n + 1);
      r[e - 1]++, r[e] = r[e - 1] + 1;
    }
    return r[n - 1] > t ? wh(n + 1) : r;
  }
  function wh(e = 1) {
    return Array.from(Array(e).keys());
  }
  function xh(e = {}) {
    let t = [];
    return Object.entries(e).forEach((([e, n]) => {
      t = n.flatMap((n => 0 === t.length ? [ {
        [e]: n
      } ] : t.map((t => Object.assign(Object.assign({}, t), {
        [e]: n
      })))));
    })), t;
  }
  const kh = ":".charCodeAt(0).toString(16).toUpperCase(), _h = /[ !"#$%&'()\[\]{|}<>*+,./;=?@^`~\\]/;
  function Eh(e = "") {
    var t, n;
    return null !== (n = null === (t = null === CSS || void 0 === CSS ? void 0 : CSS.escape) || void 0 === t ? void 0 : t.call(CSS, e)) && void 0 !== n ? n : function(e = "") {
      return e.split("").map((e => ":" === e ? `\\${kh} ` : _h.test(e) ? `\\${e}` : escape(e).replace(/%/g, "\\"))).join("");
    }(e);
  }
  const Sh = {
    tag: gh,
    id: function(e) {
      return 0 === e.length || e.length > 1 ? [] : ph(e[0]);
    },
    class: function(e) {
      return Xp(e.map(dh));
    },
    attribute: function(e) {
      return Xp(e.map(fh));
    },
    nthchild: function(e) {
      return Xp(e.map(hh));
    },
    nthoftype: function(e) {
      return Xp(e.map(vh));
    }
  }, Ah = {
    tag: mh,
    id: ph,
    class: dh,
    attribute: fh,
    nthchild: hh,
    nthoftype: vh
  };
  function Ch(e, t) {
    return Ah[t](e);
  }
  function Th(e, t, n) {
    const r = function(e, t) {
      const {blacklist: n, whitelist: r, combineWithinSelector: a, maxCombinations: i} = t, o = eh(n), s = eh(r), l = (t, n) => {
        const r = function(e, t) {
          var n;
          return (null !== (n = Sh[t]) && void 0 !== n ? n : () => [])(e);
        }(e, n), l = function(e = [], t, n) {
          return e.filter((e => n(e) || !t(e)));
        }(r, o, s), u = function(e = [], t) {
          return e.sort(((e, n) => {
            const r = t(e), a = t(n);
            return r && !a ? -1 : !r && a ? 1 : 0;
          }));
        }(l, s);
        return t[n] = a ? yh(u, {
          maxResults: i
        }) : u.map((e => [ e ])), t;
      };
      return function(e) {
        const {selectors: t, includeTag: n} = e, r = [].concat(t);
        n && !r.includes("tag") && r.push("tag");
        return r;
      }(t).reduce(l, {});
    }(e, n), a = function(e, t) {
      return function(e) {
        const {selectors: t, combineBetweenSelectors: n, includeTag: r, maxCandidates: a} = e, i = n ? yh(t, {
          maxResults: a
        }) : t.map((e => [ e ]));
        return r ? i.map(Oh) : i;
      }(t).map((t => function(e, t) {
        const n = {};
        e.forEach((e => {
          const r = t[e];
          r.length > 0 && (n[e] = r);
        }));
        return xh(n).map(Nh);
      }(t, e))).filter((e => e.length > 0));
    }(r, n), i = Jp(a);
    return [ ...new Set(i) ];
  }
  function Oh(e) {
    return e.includes(Fp.tag) || e.includes(Fp.nthoftype) ? [ ...e ] : [ ...e, Fp.tag ];
  }
  function Nh(e = {}) {
    const t = [ ...sh ];
    return e[Fp.tag] && e[Fp.nthoftype] && t.splice(t.indexOf(Fp.tag), 1), t.map((t => {
      return (r = e)[n = t] ? r[n].join("") : "";
      var n, r;
    })).join("");
  }
  function Mh(e, t, n = "", r) {
    const a = function(e, t) {
      return "" === t ? e : function(e, t) {
        return [ ...e.map((e => t + " " + e)), ...e.map((e => t + " > " + e)) ];
      }(e, t);
    }(Th(e, r.root, r), n);
    for (const t of a) if (th(e, t, r.root)) return t;
    return null;
  }
  function Ih(e, t, n = "", r) {
    if (0 === e.length) return null;
    const a = [ e.length > 1 ? e : [], ...rh(e, t).map((e => [ e ])) ];
    for (const e of a) {
      const t = Mh(e, 0, n, r);
      if (t) return {
        foundElements: e,
        selector: t
      };
    }
    return null;
  }
  function Lh(e) {
    const t = (Array.isArray(e) ? e : [ e ]).filter($p);
    return [ ...new Set(t) ];
  }
  function jh(e) {
    return {
      value: e,
      include: !1
    };
  }
  function Ph(e, t, n = zp.NONE) {
    const r = {};
    return t.forEach((t => {
      Reflect.set(r, t, Ch(e, t).map(jh));
    })), {
      element: e,
      operator: ah[n],
      selectors: r
    };
  }
  function Rh({selectors: e, operator: t}) {
    let n = [ ...sh ];
    e[Fp.tag] && e[Fp.nthoftype] && (n = n.filter((e => e !== Fp.tag)));
    let r = "";
    return n.forEach((t => {
      (e[t] || []).forEach((({value: e, include: t}) => {
        t && (r += e);
      }));
    })), t.value + r;
  }
  function zh(e) {
    return [ ":root", ...nh(e).reverse().map((e => {
      const t = Ph(e, [ Fp.nthchild ], zp.DESCENDANT);
      return t.selectors.nthchild.forEach((e => {
        e.include = !0;
      })), t;
    })).map(Rh) ].join("");
  }
  function Dh(e) {
    return e.map(zh).join(", ");
  }
  function Fh(e, t = {}) {
    const n = Lh(e), r = Gp(n[0], t);
    let a = "", i = r.root;
    function o() {
      return Ih(n, i, a, r);
    }
    let s = o();
    for (;s; ) {
      const {foundElements: e, selector: t} = s;
      if (th(n, t, r.root)) return t;
      i = e[0], a = t, s = o();
    }
    return n.length > 1 ? n.map((e => Fh(e, r))).join(", ") : Dh(n);
  }
  function Hh(e) {
    const t = document.querySelector(e);
    if (t) return wp(t, !1);
  }
  async function $h() {
    const e = ff(window.location.href), t = await Pn("references"), n = t.get(e) ?? new Map;
    return {
      hostPattern: e,
      references: t,
      hostReferences: n
    };
  }
  async function Bh(e, t) {
    const n = Fh(e.element, {
      blacklist: [ /data-hint/, /href/, "#*" ],
      maxCombinations: 100,
      includeTag: !0
    }), {hostPattern: r, references: a, hostReferences: i} = await $h();
    i.set(t, n), a.set(r, i), await Mn("references", a), Cc(e, t);
  }
  async function Wh(e) {
    const t = lr();
    if (t) {
      const n = Qn(t);
      n && await Bh(n, e);
    }
  }
  async function Uh() {
    const {hostReferences: e} = await $h();
    console.log("Rango references for the current host:");
    for (const [t, n] of e.entries()) {
      const e = Hh(n);
      e && Cc(e, t), console.log(`%c  ${t}:%c "${n}"`, "font-weight: bold");
    }
  }
  async function Vh(e) {
    const {hostPattern: t, hostReferences: r} = await $h(), a = r.get(e);
    if (!a) return !1;
    await n(o).runtime.sendMessage({
      type: "removeReference",
      hostPattern: t,
      name: e
    });
    const i = Hh(a);
    return i && Cc(i, `❌ ${e}`), !0;
  }
  async function qh(e, t) {
    const n = "string" == typeof e.target ? [ e.target ] : e.target, r = t ?? Yn(n).filter((e => e.isIntersectingViewport));
    if (0 === r.length) {
      if ("setSelectionAfter" !== e.type && "setSelectionBefore" !== e.type && "tryToFocusElementAndCheckIsEditable" !== e.type) return "directClickElement" === e.type ? [ {
        name: "typeTargetCharacters"
      } ] : void 0;
      {
        const e = document.activeElement ? Qn(document.activeElement) : void 0;
        e && r.push(e);
      }
    }
    const a = t ? t[0] : r[0];
    switch (vr(a), ol(a), e.type) {
     case "clickElement":
     case "directClickElement":
      return ul(r);

     case "tryToFocusElementAndCheckIsEditable":
      {
        const e = await il(a);
        return [ {
          name: "responseValue",
          value: Boolean(e)
        } ];
      }

     case "focusElement":
      return Pp(r);

     case "showLink":
      Uc(r);
      break;

     case "openInNewTab":
      await sl(r);
      break;

     case "openInBackgroundTab":
      await ll(r);
      break;

     case "hoverElement":
      await Bc(r);
      break;

     case "copyLink":
      return Oc(r);

     case "copyMarkdownLink":
      return Nc(r);

     case "copyElementTextContent":
      return Tc(r);

     case "insertToField":
      await Jc(r, e.arg);
      break;

     case "setSelectionBefore":
      await Gc(a);
      break;

     case "setSelectionAfter":
      await Xc(a);
      break;

     case "focusAndDeleteContents":
      return ef(a);

     case "scrollUpAtElement":
      $c({
        dir: "up",
        target: a,
        factor: e.arg
      });
      break;

     case "scrollDownAtElement":
      $c({
        dir: "down",
        target: a,
        factor: e.arg
      });
      break;

     case "scrollLeftAtElement":
      $c({
        dir: "left",
        target: a,
        factor: e.arg
      });
      break;

     case "scrollRightAtElement":
      $c({
        dir: "right",
        target: a,
        factor: e.arg
      });
      break;

     case "scrollElementToTop":
      Hc("top", a);
      break;

     case "scrollElementToBottom":
      Hc("bottom", a);
      break;

     case "scrollElementToCenter":
      Hc("center", a);
      break;

     case "includeExtraSelectors":
      await gd(r);
      break;

     case "excludeExtraSelectors":
      await vd(r);
      break;

     case "saveReference":
      await Bh(a, e.arg);
      break;

     case "hideHint":
      for (const e of r) e.hint?.hide();
      break;

     default:
      await rl(`Invalid action "${e.type}"`, {
        type: "error"
      });
    }
  }
  function Zh(e) {
    return Array.isArray ? Array.isArray(e) : "[object Array]" === em(e);
  }
  function Kh(e) {
    return "string" == typeof e;
  }
  function Yh(e) {
    return "number" == typeof e;
  }
  function Qh(e) {
    return !0 === e || !1 === e || function(e) {
      return Gh(e) && null !== e;
    }(e) && "[object Boolean]" == em(e);
  }
  function Gh(e) {
    return "object" == typeof e;
  }
  function Xh(e) {
    return null != e;
  }
  function Jh(e) {
    return !e.trim().length;
  }
  function em(e) {
    return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
  }
  const tm = Object.prototype.hasOwnProperty;
  class nm {
    constructor(e) {
      this._keys = [], this._keyMap = {};
      let t = 0;
      e.forEach((e => {
        let n = rm(e);
        t += n.weight, this._keys.push(n), this._keyMap[n.id] = n, t += n.weight;
      })), this._keys.forEach((e => {
        e.weight /= t;
      }));
    }
    get(e) {
      return this._keyMap[e];
    }
    keys() {
      return this._keys;
    }
    toJSON() {
      return JSON.stringify(this._keys);
    }
  }
  function rm(e) {
    let t = null, n = null, r = null, a = 1, i = null;
    if (Kh(e) || Zh(e)) r = e, t = am(e), n = im(e); else {
      if (!tm.call(e, "name")) throw new Error((e => `Missing ${e} property in key`)("name"));
      const o = e.name;
      if (r = o, tm.call(e, "weight") && (a = e.weight, a <= 0)) throw new Error((e => `Property 'weight' in key '${e}' must be a positive integer`)(o));
      t = am(o), n = im(o), i = e.getFn;
    }
    return {
      path: t,
      id: n,
      weight: a,
      src: r,
      getFn: i
    };
  }
  function am(e) {
    return Zh(e) ? e : e.split(".");
  }
  function im(e) {
    return Zh(e) ? e.join(".") : e;
  }
  const om = {
    useExtendedSearch: !1,
    getFn: function(e, t) {
      let n = [], r = !1;
      const a = (e, t, i) => {
        if (Xh(e)) if (t[i]) {
          const o = e[t[i]];
          if (!Xh(o)) return;
          if (i === t.length - 1 && (Kh(o) || Yh(o) || Qh(o))) n.push(function(e) {
            return null == e ? "" : function(e) {
              if ("string" == typeof e) return e;
              let t = e + "";
              return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
            }(e);
          }(o)); else if (Zh(o)) {
            r = !0;
            for (let e = 0, n = o.length; e < n; e += 1) a(o[e], t, i + 1);
          } else t.length && a(o, t, i + 1);
        } else n.push(e);
      };
      return a(e, Kh(t) ? t.split(".") : t, 0), r ? n : n[0];
    },
    ignoreLocation: !1,
    ignoreFieldNorm: !1,
    fieldNormWeight: 1
  };
  var sm = {
    isCaseSensitive: !1,
    includeScore: !1,
    keys: [],
    shouldSort: !0,
    sortFn: (e, t) => e.score === t.score ? e.idx < t.idx ? -1 : 1 : e.score < t.score ? -1 : 1,
    includeMatches: !1,
    findAllMatches: !1,
    minMatchCharLength: 1,
    location: 0,
    threshold: .6,
    distance: 100,
    ...om
  };
  const lm = /[^ ]+/g;
  class um {
    constructor({getFn: e = sm.getFn, fieldNormWeight: t = sm.fieldNormWeight} = {}) {
      this.norm = function(e = 1, t = 3) {
        const n = new Map, r = Math.pow(10, t);
        return {
          get(t) {
            const a = t.match(lm).length;
            if (n.has(a)) return n.get(a);
            const i = 1 / Math.pow(a, .5 * e), o = parseFloat(Math.round(i * r) / r);
            return n.set(a, o), o;
          },
          clear() {
            n.clear();
          }
        };
      }(t, 3), this.getFn = e, this.isCreated = !1, this.setIndexRecords();
    }
    setSources(e = []) {
      this.docs = e;
    }
    setIndexRecords(e = []) {
      this.records = e;
    }
    setKeys(e = []) {
      this.keys = e, this._keysMap = {}, e.forEach(((e, t) => {
        this._keysMap[e.id] = t;
      }));
    }
    create() {
      !this.isCreated && this.docs.length && (this.isCreated = !0, Kh(this.docs[0]) ? this.docs.forEach(((e, t) => {
        this._addString(e, t);
      })) : this.docs.forEach(((e, t) => {
        this._addObject(e, t);
      })), this.norm.clear());
    }
    add(e) {
      const t = this.size();
      Kh(e) ? this._addString(e, t) : this._addObject(e, t);
    }
    removeAt(e) {
      this.records.splice(e, 1);
      for (let t = e, n = this.size(); t < n; t += 1) this.records[t].i -= 1;
    }
    getValueForItemAtKeyId(e, t) {
      return e[this._keysMap[t]];
    }
    size() {
      return this.records.length;
    }
    _addString(e, t) {
      if (!Xh(e) || Jh(e)) return;
      let n = {
        v: e,
        i: t,
        n: this.norm.get(e)
      };
      this.records.push(n);
    }
    _addObject(e, t) {
      let n = {
        i: t,
        $: {}
      };
      this.keys.forEach(((t, r) => {
        let a = t.getFn ? t.getFn(e) : this.getFn(e, t.path);
        if (Xh(a)) if (Zh(a)) {
          let e = [];
          const t = [ {
            nestedArrIndex: -1,
            value: a
          } ];
          for (;t.length; ) {
            const {nestedArrIndex: n, value: r} = t.pop();
            if (Xh(r)) if (Kh(r) && !Jh(r)) {
              let t = {
                v: r,
                i: n,
                n: this.norm.get(r)
              };
              e.push(t);
            } else Zh(r) && r.forEach(((e, n) => {
              t.push({
                nestedArrIndex: n,
                value: e
              });
            }));
          }
          n.$[r] = e;
        } else if (Kh(a) && !Jh(a)) {
          let e = {
            v: a,
            n: this.norm.get(a)
          };
          n.$[r] = e;
        }
      })), this.records.push(n);
    }
    toJSON() {
      return {
        keys: this.keys,
        records: this.records
      };
    }
  }
  function cm(e, t, {getFn: n = sm.getFn, fieldNormWeight: r = sm.fieldNormWeight} = {}) {
    const a = new um({
      getFn: n,
      fieldNormWeight: r
    });
    return a.setKeys(e.map(rm)), a.setSources(t), a.create(), a;
  }
  function fm(e, {errors: t = 0, currentLocation: n = 0, expectedLocation: r = 0, distance: a = sm.distance, ignoreLocation: i = sm.ignoreLocation} = {}) {
    const o = t / e.length;
    if (i) return o;
    const s = Math.abs(r - n);
    return a ? o + s / a : s ? 1 : o;
  }
  const dm = 32;
  function pm(e, t, n, {location: r = sm.location, distance: a = sm.distance, threshold: i = sm.threshold, findAllMatches: o = sm.findAllMatches, minMatchCharLength: s = sm.minMatchCharLength, includeMatches: l = sm.includeMatches, ignoreLocation: u = sm.ignoreLocation} = {}) {
    if (t.length > dm) throw new Error(`Pattern length exceeds max of ${dm}.`);
    const c = t.length, f = e.length, d = Math.max(0, Math.min(r, f));
    let p = i, h = d;
    const m = s > 1 || l, g = m ? Array(f) : [];
    let v;
    for (;(v = e.indexOf(t, h)) > -1; ) {
      let e = fm(t, {
        currentLocation: v,
        expectedLocation: d,
        distance: a,
        ignoreLocation: u
      });
      if (p = Math.min(e, p), h = v + c, m) {
        let e = 0;
        for (;e < c; ) g[v + e] = 1, e += 1;
      }
    }
    h = -1;
    let y = [], b = 1, w = c + f;
    const x = 1 << c - 1;
    for (let r = 0; r < c; r += 1) {
      let i = 0, s = w;
      for (;i < s; ) {
        fm(t, {
          errors: r,
          currentLocation: d + s,
          expectedLocation: d,
          distance: a,
          ignoreLocation: u
        }) <= p ? i = s : w = s, s = Math.floor((w - i) / 2 + i);
      }
      w = s;
      let l = Math.max(1, d - s + 1), v = o ? f : Math.min(d + s, f) + c, k = Array(v + 2);
      k[v + 1] = (1 << r) - 1;
      for (let i = v; i >= l; i -= 1) {
        let o = i - 1, s = n[e.charAt(o)];
        if (m && (g[o] = +!!s), k[i] = (k[i + 1] << 1 | 1) & s, r && (k[i] |= (y[i + 1] | y[i]) << 1 | 1 | y[i + 1]), 
        k[i] & x && (b = fm(t, {
          errors: r,
          currentLocation: o,
          expectedLocation: d,
          distance: a,
          ignoreLocation: u
        }), b <= p)) {
          if (p = b, h = o, h <= d) break;
          l = Math.max(1, 2 * d - h);
        }
      }
      if (fm(t, {
        errors: r + 1,
        currentLocation: d,
        expectedLocation: d,
        distance: a,
        ignoreLocation: u
      }) > p) break;
      y = k;
    }
    const k = {
      isMatch: h >= 0,
      score: Math.max(.001, b)
    };
    if (m) {
      const e = function(e = [], t = sm.minMatchCharLength) {
        let n = [], r = -1, a = -1, i = 0;
        for (let o = e.length; i < o; i += 1) {
          let o = e[i];
          o && -1 === r ? r = i : o || -1 === r || (a = i - 1, a - r + 1 >= t && n.push([ r, a ]), 
          r = -1);
        }
        return e[i - 1] && i - r >= t && n.push([ r, i - 1 ]), n;
      }(g, s);
      e.length ? l && (k.indices = e) : k.isMatch = !1;
    }
    return k;
  }
  function hm(e) {
    let t = {};
    for (let n = 0, r = e.length; n < r; n += 1) {
      const a = e.charAt(n);
      t[a] = (t[a] || 0) | 1 << r - n - 1;
    }
    return t;
  }
  class mm {
    constructor(e, {location: t = sm.location, threshold: n = sm.threshold, distance: r = sm.distance, includeMatches: a = sm.includeMatches, findAllMatches: i = sm.findAllMatches, minMatchCharLength: o = sm.minMatchCharLength, isCaseSensitive: s = sm.isCaseSensitive, ignoreLocation: l = sm.ignoreLocation} = {}) {
      if (this.options = {
        location: t,
        threshold: n,
        distance: r,
        includeMatches: a,
        findAllMatches: i,
        minMatchCharLength: o,
        isCaseSensitive: s,
        ignoreLocation: l
      }, this.pattern = s ? e : e.toLowerCase(), this.chunks = [], !this.pattern.length) return;
      const u = (e, t) => {
        this.chunks.push({
          pattern: e,
          alphabet: hm(e),
          startIndex: t
        });
      }, c = this.pattern.length;
      if (c > dm) {
        let e = 0;
        const t = c % dm, n = c - t;
        for (;e < n; ) u(this.pattern.substr(e, dm), e), e += dm;
        if (t) {
          const e = c - dm;
          u(this.pattern.substr(e), e);
        }
      } else u(this.pattern, 0);
    }
    searchIn(e) {
      const {isCaseSensitive: t, includeMatches: n} = this.options;
      if (t || (e = e.toLowerCase()), this.pattern === e) {
        let t = {
          isMatch: !0,
          score: 0
        };
        return n && (t.indices = [ [ 0, e.length - 1 ] ]), t;
      }
      const {location: r, distance: a, threshold: i, findAllMatches: o, minMatchCharLength: s, ignoreLocation: l} = this.options;
      let u = [], c = 0, f = !1;
      this.chunks.forEach((({pattern: t, alphabet: d, startIndex: p}) => {
        const {isMatch: h, score: m, indices: g} = pm(e, t, d, {
          location: r + p,
          distance: a,
          threshold: i,
          findAllMatches: o,
          minMatchCharLength: s,
          includeMatches: n,
          ignoreLocation: l
        });
        h && (f = !0), c += m, h && g && (u = [ ...u, ...g ]);
      }));
      let d = {
        isMatch: f,
        score: f ? c / this.chunks.length : 1
      };
      return f && n && (d.indices = u), d;
    }
  }
  class gm {
    constructor(e) {
      this.pattern = e;
    }
    static isMultiMatch(e) {
      return vm(e, this.multiRegex);
    }
    static isSingleMatch(e) {
      return vm(e, this.singleRegex);
    }
    search() {}
  }
  function vm(e, t) {
    const n = e.match(t);
    return n ? n[1] : null;
  }
  class ym extends gm {
    constructor(e, {location: t = sm.location, threshold: n = sm.threshold, distance: r = sm.distance, includeMatches: a = sm.includeMatches, findAllMatches: i = sm.findAllMatches, minMatchCharLength: o = sm.minMatchCharLength, isCaseSensitive: s = sm.isCaseSensitive, ignoreLocation: l = sm.ignoreLocation} = {}) {
      super(e), this._bitapSearch = new mm(e, {
        location: t,
        threshold: n,
        distance: r,
        includeMatches: a,
        findAllMatches: i,
        minMatchCharLength: o,
        isCaseSensitive: s,
        ignoreLocation: l
      });
    }
    static get type() {
      return "fuzzy";
    }
    static get multiRegex() {
      return /^"(.*)"$/;
    }
    static get singleRegex() {
      return /^(.*)$/;
    }
    search(e) {
      return this._bitapSearch.searchIn(e);
    }
  }
  class bm extends gm {
    constructor(e) {
      super(e);
    }
    static get type() {
      return "include";
    }
    static get multiRegex() {
      return /^'"(.*)"$/;
    }
    static get singleRegex() {
      return /^'(.*)$/;
    }
    search(e) {
      let t, n = 0;
      const r = [], a = this.pattern.length;
      for (;(t = e.indexOf(this.pattern, n)) > -1; ) n = t + a, r.push([ t, n - 1 ]);
      const i = !!r.length;
      return {
        isMatch: i,
        score: i ? 0 : 1,
        indices: r
      };
    }
  }
  const wm = [ class extends gm {
    constructor(e) {
      super(e);
    }
    static get type() {
      return "exact";
    }
    static get multiRegex() {
      return /^="(.*)"$/;
    }
    static get singleRegex() {
      return /^=(.*)$/;
    }
    search(e) {
      const t = e === this.pattern;
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [ 0, this.pattern.length - 1 ]
      };
    }
  }, bm, class extends gm {
    constructor(e) {
      super(e);
    }
    static get type() {
      return "prefix-exact";
    }
    static get multiRegex() {
      return /^\^"(.*)"$/;
    }
    static get singleRegex() {
      return /^\^(.*)$/;
    }
    search(e) {
      const t = e.startsWith(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [ 0, this.pattern.length - 1 ]
      };
    }
  }, class extends gm {
    constructor(e) {
      super(e);
    }
    static get type() {
      return "inverse-prefix-exact";
    }
    static get multiRegex() {
      return /^!\^"(.*)"$/;
    }
    static get singleRegex() {
      return /^!\^(.*)$/;
    }
    search(e) {
      const t = !e.startsWith(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [ 0, e.length - 1 ]
      };
    }
  }, class extends gm {
    constructor(e) {
      super(e);
    }
    static get type() {
      return "inverse-suffix-exact";
    }
    static get multiRegex() {
      return /^!"(.*)"\$$/;
    }
    static get singleRegex() {
      return /^!(.*)\$$/;
    }
    search(e) {
      const t = !e.endsWith(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [ 0, e.length - 1 ]
      };
    }
  }, class extends gm {
    constructor(e) {
      super(e);
    }
    static get type() {
      return "suffix-exact";
    }
    static get multiRegex() {
      return /^"(.*)"\$$/;
    }
    static get singleRegex() {
      return /^(.*)\$$/;
    }
    search(e) {
      const t = e.endsWith(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [ e.length - this.pattern.length, e.length - 1 ]
      };
    }
  }, class extends gm {
    constructor(e) {
      super(e);
    }
    static get type() {
      return "inverse-exact";
    }
    static get multiRegex() {
      return /^!"(.*)"$/;
    }
    static get singleRegex() {
      return /^!(.*)$/;
    }
    search(e) {
      const t = -1 === e.indexOf(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [ 0, e.length - 1 ]
      };
    }
  }, ym ], xm = wm.length, km = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
  const _m = new Set([ ym.type, bm.type ]);
  const Em = [];
  function Sm(e, t) {
    for (let n = 0, r = Em.length; n < r; n += 1) {
      let r = Em[n];
      if (r.condition(e, t)) return new r(e, t);
    }
    return new mm(e, t);
  }
  const Am = "$and", Cm = "$or", Tm = "$path", Om = "$val", Nm = e => !(!e[Am] && !e[Cm]), Mm = e => ({
    [Am]: Object.keys(e).map((t => ({
      [t]: e[t]
    })))
  });
  function Im(e, t, {auto: n = !0} = {}) {
    const r = e => {
      let a = Object.keys(e);
      const i = (e => !!e[Tm])(e);
      if (!i && a.length > 1 && !Nm(e)) return r(Mm(e));
      if ((e => !Zh(e) && Gh(e) && !Nm(e))(e)) {
        const r = i ? e[Tm] : a[0], o = i ? e[Om] : e[r];
        if (!Kh(o)) throw new Error((e => `Invalid value for key ${e}`)(r));
        const s = {
          keyId: im(r),
          pattern: o
        };
        return n && (s.searcher = Sm(o, t)), s;
      }
      let o = {
        children: [],
        operator: a[0]
      };
      return a.forEach((t => {
        const n = e[t];
        Zh(n) && n.forEach((e => {
          o.children.push(r(e));
        }));
      })), o;
    };
    return Nm(e) || (e = Mm(e)), r(e);
  }
  function Lm(e, t) {
    const n = e.matches;
    t.matches = [], Xh(n) && n.forEach((e => {
      if (!Xh(e.indices) || !e.indices.length) return;
      const {indices: n, value: r} = e;
      let a = {
        indices: n,
        value: r
      };
      e.key && (a.key = e.key.src), e.idx > -1 && (a.refIndex = e.idx), t.matches.push(a);
    }));
  }
  function jm(e, t) {
    t.score = e.score;
  }
  class Pm {
    constructor(e, t = {}, n) {
      this.options = {
        ...sm,
        ...t
      }, this.options.useExtendedSearch, this._keyStore = new nm(this.options.keys), this.setCollection(e, n);
    }
    setCollection(e, t) {
      if (this._docs = e, t && !(t instanceof um)) throw new Error("Incorrect 'index' type");
      this._myIndex = t || cm(this.options.keys, this._docs, {
        getFn: this.options.getFn,
        fieldNormWeight: this.options.fieldNormWeight
      });
    }
    add(e) {
      Xh(e) && (this._docs.push(e), this._myIndex.add(e));
    }
    remove(e = (() => !1)) {
      const t = [];
      for (let n = 0, r = this._docs.length; n < r; n += 1) {
        const a = this._docs[n];
        e(a, n) && (this.removeAt(n), n -= 1, r -= 1, t.push(a));
      }
      return t;
    }
    removeAt(e) {
      this._docs.splice(e, 1), this._myIndex.removeAt(e);
    }
    getIndex() {
      return this._myIndex;
    }
    search(e, {limit: t = -1} = {}) {
      const {includeMatches: n, includeScore: r, shouldSort: a, sortFn: i, ignoreFieldNorm: o} = this.options;
      let s = Kh(e) ? Kh(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e);
      return function(e, {ignoreFieldNorm: t = sm.ignoreFieldNorm}) {
        e.forEach((e => {
          let n = 1;
          e.matches.forEach((({key: e, norm: r, score: a}) => {
            const i = e ? e.weight : null;
            n *= Math.pow(0 === a && i ? Number.EPSILON : a, (i || 1) * (t ? 1 : r));
          })), e.score = n;
        }));
      }(s, {
        ignoreFieldNorm: o
      }), a && s.sort(i), Yh(t) && t > -1 && (s = s.slice(0, t)), function(e, t, {includeMatches: n = sm.includeMatches, includeScore: r = sm.includeScore} = {}) {
        const a = [];
        return n && a.push(Lm), r && a.push(jm), e.map((e => {
          const {idx: n} = e, r = {
            item: t[n],
            refIndex: n
          };
          return a.length && a.forEach((t => {
            t(e, r);
          })), r;
        }));
      }(s, this._docs, {
        includeMatches: n,
        includeScore: r
      });
    }
    _searchStringList(e) {
      const t = Sm(e, this.options), {records: n} = this._myIndex, r = [];
      return n.forEach((({v: e, i: n, n: a}) => {
        if (!Xh(e)) return;
        const {isMatch: i, score: o, indices: s} = t.searchIn(e);
        i && r.push({
          item: e,
          idx: n,
          matches: [ {
            score: o,
            value: e,
            norm: a,
            indices: s
          } ]
        });
      })), r;
    }
    _searchLogical(e) {
      const t = Im(e, this.options), n = (e, t, r) => {
        if (!e.children) {
          const {keyId: n, searcher: a} = e, i = this._findMatches({
            key: this._keyStore.get(n),
            value: this._myIndex.getValueForItemAtKeyId(t, n),
            searcher: a
          });
          return i && i.length ? [ {
            idx: r,
            item: t,
            matches: i
          } ] : [];
        }
        const a = [];
        for (let i = 0, o = e.children.length; i < o; i += 1) {
          const o = e.children[i], s = n(o, t, r);
          if (s.length) a.push(...s); else if (e.operator === Am) return [];
        }
        return a;
      }, r = this._myIndex.records, a = {}, i = [];
      return r.forEach((({$: e, i: r}) => {
        if (Xh(e)) {
          let o = n(t, e, r);
          o.length && (a[r] || (a[r] = {
            idx: r,
            item: e,
            matches: []
          }, i.push(a[r])), o.forEach((({matches: e}) => {
            a[r].matches.push(...e);
          })));
        }
      })), i;
    }
    _searchObjectList(e) {
      const t = Sm(e, this.options), {keys: n, records: r} = this._myIndex, a = [];
      return r.forEach((({$: e, i: r}) => {
        if (!Xh(e)) return;
        let i = [];
        n.forEach(((n, r) => {
          i.push(...this._findMatches({
            key: n,
            value: e[r],
            searcher: t
          }));
        })), i.length && a.push({
          idx: r,
          item: e,
          matches: i
        });
      })), a;
    }
    _findMatches({key: e, value: t, searcher: n}) {
      if (!Xh(t)) return [];
      let r = [];
      if (Zh(t)) t.forEach((({v: t, i: a, n: i}) => {
        if (!Xh(t)) return;
        const {isMatch: o, score: s, indices: l} = n.searchIn(t);
        o && r.push({
          score: s,
          key: e,
          value: t,
          idx: a,
          norm: i,
          indices: l
        });
      })); else {
        const {v: a, n: i} = t, {isMatch: o, score: s, indices: l} = n.searchIn(a);
        o && r.push({
          score: s,
          key: e,
          value: a,
          norm: i,
          indices: l
        });
      }
      return r;
    }
  }
  async function Rm(e) {
    const t = Fc("vertical");
    if (!t) return void await rl("Unable to find scroll container", {
      type: "error"
    });
    const {scrollTop: n} = t, r = await Pn("customScrollPositions"), a = r.get(window.location.origin + window.location.pathname) ?? new Map;
    a.set(e, n), r.set(window.location.origin + window.location.pathname, a), await Mn("customScrollPositions", r), 
    await rl(`Scroll position "${e}" saved`, {
      type: "success"
    });
  }
  async function zm(e) {
    const t = Fc("vertical"), n = [ ...(await Pn("customScrollPositions")).get(window.location.origin + window.location.pathname) ?? new Map ].map((([e, t]) => ({
      name: e,
      number: t
    }))), r = new Pm(n, {
      keys: [ "name" ]
    }).search(e)[0]?.item.number;
    r ? t?.scrollTo({
      top: r,
      behavior: Rc()
    }) : await rl(`No scroll position matching "${e}"`, {
      type: "error"
    });
  }
  Pm.version = "6.6.2", Pm.createIndex = cm, Pm.parseIndex = function(e, {getFn: t = sm.getFn, fieldNormWeight: n = sm.fieldNormWeight} = {}) {
    const {keys: r, records: a} = e, i = new um({
      getFn: t,
      fieldNormWeight: n
    });
    return i.setKeys(r), i.setIndexRecords(a), i;
  }, Pm.config = sm, Pm.parseQuery = Im, function(...e) {
    Em.push(...e);
  }(class {
    constructor(e, {isCaseSensitive: t = sm.isCaseSensitive, includeMatches: n = sm.includeMatches, minMatchCharLength: r = sm.minMatchCharLength, ignoreLocation: a = sm.ignoreLocation, findAllMatches: i = sm.findAllMatches, location: o = sm.location, threshold: s = sm.threshold, distance: l = sm.distance} = {}) {
      this.query = null, this.options = {
        isCaseSensitive: t,
        includeMatches: n,
        minMatchCharLength: r,
        findAllMatches: i,
        ignoreLocation: a,
        location: o,
        threshold: s,
        distance: l
      }, this.pattern = t ? e : e.toLowerCase(), this.query = function(e, t = {}) {
        return e.split("|").map((e => {
          let n = e.trim().split(km).filter((e => e && !!e.trim())), r = [];
          for (let e = 0, a = n.length; e < a; e += 1) {
            const a = n[e];
            let i = !1, o = -1;
            for (;!i && ++o < xm; ) {
              const e = wm[o];
              let n = e.isMultiMatch(a);
              n && (r.push(new e(n, t)), i = !0);
            }
            if (!i) for (o = -1; ++o < xm; ) {
              const e = wm[o];
              let n = e.isSingleMatch(a);
              if (n) {
                r.push(new e(n, t));
                break;
              }
            }
          }
          return r;
        }));
      }(this.pattern, this.options);
    }
    static condition(e, t) {
      return t.useExtendedSearch;
    }
    searchIn(e) {
      const t = this.query;
      if (!t) return {
        isMatch: !1,
        score: 1
      };
      const {includeMatches: n, isCaseSensitive: r} = this.options;
      e = r ? e : e.toLowerCase();
      let a = 0, i = [], o = 0;
      for (let r = 0, s = t.length; r < s; r += 1) {
        const s = t[r];
        i.length = 0, a = 0;
        for (let t = 0, r = s.length; t < r; t += 1) {
          const r = s[t], {isMatch: l, indices: u, score: c} = r.search(e);
          if (!l) {
            o = 0, a = 0, i.length = 0;
            break;
          }
          if (a += 1, o += c, n) {
            const e = r.constructor.type;
            _m.has(e) ? i = [ ...i, ...u ] : i.push(u);
          }
        }
        if (a) {
          let e = {
            isMatch: !0,
            score: o / a
          };
          return n && (e.indices = i), e;
        }
      }
      return {
        isMatch: !1,
        score: 1
      };
    }
  });
  const Dm = /^.{0,3}(previous|newer|anterior|förra|zurück|precedente|préc|前ページ|上一页).{0,3}$/i, Fm = /^.{0,3}(next|older|siguiente|próxima|nästa|weiter|successiva|suiv|次ページ|下一页).{0,3}$/i;
  function Hm() {
    qn().find((e => {
      return e.element.isConnected && yp(e.element) && (!(!(t = e.element).matches("[class*=pagination i]") || !t.matches("[class*=next i]") && !t.matches("[class*=right i]") || t.matches("[class*=prev i]")) || !!t.matches("[aria-label*='next page' i]") || !(!t.textContent || !Fm.test(t.textContent)) || t instanceof HTMLElement && "next page" === t.title.toLowerCase());
      var t;
    }))?.click();
  }
  function $m() {
    qn().find((e => {
      return e.element.isConnected && yp(e.element) && (!(!(t = e.element).matches("[class*=pagination i]") || !t.matches("[class*=prev i]") && !t.matches("[class*=left i]")) || !!t.matches("[aria-label*='previous page' i]") || !(!t.textContent || !Dm.test(t.textContent)) || t instanceof HTMLElement && "previous page" === t.title.toLowerCase());
      var t;
    }))?.click();
  }
  async function Bm() {
    await Uf(), dd = !1, pd = !1, await fd({
      hintsStyle: !0,
      hintsCharacters: !0,
      isHintable: !0
    });
  }
  async function Wm(e) {
    return Promise.allSettled([ e ]).then((([e]) => yr(e) ? [ e.value, void 0 ] : [ void 0, e.reason ]));
  }
  async function Um(e, t) {
    return new Promise(((n, r) => {
      const a = document.querySelectorAll(e);
      if (1 === a.length && n(a[0]), a.length > 1) {
        const e = Js ? function(e, t) {
          let n = null, r = Number.MAX_VALUE;
          const a = t.getBoundingClientRect();
          for (const t of e) {
            const e = t.getBoundingClientRect(), i = Math.sqrt((e.left - a.left) ** 2 + (e.top - a.top) ** 2);
            i < r && (r = i, n = t);
          }
          return n;
        }(a, Js.element) : a[0];
        n(e);
      }
      const i = setTimeout((() => {
        r();
      }), t), o = new MutationObserver((() => {
        const t = document.querySelector(e);
        t && (o.disconnect(), clearTimeout(i), n(t));
      }));
      o.observe(document.body, {
        childList: !0,
        subtree: !0
      });
    }));
  }
  async function Vm(e, t) {
    const {hostReferences: n} = await $h(), r = n.get(t);
    if (!r) return !1;
    const [a] = await Wm(Um(r, 1e3));
    if (!a) return !1;
    const i = wp(a, !1);
    return await qh({
      type: e,
      target: []
    }, [ i ]), !0;
  }
  let qm, Zm = !1;
  function Km(e) {
    return e.textContent?.replace(/\d/g, "").trim() ?? "";
  }
  async function Ym(e, t) {
    const n = await async function() {
      if (Bn().computed || Hn("alwaysComputeHintables")) return qn().filter((e => e.isHintable && gp(e.element))).map((e => ({
        element: e.element,
        isIntersectingViewport: e.isIntersectingViewport,
        trimmedTextContent: Km(e.element)
      })));
      const e = [], t = Wn(document.body, !0);
      let n;
      const r = new Promise((e => {
        n = e;
      })), a = new IntersectionObserver((t => {
        for (const n of t) bp(n.target) && gp(n.target) && e.push({
          element: n.target,
          isIntersectingViewport: n.isIntersecting,
          trimmedTextContent: Km(n.target)
        });
        n && n(!0);
      }));
      for (const e of t) a.observe(e);
      return await r, e;
    }(), r = new Pm(n, {
      keys: [ "trimmedTextContent" ],
      ignoreLocation: !0,
      includeScore: !0,
      threshold: .4
    }).search(e), a = (t ? r.sort(((e, t) => e.item.isIntersectingViewport && !t.item.isIntersectingViewport ? -1 : !e.item.isIntersectingViewport && t.item.isIntersectingViewport ? 1 : e.score - t.score)) : r)[0];
    return a?.item && (qm = a.item.element, Zm = !a.item.isIntersectingViewport), a?.score;
  }
  async function Qm(e) {
    if (qm) {
      const t = wp(qm, !1);
      Zm && qm.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center"
      }), await qh({
        type: e,
        target: []
      }, [ t ]);
    }
  }
  async function Gm(e) {
    switch (e.type) {
     case "historyGoBack":
      window.history.back();
      break;

     case "historyGoForward":
      window.history.forward();
      break;

     case "navigateToPageRoot":
      window.location.href = "/";
      break;

     case "navigateToNextPage":
      Hm();
      break;

     case "navigateToPreviousPage":
      $m();
      break;

     case "displayTogglesStatus":
      await al(!0);
      break;

     case "focusFirstInput":
      await Rp();
      break;

     case "scrollUpPage":
      $c({
        dir: "up",
        target: "page",
        factor: e.arg
      });
      break;

     case "scrollDownPage":
      $c({
        dir: "down",
        target: "page",
        factor: e.arg
      });
      break;

     case "scrollUpLeftAside":
      $c({
        dir: "up",
        target: "leftAside",
        factor: e.arg
      });
      break;

     case "scrollDownLeftAside":
      $c({
        dir: "down",
        target: "leftAside",
        factor: e.arg
      });
      break;

     case "scrollUpRightAside":
      $c({
        dir: "up",
        target: "rightAside",
        factor: e.arg
      });
      break;

     case "scrollDownRightAside":
      $c({
        dir: "down",
        target: "rightAside",
        factor: e.arg
      });
      break;

     case "scrollLeftPage":
      $c({
        dir: "left",
        target: "page",
        factor: e.arg
      });
      break;

     case "scrollRightPage":
      $c({
        dir: "right",
        target: "page",
        factor: e.arg
      });
      break;

     case "scrollUpAtElement":
      $c({
        dir: "up",
        target: "repeatLast"
      });
      break;

     case "scrollDownAtElement":
      $c({
        dir: "down",
        target: "repeatLast"
      });
      break;

     case "scrollRightAtElement":
      $c({
        dir: "right",
        target: "repeatLast"
      });
      break;

     case "scrollLeftAtElement":
      $c({
        dir: "left",
        target: "repeatLast"
      });
      break;

     case "storeScrollPosition":
      await Rm(e.arg);
      break;

     case "scrollToPosition":
      await zm(e.arg);
      break;

     case "displayExtraHints":
      await md({
        extra: !0
      });
      break;

     case "displayExcludedHints":
      await md({
        excluded: !0
      });
      break;

     case "displayLessHints":
      await md({
        extra: !1,
        excluded: !1
      });
      break;

     case "confirmSelectorsCustomization":
      await xd();
      break;

     case "resetCustomSelectors":
      await kd();
      break;

     case "includeOrExcludeMoreSelectors":
      await bd();
      break;

     case "includeOrExcludeLessSelectors":
      await wd();
      break;

     case "excludeAllHints":
      await yd();
      break;

     case "refreshHints":
      await Bm();
      break;

     case "unhoverAll":
      document.activeElement instanceof HTMLElement && document.activeElement.blur(), 
      Wc(), aa.dismiss();
      break;

     case "checkActiveElementIsEditable":
      return Boolean(document.hasFocus() && document.activeElement && or(document.activeElement));

     case "saveReferenceForActiveElement":
      await Wh(e.arg);
      break;

     case "runActionOnReference":
      return Vm(e.arg, e.arg2);

     case "showReferences":
      await Uh();
      break;

     case "removeReference":
      return Vh(e.arg);

     case "matchElementByText":
      return Ym(e.text, e.prioritizeViewport);

     case "executeActionOnTextMatchedElement":
      await Qm(e.actionType);
      break;

     default:
      await rl(`Invalid action "${e.type}"`, {
        type: "error"
      });
    }
  }
  let Xm = !1;
  const Jm = {
    attributes: !0,
    childList: !0,
    subtree: !0
  };
  async function eg() {
    const e = Bn().computed, t = Hn("alwaysComputeHintables");
    !Xm && e ? t ? ar() : await tg() : Xm && !e ? t ? rr() : (Ip(), nr()) : !Xm && t ? await tg() : Xm || t || (Ip(), 
    nr()), Xm = e;
  }
  async function tg() {
    Xm = Bn().computed, (Xm || Hn("alwaysComputeHintables")) && (document.body && kp(document.body), 
    Np.observe(document, Jm));
  }
  o = i("dBVaG"), o = i("dBVaG");
  let ng, rg, ag, ig, og, sg;
  function lg(e) {
    e && (document.title.startsWith(e.toUpperCase()) || document.title.startsWith(e.toLowerCase())) && (document.title = document.title.slice(e.length)), 
    e || (document.title = document.title.replace(/^[a-z]{1,2} \| /i, ""));
    const t = ` - ${ig ?? window.location.href}`;
    document.title.endsWith(t) && (document.title = document.title.slice(0, -t.length));
  }
  async function ug() {
    if (sg && document.title !== sg && document.title.includes(sg)) return void (sg = document.title);
    const e = await async function() {
      if (!rg) return "";
      const e = await n(o).runtime.sendMessage({
        type: "getTabMarker"
      });
      return e ? `${ag ? e.toUpperCase() : e} | ` : "";
    }(), t = ng ? ` - ${window.location.href}` : "";
    lg(e), document.title !== sg && (og = document.title), document.title = e + og + t, 
    t && (ig = window.location.href), sg = document.title;
  }
  const cg = (0, (cf = i("jLEOZ")).throttle)((async () => {
    (ng && window.location.href !== ig || document.title !== sg) && await ug();
  }), 500);
  let fg;
  async function dg() {
    if (!h()) return;
    const e = ng, t = rg, n = Bn().global;
    ng = Hn("urlInTitle"), rg = Hn("includeTabMarkers") && !(!n && Hn("hideTabMarkersWithGlobalHintsOff")), 
    ag = Hn("uppercaseTabMarkers"), (e && !ng || t && !rg) && lg(), ng || rg ? await ug() : fg?.disconnect(), 
    ng && window.addEventListener("hashchange", (async () => {
      await ug();
    })), (ng || rg) && (fg ??= new MutationObserver(cg), fg.observe(document, {
      attributes: !0,
      childList: !0,
      subtree: !0
    }));
  }
  async function pg(e) {
    let t = !1;
    for (const n of Object.keys(e)) {
      const r = e[n];
      r && r.oldValue !== r.newValue && (t = !0);
    }
    if (!t) return;
    await Fn();
    const n = Object.keys(e).some((e => e.startsWith("hintsToggle")));
    if (n && (await eg(), await al()), "alwaysComputeHintables" in e && await eg(), 
    "keyboardClicking" in e) {
      const e = Hn("keyboardClicking");
      e ? gr() : window.removeEventListener("keydown", mr, !0);
      const t = e ? "enabled" : "disabled";
      return await rl(`Keyboard clicking ${t}`, {
        icon: t,
        toastId: "keyboardToggle"
      }), void await fd({
        hintsCharacters: !0
      });
    }
    if (!("includeSingleLetterHints" in e || "useNumberHints" in e || "hintsToExclude" in e || "keysToExclude" in e)) return "customSelectors" in e ? (await Mf(), 
    fd({
      isHintable: !0
    })) : void ("urlInTitle" in e || "includeTabMarkers" in e || "uppercaseTabMarkers" in e || "hideTabMarkersWithGlobalHintsOff" in e || Object.keys(e).includes("hintsToggleGlobal") && Hn("hideTabMarkersWithGlobalHintsOff") ? await dg() : n || await fd({
      hintsStyle: !0,
      hintsPosition: !0
    }));
    await fd({
      hintsCharacters: !0
    });
  }
  function hg() {
    n(o).storage.onChanged.addListener((async e => {
      Object.keys(e).includes("hintsStacks") || kr(pn, e) && ("visible" === document.visibilityState ? await pg(e) : window.requestIdleCallback((async () => {
        await pg(e);
      })));
    }));
  }
  async function mg() {
    hg(), await f(), await Mf(), await Fn(), await dg(), await tg(), Hn("keyboardClicking") && gr();
  }
  async function gg(e) {
    const t = await m();
    return void 0 !== e.frameId && t !== e.frameId;
  }
  n(o).runtime.onMessage.addListener((async e => {
    if (!await gg(e)) {
      if ("target" in e) return qh(e);
      try {
        switch (e.type) {
         case "onCompleted":
          await Xf();
          break;

         case "displayToastNotification":
          await rl(e.text, e.options);
          break;

         case "reclaimHints":
          {
            const t = (r = e.amount, rd.splice(-r, r));
            return t.length < e.amount && t.push(...er(e.amount - t.length)), Kf(t), t;
          }

         case "updateHintsInTab":
          n = e.hints, s = n;
          break;

         case "markHintsAsKeyboardReachable":
          pr(e.letter);
          break;

         case "restoreKeyboardReachableHints":
          hr();
          break;

         case "checkIfDocumentHasFocus":
          return document.hasFocus();

         case "checkContentScriptRunning":
          return !0;

         case "updateNavigationToggle":
          t = e.enable, Dn = t, await eg(), await al();
          break;

         case "allowToastNotification":
          el = !0, setTimeout((() => {
            el = !1;
          }), 1500);
          break;

         case "tryToFocusPage":
          window.focus();
          break;

         case "getTitleBeforeDecoration":
          return og;

         case "refreshTitleDecorations":
          lg(), await dg();
          break;

         default:
          return await Gm(e);
        }
      } catch (e) {
        console.error(e);
      }
      var t, n, r;
    }
  })), (async () => {
    try {
      await mg();
    } catch (e) {
      console.error(e);
    }
  })();
})();