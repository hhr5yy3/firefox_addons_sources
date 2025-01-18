(() => {
    "use strict";
    var e, t = {
        5307: (e, t, r) => {
            var n = r(9242), i = r(9620), o = r(9589), a = r(7736);
            r(9022).A.isSingle() && (0, o.Ys)("lm", (function(e, t) {
                var r = (0, i.A)(t), o = t.preferences, a = o.lmMediaHosting ? 1 : 0;
                o.showUmmyInfo && setTimeout((function() {
                    u();
                })), n.A.onMessage.addListener((function(t, r, n) {
                    if ("getModuleInfo" === t.action) {
                        if (t.url !== location.href) return;
                        return n({
                            state: a,
                            moduleName: e
                        });
                    }
                    if ("changeState" === t.action) {
                        if (e !== t.moduleName) return;
                        return l.changeState(t.state);
                    }
                    "updatePreferences" !== t.action ? a && "updateLinks" === t.action && (l.savefromLinkCount = -1, 
                    l.run()) : Object.assign(o, t.preferences);
                })), a && setTimeout((function() {
                    l.run();
                }));
                var u = function() {
                    "object" == typeof location && /videodownloader\.ummy\.net/.test(location.href) && /pozdravlyaem|congratulations|tebrikler/.test(location.href) && (n.A.sendMessage({
                        action: "updateOption",
                        key: "showUmmyInfo",
                        value: 0
                    }), n.A.sendMessage({
                        action: "updateOption",
                        key: "ummyDetected",
                        value: 1
                    }));
                }, l = {
                    htmlAfter: "",
                    linkText: "",
                    linkStyle: {
                        border: "none",
                        textDecoration: "none",
                        padding: "0",
                        position: "relative"
                    },
                    imgStyle: {
                        border: "none",
                        width: "auto",
                        height: "auto"
                    },
                    buttonSrc: "data:image/gif;base64,R0lGODlhEAAQAOZ3APf39+Xl5fT09OPj4/Hx8evr6/3+/u7u7uDh4OPi497e3t7e3/z8/P79/X3GbuXl5ubl5eHg4WzFUfb39+Pj4lzGOV7LOPz7+/n6+vn5+ZTLj9/e387Ozt7f3/7+/vv7/ISbePn5+m/JV1nRKXmVbkCnKVrSLDqsCuDh4d/e3uDn3/z7/H6TdVeaV1uSW+bn5v39/eXm5eXm5kyHP/f39pzGmVy7J3yRd9/f3mLEKkXCHJbka2TVM5vaZn6Wdfn6+YG/c/r5+ZO/jeLi41aHTIeageLn4f39/vr6+kzNG2PVM5i+lomdf2CXYKHVmtzo2YXNeDqsBebl5uHh4HDKWN3g3kKqEH6WeZHTXIPKdnSPbv79/pfmbE7PHpe1l4O8dTO5DODg4VDLIlKUUtzo2J7SmEWsLlG4NJbFjkrJHP7+/VK5Nfz8+zmnC3KKa+Hg4OHh4Y63j/3+/eDg4Ojo6P///8DAwP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHcALAAAAAAQABAAAAfWgHd2g4SFhYJzdYqLjIpzgx5bBgYwHg1Hk2oNDXKDFwwfDF5NLmMtcStsn4MhGT8YS04aGmU1QRhIGYMTADQAQlAODlloAMYTgwICRmRfVBISIkBPKsqDBAREZmcVFhYVayUz2IMHB1dWOmImI2lgUVrmgwUFLzdtXTxKSSduMfSD6Aik48MGlx05SAykM0gKhAAPAhTB0oNFABkPHg5KMIBCxzlMQFQZMGBIggSDpsCJgGDOmzkIUCAIM2dOhEEcNijQuQDHgg4KOqRYwMGOIENIB90JBAA7",
                    sfref: "&utm_source={sfHelperName}&utm_medium=extensions&utm_campaign=link_modifier",
                    pageUrl: "http://savefrom.net/",
                    anchorAttribute: "savefrom_lm",
                    anchorAttributeLink: "savefrom_lm_is_link",
                    anchorIndexAttribute: "savefrom_lm_index",
                    linkRegExp: null,
                    savefromLinkCount: 0,
                    re: {
                        mediahosting: {
                            "youtube.com": [ /^https?:\/\/([a-z]+\.)?youtube\.com\/(#!?\/)?watch\?.*v=/i, /^https?:\/\/([a-z0-9]+\.)?youtube\.com\/(embed|v)\/[\w\-]+/i ],
                            "youtu.be": [ /^https?:\/\/([a-z]+\.)?youtu\.be\/[\w\-]+/i ],
                            "google.com": [ /^http:\/\/video\.google\.com\/videoplay\?.*docid=/i ],
                            "break.com": [ /^http:\/\/(www\.)?break\.com\/(index|movies\w*|(\w+\-)+\w+)\/.+\.html$/i, /^http:\/\/view\.break\.com\/\d+/i ],
                            "vimeo.com": [ /^http:\/\/([\w\-]+\.)?vimeo\.com\/\d+$/i ],
                            "sevenload.com": [ /^http:\/\/([\w\-]+\.)?sevenload\.com\/videos\/[-\w\+\/=]+/i, /^http:\/\/([\w\-]+\.)?sevenload\.com\/shows\/.+/i ],
                            "facebook.com": [ /^https?:\/\/(?:www\.)facebook\.com\/([^\/]+\/)*video\.php\?([^&]+&)*v=\d+/i ],
                            "mail.ru": [ /^http:\/\/([a-z0-9_-]+\.)?video\.mail\.ru\/(.+\/)+\d+\.html/i, /^http:\/\/r\.mail\.ru\/\w+\/video\.mail\.ru\/(.+\/)+\d+\.html/i ],
                            "yandex.ru": [ /^http:\/\/video\.yandex\.ru\/users\/[-\w,!\+]+\/view\/[-\w,!\+]+\/?/i ],
                            "rambler.ru": [ /^http:\/\/vision\.rambler\.ru\/users\/[^\/\s]+\/\d+\/[-\w_\+!]+\/?/i ],
                            "smotri.com": [ /^http:\/\/([a-z0-9_-]+\.)?smotri\.com\/video\/view\/\?.*id=v[0-9a-f]/i ],
                            "tvigle.ru": [ /^http:\/\/(www\.)?tvigle\.ru\/channel\/\d+\?.*vid_id=\d+/i, /^http:\/\/(www\.)tvigle\.ru\/prg\/\d+\/\d+/i ],
                            "1tv.ru": [ /^http:\/\/(www\.)?1tv\.ru(\:\d+)?\/newsvideo\/\d+/i, /^http:\/\/(www\.)?1tv\.ru(\:\d+)?\/news\/\w+\d+/i ],
                            "ntv.ru": [ /^http:\/\/news\.ntv\.ru\/(\w+\/)?\d+\/video\/?/i ],
                            "vesti.ru": [ /^http:\/\/(www\.)?vesti\.ru\/videos\?.*vid=\d+/i ],
                            "mreporter.ru": [ /^http:\/\/(www\.)?mreporter\.ru\/reportermessages\!viewreport\.do[^\?]*\?.*reportid=\d+/i ],
                            "autoplustv.ru": [ /^http:\/\/(www\.)?autoplustv\.ru\/494\/\?id=\d+/i ],
                            "amik.ru": [ /^http:\/\/(www\.)?amik\.ru\/video\/vid\d+\.html/i, /^http:\/\/(www\.)?amik\.ru\/video\/vcid\d+\.html/i ],
                            "life.ru": [ /^http:\/\/([\w+\-]+\.)?life\.ru\/video\/\d+/i ]
                        }
                    },
                    parseHref: function(e, t) {
                        var r = [];
                        r.push(e);
                        var n = e.toLowerCase().indexOf("http://", 7);
                        if (n > 7) r.push(e.substring(n)); else if (t) {
                            var i = t.match(/http%3a(%2f%2f|\/\/)[^\s\&\"\<\>]+/i);
                            if (i && i.length > 0) r.push(decodeURIComponent(i[0])); else {
                                var o = "";
                                try {
                                    o = decodeURIComponent(t);
                                } catch (e) {}
                                if (o && (i = o.match(/((?:aHR0cDovL|aHR0cHM6Ly)[a-z0-9+\/=]+)/i)) && i.length > 1) {
                                    try {
                                        i = atob(i[1]);
                                    } catch (e) {
                                        i = "";
                                    }
                                    -1 != i.search(/^https?:\/\//i) && r.push(decodeURIComponent(i));
                                }
                            }
                        }
                        return r;
                    },
                    href: function(e) {
                        return e.getAttribute("href") || "";
                    },
                    getElementIndex: function(e) {
                        var t = e.innerHTML;
                        if (!t || " " == t) return 1;
                        var r = e.style.backgroundImage;
                        if (r && "none" != r) return 1;
                        for (var n = e.getElementsByTagName("*"), i = 0; i < n.length; i++) {
                            if ("IMG" == n[i].tagName) return 2;
                            if ((r = n[i].style.backgroundImage) && "none" != r) return 1;
                        }
                        return 0;
                    },
                    run: function() {
                        r.embedDownloader.init(), l.sfref = l.sfref.replace("{sfHelperName}", o.sfHelperName);
                        var e = !!o.lmMediaHosting;
                        if (a = 1, l.linkRegExp = {}, e) for (var t in l.re.mediahosting) l.linkRegExp[t] = l.re.mediahosting[t];
                        var i = document.getElementsByTagName("a");
                        if (l.savefromLinkCount != i.length) {
                            l.savefromLinkCount = i.length;
                            for (var u = {}, s = "", d = (t = 0, i.length); t < d; t++) {
                                var m = g(i[t]);
                                if (m) {
                                    var f = 0, c = i[t].getAttribute(l.anchorIndexAttribute);
                                    0 === c || c ? f = parseInt(c) : (f = l.getElementIndex(i[t]), i[t].setAttribute(l.anchorIndexAttribute, f)), 
                                    u[m] ? f < u[m].index ? (u[m].elements = [ i[t] ], u[m].index = f, s = m) : f == u[m].index && m != s && (u[m].elements.push(i[t]), 
                                    s = m) : (u[m] = {
                                        index: f,
                                        elements: [ i[t] ]
                                    }, s = m);
                                }
                            }
                            for (var t in u) {
                                var h = 0;
                                for (d = u[t].elements.length; h < d; h++) {
                                    var p = u[t].elements[h];
                                    p.getAttribute(l.anchorAttribute) || A(p, t);
                                }
                            }
                        }
                        function v(e, t) {
                            if (!e) return !1;
                            if (e == window.location.href) return !1;
                            if (!(t = r.getTopLevelDomain(t)) || !l.linkRegExp[t]) return !1;
                            for (var n = 0; n < l.linkRegExp[t].length; n++) if (-1 != e.search(l.linkRegExp[t][n])) return !0;
                            return !1;
                        }
                        function g(e) {
                            var t = e.href;
                            if ("string" == typeof t && -1 == t.search(/^https?:\/\/([\w\-]+\.)?savefrom\.net\//i)) {
                                var r = l.parseHref(t, e.search);
                                if (r.length > 0) {
                                    if (0 != l.href(e).indexOf("#") && v(r[0], e.hostname)) return r[0];
                                    if (r.length > 1) for (var n = 1; n < r.length; n++) {
                                        var i = document.createElement("a");
                                        if (i.href = r[n], 0 != l.href(i).indexOf("#") && v(r[n], i.hostname)) return r[n];
                                    }
                                }
                            }
                            return "";
                        }
                        function A(e, t) {
                            if (e) {
                                e.setAttribute(l.anchorAttribute, "1");
                                var r = document.createElement("span");
                                r.setAttribute("style", "padding: 0; margin: 0; margin-left: 5px;"), r.addEventListener("click", (function(e) {
                                    e.stopPropagation();
                                }));
                                var i = e.parentNode;
                                if (i) {
                                    try {
                                        t = encodeURIComponent(t);
                                    } catch (e) {
                                        return;
                                    }
                                    var o = l.pageUrl + "?url=" + t;
                                    l.sfref && (o += l.sfref);
                                    var a = document.createElement("a");
                                    for (var u in a.href = o, a.target = "_blank", a.title = n.A.i18n.getMessage("lmButtonTitle"), 
                                    a.style.backgroundImage = "url(" + l.buttonSrc + ")", a.style.backgroundRepeat = "no-repeat", 
                                    a.style.width = "16px", a.style.height = "16px", a.style.display = "inline-block", 
                                    l.linkStyle) a.style[u] = l.linkStyle[u];
                                    e.style.zIndex && (a.style.zIndex = e.style.zIndex), a.setAttribute(l.anchorAttribute, "1"), 
                                    a.setAttribute(l.anchorAttributeLink, "1"), l.linkText && (a.textContent = l.linkText), 
                                    r.appendChild(a), l.htmlAfter && (r.textContent += l.htmlAfter), e.nextSibling ? i.insertBefore(r, e.nextSibling) : i.appendChild(r);
                                }
                            }
                        }
                    },
                    changeState: function(e) {
                        o.lmMediaHosting = e, a = e;
                        for (var t, r = document.querySelectorAll("a[" + l.anchorAttributeLink + "]"), n = 0; t = r[n]; n++) (t = t.parentNode).parentNode.removeChild(t);
                        var i = document.querySelectorAll([ "*[" + l.anchorAttribute + "]", "*[" + l.anchorIndexAttribute + "]" ]);
                        for (n = 0; t = i[n]; n++) t.removeAttribute(l.anchorAttribute), t.removeAttribute(l.anchorIndexAttribute);
                        l.savefromLinkCount = -1, e && l.run();
                    }
                };
            }), (function() {
                return (!document.contentType || "text/html" === document.contentType) && (!(0, 
                a.A)() && !/yandex\.com\/launcher/.test(location.href));
            }));
        }
    }, r = {};
    function n(e) {
        var i = r[e];
        if (void 0 !== i) return i.exports;
        var o = r[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(o.exports, o, o.exports, n), o.exports;
    }
    n.m = t, e = [], n.O = (t, r, i, o) => {
        if (!r) {
            var a = 1 / 0;
            for (d = 0; d < e.length; d++) {
                for (var [r, i, o] = e[d], u = !0, l = 0; l < r.length; l++) (!1 & o || a >= o) && Object.keys(n.O).every((e => n.O[e](r[l]))) ? r.splice(l--, 1) : (u = !1, 
                o < a && (a = o));
                if (u) {
                    e.splice(d--, 1);
                    var s = i();
                    void 0 !== s && (t = s);
                }
            }
            return t;
        }
        o = o || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > o; d--) e[d] = e[d - 1];
        e[d] = [ r, i, o ];
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
    }, n.j = 469, (() => {
        n.b = document.baseURI || self.location.href;
        var e = {
            469: 0
        };
        n.O.j = t => 0 === e[t];
        var t = (t, r) => {
            var i, o, [a, u, l] = r, s = 0;
            if (a.some((t => 0 !== e[t]))) {
                for (i in u) n.o(u, i) && (n.m[i] = u[i]);
                if (l) var d = l(n);
            }
            for (t && t(r); s < a.length; s++) o = a[s], n.o(e, o) && e[o] && e[o][0](), e[o] = 0;
            return n.O(d);
        }, r = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        r.forEach(t.bind(null, 0)), r.push = t.bind(null, r.push.bind(r));
    })(), n.nc = void 0;
    var i = n.O(void 0, [ 223 ], (() => n(5307)));
    i = n.O(i);
})();