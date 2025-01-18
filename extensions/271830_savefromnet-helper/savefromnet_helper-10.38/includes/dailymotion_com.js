(() => {
    "use strict";
    var e, t = {
        6270: (e, t, n) => {
            var o = n(467), r = n(4756), i = n.n(r), a = n(9242), s = n(9620), c = n(9589), d = n(7736), u = n(8139), l = n(4353), f = n(9580), p = n(5563), m = n(8244), v = n(4733), h = n(8233), b = n(9022), g = n(1460), y = n(4689), k = n(3948), x = n(6714), A = (0, 
            h.A)("dailymotion_com");
            b.A.isSingle() && (0, c.Ys)("dailymotion", (function(e, t) {
                var n = (0, s.A)(t), r = t.preferences, c = r.moduleDailymotion ? 1 : 0, h = t.preferences.selectorsConfig, b = (0, 
                d.A)() && /\/embed\/([\w\-]+)/i.test(document.location.href);
                a.A.onMessage.addListener((function(t, n, o) {
                    if ("getModuleInfo" === t.action) {
                        if (t.url !== location.href) return;
                        return o({
                            state: c,
                            moduleName: e
                        });
                    }
                    if ("changeState" === t.action) {
                        if (e !== t.moduleName) return;
                        return M.changeState(t.state);
                    }
                    "updatePreferences" !== t.action ? c && "updateLinks" === t.action && M.updateLinks() : Object.assign(r, t.preferences);
                })), c && setTimeout((function() {
                    (0, y.A)({
                        category: "append",
                        subcategory: "da",
                        event: "b"
                    }), M.run();
                }));
                var M = {
                    contextMenu: null,
                    linkCache: {},
                    embed: null,
                    title: "",
                    styleIndex: 0,
                    btnId: "sf__download_btn",
                    result: null,
                    popupIsShow: !1,
                    run: function() {
                        return c = 1, b ? ((0, y.A)({
                            category: "download",
                            subcategory: "da",
                            event: "video"
                        }), void M.appendIframeButtons()) : g.A.isAvailable() ? M.mutationMode.enable() : void 0;
                    },
                    changeState: function(e) {
                        b || (c = e, M.rmBtn(), M.mutationMode.stop(), e && M.run());
                    },
                    hideMenu: function() {
                        M.contextMenu && M.contextMenu.isShow && (M.contextMenu.hide(), M.contextMenu = null);
                    },
                    updateLinks: function() {
                        M.changeState(0), M.changeState(1);
                    },
                    appendIframeButtons: function() {
                        var e = this, t = n.frameMenu.getBtn({
                            quickBtnStyleObj: {
                                display: "inline-block",
                                cursor: "pointer",
                                position: "relative",
                                padding: "9px 10px"
                            },
                            quickBtnCssStyle: {
                                backgroundColor: "rgba(0,0,0,.75)"
                            },
                            singleBtn: !0,
                            btnId: e.btnId,
                            containerStyle: {
                                right: "50px",
                                top: "10px"
                            },
                            quickBtnIcon: v.A.create(n.svg.getSvg("download", "#ffffff"), {
                                style: {
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    verticalAlign: "middle"
                                }
                            }),
                            on: [ [ "click", function(o) {
                                if (o.preventDefault(), o.stopPropagation(), e.contextMenu && e.contextMenu.isShow) e.hideMenu(); else {
                                    var r = e.getIdFromUrl(), i = a.A.i18n.getMessage("download") + " ...", s = e.linkCache[r];
                                    s && (i = n.popupMenu.prepareLinks.dailymotion(s.links, s.title));
                                    var c = e.contextMenu = n.frameMenu.getMenu(this, i, "sf-frame-menu", {
                                        container: t.container,
                                        onShow: function() {
                                            t.node.classList.add("sf-over");
                                        },
                                        onHide: function() {
                                            e.contextMenu = null, t.node.classList.remove("sf-over");
                                        }
                                    });
                                    s || a.A.sendMessage({
                                        action: "getDailymotionLinks",
                                        extVideoId: r,
                                        metadata: e.getMetadata(r)
                                    }, (function(t) {
                                        var o = a.A.i18n.getMessage("noLinksFound");
                                        t.links && (e.linkCache[r] = t, o = n.popupMenu.prepareLinks.dailymotion(t.links, t.title)), 
                                        c.update(o);
                                    }));
                                }
                            } ], [ "mousedown", function(n) {
                                n.stopPropagation(), 2 === n.button && (m.A.off(document.body, "mousemove", s), 
                                e.hideMenu(), t.container.parentNode && t.container.parentNode.removeChild(t.container));
                            } ] ]
                        });
                        t.quickBtn.title = a.A.i18n.getMessage("download"), t.container = v.A.create("div", {
                            class: "sf-btn-ctr",
                            append: t.node
                        }), m.A.on(t.container, "mouseenter", (function() {
                            t.lockHide = !0;
                        })), m.A.on(t.container, "mouseleave", (function() {
                            t.lockHide = !1;
                        }));
                        var o = null, r = !1, i = function() {
                            t.lockHide || (t.container.classList.add("sf-hide-ui"), r = !0);
                        }, s = function() {
                            r && (t.container.classList.remove("sf-hide-ui"), r = !1), clearTimeout(o), o = setTimeout(i, 3e3);
                        };
                        m.A.on(document.body, "mousemove", s), t.node.appendChild(v.A.create("style", {
                            text: (0, p.A)([ {
                                selector: [ "body:hover .sf-btn-ctr:not(.sf-hide-ui) #" + e.btnId, "body:hover .sf-btn-ctr:not(.sf-hide-ui) .sf-frame-menu" ],
                                style: {
                                    display: "block"
                                }
                            } ])
                        })), document.body.appendChild(t.container);
                    },
                    getIdFromUrl: function(e) {
                        var t = (e = e || location.href).match(/\/embed\/video\/([a-z0-9]+)/);
                        return t = t && t[1];
                    },
                    getMetadata: function(e) {
                        var t = null;
                        return (0, l.A)(document.body.innerHTML, /playerV5/).some((function(n) {
                            return (0, f.A)(n).some((function(n) {
                                if (n && n.metadata && n.metadata.id === e) return t = n.metadata, !0;
                            }));
                        })), t;
                    },
                    rmBtn: function() {
                        for (var e, t = document.querySelectorAll([ "#" + M.btnId, ".sf-wrapper" ]), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                        M.result = null, M.popupIsShow = !1;
                    },
                    insertBtn: function(e) {
                        if (!e.querySelector(".sf-dl-btn")) {
                            var r = v.A.create("button", {
                                id: M.btnId,
                                class: [ "sf-dl-btn" ],
                                title: a.A.i18n.getMessage("download"),
                                append: [ v.A.create("span", {
                                    append: [ n.svg.getSvg("download", "#000") ]
                                }), v.A.create("style", {
                                    text: (0, p.A)({
                                        selector: ".sf-dl-btn",
                                        style: {
                                            display: "block",
                                            border: 0,
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            background: "#e8e8e8",
                                            minWidth: "40px",
                                            maxWidth: "40px",
                                            height: "40px",
                                            alignSelf: "center"
                                        },
                                        append: {
                                            selector: "span",
                                            style: {
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginRight: "auto",
                                                marginLeft: "auto",
                                                width: "16px",
                                                height: "16px"
                                            }
                                        }
                                    })
                                }) ],
                                on: [ "click", function() {
                                    var e = (0, o.A)(i().mark((function e(o) {
                                        var r, s, c, d, u;
                                        return i().wrap((function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                              case 0:
                                                if (o.preventDefault(), o.stopPropagation(), r = e => e.map((e => ({
                                                    ext: e.ext,
                                                    forceDownload: e.forceDownload,
                                                    format: e.format,
                                                    href: e.url,
                                                    quality: e.quality,
                                                    title: e.filename,
                                                    func: t => {
                                                        e.func && e.func(t);
                                                    }
                                                }))), !M.contextMenu || !M.contextMenu.isShow) {
                                                    e.next = 7;
                                                    break;
                                                }
                                                M.hideMenu(), e.next = 22;
                                                break;

                                              case 7:
                                                return s = a.A.i18n.getMessage("download") + " ...", e.prev = 8, c = k.A.getPageType(window.location.href), 
                                                d = M.contextMenu = n.popupMenu.quickInsert(this, s, "sf-popupMenu"), e.next = 13, 
                                                x.P.createLinkExtractor(c).extractLinks({
                                                    initData: t
                                                });

                                              case 13:
                                                u = e.sent, d.update(r(u)), e.next = 21;
                                                break;

                                              case 17:
                                                e.prev = 17, e.t0 = e.catch(8), A.debug("Load links error", e.t0), d.update(a.A.i18n.getMessage("noLinksFound"));

                                              case 21:
                                              case 22:
                                              case "end":
                                                return e.stop();
                                            }
                                        }), e, this, [ [ 8, 17 ] ]);
                                    })));
                                    return function(t) {
                                        return e.apply(this, arguments);
                                    };
                                }() ]
                            });
                            m.A.onRemoveEvent(r, (t => {
                                e.dataset.sfSkip = 0, document.body.contains(e) && this.mutationMode.observer.trigger(e);
                            })), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
                        }
                    },
                    mutationMode: {
                        observer: null,
                        stop: function() {
                            this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                                for (var t, n = (0, u.A)(e), o = document.querySelectorAll("[" + n + "]"), r = 0; t = o[r]; r++) t.removeAttribute(n);
                            }));
                        },
                        enable: function() {
                            if (this.observer) return this.observer.start();
                            this.observer = new g.A({
                                queries: [ {
                                    css: h.dailymotion.video,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        M.insertBtn(t));
                                    }
                                }, {
                                    css: `.${m.A.onRemoveClassName}`,
                                    is: "removed",
                                    callback: e => {
                                        for (var t, n = 0; t = e.removed[n]; n++) m.A.onRemoveListener(t);
                                    }
                                } ]
                            });
                        }
                    }
                };
            }), (function() {
                if (!(0, d.A)()) return !0;
                if (/\/embed\/([\w\-]+)/i.test(location.href)) {
                    var e = !1;
                    try {
                        e = location.hostname === window.parent.location.hostname;
                    } catch (e) {}
                    return !e;
                }
            }));
        }
    }, n = {};
    function o(e) {
        var r = n[e];
        if (void 0 !== r) return r.exports;
        var i = n[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, o), i.exports;
    }
    o.m = t, e = [], o.O = (t, n, r, i) => {
        if (!n) {
            var a = 1 / 0;
            for (u = 0; u < e.length; u++) {
                for (var [n, r, i] = e[u], s = !0, c = 0; c < n.length; c++) (!1 & i || a >= i) && Object.keys(o.O).every((e => o.O[e](n[c]))) ? n.splice(c--, 1) : (s = !1, 
                i < a && (a = i));
                if (s) {
                    e.splice(u--, 1);
                    var d = r();
                    void 0 !== d && (t = d);
                }
            }
            return t;
        }
        i = i || 0;
        for (var u = e.length; u > 0 && e[u - 1][2] > i; u--) e[u] = e[u - 1];
        e[u] = [ n, r, i ];
    }, o.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return o.d(t, {
            a: t
        }), t;
    }, o.d = (e, t) => {
        for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        });
    }, o.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), o.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, o.j = 270, (() => {
        o.b = document.baseURI || self.location.href;
        var e = {
            270: 0
        };
        o.O.j = t => 0 === e[t];
        var t = (t, n) => {
            var r, i, [a, s, c] = n, d = 0;
            if (a.some((t => 0 !== e[t]))) {
                for (r in s) o.o(s, r) && (o.m[r] = s[r]);
                if (c) var u = c(o);
            }
            for (t && t(n); d < a.length; d++) i = a[d], o.o(e, i) && e[i] && e[i][0](), e[i] = 0;
            return o.O(u);
        }, n = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n));
    })(), o.nc = void 0;
    var r = o.O(void 0, [ 223 ], (() => o(6270)));
    r = o.O(r);
})();