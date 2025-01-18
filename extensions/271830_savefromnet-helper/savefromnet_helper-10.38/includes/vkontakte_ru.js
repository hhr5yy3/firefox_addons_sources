(() => {
    "use strict";
    var e, t = {
        5914: (e, t, n) => {
            var r = n(4467), o = n(3453), a = n(467), i = n(4756), s = n.n(i), l = n(9242), d = n(9620), u = n(9589), c = n(7736), p = n(8278), f = n(717), h = n(8139), m = n(9580), v = n(5563), g = n(3372), b = n(2525), k = n(6480), y = n(9437), A = n(5751), w = n(8244), x = n(4733), _ = n(372), S = n(6810), L = n(4895), M = n(8233), P = n(9022), C = n(1460), N = n(2128), O = n(7661), I = n(8110), q = n(3410), B = n(188), D = n(9008), F = n(5299), R = n(6769), E = n.n(R), T = n(6942), H = n.n(T), V = n(4627), U = "matchtv", j = "twitch", z = "vk", W = F.Ay.memo((e => {
                var t = e.items, n = void 0 === t ? [] : t, r = e.theme, a = e.children, i = (0, 
                V.A)(E()), s = F.Ay.useState(!1), d = (0, o.A)(s, 2), u = d[0], c = d[1], p = F.Ay.useRef(), f = F.Ay.useRef(), h = F.Ay.useRef(), m = F.Ay.useMemo((() => ({
                    [j]: i.themeTwitch,
                    [z]: i.themeVk,
                    [U]: i.themeMatchtv
                }[r])), [ r ]), v = F.Ay.useCallback((() => {
                    c((e => !e));
                }), []);
                return F.Ay.useEffect((() => {
                    var e = e => {
                        var t = e.target === p.current || p.current.contains(e.target), n = e.target === f.current;
                        t || n || !h.current.classList.contains(i.show) || v();
                    };
                    return document.addEventListener("click", e), () => {
                        document.removeEventListener("click", e);
                    };
                }), []), F.Ay.createElement("div", {
                    ref: p,
                    className: m
                }, F.Ay.createElement("div", {
                    ref: f,
                    onClick: v
                }, a), F.Ay.createElement("div", {
                    ref: h,
                    className: H()(i.itemContainer, u ? i.show : i.hide)
                }, !n.length && F.Ay.createElement("div", {
                    className: i.message
                }, l.A.i18n.getMessage("noLinksFound")), n.map((e => F.Ay.createElement("div", {
                    onClick: e.onClick,
                    className: i.item
                }, F.Ay.createElement("div", null, e.title))))));
            })), $ = e => F.Ay.createElement("div", null, e.children), J = n(1853), X = n(172), K = n(3434);
            function G(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    }))), n.push.apply(n, r);
                }
                return n;
            }
            function Y(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? G(Object(n), !0).forEach((function(t) {
                        (0, r.A)(e, t, n[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : G(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    }));
                }
                return e;
            }
            var Q = (0, d.A)({}).svg.getSrc("download", "#4986cc", "20px");
            const Z = F.Ay.memo((e => {
                var t = e.iframeSrc, n = F.Ay.useState([]), r = (0, o.A)(n, 2), a = r[0], i = r[1];
                return F.Ay.useEffect((() => {
                    (0, L.A)({
                        action: "showjetFetchMovie",
                        iframeVideoURL: t
                    }).then((e => {
                        e = e.map((e => Y(Y({}, e), {}, {
                            onClick() {
                                (0, J.A)((0, X.n)(K.Ay, {
                                    filename: S.A.modify(e.filename) + ".mp4",
                                    format: "mp4",
                                    sources: [ {
                                        url: e.endpoint,
                                        format: "mp4"
                                    } ],
                                    convertType: "hls"
                                }), "sf-muxer-parent");
                            }
                        }))), i(e);
                    }));
                }), []), F.Ay.createElement(W, {
                    items: a,
                    theme: "vk"
                }, F.Ay.createElement($, null, F.Ay.createElement("div", {
                    className: "like_btn",
                    style: {
                        marginLeft: "14px"
                    }
                }, F.Ay.createElement("img", {
                    src: Q,
                    style: {
                        opacity: .5
                    },
                    alt: ""
                }), F.Ay.createElement("div", {
                    className: "like_button_label"
                }, l.A.i18n.getMessage("download")))));
            }));
            var ee = n(7725), te = n(4689), ne = n(453), re = n(6714);
            function oe(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    }))), n.push.apply(n, r);
                }
                return n;
            }
            function ae(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? oe(Object(n), !0).forEach((function(t) {
                        (0, r.A)(e, t, n[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : oe(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    }));
                }
                return e;
            }
            var ie = n(2894), se = (0, M.A)("vkontakte_ru"), le = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
            P.A.isSingle() && (0, u.Ys)("vk", (function(e, t) {
                var n = (0, d.A)(t), r = t.preferences, i = r.moduleVkontakte ? 1 : 0, u = l.A.isChrome || l.A.isFirefox || l.A.isGM && l.A.isTM, M = t.preferences.selectorsConfig, P = (0, 
                c.A)(), F = !1;
                if (P) if (/\/video_ext\.php\?.+/.test(location.href)) F = !0; else {
                    if (!/\/widget_comments\.php\?.+/.test(location.href)) return;
                    P = !1;
                }
                l.A.onMessage.addListener((function(t, n, o) {
                    if ("getModuleInfo" === t.action) {
                        if (t.url !== location.href) return;
                        return o({
                            state: i,
                            moduleName: e
                        });
                    }
                    if ("changeState" === t.action) {
                        if (e !== t.moduleName) return;
                        return $.changeState(t.state);
                    }
                    "updatePreferences" !== t.action ? i && ("updateLinks" === t.action && Q(), "downloadMP3Files" === t.action && (u ? pe.downloadMP3Files() : pe.showListOfAudioFiles(!1)), 
                    "downloadPlaylist" === t.action && pe.showListOfAudioFiles(!0), "downloadPhotos" === t.action && me.downloadPhoto()) : Object.assign(r, t.preferences);
                })), i && setTimeout((function() {
                    $.run();
                }));
                var R, E, T, H, V, U, j, z = [], W = {}, $ = {
                    contextMenu: null,
                    isMutation: !1,
                    run: function() {
                        if (i = 1, /m\.vk\.com/.test(location.hostname)) return ve.run();
                        F ? fe.addFrameBtn() : (me.injectStyle(), C.A.isAvailable() && ($.isMutation = !0, 
                        pe.addCustomStyle(), $.mutationMode.enable()));
                    },
                    changeState: function(e) {
                        P || (i = e, oe(), pe.hideLinks(), he.off(), $.hideMenu(), me.rmCurrentPhotoBtn(), 
                        pe.rmBitrate(), me.rmPhotoAlbumDlBtn(), $.mutationMode.stop(), e && $.run());
                    },
                    hideMenu: function() {
                        $.contextMenu && ($.contextMenu.hide(), $.contextMenu = null);
                    },
                    mutationMode: {
                        observer: null,
                        stop: function() {
                            this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                                for (var t, n = (0, h.A)(e), r = document.querySelectorAll("[" + n + "]"), o = 0; t = r[o]; o++) t.removeAttribute(n);
                            }));
                        },
                        wrapNewAudioOnMouseOver: function() {
                            i && pe.onNewMouseOver.apply(this, arguments);
                        },
                        wrapNewVoiceOnMouseOver: function() {
                            var e = (0, b.A)(this, ".im-mess");
                            if (!(e && e.querySelector(".sf-voice-btn") || !i)) {
                                var t = x.A.create("a", {
                                    href: this.getAttribute("data-mp3") || "#sf-preload",
                                    class: [ pe.className, "sf-audio-btn", "sf-voice-btn" ],
                                    download: S.A.modify(this.getAttribute("data-mp3")) || "",
                                    style: {
                                        width: "3px",
                                        height: "3px",
                                        padding: "0px 9px 9px"
                                    },
                                    on: [ [ "click", e => {
                                        e.stopPropagation(), n.downloadOnClick(e);
                                    } ] ]
                                }), r = e.querySelector(".im-mess--actions, .audio-msg-track--duration");
                                (0, te.A)({
                                    category: "append",
                                    subcategory: "vk",
                                    event: "b"
                                }), r && (r.classList.contains("audio-msg-track--duration") && t.classList.add("sf-voice-btn-in-dur"), 
                                r.appendChild(t), e.addEventListener("mouseleave", (() => t.style.display = "none")), 
                                e.addEventListener("mouseenter", (() => t.style.display = "inline"))), n.addStyleRules(`.${pe.className}.sf-voice-btn`, {
                                    "background-size": "12px !important"
                                }), n.addStyleRules(`.${pe.className}.sf-voice-btn-in-dur`, {
                                    position: "absolute",
                                    top: "23px",
                                    right: "-13px"
                                });
                            }
                        },
                        wrapVideoFeedOnMouseOver: function() {
                            i && ((0, te.A)({
                                category: "append",
                                subcategory: "vk",
                                event: "b"
                            }), he.onLinkHover.apply(this, arguments));
                        },
                        onVideoInsert: function(e) {
                            (0, B.A)("function(){return window.mvcur&&window.mvcur.mvData&&window.mvcur.mvData.is_active_live}").then((t => {
                                var r = n.getParentById(e, "mv_box");
                                r || (r = e);
                                var o = fe.getPlayerNode(r), a = r.querySelector(M.vk.videoPostPanelBtnsList);
                                a && (a.style.position = "relative", r = a, fe.newAppendButton(o, r)), o && !t ? e.closest(".ShortVideoPost") || window.location.href.includes("clip") ? fe.newClipButton(o, r) : fe.newAppendButton(o, r) : e.dataset.sfSkip = 0;
                            }));
                        },
                        onVideoChange: (E = (0, a.A)(s().mark((function e(t) {
                            var n, r, o, a, i, l;
                            return s().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    return e.next = 2, (0, B.A)("function(){return window.mvcur&&window.mvcur.mvData&&window.mvcur.mvData.is_active_live}");

                                  case 2:
                                    if (!e.sent) {
                                        e.next = 5;
                                        break;
                                    }
                                    return e.abrupt("return");

                                  case 5:
                                    n = this, r = t, ".like_cont" === t.className && (r = t.closest('div[id=*="/video_box_wrap/"]')), 
                                    /video_box_wrap-?\d+_-?\d+/.test(r.id) && window.location.href.includes("clip") || /post-?\d+_?\d+/.test(r.id) ? n.onVideoInsert(r) : /video_box_wrap-?\d+_-?\d+/.test(r.id) || n.onVideoInsert(r), 
                                    r.sfWatch ? n.onVideoInsert(r) : (r.sfWatch = !0, (o = new O.A({
                                        attrs: [ {
                                            name: "id",
                                            callback() {
                                                n.onVideoInsert(r);
                                            }
                                        } ],
                                        target: r
                                    })).trigger(), w.A.onRemoveEvent(r, (function() {
                                        o.stop(), r.sfWatch = !1, r.dataset.sfSkip = 0;
                                    }))), document.querySelector('iframe[src*="showjet"]') && (a = document.querySelector('iframe[src*="showjet"]'), 
                                    i = document.createElement("div"), (l = document.querySelector(".like_btns")) && (l.insertBefore(i, l.querySelector(".ui_actions_menu_wrap._ui_menu_wrap")), 
                                    (0, J.A)((0, X.n)(Z, {
                                        iframeSrc: a.src
                                    }), i)));

                                  case 11:
                                  case "end":
                                    return e.stop();
                                }
                            }), e, this);
                        }))), function(e) {
                            return E.apply(this, arguments);
                        }),
                        addClipsButton: (R = (0, a.A)(s().mark((function e(r) {
                            var o, i;
                            return s().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    if (!(o = r.parentNode.parentNode).querySelector(".savefrom__yt_btn")) {
                                        e.next = 3;
                                        break;
                                    }
                                    return e.abrupt("return");

                                  case 3:
                                    i = x.A.create("div", {
                                        id: "savefrom__yt_btn",
                                        style: {
                                            display: "flex",
                                            marginLeft: "10px",
                                            verticalAlign: "middle",
                                            position: "absolute",
                                            top: "10px",
                                            left: "10px"
                                        },
                                        append: [ x.A.create("a", {
                                            class: "sf-quick-dl-btn",
                                            href: "javascript:void(0)",
                                            style: {
                                                display: "inline-block",
                                                fontSize: "inherit",
                                                height: "22px",
                                                border: "1px solid #00B75A",
                                                borderRadius: "3px",
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: 0,
                                                paddingLeft: "28px",
                                                cursor: "pointer",
                                                verticalAlign: "middle",
                                                position: "relative",
                                                lineHeight: "22px",
                                                textDecoration: "none",
                                                zIndex: 1,
                                                color: "#fff",
                                                marginRight: "8px"
                                            },
                                            append: [ x.A.create("i", {
                                                style: {
                                                    position: "absolute",
                                                    display: "inline-block",
                                                    left: "6px",
                                                    top: "3px",
                                                    backgroundImage: "url(" + n.svg.getSrc("download", "#ffffff") + ")",
                                                    backgroundSize: "12px",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center",
                                                    width: "16px",
                                                    height: "16px"
                                                }
                                            }) ],
                                            on: [ [ "click", function() {
                                                var e = (0, a.A)(s().mark((function e(a) {
                                                    var i, l, d;
                                                    return s().wrap((function(e) {
                                                        for (;;) switch (e.prev = e.next) {
                                                          case 0:
                                                            if (l = function(e) {
                                                                return e.map((e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                                                e)));
                                                            }, a.stopPropagation(), w.A.onRemoveEvent(this, $.hideMenu), !$.contextMenu || !$.contextMenu.isShow) {
                                                                e.next = 6;
                                                                break;
                                                            }
                                                            return $.hideMenu(), e.abrupt("return");

                                                          case 6:
                                                            return $.contextMenu = n.popupMenu.quickInsert(this, "Скачивается...", "sf-single-video-menu", {
                                                                parent: o
                                                            }, "clips"), e.next = 9, re.P.createLinkExtractor("vk-clips").extractLinks({
                                                                element: o,
                                                                initData: t
                                                            });

                                                          case 9:
                                                            if (i = e.sent, 0 === (d = l(i)).length) {
                                                                e.next = 15;
                                                                break;
                                                            }
                                                            this.href = Y(d), e.next = 17;
                                                            break;

                                                          case 15:
                                                            return this.href = r.querySelector("video").src, e.abrupt("return", (0, L.A)({
                                                                action: "downloadVkStory",
                                                                downloadFileUrl: this.href,
                                                                fileName: `${Date.now()}.mp4`
                                                            }));

                                                          case 17:
                                                            this.click(), this.href = "javascript:void(0)", a.preventDefault();

                                                          case 20:
                                                          case "end":
                                                            return e.stop();
                                                        }
                                                    }), e, this);
                                                })));
                                                return function(t) {
                                                    return e.apply(this, arguments);
                                                };
                                            }() ] ]
                                        }), x.A.create("style", {
                                            text: (0, v.A)({
                                                selector: "#savefrom__yt_btn",
                                                append: [ {
                                                    "button::-moz-focus-inner": {
                                                        padding: 0,
                                                        margin: 0
                                                    },
                                                    ".sf-quick-dl-btn": {
                                                        backgroundColor: "#00B75A"
                                                    },
                                                    ".sf-quick-dl-btn:hover": {
                                                        backgroundColor: "rgb(0, 163, 80)"
                                                    },
                                                    ".sf-quick-dl-btn:active": {
                                                        backgroundColor: "rgb(0, 151, 74)"
                                                    }
                                                }, {
                                                    media: "@media screen and (max-width: 1293px)",
                                                    append: {
                                                        ".sf-quick-dl-btn .sf-btn-name": {
                                                            display: "none"
                                                        }
                                                    }
                                                } ]
                                            })
                                        }), x.A.create("button", {
                                            style: {
                                                position: "relative",
                                                display: "inline-block",
                                                marginLeft: "-2px",
                                                fontSize: "inherit",
                                                height: "24px",
                                                paddingRight: "21px",
                                                backgroundColor: "#F8F8F8",
                                                border: "1px solid #CCCCCC",
                                                borderRadius: "3px",
                                                borderTopLeftRadius: "0",
                                                borderBottomLeftRadius: "0",
                                                cursor: "pointer",
                                                color: "#9B9B9B",
                                                zIndex: 1,
                                                verticalAlign: "middle",
                                                boxSizing: "border-box",
                                                lineHeight: "22px"
                                            },
                                            on: [ [ "click", function() {
                                                var e = (0, a.A)(s().mark((function e(r) {
                                                    var a, i, d, u;
                                                    return s().wrap((function(e) {
                                                        for (;;) switch (e.prev = e.next) {
                                                          case 0:
                                                            if (d = function(e) {
                                                                return e.map((e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                                                e)));
                                                            }, r.stopPropagation(), w.A.onRemoveEvent(this, $.hideMenu), !$.contextMenu || !$.contextMenu.isShow) {
                                                                e.next = 6;
                                                                break;
                                                            }
                                                            return $.hideMenu(), e.abrupt("return");

                                                          case 6:
                                                            return a = $.contextMenu = n.popupMenu.quickInsert(this, l.A.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                                                parent: o
                                                            }, "clips"), e.next = 9, re.P.createLinkExtractor("vk-clips").extractLinks({
                                                                element: o,
                                                                initData: t
                                                            });

                                                          case 9:
                                                            return i = e.sent, u = d(i), e.abrupt("return", a.update(u));

                                                          case 12:
                                                          case "end":
                                                            return e.stop();
                                                        }
                                                    }), e, this);
                                                })));
                                                return function(t) {
                                                    return e.apply(this, arguments);
                                                };
                                            }() ], [ "mousedown", function(e) {
                                                e.stopPropagation();
                                            } ], [ "keydown", function(e) {
                                                e.stopPropagation();
                                            } ] ],
                                            append: [ x.A.create("i", {
                                                style: {
                                                    position: "absolute",
                                                    display: "inline-block",
                                                    top: "9px",
                                                    right: "6px",
                                                    border: "5px solid #868282",
                                                    borderBottomColor: "transparent",
                                                    borderLeftColor: "transparent",
                                                    borderRightColor: "transparent"
                                                }
                                            }), x.A.create("span", {
                                                text: "HD"
                                            }) ]
                                        }) ]
                                    }), o.append(i);

                                  case 5:
                                  case "end":
                                    return e.stop();
                                }
                            }), e);
                        }))), function(e) {
                            return R.apply(this, arguments);
                        }),
                        newStoryButton: function(e) {
                            setTimeout((() => {
                                var t = e.querySelector(".stories_item_cont_wrap"), r = t.querySelector(".stories_header_content"), i = x.A.create("div", {
                                    id: "savefrom__yt_btn",
                                    style: {
                                        display: "flex",
                                        position: "absolute",
                                        right: "0px",
                                        top: "60px",
                                        zIndex: 1e3,
                                        pointerEvents: "auto",
                                        marginLeft: "10px",
                                        verticalAlign: "middle"
                                    },
                                    append: [ x.A.create("a", {
                                        class: "sf-quick-dl-btn",
                                        style: {
                                            display: "inline-block",
                                            fontSize: "inherit",
                                            height: "22px",
                                            border: "1px solid #00B75A",
                                            borderRadius: "3px",
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                            paddingLeft: "28px",
                                            cursor: "pointer",
                                            verticalAlign: "middle",
                                            position: "relative",
                                            lineHeight: "22px",
                                            textDecoration: "none",
                                            zIndex: 1,
                                            color: "#fff",
                                            marginRight: "8px"
                                        },
                                        append: [ x.A.create("i", {
                                            style: {
                                                position: "absolute",
                                                display: "inline-block",
                                                left: "6px",
                                                top: "3px",
                                                backgroundImage: "url(" + n.svg.getSrc("download", "#ffffff") + ")",
                                                backgroundSize: "12px",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                                width: "16px",
                                                height: "16px"
                                            }
                                        }) ],
                                        on: [ [ "click", function() {
                                            var e = (0, a.A)(s().mark((function e(n) {
                                                var r, a, i;
                                                return s().wrap((function(e) {
                                                    for (;;) switch (e.prev = e.next) {
                                                      case 0:
                                                        return n.preventDefault(), e.next = 3, re.P.createLinkExtractor("vk-story").extractLinks({
                                                            element: t
                                                        });

                                                      case 3:
                                                        return r = e.sent, a = (0, o.A)(r, 1), i = a[0], l.A.sendMessage({
                                                            action: "checkAndOpenProLanding",
                                                            id: "vk-1"
                                                        }), e.abrupt("return", (0, L.A)({
                                                            action: "downloadVkStory",
                                                            downloadFileUrl: i.url,
                                                            filename: i.filename
                                                        }));

                                                      case 8:
                                                      case "end":
                                                        return e.stop();
                                                    }
                                                }), e);
                                            })));
                                            return function(t) {
                                                return e.apply(this, arguments);
                                            };
                                        }() ] ]
                                    }), x.A.create("style", {
                                        text: (0, v.A)({
                                            selector: "#savefrom__yt_btn",
                                            append: [ {
                                                "button::-moz-focus-inner": {
                                                    padding: 0,
                                                    margin: 0
                                                },
                                                ".sf-quick-dl-btn": {
                                                    backgroundColor: "#00B75A"
                                                },
                                                ".sf-quick-dl-btn:hover": {
                                                    backgroundColor: "rgb(0, 163, 80)"
                                                },
                                                ".sf-quick-dl-btn:active": {
                                                    backgroundColor: "rgb(0, 151, 74)"
                                                }
                                            }, {
                                                media: "@media screen and (max-width: 1293px)",
                                                append: {
                                                    ".sf-quick-dl-btn .sf-btn-name": {
                                                        display: "none"
                                                    }
                                                }
                                            } ]
                                        })
                                    }) ]
                                }), d = new URLSearchParams(window.location.search).get("w");
                                !r.querySelector("#savefrom__yt_btn") && d && r.append(i);
                            }), 500);
                        },
                        enable: function() {
                            var e = this;
                            if (this.observer) return this.observer.start();
                            var t = t => {
                                for (var n, r = 0; n = t.added[r]; r++) if (!(n.dataset.sfSkip > 0)) {
                                    if ("like_cont" === n.className && !window.location.href.includes("clips")) return;
                                    n.dataset.sfSkip = "1", e.onVideoChange(n);
                                }
                            }, n = t => {
                                var n = document.querySelector(M.vk.videoPostPanel);
                                n && e.onVideoChange(n);
                                for (var r, o = 0; r = t.added[o]; o++) (r = r.parentNode).dataset.sfSkip > 0 || (r.dataset.sfSkip = "1", 
                                e.onVideoChange(r));
                            }, r = e => {
                                for (var t, n = 0; t = e.added[n]; n++) (0, te.A)({
                                    category: "append",
                                    subcategory: "vk",
                                    event: "b"
                                }), t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", w.A.one(t, "mouseenter", $.mutationMode.wrapNewAudioOnMouseOver));
                            };
                            this.observer = new C.A({
                                queries: [ {
                                    css: M.vk.newContentButtonAdd,
                                    is: "added",
                                    callback: t
                                }, {
                                    css: M.vk.storyButtonAdd,
                                    is: "added",
                                    callback: t => {
                                        for (var n, r = 0; n = t.added[r]; r++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                        e.newStoryButton(n));
                                    }
                                }, {
                                    css: M.vk.videoLinkAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        w.A.one(t, "mouseenter", $.mutationMode.wrapVideoFeedOnMouseOver));
                                    }
                                }, {
                                    css: M.vk.videoBoxAdd,
                                    is: "added",
                                    callback: t => {
                                        for (var n, r = 0; n = t.added[r]; r++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                        e.onVideoChange(n));
                                    }
                                }, {
                                    css: M.vk.newContentButtonAdd2,
                                    is: "added",
                                    callback: t
                                }, {
                                    css: M.vk.videoPlayerAdd,
                                    is: "added",
                                    callback: n
                                }, {
                                    css: M.vk.videoPostPanel,
                                    is: "added",
                                    callback: n
                                }, {
                                    css: M.vk.photosAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        me.addNewPhotoAlbumDlBtn(t));
                                    }
                                }, {
                                    css: M.vk.photoAreaAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        me.addNewDlCurrentPhotoBtn(t));
                                    }
                                }, {
                                    css: M.vk.audioAdd,
                                    is: "added",
                                    callback: r
                                }, {
                                    css: M.vk.audioAdd2,
                                    is: "added",
                                    callback: r
                                }, {
                                    css: M.vk.audioAdd3,
                                    is: "added",
                                    callback: r
                                }, {
                                    css: M.vk.audioAdd4,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        w.A.one(t, "mouseenter", $.mutationMode.wrapNewVoiceOnMouseOver));
                                    }
                                }, {
                                    css: '[class*="ClipsCarousel-module__verticalItemWrapper"] video',
                                    is: "added",
                                    callback: t => {
                                        for (var n, r = 0; n = t.added[r]; r++) e.addClipsButton(n);
                                    }
                                }, {
                                    css: "." + w.A.onRemoveClassName,
                                    is: "removed",
                                    callback: e => {
                                        for (var t, n = 0; t = e.removed[n]; n++) w.A.onRemoveListener(t);
                                    }
                                } ]
                            });
                        }
                    }
                }, G = "savefrom_vk_download", Y = e => {
                    for (var t = e[0].quality, n = 0, r = 0; r < e.length; r++) t < Number(e[r].quality) && (t = e[r].quality, 
                    n = r);
                    return e[n].href;
                }, Q = function() {
                    $.changeState(0), $.changeState(1);
                }, oe = function() {
                    var e = "a." + G + ",div." + G + ",span." + G;
                    pe.lastRow = null;
                    for (var t = document.querySelectorAll(e), n = t.length - 1; n >= 0; n--) pe.elIsHidden(t[n]) && t[n].parentNode.removeChild(t[n]);
                }, de = function() {
                    if (null !== document.querySelector('.page_block_header_inner._header_inner a.ui_crumb[href="/audio"]')) {
                        var e = document.querySelector(".page_block_header_inner._header_inner div.ui_crumb");
                        if (e && e.textContent) return S.A.modify(e.textContent);
                    }
                    var t = document.title, n = t.indexOf("|");
                    return -1 !== n && (t = t.substr(0, n - 1)), S.A.modify(t);
                }, ue = function(e) {
                    try {
                        var t = JSON.parse(e).payload[1];
                        return [ null, null, null, null, null, t[0], t[1], null, t[3] ];
                    } catch (e) {}
                    for (var n = function(e) {
                        return !0 === e ? 1 : parseInt(e) || 0;
                    }, r = function(e) {
                        return !0 === e ? 1 : parseFloat(e) || 0;
                    }, o = e.split("<!>"), a = o.length - 1; a >= 0; --a) {
                        var i = o[a];
                        if ("<!" == i.substr(0, 2)) {
                            var s = i.indexOf(">"), l = i.substr(2, s - 2);
                            switch (i = i.substr(s + 1), l) {
                              case "json":
                                var d = null;
                                try {
                                    d = JSON.parse(i);
                                } catch (e) {}
                                o[a] = d;
                                break;

                              case "int":
                                o[a] = n(i);
                                break;

                              case "float":
                                o[a] = r(i);
                                break;

                              case "bool":
                                o[a] = !!n(i);
                                break;

                              case "null":
                                o[a] = null;
                                break;

                              case "pageview_candidate":
                              case "debug":
                                o.pop();
                            }
                        }
                    }
                    return o;
                }, ce = function(e) {
                    return /<em>.*<\/em>/.test(e) && (e = e.replace(/<\/?em>/g, "")), e;
                }, pe = {
                    audioElClassList: [ "audio", "audioRow", "audioRowWall" ],
                    lastRow: null,
                    className: G,
                    cache: {},
                    lastValidRequest: null,
                    waitUntilUnblock: function(e) {
                        var t = this, n = 10;
                        if (!t.lastValidRequest) return Promise.reject(new Error("Last valid request is empty!"));
                        return function r() {
                            return new Promise((function(e) {
                                setTimeout(e, 15e3);
                            })).then((function() {
                                if (e.abort) throw new Error("Abort");
                                return (0, A.A)(t.lastValidRequest).then((function(e) {
                                    if (n--, !ue(e.body)[5]) {
                                        if (n > 0) return r();
                                        throw new Error("Can't request data");
                                    }
                                }));
                            }));
                        }().then((function() {
                            return new Promise((function(e) {
                                setTimeout(e, 250);
                            }));
                        }));
                    },
                    needUnmask: function(e) {
                        var t = /audio_api_unavailable/;
                        return e.some((function(e) {
                            if (t.test(e[2])) return !0;
                        }));
                    },
                    unmaskUrlViaUtil: function(e) {
                        return pe.needUnmask(e) ? (0, B.A)([], "function(){return vk.id}").then((t => {
                            var n = e.map((e => {
                                try {
                                    return Array.isArray(e) && e[2] ? (e[2] = I.ys(t, e[2]), e) : null;
                                } catch (e) {
                                    return se.debug("track decode error: ", e), null;
                                }
                            }));
                            return Promise.all(n).then((e => e.filter((e => null !== e))));
                        })) : Promise.resolve(e);
                    },
                    unmaskUrl: function(e) {
                        return pe.needUnmask(e) ? (0, B.A)([ e ], 'function(idsArr){var aFail=false;var bFail=false;var cFail=false;var unmaskUrl=function unmaskUrl(url){var _url="";if(!aFail&&window.sfUnmaskUrl){try{_url=window.sfUnmaskUrl(url)}catch(err){aFail=true}}if(!cFail&&!_url&&window.AudioPlayerHTML5){try{var res=null;var r={_isHlsUrl:function _isHlsUrl(url){res=url;return true},_initHls:function _initHls(){}};window.AudioPlayerHTML5.prototype._setAudioNodeUrl.apply(r,[null,url]);_url=res}catch(err){cFail=true}}if(!bFail&&!_url&&window.AudioPlayerFlash){try{var r={};window.AudioPlayerFlash.prototype.setUrl.apply(r,[url]);_url=r._url}catch(err){bFail=true}}if(typeof _url!=="string"){_url=""}return _url};idsArr.forEach(function(item){var url=unmaskUrl(item[2]);if(url){item[2]=url}});return idsArr}').then((function(t) {
                            return t || e;
                        })) : Promise.resolve(e);
                    },
                    _getNewTrackListByIdsWithActionHash(e) {
                        for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = 0, r = {}, o = this.cache, a = e.filter((e => {
                            var t = e.fullId;
                            return !o[t] || (r[t] = o[t], n++, !1);
                        })), i = []; a.length; ) i.push(a.splice(0, 9));
                        var s = e.length, l = Promise.resolve();
                        i.forEach((e => {
                            l = l.then((() => {
                                var a = () => {
                                    if (t.abort) throw new Error("Abort");
                                    var a = e.filter((e => e.fullId && e.actionHash && e.urlHash)).map((e => e.fullId + "_" + e.actionHash + "_" + e.urlHash)), i = {
                                        type: "POST",
                                        headers: {
                                            "Content-Type": "application/x-www-form-urlencoded",
                                            "X-Requested-With": "XMLHttpRequest"
                                        },
                                        data: ie.stringify({
                                            act: "reload_audio",
                                            al: 1,
                                            ids: a.join(",")
                                        }),
                                        url: "/al_audio.php",
                                        localXHR: !0
                                    };
                                    return (0, A.A)(i).then((e => {
                                        var a = ue(e.body)[5];
                                        if (!a || !Array.isArray(a)) throw new Error("Track list is not found!");
                                        return this.lastValidRequest = i, a.forEach((e => {
                                            var t = e[1] + "_" + e[0];
                                            o[t] = e, r[t] = e, n++;
                                        })), t.onProgress && t.onProgress(n, s), new Promise((e => {
                                            setTimeout(e, 250);
                                        }));
                                    }));
                                }, i = 2, l = () => a().catch((e => {
                                    if ("Track list is not found!" === e.message && !t.withoutUnblock) {
                                        if (this.lastValidRequest) return this.waitUntilUnblock(t).then(a);
                                        if (i-- > 0) return new Promise((e => setTimeout(e, 15e3))).then((() => l()));
                                    }
                                    throw e;
                                }));
                                return l().catch((e => {
                                    "Abort" !== e.message && se.debug("requestIds error!", e);
                                }));
                            }));
                        })), l = l.then((function() {
                            Object.keys(o).slice(1e3).forEach((function(e) {
                                delete o[e];
                            }));
                            var t = [];
                            return e.forEach((e => {
                                var n = e.fullId, o = r[n];
                                o && t.push(o);
                            })), t;
                        }));
                        return l = l.then((e => pe.unmaskUrlViaUtil(e))).then((e => {
                            var t = (0, ee.A)(5), n = e.map((e => t((() => {
                                var t = e[2], n = (e => {
                                    if (pe.isHlsLink(e)) {
                                        var t = (e = e.replace("/index.m3u8", ".mp3")).split("/"), n = -1 !== e.indexOf("audios") ? 1 : 0;
                                        return t.splice(t.length - (2 + n), 1), t.join("/");
                                    }
                                    return e;
                                })(t);
                                return pe.isHlsLink(t) ? (0, A.A)({
                                    method: "HEAD",
                                    url: n
                                }).then((() => (e[2] = n, e)), (t => (se.warn("getNewTrackListByIdsWithActionHash: mp3 file not available. ", t), 
                                e))) : e;
                            }))));
                            return Promise.all(n);
                        }));
                    },
                    _getAlbumIdFromUrl: function(e) {
                        var t = this, n = [ e ], r = (0, f.A)(e);
                        r.z && n.unshift(r.z);
                        var o = null;
                        return n.some((function(e) {
                            if (o = t._getAlbumId(e)) return !0;
                        })), o;
                    },
                    _getAlbumId: function(e) {
                        if (/[?&]q=/.test(e)) return null;
                        var t = {
                            url: "/al_audio.php",
                            data: {}
                        }, n = /audio_playlist(-?\d+)_(-?\d+)(?:\/(\w+))?/.exec(e);
                        if (n && (t.data.access_hash = n[3] || "", t.data.act = "load_section", t.data.al = 1, 
                        t.data.claim = 0, t.data.owner_id = n[1], t.data.playlist_id = n[2], t.data.type = "playlist", 
                        t.data.offset = 0), !t.data.act) {
                            var r = /audios(-?\d+)/.exec(e);
                            if (r) {
                                var o = /[?&]section=(\w+)/.exec(e), a = o && o[1];
                                if (a && -1 === [ "playlists", "all" ].indexOf(a)) return null;
                                t.data.access_hash = "", t.data.act = "load_section", t.data.al = 1, t.data.claim = 0, 
                                t.data.owner_id = r[1], t.data.playlist_id = -1, t.data.type = "playlist", t.data.offset = 0;
                            }
                        }
                        return t.data.act ? t : null;
                    },
                    getNewNodeTrackInfo: (V = (0, a.A)(s().mark((function e(t) {
                        var n, r;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (n = this.readNewDataAudio(t.dataset.audio), (r = this.getNewTrackInfo(n)) && r.fullId) {
                                    e.next = 4;
                                    break;
                                }
                                throw new Error("Track info is not found");

                              case 4:
                                if (!r.url) {
                                    e.next = 6;
                                    break;
                                }
                                return e.abrupt("return", pe.unmaskUrlViaUtil([ [ null, null, r.url ] ]).then((e => (r.url = e[0][2], 
                                r))));

                              case 6:
                                return e.abrupt("return", r);

                              case 7:
                              case "end":
                                return e.stop();
                            }
                        }), e, this);
                    }))), function(e) {
                        return V.apply(this, arguments);
                    }),
                    _getAlbumTrackViaApi: function(e, t) {
                        if (!e.url) throw se.debug("Page is not exists!", e), new Error("Page is not exists!");
                        var n = JSON.parse(JSON.stringify(e.data)), r = function() {
                            return t.abort ? Promise.reject(new Error("Abort")) : (0, A.A)({
                                type: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "X-Requested-With": "XMLHttpRequest"
                                },
                                url: e.url,
                                data: n,
                                timeout: 6e4,
                                localXHR: !0
                            }).then((function(e) {
                                var t = ue(e.body)[5];
                                if (!t) throw new Error("Album data is empty!");
                                return new Promise((function(e) {
                                    setTimeout(e, 250);
                                })).then((function() {
                                    return t;
                                }));
                            }));
                        };
                        return r().then((function(e) {
                            var t = 20;
                            return e.hasMore ? function o(a) {
                                return !a || t < 0 ? e : (t--, n.offset = a, r().then((function(t) {
                                    return t.list.length ? (e.list.push.apply(e.list, t.list), t.hasMore ? o(t.nextOffset) : e) : e;
                                }), (function(t) {
                                    return "Abort" !== t.message && se.debug("getOffset error!", t), e;
                                })));
                            }(e.nextOffset) : e;
                        }));
                    },
                    _getAllTrackViaDom: function(e, t) {
                        var n = this;
                        t = t || {};
                        var r = [];
                        return [].slice.call(e.querySelectorAll(".audio_row")).forEach((function(e) {
                            if ((!t.fromPage || !n.elIsHidden(e)) && (t.grabReply || !me.isReply(e))) {
                                var o = null;
                                try {
                                    o = JSON.parse(e.dataset.audio);
                                } catch (e) {}
                                o && r.push(o);
                            }
                        })), {
                            list: r
                        };
                    },
                    _getNewAudioLinks: function(e, t) {
                        var n = this;
                        t = t || {};
                        var r = (e = e || document) === document, o = me.getPopup("", "audio", (function() {
                            t.abort = !0;
                        }));
                        o.onPrepare(l.A.i18n.getMessage("download") + " ...");
                        var a = function() {
                            return Promise.resolve().then((function() {
                                return n._getAllTrackViaDom(e, {
                                    fromPage: r,
                                    grabReply: !1
                                });
                            }));
                        };
                        t.onProgress = function(e, t) {
                            o.onProgress(e, t);
                        };
                        var i = Promise.resolve();
                        return i = (i = (i = (i = r ? i.then((function() {
                            return Promise.resolve().then((function() {
                                var e = n._getAlbumIdFromUrl(location.href);
                                if (!e) throw new Error("Album is not found");
                                return n._getAlbumTrackViaApi(e, t);
                            }));
                        })).catch((function(e) {
                            throw "Album is not found" !== e.message && se.debug("findAlbumLinks error!", e), 
                            e;
                        })).catch((function() {
                            return a();
                        })) : i.then(a)).then((function(e) {
                            var t = e.list;
                            if (!t.length) throw new Error("Audio is not found");
                            return o.onProgress(0, t.length), e;
                        }))).then((function(e) {
                            var r = [], o = "";
                            "string" == typeof e.title && (o = S.A.modify(e.title));
                            var a = [];
                            return e.list.forEach((function(e) {
                                var t = e[1] + "_" + e[0], n = pe.getTrackActionHash(e), o = pe.getTrackUrlHash(e);
                                -1 === a.indexOf(t) && (a.push(t), r.push({
                                    fullId: t,
                                    actionHash: n,
                                    urlHash: o
                                }));
                            })), n._getNewTrackListByIdsWithActionHash(r, t).then((function(e) {
                                var t = {}, r = [];
                                return e.forEach((function(e) {
                                    var o = n.getNewTrackInfo(e);
                                    if (o && o.url) {
                                        var a = n.getNewAudioFilename(o), i = n.getNewAudioFullTitle(o);
                                        t[o.fullId] = o.url, r.push({
                                            url: o.url,
                                            title: i,
                                            filename: a
                                        });
                                    }
                                })), {
                                    linkList: t,
                                    trackList: r,
                                    title: o
                                };
                            }));
                        }))).then((function(e) {
                            return o.onReady(), e;
                        }), (function(e) {
                            throw o.onReady(), e;
                        }));
                    },
                    tooltip: {
                        tooltip: void 0,
                        updatePos: function(e, t) {
                            var r = n.getPosition(e), o = n.getSize(this.tooltip);
                            this.tooltip.style.top = r.top + t.top - o.height + "px";
                            var a = r.left + parseInt(t.width / 2) - parseInt(o.width / 2), i = document.body.clientWidth + document.body.scrollLeft;
                            i < a + o.width && (a = i - o.width), this.tooltip.style.left = a + "px";
                        },
                        show: function(e, t) {
                            var n = this;
                            return void 0 !== this.tooltip ? this.hide() : (this.tooltip = x.A.create("div", {
                                class: "sf-tooltip",
                                style: Object.assign({
                                    position: "absolute",
                                    display: "none",
                                    zIndex: 9999,
                                    opacity: 0,
                                    transition: "opacity 0.2s",
                                    whiteSpace: "nowrap"
                                }, t.style),
                                on: [ "mouseenter", function(e) {
                                    n.hide();
                                } ]
                            }), document.body.appendChild(this.tooltip)), this.tooltip.style.display = "block", 
                            setTimeout((function() {
                                n.updatePos(e, t), n.tooltip.style.opacity = 1;
                            }), 0), this.tooltip;
                        },
                        hide: function() {
                            this.tooltip && (this.tooltip.style.opacity = 0, this.tooltip.style.display = "none");
                        }
                    },
                    rmBitrate: function() {
                        void 0 === pe.rmBitrate.style && document.body.appendChild(pe.rmBitrate.style = x.A.create("style", {
                            text: ".sf-bitrate-value {display: none;}"
                        }));
                        for (var e, t = document.querySelectorAll(".sf-bitrate-value"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    },
                    insertNewBitrate: function(e, t) {
                        if (e && t && t.classList.contains("audio_row__info")) {
                            var n = t.querySelector(".audio_row__duration");
                            if (n && (void 0 !== pe.rmBitrate.style && (pe.rmBitrate.style.parentNode.removeChild(pe.rmBitrate.style), 
                            pe.rmBitrate.style = void 0), !n.querySelector(".sf-bitrate-value"))) {
                                var r = x.A.create("span", {
                                    text: " " + e,
                                    class: "sf-bitrate-value",
                                    style: {
                                        position: "absolute",
                                        textAlign: "right",
                                        right: 0,
                                        opacity: "0.8",
                                        top: "14px",
                                        fontSize: "11px",
                                        whiteSpace: "nowrap"
                                    }
                                });
                                n.appendChild(r);
                            }
                        }
                    },
                    onDlBtnLeave: function() {
                        pe.tooltip.hide();
                    },
                    onDlBtnOver: function() {
                        var e = pe, t = e.tooltip, n = this, r = n.dataset.fullId, o = n.parentNode && n.parentNode.parentNode, a = -6;
                        n.dataset.bitrateOffsetTop && (a = parseInt(n.dataset.bitrateOffsetTop));
                        var i = {
                            top: a,
                            width: 24,
                            style: {
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                                color: "rgb(48, 48, 48)"
                            }
                        }, s = t.show(n, i);
                        s.dataset.fullId = r;
                        var d = function() {
                            var t = n.dataset.bitrate, r = n.dataset.size, a = "";
                            e.isHlsLink(n.href) ? a = l.A.i18n.getMessage("download") : r ? t ? (e.insertNewBitrate(t, o), 
                            a = r + " ~ " + t) : a = r : a = l.A.i18n.getMessage("getFileSizeFailTitle"), s.style.padding = "2px 5px 3px", 
                            s.textContent = a;
                        };
                        n.dataset.size || e.isHlsLink(n.href) ? d() : (s.style.padding = "2px 2px 0 2px", 
                        s.textContent = "", s.appendChild(x.A.create("img", {
                            src: "/images/upload.gif",
                            height: 8,
                            width: 32,
                            style: {
                                marginTop: "2px",
                                marginBottom: "1px"
                            }
                        })), n.dataset.preloadOver || (n.dataset.preloadOver = 1, e._preloadNewTrackUrl(n).then((function(a) {
                            if (n.dataset.preloadOver = 2, n.href = a, !e.isHlsLink(a)) return e._onOverInsertBitrate(n, o).then((function() {
                                s.dataset.fullId === r && (d(), t.updatePos(n, i));
                            }));
                            d(), t.updatePos(n, i);
                        })).catch((function(e) {
                            se.error("_preloadNewTrackUrl error", e), n.dataset.preloadOver = "", s.dataset.fullId === r && (d(), 
                            t.updatePos(n, i));
                        }))));
                    },
                    preloadIdPromiseMap: {},
                    _preloadNewTrackUrl: function(e) {
                        var t = this, n = t.preloadIdPromiseMap, r = e.dataset.fullId, o = e.dataset.actionHash, a = e.dataset.urlHash, i = n[r];
                        return i || (i = n[r] = t._getNewTrackListByIdsWithActionHash([ {
                            fullId: r,
                            actionHash: o,
                            urlHash: a
                        } ], {
                            withoutUnblock: !0
                        }).then((function(e) {
                            delete n[r];
                            var o = null;
                            e.some((function(e) {
                                if (e[1] + "_" + e[0] === r) return o = e, !0;
                            }));
                            var a = o && t.getNewTrackInfo(o);
                            if (!a || !a.url) throw new Error("Track is not found");
                            return a.url;
                        }), (function(e) {
                            throw delete n[r], e;
                        })).then((e => pe.unmaskUrl([ e ]))).then((e => e[0]))), i;
                    },
                    isHlsLink: function(e) {
                        return /\.m3u8(\?|$)/.test(e);
                    },
                    onNewDlBtnClick: function(e) {
                        pe.isHlsLink(this.href) ? (e.preventDefault(), l.A.sendMessage({
                            action: "checkAndOpenProLanding",
                            id: "vk-2"
                        }), (0, J.A)((0, X.n)(K.Ay, {
                            sources: [ {
                                url: this.href,
                                format: "hls"
                            } ],
                            filename: this.download,
                            format: "mp3",
                            convertType: "hlsToMp3"
                        }), "sf-muxer-parent")) : n.downloadOnClick(e);
                    },
                    _onNewDlBtnClickWrapper: function(e) {
                        var t = pe, n = this;
                        e.stopPropagation(), (n.dataset.preloadOver > 1 || n.dataset.preloadBitrate > 1) && (n.dataset.preloadDl = 2), 
                        n.dataset.preloadDl ? n.dataset.preloadDl > 1 ? pe.onNewDlBtnClick.call(n, e) : e.preventDefault() : (e.preventDefault(), 
                        n.dataset.preloadDl = 1, t._preloadNewTrackUrl(n).then((function(t) {
                            n.dataset.preloadDl = 2, n.href = t, pe.onNewDlBtnClick.call(n, e);
                        }), (function(e) {
                            se.error("_preloadNewTrackUrl error", e), n.dataset.preloadDl = "";
                        })));
                    },
                    getNewDlBtn: function(e) {
                        var t = {
                            href: e.url || "#sf-preload",
                            class: [ pe.className, "sf-audio-btn" ],
                            download: e.filename || "",
                            data: {
                                duration: e.duration || "",
                                fullId: e.fullId,
                                actionHash: e.actionHash,
                                urlHash: e.urlHash
                            },
                            style: {
                                width: "16px",
                                height: "16px"
                            },
                            on: [ [ "mouseenter", this.onDlBtnOver ], [ "mouseleave", this.onDlBtnLeave ], [ "click", this._onNewDlBtnClickWrapper ], [ "mousedown", function(e) {
                                e.stopPropagation();
                            } ] ]
                        };
                        return (l.A.isGM || l.A.isSafari) && (t.title = l.A.i18n.getMessage("downloadTitle")), 
                        x.A.create("a", t);
                    },
                    preloadSizePromiseMap: {},
                    _onOverInsertBitrate: function(e, t) {
                        var r = this, o = r.preloadSizePromiseMap, a = e.dataset.fullId, i = o[a];
                        return i || (i = o[a] = (e => {
                            var t = W[e];
                            if (t) {
                                var n = z.indexOf(e);
                                -1 !== n && (z.splice(n, 1), z.unshift(e));
                            } else if (t = W[e] = (0, L.A)({
                                action: "getFileSize",
                                url: e
                            }).then((t => (t && !t.error || delete W[e], t))).catch((t => {
                                throw delete W[e], t;
                            })), z.unshift(e), z.length > 100) {
                                var r = z.pop();
                                delete W[r];
                            }
                            return t;
                        })(e.href).then((function(i) {
                            if (delete o[a], !i) throw new Error("Response is empty");
                            if (!i.fileSize) throw delete r.cache[a], new Error("File size is empty");
                            var s = n.sizeHuman(i.fileSize, 2), d = "";
                            e.dataset.duration && (d = Math.floor(i.fileSize / e.dataset.duration / 125) + " " + l.A.i18n.getMessage("kbps")), 
                            e.dataset.bitrate = d, e.dataset.size = s, pe.insertNewBitrate(d, t);
                        }), (function(e) {
                            throw delete o[a], e;
                        }))), i;
                    },
                    getNewAudioFullTitle: function(e) {
                        var t = [];
                        return e.title && t.push(e.title), e.performer && (t.length && t.unshift(" - "), 
                        t.unshift(e.performer)), t.join("");
                    },
                    getNewAudioFilename: function(e) {
                        var t = this.getNewAudioFullTitle(e);
                        return t && (t += ".mp3"), t;
                    },
                    handleNewCurrentAudioRow: (H = (0, a.A)(s().mark((function e(t, r) {
                        var a, i, l, d, u, c, p;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (!t.querySelector("." + pe.className)) {
                                    e.next = 2;
                                    break;
                                }
                                return e.abrupt("return");

                              case 2:
                                return e.next = 4, re.P.createLinkExtractor("vk-audios").extractLinks({
                                    element: t
                                });

                              case 4:
                                a = e.sent, i = (0, o.A)(a, 1), l = i[0], d = this.getNewDlBtn(l), u = "#6C8CAC", 
                                1 === r && (u = "#C4D1DE"), d.classList.remove("sf-audio-btn"), x.A.create(d, {
                                    style: {
                                        background: "url(" + n.svg.getSrc("download", u) + ") center no-repeat",
                                        backgroundSize: "12px",
                                        width: "12px",
                                        height: "12px",
                                        padding: 0,
                                        margin: 0,
                                        cssFloat: "left",
                                        marginRight: "3px",
                                        marginTop: "6px",
                                        marginBottom: "-2px"
                                    }
                                }), c = null, w.A.onRemoveEvent(d, (function() {
                                    w.A.one(t, "mouseenter", $.mutationMode.wrapNewAudioOnMouseOver), c && c.stop();
                                })), 2 === r && (p = (0, b.A)(t, ".audio_page_player")) && (c = new O.A({
                                    target: p,
                                    attrs: [ {
                                        name: "data-full-id",
                                        callback() {
                                            d.parentNode && d.parentNode.removeChild(d), c && c.stop();
                                        }
                                    } ]
                                })).trigger(), 1 === r && (d.dataset.bitrateOffsetTop = 1), t.insertBefore(d, t.firstChild);

                              case 17:
                              case "end":
                                return e.stop();
                            }
                        }), e, this);
                    }))), function(e, t) {
                        return H.apply(this, arguments);
                    }),
                    handleNewAudioRow: (T = (0, a.A)(s().mark((function e(t) {
                        var n, a, i, l, d, u, c, p;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (!t.querySelector("." + pe.className)) {
                                    e.next = 2;
                                    break;
                                }
                                return e.abrupt("return");

                              case 2:
                                return n = t.querySelector(".audio_row__actions"), e.next = 5, re.P.createLinkExtractor("vk-audios").extractLinks({
                                    element: t
                                });

                              case 5:
                                a = e.sent, i = (0, o.A)(a, 1), l = i[0], d = this, u = this.getNewDlBtn(l), c = n.parentNode, 
                                x.A.create(u, {
                                    class: [ "audio_row__action" ],
                                    style: {
                                        width: "24px",
                                        height: "24px",
                                        cssFloat: "left"
                                    },
                                    on: [ [ "mouseover", e => {
                                        if (le) {
                                            if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, ne.D)(u, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            }, {});
                                            (0, ne.w)(u, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            });
                                        }
                                    } ] ]
                                }), (p = n.firstChild) ? n.insertBefore(u, p) : n.appendChild(u), 1 == +r.vkShowBitrate && (u.dataset.preloadBitrate || (u.dataset.preloadBitrate = 1, 
                                d._preloadNewTrackUrl(u).then((function(e) {
                                    return u.dataset.preloadBitrate = 2, u.href = e, d._onOverInsertBitrate(u, c);
                                })).catch((function(e) {
                                    se.error("_preloadNewTrackUrl error", e);
                                }))));

                              case 15:
                              case "end":
                                return e.stop();
                            }
                        }), e, this);
                    }))), function(e) {
                        return T.apply(this, arguments);
                    }),
                    addNewDlTrackBtn: function(e) {
                        var t = this, n = function() {
                            o.disconnect();
                        }, r = function() {
                            t.handleNewAudioRow(e).catch((() => n()));
                        }, o = new ((0, N.A)())((function(e) {
                            if (i) {
                                for (var t = null, o = null, a = 0; t = e.shift(); ) if ("childList" === t.type && t.addedNodes.length && t.target.classList.contains("audio_row__info")) for (a = 0, 
                                t.addedNodes; o = t.addedNodes[a]; a++) if (o.classList.contains("audio_row__actions")) return void r();
                            } else n();
                        }));
                        o.observe(e, {
                            childList: !0,
                            subtree: !0
                        });
                        var a = e.querySelector(".audio_row__actions");
                        a && (r(), a = null);
                    },
                    getNewTrackInfo: function(e) {
                        if (!e) return null;
                        var t = {};
                        return "string" == typeof e[2] && (t.url = e[2]), t.title = e[3], t.title && (t.title = S.A.decodeSpecialChars(ce(t.title))), 
                        t.performer = e[4], t.performer && (t.performer = S.A.decodeSpecialChars(ce(t.performer))), 
                        t.duration = parseInt(e[5]), t.actionHash = pe.getTrackActionHash(e), t.urlHash = pe.getTrackUrlHash(e), 
                        e[1] && e[0] && (t.fullId = e[1] + "_" + e[0]), t.id = e[0], t.ownerId = e[1], t;
                    },
                    getTrackActionHash: e => (e[13] || "").split("/")[2] || "",
                    getTrackUrlHash: e => (e[13] || "").split("/")[5] || "",
                    readNewDataAudio: function(e) {
                        try {
                            return JSON.parse(e);
                        } catch (e) {
                            return null;
                        }
                    },
                    addNewDlCurrentTrackBtn: function(e, t) {
                        this.handleNewCurrentAudioRow(e, t);
                    },
                    onNewMouseOver: function(e) {
                        var t = pe, n = this;
                        if (n && !n.querySelector("." + pe.className)) {
                            var r = null;
                            n.classList.contains("top_audio_player_title") && (r = 1), n.classList.contains("audio_page_player_title_performer") && (r = 2), 
                            r ? t.addNewDlCurrentTrackBtn(n, r) : t.addNewDlTrackBtn(n);
                        }
                    },
                    addCustomStyle: function() {
                        if (1 !== this.addCustomStyle.hasStyle) {
                            this.addCustomStyle.hasStyle = 1;
                            var e = document.querySelector("#savefrom-styles.sf-audio");
                            e && e.parentNode.removeChild(e), n.addStyleRules("." + G + ".sf-audio-btn", {
                                background: "url(" + n.svg.getSrc("download", "#5f7fa2") + ") center no-repeat !important",
                                opacity: "0.4"
                            }, "sf-audio");
                        }
                    },
                    hideLinks: function() {
                        if (this.addCustomStyle.hasStyle) {
                            this.addCustomStyle.hasStyle = 0;
                            var e = document.querySelector("#savefrom-styles.sf-audio");
                            e && e.parentNode.removeChild(e), n.addStyleRules("." + G, {
                                display: "none"
                            }, "sf-audio");
                        }
                        pe.tooltip.tooltip && (pe.tooltip.tooltip.parentNode.removeChild(pe.tooltip.tooltip), 
                        pe.tooltip.tooltip = void 0), pe.cache = {};
                    },
                    elIsHidden: function(e) {
                        return null === e.offsetParent;
                    },
                    downloadMP3Files: function() {
                        var e = me.getLayer() || document;
                        pe._getNewAudioLinks(e).then((function(e) {
                            e.linkList;
                            var t = e.trackList, r = e.title || de(), o = t.map((e => pe.isHlsLink(e.url) ? {
                                filename: e.filename,
                                sources: [ {
                                    url: e.url,
                                    format: "hls"
                                } ],
                                format: "hls",
                                useConverter: !0
                            } : e));
                            if (0 === o.length) return alert(l.A.i18n.getMessage("vkMp3LinksNotFound"));
                            n.downloadList.showBeforeDownloadPopup(o, {
                                type: "audio",
                                folderName: r
                            });
                        }), (function(e) {
                            "Abort" !== e.message && (se.debug("_getNewAudioLinks error!", e), alert(l.A.i18n.getMessage("vkMp3LinksNotFound")));
                        }));
                    },
                    showListOfAudioFiles: function(e) {
                        var t = me.getLayer() || document;
                        pe._getNewAudioLinks(t).then((function(t) {
                            var r = t.linkList, o = t.trackList, a = t.title || de(), i = null;
                            if (e) {
                                if (0 !== (i = o).length) return n.playlist.popupPlaylist(i, a, !0);
                            } else {
                                for (var s in i = [], r) i.push({
                                    url: r[s]
                                });
                                if (0 !== i.length) return n.playlist.popupFilelist(i);
                            }
                            alert(l.A.i18n.getMessage("vkMp3LinksNotFound"));
                        }), (function(e) {
                            "Abort" !== e.message && (se.debug("_getNewAudioLinks error!", e), alert(l.A.i18n.getMessage("vkMp3LinksNotFound")));
                        }));
                    },
                    requestReloadAudio: function(e, t, n) {
                        var r = {
                            act: "reload_audio",
                            ids: `${e}_${t}_${n}`
                        };
                        return (0, A.A)({
                            type: "POST",
                            url: "/audio",
                            json: !0,
                            data: r
                        }).then((e => {
                            var t = e.body.data;
                            return pe.getNewTrackInfo(t[0][0]);
                        }));
                    }
                }, fe = {
                    panelId: "savefrom__vk_video_links",
                    videoAttr: "data-savefrom-video",
                    hiddenAttr: "data-savefrom-hidden",
                    btnBoxId: "sf-iframe-dl-btn",
                    btnBox: null,
                    style: {
                        fontSize: "10pt",
                        margin: "15px 0",
                        padding: "0"
                    },
                    getLinksFormUrl: function(e) {
                        if (e) {
                            if ("//" === e.substr(0, 2) && (e = "http:" + e), r.showUmmyItem && this.isRutubeLink(e)) return fe.getRutubeLinks(e);
                            if (this.isPladformLink(e)) return fe.getPladformLinks(e);
                            var t, o = n.embedDownloader.hostings;
                            for (var a in o) {
                                for (var i, s = o[a], l = 0; i = s.re[l]; l++) {
                                    var d = e.match(i);
                                    if (d) {
                                        t = {
                                            hosting: a,
                                            action: s.action,
                                            extVideoId: d[1]
                                        };
                                        break;
                                    }
                                }
                                if (t) break;
                            }
                            if (t) return {
                                request: t
                            };
                        }
                    },
                    getLinksFromFlashVars: function(e) {
                        var t = (0, f.A)(e, {
                            params: !0
                        });
                        return fe.getLinksFromHtml5MetaData(t);
                    },
                    getLinksFromHtml5MetaData: function(e) {
                        if (e) {
                            var t = e.md_title;
                            if (void 0 !== t) {
                                var n = Object.keys(e).some((e => e.match(/cache([0-9]+)/))) ? /cache([0-9]+)/ : /url([0-9]+)/, r = {}, o = !1;
                                for (var a in e) {
                                    var i = null;
                                    if ("extra_data" !== a || "52" !== e.extra) {
                                        if (null !== (i = a.match(n))) {
                                            var s = e[a], l = s.indexOf("?");
                                            -1 !== l && (s = s.substr(0, l)), o = !0, r[i[1]] = s;
                                        }
                                    } else r[i = e.hd ? "HD" : "SD"] = e[a], o = !0;
                                }
                                if (o) return {
                                    title: t,
                                    links: r
                                };
                            }
                        }
                    },
                    getRutubeLinks: function(e) {
                        if (/rutube[^\/]+\/(?:play|video)\/embed\/(\d+)/.test(e) || /video\.rutube\./.test(e)) return {
                            isUmmy: !0,
                            links: n.popupMenu.prepareLinks.rutube(e)
                        };
                    },
                    isRutubeLink: function(e) {
                        return /\/\/.*rutube\..*/.test(e);
                    },
                    getPladformLinks: function(e) {
                        if (e) {
                            var t = (0, f.A)(e);
                            return {
                                request: {
                                    action: "getPladformVideo",
                                    extVideoId: {
                                        playerId: t.pl,
                                        videoId: t.videoid
                                    }
                                }
                            };
                        }
                    },
                    isPladformLink: function(e) {
                        return /\/\/.*pladform\..*/.test(e);
                    },
                    getLinksVideoEl: function(e, t) {
                        var n = t.querySelector(".vv_summary");
                        if (!n) return null;
                        n = n.textContent;
                        for (var r, o, a = {}, i = e.querySelectorAll("source"), s = 0; o = i[s]; s++) {
                            var l = o.src || "", d = l.indexOf("?");
                            -1 !== d && (l = l.substr(0, d));
                            var u = l.match(/\.(\d+)\.[^\/]+$/);
                            null !== u && (a[u[1]] = l, r = !0);
                        }
                        return r ? {
                            title: n,
                            links: a
                        } : void 0;
                    },
                    getPlayerNode: function(e) {
                        var t = null;
                        return e.closest(".ShortVideoPage__container") ? e : ([ "iframe.video_yt_player", "#html5_player", "#flash_video_obj", "#playerObj", "#player", ".video_box_wrap > #video_player" ].some((function(n) {
                            if (t = e.querySelector(n)) return !0;
                        })), t);
                    },
                    getLinksFromMv: function(e, t, n) {
                        return (0, B.A)([ t, e ], ((e, t) => {
                            var r = window.mvcur;
                            if (r && r.player && r.player.vars) {
                                var o = r.player.vars;
                                return o.vid !== e || o.oid !== t ? n() : {
                                    vars: r.player.vars
                                };
                            }
                        })).then((e => e ? fe.getLinksFromHtml5MetaData(e.vars) : null));
                    },
                    getLinksFromFrame: function(e) {
                        var t = document.body.innerHTML, n = (0, f.A)(location.href), r = parseInt(n.oid), o = parseInt(n.id);
                        if (r && o) {
                            var a = null;
                            if ((0, m.A)(t, [ /"vid":/, /"oid":/, /"md_title":/ ]).some((function(e) {
                                return a = e, !0;
                            })), a && a.vid === o && a.oid === r) return e(null, {
                                request: {
                                    hosting: "vk",
                                    action: "getVkLinksFromJsonMsg",
                                    json: a
                                }
                            });
                            var i = document.body, s = fe.getPlayerNode(i);
                            if (s) return fe.getLinksFromPlayer(i, s, (function(t) {
                                t && e(null, t);
                            }));
                        }
                        return e("ERROR");
                    },
                    getLinksFromPlayer: function(e, t, r) {
                        if (t) {
                            var o, a;
                            if ("OBJECT" === t.tagName) (a = t.querySelector('param[name="flashvars"]')) && (a = a.getAttribute("value"), 
                            o = fe.getLinksFromFlashVars(a)); else if ("IFRAME" === t.tagName) {
                                var i = t.getAttribute("src");
                                o || (o = fe.getLinksFormUrl(i));
                            } else if ("EMBED" === t.tagName) {
                                var s = t.getAttribute("src");
                                o || (a = t.getAttribute("flashvars")) && (o = fe.getLinksFromFlashVars(a)), o || (o = fe.getLinksFormUrl(s));
                            }
                            if (o) return r(o, e);
                            if ("DIV" === t.tagName && "video_player" === t.id) {
                                var l = t.parentNode.id, d = l && l.match(/video_box_wrap(-?\d+)_(-?\d+)/);
                                if (d) return d.shift(), d = d.map((function(e) {
                                    return parseInt(e);
                                })), (0, B.A)(d, ((e, t) => {
                                    var n = window.mvcur, r = "video" + e + "_" + t;
                                    return n && n.listId && (r = `${r}`), {
                                        path: r
                                    };
                                })).then((t => {
                                    if (t) return r({
                                        request: {
                                            hosting: "vk",
                                            action: "getVKLinks",
                                            extVideoId: t.path,
                                            oidVid: d
                                        }
                                    }, e);
                                }));
                            }
                            if ("html5_player" === t.id) return (0, B.A)((() => window.html5video && window.html5video.vars ? window.html5video.vars : r())).then((t => {
                                var n = fe.getLinksFromHtml5MetaData(t);
                                if (n) return r(n, e);
                            }));
                            if ("A" === t.tagName) {
                                var u = t.href, c = (0, f.A)(u);
                                if (c.to) return o = n.embedDownloader.checkUrl(c.to), r(o ? {
                                    request: o
                                } : null, e);
                            }
                            return r(null, e);
                        }
                    },
                    preparePladformLinks: function(e) {
                        e && "getRutubeLinks" === e.action && (e.links = null);
                        var t = e && e.links, n = "noname", r = {};
                        if (t) for (var o, a = 0; o = t[a]; a++) n = o.title, r[o.quality] && (o.quality = 0), 
                        r[o.quality.toUpperCase()] = o.url;
                        return {
                            title: n,
                            links: r
                        };
                    },
                    prepareLinks: function(e) {
                        var t = e.title, n = [];
                        for (var r in e.links) {
                            var o = e.links[r], a = o.match(/[\w]+\.(mp4|flv)(?:\?|$)/i), i = (a = a ? a[1] : "flv").toUpperCase();
                            n.push({
                                href: o,
                                quality: r,
                                title: t,
                                ext: a,
                                format: i,
                                forceDownload: !0
                            });
                        }
                        return n;
                    },
                    getVideoLinksAsAjax: function(e) {
                        var t = /video(-?\d+_-?\d+)/.exec(e);
                        t = t && t[1];
                        var n = (0, f.A)(e).list;
                        return me._getModuleName().then((function(e) {
                            return new Promise((function(r) {
                                he.getLinkAsAjax([ t, n ], (function(e, t) {
                                    r({
                                        hosting: t,
                                        response: e
                                    });
                                }), e);
                            }));
                        }));
                    },
                    prepareVideoLinks: e => (0, a.A)(s().mark((function t() {
                        var a, i, l, d, u, c, p, f, h, m, v, g, b, k, y, w, x, _, S, M, P, C;
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                if (a = [], !e || !e.oidVid) {
                                    t.next = 7;
                                    break;
                                }
                                return i = (0, o.A)(e.oidVid, 2), l = i[0], d = i[1], t.next = 5, fe.getLinksFromMv(l, d);

                              case 5:
                                (u = t.sent) && a.push(...fe.prepareLinks(u));

                              case 7:
                                return t.next = 9, (0, L.A)(e);

                              case 9:
                                if ((c = t.sent) && ("getPladformVideo" === e.action ? r.showUmmyItem && "getRutubeLinks" === c.action ? a.push(...n.popupMenu.prepareLinks.rutube(c.links)) : a.push(...fe.prepareLinks(fe.preparePladformLinks(c))) : c.links && (p = n.embedDownloader.reMapHosting(c.action)) && a.push(...n.popupMenu.prepareLinks[p](c.links, c.title))), 
                                a.length || "getVKLinks" !== e.action) {
                                    t.next = 18;
                                    break;
                                }
                                return t.next = 14, fe.getVideoLinksAsAjax(e.extVideoId);

                              case 14:
                                f = t.sent, h = f.hosting, (m = f.response) && m.links && (m.isUmmy ? a.push(...m.links) : a.push(...n.popupMenu.prepareLinks[h](m.links, m.title)));

                              case 18:
                                if (v = a.filter((e => -1 !== e.href.indexOf("mycdn.me/"))), g = a.filter((e => -1 !== e.href.indexOf("vkuser"))), 
                                !(v.length || g || a.length <= 2)) {
                                    t.next = 46;
                                    break;
                                }
                                if (!e.extVideoId) {
                                    t.next = 46;
                                    break;
                                }
                                return b = {}, (k = document.querySelector('a[href*="' + e.extVideoId + '"]')) && k.dataset.length && ((y = k.closest('[id*="post"]')) && (b.post_id = y.dataset.postId), 
                                b.list = k.dataset.list, b.paylist_id = "wall_" + k.dataset.video.split("_")[0]), 
                                b.video = e.extVideoId.split("?")[0].replace("video", ""), (w = location.href.match(/pl_(wall_.\d+)/)) && w[1] && (b.playlist_id = w[1]), 
                                (x = document.querySelector(`a[data-video="${b.video}"]`)) && x.dataset.list && (b.list = x.dataset.list), 
                                t.next = 32, (0, A.A)({
                                    type: "POST",
                                    url: `https://${location.hostname}/al_video.php?act=show`,
                                    data: ae({
                                        act: "show",
                                        al: 1,
                                        autoplay: 1,
                                        module: "groups"
                                    }, b)
                                });

                              case 32:
                                return _ = t.sent, t.next = 35, q.ht(c, _.body);

                              case 35:
                                if (S = t.sent, M = S.hls, P = S.mp4, M.length || P.length) {
                                    t.next = 44;
                                    break;
                                }
                                return t.next = 41, q.Oi(c, _.body);

                              case 41:
                                C = t.sent, M = C.hls, P = C.mp4;

                              case 44:
                                a.push(...P, ...M), a = (0, D.W)(a, "href");

                              case 46:
                                return t.next = 48, q.tI((0, D.W)(a, "quality", "itag"), (e => 22 == e.itag));

                              case 48:
                                return a = (a = t.sent).map((e => (e.title = "." === e.title ? "video-" + e.quality : e.title, 
                                e))), t.abrupt("return", a);

                              case 51:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))(),
                    newAppendButton: function(e, r) {
                        (0, te.A)({
                            category: "append",
                            subcategory: "vk",
                            event: "b"
                        });
                        var o = "sf-under-video", i = r.querySelector("#mv_info"), d = i && i.querySelector(".mv_actions_block .like_cont .like_btns");
                        i = null;
                        var u = e => e ? e.querySelector("#mv_top_controls, #VideoLayerInfo__topControls") : null, c = u(r);
                        if (c || (c = u(r.closest("#mv_container"))), c || (c = document.querySelector(M.vk.videoPostPanelBtnsList)), 
                        d && pe.elIsHidden(d) && (d = null), (d || c) && !c.querySelector(`.${o}`)) {
                            for (var p, f = !(d || !c), h = r.querySelectorAll("." + G), m = 0; p = h[m]; m++) p.parentNode.removeChild(p);
                            p = null, h = null;
                            var v = x.A.create("div", {
                                class: [ G, o ],
                                style: {
                                    cursor: "pointer"
                                },
                                on: [ [ "click", function() {
                                    var o = (0, a.A)(s().mark((function o(a) {
                                        var i, d, u;
                                        return s().wrap((function(o) {
                                            for (;;) switch (o.prev = o.next) {
                                              case 0:
                                                if (u = function(e) {
                                                    return e.map((e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                                    e)));
                                                }, a.stopPropagation(), w.A.onRemoveEvent(this, $.hideMenu), !$.contextMenu || !$.contextMenu.isShow) {
                                                    o.next = 6;
                                                    break;
                                                }
                                                return $.hideMenu(), o.abrupt("return");

                                              case 6:
                                                return i = $.contextMenu = n.popupMenu.quickInsert(this, l.A.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                                    parent: r,
                                                    offsetRight: -120
                                                }), o.next = 9, re.P.createLinkExtractor("vk-video").extractLinks({
                                                    element: e,
                                                    initData: t
                                                });

                                              case 9:
                                                return d = o.sent, o.abrupt("return", i.update(u(d)));

                                              case 11:
                                              case "end":
                                                return o.stop();
                                            }
                                        }), o, this);
                                    })));
                                    return function(e) {
                                        return o.apply(this, arguments);
                                    };
                                }() ], [ "mousedown", function(e) {
                                    e.stopPropagation();
                                } ], [ "keydown", function(e) {
                                    e.stopPropagation();
                                } ] ]
                            });
                            if (d) {
                                x.A.create(v, {
                                    class: [ "like_btn" ],
                                    append: [ x.A.create("div", {
                                        class: [ "like_button_icon" ],
                                        append: [ x.A.create("img", {
                                            src: n.svg.getSrc("download", "#828a99"),
                                            width: 16,
                                            height: 16,
                                            style: {
                                                margin: "4px"
                                            }
                                        }) ]
                                    }), x.A.create("div", {
                                        class: [ "like_button_label" ],
                                        text: l.A.i18n.getMessage("download")
                                    }) ]
                                });
                                var g = d.querySelector(".ui_actions_menu_wrap");
                                g ? g.parentNode.insertBefore(v, g) : d.appendChild(v);
                            } else if (f) {
                                x.A.create(v, {
                                    class: [ "mv_top_button" ],
                                    style: {
                                        textAlign: "center",
                                        backgroundColor: "black",
                                        padding: "6px 20px 3px 20px",
                                        marginLeft: "10px"
                                    },
                                    append: [ x.A.create("img", {
                                        class: [ "mv_small_close_icon" ],
                                        style: {
                                            backgroundImage: "none",
                                            width: "20px",
                                            height: "20px"
                                        },
                                        src: n.svg.getSrc("download", "#FFFFFF"),
                                        width: 20,
                                        height: 20
                                    }) ]
                                });
                                var b = c.firstChild;
                                if (b) if (pe.elIsHidden(c.lastChild)) {
                                    for (;b.nextElementSibling && !pe.elIsHidden(b.nextElementSibling); ) b = b.nextElementSibling;
                                    b.parentNode.insertBefore(v, b);
                                } else c.appendChild(v); else c.appendChild(v);
                            }
                        }
                    },
                    newClipButton: function(e, r) {
                        setTimeout((() => {
                            if (e) {
                                (0, te.A)({
                                    category: "append",
                                    subcategory: "vk",
                                    event: "b"
                                });
                                var o = r.closest(".ShortVideoPost");
                                o || (o = r);
                                var i = o.querySelector(".like_btns");
                                i || (i = o.querySelector(".like_cont"));
                                var d = r.closest("#mv_layer_wrap"), u = x.A.create("div", {
                                    id: "savefrom__yt_btn",
                                    style: {
                                        display: "flex",
                                        marginLeft: "10px",
                                        verticalAlign: "middle"
                                    },
                                    append: [ x.A.create("a", {
                                        class: "sf-quick-dl-btn",
                                        href: "javascript:void(0)",
                                        style: {
                                            display: "inline-block",
                                            fontSize: "inherit",
                                            height: "22px",
                                            border: "1px solid #00B75A",
                                            borderRadius: "3px",
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                            paddingLeft: "28px",
                                            cursor: "pointer",
                                            verticalAlign: "middle",
                                            position: "relative",
                                            lineHeight: "22px",
                                            textDecoration: "none",
                                            zIndex: 1,
                                            color: "#fff",
                                            marginRight: "8px"
                                        },
                                        append: [ x.A.create("i", {
                                            style: {
                                                position: "absolute",
                                                display: "inline-block",
                                                left: "6px",
                                                top: "3px",
                                                backgroundImage: "url(" + n.svg.getSrc("download", "#ffffff") + ")",
                                                backgroundSize: "12px",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                                width: "16px",
                                                height: "16px"
                                            }
                                        }) ],
                                        on: [ [ "click", function() {
                                            var r = (0, a.A)(s().mark((function r(o) {
                                                var a, u, c;
                                                return s().wrap((function(r) {
                                                    for (;;) switch (r.prev = r.next) {
                                                      case 0:
                                                        if (u = function(e) {
                                                            return e.map((e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                                            e)));
                                                        }, o.stopPropagation(), w.A.onRemoveEvent(this, $.hideMenu), !$.contextMenu || !$.contextMenu.isShow) {
                                                            r.next = 6;
                                                            break;
                                                        }
                                                        return $.hideMenu(), r.abrupt("return");

                                                      case 6:
                                                        return $.contextMenu = n.popupMenu.quickInsert(this, "Скачивается...", "sf-single-video-menu", {
                                                            parent: i
                                                        }, "clip"), l.A.sendMessage({
                                                            action: "checkAndOpenProLanding"
                                                        }), r.next = 10, re.P.createLinkExtractor("vk-clip").extractLinks({
                                                            element: e,
                                                            initData: t
                                                        });

                                                      case 10:
                                                        if (a = r.sent, 0 === (c = u(a)).length) {
                                                            r.next = 16;
                                                            break;
                                                        }
                                                        this.href = Y(c), r.next = 18;
                                                        break;

                                                      case 16:
                                                        return this.href = d.querySelector("video").src, r.abrupt("return", (0, L.A)({
                                                            action: "downloadVkStory",
                                                            downloadFileUrl: this.href,
                                                            fileName: `${Date.now()}.mp4`
                                                        }));

                                                      case 18:
                                                        this.click(), this.href = "javascript:void(0)", o.preventDefault();

                                                      case 21:
                                                      case "end":
                                                        return r.stop();
                                                    }
                                                }), r, this);
                                            })));
                                            return function(e) {
                                                return r.apply(this, arguments);
                                            };
                                        }() ] ]
                                    }), x.A.create("style", {
                                        text: (0, v.A)({
                                            selector: "#savefrom__yt_btn",
                                            append: [ {
                                                "button::-moz-focus-inner": {
                                                    padding: 0,
                                                    margin: 0
                                                },
                                                ".sf-quick-dl-btn": {
                                                    backgroundColor: "#00B75A"
                                                },
                                                ".sf-quick-dl-btn:hover": {
                                                    backgroundColor: "rgb(0, 163, 80)"
                                                },
                                                ".sf-quick-dl-btn:active": {
                                                    backgroundColor: "rgb(0, 151, 74)"
                                                }
                                            }, {
                                                media: "@media screen and (max-width: 1293px)",
                                                append: {
                                                    ".sf-quick-dl-btn .sf-btn-name": {
                                                        display: "none"
                                                    }
                                                }
                                            } ]
                                        })
                                    }), x.A.create("button", {
                                        style: {
                                            position: "relative",
                                            display: "inline-block",
                                            marginLeft: "-2px",
                                            fontSize: "inherit",
                                            height: "24px",
                                            paddingRight: "21px",
                                            backgroundColor: "#F8F8F8",
                                            border: "1px solid #CCCCCC",
                                            borderRadius: "3px",
                                            borderTopLeftRadius: "0",
                                            borderBottomLeftRadius: "0",
                                            cursor: "pointer",
                                            color: "#9B9B9B",
                                            zIndex: 0,
                                            verticalAlign: "middle",
                                            boxSizing: "border-box",
                                            lineHeight: "22px"
                                        },
                                        on: [ [ "click", function() {
                                            var r = (0, a.A)(s().mark((function r(o) {
                                                var a, d, u, c;
                                                return s().wrap((function(r) {
                                                    for (;;) switch (r.prev = r.next) {
                                                      case 0:
                                                        if (u = function(e) {
                                                            return e.map((e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                                            e)));
                                                        }, o.stopPropagation(), w.A.onRemoveEvent(this, $.hideMenu), !$.contextMenu || !$.contextMenu.isShow) {
                                                            r.next = 6;
                                                            break;
                                                        }
                                                        return $.hideMenu(), r.abrupt("return");

                                                      case 6:
                                                        return a = $.contextMenu = n.popupMenu.quickInsert(this, l.A.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                                            parent: i
                                                        }, "clip"), r.next = 9, re.P.createLinkExtractor("vk-clip").extractLinks({
                                                            element: e,
                                                            initData: t
                                                        });

                                                      case 9:
                                                        return d = r.sent, c = u(d), r.abrupt("return", a.update(c));

                                                      case 12:
                                                      case "end":
                                                        return r.stop();
                                                    }
                                                }), r, this);
                                            })));
                                            return function(e) {
                                                return r.apply(this, arguments);
                                            };
                                        }() ], [ "mousedown", function(e) {
                                            e.stopPropagation();
                                        } ], [ "keydown", function(e) {
                                            e.stopPropagation();
                                        } ] ],
                                        append: [ x.A.create("i", {
                                            style: {
                                                position: "absolute",
                                                display: "inline-block",
                                                top: "9px",
                                                right: "6px",
                                                border: "5px solid #868282",
                                                borderBottomColor: "transparent",
                                                borderLeftColor: "transparent",
                                                borderRightColor: "transparent"
                                            }
                                        }), x.A.create("span", {
                                            text: "HD"
                                        }) ]
                                    }) ]
                                });
                                i && (i.querySelector("#savefrom__yt_btn") || i.append(u));
                            }
                        }), 500);
                    },
                    appendNewFrameBtn: function(e, t) {
                        var o = this;
                        if (!t.querySelector("." + G)) {
                            var a = n.frameMenu.getBtn({
                                singleBtn: !0,
                                btnId: o.btnBoxId,
                                containerStyle: {
                                    top: "10px",
                                    right: "10px"
                                },
                                on: [ [ "click", function(t) {
                                    if (t.preventDefault(), t.stopPropagation(), $.contextMenu && $.contextMenu.isShow) $.hideMenu(); else {
                                        var i = $.contextMenu = n.frameMenu.getMenu(this, l.A.i18n.getMessage("download") + "...", "sf-frame-menu", {
                                            container: a.container,
                                            onShow: function() {
                                                a.node.classList.add("sf-over");
                                            },
                                            onHide: function() {
                                                $.contextMenu = null, a.node.classList.remove("sf-over");
                                            }
                                        });
                                        if (e.request) {
                                            var s = function(t) {
                                                var a = l.A.i18n.getMessage("noLinksFound");
                                                if (t && "getPladformVideo" === e.request.action) a = r.showUmmyItem && "getRutubeLinks" === t.action ? n.popupMenu.prepareLinks.rutube(t.links) : o.prepareLinks(o.preparePladformLinks(t)); else if (t && t.links) {
                                                    var s = n.embedDownloader.reMapHosting(t.action);
                                                    s && (a = n.popupMenu.prepareLinks[s](t.links, t.title));
                                                }
                                                i.update(a);
                                            };
                                            try {
                                                l.A.sendMessage(e.request, s);
                                            } catch (t) {
                                                s();
                                            }
                                        } else i.update(o.prepareLinks(e));
                                        !1;
                                    }
                                } ], [ "mousedown", function(e) {
                                    e.stopPropagation(), 2 === e.button && ($.hideMenu(), a.container.parentNode && a.container.parentNode.removeChild(a.container));
                                } ] ]
                            });
                            a.container = x.A.create("div", {
                                class: "sf-btn-ctr",
                                append: a.node
                            }), a.node.appendChild(x.A.create("style", {
                                text: (0, v.A)([ {
                                    selector: [ "body:hover .sf-btn-ctr #" + o.btnBoxId, "body:hover .sf-btn-ctr .sf-frame-menu" ],
                                    style: {
                                        display: "block"
                                    }
                                } ])
                            })), document.body.appendChild(a.container);
                        }
                    },
                    addFrameBtn: function() {
                        var e = document.getElementById("page_wrap");
                        e && fe.getLinksFromFrame((function(t, n) {
                            t || fe.appendNewFrameBtn(n, e);
                        }));
                    }
                }, he = {
                    linkDataAttr: "savefromHasBtn",
                    getLinkAsAjaxRequest: function(e, t) {
                        t = t || 0;
                        var n = Object.assign({}, e), r = function() {
                            if (t < 1) return he.getLinkAsAjaxRequest(e, ++t);
                            e.error && e.error();
                        }, o = n.data;
                        0 === t ? o.act = "show_inline" : 1 === t && (o.act = "show"), (0, y.A)(n, (function(t, n, o) {
                            return t || !o || -1 !== o.indexOf('href="/join"') ? r() : void e.success(o);
                        }));
                    },
                    getVideoDataFromLink: function(e) {
                        var t = e.getAttribute("onclick"), n = /showVideo\(['"]{1}([^'"]+)['"]{1},.?['"]{1}([^'"]+)['"]{1},.*\)/.exec(t);
                        return n && n.shift(), n;
                    },
                    getLinkAsAjax: function(e, t, o) {
                        he.getLinkAsAjaxRequest({
                            localXHR: 1,
                            type: "POST",
                            url: "/al_video.php",
                            data: {
                                list: e[1],
                                video: e[0],
                                act: "show_inline",
                                module: o,
                                al: 1
                            },
                            success: function(e) {
                                if (!e) return t();
                                var o = e.match(/<iframe[^>]+src=['"]{1}([^'">]+)['"]{1}[^>]+>/i);
                                if (o || (o = e.match(/var\s+opts\s+=\s+({[^}]*})/im)) && (o = o[1].match(/url:\s+['"]{1}([^'"]+)['"]{1}/i)) && 0 !== o[1].indexOf("//") && 0 !== o[1].indexOf("http") && (o = null), 
                                o) {
                                    var a = o[1];
                                    if (r.showUmmyItem && fe.isRutubeLink(a)) return t(fe.getRutubeLinks(a));
                                    if (0 === a.indexOf("//") && (a = "http:" + a), 0 !== a.indexOf("http")) return t();
                                    var i = n.embedDownloader.checkUrl(a);
                                    if (!i) return t();
                                    var s = {
                                        action: i.action,
                                        extVideoId: i.extVideoId
                                    };
                                    l.A.sendMessage(s, (function(e) {
                                        var r = i.hosting;
                                        return e.action !== s.action && (r = n.embedDownloader.reMapHosting(e.action)), 
                                        t(e, r);
                                    }));
                                } else (0, L.A)({
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
                    },
                    addDownloadBtn: function(e) {
                        var t = e.href, r = {
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            marginLeft: "5px",
                            backgroundImage: "url(" + n.svg.getSrc("download", "#78A2CC") + ")",
                            backgroundRepeat: "no-repeat",
                            marginBottom: "-4px"
                        }, o = x.A.create("a", {
                            href: "http://savefrom.net/?url=" + encodeURIComponent(t),
                            style: r,
                            on: [ "click", function(e) {
                                if (e.preventDefault(), w.A.onRemoveEvent(a, $.hideMenu), $.contextMenu && $.contextMenu.isShow) $.hideMenu(); else {
                                    var t = document.querySelector("#wk_box");
                                    t && t.contains(this) || (t = null);
                                    var r = {
                                        parent: t
                                    }, i = this.getAttribute(n.embedDownloader.dataAttr), s = n.embedDownloader.checkUrl(i);
                                    if (s) {
                                        var d = {
                                            action: s.action,
                                            extVideoId: s.extVideoId
                                        }, u = $.contextMenu = n.popupMenu.quickInsert(o, l.A.i18n.getMessage("download") + " ...", "sf-popupMenu", r);
                                        fe.prepareVideoLinks(d).then((e => {
                                            e.map((e => ("MP4" === e.format && (e.forceDownload = !0), e))), u.update(e);
                                        }));
                                    } else $.contextMenu = n.popupMenu.quickInsert(o, l.A.i18n.getMessage("noLinksFound"), "sf-popupMenu", r);
                                }
                            } ]
                        });
                        o.setAttribute(n.embedDownloader.dataAttr, t);
                        var a = x.A.create("span", {
                            class: "sf-video-feed-container",
                            on: [ "click", function(e) {
                                l.A.sendMessage({
                                    action: "checkAndOpenProLanding",
                                    id: "vk-4"
                                }), e.stopPropagation();
                            } ],
                            append: [ o ]
                        }), i = e.querySelector(".post_video_title");
                        i ? i.appendChild(a) : e.appendChild(a);
                    },
                    onLinkHover: function() {
                        var e = this;
                        if ("A" === e.tagName) {
                            var t = e.href || "";
                            0 === e.id.indexOf("post_media_lnk") && -1 !== t.indexOf("/video") && ($.contextMenu && $.contextMenu.isShow && $.hideMenu(), 
                            e.dataset[he.linkDataAttr] || (e.dataset[he.linkDataAttr] = 1, he.addDownloadBtn(e)));
                        }
                    },
                    off: function() {
                        for (var e, t = document.querySelectorAll(".sf-video-feed-container"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                        var r = (0, h.A)(he.linkDataAttr), o = document.querySelectorAll("*[" + r + "]");
                        for (n = 0; e = o[n]; n++) e.removeAttribute(r);
                    }
                }, me = {
                    photoCache: {},
                    getAlbumId: function(e) {
                        if (!/(\?|&|#)act=edit/i.test(e)) {
                            var t = [];
                            t.push(e);
                            var n = (0, f.A)(e);
                            n.w && t.push(n.w), n.z && t.push.apply(t, n.z.split("/")), /#/.test(e) && (t.push(e.substr(e.indexOf("#") + 1)), 
                            t.push(decodeURIComponent(e.substr(e.indexOf("#") + 1)))), t.reverse();
                            var r = null, o = null;
                            return t.some((function(e) {
                                if (o = e.match(/(?:\/|#|=|^)(albums?|tag|photos|feed(?:\d+)?_|wall)(-?\d+)(?:_(\d+))?/i)) return o[3] ? r = /^(feed|wall)/.test(o[1]) ? o[1] + o[2] + "_" + o[3] : "album" + o[2] + "_" + o[3] : ("albums" == o[1] && (o[1] = "photos"), 
                                r = o[1] + o[2]), !0;
                            })), r;
                        }
                    },
                    getModuleName: function(e) {
                        var t = "sfModule", n = x.A.create("script", {
                            text: "(" + 'function(){if(window.cur&&window.cur.module&&typeof window.cur.module==="string"){document.body.dataset["{dataArg}"]=window.cur.module}}'.replace("{dataArg}", t) + ")();"
                        });
                        document.body.appendChild(n), setTimeout((function() {
                            n.parentNode.removeChild(n), e(document.body.dataset[t]);
                        }), 0);
                    },
                    isReply: function(e) {
                        return (0, g.A)(e, ".replies " + e.tagName) || (0, g.A)(e, ".wl_replies " + e.tagName);
                    },
                    getPopup: function(e, t, r) {
                        var o, a = n.playlist.getInfoPopupTemplate();
                        x.A.create(a.textContainer, {
                            append: [ x.A.create("p", {
                                text: e,
                                style: {
                                    color: "#0D0D0D",
                                    fontSize: "20px",
                                    marginBottom: "11px",
                                    marginTop: "13px"
                                }
                            }), o = x.A.create("p", {
                                text: "",
                                style: {
                                    color: "#868686",
                                    fontSize: "14px",
                                    lineHeight: "24px"
                                }
                            }) ]
                        });
                        var i = n.popupDiv(a.body, "sf_progress_popup", void 0, void 0, r), s = function e(n) {
                            e.state !== n && (e.state = n, a.buttonContainer.style.display = "none", o.style.display = "none", 
                            l.A.sendMessage({
                                action: "getWarningIcon",
                                type: t,
                                color: "#77D1FA"
                            }, (function(e) {
                                a.icon.style.backgroundImage = "url(" + e + ")";
                            })), "progress" === n && (o.style.display = "block"), "error" === n && (l.A.sendMessage({
                                action: "getWarningIcon",
                                type: t,
                                color: "#AAAAAA"
                            }, (function(e) {
                                a.icon.style.backgroundImage = "url(" + e + ")";
                            })), o.style.display = "block"));
                        };
                        return {
                            onPrepare: function(e) {
                                s("progress"), o.textContent = e;
                            },
                            onProgress: function(e, t) {
                                o.textContent = l.A.i18n.getMessage("vkFoundFiles").replace("%d", e) + " " + l.A.i18n.getMessage("vkFoundOf") + " " + t;
                            },
                            onReady: function() {
                                w.A.trigger(i, "kill");
                            },
                            onError: function(e) {
                                s("error"), o.textContent = e;
                            }
                        };
                    },
                    getLayer: function() {
                        var e = document.getElementById("layer_wrap");
                        return null !== e && "none" !== e.style.display && 0 !== e.textContent.length || (e = null), 
                        null === e && (null !== (e = document.getElementById("wk_layer_wrap")) && "none" !== e.style.display && 0 !== e.textContent.length || (e = null)), 
                        e;
                    },
                    _getModuleName: function() {
                        var e = "sfModule";
                        return new Promise((function(t, n) {
                            var r = x.A.create("script", {
                                text: '(function(dataArg){if(window.cur&&window.cur.module&&typeof window.cur.module==="string"){document.body.dataset[dataArg]=window.cur.module}})(' + JSON.stringify(e) + ");"
                            });
                            document.body.appendChild(r), setTimeout((function() {
                                r.parentNode.removeChild(r), t(document.body.dataset[e]);
                            }), 0);
                        }));
                    },
                    _getLinks: (U = (0, a.A)(s().mark((function e(t) {
                        var r, o, a, i, d, c;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return r = this, o = Promise.resolve(), a = {}, i = r.getPopup(de(), "photo", (function() {
                                    a.abort = !0;
                                })), a.onProgress = function(e, t) {
                                    i.onProgress(e, t);
                                }, i.onPrepare(l.A.i18n.getMessage("download") + " ..."), e.prev = 6, e.next = 9, 
                                re.P.createLinkExtractor("vk-albums").extractLinks({
                                    mediaId: t,
                                    details: a
                                });

                              case 9:
                                d = e.sent, i.onReady(), c = de(), u ? n.downloadList.showBeforeDownloadPopup(d, {
                                    count: d.length,
                                    folderName: c,
                                    type: "photo",
                                    onShowList: function() {
                                        r.showListOfLinks(c, d, !0);
                                    }
                                }) : r.showListOfLinks(c, d, !0), e.next = 19;
                                break;

                              case 15:
                                e.prev = 15, e.t0 = e.catch(6), "Abort" !== e.t0.message && se.debug("_getLinks error", e.t0), 
                                i.onError(l.A.i18n.getMessage("noLinksFound"));

                              case 19:
                                return e.abrupt("return", o);

                              case 20:
                              case "end":
                                return e.stop();
                            }
                        }), e, this, [ [ 6, 15 ] ]);
                    }))), function(e) {
                        return U.apply(this, arguments);
                    }),
                    rmPhotoAlbumDlBtn: function() {
                        for (var e, t = document.querySelectorAll([ ".sf-dl-ablum-btn-divide", ".sf-dl-ablum-btn" ]), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    },
                    addNewPhotoAlbumDlBtn: function(e) {
                        var t = this, n = e.querySelector(".photos_album_intro_info"), r = e.querySelector(".page_block_header_extra"), o = n || r;
                        if (o && !o.querySelector(".sf-dl-ablum-btn")) {
                            var a = x.A.create("a", {
                                text: l.A.i18n.getMessage("vkDownloadPhotoAlbum"),
                                href: "#",
                                class: "sf-dl-ablum-btn",
                                on: [ "click", function(e) {
                                    e.preventDefault(), l.A.sendMessage({
                                        action: "checkAndOpenProLanding",
                                        id: "vk-5"
                                    });
                                    var n = me.getAlbumId(location.href);
                                    t._getLinks(n);
                                } ]
                            }), i = x.A.create("span", {
                                append: a
                            });
                            n ? (i.classList.add("photos_album_info"), i = x.A.create(document.createDocumentFragment(), {
                                append: [ x.A.create("span", {
                                    class: "divide sf-dl-ablum-btn-divide",
                                    text: "|"
                                }), i ]
                            })) : r && (i.classList.add("photos_comments_link"), i.style.margin = "0 15px"), 
                            o.appendChild(i);
                        }
                    },
                    getContainer: function() {
                        var e = document.getElementById("photos_albums_container");
                        return e || (e = document.getElementById("photos_container")), e;
                    },
                    rmCurrentPhotoBtn: function(e) {
                        for (var t, n = void 0, r = document.querySelectorAll(".sf-dl-current-photo-btn"), o = 0; t = r[o]; o++) e && e.contains(t) ? n = t : t.parentNode.removeChild(t);
                        return n;
                    },
                    style: null,
                    injectStyle: function() {
                        this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = x.A.create("style", {
                            text: (0, v.A)({
                                "div > .sf-dl-current-photo-btn": {
                                    display: "none",
                                    border: "1px solid #F8F8F8",
                                    width: "20px",
                                    height: "20px",
                                    padding: 0,
                                    position: "absolute",
                                    background: "url(" + n.svg.getSrc("download", "#777777") + ") center no-repeat #F8F8F8",
                                    backgroundSize: "12px",
                                    top: "20px",
                                    left: "30px",
                                    zIndex: 10,
                                    cursor: "pointer"
                                },
                                "div > .sf-dl-current-photo-btn.sf-style-black": {
                                    border: 0,
                                    background: "url(" + n.svg.getSrc("download", "#FFF") + ") center no-repeat #000",
                                    backgroundSize: "14px",
                                    padding: "2px 4px",
                                    borderRadius: "2px",
                                    opacity: .4,
                                    transition: "opacity 100ms linear"
                                },
                                "div > .sf-dl-current-photo-btn:hover": {
                                    background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #F8F8F8",
                                    backgroundSize: "12px",
                                    opacity: .8
                                },
                                "div > .sf-dl-current-photo-btn.sf-style-black:hover": {
                                    background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #000",
                                    backgroundSize: "14px"
                                },
                                "div > .sf-dl-current-photo-btn:active": {
                                    outline: 0,
                                    boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                                },
                                "div:hover > .sf-dl-current-photo-btn": {
                                    display: "block"
                                }
                            })
                        }), document.head.appendChild(this.style));
                    },
                    getMaxPhotoSize: function(e) {
                        var t = null, n = null;
                        [ "w", "z", "y", "x" ].some((function(r) {
                            return !!(t = e[r + "_"]) || (!!(n = e[r + "_src"]) || void 0);
                        })), t || (t = [ n ]);
                        var r, o;
                        return t[0] ? {
                            url: (r = e.base, o = t[0], o.match(/https?:\/\//i) ? ((o = new URL(o)).pathname.match(/\.[a-z]{3}$/i) || (o += ".jpg"), 
                            o.toString()) : (o.match(/\.[a-z]{3}$/i) || (o += ".jpg"), (r || "").replace(/\/[a-z0-9_:\.]*$/i, "") + "/" + o)),
                            width: t[2] && t[1],
                            height: t[1] && t[2]
                        } : null;
                    },
                    addNewDlCurrentPhotoBtn: function(e) {
                        var t = e;
                        if ((0, te.A)({
                            category: "append",
                            subcategory: "vk",
                            event: "b"
                        }), !this.rmCurrentPhotoBtn(t)) {
                            var r = e.closest(".pv_photo_wrap");
                            if (r) {
                                var i = x.A.create("a", {
                                    class: [ "sf-dl-current-photo-btn", "sf-style-black" ],
                                    href: "#",
                                    title: l.A.i18n.getMessage("download"),
                                    on: [ [ "click", function() {
                                        var e = (0, a.A)(s().mark((function e(a) {
                                            var i, d, u, c, p, f, h, m;
                                            return s().wrap((function(e) {
                                                for (;;) switch (e.prev = e.next) {
                                                  case 0:
                                                    if (a.stopPropagation(), a.preventDefault(), w.A.onRemoveEvent(this, $.hideMenu), 
                                                    !$.contextMenu || !$.contextMenu.isShow) {
                                                        e.next = 6;
                                                        break;
                                                    }
                                                    return $.hideMenu(), e.abrupt("return");

                                                  case 6:
                                                    return i = $.contextMenu = n.popupMenu.quickInsert(this, l.A.i18n.getMessage("download") + " ...", "photoDlMenu", {
                                                        parent: t
                                                    }), d = function() {
                                                        return i.update(l.A.i18n.getMessage("noLinksFound"));
                                                    }, u = r.querySelector(".like_wrap").classList, c = null, u.forEach((e => {
                                                        var t = e.match(/photo(-?\d+_\d+)/);
                                                        c = t && t[1];
                                                    })), e.prev = 11, e.next = 14, re.P.createLinkExtractor("vk-photo").extractLinks({
                                                        mediaId: c
                                                    });

                                                  case 14:
                                                    p = e.sent, f = (0, o.A)(p, 1), h = f[0], (m = []).push({
                                                        href: h.url,
                                                        title: h.filename,
                                                        quality: l.A.i18n.getMessage("download"),
                                                        format: " ",
                                                        ext: h.ext,
                                                        forceDownload: !0,
                                                        isOther: !0,
                                                        isBlank: !0,
                                                        func: function() {
                                                            "undefined" != typeof GM_info && "Tampermonkey" === GM_info.scriptHandler ? setTimeout((() => i.hide()), 2500) : i.hide();
                                                        }
                                                    }), m.push({
                                                        href: "#getAlbum",
                                                        title: "",
                                                        quality: l.A.i18n.getMessage("vkDownloadPhotoAlbum"),
                                                        format: " ",
                                                        ext: "",
                                                        noSize: !0,
                                                        isOther: !0,
                                                        func: function(e) {
                                                            e.preventDefault(), me.downloadPhoto(), i.hide();
                                                        }
                                                    }), i.update(m), e.next = 27;
                                                    break;

                                                  case 23:
                                                    return e.prev = 23, e.t0 = e.catch(11), console.error(e.t0), e.abrupt("return", d());

                                                  case 27:
                                                  case "end":
                                                    return e.stop();
                                                }
                                            }), e, this, [ [ 11, 23 ] ]);
                                        })));
                                        return function(t) {
                                            return e.apply(this, arguments);
                                        };
                                    }() ], [ "mousedown", function(e) {
                                        e.stopPropagation();
                                    } ] ]
                                });
                                new C.A({
                                    queries: [ {
                                        css: M.vk.contextMenu,
                                        is: "added",
                                        callback: () => {
                                            $.contextMenu && $.contextMenu.isShow && ($.hideMenu(), i.click());
                                        }
                                    } ]
                                }), t.appendChild(i);
                            }
                        }
                    },
                    downloadPhoto: function() {
                        var e = this.getAlbumId(location.href);
                        if (!e) {
                            var t = document.querySelector(".pv_album_name a");
                            t && !pe.elIsHidden(t) && (e = this.getAlbumId(t.href));
                        }
                        this._getLinks(e);
                    },
                    showListOfPhotosContent: function(e, t) {
                        var n;
                        return "<!DOCTYPE html><html>" + x.A.create("html", {
                            append: [ x.A.create("head", {
                                append: [ x.A.create("meta", {
                                    attr: {
                                        charset: "utf-8"
                                    }
                                }), x.A.create("style", {
                                    text: "a,img{display:block;margin-bottom:5px;}p{width: 640px}"
                                }) ]
                            }), x.A.create("body", {
                                append: [ e, x.A.create("p", {
                                    text: l.A.i18n.getMessage("vkListOfPhotosInstruction")
                                }), x.A.create("br"), x.A.create("br"), (n = document.createDocumentFragment(), 
                                t.forEach((function(e) {
                                    var t = e.url, r = e.filename || "", o = x.A.create("img", {
                                        src: t,
                                        alt: "photo"
                                    });
                                    r && (o = x.A.create("a", {
                                        href: t,
                                        download: r,
                                        append: o
                                    })), n.appendChild(o);
                                })), n) ]
                            }) ]
                        }).innerHTML + "</html>";
                    },
                    showListOfLinks: function(e, t, r) {
                        var o;
                        o = r ? x.A.create(document.createDocumentFragment(), {
                            append: [ x.A.create("p", {
                                append: [ x.A.create("a", {
                                    text: l.A.i18n.getMessage("vkListOfPhotos"),
                                    href: "#",
                                    class: "sf__hidden",
                                    style: {
                                        fontWeight: "bolder",
                                        border: "none",
                                        textDecoration: "underline"
                                    },
                                    on: [ "click", function(n) {
                                        n.preventDefault();
                                        var r = me.showListOfPhotosContent(e, t), o = "";
                                        l.A.isChrome || l.A.isTM ? (o = (0, k.A)(r, "text/html", !0), l.A.sendMessage({
                                            action: "openTab",
                                            url: o
                                        })) : (o = (0, k.A)(r, "text/html"), window.open(o, "_blank"));
                                    } ]
                                }) ]
                            }) ]
                        }) : "";
                        for (var a, i, s = "", d = 0; a = t[d]; d++) s += a.url + "\r\n";
                        var u = x.A.create(document.createDocumentFragment(), {
                            append: [ x.A.create("p", {
                                text: e,
                                style: {
                                    color: "#0D0D0D",
                                    fontSize: "20px",
                                    marginBottom: "11px",
                                    marginTop: "5px"
                                }
                            }), x.A.create("p", {
                                append: (0, _.A)(l.A.i18n.getMessage("vkListOfLinksInstruction"))
                            }), o, i = x.A.create("textarea", {
                                text: s,
                                cols: 60,
                                rows: 10,
                                style: {
                                    width: "100%"
                                }
                            }), l.A.isChrome || l.A.isFirefox ? x.A.create("button", {
                                text: l.A.i18n.getMessage("copy"),
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
                                    var t = this;
                                    t.disabled = !0, l.A.isFirefox ? (i.select(), document.execCommand("copy")) : l.A.sendMessage({
                                        action: "addToClipboard",
                                        text: s
                                    }), setTimeout((function() {
                                        t.disabled = !1;
                                    }), 1e3);
                                } ],
                                append: x.A.create("style", {
                                    text: (0, v.A)({
                                        "#savefrom_popup_box button:hover:not(:disabled)": {
                                            backgroundColor: "#597A9E !important",
                                            borderColor: "#597A9E !important",
                                            color: "#fff"
                                        },
                                        "#savefrom_popup_box button:active": {
                                            opacity: .9
                                        }
                                    })
                                })
                            }) : void 0 ]
                        });
                        n.popupDiv(u);
                    }
                }, ve = {
                    mobileMenu: null,
                    observer: null,
                    styleEl: null,
                    run: function() {
                        var e = this;
                        if (C.A.isAvailable()) {
                            if (e.observer) return e.observer.start();
                            var t = t => {
                                for (var n, r = 0; n = t.added[r]; r++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                e.insertVideoBtn(n));
                            };
                            e.observer = new C.A({
                                queries: [ {
                                    css: M.vk.audioItemAdd,
                                    is: "added",
                                    callback: t => {
                                        for (var n, r = 0; n = t.added[r]; r++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                        e.insertAudioBtn(n));
                                    }
                                }, {
                                    css: M.vk.bodyAdd,
                                    is: "added",
                                    callback: t
                                }, {
                                    css: M.vk.videoPostPanel,
                                    is: "added",
                                    callback: t
                                }, {
                                    css: "." + w.A.onRemoveClassName,
                                    is: "removed",
                                    callback: e => {
                                        for (var t, n = 0; t = e.removed[n]; n++) w.A.onRemoveListener(t);
                                    }
                                } ]
                            }), e.insertStyle();
                        }
                    },
                    hideMenu: function() {
                        ve.mobileMenu && (ve.mobileMenu.hide(), ve.mobileMenu = null);
                    },
                    insertStyle: function() {
                        this.styleEl ? this.styleEl.parentNode || document.head.appendChild(this.styleEl) : (this.styleEl = x.A.create("style", {
                            class: "sf-style",
                            text: (0, v.A)([ {
                                selector: "." + G + ".sf-audio",
                                style: {
                                    display: "block",
                                    float: "right",
                                    borderRadius: "3px",
                                    width: "22px",
                                    height: "22px",
                                    marginTop: "1px",
                                    marginLeft: "3px",
                                    marginRight: "3px",
                                    background: "url(" + n.svg.getSrc("download", "#ffffff") + ") center no-repeat",
                                    backgroundSize: "12px",
                                    backgroundColor: "#5E80AA"
                                }
                            }, {
                                selector: ".audio_item ." + G + ".sf-audio",
                                style: {
                                    position: "absolute",
                                    right: "32px",
                                    top: 0,
                                    bottom: 0,
                                    margin: "auto"
                                }
                            }, {
                                selector: ".audio_item.ai_current ." + G + ".sf-audio",
                                style: {
                                    bottom: "auto",
                                    top: "6px"
                                }
                            } ])
                        }), document.head.appendChild(this.styleEl));
                    },
                    getAudioUrlFromNode: (j = (0, a.A)(s().mark((function e(t) {
                        var n, r, a;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, pe.getNewNodeTrackInfo(t);

                              case 2:
                                if ((n = e.sent).fullId && n.actionHash && n.urlHash) {
                                    e.next = 5;
                                    break;
                                }
                                throw new Error("Track info not valid for fetch audio link");

                              case 5:
                                return r = pe.requestReloadAudio(n.fullId, n.actionHash, n.urlHash), a = (0, B.A)([], "function(){return vk.id}"), 
                                e.abrupt("return", Promise.all([ r, a ]).then((e => {
                                    var t = (0, o.A)(e, 2), n = t[0], r = t[1], a = I.ys(r, n.url);
                                    return I.Nx(a) ? I.d(a) : a;
                                })));

                              case 8:
                              case "end":
                                return e.stop();
                            }
                        }), e);
                    }))), function(e) {
                        return j.apply(this, arguments);
                    }),
                    onAudioBtnClick: function(e) {
                        if (e.preventDefault(), e.stopPropagation(), e.target.href) return n.downloadOnClick(e);
                        var t = e.target.closest(".audio_item");
                        t && this.getAudioUrlFromNode(t).then((t => {
                            e.target.href = t, n.downloadOnClick(e);
                        })).catch((e => {
                            se.error("getAudioUrlFromNode error: " + e.message);
                        }));
                    },
                    getAudioDlBtnNode: function(e) {
                        return x.A.create("a", {
                            class: [ G, "sf-audio" ],
                            download: S.A.modify(e),
                            target: "_blank",
                            on: [ "click", this.onAudioBtnClick.bind(this) ],
                            title: l.A.i18n.getMessage("download")
                        });
                    },
                    insertAudioBtn: function(e) {
                        var t = null, n = e.querySelector(".ai_label");
                        if (n) {
                            var r = n.textContent.trim(), o = n.querySelector(".ai_title"), a = n.querySelector(".ai_artist"), i = o && o.textContent.trim(), s = a && a.textContent.trim();
                            t = i && s ? `${s.trim()} – ${i.trim()}` : r;
                        }
                        t = `${t || "unknown"}.mp3`;
                        var l = e.querySelector(".ai_dur");
                        if (l) {
                            var d = l.parentNode, u = this.getAudioDlBtnNode(t), c = d.querySelector("." + G);
                            if (c) c.parentNode.replaceChild(u, c); else {
                                var p = l.nextElementSibling;
                                if (!p) return;
                                d.insertBefore(u, p);
                            }
                        }
                    },
                    onVideoBtnClick: function(e, t) {
                        t.preventDefault(), t.stopPropagation(), ve.hideMenu();
                        var r = ve.mobileMenu = n.mobileLightBox.show(l.A.i18n.getMessage("download") + " ..."), o = l.A.i18n.getMessage("noLinksFound");
                        if (e.request) {
                            var a = function(t) {
                                if (t && "getPladformVideo" === e.request.action) o = fe.prepareLinks(fe.preparePladformLinks(t)); else {
                                    var a = n.embedDownloader.reMapHosting(t.action);
                                    a && t && t.links && (o = n.popupMenu.prepareLinks[a](t.links, t.title));
                                }
                                if (!o.length) {
                                    var i = Array.from(document.body.querySelectorAll('.vv_inline_video source[type="video/mp4"]'));
                                    o = i.map((e => {
                                        var t = document.querySelector(".VideoPageInfoRow__title"), n = e.src.match(/.(\d+)\.mp4/);
                                        return {
                                            title: t ? t.textContent : "video",
                                            href: e.src,
                                            forceDownload: !0,
                                            ext: "mp4",
                                            format: "MP4",
                                            quality: n ? n[1] : ""
                                        };
                                    }));
                                }
                                r.update(o);
                            };
                            try {
                                l.A.sendMessage(e.request, a);
                            } catch (t) {
                                a();
                            }
                        } else o = fe.prepareLinks(e), r.update(o);
                    },
                    appendVideoBtn: function(e, t) {
                        var r = t.querySelector(".VideoPageInfoRow__title"), o = n.svg.getSvg("download", "#4986cc", "20px");
                        o.style.marginLeft = "17px", o.style.marginTop = "6px", o.style.float = "right", 
                        o.style.cursor = "pointer", o.addEventListener("click", this.onVideoBtnClick.bind(this, e)), 
                        r && r.appendChild(o), w.A.onRemoveEvent(o, ve.hideMenu);
                    },
                    insertVideoBtn: function(e) {
                        var t = this, n = e.querySelectorAll("iframe, video, a")[0], r = (0, p.A)(e, "VideoPage"), o = function() {
                            var e = /video(-?\d+)_(-?\d+)/.exec(location.href);
                            return e && {
                                request: {
                                    hosting: "vk",
                                    action: "getVKLinks",
                                    extVideoId: "video" + e[1] + "_" + e[2]
                                }
                            };
                        };
                        n ? fe.getLinksFromPlayer(r, n, (function(e, n) {
                            e || (e = o()), e && t.appendVideoBtn(e, n);
                        })) : e.querySelector(".vv_not_support") && o() && t.appendVideoBtn(o(), r);
                    }
                };
            }));
        }
    }, n = {};
    function r(e) {
        var o = n[e];
        if (void 0 !== o) return o.exports;
        var a = n[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(a.exports, a, a.exports, r), a.exports;
    }
    r.m = t, e = [], r.O = (t, n, o, a) => {
        if (!n) {
            var i = 1 / 0;
            for (u = 0; u < e.length; u++) {
                for (var [n, o, a] = e[u], s = !0, l = 0; l < n.length; l++) (!1 & a || i >= a) && Object.keys(r.O).every((e => r.O[e](n[l]))) ? n.splice(l--, 1) : (s = !1, 
                a < i && (i = a));
                if (s) {
                    e.splice(u--, 1);
                    var d = o();
                    void 0 !== d && (t = d);
                }
            }
            return t;
        }
        a = a || 0;
        for (var u = e.length; u > 0 && e[u - 1][2] > a; u--) e[u] = e[u - 1];
        e[u] = [ n, o, a ];
    }, r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }), t;
    }, r.d = (e, t) => {
        for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        });
    }, r.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, r.j = 302, (() => {
        r.b = document.baseURI || self.location.href;
        var e = {
            302: 0
        };
        r.O.j = t => 0 === e[t];
        var t = (t, n) => {
            var o, a, [i, s, l] = n, d = 0;
            if (i.some((t => 0 !== e[t]))) {
                for (o in s) r.o(s, o) && (r.m[o] = s[o]);
                if (l) var u = l(r);
            }
            for (t && t(n); d < i.length; d++) a = i[d], r.o(e, a) && e[a] && e[a][0](), e[a] = 0;
            return r.O(u);
        }, n = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n));
    })(), r.nc = void 0;
    var o = r.O(void 0, [ 223 ], (() => r(5914)));
    o = r.O(o);
})();