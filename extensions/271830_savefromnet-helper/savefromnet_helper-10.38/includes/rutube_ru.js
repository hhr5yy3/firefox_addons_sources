(() => {
    "use strict";
    var e, t = {
        9650: (e, t, n) => {
            var o = n(9242), r = n(9620), i = n(9589), a = n(7736), s = n(8139), u = n(5563), c = n(2525), l = n(8244), d = n(4733), f = n(9022), p = n(1460);
            f.A.isSingle() && (0, i.Ys)("rutube", (function(e, t) {
                var n = (0, r.A)(t), i = t.preferences, f = i.moduleRutube ? 1 : 0, v = t.preferences.selectorsConfig, h = (0, 
                a.A)();
                o.A.onMessage.addListener((function(t, n, o) {
                    if ("getModuleInfo" === t.action) {
                        if (t.url !== location.href) return;
                        return o({
                            state: f,
                            moduleName: e
                        });
                    }
                    if ("changeState" === t.action) {
                        if (e !== t.moduleName) return;
                        return m.changeState(t.state);
                    }
                    if ("updatePreferences" !== t.action) {
                        if (f) return "updateLinks" === t.action ? m.updateLinks() : void 0;
                    } else Object.assign(i, t.preferences);
                })), f && setTimeout((function() {
                    m.run();
                }));
                var m = {
                    buttonClassName: "sf-button",
                    contextMenu: null,
                    run() {
                        if (f = 1, h) return m.frame();
                        p.A.isAvailable() && m.mutationMode.enable();
                    },
                    changeState: function(e) {
                        f = e, this.hideMenu(), this.rmDlLinks(), this.mutationMode.stop(), e && this.run();
                    },
                    hideMenu() {
                        m.contextMenu && (m.contextMenu.hide(), m.contextMenu = null);
                    },
                    updateLinks() {
                        this.changeState(0), this.changeState(1);
                    },
                    rmDlLinks() {
                        for (var e, t = document.querySelectorAll(`.${this.buttonClassName}`), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    },
                    insertDownloadLink(e) {
                        for (var t, r = e.querySelectorAll(`.${this.buttonClassName}`), i = 0; t = r[i]; i++) t.parentNode.removeChild(t);
                        r = null;
                        var a = function() {
                            var e = location.href;
                            return "ummy" + e.substr(e.indexOf("://"));
                        }, s = a(), u = d.A.create("a", {
                            href: s,
                            className: `${this.buttonClassName} video-tools__tools-button`,
                            target: "_blank",
                            on: [ [ "click", function(t) {
                                var o;
                                if (t.preventDefault(), t.stopPropagation(), o = a(), s !== o && (s = o, u.href = o), 
                                m.contextMenu && m.contextMenu.isShow) m.hideMenu(); else {
                                    var r = n.popupMenu.prepareLinks.rutube(a());
                                    m.contextMenu = n.popupMenu.quickInsert(this, r, "sf-popupMenu", {
                                        parent: (0, c.A)(e, ".b-video__description")
                                    });
                                }
                            } ] ],
                            append: [ n.svg.getSvg("download", "#6c9b01", 20, 20), d.A.create("span", {
                                text: o.A.i18n.getMessage("download"),
                                style: {
                                    color: "#6c9b01"
                                }
                            }) ]
                        });
                        l.A.onRemoveEvent(u, m.hideMenu), e.insertAdjacentElement("afterbegin", u);
                    },
                    frame() {
                        var e = this, t = "sfDlBtn", r = n.frameMenu.getBtn({
                            singleBtn: !0,
                            btnId: t,
                            containerStyle: {
                                right: "50px",
                                top: "6px"
                            },
                            quickBtnStyleObj: {
                                display: "inline-block",
                                border: 0,
                                borderRadius: ".3em",
                                cursor: "pointer",
                                position: "relative",
                                padding: "4px 6px"
                            },
                            quickBtnCssStyle: {
                                backgroundColor: "transparent"
                            },
                            quickBtnIcon: d.A.create(n.svg.getSvg("download", "#ffffff"), {
                                style: {
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    verticalAlign: "middle"
                                }
                            }),
                            nodeCssStyle: {
                                display: "none"
                            },
                            on: [ [ "click", function(t) {
                                if (t.preventDefault(), t.stopPropagation(), o.A.sendMessage({
                                    action: "checkAndOpenProLanding",
                                    id: "ru-2"
                                }), e.contextMenu && e.contextMenu.isShow) e.hideMenu(); else {
                                    var i = n.popupMenu.prepareLinks.rutube(location.href);
                                    e.contextMenu = n.frameMenu.getMenu(this, i, "sf-frame-menu", {
                                        container: r.container,
                                        onShow() {
                                            r.node.classList.add("sf-over");
                                        },
                                        onHide() {
                                            e.contextMenu = null, r.node.classList.remove("sf-over");
                                        }
                                    });
                                }
                            } ], [ "mousedown", function(t) {
                                t.stopPropagation(), 2 === t.button && (l.A.off(document.body, "mousemove", c), 
                                e.hideMenu(), r.container.parentNode && r.container.parentNode.removeChild(r.container));
                            } ] ]
                        });
                        r.quickBtn.title = o.A.i18n.getMessage("download"), r.container = d.A.create("div", {
                            class: "sf-btn-ctr",
                            append: r.node
                        }), l.A.on(r.container, "mouseenter", (function() {
                            r.lockHide = !0;
                        })), l.A.on(r.container, "mouseleave", (function() {
                            r.lockHide = !1;
                        }));
                        var i = null, a = !1, s = function() {
                            r.lockHide || (r.container.classList.add("sf-hide-ui"), a = !0);
                        }, c = function() {
                            a && (r.container.classList.remove("sf-hide-ui"), a = !1), clearTimeout(i), i = setTimeout(s, 3e3);
                        };
                        l.A.on(document.body, "mousemove", c), r.node.appendChild(d.A.create("style", {
                            text: (0, u.A)([ {
                                selector: [ "body:hover .sf-btn-ctr:not(.sf-hide-ui) #" + t, "body:hover .sf-btn-ctr:not(.sf-hide-ui) .sf-frame-menu" ],
                                style: {
                                    display: "block"
                                }
                            } ])
                        })), document.body.appendChild(r.container);
                    },
                    mutationMode: {
                        observer: null,
                        stop() {
                            this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                                for (var t, n = (0, s.A)(e), o = document.querySelectorAll("[" + n + "]"), r = 0; t = o[r]; r++) t.removeAttribute(n);
                            }));
                        },
                        enable() {
                            if (this.observer) return this.observer.start();
                            this.observer = new p.A({
                                queries: [ {
                                    css: v.rutube.videoToolsAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        m.insertDownloadLink(t));
                                    }
                                }, {
                                    css: `.${l.A.onRemoveClassName}`,
                                    is: "removed",
                                    callback: e => {
                                        for (var t, n = 0; t = e.removed[n]; n++) l.A.onRemoveListener(t);
                                    }
                                } ]
                            });
                        }
                    }
                };
            }), (function() {
                return Promise.resolve().then((() => {
                    if ((0, a.A)()) {
                        var e = !1;
                        try {
                            e = location.hostname === window.parent.location.hostname;
                        } catch (e) {}
                        return !e;
                    }
                    return !0;
                })).then((e => !!e && o.A.callFn("getPreferences").then((e => !!e.showUmmyItem))));
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
            for (l = 0; l < e.length; l++) {
                for (var [n, r, i] = e[l], s = !0, u = 0; u < n.length; u++) (!1 & i || a >= i) && Object.keys(o.O).every((e => o.O[e](n[u]))) ? n.splice(u--, 1) : (s = !1, 
                i < a && (a = i));
                if (s) {
                    e.splice(l--, 1);
                    var c = r();
                    void 0 !== c && (t = c);
                }
            }
            return t;
        }
        i = i || 0;
        for (var l = e.length; l > 0 && e[l - 1][2] > i; l--) e[l] = e[l - 1];
        e[l] = [ n, r, i ];
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
    }, o.j = 714, (() => {
        o.b = document.baseURI || self.location.href;
        var e = {
            714: 0
        };
        o.O.j = t => 0 === e[t];
        var t = (t, n) => {
            var r, i, [a, s, u] = n, c = 0;
            if (a.some((t => 0 !== e[t]))) {
                for (r in s) o.o(s, r) && (o.m[r] = s[r]);
                if (u) var l = u(o);
            }
            for (t && t(n); c < a.length; c++) i = a[c], o.o(e, i) && e[i] && e[i][0](), e[i] = 0;
            return o.O(l);
        }, n = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n));
    })(), o.nc = void 0;
    var r = o.O(void 0, [ 223 ], (() => o(9650)));
    r = o.O(r);
})();