(() => {
    "use strict";
    var e, t = {
        7934: (e, t, i) => {
            var n = i(9242), a = i(9620), o = i(9589), r = i(8278), s = i(717), l = i(8139), d = i(5563), c = i(9437), u = i(8244), p = i(4733), f = i(6810), m = i(9022), h = i(1460), v = i(188), g = i(4689), y = i(453), _ = {
                position: "absolute",
                top: "38px",
                right: "14px",
                background: "white",
                padding: "4px 9px",
                color: "#3F3F3F",
                fontWeight: "bold",
                textDecoration: "none",
                border: "1px solid #cecece"
            };
            m.A.isSingle() && (0, o.Ys)("mailru", (function(e, t) {
                var i = (0, a.A)(t), o = t.preferences, m = o.moduleMailru ? 1 : 0, b = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"), x = t.preferences.selectorsConfig, k = n.A.isChrome || n.A.isFirefox || n.A.isGM && n.A.isTM;
                n.A.onMessage.addListener((function(t, i, n) {
                    if ("getModuleInfo" === t.action) {
                        if (t.url !== location.href) return;
                        return n({
                            state: m,
                            moduleName: e
                        });
                    }
                    if ("changeState" === t.action) {
                        if (e !== t.moduleName) return;
                        return A.changeState(t.state);
                    }
                    "updatePreferences" !== t.action ? m && ("downloadMP3Files" === t.action && (k ? C.downloadMP3Files() : C.showListOfAudioFiles(!1)), 
                    "downloadPlaylist" === t.action && C.showListOfAudioFiles(!0)) : Object.assign(o, t.preferences);
                })), m && setTimeout((function() {
                    A.run();
                }));
                var A = {
                    contextMenu: null,
                    run: function() {
                        m = 1, C.injectStyle(), h.A.isAvailable() && this.mutationMode.enable();
                    },
                    changeState: function(e) {
                        m = e, C.rmBtn(), M.rmBtn(), this.mutationMode.stop(), this.hideMenu(), e && this.run();
                    },
                    hideMenu: function() {
                        A.contextMenu && (A.contextMenu.hide(), A.contextMenu = null);
                    },
                    mutationMode: {
                        observer: null,
                        stop: function() {
                            this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                                for (var t, i = (0, l.A)(e), n = document.querySelectorAll("[" + i + "]"), a = 0; t = n[a]; a++) t.removeAttribute(i);
                            }));
                        },
                        wrapAudioOnMouseOver: function() {
                            if (m && !(this.dataset.sfSkip > 0)) {
                                this.dataset.sfSkip = "1";
                                var e = JSON.parse(this.dataset.sfContext);
                                C.onTrackOver(this, e.type);
                            }
                        },
                        enable: function() {
                            if (this.observer) return this.observer.start();
                            var e = e => {
                                for (var t, i = 0; t = e.added[i]; i++) if (!(t.dataset.sfSkip > 0)) {
                                    t.dataset.sfSkip = "1";
                                    var n = M.getVideoId(t);
                                    if (n) {
                                        var a = (0, r.A)(t, "b-video__left");
                                        if (a) {
                                            var o = a.querySelector(".b-video__info-time");
                                            o && M.insertBtnInPopup(n, o);
                                        }
                                    }
                                }
                            }, t = e => {
                                for (var t, i = 0; t = e.added[i]; i++) if (!(t.dataset.sfSkip > 0)) {
                                    t.dataset.sfSkip = "1";
                                    var n = M.getVideoId(t);
                                    if (n) {
                                        var a = (0, r.A)(t, "sp-video__item-page");
                                        if (a) {
                                            var o = a.querySelector(".sp-video__item-page__info__additional");
                                            o && M.insertBtnInPage(n, o, 1);
                                        }
                                    }
                                }
                            }, a = e => {
                                for (var t, i = 0; t = e.added[i]; i++) if (!(t.dataset.sfSkip > 0)) {
                                    t.dataset.sfSkip = "1";
                                    var n = (0, r.A)(t, "sp-video__item-page-new__video-content"), a = n && n.querySelector(".sp-video__item-page-new__actions"), o = n && M.getVideoContentVideoId(n);
                                    a && o && M.insertBtnInPage(o, a, 2);
                                }
                            };
                            this.observer = new h.A({
                                queries: [ {
                                    css: x.mail_ru.trackAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, i = 0; t = e.added[i]; i++) t.dataset.sfContext = JSON.stringify({
                                            type: 0
                                        }), u.A.one(t, "mouseenter", A.mutationMode.wrapAudioOnMouseOver);
                                    }
                                }, {
                                    css: x.mail_ru.songAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, i = 0; t = e.added[i]; i++) t.dataset.sfContext = JSON.stringify({
                                            type: 1
                                        }), u.A.one(t, "mouseenter", A.mutationMode.wrapAudioOnMouseOver);
                                    }
                                }, {
                                    css: x.mail_ru.leftVideoAdd,
                                    is: "added",
                                    callback: e
                                }, {
                                    css: x.mail_ru.leftVideoAdd2,
                                    is: "added",
                                    callback: e
                                }, {
                                    css: x.mail_ru.spVideoAdd,
                                    is: "added",
                                    callback: t
                                }, {
                                    css: x.mail_ru.spVideoAdd2,
                                    is: "added",
                                    callback: t
                                }, {
                                    css: x.mail_ru.newSpVideoAdd,
                                    is: "added",
                                    callback: a
                                }, {
                                    css: x.mail_ru.newSpVideoAdd2,
                                    is: "added",
                                    callback: a
                                }, {
                                    css: x.mail_ru.images,
                                    is: "added",
                                    callback: e => {
                                        e.added.forEach((e => {
                                            var t = e.querySelector(".b-photo__container"), a = document.createElement("a");
                                            for (var o in _) a.style[o] = _[o];
                                            var r = i.svg.getSvg("download", "#2665a9", "13");
                                            r.style.float = "left", r.style.margin = "2px 5px 0 0";
                                            var s = document.createElement("span");
                                            s.innerText = n.A.i18n.getMessage("download"), a.appendChild(r), a.appendChild(s), 
                                            t.appendChild(a), a.addEventListener("click", (e => {
                                                e.preventDefault();
                                                var n = t.querySelector(".b-photo__image");
                                                if (n && n.src) {
                                                    var a = f.A.modify(n.src.split("/").pop());
                                                    i.download(a, n.src);
                                                }
                                            }));
                                        }));
                                    }
                                }, {
                                    css: "." + u.A.onRemoveClassName,
                                    is: "removed",
                                    callback: e => {
                                        for (var t, i = 0; t = e.removed[i]; i++) u.A.onRemoveListener(t);
                                    }
                                } ]
                            });
                        }
                    }
                }, S = {
                    tooltip: void 0,
                    updatePos: function(e, t) {
                        var n = i.getPosition(e), a = i.getSize(this.tooltip);
                        this.tooltip.style.top = n.top + t.top - a.height + "px";
                        var o = n.left + parseInt(t.width / 2) - parseInt(a.width / 2), r = document.body.clientWidth + document.body.scrollLeft;
                        r < o + a.width && (o = r - a.width), this.tooltip.style.left = o + "px";
                    },
                    show: function(e, t) {
                        var i = this;
                        return void 0 !== this.tooltip ? this.hide() : (this.tooltip = p.A.create("div", {
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
                            }, t.style),
                            on: [ "mouseenter", function(e) {
                                i.hide();
                            } ]
                        }), document.body.appendChild(this.tooltip)), this.tooltip.style.display = "block", 
                        setTimeout((function() {
                            i.updatePos(e, t), i.tooltip.style.opacity = 1;
                        })), this.tooltip;
                    },
                    hide: function() {
                        this.tooltip.style.opacity = 0, this.tooltip.style.display = "none";
                    }
                }, w = function() {
                    var e = document.title, t = e.indexOf("-");
                    return -1 !== t && (e = e.substr(0, t - 1)), f.A.modify(e);
                }, C = {
                    className: "sf-audio-panel",
                    lastRow: null,
                    style: void 0,
                    secondsFromDuration: function(e) {
                        var t = e.split(":").map((function(e) {
                            return parseInt(e);
                        }));
                        return 60 * t[0] + t[1];
                    },
                    getTitle: function(e) {
                        var t = e.querySelector(".jp__track-fullname"), i = e.querySelector(".jp__track-performer");
                        if (null === i && null !== (i = e.querySelector(".jp__track-name-text")) && null !== (i = i.querySelector("a:not(.jp__track-fullname)"))) {
                            var n = t;
                            t = i, i = n;
                        }
                        if (null !== i ? (i = i.textContent.trim()) || (i = "noname") : i = "", i ? i += " - " : i = "", 
                        null !== t) {
                            var a = i + (t = t.textContent);
                            return a = a.replace(/[\r\n\t\s]+/gim, " ").replace(/\s+/g, " ").trim();
                        }
                    },
                    getTitle2: function(e) {
                        var t = e.querySelector(".title"), i = e.querySelector(".name") || e.querySelector(".b-music__songs__row__body__inner__title__name__link"), n = e.querySelector(".author") || e.querySelector(".b-music__songs__row__body__inner__title__author");
                        i && ((i = i.textContent).length || (i = "noname")), n && (n = n.textContent);
                        return (i && n ? n + " - " + i : t ? t.textContent : "unknown").replace(/[\r\n\t\s]+/gim, " ").replace(/\s+/g, " ").trim();
                    },
                    getMp3UrlList: function(e) {
                        var t = 1, i = document.querySelectorAll(".b-music__section__content__playlist-songs .song-item");
                        0 === i.length && (i = document.querySelectorAll(".jp__track"), t = 0);
                        for (var n, a = [], o = {}, r = function(e) {
                            s = s.then((function() {
                                return new Promise((function(i) {
                                    C.getUrl(e, t, i);
                                }));
                            })).then((function(i) {
                                if (i && !o[i]) {
                                    o[i] = 1;
                                    var n = "", r = "";
                                    if (0 === t ? (n = e.querySelector(".jp__track-duration-total"), r = C.getTitle(e)) : (n = e.querySelector(".time"), 
                                    r = C.getTitle2(e)), r) {
                                        var s = f.A.modify(r) + ".mp3", l = n && C.secondsFromDuration(n.textContent);
                                        a.push({
                                            url: i,
                                            filename: s,
                                            title: r,
                                            duration: l
                                        });
                                    }
                                }
                            })).catch((function(e) {}));
                        }, s = Promise.resolve(), l = 0; n = i[l]; l++) r(n);
                        s.then((function() {
                            e(a);
                        }));
                    },
                    showListOfAudioFiles: function(e) {
                        C.getMp3UrlList((function(t) {
                            0 !== t.length && (e ? i.playlist.popupPlaylist(t, w(), !0) : i.playlist.popupFilelist(t));
                        }));
                    },
                    downloadMP3Files: function() {
                        C.getMp3UrlList((function(e) {
                            0 !== e.length && i.downloadList.showBeforeDownloadPopup(e, {
                                type: "audio",
                                folderName: w()
                            });
                        }));
                    },
                    onDlBtnOver: function(e) {
                        if (!n.A.isSafari) {
                            var t = this.dataset.duration;
                            if ("mouseenter" === e.type) {
                                var a, o = this, r = S.show(o, a = {
                                    top: -14,
                                    width: 16,
                                    style: {
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc",
                                        color: "rgb(48, 48, 48)"
                                    }
                                });
                                return o.dataset.bitrate ? (r.style.padding = "2px 5px 3px", void (r.textContent = " (" + o.dataset.size + " ~ " + o.dataset.bitrate + ")")) : o.dataset.size ? (r.style.padding = "2px 5px 3px", 
                                void (r.textContent = " (" + o.dataset.size + ")")) : (r.style.padding = "2px 2px 0 2px", 
                                r.textContent = "", r.appendChild(p.A.create("img", {
                                    src: "//my9.imgsmail.ru/r/my/preloader_circle_16.gif",
                                    height: 16,
                                    width: 16
                                })), void fetch(o.href, {
                                    method: "GET",
                                    credentials: "include"
                                }).then((e => e.headers.get("content-length"))).then((e => {
                                    if (r.style.padding = "2px 5px 3px", !e) return r.textContent = n.A.i18n.getMessage("getFileSizeFailTitle"), 
                                    void S.updatePos(o, a);
                                    var s = i.sizeHuman(e, 2);
                                    if (t) {
                                        var l = Math.floor(e / t / 125) + " " + n.A.i18n.getMessage("kbps");
                                        o.dataset.bitrate = l, o.dataset.size = s, r.textContent = " (" + s + " ~ " + l + ")";
                                    } else o.dataset.size = s, r.textContent = " (" + s + ")";
                                    S.updatePos(o, a);
                                })));
                            }
                            S.hide();
                        }
                    },
                    getUrlViaBridge: function(e, t) {
                        void 0 === C.getUrlViaBridge.index && (C.getUrlViaBridge.index = 0);
                        var i = "sf-bridge-item-" + C.getUrlViaBridge.index;
                        C.getUrlViaBridge.index++, e.classList.add(i);
                        var n = {
                            className: i
                        };
                        (0, v.A)([ n ], (function(e) {
                            var t = e.className, i = document.getElementsByClassName(t)[0];
                            i.classList.remove(t);
                            var n = jQuery(i).data();
                            if (n && n.item) return n.item.url;
                        })).then((e => t(e)));
                    },
                    getUrlById: function(e) {
                        return (0, v.A)([ e ], 'function(id){var url="";var findUrl=function findUrl(items,id){var url="";items.some(function(item){if(item._attr&&item._attr.file===id){url=item._attr.url;return true}});return url};try{url=findUrl(APP.activePage.collection.items,id)}catch(err){}try{if(!url){url=findUrl(APP.player.collection.items,id)}}catch(err){}return url}').then((e => {
                            if (!e) throw new Error("Url is not found");
                            return /^\/\//.test(e) && (e = "https:" + e), e;
                        }));
                    },
                    getUrl: function(e, t, i) {
                        var n = e.dataset.url;
                        if (n) return i(n);
                        if (0 === t) {
                            var a = e.querySelector("a.jp__track-fullname-link");
                            if (null === a) return i();
                            a = a.href;
                            var o = (0, s.A)(a);
                            return o.file && o.uid ? i("https://music.my.mail.ru/file/" + o.file + ".mp3?u=" + encodeURIComponent(o.uid)) : C.getUrlViaBridge(e, (function(t) {
                                t && (e.dataset.url = t), i(t);
                            }));
                        }
                        if (1 === t) {
                            var r = e.dataset.file;
                            return C.getUrlById(r).then((function(e) {
                                i(e);
                            }), (function() {
                                i("https://music.my.mail.ru/file/" + r + ".mp3");
                            }));
                        }
                    },
                    onDlBtnClick: function(e) {
                        e.stopPropagation(), i.downloadOnClick(e);
                    },
                    getDlLink: function(e, t, i) {
                        return p.A.create("a", {
                            data: {
                                duration: t || ""
                            },
                            href: e,
                            style: {
                                position: "relative",
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "middle"
                            },
                            download: f.A.modify(i + ".mp3"),
                            on: [ [ "mouseenter", C.onDlBtnOver ], [ "mouseleave", C.onDlBtnOver ], [ "click", this.onDlBtnClick ] ]
                        });
                    },
                    addDownloadPanelNew: function(e, t) {
                        if ((0, g.A)({
                            category: "append",
                            subcategory: "ma",
                            event: "b"
                        }), t) {
                            var i = C.getTitle2(e);
                            if (i) {
                                var n = e.querySelector(".time"), a = n && C.secondsFromDuration(n.textContent), o = this.getDlLink(t, a, i), r = p.A.create("div", {
                                    class: [ C.className, "type-2" ],
                                    append: [ o ],
                                    on: [ [ "mouseover", e => {
                                        if (b) {
                                            if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void (0, y.D)(r, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            }, {});
                                            (0, y.w)(r, {
                                                defaultWidth: 400,
                                                defaultHeight: 60
                                            }, {});
                                        }
                                    } ] ]
                                }), s = e.querySelector(".icons");
                                if (s) s.appendChild(r); else {
                                    var l = e.querySelector(".b-music__songs__row__body__inner__controls");
                                    l && (o.classList.add(this.className + "-btn"), p.A.create(r, {
                                        class: [ this.className, "type-3" ],
                                        style: {
                                            background: "none",
                                            verticalAlign: "top"
                                        },
                                        append: [ o ]
                                    }), l.appendChild(r));
                                }
                            }
                        }
                    },
                    addDownloadPanel: function(e, t) {
                        var i = e.querySelector(".jp__track-duration-total");
                        if (null !== i && void 0 !== t) {
                            var n = C.getTitle(e);
                            if (n) {
                                i = C.secondsFromDuration(i.textContent);
                                var a = p.A.create("div", {
                                    class: [ C.className, "type-0" ],
                                    append: [ this.getDlLink(t, i, n) ]
                                }), o = e.querySelector(".jp__track-management");
                                o && (o.firstChild ? o.insertBefore(a, o.firstChild) : o.appendChild(a));
                            }
                        }
                    },
                    onTrackOver: function(e, t) {
                        0 === e.getElementsByClassName(C.className).length && C.getUrl(e, t, (function(i) {
                            1 === t ? C.addDownloadPanelNew(e, i) : C.addDownloadPanel(e, i);
                        }));
                    },
                    injectStyle: function() {
                        this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = p.A.create("style", {
                            text: (0, d.A)([ {
                                selector: "." + this.className,
                                style: {
                                    display: "none",
                                    left: "22px",
                                    backgroundImage: "url(" + i.svg.getSrc("download", "#168DE2") + ")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "16px"
                                }
                            }, {
                                selector: "." + this.className + "-btn",
                                style: {
                                    backgroundImage: "url(" + i.svg.getSrc("download", "#168DE2") + ")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "16px"
                                }
                            }, {
                                selector: ".jp__track:hover ." + this.className,
                                style: {
                                    display: "block",
                                    opacity: .5
                                }
                            }, {
                                selector: ".jp__track:hover ." + this.className + ".type-0",
                                style: {
                                    display: "inline-block",
                                    marginLeft: "-16px",
                                    position: "relative",
                                    left: "-2px"
                                }
                            }, {
                                selector: ".jp__track.jp__track-plays ." + this.className,
                                style: {
                                    left: "-18px"
                                }
                            }, {
                                selector: "." + this.className + ":hover",
                                style: {
                                    opacity: "1 !important"
                                }
                            }, {
                                selector: "." + this.className + ".type-2",
                                style: {
                                    marginRight: "5px",
                                    marginLeft: "5px"
                                }
                            }, {
                                selector: ".song-item:hover ." + this.className + ".type-2",
                                style: {
                                    display: "inline-block",
                                    opacity: .5
                                }
                            }, {
                                selector: ".b-music__section__content--songs ." + this.className + ".type-3",
                                style: {
                                    marginTop: "18px"
                                }
                            }, {
                                selector: ".b-music__section__content--songs .b-music__songs--inline ." + this.className + ".type-3",
                                style: {
                                    marginTop: "9px"
                                }
                            } ])
                        }), document.head.appendChild(this.style));
                    },
                    rmBtn: function() {
                        C.style && (C.style.parentNode.removeChild(C.style), C.style = void 0);
                        for (var e, t = document.querySelectorAll("." + C.className), i = 0; e = t[i]; i++) e.parentNode.removeChild(e);
                    }
                }, M = {
                    btnIndex: 0,
                    domCache: {},
                    className: "sf-video-btn",
                    prepareLinks: function(e) {
                        for (var t, i = [], n = 0; t = e[n]; n++) {
                            var a = t.url, o = "FLV";
                            -1 !== a.indexOf(".mp4") && (o = "MP4"), -1 !== a.indexOf(".mov") && (o = "MOV"), 
                            -1 !== a.indexOf(".mpg") && (o = "MPG"), t.quality || (t.quality = "-?-");
                            var r = t.quality.toUpperCase(), s = [ "1080P", "720P", "480P", "360P", "272P" ].indexOf(r);
                            -1 !== s && (r = [ "1080", "720", "480", "360", "272" ][s]);
                            var l = o.toLowerCase(), d = {
                                href: a,
                                title: t.title,
                                ext: l,
                                format: o,
                                quality: r,
                                forceDownload: !0
                            };
                            i.push(d);
                        }
                        if (0 !== i.length) return i;
                    },
                    showLinkList: function(e, t, a) {
                        if (e || (e = n.A.i18n.getMessage("noLinksFound")), a) {
                            if (!A.contextMenu) return;
                            return e.map((e => (e.noSize = n.A.isFirefox, e))), void A.contextMenu.update(e);
                        }
                        A.contextMenu && A.contextMenu.isShow ? A.hideMenu() : A.contextMenu = i.popupMenu.quickInsert(t, e, "video-links-popup", {
                            parent: (0, r.A)(t, "b-video__main")
                        });
                    },
                    appendPageBtn: function(e, t, a) {
                        if (null === e.querySelector("." + M.className)) {
                            (0, g.A)({
                                category: "append",
                                subcategory: "ma",
                                event: "b"
                            });
                            var o = null, r = p.A.create("span", {
                                class: M.className,
                                append: [ o = p.A.create("a", {
                                    data: {
                                        index: t
                                    },
                                    href: "#",
                                    on: [ "click", function(e) {
                                        e.preventDefault(), u.A.onRemoveEvent(this, A.hideMenu), M.readDomCache(this.dataset.index, this);
                                    } ]
                                }) ]
                            });
                            if (1 === a ? (o.style.marginLeft = "15px", o.textContent = n.A.i18n.getMessage("download")) : 2 === a && (p.A.create(o, {
                                style: {
                                    fontSize: 0,
                                    lineHeight: 0,
                                    padding: "6px",
                                    boxShadow: "inset 0 0 0 1px #ccc",
                                    borderRadius: "3px",
                                    display: "inline-block"
                                }
                            }), o.appendChild(i.svg.getSvg("download", "#666", 18, 18))), 2 === a) e.appendChild(r); else if (1 === a) {
                                var s = e.lastChild;
                                e.insertBefore(r, s), s = null;
                            }
                        }
                    },
                    appendBtn: function(e, t) {
                        if (null === e.querySelector("." + M.className)) {
                            var i = void 0, a = {};
                            e.childNodes.length > 1 ? i = e.childNodes[1] : (i = e.lastChild, a.marginRight = "5px");
                            var o = p.A.create("span", {
                                class: e.lastChild.getAttribute("class") + " " + M.className,
                                append: [ p.A.create("a", {
                                    data: {
                                        index: t
                                    },
                                    text: n.A.i18n.getMessage("download"),
                                    href: "#",
                                    on: [ "click", function(e) {
                                        e.preventDefault(), u.A.onRemoveEvent(this, A.hideMenu), M.readDomCache(this.dataset.index, this);
                                    } ],
                                    style: a
                                }) ]
                            });
                            e.insertBefore(o, i), i = null;
                        }
                    },
                    readDomCache: function(e, t) {
                        M.showLinkList(n.A.i18n.getMessage("download"), t);
                        var a = function() {
                            M.showLinkList(void 0, t, 1);
                        }, r = function(e) {
                            if ("getRutubeLinks" === e.action) {
                                if (!o.showUmmyItem) return a();
                                M.showLinkList(i.popupMenu.prepareLinks.rutube(e.links), t, 1);
                            } else "getMailruLinks" === e.action ? M.showLinkList(i.popupMenu.prepareLinks.mailru(e.links, e.title), t, 1) : M.showLinkList(M.prepareLinks(e.links), t, 1);
                        }, s = M.domCache[parseInt(e)];
                        if (s.links) r(s); else if (s.metadataUrl) {
                            var l = s.metadataUrl;
                            /^\/\//.test(l) && (l = "http:" + l);
                            (0, c.A)({
                                url: l,
                                withCredentials: !0,
                                json: !0,
                                localXHR: !0
                            }, (function(e, t) {
                                var i;
                                (i = e ? null : t.body) && "object" == typeof i ? M.readMeta(i, (function(e) {
                                    e.links ? (s.links = e.links, s.action = e.action, r(s)) : a();
                                })) : a();
                            }));
                        } else s.url ? n.A.sendMessage({
                            action: "getMailruLinks",
                            extVideoId: s.url
                        }, (function(e) {
                            e.links ? (s.title = e.title, s.links = e.links, s.action = e.action, r(s)) : a();
                        })) : a();
                    },
                    readMeta: function(e, t) {
                        var i, a = [];
                        if ("UPLOADED" === e.provider) {
                            if (i = e.movie ? e.movie.title : void 0, !e.videos) return t();
                            e.videos.forEach((function(e) {
                                a.push({
                                    quality: e.name,
                                    url: e.url,
                                    title: i
                                });
                            }));
                        }
                        if ("ugc" === e.provider) {
                            if (i = e.meta ? e.meta.title : void 0, !e.videos) return t();
                            e.videos.forEach((function(e) {
                                a.push({
                                    quality: e.key,
                                    url: e.url,
                                    title: i
                                });
                            }));
                        }
                        return "pladform" === e.provider ? (i = e.meta ? e.meta.title : void 0, void n.A.sendMessage({
                            action: "getPladformVideo",
                            extVideoId: {
                                playerId: e.meta.playerId,
                                videoId: e.meta.videoId
                            }
                        }, (function(e) {
                            if (!e) return t();
                            var n = e.links;
                            if (!n) return t();
                            n.forEach((function(e) {
                                "object" == typeof e && void 0 === e.title && (e.title = i);
                            })), t(e);
                        }))) : 0 === a.length ? t() : t({
                            links: a
                        });
                    },
                    getFlashVars: function(e) {
                        if (e) {
                            var t = e.querySelector('param[name="flashvars"]');
                            if (t) {
                                var i = t.value, n = (0, s.A)(i, {
                                    params: !0
                                });
                                return n.metadataUrl ? {
                                    metadataUrl: n.metadataUrl
                                } : void 0;
                            }
                        }
                    },
                    matchUrl: function(e) {
                        var t = e.match(/\/([^\/]+)\/([^\/]+)\/video\/(.+).html/);
                        return t || (t = e.match(/embed\/([^\/]+)\/([^\/]+)\/(.+).html/)), t;
                    },
                    getVideoId: function(e) {
                        "OBJECT" !== e.tagName && (e = e.querySelector('object[name="b-video-player"]'));
                        var t = this.getFlashVars(e);
                        if (t) return t;
                        var i = document.querySelector('[data-type="album-json"]');
                        if (i) try {
                            if ((i = JSON.parse(i.textContent)).signVideoUrl) return {
                                metadataUrl: i.signVideoUrl
                            };
                        } catch (e) {}
                        var n = this.matchUrl(location.pathname);
                        return n ? {
                            metadataUrl: "http://api.video.mail.ru/videos/" + n[1] + "/" + n[2] + "/" + n[3] + ".json"
                        } : void 0;
                    },
                    getVideoContentVideoId: function(e) {
                        var t = null, i = e.querySelector(".sp-video__item-page-new__share__item[data-share-type][data-location]");
                        return i && (t = {
                            url: i.dataset.location
                        }), t;
                    },
                    insertBtnInPage: function(e, t, i) {
                        e.metadataUrl ? (e.metadataUrl = decodeURIComponent(e.metadataUrl), M.domCache[M.btnIndex] = {
                            metadataUrl: e.metadataUrl
                        }) : M.domCache[M.btnIndex] = Object.assign({}, e), M.appendPageBtn(t, M.btnIndex, i), 
                        M.btnIndex++;
                    },
                    insertBtnInPopup: function(e, t) {
                        e.metadataUrl && (e.metadataUrl = decodeURIComponent(e.metadataUrl), M.domCache[M.btnIndex] = {
                            metadataUrl: e.metadataUrl
                        }), M.appendBtn(t, M.btnIndex), M.btnIndex++;
                    },
                    rmBtn: function() {
                        for (var e, t = document.querySelectorAll("." + M.className), i = 0; e = t[i]; i++) e.parentNode.removeChild(e);
                    }
                };
            }));
        }
    }, i = {};
    function n(e) {
        var a = i[e];
        if (void 0 !== a) return a.exports;
        var o = i[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(o.exports, o, o.exports, n), o.exports;
    }
    n.m = t, e = [], n.O = (t, i, a, o) => {
        if (!i) {
            var r = 1 / 0;
            for (c = 0; c < e.length; c++) {
                for (var [i, a, o] = e[c], s = !0, l = 0; l < i.length; l++) (!1 & o || r >= o) && Object.keys(n.O).every((e => n.O[e](i[l]))) ? i.splice(l--, 1) : (s = !1, 
                o < r && (r = o));
                if (s) {
                    e.splice(c--, 1);
                    var d = a();
                    void 0 !== d && (t = d);
                }
            }
            return t;
        }
        o = o || 0;
        for (var c = e.length; c > 0 && e[c - 1][2] > o; c--) e[c] = e[c - 1];
        e[c] = [ i, a, o ];
    }, n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t;
    }, n.d = (e, t) => {
        for (var i in t) n.o(t, i) && !n.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
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
    }, n.j = 889, (() => {
        n.b = document.baseURI || self.location.href;
        var e = {
            889: 0
        };
        n.O.j = t => 0 === e[t];
        var t = (t, i) => {
            var a, o, [r, s, l] = i, d = 0;
            if (r.some((t => 0 !== e[t]))) {
                for (a in s) n.o(s, a) && (n.m[a] = s[a]);
                if (l) var c = l(n);
            }
            for (t && t(i); d < r.length; d++) o = r[d], n.o(e, o) && e[o] && e[o][0](), e[o] = 0;
            return n.O(c);
        }, i = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        i.forEach(t.bind(null, 0)), i.push = t.bind(null, i.push.bind(i));
    })(), n.nc = void 0;
    var a = n.O(void 0, [ 223 ], (() => n(7934)));
    a = n.O(a);
})();