/*! For license information please see commons.js.LICENSE.txt */
!window.savefromContentScriptWebpackJsonp && (self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || []).push([ [ 223 ], {
    5869: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = e => class extends e {};
    },
    4619: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = e => class extends e {
            constructor() {
                super(), this.isFirefox = !0;
            }
            get isFirefoxMobile() {
                return /(?:Mobile|Tablet);/.test(navigator.userAgent);
            }
        };
    },
    9242: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = new (r(3201).A);
    },
    3511: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = r(4619);
        const o = e => class extends((0, n.A)(e)){};
    },
    3201: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => s
        });
        var n = r(3755), o = r(7089), i = r(3511);
        class a extends((0, i.A)(n.A)){
            constructor() {
                super(), this.initMessages(), this.initStorage(), this.initI18n();
            }
            initI18n() {
                this.i18n = {
                    getMessage: browser.i18n.getMessage.bind(browser.i18n)
                };
            }
            initMessages() {
                this.transport = {
                    sendMessage: (e, t) => {
                        t ? browser.runtime.sendMessage(e, (e => {
                            this.lastError = browser.runtime.lastError, t(e), this.clearLastError();
                        })) : browser.runtime.sendMessage(e);
                    },
                    addListener: e => {
                        browser.runtime.onMessage.addListener(e);
                    },
                    hasListener: e => browser.runtime.onMessage.hasListener(e),
                    hasListeners: () => browser.runtime.onMessage.hasListeners(),
                    removeListener: e => {
                        browser.runtime.onMessage.removeListener(e);
                    }
                }, super.initMessages();
            }
            initStorage() {
                this.storage = new o.A(this);
            }
        }
        const s = a;
    },
    7089: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = class {
            constructor(e) {
                this.mono = e, this.onChanged = {
                    addListener: e => {
                        browser.storage.onChanged.addListener(e);
                    },
                    hasListener: e => browser.storage.onChanged.hasListener(e),
                    hasListeners: () => browser.storage.onChanged.hasListeners(),
                    removeListener: e => {
                        browser.storage.onChanged.removeListener(e);
                    }
                };
            }
            callback(e, t, r) {
                this.mono.lastError = browser.runtime.lastError, (r || e) && e(t), this.mono.clearLastError();
            }
            get(e, t) {
                browser.storage.local.get(e, (e => this.callback(t, e, !0)));
            }
            set(e, t) {
                browser.storage.local.set(e, (() => this.callback(t)));
            }
            remove(e, t) {
                browser.storage.local.remove(e, (() => this.callback(t)));
            }
            clear(e) {
                browser.storage.local.clear((() => this.callback(e)));
            }
        };
    },
    3035: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = r(2875);
        const o = e => class extends e {
            callFn(e, t) {
                return this.waitPromise({
                    action: "callFn",
                    fn: e,
                    args: t
                });
            }
            waitPromise(e) {
                return new Promise(((t, r) => {
                    this.sendMessage(e, (e => {
                        if (e) {
                            if (e.err) {
                                var o = n(e.err);
                                return r(o);
                            }
                            return t(e.result);
                        }
                        var i = this.lastError || new Error("Unexpected response");
                        return r(i);
                    }));
                }));
            }
        };
    },
    2177: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = r(5869);
        const o = e => class extends((0, n.A)(e)){};
    },
    3755: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => s
        });
        var n = r(6487), o = r(3035), i = r(2177);
        class a extends((0, i.A)((0, o.A)(n.A))){
            initMessages() {
                this.sendMessage = this.transport.sendMessage.bind(this.transport), this.onMessage = {
                    addListener: this.transport.addListener.bind(this.transport),
                    hasListener: this.transport.hasListener.bind(this.transport),
                    hasListeners: this.transport.hasListeners.bind(this.transport),
                    removeListener: this.transport.removeListener.bind(this.transport)
                };
            }
        }
        const s = a;
    },
    2950: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = class {
            constructor() {
                this.listeners = [];
            }
            addListener(e) {
                -1 === this.listeners.indexOf(e) && this.listeners.push(e);
            }
            dispatch() {
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                this.listeners.forEach((e => {
                    e(...t);
                }));
            }
            hasListener(e) {
                return -1 !== this.listeners.indexOf(e);
            }
            hasListeners() {
                return this.listeners.length > 0;
            }
            removeListener(e) {
                var t = this.listeners.indexOf(e);
                -1 !== t && this.listeners.splice(t, 1);
            }
        };
    },
    6487: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => i
        });
        var n = r(2950), o = (0, r(8233).A)("mono");
        const i = class {
            constructor() {
                this.onDestroy = new n.A, this._lastErrorFired = !1, this._lastError = null;
            }
            get lastError() {
                return this._lastErrorFired = !0, this._lastError;
            }
            set lastError(e) {
                this._lastErrorFired = !e, this._lastError = e;
            }
            clearLastError() {
                this._lastError && !this._lastErrorFired && o.error("Unhandled mono.lastError error:", this.lastError), 
                this._lastError = null;
            }
            unimplemented() {
                throw new Error("Unimplemented");
            }
            destroy() {
                this.onDestroy.dispatch();
            }
        };
    },
    9620: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => xt
        });
        var n = r(4467), o = r(9242);
        const i = function() {
            for (var e = arguments[0], t = 1, r = arguments.length; t < r; t++) {
                var n = arguments[t];
                for (var o in n) void 0 !== n[o] && (delete e[o], e[o] = n[o]);
            }
            return e;
        };
        const a = function(e, t) {
            var r = null;
            return function() {
                var n = this, o = arguments;
                clearTimeout(r), r = setTimeout((function() {
                    e.apply(n, o);
                }), t);
            };
        };
        var s = r(5563), u = r(3372), l = r(2525), c = r(6480), d = r(8244);
        const p = {
            animation: "none 0s ease 0s 1 normal none running",
            backfaceVisibility: "visible",
            background: "transparent none repeat 0 0 / auto auto padding-box border-box scroll",
            border: "medium none currentColor",
            borderCollapse: "separate",
            borderImage: "none",
            borderRadius: "0",
            borderSpacing: "0",
            bottom: "auto",
            boxShadow: "none",
            boxSizing: "content-box",
            captionSide: "top",
            clear: "none",
            clip: "auto",
            color: "inherit",
            columns: "auto",
            columnCount: "auto",
            columnFill: "balance",
            columnGap: "normal",
            columnRule: "medium none currentColor",
            columnSpan: "1",
            columnWidth: "auto",
            content: "normal",
            counterIncrement: "none",
            counterReset: "none",
            cursor: "auto",
            direction: "ltr",
            display: "inline",
            emptyCells: "show",
            float: "none",
            font: "normal normal normal normal medium/normal inherit",
            height: "auto",
            hyphens: "none",
            left: "auto",
            letterSpacing: "normal",
            listStyle: "disc outside none",
            margin: "0",
            maxHeight: "none",
            maxWidth: "none",
            minHeight: "0",
            minWidth: "0",
            opacity: "1",
            orphans: "0",
            outline: "medium none invert",
            overflow: "visible",
            overflowX: "visible",
            overflowY: "visible",
            padding: "0",
            pageBreakAfter: "auto",
            pageBreakBefore: "auto",
            pageBreakInside: "auto",
            perspective: "none",
            perspectiveOrigin: "50% 50%",
            position: "static",
            right: "auto",
            tabSize: "8",
            tableLayout: "auto",
            textAlign: "inherit",
            textAlignLast: "auto",
            textDecoration: "none solid currentColor",
            textIndent: "0",
            textShadow: "none",
            textTransform: "none",
            top: "auto",
            transform: "none",
            transformOrigin: "50% 50% 0",
            transformStyle: "flat",
            transition: "none 0s ease 0s",
            unicodeBidi: "normal",
            verticalAlign: "baseline",
            visibility: "visible",
            whiteSpace: "normal",
            widows: "0",
            width: "auto",
            wordSpacing: "normal",
            zIndex: "auto",
            all: "initial"
        };
        var A = r(4733), h = r(372), f = r(6810), g = r(4895), v = r(8233), I = r(453), C = r(2128), m = r(1613), E = r(3434), y = r(172), w = r(1853), b = r(3342), x = r(3453), R = r(5299), k = r(4627), O = r(5233), S = r.n(O), F = (e, t) => {
            R.Ay.useEffect((() => {
                var r = e.current;
                return r && r.addEventListener("scroll", t), () => r && r.removeEventListener("scroll", t);
            }), [ e ]);
        }, j = (e, t) => R.Ay.useCallback((r => {
            var n = r.label, i = r.action;
            o.A.sendMessage({
                action: "track",
                t: "event",
                tid: e,
                ec: t,
                el: n || "",
                ea: i
            });
        }), []), L = r(8357), D = (0, v.A)("retryFn"), B = (e, t) => t().catch((r => {
            if (e.retries <= 1) throw D.error("The number of attempts has been exhausted", r.message), 
            r;
            return (0, L.A)(e.timeout).then((() => (D.warn("retry", r.message), B({
                timeout: e.timeout,
                retries: --e.retries
            }, t))));
        }));
        const Q = B;
        var M = (0, v.A)("focusSwitcher");
        const H = function() {
            var e, t = {
                waitFocus: null,
                removeListeners: null
            }, r = () => {
                M.info("focus out"), t.isFocus = !1;
            };
            return window.addEventListener("blur", r, {
                once: !0
            }), t.waitFocus = new Promise((t => {
                e = () => {
                    M.info("focus in"), t();
                }, window.addEventListener("focus", e, {
                    once: !0
                });
            })), t.removeListeners = () => {
                window.removeEventListener("focus", e), window.removeEventListener("blur", r);
            }, t;
        };
        var T = r(6918), G = (0, v.A)("televzrBridge"), N = "televzr://bridgeInit", U = "data_invalid", z = "video_not_found", K = "quality_not_found", J = "televzr_not_found", X = "code_not_authorized", Y = "code_no_premium";
        function P() {
            G.log("Init Tz Bridge Server");
            var e = H(), t = document.createElement("iframe");
            return t.src = N, document.body.appendChild(t), (0, L.A)(1e3).then((() => !1 === document.hasFocus() ? e.waitFocus : null)).then((() => {
                e.removeListeners(), t.remove();
            }));
        }
        function V(e) {
            return o.A.callFn("televzr.infoRequest", [ e ]).then((e => {
                var t = e.app, r = e.user;
                return G.log("Televzr Found", t, r), {
                    app: t,
                    user: r
                };
            })).catch((e => {
                if (G.error("Fetch televzr info error", e), e.code) throw e;
                throw new T.A("Televzr not found", J);
            }));
        }
        const q = {
            initBridgeServer: P,
            checkAvailability: function() {
                var e = {
                    timeout: 1e3,
                    retries: 3
                }, t = e => {
                    var t = e.user;
                    return (0, b.A)([ "userInfo" ]).then((e => {
                        var r = e.userInfo;
                        if (!r) throw new T.A("Helper not auth", X);
                        if (!t.isAuth || !t.isPremium && r.isPremium) return o.A.callFn("televzr.appAuth");
                    }));
                };
                return V(2e3).then(t, (r => {
                    if (r.code === J) return P().then((() => Q(e, (() => V(2e3))))).then(t);
                    throw r;
                }));
            },
            startDownload: function(e, t, r) {
                return o.A.callFn("televzr.startDownloadRequest", [ e, t, r ]);
            },
            pingTelevzr: function() {
                var e = 1e3, t = {
                    timeout: e,
                    retries: 2
                };
                return V(e).catch((r => {
                    if (r.code === J) return P().then((() => Q(t, (() => V(e)))));
                    throw r;
                }));
            }
        };
        var W = R.Ay.memo((e => {
            var t = e.className, r = e.name;
            return R.Ay.createElement("img", {
                className: t,
                src: Z[r]
            });
        })), Z = {
            televzr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAXRaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDMtMTBUMTQ6MDc6MzQrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTAzLTEwVDE0OjE5OjIwKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAzLTEwVDE0OjE5OjIwKzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4YmRjOTI1Yy0yZjM0LTYzNDEtYmYwYi00MzViNTYwMTQ3ODEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZGExNzMyZi1kYjdkLWYxNGYtYjI5Mi1kYzY1M2Y0OTA2M2QiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0Njc5MTViOC1jYWVlLWIxNDgtODdhZi00NTJhMTNiZTMyNjAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2NzkxNWI4LWNhZWUtYjE0OC04N2FmLTQ1MmExM2JlMzI2MCIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0xMFQxNDowNzozNCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4YmRjOTI1Yy0yZjM0LTYzNDEtYmYwYi00MzViNTYwMTQ3ODEiIHN0RXZ0OndoZW49IjIwMjAtMDMtMTBUMTQ6MTk6MjArMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5pQ7PdAAAHUUlEQVRYhcWXXYxdVRXHf2vvc869dz7uzNy2Q0lbamkppZRQLZYa0BCE1JSPGjAtEH0Bow9GDQbKkw8+NYqJaKLE+KCJlWgiUj6SGlpIlBaYSi3wUCHWh0I7nc709s505s49956z9/LhnPsx01af0H2zc/a5+5y91/6v//qvdURV+X+2YNG9AQQotP9QVVFVVUVU1YF2bG6PRFAQLwIgKiKIQHYVgHK+dgOIgc6pew2wqvq0c/5x7x3eK6rgvUfVA4JXhR7E2iNpXyUbGzHdCRGMGMQI1poz1tpbRWQSSAGV/BBr0jS9u9lKfqnek6aOOG5Srzfo6y9hrSFNXG6Morkhcw7enIG6g9AIRSuUrDAQGsqhYSgylCNDX2AoGCEwYIxNwij8KIrC7cC/RFWjJEl3xHH8wtzcPEeOHOPo0fc5ffostQszbLrpeh555H5WrLgqg8kajDEdeN++CL8/p8ROwSt4j6jDeEeonpJ4yhYqkbB+MGTLkoihyFIoFs4WCtE1kqbplvp842i1Om1+8fN9HDp4mLjZQuj6ccuWTTz+vUfZvHnjJSRyCi9X4aXz2f5d/2RIqfd45/BJAvE814UJD68usbwU0N9futXu2fPUh81mq/i7fS/y/B8P4L3HGoMx0jnl6dPneOut4/T1lVi7bjVBYGkz0QCrizCdwqm4y4eME4IYiwkCbBRhiiUmY890PWZj2WJUHzNJkg5OTEzx2qEjqGqbtQuatYazZyfZu/dZfvz0r5g8dx4RQVXxqhRFeWCpcmOf4ton73SP+qwjQjg4yAcNw6l6SpK0jHHeMzExRbVa6yx6uS4iNJtNnnvuJfbs+SHHj58AJIsUVUassntUWRVpN1oWd+8RI7RsyETsQRXjVWm1Epzzl5wc71HnekIvc8nY2Hs8+cRe/vT8n2m1WgCkXlkZKbuXKcM2M+Kyh/GKipD47BmTTfRGdt5V6b/+BipfuBM7MIB615mzVhgfP8fevc/yzDO/plqdzoxwnhv6PDuXeCK60Kv3oB6875ITUK8EGZk0+2kuHgoSWEbve4DhLduYOf43Jl74A/WTH3YUR4wQxzH7fruf8fFzPPnkN7jqqqV459k2AB/Nw+u1TJzyoMgH0nGJV8W0xSWTtbbSKWIMJsoUufzpW1jz3acY3fFlbF//Ircohw4e5mc//Q2zs3WcV4x67hzyjAYe5xYiod51Eei6IEeh59obw5qkBEMjXL3rq1zzze/Qt/Y6tMddIsLrr7/Ju8dPoKqkqadiPeuLHu88urj77h6mlyy03UCGSNti7xw+TUGV8s238KlvPUH5ps9ki+dAzM83+OCDkzjnSJ1DnWPUOmi/n/cMPZ+7wGcc6LCgvXmbE/kLmkeIAmIUOzCILZc7hCKHM262SNM8ZwA4ULcwsBQyFHLyB93kQh7vdMbqPT7NTgECRojPnGHywItMjx2m/bAqhKFl5crlOOdwziHAVAw+BbNA2yTnQRYUwYIMt8AFmkGWptl8mjDz96NMHdhPY/zjXDEFFJxzbNq0kRtvXE+rlaCqzDv452xu+2J5cR5VWYhA5gLfjUOfJRBVpTkxztTBV5g+egTfjEFMx1DvPWuuXcWjj+1icLCfVitBgLEZOFXPl1pkgDqHqs0M8NoVnm55pmjSojb2BvHZM9Te+gvx6VM55NIJVYDNmzfy2NcfYu3a1TSbLYwIJ+fhtSlI04XJqYtAinqDX4CA5nog7XoLamOHqY0dzjY00iWoVwqFiC/edTu7dt1LpTJCs9nK/J7Ay5NQi7NXLldx+jRFNUDVEHjfzYBdFyxqQq5e4NWzbGmFB79yD3fc8TmiKKTZbCLAnINXpjIVNFwKfa8LRD3qITAGRirDDA7202g0EHM50GhLAxs2rOPhh3Zy/Ya1GT+aWTJKPByswT8uZo9fhnudFqJUQsGpEhQLRZYuq/DZrTfz8kuvYrCXgKBeiaKQ2z9/Kzt3bqeyZIQ4bnXBAd6+CO/UrnzqdnPec12lxIoihGFIMDJU3jo/3zj64K57GB+f4Ng773fyv0hWCVdGhrnn3ru47batRFFI3Ig7Cwpwog5vXMhQ6K1nekQ1u1dYWY740soSRQMjw0M7RFVt9cL0TybOV79dq9Y49OpfOfbOe0xNVpmdq3P18lHuu38769at6VHK7uYfN+FAFWZ6GJ+V54I1QmQNpdAyXAy4drjItuUllhWEyshQffnosmFRVauqvjZ98QdT1QvfbyUJcdxkdnaOizOzDJXLDAz0k7SSTGad75TnsVPenIHzqRAaIbJCKbRZWV4IGC5YhgqWwcjQZ4WCUYLAsmRkWJcuqWy1xrwrqto2fFWz1dp9ca7+o0ajQZKkpM6RpmmWUlUX4CtkVXCi+fcHWdiZPGKMCMYIxhpCGxCEIaViUcuD/V8rFor7RfBAfMUa8D/10+MT0h6f+viM9M6dmzov5y/URFWpzzfkv63V/jL6pNvi2O4UmYs/Tj+pdqVTqvkfGXDF9m/pUjcFDUhV2wAAAABJRU5ErkJggg==",
            check: "data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='green' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M497.36,69.995c-7.532-7.545-19.753-7.558-27.285-0.032L238.582,300.845l-83.522-90.713c-7.217-7.834-19.419-8.342-27.266-1.126c-7.841,7.217-8.343,19.425-1.126,27.266l97.126,105.481c3.557,3.866,8.535,6.111,13.784,6.22c0.141,0.006,0.277,0.006,0.412,0.006c5.101,0,10.008-2.026,13.623-5.628L497.322,97.286C504.873,89.761,504.886,77.54,497.36,69.995z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M492.703,236.703c-10.658,0-19.296,8.638-19.296,19.297c0,119.883-97.524,217.407-217.407,217.407c-119.876,0-217.407-97.524-217.407-217.407c0-119.876,97.531-217.407,217.407-217.407c10.658,0,19.297-8.638,19.297-19.296C275.297,8.638,266.658,0,256,0C114.84,0,0,114.84,0,256c0,141.154,114.84,256,256,256c141.154,0,256-114.846,256-256C512,245.342,503.362,236.703,492.703,236.703z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E",
            warning: "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877C276,137.831,267.046,128.877,256,128.877z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Ccircle cx='256' cy='349.16' r='27'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
            circleLoading: "data:image/svg+xml,%3Csvg enable-background='new 0 0 497 497' viewBox='0 0 497 497' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Ccircle cx='98' cy='376' fill='%23909ba6' r='53'/%3E%3Ccircle cx='439' cy='336' fill='%23c8d2dc' r='46'/%3E%3Ccircle cx='397' cy='112' fill='%23e9edf1' r='38'/%3E%3Cellipse cx='56.245' cy='244.754' fill='%237e8b96' rx='56.245' ry='54.874'/%3E%3Cellipse cx='217.821' cy='447.175' fill='%23a2abb8' rx='51.132' ry='49.825'/%3E%3Cellipse cx='349.229' cy='427.873' fill='%23b9c3cd' rx='48.575' ry='47.297'/%3E%3Cellipse cx='117.092' cy='114.794' fill='%235f6c75' rx='58.801' ry='57.397'/%3E%3Cellipse cx='453.538' cy='216.477' fill='%23dce6eb' rx='43.462' ry='42.656'/%3E%3Ccircle cx='263' cy='62' fill='%234e5a61' r='62'/%3E%3C/g%3E%3C/svg%3E"
        };
        const _ = W;
        const $ = R.Ay.memo((e => {
            var t = e.state, r = e.installUrl, n = e.styles, i = j(ee, "install"), a = R.Ay.useCallback((() => i({
                action: "televzr",
                label: "televzr"
            })), []);
            return R.Ay.createElement("div", {
                className: n.televzrPopup
            }, R.Ay.createElement("div", {
                className: n.televzrPopupHeader
            }), t === oe && R.Ay.createElement("div", null, R.Ay.createElement(_, {
                name: "circleLoading",
                className: [ n.icon, n.circleLoaderIcon ].join(" ")
            }), R.Ay.createElement("div", null, o.A.i18n.getMessage("tzSearchApp"))), t === ae && R.Ay.createElement("div", null, R.Ay.createElement("div", {
                className: n.televzrPopupBody
            }, R.Ay.createElement("a", {
                className: [ n.televzrPopupBtn, n.btnInvert ].join(" "),
                href: r,
                target: "_blank",
                onClick: a
            }, R.Ay.createElement("span", {
                className: n.btnOuter
            }, R.Ay.createElement("span", {
                className: n.btnInner
            }, "Install Now")))), R.Ay.createElement("div", {
                className: n.televzrPopupFooter
            }, 'Allows to download HD/MP3 by "Televzr" button')), t === ie && R.Ay.createElement("div", null, R.Ay.createElement(_, {
                name: "check",
                className: [ n.icon ].join(" ")
            }), R.Ay.createElement("div", null, "Televzr launched")));
        }));
        var ee = "G-L0GP1RQSBJ", te = "sf-televzr-popup-container", re = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = document.createElement("a");
            r.href = e, t && (r.target = "_blank"), document.body.appendChild(r), r.click(), 
            setTimeout((() => r.remove()));
        }, ne = "idle", oe = "pending", ie = "installed", ae = "tz_not_installed", se = (0, 
        v.A)("tz-hd-btn");
        const ue = R.Ay.memo((e => {
            var t = e.openUrl, r = j(ee, "download"), n = (0, k.A)(S()), i = R.Ay.useRef(), s = R.Ay.useState(ne), u = (0, 
            x.A)(s, 2), l = u[0], c = u[1], d = R.Ay.useState(!1), p = (0, x.A)(d, 2), h = p[0], f = p[1], g = R.Ay.useState(!1), v = (0, 
            x.A)(g, 2), I = v[0], C = v[1], m = R.Ay.useState(), E = (0, x.A)(m, 2), b = E[0], O = E[1], F = R.Ay.useState((() => t.match(/v=(.*?)$/)[1])), L = (0, 
            x.A)(F, 1)[0], D = R.Ay.useMemo((() => `https://desktop.televzr.com/download-in-hd.html?vid=693&video_id=yt-${L}&utm_source=helper&utm_medium=hd-mp3-button&utm_campaign=televzr&utm_content=televzr_integration`), [ L ]);
            R.Ay.useEffect((() => {
                var e = e => {
                    b && !b.contains(e.target) && [ ie, ae ].includes(l) && f(!1);
                };
                return document.addEventListener("mousedown", e), () => {
                    document.removeEventListener("mousedown", e);
                };
            }), [ l, b ]), R.Ay.useEffect((() => {
                var e, t;
                if (h) {
                    var r = ((e, t, r) => {
                        var n = document.body.querySelector(":not(.ytd-browse[hidden]) #sf-popupMenu"), o = document.querySelector(`.${te}`);
                        o && o.remove(), n && (o = A.A.create("div", {
                            class: te,
                            style: {
                                zIndex: 99999,
                                position: "absolute",
                                top: 0,
                                right: "102%",
                                width: "206px"
                            }
                        }), n.appendChild(o));
                        var i = Boolean(document.body.querySelector("#sfYtFrameBtn")), a = {
                            position: "absolute"
                        };
                        return !o && i && (a.right = "0", o = document.body.querySelector(".sf-btn-ctr")), 
                        o || (a.position = "relative", o = A.A.create("div", {
                            style: {
                                position: "fixed",
                                zIndex: 999999,
                                bottom: "30px",
                                right: "0",
                                width: "268px"
                            }
                        }), document.body.appendChild(o)), [ (0, w.A)((0, y.n)($, {
                            state: e,
                            installUrl: t,
                            styles: r
                        }), o), o ];
                    })(l, D, n), o = (0, x.A)(r, 2);
                    e = o[0], t = o[1], O(t);
                }
                return () => e && e();
            }), [ l, h, D ]), R.Ay.useEffect((() => {
                var e = !1, t = a((() => e && f(!1)), 300), r = () => {
                    e = !0, t();
                }, n = () => {
                    e = !1;
                }, o = () => {
                    i.current && i.current.removeEventListener("mouseleave", r), i.current && i.current.removeEventListener("mouseenter", n), 
                    b && b.removeEventListener("mouseleave", r), b && b.removeEventListener("mouseenter", n);
                };
                return I && b ? (i.current && i.current.addEventListener("mouseleave", r), i.current && i.current.addEventListener("mouseenter", n), 
                b.addEventListener("mouseleave", r), b.addEventListener("mouseenter", n)) : o(), 
                () => o();
            }), [ b, I ]);
            var B = R.Ay.useCallback((e => {
                if (e.preventDefault(), e.stopPropagation(), C(!1), r({
                    action: "click_televzr",
                    label: "download"
                }), l === ne) return f(!0), c(oe), q.pingTelevzr().then((() => {
                    c(ie), localStorage.setItem("televzr_installed", "1"), o.A.callFn("televzr.openUrl", [ t.replace("televzr://", "https://") ]).catch((e => {
                        se.error("televzr.openUrl: ", e), re(t);
                    }));
                }), (e => {
                    c(ae), localStorage.removeItem("televzr_installed"), re(D, !0), se.error(e);
                }));
                [ ae, ie ].includes(l) && f(!0);
            }), [ D ]), Q = R.Ay.useCallback((() => {
                localStorage.getItem("televzr_installed") || h || (f(!0), C(!0), c(ae));
            }), [ h ]);
            return R.Ay.createElement("div", {
                ref: i
            }, R.Ay.createElement("a", {
                href: "#",
                onClick: B,
                className: [ n.itemAnchor, "sf-menu-item" ].join(" "),
                onMouseEnter: Q
            }, R.Ay.createElement("div", {
                className: n.itemContainer
            }, R.Ay.createElement("span", null, "HD/MP3 Televzr"), R.Ay.createElement(_, {
                name: "televzr",
                className: n.logo
            }))));
        }));
        var le = r(2924), ce = r.n(le), de = r(5542), pe = r(3561), Ae = (0, v.A)("queueMuxer"), he = new T.A("Queue destroyed", "DESTROYED");
        const fe = class {
            constructor(e, t) {
                this.onStartTask = e => {}, this.onStatus = (e, t) => {}, this.onProgress = (e, t) => {}, 
                this.onProgressStatus = e => {}, this.onError = e => {}, this.container = e, this.tasks = Object.assign([], t), 
                this._mediaMuxer = null, this.destroyed = !1;
            }
            start() {
                var e = this.tasks.shift();
                if (e && !this.destroyed) return this._runTask(e).then(...(0, pe.A)((() => this.start())));
                if (this.destroyed) for (var t = 0; t <= this.tasks.length; t++) this.onError(he);
                return Ae.log("queue finished"), Promise.resolve();
            }
            destroy() {
                this.destroyed = !0, Ae.log("queue destroy"), this._muxerDestroy(), this.tasks = [];
            }
            _muxerDestroy() {
                this.destroyed || (this._mediaMuxer && this._mediaMuxer.destroy(), this._mediaMuxer = null);
            }
            _runTask(e) {
                return Ae.log("run task: ", e), this.onStartTask(e), this._mediaMuxer = new de.A(this.container), 
                this._mediaMuxer.onStatus = this.onStatus, this._mediaMuxer.onProgress = this.onProgress, 
                this._mediaMuxer.onProgressStatus = this.onProgressStatus, this._mediaMuxer.init().then((() => {
                    if (this.destroyed) throw he;
                    return "hls" === e.format ? this._mediaMuxer.hlsToMp3(e.sources, e.filename) : this._mediaMuxer.join(e.sources, e.filename);
                })).then((() => {
                    if (this.destroyed) throw he;
                    return this._mediaMuxer.download();
                })).then(...(0, pe.A)((() => {
                    this._muxerDestroy(), Ae.log("mediaMuxer destroy: ", e);
                }))).catch((e => {
                    Ae.error("Download error: ", e), this.onError(e);
                }));
            }
        };
        var ge = (0, v.A)("ConverterPopup"), ve = R.Ay.memo((e => {
            var t = e.files, r = e.onDone, n = R.Ay.useRef(), i = (0, k.A)(ce()), a = R.Ay.useState(0), s = (0, 
            x.A)(a, 2), u = s[0], l = s[1], c = R.Ay.useState(0), d = (0, x.A)(c, 2), p = d[0], A = d[1], h = R.Ay.useState(0), f = (0, 
            x.A)(h, 2), g = f[0], v = f[1], I = R.Ay.useState("Prepare"), C = (0, x.A)(I, 2), m = C[0], E = C[1], y = R.Ay.useState(null), w = (0, 
            x.A)(y, 2), b = w[0], O = w[1], S = R.Ay.useState(!1), F = (0, x.A)(S, 2), j = F[0], L = F[1];
            return R.Ay.useEffect((() => {
                var e = !0, o = new fe(n.current, t);
                return o.onStartTask = t => {
                    e && (v(0), E("Prepare"), O(t), l((e => ++e)));
                }, o.onProgress = t => {
                    e && v(Math.trunc(100 * t));
                }, o.onError = t => {
                    ge.error("item download error: ", t), e && A((e => ++e));
                }, o.onProgressStatus = t => {
                    e && E(t);
                }, o.start().then(...(0, pe.A)((() => {
                    e && (L(!0), r && r());
                }))).catch((e => {
                    ge.error("queue error: ", e);
                })), () => {
                    e = !1, o.destroy();
                };
            }), []), R.Ay.createElement("div", {
                ref: n
            }, b && !j && R.Ay.createElement("div", null, R.Ay.createElement("div", {
                className: i.information
            }, o.A.i18n.getMessage("someFilesNeedConverted")), R.Ay.createElement("div", {
                className: i.filesCount
            }, o.A.i18n.getMessage("files"), ": (", u, " / ", t.length, ")"), R.Ay.createElement(Ie, {
                styles: i,
                title: b.filename,
                status: m,
                progress: g
            })), j && R.Ay.createElement("div", null, R.Ay.createElement("div", {
                className: i.information
            }, o.A.i18n.getMessage("conversionCompleted")), R.Ay.createElement("div", null, o.A.i18n.getMessage("success"), ": ", t.length - p, ". ", o.A.i18n.getMessage("errors"), ": ", p, ".")));
        })), Ie = R.Ay.memo((e => {
            var t = e.styles, r = e.title, n = e.status, o = {
                width: e.progress + "%"
            };
            return R.Ay.createElement("div", {
                className: t.progress
            }, R.Ay.createElement("div", {
                className: t.line,
                style: o
            }), R.Ay.createElement("div", {
                className: t.text
            }, R.Ay.createElement("div", {
                className: t.filename
            }, r), R.Ay.createElement("div", null, n)));
        }));
        const Ce = ve;
        var me = r(8439), Ee = r.n(me), ye = r(6942), we = r.n(ye);
        const be = R.Ay.createContext({});
        var xe = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, r = e, n = 0, i = "", a = [ o.A.i18n.getMessage("vkFileSizeByte"), o.A.i18n.getMessage("vkFileSizeKByte"), o.A.i18n.getMessage("vkFileSizeMByte"), o.A.i18n.getMessage("vkFileSizeGByte"), o.A.i18n.getMessage("vkFileSizeTByte") ];
            for (r < 0 && (i = "-", r = Math.abs(r)); r >= 1e3; ) n++, r /= 1024;
            if (t >= 0) {
                var s = 10 * t;
                r = Math.round(r * s) / s;
            }
            return n < a.length ? i + r + " " + a[n] : e;
        };
        const Re = e => (0, g.A)({
            action: "getFileSize",
            url: e
        }).then((e => {
            if (e.error) throw new Error("Get file size error");
            return xe(e.fileSize);
        }));
        var ke = R.Ay.memo((e => {
            var t = e.item, r = R.Ay.useContext(be), n = r.SaveFrom_Utils, i = r.styles, a = R.Ay.useMemo((() => !o.A.isGM && !o.A.isSafari || t.extra ? "" : o.A.i18n.getMessage("downloadTitle")), [ t ]), s = R.Ay.useMemo((() => {
                var e = (t.ext || t.format || "").toLowerCase(), r = t.title ? [ t.title, e ].filter(Boolean).join(".") : "";
                return f.A.modify(r);
            }), [ t ]), u = R.Ay.useCallback((e => {
                if (t.func) return t.func(e, t);
                t.forceDownload && !t.forceConverter && n.downloadOnClick(e, null, {
                    el: e.target
                });
            }), [ t ]);
            return R.Ay.createElement("a", {
                href: t.href,
                download: s,
                className: i.dropdownItem,
                onClick: u,
                title: a,
                target: t.isBlank ? "_blank" : ""
            }, "SRT" === t.quality ? R.Ay.createElement(Se, {
                text: t.itemText
            }) : R.Ay.createElement(Oe, {
                item: t
            }));
        })), Oe = R.Ay.memo((e => {
            var t = e.item, r = R.Ay.useContext(be), n = r.styles, i = r.SaveFrom_Utils;
            return R.Ay.createElement("div", {
                className: n.dropdownContainer
            }, R.Ay.createElement("div", {
                className: n.dropdownFormat
            }, t.format || "???"), "SRT" !== t.quality && R.Ay.createElement("div", {
                className: n.dropdownQuality
            }, R.Ay.createElement("div", null, t.quality), R.Ay.createElement(Fe, {
                quality: t.quality
            })), "SRT" === t.quality && R.Ay.createElement("div", {
                className: we()(n.dropdownQuality, n.subtitles)
            }, t.itemText), R.Ay.createElement("div", {
                className: n.dropdownAction
            }, t.noAudio && R.Ay.createElement("img", {
                src: i.svg.getSrc("noSound", "#ff0000"),
                title: o.A.i18n.getMessage("withoutAudio")
            }), !t.noSize && R.Ay.createElement(je, {
                src: i.svg.getSrc("info"),
                url: t.href
            })));
        })), Se = R.Ay.memo((e => {
            var t = e.text, r = R.Ay.useContext(be).styles;
            return R.Ay.createElement("div", {
                className: r.dropdownContainer
            }, R.Ay.createElement("div", null, t));
        })), Fe = R.Ay.memo((e => {
            var t = e.quality, r = R.Ay.useContext(be).styles, n = R.Ay.useMemo((() => {
                var e = String(t);
                if ([ "1080", "720", "1440" ].includes(e)) return "HD";
                return {
                    2160: "4K",
                    4320: "8K",
                    hls: "HLS",
                    1440: "QHD"
                }[e];
            }), [ t ]);
            return R.Ay.createElement("div", null, n && R.Ay.createElement("div", {
                className: r.qualityBadge
            }, n));
        })), je = R.Ay.memo((e => {
            var t = e.url, r = e.src, n = R.Ay.useContext(be).styles, o = R.Ay.useState(null), i = (0, 
            x.A)(o, 2), a = i[0], s = i[1], u = R.Ay.useCallback((e => (e.stopPropagation(), 
            e.preventDefault(), Re(t).then((e => s(e))))), [ t ]);
            return a ? R.Ay.createElement("div", {
                className: n.sizeIcon
            }, a) : R.Ay.createElement("img", {
                src: r,
                onClick: u
            });
        }));
        const Le = ke;
        var De = "PRO_SECTION_LOGIN", Be = "PRO_SECTION_LANDING", Qe = "PRO_SECTION_INFO", Me = R.Ay.memo((e => {
            var t = e.hiddenItems, r = e.SaveFrom_Utils, n = (0, k.A)(Ee()), i = R.Ay.useState(!1), a = (0, 
            x.A)(i, 2), s = a[0], u = a[1], l = R.Ay.useState(null), c = (0, x.A)(l, 2), p = c[0], A = c[1], h = R.Ay.useState(null), f = (0, 
            x.A)(h, 2), g = f[0], v = f[1], I = R.Ay.useState(!1), C = (0, x.A)(I, 2), m = C[0], E = C[1], y = R.Ay.useMemo((() => t.length > 0), [ t ]), w = R.Ay.useCallback((() => u((e => !e))), []), O = j("UA-181742122-2", "download");
            R.Ay.useEffect((() => {
                o.A.callFn("getPreferences").then((e => E(e.proEnabled)));
            }), []), function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                R.Ay.useEffect((() => {
                    var t = o.A.callFn("auth.isAuth"), r = (0, b.A)([ "userInfo" ]).then((e => Boolean(e.userInfo && e.userInfo.isPremium))), n = o.A.callFn("auth.getLoginUrl");
                    Promise.all([ t, r, n ]).then((t => {
                        var r = (0, x.A)(t, 3), n = r[0], o = r[1], i = r[2];
                        return e(n, o, i);
                    }));
                }), t);
            }(((e, t, r) => {
                if (m) {
                    var n = e && t ? Qe : e ? Be : De;
                    A(r), v(n);
                } else v(null);
            }), [ m ]);
            var S = R.Ay.useCallback((() => {
                O({
                    label: "download",
                    action: "login-to-helperpro-button"
                }), d.A.trigger(document, "mousedown");
            }), []), F = R.Ay.useCallback((() => {
                O({
                    label: "download",
                    action: "activated-pro-button"
                });
            }), []);
            return R.Ay.createElement(be.Provider, {
                value: {
                    SaveFrom_Utils: r,
                    styles: n
                }
            }, R.Ay.createElement("div", null, s && R.Ay.createElement(He, {
                list: t
            }), [ Be, De, null ].includes(g) && R.Ay.createElement(Ge, null), g === Be && R.Ay.createElement("a", {
                className: n.loginBtn,
                onClick: F,
                href: "https://sf-helper.net/helper-pro",
                target: "_blank"
            }, o.A.i18n.getMessage("activatePro")), g === De && R.Ay.createElement("a", {
                className: n.loginBtn,
                onClick: S,
                href: p,
                target: "_blank"
            }, o.A.i18n.getMessage("loginIfPro")), g === Qe && R.Ay.createElement("div", null, R.Ay.createElement(Ge, null), R.Ay.createElement("div", {
                className: n.proInformation
            }, R.Ay.createElement("div", {
                className: n.info
            }, R.Ay.createElement("img", {
                src: r.svg.getSrc("rocket", "#46aa4b")
            }), R.Ay.createElement("div", {
                className: n.proLabel
            }, "You are PRO")), y && R.Ay.createElement(Te, {
                onClick: w
            }))), null === g && y && R.Ay.createElement(Te, {
                onClick: w
            }), [ De, Be ].includes(g) && y && R.Ay.createElement("div", null, R.Ay.createElement(Ge, null), R.Ay.createElement(Te, {
                onClick: w
            }))));
        })), He = R.Ay.memo((e => {
            var t = e.list, r = R.Ay.useRef(), n = R.Ay.useContext(be).styles;
            return F(r, (e => {
                var t = n.hiddenShadow, r = e.target;
                r && r.scrollTop > 0 ? !r.classList.contains(t) && r.classList.add(t) : r.classList.contains(t) && r.classList.remove(t);
            })), R.Ay.createElement("div", {
                ref: r,
                className: we()(t.length > 8 && n.hiddenViewer)
            }, t.map((e => R.Ay.createElement(Le, {
                item: e
            }))));
        })), Te = R.Ay.memo((e => {
            var t = e.onClick, r = R.Ay.useContext(be).styles, n = R.Ay.useState(!1), i = (0, 
            x.A)(n, 2), a = i[0], s = i[1], u = R.Ay.useCallback((e => {
                e.preventDefault(), t(e), s((e => !e));
            }));
            return R.Ay.createElement("a", {
                href: "#",
                className: we()(r.dropdownItem, r.moreBtn),
                onClick: u
            }, a ? o.A.i18n.getMessage("more") + " " + String.fromCharCode(171) : o.A.i18n.getMessage("more") + " " + String.fromCharCode(187));
        })), Ge = R.Ay.memo((() => {
            var e = R.Ay.useContext(be).styles;
            return R.Ay.createElement("div", {
                className: e.separator
            });
        }));
        const Ne = Me;
        var Ue = r(7885), ze = r.n(Ue);
        const Ke = R.Ay.createContext({});
        const Je = R.Ay.memo((e => {
            var t = e.item, r = R.Ay.useContext(Ke), n = r.styles, i = r.dropdownToggle, a = R.Ay.useMemo((() => !o.A.isGM && !o.A.isSafari || t.extra ? "" : o.A.i18n.getMessage("selectLanguage")), [ t ]), s = R.Ay.useCallback((e => {
                if (i(), t.func) return t.func(e, t);
            }), [ t ]);
            return R.Ay.createElement("a", {
                className: n.dropdownItem,
                onClick: s,
                title: a,
                key: t.key
            }, t.langName);
        }));
        function Xe() {
            return Xe = Object.assign ? Object.assign.bind() : function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
            }, Xe.apply(this, arguments);
        }
        var Ye = R.Ay.memo((e => {
            var t = e.hiddenItems, r = e.selectedLanguage, n = e.SaveFrom_Utils, o = (0, k.A)(ze()), i = R.Ay.useState(!1), a = (0, 
            x.A)(i, 2), s = a[0], u = a[1], l = R.Ay.useCallback((() => u((e => !e))), []);
            return R.Ay.createElement(Ke.Provider, {
                value: {
                    SaveFrom_Utils: n,
                    styles: o,
                    dropdownToggle: l
                }
            }, R.Ay.createElement("div", null, R.Ay.createElement(Ve, {
                onClick: l,
                selectedLanguage: r,
                isExpanded: s
            }), s && R.Ay.createElement(Pe, {
                list: t
            }), R.Ay.createElement(We, null)));
        })), Pe = R.Ay.memo((e => {
            var t = e.list, r = R.Ay.useRef(), n = R.Ay.useContext(Ke).styles;
            return F(r, (e => {
                var t = n.hiddenShadow, r = e.target;
                r && r.scrollTop > 0 ? !r.classList.contains(t) && r.classList.add(t) : r.classList.contains(t) && r.classList.remove(t);
            })), R.Ay.createElement("div", {
                ref: r,
                className: we()(t.length > 8 && n.hiddenViewer)
            }, t.map((e => R.Ay.createElement(Je, {
                item: e
            }))));
        })), Ve = R.Ay.memo((e => {
            var t = e.onClick, r = e.isExpanded, n = e.selectedLanguage, o = R.Ay.useContext(Ke).styles, i = R.Ay.useCallback((e => {
                e.preventDefault(), t(e);
            }));
            return R.Ay.createElement("a", {
                href: "#",
                className: we()(o.dropdownItem, o.dropdownItemChevron),
                onClick: i
            }, n, R.Ay.createElement(qe, {
                className: we()(o.chevron, r && o.chevronOpen)
            }));
        })), qe = e => R.Ay.createElement("svg", Xe({
            xmlns: "http://www.w3.org/2000/svg",
            width: "18px",
            height: "18px",
            viewBox: "0 0 24 24",
            fill: "none"
        }, e), R.Ay.createElement("path", {
            d: "M6 15L12 9L18 15",
            stroke: "#000000",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        })), We = R.Ay.memo((() => {
            var e = R.Ay.useContext(Ke).styles;
            return R.Ay.createElement("div", {
                className: e.separator
            });
        }));
        const Ze = Ye;
        var _e = r(8703), $e = r(2629), et = r(4194), tt = r.n(et), rt = (0, v.A)("TryProButtonExp");
        const nt = R.Ay.memo((e => {
            var t = e.unmountLayer, r = (0, k.A)(tt()), n = j("UA-67738130-20", "helper-try-pro"), i = R.Ay.useCallback((() => n({
                label: "button",
                action: "button-click"
            })), []), a = R.Ay.useState(!1), s = (0, x.A)(a, 2), u = s[0], l = s[1];
            return R.Ay.useEffect((() => {
                o.A.callFn("getPreferences").then((e => {
                    if (!e.proEnabled) throw new Error("Helper pro exp is disabled");
                    return (0, b.A)([ "userInfo" ]);
                })).then((e => {
                    e.userInfo && e.userInfo.isPremium ? t() : l(!0);
                })).catch((e => {
                    rt.warn("Experiment error", e), t();
                }));
            }), []), R.Ay.createElement("div", null, u && R.Ay.createElement("a", {
                href: "https://sf-helper.net/helper-pro",
                className: r.button,
                onClick: i,
                target: "_blank"
            }, o.A.i18n.getMessage("try_pro_button")));
        }));
        var ot = r(3928), it = r.n(ot), at = (0, v.A)("TzDownload"), st = "STATE_AUTH_CHECK", ut = "STATE_TELEVZR_SEARCH", lt = "STATE_DOWNLOAD_PREPARING", ct = "STATE_DOWNLOAD_STARTED", dt = "STATE_ERROR", pt = "https://sf-helper.net/helper-pro", At = R.Ay.memo((e => {
            var t = e.unmountLayer, r = e.link, n = e.positionStyle, i = R.Ay.useRef(), a = (0, 
            k.A)(it()), s = R.Ay.useState(null), u = (0, x.A)(s, 2), l = u[0], c = u[1], d = R.Ay.useState(null), p = (0, 
            x.A)(d, 2), A = p[0], h = p[1], f = R.Ay.useState(null), g = (0, x.A)(f, 2), v = g[0], I = g[1], C = j("UA-67738130-20", "helper-try-pro"), m = j("UA-181742122-2", "download"), E = R.Ay.useCallback((e => {
                var t = e.code || e.message;
                h(t), c(dt), "EEXIST" === t && m({
                    label: "download",
                    action: "video-is-already"
                }), t === J && m({
                    label: "download",
                    action: J
                }), t === K && m({
                    label: "download",
                    action: K
                }), t === U && m({
                    label: "download",
                    action: U
                });
            }), []), y = R.Ay.useMemo((() => ({
                [st]: o.A.i18n.getMessage("authCheck"),
                [ut]: o.A.i18n.getMessage("tzSearchApp"),
                [lt]: o.A.i18n.getMessage("tzPreparingToDownload"),
                [ct]: o.A.i18n.getMessage("tzDownloadStarted")
            }[l] || l)), [ l ]), w = R.Ay.useMemo((() => ({
                [X]: o.A.i18n.getMessage("msg_not_authorized"),
                [K]: o.A.i18n.getMessage("msg_quality_not_found"),
                [z]: o.A.i18n.getMessage("msg_video_not_found"),
                [J]: o.A.i18n.getMessage("televzrNotFound"),
                [U]: o.A.i18n.getMessage("msg_data_invalid"),
                [Y]: o.A.i18n.getMessage("msg_no_premium"),
                EEXIST: o.A.i18n.getMessage("msg_video_exists")
            }[A] || A)), [ A ]), b = R.Ay.useCallback((() => t()), []), O = R.Ay.useCallback((() => {
                if (C({
                    label: "button",
                    action: "button-click" + r.quality
                }), o.A.isFirefox) location.href = pt; else {
                    var e = document.createElement("a");
                    e.href = pt, e.target = "_blank", document.body.appendChild(e), e.click(), setTimeout((() => e.remove()));
                }
                t();
            }), [ r ]), S = R.Ay.useCallback((() => t()), []), F = R.Ay.useCallback((() => {
                m({
                    label: "download",
                    action: "instructions-for-use"
                });
            }), []);
            return R.Ay.useEffect((() => {
                var e = e => {
                    i && !i.current.contains(e.target) && [ dt, ct ].includes(l) && S();
                };
                return document.addEventListener("mousedown", e), () => {
                    document.removeEventListener("mousedown", e);
                };
            }), [ l ]), R.Ay.useEffect((() => {
                var e;
                l === ut ? e = {
                    label: "download",
                    action: "search-televzr"
                } : l === lt ? e = {
                    label: "download",
                    action: "preparing-to-download"
                } : l === ct && (e = {
                    label: "download",
                    action: "add-to-download"
                }), e && m(e);
            }), [ l ]), R.Ay.useEffect((() => {
                m({
                    label: "download",
                    action: "click-button"
                }), o.A.callFn("auth.getLoginUrl").then((e => I(e))).then((() => o.A.callFn("auth.isAuth"))).then((e => {
                    if (!e) throw new T.A("User not authorized", X);
                    c(ut);
                })).then((() => q.checkAvailability())).then((() => c(lt))).then((() => q.startDownload(r.url, r.type, r.height))).then((e => {
                    at.info("added download", e), c(ct);
                })).catch((e => {
                    if (e.code === X) return O();
                    at.error("Download error", e), E(e);
                }));
            }), []), R.Ay.createElement("div", {
                ref: i,
                className: we()(a.popupContainer, a.flexColumn, !l && a.hidden),
                style: n
            }, R.Ay.createElement("button", {
                className: a.close,
                onClick: S
            }, "✖"), R.Ay.createElement("div", {
                className: a.popupBody
            }, R.Ay.createElement(ht, {
                styles: a,
                state: l
            }), R.Ay.createElement("div", {
                className: a.textContainer
            }, w || y), A === X && R.Ay.createElement("a", {
                href: v,
                target: "_blank",
                onClick: b,
                className: a.btn
            }, o.A.i18n.getMessage("login")), A === Y && R.Ay.createElement("a", {
                href: pt,
                target: "_blank",
                className: a.btn
            }, o.A.i18n.getMessage("activate")), A === J && R.Ay.createElement("div", null, R.Ay.createElement("div", {
                className: a.subTextContainer
            }, o.A.i18n.getMessage("televzrNotFoundSubMessage")), R.Ay.createElement("a", {
                onClick: F,
                href: "https://sf-helper.net/helper-pro-manual.php",
                target: "_blank",
                className: a.btn
            }, o.A.i18n.getMessage("instruction")))));
        })), ht = R.Ay.memo((e => {
            var t = e.styles, r = e.state;
            return R.Ay.createElement("div", {
                className: t.flexColumn
            }, r === dt && R.Ay.createElement(_, {
                className: we()(t.icon),
                name: "loading"
            }), [ ut, lt, st ].includes(r) && R.Ay.createElement(_, {
                className: we()(t.icon, t.circleLoaderIcon),
                name: "circleLoading"
            }), r === ct && R.Ay.createElement(_, {
                className: we()(t.icon),
                name: "check"
            }));
        }));
        const ft = At;
        var gt = r(4689), vt = r(4429);
        function It(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function Ct(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? It(Object(r), !0).forEach((function(t) {
                    (0, n.A)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : It(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var mt = (0, v.A)("components"), Et = null, yt = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"), wt = {
            downloadParam: "sfh--download",
            setStyle: function(e, t) {
                if (e && t) for (var r in t) e.style[r] = t[r];
            },
            getStyle: function(e, t) {
                return e && window.getComputedStyle && window.getComputedStyle(e, null).getPropertyValue(t);
            },
            addStyleRules: function(e, t, r) {
                var n = r ? document.querySelector("#savefrom-styles." + r) : document.getElementById("savefrom-styles");
                if (!n) {
                    (n = document.createElement("style")).id = "savefrom-styles", r && n.classList.add(r);
                    var o = document.querySelector("head style");
                    o ? o.parentNode.insertBefore(n, o) : document.querySelector("head").appendChild(n);
                }
                if ("object" == typeof t) {
                    var i = [];
                    for (var a in t) i.push(a + ":" + t[a]);
                    t = i.join(";");
                }
                n.textContent += e + "{" + t + "}";
            },
            getPosition: function(e, t) {
                var r = e.getBoundingClientRect();
                if (t) {
                    var n = t.getBoundingClientRect();
                    return {
                        top: Math.round(r.top - n.top),
                        left: Math.round(r.left - n.left),
                        right: Math.round(r.right - n.right),
                        width: r.width,
                        height: r.height
                    };
                }
                return {
                    top: Math.round(r.top + window.pageYOffset),
                    left: Math.round(r.left + window.pageXOffset),
                    width: r.width,
                    height: r.height
                };
            },
            getSize: function(e) {
                return {
                    width: e.offsetWidth,
                    height: e.offsetHeight
                };
            },
            getMatchFirst: function(e, t) {
                var r = e.match(t);
                return r && r.length > 1 ? r[1] : "";
            },
            getElementByIds: function(e) {
                for (var t = 0; t < e.length; t++) {
                    var r = document.getElementById(e[t]);
                    if (r) return r;
                }
                return null;
            },
            getParentByClass: function(e, t) {
                if (!e || "" == t) return !1;
                var r;
                if ("object" == typeof t && t.length > 0) for (r = e; r; r = r.parentNode) {
                    if (1 !== r.nodeType) return null;
                    for (var n = 0; n < t.length; n++) if (r.classList.contains(t[n])) return r;
                } else for (r = e; r; r = r.parentNode) {
                    if (1 !== r.nodeType) return null;
                    if (r.classList.contains(t)) return r;
                }
                return null;
            },
            getParentByTagName: function(e, t) {
                if (!e || !t) return !1;
                for (var r = e; r; r = r.parentNode) {
                    if (1 !== r.nodeType) return null;
                    if (r.tagName === t) return r;
                }
                return null;
            },
            getParentById: function(e, t) {
                for (var r = e; r; r = r.parentNode) {
                    if (1 !== r.nodeType) return null;
                    if (r.id === t) return r;
                }
                return null;
            },
            hasChildrenTagName: function(e, t) {
                for (var r, n = 0; r = e.childNodes[n]; n++) if (1 === r.nodeType && r.tagName === t) return !0;
                return !1;
            },
            isParent: function(e, t) {
                return !(!t || -1 === [ 1, 9, 11 ].indexOf(t.nodeType)) && t.contains(e);
            },
            emptyNode: function(e) {
                for (;e.firstChild; ) e.removeChild(e.firstChild);
            },
            download: function(e, t, r, n) {
                if (!t) return !1;
                if (!(e = e || this.getFileName(t))) return !1;
                if (!Et.preferences.downloads) return !1;
                var i = r || {};
                return i.url = t, i.filename = e.trim(), n = n || void 0, o.A.sendMessage({
                    action: "downloadFile",
                    options: i
                }, n), o.A.sendMessage({
                    action: "checkAndOpenProLanding",
                    id: "cmp-1"
                }), !0;
            },
            downloadList: {
                showDownloadWarningPopup: function(e, t) {
                    var r = wt.playlist.getInfoPopupTemplate();
                    o.A.sendMessage({
                        action: "getWarningIcon",
                        type: t
                    }, (function(e) {
                        r.icon.style.backgroundImage = "url(" + e + ")";
                    })), A.A.create(r.textContainer, {
                        append: [ A.A.create("p", {
                            text: o.A.i18n.getMessage("warningPopupTitle"),
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "13px"
                            }
                        }), A.A.create("p", {
                            text: o.A.i18n.getMessage("warningPopupDesc") + " ",
                            style: {
                                color: "#868686",
                                fontSize: "14px",
                                marginBottom: "13px",
                                lineHeight: "24px",
                                marginTop: "0px"
                            },
                            append: A.A.create("a", {
                                href: "ru" === o.A.i18n.getMessage("lang") || "uk" === o.A.i18n.getMessage("lang") ? "http://vk.com/page-55689929_49003549" : "http://vk.com/page-55689929_49004259",
                                text: o.A.i18n.getMessage("readMore"),
                                target: "_blank",
                                style: {
                                    color: "#4A90E2"
                                }
                            })
                        }), A.A.create("p", {
                            style: {
                                marginBottom: "13px"
                            },
                            append: [ A.A.create("label", {
                                style: {
                                    color: "#868686",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    lineHeight: "19px"
                                },
                                append: [ A.A.create("input", {
                                    type: "checkbox",
                                    style: {
                                        cssFloat: "left",
                                        marginLeft: "0px"
                                    },
                                    on: [ "click", function() {
                                        o.A.sendMessage({
                                            action: "hideDownloadWarning",
                                            set: this.checked ? 1 : 0
                                        });
                                    } ]
                                }), o.A.i18n.getMessage("noWarning") ]
                            }) ]
                        }) ]
                    });
                    var n = void 0, i = void 0;
                    A.A.create(r.buttonContainer, {
                        append: [ n = A.A.create("button", {
                            text: o.A.i18n.getMessage("cancel"),
                            style: {
                                height: "27px",
                                width: "118px",
                                backgroundColor: "#ffffff",
                                color: "#000000",
                                border: "1px solid #9e9e9e",
                                margin: "12px",
                                marginBottom: "11px",
                                marginRight: "4px",
                                borderRadius: "5px",
                                fontSize: "14px",
                                cursor: "pointer"
                            }
                        }), i = A.A.create("button", {
                            text: o.A.i18n.getMessage("continue"),
                            style: {
                                height: "27px",
                                width: "118px",
                                backgroundColor: "#ffffff",
                                color: "#000000",
                                border: "1px solid #9e9e9e",
                                margin: "12px",
                                marginBottom: "11px",
                                marginRight: "8px",
                                borderRadius: "5px",
                                fontSize: "14px",
                                cursor: "pointer"
                            }
                        }) ]
                    }), n.addEventListener("click", (function(e) {
                        var t = r.body.parentNode;
                        d.A.trigger(t.lastChild, "click");
                    })), i.addEventListener("click", (function(t) {
                        t.preventDefault(), t.stopPropagation(), e(), d.A.trigger(n, "click");
                    })), wt.popupDiv(r.body, "dl_warning_box_popup");
                },
                startChromeDownloadList: function(e) {
                    var t = e.folderName, r = e.list;
                    return t && (t += "/"), o.A.sendMessage({
                        action: "downloadList",
                        fileList: r,
                        folder: t
                    });
                },
                startOldChromeDownloadList: function(e, t) {
                    var r = e.folderName, n = e.list, i = e.type;
                    r && (r += "/");
                    var a = 0, s = !1, u = 500, l = document.body;
                    l.focus(), t || (l.onblur = function() {
                        s = !0;
                    });
                    !function e() {
                        var t = n[a];
                        if (a++, void 0 !== t) if (Et.preferences.downloads ? wt.download(r + t.filename, t.url) : d.A.trigger(A.A.create("a", {
                            download: t.filename,
                            href: t.url,
                            on: [ "click", function(e) {
                                wt.downloadOnClick(e);
                            } ]
                        }), "click", {
                            cancelable: !0,
                            altKey: !0
                        }), s) wt.downloadList.showDownloadWarningPopup((function() {
                            s = !1, l.focus(), e();
                        }), i); else {
                            if (a > 5 && u && (u = void 0, l.onblur = void 0, s = !1, Et.preferences.downloads)) return void o.A.sendMessage({
                                action: "downloadList",
                                fileList: n.slice(a),
                                folder: r
                            });
                            setTimeout((function() {
                                e();
                            }), u);
                        }
                    }();
                },
                startDownload: function(e) {
                    e.list.forEach((function(e) {
                        e.filename = f.A.modify(e.filename);
                    })), e.folderName = f.A.modify(e.folderName);
                    var t = Et.preferences.sortDownloads;
                    if (t && t.isEnabled) {
                        var r = e.list[0].filename, n = r.slice(r.lastIndexOf(".") + 1), i = t.groups.find((e => e.formats.some((e => -1 !== e.indexOf(n)))));
                        i && i.dir && (e.folderName = `${f.A.modify(i.dir)}/${e.folderName}`);
                    }
                    return o.A.isGM && "undefined" != typeof GM_download || o.A.isChrome && Et.preferences.downloads || o.A.isFirefox ? wt.downloadList.startChromeDownloadList(e) : o.A.isSafari ? o.A.sendMessage({
                        action: "hideDownloadWarning"
                    }, (function(t) {
                        wt.downloadList.startOldChromeDownloadList(e, t);
                    })) : void 0;
                },
                showBeforeDownloadPopup: function(e, t) {
                    t && !t.count && (t.count = e.length), t.list = e.filter((e => !e.useConverter)), 
                    t.listConverter = e.filter((e => e.useConverter));
                    var r = t.type, n = t.folderName, i = t.onContinue || wt.downloadList.startDownload, a = t.onShowList || wt.playlist.popupFilelist, s = t.count || e.length, u = wt.playlist.getInfoPopupTemplate();
                    o.A.sendMessage({
                        action: "getWarningIcon",
                        color: "#00CCFF",
                        type: r
                    }, (function(e) {
                        u.icon.style.backgroundImage = "url(" + e + ")";
                    }));
                    var l = [];
                    a && (l = [ " (", A.A.create("a", {
                        href: "#",
                        text: o.A.i18n.getMessage("vkListOfLinks").toLowerCase()
                    }), ")" ])[1].addEventListener("click", (function(e) {
                        e.preventDefault(), e.stopPropagation(), a(t.list), d.A.trigger(p, "click");
                    })), A.A.create(u.textContainer, {
                        append: [ A.A.create("p", {
                            text: n || o.A.i18n.getMessage("playlistTitle"),
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "13px"
                            }
                        }), A.A.create("p", {
                            text: o.A.i18n.getMessage("vkFoundFiles").replace("%d", s),
                            style: {
                                color: "#868686",
                                fontSize: "14px",
                                marginBottom: "13px",
                                lineHeight: "24px",
                                marginTop: "0px"
                            },
                            append: l
                        }), A.A.create("p", {
                            text: o.A.i18n.getMessage("beforeDownloadPopupWarn"),
                            style: {
                                color: "#868686",
                                fontSize: "14px",
                                marginBottom: "13px",
                                lineHeight: "24px",
                                marginTop: "0px"
                            }
                        }) ]
                    });
                    var c, p = void 0, h = void 0;
                    A.A.create(u.buttonContainer, {
                        append: [ p = A.A.create("button", {
                            text: o.A.i18n.getMessage("cancel"),
                            style: {
                                height: "27px",
                                width: "118px",
                                backgroundColor: "#ffffff",
                                color: "#000000",
                                border: "1px solid #9e9e9e",
                                margin: "12px",
                                marginBottom: "11px",
                                marginRight: "4px",
                                borderRadius: "5px",
                                fontSize: "14px",
                                cursor: "pointer"
                            }
                        }), h = A.A.create("button", {
                            text: o.A.i18n.getMessage("continue"),
                            style: {
                                height: "27px",
                                width: "118px",
                                backgroundColor: "#ffffff",
                                color: "#000000",
                                border: "1px solid #9e9e9e",
                                margin: "12px",
                                marginBottom: "11px",
                                marginRight: "8px",
                                borderRadius: "5px",
                                fontSize: "14px",
                                cursor: "pointer"
                            }
                        }) ]
                    }), p.addEventListener("click", (function(e) {
                        var t = u.body.parentNode;
                        d.A.trigger(t.lastChild, "click");
                    })), h.addEventListener("click", (function(e) {
                        e.preventDefault(), e.stopPropagation(), i(t), t.listConverter.length ? (c = (0, 
                        w.A)((0, y.n)(Ce, {
                            files: t.listConverter,
                            onDone: () => {
                                p.textContent = o.A.i18n.getMessage("close"), h.style.display = "none", u.buttonContainer.style.display = "block";
                            }
                        }), u.textContainer), u.buttonContainer.style.display = "none") : d.A.trigger(p, "click");
                    }));
                    wt.popupDiv(u.body, "dl_confirm_box_popup", void 0, void 0, (() => {
                        c && c();
                    }), {
                        docCloseEnable: !t.listConverter.length
                    });
                }
            },
            downloadLink: function(e, t) {
                if (!e.href) return !1;
                var r = e.getAttribute("download");
                return this.download(r, e.href, null, t);
            },
            safariDlLink: function(e) {
                if (!(e.button || e.ctrlKey || e.altKey || e.shitfKey)) {
                    var t = null;
                    try {
                        if ("function" != typeof MouseEvent) throw "legacy";
                        t = new MouseEvent("click", {
                            bubbles: !0,
                            cancelable: e.cancelable,
                            screenX: e.screenX,
                            screenY: e.screenY,
                            clientX: e.clientX,
                            clientY: e.clientY,
                            ctrlKey: !1,
                            altKey: !0,
                            shiftKey: !1,
                            metaKey: e.metaKey,
                            button: e.button,
                            relatedTarget: e.relatedTarget
                        });
                    } catch (r) {
                        t = function(e) {
                            var t = document.createEvent("MouseEvents");
                            return t.initMouseEvent("click", !0, e.cancelable, window, 0, e.screenX, e.screenY, e.clientX, e.clientY, !1, !0, !1, e.metaKey, e.button, e.relatedTarget), 
                            t;
                        }(e);
                    }
                    e.preventDefault(), e.stopPropagation(), this.dispatchEvent(t);
                }
            },
            downloadOnClick: function(e, t, r) {
                var n = wt, i = (r = r || {}).el || e.target;
                if ("A" !== i.tagName && (i = (0, l.A)(i, "A")), i) {
                    var a = o.A.isGM && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"), s = !(!o.A.isGM || "undefined" == typeof GM_info) && "Tampermonkey" === GM_info.scriptHandler && !Et.preferences.downloads;
                    if (o.A.isSafari || a || s) {
                        if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, I.D)(i, {
                            defaultWidth: 400,
                            defaultHeight: 60
                        }, r);
                        (0, I.w)(i);
                    }
                    if (o.A.isSafari) return n.safariDlLink.call(i, e);
                    Et.preferences.downloads && ((o.A.isFirefox || o.A.isGM) && /^blob:|^data:/.test(i.href) || 2 !== e.button && (e.preventDefault(), 
                    !r.withoutPropagation && e.stopPropagation(), (0, gt.A)({
                        category: "download",
                        subcategory: (0, $e.A)(),
                        event: (0, _e.A)(r)
                    }), n.downloadLink(i, t)));
                }
            },
            getQueryString: function(e, t, r) {
                if (!e || "object" != typeof e) return "";
                void 0 === t && (t = ""), void 0 === r && (r = "");
                var n = "";
                for (var o in e) n.length && (n += "&"), e[o] instanceof Object ? (t || (t = ""), 
                r || (r = ""), n += wt.getQueryString(e[o], t + o + "[", "]" + r)) : n += t + escape(o) + r + "=" + escape(e[o]);
                return n;
            },
            decodeUnicodeEscapeSequence: function(e) {
                return e.replace(/\\u([0-9a-f]{4})/g, (function(e, t) {
                    if (t = parseInt(t, 16), !isNaN(t)) return String.fromCharCode(t);
                }));
            },
            getFileExtension: function(e, t) {
                var r = this.getMatchFirst(e, /\.([a-z0-9]{3,4})(\?|$)/i);
                return r ? r.toLowerCase() : t || "";
            },
            getFileName: function(e) {
                var t = this.getMatchFirst(e, /\/([^\?#\/]+\.[a-z\d]{2,6})(?:\?|#|$)/i);
                return t ? f.A.modify(t) : t;
            },
            getTopLevelDomain: function(e) {
                if (!e) return "";
                if (!e.match(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/)) return e;
                var t = e.split("."), r = t.length;
                return 2 == r ? e : t[r - 2] + "." + t[r - 1];
            },
            dateToObj: function(e, t) {
                var r = null == e ? new Date : new Date(e);
                void 0 === t && (t = !0);
                var n = {
                    year: r.getFullYear(),
                    month: r.getMonth() + 1,
                    day: r.getDate(),
                    hour: r.getHours(),
                    min: r.getMinutes(),
                    sec: r.getSeconds()
                };
                if (t) for (var o in n) 1 == n[o].toString().length && (n[o] = "0" + n[o]);
                return n;
            },
            utf8Encode: function(e) {
                e = e.replace(/\r\n/g, "\n");
                for (var t = "", r = 0; r < e.length; r++) {
                    var n = e.charCodeAt(r);
                    n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), 
                    t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), 
                    t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128));
                }
                return t;
            },
            sizeHuman: function(e, t) {
                null != t && null != t || (t = 2);
                var r = e, n = 0, i = "", a = [ o.A.i18n.getMessage("vkFileSizeByte"), o.A.i18n.getMessage("vkFileSizeKByte"), o.A.i18n.getMessage("vkFileSizeMByte"), o.A.i18n.getMessage("vkFileSizeGByte"), o.A.i18n.getMessage("vkFileSizeTByte") ];
                for (r < 0 && (i = "-", r = Math.abs(r)); r >= 1e3; ) n++, r /= 1024;
                if (t >= 0) {
                    var s = 10 * t;
                    r = Math.round(r * s) / s;
                }
                return n < a.length ? i + r + " " + a[n] : e;
            },
            secondsToDuration: function(e) {
                if (!e || isNaN(e)) return "";
                function t(e) {
                    return e < 10 ? "0" + e : e.toString();
                }
                var r = Math.floor(e / 3600);
                e %= 3600;
                var n = Math.floor(e / 60);
                return e %= 60, r > 0 ? r + ":" + t(n) + ":" + t(e) : n + ":" + t(e);
            },
            svg: {
                icon: {
                    download: "M 4,0 4,8 0,8 8,16 16,8 12,8 12,0 4,0 z",
                    info: "M 8,1.55 C 11.6,1.55 14.4,4.44 14.4,8 14.4,11.6 11.6,14.4 8,14.4 4.44,14.4 1.55,11.6 1.55,8 1.55,4.44 4.44,1.55 8,1.55 M 8,0 C 3.58,0 0,3.58 0,8 0,12.4 3.58,16 8,16 12.4,16 16,12.4 16,8 16,3.58 12.4,0 8,0 L 8,0 z M 9.16,12.3 H 6.92 V 7.01 H 9.16 V 12.3 z M 8.04,5.91 C 7.36,5.91 6.81,5.36 6.81,4.68 6.81,4 7.36,3.45 8.04,3.45 8.72,3.45 9.27,4 9.27,4.68 9.27,5.36 8.72,5.91 8.04,5.91 z",
                    noSound: "M 11.4,5.05 13,6.65 14.6,5.05 16,6.35 14.4,7.95 16,9.55 14.6,11 13,9.35 11.4,11 10,9.55 11.6,7.95 10,6.35 z M 8,1.75 8,14.3 4,10.5 l -4,0 0,-4.75 4,0 z",
                    rocket: "M 11.371094 7.625 C 13.507812 5.074219 14.054688 1.523438 13.996094 0.445312 C 13.996094 0.328125 13.9375 0.226562 13.863281 0.136719 C 13.789062 0.0625 13.6875 0.00390625 13.554688 0.00390625 C 12.476562 -0.0546875 8.925781 0.476562 6.390625 2.613281 L 5.800781 2.390625 C 4.769531 2.007812 3.605469 2.320312 2.894531 3.160156 L 1.261719 5.089844 C 1.023438 5.355469 1.140625 5.78125 1.480469 5.898438 L 3.234375 6.550781 C 2.851562 7.199219 2.585938 7.742188 2.410156 8.125 C 2.261719 8.4375 2.335938 8.804688 2.585938 9.054688 L 4.945312 11.429688 C 5.179688 11.664062 5.550781 11.738281 5.875 11.589844 C 6.257812 11.414062 6.800781 11.148438 7.449219 10.765625 L 8.085938 12.519531 C 8.203125 12.859375 8.628906 12.960938 8.894531 12.738281 L 10.8125 11.105469 C 11.652344 10.394531 11.960938 9.230469 11.578125 8.199219 Z M 10.265625 5.78125 C 9.707031 6.34375 8.792969 6.34375 8.21875 5.78125 C 7.65625 5.222656 7.65625 4.308594 8.21875 3.734375 C 8.777344 3.171875 9.691406 3.171875 10.265625 3.734375 C 10.828125 4.308594 10.828125 5.222656 10.265625 5.78125 Z M 10.265625 5.78125 M 3.929688 12.03125 L 2.867188 13.078125 C 2.660156 13.285156 2.660156 13.640625 2.867188 13.84375 C 3.074219 14.050781 3.425781 14.050781 3.632812 13.84375 L 4.695312 12.785156 C 4.902344 12.578125 4.902344 12.222656 4.695312 12.015625 C 4.472656 11.8125 4.136719 11.8125 3.929688 12.03125 Z M 3.929688 12.03125 M 3.324219 10.675781 C 3.117188 10.46875 2.765625 10.46875 2.558594 10.675781 L 0.878906 12.371094 C 0.671875 12.578125 0.671875 12.929688 0.878906 13.136719 C 1.082031 13.34375 1.4375 13.34375 1.644531 13.136719 L 3.324219 11.429688 C 3.546875 11.222656 3.546875 10.882812 3.324219 10.675781 Z M 3.324219 10.675781 M 1.984375 10.085938 C 2.1875 9.878906 2.1875 9.527344 1.984375 9.320312 C 1.777344 9.113281 1.421875 9.113281 1.214844 9.320312 L 0.15625 10.382812 C -0.0507812 10.585938 -0.0507812 10.941406 0.15625 11.148438 C 0.359375 11.355469 0.714844 11.355469 0.921875 11.148438 Z M 1.984375 10.085938"
                },
                cache: {},
                getSrc: function(e, t) {
                    return this.icon[e] ? (this.cache[e] || (this.cache[e] = {}), this.cache[e][t] || (this.cache[e][t] = btoa('<?xml version="1.0" encoding="UTF-8"?><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 16 16" id="svg2" xml:space="preserve"><path d="' + this.icon[e] + '" fill="' + t + '" /></svg>')), 
                    this.cache[e][t] ? "data:image/svg+xml;base64," + this.cache[e][t] : "") : "";
                },
                getSvg: function(e, t, r, n) {
                    var o = document.createElementNS("http://www.w3.org/2000/svg", "svg"), i = o.namespaceURI;
                    o.setAttribute("width", r || "16"), o.setAttribute("height", n || r || "16"), o.setAttribute("viewBox", "0 0 16 16");
                    var a = document.createElementNS(i, "path");
                    return o.appendChild(a), a.setAttribute("d", this.icon[e]), t && a.setAttribute("fill", t), 
                    o;
                }
            },
            appendDownloadInfo: function(e, t, r, n) {
                t || (t = "#a0a0a0");
                var i = document.createElement("span");
                i.appendChild(document.createTextNode(o.A.i18n.getMessage("downloadTitle"))), this.setStyle(i, {
                    display: "inline-block",
                    position: "relative",
                    border: "1px solid " + t,
                    borderRadius: "5px",
                    fontSize: "13px",
                    lineHeight: "17px",
                    padding: "2px 19px 2px 5px",
                    marginTop: "5px",
                    opacity: .9
                }), r && this.setStyle(i, r);
                var a = document.createElement("span");
                a.textContent = String.fromCharCode(215), this.setStyle(a, {
                    color: t,
                    width: "14px",
                    height: "14px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "14px",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    overflow: "hidden",
                    cursor: "pointer"
                }), n && this.setStyle(a, n), a.addEventListener("click", (function() {
                    i.parentNode.removeChild(i), o.A.sendMessage({
                        action: "updateOption",
                        key: "moduleShowDownloadInfo",
                        value: 0
                    });
                }), !1), i.appendChild(a), e.appendChild(i);
            },
            getFileSizeIcon: function(e, t, r, n) {
                var i = this;
                n = n || {}, e = e || {}, t = t || {}, r = r || {};
                var a = function(e) {
                    return A.A.create("div", {
                        style: t,
                        append: [ A.A.create(wt.svg.getSvg("info", e), {
                            style: r
                        }) ]
                    });
                }, s = A.A.create("div", {
                    style: e,
                    append: [ A.A.create(a("#333333"), {
                        title: o.A.i18n.getMessage("getFileSizeTitle"),
                        on: [ "click", function e(t) {
                            t.stopPropagation(), t.preventDefault(), s.textContent = "...";
                            var r = n.url;
                            r || (r = n.link && n.link.href), (0, g.A)({
                                action: "getFileSize",
                                url: r
                            }).then((function(e) {
                                if (e.error || !e.fileSize) throw new Error(JSON.stringify(e));
                                var t = e.fileType || "", r = i.sizeHuman(e.fileSize, 2), a = "";
                                if (n.link && /^audio\//i.test(t)) {
                                    var u = parseInt(n.link.dataset.savefromHelperDuration);
                                    u > 0 && (a += Math.floor(e.fileSize / u / 125), a += " " + o.A.i18n.getMessage("kbps"));
                                }
                                var l = "";
                                l += a ? r + " ~ " + a : r, n.brackets && (l = "(" + l + ")"), s.textContent = l, 
                                s.title = t;
                            })).catch((function(t) {
                                var r;
                                mt.error(t), "ZERO" === t.message ? (r = a("#ffac00")).title = o.A.i18n.getMessage("getFileSizeTitle") : (r = a("#ff0000")).title = o.A.i18n.getMessage("getFileSizeFailTitle"), 
                                r.addEventListener("click", e), s.textContent = "", s.appendChild(r);
                            }));
                        } ]
                    }) ]
                });
                return {
                    node: s
                };
            },
            appendFileSizeIcon: function(e, t, r, n, i, a) {
                t = t || {}, r = r || {};
                var s = "#333333";
                "0" === n ? s = "#ffac00" : n ? s = "#ff0000" : t.color && (s = t.color);
                var u = {
                    width: "14px",
                    height: "14px",
                    marginLeft: "3px",
                    verticalAlign: "middle",
                    position: "relative",
                    top: "-1px",
                    cursor: "pointer"
                };
                Object.assign(u, t);
                var l = {
                    fontSize: "75%",
                    fontWeight: "normal",
                    marginLeft: "3px",
                    whiteSpace: "nowrap"
                };
                Object.assign(l, r);
                var c = A.A.create("img", {
                    src: wt.svg.getSrc("info", s),
                    title: n ? o.A.i18n.getMessage("getFileSizeFailTitle") : o.A.i18n.getMessage("getFileSizeTitle"),
                    style: u
                }), d = this;
                return a ? a.appendChild(c) : e.nextSibling ? e.parentNode.insertBefore(c, e.nextSibling) : e.parentNode.appendChild(c), 
                c.addEventListener("click", (function(n) {
                    n.preventDefault(), n.stopPropagation();
                    var a = A.A.create("span", {
                        text: "...",
                        style: l
                    });
                    c.parentNode.replaceChild(a, c);
                    var s = function(n) {
                        if (n.fileSize > 0) {
                            var s = n.fileType || "", u = d.sizeHuman(n.fileSize, 2), l = "";
                            if (/^audio\//i.test(s)) {
                                var c = e.getAttribute("data-savefrom-helper-duration");
                                (c = c && parseInt(c)) > 0 && (l = Math.floor(n.fileSize / c / 125), l += " " + o.A.i18n.getMessage("kbps"));
                            }
                            var p = "";
                            p = l ? u + " ~ " + l : u, i || (p = "(" + p + ")"), a.textContent = p, a.title = s;
                        } else if (n.error) {
                            var A = d.appendFileSizeIcon(e, t, r, !0, i, document.createDocumentFragment());
                            a.parentNode.replaceChild(A, a);
                        } else {
                            var h = d.appendFileSizeIcon(e, t, r, "0", i, document.createDocumentFragment());
                            a.parentNode.replaceChild(h, a);
                        }
                    };
                    return "ok.ru" === location.host ? fetch(e.href, {
                        method: "HEAD"
                    }).then((e => ({
                        fileSize: e.headers.get("content-length"),
                        contentType: e.headers.get("content-type"),
                        status: e.status,
                        error: 200 !== e.status
                    }))).then(s).catch((() => s({
                        fileSize: 0,
                        error: !0
                    }))) : o.A.sendMessage({
                        action: "getFileSize",
                        url: e.href
                    }, s);
                }), !1), c;
            },
            appendNoSoundIcon: function(e, t) {
                var r = "#ff0000";
                (t = t || {}).color && (r = t.color);
                var n = {
                    width: "14px",
                    height: "14px",
                    marginLeft: "3px",
                    verticalAlign: "middle",
                    position: "relative",
                    top: "-1px",
                    cursor: "pointer"
                };
                Object.assign(n, t);
                var i = A.A.create("img", {
                    src: wt.svg.getSrc("noSound", r),
                    title: o.A.i18n.getMessage("withoutAudio"),
                    style: n
                });
                e.nextSibling ? e.parentNode.insertBefore(i, e.nextSibling) : e.parentNode ? e.parentNode.appendChild(i) : e.appendChild(i);
            },
            video: {
                dataAttr: "data-savefrom-video-visible",
                yt: {
                    inited: !1,
                    show3D: !1,
                    showMP4NoAudio: !1,
                    showFormat: {
                        FLV: !0,
                        MP4: !0,
                        WebM: !1,
                        "3GP": !1,
                        "Audio AAC": !1,
                        "Audio Vorbis": !1,
                        "Audio Opus": !1
                    },
                    format: {
                        FLV: {
                            5: {
                                quality: "240"
                            },
                            6: {
                                quality: "270"
                            },
                            34: {
                                quality: "360"
                            },
                            35: {
                                quality: "480"
                            }
                        },
                        MP4: {
                            18: {
                                quality: "360"
                            },
                            22: {
                                quality: "720"
                            },
                            37: {
                                quality: "1080"
                            },
                            38: {
                                quality: "8K"
                            },
                            59: {
                                quality: "480"
                            },
                            78: {
                                quality: "480"
                            },
                            82: {
                                quality: "360",
                                "3d": !0
                            },
                            83: {
                                quality: "240",
                                "3d": !0
                            },
                            84: {
                                quality: "720",
                                "3d": !0
                            },
                            85: {
                                quality: "1080",
                                "3d": !0
                            },
                            160: {
                                quality: "144",
                                noAudio: !0
                            },
                            133: {
                                quality: "240",
                                noAudio: !0
                            },
                            134: {
                                quality: "360",
                                noAudio: !0
                            },
                            135: {
                                quality: "480",
                                noAudio: !0
                            },
                            136: {
                                quality: "720",
                                noAudio: !0
                            },
                            137: {
                                quality: "1080",
                                noAudio: !0
                            },
                            212: {
                                quality: "480",
                                noAudio: !0
                            },
                            213: {
                                quality: "480",
                                noAudio: !0
                            },
                            214: {
                                quality: "720",
                                noAudio: !0
                            },
                            215: {
                                quality: "720",
                                noAudio: !0
                            },
                            264: {
                                quality: "1440",
                                noAudio: !0
                            },
                            138: {
                                quality: "8K",
                                noAudio: !0
                            },
                            298: {
                                quality: "720",
                                noAudio: !0,
                                sFps: !0
                            },
                            299: {
                                quality: "1080",
                                noAudio: !0,
                                sFps: !0
                            },
                            266: {
                                quality: "4K",
                                noAudio: !0
                            },
                            399: {
                                quality: "1080",
                                noAudio: !0
                            },
                            400: {
                                quality: "1440",
                                noAudio: !0
                            },
                            401: {
                                quality: "4K",
                                noAudio: !0
                            },
                            402: {
                                quality: "8K",
                                noAudio: !0
                            },
                            694: {
                                quality: "144",
                                noAudio: !0
                            },
                            695: {
                                quality: "240",
                                noAudio: !0
                            },
                            696: {
                                quality: "360",
                                noAudio: !0
                            },
                            697: {
                                quality: "480",
                                noAudio: !0
                            },
                            698: {
                                quality: "720",
                                noAudio: !0
                            },
                            699: {
                                quality: "1080",
                                noAudio: !0
                            },
                            700: {
                                quality: "1440",
                                noAudio: !0
                            },
                            701: {
                                quality: "4k",
                                noAudio: !0
                            },
                            702: {
                                quality: "8k",
                                noAudio: !0
                            },
                            571: {
                                quality: "8k",
                                noAudio: !0
                            }
                        },
                        WebM: {
                            43: {
                                quality: "360"
                            },
                            44: {
                                quality: "480"
                            },
                            45: {
                                quality: "720"
                            },
                            46: {
                                quality: "1080"
                            },
                            167: {
                                quality: "360",
                                noAudio: !0
                            },
                            168: {
                                quality: "480",
                                noAudio: !0
                            },
                            169: {
                                quality: "720",
                                noAudio: !0
                            },
                            170: {
                                quality: "1080",
                                noAudio: !0
                            },
                            218: {
                                quality: "480",
                                noAudio: !0
                            },
                            219: {
                                quality: "480",
                                noAudio: !0
                            },
                            242: {
                                quality: "240",
                                noAudio: !0
                            },
                            243: {
                                quality: "360",
                                noAudio: !0
                            },
                            244: {
                                quality: "480",
                                noAudio: !0
                            },
                            245: {
                                quality: "480",
                                noAudio: !0
                            },
                            246: {
                                quality: "480",
                                noAudio: !0
                            },
                            247: {
                                quality: "720",
                                noAudio: !0
                            },
                            248: {
                                quality: "1080",
                                noAudio: !0
                            },
                            271: {
                                quality: "1440",
                                noAudio: !0
                            },
                            272: {
                                quality: "8K",
                                noAudio: !0
                            },
                            278: {
                                quality: "144",
                                noAudio: !0
                            },
                            100: {
                                quality: "360",
                                "3d": !0
                            },
                            101: {
                                quality: "480",
                                "3d": !0
                            },
                            102: {
                                quality: "720",
                                "3d": !0
                            },
                            302: {
                                quality: "720",
                                noAudio: !0,
                                sFps: !0
                            },
                            303: {
                                quality: "1080",
                                noAudio: !0,
                                sFps: !0
                            },
                            308: {
                                quality: "1440",
                                noAudio: !0,
                                sFps: !0
                            },
                            313: {
                                quality: "4K",
                                noAudio: !0
                            },
                            315: {
                                quality: "4K",
                                noAudio: !0,
                                sFps: !0
                            },
                            330: {
                                quality: "144",
                                noAudio: !0,
                                sFps: !0
                            },
                            331: {
                                quality: "240",
                                noAudio: !0,
                                sFps: !0
                            },
                            332: {
                                quality: "360",
                                noAudio: !0,
                                sFps: !0
                            },
                            333: {
                                quality: "480",
                                noAudio: !0,
                                sFps: !0
                            },
                            334: {
                                quality: "720",
                                noAudio: !0,
                                sFps: !0
                            },
                            335: {
                                quality: "1080",
                                noAudio: !0,
                                sFps: !0
                            },
                            336: {
                                quality: "1440",
                                noAudio: !0,
                                sFps: !0
                            },
                            337: {
                                quality: "2160",
                                noAudio: !0,
                                sFps: !0
                            },
                            398: {
                                quality: "720",
                                noAudio: !0
                            },
                            397: {
                                quality: "480",
                                noAudio: !0
                            },
                            396: {
                                quality: "360",
                                noAudio: !0
                            },
                            395: {
                                quality: "240",
                                noAudio: !0
                            },
                            394: {
                                quality: "144",
                                noAudio: !0
                            }
                        },
                        "3GP": {
                            17: {
                                quality: "144"
                            },
                            36: {
                                quality: "240"
                            }
                        },
                        "Audio AAC": {
                            139: {
                                quality: "48",
                                ext: "m4a",
                                noVideo: !0
                            },
                            140: {
                                quality: "128",
                                ext: "m4a",
                                noVideo: !0
                            },
                            141: {
                                quality: "256",
                                ext: "m4a",
                                noVideo: !0
                            },
                            256: {
                                quality: "192",
                                ext: "m4a",
                                noVideo: !0
                            },
                            258: {
                                quality: "384",
                                ext: "m4a",
                                noVideo: !0
                            },
                            325: {
                                quality: "384",
                                ext: "m4a",
                                noVideo: !0
                            },
                            328: {
                                quality: "384",
                                ext: "m4a",
                                noVideo: !0
                            },
                            380: {
                                quality: "384",
                                ext: "m4a",
                                noVideo: !0
                            }
                        },
                        "Audio Vorbis": {
                            171: {
                                quality: "128",
                                ext: "webm",
                                noVideo: !0
                            },
                            172: {
                                quality: "192",
                                ext: "webm",
                                noVideo: !0
                            }
                        },
                        "Audio Opus": {
                            249: {
                                quality: "48",
                                ext: "opus",
                                noVideo: !0
                            },
                            250: {
                                quality: "128",
                                ext: "opus",
                                noVideo: !0
                            },
                            251: {
                                quality: "256",
                                ext: "opus",
                                noVideo: !0
                            }
                        }
                    },
                    init: function() {
                        if (!wt.video.yt.inited) {
                            [ "Audio AAC", "Audio Vorbis", "Audio Opus" ].forEach((function(e) {
                                var t = wt.video.yt.format[e];
                                for (var r in t) t[r].quality += " " + o.A.i18n.getMessage("kbps");
                            })), wt.video.yt.show3D = "0" == Et.preferences.ytHide3D, wt.video.yt.showMP4NoAudio = "0" == Et.preferences.ytHideMP4NoAudio;
                            var e = !1, t = !1;
                            for (var r in wt.video.yt.showFormat) {
                                var n = "ytHide" + r.replace(" ", "_");
                                "ytHideAudio_AAC" === n && (n = "ytHideAudio_MP4");
                                var i = "0" == Et.preferences[n];
                                "Audio AAC" === r && (t = i), wt.video.yt.showFormat[r] = i, i && (e = !0);
                            }
                            wt.video.yt.showFormat["Audio Vorbis"] = t, wt.video.yt.showFormat["Audio Opus"] = t, 
                            e || (wt.video.yt.showFormat.FLV = !0), wt.video.yt.inited = !0;
                        }
                    },
                    show: function(e, t, r, n, i) {
                        n = n || {};
                        var a = document.createElement("div");
                        wt.setStyle(a, {
                            display: "inline-block",
                            margin: "0 auto"
                        }), t.appendChild(a);
                        var s = document.createElement("div");
                        wt.setStyle(s, {
                            display: "inline-block",
                            padding: "0 90px 0 0",
                            position: "relative"
                        }), a.appendChild(s);
                        var u = document.createElement("table");
                        wt.setStyle(u, {
                            emptyCells: "show",
                            borderCollapse: "collapse",
                            margin: "0 auto",
                            padding: "0",
                            width: "auto"
                        }), s.appendChild(u);
                        var l = !1;
                        for (var c in wt.video.yt.format) wt.video.yt.append(e, c, wt.video.yt.format[c], u, n, i) && (l = !0);
                        for (var c in e) if ("ummy" !== c && "ummyAudio" !== c && "meta" !== c) {
                            wt.video.yt.append(e, "", null, u, n, i) && (l = !0);
                            break;
                        }
                        if (u.firstChild) {
                            if (l) {
                                var d = document.createElement("span");
                                if (d.textContent = o.A.i18n.getMessage("more") + " " + String.fromCharCode(187), 
                                wt.setStyle(d, {
                                    color: "#555",
                                    border: "1px solid #a0a0a0",
                                    borderRadius: "3px",
                                    display: "block",
                                    fontFamily: "Arial",
                                    fontSize: "15px",
                                    lineHeight: "17px",
                                    padding: "1px 5px",
                                    position: "absolute",
                                    bottom: "3px",
                                    right: "0",
                                    cursor: "pointer"
                                }), n.btn && "object" == typeof n.btn && wt.setStyle(d, n.btn), s.appendChild(d), 
                                d.addEventListener("click", (function(e) {
                                    e.preventDefault(), e.stopPropagation();
                                    for (var r = t.querySelectorAll("*[" + wt.video.dataAttr + "]"), n = 0; n < r.length; n++) {
                                        var i = r[n].getAttribute(wt.video.dataAttr), a = "none", s = String.fromCharCode(187);
                                        "0" == i ? (i = "1", a = "", s = String.fromCharCode(171)) : i = "0", r[n].style.display = a, 
                                        r[n].setAttribute(wt.video.dataAttr, i), this.textContent = o.A.i18n.getMessage("more") + " " + s;
                                    }
                                    return !1;
                                }), !1), 1 === r) {
                                    u.querySelector("td a");
                                    a.appendChild(document.createElement("br")), wt.appendDownloadInfo(a, "#a0a0a0", null, {
                                        width: "16px",
                                        height: "16px",
                                        fontSize: "16px",
                                        lineHeight: "16px"
                                    });
                                }
                            }
                        } else t.textContent = o.A.i18n.getMessage("noLinksFound");
                    },
                    append: function(e, t, r, n, i, a) {
                        var s = !1, u = {
                            whiteSpace: "nowrap"
                        }, l = {
                            fontSize: "75%",
                            fontWeight: "normal",
                            marginLeft: "3px",
                            whiteSpace: "nowrap"
                        }, c = document.createElement("tr"), d = document.createElement("td");
                        d.appendChild(document.createTextNode(t || "???")), t && wt.video.yt.showFormat[t] || (c.setAttribute(wt.video.dataAttr, "0"), 
                        c.style.display = "none", s = !0), wt.setStyle(d, {
                            border: "none",
                            padding: "3px 15px 3px 0",
                            textAlign: "left",
                            verticalAlign: "middle"
                        }), c.appendChild(d), d = document.createElement("td"), wt.setStyle(d, {
                            border: "none",
                            padding: "3px 0",
                            textAlign: "left",
                            verticalAlign: "middle",
                            lineHeight: "17px"
                        }), c.appendChild(d);
                        var p = e.meta || {}, A = !1;
                        if (r) {
                            for (var h in r) if (e[h]) {
                                var g = r[h].quality;
                                A && (d.lastChild.style.marginRight = "15px", d.appendChild(document.createTextNode(" ")));
                                var v = document.createElement("span");
                                v.style.whiteSpace = "nowrap";
                                var I = document.createElement("a");
                                if (I.href = e[h], I.title = o.A.i18n.getMessage("downloadTitle"), p[h] && (p[h].quality && (g = p[h].quality), 
                                r[h].sFps && (g += " " + (p[h].fps || 60))), r[h]["3d"] ? I.textContent = "3D" : I.textContent = g, 
                                a) {
                                    var C = r[h].ext;
                                    C || (C = t.toLowerCase()), I.setAttribute("download", f.A.modify(a + "." + C)), 
                                    I.addEventListener("click", (function(e) {
                                        wt.downloadOnClick(e);
                                    }), !1);
                                }
                                if (wt.setStyle(I, u), i.link && "object" == typeof i.link && wt.setStyle(I, i.link), 
                                v.appendChild(I), wt.appendFileSizeIcon(I, i.fsIcon, i.fsText), r[h]["3d"]) {
                                    wt.video.yt.show3D || (s = !0, v.setAttribute(wt.video.dataAttr, "0"), v.style.display = "none");
                                    var m = document.createElement("span");
                                    m.textContent = g, wt.setStyle(m, l), i.text && "object" == typeof i.text && wt.setStyle(m, i.text), 
                                    I.appendChild(m);
                                }
                                r[h].noAudio && (wt.video.yt.showMP4NoAudio || (s = !0, v.setAttribute(wt.video.dataAttr, "0"), 
                                v.style.display = "none"), wt.appendNoSoundIcon(I, !!i && i.noSoundIcon)), d.appendChild(v), 
                                A = !0, delete e[h];
                            }
                        } else for (var h in e) {
                            A && (d.lastChild.style.marginRight = "15px", d.appendChild(document.createTextNode(" ")));
                            var E = document.createElement("span");
                            E.style.whiteSpace = "nowrap";
                            var y = document.createElement("a");
                            y.href = e[h], y.title = o.A.i18n.getMessage("downloadTitle"), y.textContent = h, 
                            wt.setStyle(y, u), i.link && "object" == typeof i.link && wt.setStyle(y, i.link), 
                            E.appendChild(y), wt.appendFileSizeIcon(y, i.fsIcon, i.fsText), d.appendChild(E), 
                            A = !0, delete e[h];
                        }
                        if (!1 !== A) return n.appendChild(c), s;
                    }
                }
            },
            playlist: {
                btnStyle: {
                    display: "block",
                    fontWeight: "bold",
                    border: "none",
                    textDecoration: "underline"
                },
                getFilelistHtml: function(e) {
                    if (e && 0 != e.length) {
                        for (var t, r = 0, n = "", i = 0; i < e.length; i++) e[i].url && (n += e[i].url + "\r\n", 
                        r++);
                        if (n) return r < 5 ? r = 5 : r > 14 && (r = 14), A.A.create(document.createDocumentFragment(), {
                            append: [ A.A.create("p", {
                                text: o.A.i18n.getMessage("filelistTitle"),
                                style: {
                                    color: "#0D0D0D",
                                    fontSize: "20px",
                                    marginBottom: "11px",
                                    marginTop: "5px"
                                }
                            }), A.A.create("p", {
                                style: {
                                    marginBottom: "11px"
                                },
                                append: (0, h.A)(o.A.i18n.getMessage("filelistInstruction"))
                            }), A.A.create("p", {
                                text: o.A.i18n.getMessage("vkFoundFiles").replace("%d", e.length),
                                style: {
                                    color: "#000",
                                    marginBottom: "11px"
                                },
                                append: A.A.create("a", {
                                    text: o.A.i18n.getMessage("playlist"),
                                    href: "#",
                                    class: "sf__playlist",
                                    style: {
                                        display: "none",
                                        cssFloat: "right"
                                    }
                                })
                            }), t = A.A.create("textarea", {
                                text: n,
                                rows: r,
                                cols: 60,
                                style: {
                                    width: "100%",
                                    whiteSpace: o.A.isFirefox || o.A.isGM && !o.A.isTM ? "normal" : "nowrap"
                                }
                            }), o.A.isChrome || o.A.isFirefox ? A.A.create("button", {
                                text: o.A.i18n.getMessage("copy"),
                                style: {
                                    height: "27px",
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #9e9e9e",
                                    marginTop: "6px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    cssFloat: "right"
                                },
                                on: [ "click", function(e) {
                                    var r = this;
                                    r.disabled = !0, o.A.isFirefox ? (t.select(), document.execCommand("copy")) : o.A.sendMessage({
                                        action: "addToClipboard",
                                        text: n
                                    }), setTimeout((function() {
                                        r.disabled = !1;
                                    }), 1e3);
                                } ],
                                append: A.A.create("style", {
                                    text: (0, s.A)({
                                        "#savefrom_popup_box": {
                                            append: {
                                                "button:hover:not(:disabled)": {
                                                    backgroundColor: "#597A9E !important",
                                                    borderColor: "#597A9E !important",
                                                    color: "#fff"
                                                },
                                                "button:active": {
                                                    opacity: .9
                                                }
                                            }
                                        }
                                    })
                                })
                            }) : void 0 ]
                        });
                    }
                },
                popupFilelist: function(e, t, r, n) {
                    var o = wt.playlist.getFilelistHtml(e);
                    if (o) {
                        var i = wt.popupDiv(o, n);
                        if (r) {
                            var a = i.querySelector("a.sf__playlist");
                            a && (a.addEventListener("click", (function(r) {
                                return setTimeout((function() {
                                    wt.playlist.popupPlaylist(e, t, !0, n);
                                }), 100), r.preventDefault(), !1;
                            }), !1), wt.setStyle(a, wt.playlist.btnStyle));
                        }
                    }
                },
                getInfoPopupTemplate: function() {
                    var e = A.A.create("div", {
                        class: "sf-infoPopupTemplate",
                        style: {
                            width: "400px",
                            minHeight: "40px"
                        }
                    }), t = A.A.create("div", {
                        style: {
                            backgroundSize: "48px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center top",
                            display: "inline-block",
                            width: "60px",
                            height: "60px",
                            cssFloat: "left",
                            marginTop: "16px",
                            marginRight: "10px"
                        }
                    }), r = A.A.create("div", {
                        style: {
                            display: "inline-block",
                            width: "330px"
                        }
                    }), n = A.A.create("div", {
                        style: {
                            textAlign: "right"
                        },
                        append: A.A.create("style", {
                            text: (0, s.A)({
                                ".sf-infoPopupTemplate": {
                                    append: [ {
                                        "a.sf-button": {
                                            padding: "1px 6px",
                                            display: "inline-block",
                                            textAlign: "center",
                                            height: "23px",
                                            lineHeight: "23px",
                                            textDecoration: "none"
                                        }
                                    }, {
                                        selector: [ "button:hover", "a.sf-button:hover" ],
                                        style: {
                                            backgroundColor: "#597A9E !important",
                                            borderColor: "#597A9E !important",
                                            color: "#fff"
                                        }
                                    } ]
                                }
                            })
                        })
                    });
                    return e.appendChild(t), e.appendChild(r), e.appendChild(n), {
                        icon: t,
                        buttonContainer: n,
                        textContainer: r,
                        body: e
                    };
                },
                getM3U: function(e) {
                    for (var t = "#EXTM3U\r\n", r = 0; r < e.length; r++) e[r].duration || (e[r].duration = "-1"), 
                    (e[r].title || e[r].duration) && (t += "#EXTINF:" + e[r].duration + "," + e[r].title + "\r\n"), 
                    t += e[r].url + "\r\n";
                    return t;
                },
                getPlaylistHtml: function(e, t) {
                    if (e && 0 != e.length) {
                        var r = e.length, n = wt.dateToObj(), i = (n.year, n.month, n.day, n.hour, n.min, 
                        wt.playlist.getM3U(e));
                        (0, c.A)(i, "audio/x-mpegurl");
                        i = i.replace(/\r\n/g, "\n");
                        var a, s, u = (a = "audio/x-mpegurl", s = [], i.split("\n").forEach((e => {
                            if (e.startsWith("http") || e.startsWith("https")) {
                                var t, r = new Blob([ e ], {
                                    encoding: "UTF-8",
                                    type: a
                                });
                                t = URL.createObjectURL(r), s.push(t);
                            }
                        })), s), l = wt.playlist.getInfoPopupTemplate();
                        return o.A.sendMessage({
                            action: "getWarningIcon",
                            color: "#00CCFF",
                            type: "playlist"
                        }, (function(e) {
                            l.icon.style.backgroundImage = "url(" + e + ")";
                        })), A.A.create(l.textContainer, {
                            append: [ A.A.create("p", {
                                text: t || o.A.i18n.getMessage("playlistTitle"),
                                style: {
                                    color: "#0D0D0D",
                                    fontSize: "20px",
                                    marginBottom: "11px",
                                    marginTop: "13px"
                                }
                            }), A.A.create("p", {
                                text: o.A.i18n.getMessage("playlistInstruction"),
                                style: {
                                    color: "#868686",
                                    fontSize: "14px",
                                    marginBottom: "13px",
                                    lineHeight: "24px",
                                    marginTop: "0px"
                                }
                            }), A.A.create("a", {
                                text: o.A.i18n.getMessage("filelist") + " (" + r + ")",
                                href: "#",
                                class: "sf__playlist",
                                style: {
                                    display: "none",
                                    fontSize: "14px",
                                    marginBottom: "13px",
                                    lineHeight: "24px",
                                    marginTop: "0px"
                                }
                            }) ]
                        }), t || (t = "playlist"), A.A.create(l.buttonContainer, {
                            append: [ A.A.create("a", {
                                text: o.A.i18n.getMessage("download"),
                                href: "#",
                                class: "sf-button",
                                style: {
                                    width: "118px",
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #9e9e9e",
                                    margin: "12px",
                                    marginBottom: "11px",
                                    marginRight: "8px",
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    cursor: "pointer"
                                },
                                on: [ [ "click", function() {
                                    !function(e, t) {
                                        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100, n = 0;
                                        !function o() {
                                            if (!(n >= e.length)) {
                                                var i = e[n], a = f.A.modify(`${t}_${n + 1}.m3u`), s = document.createElement("a");
                                                s.href = i, s.download = a, s.style.display = "none", document.body.appendChild(s), 
                                                s.click(), document.body.removeChild(s), setTimeout((() => {
                                                    n++, o();
                                                }), r);
                                            }
                                        }();
                                    }(u, t, 700);
                                } ] ]
                            }) ]
                        }), l.body;
                    }
                },
                popupPlaylist: function(e, t, r, n) {
                    var o = wt.playlist.getPlaylistHtml(e, t);
                    if (o) {
                        var i = wt.popupDiv(o, n);
                        if (r) {
                            var a = i.querySelector("a.sf__playlist");
                            a && (a.addEventListener("click", (function(r) {
                                return setTimeout((function() {
                                    wt.playlist.popupFilelist(e, t, !0, n);
                                }), 100), r.preventDefault(), !1;
                            }), !1), a.style.display = "inline", a = null);
                        }
                        for (var s, u = i.querySelectorAll("a[download]"), l = 0; s = u[l]; l++) s.addEventListener("click", wt.downloadOnClick, !1);
                    }
                }
            },
            popupCloseBtn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAWUlEQVQ4y2NgGHHAH4j1sYjrQ+WIAvFA/B+I36MZpg8V+w9VQ9Al/5EwzDBkQ2AYr8uwaXiPQ0yfkKuwGUayIYQMI8kQqhlEFa9RLbCpFv1US5BUzSLDBAAARN9OlWGGF8kAAAAASUVORK5CYII=",
            popupDiv: function(e, t, r, n, o) {
                var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {
                    docCloseEnable: !0
                };
                t || (t = "savefrom_popup_box"), r || (r = 580), n || (n = 520);
                var a = document.getElementById(t);
                a && a.parentNode.removeChild(a), a = A.A.create("div", {
                    id: t,
                    style: {
                        zIndex: "9999",
                        display: "block",
                        cssFloat: "none",
                        position: "fixed",
                        margin: "0",
                        padding: "0",
                        visibility: "hidden",
                        color: "#000",
                        background: "#fff",
                        border: "3px solid #c0cad5",
                        borderRadius: "7px",
                        overflow: "auto"
                    }
                });
                var s = A.A.create("div", {
                    style: {
                        display: "block",
                        cssFloat: "none",
                        position: "relative",
                        overflow: "auto",
                        margin: "0",
                        padding: "10px 15px"
                    }
                });
                "function" == typeof e ? e(s) : s.appendChild(e);
                var u = A.A.create("img", {
                    src: wt.popupCloseBtn,
                    alt: "x",
                    width: 18,
                    height: 18,
                    style: {
                        position: "absolute",
                        top: "10px",
                        right: "15px",
                        opacity: "0.5",
                        cursor: "pointer"
                    },
                    on: [ [ "mouseenter", function() {
                        this.style.opacity = "0.9";
                    } ], [ "mouseleave", function() {
                        this.style.opacity = "0.5";
                    } ], [ "click", function() {
                        return a.parentNode && a.parentNode.removeChild(a), o && o(), !1;
                    } ] ]
                });
                s.appendChild(u), a.appendChild(s), document.body.appendChild(a), a.offsetWidth > r && (a.style.width = r + "px"), 
                a.offsetHeight > n && (a.style.height = n + "px", a.style.width = r + 20 + "px"), 
                setTimeout((function() {
                    var e = Math.floor((window.innerWidth - a.offsetWidth) / 2), t = Math.floor((window.innerHeight - a.offsetHeight) / 2);
                    t < 0 && (t = 0), -1 !== location.host.indexOf("youtu") && t < 92 && (t = 92, a.style.height = a.offsetHeight - t - 10 + "px"), 
                    e < 0 && (e = 0), wt.setStyle(a, {
                        top: t + "px",
                        left: e + "px",
                        visibility: "visible"
                    });
                }));
                var l = function e(t) {
                    if (i && !i.docCloseEnable) return !1;
                    var r = t.target;
                    r === a || wt.isParent(r, a) || (a.parentNode && a.parentNode.removeChild(a), document.removeEventListener("click", e, !1), 
                    o && o());
                };
                return setTimeout((function() {
                    document.addEventListener("click", l, !1);
                }), 100), a.addEventListener("close", (function() {
                    a.parentNode && a.parentNode.removeChild(a), document.removeEventListener("click", l, !1), 
                    o && o();
                })), a.addEventListener("kill", (function() {
                    a.parentNode && a.parentNode.removeChild(a), document.removeEventListener("click", l, !1);
                })), a;
            },
            popupDiv2: function(e) {
                var t = {
                    id: "savefrom_popup_box",
                    containerStyle: null,
                    bodyStyle: null,
                    content: null,
                    container: null,
                    body: null,
                    _onClose: function() {
                        document.removeEventListener("click", t._onClose), r.parentNode && r.parentNode.removeChild(r), 
                        t.onClose && t.onClose();
                    }
                };
                Object.assign(t, e);
                var r = t.container = A.A.create("div", {
                    id: t.id,
                    style: {
                        zIndex: 9999,
                        display: "block",
                        position: "fixed",
                        background: "#fff",
                        border: "3px solid #c0cad5",
                        borderRadius: "7px"
                    },
                    append: [ A.A.create("style", {
                        text: (0, s.A)({
                            selector: "#" + t.id,
                            style: p
                        })
                    }) ],
                    on: [ [ "click", function(e) {
                        e.stopPropagation();
                    } ] ]
                }), n = A.A.create("img", {
                    src: wt.popupCloseBtn,
                    alt: "x",
                    width: 18,
                    height: 18,
                    style: {
                        position: "absolute",
                        top: "10px",
                        right: "15px",
                        opacity: "0.5",
                        cursor: "pointer"
                    },
                    on: [ [ "mouseenter", function() {
                        this.style.opacity = "0.9";
                    } ], [ "mouseleave", function() {
                        this.style.opacity = "0.5";
                    } ], [ "click", t._onClose ] ]
                });
                r.appendChild(n);
                var o = t.body = A.A.create("div", {
                    style: i({
                        display: "block",
                        position: "relative",
                        padding: "10px 15px",
                        overflow: "auto"
                    }, t.bodyStyle)
                });
                return "function" == typeof t.content ? t.content(o) : o.appendChild(t.content), 
                r.appendChild(o), document.body.appendChild(r), document.addEventListener("click", t._onClose), 
                t;
            },
            showTooltip: function(e, t, r, n) {
                if (e) {
                    var o = document.querySelector(".savefrom-tooltip");
                    o || ((o = document.createElement("div")).className = "savefrom-tooltip", wt.setStyle(o, {
                        position: "absolute",
                        opacity: 0,
                        zIndex: -1
                    }), n && wt.setStyle(o, n)), o.textContent = t, o.lastNode && o.lastNode === e || (o.lastNode && (d.A.off(o.lastNode, "mouseleave", a), 
                    d.A.off(o.lastNode, "mousemove", i), o.lastRow && d.A.off(o.lastRow, "mouseleave", a)), 
                    o.lastNode = e, r && (o.lastRow = r), d.A.on(e, "mouseleave", a), d.A.on(e, "mousemove", i, !1), 
                    r && d.A.on(r, "mouseleave", a), document.body.appendChild(o)), i();
                }
                function i(t) {
                    void 0 !== t && t.stopPropagation();
                    var r = wt.getPosition(e), n = wt.getSize(o);
                    0 == r.top && 0 == r.left || (r.top = r.top - n.height - 10, r.left = r.left - n.width / 2 + wt.getSize(e).width / 2, 
                    r.left = Math.min(r.left, document.body.clientWidth + document.body.scrollLeft - n.width), 
                    r.top < document.body.scrollTop && (r.top = r.top + n.height + wt.getSize(e).height + 20), 
                    r.top += "px", r.left += "px", r.zIndex = 9999, r.opacity = 1, wt.setStyle(o, r));
                }
                function a() {
                    o.parentNode && document.body.removeChild(o), o.lastNode = null, o.lastRow = null, 
                    wt.setStyle(o, {
                        zIndex: -1,
                        opacity: 0
                    }), d.A.off(e, "mouseleave", a), d.A.off(e, "mousemove", i), r && d.A.off(r, "mouseleave", a);
                }
            },
            sendEvent: function(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                o.A.sendMessage({
                    action: "track",
                    t: "event",
                    tid: "G-94HR5L4844",
                    ec: e,
                    ea: t,
                    el: r
                });
            },
            BannerPro: function() {
                var e = wt.getZIndex(), t = vt.A.getSvgIconAsDataUri("bannerProClose");
                function r() {
                    var r = vt.A.getSvgIconAsDataUri("bannerProLogo"), n = A.A.create("div", {
                        style: {
                            position: "relative",
                            display: "grid",
                            gridTemplateColumns: "1.5fr 1fr",
                            gridGap: "20px",
                            flexWrap: "wrap",
                            width: "838px",
                            minHeight: "410px",
                            padding: "60px 40px",
                            marginBottom: "14px",
                            zIndex: e + 2,
                            borderRadius: "10px",
                            backgroundImage: "url('data:image/png;base64,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')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            boxSizing: "border-box"
                        }
                    }), o = A.A.create("img", {
                        src: t,
                        style: {
                            display: "inline-block",
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                            width: "20px",
                            height: "20px",
                            cursor: "pointer"
                        }
                    });
                    o.addEventListener("click", (() => {
                        var e;
                        (e = document.getElementById("sf-banner-pro")) && e.remove();
                    })), n.appendChild(o);
                    var i = A.A.create("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px"
                        },
                        append: [ A.A.create("h2", {
                            text: "Поддержите нас, оформив подписку!",
                            style: {
                                fontFamily: "Roboto",
                                fontSize: "40px",
                                fontWeight: "500",
                                lineHeight: "46px",
                                textAlign: "left",
                                color: "#FFFFFF"
                            }
                        }), A.A.create("p", {
                            text: "Наслаждайтесь скачиванием видео \n                  в лучшем качестве с любого сайта \n                  всего за 400₽/мес",
                            style: {
                                maxWidth: "75%",
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                lineHeight: "26px",
                                fontWeight: 400,
                                color: "#FFFFFF"
                            }
                        }), A.A.create("a", {
                            text: "Оформить подписку",
                            target: "_blank",
                            href: "https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=helperpro&OutSum=399&InvId=198813&Receipt=%257B%2522items%2522%253A%255B%257B%2522name%2522%253A%2522Helper%2520Pro%2520-%25201%2520%25D0%259C%25D0%25B5%25D1%2581%25D1%258F%25D1%2586%2522%252C%2522quantity%2522%253A1%252C%2522sum%2522%253A399%252C%2522tax%2522%253A%2522vat20%2522%257D%255D%257D&Description=Helper%20Pro%20-%201%20%D0%9C%D0%B5%D1%81%D1%8F%D1%86&Encoding=utf-8&SignatureValue=53477588196f8dda172002f5387bb87a05b39694cf66c2be0216ddd5ca69d4fe&Recurring=true",
                            style: {
                                display: "inline-block",
                                textDecoration: "none",
                                width: "fit-content",
                                padding: "10px 70px",
                                backgroundColor: "#1D1D1D",
                                color: "#FFFFFF",
                                fontSize: "14px",
                                lineHeight: "24px",
                                borderRadius: "100px",
                                border: "none",
                                fontWeight: 700,
                                fontFamily: "Roboto",
                                cursor: "pointer"
                            },
                            on: [ "click", function() {
                                bt("banner_pro", "subscribe_click");
                            } ]
                        }), A.A.create("a", {
                            text: "Подробней",
                            target: "_blank",
                            href: "https://sf-helper.net/pro2?utm_source=helper&utm_medium=subscription_popup&utm_campaign=pro",
                            style: {
                                display: "inline-block",
                                width: "fit-content",
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                lineHeight: "15px",
                                fontWeight: 400,
                                color: "#FFFFFF",
                                borderBottom: "1px solid #FFFFFF",
                                textDecoration: "none",
                                cursor: "pointer"
                            },
                            on: [ "click", function() {
                                bt("banner_pro", "learn_more_click");
                            } ]
                        }) ]
                    });
                    n.appendChild(i);
                    var a = A.A.create("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "20px"
                        },
                        append: [ A.A.create("img", {
                            src: r,
                            style: {
                                display: "inline-block",
                                height: "220px",
                                width: "220px"
                            }
                        }) ]
                    });
                    return n.appendChild(a), n;
                }
                this.showBannerPro = function() {
                    var e = A.A.create("div", {
                        id: "sf-banner-pro",
                        style: {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            zIndex: 999999,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.7)"
                        }
                    }), t = r();
                    e.appendChild(t), document.body.appendChild(e), bt("banner_pro", "show_subscription_popup");
                };
            },
            embedDownloader: {
                dataAttr: "data-savefrom-get-links",
                dataIdAttr: "data-savefrom-container-id",
                containerClass: "savefrom-links-container",
                linkClass: "savefrom-link",
                panel: null,
                lastLink: null,
                style: null,
                hostings: {
                    youtube: {
                        re: [ /^https?:\/\/(?:[a-z]+\.)?youtube\.com\/(?:#!?\/)?watch\?.*v=([\w\-]+)/i, /^https?:\/\/(?:[a-z0-9]+\.)?youtube\.com\/(?:embed|v)\/([\w\-]+)/i, /^https?:\/\/(?:[a-z]+\.)?youtu\.be\/([\w\-]+)/i ],
                        action: "getYoutubeLinks",
                        prepareLinks: function(e) {
                            var t = [], r = wt.video.yt.format, n = e.meta || {};
                            for (var o in r) for (var i in r[o]) {
                                var a = n[i] || {};
                                if (e[i]) {
                                    var s = o;
                                    r[o][i].ext && (s = r[o][i].ext);
                                    var u = r[o][i].quality;
                                    a.quality && (u = a.quality), r[o][i].sFps && (u += " " + (a.fps || 60)), r[o][i]["3d"] && (u += " (3d)"), 
                                    t.push({
                                        name: o + " " + u,
                                        type: s,
                                        url: e[i],
                                        noSound: r[o][i].noAudio
                                    });
                                }
                            }
                            return t;
                        }
                    },
                    vimeo: {
                        re: [ /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/(?:\w+\#)?(\d+)/i, /^https?:\/\/player\.vimeo\.com\/video\/(\d+)/i, /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/channels\/(?:[^\/]+)\/(\d+)$/i, /^https?:\/\/vimeo\.com\/(?:.+)clip_id=(\d+)/i ],
                        action: "getVimeoLinks",
                        prepareLinks: function(e) {
                            return e.map((function(e) {
                                var t = e.ext;
                                return t || (t = "MP4", -1 != e.url.search(/\.flv($|\?)/i) && (t = "FLV")), e.name = e.name ? e.name : t, 
                                e.type = e.type ? e.type : t, e.ext = t, e;
                            }));
                        }
                    },
                    vk: {
                        re: [ /^https?:\/\/(?:[\w\-]+\.)?(?:vk\.com|vkontakte\.ru)\/(?:[^\/]+\/)*(?:[\w\-\.]+\?.*z=)?(video-?\d+_-?\d+\?list=[0-9a-z]+|video-?\d+_-?\d+)/i, /^https?:\/\/(?:[\w\-]+\.)?(?:vk\.com|vkontakte\.ru)\/video_ext\.php\?(.+)/i ],
                        action: "getVKLinks"
                    },
                    dailymotion: {
                        re: [ /^http:\/\/(?:www\.)?dai\.ly\/([a-z0-9]+)_?/i, /^https?:\/\/(?:[\w]+\.)?dailymotion\.com(?:\/embed|\/swf)?\/video\/([a-z0-9]+)_?/i ],
                        action: "getDailymotionLinks"
                    },
                    facebook: {
                        re: [ /^https?:\/\/(?:[\w]+\.)?facebook\.com(?:\/video)?\/video.php.*[?&]{1}v=([0-9]+).*/i, /^https?:\/\/(?:[\w]+\.)?facebook\.com\/.+\/videos(?:\/\w[^\/]+)?\/(\d+)/i ],
                        action: "getFacebookLinks"
                    }
                },
                init: function(e) {
                    this.style = e, this.panel && wt.popupMenu.removePanel(), this.panel = null, this.lastLink = null;
                    var t, r = document.querySelectorAll("a[" + this.dataAttr + "]"), n = r.length;
                    for (t = 0; t < n; t++) [ "savefrom.net", "sf-addon.com" ].indexOf(wt.getTopLevelDomain(r[t].hostname)) > -1 && (r[t].removeEventListener("click", this.onClick, !1), 
                    r[t].addEventListener("click", this.onClick, !1));
                    document.body && (document.body.removeEventListener("click", this.onBodyClick, !0), 
                    document.body.addEventListener("click", this.onBodyClick, !0));
                },
                checkUrl: function(e) {
                    for (var t in this.hostings) for (var r = this.hostings[t], n = 0, o = r.re.length; n < o; n++) {
                        var i = e.match(r.re[n]);
                        if (i) return {
                            hosting: t,
                            action: r.action,
                            extVideoId: i[1]
                        };
                    }
                    return null;
                },
                reMapHosting: function(e) {
                    return {
                        getYoutubeLinks: "youtube",
                        getVimeoLinks: "vimeo",
                        getDailymotionLinks: "dailymotion",
                        getFacebookLinks: "facebook",
                        getVKLinks: "vk"
                    }[e];
                },
                onClick: function(e, t) {
                    var r = wt.embedDownloader;
                    if (!t) {
                        for (t = e.target; t.parentNode && "A" !== t.nodeName; ) t = t.parentNode;
                        if (!t) return;
                    }
                    var n = t.getAttribute("data-savefrom-get-links");
                    if (n && 0 === e.button && !e.ctrlKey && !e.shiftKey) {
                        if (r.lastLink === t && r.panel && "none" != r.panel.style.display) return r.lastLink = null, 
                        r.panel.style.display = "none", e.preventDefault(), void e.stopPropagation();
                        r.lastLink = t;
                        var i = r.checkUrl(n);
                        if (i) {
                            e.preventDefault(), e.stopPropagation();
                            var a = {
                                action: i.action,
                                extVideoId: i.extVideoId
                            };
                            return r.showLinks(o.A.i18n.getMessage("download") + " ...", null, t), o.A.sendMessage(a, (function(e) {
                                var n = i.hosting;
                                e.action != a.action && (n = r.reMapHosting(e.action)), e.links ? r.showLinks(e.links, e.title, t, n, !0) : r.showLinks(o.A.i18n.getMessage("noLinksFound"), null, t, void 0, !0);
                            })), !1;
                        }
                    }
                },
                onBodyClick: function(e) {
                    var t = wt.embedDownloader, r = e.target;
                    if (!t.panel || "none" == t.panel.style.display) {
                        if ("A" !== r.tagName && (0, u.A)(r, "A " + r.tagName)) for (;r.parentNode && "A" !== r.tagName; ) r = r.parentNode;
                        if ("A" !== r.nodeName) return;
                        return r.hasAttribute(t.dataAttr) && [ "savefrom.net", "sf-addon.com" ].indexOf(wt.getTopLevelDomain(r.hostname)) > -1 ? t.onClick(e, r) : void 0;
                    }
                    t.panel === r || t.panel.contains(r) || (t.lastLink = null, t.panel.style.display = "none", 
                    e.preventDefault(), e.stopPropagation());
                },
                hidePanel: function() {
                    this.panel && (this.panel.style.display = "none");
                },
                createMenu: function(e, t, r, n, i) {
                    var a = o.A.i18n.getMessage("noLinksFound");
                    "string" == typeof e ? a = e : void 0 !== wt.popupMenu.prepareLinks[n] && e && (a = wt.popupMenu.prepareLinks[n](e, t));
                    var s = {
                        links: a,
                        button: r,
                        popupId: void 0,
                        showFileSize: !0,
                        containerClass: this.containerClass,
                        linkClass: this.linkClass,
                        style: {
                            popup: this.style ? this.style.container : void 0,
                            item: this.style ? this.style.link : void 0
                        },
                        isUpdate: i
                    };
                    i && this.panel ? wt.popupMenu.update(this.panel, s) : this.panel = wt.popupMenu.create(s);
                },
                showLinks: function(e, t, r, n, i) {
                    var a, s = r.getAttribute(this.dataIdAttr);
                    if (s && (a = document.getElementById(s)), a) if (this.panel && (this.panel.style.display = "none"), 
                    "string" == typeof e) a.textContent = e; else if (e && 0 != e.length) {
                        n && this.hostings[n] && this.hostings[n].prepareLinks && (e = this.hostings[n].prepareLinks(e)), 
                        a.textContent = "";
                        for (var u = 0; u < e.length; u++) if (e[u].url && e[u].name) {
                            (r = document.createElement("a")).href = e[u].url, r.title = o.A.i18n.getMessage("downloadTitle"), 
                            r.appendChild(document.createTextNode(e[u].name));
                            var l = document.createElement("span");
                            l.className = this.linkClass, l.appendChild(r), a.appendChild(l), wt.appendFileSizeIcon(r), 
                            e[u].noSound && wt.appendNoSoundIcon(r), t && !e[u].noTitle && e[u].type && (r.setAttribute("download", f.A.modify(t + "." + e[u].type.toLowerCase())), 
                            r.addEventListener("click", wt.downloadOnClick, !1));
                        }
                    } else a.textContent = o.A.i18n.getMessage("noLinksFound"); else this.createMenu(e, t, r, n, i);
                }
            },
            popupMenu: {
                popupId: "sf_popupMenu",
                popup: void 0,
                popupStyle: void 0,
                dataArrtVisible: "data-isVisible",
                extStyleCache: void 0,
                ummyIcon: null,
                badgeQualityList: [ "8K", "4K", "2160", "1440", "1080", "720", "ummy", "mp3", "4320" ],
                createProBadge(e) {
                    return (0, b.A)([ "userInfo" ]).then((e => e.userInfo && e.userInfo.isPremium)).then((t => {
                        var r = A.A.create("div", {
                            style: {
                                display: "inline-block"
                            }
                        }), n = {
                            display: "inline-block",
                            backgroundColor: "#505050",
                            lineHeight: "18px",
                            color: "#fff",
                            fontSize: "12px",
                            fontFamily: "'Roboto', sans-serif",
                            borderRadius: "2px",
                            verticalAlign: "middle",
                            textAlign: "center",
                            paddingRight: "2px",
                            paddingLeft: "2px",
                            fontWeight: "bold",
                            marginLeft: "3px",
                            borderBottomRightRadius: t ? "2px" : 0,
                            borderTopRightRadius: t ? "2px" : 0
                        }, o = A.A.create("div", {
                            text: this.prepareQualityLabel(e),
                            style: n
                        });
                        if (r.appendChild(o), !t) {
                            var i = A.A.create("div", {
                                text: "PRO",
                                style: Ct(Ct({}, n), {}, {
                                    width: "auto",
                                    backgroundColor: "#54B85B",
                                    marginLeft: 0,
                                    borderBottomRightRadius: "3px",
                                    borderTopRightRadius: "3px"
                                })
                            });
                            r.appendChild(i);
                        }
                        return r;
                    }));
                },
                prepareQualityLabel(e) {
                    var t = String(e);
                    if ([ "1080", "720", "1440" ].includes(t)) return "HD";
                    return {
                        2160: "4K",
                        4320: "8K",
                        hls: "HLS",
                        1440: "QHD"
                    }[t] || t.toUpperCase();
                },
                createBadge: function(e, t) {
                    t = t || {};
                    var r = {
                        display: "inline-block",
                        lineHeight: "18px",
                        width: "19px",
                        height: "17px",
                        color: "#fff",
                        fontSize: "12px",
                        borderRadius: "2px",
                        verticalAlign: "middle",
                        textAlign: "center",
                        paddingRight: "2px",
                        fontWeight: "bold",
                        marginLeft: "3px"
                    };
                    for (var n in t.containerStyle) r[n] = t.containerStyle[n];
                    var o = A.A.create("div", {
                        style: r
                    });
                    return "HLS" === e ? (o.textContent = "HLS", o.style.width = "26px", o.style.paddingRight = "1px", 
                    o.style.backgroundColor = "#505050") : "1080" === e || "2160" === e || "1440" === e || "720" === e ? (o.textContent = "HD", 
                    o.style.backgroundColor = "#505050", o.style.paddingRight = "1px") : "8K" === e || "4K" === e ? (o.textContent = "HD", 
                    o.style.paddingRight = "1px", o.style.backgroundColor = "rgb(247, 180, 6)") : "mp3" !== e && "MP3" !== e || (o.textContent = "MP3", 
                    o.style.width = "26px", o.style.paddingRight = "1px", o.style.backgroundColor = "#505050"), 
                    o;
                },
                getTitleNode: function(e) {
                    var t = wt.popupMenu, r = A.A.create("span", {
                        style: {
                            cssFloat: "left"
                        }
                    });
                    if ("converter" === e.extra) {
                        var n = document.createDocumentFragment();
                        -1 !== [ "MP3", "8K", "4K", "1440", "1080", "720" ].indexOf(e.format) ? n.appendChild(t.createBadge(e.format, {
                            containerStyle: {
                                marginLeft: 0
                            }
                        })) : n.appendChild(document.createTextNode(e.format)), A.A.create(r, {
                            append: [ n, " ", e.quality ]
                        }), n = null;
                    } else if (e.itemText) r.textContent = e.itemText; else {
                        var o = e.quality ? " " + e.quality : "";
                        "mp3" === e.quality && "pro" === e.itag && (o = "");
                        var i = e.format ? e.format : "???", a = e["3d"] ? "3D " : "", s = "";
                        e.sFps && (s += " " + (e.fps || 60)), r.textContent = a + i + o + s;
                    }
                    return "pro" === e.itag ? t.createProBadge(String(e.quality)).then((e => {
                        e && r.appendChild(e);
                    })) : -1 !== t.badgeQualityList.indexOf(String(e.quality)) && r.appendChild(t.createBadge(String(e.quality))), 
                    r;
                },
                createPopupItem: function(e, t) {
                    var r, n = wt.popupMenu;
                    if ("-" === (r = "string" == typeof e ? e : e.href)) return {
                        el: A.A.create("div", {
                            style: {
                                display: "block",
                                margin: "1px 0",
                                borderTop: "1px solid rgb(214, 214, 214)"
                            }
                        })
                    };
                    var i = document.createElement("-text-" === r ? "div" : "a");
                    t.linkClass && i.classList.add(t.linkClass);
                    var a = {
                        display: "block",
                        padding: "0 5px",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        overflow: "hidden"
                    };
                    if (e.isHidden && (i.setAttribute(n.dataArrtVisible, "0"), a.display = "none"), 
                    wt.setStyle(i, a), "televzr" === e.itag) {
                        var s = document.createElement("div");
                        return (0, w.A)((0, y.n)(ue, {
                            openUrl: e.href
                        }), s), {
                            el: s,
                            prop: e
                        };
                    }
                    if ("-text-" === r) return i.style.lineHeight = "22px", {
                        el: i
                    };
                    if (i.href = r, "#" === r) return {
                        el: i
                    };
                    if ((o.A.isGM || o.A.isSafari) && (e.extra || (i.title = o.A.i18n.getMessage("downloadTitle"))), 
                    e.forceDownload && !e.forceConverter) {
                        var u = "";
                        if (e.title) {
                            var l = (e.ext || e.format || "").toLowerCase();
                            l && (l = "." + l), u = e.title + l;
                        }
                        i.setAttribute("download", f.A.modify(u)), i.addEventListener("click", (function(e) {
                            wt.downloadOnClick(e, null, {
                                el: this
                            });
                        }), !1);
                    }
                    var c = [];
                    e.func && (Array.isArray(e.func) ? c.push.apply(c, e.func) : c.push(e.func)), t.onItemClick && -1 === c.indexOf(t.onItemClick) && c.push(t.onItemClick), 
                    c.length && i.addEventListener("click", (function(t) {
                        var r = this;
                        c.forEach((function(n) {
                            return n.call(r, t, e);
                        }));
                    }), !1), e.isBlank && i.setAttribute("target", "_blank"), i.appendChild(n.getTitleNode(e));
                    var p = A.A.create("span", {
                        style: {
                            cssFloat: "right",
                            lineHeight: "22px",
                            height: "22px"
                        }
                    }), h = {
                        top: "5px",
                        verticalAlign: "top"
                    };
                    for (var g in t.sizeIconStyle) h[g] = t.sizeIconStyle[g];
                    e.noAudio && wt.appendNoSoundIcon(p, h);
                    var v = null;
                    return e.noSize || (p.addEventListener("click", (function e(t) {
                        "IMG" === p.firstChild.tagName && (t.preventDefault(), t.stopPropagation(), d.A.trigger(p.firstChild, "click", {
                            cancelable: !0
                        })), this.removeEventListener("click", e);
                    })), v = wt.appendFileSizeIcon(i, h, {
                        marginLeft: 0
                    }, void 0, !0, p, e)), i.appendChild(p), {
                        el: i,
                        sizeIcon: v,
                        prop: e
                    };
                },
                sortMenuItems: function(e, t) {
                    void 0 === t && (t = {});
                    var r = [ "HLS", "Audio Opus", "Audio Vorbis", "Audio AAC", "3GP", "WebM", "FLV", "MP4" ], n = {
                        Mobile: 280,
                        LD: 280,
                        SD: 360,
                        HD: 720,
                        ummy: 1
                    };
                    t.strQualityExtend && Object.assign(n, t.strQualityExtend);
                    var o = {}, i = [], a = [], s = [], u = [], l = [], c = [], d = [], p = [];
                    e.forEach((function(e) {
                        var r = e.prop;
                        t.noProp && (r = e);
                        var A = r.sort || {};
                        if (!r.format) return p.push(e), 1;
                        if (r.isOther) p.push(e); else if (r.isSubtitle) u.push(e); else if (r.noVideo) i[r.quality] = parseInt(r.quality), 
                        s.push(e); else {
                            var h = A.size || n[r.quality] || -1;
                            if (-1 === h && (h = "K" === String(r.quality).substr(-1) ? 1e3 * parseInt(r.quality) : parseInt(r.quality)), 
                            t.maxSize && h > t.maxSize) return 1;
                            if (t.minSize && h < t.minSize) return 1;
                            o[r.quality] = h, r.noAudio ? r.sFps ? l.push(e) : c.push(e) : r["3d"] ? d.push(e) : a.push(e);
                        }
                    }));
                    var A = function(e, t) {
                        return e.noVideo && t.noVideo ? function(e, t) {
                            return i[e.quality] > i[t.quality] ? -1 : i[e.quality] === i[t.quality] ? 0 : 1;
                        }(e, t) : e.noVideo ? 1 : t.noVideo || r.indexOf(e.format) > r.indexOf(t.format) ? -1 : r.indexOf(e.format) === r.indexOf(t.format) ? 0 : 1;
                    }, h = function(e, r) {
                        var n = e.prop, i = r.prop;
                        t.noProp && (n = e, i = r);
                        var a = function(e, t) {
                            var r = o[e.quality], n = o[t.quality];
                            return isNaN(r) && isNaN(n) ? 0 : isNaN(r) ? -1 : isNaN(n) ? 1 : r > n ? -1 : r === n ? 0 : 1;
                        }(n, i);
                        return 0 !== a ? a : A(n, i);
                    };
                    a.sort(h), d.sort(h), s.sort(h), l.sort(h), c.sort(h);
                    var f = null;
                    return t.typeList ? (f = [], -1 !== t.typeList.indexOf("video") && (f = f.concat(a)), 
                    -1 !== t.typeList.indexOf("3d") && (f = f.concat(d)), -1 !== t.typeList.indexOf("audio") && (f = f.concat(s)), 
                    -1 !== t.typeList.indexOf("mute") && (f = f.concat(c)), -1 !== t.typeList.indexOf("mute60") && (f = f.concat(l)), 
                    -1 !== t.typeList.indexOf("subtitles") && (f = f.concat(u)), -1 !== t.typeList.indexOf("other") && (f = f.concat(p))) : f = a.concat(d, s, u, l, c, p), 
                    t.groupCompare && f.sort(h), f.sort(((e, t) => {
                        var r = e.itag || e.prop && e.prop.itag, n = t.itag || t.prop && t.prop.itag;
                        return "pro" !== r && "pro" !== n || r === n ? 0 : "pro" === r ? -1 : 1;
                    })), f;
                },
                removePanel: function() {
                    null !== this.popup.parentNode && this.popup.parentNode.removeChild(this.popup), 
                    void 0 !== this.popupStyle && null !== this.popupStyle.parentNode && this.popupStyle.parentNode.removeChild(this.popupStyle), 
                    this.popup = void 0, this.popupStyle = void 0;
                },
                getContent: function(e) {
                    var t = this, r = e.links, n = document.createDocumentFragment(), i = [];
                    if (e.title) {
                        var a = t.createPopupItem("-text-", e).el;
                        a.textContent = e.title, a.style.color = "rgb(109, 104, 104)", a.fontStyle = "italic", 
                        n.appendChild(a);
                    }
                    if ("string" == typeof r) {
                        var s = t.createPopupItem("-text-", e).el;
                        s.textContent = r, n.appendChild(s);
                    } else if (0 === r.length) {
                        var u = t.createPopupItem("-text-", e).el;
                        u.textContent = o.A.i18n.getMessage("noLinksFound"), n.appendChild(u);
                    } else {
                        var l = [];
                        r.forEach((function(r) {
                            l.push(t.createPopupItem(r, e));
                        })), l = t.sortMenuItems(l, e.sortDetails), (0, w.A)((0, y.n)(nt), n);
                        var c = [];
                        l.forEach((function(t) {
                            if (t.prop.isHidden) return c.push(t.el), 1;
                            n.appendChild(t.el), e.showFileSize && t.sizeIcon && i.push(t.sizeIcon);
                        })), e.visibleCount = l.length - c.length, c.length > 0 && (e.getHiddenListFunc ? n.appendChild(e.getHiddenListFunc(c, e)) : (0, 
                        w.A)((0, y.n)(Ne, {
                            SaveFrom_Utils: wt,
                            hiddenItems: l.filter((e => e.prop.isHidden)).map((e => e.prop))
                        }), n));
                    }
                    return {
                        sizeIconList: i,
                        content: n
                    };
                },
                selectedAudioLanguage: null,
                updateSelectedAudioLanguage: function(e) {
                    var t = wt.popupMenu;
                    return t.selectedAudioLanguage = e, t.selectedAudioLanguage;
                },
                changeSelectedAudioLanguage: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r = wt.popupMenu;
                    r.updateSelectedAudioLanguage(e), t && r.update(r.popup, t);
                },
                getLanguageList: function(e) {
                    if (e.multiLang) {
                        var t, r, n, o = document.createDocumentFragment(), i = wt.popupMenu, a = e.multiLang, s = a.variants, u = a.audioDefault, l = (t, r) => {
                            var n = e;
                            r.key !== u.audioTrack.id ? n.links = n.links.map((e => {
                                if (!1 === e.isHidden && (e.isHidden = !0, e.wasShown = !0), "muxer" === e.itag) {
                                    var t = e.mmProps.sources.filter((e => "m4a" !== e.format));
                                    e.func = n => {
                                        n.preventDefault(), (0, w.A)((0, y.n)(E.Ay, Ct(Ct({}, e.mmProps), {}, {
                                            sources: [ ...t, {
                                                url: s[r.key].url,
                                                format: "m4a"
                                            } ]
                                        })), "sf-muxer-parent");
                                    };
                                }
                                return e;
                            })) : n.links = n.links.map((e => (e.wasShown && (e.isHidden = !1), "muxer" === e.itag && (e.func = t => {
                                t.preventDefault(), (0, w.A)((0, y.n)(E.Ay, e.mmProps), "sf-muxer-parent");
                            }), e))), i.changeSelectedAudioLanguage(s[r.key], n);
                            var o = A.A.create("span", {
                                text: n.transformLangForDownloadBtn(s, s[r.key].audioTrack.id),
                                style: {
                                    marginLeft: "6px",
                                    verticalAlign: "bottom"
                                }
                            });
                            n.updateLangOnDownloadBtn(o);
                        }, c = Object.values(s).map((e => ({
                            langName: e.audioTrack.displayName,
                            func: l,
                            key: e.audioTrack.id
                        }))), d = c.filter((e => e.langName === u.audioTrack.displayName)).pop(), p = c.indexOf(d);
                        return -1 !== p && (c.splice(p, 1), d.langName += "(default)", c.unshift(d)), (0, 
                        w.A)((0, y.n)(Ze, {
                            SaveFrom_Utils: wt,
                            hiddenItems: c,
                            defaultLang: u,
                            selectedLanguage: null !== (t = null === (r = i.selectedAudioLanguage) || void 0 === r || null === (n = r.audioTrack) || void 0 === n ? void 0 : n.displayName) && void 0 !== t ? t : u.audioTrack.displayName
                        }), o), o;
                    }
                    return null;
                },
                create: function(e) {
                    var t, r = e.button, n = wt.popupMenu;
                    if (e.linkClass = e.linkClass || "sf-menu-item", e.offsetRight = e.offsetRight || 0, 
                    e.offsetTop = e.offsetTop || 0, e.parent = e.parent || document.body, !e.isUpdate || void 0 !== n.popup && "none" !== n.popup.style.display) {
                        n.popup && n.removePanel();
                        var o = n.popup = document.createElement("div"), i = "#" + n.popupId;
                        e.popupId ? (i = "#" + e.popupId, o.id = e.popupId) : e.containerClass ? (i = "." + e.containerClass, 
                        o.classList.add(e.containerClass)) : o.id = n.popupId;
                        var a = {
                            display: "block",
                            position: "absolute",
                            minHeight: "24px",
                            cursor: "default",
                            textAlign: "left",
                            whiteSpace: "nowrap",
                            fontFamily: "arial, sans-serif"
                        };
                        e.extStyle && delete a.display;
                        var u = {
                            "background-color": "#fff",
                            "z-index": "9999",
                            "box-shadow": "0 2px 10px 0 rgba(0,0,0,0.2)",
                            border: "1px solid #ccc",
                            "border-radius": "3px",
                            "font-size": "12px",
                            "font-weight": "bold",
                            "min-width": "190px"
                        }, l = wt.getPosition(r, e.parent), c = wt.getSize(r);
                        if (a.top = l.top + e.offsetTop + c.height + "px", a.left = l.left + e.offsetRight + "px", 
                        null != e && e.style && null != e && null !== (t = e.style) && void 0 !== t && t.popup && (a = Ct(Ct({}, a), u)), 
                        wt.setStyle(o, a), e.style && e.style.popup) for (var p in e.style.popup) {
                            var h = e.style.popup[p];
                            u[p] = h;
                        }
                        wt.addStyleRules(i, u);
                        var f = {
                            "line-height": "24px",
                            color: "#3D3D3D"
                        };
                        if (e.style && e.style.item) for (var p in e.style.item) {
                            h = e.style.item[p];
                            f[p] = h;
                        }
                        wt.addStyleRules(i + " ." + e.linkClass, f);
                        var g = function(e) {
                            e.stopPropagation();
                        };
                        for (A.A.create(o, {
                            on: [ [ "click", g ], [ "mouseover", g ], [ "mouseup", g ], [ "mousedown", g ], [ "mouseout", g ] ]
                        }); null !== o.firstChild; ) o.removeChild(o.firstChild);
                        var v = n.getContent.call(n, e), I = v.sizeIconList;
                        v = v.content, o.appendChild(v);
                        var C = "#2F8AFF", m = "#fff";
                        e.style && e.style.hover && (C = e.style.hover.backgroundColor || C, m = e.style.hover.color || m);
                        var E = n.popupStyle = document.createElement("style");
                        if (E.textContent = (0, s.A)({
                            selector: i,
                            append: {
                                "a:hover": {
                                    backgroundColor: C,
                                    color: m
                                },
                                "> a:first-child": {
                                    borderTopLeftRadius: "3px",
                                    borderTopRightRadius: "3px"
                                },
                                "> a:last-child": {
                                    borderBottomLeftRadius: "3px",
                                    borderBottomRightRadius: "3px"
                                }
                            }
                        }), e.parent.appendChild(E), e.parent.appendChild(o), e.extStyle) {
                            void 0 !== wt.popupMenu.extStyleCache && null !== wt.popupMenu.extStyleCache.parentNode && wt.popupMenu.extStyleCache.parentNode.removeChild(wt.popupMenu.extStyleCache);
                            var y = "sf-extElStyle_" + i.substr(1), w = "sf-extBodyStyle_" + i.substr(1);
                            null === document.querySelector("style." + w) && document.body.appendChild(A.A.create("style", {
                                class: w,
                                text: (0, s.A)({
                                    selector: i,
                                    style: {
                                        display: "none"
                                    }
                                })
                            })), wt.popupMenu.extStyleCache = e.extStyle.appendChild(A.A.create("style", {
                                class: y,
                                text: (0, s.A)({
                                    selector: "body " + i,
                                    style: {
                                        display: "block"
                                    }
                                })
                            }));
                        }
                        return setTimeout((function() {
                            I.forEach((function(e) {
                                d.A.trigger(e, "click", {
                                    bubbles: !1,
                                    cancelable: !0
                                });
                            }));
                        })), o;
                    }
                },
                update: function(e, t) {
                    for (var r = wt.popupMenu; null !== e.firstChild; ) e.removeChild(e.firstChild);
                    if (t && t.multiLang) {
                        var n = r.getLanguageList(t);
                        r.selectedAudioLanguage || r.updateSelectedAudioLanguage(t.multiLang.audioDefault), 
                        n && e.appendChild(n);
                    }
                    var o = r.getContent.call(r, t), i = o.sizeIconList;
                    o = o.content, e.appendChild(o), setTimeout((function() {
                        i.forEach((function(e) {
                            d.A.trigger(e, "click", {
                                bubbles: !1,
                                cancelable: !0
                            });
                        }));
                    }));
                },
                preprocessItem: {
                    srt2url: function(e, t) {
                        var r = e.srt, n = (0, c.A)(r, "text/plain");
                        t.ext = "srt", t.format = "SRT", t.href = n, t.noSize = !0;
                    }
                },
                prepareLinks: {
                    youtube(e, t, r, n) {
                        n = n || {}, r = r || [], e = Object.assign({}, e), !wt.popupMenu.selectedAudioLanguage && e.multiLang && wt.popupMenu.updateSelectedAudioLanguage(e.multiLang.audioDefault);
                        var i = wt.video.yt;
                        i.init();
                        var a = [], s = null, u = e.meta || {};
                        Object.keys(i.format).forEach((function(r) {
                            var n = i.format[r];
                            return Object.keys(n).forEach((function(o) {
                                var l = e[o];
                                if (l) {
                                    var c = !1;
                                    i.showFormat[r] || (c = !0);
                                    var d = n[o];
                                    if (d["3d"] && !i.show3D && (c = !0), d.noAudio && !i.showMP4NoAudio && (c = !0), 
                                    s = {
                                        href: l,
                                        isHidden: c,
                                        title: t,
                                        format: r,
                                        itag: o,
                                        forceDownload: !0
                                    }, Et.preferences.ffmpegEnabled && e.meta[o].isVideoLink && parseInt(e.meta[o].quality) <= 720 && d.noAudio) {
                                        var p = e.meta[Object.keys(e.meta).find((t => e.meta[t].isAudioLink))];
                                        s.func = function(e) {
                                            e.preventDefault(), e.stopPropagation();
                                            var r = {
                                                filename: `${t}.mp4`,
                                                sources: [ {
                                                    url: l,
                                                    format: "mp4"
                                                }, {
                                                    url: p.url,
                                                    format: "m4a"
                                                } ],
                                                format: "mp4"
                                            };
                                            (0, w.A)((0, y.n)(E.Ay, r), "sf-muxer-parent");
                                        }, d.noAudio = !1, s.href = "#muxer", s.itag = "muxer";
                                    }
                                    var A = u[o];
                                    A && (A.quality && (s.quality = A.quality), A.fps && (s.fps = A.fps)), a.push(s), 
                                    delete e[o];
                                }
                            }));
                        })), e.televzr && (a.push({
                            itag: "televzr",
                            format: "televzr",
                            quality: "televzr",
                            href: e.televzr,
                            noSize: !0
                        }), delete e.televzr), Et.preferences.ffmpegEnabled && u.muxer && ((s = {
                            href: "#muxer",
                            fps: u.muxer.fps,
                            quality: u.muxer.quality,
                            format: u.muxer.format,
                            itag: "muxer",
                            uQuality: u.muxer.quality,
                            noSize: !0,
                            mmProps: u.muxer.mmProps
                        }).func = e => {
                            e.preventDefault(), e.stopPropagation(), o.A.sendMessage({
                                action: "checkAndOpenProLanding",
                                id: "muxer"
                            });
                            var t = s.mmProps ? s.mmProps : u.muxer.mmProps;
                            wt.popupMenu.selectedAudioLanguage && (t = Ct(Ct({}, t), {}, {
                                sources: [ ...t.sources.filter((e => "m4a" !== e.format)), {
                                    url: wt.popupMenu.selectedAudioLanguage.url,
                                    format: "m4a"
                                } ]
                            })), (0, w.A)((0, y.n)(E.Ay, t), "sf-muxer-parent"), o.A.sendMessage({
                                action: "track",
                                t: "event",
                                tid: "G-L0GP1RQSBJ",
                                el: `mp4_${u.muxer.quality}_conv`,
                                ec: "download",
                                ea: `mp4_${u.muxer.quality}_conv`
                            });
                        }, a.push(s)), Object.keys(e).forEach((function(r) {
                            "meta" !== r && "multiLang" !== r && (s = {
                                href: e[r],
                                isHidden: !0,
                                title: t,
                                quality: u[r].quality || r,
                                itag: r,
                                forceDownload: !0
                            }, a.push(s), delete e[r]);
                        })), Object.keys(e.meta).forEach((t => {
                            if (-1 !== t.indexOf("pro")) {
                                var r = e.meta[t];
                                a.push({
                                    href: "#pro",
                                    isHidden: !1,
                                    noSize: !0,
                                    format: r.format,
                                    noVideo: r.noVideo,
                                    itag: "pro",
                                    func: e => {
                                        e.preventDefault(), d.A.trigger(document, "mousedown");
                                        var t = document.body.querySelector("#savefrom__yt_btn"), n = Boolean(document.body.querySelector("#sfYtFrameBtn")), o = {
                                            position: "absolute"
                                        };
                                        !t && n && (o.right = "0", t = document.body.querySelector(".sf-btn-ctr")), t || (o.position = "relative", 
                                        t = A.A.create("div", {
                                            style: {
                                                position: "fixed",
                                                zIndex: 999999,
                                                bottom: "30px",
                                                right: "0"
                                            }
                                        }), document.body.appendChild(t)), (0, w.A)((0, y.n)(ft, {
                                            link: r,
                                            positionStyle: o
                                        }), t);
                                    },
                                    quality: String(r.quality)
                                });
                            }
                        })), r.forEach((function(e) {
                            s = {
                                href: e.url,
                                isHidden: !0,
                                quality: "SRT" + (e.isAuto ? "A" : ""),
                                itemText: o.A.i18n.getMessage("subtitles") + " (" + e.lang + ")",
                                title: t + "-" + e.langCode,
                                ext: "vtt",
                                format: "VTT",
                                isSubtitle: !0,
                                langCode: e.langCode,
                                forceDownload: !0
                            }, "srt2url" === e.preprocess && wt.popupMenu.preprocessItem.srt2url(e, s), a.push(s);
                        })), u.extra && u.extra.forEach((function(e) {
                            s = {
                                href: "#" + e.extra,
                                noSize: !0,
                                isHidden: !1
                            }, Object.assign(s, e), e.itag && Object.keys(i.format).some((function(t) {
                                var r = i.format[t][e.itag];
                                if (r) return Object.assign(s, r), !0;
                            })), e.request && (s.func = function(t) {
                                return t.preventDefault(), o.A.sendMessage(e.request);
                            }), s.noAudio = !1, a.push(s);
                        }));
                        var l = {
                            menuLinks: a
                        };
                        return e.multiLang && (l.multiLang = e.multiLang), l;
                    },
                    vimeo: function(e, t) {
                        var r, n = [];
                        return e.forEach((function(e) {
                            var o = e.ext;
                            o || (o = "mp4", -1 != e.url.search(/\.flv($|\?)/i) && (o = "flv"));
                            var i = e.height || "", a = e.type;
                            "hls" === (r = {
                                href: e.url,
                                title: t,
                                ext: o,
                                format: a,
                                quality: i,
                                forceDownload: !0
                            }).format && (r.href = "#muxer", r.cdn = e.cdn, r.forceDownload = !1, r.func = () => {
                                var e = {
                                    filename: `${t}.mp4`,
                                    format: "mp4",
                                    sources: [ {
                                        url: r.cdn.url,
                                        format: "mp4"
                                    } ],
                                    convertType: "hls"
                                }, n = document.createElement("div");
                                n.style.position = "fixed", n.style.top = "0px", n.style.left = "0px", n.style.right = "0px", 
                                n.style.bottom = "0px", n.id = "sf-muxer-wrapper", (0, w.A)((0, y.n)(E.Ay, e), "#sf-muxer-wrapper");
                            }), n.push(r);
                        })), n;
                    },
                    vk: function(e, t) {
                        var r, n = [];
                        return e.forEach((function(e) {
                            var o = e.name || e.ext;
                            o && (o = o.toLowerCase());
                            var i = o && o.toUpperCase() || "", a = e.subname || "";
                            r = {
                                href: e.url,
                                title: t,
                                ext: o,
                                format: i,
                                quality: a,
                                forceDownload: !0
                            }, n.push(r);
                        })), n;
                    },
                    dailymotion: function(e, t) {
                        var r = [];
                        return e.forEach((function(e) {
                            var n = null;
                            "ummy" === e.extra ? (n = {
                                href: e.url,
                                quality: "ummy",
                                noSize: !0,
                                format: "ummy",
                                videoId: e.videoId,
                                sort: {
                                    size: 480
                                }
                            }, "ummyAudio" === e.type && (n.uQuality = "mp3", n.uIsAudio = !0)) : n = {
                                href: e.url,
                                title: t,
                                ext: e.ext,
                                format: e.ext,
                                quality: e.height || "",
                                forceDownload: !0
                            }, r.push(n);
                        })), r;
                    },
                    facebook: function(e, t) {
                        var r, n = [];
                        return e.forEach((function(e) {
                            var o = e.ext, i = o ? o.toUpperCase() : "", a = e.name;
                            r = {
                                href: e.url,
                                title: t,
                                ext: o,
                                format: i,
                                quality: a,
                                forceDownload: !0
                            }, n.push(r);
                        })), n;
                    },
                    rutube: function(e) {
                        if (Array.isArray(e) && (e = e[0]), "string" == typeof e) {
                            var t = e.match(/\/embed\/(\d+)/);
                            return (t = t && t[1] || void 0) || (t = (t = e.match(/\/video\/([0-9a-z]+)/)) && t[1] || void 0), 
                            /\/\/video\./.test(e) && (e = e.replace(/\/\/video\./, "//"), t || (t = (t = e.match(/\/(\d+)$/)) && t[1] || void 0)), 
                            t && (t = "rt-" + t), [];
                        }
                    },
                    mailru: function(e, t) {
                        var r, n = [];
                        return e.forEach((function(e) {
                            var o = e.ext, i = e.name, a = e.subname;
                            r = {
                                href: e.url,
                                title: t,
                                ext: o,
                                format: i,
                                quality: a,
                                forceDownload: !0
                            }, n.push(r);
                        })), n;
                    }
                },
                quickInsert: function(e, t, r, n) {
                    n = n || {};
                    var o = {}, i = function t(r) {
                        r && (r.target === e || e.contains(r.target)) || o.isShow && (s.style.display = "none", 
                        d.A.off(document, "mousedown", t), o.isShow = !1, n.onHide && n.onHide(s));
                    }, a = {
                        links: t,
                        button: e,
                        popupId: r,
                        showFileSize: !0
                    };
                    Object.assign(a, n);
                    var s = wt.popupMenu.create(a);
                    return n.onShow && n.onShow(s), d.A.off(document, "mousedown", i), d.A.on(document, "mousedown", i), 
                    Object.assign(o, {
                        button: e,
                        isShow: !0,
                        el: s,
                        hide: i,
                        update(e, t, r) {
                            t && (a.title = t), a.links = e, a.multiLang = r, wt.popupMenu.update(s, a);
                        }
                    });
                }
            },
            frameMenu: {
                getBtn: function(e) {
                    var t = {
                        verticalAlign: "middle",
                        position: "absolute",
                        zIndex: 999,
                        fontFamily: "arial, sans-serif"
                    };
                    for (var r in e.containerStyle) t[r] = e.containerStyle[r];
                    var n = e.quickBtnStyleObj || {
                        display: "inline-block",
                        fontSize: "inherit",
                        height: "22px",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        borderRadius: "3px",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        paddingRight: 0,
                        paddingLeft: "28px",
                        cursor: "pointer",
                        verticalAlign: "middle",
                        position: "relative",
                        lineHeight: "22px",
                        textDecoration: "none",
                        zIndex: 1,
                        color: "#fff"
                    };
                    e.singleBtn && !e.quickBtnStyleObj && (delete n.borderTopRightRadius, delete n.borderBottomRightRadius);
                    var o = {
                        position: "relative",
                        display: "inline-block",
                        fontSize: "inherit",
                        height: "24px",
                        padding: 0,
                        paddingRight: "21px",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        borderLeft: 0,
                        borderRadius: "3px",
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                        cursor: "pointer",
                        color: "#fff",
                        zIndex: 0,
                        verticalAlign: "middle",
                        marginLeft: 0,
                        boxSizing: "border-box",
                        lineHeight: "22px"
                    };
                    for (var r in e.selectBtnStyle) o[r] = e.selectBtnStyle[r];
                    var i, a = e.quickBtnIcon || A.A.create("i", {
                        style: {
                            position: "absolute",
                            display: "inline-block",
                            left: "6px",
                            top: "3px",
                            backgroundImage: "url(" + wt.svg.getSrc("download", "#ffffff") + ")",
                            backgroundSize: "12px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            width: "16px",
                            height: "16px"
                        }
                    }), u = e.selectBtnIcon || A.A.create("i", {
                        style: {
                            position: "absolute",
                            display: "inline-block",
                            top: "9px",
                            right: "6px",
                            border: "5px solid #FFF",
                            borderBottomColor: "transparent",
                            borderLeftColor: "transparent",
                            borderRightColor: "transparent"
                        }
                    }), l = A.A.create("div", {
                        id: e.btnId,
                        style: t,
                        on: e.on,
                        append: [ i = A.A.create("a", {
                            class: "sf-quick-btn",
                            style: n,
                            href: "#",
                            append: [ a ]
                        }), A.A.create("style", {
                            text: (0, s.A)({
                                selector: "#" + e.btnId,
                                style: e.nodeCssStyle || {
                                    opacity: .8,
                                    display: "none"
                                },
                                append: [ {
                                    "button::-moz-focus-inner": {
                                        padding: 0,
                                        margin: 0
                                    },
                                    ".sf-quick-btn": e.quickBtnCssStyle || {
                                        backgroundColor: "rgba(28,28,28,0.1)"
                                    },
                                    ".sf-select-btn": {
                                        backgroundColor: "rgba(28,28,28,0.1)"
                                    }
                                }, {
                                    selector: [ ":hover", ".sf-over" ],
                                    join: "",
                                    style: {
                                        opacity: 1
                                    },
                                    append: {
                                        ".sf-quick-btn": e.quickBtnOverCssStyle || {
                                            backgroundColor: "rgba(0, 163, 80, 0.5)"
                                        },
                                        ".sf-select-btn": {
                                            backgroundColor: "rgba(60, 60, 60, 0.5)"
                                        }
                                    }
                                }, {
                                    join: "",
                                    ".sf-over": {
                                        append: {
                                            ".sf-select-btn": {
                                                backgroundColor: "rgba(28,28,28,0.8)"
                                            }
                                        }
                                    },
                                    ".sf-show": {
                                        display: "block"
                                    }
                                } ]
                            })
                        }) ]
                    }), c = null, d = null;
                    return e.singleBtn || (d = function(e) {
                        var t = "object" == typeof e ? e : document.createTextNode(e), r = c.firstChild;
                        r === u ? c.insertBefore(t, r) : c.replaceChild(t, r);
                    }, c = A.A.create("button", {
                        class: "sf-select-btn",
                        style: o,
                        on: e.onSelectBtn,
                        append: [ u ]
                    }), l.appendChild(c)), {
                        node: l,
                        setQuality: d,
                        setLoadingState: function() {
                            d(A.A.create("img", {
                                src: wt.svg.getSrc("info", "#ffffff"),
                                style: {
                                    width: "14px",
                                    height: "14px",
                                    marginLeft: "6px",
                                    verticalAlign: "middle",
                                    top: "-1px",
                                    position: "relative"
                                }
                            }));
                        },
                        selectBtn: c,
                        quickBtn: i
                    };
                },
                getHiddenList: function(e, t) {
                    var r = wt.popupMenu, n = r.createPopupItem("-text-", t).el;
                    A.A.create(n, {
                        text: o.A.i18n.getMessage("more") + " " + String.fromCharCode(187),
                        style: {
                            cursor: "pointer"
                        },
                        on: [ "click", function() {
                            for (var e, t = this.parentNode.querySelectorAll("*[" + r.dataArrtVisible + "]"), n = 0; e = t[n]; n++) e.style.display = "block", 
                            e.setAttribute(r.dataArrtVisible, 1);
                            this.parentNode.removeChild(this);
                        } ]
                    });
                    var i = document.createDocumentFragment();
                    return i.appendChild(n), A.A.create(i, {
                        append: e
                    }), 0 === t.visibleCount && d.A.trigger(n, "click", {
                        cancelable: !0
                    }), i;
                },
                getMenuContainer: function(e) {
                    var t = wt.popupMenu, r = e.button, n = e.popupId, o = A.A.create("div", {
                        style: {
                            position: "absolute",
                            minHeight: "24px",
                            cursor: "default",
                            textAlign: "left",
                            whiteSpace: "nowrap",
                            overflow: "auto"
                        }
                    });
                    "#" === n[0] ? o.id = n.substr(1) : o.classList.add(n);
                    var i = t.getContent(e);
                    o.appendChild(i.content), setTimeout((function() {
                        i.sizeIconList.forEach((function(e) {
                            d.A.trigger(e, "click", {
                                bubbles: !1,
                                cancelable: !0
                            });
                        }));
                    }));
                    var a = wt.getPosition(r, e.parent), u = wt.getSize(r), l = function(e) {
                        e.stopPropagation();
                    }, c = a.top + u.height, p = {
                        top: c + "px",
                        maxHeight: document.body.offsetHeight - c - 40 + "px"
                    };
                    return e.leftMenuPos ? p.left = a.left + "px" : p.right = document.body.offsetWidth - a.left - u.width + "px", 
                    A.A.create(o, {
                        style: p,
                        on: [ [ "click", l ], [ "mouseover", l ], [ "mouseup", l ], [ "mousedown", l ], [ "mouseout", l ], [ "wheel", function(e) {
                            (e.wheelDeltaY > 0 && 0 === this.scrollTop || e.wheelDeltaY < 0 && this.scrollHeight - (this.offsetHeight + this.scrollTop) <= 0) && e.preventDefault();
                        } ] ],
                        append: [ A.A.create("style", {
                            text: (0, s.A)({
                                selector: ("#" === n[0] ? "" : ".") + n,
                                style: {
                                    display: "none",
                                    fontFamily: "arial, sans-serif",
                                    backgroundColor: "rgba(28,28,28,0.8)",
                                    zIndex: 9999,
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    minWidth: "190px",
                                    color: "#fff"
                                },
                                append: [ {
                                    join: "",
                                    ".sf-show": {
                                        display: "block"
                                    },
                                    "::-webkit-scrollbar-track": {
                                        backgroundColor: "#424242"
                                    },
                                    "::-webkit-scrollbar": {
                                        width: "10px",
                                        backgroundColor: "#424242"
                                    },
                                    "::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#8e8e8e"
                                    }
                                }, {
                                    ".sf-menu-item": {
                                        lineHeight: "24px",
                                        color: "#fff"
                                    },
                                    ".sf-menu-item:hover": {
                                        backgroundColor: "#1c1c1c"
                                    }
                                } ]
                            })
                        }) ]
                    }), o;
                },
                getMenu: function(e, t, r, n) {
                    var o = {
                        links: t,
                        button: e,
                        popupId: r || "#sf-frame-menu",
                        showFileSize: !0,
                        sizeIconStyle: {
                            color: "#fff"
                        },
                        linkClass: "sf-menu-item",
                        bindUmmyInfoDetails: {
                            posLeft: !0,
                            widthLimit: 480,
                            container: n.container,
                            createUmmyInfoDetails: {
                                posLeft: !0,
                                darkTheme: !0
                            }
                        },
                        getHiddenListFunc: this.getHiddenList.bind(this)
                    };
                    for (var i in n) o[i] = n[i];
                    var a = this.getMenuContainer(o);
                    (o.container || document.body).appendChild(a);
                    var s = function() {
                        a.parentNode && a.parentNode.removeChild(a), u.isShow = !1, o.onHide && o.onHide();
                    };
                    o.onShow && o.onShow(a), d.A.off(document, "mousedown", s), d.A.on(document, "mousedown", s);
                    var u = {
                        isShow: !0,
                        el: a,
                        hide: s,
                        update: function(e) {
                            var t = wt.popupMenu, r = a.lastChild;
                            a.textContent = "", o.links = e;
                            var n = t.getContent(o);
                            setTimeout((function() {
                                n.sizeIconList.forEach((function(e) {
                                    d.A.trigger(e, "click", {
                                        bubbles: !1,
                                        cancelable: !0
                                    });
                                }));
                            })), a.appendChild(n.content), a.appendChild(r);
                        }
                    };
                    return u;
                }
            },
            mobileLightBox: {
                id: "sf-lightbox",
                clear: function() {
                    var e = document.getElementById(wt.mobileLightBox.id);
                    null !== e && e.parentNode.removeChild(e);
                },
                getTitle: function(e) {
                    var t = [];
                    if (t.push(e.format || "???"), e.quality) {
                        var r = e.quality;
                        e.sFps && (r += " " + (e.fps || 60)), t.push(r);
                    }
                    return e["3d"] && t.push("3D"), e.noAudio && t.push(o.A.i18n.getMessage("withoutAudio")), 
                    t.join(" ");
                },
                createItem: function(e) {
                    var t = wt.mobileLightBox, r = A.A.create("a", {
                        style: {
                            display: "block",
                            marginBottom: "6px",
                            border: "solid 1px #d3d3d3",
                            lineHeight: "36px",
                            minHeight: "36px",
                            background: "#f8f8f8",
                            verticalAlign: "middle",
                            fontSize: "15px",
                            textAlign: "center",
                            color: "#333",
                            borderRadius: "2px",
                            overflow: "hidden",
                            position: "relative"
                        }
                    }), n = "";
                    if (e.title) {
                        var o = (e.ext || e.format || "").toLowerCase();
                        o && (o = "." + o), n = f.A.modify(e.title + o);
                    }
                    if ("string" == typeof e) return r.textContent = e, r;
                    r.href = e.href, r.download = n, r.textContent = t.getTitle(e), r.addEventListener("click", (function(t) {
                        e.func && e.func(t), "muxer" !== e.itag && e.forceDownload && wt.downloadOnClick(t, null, {
                            el: this
                        });
                    })), e.isHidden && (r.classList.add("isOptional"), r.style.display = "none");
                    if (!e.noSize) {
                        var i = wt.getFileSizeIcon({
                            cssFloat: "right",
                            lineHeight: "36px",
                            fontSize: "75%",
                            marginRight: "10px"
                        }, {
                            padding: "10px",
                            verticalAlign: "middle",
                            lineHeight: 0
                        }, {
                            width: "16px",
                            height: "16px"
                        }, {
                            url: e.href
                        });
                        r.appendChild(i.node);
                    }
                    return r;
                },
                getItems: function(e) {
                    var t = wt.mobileLightBox;
                    if ("string" == typeof e) return {
                        list: [ t.createItem(e) ],
                        hiddenCount: 0
                    };
                    for (var r, n = [], o = 0; r = e[o]; o++) [ "ummy", "televzr" ].includes(r.quality) || r.extra || n.push({
                        el: t.createItem(r),
                        prop: r
                    });
                    n = wt.popupMenu.sortMenuItems(n);
                    var i = [], a = [];
                    for (o = 0; r = n[o]; o++) r.prop.isHidden ? a.push(r.el) : i.push(r.el);
                    return {
                        list: i.concat(a),
                        hiddenCount: a.length
                    };
                },
                show: function(e) {
                    var t, r = wt.mobileLightBox, n = window.pageYOffset, i = window.innerHeight, a = parseInt(i / 100 * 15), s = void 0, u = function(e) {
                        return i - 46 * (e ? 2 : 1) - 2 * a;
                    }, l = function(e) {
                        e.hiddenCount > 0 ? (s.style.height = u(1) + "px", t.style.display = "block") : (t.style.display = "none", 
                        s.style.height = u(0) + "px"), e.hiddenCount === e.list.length && c(t);
                    }, c = function(e) {
                        var t = "none", r = e.parentNode.querySelectorAll(".isOptional");
                        "open" !== e.dataset.state ? (e.dataset.state = "open", e.textContent = o.A.i18n.getMessage("more") + " " + String.fromCharCode(171), 
                        t = "block") : (e.dataset.state = "close", e.textContent = o.A.i18n.getMessage("more") + " " + String.fromCharCode(187));
                        for (var n, i = 0; n = r[i]; i++) n.style.display = t;
                    }, d = document.getElementById(r.id);
                    null !== d && d.parentNode.removeChild(d);
                    var p = window.innerWidth;
                    p = p <= 250 ? "90%" : "70%", e && 0 !== e.length || (e = o.A.i18n.getMessage("noLinksFound"));
                    var h = r.getItems(e), f = A.A.create("div", {
                        id: r.id,
                        style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            zIndex: 9e3,
                            height: document.body.scrollHeight + "px",
                            background: "rgba(0,0,0,0.85)",
                            textAlign: "center",
                            boxSizing: "content-box"
                        },
                        on: [ [ "click", function(e) {
                            e.preventDefault(), I();
                        } ] ],
                        append: A.A.create("div", {
                            style: {
                                display: "inline-block",
                                width: p,
                                backgroundColor: "#eee",
                                height: i - 2 * a + "px",
                                marginTop: a + n + "px",
                                borderRadius: "4px",
                                padding: "8px",
                                position: "relative",
                                boxSizing: "content-box"
                            },
                            append: [ s = A.A.create("div", {
                                style: {
                                    overflowY: "auto",
                                    marginBottom: "6px"
                                },
                                append: h.list,
                                on: [ "touchmove", function(e) {
                                    e.stopPropagation();
                                } ]
                            }), t = A.A.create(r.createItem(o.A.i18n.getMessage("more") + " " + String.fromCharCode(187)), {
                                href: "#",
                                on: [ "click", function(e) {
                                    e.preventDefault(), c(this);
                                } ]
                            }), A.A.create(r.createItem(o.A.i18n.getMessage("close")), {
                                style: {
                                    marginBottom: 0
                                },
                                on: [ "click", function(e) {
                                    e.preventDefault(), I();
                                } ]
                            }) ],
                            on: [ "click", function(e) {
                                e.stopPropagation();
                            } ]
                        })
                    });
                    l(h), document.body.appendChild(f);
                    var g = document.body.scrollTop, v = {}, I = function() {
                        v.isShow && (document.body.scrollTop = g, v.hide());
                    };
                    return Object.assign(v, {
                        isShow: !0,
                        el: f,
                        hide: function() {
                            f.parentNode && f.parentNode.removeChild(f), v.isShow = !1;
                        },
                        close: I,
                        update: function(e) {
                            if (null !== f.parentNode) {
                                e && 0 !== e.length || (e = o.A.i18n.getMessage("noLinksFound")), s.textContent = "";
                                var t = r.getItems(e);
                                A.A.create(s, {
                                    append: t.list
                                }), l(t);
                            }
                        }
                    });
                }
            },
            bridge: function(e) {
                e.args = e.args || [], void 0 === e.timeout && (e.timeout = 300);
                var t = "sf-bridge-" + parseInt(1e3 * Math.random()) + "-" + Date.now();
                window.addEventListener("sf-bridge-" + t, (function r(n) {
                    var o;
                    window.removeEventListener("sf-bridge-" + t, r), o = n.detail ? JSON.parse(n.detail) : void 0, 
                    e.cb(o);
                }));
                var r = '(function(func,args,scriptId,timeout){/* fix */var node=document.getElementById(scriptId);if(node){node.parentNode.removeChild(node)}var fired=false;var done=function done(data){if(fired){return}fired=true;var event=new CustomEvent("sf-bridge-"+scriptId,{detail:JSON.stringify(data)});window.dispatchEvent(event)};timeout&&setTimeout(function(){done()},timeout);args.push(done);func.apply(null,args)})(' + [ e.func.toString(), JSON.stringify(e.args), JSON.stringify(t), parseInt(e.timeout) ].join(",") + ");";
                if (o.A.isSafari) {
                    r = r.replace("/* fix */", "(" + function() {
                        "undefined" == typeof CustomEvent && (CustomEvent = function(e, t) {
                            t = t || {
                                bubbles: !1,
                                cancelable: !1
                            };
                            var r = document.createEvent("CustomEvent");
                            return r.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), r;
                        }, CustomEvent.prototype = window.Event.prototype);
                    }.toString() + ")();");
                }
                var n = A.A.create("script", {
                    id: t,
                    text: r
                });
                document.body.appendChild(n);
            },
            openMediaOnSaveFrom(e) {
                window.open("https://ru.savefrom.net/#url=" + e, "_blank");
            }
        };
        function bt(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            o.A.sendMessage({
                action: "track",
                t: "event",
                tid: "G-94HR5L4844",
                ec: e,
                ea: t,
                el: r
            });
        }
        wt.TutorialTooltip = function(e) {
            var t = this;
            this.details = {
                btnTopOffset: -3,
                btnLeftOffset: 0
            }, e.parent && yt && (e.parent = e.parent.parentNode.parentNode), Object.assign(this.details, e), 
            this.onResize = this.onResize.bind(this), this.onResizeDebouce = a(this.onResize, 250), 
            this.onClose = this.onClose.bind(this), this.target = e.target, "1" !== this.target.dataset.sfHasTooltip && (this.target.dataset.sfHasTooltip = "1", 
            this.tooltipNode = this.getNode(), this.target.addEventListener("mouseup", this.onClose), 
            this.target.addEventListener(d.A.onRemoveEventName, (function() {
                t.onClose && t.onClose(1);
            })), this.tooltipNodeBtn = e.btnObj.node, window.addEventListener("resize", this.onResizeDebouce), 
            this.onResize(), this.makeBtnAsTooltipItem(this.tooltipNodeBtn), this.tooltipNode && (e.parent || document.body).appendChild(this.tooltipNode), 
            this.tooltipNode && document.body.appendChild(this.createTooltipOverlay()), bt("banner_pro", "show_tips"));
        }, wt.getZIndex = function() {
            var e = 1e3, t = document.getElementById("masthead-positioner"), r = t && window.getComputedStyle(t, null);
            return r && (e = parseInt(r.getPropertyValue("z-index"))), e;
        }, wt.TutorialTooltip.prototype.makeBtnAsTooltipItem = function(e) {
            var t = wt.getZIndex();
            e.style.zIndex = t + 2, e.style.pointerEvents = "none";
        }, wt.TutorialTooltip.prototype.removeBtnFromTooltip = function() {
            this.tooltipNodeBtn && (this.tooltipNodeBtn.style.zIndex = "unset", this.tooltipNodeBtn.style.pointerEvents = "auto");
        }, wt.TutorialTooltip.prototype.removeTooltipOverlay = function() {
            var e = document.getElementById("sf-tooltip-overlay");
            e && e.remove();
        }, wt.TutorialTooltip.prototype.createTooltipOverlay = function() {
            var e = document.createElement("div"), t = wt.getZIndex();
            return t += 1, e.style.position = "fixed", e.style.top = "0", e.style.left = "0", 
            e.style.bottom = "0", e.style.right = "0", e.style.width = "100%", e.style.height = "100%", 
            e.style.backgroundColor = "rgba(15, 15, 15, 0.7)", e.style.zIndex = t, e.id = "sf-tooltip-overlay", 
            e;
        }, wt.TutorialTooltip.prototype.getNode = function() {
            var e = this, t = wt.getZIndex();
            if (t += 2, yt) var r = A.A.create("div", {
                class: "sf-tooltip",
                style: {
                    top: "-20px",
                    display: "flex"
                },
                on: [ "mouseup", function(e) {
                    e.stopPropagation();
                } ],
                append: [ A.A.create("div", {
                    style: {
                        height: "40px",
                        backgroundColor: "#4D4D4D",
                        paddingBottom: "10px",
                        maxWidth: "220px",
                        minWidth: "220px",
                        lineHeight: "16px",
                        fontSize: "14px",
                        fontFamily: "font-family: arial, sans-serif",
                        color: "#fff",
                        display: "flex"
                    },
                    append: [ A.A.create("div", {
                        style: {
                            width: "60%",
                            margin: "0 0 5px 10px"
                        },
                        append: [ A.A.create("span", {
                            style: {
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                                display: "inline-block"
                            },
                            text: "Just hold"
                        }), A.A.create("div", {
                            style: {
                                display: "inline-block",
                                position: "relative",
                                margin: "4px 4px 0 4px",
                                width: "27px",
                                height: "18px",
                                backgroundColor: "black",
                                borderRadius: "5px",
                                border: "1px solid black",
                                borderBottom: "3px solid black"
                            },
                            append: [ A.A.create("div", {
                                style: {
                                    fontWeight: "bold",
                                    fontSize: "8px",
                                    textAlign: "center",
                                    zIndex: 1,
                                    position: "relative",
                                    width: "27px",
                                    height: "18px",
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: "5px"
                                },
                                append: [ A.A.create("span", {
                                    style: {
                                        display: "inline-block",
                                        marginTop: "2px"
                                    },
                                    text: "option"
                                }) ]
                            }) ]
                        }), A.A.create("span", {
                            style: {
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold"
                            },
                            text: "and click on Download"
                        }) ]
                    }), A.A.create("a", {
                        class: "sf-button",
                        text: "OK",
                        style: {
                            height: "18px",
                            width: "50px",
                            display: "inline-block",
                            textAlign: "center",
                            textDecoration: "none",
                            padding: "0 10px",
                            cssFloat: "right",
                            marginTop: "25px",
                            lineHeight: "20px",
                            borderRadius: "3px",
                            fontSize: "12px",
                            color: "#fff",
                            fontWeight: "bolder",
                            backgroundColor: "#167AC6",
                            cursor: "pointer"
                        },
                        on: [ "click", function(t) {
                            t.preventDefault(), e.onClose && e.onClose();
                        } ]
                    }), A.A.create("style", {
                        text: (0, s.A)({
                            ".sf-tooltip": {
                                position: "absolute",
                                zIndex: t + 2,
                                append: {
                                    ".sf-button:hover": {
                                        backgroundColor: "#126db3 !important"
                                    },
                                    ".sf-button:active": {
                                        opacity: .9
                                    }
                                }
                            }
                        })
                    }) ]
                }) ]
            }); else {
                var n = vt.A.getSvgIconAsDataUri("bannerProClose");
                r = A.A.create("div", {
                    class: "sf-tooltip",
                    on: [ "mouseup", function(e) {
                        e.stopPropagation();
                    } ],
                    style: {
                        bottom: "35px",
                        transform: "translate(-10%)"
                    },
                    append: [ A.A.create("span", {
                        style: {
                            display: "inline-block",
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            marginLeft: "10px",
                            padding: "10px",
                            maxWidth: "306px",
                            minWidth: "306px",
                            lineHeight: "16px",
                            fontSize: "14px",
                            fontFamily: "font-family: arial, sans-serif",
                            color: "#fff",
                            borderRadius: "6px",
                            pointerEvents: "auto"
                        },
                        append: [ A.A.create("img", {
                            src: n,
                            style: {
                                display: "inline-block",
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                width: "20px",
                                height: "20px",
                                cursor: "pointer"
                            },
                            on: [ "click", function(t) {
                                t.preventDefault(), e.onClose && e.onClose();
                            } ]
                        }), A.A.create("p", {
                            style: {
                                margin: 0,
                                marginBottom: "10px",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: "500",
                                lineHeight: "20px",
                                color: "rgba(0, 0, 0, 1)"
                            },
                            append: (0, h.A)(o.A.i18n.getMessage("tutorialTooltipHeader"))
                        }), A.A.create("p", {
                            style: {
                                margin: 0,
                                fontFamily: "Roboto",
                                fontSize: "14px",
                                fonteWight: "400",
                                lineHeight: "20px",
                                color: "rgba(0, 0, 0, 1)",
                                marginBottom: "10px"
                            },
                            append: (0, h.A)(o.A.i18n.getMessage("tutorialTooltipText"))
                        }), A.A.create("a", {
                            class: "sf-button",
                            href: "https://sf-helper.net/pro2",
                            target: "_blank",
                            style: {
                                display: "inline-block",
                                textAlign: "center",
                                textDecoration: "none",
                                cssFloat: "right",
                                marginTop: "5px",
                                lineHeight: "20px",
                                padding: "4px 20px",
                                borderRadius: "30px",
                                backgroundColor: "#02B75A",
                                fontSize: "12px",
                                color: "#fff",
                                fontWeight: "bolder",
                                cursor: "pointer"
                            },
                            append: (0, h.A)(o.A.i18n.getMessage("tutorialTooltipConfirm")),
                            on: [ "click", function(t) {
                                e.onClose && e.onClose(), bt("banner_pro", "tips_click");
                            } ]
                        }), A.A.create("span", {
                            style: {
                                position: "absolute",
                                left: "15%",
                                bottom: "-7%",
                                display: "inline-block",
                                width: 0,
                                height: 0,
                                borderLeft: "10px solid transparent",
                                borderRight: "10px solid transparent",
                                borderTop: "10px solid #fff",
                                pointerEvents: "none"
                            }
                        }), A.A.create("style", {
                            text: (0, s.A)({
                                ".sf-tooltip": {
                                    position: "absolute",
                                    zIndex: t + 2,
                                    append: {
                                        ".sf-button:hover": {
                                            backgroundColor: "#02B75A !important"
                                        },
                                        ".sf-button:active": {
                                            opacity: .9
                                        }
                                    }
                                }
                            })
                        }) ]
                    }) ]
                });
            }
            return r;
        }, wt.TutorialTooltip.prototype.onClose = function(e) {
            e && "mouseup" === e.type && (e = null), this.tooltipNode && (this.tooltipNode.parentNode && this.tooltipNode.parentNode.removeChild(this.tooltipNode), 
            this.tooltipNode = null, this.removeTooltipOverlay(), this.removeBtnFromTooltip()), 
            window.removeEventListener("resize", this.onResizeDebouce), this.target.removeEventListener("mouseup", this.onClose), 
            this.onClose = null, e || this.details.onClose && this.details.onClose();
        }, wt.TutorialTooltip.prototype.onResize = function() {
            var e = this.target;
            if (!e.offsetParent || !e.parentNode) return this.onClose && this.onClose(1);
            var t = wt.getPosition(e, this.details.parent);
            t.top, this.details.btnTopOffset, t.left, t.width, this.details.btnLeftOffset;
        }, wt.mutationWatcher = {
            getMutationObserver: function() {
                return (0, C.A)();
            },
            isAvailable: function() {
                return !!this.getMutationObserver();
            },
            disconnect: function(e) {
                e.observer.disconnect();
            },
            connect: function(e) {
                e.observer.observe(e.target, e.config);
            },
            joinMutations: function(e) {
                for (var t, r, n, o, i, a, s = [], u = [], l = {}; n = e.shift(); ) {
                    for (-1 === (a = u.indexOf(n.target)) && (l[a = u.push(n.target) - 1] = {
                        target: n.target,
                        added: [],
                        removed: []
                    }), t = l[a], r = void 0, o = 0; i = n.addedNodes[o]; o++) 1 === i.nodeType && (t.added.push(i), 
                    r = !0);
                    for (o = 0; i = n.removedNodes[o]; o++) 1 === i.nodeType && (t.removed.push(i), 
                    r = !0);
                    void 0 !== r && void 0 === t.inList && (t.inList = !0, s.push(t));
                }
                return s;
            },
            isMatched: m.A,
            match: function(e, t, r) {
                var n, o, i, a, s = this, u = e.queries, l = !1;
                return [ "added", "removed" ].forEach((function(e) {
                    var c = r[e];
                    for (a = 0; n = c[a]; a++) for (o = 0; i = u[o]; o++) if (void 0 === i.is || i.is === e) {
                        var d = t[o][e];
                        !0 === s.isMatched(n, i.css) ? d.push(n) : d.push.apply(d, n.querySelectorAll(i.css)), 
                        !1 === l && (l = void 0 !== d[0]);
                    }
                })), l;
            },
            filterTarget: function(e, t) {
                var r, n;
                for (r = 0; n = e[r]; r++) if (!0 === this.isMatched(t, n.css)) return !0;
                return !1;
            },
            run: function(e) {
                var t = this, r = {
                    config: {
                        childList: !0,
                        subtree: !0
                    },
                    target: document.body,
                    filterTarget: []
                };
                Object.assign(r, e), r._disconnect = this.disconnect.bind(this, r), r._connect = this.connect.bind(this, r), 
                r._match = this.match.bind(this, r);
                for (var n = [], o = 0; o < r.queries.length; o++) n.push({
                    added: [],
                    removed: []
                });
                n = JSON.stringify(n);
                var i = this.getMutationObserver();
                return r.observer = new i((function(e) {
                    var o = t.joinMutations(e);
                    if (0 !== o.length) {
                        for (var i, a = !1, s = JSON.parse(n); i = o.shift(); ) !1 === t.filterTarget(r.filterTarget, i.target) && !0 === r._match(s, i) && (a = !0);
                        !0 === a && r.callback(s);
                    }
                })), r.trigger = function(e) {
                    var t = !1, o = JSON.parse(n), i = {
                        added: [ e ],
                        removed: []
                    };
                    r._match(o, i) && (t = !0), !0 === t && r.callback(o);
                }, r.start = function() {
                    r._disconnect(), r._connect(), r.trigger(r.target);
                }, r.stop = function() {
                    r._disconnect();
                }, r.start(), r;
            }
        }, wt.mutationAttrWatcher = {
            isAvailable: function() {
                return !!wt.mutationWatcher.getMutationObserver();
            },
            disconnect: function(e) {
                e.observer.disconnect();
            },
            connect: function(e) {
                e.observer.observe(e.target, e.config);
            },
            run: function(e) {
                var t = {
                    config: {
                        attributes: !0,
                        childList: !1,
                        attributeOldValue: !0
                    },
                    target: document.body
                };
                Object.assign(t, e), Array.isArray(t.attr) || (t.attr = [ t.attr ]), t.config.attributeFilter = t.attr, 
                t._disconnect = this.disconnect.bind(this, t), t._connect = this.connect.bind(this, t);
                for (var r = [], n = 0; n < t.attr.length; n++) r.push({});
                r = JSON.stringify(r);
                var o = wt.mutationWatcher.getMutationObserver();
                return t.observer = new o((function(e) {
                    for (var n, o = !1, i = JSON.parse(r); n = e.shift(); ) {
                        var a = t.attr.indexOf(n.attributeName);
                        if (-1 !== a) {
                            var s = n.target.getAttribute(n.attributeName);
                            s !== n.oldValue && (i[a] = {
                                value: s,
                                oldValue: n.oldValue
                            }, o = !0);
                        }
                    }
                    !0 === o && t.callback(i);
                })), t.start = function() {
                    t._disconnect(), t._connect();
                    for (var e, n = !1, o = JSON.parse(r), i = 0; e = t.attr[i]; i++) {
                        var a = t.target.getAttribute(e);
                        null !== a && (o[i] = {
                            value: a,
                            oldValue: null
                        }, n = !0);
                    }
                    !0 === n && t.callback(o);
                }, t.stop = function() {
                    t._disconnect();
                }, setTimeout((function() {
                    t.start();
                })), t;
            }
        }, wt.waitNodesBySelector = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = !1, n = null, o = Promise.resolve().then((() => {
                var o = t.target || document.body, i = wt.mutationWatcher.getMutationObserver(), a = null, s = null, u = new Promise(((e, t) => {
                    a = e, s = t;
                })), l = null;
                t.timeout > 0 && (l = setTimeout((() => {
                    n && n();
                }), t.timeout));
                var c = [], d = new i((t => {
                    var r, n;
                    for (r = 0; r < t.length; r++) {
                        var o = t[r];
                        for (n = 0; n < o.addedNodes.length; n++) {
                            var i = o.addedNodes[n];
                            1 === i.nodeType && ((0, m.A)(i, e) ? c.push(i) : c.push.apply(c, i.querySelectorAll(e)));
                        }
                    }
                    c.length && a(c);
                }));
                return d.observe(o, {
                    childList: !0,
                    subtree: !0
                }), n = () => {
                    n = null, s(new Error("ABORTED"));
                }, c.push.apply(c, o.querySelectorAll(e)), c.length && a(c), r && n && n(), u.then((e => (d.disconnect(), 
                clearTimeout(l), e)), (e => {
                    throw d.disconnect(), clearTimeout(l), e;
                }));
            }));
            return o.abort = () => {
                r = !0, n && n();
            }, o;
        };
        const xt = e => (Et = e, wt);
    },
    8703: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(2629);
        const o = /^(319|550|7|947)$/.test(r.j) ? null : e => {
            switch ((0, n.A)()) {
              case "101":
                return "video";

              case "ya":
                return "track";

              case "in":
                if (e.el.className.includes("story")) return "story";
                if (e.el.download.includes("mp4")) return "video";

              case "ma":
                if (0 === Object.keys(e).length) return "track";
                if (e.el.download.includes("mp4")) return "video";

              case "vk":
                return 0 === Object.keys(e).length ? "track" : e.el.download.includes("jpg") || e.el.download.includes("png") ? "photo" : "video";

              case "fa":
                return 0 === Object.keys(e).length ? "photo" : "video";

              case "vi":
                return "video";

              case "sc":
              case "ok":
                return "track";

              case "da":
                return "video";

              default:
                return "";
            }
        };
    },
    2629: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(319|550|7|947)$/.test(r.j) ? null : () => {
            switch (window.location.hostname) {
              case "www.youtube.com":
                return "101";

              case "ok.ru":
                return "ok";

              case "vk.com":
                return "vk";

              case "music.yandex.ru":
                return "ya";

              case "www.facebook.com":
              case "web.facebook.com":
                return "fa";

              case "twitch.com":
                return "tw";

              case "www.instagram.com":
                return "in";

              case "my.mail.ru":
                return "ma";

              case "vimeo.com":
                return "vi";

              case "soundcloud.com":
                return "so";

              case "tiktok.com":
                return "ti";

              case "www.dailymotion.com":
                return "da";

              default:
                return "";
            }
        };
    },
    4689: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = r(9242);
        const o = /^(319|550|7|947)$/.test(r.j) ? null : function(e) {
            n.A.sendMessage({
                action: "sendMonitoring",
                obj: {
                    category: e.category,
                    event: e.event,
                    subcategory: e.subcategory
                }
            });
        };
    },
    6714: (e, t, r) => {
        "use strict";
        r.d(t, {
            P: () => Qe
        });
        var n = r(7219), o = r(467), i = r(4756), a = r.n(i), s = r(9620), u = r(6810);
        class l {
            constructor(e) {
                this.cache = void 0, this.initData = void 0, this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element, o = e.initData, n) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 3:
                            if (o) {
                                r.next = 5;
                                break;
                            }
                            throw new Error("initData is not defined");

                          case 5:
                            return t.initData = o, (i = t.getFilenameFromUrl(n.src)) && !/\.php$/.test(i) || (i = u.A.modify(document.title + ".jpg")), 
                            r.abrupt("return", [ {
                                url: n.src,
                                filename: i
                            } ]);

                          case 9:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getFilenameFromUrl(e) {
                return (0, s.A)(this.initData).getMatchFirst(e, /\/([^\/]+\.[a-z0-9]{3,4})(?:\?|$)/i);
            }
        }
        var c = r(9242), d = r(2894);
        class p {
            constructor(e) {
                this.cache = void 0, this.initData = void 0, this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, u, l;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.mediaId, o = e.initData, n) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("videoId is not defined");

                          case 3:
                            if (!t.cache[n]) {
                                r.next = 5;
                                break;
                            }
                            return r.abrupt("return", t.cache[n]);

                          case 5:
                            if (o) {
                                r.next = 7;
                                break;
                            }
                            throw new Error("initData is not defined");

                          case 7:
                            return t.initData = o, r.next = 10, t.requestVideoLinksById(n);

                          case 10:
                            return i = r.sent, u = (0, s.A)(t.initData), l = u.popupMenu.prepareLinks.facebook(i.links, i.title), 
                            t.cache[n] = t.transformLinks(l), r.abrupt("return", t.cache[n]);

                          case 15:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            requestVideoLinksById(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.abrupt("return", Promise.resolve().then((() => t.requestLocalVideoLinks(e))).catch((() => t.requestBgVideoLinks(e))));

                          case 1:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            requestLocalVideoLinks(e) {
                return (0, o.A)(a().mark((function t() {
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.abrupt("return", new Promise(((e, t) => {
                                var r = document.body.innerHTML.match(/"DTSGInitialData"\s*,\s*\[\]\s*,\s*{\s*"token"\s*:\s*"([^"]+)"/);
                                return r && r[1] ? e(r[1]) : t(new Error("No Token Found On Page"));
                            })).then((function(t) {
                                var r = `https://www.facebook.com/video/tahoe/async/${e}/?${d.stringify({
                                    payloadtype: "primary"
                                })}`, n = d.stringify({
                                    __a: 1,
                                    fb_dtsg: t
                                });
                                return fetch(r, {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    body: n
                                }).then((e => e.text()));
                            })).then((function(t) {
                                return new Promise((function(r, n) {
                                    c.A.sendMessage({
                                        action: "getFacebookLinksFromData",
                                        extVideoId: e,
                                        data: t
                                    }, (function(e) {
                                        e && e.links ? r(e) : n(new Error("Get links from data error"));
                                    }));
                                }));
                            })).catch((function(e) {
                                throw console.error("get local links error", e), e;
                            })));

                          case 1:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            requestBgVideoLinks(e) {
                return (0, o.A)(a().mark((function t() {
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.abrupt("return", new Promise((function(t, r) {
                                c.A.sendMessage({
                                    action: "getFacebookLinks",
                                    extVideoId: e
                                }, (function(e) {
                                    e && e.links ? t(e) : r(new Error("Get links error"));
                                }));
                            })).catch((function(e) {
                                throw console.error("get links error", e), e;
                            })));

                          case 1:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            transformLinks(e) {
                return JSON.parse(JSON.stringify(e)).map((e => (e.url = e.href, e.filename = e.title, 
                delete e.href, delete e.title, e)));
            }
        }
        class A {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.me.fbVideo || r.t0 === n.me.fbFeed || r.t0 === n.me.fbProfileVideo || r.t0 === n.me.fbProfileFeed || r.t0 === n.me.fbReel || r.t0 === n.me.fbStory || r.t0 === n.me.fbWatch ? 3 : r.t0 === n.me.fbPhoto || r.t0 === n.me.fbProfilePhoto ? 4 : 5;
                            break;

                          case 3:
                            return r.abrupt("return", new p(t.cache).extractLinks(e));

                          case 4:
                            return r.abrupt("return", new l(t.cache).extractLinks(e));

                          case 5:
                            throw new Error(`ytPageType ${t.pageType} is not supported`);

                          case 6:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        class h {
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s, l, c, d;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 3:
                            if (n instanceof HTMLImageElement) {
                                r.next = 5;
                                break;
                            }
                            throw new Error("element is not supported");

                          case 5:
                            if (o = null, "string" == typeof (i = n.getAttribute("srcset")) && (s = [], i.split(",").map((function(e) {
                                var t = e.split(" ");
                                s.push({
                                    url: t[0],
                                    size: t[1]
                                });
                            })), s.sort((function(e, t) {
                                return e.size > t.size ? -1 : 1;
                            })), (l = s.shift()) && (o = l.url)), o || (o = n.src), "string" == typeof o) {
                                r.next = 11;
                                break;
                            }
                            throw new Error("src is not found");

                          case 11:
                            return c = "jpeg", -1 !== o.indexOf(".png") && (c = "png"), d = (d = u.A.modify(t.getContentMakerName(n))) ? d + "_" : "", 
                            r.abrupt("return", [ {
                                url: o,
                                filename: d + Date.now() + "." + c
                            } ]);

                          case 16:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getContentMakerName(e) {
                var t = e.closest("article");
                if (t) {
                    var r = t.querySelector("header span a");
                    return r ? r.textContent : "";
                }
                return "";
            }
        }
        var f = r(5751), g = r(8233), v = (0, g.A)("IgPostVideoLinkExtractor");
        class I {
            constructor() {
                this.queryHash = void 0, this.queryHash = window.localStorage.getItem("_sf_query_hash") || "a9441f24ac73000fa17fe6e6da11d59d";
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s, l, c, d, p, A, h, f, g, v, I, C;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element, o = e.type, i = e.index, s = e.signal, n) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 3:
                            if (n instanceof HTMLVideoElement) {
                                r.next = 5;
                                break;
                            }
                            throw new Error("element is not supported");

                          case 5:
                            if ("string" == typeof (l = n.getAttribute("src")) && -1 === l.indexOf("blob:")) {
                                r.next = 22;
                                break;
                            }
                            if ((c = t.getArticleIdFromURL(location.href)) || (d = n.closest(".sf-root-media-container")) && (c = t.getArticleIdFromContainer(d)), 
                            c && -1 === c.indexOf("/") || (p = n.closest("article"), A = n.closest("section"), 
                            h = p && p.querySelector('a[href*="/liked_by"]'), !p && A && (h = A.querySelector('a[href*="/liked_by"]')), 
                            h && (f = h.href.match(/\/p\/(.*?)\/liked_by/)) && f[1] && (c = f[1])), !c || -1 !== c.indexOf("/")) {
                                r.next = 21;
                                break;
                            }
                            return r.prev = 11, r.next = 14, t.requestApiEntity(c, o, i, s);

                          case 14:
                            return g = r.sent, r.abrupt("return", [ {
                                filename: `${null == g ? void 0 : g.id}.mp4`,
                                url: null == g ? void 0 : g.url
                            } ]);

                          case 18:
                            throw r.prev = 18, r.t0 = r.catch(11), new Error("Get Video from api error: " + r.t0);

                          case 21:
                            throw new Error("idArticle not found");

                          case 22:
                            return v = "mp4", -1 !== l.indexOf(".flv") && (v = "flv"), (I = (I = l.match(/\/([^\/?]+)(?:$|\?)/)) && I[1]) || (I = "noname." + v), 
                            C = (C = u.A.modify(t.getContentMakerName(n))) ? C + "_" : "", r.abrupt("return", [ {
                                url: l,
                                filename: C + I
                            } ]);

                          case 30:
                          case "end":
                            return r.stop();
                        }
                    }), r, null, [ [ 11, 18 ] ]);
                })))();
            }
            getArticleIdFromURL(e) {
                var t = e.split("?")[0].match(/(?:\/p|\/tv|\/reels?)\/(.*)/);
                if (t && t[1]) return t[1].replace("/", "");
            }
            getArticleIdFromContainer(e) {
                var t = e.closest("article");
                if (t) {
                    var r = t.querySelector('a[href*="/p/"], a[href*="/tv/"]');
                    if (r) return this.getArticleIdFromURL(r.href);
                }
            }
            requestApiEntity(e, t, r, n) {
                var o = `https://www.instagram.com/p/${e}/?__a=1&__d=dis`, i = new AbortController;
                i.signal;
                return n && n.addEventListener("abort", (() => {
                    i.abort();
                })), (0, f.A)({
                    url: o,
                    json: !0
                }).then((e => {
                    var t, n, o = null == e || null === (t = e.body) || void 0 === t ? void 0 : t.items[0];
                    return location.href.split("?").length > 1 ? null != o && o.carousel_media[r].video_versions ? null == o || null === (n = o.carousel_media[r]) || void 0 === n ? void 0 : n.video_versions[0] : void 0 : null == o ? void 0 : o.video_versions[0];
                }));
            }
            refreshQueryHash() {
                var e = this;
                return (0, o.A)(a().mark((function t() {
                    var r;
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (!(r = document.querySelector('link[href*="Consumer.js/"]')) || !r.href) {
                                t.next = 5;
                                break;
                            }
                            return t.abrupt("return", (0, f.A)(r.href).then((t => {
                                var r = t.body.match(/s="(\w+)",l=/);
                                r && r[1] && (e.queryHash = r[1], window.localStorage.setItem("_sf_query_hash", r[1]), 
                                v && v.info("new query hash", e.queryHash));
                            })));

                          case 5:
                            v && v.error("Consumer.js not found. refreshQueryHash error");

                          case 6:
                            return t.abrupt("return", Promise.resolve());

                          case 7:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            prepVideoFromResponseApi(e, t) {
                var r;
                if ("GraphVideo" === t.__typename && t.video_url) {
                    var n = t.title || t.id || "video_instagram";
                    return {
                        filename: u.A.modify(`${n}.mp4`),
                        url: t.video_url
                    };
                }
                var o = t.edge_sidecar_to_children.edges.shift().node;
                if ("GraphSidecar" === t.__typename && "GraphImage" !== (null == o ? void 0 : o.__typename)) {
                    var i = t.title || o.id || "video_instagram";
                    return {
                        filename: u.A.modify(`${i}.mp4`),
                        url: o.video_url
                    };
                }
                if ("GraphSidecar" === t.__typename && null !== (r = t.edge_sidecar_to_children) && void 0 !== r && r.edges) {
                    var a, s = location.href, l = s[s.length - 1];
                    if (null !== (a = t.edge_sidecar_to_children) && void 0 !== a && a.edges[Number(l) - 2]) {
                        var c, d, p = (null === (c = t.edge_sidecar_to_children) || void 0 === c ? void 0 : c.edges[Number(l) - 2].node.id) || "video_instagram";
                        return {
                            filename: u.A.modify(`${p}.mp4`),
                            url: null === (d = t.edge_sidecar_to_children) || void 0 === d ? void 0 : d.edges[Number(l) - 2].node.video_url
                        };
                    }
                    return {
                        filename: "",
                        url: ""
                    };
                }
            }
            getContentMakerName(e) {
                var t = e.closest("article");
                if (t) {
                    var r = t.querySelector("header span a");
                    return r ? r.textContent : "";
                }
                return "";
            }
        }
        class C {
            extractLinks(e) {
                return (0, o.A)(a().mark((function t() {
                    var r, n, o, i, s;
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (r = e.element) {
                                t.next = 3;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 3:
                            if (r instanceof HTMLImageElement) {
                                t.next = 5;
                                break;
                            }
                            throw new Error("element is not supported");

                          case 5:
                            if (r.srcset && (o = r.srcset.split(",")[0]) && (n = o.split(" ")[0]), n || (n = r.src), 
                            n) {
                                t.next = 9;
                                break;
                            }
                            throw new Error("url is not found");

                          case 9:
                            return i = location.href.match(/stories\/(.*?)\/(\d+)/), s = `instagram_photo_story_${Date.now()}.jpg`, 
                            i && i[1] && i[2] && (s = [ i[1], i[2] ].join(" - ") + ".jpg"), t.abrupt("return", Promise.resolve([ {
                                url: n,
                                filename: s
                            } ]));

                          case 13:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
        }
        var m = r(3453), E = r(3769);
        class y {
            constructor() {
                this.requestHeaders = void 0, this.requestHeaders = {
                    "x-asbd-id": "198387",
                    "x-ig-app-id": "936619743392459",
                    "x-ig-www-claim": "0"
                };
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if ("number" == typeof (n = e.elementIndex)) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 3:
                            return r.next = 5, t.getStory(n);

                          case 5:
                            return o = r.sent, i = location.href.match(/stories\/(.*?)\/(\d+)/), s = `instagram_video_story_${Date.now()}.mp4`, 
                            i && i[1] && i[2] && (s = [ i[1], i[2] ].join(" - ") + ".mp4"), r.abrupt("return", [ {
                                url: o,
                                filename: s
                            } ]);

                          case 10:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getStory(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.next = 2, t.getStoriesFromApi(location.href);

                          case 2:
                            return s = r.sent, r.abrupt("return", null === (n = s[e]) || void 0 === n || null === (o = n.video_versions) || void 0 === o || null === (i = o[0]) || void 0 === i ? void 0 : i.url);

                          case 4:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getStoriesFromApi(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.next = 2, t.getInfoAboutStoryUrl(e);

                          case 2:
                            if (n = r.sent, o = n.username, i = n.storyId, s = n.isImplicitHighlightUrl, "highlights" !== o && !s) {
                                r.next = 8;
                                break;
                            }
                            return r.abrupt("return", t.getHighlightStories(i));

                          case 8:
                            return r.abrupt("return", t.getStoriesByUsername(o));

                          case 9:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getInfoAboutStoryUrl(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s, u;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = t.parseStoryUrl(e), o = n.username, i = n.storyId, s = n.isImplicitHighlightUrl) {
                                r.next = 3;
                                break;
                            }
                            return r.abrupt("return", {
                                username: o,
                                storyId: i,
                                isImplicitHighlightUrl: s
                            });

                          case 3:
                            return r.next = 5, t.getRedirectedUrl(e);

                          case 5:
                            if (u = r.sent, e !== u) {
                                r.next = 8;
                                break;
                            }
                            throw new Error("Url was not redirected");

                          case 8:
                            return r.abrupt("return", t.parseStoryUrl(u));

                          case 9:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            parseStoryUrl(e) {
                var t = !1, r = /instagram.com\/stories\/([^\/?]+)(?:\/(\d+))?(?:\/|\?|$)/.exec(e);
                if (r || (r = /instagram.com\/s\/[^\/?]+\?story_media_id=(\d+)_(\d+)/.exec(e), t = !0), 
                r) {
                    var n = r, o = (0, m.A)(n, 3);
                    return {
                        username: o[1],
                        storyId: o[2],
                        isImplicitHighlightUrl: t
                    };
                }
                throw new Error(`Failed to parse story url: ${e}`);
            }
            getRedirectedUrl(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.next = 2, (0, E.A)(e, {
                                headers: t.requestHeaders
                            });

                          case 2:
                            return n = r.sent, r.abrupt("return", n.responseURL);

                          case 4:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getHighlightStories(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.next = 2, t.requestStoriesById(`highlight:${e}`);

                          case 2:
                            return n = r.sent, r.abrupt("return", t.parseStoriesResponse(n));

                          case 4:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            requestStoriesById(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.next = 2, (0, E.A)(`https://www.instagram.com/api/v1/feed/reels_media/?reel_ids=${encodeURIComponent(e)}`, {
                                headers: t.requestHeaders
                            });

                          case 2:
                            return n = r.sent, r.abrupt("return", n.body);

                          case 4:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            parseStoriesResponse(e) {
                var t, r, n;
                return e ? ((null === (t = JSON.parse(e)) || void 0 === t || null === (r = t.reels_media) || void 0 === r || null === (n = r[0]) || void 0 === n ? void 0 : n.items) || []).map((e => e)) : [];
            }
            getStoriesByUsername(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.next = 2, t.getUserIdByUserName(e);

                          case 2:
                            return n = r.sent, r.next = 5, t.requestStoriesById(n);

                          case 5:
                            return o = r.sent, r.abrupt("return", t.parseStoriesResponse(o));

                          case 7:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getUserIdByUserName(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s, u;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.next = 2, (0, E.A)(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${e}`, {
                                headers: t.requestHeaders
                            });

                          case 2:
                            if (s = r.sent, u = null === (n = JSON.parse(s.body)) || void 0 === n || null === (o = n.data) || void 0 === o || null === (i = o.user) || void 0 === i ? void 0 : i.id) {
                                r.next = 6;
                                break;
                            }
                            throw new Error(`Failed to get user id by username: ${e}`);

                          case 6:
                            return r.abrupt("return", u);

                          case 7:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        class w {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var o;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.Wc.igFeed ? 3 : r.t0 === n.Wc.igPostVideo ? 11 : r.t0 === n.Wc.igPostPhoto ? 12 : r.t0 === n.Wc.igStoryVideo ? 13 : r.t0 === n.Wc.igStoryPhoto ? 14 : 15;
                            break;

                          case 3:
                            if (o = e.element) {
                                r.next = 6;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 6:
                            if (!(o instanceof HTMLVideoElement)) {
                                r.next = 8;
                                break;
                            }
                            return r.abrupt("return", (new I).extractLinks(e));

                          case 8:
                            if (!(o instanceof HTMLImageElement)) {
                                r.next = 10;
                                break;
                            }
                            return r.abrupt("return", (new h).extractLinks(e));

                          case 10:
                            throw new Error("element is not supported");

                          case 11:
                            return r.abrupt("return", (new I).extractLinks(e));

                          case 12:
                            return r.abrupt("return", (new h).extractLinks(e));

                          case 13:
                            return r.abrupt("return", (new y).extractLinks(e));

                          case 14:
                            return r.abrupt("return", (new C).extractLinks(e));

                          case 15:
                            throw new Error(`igPageType ${t.pageType} is not supported`);

                          case 16:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        var b = r(4467), x = r(188), R = r(4895);
        function k(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function O(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? k(Object(r), !0).forEach((function(t) {
                    (0, b.A)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : k(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var S = (0, g.A)("SoAudioLinkExtractor");
        class F {
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, i, s, u, l, c, d, p, A, h, f, g, v, I, C, m, E, y, w, b, x;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element, i = t.get("client_id")) {
                                r.next = 6;
                                break;
                            }
                            return r.next = 5, t.getClientId();

                          case 5:
                            i = r.sent;

                          case 6:
                            if (n) {
                                r.next = 20;
                                break;
                            }
                            return r.next = 9, t.getTrack(i, location.href);

                          case 9:
                            if (s = r.sent) {
                                r.next = 19;
                                break;
                            }
                            return r.next = 13, t.getPageInfo(i, location.href);

                          case 13:
                            return u = r.sent, r.next = 16, t.fetchSongsOfPlaylist(i, u);

                          case 16:
                            return l = r.sent, c = l.map(function() {
                                var e = (0, o.A)(a().mark((function e(r) {
                                    return a().wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            return e.t0 = t.fmtSongFilename(r), e.next = 3, t.getDownloadURL(i, r);

                                          case 3:
                                            return e.t1 = e.sent, e.abrupt("return", {
                                                filename: e.t0,
                                                url: e.t1
                                            });

                                          case 5:
                                          case "end":
                                            return e.stop();
                                        }
                                    }), e);
                                })));
                                return function(t) {
                                    return e.apply(this, arguments);
                                };
                            }()), r.abrupt("return", c);

                          case 19:
                            return r.abrupt("return", [ {
                                url: null == s ? void 0 : s.url,
                                filename: null == s ? void 0 : s.filename
                            } ]);

                          case 20:
                            if (!n.closest(".sc-type-small, .chartTrack")) {
                                r.next = 29;
                                break;
                            }
                            if (d = n.closest(".sc-type-small, .chartTrack"), p = null == d ? void 0 : d.querySelector(".trackItem__trackTitle[href], .chartTrack__title [href]")) {
                                r.next = 25;
                                break;
                            }
                            throw new Error("song element is not defined");

                          case 25:
                            return r.next = 27, t.getTrack(i, p.href);

                          case 27:
                            return A = r.sent, r.abrupt("return", [ {
                                url: null == A ? void 0 : A.url,
                                filename: null == A ? void 0 : A.filename
                            } ]);

                          case 29:
                            if (!n.closest(".sc-media")) {
                                r.next = 40;
                                break;
                            }
                            if (h = n.closest(".sc-media"), (g = null == h ? void 0 : h.querySelector(".soundTitle__title[href]")) && (f = g.href), 
                            !g && document.querySelector(".l-about-row .sound__soundActions .sc-button-group:nth-child(1)") && (f = location.href), 
                            f) {
                                r.next = 36;
                                break;
                            }
                            throw new Error("song url is not defined");

                          case 36:
                            return r.next = 38, t.getTrack(i, f);

                          case 38:
                            return v = r.sent, r.abrupt("return", [ {
                                url: null == v ? void 0 : v.url,
                                filename: null == v ? void 0 : v.filename
                            } ]);

                          case 40:
                            if (!n.closest('[role="group"].sound.streamContext:not(.playlist)')) {
                                r.next = 49;
                                break;
                            }
                            if (I = n.closest('[role="group"].sound.streamContext:not(.playlist)'), C = null == I ? void 0 : I.querySelector("a.soundTitle__title[href]")) {
                                r.next = 45;
                                break;
                            }
                            throw new Error("song element is not defined");

                          case 45:
                            return r.next = 47, t.getTrack(i, C.href);

                          case 47:
                            return m = r.sent, r.abrupt("return", [ {
                                url: null == m ? void 0 : m.url,
                                filename: null == m ? void 0 : m.filename
                            } ]);

                          case 49:
                            if (!n.closest('[role="group"].sound.playlist.streamContext')) {
                                r.next = 63;
                                break;
                            }
                            return E = n.closest('[role="group"].sound.playlist.streamContext'), y = null == E ? void 0 : E.querySelector('a[href*="sets/"]'), 
                            r.next = 54, t.getPageInfo(i, y.href);

                          case 54:
                            if ("playlist" === (w = r.sent).kind) {
                                r.next = 58;
                                break;
                            }
                            throw S && S.error("It's not playlist", y), new Error("playlist is not defined");

                          case 58:
                            return r.next = 60, t.fetchSongsOfPlaylist(i, w);

                          case 60:
                            return b = r.sent, x = b.map(function() {
                                var e = (0, o.A)(a().mark((function e(r) {
                                    return a().wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            return e.t0 = t.fmtSongFilename(r), e.next = 3, t.getDownloadURL(i, r);

                                          case 3:
                                            return e.t1 = e.sent, e.abrupt("return", {
                                                filename: e.t0,
                                                url: e.t1
                                            });

                                          case 5:
                                          case "end":
                                            return e.stop();
                                        }
                                    }), e);
                                })));
                                return function(t) {
                                    return e.apply(this, arguments);
                                };
                            }()), r.abrupt("return", x);

                          case 63:
                            return r.abrupt("return", [ {
                                url: "",
                                filename: ""
                            } ]);

                          case 64:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            get(e) {
                var t = localStorage.getItem(e);
                if (!t) return "";
                var r = JSON.parse(t), n = r.val, o = r.expires;
                return n && -1 === o || o > Date.now() ? n : "";
            }
            getClientId() {
                return (0, o.A)(a().mark((function e() {
                    return a().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.abrupt("return", (0, x.A)('function(){// @ts-ignore\nvar wpchunk=window.webpackChunk||window.webpackJsonp;if(typeof wpchunk==="undefined"){return}var _result;// @ts-ignore\nvar sections=wpchunk.filter(function(v,k){return k!=="push"});// check fn\nfor(var id in wpchunk){var chunk=wpchunk[id];if(chunk[1]&&chunk[1][41021]){var matches=chunk[1][41021].toString().match(/\\?client_id=(.+?)&/);if(Array.isArray(matches)&&matches[1]){return matches[1]}}}// @ts-ignore\nsections.some(function(section){var obj=section[1];return Object.keys(obj).some(function(fnIdx){var result=obj[fnIdx].toString().match(/\\"client_id=\\w+\\"/);if(result&&result[0]){return _result=result[0].split("=")[1].replace(/\\"/,"")}})});return _result}'));

                          case 1:
                          case "end":
                            return e.stop();
                        }
                    }), e);
                })))();
            }
            getPageInfo(e, t) {
                return (0, R.A)({
                    action: "soundcloudFetchPageInfo",
                    clientId: e,
                    songEndpoint: t
                });
            }
            getTrack(e, t) {
                var r = this;
                return (0, o.A)(a().mark((function n() {
                    var o, i, s;
                    return a().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            return n.next = 2, r.getPageInfo(e, t);

                          case 2:
                            if ((o = n.sent) && "track" === o.kind) {
                                n.next = 5;
                                break;
                            }
                            return n.abrupt("return");

                          case 5:
                            return n.next = 7, r.getDownloadURL(e, o);

                          case 7:
                            return i = n.sent, s = r.fmtSongFilename(o), n.abrupt("return", O(O({}, o), {}, {
                                url: i,
                                filename: s
                            }));

                          case 10:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })))();
            }
            getDownloadURL(e, t) {
                return (0, R.A)({
                    action: "soundcloudSearchBestDownloadURL",
                    clientID: e,
                    song: t
                });
            }
            fetchSongsOfPlaylist(e, t) {
                return (0, R.A)({
                    action: "soundcloudFetchSongsOfPlaylist",
                    clientID: e,
                    playlist: t
                });
            }
            prepareFilename(e) {
                try {
                    var t = e.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.\-\(\)\[\]]/g, "").trim();
                    if ("" === t || t.length < 3 || /\.$/.test(t)) throw new Error("filename not valid");
                    return t;
                } catch (e) {
                    return Date.now() + "_track";
                }
            }
            fmtSongFilename(e) {
                return this.prepareFilename(`${e.title}`) + ".mp3";
            }
        }
        class j {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.GT.soAudio ? 3 : 4;
                            break;

                          case 3:
                            return r.abrupt("return", (new F).extractLinks(e));

                          case 4:
                            throw new Error(`soPageType ${t.pageType} is not supported`);

                          case 5:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        class L {
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s, u, l, c, d, p, A;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 3:
                            if (n instanceof HTMLVideoElement || n instanceof HTMLSourceElement) {
                                r.next = 5;
                                break;
                            }
                            throw new Error("element is not supported");

                          case 5:
                            if (o = t.getFilename(), !n.src.startsWith("blob")) {
                                r.next = 31;
                                break;
                            }
                            if (i = n.closest('div[data-e2e="recommend-list-item-container"]'), s = null, i ? (u = t.getUsername(i), 
                            l = t.getVideoId(i), s = `https://www.tiktok.com/@${u}/video/${l}`) : window.self === window.top && /\/@[\w.-]+\/video\/\d+$/i.test(window.location.href) && (s = window.location.href), 
                            !s) {
                                r.next = 31;
                                break;
                            }
                            if ((d = document.createElement("iframe")).src = s, d.style.display = "none", d.id = "blob-iframe", 
                            document.body.appendChild(d), p = null, r.prev = 17, !d.contentWindow) {
                                r.next = 23;
                                break;
                            }
                            return r.next = 21, t.waitForElementInFrame(d, "video", 1e4);

                          case 21:
                            A = r.sent, p = null == A ? void 0 : A.src;

                          case 23:
                            r.next = 28;
                            break;

                          case 25:
                            r.prev = 25, r.t0 = r.catch(17), console.error(r.t0.message);

                          case 28:
                            if (null === (c = d.parentNode) || void 0 === c || c.removeChild(d), !p) {
                                r.next = 31;
                                break;
                            }
                            return r.abrupt("return", [ {
                                url: p,
                                filename: o
                            } ]);

                          case 31:
                            return r.abrupt("return", [ {
                                url: n.src,
                                filename: o
                            } ]);

                          case 32:
                          case "end":
                            return r.stop();
                        }
                    }), r, null, [ [ 17, 25 ] ]);
                })))();
            }
            getFilename() {
                var e = document.querySelector(".user-username, .share-title");
                e || (e = document.querySelector("._embed_video_card-user span"));
                var t = e && e.textContent ? u.A.modify(e.textContent + ".mp4") : "video.mp4";
                if (!t) {
                    var r = location.href.match(/\d+/);
                    t = r && r[0] ? r[0] : "video.mp4";
                }
                return t;
            }
            getUsername(e) {
                var t = e.querySelector(".avatar-anchor");
                if (!t) return null;
                var r = t.href;
                if (!r) return null;
                var n = r.match(/@([^/]+)/);
                return n && n[1] ? n[1] : null;
            }
            getVideoId(e) {
                var t = e.querySelector(".tiktok-web-player");
                if (!t) return null;
                var r = t.id;
                if (!r) return null;
                var n = r.match(/xgwrapper-0-([^/]+)/);
                return n && n[1] ? n[1] : null;
            }
            waitForElementInFrame(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5e3;
                return new Promise(((n, o) => {
                    var i = r / 100, a = 0, s = setInterval((() => {
                        var r, u, l, c = null === (r = e.contentWindow) || void 0 === r || null === (u = r.document) || void 0 === u || null === (l = u.body) || void 0 === l ? void 0 : l.querySelector(t);
                        c && !c.src.includes("playback1.mp4") ? (clearInterval(s), n(c)) : a >= i && (clearInterval(s), 
                        o(new Error("Element not found within the specified timeout"))), a++;
                    }), 100);
                }));
            }
        }
        class D {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.Cg.ttFeed || r.t0 === n.Cg.ttVideo || r.t0 === n.Cg.ttProfile || r.t0 === n.Cg.ttExplore || r.t0 === n.Cg.ttFollowing ? 3 : 4;
                            break;

                          case 3:
                            return r.abrupt("return", (new L).extractLinks(e));

                          case 4:
                            throw new Error(`igPageType ${t.pageType} is not supported`);

                          case 5:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        var B = r(2970), Q = r(3372), M = r(4733);
        class H {
            constructor(e) {
                this.cache = void 0, this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s, u, l, c, d;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.mediaId, o = e.details, !n) {
                                r.next = 20;
                                break;
                            }
                            return r.prev = 2, r.next = 5, t._getAlbumLinks(n, o);

                          case 5:
                            return i = r.sent, s = i.list, r.abrupt("return", t.listToLinks(s));

                          case 10:
                            return r.prev = 10, r.t0 = r.catch(2), "Album is empty" !== r.t0.message && "Abort" !== r.t0.message && console.error("findAlbumLinks error", r.t0), 
                            r.next = 15, t._getAlbumLinksViaDom(document, o);

                          case 15:
                            return u = r.sent, l = u.list, r.abrupt("return", t.listToLinks(l));

                          case 18:
                            r.next = 26;
                            break;

                          case 20:
                            return console.error("id is not defined"), r.next = 23, t._getAlbumLinksViaDom(document, o);

                          case 23:
                            return c = r.sent, d = c.list, r.abrupt("return", t.listToLinks(d));

                          case 26:
                          case "end":
                            return r.stop();
                        }
                    }), r, null, [ [ 2, 10 ] ]);
                })))();
            }
            _getAlbumLinks(e, t) {
                var r = this, n = this.cache, o = "";
                /albums|tags|photos/.test(location.href) && (o = this.getFolderName());
                var i = {}, a = [], s = 0, l = 0, c = 0, d = 0, p = o => {
                    if (t.abort) return Promise.reject(new Error("Abort"));
                    var a = {
                        act: "show",
                        al: 1,
                        list: e,
                        offset: null
                    };
                    return o && (a.offset = o), (0, f.A)({
                        type: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "X-Requested-With": "XMLHttpRequest"
                        },
                        url: "/al_photos.php",
                        data: a,
                        localXHR: !0,
                        timeout: 6e4
                    }).then((e => {
                        var t = this.parseVkResponse(e.body), o = t[6], a = t[8];
                        s || (s = a.length), l = o, c || (c = Math.ceil(o / s));
                        var d = [], p = "";
                        return a.forEach((function(e) {
                            if (!i[e.id]) {
                                i[e.id] = 1;
                                var t = r.getMaxPhotoSize(e);
                                t && (!p && e.album && (p = u.A.decodeSpecialChars((0, B.A)(e.album.replace(/<[^>]+>/g, "")))), 
                                t.id = e.id, n[e.id] = t, d.push(t));
                            }
                        })), new Promise((function(e) {
                            setTimeout(e, 250);
                        })).then((function() {
                            return {
                                title: p,
                                list: d
                            };
                        }));
                    }));
                };
                return function e() {
                    return p(d * s).then((function(r) {
                        if (c--, d++, a.push.apply(a, r.list), t.onProgress && t.onProgress(a.length, l), 
                        o || (o = r.title), c > 0) return e();
                    }));
                }().then((() => {
                    if (Object.keys(n).slice(1e3).forEach((function(e) {
                        delete n[e];
                    })), !a.length) throw new Error("Album is empty");
                    return o || (o = this.getFolderName()), {
                        title: o,
                        list: a
                    };
                }), (function(e) {
                    throw "Abort" !== e.message && console.error("Get photo page error!", e), e;
                }));
            }
            getFolderName() {
                if (null !== document.querySelector('.page_block_header_inner._header_inner a.ui_crumb[href="/audio"]')) {
                    var e = document.querySelector(".page_block_header_inner._header_inner div.ui_crumb");
                    if (e && e.textContent) return u.A.modify(e.textContent);
                }
                var t = document.title, r = t.indexOf("|");
                return -1 !== r && (t = t.substr(0, r - 1)), u.A.modify(t);
            }
            parseVkResponse(e) {
                try {
                    var t = JSON.parse(e).payload[1];
                    return [ null, null, null, null, null, t[0], t[1], null, t[3] ];
                } catch (e) {}
                for (var r = function(e) {
                    return !0 === e ? 1 : parseInt(e) || 0;
                }, n = function(e) {
                    return !0 === e ? 1 : parseFloat(e) || 0;
                }, o = e.split("<!>"), i = o.length - 1; i >= 0; --i) {
                    var a = o[i];
                    if ("<!" == a.substr(0, 2)) {
                        var s = a.indexOf(">"), u = a.substr(2, s - 2);
                        switch (a = a.substr(s + 1), u) {
                          case "json":
                            var l = null;
                            try {
                                l = JSON.parse(a);
                            } catch (e) {}
                            o[i] = l;
                            break;

                          case "int":
                            o[i] = r(a);
                            break;

                          case "float":
                            o[i] = n(a);
                            break;

                          case "bool":
                            o[i] = !!r(a);
                            break;

                          case "null":
                            o[i] = null;
                            break;

                          case "pageview_candidate":
                          case "debug":
                            o.pop();
                        }
                    }
                }
                return o;
            }
            getMaxPhotoSize(e) {
                var t = null, r = null;
                [ "w", "z", "y", "x" ].some((function(n) {
                    return !!(t = e[n + "_"]) || (!!(r = e[n + "_src"]) || void 0);
                })), t || (t = [ r ]);
                var n, o;
                return t[0] ? {
                    url: (n = e.base, o = t[0], o.match(/https?:\/\//i) ? ((o = new URL(o)).pathname.match(/\.[a-z]{3}$/i) || (o += ".jpg"), 
                    o.toString()) : (o.match(/\.[a-z]{3}$/i) || (o += ".jpg"), (n || "").replace(/\/[a-z0-9_:\.]*$/i, "") + "/" + o)),
                    width: t[2] && t[1],
                    height: t[1] && t[2]
                } : null;
            }
            _getAlbumLinksViaDom(e, t) {
                var r = this, n = this.cache;
                if (t.abort) return Promise.reject(new Error("Abort"));
                var o = /showPhoto\s*\(\s*["']([-\d_]+)["']\s*,\s*["']([\w\-]+)["']/i, i = /\{["']?temp["']?\s*:\s*(\{.+?\})/i, a = /(\{|,)\s*(\w+)\s*:/gi, s = {}, u = [], l = e => {
                    if (!this.isReply(e) && !this.elIsHidden(e)) {
                        var t = e.getAttribute("onclick"), n = o.exec(t);
                        if (n) {
                            var l = n[1];
                            if (!s[l]) {
                                s[l] = 1;
                                var c = n[2], d = null, p = i.exec(t);
                                if (p) {
                                    p = p[1].replace(a, '$1"$2":');
                                    var A = null;
                                    try {
                                        A = JSON.parse(p);
                                    } catch (e) {}
                                    d = A && r.getMaxPhotoSize(A);
                                }
                                d || (d = {}), d.id = l, d.listId = c, u.push(d);
                            }
                        }
                    }
                };
                if ([].slice.call(e.querySelectorAll("a[onclick]")).forEach(l), 0 === u.length && e !== document) {
                    var c = this.getWallPostContent();
                    c && [].slice.call(c.querySelectorAll("a[onclick]")).forEach(l);
                }
                return (e => {
                    var r = Promise.resolve(), o = [], i = e.filter((function(e) {
                        var t = n[e.id];
                        return !t || (o.push(t), !1);
                    }));
                    return t.onProgress && t.onProgress(o.length, e.length), i.forEach((i => {
                        r = r.then((() => this._getPhotoLinks(i.id, i.listId, t).then((function(r) {
                            n[i.id] = r, o.push(r), t.onProgress && t.onProgress(o.length, e.length);
                        }), (function(r) {
                            if ("Abort" === r.message) throw r;
                            i.url && (o.push(i), t.onProgress && t.onProgress(o.length, e.length), console.error("Photo link from dom", r));
                        }))));
                    })), r = r.then((function() {
                        if (Object.keys(n).slice(1e3).forEach((function(e) {
                            delete n[e];
                        })), !o.length) throw new Error("Photos is not found");
                        return {
                            list: o
                        };
                    }));
                })(u);
            }
            _getPhotoLinks(e, t, r) {
                var n = n => {
                    if (r.abort) return Promise.reject(new Error("Abort"));
                    var o = {
                        act: "show",
                        al: 1,
                        list: t,
                        module: n,
                        photo: e
                    };
                    return (0, f.A)({
                        type: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "X-Requested-With": "XMLHttpRequest"
                        },
                        url: "/al_photos.php",
                        data: o,
                        localXHR: !0,
                        timeout: 6e4
                    }).then((t => {
                        var r = this.parseVkResponse(t.body)[8], n = null;
                        if (r.some((t => {
                            if (t.id === e) return n = this.getMaxPhotoSize(t), !0;
                        })), !n) throw new Error("Photo is is not found!");
                        return new Promise((function(e) {
                            setTimeout(e, 250);
                        })).then((function() {
                            return n;
                        }));
                    }));
                };
                return this._getModuleName().then((function(e) {
                    return n(e);
                })).catch((function(e) {
                    throw "Abort" !== e.message && console.error("Get photo error!", e), e;
                }));
            }
            isReply(e) {
                return (0, Q.A)(e, ".replies " + e.tagName) || (0, Q.A)(e, ".wl_replies " + e.tagName);
            }
            elIsHidden(e) {
                return null === e.offsetParent;
            }
            getWallPostContent() {
                var e = location.href.match(/wall(-?\d+_\d+)/);
                if (e = e && e[1]) return document.getElementById("post" + e) || document.getElementById("wpt" + e);
            }
            _getModuleName() {
                var e = "sfModule";
                return new Promise((function(t, r) {
                    var n = M.A.create("script", {
                        text: '(function(dataArg){if(window.cur&&window.cur.module&&typeof window.cur.module==="string"){document.body.dataset[dataArg]=window.cur.module}})(' + JSON.stringify(e) + ");"
                    });
                    document.body.appendChild(n), setTimeout((function() {
                        n.parentNode.removeChild(n), t(document.body.dataset[e]);
                    }), 0);
                }));
            }
            listToLinks(e) {
                var t = [];
                e.forEach((e => {
                    var r = e.url, n = this.getFilenameFromUrl(r);
                    n || (n = "unknown.jpg"), t.push({
                        filename: n,
                        url: r
                    });
                }));
                var r = String(t.length).length;
                return t.forEach((function(e, t) {
                    for (var n = String(t + 1); n.length < r; ) n = "0" + n;
                    e.filename = n + "-" + e.filename;
                })), t;
            }
            getFilenameFromUrl(e) {
                var t = /\/([\w\-]+\.[a-z0-9]{3,4})(?:\?|$)/i.exec(e);
                return t = t && t[1] || "";
            }
        }
        var T = r(717), G = r(9437), N = r(3410), U = r(9008);
        function z(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function K(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? z(Object(r), !0).forEach((function(t) {
                    (0, b.A)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : z(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        class J {
            constructor(e) {
                this.cache = void 0, this.initData = void 0, this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, i, s, u, l;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element, i = e.initData) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("initData is not defined");

                          case 3:
                            if (t.initData = i, s = null, n && (s = null == n || null === (u = n.parentNode) || void 0 === u ? void 0 : u.id), 
                            !(l = s && s.match(/video_box_wrap(-?\d+)_(-?\d+)/)) && document.location.href.includes("clips") && (l = document.location.href.match(/clip=(-?\d+)_(-?\d+)/)), 
                            !(l = document.location.href.match(/(-?\d+)_(-?\d+)/))) {
                                r.next = 15;
                                break;
                            }
                            return l.shift(), l = l.map((function(e) {
                                return parseInt(e);
                            })), r.abrupt("return", (0, x.A)(l, ((e, t) => {
                                var r = window.mvcur, n = "video" + e + "_" + t;
                                return r && r.listId && (n = `${n}`), {
                                    path: n
                                };
                            })).then(function() {
                                var e = (0, o.A)(a().mark((function e(r) {
                                    var o;
                                    return a().wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            if (r) {
                                                e.next = 2;
                                                break;
                                            }
                                            return e.abrupt("return");

                                          case 2:
                                            return e.next = 4, t.prepareVideoLinks({
                                                hosting: "vk",
                                                action: "getVKLinks",
                                                extVideoId: r.path,
                                                oidVid: l,
                                                playerNode: n
                                            });

                                          case 4:
                                            return o = (o = e.sent).map((e => ("MP4" === e.format && (e.forceDownload = !0), 
                                            e))), e.abrupt("return", t.transformLinks(o));

                                          case 7:
                                          case "end":
                                            return e.stop();
                                        }
                                    }), e);
                                })));
                                return function(t) {
                                    return e.apply(this, arguments);
                                };
                            }()));

                          case 15:
                            throw new Error("oidVid is not defined");

                          case 16:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            prepareVideoLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, u, l, c, d, p, A, h, g, v, I, C, E, y, w, b, x, k, O, S, F;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = [], !e || !e.oidVid) {
                                r.next = 7;
                                break;
                            }
                            return o = (0, m.A)(e.oidVid, 2), i = o[0], u = o[1], r.next = 5, t.getLinksFromMv(i, u);

                          case 5:
                            (l = r.sent) && n.push(...t.prepareLinks(l));

                          case 7:
                            return r.next = 9, (0, R.A)(e);

                          case 9:
                            if (c = r.sent, d = (0, s.A)(t.initData), c && ("getPladformVideo" === e.action ? t.initData.preferences.showUmmyItem && "getRutubeLinks" === c.action ? n.push(...d.popupMenu.prepareLinks.rutube(c.links)) : n.push(...t.prepareLinks(t.preparePladformLinks(c))) : c.links && (p = d.embedDownloader.reMapHosting(c.action)) && n.push(...d.popupMenu.prepareLinks[p](c.links, c.title))), 
                            n.length || "getVKLinks" !== e.action) {
                                r.next = 19;
                                break;
                            }
                            return r.next = 15, t.getVideoLinksAsAjax(e.extVideoId);

                          case 15:
                            A = r.sent, h = A.hosting, (g = A.response) && g.links && (g.isUmmy ? n.push(...g.links) : n.push(...d.popupMenu.prepareLinks[h](g.links, g.title)));

                          case 19:
                            if (v = n.filter((e => -1 !== e.href.indexOf("mycdn.me/"))), I = n.filter((e => -1 !== e.href.indexOf("vkuser"))), 
                            !(v.length || I || n.length <= 2)) {
                                r.next = 47;
                                break;
                            }
                            if (!e.extVideoId) {
                                r.next = 47;
                                break;
                            }
                            return C = {}, (E = document.querySelector('a[href*="' + e.extVideoId + '"]')) && E.dataset.length && ((y = E.closest('[id*="post"]')) && (C.post_id = y.dataset.postId), 
                            C.list = E.dataset.list, C.paylist_id = "wall_" + E.dataset.video.split("_")[0]), 
                            C.video = e.extVideoId.split("?")[0].replace("video", ""), (w = location.href.match(/pl_(wall_.\d+)/)) && w[1] && (C.playlist_id = w[1]), 
                            (b = document.querySelector(`a[data-video="${C.video}"]`)) && b.dataset.list && (C.list = b.dataset.list), 
                            r.next = 33, (0, f.A)({
                                type: "POST",
                                url: `https://${location.hostname}/al_video.php?act=show`,
                                data: K({
                                    act: "show",
                                    al: 1,
                                    autoplay: 1,
                                    module: "groups"
                                }, C)
                            });

                          case 33:
                            return x = r.sent, r.next = 36, N.ht(c, x.body);

                          case 36:
                            if (k = r.sent, O = k.hls, S = k.mp4, O.length || S.length) {
                                r.next = 45;
                                break;
                            }
                            return r.next = 42, N.Oi(c, x.body);

                          case 42:
                            F = r.sent, O = F.hls, S = F.mp4;

                          case 45:
                            n.push(...S, ...O), n = (0, U.W)(n, "href");

                          case 47:
                            return r.next = 49, N.tI((0, U.W)(n, "quality", "itag"), (e => 22 == e.itag));

                          case 49:
                            return n = (n = r.sent).map((e => (e.title = "." === e.title ? "video-" + e.quality : e.title, 
                            e))), r.abrupt("return", n);

                          case 52:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getLinksFromMv(e, t, r) {
                return (0, x.A)([ t, e ], ((e, t) => {
                    var n = window.mvcur;
                    if (n && n.player && n.player.vars) {
                        var o = n.player.vars;
                        return o.vid !== e || o.oid !== t ? r() : {
                            vars: n.player.vars
                        };
                    }
                })).then((e => e ? this.getLinksFromHtml5MetaData(e.vars) : null));
            }
            getLinksFromHtml5MetaData(e) {
                if (e) {
                    var t = e.md_title;
                    if (void 0 !== t) {
                        var r = Object.keys(e).some((e => e.match(/cache([0-9]+)/))) ? /cache([0-9]+)/ : /url([0-9]+)/, n = {}, o = !1;
                        for (var i in e) {
                            var a = null;
                            if ("extra_data" !== i || "52" !== e.extra) {
                                if (null !== (a = i.match(r))) {
                                    var s = e[i], u = s.indexOf("?");
                                    -1 !== u && (s = s.substr(0, u)), o = !0, n[a[1]] = s;
                                }
                            } else n[a = e.hd ? "HD" : "SD"] = e[i], o = !0;
                        }
                        if (o) return {
                            title: t,
                            links: n
                        };
                    }
                }
            }
            prepareLinks(e) {
                var t = e.title, r = [];
                for (var n in e.links) {
                    var o = e.links[n], i = o.match(/[\w]+\.(mp4|flv)(?:\?|$)/i), a = (i = i ? i[1] : "flv").toUpperCase();
                    r.push({
                        href: o,
                        quality: n,
                        title: t,
                        ext: i,
                        format: a,
                        forceDownload: !0
                    });
                }
                return r;
            }
            preparePladformLinks(e) {
                e && "getRutubeLinks" === e.action && (e.links = null);
                var t = e && e.links, r = "noname", n = {};
                if (t) for (var o, i = 0; o = t[i]; i++) r = o.title, n[o.quality] && (o.quality = 0), 
                n[o.quality.toUpperCase()] = o.url;
                return {
                    title: r,
                    links: n
                };
            }
            getVideoLinksAsAjax(e) {
                var t = /video(-?\d+_-?\d+)/.exec(e);
                t = t && t[1];
                var r = (0, T.A)(e).list;
                return this._getModuleName().then((e => new Promise((n => {
                    this.getLinkAsAjax([ t, r ], (function(e, t) {
                        n({
                            hosting: t,
                            response: e
                        });
                    }), e);
                }))));
            }
            _getModuleName() {
                var e = "sfModule";
                return new Promise((function(t, r) {
                    var n = M.A.create("script", {
                        text: '(function(dataArg){if(window.cur&&window.cur.module&&typeof window.cur.module==="string"){document.body.dataset[dataArg]=window.cur.module}})(' + JSON.stringify(e) + ");"
                    });
                    document.body.appendChild(n), setTimeout((function() {
                        n.parentNode.removeChild(n), t(document.body.dataset[e]);
                    }), 0);
                }));
            }
            getLinkAsAjax(e, t, r) {
                this.getLinkAsAjaxRequest({
                    localXHR: 1,
                    type: "POST",
                    url: "/al_video.php",
                    data: {
                        list: e[1],
                        video: e[0],
                        act: "show_inline",
                        module: r,
                        al: 1
                    },
                    success: e => {
                        if (!e) return t();
                        var r = e.match(/<iframe[^>]+src=['"]{1}([^'">]+)['"]{1}[^>]+>/i);
                        if (r || (r = e.match(/var\s+opts\s+=\s+({[^}]*})/im)) && (r = r[1].match(/url:\s+['"]{1}([^'"]+)['"]{1}/i)) && 0 !== r[1].indexOf("//") && 0 !== r[1].indexOf("http") && (r = null), 
                        r) {
                            var n = r[1];
                            if (this.initData.preferences.showUmmyItem && this.isRutubeLink(n)) return t(this.getRutubeLinks(n));
                            if (0 === n.indexOf("//") && (n = "http:" + n), 0 !== n.indexOf("http")) return t();
                            var o = (0, s.A)(this.initData), i = o.embedDownloader.checkUrl(n);
                            if (!i) return t();
                            var a = {
                                action: i.action,
                                extVideoId: i.extVideoId
                            };
                            c.A.sendMessage(a, (function(e) {
                                var r = i.hosting;
                                return e.action !== a.action && (r = o.embedDownloader.reMapHosting(e.action)), 
                                t(e, r);
                            }));
                        } else (0, R.A)({
                            action: "getVkLinksFromData",
                            data: e
                        }).then((function(e) {
                            return t(e, "vk");
                        })).catch((function() {
                            return t({}, "vk");
                        }));
                    },
                    error: function() {
                        t();
                    }
                });
            }
            getLinkAsAjaxRequest(e, t) {
                t = t || 0;
                var r = Object.assign({}, e), n = () => {
                    if (t < 1) return this.getLinkAsAjaxRequest(e, ++t);
                    e.error && e.error();
                }, o = r.data;
                0 === t ? o.act = "show_inline" : 1 === t && (o.act = "show"), (0, G.A)(r, (function(t, r, o) {
                    return t || !o || -1 !== o.indexOf('href="/join"') ? n() : void e.success(o);
                }));
            }
            isRutubeLink(e) {
                return /\/\/.*rutube\..*/.test(e);
            }
            getRutubeLinks(e) {
                if (/rutube[^\/]+\/(?:play|video)\/embed\/(\d+)/.test(e) || /video\.rutube\./.test(e)) return {
                    isUmmy: !0,
                    links: (0, s.A)(this.initData).popupMenu.prepareLinks.rutube(e)
                };
            }
            transformLinks(e) {
                return e.map((e => (e.url = e.href, e.filename = e.title, delete e.href, delete e.title, 
                e)));
            }
        }
        class X {
            constructor(e) {
                this.cache = void 0, this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.mediaId) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("ID is empty!");

                          case 3:
                            if (!t.cache[n]) {
                                r.next = 5;
                                break;
                            }
                            return r.abrupt("return", t.cache[n]);

                          case 5:
                            return r.abrupt("return", (0, x.A)([ n ], (e => {
                                var t = {};
                                return void 0 !== window.cur && cur.pvCurPhoto && cur.pvCurPhoto.id === e && (t = cur.pvCurPhoto), 
                                t;
                            })).then((e => {
                                if (!e || !e.id) throw new Error("ID is not found");
                                var r = t.getMaxPhotoSize(e);
                                if (!r) throw new Error("URL is not found!");
                                var o = u.A.modify(t.getFilenameFromUrl(r.url)), i = o.lastIndexOf("."), a = o.substr(i + 1), s = o.substr(0, i);
                                return t.cache[n] = [ {
                                    url: r.url,
                                    filename: s,
                                    ext: a
                                } ], t.cache[n];
                            })));

                          case 6:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getMaxPhotoSize(e) {
                var t = null, r = null;
                [ "w", "z", "y", "x" ].some((function(n) {
                    return !!(t = e[n + "_"]) || (!!(r = e[n + "_src"]) || void 0);
                })), t || (t = [ r ]);
                var n, o;
                return t[0] ? {
                    url: (n = e.base, o = t[0], o.match(/https?:\/\//i) ? ((o = new URL(o)).pathname.match(/\.[a-z]{3}$/i) || (o += ".jpg"), 
                    o.toString()) : (o.match(/\.[a-z]{3}$/i) || (o += ".jpg"), (n || "").replace(/\/[a-z0-9_:\.]*$/i, "") + "/" + o)),
                    width: t[2] && t[1],
                    height: t[1] && t[2]
                } : null;
            }
            getFilenameFromUrl(e) {
                var t = /\/([\w\-]+\.[a-z0-9]{3,4})(?:\?|$)/i.exec(e);
                return t = t && t[1] || "";
            }
        }
        class Y {
            constructor(e) {
                this.cache = void 0, this.cache = e;
            }
            extractLinks(e) {
                return (0, o.A)(a().mark((function t() {
                    var r, n, o;
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (r = e.element) {
                                t.next = 3;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 3:
                            if ((n = r.querySelector("video")) || (n = r.querySelector(".stories_photo")), n || (n = r.querySelector(".stories_preview")), 
                            n) {
                                t.next = 8;
                                break;
                            }
                            throw new Error("mediaNode is not defined");

                          case 8:
                            if (o = n.src, "stories_photo" === n.className || "stories_preview" === n.className) {
                                t.next = 11;
                                break;
                            }
                            return t.abrupt("return", [ {
                                url: o,
                                filename: `${Date.now()}.mp4`
                            } ]);

                          case 11:
                            return o = n.style.backgroundImage.substring(5, n.style.backgroundImage.length - 2), 
                            t.abrupt("return", [ {
                                url: o,
                                filename: `${Date.now()}.jpg`
                            } ]);

                          case 13:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
        }
        var P = r(8110), V = r(7725);
        function q(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function W(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? q(Object(r), !0).forEach((function(t) {
                    (0, b.A)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : q(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var Z = r(2894);
        class _ {
            constructor(e) {
                this.cache = void 0, this.lastValidRequest = void 0, this.cache = e, this.lastValidRequest = null;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, i, s, l;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 3:
                            if (!n.classList.contains("top_audio_player_title") && !n.classList.contains("audio_page_player_title_performer")) {
                                r.next = 7;
                                break;
                            }
                            return r.abrupt("return", (0, x.A)((() => {
                                var e = null;
                                if ("undefined" != typeof ap && ap._currentAudio && (e = ap._currentAudio), !e && "undefined" != typeof cur && cur.audioPage && cur.audioPage._readyAudio && (e = cur.audioPage._readyAudio), 
                                !e) try {
                                    e = JSON.parse(localStorage.audio_v9_track);
                                } catch (e) {}
                                return e;
                            })).then(function() {
                                var e = (0, o.A)(a().mark((function e(r) {
                                    var n, o, i;
                                    return a().wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            if (r || (n = document.querySelector("._audio_page_player[data-audio]"), r = n && t.readNewDataAudio(n.dataset.audio)), 
                                            (o = t.getNewTrackInfo(r)) && o.fullId) {
                                                e.next = 4;
                                                break;
                                            }
                                            throw new Error("Track info is not found");

                                          case 4:
                                            return i = u.A.modify(t.getNewAudioFilename(o)), e.next = 7, t._preloadNewTrackUrl(o);

                                          case 7:
                                            return o.url = e.sent, e.abrupt("return", [ W(W({}, o), {}, {
                                                filename: i
                                            }) ]);

                                          case 9:
                                          case "end":
                                            return e.stop();
                                        }
                                    }), e);
                                })));
                                return function(t) {
                                    return e.apply(this, arguments);
                                };
                            }()));

                          case 7:
                            if (i = t.readNewDataAudio(n.dataset.audio), (s = t.getNewTrackInfo(i)) && s.fullId) {
                                r.next = 11;
                                break;
                            }
                            throw new Error("Track info is not found");

                          case 11:
                            if (!s.url) {
                                r.next = 13;
                                break;
                            }
                            return r.abrupt("return", t.unmaskUrlViaUtil([ [ null, null, s.url ] ]).then((e => (s.url = e[0][2], 
                            s))));

                          case 13:
                            return l = u.A.modify(t.getNewAudioFilename(s)), r.next = 16, t._preloadNewTrackUrl(s);

                          case 16:
                            return s.url = r.sent, r.abrupt("return", [ W(W({}, s), {}, {
                                filename: l
                            }) ]);

                          case 18:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            readNewDataAudio(e) {
                try {
                    return JSON.parse(e);
                } catch (e) {
                    return null;
                }
            }
            getNewTrackInfo(e) {
                if (!e) return null;
                var t = {};
                return "string" == typeof e[2] && (t.url = e[2]), t.title = e[3], t.title && (t.title = u.A.decodeSpecialChars(this.rmEmTags(t.title))), 
                t.performer = e[4], t.performer && (t.performer = u.A.decodeSpecialChars(this.rmEmTags(t.performer))), 
                t.duration = parseInt(e[5]), t.actionHash = this.getTrackActionHash(e), t.urlHash = this.getTrackUrlHash(e), 
                e[1] && e[0] && (t.fullId = e[1] + "_" + e[0]), t.id = e[0], t.ownerId = e[1], t;
            }
            rmEmTags(e) {
                return /<em>.*<\/em>/.test(e) && (e = e.replace(/<\/?em>/g, "")), e;
            }
            getTrackActionHash(e) {
                return (e[13] || "").split("/")[2] || "";
            }
            getTrackUrlHash(e) {
                return (e[13] || "").split("/")[5] || "";
            }
            unmaskUrlViaUtil(e) {
                return this.needUnmask(e) ? (0, x.A)([], "function(){return vk.id}").then((t => {
                    var r = e.map((e => {
                        try {
                            return Array.isArray(e) && e[2] ? (e[2] = P.ys(t, e[2]), e) : null;
                        } catch (e) {
                            return console.error("track decode error: ", e), null;
                        }
                    }));
                    return Promise.all(r).then((e => e.filter((e => null !== e))));
                })) : Promise.resolve(e);
            }
            needUnmask(e) {
                var t = /audio_api_unavailable/;
                return e.some((function(e) {
                    if (t.test(e[2])) return !0;
                }));
            }
            getNewAudioFilename(e) {
                var t = this.getNewAudioFullTitle(e);
                return t && (t += ".mp3"), t;
            }
            getNewAudioFullTitle(e) {
                var t = [];
                return e.title && t.push(e.title), e.performer && (t.length && t.unshift(" - "), 
                t.unshift(e.performer)), t.join("");
            }
            _preloadNewTrackUrl(e) {
                var t = {}, r = e.fullId, n = e.actionHash, o = e.urlHash, i = t[r];
                return i || (i = t[r] = this._getNewTrackListByIdsWithActionHash([ {
                    fullId: r,
                    actionHash: n,
                    urlHash: o
                } ], {
                    withoutUnblock: !0
                }).then((e => {
                    delete t[r];
                    var n = null;
                    e.some((function(e) {
                        if (e[1] + "_" + e[0] === r) return n = e, !0;
                    }));
                    var o = n && this.getNewTrackInfo(n);
                    if (!o || !o.url) throw new Error("Track is not found");
                    return o.url;
                }), (function(e) {
                    throw delete t[r], e;
                })).then((e => this.unmaskUrl([ e ]))).then((e => e[0]))), i;
            }
            _getNewTrackListByIdsWithActionHash(e) {
                for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = 0, n = {}, o = this.cache, i = e.filter((e => {
                    var t = e.fullId;
                    return !o[t] || (n[t] = o[t], r++, !1);
                })), a = []; i.length; ) a.push(i.splice(0, 9));
                var s = e.length, u = Promise.resolve();
                a.forEach((e => {
                    u = u.then((() => {
                        var i = () => {
                            if (t.abort) throw new Error("Abort");
                            var i = e.filter((e => e.fullId && e.actionHash && e.urlHash)).map((e => e.fullId + "_" + e.actionHash + "_" + e.urlHash)), a = {
                                type: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "X-Requested-With": "XMLHttpRequest"
                                },
                                data: Z.stringify({
                                    act: "reload_audio",
                                    al: 1,
                                    ids: i.join(",")
                                }),
                                url: "/al_audio.php",
                                localXHR: !0
                            };
                            return (0, f.A)(a).then((e => {
                                var i = this.parseVkResponse(e.body)[5];
                                if (!i || !Array.isArray(i)) throw new Error("Track list is not found!");
                                return this.lastValidRequest = a, i.forEach((e => {
                                    var t = e[1] + "_" + e[0];
                                    o[t] = e, n[t] = e, r++;
                                })), t.onProgress && t.onProgress(r, s), new Promise((e => {
                                    setTimeout(e, 250);
                                }));
                            }));
                        }, a = 2, u = () => i().catch((e => {
                            if ("Track list is not found!" === e.message && !t.withoutUnblock) {
                                if (this.lastValidRequest) return this.waitUntilUnblock(t).then(i);
                                if (a-- > 0) return new Promise((e => setTimeout(e, 15e3))).then((() => u()));
                            }
                            throw e;
                        }));
                        return u().catch((e => {
                            "Abort" !== e.message && console.error("requestIds error!", e);
                        }));
                    }));
                })), u = u.then((function() {
                    Object.keys(o).slice(1e3).forEach((function(e) {
                        delete o[e];
                    }));
                    var t = [];
                    return e.forEach((e => {
                        var r = e.fullId, o = n[r];
                        o && t.push(o);
                    })), t;
                }));
                var l = e => {
                    if (this.isHlsLink(e)) {
                        var t = (e = e.replace("/index.m3u8", ".mp3")).split("/"), r = -1 !== e.indexOf("audios") ? 1 : 0;
                        return t.splice(t.length - (2 + r), 1), t.join("/");
                    }
                    return e;
                };
                return u = u.then((e => this.unmaskUrlViaUtil(e))).then((e => {
                    var t = (0, V.A)(5), r = e.map((e => t((() => {
                        var t = e[2], r = l(t);
                        return this.isHlsLink(t) ? (0, f.A)({
                            method: "HEAD",
                            url: r
                        }).then((() => (e[2] = r, e)), (t => (console.warn("getNewTrackListByIdsWithActionHash: mp3 file not available. ", t), 
                        e))) : e;
                    }))));
                    return Promise.all(r);
                }));
            }
            parseVkResponse(e) {
                try {
                    var t = JSON.parse(e).payload[1];
                    return [ null, null, null, null, null, t[0], t[1], null, t[3] ];
                } catch (e) {}
                for (var r = function(e) {
                    return !0 === e ? 1 : parseInt(e) || 0;
                }, n = function(e) {
                    return !0 === e ? 1 : parseFloat(e) || 0;
                }, o = e.split("<!>"), i = o.length - 1; i >= 0; --i) {
                    var a = o[i];
                    if ("<!" == a.substr(0, 2)) {
                        var s = a.indexOf(">"), u = a.substr(2, s - 2);
                        switch (a = a.substr(s + 1), u) {
                          case "json":
                            var l = null;
                            try {
                                l = JSON.parse(a);
                            } catch (e) {}
                            o[i] = l;
                            break;

                          case "int":
                            o[i] = r(a);
                            break;

                          case "float":
                            o[i] = n(a);
                            break;

                          case "bool":
                            o[i] = !!r(a);
                            break;

                          case "null":
                            o[i] = null;
                            break;

                          case "pageview_candidate":
                          case "debug":
                            o.pop();
                        }
                    }
                }
                return o;
            }
            waitUntilUnblock(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = 10, o = 15e3, t.lastValidRequest) {
                                r.next = 4;
                                break;
                            }
                            return r.abrupt("return", Promise.reject(new Error("Last valid request is empty!")));

                          case 4:
                            return i = () => new Promise((e => {
                                setTimeout(e, o);
                            })).then((() => {
                                if (e.abort) throw new Error("Abort");
                                return (0, f.A)(t.lastValidRequest).then((e => {
                                    if (n--, !t.parseVkResponse(e.body)[5]) {
                                        if (n > 0) return i();
                                        throw new Error("Can't request data");
                                    }
                                }));
                            })), r.abrupt("return", i().then((function() {
                                return new Promise((function(e) {
                                    setTimeout(e, 250);
                                }));
                            })));

                          case 6:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            isHlsLink(e) {
                return /\.m3u8(\?|$)/.test(e);
            }
            unmaskUrl(e) {
                return this.needUnmask(e) ? (0, x.A)([ e ], 'function(idsArr){var aFail=false;var bFail=false;var cFail=false;var unmaskUrl=function unmaskUrl(url){var _url="";if(!aFail&&window.sfUnmaskUrl){try{_url=window.sfUnmaskUrl(url)}catch(err){aFail=true}}if(!cFail&&!_url&&window.AudioPlayerHTML5){try{var res=null;var r={_isHlsUrl:function _isHlsUrl(url){res=url;return true},_initHls:function _initHls(){}};window.AudioPlayerHTML5.prototype._setAudioNodeUrl.apply(r,[null,url]);_url=res}catch(err){cFail=true}}if(!bFail&&!_url&&window.AudioPlayerFlash){try{var r={};window.AudioPlayerFlash.prototype.setUrl.apply(r,[url]);_url=r._url}catch(err){bFail=true}}if(typeof _url!=="string"){_url=""}return _url};idsArr.forEach(function(item){var url=unmaskUrl(item[2]);if(url){item[2]=url}});return idsArr}').then((function(t) {
                    return t || e;
                })) : Promise.resolve(e);
            }
        }
        class $ {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.Tj.vkPhoto ? 3 : r.t0 === n.Tj.vkAlbum || r.t0 === n.Tj.vkAlbums ? 4 : r.t0 === n.Tj.vkClip || r.t0 === n.Tj.vkClips || r.t0 === n.Tj.vkVideo ? 5 : r.t0 === n.Tj.vkStory ? 6 : r.t0 === n.Tj.vkAudio || r.t0 === n.Tj.vkAudios ? 7 : 8;
                            break;

                          case 3:
                            return r.abrupt("return", new X(t.cache).extractLinks(e));

                          case 4:
                            return r.abrupt("return", new H(t.cache).extractLinks(e));

                          case 5:
                            return r.abrupt("return", new J(t.cache).extractLinks(e));

                          case 6:
                            return r.abrupt("return", new Y(t.cache).extractLinks(e));

                          case 7:
                            return r.abrupt("return", new _(t.cache).extractLinks(e));

                          case 8:
                            throw new Error(`vkPageType ${t.pageType} is not supported`);

                          case 9:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        var ee = r(9580), te = r(7736), re = r(2894);
        function ne(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function oe(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ne(Object(r), !0).forEach((function(t) {
                    (0, b.A)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ne(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var ie = {
            web: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB",
                        clientVersion: "2.20240726.00.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 1,
                REQUIRE_PO_TOKEN: !0,
                SUPPORTS_COOKIES: !0
            },
            web_safari: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB",
                        clientVersion: "2.20240726.00.00",
                        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15,gzip(gfe)"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 1,
                REQUIRE_PO_TOKEN: !0,
                SUPPORTS_COOKIES: !0
            },
            web_embedded: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB_EMBEDDED_PLAYER",
                        clientVersion: "1.20240723.01.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 56,
                SUPPORTS_COOKIES: !0
            },
            web_music: {
                INNERTUBE_HOST: "music.youtube.com",
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB_REMIX",
                        clientVersion: "1.20240724.00.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 67,
                SUPPORTS_COOKIES: !0
            },
            web_creator: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB_CREATOR",
                        clientVersion: "1.20240723.03.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 62,
                REQUIRE_AUTH: !0,
                SUPPORTS_COOKIES: !0
            },
            android: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "ANDROID",
                        clientVersion: "19.44.38",
                        androidSdkVersion: 30,
                        userAgent: "com.google.android.youtube/19.44.38 (Linux; U; Android 11) gzip",
                        osName: "Android",
                        osVersion: "11"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 3,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_PO_TOKEN: !0
            },
            android_music: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "ANDROID_MUSIC",
                        clientVersion: "7.27.52",
                        androidSdkVersion: 30,
                        userAgent: "com.google.android.apps.youtube.music/7.27.52 (Linux; U; Android 11) gzip",
                        osName: "Android",
                        osVersion: "11"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 21,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_PO_TOKEN: !0,
                REQUIRE_AUTH: !0,
                SUPPORTS_COOKIES: !0
            },
            android_creator: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "ANDROID_CREATOR",
                        clientVersion: "24.45.100",
                        androidSdkVersion: 30,
                        userAgent: "com.google.android.apps.youtube.creator/24.45.100 (Linux; U; Android 11) gzip",
                        osName: "Android",
                        osVersion: "11"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 14,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_PO_TOKEN: !0,
                REQUIRE_AUTH: !0
            },
            android_vr: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "ANDROID_VR",
                        clientVersion: "1.60.19",
                        deviceMake: "Oculus",
                        deviceModel: "Quest 3",
                        androidSdkVersion: 32,
                        userAgent: "com.google.android.apps.youtube.vr.oculus/1.60.19 (Linux; U; Android 12L; eureka-user Build/SQ3A.220605.009.A1) gzip",
                        osName: "Android",
                        osVersion: "12L"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 28,
                REQUIRE_JS_PLAYER: !1,
                SUPPORTS_COOKIES: !0
            },
            ios: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "IOS",
                        clientVersion: "19.45.4",
                        deviceMake: "Apple",
                        deviceModel: "iPhone16,2",
                        userAgent: "com.google.ios.youtube/19.45.4 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
                        osName: "iPhone",
                        osVersion: "18.1.0.22B83"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 5,
                REQUIRE_JS_PLAYER: !1
            },
            ios_music: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "IOS_MUSIC",
                        clientVersion: "7.27.0",
                        deviceMake: "Apple",
                        deviceModel: "iPhone16,2",
                        userAgent: "com.google.ios.youtubemusic/7.27.0 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
                        osName: "iPhone",
                        osVersion: "18.1.0.22B83"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 26,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_AUTH: !0,
                SUPPORTS_COOKIES: !0
            },
            ios_creator: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "IOS_CREATOR",
                        clientVersion: "24.45.100",
                        deviceMake: "Apple",
                        deviceModel: "iPhone16,2",
                        userAgent: "com.google.ios.ytcreator/24.45.100 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
                        osName: "iPhone",
                        osVersion: "18.1.0.22B83"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 15,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_AUTH: !0
            },
            mweb: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "MWEB",
                        clientVersion: "2.20240726.01.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 2,
                SUPPORTS_COOKIES: !0
            },
            tv: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "TVHTML5",
                        clientVersion: "7.20240724.13.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 7,
                SUPPORTS_COOKIES: !0
            },
            tv_embedded: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
                        clientVersion: "2.0"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 85,
                REQUIRE_AUTH: !0,
                SUPPORTS_COOKIES: !0
            }
        };
        class ae {
            constructor() {
                this.INNERTUBE_CLIENTS = ie, this.visitorData = null;
            }
            fetchClientRequest() {
                var e = arguments, t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return n = e.length > 0 && void 0 !== e[0] ? e[0] : "android_vr", i = (o = e.length > 1 ? e[1] : void 0).videoId, 
                            s = o.url, r.abrupt("return", t.getVisitorData(s).then((e => {
                                t.visitorData = e;
                                var r = {
                                    prettyPrint: !1
                                }, o = ie[n], a = {
                                    playbackContext: {
                                        contentPlaybackContext: {
                                            html5Preference: "HTML5_PREF_WANTS"
                                        }
                                    },
                                    contentCheckOk: !0,
                                    racyCheckOk: !0,
                                    videoId: i,
                                    context: {
                                        client: oe({
                                            hl: "en",
                                            timeZone: "UTC",
                                            utcOffsetMinutes: 0
                                        }, o.INNERTUBE_CONTEXT.client)
                                    }
                                }, s = {
                                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                                    "accept-encoding": "gzip, deflate, br",
                                    "accept-language": "en-us,en;q=0.5",
                                    connection: "keep-alive",
                                    "content-type": "application/json",
                                    host: "www.youtube.com",
                                    origin: "https://www.youtube.com",
                                    "sec-fetch-mode": "navigate",
                                    "x-youtube-client-name": o.INNERTUBE_CONTEXT_CLIENT_NAME,
                                    "x-youtube-client-version": o.INNERTUBE_CONTEXT.client.clientVersion,
                                    "x-goog-visitor-id": t.visitorData
                                };
                                return o.INNERTUBE_CONTEXT.client.userAgent && (s["user-agent"] = o.INNERTUBE_CONTEXT.client.userAgent), 
                                t.syncYoutubeCookies().then((() => fetch(`https://www.youtube.com/youtubei/v1/player?${re.stringify(r)}`, {
                                    method: "POST",
                                    body: JSON.stringify(a),
                                    headers: s
                                })));
                            })));

                          case 3:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            syncYoutubeCookies() {
                return new Promise(((e, t) => {
                    try {
                        chrome && chrome.cookies ? chrome.cookies.getAll({
                            domain: "youtube.com"
                        }, (t => {
                            t.forEach((e => {
                                Object.hasOwn(e, "hostOnly") || chrome.cookies.set(oe({
                                    url: "https://youtube.com"
                                }, e));
                            })), e();
                        })) : e();
                    } catch (e) {
                        t(e);
                    }
                }));
            }
            getVisitorData(e) {
                return fetch(e).then((e => e.text().then((e => /"VISITOR_DATA":\s*"([^"]+)"/.exec(e)[1]))));
            }
        }
        var se = r(2894), ue = (0, g.A)("YtShortLinkExtractor");
        class le {
            constructor(e) {
                this.cache = void 0, this.needsFirefoxFallback = !1, this.innertubeClient = new ae, 
                this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, i, s, u, l, d, p, A, h;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.mediaId, i = e.mediaUrl, s = e.noDash, u = e.checkSubtitles, n) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("videoId is not defined");

                          case 3:
                            if (!t.cache[n]) {
                                r.next = 5;
                                break;
                            }
                            return r.abrupt("return", t.cache[n]);

                          case 5:
                            if (i) {
                                r.next = 7;
                                break;
                            }
                            throw new Error("videoUrl is not defined");

                          case 7:
                            if (void 0 !== s) {
                                r.next = 9;
                                break;
                            }
                            throw new Error("noDash is not defined");

                          case 9:
                            if (void 0 !== u) {
                                r.next = 11;
                                break;
                            }
                            throw new Error("checkSubtitles is not defined");

                          case 11:
                            if (!c.A.isFirefox || t.needsFirefoxFallback) {
                                r.next = 24;
                                break;
                            }
                            return r.prev = 12, r.next = 15, t.getYoutubeLinksForFirefox(e);

                          case 15:
                            l = r.sent, r.next = 22;
                            break;

                          case 18:
                            return r.prev = 18, r.t0 = r.catch(12), t.needsFirefoxFallback = !0, r.abrupt("return", t.extractLinks(e));

                          case 22:
                            r.next = 27;
                            break;

                          case 24:
                            return r.next = 26, t.getYoutubeLinksFromBackground(n, i, s).catch(function() {
                                var e = (0, o.A)(a().mark((function e(r) {
                                    return a().wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            return ue && ue.error("getVideoLinks error", r), e.abrupt("return", t.getVideoInfoFromPlayerApi(n).then((e => {
                                                var t = e.videoInfo;
                                                return (0, R.A)({
                                                    action: "ytPrepareVideoInfo",
                                                    videoId: n,
                                                    checkSubtitles: u,
                                                    noDash: s,
                                                    config: t
                                                });
                                            })));

                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }), e);
                                })));
                                return function(t) {
                                    return e.apply(this, arguments);
                                };
                            }()).then((e => {
                                if (!e.links) throw new Error("Links not found");
                                return e;
                            }));

                          case 26:
                            l = r.sent;

                          case 27:
                            if (d = 0, l.links && (d = Object.keys(l.links).length, l.links.meta && d--), l.links && d) {
                                r.next = 31;
                                break;
                            }
                            throw new Error("Links not found");

                          case 31:
                            if (e.initData) {
                                r.next = 33;
                                break;
                            }
                            throw new Error("initData is not defined");

                          case 33:
                            return p = t.prepMenuLinks(l.links, l.title || t.getTitleModify(), l.subtitles, e.initData), 
                            A = p.menuLinks, h = p.multiLang, t.cache[n] = {
                                menuLinks: t.transformLinks(A),
                                multiLang: h
                            }, r.abrupt("return", t.cache[n]);

                          case 36:
                          case "end":
                            return r.stop();
                        }
                    }), r, null, [ [ 12, 18 ] ]);
                })))();
            }
            getYoutubeLinksFromBackground(e, t, r) {
                return (0, o.A)(a().mark((function n() {
                    return a().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            return n.abrupt("return", (0, R.A)({
                                action: "getYoutubeLinksFromConfig",
                                extVideoId: e,
                                url: t,
                                noDash: r,
                                config: {
                                    args: {
                                        video_id: e
                                    }
                                }
                            }).then((e => {
                                if (!e.links) throw new Error("getYoutubeLinksFromBackground. Links not found");
                                return e;
                            })));

                          case 1:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })))();
            }
            getVideoInfoFromPlayerApi(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.abrupt("return", t.requestInnertubeContext(e).then((t => {
                                var r = "https://www.youtube.com/youtubei/v1/player?" + se.stringify({
                                    key: t.INNERTUBE_API_KEY
                                });
                                return (0, f.A)({
                                    url: r,
                                    method: "POST",
                                    localXHR: c.A.isGM,
                                    json: !0,
                                    data: JSON.stringify({
                                        context: t.INNERTUBE_CONTEXT,
                                        videoId: e
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-Youtube-Client-Name": t.INNERTUBE_CONTEXT_CLIENT_NAME || "55",
                                        "X-Youtube-Client-Version": t.INNERTUBE_CONTEXT_CLIENT_VERSION || "1.20210331.1.0"
                                    }
                                });
                            })).then((e => ({
                                videoInfo: {
                                    player_response: e.body
                                }
                            }))));

                          case 1:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            requestInnertubeContext(e) {
                return (0, o.A)(a().mark((function t() {
                    var r;
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return r = "https://www.youtube.com/embed/" + encodeURIComponent(e), t.abrupt("return", (0, 
                            f.A)({
                                url: r,
                                localXHR: c.A.isGM
                            }).then((e => {
                                var t = (0, ee.A)(e.body, /INNERTUBE_CONTEXT":(.*?),/);
                                if (!t.length || !t[0].INNERTUBE_CONTEXT || !t[0].INNERTUBE_API_KEY) throw Error("INNERTUBE_CONTEXT not found");
                                return t[0];
                            })));

                          case 2:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            prepMenuLinks(e, t, r, n) {
                for (var o, i = (0, s.A)(n), a = i.popupMenu.prepareLinks.youtube(e, t, r), u = a.menuLinks, l = a.multiLang, c = [], d = 0; o = u[d]; d++) c.push({
                    prop: o
                });
                return {
                    menuLinks: u = i.popupMenu.sortMenuItems(c),
                    multiLang: l
                };
            }
            getTitleModify() {
                var e = this.getTitle();
                return e && (e = this.modifyTitle(e)), e;
            }
            getTitle() {
                var e = document.getElementById("watch-headline-title");
                if (e) return e.textContent;
                for (var t = document.getElementsByTagName("meta"), r = 0; r < t.length; r++) {
                    var n = t[r].getAttribute("name");
                    if (n && "title" == n.toLowerCase()) return t[r].getAttribute("content");
                }
                var o = 0 === location.host.indexOf("m.");
                return (0, te.A)() || o ? document.title.replace(/ - YouTube$/, "") : "";
            }
            modifyTitle(e) {
                return e = (e = (e = (e = (e = (e = e.replace(/[\x2F\x5C\x3A\x7C]/g, "-")).replace(/[\x2A\x3F]/g, "")).replace(/\x22/g, "'")).replace(/\x3C/g, "(")).replace(/\x3E/g, ")")).replace(/(?:^\s+)|(?:\s+$)/g, "");
            }
            transformLinks(e) {
                return JSON.parse(JSON.stringify(e)).map(((t, r) => (t.prop.url = t.prop.href, t.prop.filename = t.prop.title, 
                t.prop.func = e[r].prop.func, delete t.prop.href, delete t.prop.title, t.prop)));
            }
            getYoutubeLinksForFirefox(e) {
                var t = e.mediaId, r = e.checkSubtitles, n = e.noDash, o = e.mediaUrl;
                return this.innertubeClient.fetchClientRequest("android_vr", {
                    videoId: t,
                    url: o
                }).then((e => e.json())).then((e => {
                    if (e && e.playabilityStatus && "This video is unavailable" === e.playabilityStatus.reason) throw new Error("TRY_FIREFOX_IOS");
                    if (e && e.videoDetails && e.videoDetails.videoId !== t) throw new Error("TRY_FIREFOX_IOS");
                    if (e && e.playabilityStatus && "LOGIN_REQUIRED" === e.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                    var o = {
                        player_response: e
                    };
                    return (0, R.A)({
                        action: "ytPrepareVideoInfo",
                        videoId: t,
                        checkSubtitles: r,
                        noDash: n,
                        config: o
                    });
                })).catch((t => {
                    if (console.log("err", t.message), "TRY_FIREFOX_IOS" === t.message || "LOGIN_REQUIRED" === t.message) return this.getYoutubeLinksForFirefoxIos(e);
                    throw t;
                }));
            }
            getYoutubeLinksForFirefoxIos(e) {
                var t = e.mediaId, r = e.checkSubtitles, n = e.noDash, o = e.mediaUrl;
                return this.innertubeClient.fetchClientRequest("ios", {
                    videoId: t,
                    url: o
                }).then((e => e.json())).then((e => {
                    if (e && e.playabilityStatus && "This video is unavailable" === e.playabilityStatus.reason) throw new Error("This video is unavailable");
                    if (e && e.playabilityStatus && "LOGIN_REQUIRED" === e.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                    var o = {
                        player_response: e
                    };
                    return (0, R.A)({
                        action: "ytPrepareVideoInfo",
                        videoId: t,
                        checkSubtitles: r,
                        noDash: n,
                        config: o
                    });
                })).catch((e => {
                    throw e;
                }));
            }
        }
        class ce {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.xl.ytShort || r.t0 === n.xl.ytVideo || r.t0 === n.xl.ytFeedHistory || r.t0 === n.xl.ytFeedLibrary || r.t0 === n.xl.ytFeedSubscriptions || r.t0 === n.xl.ytFeedTrending || r.t0 === n.xl.ytLikedVideos || r.t0 === n.xl.ytWatchLater || r.t0 === n.xl.ytPlaylistVideos || r.t0 === n.xl.ytChannel || r.t0 === n.xl.ytGaming ? 3 : 4;
                            break;

                          case 3:
                            return r.abrupt("return", new le(t.cache).extractLinks(e));

                          case 4:
                            throw new Error(`ytPageType ${t.pageType} is not supported`);

                          case 5:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        var de = r(4353), pe = (0, g.A)("ViShortLinkExtractor");
        class Ae {
            constructor(e) {
                this.cache = void 0, this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, i, s, u;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.mediaId) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("mediaId is not defined");

                          case 3:
                            if (!t.cache[n]) {
                                r.next = 5;
                                break;
                            }
                            return r.abrupt("return", t.cache[n]);

                          case 5:
                            if (e.initData) {
                                r.next = 7;
                                break;
                            }
                            throw new Error("initData is not defined");

                          case 7:
                            return r.next = 9, t.getVimeoLinks(n).catch(function() {
                                var e = (0, o.A)(a().mark((function e(r) {
                                    return a().wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            return pe && pe.error("getVideoLinks error", r), e.abrupt("return", t.getVimeoLinksFromBackground(n));

                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }), e);
                                })));
                                return function(t) {
                                    return e.apply(this, arguments);
                                };
                            }()).then((e => {
                                if (!e.links) throw new Error("getVimeoLinksFromBackground. Links not found");
                                return e;
                            }));

                          case 9:
                            return i = r.sent, s = t.prepMenuLinks(i.links, i.title, e.initData), u = s.menuLinks, 
                            t.cache[n] = t.transformLinks(u), r.abrupt("return", t.cache[n]);

                          case 13:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getVimeoLinksFromBackground(e) {
                return (0, o.A)(a().mark((function t() {
                    var r, n, o;
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return r = [ /"video":{/, /"request":{/, /"files":/ ], n = (0, de.A)(document.body.innerHTML, r), 
                            o = null, t.next = 5, n.some((function(e) {
                                return (0, ee.A)(e, r).some((function(e) {
                                    if (e.video && e.request && e.request.files) return o = e, !0;
                                }));
                            }));

                          case 5:
                            return t.abrupt("return", (0, R.A)({
                                action: "getVimeoLinksFromConfig",
                                extVideoId: e,
                                config: o
                            }).then((e => {
                                if (null === e || !e.links) throw new Error("getVimeoLinksFromConfig. Links not found in config");
                                return e;
                            })));

                          case 6:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            getVimeoLinks(e) {
                return (0, o.A)(a().mark((function t() {
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.abrupt("return", (0, R.A)({
                                action: "getVimeoLinks",
                                extVideoId: e
                            }).then((e => {
                                if (!e.links) throw new Error("getVimeoLinks. Links not found");
                                return e;
                            })));

                          case 1:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            transformLinks(e) {
                return e.map((e => (e.url = e.href, e.filename = e.title, delete e.href, delete e.title, 
                e)));
            }
            prepMenuLinks(e, t, r) {
                return {
                    menuLinks: (0, s.A)(r).popupMenu.prepareLinks.vimeo(e, t)
                };
            }
        }
        class he {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.d5.viVideo || r.t0 === n.d5.viProfileFeed || r.t0 === n.d5.viBlogVideo ? 3 : 4;
                            break;

                          case 3:
                            return r.abrupt("return", new Ae(t.cache).extractLinks(e));

                          case 4:
                            throw new Error(`viPageType ${t.pageType} is not supported`);

                          case 5:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        var fe = r(3434), ge = r(1853), ve = r(172);
        function Ie(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function Ce(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Ie(Object(r), !0).forEach((function(t) {
                    (0, b.A)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ie(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        class me {
            constructor(e) {
                this.cache = void 0, this.token = null, this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (null != e && e.initData) {
                                r.next = 2;
                                break;
                            }
                            throw new Error("initData is not found");

                          case 2:
                            if (n = t.getVideoId()) {
                                r.next = 5;
                                break;
                            }
                            throw new Error("Video is not found");

                          case 5:
                            if (!t.cache[n]) {
                                r.next = 7;
                                break;
                            }
                            return r.abrupt("return", t.cache[n]);

                          case 7:
                            return r.next = 9, t.getVideoData(n);

                          case 9:
                            if (o = r.sent) {
                                r.next = 12;
                                break;
                            }
                            throw new Error("Failed to fetch video data");

                          case 12:
                            return r.next = 14, t.fetchHLSManifest(o.hlsURL, o.title);

                          case 14:
                            return i = r.sent, s = [ Ce({}, i) ], t.cache[n] = s, r.abrupt("return", s);

                          case 18:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getVideoId() {
                var e = /\/video\/([^\/?#]+)/.exec(location.href);
                return e ? e[1] : "";
            }
            getToken() {
                var e = this;
                return (0, o.A)(a().mark((function t() {
                    var r;
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (!e.token || !e.isTokenValid(e.token)) {
                                t.next = 2;
                                break;
                            }
                            return t.abrupt("return", e.token);

                          case 2:
                            return t.next = 4, fetch("https://graphql.api.dailymotion.com/oauth/token", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                                    "User-Agent": "dailymotion/240213162706 CFNetwork/1492.0.1 Darwin/23.3.0",
                                    Authorization: "Basic MGQyZDgyNjQwOWFmOWU3MmRiNWQ6ODcxNmJmYTVjYmEwMmUwMGJkYTVmYTg1NTliNDIwMzQ3NzIyYWMzYQ=="
                                },
                                body: "traffic_segment=&grant_type=client_credentials"
                            }).then((e => e.json())).catch((() => null));

                          case 4:
                            if (null == (r = t.sent) || !r.access_token) {
                                t.next = 8;
                                break;
                            }
                            return e.token = r.access_token, t.abrupt("return", e.token);

                          case 8:
                            return t.abrupt("return", null);

                          case 9:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            isTokenValid(e) {
                return 1e3 * JSON.parse(Buffer.from(e.split(".")[1], "base64").toString()).exp > Date.now();
            }
            getVideoData(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.next = 2, t.getToken();

                          case 2:
                            if (o = r.sent) {
                                r.next = 5;
                                break;
                            }
                            throw new Error("Failed to fetch access token");

                          case 5:
                            return r.next = 7, fetch("https://graphql.api.dailymotion.com/", {
                                method: "POST",
                                headers: {
                                    "User-Agent": "dailymotion/240213162706 CFNetwork/1492.0.1 Darwin/23.3.0",
                                    Authorization: `Bearer ${o}`,
                                    "Content-Type": "application/json",
                                    "X-DM-AppInfo-Version": "7.16.0_240213162706",
                                    "X-DM-AppInfo-Type": "iosapp",
                                    "X-DM-AppInfo-Id": "com.dailymotion.dailymotion"
                                },
                                body: JSON.stringify({
                                    operationName: "Media",
                                    query: "\n          query Media($xid: String!, $password: String) {\n            media(xid: $xid, password: $password) {\n              __typename\n              ... on Video {\n                xid\n                hlsURL\n                duration\n                title\n                channel {\n                  displayName\n                }\n              }\n            }\n          }\n        ",
                                    variables: {
                                        xid: e
                                    }
                                })
                            }).then((e => 200 === e.status ? e.json() : null)).catch((() => null));

                          case 7:
                            if (i = r.sent, (s = null == i || null === (n = i.data) || void 0 === n ? void 0 : n.media) && "Video" === s.__typename && s.hlsURL) {
                                r.next = 11;
                                break;
                            }
                            throw new Error("Video data is invalid");

                          case 11:
                            return r.abrupt("return", {
                                hlsURL: s.hlsURL,
                                title: s.title
                            });

                          case 12:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            fetchHLSManifest(e, t) {
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.abrupt("return", {
                                title: t,
                                ext: "mp4",
                                format: "MP4",
                                url: "#mux",
                                forceDownload: !1,
                                noSize: !0,
                                func(r) {
                                    r.preventDefault(), (0, ge.A)((0, ve.n)(fe.Ay, {
                                        filename: u.A.modify(t) + ".mp4",
                                        format: "mp4",
                                        sources: [ {
                                            url: e,
                                            format: "mp4"
                                        } ],
                                        convertType: "hls"
                                    }), "sf-muxer-parent");
                                }
                            });

                          case 1:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        class Ee {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.X7.daVideo ? 3 : 4;
                            break;

                          case 3:
                            return r.abrupt("return", new me(t.cache).extractLinks(e));

                          case 4:
                            throw new Error(`daPageType ${t.pageType} is not supported`);

                          case 5:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        function ye(e, t) {
            var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!r) {
                if (Array.isArray(e) || (r = function(e, t) {
                    if (!e) return;
                    if ("string" == typeof e) return we(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === r && e.constructor && (r = e.constructor.name);
                    if ("Map" === r || "Set" === r) return Array.from(e);
                    if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return we(e, t);
                }(e)) || t && e && "number" == typeof e.length) {
                    r && (e = r);
                    var n = 0, o = function() {};
                    return {
                        s: o,
                        n: function() {
                            return n >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[n++]
                            };
                        },
                        e: function(e) {
                            throw e;
                        },
                        f: o
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var i, a = !0, s = !1;
            return {
                s: function() {
                    r = r.call(e);
                },
                n: function() {
                    var e = r.next();
                    return a = e.done, e;
                },
                e: function(e) {
                    s = !0, i = e;
                },
                f: function() {
                    try {
                        a || null == r.return || r.return();
                    } finally {
                        if (s) throw i;
                    }
                }
            };
        }
        function we(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n;
        }
        class be {
            constructor() {
                this.CACHE_UID_KEY = "yandex_uid";
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("Element is not defined");

                          case 3:
                            return o = t.getInfo(n), r.next = 6, t.fetchTrack(o.albumId, o.trackId, t.prepareUID());

                          case 6:
                            return i = r.sent, s = u.A.modify(`${o.artist ? o.artist + " -" : ""} ${o.trackName}.${i.codec}`), 
                            r.abrupt("return", [ {
                                url: i.downloadURL,
                                filename: s
                            } ]);

                          case 9:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            fetchTrack(e, t, r) {
                return (0, o.A)(a().mark((function n() {
                    return a().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            return n.abrupt("return", (0, R.A)({
                                action: "yandexGetTrack",
                                currentPage: location.href,
                                album: e,
                                uid: r,
                                trackId: t
                            }).then((e => ({
                                codec: e.codec,
                                downloadURL: e.downloadURL
                            }))));

                          case 1:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })))();
            }
            getInfo(e) {
                var t = this.getArtist(e), r = this.getTrackName(e), n = this.getCompositionId(e);
                return {
                    artist: t,
                    trackName: r,
                    albumId: n.albumId,
                    trackId: n.trackId
                };
            }
            getArtist(e) {
                var t = "";
                function r(e) {
                    null == e || e.childNodes.forEach((e => {
                        t += e ? e.textContent : "";
                    }));
                }
                var n = e.querySelector(".d-track__artists, .d-artists"), o = document.querySelector(".sidebar-album .d-artists"), i = document.querySelector(".d-artists, .page-artist__title");
                return n && 0 !== (null == n ? void 0 : n.childNodes.length) ? r(n) : "" == t && o && 0 !== (null == o ? void 0 : o.childNodes.length) ? r(o) : "" === t && i && r(i), 
                t.trim();
            }
            getTrackName(e) {
                var t = "", r = e.querySelector(".track__name-innerwrap, .d-track__name");
                return null == r || r.childNodes.forEach((e => {
                    t += e ? e.textContent + " " : "";
                })), t.trim();
            }
            getCompositionId(e) {
                var t, r = null === (t = e.querySelector(".d-track__name a, .track__name-innerwrap a")) || void 0 === t ? void 0 : t.getAttribute("href");
                if (void 0 === typeof r) throw new Error("Can't find album element");
                if (null != r && "" != r) {
                    var n = /album\/([0-9]+)\/track\/([0-9]+)/.exec(r), o = (0, m.A)(n, 3), i = (o[0], 
                    o[1]), a = o[2];
                    if (null === i || null === a) throw new Error("albumId or trackId is not defined");
                    return {
                        albumId: i,
                        trackId: a
                    };
                }
                throw new Error("Album links are empty");
            }
            prepareUID() {
                var e = this.get(this.CACHE_UID_KEY);
                return e || (e = this.getUidFromHTML(), this.set(this.CACHE_UID_KEY, e, 720)), e;
            }
            getUidFromHTML() {
                var e, t = 0, r = ye(document.querySelectorAll("script[nonce]"));
                try {
                    for (r.s(); !(e = r.n()).done; ) {
                        var n = e.value.innerText.match(/"uid":"([0-9]+)"/);
                        if (n) {
                            t = Number(n[1]);
                            break;
                        }
                    }
                } catch (e) {
                    r.e(e);
                } finally {
                    r.f();
                }
                return t;
            }
            set(e, t, r) {
                localStorage.setItem(e, JSON.stringify({
                    val: t,
                    expires: r ? Date.now() + 60 * r * 1e3 : -1
                }));
            }
            get(e) {
                var t = localStorage.getItem(e);
                if (!t) return null;
                var r = JSON.parse(t), n = r.val, o = r.expires;
                return n && -1 === o || o > Date.now() ? n : null;
            }
        }
        class xe {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.Io.yaArtist || r.t0 === n.Io.yaAlbum || r.t0 === n.Io.yaTrack || r.t0 === n.Io.yaPlaylist ? 3 : 4;
                            break;

                          case 3:
                            return r.abrupt("return", new be(t.cache).extractLinks(e));

                          case 4:
                            throw new Error(`viPageType ${t.pageType} is not supported`);

                          case 5:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        var Re = r(9191), ke = r(2525), Oe = r(9763);
        class Se {
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, u, l;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element, o = e.initData) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("initData is not defined");

                          case 3:
                            if (n) {
                                r.next = 5;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 5:
                            if (i = (0, s.A)(o), "m.ok.ru" !== location.host) {
                                r.next = 12;
                                break;
                            }
                            return r.next = 9, t.getMobilePlayerOptions(n, i);

                          case 9:
                            r.t0 = r.sent, r.next = 15;
                            break;

                          case 12:
                            return r.next = 14, t.getPlayerOptions(n, i);

                          case 14:
                            r.t0 = r.sent;

                          case 15:
                            if (u = r.t0) {
                                r.next = 18;
                                break;
                            }
                            throw new Error("Info not defined");

                          case 18:
                            if (!u.metadata) {
                                r.next = 24;
                                break;
                            }
                            return r.next = 21, t.prepareHlsLinks(u.metadata);

                          case 21:
                            return r.abrupt("return", r.sent);

                          case 24:
                            if (!u.request) {
                                r.next = 31;
                                break;
                            }
                            return r.next = 27, (0, R.A)(u.request);

                          case 27:
                            return l = r.sent, r.next = 30, t.prepareHlsLinks(l);

                          case 30:
                            return r.abrupt("return", r.sent);

                          case 31:
                            throw new Error("Metadata or Request not defined");

                          case 32:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getPlayerOptions(e, t) {
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s, u, l;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = (0, ke.A)(e, "[data-player-element-id][data-options]"), o = n && n.dataset.options) {
                                r.next = 4;
                                break;
                            }
                            return r.abrupt("return");

                          case 4:
                            try {
                                o = JSON.parse(o);
                            } catch (e) {}
                            if (i = o.flashvars) {
                                r.next = 8;
                                break;
                            }
                            return r.abrupt("return");

                          case 8:
                            if (!i.metadata) {
                                r.next = 13;
                                break;
                            }
                            s = null;
                            try {
                                s = JSON.parse(i.metadata);
                            } catch (e) {}
                            if (!s) {
                                r.next = 13;
                                break;
                            }
                            return r.abrupt("return", {
                                metadata: s
                            });

                          case 13:
                            if (!i.metadataUrl) {
                                r.next = 15;
                                break;
                            }
                            return r.abrupt("return", {
                                request: {
                                    action: "getOkMetadata",
                                    url: decodeURIComponent(i.metadataUrl)
                                }
                            });

                          case 15:
                            if (!(u = o.url)) {
                                r.next = 22;
                                break;
                            }
                            if (!(l = t.embedDownloader.checkUrl(u))) {
                                r.next = 20;
                                break;
                            }
                            return r.abrupt("return", {
                                request: l
                            });

                          case 20:
                            if (-1 === u.indexOf("rutube.")) {
                                r.next = 22;
                                break;
                            }
                            return r.abrupt("return", {
                                request: {
                                    action: "getRutubeLinks",
                                    links: [ u ]
                                }
                            });

                          case 22:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            prepareHlsLinks(e) {
                var t = e.movie, r = (t && t.title ? t.title : e.compilationTitle) || document.title, n = new RegExp("RESOLUTION=\\d+x(\\d+)\\n((?:https?)?.*?)\\n", "g");
                return (0, f.A)(e.hlsManifestUrl).then((e => (0, Re.H)(e.body, n))).then((t => t.map((t => {
                    var n = new URL(t[2], `https://${this.getCdnHostname(e)}`).href;
                    return {
                        title: r,
                        ext: "mp4",
                        format: "MP4",
                        quality: parseInt(t[1]),
                        href: "#mux",
                        forceDownload: !1,
                        noSize: !0,
                        func(e) {
                            e.preventDefault(), c.A.sendMessage({
                                action: "checkAndOpenProLanding",
                                ok: "ok-ext"
                            }), (0, ge.A)((0, ve.n)(fe.Ay, {
                                filename: u.A.modify(r) + ".mp4",
                                format: "mp4",
                                sources: [ {
                                    url: n,
                                    format: "mp4"
                                } ],
                                convertType: "hls"
                            }), "sf-muxer-parent");
                        }
                    };
                }))));
            }
            getMobilePlayerOptions(e, t) {
                var r = this;
                return (0, o.A)(a().mark((function n() {
                    var o, i, s, u, l, c, d;
                    return a().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            try {
                                o = JSON.parse(e.dataset.video);
                            } catch (e) {}
                            if (o && o.movieId ? (i = o.movieId).indexOf("_") && (i = i.split("_")[0]) : (s = new URLSearchParams(location.search), 
                            i = s.get("st.discId")), i) {
                                n.next = 4;
                                break;
                            }
                            throw new Error("getMobilePlayerOptions. video id not found");

                          case 4:
                            return n.next = 6, (0, R.A)({
                                action: "okRequestVideoPage",
                                videoId: i
                            });

                          case 6:
                            if (u = n.sent) {
                                n.next = 9;
                                break;
                            }
                            throw new Error("getMobilePlayerOptions. videoPage fetch failed");

                          case 9:
                            if (l = (0, Oe.A)(u, ""), c = l.querySelector(".vp_video .vid-card_cnt")) {
                                n.next = 13;
                                break;
                            }
                            throw new Error("getMobilePlayerOptions. Video dataset not found");

                          case 13:
                            return (d = r.getPlayerOptions(c, t)).metadata ? d.metadata.dataMobile = o : d.metadata = {
                                dataMobile: o
                            }, n.abrupt("return", d);

                          case 16:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })))();
            }
            getCdnHostname(e) {
                if (e.hlsManifestUrl) try {
                    return new URL(e.hlsManifestUrl).hostname;
                } catch (e) {
                    throw e;
                }
                if (e.failoverHosts && e.failoverHosts.length) return e.failoverHosts[0];
                throw new Error("CDN hostname not found");
            }
        }
        var Fe = r(5218), je = r(3561);
        class Le {
            constructor(e) {
                this.cache = void 0, this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.element) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("element is not defined");

                          case 3:
                            return o = (0, Fe.A)(n), r.next = 6, t.getNodeTrack(o);

                          case 6:
                            return i = r.sent, r.next = 9, t.prepareTrackForDownload(i.id);

                          case 9:
                            return s = r.sent, r.abrupt("return", [ {
                                url: s.downloadUrl,
                                filename: s.filename,
                                size: s.size,
                                duration: s.duration
                            } ]);

                          case 11:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getNodeTrack(e) {
                return (0, o.A)(a().mark((function t() {
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.abrupt("return", (0, x.A)([ e ], 'function(nodePath){var el=document.querySelector(nodePath);if(el&&el.props&&el.props.track){return el.props.track}if(el&&el.model&&el.model._data.get("track")){return el.model._data.get("track")}throw new Error("Track information not found")}'));

                          case 1:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            prepareTrackForDownload(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (t.cache.jsessionId) {
                                r.next = 3;
                                break;
                            }
                            return r.next = 3, t.getJsSessionId();

                          case 3:
                            return r.next = 5, t.getTrackUrlById(e);

                          case 5:
                            if ((n = r.sent).track) {
                                r.next = 8;
                                break;
                            }
                            throw new Error("Track is not found");

                          case 8:
                            if (n.play) {
                                r.next = 10;
                                break;
                            }
                            throw new Error("Track url is not found");

                          case 10:
                            return r.next = 12, t.getClientHash(n.play);

                          case 12:
                            return o = r.sent, r.abrupt("return", {
                                filename: u.A.modify(`${n.track.ensemble} – ${n.track.name}.mp3`),
                                downloadUrl: `${n.play}&${re.stringify({
                                    clientHash: o
                                })}`,
                                duration: n.track.duration,
                                size: n.track.size || -1
                            });

                          case 14:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            getJsSessionId() {
                var e = "m.ok.ru" === location.host ? () => {
                    for (var e = Array.from(document.querySelectorAll("script")), t = 0; t < e.length; t++) if (e[t].textContent) {
                        var r = e[t].textContent.match(/"jsid":"(.*?)"/);
                        if (r && r[1]) return Promise.resolve(r[1]);
                    }
                    return Promise.resolve(void 0);
                } : () => new Promise((function(e, t) {
                    var r = location.protocol + "//" + location.host + "/web-api/music/conf";
                    (0, G.A)({
                        type: "POST",
                        url: r,
                        data: "_",
                        json: !0,
                        localXHR: !0
                    }, (function(r, n, o) {
                        !r && o && o.sid ? e(o.sid) : t(new Error("Get jsSessionId error!"));
                    }));
                }));
                return e().then((e => {
                    this.cache.jsessionId = e;
                })).catch((e => {
                    throw new Error("getJsSessionId error ", e);
                }));
            }
            getClientHash(e) {
                var t;
                return Promise.resolve((t = r(4636), function(e, t) {
                    for (var r, n = [ 4, 3, 5, 6, 1, 2, 8, 7, 2, 9, 3, 5, 7, 1, 4, 8, 8, 3, 4, 3, 1, 7, 3, 5, 9, 8, 1, 4, 3, 7, 2, 8 ], o = t(/md5=(\w*)/g.exec(e)[1] + "secret"), i = o.length, a = "", s = 0, u = 0; u < i; u++) s += parseInt(o[u], 16);
                    for (var l = 0; l < i; l++) {
                        var c = parseInt(o[l], 16);
                        r = l === i - 1 ? c : parseInt(o[l + 1], 16), a += Math.abs(s - c * r * n[l]);
                    }
                    return a;
                }(e, (e => t(e).toString()))));
            }
            getTrackUrlById(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (t.cache.trackIdPromise = {}, t.cache.payloadTracks = {}, !t.cache.trackIdPromise[e]) {
                                r.next = 4;
                                break;
                            }
                            return r.abrupt("return", t.cache.trackIdPromise[e]);

                          case 4:
                            if (!t.cache.payloadTracks[e]) {
                                r.next = 6;
                                break;
                            }
                            return r.abrupt("return", t.cache.payloadTracks[e]);

                          case 6:
                            return n = `https://wmf.ok.ru/play;jsessionid=${t.cache.jsessionId}?` + re.stringify({
                                tid: e
                            }), r.abrupt("return", t.cache.trackIdPromise[e] = (0, x.A)([ n ], "function(url){return fetch(url).then(function(response){return response.json()})}").then((r => {
                                var n = Object.keys(t.cache.payloadTracks);
                                return n.length > 20 && delete t.cache.payloadTracks[n[0]], t.cache.payloadTracks[e] = r, 
                                r;
                            })).then(...(0, je.A)((() => {
                                delete t.cache.trackIdPromise[e];
                            }))));

                          case 8:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        class De {
            constructor(e) {
                this.cache = void 0, this.cache = e;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    var n, o, i, s, l, c, d, p, A, h, f, g, v, I, C;
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (l = e.element) {
                                r.next = 3;
                                break;
                            }
                            throw new Error("Element is not defined");

                          case 3:
                            if (l instanceof HTMLElement) {
                                r.next = 5;
                                break;
                            }
                            throw new Error("Element is not supported");

                          case 5:
                            if (c = l.closest(".track-with-cover"), d = c.dataset.trackId, t.cache.jsessionId) {
                                r.next = 10;
                                break;
                            }
                            return r.next = 10, t.getJsSessionId();

                          case 10:
                            return r.next = 12, t.sendMonoRequest(d);

                          case 12:
                            return p = r.sent, r.next = 15, t.getClientHash(p.play);

                          case 15:
                            return A = r.sent, h = p.play + (A ? "&clientHash=" + A : ""), f = p.track, g = Math.floor(f.size / f.duration / 125), 
                            v = null !== (n = null === (o = c.querySelector('[data-l="t,artist"]')) || void 0 === o ? void 0 : o.textContent) && void 0 !== n ? n : "", 
                            I = null !== (i = null === (s = c.querySelector('[data-l="t,title"]')) || void 0 === s ? void 0 : s.textContent) && void 0 !== i ? i : "", 
                            C = u.A.modify(`${v} - ${I}`), r.abrupt("return", [ {
                                url: h,
                                filename: C,
                                bitrate: g,
                                size: f.size
                            } ]);

                          case 23:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            sendMonoRequest(e) {
                return new Promise(((t, r) => {
                    c.A.sendMessage({
                        action: "getOdnoklassnikiAudioLinks",
                        url: location.href,
                        trackId: e,
                        jsessionId: this.cache.jsessionId
                    }, (function(e) {
                        e.data ? t(e.data) : r(new Error("Get links from data error"));
                    }));
                }));
            }
            getClientHash(e) {
                var t;
                return Promise.resolve((t = r(4636), function(e, t) {
                    for (var r, n = [ 4, 3, 5, 6, 1, 2, 8, 7, 2, 9, 3, 5, 7, 1, 4, 8, 8, 3, 4, 3, 1, 7, 3, 5, 9, 8, 1, 4, 3, 7, 2, 8 ], o = t(/md5=(\w*)/g.exec(e)[1] + "secret"), i = o.length, a = "", s = 0, u = 0; u < i; u++) s += parseInt(o[u], 16);
                    for (var l = 0; l < i; l++) {
                        var c = parseInt(o[l], 16);
                        r = l === i - 1 ? c : parseInt(o[l + 1], 16), a += Math.abs(s - c * r * n[l]);
                    }
                    return a;
                }(e, (e => t(e).toString()))));
            }
            getJsSessionId() {
                return new Promise((function(e, t) {
                    var r = location.protocol + "//" + location.host + "/web-api/music/conf";
                    (0, G.A)({
                        type: "POST",
                        url: r,
                        data: "_",
                        json: !0,
                        localXHR: !0
                    }, (function(r, n, o) {
                        !r && o && o.sid ? e(o.sid) : t(new Error("Get jsSessionId error!"));
                    }));
                })).then((e => {
                    this.cache.jsessionId = e;
                })).catch((e => {
                    throw new Error("getJsSessionId error ", e);
                }));
            }
        }
        class Be {
            constructor(e, t) {
                this.pageType = void 0, this.cache = void 0, this.pageType = e, this.cache = t;
            }
            extractLinks(e) {
                var t = this;
                return (0, o.A)(a().mark((function r() {
                    return a().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            r.t0 = t.pageType, r.next = r.t0 === n.US.okMusic ? 3 : r.t0 === n.US.okVideo ? 4 : r.t0 === n.US.okProfileMusic ? 5 : 6;
                            break;

                          case 3:
                            return r.abrupt("return", new Le(t.cache).extractLinks(e));

                          case 4:
                            return r.abrupt("return", (new Se).extractLinks(e));

                          case 5:
                            return r.abrupt("return", new De(t.cache).extractLinks(e));

                          case 6:
                            throw new Error(`igPageType ${t.pageType} is not supported`);

                          case 7:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }
        class Qe {
            static createLinkExtractor(e) {
                switch (!0) {
                  case Object.values(n.Wc).some((t => t === e)):
                    return new w(e, this.cache);

                  case Object.values(n.Cg).some((t => t === e)):
                    return new D(e, this.cache);

                  case Object.values(n.xl).some((t => t === e)):
                    return new ce(e, this.cache);

                  case Object.values(n.d5).some((t => t === e)):
                    return new he(e, this.cache);

                  case Object.values(n.X7).some((t => t === e)):
                    return new Ee(e, this.cache);

                  case Object.values(n.me).some((t => t === e)):
                    return new A(e, this.cache);

                  case Object.values(n.Tj).some((t => t === e)):
                    return new $(e, this.cache);

                  case Object.values(n.Io).some((t => t === e)):
                    return new xe(e, this.cache);

                  case Object.values(n.GT).some((t => t === e)):
                    return new j(e, this.cache);

                  case Object.values(n.US).some((t => t === e)):
                    return new Be(e, this.cache);

                  default:
                    throw new Error(`pageType ${e} is not supported`);
                }
            }
        }
        Qe.cache = {};
    },
    7219: (e, t, r) => {
        "use strict";
        r.d(t, {
            Cg: () => c,
            GT: () => a,
            Io: () => A,
            Qi: () => p,
            Tj: () => d,
            US: () => h,
            Wc: () => n,
            X7: () => l,
            d5: () => s,
            me: () => i,
            rk: () => u,
            xl: () => o
        });
        var n = {
            igFeed: "ig-feed",
            igPost: "ig-post",
            igCarouselFromProfile: "ig-post-carousel_from_profile",
            igPostCarousel: "ig-post-carousel",
            igPostVideoFromProfile: "ig-post-video_from_profile",
            igPostVideo: "ig-post-video",
            igPostPhotoFromProfile: "ig-post-photo_from_profile",
            igPostPhoto: "ig-post-photo",
            igProfile: "ig-profile",
            igReel: "ig-reel",
            igReelFromProfile: "ig-reel-from_profile",
            igHighlights: "ig-highlights",
            igStory: "ig-story",
            igStoryVideo: "ig-story-video",
            igStoryPhoto: "ig-story-photo"
        }, o = {
            ytVideo: "yt-video",
            ytHomepage: "yt-homepage",
            ytShort: "yt-short",
            ytFeedHistory: "yt-feed_history",
            ytFeedLibrary: "yt-feed_library",
            ytFeedSubscriptions: "yt-feed_subscriptions",
            ytFeedTrending: "yt-feed_trending",
            ytWatchLater: "yt-watch_later",
            ytLikedVideos: "yt-liked_videos",
            ytPlaylistVideos: "yt-playlist-videos",
            ytChannel: "yt-channel",
            ytGaming: "yt-gaming"
        }, i = {
            fbFeed: "fb-feed",
            fbWatch: "fb-watch",
            fbReel: "fb-reel",
            fbVideo: "fb-video",
            fbProfileVideo: "fb-profile_video",
            fbPhoto: "fb-photo",
            fbProfilePhoto: "fb-profile_photo",
            fbProfileFeed: "fb-profile_feed",
            fbStory: "fb-story"
        }, a = {
            soAudio: "so-audio"
        }, s = {
            viBlogVideo: "vi-blog_video",
            viVideo: "vi-video",
            viProfileFeed: "vi-profile_feed"
        }, u = {
            twFeed: "tw-feed",
            twPost: "tw-post",
            twPhoto: "tw-photo"
        }, l = {
            daVideo: "da-video"
        }, c = {
            ttFeed: "tt-feed",
            ttVideo: "tt-video",
            ttFollowing: "tt-following",
            ttExplore: "tt-explore",
            ttProfile: "tt-profile"
        }, d = {
            vkClips: "vk-clips",
            vkClip: "vk-clip",
            vkVideos: "vk-videos",
            vkVideo: "vk-video",
            vkFeed: "vk-feed",
            vkPhoto: "vk-photo",
            vkStory: "vk-story",
            vkAudios: "vk-audios",
            vkAudio: "vk-audio",
            vkAlbums: "vk-albums",
            vkAlbum: "vk-album"
        }, p = {
            maCommunity: "ma-community",
            maCommunityMultipost: "ma-community_multipost",
            maCommunityPhoto: "ma-community_photo",
            maCommunityShare: "ma-community_share",
            maMusic: "ma-music",
            maVideo: "ma-video",
            maPlaylist: "ma-playlist"
        }, A = {
            yaArtist: "ya-artist",
            yaAlbum: "ya-album",
            yaTrack: "ya-track",
            yaPlaylist: "ya-playlist"
        }, h = {
            okVideo: "ok-video",
            okMusic: "ok-music",
            okProfile: "ok-profile",
            okProfileMusic: "ok-profile_music",
            okHobby: "ok-hobby",
            okDiscovery: "ok-discovery"
        };
    },
    7661: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), /^((30|59|91)2|83|971)$/.test(r.j)) var n = r(2128);
        const o = /^((30|59|91)2|83|971)$/.test(r.j) ? class {
            constructor(e) {
                this.target = e.target, this.options = e.options || {
                    attributes: !0,
                    childList: !1,
                    attributeOldValue: !0,
                    attributeFilter: []
                }, this.attrs = e.attrs, this.observer = null, this.init();
            }
            init() {
                this.attrs.forEach((e => {
                    this.options.attributeFilter.push(e.name);
                }));
                var e = (0, n.A)();
                this.observer = new e((e => {
                    for (var t; t = e.shift(); ) this._match(t);
                })), this.start();
            }
            trigger() {
                for (var e, t = this.attrs, r = 0; e = t[r]; r++) {
                    var n = this.target.getAttribute(e.name);
                    null !== n && e.callback({
                        value: n,
                        oldValue: null
                    });
                }
            }
            start() {
                this._disconnect(), this._connect();
            }
            stop() {
                this._disconnect();
            }
            _match(e) {
                for (var t, r = this.attrs, n = 0; t = r[n]; n++) t.name === e.attributeName && t.callback({
                    value: e.target.getAttribute(e.attributeName),
                    oldValue: e.oldValue
                });
            }
            _connect() {
                this.observer.observe(this.target, this.options);
            }
            _disconnect() {
                this.observer.disconnect();
            }
            static isAvailable() {
                return !!(0, n.A)();
            }
        } : null;
    },
    1460: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => s
        }), !/^(319|469|550|7|947)$/.test(r.j)) var n = r(2128);
        if (!/^(319|469|550|7|947)$/.test(r.j)) var o = r(1613);
        var i = {
            addedNodes: "added",
            removedNodes: "removed"
        }, a = Object.keys(i);
        const s = /^(319|469|550|7|947)$/.test(r.j) ? null : class {
            constructor(e) {
                this.target = e.target || document.body, this.options = e.options || {
                    childList: !0,
                    subtree: !0
                }, this.filterTarget = e.filterTarget || [], this.queries = e.queries, this.observer = null, 
                this.init();
            }
            init() {
                var e = (0, n.A)(), t = document.location.href;
                this.observer = new e((e => {
                    var r = document.location.href;
                    t !== r && (t = r, document.dispatchEvent(new CustomEvent("mutationwatcher:hrefchange")));
                    for (var n = null; n = e.shift(); ) this._isAvailableTarget(n.target) && this._match(n);
                })), this.start();
            }
            start() {
                this._disconnect(), this._connect(), this.trigger(this.target);
            }
            trigger(e) {
                this._match({
                    addedNodes: [ e ],
                    removedNodes: []
                });
            }
            stop() {
                this._disconnect();
            }
            _match(e) {
                for (var t, r = this.queries, n = 0; t = r[n]; n++) {
                    for (var s, u = {
                        target: e.target,
                        added: [],
                        removed: []
                    }, l = 0; s = a[l]; l++) {
                        var c = i[s];
                        if (void 0 === t.is || t.is === c) for (var d, p = u[c], A = e[s], h = 0; d = A[h]; h++) 1 === d.nodeType && ((0, 
                        o.A)(d, t.css) ? p.push(d) : p.push.apply(p, d.querySelectorAll(t.css)));
                    }
                    (u.added.length || u.removed.length) && t.callback(u, t.css);
                }
            }
            _isAvailableTarget(e) {
                for (var t, r = this.filterTarget, n = 0; t = r[n]; n++) if ((0, o.A)(e, t.css)) return !1;
                return !0;
            }
            _connect() {
                this.observer.observe(this.target, this.options);
            }
            _disconnect() {
                this.observer.disconnect();
            }
            static isAvailable() {
                return !!(0, n.A)();
            }
        };
    },
    3948: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => s
        });
        const n = {
            yt: /^(https?:\/\/)?(www\.)?youtube\.com\/?.*/i,
            fb: /^(https?:\/\/)?(www\.)?facebook\.com\/?.*/i,
            ig: /^(https?:\/\/)?(www\.)?instagram\.com\/?.*/i,
            so: /^(https?:\/\/)?(www\.)?soundcloud\.com\/?.*/i,
            da: /^(https?:\/\/)?(www\.)?dailymotion\.com\/?.*/i,
            vi: /^(https?:\/\/)?(www\.)?vimeo\.com\/?.*/i,
            tw: /^(https?:\/\/)?(www\.)?twitter\.com\/?.*/i,
            tt: /^(https?:\/\/)?(www\.)?tiktok\.com\/?.*/i,
            vk: /^(https?:\/\/)?(www\.)?(vk\.com|vkontakte\.ru)\/?.*/i,
            ok: /^(https?:\/\/)?(www\.)?(odnoklassniki|ok)\.ru\/?.*/i,
            ma: /^(https?:\/\/)?(www\.)?my\.mail\.ru\/?.*/i,
            ya: /^(https?:\/\/)?(www\.)?music\.yandex\.([a-z]{2,3})\/?.*/i
        }, o = {
            yt: {
                homepage: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/?(?:\?.*)?$/i,
                video: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+(?:&[a-zA-Z0-9_-]+=[a-zA-Z0-9_%]+)*$/i,
                short: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/[a-zA-Z0-9_-]+\/?$/i,
                feed_history: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/feed\/history\/?/i,
                feed_subscriptions: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/feed\/subscriptions\/?/i,
                feed_library: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/feed\/library\/?/i,
                feed_trending: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/feed\/trending\/?/i,
                watch_later: /^https:\/\/www\.youtube\.com\/playlist\?list=WL(?:&[a-zA-Z0-9_]+=[^&]*)*$/i,
                liked_videos: /^https:\/\/www\.youtube\.com\/playlist\?list=LL(?:&[a-zA-Z0-9_]+=[^&]*)*$/i,
                playlist_videos: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/playlist\?list=/i,
                channel: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/channel\/[a-zA-Z0-9_-]+\/?/i,
                gaming: /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/gaming\/?/i
            },
            fb: {
                feed: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/?(?:\?.*)?$/i,
                watch: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/watch(\/live)?\/?(?:\?.*)?$/i,
                reel: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/reel(\/[0-9]+)?\/?(?:\?.*)?$/i,
                video: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/[A-Za-z0-9_-]+\/videos\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i,
                profile_video: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/[A-Za-z0-9_-]+\/videos\/?(?:\?.*)?$/i,
                photo: /^https:\/\/www\.facebook\.com\/[A-Za-z0-9_-]+\/photos\/[A-Za-z0-9_.-]+\/[-\d.]+\/?(\?.*)?$/i,
                profile_photo: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/[A-Za-z0-9_-]+\/photos\/?(?:\?.*)?$/i,
                profile_feed: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i,
                story: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/stories\/\d+\/[A-Za-z0-9+/]+={0,2}\/?(?:\?.*)?$/i
            },
            ig: {
                feed: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/?(?:\?.*)?$/i,
                post: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i,
                profile: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?(?:\?.*)?$/i,
                reel: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i,
                highlights: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/stories\/highlights\/[A-Za-z0-9_-]{17}\/?(?:\?.*)?$/i,
                story: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/stories\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]{19}\/?(?:\?.*)?$/i
            },
            so: {
                audio: /^(?:https?:\/\/)?(?:www\.)?soundcloud\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i
            },
            da: {
                video: /^(?:https?:\/\/)?(?:www\.)?dailymotion\.com\/video\/[A-Za-z0-9_]+(?:\?.*)?$/i
            },
            vi: {
                blog_video: /^(?:https?:\/\/)?vimeo\.com\/blog\/post\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i,
                video: /^(?:https?:\/\/)?vimeo\.com\/\d+\/?(?:\?.*)?$/i,
                profile_feed: /^(?:https?:\/\/)?vimeo\.com\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i
            },
            tw: {
                feed: /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/home\/?(?:\?.*)?$/i,
                post: /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/[A-Za-z0-9_]+\/status\/\d+\/?(?:\?.*)?$/i,
                photo: /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/[A-Za-z0-9_]+\/status\/\d+\/photo\/\d+\/?(?:\?.*)?$/i
            },
            tt: {
                feed: /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/?(?:\?.*)?$/i,
                profile: /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[A-Za-z0-9_]+\/?(?:\?.*)?$/i,
                video: /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[A-Za-z0-9_]+\/video\/\d+\/?(?:\?.*)?$/i,
                explore: /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/explore\/?(?:\?.*)?$/i,
                following: /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/following\/?(?:\?.*)?$/i
            },
            vk: {
                clips: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/clips\/?(?![?&]z=).*$/i,
                clip: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/clips\?z=clip-\d+_\d+%2F[A-Za-z0-9]+(?:\&.*)?$/i,
                videos: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/video(?!\d)\/?(?![?&]z=).*$/i,
                video: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/video(\d+_\d+\/?|\/?\?z=video-\d+_\d+%2F[A-Za-z0-9_]+)(?:\&.*)?$/i,
                feed: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/(al_feed\.php|feed)\/?(?![?&](z|w)=).*$/i,
                photo: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/(al_feed\.php|feed)\/?\?z=photo-\d+_\d+%2Falbum-\d+_\d+%2F[A-Za-z0-9_]+(?:\&.*)?$/i,
                story: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/(al_feed\.php|feed)\/?\?w=story-\d+_\d+%2F(feed|discover)(?:\&.*)?$/i,
                audios: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/audios\d+\/?(?:\?.*)?$/i,
                audio: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/audio-\d+_\d+\/?(?:\?.*)?$/i,
                albums: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/albums\d+/i,
                album: /^(?:https?:\/\/)?(vk\.com|vkontakte\.ru)\/album\d+/i
            },
            ok: {
                video: /^(?:https?:\/\/)?(?:www\.)?ok\.ru\/video\/\d+\/?(?:\?.*)?$/i,
                music: /^(?:https?:\/\/)?(?:www\.)?ok\.ru\/music(?:.*)?/i,
                profile: /^(?:https?:\/\/)?(?:www\.)?ok\.ru\/(?!discovery)([a-z]+(?:\/[0-9]+)?)$/i,
                profile_music: /^(?:https?:\/\/)?(?:www\.)?ok\.ru\/.*\/music$/i,
                hobby: /^(?:https?:\/\/)?(?:www\.)?ok\.ru\/hobby\/(?:.*)?$/i,
                discovery: /^(?:https?:\/\/)?(?:www\.)?ok\.ru\/discovery\/?(?:.*)?$/i
            },
            ma: {
                community: /^(?:https?:\/\/)?my\.mail\.ru\/community\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i,
                community_multipost: /^(?:https?:\/\/)?my\.mail\.ru\/community\/[A-Za-z0-9_-]+\/multipost\/[A-Za-z0-9_-]+\.html\/?(?:\?.*)?$/i,
                community_photo: /^(?:https?:\/\/)?my\.mail\.ru\/community\/[A-Za-z0-9_-]+\/photo\/[A-Za-z0-9_-]+\/\d+\.html\/?(?:\?.*)?$/i,
                community_share: /^(?:https?:\/\/)?my\.mail\.ru\/community\/[A-Za-z0-9_-]+\/share\/?\?shareid=[A-Za-z0-9]+(?:&.*)?$/i,
                music: /^(?:https?:\/\/)?my\.mail\.ru\/music\/?(?:\?.*)?$/i,
                video: /^(?:https?:\/\/)?my\.mail\.ru\/v\/[A-Za-z0-9_-]+\/video\/[A-Za-z0-9_-]+\/\d+\.html\/?(?:\?.*)?$/i,
                playlist: /^(?:https?:\/\/)?my\.mail\.ru\/music\/playlists\/[\x2D0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{10300}-\u{1031F}\u{1032D}-\u{10340}\u{10342}-\u{10349}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{103A0}-\u{103C3}\u{103C8}-\u{103CF}\u{10400}-\u{1049D}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{10570}-\u{1057A}\u{1057C}-\u{1058A}\u{1058C}-\u{10592}\u{10594}\u{10595}\u{10597}-\u{105A1}\u{105A3}-\u{105B1}\u{105B3}-\u{105B9}\u{105BB}\u{105BC}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10780}-\u{10785}\u{10787}-\u{107B0}\u{107B2}-\u{107BA}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10860}-\u{10876}\u{10880}-\u{1089E}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{10900}-\u{10915}\u{10920}-\u{10939}\u{10980}-\u{109B7}\u{109BE}\u{109BF}\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A60}-\u{10A7C}\u{10A80}-\u{10A9C}\u{10AC0}-\u{10AC7}\u{10AC9}-\u{10AE4}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B60}-\u{10B72}\u{10B80}-\u{10B91}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10D00}-\u{10D23}\u{10E80}-\u{10EA9}\u{10EB0}\u{10EB1}\u{10F00}-\u{10F1C}\u{10F27}\u{10F30}-\u{10F45}\u{10F70}-\u{10F81}\u{10FB0}-\u{10FC4}\u{10FE0}-\u{10FF6}\u{11003}-\u{11037}\u{11071}\u{11072}\u{11075}\u{11083}-\u{110AF}\u{110D0}-\u{110E8}\u{11103}-\u{11126}\u{11144}\u{11147}\u{11150}-\u{11172}\u{11176}\u{11183}-\u{111B2}\u{111C1}-\u{111C4}\u{111DA}\u{111DC}\u{11200}-\u{11211}\u{11213}-\u{1122B}\u{1123F}\u{11240}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A8}\u{112B0}-\u{112DE}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}\u{11350}\u{1135D}-\u{11361}\u{11400}-\u{11434}\u{11447}-\u{1144A}\u{1145F}-\u{11461}\u{11480}-\u{114AF}\u{114C4}\u{114C5}\u{114C7}\u{11580}-\u{115AE}\u{115D8}-\u{115DB}\u{11600}-\u{1162F}\u{11644}\u{11680}-\u{116AA}\u{116B8}\u{11700}-\u{1171A}\u{11740}-\u{11746}\u{11800}-\u{1182B}\u{118A0}-\u{118DF}\u{118FF}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{1192F}\u{1193F}\u{11941}\u{119A0}-\u{119A7}\u{119AA}-\u{119D0}\u{119E1}\u{119E3}\u{11A00}\u{11A0B}-\u{11A32}\u{11A3A}\u{11A50}\u{11A5C}-\u{11A89}\u{11A9D}\u{11AB0}-\u{11AF8}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2E}\u{11C40}\u{11C72}-\u{11C8F}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D89}\u{11D98}\u{11EE0}-\u{11EF2}\u{11F02}\u{11F04}-\u{11F10}\u{11F12}-\u{11F33}\u{11FB0}\u{12000}-\u{12399}\u{12480}-\u{12543}\u{12F90}-\u{12FF0}\u{13000}-\u{1342F}\u{13441}-\u{13446}\u{14400}-\u{14646}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A70}-\u{16ABE}\u{16AD0}-\u{16AED}\u{16B00}-\u{16B2F}\u{16B40}-\u{16B43}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16E40}-\u{16E7F}\u{16F00}-\u{16F4A}\u{16F50}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{16FE3}\u{17000}-\u{187F7}\u{18800}-\u{18CD5}\u{18D00}-\u{18D08}\u{1AFF0}-\u{1AFF3}\u{1AFF5}-\u{1AFFB}\u{1AFFD}\u{1AFFE}\u{1B000}-\u{1B122}\u{1B132}\u{1B150}-\u{1B152}\u{1B155}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6C0}\u{1D6C2}-\u{1D6DA}\u{1D6DC}-\u{1D6FA}\u{1D6FC}-\u{1D714}\u{1D716}-\u{1D734}\u{1D736}-\u{1D74E}\u{1D750}-\u{1D76E}\u{1D770}-\u{1D788}\u{1D78A}-\u{1D7A8}\u{1D7AA}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1DF00}-\u{1DF1E}\u{1DF25}-\u{1DF2A}\u{1E030}-\u{1E06D}\u{1E100}-\u{1E12C}\u{1E137}-\u{1E13D}\u{1E14E}\u{1E290}-\u{1E2AD}\u{1E2C0}-\u{1E2EB}\u{1E4D0}-\u{1E4EB}\u{1E7E0}-\u{1E7E6}\u{1E7E8}-\u{1E7EB}\u{1E7ED}\u{1E7EE}\u{1E7F0}-\u{1E7FE}\u{1E800}-\u{1E8C4}\u{1E900}-\u{1E943}\u{1E94B}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B739}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2EBF0}-\u{2EE5D}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}\u{31350}-\u{323AF}]+(?:\x2D\d+)?\/?(?:\?.*)?$/iu
            },
            ya: {
                artist: /^(?:https?:\/\/)?music\.yandex\.([a-z]{2,3})\/artist\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i,
                album: /^(?:https?:\/\/)?music\.yandex\.([a-z]{2,3})\/album\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i,
                track: /^(?:https?:\/\/)?music\.yandex\.([a-z]{2,3})\/album\/[A-Za-z0-9_-]+\/track\/\d+\/?(?:\?.*)?$/i,
                playlist: /^(?:https?:\/\/)?music\.yandex\.([a-z]{2,3})\/users\/[A-Za-z0-9_-]+\/playlists\/\d+\/?(?:\?.*)?$/i
            }
        }, i = {
            ig: {
                "ig-post-carousel_from_profile": "article ._aamj",
                "ig-post-carousel": 'div[role="button"] ._aamj',
                "ig-post-video_from_profile": "article video",
                "ig-post-video": 'div[role="button"] video',
                "ig-post-photo_from_profile": "article img",
                "ig-post-photo": 'div[role="button"] img',
                "ig-reel-from_profile": "article video",
                "ig-story-video": "._ac0a video",
                "ig-story-photo": "._ac0a img"
            },
            ok: {
                profile: ".profile-user-info"
            }
        };
        var a = r(7219);
        class s {
            static getPageType(e, t) {
                try {
                    if (!e) throw new Error("url is required");
                    return this.getServiceType(e, t);
                } catch (e) {
                    return console.error(e), "unknown-page";
                }
            }
            static getServiceType(e, t) {
                var r = n;
                switch (e = e.replace(/#.+/, ""), !0) {
                  case r.yt.test(e):
                    return this.getYtServiceTypeDetails(e);

                  case r.fb.test(e):
                    return this.getFbServiceTypeDetails(e);

                  case r.ig.test(e):
                    return this.getIgServiceTypeDetails(e, t);

                  case r.so.test(e):
                    return this.getSoServiceTypeDetails(e);

                  case r.da.test(e):
                    return this.getDaServiceTypeDetails(e);

                  case r.vi.test(e):
                    return this.getViServiceTypeDetails(e);

                  case r.tw.test(e):
                    return this.getTwServiceTypeDetails(e);

                  case r.tt.test(e):
                    return this.getTtServiceTypeDetails(e);

                  case r.vk.test(e):
                    return this.getVkServiceTypeDetails(e);

                  case r.ok.test(e):
                    return this.getOkServiceTypeDetails(e, t);

                  case r.ma.test(e):
                    return this.getMaServiceTypeDetails(e);

                  case r.ya.test(e):
                    return this.getYaServiceTypeDetails(e);

                  default:
                    throw new Error("Unknown service type");
                }
            }
            static getYtServiceTypeDetails(e) {
                var t = o.yt;
                switch (!0) {
                  case t.homepage.test(e):
                    return a.xl.ytHomepage;

                  case t.video.test(e):
                    return a.xl.ytVideo;

                  case t.short.test(e):
                    return a.xl.ytShort;

                  case t.feed_history.test(e):
                    return a.xl.ytFeedHistory;

                  case t.feed_library.test(e):
                    return a.xl.ytFeedLibrary;

                  case t.feed_subscriptions.test(e):
                    return a.xl.ytFeedSubscriptions;

                  case t.feed_trending.test(e):
                    return a.xl.ytFeedTrending;

                  case t.watch_later.test(e):
                    return a.xl.ytWatchLater;

                  case t.liked_videos.test(e):
                    return a.xl.ytLikedVideos;

                  case t.playlist_videos.test(e):
                    return a.xl.ytPlaylistVideos;

                  case t.channel.test(e):
                    return a.xl.ytChannel;

                  case t.gaming.test(e):
                    return a.xl.ytGaming;

                  default:
                    throw new Error("Unknown yt page");
                }
            }
            static getFbServiceTypeDetails(e) {
                var t = o.fb;
                switch (!0) {
                  case t.feed.test(e):
                    return a.me.fbFeed;

                  case t.watch.test(e):
                    return a.me.fbWatch;

                  case t.reel.test(e):
                    return a.me.fbReel;

                  case t.video.test(e):
                    return a.me.fbVideo;

                  case t.profile_video.test(e):
                    return a.me.fbProfileVideo;

                  case t.photo.test(e):
                    return a.me.fbPhoto;

                  case t.profile_photo.test(e):
                    return a.me.fbProfilePhoto;

                  case t.profile_feed.test(e):
                    return a.me.fbProfileFeed;

                  case t.story.test(e):
                    return a.me.fbStory;

                  default:
                    throw new Error("Unknown fb page");
                }
            }
            static getIgServiceTypeDetails(e, t) {
                var r = o.ig, n = i.ig;
                switch (!0) {
                  case r.feed.test(e):
                    return a.Wc.igFeed;

                  case r.post.test(e):
                    if (!t) return a.Wc.igPost;
                    if (t.querySelector(n["ig-post-carousel_from_profile"])) return a.Wc.igCarouselFromProfile;
                    if (t.querySelector(n["ig-post-carousel"])) return a.Wc.igPostCarousel;
                    if (t.querySelector(n["ig-post-video_from_profile"])) return a.Wc.igPostVideoFromProfile;
                    if (t.querySelector(n["ig-post-video"])) return a.Wc.igPostVideo;
                    if (t.querySelector(n["ig-post-photo_from_profile"])) return a.Wc.igPostPhotoFromProfile;
                    if (t.querySelector(n["ig-post-photo"])) return a.Wc.igPostPhoto;
                    throw new Error("Unknown ig post page");

                  case r.profile.test(e):
                    return a.Wc.igProfile;

                  case r.reel.test(e):
                    return t && t.querySelector(n["ig-reel-from_profile"]) ? a.Wc.igReelFromProfile : a.Wc.igReel;

                  case r.highlights.test(e):
                    return a.Wc.igHighlights;

                  case r.story.test(e):
                    if (!t) return a.Wc.igStory;
                    if (t.querySelector(n["ig-story-video"])) return a.Wc.igStoryVideo;
                    if (t.querySelector(n["ig-story-photo"])) return a.Wc.igStoryPhoto;
                    throw new Error("Unknown ig story page");

                  default:
                    throw new Error("Unknown ig page");
                }
            }
            static getSoServiceTypeDetails(e) {
                if (!0 === o.so.audio.test(e)) return a.GT.soAudio;
                throw new Error("Unknown so page");
            }
            static getDaServiceTypeDetails(e) {
                if (!0 === o.da.video.test(e)) return a.X7.daVideo;
                throw new Error("Unknown da page");
            }
            static getViServiceTypeDetails(e) {
                var t = o.vi;
                switch (!0) {
                  case t.blog_video.test(e):
                    return a.d5.viBlogVideo;

                  case t.video.test(e):
                    return a.d5.viVideo;

                  case t.profile_feed.test(e):
                    return a.d5.viProfileFeed;

                  default:
                    throw new Error("Unknown vi page");
                }
            }
            static getTwServiceTypeDetails(e) {
                var t = o.tw;
                switch (!0) {
                  case t.feed.test(e):
                    return a.rk.twFeed;

                  case t.post.test(e):
                    return a.rk.twPost;

                  case t.photo.test(e):
                    return a.rk.twPhoto;

                  default:
                    throw new Error("Unknown tw page");
                }
            }
            static getTtServiceTypeDetails(e) {
                var t = o.tt;
                switch (!0) {
                  case t.feed.test(e):
                    return a.Cg.ttFeed;

                  case t.profile.test(e):
                    return a.Cg.ttProfile;

                  case t.video.test(e):
                    return a.Cg.ttVideo;

                  case t.explore.test(e):
                    return a.Cg.ttExplore;

                  case t.following.test(e):
                    return a.Cg.ttFollowing;

                  default:
                    throw new Error("Unknown tt page");
                }
            }
            static getVkServiceTypeDetails(e) {
                var t = o.vk;
                switch (!0) {
                  case t.clips.test(e):
                    return a.Tj.vkClips;

                  case t.clip.test(e):
                    return a.Tj.vkClip;

                  case t.videos.test(e):
                    return a.Tj.vkVideos;

                  case t.video.test(e):
                    return a.Tj.vkVideo;

                  case t.feed.test(e):
                    return a.Tj.vkFeed;

                  case t.photo.test(e):
                    return a.Tj.vkPhoto;

                  case t.story.test(e):
                    return a.Tj.vkStory;

                  case t.audios.test(e):
                    return a.Tj.vkAudios;

                  case t.audio.test(e):
                    return a.Tj.vkAudio;

                  case t.albums.test(e):
                    return a.Tj.vkAlbums;

                  case t.album.test(e):
                    return a.Tj.vkAlbum;

                  default:
                    throw new Error("Unknown vk page");
                }
            }
            static getOkServiceTypeDetails(e, t) {
                var r = o.ok, n = i.ok;
                switch (!0) {
                  case r.video.test(e):
                    return a.US.okVideo;

                  case r.music.test(e):
                    return a.US.okMusic;

                  case r.profile.test(e):
                    if (!t) return a.US.okProfile;
                    if (t.querySelector(n.profile)) return a.US.okProfile;
                    throw new Error("Unknown ok page");

                  case r.profile_music.test(e):
                    return a.US.okProfileMusic;

                  case r.hobby.test(e):
                    return a.US.okHobby;

                  case r.discovery.test(e):
                    return a.US.okDiscovery;

                  default:
                    throw new Error("Unknown ok page");
                }
            }
            static getMaServiceTypeDetails(e) {
                var t = o.ma;
                switch (!0) {
                  case t.community.test(e):
                    return a.Qi.maCommunity;

                  case t.community_multipost.test(e):
                    return a.Qi.maCommunityMultipost;

                  case t.community_photo.test(e):
                    return a.Qi.maCommunityPhoto;

                  case t.community_share.test(e):
                    return a.Qi.maCommunityShare;

                  case t.music.test(e):
                    return a.Qi.maMusic;

                  case t.video.test(e):
                    return a.Qi.maVideo;

                  case t.playlist.test(e):
                    return a.Qi.maPlaylist;

                  default:
                    throw new Error("Unknown ma page");
                }
            }
            static getYaServiceTypeDetails(e) {
                var t = o.ya;
                switch (!0) {
                  case t.artist.test(e):
                    return a.Io.yaArtist;

                  case t.album.test(e):
                    return a.Io.yaAlbum;

                  case t.track.test(e):
                    return a.Io.yaTrack;

                  case t.playlist.test(e):
                    return a.Io.yaPlaylist;

                  default:
                    throw new Error("Unknown ya page");
                }
            }
        }
    },
    188: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(55[05]|(|16|94)7|319|469|714)$/.test(r.j) ? null : (e, t) => {
            var r = !0;
            if (t) {
                if (!Array.isArray(e)) {
                    var n = e;
                    e = n.args || [], n.disableJson && (r = !1);
                }
            } else t = e, e = [];
            var o = "sf-bridge-" + parseInt(1e3 * Math.random(), 10) + "-" + Date.now();
            return new Promise((n => {
                var i = e => {
                    window.removeEventListener(o, i), n(e.detail);
                };
                window.addEventListener(o, i);
                var a = "(function(fn,args,id,useJson){var scriptNode=document.getElementById(id);if(scriptNode){scriptNode.parentNode.removeChild(scriptNode)}return new Promise(function(r){return r(fn.apply(null,args))}).then(function(result){return{result:result}},function(err){return{err:serializeError(err)}}).then(function(result){if(useJson){try{result=JSON.stringify(result)}catch(err){result=JSON.stringify({err:serializeError(err)})}}var e=new CustomEvent(id,{detail:result});window.dispatchEvent(e)});function serializeError(err){return{name:err.name,message:err.message,code:err.code,stack:err.stack}}})(" + [ t ].concat([ e, o, r ].map((e => JSON.stringify(e)))).join(",") + ")", s = document.createElement("script");
                s.id = o, s.textContent = a, document.body.appendChild(s);
            })).then((e => {
                r && (e = JSON.parse(e));
                var t = e, n = t.err, o = t.result;
                if (n) throw Object.assign(new Error, n);
                return o;
            }));
        };
    },
    2944: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => i
        });
        var n = /^[^{]+\{\s*\[native \w/, o = function(e, t) {
            return (o = n.test(document.compareDocumentPosition) || n.test(document.contains) ? function(e, t) {
                var r = 9 === e.nodeType ? e.documentElement : e, n = t && t.parentNode;
                return e === n || !(!n || 1 !== n.nodeType || !(r.contains ? r.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)));
            } : function(e, t) {
                if (t) for (;t = t.parentNode; ) if (t === e) return !0;
                return !1;
            }).apply(this, arguments);
        };
        const i = /^(83|912)$/.test(r.j) ? (e, t) => o(e, t) : null;
    },
    1853: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => i
        });
        var n = r(172), o = r(5299);
        const i = /^(319|550|7|947)$/.test(r.j) ? null : (e, t) => {
            var r = document.createElement("div");
            if ("string" == typeof t) if (document.getElementById(t)) t = document.getElementById(t); else {
                var i = document.createElement("div");
                i.setAttribute("id", t), (t = i).style.position = "fixed", t.style.bottom = "20px", 
                t.style.right = "30px", t.style.display = "flex", t.style.flexDirection = "column-reverse", 
                t.style.overflowX = "hidden", t.style.overflowY = "scroll", t.style.zIndex = "100000", 
                t.style.maxHeight = "95%", document.body.appendChild(t);
            }
            function a() {
                r && ((0, o.xJ)(r), r = null);
            }
            return (0, n.XX)((0, o.d5)((0, o.Ob)(e, {
                unmountLayer: a
            }), t), r), a;
        };
    },
    8139: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(9(12|71|94)|270|3|302|657|714|83|889)$/.test(r.j) ? e => "data-" + e.replace(/[A-Z]/g, (function(e) {
            return "-" + e.toLowerCase();
        })) : null;
    },
    2970: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = /\\(\\u[0-9a-f]{4})/g;
        const o = /^(319|550|7|947)$/.test(r.j) ? null : function(e) {
            try {
                return JSON.parse(JSON.stringify(e).replace(n, "$1"));
            } catch (t) {
                return e;
            }
        };
    },
    4733: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => a
        });
        var n = r(8244), o = {
            create: function(e, t) {
                var r, n;
                for (var o in r = "object" != typeof e ? document.createElement(e) : e, t) {
                    var a = t[o];
                    (n = i[o]) ? n(r, a) : r[o] = a;
                }
                return r;
            }
        }, i = {
            text: function(e, t) {
                e.textContent = t;
            },
            data: function(e, t) {
                for (var r in t) e.dataset[r] = t[r];
            },
            class: function(e, t) {
                if (Array.isArray(t)) for (var r = 0, n = t.length; r < n; r++) e.classList.add(t[r]); else e.setAttribute("class", t);
            },
            style: function(e, t) {
                if ("object" == typeof t) for (var r in t) {
                    var n = r;
                    "float" === n && (n = "cssFloat");
                    var o = t[r];
                    if (Array.isArray(o)) for (var i = 0, a = o.length; i < a; i++) e.style[n] = o[i]; else e.style[n] = o;
                } else e.setAttribute("style", t);
            },
            append: function(e, t) {
                Array.isArray(t) || (t = [ t ]);
                for (var r = 0, n = t.length; r < n; r++) {
                    var o = t[r];
                    (o || 0 === o) && ("object" != typeof o && (o = document.createTextNode(o)), e.appendChild(o));
                }
            },
            on: function(e, t) {
                "object" != typeof t[0] && (t = [ t ]);
                for (var r = 0, o = t.length; r < o; r++) {
                    var i = t[r];
                    Array.isArray(i) && n.A.on.apply(n.A, [ e ].concat(i));
                }
            },
            one: function(e, t) {
                "object" != typeof t[0] && (t = [ t ]);
                for (var r = 0, o = t.length; r < o; r++) {
                    var i = t[r];
                    Array.isArray(i) && n.A.one.apply(n.A, [ e ].concat(i));
                }
            },
            onCreate: function(e, t) {
                t.call(e, e);
            },
            attr: function(e, t) {
                var r, n;
                for (r in t) n = t[r], e.setAttribute(r, n);
            }
        };
        const a = /^(319|550|7|947)$/.test(r.j) ? null : o;
    },
    8244: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => a
        });
        var n = {
            on: function(e, t, r, n) {
                e.addEventListener(t, r, n);
            },
            off: function(e, t, r, n) {
                e.removeEventListener(t, r, n);
            },
            one: function(e, t, r, o) {
                var i = [ "oneFn", t, !!o ].join("_"), a = r[i];
                a || (r[i] = a = function(e) {
                    n.off(this, t, a, o), r.apply(this, arguments);
                }), n.on(e, t, a, o), e = null;
            }
        }, o = "sf-removed-" + Math.floor(1e6 * Math.random()), i = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
        n.onRemoveEventName = o, n.onRemoveClassName = i, n.onRemoveListener = function(e) {
            n.trigger(e, o, {
                cancelable: !0,
                bubbles: !1
            });
        }, n.onRemoveEvent = (e, t) => {
            e.classList.add(i), e.addEventListener(o, t);
        }, n.offRemoveEvent = function(e, t) {
            e.removeEventListener(n.onRemoveEventName, t);
        }, n.trigger = function(e, t, r) {
            void 0 === r && (r = {}), void 0 === r.bubbles && (r.bubbles = !1), void 0 === r.cancelable && (r.cancelable = !1);
            var n = null;
            n = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, r) : new CustomEvent(t, r), 
            e.dispatchEvent(n);
        };
        const a = /^(319|550|7|947)$/.test(r.j) ? null : n;
    },
    6918: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        class n extends Error {
            constructor(e, t) {
                super(e), this.code = t;
            }
        }
        const o = /^(319|550|7|947)$/.test(r.j) ? null : n;
    },
    9022: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => a
        });
        var n = (0, r(8233).A)("extensionMarker"), o = "savefrom-helper-extension", i = {
            getItem(e) {
                var t = null;
                try {
                    t = window.sessionStorage.getItem(e);
                } catch (t) {
                    n.error("getItem error", e, t);
                }
                return t;
            },
            setItem(e, t) {
                try {
                    window.sessionStorage.setItem(e, t);
                } catch (r) {
                    n.error("setMarker error", e, t, r);
                }
            },
            hash(e) {
                var t = e.length, r = 0, n = 0;
                if (t > 0) for (;n < t; ) r = (r << 5) - r + e.charCodeAt(n++) | 0;
                return "" + r;
            },
            getMarker() {
                var e = null;
                return e = browser.runtime.id, this.hash("" + e);
            },
            getCurrentMarker() {
                return this.getItem(o);
            },
            setMarker(e) {
                return this.setItem(o, e);
            },
            getFallbackMarker() {
                return this.getItem(`${o}-fallback`);
            },
            setFallbackMarker() {
                return this.setItem(`${o}-fallback`, "1");
            },
            isSingle() {
                var e = this.getMarker(), t = this.getCurrentMarker();
                return "1" === t && null === this.getFallbackMarker() && (this.setFallbackMarker(), 
                t = null), null === t && this.setMarker(t = e), t === e;
            }
        };
        const a = /^(319|550|7|947)$/.test(r.j) ? null : i;
    },
    9580: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(9(12|41|71|94)|252|270|3|302|657|83)$/.test(r.j) ? function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            t && !Array.isArray(t) && (t = [ t ]);
            for (var r, n = [], o = {
                "{": 0,
                "[": 0
            }, i = {
                "}": "{",
                "]": "["
            }, a = /[{}\]\[":0-9.,-]/, s = /[\r\n\s\t]/, u = "", l = 0; r = e[l]; l++) if ('"' !== r) a.test(r) ? (u += r, 
            "{" === r || "[" === r ? (o["{"] || o["["] || (u = r), o[r]++) : "}" !== r && "]" !== r || (o[i[r]]--, 
            o["{"] || o["["] || n.push(u))) : "t" === r && "true" === e.substr(l, 4) ? (u += "true", 
            l += 3) : "f" === r && "false" === e.substr(l, 5) ? (u += "false", l += 4) : "n" === r && "null" === e.substr(l, 4) ? (u += "null", 
            l += 3) : s.test(r) || (o["{"] = 0, o["["] = 0, u = ""); else {
                for (var c = l; -1 !== c && (c === l || "\\" === e[c - 1]); ) c = e.indexOf('"', c + 1);
                -1 === c && (c = e.length - 1), u += e.substr(l, c - l + 1), l = c, o["{"] || o["["] || n.push(u);
            }
            for (var d = [], p = function() {
                var e = n[A];
                if ("{}" === e || "[]" === e) return 1;
                try {
                    t.every((function(t) {
                        return t.test(e);
                    })) && d.push(JSON.parse(e));
                } catch (e) {}
            }, A = 0, h = n.length; A < h; A++) p();
            return d;
        } : null;
    },
    6810: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => i
        });
        var n = r(2970), o = {
            maxLength: 80,
            rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            illegalRe: /[\/?<>\\:*|"~\u202B]/g,
            controlRe: /[\x00-\x1f\x80-\x9f]/g,
            zeroWidthJoinerRe: /\u200D/g,
            reservedRe: /^\.+/,
            trim: function(e) {
                return e.replace(this.rtrim, "");
            },
            partsRe: /^(.+)\.([a-z0-9]{1,4})$/i,
            getParts: function(e) {
                return e.match(this.partsRe);
            },
            specialChars: "nbsp,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,times,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,divide,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml".split(","),
            specialCharsList: [ [ "amp", "quot", "lt", "gt" ], [ 38, 34, 60, 62 ] ],
            specialCharsRe: /&([^;]{2,6});/g,
            decodeSpecialChars: function(e) {
                var t = this;
                return e.replace(this.specialCharsRe, (function(e, r) {
                    var n = null;
                    if ("#" === r[0]) return n = parseInt(r.substr(1)), isNaN(n) ? "" : String.fromCharCode(n);
                    var o = t.specialCharsList[0].indexOf(r);
                    return -1 !== o ? (n = t.specialCharsList[1][o], String.fromCharCode(n)) : -1 !== (o = t.specialChars.indexOf(r)) ? (n = o + 160, 
                    String.fromCharCode(n)) : "";
                }));
            },
            decodeHexChars: function(e) {
                return e.replace(/(\\x[a-zA-Z0-9]{2})/g, (function(e, t) {
                    var r = t;
                    try {
                        r = String.fromCharCode(parseInt("0x" + r.substr(2), 16));
                    } catch (e) {}
                    return r;
                }));
            },
            rnRe: /\r?\n/g,
            re1: /[*?"]/g,
            re2: /</g,
            re3: />/g,
            spaceRe: /[\s\t\uFEFF\xA0]+/g,
            dblRe: /(\.|!|\?|_|,|-|:|\+){2,}/g,
            re4: /[.,:;\/\-_+=']$/g,
            modify: function(e) {
                if (!e) return "";
                e = (0, n.A)(e);
                try {
                    e = decodeURIComponent(e);
                } catch (t) {
                    e = unescape(e);
                }
                if (e = (e = this.decodeSpecialChars(e)).replace(this.rnRe, " "), (e = (e = this.trim(e)).replace(this.zeroWidthJoinerRe, "").replace(this.re1, "").replace(this.re2, "(").replace(this.re2, "(").replace(this.re3, ")").replace(this.spaceRe, " ").replace(this.dblRe, "$1").replace(this.illegalRe, "_").replace(this.controlRe, "").replace(this.reservedRe, "").replace(this.re4, "")).length > this.maxLength) {
                    var t = this.getParts(e);
                    t && 3 == t.length && (t[1] = t[1].substr(0, this.maxLength), e = t[1] + "." + t[2]);
                }
                return this.trim(e);
            }
        };
        const i = /^(319|550|7|947)$/.test(r.j) ? null : o;
    },
    6480: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(5624);
        const o = /^(319|550|7|947)$/.test(r.j) ? null : function(e, t, r) {
            var o = "";
            if (r || "undefined" == typeof URL || "undefined" == typeof Blob) {
                var i = (0, n.A)(e);
                o = "data:" + t + ";charset=utf8;base64," + encodeURIComponent(btoa(i));
            } else {
                var a = new Blob([ e ], {
                    encoding: "UTF-8",
                    type: t
                });
                o = URL.createObjectURL(a);
            }
            return o;
        };
    },
    5218: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(9(12|41|71|94)|252|270|3|302|657|83)$/.test(r.j) ? function(e) {
            for (var t = []; e.parentElement && 1 === e.parentElement.nodeType; ) {
                var r = "", n = [].slice.call(e.parentElement.children);
                n.length > 1 && (r = `:nth-child(${n.indexOf(e) + 1})`), t.unshift(`${e.tagName}${r}`), 
                e = e.parentElement;
            }
            return t.join(">");
        } : null;
    },
    8233: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = e => {
            var t = null;
            return (t = () => {}).t = t.log = t.info = t.warn = t.error = t.debug = t, t;
        };
    },
    2128: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(319|550|7|947)$/.test(r.j) ? null : () => {
            var e = null;
            return "undefined" != typeof MutationObserver ? e = MutationObserver : "undefined" != typeof WebKitMutationObserver ? e = WebKitMutationObserver : "undefined" != typeof MozMutationObserver && (e = MozMutationObserver), 
            e;
        };
    },
    4353: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(9(12|41|71|94)|252|270|3|302|657|83)$/.test(r.j) ? function(e, t) {
            t && !Array.isArray(t) && (t = [ t ]);
            var r = [];
            return e.replace(/<script(?:\s*|\s[^>]+[^\/])>/g, (function(n, o) {
                o += n.length;
                var i = e.indexOf("<\/script>", o);
                if (-1 !== i) {
                    var a = e.substr(o, i - o);
                    t ? t.every((function(e) {
                        return e.test(a);
                    })) && r.push(a) : r.push(a);
                }
            })), r;
        } : null;
    },
    2525: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(3372);
        const o = /^(319|550|7|947)$/.test(r.j) ? null : function(e, t) {
            if (!e || 1 !== e.nodeType) return null;
            if (e.closest) return e.closest(t);
            if ((0, n.A)(e, t)) return e;
            if (!(0, n.A)(e, t + " " + e.tagName)) return null;
            for (var r = e = e.parentNode; r; r = r.parentNode) {
                if (1 !== r.nodeType) return null;
                if ((0, n.A)(r, t)) return r;
            }
            return null;
        };
    },
    8278: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(302|657|889|971|994)$/.test(r.j) ? function(e, t) {
            Array.isArray(t) || (t = [ t ]);
            for (var r = e; r; r = r.parentNode) {
                if (1 !== r.nodeType) return null;
                for (var n, o = 0; n = t[o]; o++) if (r.classList.contains(n)) return r;
            }
            return null;
        } : null;
    },
    7445: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => h
        });
        var n = r(467), o = r(4756), i = r.n(o), a = r(9242);
        const s = function() {
            return parseInt(Date.now() / 1e3, 10);
        };
        var u = "_expire_", l = {
            getExpire: function(e, t) {
                var r = s(), n = e + u;
                return a.A.storage.get([ e, n ], (function(o) {
                    var i = void 0 === o[n] || o[n] < r, a = {};
                    return a[e] = o[e], t(a, i);
                }));
            },
            setExpire: function(e, t, r) {
                var n = s(), o = {};
                for (var i in e) o[i] = e[i], o[i + u] = n + t;
                return a.A.storage.set(o, (function() {
                    return r && r();
                }));
            }
        };
        const c = l;
        var d = r(5751), p = function() {
            var e = (0, n.A)(i().mark((function e() {
                var t;
                return i().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return t = null, e.abrupt("return", new Promise((e => {
                            c.getExpire("selectorConfig", function() {
                                var r = (0, n.A)(i().mark((function r(n, o) {
                                    return i().wrap((function(r) {
                                        for (;;) switch (r.prev = r.next) {
                                          case 0:
                                            if (!o && n.selectorConfig) {
                                                r.next = 5;
                                                break;
                                            }
                                            return r.next = 3, A();

                                          case 3:
                                            t = r.sent, e(t);

                                          case 5:
                                            e(n.selectorConfig);

                                          case 6:
                                          case "end":
                                            return r.stop();
                                        }
                                    }), r);
                                })));
                                return function(e, t) {
                                    return r.apply(this, arguments);
                                };
                            }());
                        })));

                      case 2:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })));
            return function() {
                return e.apply(this, arguments);
            };
        }(), A = function() {
            var e = (0, n.A)(i().mark((function e() {
                return i().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", (0, d.A)({
                            url: "https://sf-helper.com/static/helper-config/selector_config.json"
                        }).then((e => {
                            var t = JSON.parse(e.body);
                            if (t.ttl) return c.setExpire({
                                selectorConfig: t.selectors
                            }, t.ttl, (() => {})), t.selectors;
                        })));

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })));
            return function() {
                return e.apply(this, arguments);
            };
        }();
        const h = p;
    },
    1633: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(319|550|7|947)$/.test(r.j) ? null : function(e) {
            e = e ? e + "_" : "";
            var t = Date.now();
            return e + Math.floor(1e12 * (t - Math.floor(t))).toString(36) + Math.floor(1e12 * Math.random()).toString(36);
        };
    },
    4605: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            z: () => l
        }), /^(252|555|941)$/.test(r.j)) var n = r(467);
        var o = r(4756), i = r.n(o), a = r(9242), s = r(9620), u = r(1460);
        class l {
            constructor() {
                this.active = 1, this.utils = void 0, this.settings = void 0, this.cache = c;
            }
            start() {
                var e = this;
                return (0, n.A)(i().mark((function t() {
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.next = 2, a.A.callFn("getPreferences");

                          case 2:
                            e.settings = t.sent, e.utils = (0, s.A)({
                                preferences: e.settings
                            }), e.defaultListeners(), e.init && e.init();

                          case 6:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            defaultListeners() {
                document.addEventListener("file.download", (e => {
                    var t = e.detail;
                    this.utils.download(t.filename, t.downloadURL);
                }));
            }
            initObserver() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                this.observer = new u.A({
                    queries: e.map((e => ({
                        css: e.selector,
                        callback: e.handle.bind(e),
                        is: e.type
                    })))
                }), this.observer.start();
            }
            appendStyle(e) {
                var t = document.createElement("style");
                t.textContent = e, document.body.appendChild(t);
            }
        }
        class c {
            static set(e, t, r) {
                localStorage.setItem(e, JSON.stringify({
                    val: t,
                    expires: r ? Date.now() + 60 * r * 1e3 : -1
                }));
            }
            static get(e) {
                var t = localStorage.getItem(e);
                if (!t) return null;
                var r = JSON.parse(t), n = r.val, o = r.expires;
                return n && -1 === o || o > Date.now() ? n : null;
            }
        }
    },
    8110: (e, t, r) => {
        "use strict";
        function n(e, t) {
            var r = t.split("?extra=")[1].split("#"), n = r[0], o = r[1], i = o ? s(o) : "", u = s(n), l = (i ? i.split(String.fromCharCode(9)) : [])[0].split(String.fromCharCode(11)), c = l.splice(0, 1, u)[0];
            return !!a[c] && (t = a[c].apply(null, [ ...l, e ]));
        }
        function o(e) {
            return /\.m3u8\?/.test(e);
        }
        function i(e) {
            if (o(e)) {
                var t = (e = e.replace("/index.m3u8", ".mp3")).split("/"), r = -1 !== e.indexOf("audios") ? 1 : 0;
                return t.splice(t.length - (2 + r), 1), t.join("/");
            }
            return null;
        }
        r.d(t, {
            ys: () => n,
            Nx: () => o,
            d: () => i
        });
        var a = {
            s: (e, t) => {
                var r = e.length;
                if (r) {
                    var n = function(e, t) {
                        var r = e.length, n = [];
                        if (r) {
                            var o = r;
                            for (t = Math.abs(t); o--; ) t = (r * (o + 1) ^ t + o) % r, n[o] = t;
                        }
                        return n;
                    }(e, t), o = 0;
                    for (e = e.split(""); ++o < r; ) e[o] = e.splice(n[r - 1 - o], 1, e[o])[0];
                    e = e.join("");
                }
                return e;
            },
            i: (e, t, r) => a.s(e, t ^ r)
        };
        function s(e) {
            if (!e || e.length % 4 == 1) return !1;
            for (var t, r, n = 0, o = 0, i = ""; r = e.charAt(o++); ) ~(r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=".indexOf(r)) && (t = n % 4 ? 64 * t + r : r, 
            n++ % 4) && (i += String.fromCharCode(255 & t >> (-2 * n & 6)));
            return i;
        }
    },
    3410: (e, t, r) => {
        "use strict";
        r.d(t, {
            Oi: () => I,
            ht: () => g,
            tI: () => m
        });
        var n = r(3453), o = r(467), i = r(4756), a = r.n(i), s = r(9191), u = r(9008), l = r(5751), c = r(9242), d = (0, 
        r(8233).A)("tools/youtube");
        function p(e) {
            return new Promise(((t, r) => {
                c.A.sendMessage({
                    action: "getFileSize",
                    url: e
                }, (function(r) {
                    var n = r.fileSize;
                    if (0 === n || !Number.isFinite(n)) return t(!1);
                    c.A.sendMessage({
                        action: "getFileSize",
                        url: e,
                        requestOptions: {
                            type: "GET",
                            headers: {
                                Range: `bytes=${n - 8}-${n}`
                            }
                        }
                    }, (function(r) {
                        var n = r.error;
                        n ? d.debug(`Link ${e} don't have content`) : d.debug(`Link ${e} have content`), 
                        t(!n);
                    }));
                }));
            }));
        }
        var A = r(1853), h = r(172), f = r(3434);
        function g(e, t) {
            return v.apply(this, arguments);
        }
        function v() {
            return v = (0, o.A)(a().mark((function e(t, r) {
                var i, d, p, g, v, I, C, m, E, w, b, x, R, k, O, S, F, j, L, D;
                return a().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (null != t && null !== (i = t.data) && void 0 !== i && i.hls || null != t && null !== (d = t.data) && void 0 !== d && d.failover_host) {
                            e.next = 2;
                            break;
                        }
                        return e.abrupt("return", {
                            hls: [],
                            mp4: [],
                            dash: []
                        });

                      case 2:
                        return I = null === (p = new URL(null == t || null === (g = t.data) || void 0 === g ? void 0 : g.hls)) || void 0 === p ? void 0 : p.hostname, 
                        C = null == t ? void 0 : t.title, m = null == t || null === (v = t.data) || void 0 === v ? void 0 : v.failover_host, 
                        E = /:"(https:\\\/\\\/[a-z0-9\-]{3,15}\.vkuservideo\.net.*?\.(\d+)\.mp4.*?)",/gm, 
                        w = (0, s.H)(r, E).filter((e => e[1])).map((e => {
                            var t = (0, n.A)(e, 3);
                            t[0];
                            return {
                                href: t[1],
                                quality: t[2],
                                format: "MP4"
                            };
                        })), b = /RESOLUTION=(.*?)\\n(http.*?)\\n/gm, x = (0, s.H)(r, b).filter((e => e[1])).map((e => {
                            var t = (0, n.A)(e, 3), r = (t[0], t[1]), o = t[2];
                            return {
                                quality: r.split("x").length > 1 ? r.split("x")[1] : r,
                                href: o,
                                format: "HLS",
                                noSize: !0
                            };
                        })), R = /hls":"(.*?)",/gm, k = (0, s.H)(r, R).filter((e => e[1])).map((e => e[1])).pop(), 
                        e.next = 13, (0, l.A)(k).then((e => e.body));

                      case 13:
                        return O = e.sent, S = (0, s.H)(O, /QUALITY=(.*?),RESOLUTION=(.*?)\n(.*?)\n/gm), 
                        F = !0, j = S.filter((e => e[1])), e.next = 19, Promise.all(j.map(function() {
                            var e = (0, o.A)(a().mark((function e(t) {
                                var r, o, i, s, u, l, d;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        if (r = (0, n.A)(t, 4), r[0], o = r[1], r[2], i = r[3], s = o.split("x").length > 1 ? o.split("x")[1] : o, 
                                        u = i, !F || !i.startsWith("/expires")) {
                                            e.next = 25;
                                            break;
                                        }
                                        return l = "https://" + I + i, e.next = 7, fetch(l);

                                      case 7:
                                        if (200 !== e.sent.status) {
                                            e.next = 13;
                                            break;
                                        }
                                        u = l, F = !1, e.next = 25;
                                        break;

                                      case 13:
                                        return d = "https://" + m + i, e.next = 16, fetch(d);

                                      case 16:
                                        if (200 !== e.sent.status) {
                                            e.next = 22;
                                            break;
                                        }
                                        u = d, F = !1, e.next = 25;
                                        break;

                                      case 22:
                                        return u = void 0, F = !1, e.abrupt("return", null);

                                      case 25:
                                        return e.abrupt("return", {
                                            quality: s,
                                            href: i,
                                            format: "MP4",
                                            noSize: !0,
                                            func: e => {
                                                e.preventDefault(), c.A.sendMessage({
                                                    action: "checkAndOpenProLanding",
                                                    id: "vk-ext"
                                                }), e.stopPropagation(), (0, A.A)((0, h.n)(f.Ay, {
                                                    filename: C + ".mp4",
                                                    format: "mp4",
                                                    sources: [ {
                                                        url: u
                                                    } ],
                                                    convertType: "hls"
                                                }), "sf-muxer-parent");
                                            }
                                        });

                                      case 26:
                                      case "end":
                                        return e.stop();
                                    }
                                }), e);
                            })));
                            return function(t) {
                                return e.apply(this, arguments);
                            };
                        }()));

                      case 19:
                        return L = e.sent, D = L.filter((e => e)), x.push(...D), x = x.map(y), e.abrupt("return", {
                            hls: (0, u.W)(x, "href"),
                            mp4: (0, u.W)(w, "href"),
                            dash: []
                        });

                      case 24:
                      case "end":
                        return e.stop();
                    }
                }), e);
            }))), v.apply(this, arguments);
        }
        function I(e, t) {
            return C.apply(this, arguments);
        }
        function C() {
            return C = (0, o.A)(a().mark((function e(t, r) {
                var i, d, p, g, v, I, C, m, E, w, b, x, R, k, O, S, F;
                return a().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        for (d = "vkvd546.okcdn.ru/?", p = null == t ? void 0 : t.title, null == t || null === (i = t.data) || void 0 === i ? void 0 : i.failover_host, 
                        g = /url(?:720|360|1080|480)"\s*:\s*"(https:[^"]+)/gm, v = []; null !== (I = g.exec(r)); ) I[0], 
                        C = /url(720|360|1080|480)/gm.exec(I[0]), m = I[1].replace(/\\\//g, "/"), v.push({
                            quality: Number(C[1]),
                            title: `${p}-${C[1]}`,
                            href: m,
                            format: "MP4"
                        });
                        return (0, s.H)(r, g).filter((e => e[1])).map((e => {
                            var t = (0, n.A)(e, 3);
                            t[0];
                            return {
                                href: t[1],
                                quality: t[2],
                                format: "MP4"
                            };
                        })), E = /RESOLUTION=(.*?)\\n(http.*?)\\n/gm, w = (0, s.H)(r, E).filter((e => e[1])).map((e => {
                            var t = (0, n.A)(e, 3), r = (t[0], t[1]), o = t[2];
                            return {
                                quality: r.split("x").length > 1 ? r.split("x")[1] : r,
                                href: o,
                                format: "HLS",
                                noSize: !0
                            };
                        })), b = /hls":"(.*?)",/gm, x = (0, s.H)(r, b).filter((e => e[1])).map((e => e[1])).pop(), 
                        e.next = 13, (0, l.A)(x).then((e => e.body));

                      case 13:
                        return R = e.sent, k = (0, s.H)(R, /QUALITY=(.*?),RESOLUTION=(.*?)\n(.*?)\n/gm), 
                        !0, O = k.filter((e => e[1])), e.next = 19, Promise.all(O.map(function() {
                            var e = (0, o.A)(a().mark((function e(t) {
                                var r, o, i, s, u;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        return r = (0, n.A)(t, 4), r[0], o = r[1], r[2], i = r[3], s = o.split("x").length > 1 ? o.split("x")[1] : o, 
                                        i, u = "https://" + d + i, e.abrupt("return", {
                                            quality: s,
                                            href: u,
                                            format: "MP4",
                                            noSize: !0,
                                            func: e => {
                                                e.preventDefault(), c.A.sendMessage({
                                                    action: "checkAndOpenProLanding",
                                                    id: "vk-ext"
                                                }), e.stopPropagation(), (0, A.A)((0, h.n)(f.Ay, {
                                                    filename: p + ".mp4",
                                                    format: "mp4",
                                                    sources: [ {
                                                        url: u
                                                    } ],
                                                    convertType: "hls"
                                                }), "sf-muxer-parent");
                                            }
                                        });

                                      case 6:
                                      case "end":
                                        return e.stop();
                                    }
                                }), e);
                            })));
                            return function(t) {
                                return e.apply(this, arguments);
                            };
                        }()));

                      case 19:
                        return S = e.sent, F = S.filter((e => e)), w.push(...F), w = w.map(y), e.abrupt("return", {
                            hls: (0, u.W)(w, "href"),
                            mp4: (0, u.W)(v, "href"),
                            dash: []
                        });

                      case 24:
                      case "end":
                        return e.stop();
                    }
                }), e);
            }))), C.apply(this, arguments);
        }
        function m(e, t) {
            return E.apply(this, arguments);
        }
        function E() {
            return (E = (0, o.A)(a().mark((function e(t, r) {
                var n, o;
                return a().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        n = [], o = 0;

                      case 2:
                        if (!(o < t.length)) {
                            e.next = 17;
                            break;
                        }
                        if (!r || !r(t[o])) {
                            e.next = 6;
                            break;
                        }
                        return n.push(t[o]), e.abrupt("continue", 14);

                      case 6:
                        if (-1 === t[o].href.indexOf("http")) {
                            e.next = 13;
                            break;
                        }
                        return e.next = 9, p(t[o].href);

                      case 9:
                        e.sent && n.push(t[o]), e.next = 14;
                        break;

                      case 13:
                        n.push(t[o]);

                      case 14:
                        o++, e.next = 2;
                        break;

                      case 17:
                        return e.abrupt("return", n);

                      case 18:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })))).apply(this, arguments);
        }
        var y = e => {
            var t = {
                full: 1080,
                hd: 720,
                sd: 480,
                low: 360,
                lowest: 240,
                mobile: 144
            };
            return e.rawQuality = e.quality, e.quality = t[e.quality] ? String(t[e.quality]) : e.quality, 
            e;
        };
    },
    7736: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(55[05]|(|16|94)7|319|889)$/.test(r.j) ? null : () => window.top !== window.self;
    },
    1613: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = null;
        const o = /^(319|550|7|947)$/.test(r.j) ? null : (e, t) => {
            if (!n) {
                var r = document.createElement("div");
                "function" == typeof r.matches ? n = (e, t) => e.matches(t) : "function" == typeof r.matchesSelector ? n = (e, t) => e.matchesSelector(t) : "function" == typeof r.webkitMatchesSelector ? n = (e, t) => e.webkitMatchesSelector(t) : "function" == typeof r.mozMatchesSelector && (n = (e, t) => e.mozMatchesSelector(t)), 
                r = null;
            }
            return n(e, t);
        };
    },
    9589: (e, t, r) => {
        "use strict";
        r.d(t, {
            Ay: () => s,
            Ys: () => a
        });
        var n = r(9242), o = /^(319|550|7|947)$/.test(r.j) ? null : [], i = (e, t, r) => Promise.resolve().then((() => !r || r())).then((r => {
            r && (-1 === o.indexOf(e) && o.push(e), t());
        })), a = (e, t, r) => i(e, (() => n.A.callFn("getPreferences").then((r => {
            t(e, {
                preferences: r
            });
        }))), r);
        const s = /^(167|252|555|941)$/.test(r.j) ? i : null;
    },
    3372: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = function(e, t) {
            var r = document.createElement("div");
            return n = "function" == typeof r.matches ? function(e, t) {
                return e.matches(t);
            } : "function" == typeof r.matchesSelector ? function(e, t) {
                return e.matchesSelector(t);
            } : "function" == typeof r.webkitMatchesSelector ? function(e, t) {
                return e.webkitMatchesSelector(t);
            } : "function" == typeof r.mozMatchesSelector ? function(e, t) {
                return e.mozMatchesSelector(t);
            } : "function" == typeof r.oMatchesSelector ? function(e, t) {
                return e.oMatchesSelector(t);
            } : "function" == typeof r.msMatchesSelector ? function(e, t) {
                return e.msMatchesSelector(t);
            } : function(e, t) {
                return !1;
            }, r = null, n(e, t);
        };
        const o = /^(319|550|7|947)$/.test(r.j) ? null : function(e, t) {
            return n(e, t);
        };
    },
    3434: (e, t, r) => {
        "use strict";
        r.d(t, {
            Ay: () => K
        });
        var n = r(467), o = r(3453), i = r(4756), a = r.n(i), s = r(9242), u = r(8233), l = r(3561), c = r(5542), d = r(5299), p = r(8244), A = r(4467);
        function h(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function f(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? h(Object(r), !0).forEach((function(t) {
                    (0, A.A)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : h(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var g = (0, u.A)("downloader:providers");
        const v = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r = t ? `${t}-converter` : "unknown-converter", n = {
                ec: r
            };
            e.on("run", (e => {
                g.info(r, "Send analytics run downloader."), s.A.sendMessage({
                    action: "trackConverterStat",
                    params: f({
                        ea: "init-converter",
                        el: "true"
                    }, n)
                });
            })), e.on("completed", (e => {
                g.info(r, "Send analytics downloader completed."), s.A.sendMessage({
                    action: "trackConverterStat",
                    params: f({
                        ea: "completed-converter",
                        el: "true"
                    }, n)
                });
            })), e.on("error", (t => {
                e.sendError || (g.info(r, "Send analytics error downloader - " + t.message), s.A.sendMessage({
                    action: "trackConverterStat",
                    params: f({
                        ea: "error-converter",
                        el: t.message,
                        location: location.href
                    }, n)
                }), e.sendError = !0);
            }));
        };
        r(172);
        var I = r(6770), C = null, m = 0;
        const E = function() {
            1 === ++m && (C || (C = new I.A), C.start());
            var e = !1;
            return () => {
                e || (e = !0, 0 == --m && C.stop());
            };
        };
        var y = 0;
        function w(e) {
            return e.returnValue = !0;
        }
        const b = function() {
            1 === ++y && window.addEventListener("beforeunload", w);
            var e = !1;
            return () => {
                e || (e = !0, 0 == --y && window.removeEventListener("beforeunload", w));
            };
        };
        var x = r(6942), R = r.n(x), k = r(6637), O = r.n(k), S = r(4627), F = {
            margin: "0 12px"
        };
        const j = e => {
            var t = e.title, r = e.status, n = e.progress, o = e.progressStatus, i = e.onClickCancel, a = e.error, s = (0, 
            S.A)(O()), u = d.Ay.useMemo((() => ({
                width: n + "%"
            })), [ n ]);
            return d.Ay.createElement("div", {
                className: R()(s.ffDownloader)
            }, d.Ay.createElement("div", {
                className: s.container
            }, d.Ay.createElement("div", {
                onClick: i,
                className: s.closeBtn,
                style: {
                    backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC42Ij4KPHBhdGggZD0iTTEzLjY4IDE0LjIyQzEzLjUzNjggMTQuMjE5OSAxMy4zOTk2IDE0LjE2MjkgMTMuMjk4NCAxNC4wNjE2TDMuOTM4MzkgNC43MDE2MkMzLjg0MyA0LjU5OTI1IDMuNzkxMDcgNC40NjM4NiAzLjc5MzU0IDQuMzIzOTZDMy43OTYwMSA0LjE4NDA2IDMuODUyNjggNC4wNTA1OSAzLjk1MTYyIDMuOTUxNjVDNC4wNTA1NiAzLjg1MjcxIDQuMTg0MDMgMy43OTYwNCA0LjMyMzkzIDMuNzkzNTdDNC40NjM4MyAzLjc5MTEgNC41OTkyMiAzLjg0MzAzIDQuNzAxNTkgMy45Mzg0MkwxNC4wNjE2IDEzLjI5ODRDMTQuMTM3IDEzLjM3MzkgMTQuMTg4NCAxMy40NzAxIDE0LjIwOTIgMTMuNTc0OEMxNC4yMyAxMy42Nzk1IDE0LjIxOTMgMTMuNzg4IDE0LjE3ODQgMTMuODg2NkMxNC4xMzc2IDEzLjk4NTIgMTQuMDY4NSAxNC4wNjk1IDEzLjk3OTcgMTQuMTI4OUMxMy44OTEgMTQuMTg4MiAxMy43ODY3IDE0LjIxOTkgMTMuNjggMTQuMjJaIiBmaWxsPSIjNDM0MzQzIi8+CjxwYXRoIGQ9Ik00LjMyMDI5IDE0LjIyQzQuMjEzNTUgMTQuMjE5OSA0LjEwOTI0IDE0LjE4ODIgNC4wMjA1MyAxNC4xMjg5QzMuOTMxODEgMTQuMDY5NSAzLjg2MjY3IDEzLjk4NTIgMy44MjE4NCAxMy44ODY2QzMuNzgxMDEgMTMuNzg4IDMuNzcwMzIgMTMuNjc5NSAzLjc5MTExIDEzLjU3NDhDMy44MTE5MSAxMy40NzAxIDMuODYzMjYgMTMuMzczOSAzLjkzODY5IDEzLjI5ODRMMTMuMjk4NyAzLjkzODQyQzEzLjQwMTEgMy44NDMwMyAxMy41MzY0IDMuNzkxMSAxMy42NzYzIDMuNzkzNTdDMTMuODE2MiAzLjc5NjA0IDEzLjk0OTcgMy44NTI3MSAxNC4wNDg3IDMuOTUxNjVDMTQuMTQ3NiA0LjA1MDU5IDE0LjIwNDMgNC4xODQwNiAxNC4yMDY3IDQuMzIzOTZDMTQuMjA5MiA0LjQ2Mzg2IDE0LjE1NzMgNC41OTkyNSAxNC4wNjE5IDQuNzAxNjJMNC43MDE4OSAxNC4wNjE2QzQuNjAwNzEgMTQuMTYyOSA0LjQ2MzQ2IDE0LjIxOTkgNC4zMjAyOSAxNC4yMloiIGZpbGw9IiM0MzQzNDMiLz4KPC9nPgo8L3N2Zz4K)"
                }
            }), a && d.Ay.createElement("div", {
                className: s.error
            }, d.Ay.createElement("div", {
                className: s.errorText
            }, "Error:"), " ", a.message, " "), !a && d.Ay.createElement("div", null, d.Ay.createElement("p", {
                className: s.fileName
            }, "Filename: ", t), d.Ay.createElement("div", {
                className: s.footer
            }, d.Ay.createElement("div", {
                style: F
            }, d.Ay.createElement("div", {
                className: s.loadingBar
            }, d.Ay.createElement("div", {
                className: s.progressBar,
                style: u
            })), d.Ay.createElement("div", {
                className: s.status
            }, d.Ay.createElement("div", {
                className: s.statusState
            }, d.Ay.createElement("div", null, r), d.Ay.createElement("div", null, o)), d.Ay.createElement("div", {
                className: s.statusPercentage
            }, n, "%")))))));
        };
        var L = r(9989), D = r.n(L);
        const B = e => {
            var t = e.title, r = e.status, n = e.progress, o = e.progressStatus, i = e.onClickCancel, a = e.error, u = e.blob, l = e.showTip, c = e.handleDownload, p = (0, 
            S.A)(D()), A = d.Ay.useMemo((() => ({
                width: n + "%"
            })), [ n ]);
            return d.Ay.createElement("div", {
                className: R()(p.ffDownloader)
            }, d.Ay.createElement("div", {
                className: p.container
            }, d.Ay.createElement("svg", {
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                onClick: i,
                className: p.closeBtn
            }, d.Ay.createElement("g", {
                opacity: "0.4"
            }, d.Ay.createElement("path", {
                d: "M9.11983 9.48007C9.02438 9.47999 8.93288 9.44201 8.86543 9.37447L2.62543 3.13447C2.56184 3.06623 2.52722 2.97597 2.52886 2.8827C2.53051 2.78944 2.56829 2.70045 2.63425 2.63449C2.70021 2.56854 2.78919 2.53075 2.88246 2.52911C2.97572 2.52746 3.06598 2.56208 3.13423 2.62567L9.37423 8.86567C9.42451 8.91602 9.45875 8.98014 9.47261 9.04993C9.48648 9.11972 9.47935 9.19205 9.45213 9.2578C9.42491 9.32354 9.37881 9.37974 9.31967 9.4193C9.26052 9.45886 9.19098 9.48001 9.11983 9.48007Z",
                fill: "#434343"
            }), d.Ay.createElement("path", {
                d: "M2.88019 9.48007C2.80904 9.48001 2.7395 9.45886 2.68035 9.4193C2.62121 9.37974 2.57512 9.32354 2.54789 9.2578C2.52067 9.19205 2.51354 9.11972 2.52741 9.04993C2.54127 8.98014 2.57551 8.91602 2.62579 8.86567L8.86579 2.62567C8.93404 2.56208 9.0243 2.52746 9.11756 2.52911C9.21083 2.53075 9.29981 2.56854 9.36577 2.63449C9.43173 2.70045 9.46951 2.78944 9.47116 2.8827C9.4728 2.97597 9.43818 3.06623 9.37459 3.13447L3.13459 9.37447C3.06714 9.44201 2.97564 9.47999 2.88019 9.48007V9.48007Z",
                fill: "#434343"
            }))), a && d.Ay.createElement("div", {
                className: p.error
            }, d.Ay.createElement("div", {
                className: p.errorText
            }, "Error:"), " ", a.message, " "), !a && d.Ay.createElement("div", null, d.Ay.createElement("p", {
                className: p.fileName
            }, s.A.i18n.getMessage("downloadingBox_fileName"), ": ", t), d.Ay.createElement("div", {
                className: p.footer
            }, d.Ay.createElement("div", null, d.Ay.createElement("div", {
                className: p.loadingBar
            }, d.Ay.createElement("div", {
                className: p.progressBar,
                style: A
            })), d.Ay.createElement("div", {
                className: p.status
            }, d.Ay.createElement("div", {
                className: p.statusState
            }, d.Ay.createElement("div", null, r), d.Ay.createElement("div", null, o)), d.Ay.createElement("div", {
                className: p.statusPercentage
            }, n, "%"))))), l && d.Ay.createElement("div", {
                className: p.tipWindow
            }, d.Ay.createElement("div", {
                className: p.tipText
            }, d.Ay.createElement("p", null, s.A.i18n.getMessage("downloadingBox_description"))), u && d.Ay.createElement("a", {
                href: u,
                download: t,
                onClick: c
            }, d.Ay.createElement("button", {
                className: p.tipWindowButton,
                type: "button"
            }, s.A.i18n.getMessage("downloadingBox_button"))))));
        };
        var Q = r(4689), M = r(2629), H = (0, u.A)("MediaMuxer"), T = "PREPARE", G = "CONVERTING", N = "DOWNLOADED", U = "INFINITE", z = "FINITE";
        const K = d.Ay.memo((e => {
            var t = e.sources, r = e.filename, i = e.format, u = e.unmountLayer, A = e.convertType, h = e.showConfirmOnClose, f = d.Ay.useState(null), g = (0, 
            o.A)(f, 2), I = g[0], C = g[1], m = d.Ay.useState(!1), y = (0, o.A)(m, 2), w = (y[0], 
            y[1]), x = d.Ay.useState(s.A.i18n.getMessage("downloadingBox_status_loading")), R = (0, 
            o.A)(x, 2), k = R[0], O = R[1], S = d.Ay.useState(T), F = (0, o.A)(S, 2), L = F[0], D = F[1], K = d.Ay.useState(0), J = (0, 
            o.A)(K, 2), X = J[0], Y = J[1], P = d.Ay.useState(""), V = (0, o.A)(P, 2), q = V[0], W = V[1], Z = d.Ay.useState(U), _ = (0, 
            o.A)(Z, 2), $ = (_[0], _[1]), ee = d.Ay.useState(null), te = (0, o.A)(ee, 2), re = te[0], ne = te[1], oe = d.Ay.useState(!1), ie = (0, 
            o.A)(oe, 2), ae = ie[0], se = ie[1], ue = d.Ay.useState({}), le = (0, o.A)(ue, 2), ce = le[0], de = le[1], pe = d.Ay.useState({}), Ae = (0, 
            o.A)(pe, 2), he = Ae[0], fe = Ae[1], ge = d.Ay.useRef();
            d.Ay.useEffect((() => {
                function e() {
                    u();
                }
                return p.A.onRemoveEvent(ge.current, e), () => {
                    p.A.offRemoveEvent(ge.current, e);
                };
            }), []), d.Ay.useEffect((() => {
                var e = {
                    run: [],
                    completed: [],
                    error: []
                }, o = (t, r) => e[t].forEach((e => e(r)));
                v({
                    on: (t, r) => {
                        e[t] && e[t].push(r);
                    }
                }, "youtube-merge");
                var d = !0, p = new c.A(ge.current);
                p.onProgress = (e, t) => {
                    d && (Y(Math.trunc(100 * e)), [ z, U ].includes(t) && $(t));
                }, p.onProgressStatus = e => {
                    d && W(e);
                }, p.onStatus = (e, t) => {
                    d && (O(e), [ T, G, N ].includes(t) && D(t));
                }, o("run");
                var h = b(), f = E();
                return p.init().then((() => ((0, Q.A)({
                    category: "download-start",
                    subcategory: (0, M.A)(),
                    event: "video"
                }), "hls" === A ? p.hls(t, r, i) : "hlsToMp3" === A ? p.hlsToMp3(t, r) : p.join(t, r, i)))).then((() => {
                    d && p.getBuiltBlob().then((e => {
                        s.A.callFn("getPreferences").then(function() {
                            var t = (0, n.A)(a().mark((function t(n) {
                                var o, i, l, c, d;
                                return a().wrap((function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                      case 0:
                                        if (!s.A.isFirefox || n.sortDownloads && n.sortDownloads.isEnabled) {
                                            t.next = 3;
                                            break;
                                        }
                                        return p.download(), t.abrupt("return", setTimeout(u, 3e3));

                                      case 3:
                                        if (de(e.blob), fe(n.sortDownloads), o = URL.createObjectURL(e.blob), ne(o), se(!0), 
                                        !n.sortDownloads || !n.sortDownloads.isEnabled) {
                                            t.next = 27;
                                            break;
                                        }
                                        return i = e.filename.slice(e.filename.lastIndexOf(".") + 1), l = n.sortDownloads.groups.find((e => e.formats.some((e => -1 !== e.indexOf(i))))), 
                                        l && l.dir && !s.A.isFirefox && (e.filename = `${l.dir}/${e.filename}`), t.next = 14, 
                                        new Promise((t => {
                                            var r = new FileReader;
                                            r.onload = t, r.readAsDataURL(e.blob);
                                        })).then((e => e.target.result));

                                      case 14:
                                        if (c = t.sent, !s.A.isGM) {
                                            t.next = 19;
                                            break;
                                        }
                                        GM_download(c, e.filename), t.next = 25;
                                        break;

                                      case 19:
                                        if (!s.A.isFirefox) {
                                            t.next = 24;
                                            break;
                                        }
                                        return s.A.sendMessage({
                                            action: "downloadFile",
                                            options: {
                                                filename: r,
                                                url: e.blob,
                                                saveAs: !0
                                            }
                                        }), t.abrupt("return", setTimeout(u, 5e3));

                                      case 24:
                                        s.A.callFn("downloadInFolder", [ {
                                            url: c,
                                            filename: e.filename
                                        } ]);

                                      case 25:
                                        t.next = 31;
                                        break;

                                      case 27:
                                        (d = document.createElement("a")).href = o, d.download = e.filename, setTimeout((() => {
                                            d.dispatchEvent(new MouseEvent("click"));
                                        }), 0);

                                      case 31:
                                      case "end":
                                        return t.stop();
                                    }
                                }), t);
                            })));
                            return function(e) {
                                return t.apply(this, arguments);
                            };
                        }());
                    }));
                })).then((() => {
                    (0, Q.A)({
                        category: "download-complete",
                        subcategory: (0, M.A)(),
                        event: "video"
                    }), o("completed"), d && (w(!0), O(s.A.i18n.getMessage("downloadingBox_status_complete")), 
                    D(N));
                }), (e => {
                    o("error", e), d && (H.error("Join error", e), C(e));
                })).then(...(0, l.A)((() => {
                    h(), f(), d && w(!0);
                }))), () => {
                    d = !1, h(), f();
                };
            }), []);
            var ve = d.Ay.useCallback(function() {
                var e = (0, n.A)(a().mark((function e(t) {
                    var n, o, i, u;
                    return a().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            if (n = r, he && he.isEnabled && (o = n.slice(n.lastIndexOf(".") + 1), i = he.groups.find((e => e.formats.some((e => -1 !== e.indexOf(o))))), 
                            i && i.dir && (n = `${i.dir}/${n}`)), !he || !he.isEnabled) {
                                e.next = 9;
                                break;
                            }
                            return t.preventDefault(), t.stopPropagation(), e.next = 7, new Promise((e => {
                                var t = new FileReader;
                                t.onload = e, t.readAsDataURL(ce);
                            })).then((e => e.target.result));

                          case 7:
                            u = e.sent, s.A.isGM ? GM_download(u, n) : s.A.callFn("downloadInFolder", [ {
                                url: u,
                                filename: n
                            } ]);

                          case 9:
                          case "end":
                            return e.stop();
                        }
                    }), e);
                })));
                return function(t) {
                    return e.apply(this, arguments);
                };
            }(), [ ce, he ]), Ie = d.Ay.useCallback((() => {
                (L === N || !h || confirm(s.A.i18n.getMessage("are_you_sure_interrupt_download"))) && u();
            }), [ L ]), Ce = d.Ay.useCallback((() => se(!ae)), [ se, ae ]);
            return s.A.isFirefox ? d.Ay.createElement("div", {
                ref: ge
            }, d.Ay.createElement(j, {
                title: r,
                format: i,
                status: k,
                progress: X,
                progressStatus: q,
                onClickCancel: Ie,
                error: I
            })) : d.Ay.createElement("div", {
                ref: ge
            }, d.Ay.createElement(B, {
                title: r,
                format: i,
                status: k,
                progress: X,
                progressStatus: q,
                onClickCancel: Ie,
                error: I,
                blob: re,
                onClickShowTip: Ce,
                showTip: ae,
                handleDownload: ve
            }));
        }));
    },
    450: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(319|550|7|947)$/.test(r.j) ? null : function(e) {
            return e() || (() => {});
        };
    },
    3769: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => a
        });
        var n = r(45), o = r(9242);
        Error;
        var i = [ "responseStatus", "responseOk", "responseType", "requestPrefix" ];
        const a = (e, t) => {
            var r, a = t || {}, s = (a.responseStatus, a.responseOk, a.responseType), u = void 0 === s ? "text" : s, l = a.requestPrefix, c = void 0 === l ? "" : l, d = (0, 
            n.A)(a, i), p = null, A = () => p && p(), h = (r = c, o.A.callFn("createRequest", [ r ]));
            h.then((e => {
                p = () => o.A.callFn("clearRequest", [ e ]);
            }));
            var f = h.then((t => o.A.callFn("sendRequest", [ {
                id: t,
                url: e,
                fetchOptions: d
            } ]))).then((e => {
                for (var t = e.id, r = e.numChunks, n = e.response, i = [], a = 0; a < r; a += 1) i.push(o.A.callFn("readRequestBodyChunk", [ {
                    id: t,
                    chunkIndex: a
                } ]));
                return Promise.all(i).then((e => function(e, t) {
                    var r = e.join("");
                    if ("json" === t) return JSON.parse(r);
                    if ("arrayBuffer" === t) {
                        for (var n = r.length, o = new Uint8Array(n), i = 0; i < n; i += 1) o[i] = r.charCodeAt(i);
                        return "blob" === t ? new Blob([ o ]) : o.buffer;
                    }
                    return r;
                }(e, u))).then((e => ({
                    response: n,
                    body: e
                })));
            })).then((e => (A(), e))).catch((e => {
                throw A(), e;
            }));
            return f.abort = () => A(), f;
        };
    },
    5542: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => x
        });
        var n = r(4467), o = r(9242), i = r(2111), a = r(8233), s = r(334), u = r(2875), l = (0, 
        a.A)("mediaMuxer:transport"), c = () => {}, d = new WeakMap;
        const p = class {
            constructor(e, t) {
                var r = this;
                this.listener = (e, t, r) => {
                    if ("callFn" === e.action) return this.responseFn(e, r), !0;
                }, this.callFn = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                    return r.waitPromise({
                        action: "callFn",
                        fn: e,
                        args: t
                    });
                }, this.scope = t, this.pageId = parseInt(1e3 * Math.random(), 10), this.callbackId = 0, 
                this.callbackIdCallback = {}, this.listeners = [], this.transport = e, this.onMessage(this.listener);
            }
            onMessage(e) {
                var t = this.listeners, r = this.callbackIdCallback;
                !t.length && this.transport.onMessage(((e, n) => {
                    if (n.responseId) {
                        var o = r[n.responseId];
                        o ? o(n.message) : l.error("Callback is not found", n);
                    } else {
                        var i;
                        i = n.callbackId ? function(e) {
                            var t = !1;
                            return function() {
                                t || (t = !0, e.apply(null, arguments));
                            };
                        }((e => {
                            this.transport.sendMessage({
                                responseId: n.callbackId,
                                message: e
                            });
                        })) : c;
                        var a = null;
                        t.forEach((t => {
                            try {
                                var r = t(n.message, {
                                    event: e
                                }, i);
                                !0 === r && (a = r);
                            } catch (e) {
                                l.error("Call listener error", e);
                            }
                        })), !0 !== a && i();
                    }
                })), t.push(e);
            }
            sendMessage(e, t) {
                var r = this.callbackIdCallback, n = {
                    message: e
                };
                if (t) {
                    n.callbackId = this.pageId + ++this.callbackId;
                    var o = e => {
                        delete r[n.callbackId], t(e);
                    };
                    d.has(t) && (d.delete(t), d.set(o, !0)), r[n.callbackId] = o;
                }
                try {
                    this.transport.sendMessage(n);
                } catch (e) {
                    throw delete r[n.callbackId], e;
                }
            }
            waitPromise(e) {
                return new Promise(((t, r) => {
                    var n = e => e.err ? r(u(e.err)) : t(e.result);
                    d.set(n, !0), this.sendMessage(e, n);
                }));
            }
            responsePromise(e, t) {
                return e.then((e => {
                    t({
                        result: e
                    });
                }), (e => {
                    t({
                        err: s(e)
                    });
                })).catch((function(e) {
                    console.error("responsePromise error", e);
                })), !0;
            }
            resolvePath(e) {
                for (var t = e.split("."), r = t.pop(), n = this.scope; t.length; ) n = n[t.shift()];
                return {
                    scope: n,
                    endPoint: r
                };
            }
            responseFn(e, t) {
                var r = (0, i.A)((() => {
                    var t = this.resolvePath(e.fn), r = t.scope;
                    return r[t.endPoint].apply(r, e.args);
                }));
                return this.responsePromise(r, t);
            }
        };
        var A = r(3769), h = r(6918), f = r(3561), g = new Map, v = 0, I = e => {
            g.delete(e);
        };
        function C(e) {
            var t = g.get(e);
            if (!t) throw new h.A("Instance is not found", "INSTANCE_IS_NOT_FOUND");
            return t;
        }
        var m = r(450), E = r(6738), y = r(1633);
        function w(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function b(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? w(Object(r), !0).forEach((function(t) {
                    (0, n.A)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : w(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        const x = class {
            constructor(e) {
                this.frameListener = e => {
                    if (this.frame && e.source === this.frame.contentWindow) {
                        var t = e.data;
                        t && this.onMessage(e, t);
                    }
                }, this.frameCtr = e, this.frame = null, this.isLoaded = !1, this.destroyed = !1, 
                this.messageStack = [], this.onDestroy = [], this.requestPrefix = (0, y.A)(), this.initTransport(), 
                this.onDestroy.push((0, m.A)((() => {
                    var e = () => o.A.callFn("clearRequestByPrefix", [ this.requestPrefix ]);
                    return window.addEventListener("unload", e), () => {
                        window.removeEventListener("unload", e);
                    };
                })));
            }
            onProgress(e, t) {}
            onProgressStatus(e) {}
            onStatus(e, t) {}
            download() {
                return this.transport.callFn("download");
            }
            getBuiltBlob() {
                return this.transport.callFn("getBuiltBlob");
            }
            join(e, t, r) {
                return this.transport.callFn("join", [ {
                    sources: e,
                    filename: t,
                    format: r
                } ]);
            }
            hls(e, t, r) {
                return this.transport.callFn("hls", [ {
                    sources: e,
                    filename: t,
                    format: r
                } ]);
            }
            hlsToMp3(e, t) {
                return this.transport.callFn("hlsToMp3", [ {
                    sources: e,
                    filename: t
                } ]);
            }
            initTransport() {
                var e = this;
                this.transport = new p({
                    onMessage(t) {
                        e.onMessage = t;
                    },
                    sendMessage(t) {
                        e.postMessage(t);
                    }
                }, this.getScope()), this.transport.onMessage(((e, t, r) => {
                    switch (e.action) {
                      case "progress":
                        this.onProgress(e.progress, e.type);
                        break;

                      case "progressStatus":
                        this.onProgressStatus(e.status);
                        break;

                      case "status":
                        this.onStatus(e.status, e.code);
                    }
                }));
            }
            getScope() {
                return {
                    createFetchInstance: e => {
                        var t = e.url, r = e.options, n = function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                            v > 1e5 && (v = 0);
                            for (var r, n = 0; 0 === n || g.has(n); ) n = ++v;
                            var o = new Promise((e => {
                                r = e;
                            }));
                            return g.set(n, {
                                initFn: e,
                                onInit: r,
                                whenInit: o
                            }), {
                                id: n,
                                methods: t
                            };
                        }((() => {
                            o();
                            var e = (0, A.A)(t, b(b({}, r), {}, {
                                requestPrefix: this.requestPrefix
                            }));
                            return e.then(...(0, f.A)((0, m.A)((() => {
                                function t() {
                                    e.abort();
                                }
                                return this.onDestroy.push(t), () => (0, E.A)(this.onDestroy, t);
                            })))), e;
                        }), [ "abort" ]), o = (0, m.A)((() => {
                            function e() {
                                I(n.id);
                            }
                            return this.onDestroy.push(e), () => (0, E.A)(this.onDestroy, e);
                        }));
                        return n;
                    },
                    instanceInit: e => (e => {
                        var t = C(e), r = null;
                        try {
                            t.init = t.initFn(), t.onInit();
                        } catch (e) {
                            r = e, t.onInit(Promise.reject(new h.A("call initFn error", "CALL_INIT_FN_ERROR")));
                        }
                        if (t.initFn = t.onInit = void 0, (0, i.A)((() => t.init)).then(...(0, f.A)((() => {
                            I(e);
                        }))), r) throw r;
                        return t.init;
                    })(e.id),
                    instanceCallFn: e => function(e, t) {
                        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], n = C(e);
                        return n.whenInit.then((() => {
                            var e = function(e, t) {
                                for (var r = t.split("."), n = r.pop(), o = e; r.length; ) o = o[r.shift()];
                                return {
                                    scope: o,
                                    endPoint: n
                                };
                            }(n.init, t), o = e.scope;
                            return o[e.endPoint].apply(o, r);
                        }));
                    }(e.id, e.path, e.args)
                };
            }
            onMessage() {
                throw new Error("onMessage is not set");
            }
            init() {
                return new Promise(((e, t) => {
                    this.destroyFrame(), window.addEventListener("message", this.frameListener);
                    var r = this.frame = document.createElement("iframe");
                    r.src = "https://sf-helper.com/static/joiner2/frame2.html", r.style.position = "absolute", 
                    r.style.height = "0px", r.style.width = "0px", r.style.top = "-9999px", r.style.left = "-9999px", 
                    r.onload = () => {
                        r.onload = r.onerror = null, this.isLoaded = !0;
                        var n = setTimeout((() => {
                            t(new Error("Load frame timeout"));
                        }), 3e4);
                        try {
                            this.transport.sendMessage({
                                action: "ping"
                            }, (() => {
                                clearTimeout(n), e();
                            }));
                        } catch (e) {
                            t(e);
                        }
                    }, r.onerror = () => {
                        r.onload = r.onerror = null, t(new Error("Load frame error"));
                    }, this.frameCtr.appendChild(r);
                })).then((() => {
                    for (;this.messageStack.length; ) this.postMessage(this.messageStack.shift());
                }));
            }
            postMessage(e) {
                if (!this.destroyed) if (this.isLoaded) {
                    if (!this.frame.contentWindow) throw new Error("Window is closed");
                    this.frame.contentWindow.postMessage(e, "*");
                } else this.messageStack.push(e);
            }
            destroyFrame() {
                window.removeEventListener("message", this.frameListener), this.frame && this.frame.parentNode && this.frame.parentNode.removeChild(this.frame);
            }
            destroy() {
                this.destroyed = !0, this.destroyFrame(), this.onDestroy.splice(0).forEach((e => e()));
            }
        };
    },
    6770: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => a
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(7725);
        class o {
            init() {
                var e = document.createElement("canvas"), t = document.createElement("video");
                (t.setAttribute("title", "Prevent Sleep"), t.setAttribute("playsinline", ""), this._supported = "function" == typeof e.captureStream, 
                this._supported) && (e.getContext("2d").fillRect(0, 0, 1, 1), t.srcObject = e.captureStream(0), 
                this.video = t, this._inited = !0);
            }
            start() {
                if (this._inited || this.init(), this._supported && this.video.paused) return this.video.play();
            }
            stop() {
                if (this._inited && this._supported && !this.video.paused) return this.video.pause();
            }
        }
        class i {
            start() {
                if (!this._wakeLock) return navigator.wakeLock.request("screen").then((e => (this._wakeLock = e, 
                !0)));
            }
            stop() {
                if (this._wakeLock) return this._wakeLock.release().then((() => (this._wakeLock = null, 
                !0)));
            }
        }
        const a = /^(319|550|7|947)$/.test(r.j) ? null : class {
            constructor() {
                var e = window.navigator && "wakeLock" in navigator ? i : o;
                this.parent = new e, this.chain = (0, n.A)(1);
            }
            start() {
                return this.chain((() => this.parent.start()));
            }
            stop() {
                return this.chain((() => this.parent.stop()));
            }
        };
    },
    6738: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(319|550|7|947)$/.test(r.j) ? null : function(e, t) {
            var r = e.indexOf(t);
            -1 !== r && e.splice(r, 1);
        };
    },
    9763: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(9(12|41|71|94)|252|270|3|302|657|83)$/.test(r.j) ? function(e, t) {
            var r = (new DOMParser).parseFromString("<html><body>" + e + "</body></html>", "text/html");
            if (t) {
                var n = r.head.querySelector("base");
                n || ((n = r.createElement("base")).href = t, r.head.appendChild(n));
            }
            return r;
        } : null;
    },
    372: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = r(4733);
        const o = /^(319|550|7|947)$/.test(r.j) ? null : function e(t, r) {
            if (r = r || {}, "string" == typeof t) {
                if ("[" !== t[0]) return document.createTextNode(t);
                try {
                    t = t.replace(/"/g, "\\u0022").replace(/\\'/g, "\\u0027").replace(/'/g, '"').replace(/([{,])\s*([a-zA-Z0-9]+):/g, '$1"$2":'), 
                    t = JSON.parse(t);
                } catch (e) {
                    return document.createTextNode(t);
                }
            }
            if (!Array.isArray(t)) return document.createTextNode(t);
            for (var o = r.fragment || document.createDocumentFragment(), i = 0, a = t.length; i < a; i++) {
                var s = t[i];
                if ("object" == typeof s) for (var u in s) {
                    var l = s[u], c = l.append;
                    delete l.append;
                    var d;
                    o.appendChild(d = n.A.create(u, l)), void 0 !== c && e(c, {
                        fragment: d
                    });
                } else o.appendChild(document.createTextNode(s));
            }
            return o;
        };
    },
    717: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(5(50|55|92)|(|16|94)7|319|469|714)$/.test(r.j) ? null : function(e, t) {
            var r = null;
            r = !(t = t || {}).params && /\?/.test(e) ? e.match(/[^?]*\?(.*)/)[1] : e;
            for (var n = t.sep || "&", o = r.split(n), i = {}, a = 0, s = o.length; a < s; a++) {
                var u = o[a].split("="), l = u[0], c = u[1] || "";
                if (t.noDecode) i[l] = c; else {
                    try {
                        l = decodeURIComponent(l);
                    } catch (e) {
                        l = unescape(l);
                    }
                    try {
                        i[l] = decodeURIComponent(c);
                    } catch (e) {
                        i[l] = unescape(c);
                    }
                }
            }
            return i;
        };
    },
    9008: (e, t, r) => {
        "use strict";
        function n(e) {
            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
            for (var o = [], i = function(t) {
                !o.find((n => r.every((r => n[r] === e[t][r])))) && o.push(e[t]);
            }, a = 0; a < e.length; a++) i(a);
            return o;
        }
        r.d(t, {
            W: () => n
        });
    },
    9191: (e, t, r) => {
        "use strict";
        function n(e, t) {
            for (var r, n = []; null !== (r = t.exec(e)); ) r.index === t.lastIndex && t.lastIndex++, 
            n.push(r);
            return n;
        }
        r.d(t, {
            H: () => n
        });
    },
    3561: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(2111);
        const o = /^(319|550|7|947)$/.test(r.j) ? null : e => [ t => (0, n.A)(e).then((() => t)), t => (0, 
        n.A)(e).then((() => {
            throw t;
        })) ];
    },
    7725: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(7065);
        const o = /^(319|550|7|947)$/.test(r.j) ? null : (e, t) => {
            var r = new n.A(e, t);
            return e => r.add(e);
        };
    },
    7065: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => i
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(3453);
        if (!/^(319|550|7|947)$/.test(r.j)) var o = r(2111);
        const i = /^(319|550|7|947)$/.test(r.j) ? null : class {
            constructor(e, t) {
                this.finishQueue = () => {
                    if (this.activeCount--, this.queue.length > 0) {
                        var e = this.queue.shift(), t = (0, n.A)(e, 2), r = t[0], o = t[1];
                        this.runQueue(r, o);
                    }
                }, this.limit = e, this.maxQueue = t, this.queue = [], this.activeCount = 0;
            }
            add(e) {
                var t = null, r = new Promise((e => {
                    t = e;
                }));
                if (this.activeCount < this.limit) this.runQueue(e, t); else {
                    var n = [ e, t ], o = this.queue.push(n);
                    this.maxQueue && o > this.maxQueue && this.queue.splice(0, o - this.maxQueue);
                }
                return r;
            }
            runQueue(e, t) {
                this.activeCount++;
                var r = (0, o.A)(e);
                t(r), r.then(this.finishQueue, this.finishQueue);
            }
        };
    },
    8357: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(550|7|947)$/.test(r.j) ? null : e => new Promise((t => setTimeout(t, e)));
    },
    2111: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(319|550|7|947)$/.test(r.j) ? null : e => new Promise((t => t(e())));
    },
    9437: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => y
        });
        var n, o, i, a, s, u, l, c, d, p, A, h, f, g, v, I = (0, r(8233).A)("webRequest");
        const C = (n = /^sf-\d+_/, o = {
            urls: [ "<all_urls>" ],
            types: [ "xmlhttprequest" ]
        }, i = !1, a = {}, s = {}, u = function(e) {
            for (var t in e) return !1;
            return !0;
        }, l = function(e) {
            delete s[e.requestId], u(a) && u(s) && p();
        }, c = function(e) {
            var t = s[e.requestId], r = e.requestHeaders || [], o = [], i = [], l = [];
            if (t) i = t.changes, o = t.filtered; else if (!u(a)) for (var c, d, p, A = 0; p = r[A]; A++) c = p.name, 
            n.test(c) && (d = a[c]) && (p.name = d.name, p.value = d.value, i.push(p), o.push(d.name.toLowerCase()), 
            o.push(c.toLowerCase()), /cookie/i.test(p.name) && l.push("set-cookie"), clearTimeout(d.timer), 
            delete a[c]);
            if (i.length) {
                t || (s[e.requestId] = {
                    changes: i,
                    filtered: o,
                    filterResponseHeaders: l
                });
                var h = r.filter((function(e) {
                    return -1 === o.indexOf(e.name.toLowerCase());
                })).concat(i);
                return {
                    requestHeaders: h
                };
            }
        }, d = function(e) {
            var t = s[e.requestId], r = e.responseHeaders;
            if (t && r) {
                var n = t.filterResponseHeaders;
                return {
                    responseHeaders: r.filter((function(e) {
                        return -1 === n.indexOf(e.name.toLowerCase());
                    }))
                };
            }
        }, p = function() {
            i && (i = !1, chrome.webRequest.onBeforeSendHeaders.removeListener(c, o, [ "blocking", "requestHeaders" ]), 
            chrome.webRequest.onHeadersReceived.removeListener(d, o, [ "blocking", "responseHeaders" ]), 
            chrome.webRequest.onResponseStarted.removeListener(l, o), chrome.webRequest.onErrorOccurred.removeListener(l, o), 
            I.debug("webRequest", "rm listener"));
        }, A = 10, h = !1, f = null, g = function(e) {
            return (null === f || e) && (f = !!(chrome.webRequest && chrome.webRequest.onBeforeSendHeaders && chrome.webRequest.onResponseStarted && chrome.webRequest.onErrorOccurred)), 
            f;
        }, v = /^user-agent$|^origin$|^cookie$/i, {
            wrapHeaderKey: function(e, t) {
                if (g()) {
                    for (var r, n = 100; n-- > 0 && (r = "sf-" + parseInt(1e5 * Math.random()) + "_" + e, 
                    a[r]); ) ;
                    return a[r] = {
                        name: e,
                        value: t,
                        timer: setTimeout((function() {
                            delete a[r];
                        }), 3e3)
                    }, i || (i = !0, chrome.webRequest.onBeforeSendHeaders.addListener(c, o, [ "blocking", "requestHeaders" ]), 
                    chrome.webRequest.onHeadersReceived.addListener(d, o, [ "blocking", "responseHeaders" ]), 
                    chrome.webRequest.onResponseStarted.addListener(l, o), chrome.webRequest.onErrorOccurred.addListener(l, o), 
                    I.debug("webRequest", "add listener")), r;
                }
                return e;
            },
            isSpecialHeader: function(e) {
                return v.test(e);
            },
            requestPermission: function(e) {
                g() || h ? e(f) : chrome.permissions && chrome.permissions.request ? chrome.permissions.request({
                    permissions: [ "webRequest", "webRequestBlocking" ]
                }, (function(t) {
                    (t || A-- <= 0) && (h = !0), t && g(!0), e(f);
                })) : (h = !0, e(f));
            }
        });
        var m = r(2894), E = function(e) {
            e = e.split(/\r?\n/);
            var t = {};
            return e.forEach((function(e) {
                var r = e.indexOf(":");
                if (-1 !== r) {
                    var n = e.substr(0, r).trim().toLowerCase(), o = e.substr(r + 1).trim();
                    t[n] = o;
                }
            })), t;
        };
        const y = function(e, t) {
            var r = {}, n = function(e, r) {
                n = null, l.timeoutTimer && clearTimeout(l.timeoutTimer);
                var i = null;
                e && (i = String(e.message || e) || "ERROR"), t && t(i, o(r), r);
            }, o = function(e) {
                var t = {};
                t.statusCode = d.status, t.statusText = d.statusText;
                var r = null, n = d.getAllResponseHeaders();
                return "string" == typeof n && (r = E(n)), t.headers = r || {}, t.body = e, t.responseURL = d.responseURL, 
                t;
            };
            "object" != typeof e && (e = {
                url: e
            });
            var i = e.url, a = e.method || e.type || "GET";
            a = a.toUpperCase();
            var s = e.data;
            if ("string" != typeof s && (s = m.stringify(s)), s && "GET" === a && (i += (/\?/.test(i) ? "&" : "?") + s, 
            s = void 0), !1 === e.cache && -1 !== [ "GET", "HEAD" ].indexOf(a) && (i += (/\?/.test(i) ? "&" : "?") + "_=" + Date.now()), 
            !/^https?:\/\//.test(i)) {
                var u = document.createElement("a");
                u.href = i, i = u.href, u = null;
            }
            e.headers = e.headers || {}, s && (e.headers["Content-Type"] = e.contentType || e.headers["Content-Type"] || "application/x-www-form-urlencoded; charset=UTF-8");
            var l = {};
            l.url = i, l.method = a, s && (l.data = s), e.json && (l.json = !0), e.xml && (l.xml = !0), 
            e.timeout && (l.timeout = e.timeout), e.mimeType && (l.mimeType = e.mimeType), e.withCredentials && (l.withCredentials = !0), 
            Object.keys(e.headers).length && (l.headers = e.headers), l.timeout > 0 && (l.timeoutTimer = setTimeout((function() {
                n && n(new Error("ETIMEDOUT")), d.abort();
            }), l.timeout));
            var c = {
                0: 200,
                1223: 204
            }, d = (e.localXHR, new XMLHttpRequest);
            d.open(l.method, l.url, !0), l.mimeType && d.overrideMimeType(l.mimeType), l.withCredentials && (d.withCredentials = !0);
            var p = [];
            for (var A in l.headers) C && C.isSpecialHeader(A) && p.push({
                key: A,
                value: l.headers[A]
            }), d.setRequestHeader(A, l.headers[A]);
            d.onload = function() {
                var e = c[d.status] || d.status;
                try {
                    if (e >= 200 && e < 300 || 304 === e) {
                        var t = d.responseText;
                        if (l.json) t = JSON.parse(t); else if (l.xml) t = (new DOMParser).parseFromString(t, "text/xml"); else if ("string" != typeof t) throw console.error("Response is not string!", t), 
                        new Error("Response is not string!");
                        return n && n(null, t);
                    }
                    throw new Error(d.status + " " + d.statusText);
                } catch (e) {
                    return n && n(e);
                }
            };
            var h = d.onerror = function() {
                n && n(new Error(d.status + " " + d.statusText));
            }, f = null;
            void 0 !== d.onabort ? d.onabort = h : f = function() {
                4 === d.readyState && n && setTimeout((function() {
                    return h();
                }));
            }, f && (d.onreadystatechange = f);
            var g = function() {
                try {
                    d.send(l.data || null);
                } catch (e) {
                    setTimeout((function() {
                        n && n(e);
                    }));
                }
            };
            if (C && p.length) {
                C.requestPermission((function(e) {
                    e && function() {
                        for (var e, t = 0; e = p[t]; t++) d.setRequestHeader(C.wrapHeaderKey(e.key, e.value), e.value);
                    }(), n && g();
                }));
            } else g();
            return r.abort = function() {
                n = null, d.abort();
            }, r;
        };
    },
    5751: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = r(9437);
        const o = /^((31|46|88)9|550|592|7|714|947)$/.test(r.j) ? null : e => new Promise(((t, r) => {
            (0, n.A)(e, ((e, n) => {
                e ? r(e) : t(n);
            }));
        }));
    },
    4895: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = r(9242);
        const o = /^(319|550|7|947)$/.test(r.j) ? null : function(e) {
            return new Promise((function(t) {
                n.A.sendMessage(e, t);
            }));
        };
    },
    453: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            D: () => p,
            w: () => A
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(4467);
        var o = r(4733), i = r(8244);
        if (!/^(319|550|7|947)$/.test(r.j)) var a = r(5563);
        if (!/^(319|550|7|947)$/.test(r.j)) var s = r(2629);
        if (!/^(319|550|7|947)$/.test(r.j)) var u = r(8703);
        function l(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function c(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? l(Object(r), !0).forEach((function(t) {
                    (0, n.A)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : l(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        class d {
            constructor(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                this.target = e, this.options = Object.assign({
                    content: "",
                    defaultWidth: 0,
                    defaultHeight: 0
                }, t), this.handleMouseleave = this.handleMouseleave.bind(this), this.isVisible = !1, 
                this.timeout = null;
            }
            handleMouseleave() {
                this.hide();
            }
            show(e) {
                if (this.isVisible) this.startHideTimeout(); else {
                    this.node || (this.node = this.createTooltip(e)), this.isVisible = !0;
                    var t = document.body;
                    t && (this.node.classList.add("hidden"), t.appendChild(this.node), this.setPos(), 
                    this.node.classList.remove("hidden")), this.target.addEventListener("mouseleave", this.handleMouseleave), 
                    this.startHideTimeout();
                }
            }
            hide() {
                this.isVisible && (this.isVisible = !1, this.stopHideTimeout(), this.node.classList.add("hidden"), 
                this.target.removeEventListener("mouseleave", this.handleMouseleave), setTimeout((() => {
                    if (!this.isVisible && this.node) {
                        var e = this.node.parentNode;
                        e && e.removeChild(this.node), this.node = null;
                    }
                }), 250));
            }
            startHideTimeout() {
                this.stopHideTimeout(), this.timeout = setTimeout((() => {
                    this.hide();
                }), 3e3);
            }
            stopHideTimeout() {
                clearTimeout(this.timeout);
            }
            createTooltip(e) {
                return o.A.create("div", {
                    class: [ "sf-paper-tooltip-ctr" ],
                    append: [ o.A.create("div", {
                        class: "sf-paper-tooltip",
                        style: c({
                            display: "flex",
                            align: "center"
                        }, "in" == (0, s.A)() ? {
                            flexDirection: "row"
                        } : ""),
                        append: [ o.A.create("span", {
                            style: c({
                                paddingTop: "6px"
                            }, "in" == (0, s.A)() ? {
                                width: "30px",
                                height: "20px"
                            } : ""),
                            text: "Hold"
                        }), o.A.create("div", {
                            style: {
                                margin: "4px 4px 0 4px",
                                width: "27px",
                                height: "18px",
                                backgroundColor: "black",
                                borderRadius: "5px",
                                border: "1px solid black",
                                borderBottom: "3px solid black"
                            },
                            append: [ o.A.create("div", {
                                style: {
                                    fontWeight: "bold",
                                    fontSize: "8px",
                                    textAlign: "center",
                                    zIndex: 1,
                                    position: "relative",
                                    width: "27px",
                                    height: "18px",
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: "5px"
                                },
                                append: [ o.A.create("span", {
                                    style: c({
                                        display: "inline-block"
                                    }, "in" != (0, s.A)() ? {
                                        marginTop: "5px"
                                    } : ""),
                                    text: "option"
                                }) ]
                            }) ]
                        }), o.A.create("span", {
                            style: c({
                                paddingTop: "6px"
                            }, "in" == (0, s.A)() ? {
                                width: "60px"
                            } : ""),
                            text: "and click"
                        }) ]
                    }), o.A.create("style", {
                        text: (0, a.A)({
                            ".sf-paper-tooltip-ctr": {
                                display: "block",
                                outline: "none",
                                userSelect: "none",
                                cursor: "default",
                                position: "absolute",
                                zIndex: 1e4,
                                transition: "opacity 0.25s",
                                width: "180px"
                            },
                            ".sf-paper-tooltip-ctr.hidden": {
                                opacity: 0
                            },
                            ".sf-paper-tooltip": {
                                display: "block",
                                outline: "none",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                fontWeight: "bold",
                                backgroundColor: "#4D4D4D",
                                borderRadius: "8px",
                                color: "white",
                                padding: "8px",
                                margin: "8px",
                                marginBottom: "0"
                            }
                        })
                    }), "photo" !== (0, u.A)(e) && "story" != (0, u.A)(e) ? o.A.create("div", {
                        style: {
                            position: "relative",
                            left: "15px",
                            width: "0",
                            height: "0",
                            borderColor: "#4D4D4D transparent transparent transparent",
                            borderStyle: "solid",
                            borderWidth: "8px 8px 0 8px"
                        }
                    }) : "" ]
                });
            }
            setPos() {
                var e = window, t = e.pageXOffset, r = e.pageYOffset, n = e.innerWidth, o = e.innerHeight, i = o + r, a = n + t, u = this.node.getBoundingClientRect();
                u.width || u.height || (u.width = this.options.defaultWidth, u.height = this.options.defaultHeight);
                var l = this.target.getBoundingClientRect(), c = {}, d = [ "top", "bottom", "left", "right" ].map((e => {
                    var s = null, d = null, p = 0;
                    if (-1 !== [ "left", "right" ].indexOf(e)) {
                        var A = (l.height - u.height) / 2;
                        if (s = Math.round(l.top + r + A), u.height < o) {
                            var h = s + u.height;
                            h > i && (s -= h - i, p = 1), s < 0 && (s = 0, p = 1);
                        }
                    } else "top" === e ? s = Math.round(l.top + r) - u.height : "bottom" === e && (s = Math.round(l.top + r) + l.height);
                    if (-1 !== [ "top", "bottom" ].indexOf(e)) {
                        var f = (l.width - u.width) / 2;
                        if (d = Math.round(l.left + t + f), u.width < n) {
                            var g = d + u.width;
                            g > a && (d -= g - a, p = 1), d < 0 && (d = 0, p = 1);
                        }
                    } else "left" === e ? d = Math.round(l.left + t - u.width) : "right" === e && (d = Math.round(l.left + t + l.width));
                    var v = d + u.width, I = s + u.height, C = u.width, m = u.height, E = C;
                    s < 0 && (m -= -1 * s), I > i && (m -= I - i), d < 0 && (E -= -1 * d), v > a && (E -= v - a);
                    var y = 100 / (u.width * u.height) * (E * m) - p;
                    return c[e] = {
                        top: s,
                        left: d,
                        quality: y
                    };
                }));
                d.sort(((e, t) => {
                    var r = e.quality, n = t.quality;
                    return r === n ? 0 : r > n ? -1 : 1;
                }));
                var p = d[0], A = 65;
                "101" == (0, s.A)() && window.innerWidth >= 1293 && window.innerHeight >= 768 && (A = 35), 
                this.node.style.top = p.top + "px", this.node.style.left = p.left + A + "px";
            }
        }
        var p = (e, t, r) => {
            if (!(e.dataset.sfTitleTooltip > 0)) {
                e.dataset.sfTitleTooltip = 1;
                var n = new d(e, t);
                e.addEventListener("show_tooltip", (() => {
                    n.show(r);
                })), e.addEventListener("hide_tooltip", (() => {
                    n.hide();
                }));
            }
            i.A.trigger(e, "show_tooltip");
        }, A = e => {
            e.dataset.sfTitleTooltip > 0 && i.A.trigger(e, "hide_tooltip");
        };
    },
    3342: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = r(9242);
        const o = /^(550|7|947)$/.test(r.j) ? null : e => new Promise((t => n.A.storage.get(e, t)));
    },
    5563: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = (e, t) => {
            var r = [];
            Array.isArray(e) || (e = [ e ]), t && !Array.isArray(t) && (t = [ t ]);
            var o = function(e, t) {
                var r = [];
                for (var n in t) {
                    var o = t[n];
                    "cssFloat" === n && (n = "float");
                    var i = n.replace(/([A-Z])/g, (function(e, t) {
                        return "-" + t.toLowerCase();
                    }));
                    r.push(i + ":" + o);
                }
                return r.length ? [ e.join(","), "{", r.join(";"), "}" ].join("") : "";
            }, i = function(e, r) {
                if (Array.isArray(r) || (r = [ r ]), t) {
                    var n = [], o = e.join || "" === e.join ? e.join : " ";
                    t.forEach((function(e) {
                        r.forEach((function(t) {
                            n.push(e + o + t);
                        }));
                    })), r = n;
                }
                return r;
            };
            return e.forEach((function(e) {
                var a = null, s = e.media, u = e.selector, l = e.style, c = e.append;
                if (s && c) r.push([ s, "{", n(c, t), "}" ].join("")); else if (u || l) a = i(e, u), 
                r.push(o(a, l)), c && r.push(n(c, a)); else for (var d in e) -1 === [ "append", "join" ].indexOf(d) && (u = d, 
                (c = (l = e[d]).append) && delete l.append, a = i(e, u), r.push(o(a, l)), c && r.push(n(c, a)));
            })), r.join("");
        };
        const o = /^(319|550|7|947)$/.test(r.j) ? null : n;
    },
    4429: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = new class {
            constructor() {
                this.icons = {
                    funnelLogo: '\n                <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <mask id="mask0_320_31" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="5" y="5" width="63" height="63">\n                    <circle cx="36.5136" cy="36.5135" r="30.6115" fill="black"/>\n                    </mask>\n                    <g mask="url(#mask0_320_31)">\n                    <circle cx="36.5136" cy="36.5135" r="30.6115" fill="white"/>\n                    <path d="M67.1386 36.5271C67.1386 53.4334 54.5336 5.91553 36.527 27.5237C18.5203 49.1318 3.21427 35.6267 9.0478 23.022C14.0376 12.8883 24.4681 5.91553 36.527 5.91553C53.4333 5.91553 67.1386 19.6208 67.1386 36.5271Z" fill="url(#paint0_linear_320_31)"/>\n                    <path d="M16.6147 13.4278C30.487 3.76443 -1.29856 41.2679 26.7242 43.6921C54.747 46.1164 52.4142 66.395 38.7371 68.8131C27.5699 70.511 15.8865 65.9379 8.9938 56.0431C-0.669615 42.1707 2.74237 23.0913 16.6147 13.4278Z" fill="url(#paint1_linear_320_31)"/>\n                    <path d="M9.69561 51.6344C0.627819 35.9285 37.0305 73.7699 41.035 44.6927C45.0396 15.6155 65.5386 20.5086 67.2472 35.1352C68.3611 47.0442 63.068 58.7371 52.6247 64.7666C37.9834 73.2197 18.7634 67.3402 9.69561 51.6344Z" fill="url(#paint2_linear_320_31)"/>\n                    </g>\n                    <defs>\n                    <linearGradient id="paint0_linear_320_31" x1="17.62" y1="35.6267" x2="59.0356" y2="3.21451" gradientUnits="userSpaceOnUse">\n                    <stop stop-color="#FD86FF"/>\n                    <stop offset="1" stop-color="#9747FF" stop-opacity="0"/>\n                    <stop offset="1" stop-color="#FFA9DC" stop-opacity="0"/>\n                    </linearGradient>\n                    <linearGradient id="paint1_linear_320_31" x1="44.1801" y1="54.5745" x2="-6.08812" y2="39.1177" gradientUnits="userSpaceOnUse">\n                    <stop stop-color="#86A8FF"/>\n                    <stop offset="1" stop-color="#9747FF" stop-opacity="0"/>\n                    <stop offset="1" stop-color="#A9B6FF" stop-opacity="0"/>\n                    </linearGradient>\n                    <linearGradient id="paint2_linear_320_31" x1="53.0629" y1="27.7115" x2="31.2167" y2="77.0405" gradientUnits="userSpaceOnUse">\n                    <stop stop-color="#C286FF"/>\n                    <stop offset="1" stop-color="#9747FF" stop-opacity="0"/>\n                    <stop offset="1" stop-color="#A9ACFF" stop-opacity="0"/>\n                    </linearGradient>\n                    </defs>\n                </svg>\n            ',
                    close: '\n                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n                  <path d="M5.43219 4.61774L9.06681 0.988899C9.17544 0.880262 9.23648 0.732919 9.23648 0.579284C9.23648 0.425648 9.17544 0.278305 9.06681 0.169668C8.95817 0.0610315 8.81083 0 8.65719 0C8.50356 0 8.35621 0.0610315 8.24758 0.169668L4.61873 3.80428L0.989884 0.169668C0.881247 0.0610315 0.733904 1.36404e-07 0.580268 1.37549e-07C0.426633 1.38694e-07 0.27929 0.0610315 0.170653 0.169668C0.0620161 0.278305 0.000984716 0.425648 0.000984715 0.579284C0.000984714 0.732919 0.0620161 0.880262 0.170653 0.988899L3.80527 4.61774L0.170653 8.24659C0.116579 8.30022 0.0736592 8.36403 0.0443695 8.43433C0.0150799 8.50464 0 8.58004 0 8.6562C0 8.73237 0.0150799 8.80777 0.0443695 8.87808C0.0736592 8.94838 0.116579 9.01219 0.170653 9.06582C0.224285 9.11989 0.288094 9.16281 0.358397 9.1921C0.428701 9.22139 0.504108 9.23647 0.580268 9.23647C0.656429 9.23647 0.731836 9.22139 0.80214 9.1921C0.872443 9.16281 0.936251 9.11989 0.989884 9.06582L4.61873 5.43121L8.24758 9.06582C8.30121 9.11989 8.36502 9.16281 8.43532 9.1921C8.50562 9.22139 8.58103 9.23647 8.65719 9.23647C8.73335 9.23647 8.80876 9.22139 8.87906 9.1921C8.94937 9.16281 9.01318 9.11989 9.06681 9.06582C9.12088 9.01219 9.1638 8.94838 9.19309 8.87808C9.22238 8.80777 9.23746 8.73237 9.23746 8.6562C9.23746 8.58004 9.22238 8.50464 9.19309 8.43433C9.1638 8.36403 9.12088 8.30022 9.06681 8.24659L5.43219 4.61774Z" fill="#808080"/>\n                </svg>\n            ',
                    bannerProClose: '\n                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <g opacity="0.2">\n                    <path d="M18 6L6 18" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n                    <path d="M6 6L18 18" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n                    </g>\n                </svg>\n            ',
                    connects: '\n                <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M25.0002 4.4625C25.0002 5.44712 24.6091 6.3914 23.9128 7.08763C23.2166 7.78386 22.2723 8.175 21.2877 8.175C20.3031 8.175 19.3588 7.78386 18.6626 7.08763C17.9663 6.3914 17.5752 5.44712 17.5752 4.4625C17.5752 3.47788 17.9663 2.53359 18.6626 1.83737C19.3588 1.14114 20.3031 0.75 21.2877 0.75C22.2723 0.75 23.2166 1.14114 23.9128 1.83737C24.6091 2.53359 25.0002 3.47788 25.0002 4.4625Z" fill="#6F6CF2"/>\n                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0949 0.797025C15.8301 0.75 14.3563 0.75 12.625 0.75C6.79142 0.75 3.87464 0.75 2.0617 2.5617C0.25 4.37587 0.25 7.29142 0.25 13.125C0.25 18.9586 0.25 21.8754 2.0617 23.6871C3.87587 25.5 6.79142 25.5 12.625 25.5C18.4586 25.5 21.3754 25.5 23.1871 23.6871C25 21.8766 25 18.9586 25 13.125C25 11.3937 25 9.91987 24.953 8.65515C23.8898 9.58602 22.5125 10.0779 21.1002 10.0311C19.6878 9.9843 18.3461 9.40232 17.3469 8.4031C16.3477 7.40389 15.7657 6.06217 15.7189 4.64984C15.6721 3.23751 16.164 1.8602 17.0949 0.797025ZM19.4065 9.9372C19.5955 10.0948 19.7142 10.321 19.7364 10.566C19.7587 10.8111 19.6828 11.0549 19.5253 11.244L17.2619 13.9603C16.856 14.4479 16.4897 14.8884 16.1482 15.1978C15.7744 15.5319 15.3067 15.8326 14.6879 15.8326C14.0692 15.8326 13.6002 15.5332 13.2277 15.1966C12.8861 14.8872 12.5198 14.4479 12.1127 13.9591L11.7513 13.5259C11.2922 12.9753 11.0101 12.6399 10.7774 12.4308C10.7172 12.3717 10.6493 12.3209 10.5757 12.2798L10.5633 12.2736L10.5571 12.2761L10.5485 12.2798C10.4748 12.3209 10.407 12.3717 10.3468 12.4308C10.1153 12.6411 9.8332 12.9753 9.37409 13.5259L7.1503 16.194C6.99076 16.3764 6.76624 16.4891 6.52469 16.5081C6.28314 16.5272 6.04373 16.451 5.85759 16.2959C5.67145 16.1408 5.55335 15.919 5.52852 15.678C5.50369 15.437 5.5741 15.1958 5.7247 15.006L7.98809 12.2897C8.39399 11.8021 8.76029 11.3616 9.10184 11.0522C9.47556 10.7181 9.94334 10.4173 10.5621 10.4173C11.1808 10.4173 11.6498 10.7168 12.0223 11.0534C12.3639 11.3628 12.7302 11.8021 13.1373 12.2909L13.4987 12.724C13.9578 13.2747 14.2399 13.6101 14.4726 13.8192C14.579 13.9158 14.6434 13.9554 14.6743 13.9702L14.678 13.9714C14.6813 13.9732 14.6846 13.9748 14.6879 13.9764L14.7003 13.9702C14.7744 13.9292 14.8427 13.8784 14.9032 13.8192C15.1346 13.6089 15.4168 13.2747 15.8759 12.724L18.0997 10.056C18.2573 9.86702 18.4835 9.74834 18.7285 9.72606C18.9736 9.70379 19.2174 9.77973 19.4065 9.9372Z" fill="#6F6CF2"/>\n                </svg>\n            ',
                    download: '\n                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M15 21V3M15 21L7 13M15 21L23 13" stroke="#545760" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>\n                    <path d="M3 27H27" stroke="#545760" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>\n                </svg>\n            ',
                    embed: '\n                <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M9.32402 2L2.46143 10.4L9.32402 18.8M16.2758 2L23.1383 10.4L16.2758 18.8" stroke="#545760" stroke-width="2.58462" stroke-linecap="round"/>\n                </svg>\n            ',
                    highlights: '\n                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M14.9998 8.625C13.5344 8.62404 12.1135 9.12792 10.9761 10.0518C9.83876 10.9757 9.05439 12.2633 8.75505 13.6977C8.45571 15.1322 8.65967 16.6259 9.3326 17.9276C10.0055 19.2293 11.1064 20.2594 12.4498 20.8446V23.925H17.5498V20.8446C18.892 20.2584 19.9914 19.2281 20.6634 17.9268C21.3353 16.6254 21.5388 15.1324 21.2397 13.6987C20.9405 12.265 20.1568 10.978 19.0205 10.054C17.8842 9.13007 16.4644 8.62545 14.9998 8.625Z" fill="#FFB800"/>\n                    <path d="M26.475 15H27.75M23.2875 6.7125L24.5625 5.4375M15 3.525V2.25M6.7125 6.7125L5.4375 5.4375M3.525 15H2.25M12.45 27.75H17.55M21.375 15C21.3747 13.8507 21.0637 12.7229 20.4749 11.7359C19.8861 10.7489 19.0415 9.93943 18.0304 9.39312C17.0192 8.84681 15.8792 8.584 14.731 8.63249C13.5828 8.68099 12.469 9.03899 11.5075 9.66861C10.5461 10.2982 9.77268 11.176 9.26923 12.2092C8.76577 13.2423 8.55097 14.3923 8.64755 15.5375C8.74413 16.6827 9.14849 17.7805 9.81785 18.7148C10.4872 19.649 11.3967 20.3849 12.45 20.8446V23.925H17.55V20.8446C18.6871 20.3482 19.6546 19.5308 20.334 18.4927C21.0134 17.4545 21.3752 16.2407 21.375 15Z" stroke="#FFB800" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>\n                </svg>\n            ',
                    kindle: '\n                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                    <rect width="30" height="30" rx="3" fill="url(#pattern0_423_248)"/>\n                    <defs>\n                    <pattern id="pattern0_423_248" patternContentUnits="objectBoundingBox" width="1" height="1">\n                    <use xlink:href="#image0_423_248" transform="scale(0.00485437 0.00483092)"/>\n                    </pattern>\n                    <image id="image0_423_248" width="206" height="207" xlink:href="data:image/jpeg;base64,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"/>\n                    </defs>\n                </svg>\n            ',
                    pdf: '\n                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M24.117 5.43047L22.4707 3.49083V5.43047H24.117ZM25.3125 7.30547H21.7208C21.0994 7.30547 20.5957 6.80179 20.5957 6.18047V1.875H6.5625C6.04473 1.875 5.625 2.29473 5.625 2.8125V26.25C5.625 26.7678 6.04473 27.1875 6.5625 27.1875H24.375C24.8928 27.1875 25.3125 26.7678 25.3125 26.25V7.30547Z" stroke="#E0363D" stroke-width="1.875"/>\n                    <path d="M19.2709 12.1875H0.9375C0.419733 12.1875 0 12.6072 0 13.125V21.5625C0 22.0803 0.419733 22.5 0.9375 22.5H19.2709C19.7886 22.5 20.2084 22.0803 20.2084 21.5625V13.125C20.2084 12.6072 19.7886 12.1875 19.2709 12.1875Z" fill="#E0363D"/>\n                    <path d="M4.08789 19.6875V14.9148H5.97088C6.33287 14.9148 6.64127 14.9839 6.89606 15.1222C7.15085 15.2589 7.34506 15.4492 7.47867 15.6931C7.61383 15.9355 7.68141 16.2152 7.68141 16.5321C7.68141 16.849 7.61306 17.1287 7.47633 17.371C7.33962 17.6134 7.14153 17.8022 6.88207 17.9374C6.62417 18.0725 6.31189 18.1401 5.94525 18.1401H4.74507V17.3315H5.78211C5.97632 17.3315 6.13634 17.298 6.26218 17.2312C6.38957 17.1629 6.48435 17.0689 6.54649 16.9492C6.6102 16.828 6.64204 16.689 6.64204 16.5321C6.64204 16.3736 6.6102 16.2353 6.54649 16.1173C6.48435 15.9977 6.38957 15.9052 6.26218 15.84C6.13478 15.7732 5.9732 15.7398 5.77745 15.7398H5.09697V19.6875H4.08789ZM10.0287 19.6875H8.33685V14.9148H10.0427C10.5228 14.9148 10.9361 15.0103 11.2826 15.2014C11.629 15.3909 11.8954 15.6637 12.0819 16.0194C12.2698 16.3752 12.3639 16.8008 12.3639 17.2965C12.3639 17.7937 12.2698 18.2209 12.0819 18.5782C11.8954 18.9355 11.6275 19.2097 11.2779 19.4008C10.9299 19.592 10.5134 19.6875 10.0287 19.6875ZM9.34592 18.8229H9.98684C10.2851 18.8229 10.536 18.7701 10.7396 18.6644C10.9446 18.5572 11.0984 18.3918 11.201 18.1681C11.3051 17.9428 11.3571 17.6523 11.3571 17.2965C11.3571 16.9438 11.3051 16.6556 11.201 16.4318C11.0984 16.2082 10.9453 16.0434 10.7419 15.9379C10.5384 15.8322 10.2874 15.7793 9.98909 15.7793H9.34592V18.8229ZM13.1113 19.6875V14.9148H16.2714V15.7467H14.1204V16.884H16.0617V17.7159H14.1204V19.6875H13.1113Z" fill="white"/>\n                    <path d="M21.5625 5.625V4.5476C21.5625 3.6614 22.6785 3.26995 23.2321 3.96196L24.0939 5.03935C24.5851 5.65319 24.148 6.5625 23.3619 6.5625H22.5C21.9822 6.5625 21.5625 6.14276 21.5625 5.625Z" fill="#E0363D" stroke="#E0363D" stroke-width="0.9375"/>\n                </svg>\n            ',
                    quotes: '\n                <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M29.0501 1.83748C29.0205 1.55719 28.8793 1.29705 28.6539 1.10763C28.4284 0.918206 28.1348 0.813016 27.8301 0.8125H2.13592V0.815539C1.8375 0.823182 1.55236 0.931217 1.334 1.11937C1.11564 1.30753 0.97907 1.56287 0.949919 1.83748H0.9375V20.8589H0.962338C1.01804 21.1108 1.16442 21.3379 1.3776 21.503C1.59078 21.6682 1.85821 21.7618 2.13628 21.7685V21.7715H6.36015V24.0483C6.36005 24.2924 6.44481 24.5301 6.60195 24.7263C6.75908 24.9225 6.98026 25.0668 7.23288 25.138C7.4855 25.2092 7.75618 25.2035 8.005 25.1217C8.25383 25.0399 8.46764 24.8863 8.61489 24.6837L11.766 21.7712H27.8301C28.1144 21.7712 28.3899 21.6803 28.61 21.514C28.8301 21.3477 28.9812 21.1161 29.0377 20.8586H29.0625V1.83748H29.0501ZM7.11002 13.2236C5.99416 13.2236 4.99627 12.4117 4.99627 10.9846C4.99627 9.33776 5.97041 7.86714 7.44314 6.90125L7.44826 6.9053C7.48468 6.88718 7.52525 6.87735 7.5666 6.8766C7.62381 6.87766 7.67903 6.89618 7.72366 6.92927L7.72658 6.92691L8.71388 7.50286L8.70803 7.50793C8.77816 7.55215 8.82674 7.62271 8.82674 7.70712C8.82632 7.75135 8.81283 7.79464 8.78772 7.83231C8.76262 7.86997 8.72685 7.90058 8.68429 7.92082L8.68502 7.9215L8.66822 7.93095L8.66384 7.93331C7.90958 8.31278 7.10783 9.19124 6.89635 9.97449C6.99131 9.9306 7.18125 9.90865 7.37155 9.90865C8.27411 9.90865 8.98636 10.545 8.98636 11.489C8.98673 12.4333 8.13129 13.2236 7.11002 13.2236ZM11.9435 13.2236C10.8276 13.2236 9.82975 12.4117 9.82975 10.9846C9.82975 9.33776 10.8039 7.86714 12.2766 6.90125L12.2817 6.9053C12.3182 6.88718 12.3587 6.87735 12.4001 6.8766C12.4573 6.87766 12.5125 6.89618 12.5571 6.92927L12.5601 6.92691L13.5474 7.50286L13.5415 7.50793C13.6116 7.55215 13.6602 7.62271 13.6602 7.70712C13.6598 7.75135 13.6463 7.79464 13.6212 7.83231C13.5961 7.86997 13.5603 7.90058 13.5178 7.92082L13.5185 7.9215L13.5017 7.93095L13.4973 7.93331C12.7431 8.31278 11.9413 9.19124 11.7298 9.97449C11.8248 9.9306 12.0147 9.90865 12.205 9.90865C13.1076 9.90865 13.8198 10.545 13.8198 11.489C13.8198 12.4333 12.9648 13.2236 11.9435 13.2236ZM17.7234 15.65L17.7183 15.646C17.6818 15.6641 17.6413 15.6739 17.5999 15.6746C17.5427 15.6736 17.4875 15.6551 17.4429 15.622L17.4399 15.6243L16.4526 15.0484L16.4585 15.0433C16.4225 15.0217 16.3928 14.9923 16.3721 14.9575C16.3514 14.9228 16.3403 14.8838 16.3398 14.8441C16.3398 14.7506 16.3986 14.6716 16.4822 14.6304L16.4815 14.6298L16.4983 14.6203L16.5027 14.6179C17.2569 14.2385 18.0587 13.36 18.2702 12.5768C18.1752 12.6207 17.9853 12.6426 17.795 12.6426C16.8924 12.6426 16.1802 12.0062 16.1802 11.0623C16.1802 10.118 17.0356 9.32797 18.0569 9.32797C19.1727 9.32797 20.1706 10.1399 20.1706 11.567C20.1702 13.2135 19.1961 14.6841 17.7234 15.65ZM22.5569 15.65L22.5517 15.646C22.5153 15.6641 22.4748 15.6739 22.4334 15.6746C22.3762 15.6736 22.321 15.6551 22.2763 15.622L22.2734 15.6243L21.2861 15.0484L21.292 15.0433C21.2559 15.0217 21.2263 14.9923 21.2056 14.9575C21.1848 14.9228 21.1737 14.8838 21.1733 14.8441C21.1733 14.7506 21.2321 14.6716 21.3157 14.6304L21.315 14.6298L21.3318 14.6203L21.3362 14.6179C22.0904 14.2385 22.8922 13.36 23.1037 12.5768C23.0087 12.6207 22.8188 12.6426 22.6285 12.6426C21.7259 12.6426 21.0136 12.0062 21.0136 11.0623C21.0136 10.118 21.8691 9.32797 22.8903 9.32797C24.0062 9.32797 25.0041 10.1399 25.0041 11.567C25.0037 13.2135 24.0296 14.6841 22.5569 15.65Z" fill="#9747FF"/>\n                </svg>\n            ',
                    youtube: '\n                <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M27.5589 3.2699C27.2411 2.08121 26.3047 1.14508 25.1155 0.82738C22.9604 0.25 14.3182 0.25 14.3182 0.25C14.3182 0.25 5.67606 0.25 3.52089 0.82738C2.33166 1.14508 1.39504 2.08121 1.07742 3.2699C0.5 5.42443 0.5 9.91984 0.5 9.91984C0.5 9.91984 0.5 14.415 1.07742 16.5697C1.39504 17.7585 2.33166 18.6945 3.52077 19.0125C5.67594 19.5896 14.3181 19.5896 14.3181 19.5896C14.3181 19.5896 22.9603 19.5896 25.1153 19.0125C26.3046 18.6946 27.2409 17.7585 27.5588 16.5698C28.1363 14.4151 28.1363 9.91992 28.1363 9.91992C28.1363 9.91992 28.1365 5.42443 27.5589 3.2699Z" fill="#FF0000"/>\n                    <path d="M11.4917 14.0013L18.7148 9.92005L11.4917 5.83838V14.0013Z" fill="white"/>\n                </svg>\n            ',
                    bannerProLogo: '\n                <svg width="219" height="219" viewBox="0 0 219 219" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M11.7139 50.3825L1.57084 52.4737C-0.220201 52.8429 -0.540249 55.083 0.924585 56.1782L46.4883 86.2301C46.7037 86.3697 46.9438 86.4597 47.1899 86.5063C47.1899 86.4225 47.1961 86.3356 47.1961 86.2518C47.3192 77.7879 47.0792 64.971 45.0419 48.6481C41.0906 16.3654 27.3162 2.45947 27.3162 2.45947C24.7435 6.12987 21.8631 11.6432 19.075 19.9862C13.9173 35.1797 13.0125 43.7491 13.3203 48.3441C13.3572 49.2687 12.7602 50.1684 11.7139 50.3825Z" fill="url(#paint0_linear_729_7555)"/>\n                    <path d="M207.29 50.3825L217.433 52.4737C219.224 52.8429 219.544 55.083 218.079 56.1782L172.516 86.2301C172.3 86.3697 172.06 86.4597 171.814 86.5063C171.814 86.4225 171.808 86.3356 171.808 86.2518C171.685 77.7879 171.925 64.971 173.962 48.6481C177.913 16.3654 191.688 2.45947 191.688 2.45947C194.26 6.12987 197.141 11.6432 199.929 19.9862C205.087 35.1797 205.991 43.7491 205.684 48.3441C205.647 49.2687 206.244 50.1684 207.29 50.3825Z" fill="url(#paint1_linear_729_7555)"/>\n                    <path d="M192.341 95.52H176.412C170.423 95.52 165.513 90.6836 165.393 84.638C165.153 75.9324 165.393 62.3903 167.669 44.7372C171.262 15.8394 186.472 0 186.472 0H186.233C174.975 8.10107 145.511 13.9048 110.898 13.9048C76.2844 13.9048 46.821 8.10107 35.5627 0H35.4429C35.4429 0 49.2164 13.9048 53.1688 46.1882C55.2049 62.5112 55.4444 75.3278 55.3247 83.7916C55.2049 90.1999 49.935 95.3991 43.4675 95.3991H25.502C17.4775 95.3991 13.2855 104.951 18.6752 110.997L102.035 203.494C106.466 208.451 114.132 208.451 118.563 203.494L200.006 113.052C206.115 106.402 201.444 95.52 192.341 95.52Z" fill="url(#paint2_linear_729_7555)"/>\n                    <path opacity="0.44" d="M41.5752 2.37661C41.5752 2.37661 71.2781 13.4209 113.676 11.7433C156.913 10.2055 183.263 0 183.263 0C183.263 0 159.668 32.0144 142.9 78.4283C134.636 101.216 128.648 122.186 124.336 140.919C120.743 156.437 101.819 156.577 98.2262 141.059C93.3157 120.369 86.7283 96.3228 77.9851 69.7606C57.9836 9.36666 41.5752 2.37661 41.5752 2.37661Z" fill="url(#paint3_linear_729_7555)"/>\n                    <path opacity="0.41" d="M58.8125 8.46394C58.8125 8.46394 80.6106 13.3032 111.87 12.6579C143.729 12.0127 163.012 7.49609 163.012 7.49609C163.012 7.49609 145.645 21.6911 133.309 42.0159C126.842 52.6621 122.29 62.6632 118.937 71.2125C115.943 79.1165 104.085 79.1165 100.971 71.2125C97.2585 61.6953 92.2282 50.5651 85.5211 38.1445C70.9092 11.5288 58.8125 8.46394 58.8125 8.46394Z" fill="url(#paint4_linear_729_7555)"/>\n                    <path d="M58.8125 154.722L101.52 193.216C107.041 198.233 116.593 198.233 122.114 193.216L154.581 163.934L119.08 203.495C114.661 208.453 107.023 208.453 102.61 203.495L58.8125 154.722Z" fill="#1FA156" fill-opacity="0.25"/>\n                    <ellipse cx="112.402" cy="215.762" rx="50.5952" ry="3.241" fill="#E7E6E6"/>\n                    <ellipse cx="112.407" cy="215.756" rx="21.1297" ry="1.8233" fill="#D0CFCF"/>\n                    <defs>\n                    <linearGradient id="paint0_linear_729_7555" x1="5.59588e-07" y1="53.3027" x2="41.3673" y2="42.6596" gradientUnits="userSpaceOnUse">\n                    <stop offset="0.453039" stop-color="#BDF924"/>\n                    <stop offset="1" stop-color="#91DE03"/>\n                    </linearGradient>\n                    <linearGradient id="paint1_linear_729_7555" x1="219.001" y1="54.7191" x2="178.83" y2="36.1574" gradientUnits="userSpaceOnUse">\n                    <stop offset="0.430939" stop-color="#BDF924"/>\n                    <stop offset="1" stop-color="#91DE03"/>\n                    </linearGradient>\n                    <linearGradient id="paint2_linear_729_7555" x1="109.573" y1="4.68665" x2="109.573" y2="212.906" gradientUnits="userSpaceOnUse">\n                    <stop stop-color="#AEF924"/>\n                    <stop offset="1" stop-color="#A0DE03"/>\n                    </linearGradient>\n                    <linearGradient id="paint3_linear_729_7555" x1="41.5752" y1="92.3305" x2="153.657" y2="44.6858" gradientUnits="userSpaceOnUse">\n                    <stop offset="0.453039" stop-color="#F3F4EE"/>\n                    <stop offset="1" stop-color="#E4E9DA"/>\n                    </linearGradient>\n                    <linearGradient id="paint4_linear_729_7555" x1="110.915" y1="12.0021" x2="110.915" y2="78.2043" gradientUnits="userSpaceOnUse">\n                    <stop stop-color="white"/>\n                    <stop offset="1" stop-color="white" stop-opacity="0"/>\n                    </linearGradient>\n                    </defs>\n                </svg>\n            '
                };
            }
            svgToDataUri(e) {
                return `data:image/svg+xml;base64,${btoa(e)}`;
            }
            getSvgIconAsDataUri(e) {
                var t = this.icons[e];
                if (t) return this.svgToDataUri(t);
            }
        };
    },
    4627: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => o
        });
        var n = r(5299);
        const o = /^(319|550|7|947)$/.test(r.j) ? null : e => {
            var t = e.locals, r = e.use, o = e.unuse;
            return n.Ay.useMemo(r, []), n.Ay.useEffect((() => o), []), t;
        };
    },
    5624: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => n
        });
        const n = /^(319|550|7|947)$/.test(r.j) ? null : function(e) {
            e = e.replace(/\r\n/g, "\n");
            for (var t = "", r = 0; r < e.length; r++) {
                var n = e.charCodeAt(r);
                n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), 
                t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), 
                t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128));
            }
            return t;
        };
    },
    9021: function(e, t, r) {
        var n;
        e.exports = (n = n || function(e, t) {
            var n;
            if ("undefined" != typeof window && window.crypto && (n = window.crypto), "undefined" != typeof self && self.crypto && (n = self.crypto), 
            "undefined" != typeof globalThis && globalThis.crypto && (n = globalThis.crypto), 
            !n && "undefined" != typeof window && window.msCrypto && (n = window.msCrypto), 
            !n && void 0 !== r.g && r.g.crypto && (n = r.g.crypto), !n) try {
                n = r(Object(function() {
                    var e = new Error("Cannot find module 'crypto'");
                    throw e.code = "MODULE_NOT_FOUND", e;
                }()));
            } catch (e) {}
            var o = function() {
                if (n) {
                    if ("function" == typeof n.getRandomValues) try {
                        return n.getRandomValues(new Uint32Array(1))[0];
                    } catch (e) {}
                    if ("function" == typeof n.randomBytes) try {
                        return n.randomBytes(4).readInt32LE();
                    } catch (e) {}
                }
                throw new Error("Native crypto module could not be used to get secure random number.");
            }, i = Object.create || function() {
                function e() {}
                return function(t) {
                    var r;
                    return e.prototype = t, r = new e, e.prototype = null, r;
                };
            }(), a = {}, s = a.lib = {}, u = s.Base = {
                extend: function(e) {
                    var t = i(this);
                    return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
                        t.$super.init.apply(this, arguments);
                    }), t.init.prototype = t, t.$super = this, t;
                },
                create: function() {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e;
                },
                init: function() {},
                mixIn: function(e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString);
                },
                clone: function() {
                    return this.init.prototype.extend(this);
                }
            }, l = s.WordArray = u.extend({
                init: function(e, r) {
                    e = this.words = e || [], this.sigBytes = r != t ? r : 4 * e.length;
                },
                toString: function(e) {
                    return (e || d).stringify(this);
                },
                concat: function(e) {
                    var t = this.words, r = e.words, n = this.sigBytes, o = e.sigBytes;
                    if (this.clamp(), n % 4) for (var i = 0; i < o; i++) {
                        var a = r[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                        t[n + i >>> 2] |= a << 24 - (n + i) % 4 * 8;
                    } else for (var s = 0; s < o; s += 4) t[n + s >>> 2] = r[s >>> 2];
                    return this.sigBytes += o, this;
                },
                clamp: function() {
                    var t = this.words, r = this.sigBytes;
                    t[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, t.length = e.ceil(r / 4);
                },
                clone: function() {
                    var e = u.clone.call(this);
                    return e.words = this.words.slice(0), e;
                },
                random: function(e) {
                    for (var t = [], r = 0; r < e; r += 4) t.push(o());
                    return new l.init(t, e);
                }
            }), c = a.enc = {}, d = c.Hex = {
                stringify: function(e) {
                    for (var t = e.words, r = e.sigBytes, n = [], o = 0; o < r; o++) {
                        var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        n.push((i >>> 4).toString(16)), n.push((15 & i).toString(16));
                    }
                    return n.join("");
                },
                parse: function(e) {
                    for (var t = e.length, r = [], n = 0; n < t; n += 2) r[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;
                    return new l.init(r, t / 2);
                }
            }, p = c.Latin1 = {
                stringify: function(e) {
                    for (var t = e.words, r = e.sigBytes, n = [], o = 0; o < r; o++) {
                        var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        n.push(String.fromCharCode(i));
                    }
                    return n.join("");
                },
                parse: function(e) {
                    for (var t = e.length, r = [], n = 0; n < t; n++) r[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;
                    return new l.init(r, t);
                }
            }, A = c.Utf8 = {
                stringify: function(e) {
                    try {
                        return decodeURIComponent(escape(p.stringify(e)));
                    } catch (e) {
                        throw new Error("Malformed UTF-8 data");
                    }
                },
                parse: function(e) {
                    return p.parse(unescape(encodeURIComponent(e)));
                }
            }, h = s.BufferedBlockAlgorithm = u.extend({
                reset: function() {
                    this._data = new l.init, this._nDataBytes = 0;
                },
                _append: function(e) {
                    "string" == typeof e && (e = A.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
                },
                _process: function(t) {
                    var r, n = this._data, o = n.words, i = n.sigBytes, a = this.blockSize, s = i / (4 * a), u = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * a, c = e.min(4 * u, i);
                    if (u) {
                        for (var d = 0; d < u; d += a) this._doProcessBlock(o, d);
                        r = o.splice(0, u), n.sigBytes -= c;
                    }
                    return new l.init(r, c);
                },
                clone: function() {
                    var e = u.clone.call(this);
                    return e._data = this._data.clone(), e;
                },
                _minBufferSize: 0
            }), f = (s.Hasher = h.extend({
                cfg: u.extend(),
                init: function(e) {
                    this.cfg = this.cfg.extend(e), this.reset();
                },
                reset: function() {
                    h.reset.call(this), this._doReset();
                },
                update: function(e) {
                    return this._append(e), this._process(), this;
                },
                finalize: function(e) {
                    return e && this._append(e), this._doFinalize();
                },
                blockSize: 16,
                _createHelper: function(e) {
                    return function(t, r) {
                        return new e.init(r).finalize(t);
                    };
                },
                _createHmacHelper: function(e) {
                    return function(t, r) {
                        return new f.HMAC.init(e, r).finalize(t);
                    };
                }
            }), a.algo = {});
            return a;
        }(Math), n);
    },
    4636: function(e, t, r) {
        var n;
        e.exports = (n = r(9021), function(e) {
            var t = n, r = t.lib, o = r.WordArray, i = r.Hasher, a = t.algo, s = [];
            !function() {
                for (var t = 0; t < 64; t++) s[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;
            }();
            var u = a.MD5 = i.extend({
                _doReset: function() {
                    this._hash = new o.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
                },
                _doProcessBlock: function(e, t) {
                    for (var r = 0; r < 16; r++) {
                        var n = t + r, o = e[n];
                        e[n] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);
                    }
                    var i = this._hash.words, a = e[t + 0], u = e[t + 1], A = e[t + 2], h = e[t + 3], f = e[t + 4], g = e[t + 5], v = e[t + 6], I = e[t + 7], C = e[t + 8], m = e[t + 9], E = e[t + 10], y = e[t + 11], w = e[t + 12], b = e[t + 13], x = e[t + 14], R = e[t + 15], k = i[0], O = i[1], S = i[2], F = i[3];
                    k = l(k, O, S, F, a, 7, s[0]), F = l(F, k, O, S, u, 12, s[1]), S = l(S, F, k, O, A, 17, s[2]), 
                    O = l(O, S, F, k, h, 22, s[3]), k = l(k, O, S, F, f, 7, s[4]), F = l(F, k, O, S, g, 12, s[5]), 
                    S = l(S, F, k, O, v, 17, s[6]), O = l(O, S, F, k, I, 22, s[7]), k = l(k, O, S, F, C, 7, s[8]), 
                    F = l(F, k, O, S, m, 12, s[9]), S = l(S, F, k, O, E, 17, s[10]), O = l(O, S, F, k, y, 22, s[11]), 
                    k = l(k, O, S, F, w, 7, s[12]), F = l(F, k, O, S, b, 12, s[13]), S = l(S, F, k, O, x, 17, s[14]), 
                    k = c(k, O = l(O, S, F, k, R, 22, s[15]), S, F, u, 5, s[16]), F = c(F, k, O, S, v, 9, s[17]), 
                    S = c(S, F, k, O, y, 14, s[18]), O = c(O, S, F, k, a, 20, s[19]), k = c(k, O, S, F, g, 5, s[20]), 
                    F = c(F, k, O, S, E, 9, s[21]), S = c(S, F, k, O, R, 14, s[22]), O = c(O, S, F, k, f, 20, s[23]), 
                    k = c(k, O, S, F, m, 5, s[24]), F = c(F, k, O, S, x, 9, s[25]), S = c(S, F, k, O, h, 14, s[26]), 
                    O = c(O, S, F, k, C, 20, s[27]), k = c(k, O, S, F, b, 5, s[28]), F = c(F, k, O, S, A, 9, s[29]), 
                    S = c(S, F, k, O, I, 14, s[30]), k = d(k, O = c(O, S, F, k, w, 20, s[31]), S, F, g, 4, s[32]), 
                    F = d(F, k, O, S, C, 11, s[33]), S = d(S, F, k, O, y, 16, s[34]), O = d(O, S, F, k, x, 23, s[35]), 
                    k = d(k, O, S, F, u, 4, s[36]), F = d(F, k, O, S, f, 11, s[37]), S = d(S, F, k, O, I, 16, s[38]), 
                    O = d(O, S, F, k, E, 23, s[39]), k = d(k, O, S, F, b, 4, s[40]), F = d(F, k, O, S, a, 11, s[41]), 
                    S = d(S, F, k, O, h, 16, s[42]), O = d(O, S, F, k, v, 23, s[43]), k = d(k, O, S, F, m, 4, s[44]), 
                    F = d(F, k, O, S, w, 11, s[45]), S = d(S, F, k, O, R, 16, s[46]), k = p(k, O = d(O, S, F, k, A, 23, s[47]), S, F, a, 6, s[48]), 
                    F = p(F, k, O, S, I, 10, s[49]), S = p(S, F, k, O, x, 15, s[50]), O = p(O, S, F, k, g, 21, s[51]), 
                    k = p(k, O, S, F, w, 6, s[52]), F = p(F, k, O, S, h, 10, s[53]), S = p(S, F, k, O, E, 15, s[54]), 
                    O = p(O, S, F, k, u, 21, s[55]), k = p(k, O, S, F, C, 6, s[56]), F = p(F, k, O, S, R, 10, s[57]), 
                    S = p(S, F, k, O, v, 15, s[58]), O = p(O, S, F, k, b, 21, s[59]), k = p(k, O, S, F, f, 6, s[60]), 
                    F = p(F, k, O, S, y, 10, s[61]), S = p(S, F, k, O, A, 15, s[62]), O = p(O, S, F, k, m, 21, s[63]), 
                    i[0] = i[0] + k | 0, i[1] = i[1] + O | 0, i[2] = i[2] + S | 0, i[3] = i[3] + F | 0;
                },
                _doFinalize: function() {
                    var t = this._data, r = t.words, n = 8 * this._nDataBytes, o = 8 * t.sigBytes;
                    r[o >>> 5] |= 128 << 24 - o % 32;
                    var i = e.floor(n / 4294967296), a = n;
                    r[15 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), 
                    r[14 + (o + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), 
                    t.sigBytes = 4 * (r.length + 1), this._process();
                    for (var s = this._hash, u = s.words, l = 0; l < 4; l++) {
                        var c = u[l];
                        u[l] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
                    }
                    return s;
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e._hash = this._hash.clone(), e;
                }
            });
            function l(e, t, r, n, o, i, a) {
                var s = e + (t & r | ~t & n) + o + a;
                return (s << i | s >>> 32 - i) + t;
            }
            function c(e, t, r, n, o, i, a) {
                var s = e + (t & n | r & ~n) + o + a;
                return (s << i | s >>> 32 - i) + t;
            }
            function d(e, t, r, n, o, i, a) {
                var s = e + (t ^ r ^ n) + o + a;
                return (s << i | s >>> 32 - i) + t;
            }
            function p(e, t, r, n, o, i, a) {
                var s = e + (r ^ (t | ~n)) + o + a;
                return (s << i | s >>> 32 - i) + t;
            }
            t.MD5 = i._createHelper(u), t.HmacMD5 = i._createHmacHelper(u);
        }(Math), n.MD5);
    },
    9215: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, {
            default: () => s
        });
        var n = r(1601), o = r.n(n), i = r(6314), a = r.n(i)()(o());
        a.push([ e.id, ".CSrEb--hidden--shadow{box-shadow:inset -2px 1px 2px 0 rgba(0,0,0,.4)}.mgjyg--hidden--viewer::-webkit-scrollbar{width:.5em}.mgjyg--hidden--viewer::-webkit-scrollbar-track{background:#e0dada}.mgjyg--hidden--viewer::-webkit-scrollbar-thumb{background-color:#6b6969;border-radius:3px}.TJsV2--dropdown--item{color:#3d3d3d;display:block;line-height:24px;overflow:hidden;padding:0 5px;white-space:nowrap}.TJsV2--dropdown--item,.TJsV2--dropdown--item:hover{text-decoration:none}.Po_yU--dropdown--container{display:flex;justify-content:space-between}.jWqHD--dropdown--format{min-width:36px}.pIeOk--dropdown--quality{display:flex;justify-content:space-between;margin-left:6px;min-width:42px}._N4Gd--quality--badge{background-color:#505050;border-radius:3px;color:#fff;height:19px;line-height:21px;margin-left:2px;margin-top:2px;padding-left:2px;padding-right:2px;vertical-align:middle}.IXc9g--dropdown--action{display:flex;justify-content:flex-end;width:30px}.IXc9g--dropdown--action img{margin-left:4px;width:14px}.mgjyg--hidden--viewer{background:#f7f7f7;max-height:192px;overflow-y:scroll}.S4zK4--size--icon{font-size:72%;font-weight:400;margin-left:2px;white-space:nowrap}.hyug1--separator{border-top:1px solid #d6d6d6;display:block;margin:1px 0}.IlWRL--more--btn{color:rgba(44,44,44,.6);display:block;text-align:center}.R_b3_--more--btn-with-pro{display:flex;justify-content:space-between}.R_b3_--more--btn-with-pro a:hover{background:none!important;color:inherit!important}.NKV3w--login--btn{color:#46aa4b;display:block;font-family:Roboto,sans-serif;font-size:13px;font-style:normal;font-weight:700;line-height:14px;padding-bottom:8px;padding-top:8px;text-align:center;text-decoration:none}.rAZB5--pro-information,.rAZB5--pro-information .jaFaa--info{display:flex;justify-content:space-between}.rAZB5--pro-information .jaFaa--info img{height:16px;margin-left:5px;margin-right:8px;margin-top:3px;width:16px}.ARblA--pro--label{color:#46aa4b;line-height:1.9}.wrinF--subtitles{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}", "" ]), 
        a.locals = {
            "hidden--shadow": "CSrEb--hidden--shadow",
            hiddenShadow: "CSrEb--hidden--shadow",
            "hidden--viewer": "mgjyg--hidden--viewer",
            hiddenViewer: "mgjyg--hidden--viewer",
            "dropdown--item": "TJsV2--dropdown--item",
            dropdownItem: "TJsV2--dropdown--item",
            "dropdown--container": "Po_yU--dropdown--container",
            dropdownContainer: "Po_yU--dropdown--container",
            "dropdown--format": "jWqHD--dropdown--format",
            dropdownFormat: "jWqHD--dropdown--format",
            "dropdown--quality": "pIeOk--dropdown--quality",
            dropdownQuality: "pIeOk--dropdown--quality",
            "quality--badge": "_N4Gd--quality--badge",
            qualityBadge: "_N4Gd--quality--badge",
            "dropdown--action": "IXc9g--dropdown--action",
            dropdownAction: "IXc9g--dropdown--action",
            "size--icon": "S4zK4--size--icon",
            sizeIcon: "S4zK4--size--icon",
            separator: "hyug1--separator",
            "more--btn": "IlWRL--more--btn",
            moreBtn: "IlWRL--more--btn",
            "more--btn-with-pro": "R_b3_--more--btn-with-pro",
            moreBtnWithPro: "R_b3_--more--btn-with-pro",
            "login--btn": "NKV3w--login--btn",
            loginBtn: "NKV3w--login--btn",
            "pro-information": "rAZB5--pro-information",
            proInformation: "rAZB5--pro-information",
            info: "jaFaa--info",
            "pro--label": "ARblA--pro--label",
            proLabel: "ARblA--pro--label",
            subtitles: "wrinF--subtitles"
        };
        const s = /^(319|550|7|947)$/.test(r.j) ? null : a;
    },
    8805: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, {
            default: () => s
        });
        var n = r(1601), o = r.n(n), i = r(6314), a = r.n(i)()(o());
        a.push([ e.id, '.s0VQx--hidden--shadow{box-shadow:inset -2px 1px 2px 0 rgba(0,0,0,.4)}.SaiB5--hidden--viewer::-webkit-scrollbar{width:.5em}.SaiB5--hidden--viewer::-webkit-scrollbar-track{background:#e0dada}.SaiB5--hidden--viewer::-webkit-scrollbar-thumb{background-color:#6b6969;border-radius:3px}.fw4KV--chevron{transform:rotate(180deg)}.FyXjw--chevron--open{transform:rotate(0deg)}.QZ86W--dropdown--item{color:#3d3d3d;cursor:pointer;display:block;line-height:24px;overflow:hidden;padding:0 5px;white-space:nowrap}.QZ86W--dropdown--item,.QZ86W--dropdown--item:hover{text-decoration:none}.waj6M--dropdown--item--chevron{align-items:center;-moz-column-gap:5px;column-gap:5px;display:flex}.waj6M--dropdown--item--chevron:hover .fw4KV--chevron path{stroke:#fff}.we5mT--dropdown--container{display:flex;justify-content:space-between}.ycGlm--dropdown--format{min-width:36px}.z_T1P--dropdown--quality{display:flex;justify-content:space-between;margin-left:6px;min-width:42px}.jvcb6--quality--badge{background-color:#505050;border-radius:3px;color:#fff;height:19px;line-height:21px;margin-left:2px;margin-top:2px;padding-left:2px;padding-right:2px;vertical-align:middle}.nevqM--dropdown--action{display:flex;justify-content:flex-end;width:30px}.nevqM--dropdown--action img{margin-left:4px;width:14px}.SaiB5--hidden--viewer{background:#f7f7f7;max-height:192px;overflow-y:scroll}.X7W3n--size--icon{font-size:72%;font-weight:400;margin-left:2px;white-space:nowrap}._jxfu--separator{border-top:1px solid #d6d6d6;display:block;margin:1px 0}.kvw_O--more--btn{color:rgba(44,44,44,.6);display:block;text-align:center}.njubZ--more--btn-with-pro{display:flex;justify-content:space-between}.njubZ--more--btn-with-pro a:hover{background:none!important;color:inherit!important}.PzsDI--login--btn{color:#46aa4b;display:block;font-family:Roboto,sans-serif;font-size:13px;font-style:normal;font-weight:700;line-height:14px;padding-bottom:8px;padding-top:8px;text-align:center;text-decoration:none}.V7nRC--pro-information,.V7nRC--pro-information .u7Oka--info{display:flex;justify-content:space-between}.V7nRC--pro-information .u7Oka--info img{height:16px;margin-left:5px;margin-right:8px;margin-top:3px;width:16px}.IezIf--pro--label{color:#46aa4b;line-height:1.9}.TjvrF--subtitles{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}p.fw4KV--chevron:before{content:"\\2039"}p.fw4KV--chevron:after{content:"\\203A"}', "" ]), 
        a.locals = {
            "hidden--shadow": "s0VQx--hidden--shadow",
            hiddenShadow: "s0VQx--hidden--shadow",
            "hidden--viewer": "SaiB5--hidden--viewer",
            hiddenViewer: "SaiB5--hidden--viewer",
            chevron: "fw4KV--chevron",
            "chevron--open": "FyXjw--chevron--open",
            chevronOpen: "FyXjw--chevron--open",
            "dropdown--item": "QZ86W--dropdown--item",
            dropdownItem: "QZ86W--dropdown--item",
            "dropdown--item--chevron": "waj6M--dropdown--item--chevron",
            dropdownItemChevron: "waj6M--dropdown--item--chevron",
            "dropdown--container": "we5mT--dropdown--container",
            dropdownContainer: "we5mT--dropdown--container",
            "dropdown--format": "ycGlm--dropdown--format",
            dropdownFormat: "ycGlm--dropdown--format",
            "dropdown--quality": "z_T1P--dropdown--quality",
            dropdownQuality: "z_T1P--dropdown--quality",
            "quality--badge": "jvcb6--quality--badge",
            qualityBadge: "jvcb6--quality--badge",
            "dropdown--action": "nevqM--dropdown--action",
            dropdownAction: "nevqM--dropdown--action",
            "size--icon": "X7W3n--size--icon",
            sizeIcon: "X7W3n--size--icon",
            separator: "_jxfu--separator",
            "more--btn": "kvw_O--more--btn",
            moreBtn: "kvw_O--more--btn",
            "more--btn-with-pro": "njubZ--more--btn-with-pro",
            moreBtnWithPro: "njubZ--more--btn-with-pro",
            "login--btn": "PzsDI--login--btn",
            loginBtn: "PzsDI--login--btn",
            "pro-information": "V7nRC--pro-information",
            proInformation: "V7nRC--pro-information",
            info: "u7Oka--info",
            "pro--label": "IezIf--pro--label",
            proLabel: "IezIf--pro--label",
            subtitles: "TjvrF--subtitles"
        };
        const s = /^(319|550|7|947)$/.test(r.j) ? null : a;
    },
    8612: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, {
            default: () => s
        });
        var n = r(1601), o = r.n(n), i = r(6314), a = r.n(i)()(o());
        a.push([ e.id, ".SN0Ut--information{background:#ffb23fc2;border-left:4px solid #c58d39;color:#191919;font-size:13px;font-weight:700;line-height:1.5;margin-bottom:12px;padding:5px}.iR6fV--filesCount{font-size:13px;margin-bottom:4px}.OI6C6--progress{background-color:#e8e8e8;border-radius:3px;height:21px;overflow:hidden;position:relative}.OI6C6--progress .fAo5C--line{background-color:#0cf;border-radius:5px;height:21px;position:absolute;transition:width .1s}.OI6C6--progress .IFqsK--text{display:flex;left:5px;position:absolute;top:3px}.OI6C6--progress .LmZNJ--filename{margin-right:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:226px}", "" ]), 
        a.locals = {
            information: "SN0Ut--information",
            filesCount: "iR6fV--filesCount",
            progress: "OI6C6--progress",
            line: "fAo5C--line",
            text: "IFqsK--text",
            filename: "LmZNJ--filename"
        };
        const s = /^(319|550|7|947)$/.test(r.j) ? null : a;
    },
    9866: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, {
            default: () => s
        });
        var n = r(1601), o = r.n(n), i = r(6314), a = r.n(i)()(o());
        a.push([ e.id, ".nUHj8--button{background:linear-gradient(180deg,#54b85b,#3a833f);border-radius:2px;color:#fff;display:block;font-size:12px;margin:5px;padding:5px;text-align:center;text-decoration:none}.nUHj8--button:hover{background:#3a833f!important}", "" ]), 
        a.locals = {
            button: "nUHj8--button"
        };
        const s = /^(319|550|7|947)$/.test(r.j) ? null : a;
    },
    8064: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, {
            default: () => s
        });
        var n = r(1601), o = r.n(n), i = r(6314), a = r.n(i)()(o());
        a.push([ e.id, ".QRXUF--popup--container{background:#fff;border:1px solid hsla(0,0%,50%,.2);border-radius:5px;box-shadow:1px 1px 11px #0000003d;color:#000;font-size:14px;min-height:76px;position:absolute;right:40px;top:7px;width:270px;z-index:9999}.hLyhm--flex-column{display:flex;flex-direction:column}.RgfD4--popup--title{background:#efefef;padding:4px}.AhDrg--popup--body{font-size:17px;padding:1px 25px 32px}.ygamd--btn{background:#6bcc3e;border-radius:3px;box-shadow:0 6px 18px -5px #6bcc3e;color:#fff;display:block;margin:23px auto 0;padding:9px 10px;text-align:center;width:179px}.ygamd--btn,.ygamd--btn:hover{text-decoration:none}.bCIaD--text--container{text-align:center}.LvaXK--sub-text--container{color:#4c4c4c;display:block;font-size:12px;text-align:center}.n8YiT--close{align-self:flex-end;background-color:transparent;border:none;color:#c0c5cb;cursor:pointer;font-size:17px;margin-right:3px;margin-top:3px;width:30px}.RaqAf--hidden{display:none}.SeJZ7--circle-loader--icon{animation-duration:5s;animation-iteration-count:infinite;animation-name:WyvVm--spin;animation-timing-function:linear}.WSC5Q--icon{margin:0 auto 12px;opacity:.3;width:51px}@keyframes WyvVm--spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}", "" ]), 
        a.locals = {
            "popup--container": "QRXUF--popup--container",
            popupContainer: "QRXUF--popup--container",
            "flex-column": "hLyhm--flex-column",
            flexColumn: "hLyhm--flex-column",
            "popup--title": "RgfD4--popup--title",
            popupTitle: "RgfD4--popup--title",
            "popup--body": "AhDrg--popup--body",
            popupBody: "AhDrg--popup--body",
            btn: "ygamd--btn",
            "text--container": "bCIaD--text--container",
            textContainer: "bCIaD--text--container",
            "sub-text--container": "LvaXK--sub-text--container",
            subTextContainer: "LvaXK--sub-text--container",
            close: "n8YiT--close",
            hidden: "RaqAf--hidden",
            "circle-loader--icon": "SeJZ7--circle-loader--icon",
            circleLoaderIcon: "SeJZ7--circle-loader--icon",
            spin: "WyvVm--spin",
            icon: "WSC5Q--icon"
        };
        const s = /^(319|550|7|947)$/.test(r.j) ? null : a;
    },
    8409: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, {
            default: () => s
        });
        var n = r(1601), o = r.n(n), i = r(6314), a = r.n(i)()(o());
        a.push([ e.id, ".pZfRm--theme-vk .PDcgI--item-container .fQMdz--item{color:#2a5885;display:block;height:30px;line-height:30px;margin-left:0;outline:none;padding:0 15px;position:relative;white-space:nowrap}.pZfRm--theme-vk .PDcgI--item-container .fQMdz--item:hover{background-color:#e4eaf0}.pZfRm--theme-vk .PDcgI--item-container .fQMdz--item .f7Q8h--tooltip{padding:0 10px 3px 6px;right:228px;top:0}.pZfRm--theme-vk .PDcgI--item-container .fQMdz--item .oD3iZ--download-bar{left:0;position:absolute;top:0}.NPxzO--theme-matchtv .PDcgI--item-container{right:185px}.NPxzO--theme-matchtv .PDcgI--item-container .oD3iZ--download-bar{background-image:linear-gradient(90deg,#08aeea1f,#2af598ba)}.PDcgI--item-container{background:#fff;border:1px solid #c5d0db;border-radius:4px;box-shadow:0 1px 3px #50505045;font-size:12px;margin-left:13px;min-width:190px;padding:4px 0;position:absolute;transition:.5s;z-index:9999}.PDcgI--item-container .fQMdz--item{cursor:pointer;padding-bottom:5px;padding-left:9px;padding-top:5px;position:relative}.PDcgI--item-container .fQMdz--item:hover{background:#e6e6e6}.PDcgI--item-container .fQMdz--item.j3QZW--item-disable{opacity:.8}.PDcgI--item-container .qy2hS--message{padding:3px}.PDcgI--item-container.Bzr4Q--show{display:block}.PDcgI--item-container.G2vFf--hide{display:none}", "" ]), 
        a.locals = {
            "theme-vk": "pZfRm--theme-vk",
            themeVk: "pZfRm--theme-vk",
            "item-container": "PDcgI--item-container",
            itemContainer: "PDcgI--item-container",
            item: "fQMdz--item",
            tooltip: "f7Q8h--tooltip",
            "download-bar": "oD3iZ--download-bar",
            downloadBar: "oD3iZ--download-bar",
            "theme-matchtv": "NPxzO--theme-matchtv",
            themeMatchtv: "NPxzO--theme-matchtv",
            "item-disable": "j3QZW--item-disable",
            itemDisable: "j3QZW--item-disable",
            message: "qy2hS--message",
            show: "Bzr4Q--show",
            hide: "G2vFf--hide"
        };
        const s = /^(302|555)$/.test(r.j) ? a : null;
    },
    3413: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, {
            default: () => s
        });
        var n = r(1601), o = r.n(n), i = r(6314), a = r.n(i)()(o());
        a.push([ e.id, ".ezMKQ--ff-downloader{background:#fff;border:1px solid #dedede;border-radius:10px;box-shadow:0 -10px 10px rgba(91,91,91,.06),-10px 0 10px rgba(91,91,91,.06),0 10px 10px rgba(91,91,91,.06);box-sizing:border-box;color:#434343;display:block;font-family:sans-serif;font-size:16px;font-style:normal;font-weight:600;line-height:22px;overflow:hidden;transition:.5s;width:376px;z-index:99999999}.cLKsa--close-btn{background-size:100%;border-radius:4px;cursor:pointer;height:18px;position:absolute;right:9px;top:5px;width:18px}.cLKsa--close-btn:hover{background:#e2dede}.xuGfT--file-name{font-size:12px;font-weight:400;line-height:14px;margin:0 auto;padding:6px 12px}.T4x3y--status{font-size:14px;margin-top:12px;padding-bottom:6px}.T4x3y--status,.JC0It--status-state{display:flex;justify-content:space-between}.JC0It--status-state{width:-moz-fit-content;width:fit-content}.JC0It--status-state>div:first-child{font-weight:700;margin-right:8px}.HNie2--status-percentage{color:#77cb35;font-weight:700}.bteIu--error{color:red;display:flex;font-size:14px;margin-left:12px;padding:10px}.P3d7_--error-text{font-weight:700;margin-right:7px}.jur97--container{height:100%;line-height:1;position:relative}.jur97--container .dEa4m--notice{border:0;color:rgba(0,0,0,.88);font-size:11px;margin-top:21px}.cedlJ--footer{background:#fff;height:40px;width:100%}.cedlJ--footer .HbYD8--loader{align-items:center;animation:uB75W--rotation 3.5s linear forwards;border:5px solid #fff;border-radius:50%;border-top-color:#a29bfe;display:flex;height:70px;justify-content:center;width:70px}.cedlJ--footer .QquOY--loading-bar{background:#dfe6e9;border-radius:5px;height:6px;width:100%}.cedlJ--footer .QquOY--loading-bar .IAhsg--progress-bar{background:#8bc34a;border-radius:5px;height:100%}", "" ]), 
        a.locals = {
            "ff-downloader": "ezMKQ--ff-downloader",
            ffDownloader: "ezMKQ--ff-downloader",
            "close-btn": "cLKsa--close-btn",
            closeBtn: "cLKsa--close-btn",
            "file-name": "xuGfT--file-name",
            fileName: "xuGfT--file-name",
            status: "T4x3y--status",
            "status-state": "JC0It--status-state",
            statusState: "JC0It--status-state",
            "status-percentage": "HNie2--status-percentage",
            statusPercentage: "HNie2--status-percentage",
            error: "bteIu--error",
            "error-text": "P3d7_--error-text",
            errorText: "P3d7_--error-text",
            container: "jur97--container",
            notice: "dEa4m--notice",
            footer: "cedlJ--footer",
            loader: "HbYD8--loader",
            rotation: "uB75W--rotation",
            "loading-bar": "QquOY--loading-bar",
            loadingBar: "QquOY--loading-bar",
            "progress-bar": "IAhsg--progress-bar",
            progressBar: "IAhsg--progress-bar"
        };
        const s = /^(319|550|7|947)$/.test(r.j) ? null : a;
    },
    7229: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, {
            default: () => s
        });
        var n = r(1601), o = r.n(n), i = r(6314), a = r.n(i)()(o());
        a.push([ e.id, ".CsFtJ--ff-downloader{background:#fff;border:1px solid #dedede;border-radius:10px;box-shadow:0 -10px 10px rgba(91,91,91,.06),-10px 0 10px rgba(91,91,91,.06),0 10px 10px rgba(91,91,91,.06);box-sizing:border-box;color:#434343;display:block;font-family:sans-serif;font-size:16px;font-style:normal;font-weight:600;line-height:22px;overflow:hidden;padding:16px 14px;transition:.5s;width:300px;z-index:99999999}.P4mXA--close-btn{background-size:100%;border-radius:4px;cursor:pointer;position:absolute;right:9px;top:-11px}.P4mXA--close-btn:hover{background:#e2dede}.cpsFz--file-name{font-size:14px;font-weight:400;line-height:18px;margin:12px 0;overflow:hidden;text-overflow:ellipsis;width:216px}.hZU4g--status{font-size:14px;margin-top:12px}.hZU4g--status,.DrHpX--status-state{display:flex;justify-content:space-between}.DrHpX--status-state{width:-moz-fit-content;width:fit-content}.DrHpX--status-state>div:first-child{font-weight:700;margin-right:8px}.PJXD4--status-percentage{color:#77cb35;font-weight:700}.zsVmy--error{color:red;display:flex;font-size:14px;margin-left:12px}.pIGFp--error-text{font-weight:700;margin-right:7px}.WQZ2K--container{height:100%;line-height:1;position:relative}.WQZ2K--container .mnC9T--notice{border:0;color:rgba(0,0,0,.88);font-size:11px;margin-top:21px}.lVwsq--footer{background:#fff;width:100%}.lVwsq--footer .DqYKf--loader{align-items:center;animation:qh3Ke--rotation 3.5s linear forwards;border:5px solid #fff;border-radius:50%;border-top-color:#a29bfe;display:flex;height:70px;justify-content:center;width:70px}.lVwsq--footer .rwry6--loading-bar{background:#dfe6e9;border-radius:5px;height:8px;width:100%}.lVwsq--footer .rwry6--loading-bar .e9Lxi--progress-bar{background:#8bc34a;border-radius:6px;height:100%}.ZMQh0--tip-window{align-items:center;color:#434343;font-size:12px;font-style:normal;font-weight:400;justify-content:space-between;line-height:14px;padding:18px 0 0}.ZMQh0--tip-window,.ZMQh0--tip-window .dfyKw--tip-text{display:flex}.ZMQh0--tip-window p{margin:0}.ZMQh0--tip-window a{display:block}.ZMQh0--tip-window a .Yg3bV--tip-window-button{background-color:#8bc34a;border:none;border-radius:2px;color:#fff;font-size:12px;font-style:normal;font-weight:500;height:28px;line-height:12px;width:102px}.ZMQh0--tip-window a .Yg3bV--tip-window-button:hover{cursor:pointer}", "" ]), 
        a.locals = {
            "ff-downloader": "CsFtJ--ff-downloader",
            ffDownloader: "CsFtJ--ff-downloader",
            "close-btn": "P4mXA--close-btn",
            closeBtn: "P4mXA--close-btn",
            "file-name": "cpsFz--file-name",
            fileName: "cpsFz--file-name",
            status: "hZU4g--status",
            "status-state": "DrHpX--status-state",
            statusState: "DrHpX--status-state",
            "status-percentage": "PJXD4--status-percentage",
            statusPercentage: "PJXD4--status-percentage",
            error: "zsVmy--error",
            "error-text": "pIGFp--error-text",
            errorText: "pIGFp--error-text",
            container: "WQZ2K--container",
            notice: "mnC9T--notice",
            footer: "lVwsq--footer",
            loader: "DqYKf--loader",
            rotation: "qh3Ke--rotation",
            "loading-bar": "rwry6--loading-bar",
            loadingBar: "rwry6--loading-bar",
            "progress-bar": "e9Lxi--progress-bar",
            progressBar: "e9Lxi--progress-bar",
            "tip-window": "ZMQh0--tip-window",
            tipWindow: "ZMQh0--tip-window",
            "tip-text": "dfyKw--tip-text",
            tipText: "dfyKw--tip-text",
            "tip-window-button": "Yg3bV--tip-window-button",
            tipWindowButton: "Yg3bV--tip-window-button"
        };
        const s = /^(319|550|7|947)$/.test(r.j) ? null : a;
    },
    7641: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, {
            default: () => p
        });
        var n = r(1601), o = r.n(n), i = r(6314), a = r.n(i), s = r(4417), u = r.n(s), l = new URL(r(4338), r.b), c = a()(o()), d = u()(l);
        c.push([ e.id, `.UdVCi--item--anchor{display:flex;overflow:hidden;padding:0 5px;text-decoration:none;white-space:nowrap}.prmO0--item--container{display:block;width:100%}.prmO0--item--container span{font-weight:700}.f4CSk--televzr-popup-container{border-radius:6px}.joVes--televzr-popup{background-color:#fff;border:1px solid #ccc;border-radius:6px;cursor:default;font-family:arial,sans-serif;font-size:12px;line-height:16px;padding:6px;text-align:center}.CXMBg--televzr-popup-header{background:url(${d}) no-repeat;background-size:100%;height:42px;margin:7px auto 8px;width:114px}.ZxWKC--televzr-popup-footer{color:#63d0ff;font-size:12px;font-weight:400;margin:22px auto 0;white-space:normal;width:195px}.t1Llo--televzr-popup-btn{background:linear-gradient(270deg,#66d1ff,#35c3ff);background-origin:border-box;border:2px solid transparent;border-radius:90px;display:inline-block;font-family:Roboto,sans-serif;font-size:13px;font-weight:500;line-height:18px;margin:0;overflow:hidden;padding:0;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap;width:171px}.t1Llo--televzr-popup-btn .Cqahh--btn-outer{background:#f4f3f3;display:block;padding:13px 15px}.t1Llo--televzr-popup-btn .dWXTY--btn-inner{background:linear-gradient(270deg,#66d1ff,#35c3ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.t1Llo--televzr-popup-btn .dWXTY--btn-inner svg{margin-right:4px;margin-top:-2px}.t1Llo--televzr-popup-btn:disabled{opacity:.5}.t1Llo--televzr-popup-btn.eGq6t--btn-invert{overflow:visible;position:relative}.t1Llo--televzr-popup-btn.eGq6t--btn-invert:before{background:#6dd3ff;border-radius:100px;bottom:-1px;box-shadow:0 3px 0 0;color:#67cefb;content:"";filter:blur(12px);left:10px;position:absolute;right:10px;top:20px}.t1Llo--televzr-popup-btn.eGq6t--btn-invert .Cqahh--btn-outer{background:transparent;padding:7px 8px;position:relative}.t1Llo--televzr-popup-btn.eGq6t--btn-invert .dWXTY--btn-inner{background:none;-webkit-background-clip:border-box;-webkit-text-fill-color:#fff;color:#fff}.t1Llo--televzr-popup-btn.eGq6t--btn-invert .dWXTY--btn-inner svg path{fill:#fff}.t1Llo--televzr-popup-btn.eGq6t--btn-invert:focus,.t1Llo--televzr-popup-btn.eGq6t--btn-invert:hover{background:linear-gradient(90deg,#66d1ff,#35c3ff)}.t1Llo--televzr-popup-btn.PcKdZ--btn-small{border-width:1px;font-size:12px;line-height:15px}.t1Llo--televzr-popup-btn.PcKdZ--btn-small .Cqahh--btn-outer{background:#fff;padding:8px 15px}.t1Llo--televzr-popup-btn:focus,.t1Llo--televzr-popup-btn:hover{outline:none}.t1Llo--televzr-popup-btn:focus .Cqahh--btn-outer,.t1Llo--televzr-popup-btn:hover .Cqahh--btn-outer{background:transparent}.t1Llo--televzr-popup-btn:focus .dWXTY--btn-inner,.t1Llo--televzr-popup-btn:hover .dWXTY--btn-inner{background:none;-webkit-background-clip:border-box;-webkit-text-fill-color:#fff;color:#fff}.t1Llo--televzr-popup-btn:focus .dWXTY--btn-inner svg path,.t1Llo--televzr-popup-btn:hover .dWXTY--btn-inner svg path{fill:#fff}a.t1Llo--televzr-popup-btn.eGq6t--btn-invert{text-decoration:none}.kmEfv--popupAngle{border-bottom:8px solid transparent;border-image:initial;border-left-color:initial;border-left-style:none;border-left-width:0;border-right:10px solid #fff;border-top:8px solid transparent;display:inline-block;left:-9px;position:absolute;top:8px;width:0;z-index:1}.g4YIh--popupAngle--shadow{border-right-color:#c0bbbb;border-width:8px 11px 9px 0;left:-10px;top:8px;z-index:0}.Os46T--logo{height:17px;margin-left:5px;vertical-align:middle;width:19px}.Ao8pv--circle-loader--icon{animation-duration:5s;animation-iteration-count:infinite;animation-name:ltw0S--spin;animation-timing-function:linear}.UYVvF--icon--check{margin-bottom:-13px!important}.jpd8e--icon{margin:0 auto 12px;opacity:.3;width:51px}@keyframes ltw0S--spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}`, "" ]), 
        c.locals = {
            "item--anchor": "UdVCi--item--anchor",
            itemAnchor: "UdVCi--item--anchor",
            "item--container": "prmO0--item--container",
            itemContainer: "prmO0--item--container",
            "televzr-popup-container": "f4CSk--televzr-popup-container",
            televzrPopupContainer: "f4CSk--televzr-popup-container",
            "televzr-popup": "joVes--televzr-popup",
            televzrPopup: "joVes--televzr-popup",
            "televzr-popup-header": "CXMBg--televzr-popup-header",
            televzrPopupHeader: "CXMBg--televzr-popup-header",
            "televzr-popup-footer": "ZxWKC--televzr-popup-footer",
            televzrPopupFooter: "ZxWKC--televzr-popup-footer",
            "televzr-popup-btn": "t1Llo--televzr-popup-btn",
            televzrPopupBtn: "t1Llo--televzr-popup-btn",
            "btn-outer": "Cqahh--btn-outer",
            btnOuter: "Cqahh--btn-outer",
            "btn-inner": "dWXTY--btn-inner",
            btnInner: "dWXTY--btn-inner",
            "btn-invert": "eGq6t--btn-invert",
            btnInvert: "eGq6t--btn-invert",
            "btn-small": "PcKdZ--btn-small",
            btnSmall: "PcKdZ--btn-small",
            popupAngle: "kmEfv--popupAngle",
            "popupAngle--shadow": "g4YIh--popupAngle--shadow",
            popupAngleShadow: "g4YIh--popupAngle--shadow",
            logo: "Os46T--logo",
            "circle-loader--icon": "Ao8pv--circle-loader--icon",
            circleLoaderIcon: "Ao8pv--circle-loader--icon",
            spin: "ltw0S--spin",
            "icon--check": "UYVvF--icon--check",
            iconCheck: "UYVvF--icon--check",
            icon: "jpd8e--icon"
        };
        const p = /^(319|550|7|947)$/.test(r.j) ? null : c;
    },
    6314: e => {
        "use strict";
        e.exports = function(e) {
            var t = [];
            return t.toString = function() {
                return this.map((function(t) {
                    var r = "", n = void 0 !== t[5];
                    return t[4] && (r += "@supports (".concat(t[4], ") {")), t[2] && (r += "@media ".concat(t[2], " {")), 
                    n && (r += "@layer".concat(t[5].length > 0 ? " ".concat(t[5]) : "", " {")), r += e(t), 
                    n && (r += "}"), t[2] && (r += "}"), t[4] && (r += "}"), r;
                })).join("");
            }, t.i = function(e, r, n, o, i) {
                "string" == typeof e && (e = [ [ null, e, void 0 ] ]);
                var a = {};
                if (n) for (var s = 0; s < this.length; s++) {
                    var u = this[s][0];
                    null != u && (a[u] = !0);
                }
                for (var l = 0; l < e.length; l++) {
                    var c = [].concat(e[l]);
                    n && a[c[0]] || (void 0 !== i && (void 0 === c[5] || (c[1] = "@layer".concat(c[5].length > 0 ? " ".concat(c[5]) : "", " {").concat(c[1], "}")), 
                    c[5] = i), r && (c[2] ? (c[1] = "@media ".concat(c[2], " {").concat(c[1], "}"), 
                    c[2] = r) : c[2] = r), o && (c[4] ? (c[1] = "@supports (".concat(c[4], ") {").concat(c[1], "}"), 
                    c[4] = o) : c[4] = "".concat(o)), t.push(c));
                }
            }, t;
        };
    },
    4417: e => {
        "use strict";
        e.exports = function(e, t) {
            return t || (t = {}), e ? (e = String(e.__esModule ? e.default : e), /^['"].*['"]$/.test(e) && (e = e.slice(1, -1)), 
            t.hash && (e += t.hash), /["'() \t\n]|(%20)/.test(e) || t.needQuotes ? '"'.concat(e.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : e) : e;
        };
    },
    1601: e => {
        "use strict";
        e.exports = function(e) {
            return e[1];
        };
    },
    2875: (e, t, r) => {
        var n = r(6059).Ay;
        e.exports = n;
    },
    6059: (e, t) => {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
        };
        function n(e) {
            return e && "object" === (void 0 === e ? "undefined" : r(e)) && "string" == typeof e.name && "string" == typeof e.message;
        }
        t.Ay = function(e) {
            return n(e) ? Object.assign(new Error, {
                stack: void 0
            }, e) : e;
        };
    },
    5299: (e, t, r) => {
        "use strict";
        r.d(t, {
            Ob: () => pe,
            d5: () => V,
            Ay: () => Ie,
            xJ: () => Ae
        });
        var n, o, i, a, s = r(172), u = 0, l = [], c = [], d = s.fF, p = d.__b, A = d.__r, h = d.diffed, f = d.__c, g = d.unmount, v = d.__;
        function I(e, t) {
            d.__h && d.__h(o, e, u || t), u = 0;
            var r = o.__H || (o.__H = {
                __: [],
                __h: []
            });
            return e >= r.__.length && r.__.push({
                __V: c
            }), r.__[e];
        }
        function C(e) {
            return u = 1, m(F, e);
        }
        function m(e, t, r) {
            var i = I(n++, 2);
            if (i.t = e, !i.__c && (i.__ = [ r ? r(t) : F(void 0, t), function(e) {
                var t = i.__N ? i.__N[0] : i.__[0], r = i.t(t, e);
                t !== r && (i.__N = [ r, i.__[1] ], i.__c.setState({}));
            } ], i.__c = o, !o.u)) {
                var a = function(e, t, r) {
                    if (!i.__c.__H) return !0;
                    var n = i.__c.__H.__.filter((function(e) {
                        return !!e.__c;
                    }));
                    if (n.every((function(e) {
                        return !e.__N;
                    }))) return !s || s.call(this, e, t, r);
                    var o = !1;
                    return n.forEach((function(e) {
                        if (e.__N) {
                            var t = e.__[0];
                            e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (o = !0);
                        }
                    })), !(!o && i.__c.props === e) && (!s || s.call(this, e, t, r));
                };
                o.u = !0;
                var s = o.shouldComponentUpdate, u = o.componentWillUpdate;
                o.componentWillUpdate = function(e, t, r) {
                    if (this.__e) {
                        var n = s;
                        s = void 0, a(e, t, r), s = n;
                    }
                    u && u.call(this, e, t, r);
                }, o.shouldComponentUpdate = a;
            }
            return i.__N || i.__;
        }
        function E(e, t) {
            var r = I(n++, 3);
            !d.__s && S(r.__H, t) && (r.__ = e, r.i = t, o.__H.__h.push(r));
        }
        function y(e, t) {
            var r = I(n++, 4);
            !d.__s && S(r.__H, t) && (r.__ = e, r.i = t, o.__h.push(r));
        }
        function w(e, t) {
            var r = I(n++, 7);
            return S(r.__H, t) ? (r.__V = e(), r.i = t, r.__h = e, r.__V) : r.__;
        }
        function b() {
            for (var e; e = l.shift(); ) if (e.__P && e.__H) try {
                e.__H.__h.forEach(k), e.__H.__h.forEach(O), e.__H.__h = [];
            } catch (t) {
                e.__H.__h = [], d.__e(t, e.__v);
            }
        }
        d.__b = function(e) {
            o = null, p && p(e);
        }, d.__ = function(e, t) {
            e && t.__k && t.__k.__m && (e.__m = t.__k.__m), v && v(e, t);
        }, d.__r = function(e) {
            A && A(e), n = 0;
            var t = (o = e.__c).__H;
            t && (i === o ? (t.__h = [], o.__h = [], t.__.forEach((function(e) {
                e.__N && (e.__ = e.__N), e.__V = c, e.__N = e.i = void 0;
            }))) : (t.__h.forEach(k), t.__h.forEach(O), t.__h = [], n = 0)), i = o;
        }, d.diffed = function(e) {
            h && h(e);
            var t = e.__c;
            t && t.__H && (t.__H.__h.length && (1 !== l.push(t) && a === d.requestAnimationFrame || ((a = d.requestAnimationFrame) || R)(b)), 
            t.__H.__.forEach((function(e) {
                e.i && (e.__H = e.i), e.__V !== c && (e.__ = e.__V), e.i = void 0, e.__V = c;
            }))), i = o = null;
        }, d.__c = function(e, t) {
            t.some((function(e) {
                try {
                    e.__h.forEach(k), e.__h = e.__h.filter((function(e) {
                        return !e.__ || O(e);
                    }));
                } catch (r) {
                    t.some((function(e) {
                        e.__h && (e.__h = []);
                    })), t = [], d.__e(r, e.__v);
                }
            })), f && f(e, t);
        }, d.unmount = function(e) {
            g && g(e);
            var t, r = e.__c;
            r && r.__H && (r.__H.__.forEach((function(e) {
                try {
                    k(e);
                } catch (e) {
                    t = e;
                }
            })), r.__H = void 0, t && d.__e(t, r.__v));
        };
        var x = "function" == typeof requestAnimationFrame;
        function R(e) {
            var t, r = function() {
                clearTimeout(n), x && cancelAnimationFrame(t), setTimeout(e);
            }, n = setTimeout(r, 100);
            x && (t = requestAnimationFrame(r));
        }
        function k(e) {
            var t = o, r = e.__c;
            "function" == typeof r && (e.__c = void 0, r()), o = t;
        }
        function O(e) {
            var t = o;
            e.__c = e.__(), o = t;
        }
        function S(e, t) {
            return !e || e.length !== t.length || t.some((function(t, r) {
                return t !== e[r];
            }));
        }
        function F(e, t) {
            return "function" == typeof t ? t(e) : t;
        }
        function j(e, t) {
            for (var r in t) e[r] = t[r];
            return e;
        }
        function L(e, t) {
            for (var r in e) if ("__source" !== r && !(r in t)) return !0;
            for (var n in t) if ("__source" !== n && e[n] !== t[n]) return !0;
            return !1;
        }
        function D(e, t) {
            this.props = e, this.context = t;
        }
        (D.prototype = new s.uA).isPureReactComponent = !0, D.prototype.shouldComponentUpdate = function(e, t) {
            return L(this.props, e) || L(this.state, t);
        };
        var B = s.fF.__b;
        s.fF.__b = function(e) {
            e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), B && B(e);
        };
        var Q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
        var M = function(e, t) {
            return null == e ? null : (0, s.v2)((0, s.v2)(e).map(t));
        }, H = {
            map: M,
            forEach: M,
            count: function(e) {
                return e ? (0, s.v2)(e).length : 0;
            },
            only: function(e) {
                var t = (0, s.v2)(e);
                if (1 !== t.length) throw "Children.only";
                return t[0];
            },
            toArray: s.v2
        }, T = s.fF.__e;
        s.fF.__e = function(e, t, r, n) {
            if (e.then) for (var o, i = t; i = i.__; ) if ((o = i.__c) && o.__c) return null == t.__e && (t.__e = r.__e, 
            t.__k = r.__k), o.__c(e, t);
            T(e, t, r, n);
        };
        var G = s.fF.unmount;
        function N(e, t, r) {
            return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach((function(e) {
                "function" == typeof e.__c && e.__c();
            })), e.__c.__H = null), null != (e = j({}, e)).__c && (e.__c.__P === r && (e.__c.__P = t), 
            e.__c = null), e.__k = e.__k && e.__k.map((function(e) {
                return N(e, t, r);
            }))), e;
        }
        function U(e, t, r) {
            return e && r && (e.__v = null, e.__k = e.__k && e.__k.map((function(e) {
                return U(e, t, r);
            })), e.__c && e.__c.__P === t && (e.__e && r.appendChild(e.__e), e.__c.__e = !0, 
            e.__c.__P = r)), e;
        }
        function z() {
            this.__u = 0, this.t = null, this.__b = null;
        }
        function K(e) {
            var t = e.__.__c;
            return t && t.__a && t.__a(e);
        }
        function J() {
            this.u = null, this.o = null;
        }
        s.fF.unmount = function(e) {
            var t = e.__c;
            t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), G && G(e);
        }, (z.prototype = new s.uA).__c = function(e, t) {
            var r = t.__c, n = this;
            null == n.t && (n.t = []), n.t.push(r);
            var o = K(n.__v), i = !1, a = function() {
                i || (i = !0, r.__R = null, o ? o(s) : s());
            };
            r.__R = a;
            var s = function() {
                if (! --n.__u) {
                    if (n.state.__a) {
                        var e = n.state.__a;
                        n.__v.__k[0] = U(e, e.__c.__P, e.__c.__O);
                    }
                    var t;
                    for (n.setState({
                        __a: n.__b = null
                    }); t = n.t.pop(); ) t.forceUpdate();
                }
            };
            n.__u++ || 32 & t.__u || n.setState({
                __a: n.__b = n.__v.__k[0]
            }), e.then(a, a);
        }, z.prototype.componentWillUnmount = function() {
            this.t = [];
        }, z.prototype.render = function(e, t) {
            if (this.__b) {
                if (this.__v.__k) {
                    var r = document.createElement("div"), n = this.__v.__k[0].__c;
                    this.__v.__k[0] = N(this.__b, r, n.__O = n.__P);
                }
                this.__b = null;
            }
            var o = t.__a && (0, s.n)(s.FK, null, e.fallback);
            return o && (o.__u &= -33), [ (0, s.n)(s.FK, null, t.__a ? null : e.children), o ];
        };
        var X = function(e, t, r) {
            if (++r[1] === r[0] && e.o.delete(t), e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.o.size)) for (r = e.u; r; ) {
                for (;r.length > 3; ) r.pop()();
                if (r[1] < r[0]) break;
                e.u = r = r[2];
            }
        };
        function Y(e) {
            return this.getChildContext = function() {
                return e.context;
            }, e.children;
        }
        function P(e) {
            var t = this, r = e.i;
            t.componentWillUnmount = function() {
                (0, s.XX)(null, t.l), t.l = null, t.i = null;
            }, t.i && t.i !== r && t.componentWillUnmount(), t.l || (t.i = r, t.l = {
                nodeType: 1,
                parentNode: r,
                childNodes: [],
                appendChild: function(e) {
                    this.childNodes.push(e), t.i.appendChild(e);
                },
                insertBefore: function(e, r) {
                    this.childNodes.push(e), t.i.appendChild(e);
                },
                removeChild: function(e) {
                    this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), t.i.removeChild(e);
                }
            }), (0, s.XX)((0, s.n)(Y, {
                context: t.context
            }, e.__v), t.l);
        }
        function V(e, t) {
            var r = (0, s.n)(P, {
                __v: e,
                i: t
            });
            return r.containerInfo = t, r;
        }
        (J.prototype = new s.uA).__a = function(e) {
            var t = this, r = K(t.__v), n = t.o.get(e);
            return n[0]++, function(o) {
                var i = function() {
                    t.props.revealOrder ? (n.push(o), X(t, e, n)) : o();
                };
                r ? r(i) : i();
            };
        }, J.prototype.render = function(e) {
            this.u = null, this.o = new Map;
            var t = (0, s.v2)(e.children);
            e.revealOrder && "b" === e.revealOrder[0] && t.reverse();
            for (var r = t.length; r--; ) this.o.set(t[r], this.u = [ 1, 0, this.u ]);
            return e.children;
        }, J.prototype.componentDidUpdate = J.prototype.componentDidMount = function() {
            var e = this;
            this.o.forEach((function(t, r) {
                X(e, r, t);
            }));
        };
        var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, W = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Z = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, _ = /[A-Z0-9]/g, $ = "undefined" != typeof document, ee = function(e) {
            return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(e);
        };
        s.uA.prototype.isReactComponent = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach((function(e) {
            Object.defineProperty(s.uA.prototype, e, {
                configurable: !0,
                get: function() {
                    return this["UNSAFE_" + e];
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        configurable: !0,
                        writable: !0,
                        value: t
                    });
                }
            });
        }));
        var te = s.fF.event;
        function re() {}
        function ne() {
            return this.cancelBubble;
        }
        function oe() {
            return this.defaultPrevented;
        }
        s.fF.event = function(e) {
            return te && (e = te(e)), e.persist = re, e.isPropagationStopped = ne, e.isDefaultPrevented = oe, 
            e.nativeEvent = e;
        };
        var ie, ae = {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return this.class;
            }
        }, se = s.fF.vnode;
        s.fF.vnode = function(e) {
            "string" == typeof e.type && function(e) {
                var t = e.props, r = e.type, n = {};
                for (var o in t) {
                    var i = t[o];
                    if (!("value" === o && "defaultValue" in t && null == i || $ && "children" === o && "noscript" === r || "class" === o || "className" === o)) {
                        var a = o.toLowerCase();
                        "defaultValue" === o && "value" in t && null == t.value ? o = "value" : "download" === o && !0 === i ? i = "" : "translate" === a && "no" === i ? i = !1 : "ondoubleclick" === a ? o = "ondblclick" : "onchange" !== a || "input" !== r && "textarea" !== r || ee(t.type) ? "onfocus" === a ? o = "onfocusin" : "onblur" === a ? o = "onfocusout" : Z.test(o) ? o = a : -1 === r.indexOf("-") && W.test(o) ? o = o.replace(_, "-$&").toLowerCase() : null === i && (i = void 0) : a = o = "oninput", 
                        "oninput" === a && n[o = a] && (o = "oninputCapture"), n[o] = i;
                    }
                }
                "select" == r && n.multiple && Array.isArray(n.value) && (n.value = (0, s.v2)(t.children).forEach((function(e) {
                    e.props.selected = -1 != n.value.indexOf(e.props.value);
                }))), "select" == r && null != n.defaultValue && (n.value = (0, s.v2)(t.children).forEach((function(e) {
                    e.props.selected = n.multiple ? -1 != n.defaultValue.indexOf(e.props.value) : n.defaultValue == e.props.value;
                }))), t.class && !t.className ? (n.class = t.class, Object.defineProperty(n, "className", ae)) : (t.className && !t.class || t.class && t.className) && (n.class = n.className = t.className), 
                e.props = n;
            }(e), e.$$typeof = q, se && se(e);
        };
        var ue = s.fF.__r;
        s.fF.__r = function(e) {
            ue && ue(e), ie = e.__c;
        };
        var le = s.fF.diffed;
        s.fF.diffed = function(e) {
            le && le(e);
            var t = e.props, r = e.__e;
            null != r && "textarea" === e.type && "value" in t && t.value !== r.value && (r.value = null == t.value ? "" : t.value), 
            ie = null;
        };
        var ce = {
            ReactCurrentDispatcher: {
                current: {
                    readContext: function(e) {
                        return ie.__n[e.__c].props.value;
                    }
                }
            }
        };
        function de(e) {
            return !!e && e.$$typeof === q;
        }
        function pe(e) {
            return de(e) ? s.Ob.apply(null, arguments) : e;
        }
        function Ae(e) {
            return !!e.__k && ((0, s.XX)(null, e), !0);
        }
        var he = s.FK;
        function fe(e) {
            e();
        }
        var ge = de;
        function ve(e) {
            var t, r, n = e.v, o = e.__;
            try {
                var i = n();
                return !((t = o) === (r = i) && (0 !== t || 1 / t == 1 / r) || t != t && r != r);
            } catch (e) {
                return !0;
            }
        }
        var Ie = {
            useState: C,
            useId: function() {
                var e = I(n++, 11);
                if (!e.__) {
                    for (var t = o.__v; null !== t && !t.__m && null !== t.__; ) t = t.__;
                    var r = t.__m || (t.__m = [ 0, 0 ]);
                    e.__ = "P" + r[0] + "-" + r[1]++;
                }
                return e.__;
            },
            useReducer: m,
            useEffect: E,
            useLayoutEffect: y,
            useInsertionEffect: y,
            useTransition: function() {
                return [ !1, fe ];
            },
            useDeferredValue: function(e) {
                return e;
            },
            useSyncExternalStore: function(e, t) {
                var r = t(), n = C({
                    h: {
                        __: r,
                        v: t
                    }
                }), o = n[0].h, i = n[1];
                return y((function() {
                    o.__ = r, o.v = t, ve(o) && i({
                        h: o
                    });
                }), [ e, r, t ]), E((function() {
                    return ve(o) && i({
                        h: o
                    }), e((function() {
                        ve(o) && i({
                            h: o
                        });
                    }));
                }), [ e ]), r;
            },
            startTransition: fe,
            useRef: function(e) {
                return u = 5, w((function() {
                    return {
                        current: e
                    };
                }), []);
            },
            useImperativeHandle: function(e, t, r) {
                u = 6, y((function() {
                    return "function" == typeof e ? (e(t()), function() {
                        return e(null);
                    }) : e ? (e.current = t(), function() {
                        return e.current = null;
                    }) : void 0;
                }), null == r ? r : r.concat(e));
            },
            useMemo: w,
            useCallback: function(e, t) {
                return u = 8, w((function() {
                    return e;
                }), t);
            },
            useContext: function(e) {
                var t = o.context[e.__c], r = I(n++, 9);
                return r.c = e, t ? (null == r.__ && (r.__ = !0, t.sub(o)), t.props.value) : e.__;
            },
            useDebugValue: function(e, t) {
                d.useDebugValue && d.useDebugValue(t ? t(e) : e);
            },
            version: "17.0.2",
            Children: H,
            render: function(e, t, r) {
                return null == t.__k && (t.textContent = ""), (0, s.XX)(e, t), "function" == typeof r && r(), 
                e ? e.__c : null;
            },
            hydrate: function(e, t, r) {
                return (0, s.Qv)(e, t), "function" == typeof r && r(), e ? e.__c : null;
            },
            unmountComponentAtNode: Ae,
            createPortal: V,
            createElement: s.n,
            createContext: s.q6,
            createFactory: function(e) {
                return s.n.bind(null, e);
            },
            cloneElement: pe,
            createRef: s._3,
            Fragment: s.FK,
            isValidElement: de,
            isElement: ge,
            isFragment: function(e) {
                return de(e) && e.type === s.FK;
            },
            isMemo: function(e) {
                return !!e && !!e.displayName && ("string" == typeof e.displayName || e.displayName instanceof String) && e.displayName.startsWith("Memo(");
            },
            findDOMNode: function(e) {
                return e && (e.base || 1 === e.nodeType && e) || null;
            },
            Component: s.uA,
            PureComponent: D,
            memo: function(e, t) {
                function r(e) {
                    var r = this.props.ref, n = r == e.ref;
                    return !n && r && (r.call ? r(null) : r.current = null), t ? !t(this.props, e) || !n : L(this.props, e);
                }
                function n(t) {
                    return this.shouldComponentUpdate = r, (0, s.n)(e, t);
                }
                return n.displayName = "Memo(" + (e.displayName || e.name) + ")", n.prototype.isReactComponent = !0, 
                n.__f = !0, n;
            },
            forwardRef: function(e) {
                function t(t) {
                    var r = j({}, t);
                    return delete r.ref, e(r, t.ref || null);
                }
                return t.$$typeof = Q, t.render = t, t.prototype.isReactComponent = t.__f = !0, 
                t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
            },
            flushSync: function(e, t) {
                return e(t);
            },
            unstable_batchedUpdates: function(e, t) {
                return e(t);
            },
            StrictMode: he,
            Suspense: z,
            SuspenseList: J,
            lazy: function(e) {
                var t, r, n;
                function o(o) {
                    if (t || (t = e()).then((function(e) {
                        r = e.default || e;
                    }), (function(e) {
                        n = e;
                    })), n) throw n;
                    if (!r) throw t;
                    return (0, s.n)(r, o);
                }
                return o.displayName = "Lazy", o.__f = !0, o;
            },
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ce
        };
    },
    172: (e, t, r) => {
        "use strict";
        r.d(t, {
            FK: () => w,
            Ob: () => X,
            Qv: () => J,
            XX: () => K,
            _3: () => y,
            fF: () => o,
            n: () => m,
            q6: () => Y,
            uA: () => b,
            v2: () => L
        });
        var n, o, i, a, s, u, l, c, d, p, A, h = {}, f = [], g = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, v = Array.isArray;
        function I(e, t) {
            for (var r in t) e[r] = t[r];
            return e;
        }
        function C(e) {
            var t = e.parentNode;
            t && t.removeChild(e);
        }
        function m(e, t, r) {
            var o, i, a, s = {};
            for (a in t) "key" == a ? o = t[a] : "ref" == a ? i = t[a] : s[a] = t[a];
            if (arguments.length > 2 && (s.children = arguments.length > 3 ? n.call(arguments, 2) : r), 
            "function" == typeof e && null != e.defaultProps) for (a in e.defaultProps) void 0 === s[a] && (s[a] = e.defaultProps[a]);
            return E(e, s, o, i, null);
        }
        function E(e, t, r, n, a) {
            var s = {
                type: e,
                props: t,
                key: r,
                ref: n,
                __k: null,
                __: null,
                __b: 0,
                __e: null,
                __d: void 0,
                __c: null,
                constructor: void 0,
                __v: null == a ? ++i : a,
                __i: -1,
                __u: 0
            };
            return null == a && null != o.vnode && o.vnode(s), s;
        }
        function y() {
            return {
                current: null
            };
        }
        function w(e) {
            return e.children;
        }
        function b(e, t) {
            this.props = e, this.context = t;
        }
        function x(e, t) {
            if (null == t) return e.__ ? x(e.__, e.__i + 1) : null;
            for (var r; t < e.__k.length; t++) if (null != (r = e.__k[t]) && null != r.__e) return r.__e;
            return "function" == typeof e.type ? x(e) : null;
        }
        function R(e) {
            var t, r;
            if (null != (e = e.__) && null != e.__c) {
                for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if (null != (r = e.__k[t]) && null != r.__e) {
                    e.__e = e.__c.base = r.__e;
                    break;
                }
                return R(e);
            }
        }
        function k(e) {
            (!e.__d && (e.__d = !0) && a.push(e) && !O.__r++ || s !== o.debounceRendering) && ((s = o.debounceRendering) || u)(O);
        }
        function O() {
            var e, t, r, n, i, s, u, c;
            for (a.sort(l); e = a.shift(); ) e.__d && (t = a.length, n = void 0, s = (i = (r = e).__v).__e, 
            u = [], c = [], r.__P && ((n = I({}, i)).__v = i.__v + 1, o.vnode && o.vnode(n), 
            H(r.__P, n, i, r.__n, void 0 !== r.__P.ownerSVGElement, 32 & i.__u ? [ s ] : null, u, null == s ? x(i) : s, !!(32 & i.__u), c), 
            n.__v = i.__v, n.__.__k[n.__i] = n, T(u, n, c), n.__e != s && R(n)), a.length > t && a.sort(l));
            O.__r = 0;
        }
        function S(e, t, r, n, o, i, a, s, u, l, c) {
            var d, p, A, g, v, I = n && n.__k || f, C = t.length;
            for (r.__d = u, F(r, t, I), u = r.__d, d = 0; d < C; d++) null != (A = r.__k[d]) && "boolean" != typeof A && "function" != typeof A && (p = -1 === A.__i ? h : I[A.__i] || h, 
            A.__i = d, H(e, A, p, o, i, a, s, u, l, c), g = A.__e, A.ref && p.ref != A.ref && (p.ref && N(p.ref, null, A), 
            c.push(A.ref, A.__c || g, A)), null == v && null != g && (v = g), 65536 & A.__u || p.__k === A.__k ? (u && !u.isConnected && (u = x(p)), 
            u = j(A, u, e)) : "function" == typeof A.type && void 0 !== A.__d ? u = A.__d : g && (u = g.nextSibling), 
            A.__d = void 0, A.__u &= -196609);
            r.__d = u, r.__e = v;
        }
        function F(e, t, r) {
            var n, o, i, a, s, u = t.length, l = r.length, c = l, d = 0;
            for (e.__k = [], n = 0; n < u; n++) a = n + d, null != (o = e.__k[n] = null == (o = t[n]) || "boolean" == typeof o || "function" == typeof o ? null : "string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? E(null, o, null, null, null) : v(o) ? E(w, {
                children: o
            }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? E(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : o) ? (o.__ = e, 
            o.__b = e.__b + 1, s = D(o, r, a, c), o.__i = s, i = null, -1 !== s && (c--, (i = r[s]) && (i.__u |= 131072)), 
            null == i || null === i.__v ? (-1 == s && d--, "function" != typeof o.type && (o.__u |= 65536)) : s !== a && (s === a + 1 ? d++ : s > a ? c > u - a ? d += s - a : d-- : s < a ? s == a - 1 && (d = s - a) : d = 0, 
            s !== n + d && (o.__u |= 65536))) : (i = r[a]) && null == i.key && i.__e && !(131072 & i.__u) && (i.__e == e.__d && (e.__d = x(i)), 
            U(i, i, !1), r[a] = null, c--);
            if (c) for (n = 0; n < l; n++) null != (i = r[n]) && !(131072 & i.__u) && (i.__e == e.__d && (e.__d = x(i)), 
            U(i, i));
        }
        function j(e, t, r) {
            var n, o;
            if ("function" == typeof e.type) {
                for (n = e.__k, o = 0; n && o < n.length; o++) n[o] && (n[o].__ = e, t = j(n[o], t, r));
                return t;
            }
            e.__e != t && (r.insertBefore(e.__e, t || null), t = e.__e);
            do {
                t = t && t.nextSibling;
            } while (null != t && 8 === t.nodeType);
            return t;
        }
        function L(e, t) {
            return t = t || [], null == e || "boolean" == typeof e || (v(e) ? e.some((function(e) {
                L(e, t);
            })) : t.push(e)), t;
        }
        function D(e, t, r, n) {
            var o = e.key, i = e.type, a = r - 1, s = r + 1, u = t[r];
            if (null === u || u && o == u.key && i === u.type && !(131072 & u.__u)) return r;
            if (n > (null == u || 131072 & u.__u ? 0 : 1)) for (;a >= 0 || s < t.length; ) {
                if (a >= 0) {
                    if ((u = t[a]) && !(131072 & u.__u) && o == u.key && i === u.type) return a;
                    a--;
                }
                if (s < t.length) {
                    if ((u = t[s]) && !(131072 & u.__u) && o == u.key && i === u.type) return s;
                    s++;
                }
            }
            return -1;
        }
        function B(e, t, r) {
            "-" === t[0] ? e.setProperty(t, null == r ? "" : r) : e[t] = null == r ? "" : "number" != typeof r || g.test(t) ? r : r + "px";
        }
        function Q(e, t, r, n, o) {
            var i;
            e: if ("style" === t) if ("string" == typeof r) e.style.cssText = r; else {
                if ("string" == typeof n && (e.style.cssText = n = ""), n) for (t in n) r && t in r || B(e.style, t, "");
                if (r) for (t in r) n && r[t] === n[t] || B(e.style, t, r[t]);
            } else if ("o" === t[0] && "n" === t[1]) i = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), 
            t = t.toLowerCase() in e || "onFocusOut" === t || "onFocusIn" === t ? t.toLowerCase().slice(2) : t.slice(2), 
            e.l || (e.l = {}), e.l[t + i] = r, r ? n ? r.u = n.u : (r.u = c, e.addEventListener(t, i ? p : d, i)) : e.removeEventListener(t, i ? p : d, i); else {
                if (o) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s"); else if ("width" != t && "height" != t && "href" != t && "list" != t && "form" != t && "tabIndex" != t && "download" != t && "rowSpan" != t && "colSpan" != t && "role" != t && t in e) try {
                    e[t] = null == r ? "" : r;
                    break e;
                } catch (e) {}
                "function" == typeof r || (null == r || !1 === r && "-" !== t[4] ? e.removeAttribute(t) : e.setAttribute(t, r));
            }
        }
        function M(e) {
            return function(t) {
                if (this.l) {
                    var r = this.l[t.type + e];
                    if (null == t.t) t.t = c++; else if (t.t < r.u) return;
                    return r(o.event ? o.event(t) : t);
                }
            };
        }
        function H(e, t, r, n, i, a, s, u, l, c) {
            var d, p, A, h, f, g, C, m, E, y, x, R, k, O, F, j = t.type;
            if (void 0 !== t.constructor) return null;
            128 & r.__u && (l = !!(32 & r.__u), a = [ u = t.__e = r.__e ]), (d = o.__b) && d(t);
            e: if ("function" == typeof j) try {
                if (m = t.props, E = (d = j.contextType) && n[d.__c], y = d ? E ? E.props.value : d.__ : n, 
                r.__c ? C = (p = t.__c = r.__c).__ = p.__E : ("prototype" in j && j.prototype.render ? t.__c = p = new j(m, y) : (t.__c = p = new b(m, y), 
                p.constructor = j, p.render = z), E && E.sub(p), p.props = m, p.state || (p.state = {}), 
                p.context = y, p.__n = n, A = p.__d = !0, p.__h = [], p._sb = []), null == p.__s && (p.__s = p.state), 
                null != j.getDerivedStateFromProps && (p.__s == p.state && (p.__s = I({}, p.__s)), 
                I(p.__s, j.getDerivedStateFromProps(m, p.__s))), h = p.props, f = p.state, p.__v = t, 
                A) null == j.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), 
                null != p.componentDidMount && p.__h.push(p.componentDidMount); else {
                    if (null == j.getDerivedStateFromProps && m !== h && null != p.componentWillReceiveProps && p.componentWillReceiveProps(m, y), 
                    !p.__e && (null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(m, p.__s, y) || t.__v === r.__v)) {
                        for (t.__v !== r.__v && (p.props = m, p.state = p.__s, p.__d = !1), t.__e = r.__e, 
                        t.__k = r.__k, t.__k.forEach((function(e) {
                            e && (e.__ = t);
                        })), x = 0; x < p._sb.length; x++) p.__h.push(p._sb[x]);
                        p._sb = [], p.__h.length && s.push(p);
                        break e;
                    }
                    null != p.componentWillUpdate && p.componentWillUpdate(m, p.__s, y), null != p.componentDidUpdate && p.__h.push((function() {
                        p.componentDidUpdate(h, f, g);
                    }));
                }
                if (p.context = y, p.props = m, p.__P = e, p.__e = !1, R = o.__r, k = 0, "prototype" in j && j.prototype.render) {
                    for (p.state = p.__s, p.__d = !1, R && R(t), d = p.render(p.props, p.state, p.context), 
                    O = 0; O < p._sb.length; O++) p.__h.push(p._sb[O]);
                    p._sb = [];
                } else do {
                    p.__d = !1, R && R(t), d = p.render(p.props, p.state, p.context), p.state = p.__s;
                } while (p.__d && ++k < 25);
                p.state = p.__s, null != p.getChildContext && (n = I(I({}, n), p.getChildContext())), 
                A || null == p.getSnapshotBeforeUpdate || (g = p.getSnapshotBeforeUpdate(h, f)), 
                S(e, v(F = null != d && d.type === w && null == d.key ? d.props.children : d) ? F : [ F ], t, r, n, i, a, s, u, l, c), 
                p.base = t.__e, t.__u &= -161, p.__h.length && s.push(p), C && (p.__E = p.__ = null);
            } catch (e) {
                t.__v = null, l || null != a ? (t.__e = u, t.__u |= l ? 160 : 32, a[a.indexOf(u)] = null) : (t.__e = r.__e, 
                t.__k = r.__k), o.__e(e, t, r);
            } else null == a && t.__v === r.__v ? (t.__k = r.__k, t.__e = r.__e) : t.__e = G(r.__e, t, r, n, i, a, s, l, c);
            (d = o.diffed) && d(t);
        }
        function T(e, t, r) {
            t.__d = void 0;
            for (var n = 0; n < r.length; n++) N(r[n], r[++n], r[++n]);
            o.__c && o.__c(t, e), e.some((function(t) {
                try {
                    e = t.__h, t.__h = [], e.some((function(e) {
                        e.call(t);
                    }));
                } catch (e) {
                    o.__e(e, t.__v);
                }
            }));
        }
        function G(e, t, r, o, i, a, s, u, l) {
            var c, d, p, A, f, g, I, m = r.props, E = t.props, y = t.type;
            if ("svg" === y && (i = !0), null != a) for (c = 0; c < a.length; c++) if ((f = a[c]) && "setAttribute" in f == !!y && (y ? f.localName === y : 3 === f.nodeType)) {
                e = f, a[c] = null;
                break;
            }
            if (null == e) {
                if (null === y) return document.createTextNode(E);
                e = i ? document.createElementNS("http://www.w3.org/2000/svg", y) : document.createElement(y, E.is && E), 
                a = null, u = !1;
            }
            if (null === y) m === E || u && e.data === E || (e.data = E); else {
                if (a = a && n.call(e.childNodes), m = r.props || h, !u && null != a) for (m = {}, 
                c = 0; c < e.attributes.length; c++) m[(f = e.attributes[c]).name] = f.value;
                for (c in m) f = m[c], "children" == c || ("dangerouslySetInnerHTML" == c ? p = f : "key" === c || c in E || Q(e, c, null, f, i));
                for (c in E) f = E[c], "children" == c ? A = f : "dangerouslySetInnerHTML" == c ? d = f : "value" == c ? g = f : "checked" == c ? I = f : "key" === c || u && "function" != typeof f || m[c] === f || Q(e, c, f, m[c], i);
                if (d) u || p && (d.__html === p.__html || d.__html === e.innerHTML) || (e.innerHTML = d.__html), 
                t.__k = []; else if (p && (e.innerHTML = ""), S(e, v(A) ? A : [ A ], t, r, o, i && "foreignObject" !== y, a, s, a ? a[0] : r.__k && x(r, 0), u, l), 
                null != a) for (c = a.length; c--; ) null != a[c] && C(a[c]);
                u || (c = "value", void 0 !== g && (g !== e[c] || "progress" === y && !g || "option" === y && g !== m[c]) && Q(e, c, g, m[c], !1), 
                c = "checked", void 0 !== I && I !== e[c] && Q(e, c, I, m[c], !1));
            }
            return e;
        }
        function N(e, t, r) {
            try {
                "function" == typeof e ? e(t) : e.current = t;
            } catch (e) {
                o.__e(e, r);
            }
        }
        function U(e, t, r) {
            var n, i;
            if (o.unmount && o.unmount(e), (n = e.ref) && (n.current && n.current !== e.__e || N(n, null, t)), 
            null != (n = e.__c)) {
                if (n.componentWillUnmount) try {
                    n.componentWillUnmount();
                } catch (e) {
                    o.__e(e, t);
                }
                n.base = n.__P = null;
            }
            if (n = e.__k) for (i = 0; i < n.length; i++) n[i] && U(n[i], t, r || "function" != typeof e.type);
            r || null == e.__e || C(e.__e), e.__c = e.__ = e.__e = e.__d = void 0;
        }
        function z(e, t, r) {
            return this.constructor(e, r);
        }
        function K(e, t, r) {
            var i, a, s, u;
            o.__ && o.__(e, t), a = (i = "function" == typeof r) ? null : r && r.__k || t.__k, 
            s = [], u = [], H(t, e = (!i && r || t).__k = m(w, null, [ e ]), a || h, h, void 0 !== t.ownerSVGElement, !i && r ? [ r ] : a ? null : t.firstChild ? n.call(t.childNodes) : null, s, !i && r ? r : a ? a.__e : t.firstChild, i, u), 
            T(s, e, u);
        }
        function J(e, t) {
            K(e, t, J);
        }
        function X(e, t, r) {
            var o, i, a, s, u = I({}, e.props);
            for (a in e.type && e.type.defaultProps && (s = e.type.defaultProps), t) "key" == a ? o = t[a] : "ref" == a ? i = t[a] : u[a] = void 0 === t[a] && void 0 !== s ? s[a] : t[a];
            return arguments.length > 2 && (u.children = arguments.length > 3 ? n.call(arguments, 2) : r), 
            E(e.type, u, o || e.key, i || e.ref, null);
        }
        function Y(e, t) {
            var r = {
                __c: t = "__cC" + A++,
                __: e,
                Consumer: function(e, t) {
                    return e.children(t);
                },
                Provider: function(e) {
                    var r, n;
                    return this.getChildContext || (r = [], (n = {})[t] = this, this.getChildContext = function() {
                        return n;
                    }, this.shouldComponentUpdate = function(e) {
                        this.props.value !== e.value && r.some((function(e) {
                            e.__e = !0, k(e);
                        }));
                    }, this.sub = function(e) {
                        r.push(e);
                        var t = e.componentWillUnmount;
                        e.componentWillUnmount = function() {
                            r.splice(r.indexOf(e), 1), t && t.call(e);
                        };
                    }), e.children;
                }
            };
            return r.Provider.__ = r.Consumer.contextType = r;
        }
        n = f.slice, o = {
            __e: function(e, t, r, n) {
                for (var o, i, a; t = t.__; ) if ((o = t.__c) && !o.__) try {
                    if ((i = o.constructor) && null != i.getDerivedStateFromError && (o.setState(i.getDerivedStateFromError(e)), 
                    a = o.__d), null != o.componentDidCatch && (o.componentDidCatch(e, n || {}), a = o.__d), 
                    a) return o.__E = o;
                } catch (t) {
                    e = t;
                }
                throw e;
            }
        }, i = 0, b.prototype.setState = function(e, t) {
            var r;
            r = null != this.__s && this.__s !== this.state ? this.__s : this.__s = I({}, this.state), 
            "function" == typeof e && (e = e(I({}, r), this.props)), e && I(r, e), null != e && this.__v && (t && this._sb.push(t), 
            k(this));
        }, b.prototype.forceUpdate = function(e) {
            this.__v && (this.__e = !0, e && this.__h.push(e), k(this));
        }, b.prototype.render = w, a = [], u = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
        l = function(e, t) {
            return e.__v.__b - t.__v.__b;
        }, O.__r = 0, c = 0, d = M(!1), p = M(!0), A = 0;
    },
    4930: e => {
        "use strict";
        function t(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }
        e.exports = function(e, n, o, i) {
            n = n || "&", o = o || "=";
            var a = {};
            if ("string" != typeof e || 0 === e.length) return a;
            var s = /\+/g;
            e = e.split(n);
            var u = 1e3;
            i && "number" == typeof i.maxKeys && (u = i.maxKeys);
            var l = e.length;
            u > 0 && l > u && (l = u);
            for (var c = 0; c < l; ++c) {
                var d, p, A, h, f = e[c].replace(s, "%20"), g = f.indexOf(o);
                g >= 0 ? (d = f.substr(0, g), p = f.substr(g + 1)) : (d = f, p = ""), A = decodeURIComponent(d), 
                h = decodeURIComponent(p), t(a, A) ? r(a[A]) ? a[A].push(h) : a[A] = [ a[A], h ] : a[A] = h;
            }
            return a;
        };
        var r = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e);
        };
    },
    1590: e => {
        "use strict";
        var t = function(e) {
            switch (typeof e) {
              case "string":
                return e;

              case "boolean":
                return e ? "true" : "false";

              case "number":
                return isFinite(e) ? e : "";

              default:
                return "";
            }
        };
        e.exports = function(e, i, a, s) {
            return i = i || "&", a = a || "=", null === e && (e = void 0), "object" == typeof e ? n(o(e), (function(o) {
                var s = encodeURIComponent(t(o)) + a;
                return r(e[o]) ? n(e[o], (function(e) {
                    return s + encodeURIComponent(t(e));
                })).join(i) : s + encodeURIComponent(t(e[o]));
            })).join(i) : s ? encodeURIComponent(t(s)) + a + encodeURIComponent(t(e)) : "";
        };
        var r = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e);
        };
        function n(e, t) {
            if (e.map) return e.map(t);
            for (var r = [], n = 0; n < e.length; n++) r.push(t(e[n], n));
            return r;
        }
        var o = Object.keys || function(e) {
            var t = [];
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
            return t;
        };
    },
    2894: (e, t, r) => {
        "use strict";
        t.decode = t.parse = r(4930), t.encode = t.stringify = r(1590);
    },
    334: e => {
        "use strict";
        function t(e, r) {
            var n;
            return n = Array.isArray(e) ? [] : {}, r.push(e), Object.keys(e).forEach((function(o) {
                var i = e[o];
                "function" != typeof i && (i && "object" == typeof i ? -1 !== r.indexOf(e[o]) ? n[o] = "[Circular]" : n[o] = t(e[o], r.slice(0)) : n[o] = i);
            })), "string" == typeof e.name && (n.name = e.name), "string" == typeof e.message && (n.message = e.message), 
            "string" == typeof e.stack && (n.stack = e.stack), n;
        }
        e.exports = function(e) {
            return "object" == typeof e ? t(e, []) : "function" == typeof e ? "[Function: " + (e.name || "anonymous") + "]" : e;
        };
    },
    8439: (e, t, r) => {
        var n = r(5072), o = r(9215);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, u = {};
        u.locals = o.locals || {}, u.use = function() {
            return a++ || (i = n(o, s)), u;
        }, u.unuse = function() {
            a > 0 && ! --a && (i(), i = null);
        }, e.exports = u;
    },
    7885: (e, t, r) => {
        var n = r(5072), o = r(8805);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, u = {};
        u.locals = o.locals || {}, u.use = function() {
            return a++ || (i = n(o, s)), u;
        }, u.unuse = function() {
            a > 0 && ! --a && (i(), i = null);
        }, e.exports = u;
    },
    2924: (e, t, r) => {
        var n = r(5072), o = r(8612);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, u = {};
        u.locals = o.locals || {}, u.use = function() {
            return a++ || (i = n(o, s)), u;
        }, u.unuse = function() {
            a > 0 && ! --a && (i(), i = null);
        }, e.exports = u;
    },
    4194: (e, t, r) => {
        var n = r(5072), o = r(9866);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, u = {};
        u.locals = o.locals || {}, u.use = function() {
            return a++ || (i = n(o, s)), u;
        }, u.unuse = function() {
            a > 0 && ! --a && (i(), i = null);
        }, e.exports = u;
    },
    3928: (e, t, r) => {
        var n = r(5072), o = r(8064);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, u = {};
        u.locals = o.locals || {}, u.use = function() {
            return a++ || (i = n(o, s)), u;
        }, u.unuse = function() {
            a > 0 && ! --a && (i(), i = null);
        }, e.exports = u;
    },
    6769: (e, t, r) => {
        var n = r(5072), o = r(8409);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, u = {};
        u.locals = o.locals || {}, u.use = function() {
            return a++ || (i = n(o, s)), u;
        }, u.unuse = function() {
            a > 0 && ! --a && (i(), i = null);
        }, e.exports = u;
    },
    6637: (e, t, r) => {
        var n = r(5072), o = r(3413);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, u = {};
        u.locals = o.locals || {}, u.use = function() {
            return a++ || (i = n(o, s)), u;
        }, u.unuse = function() {
            a > 0 && ! --a && (i(), i = null);
        }, e.exports = u;
    },
    9989: (e, t, r) => {
        var n = r(5072), o = r(7229);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, u = {};
        u.locals = o.locals || {}, u.use = function() {
            return a++ || (i = n(o, s)), u;
        }, u.unuse = function() {
            a > 0 && ! --a && (i(), i = null);
        }, e.exports = u;
    },
    5233: (e, t, r) => {
        var n = r(5072), o = r(7641);
        "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
        var i, a = 0, s = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, u = {};
        u.locals = o.locals || {}, u.use = function() {
            return a++ || (i = n(o, s)), u;
        }, u.unuse = function() {
            a > 0 && ! --a && (i(), i = null);
        }, e.exports = u;
    },
    5072: (e, t, r) => {
        "use strict";
        var n, o = function() {
            return void 0 === n && (n = Boolean(window && document && document.all && !window.atob)), 
            n;
        }, i = function() {
            var e = {};
            return function(t) {
                if (void 0 === e[t]) {
                    var r = document.querySelector(t);
                    if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement) try {
                        r = r.contentDocument.head;
                    } catch (e) {
                        r = null;
                    }
                    e[t] = r;
                }
                return e[t];
            };
        }(), a = [];
        function s(e) {
            for (var t = -1, r = 0; r < a.length; r++) if (a[r].identifier === e) {
                t = r;
                break;
            }
            return t;
        }
        function u(e, t) {
            for (var r = {}, n = [], o = 0; o < e.length; o++) {
                var i = e[o], u = t.base ? i[0] + t.base : i[0], l = r[u] || 0, c = "".concat(u, " ").concat(l);
                r[u] = l + 1;
                var d = s(c), p = {
                    css: i[1],
                    media: i[2],
                    sourceMap: i[3]
                };
                -1 !== d ? (a[d].references++, a[d].updater(p)) : a.push({
                    identifier: c,
                    updater: g(p, t),
                    references: 1
                }), n.push(c);
            }
            return n;
        }
        function l(e) {
            var t = document.createElement("style"), n = e.attributes || {};
            if (void 0 === n.nonce) {
                var o = r.nc;
                o && (n.nonce = o);
            }
            if (Object.keys(n).forEach((function(e) {
                t.setAttribute(e, n[e]);
            })), "function" == typeof e.insert) e.insert(t); else {
                var a = i(e.insert || "head");
                if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                a.appendChild(t);
            }
            return t;
        }
        var c, d = (c = [], function(e, t) {
            return c[e] = t, c.filter(Boolean).join("\n");
        });
        function p(e, t, r, n) {
            var o = r ? "" : n.media ? "@media ".concat(n.media, " {").concat(n.css, "}") : n.css;
            if (e.styleSheet) e.styleSheet.cssText = d(t, o); else {
                var i = document.createTextNode(o), a = e.childNodes;
                a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i);
            }
        }
        function A(e, t, r) {
            var n = r.css, o = r.media, i = r.sourceMap;
            if (o ? e.setAttribute("media", o) : e.removeAttribute("media"), i && "undefined" != typeof btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), 
            e.styleSheet) e.styleSheet.cssText = n; else {
                for (;e.firstChild; ) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n));
            }
        }
        var h = null, f = 0;
        function g(e, t) {
            var r, n, o;
            if (t.singleton) {
                var i = f++;
                r = h || (h = l(t)), n = p.bind(null, r, i, !1), o = p.bind(null, r, i, !0);
            } else r = l(t), n = A.bind(null, r, t), o = function() {
                !function(e) {
                    if (null === e.parentNode) return !1;
                    e.parentNode.removeChild(e);
                }(r);
            };
            return n(e), function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    n(e = t);
                } else o();
            };
        }
        e.exports = function(e, t) {
            (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = o());
            var r = u(e = e || [], t);
            return function(e) {
                if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                    for (var n = 0; n < r.length; n++) {
                        var o = s(r[n]);
                        a[o].references--;
                    }
                    for (var i = u(e, t), l = 0; l < r.length; l++) {
                        var c = s(r[l]);
                        0 === a[c].references && (a[c].updater(), a.splice(c, 1));
                    }
                    r = i;
                }
            };
        };
    },
    4338: e => {
        "use strict";
        e.exports = "data:image/jpeg;base64,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TGJsc2Jvb2wAAAAAAE5ndHZib29sAAAAAABFbWxEYm9vbAAAAAAASW50cmJvb2wAAAAAAEJja2dPYmpjAAAAAQAAAAAAAFJHQkMAAAADAAAAAFJkICBkb3ViQG/gAAAAAAAAAAAAR3JuIGRvdWJAb+AAAAAAAAAAAABCbCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBTgAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAAAAAAQY3JvcFdoZW5QcmludGluZ2Jvb2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAE4AAAABAAEATgAAAAEAAThCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAThCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADSwAAAAYAAAAAAAAAAAAAAEsAAADIAAAACwBsAG8AZwBvAF8AaABlAGEAZABlAHIAAAABAAAA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QkkgpdJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU//9kAOEJJTQQhAAAAAABdAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAFwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAQwAgADIAMAAxADkAAAABADhCSU0EBgAAAAAABwABAAAAAQEA/+ENw2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmViMTRlOGE4LTU4M2EtZjA0ZC04NTE0LTgzYWUyYWQ5NmZhMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxOWNkMzA3Yi1jYWUwLTBjNDctODg3Ni0zMTc3Yzc1YTk3OTMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMDM1MTRGQjY3QjlGNzBDRDc2MEY2NzZCNEVGQThCQUUiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IiIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDMtMTFUMTU6MjQ6NDMrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTAzLTExVDE1OjM0OjIwKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAzLTExVDE1OjM0OjIwKzAzOjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NDAzNTg2MzAtNjI2OS01NTQ1LWFiOGEtNWNkZjFiMjMzZGI5IiBzdEV2dDp3aGVuPSIyMDIwLTAzLTExVDE1OjM0OjIwKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE5Y2QzMDdiLWNhZTAtMGM0Ny04ODc2LTMxNzdjNzVhOTc5MyIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0xMVQxNTozNDoyMCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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";
    },
    4633: (e, t, r) => {
        var n = r(3738).default;
        function o() {
            "use strict";
            e.exports = o = function() {
                return r;
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
            var t, r = {}, i = Object.prototype, a = i.hasOwnProperty, s = Object.defineProperty || function(e, t, r) {
                e[t] = r.value;
            }, u = "function" == typeof Symbol ? Symbol : {}, l = u.iterator || "@@iterator", c = u.asyncIterator || "@@asyncIterator", d = u.toStringTag || "@@toStringTag";
            function p(e, t, r) {
                return Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), e[t];
            }
            try {
                p({}, "");
            } catch (t) {
                p = function(e, t, r) {
                    return e[t] = r;
                };
            }
            function A(e, t, r, n) {
                var o = t && t.prototype instanceof m ? t : m, i = Object.create(o.prototype), a = new D(n || []);
                return s(i, "_invoke", {
                    value: S(e, r, a)
                }), i;
            }
            function h(e, t, r) {
                try {
                    return {
                        type: "normal",
                        arg: e.call(t, r)
                    };
                } catch (e) {
                    return {
                        type: "throw",
                        arg: e
                    };
                }
            }
            r.wrap = A;
            var f = "suspendedStart", g = "suspendedYield", v = "executing", I = "completed", C = {};
            function m() {}
            function E() {}
            function y() {}
            var w = {};
            p(w, l, (function() {
                return this;
            }));
            var b = Object.getPrototypeOf, x = b && b(b(B([])));
            x && x !== i && a.call(x, l) && (w = x);
            var R = y.prototype = m.prototype = Object.create(w);
            function k(e) {
                [ "next", "throw", "return" ].forEach((function(t) {
                    p(e, t, (function(e) {
                        return this._invoke(t, e);
                    }));
                }));
            }
            function O(e, t) {
                function r(o, i, s, u) {
                    var l = h(e[o], e, i);
                    if ("throw" !== l.type) {
                        var c = l.arg, d = c.value;
                        return d && "object" == n(d) && a.call(d, "__await") ? t.resolve(d.__await).then((function(e) {
                            r("next", e, s, u);
                        }), (function(e) {
                            r("throw", e, s, u);
                        })) : t.resolve(d).then((function(e) {
                            c.value = e, s(c);
                        }), (function(e) {
                            return r("throw", e, s, u);
                        }));
                    }
                    u(l.arg);
                }
                var o;
                s(this, "_invoke", {
                    value: function(e, n) {
                        function i() {
                            return new t((function(t, o) {
                                r(e, n, t, o);
                            }));
                        }
                        return o = o ? o.then(i, i) : i();
                    }
                });
            }
            function S(e, r, n) {
                var o = f;
                return function(i, a) {
                    if (o === v) throw Error("Generator is already running");
                    if (o === I) {
                        if ("throw" === i) throw a;
                        return {
                            value: t,
                            done: !0
                        };
                    }
                    for (n.method = i, n.arg = a; ;) {
                        var s = n.delegate;
                        if (s) {
                            var u = F(s, n);
                            if (u) {
                                if (u === C) continue;
                                return u;
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                            if (o === f) throw o = I, n.arg;
                            n.dispatchException(n.arg);
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        o = v;
                        var l = h(e, r, n);
                        if ("normal" === l.type) {
                            if (o = n.done ? I : g, l.arg === C) continue;
                            return {
                                value: l.arg,
                                done: n.done
                            };
                        }
                        "throw" === l.type && (o = I, n.method = "throw", n.arg = l.arg);
                    }
                };
            }
            function F(e, r) {
                var n = r.method, o = e.iterator[n];
                if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", 
                r.arg = t, F(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", 
                r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), C;
                var i = h(o, e.iterator, r.arg);
                if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, 
                C;
                var a = i.arg;
                return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", 
                r.arg = t), r.delegate = null, C) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), 
                r.delegate = null, C);
            }
            function j(e) {
                var t = {
                    tryLoc: e[0]
                };
                1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), 
                this.tryEntries.push(t);
            }
            function L(e) {
                var t = e.completion || {};
                t.type = "normal", delete t.arg, e.completion = t;
            }
            function D(e) {
                this.tryEntries = [ {
                    tryLoc: "root"
                } ], e.forEach(j, this), this.reset(!0);
            }
            function B(e) {
                if (e || "" === e) {
                    var r = e[l];
                    if (r) return r.call(e);
                    if ("function" == typeof e.next) return e;
                    if (!isNaN(e.length)) {
                        var o = -1, i = function r() {
                            for (;++o < e.length; ) if (a.call(e, o)) return r.value = e[o], r.done = !1, r;
                            return r.value = t, r.done = !0, r;
                        };
                        return i.next = i;
                    }
                }
                throw new TypeError(n(e) + " is not iterable");
            }
            return E.prototype = y, s(R, "constructor", {
                value: y,
                configurable: !0
            }), s(y, "constructor", {
                value: E,
                configurable: !0
            }), E.displayName = p(y, d, "GeneratorFunction"), r.isGeneratorFunction = function(e) {
                var t = "function" == typeof e && e.constructor;
                return !!t && (t === E || "GeneratorFunction" === (t.displayName || t.name));
            }, r.mark = function(e) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y, p(e, d, "GeneratorFunction")), 
                e.prototype = Object.create(R), e;
            }, r.awrap = function(e) {
                return {
                    __await: e
                };
            }, k(O.prototype), p(O.prototype, c, (function() {
                return this;
            })), r.AsyncIterator = O, r.async = function(e, t, n, o, i) {
                void 0 === i && (i = Promise);
                var a = new O(A(e, t, n, o), i);
                return r.isGeneratorFunction(t) ? a : a.next().then((function(e) {
                    return e.done ? e.value : a.next();
                }));
            }, k(R), p(R, d, "Generator"), p(R, l, (function() {
                return this;
            })), p(R, "toString", (function() {
                return "[object Generator]";
            })), r.keys = function(e) {
                var t = Object(e), r = [];
                for (var n in t) r.push(n);
                return r.reverse(), function e() {
                    for (;r.length; ) {
                        var n = r.pop();
                        if (n in t) return e.value = n, e.done = !1, e;
                    }
                    return e.done = !0, e;
                };
            }, r.values = B, D.prototype = {
                constructor: D,
                reset: function(e) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, 
                    this.method = "next", this.arg = t, this.tryEntries.forEach(L), !e) for (var r in this) "t" === r.charAt(0) && a.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
                },
                stop: function() {
                    this.done = !0;
                    var e = this.tryEntries[0].completion;
                    if ("throw" === e.type) throw e.arg;
                    return this.rval;
                },
                dispatchException: function(e) {
                    if (this.done) throw e;
                    var r = this;
                    function n(n, o) {
                        return s.type = "throw", s.arg = e, r.next = n, o && (r.method = "next", r.arg = t), 
                        !!o;
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var i = this.tryEntries[o], s = i.completion;
                        if ("root" === i.tryLoc) return n("end");
                        if (i.tryLoc <= this.prev) {
                            var u = a.call(i, "catchLoc"), l = a.call(i, "finallyLoc");
                            if (u && l) {
                                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                            } else if (u) {
                                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                            } else {
                                if (!l) throw Error("try statement without catch or finally");
                                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                            }
                        }
                    }
                },
                abrupt: function(e, t) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var n = this.tryEntries[r];
                        if (n.tryLoc <= this.prev && a.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                            var o = n;
                            break;
                        }
                    }
                    o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                    var i = o ? o.completion : {};
                    return i.type = e, i.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, 
                    C) : this.complete(i);
                },
                complete: function(e, t) {
                    if ("throw" === e.type) throw e.arg;
                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, 
                    this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), 
                    C;
                },
                finish: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t];
                        if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), L(r), C;
                    }
                },
                catch: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t];
                        if (r.tryLoc === e) {
                            var n = r.completion;
                            if ("throw" === n.type) {
                                var o = n.arg;
                                L(r);
                            }
                            return o;
                        }
                    }
                    throw Error("illegal catch attempt");
                },
                delegateYield: function(e, r, n) {
                    return this.delegate = {
                        iterator: B(e),
                        resultName: r,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = t), C;
                }
            }, r;
        }
        e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
    },
    3738: e => {
        function t(r) {
            return e.exports = t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, e.exports.__esModule = !0, e.exports.default = e.exports, t(r);
        }
        e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
    },
    4756: (e, t, r) => {
        var n = r(4633)();
        e.exports = n;
        try {
            regeneratorRuntime = n;
        } catch (e) {
            "object" == typeof globalThis ? globalThis.regeneratorRuntime = n : Function("r", "regeneratorRuntime = r")(n);
        }
    },
    6942: (e, t) => {
        var r;
        !function() {
            "use strict";
            var n = {}.hasOwnProperty;
            function o() {
                for (var e = "", t = 0; t < arguments.length; t++) {
                    var r = arguments[t];
                    r && (e = a(e, i(r)));
                }
                return e;
            }
            function i(e) {
                if ("string" == typeof e || "number" == typeof e) return e;
                if ("object" != typeof e) return "";
                if (Array.isArray(e)) return o.apply(null, e);
                if (e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]")) return e.toString();
                var t = "";
                for (var r in e) n.call(e, r) && e[r] && (t = a(t, r));
                return t;
            }
            function a(e, t) {
                return t ? e ? e + " " + t : e + t : e;
            }
            e.exports ? (o.default = o, e.exports = o) : void 0 === (r = function() {
                return o;
            }.apply(t, [])) || (e.exports = r);
        }();
    },
    3145: (e, t, r) => {
        "use strict";
        function n(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n;
        }
        r.d(t, {
            A: () => n
        });
    },
    6369: (e, t, r) => {
        "use strict";
        function n(e) {
            if (Array.isArray(e)) return e;
        }
        r.d(t, {
            A: () => n
        });
    },
    467: (e, t, r) => {
        "use strict";
        function n(e, t, r, n, o, i, a) {
            try {
                var s = e[i](a), u = s.value;
            } catch (e) {
                return void r(e);
            }
            s.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        function o(e) {
            return function() {
                var t = this, r = arguments;
                return new Promise((function(o, i) {
                    var a = e.apply(t, r);
                    function s(e) {
                        n(a, o, i, s, u, "next", e);
                    }
                    function u(e) {
                        n(a, o, i, s, u, "throw", e);
                    }
                    s(void 0);
                }));
            };
        }
        r.d(t, {
            A: () => o
        });
    },
    4467: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(9922);
        function o(e, t, r) {
            return (t = (0, n.A)(t)) in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e;
        }
    },
    6986: (e, t, r) => {
        "use strict";
        function n(e, t) {
            var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null != r) {
                var n, o, i, a, s = [], u = !0, l = !1;
                try {
                    if (i = (r = r.call(e)).next, 0 === t) {
                        if (Object(r) !== r) return;
                        u = !1;
                    } else for (;!(u = (n = i.call(r)).done) && (s.push(n.value), s.length !== t); u = !0) ;
                } catch (e) {
                    l = !0, o = e;
                } finally {
                    try {
                        if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return;
                    } finally {
                        if (l) throw o;
                    }
                }
                return s;
            }
        }
        r.d(t, {
            A: () => n
        });
    },
    6562: (e, t, r) => {
        "use strict";
        function n() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        r.d(t, {
            A: () => n
        });
    },
    45: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(8587);
        function o(e, t) {
            if (null == e) return {};
            var r, o, i = (0, n.A)(e, t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(e);
                for (o = 0; o < a.length; o++) r = a[o], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
            }
            return i;
        }
    },
    8587: (e, t, r) => {
        "use strict";
        function n(e, t) {
            if (null == e) return {};
            var r, n, o = {}, i = Object.keys(e);
            for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
            return o;
        }
        r.d(t, {
            A: () => n
        });
    },
    3453: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => s
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(6369);
        if (!/^(319|550|7|947)$/.test(r.j)) var o = r(6986);
        if (!/^(319|550|7|947)$/.test(r.j)) var i = r(7800);
        if (!/^(319|550|7|947)$/.test(r.j)) var a = r(6562);
        function s(e, t) {
            return (0, n.A)(e) || (0, o.A)(e, t) || (0, i.A)(e, t) || (0, a.A)();
        }
    },
    2327: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(2284);
        function o(e, t) {
            if ("object" != (0, n.A)(e) || !e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
                var o = r.call(e, t || "default");
                if ("object" != (0, n.A)(o)) return o;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t ? String : Number)(e);
        }
    },
    9922: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => i
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(2284);
        if (!/^(319|550|7|947)$/.test(r.j)) var o = r(2327);
        function i(e) {
            var t = (0, o.A)(e, "string");
            return "symbol" == (0, n.A)(t) ? t : t + "";
        }
    },
    2284: (e, t, r) => {
        "use strict";
        function n(e) {
            return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, n(e);
        }
        r.d(t, {
            A: () => n
        });
    },
    7800: (e, t, r) => {
        "use strict";
        if (r.d(t, {
            A: () => o
        }), !/^(319|550|7|947)$/.test(r.j)) var n = r(3145);
        function o(e, t) {
            if (e) {
                if ("string" == typeof e) return (0, n.A)(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? (0, 
                n.A)(e, t) : void 0;
            }
        }
    }
} ]);