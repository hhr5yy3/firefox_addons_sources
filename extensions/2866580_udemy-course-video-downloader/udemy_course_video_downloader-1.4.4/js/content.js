(() => {
    var e = {
        989: (e, t, n) => {
            "use strict";
            "undefined" == typeof window ? t.browser = {} : t.browser = n(369);
        },
        675: function(e, t) {
            var n, s, r;
            "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self, 
            s = [ e ], n = function(e) {
                "use strict";
                if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) throw new Error("This script should only be loaded in a browser extension.");
                if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id) e.exports = globalThis.browser; else {
                    const t = "The message port closed before a response was received.", n = e => {
                        const n = {
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
                        if (0 === Object.keys(n).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
                        class s extends WeakMap {
                            constructor(e, t = void 0) {
                                super(t), this.createItem = e;
                            }
                            get(e) {
                                return this.has(e) || this.set(e, this.createItem(e)), super.get(e);
                            }
                        }
                        const r = e => e && "object" == typeof e && "function" == typeof e.then, o = (t, n) => (...s) => {
                            e.runtime.lastError ? t.reject(new Error(e.runtime.lastError.message)) : n.singleCallbackArg || s.length <= 1 && !1 !== n.singleCallbackArg ? t.resolve(s[0]) : t.resolve(s);
                        }, i = e => 1 == e ? "argument" : "arguments", a = (e, t) => function(n, ...s) {
                            if (s.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${i(t.minArgs)} for ${e}(), got ${s.length}`);
                            if (s.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${i(t.maxArgs)} for ${e}(), got ${s.length}`);
                            return new Promise(((r, i) => {
                                if (t.fallbackToNoCallback) try {
                                    n[e](...s, o({
                                        resolve: r,
                                        reject: i
                                    }, t));
                                } catch (o) {
                                    console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, o), 
                                    n[e](...s), t.fallbackToNoCallback = !1, t.noCallback = !0, r();
                                } else t.noCallback ? (n[e](...s), r()) : n[e](...s, o({
                                    resolve: r,
                                    reject: i
                                }, t));
                            }));
                        }, l = (e, t, n) => new Proxy(t, {
                            apply: (t, s, r) => n.call(s, e, ...r)
                        });
                        let d = Function.call.bind(Object.prototype.hasOwnProperty);
                        const g = (e, t = {}, n = {}) => {
                            let s = Object.create(null), r = {
                                has: (t, n) => n in e || n in s,
                                get(r, o, i) {
                                    if (o in s) return s[o];
                                    if (!(o in e)) return;
                                    let c = e[o];
                                    if ("function" == typeof c) if ("function" == typeof t[o]) c = l(e, e[o], t[o]); else if (d(n, o)) {
                                        let t = a(o, n[o]);
                                        c = l(e, e[o], t);
                                    } else c = c.bind(e); else if ("object" == typeof c && null !== c && (d(t, o) || d(n, o))) c = g(c, t[o], n[o]); else {
                                        if (!d(n, "*")) return Object.defineProperty(s, o, {
                                            configurable: !0,
                                            enumerable: !0,
                                            get: () => e[o],
                                            set(t) {
                                                e[o] = t;
                                            }
                                        }), c;
                                        c = g(c, t[o], n["*"]);
                                    }
                                    return s[o] = c, c;
                                },
                                set: (t, n, r, o) => (n in s ? s[n] = r : e[n] = r, !0),
                                defineProperty: (e, t, n) => Reflect.defineProperty(s, t, n),
                                deleteProperty: (e, t) => Reflect.deleteProperty(s, t)
                            }, o = Object.create(e);
                            return new Proxy(o, r);
                        }, c = e => ({
                            addListener(t, n, ...s) {
                                t.addListener(e.get(n), ...s);
                            },
                            hasListener: (t, n) => t.hasListener(e.get(n)),
                            removeListener(t, n) {
                                t.removeListener(e.get(n));
                            }
                        }), m = new s((e => "function" != typeof e ? e : function(t) {
                            const n = g(t, {}, {
                                getContent: {
                                    minArgs: 0,
                                    maxArgs: 0
                                }
                            });
                            e(n);
                        })), u = new s((e => "function" != typeof e ? e : function(t, n, s) {
                            let o, i, a = !1, l = new Promise((e => {
                                o = function(t) {
                                    a = !0, e(t);
                                };
                            }));
                            try {
                                i = e(t, n, o);
                            } catch (e) {
                                i = Promise.reject(e);
                            }
                            const d = !0 !== i && r(i);
                            if (!0 !== i && !d && !a) return !1;
                            const g = e => {
                                e.then((e => {
                                    s(e);
                                }), (e => {
                                    let t;
                                    t = e && (e instanceof Error || "string" == typeof e.message) ? e.message : "An unexpected error occurred", 
                                    s({
                                        __mozWebExtensionPolyfillReject__: !0,
                                        message: t
                                    });
                                })).catch((e => {
                                    console.error("Failed to send onMessage rejected reply", e);
                                }));
                            };
                            return g(d ? i : l), !0;
                        })), A = ({reject: n, resolve: s}, r) => {
                            e.runtime.lastError ? e.runtime.lastError.message === t ? s() : n(new Error(e.runtime.lastError.message)) : r && r.__mozWebExtensionPolyfillReject__ ? n(new Error(r.message)) : s(r);
                        }, p = (e, t, n, ...s) => {
                            if (s.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${i(t.minArgs)} for ${e}(), got ${s.length}`);
                            if (s.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${i(t.maxArgs)} for ${e}(), got ${s.length}`);
                            return new Promise(((e, t) => {
                                const r = A.bind(null, {
                                    resolve: e,
                                    reject: t
                                });
                                s.push(r), n.sendMessage(...s);
                            }));
                        }, h = {
                            devtools: {
                                network: {
                                    onRequestFinished: c(m)
                                }
                            },
                            runtime: {
                                onMessage: c(u),
                                onMessageExternal: c(u),
                                sendMessage: p.bind(null, "sendMessage", {
                                    minArgs: 1,
                                    maxArgs: 3
                                })
                            },
                            tabs: {
                                sendMessage: p.bind(null, "sendMessage", {
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
                        return n.privacy = {
                            network: {
                                "*": y
                            },
                            services: {
                                "*": y
                            },
                            websites: {
                                "*": y
                            }
                        }, g(e, h, n);
                    };
                    e.exports = n(chrome);
                }
            }, void 0 === (r = "function" == typeof n ? n.apply(t, s) : n) || (e.exports = r);
        },
        369: function(e, t) {
            var n, s, r;
            "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self, 
            s = [ e ], n = function(e) {
                "use strict";
                if ("undefined" == typeof browser || Object.getPrototypeOf(browser) !== Object.prototype) {
                    const t = "The message port closed before a response was received.", n = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)", s = e => {
                        const s = {
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
                        if (0 === Object.keys(s).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
                        class r extends WeakMap {
                            constructor(e, t = void 0) {
                                super(t), this.createItem = e;
                            }
                            get(e) {
                                return this.has(e) || this.set(e, this.createItem(e)), super.get(e);
                            }
                        }
                        const o = e => e && "object" == typeof e && "function" == typeof e.then, i = (t, n) => (...s) => {
                            e.runtime.lastError ? t.reject(e.runtime.lastError) : n.singleCallbackArg || s.length <= 1 && !1 !== n.singleCallbackArg ? t.resolve(s[0]) : t.resolve(s);
                        }, a = e => 1 == e ? "argument" : "arguments", l = (e, t) => function(n, ...s) {
                            if (s.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${a(t.minArgs)} for ${e}(), got ${s.length}`);
                            if (s.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${a(t.maxArgs)} for ${e}(), got ${s.length}`);
                            return new Promise(((r, o) => {
                                if (t.fallbackToNoCallback) try {
                                    n[e](...s, i({
                                        resolve: r,
                                        reject: o
                                    }, t));
                                } catch (o) {
                                    console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, o), 
                                    n[e](...s), t.fallbackToNoCallback = !1, t.noCallback = !0, r();
                                } else t.noCallback ? (n[e](...s), r()) : n[e](...s, i({
                                    resolve: r,
                                    reject: o
                                }, t));
                            }));
                        }, d = (e, t, n) => new Proxy(t, {
                            apply: (t, s, r) => n.call(s, e, ...r)
                        });
                        let g = Function.call.bind(Object.prototype.hasOwnProperty);
                        const c = (e, t = {}, n = {}) => {
                            let s = Object.create(null), r = {
                                has: (t, n) => n in e || n in s,
                                get(r, o, i) {
                                    if (o in s) return s[o];
                                    if (!(o in e)) return;
                                    let a = e[o];
                                    if ("function" == typeof a) if ("function" == typeof t[o]) a = d(e, e[o], t[o]); else if (g(n, o)) {
                                        let t = l(o, n[o]);
                                        a = d(e, e[o], t);
                                    } else a = a.bind(e); else if ("object" == typeof a && null !== a && (g(t, o) || g(n, o))) a = c(a, t[o], n[o]); else {
                                        if (!g(n, "*")) return Object.defineProperty(s, o, {
                                            configurable: !0,
                                            enumerable: !0,
                                            get: () => e[o],
                                            set(t) {
                                                e[o] = t;
                                            }
                                        }), a;
                                        a = c(a, t[o], n["*"]);
                                    }
                                    return s[o] = a, a;
                                },
                                set: (t, n, r, o) => (n in s ? s[n] = r : e[n] = r, !0),
                                defineProperty: (e, t, n) => Reflect.defineProperty(s, t, n),
                                deleteProperty: (e, t) => Reflect.deleteProperty(s, t)
                            }, o = Object.create(e);
                            return new Proxy(o, r);
                        }, m = e => ({
                            addListener(t, n, ...s) {
                                t.addListener(e.get(n), ...s);
                            },
                            hasListener: (t, n) => t.hasListener(e.get(n)),
                            removeListener(t, n) {
                                t.removeListener(e.get(n));
                            }
                        });
                        let u = !1;
                        const A = new r((e => "function" != typeof e ? e : function(t, s, r) {
                            let i, a, l = !1, d = new Promise((e => {
                                i = function(t) {
                                    u || (console.warn(n, (new Error).stack), u = !0), l = !0, e(t);
                                };
                            }));
                            try {
                                a = e(t, s, i);
                            } catch (e) {
                                a = Promise.reject(e);
                            }
                            const g = !0 !== a && o(a);
                            if (!0 !== a && !g && !l) return !1;
                            const c = e => {
                                e.then((e => {
                                    r(e);
                                }), (e => {
                                    let t;
                                    t = e && (e instanceof Error || "string" == typeof e.message) ? e.message : "An unexpected error occurred", 
                                    r({
                                        __mozWebExtensionPolyfillReject__: !0,
                                        message: t
                                    });
                                })).catch((e => {
                                    console.error("Failed to send onMessage rejected reply", e);
                                }));
                            };
                            return c(g ? a : d), !0;
                        })), p = ({reject: n, resolve: s}, r) => {
                            e.runtime.lastError ? e.runtime.lastError.message === t ? s() : n(e.runtime.lastError) : r && r.__mozWebExtensionPolyfillReject__ ? n(new Error(r.message)) : s(r);
                        }, h = (e, t, n, ...s) => {
                            if (s.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${a(t.minArgs)} for ${e}(), got ${s.length}`);
                            if (s.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${a(t.maxArgs)} for ${e}(), got ${s.length}`);
                            return new Promise(((e, t) => {
                                const r = p.bind(null, {
                                    resolve: e,
                                    reject: t
                                });
                                s.push(r), n.sendMessage(...s);
                            }));
                        }, y = {
                            runtime: {
                                onMessage: m(A),
                                onMessageExternal: m(A),
                                sendMessage: h.bind(null, "sendMessage", {
                                    minArgs: 1,
                                    maxArgs: 3
                                })
                            },
                            tabs: {
                                sendMessage: h.bind(null, "sendMessage", {
                                    minArgs: 2,
                                    maxArgs: 3
                                })
                            }
                        }, f = {
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
                        return s.privacy = {
                            network: {
                                "*": f
                            },
                            services: {
                                "*": f
                            },
                            websites: {
                                "*": f
                            }
                        }, c(e, y, s);
                    };
                    if ("object" != typeof chrome || !chrome || !chrome.runtime || !chrome.runtime.id) throw new Error("This script should only be loaded in a browser extension.");
                    e.exports = s(chrome);
                } else e.exports = browser;
            }, void 0 === (r = "function" == typeof n ? n.apply(t, s) : n) || (e.exports = r);
        }
    }, t = {};
    function n(s) {
        var r = t[s];
        if (void 0 !== r) return r.exports;
        var o = t[s] = {
            exports: {}
        };
        return e[s].call(o.exports, o, o.exports, n), o.exports;
    }
    n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t;
    }, n.d = (e, t) => {
        for (var s in t) n.o(t, s) && !n.o(e, s) && Object.defineProperty(e, s, {
            enumerable: !0,
            get: t[s]
        });
    }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        "use strict";
        function e(e, t, n, s) {
            var r, o = arguments.length, i = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, n) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, n, s); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (i = (o < 3 ? r(i) : o > 3 ? r(t, n, i) : r(t, n)) || i);
            return o > 3 && i && Object.defineProperty(t, n, i), i;
        }
        function t(e, t, n, s) {
            return new (n || (n = Promise))((function(r, o) {
                function i(e) {
                    try {
                        l(s.next(e));
                    } catch (e) {
                        o(e);
                    }
                }
                function a(e) {
                    try {
                        l(s.throw(e));
                    } catch (e) {
                        o(e);
                    }
                }
                function l(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t);
                    }))).then(i, a);
                }
                l((s = s.apply(e, t || [])).next());
            }));
        }
        Object.create;
        Object.create;
        "function" == typeof SuppressedError && SuppressedError;
        var s = n(675), r = n.n(s);
        class o {
            constructor() {
                this.subscribers = [];
            }
            subscribe(e) {
                return this.subscribers.includes(e) || this.subscribers.push(e), new a(e, this.subscribers);
            }
            emit(e = null) {
                for (const t of this.subscribers) t(e);
            }
        }
        class i {
            constructor() {
                this.subscribers = {};
            }
            on(e, t) {
                e in this.subscribers || (this.subscribers[e] = []);
                const n = this.subscribers[e];
                return n.includes(t) || n.push(t), new a(t, this.subscribers[e]);
            }
            emit(e, t = null) {
                if (e in this.subscribers) for (const n of this.subscribers[e]) n(t);
            }
        }
        class a {
            constructor(e, t) {
                this.callback = e, this.subscribers = t;
            }
            unsubscribe() {
                this.subscribers.includes(this.callback) && this.subscribers.splice(this.subscribers.findIndex((e => e === this.callback)), 1);
            }
        }
        let l = class extends o {
            constructor() {
                super(), this.timeout = null, this.mutationObserver = new MutationObserver(this.changeCallback.bind(this));
            }
            disconnect() {
                this.mutationObserver.disconnect();
            }
            observe() {
                this.mutationObserver.observe(document.body, {
                    childList: !0,
                    subtree: !0
                });
            }
            takeRecords() {
                return this.mutationObserver.takeRecords();
            }
            changeCallback() {
                this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout((() => {
                    this.emit(null);
                }), 100);
            }
        };
        var d;
        l = e([ I ], l);
        let g = d = class {
            constructor() {
                this.subscription = {
                    unsubscribe: () => null
                };
            }
            init() {
                this.subscription = d.observer.subscribe(this.reinitialize.bind(this)), this.createDownloadButton();
            }
            remove(e) {
                this.subscription.unsubscribe();
                Array.from(document.querySelectorAll(e)).forEach((e => {
                    try {
                        e.remove();
                    } catch (e) {}
                }));
            }
            getAccountName(e, t) {
                let n;
                try {
                    n = e.querySelector(t).innerText;
                } catch (e) {
                    n = "no_account_found";
                }
                return n;
            }
        };
        var c, m, u, A, p, h, y, f, w, x;
        g.observer = new l, e([ _ ], g.prototype, "init", null), e([ _ ], g.prototype, "remove", null), 
        g = d = e([ N ], g), function(e) {
            e[e.pre = 0] = "pre", e[e.after = 1] = "after", e[e.getExtDrmKey = 2] = "getExtDrmKey";
        }(c || (c = {})), function(e) {
            e[e.single = 0] = "single", e[e.bulk = 1] = "bulk", e[e.bloburl = 2] = "bloburl", 
            e[e.changeUrl = 3] = "changeUrl", e[e.login = 4] = "login", e[e.googleLogin = 5] = "googleLogin", 
            e[e.register = 6] = "register", e[e.sendEmailCode = 7] = "sendEmailCode", e[e.getDrmSecretKey = 8] = "getDrmSecretKey", 
            e[e.getConfig = 9] = "getConfig";
        }(m || (m = {})), function(e) {
            e[e.goSubscribe = 0] = "goSubscribe", e[e.pureNotice = 1] = "pureNotice", e[e.drmLicense = 2] = "drmLicense";
        }(u || (u = {})), function(e) {
            e[e.Edge = 0] = "Edge", e[e.Chrome = 1] = "Chrome", e[e.Firefox = 2] = "Firefox", 
            e[e.Opera = 3] = "Opera", e[e.Safari = 4] = "Safari", e[e.Unknown = 5] = "Unknown";
        }(A || (A = {})), function(e) {
            e.default = "log", e.warn = "warn", e.error = "error";
        }(p || (p = {})), function(e) {
            e.install = "install", e.uninstall = "uninstall", e.downloadSignalUnkown = "downloadSignalUnkown", 
            e.downloadSignalImg = "downloadSignalImg", e.downloadSignalVideo = "downloadSignalVideo", 
            e.downloadBulk = "downloadBulk", e.changeUrl = "changeUrl", e.register = "register", 
            e.login = "login", e.googleLogin = "googleLogin", e.sendEmailCode = "sendEmailCode", 
            e.uploadFiles = "uploadFiles", e.concatVideoAndAudio = "concatVideoAndAudio";
        }(h || (h = {})), function(e) {
            e.downloadSuccess = "downloadSuccess", e.downloadError = "downloadError";
        }(y || (y = {})), function(e) {
            e.addOrUpdateDownloadingInfo = "addOrUpdateDownloadingInfo", e.updateDownloadStatus = "updateDownloadStatus";
        }(f || (f = {})), function(e) {
            e[e.refresh = 0] = "refresh";
        }(w || (w = {})), function(e) {
            e.downloading = "downloading", e.downloaded = "downloaded", e.all = "all";
        }(x || (x = {}));
        const b = "udemyDownloadingInfo", v = "udemyDownloadedInfo", k = [ "udemy.com", "udemybusiness" ];
        function E(e) {
            return new Promise((t => setTimeout(t, e)));
        }
        function L(e) {
            return r().storage.local.get(e).then((t => t[e]));
        }
        function T(e, t) {
            return r().storage.local.set({
                [e]: t
            });
        }
        function S() {
            return t(this, void 0, void 0, (function*() {
                let e = !1;
                if (!(yield L("UdemyDownloaderUserInfo")).email) {
                    let n = yield M();
                    (yield function() {
                        return t(this, void 0, void 0, (function*() {
                            let e = 0;
                            return yield r().storage.local.get([ "downloadDate", "downloadCount" ]).then((t => {
                                const n = (new Date).toISOString().split("T")[0];
                                t.downloadDate !== n ? r().storage.local.set({
                                    downloadDate: n,
                                    downloadCount: 0
                                }) : e = t.downloadCount;
                            })), e;
                        }));
                    }()) >= n && (e = !0);
                }
                return e;
            }));
        }
        function C() {
            r().storage.local.get("downloadCount").then((e => {
                const t = (e.downloadCount || 0) + 1;
                r().storage.local.set({
                    downloadCount: t
                });
            }));
        }
        function M() {
            return t(this, void 0, void 0, (function*() {
                let e = 1;
                try {
                    e = yield L("downloadLimit"), e || (e = 1);
                } catch (t) {
                    console.log(t), e = 1;
                }
                return e;
            }));
        }
        function B(e) {
            return t(this, void 0, void 0, (function*() {
                let n = !1;
                try {
                    let s = yield function(e) {
                        return t(this, void 0, void 0, (function*() {
                            let t = yield L(e);
                            if (t) {
                                const n = (new Date).getTime();
                                return t.expiration && n > t.expiration ? (yield r().storage.local.remove([ e ]), 
                                null) : t.value;
                            }
                            return null;
                        }));
                    }("enableRecordUrl");
                    if (null == s) {
                        let o = {
                            courseName: "enableRecordUrl.udemy",
                            type: m.getConfig
                        };
                        s = yield r().runtime.sendMessage(o), ("true" == s || P(e)) && (n = !0), s || (s = "false"), 
                        function(e, n, s) {
                            t(this, void 0, void 0, (function*() {
                                const t = (new Date).getTime(), r = {
                                    value: n,
                                    expiration: t + 60 * s * 1e3
                                };
                                yield T(e, r);
                            }));
                        }("enableRecordUrl", s, 60);
                    } else ("true" == s || P(e)) && (n = !0);
                } catch (e) {
                    console.log(e), n = !1;
                }
                return n;
            }));
        }
        function U() {
            return t(this, void 0, void 0, (function*() {
                let e = "";
                return (yield L("isJumpDiscord")) || (e = '\n            <p class="noticTipP">\n                Connect with more people on Discord to share experiences and get help.\n            </p>\n            <p class="noticButtonP">\n                <a class="noticA">discard</a>\n            </p>\n        '), 
                e;
            }));
        }
        function P(e) {
            return k.some((t => e.includes(t)));
        }
        function I(e) {
            return new Proxy(e, {
                construct: (e, t, n) => e.prototype !== n.prototype ? Reflect.construct(e, t, n) : (e.SINGLETON_INSTANCE || (e.SINGLETON_INSTANCE = Reflect.construct(e, t, n)), 
                e.SINGLETON_INSTANCE)
            });
        }
        function _(e, t, n) {
            const s = n.value;
            n.value = function() {
                g.observer.disconnect(), g.observer.takeRecords(), E(100).then((() => s.apply(this, arguments))), 
                E(150).then((() => g.observer.observe()));
            };
        }
        function N(e) {
            const t = {};
            for (const n of Object.getOwnPropertyNames(e.prototype)) {
                const s = Object.getOwnPropertyDescriptor(e.prototype, n), r = s.value;
                r instanceof Function && "constructor" !== n && (s.value = function(...n) {
                    try {
                        return r.apply(this, n);
                    } catch (n) {
                        if ("Error: Extension context invalidated." === n.toString()) return;
                        const s = encodeURIComponent(`${e.name} ${n.toString()}`);
                        if (t[s]) return;
                        t[s] = !0;
                    }
                }, Object.defineProperty(e.prototype, n, s));
            }
        }
        var D;
        !function(e) {
            e.leftArea = ".app--content-column--LnPGp", e.playArea = ".shaka-control-bar--control-bar--gXZ1u", 
            e.courseTakeing = "ud-component--course-taking--app", e.singleCourseInMyStudy = ".shaka-control-bar--spacer--xEX10", 
            e.postDownloadingBtn = "span.post-saving-btn", e.postDownloadBtn = "span.post-save-btn", 
            e.postDownloadingWhiteBtn = "span.udemy-post-saving-btn-white", e.postDownloadWhiteBtn = "span.udemy-post-save-btn-white", 
            e.selectedVedio = '.curriculum-item-link--curriculum-item--OVP5S.curriculum-item-link--is-current--2mKk4 span[data-purpose="item-title"]', 
            e.rightTop = ".sidebar--sidebar-header--Ohywj", e.rightCloseBtn = ".popper-module--popper--mM5Ie.sidebar--tooltip--mlocI", 
            e.courseTitle = ".header--header-text--zBvgT", e.siderBtn = ".udemy-sider", e.tabBtn = ".carousel-module--scroll-port--ViaiR";
        }(D || (D = {}));
        var F = n(989);
        class j {
            static getCookies() {
                return F.browser.cookies.getAll({
                    url: this.webUrl
                });
            }
            static waitFor(e) {
                return t(this, void 0, void 0, (function*() {
                    new Promise((t => setTimeout(t, e)));
                }));
            }
            static asyncForEach(e, n) {
                return t(this, void 0, void 0, (function*() {
                    yield Promise.all(e.map(((t, s) => n(t, s, e))));
                }));
            }
            static getAllVedios(e) {
                return t(this, void 0, void 0, (function*() {
                    let n = new Array, s = (yield j.getPlayList(e)).results.filter((e => void 0 !== e.asset && "Video" === e.asset.asset_type));
                    return yield j.asyncForEach(s, (s => t(this, void 0, void 0, (function*() {
                        yield j.waitFor(0);
                        const t = yield j.getSingleVideo(e, s.id);
                        let r = "";
                        try {
                            r = t.asset.stream_urls.Video[0].file;
                        } catch (e) {}
                        let o = "";
                        t.asset.media_sources && t.asset.media_sources.length > 0 && (o = t.asset.media_sources[0].src);
                        let i = this.getCaptionUrl(t.asset);
                        n.push({
                            id: s.id,
                            url: r,
                            title: `${s.object_index}. ${s.title}`,
                            isDrmed: t.asset.course_is_drmed,
                            mediaUrl: o,
                            captionUrl: i
                        });
                    })))), {
                        videoArr: n
                    };
                }));
            }
            static getPlayList(e) {
                return t(this, void 0, void 0, (function*() {
                    const t = {
                        url: this.webUrl + "/api-2.0/courses/" + e + "/subscriber-curriculum-items",
                        type: "GET",
                        data: {
                            page_size: "1500",
                            "fields[lecture]": "title,object_index,is_published,sort_order,created,asset,supplementary_assets,is_free",
                            "fields[quiz]": "title,object_index,is_published,sort_order,type",
                            "fields[practice]": "title,object_index,is_published,sort_order",
                            "fields[chapter]": "title,object_index,is_published,sort_order",
                            "fields[asset]": "title,filename,asset_type,status,time_estimation,is_external",
                            caching_intent: "True"
                        }
                    }, n = new URL(t.url);
                    Object.keys(t.data).forEach((e => n.searchParams.append(e, t.data[e])));
                    try {
                        const e = yield fetch(n, {
                            method: t.type,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include"
                        });
                        if (!e.ok) throw new Error(`HTTP error! status: ${e.status}`);
                        return yield e.json();
                    } catch (e) {
                        throw console.error("Error:", e), e;
                    }
                }));
            }
            static getSingleVideo(e, n) {
                return t(this, void 0, void 0, (function*() {
                    const t = new URL(this.webUrl + `/api-2.0/users/me/subscribed-courses/${e}/lectures/${n}`), s = {
                        "fields[lecture]": "asset,description,download_url,is_free,last_watched_second",
                        "fields[asset]": "asset_type,length,media_license_token,course_is_drmed,media_sources,stream_urls,captions,thumbnail_sprite,slides,slide_urls,download_urls,image_125_H"
                    };
                    Object.keys(s).forEach((e => t.searchParams.append(e, s[e])));
                    try {
                        const e = yield fetch(t, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include"
                        });
                        if (!e.ok) throw new Error(`HTTP error! status: ${e.status}`);
                        return yield e.json();
                    } catch (e) {
                        throw console.error("Error fetching video details:", e), e;
                    }
                }));
            }
            static fetchDrmSecretkey(e) {
                return t(this, void 0, void 0, (function*() {
                    return yield fetch(window.udemyFetcher.licenseUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/octet-stream"
                        },
                        credentials: "include",
                        body: Uint8Array.from(atob(e), (e => e.charCodeAt(0)))
                    }).then((e => e.arrayBuffer())).then((e => btoa(String.fromCharCode(...new Uint8Array(e)))));
                }));
            }
            static getDrmSecretKey(e) {
                return t(this, void 0, void 0, (function*() {
                    let t = yield L(e.toString());
                    if (!t) {
                        let n = {
                            type: m.getDrmSecretKey,
                            courseId: e,
                            drmMessage: {
                                pssh: "",
                                stage: c.getExtDrmKey
                            }
                        }, s = yield F.browser.runtime.sendMessage(n);
                        if (s.success && s.data && 0 == s.data.code && s.data.data && s.data.data.drmKey) t = s.data.data.drmKey, 
                        yield T(e.toString(), t); else if (window.udemyFetcher.PSSH) {
                            let n = {
                                type: m.getDrmSecretKey,
                                courseId: e,
                                drmMessage: {
                                    pssh: window.udemyFetcher.PSSH,
                                    stage: c.pre
                                }
                            }, s = yield F.browser.runtime.sendMessage(n);
                            if (s.success) {
                                let n = s.data.session_id, r = s.data.challenge, o = yield this.fetchDrmSecretkey(r), i = {
                                    type: m.getDrmSecretKey,
                                    courseId: e,
                                    drmMessage: {
                                        pssh: window.udemyFetcher.PSSH,
                                        session_id: n,
                                        content: o,
                                        stage: c.after
                                    }
                                }, a = yield F.browser.runtime.sendMessage(i);
                                a.success && (t = a.data.keys.trim(), yield T(e.toString(), t));
                            }
                        }
                    }
                    return t;
                }));
            }
            static getElementsDataModuleArgs(e) {
                const t = document.getElementsByClassName(e);
                return Array.from(t).map((e => {
                    const t = e.getAttribute("data-module-args");
                    try {
                        return JSON.parse(t);
                    } catch (e) {
                        return console.error("Error parsing data-module-args:", e), null;
                    }
                }));
            }
            static getCaptionUrl(e) {
                let t = "";
                if (e.captions) {
                    let n = "";
                    const s = document.querySelectorAll(".control-bar-dropdown--menu--o7N0r [role='menuitemradio'][aria-checked='true'] .ud-block-list-item-content");
                    if (s && s.length > 0) for (let r = 0; r < s.length; r++) {
                        n = s[r].textContent;
                        const o = e.captions.find((e => e.video_label === n));
                        if (t = o ? o.url : "", t && "" != t) break;
                    }
                }
                return t;
            }
        }
        j.webUrl = "https://" + window.location.hostname;
        var O;
        !function(e) {
            function n() {
                const e = document.getElementById("downloadModal");
                e && (e.style.display = "none");
            }
            e.openModalBox = function(e, s) {
                return t(this, void 0, void 0, (function*() {
                    if (P(location.href)) {
                        (() => {
                            var e;
                            null === (e = document.getElementById("downloadModalWrapperid")) || void 0 === e || e.remove();
                            const t = document.createElement("div");
                            t.id = "downloadModalWrapperid", t.innerHTML = '\n    <div class="download-modal-overlay" id="downloadModal">    \n        <div class="downloadModal">\n            <div class="download-modal-header">\n                <span class="download-modal-close" id="download-modal-close">&times;</span>\n            </div>\n            <div class="download-modal-content">\n            </div>\n        </div>\n    </div>\n    ', 
                            document.body.appendChild(t);
                        })();
                        document.querySelector(".download-modal-content").innerHTML = e, document.getElementById("downloadModal").style.display = "flex", 
                        function() {
                            const e = document.getElementById("download-modal-close");
                            e && (e.onclick = () => {
                                n();
                            });
                        }(), s && (yield s());
                    }
                }));
            }, e.closeModal = n;
        }(O || (O = {}));
        var q;
        !function(e) {
            let n;
            const s = () => {
                var e;
                null === (e = document.getElementById("addOnInfoWrapperid")) || void 0 === e || e.remove();
                const t = document.createElement("div");
                return t.id = "addOnInfoWrapperid", t.innerHTML = '\n    <div class="modal" id="modal">\n        <div class="modal-header">\n            <div id="addon-info-title"></div>\n        </div>\n        <div class="modal-content">\n        </div>\n        <div class="modal-footer">            \n        </div>\n    </div>\n    ', 
                document.body.appendChild(t), t;
            };
            function r(e, t, n) {
                const s = document.createElement("button");
                return s.classList.add("btn", e), s.textContent = t, s.addEventListener("click", (function() {
                    null != n && n(), i();
                })), s;
            }
            function o() {
                const e = document.getElementById("modal");
                e.style.display = "block", setTimeout((() => {
                    e.classList.add("show");
                }), 10);
            }
            function i() {
                const e = document.getElementById("modal");
                e.classList.remove("show"), setTimeout((() => {
                    e.style.display = "none", clearInterval(n);
                }), 300);
            }
            e.displayMessage = function(t) {
                P(location.href) && (t.type == u.goSubscribe ? e.openModalWithButton(t.title, t.text, t.mainText, (() => {
                    window.location.href = t.mainUrl;
                }), t.subText, null) : t.type == u.pureNotice && e.openModalWithTimer(t.title, t.text, 10));
            }, e.openModalWithTimer = function(e, r, a = 10) {
                if (P(location.href)) {
                    s();
                    const l = document.getElementById("addon-info-title"), d = document.querySelector(".modal-content"), g = document.querySelector(".modal-footer");
                    clearInterval(n), d.innerHTML = r, g.innerHTML = "", l.innerHTML = e;
                    const c = document.createElement("div");
                    c.id = "countdown", c.textContent = `close in ${a}s`, g.appendChild(c);
                    let m = a;
                    n = setInterval((() => {
                        m <= 0 ? (clearInterval(n), i()) : (c.textContent = `close in ${m}s`, m--);
                    }), 1e3);
                    const u = document.querySelector(".noticButtonP .noticA");
                    u && (u.onclick = () => t(this, void 0, void 0, (function*() {
                        let e = yield L("discordUrl");
                        window.open(e + "", "_blank"), yield T("isJumpDiscord", !0);
                    }))), o();
                }
            }, e.openModalWithButton = function(e, t, i, a, l, d) {
                if (P(location.href)) {
                    s();
                    const g = document.getElementById("addon-info-title"), c = document.querySelector(".modal-content"), m = document.querySelector(".modal-footer");
                    if (clearInterval(n), c.innerHTML = t, m.innerHTML = "", g.innerHTML = e, null != i) {
                        const e = r("btn-wishlist", i, a);
                        m.appendChild(e);
                    }
                    if (null != l) {
                        const e = r("btn-no-thanks", l, d);
                        m.appendChild(e);
                    }
                    o();
                }
            };
        }(q || (q = {}));
        const $ = r().runtime.getURL("assets/imgs/google_favicon.ico"), R = '\n    <div class="google_download_login">    \n        <h2>Please login in to unlock more download video.</h2>\n        <button id="downloadGoogleLoginBtn" class="login-button google-login">\n            <img src="' + $ + '" alt="Google Logo" width="20">\n            Login with Google\n        </button>\n        <div class="or-divider">\n            <p>Or</p>\n        </div>\n        <button id="downloadOtherLogin" class="login-button other-login">\n            Other Login\n        </button>\n        <p class="note">An unauthenticated user can only download {downloadLimit} videos per day.</p>\n    </div>\n', H = '\n    <div class="download_login-container">\n        <h2>Login to your account</h2>\n        <div id="download-from-tip-top" class="download-from-tip top-tip"></div>\n        <div class="form-group">\n            <label for="email">Email</label>\n            <input type="email" id="downloadEmail" placeholder="Enter your email" required>\n        </div>\n        <div id="download-from-tip-email" class="download-from-tip">Email is required</div>\n        <div class="form-group">\n            <label class="password" for="password">\n\t\t\t\tPassword\n\t\t\t\t<a class="forgot-link">Forgot ?</a>\n\t\t\t</label>\n            <input type="password" id="downloadPassword" placeholder="Enter your password" required>\n        </div>\n        <div id="download-from-tip-password" class="download-from-tip">Password is required</div>\n        <button id="downloadOtherLogin" class="login-btn">Login</button>\n        <p class="signup-link">Don\'t have an account? <a id="downloadSignUp">Sign up</a></p>\n        <div class="or-divider">\n        \t<p>Or</p>\n        </div>\n\t\t<div class="google-login">\n            <button id="downloadGoogleLoginBtn">\n\t\t\t\t<img src="' + $ + '" alt="Google Logo" width="20">\n                Login with Google\n            </button>\n        </div>\n    </div>\n', V = '\n    <div class="download_signup-container">\n        <h2>Create an account</h2>\n        <div id="download-from-tip-top" class="download-from-tip top-tip"></div>\n        <div class="form-group">\n            <input type="email" id="downloadEmail" placeholder="Enter your email" required>\n        </div>\n        <div id="download-from-tip-email" class="download-from-tip">Email is required</div>\n        <div class="form-group">\n            <input type="password" id="downloadPassword" placeholder="Enter your password" required>\n        </div>\n        <div id="download-from-tip-password" class="download-from-tip">Password is required</div>\n        <div class="form-group email_verifycode_form">\n            <input type="text" id="downloadEmailVerifycode" class="email_verifycode" placeholder="Enter verify code" required>\n            <button class="send-code" id="downloadSendCode">send</button>\n        </div>\n        <div id="download-from-tip-code" class="download-from-tip">verify code is required</div>\n        <button id="downloadSignUp" class="signup-btn">Sign Up</button>\n        <div class="or-divider">\n        \t<p>Or</p>\n        </div>\n\t\t<div class="google-login">\n            <button id="downloadGoogleLoginBtn">\n\t\t\t\t<img src="' + $ + '" alt="Google Logo" width="20">\n                Login with Google\n            </button>\n        </div>\n    </div>\n';
        var W, K;
        !function(e) {
            function n() {
                O.openModalBox(H, i);
            }
            function s() {
                O.openModalBox(V, a);
            }
            function o() {
                return t(this, void 0, void 0, (function*() {
                    let e = document.querySelector(".google_download_login .google-login");
                    yield e.addEventListener("click", (function() {
                        l();
                    }));
                    let t = document.querySelector(".google_download_login .other-login");
                    yield t.addEventListener("click", (function() {
                        n();
                    }));
                }));
            }
            function i() {
                return t(this, void 0, void 0, (function*() {
                    let e = document.querySelector(".download_login-container .login-btn");
                    yield e.addEventListener("click", (function() {
                        !function() {
                            t(this, void 0, void 0, (function*() {
                                let e = document.getElementById("downloadEmail").value, t = document.getElementById("downloadPassword").value, n = document.getElementById("download-from-tip-email");
                                n.style.display = "none";
                                let s = document.getElementById("download-from-tip-password");
                                s.style.display = "none";
                                let o = document.getElementById("download-from-tip-top");
                                o.style.display = "none";
                                let i = 0;
                                if (null != e && "" != e || (n.style.display = "block", i++), null != t && "" != t || (s.style.display = "block", 
                                i++), i > 0) return;
                                let a = document.getElementById("downloadOtherLogin");
                                d(a, "Logging in");
                                try {
                                    let n = {
                                        email: e,
                                        password: t
                                    }, s = {
                                        videoUrlList: [],
                                        videoNameList: [],
                                        type: m.login,
                                        loginOrRegisterInfo: n
                                    };
                                    s.url = location.href;
                                    let i = yield r().runtime.sendMessage(s);
                                    if (i.success && 0 == i.data.code) if (i.data.data.success) {
                                        let e = {
                                            title: "UdemyFetcher™",
                                            text: "login success, you can download without limit now." + (yield U()),
                                            mainText: "",
                                            mainUrl: "",
                                            subText: "",
                                            subUrl: "",
                                            type: u.pureNotice
                                        };
                                        q.displayMessage(e), O.closeModal();
                                        let t = i.data.data.data, n = {
                                            userId: t.userId,
                                            email: t.email,
                                            token: i.data.data.token
                                        };
                                        yield T("UdemyDownloaderUserInfo", n).then((() => {
                                            console.log("userInfo is set");
                                        }));
                                    } else o.innerHTML = i.data.data.msg, o.style.display = "block"; else o.innerHTML = "Login fail.", 
                                    o.style.display = "block";
                                } catch (e) {
                                    console.log(e), o.innerHTML = "Login fail.", o.style.display = "block";
                                } finally {
                                    g(a, "Login");
                                }
                            }));
                        }();
                    })), document.getElementById("downloadSignUp").onclick = () => {
                        s();
                    };
                    let n = document.querySelector(".download_login-container .google-login");
                    yield n.addEventListener("click", (function() {
                        l();
                    }));
                }));
            }
            function a() {
                return t(this, void 0, void 0, (function*() {
                    let e = document.querySelector(".download_signup-container .send-code");
                    yield e.addEventListener("click", (function() {
                        !function() {
                            t(this, void 0, void 0, (function*() {
                                let e = document.getElementById("downloadEmail").value, t = document.getElementById("download-from-tip-email");
                                t.style.display = "none", document.getElementById("download-from-tip-password").style.display = "none";
                                let n = document.getElementById("download-from-tip-code");
                                n.style.display = "none", document.getElementById("download-from-tip-top").style.display = "none";
                                let s = 0;
                                if (null != e && "" != e || (t.style.display = "block", s++), s > 0) return;
                                let o = document.getElementById("downloadSendCode");
                                d(o, "Sending");
                                try {
                                    let t = {
                                        email: e
                                    }, s = {
                                        videoUrlList: [],
                                        videoNameList: [],
                                        type: m.sendEmailCode,
                                        loginOrRegisterInfo: t
                                    };
                                    s.url = location.href;
                                    let o = yield r().runtime.sendMessage(s);
                                    o.success && 0 == o.data.code ? (n.innerHTML = "We have sent a verification code to your mailbox, it might be classified as spam, please check too.", 
                                    n.style.display = "block") : (n.innerHTML = "send fail.", n.style.display = "block");
                                } catch (e) {
                                    console.log(e), n.innerHTML = "send fail.", n.style.display = "block";
                                } finally {
                                    g(o, "send");
                                }
                            }));
                        }();
                    }));
                    let s = document.querySelector(".download_signup-container .signup-btn");
                    yield s.addEventListener("click", (function() {
                        !function() {
                            t(this, void 0, void 0, (function*() {
                                let e = document.getElementById("downloadEmail").value, t = document.getElementById("downloadPassword").value, s = document.getElementById("downloadEmailVerifycode").value, o = document.getElementById("download-from-tip-email");
                                o.style.display = "none";
                                let i = document.getElementById("download-from-tip-password");
                                i.style.display = "none";
                                let a = document.getElementById("download-from-tip-code");
                                a.style.display = "none";
                                let l = document.getElementById("download-from-tip-top");
                                l.style.display = "none";
                                let c = 0;
                                if (null != e && "" != e || (o.style.display = "block", c++), null != t && "" != t || (i.style.display = "block", 
                                c++), null != s && "" != s || (a.innerHTML = "verify code is required", a.style.display = "block", 
                                c++), c > 0) return;
                                let A = document.getElementById("downloadSignUp");
                                d(A, "Registering");
                                try {
                                    let o = {
                                        email: e,
                                        password: t,
                                        emailCode: s
                                    }, i = {
                                        videoUrlList: [],
                                        videoNameList: [],
                                        type: m.register,
                                        loginOrRegisterInfo: o
                                    };
                                    i.url = location.href;
                                    let a = yield r().runtime.sendMessage(i);
                                    if (a.success && 0 == a.data.code) if (a.data.data.success) {
                                        let e = {
                                            title: "UdemyFetcher™",
                                            text: "Sign Up success！" + (yield U()),
                                            mainText: "",
                                            mainUrl: "",
                                            subText: "",
                                            subUrl: "",
                                            type: u.pureNotice
                                        };
                                        q.displayMessage(e), n();
                                    } else l.innerHTML = a.data.data.msg, l.style.display = "block"; else l.innerHTML = "Sign Up fail.", 
                                    l.style.display = "block";
                                } catch (e) {
                                    console.log(e), l.innerHTML = "Sign Up fail.", l.style.display = "block";
                                } finally {
                                    g(A, "Sign Up");
                                }
                            }));
                        }();
                    }));
                    let o = document.querySelector(".download_signup-container .google-login");
                    yield o.addEventListener("click", (function() {
                        l();
                    }));
                }));
            }
            function l() {
                return t(this, void 0, void 0, (function*() {
                    let e = '\n            <img src="' + $ + '" alt="Google Logo" width="20">\n            Login with Google\n        ', t = document.getElementById("downloadGoogleLoginBtn");
                    d(t, "\n            Google account Logging in\n        ");
                    try {
                        let e = {
                            videoUrlList: [],
                            videoNameList: [],
                            type: m.googleLogin
                        };
                        e.url = location.href;
                        let t = yield r().runtime.sendMessage(e), n = "";
                        if (console.log(t), t.success && 0 == t.data.code) {
                            O.closeModal();
                            let e = t.data.data, s = {
                                userId: e.userId,
                                email: e.email,
                                token: t.data.data.token
                            };
                            yield T("UdemyDownloaderUserInfo", s).then((() => {
                                console.log("userInfo is set");
                            })), n = "login success, you can download without limit now.";
                        } else n = "Login fail.";
                        let s = {
                            title: "UdemyFetcher™",
                            text: n + (yield U()),
                            mainText: "",
                            mainUrl: "",
                            subText: "",
                            subUrl: "",
                            type: u.pureNotice
                        };
                        q.displayMessage(s);
                    } catch (e) {
                        console.log(e);
                    } finally {
                        g(t, e);
                    }
                }));
            }
            function d(e, t) {
                if (e) {
                    e.disabled = !0, e.innerHTML = t + "...";
                    let n = document.createElement("span");
                    n.className = "Sending" == t ? "download-loading-spinner sendCodeSp" : "download-loading-spinner", 
                    e.innerHTML = "", e.appendChild(n);
                    let s = document.createElement("span");
                    s.innerHTML = t + "...", e.appendChild(s);
                }
            }
            function g(e, t) {
                e && (e.disabled = !1, e.innerHTML = t);
            }
            e.openGoogleLogin = function() {
                return t(this, void 0, void 0, (function*() {
                    let e = yield M(), t = R.replace("{downloadLimit}", e.toString());
                    O.openModalBox(t, o);
                }));
            }, e.openOtherLogin = n, e.openSignUp = s;
        }(W || (W = {}));
        let G = K = class extends g {
            constructor() {
                super(...arguments), this.creationTimeoutList = [], this.removed = !0;
            }
            static downloadSigle(e) {
                return t(this, void 0, void 0, (function*() {
                    let t = !1;
                    if (yield S()) W.openGoogleLogin(), this.hiddenButton(e, m.single); else {
                        let n = j.getElementsDataModuleArgs(D.courseTakeing)[0].courseId, s = this.extractLectureId(location.href), r = yield j.getSingleVideo(n, s);
                        t = yield this.download(n, e, r, m.single);
                    }
                    return t;
                }));
            }
            static downloadMuti(e) {
                return t(this, void 0, void 0, (function*() {
                    let t = !1;
                    if (yield S()) W.openGoogleLogin(), this.hiddenButton(e, m.bulk); else {
                        let n = j.getElementsDataModuleArgs(D.courseTakeing)[0].courseId, s = yield j.getAllVedios(n);
                        t = yield this.download(n, e, s, m.bulk);
                    }
                    return t;
                }));
            }
            static download(e, n, s, o) {
                return t(this, void 0, void 0, (function*() {
                    let t = !0, i = "", a = !1;
                    try {
                        window.udemyFetcher || (window.udemyFetcher = {}), window.udemyFetcher.secretKey || (window.udemyFetcher.secretKey = yield j.getDrmSecretKey(e));
                        let n = {
                            videoUrlList: [],
                            videoNameList: [],
                            type: o
                        };
                        n.url = location.href;
                        let l = !1;
                        if (o == m.single) {
                            let e = document.querySelector(D.selectedVedio), d = "";
                            e && (d = this.cleanFileName(e.textContent));
                            let g = "";
                            try {
                                g = s.asset.stream_urls.Video[0].file;
                            } catch (e) {}
                            l = s.asset.course_is_drmed;
                            let c = "";
                            s.asset.media_sources && s.asset.media_sources.length > 0 ? c = s.asset.media_sources[0].src : "" == g && (t = !1, 
                            i = "Media file not found.");
                            let m = j.getCaptionUrl(s.asset);
                            if (n = {
                                videoIdList: [ s.id ],
                                videoUrlList: [ g ],
                                videoNameList: [ d + ".mp4" ],
                                mediaIdList: [ s.id ],
                                mediaUrlList: [ c ],
                                mediaNameList: [ d + ".mp4" ],
                                captionUrlList: [ m ],
                                captionNameList: [ d + ".vtt" ],
                                type: o,
                                secretKey: window.udemyFetcher.secretKey
                            }, "" == g && l) if (window.udemyFetcher.secretKey) {
                                r().runtime.sendMessage(n), a = !0, C();
                                let e = {
                                    title: "UdemyFetcher™",
                                    text: "If you see the download content button in the upper right corner of your browser, please ignore this prompt. <br/> The video has been sent to the download queue. Please check the download progress on the progress notification circle or sidebar page in the upper right corner. If you don't see the right-hand sidebar page, you can click on the progress prompt circle or right-click and select UdemyFetcher™ menu to enter." + (yield U()),
                                    mainText: "",
                                    mainUrl: "",
                                    subText: "",
                                    subUrl: "",
                                    type: u.pureNotice
                                };
                                q.displayMessage(e);
                            } else t = !1, i = "Try to play videos."; else yield r().runtime.sendMessage(n), 
                            C();
                        } else if (o == m.bulk) {
                            let e = s.videoArr, d = [], g = [], c = [], m = [], u = [], A = [], p = [], h = [];
                            for (let t = 0; t < e.length; t++) {
                                let n = this.cleanFileName(e[t].title);
                                "" != e[t].url ? (d.push(e[t].id), g.push(e[t].url), c.push(n)) : (l || (l = !0), 
                                m.push(e[t].id), u.push(e[t].mediaUrl), A.push(n)), p.push(e[t].captionUrl), h.push(n);
                            }
                            0 == e.length && 0 == u.length && (t = !1, i = "No videos can be download.");
                            let y = document.querySelector(D.courseTitle), f = "1111";
                            y && (f = this.cleanFileName(y.textContent)), n = {
                                courseName: f,
                                videoIdList: d,
                                videoUrlList: g,
                                videoNameList: c,
                                mediaIdList: m,
                                mediaUrlList: u,
                                mediaNameList: A,
                                captionUrlList: p,
                                captionNameList: h,
                                type: o,
                                secretKey: window.udemyFetcher.secretKey
                            }, l && !window.udemyFetcher.secretKey ? (t = !1, i = "Try to play videos.") : (u.length > 0 ? (r().runtime.sendMessage(n), 
                            a = !0) : yield r().runtime.sendMessage(n), C());
                        }
                    } catch (e) {
                        console.error(e), i = "download fail：" + e.toString();
                    } finally {
                        if (this.hiddenButton(n, o), !t) {
                            let e = {
                                title: "UdemyFetcher™",
                                text: i + (yield U()),
                                mainText: "",
                                mainUrl: "",
                                subText: "",
                                subUrl: "",
                                type: u.pureNotice
                            };
                            q.displayMessage(e);
                        }
                    }
                    return a;
                }));
            }
            static hiddenButton(e, t) {
                if (t == m.single) {
                    let t = e.querySelector(D.postDownloadingBtn);
                    t || (t = e.querySelector(D.postDownloadingWhiteBtn)), t.style.display = "none";
                    let n = e.querySelector(D.postDownloadBtn);
                    if (!n) {
                        n = e.querySelector(D.postDownloadWhiteBtn);
                        const t = e.querySelector(".udemy-download-tab-button");
                        t && (t.style["pointer-events"] = "auto", t.style.opacity = "1");
                    }
                    n.style.display = "block";
                } else if (t == m.bulk) {
                    document.getElementById("pldownload-div").classList.remove("pldownloading");
                    const e = document.getElementById("pldownload-button");
                    if (e) {
                        e.setAttribute("disabled", "false"), e.style.pointerEvents = "visible", e.style.opacity = "1";
                        let t = r().i18n.getMessage("mutiUploadTitle");
                        e.innerHTML = '<i class="fa fa-cloud-download" style="margin-right:4px;"></i>  <span id="pldownload-text">' + t + "</span>";
                    }
                }
            }
            createDownloadButton() {
                return t(this, void 0, void 0, (function*() {
                    let e = [ ...document.querySelectorAll(D.leftArea) ];
                    0 === e.length && (e = yield this.retryCreateButton()), this.creationTimeoutList.forEach((e => clearTimeout(e))), 
                    this.creationTimeoutList = [], e.forEach((e => {
                        this.addDownloadButton(e);
                    }));
                }));
            }
            reinitialize() {
                this.remove(), this.init();
            }
            init() {
                this.removed = !1, super.init(), L("isAutoPlay").then((e => {
                    const t = document.querySelector('button[data-purpose="play-button"]');
                    !e && t && (T("isAutoPlay", !0), t.click());
                }));
            }
            remove() {
                this.removed = !0, super.remove(".test");
            }
            retryCreateButton(e = 20, n = 0) {
                return t(this, void 0, void 0, (function*() {
                    yield new Promise((e => {
                        this.creationTimeoutList.push(setTimeout(e, 100));
                    }));
                    let t = [ ...document.querySelectorAll(D.leftArea) ];
                    return (0 === t.length || e <= n) && (this.removed || (t = yield this.retryCreateButton(e, n + 1))), 
                    t;
                }));
            }
            addDownloadButton(e) {
                const t = e.querySelector(D.tabBtn);
                let n = r().i18n.getMessage("signalUploadTip"), s = r().i18n.getMessage("signalUploadName");
                const o = document.createElement("div");
                o.classList.add("carousel-module--scroll-item--QZoY7", "udemy-download-tab-button"), 
                o.title = n, o.innerHTML = '\n            <div class="udemy-post-download-btn-div">\n                <span class="udemy-post-save-btn-white"></span>\n                <span class="udemy-post-saving-btn-white"></span>\n                <span class="ud-btn-label">' + s + "</span>\n            </div>\n        ", 
                o.onclick = () => {
                    const e = t.querySelector(D.postDownloadingWhiteBtn), n = t.querySelector(D.postDownloadWhiteBtn);
                    e.style.display = "block", n.style.display = "none", o.style["pointer-events"] = "none", 
                    o.style.opacity = "0.5", K.addDiscardBtn(t), K.downloadSigle(t);
                };
                t.querySelector(".udemy-download-tab-button") || t.append(o);
            }
            static addDiscardBtn(e) {
                return t(this, void 0, void 0, (function*() {
                    const n = e.querySelector(".udemy-discard-tab-button"), s = yield L("isJumpDiscord");
                    if (!n && !s) {
                        const n = document.createElement("div");
                        n.classList.add("carousel-module--scroll-item--QZoY7", "udemy-discard-tab-button");
                        let s = r().i18n.getMessage("discardBtnName");
                        n.title = s, n.innerHTML = '\n                <div class="udemy-post-download-btn-div udemy-discard-div">\n                    <span class="udemy-discard-btn-white"></span>\n                    <span class="ud-btn-label">' + s + "</span>\n                </div>\n            ", 
                        n.onclick = () => t(this, void 0, void 0, (function*() {
                            let e = yield L("discordUrl");
                            window.open(e + "", "_blank"), yield T("isJumpDiscord", !0);
                        })), e.append(n);
                    }
                }));
            }
            static extractLectureId(e) {
                const t = new URL(e).pathname.split("/"), n = t.findIndex((e => "lecture" === e));
                return -1 !== n && t.length > n + 1 ? t[n + 1] : null;
            }
            static cleanFileName(e) {
                return e.replace(/[<>:"\/\\|?*\x00-\x1F]/g, "");
            }
        };
        G = K = e([ N ], G);
        class z {
            init() {
                r().runtime.onMessage.addListener((e => {
                    if (e.type === u.drmLicense) {
                        window.udemyFetcher || (window.udemyFetcher = {}), window.udemyFetcher.licenseUrl = e.mainUrl;
                        let t = j.getElementsDataModuleArgs(D.courseTakeing)[0].courseId;
                        j.getDrmSecretKey(t).then((e => {
                            window.udemyFetcher.secretKey = e;
                        }));
                    } else q.displayMessage(e);
                }));
            }
        }
        class Z extends i {
            constructor() {
                super(), this.url = location.href, Z.addLocationChangeListener(), this.subscribeToLocationChangeListener();
            }
            static isCourse(e) {
                let t = /https:\/\/www\.udemy\.com\/course\/[^/]+\/learn\/lecture\/.*(#\w*)?$/.test(e);
                return t || (t = /https:\/\/[^\/]+\/course\/[^/]+\/learn\/lecture\/.*(#\w*)?$/.test(e)), 
                t;
            }
            static addLocationChangeListener() {
                Z.injectScript(r().runtime.getURL("../assets/libs/inject.js"), "body"), Z.injectScript(r().runtime.getURL("../assets/libs/drm_inject.js"), "body"), 
                Z.addProgressBtn();
            }
            static injectScript(e, t) {
                const n = document.getElementsByTagName(t)[0], s = document.createElement("script");
                s.setAttribute("type", "text/javascript"), s.setAttribute("src", e), n.appendChild(s);
            }
            static addProgressBtn() {
                return t(this, void 0, void 0, (function*() {
                    let e = yield function() {
                        return t(this, void 0, void 0, (function*() {
                            let e = !1, t = 0;
                            if (!P(location.href)) return {
                                isShow: e,
                                averageProgress: 0
                            };
                            let n = yield L(b);
                            return n && 0 != n.length ? (n.forEach((e => {
                                t += e.percent || 0;
                            })), e = !0, {
                                isShow: e,
                                averageProgress: parseFloat((t / n.length).toFixed(2))
                            }) : {
                                isShow: e,
                                averageProgress: 0
                            };
                        }));
                    }();
                    if (e.isShow) {
                        let t = yield L("hasOpenSider");
                        if (document.getElementById("progressDownloadContainer")) {
                            const t = parseFloat((3.6 * e.averageProgress).toFixed(2));
                            document.getElementById("progressTextDownload").innerText = e.averageProgress + "%", 
                            document.getElementById("progressCircleDownload").style.background = `conic-gradient(#7A93FF ${t}deg, #e0e0e0 ${t}deg 360deg)`;
                        } else {
                            let n = '\n                    <div id="progressDownload" class="progress-container ' + (t ? "" : "progress-container-sf") + '">\n                        <div id="progressCircleDownload" class="progress-circle">\n                            <span id="progressTextDownload" class="progress-text">' + e.averageProgress + "%</span>\n                        </div>\n                    </div>\n                ";
                            const s = document.createElement("div");
                            s.id = "progressDownloadContainer", s.innerHTML = n, document.body.appendChild(s), 
                            s.onclick = () => {
                                let e = r().runtime.connect({
                                    name: "openSidepanels"
                                });
                                e.postMessage({}), e.disconnect(), document.getElementById("progressDownload").className = "progress-container";
                            };
                        }
                    }
                }));
            }
            static removeProgressBtn() {
                let e = document.getElementById("progressDownloadContainer");
                e && e.remove();
            }
            emitLocationEvent() {
                Z.isCourse(this.url) && this.emit("course"), this.logUrlAction();
            }
            logUrlAction() {
                return t(this, void 0, void 0, (function*() {
                    if (yield B(this.url)) {
                        let e = {
                            courseName: "",
                            videoUrlList: [],
                            videoNameList: [],
                            type: m.changeUrl,
                            url: this.url
                        };
                        yield r().runtime.sendMessage(e);
                    }
                }));
            }
            subscribeToLocationChangeListener() {
                window.addEventListener("locationchange", (() => {
                    this.url !== location.href && (this.url = location.href, this.emitLocationEvent());
                }));
            }
        }
        var J;
        let Y = J = class {
            constructor() {
                this.urlChangeEmitter = new Z, this.myStudyDownloader = new G, this.downloadProgress = new z, 
                (new l).subscribe((() => J.addBackgroundVariable())), J.addBackgroundVariable(), 
                J.adjustForAndroid(), this.addListeners(), this.urlChangeEmitter.emitLocationEvent(), 
                window.onload = function() {
                    J.addBackgroundVariable();
                }, document.addEventListener("pssh_dld", (e => {
                    window.udemyFetcher || (window.udemyFetcher = {}), window.udemyFetcher.PSSH = e.detail;
                })), document.addEventListener("clearkey_dld", (e => {
                    window.udemyFetcher || (window.udemyFetcher = {}), window.udemyFetcher.CLEARKEY = e.detail;
                })), r().storage.onChanged.addListener(((e, n) => t(this, void 0, void 0, (function*() {
                    if ("local" === n) if (e[b]) {
                        const t = e[b].newValue;
                        null != t && t.length > 0 ? Z.addProgressBtn() : Z.removeProgressBtn();
                    } else if (e[v]) {
                        const t = e[v].newValue;
                        if (null != t && t.length > 0) {
                            let e = t[0];
                            if (e.status == y.downloadError) {
                                let t = {
                                    title: "UdemyFetcher™",
                                    text: "download fail：" + e.msg + (yield U()),
                                    mainText: "",
                                    mainUrl: "",
                                    subText: "",
                                    subUrl: "",
                                    type: u.pureNotice
                                };
                                q.displayMessage(t);
                            } else e.status, y.downloadSuccess;
                        }
                    } else if (e.downloadStatus) {
                        if (e.downloadStatus.newValue) {
                            T("downloadStatus", !1);
                            if (function() {
                                const e = navigator.userAgent;
                                return e.includes("Edg") ? A.Edge : e.includes("OPR") || e.includes("Opera") ? A.Opera : e.includes("Chrome") && !e.includes("Chromium") ? A.Chrome : !e.includes("Safari") || e.includes("Chrome") || e.includes("Chromium") ? e.includes("Firefox") ? A.Firefox : A.Unknown : A.Safari;
                            }() == A.Firefox) {
                                let e = {
                                    title: "UdemyFetcher™",
                                    text: "Download has been sent to the queue,Please check in the download center of Firefox (open it by click downloads icon at the top right corner of Firefox)" + (yield U()),
                                    mainText: "",
                                    mainUrl: "",
                                    subText: "",
                                    subUrl: "",
                                    type: u.pureNotice
                                };
                                q.displayMessage(e);
                            }
                        }
                    }
                })))), T("isAutoPlay", !1);
            }
            static isMobile() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            }
            static adjustForAndroid() {
                if (J.isMobile()) {
                    const e = document.createElement("style");
                    e.innerText = ".hover-download-button, .account-download-button {    display: none!important;}", 
                    document.head.appendChild(e);
                }
            }
            static addBackgroundVariable() {
                const e = document.createElement("style");
                let t = "url(" + r().runtime.getURL("assets/imgs/download_red.png") + ")", n = "url(" + r().runtime.getURL("assets/imgs/loading_red.png") + ")", s = "url(" + r().runtime.getURL("assets/imgs/download_yellow.png") + ")", o = "url(" + r().runtime.getURL("assets/imgs/download_white.png") + ")", i = "url(" + r().runtime.getURL("assets/imgs/loading_white.png") + ")", a = "url(" + r().runtime.getURL("assets/imgs/discard-white.png") + ")", l = "url(" + r().runtime.getURL("assets/imgs/discard-green.png") + ")";
                e.innerHTML = `\n            :root {\n                --addon-save-red: ${t};\n                --addon-saving-red: ${n};\n                --addon-save-yellow: ${s};\n                --addon-save-white: ${o};\n                --addon-saving-white: ${i};\n                --addon-discard-white: ${a};\n                --addon-discard-green: ${l};\n            }\n        `, 
                document.head.appendChild(e);
            }
            addListeners() {
                this.downloadProgress.init(), this.urlChangeEmitter.on("course", (() => {
                    this.deleteAllDownloader(), this.myStudyDownloader.init();
                }));
            }
            deleteAllDownloader() {
                this.myStudyDownloader.remove();
            }
        };
        Y = J = e([ I ], Y), new Y;
    })();
})();