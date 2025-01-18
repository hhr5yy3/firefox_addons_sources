(() => {
    "use strict";
    var e, t = {
        5412: (e, t, n) => {
            var o = n(3453), r = n(467), a = n(4756), i = n.n(a), s = n(9242), d = n(9620), l = n(9589), c = n(8278), u = n(717), p = n(8139), f = n(9580), h = n(5563), v = n(3372), m = n(2525), g = n(9437), k = n(8244), y = n(4733), w = n(188), b = n(6810), A = n(8233), x = n(5218), M = n(9022), S = n(1460), L = n(2128), P = n(4895), C = n(9763), _ = n(4689), O = n(453), I = n(6714), N = n(2894), q = (0, 
            A.A)("odnoklassniki_ru"), E = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
            M.A.isSingle() && (0, l.Ys)("odnoklassniki", (function(e, t) {
                var a = (0, d.A)(t), l = t.preferences, A = l.moduleOdnoklassniki ? 1 : 0, M = s.A.isChrome || s.A.isFirefox || s.A.isGM && s.A.isTM, R = t.preferences.selectorsConfig;
                s.A.onMessage.addListener((function(t, n, o) {
                    if ("getModuleInfo" === t.action) {
                        if (t.url !== location.href) return;
                        return o({
                            state: A,
                            moduleName: e
                        });
                    }
                    if ("changeState" === t.action) {
                        if (e !== t.moduleName) return;
                        return T.changeState(t.state);
                    }
                    "updatePreferences" !== t.action ? A && ("updateLinks" === t.action && D(), "downloadMP3Files" === t.action && (M ? j.downloadMP3Files() : j.showListOfAudioFiles(!1)), 
                    "downloadPlaylist" === t.action && j.showListOfAudioFiles(!0)) : Object.assign(l, t.preferences);
                })), A && setTimeout((function() {
                    T.run();
                }));
                var T = {
                    linkCache: {},
                    contextMenu: null,
                    videoToken: null,
                    run: function() {
                        if (A = 1, j.getJsSessionId(), H.injectStyle(), U.injectStyle(), S.A.isAvailable()) return T.mutationMode.enable();
                    },
                    changeState: function(e) {
                        A = e, V.rmBtn(), j.disable(), U.rmCurrentPhotoBtn(), H.disable(), H.rmBtn(), T.hideMenu(), 
                        T.mutationMode.stop(), T.clearCache(), e && T.run();
                    },
                    hideMenu: function() {
                        T.contextMenu && (T.contextMenu.hide(), T.contextMenu = null);
                    },
                    clearCache: function() {
                        var e = T.linkCache;
                        for (var t in e) delete e[t];
                    },
                    mutationMode: {
                        observer: null,
                        stop: function() {
                            this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                                for (var t, n = (0, p.A)(e), o = document.querySelectorAll("[" + n + "]"), r = 0; t = o[r]; r++) t.removeAttribute(n);
                            }));
                        },
                        wrapOnPhotoOver: function() {
                            A && U.addCurrentDlBtn(this);
                        },
                        wrapVideoFeedOnImgOver: function() {
                            A && H.onImgOver.call(this);
                        },
                        wrapAudioOnMouseOver: function() {
                            A && j.onMouseOver.apply(this, arguments);
                        },
                        wrapAudioOnMouseOut: function() {
                            A && j.onMouseOut.apply(this, arguments);
                        },
                        wrapNewAudioOnMouseEnter: function() {
                            if (A) try {
                                j.onNewMouseEnter.apply(this, arguments);
                            } catch (e) {
                                q.error("wrapNewAudioOnMouseEnter error", e);
                            }
                        },
                        enable: function() {
                            if (this.observer) return this.observer.start();
                            var e = this, t = t => {
                                for (var n, o = 0; n = t.added[o]; o++) n.sfSkip > 0 || (n.sfSkip = "1", k.A.on(n, "mouseenter", e.wrapAudioOnMouseOver), 
                                k.A.on(n, "mouseleave", e.wrapAudioOnMouseOut));
                            }, n = function() {
                                var e = (0, r.A)(i().mark((function e(t) {
                                    return i().wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            t.added.filter((e => !e.dataset.sfReady)).map((e => (e.dataset.sfReady = 1, e))).map((e => {
                                                var t = document.createElement("a");
                                                (0, _.A)({
                                                    category: "append",
                                                    subcategory: "ok",
                                                    event: "b"
                                                }), t.classList.add("sf-audio", "savefrom_ok_download"), e.style.position = "relative", 
                                                e.appendChild(t), t.style.position = "absolute", t.style.top = "10px", t.style.right = "15px", 
                                                t.style.width = "16px", t.style.height = "16px", e.closest(".track-with-cover").addEventListener("mouseleave", (() => t.style.display = "none")), 
                                                e.addEventListener("mouseenter", (() => {
                                                    t.style.display = "block", t.href || I.P.createLinkExtractor("ok-profile_music").extractLinks({
                                                        element: e
                                                    }).then((e => {
                                                        t.href = e[0].url;
                                                        var n = e[0].bitrate + " " + s.A.i18n.getMessage("kbps"), o = a.sizeHuman(e[0].size, 2);
                                                        t.title = `${o} ~ ${n}`;
                                                    }));
                                                })), t.addEventListener("click", (t => {
                                                    (0, _.A)({
                                                        category: "download",
                                                        subcategory: "ok",
                                                        event: "track"
                                                    }), t.stopPropagation(), t.preventDefault(), s.A.sendMessage({
                                                        action: "checkAndOpenProLanding",
                                                        id: "ok-1"
                                                    });
                                                    var n = e.closest(".track-with-cover"), o = n.querySelector('[data-l="t,artist"]').textContent, r = n.querySelector('[data-l="t,title"]').textContent, a = b.A.modify(`${o} - ${r}`);
                                                    s.A.sendMessage({
                                                        action: "downloadFile",
                                                        options: {
                                                            filename: a + ".mp3",
                                                            url: t.target.href
                                                        }
                                                    });
                                                }));
                                            }));

                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }), e);
                                })));
                                return function(t) {
                                    return e.apply(this, arguments);
                                };
                            }(), o = t => {
                                for (var n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                k.A.one(n, "mouseenter", e.wrapVideoFeedOnImgOver));
                            }, d = [];
                            "m.ok.ru" === location.host && d.push({
                                css: R.ok_ru.mobileMusic,
                                is: "added",
                                callback: e => {
                                    e.added.forEach((e => {
                                        e.sfSkip || (e.sfSkip = "1", j.appendDownloadMobileMusic(e));
                                    }));
                                }
                            }, {
                                css: R.ok_ru.mobileVideo,
                                is: "added",
                                callback: e => {
                                    e.added.forEach((e => {
                                        if (!e.dataset.sfSkip) {
                                            e.dataset.sfSkip = "1";
                                            var t = e.closest(".section, .feed-card, .theme-comments-head");
                                            t && V.appendDownloadMobileVideo(t);
                                        }
                                    }));
                                }
                            }), this.observer = new S.A({
                                queries: [ ...d, {
                                    css: R.ok_ru.musicAdd,
                                    is: "added",
                                    callback: t
                                }, {
                                    css: R.ok_ru.rowOnPageOkMusic,
                                    is: "added",
                                    callback: n
                                }, {
                                    css: R.ok_ru.musicAdd2,
                                    is: "added",
                                    callback: t
                                }, {
                                    css: R.ok_ru.photoLayerAdd,
                                    is: "added",
                                    callback: t => {
                                        if (!s.A.isSafari) for (var n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                        k.A.one(n, "mouseenter", e.wrapOnPhotoOver));
                                    }
                                }, {
                                    css: R.ok_ru.videoAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = 0; t = e.added[n]; n++) if (!(t.dataset.sfSkip > 0)) {
                                            t.dataset.sfSkip = "1";
                                            var o = (0, m.A)(t, ".vp_video");
                                            if (!o) return;
                                            var r = V.getPlayerOptions(t);
                                            r && V.appendLinkUnderVideo(o.parentNode, r, t);
                                        }
                                    }
                                }, {
                                    css: R.ok_ru.videoImageAdd,
                                    is: "added",
                                    callback: t => {
                                        for (var n, o = 0; n = t.added[o]; o++) if (!(n.dataset.sfSkip > 0)) {
                                            if (n.dataset.sfSkip = "1", (n = (0, c.A)(n, "vid-card_cnt")).dataset.sfSkip) return;
                                            k.A.one(n, "mouseenter", e.wrapVideoFeedOnImgOver);
                                        }
                                    }
                                }, {
                                    css: R.ok_ru.imageAdd,
                                    is: "added",
                                    callback: o
                                }, {
                                    css: R.ok_ru.imageAdd2,
                                    is: "added",
                                    callback: o
                                }, {
                                    css: R.ok_ru.imageAdd3,
                                    is: "added",
                                    callback: o
                                }, {
                                    css: `.${k.A.onRemoveClassName}`,
                                    is: "removed",
                                    callback: e => {
                                        for (var t, n = 0; t = e.removed[n]; n++) k.A.onRemoveListener(t);
                                    }
                                }, {
                                    css: R.ok_ru.sfVideoFeedAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, n = e.target, o = 0; t = e.added[o]; o++) t.addEventListener("click", (function(e) {
                                            H.onBtnClick(e, this, n);
                                        })), (0, _.A)({
                                            category: "append",
                                            subcategory: "ok",
                                            event: "b"
                                        });
                                    }
                                }, {
                                    css: R.ok_ru.wmTrackAdd,
                                    is: "added",
                                    callback: t => {
                                        for (var n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                        k.A.one(n, "mouseenter", e.wrapNewAudioOnMouseEnter));
                                    }
                                } ]
                            });
                        }
                    }
                }, F = "savefrom_ok_download", D = function() {
                    T.clearCache(), B(), j.getJsSessionId(), V.catchPopup();
                }, B = function() {
                    for (var e = "." + F, t = document.querySelectorAll(e), n = t.length - 1; n >= 0; n--) t[n].parentNode.removeChild(t[n]);
                }, j = {
                    downloadIdPrefix: "savefrom_ok_audio_download_",
                    infoIdPrefix: "savefrom_ok_audio_info_",
                    lastRow: null,
                    lastRowCandidate: null,
                    timer: 0,
                    jsessionId: "",
                    clientHashV: "",
                    scriptNode: null,
                    cache: {},
                    ajaxTimer: {},
                    appendDownloadMobileMusic(e) {
                        var t = y.A.create("a", {
                            style: {
                                position: "absolute",
                                top: "-6px",
                                left: "16px"
                            },
                            append: [ a.svg.getSvg("download", "#f1bc7f", 14, 14) ],
                            on: [ "click", function() {
                                var t = (0, r.A)(i().mark((function t(n) {
                                    return i().wrap((function(t) {
                                        for (;;) switch (t.prev = t.next) {
                                          case 0:
                                            n.preventDefault(), n.stopPropagation(), I.P.createLinkExtractor("ok-music").extractLinks({
                                                element: e
                                            }).then((e => {
                                                a.download(e[0].filename, e[0].url);
                                            })).catch((e => {
                                                q.error("appendDownloadMobileMusic. click download error", e), this.style.opacity = .3;
                                            }));

                                          case 3:
                                          case "end":
                                            return t.stop();
                                        }
                                    }), t, this);
                                })));
                                return function(e) {
                                    return t.apply(this, arguments);
                                };
                            }() ]
                        }), n = e.querySelector(".music_track_aux");
                        n && n.appendChild(t);
                    },
                    showRowElements: function(e, t, n) {
                        if (e) {
                            var o = e.querySelectorAll("div." + F);
                            o = e.querySelectorAll("div." + F);
                            for (var r = 0; r < o.length; r++) o[r].style.display = t ? "" : "none";
                        }
                    },
                    getNodeTrackId: function(e) {
                        var t = e.getAttribute("data-query");
                        if (t) try {
                            if ((t = JSON.parse(t)) && t.trackId) return t.trackId;
                        } catch (e) {
                            return null;
                        }
                        var n = e.querySelector("span.track_play[onclick]");
                        if (n) {
                            var o = /(?:playMediatopic|playFeedTrack)\(['"]?(\d+)['"]?/.exec(n.getAttribute("onclick"));
                            return o && o[1];
                        }
                        return e.dataset.trackId ? e.dataset.trackId : null;
                    },
                    getTrackId: function(e) {
                        var t = j.getNodeTrackId(e);
                        if (t) return (o = {})[t] = e, o;
                        var n = e.id;
                        if (n) {
                            var o, r = n.indexOf("#");
                            if (-1 !== r && (n = n.substr(r + 1)), (t = a.getMatchFirst(n, /^\w+_(\d+)$/i)) || -1 !== n.indexOf("GROUP_FEED") && (t = n.substr(n.lastIndexOf("_") + 1)), 
                            t) return (o = {})[t] = e, o;
                        }
                        return null;
                    },
                    showRowLinks: function(e) {
                        var t = j.getTrackId(e);
                        for (var n in t) if (j.handleRow(n, t[n])) return !0;
                        return !1;
                    },
                    disable: function() {
                        j.lastRowCandidate = null, j.lastRow = null;
                        for (var e, t = document.querySelectorAll("." + F), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    },
                    getJsSessionId: function() {
                        return ("m.ok.ru" === location.host ? () => {
                            for (var e = Array.from(document.querySelectorAll("script")), t = 0; t < e.length; t++) if (e[t].textContent) {
                                var n = e[t].textContent.match(/"jsid":"(.*?)"/);
                                if (n && n[1]) return Promise.resolve(n[1]);
                            }
                            return Promise.resolve(void 0);
                        } : function() {
                            return new Promise((function(e, t) {
                                var n = location.protocol + "//" + location.host + "/web-api/music/conf";
                                (0, g.A)({
                                    type: "POST",
                                    url: n,
                                    data: "_",
                                    json: !0,
                                    localXHR: !0
                                }, (function(n, o, r) {
                                    !n && r && r.sid ? e(r.sid) : t(new Error("Get jsSessionId error!"));
                                }));
                            }));
                        })().then((function(e) {
                            j.jsessionId = e;
                        }), (function(e) {
                            q.debug("getJsSessionId error", e);
                        }));
                    },
                    getLink: function(e) {
                        e && j.jsessionId && (j.ajaxTimer[e] = window.setTimeout((function() {
                            delete j.ajaxTimer[e], j.deleteLink(e);
                        }), 3e4), s.A.sendMessage({
                            action: "getOdnoklassnikiAudioLinks",
                            url: location.href,
                            trackId: e,
                            jsessionId: j.jsessionId
                        }, (function(e) {
                            j.setLink(e.trackId, e.data);
                        })));
                    },
                    onMouseOver: function() {
                        if (j.jsessionId) {
                            var e = this;
                            e && (j.lastRowCandidate = e, clearTimeout(j.timer), j.lastRow !== e && (j.timer = window.setTimeout((function() {
                                j.showRowElements(j.lastRow, !1), j.lastRow = e, j.lastRowCandidate = null, j.showRowElements(j.lastRow, !0);
                            }), 250)));
                        }
                    },
                    onMouseOut: function() {
                        var e = this;
                        (j.lastRow && j.lastRow.contains(e) || j.lastRowCandidate && j.lastRowCandidate.contains(e)) && (clearTimeout(j.timer), 
                        j.timer = window.setTimeout((function() {
                            j.showRowElements(j.lastRow, !1), j.lastRow = null, j.lastRowCandidate = null;
                        }), 1e3)), e = null;
                    },
                    onNewMouseEnter(e) {
                        if (!this.querySelector(`.${F}`)) {
                            var t = (0, x.A)(this);
                            if (document.querySelector(t) !== this) throw new Error("Node path is incorrect");
                            return j.getNodeTrack(t).then((e => {
                                "WM-TRACK2" === this.tagName ? j.insertButtonOnOver(this, e) : j.insertButton(this, e);
                            }));
                        }
                    },
                    insertButtonOnOver(e, t) {
                        var n = new ((0, L.A)())((n => {
                            if (!A) return o();
                            for (var r = null, a = null, i = 0; r = n.shift(); ) if ("childList" === r.type && r.target === e) for (i = 0, 
                            r.addedNodes; a = r.addedNodes[i]; i++) if ("SLOT" === a.tagName && "controls" === a.name) {
                                e.querySelector(`.${F}`) || (this.insertButton(e, t), o());
                                break;
                            }
                        })), o = function() {
                            n.disconnect();
                        };
                        n.observe(e, {
                            childList: !0
                        });
                    },
                    insertButton(e, t) {
                        var n = [ "sf-audio", F ], o = null;
                        if ("WM-TRACK" === e.tagName ? o = e.querySelector(".wm-track_controls") : "WM-TRACK2" === e.tagName && (n.push("sf-audio-2"), 
                        o = e.querySelector('slot[name="controls"]')), e.classList.contains("track-with-cover") && (o = e.querySelector('[data-l="t,addTrack"]')), 
                        !o) {
                            var r = e.querySelector('slot[name="controls"], wm-duration');
                            o = document.createElement("div"), e.insertBefore(o, r);
                        }
                        var a = y.A.create("a", {
                            href: "#",
                            data: {
                                state: "idle",
                                trackId: t.id
                            },
                            class: n,
                            style: {
                                display: "none",
                                position: "relative",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "middle"
                            },
                            on: [ [ "mouseenter", j.handlePreload ], [ "click", j.handleClickNewButton ], [ "mouseenter", function() {
                                z.tooltip.textContent = j.getNewButtonTooltipLabel(this), z.show(this);
                            } ], [ "mouseleave", function() {
                                z.hide();
                            } ], [ "sf-state-change", function() {
                                z.tooltip.textContent = j.getNewButtonTooltipLabel(this), z.updatePos(this);
                            } ], [ "mouseover", e => {
                                if (E) {
                                    if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, O.D)(a, {
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                    (0, O.w)(a, {
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                }
                            } ] ]
                        });
                        (0, _.A)({
                            category: "append",
                            subcategory: "ok",
                            event: "b"
                        }), o.appendChild(a);
                    },
                    getNewButtonTooltipLabel(e) {
                        switch (e.dataset.state) {
                          case "pending":
                            return "...";

                          case "done":
                            var t = JSON.parse(e.dataset.data), n = t.duration, o = t.size, r = "";
                            if (o) {
                                var i = a.sizeHuman(o, 2);
                                if (n) r = `${i} ~ ${Math.floor(o / n / 125) + " " + s.A.i18n.getMessage("kbps")}`; else r = `${i}`;
                            } else r = s.A.i18n.getMessage("getFileSizeFailTitle");
                            return r;

                          case "error":
                            return s.A.i18n.getMessage("noLinksFound");

                          default:
                            return "";
                        }
                    },
                    handlePreload(e) {
                        var t = e.target.closest("wm-track") || e.target.closest("wm-track2");
                        return I.P.createLinkExtractor("ok-music").extractLinks({
                            element: t
                        }).then((t => {
                            this.href = t[0].url, this.download = t[0].filename, this.dataset.data = JSON.stringify({
                                duration: t[0].duration,
                                size: t[0].size
                            }), this.dataset.state = "done", this.dispatchEvent(new CustomEvent("sf-state-change")), 
                            this.dataset.downloadOnReady > 0 && j.handleClickNewButton.call(this, e);
                        })).catch((e => {
                            q.error("LinkExtractor error", e), this.dataset.state = "error", this.dispatchEvent(new CustomEvent("sf-state-change"));
                        }));
                    },
                    handleClickNewButton(e) {
                        e.stopPropagation(), "done" !== this.dataset.state ? (e.preventDefault(), "1" !== this.dataset.downloadOnReady && (this.dataset.downloadOnReady = "1")) : a.downloadOnClick(e);
                    },
                    getNodeTrack: e => (0, w.A)([ e ], 'function(nodePath){var el=document.querySelector(nodePath);if(el&&el.props&&el.props.track){return el.props.track}if(el&&el.model&&el.model._data.get("track")){return el.model._data.get("track")}throw new Error("Track information not found")}'),
                    getNodePath(e) {
                        for (var t = []; e.parentNode && 1 === e.parentNode.nodeType; ) {
                            var n = "", o = [].slice.call(e.parentNode.childNodes);
                            o.length > 1 && (n = `:nth-child(${o.indexOf(e) + 1})`), t.unshift(`${e.tagName}${n}`), 
                            e = e.parentNode;
                        }
                        return t.join(">");
                    },
                    handleRow: function(e, t) {
                        if (!e || !t) return !1;
                        var n = t;
                        n.style.position = "relative";
                        var o = t.querySelector(".m_c_duration, .m_portal_duration"), r = document.createElement("div");
                        r.className = F;
                        var i = 40, d = document.getElementById("mmpcw");
                        d && d.contains(t) && (i = 65), a.setStyle(r, {
                            color: "#fff",
                            background: "#46aa19",
                            border: "1px solid #337d12",
                            borderRadius: "3px",
                            padding: "1px 5px",
                            position: "absolute",
                            right: i + "px",
                            top: "50%",
                            lineHeight: "15px",
                            fontSize: "12px",
                            opacity: 0,
                            zIndex: 9999,
                            cursor: "pointer"
                        }), r.addEventListener("click", j.onBoxClick, !1), r.addEventListener("mousedown", (function(e) {
                            e.stopPropagation();
                        }), !1);
                        var l = j.getTitle(e, t), c = function(e, t, n) {
                            null == n && (n = !0);
                            var o = document.createElement("a");
                            return o.href = e, o.className = F, o.textContent = t, n && o.setAttribute("target", "_blank"), 
                            o;
                        }("#", "...");
                        c.id = j.downloadIdPrefix + e, c.title = s.A.i18n.getMessage("downloadTitle"), o && c.setAttribute("data-savefrom-helper-duration", j.secondsFromDurationNode(o)), 
                        l && (l += ".mp3", c.setAttribute("download", b.A.modify(l))), a.setStyle(c, {
                            color: "#fff",
                            fontWeight: "normal"
                        }), c.addEventListener("click", j.onDownloadLinkClick, !1), r.appendChild(c), n.appendChild(r), 
                        j.cache[e] ? j.setLinkFromCache(e, c) : j.getLink(e), r.style.marginTop = "-" + r.offsetHeight / 2 + "px", 
                        r.style.opacity = "1";
                        var u = document.createElement("span");
                        return u.textContent = String.fromCharCode(215), u.title = s.A.i18n.getMessage("close"), 
                        a.setStyle(u, {
                            color: "#fff",
                            fontFamily: "Tahoma,Helvetica,sans-serif",
                            fontSize: "15px",
                            marginLeft: "7px",
                            opacity: ".7",
                            cursor: "pointer"
                        }), u.addEventListener("click", j.onCloseBtnClick, !1), r.appendChild(u), !0;
                    },
                    onBoxClick: function(e) {
                        e.preventDefault(), e.stopPropagation();
                        var t = this.querySelector("a." + F);
                        return t ? (k.A.trigger(t, "click", {
                            cancelable: !0
                        }), !1) : (this.style.display = "none", !1);
                    },
                    onDownloadLinkClick: function(e) {
                        return 2 != e.button && (e.stopPropagation(), "#" == this.href ? (e.preventDefault(), 
                        !1) : (a.downloadOnClick(e), !1));
                    },
                    onCloseBtnClick: function(e) {
                        if (2 == e.button) return !0;
                        e.preventDefault(), e.stopPropagation();
                        var t = (0, m.A)(this, "." + F);
                        return t && (t.style.display = "none"), !1;
                    },
                    deleteLink: function(e, t) {
                        if (!t && e && (t = document.getElementById(j.downloadIdPrefix + e)), t) {
                            var n = t.parentNode;
                            n && n.parentNode.removeChild(n);
                        }
                    },
                    getHash: function(e, t) {
                        t || (t = [ 4, 3, 5, 6, 1, 2, 8, 7, 2, 9, 3, 5, 7, 1, 4, 8, 8, 3, 4, 3, 1, 7, 3, 5, 9, 8, 1, 4, 3, 7, 2, 8 ]);
                        for (var n = [], o = 0; o < e.length; o++) n.push(parseInt("0x0" + e.charAt(o)));
                        var r = [];
                        (e = (e = n).slice(0))[32] = e[31];
                        var a = 0;
                        for (o = 32; o-- > 0; ) a += e[o];
                        for (var i = 0; i < 32; i++) r[i] = Math.abs(a - e[i + 1] * e[i] * t[i]);
                        return r.join("");
                    },
                    setLinkFromCache: function(e, t) {
                        if (!j.cache[e]) return !1;
                        if (t || (t = document.getElementById(j.downloadIdPrefix + e)), t) {
                            t.href = j.cache[e].url, t.textContent = "", j.cache[e].downloadAttr && t.setAttribute("download", j.cache[e].downloadAttr);
                            var n = y.A.create(a.svg.getSvg("download", "#ffffff"), {
                                style: {
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    verticalAlign: "middle",
                                    opacity: "0.9"
                                }
                            });
                            t.appendChild(n);
                            var o = document.createTextNode(j.cache[e].info);
                            return t.nextSibling ? t.parentNode.insertBefore(o, t.nextSibling) : t.parentNode.appendChild(o), 
                            !0;
                        }
                    },
                    getClientHash: function(e) {
                        var t;
                        return Promise.resolve((t = n(4636), function(e, t) {
                            for (var n, o = [ 4, 3, 5, 6, 1, 2, 8, 7, 2, 9, 3, 5, 7, 1, 4, 8, 8, 3, 4, 3, 1, 7, 3, 5, 9, 8, 1, 4, 3, 7, 2, 8 ], r = t(/md5=(\w*)/g.exec(e)[1] + "secret"), a = r.length, i = "", s = 0, d = 0; d < a; d++) s += parseInt(r[d], 16);
                            for (var l = 0; l < a; l++) {
                                var c = parseInt(r[l], 16);
                                n = l === a - 1 ? c : parseInt(r[l + 1], 16), i += Math.abs(s - c * n * o[l]);
                            }
                            return i;
                        }(e, (e => t(e).toString()))));
                    },
                    setLink: function(e, t, n) {
                        if (e) {
                            clearTimeout(j.ajaxTimer[e]);
                            var o = document.getElementById(j.downloadIdPrefix + e);
                            if (o && !j.setLinkFromCache(e, o)) {
                                if (!t || !t.play) return j.deleteLink(e, o), void (o.textContent = "?");
                                if (void 0 === n) return this.getClientHash(t.play).then((function(n) {
                                    j.setLink(e, t, n);
                                }), (function(t) {
                                    j.deleteLink(e, o);
                                }));
                                var r = t.track && t.track.size || -1;
                                j.cache[e] = {}, j.cache[e].url = t.play + (n ? "&clientHash=" + n : "");
                                var i = " (" + a.sizeHuman(r, 2), d = o.getAttribute("data-savefrom-helper-duration");
                                if (t.track && (t.track.duration && (d = t.track.duration), t.track.ensemble && t.track.name)) {
                                    var l = t.track.ensemble + " - " + t.track.name;
                                    j.cache[e].title = l, j.cache[e].downloadAttr = b.A.modify(l + ".mp3");
                                }
                                if (r && r > 0 && d) {
                                    if (d = parseInt(d), isNaN(d)) return void delete j.cache[e];
                                    i += " ~ " + (Math.floor(r / d / 125) + " " + s.A.i18n.getMessage("kbps"));
                                }
                                i += ")", j.cache[e].info = i, j.setLinkFromCache(e, o);
                            }
                        }
                    },
                    getTitle: function(e, t) {
                        if (!e || !t) return "";
                        var n = "", o = t.querySelector(".m_c_artist, .mus-tr_artist, .m_portal_c_artist"), r = t.querySelector(".m_track_source, .mus-tr_song, .m_portla_track_name");
                        return o && (o = o.textContent) && (n += o.trim()), r && (r = r.textContent) && (n && (n += " - "), 
                        n += r.trim()), n ? n.replace(/\<a\s+[^\>]+\>/gi, "").replace(/\<\/a\>/gi, "") : "";
                    },
                    secondsFromDurationNode: function(e) {
                        if (!e) return 0;
                        var t = e.textContent;
                        if (!t) return 0;
                        var n = t.match(/^(?:\s*(\d+)\s*\:)?\s*(\d+)\s*\:\s*(\d+)/);
                        return n && n.length > 3 ? (n[1] || (n[1] = 0), 3600 * parseInt(n[1]) + 60 * parseInt(n[2]) + parseInt(n[3])) : 0;
                    },
                    getPlaylistName: function(e) {
                        if (e !== document) {
                            var t = e.querySelector(".mus_h2_tx");
                            if (t) return b.A.modify(t.textContent) || void 0;
                        }
                    },
                    getNewPlaylistName: function(e) {
                        if (e !== document) {
                            var t = e.querySelector(".wm-list-description_header");
                            if (t) return b.A.modify(t.textContent) || void 0;
                        }
                    },
                    elIsHidden: function(e) {
                        return null === e.offsetParent;
                    },
                    getLayer: function() {
                        var e = document.querySelector("#mmpcw");
                        if (e && !e.classList.contains("__hidden") && (e = e.querySelector('div.m_c_s[aria-hidden="false"]')) && !j.elIsHidden(e)) return e;
                    },
                    getNewLayer: function() {
                        var e = document.querySelector("#music_layer wm-collection-section");
                        if (e || (e = document.querySelector("#music_layer")), !e || !j.elIsHidden(e)) return e;
                    },
                    getPopup: function(e, t, n) {
                        var o, r = a.playlist.getInfoPopupTemplate();
                        y.A.create(r.textContainer, {
                            append: [ e ? y.A.create("p", {
                                text: e,
                                style: {
                                    color: "#0D0D0D",
                                    fontSize: "20px",
                                    marginBottom: "11px",
                                    marginTop: "13px"
                                }
                            }) : void 0, o = y.A.create("p", {
                                text: "",
                                style: {
                                    color: "#868686",
                                    fontSize: "14px",
                                    lineHeight: "24px"
                                }
                            }) ]
                        });
                        var i = a.popupDiv(r.body, "sf_progress_popup", void 0, void 0, n), d = function e(n) {
                            e.state !== n && (e.state = n, r.buttonContainer.style.display = "none", o.style.display = "none", 
                            s.A.sendMessage({
                                action: "getWarningIcon",
                                type: t,
                                color: "#77D1FA"
                            }, (function(e) {
                                r.icon.style.backgroundImage = "url(" + e + ")";
                            })), "progress" === n && (o.style.display = "block"), "error" === n && (s.A.sendMessage({
                                action: "getWarningIcon",
                                type: t,
                                color: "#AAAAAA"
                            }, (function(e) {
                                r.icon.style.backgroundImage = "url(" + e + ")";
                            })), o.style.display = "block"));
                        };
                        return {
                            onPrepare: function(e) {
                                d("progress"), o.textContent = e;
                            },
                            onProgress: function(e, t) {
                                o.textContent = s.A.i18n.getMessage("vkFoundFiles").replace("%d", e) + " " + s.A.i18n.getMessage("vkFoundOf") + " " + t;
                            },
                            onReady: function() {
                                k.A.trigger(i, "kill");
                            },
                            onError: function(e) {
                                d("error"), o.textContent = e;
                            }
                        };
                    },
                    getAudioLinksViaAPI: function(e, t, n) {
                        var o = !1, r = [], a = e.length;
                        return function i() {
                            if (!o) {
                                var d = e.splice(0, 10);
                                if (0 === d.length) return n(r);
                                s.A.sendMessage({
                                    action: "getOkAudioListLinks",
                                    trackIdArr: d,
                                    jsessionId: j.jsessionId
                                }, (function(n) {
                                    var o = Promise.resolve();
                                    Array.isArray(n) && n.forEach((function(e) {
                                        o = o.then((function() {
                                            if ("string" == typeof e.play && "object" == typeof e.track) {
                                                var t, n = e.play;
                                                return e.track.name && (t = e.track.name), e.track.ensemble && (t = e.track.ensemble + (t ? " - " + t : "")), 
                                                t || (t = "noname"), j.getClientHash(n).then((function(o) {
                                                    n += "&clientHash=" + o, r.push({
                                                        url: n,
                                                        duration: e.track.duration || 0,
                                                        title: t,
                                                        filename: b.A.modify(t) + ".mp3"
                                                    });
                                                }));
                                            }
                                        })).catch((function(t) {
                                            q.debug("process item error", e, t);
                                        }));
                                    })), o.then((function() {
                                        t(a - e.length, a), i();
                                    }));
                                }));
                            }
                        }(), {
                            abort: function() {
                                o = !0;
                            }
                        };
                    },
                    getAudioListLinksPopup: function(e, t, n) {
                        var o, r = this.getPopup(t, "audio", (function() {
                            o && o.abort();
                        }));
                        r.onPrepare(s.A.i18n.getMessage("download") + " ..."), o = this.getAudioLinksViaAPI(e, r.onProgress, (function(e) {
                            0 !== e.length ? (r.onReady(), n(e)) : r.onError(s.A.i18n.getMessage("vkMp3LinksNotFound"));
                        }));
                    },
                    getAudioLinksIds: e => Promise.resolve().then((() => {
                        for (var t, n = e.querySelectorAll([ ".m_portal_track", ".m_c_tr", ".mus-tr_i" ]), o = [], r = 0; t = n[r]; r++) {
                            var a = j.getTrackId(t);
                            for (var i in a) o.push(i);
                        }
                        return o;
                    })),
                    getNewAudioLinksIds(e) {
                        var t = (0, x.A)(e);
                        if (!t || document.querySelector(t) === e) return (0, w.A)([ t ], 'function(nodePath){var result=null;try{var container=nodePath===""?document:document.querySelector(nodePath);var ids=[].slice.call(container.querySelectorAll(["wm-track","wm-track2"])).reduce(function(result,node){try{var getTrack=function getTrack(){if(node&&node.props&&node.props.track){return node.props.track}if(node&&node.model&&node.model._data.get("track")){return node.model._data.get("track")}throw new Error("getNewAudioLinksIds")};var track=getTrack();if(track){result.push(track.id)}}catch(err){// console.error(\'getNewAudioLinksIds error\', err);\n}return result},[]);result={result:ids}}catch(err){result={error:{message:err.message,stack:err.stack}}}if(result.error){throw new Error(result.error.message)}else{return result.result}}');
                    },
                    getAudioFromWall: e => (0, r.A)(i().mark((function t() {
                        var n, o;
                        return i().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return n = e.querySelector(".media-layer.__active"), o = (e = n || e).querySelectorAll(".track-with-cover_cnt"), 
                                t.abrupt("return", Array.from(o).map((e => e.closest(".track-with-cover").dataset.trackId)));

                              case 4:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))(),
                    getAudioLinks: function(e, t, n) {
                        return Promise.all([ this.getAudioLinksIds(e), this.getNewAudioLinksIds(e), this.getAudioFromWall(e) ]).then((e => [].concat(...e).filter(((e, t, n) => n.indexOf(e) === t)))).then((e => {
                            this.getAudioListLinksPopup(e, t, n);
                        }));
                    },
                    downloadMP3Files: function() {
                        var e = j.getLayer() || j.getNewLayer() || document, t = j.getPlaylistName(e) || j.getNewPlaylistName(e);
                        j.getAudioLinks(e, t, (function(e) {
                            a.downloadList.showBeforeDownloadPopup(e, {
                                type: "audio",
                                folderName: t
                            });
                        }));
                    },
                    showListOfAudioFiles: function(e) {
                        var t = j.getLayer() || j.getNewLayer() || document, n = j.getPlaylistName(t) || j.getNewPlaylistName(t);
                        j.getAudioLinks(t, n, (function(t) {
                            t.length ? e ? a.playlist.popupPlaylist(t, n, !0) : a.playlist.popupFilelist(t) : alert(s.A.i18n.getMessage("vkMp3LinksNotFound"));
                        }));
                    }
                }, V = {
                    requestMobileToken: function(e, t) {
                        var n = null;
                        e.links.some((function(e) {
                            var t = e.url.match(/\/\/([^/]+)/);
                            if (t = t && t[1]) return n = t, !0;
                        }));
                        var o = e => new Promise((t => {
                            var n = new XMLHttpRequest;
                            n.open("POST", location.protocol + "//" + e + "/usr_login", !1), n.withCredentials = !0, 
                            n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.onreadystatechange = () => {
                                try {
                                    var e = JSON.parse(n.responseText);
                                    if (!e.vtkn || !e.ttl) return t();
                                    t({
                                        ttl: e.ttl,
                                        vtkn: e.vtkn
                                    });
                                } catch (e) {}
                            }, n.send();
                        }));
                        (0, w.A)((() => {
                            var e = document.cookie && document.cookie.match(/vdsig=([^;]+);/);
                            if (e && e[1]) return e[1];
                        })).then((r => {
                            if (r) return e.vtkn = r, t(e);
                            var a = n => {
                                var o = n.ttl, r = n.vtkn;
                                o && r && (T.videoToken = {
                                    ttl: Date.now() + 1e3 * o,
                                    vtkn: r
                                }, e.vtkn = r, t(e));
                            };
                            s.A.isChrome || s.A.isFirefox ? (0, w.A)([ n ], o).then(a) : o(n).then(a);
                        }));
                    },
                    getMobileToken: function(e, t) {
                        if (e.vtkn) return t(e);
                        var n = T.videoToken;
                        return n && n.expire > Date.now() ? (e.vtkn = n.vtkn, t(e)) : V.requestMobileToken(e, t);
                    },
                    wrapMobileLinks: function(e, t) {
                        V.getMobileToken(e, (function(e) {
                            if (!e || !e.vtkn) return t();
                            e.action = "getOkViaMobileWrapped", e.links.forEach((function(t) {
                                var n = /\?/.test(t.url) ? "&" : "?";
                                t.url += n + "vdsig=" + e.vtkn;
                            })), t(e);
                        }));
                    },
                    prepareResponse: function(e, t) {
                        var n = function() {
                            t(s.A.i18n.getMessage("noLinksFound"));
                        };
                        if (!e || !e.links) return n();
                        if (!l.showUmmyItem && "getRutubeLinks" === e.action) return n();
                        if ("getOkViaMobile" === e.action) return V.wrapMobileLinks(e, (function(e) {
                            if (!e) return n();
                            V.prepareResponse(e, t);
                        }));
                        var o = null;
                        "getYoutubeLinks" === e.action ? o = "youtube" : "getVimeoLinks" === e.action ? o = "vimeo" : "getDailymotionLinks" === e.action ? o = "dailymotion" : "getRutubeLinks" === e.action && (o = "rutube");
                        var r = null;
                        return r = o ? a.popupMenu.prepareLinks[o](e.links, e.title) : H.prepareLinks(e.links, e.title), 
                        t(r);
                    },
                    matchOpenGraph: function(e) {
                        if (e && e.movie && e.movie.contentId) {
                            var t = e.movie.contentId;
                            if (-1 !== t.indexOf("rutube.") && l.showUmmyItem) return {
                                action: "getRutubeLinks",
                                links: [ t ]
                            };
                            if (-1 !== t.indexOf("pladform")) {
                                var n = (0, u.A)(t);
                                return {
                                    action: "getPladformVideo",
                                    extVideoId: {
                                        playerId: n.pl,
                                        videoId: n.videoid
                                    }
                                };
                            }
                            var o = a.embedDownloader.checkUrl(t);
                            if (o) return o;
                            var r = e.movie.poster;
                            if ("string" == typeof r) {
                                var i = ((0, u.A)(r).url || r).match(/ytimg\.com\/vi\/([^\/]+)\//);
                                if (i = i && i[1]) return {
                                    action: "getYoutubeLinks",
                                    extVideoId: i
                                };
                            }
                        }
                    },
                    switchMetadataProvider: function(e) {
                        if (e && e.provider && e.movie) switch (e.provider) {
                          case "USER_YOUTUBE":
                            if (e.movie.contentId) return {
                                request: {
                                    action: "getYoutubeLinks",
                                    extVideoId: e.movie.contentId
                                }
                            };
                            break;

                          case "OPEN_GRAPH":
                            var t = this.matchOpenGraph(e);
                            if (t) return {
                                request: t
                            };
                            break;

                          case "LIVE_TV_APP":
                          case "SLIDE_SHOW":
                          case "LIVE_TV_ODKL":
                          case "UPLOADED_ODKL":
                          case "UPLOADED_ATTACHMENT":
                          case "UPLOADED":
                          case "PARTNER":
                          case "YKL":
                            if (e.videos && e.movie.title) return {
                                request: {
                                    action: "wrapMobileLinks",
                                    title: e.movie.title,
                                    links: e.videos
                                }
                            };
                        }
                    },
                    getPlayerMetadata: function(e, t, n, o) {
                        var r = {
                            cmd: "videoPlayerMetadata",
                            mid: e,
                            rnd: Date.now()
                        };
                        o && (r.mtId = t), (0, g.A)({
                            method: "POST",
                            url: location.protocol + "//" + location.host + "/dk?" + N.stringify(r),
                            json: !0,
                            localXHR: !0
                        }, (function(r, a, i) {
                            return r ? !o && t ? void V.getPlayerMetadata(e, t, n, 1) : n() : n(i);
                        }));
                    },
                    getEmbed: function(e, t) {
                        var n = (0, u.A)(e);
                        if (!n.id || !n.sig) return t();
                        var o = "http://cdn-ok.com/video/get/?" + N.stringify({
                            id: n.id,
                            format: 1,
                            sig: n.sig,
                            sig2: "oldRotator"
                        });
                        s.A.sendMessage({
                            action: "getData",
                            url: o
                        }, (function(e) {
                            return e && (0, f.A)(e, [ /"sourceType":/, /"sourceId":/ ]).some((function(e) {
                                if ("youtube" === e.sourceType && e.sourceId) return t({
                                    request: {
                                        action: "getYoutubeLinks",
                                        extVideoId: e.sourceId
                                    }
                                }), !0;
                            })) ? void 0 : t();
                        }));
                    },
                    readMetadata: function(e, t, n) {
                        if (e.movie && /cdn-ok\.com\/embed/.test(e.movie.contentId)) return this.getEmbed(e.movie.contentId, (function(e) {
                            if (!e || !e.request) return t();
                            s.A.sendMessage(e.request, (function(e) {
                                V.prepareResponse(e, t);
                            }));
                        }));
                        if (!n && e.movie && e.movie.movieId) {
                            var o = e.movie.link && (0, u.A)(e.movie.link, {
                                sep: "&amp;"
                            })["st.vpl.sid"];
                            return this.getPlayerMetadata(e.movie.movieId, o, (function(n) {
                                V.readMetadata(n || e, t, 1);
                            }));
                        }
                        var r = this.switchMetadataProvider(e);
                        return r ? r.links ? t(r.links) : void (r.request ? "getRutubeLinks" === r.request.action ? V.prepareResponse(r.request, t) : "wrapMobileLinks" === r.request.action ? V.wrapMobileLinks(r.request, (function(e) {
                            V.prepareResponse(e, (function(e) {
                                t(e, 1);
                            }));
                        })) : s.A.sendMessage(r.request, (function(e) {
                            V.prepareResponse(e, t);
                        })) : t()) : t();
                    },
                    prepareVideoUrl(e, t) {
                        var n = e.split("?"), r = t.split("?"), a = (0, o.A)(r, 2), i = a[0], s = a[1];
                        if (!n[1] || !s) return t;
                        if (n = new URLSearchParams(n[1]), s = new URLSearchParams(s), !n.has("type")) return t;
                        var d = n.get("type");
                        return s.has("st.mq") && s.set("st.mq", d), s.has("st.hls") && s.set("st.hls", "off"), 
                        i + "?" + s.toString();
                    },
                    getMobileVideoSrc: e => e && e.dataMobile && e.dataMobile.videoSrc ? Promise.resolve(e.dataMobile.videoSrc) : e && e.movie && e.movie.id ? (0, 
                    P.A)({
                        action: "getOkVideoUrlFromMobile",
                        videoUrl: location.href,
                        videoId: e.movie.id
                    }) : Promise.resolve(void 0),
                    loadLinks: function(e, n, o) {
                        var r = T.linkCache, a = JSON.stringify(e), i = r[a];
                        if (i) return n.update(i);
                        var d = function(e, i) {
                            var d = function() {
                                n.update(s.A.i18n.getMessage("noLinksFound"));
                            };
                            return e ? e.hlsManifestUrl ? I.P.createLinkExtractor("ok-video").extractLinks({
                                element: o,
                                initData: t
                            }).then((e => {
                                n.update(e);
                            })).catch((e => {
                                d(), q.error("hls error", e);
                            })) : void V.readMetadata(e, ((e, t) => {
                                if (!e) return d();
                                Array.isArray(e) && !e.length && (t = 1), t || (r[a] = e), n.update(e);
                            }), i) : d();
                        };
                        e.metadata ? d(e.metadata) : e.request ? "getOkMetadata" === e.request.action ? s.A.sendMessage(e.request, d) : "getPlayerMetadata" === e.request.action ? this.getPlayerMetadata(e.request.extVideoId, e.request.sid, (function(e) {
                            d(e, 1);
                        })) : "getRutubeLinks" === e.request.action ? V.prepareResponse(e.request, (function(e) {
                            n.update(e);
                        })) : s.A.sendMessage(e.request, (function(e) {
                            V.prepareResponse(e, (function(e) {
                                n.update(e);
                            }));
                        })) : n.update(s.A.i18n.getMessage("noLinksFound"));
                    },
                    appendLinkUnderVideo: function(e, t, n) {
                        (0, _.A)({
                            category: "append",
                            subcategory: "ok",
                            event: "b"
                        });
                        var o = e.querySelector(".vp-layer-info_cnt");
                        if (o) {
                            var r = o.querySelector("." + F), i = y.A.create("span", {
                                className: F,
                                style: {
                                    marginLeft: "12px"
                                },
                                on: [ [ "click", function(e) {
                                    e.stopPropagation();
                                } ], [ "mousedown", function(e) {
                                    e.stopPropagation();
                                } ], [ "keydown", function(e) {
                                    e.stopPropagation();
                                } ] ],
                                append: [ y.A.create("a", {
                                    href: "#",
                                    text: s.A.i18n.getMessage("download"),
                                    on: [ "click", function(o) {
                                        if (o.preventDefault(), k.A.onRemoveEvent(i, T.hideMenu), T.contextMenu && T.contextMenu.isShow) {
                                            if (T.contextMenu.button === this) return void T.hideMenu();
                                            T.hideMenu();
                                        }
                                        s.A.sendMessage({
                                            action: "checkAndOpenProLanding",
                                            id: "ok-5"
                                        });
                                        var r = T.contextMenu = a.popupMenu.quickInsert(this, s.A.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                            parent: e
                                        });
                                        V.loadLinks(t, r, n);
                                    } ]
                                }) ]
                            });
                            r && r.parentNode ? (r.parentNode.replaceChild(i, r), r = null) : o.appendChild(i);
                        }
                    },
                    appendDownloadMobileVideo(e) {
                        var t = {
                            float: "right",
                            display: "flex",
                            alignItems: "center",
                            width: "fit-content"
                        }, n = e.querySelector(".widget-list_infos"), o = e.querySelector("[data-video]");
                        if (n && o) {
                            n.querySelector(".widget-list_actors, .ic") || (t.position = "absolute", t.top = "-7px", 
                            t.right = "0");
                            var r = V.createMobileDownloadContainer(o, {
                                containerStyle: t,
                                menuClass: "sf-mobile-video-menu"
                            });
                            n.appendChild(r);
                        }
                    },
                    createMobileDownloadContainer(e, t) {
                        var n = t.containerStyle, o = t.menuClass, r = y.A.create("div", {
                            style: n || {},
                            append: [ a.svg.getSvg("download", "#f1bc7f", 14, 14), y.A.create("a", {
                                href: "#",
                                text: s.A.i18n.getMessage("download"),
                                style: {
                                    marginLeft: "4px"
                                }
                            }) ],
                            on: [ "click", function(t) {
                                t.preventDefault(), t.stopPropagation(), T.contextMenu = a.popupMenu.quickInsert(this, s.A.i18n.getMessage("download") + " ...", o, {
                                    parent: r || t.target
                                }), V.getMobilePlayerOptions(e).then((t => {
                                    if (!t) return T.contextMenu.update(s.A.i18n.getMessage("noLinksFound"));
                                    V.loadLinks(t, T.contextMenu, e);
                                }));
                            } ]
                        });
                        return r;
                    },
                    getPlayerOptions: function(e) {
                        var t = (0, m.A)(e, "[data-player-element-id][data-options]"), n = t && t.dataset.options;
                        if (n) {
                            try {
                                n = JSON.parse(n);
                            } catch (e) {}
                            var o = n.flashvars;
                            if (o) {
                                if (o.metadata) {
                                    var r = null;
                                    try {
                                        r = JSON.parse(o.metadata);
                                    } catch (e) {}
                                    if (r) return {
                                        metadata: r
                                    };
                                }
                                if (o.metadataUrl) return {
                                    request: {
                                        action: "getOkMetadata",
                                        url: decodeURIComponent(o.metadataUrl)
                                    }
                                };
                                var i = n.url;
                                if (i) {
                                    var s = a.embedDownloader.checkUrl(i);
                                    if (s) return {
                                        request: s
                                    };
                                    if (-1 !== i.indexOf("rutube.")) return {
                                        request: {
                                            action: "getRutubeLinks",
                                            links: [ i ]
                                        }
                                    };
                                }
                            }
                        }
                    },
                    getMobilePlayerOptions: e => (0, r.A)(i().mark((function t() {
                        var n, o, r, a, s, d, l;
                        return i().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                try {
                                    n = JSON.parse(e.dataset.video);
                                } catch (e) {}
                                if (n && n.movieId ? (o = n.movieId).indexOf("_") && (o = o.split("_")[0]) : (r = new URLSearchParams(location.search), 
                                o = r.get("st.discId")), o) {
                                    t.next = 5;
                                    break;
                                }
                                return q.error("getMobilePlayerOptions. video id not found"), t.abrupt("return");

                              case 5:
                                return t.next = 7, (0, P.A)({
                                    action: "okRequestVideoPage",
                                    videoId: o
                                });

                              case 7:
                                if (a = t.sent) {
                                    t.next = 11;
                                    break;
                                }
                                return q.error("getMobilePlayerOptions. videoPage fetch failed"), t.abrupt("return");

                              case 11:
                                if (s = (0, C.A)(a, ""), d = s.querySelector(".vp_video .vid-card_cnt")) {
                                    t.next = 16;
                                    break;
                                }
                                return q.error("getMobilePlayerOptions. Video dataset not found"), t.abrupt("return");

                              case 16:
                                return (l = V.getPlayerOptions(d)).metadata ? l.metadata.dataMobile = n : l.metadata = {
                                    dataMobile: n
                                }, t.abrupt("return", l);

                              case 19:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })))(),
                    catchPopup: function() {
                        var e = null;
                        this.lastWaitEl && this.lastWaitEl.abort(), this.lastWaitEl = this.waitEl((function() {
                            if (e = document.querySelector(".vp_video .vid-card_cnt")) return e;
                        }), (function() {
                            var t = (0, m.A)(e, ".vp_video");
                            if (t) {
                                var n = V.getPlayerOptions(e);
                                n && V.appendLinkUnderVideo(t.parentNode, n, e);
                            }
                        }));
                    },
                    rmBtn: function() {
                        for (var e, t = document.querySelectorAll("." + F), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    },
                    lastWaitEl: null,
                    waitEl: function(e, t, n) {
                        var o, r = Object.assign({
                            abort: function() {
                                clearInterval(r.timeout), r.isAborted = !0;
                            }
                        }, {
                            delay: 500,
                            repeat: 12,
                            isAborted: !1,
                            timeout: null
                        }, n);
                        return (o = e()) ? (t(o), r) : (function n() {
                            r.repeat--, r.timeout = setTimeout((function() {
                                if (!r.isAborted) return (o = e()) ? t(o) : void (!r.isAborted && r.repeat && n());
                            }), r.delay);
                        }(), r);
                    }
                }, H = {
                    btnClassName: "sf-feed-dl-btn",
                    style: void 0,
                    thumbClassName: "vid-card_img",
                    prepareLinks: function(e, t) {
                        if (!e || !e.length) return s.A.i18n.getMessage("noLinksFound");
                        if ("string" == typeof e) return e;
                        t = t || "";
                        for (var n, o, r, i, d = [], l = 0, c = e.length; l < c; l++) {
                            var u = e[l];
                            if ("object" == typeof u && u.url) {
                                i = u.url;
                                var p = u.ext;
                                p || (p = "MP4", -1 !== u.url.indexOf(".mp4") && (p = "MP4"), -1 !== i.indexOf(".flv") && (p = "FLV"), 
                                -1 !== u.url.indexOf(".mov") && (p = "MOV"), -1 !== u.url.indexOf(".mpg") && (p = "MPG")), 
                                r = (p = p.toLowerCase()).toUpperCase(), o = u.subname || u.quality || u.name || p;
                            } else {
                                p = "MP4", -1 !== (i = u).indexOf(".mp4") && (p = "MP4"), -1 !== i.indexOf(".flv") && (p = "FLV"), 
                                -1 !== i.indexOf(".mov") && (p = "MOV"), -1 !== i.indexOf(".mpg") && (p = "MPG"), 
                                r = (p = p.toLowerCase()).toUpperCase(), o = p;
                                var f = a.getMatchFirst(e[l], /\.(\d+)\.mp4/i);
                                f && (o = f);
                            }
                            var h = [ "mobile", "lowest", "low", "sd", "hd", "full", "quad", "ultra" ].indexOf(o);
                            -1 !== h && (o = [ 144, 240, 360, 480, 720, 1080, 1440, "4K" ][h]), n = {
                                href: i,
                                title: u.title ? u.title : t,
                                ext: p,
                                format: r,
                                quality: o,
                                forceDownload: !0
                            }, d.push(n);
                        }
                        return d;
                    },
                    getPosterData: function(e) {
                        var t = (0, m.A)(e, "[hrefattrs]"), n = t && t.getAttribute("hrefattrs");
                        if (n) {
                            var o = (0, u.A)(n, {
                                params: !0
                            }), r = o["st.vpl.sid"], i = o["st.vpl.id"];
                            if (!i) {
                                var s = (0, m.A)(e, "[data-id]");
                                if ((i = s && s.dataset.id) && "c" === i[0]) return;
                            }
                            if (i && "OK_" === i.substr(0, 3) && (i = a.getMatchFirst(i, /OK_\d+_(\d+)/)), i) return {
                                request: {
                                    sid: r,
                                    action: "getPlayerMetadata",
                                    extVideoId: i
                                }
                            };
                        }
                    },
                    onBtnClick: function(e, t, n) {
                        e.preventDefault(), e.stopPropagation();
                        var o = JSON.parse(t.dataset.sfContext);
                        if (k.A.onRemoveEvent(t, T.hideMenu), T.contextMenu && T.contextMenu.isShow) {
                            if (T.contextMenu.button === t) return void T.hideMenu();
                            T.hideMenu();
                        }
                        var r = document.querySelector("#mtLayer.__active #mtLayerMain > div");
                        r || (r = document.getElementById("vv_content")), r || (0, v.A)(t, ".js-messages-list " + t.tagName) && (r = (0, 
                        c.A)(t, "js-messages-list")) && !r.offsetParent && (r = null), !r && (0, v.A)(t, "#mainContent " + t.tagName) && (r = (0, 
                        m.A)(t, "#mainContent"));
                        var i = T.contextMenu = a.popupMenu.quickInsert(t, s.A.i18n.getMessage("download") + " ...", "sf-popupMenu", {
                            parent: r || void 0
                        });
                        (0, _.A)({
                            category: "download",
                            subcategory: "ok",
                            event: "video"
                        }), V.loadLinks(o, i, n);
                    },
                    onImgOver: function(e) {
                        var t = (0, v.A)(this, ".mdialog_chat_window .d_comment_text_w " + this.tagName), n = null;
                        if ((t ? n = (0, c.A)(this, "d_comment_text_w") : (0, v.A)(this, ".video-card > .video-card_img-w " + this.tagName) ? n = (0, 
                        c.A)(this, "video-card_img-w") : this.classList.contains("vid-card_cnt") ? n = this : (0, 
                        v.A)(this, ".vid-card_cnt " + this.tagName) && (n = (0, c.A)(this, "vid-card_cnt")), 
                        n) && (!n.getElementsByClassName(H.btnClassName).length && !!!n.querySelector(".vid-card_live.__active"))) {
                            var o = (0, v.A)(this, ".vid-card_img__link " + this.tagName), r = V.getPlayerOptions(this);
                            if (r || (r = H.getPosterData(this)), r) {
                                r.isChat = t;
                                var i = {};
                                t && Object.assign(i, {
                                    left: "15px",
                                    top: "15px"
                                }), o && Object.assign(i, {
                                    backgroundColor: "#454648",
                                    borderColor: "rgb(53, 53, 53)"
                                });
                                var d = y.A.create("i", {
                                    class: [ H.btnClassName, "sf-video-feed-bind-on-insert" ],
                                    style: i,
                                    data: {
                                        sfContext: JSON.stringify(r)
                                    },
                                    title: s.A.i18n.getMessage("download")
                                });
                                d.appendChild(y.A.create(a.svg.getSvg("download"), {
                                    style: {
                                        width: "12px",
                                        height: "12px",
                                        margin: "4px"
                                    }
                                })), n.appendChild(d);
                            }
                        }
                    },
                    injectStyle: function() {
                        this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = y.A.create("style", {
                            text: (0, h.A)({
                                "div > .sf-feed-dl-btn": {
                                    display: "none",
                                    border: "1px solid #F8F8F8",
                                    width: "20px",
                                    height: "20px",
                                    padding: 0,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    zIndex: 1,
                                    cursor: "pointer",
                                    backgroundColor: "#F8F8F8"
                                },
                                "div > .sf-feed-dl-btn svg path": {
                                    fill: "#eb722e"
                                },
                                "div > .sf-feed-dl-btn:hover svg path": {
                                    fill: "#00B75A"
                                },
                                "div > .sf-feed-dl-btn:active": {
                                    outline: 0,
                                    boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                                },
                                "div:hover > .sf-feed-dl-btn": {
                                    display: "block"
                                },
                                [`.sf-audio.${F}`]: {
                                    display: "none",
                                    backgroundImage: "url(" + a.svg.getSrc("download", "#ee8208") + ")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "16px",
                                    opacity: .5,
                                    marginLeft: "11px"
                                },
                                [`.sf-audio.sf-audio-2.${F}`]: {
                                    margin: "0 6px"
                                },
                                [`.sf-audio.${F}:hover`]: {
                                    opacity: 1
                                },
                                "wm-track:hover .sf-audio": {
                                    display: "flex !important"
                                },
                                "wm-track2:hover .sf-audio": {
                                    display: "flex !important"
                                },
                                "#sf-mobile-video-menu": {
                                    left: "auto !important",
                                    right: "0"
                                }
                            })
                        }), document.head.appendChild(this.style));
                    },
                    disable: function() {
                        this.style && this.style.parentNode && this.style.parentNode.removeChild(this.style);
                    },
                    rmBtn: function() {
                        for (var e, t = document.querySelectorAll(".sf-feed-dl-btn"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                        var o = (0, p.A)("sfSkip2"), r = document.querySelectorAll("[" + o + "]");
                        for (n = 0; e = r[n]; n++) e.removeAttribute(o);
                    }
                }, U = {
                    style: null,
                    rmCurrentPhotoBtn: function(e) {
                        for (var t, n = void 0, o = document.querySelectorAll(".sf-dl-current-photo-btn"), r = 0; t = o[r]; r++) e && e.contains(t) ? n = t : t.parentNode.removeChild(t);
                        return n;
                    },
                    addDlCurrentPhotoBtn: function(e) {
                        if (!this.rmCurrentPhotoBtn(e)) {
                            var t = T;
                            e.appendChild(y.A.create("a", {
                                class: "sf-dl-current-photo-btn",
                                href: "#",
                                title: s.A.i18n.getMessage("download"),
                                on: [ "click", function(n) {
                                    if (n.stopPropagation(), n.preventDefault(), t.contextMenu && t.contextMenu.isShow && t.contextMenu.button === this) {
                                        if (t.contextMenu.button === this) return void t.hideMenu();
                                        t.hideMenu();
                                    }
                                    var o = function e(t) {
                                        18 !== t.keyCode && 17 !== t.keyCode && (r.hide(), document.removeEventListener("keydown", e));
                                    }, r = t.contextMenu = a.popupMenu.quickInsert(this, s.A.i18n.getMessage("download") + " ...", "photoDlMenu", {
                                        parent: e,
                                        onShow: function() {
                                            document.addEventListener("keydown", o);
                                        },
                                        onHide: function() {
                                            document.removeEventListener("keydown", o);
                                        }
                                    }), i = [], d = e.querySelector("img.photo-layer_img");
                                    if (d) {
                                        var l = d.dataset.fsSrc || d.dataset.nfsSrc || d.src;
                                        l && i.push({
                                            href: l,
                                            title: "photo_" + parseInt(Date.now() / 1e3),
                                            quality: s.A.i18n.getMessage("download"),
                                            format: " ",
                                            ext: "jpg",
                                            forceDownload: !0,
                                            isBlank: !0,
                                            func: function() {
                                                s.A.sendMessage({
                                                    action: "checkAndOpenProLanding",
                                                    id: "ok-6"
                                                }), r.hide();
                                            }
                                        });
                                    }
                                    if (d || (d = e.querySelector("div.gif[data-gifsrc]")), d) {
                                        var c = {
                                            webmsrc: "webm",
                                            mp4src: "mp4",
                                            gifsrc: "gif"
                                        };
                                        Object.keys(c).forEach((function(e) {
                                            var t = d.dataset[e];
                                            if (t) {
                                                var n = c[e];
                                                i.push({
                                                    href: t,
                                                    title: "gif_" + parseInt(Date.now() / 1e3),
                                                    quality: s.A.i18n.getMessage("download"),
                                                    format: n.toUpperCase(),
                                                    ext: n,
                                                    forceDownload: !0,
                                                    isBlank: !0,
                                                    func: function() {
                                                        r.hide();
                                                    }
                                                });
                                            }
                                        }));
                                    }
                                    0 !== i.length ? r.update(i) : r.update(s.A.i18n.getMessage("noLinksFound"));
                                } ],
                                append: [ y.A.create(a.svg.getSvg("download"), {
                                    style: {
                                        width: "12px",
                                        height: "12px",
                                        margin: "4px"
                                    }
                                }) ]
                            }));
                        }
                    },
                    injectStyle: function() {
                        U.style ? U.style.parentNode || document.head.appendChild(U.style) : (U.style = y.A.create("style", {
                            text: (0, h.A)({
                                "div > .sf-dl-current-photo-btn": {
                                    display: "none",
                                    border: "1px solid #F8F8F8",
                                    width: "20px",
                                    height: "20px",
                                    padding: 0,
                                    position: "absolute",
                                    backgroundColor: "#F8F8F8",
                                    top: "73px",
                                    left: "90px",
                                    zIndex: 100,
                                    cursor: "pointer"
                                },
                                "div > .sf-dl-current-photo-btn svg path": {
                                    fill: "#eb722e"
                                },
                                "div > .sf-dl-current-photo-btn:hover svg path": {
                                    fill: "#00B75A"
                                },
                                "div > .sf-dl-current-photo-btn:active": {
                                    outline: 0,
                                    boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                                },
                                "div:hover > .sf-dl-current-photo-btn": {
                                    display: "block"
                                }
                            })
                        }), document.head.appendChild(U.style));
                    },
                    addCurrentDlBtn: function(e) {
                        if ("1" !== e.dataset.sfSkip2) {
                            e.dataset.sfSkip2 = "1";
                            var t = e.querySelector("img.photo-layer_img");
                            if (t) t.dataset.fsSrc || t.dataset.nfsSrc || t.src || (t = null);
                            t || (t = e.querySelector("div.gif[data-gifsrc]")), t && this.addDlCurrentPhotoBtn(e);
                        }
                    }
                };
                var z = new class {
                    constructor() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this.options = e, this.tooltip = null, this.init();
                    }
                    init() {
                        this.tooltip = y.A.create("div", {
                            class: "sf-tooltip",
                            style: Object.assign({
                                position: "absolute",
                                display: "none",
                                zIndex: 9999,
                                opacity: 0,
                                transition: "opacity 0.2s",
                                whiteSpace: "nowrap",
                                fontSize: "12px",
                                color: "#111",
                                fontFamily: "arial, verdana, sans-serif, Lucida Sans"
                            }, this.options.style),
                            on: [ "mouseenter", e => {
                                this.hide();
                            } ]
                        }), document.body.appendChild(this.tooltip);
                    }
                    updatePos(e) {
                        var t = a.getPosition(e), n = a.getSize(this.tooltip);
                        this.tooltip.style.top = t.top + this.options.top - n.height + "px";
                        var o = t.left + parseInt(this.options.width / 2, 10) - parseInt(n.width / 2, 10), r = document.body.clientWidth + document.body.scrollLeft;
                        r < o + n.width && (o = r - n.width), this.tooltip.style.left = o + "px";
                    }
                    show(e) {
                        this.tooltip.style.display = "block", setTimeout((() => {
                            this.updatePos(e), this.tooltip.style.opacity = 1;
                        }));
                    }
                    hide() {
                        this.tooltip.style.opacity = 0, this.tooltip.style.display = "none";
                    }
                    destroy() {
                        this.tooltip.parentNode && (this.tooltip.parentNode.removeChild(this.tooltip), this.tooltip = null);
                    }
                }({
                    top: -12,
                    width: 16,
                    style: {
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        color: "rgb(48, 48, 48)",
                        fontSize: "12px",
                        padding: "3px"
                    }
                });
            }));
        }
    }, n = {};
    function o(e) {
        var r = n[e];
        if (void 0 !== r) return r.exports;
        var a = n[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(a.exports, a, a.exports, o), a.exports;
    }
    o.m = t, e = [], o.O = (t, n, r, a) => {
        if (!n) {
            var i = 1 / 0;
            for (c = 0; c < e.length; c++) {
                for (var [n, r, a] = e[c], s = !0, d = 0; d < n.length; d++) (!1 & a || i >= a) && Object.keys(o.O).every((e => o.O[e](n[d]))) ? n.splice(d--, 1) : (s = !1, 
                a < i && (i = a));
                if (s) {
                    e.splice(c--, 1);
                    var l = r();
                    void 0 !== l && (t = l);
                }
            }
            return t;
        }
        a = a || 0;
        for (var c = e.length; c > 0 && e[c - 1][2] > a; c--) e[c] = e[c - 1];
        e[c] = [ n, r, a ];
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
    }, o.j = 994, (() => {
        o.b = document.baseURI || self.location.href;
        var e = {
            994: 0
        };
        o.O.j = t => 0 === e[t];
        var t = (t, n) => {
            var r, a, [i, s, d] = n, l = 0;
            if (i.some((t => 0 !== e[t]))) {
                for (r in s) o.o(s, r) && (o.m[r] = s[r]);
                if (d) var c = d(o);
            }
            for (t && t(n); l < i.length; l++) a = i[l], o.o(e, a) && e[a] && e[a][0](), e[a] = 0;
            return o.O(c);
        }, n = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n));
    })(), o.nc = void 0;
    var r = o.O(void 0, [ 223 ], (() => o(5412)));
    r = o.O(r);
})();