(() => {
    var e, t = {
        3658: (e, t, r) => {
            "use strict";
            var n = r(4467), o = r(467), a = r(4756), i = r.n(a), s = r(9242), c = r(4605), u = r(9022), l = r(9589), d = r(5299), f = r(172), p = r(3453), m = r(6769), b = r.n(m), v = r(6942), y = r.n(v), h = r(4627), g = "matchtv", O = "twitch", w = "vk", A = d.Ay.memo((e => {
                var t = e.items, r = void 0 === t ? [] : t, n = e.theme, o = e.children, a = (0, 
                h.A)(b()), i = d.Ay.useState(!1), c = (0, p.A)(i, 2), u = c[0], l = c[1], f = d.Ay.useRef(), m = d.Ay.useRef(), v = d.Ay.useRef(), A = d.Ay.useMemo((() => ({
                    [O]: a.themeTwitch,
                    [w]: a.themeVk,
                    [g]: a.themeMatchtv
                }[n])), [ n ]), j = d.Ay.useCallback((() => {
                    l((e => !e));
                }), []);
                return d.Ay.useEffect((() => {
                    var e = e => {
                        var t = e.target === f.current || f.current.contains(e.target), r = e.target === m.current;
                        t || r || !v.current.classList.contains(a.show) || j();
                    };
                    return document.addEventListener("click", e), () => {
                        document.removeEventListener("click", e);
                    };
                }), []), d.Ay.createElement("div", {
                    ref: f,
                    className: A
                }, d.Ay.createElement("div", {
                    ref: m,
                    onClick: j
                }, o), d.Ay.createElement("div", {
                    ref: v,
                    className: y()(a.itemContainer, u ? a.show : a.hide)
                }, !r.length && d.Ay.createElement("div", {
                    className: a.message
                }, s.A.i18n.getMessage("noLinksFound")), r.map((e => d.Ay.createElement("div", {
                    onClick: e.onClick,
                    className: a.item
                }, d.Ay.createElement("div", null, e.title))))));
            })), j = e => d.Ay.createElement("div", null, e.children), k = r(1063), x = r.n(k), P = r(1853), E = r(3434), S = r(6810), L = r(4895);
            function M(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    }))), r.push.apply(r, n);
                }
                return r;
            }
            function N(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? M(Object(r), !0).forEach((function(t) {
                        (0, n.A)(e, t, r[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : M(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                    }));
                }
                return e;
            }
            class T {
                constructor(e) {
                    this.type = "added", this.selector = e.default;
                }
                handle(e) {
                    e.added.filter((e => !e.dataset.sfVideoReady)).map((e => (e.dataset.sfVideoReady = 1, 
                    e))).map((e => this.renderButton(e)));
                }
                renderButton(e) {
                    return (0, o.A)(i().mark((function t() {
                        var r, n, o, a;
                        return i().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return x().use(), r = e.closest(".video-container"), t.next = 4, (0, L.A)({
                                    action: "matchTvFetchVideoSources",
                                    iframeVideoURL: e.src
                                });

                              case 4:
                                return n = (n = t.sent).filter((e => "Auto" !== e.title)).map((e => N(N({}, e), {}, {
                                    filename: document.title
                                }))), o = document.createElement("div"), r.parentElement.insertBefore(o, r.nextSibling), 
                                a = n.map((e => ({
                                    title: e.title,
                                    onClick() {
                                        (0, P.A)((0, f.n)(E.Ay, {
                                            filename: S.A.modify(e.filename) + ".mp4",
                                            format: "mp4",
                                            sources: [ {
                                                url: e.endpoint,
                                                format: "mp4"
                                            } ],
                                            convertType: "hls"
                                        }), "sf-muxer-parent");
                                    }
                                }))), t.abrupt("return", (0, P.A)((0, f.n)(A, {
                                    items: a,
                                    theme: g
                                }, (0, f.n)(j, null, (0, f.n)("div", {
                                    className: x().locals.downloadButton
                                }, s.A.i18n.getMessage("download")))), o));

                              case 10:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))();
                }
            }
            var C = r(7445);
            function D(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    }))), r.push.apply(r, n);
                }
                return r;
            }
            function J(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? D(Object(r), !0).forEach((function(t) {
                        (0, n.A)(e, t, r[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : D(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                    }));
                }
                return e;
            }
            class R extends c.z {
                init() {
                    var e = this;
                    return (0, o.A)(i().mark((function t() {
                        return i().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return e.active = Number(e.settings.moduleMatchTv), t.next = 3, (0, C.A)();

                              case 3:
                                e.selectorsConfig = t.sent, e.active && e.initObserver([ new T(e.selectorsConfig.match_tv) ]), 
                                e.registerMonoListeners();

                              case 6:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))();
                }
                registerMonoListeners() {
                    var e = this, t = e => this.settings = J(J({}, this.settings), {}, {
                        preferences: e
                    });
                    s.A.onMessage.addListener(function() {
                        var r = (0, o.A)(i().mark((function r(n, o, a) {
                            var s, c, u;
                            return i().wrap((function(r) {
                                for (;;) switch (r.prev = r.next) {
                                  case 0:
                                    if (s = n.action, c = n.moduleName, u = n.state, "getModuleInfo" !== s) {
                                        r.next = 3;
                                        break;
                                    }
                                    return r.abrupt("return", a({
                                        state: e.active,
                                        moduleName: R.moduleName
                                    }));

                                  case 3:
                                    if (c === R.moduleName) {
                                        r.next = 5;
                                        break;
                                    }
                                    return r.abrupt("return");

                                  case 5:
                                    if ("updatePreferences" !== s) {
                                        r.next = 7;
                                        break;
                                    }
                                    return r.abrupt("return", t(n.preferences));

                                  case 7:
                                    if ("changeState" !== s) {
                                        r.next = 14;
                                        break;
                                    }
                                    if (!u) {
                                        r.next = 11;
                                        break;
                                    }
                                    return e.active = !u, r.abrupt("return", e.initObserver(e.mutations));

                                  case 11:
                                    e.observer.stop(), document.querySelectorAll(".sf--dropdown").forEach((e => e.remove()));

                                  case 14:
                                  case "end":
                                    return r.stop();
                                }
                            }), r);
                        })));
                        return function(e, t, n) {
                            return r.apply(this, arguments);
                        };
                    }());
                }
            }
            R.moduleName = "matchTv";
            var _ = new R;
            u.A.isSingle() && (0, l.Ay)(R.moduleName, (() => _.start()), (() => !0));
        },
        5231: (e, t, r) => {
            "use strict";
            r.r(t), r.d(t, {
                default: () => s
            });
            var n = r(1601), o = r.n(n), a = r(6314), i = r.n(a)()(o());
            i.push([ e.id, '.JyyL1--download-button{background-image:linear-gradient(90deg,#000 0,#434343 51%,#000);background-size:200% auto;border:none;border-radius:6px;color:#fff;cursor:pointer;float:right;padding:4px 8px;transition:.5s}.JyyL1--download-button:hover{background-position:100%}.JyyL1--download-button:after{border-bottom:0;border-left:.3em solid transparent;border-right:.3em solid transparent;border-top:.3em solid;content:"";display:inline-block;height:0;margin-left:.255em;vertical-align:.055em;width:0}', "" ]), 
            i.locals = {
                "download-button": "JyyL1--download-button",
                downloadButton: "JyyL1--download-button"
            };
            const s = i;
        },
        1063: (e, t, r) => {
            var n = r(5072), o = r(5231);
            "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.id, o, "" ] ]);
            var a, i = 0, s = {
                injectType: "lazyStyleTag",
                insert: "head",
                singleton: !1
            }, c = {};
            c.locals = o.locals || {}, c.use = function() {
                return i++ || (a = n(o, s)), c;
            }, c.unuse = function() {
                i > 0 && ! --i && (a(), a = null);
            }, e.exports = c;
        }
    }, r = {};
    function n(e) {
        var o = r[e];
        if (void 0 !== o) return o.exports;
        var a = r[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(a.exports, a, a.exports, n), a.exports;
    }
    n.m = t, e = [], n.O = (t, r, o, a) => {
        if (!r) {
            var i = 1 / 0;
            for (l = 0; l < e.length; l++) {
                for (var [r, o, a] = e[l], s = !0, c = 0; c < r.length; c++) (!1 & a || i >= a) && Object.keys(n.O).every((e => n.O[e](r[c]))) ? r.splice(c--, 1) : (s = !1, 
                a < i && (i = a));
                if (s) {
                    e.splice(l--, 1);
                    var u = o();
                    void 0 !== u && (t = u);
                }
            }
            return t;
        }
        a = a || 0;
        for (var l = e.length; l > 0 && e[l - 1][2] > a; l--) e[l] = e[l - 1];
        e[l] = [ r, o, a ];
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
    }, n.j = 555, (() => {
        n.b = document.baseURI || self.location.href;
        var e = {
            555: 0
        };
        n.O.j = t => 0 === e[t];
        var t = (t, r) => {
            var o, a, [i, s, c] = r, u = 0;
            if (i.some((t => 0 !== e[t]))) {
                for (o in s) n.o(s, o) && (n.m[o] = s[o]);
                if (c) var l = c(n);
            }
            for (t && t(r); u < i.length; u++) a = i[u], n.o(e, a) && e[a] && e[a][0](), e[a] = 0;
            return n.O(l);
        }, r = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        r.forEach(t.bind(null, 0)), r.push = t.bind(null, r.push.bind(r));
    })(), n.nc = void 0;
    var o = n.O(void 0, [ 223 ], (() => n(3658)));
    o = n.O(o);
})();