(() => {
    "use strict";
    var e, t = {
        4425: (e, t, n) => {
            var a = n(467), i = n(4756), r = n.n(i), s = n(9242), o = n(9620), l = n(9589), d = n(7736), c = n(8278), p = n(8139), f = n(5563), u = n(3372), v = n(2525), b = n(8244), h = n(4733), m = n(8233), y = n(9022), g = n(1460), A = n(7661), k = n(188), S = n(4689), x = n(6714);
            (0, m.A)("vimeo_com");
            y.A.isSingle() && (0, l.Ys)("vimeo", (function(e, t) {
                var n = (0, o.A)(t), i = t.preferences, l = i.moduleVimeo ? 1 : 0, m = (0, d.A)(), y = t.preferences.selectorsConfig;
                s.A.onMessage.addListener((function(t, n, a) {
                    if ("getModuleInfo" === t.action) {
                        if (t.url !== location.href) return;
                        return a({
                            state: l,
                            moduleName: e
                        });
                    }
                    if ("changeState" === t.action) {
                        if (e !== t.moduleName) return;
                        return M.changeState(t.state);
                    }
                    "updatePreferences" !== t.action || Object.assign(i, t.preferences);
                })), l && setTimeout((function() {
                    M.run();
                }));
                var w, C, M = {
                    panelId: "savefrom__vimeo_links",
                    btnBox: null,
                    clipId: null,
                    timer: null,
                    btnPrefix: "sd_ld_bnt_",
                    popupIsShow: !1,
                    dlBtnClassName: "sf-dl-btn",
                    currentMenu: null,
                    run: function() {
                        if (l = 1, m) {
                            if (M.clipId = M.getFrameClipId(), M.clipId) return M.appendIframeButtons();
                            m = !1;
                        }
                        this.videoFeed.injectStyle(), g.A.isAvailable() && this.mutationMode.enable();
                    },
                    changeState: function(e) {
                        m || (l = e, M.videoFeed.disable(), M.rmAllBtn(), M.mutationMode.stop(), e && M.run());
                    },
                    hideMenu: function() {
                        M.currentMenu && (M.currentMenu.hide(), M.currentMenu = null);
                    },
                    getFrameClipId: function() {
                        var e = document.location.href.match(/player\.vimeo\.com\/video\/([\w\-]+)/i);
                        if (e = e && e[1]) return e;
                    },
                    getBrowserVideoData: function(e, t) {
                        var n = e.querySelector(".uploaded_on");
                        if (n || (n = e.querySelector("#info .meta .stats")), !n) return null;
                        if (t && (t = (t = t.match(/([0-9]+)$/)) && t[1]), !t) {
                            var a = e.querySelector("a.js-title") || e.querySelector("a");
                            if (!a) return;
                            var i = a.getAttribute("href");
                            if (!i) return;
                            t = (t = i.match(/\/([0-9]+)$/)) && t[1];
                        }
                        return t ? {
                            id: t,
                            parent: n,
                            style: 1
                        } : void 0;
                    },
                    getVimeoIdFromUrl: e => e.split("/").pop(),
                    getVideoId: function(e) {
                        var t, n = null;
                        if (t = (e = e || document).querySelector(".player[data-clip-id]")) return t.dataset.clipId;
                        if (t = e.querySelector(".player[data-fallback-url]")) {
                            var a = t.dataset.fallbackUrl || "";
                            if (a = a.match(/video\/([0-9]+)\//)) return a[1];
                        }
                        return (t = e.querySelector("div.player_wrapper > div.faux_player[data-clip_id]")) && (n = t.dataset.clip_id) ? n : void 0;
                    },
                    onBtnClick: (C = (0, a.A)(r().mark((function e(a, i) {
                        var o, l, d, c, p, f, u, b, h;
                        return r().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (i.stopPropagation(), i.preventDefault(), (o = a.id) || (l = null, a.playerContainer && (l = (0, 
                                v.A)(a.parent, a.playerContainer)), o = M.getVideoId(l)), !M.currentMenu || !M.currentMenu.isShow) {
                                    e.next = 7;
                                    break;
                                }
                                return M.hideMenu(), e.abrupt("return");

                              case 7:
                                return d = s.A.i18n.getMessage("download") + " ...", c = {}, 4 === a.style && (c.offsetTop = 20), 
                                7 === a.style && (c.style = {
                                    popup: !0
                                }), p = this.dataset.sfMobile > 0, f = M.currentMenu = p ? n.mobileLightBox.show(d) : n.popupMenu.quickInsert(this, d, "sf-popupMenu", c), 
                                u = s.A.i18n.getMessage("noLinksFound"), e.prev = 14, h = function(e) {
                                    return Array.from(e).map((e => (e.title = e.filename, "hls" !== e.format ? e.href = e.url : e.href = "#muxer", 
                                    delete e.filename, delete e.url, e)));
                                }, e.next = 18, x.P.createLinkExtractor("vi-blog_video").extractLinks({
                                    mediaId: o,
                                    initData: t
                                });

                              case 18:
                                b = e.sent, u = h(b), e.next = 25;
                                break;

                              case 22:
                                e.prev = 22, e.t0 = e.catch(14), console.error("getLinks error", e.t0);

                              case 25:
                                f.update(u);

                              case 26:
                              case "end":
                                return e.stop();
                            }
                        }), e, this, [ [ 14, 22 ] ]);
                    }))), function(e, t) {
                        return C.apply(this, arguments);
                    }),
                    getPlayerConfig: () => (0, k.A)('function(){var clip=null;try{clip=vimeo.clip_page_config.clip}catch(err){throw new Error("Player config is not found")}return{clipId:vimeo.clip_page_config.clip.id,url:vimeo.clip_page_config.player.config_url,clip:clip}}'),
                    rmAllBtn: function() {
                        [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = (0, p.A)(e), a = document.querySelectorAll("[" + n + "]"), i = 0; t = a[i]; i++) t.removeAttribute(n);
                        }));
                        for (var e, t = document.querySelectorAll("." + M.dlBtnClassName), n = 0; e = t[n]; n++) "1" !== e.dataset.sfType && "3" !== e.dataset.sfType || (e = e.parentNode), 
                        e.parentNode.removeChild(e);
                        M.videoFeed.rmBtn(), M.hideMenu();
                    },
                    appendBtn: function(e) {
                        var t, a = e.parent, i = a.querySelector("." + M.dlBtnClassName);
                        if (i) {
                            if (!i.dataset.sfId && 6 !== e.style) return;
                            i.parentNode.removeChild(i), i = null;
                        }
                        if (1 === e.style ? t = h.A.create("a", {
                            text: s.A.i18n.getMessage("download"),
                            class: [ M.dlBtnClassName, "sf-style-1" ],
                            style: {
                                display: "inline"
                            },
                            data: {
                                sfId: e.id,
                                sfType: e.style
                            },
                            href: "#" + e.id
                        }) : 2 === e.style ? t = h.A.create("button", {
                            text: s.A.i18n.getMessage("download"),
                            class: [ M.dlBtnClassName, "btn", "iconify_down_b" ],
                            data: {
                                sfId: e.id,
                                sfType: e.style
                            }
                        }) : 5 === e.style ? t = h.A.create("button", {
                            class: [ M.dlBtnClassName, "sf-type-5" ],
                            data: {
                                sfId: e.id,
                                sfType: e.style
                            },
                            append: [ h.A.create(n.svg.getSvg("download", "#ffffff"), {
                                style: {
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    verticalAlign: "text-bottom",
                                    marginRight: ".625rem"
                                }
                            }), h.A.create("span", {
                                style: {
                                    marginLeft: 0
                                },
                                text: s.A.i18n.getMessage("download")
                            }) ]
                        }) : 7 === e.style ? t = h.A.create("button", {
                            class: [ M.dlBtnClassName, "sf-type-7" ],
                            data: {
                                sfId: e.id,
                                sfType: e.style
                            },
                            append: [ h.A.create(n.svg.getSvg("download", "#ffffff"), {
                                style: {
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    verticalAlign: "text-bottom",
                                    marginRight: ".625rem"
                                }
                            }), h.A.create("span", {
                                style: {
                                    marginLeft: 0
                                },
                                text: s.A.i18n.getMessage("download")
                            }) ]
                        }) : 3 === e.style ? t = h.A.create("button", {
                            class: [ M.dlBtnClassName, "iris_btn", "iris_btn-switch" ],
                            data: {
                                sfId: e.id,
                                sfType: e.style
                            },
                            append: [ h.A.create(n.svg.getSvg("download", "#00adef"), {
                                style: {
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    verticalAlign: "text-bottom",
                                    marginRight: ".625rem"
                                }
                            }), h.A.create("span", {
                                class: "iris_btn-content",
                                style: {
                                    marginLeft: 0
                                },
                                text: s.A.i18n.getMessage("download")
                            }) ]
                        }) : 4 === e.style ? t = h.A.create("i", {
                            class: [ M.dlBtnClassName, "sf-style-4" ],
                            data: {
                                sfId: e.id,
                                sfType: e.style
                            },
                            style: {
                                display: "inline-block",
                                border: "1px solid #F8F8F8",
                                width: "20px",
                                height: "20px",
                                lineHeight: 0,
                                cursor: "pointer",
                                marginLeft: "10px",
                                verticalAlign: "middle"
                            },
                            append: h.A.create("style", {
                                text: (0, f.A)([ {
                                    selector: "." + M.dlBtnClassName + ".sf-style-4",
                                    style: {
                                        background: "url(" + n.svg.getSrc("download", "#777777") + ") center no-repeat #F8F8F8",
                                        backgroundSize: "12px"
                                    }
                                }, {
                                    selector: "." + M.dlBtnClassName + ".sf-style-4:hover",
                                    style: {
                                        background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #F8F8F8",
                                        backgroundSize: "12px"
                                    }
                                }, {
                                    selector: "." + M.dlBtnClassName + ".sf-style-4:active",
                                    style: {
                                        outline: 0,
                                        boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                                    }
                                } ])
                            })
                        }) : 6 === e.style && (t = h.A.create("button", {
                            class: [ M.dlBtnClassName, "btn", "btn_sm", "btn_blue_o" ],
                            data: {
                                sfId: e.id,
                                sfType: e.style,
                                sfMobile: 1
                            },
                            style: {
                                marginLeft: "8px"
                            },
                            append: [ h.A.create(n.svg.getSvg("download", "#00adef"), {
                                style: {
                                    display: "inline-block",
                                    width: "12px",
                                    height: "12px",
                                    verticalAlign: "text-bottom",
                                    marginRight: "4px"
                                }
                            }), h.A.create("span", {
                                class: "btn_text",
                                style: {
                                    marginLeft: 0
                                },
                                text: s.A.i18n.getMessage("download")
                            }) ]
                        })), t.addEventListener("click", M.onBtnClick.bind(t, e)), 1 === e.style && (t = h.A.create("span", {
                            append: [ t, " | " ]
                        })), 3 === e.style && (t = h.A.create("div", {
                            class: "clip_info-user_actions",
                            append: [ t ]
                        })), 1 === e.style || 2 === e.style || 6 === e.style) {
                            var r = a.firstChild;
                            r ? a.insertBefore(t, r) : a.appendChild(t);
                        } else a.appendChild(t);
                        (0, S.A)({
                            category: "append",
                            subcategory: "vi",
                            event: "b"
                        });
                    },
                    playerStateChangeObserver: null,
                    observeVideoUi: function(e, t) {
                        var n = t;
                        if (n) {
                            var a = null, i = /(\s|^)with-controls(\s|$)/;
                            this.playerStateChangeObserver && this.playerStateChangeObserver.stop(), this.playerStateChangeObserver = new A.A({
                                attrs: [ {
                                    name: "class",
                                    callback(t) {
                                        var n = !i.test(t.oldValue), r = !i.test(t.value);
                                        !n && r ? (clearTimeout(a), a = setTimeout((function() {
                                            e.lockHide || e.container.classList.add("sf-hide-ui");
                                        }), 100)) : n && !r && (clearTimeout(a), e.container.classList.remove("sf-hide-ui"));
                                    }
                                } ],
                                target: n
                            });
                        }
                    },
                    appendIframeButtons: function() {
                        var e = this, i = n.frameMenu.getBtn({
                            quickBtnStyleObj: {
                                display: "inline-block",
                                border: 0,
                                borderRadius: ".3em",
                                cursor: "pointer",
                                position: "relative",
                                padding: "6px 8px"
                            },
                            quickBtnCssStyle: {
                                backgroundColor: "rgba(23,35,34,.75)"
                            },
                            quickBtnOverCssStyle: {
                                backgroundColor: "rgb(0, 173, 239)"
                            },
                            nodeCssStyle: {
                                display: "none"
                            },
                            singleBtn: !0,
                            btnId: e.panelId,
                            containerStyle: {
                                left: "10px",
                                top: "10px"
                            },
                            quickBtnIcon: h.A.create(n.svg.getSvg("download", "#ffffff"), {
                                style: {
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    verticalAlign: "middle"
                                }
                            }),
                            on: [ [ "click", function() {
                                var o = (0, a.A)(r().mark((function a(o) {
                                    var l, d, c, p, f, u;
                                    return r().wrap((function(a) {
                                        for (;;) switch (a.prev = a.next) {
                                          case 0:
                                            if (o.preventDefault(), o.stopPropagation(), s.A.sendMessage({
                                                action: "checkAndOpenProLanding"
                                            }), !e.currentMenu || !e.currentMenu.isShow) {
                                                a.next = 6;
                                                break;
                                            }
                                            return e.hideMenu(), a.abrupt("return");

                                          case 6:
                                            return l = e.clipId, d = s.A.i18n.getMessage("download") + " ...", c = e.currentMenu = n.frameMenu.getMenu(this, d, "sf-frame-menu", {
                                                leftMenuPos: !0,
                                                container: i.container,
                                                onShow: function() {
                                                    i.node.classList.add("sf-over");
                                                },
                                                onHide: function() {
                                                    e.currentMenu = null, i.node.classList.remove("sf-over");
                                                }
                                            }), p = s.A.i18n.getMessage("noLinksFound"), a.prev = 10, u = function(e) {
                                                return JSON.parse(JSON.stringify(e)).map((e => (e.title = e.filename, e.href = e.url, 
                                                delete e.filename, delete e.url, e)));
                                            }, a.next = 14, x.P.createLinkExtractor("vi-blog_video").extractLinks({
                                                mediaId: l,
                                                initData: t
                                            });

                                          case 14:
                                            f = a.sent, p = u(f), a.next = 21;
                                            break;

                                          case 18:
                                            a.prev = 18, a.t0 = a.catch(10), console.error("getLinks error", a.t0);

                                          case 21:
                                            c.update(p);

                                          case 22:
                                          case "end":
                                            return a.stop();
                                        }
                                    }), a, this, [ [ 10, 18 ] ]);
                                })));
                                return function(e) {
                                    return o.apply(this, arguments);
                                };
                            }() ], [ "mousedown", function(t) {
                                t.stopPropagation(), 2 === t.button && (o && (o.stop(), o = null), e.hideMenu(), 
                                i.container.parentNode && i.container.parentNode.removeChild(i.container));
                            } ] ]
                        });
                        i.quickBtn.title = s.A.i18n.getMessage("download"), i.container = h.A.create("div", {
                            class: "sf-btn-ctr",
                            append: i.node
                        }), b.A.on(i.container, "mouseenter", (function() {
                            i.lockHide = !0;
                        })), b.A.on(i.container, "mouseleave", (function() {
                            i.lockHide = !1;
                        })), i.node.appendChild(h.A.create("style", {
                            text: (0, f.A)([ {
                                selector: [ "body:hover .sf-btn-ctr:not(.sf-hide-ui) #" + e.panelId, "body:hover .sf-btn-ctr:not(.sf-hide-ui) .sf-frame-menu" ],
                                style: {
                                    display: "block"
                                }
                            } ])
                        })), document.body.appendChild(i.container);
                        var o = new g.A({
                            queries: [ {
                                css: y.vimeo.videoUi,
                                is: "added",
                                callback(t) {
                                    var n = t.added[0];
                                    n && (e.observeVideoUi(i, n), setTimeout((function() {
                                        o.stop(), o = null;
                                    }), 0));
                                }
                            } ]
                        });
                    },
                    videoFeed: {
                        btnClassName: "sf-feed-dl-btn",
                        style: null,
                        onClick: (w = (0, a.A)(r().mark((function e(a) {
                            var i, o, l, d, c, p;
                            return r().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    if (a.preventDefault(), a.stopPropagation(), i = this.dataset.sfId, this.dataset.sfCouchMode, 
                                    !M.currentMenu || !M.currentMenu.isShow) {
                                        e.next = 7;
                                        break;
                                    }
                                    return M.hideMenu(), e.abrupt("return");

                                  case 7:
                                    return o = s.A.i18n.getMessage("download") + " ...", l = M.currentMenu = n.popupMenu.quickInsert(this, o, "sf-popupMenu"), 
                                    d = s.A.i18n.getMessage("noLinksFound"), e.prev = 10, p = function(e) {
                                        return JSON.parse(JSON.stringify(e)).map((e => (e.title = e.filename, e.href = e.url, 
                                        delete e.filename, delete e.url, e)));
                                    }, e.next = 14, x.P.createLinkExtractor("vi-blog_video").extractLinks({
                                        mediaId: i,
                                        initData: t
                                    });

                                  case 14:
                                    c = e.sent, d = p(c), e.next = 21;
                                    break;

                                  case 18:
                                    e.prev = 18, e.t0 = e.catch(10), console.error("getLinks error", e.t0);

                                  case 21:
                                    l.update(d);

                                  case 22:
                                  case "end":
                                    return e.stop();
                                }
                            }), e, this, [ [ 10, 18 ] ]);
                        }))), function(e) {
                            return w.apply(this, arguments);
                        }),
                        getBtn: function(e) {
                            return h.A.create("i", {
                                class: e.classList,
                                data: {
                                    sfId: e.id,
                                    sfCouchMode: e.isCouchMode ? 1 : 0
                                },
                                on: [ "click", this.onClick ]
                            });
                        },
                        onImgOver2: function(e) {
                            var t, n, a = this.parentNode;
                            if ("A" === a.tagName) {
                                var i = a.getAttribute("href");
                                if (i && (n = (n = i.match(/^\/(\d+)$/)) && n[1]) && (t = a.parentNode) && t.classList.contains("contextclip-img") && !(t.dataset.sfBtn > 0)) {
                                    t.dataset.sfBtn = "1";
                                    var r = [ M.videoFeed.btnClassName, "sf-type1-btn" ];
                                    a.appendChild(M.videoFeed.getBtn({
                                        id: n,
                                        classList: r
                                    })), a = null, t = null;
                                }
                            }
                        },
                        onImgOver: function(e) {
                            var t, n, a = this.parentNode;
                            if ((0, u.A)(this, "a.contextclip-img-thumb")) {
                                t = this, a = this;
                                var i = /\/([0-9]+)/.exec(this.href);
                                i && (n = i[1]);
                            }
                            if (!n && ((0, u.A)(this, "div.iris_video-vital") || (0, u.A)(this, "li.clip_thumbnail"))) {
                                a = this.querySelector(".iris_thumbnail"), t = this;
                                var r = this.querySelector("a.iris_link-box");
                                if (r) {
                                    var s = r.href;
                                    !(n = (n = s.match(/\/([0-9]+)/)) && n[1]) && s && (n = JSON.stringify({
                                        url: s
                                    }));
                                }
                            }
                            if (!n && "LI" == a.tagName) {
                                if (!(n = a.dataset.resultId) || "clip_" !== n.substr(0, 5)) return;
                                n = n.substr(5), t = a, a = this.querySelector(".thumbnail_wrapper");
                            }
                            if (!n) {
                                if ("A" !== a.tagName) return;
                                if (n = a.dataset.clipId, !(t = a.parentNode)) return;
                            }
                            var o = !1;
                            if (!n) {
                                if ((o = "item_id" === (n = t.id).substr(0, 7) && t.classList.contains("clip")) || "clip" === n.substr(0, 4) || (n = void 0), 
                                !n && "ARTICLE" === t.tagName && t.classList.contains("clip_item") && (n = a.getAttribute("href")), 
                                !n) return;
                                (n = n.match(/([0-9]+)$/)) && (n = n[1]);
                            }
                            if (!t.dataset.sfBtn) {
                                t.dataset.sfBtn = "1";
                                var l = [ M.videoFeed.btnClassName ];
                                this.classList.contains("thumbnail_lg_wide") && l.push("sf-type1-btn"), this.classList.contains("contextclip-img-thumb") && l.push("sf-type4-btn"), 
                                (this.classList.contains("clip_thumbnail") || this.classList.contains("iris_video-vital")) && l.push("sf-type3-btn");
                                var d = t.parentNode;
                                d && "clips" === d.id && l.push("sf-type1-btn"), d = null, o && l.push("sf-type1-btn"), 
                                t.classList.contains("promo_clip") && 1 === l.length && l.push("sf-type1-btn"), 
                                a.appendChild(M.videoFeed.getBtn({
                                    id: n,
                                    classList: l,
                                    isCouchMode: o
                                })), a = null, t = null;
                            }
                        },
                        injectStyle: function() {
                            this.style ? !this.style.parentNode && document.head.appendChild(this.style) : (this.style = h.A.create("style", {
                                text: (0, f.A)([ {
                                    selector: [ ".sf-dl-btn.sf-type-5", ".sf-dl-btn.sf-type-7" ],
                                    style: {
                                        color: "#fff",
                                        borderColor: "#00adef",
                                        backgroundColor: "#00adef",
                                        minWidth: "68px",
                                        minHeight: "32px",
                                        padding: "0 10px",
                                        lineHeight: "30px",
                                        fontSize: "14px",
                                        width: "auto",
                                        position: "relative",
                                        margin: 0,
                                        fontWeight: 700,
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        borderRadius: "3px",
                                        letterSpacing: ".1px",
                                        transition: "all .1s ease-in-out",
                                        cursor: "pointer",
                                        marginLeft: ".5rem"
                                    }
                                }, {
                                    selector: [ ".sf-dl-btn.sf-type-7" ],
                                    style: {
                                        verticalAlign: "middle"
                                    }
                                }, {
                                    selector: [ ".sf-dl-btn.sf-type-5:hover", ".sf-dl-btn.sf-type-7:hover" ],
                                    style: {
                                        color: "#fff",
                                        borderColor: "#08c",
                                        backgroundColor: "#08c"
                                    }
                                }, {
                                    selector: [ "a > .sf-feed-dl-btn", "a .sf-feed-dl-btn.sf-type3-btn", "a > .sf-feed-dl-btn.sf-type4-btn" ],
                                    style: {
                                        display: "none",
                                        border: "1px solid #F8F8F8",
                                        width: "20px",
                                        height: "20px",
                                        padding: 0,
                                        position: "absolute",
                                        background: "url(" + n.svg.getSrc("download", "#777777") + ") center no-repeat #F8F8F8",
                                        backgroundSize: "12px",
                                        top: "auto",
                                        left: "auto",
                                        lineHeight: 0
                                    }
                                }, {
                                    selector: [ "a > .sf-feed-dl-btn.sf-type4-btn" ],
                                    style: {
                                        top: 0,
                                        left: 0
                                    }
                                }, {
                                    selector: [ "a > .sf-feed-dl-btn.sf-type1-btn", "a > div > .sf-feed-dl-btn.sf-type3-btn" ],
                                    style: {
                                        top: 0
                                    }
                                }, {
                                    selector: [ "a > .sf-feed-dl-btn.sf-type2-btn" ],
                                    style: {
                                        opacity: .5
                                    }
                                }, {
                                    selector: [ "a > div > .sf-feed-dl-btn.sf-type3-btn" ],
                                    style: {
                                        zIndex: 10
                                    }
                                }, {
                                    selector: [ "a > .sf-feed-dl-btn:hover", "a > div > .sf-feed-dl-btn.sf-type3-btn:hover" ],
                                    style: {
                                        background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #F8F8F8",
                                        backgroundSize: "12px"
                                    }
                                }, {
                                    selector: [ "a > .sf-feed-dl-btn.sf-type2-btn:hover" ],
                                    style: {
                                        opacity: .8
                                    }
                                }, {
                                    selector: [ "a > .sf-feed-dl-btn:active", "a > div > .sf-feed-dl-btn.sf-type3-btn:active" ],
                                    style: {
                                        outline: 0,
                                        boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                                    }
                                }, {
                                    selector: [ "a:hover > .sf-feed-dl-btn", "a:hover > div > .sf-feed-dl-btn.sf-type3-btn" ],
                                    style: {
                                        display: "block"
                                    }
                                } ])
                            }), document.head.appendChild(this.style));
                        },
                        disable: function() {
                            this.style && this.style.parentNode && this.style.parentNode.removeChild(this.style);
                        },
                        rmBtn: function() {
                            for (var e, t = document.querySelectorAll(".sf-feed-dl-btn"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                            var a = (0, p.A)("sfBtn"), i = document.querySelectorAll("[" + a + "]");
                            for (n = 0; e = i[n]; n++) e.removeAttribute(a);
                        }
                    },
                    mutationMode: {
                        observer: null,
                        stop: function() {
                            this.observer && this.observer.stop();
                        },
                        wrapOnImgOver: function() {
                            l && M.videoFeed.onImgOver.apply(this, arguments);
                        },
                        wrapOnImgOver2: function() {
                            l && M.videoFeed.onImgOver2.apply(this, arguments);
                        },
                        enable: function() {
                            if (this.observer) return this.observer.start();
                            this.observer = new g.A({
                                queries: [ {
                                    css: y.vimeo.clipToolsAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) M.hideMenu(), t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        M.appendBtn({
                                            id: "",
                                            parent: t,
                                            style: 2,
                                            playerContainer: "#clip"
                                        }));
                                    }
                                }, {
                                    css: y.vimeo.infoMetaAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) if (M.hideMenu(), !(t.dataset.sfSkip > 0)) {
                                            t.dataset.sfSkip = "1";
                                            var a = t.querySelector(".stats") || t.querySelector(".time");
                                            a && M.appendBtn({
                                                id: "",
                                                parent: a,
                                                style: 1,
                                                playerContainer: "#channel_clip_container"
                                            });
                                        }
                                    }
                                }, {
                                    css: y.vimeo.browseLiAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) if (!(t.dataset.sfSkip > 0) && (t.dataset.sfSkip = "1", 
                                        "clip_" === t.id.substr(0, 5))) {
                                            var a = M.getBrowserVideoData(t, t.id);
                                            a && M.appendBtn(a);
                                        }
                                    }
                                }, {
                                    css: y.vimeo.thumbnailAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        b.A.one(t, "mouseenter", M.mutationMode.wrapOnImgOver));
                                    }
                                }, {
                                    css: y.vimeo.clipThumbnailAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) if (!(t.dataset.sfSkip > 0)) {
                                            t.dataset.sfSkip = "1";
                                            var a = (0, c.A)(t, "clip_thumbnail");
                                            b.A.one(a, "mouseenter", M.mutationMode.wrapOnImgOver);
                                        }
                                    }
                                }, {
                                    css: y.vimeo.vitalThumbnailAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) if (!(t.dataset.sfSkip > 0)) {
                                            t.dataset.sfSkip = "1";
                                            var a = (0, c.A)(t, "iris_video-vital");
                                            b.A.one(a, "mouseenter", M.mutationMode.wrapOnImgOver);
                                        }
                                    }
                                }, {
                                    css: y.vimeo.contextClipThumbnailAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) if (!(t.dataset.sfSkip > 0)) {
                                            t.dataset.sfSkip = "1";
                                            var a = (0, c.A)(t, "contextclip-img-thumb");
                                            b.A.one(a, "mouseenter", M.mutationMode.wrapOnImgOver);
                                        }
                                    }
                                }, {
                                    css: y.vimeo.clipLinkAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) if (!(t.dataset.sfSkip > 0)) {
                                            t.dataset.sfSkip = "1", M.hideMenu();
                                            var a = (0, v.A)(t, ".clip_info-wrapper");
                                            if (a) {
                                                var i = a.querySelector(".clip_info-actions");
                                                i && M.appendBtn({
                                                    id: "",
                                                    parent: i,
                                                    style: 3,
                                                    playerContainer: ".clip_main"
                                                });
                                            }
                                        }
                                    }
                                }, {
                                    css: y.vimeo.clipSublineAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) {
                                            if (!(t.dataset.sfSkip > 0)) t.dataset.sfSkip = "1", M.hideMenu(), (0, v.A)(t, ".clip_main-content") && M.appendBtn({
                                                id: "",
                                                parent: t,
                                                style: 5,
                                                playerContainer: ".clip_main"
                                            });
                                        }
                                    }
                                }, {
                                    css: y.vimeo.clipImageAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        b.A.one(t, "mouseenter", M.mutationMode.wrapOnImgOver2));
                                    }
                                }, {
                                    css: y.vimeo.clipTitleAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        M.appendBtn({
                                            id: "",
                                            parent: t,
                                            style: 4,
                                            playerContainer: ".clip"
                                        }));
                                    }
                                }, {
                                    css: y.vimeo.clipSubinfoAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) M.appendBtn({
                                            id: "",
                                            parent: t,
                                            style: 6,
                                            playerContainer: ".clip_wrapper"
                                        });
                                    }
                                }, {
                                    css: y.vimeo.mailClipSublineAdd,
                                    is: "added",
                                    callback: e => {
                                        var t = M.getVimeoIdFromUrl(window.location.href);
                                        if (t) for (var n, a = 0; n = e.added[a]; a++) M.appendBtn({
                                            id: t,
                                            parent: n,
                                            style: 7,
                                            playerContainer: "#main"
                                        });
                                    }
                                } ]
                            });
                        }
                    }
                };
            }));
        }
    }, n = {};
    function a(e) {
        var i = n[e];
        if (void 0 !== i) return i.exports;
        var r = n[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(r.exports, r, r.exports, a), r.exports;
    }
    a.m = t, e = [], a.O = (t, n, i, r) => {
        if (!n) {
            var s = 1 / 0;
            for (c = 0; c < e.length; c++) {
                for (var [n, i, r] = e[c], o = !0, l = 0; l < n.length; l++) (!1 & r || s >= r) && Object.keys(a.O).every((e => a.O[e](n[l]))) ? n.splice(l--, 1) : (o = !1, 
                r < s && (s = r));
                if (o) {
                    e.splice(c--, 1);
                    var d = i();
                    void 0 !== d && (t = d);
                }
            }
            return t;
        }
        r = r || 0;
        for (var c = e.length; c > 0 && e[c - 1][2] > r; c--) e[c] = e[c - 1];
        e[c] = [ n, i, r ];
    }, a.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return a.d(t, {
            a: t
        }), t;
    }, a.d = (e, t) => {
        for (var n in t) a.o(t, n) && !a.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        });
    }, a.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), a.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, a.j = 971, (() => {
        a.b = document.baseURI || self.location.href;
        var e = {
            971: 0
        };
        a.O.j = t => 0 === e[t];
        var t = (t, n) => {
            var i, r, [s, o, l] = n, d = 0;
            if (s.some((t => 0 !== e[t]))) {
                for (i in o) a.o(o, i) && (a.m[i] = o[i]);
                if (l) var c = l(a);
            }
            for (t && t(n); d < s.length; d++) r = s[d], a.o(e, r) && e[r] && e[r][0](), e[r] = 0;
            return a.O(c);
        }, n = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n));
    })(), a.nc = void 0;
    var i = a.O(void 0, [ 223 ], (() => a(4425)));
    i = a.O(i);
})();