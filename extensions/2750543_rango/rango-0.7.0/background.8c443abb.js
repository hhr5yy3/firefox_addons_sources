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
  }, t.parcelRequire94c2 = i), i.register("bt8AJ", (function(t, n) {
    var r, a;
    e(t.exports, "register", (() => r), (e => r = e)), e(t.exports, "resolve", (() => a), (e => a = e));
    var i = {};
    r = function(e) {
      for (var t = Object.keys(e), n = 0; n < t.length; n++) i[t[n]] = e[t[n]];
    }, a = function(e) {
      var t = i[e];
      if (null == t) throw new Error("Could not resolve bundle with id " + e);
      return t;
    };
  })), i.register("dBVaG", (function(e, t) {
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
          }, s = e => 1 == e ? "argument" : "arguments", o = (e, t, n) => new Proxy(t, {
            apply: (t, r, a) => n.call(r, e, ...a)
          });
          let c = Function.call.bind(Object.prototype.hasOwnProperty);
          const u = (e, t = {}, n = {}) => {
            let r = Object.create(null), a = {
              has: (t, n) => n in e || n in r,
              get(a, l, f) {
                if (l in r) return r[l];
                if (!(l in e)) return;
                let d = e[l];
                if ("function" == typeof d) if ("function" == typeof t[l]) d = o(e, e[l], t[l]); else if (c(n, l)) {
                  let t = ((e, t) => function(n, ...r) {
                    if (r.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${s(t.minArgs)} for ${e}(), got ${r.length}`);
                    if (r.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${s(t.maxArgs)} for ${e}(), got ${r.length}`);
                    return new Promise(((a, s) => {
                      if (t.fallbackToNoCallback) try {
                        n[e](...r, i({
                          resolve: a,
                          reject: s
                        }, t));
                      } catch (i) {
                        console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, i), 
                        n[e](...r), t.fallbackToNoCallback = !1, t.noCallback = !0, a();
                      } else t.noCallback ? (n[e](...r), a()) : n[e](...r, i({
                        resolve: a,
                        reject: s
                      }, t));
                    }));
                  })(l, n[l]);
                  d = o(e, e[l], t);
                } else d = d.bind(e); else if ("object" == typeof d && null !== d && (c(t, l) || c(n, l))) d = u(d, t[l], n[l]); else {
                  if (!c(n, "*")) return Object.defineProperty(r, l, {
                    configurable: !0,
                    enumerable: !0,
                    get: () => e[l],
                    set(t) {
                      e[l] = t;
                    }
                  }), d;
                  d = u(d, t[l], n["*"]);
                }
                return r[l] = d, d;
              },
              set: (t, n, a, i) => (n in r ? r[n] = a : e[n] = a, !0),
              defineProperty: (e, t, n) => Reflect.defineProperty(r, t, n),
              deleteProperty: (e, t) => Reflect.deleteProperty(r, t)
            }, l = Object.create(e);
            return new Proxy(l, a);
          }, l = e => ({
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
          const h = new a((e => "function" != typeof e ? e : function(t, r, a) {
            let i, s, o = !1, c = new Promise((e => {
              i = function(t) {
                d || (console.warn(n, (new Error).stack), d = !0), o = !0, e(t);
              };
            }));
            try {
              s = e(t, r, i);
            } catch (e) {
              s = Promise.reject(e);
            }
            const u = !0 !== s && (l = s) && "object" == typeof l && "function" == typeof l.then;
            var l;
            if (!0 !== s && !u && !o) return !1;
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
            return f(u ? s : c), !0;
          })), p = ({reject: n, resolve: r}, a) => {
            e.runtime.lastError ? e.runtime.lastError.message === t ? r() : n(new Error(e.runtime.lastError.message)) : a && a.__mozWebExtensionPolyfillReject__ ? n(new Error(a.message)) : r(a);
          }, g = (e, t, n, ...r) => {
            if (r.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${s(t.minArgs)} for ${e}(), got ${r.length}`);
            if (r.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${s(t.maxArgs)} for ${e}(), got ${r.length}`);
            return new Promise(((e, t) => {
              const a = p.bind(null, {
                resolve: e,
                reject: t
              });
              r.push(a), n.sendMessage(...r);
            }));
          }, m = {
            devtools: {
              network: {
                onRequestFinished: l(f)
              }
            },
            runtime: {
              onMessage: l(h),
              onMessageExternal: l(h),
              sendMessage: g.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: g.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          }, y = {
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
              "*": y
            },
            services: {
              "*": y
            },
            websites: {
              "*": y
            }
          }, u(e, m, r);
        };
        if ("object" != typeof chrome || !chrome || !chrome.runtime || !chrome.runtime.id) throw new Error("This script should only be loaded in a browser extension.");
        e.exports = r(chrome);
      } else e.exports = browser;
    }, "function" == typeof define && define.amd ? define("webextension-polyfill", [ "module" ], n) : n(e);
  })), i.register("jPSnH", (function(t, n) {
    var r;
    e(t.exports, "getBundleURL", (() => r), (e => r = e));
    var a = {};
    function i(e) {
      return ("" + e).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
    }
    r = function(e) {
      var t = a[e];
      return t || (t = function() {
        try {
          throw new Error;
        } catch (t) {
          var e = ("" + t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
          if (e) return i(e[2]);
        }
        return "/";
      }(), a[e] = t), t;
    };
  })), i.register("jLEOZ", (function(e, n) {
    (function() {
      var r, a = "Expected a function", i = "__lodash_hash_undefined__", s = "__lodash_placeholder__", o = 16, c = 32, u = 64, l = 128, f = 256, d = 1 / 0, h = 9007199254740991, p = NaN, g = 4294967295, m = [ [ "ary", l ], [ "bind", 1 ], [ "bindKey", 2 ], [ "curry", 8 ], [ "curryRight", o ], [ "flip", 512 ], [ "partial", c ], [ "partialRight", u ], [ "rearg", f ] ], y = "[object Arguments]", v = "[object Array]", b = "[object Boolean]", _ = "[object Date]", w = "[object Error]", x = "[object Function]", k = "[object GeneratorFunction]", A = "[object Map]", T = "[object Number]", M = "[object Object]", j = "[object Promise]", S = "[object RegExp]", C = "[object Set]", I = "[object String]", E = "[object Symbol]", O = "[object WeakMap]", N = "[object ArrayBuffer]", R = "[object DataView]", L = "[object Float32Array]", P = "[object Float64Array]", Z = "[object Int8Array]", z = "[object Int16Array]", $ = "[object Int32Array]", B = "[object Uint8Array]", q = "[object Uint8ClampedArray]", F = "[object Uint16Array]", U = "[object Uint32Array]", W = /\b__p \+= '';/g, D = /\b(__p \+=) '' \+/g, V = /(__e\(.*?\)|\b__t\)) \+\n'';/g, H = /&(?:amp|lt|gt|quot|#39);/g, K = /[&<>"']/g, G = RegExp(H.source), J = RegExp(K.source), Y = /<%-([\s\S]+?)%>/g, Q = /<%([\s\S]+?)%>/g, X = /<%=([\s\S]+?)%>/g, ee = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, te = /^\w*$/, ne = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, re = /[\\^$.*+?()[\]{}|]/g, ae = RegExp(re.source), ie = /^\s+/, se = /\s/, oe = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ce = /\{\n\/\* \[wrapped with (.+)\] \*/, ue = /,? & /, le = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, fe = /[()=,{}\[\]\/\s]/, de = /\\(\\)?/g, he = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, pe = /\w*$/, ge = /^[-+]0x[0-9a-f]+$/i, me = /^0b[01]+$/i, ye = /^\[object .+?Constructor\]$/, ve = /^0o[0-7]+$/i, be = /^(?:0|[1-9]\d*)$/, _e = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, we = /($^)/, xe = /['\n\r\u2028\u2029\\]/g, ke = "\ud800-\udfff", Ae = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", Te = "\\u2700-\\u27bf", Me = "a-z\\xdf-\\xf6\\xf8-\\xff", je = "A-Z\\xc0-\\xd6\\xd8-\\xde", Se = "\\ufe0e\\ufe0f", Ce = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ie = "['’]", Ee = "[\ud800-\udfff]", Oe = "[" + Ce + "]", Ne = "[" + Ae + "]", Re = "\\d+", Le = "[" + Te + "]", Pe = "[" + Me + "]", Ze = "[^" + ke + Ce + Re + Te + Me + je + "]", ze = "\ud83c[\udffb-\udfff]", $e = "[^\ud800-\udfff]", Be = "(?:\ud83c[\udde6-\uddff]){2}", qe = "[\ud800-\udbff][\udc00-\udfff]", Fe = "[" + je + "]", Ue = "\\u200d", We = "(?:" + Pe + "|" + Ze + ")", De = "(?:" + Fe + "|" + Ze + ")", Ve = "(?:['’](?:d|ll|m|re|s|t|ve))?", He = "(?:['’](?:D|LL|M|RE|S|T|VE))?", Ke = "(?:" + Ne + "|" + ze + ")" + "?", Ge = "[" + Se + "]?", Je = Ge + Ke + ("(?:" + Ue + "(?:" + [ $e, Be, qe ].join("|") + ")" + Ge + Ke + ")*"), Ye = "(?:" + [ Le, Be, qe ].join("|") + ")" + Je, Qe = "(?:" + [ $e + Ne + "?", Ne, Be, qe, Ee ].join("|") + ")", Xe = RegExp(Ie, "g"), et = RegExp(Ne, "g"), tt = RegExp(ze + "(?=" + ze + ")|" + Qe + Je, "g"), nt = RegExp([ Fe + "?" + Pe + "+" + Ve + "(?=" + [ Oe, Fe, "$" ].join("|") + ")", De + "+" + He + "(?=" + [ Oe, Fe + We, "$" ].join("|") + ")", Fe + "?" + We + "+" + Ve, Fe + "+" + He, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Re, Ye ].join("|"), "g"), rt = RegExp("[" + Ue + ke + Ae + Se + "]"), at = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, it = [ "Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout" ], st = -1, ot = {};
      ot[L] = ot[P] = ot[Z] = ot[z] = ot[$] = ot[B] = ot[q] = ot[F] = ot[U] = !0, ot[y] = ot[v] = ot[N] = ot[b] = ot[R] = ot[_] = ot[w] = ot[x] = ot[A] = ot[T] = ot[M] = ot[S] = ot[C] = ot[I] = ot[O] = !1;
      var ct = {};
      ct[y] = ct[v] = ct[N] = ct[R] = ct[b] = ct[_] = ct[L] = ct[P] = ct[Z] = ct[z] = ct[$] = ct[A] = ct[T] = ct[M] = ct[S] = ct[C] = ct[I] = ct[E] = ct[B] = ct[q] = ct[F] = ct[U] = !0, 
      ct[w] = ct[x] = ct[O] = !1;
      var ut = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, lt = parseFloat, ft = parseInt, dt = "object" == typeof t && t && t.Object === Object && t, ht = "object" == typeof self && self && self.Object === Object && self, pt = dt || ht || Function("return this")(), gt = n && !n.nodeType && n, mt = gt && e && !e.nodeType && e, yt = mt && mt.exports === gt, vt = yt && dt.process, bt = function() {
        try {
          var e = mt && mt.require && mt.require("util").types;
          return e || vt && vt.binding && vt.binding("util");
        } catch (e) {}
      }(), _t = bt && bt.isArrayBuffer, wt = bt && bt.isDate, xt = bt && bt.isMap, kt = bt && bt.isRegExp, At = bt && bt.isSet, Tt = bt && bt.isTypedArray;
      function Mt(e, t, n) {
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
      function jt(e, t, n, r) {
        for (var a = -1, i = null == e ? 0 : e.length; ++a < i; ) {
          var s = e[a];
          t(r, s, n(s), e);
        }
        return r;
      }
      function St(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length; ++n < r && !1 !== t(e[n], n, e); ) ;
        return e;
      }
      function Ct(e, t) {
        for (var n = null == e ? 0 : e.length; n-- && !1 !== t(e[n], n, e); ) ;
        return e;
      }
      function It(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length; ++n < r; ) if (!t(e[n], n, e)) return !1;
        return !0;
      }
      function Et(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length, a = 0, i = []; ++n < r; ) {
          var s = e[n];
          t(s, n, e) && (i[a++] = s);
        }
        return i;
      }
      function Ot(e, t) {
        return !!(null == e ? 0 : e.length) && Ft(e, t, 0) > -1;
      }
      function Nt(e, t, n) {
        for (var r = -1, a = null == e ? 0 : e.length; ++r < a; ) if (n(t, e[r])) return !0;
        return !1;
      }
      function Rt(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length, a = Array(r); ++n < r; ) a[n] = t(e[n], n, e);
        return a;
      }
      function Lt(e, t) {
        for (var n = -1, r = t.length, a = e.length; ++n < r; ) e[a + n] = t[n];
        return e;
      }
      function Pt(e, t, n, r) {
        var a = -1, i = null == e ? 0 : e.length;
        for (r && i && (n = e[++a]); ++a < i; ) n = t(n, e[a], a, e);
        return n;
      }
      function Zt(e, t, n, r) {
        var a = null == e ? 0 : e.length;
        for (r && a && (n = e[--a]); a--; ) n = t(n, e[a], a, e);
        return n;
      }
      function zt(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length; ++n < r; ) if (t(e[n], n, e)) return !0;
        return !1;
      }
      var $t = Vt("length");
      function Bt(e, t, n) {
        var r;
        return n(e, (function(e, n, a) {
          if (t(e, n, a)) return r = n, !1;
        })), r;
      }
      function qt(e, t, n, r) {
        for (var a = e.length, i = n + (r ? 1 : -1); r ? i-- : ++i < a; ) if (t(e[i], i, e)) return i;
        return -1;
      }
      function Ft(e, t, n) {
        return t == t ? function(e, t, n) {
          var r = n - 1, a = e.length;
          for (;++r < a; ) if (e[r] === t) return r;
          return -1;
        }(e, t, n) : qt(e, Wt, n);
      }
      function Ut(e, t, n, r) {
        for (var a = n - 1, i = e.length; ++a < i; ) if (r(e[a], t)) return a;
        return -1;
      }
      function Wt(e) {
        return e != e;
      }
      function Dt(e, t) {
        var n = null == e ? 0 : e.length;
        return n ? Gt(e, t) / n : p;
      }
      function Vt(e) {
        return function(t) {
          return null == t ? r : t[e];
        };
      }
      function Ht(e) {
        return function(t) {
          return null == e ? r : e[t];
        };
      }
      function Kt(e, t, n, r, a) {
        return a(e, (function(e, a, i) {
          n = r ? (r = !1, e) : t(n, e, a, i);
        })), n;
      }
      function Gt(e, t) {
        for (var n, a = -1, i = e.length; ++a < i; ) {
          var s = t(e[a]);
          s !== r && (n = n === r ? s : n + s);
        }
        return n;
      }
      function Jt(e, t) {
        for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
        return r;
      }
      function Yt(e) {
        return e ? e.slice(0, gn(e) + 1).replace(ie, "") : e;
      }
      function Qt(e) {
        return function(t) {
          return e(t);
        };
      }
      function Xt(e, t) {
        return Rt(t, (function(t) {
          return e[t];
        }));
      }
      function en(e, t) {
        return e.has(t);
      }
      function tn(e, t) {
        for (var n = -1, r = e.length; ++n < r && Ft(t, e[n], 0) > -1; ) ;
        return n;
      }
      function nn(e, t) {
        for (var n = e.length; n-- && Ft(t, e[n], 0) > -1; ) ;
        return n;
      }
      function rn(e, t) {
        for (var n = e.length, r = 0; n--; ) e[n] === t && ++r;
        return r;
      }
      var an = Ht({
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
      }), sn = Ht({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      });
      function on(e) {
        return "\\" + ut[e];
      }
      function cn(e) {
        return rt.test(e);
      }
      function un(e) {
        var t = -1, n = Array(e.size);
        return e.forEach((function(e, r) {
          n[++t] = [ r, e ];
        })), n;
      }
      function ln(e, t) {
        return function(n) {
          return e(t(n));
        };
      }
      function fn(e, t) {
        for (var n = -1, r = e.length, a = 0, i = []; ++n < r; ) {
          var o = e[n];
          o !== t && o !== s || (e[n] = s, i[a++] = n);
        }
        return i;
      }
      function dn(e) {
        var t = -1, n = Array(e.size);
        return e.forEach((function(e) {
          n[++t] = e;
        })), n;
      }
      function hn(e) {
        return cn(e) ? function(e) {
          var t = tt.lastIndex = 0;
          for (;tt.test(e); ) ++t;
          return t;
        }(e) : $t(e);
      }
      function pn(e) {
        return cn(e) ? function(e) {
          return e.match(tt) || [];
        }(e) : function(e) {
          return e.split("");
        }(e);
      }
      function gn(e) {
        for (var t = e.length; t-- && se.test(e.charAt(t)); ) ;
        return t;
      }
      var mn = Ht({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      });
      var yn = function e(t) {
        var n, se = (t = null == t ? pt : yn.defaults(pt.Object(), t, yn.pick(pt, it))).Array, ke = t.Date, Ae = t.Error, Te = t.Function, Me = t.Math, je = t.Object, Se = t.RegExp, Ce = t.String, Ie = t.TypeError, Ee = se.prototype, Oe = Te.prototype, Ne = je.prototype, Re = t["__core-js_shared__"], Le = Oe.toString, Pe = Ne.hasOwnProperty, Ze = 0, ze = (n = /[^.]+$/.exec(Re && Re.keys && Re.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "", $e = Ne.toString, Be = Le.call(je), qe = pt._, Fe = Se("^" + Le.call(Pe).replace(re, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Ue = yt ? t.Buffer : r, We = t.Symbol, De = t.Uint8Array, Ve = Ue ? Ue.allocUnsafe : r, He = ln(je.getPrototypeOf, je), Ke = je.create, Ge = Ne.propertyIsEnumerable, Je = Ee.splice, Ye = We ? We.isConcatSpreadable : r, Qe = We ? We.iterator : r, tt = We ? We.toStringTag : r, rt = function() {
          try {
            var e = di(je, "defineProperty");
            return e({}, "", {}), e;
          } catch (e) {}
        }(), ut = t.clearTimeout !== pt.clearTimeout && t.clearTimeout, dt = ke && ke.now !== pt.Date.now && ke.now, ht = t.setTimeout !== pt.setTimeout && t.setTimeout, gt = Me.ceil, mt = Me.floor, vt = je.getOwnPropertySymbols, bt = Ue ? Ue.isBuffer : r, $t = t.isFinite, Ht = Ee.join, vn = ln(je.keys, je), bn = Me.max, _n = Me.min, wn = ke.now, xn = t.parseInt, kn = Me.random, An = Ee.reverse, Tn = di(t, "DataView"), Mn = di(t, "Map"), jn = di(t, "Promise"), Sn = di(t, "Set"), Cn = di(t, "WeakMap"), In = di(je, "create"), En = Cn && new Cn, On = {}, Nn = $i(Tn), Rn = $i(Mn), Ln = $i(jn), Pn = $i(Sn), Zn = $i(Cn), zn = We ? We.prototype : r, $n = zn ? zn.valueOf : r, Bn = zn ? zn.toString : r;
        function qn(e) {
          if (no(e) && !Ds(e) && !(e instanceof Dn)) {
            if (e instanceof Wn) return e;
            if (Pe.call(e, "__wrapped__")) return Bi(e);
          }
          return new Wn(e);
        }
        var Fn = function() {
          function e() {}
          return function(t) {
            if (!to(t)) return {};
            if (Ke) return Ke(t);
            e.prototype = t;
            var n = new e;
            return e.prototype = r, n;
          };
        }();
        function Un() {}
        function Wn(e, t) {
          this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, 
          this.__values__ = r;
        }
        function Dn(e) {
          this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, 
          this.__iteratees__ = [], this.__takeCount__ = g, this.__views__ = [];
        }
        function Vn(e) {
          var t = -1, n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function Hn(e) {
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
        function Gn(e) {
          var t = -1, n = null == e ? 0 : e.length;
          for (this.__data__ = new Kn; ++t < n; ) this.add(e[t]);
        }
        function Jn(e) {
          var t = this.__data__ = new Hn(e);
          this.size = t.size;
        }
        function Yn(e, t) {
          var n = Ds(e), r = !n && Ws(e), a = !n && !r && Gs(e), i = !n && !r && !a && lo(e), s = n || r || a || i, o = s ? Jt(e.length, Ce) : [], c = o.length;
          for (var u in e) !t && !Pe.call(e, u) || s && ("length" == u || a && ("offset" == u || "parent" == u) || i && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || bi(u, c)) || o.push(u);
          return o;
        }
        function Qn(e) {
          var t = e.length;
          return t ? e[Gr(0, t - 1)] : r;
        }
        function Xn(e, t) {
          return Pi(Ia(e), cr(t, 0, e.length));
        }
        function er(e) {
          return Pi(Ia(e));
        }
        function tr(e, t, n) {
          (n !== r && !qs(e[t], n) || n === r && !(t in e)) && sr(e, t, n);
        }
        function nr(e, t, n) {
          var a = e[t];
          Pe.call(e, t) && qs(a, n) && (n !== r || t in e) || sr(e, t, n);
        }
        function rr(e, t) {
          for (var n = e.length; n--; ) if (qs(e[n][0], t)) return n;
          return -1;
        }
        function ar(e, t, n, r) {
          return hr(e, (function(e, a, i) {
            t(r, e, n(e), i);
          })), r;
        }
        function ir(e, t) {
          return e && Ea(t, No(t), e);
        }
        function sr(e, t, n) {
          "__proto__" == t && rt ? rt(e, t, {
            configurable: !0,
            enumerable: !0,
            value: n,
            writable: !0
          }) : e[t] = n;
        }
        function or(e, t) {
          for (var n = -1, a = t.length, i = se(a), s = null == e; ++n < a; ) i[n] = s ? r : So(e, t[n]);
          return i;
        }
        function cr(e, t, n) {
          return e == e && (n !== r && (e = e <= n ? e : n), t !== r && (e = e >= t ? e : t)), 
          e;
        }
        function ur(e, t, n, a, i, s) {
          var o, c = 1 & t, u = 2 & t, l = 4 & t;
          if (n && (o = i ? n(e, a, i, s) : n(e)), o !== r) return o;
          if (!to(e)) return e;
          var f = Ds(e);
          if (f) {
            if (o = function(e) {
              var t = e.length, n = new e.constructor(t);
              t && "string" == typeof e[0] && Pe.call(e, "index") && (n.index = e.index, n.input = e.input);
              return n;
            }(e), !c) return Ia(e, o);
          } else {
            var d = gi(e), h = d == x || d == k;
            if (Gs(e)) return Aa(e, c);
            if (d == M || d == y || h && !i) {
              if (o = u || h ? {} : yi(e), !c) return u ? function(e, t) {
                return Ea(e, pi(e), t);
              }(e, function(e, t) {
                return e && Ea(t, Ro(t), e);
              }(o, e)) : function(e, t) {
                return Ea(e, hi(e), t);
              }(e, ir(o, e));
            } else {
              if (!ct[d]) return i ? e : {};
              o = function(e, t, n) {
                var r = e.constructor;
                switch (t) {
                 case N:
                  return Ta(e);

                 case b:
                 case _:
                  return new r(+e);

                 case R:
                  return function(e, t) {
                    var n = t ? Ta(e.buffer) : e.buffer;
                    return new e.constructor(n, e.byteOffset, e.byteLength);
                  }(e, n);

                 case L:
                 case P:
                 case Z:
                 case z:
                 case $:
                 case B:
                 case q:
                 case F:
                 case U:
                  return Ma(e, n);

                 case A:
                  return new r;

                 case T:
                 case I:
                  return new r(e);

                 case S:
                  return function(e) {
                    var t = new e.constructor(e.source, pe.exec(e));
                    return t.lastIndex = e.lastIndex, t;
                  }(e);

                 case C:
                  return new r;

                 case E:
                  return a = e, $n ? je($n.call(a)) : {};
                }
                var a;
              }(e, d, c);
            }
          }
          s || (s = new Jn);
          var p = s.get(e);
          if (p) return p;
          s.set(e, o), oo(e) ? e.forEach((function(r) {
            o.add(ur(r, t, n, r, e, s));
          })) : ro(e) && e.forEach((function(r, a) {
            o.set(a, ur(r, t, n, a, e, s));
          }));
          var g = f ? r : (l ? u ? ii : ai : u ? Ro : No)(e);
          return St(g || e, (function(r, a) {
            g && (r = e[a = r]), nr(o, a, ur(r, t, n, a, e, s));
          })), o;
        }
        function lr(e, t, n) {
          var a = n.length;
          if (null == e) return !a;
          for (e = je(e); a--; ) {
            var i = n[a], s = t[i], o = e[i];
            if (o === r && !(i in e) || !s(o)) return !1;
          }
          return !0;
        }
        function fr(e, t, n) {
          if ("function" != typeof e) throw new Ie(a);
          return Oi((function() {
            e.apply(r, n);
          }), t);
        }
        function dr(e, t, n, r) {
          var a = -1, i = Ot, s = !0, o = e.length, c = [], u = t.length;
          if (!o) return c;
          n && (t = Rt(t, Qt(n))), r ? (i = Nt, s = !1) : t.length >= 200 && (i = en, s = !1, 
          t = new Gn(t));
          e: for (;++a < o; ) {
            var l = e[a], f = null == n ? l : n(l);
            if (l = r || 0 !== l ? l : 0, s && f == f) {
              for (var d = u; d--; ) if (t[d] === f) continue e;
              c.push(l);
            } else i(t, f, r) || c.push(l);
          }
          return c;
        }
        qn.templateSettings = {
          escape: Y,
          evaluate: Q,
          interpolate: X,
          variable: "",
          imports: {
            _: qn
          }
        }, qn.prototype = Un.prototype, qn.prototype.constructor = qn, Wn.prototype = Fn(Un.prototype), 
        Wn.prototype.constructor = Wn, Dn.prototype = Fn(Un.prototype), Dn.prototype.constructor = Dn, 
        Vn.prototype.clear = function() {
          this.__data__ = In ? In(null) : {}, this.size = 0;
        }, Vn.prototype.delete = function(e) {
          var t = this.has(e) && delete this.__data__[e];
          return this.size -= t ? 1 : 0, t;
        }, Vn.prototype.get = function(e) {
          var t = this.__data__;
          if (In) {
            var n = t[e];
            return n === i ? r : n;
          }
          return Pe.call(t, e) ? t[e] : r;
        }, Vn.prototype.has = function(e) {
          var t = this.__data__;
          return In ? t[e] !== r : Pe.call(t, e);
        }, Vn.prototype.set = function(e, t) {
          var n = this.__data__;
          return this.size += this.has(e) ? 0 : 1, n[e] = In && t === r ? i : t, this;
        }, Hn.prototype.clear = function() {
          this.__data__ = [], this.size = 0;
        }, Hn.prototype.delete = function(e) {
          var t = this.__data__, n = rr(t, e);
          return !(n < 0) && (n == t.length - 1 ? t.pop() : Je.call(t, n, 1), --this.size, 
          !0);
        }, Hn.prototype.get = function(e) {
          var t = this.__data__, n = rr(t, e);
          return n < 0 ? r : t[n][1];
        }, Hn.prototype.has = function(e) {
          return rr(this.__data__, e) > -1;
        }, Hn.prototype.set = function(e, t) {
          var n = this.__data__, r = rr(n, e);
          return r < 0 ? (++this.size, n.push([ e, t ])) : n[r][1] = t, this;
        }, Kn.prototype.clear = function() {
          this.size = 0, this.__data__ = {
            hash: new Vn,
            map: new (Mn || Hn),
            string: new Vn
          };
        }, Kn.prototype.delete = function(e) {
          var t = li(this, e).delete(e);
          return this.size -= t ? 1 : 0, t;
        }, Kn.prototype.get = function(e) {
          return li(this, e).get(e);
        }, Kn.prototype.has = function(e) {
          return li(this, e).has(e);
        }, Kn.prototype.set = function(e, t) {
          var n = li(this, e), r = n.size;
          return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
        }, Gn.prototype.add = Gn.prototype.push = function(e) {
          return this.__data__.set(e, i), this;
        }, Gn.prototype.has = function(e) {
          return this.__data__.has(e);
        }, Jn.prototype.clear = function() {
          this.__data__ = new Hn, this.size = 0;
        }, Jn.prototype.delete = function(e) {
          var t = this.__data__, n = t.delete(e);
          return this.size = t.size, n;
        }, Jn.prototype.get = function(e) {
          return this.__data__.get(e);
        }, Jn.prototype.has = function(e) {
          return this.__data__.has(e);
        }, Jn.prototype.set = function(e, t) {
          var n = this.__data__;
          if (n instanceof Hn) {
            var r = n.__data__;
            if (!Mn || r.length < 199) return r.push([ e, t ]), this.size = ++n.size, this;
            n = this.__data__ = new Kn(r);
          }
          return n.set(e, t), this.size = n.size, this;
        };
        var hr = Ra(wr), pr = Ra(xr, !0);
        function gr(e, t) {
          var n = !0;
          return hr(e, (function(e, r, a) {
            return n = !!t(e, r, a);
          })), n;
        }
        function mr(e, t, n) {
          for (var a = -1, i = e.length; ++a < i; ) {
            var s = e[a], o = t(s);
            if (null != o && (c === r ? o == o && !uo(o) : n(o, c))) var c = o, u = s;
          }
          return u;
        }
        function yr(e, t) {
          var n = [];
          return hr(e, (function(e, r, a) {
            t(e, r, a) && n.push(e);
          })), n;
        }
        function vr(e, t, n, r, a) {
          var i = -1, s = e.length;
          for (n || (n = vi), a || (a = []); ++i < s; ) {
            var o = e[i];
            t > 0 && n(o) ? t > 1 ? vr(o, t - 1, n, r, a) : Lt(a, o) : r || (a[a.length] = o);
          }
          return a;
        }
        var br = La(), _r = La(!0);
        function wr(e, t) {
          return e && br(e, t, No);
        }
        function xr(e, t) {
          return e && _r(e, t, No);
        }
        function kr(e, t) {
          return Et(t, (function(t) {
            return Qs(e[t]);
          }));
        }
        function Ar(e, t) {
          for (var n = 0, a = (t = _a(t, e)).length; null != e && n < a; ) e = e[zi(t[n++])];
          return n && n == a ? e : r;
        }
        function Tr(e, t, n) {
          var r = t(e);
          return Ds(e) ? r : Lt(r, n(e));
        }
        function Mr(e) {
          return null == e ? e === r ? "[object Undefined]" : "[object Null]" : tt && tt in je(e) ? function(e) {
            var t = Pe.call(e, tt), n = e[tt];
            try {
              e[tt] = r;
              var a = !0;
            } catch (e) {}
            var i = $e.call(e);
            a && (t ? e[tt] = n : delete e[tt]);
            return i;
          }(e) : function(e) {
            return $e.call(e);
          }(e);
        }
        function jr(e, t) {
          return e > t;
        }
        function Sr(e, t) {
          return null != e && Pe.call(e, t);
        }
        function Cr(e, t) {
          return null != e && t in je(e);
        }
        function Ir(e, t, n) {
          for (var a = n ? Nt : Ot, i = e[0].length, s = e.length, o = s, c = se(s), u = 1 / 0, l = []; o--; ) {
            var f = e[o];
            o && t && (f = Rt(f, Qt(t))), u = _n(f.length, u), c[o] = !n && (t || i >= 120 && f.length >= 120) ? new Gn(o && f) : r;
          }
          f = e[0];
          var d = -1, h = c[0];
          e: for (;++d < i && l.length < u; ) {
            var p = f[d], g = t ? t(p) : p;
            if (p = n || 0 !== p ? p : 0, !(h ? en(h, g) : a(l, g, n))) {
              for (o = s; --o; ) {
                var m = c[o];
                if (!(m ? en(m, g) : a(e[o], g, n))) continue e;
              }
              h && h.push(g), l.push(p);
            }
          }
          return l;
        }
        function Er(e, t, n) {
          var a = null == (e = Si(e, t = _a(t, e))) ? e : e[zi(Yi(t))];
          return null == a ? r : Mt(a, e, n);
        }
        function Or(e) {
          return no(e) && Mr(e) == y;
        }
        function Nr(e, t, n, a, i) {
          return e === t || (null == e || null == t || !no(e) && !no(t) ? e != e && t != t : function(e, t, n, a, i, s) {
            var o = Ds(e), c = Ds(t), u = o ? v : gi(e), l = c ? v : gi(t), f = (u = u == y ? M : u) == M, d = (l = l == y ? M : l) == M, h = u == l;
            if (h && Gs(e)) {
              if (!Gs(t)) return !1;
              o = !0, f = !1;
            }
            if (h && !f) return s || (s = new Jn), o || lo(e) ? ni(e, t, n, a, i, s) : function(e, t, n, r, a, i, s) {
              switch (n) {
               case R:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                e = e.buffer, t = t.buffer;

               case N:
                return !(e.byteLength != t.byteLength || !i(new De(e), new De(t)));

               case b:
               case _:
               case T:
                return qs(+e, +t);

               case w:
                return e.name == t.name && e.message == t.message;

               case S:
               case I:
                return e == t + "";

               case A:
                var o = un;

               case C:
                var c = 1 & r;
                if (o || (o = dn), e.size != t.size && !c) return !1;
                var u = s.get(e);
                if (u) return u == t;
                r |= 2, s.set(e, t);
                var l = ni(o(e), o(t), r, a, i, s);
                return s.delete(e), l;

               case E:
                if ($n) return $n.call(e) == $n.call(t);
              }
              return !1;
            }(e, t, u, n, a, i, s);
            if (!(1 & n)) {
              var p = f && Pe.call(e, "__wrapped__"), g = d && Pe.call(t, "__wrapped__");
              if (p || g) {
                var m = p ? e.value() : e, x = g ? t.value() : t;
                return s || (s = new Jn), i(m, x, n, a, s);
              }
            }
            return !!h && (s || (s = new Jn), function(e, t, n, a, i, s) {
              var o = 1 & n, c = ai(e), u = c.length, l = ai(t), f = l.length;
              if (u != f && !o) return !1;
              var d = u;
              for (;d--; ) {
                var h = c[d];
                if (!(o ? h in t : Pe.call(t, h))) return !1;
              }
              var p = s.get(e), g = s.get(t);
              if (p && g) return p == t && g == e;
              var m = !0;
              s.set(e, t), s.set(t, e);
              var y = o;
              for (;++d < u; ) {
                var v = e[h = c[d]], b = t[h];
                if (a) var _ = o ? a(b, v, h, t, e, s) : a(v, b, h, e, t, s);
                if (!(_ === r ? v === b || i(v, b, n, a, s) : _)) {
                  m = !1;
                  break;
                }
                y || (y = "constructor" == h);
              }
              if (m && !y) {
                var w = e.constructor, x = t.constructor;
                w == x || !("constructor" in e) || !("constructor" in t) || "function" == typeof w && w instanceof w && "function" == typeof x && x instanceof x || (m = !1);
              }
              return s.delete(e), s.delete(t), m;
            }(e, t, n, a, i, s));
          }(e, t, n, a, Nr, i));
        }
        function Rr(e, t, n, a) {
          var i = n.length, s = i, o = !a;
          if (null == e) return !s;
          for (e = je(e); i--; ) {
            var c = n[i];
            if (o && c[2] ? c[1] !== e[c[0]] : !(c[0] in e)) return !1;
          }
          for (;++i < s; ) {
            var u = (c = n[i])[0], l = e[u], f = c[1];
            if (o && c[2]) {
              if (l === r && !(u in e)) return !1;
            } else {
              var d = new Jn;
              if (a) var h = a(l, f, u, e, t, d);
              if (!(h === r ? Nr(f, l, 3, a, d) : h)) return !1;
            }
          }
          return !0;
        }
        function Lr(e) {
          return !(!to(e) || (t = e, ze && ze in t)) && (Qs(e) ? Fe : ye).test($i(e));
          var t;
        }
        function Pr(e) {
          return "function" == typeof e ? e : null == e ? ic : "object" == typeof e ? Ds(e) ? Fr(e[0], e[1]) : qr(e) : pc(e);
        }
        function Zr(e) {
          if (!Ai(e)) return vn(e);
          var t = [];
          for (var n in je(e)) Pe.call(e, n) && "constructor" != n && t.push(n);
          return t;
        }
        function zr(e) {
          if (!to(e)) return function(e) {
            var t = [];
            if (null != e) for (var n in je(e)) t.push(n);
            return t;
          }(e);
          var t = Ai(e), n = [];
          for (var r in e) ("constructor" != r || !t && Pe.call(e, r)) && n.push(r);
          return n;
        }
        function $r(e, t) {
          return e < t;
        }
        function Br(e, t) {
          var n = -1, r = Hs(e) ? se(e.length) : [];
          return hr(e, (function(e, a, i) {
            r[++n] = t(e, a, i);
          })), r;
        }
        function qr(e) {
          var t = fi(e);
          return 1 == t.length && t[0][2] ? Mi(t[0][0], t[0][1]) : function(n) {
            return n === e || Rr(n, e, t);
          };
        }
        function Fr(e, t) {
          return wi(e) && Ti(t) ? Mi(zi(e), t) : function(n) {
            var a = So(n, e);
            return a === r && a === t ? Co(n, e) : Nr(t, a, 3);
          };
        }
        function Ur(e, t, n, a, i) {
          e !== t && br(t, (function(s, o) {
            if (i || (i = new Jn), to(s)) !function(e, t, n, a, i, s, o) {
              var c = Ii(e, n), u = Ii(t, n), l = o.get(u);
              if (l) return void tr(e, n, l);
              var f = s ? s(c, u, n + "", e, t, o) : r, d = f === r;
              if (d) {
                var h = Ds(u), p = !h && Gs(u), g = !h && !p && lo(u);
                f = u, h || p || g ? Ds(c) ? f = c : Ks(c) ? f = Ia(c) : p ? (d = !1, f = Aa(u, !0)) : g ? (d = !1, 
                f = Ma(u, !0)) : f = [] : io(u) || Ws(u) ? (f = c, Ws(c) ? f = bo(c) : to(c) && !Qs(c) || (f = yi(u))) : d = !1;
              }
              d && (o.set(u, f), i(f, u, a, s, o), o.delete(u));
              tr(e, n, f);
            }(e, t, o, n, Ur, a, i); else {
              var c = a ? a(Ii(e, o), s, o + "", e, t, i) : r;
              c === r && (c = s), tr(e, o, c);
            }
          }), Ro);
        }
        function Wr(e, t) {
          var n = e.length;
          if (n) return bi(t += t < 0 ? n : 0, n) ? e[t] : r;
        }
        function Dr(e, t, n) {
          t = t.length ? Rt(t, (function(e) {
            return Ds(e) ? function(t) {
              return Ar(t, 1 === e.length ? e[0] : e);
            } : e;
          })) : [ ic ];
          var r = -1;
          t = Rt(t, Qt(ui()));
          var a = Br(e, (function(e, n, a) {
            var i = Rt(t, (function(t) {
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
              var r = -1, a = e.criteria, i = t.criteria, s = a.length, o = n.length;
              for (;++r < s; ) {
                var c = ja(a[r], i[r]);
                if (c) return r >= o ? c : c * ("desc" == n[r] ? -1 : 1);
              }
              return e.index - t.index;
            }(e, t, n);
          }));
        }
        function Vr(e, t, n) {
          for (var r = -1, a = t.length, i = {}; ++r < a; ) {
            var s = t[r], o = Ar(e, s);
            n(o, s) && ea(i, _a(s, e), o);
          }
          return i;
        }
        function Hr(e, t, n, r) {
          var a = r ? Ut : Ft, i = -1, s = t.length, o = e;
          for (e === t && (t = Ia(t)), n && (o = Rt(e, Qt(n))); ++i < s; ) for (var c = 0, u = t[i], l = n ? n(u) : u; (c = a(o, l, c, r)) > -1; ) o !== e && Je.call(o, c, 1), 
          Je.call(e, c, 1);
          return e;
        }
        function Kr(e, t) {
          for (var n = e ? t.length : 0, r = n - 1; n--; ) {
            var a = t[n];
            if (n == r || a !== i) {
              var i = a;
              bi(a) ? Je.call(e, a, 1) : da(e, a);
            }
          }
          return e;
        }
        function Gr(e, t) {
          return e + mt(kn() * (t - e + 1));
        }
        function Jr(e, t) {
          var n = "";
          if (!e || t < 1 || t > h) return n;
          do {
            t % 2 && (n += e), (t = mt(t / 2)) && (e += e);
          } while (t);
          return n;
        }
        function Yr(e, t) {
          return Ni(ji(e, t, ic), e + "");
        }
        function Qr(e) {
          return Qn(Fo(e));
        }
        function Xr(e, t) {
          var n = Fo(e);
          return Pi(n, cr(t, 0, n.length));
        }
        function ea(e, t, n, a) {
          if (!to(e)) return e;
          for (var i = -1, s = (t = _a(t, e)).length, o = s - 1, c = e; null != c && ++i < s; ) {
            var u = zi(t[i]), l = n;
            if ("__proto__" === u || "constructor" === u || "prototype" === u) return e;
            if (i != o) {
              var f = c[u];
              (l = a ? a(f, u, c) : r) === r && (l = to(f) ? f : bi(t[i + 1]) ? [] : {});
            }
            nr(c, u, l), c = c[u];
          }
          return e;
        }
        var ta = En ? function(e, t) {
          return En.set(e, t), e;
        } : ic, na = rt ? function(e, t) {
          return rt(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: nc(t),
            writable: !0
          });
        } : ic;
        function ra(e) {
          return Pi(Fo(e));
        }
        function aa(e, t, n) {
          var r = -1, a = e.length;
          t < 0 && (t = -t > a ? 0 : a + t), (n = n > a ? a : n) < 0 && (n += a), a = t > n ? 0 : n - t >>> 0, 
          t >>>= 0;
          for (var i = se(a); ++r < a; ) i[r] = e[r + t];
          return i;
        }
        function ia(e, t) {
          var n;
          return hr(e, (function(e, r, a) {
            return !(n = t(e, r, a));
          })), !!n;
        }
        function sa(e, t, n) {
          var r = 0, a = null == e ? r : e.length;
          if ("number" == typeof t && t == t && a <= 2147483647) {
            for (;r < a; ) {
              var i = r + a >>> 1, s = e[i];
              null !== s && !uo(s) && (n ? s <= t : s < t) ? r = i + 1 : a = i;
            }
            return a;
          }
          return oa(e, t, ic, n);
        }
        function oa(e, t, n, a) {
          var i = 0, s = null == e ? 0 : e.length;
          if (0 === s) return 0;
          for (var o = (t = n(t)) != t, c = null === t, u = uo(t), l = t === r; i < s; ) {
            var f = mt((i + s) / 2), d = n(e[f]), h = d !== r, p = null === d, g = d == d, m = uo(d);
            if (o) var y = a || g; else y = l ? g && (a || h) : c ? g && h && (a || !p) : u ? g && h && !p && (a || !m) : !p && !m && (a ? d <= t : d < t);
            y ? i = f + 1 : s = f;
          }
          return _n(s, 4294967294);
        }
        function ca(e, t) {
          for (var n = -1, r = e.length, a = 0, i = []; ++n < r; ) {
            var s = e[n], o = t ? t(s) : s;
            if (!n || !qs(o, c)) {
              var c = o;
              i[a++] = 0 === s ? 0 : s;
            }
          }
          return i;
        }
        function ua(e) {
          return "number" == typeof e ? e : uo(e) ? p : +e;
        }
        function la(e) {
          if ("string" == typeof e) return e;
          if (Ds(e)) return Rt(e, la) + "";
          if (uo(e)) return Bn ? Bn.call(e) : "";
          var t = e + "";
          return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
        }
        function fa(e, t, n) {
          var r = -1, a = Ot, i = e.length, s = !0, o = [], c = o;
          if (n) s = !1, a = Nt; else if (i >= 200) {
            var u = t ? null : Ja(e);
            if (u) return dn(u);
            s = !1, a = en, c = new Gn;
          } else c = t ? [] : o;
          e: for (;++r < i; ) {
            var l = e[r], f = t ? t(l) : l;
            if (l = n || 0 !== l ? l : 0, s && f == f) {
              for (var d = c.length; d--; ) if (c[d] === f) continue e;
              t && c.push(f), o.push(l);
            } else a(c, f, n) || (c !== o && c.push(f), o.push(l));
          }
          return o;
        }
        function da(e, t) {
          return null == (e = Si(e, t = _a(t, e))) || delete e[zi(Yi(t))];
        }
        function ha(e, t, n, r) {
          return ea(e, t, n(Ar(e, t)), r);
        }
        function pa(e, t, n, r) {
          for (var a = e.length, i = r ? a : -1; (r ? i-- : ++i < a) && t(e[i], i, e); ) ;
          return n ? aa(e, r ? 0 : i, r ? i + 1 : a) : aa(e, r ? i + 1 : 0, r ? a : i);
        }
        function ga(e, t) {
          var n = e;
          return n instanceof Dn && (n = n.value()), Pt(t, (function(e, t) {
            return t.func.apply(t.thisArg, Lt([ e ], t.args));
          }), n);
        }
        function ma(e, t, n) {
          var r = e.length;
          if (r < 2) return r ? fa(e[0]) : [];
          for (var a = -1, i = se(r); ++a < r; ) for (var s = e[a], o = -1; ++o < r; ) o != a && (i[a] = dr(i[a] || s, e[o], t, n));
          return fa(vr(i, 1), t, n);
        }
        function ya(e, t, n) {
          for (var a = -1, i = e.length, s = t.length, o = {}; ++a < i; ) {
            var c = a < s ? t[a] : r;
            n(o, e[a], c);
          }
          return o;
        }
        function va(e) {
          return Ks(e) ? e : [];
        }
        function ba(e) {
          return "function" == typeof e ? e : ic;
        }
        function _a(e, t) {
          return Ds(e) ? e : wi(e, t) ? [ e ] : Zi(_o(e));
        }
        var wa = Yr;
        function xa(e, t, n) {
          var a = e.length;
          return n = n === r ? a : n, !t && n >= a ? e : aa(e, t, n);
        }
        var ka = ut || function(e) {
          return pt.clearTimeout(e);
        };
        function Aa(e, t) {
          if (t) return e.slice();
          var n = e.length, r = Ve ? Ve(n) : new e.constructor(n);
          return e.copy(r), r;
        }
        function Ta(e) {
          var t = new e.constructor(e.byteLength);
          return new De(t).set(new De(e)), t;
        }
        function Ma(e, t) {
          var n = t ? Ta(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.length);
        }
        function ja(e, t) {
          if (e !== t) {
            var n = e !== r, a = null === e, i = e == e, s = uo(e), o = t !== r, c = null === t, u = t == t, l = uo(t);
            if (!c && !l && !s && e > t || s && o && u && !c && !l || a && o && u || !n && u || !i) return 1;
            if (!a && !s && !l && e < t || l && n && i && !a && !s || c && n && i || !o && i || !u) return -1;
          }
          return 0;
        }
        function Sa(e, t, n, r) {
          for (var a = -1, i = e.length, s = n.length, o = -1, c = t.length, u = bn(i - s, 0), l = se(c + u), f = !r; ++o < c; ) l[o] = t[o];
          for (;++a < s; ) (f || a < i) && (l[n[a]] = e[a]);
          for (;u--; ) l[o++] = e[a++];
          return l;
        }
        function Ca(e, t, n, r) {
          for (var a = -1, i = e.length, s = -1, o = n.length, c = -1, u = t.length, l = bn(i - o, 0), f = se(l + u), d = !r; ++a < l; ) f[a] = e[a];
          for (var h = a; ++c < u; ) f[h + c] = t[c];
          for (;++s < o; ) (d || a < i) && (f[h + n[s]] = e[a++]);
          return f;
        }
        function Ia(e, t) {
          var n = -1, r = e.length;
          for (t || (t = se(r)); ++n < r; ) t[n] = e[n];
          return t;
        }
        function Ea(e, t, n, a) {
          var i = !n;
          n || (n = {});
          for (var s = -1, o = t.length; ++s < o; ) {
            var c = t[s], u = a ? a(n[c], e[c], c, n, e) : r;
            u === r && (u = e[c]), i ? sr(n, c, u) : nr(n, c, u);
          }
          return n;
        }
        function Oa(e, t) {
          return function(n, r) {
            var a = Ds(n) ? jt : ar, i = t ? t() : {};
            return a(n, e, ui(r, 2), i);
          };
        }
        function Na(e) {
          return Yr((function(t, n) {
            var a = -1, i = n.length, s = i > 1 ? n[i - 1] : r, o = i > 2 ? n[2] : r;
            for (s = e.length > 3 && "function" == typeof s ? (i--, s) : r, o && _i(n[0], n[1], o) && (s = i < 3 ? r : s, 
            i = 1), t = je(t); ++a < i; ) {
              var c = n[a];
              c && e(t, c, a, s);
            }
            return t;
          }));
        }
        function Ra(e, t) {
          return function(n, r) {
            if (null == n) return n;
            if (!Hs(n)) return e(n, r);
            for (var a = n.length, i = t ? a : -1, s = je(n); (t ? i-- : ++i < a) && !1 !== r(s[i], i, s); ) ;
            return n;
          };
        }
        function La(e) {
          return function(t, n, r) {
            for (var a = -1, i = je(t), s = r(t), o = s.length; o--; ) {
              var c = s[e ? o : ++a];
              if (!1 === n(i[c], c, i)) break;
            }
            return t;
          };
        }
        function Pa(e) {
          return function(t) {
            var n = cn(t = _o(t)) ? pn(t) : r, a = n ? n[0] : t.charAt(0), i = n ? xa(n, 1).join("") : t.slice(1);
            return a[e]() + i;
          };
        }
        function Za(e) {
          return function(t) {
            return Pt(Xo(Do(t).replace(Xe, "")), e, "");
          };
        }
        function za(e) {
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
            var n = Fn(e.prototype), r = e.apply(n, t);
            return to(r) ? r : n;
          };
        }
        function $a(e) {
          return function(t, n, a) {
            var i = je(t);
            if (!Hs(t)) {
              var s = ui(n, 3);
              t = No(t), n = function(e) {
                return s(i[e], e, i);
              };
            }
            var o = e(t, n, a);
            return o > -1 ? i[s ? t[o] : o] : r;
          };
        }
        function Ba(e) {
          return ri((function(t) {
            var n = t.length, i = n, s = Wn.prototype.thru;
            for (e && t.reverse(); i--; ) {
              var o = t[i];
              if ("function" != typeof o) throw new Ie(a);
              if (s && !c && "wrapper" == oi(o)) var c = new Wn([], !0);
            }
            for (i = c ? i : n; ++i < n; ) {
              var u = oi(o = t[i]), l = "wrapper" == u ? si(o) : r;
              c = l && xi(l[0]) && 424 == l[1] && !l[4].length && 1 == l[9] ? c[oi(l[0])].apply(c, l[3]) : 1 == o.length && xi(o) ? c[u]() : c.thru(o);
            }
            return function() {
              var e = arguments, r = e[0];
              if (c && 1 == e.length && Ds(r)) return c.plant(r).value();
              for (var a = 0, i = n ? t[a].apply(this, e) : r; ++a < n; ) i = t[a].call(this, i);
              return i;
            };
          }));
        }
        function qa(e, t, n, a, i, s, o, c, u, f) {
          var d = t & l, h = 1 & t, p = 2 & t, g = 24 & t, m = 512 & t, y = p ? r : za(e);
          return function r() {
            for (var l = arguments.length, v = se(l), b = l; b--; ) v[b] = arguments[b];
            if (g) var _ = ci(r), w = rn(v, _);
            if (a && (v = Sa(v, a, i, g)), s && (v = Ca(v, s, o, g)), l -= w, g && l < f) {
              var x = fn(v, _);
              return Ka(e, t, qa, r.placeholder, n, v, x, c, u, f - l);
            }
            var k = h ? n : this, A = p ? k[e] : e;
            return l = v.length, c ? v = Ci(v, c) : m && l > 1 && v.reverse(), d && u < l && (v.length = u), 
            this && this !== pt && this instanceof r && (A = y || za(A)), A.apply(k, v);
          };
        }
        function Fa(e, t) {
          return function(n, r) {
            return function(e, t, n, r) {
              return wr(e, (function(e, a, i) {
                t(r, n(e), a, i);
              })), r;
            }(n, e, t(r), {});
          };
        }
        function Ua(e, t) {
          return function(n, a) {
            var i;
            if (n === r && a === r) return t;
            if (n !== r && (i = n), a !== r) {
              if (i === r) return a;
              "string" == typeof n || "string" == typeof a ? (n = la(n), a = la(a)) : (n = ua(n), 
              a = ua(a)), i = e(n, a);
            }
            return i;
          };
        }
        function Wa(e) {
          return ri((function(t) {
            return t = Rt(t, Qt(ui())), Yr((function(n) {
              var r = this;
              return e(t, (function(e) {
                return Mt(e, r, n);
              }));
            }));
          }));
        }
        function Da(e, t) {
          var n = (t = t === r ? " " : la(t)).length;
          if (n < 2) return n ? Jr(t, e) : t;
          var a = Jr(t, gt(e / hn(t)));
          return cn(t) ? xa(pn(a), 0, e).join("") : a.slice(0, e);
        }
        function Va(e) {
          return function(t, n, a) {
            return a && "number" != typeof a && _i(t, n, a) && (n = a = r), t = go(t), n === r ? (n = t, 
            t = 0) : n = go(n), function(e, t, n, r) {
              for (var a = -1, i = bn(gt((t - e) / (n || 1)), 0), s = se(i); i--; ) s[r ? i : ++a] = e, 
              e += n;
              return s;
            }(t, n, a = a === r ? t < n ? 1 : -1 : go(a), e);
          };
        }
        function Ha(e) {
          return function(t, n) {
            return "string" == typeof t && "string" == typeof n || (t = vo(t), n = vo(n)), e(t, n);
          };
        }
        function Ka(e, t, n, a, i, s, o, l, f, d) {
          var h = 8 & t;
          t |= h ? c : u, 4 & (t &= ~(h ? u : c)) || (t &= -4);
          var p = [ e, t, i, h ? s : r, h ? o : r, h ? r : s, h ? r : o, l, f, d ], g = n.apply(r, p);
          return xi(e) && Ei(g, p), g.placeholder = a, Ri(g, e, t);
        }
        function Ga(e) {
          var t = Me[e];
          return function(e, n) {
            if (e = vo(e), (n = null == n ? 0 : _n(mo(n), 292)) && $t(e)) {
              var r = (_o(e) + "e").split("e");
              return +((r = (_o(t(r[0] + "e" + (+r[1] + n))) + "e").split("e"))[0] + "e" + (+r[1] - n));
            }
            return t(e);
          };
        }
        var Ja = Sn && 1 / dn(new Sn([ , -0 ]))[1] == d ? function(e) {
          return new Sn(e);
        } : lc;
        function Ya(e) {
          return function(t) {
            var n = gi(t);
            return n == A ? un(t) : n == C ? function(e) {
              var t = -1, n = Array(e.size);
              return e.forEach((function(e) {
                n[++t] = [ e, e ];
              })), n;
            }(t) : function(e, t) {
              return Rt(t, (function(t) {
                return [ t, e[t] ];
              }));
            }(t, e(t));
          };
        }
        function Qa(e, t, n, i, d, h, p, g) {
          var m = 2 & t;
          if (!m && "function" != typeof e) throw new Ie(a);
          var y = i ? i.length : 0;
          if (y || (t &= -97, i = d = r), p = p === r ? p : bn(mo(p), 0), g = g === r ? g : mo(g), 
          y -= d ? d.length : 0, t & u) {
            var v = i, b = d;
            i = d = r;
          }
          var _ = m ? r : si(e), w = [ e, t, n, i, d, v, b, h, p, g ];
          if (_ && function(e, t) {
            var n = e[1], r = t[1], a = n | r, i = a < 131, o = r == l && 8 == n || r == l && n == f && e[7].length <= t[8] || 384 == r && t[7].length <= t[8] && 8 == n;
            if (!i && !o) return e;
            1 & r && (e[2] = t[2], a |= 1 & n ? 0 : 4);
            var c = t[3];
            if (c) {
              var u = e[3];
              e[3] = u ? Sa(u, c, t[4]) : c, e[4] = u ? fn(e[3], s) : t[4];
            }
            (c = t[5]) && (u = e[5], e[5] = u ? Ca(u, c, t[6]) : c, e[6] = u ? fn(e[5], s) : t[6]);
            (c = t[7]) && (e[7] = c);
            r & l && (e[8] = null == e[8] ? t[8] : _n(e[8], t[8]));
            null == e[9] && (e[9] = t[9]);
            e[0] = t[0], e[1] = a;
          }(w, _), e = w[0], t = w[1], n = w[2], i = w[3], d = w[4], !(g = w[9] = w[9] === r ? m ? 0 : e.length : bn(w[9] - y, 0)) && 24 & t && (t &= -25), 
          t && 1 != t) x = 8 == t || t == o ? function(e, t, n) {
            var a = za(e);
            return function i() {
              for (var s = arguments.length, o = se(s), c = s, u = ci(i); c--; ) o[c] = arguments[c];
              var l = s < 3 && o[0] !== u && o[s - 1] !== u ? [] : fn(o, u);
              return (s -= l.length) < n ? Ka(e, t, qa, i.placeholder, r, o, l, r, r, n - s) : Mt(this && this !== pt && this instanceof i ? a : e, this, o);
            };
          }(e, t, g) : t != c && 33 != t || d.length ? qa.apply(r, w) : function(e, t, n, r) {
            var a = 1 & t, i = za(e);
            return function t() {
              for (var s = -1, o = arguments.length, c = -1, u = r.length, l = se(u + o), f = this && this !== pt && this instanceof t ? i : e; ++c < u; ) l[c] = r[c];
              for (;o--; ) l[c++] = arguments[++s];
              return Mt(f, a ? n : this, l);
            };
          }(e, t, n, i); else var x = function(e, t, n) {
            var r = 1 & t, a = za(e);
            return function t() {
              return (this && this !== pt && this instanceof t ? a : e).apply(r ? n : this, arguments);
            };
          }(e, t, n);
          return Ri((_ ? ta : Ei)(x, w), e, t);
        }
        function Xa(e, t, n, a) {
          return e === r || qs(e, Ne[n]) && !Pe.call(a, n) ? t : e;
        }
        function ei(e, t, n, a, i, s) {
          return to(e) && to(t) && (s.set(t, e), Ur(e, t, r, ei, s), s.delete(t)), e;
        }
        function ti(e) {
          return io(e) ? r : e;
        }
        function ni(e, t, n, a, i, s) {
          var o = 1 & n, c = e.length, u = t.length;
          if (c != u && !(o && u > c)) return !1;
          var l = s.get(e), f = s.get(t);
          if (l && f) return l == t && f == e;
          var d = -1, h = !0, p = 2 & n ? new Gn : r;
          for (s.set(e, t), s.set(t, e); ++d < c; ) {
            var g = e[d], m = t[d];
            if (a) var y = o ? a(m, g, d, t, e, s) : a(g, m, d, e, t, s);
            if (y !== r) {
              if (y) continue;
              h = !1;
              break;
            }
            if (p) {
              if (!zt(t, (function(e, t) {
                if (!en(p, t) && (g === e || i(g, e, n, a, s))) return p.push(t);
              }))) {
                h = !1;
                break;
              }
            } else if (g !== m && !i(g, m, n, a, s)) {
              h = !1;
              break;
            }
          }
          return s.delete(e), s.delete(t), h;
        }
        function ri(e) {
          return Ni(ji(e, r, Vi), e + "");
        }
        function ai(e) {
          return Tr(e, No, hi);
        }
        function ii(e) {
          return Tr(e, Ro, pi);
        }
        var si = En ? function(e) {
          return En.get(e);
        } : lc;
        function oi(e) {
          for (var t = e.name + "", n = On[t], r = Pe.call(On, t) ? n.length : 0; r--; ) {
            var a = n[r], i = a.func;
            if (null == i || i == e) return a.name;
          }
          return t;
        }
        function ci(e) {
          return (Pe.call(qn, "placeholder") ? qn : e).placeholder;
        }
        function ui() {
          var e = qn.iteratee || sc;
          return e = e === sc ? Pr : e, arguments.length ? e(arguments[0], arguments[1]) : e;
        }
        function li(e, t) {
          var n, r, a = e.__data__;
          return ("string" == (r = typeof (n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? a["string" == typeof t ? "string" : "hash"] : a.map;
        }
        function fi(e) {
          for (var t = No(e), n = t.length; n--; ) {
            var r = t[n], a = e[r];
            t[n] = [ r, a, Ti(a) ];
          }
          return t;
        }
        function di(e, t) {
          var n = function(e, t) {
            return null == e ? r : e[t];
          }(e, t);
          return Lr(n) ? n : r;
        }
        var hi = vt ? function(e) {
          return null == e ? [] : (e = je(e), Et(vt(e), (function(t) {
            return Ge.call(e, t);
          })));
        } : yc, pi = vt ? function(e) {
          for (var t = []; e; ) Lt(t, hi(e)), e = He(e);
          return t;
        } : yc, gi = Mr;
        function mi(e, t, n) {
          for (var r = -1, a = (t = _a(t, e)).length, i = !1; ++r < a; ) {
            var s = zi(t[r]);
            if (!(i = null != e && n(e, s))) break;
            e = e[s];
          }
          return i || ++r != a ? i : !!(a = null == e ? 0 : e.length) && eo(a) && bi(s, a) && (Ds(e) || Ws(e));
        }
        function yi(e) {
          return "function" != typeof e.constructor || Ai(e) ? {} : Fn(He(e));
        }
        function vi(e) {
          return Ds(e) || Ws(e) || !!(Ye && e && e[Ye]);
        }
        function bi(e, t) {
          var n = typeof e;
          return !!(t = null == t ? h : t) && ("number" == n || "symbol" != n && be.test(e)) && e > -1 && e % 1 == 0 && e < t;
        }
        function _i(e, t, n) {
          if (!to(n)) return !1;
          var r = typeof t;
          return !!("number" == r ? Hs(n) && bi(t, n.length) : "string" == r && t in n) && qs(n[t], e);
        }
        function wi(e, t) {
          if (Ds(e)) return !1;
          var n = typeof e;
          return !("number" != n && "symbol" != n && "boolean" != n && null != e && !uo(e)) || (te.test(e) || !ee.test(e) || null != t && e in je(t));
        }
        function xi(e) {
          var t = oi(e), n = qn[t];
          if ("function" != typeof n || !(t in Dn.prototype)) return !1;
          if (e === n) return !0;
          var r = si(n);
          return !!r && e === r[0];
        }
        (Tn && gi(new Tn(new ArrayBuffer(1))) != R || Mn && gi(new Mn) != A || jn && gi(jn.resolve()) != j || Sn && gi(new Sn) != C || Cn && gi(new Cn) != O) && (gi = function(e) {
          var t = Mr(e), n = t == M ? e.constructor : r, a = n ? $i(n) : "";
          if (a) switch (a) {
           case Nn:
            return R;

           case Rn:
            return A;

           case Ln:
            return j;

           case Pn:
            return C;

           case Zn:
            return O;
          }
          return t;
        });
        var ki = Re ? Qs : vc;
        function Ai(e) {
          var t = e && e.constructor;
          return e === ("function" == typeof t && t.prototype || Ne);
        }
        function Ti(e) {
          return e == e && !to(e);
        }
        function Mi(e, t) {
          return function(n) {
            return null != n && (n[e] === t && (t !== r || e in je(n)));
          };
        }
        function ji(e, t, n) {
          return t = bn(t === r ? e.length - 1 : t, 0), function() {
            for (var r = arguments, a = -1, i = bn(r.length - t, 0), s = se(i); ++a < i; ) s[a] = r[t + a];
            a = -1;
            for (var o = se(t + 1); ++a < t; ) o[a] = r[a];
            return o[t] = n(s), Mt(e, this, o);
          };
        }
        function Si(e, t) {
          return t.length < 2 ? e : Ar(e, aa(t, 0, -1));
        }
        function Ci(e, t) {
          for (var n = e.length, a = _n(t.length, n), i = Ia(e); a--; ) {
            var s = t[a];
            e[a] = bi(s, n) ? i[s] : r;
          }
          return e;
        }
        function Ii(e, t) {
          if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t) return e[t];
        }
        var Ei = Li(ta), Oi = ht || function(e, t) {
          return pt.setTimeout(e, t);
        }, Ni = Li(na);
        function Ri(e, t, n) {
          var r = t + "";
          return Ni(e, function(e, t) {
            var n = t.length;
            if (!n) return e;
            var r = n - 1;
            return t[r] = (n > 1 ? "& " : "") + t[r], t = t.join(n > 2 ? ", " : " "), e.replace(oe, "{\n/* [wrapped with " + t + "] */\n");
          }(r, function(e, t) {
            return St(m, (function(n) {
              var r = "_." + n[0];
              t & n[1] && !Ot(e, r) && e.push(r);
            })), e.sort();
          }(function(e) {
            var t = e.match(ce);
            return t ? t[1].split(ue) : [];
          }(r), n)));
        }
        function Li(e) {
          var t = 0, n = 0;
          return function() {
            var a = wn(), i = 16 - (a - n);
            if (n = a, i > 0) {
              if (++t >= 800) return arguments[0];
            } else t = 0;
            return e.apply(r, arguments);
          };
        }
        function Pi(e, t) {
          var n = -1, a = e.length, i = a - 1;
          for (t = t === r ? a : t; ++n < t; ) {
            var s = Gr(n, i), o = e[s];
            e[s] = e[n], e[n] = o;
          }
          return e.length = t, e;
        }
        var Zi = function(e) {
          var t = Ls(e, (function(e) {
            return 500 === n.size && n.clear(), e;
          })), n = t.cache;
          return t;
        }((function(e) {
          var t = [];
          return 46 === e.charCodeAt(0) && t.push(""), e.replace(ne, (function(e, n, r, a) {
            t.push(r ? a.replace(de, "$1") : n || e);
          })), t;
        }));
        function zi(e) {
          if ("string" == typeof e || uo(e)) return e;
          var t = e + "";
          return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
        }
        function $i(e) {
          if (null != e) {
            try {
              return Le.call(e);
            } catch (e) {}
            try {
              return e + "";
            } catch (e) {}
          }
          return "";
        }
        function Bi(e) {
          if (e instanceof Dn) return e.clone();
          var t = new Wn(e.__wrapped__, e.__chain__);
          return t.__actions__ = Ia(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, 
          t;
        }
        var qi = Yr((function(e, t) {
          return Ks(e) ? dr(e, vr(t, 1, Ks, !0)) : [];
        })), Fi = Yr((function(e, t) {
          var n = Yi(t);
          return Ks(n) && (n = r), Ks(e) ? dr(e, vr(t, 1, Ks, !0), ui(n, 2)) : [];
        })), Ui = Yr((function(e, t) {
          var n = Yi(t);
          return Ks(n) && (n = r), Ks(e) ? dr(e, vr(t, 1, Ks, !0), r, n) : [];
        }));
        function Wi(e, t, n) {
          var r = null == e ? 0 : e.length;
          if (!r) return -1;
          var a = null == n ? 0 : mo(n);
          return a < 0 && (a = bn(r + a, 0)), qt(e, ui(t, 3), a);
        }
        function Di(e, t, n) {
          var a = null == e ? 0 : e.length;
          if (!a) return -1;
          var i = a - 1;
          return n !== r && (i = mo(n), i = n < 0 ? bn(a + i, 0) : _n(i, a - 1)), qt(e, ui(t, 3), i, !0);
        }
        function Vi(e) {
          return (null == e ? 0 : e.length) ? vr(e, 1) : [];
        }
        function Hi(e) {
          return e && e.length ? e[0] : r;
        }
        var Ki = Yr((function(e) {
          var t = Rt(e, va);
          return t.length && t[0] === e[0] ? Ir(t) : [];
        })), Gi = Yr((function(e) {
          var t = Yi(e), n = Rt(e, va);
          return t === Yi(n) ? t = r : n.pop(), n.length && n[0] === e[0] ? Ir(n, ui(t, 2)) : [];
        })), Ji = Yr((function(e) {
          var t = Yi(e), n = Rt(e, va);
          return (t = "function" == typeof t ? t : r) && n.pop(), n.length && n[0] === e[0] ? Ir(n, r, t) : [];
        }));
        function Yi(e) {
          var t = null == e ? 0 : e.length;
          return t ? e[t - 1] : r;
        }
        var Qi = Yr(Xi);
        function Xi(e, t) {
          return e && e.length && t && t.length ? Hr(e, t) : e;
        }
        var es = ri((function(e, t) {
          var n = null == e ? 0 : e.length, r = or(e, t);
          return Kr(e, Rt(t, (function(e) {
            return bi(e, n) ? +e : e;
          })).sort(ja)), r;
        }));
        function ts(e) {
          return null == e ? e : An.call(e);
        }
        var ns = Yr((function(e) {
          return fa(vr(e, 1, Ks, !0));
        })), rs = Yr((function(e) {
          var t = Yi(e);
          return Ks(t) && (t = r), fa(vr(e, 1, Ks, !0), ui(t, 2));
        })), as = Yr((function(e) {
          var t = Yi(e);
          return t = "function" == typeof t ? t : r, fa(vr(e, 1, Ks, !0), r, t);
        }));
        function is(e) {
          if (!e || !e.length) return [];
          var t = 0;
          return e = Et(e, (function(e) {
            if (Ks(e)) return t = bn(e.length, t), !0;
          })), Jt(t, (function(t) {
            return Rt(e, Vt(t));
          }));
        }
        function ss(e, t) {
          if (!e || !e.length) return [];
          var n = is(e);
          return null == t ? n : Rt(n, (function(e) {
            return Mt(t, r, e);
          }));
        }
        var os = Yr((function(e, t) {
          return Ks(e) ? dr(e, t) : [];
        })), cs = Yr((function(e) {
          return ma(Et(e, Ks));
        })), us = Yr((function(e) {
          var t = Yi(e);
          return Ks(t) && (t = r), ma(Et(e, Ks), ui(t, 2));
        })), ls = Yr((function(e) {
          var t = Yi(e);
          return t = "function" == typeof t ? t : r, ma(Et(e, Ks), r, t);
        })), fs = Yr(is);
        var ds = Yr((function(e) {
          var t = e.length, n = t > 1 ? e[t - 1] : r;
          return n = "function" == typeof n ? (e.pop(), n) : r, ss(e, n);
        }));
        function hs(e) {
          var t = qn(e);
          return t.__chain__ = !0, t;
        }
        function ps(e, t) {
          return t(e);
        }
        var gs = ri((function(e) {
          var t = e.length, n = t ? e[0] : 0, a = this.__wrapped__, i = function(t) {
            return or(t, e);
          };
          return !(t > 1 || this.__actions__.length) && a instanceof Dn && bi(n) ? ((a = a.slice(n, +n + (t ? 1 : 0))).__actions__.push({
            func: ps,
            args: [ i ],
            thisArg: r
          }), new Wn(a, this.__chain__).thru((function(e) {
            return t && !e.length && e.push(r), e;
          }))) : this.thru(i);
        }));
        var ms = Oa((function(e, t, n) {
          Pe.call(e, n) ? ++e[n] : sr(e, n, 1);
        }));
        var ys = $a(Wi), vs = $a(Di);
        function bs(e, t) {
          return (Ds(e) ? St : hr)(e, ui(t, 3));
        }
        function _s(e, t) {
          return (Ds(e) ? Ct : pr)(e, ui(t, 3));
        }
        var ws = Oa((function(e, t, n) {
          Pe.call(e, n) ? e[n].push(t) : sr(e, n, [ t ]);
        }));
        var xs = Yr((function(e, t, n) {
          var r = -1, a = "function" == typeof t, i = Hs(e) ? se(e.length) : [];
          return hr(e, (function(e) {
            i[++r] = a ? Mt(t, e, n) : Er(e, t, n);
          })), i;
        })), ks = Oa((function(e, t, n) {
          sr(e, n, t);
        }));
        function As(e, t) {
          return (Ds(e) ? Rt : Br)(e, ui(t, 3));
        }
        var Ts = Oa((function(e, t, n) {
          e[n ? 0 : 1].push(t);
        }), (function() {
          return [ [], [] ];
        }));
        var Ms = Yr((function(e, t) {
          if (null == e) return [];
          var n = t.length;
          return n > 1 && _i(e, t[0], t[1]) ? t = [] : n > 2 && _i(t[0], t[1], t[2]) && (t = [ t[0] ]), 
          Dr(e, vr(t, 1), []);
        })), js = dt || function() {
          return pt.Date.now();
        };
        function Ss(e, t, n) {
          return t = n ? r : t, t = e && null == t ? e.length : t, Qa(e, l, r, r, r, r, t);
        }
        function Cs(e, t) {
          var n;
          if ("function" != typeof t) throw new Ie(a);
          return e = mo(e), function() {
            return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = r), n;
          };
        }
        var Is = Yr((function(e, t, n) {
          var r = 1;
          if (n.length) {
            var a = fn(n, ci(Is));
            r |= c;
          }
          return Qa(e, r, t, n, a);
        })), Es = Yr((function(e, t, n) {
          var r = 3;
          if (n.length) {
            var a = fn(n, ci(Es));
            r |= c;
          }
          return Qa(t, r, e, n, a);
        }));
        function Os(e, t, n) {
          var i, s, o, c, u, l, f = 0, d = !1, h = !1, p = !0;
          if ("function" != typeof e) throw new Ie(a);
          function g(t) {
            var n = i, a = s;
            return i = s = r, f = t, c = e.apply(a, n);
          }
          function m(e) {
            return f = e, u = Oi(v, t), d ? g(e) : c;
          }
          function y(e) {
            var n = e - l;
            return l === r || n >= t || n < 0 || h && e - f >= o;
          }
          function v() {
            var e = js();
            if (y(e)) return b(e);
            u = Oi(v, function(e) {
              var n = t - (e - l);
              return h ? _n(n, o - (e - f)) : n;
            }(e));
          }
          function b(e) {
            return u = r, p && i ? g(e) : (i = s = r, c);
          }
          function _() {
            var e = js(), n = y(e);
            if (i = arguments, s = this, l = e, n) {
              if (u === r) return m(l);
              if (h) return ka(u), u = Oi(v, t), g(l);
            }
            return u === r && (u = Oi(v, t)), c;
          }
          return t = vo(t) || 0, to(n) && (d = !!n.leading, o = (h = "maxWait" in n) ? bn(vo(n.maxWait) || 0, t) : o, 
          p = "trailing" in n ? !!n.trailing : p), _.cancel = function() {
            u !== r && ka(u), f = 0, i = l = s = u = r;
          }, _.flush = function() {
            return u === r ? c : b(js());
          }, _;
        }
        var Ns = Yr((function(e, t) {
          return fr(e, 1, t);
        })), Rs = Yr((function(e, t, n) {
          return fr(e, vo(t) || 0, n);
        }));
        function Ls(e, t) {
          if ("function" != typeof e || null != t && "function" != typeof t) throw new Ie(a);
          var n = function() {
            var r = arguments, a = t ? t.apply(this, r) : r[0], i = n.cache;
            if (i.has(a)) return i.get(a);
            var s = e.apply(this, r);
            return n.cache = i.set(a, s) || i, s;
          };
          return n.cache = new (Ls.Cache || Kn), n;
        }
        function Ps(e) {
          if ("function" != typeof e) throw new Ie(a);
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
        Ls.Cache = Kn;
        var Zs = wa((function(e, t) {
          var n = (t = 1 == t.length && Ds(t[0]) ? Rt(t[0], Qt(ui())) : Rt(vr(t, 1), Qt(ui()))).length;
          return Yr((function(r) {
            for (var a = -1, i = _n(r.length, n); ++a < i; ) r[a] = t[a].call(this, r[a]);
            return Mt(e, this, r);
          }));
        })), zs = Yr((function(e, t) {
          var n = fn(t, ci(zs));
          return Qa(e, c, r, t, n);
        })), $s = Yr((function(e, t) {
          var n = fn(t, ci($s));
          return Qa(e, u, r, t, n);
        })), Bs = ri((function(e, t) {
          return Qa(e, f, r, r, r, t);
        }));
        function qs(e, t) {
          return e === t || e != e && t != t;
        }
        var Fs = Ha(jr), Us = Ha((function(e, t) {
          return e >= t;
        })), Ws = Or(function() {
          return arguments;
        }()) ? Or : function(e) {
          return no(e) && Pe.call(e, "callee") && !Ge.call(e, "callee");
        }, Ds = se.isArray, Vs = _t ? Qt(_t) : function(e) {
          return no(e) && Mr(e) == N;
        };
        function Hs(e) {
          return null != e && eo(e.length) && !Qs(e);
        }
        function Ks(e) {
          return no(e) && Hs(e);
        }
        var Gs = bt || vc, Js = wt ? Qt(wt) : function(e) {
          return no(e) && Mr(e) == _;
        };
        function Ys(e) {
          if (!no(e)) return !1;
          var t = Mr(e);
          return t == w || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !io(e);
        }
        function Qs(e) {
          if (!to(e)) return !1;
          var t = Mr(e);
          return t == x || t == k || "[object AsyncFunction]" == t || "[object Proxy]" == t;
        }
        function Xs(e) {
          return "number" == typeof e && e == mo(e);
        }
        function eo(e) {
          return "number" == typeof e && e > -1 && e % 1 == 0 && e <= h;
        }
        function to(e) {
          var t = typeof e;
          return null != e && ("object" == t || "function" == t);
        }
        function no(e) {
          return null != e && "object" == typeof e;
        }
        var ro = xt ? Qt(xt) : function(e) {
          return no(e) && gi(e) == A;
        };
        function ao(e) {
          return "number" == typeof e || no(e) && Mr(e) == T;
        }
        function io(e) {
          if (!no(e) || Mr(e) != M) return !1;
          var t = He(e);
          if (null === t) return !0;
          var n = Pe.call(t, "constructor") && t.constructor;
          return "function" == typeof n && n instanceof n && Le.call(n) == Be;
        }
        var so = kt ? Qt(kt) : function(e) {
          return no(e) && Mr(e) == S;
        };
        var oo = At ? Qt(At) : function(e) {
          return no(e) && gi(e) == C;
        };
        function co(e) {
          return "string" == typeof e || !Ds(e) && no(e) && Mr(e) == I;
        }
        function uo(e) {
          return "symbol" == typeof e || no(e) && Mr(e) == E;
        }
        var lo = Tt ? Qt(Tt) : function(e) {
          return no(e) && eo(e.length) && !!ot[Mr(e)];
        };
        var fo = Ha($r), ho = Ha((function(e, t) {
          return e <= t;
        }));
        function po(e) {
          if (!e) return [];
          if (Hs(e)) return co(e) ? pn(e) : Ia(e);
          if (Qe && e[Qe]) return function(e) {
            for (var t, n = []; !(t = e.next()).done; ) n.push(t.value);
            return n;
          }(e[Qe]());
          var t = gi(e);
          return (t == A ? un : t == C ? dn : Fo)(e);
        }
        function go(e) {
          return e ? (e = vo(e)) === d || e === -1 / 0 ? 17976931348623157e292 * (e < 0 ? -1 : 1) : e == e ? e : 0 : 0 === e ? e : 0;
        }
        function mo(e) {
          var t = go(e), n = t % 1;
          return t == t ? n ? t - n : t : 0;
        }
        function yo(e) {
          return e ? cr(mo(e), 0, g) : 0;
        }
        function vo(e) {
          if ("number" == typeof e) return e;
          if (uo(e)) return p;
          if (to(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = to(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = Yt(e);
          var n = me.test(e);
          return n || ve.test(e) ? ft(e.slice(2), n ? 2 : 8) : ge.test(e) ? p : +e;
        }
        function bo(e) {
          return Ea(e, Ro(e));
        }
        function _o(e) {
          return null == e ? "" : la(e);
        }
        var wo = Na((function(e, t) {
          if (Ai(t) || Hs(t)) Ea(t, No(t), e); else for (var n in t) Pe.call(t, n) && nr(e, n, t[n]);
        })), xo = Na((function(e, t) {
          Ea(t, Ro(t), e);
        })), ko = Na((function(e, t, n, r) {
          Ea(t, Ro(t), e, r);
        })), Ao = Na((function(e, t, n, r) {
          Ea(t, No(t), e, r);
        })), To = ri(or);
        var Mo = Yr((function(e, t) {
          e = je(e);
          var n = -1, a = t.length, i = a > 2 ? t[2] : r;
          for (i && _i(t[0], t[1], i) && (a = 1); ++n < a; ) for (var s = t[n], o = Ro(s), c = -1, u = o.length; ++c < u; ) {
            var l = o[c], f = e[l];
            (f === r || qs(f, Ne[l]) && !Pe.call(e, l)) && (e[l] = s[l]);
          }
          return e;
        })), jo = Yr((function(e) {
          return e.push(r, ei), Mt(Po, r, e);
        }));
        function So(e, t, n) {
          var a = null == e ? r : Ar(e, t);
          return a === r ? n : a;
        }
        function Co(e, t) {
          return null != e && mi(e, t, Cr);
        }
        var Io = Fa((function(e, t, n) {
          null != t && "function" != typeof t.toString && (t = $e.call(t)), e[t] = n;
        }), nc(ic)), Eo = Fa((function(e, t, n) {
          null != t && "function" != typeof t.toString && (t = $e.call(t)), Pe.call(e, t) ? e[t].push(n) : e[t] = [ n ];
        }), ui), Oo = Yr(Er);
        function No(e) {
          return Hs(e) ? Yn(e) : Zr(e);
        }
        function Ro(e) {
          return Hs(e) ? Yn(e, !0) : zr(e);
        }
        var Lo = Na((function(e, t, n) {
          Ur(e, t, n);
        })), Po = Na((function(e, t, n, r) {
          Ur(e, t, n, r);
        })), Zo = ri((function(e, t) {
          var n = {};
          if (null == e) return n;
          var r = !1;
          t = Rt(t, (function(t) {
            return t = _a(t, e), r || (r = t.length > 1), t;
          })), Ea(e, ii(e), n), r && (n = ur(n, 7, ti));
          for (var a = t.length; a--; ) da(n, t[a]);
          return n;
        }));
        var zo = ri((function(e, t) {
          return null == e ? {} : function(e, t) {
            return Vr(e, t, (function(t, n) {
              return Co(e, n);
            }));
          }(e, t);
        }));
        function $o(e, t) {
          if (null == e) return {};
          var n = Rt(ii(e), (function(e) {
            return [ e ];
          }));
          return t = ui(t), Vr(e, n, (function(e, n) {
            return t(e, n[0]);
          }));
        }
        var Bo = Ya(No), qo = Ya(Ro);
        function Fo(e) {
          return null == e ? [] : Xt(e, No(e));
        }
        var Uo = Za((function(e, t, n) {
          return t = t.toLowerCase(), e + (n ? Wo(t) : t);
        }));
        function Wo(e) {
          return Qo(_o(e).toLowerCase());
        }
        function Do(e) {
          return (e = _o(e)) && e.replace(_e, an).replace(et, "");
        }
        var Vo = Za((function(e, t, n) {
          return e + (n ? "-" : "") + t.toLowerCase();
        })), Ho = Za((function(e, t, n) {
          return e + (n ? " " : "") + t.toLowerCase();
        })), Ko = Pa("toLowerCase");
        var Go = Za((function(e, t, n) {
          return e + (n ? "_" : "") + t.toLowerCase();
        }));
        var Jo = Za((function(e, t, n) {
          return e + (n ? " " : "") + Qo(t);
        }));
        var Yo = Za((function(e, t, n) {
          return e + (n ? " " : "") + t.toUpperCase();
        })), Qo = Pa("toUpperCase");
        function Xo(e, t, n) {
          return e = _o(e), (t = n ? r : t) === r ? function(e) {
            return at.test(e);
          }(e) ? function(e) {
            return e.match(nt) || [];
          }(e) : function(e) {
            return e.match(le) || [];
          }(e) : e.match(t) || [];
        }
        var ec = Yr((function(e, t) {
          try {
            return Mt(e, r, t);
          } catch (e) {
            return Ys(e) ? e : new Ae(e);
          }
        })), tc = ri((function(e, t) {
          return St(t, (function(t) {
            t = zi(t), sr(e, t, Is(e[t], e));
          })), e;
        }));
        function nc(e) {
          return function() {
            return e;
          };
        }
        var rc = Ba(), ac = Ba(!0);
        function ic(e) {
          return e;
        }
        function sc(e) {
          return Pr("function" == typeof e ? e : ur(e, 1));
        }
        var oc = Yr((function(e, t) {
          return function(n) {
            return Er(n, e, t);
          };
        })), cc = Yr((function(e, t) {
          return function(n) {
            return Er(e, n, t);
          };
        }));
        function uc(e, t, n) {
          var r = No(t), a = kr(t, r);
          null != n || to(t) && (a.length || !r.length) || (n = t, t = e, e = this, a = kr(t, No(t)));
          var i = !(to(n) && "chain" in n && !n.chain), s = Qs(e);
          return St(a, (function(n) {
            var r = t[n];
            e[n] = r, s && (e.prototype[n] = function() {
              var t = this.__chain__;
              if (i || t) {
                var n = e(this.__wrapped__), a = n.__actions__ = Ia(this.__actions__);
                return a.push({
                  func: r,
                  args: arguments,
                  thisArg: e
                }), n.__chain__ = t, n;
              }
              return r.apply(e, Lt([ this.value() ], arguments));
            });
          })), e;
        }
        function lc() {}
        var fc = Wa(Rt), dc = Wa(It), hc = Wa(zt);
        function pc(e) {
          return wi(e) ? Vt(zi(e)) : function(e) {
            return function(t) {
              return Ar(t, e);
            };
          }(e);
        }
        var gc = Va(), mc = Va(!0);
        function yc() {
          return [];
        }
        function vc() {
          return !1;
        }
        var bc = Ua((function(e, t) {
          return e + t;
        }), 0), _c = Ga("ceil"), wc = Ua((function(e, t) {
          return e / t;
        }), 1), xc = Ga("floor");
        var kc, Ac = Ua((function(e, t) {
          return e * t;
        }), 1), Tc = Ga("round"), Mc = Ua((function(e, t) {
          return e - t;
        }), 0);
        return qn.after = function(e, t) {
          if ("function" != typeof t) throw new Ie(a);
          return e = mo(e), function() {
            if (--e < 1) return t.apply(this, arguments);
          };
        }, qn.ary = Ss, qn.assign = wo, qn.assignIn = xo, qn.assignInWith = ko, qn.assignWith = Ao, 
        qn.at = To, qn.before = Cs, qn.bind = Is, qn.bindAll = tc, qn.bindKey = Es, qn.castArray = function() {
          if (!arguments.length) return [];
          var e = arguments[0];
          return Ds(e) ? e : [ e ];
        }, qn.chain = hs, qn.chunk = function(e, t, n) {
          t = (n ? _i(e, t, n) : t === r) ? 1 : bn(mo(t), 0);
          var a = null == e ? 0 : e.length;
          if (!a || t < 1) return [];
          for (var i = 0, s = 0, o = se(gt(a / t)); i < a; ) o[s++] = aa(e, i, i += t);
          return o;
        }, qn.compact = function(e) {
          for (var t = -1, n = null == e ? 0 : e.length, r = 0, a = []; ++t < n; ) {
            var i = e[t];
            i && (a[r++] = i);
          }
          return a;
        }, qn.concat = function() {
          var e = arguments.length;
          if (!e) return [];
          for (var t = se(e - 1), n = arguments[0], r = e; r--; ) t[r - 1] = arguments[r];
          return Lt(Ds(n) ? Ia(n) : [ n ], vr(t, 1));
        }, qn.cond = function(e) {
          var t = null == e ? 0 : e.length, n = ui();
          return e = t ? Rt(e, (function(e) {
            if ("function" != typeof e[1]) throw new Ie(a);
            return [ n(e[0]), e[1] ];
          })) : [], Yr((function(n) {
            for (var r = -1; ++r < t; ) {
              var a = e[r];
              if (Mt(a[0], this, n)) return Mt(a[1], this, n);
            }
          }));
        }, qn.conforms = function(e) {
          return function(e) {
            var t = No(e);
            return function(n) {
              return lr(n, e, t);
            };
          }(ur(e, 1));
        }, qn.constant = nc, qn.countBy = ms, qn.create = function(e, t) {
          var n = Fn(e);
          return null == t ? n : ir(n, t);
        }, qn.curry = function e(t, n, a) {
          var i = Qa(t, 8, r, r, r, r, r, n = a ? r : n);
          return i.placeholder = e.placeholder, i;
        }, qn.curryRight = function e(t, n, a) {
          var i = Qa(t, o, r, r, r, r, r, n = a ? r : n);
          return i.placeholder = e.placeholder, i;
        }, qn.debounce = Os, qn.defaults = Mo, qn.defaultsDeep = jo, qn.defer = Ns, qn.delay = Rs, 
        qn.difference = qi, qn.differenceBy = Fi, qn.differenceWith = Ui, qn.drop = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          return a ? aa(e, (t = n || t === r ? 1 : mo(t)) < 0 ? 0 : t, a) : [];
        }, qn.dropRight = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          return a ? aa(e, 0, (t = a - (t = n || t === r ? 1 : mo(t))) < 0 ? 0 : t) : [];
        }, qn.dropRightWhile = function(e, t) {
          return e && e.length ? pa(e, ui(t, 3), !0, !0) : [];
        }, qn.dropWhile = function(e, t) {
          return e && e.length ? pa(e, ui(t, 3), !0) : [];
        }, qn.fill = function(e, t, n, a) {
          var i = null == e ? 0 : e.length;
          return i ? (n && "number" != typeof n && _i(e, t, n) && (n = 0, a = i), function(e, t, n, a) {
            var i = e.length;
            for ((n = mo(n)) < 0 && (n = -n > i ? 0 : i + n), (a = a === r || a > i ? i : mo(a)) < 0 && (a += i), 
            a = n > a ? 0 : yo(a); n < a; ) e[n++] = t;
            return e;
          }(e, t, n, a)) : [];
        }, qn.filter = function(e, t) {
          return (Ds(e) ? Et : yr)(e, ui(t, 3));
        }, qn.flatMap = function(e, t) {
          return vr(As(e, t), 1);
        }, qn.flatMapDeep = function(e, t) {
          return vr(As(e, t), d);
        }, qn.flatMapDepth = function(e, t, n) {
          return n = n === r ? 1 : mo(n), vr(As(e, t), n);
        }, qn.flatten = Vi, qn.flattenDeep = function(e) {
          return (null == e ? 0 : e.length) ? vr(e, d) : [];
        }, qn.flattenDepth = function(e, t) {
          return (null == e ? 0 : e.length) ? vr(e, t = t === r ? 1 : mo(t)) : [];
        }, qn.flip = function(e) {
          return Qa(e, 512);
        }, qn.flow = rc, qn.flowRight = ac, qn.fromPairs = function(e) {
          for (var t = -1, n = null == e ? 0 : e.length, r = {}; ++t < n; ) {
            var a = e[t];
            r[a[0]] = a[1];
          }
          return r;
        }, qn.functions = function(e) {
          return null == e ? [] : kr(e, No(e));
        }, qn.functionsIn = function(e) {
          return null == e ? [] : kr(e, Ro(e));
        }, qn.groupBy = ws, qn.initial = function(e) {
          return (null == e ? 0 : e.length) ? aa(e, 0, -1) : [];
        }, qn.intersection = Ki, qn.intersectionBy = Gi, qn.intersectionWith = Ji, qn.invert = Io, 
        qn.invertBy = Eo, qn.invokeMap = xs, qn.iteratee = sc, qn.keyBy = ks, qn.keys = No, 
        qn.keysIn = Ro, qn.map = As, qn.mapKeys = function(e, t) {
          var n = {};
          return t = ui(t, 3), wr(e, (function(e, r, a) {
            sr(n, t(e, r, a), e);
          })), n;
        }, qn.mapValues = function(e, t) {
          var n = {};
          return t = ui(t, 3), wr(e, (function(e, r, a) {
            sr(n, r, t(e, r, a));
          })), n;
        }, qn.matches = function(e) {
          return qr(ur(e, 1));
        }, qn.matchesProperty = function(e, t) {
          return Fr(e, ur(t, 1));
        }, qn.memoize = Ls, qn.merge = Lo, qn.mergeWith = Po, qn.method = oc, qn.methodOf = cc, 
        qn.mixin = uc, qn.negate = Ps, qn.nthArg = function(e) {
          return e = mo(e), Yr((function(t) {
            return Wr(t, e);
          }));
        }, qn.omit = Zo, qn.omitBy = function(e, t) {
          return $o(e, Ps(ui(t)));
        }, qn.once = function(e) {
          return Cs(2, e);
        }, qn.orderBy = function(e, t, n, a) {
          return null == e ? [] : (Ds(t) || (t = null == t ? [] : [ t ]), Ds(n = a ? r : n) || (n = null == n ? [] : [ n ]), 
          Dr(e, t, n));
        }, qn.over = fc, qn.overArgs = Zs, qn.overEvery = dc, qn.overSome = hc, qn.partial = zs, 
        qn.partialRight = $s, qn.partition = Ts, qn.pick = zo, qn.pickBy = $o, qn.property = pc, 
        qn.propertyOf = function(e) {
          return function(t) {
            return null == e ? r : Ar(e, t);
          };
        }, qn.pull = Qi, qn.pullAll = Xi, qn.pullAllBy = function(e, t, n) {
          return e && e.length && t && t.length ? Hr(e, t, ui(n, 2)) : e;
        }, qn.pullAllWith = function(e, t, n) {
          return e && e.length && t && t.length ? Hr(e, t, r, n) : e;
        }, qn.pullAt = es, qn.range = gc, qn.rangeRight = mc, qn.rearg = Bs, qn.reject = function(e, t) {
          return (Ds(e) ? Et : yr)(e, Ps(ui(t, 3)));
        }, qn.remove = function(e, t) {
          var n = [];
          if (!e || !e.length) return n;
          var r = -1, a = [], i = e.length;
          for (t = ui(t, 3); ++r < i; ) {
            var s = e[r];
            t(s, r, e) && (n.push(s), a.push(r));
          }
          return Kr(e, a), n;
        }, qn.rest = function(e, t) {
          if ("function" != typeof e) throw new Ie(a);
          return Yr(e, t = t === r ? t : mo(t));
        }, qn.reverse = ts, qn.sampleSize = function(e, t, n) {
          return t = (n ? _i(e, t, n) : t === r) ? 1 : mo(t), (Ds(e) ? Xn : Xr)(e, t);
        }, qn.set = function(e, t, n) {
          return null == e ? e : ea(e, t, n);
        }, qn.setWith = function(e, t, n, a) {
          return a = "function" == typeof a ? a : r, null == e ? e : ea(e, t, n, a);
        }, qn.shuffle = function(e) {
          return (Ds(e) ? er : ra)(e);
        }, qn.slice = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          return a ? (n && "number" != typeof n && _i(e, t, n) ? (t = 0, n = a) : (t = null == t ? 0 : mo(t), 
          n = n === r ? a : mo(n)), aa(e, t, n)) : [];
        }, qn.sortBy = Ms, qn.sortedUniq = function(e) {
          return e && e.length ? ca(e) : [];
        }, qn.sortedUniqBy = function(e, t) {
          return e && e.length ? ca(e, ui(t, 2)) : [];
        }, qn.split = function(e, t, n) {
          return n && "number" != typeof n && _i(e, t, n) && (t = n = r), (n = n === r ? g : n >>> 0) ? (e = _o(e)) && ("string" == typeof t || null != t && !so(t)) && !(t = la(t)) && cn(e) ? xa(pn(e), 0, n) : e.split(t, n) : [];
        }, qn.spread = function(e, t) {
          if ("function" != typeof e) throw new Ie(a);
          return t = null == t ? 0 : bn(mo(t), 0), Yr((function(n) {
            var r = n[t], a = xa(n, 0, t);
            return r && Lt(a, r), Mt(e, this, a);
          }));
        }, qn.tail = function(e) {
          var t = null == e ? 0 : e.length;
          return t ? aa(e, 1, t) : [];
        }, qn.take = function(e, t, n) {
          return e && e.length ? aa(e, 0, (t = n || t === r ? 1 : mo(t)) < 0 ? 0 : t) : [];
        }, qn.takeRight = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          return a ? aa(e, (t = a - (t = n || t === r ? 1 : mo(t))) < 0 ? 0 : t, a) : [];
        }, qn.takeRightWhile = function(e, t) {
          return e && e.length ? pa(e, ui(t, 3), !1, !0) : [];
        }, qn.takeWhile = function(e, t) {
          return e && e.length ? pa(e, ui(t, 3)) : [];
        }, qn.tap = function(e, t) {
          return t(e), e;
        }, qn.throttle = function(e, t, n) {
          var r = !0, i = !0;
          if ("function" != typeof e) throw new Ie(a);
          return to(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), 
          Os(e, t, {
            leading: r,
            maxWait: t,
            trailing: i
          });
        }, qn.thru = ps, qn.toArray = po, qn.toPairs = Bo, qn.toPairsIn = qo, qn.toPath = function(e) {
          return Ds(e) ? Rt(e, zi) : uo(e) ? [ e ] : Ia(Zi(_o(e)));
        }, qn.toPlainObject = bo, qn.transform = function(e, t, n) {
          var r = Ds(e), a = r || Gs(e) || lo(e);
          if (t = ui(t, 4), null == n) {
            var i = e && e.constructor;
            n = a ? r ? new i : [] : to(e) && Qs(i) ? Fn(He(e)) : {};
          }
          return (a ? St : wr)(e, (function(e, r, a) {
            return t(n, e, r, a);
          })), n;
        }, qn.unary = function(e) {
          return Ss(e, 1);
        }, qn.union = ns, qn.unionBy = rs, qn.unionWith = as, qn.uniq = function(e) {
          return e && e.length ? fa(e) : [];
        }, qn.uniqBy = function(e, t) {
          return e && e.length ? fa(e, ui(t, 2)) : [];
        }, qn.uniqWith = function(e, t) {
          return t = "function" == typeof t ? t : r, e && e.length ? fa(e, r, t) : [];
        }, qn.unset = function(e, t) {
          return null == e || da(e, t);
        }, qn.unzip = is, qn.unzipWith = ss, qn.update = function(e, t, n) {
          return null == e ? e : ha(e, t, ba(n));
        }, qn.updateWith = function(e, t, n, a) {
          return a = "function" == typeof a ? a : r, null == e ? e : ha(e, t, ba(n), a);
        }, qn.values = Fo, qn.valuesIn = function(e) {
          return null == e ? [] : Xt(e, Ro(e));
        }, qn.without = os, qn.words = Xo, qn.wrap = function(e, t) {
          return zs(ba(t), e);
        }, qn.xor = cs, qn.xorBy = us, qn.xorWith = ls, qn.zip = fs, qn.zipObject = function(e, t) {
          return ya(e || [], t || [], nr);
        }, qn.zipObjectDeep = function(e, t) {
          return ya(e || [], t || [], ea);
        }, qn.zipWith = ds, qn.entries = Bo, qn.entriesIn = qo, qn.extend = xo, qn.extendWith = ko, 
        uc(qn, qn), qn.add = bc, qn.attempt = ec, qn.camelCase = Uo, qn.capitalize = Wo, 
        qn.ceil = _c, qn.clamp = function(e, t, n) {
          return n === r && (n = t, t = r), n !== r && (n = (n = vo(n)) == n ? n : 0), t !== r && (t = (t = vo(t)) == t ? t : 0), 
          cr(vo(e), t, n);
        }, qn.clone = function(e) {
          return ur(e, 4);
        }, qn.cloneDeep = function(e) {
          return ur(e, 5);
        }, qn.cloneDeepWith = function(e, t) {
          return ur(e, 5, t = "function" == typeof t ? t : r);
        }, qn.cloneWith = function(e, t) {
          return ur(e, 4, t = "function" == typeof t ? t : r);
        }, qn.conformsTo = function(e, t) {
          return null == t || lr(e, t, No(t));
        }, qn.deburr = Do, qn.defaultTo = function(e, t) {
          return null == e || e != e ? t : e;
        }, qn.divide = wc, qn.endsWith = function(e, t, n) {
          e = _o(e), t = la(t);
          var a = e.length, i = n = n === r ? a : cr(mo(n), 0, a);
          return (n -= t.length) >= 0 && e.slice(n, i) == t;
        }, qn.eq = qs, qn.escape = function(e) {
          return (e = _o(e)) && J.test(e) ? e.replace(K, sn) : e;
        }, qn.escapeRegExp = function(e) {
          return (e = _o(e)) && ae.test(e) ? e.replace(re, "\\$&") : e;
        }, qn.every = function(e, t, n) {
          var a = Ds(e) ? It : gr;
          return n && _i(e, t, n) && (t = r), a(e, ui(t, 3));
        }, qn.find = ys, qn.findIndex = Wi, qn.findKey = function(e, t) {
          return Bt(e, ui(t, 3), wr);
        }, qn.findLast = vs, qn.findLastIndex = Di, qn.findLastKey = function(e, t) {
          return Bt(e, ui(t, 3), xr);
        }, qn.floor = xc, qn.forEach = bs, qn.forEachRight = _s, qn.forIn = function(e, t) {
          return null == e ? e : br(e, ui(t, 3), Ro);
        }, qn.forInRight = function(e, t) {
          return null == e ? e : _r(e, ui(t, 3), Ro);
        }, qn.forOwn = function(e, t) {
          return e && wr(e, ui(t, 3));
        }, qn.forOwnRight = function(e, t) {
          return e && xr(e, ui(t, 3));
        }, qn.get = So, qn.gt = Fs, qn.gte = Us, qn.has = function(e, t) {
          return null != e && mi(e, t, Sr);
        }, qn.hasIn = Co, qn.head = Hi, qn.identity = ic, qn.includes = function(e, t, n, r) {
          e = Hs(e) ? e : Fo(e), n = n && !r ? mo(n) : 0;
          var a = e.length;
          return n < 0 && (n = bn(a + n, 0)), co(e) ? n <= a && e.indexOf(t, n) > -1 : !!a && Ft(e, t, n) > -1;
        }, qn.indexOf = function(e, t, n) {
          var r = null == e ? 0 : e.length;
          if (!r) return -1;
          var a = null == n ? 0 : mo(n);
          return a < 0 && (a = bn(r + a, 0)), Ft(e, t, a);
        }, qn.inRange = function(e, t, n) {
          return t = go(t), n === r ? (n = t, t = 0) : n = go(n), function(e, t, n) {
            return e >= _n(t, n) && e < bn(t, n);
          }(e = vo(e), t, n);
        }, qn.invoke = Oo, qn.isArguments = Ws, qn.isArray = Ds, qn.isArrayBuffer = Vs, 
        qn.isArrayLike = Hs, qn.isArrayLikeObject = Ks, qn.isBoolean = function(e) {
          return !0 === e || !1 === e || no(e) && Mr(e) == b;
        }, qn.isBuffer = Gs, qn.isDate = Js, qn.isElement = function(e) {
          return no(e) && 1 === e.nodeType && !io(e);
        }, qn.isEmpty = function(e) {
          if (null == e) return !0;
          if (Hs(e) && (Ds(e) || "string" == typeof e || "function" == typeof e.splice || Gs(e) || lo(e) || Ws(e))) return !e.length;
          var t = gi(e);
          if (t == A || t == C) return !e.size;
          if (Ai(e)) return !Zr(e).length;
          for (var n in e) if (Pe.call(e, n)) return !1;
          return !0;
        }, qn.isEqual = function(e, t) {
          return Nr(e, t);
        }, qn.isEqualWith = function(e, t, n) {
          var a = (n = "function" == typeof n ? n : r) ? n(e, t) : r;
          return a === r ? Nr(e, t, r, n) : !!a;
        }, qn.isError = Ys, qn.isFinite = function(e) {
          return "number" == typeof e && $t(e);
        }, qn.isFunction = Qs, qn.isInteger = Xs, qn.isLength = eo, qn.isMap = ro, qn.isMatch = function(e, t) {
          return e === t || Rr(e, t, fi(t));
        }, qn.isMatchWith = function(e, t, n) {
          return n = "function" == typeof n ? n : r, Rr(e, t, fi(t), n);
        }, qn.isNaN = function(e) {
          return ao(e) && e != +e;
        }, qn.isNative = function(e) {
          if (ki(e)) throw new Ae("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
          return Lr(e);
        }, qn.isNil = function(e) {
          return null == e;
        }, qn.isNull = function(e) {
          return null === e;
        }, qn.isNumber = ao, qn.isObject = to, qn.isObjectLike = no, qn.isPlainObject = io, 
        qn.isRegExp = so, qn.isSafeInteger = function(e) {
          return Xs(e) && e >= -9007199254740991 && e <= h;
        }, qn.isSet = oo, qn.isString = co, qn.isSymbol = uo, qn.isTypedArray = lo, qn.isUndefined = function(e) {
          return e === r;
        }, qn.isWeakMap = function(e) {
          return no(e) && gi(e) == O;
        }, qn.isWeakSet = function(e) {
          return no(e) && "[object WeakSet]" == Mr(e);
        }, qn.join = function(e, t) {
          return null == e ? "" : Ht.call(e, t);
        }, qn.kebabCase = Vo, qn.last = Yi, qn.lastIndexOf = function(e, t, n) {
          var a = null == e ? 0 : e.length;
          if (!a) return -1;
          var i = a;
          return n !== r && (i = (i = mo(n)) < 0 ? bn(a + i, 0) : _n(i, a - 1)), t == t ? function(e, t, n) {
            for (var r = n + 1; r--; ) if (e[r] === t) return r;
            return r;
          }(e, t, i) : qt(e, Wt, i, !0);
        }, qn.lowerCase = Ho, qn.lowerFirst = Ko, qn.lt = fo, qn.lte = ho, qn.max = function(e) {
          return e && e.length ? mr(e, ic, jr) : r;
        }, qn.maxBy = function(e, t) {
          return e && e.length ? mr(e, ui(t, 2), jr) : r;
        }, qn.mean = function(e) {
          return Dt(e, ic);
        }, qn.meanBy = function(e, t) {
          return Dt(e, ui(t, 2));
        }, qn.min = function(e) {
          return e && e.length ? mr(e, ic, $r) : r;
        }, qn.minBy = function(e, t) {
          return e && e.length ? mr(e, ui(t, 2), $r) : r;
        }, qn.stubArray = yc, qn.stubFalse = vc, qn.stubObject = function() {
          return {};
        }, qn.stubString = function() {
          return "";
        }, qn.stubTrue = function() {
          return !0;
        }, qn.multiply = Ac, qn.nth = function(e, t) {
          return e && e.length ? Wr(e, mo(t)) : r;
        }, qn.noConflict = function() {
          return pt._ === this && (pt._ = qe), this;
        }, qn.noop = lc, qn.now = js, qn.pad = function(e, t, n) {
          e = _o(e);
          var r = (t = mo(t)) ? hn(e) : 0;
          if (!t || r >= t) return e;
          var a = (t - r) / 2;
          return Da(mt(a), n) + e + Da(gt(a), n);
        }, qn.padEnd = function(e, t, n) {
          e = _o(e);
          var r = (t = mo(t)) ? hn(e) : 0;
          return t && r < t ? e + Da(t - r, n) : e;
        }, qn.padStart = function(e, t, n) {
          e = _o(e);
          var r = (t = mo(t)) ? hn(e) : 0;
          return t && r < t ? Da(t - r, n) + e : e;
        }, qn.parseInt = function(e, t, n) {
          return n || null == t ? t = 0 : t && (t = +t), xn(_o(e).replace(ie, ""), t || 0);
        }, qn.random = function(e, t, n) {
          if (n && "boolean" != typeof n && _i(e, t, n) && (t = n = r), n === r && ("boolean" == typeof t ? (n = t, 
          t = r) : "boolean" == typeof e && (n = e, e = r)), e === r && t === r ? (e = 0, 
          t = 1) : (e = go(e), t === r ? (t = e, e = 0) : t = go(t)), e > t) {
            var a = e;
            e = t, t = a;
          }
          if (n || e % 1 || t % 1) {
            var i = kn();
            return _n(e + i * (t - e + lt("1e-" + ((i + "").length - 1))), t);
          }
          return Gr(e, t);
        }, qn.reduce = function(e, t, n) {
          var r = Ds(e) ? Pt : Kt, a = arguments.length < 3;
          return r(e, ui(t, 4), n, a, hr);
        }, qn.reduceRight = function(e, t, n) {
          var r = Ds(e) ? Zt : Kt, a = arguments.length < 3;
          return r(e, ui(t, 4), n, a, pr);
        }, qn.repeat = function(e, t, n) {
          return t = (n ? _i(e, t, n) : t === r) ? 1 : mo(t), Jr(_o(e), t);
        }, qn.replace = function() {
          var e = arguments, t = _o(e[0]);
          return e.length < 3 ? t : t.replace(e[1], e[2]);
        }, qn.result = function(e, t, n) {
          var a = -1, i = (t = _a(t, e)).length;
          for (i || (i = 1, e = r); ++a < i; ) {
            var s = null == e ? r : e[zi(t[a])];
            s === r && (a = i, s = n), e = Qs(s) ? s.call(e) : s;
          }
          return e;
        }, qn.round = Tc, qn.runInContext = e, qn.sample = function(e) {
          return (Ds(e) ? Qn : Qr)(e);
        }, qn.size = function(e) {
          if (null == e) return 0;
          if (Hs(e)) return co(e) ? hn(e) : e.length;
          var t = gi(e);
          return t == A || t == C ? e.size : Zr(e).length;
        }, qn.snakeCase = Go, qn.some = function(e, t, n) {
          var a = Ds(e) ? zt : ia;
          return n && _i(e, t, n) && (t = r), a(e, ui(t, 3));
        }, qn.sortedIndex = function(e, t) {
          return sa(e, t);
        }, qn.sortedIndexBy = function(e, t, n) {
          return oa(e, t, ui(n, 2));
        }, qn.sortedIndexOf = function(e, t) {
          var n = null == e ? 0 : e.length;
          if (n) {
            var r = sa(e, t);
            if (r < n && qs(e[r], t)) return r;
          }
          return -1;
        }, qn.sortedLastIndex = function(e, t) {
          return sa(e, t, !0);
        }, qn.sortedLastIndexBy = function(e, t, n) {
          return oa(e, t, ui(n, 2), !0);
        }, qn.sortedLastIndexOf = function(e, t) {
          if (null == e ? 0 : e.length) {
            var n = sa(e, t, !0) - 1;
            if (qs(e[n], t)) return n;
          }
          return -1;
        }, qn.startCase = Jo, qn.startsWith = function(e, t, n) {
          return e = _o(e), n = null == n ? 0 : cr(mo(n), 0, e.length), t = la(t), e.slice(n, n + t.length) == t;
        }, qn.subtract = Mc, qn.sum = function(e) {
          return e && e.length ? Gt(e, ic) : 0;
        }, qn.sumBy = function(e, t) {
          return e && e.length ? Gt(e, ui(t, 2)) : 0;
        }, qn.template = function(e, t, n) {
          var a = qn.templateSettings;
          n && _i(e, t, n) && (t = r), e = _o(e), t = ko({}, t, a, Xa);
          var i, s, o = ko({}, t.imports, a.imports, Xa), c = No(o), u = Xt(o, c), l = 0, f = t.interpolate || we, d = "__p += '", h = Se((t.escape || we).source + "|" + f.source + "|" + (f === X ? he : we).source + "|" + (t.evaluate || we).source + "|$", "g"), p = "//# sourceURL=" + (Pe.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++st + "]") + "\n";
          e.replace(h, (function(t, n, r, a, o, c) {
            return r || (r = a), d += e.slice(l, c).replace(xe, on), n && (i = !0, d += "' +\n__e(" + n + ") +\n'"), 
            o && (s = !0, d += "';\n" + o + ";\n__p += '"), r && (d += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), 
            l = c + t.length, t;
          })), d += "';\n";
          var g = Pe.call(t, "variable") && t.variable;
          if (g) {
            if (fe.test(g)) throw new Ae("Invalid `variable` option passed into `_.template`");
          } else d = "with (obj) {\n" + d + "\n}\n";
          d = (s ? d.replace(W, "") : d).replace(D, "$1").replace(V, "$1;"), d = "function(" + (g || "obj") + ") {\n" + (g ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (i ? ", __e = _.escape" : "") + (s ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + d + "return __p\n}";
          var m = ec((function() {
            return Te(c, p + "return " + d).apply(r, u);
          }));
          if (m.source = d, Ys(m)) throw m;
          return m;
        }, qn.times = function(e, t) {
          if ((e = mo(e)) < 1 || e > h) return [];
          var n = g, r = _n(e, g);
          t = ui(t), e -= g;
          for (var a = Jt(r, t); ++n < e; ) t(n);
          return a;
        }, qn.toFinite = go, qn.toInteger = mo, qn.toLength = yo, qn.toLower = function(e) {
          return _o(e).toLowerCase();
        }, qn.toNumber = vo, qn.toSafeInteger = function(e) {
          return e ? cr(mo(e), -9007199254740991, h) : 0 === e ? e : 0;
        }, qn.toString = _o, qn.toUpper = function(e) {
          return _o(e).toUpperCase();
        }, qn.trim = function(e, t, n) {
          if ((e = _o(e)) && (n || t === r)) return Yt(e);
          if (!e || !(t = la(t))) return e;
          var a = pn(e), i = pn(t);
          return xa(a, tn(a, i), nn(a, i) + 1).join("");
        }, qn.trimEnd = function(e, t, n) {
          if ((e = _o(e)) && (n || t === r)) return e.slice(0, gn(e) + 1);
          if (!e || !(t = la(t))) return e;
          var a = pn(e);
          return xa(a, 0, nn(a, pn(t)) + 1).join("");
        }, qn.trimStart = function(e, t, n) {
          if ((e = _o(e)) && (n || t === r)) return e.replace(ie, "");
          if (!e || !(t = la(t))) return e;
          var a = pn(e);
          return xa(a, tn(a, pn(t))).join("");
        }, qn.truncate = function(e, t) {
          var n = 30, a = "...";
          if (to(t)) {
            var i = "separator" in t ? t.separator : i;
            n = "length" in t ? mo(t.length) : n, a = "omission" in t ? la(t.omission) : a;
          }
          var s = (e = _o(e)).length;
          if (cn(e)) {
            var o = pn(e);
            s = o.length;
          }
          if (n >= s) return e;
          var c = n - hn(a);
          if (c < 1) return a;
          var u = o ? xa(o, 0, c).join("") : e.slice(0, c);
          if (i === r) return u + a;
          if (o && (c += u.length - c), so(i)) {
            if (e.slice(c).search(i)) {
              var l, f = u;
              for (i.global || (i = Se(i.source, _o(pe.exec(i)) + "g")), i.lastIndex = 0; l = i.exec(f); ) var d = l.index;
              u = u.slice(0, d === r ? c : d);
            }
          } else if (e.indexOf(la(i), c) != c) {
            var h = u.lastIndexOf(i);
            h > -1 && (u = u.slice(0, h));
          }
          return u + a;
        }, qn.unescape = function(e) {
          return (e = _o(e)) && G.test(e) ? e.replace(H, mn) : e;
        }, qn.uniqueId = function(e) {
          var t = ++Ze;
          return _o(e) + t;
        }, qn.upperCase = Yo, qn.upperFirst = Qo, qn.each = bs, qn.eachRight = _s, qn.first = Hi, 
        uc(qn, (kc = {}, wr(qn, (function(e, t) {
          Pe.call(qn.prototype, t) || (kc[t] = e);
        })), kc), {
          chain: !1
        }), qn.VERSION = "4.17.21", St([ "bind", "bindKey", "curry", "curryRight", "partial", "partialRight" ], (function(e) {
          qn[e].placeholder = qn;
        })), St([ "drop", "take" ], (function(e, t) {
          Dn.prototype[e] = function(n) {
            n = n === r ? 1 : bn(mo(n), 0);
            var a = this.__filtered__ && !t ? new Dn(this) : this.clone();
            return a.__filtered__ ? a.__takeCount__ = _n(n, a.__takeCount__) : a.__views__.push({
              size: _n(n, g),
              type: e + (a.__dir__ < 0 ? "Right" : "")
            }), a;
          }, Dn.prototype[e + "Right"] = function(t) {
            return this.reverse()[e](t).reverse();
          };
        })), St([ "filter", "map", "takeWhile" ], (function(e, t) {
          var n = t + 1, r = 1 == n || 3 == n;
          Dn.prototype[e] = function(e) {
            var t = this.clone();
            return t.__iteratees__.push({
              iteratee: ui(e, 3),
              type: n
            }), t.__filtered__ = t.__filtered__ || r, t;
          };
        })), St([ "head", "last" ], (function(e, t) {
          var n = "take" + (t ? "Right" : "");
          Dn.prototype[e] = function() {
            return this[n](1).value()[0];
          };
        })), St([ "initial", "tail" ], (function(e, t) {
          var n = "drop" + (t ? "" : "Right");
          Dn.prototype[e] = function() {
            return this.__filtered__ ? new Dn(this) : this[n](1);
          };
        })), Dn.prototype.compact = function() {
          return this.filter(ic);
        }, Dn.prototype.find = function(e) {
          return this.filter(e).head();
        }, Dn.prototype.findLast = function(e) {
          return this.reverse().find(e);
        }, Dn.prototype.invokeMap = Yr((function(e, t) {
          return "function" == typeof e ? new Dn(this) : this.map((function(n) {
            return Er(n, e, t);
          }));
        })), Dn.prototype.reject = function(e) {
          return this.filter(Ps(ui(e)));
        }, Dn.prototype.slice = function(e, t) {
          e = mo(e);
          var n = this;
          return n.__filtered__ && (e > 0 || t < 0) ? new Dn(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), 
          t !== r && (n = (t = mo(t)) < 0 ? n.dropRight(-t) : n.take(t - e)), n);
        }, Dn.prototype.takeRightWhile = function(e) {
          return this.reverse().takeWhile(e).reverse();
        }, Dn.prototype.toArray = function() {
          return this.take(g);
        }, wr(Dn.prototype, (function(e, t) {
          var n = /^(?:filter|find|map|reject)|While$/.test(t), a = /^(?:head|last)$/.test(t), i = qn[a ? "take" + ("last" == t ? "Right" : "") : t], s = a || /^find/.test(t);
          i && (qn.prototype[t] = function() {
            var t = this.__wrapped__, o = a ? [ 1 ] : arguments, c = t instanceof Dn, u = o[0], l = c || Ds(t), f = function(e) {
              var t = i.apply(qn, Lt([ e ], o));
              return a && d ? t[0] : t;
            };
            l && n && "function" == typeof u && 1 != u.length && (c = l = !1);
            var d = this.__chain__, h = !!this.__actions__.length, p = s && !d, g = c && !h;
            if (!s && l) {
              t = g ? t : new Dn(this);
              var m = e.apply(t, o);
              return m.__actions__.push({
                func: ps,
                args: [ f ],
                thisArg: r
              }), new Wn(m, d);
            }
            return p && g ? e.apply(this, o) : (m = this.thru(f), p ? a ? m.value()[0] : m.value() : m);
          });
        })), St([ "pop", "push", "shift", "sort", "splice", "unshift" ], (function(e) {
          var t = Ee[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(e);
          qn.prototype[e] = function() {
            var e = arguments;
            if (r && !this.__chain__) {
              var a = this.value();
              return t.apply(Ds(a) ? a : [], e);
            }
            return this[n]((function(n) {
              return t.apply(Ds(n) ? n : [], e);
            }));
          };
        })), wr(Dn.prototype, (function(e, t) {
          var n = qn[t];
          if (n) {
            var r = n.name + "";
            Pe.call(On, r) || (On[r] = []), On[r].push({
              name: t,
              func: n
            });
          }
        })), On[qa(r, 2).name] = [ {
          name: "wrapper",
          func: r
        } ], Dn.prototype.clone = function() {
          var e = new Dn(this.__wrapped__);
          return e.__actions__ = Ia(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, 
          e.__iteratees__ = Ia(this.__iteratees__), e.__takeCount__ = this.__takeCount__, 
          e.__views__ = Ia(this.__views__), e;
        }, Dn.prototype.reverse = function() {
          if (this.__filtered__) {
            var e = new Dn(this);
            e.__dir__ = -1, e.__filtered__ = !0;
          } else (e = this.clone()).__dir__ *= -1;
          return e;
        }, Dn.prototype.value = function() {
          var e = this.__wrapped__.value(), t = this.__dir__, n = Ds(e), r = t < 0, a = n ? e.length : 0, i = function(e, t, n) {
            var r = -1, a = n.length;
            for (;++r < a; ) {
              var i = n[r], s = i.size;
              switch (i.type) {
               case "drop":
                e += s;
                break;

               case "dropRight":
                t -= s;
                break;

               case "take":
                t = _n(t, e + s);
                break;

               case "takeRight":
                e = bn(e, t - s);
              }
            }
            return {
              start: e,
              end: t
            };
          }(0, a, this.__views__), s = i.start, o = i.end, c = o - s, u = r ? o : s - 1, l = this.__iteratees__, f = l.length, d = 0, h = _n(c, this.__takeCount__);
          if (!n || !r && a == c && h == c) return ga(e, this.__actions__);
          var p = [];
          e: for (;c-- && d < h; ) {
            for (var g = -1, m = e[u += t]; ++g < f; ) {
              var y = l[g], v = y.iteratee, b = y.type, _ = v(m);
              if (2 == b) m = _; else if (!_) {
                if (1 == b) continue e;
                break e;
              }
            }
            p[d++] = m;
          }
          return p;
        }, qn.prototype.at = gs, qn.prototype.chain = function() {
          return hs(this);
        }, qn.prototype.commit = function() {
          return new Wn(this.value(), this.__chain__);
        }, qn.prototype.next = function() {
          this.__values__ === r && (this.__values__ = po(this.value()));
          var e = this.__index__ >= this.__values__.length;
          return {
            done: e,
            value: e ? r : this.__values__[this.__index__++]
          };
        }, qn.prototype.plant = function(e) {
          for (var t, n = this; n instanceof Un; ) {
            var a = Bi(n);
            a.__index__ = 0, a.__values__ = r, t ? i.__wrapped__ = a : t = a;
            var i = a;
            n = n.__wrapped__;
          }
          return i.__wrapped__ = e, t;
        }, qn.prototype.reverse = function() {
          var e = this.__wrapped__;
          if (e instanceof Dn) {
            var t = e;
            return this.__actions__.length && (t = new Dn(this)), (t = t.reverse()).__actions__.push({
              func: ps,
              args: [ ts ],
              thisArg: r
            }), new Wn(t, this.__chain__);
          }
          return this.thru(ts);
        }, qn.prototype.toJSON = qn.prototype.valueOf = qn.prototype.value = function() {
          return ga(this.__wrapped__, this.__actions__);
        }, qn.prototype.first = qn.prototype.head, Qe && (qn.prototype[Qe] = function() {
          return this;
        }), qn;
      }();
      "function" == typeof define && "object" == typeof define.amd && define.amd ? (pt._ = yn, 
      define((function() {
        return yn;
      }))) : mt ? ((mt.exports = yn)._ = yn, gt._ = yn) : pt._ = yn;
    }).call(this);
  })), i("bt8AJ").register(JSON.parse('{"fMySn":"background.8c443abb.js","8MGJT":"icon48.21c6254b.png","4JszJ":"icon128.21ef1976.png","8YSPa":"icon.d1c6dce0.svg","hVtuA":"icon-keyboard-clicking48.80a2de18.png","415ky":"offscreen.096a14c0.html","eobyI":"offscreen.a7888692.js","iWmnl":"whatsNew.fb2f710d.html","eoas1":"whatsNew.d17eb11f.css","9g757":"onboarding.70ef7cb2.html"}'));
  var s = i("dBVaG");
  s = i("dBVaG");
  function o(e, t, n, r) {
    return new (n || (n = Promise))((function(a, i) {
      function s(e) {
        try {
          c(r.next(e));
        } catch (e) {
          i(e);
        }
      }
      function o(e) {
        try {
          c(r.throw(e));
        } catch (e) {
          i(e);
        }
      }
      function c(e) {
        var t;
        e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
          e(t);
        }))).then(s, o);
      }
      c((r = r.apply(e, t || [])).next());
    }));
  }
  function c(e, t) {
    var n, r, a, i, s = {
      label: 0,
      sent: function() {
        if (1 & a[0]) throw a[1];
        return a[1];
      },
      trys: [],
      ops: []
    };
    return i = {
      next: o(0),
      throw: o(1),
      return: o(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
      return this;
    }), i;
    function o(o) {
      return function(c) {
        return function(o) {
          if (n) throw new TypeError("Generator is already executing.");
          for (;i && (i = 0, o[0] && (s = 0)), s; ) try {
            if (n = 1, r && (a = 2 & o[0] ? r.return : o[0] ? r.throw || ((a = r.return) && a.call(r), 
            0) : r.next) && !(a = a.call(r, o[1])).done) return a;
            switch (r = 0, a && (o = [ 2 & o[0], a.value ]), o[0]) {
             case 0:
             case 1:
              a = o;
              break;

             case 4:
              return s.label++, {
                value: o[1],
                done: !1
              };

             case 5:
              s.label++, r = o[1], o = [ 0 ];
              continue;

             case 7:
              o = s.ops.pop(), s.trys.pop();
              continue;

             default:
              if (!(a = s.trys, (a = a.length > 0 && a[a.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                s = 0;
                continue;
              }
              if (3 === o[0] && (!a || o[1] > a[0] && o[1] < a[3])) {
                s.label = o[1];
                break;
              }
              if (6 === o[0] && s.label < a[1]) {
                s.label = a[1], a = o;
                break;
              }
              if (a && s.label < a[2]) {
                s.label = a[2], s.ops.push(o);
                break;
              }
              a[2] && s.ops.pop(), s.trys.pop();
              continue;
            }
            o = t.call(e, s);
          } catch (e) {
            o = [ 6, e ], r = 0;
          } finally {
            n = a = 0;
          }
          if (5 & o[0]) throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0
          };
        }([ o, c ]);
      };
    }
  }
  Object.create;
  Object.create;
  new Error("timeout while waiting for mutex to become available"), new Error("mutex already locked");
  var u = new Error("request for lock canceled"), l = function() {
    function e(e, t) {
      if (void 0 === t && (t = u), this._maxConcurrency = e, this._cancelError = t, this._queue = [], 
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
      return o(this, void 0, void 0, (function() {
        var t, n, r;
        return c(this, (function(a) {
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
      return o(this, void 0, void 0, (function() {
        var e = this;
        return c(this, (function(t) {
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
  }(), f = function() {
    function e(e) {
      this._semaphore = new l(1, e);
    }
    return e.prototype.acquire = function() {
      return o(this, void 0, void 0, (function() {
        var e;
        return c(this, (function(t) {
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
  var d, h, p;
  s = i("dBVaG");
  (h = d || (d = {})).assertEqual = e => e, h.assertIs = function(e) {}, h.assertNever = function(e) {
    throw new Error;
  }, h.arrayToEnum = e => {
    const t = {};
    for (const n of e) t[n] = n;
    return t;
  }, h.getValidEnumValues = e => {
    const t = h.objectKeys(e).filter((t => "number" != typeof e[e[t]])), n = {};
    for (const r of t) n[r] = e[r];
    return h.objectValues(n);
  }, h.objectValues = e => h.objectKeys(e).map((function(t) {
    return e[t];
  })), h.objectKeys = "function" == typeof Object.keys ? e => Object.keys(e) : e => {
    const t = [];
    for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
    return t;
  }, h.find = (e, t) => {
    for (const n of e) if (t(n)) return n;
  }, h.isInteger = "function" == typeof Number.isInteger ? e => Number.isInteger(e) : e => "number" == typeof e && isFinite(e) && Math.floor(e) === e, 
  h.joinValues = function(e, t = " | ") {
    return e.map((e => "string" == typeof e ? `'${e}'` : e)).join(t);
  }, h.jsonStringifyReplacer = (e, t) => "bigint" == typeof t ? t.toString() : t, 
  (p || (p = {})).mergeShapes = (e, t) => ({
    ...e,
    ...t
  });
  const g = d.arrayToEnum([ "string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set" ]), m = e => {
    switch (typeof e) {
     case "undefined":
      return g.undefined;

     case "string":
      return g.string;

     case "number":
      return isNaN(e) ? g.nan : g.number;

     case "boolean":
      return g.boolean;

     case "function":
      return g.function;

     case "bigint":
      return g.bigint;

     case "symbol":
      return g.symbol;

     case "object":
      return Array.isArray(e) ? g.array : null === e ? g.null : e.then && "function" == typeof e.then && e.catch && "function" == typeof e.catch ? g.promise : "undefined" != typeof Map && e instanceof Map ? g.map : "undefined" != typeof Set && e instanceof Set ? g.set : "undefined" != typeof Date && e instanceof Date ? g.date : g.object;

     default:
      return g.unknown;
    }
  }, y = d.arrayToEnum([ "invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite" ]);
  class v extends Error {
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
      return JSON.stringify(this.issues, d.jsonStringifyReplacer, 2);
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
  v.create = e => new v(e);
  const b = (e, t) => {
    let n;
    switch (e.code) {
     case y.invalid_type:
      n = e.received === g.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
      break;

     case y.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, d.jsonStringifyReplacer)}`;
      break;

     case y.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${d.joinValues(e.keys, ", ")}`;
      break;

     case y.invalid_union:
      n = "Invalid input";
      break;

     case y.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${d.joinValues(e.options)}`;
      break;

     case y.invalid_enum_value:
      n = `Invalid enum value. Expected ${d.joinValues(e.options)}, received '${e.received}'`;
      break;

     case y.invalid_arguments:
      n = "Invalid function arguments";
      break;

     case y.invalid_return_type:
      n = "Invalid function return type";
      break;

     case y.invalid_date:
      n = "Invalid date";
      break;

     case y.invalid_string:
      "object" == typeof e.validation ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, 
      "number" == typeof e.validation.position && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : d.assertNever(e.validation) : n = "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid";
      break;

     case y.too_small:
      n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
      break;

     case y.too_big:
      n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "bigint" === e.type ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
      break;

     case y.custom:
      n = "Invalid input";
      break;

     case y.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;

     case y.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;

     case y.not_finite:
      n = "Number must be finite";
      break;

     default:
      n = t.defaultError, d.assertNever(e);
    }
    return {
      message: n
    };
  };
  let _ = b;
  function w() {
    return _;
  }
  const x = e => {
    const {data: t, path: n, errorMaps: r, issueData: a} = e, i = [ ...n, ...a.path || [] ], s = {
      ...a,
      path: i
    };
    let o = "";
    const c = r.filter((e => !!e)).slice().reverse();
    for (const e of c) o = e(s, {
      data: t,
      defaultError: o
    }).message;
    return {
      ...a,
      path: i,
      message: a.message || o
    };
  };
  function k(e, t) {
    const n = x({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [ e.common.contextualErrorMap, e.schemaErrorMap, w(), b ].filter((e => !!e))
    });
    e.common.issues.push(n);
  }
  class A {
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
        if ("aborted" === r.status) return T;
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
      return A.mergeObjectSync(e, n);
    }
    static mergeObjectSync(e, t) {
      const n = {};
      for (const r of t) {
        const {key: t, value: a} = r;
        if ("aborted" === t.status) return T;
        if ("aborted" === a.status) return T;
        "dirty" === t.status && e.dirty(), "dirty" === a.status && e.dirty(), "__proto__" === t.value || void 0 === a.value && !r.alwaysSet || (n[t.value] = a.value);
      }
      return {
        status: e.value,
        value: n
      };
    }
  }
  const T = Object.freeze({
    status: "aborted"
  }), M = e => ({
    status: "dirty",
    value: e
  }), j = e => ({
    status: "valid",
    value: e
  }), S = e => "aborted" === e.status, C = e => "dirty" === e.status, I = e => "valid" === e.status, E = e => "undefined" != typeof Promise && e instanceof Promise;
  var O, N;
  (N = O || (O = {})).errToObj = e => "string" == typeof e ? {
    message: e
  } : e || {}, N.toString = e => "string" == typeof e ? e : null == e ? void 0 : e.message;
  class R {
    constructor(e, t, n, r) {
      this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), 
      this._cachedPath;
    }
  }
  const L = (e, t) => {
    if (I(t)) return {
      success: !0,
      data: t.value
    };
    if (!e.common.issues.length) throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        const t = new v(e.common.issues);
        return this._error = t, this._error;
      }
    };
  };
  function P(e) {
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
  class Z {
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
      return m(e.data);
    }
    _getOrReturnCtx(e, t) {
      return t || {
        common: e.parent.common,
        data: e.data,
        parsedType: m(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      };
    }
    _processInputParams(e) {
      return {
        status: new A,
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: m(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent
        }
      };
    }
    _parseSync(e) {
      const t = this._parse(e);
      if (E(t)) throw new Error("Synchronous parse encountered promise.");
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
        parsedType: m(e)
      }, a = this._parseSync({
        data: e,
        path: r.path,
        parent: r
      });
      return L(r, a);
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
        parsedType: m(e)
      }, r = this._parse({
        data: e,
        path: n.path,
        parent: n
      }), a = await (E(r) ? r : Promise.resolve(r));
      return L(n, a);
    }
    refine(e, t) {
      const n = e => "string" == typeof t || void 0 === t ? {
        message: t
      } : "function" == typeof t ? t(e) : t;
      return this._refinement(((t, r) => {
        const a = e(t), i = () => r.addIssue({
          code: y.custom,
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
      return new Ae({
        schema: this,
        typeName: Pe.ZodEffects,
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
      return Te.create(this, this._def);
    }
    nullable() {
      return Me.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return ie.create(this, this._def);
    }
    promise() {
      return ke.create(this, this._def);
    }
    or(e) {
      return ce.create([ this, e ], this._def);
    }
    and(e) {
      return de.create(this, e, this._def);
    }
    transform(e) {
      return new Ae({
        ...P(this._def),
        schema: this,
        typeName: Pe.ZodEffects,
        effect: {
          type: "transform",
          transform: e
        }
      });
    }
    default(e) {
      const t = "function" == typeof e ? e : () => e;
      return new je({
        ...P(this._def),
        innerType: this,
        defaultValue: t,
        typeName: Pe.ZodDefault
      });
    }
    brand() {
      return new Ee({
        typeName: Pe.ZodBranded,
        type: this,
        ...P(this._def)
      });
    }
    catch(e) {
      const t = "function" == typeof e ? e : () => e;
      return new Se({
        ...P(this._def),
        innerType: this,
        catchValue: t,
        typeName: Pe.ZodCatch
      });
    }
    describe(e) {
      return new (0, this.constructor)({
        ...this._def,
        description: e
      });
    }
    pipe(e) {
      return Oe.create(this, e);
    }
    readonly() {
      return Ne.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  const z = /^c[^\s-]{8,}$/i, $ = /^[a-z][a-z0-9]*$/, B = /^[0-9A-HJKMNP-TV-Z]{26}$/, q = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, F = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
  let U;
  const W = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, D = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
  class V extends Z {
    _parse(e) {
      this._def.coerce && (e.data = String(e.data));
      if (this._getType(e) !== g.string) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.string,
          received: t.parsedType
        }), T;
      }
      const t = new A;
      let n;
      for (const s of this._def.checks) if ("min" === s.kind) e.data.length < s.value && (n = this._getOrReturnCtx(e, n), 
      k(n, {
        code: y.too_small,
        minimum: s.value,
        type: "string",
        inclusive: !0,
        exact: !1,
        message: s.message
      }), t.dirty()); else if ("max" === s.kind) e.data.length > s.value && (n = this._getOrReturnCtx(e, n), 
      k(n, {
        code: y.too_big,
        maximum: s.value,
        type: "string",
        inclusive: !0,
        exact: !1,
        message: s.message
      }), t.dirty()); else if ("length" === s.kind) {
        const r = e.data.length > s.value, a = e.data.length < s.value;
        (r || a) && (n = this._getOrReturnCtx(e, n), r ? k(n, {
          code: y.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : a && k(n, {
          code: y.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), t.dirty());
      } else if ("email" === s.kind) F.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      k(n, {
        validation: "email",
        code: y.invalid_string,
        message: s.message
      }), t.dirty()); else if ("emoji" === s.kind) U || (U = new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), 
      U.test(e.data) || (n = this._getOrReturnCtx(e, n), k(n, {
        validation: "emoji",
        code: y.invalid_string,
        message: s.message
      }), t.dirty()); else if ("uuid" === s.kind) q.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      k(n, {
        validation: "uuid",
        code: y.invalid_string,
        message: s.message
      }), t.dirty()); else if ("cuid" === s.kind) z.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      k(n, {
        validation: "cuid",
        code: y.invalid_string,
        message: s.message
      }), t.dirty()); else if ("cuid2" === s.kind) $.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      k(n, {
        validation: "cuid2",
        code: y.invalid_string,
        message: s.message
      }), t.dirty()); else if ("ulid" === s.kind) B.test(e.data) || (n = this._getOrReturnCtx(e, n), 
      k(n, {
        validation: "ulid",
        code: y.invalid_string,
        message: s.message
      }), t.dirty()); else if ("url" === s.kind) try {
        new URL(e.data);
      } catch (r) {
        n = this._getOrReturnCtx(e, n), k(n, {
          validation: "url",
          code: y.invalid_string,
          message: s.message
        }), t.dirty();
      } else if ("regex" === s.kind) {
        s.regex.lastIndex = 0;
        s.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), k(n, {
          validation: "regex",
          code: y.invalid_string,
          message: s.message
        }), t.dirty());
      } else if ("trim" === s.kind) e.data = e.data.trim(); else if ("includes" === s.kind) e.data.includes(s.value, s.position) || (n = this._getOrReturnCtx(e, n), 
      k(n, {
        code: y.invalid_string,
        validation: {
          includes: s.value,
          position: s.position
        },
        message: s.message
      }), t.dirty()); else if ("toLowerCase" === s.kind) e.data = e.data.toLowerCase(); else if ("toUpperCase" === s.kind) e.data = e.data.toUpperCase(); else if ("startsWith" === s.kind) e.data.startsWith(s.value) || (n = this._getOrReturnCtx(e, n), 
      k(n, {
        code: y.invalid_string,
        validation: {
          startsWith: s.value
        },
        message: s.message
      }), t.dirty()); else if ("endsWith" === s.kind) e.data.endsWith(s.value) || (n = this._getOrReturnCtx(e, n), 
      k(n, {
        code: y.invalid_string,
        validation: {
          endsWith: s.value
        },
        message: s.message
      }), t.dirty()); else if ("datetime" === s.kind) {
        ((i = s).precision ? i.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${i.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${i.precision}}Z$`) : 0 === i.precision ? i.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : i.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$")).test(e.data) || (n = this._getOrReturnCtx(e, n), 
        k(n, {
          code: y.invalid_string,
          validation: "datetime",
          message: s.message
        }), t.dirty());
      } else "ip" === s.kind ? (r = e.data, ("v4" !== (a = s.version) && a || !W.test(r)) && ("v6" !== a && a || !D.test(r)) && (n = this._getOrReturnCtx(e, n), 
      k(n, {
        validation: "ip",
        code: y.invalid_string,
        message: s.message
      }), t.dirty())) : d.assertNever(s);
      var r, a, i;
      return {
        status: t.value,
        value: e.data
      };
    }
    _regex(e, t, n) {
      return this.refinement((t => e.test(t)), {
        validation: t,
        code: y.invalid_string,
        ...O.errToObj(n)
      });
    }
    _addCheck(e) {
      return new V({
        ...this._def,
        checks: [ ...this._def.checks, e ]
      });
    }
    email(e) {
      return this._addCheck({
        kind: "email",
        ...O.errToObj(e)
      });
    }
    url(e) {
      return this._addCheck({
        kind: "url",
        ...O.errToObj(e)
      });
    }
    emoji(e) {
      return this._addCheck({
        kind: "emoji",
        ...O.errToObj(e)
      });
    }
    uuid(e) {
      return this._addCheck({
        kind: "uuid",
        ...O.errToObj(e)
      });
    }
    cuid(e) {
      return this._addCheck({
        kind: "cuid",
        ...O.errToObj(e)
      });
    }
    cuid2(e) {
      return this._addCheck({
        kind: "cuid2",
        ...O.errToObj(e)
      });
    }
    ulid(e) {
      return this._addCheck({
        kind: "ulid",
        ...O.errToObj(e)
      });
    }
    ip(e) {
      return this._addCheck({
        kind: "ip",
        ...O.errToObj(e)
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
        ...O.errToObj(null == e ? void 0 : e.message)
      });
    }
    regex(e, t) {
      return this._addCheck({
        kind: "regex",
        regex: e,
        ...O.errToObj(t)
      });
    }
    includes(e, t) {
      return this._addCheck({
        kind: "includes",
        value: e,
        position: null == t ? void 0 : t.position,
        ...O.errToObj(null == t ? void 0 : t.message)
      });
    }
    startsWith(e, t) {
      return this._addCheck({
        kind: "startsWith",
        value: e,
        ...O.errToObj(t)
      });
    }
    endsWith(e, t) {
      return this._addCheck({
        kind: "endsWith",
        value: e,
        ...O.errToObj(t)
      });
    }
    min(e, t) {
      return this._addCheck({
        kind: "min",
        value: e,
        ...O.errToObj(t)
      });
    }
    max(e, t) {
      return this._addCheck({
        kind: "max",
        value: e,
        ...O.errToObj(t)
      });
    }
    length(e, t) {
      return this._addCheck({
        kind: "length",
        value: e,
        ...O.errToObj(t)
      });
    }
    nonempty(e) {
      return this.min(1, O.errToObj(e));
    }
    trim() {
      return new V({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: "trim"
        } ]
      });
    }
    toLowerCase() {
      return new V({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: "toLowerCase"
        } ]
      });
    }
    toUpperCase() {
      return new V({
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
  function H(e, t) {
    const n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, a = n > r ? n : r;
    return parseInt(e.toFixed(a).replace(".", "")) % parseInt(t.toFixed(a).replace(".", "")) / Math.pow(10, a);
  }
  V.create = e => {
    var t;
    return new V({
      checks: [],
      typeName: Pe.ZodString,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...P(e)
    });
  };
  class K extends Z {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(e) {
      this._def.coerce && (e.data = Number(e.data));
      if (this._getType(e) !== g.number) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.number,
          received: t.parsedType
        }), T;
      }
      let t;
      const n = new A;
      for (const r of this._def.checks) if ("int" === r.kind) d.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), 
      k(t, {
        code: y.invalid_type,
        expected: "integer",
        received: "float",
        message: r.message
      }), n.dirty()); else if ("min" === r.kind) {
        (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), 
        k(t, {
          code: y.too_small,
          minimum: r.value,
          type: "number",
          inclusive: r.inclusive,
          exact: !1,
          message: r.message
        }), n.dirty());
      } else if ("max" === r.kind) {
        (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), 
        k(t, {
          code: y.too_big,
          maximum: r.value,
          type: "number",
          inclusive: r.inclusive,
          exact: !1,
          message: r.message
        }), n.dirty());
      } else "multipleOf" === r.kind ? 0 !== H(e.data, r.value) && (t = this._getOrReturnCtx(e, t), 
      k(t, {
        code: y.not_multiple_of,
        multipleOf: r.value,
        message: r.message
      }), n.dirty()) : "finite" === r.kind ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), 
      k(t, {
        code: y.not_finite,
        message: r.message
      }), n.dirty()) : d.assertNever(r);
      return {
        status: n.value,
        value: e.data
      };
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, O.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, O.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, O.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, O.toString(t));
    }
    setLimit(e, t, n, r) {
      return new K({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: e,
          value: t,
          inclusive: n,
          message: O.toString(r)
        } ]
      });
    }
    _addCheck(e) {
      return new K({
        ...this._def,
        checks: [ ...this._def.checks, e ]
      });
    }
    int(e) {
      return this._addCheck({
        kind: "int",
        message: O.toString(e)
      });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: O.toString(e)
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: O.toString(e)
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: O.toString(e)
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: O.toString(e)
      });
    }
    multipleOf(e, t) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: O.toString(t)
      });
    }
    finite(e) {
      return this._addCheck({
        kind: "finite",
        message: O.toString(e)
      });
    }
    safe(e) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: O.toString(e)
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: O.toString(e)
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
      return !!this._def.checks.find((e => "int" === e.kind || "multipleOf" === e.kind && d.isInteger(e.value)));
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
  K.create = e => new K({
    checks: [],
    typeName: Pe.ZodNumber,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...P(e)
  });
  class G extends Z {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(e) {
      this._def.coerce && (e.data = BigInt(e.data));
      if (this._getType(e) !== g.bigint) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.bigint,
          received: t.parsedType
        }), T;
      }
      let t;
      const n = new A;
      for (const r of this._def.checks) if ("min" === r.kind) {
        (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), 
        k(t, {
          code: y.too_small,
          type: "bigint",
          minimum: r.value,
          inclusive: r.inclusive,
          message: r.message
        }), n.dirty());
      } else if ("max" === r.kind) {
        (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), 
        k(t, {
          code: y.too_big,
          type: "bigint",
          maximum: r.value,
          inclusive: r.inclusive,
          message: r.message
        }), n.dirty());
      } else "multipleOf" === r.kind ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), 
      k(t, {
        code: y.not_multiple_of,
        multipleOf: r.value,
        message: r.message
      }), n.dirty()) : d.assertNever(r);
      return {
        status: n.value,
        value: e.data
      };
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, O.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, O.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, O.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, O.toString(t));
    }
    setLimit(e, t, n, r) {
      return new G({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: e,
          value: t,
          inclusive: n,
          message: O.toString(r)
        } ]
      });
    }
    _addCheck(e) {
      return new G({
        ...this._def,
        checks: [ ...this._def.checks, e ]
      });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: O.toString(e)
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: O.toString(e)
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: O.toString(e)
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: O.toString(e)
      });
    }
    multipleOf(e, t) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: O.toString(t)
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
  G.create = e => {
    var t;
    return new G({
      checks: [],
      typeName: Pe.ZodBigInt,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...P(e)
    });
  };
  class J extends Z {
    _parse(e) {
      this._def.coerce && (e.data = Boolean(e.data));
      if (this._getType(e) !== g.boolean) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.boolean,
          received: t.parsedType
        }), T;
      }
      return j(e.data);
    }
  }
  J.create = e => new J({
    typeName: Pe.ZodBoolean,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...P(e)
  });
  class Y extends Z {
    _parse(e) {
      this._def.coerce && (e.data = new Date(e.data));
      if (this._getType(e) !== g.date) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.date,
          received: t.parsedType
        }), T;
      }
      if (isNaN(e.data.getTime())) {
        return k(this._getOrReturnCtx(e), {
          code: y.invalid_date
        }), T;
      }
      const t = new A;
      let n;
      for (const r of this._def.checks) "min" === r.kind ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n), 
      k(n, {
        code: y.too_small,
        message: r.message,
        inclusive: !0,
        exact: !1,
        minimum: r.value,
        type: "date"
      }), t.dirty()) : "max" === r.kind ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n), 
      k(n, {
        code: y.too_big,
        message: r.message,
        inclusive: !0,
        exact: !1,
        maximum: r.value,
        type: "date"
      }), t.dirty()) : d.assertNever(r);
      return {
        status: t.value,
        value: new Date(e.data.getTime())
      };
    }
    _addCheck(e) {
      return new Y({
        ...this._def,
        checks: [ ...this._def.checks, e ]
      });
    }
    min(e, t) {
      return this._addCheck({
        kind: "min",
        value: e.getTime(),
        message: O.toString(t)
      });
    }
    max(e, t) {
      return this._addCheck({
        kind: "max",
        value: e.getTime(),
        message: O.toString(t)
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
  Y.create = e => new Y({
    checks: [],
    coerce: (null == e ? void 0 : e.coerce) || !1,
    typeName: Pe.ZodDate,
    ...P(e)
  });
  class Q extends Z {
    _parse(e) {
      if (this._getType(e) !== g.symbol) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.symbol,
          received: t.parsedType
        }), T;
      }
      return j(e.data);
    }
  }
  Q.create = e => new Q({
    typeName: Pe.ZodSymbol,
    ...P(e)
  });
  class X extends Z {
    _parse(e) {
      if (this._getType(e) !== g.undefined) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.undefined,
          received: t.parsedType
        }), T;
      }
      return j(e.data);
    }
  }
  X.create = e => new X({
    typeName: Pe.ZodUndefined,
    ...P(e)
  });
  class ee extends Z {
    _parse(e) {
      if (this._getType(e) !== g.null) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.null,
          received: t.parsedType
        }), T;
      }
      return j(e.data);
    }
  }
  ee.create = e => new ee({
    typeName: Pe.ZodNull,
    ...P(e)
  });
  class te extends Z {
    constructor() {
      super(...arguments), this._any = !0;
    }
    _parse(e) {
      return j(e.data);
    }
  }
  te.create = e => new te({
    typeName: Pe.ZodAny,
    ...P(e)
  });
  class ne extends Z {
    constructor() {
      super(...arguments), this._unknown = !0;
    }
    _parse(e) {
      return j(e.data);
    }
  }
  ne.create = e => new ne({
    typeName: Pe.ZodUnknown,
    ...P(e)
  });
  class re extends Z {
    _parse(e) {
      const t = this._getOrReturnCtx(e);
      return k(t, {
        code: y.invalid_type,
        expected: g.never,
        received: t.parsedType
      }), T;
    }
  }
  re.create = e => new re({
    typeName: Pe.ZodNever,
    ...P(e)
  });
  class ae extends Z {
    _parse(e) {
      if (this._getType(e) !== g.undefined) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.void,
          received: t.parsedType
        }), T;
      }
      return j(e.data);
    }
  }
  ae.create = e => new ae({
    typeName: Pe.ZodVoid,
    ...P(e)
  });
  class ie extends Z {
    _parse(e) {
      const {ctx: t, status: n} = this._processInputParams(e), r = this._def;
      if (t.parsedType !== g.array) return k(t, {
        code: y.invalid_type,
        expected: g.array,
        received: t.parsedType
      }), T;
      if (null !== r.exactLength) {
        const e = t.data.length > r.exactLength.value, a = t.data.length < r.exactLength.value;
        (e || a) && (k(t, {
          code: e ? y.too_big : y.too_small,
          minimum: a ? r.exactLength.value : void 0,
          maximum: e ? r.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: r.exactLength.message
        }), n.dirty());
      }
      if (null !== r.minLength && t.data.length < r.minLength.value && (k(t, {
        code: y.too_small,
        minimum: r.minLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: r.minLength.message
      }), n.dirty()), null !== r.maxLength && t.data.length > r.maxLength.value && (k(t, {
        code: y.too_big,
        maximum: r.maxLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: r.maxLength.message
      }), n.dirty()), t.common.async) return Promise.all([ ...t.data ].map(((e, n) => r.type._parseAsync(new R(t, e, t.path, n))))).then((e => A.mergeArray(n, e)));
      const a = [ ...t.data ].map(((e, n) => r.type._parseSync(new R(t, e, t.path, n))));
      return A.mergeArray(n, a);
    }
    get element() {
      return this._def.type;
    }
    min(e, t) {
      return new ie({
        ...this._def,
        minLength: {
          value: e,
          message: O.toString(t)
        }
      });
    }
    max(e, t) {
      return new ie({
        ...this._def,
        maxLength: {
          value: e,
          message: O.toString(t)
        }
      });
    }
    length(e, t) {
      return new ie({
        ...this._def,
        exactLength: {
          value: e,
          message: O.toString(t)
        }
      });
    }
    nonempty(e) {
      return this.min(1, e);
    }
  }
  function se(e) {
    if (e instanceof oe) {
      const t = {};
      for (const n in e.shape) {
        const r = e.shape[n];
        t[n] = Te.create(se(r));
      }
      return new oe({
        ...e._def,
        shape: () => t
      });
    }
    return e instanceof ie ? new ie({
      ...e._def,
      type: se(e.element)
    }) : e instanceof Te ? Te.create(se(e.unwrap())) : e instanceof Me ? Me.create(se(e.unwrap())) : e instanceof he ? he.create(e.items.map((e => se(e)))) : e;
  }
  ie.create = (e, t) => new ie({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: Pe.ZodArray,
    ...P(t)
  });
  class oe extends Z {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (null !== this._cached) return this._cached;
      const e = this._def.shape(), t = d.objectKeys(e);
      return this._cached = {
        shape: e,
        keys: t
      };
    }
    _parse(e) {
      if (this._getType(e) !== g.object) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.object,
          received: t.parsedType
        }), T;
      }
      const {status: t, ctx: n} = this._processInputParams(e), {shape: r, keys: a} = this._getCached(), i = [];
      if (!(this._def.catchall instanceof re && "strip" === this._def.unknownKeys)) for (const e in n.data) a.includes(e) || i.push(e);
      const s = [];
      for (const e of a) {
        const t = r[e], a = n.data[e];
        s.push({
          key: {
            status: "valid",
            value: e
          },
          value: t._parse(new R(n, a, n.path, e)),
          alwaysSet: e in n.data
        });
      }
      if (this._def.catchall instanceof re) {
        const e = this._def.unknownKeys;
        if ("passthrough" === e) for (const e of i) s.push({
          key: {
            status: "valid",
            value: e
          },
          value: {
            status: "valid",
            value: n.data[e]
          }
        }); else if ("strict" === e) i.length > 0 && (k(n, {
          code: y.unrecognized_keys,
          keys: i
        }), t.dirty()); else if ("strip" !== e) throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        const e = this._def.catchall;
        for (const t of i) {
          const r = n.data[t];
          s.push({
            key: {
              status: "valid",
              value: t
            },
            value: e._parse(new R(n, r, n.path, t)),
            alwaysSet: t in n.data
          });
        }
      }
      return n.common.async ? Promise.resolve().then((async () => {
        const e = [];
        for (const t of s) {
          const n = await t.key;
          e.push({
            key: n,
            value: await t.value,
            alwaysSet: t.alwaysSet
          });
        }
        return e;
      })).then((e => A.mergeObjectSync(t, e))) : A.mergeObjectSync(t, s);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e) {
      return O.errToObj, new oe({
        ...this._def,
        unknownKeys: "strict",
        ...void 0 !== e ? {
          errorMap: (t, n) => {
            var r, a, i, s;
            const o = null !== (i = null === (a = (r = this._def).errorMap) || void 0 === a ? void 0 : a.call(r, t, n).message) && void 0 !== i ? i : n.defaultError;
            return "unrecognized_keys" === t.code ? {
              message: null !== (s = O.errToObj(e).message) && void 0 !== s ? s : o
            } : {
              message: o
            };
          }
        } : {}
      });
    }
    strip() {
      return new oe({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new oe({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    extend(e) {
      return new oe({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...e
        })
      });
    }
    merge(e) {
      return new oe({
        unknownKeys: e._def.unknownKeys,
        catchall: e._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...e._def.shape()
        }),
        typeName: Pe.ZodObject
      });
    }
    setKey(e, t) {
      return this.augment({
        [e]: t
      });
    }
    catchall(e) {
      return new oe({
        ...this._def,
        catchall: e
      });
    }
    pick(e) {
      const t = {};
      return d.objectKeys(e).forEach((n => {
        e[n] && this.shape[n] && (t[n] = this.shape[n]);
      })), new oe({
        ...this._def,
        shape: () => t
      });
    }
    omit(e) {
      const t = {};
      return d.objectKeys(this.shape).forEach((n => {
        e[n] || (t[n] = this.shape[n]);
      })), new oe({
        ...this._def,
        shape: () => t
      });
    }
    deepPartial() {
      return se(this);
    }
    partial(e) {
      const t = {};
      return d.objectKeys(this.shape).forEach((n => {
        const r = this.shape[n];
        e && !e[n] ? t[n] = r : t[n] = r.optional();
      })), new oe({
        ...this._def,
        shape: () => t
      });
    }
    required(e) {
      const t = {};
      return d.objectKeys(this.shape).forEach((n => {
        if (e && !e[n]) t[n] = this.shape[n]; else {
          let e = this.shape[n];
          for (;e instanceof Te; ) e = e._def.innerType;
          t[n] = e;
        }
      })), new oe({
        ...this._def,
        shape: () => t
      });
    }
    keyof() {
      return _e(d.objectKeys(this.shape));
    }
  }
  oe.create = (e, t) => new oe({
    shape: () => e,
    unknownKeys: "strip",
    catchall: re.create(),
    typeName: Pe.ZodObject,
    ...P(t)
  }), oe.strictCreate = (e, t) => new oe({
    shape: () => e,
    unknownKeys: "strict",
    catchall: re.create(),
    typeName: Pe.ZodObject,
    ...P(t)
  }), oe.lazycreate = (e, t) => new oe({
    shape: e,
    unknownKeys: "strip",
    catchall: re.create(),
    typeName: Pe.ZodObject,
    ...P(t)
  });
  class ce extends Z {
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
        const n = e.map((e => new v(e.ctx.common.issues)));
        return k(t, {
          code: y.invalid_union,
          unionErrors: n
        }), T;
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
        const a = r.map((e => new v(e)));
        return k(t, {
          code: y.invalid_union,
          unionErrors: a
        }), T;
      }
    }
    get options() {
      return this._def.options;
    }
  }
  ce.create = (e, t) => new ce({
    options: e,
    typeName: Pe.ZodUnion,
    ...P(t)
  });
  const ue = e => e instanceof ve ? ue(e.schema) : e instanceof Ae ? ue(e.innerType()) : e instanceof be ? [ e.value ] : e instanceof we ? e.options : e instanceof xe ? Object.keys(e.enum) : e instanceof je ? ue(e._def.innerType) : e instanceof X ? [ void 0 ] : e instanceof ee ? [ null ] : null;
  class le extends Z {
    _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== g.object) return k(t, {
        code: y.invalid_type,
        expected: g.object,
        received: t.parsedType
      }), T;
      const n = this.discriminator, r = t.data[n], a = this.optionsMap.get(r);
      return a ? t.common.async ? a._parseAsync({
        data: t.data,
        path: t.path,
        parent: t
      }) : a._parseSync({
        data: t.data,
        path: t.path,
        parent: t
      }) : (k(t, {
        code: y.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [ n ]
      }), T);
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
        const t = ue(n.shape[e]);
        if (!t) throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
        for (const a of t) {
          if (r.has(a)) throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);
          r.set(a, n);
        }
      }
      return new le({
        typeName: Pe.ZodDiscriminatedUnion,
        discriminator: e,
        options: t,
        optionsMap: r,
        ...P(n)
      });
    }
  }
  function fe(e, t) {
    const n = m(e), r = m(t);
    if (e === t) return {
      valid: !0,
      data: e
    };
    if (n === g.object && r === g.object) {
      const n = d.objectKeys(t), r = d.objectKeys(e).filter((e => -1 !== n.indexOf(e))), a = {
        ...e,
        ...t
      };
      for (const n of r) {
        const r = fe(e[n], t[n]);
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
    if (n === g.array && r === g.array) {
      if (e.length !== t.length) return {
        valid: !1
      };
      const n = [];
      for (let r = 0; r < e.length; r++) {
        const a = fe(e[r], t[r]);
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
    return n === g.date && r === g.date && +e == +t ? {
      valid: !0,
      data: e
    } : {
      valid: !1
    };
  }
  class de extends Z {
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e), r = (e, r) => {
        if (S(e) || S(r)) return T;
        const a = fe(e.value, r.value);
        return a.valid ? ((C(e) || C(r)) && t.dirty(), {
          status: t.value,
          value: a.data
        }) : (k(n, {
          code: y.invalid_intersection_types
        }), T);
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
  de.create = (e, t, n) => new de({
    left: e,
    right: t,
    typeName: Pe.ZodIntersection,
    ...P(n)
  });
  class he extends Z {
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== g.array) return k(n, {
        code: y.invalid_type,
        expected: g.array,
        received: n.parsedType
      }), T;
      if (n.data.length < this._def.items.length) return k(n, {
        code: y.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), T;
      !this._def.rest && n.data.length > this._def.items.length && (k(n, {
        code: y.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), t.dirty());
      const r = [ ...n.data ].map(((e, t) => {
        const r = this._def.items[t] || this._def.rest;
        return r ? r._parse(new R(n, e, n.path, t)) : null;
      })).filter((e => !!e));
      return n.common.async ? Promise.all(r).then((e => A.mergeArray(t, e))) : A.mergeArray(t, r);
    }
    get items() {
      return this._def.items;
    }
    rest(e) {
      return new he({
        ...this._def,
        rest: e
      });
    }
  }
  he.create = (e, t) => {
    if (!Array.isArray(e)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new he({
      items: e,
      typeName: Pe.ZodTuple,
      rest: null,
      ...P(t)
    });
  };
  class pe extends Z {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== g.object) return k(n, {
        code: y.invalid_type,
        expected: g.object,
        received: n.parsedType
      }), T;
      const r = [], a = this._def.keyType, i = this._def.valueType;
      for (const e in n.data) r.push({
        key: a._parse(new R(n, e, n.path, e)),
        value: i._parse(new R(n, n.data[e], n.path, e))
      });
      return n.common.async ? A.mergeObjectAsync(t, r) : A.mergeObjectSync(t, r);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e, t, n) {
      return new pe(t instanceof Z ? {
        keyType: e,
        valueType: t,
        typeName: Pe.ZodRecord,
        ...P(n)
      } : {
        keyType: V.create(),
        valueType: e,
        typeName: Pe.ZodRecord,
        ...P(t)
      });
    }
  }
  class ge extends Z {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== g.map) return k(n, {
        code: y.invalid_type,
        expected: g.map,
        received: n.parsedType
      }), T;
      const r = this._def.keyType, a = this._def.valueType, i = [ ...n.data.entries() ].map((([e, t], i) => ({
        key: r._parse(new R(n, e, n.path, [ i, "key" ])),
        value: a._parse(new R(n, t, n.path, [ i, "value" ]))
      })));
      if (n.common.async) {
        const e = new Map;
        return Promise.resolve().then((async () => {
          for (const n of i) {
            const r = await n.key, a = await n.value;
            if ("aborted" === r.status || "aborted" === a.status) return T;
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
          if ("aborted" === r.status || "aborted" === a.status) return T;
          "dirty" !== r.status && "dirty" !== a.status || t.dirty(), e.set(r.value, a.value);
        }
        return {
          status: t.value,
          value: e
        };
      }
    }
  }
  ge.create = (e, t, n) => new ge({
    valueType: t,
    keyType: e,
    typeName: Pe.ZodMap,
    ...P(n)
  });
  class me extends Z {
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== g.set) return k(n, {
        code: y.invalid_type,
        expected: g.set,
        received: n.parsedType
      }), T;
      const r = this._def;
      null !== r.minSize && n.data.size < r.minSize.value && (k(n, {
        code: y.too_small,
        minimum: r.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: r.minSize.message
      }), t.dirty()), null !== r.maxSize && n.data.size > r.maxSize.value && (k(n, {
        code: y.too_big,
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
          if ("aborted" === r.status) return T;
          "dirty" === r.status && t.dirty(), n.add(r.value);
        }
        return {
          status: t.value,
          value: n
        };
      }
      const s = [ ...n.data.values() ].map(((e, t) => a._parse(new R(n, e, n.path, t))));
      return n.common.async ? Promise.all(s).then((e => i(e))) : i(s);
    }
    min(e, t) {
      return new me({
        ...this._def,
        minSize: {
          value: e,
          message: O.toString(t)
        }
      });
    }
    max(e, t) {
      return new me({
        ...this._def,
        maxSize: {
          value: e,
          message: O.toString(t)
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
  me.create = (e, t) => new me({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: Pe.ZodSet,
    ...P(t)
  });
  class ye extends Z {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== g.function) return k(t, {
        code: y.invalid_type,
        expected: g.function,
        received: t.parsedType
      }), T;
      function n(e, n) {
        return x({
          data: e,
          path: t.path,
          errorMaps: [ t.common.contextualErrorMap, t.schemaErrorMap, w(), b ].filter((e => !!e)),
          issueData: {
            code: y.invalid_arguments,
            argumentsError: n
          }
        });
      }
      function r(e, n) {
        return x({
          data: e,
          path: t.path,
          errorMaps: [ t.common.contextualErrorMap, t.schemaErrorMap, w(), b ].filter((e => !!e)),
          issueData: {
            code: y.invalid_return_type,
            returnTypeError: n
          }
        });
      }
      const a = {
        errorMap: t.common.contextualErrorMap
      }, i = t.data;
      if (this._def.returns instanceof ke) {
        const e = this;
        return j((async function(...t) {
          const s = new v([]), o = await e._def.args.parseAsync(t, a).catch((e => {
            throw s.addIssue(n(t, e)), s;
          })), c = await Reflect.apply(i, this, o);
          return await e._def.returns._def.type.parseAsync(c, a).catch((e => {
            throw s.addIssue(r(c, e)), s;
          }));
        }));
      }
      {
        const e = this;
        return j((function(...t) {
          const s = e._def.args.safeParse(t, a);
          if (!s.success) throw new v([ n(t, s.error) ]);
          const o = Reflect.apply(i, this, s.data), c = e._def.returns.safeParse(o, a);
          if (!c.success) throw new v([ r(o, c.error) ]);
          return c.data;
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
      return new ye({
        ...this._def,
        args: he.create(e).rest(ne.create())
      });
    }
    returns(e) {
      return new ye({
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
      return new ye({
        args: e || he.create([]).rest(ne.create()),
        returns: t || ne.create(),
        typeName: Pe.ZodFunction,
        ...P(n)
      });
    }
  }
  class ve extends Z {
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
  ve.create = (e, t) => new ve({
    getter: e,
    typeName: Pe.ZodLazy,
    ...P(t)
  });
  class be extends Z {
    _parse(e) {
      if (e.data !== this._def.value) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          received: t.data,
          code: y.invalid_literal,
          expected: this._def.value
        }), T;
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
  function _e(e, t) {
    return new we({
      values: e,
      typeName: Pe.ZodEnum,
      ...P(t)
    });
  }
  be.create = (e, t) => new be({
    value: e,
    typeName: Pe.ZodLiteral,
    ...P(t)
  });
  class we extends Z {
    _parse(e) {
      if ("string" != typeof e.data) {
        const t = this._getOrReturnCtx(e), n = this._def.values;
        return k(t, {
          expected: d.joinValues(n),
          received: t.parsedType,
          code: y.invalid_type
        }), T;
      }
      if (-1 === this._def.values.indexOf(e.data)) {
        const t = this._getOrReturnCtx(e), n = this._def.values;
        return k(t, {
          received: t.data,
          code: y.invalid_enum_value,
          options: n
        }), T;
      }
      return j(e.data);
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
      return we.create(e);
    }
    exclude(e) {
      return we.create(this.options.filter((t => !e.includes(t))));
    }
  }
  we.create = _e;
  class xe extends Z {
    _parse(e) {
      const t = d.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
      if (n.parsedType !== g.string && n.parsedType !== g.number) {
        const e = d.objectValues(t);
        return k(n, {
          expected: d.joinValues(e),
          received: n.parsedType,
          code: y.invalid_type
        }), T;
      }
      if (-1 === t.indexOf(e.data)) {
        const e = d.objectValues(t);
        return k(n, {
          received: n.data,
          code: y.invalid_enum_value,
          options: e
        }), T;
      }
      return j(e.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  xe.create = (e, t) => new xe({
    values: e,
    typeName: Pe.ZodNativeEnum,
    ...P(t)
  });
  class ke extends Z {
    unwrap() {
      return this._def.type;
    }
    _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== g.promise && !1 === t.common.async) return k(t, {
        code: y.invalid_type,
        expected: g.promise,
        received: t.parsedType
      }), T;
      const n = t.parsedType === g.promise ? t.data : Promise.resolve(t.data);
      return j(n.then((e => this._def.type.parseAsync(e, {
        path: t.path,
        errorMap: t.common.contextualErrorMap
      }))));
    }
  }
  ke.create = (e, t) => new ke({
    type: e,
    typeName: Pe.ZodPromise,
    ...P(t)
  });
  class Ae extends Z {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === Pe.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e), r = this._def.effect || null, a = {
        addIssue: e => {
          k(n, e), e.fatal ? t.abort() : t.dirty();
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
          return "aborted" === r.status ? T : ("dirty" === r.status && t.dirty(), e(r.value), 
          {
            status: t.value,
            value: r.value
          });
        }
        return this._def.schema._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        }).then((n => "aborted" === n.status ? T : ("dirty" === n.status && t.dirty(), e(n.value).then((() => ({
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
          if (!I(e)) return e;
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
        }).then((e => I(e) ? Promise.resolve(r.transform(e.value, a)).then((e => ({
          status: t.value,
          value: e
        }))) : e));
      }
      d.assertNever(r);
    }
  }
  Ae.create = (e, t, n) => new Ae({
    schema: e,
    typeName: Pe.ZodEffects,
    effect: t,
    ...P(n)
  }), Ae.createWithPreprocess = (e, t, n) => new Ae({
    schema: t,
    effect: {
      type: "preprocess",
      transform: e
    },
    typeName: Pe.ZodEffects,
    ...P(n)
  });
  class Te extends Z {
    _parse(e) {
      return this._getType(e) === g.undefined ? j(void 0) : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  Te.create = (e, t) => new Te({
    innerType: e,
    typeName: Pe.ZodOptional,
    ...P(t)
  });
  class Me extends Z {
    _parse(e) {
      return this._getType(e) === g.null ? j(null) : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  Me.create = (e, t) => new Me({
    innerType: e,
    typeName: Pe.ZodNullable,
    ...P(t)
  });
  class je extends Z {
    _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      let n = t.data;
      return t.parsedType === g.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
        data: n,
        path: t.path,
        parent: t
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  je.create = (e, t) => new je({
    innerType: e,
    typeName: Pe.ZodDefault,
    defaultValue: "function" == typeof t.default ? t.default : () => t.default,
    ...P(t)
  });
  class Se extends Z {
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
      return E(r) ? r.then((e => ({
        status: "valid",
        value: "valid" === e.status ? e.value : this._def.catchValue({
          get error() {
            return new v(n.common.issues);
          },
          input: n.data
        })
      }))) : {
        status: "valid",
        value: "valid" === r.status ? r.value : this._def.catchValue({
          get error() {
            return new v(n.common.issues);
          },
          input: n.data
        })
      };
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  Se.create = (e, t) => new Se({
    innerType: e,
    typeName: Pe.ZodCatch,
    catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
    ...P(t)
  });
  class Ce extends Z {
    _parse(e) {
      if (this._getType(e) !== g.nan) {
        const t = this._getOrReturnCtx(e);
        return k(t, {
          code: y.invalid_type,
          expected: g.nan,
          received: t.parsedType
        }), T;
      }
      return {
        status: "valid",
        value: e.data
      };
    }
  }
  Ce.create = e => new Ce({
    typeName: Pe.ZodNaN,
    ...P(e)
  });
  const Ie = Symbol("zod_brand");
  class Ee extends Z {
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
  class Oe extends Z {
    _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.common.async) {
        return (async () => {
          const e = await this._def.in._parseAsync({
            data: n.data,
            path: n.path,
            parent: n
          });
          return "aborted" === e.status ? T : "dirty" === e.status ? (t.dirty(), M(e.value)) : this._def.out._parseAsync({
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
        return "aborted" === e.status ? T : "dirty" === e.status ? (t.dirty(), {
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
      return new Oe({
        in: e,
        out: t,
        typeName: Pe.ZodPipeline
      });
    }
  }
  class Ne extends Z {
    _parse(e) {
      const t = this._def.innerType._parse(e);
      return I(t) && (t.value = Object.freeze(t.value)), t;
    }
  }
  Ne.create = (e, t) => new Ne({
    innerType: e,
    typeName: Pe.ZodReadonly,
    ...P(t)
  });
  const Re = (e, t = {}, n) => e ? te.create().superRefine(((r, a) => {
    var i, s;
    if (!e(r)) {
      const e = "function" == typeof t ? t(r) : "string" == typeof t ? {
        message: t
      } : t, o = null === (s = null !== (i = e.fatal) && void 0 !== i ? i : n) || void 0 === s || s, c = "string" == typeof e ? {
        message: e
      } : e;
      a.addIssue({
        code: "custom",
        ...c,
        fatal: o
      });
    }
  })) : te.create(), Le = {
    object: oe.lazycreate
  };
  var Pe, Ze;
  (Ze = Pe || (Pe = {})).ZodString = "ZodString", Ze.ZodNumber = "ZodNumber", Ze.ZodNaN = "ZodNaN", 
  Ze.ZodBigInt = "ZodBigInt", Ze.ZodBoolean = "ZodBoolean", Ze.ZodDate = "ZodDate", 
  Ze.ZodSymbol = "ZodSymbol", Ze.ZodUndefined = "ZodUndefined", Ze.ZodNull = "ZodNull", 
  Ze.ZodAny = "ZodAny", Ze.ZodUnknown = "ZodUnknown", Ze.ZodNever = "ZodNever", Ze.ZodVoid = "ZodVoid", 
  Ze.ZodArray = "ZodArray", Ze.ZodObject = "ZodObject", Ze.ZodUnion = "ZodUnion", 
  Ze.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", Ze.ZodIntersection = "ZodIntersection", 
  Ze.ZodTuple = "ZodTuple", Ze.ZodRecord = "ZodRecord", Ze.ZodMap = "ZodMap", Ze.ZodSet = "ZodSet", 
  Ze.ZodFunction = "ZodFunction", Ze.ZodLazy = "ZodLazy", Ze.ZodLiteral = "ZodLiteral", 
  Ze.ZodEnum = "ZodEnum", Ze.ZodEffects = "ZodEffects", Ze.ZodNativeEnum = "ZodNativeEnum", 
  Ze.ZodOptional = "ZodOptional", Ze.ZodNullable = "ZodNullable", Ze.ZodDefault = "ZodDefault", 
  Ze.ZodCatch = "ZodCatch", Ze.ZodPromise = "ZodPromise", Ze.ZodBranded = "ZodBranded", 
  Ze.ZodPipeline = "ZodPipeline", Ze.ZodReadonly = "ZodReadonly";
  const ze = V.create, $e = K.create, Be = Ce.create, qe = G.create, Fe = J.create, Ue = Y.create, We = Q.create, De = X.create, Ve = ee.create, He = te.create, Ke = ne.create, Ge = re.create, Je = ae.create, Ye = ie.create, Qe = oe.create, Xe = oe.strictCreate, et = ce.create, tt = le.create, nt = de.create, rt = he.create, at = pe.create, it = ge.create, st = me.create, ot = ye.create, ct = ve.create, ut = be.create, lt = we.create, ft = xe.create, dt = ke.create, ht = Ae.create, pt = Te.create, gt = Me.create, mt = Ae.createWithPreprocess, yt = Oe.create, vt = {
    string: e => V.create({
      ...e,
      coerce: !0
    }),
    number: e => K.create({
      ...e,
      coerce: !0
    }),
    boolean: e => J.create({
      ...e,
      coerce: !0
    }),
    bigint: e => G.create({
      ...e,
      coerce: !0
    }),
    date: e => Y.create({
      ...e,
      coerce: !0
    })
  }, bt = T;
  var _t = Object.freeze({
    __proto__: null,
    defaultErrorMap: b,
    setErrorMap: function(e) {
      _ = e;
    },
    getErrorMap: w,
    makeIssue: x,
    EMPTY_PATH: [],
    addIssueToContext: k,
    ParseStatus: A,
    INVALID: T,
    DIRTY: M,
    OK: j,
    isAborted: S,
    isDirty: C,
    isValid: I,
    isAsync: E,
    get util() {
      return d;
    },
    get objectUtil() {
      return p;
    },
    ZodParsedType: g,
    getParsedType: m,
    ZodType: Z,
    ZodString: V,
    ZodNumber: K,
    ZodBigInt: G,
    ZodBoolean: J,
    ZodDate: Y,
    ZodSymbol: Q,
    ZodUndefined: X,
    ZodNull: ee,
    ZodAny: te,
    ZodUnknown: ne,
    ZodNever: re,
    ZodVoid: ae,
    ZodArray: ie,
    ZodObject: oe,
    ZodUnion: ce,
    ZodDiscriminatedUnion: le,
    ZodIntersection: de,
    ZodTuple: he,
    ZodRecord: pe,
    ZodMap: ge,
    ZodSet: me,
    ZodFunction: ye,
    ZodLazy: ve,
    ZodLiteral: be,
    ZodEnum: we,
    ZodNativeEnum: xe,
    ZodPromise: ke,
    ZodEffects: Ae,
    ZodTransformer: Ae,
    ZodOptional: Te,
    ZodNullable: Me,
    ZodDefault: je,
    ZodCatch: Se,
    ZodNaN: Ce,
    BRAND: Ie,
    ZodBranded: Ee,
    ZodPipeline: Oe,
    ZodReadonly: Ne,
    custom: Re,
    Schema: Z,
    ZodSchema: Z,
    late: Le,
    get ZodFirstPartyTypeKind() {
      return Pe;
    },
    coerce: vt,
    any: He,
    array: Ye,
    bigint: qe,
    boolean: Fe,
    date: Ue,
    discriminatedUnion: tt,
    effect: ht,
    enum: lt,
    function: ot,
    instanceof: (e, t = {
      message: `Input not instance of ${e.name}`
    }) => Re((t => t instanceof e), t),
    intersection: nt,
    lazy: ct,
    literal: ut,
    map: it,
    nan: Be,
    nativeEnum: ft,
    never: Ge,
    null: Ve,
    nullable: gt,
    number: $e,
    object: Qe,
    oboolean: () => Fe().optional(),
    onumber: () => $e().optional(),
    optional: pt,
    ostring: () => ze().optional(),
    pipeline: yt,
    preprocess: mt,
    promise: dt,
    record: at,
    set: st,
    strictObject: Xe,
    string: ze,
    symbol: We,
    transformer: ht,
    tuple: rt,
    undefined: De,
    union: et,
    unknown: Ke,
    void: Je,
    NEVER: bt,
    ZodIssueCode: y,
    quotelessJson: e => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
    ZodError: v
  });
  const wt = _t.object({
    pattern: _t.string(),
    type: _t.enum([ "include", "exclude" ]),
    selector: _t.string()
  }), xt = _t.object({
    free: _t.array(_t.string()),
    assigned: _t.map(_t.string(), _t.number())
  }), kt = _t.object({
    free: _t.array(_t.string()),
    tabIdsToMarkers: _t.map(_t.number(), _t.string()),
    markersToTabIds: _t.map(_t.string(), _t.number())
  }), At = _t.object({
    hintUppercaseLetters: _t.boolean(),
    hintFontFamily: _t.string(),
    hintFontSize: _t.number(),
    hintWeight: _t.enum([ "auto", "normal", "bold" ]),
    hintBackgroundColor: _t.string(),
    hintBackgroundOpacity: _t.number(),
    hintFontColor: _t.string(),
    hintMinimumContrastRatio: _t.number(),
    hintBorderWidth: _t.number(),
    hintBorderRadius: _t.number(),
    includeSingleLetterHints: _t.boolean(),
    useNumberHints: _t.boolean(),
    hintsToExclude: _t.string(),
    viewportMargin: _t.number(),
    scrollBehavior: _t.enum([ "auto", "smooth", "instant" ]),
    hintsToggleGlobal: _t.boolean(),
    hintsToggleHosts: _t.map(_t.string(), _t.boolean()),
    hintsTogglePaths: _t.map(_t.string(), _t.boolean()),
    hintsToggleTabs: _t.map(_t.number(), _t.boolean()),
    alwaysComputeHintables: _t.boolean(),
    enableNotifications: _t.boolean(),
    notifyWhenTogglingHints: _t.boolean(),
    toastPosition: _t.enum([ "top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left" ]),
    toastTransition: _t.enum([ "slide", "flip", "zoom", "bounce" ]),
    toastDuration: _t.number(),
    urlInTitle: _t.boolean(),
    includeTabMarkers: _t.boolean(),
    hideTabMarkersWithGlobalHintsOff: _t.boolean(),
    uppercaseTabMarkers: _t.boolean(),
    keyboardClicking: _t.boolean(),
    keysToExclude: _t.array(_t.tuple([ _t.string(), _t.string() ])),
    customSelectors: _t.array(wt),
    customScrollPositions: _t.map(_t.string(), _t.map(_t.string(), _t.number())),
    references: _t.map(_t.string(), _t.map(_t.string(), _t.string())),
    showWhatsNewPageOnUpdate: _t.boolean(),
    newTabPosition: _t.enum([ "relatedAfterCurrent", "afterCurrent", "atEnd" ]),
    hasSeenSettingsPage: _t.boolean(),
    directClickWithNoFocusedDocument: _t.boolean(),
    directClickWhenEditing: _t.boolean(),
    tabsByRecency: _t.map(_t.number(), _t.array(_t.number())),
    hintsStacks: _t.map(_t.number(), xt),
    tabMarkers: kt
  }), Tt = [ "zz", "zy", "zx", "zw", "zv", "zu", "zt", "zs", "zr", "zq", "zp", "zo", "zn", "zm", "zl", "zk", "zj", "zi", "zh", "zg", "zf", "ze", "zd", "zc", "zb", "za", "yz", "yy", "yx", "yw", "yv", "yu", "yt", "ys", "yr", "yq", "yp", "yo", "yn", "ym", "yl", "yk", "yj", "yi", "yh", "yg", "yf", "ye", "yd", "yc", "yb", "ya", "xz", "xy", "xx", "xw", "xv", "xu", "xt", "xs", "xr", "xq", "xp", "xo", "xn", "xm", "xl", "xk", "xj", "xi", "xh", "xg", "xf", "xe", "xd", "xc", "xb", "xa", "wz", "wy", "wx", "ww", "wv", "wu", "wt", "ws", "wr", "wq", "wp", "wo", "wn", "wm", "wl", "wk", "wj", "wi", "wh", "wg", "wf", "we", "wd", "wc", "wb", "wa", "vz", "vy", "vx", "vw", "vv", "vu", "vt", "vs", "vr", "vq", "vp", "vo", "vn", "vm", "vl", "vk", "vj", "vi", "vh", "vg", "vf", "ve", "vd", "vc", "vb", "va", "uz", "uy", "ux", "uw", "uv", "uu", "ut", "us", "ur", "uq", "up", "uo", "un", "um", "ul", "uk", "uj", "ui", "uh", "ug", "uf", "ue", "ud", "uc", "ub", "ua", "tz", "ty", "tx", "tw", "tv", "tu", "tt", "ts", "tr", "tq", "tp", "to", "tn", "tm", "tl", "tk", "tj", "ti", "th", "tg", "tf", "te", "td", "tc", "tb", "ta", "sz", "sy", "sx", "sw", "sv", "su", "st", "ss", "sr", "sq", "sp", "so", "sn", "sm", "sl", "sk", "sj", "si", "sh", "sg", "sf", "se", "sd", "sc", "sb", "sa", "rz", "ry", "rx", "rw", "rv", "ru", "rt", "rs", "rr", "rq", "rp", "ro", "rn", "rm", "rl", "rk", "rj", "ri", "rh", "rg", "rf", "re", "rd", "rc", "rb", "ra", "qz", "qy", "qx", "qw", "qv", "qu", "qt", "qs", "qr", "qq", "qp", "qo", "qn", "qm", "ql", "qk", "qj", "qi", "qh", "qg", "qf", "qe", "qd", "qc", "qb", "qa", "pz", "py", "px", "pw", "pv", "pu", "pt", "ps", "pr", "pq", "pp", "po", "pn", "pm", "pl", "pk", "pj", "pi", "ph", "pg", "pf", "pe", "pd", "pc", "pb", "pa", "oz", "oy", "ox", "ow", "ov", "ou", "ot", "os", "or", "oq", "op", "oo", "on", "om", "ol", "ok", "oj", "oi", "oh", "og", "of", "oe", "od", "oc", "ob", "oa", "nz", "ny", "nx", "nw", "nv", "nu", "nt", "ns", "nr", "nq", "np", "no", "nn", "nm", "nl", "nk", "nj", "ni", "nh", "ng", "nf", "ne", "nd", "nc", "nb", "na", "mz", "my", "mx", "mw", "mv", "mu", "mt", "ms", "mr", "mq", "mp", "mo", "mn", "mm", "ml", "mk", "mj", "mi", "mh", "mg", "mf", "me", "md", "mc", "mb", "ma", "lz", "ly", "lx", "lw", "lv", "lu", "lt", "ls", "lr", "lq", "lp", "lo", "ln", "lm", "ll", "lk", "lj", "li", "lh", "lg", "lf", "le", "ld", "lc", "lb", "la", "kz", "ky", "kx", "kw", "kv", "ku", "kt", "ks", "kr", "kq", "kp", "ko", "kn", "km", "kl", "kk", "kj", "ki", "kh", "kg", "kf", "ke", "kd", "kc", "kb", "ka", "jz", "jy", "jx", "jw", "jv", "ju", "jt", "js", "jr", "jq", "jp", "jo", "jn", "jm", "jl", "jk", "jj", "ji", "jh", "jg", "jf", "je", "jd", "jc", "jb", "ja", "iz", "iy", "ix", "iw", "iv", "iu", "it", "is", "ir", "iq", "ip", "io", "in", "im", "il", "ik", "ij", "ii", "ih", "ig", "if", "ie", "id", "ic", "ib", "ia", "hz", "hy", "hx", "hw", "hv", "hu", "ht", "hs", "hr", "hq", "hp", "ho", "hn", "hm", "hl", "hk", "hj", "hi", "hh", "hg", "hf", "he", "hd", "hc", "hb", "ha", "gz", "gy", "gx", "gw", "gv", "gu", "gt", "gs", "gr", "gq", "gp", "go", "gn", "gm", "gl", "gk", "gj", "gi", "gh", "gg", "gf", "ge", "gd", "gc", "gb", "ga", "fz", "fy", "fx", "fw", "fv", "fu", "ft", "fs", "fr", "fq", "fp", "fo", "fn", "fm", "fl", "fk", "fj", "fi", "fh", "fg", "ff", "fe", "fd", "fc", "fb", "fa", "ez", "ey", "ex", "ew", "ev", "eu", "et", "es", "er", "eq", "ep", "eo", "en", "em", "el", "ek", "ej", "ei", "eh", "eg", "ef", "ee", "ed", "ec", "eb", "ea", "dz", "dy", "dx", "dw", "dv", "du", "dt", "ds", "dr", "dq", "dp", "do", "dn", "dm", "dl", "dk", "dj", "di", "dh", "dg", "df", "de", "dd", "dc", "db", "da", "cz", "cy", "cx", "cw", "cv", "cu", "ct", "cs", "cr", "cq", "cp", "co", "cn", "cm", "cl", "ck", "cj", "ci", "ch", "cg", "cf", "ce", "cd", "cc", "cb", "ca", "bz", "by", "bx", "bw", "bv", "bu", "bt", "bs", "br", "bq", "bp", "bo", "bn", "bm", "bl", "bk", "bj", "bi", "bh", "bg", "bf", "be", "bd", "bc", "bb", "ba", "az", "ay", "ax", "aw", "av", "au", "at", "as", "ar", "aq", "ap", "ao", "an", "am", "al", "ak", "aj", "ai", "ah", "ag", "af", "ae", "ad", "ac", "ab", "aa", "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a" ], Mt = [];
  for (let e = 999; e > 0; e--) Mt.push(e.toString());
  var jt, St, Ct = {};
  St = {
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
  var It, Et;
  Et = function(e) {
    return !(!e || "string" == typeof e) && (e instanceof Array || Array.isArray(e) || e.length >= 0 && (e.splice instanceof Function || Object.getOwnPropertyDescriptor(e, e.length - 1) && "String" !== e.constructor.name));
  };
  var Ot = Array.prototype.concat, Nt = Array.prototype.slice, Rt = It = function(e) {
    for (var t = [], n = 0, r = e.length; n < r; n++) {
      var a = e[n];
      Et(a) ? t = Ot.call(t, Nt.call(a)) : t.push(a);
    }
    return t;
  };
  Rt.wrap = function(e) {
    return function() {
      return e(Rt(arguments));
    };
  };
  var Lt = Object.hasOwnProperty, Pt = Object.create(null);
  for (var Zt in St) Lt.call(St, Zt) && (Pt[St[Zt]] = Zt);
  var zt = Ct = {
    to: {},
    get: {}
  };
  function $t(e, t, n) {
    return Math.min(Math.max(t, e), n);
  }
  function Bt(e) {
    var t = Math.round(e).toString(16).toUpperCase();
    return t.length < 2 ? "0" + t : t;
  }
  zt.get = function(e) {
    var t, n;
    switch (e.substring(0, 3).toLowerCase()) {
     case "hsl":
      t = zt.get.hsl(e), n = "hsl";
      break;

     case "hwb":
      t = zt.get.hwb(e), n = "hwb";
      break;

     default:
      t = zt.get.rgb(e), n = "rgb";
    }
    return t ? {
      model: n,
      value: t
    } : null;
  }, zt.get.rgb = function(e) {
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
      if (!(t = e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/))) return (t = e.match(/^(\w+)$/)) ? "transparent" === t[1] ? [ 0, 0, 0, 0 ] : Lt.call(St, t[1]) ? ((a = St[t[1]])[3] = 1, 
      a) : null : null;
      for (n = 0; n < 3; n++) a[n] = Math.round(2.55 * parseFloat(t[n + 1]));
      t[4] && (t[5] ? a[3] = .01 * parseFloat(t[4]) : a[3] = parseFloat(t[4]));
    }
    for (n = 0; n < 3; n++) a[n] = $t(a[n], 0, 255);
    return a[3] = $t(a[3], 0, 1), a;
  }, zt.get.hsl = function(e) {
    if (!e) return null;
    var t = e.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
    if (t) {
      var n = parseFloat(t[4]);
      return [ (parseFloat(t[1]) % 360 + 360) % 360, $t(parseFloat(t[2]), 0, 100), $t(parseFloat(t[3]), 0, 100), $t(isNaN(n) ? 1 : n, 0, 1) ];
    }
    return null;
  }, zt.get.hwb = function(e) {
    if (!e) return null;
    var t = e.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
    if (t) {
      var n = parseFloat(t[4]);
      return [ (parseFloat(t[1]) % 360 + 360) % 360, $t(parseFloat(t[2]), 0, 100), $t(parseFloat(t[3]), 0, 100), $t(isNaN(n) ? 1 : n, 0, 1) ];
    }
    return null;
  }, zt.to.hex = function() {
    var e = It(arguments);
    return "#" + Bt(e[0]) + Bt(e[1]) + Bt(e[2]) + (e[3] < 1 ? Bt(Math.round(255 * e[3])) : "");
  }, zt.to.rgb = function() {
    var e = It(arguments);
    return e.length < 4 || 1 === e[3] ? "rgb(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ")" : "rgba(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ", " + e[3] + ")";
  }, zt.to.rgb.percent = function() {
    var e = It(arguments), t = Math.round(e[0] / 255 * 100), n = Math.round(e[1] / 255 * 100), r = Math.round(e[2] / 255 * 100);
    return e.length < 4 || 1 === e[3] ? "rgb(" + t + "%, " + n + "%, " + r + "%)" : "rgba(" + t + "%, " + n + "%, " + r + "%, " + e[3] + ")";
  }, zt.to.hsl = function() {
    var e = It(arguments);
    return e.length < 4 || 1 === e[3] ? "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)" : "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + e[3] + ")";
  }, zt.to.hwb = function() {
    var e = It(arguments), t = "";
    return e.length >= 4 && 1 !== e[3] && (t = ", " + e[3]), "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + t + ")";
  }, zt.to.keyword = function(e) {
    return Pt[e.slice(0, 3)];
  };
  var qt, Ft = {};
  const Ut = {};
  for (const e of Object.keys(St)) Ut[St[e]] = e;
  const Wt = {
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
  qt = Wt;
  for (const e of Object.keys(Wt)) {
    if (!("channels" in Wt[e])) throw new Error("missing channels property: " + e);
    if (!("labels" in Wt[e])) throw new Error("missing channel labels property: " + e);
    if (Wt[e].labels.length !== Wt[e].channels) throw new Error("channel and label counts mismatch: " + e);
    const {channels: t, labels: n} = Wt[e];
    delete Wt[e].channels, delete Wt[e].labels, Object.defineProperty(Wt[e], "channels", {
      value: t
    }), Object.defineProperty(Wt[e], "labels", {
      value: n
    });
  }
  Wt.rgb.hsl = function(e) {
    const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, a = Math.min(t, n, r), i = Math.max(t, n, r), s = i - a;
    let o, c;
    i === a ? o = 0 : t === i ? o = (n - r) / s : n === i ? o = 2 + (r - t) / s : r === i && (o = 4 + (t - n) / s), 
    o = Math.min(60 * o, 360), o < 0 && (o += 360);
    const u = (a + i) / 2;
    return c = i === a ? 0 : u <= .5 ? s / (i + a) : s / (2 - i - a), [ o, 100 * c, 100 * u ];
  }, Wt.rgb.hsv = function(e) {
    let t, n, r, a, i;
    const s = e[0] / 255, o = e[1] / 255, c = e[2] / 255, u = Math.max(s, o, c), l = u - Math.min(s, o, c), f = function(e) {
      return (u - e) / 6 / l + .5;
    };
    return 0 === l ? (a = 0, i = 0) : (i = l / u, t = f(s), n = f(o), r = f(c), s === u ? a = r - n : o === u ? a = 1 / 3 + t - r : c === u && (a = 2 / 3 + n - t), 
    a < 0 ? a += 1 : a > 1 && (a -= 1)), [ 360 * a, 100 * i, 100 * u ];
  }, Wt.rgb.hwb = function(e) {
    const t = e[0], n = e[1];
    let r = e[2];
    const a = Wt.rgb.hsl(e)[0], i = 1 / 255 * Math.min(t, Math.min(n, r));
    return r = 1 - 1 / 255 * Math.max(t, Math.max(n, r)), [ a, 100 * i, 100 * r ];
  }, Wt.rgb.cmyk = function(e) {
    const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, a = Math.min(1 - t, 1 - n, 1 - r);
    return [ 100 * ((1 - t - a) / (1 - a) || 0), 100 * ((1 - n - a) / (1 - a) || 0), 100 * ((1 - r - a) / (1 - a) || 0), 100 * a ];
  }, Wt.rgb.keyword = function(e) {
    const t = Ut[e];
    if (t) return t;
    let n, r = 1 / 0;
    for (const t of Object.keys(St)) {
      const s = (i = St[t], ((a = e)[0] - i[0]) ** 2 + (a[1] - i[1]) ** 2 + (a[2] - i[2]) ** 2);
      s < r && (r = s, n = t);
    }
    var a, i;
    return n;
  }, Wt.keyword.rgb = function(e) {
    return St[e];
  }, Wt.rgb.xyz = function(e) {
    let t = e[0] / 255, n = e[1] / 255, r = e[2] / 255;
    t = t > .04045 ? ((t + .055) / 1.055) ** 2.4 : t / 12.92, n = n > .04045 ? ((n + .055) / 1.055) ** 2.4 : n / 12.92, 
    r = r > .04045 ? ((r + .055) / 1.055) ** 2.4 : r / 12.92;
    return [ 100 * (.4124 * t + .3576 * n + .1805 * r), 100 * (.2126 * t + .7152 * n + .0722 * r), 100 * (.0193 * t + .1192 * n + .9505 * r) ];
  }, Wt.rgb.lab = function(e) {
    const t = Wt.rgb.xyz(e);
    let n = t[0], r = t[1], a = t[2];
    n /= 95.047, r /= 100, a /= 108.883, n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116, 
    r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116, a = a > .008856 ? a ** (1 / 3) : 7.787 * a + 16 / 116;
    return [ 116 * r - 16, 500 * (n - r), 200 * (r - a) ];
  }, Wt.hsl.rgb = function(e) {
    const t = e[0] / 360, n = e[1] / 100, r = e[2] / 100;
    let a, i, s;
    if (0 === n) return s = 255 * r, [ s, s, s ];
    a = r < .5 ? r * (1 + n) : r + n - r * n;
    const o = 2 * r - a, c = [ 0, 0, 0 ];
    for (let e = 0; e < 3; e++) i = t + 1 / 3 * -(e - 1), i < 0 && i++, i > 1 && i--, 
    s = 6 * i < 1 ? o + 6 * (a - o) * i : 2 * i < 1 ? a : 3 * i < 2 ? o + (a - o) * (2 / 3 - i) * 6 : o, 
    c[e] = 255 * s;
    return c;
  }, Wt.hsl.hsv = function(e) {
    const t = e[0];
    let n = e[1] / 100, r = e[2] / 100, a = n;
    const i = Math.max(r, .01);
    r *= 2, n *= r <= 1 ? r : 2 - r, a *= i <= 1 ? i : 2 - i;
    return [ t, 100 * (0 === r ? 2 * a / (i + a) : 2 * n / (r + n)), 100 * ((r + n) / 2) ];
  }, Wt.hsv.rgb = function(e) {
    const t = e[0] / 60, n = e[1] / 100;
    let r = e[2] / 100;
    const a = Math.floor(t) % 6, i = t - Math.floor(t), s = 255 * r * (1 - n), o = 255 * r * (1 - n * i), c = 255 * r * (1 - n * (1 - i));
    switch (r *= 255, a) {
     case 0:
      return [ r, c, s ];

     case 1:
      return [ o, r, s ];

     case 2:
      return [ s, r, c ];

     case 3:
      return [ s, o, r ];

     case 4:
      return [ c, s, r ];

     case 5:
      return [ r, s, o ];
    }
  }, Wt.hsv.hsl = function(e) {
    const t = e[0], n = e[1] / 100, r = e[2] / 100, a = Math.max(r, .01);
    let i, s;
    s = (2 - n) * r;
    const o = (2 - n) * a;
    return i = n * a, i /= o <= 1 ? o : 2 - o, i = i || 0, s /= 2, [ t, 100 * i, 100 * s ];
  }, Wt.hwb.rgb = function(e) {
    const t = e[0] / 360;
    let n = e[1] / 100, r = e[2] / 100;
    const a = n + r;
    let i;
    a > 1 && (n /= a, r /= a);
    const s = Math.floor(6 * t), o = 1 - r;
    i = 6 * t - s, 0 != (1 & s) && (i = 1 - i);
    const c = n + i * (o - n);
    let u, l, f;
    switch (s) {
     default:
     case 6:
     case 0:
      u = o, l = c, f = n;
      break;

     case 1:
      u = c, l = o, f = n;
      break;

     case 2:
      u = n, l = o, f = c;
      break;

     case 3:
      u = n, l = c, f = o;
      break;

     case 4:
      u = c, l = n, f = o;
      break;

     case 5:
      u = o, l = n, f = c;
    }
    return [ 255 * u, 255 * l, 255 * f ];
  }, Wt.cmyk.rgb = function(e) {
    const t = e[0] / 100, n = e[1] / 100, r = e[2] / 100, a = e[3] / 100;
    return [ 255 * (1 - Math.min(1, t * (1 - a) + a)), 255 * (1 - Math.min(1, n * (1 - a) + a)), 255 * (1 - Math.min(1, r * (1 - a) + a)) ];
  }, Wt.xyz.rgb = function(e) {
    const t = e[0] / 100, n = e[1] / 100, r = e[2] / 100;
    let a, i, s;
    return a = 3.2406 * t + -1.5372 * n + -.4986 * r, i = -.9689 * t + 1.8758 * n + .0415 * r, 
    s = .0557 * t + -.204 * n + 1.057 * r, a = a > .0031308 ? 1.055 * a ** (1 / 2.4) - .055 : 12.92 * a, 
    i = i > .0031308 ? 1.055 * i ** (1 / 2.4) - .055 : 12.92 * i, s = s > .0031308 ? 1.055 * s ** (1 / 2.4) - .055 : 12.92 * s, 
    a = Math.min(Math.max(0, a), 1), i = Math.min(Math.max(0, i), 1), s = Math.min(Math.max(0, s), 1), 
    [ 255 * a, 255 * i, 255 * s ];
  }, Wt.xyz.lab = function(e) {
    let t = e[0], n = e[1], r = e[2];
    t /= 95.047, n /= 100, r /= 108.883, t = t > .008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116, 
    n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116, r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116;
    return [ 116 * n - 16, 500 * (t - n), 200 * (n - r) ];
  }, Wt.lab.xyz = function(e) {
    let t, n, r;
    n = (e[0] + 16) / 116, t = e[1] / 500 + n, r = n - e[2] / 200;
    const a = n ** 3, i = t ** 3, s = r ** 3;
    return n = a > .008856 ? a : (n - 16 / 116) / 7.787, t = i > .008856 ? i : (t - 16 / 116) / 7.787, 
    r = s > .008856 ? s : (r - 16 / 116) / 7.787, t *= 95.047, n *= 100, r *= 108.883, 
    [ t, n, r ];
  }, Wt.lab.lch = function(e) {
    const t = e[0], n = e[1], r = e[2];
    let a;
    a = 360 * Math.atan2(r, n) / 2 / Math.PI, a < 0 && (a += 360);
    return [ t, Math.sqrt(n * n + r * r), a ];
  }, Wt.lch.lab = function(e) {
    const t = e[0], n = e[1], r = e[2] / 360 * 2 * Math.PI;
    return [ t, n * Math.cos(r), n * Math.sin(r) ];
  }, Wt.rgb.ansi16 = function(e, t = null) {
    const [n, r, a] = e;
    let i = null === t ? Wt.rgb.hsv(e)[2] : t;
    if (i = Math.round(i / 50), 0 === i) return 30;
    let s = 30 + (Math.round(a / 255) << 2 | Math.round(r / 255) << 1 | Math.round(n / 255));
    return 2 === i && (s += 60), s;
  }, Wt.hsv.ansi16 = function(e) {
    return Wt.rgb.ansi16(Wt.hsv.rgb(e), e[2]);
  }, Wt.rgb.ansi256 = function(e) {
    const t = e[0], n = e[1], r = e[2];
    if (t === n && n === r) return t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232;
    return 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(r / 255 * 5);
  }, Wt.ansi16.rgb = function(e) {
    let t = e % 10;
    if (0 === t || 7 === t) return e > 50 && (t += 3.5), t = t / 10.5 * 255, [ t, t, t ];
    const n = .5 * (1 + ~~(e > 50));
    return [ (1 & t) * n * 255, (t >> 1 & 1) * n * 255, (t >> 2 & 1) * n * 255 ];
  }, Wt.ansi256.rgb = function(e) {
    if (e >= 232) {
      const t = 10 * (e - 232) + 8;
      return [ t, t, t ];
    }
    let t;
    e -= 16;
    return [ Math.floor(e / 36) / 5 * 255, Math.floor((t = e % 36) / 6) / 5 * 255, t % 6 / 5 * 255 ];
  }, Wt.rgb.hex = function(e) {
    const t = (((255 & Math.round(e[0])) << 16) + ((255 & Math.round(e[1])) << 8) + (255 & Math.round(e[2]))).toString(16).toUpperCase();
    return "000000".substring(t.length) + t;
  }, Wt.hex.rgb = function(e) {
    const t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!t) return [ 0, 0, 0 ];
    let n = t[0];
    3 === t[0].length && (n = n.split("").map((e => e + e)).join(""));
    const r = parseInt(n, 16);
    return [ r >> 16 & 255, r >> 8 & 255, 255 & r ];
  }, Wt.rgb.hcg = function(e) {
    const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, a = Math.max(Math.max(t, n), r), i = Math.min(Math.min(t, n), r), s = a - i;
    let o, c;
    return o = s < 1 ? i / (1 - s) : 0, c = s <= 0 ? 0 : a === t ? (n - r) / s % 6 : a === n ? 2 + (r - t) / s : 4 + (t - n) / s, 
    c /= 6, c %= 1, [ 360 * c, 100 * s, 100 * o ];
  }, Wt.hsl.hcg = function(e) {
    const t = e[1] / 100, n = e[2] / 100, r = n < .5 ? 2 * t * n : 2 * t * (1 - n);
    let a = 0;
    return r < 1 && (a = (n - .5 * r) / (1 - r)), [ e[0], 100 * r, 100 * a ];
  }, Wt.hsv.hcg = function(e) {
    const t = e[1] / 100, n = e[2] / 100, r = t * n;
    let a = 0;
    return r < 1 && (a = (n - r) / (1 - r)), [ e[0], 100 * r, 100 * a ];
  }, Wt.hcg.rgb = function(e) {
    const t = e[0] / 360, n = e[1] / 100, r = e[2] / 100;
    if (0 === n) return [ 255 * r, 255 * r, 255 * r ];
    const a = [ 0, 0, 0 ], i = t % 1 * 6, s = i % 1, o = 1 - s;
    let c = 0;
    switch (Math.floor(i)) {
     case 0:
      a[0] = 1, a[1] = s, a[2] = 0;
      break;

     case 1:
      a[0] = o, a[1] = 1, a[2] = 0;
      break;

     case 2:
      a[0] = 0, a[1] = 1, a[2] = s;
      break;

     case 3:
      a[0] = 0, a[1] = o, a[2] = 1;
      break;

     case 4:
      a[0] = s, a[1] = 0, a[2] = 1;
      break;

     default:
      a[0] = 1, a[1] = 0, a[2] = o;
    }
    return c = (1 - n) * r, [ 255 * (n * a[0] + c), 255 * (n * a[1] + c), 255 * (n * a[2] + c) ];
  }, Wt.hcg.hsv = function(e) {
    const t = e[1] / 100, n = t + e[2] / 100 * (1 - t);
    let r = 0;
    return n > 0 && (r = t / n), [ e[0], 100 * r, 100 * n ];
  }, Wt.hcg.hsl = function(e) {
    const t = e[1] / 100, n = e[2] / 100 * (1 - t) + .5 * t;
    let r = 0;
    return n > 0 && n < .5 ? r = t / (2 * n) : n >= .5 && n < 1 && (r = t / (2 * (1 - n))), 
    [ e[0], 100 * r, 100 * n ];
  }, Wt.hcg.hwb = function(e) {
    const t = e[1] / 100, n = t + e[2] / 100 * (1 - t);
    return [ e[0], 100 * (n - t), 100 * (1 - n) ];
  }, Wt.hwb.hcg = function(e) {
    const t = e[1] / 100, n = 1 - e[2] / 100, r = n - t;
    let a = 0;
    return r < 1 && (a = (n - r) / (1 - r)), [ e[0], 100 * r, 100 * a ];
  }, Wt.apple.rgb = function(e) {
    return [ e[0] / 65535 * 255, e[1] / 65535 * 255, e[2] / 65535 * 255 ];
  }, Wt.rgb.apple = function(e) {
    return [ e[0] / 255 * 65535, e[1] / 255 * 65535, e[2] / 255 * 65535 ];
  }, Wt.gray.rgb = function(e) {
    return [ e[0] / 100 * 255, e[0] / 100 * 255, e[0] / 100 * 255 ];
  }, Wt.gray.hsl = function(e) {
    return [ 0, 0, e[0] ];
  }, Wt.gray.hsv = Wt.gray.hsl, Wt.gray.hwb = function(e) {
    return [ 0, 100, e[0] ];
  }, Wt.gray.cmyk = function(e) {
    return [ 0, 0, 0, e[0] ];
  }, Wt.gray.lab = function(e) {
    return [ e[0], 0, 0 ];
  }, Wt.gray.hex = function(e) {
    const t = 255 & Math.round(e[0] / 100 * 255), n = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
    return "000000".substring(n.length) + n;
  }, Wt.rgb.gray = function(e) {
    return [ (e[0] + e[1] + e[2]) / 3 / 255 * 100 ];
  };
  var Dt;
  function Vt(e) {
    const t = function() {
      const e = {}, t = Object.keys(qt);
      for (let n = t.length, r = 0; r < n; r++) e[t[r]] = {
        distance: -1,
        parent: null
      };
      return e;
    }(), n = [ e ];
    for (t[e].distance = 0; n.length; ) {
      const e = n.pop(), r = Object.keys(qt[e]);
      for (let a = r.length, i = 0; i < a; i++) {
        const a = r[i], s = t[a];
        -1 === s.distance && (s.distance = t[e].distance + 1, s.parent = e, n.unshift(a));
      }
    }
    return t;
  }
  function Ht(e, t) {
    return function(n) {
      return t(e(n));
    };
  }
  function Kt(e, t) {
    const n = [ t[e].parent, e ];
    let r = qt[t[e].parent][e], a = t[e].parent;
    for (;t[a].parent; ) n.unshift(t[a].parent), r = Ht(qt[t[a].parent][a], r), a = t[a].parent;
    return r.conversion = n, r;
  }
  Dt = function(e) {
    const t = Vt(e), n = {}, r = Object.keys(t);
    for (let e = r.length, a = 0; a < e; a++) {
      const e = r[a];
      null !== t[e].parent && (n[e] = Kt(e, t));
    }
    return n;
  };
  const Gt = {};
  Object.keys(qt).forEach((e => {
    Gt[e] = {}, Object.defineProperty(Gt[e], "channels", {
      value: qt[e].channels
    }), Object.defineProperty(Gt[e], "labels", {
      value: qt[e].labels
    });
    const t = Dt(e);
    Object.keys(t).forEach((n => {
      const r = t[n];
      Gt[e][n] = function(e) {
        const t = function(...t) {
          const n = t[0];
          if (null == n) return n;
          n.length > 1 && (t = n);
          const r = e(t);
          if ("object" == typeof r) for (let e = r.length, t = 0; t < e; t++) r[t] = Math.round(r[t]);
          return r;
        };
        return "conversion" in e && (t.conversion = e.conversion), t;
      }(r), Gt[e][n].raw = function(e) {
        const t = function(...t) {
          const n = t[0];
          return null == n ? n : (n.length > 1 && (t = n), e(t));
        };
        return "conversion" in e && (t.conversion = e.conversion), t;
      }(r);
    }));
  })), Ft = Gt;
  const Jt = [ "keyword", "gray", "hex" ], Yt = {};
  for (const e of Object.keys(Ft)) Yt[[ ...Ft[e].labels ].sort().join("")] = e;
  const Qt = {};
  function Xt(e, t) {
    if (!(this instanceof Xt)) return new Xt(e, t);
    if (t && t in Jt && (t = null), t && !(t in Ft)) throw new Error("Unknown model: " + t);
    let n, r;
    if (null == e) this.model = "rgb", this.color = [ 0, 0, 0 ], this.valpha = 1; else if (e instanceof Xt) this.model = e.model, 
    this.color = [ ...e.color ], this.valpha = e.valpha; else if ("string" == typeof e) {
      const t = Ct.get(e);
      if (null === t) throw new Error("Unable to parse color from string: " + e);
      this.model = t.model, r = Ft[this.model].channels, this.color = t.value.slice(0, r), 
      this.valpha = "number" == typeof t.value[r] ? t.value[r] : 1;
    } else if (e.length > 0) {
      this.model = t || "rgb", r = Ft[this.model].channels;
      const n = Array.prototype.slice.call(e, 0, r);
      this.color = rn(n, r), this.valpha = "number" == typeof e[r] ? e[r] : 1;
    } else if ("number" == typeof e) this.model = "rgb", this.color = [ e >> 16 & 255, e >> 8 & 255, 255 & e ], 
    this.valpha = 1; else {
      this.valpha = 1;
      const t = Object.keys(e);
      "alpha" in e && (t.splice(t.indexOf("alpha"), 1), this.valpha = "number" == typeof e.alpha ? e.alpha : 0);
      const r = t.sort().join("");
      if (!(r in Yt)) throw new Error("Unable to parse color from object: " + JSON.stringify(e));
      this.model = Yt[r];
      const {labels: a} = Ft[this.model], i = [];
      for (n = 0; n < a.length; n++) i.push(e[a[n]]);
      this.color = rn(i);
    }
    if (Qt[this.model]) for (r = Ft[this.model].channels, n = 0; n < r; n++) {
      const e = Qt[this.model][n];
      e && (this.color[n] = e(this.color[n]));
    }
    this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze && Object.freeze(this);
  }
  Xt.prototype = {
    toString() {
      return this.string();
    },
    toJSON() {
      return this[this.model]();
    },
    string(e) {
      let t = this.model in Ct.to ? this : this.rgb();
      t = t.round("number" == typeof e ? e : 1);
      const n = 1 === t.valpha ? t.color : [ ...t.color, this.valpha ];
      return Ct.to[t.model](n);
    },
    percentString(e) {
      const t = this.rgb().round("number" == typeof e ? e : 1), n = 1 === t.valpha ? t.color : [ ...t.color, this.valpha ];
      return Ct.to.rgb.percent(n);
    },
    array() {
      return 1 === this.valpha ? [ ...this.color ] : [ ...this.color, this.valpha ];
    },
    object() {
      const e = {}, {channels: t} = Ft[this.model], {labels: n} = Ft[this.model];
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
      return e = Math.max(e || 0, 0), new Xt([ ...this.color.map(en(e)), this.valpha ], this.model);
    },
    alpha(e) {
      return void 0 !== e ? new Xt([ ...this.color, Math.max(0, Math.min(1, e)) ], this.model) : this.valpha;
    },
    red: tn("rgb", 0, nn(255)),
    green: tn("rgb", 1, nn(255)),
    blue: tn("rgb", 2, nn(255)),
    hue: tn([ "hsl", "hsv", "hsl", "hwb", "hcg" ], 0, (e => (e % 360 + 360) % 360)),
    saturationl: tn("hsl", 1, nn(100)),
    lightness: tn("hsl", 2, nn(100)),
    saturationv: tn("hsv", 1, nn(100)),
    value: tn("hsv", 2, nn(100)),
    chroma: tn("hcg", 1, nn(100)),
    gray: tn("hcg", 2, nn(100)),
    white: tn("hwb", 1, nn(100)),
    wblack: tn("hwb", 2, nn(100)),
    cyan: tn("cmyk", 0, nn(100)),
    magenta: tn("cmyk", 1, nn(100)),
    yellow: tn("cmyk", 2, nn(100)),
    black: tn("cmyk", 3, nn(100)),
    x: tn("xyz", 0, nn(95.047)),
    y: tn("xyz", 1, nn(100)),
    z: tn("xyz", 2, nn(108.833)),
    l: tn("lab", 0, nn(100)),
    a: tn("lab", 1),
    b: tn("lab", 2),
    keyword(e) {
      return void 0 !== e ? new Xt(e) : Ft[this.model].keyword(this.color);
    },
    hex(e) {
      return void 0 !== e ? new Xt(e) : Ct.to.hex(this.rgb().round().color);
    },
    hexa(e) {
      if (void 0 !== e) return new Xt(e);
      const t = this.rgb().round().color;
      let n = Math.round(255 * this.valpha).toString(16).toUpperCase();
      return 1 === n.length && (n = "0" + n), Ct.to.hex(t) + n;
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
      return Xt.rgb(t, t, t);
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
      const n = e.rgb(), r = this.rgb(), a = void 0 === t ? .5 : t, i = 2 * a - 1, s = n.alpha() - r.alpha(), o = ((i * s == -1 ? i : (i + s) / (1 + i * s)) + 1) / 2, c = 1 - o;
      return Xt.rgb(o * n.red() + c * r.red(), o * n.green() + c * r.green(), o * n.blue() + c * r.blue(), n.alpha() * a + r.alpha() * (1 - a));
    }
  };
  for (const e of Object.keys(Ft)) {
    if (Jt.includes(e)) continue;
    const {channels: t} = Ft[e];
    Xt.prototype[e] = function(...t) {
      return this.model === e ? new Xt(this) : t.length > 0 ? new Xt(t, e) : new Xt([ ...(n = Ft[this.model][e].raw(this.color), 
      Array.isArray(n) ? n : [ n ]), this.valpha ], e);
      var n;
    }, Xt[e] = function(...n) {
      let r = n[0];
      return "number" == typeof r && (r = rn(n, t)), new Xt(r, e);
    };
  }
  function en(e) {
    return function(t) {
      return function(e, t) {
        return Number(e.toFixed(t));
      }(t, e);
    };
  }
  function tn(e, t, n) {
    e = Array.isArray(e) ? e : [ e ];
    for (const r of e) (Qt[r] || (Qt[r] = []))[t] = n;
    return e = e[0], function(r) {
      let a;
      return void 0 !== r ? (n && (r = n(r)), a = this[e](), a.color[t] = r, a) : (a = this[e]().color[t], 
      n && (a = n(a)), a);
    };
  }
  function nn(e) {
    return function(t) {
      return Math.max(0, Math.min(e, t));
    };
  }
  function rn(e, t) {
    for (let n = 0; n < t; n++) "number" != typeof e[n] && (e[n] = 0);
    return e;
  }
  jt = Xt;
  const an = {
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
  function sn(e) {
    if (!e) return !0;
    try {
      new (n(jt))(e);
    } catch {
      return !1;
    }
    return !0;
  }
  function on(e, t, n) {
    return e >= t && e <= n;
  }
  const cn = {
    hintBackgroundColor: sn,
    hintFontColor: sn,
    hintFontSize: e => on(e, 1, 72),
    hintBorderRadius: e => on(e, 0, 72),
    hintBorderWidth: e => on(e, 0, 72),
    hintBackgroundOpacity: e => "" !== e && on(e, 0, 1),
    hintMinimumContrastRatio: e => on(e, 2.5, 21),
    viewportMargin: e => on(e, 0, 2e3)
  };
  function un(e) {
    return e in an;
  }
  function ln(e, t) {
    if (!un(e)) return !1;
    const n = cn[e];
    return void 0 === n || n(t);
  }
  const fn = {
    ...an,
    tabsByRecency: new Map,
    hintsStacks: new Map,
    tabMarkers: {
      free: Tt,
      tabIdsToMarkers: new Map,
      markersToTabIds: new Map
    }
  };
  function dn(e) {
    try {
      document.querySelector(e);
    } catch (e) {
      if (e instanceof DOMException) return !1;
    }
    return !0;
  }
  function hn(e) {
    try {
      return new RegExp(e), !0;
    } catch {
      return !1;
    }
  }
  function pn(e) {
    let t;
    const n = _t.record(_t.string(), _t.object({
      include: _t.array(_t.string()),
      exclude: _t.array(_t.string())
    })).safeParse(e), r = _t.map(_t.string(), _t.object({
      include: _t.array(_t.string()),
      exclude: _t.array(_t.string())
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
  function gn(e, t) {
    switch (e) {
     case "customSelectors":
      return t.filter((({pattern: e, selector: t}) => hn(e) && dn(t))).sort(((e, t) => e.pattern.localeCompare(t.pattern) || ("include" === e.type ? -1 : 1)));

     case "keysToExclude":
      return t.filter((([e]) => e));

     default:
      return t;
    }
  }
  const mn = new Set([ "hintsToggleTabs", "tabsByRecency", "hintsStacks", "tabMarkers" ]);
  function yn(e, t) {
    return t instanceof Map ? {
      dataType: "Map",
      value: Array.from(t.entries())
    } : t;
  }
  function vn(e, t) {
    return "object" == typeof t && null !== t && "Map" === t.dataType && t.value ? new Map(t.value) : t;
  }
  async function bn(e, t) {
    if (un(e) && !ln(e, t)) return kn(e);
    const r = gn(e, t), a = JSON.stringify(At.shape[e].parse(r), yn);
    return await (mn.has(e) ? n(s).storage.local.set({
      [e]: a
    }) : n(s).storage.sync.set({
      [e]: a
    })), r;
  }
  async function _n(e) {
    const t = mn.has(e) ? await n(s).storage.local.get(e) : await n(s).storage.sync.get(e);
    try {
      const [e] = Object.values(t);
      if (void 0 === e) return;
      return JSON.parse(e, vn);
    } catch {
      return console.warn(`Invalid JSON in storage item "${e}". Resetting to default.`), 
      bn(e, fn[e]);
    }
  }
  async function wn(e) {
    const t = await _n(e);
    if ("customSelectors" === e) try {
      const n = pn(t), r = At.shape[e].parse(n);
      return await bn(e, r);
    } catch {
      return bn(e, fn[e]);
    }
    return bn(e, fn[e]);
  }
  const xn = new f;
  async function kn(e) {
    const t = await _n(e), n = At.shape[e].safeParse(t);
    return n.success ? n.data : xn.runExclusive((async () => {
      const t = await _n(e);
      try {
        return At.shape[e].parse(t);
      } catch {
        return wn(e);
      }
    }));
  }
  var An;
  An = i("jPSnH").getBundleURL("fMySn") + i("bt8AJ").resolve("8MGJT");
  var Tn;
  Tn = i("jPSnH").getBundleURL("fMySn") + i("bt8AJ").resolve("4JszJ");
  var Mn;
  Mn = i("jPSnH").getBundleURL("fMySn") + i("bt8AJ").resolve("8YSPa");
  var jn;
  jn = i("jPSnH").getBundleURL("fMySn") + i("bt8AJ").resolve("hVtuA");
  var Sn;
  Sn = i("jPSnH").getBundleURL("fMySn") + i("bt8AJ").resolve("415ky");
  var Cn;
  Cn = i("jPSnH").getBundleURL("fMySn") + i("bt8AJ").resolve("iWmnl");
  var In;
  In = i("jPSnH").getBundleURL("fMySn") + i("bt8AJ").resolve("9g757");
  const En = {
    icon48: new URL(An),
    icon128: new URL(Tn),
    iconSvg: new URL(Mn),
    iconKeyboard48: new URL(jn),
    offscreenDocument: new URL(Sn),
    whatsNewPage: new URL(Cn),
    onboarding: new URL(In)
  };
  s = i("dBVaG"), s = i("dBVaG");
  function On(e) {
    if (null == e) throw new Error("Fatal error: value must not be null/undefined.");
  }
  function Nn(e) {
    return "fulfilled" === e.status;
  }
  s = i("dBVaG");
  async function Rn() {
    const e = (await n(s).tabs.query({
      currentWindow: !0,
      active: !0
    }))[0];
    if (!e) throw new Error("Unable to retrieve the current tab");
    return e;
  }
  async function Ln() {
    const e = await Rn();
    if (!e.id) throw new Error("Unable to retrieve the current tab id");
    return e.id;
  }
  s = i("dBVaG");
  async function Pn(e) {
    if (!await kn("keyboardClicking")) return new Set;
    const t = (await kn("keysToExclude")).filter((([t]) => new RegExp(t).test(e))).reduce(((e, t) => `${e}, ${t[1]}`), "").toLowerCase();
    return new Set(t.split(/[, ]/).map((e => e.trim())).filter((e => e)));
  }
  s = i("dBVaG");
  const Zn = new Map;
  async function zn(e) {
    const t = await Ln();
    Zn.set(t, {
      url: e,
      completed: !1
    });
  }
  async function $n() {
    const e = await Ln();
    Zn.get(e).completed = !0;
  }
  async function Bn(e) {
    const t = Zn.get(e);
    if (!t || !t.completed) return !1;
    const r = (await n(s).webNavigation.getAllFrames({
      tabId: e
    })).find((e => 0 === e.frameId)), a = !!r && t.url === r.url;
    return Zn.delete(e), a;
  }
  async function qn(e) {
    const t = await kn("includeSingleLetterHints"), r = await kn("keyboardClicking"), a = await kn("useNumberHints") && !r ? [ ...Mt ] : t && !r ? [ ...Tt ] : Tt.slice(0, -26), i = await n(s).tabs.get(e), o = i.url ? await Pn(i.url) : new Set, c = await kn("hintsToExclude");
    return {
      free: a.filter((e => !o.has(e[0]) && !c.toLowerCase().split(/[, ]/).filter((e => e)).map((e => e.trim())).includes(e))),
      assigned: new Map
    };
  }
  async function Fn(e, t) {
    const n = await qn(t);
    e.free = n.free, e.assigned = n.assigned;
  }
  const Un = new f;
  async function Wn(e, t) {
    return Un.runExclusive((async () => {
      const n = await async function(e) {
        const t = await kn("hintsStacks");
        return t.has(e) ? t.get(e) : void 0;
      }(e) ?? await qn(e), r = await t(n);
      return await async function(e, t) {
        const n = await kn("hintsStacks");
        n.set(e, t), await bn("hintsStacks", n);
      }(e, n), r;
    }));
  }
  async function Dn(e) {
    await Wn(e, (async t => {
      await Fn(t, e);
    }));
  }
  async function Vn(e, t, r) {
    return Wn(e, (async a => {
      await Bn(e) && await Fn(a, e);
      const i = a.free.splice(-r, r);
      for (const e of i) a.assigned.set(e, t);
      const o = [ ...a.assigned.keys() ];
      return await n(s).tabs.sendMessage(e, {
        type: "updateHintsInTab",
        hints: o
      }), i;
    }));
  }
  async function Hn(e, t, r) {
    return Wn(e, (async a => {
      const i = (await n(s).webNavigation.getAllFrames({
        tabId: e
      })).map((e => e.frameId)).filter((e => e !== t)), o = [];
      for (const t of i) {
        const a = await n(s).tabs.sendMessage(e, {
          type: "reclaimHints",
          amount: r - o.length
        }, {
          frameId: t
        });
        if (o.push(...a), o.length === r) break;
      }
      for (const e of o) a.assigned.set(e, t);
      const c = [ ...a.assigned.keys() ];
      return await n(s).tabs.sendMessage(e, {
        type: "updateHintsInTab",
        hints: c
      }), o;
    }));
  }
  async function Kn(e, t, n) {
    await Wn(e, (async e => {
      e.free = e.free.filter((e => !n.includes(e)));
      for (const r of n) e.assigned.set(r, t);
    }));
  }
  async function Gn(e, t) {
    await Wn(e, (async e => {
      const n = t.filter((t => e.assigned.has(t)));
      e.free.push(...n), e.free.sort(((e, t) => t.length - e.length || t.localeCompare(e)));
      for (const t of n) e.assigned.delete(t);
    }));
  }
  async function Jn(e, t) {
    const n = "string" == typeof t.target ? [ t.target ] : t.target, r = new Map, a = new Map;
    return Wn(e, (async e => {
      for (const t of n) {
        const n = e.assigned.get(t);
        if (void 0 !== n) {
          const e = r.get(n);
          e ? e.push(t) : r.set(n, [ t ]);
        }
      }
      for (const [e, n] of r.entries()) {
        const r = void 0 !== t.arg ? t.arg : void 0;
        a.set(e, {
          type: t.type,
          target: n,
          arg: r
        });
      }
      return a;
    }));
  }
  s = i("dBVaG");
  async function Yn(e, t) {
    if (await kn("enableNotifications")) try {
      const r = await Ln();
      await n(s).tabs.sendMessage(r, {
        type: "displayToastNotification",
        text: e,
        options: t
      });
    } catch {
      n(s).notifications.create("rango-notification", {
        type: "basic",
        iconUrl: En.icon128.href,
        title: "Rango",
        message: e
      });
    }
  }
  async function Qn() {
    await Yn("This command has been removed. Update rango-talon and use the command 'rango settings' to open the settings page.", {
      type: "warning",
      autoClose: 8e3
    });
  }
  let Xn = 0;
  const er = new Set([ "markHintsAsKeyboardReachable", "restoreKeyboardReachableHints", "displayExtraHints", "displayExcludedHints", "displayLessHints", "confirmSelectorsCustomization", "includeOrExcludeMoreSelectors", "includeOrExcludeLessSelectors", "resetCustomSelectors", "showReferences", "removeReference", "runActionOnReference" ]);
  async function tr(e, t, r) {
    const a = t ?? await Ln();
    if ("target" in e) {
      const t = await Jn(a, e);
      if ("directClickElement" === e.type && 1 === e.target.length && 0 === t?.size) return [ {
        name: "typeTargetCharacters"
      } ];
      if (t) {
        const r = Array.from(t).map((async ([t, r]) => (/^scroll.*AtElement$/.test(e.type) && (Xn = t), 
        n(s).tabs.sendMessage(a, r, {
          frameId: t
        })))), i = await Promise.allSettled(r);
        if (e.type.startsWith("copy")) {
          return i.filter(Nn).filter((e => e.value)).map((e => e.value)).join("\n");
        }
        return 1 === i.length && Nn(i[0]) && i[0].value ? i[0].value : void 0;
      }
    } else {
      if (/^scroll.*AtElement$/.test(e.type)) return n(s).tabs.sendMessage(a, e, {
        frameId: Xn
      });
      if ("removeReference" === e.type || "runActionOnReference" === e.type) return async function(e, t) {
        const r = (await n(s).webNavigation.getAllFrames({
          tabId: t
        })).map((async r => n(s).tabs.sendMessage(t, e, {
          frameId: r.frameId
        }))), a = (await Promise.allSettled(r)).filter(Nn).some((e => e.value)), i = "removeReference" === e.type ? e.arg : e.arg2;
        a || await Yn(`Unable to find reference "${i}".`, {
          type: "warning"
        }), a && "removeReference" === e.type && await Yn(`Reference "${i}" removed.`, {
          icon: "trash"
        });
      }(e, a);
      if ("runActionOnTextMatchedElement" === e.type) return async function(e, t, r) {
        const a = await Ln(), i = (await n(s).webNavigation.getAllFrames({
          tabId: a
        })).map((async e => ({
          frameId: e.frameId,
          score: await n(s).tabs.sendMessage(a, {
            type: "matchElementByText",
            text: t,
            prioritizeViewport: r
          }, {
            frameId: e.frameId
          })
        }))), o = (await Promise.allSettled(i)).filter(Nn).map((e => e.value)).filter((e => "number" == typeof e.score)).sort(((e, t) => (e.score ?? 0) - (t.score ?? 0)));
        o[0] ? await n(s).tabs.sendMessage(a, {
          type: "executeActionOnTextMatchedElement",
          actionType: e
        }, {
          frameId: o[0].frameId
        }) : await Yn("Unable to find element with matching text", {
          type: "warning"
        });
      }(e.arg, e.arg2, e.arg3);
    }
    return r = r ?? er.has(e.type) ? void 0 : 0, e.frameId = r, n(s).tabs.sendMessage(a, e, {
      frameId: r
    });
  }
  async function nr() {
    await $n(), n(s).webNavigation.onCompleted.removeListener(nr);
  }
  function rr() {
    n(s).webNavigation.onCommitted.addListener((async ({tabId: e, frameId: t, url: r}) => {
      if (0 !== t) return;
      if (!await n(s).tabs.get(e)) {
        await zn(r);
        n(s).webNavigation.onCompleted.hasListener(nr) || n(s).webNavigation.onCompleted.addListener(nr);
      } else n(s).webNavigation.onCompleted.removeListener(nr), await Dn(e);
    })), n(s).webNavigation.onCompleted.addListener((async ({tabId: e, frameId: t}) => {
      if (!!await n(s).tabs.get(e)) try {
        await tr({
          type: "onCompleted",
          frameId: t
        }, e, t);
      } catch (e) {
        console.error(e);
      }
    }));
  }
  s = i("dBVaG"), s = i("dBVaG");
  const ar = n(s = i("dBVaG")).action ? n(s).action : n(s).browserAction;
  async function ir() {
    const e = await kn("keyboardClicking") ? En.iconKeyboard48.pathname : En.icon48.pathname;
    ar.setIcon({
      path: e
    });
  }
  async function sr() {
    const e = await kn("keyboardClicking");
    await bn("keyboardClicking", !e);
  }
  function or(e) {
    try {
      const t = new URL(e);
      return t.protocol.includes("http") ? `https?://${t.host}/*` : t.href;
    } catch {
      return e;
    }
  }
  async function cr() {
    const e = await kn("keyboardClicking"), t = n(s).browserAction ? [ "browser_action" ] : [ "action" ];
    n(s).contextMenus.create({
      id: "keyboard-clicking",
      title: "Keyboard Clicking",
      type: "checkbox",
      contexts: t,
      checked: e
    }), n(s).contextMenus.create({
      id: "settings",
      title: "Settings",
      type: "normal",
      contexts: t
    }), n(s).contextMenus.create({
      id: "help",
      title: "Help",
      type: "normal",
      contexts: t
    }), n(s).contextMenus.create({
      id: "add-keys-to-exclude",
      title: "Add Keys to Exclude",
      type: "normal",
      contexts: t
    });
  }
  n(s).storage.onChanged.addListener((async e => {
    if ("keyboardClicking" in e) {
      await ir();
      const e = await kn("keyboardClicking");
      try {
        await n(s).contextMenus.update("keyboard-clicking", {
          checked: e
        });
      } catch {}
    }
  }));
  s = i("dBVaG");
  const ur = new f;
  async function lr(e) {
    return ur.runExclusive((async () => {
      const t = await kn("tabMarkers"), n = e(t);
      return await bn("tabMarkers", t), n;
    }));
  }
  async function fr(e) {
    return lr((({free: t, tabIdsToMarkers: n, markersToTabIds: r}) => {
      const a = n.get(e) ?? t.pop();
      return a ? (n.set(e, a), r.set(a, e), a) : "";
    }));
  }
  async function dr(e) {
    return lr((({markersToTabIds: t}) => {
      const n = t.get(e);
      if (!n) throw new Error(`No tab with the marker "${e}"`);
      return n;
    }));
  }
  async function hr() {
    await lr((e => (e.free = [ ...Tt ], e.tabIdsToMarkers = new Map, e.markersToTabIds = new Map, 
    e)));
  }
  async function pr() {
    if (await hr(), !await kn("includeTabMarkers")) return;
    const e = await n(s).tabs.query({});
    await Promise.allSettled(e.map((async ({title: e, id: t}) => {
      if (!e || !t) return;
      const r = (e => /^([a-z]{1,2}) \| /i.exec(e)?.[1]?.toLowerCase())(e);
      if (r) try {
        await async function(e, t) {
          return lr((({free: n, tabIdsToMarkers: r, markersToTabIds: a}) => {
            if (!n.includes(t)) throw new Error(`Unable to assign marker ${t} as it's already in use`);
            const i = n.indexOf(t);
            n.splice(i, 1), r.set(e, t), a.set(t, e);
          }));
        }(t, r);
      } catch {
        return n(s).tabs.reload(t);
      }
    })));
  }
  async function gr() {
    await hr();
    const e = (await n(s).tabs.query({})).map((async e => {
      try {
        await tr({
          type: "refreshTitleDecorations"
        }, e.id);
      } catch {
        return n(s).tabs.reload(e.id);
      }
    }));
    await Promise.allSettled(e);
  }
  function mr() {
    return !!navigator.vendor && navigator.vendor.includes("Apple");
  }
  n(s).tabs.onRemoved.addListener((async e => {
    await async function(e) {
      const t = await fr(e);
      t && await lr((({free: n, tabIdsToMarkers: r, markersToTabIds: a}) => {
        r.delete(e), a.delete(t), n.push(t), n.sort(((e, t) => t.length - e.length || t.localeCompare(e)));
      }));
    }(e);
  })), n(s).tabs.onReplaced.addListener((async (e, t) => {
    await lr((({tabIdsToMarkers: n, markersToTabIds: r}) => {
      const a = n.get(t);
      a && (n.delete(t), n.set(e, a), r.set(a, e));
    }));
  }));
  s = i("dBVaG");
  const yr = new f;
  async function vr(e, t, n) {
    await yr.runExclusive((async () => {
      const r = await kn("tabsByRecency"), a = r.get(e) ?? [], i = a.indexOf(t);
      -1 !== i && a.splice(i, 1), n || a[a.length - 1] === t || a.push(t), r.set(e, a), 
      await bn("tabsByRecency", r);
    }));
  }
  async function br() {
    const e = await Rn();
    e.windowId && e.id && await vr(e.windowId, e.id, !1), n(s).tabs.onActivated.addListener((async e => {
      await vr(e.windowId, e.tabId, !1);
    })), n(s).tabs.onRemoved.addListener((async (e, t) => {
      await vr(t.windowId, e, !0);
    }));
  }
  async function _r() {
    await br(), rr();
  }
  async function wr(e, t) {
    const r = await kn("includeTabMarkers"), a = await kn("urlInTitle"), i = await Rn(), {title: o, url: c} = t;
    if (c && i.url === c && i.title === o && (r || a)) try {
      const t = await tr({
        type: "getTitleBeforeDecoration"
      });
      t && (n(s).bookmarks?.onChanged.removeListener(wr), await n(s).bookmarks.update(e, {
        title: t
      }), n(s).bookmarks?.onChanged.addListener(wr));
    } catch {}
  }
  async function xr() {
    const e = !await kn("hintsToggleGlobal");
    return await bn("hintsToggleGlobal", e), e;
  }
  async function kr(e, t) {
    const n = await Rn();
    On(n.url);
    const {host: r, origin: a, pathname: i} = new URL(n.url);
    switch (e) {
     case "everywhere":
      void 0 === t && (await bn("hintsToggleGlobal", !0), await bn("hintsToggleTabs", new Map), 
      await bn("hintsToggleHosts", new Map), await bn("hintsTogglePaths", new Map), await tr({
        type: "updateNavigationToggle",
        enable: t
      }));
      break;

     case "now":
      await tr({
        type: "updateNavigationToggle",
        enable: t
      });
      break;

     case "global":
      await bn("hintsToggleGlobal", void 0 === t || t);
      break;

     case "tab":
      {
        const e = await kn("hintsToggleTabs");
        On(n.id), void 0 === t ? e.delete(n.id) : e.set(n.id, t), await bn("hintsToggleTabs", e);
        break;
      }

     case "host":
      {
        const e = await kn("hintsToggleHosts");
        r && (void 0 === t ? e.delete(r) : e.set(r, t)), await bn("hintsToggleHosts", e);
        break;
      }

     case "page":
      {
        const e = await kn("hintsTogglePaths");
        a && i && (void 0 === t ? e.delete(a + i) : e.set(a + i, t)), await bn("hintsTogglePaths", e);
        break;
      }
    }
  }
  async function Ar(e) {
    return Promise.allSettled([ e ]).then((([e]) => Nn(e) ? [ e.value, void 0 ] : [ void 0, e.reason ]));
  }
  function Tr(e) {
    for (const t of e) "typeTargetCharacters" === t.name && (t.previousName = "noHintFound");
    let t, n;
    return 1 === e.length && (t = e[0]), e.length > 1 && (t = e.find((e => e.main))), 
    t ? (n = {
      type: "previousName" in t ? t.previousName : t.name
    }, "key" in t && (n.key = t.key), "textToCopy" in t && (n.key = t.textToCopy)) : n = {
      type: "noAction"
    }, {
      type: "response",
      action: n,
      actions: e
    };
  }
  n(s).runtime.onInstalled.addListener((async ({reason: e, previousVersion: t}) => {
    if ("install" === e || "update" === e) {
      if (await ir(), await cr(), "install" === e && await n(s).tabs.create({
        url: En.onboarding.href
      }), "update" === e && await kn("showWhatsNewPageOnUpdate")) {
        const e = n(s).runtime.getManifest().version, [r, a] = e.split("."), [i, o] = t.split(".");
        r === i && a === o || await n(s).tabs.create({
          url: En.whatsNewPage.href
        });
      }
      await bn("hintsStacks", new Map), "install" === e && await pr();
    }
  })), n(s).runtime.onStartup.addListener((async () => {
    await pr(), await ir(), await bn("hintsStacks", new Map), await bn("hintsToggleTabs", new Map), 
    await bn("tabsByRecency", new Map), mr() && await cr();
  })), n(s).bookmarks?.onCreated.addListener(wr), n(s).bookmarks?.onChanged.addListener(wr);
  s = i("dBVaG"), s = i("dBVaG");
  async function Mr(e) {
    const t = await async function(e) {
      const t = new Map;
      for (const r of e) {
        const e = await dr(r), a = await n(s).tabs.get(e);
        a.windowId && !t.has(a.windowId) && t.set(a.windowId, a);
      }
      return Array.from(t.values());
    }(e);
    for (const [e, r] of t.entries()) await n(s).tabs.update(r.id, {
      active: !0
    }), 0 === e ? await n(s).windows.update(r.windowId, {
      focused: !0
    }) : r.discarded && await n(s).tabs.reload(r.id);
  }
  s = i("dBVaG");
  async function jr(e, t) {
    const r = await n(s).tabs.query({
      currentWindow: !0
    }), a = await Rn(), i = await Ln();
    let o;
    switch (e) {
     case "other":
      o = e => e.id !== i;
      break;

     case "left":
      o = e => e.index < a.index;
      break;

     case "right":
      o = e => e.index > a.index;
      break;

     case "leftEnd":
      On(t), o = e => e.index < t;
      break;

     case "rightEnd":
      On(t), o = e => e.index >= r.length - t;
      break;

     case "previous":
      On(t), o = e => e.index >= a.index - t && e.index < a.index;
      break;

     case "next":
      On(t), o = e => e.index > a.index && e.index <= a.index + t;
    }
    const c = r.filter((e => o(e))).map((e => e.id)).filter((e => "number" == typeof e));
    await n(s).tabs.remove(c);
  }
  async function Sr(e) {
    const [t] = await Ar(tr({
      type: "getTitleBeforeDecoration"
    }));
    return t ?? e.title;
  }
  async function Cr(e, t) {
    On(e.url), await Yn("Copied to the clipboard", {
      type: "success"
    });
    return new URL(e.url)[t];
  }
  async function Ir(e) {
    const t = await Sr(e);
    return On(e.url), On(t), await Yn("Copied to the clipboard", {
      type: "success"
    }), `[${t}](${e.url})`;
  }
  s = i("dBVaG");
  async function Er(e) {
    const t = await async function(e) {
      const {protocol: t, host: r, pathname: a} = new URL(e);
      return t.startsWith("http") ? n(s).tabs.query({
        url: `*://${r}${a}*`
      }) : (await n(s).tabs.query({})).filter((t => t.url?.startsWith(e)));
    }(e), r = await async function(e) {
      const t = await Rn();
      return e.find((e => e.windowId === t.windowId)) ?? e[0];
    }(t);
    if (r?.id) await n(s).windows.update(r.windowId, {
      focused: !0
    }), await n(s).tabs.update(r.id, {
      active: !0
    }); else try {
      await n(s).tabs.create({
        url: e,
        active: !0
      });
    } catch {
      return [ {
        name: "openInNewTab",
        url: e
      } ];
    }
  }
  s = i("dBVaG");
  async function Or() {
    const e = await kn("tabsByRecency"), t = await n(s).windows.getCurrent();
    On(t.id);
    const r = e.get(t.id);
    On(r);
    const a = r[r.length - 2];
    a && await n(s).tabs.update(a, {
      active: !0
    });
  }
  s = i("dBVaG");
  function Nr(e) {
    return Array.isArray ? Array.isArray(e) : "[object Array]" === Br(e);
  }
  function Rr(e) {
    return "string" == typeof e;
  }
  function Lr(e) {
    return "number" == typeof e;
  }
  function Pr(e) {
    return !0 === e || !1 === e || function(e) {
      return Zr(e) && null !== e;
    }(e) && "[object Boolean]" == Br(e);
  }
  function Zr(e) {
    return "object" == typeof e;
  }
  function zr(e) {
    return null != e;
  }
  function $r(e) {
    return !e.trim().length;
  }
  function Br(e) {
    return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
  }
  const qr = Object.prototype.hasOwnProperty;
  class Fr {
    constructor(e) {
      this._keys = [], this._keyMap = {};
      let t = 0;
      e.forEach((e => {
        let n = Ur(e);
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
  function Ur(e) {
    let t = null, n = null, r = null, a = 1, i = null;
    if (Rr(e) || Nr(e)) r = e, t = Wr(e), n = Dr(e); else {
      if (!qr.call(e, "name")) throw new Error((e => `Missing ${e} property in key`)("name"));
      const s = e.name;
      if (r = s, qr.call(e, "weight") && (a = e.weight, a <= 0)) throw new Error((e => `Property 'weight' in key '${e}' must be a positive integer`)(s));
      t = Wr(s), n = Dr(s), i = e.getFn;
    }
    return {
      path: t,
      id: n,
      weight: a,
      src: r,
      getFn: i
    };
  }
  function Wr(e) {
    return Nr(e) ? e : e.split(".");
  }
  function Dr(e) {
    return Nr(e) ? e.join(".") : e;
  }
  var Vr = {
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
    ...{
      useExtendedSearch: !1,
      getFn: function(e, t) {
        let n = [], r = !1;
        const a = (e, t, i) => {
          if (zr(e)) if (t[i]) {
            const s = e[t[i]];
            if (!zr(s)) return;
            if (i === t.length - 1 && (Rr(s) || Lr(s) || Pr(s))) n.push(function(e) {
              return null == e ? "" : function(e) {
                if ("string" == typeof e) return e;
                let t = e + "";
                return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
              }(e);
            }(s)); else if (Nr(s)) {
              r = !0;
              for (let e = 0, n = s.length; e < n; e += 1) a(s[e], t, i + 1);
            } else t.length && a(s, t, i + 1);
          } else n.push(e);
        };
        return a(e, Rr(t) ? t.split(".") : t, 0), r ? n : n[0];
      },
      ignoreLocation: !1,
      ignoreFieldNorm: !1,
      fieldNormWeight: 1
    }
  };
  const Hr = /[^ ]+/g;
  class Kr {
    constructor({getFn: e = Vr.getFn, fieldNormWeight: t = Vr.fieldNormWeight} = {}) {
      this.norm = function(e = 1, t = 3) {
        const n = new Map, r = Math.pow(10, t);
        return {
          get(t) {
            const a = t.match(Hr).length;
            if (n.has(a)) return n.get(a);
            const i = 1 / Math.pow(a, .5 * e), s = parseFloat(Math.round(i * r) / r);
            return n.set(a, s), s;
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
      !this.isCreated && this.docs.length && (this.isCreated = !0, Rr(this.docs[0]) ? this.docs.forEach(((e, t) => {
        this._addString(e, t);
      })) : this.docs.forEach(((e, t) => {
        this._addObject(e, t);
      })), this.norm.clear());
    }
    add(e) {
      const t = this.size();
      Rr(e) ? this._addString(e, t) : this._addObject(e, t);
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
      if (!zr(e) || $r(e)) return;
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
        if (zr(a)) if (Nr(a)) {
          let e = [];
          const t = [ {
            nestedArrIndex: -1,
            value: a
          } ];
          for (;t.length; ) {
            const {nestedArrIndex: n, value: r} = t.pop();
            if (zr(r)) if (Rr(r) && !$r(r)) {
              let t = {
                v: r,
                i: n,
                n: this.norm.get(r)
              };
              e.push(t);
            } else Nr(r) && r.forEach(((e, n) => {
              t.push({
                nestedArrIndex: n,
                value: e
              });
            }));
          }
          n.$[r] = e;
        } else if (Rr(a) && !$r(a)) {
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
  function Gr(e, t, {getFn: n = Vr.getFn, fieldNormWeight: r = Vr.fieldNormWeight} = {}) {
    const a = new Kr({
      getFn: n,
      fieldNormWeight: r
    });
    return a.setKeys(e.map(Ur)), a.setSources(t), a.create(), a;
  }
  function Jr(e, {errors: t = 0, currentLocation: n = 0, expectedLocation: r = 0, distance: a = Vr.distance, ignoreLocation: i = Vr.ignoreLocation} = {}) {
    const s = t / e.length;
    if (i) return s;
    const o = Math.abs(r - n);
    return a ? s + o / a : o ? 1 : s;
  }
  const Yr = 32;
  function Qr(e, t, n, {location: r = Vr.location, distance: a = Vr.distance, threshold: i = Vr.threshold, findAllMatches: s = Vr.findAllMatches, minMatchCharLength: o = Vr.minMatchCharLength, includeMatches: c = Vr.includeMatches, ignoreLocation: u = Vr.ignoreLocation} = {}) {
    if (t.length > Yr) throw new Error(`Pattern length exceeds max of ${Yr}.`);
    const l = t.length, f = e.length, d = Math.max(0, Math.min(r, f));
    let h = i, p = d;
    const g = o > 1 || c, m = g ? Array(f) : [];
    let y;
    for (;(y = e.indexOf(t, p)) > -1; ) {
      let e = Jr(t, {
        currentLocation: y,
        expectedLocation: d,
        distance: a,
        ignoreLocation: u
      });
      if (h = Math.min(e, h), p = y + l, g) {
        let e = 0;
        for (;e < l; ) m[y + e] = 1, e += 1;
      }
    }
    p = -1;
    let v = [], b = 1, _ = l + f;
    const w = 1 << l - 1;
    for (let r = 0; r < l; r += 1) {
      let i = 0, o = _;
      for (;i < o; ) {
        Jr(t, {
          errors: r,
          currentLocation: d + o,
          expectedLocation: d,
          distance: a,
          ignoreLocation: u
        }) <= h ? i = o : _ = o, o = Math.floor((_ - i) / 2 + i);
      }
      _ = o;
      let c = Math.max(1, d - o + 1), y = s ? f : Math.min(d + o, f) + l, x = Array(y + 2);
      x[y + 1] = (1 << r) - 1;
      for (let i = y; i >= c; i -= 1) {
        let s = i - 1, o = n[e.charAt(s)];
        if (g && (m[s] = +!!o), x[i] = (x[i + 1] << 1 | 1) & o, r && (x[i] |= (v[i + 1] | v[i]) << 1 | 1 | v[i + 1]), 
        x[i] & w && (b = Jr(t, {
          errors: r,
          currentLocation: s,
          expectedLocation: d,
          distance: a,
          ignoreLocation: u
        }), b <= h)) {
          if (h = b, p = s, p <= d) break;
          c = Math.max(1, 2 * d - p);
        }
      }
      if (Jr(t, {
        errors: r + 1,
        currentLocation: d,
        expectedLocation: d,
        distance: a,
        ignoreLocation: u
      }) > h) break;
      v = x;
    }
    const x = {
      isMatch: p >= 0,
      score: Math.max(.001, b)
    };
    if (g) {
      const e = function(e = [], t = Vr.minMatchCharLength) {
        let n = [], r = -1, a = -1, i = 0;
        for (let s = e.length; i < s; i += 1) {
          let s = e[i];
          s && -1 === r ? r = i : s || -1 === r || (a = i - 1, a - r + 1 >= t && n.push([ r, a ]), 
          r = -1);
        }
        return e[i - 1] && i - r >= t && n.push([ r, i - 1 ]), n;
      }(m, o);
      e.length ? c && (x.indices = e) : x.isMatch = !1;
    }
    return x;
  }
  function Xr(e) {
    let t = {};
    for (let n = 0, r = e.length; n < r; n += 1) {
      const a = e.charAt(n);
      t[a] = (t[a] || 0) | 1 << r - n - 1;
    }
    return t;
  }
  class ea {
    constructor(e, {location: t = Vr.location, threshold: n = Vr.threshold, distance: r = Vr.distance, includeMatches: a = Vr.includeMatches, findAllMatches: i = Vr.findAllMatches, minMatchCharLength: s = Vr.minMatchCharLength, isCaseSensitive: o = Vr.isCaseSensitive, ignoreLocation: c = Vr.ignoreLocation} = {}) {
      if (this.options = {
        location: t,
        threshold: n,
        distance: r,
        includeMatches: a,
        findAllMatches: i,
        minMatchCharLength: s,
        isCaseSensitive: o,
        ignoreLocation: c
      }, this.pattern = o ? e : e.toLowerCase(), this.chunks = [], !this.pattern.length) return;
      const u = (e, t) => {
        this.chunks.push({
          pattern: e,
          alphabet: Xr(e),
          startIndex: t
        });
      }, l = this.pattern.length;
      if (l > Yr) {
        let e = 0;
        const t = l % Yr, n = l - t;
        for (;e < n; ) u(this.pattern.substr(e, Yr), e), e += Yr;
        if (t) {
          const e = l - Yr;
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
      const {location: r, distance: a, threshold: i, findAllMatches: s, minMatchCharLength: o, ignoreLocation: c} = this.options;
      let u = [], l = 0, f = !1;
      this.chunks.forEach((({pattern: t, alphabet: d, startIndex: h}) => {
        const {isMatch: p, score: g, indices: m} = Qr(e, t, d, {
          location: r + h,
          distance: a,
          threshold: i,
          findAllMatches: s,
          minMatchCharLength: o,
          includeMatches: n,
          ignoreLocation: c
        });
        p && (f = !0), l += g, p && m && (u = [ ...u, ...m ]);
      }));
      let d = {
        isMatch: f,
        score: f ? l / this.chunks.length : 1
      };
      return f && n && (d.indices = u), d;
    }
  }
  class ta {
    constructor(e) {
      this.pattern = e;
    }
    static isMultiMatch(e) {
      return na(e, this.multiRegex);
    }
    static isSingleMatch(e) {
      return na(e, this.singleRegex);
    }
    search() {}
  }
  function na(e, t) {
    const n = e.match(t);
    return n ? n[1] : null;
  }
  class ra extends ta {
    constructor(e, {location: t = Vr.location, threshold: n = Vr.threshold, distance: r = Vr.distance, includeMatches: a = Vr.includeMatches, findAllMatches: i = Vr.findAllMatches, minMatchCharLength: s = Vr.minMatchCharLength, isCaseSensitive: o = Vr.isCaseSensitive, ignoreLocation: c = Vr.ignoreLocation} = {}) {
      super(e), this._bitapSearch = new ea(e, {
        location: t,
        threshold: n,
        distance: r,
        includeMatches: a,
        findAllMatches: i,
        minMatchCharLength: s,
        isCaseSensitive: o,
        ignoreLocation: c
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
  class aa extends ta {
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
  const ia = [ class extends ta {
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
  }, aa, class extends ta {
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
  }, class extends ta {
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
  }, class extends ta {
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
  }, class extends ta {
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
  }, class extends ta {
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
  }, ra ], sa = ia.length, oa = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
  const ca = new Set([ ra.type, aa.type ]);
  const ua = [];
  function la(e, t) {
    for (let n = 0, r = ua.length; n < r; n += 1) {
      let r = ua[n];
      if (r.condition(e, t)) return new r(e, t);
    }
    return new ea(e, t);
  }
  const fa = "$and", da = "$or", ha = "$path", pa = "$val", ga = e => !(!e[fa] && !e[da]), ma = e => ({
    [fa]: Object.keys(e).map((t => ({
      [t]: e[t]
    })))
  });
  function ya(e, t, {auto: n = !0} = {}) {
    const r = e => {
      let a = Object.keys(e);
      const i = (e => !!e[ha])(e);
      if (!i && a.length > 1 && !ga(e)) return r(ma(e));
      if ((e => !Nr(e) && Zr(e) && !ga(e))(e)) {
        const r = i ? e[ha] : a[0], s = i ? e[pa] : e[r];
        if (!Rr(s)) throw new Error((e => `Invalid value for key ${e}`)(r));
        const o = {
          keyId: Dr(r),
          pattern: s
        };
        return n && (o.searcher = la(s, t)), o;
      }
      let s = {
        children: [],
        operator: a[0]
      };
      return a.forEach((t => {
        const n = e[t];
        Nr(n) && n.forEach((e => {
          s.children.push(r(e));
        }));
      })), s;
    };
    return ga(e) || (e = ma(e)), r(e);
  }
  function va(e, t) {
    const n = e.matches;
    t.matches = [], zr(n) && n.forEach((e => {
      if (!zr(e.indices) || !e.indices.length) return;
      const {indices: n, value: r} = e;
      let a = {
        indices: n,
        value: r
      };
      e.key && (a.key = e.key.src), e.idx > -1 && (a.refIndex = e.idx), t.matches.push(a);
    }));
  }
  function ba(e, t) {
    t.score = e.score;
  }
  class _a {
    constructor(e, t = {}, n) {
      this.options = {
        ...Vr,
        ...t
      }, this.options.useExtendedSearch, this._keyStore = new Fr(this.options.keys), this.setCollection(e, n);
    }
    setCollection(e, t) {
      if (this._docs = e, t && !(t instanceof Kr)) throw new Error("Incorrect 'index' type");
      this._myIndex = t || Gr(this.options.keys, this._docs, {
        getFn: this.options.getFn,
        fieldNormWeight: this.options.fieldNormWeight
      });
    }
    add(e) {
      zr(e) && (this._docs.push(e), this._myIndex.add(e));
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
      const {includeMatches: n, includeScore: r, shouldSort: a, sortFn: i, ignoreFieldNorm: s} = this.options;
      let o = Rr(e) ? Rr(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e);
      return function(e, {ignoreFieldNorm: t = Vr.ignoreFieldNorm}) {
        e.forEach((e => {
          let n = 1;
          e.matches.forEach((({key: e, norm: r, score: a}) => {
            const i = e ? e.weight : null;
            n *= Math.pow(0 === a && i ? Number.EPSILON : a, (i || 1) * (t ? 1 : r));
          })), e.score = n;
        }));
      }(o, {
        ignoreFieldNorm: s
      }), a && o.sort(i), Lr(t) && t > -1 && (o = o.slice(0, t)), function(e, t, {includeMatches: n = Vr.includeMatches, includeScore: r = Vr.includeScore} = {}) {
        const a = [];
        return n && a.push(va), r && a.push(ba), e.map((e => {
          const {idx: n} = e, r = {
            item: t[n],
            refIndex: n
          };
          return a.length && a.forEach((t => {
            t(e, r);
          })), r;
        }));
      }(o, this._docs, {
        includeMatches: n,
        includeScore: r
      });
    }
    _searchStringList(e) {
      const t = la(e, this.options), {records: n} = this._myIndex, r = [];
      return n.forEach((({v: e, i: n, n: a}) => {
        if (!zr(e)) return;
        const {isMatch: i, score: s, indices: o} = t.searchIn(e);
        i && r.push({
          item: e,
          idx: n,
          matches: [ {
            score: s,
            value: e,
            norm: a,
            indices: o
          } ]
        });
      })), r;
    }
    _searchLogical(e) {
      const t = ya(e, this.options), n = (e, t, r) => {
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
        for (let i = 0, s = e.children.length; i < s; i += 1) {
          const s = e.children[i], o = n(s, t, r);
          if (o.length) a.push(...o); else if (e.operator === fa) return [];
        }
        return a;
      }, r = this._myIndex.records, a = {}, i = [];
      return r.forEach((({$: e, i: r}) => {
        if (zr(e)) {
          let s = n(t, e, r);
          s.length && (a[r] || (a[r] = {
            idx: r,
            item: e,
            matches: []
          }, i.push(a[r])), s.forEach((({matches: e}) => {
            a[r].matches.push(...e);
          })));
        }
      })), i;
    }
    _searchObjectList(e) {
      const t = la(e, this.options), {keys: n, records: r} = this._myIndex, a = [];
      return r.forEach((({$: e, i: r}) => {
        if (!zr(e)) return;
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
      if (!zr(t)) return [];
      let r = [];
      if (Nr(t)) t.forEach((({v: t, i: a, n: i}) => {
        if (!zr(t)) return;
        const {isMatch: s, score: o, indices: c} = n.searchIn(t);
        s && r.push({
          score: o,
          key: e,
          value: t,
          idx: a,
          norm: i,
          indices: c
        });
      })); else {
        const {v: a, n: i} = t, {isMatch: s, score: o, indices: c} = n.searchIn(a);
        s && r.push({
          score: o,
          key: e,
          value: a,
          norm: i,
          indices: c
        });
      }
      return r;
    }
  }
  _a.version = "6.6.2", _a.createIndex = Gr, _a.parseIndex = function(e, {getFn: t = Vr.getFn, fieldNormWeight: n = Vr.fieldNormWeight} = {}) {
    const {keys: r, records: a} = e, i = new Kr({
      getFn: t,
      fieldNormWeight: n
    });
    return i.setKeys(r), i.setIndexRecords(a), i;
  }, _a.config = Vr, _a.parseQuery = ya, function(...e) {
    ua.push(...e);
  }(class {
    constructor(e, {isCaseSensitive: t = Vr.isCaseSensitive, includeMatches: n = Vr.includeMatches, minMatchCharLength: r = Vr.minMatchCharLength, ignoreLocation: a = Vr.ignoreLocation, findAllMatches: i = Vr.findAllMatches, location: s = Vr.location, threshold: o = Vr.threshold, distance: c = Vr.distance} = {}) {
      this.query = null, this.options = {
        isCaseSensitive: t,
        includeMatches: n,
        minMatchCharLength: r,
        findAllMatches: i,
        ignoreLocation: a,
        location: s,
        threshold: o,
        distance: c
      }, this.pattern = t ? e : e.toLowerCase(), this.query = function(e, t = {}) {
        return e.split("|").map((e => {
          let n = e.trim().split(oa).filter((e => e && !!e.trim())), r = [];
          for (let e = 0, a = n.length; e < a; e += 1) {
            const a = n[e];
            let i = !1, s = -1;
            for (;!i && ++s < sa; ) {
              const e = ia[s];
              let n = e.isMultiMatch(a);
              n && (r.push(new e(n, t)), i = !0);
            }
            if (!i) for (s = -1; ++s < sa; ) {
              const e = ia[s];
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
      let a = 0, i = [], s = 0;
      for (let r = 0, o = t.length; r < o; r += 1) {
        const o = t[r];
        i.length = 0, a = 0;
        for (let t = 0, r = o.length; t < r; t += 1) {
          const r = o[t], {isMatch: c, indices: u, score: l} = r.search(e);
          if (!c) {
            s = 0, a = 0, i.length = 0;
            break;
          }
          if (a += 1, s += l, n) {
            const e = r.constructor.type;
            ca.has(e) ? i = [ ...i, ...u ] : i.push(u);
          }
        }
        if (a) {
          let e = {
            isMatch: !0,
            score: s / a
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
  let wa = [], xa = -1;
  async function ka(e) {
    const t = await Rn(), r = await n(s).tabs.query({}), a = new _a(r, {
      keys: [ "url", "title" ],
      ignoreLocation: !0,
      includeScore: !0,
      threshold: .4
    }).search(e).sort(((e, n) => e.item.windowId === t.windowId && n.item.windowId !== t.windowId ? -1 : e.item.windowId !== t.windowId && n.item.windowId === t.windowId ? 1 : e.score - n.score));
    wa = a.map((e => e.item));
    const i = wa[0];
    xa = i ? 0 : -1, i?.id ? (await n(s).windows.update(i.windowId, {
      focused: !0
    }), await n(s).tabs.update(i.id, {
      active: !0
    })) : await Yn(`No tab found with the text "${e}"`, {
      type: "warning"
    });
  }
  async function Aa(e) {
    const t = wa.length, r = await Rn();
    (0 === t || 1 === t && wa[0].id === r.id) && await Yn("No more tabs matching the selected text.", {
      type: "warning"
    }), xa += e, xa = e > 0 ? xa % t : xa < 0 ? t - 1 : xa;
    const a = wa[xa];
    a?.id && (await n(s).windows.update(a.windowId, {
      focused: !0
    }), await n(s).tabs.update(a.id, {
      active: !0
    }));
  }
  async function Ta() {
    const e = !await kn("includeTabMarkers"), t = e ? "enabled" : "disabled";
    await bn("includeTabMarkers", e), await Yn(`Tab markers ${t}.`, {
      icon: t,
      toastId: "tabMarkers"
    });
  }
  async function Ma(e) {
    const [t] = await Ar(Rn()), r = t?.id;
    switch (e.type) {
     case "activateTab":
      await Mr(e.target);
      break;

     case "historyGoBack":
      try {
        await tr(e);
      } catch {
        await n(s).tabs.goBack();
      }
      break;

     case "historyGoForward":
      try {
        await tr(e);
      } catch {
        await n(s).tabs.goForward();
      }
      break;

     case "toggleHints":
      await xr();
      break;

     case "enableHints":
      await kr(e.arg, !0);
      break;

     case "disableHints":
      await kr(e.arg, !1);
      break;

     case "resetToggleLevel":
      await kr(e.arg);
      break;

     case "toggleTabMarkers":
      await Ta();
      break;

     case "toggleKeyboardClicking":
      await sr();
      break;

     case "includeSingleLetterHints":
     case "excludeSingleLetterHints":
     case "setHintStyle":
     case "setHintWeight":
     case "enableUrlInTitle":
     case "disableUrlInTitle":
      await Qn();
      break;

     case "increaseHintSize":
      {
        const e = await kn("hintFontSize");
        await bn("hintFontSize", e + 1);
        break;
      }

     case "decreaseHintSize":
      {
        const e = await kn("hintFontSize");
        await bn("hintFontSize", e - 1);
        break;
      }

     case "closeOtherTabsInWindow":
      await jr("other");
      break;

     case "closeTabsToTheLeftInWindow":
      await jr("left");
      break;

     case "closeTabsToTheRightInWindow":
      await jr("right");
      break;

     case "closeTabsLeftEndInWindow":
      await jr("leftEnd", e.arg);
      break;

     case "closeTabsRightEndInWindow":
      await jr("rightEnd", e.arg);
      break;

     case "closePreviousTabsInWindow":
      await jr("previous", e.arg);
      break;

     case "closeNextTabsInWindow":
      await jr("next", e.arg);
      break;

     case "cloneCurrentTab":
      r && await n(s).tabs.duplicate(r);
      break;

     case "moveCurrentTabToNewWindow":
      await n(s).windows.create({
        tabId: r
      });
      break;

     case "focusPreviousTab":
      await Or();
      break;

     case "copyLocationProperty":
      if (t) return Cr(t, e.arg);
      break;

     case "getBareTitle":
      if (t) {
        return [ {
          name: "responseValue",
          value: await Sr(t)
        } ];
      }
      break;

     case "copyCurrentTabMarkdownUrl":
      if (t) return Ir(t);
      break;

     case "openSettingsPage":
      await n(s).runtime.openOptionsPage();
      break;

     case "openPageInNewTab":
      await n(s).tabs.create({
        url: e.arg
      });
      break;

     case "refreshTabMarkers":
      await gr();
      break;

     case "focusOrCreateTabByUrl":
      return Er(e.arg);

     case "focusTabByText":
      await ka(e.arg);
      break;

     case "cycleTabsByText":
      await Aa(e.arg);
    }
  }
  n(s).tabs.onRemoved.addListener((e => {
    const t = wa.findIndex((t => t.id === e));
    t && wa.splice(t, 1);
  }));
  const ja = new Set([ "toggleHints", "enableHints", "disableHints", "resetToggleLevel", "increaseHintSize", "decreaseHintSize", "setHintStyle", "setHintWeight", "copyLocationProperty", "copyCurrentTabMarkdownUrl", "getBareTitle", "enableUrlInTitle", "disableUrlInTitle", "excludeSingleLetterHints", "includeSingleLetterHints", "closeOtherTabsInWindow", "closeTabsToTheLeftInWindow", "closeTabsToTheRightInWindow", "closeTabsLeftEndInWindow", "closeTabsRightEndInWindow", "closePreviousTabsInWindow", "closeNextTabsInWindow", "cloneCurrentTab", "toggleKeyboardClicking", "moveCurrentTabToNewWindow", "focusPreviousTab", "historyGoBack", "historyGoForward", "openSettingsPage", "openPageInNewTab", "activateTab", "refreshTabMarkers", "toggleTabMarkers", "focusOrCreateTabByUrl", "focusTabByText", "cycleTabsByText" ]);
  async function Sa(e) {
    const t = await (ja.has(e.type) ? Ma(e) : tr(e));
    if ("string" == typeof t) return Tr([ {
      name: "copyToClipboard",
      textToCopy: t
    } ]);
    if (t) {
      const e = t.findIndex((e => "focusPage" === e.name));
      if (-1 !== e) {
        const [n] = await Ar(tr({
          type: "checkIfDocumentHasFocus"
        }));
        n && t.splice(e, 1);
      }
    }
    return Tr(t ?? []);
  }
  s = i("dBVaG");
  async function Ca() {
    if (mr()) {
      return (await n(s).runtime.sendNativeMessage("", {
        request: "getTextFromClipboard"
      })).textFromClipboard;
    }
    return navigator.clipboard ? navigator.clipboard.readText() : async function() {
      try {
        return await chrome.offscreen.hasDocument() || await chrome.offscreen.createDocument({
          url: En.offscreenDocument.href,
          reasons: [ chrome.offscreen.Reason.CLIPBOARD ],
          justification: "Read the request from Talon from the clipboard"
        }), await chrome.runtime.sendMessage({
          type: "read-clipboard",
          target: "offscreen-doc"
        });
      } catch (e) {
        console.error(e);
      }
    }();
  }
  async function Ia() {
    const e = await Ca();
    let t;
    if (e) try {
      return t = JSON.parse(e), "request" !== t.type && console.error('Error: The message present in the clipboard is not of type "request"'), 
      t;
    } catch (e) {
      e instanceof SyntaxError && console.error(e);
    } else await Yn("Unable to read the request present on the clipboard", {
      type: "error"
    });
  }
  async function Ea(e) {
    const t = JSON.stringify(e);
    if (navigator.clipboard) {
      if (!mr()) return navigator.clipboard.writeText(t);
      {
        const e = document.querySelector("#copy-paste-area") ?? document.createElement("textarea");
        if (e.id = "copy-paste-area", document.body.append(e), e instanceof HTMLTextAreaElement) return e.value = t, 
        e.select(), document.execCommand("copy"), void (e.value = "");
      }
    }
    return async function(e) {
      try {
        await chrome.offscreen.hasDocument() || await chrome.offscreen.createDocument({
          url: En.offscreenDocument.href,
          reasons: [ chrome.offscreen.Reason.CLIPBOARD ],
          justification: "Write the response to Talon to the clipboard"
        }), await chrome.runtime.sendMessage({
          type: "copy-to-clipboard",
          target: "offscreen-doc",
          text: e
        });
      } catch (e) {
        console.error(e);
      }
    }(t);
  }
  let Oa = !1;
  async function Na() {
    await tr({
      type: "tryToFocusPage"
    });
    const [e] = await Ar(tr({
      type: "checkIfDocumentHasFocus"
    }));
    return !e && !Oa && (Oa = !0, setTimeout((() => {
      Oa = !1;
    }), 3e3), !0);
  }
  s = i("dBVaG");
  async function Ra() {
    const e = await Ln(), t = (await n(s).webNavigation.getAllFrames({
      tabId: e
    })).map((async t => n(s).tabs.sendMessage(e, {
      type: "checkActiveElementIsEditable"
    }, {
      frameId: t.frameId
    })));
    return (await Promise.all(t)).includes(!0);
  }
  let La = !1;
  async function Pa() {
    await Ea({
      type: "response",
      action: {
        type: "noHintFound"
      },
      actions: [ {
        name: "typeTargetCharacters"
      } ]
    });
  }
  async function Za(e) {
    if ("directClickElement" !== e.action.type) throw new Error("This function is only to be called with a directClickElement request");
    if (e.action.target.length > 1) return !1;
    if (!await kn("directClickWithNoFocusedDocument")) {
      const [e] = await Ar(tr({
        type: "checkIfDocumentHasFocus"
      }));
      if (!e) return await Pa(), !0;
    }
    return !(await kn("directClickWhenEditing") || !await Ra()) && (await Pa(), !0);
  }
  async function za() {
    try {
      const e = await Ia();
      if (!e) return;
      if (La = !("requestTimedOut" === e.action.type), "requestTimedOut" === e.action.type) return;
      if ("directClickElement" === e.action.type) {
        if (await Za(e)) return;
      }
      if (("setSelectionAfter" === e.action.type || "setSelectionBefore" === e.action.type || "tryToFocusElementAndCheckIsEditable" === e.action.type) && await Na()) {
        const e = Tr([ {
          name: "focusPageAndResend"
        } ]);
        return void await Ea(e);
      }
      const t = await Sa(e.action);
      La && (await Ea(t), La = !1);
    } catch (e) {
      e instanceof Error && (console.error(e), await Yn(e.message, {
        type: "error"
      }));
    }
  }
  s = i("dBVaG"), s = i("dBVaG");
  async function $a(e, t) {
    if (t && e.length > 1) throw new Error("Can't make more than one tab active");
    const r = await Rn();
    let a;
    const i = await kn("newTabPosition");
    if ("relatedAfterCurrent" === i) {
      const e = (await n(s).tabs.query({
        currentWindow: !0
      })).filter((e => e.openerTabId === r.id)).pop();
      a = e ? e.index + 1 : r.index + 1;
    }
    "afterCurrent" === i && (a = r.index + 1), "atEnd" === i && (a = 99999);
    try {
      await Promise.all(e.map((async e => n(s).tabs.create({
        url: e,
        active: t,
        index: a ? a++ : void 0,
        openerTabId: r.id
      }))));
    } catch (e) {
      console.error(e);
    }
  }
  var Ba = {};
  function qa(e, t) {
    if (t) return e;
    throw new Error("Unhandled discriminated union member: " + JSON.stringify(e));
  }
  Object.defineProperty(Ba, "__esModule", {
    value: !0
  }), Ba.assertNever = qa, Ba.default = qa;
  var Fa = i("jLEOZ");
  const Ua = new Map;
  async function Wa(e, t) {
    const n = function(e) {
      if (Ua.has(e)) return Ua.get(e);
      const t = new f;
      return Ua.set(e, t), t;
    }(e);
    return n.runExclusive((async () => {
      const n = await kn(e), r = await Promise.resolve(t(n));
      return await bn(e, n), r;
    }));
  }
  function Da(e, t) {
    for (let n = e.length - 1; n >= 0; n--) t(e[n], n) || e.splice(n, 1);
  }
  let Va, Ha, Ka = !1;
  const Ga = {
    store: {
      success: "Custom selectors saved",
      fail: "No selectors to save"
    },
    reset: {
      success: "Custom selectors reset",
      fail: "No custom selectors for the current page"
    }
  }, Ja = (0, Fa.debounce)((async e => {
    const t = Ka ? Ga[e].success : Ga[e].fail, n = Ka ? "success" : "warning";
    await Yn(t, {
      type: n
    }), Ka = !1, Ha && (Ha(), Ha = void 0, Va = void 0);
  }), 200);
  async function Ya(e, t, r) {
    (await Wa("customSelectors", (async a => {
      if ("store" === e) {
        if (!r) throw new Error("No selectors provided to store");
        return a.push(...r), r;
      }
      if ("reset" === e) {
        const e = a.filter((({pattern: e}) => new RegExp(e).test(t))) ?? [];
        return Da(a, (({pattern: e}) => !new RegExp(e).test(t))), e ?? [];
      }
      return n(Ba)(e);
    }))).length > 0 && (Ka = !0), await Ja(e), Va || (Va = new Promise((e => {
      Ha = e;
    }))), await Va;
  }
  async function Qa(e, t) {
    await Ya("store", e, t);
  }
  async function Xa(e) {
    await Ya("reset", e);
  }
  async function ei(e, t) {
    return Wa("references", (n => {
      n.get(e)?.delete(t);
    }));
  }
  n(s).contextMenus.onClicked.addListener((async function({menuItemId: e}) {
    if ("keyboard-clicking" === e && await sr(), "settings" === e && await n(s).runtime.openOptionsPage(), 
    "help" === e && await n(s).tabs.create({
      url: "https://rango.click"
    }), "add-keys-to-exclude" === e) {
      const e = await kn("keysToExclude"), t = await Rn(), r = t.url && or(t.url);
      !(r && e.find((([e]) => e === r)) || void 0) && r && (e.push([ r, "" ]), await bn("keysToExclude", e)), 
      await n(s).runtime.openOptionsPage();
    }
  })), (async () => {
    await _r();
  })(), n(s).runtime.onMessage.addListener((async function(e, t) {
    On(t.tab);
    const r = t.tab.id, a = await n(s).windows.getLastFocused(), i = t.tab.active && t.tab.windowId === a.id, o = await Ln();
    On(r);
    const c = t.frameId ?? 0;
    switch (e.type) {
     case "initStack":
      return 0 !== c ? void console.warn("Ignoring request to initiate stack that doesn't come from the main frame") : Dn(r);

     case "claimHints":
      return Vn(r, c, e.amount);

     case "reclaimHintsFromOtherFrames":
      return Hn(r, c, e.amount);

     case "releaseHints":
      return Gn(r, e.hints);

     case "storeHintsInFrame":
      return Kn(r, c, e.hints);

     case "getHintsStackForTab":
      return Wn(r, (async e => e));

     case "openInNewTab":
      await $a([ e.url ], !0);
      break;

     case "openInBackgroundTab":
      await $a(e.links, !1);
      break;

     case "getContentScriptContext":
      return {
        tabId: r,
        frameId: c,
        currentTabId: o
      };

     case "clickHintInFrame":
      await tr({
        type: "clickElement",
        target: [ e.hint ]
      });
      break;

     case "markHintsAsKeyboardReachable":
      await tr({
        type: "markHintsAsKeyboardReachable",
        letter: e.letter
      }, r);
      break;

     case "restoreKeyboardReachableHints":
      await tr({
        type: "restoreKeyboardReachableHints"
      }, r);
      break;

     case "isCurrentTab":
      return i;

     case "getTabMarker":
      return fr(r);

     case "storeCustomSelectors":
      await Qa(e.url, e.selectors);
      break;

     case "resetCustomSelectors":
      return Xa(e.url);

     case "removeReference":
      return ei(e.hostPattern, e.name);

     default:
      throw console.error(e), new Error("Bad request to background script");
    }
  })), ar.onClicked.addListener((async () => {
    await xr();
  })), n(s).commands.onCommand.addListener((async e => {
    try {
      await tr({
        type: "allowToastNotification"
      });
    } catch {}
    "get-talon-request" !== e && "get-talon-request-alternative" !== e || await za(), 
    "toggle-hints" === e && await xr(), "disable-hints" === e && await kr("global", !1), 
    "enable-hints" === e && await kr("global", !0), "toggle-keyboard-clicking" === e && await sr();
  }));
})();