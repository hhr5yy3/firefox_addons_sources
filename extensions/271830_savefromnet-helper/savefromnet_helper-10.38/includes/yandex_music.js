(() => {
    "use strict";
    var e, t = {
        9778: (e, t, r) => {
            var n = r(4467), a = r(467), o = r(4756), s = r.n(o), i = r(9242), l = r(1460), c = r(9620), d = r(4605), u = (r(6810), 
            r(8233)), p = r(4733), f = r(4689), h = r(453), v = r(6714), b = (0, u.A)("ya_playlist"), m = (0, 
            u.A)("playlistButtons"), y = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
            class w {
                constructor(e) {
                    this.selector = ".d-track .d-track__actions", this.type = "added", this.utils = e;
                }
                handle(e) {
                    var t = e.added;
                    this.renderButtons(t);
                }
                renderButtons(e) {
                    e.filter((e => !e.dataset.sfSongReady)).map((e => {
                        e.dataset.sfSongReady = "1";
                        try {
                            var t = e.closest(".d-track");
                            if (!t) return;
                            this.prepareButton(t).then((t => {
                                t && (t.title = i.A.i18n.getMessage("download"), e.style.width = "max-content", 
                                (0, f.A)({
                                    category: "append",
                                    subcategory: "ya",
                                    event: "b"
                                }), e.insertBefore(t, null));
                            }));
                        } catch (e) {
                            m.error(e);
                        }
                    }));
                }
                prepareButton(e) {
                    var t = this;
                    return (0, a.A)(s().mark((function r() {
                        var n, a;
                        return s().wrap((function(r) {
                            for (;;) switch (r.prev = r.next) {
                              case 0:
                                return n = p.A.create("a", {
                                    class: [ "d-track__hover", "sf-download" ],
                                    append: [ p.A.create(t.utils.svg.getSvg("download", "#747474"), {
                                        style: {
                                            marginTop: "2px"
                                        }
                                    }) ],
                                    on: [ [ "mouseover", e => {
                                        if (y) {
                                            if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, h.D)(n, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            });
                                            (0, h.w)(n, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            });
                                        }
                                    } ] ]
                                }), r.prev = 1, r.next = 4, v.P.createLinkExtractor("ya-artist").extractLinks({
                                    element: e
                                });

                              case 4:
                                return a = r.sent, n.download = a[0].filename, n.href = a[0].url, n.addEventListener("click", (e => {
                                    e.stopPropagation(), t.utils.downloadOnClick(e);
                                })), r.abrupt("return", n);

                              case 11:
                                r.prev = 11, r.t0 = r.catch(1), b.error("Ya link extractor error: ", r.t0);

                              case 14:
                              case "end":
                                return r.stop();
                            }
                        }), r, null, [ [ 1, 11 ] ]);
                    })))();
                }
                setError(e) {
                    e.title = i.A.i18n.getMessage("vkMp3LinksNotFound"), e.classList.add("sf-icon-error");
                }
                disable() {
                    var e = [ "data-sf-song-ready", "data-sf-info" ], t = document.querySelectorAll(e.map((e => `[${e}]`)).join(","));
                    Array.from(t).forEach((t => ((e, t) => t.forEach((t => e.removeAttribute(t))))(t, e))), 
                    Array.from(document.querySelectorAll(".sf-download")).forEach((e => e.remove()));
                }
            }
            var g = (0, u.A)("ya_player");
            class x {
                constructor(e) {
                    this.selector = ".player-controls .deco-link.track__title", this.type = "added", 
                    this.observer = void 0, this.button = void 0, this.utils = e;
                }
                handle(e) {
                    var t = e.added.pop();
                    if (t) {
                        var r = t.closest(".player-controls").querySelector(".player-controls__seq-controls");
                        r && this.renderButton(r);
                    }
                }
                renderButton(e) {
                    if (!e.dataset.sfReady) {
                        var t = p.A.create("a", {
                            title: i.A.i18n.getMessage("download"),
                            class: [ "player-controls__btn", "deco-player-controls__button", "sf-download-in-control" ],
                            append: [ p.A.create(this.utils.svg.getSvg("download", "#747474", 19, 19), {
                                style: {
                                    marginTop: "3px"
                                }
                            }) ],
                            on: [ [ "click", e => {
                                e.stopPropagation(), this.utils.downloadOnClick(e);
                            } ] ]
                        });
                        e.append(t), this.prepareButton(t), !this.observer && this.createObserver(t), e.dataset.sfReady = "1";
                    }
                }
                createObserver(e) {
                    this.observer = new l.A({
                        queries: [ {
                            css: ".player-controls__track.player-controls__track_shown",
                            is: "removed",
                            callback: () => this.prepareButton(e)
                        } ]
                    }), this.observer.start();
                }
                prepareButton(e) {
                    return (0, a.A)(s().mark((function t() {
                        var r, n;
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                if (r = e.closest(".player-controls")) {
                                    t.next = 3;
                                    break;
                                }
                                return t.abrupt("return");

                              case 3:
                                return t.prev = 3, t.next = 6, v.P.createLinkExtractor("ya-artist").extractLinks({
                                    element: r
                                });

                              case 6:
                                return n = t.sent, e.download = n[0].filename, e.href = n[0].url, t.abrupt("return", e);

                              case 12:
                                t.prev = 12, t.t0 = t.catch(3), g.error("Ya link extractor error: ", t.t0);

                              case 15:
                              case "end":
                                return t.stop();
                            }
                        }), t, null, [ [ 3, 12 ] ]);
                    })))();
                }
                disable() {
                    this.observer && this.observer.stop(), Array.from(document.querySelectorAll("[data-sf-ready]")).forEach((e => e.removeAttribute("data-sf-ready")));
                    var e = document.querySelector(".sf-download-in-control");
                    e && e.remove();
                }
            }
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
            function A(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? k(Object(r), !0).forEach((function(t) {
                        (0, n.A)(e, t, r[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : k(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                    }));
                }
                return e;
            }
            class O extends d.z {
                constructor() {
                    super(...arguments), this.active = 1, this.mutationHandlers = [];
                }
                init() {
                    var e = this;
                    return (0, a.A)(s().mark((function t() {
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return t.next = 2, i.A.callFn("getPreferences");

                              case 2:
                                e.settings = t.sent, e.active = Number(e.settings.moduleYandexMusic), e.utils = (0, 
                                c.A)({
                                    preferences: e.settings
                                }), e.registerListeners(), e.active && e.initObserver(), e.appendStyle("\n      .theme-white .sf-download { background: white;  box-shadow: 0 0 7px 7px white; }\n      .theme_dark .sf-download { background: #181818; box-shadow: 0 0 7px 7px #181818; } \n      \n      .theme-white .sf-download:hover path { fill: black; }\n      .theme_dark .sf-download:hover path { fill: white; }\n        \n      .theme-white .sf-download path { fill: #a7a7a7; }  \n      \n      .sf-download {\n            margin-top: 3px;\n            margin-right: 6px;\n            padding-right: 10px;\n            padding-left: 10px;\n            float:left;\n      }\n      \n      .sf-download-in-control {\n            margin: 12px;\n            width: 11px;\n            height: 22px;\n            margin-top: 9px;\n      }\n      \n      .theme_dark .sf-download-in-control path { fill: white; }\n      .theme-white .sf-download-in-control path { fill: #3c3b3b; }\n      \n      .sf-icon-error path, .sf-icon-error:hover path { fill: #ff33334a!important; }\n");

                              case 8:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))();
                }
                initObserver() {
                    this.mutationHandlers = [ new w(this.utils), new x(this.utils) ];
                    this.observer = new l.A({
                        queries: this.mutationHandlers.map((e => ({
                            css: e.selector,
                            callback: e.handle.bind(e),
                            is: e.type
                        })))
                    }), this.observer.start();
                }
                registerListeners() {
                    var e = this;
                    i.A.onMessage.addListener(function() {
                        var t = (0, a.A)(s().mark((function t(r, n, a) {
                            var o, i, l;
                            return s().wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                  case 0:
                                    if (o = r.action, i = r.moduleName, l = r.state, "getModuleInfo" !== o) {
                                        t.next = 3;
                                        break;
                                    }
                                    return t.abrupt("return", a({
                                        state: e.active,
                                        moduleName: O.moduleName
                                    }));

                                  case 3:
                                    if ("updatePreferences" !== o) {
                                        t.next = 6;
                                        break;
                                    }
                                    return e.settings = A(A({}, e.settings), r.preferences), t.abrupt("return");

                                  case 6:
                                    e.handleMonoChangeActive(o, i, l), e.handleMonoDownloadAll(o);

                                  case 8:
                                  case "end":
                                    return t.stop();
                                }
                            }), t);
                        })));
                        return function(e, r, n) {
                            return t.apply(this, arguments);
                        };
                    }());
                }
                handleMonoDownloadAll(e) {
                    var t = this;
                    return (0, a.A)(s().mark((function r() {
                        var n;
                        return s().wrap((function(r) {
                            for (;;) switch (r.prev = r.next) {
                              case 0:
                                if ("downloadMP3Files" === e) {
                                    r.next = 2;
                                    break;
                                }
                                return r.abrupt("return");

                              case 2:
                                n = (n = Array.from(document.querySelectorAll("a.sf-download[download][href]"))).map((e => ({
                                    url: e.href,
                                    title: e.download,
                                    filename: e.download
                                }))), t.utils.downloadList.showBeforeDownloadPopup(n, {
                                    type: "audio",
                                    folderName: document.title.trim()
                                });

                              case 5:
                              case "end":
                                return r.stop();
                            }
                        }), r);
                    })))();
                }
                handleMonoChangeActive(e, t, r) {
                    if (O.moduleName === t && "changeState" === e) {
                        if (this.active = r, this.active) return this.initObserver();
                        this.observer.stop(), this.mutationHandlers.forEach((e => e.disable()));
                    }
                }
            }
            O.moduleName = "yandexMusic";
            var _ = r(9589), S = r(9022), j = new O;
            S.A.isSingle() && (0, _.Ay)(O.moduleName, (() => j.start()), (() => -1 === location.href.indexOf("api/")));
        }
    }, r = {};
    function n(e) {
        var a = r[e];
        if (void 0 !== a) return a.exports;
        var o = r[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(o.exports, o, o.exports, n), o.exports;
    }
    n.m = t, e = [], n.O = (t, r, a, o) => {
        if (!r) {
            var s = 1 / 0;
            for (d = 0; d < e.length; d++) {
                for (var [r, a, o] = e[d], i = !0, l = 0; l < r.length; l++) (!1 & o || s >= o) && Object.keys(n.O).every((e => n.O[e](r[l]))) ? r.splice(l--, 1) : (i = !1, 
                o < s && (s = o));
                if (i) {
                    e.splice(d--, 1);
                    var c = a();
                    void 0 !== c && (t = c);
                }
            }
            return t;
        }
        o = o || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > o; d--) e[d] = e[d - 1];
        e[d] = [ r, a, o ];
    }, n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t;
    }, n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        });
    }, n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, n.j = 252, (() => {
        n.b = document.baseURI || self.location.href;
        var e = {
            252: 0
        };
        n.O.j = t => 0 === e[t];
        var t = (t, r) => {
            var a, o, [s, i, l] = r, c = 0;
            if (s.some((t => 0 !== e[t]))) {
                for (a in i) n.o(i, a) && (n.m[a] = i[a]);
                if (l) var d = l(n);
            }
            for (t && t(r); c < s.length; c++) o = s[c], n.o(e, o) && e[o] && e[o][0](), e[o] = 0;
            return n.O(d);
        }, r = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        r.forEach(t.bind(null, 0)), r.push = t.bind(null, r.push.bind(r));
    })(), n.nc = void 0;
    var a = n.O(void 0, [ 223 ], (() => n(9778)));
    a = n.O(a);
})();