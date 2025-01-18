var H = Object.defineProperty;
var z = (g, e, n) => e in g ? H(g, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : g[e] = n;
var k = (g, e, n) => z(g, typeof e != "symbol" ? e + "" : e, n);
import { E as N, G as T, H as G } from "./esm-index-C1muFETj.js";
var Z = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function V(g) {
  return g && g.__esModule && Object.prototype.hasOwnProperty.call(g, "default") ? g.default : g;
}
var _ = { exports: {} };
(function(g, e) {
  (function(n, m) {
    m(g);
  })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Z, function(n) {
    if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id))
      throw new Error("This script should only be loaded in a browser extension.");
    if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)
      n.exports = globalThis.browser;
    else {
      const m = "The message port closed before a response was received.", h = (o) => {
        const A = {
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
        if (Object.keys(A).length === 0)
          throw new Error("api-metadata.json has not been included in browser-polyfill");
        class p extends WeakMap {
          constructor(s, i = void 0) {
            super(i), this.createItem = s;
          }
          get(s) {
            return this.has(s) || this.set(s, this.createItem(s)), super.get(s);
          }
        }
        const E = (r) => r && typeof r == "object" && typeof r.then == "function", y = (r, s) => (...i) => {
          o.runtime.lastError ? r.reject(new Error(o.runtime.lastError.message)) : s.singleCallbackArg || i.length <= 1 && s.singleCallbackArg !== !1 ? r.resolve(i[0]) : r.resolve(i);
        }, C = (r) => r == 1 ? "argument" : "arguments", O = (r, s) => function(a, ...c) {
          if (c.length < s.minArgs)
            throw new Error(`Expected at least ${s.minArgs} ${C(s.minArgs)} for ${r}(), got ${c.length}`);
          if (c.length > s.maxArgs)
            throw new Error(`Expected at most ${s.maxArgs} ${C(s.maxArgs)} for ${r}(), got ${c.length}`);
          return new Promise((u, d) => {
            if (s.fallbackToNoCallback)
              try {
                a[r](...c, y({
                  resolve: u,
                  reject: d
                }, s));
              } catch (t) {
                console.warn(`${r} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, t), a[r](...c), s.fallbackToNoCallback = !1, s.noCallback = !0, u();
              }
            else s.noCallback ? (a[r](...c), u()) : a[r](...c, y({
              resolve: u,
              reject: d
            }, s));
          });
        }, $ = (r, s, i) => new Proxy(s, {
          apply(a, c, u) {
            return i.call(c, r, ...u);
          }
        });
        let M = Function.call.bind(Object.prototype.hasOwnProperty);
        const S = (r, s = {}, i = {}) => {
          let a = /* @__PURE__ */ Object.create(null), c = {
            has(d, t) {
              return t in r || t in a;
            },
            get(d, t, x) {
              if (t in a)
                return a[t];
              if (!(t in r))
                return;
              let l = r[t];
              if (typeof l == "function")
                if (typeof s[t] == "function")
                  l = $(r, r[t], s[t]);
                else if (M(i, t)) {
                  let w = O(t, i[t]);
                  l = $(r, r[t], w);
                } else
                  l = l.bind(r);
              else if (typeof l == "object" && l !== null && (M(s, t) || M(i, t)))
                l = S(l, s[t], i[t]);
              else if (M(i, "*"))
                l = S(l, s[t], i["*"]);
              else
                return Object.defineProperty(a, t, {
                  configurable: !0,
                  enumerable: !0,
                  get() {
                    return r[t];
                  },
                  set(w) {
                    r[t] = w;
                  }
                }), l;
              return a[t] = l, l;
            },
            set(d, t, x, l) {
              return t in a ? a[t] = x : r[t] = x, !0;
            },
            defineProperty(d, t, x) {
              return Reflect.defineProperty(a, t, x);
            },
            deleteProperty(d, t) {
              return Reflect.deleteProperty(a, t);
            }
          }, u = Object.create(r);
          return new Proxy(u, c);
        }, P = (r) => ({
          addListener(s, i, ...a) {
            s.addListener(r.get(i), ...a);
          },
          hasListener(s, i) {
            return s.hasListener(r.get(i));
          },
          removeListener(s, i) {
            s.removeListener(r.get(i));
          }
        }), W = new p((r) => typeof r != "function" ? r : function(i) {
          const a = S(i, {}, {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          r(a);
        }), U = new p((r) => typeof r != "function" ? r : function(i, a, c) {
          let u = !1, d, t = new Promise((v) => {
            d = function(f) {
              u = !0, v(f);
            };
          }), x;
          try {
            x = r(i, a, d);
          } catch (v) {
            x = Promise.reject(v);
          }
          const l = x !== !0 && E(x);
          if (x !== !0 && !l && !u)
            return !1;
          const w = (v) => {
            v.then((f) => {
              c(f);
            }, (f) => {
              let F;
              f && (f instanceof Error || typeof f.message == "string") ? F = f.message : F = "An unexpected error occurred", c({
                __mozWebExtensionPolyfillReject__: !0,
                message: F
              });
            }).catch((f) => {
              console.error("Failed to send onMessage rejected reply", f);
            });
          };
          return w(l ? x : t), !0;
        }), q = ({
          reject: r,
          resolve: s
        }, i) => {
          o.runtime.lastError ? o.runtime.lastError.message === m ? s() : r(new Error(o.runtime.lastError.message)) : i && i.__mozWebExtensionPolyfillReject__ ? r(new Error(i.message)) : s(i);
        }, L = (r, s, i, ...a) => {
          if (a.length < s.minArgs)
            throw new Error(`Expected at least ${s.minArgs} ${C(s.minArgs)} for ${r}(), got ${a.length}`);
          if (a.length > s.maxArgs)
            throw new Error(`Expected at most ${s.maxArgs} ${C(s.maxArgs)} for ${r}(), got ${a.length}`);
          return new Promise((c, u) => {
            const d = q.bind(null, {
              resolve: c,
              reject: u
            });
            a.push(d), i.sendMessage(...a);
          });
        }, D = {
          devtools: {
            network: {
              onRequestFinished: P(W)
            }
          },
          runtime: {
            onMessage: P(U),
            onMessageExternal: P(U),
            sendMessage: L.bind(null, "sendMessage", {
              minArgs: 1,
              maxArgs: 3
            })
          },
          tabs: {
            sendMessage: L.bind(null, "sendMessage", {
              minArgs: 2,
              maxArgs: 3
            })
          }
        }, R = {
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
        return A.privacy = {
          network: {
            "*": R
          },
          services: {
            "*": R
          },
          websites: {
            "*": R
          }
        }, S(o, D, A);
      };
      n.exports = h(chrome);
    }
  });
})(_);
var K = _.exports;
const b = /* @__PURE__ */ V(K), j = (g, e) => {
  const n = document.createElement("link");
  n.setAttribute("href", g), n.setAttribute("rel", "stylesheet"), n.setAttribute("charset", "utf-8"), e.appendChild(n);
}, I = /* @__PURE__ */ new Map(), J = (g, e = "closed") => {
  const n = document.createElement("div");
  return n.id = g, {
    shadowRootElement: n,
    shadowRoot: n.attachShadow({
      mode: e
    })
  };
}, Q = (g) => {
  const e = I.get(g);
  if (e)
    return e;
  const n = J(
    g,
    // If mount point ID has been explicitly set, it means we need to access to
    // shadow dom structure (for E2E tests for example)
    "closed"
  );
  return I.set(g, n), n;
};
content;
class X {
  constructor() {
    k(this, "version");
    k(this, "messageHandlers", []);
    k(this, "eventBus", null);
    this.version = b.runtime.getManifest().version;
  }
  getPublishTarget() {
    return this.eventBus;
  }
  setPublishTarget(e) {
    this.eventBus = e;
  }
  addMessageHandler(e) {
    this.messageHandlers.push(e);
  }
  listen() {
    b.runtime.onMessage.addListener(
      async (e, n) => {
        var h;
        if (!N(e)) {
          e !== "reload" && console.error("Unknown runtime message format", e, n);
          return;
        }
        if (e.version !== this.version) {
          console.warn(
            "Unknown messaging runtime version, skipping message handling",
            e.type,
            T({ message: e }, "<redacted>")
          );
          return;
        }
        (h = this.eventBus) == null || h.publish({
          type: "messageReceived",
          details: { message: e }
        });
        let m;
        try {
          const o = await Promise.all(
            this.messageHandlers.map(async (p) => {
              var E, y;
              return p.handleMessage(e, {
                frameId: n.frameId,
                tabId: (E = n.tab) == null ? void 0 : E.id,
                id: n.id,
                url: n.url ?? ((y = n.tab) == null ? void 0 : y.url)
              });
            })
          ), A = o.filter((p) => p !== void 0);
          A.length > 1 && console.error(
            new Error("More than one message handler returned a reply"),
            e.type,
            T({ results: o }, "<redacted>")
          ), m = A.pop();
        } catch (o) {
          let A;
          console.debug(
            "Message handler error",
            e.type,
            T({ message: e, sender: n }, "<redacted>")
          ), console.error(o), typeof o == "object" && o !== null && o instanceof Error ? A = {
            name: o.name,
            message: o.message,
            stack: o.stack
          } : A = {
            name: "Error",
            message: typeof o == "string" ? o : "Unserializable message handler error",
            stack: new Error().stack
          }, m = {
            type: "error",
            inReplyTo: e.id ?? "",
            payload: A
          };
        }
        return m !== void 0 && (m.version = this.version, m.id = Math.random().toString()), m;
      }
    );
  }
  async sendMessage(e, n) {
    var h;
    if (e.version = this.version, e.id = Math.random().toString(), (n == null ? void 0 : n.tabId) === 0) {
      const o = await b.tabs.query({
        currentWindow: !0,
        active: !0
      });
      n.tabId = ((h = o[0]) == null ? void 0 : h.id) ?? 0;
    }
    const m = Promise.race([
      // timeout promise
      new Promise((o, A) => {
        setTimeout(
          () => {
            A(
              new Error(
                `Runtime message response timeout exceeded (${e.type} #${e.id ?? ""})`
              )
            );
          },
          (n == null ? void 0 : n.responseWaitDurationInMs) ?? 8e3
        );
      }),
      // sendMessage promise
      (n == null ? void 0 : n.tabId) === void 0 ? (
        // send to background
        b.runtime.sendMessage(e)
      ) : (
        // send to one tab
        b.tabs.sendMessage(n.tabId, e, {
          frameId: n.frameId
        })
      )
    ]);
    return console.debug(
      "Sent runtime message of type",
      e.type,
      T({ message: e, options: n }, "<redacted>")
    ), await m;
  }
  async sendMessageWithReply(e, n) {
    const m = await this.sendMessage(e, n);
    if (!N(m) || m.inReplyTo !== e.id || m.version !== e.version)
      throw console.debug(
        "Invalid runtime message reply",
        e.type,
        T({ message: e, reply: m }, "<redacted>")
      ), new Error(
        `Invalid runtime message reply (${e.type} #${e.id ?? ""})`
      );
    if (G(m, "error"))
      throw m.payload;
    return m;
  }
}
content;
const B = (g) => [...Array(g)].map(() => (~~(Math.random() * 36)).toString(36)).join("");
content;
class re {
  constructor() {
    k(this, "messagingService");
    this.messagingService = new X();
  }
  initEnvironment() {
    !this.getCurrentUrl().startsWith("http:") && !this.getCurrentUrl().startsWith("https:") || j(
      this.getFileUrl("/assets/injector.css"),
      document.head
    );
  }
  getCurrentUrl() {
    return location.href;
  }
  getMessagingService() {
    return this.messagingService;
  }
  getFileUrl(e) {
    return b.runtime.getURL(`/${e.replace(/^\//, "")}`);
  }
  getPageUrl(e) {
    return {
      changelog: this.getFileUrl("changelog.html"),
      onboarding: this.getFileUrl("onboarding.html"),
      options: this.getFileUrl("options.html"),
      "privacy-policy": this.getFileUrl("privacy-policy.html")
    }[e];
  }
  getVersion() {
    return b.runtime.getManifest().version;
  }
  createAppMountPoint(e, n) {
    const m = (n ?? "") || `a${B(9)}`, { shadowRoot: h, shadowRootElement: o } = Q(m);
    e.appendChild(o);
    const A = document.createElement("div");
    return A.id = `a${B(9)}`, A.classList.add("o-plpExtension"), h.appendChild(A), j(
      this.getFileUrl("/content-scripts/esm/style.css"),
      h
    ), {
      rootElement: o,
      mountPointElement: A
    };
  }
}
content;
export {
  re as ExtensionForegroundRuntime
};
content;
