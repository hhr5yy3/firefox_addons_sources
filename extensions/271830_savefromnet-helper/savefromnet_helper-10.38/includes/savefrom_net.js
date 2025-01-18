(() => {
    "use strict";
    var e, t = {
        6518: (e, t, r) => {
            var i = r(9242), s = r(9620), a = r(9589), n = r(7736), o = r(8244), l = r(4733), u = r(6810), d = r(9022), c = r(1460), m = r(7661), f = r(188), h = r(1853), p = r(172), b = r(3434);
            d.A.isSingle() && (0, a.Ys)("savefrom", (function(e, t) {
                var r = (0, s.A)(t), a = t.preferences, n = t.preferences.selectorsConfig;
                i.A.onMessage.addListener((function(e, t, r) {
                    "updatePreferences" !== e.action || Object.assign(a, e.preferences);
                })), setTimeout((() => d.run()));
                var d = {
                    name: e,
                    scriptId: "savefrom__ext_script",
                    dataAttr: "data-extension-disabled",
                    attrObservers: [],
                    run: function() {
                        if (d.setExtParams(), location.href.search(/\/(update-helper|userjs-setup)\.php/i) > -1) {
                            var e = document.getElementById("js-not-remind");
                            e && e.addEventListener("click", (function(e) {
                                0 === e.button && i.A.sendMessage({
                                    action: "hideUserjsMigrationInfo"
                                });
                            }));
                        } else c.A.isAvailable() && this.mutationMode.enable();
                    },
                    mutationMode: {
                        observer: null,
                        stop: function() {
                            this.observer && this.observer.stop();
                        },
                        enable: function() {
                            if (this.observer) return this.observer.start();
                            this.observer = new c.A({
                                queries: [ {
                                    css: n.savefrom.formAdd,
                                    is: "added",
                                    callback: e => {
                                        for (var t, r = 0; t = e.added[r]; r++) d.waitFormId(t), d.mutationMode.stop();
                                    }
                                }, {
                                    css: n.savefrom.muxer,
                                    is: "added",
                                    callback: e => {
                                        e.added.forEach((e => {
                                            e.removeAttribute("download"), e.dataset.watched || (e.dataset.watched = "1", e.addEventListener("click", (t => {
                                                t.preventDefault();
                                                var r = JSON.parse(e.dataset.sources);
                                                (0, h.A)((0, p.n)(b.Ay, r), "sf-muxer-parent");
                                            })));
                                        }));
                                    }
                                } ]
                            });
                        }
                    },
                    waitFormId(e) {
                        var t = new m.A({
                            attrs: [ {
                                name: "id",
                                callback: t => {
                                    "sf_form" === t.value && (d.bindForm(e), this.attrObservers.splice(0).forEach((e => e.stop())));
                                }
                            } ],
                            target: e
                        });
                        this.attrObservers.push(t);
                    },
                    bindForm(e) {
                        e.addEventListener("submit", (function(t) {
                            var s = e.sf_url.value;
                            if (s && "1" != e.getAttribute(d.dataAttr)) {
                                var a = {
                                    getVKLinks: [ /^https?:\/\/(?:[a-z]+\.)?(?:vk\.com|vkontakte\.ru)\/(video-?\d+_-?\d+)/i, /^https?:\/\/(?:[a-z]+\.)?(?:vk\.com|vkontakte\.ru)\/video_ext.php\?(.*oid=-?\d+.*)$/i, /^https?:\/\/(?:[a-z]+\.)?(?:vk\.com|vkontakte\.ru)\/[\w\-\.]+\?.*z=(video-?\d+_-?\d+)/i ],
                                    getYoutubeLinks: [ /^https?:\/\/(?:[a-z]+\.)?youtube\.com\/(?:#!?\/)?watch\?.*v=([\w\-]+)/i, /^https?:\/\/(?:[a-z0-9]+\.)?youtube\.com\/(?:embed|v)\/([\w\-]+)/i, /^https?:\/\/(?:[a-z]+\.)?youtu\.be\/([\w\-]+)/i ],
                                    getVimeoLinks: [ /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/(?:\w+\#)?(\d+)/i, /^https?:\/\/player\.vimeo\.com\/video\/(\d+)/i, /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/channels\/(?:[^\/]+)\/(\d+)$/i, /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/[^\/]+\/review\/(\d+)\/(?:\d+)/i ],
                                    getDailymotionLinks: [ /^http:\/\/(?:www\.)?dai\.ly\/([a-z0-9]+)_?/i, /^https?:\/\/(?:[\w]+\.)?dailymotion\.com(?:\/embed|\/swf)?\/video\/([a-z0-9]+)_?/i ],
                                    getFacebookLinks: [ /^https?:\/\/(?:[\w]+\.)?facebook\.com(?:\/video)?\/video.php.*[?&]{1}v=([0-9]+).*/i, /^https?:\/\/(?:[\w]+\.)?facebook\.com\/.+\/videos(?:\/\w[^\/]+)?\/(\d+)/i ],
                                    getMailruLinks: [ /^https?:\/\/my\.mail\.ru\/([^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\.html).*/i, /^https?:\/\/videoapi\.my\.mail\.ru\/videos\/(embed\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\.html).*/i ]
                                };
                                for (var n in a) for (var o = 0; o < a[n].length; o++) {
                                    var l = s.match(a[n][o]);
                                    if (l && l.length > 1) {
                                        l = l[1];
                                        var u = r.getMatchFirst(s, /list=([\w\-]+)/i);
                                        t.preventDefault(), t.stopPropagation();
                                        var c = {
                                            extVideoId: l,
                                            action: n,
                                            checkSubtitles: !0,
                                            checkLinks: !0
                                        };
                                        return "getVimeoLinks" === n && (c.url = s), i.A.sendMessage(c, (function(e) {
                                            d.setLinks(e.action, e.extVideoId, e.links, e.title, null, e.subtitles, u, e.duration, e.thumb, e.checkLinks);
                                        })), !1;
                                    }
                                }
                            }
                        }), !1), document.body.addEventListener("click", (function(e) {
                            var t = e.target;
                            if ("I" === t.tagName && t.classList.contains("file-info-btn")) d.onInfoBtnClick.call(t, e); else {
                                if ("A" != t.tagName) {
                                    if ("A" != t.parentNode.tagName) return;
                                    t = t.parentNode;
                                }
                                if ((i.A.isChrome || i.A.isFirefox || i.A.isGM) && t.classList.contains("link-download") && !t.classList.contains("disabled") && t.getAttribute("download")) return t.classList.contains("ga_track_events") && t.getAttribute("data-ga-event") && o.A.trigger(t, "sendstats", {
                                    bubbles: !0,
                                    cancelable: !1
                                }), r.downloadOnClick(e, null, {
                                    withoutPropagation: !0
                                });
                                var s = t.getAttribute("data-video-id");
                                if (s && "1" != t.getAttribute(d.dataAttr)) {
                                    var a = {
                                        vk: "getVKLinks",
                                        yt: "getYoutubeLinks"
                                    };
                                    if (2 == (s = s.split(":", 2)).length && a[s[0]]) {
                                        e.preventDefault(), e.stopPropagation(), t.style.display = "none", t.id || (t.id = s[0] + "_" + s[1] + "_" + 1e3 * Math.random() + "_" + (new Date).getTime());
                                        var n = {
                                            extVideoId: s[1],
                                            action: a[s[0]],
                                            checkSubtitles: !0,
                                            checkLinks: !0
                                        };
                                        return i.A.sendMessage(n, (function(e) {
                                            d.setLinks(e.action, e.extVideoId, e.links, e.title, t, e.subtitles, null, e.duration, e.thumb, e.checkLinks);
                                        })), !1;
                                    }
                                }
                            }
                        }), !0);
                    },
                    onInfoBtnClick: function(e) {
                        if (e.preventDefault(), e.stopPropagation(), !this.classList.contains("sf-clicked")) {
                            this.classList.add("sf-clicked");
                            var t = "sf-btn" + function() {
                                for (var e = Date.now(), t = e; e === t; ) t = Date.now();
                                return t;
                            }();
                            this.classList.add(t);
                            var s = function() {
                                var e = document.getElementsByClassName("sf-script")[0];
                                void 0 !== e && e.parentNode.removeChild(e);
                            };
                            s(), document.body.appendChild(l.A.create("script", {
                                class: "sf-script",
                                text: '(function(btnClassName){try{var btn=document.getElementsByClassName(btnClassName);var $btn=$(btn);$btn.unbind("click").removeAttr("onclick").addClass("active");if(btn.onclick){btn.onclick=null}var parent=$btn.closest(".result-box").find(".meta")[0];if(!parent){return}var boxId="file_info"+btnClassName;var box=sf.append(parent,"div",{"id":boxId,"class":"media-info"});sf.append(box,"span",{id:boxId+"_busy"});sf.busy(boxId+"_busy",true)}catch(err){}})(' + JSON.stringify(t) + ")"
                            }));
                            var a = this.nextElementSibling.href, n = this.nextElementSibling.textContent;
                            i.A.sendMessage({
                                action: "getFileSize",
                                url: a
                            }, (function(e) {
                                var a = e.fileSize, o = {
                                    size: {
                                        name: {
                                            trans: i.A.i18n.getMessage("size")
                                        },
                                        value: r.sizeHuman(a)
                                    }
                                };
                                s(), document.body.appendChild(l.A.create("script", {
                                    class: "sf-script",
                                    text: '(function(btnClassName,title,json){try{var busy=document.getElementById("file_info"+btnClassName+"_busy");$(busy).slideUp();var btn=document.getElementsByClassName(btnClassName);sf.fileInfo.show(json,title,btn,busy.parentNode)}catch(err){}})(' + [ JSON.stringify(t), JSON.stringify(n), JSON.stringify(o) ].join(",") + ")"
                                }));
                            }));
                        }
                    },
                    setExtParams: function() {
                        var e = l.A.create("script", {
                            id: "savefrom__ext_params",
                            type: "text/javascript"
                        }), t = {
                            id: a.sfHelperName,
                            version: a.version,
                            enable: 1
                        };
                        e.textContent = '(function(json){try{if(window.setBrowserExtension&&typeof setBrowserExtension=="function"){setBrowserExtension(json)}}catch(err){}})(' + JSON.stringify(t) + ")", 
                        document.body.appendChild(e);
                    },
                    setLinks: function(e, t, r, i, s, a, n, o, l, u) {
                        if (!1 !== u) switch (e) {
                          case "getYoutubeLinks":
                            d.setYoutubeLinks(t, r, i, s, a, n, o, l);
                            break;

                          case "getVKLinks":
                            d.setVKLinks(t, r, i, s, o, l);
                            break;

                          case "getVimeoLinks":
                            d.setVimeoLinks(t, r, i, s, o, l);
                            break;

                          case "getDailymotionLinks":
                            d.setDailymotionLinks(t, r, i, s, o, l);
                            break;

                          case "getFacebookLinks":
                            d.setFacebookLinks(t, r, i, s, o, l);
                            break;

                          case "getMailruLinks":
                            d.setMailruLinks(t, r, i, s, o, l);
                        } else d.handleError(s);
                    },
                    handleError: function(e) {
                        if (e) e && (e.style.display = "", e.setAttribute(d.dataAttr, "1"), e.click()); else {
                            var t = document.getElementById("sf_form");
                            t && (t.setAttribute(d.dataAttr, "1"), t.submit(), t.removeAttribute(d.dataAttr));
                        }
                    },
                    showVideoResult: function(e, t) {
                        e && e.url && e.url.length ? (0, f.A)([ t && t.id, e ], ((e, t) => {
                            if (e) {
                                var r = document.getElementById(e);
                                sf.result.replaceAjaxResult(t, !0, !0, r);
                            } else sf.finishRequest(!0), sf.videoResult.show(t);
                        })) : d.handleError(t);
                    },
                    setVKLinks: function(e, t, i, s, a, n) {
                        if (e && t) {
                            var o = {
                                id: e,
                                url: t,
                                hosting: "vk.com (h)",
                                meta: {
                                    title: i ? u.A.modify(i) : "download",
                                    source: "http://vk.com/" + e,
                                    duration: r.secondsToDuration(a)
                                }
                            };
                            n && (o.thumb = n);
                            for (var l = 0; l < o.url.length; l++) o.url[l].info_url = "#", !o.url[l].ext && o.url[l].type && (o.url[l].ext = o.url[l].type), 
                            o.sd || o.url[l].subname ? !o.hd && o.url[l].subname && parseInt(o.url[l].subname) >= 720 && (o.hd = {
                                url: o.url[l].url
                            }) : o.sd = {
                                url: o.url[l].url
                            };
                            d.showVideoResult(o, s);
                        } else d.handleError(s);
                    },
                    setYoutubeLinks(e, t, s, a, n, o, l) {
                        if (!e || !t) return d.handleError(a);
                        var c = {
                            id: e,
                            url: [],
                            hosting: "101 (h)",
                            meta: {
                                title: s ? u.A.modify(s) : "download",
                                source: e ? "http://youtube.com/watch?v=" + e : "",
                                duration: r.secondsToDuration(l)
                            },
                            thumb: e ? "http://i.ytimg.com/vi/" + e + "/hqdefault.jpg" : ""
                        }, m = !1;
                        r.video.yt.init();
                        var f = t.meta || {}, h = r.video.yt.format;
                        for (var p in h) {
                            var b = h[p];
                            for (var v in b) {
                                var g = f[v] || {};
                                if (t[v]) {
                                    !m && t[v].search(/(\?|&)sig(nature)?=/i) > -1 && (m = !0);
                                    var y = b[v].quality;
                                    g.quality && (y = g.quality);
                                    var k = {
                                        url: t[v],
                                        name: p,
                                        subname: y,
                                        info_url: "#",
                                        type: p,
                                        quality: y,
                                        attr: {}
                                    };
                                    b[v].sFps && (k.subname += " " + (g.fps || 60)), [ "Audio AAC", "Audio Vorbis", "Audio Opus" ].includes(p) && (k.attr.style = "white-space: nowrap;");
                                    var w = {
                                        "Audio AAC": {
                                            type: "AAC",
                                            ext: "aac"
                                        },
                                        "Audio Vorbis": {
                                            type: "Vorbis",
                                            ext: "webm"
                                        },
                                        "Audio Opus": {
                                            type: "Opus",
                                            ext: "webm"
                                        }
                                    };
                                    b[v]["3d"] ? (k.name = "3D " + k.name, k["3d"] = !0) : b[v].noAudio ? (k.group = "MP4 ", 
                                    k.attr.class = "no-audio") : w[p] ? k = Object.assign({}, k, w[p]) : ("flv" !== p.toLowerCase() || c.sd || (c.sd = {
                                        url: t[v]
                                    }), parseInt(y) >= 720 && c.sd && !c.hd && (c.hd = {
                                        url: t[v]
                                    })), void 0 === k.ext && k.type && (k.ext = k.type.toLowerCase()), c.url.push(k), 
                                    delete t[v];
                                }
                            }
                        }
                        if (m) {
                            if (n && n.length > 0) {
                                var A = e.replace(/[^\w]/, "_"), x = "yt_subs_btn_" + A;
                                A = "yt_subs_" + A;
                                var L = c.meta.title ? btoa(r.utf8Encode(c.meta.title)) : "";
                                c.action = [], c.action.push({
                                    name: i.A.i18n.getMessage("subtitles"),
                                    attr: {
                                        id: x,
                                        href: "#"
                                    },
                                    bind: {
                                        click: {
                                            fn: 'sf.youtubeSubtitles("{vid}","{subsId}","{btnId}","{subtToken}","{subsTitle}")'.replace("{vid}", e).replace("{subsId}", A).replace("{btnId}", "#" + x).replace("{subtToken}", "extension").replace("{subsTitle}", L)
                                        }
                                    }
                                });
                            }
                            if (!c.url.find((e => {
                                var t = "MP4" === e.type.toLowerCase() && parseInt(e.quality) >= 720;
                                return (!e.attr || "no-audio" !== e.attr.class) && t;
                            })) && t.meta && t.meta.muxer) {
                                var _ = t.meta.muxer;
                                c.url.push({
                                    ext: _.mmProps.format,
                                    type: _.mmProps.format.toUpperCase(),
                                    url: "#muxer",
                                    name: "MP4",
                                    subname: _.quality,
                                    info_url: "#",
                                    quality: _.quality,
                                    attr: {
                                        "data-sources": JSON.stringify(_.mmProps)
                                    }
                                });
                            }
                            d.showVideoResult(c, a);
                        } else d.handleError(a);
                    },
                    setVimeoLinks: function(e, t, i, s, a, n) {
                        if (e && t) {
                            t && Array.isArray(t) && (t = t.sort(((e, t) => {
                                var r = parseInt(e.height), i = parseInt(t.height);
                                return isNaN(r) && isNaN(i) ? 0 : isNaN(r) ? -1 : isNaN(i) ? 1 : r > i ? -1 : r === i ? 0 : 1;
                            })));
                            var o = {
                                id: e,
                                url: t,
                                hosting: "vimeo.com (h)",
                                meta: {
                                    title: i ? u.A.modify(i) : "download",
                                    source: "http://vimeo.com/" + e,
                                    duration: r.secondsToDuration(a)
                                }
                            };
                            n && (o.thumb = n);
                            for (var l = 0; l < o.url.length; l++) o.url[l].info_url = "#", !o.url[l].ext && o.url[l].type && (o.url[l].ext = o.url[l].type), 
                            o.sd || "SD" != o.url[l].name ? o.hd || "HD" != o.url[l].name || (o.hd = {
                                url: o.url[l].url
                            }) : o.sd = {
                                url: o.url[l].url
                            };
                            d.showVideoResult(o, s);
                        } else d.handleError(s);
                    },
                    setDailymotionLinks: function(e, t, i, s, a, n) {
                        if (e && t) {
                            var o = t.filter((function(e) {
                                if (!e.extra) return !0;
                            }));
                            o = o.map((e => {
                                if (e.ext && e.name) {
                                    var t = e.name.match(/\d+x(\d+)/);
                                    t && t[1] && (e.name = e.ext.toUpperCase() + " " + (t && t[1]));
                                }
                                return e;
                            }));
                            var l = {
                                id: e,
                                url: o,
                                hosting: "dailymotion.com (h)",
                                meta: {
                                    title: i ? u.A.modify(i) : "download",
                                    source: "http://dai.ly/" + e,
                                    duration: r.secondsToDuration(a)
                                }
                            };
                            n && (l.thumb = n);
                            for (var c, m = 0, f = 0, h = 0; c = o[h]; h++) c.info_url = "#", c.height >= 720 ? m < c.height && (l.hd = {
                                url: c.url
                            }, m = c.height) : f < c.height && (l.sd = {
                                url: c.url
                            }, f = c.height), delete c.height;
                            d.showVideoResult(l, s);
                        } else d.handleError(s);
                    },
                    setFacebookLinks: function(e, t, i, s, a, n) {
                        if (e && t) {
                            var o = {
                                id: e,
                                url: t,
                                hosting: "facebook.com (h)",
                                meta: {
                                    title: i ? u.A.modify(i) : "download",
                                    source: "https://facebook.com/video.php?v=" + e,
                                    duration: r.secondsToDuration(a)
                                }
                            };
                            n && (o.thumb = n);
                            for (var l, c = 0; l = t[c]; c++) l.info_url = "#", "SD" === l.name ? o.sd = {
                                url: l.url
                            } : "HD" === l.name && (o.hd = {
                                url: l.url
                            }), l.subname = l.name, l.name = l.ext;
                            d.showVideoResult(o, s);
                        } else d.handleError(s);
                    },
                    setMailruLinks: function(e, t, i, s, a, n) {
                        if (e && t) {
                            var o = {
                                id: e,
                                url: t,
                                hosting: "mail.ru (h)",
                                meta: {
                                    title: i ? u.A.modify(i) : "download",
                                    source: "http://my.mail.ru/" + e,
                                    duration: r.secondsToDuration(a)
                                }
                            };
                            n && (o.thumb = n);
                            for (var l, c = 0, m = 0; l = o.url[m]; m++) l.info_url = "#", isNaN(parseInt(l.subname)) ? "sd" === l.subname.toLowerCase() ? o.sd = {
                                url: l.url
                            } : "hd" === l.subname.toLowerCase() && (o.hd = {
                                url: l.url
                            }) : (c < l.subname && l.subname < 720 && (o.sd = {
                                url: l.url
                            }, c = l.subname), !o.hd && l.subname >= "720" && (o.hd = {
                                url: l.url
                            }));
                            d.showVideoResult(o, s);
                        } else d.handleError(s);
                    }
                };
            }), (function() {
                return (0, n.A)() ? i.A.isGM && -1 !== location.href.indexOf("/tools/helper-check.html") : [ "/faq.php", "/advertising.php", "/EULA.html", "/terms.html", "/privacy-policy.html", "/apk", "/webmaster.php" ].every((e => -1 === location.href.indexOf(e)));
            }));
        }
    }, r = {};
    function i(e) {
        var s = r[e];
        if (void 0 !== s) return s.exports;
        var a = r[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(a.exports, a, a.exports, i), a.exports;
    }
    i.m = t, e = [], i.O = (t, r, s, a) => {
        if (!r) {
            var n = 1 / 0;
            for (d = 0; d < e.length; d++) {
                for (var [r, s, a] = e[d], o = !0, l = 0; l < r.length; l++) (!1 & a || n >= a) && Object.keys(i.O).every((e => i.O[e](r[l]))) ? r.splice(l--, 1) : (o = !1, 
                a < n && (n = a));
                if (o) {
                    e.splice(d--, 1);
                    var u = s();
                    void 0 !== u && (t = u);
                }
            }
            return t;
        }
        a = a || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > a; d--) e[d] = e[d - 1];
        e[d] = [ r, s, a ];
    }, i.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return i.d(t, {
            a: t
        }), t;
    }, i.d = (e, t) => {
        for (var r in t) i.o(t, r) && !i.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        });
    }, i.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), i.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, i.j = 592, (() => {
        i.b = document.baseURI || self.location.href;
        var e = {
            592: 0
        };
        i.O.j = t => 0 === e[t];
        var t = (t, r) => {
            var s, a, [n, o, l] = r, u = 0;
            if (n.some((t => 0 !== e[t]))) {
                for (s in o) i.o(o, s) && (i.m[s] = o[s]);
                if (l) var d = l(i);
            }
            for (t && t(r); u < n.length; u++) a = n[u], i.o(e, a) && e[a] && e[a][0](), e[a] = 0;
            return i.O(d);
        }, r = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        r.forEach(t.bind(null, 0)), r.push = t.bind(null, r.push.bind(r));
    })(), i.nc = void 0;
    var s = i.O(void 0, [ 223 ], (() => i(6518)));
    s = i.O(s);
})();