(() => {
    var t, e = {
        8993: (t, e, o) => {
            "use strict";
            function n(t) {
                throw new TypeError('"' + t + '" is read-only');
            }
            var r = o(3453), a = o(467), i = o(4756), s = o.n(i), l = o(9242), d = o(8233), c = o(9022), f = o(1460), u = o(9620), _ = o(8139), p = o(9589), b = o(1853), m = o(172), v = o(5299), h = o(2452), x = o.n(h), g = o(4627), y = o(6942), A = o.n(y), k = o(4689), w = o(4895), E = "middle", S = "large", T = "feedItem";
            const C = v.Ay.memo((t => {
                var e = t.url, o = t.filename, n = t.containerType, i = void 0 === n ? E : n, d = t.children, c = (0, 
                g.A)(x()), f = v.Ay.useState(!1), u = (0, r.A)(f, 2), _ = u[0], p = u[1], b = v.Ay.useState(!1), m = (0, 
                r.A)(b, 2), h = m[0], y = m[1], C = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
                function O() {
                    return O = (0, a.A)(s().mark((function t(e, o) {
                        var n, r, a;
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return t.next = 2, fetch(e);

                              case 2:
                                return n = t.sent, t.next = 5, n.blob();

                              case 5:
                                r = t.sent, (a = document.createElement("a")).href = URL.createObjectURL(r), a.download = o, 
                                document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(a.href);

                              case 13:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    }))), O.apply(this, arguments);
                }
                var j = v.Ay.useCallback((t => {
                    if (t.stopPropagation(), l.A.isFirefox) {
                        t.preventDefault();
                        var n = e;
                        return (0, w.A)({
                            action: "ffTiktokDownloadMedia",
                            downloadFileUrl: n,
                            filename: o
                        });
                    }
                    l.A.isFirefox || function(t, e) {
                        O.apply(this, arguments);
                    }(e, o), t.altKey || l.A.isFirefox ? ((0, k.A)({
                        category: "download",
                        subcategory: "ti",
                        event: "video"
                    }), l.A.sendMessage({
                        action: "checkAndOpenProLanding"
                    })) : (h || (y(!0), setTimeout((() => {
                        y(!1);
                    }), 2e3)), t.preventDefault());
                }), [ h ]), L = v.Ay.useCallback((t => {
                    t.altKey || t.ctrlKey || l.A.isFirefox || p(!_);
                }), [ _ ]), P = v.Ay.useMemo((() => i === S ? c.largeContainer : i === E ? c.middleContainer : i === T ? c.feedItemContainer : ""), [ i ]);
                return v.Ay.createElement("div", {
                    className: A()(c.container, P)
                }, v.Ay.createElement("div", {
                    className: c.button
                }, l.A.isFirefox ? v.Ay.createElement("a", {
                    onclick: j
                }, d) : v.Ay.createElement("a", {
                    href: e,
                    download: o,
                    target: "_blank",
                    onclick: j,
                    onmouseenter: L,
                    onmouseleave: L
                }, d), _ && v.Ay.createElement("div", {
                    className: A()(c.sf__tooltip)
                }, v.Ay.createElement("div", {
                    className: A()(c.sf__tooltip__triangle)
                }), v.Ay.createElement("div", {
                    className: A()(c.sf__tooltip__container)
                }, v.Ay.createElement("span", {
                    className: A()(c.sf__tooltip__text)
                }, l.A.i18n.getMessage("download_button_hold")), v.Ay.createElement("div", {
                    className: A()(c.sf__tooltip__button, C ? c.sf__tooltip__button_safari : "")
                }, v.Ay.createElement("div", {
                    className: A()(c.sf__tooltip__button_whiteground, C ? c.sf__tooltip__button_whiteground_safari : "")
                }, v.Ay.createElement("span", {
                    className: A()(c.sf__tooltip__text__alt)
                }, C ? "option" : "alt"))), v.Ay.createElement("span", {
                    className: A()(c.sf__tooltip__text)
                }, l.A.i18n.getMessage("download_button_and_click"))))));
            }));
            var O = o(4733), j = o(5563), L = o(6714), P = (0, d.A)("tiktok_com");
            c.A.isSingle() && (0, p.Ys)("tiktok", ((t, e) => {
                var o = (0, u.A)(e), i = e.preferences, d = i.moduleTiktok, c = e.preferences.selectorsConfig, p = location.pathname.includes("/embed");
                l.A.onMessage.addListener(((e, o, n) => {
                    if ("getModuleInfo" === e.action) {
                        if (e.url !== location.href) return;
                        return n({
                            state: d,
                            moduleName: t
                        });
                    }
                    if ("changeState" === e.action) {
                        if (t !== e.moduleName) return;
                        return v.changeState(e.state);
                    }
                    "updatePreferences" !== e.action || Object.assign(i, e.preferences);
                })), d && setTimeout((() => {
                    v.run();
                }));
                var v = {
                    style: void 0,
                    run() {
                        d = 1, p ? f.A.isAvailable() && h.mutationMode.start() : f.A.isAvailable() && (this.mutationMode.start(), 
                        this.injectStyle());
                    },
                    mutationMode: {
                        observer: null,
                        start() {
                            if (this.observer) return this.observer.start();
                            this.observer = new f.A({
                                queries: [ {
                                    css: c.tiktok.videoCardAdd,
                                    is: "added",
                                    callback: t => {
                                        for (var e, o = 0; e = t.added[o]; o++) e.dataset.sfSkip > 0 || v.runDesktop(e);
                                    }
                                }, {
                                    css: c.tiktok.feed,
                                    is: "added",
                                    callback: t => {
                                        t.added.forEach((t => {
                                            t.dataset.sfSkip || v.addButtonForFeedItem(t);
                                        }));
                                    }
                                } ]
                            });
                        },
                        stop() {
                            this.observer && this.observer.stop(), document.querySelectorAll(".sf-dl-container, .sf-feed-dl-container").forEach((t => {
                                t.remove();
                            })), v.style && v.style.remove(), [ "sfSkip", "sfReady" ].forEach((function(t) {
                                for (var e, o = (0, _.A)(t), n = document.querySelectorAll("[" + o + "]"), r = 0; e = n[r]; r++) e.removeAttribute(o);
                            }));
                        }
                    },
                    addButtonForFeedItem: t => (0, a.A)(s().mark((function e() {
                        var o, n, a, i, l, d, c;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (o = t.closest(".item-video-container")) {
                                    e.next = 3;
                                    break;
                                }
                                return e.abrupt("return");

                              case 3:
                                return (n = document.createElement("div")).classList.add("sf-feed-dl-container"), 
                                e.next = 7, L.P.createLinkExtractor("tt-video").extractLinks({
                                    element: t
                                });

                              case 7:
                                a = e.sent, i = (0, r.A)(a, 1), l = i[0], d = l.url, c = l.filename, v.createDownloadButton(n, c, d, T), 
                                t.dataset.sfSkip = "1", o.appendChild(n);

                              case 15:
                              case "end":
                                return e.stop();
                            }
                        }), e);
                    })))(),
                    runDesktop: t => (0, a.A)(s().mark((function e() {
                        var o, a, i, l, d, c, f, u, _, p;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if ((o = t).src) {
                                    e.next = 6;
                                    break;
                                }
                                if (a = t.querySelector("source")) {
                                    e.next = 5;
                                    break;
                                }
                                return e.abrupt("return", P.error("videoElement don't found"));

                              case 5:
                                o = a;

                              case 6:
                                if (i = t.parentElement, l = E, (t.closest('div[data-e2e="feed-video"]') || t.closest('div[data-e2e="user-post-item-list"]')) && (l = T), 
                                t.closest('div[data-e2e="browse-video"]') && (l = S), !i || i.dataset.sfReady) {
                                    e.next = 25;
                                    break;
                                }
                                return i.dataset.sfReady = String(1), (d = document.createElement("div")).classList.add("sf-dl-container"), 
                                i.appendChild(d), e.next = 17, L.P.createLinkExtractor("tt-video").extractLinks({
                                    element: o
                                });

                              case 17:
                                c = e.sent, f = (0, r.A)(c, 1), u = f[0], _ = u.url, p = u.filename, o && o.src, 
                                n("url"), Date.now(), n("filename"), v.createDownloadButton(d, p, _, l);

                              case 25:
                              case "end":
                                return e.stop();
                            }
                        }), e);
                    })))(),
                    createDownloadButton: (t, e, n, r) => ((0, k.A)({
                        category: "append",
                        subcategory: "ti",
                        event: "b"
                    }), (0, k.A)({
                        category: "type",
                        subcategory: "ti",
                        event: n.startsWith("blob") ? "blob" : "video"
                    }), (0, b.A)((0, m.n)(C, {
                        url: n,
                        filename: e,
                        containerType: r
                    }, [ (0, m.n)("img", {
                        src: o.svg.getSrc("download", "#fff")
                    }) ]), t)),
                    injectStyle() {
                        this.style = O.A.create("style", {
                            text: (0, j.A)({
                                ".sf-dl-container": {
                                    display: "none"
                                },
                                "[class*=-DivVideoContainer]:hover .sf-dl-container": {
                                    display: "block"
                                },
                                '[data-sf-ready="1"]:hover .sf-dl-container': {
                                    display: "block"
                                }
                            })
                        }), document.body.appendChild(this.style);
                    },
                    changeState(t) {
                        d = t, this.mutationMode.stop(), t && this.run();
                    }
                }, h = {
                    mutationMode: {
                        observer: null,
                        start() {
                            if (this.observer) return this.observer.start();
                            this.observer = new f.A({
                                queries: [ {
                                    css: c.tiktok.embedVideoAdd,
                                    is: "added",
                                    callback: t => {
                                        for (var e, o = 0; e = t.added[o]; o++) e.dataset.sfSkip > 0 || (e.dataset.sfSkip = "1", 
                                        h.insertDownloadButton(e));
                                    }
                                } ]
                            });
                        }
                    },
                    insertDownloadButton(t) {
                        var e;
                        t.dataset.sfReady || (t.dataset.sfReady = String(1), t.addEventListener("mouseenter", (0, 
                        a.A)(s().mark((function o() {
                            var n, a, i, l, d, c;
                            return s().wrap((function(o) {
                                for (;;) switch (o.prev = o.next) {
                                  case 0:
                                    if (n = document.querySelector("video")) {
                                        o.next = 3;
                                        break;
                                    }
                                    return o.abrupt("return");

                                  case 3:
                                    return o.next = 5, L.P.createLinkExtractor("tt-video").extractLinks({
                                        element: n
                                    });

                                  case 5:
                                    a = o.sent, i = (0, r.A)(a, 1), l = i[0], d = l.url, c = l.filename, e = v.createDownloadButton(t, c, d, S);

                                  case 11:
                                  case "end":
                                    return o.stop();
                                }
                            }), o);
                        })))), t.addEventListener("mouseleave", (() => {
                            e && e();
                        })));
                    }
                };
            }));
        },
        1420: (t, e, o) => {
            "use strict";
            o.r(e), o.d(e, {
                default: () => s
            });
            var n = o(1601), r = o.n(n), a = o(6314), i = o.n(a)()(r());
            i.push([ t.id, ".Eov85--container{position:absolute;z-index:10}.XufYV--sf__tooltip{cursor:default;display:block;left:2px;outline:none;position:absolute;top:35px;transition:opacity .25s;-moz-user-select:none;user-select:none;white-space:nowrap;z-index:10000}.ZtQW0--sf__tooltip__container{background-color:#4d4d4d;border-radius:8px;color:#fff;display:flex;font-family:Arial;font-size:14px;font-weight:700;margin-bottom:0;outline:none;padding:8px}.ju4Tx--sf__tooltip__text{padding-top:6px}.YAbwt--sf__tooltip__text__alt{display:inline-block;margin-top:5px}.uQ1Uh--sf__tooltip__button{background-color:#000;border:solid #000;border-radius:5px;border-width:1px 1px 3px;height:18px;margin:4px 4px 0;width:20px}.XoUQQ--sf__tooltip__triangle{border-color:transparent transparent #4d4d4d;border-style:solid;border-width:0 8px 8px;height:0;left:8px;position:relative;width:0}.sJxKE--sf__tooltip__button_whiteground{fontWeight:bold;background-color:#fff;border-radius:5px;color:#000;font-size:8px;height:18px;position:relative;text-align:center;width:20px;z-index:1}.FdAjY--sf__tooltip__button_safari,.O5gYS--sf__tooltip__button_whiteground_safari{width:27px}.Eov85--container.iyXzy--largeContainer{left:145px;top:20px}.Eov85--container.CxPJk--middleContainer{left:20px;top:20px}.Eov85--container.LTfwV--feedItemContainer{left:10px;top:10px}.atPOP--button{align-items:center;background-color:rgba(0,0,0,.5);border:1px solid hsla(0,0%,50%,.5);border-radius:50%;display:flex;height:30px;justify-content:center;width:30px;z-index:9}.atPOP--button a{padding:10px}", "" ]), 
            i.locals = {
                container: "Eov85--container",
                sf__tooltip: "XufYV--sf__tooltip",
                sfTooltip: "XufYV--sf__tooltip",
                sf__tooltip__container: "ZtQW0--sf__tooltip__container",
                sfTooltipContainer: "ZtQW0--sf__tooltip__container",
                sf__tooltip__text: "ju4Tx--sf__tooltip__text",
                sfTooltipText: "ju4Tx--sf__tooltip__text",
                sf__tooltip__text__alt: "YAbwt--sf__tooltip__text__alt",
                sfTooltipTextAlt: "YAbwt--sf__tooltip__text__alt",
                sf__tooltip__button: "uQ1Uh--sf__tooltip__button",
                sfTooltipButton: "uQ1Uh--sf__tooltip__button",
                sf__tooltip__triangle: "XoUQQ--sf__tooltip__triangle",
                sfTooltipTriangle: "XoUQQ--sf__tooltip__triangle",
                sf__tooltip__button_whiteground: "sJxKE--sf__tooltip__button_whiteground",
                sfTooltipButtonWhiteground: "sJxKE--sf__tooltip__button_whiteground",
                sf__tooltip__button_safari: "FdAjY--sf__tooltip__button_safari",
                sfTooltipButtonSafari: "FdAjY--sf__tooltip__button_safari",
                sf__tooltip__button_whiteground_safari: "O5gYS--sf__tooltip__button_whiteground_safari",
                sfTooltipButtonWhitegroundSafari: "O5gYS--sf__tooltip__button_whiteground_safari",
                largeContainer: "iyXzy--largeContainer",
                middleContainer: "CxPJk--middleContainer",
                feedItemContainer: "LTfwV--feedItemContainer",
                button: "atPOP--button"
            };
            const s = i;
        },
        2452: (t, e, o) => {
            var n = o(5072), r = o(1420);
            "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ t.id, r, "" ] ]);
            var a, i = 0, s = {
                injectType: "lazyStyleTag",
                insert: "head",
                singleton: !1
            }, l = {};
            l.locals = r.locals || {}, l.use = function() {
                return i++ || (a = n(r, s)), l;
            }, l.unuse = function() {
                i > 0 && ! --i && (a(), a = null);
            }, t.exports = l;
        }
    }, o = {};
    function n(t) {
        var r = o[t];
        if (void 0 !== r) return r.exports;
        var a = o[t] = {
            id: t,
            exports: {}
        };
        return e[t].call(a.exports, a, a.exports, n), a.exports;
    }
    n.m = e, t = [], n.O = (e, o, r, a) => {
        if (!o) {
            var i = 1 / 0;
            for (c = 0; c < t.length; c++) {
                for (var [o, r, a] = t[c], s = !0, l = 0; l < o.length; l++) (!1 & a || i >= a) && Object.keys(n.O).every((t => n.O[t](o[l]))) ? o.splice(l--, 1) : (s = !1, 
                a < i && (i = a));
                if (s) {
                    t.splice(c--, 1);
                    var d = r();
                    void 0 !== d && (e = d);
                }
            }
            return e;
        }
        a = a || 0;
        for (var c = t.length; c > 0 && t[c - 1][2] > a; c--) t[c] = t[c - 1];
        t[c] = [ o, r, a ];
    }, n.n = t => {
        var e = t && t.__esModule ? () => t.default : () => t;
        return n.d(e, {
            a: e
        }), e;
    }, n.d = (t, e) => {
        for (var o in e) n.o(e, o) && !n.o(t, o) && Object.defineProperty(t, o, {
            enumerable: !0,
            get: e[o]
        });
    }, n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (t) {
            if ("object" == typeof window) return window;
        }
    }(), n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), n.r = t => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, n.j = 3, (() => {
        n.b = document.baseURI || self.location.href;
        var t = {
            3: 0
        };
        n.O.j = e => 0 === t[e];
        var e = (e, o) => {
            var r, a, [i, s, l] = o, d = 0;
            if (i.some((e => 0 !== t[e]))) {
                for (r in s) n.o(s, r) && (n.m[r] = s[r]);
                if (l) var c = l(n);
            }
            for (e && e(o); d < i.length; d++) a = i[d], n.o(t, a) && t[a] && t[a][0](), t[a] = 0;
            return n.O(c);
        }, o = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        o.forEach(e.bind(null, 0)), o.push = e.bind(null, o.push.bind(o));
    })(), n.nc = void 0;
    var r = n.O(void 0, [ 223 ], (() => n(8993)));
    r = n.O(r);
})();