(() => {
    var e, t = {
        6230: (e, t, r) => {
            "use strict";
            var o = r(3453), n = r(467), a = r(4467), i = r(4756), s = r.n(i), l = r(9242), d = r(9620), c = r(9589), u = r(8278), f = r(717), p = r(8139), h = r(5563), v = r(3372), m = r(2525), g = r(8244), y = r(4733), b = r(188), k = r(6810), w = r(8233), x = r(9022), A = r(1460), S = r(1853), M = r(5299), E = r(3159), L = r.n(E), B = r(4627), F = r(6942), P = r.n(F), C = (0, 
            d.A)().svg.getSrc("download", "#84bd07");
            const D = M.Ay.memo((e => {
                var t = e.classes, r = void 0 === t ? [] : t, o = e.isIcon, n = void 0 === o || o, a = e.isText, i = void 0 === a || a, s = e.isCircle, d = void 0 !== s && s, c = e.onClick, u = (0, 
                B.A)(L());
                return M.Ay.createElement("div", {
                    className: P()(...r, u.container, d && u.circleContainer),
                    onClick: c
                }, n && M.Ay.createElement("img", {
                    src: C,
                    className: u.logo
                }), i && M.Ay.createElement("span", {
                    className: u.text
                }, l.A.i18n.getMessage("download")));
            }));
            var N = r(172), I = r(4689), q = r(453), O = r(6714);
            function V(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    t && (o = o.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    }))), r.push.apply(r, o);
                }
                return r;
            }
            function _(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? V(Object(r), !0).forEach((function(t) {
                        (0, a.A)(e, t, r[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : V(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                    }));
                }
                return e;
            }
            var j, T = r(2894), U = (0, w.A)("facebook_com"), H = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
            x.A.isSingle() && (0, c.Ys)("facebook", (function(e, t) {
                var r = (0, d.A)(t), a = t.preferences, i = a.moduleFacebook ? 1 : 0, c = t.preferences.selectorsConfig;
                l.A.onMessage.addListener((function(t, r, o) {
                    if ("getModuleInfo" === t.action) {
                        if (t.url !== location.href) return;
                        return o({
                            state: i,
                            moduleName: e
                        });
                    }
                    if ("changeState" === t.action) {
                        if (e !== t.moduleName) return;
                        return w.changeState(t.state);
                    }
                    "updatePreferences" !== t.action ? i && "updateLinks" === t.action && (w.changeState(0), 
                    w.changeState(1)) : Object.assign(a, t.preferences);
                })), i && setTimeout((function() {
                    w.run();
                }));
                var w = {
                    contextMenu: null,
                    className: "savefrom_fb_download",
                    isMutation: !1,
                    run: function() {
                        if (i = 1, B.addStyle(), L.injectStyle(), A.A.isAvailable()) return this.isMutation = !0, 
                        this.initEmbedDownloader(), void this.mutationMode.enable();
                    },
                    changeState: function(e) {
                        w.hideMenu(), i = e, x.disable(), L.rmCurrentPhotoBtn(), L.rmDataAttrs(), B.rmBtn(), 
                        E.rmBtn(), w.mutationMode.stop(), e && w.run();
                    },
                    initEmbedDownloader: function() {
                        r.addStyleRules("." + r.embedDownloader.linkClass + " img", {
                            opacity: ".5"
                        }), r.embedDownloader.init();
                    },
                    mutationMode: {
                        observer: null,
                        stop: function() {
                            this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                                for (var t, r = (0, p.A)(e), o = document.querySelectorAll("[" + r + "]"), n = 0; t = o[n]; n++) t.removeAttribute(r);
                            }));
                        },
                        wrapVideoGetLinks: function(e) {
                            switch (e.tagName) {
                              case "EMBED":
                                E.getLinksFromEmbed(e, (function(e) {
                                    E.appendLinks(e && e.links);
                                }));
                                break;

                              case "VIDEO":
                                E.getLinksFromVideo(e, (function(e) {
                                    E.appendLinks(e && e.links);
                                }));
                            }
                        },
                        wrapVideoFeedOnLinkHover: function() {
                            i && B.onLinkHover.apply(this);
                        },
                        wrapPhotoOnHover: function(e) {
                            i && L.addCurrentDlBtn(this);
                        },
                        wrapExternalMediaMouseEnter: function() {
                            if (i) {
                                var e = this;
                                e.dataset[x.linkDataAttr] ? clearTimeout(x.timer) : x.handle(e) ? (x.lastLink && x.lastLink !== e && x.removeBtn(x.lastLink), 
                                r.embedDownloader.hidePanel(), x.lastLink = e) : (g.A.off(this, "mouseenter", w.mutationMode.wrapExternalMediaMouseEnter), 
                                g.A.off(this, "mouseleave", w.mutationMode.wrapExternalMediaMouseLeave));
                            }
                        },
                        wrapExternalMediaMouseLeave: function() {
                            if (i) {
                                var e = this;
                                e.dataset[x.linkDataAttr] && (clearTimeout(x.timer), x.timer = setTimeout((function() {
                                    x.removeBtn(e);
                                }), 1500));
                            }
                        },
                        wrapExternalMedia: function(e) {
                            g.A.on(e, "mouseenter", w.mutationMode.wrapExternalMediaMouseEnter), g.A.on(e, "mouseleave", w.mutationMode.wrapExternalMediaMouseLeave);
                        },
                        enable: function() {
                            if (this.observer) return this.observer.start();
                            var e = (e, t) => {
                                if (!(window.location.href.includes("/watch?") && e.ariaLabel || (e.dataset.sfReady && window.location.href.includes("/watch?") && !e.dataset.waRep && e.removeAttribute("data-sf-ready"), 
                                e.dataset.sfReady))) return e.dataset.sfReady = "1", t(e);
                            };
                            this.observer = new A.A({
                                queries: [ {
                                    css: c.facebook.homePage,
                                    is: "added",
                                    callback: t => {
                                        var r = t.added, o = /\/watch/.test(location.href);
                                        r.forEach((t => e(t, (() => o ? B.addButtonForWatchPage(t) : t.closest('[role="article"]') ? B.addButtonForFeedPage(t) : void 0))));
                                    }
                                }, {
                                    css: c.facebook.watchPage,
                                    is: "added",
                                    callback: t => {
                                        t.added.forEach((t => e(t, (() => {
                                            B.addHoverButtonForArticleVideo(t);
                                        }))));
                                    }
                                }, {
                                    css: c.facebook.feedBtn,
                                    is: "added",
                                    callback: t => {
                                        t.added.forEach((t => e(t, (() => {
                                            if (!t.closest('a[aria-label*="Reels"]')) return L.addButtonForArticleImage(t);
                                        }))));
                                    }
                                }, {
                                    css: c.facebook.videoDetail,
                                    is: "added",
                                    callback: t => {
                                        t.added.forEach((t => e(t, (() => {
                                            B.addButtonForShowPageVideo(t);
                                        }))));
                                    }
                                }, {
                                    css: c.facebook.hoverReelVideo,
                                    is: "added",
                                    callback: t => {
                                        t.added.forEach((t => e(t, (() => B.addButtonForReelVideo(t)))));
                                    }
                                }, {
                                    css: c.facebook.hoverReelVideoDetail,
                                    is: "added",
                                    callback: t => {
                                        t.added.forEach((t => e(t, (() => {
                                            var e = M.createButton((() => {
                                                var r = E.getVideoIdFromLink(t.href);
                                                r && E.showDownloadMenuByVideoId(e, r);
                                            }), {
                                                preset: "hover"
                                            });
                                            t.appendChild(e);
                                        }))));
                                    }
                                }, {
                                    css: c.facebook.imagesDetail,
                                    is: "added",
                                    callback: t => {
                                        t.added.forEach((t => e(t, (() => {
                                            L.addButtonForShowPageImage(t);
                                        }))));
                                    }
                                }, {
                                    css: c.facebook.videoSummary,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = 0; t = e.added[r]; r++) {
                                            var o = !1;
                                            (0, v.A)(t, `#fbxPhotoContentContainer .videoStage ${t.tagName}`) && (o = !0), o ? this.wrapVideoGetLinks(t) : g.A.one(t, "mouseenter", this.wrapVideoFeedOnLinkHover);
                                        }
                                    }
                                }, {
                                    css: c.facebook.photoSummary,
                                    is: "added",
                                    callback: e => {
                                        for (var t, o = 0; t = e.added[o]; o++) if (w.hideMenu(), !(t.dataset.sfSkip > 0)) {
                                            t.dataset.sfSkip = "1";
                                            var n = r.getParentByClass(t, "stageWrapper");
                                            g.A.one(n, "mouseenter", this.wrapPhotoOnHover);
                                        }
                                    }
                                }, {
                                    css: c.facebook.externalMediaSummary,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = 0; t = e.added[r]; r++) t.sfSkip > 0 || (t.sfSkip = "1", this.wrapExternalMedia(t));
                                    }
                                }, {
                                    css: `.${g.A.onRemoveClassName}`,
                                    is: "removed",
                                    callback: e => {
                                        for (var t, r = 0; t = e.removed[r]; r++) g.A.onRemoveListener(t);
                                    }
                                } ]
                            });
                        }
                    },
                    hideMenu: function() {
                        w.contextMenu && (w.contextMenu.hide(), w.contextMenu = null);
                    }
                }, x = {
                    linkDataAttr: "savefromEd",
                    timer: 0,
                    lastLink: null,
                    re: [ /https?:\/\/(?:[a-z]+\.)?youtube\.com\/(?:#!?\/)?watch\?[^\s\"\'\<\>]*v=([\w\-]+)/i, /https?:\/\/(?:[a-z0-9]+\.)?youtube\.com\/(?:embed|v)\/([\w\-]+)/i, /https?:\/\/(?:[a-z]+\.)?youtu\.be\/([\w\-]+)/i, /https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/(\d+)(?:\?|$)/i ],
                    thumbnail: {
                        youtube: {
                            re: [ /ytimg\.com(?:\/|%2F)vi(?:\/|%2F)([\w\-]+)(?:\/|%2F)/i ],
                            url: "http://www.youtube.com/watch?v={vid}"
                        }
                    },
                    disable: function() {
                        var e = r.embedDownloader.panel;
                        e && (e.style.display = "none");
                    },
                    removeBtn: function(e) {
                        if (e && "object" == typeof e) {
                            var t = e.querySelector("." + w.className);
                            t && (t.parentNode.removeAttribute((0, p.A)(x.linkDataAttr)), t.parentNode.removeChild(t)), 
                            e.removeAttribute((0, p.A)(x.linkDataAttr)), e == this.lastLink && (this.lastLink = null);
                        }
                    },
                    checkUrl: function(e, t) {
                        if (!t && e.search(/https?:\/\/([\w\-]+\.)?facebook\.com\/l\.php/i) > -1) return this.checkUrl(decodeURIComponent(e), !0);
                        for (var r = 0, o = this.re.length; r < o; r++) {
                            var n = e.match(this.re[r]);
                            if (n && n.length > 0) return n[0];
                        }
                    },
                    handle: function(e) {
                        var t = e.querySelector("img");
                        if (t) {
                            var o = t.parentNode;
                            if (t.src && "relative" == r.getStyle(o, "position")) {
                                var n = e.getAttribute("ajaxify");
                                if (n && n.search(/\/flash\/expand_inline/i) > -1) {
                                    var a = this.getThumbnailUrl(t.src);
                                    if (a) return this.createButton(a, o, e, {
                                        display: "block",
                                        position: "absolute",
                                        bottom: "3px",
                                        right: "3px",
                                        zIndex: 9999,
                                        margin: 0,
                                        width: "16px",
                                        height: "16px"
                                    }, {
                                        display: "block"
                                    });
                                } else if (this.checkUrl(e.href)) return this.createButton(e.href, o, e, {
                                    display: "block",
                                    position: "absolute",
                                    bottom: "3px",
                                    right: "3px",
                                    zIndex: 9999,
                                    margin: 0,
                                    width: "16px",
                                    height: "16px"
                                }, {
                                    display: "block"
                                });
                            }
                            return !1;
                        }
                        return this.createButton(e.href, e, e);
                    },
                    getThumbnailUrl: function(e) {
                        for (var t in this.thumbnail) for (var o = 0; o < this.thumbnail[t].re.length; o++) {
                            var n = r.getMatchFirst(e, this.thumbnail[t].re[o]);
                            if (n) return this.thumbnail[t].url.replace(/\{vid\}/gi, n);
                        }
                        return "";
                    },
                    createButton: function(e, t, o, n, a) {
                        if (!(e = this.checkUrl(e))) return !1;
                        var i = document.createElement("a");
                        i.className = w.className, i.href = "http://savefrom.net/?url=" + encodeURIComponent(e), 
                        i.setAttribute(r.embedDownloader.dataAttr, e), i.title = l.A.i18n.getMessage("download"), 
                        r.setStyle(i, {
                            marginLeft: "7px",
                            verticalAlign: "middle"
                        }), n && r.setStyle(i, n);
                        var s = document.createElement("img");
                        return s.className = "icon", s.src = r.svg.getSrc("download", "#a2db16"), r.setStyle(s, {
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            verticalAlign: "middle",
                            cursor: "pointer"
                        }), a && r.setStyle(s, a), i.appendChild(s), o.dataset[this.linkDataAttr] = 1, t.appendChild(i), 
                        !0;
                    }
                }, M = {
                    createButton(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = {
                            default: {
                                props: {},
                                style: {}
                            },
                            circle: {
                                props: {
                                    isText: !1,
                                    isCircle: !0
                                },
                                style: {}
                            },
                            withoutText: {
                                props: {
                                    isText: !1
                                },
                                style: {}
                            },
                            hover: {
                                className: "sf-hover-container",
                                props: {
                                    isText: !1
                                },
                                style: {
                                    position: "absolute",
                                    top: "8px",
                                    left: "8px"
                                }
                            }
                        }, o = t && t.preset ? t.preset : "default", n = r[o] ? r[o] : r.default, a = n.props, i = n.style;
                        t && t.style && (i = Object.assign(i, t.style));
                        var s = y.A.create("div", {
                            class: n.className || "sf-download-container",
                            style: i
                        });
                        return (0, S.A)((0, N.n)(D, _(_({}, a), {}, {
                            onClick: t => {
                                t.preventDefault(), t.stopPropagation(), e(t);
                            }
                        })), s), s;
                    }
                }, E = {
                    getLinksFromEmbed: function(e, t) {
                        if (!e) return t(null);
                        var r = e.getAttribute("flashvars");
                        if (null === r) return t(null);
                        var o = (0, f.A)(r).params;
                        if (!o) return t(null);
                        var n = null;
                        try {
                            n = JSON.parse(o).video_data;
                        } catch (e) {}
                        if (!n) return t(null);
                        n.progressive && (n = n.progressive);
                        var a = {}, i = {
                            sd_src: "SD",
                            hd_src: "HD"
                        };
                        Array.isArray(n) || (n = [ n ]);
                        for (var s, l = 0; s = n[l]; l++) [ "sd_src", "hd_src" ].forEach((function(e) {
                            s[e] && (a[s[e]] = i[e]);
                        }));
                        return t({
                            links: a
                        });
                    },
                    getVideoIdFromLink(e) {
                        var t = -1 !== e.indexOf("&") ? e.indexOf("&") : e.length, r = e.match(/videos\/(\d+)/);
                        return r || (r = e.match(/pcb\.\w+\/(.*?)\?/)), !r && e.includes("/watch/?") ? r = e.substring(34, t) : !r && e.includes("/watch?") ? r = e.substring(33, 50) : (!r && e.includes("permalink&v=") && (r = e.match(/permalink&v=(\d+)/)), 
                        !r && e.includes("/reel/") && (r = e.match(/reel\/(\d+)/)), r && r[1]);
                    },
                    requestLocalVideoLinks: function(e) {
                        return new Promise((function(e, t) {
                            r.bridge({
                                func: 'function(cb){var err=null;var token=null;try{token=window.require("DTSGInitialData").token}catch(_err){err=_err.message}cb([err,token])}',
                                cb: function(r) {
                                    var o = null, n = null;
                                    !r || r[0] ? o = new Error("Get token timeout") : n = r[1], o ? t(o) : e(n);
                                }
                            });
                        })).then((function(t) {
                            var r = `https://www.facebook.com/video/tahoe/async/${e}/?${T.stringify({
                                payloadtype: "primary"
                            })}`, o = T.stringify({
                                __a: 1,
                                fb_dtsg: t
                            });
                            return (0, b.A)([ r, o ], 'function(url,data){return fetch(url,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:data}).then(function(response){return response.text()})}');
                        })).then((function(t) {
                            return new Promise((function(r, o) {
                                l.A.sendMessage({
                                    action: "getFacebookLinksFromData",
                                    extVideoId: e,
                                    data: t
                                }, (function(e) {
                                    e && e.links ? r(e) : o(new Error("Get links from data error"));
                                }));
                            }));
                        })).catch((function(e) {
                            throw U.error("get local links error", e), (0, I.A)({
                                category: "mistake",
                                subcategory: "fa",
                                event: "l"
                            }), e;
                        }));
                    },
                    requestBgVideoLinks: function(e) {
                        return new Promise((function(t, r) {
                            l.A.sendMessage({
                                action: "getFacebookLinks",
                                extVideoId: e
                            }, (function(e) {
                                e && e.links ? t(e) : r(new Error("Get links error"));
                            }));
                        })).catch((function(e) {
                            throw U.error("get links error", e), e;
                        }));
                    },
                    requestVideoLinksById: function(e) {
                        return Promise.resolve().then((function() {
                            return E.requestLocalVideoLinks(e);
                        })).catch((function() {
                            return E.requestBgVideoLinks(e);
                        }));
                    },
                    requestVideoLinks: function(e, t) {
                        return E.requestVideoLinksById(e).then((function(e) {
                            t(e.links, e.title);
                        }), (function(e) {
                            t();
                        }));
                    },
                    getLinksFromVideo: function(e, t) {
                        if (!e) return t(null);
                        var o, n = {}, a = {}, i = null;
                        if (!i) {
                            var s = (0, m.A)(e, "div[data-ft]");
                            if (s && (0, v.A)(s, ".userContentWrapper[data-ft] " + s.tagName) && (s = (0, m.A)(s, ".userContentWrapper[data-ft]")), 
                            s && (Array.from(s.querySelectorAll("a[href]")).some((e => {
                                var t = /\/videos\/(\d+)/.exec(e.href);
                                if (t) return i = t[1], n.popup_1 = !0, !0;
                            })), !i)) {
                                var l = null;
                                try {
                                    l = JSON.parse(s.dataset.ft);
                                } catch (e) {}
                                if (l) {
                                    var d = l.mf_story_key, c = l.story_attachment_style;
                                    d && "video_inline" === c && (i = d, n.popup_1 = !0);
                                }
                            }
                        }
                        if (!i && (0, m.A)(e, "div._5-yb")) {
                            var f = /\/videos\/(\d+)/.exec(location.href);
                            if (f) return t({
                                links: {
                                    id: f[1]
                                },
                                popup_1: !0
                            });
                        }
                        if (!i) {
                            var p = (0, m.A)(e, ".uiStreamStory[data-story-id]"), h = /:(\d+)$/.exec(p && p.dataset.storyId);
                            (h = h && h[1]) && (i = h);
                        }
                        if (!i && (o = (0, u.A)(e, "fbUserContent"))) {
                            var g = o.querySelector("a[data-video-id]");
                            if (g) (w = g && g.dataset.videoId) && (i = w);
                        }
                        if (!i && (o = (0, m.A)(e, ".userContentWrapper"))) {
                            var y = o.querySelector('div[id^="feed_subtitle_"] a[data-video-channel-id]');
                            if (y) {
                                var b = /\/videos\/(\d+)/.exec(y.href);
                                (w = b && b[1]) && (i = w);
                            } else {
                                var k = o.querySelectorAll('a.profileLink, a[rel="theater"], #fbPhotoSnowliftTimestamp > a[href]'), w = null;
                                [].slice.call(k).some((function(e) {
                                    var t = /\/videos\/(\d+)/.exec(e.href);
                                    return w = t && t[1];
                                })), w && (i = w);
                            }
                        }
                        if (!i) {
                            var x = !1, A = !1, S = document.getElementById("stream_pagelet"), M = S && S.previousElementSibling;
                            if (M && M.contains(e) && (x = !0), !x) {
                                var L = document.querySelector(".uiStreamStory"), B = L && L.parentNode;
                                (B = B && B.parentNode) && B.contains(e) && (A = !0);
                            }
                            if (x || A) (w = E.getVideoIdFromUrl()) && (i = w);
                        }
                        if (!i && (0, m.A)(e, "#pagelet_group_permalink")) {
                            b = /video_id:"?([^,"]+)/.exec(document.body.innerHTML);
                            (w = b && b[1]) && (i = w);
                        }
                        if (i && (a.id = i), e.src && /^https?:/.test(e.src)) {
                            var F = r.getFileExtension(e.src, "mp4");
                            a[e.src] = F.toUpperCase();
                        }
                        var P = e.querySelectorAll("source");
                        if (P && P.length > 0) for (var C = 0; C < P.length; C++) {
                            F = r.getFileExtension(P[C].src, "mp4");
                            a[P[C].src] = F.toUpperCase();
                        }
                        return Object.keys(a).length ? (n.links = a, t(n)) : t(null);
                    },
                    getVideoIdFromUrl: function() {
                        var e = null;
                        return r.embedDownloader.hostings.facebook.re.some((function(t) {
                            var r = t.exec(location.href);
                            if (r) return e = r[1], !0;
                        })), e || (e = (e = document.location.href.match(/(\d+).$/)) && e[1] ? e[1] : null), 
                        e;
                    },
                    getFileName: function(e) {
                        var t = r.getFileName(e);
                        if (t) return t;
                        var o = r.dateToObj();
                        return "facebook_" + (o.year + "-" + o.month + "-" + o.day + "_" + o.hour + "-" + o.min) + "." + r.getFileExtension(e, "mp4");
                    },
                    prepareLinks: function(e, t) {
                        var r = [];
                        for (var o in e) {
                            var n = this.getFileName(o), a = n.lastIndexOf("."), i = n.substr(a + 1), s = {
                                href: o,
                                title: n = t || n.substr(0, a),
                                format: i.toUpperCase(),
                                quality: e[o],
                                forceDownload: !0
                            };
                            r.push(s);
                        }
                        return 0 === r.length && (r = l.A.i18n.getMessage("noLinksFound")), r;
                    },
                    appendLinks: function(e) {
                        if (e) {
                            var t = document.getElementById("fbPhotoPageMediaInfo");
                            if (null !== t) {
                                var o = document.querySelector("h2.uiHeaderTitle");
                                if (o && (o = o.textContent), t && !t.querySelector("." + w.className)) {
                                    var n = document.createElement("div");
                                    n.className = w.className;
                                    var a = y.A.create("div", {
                                        title: l.A.i18n.getMessage("download"),
                                        style: {
                                            display: "inline-block",
                                            width: "16px",
                                            height: "16px",
                                            backgroundImage: "url(" + r.svg.getSrc("download", "#a2db16") + ")",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center center",
                                            verticalAlign: "middle",
                                            cursor: "pointer"
                                        }
                                    });
                                    n.appendChild(a);
                                    var i = null;
                                    a.addEventListener("click", (function() {
                                        if (w.contextMenu && w.contextMenu.isShow) w.hideMenu(); else {
                                            var t = w.contextMenu = r.popupMenu.quickInsert(this, l.A.i18n.getMessage("download") + " ...", w.className + "_popup");
                                            if (i) t.update(i); else if (e.id) {
                                                var n = e.id;
                                                delete e.id, E.requestVideoLinks(n, (function(o, n) {
                                                    i = o ? r.popupMenu.prepareLinks.facebook(o, n) : E.prepareLinks(e), t.update(i);
                                                }));
                                            } else i = E.prepareLinks(e, o), t.update(i);
                                        }
                                    })), t.appendChild(n), t = null, n = null, a = null;
                                }
                            }
                        }
                    },
                    rmBtn: function() {
                        for (var e, t = document.querySelectorAll("." + w.className), r = 0; e = t[r]; r++) e.parentNode.removeChild(e);
                    },
                    showDownloadMenuByVideoId(e, o) {
                        if (w.contextMenu && w.contextMenu.isShow) w.hideMenu(); else {
                            var n = w.contextMenu = r.popupMenu.quickInsert(e, l.A.i18n.getMessage("download") + " ...", w.className + "_popup");
                            O.P.createLinkExtractor("fb-video").extractLinks({
                                mediaId: o,
                                initData: t
                            }).then((e => n.update(function(e) {
                                return JSON.parse(JSON.stringify(e)).map((e => (e.href = e.url, e.title = e.filename, 
                                delete e.url, delete e.filename, e)));
                            }(e))));
                        }
                    }
                }, L = {
                    style: null,
                    getFilenameFromUrl: function(e) {
                        return r.getMatchFirst(e, /\/([^\/]+\.[a-z0-9]{3,4})(?:\?|$)/i);
                    },
                    getPhotoIdFromUrl: function() {
                        var e = null, t = (0, f.A)(location.href);
                        return t.fbid && (e = t.fbid), e;
                    },
                    prepPhotoUrl: function(e) {
                        e && (/[?&]dl=1/.test(e) || (e += (/\?/.test(e) ? "&" : "?") + "dl=1"));
                        return e;
                    },
                    rmCurrentPhotoBtn: function(e) {
                        for (var t, r = void 0, o = document.querySelectorAll(".sf-dl-current-photo-btn"), n = 0; t = o[n]; n++) e && e.contains(t) ? r = t : t.parentNode.removeChild(t);
                        return r;
                    },
                    injectStyle: function() {
                        this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = y.A.create("style", {
                            text: (0, h.A)({
                                "div > .sf-dl-current-photo-btn": {
                                    display: "none",
                                    position: "absolute",
                                    top: "10px",
                                    left: "10px",
                                    width: "28px",
                                    height: "24px",
                                    border: 0,
                                    zIndex: 100,
                                    cursor: "pointer",
                                    backgroundColor: "#000",
                                    padding: 0,
                                    borderRadius: "2px",
                                    opacity: .4,
                                    transition: "opacity 100ms linear",
                                    lineHeight: 0
                                },
                                "div > .sf-dl-current-photo-btn svg": {
                                    margin: "4px"
                                },
                                "div > .sf-dl-current-photo-btn:hover": {
                                    opacity: .8
                                },
                                "div > .sf-dl-current-photo-btn:hover svg path": {
                                    fill: "#00B75A"
                                },
                                "body:not(.fullScreen) div:hover > .sf-dl-current-photo-btn": {
                                    display: "block"
                                }
                            })
                        }), document.head.appendChild(this.style));
                    },
                    getPhotoUrlFromCtr: function(e) {
                        var t = [], r = e.querySelector("img.spotlight") || e.querySelector("img.fbPhotoImage");
                        return r && t.push(r.src), t;
                    },
                    getVideoUrlFromPhotoCtr: function(e) {
                        var t = null, r = e.querySelector(".stage .videoStage video");
                        if (r) {
                            var o = (0, m.A)(r, ".fbPhotoSnowliftPopup");
                            if (o) {
                                var n = o.querySelector('div[id^="feed_subtitle_"] a[data-video-channel-id]');
                                if (n) {
                                    var a = /\/videos\/(\d+)/.exec(n.href);
                                    a && (t = a[1]);
                                }
                            }
                        }
                        return t;
                    },
                    getLinksFromPhotoCtr: function(e) {
                        return (0, v.A)(e, ".stageWrapper.showVideo") ? Promise.resolve().then((function() {
                            var t = E.getVideoIdFromUrl();
                            if (t || (t = L.getVideoUrlFromPhotoCtr(e)), t) return E.requestVideoLinksById(t);
                        })).then((function(e) {
                            return r.popupMenu.prepareLinks.facebook(e.links, e.title);
                        })) : Promise.resolve().then((function() {
                            var e = L.getPhotoIdFromUrl();
                            if (e) return new Promise((function(t, r) {
                                l.A.sendMessage({
                                    action: "getFacebookPhotoUrl",
                                    fbid: e
                                }, (function(e) {
                                    e && e.length ? t(e) : r(new Error("getFacebookPhotoUrl can't get url"));
                                }));
                            }));
                            throw new Error("Can't get photo id from url");
                        })).catch((function(t) {
                            return L.getPhotoUrlFromCtr(e);
                        })).then((function(e) {
                            if (!e || !e.length) throw new Error("Photo url not found");
                            return e.map((function(e) {
                                var t = L.prepPhotoUrl(e), r = k.A.modify(L.getFilenameFromUrl(t)), o = /(.+)\.([^.]+)$/.exec(r), n = "jpg", a = r;
                                return o && (n = o[1], a = o[2]), {
                                    href: t,
                                    title: a,
                                    quality: l.A.i18n.getMessage("download"),
                                    format: " ",
                                    ext: n,
                                    isBlank: !0
                                };
                            }));
                        }));
                    },
                    addDlCurrentPhotoBtn: function(e) {
                        if (!this.rmCurrentPhotoBtn(e)) {
                            var t = y.A.create("a", {
                                class: "sf-dl-current-photo-btn",
                                href: "#",
                                title: l.A.i18n.getMessage("download"),
                                append: [ r.svg.getSvg("download", "#FFF", 16) ],
                                on: [ [ "click", function(t) {
                                    if (t.stopPropagation(), t.preventDefault(), w.contextMenu && w.contextMenu.isShow) w.hideMenu(); else {
                                        var o = function e(t) {
                                            18 !== t.keyCode && 17 !== t.keyCode && (n.hide(), document.removeEventListener("keydown", e));
                                        }, n = w.contextMenu = r.popupMenu.quickInsert(this, l.A.i18n.getMessage("download") + " ...", "photoDlMenu", {
                                            parent: e,
                                            onShow: function() {
                                                w.isMutation || document.addEventListener("keydown", o);
                                            },
                                            onHide: function() {
                                                w.isMutation || document.removeEventListener("keydown", o);
                                            }
                                        });
                                        L.getLinksFromPhotoCtr(e).then((function(e) {
                                            e.forEach((function(e) {
                                                e.func = function(t) {
                                                    t.preventDefault(), r.download(null, e.href), n.hide();
                                                };
                                            })), n.update(e);
                                        })).catch((function(e) {
                                            U.debug("Get photo links error", e), n.update(l.A.i18n.getMessage("noLinksFound"));
                                        }));
                                    }
                                } ], [ "mouseover", e => {
                                    if (H) {
                                        if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, q.D)(t, {
                                            defaultWidth: 400,
                                            defaultHeight: 60
                                        }, {});
                                        (0, q.w)(t, {
                                            defaultWidth: 400,
                                            defaultHeight: 60
                                        });
                                    }
                                } ] ]
                            });
                            e.appendChild(t);
                        }
                    },
                    addButtonForArticleImage: e => (0, n.A)(s().mark((function n() {
                        var a, i, l, d, c;
                        return s().wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                              case 0:
                                if (a = e.closest("a")) {
                                    n.next = 3;
                                    break;
                                }
                                return n.abrupt("return");

                              case 3:
                                return n.next = 5, O.P.createLinkExtractor("fb-photo").extractLinks({
                                    element: e,
                                    initData: t
                                });

                              case 5:
                                i = n.sent, l = (0, o.A)(i, 1), d = l[0], c = y.A.create("a", {
                                    class: "sf-hover-container",
                                    href: d.url,
                                    download: d.filename,
                                    style: {
                                        position: "absolute",
                                        top: "8px",
                                        left: "8px"
                                    },
                                    on: [ [ "click", e => {
                                        e.stopPropagation(), r.downloadOnClick(e);
                                    } ], [ "mouseover", e => {
                                        if (H) {
                                            if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, q.D)(c, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            }, {});
                                            (0, q.w)(c, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            });
                                        }
                                    } ] ]
                                }), (0, I.A)({
                                    category: "append",
                                    subcategory: "fa",
                                    event: "b"
                                }), (0, S.A)((0, N.n)(D, {
                                    isText: !1
                                }), c), a.appendChild(c);

                              case 12:
                              case "end":
                                return n.stop();
                            }
                        }), n);
                    })))(),
                    addButtonForShowPageImage: e => (0, n.A)(s().mark((function n() {
                        var a, i, l, d, c, u;
                        return s().wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                              case 0:
                                if (a = {
                                    position: "absolute",
                                    zIndex: 9999,
                                    margin: "15px"
                                }, i = e.closest('div:not([data-visualcompletion="media-vc-image"])').parentElement.parentElement) {
                                    n.next = 4;
                                    break;
                                }
                                return n.abrupt("return");

                              case 4:
                                return n.next = 6, O.P.createLinkExtractor("fb-photo").extractLinks({
                                    element: e,
                                    initData: t
                                });

                              case 6:
                                l = n.sent, d = (0, o.A)(l, 1), c = d[0], u = y.A.create("a", {
                                    style: a,
                                    href: c.url,
                                    download: c.filename,
                                    on: [ [ "click", e => {
                                        e.stopPropagation(), r.downloadOnClick(e);
                                    } ], [ "mouseover", e => {
                                        if (H) {
                                            if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, q.D)(u, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            }, {});
                                            (0, q.w)(u, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            });
                                        }
                                    } ] ]
                                }), (0, I.A)({
                                    category: "append",
                                    subcategory: "fa",
                                    event: "b"
                                }), (0, S.A)((0, N.n)(D, {
                                    isText: !1,
                                    isCircle: !0
                                }), u), i.prepend(u);

                              case 13:
                              case "end":
                                return n.stop();
                            }
                        }), n);
                    })))(),
                    addCurrentDlBtn: function(e) {
                        e.dataset.sfSkip > 0 || (e.dataset.sfSkip = "1", this.addDlCurrentPhotoBtn(e));
                    },
                    rmDataAttrs: function() {
                        for (var e, t = (0, p.A)("sfSkip"), r = document.querySelectorAll("*[" + t + "]"), o = 0; e = r[o]; o++) e.removeAttribute(t);
                    }
                }, B = {
                    style: null,
                    addStyle: function() {
                        if (this.style) this.style.parentNode || document.head.appendChild(this.style); else {
                            this.style = y.A.create("style", {
                                class: "sfFeedStyle",
                                text: (0, h.A)([ {
                                    selector: "." + w.className + "-feed.sf-feed",
                                    style: {
                                        display: "none",
                                        width: "20px",
                                        height: "20px",
                                        padding: 0,
                                        position: "absolute",
                                        background: "url(" + r.svg.getSrc("download", "#a2db16") + ") center no-repeat transparent",
                                        backgroundSize: "16px",
                                        top: "5px",
                                        left: "5px",
                                        zIndex: 1,
                                        cursor: "pointer"
                                    }
                                }, {
                                    selector: 'div[role="dialog"] .' + w.className + "-feed.sf-feed",
                                    style: {
                                        top: "40px"
                                    }
                                }, {
                                    selector: "body:not(.fullScreen) div:hover > ." + w.className + "-feed.sf-feed",
                                    style: {
                                        display: "block"
                                    }
                                }, {
                                    selector: "." + w.className + "-feed.sf-feed:active",
                                    style: {
                                        outline: 0
                                    }
                                }, {
                                    selector: ".sf-hover-container",
                                    style: {
                                        display: "none"
                                    }
                                }, {
                                    selector: 'div[role="presentation"]:hover .sf-hover-container, a[role="link"]:hover .sf-hover-container, div[style*="bottom:calc"]:hover .sf-hover-container',
                                    style: {
                                        display: "block"
                                    }
                                } ])
                            }), document.head.appendChild(this.style);
                        }
                    },
                    onDlBtnClick: function(e) {
                        if (e.preventDefault(), e.stopPropagation(), l.A.sendMessage({
                            action: "checkAndOpenProLanding"
                        }), w.contextMenu && w.contextMenu.isShow) w.hideMenu(); else {
                            try {
                                var t = JSON.parse(this.dataset.sfDlLinks);
                            } catch (e) {
                                return;
                            }
                            var o = w.contextMenu = r.popupMenu.quickInsert(this, l.A.i18n.getMessage("download") + " ...", w.className + "_popup");
                            if (t.id) {
                                var n = t.id;
                                delete t.id, E.requestVideoLinks(n, (function(e, n) {
                                    var a;
                                    a = e ? r.popupMenu.prepareLinks.facebook(e, n) : E.prepareLinks(t), o.update(a);
                                }));
                            } else {
                                var a = E.prepareLinks(t);
                                o.update(a);
                            }
                        }
                    },
                    addDownloadBtn: function(e, t) {
                        var r = e.querySelector("." + w.className + "-feed");
                        r && r.parentNode.removeChild(r), e.appendChild(y.A.create("a", {
                            data: {
                                sfDlLinks: JSON.stringify(t)
                            },
                            title: l.A.i18n.getMessage("download"),
                            class: [ w.className + "-feed", "sf-feed" ],
                            href: "#",
                            on: [ "click", B.onDlBtnClick ]
                        }));
                    },
                    addButtonForWatchPage(e) {
                        var t = e.closest("._6x84"), r = /\/live/.test(location.href);
                        t || (t = e.closest(".x1n6yrxt, .xvl6max")), !t && r && (t = e.closest(".x1282nqq").parentNode);
                        var o = t.querySelector('a[href*="/videos/"]');
                        if (o || (o = t.querySelector('a[href*="/watch/?"]')), o || (o = {
                            href: window.location.href
                        }), o && o.href) {
                            var n = E.getVideoIdFromLink(o.href);
                            if (n) {
                                var a = M.createButton((() => {
                                    E.showDownloadMenuByVideoId(a, n);
                                }));
                                (0, I.A)({
                                    category: "append",
                                    subcategory: "fa",
                                    event: "b"
                                });
                                var i = null === t.querySelector('[aria-label="Like"]') ? t.querySelector(".x1u2d2a2") : t.querySelector('[aria-label="Like"]').parentNode;
                                o.href === window.location.href ? (e.dataset.waRep = "1", setTimeout((() => {
                                    i.querySelector(".sf-download-container") && j !== o.href && i.querySelector(".sf-download-container").remove(), 
                                    i.prepend(a), j = o.href;
                                }), 1500)) : (i.querySelector(".sf-download-container") && i.querySelector(".sf-download-container").remove(), 
                                i.prepend(a));
                            }
                        }
                    },
                    addButtonForFeedPage(e) {
                        var t = e.closest('[role="article"]'), r = t.querySelector('a[href*="/watch/?v"]');
                        if (r || (r = t.querySelector('a[href*="/videos/"]')), r) {
                            var o = r.href, n = E.getVideoIdFromLink(o);
                            if (n) {
                                var a = null === t.querySelector('[aria-label="Like"]') ? t.querySelector(".x8182xy").firstChild : t.querySelector('[aria-label="Like"]').parentNode;
                                if (a) {
                                    var i = M.createButton((() => {
                                        E.showDownloadMenuByVideoId(i, n);
                                    }), {
                                        preset: "withoutText",
                                        style: {
                                            alignItems: "center",
                                            display: "flex"
                                        }
                                    });
                                    (0, I.A)({
                                        category: "append",
                                        subcategory: "fa",
                                        event: "b"
                                    }), a.parentElement.insertBefore(i, a);
                                }
                            }
                        }
                    },
                    addButtonForShowPageVideo(e) {
                        var t = M.createButton((e => {
                            var t = E.getVideoIdFromLink(location.href);
                            t && E.showDownloadMenuByVideoId(e.target, t);
                        }), {
                            preset: "circle",
                            style: {
                                position: "absolute",
                                top: "8px",
                                left: "114px"
                            }
                        });
                        (0, I.A)({
                            category: "append",
                            subcategory: "fa",
                            event: "b"
                        }), e.appendChild(t);
                    },
                    addButtonForReelVideo(e) {
                        var t = {
                            position: "absolute",
                            top: "80px",
                            left: "16px",
                            zIndex: 10
                        }, r = e.querySelector("div[data-video-id]");
                        if (r || (r = e, t = _(_({}, t), {}, {
                            top: "16px"
                        })), r) {
                            var o = M.createButton((e => {
                                var t = r.getAttribute("data-video-id");
                                t || (t = E.getVideoIdFromLink(r.getAttribute("href"))), t && E.showDownloadMenuByVideoId(e.target, t);
                            }), {
                                preset: "circle",
                                style: t
                            });
                            (0, I.A)({
                                category: "append",
                                subcategory: "fa",
                                event: "b"
                            }), e.appendChild(o);
                        }
                    },
                    addHoverButtonForArticleVideo(e) {
                        var t = E.getVideoIdFromLink(e.href);
                        if (t) {
                            var r = e.closest('[role="article"], ._6x84');
                            if (r) {
                                var o = r.querySelector('div[role="presentation"]');
                                if (o || (o = e.parentNode)) {
                                    var n = M.createButton((e => {
                                        E.showDownloadMenuByVideoId(e.target, t);
                                    }), {
                                        preset: "hover"
                                    });
                                    o.appendChild(n);
                                }
                            }
                        }
                    },
                    onLinkHover: function() {
                        var e = this;
                        if (!(this.dataset.hasSfFeedBtn > 1)) {
                            this.dataset.hasSfFeedBtn = "1";
                            var t = this;
                            return "VIDEO" === t.tagName && (t = t.querySelector("embed") || this), new Promise((e => {
                                "EMBED" === t.tagName ? E.getLinksFromEmbed(t, e) : "VIDEO" === t.tagName && E.getLinksFromVideo(t, e);
                            })).catch((e => (U("getLinks error", e), null))).then((t => {
                                var r = t && t.links;
                                if (r) if (t && t.popup_1) B.addDownloadBtn(e.parentNode, r); else if ((0, v.A)(e, ".uiStreamStory " + e.tagName) || (0, 
                                v.A)(e, ".fbPhotoSnowliftContainer " + e.tagName)) {
                                    (0, m.A)(e, ".fbPhotoSnowliftPopup .stageWrapper") || B.addDownloadBtn(e.parentNode, r);
                                } else {
                                    var o = document.getElementById("pagelet_timeline_main_column") || document.getElementById("stream_pagelet") || document.getElementById("mainContainer");
                                    if (o && o.contains(e)) B.addDownloadBtn(e.parentNode, r); else {
                                        var n = document.getElementById("stream_pagelet"), a = n && n.previousElementSibling;
                                        if (a && a.contains(e)) B.addDownloadBtn(e.parentNode, r); else {
                                            var i = document.querySelector(".uiStreamStory"), s = i && i.parentNode;
                                            (s = s && s.parentNode) && s.contains(e) && B.addDownloadBtn(e.parentNode, r);
                                        }
                                    }
                                } else e.dataset.hasSfFeedBtn = 0;
                            }));
                        }
                    },
                    rmBtn: function() {
                        var e = [ (0, p.A)("hasSfFeedBtn"), (0, p.A)("sfReady") ], t = e.map((e => `[${e}]`)).join(",");
                        document.querySelectorAll(t).forEach((t => {
                            e.forEach((e => t.removeAttribute(e)));
                        }));
                        var r = [ ".sf-hover-container", ".sf-download-container", "." + w.className + "-feed" ].join(",");
                        document.querySelectorAll(r).forEach((e => {
                            e.parentNode.removeChild(e);
                        }));
                    }
                };
            }));
        },
        5935: (e, t, r) => {
            "use strict";
            r.r(t), r.d(t, {
                default: () => s
            });
            var o = r(1601), n = r.n(o), a = r(6314), i = r.n(a)()(n());
            i.push([ e.id, ".tTH02--container{border-radius:4px;color:#65676b;cursor:pointer;display:flex;font-family:inherit;font-weight:600;line-height:1.6;margin-right:10px;padding:5px 4px}.tTH02--container:hover{background-color:rgba(0,0,0,.05)}.o5emB--text{margin-left:4px}.EhExA--circle-container{background:#e4e6eb;border-radius:100%;height:40px;padding:0;width:40px}.EhExA--circle-container:hover{background-color:#fff}.EhExA--circle-container .jWs5z--logo{margin:0 auto;max-width:20px}", "" ]), 
            i.locals = {
                container: "tTH02--container",
                text: "o5emB--text",
                "circle-container": "EhExA--circle-container",
                circleContainer: "EhExA--circle-container",
                logo: "jWs5z--logo"
            };
            const s = i;
        },
        3159: (e, t, r) => {
            var o = r(5072), n = r(5935);
            "string" == typeof (n = n.__esModule ? n.default : n) && (n = [ [ e.id, n, "" ] ]);
            var a, i = 0, s = {
                injectType: "lazyStyleTag",
                insert: "head",
                singleton: !1
            }, l = {};
            l.locals = n.locals || {}, l.use = function() {
                return i++ || (a = o(n, s)), l;
            }, l.unuse = function() {
                i > 0 && ! --i && (a(), a = null);
            }, e.exports = l;
        }
    }, r = {};
    function o(e) {
        var n = r[e];
        if (void 0 !== n) return n.exports;
        var a = r[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(a.exports, a, a.exports, o), a.exports;
    }
    o.m = t, e = [], o.O = (t, r, n, a) => {
        if (!r) {
            var i = 1 / 0;
            for (c = 0; c < e.length; c++) {
                for (var [r, n, a] = e[c], s = !0, l = 0; l < r.length; l++) (!1 & a || i >= a) && Object.keys(o.O).every((e => o.O[e](r[l]))) ? r.splice(l--, 1) : (s = !1, 
                a < i && (i = a));
                if (s) {
                    e.splice(c--, 1);
                    var d = n();
                    void 0 !== d && (t = d);
                }
            }
            return t;
        }
        a = a || 0;
        for (var c = e.length; c > 0 && e[c - 1][2] > a; c--) e[c] = e[c - 1];
        e[c] = [ r, n, a ];
    }, o.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return o.d(t, {
            a: t
        }), t;
    }, o.d = (e, t) => {
        for (var r in t) o.o(t, r) && !o.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
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
    }, o.j = 657, (() => {
        o.b = document.baseURI || self.location.href;
        var e = {
            657: 0
        };
        o.O.j = t => 0 === e[t];
        var t = (t, r) => {
            var n, a, [i, s, l] = r, d = 0;
            if (i.some((t => 0 !== e[t]))) {
                for (n in s) o.o(s, n) && (o.m[n] = s[n]);
                if (l) var c = l(o);
            }
            for (t && t(r); d < i.length; d++) a = i[d], o.o(e, a) && e[a] && e[a][0](), e[a] = 0;
            return o.O(c);
        }, r = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        r.forEach(t.bind(null, 0)), r.push = t.bind(null, r.push.bind(r));
    })(), o.nc = void 0;
    var n = o.O(void 0, [ 223 ], (() => o(6230)));
    n = o.O(n);
})();