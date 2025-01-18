(() => {
    "use strict";
    var A, e = {
        3155: (A, e, t) => {
            var r = t(4467), n = t(467), a = t(4756), s = t.n(a), o = t(9242), i = t(4605), c = t(9620), l = t(1460), u = t(9022), d = t(9589), p = t(4689), g = t(453), w = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
            function h(A) {
                return A.dataset.sfSongReady = 1, A;
            }
            var Q = A => !A.dataset.sfSongReady, C = () => {
                try {
                    return "Tampermonkey" === GM_info.scriptHandler || "Violentmonkey" === GM_info.scriptHandler;
                } catch (A) {
                    return !1;
                }
            }, E = () => !C() && !(o.A.isGM && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")), k = A => {
                var e = A.url, t = A.filename;
                if (C()) {
                    var r = document.createElement("a");
                    r.style.display = "none", r.href = e, r.setAttribute("target", "_blank"), r.download = t, 
                    document.body.appendChild(r), r.click(), r.remove();
                } else {
                    var n = new CustomEvent("song.download", {
                        detail: {
                            downloadURL: e,
                            filename: t
                        }
                    });
                    document.dispatchEvent(n);
                }
            }, f = A => {
                var e = document.createElement("a");
                return e.target = "_blank", A && e.classList.add("sf--sc-" + A), e.classList.add("sf--sc-btn", "sc-button", "sc-button-small", "sc-button-icon", "sc-button-responsive"), 
                e.addEventListener("mouseenter", (A => {
                    if (w) {
                        if (!A.altKey && !A.ctrlKey) return A.preventDefault(), void (0, g.D)(e, {
                            content: o.A.i18n.getMessage("downloadTitle"),
                            defaultWidth: 400,
                            defaultHeight: 60
                        });
                        (0, g.w)(e, {
                            content: o.A.i18n.getMessage("downloadTitle"),
                            defaultWidth: 400,
                            defaultHeight: 60
                        });
                    }
                })), (0, p.A)({
                    category: "append",
                    subcategory: "so",
                    event: "b"
                }), e;
            }, y = (A, e) => {
                [ "loading", "error", "playlist", "default" ].includes(e) && (A.classList.remove("sf--sc-loading"), 
                A.classList.add(`sf--sc-${e}`));
            }, m = t(6714);
            class M {
                constructor(A) {
                    this.type = "added", this.selector = A.user_card_playlist;
                }
                handle(A) {
                    A.added.filter(Q).map(h).map((A => this.renderDownloadButton(A)));
                }
                renderDownloadButton(A) {
                    var e = A.querySelector(".sc-button-group"), t = f("playlist");
                    t.classList.add("sc-usercard-playlist"), t.addEventListener("click", this.downloadPlaylist.bind(this)), 
                    e.appendChild(t);
                }
                downloadPlaylist(A) {
                    return (0, n.A)(s().mark((function e() {
                        var t, r;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return A.stopPropagation(), t = A.target, y(t, "loading"), e.prev = 3, e.next = 6, 
                                m.P.createLinkExtractor("so-audio").extractLinks({
                                    element: A.target
                                });

                              case 6:
                                return r = e.sent, e.next = 9, Promise.all(r);

                              case 9:
                                e.sent.map(k), e.next = 16;
                                break;

                              case 12:
                                throw e.prev = 12, e.t0 = e.catch(3), y(t, "error"), e.t0;

                              case 16:
                                return e.prev = 16, y(t, "default"), e.finish(16);

                              case 19:
                              case "end":
                                return e.stop();
                            }
                        }), e, null, [ [ 3, 12, 16, 19 ] ]);
                    })))();
                }
            }
            var b = t(3453);
            (0, t(8233).A)("userCardSingleTrack");
            class B {
                constructor(A, e) {
                    this.type = "added", this.utils = A, this.selector = e.user_card_single_track;
                }
                handle(A) {
                    A.added.filter(Q).map(h).map((A => this.renderDownloadButton(A)));
                }
                renderDownloadButton(A) {
                    var e = A.querySelector(".sc-button-group");
                    e && this.btnPrepare(A).then((A => {
                        A && e.appendChild(A);
                    }));
                }
                btnPrepare(A) {
                    var e = this;
                    return (0, n.A)(s().mark((function t() {
                        var r, n, a, o;
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return r = f(), t.next = 3, m.P.createLinkExtractor("so-audio").extractLinks({
                                    element: A
                                });

                              case 3:
                                if (n = t.sent, a = (0, b.A)(n, 1), (o = a[0]).url && o.filename) {
                                    t.next = 8;
                                    break;
                                }
                                return t.abrupt("return");

                              case 8:
                                return r.classList.add("sc-usercard-single-track"), r.href = o.url, r.download = o.filename, 
                                r.addEventListener("click", e.utils.downloadOnClick), t.abrupt("return", r);

                              case 13:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))();
                }
            }
            class x {
                constructor(A, e) {
                    this.type = "added", this.utils = A, this.selector = e.playlist_old_selector;
                }
                handle(A) {
                    A.added.filter(Q).map(h).map((A => this.renderDownloadButton(A)));
                }
                renderDownloadButton(A) {
                    this.btnPrepare(A).then((e => {
                        (0, p.A)({
                            category: "append",
                            subcategory: "so",
                            event: "b"
                        }), e && A.appendChild(e);
                    }));
                }
                btnPrepare(A) {
                    var e = this;
                    return (0, n.A)(s().mark((function t() {
                        var r, n, a, o;
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return r = f(), t.next = 3, m.P.createLinkExtractor("so-audio").extractLinks({
                                    element: A
                                });

                              case 3:
                                if (n = t.sent, a = (0, b.A)(n, 1), (o = a[0]).url && o.filename) {
                                    t.next = 8;
                                    break;
                                }
                                return t.abrupt("return");

                              case 8:
                                return r.classList.add("sc-page-playlist"), r.href = o.url, r.download = o.filename, 
                                r.addEventListener("click", e.utils.downloadOnClick), t.abrupt("return", r);

                              case 13:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))();
                }
            }
            class I {
                constructor(A, e) {
                    this.type = "added", this.utils = A, this.selector = this.getSelector(e);
                }
                getSelector(A) {
                    return [ A.sidebar_for_page_single_track, A.sidebar_row_selector, A.sidebar_top_button ].join(",");
                }
                handle(A) {
                    A.added.filter(Q).map(h).map((A => this.renderDownloadButton(A)));
                }
                renderDownloadButton(A) {
                    var e, t = E(), r = t || !t && -1 === location.pathname.indexOf("/sets/");
                    this.isTopSidebar(A) ? r && (e = this.prepareButtonForTop()) : e = this.prepareButtonForSidebar(A), 
                    e && e.then((e => {
                        e && A.appendChild(e);
                    }));
                }
                prepareButtonForSidebar(A) {
                    var e = this;
                    return (0, n.A)(s().mark((function t() {
                        var r, n, a, o;
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return r = f(), t.next = 3, m.P.createLinkExtractor("so-audio").extractLinks({
                                    element: A
                                });

                              case 3:
                                if (n = t.sent, a = (0, b.A)(n, 1), (o = a[0]).url && o.filename) {
                                    t.next = 8;
                                    break;
                                }
                                return t.abrupt("return");

                              case 8:
                                return r.classList.add("sc-sidebar"), r.href = o.url, r.download = o.filename, r.addEventListener("click", e.utils.downloadOnClick), 
                                t.abrupt("return", r);

                              case 13:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))();
                }
                prepareButtonForTop() {
                    var A = this;
                    return (0, n.A)(s().mark((function e() {
                        var t, r, n, a;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return (t = f()).dataset.position = "sidebar", t.style.width = t.style.height = "26px", 
                                t.classList.add("sc-topbar"), e.next = 6, m.P.createLinkExtractor("so-audio").extractLinks({});

                              case 6:
                                if (r = e.sent, n = (0, b.A)(r, 1), (a = n[0]).url && a.filename) {
                                    e.next = 13;
                                    break;
                                }
                                return A.tracks = r, t.addEventListener("click", A.onDownloadPlaylist.bind(A)), 
                                t.classList.remove("sc-button-small"), e.abrupt("return", t);

                              case 13:
                                return t.href = a.url, t.download = a.filename, t.addEventListener("click", A.utils.downloadOnClick), 
                                e.abrupt("return", t);

                              case 17:
                              case "end":
                                return e.stop();
                            }
                        }), e);
                    })))();
                }
                onDownloadPlaylist(A) {
                    var e = this;
                    return (0, n.A)(s().mark((function t() {
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return A.preventDefault(), A.stopPropagation(), t.next = 4, Promise.all(e.tracks);

                              case 4:
                                t.sent.map(k);

                              case 5:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))();
                }
                isTopSidebar(A) {
                    return null !== A.closest(".l-about-top");
                }
            }
            var v = t(7445);
            function S(A, e) {
                var t = Object.keys(A);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(A);
                    e && (r = r.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(A, e).enumerable;
                    }))), t.push.apply(t, r);
                }
                return t;
            }
            function L(A) {
                for (var e = 1; e < arguments.length; e++) {
                    var t = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? S(Object(t), !0).forEach((function(e) {
                        (0, r.A)(A, e, t[e]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t)) : S(Object(t)).forEach((function(e) {
                        Object.defineProperty(A, e, Object.getOwnPropertyDescriptor(t, e));
                    }));
                }
                return A;
            }
            class J extends i.z {
                constructor() {
                    super(...arguments), this.mutationHandlers = [], this.active = 1;
                }
                init() {
                    var A = this;
                    return (0, n.A)(s().mark((function e() {
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, o.A.callFn("getPreferences");

                              case 2:
                                return A.settings = e.sent, A.utils = (0, c.A)({
                                    preferences: A.settings
                                }), A.active = Number(A.settings.moduleSoundcloud), e.next = 7, (0, v.A)();

                              case 7:
                                A.selectorsConfig = e.sent, A.registerMonoListeners(), A.registerListeners(), A.active && A.initObserver(), 
                                A.appendStyle("\n  .sf--sc-btn {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAPklEQVR42mNgGHTgvw/DfxgexJqBiuYja8CD55NrwHxyXTCfWP/OJ0sjFgPmkxvXCWRFDy6MT3MDITw40j8Ak46HYQ4gDfUAAAAASUVORK5CYII=);\n    background-repeat: no-repeat;\n    background-position: 50%;\n  }\n  .sf--sc-playlist {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAMUlEQVR42mL8//8/A7mAiYECwILC82Uk7IzN/xmpYjPjqJ9H/UxTP1OkGQAAAP//AwDcahUV6UvyJwAAAABJRU5ErkJggg==);\n    background-size: 50%;\n  }\n  .sf--sc-loading {\n    background-image: url(data:image/gif;base64,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);\n    background-size: 50%;\n  }\n  .sf--sc-error {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAVklEQVQoz2P4//8/A7mYgSqa0UF9ff1/GEaXG0SagYrmI2vAg+djtZkIA+bjdTYeA+YT5WcsBswnNcDmY9NIlGaoAQnYxHEFGMHQxqe5gRDGqpnuGQMALmDKhkjc9oYAAAAASUVORK5CYII=);\n  }\n");

                              case 12:
                              case "end":
                                return e.stop();
                            }
                        }), e);
                    })))();
                }
                registerListeners() {
                    document.addEventListener("song.download", (A => {
                        var e = A.detail;
                        this.utils.download(e.filename, e.downloadURL);
                    }));
                }
                registerMonoListeners() {
                    var A = this, e = A => this.settings = L(L({}, this.settings), {}, {
                        preferences: A
                    });
                    o.A.onMessage.addListener(function() {
                        var t = (0, n.A)(s().mark((function t(r, n, a) {
                            var o, i, c;
                            return s().wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                  case 0:
                                    if (o = r.action, i = r.moduleName, c = r.state, i === J.moduleName) {
                                        t.next = 3;
                                        break;
                                    }
                                    return t.abrupt("return");

                                  case 3:
                                    if ("getModuleInfo" !== o) {
                                        t.next = 5;
                                        break;
                                    }
                                    return t.abrupt("return", a({
                                        state: A.active,
                                        moduleName: J.moduleName
                                    }));

                                  case 5:
                                    if ("updatePreferences" !== o) {
                                        t.next = 7;
                                        break;
                                    }
                                    return t.abrupt("return", e(r.preferences));

                                  case 7:
                                    if ("changeState" !== o) {
                                        t.next = 14;
                                        break;
                                    }
                                    if (!c) {
                                        t.next = 10;
                                        break;
                                    }
                                    return t.abrupt("return", A.initObserver());

                                  case 10:
                                    A.observer.stop(), document.querySelectorAll(".sf--sc-btn").forEach((A => A.remove())), 
                                    document.querySelectorAll('[data-sf-song-ready="1"]').forEach((A => {
                                        A.removeAttribute("data-sf-song-ready");
                                    }));

                                  case 14:
                                  case "end":
                                    return t.stop();
                                }
                            }), t);
                        })));
                        return function(A, e, r) {
                            return t.apply(this, arguments);
                        };
                    }());
                }
                initObserver() {
                    this.mutationHandlers = [ new B(this.utils, this.selectorsConfig.soundcloud), new x(this.utils, this.selectorsConfig.soundcloud), new I(this.utils, this.selectorsConfig.soundcloud) ], 
                    E() && this.mutationHandlers.push(new M(this.selectorsConfig.soundcloud));
                    this.observer = new l.A({
                        queries: this.mutationHandlers.map((A => ({
                            css: A.selector,
                            callback: A.handle.bind(A),
                            is: A.type
                        })))
                    }), this.observer.start();
                }
            }
            J.moduleName = "soundcloud";
            var K = new J;
            u.A.isSingle() && (0, d.Ay)(J.moduleName, (() => K.init()), (() => !0));
        }
    }, t = {};
    function r(A) {
        var n = t[A];
        if (void 0 !== n) return n.exports;
        var a = t[A] = {
            id: A,
            exports: {}
        };
        return e[A].call(a.exports, a, a.exports, r), a.exports;
    }
    r.m = e, A = [], r.O = (e, t, n, a) => {
        if (!t) {
            var s = 1 / 0;
            for (l = 0; l < A.length; l++) {
                for (var [t, n, a] = A[l], o = !0, i = 0; i < t.length; i++) (!1 & a || s >= a) && Object.keys(r.O).every((A => r.O[A](t[i]))) ? t.splice(i--, 1) : (o = !1, 
                a < s && (s = a));
                if (o) {
                    A.splice(l--, 1);
                    var c = n();
                    void 0 !== c && (e = c);
                }
            }
            return e;
        }
        a = a || 0;
        for (var l = A.length; l > 0 && A[l - 1][2] > a; l--) A[l] = A[l - 1];
        A[l] = [ t, n, a ];
    }, r.n = A => {
        var e = A && A.__esModule ? () => A.default : () => A;
        return r.d(e, {
            a: e
        }), e;
    }, r.d = (A, e) => {
        for (var t in e) r.o(e, t) && !r.o(A, t) && Object.defineProperty(A, t, {
            enumerable: !0,
            get: e[t]
        });
    }, r.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (A) {
            if ("object" == typeof window) return window;
        }
    }(), r.o = (A, e) => Object.prototype.hasOwnProperty.call(A, e), r.r = A => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(A, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(A, "__esModule", {
            value: !0
        });
    }, r.j = 941, (() => {
        r.b = document.baseURI || self.location.href;
        var A = {
            941: 0
        };
        r.O.j = e => 0 === A[e];
        var e = (e, t) => {
            var n, a, [s, o, i] = t, c = 0;
            if (s.some((e => 0 !== A[e]))) {
                for (n in o) r.o(o, n) && (r.m[n] = o[n]);
                if (i) var l = i(r);
            }
            for (e && e(t); c < s.length; c++) a = s[c], r.o(A, a) && A[a] && A[a][0](), A[a] = 0;
            return r.O(l);
        }, t = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        t.forEach(e.bind(null, 0)), t.push = e.bind(null, t.push.bind(t));
    })(), r.nc = void 0;
    var n = r.O(void 0, [ 223 ], (() => r(3155)));
    n = r.O(n);
})();