(() => {
    var e = {
        675: function(e, r) {
            var n, s, a;
            "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self, 
            s = [ e ], n = function(e) {
                "use strict";
                if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) throw new Error("This script should only be loaded in a browser extension.");
                if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id) e.exports = globalThis.browser; else {
                    const r = "The message port closed before a response was received.", n = e => {
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
                            constructor(e, r = void 0) {
                                super(r), this.createItem = e;
                            }
                            get(e) {
                                return this.has(e) || this.set(e, this.createItem(e)), super.get(e);
                            }
                        }
                        const a = e => e && "object" == typeof e && "function" == typeof e.then, o = (r, n) => (...s) => {
                            e.runtime.lastError ? r.reject(new Error(e.runtime.lastError.message)) : n.singleCallbackArg || s.length <= 1 && !1 !== n.singleCallbackArg ? r.resolve(s[0]) : r.resolve(s);
                        }, t = e => 1 == e ? "argument" : "arguments", g = (e, r) => function(n, ...s) {
                            if (s.length < r.minArgs) throw new Error(`Expected at least ${r.minArgs} ${t(r.minArgs)} for ${e}(), got ${s.length}`);
                            if (s.length > r.maxArgs) throw new Error(`Expected at most ${r.maxArgs} ${t(r.maxArgs)} for ${e}(), got ${s.length}`);
                            return new Promise(((a, t) => {
                                if (r.fallbackToNoCallback) try {
                                    n[e](...s, o({
                                        resolve: a,
                                        reject: t
                                    }, r));
                                } catch (o) {
                                    console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, o), 
                                    n[e](...s), r.fallbackToNoCallback = !1, r.noCallback = !0, a();
                                } else r.noCallback ? (n[e](...s), a()) : n[e](...s, o({
                                    resolve: a,
                                    reject: t
                                }, r));
                            }));
                        }, i = (e, r, n) => new Proxy(r, {
                            apply: (r, s, a) => n.call(s, e, ...a)
                        });
                        let l = Function.call.bind(Object.prototype.hasOwnProperty);
                        const m = (e, r = {}, n = {}) => {
                            let s = Object.create(null), a = {
                                has: (r, n) => n in e || n in s,
                                get(a, o, t) {
                                    if (o in s) return s[o];
                                    if (!(o in e)) return;
                                    let A = e[o];
                                    if ("function" == typeof A) if ("function" == typeof r[o]) A = i(e, e[o], r[o]); else if (l(n, o)) {
                                        let r = g(o, n[o]);
                                        A = i(e, e[o], r);
                                    } else A = A.bind(e); else if ("object" == typeof A && null !== A && (l(r, o) || l(n, o))) A = m(A, r[o], n[o]); else {
                                        if (!l(n, "*")) return Object.defineProperty(s, o, {
                                            configurable: !0,
                                            enumerable: !0,
                                            get: () => e[o],
                                            set(r) {
                                                e[o] = r;
                                            }
                                        }), A;
                                        A = m(A, r[o], n["*"]);
                                    }
                                    return s[o] = A, A;
                                },
                                set: (r, n, a, o) => (n in s ? s[n] = a : e[n] = a, !0),
                                defineProperty: (e, r, n) => Reflect.defineProperty(s, r, n),
                                deleteProperty: (e, r) => Reflect.deleteProperty(s, r)
                            }, o = Object.create(e);
                            return new Proxy(o, a);
                        }, A = e => ({
                            addListener(r, n, ...s) {
                                r.addListener(e.get(n), ...s);
                            },
                            hasListener: (r, n) => r.hasListener(e.get(n)),
                            removeListener(r, n) {
                                r.removeListener(e.get(n));
                            }
                        }), d = new s((e => "function" != typeof e ? e : function(r) {
                            const n = m(r, {}, {
                                getContent: {
                                    minArgs: 0,
                                    maxArgs: 0
                                }
                            });
                            e(n);
                        })), c = new s((e => "function" != typeof e ? e : function(r, n, s) {
                            let o, t, g = !1, i = new Promise((e => {
                                o = function(r) {
                                    g = !0, e(r);
                                };
                            }));
                            try {
                                t = e(r, n, o);
                            } catch (e) {
                                t = Promise.reject(e);
                            }
                            const l = !0 !== t && a(t);
                            if (!0 !== t && !l && !g) return !1;
                            const m = e => {
                                e.then((e => {
                                    s(e);
                                }), (e => {
                                    let r;
                                    r = e && (e instanceof Error || "string" == typeof e.message) ? e.message : "An unexpected error occurred", 
                                    s({
                                        __mozWebExtensionPolyfillReject__: !0,
                                        message: r
                                    });
                                })).catch((e => {
                                    console.error("Failed to send onMessage rejected reply", e);
                                }));
                            };
                            return m(l ? t : i), !0;
                        })), x = ({reject: n, resolve: s}, a) => {
                            e.runtime.lastError ? e.runtime.lastError.message === r ? s() : n(new Error(e.runtime.lastError.message)) : a && a.__mozWebExtensionPolyfillReject__ ? n(new Error(a.message)) : s(a);
                        }, u = (e, r, n, ...s) => {
                            if (s.length < r.minArgs) throw new Error(`Expected at least ${r.minArgs} ${t(r.minArgs)} for ${e}(), got ${s.length}`);
                            if (s.length > r.maxArgs) throw new Error(`Expected at most ${r.maxArgs} ${t(r.maxArgs)} for ${e}(), got ${s.length}`);
                            return new Promise(((e, r) => {
                                const a = x.bind(null, {
                                    resolve: e,
                                    reject: r
                                });
                                s.push(a), n.sendMessage(...s);
                            }));
                        }, f = {
                            devtools: {
                                network: {
                                    onRequestFinished: A(d)
                                }
                            },
                            runtime: {
                                onMessage: A(c),
                                onMessageExternal: A(c),
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
                        return n.privacy = {
                            network: {
                                "*": p
                            },
                            services: {
                                "*": p
                            },
                            websites: {
                                "*": p
                            }
                        }, m(e, f, n);
                    };
                    e.exports = n(chrome);
                }
            }, void 0 === (a = "function" == typeof n ? n.apply(r, s) : n) || (e.exports = a);
        }
    }, r = {};
    function n(s) {
        var a = r[s];
        if (void 0 !== a) return a.exports;
        var o = r[s] = {
            exports: {}
        };
        return e[s].call(o.exports, o, o.exports, n), o.exports;
    }
    n.n = e => {
        var r = e && e.__esModule ? () => e.default : () => e;
        return n.d(r, {
            a: r
        }), r;
    }, n.d = (e, r) => {
        for (var s in r) n.o(r, s) && !n.o(e, s) && Object.defineProperty(e, s, {
            enumerable: !0,
            get: r[s]
        });
    }, n.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r), (() => {
        "use strict";
        function e(e, r, n, s) {
            var a, o = arguments.length, t = o < 3 ? r : null === s ? s = Object.getOwnPropertyDescriptor(r, n) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) t = Reflect.decorate(e, r, n, s); else for (var g = e.length - 1; g >= 0; g--) (a = e[g]) && (t = (o < 3 ? a(t) : o > 3 ? a(r, n, t) : a(r, n)) || t);
            return o > 3 && t && Object.defineProperty(r, n, t), t;
        }
        function r(e, r, n, s) {
            return new (n || (n = Promise))((function(a, o) {
                function t(e) {
                    try {
                        i(s.next(e));
                    } catch (e) {
                        o(e);
                    }
                }
                function g(e) {
                    try {
                        i(s.throw(e));
                    } catch (e) {
                        o(e);
                    }
                }
                function i(e) {
                    var r;
                    e.done ? a(e.value) : (r = e.value, r instanceof n ? r : new n((function(e) {
                        e(r);
                    }))).then(t, g);
                }
                i((s = s.apply(e, r || [])).next());
            }));
        }
        Object.create;
        Object.create;
        "function" == typeof SuppressedError && SuppressedError;
        var s, a, o, t, g, i, l, m, A, d, c = n(675), x = n.n(c);
        !function(e) {
            e[e.pre = 0] = "pre", e[e.after = 1] = "after", e[e.getExtDrmKey = 2] = "getExtDrmKey";
        }(s || (s = {})), function(e) {
            e[e.single = 0] = "single", e[e.bulk = 1] = "bulk", e[e.bloburl = 2] = "bloburl", 
            e[e.changeUrl = 3] = "changeUrl", e[e.login = 4] = "login", e[e.googleLogin = 5] = "googleLogin", 
            e[e.register = 6] = "register", e[e.sendEmailCode = 7] = "sendEmailCode", e[e.getDrmSecretKey = 8] = "getDrmSecretKey", 
            e[e.getConfig = 9] = "getConfig";
        }(a || (a = {})), function(e) {
            e[e.goSubscribe = 0] = "goSubscribe", e[e.pureNotice = 1] = "pureNotice", e[e.drmLicense = 2] = "drmLicense";
        }(o || (o = {})), function(e) {
            e[e.Edge = 0] = "Edge", e[e.Chrome = 1] = "Chrome", e[e.Firefox = 2] = "Firefox", 
            e[e.Opera = 3] = "Opera", e[e.Safari = 4] = "Safari", e[e.Unknown = 5] = "Unknown";
        }(t || (t = {})), function(e) {
            e.default = "log", e.warn = "warn", e.error = "error";
        }(g || (g = {})), function(e) {
            e.install = "install", e.uninstall = "uninstall", e.downloadSignalUnkown = "downloadSignalUnkown", 
            e.downloadSignalImg = "downloadSignalImg", e.downloadSignalVideo = "downloadSignalVideo", 
            e.downloadBulk = "downloadBulk", e.changeUrl = "changeUrl", e.register = "register", 
            e.login = "login", e.googleLogin = "googleLogin", e.sendEmailCode = "sendEmailCode", 
            e.uploadFiles = "uploadFiles", e.concatVideoAndAudio = "concatVideoAndAudio";
        }(i || (i = {})), function(e) {
            e.downloadSuccess = "downloadSuccess", e.downloadError = "downloadError";
        }(l || (l = {})), function(e) {
            e.addOrUpdateDownloadingInfo = "addOrUpdateDownloadingInfo", e.updateDownloadStatus = "updateDownloadStatus";
        }(m || (m = {})), function(e) {
            e[e.refresh = 0] = "refresh";
        }(A || (A = {})), function(e) {
            e.downloading = "downloading", e.downloaded = "downloaded", e.all = "all";
        }(d || (d = {}));
        const u = "udemyDownloadingInfo", f = "udemyDownloadedInfo";
        function p(e) {
            return x().storage.local.get(e).then((r => r[e]));
        }
        function w(e, r) {
            return x().storage.local.set({
                [e]: r
            });
        }
        function b(e) {
            return r(this, void 0, void 0, (function*() {
                if ("downloading" === e) return (yield p(u)) || [];
                if ("downloaded" === e) return (yield p(f)) || [];
                throw new Error('Invalid type specified. Use "downloading" or "downloaded".');
            }));
        }
        function h(e) {
            return r(this, void 0, void 0, (function*() {
                if ("downloading" === e) yield w(u, []); else {
                    if ("downloaded" !== e) throw new Error('Invalid type specified. Use "downloading" or "downloaded".');
                    yield w(f, []);
                }
            }));
        }
        var v;
        let y = v = class {
            constructor() {
                v.rendDownloadingInfo(), v.rendDownloadedInfo(), x().runtime.onConnect.addListener((e => {
                    "sidepanelsNotification" === e.name && (e.hasSidepanelsNotificationListener || (e.hasSidepanelsNotificationListener = !0, 
                    e.onMessage.addListener(v.onMessage)));
                })), document.getElementById("clearDownloading").onclick = () => {
                    h("downloading").then((() => {
                        v.rendDownloadingInfo();
                    }));
                }, document.getElementById("clearDownloaded").onclick = () => {
                    h("downloaded").then((() => {
                        v.rendDownloadedInfo();
                    }));
                };
            }
            static onMessage(e) {
                return r(this, void 0, void 0, (function*() {
                    e.action === A.refresh && (e.refreshType === d.downloading ? v.rendDownloadingInfo() : e.refreshType === d.downloaded ? v.rendDownloadedInfo() : e.refreshType === d.all && (v.rendDownloadingInfo(), 
                    v.rendDownloadedInfo()));
                }));
            }
            static rendDownloadingInfo() {
                return r(this, void 0, void 0, (function*() {
                    let e = yield b("downloading"), r = "";
                    for (let n = 0; n < e.length; n++) {
                        let s = e[n], a = "";
                        s.msg && (a = '<div class="tipmsg">' + s.msg + "</div>"), r += '\n                <div class="progress-container" id="' + s.downloadId + '">\n                    <div class="progress-label">' + s.videoName + '</div>\n                    <div class="progress-bar-wrapper">\n                        <div class="progress-bar">\n                            <div class="blue" style="width:' + s.percent + '%"></div>\n                        </div>\n                        <div class="progress-percentage">' + s.percent + "%</div>\n                    </div>\n                    " + a + "\n                </div>\n            ";
                    }
                    let n = document.getElementById("downloadingDiv");
                    n.innerHTML = "" != r ? r : '<span class="nodata">No data being downloaded</span>';
                }));
            }
            static rendDownloadedInfo() {
                return r(this, void 0, void 0, (function*() {
                    let e = yield b("downloaded"), r = "";
                    for (let n = 0; n < e.length; n++) {
                        let s = e[n], a = '\n                <span class="status-success">success</span>\n            ';
                        s.status == l.downloadError && (a = '\n                    <span class="status-fail">fail</span>\n                ');
                        let o = "";
                        s.msg && (o = '<p class="errormsg">' + s.msg + "</p>");
                        let t = "";
                        t = "<p>" + s.videoName + "</p>", r += '\n                <div class="downloaded-item">\n                    ' + t + '\n                    <p class="secondp">' + s.downloadTime + " " + a + "</p>\n                    " + o + "\n                </div>\n            ";
                    }
                    let n = document.getElementById("downloadedDiv");
                    n.innerHTML = "" != r ? r : '<span class="nodata">No downloaded data</span>';
                }));
            }
        };
        y.openSidebarConfigName = "openSidebarConfig", y = v = e([ function(e) {
            return new Proxy(e, {
                construct: (e, r, n) => e.prototype !== n.prototype ? Reflect.construct(e, r, n) : (e.SINGLETON_INSTANCE || (e.SINGLETON_INSTANCE = Reflect.construct(e, r, n)), 
                e.SINGLETON_INSTANCE)
            });
        } ], y);
        new y;
    })();
})();