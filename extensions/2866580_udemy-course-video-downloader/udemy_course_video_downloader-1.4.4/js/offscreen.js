(() => {
    var e = {
        675: function(e, r) {
            var s, n, t;
            "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self, 
            n = [ e ], s = function(e) {
                "use strict";
                if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) throw new Error("This script should only be loaded in a browser extension.");
                if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id) e.exports = globalThis.browser; else {
                    const r = "The message port closed before a response was received.", s = e => {
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
                        class n extends WeakMap {
                            constructor(e, r = void 0) {
                                super(r), this.createItem = e;
                            }
                            get(e) {
                                return this.has(e) || this.set(e, this.createItem(e)), super.get(e);
                            }
                        }
                        const t = e => e && "object" == typeof e && "function" == typeof e.then, a = (r, s) => (...n) => {
                            e.runtime.lastError ? r.reject(new Error(e.runtime.lastError.message)) : s.singleCallbackArg || n.length <= 1 && !1 !== s.singleCallbackArg ? r.resolve(n[0]) : r.resolve(n);
                        }, g = e => 1 == e ? "argument" : "arguments", o = (e, r) => function(s, ...n) {
                            if (n.length < r.minArgs) throw new Error(`Expected at least ${r.minArgs} ${g(r.minArgs)} for ${e}(), got ${n.length}`);
                            if (n.length > r.maxArgs) throw new Error(`Expected at most ${r.maxArgs} ${g(r.maxArgs)} for ${e}(), got ${n.length}`);
                            return new Promise(((t, g) => {
                                if (r.fallbackToNoCallback) try {
                                    s[e](...n, a({
                                        resolve: t,
                                        reject: g
                                    }, r));
                                } catch (a) {
                                    console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, a), 
                                    s[e](...n), r.fallbackToNoCallback = !1, r.noCallback = !0, t();
                                } else r.noCallback ? (s[e](...n), t()) : s[e](...n, a({
                                    resolve: t,
                                    reject: g
                                }, r));
                            }));
                        }, m = (e, r, s) => new Proxy(r, {
                            apply: (r, n, t) => s.call(n, e, ...t)
                        });
                        let i = Function.call.bind(Object.prototype.hasOwnProperty);
                        const A = (e, r = {}, s = {}) => {
                            let n = Object.create(null), t = {
                                has: (r, s) => s in e || s in n,
                                get(t, a, g) {
                                    if (a in n) return n[a];
                                    if (!(a in e)) return;
                                    let l = e[a];
                                    if ("function" == typeof l) if ("function" == typeof r[a]) l = m(e, e[a], r[a]); else if (i(s, a)) {
                                        let r = o(a, s[a]);
                                        l = m(e, e[a], r);
                                    } else l = l.bind(e); else if ("object" == typeof l && null !== l && (i(r, a) || i(s, a))) l = A(l, r[a], s[a]); else {
                                        if (!i(s, "*")) return Object.defineProperty(n, a, {
                                            configurable: !0,
                                            enumerable: !0,
                                            get: () => e[a],
                                            set(r) {
                                                e[a] = r;
                                            }
                                        }), l;
                                        l = A(l, r[a], s["*"]);
                                    }
                                    return n[a] = l, l;
                                },
                                set: (r, s, t, a) => (s in n ? n[s] = t : e[s] = t, !0),
                                defineProperty: (e, r, s) => Reflect.defineProperty(n, r, s),
                                deleteProperty: (e, r) => Reflect.deleteProperty(n, r)
                            }, a = Object.create(e);
                            return new Proxy(a, t);
                        }, l = e => ({
                            addListener(r, s, ...n) {
                                r.addListener(e.get(s), ...n);
                            },
                            hasListener: (r, s) => r.hasListener(e.get(s)),
                            removeListener(r, s) {
                                r.removeListener(e.get(s));
                            }
                        }), c = new n((e => "function" != typeof e ? e : function(r) {
                            const s = A(r, {}, {
                                getContent: {
                                    minArgs: 0,
                                    maxArgs: 0
                                }
                            });
                            e(s);
                        })), x = new n((e => "function" != typeof e ? e : function(r, s, n) {
                            let a, g, o = !1, m = new Promise((e => {
                                a = function(r) {
                                    o = !0, e(r);
                                };
                            }));
                            try {
                                g = e(r, s, a);
                            } catch (e) {
                                g = Promise.reject(e);
                            }
                            const i = !0 !== g && t(g);
                            if (!0 !== g && !i && !o) return !1;
                            const A = e => {
                                e.then((e => {
                                    n(e);
                                }), (e => {
                                    let r;
                                    r = e && (e instanceof Error || "string" == typeof e.message) ? e.message : "An unexpected error occurred", 
                                    n({
                                        __mozWebExtensionPolyfillReject__: !0,
                                        message: r
                                    });
                                })).catch((e => {
                                    console.error("Failed to send onMessage rejected reply", e);
                                }));
                            };
                            return A(i ? g : m), !0;
                        })), d = ({reject: s, resolve: n}, t) => {
                            e.runtime.lastError ? e.runtime.lastError.message === r ? n() : s(new Error(e.runtime.lastError.message)) : t && t.__mozWebExtensionPolyfillReject__ ? s(new Error(t.message)) : n(t);
                        }, u = (e, r, s, ...n) => {
                            if (n.length < r.minArgs) throw new Error(`Expected at least ${r.minArgs} ${g(r.minArgs)} for ${e}(), got ${n.length}`);
                            if (n.length > r.maxArgs) throw new Error(`Expected at most ${r.maxArgs} ${g(r.maxArgs)} for ${e}(), got ${n.length}`);
                            return new Promise(((e, r) => {
                                const t = d.bind(null, {
                                    resolve: e,
                                    reject: r
                                });
                                n.push(t), s.sendMessage(...n);
                            }));
                        }, f = {
                            devtools: {
                                network: {
                                    onRequestFinished: l(c)
                                }
                            },
                            runtime: {
                                onMessage: l(x),
                                onMessageExternal: l(x),
                                sendMessage: u.bind(null, "sendMessage", {
                                    minArgs: 1,
                                    maxArgs: 3
                                })
                            },
                            tabs: {
                                sendMessage: u.bind(null, "sendMessage", {
                                    minArgs: 2,
                                    maxArgs: 3
                                })
                            }
                        }, p = {
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
                                "*": p
                            },
                            services: {
                                "*": p
                            },
                            websites: {
                                "*": p
                            }
                        }, A(e, f, s);
                    };
                    e.exports = s(chrome);
                }
            }, void 0 === (t = "function" == typeof s ? s.apply(r, n) : s) || (e.exports = t);
        }
    }, r = {};
    function s(n) {
        var t = r[n];
        if (void 0 !== t) return t.exports;
        var a = r[n] = {
            exports: {}
        };
        return e[n].call(a.exports, a, a.exports, s), a.exports;
    }
    s.n = e => {
        var r = e && e.__esModule ? () => e.default : () => e;
        return s.d(r, {
            a: r
        }), r;
    }, s.d = (e, r) => {
        for (var n in r) s.o(r, n) && !s.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: r[n]
        });
    }, s.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r), (() => {
        "use strict";
        function e(e, r, s, n) {
            var t, a = arguments.length, g = a < 3 ? r : null === n ? n = Object.getOwnPropertyDescriptor(r, s) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) g = Reflect.decorate(e, r, s, n); else for (var o = e.length - 1; o >= 0; o--) (t = e[o]) && (g = (a < 3 ? t(g) : a > 3 ? t(r, s, g) : t(r, s)) || g);
            return a > 3 && g && Object.defineProperty(r, s, g), g;
        }
        function r(e, r, s, n) {
            return new (s || (s = Promise))((function(t, a) {
                function g(e) {
                    try {
                        m(n.next(e));
                    } catch (e) {
                        a(e);
                    }
                }
                function o(e) {
                    try {
                        m(n.throw(e));
                    } catch (e) {
                        a(e);
                    }
                }
                function m(e) {
                    var r;
                    e.done ? t(e.value) : (r = e.value, r instanceof s ? r : new s((function(e) {
                        e(r);
                    }))).then(g, o);
                }
                m((n = n.apply(e, r || [])).next());
            }));
        }
        Object.create;
        Object.create;
        "function" == typeof SuppressedError && SuppressedError;
        var n, t, a = s(675), g = s.n(a);
        !function(e) {
            e.download = "download", e.progress = "progress", e.end = "end";
        }(n || (n = {}));
        let o = t = class {
            constructor() {
                g().runtime.onConnect.addListener(t.onMessageConnect);
            }
            static onMessageConnect(e) {
                return r(this, void 0, void 0, (function*() {
                    "popupNotification" === e.name && (e.hasPopupNotificationListener || (e.hasPopupNotificationListener = !0, 
                    yield e.onMessage.addListener(t.onMessage)));
                }));
            }
            static onMessage(e) {
                return r(this, void 0, void 0, (function*() {
                    e.action === n.download && (yield t.startWorkerTask(e));
                }));
            }
            static startWorkerTask(e) {
                return r(this, void 0, void 0, (function*() {
                    const s = new Worker(g().runtime.getURL("js/web_worker.js"));
                    s.postMessage(e), s.onmessage = e => r(this, void 0, void 0, (function*() {
                        const r = e.data;
                        if (r.action == n.end) {
                            const e = r.endMessage;
                            let n = g().runtime.connect({
                                name: "downloadFile"
                            });
                            n.postMessage(e), n.disconnect(), s.terminate();
                        } else if (r.action == n.progress) {
                            const e = r.downloadStorageMessage;
                            let s = g().runtime.connect({
                                name: "downloadProgress"
                            });
                            s.postMessage(e), s.disconnect();
                        }
                    })), s.onerror = e => {
                        console.error("Worker 出错:", e.message);
                        let r = {
                            flag: !1,
                            errorMsg: e.message
                        }, n = g().runtime.connect({
                            name: "downloadFile"
                        });
                        n.hasDownloadFileListener = !0, n.postMessage(r), n.disconnect(), s.terminate();
                    };
                }));
            }
        };
        o = t = e([ function(e) {
            return new Proxy(e, {
                construct: (e, r, s) => e.prototype !== s.prototype ? Reflect.construct(e, r, s) : (e.SINGLETON_INSTANCE || (e.SINGLETON_INSTANCE = Reflect.construct(e, r, s)), 
                e.SINGLETON_INSTANCE)
            });
        } ], o);
        new o;
    })();
})();