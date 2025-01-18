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
                        }, i = (e, r, s) => new Proxy(r, {
                            apply: (r, n, t) => s.call(n, e, ...t)
                        });
                        let m = Function.call.bind(Object.prototype.hasOwnProperty);
                        const l = (e, r = {}, s = {}) => {
                            let n = Object.create(null), t = {
                                has: (r, s) => s in e || s in n,
                                get(t, a, g) {
                                    if (a in n) return n[a];
                                    if (!(a in e)) return;
                                    let A = e[a];
                                    if ("function" == typeof A) if ("function" == typeof r[a]) A = i(e, e[a], r[a]); else if (m(s, a)) {
                                        let r = o(a, s[a]);
                                        A = i(e, e[a], r);
                                    } else A = A.bind(e); else if ("object" == typeof A && null !== A && (m(r, a) || m(s, a))) A = l(A, r[a], s[a]); else {
                                        if (!m(s, "*")) return Object.defineProperty(n, a, {
                                            configurable: !0,
                                            enumerable: !0,
                                            get: () => e[a],
                                            set(r) {
                                                e[a] = r;
                                            }
                                        }), A;
                                        A = l(A, r[a], s["*"]);
                                    }
                                    return n[a] = A, A;
                                },
                                set: (r, s, t, a) => (s in n ? n[s] = t : e[s] = t, !0),
                                defineProperty: (e, r, s) => Reflect.defineProperty(n, r, s),
                                deleteProperty: (e, r) => Reflect.deleteProperty(n, r)
                            }, a = Object.create(e);
                            return new Proxy(a, t);
                        }, A = e => ({
                            addListener(r, s, ...n) {
                                r.addListener(e.get(s), ...n);
                            },
                            hasListener: (r, s) => r.hasListener(e.get(s)),
                            removeListener(r, s) {
                                r.removeListener(e.get(s));
                            }
                        }), c = new n((e => "function" != typeof e ? e : function(r) {
                            const s = l(r, {}, {
                                getContent: {
                                    minArgs: 0,
                                    maxArgs: 0
                                }
                            });
                            e(s);
                        })), d = new n((e => "function" != typeof e ? e : function(r, s, n) {
                            let a, g, o = !1, i = new Promise((e => {
                                a = function(r) {
                                    o = !0, e(r);
                                };
                            }));
                            try {
                                g = e(r, s, a);
                            } catch (e) {
                                g = Promise.reject(e);
                            }
                            const m = !0 !== g && t(g);
                            if (!0 !== g && !m && !o) return !1;
                            const l = e => {
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
                            return l(m ? g : i), !0;
                        })), x = ({reject: s, resolve: n}, t) => {
                            e.runtime.lastError ? e.runtime.lastError.message === r ? n() : s(new Error(e.runtime.lastError.message)) : t && t.__mozWebExtensionPolyfillReject__ ? s(new Error(t.message)) : n(t);
                        }, u = (e, r, s, ...n) => {
                            if (n.length < r.minArgs) throw new Error(`Expected at least ${r.minArgs} ${g(r.minArgs)} for ${e}(), got ${n.length}`);
                            if (n.length > r.maxArgs) throw new Error(`Expected at most ${r.maxArgs} ${g(r.maxArgs)} for ${e}(), got ${n.length}`);
                            return new Promise(((e, r) => {
                                const t = x.bind(null, {
                                    resolve: e,
                                    reject: r
                                });
                                n.push(t), s.sendMessage(...n);
                            }));
                        }, f = {
                            devtools: {
                                network: {
                                    onRequestFinished: A(c)
                                }
                            },
                            runtime: {
                                onMessage: A(d),
                                onMessageExternal: A(d),
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
                        }, l(e, f, s);
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
                        i(n.next(e));
                    } catch (e) {
                        a(e);
                    }
                }
                function o(e) {
                    try {
                        i(n.throw(e));
                    } catch (e) {
                        a(e);
                    }
                }
                function i(e) {
                    var r;
                    e.done ? t(e.value) : (r = e.value, r instanceof s ? r : new s((function(e) {
                        e(r);
                    }))).then(g, o);
                }
                i((n = n.apply(e, r || [])).next());
            }));
        }
        Object.create;
        Object.create;
        "function" == typeof SuppressedError && SuppressedError;
        var n, t, a, g, o, i, m, l, A, c, d = s(675), x = s.n(d);
        !function(e) {
            e[e.pre = 0] = "pre", e[e.after = 1] = "after", e[e.getExtDrmKey = 2] = "getExtDrmKey";
        }(n || (n = {})), function(e) {
            e[e.single = 0] = "single", e[e.bulk = 1] = "bulk", e[e.bloburl = 2] = "bloburl", 
            e[e.changeUrl = 3] = "changeUrl", e[e.login = 4] = "login", e[e.googleLogin = 5] = "googleLogin", 
            e[e.register = 6] = "register", e[e.sendEmailCode = 7] = "sendEmailCode", e[e.getDrmSecretKey = 8] = "getDrmSecretKey", 
            e[e.getConfig = 9] = "getConfig";
        }(t || (t = {})), function(e) {
            e[e.goSubscribe = 0] = "goSubscribe", e[e.pureNotice = 1] = "pureNotice", e[e.drmLicense = 2] = "drmLicense";
        }(a || (a = {})), function(e) {
            e[e.Edge = 0] = "Edge", e[e.Chrome = 1] = "Chrome", e[e.Firefox = 2] = "Firefox", 
            e[e.Opera = 3] = "Opera", e[e.Safari = 4] = "Safari", e[e.Unknown = 5] = "Unknown";
        }(g || (g = {})), function(e) {
            e.default = "log", e.warn = "warn", e.error = "error";
        }(o || (o = {})), function(e) {
            e.install = "install", e.uninstall = "uninstall", e.downloadSignalUnkown = "downloadSignalUnkown", 
            e.downloadSignalImg = "downloadSignalImg", e.downloadSignalVideo = "downloadSignalVideo", 
            e.downloadBulk = "downloadBulk", e.changeUrl = "changeUrl", e.register = "register", 
            e.login = "login", e.googleLogin = "googleLogin", e.sendEmailCode = "sendEmailCode", 
            e.uploadFiles = "uploadFiles", e.concatVideoAndAudio = "concatVideoAndAudio";
        }(i || (i = {})), function(e) {
            e.downloadSuccess = "downloadSuccess", e.downloadError = "downloadError";
        }(m || (m = {})), function(e) {
            e.addOrUpdateDownloadingInfo = "addOrUpdateDownloadingInfo", e.updateDownloadStatus = "updateDownloadStatus";
        }(l || (l = {})), function(e) {
            e[e.refresh = 0] = "refresh";
        }(A || (A = {})), function(e) {
            e.downloading = "downloading", e.downloaded = "downloaded", e.all = "all";
        }(c || (c = {}));
        function u(e) {
            return x().storage.local.get(e).then((r => r[e]));
        }
        var f;
        let p = f = class {
            constructor() {
                f.initStyle(), f.getUserInfo(), document.getElementById("jumpDiscard").onclick = () => {
                    f.jumpDiscard();
                }, document.getElementById("copyEmail").onclick = () => {
                    f.copyEmail();
                };
            }
            static initStyle() {
                const e = document.createElement("style");
                let r = "url(" + x().runtime.getURL("assets/imgs/Email.png") + ")", s = "url(" + x().runtime.getURL("assets/imgs/discard-green.png") + ")", n = "url(" + x().runtime.getURL("assets/imgs/optionlogo.png") + ")";
                e.innerHTML = `\n            :root {\n                --addon-email: ${r};\n                --addon-discard-green: ${s};\n                --addon-optionlogo: ${n};\n            }\n        `, 
                document.head.appendChild(e);
            }
            static getUserInfo() {
                return r(this, void 0, void 0, (function*() {
                    const e = yield function() {
                        return r(this, void 0, void 0, (function*() {
                            let e = yield u("UdemyDownloaderUserInfo");
                            return null != e && null != e.userId && "" != e.userId ? e : null;
                        }));
                    }();
                    document.getElementById("userId").textContent = e.userId;
                }));
            }
            static jumpDiscard() {
                return r(this, void 0, void 0, (function*() {
                    let e = yield u("discordUrl");
                    window.open(e + "", "_blank");
                }));
            }
            static copyEmail() {
                return r(this, void 0, void 0, (function*() {
                    navigator.clipboard.writeText("service.udemydownloader@outlook.com").then((() => {
                        document.getElementById("email").textContent = "email address copied.";
                    })).catch((e => {
                        alert("Failed to copy email!"), console.error("Failed to copy: ", e);
                    }));
                }));
            }
        };
        p = f = e([ function(e) {
            return new Proxy(e, {
                construct: (e, r, s) => e.prototype !== s.prototype ? Reflect.construct(e, r, s) : (e.SINGLETON_INSTANCE || (e.SINGLETON_INSTANCE = Reflect.construct(e, r, s)), 
                e.SINGLETON_INSTANCE)
            });
        } ], p);
        new p;
    })();
})();