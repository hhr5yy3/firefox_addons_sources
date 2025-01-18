(() => {
    "use strict";
    var e, t = {
        6340: (e, t, r) => {
            var a = r(3453), n = r(467), i = r(4756), s = r.n(i), o = r(9242), d = r(4733), l = r(7736), c = r(2944), u = r(8244), f = r(5563), v = r(9022), h = r(1460), m = r(9620), p = r(8139), x = r(7661), y = r(9589), g = r(2525), b = r(4895), k = r(4689), S = r(453), w = r(6714), A = r(4467), C = r(8233);
            function _(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(e);
                    t && (a = a.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    }))), r.push.apply(r, a);
                }
                return r;
            }
            class E {
                constructor(e, t) {
                    this.events = e, this.resource = t, this.debug = (0, C.A)(this.resource), this.userId = this.generateUserId(), 
                    this.sessionId = null, this.uuid = null, this.location = null, this.sessionActive = !1, 
                    this.customDimensions = {};
                }
                generateUserId() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                        var t = 16 * Math.random() | 0;
                        return ("x" == e ? t : 3 & t | 8).toString(16);
                    }));
                }
                generateSessionId() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                        var t = 16 * Math.random() | 0;
                        return ("x" == e ? t : 3 & t | 8).toString(16);
                    }));
                }
                start() {
                    var e = this;
                    return (0, n.A)(s().mark((function t() {
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return t.next = 2, e.getUuid();

                              case 2:
                                e.sessionId = e.generateSessionId(), e.startSession(), e.bindMutationWatcher(), 
                                e.bindUnloadEvent(), e.setupInactivityTimer();

                              case 7:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))();
                }
                getUuid() {
                    var e = this;
                    return (0, n.A)(s().mark((function t() {
                        return s().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return t.abrupt("return", new Promise((e => o.A.storage.get({
                                    uuid: null
                                }, (t => e(t.uuid))))).then((t => {
                                    t || (t = e.generateUserId(), o.A.storage.set({
                                        uuid: t
                                    })), e.uuid = t;
                                })));

                              case 1:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))();
                }
                startSession() {
                    this.sessionActive || (this.sessionActive = !0, this.sessionStartTime = Date.now(), 
                    this.sendMetrics("insta_session_start", "session"));
                }
                endSession() {
                    if (this.sessionActive) {
                        this.sessionActive = !1;
                        var e = Math.round((Date.now() - this.sessionStartTime) / 1e3);
                        this.sendMetrics("insta_session_end", "session", {
                            total_session_duration: e,
                            total_session_duration_metric: e
                        });
                    }
                }
                setLocation(e) {
                    this.location !== e && (this.location && this.endLocation(), this.location = e, 
                    this.locationStartTime = Date.now(), this.sendMetrics("location_start", "navigation", {
                        location: this.location
                    }));
                }
                endLocation() {
                    if (this.location) {
                        var e = Math.round((Date.now() - this.locationStartTime) / 1e3);
                        this.sendMetrics("location_end", "navigation", {
                            location: this.location,
                            duration: e,
                            duration_metric: e
                        }), this.location = null;
                    }
                }
                sendMetrics(e, t) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a = function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var r = null != arguments[t] ? arguments[t] : {};
                            t % 2 ? _(Object(r), !0).forEach((function(t) {
                                (0, A.A)(e, t, r[t]);
                            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _(Object(r)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                            }));
                        }
                        return e;
                    }({
                        action: "track",
                        v: 1,
                        t: "event",
                        tid: "G-NSBD0T1C43",
                        cid: this.uuid,
                        ec: t,
                        ea: e,
                        cd1: this.userId,
                        cd2: this.sessionId
                    }, r);
                    "insta_session_end" === e && o.A.sendMessage(a);
                }
                trackEvent(e) {
                    var t = {
                        like: "like",
                        comment_liked: "comment_liked",
                        comment_created: "comment_created",
                        share: "share",
                        scroll: "scroll",
                        click: "click",
                        active_message_start: "active_message_start",
                        active_message_end: "active_message_end"
                    }[e];
                    t && this.sendMetrics(t, "interaction");
                }
                bindMutationWatcher() {
                    this.observer = new h.A({
                        queries: this.events.map((e => "window" === e.selector && "scroll" === e.action ? (window.addEventListener(e.eventName, (() => {
                            this.trackEvent(e.action);
                        })), null) : "location_start" === e.action ? {
                            is: "added",
                            css: e.selector,
                            callback: t => t.added.forEach((t => {
                                t.dataset.sfSkip || (this.setLocation(e.location), t.dataset.sfSkip = 1);
                            }))
                        } : {
                            is: "added",
                            css: e.selector,
                            callback: t => t.added.forEach((t => {
                                if (!t.dataset.sfSkip) {
                                    var r = e.eventName ? e.eventName : "click";
                                    t.addEventListener(r, (() => {
                                        this.trackEvent(e.action), "like" === e.action && (this.likesCount = (this.likesCount || 0) + 1), 
                                        "comment_liked" === e.action && (this.likedCommentsCount = (this.likedCommentsCount || 0) + 1), 
                                        "comment_created" === e.action && (this.commentsCreatedCount = (this.commentsCreatedCount || 0) + 1), 
                                        "share" === e.action && (this.sharedCount = (this.sharedCount || 0) + 1);
                                    })), t.dataset.sfSkip = 1;
                                }
                            }))
                        }))
                    });
                }
                bindUnloadEvent() {
                    window.addEventListener("beforeunload", (() => {
                        this.endLocation(), this.endSession();
                    }));
                }
                setupInactivityTimer() {
                    var e, t = () => {
                        clearTimeout(e), e = setTimeout((() => this.endSession()), 3e4);
                    };
                    [ "scroll", "click" ].forEach((e => {
                        window.addEventListener(e, t);
                    })), t();
                }
            }
            function N(e, t) {
                var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (!r) {
                    if (Array.isArray(e) || (r = function(e, t) {
                        if (!e) return;
                        if ("string" == typeof e) return L(e, t);
                        var r = Object.prototype.toString.call(e).slice(8, -1);
                        "Object" === r && e.constructor && (r = e.constructor.name);
                        if ("Map" === r || "Set" === r) return Array.from(e);
                        if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return L(e, t);
                    }(e)) || t && e && "number" == typeof e.length) {
                        r && (e = r);
                        var a = 0, n = function() {};
                        return {
                            s: n,
                            n: function() {
                                return a >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[a++]
                                };
                            },
                            e: function(e) {
                                throw e;
                            },
                            f: n
                        };
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                var i, s = !0, o = !1;
                return {
                    s: function() {
                        r = r.call(e);
                    },
                    n: function() {
                        var e = r.next();
                        return s = e.done, e;
                    },
                    e: function(e) {
                        o = !0, i = e;
                    },
                    f: function() {
                        try {
                            s || null == r.return || r.return();
                        } finally {
                            if (o) throw i;
                        }
                    }
                };
            }
            function L(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, a = new Array(t); r < t; r++) a[r] = e[r];
                return a;
            }
            v.A.isSingle() && (0, y.Ys)("instagram", (function(e, t) {
                new E([ {
                    selector: "section.x6s0dn4 > div.x78zum5 > span.xp7jhwk > div.x1ypdohk > div.x1i10hfl",
                    action: "like"
                }, {
                    selector: "div._a9zm > span._a9zu > div.x1ypdohk > div.x1i10hfl",
                    action: "comment_liked"
                }, {
                    selector: "section.x6s0dn4 > div.x78zum5 >  div.x1i10hfl",
                    action: "share"
                }, {
                    selector: "body",
                    action: "click"
                }, {
                    selector: "div.x6s0dn4  > div.x1i64zmx > div.x1i10hfl",
                    action: "comment_created"
                }, {
                    selector: "div.x1qjc9v5 > div.x6s0dn4  > div.x1i10hfl",
                    action: "active_message_end"
                }, {
                    selector: '.xzsf02u[contenteditable="true"]',
                    action: "active_message_start",
                    eventName: "input"
                }, {
                    selector: "window",
                    action: "scroll",
                    eventName: "blur"
                }, {
                    selector: 'span[aria-describedby=":r6d:"] > div.x1n2onr6 > div.x1i10hfl  > div.x9f619 ',
                    action: "location_start",
                    location: "Reels"
                }, {
                    selector: 'span[aria-describedby=":r82:"] > div.x1n2onr6 > div.x1i10hfl  > div.x9f619 ',
                    action: "location_start",
                    location: "Explore"
                }, {
                    selector: 'span[aria-describedby=":ra3:"] > div.x1n2onr6 > div.x1i10hfl  > div.x9f619 ',
                    action: "location_start",
                    location: "Direct"
                }, {
                    selector: 'span[aria-describedby=":rbk:"] > div.x1n2onr6 > div.x1i10hfl  > div.x9f619 ',
                    action: "location_start",
                    location: "Notifications"
                }, {
                    selector: 'span[aria-describedby=":rat:"] > div.x1n2onr6 > div.x1i10hfl  > div.x9f619 ',
                    action: "location_start",
                    location: "Search"
                } ], "instagram").start();
                var r = (0, m.A)(t), i = t.preferences, l = i.moduleInstagram ? 1 : 0, v = t.preferences.selectorsConfig, y = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
                o.A.onMessage.addListener((function(t, r, a) {
                    if ("getModuleInfo" === t.action) {
                        if (t.url !== location.href) return;
                        return a({
                            state: l,
                            moduleName: e
                        });
                    }
                    if ("changeState" === t.action) {
                        if (e !== t.moduleName) return;
                        return C.changeState(t.state);
                    }
                    if ("updatePreferences" !== t.action) {
                        if (l) return "updateLinks" === t.action ? C.updateLinks() : void 0;
                    } else Object.assign(i, t.preferences);
                })), l && setTimeout((function() {
                    C.run();
                })), document.addEventListener("mutationwatcher:hrefchange", (() => {
                    l && location.href.includes("reels") && C.updateLinks();
                }));
                var A, C = {
                    dlBtnClassName: "savefrom-helper--btn",
                    styleEl: null,
                    run: function() {
                        l = 1, this.insertStyle(), h.A.isAvailable() && this.mutationMode.enable();
                    },
                    rmStyle: function() {
                        this.styleEl && this.styleEl.parentNode && this.styleEl.parentNode.removeChild(this.styleEl);
                    },
                    insertStyle: function() {
                        this.styleEl ? this.styleEl.parentNode || document.head.appendChild(this.styleEl) : (this.styleEl = d.A.create("style", {
                            text: (0, f.A)([ {
                                selector: "." + this.dlBtnClassName,
                                style: {
                                    display: "none",
                                    border: "1px solid #F8F8F8",
                                    top: "8px",
                                    right: "8px",
                                    padding: 0,
                                    position: "absolute",
                                    backgroundColor: "#F8F8F8",
                                    cursor: "pointer",
                                    lineHeight: 0
                                }
                            }, {
                                selector: "." + this.dlBtnClassName + " svg",
                                style: {
                                    margin: "2px"
                                }
                            }, {
                                selector: "." + this.dlBtnClassName + " svg path",
                                style: {
                                    fill: "#777777"
                                }
                            }, {
                                selector: ".Embed ." + this.dlBtnClassName,
                                style: {
                                    border: "1px solid #B5B5B5",
                                    borderRadius: "4px",
                                    padding: "3px"
                                }
                            }, {
                                selector: "." + this.dlBtnClassName + ":hover svg path",
                                style: {
                                    fill: "#3f729b"
                                }
                            }, {
                                selector: "." + this.dlBtnClassName + ":active",
                                style: {
                                    outline: 0,
                                    boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                                }
                            }, {
                                selector: [ "*:hover > ." + this.dlBtnClassName, "*.sf-touch-show > ." + this.dlBtnClassName ],
                                style: {
                                    display: "block"
                                }
                            }, {
                                selector: "*.sf-touch-hide > ." + this.dlBtnClassName,
                                style: {
                                    display: "none"
                                }
                            } ])
                        }), document.head.appendChild(this.styleEl));
                    },
                    updateLinks: function() {
                        this.changeState(0), this.changeState(1);
                    },
                    changeState: function(e) {
                        l = e, this.rmDlBtn(), this.rmStyle(), this.mutationMode.stop(), e && this.run();
                    },
                    rmDlBtn: function() {
                        for (var e, t = document.querySelectorAll("." + this.dlBtnClassName), r = 0; e = t[r]; r++) e.parentNode.removeChild(e);
                    },
                    getDbBtnEl: function(e) {
                        (0, k.A)({
                            category: "append",
                            subcategory: "in",
                            event: "b"
                        });
                        var t = d.A.create("a", {
                            class: [ this.dlBtnClassName ],
                            href: e.url,
                            download: e.filename,
                            title: o.A.i18n.getMessage("download"),
                            style: {
                                position: "absolute",
                                zIndex: 100
                            },
                            on: [ [ "click", _ ], [ "mouseover", e => {
                                if (y) {
                                    if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, S.D)(t, {
                                        content: o.A.i18n.getMessage("downloadTitle"),
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    }, {
                                        el: {
                                            className: "mp4",
                                            download: "mp4"
                                        }
                                    });
                                    (0, S.w)(t, {
                                        content: o.A.i18n.getMessage("downloadTitle"),
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                }
                            } ] ],
                            append: [ r.svg.getSvg("download", null, 16, 16) ]
                        });
                        return t;
                    },
                    showOnTouch: function(e, t) {
                        if (!(e.dataset.sfTouch > 0)) {
                            var r = !1, a = null, n = function() {
                                r && (clearTimeout(a), a = setTimeout((function() {
                                    r && (r = !1, e.classList.remove("sf-touch-show"), e.classList.add("sf-touch-hide"));
                                }), 3e3));
                            };
                            d.A.create(e, {
                                data: {
                                    sfTouch: "1"
                                },
                                on: [ [ "touchstart", function(t) {
                                    r || (r = !0, e.classList.remove("sf-touch-hide"), e.classList.add("sf-touch-show"));
                                } ], [ "touchend", function(e) {
                                    n();
                                } ] ]
                            });
                        }
                    },
                    addDlBtn: (A = (0, n.A)(s().mark((function e(t, r, i, o, l) {
                        var f, v, h, m, p, y, g, b, k, S, A, _, E, N, L, B, q, M, j, O, D, T, I, P, z, F, U, R, H, V;
                        return s().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (!i.querySelector(".sf--story-container")) {
                                    e.next = 2;
                                    break;
                                }
                                return e.abrupt("return");

                              case 2:
                                if (f = "embed" === r, v = t, h = null, m = null, p = 0, o && (p = -1 === (p = Array.from(o.children).findIndex((e => e.classList.contains("_acnf")))) ? 0 : p), 
                                t.classList.add("sf-root-media-container"), t.style.position = "relative", !(m = t.querySelector("div > div > video"))) {
                                    e.next = 24;
                                    break;
                                }
                                return h = null, (b = null === (y = m) || void 0 === y ? void 0 : y.closest("article")) || (b = null === (k = m) || void 0 === k ? void 0 : k.closest("section.x78zum5.xdt5ytf.x1iyjqo2.xg6iff7")), 
                                e.next = 17, w.P.createLinkExtractor("ig-post-video").extractLinks({
                                    element: m,
                                    type: r,
                                    index: p,
                                    signal: l
                                });

                              case 17:
                                S = e.sent, A = (0, a.A)(S, 1), _ = A[0], h = _, E = this.getDbBtnEl(h), (N = null === (g = b) || void 0 === g ? void 0 : g.querySelectorAll("a.savefrom-helper--btn")) && N.length > 0 ? N.forEach((e => {
                                    e.parentNode.firstChild.querySelector("img") || (e.href = h.url, e.download = h.filename);
                                })) : b && b.querySelector("div.sf-root-media-container").appendChild(E);

                              case 24:
                                if (h) {
                                    e.next = 55;
                                    break;
                                }
                                if (!f) {
                                    e.next = 36;
                                    break;
                                }
                                if (!(L = v.querySelector(".EmbedFrame img.EmbeddedMediaImage"))) {
                                    e.next = 34;
                                    break;
                                }
                                return e.next = 30, w.P.createLinkExtractor("ig-post-photo").extractLinks({
                                    element: L
                                });

                              case 30:
                                B = e.sent, q = (0, a.A)(B, 1), M = q[0], h = M;

                              case 34:
                                e.next = 55;
                                break;

                              case 36:
                                if (!(L = v.querySelector("div > img[src][srcset]"))) {
                                    e.next = 46;
                                    break;
                                }
                                return e.next = 40, w.P.createLinkExtractor("ig-post-photo").extractLinks({
                                    element: L
                                });

                              case 40:
                                j = e.sent, O = (0, a.A)(j, 1), D = O[0], h = D, e.next = 55;
                                break;

                              case 46:
                                if (!(L = v.querySelector("div > img"))) {
                                    e.next = 54;
                                    break;
                                }
                                return e.next = 50, w.P.createLinkExtractor("ig-post-photo").extractLinks({
                                    element: L
                                });

                              case 50:
                                T = e.sent, I = (0, a.A)(T, 1), P = I[0], h = P;

                              case 54:
                                !L || "hidden" !== L.style.visibility && L.src || (z = new x.A({
                                    target: L,
                                    attrs: [ {
                                        name: "src",
                                        callback: e => {
                                            e.value && z.stop();
                                        }
                                    } ]
                                }));

                              case 55:
                                if (h) {
                                    e.next = 57;
                                    break;
                                }
                                return e.abrupt("return");

                              case 57:
                                F = this.getDbBtnEl(h), U = "", R = null, L ? (U = "image", R = L) : (U = "video", 
                                R = m), H = new x.A({
                                    target: R,
                                    attrs: [ {
                                        name: "src",
                                        callback: function() {
                                            var e = (0, n.A)(s().mark((function e(t) {
                                                var r, n, i;
                                                return s().wrap((function(e) {
                                                    for (;;) switch (e.prev = e.next) {
                                                      case 0:
                                                        if (t.value === h.url) {
                                                            e.next = 10;
                                                            break;
                                                        }
                                                        if (h = null, "image" !== U) {
                                                            e.next = 9;
                                                            break;
                                                        }
                                                        return e.next = 5, w.P.createLinkExtractor("ig-post-photo").extractLinks({
                                                            element: R
                                                        });

                                                      case 5:
                                                        r = e.sent, n = (0, a.A)(r, 1), i = n[0], h = i;

                                                      case 9:
                                                        h && F.parentNode ? (F.href = h.url, F.download = h.filename) : H.stop();

                                                      case 10:
                                                      case "end":
                                                        return e.stop();
                                                    }
                                                }), e);
                                            })));
                                            return function(t) {
                                                return e.apply(this, arguments);
                                            };
                                        }()
                                    } ]
                                }), u.A.onRemoveEvent(R, (function() {
                                    (0, c.A)(document.body, i) && (i.dataset.sfSkip = 0, C.mutationMode.observer.trigger(i));
                                })), f && (V = document.querySelector(".Header")) && (v = V, d.A.create(F, {
                                    style: {
                                        position: "relative",
                                        zIndex: 100,
                                        display: "block",
                                        left: "auto",
                                        top: "auto",
                                        marginLeft: "10px"
                                    }
                                })), v.appendChild(F), this.showOnTouch(v, F);

                              case 66:
                              case "end":
                                return e.stop();
                            }
                        }), e, this);
                    }))), function(e, t, r, a, n) {
                        return A.apply(this, arguments);
                    }),
                    addBtnVideoStory(e) {
                        if (e) {
                            var t = e.closest("section").querySelector("div.x5yr21d.x1n2onr6.xh8yej3:has(video)");
                            if (t) {
                                var r = t.querySelectorAll(".savefrom-helper--btn");
                                r && r.length && r.length > 0 && r.forEach((e => e.remove()));
                                var i = t.querySelector("div.x1ned7t2.x78zum5");
                                i && (activeBar = Array.from(i.children).findIndex((e => "DIV" === e.tagName && "" !== e.innerHTML.trim()))), 
                                setTimeout((0, n.A)(s().mark((function e() {
                                    var r, n, i, o, d, l, c;
                                    return s().wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            return e.next = 2, w.P.createLinkExtractor("ig-story-video").extractLinks({
                                                elementIndex: activeBar
                                            });

                                          case 2:
                                            r = e.sent, n = (0, a.A)(r, 1), i = n[0], o = i.url, d = i.filename, (l = C.createStoryButton(o, d)).addEventListener("click", _), 
                                            (c = C.createStoryContainerForVideo(t)).appendChild(l), t.appendChild(c), t.addEventListener("mouseover", (() => {
                                                l.style.display = "block";
                                            })), t.addEventListener("mouseleave", (() => {
                                                l.style.display = "none";
                                            }));

                                          case 14:
                                          case "end":
                                            return e.stop();
                                        }
                                    }), e);
                                }))), 100);
                            }
                        }
                    },
                    addBtnImage(e, t) {
                        if (t) {
                            var r = C.createImgStoryContainer(t);
                            setTimeout((0, n.A)(s().mark((function n() {
                                var i, o, d, l, c, u;
                                return s().wrap((function(n) {
                                    for (;;) switch (n.prev = n.next) {
                                      case 0:
                                        return n.next = 2, w.P.createLinkExtractor("ig-story-photo").extractLinks({
                                            element: e
                                        });

                                      case 2:
                                        i = n.sent, o = (0, a.A)(i, 1), d = o[0], l = d.url, c = d.filename, (u = C.createStoryButton(l, c)).addEventListener("click", _), 
                                        r.appendChild(u), t.appendChild(r), t.addEventListener("mouseover", (() => {
                                            u.style.display = "block";
                                        })), t.addEventListener("mouseleave", (() => {
                                            u.style.display = "none";
                                        }));

                                      case 13:
                                      case "end":
                                        return n.stop();
                                    }
                                }), n);
                            }))), 100);
                        }
                    },
                    addBtnImageStory(e) {
                        var t = document.querySelector("section > div > header, a > img");
                        if (t) {
                            "img" === t.tagName.toLowerCase() && (t = t.parentNode.parentNode.parentNode.parentNode);
                            var r = C.createStoryContainer(t);
                            setTimeout((0, n.A)(s().mark((function t() {
                                var n, i, o, d, l, c;
                                return s().wrap((function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                      case 0:
                                        return t.next = 2, w.P.createLinkExtractor("ig-story-photo").extractLinks({
                                            element: e
                                        });

                                      case 2:
                                        n = t.sent, i = (0, a.A)(n, 1), o = i[0], d = o.url, l = o.filename, (c = C.createStoryButton(d, l)).addEventListener("click", _), 
                                        r.appendChild(c);

                                      case 10:
                                      case "end":
                                        return t.stop();
                                    }
                                }), t);
                            }))), 100);
                        }
                    },
                    createStoryContainerForVideo(e) {
                        if (e) {
                            var t = e.querySelector(".sf--story-container");
                            return t && t instanceof Node && t.remove(), d.A.create("div", {
                                className: "sf--story-container",
                                style: {
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    padding: "10px",
                                    position: "absolute",
                                    top: 0,
                                    right: 0
                                }
                            });
                        }
                    },
                    createImgStoryContainer(e) {
                        if (e) {
                            var t = e.querySelector(".sf--story-container");
                            return t || d.A.create("div", {
                                className: "sf--story-container",
                                style: {
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    padding: "10px",
                                    position: "absolute",
                                    top: 0,
                                    right: 0
                                }
                            });
                        }
                    },
                    createStoryContainer(e) {
                        if (e) {
                            var t = document.querySelector(".sf--story-container");
                            t && t.remove();
                            var r = d.A.create("div", {
                                className: "sf--story-container"
                            }), a = document.querySelector("header > div:nth-child(2) > div:nth-child(2)");
                            if (!a) return e.appendChild(r), r;
                            var n = a.querySelector("button");
                            return n ? a.insertBefore(r, n) : e.appendChild(r), r;
                        }
                    },
                    createStoryButton(e, t) {
                        (0, k.A)({
                            category: "append",
                            subcategory: "in",
                            event: "b"
                        });
                        var a = d.A.create("a", {
                            className: "sf--story-btn",
                            append: [ r.svg.getSvg("download", "white", 15, 15) ],
                            download: t,
                            href: e,
                            style: {
                                display: "none",
                                cursor: "pointer",
                                marginRight: "2px",
                                marginTop: "2px"
                            },
                            on: [ "mouseover", e => {
                                if (y) {
                                    if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, S.D)(a, {
                                        content: o.A.i18n.getMessage("downloadTitle"),
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    }, {
                                        el: {
                                            className: "story"
                                        }
                                    });
                                    (0, S.w)(a, {
                                        content: o.A.i18n.getMessage("downloadTitle"),
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                }
                            } ]
                        });
                        return a;
                    },
                    mutationMode: {
                        observer: null,
                        stop: function() {
                            this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                                for (var t, r = (0, p.A)(e), a = document.querySelectorAll("[" + r + "]"), n = 0; t = a[n]; n++) t.removeAttribute(r);
                            }));
                        },
                        enable: function() {
                            if (this.observer) return this.observer.start();
                            var e = e => [ "x1lliihq", "x1qjc9v5" ].some((t => e.classList.contains(t)));
                            this.observer = new h.A({
                                queries: [ {
                                    css: v.instagram.story,
                                    is: "added",
                                    callback(e) {
                                        var t = e.added, r = () => {
                                            document.querySelectorAll(".sf--story-btn").forEach((e => e.remove()));
                                        }, a = () => {
                                            document.querySelectorAll(".sf--story-container").forEach((e => e.remove()));
                                        };
                                        t.forEach((e => {
                                            var t = e.closest("div video.x1lliihq.x5yr21d.xh8yej3"), n = e.querySelector("div video"), i = e.closest("div:has(div.x6s0dn4.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x78zum5.xdt5ytf.x5yr21d.xl56j7k.x6ikm8r.x10wlt62.x1n2onr6.xh8yej3)"), s = "";
                                            i && (s = i.querySelector("img.xl1xv1r.x5yr21d.xmz0i5r.x193iq5w.xh8yej3"));
                                            var o = e.querySelector("div > img");
                                            if (n) return r(), void C.addBtnVideoStory(n);
                                            if (s) {
                                                r(), a();
                                                var d = e.closest("div:has(img)");
                                                if (d.querySelector(".savefrom-helper--btn")) return;
                                                if (!d) return;
                                                C.addBtnImage(s, d);
                                            } else {
                                                if (o) return r(), a(), void C.addBtnImageStory(o);
                                                if (t) return r(), void C.addBtnVideoStory(t);
                                            }
                                        }));
                                    }
                                }, {
                                    css: v.instagram.story2,
                                    is: "added",
                                    callback: t => {
                                        for (var r, a = 0; r = t.added[a]; a++) r.dataset.sfSkip > 0 || e(r) || (r.dataset.sfSkip = "1", 
                                        C.addDlBtn(r.parentNode, "story2", r));
                                    }
                                }, {
                                    css: v.instagram.strangeVideo,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = 0; t = e.added[r]; r++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        C.addDlBtn(t.parentNode, "strangeVideo", t));
                                    }
                                }, {
                                    css: v.instagram.story3,
                                    is: "added",
                                    callback: t => {
                                        for (var r, a = 0; r = t.added[a]; a++) r.dataset.sfSkip > 0 || r.querySelector("ul > li") || e(r) || (r.dataset.sfSkip = "1", 
                                        C.addDlBtn(r.parentNode, "story3", r));
                                    }
                                }, {
                                    css: v.instagram.reelsModal,
                                    is: "added",
                                    callback: t => {
                                        var r = document.querySelector("article._aatb._aate._aatg._aath._aati").querySelector("div.x6s0dn4.x1oozmrk.x4r51d9.xi8xln7.xl56j7k.x47corl.x10l6tqk._acvz._acnc._acng");
                                        if (r) {
                                            var a, n = new Set, i = (new AbortController).signal;
                                            new MutationObserver((e => {
                                                clearTimeout(a), a = setTimeout((() => {
                                                    var a, s = N(e);
                                                    try {
                                                        var o = function() {
                                                            var e = a.value;
                                                            "attributes" === e.type && "class" === e.attributeName && e.target.classList.contains("_acnf") && !n.has(e.target) && (n.add(e.target), 
                                                            C.addDlBtn(t.added[0], "reelsModal", e.target, r, i), setTimeout((() => {
                                                                n.delete(e.target);
                                                            }), 0));
                                                        };
                                                        for (s.s(); !(a = s.n()).done; ) o();
                                                    } catch (e) {
                                                        s.e(e);
                                                    } finally {
                                                        s.f();
                                                    }
                                                }), 50);
                                            })).observe(r, {
                                                childList: !0,
                                                subtree: !0,
                                                attributes: !0,
                                                attributeFilter: [ "class" ]
                                            });
                                        }
                                        for (var s, o = 0; s = t.added[o]; o++) s.dataset.sfSkip > 0 || s.querySelector("ul > li") || e(s) || (s.dataset.sfSkip = "1", 
                                        C.addDlBtn(s.parentNode, "reelsModal", s, r, null));
                                    }
                                }, {
                                    css: v.instagram.reelsModal735,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = 0; t = e.added[r]; r++) t.dataset.sfSkip > 0 || t.querySelector("ul > li") || (t.dataset.sfSkip = "1", 
                                        C.addDlBtn(t.parentNode, "reelsModal735", t));
                                    }
                                }, {
                                    css: v.instagram.videoPostsAndReelNoCarousel,
                                    is: "added",
                                    callback: t => {
                                        var r = document.querySelector("div.x9f619.x1n2onr6.x1ja2u2z").querySelector("div.x6s0dn4.x1oozmrk.x4r51d9.xi8xln7.xl56j7k.x47corl.x10l6tqk._acvz._acnc._acng");
                                        if (r) {
                                            var a, n = new Set, i = (new AbortController).signal;
                                            new MutationObserver((e => {
                                                clearTimeout(a), a = setTimeout((() => {
                                                    var a, s = N(e);
                                                    try {
                                                        var o = function() {
                                                            var e = a.value;
                                                            "attributes" === e.type && "class" === e.attributeName && e.target.classList.contains("_acnf") && !n.has(e.target) && (n.add(e.target), 
                                                            C.addDlBtn(t.added[0], "reelsModal", e.target, r, i), setTimeout((() => {
                                                                n.delete(e.target);
                                                            }), 0));
                                                        };
                                                        for (s.s(); !(a = s.n()).done; ) o();
                                                    } catch (e) {
                                                        s.e(e);
                                                    } finally {
                                                        s.f();
                                                    }
                                                }), 50);
                                            })).observe(r, {
                                                childList: !0,
                                                subtree: !0,
                                                attributes: !0,
                                                attributeFilter: [ "class" ]
                                            });
                                        }
                                        for (var s, o = 0; s = t.added[o]; o++) "1" === s.dataset.sfSkip || e(s) || (s.dataset.sfSkip = "1", 
                                        C.addDlBtn(s.parentNode, "reelsModal", s, r, null));
                                    }
                                }, {
                                    css: v.instagram.videoPostsCarouselCatalog,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = e.added, a = 0; t = r[a]; a++) "1" !== t.dataset.sfSkip && (t.dataset.sfSkip = "1", 
                                        C.addDlBtn(t.parentNode, "videoPostsCarouselCatalog", t));
                                    }
                                }, {
                                    css: v.instagram.summary,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = 0; t = e.added[r]; r++) t.dataset.sfSkip > 0 || t.querySelector("ul > li") || (t.dataset.sfSkip = "1", 
                                        C.addDlBtn(t.parentNode, "summary", t));
                                    }
                                }, {
                                    css: v.instagram.embed,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = 0; t = e.added[r]; r++) if (!(t.dataset.sfSkip > 0)) {
                                            t.dataset.sfSkip = "1";
                                            var a = (0, g.A)(t, ".Embed");
                                            a && (a.dataset.sfSkip = "1", C.addDlBtn(a, "embed", a));
                                        }
                                    }
                                }, {
                                    css: v.instagram.embed2,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = 0; t = e.added[r]; r++) if (!(t.dataset.sfSkip > 0)) {
                                            t.dataset.sfSkip = "1";
                                            var a = (0, g.A)(t, ".Embed");
                                            if (a && a.dataset.sfSkip > 0) {
                                                var n = document.querySelector(".Header");
                                                n && L(n);
                                            }
                                            C.addDlBtn(t.parentNode, "embed2", t);
                                        }
                                    }
                                }, {
                                    css: v.instagram.embed3,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = 0; t = e.added[r]; r++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                        C.addDlBtn(t, "embed", t));
                                    }
                                }, {
                                    css: `.${u.A.onRemoveClassName}`,
                                    is: "removed",
                                    callback: e => {
                                        for (var t, r = 0; t = e.removed[r]; r++) u.A.onRemoveListener(t);
                                    }
                                } ],
                                options: {
                                    subtree: !0,
                                    childList: !0,
                                    attributes: !0
                                }
                            });
                        }
                    }
                };
                function _(e) {
                    return e.stopPropagation(), o.A.isFirefox ? (e.preventDefault(), function(e, t, r) {
                        "sf--story-btn" === r ? (0, k.A)({
                            category: "download",
                            subcategory: "in",
                            event: "story"
                        }) : t.includes("mp4") ? (0, k.A)({
                            category: "download",
                            subcategory: "in",
                            event: "video"
                        }) : (0, k.A)({
                            category: "download",
                            subcategory: "in",
                            event: "photo"
                        });
                        var a = "ffInstagramDownloadMedia";
                        return (0, b.A)({
                            action: a,
                            downloadFileUrl: e,
                            filename: t
                        });
                    }(this.href, this.download)) : r.downloadOnClick(e, void 0, {
                        el: this
                    });
                }
                function L(e) {
                    for (var t, r = e.querySelectorAll("." + C.dlBtnClassName), a = 0; t = r[a]; a++) t.classList.remove(u.A.onRemoveClassName), 
                    t.parentNode.removeChild(t);
                }
            }), (function() {
                return !(0, l.A)() || !!/\/\/[^\/]+\.[^\/]+\/p\//.test(location.href);
            }));
        }
    }, r = {};
    function a(e) {
        var n = r[e];
        if (void 0 !== n) return n.exports;
        var i = r[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, a), i.exports;
    }
    a.m = t, e = [], a.O = (t, r, n, i) => {
        if (!r) {
            var s = 1 / 0;
            for (c = 0; c < e.length; c++) {
                for (var [r, n, i] = e[c], o = !0, d = 0; d < r.length; d++) (!1 & i || s >= i) && Object.keys(a.O).every((e => a.O[e](r[d]))) ? r.splice(d--, 1) : (o = !1, 
                i < s && (s = i));
                if (o) {
                    e.splice(c--, 1);
                    var l = n();
                    void 0 !== l && (t = l);
                }
            }
            return t;
        }
        i = i || 0;
        for (var c = e.length; c > 0 && e[c - 1][2] > i; c--) e[c] = e[c - 1];
        e[c] = [ r, n, i ];
    }, a.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return a.d(t, {
            a: t
        }), t;
    }, a.d = (e, t) => {
        for (var r in t) a.o(t, r) && !a.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
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
    }, a.j = 83, (() => {
        a.b = document.baseURI || self.location.href;
        var e = {
            83: 0
        };
        a.O.j = t => 0 === e[t];
        var t = (t, r) => {
            var n, i, [s, o, d] = r, l = 0;
            if (s.some((t => 0 !== e[t]))) {
                for (n in o) a.o(o, n) && (a.m[n] = o[n]);
                if (d) var c = d(a);
            }
            for (t && t(r); l < s.length; l++) i = s[l], a.o(e, i) && e[i] && e[i][0](), e[i] = 0;
            return a.O(c);
        }, r = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        r.forEach(t.bind(null, 0)), r.push = t.bind(null, r.push.bind(r));
    })(), a.nc = void 0;
    var n = a.O(void 0, [ 223 ], (() => a(6340)));
    n = a.O(n);
})();