(() => {
    "use strict";
    var e, t = {
        4853: (e, t, r) => {
            var n = r(467), a = r(4756), o = r.n(a), i = r(9242), s = r(9022), c = r(9589), l = r(1460), d = r(8233), u = r(1853), p = r(172), v = r(5751), h = r(9191), f = "https://gql.twitch.tv/gql", g = "kimne78kx3ncx6brgo4mv6wki5h1ko";
            const m = function(e) {
                return function(e) {
                    var t = {
                        operationName: "PlaybackAccessToken_Template",
                        variables: {
                            vodID: e,
                            login: "",
                            isLive: !1,
                            isVod: !0,
                            playerType: "site"
                        },
                        query: 'query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {\n  streamPlaybackAccessToken(\n    channelName: $login\n    params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}\n  ) @include(if: $isLive) {\n    value\n    signature\n    __typename\n  }\n  videoPlaybackAccessToken(\n    id: $vodID\n    params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}\n  ) @include(if: $isVod) {\n    value\n    signature\n    __typename\n  }\n}\n'
                    };
                    return (0, v.A)({
                        url: f,
                        method: "POST",
                        headers: {
                            "client-id": g
                        },
                        json: !0,
                        data: JSON.stringify(t)
                    }).then((t => {
                        if (!t.body || !t.body.data || !t.body.data.videoPlaybackAccessToken) throw new Error("Response not valid");
                        var r = t.body.data.videoPlaybackAccessToken;
                        if (!r.signature || !r.value) throw new Error("Signature or Value not found for video " + e);
                        return r;
                    }));
                }(e).then((t => {
                    var r = t.signature, n = t.value, a = `https://usher.ttvnw.net/vod/${e}.m3u8?sig=${r}&supported_codecs=avc1&token=${n}&cdm=wv&player_version=0.9.80`;
                    return (0, v.A)(a);
                })).then((e => {
                    var t = new RegExp('(https.*?)\\n#EXT-X-MEDIA.*?NAME="(.*?)"', "g");
                    return (0, h.H)(e.body, t).map((e => ({
                        url: e[1],
                        quality: parseInt(e[2])
                    })));
                }));
            };
            var y = r(3434), b = r(6810), w = r(9620), A = r(4689), k = r(7445), T = (0, d.A)("twitch"), _ = void 0, x = "twitch", S = e => e.dataset.sfLock = "";
            class E {
                constructor() {
                    this._unmount = void 0, this._hasEvents = !1;
                }
                start() {
                    T.log("start"), i.A.callFn("getPreferences").then((e => {
                        _ = (0, w.A)({
                            preferences: e
                        }), this.preferences = e, this.isActive = Boolean(e.moduleTwitch), this._bindEvents(), 
                        e.moduleTwitch && this._bindMutationWatcher();
                    }));
                }
                onFoundToolbar(e) {
                    if (e || !e.parentElement) {
                        e = e.parentElement;
                        var t = {
                            style: {
                                background: "rgb(145, 71, 255)",
                                padding: "5px 8px",
                                borderRadius: "4px",
                                paddingLeft: "10px",
                                paddingRight: "11px",
                                cursor: "pointer",
                                marginLeft: "9px",
                                marginRight: /\/clip\//.test(location.href) || document.querySelector('[data-a-target="login-button"]') ? "60px" : 0,
                                top: 0,
                                position: "absolute",
                                left: "-49px"
                            },
                            href: "#",
                            title: i.A.i18n.getMessage("download")
                        };
                        if (/videos\/\d+/.test(location.href)) t.onClick = this.handleDownloadStream.bind(this); else {
                            if (!/\/clip\//.test(location.href)) return void T.error("media type not found");
                            t.onClick = e => this.handleDownloadClip(e);
                        }
                        this._unmount = (0, u.A)((0, p.n)("a", t, (0, p.n)("img", {
                            src: _.svg.getSrc("download", "#fff", "8px"),
                            style: {
                                width: "14px",
                                marginTop: "2px",
                                opacity: .8
                            }
                        })), e);
                    }
                }
                handleDownloadStream(e) {
                    e.preventDefault(), e.stopPropagation(), i.A.sendMessage({
                        action: "checkAndOpenProLanding"
                    });
                    var t = location.href.match(/videos\/(\d+)/), r = t && t[1] ? t[1] : void 0, n = this.getVideoName();
                    return m(r).then((e => {
                        var t = e.find((e => e.quality <= 720));
                        (0, u.A)((0, p.n)(y.Ay, {
                            filename: n,
                            format: "mp4",
                            sources: [ {
                                url: t.url,
                                format: "mp4"
                            } ],
                            convertType: "hls"
                        }), "sf-muxer-parent");
                    })).catch((t => {
                        T.error("handleDownloadStream err", t), e.target && (e.target.style.opacity = .3, 
                        e.target.title = "An error has occurred");
                    }));
                }
                handleDownloadClip(e) {
                    e.preventDefault(), e.stopPropagation(), i.A.sendMessage({
                        action: "checkAndOpenProLanding"
                    }), (0, A.A)({
                        category: "download",
                        subcategory: "tw",
                        event: "video"
                    });
                    var t = document.querySelector("video");
                    if (t) {
                        var r = this.getVideoName();
                        if (!_.download(r, t.src)) {
                            var n = document.createElement("a");
                            n.href = t.src, n.download = r, n.target = "_blank", n.click(), n.remove();
                        }
                    }
                }
                getVideoName() {
                    var e = document.querySelector('[data-a-target="stream-title"]'), t = e ? e.textContent.split("•")[0] : document.title;
                    return b.A.modify(t) + ".mp4";
                }
                changeActive(e) {
                    T.log("change active", e), this.isActive = e ? 1 : 0, this.isActive ? this.start() : this._unmount && this._unmount();
                }
                _bindEvents() {
                    if (this._hasEvents) T.log("bind events skip"); else {
                        this._hasEvents = !0;
                        var e, t = (e = [], i.A.onMessage.addListener(((t, r, n) => {
                            T.log("message", t);
                            var a = e.find((e => {
                                var r = e.action;
                                return t.action === r;
                            }));
                            a && a.handleCb(t, n);
                        })), (t, r) => e.push({
                            action: t,
                            handleCb: r
                        }));
                        t("getModuleInfo", ((e, t) => {
                            e.url === location.href && t({
                                moduleName: x,
                                state: this.isActive
                            });
                        })), t("changeState", (e => {
                            var t = e.moduleName, r = e.state;
                            return t === x && this.changeActive(r);
                        })), t("updatePreferences", (e => {
                            var t = e.preferences;
                            this.preferences = Object.assign(this.preferences, t);
                        }));
                    }
                }
                _bindMutationWatcher() {
                    var e = this;
                    return (0, n.A)(o().mark((function t() {
                        var r;
                        return o().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return T.log("_bindMutationWatcher call"), e.observer && (e.observer.stop(), e.observer.queries.forEach((e => {
                                    var t = e.css;
                                    document.querySelectorAll(t).forEach((e => S(e)));
                                }))), t.prev = 2, t.next = 5, (0, k.A)();

                              case 5:
                                r = t.sent, t.next = 11;
                                break;

                              case 8:
                                t.prev = 8, t.t0 = t.catch(2), T.error("get selectors config error", t.t0);

                              case 11:
                                e.observer = new l.A({
                                    queries: [ {
                                        is: "added",
                                        css: r.twitch.default,
                                        callback: t => t.added.forEach((t => {
                                            var r, n;
                                            (0, A.A)({
                                                category: "append",
                                                subcategory: "tw",
                                                event: "b"
                                            }), r = t, n = e.onFoundToolbar.bind(e), r && !r.dataset.sfLock && (r.dataset.sfLock = "1", 
                                            n(r));
                                        }))
                                    } ]
                                }), e.observer.start();

                              case 13:
                              case "end":
                                return t.stop();
                            }
                        }), t, null, [ [ 2, 8 ] ]);
                    })))();
                }
            }
            s.A.isSingle() && (0, c.Ay)(x, (() => {
                (new E).start();
            }), (() => !0));
        }
    }, r = {};
    function n(e) {
        var a = r[e];
        if (void 0 !== a) return a.exports;
        var o = r[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(o.exports, o, o.exports, n), o.exports;
    }
    n.m = t, e = [], n.O = (t, r, a, o) => {
        if (!r) {
            var i = 1 / 0;
            for (d = 0; d < e.length; d++) {
                for (var [r, a, o] = e[d], s = !0, c = 0; c < r.length; c++) (!1 & o || i >= o) && Object.keys(n.O).every((e => n.O[e](r[c]))) ? r.splice(c--, 1) : (s = !1, 
                o < i && (i = o));
                if (s) {
                    e.splice(d--, 1);
                    var l = a();
                    void 0 !== l && (t = l);
                }
            }
            return t;
        }
        o = o || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > o; d--) e[d] = e[d - 1];
        e[d] = [ r, a, o ];
    }, n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t;
    }, n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
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
    }, n.j = 167, (() => {
        n.b = document.baseURI || self.location.href;
        var e = {
            167: 0
        };
        n.O.j = t => 0 === e[t];
        var t = (t, r) => {
            var a, o, [i, s, c] = r, l = 0;
            if (i.some((t => 0 !== e[t]))) {
                for (a in s) n.o(s, a) && (n.m[a] = s[a]);
                if (c) var d = c(n);
            }
            for (t && t(r); l < i.length; l++) o = i[l], n.o(e, o) && e[o] && e[o][0](), e[o] = 0;
            return n.O(d);
        }, r = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        r.forEach(t.bind(null, 0)), r.push = t.bind(null, r.push.bind(r));
    })(), n.nc = void 0;
    var a = n.O(void 0, [ 223 ], (() => n(4853)));
    a = n.O(a);
})();