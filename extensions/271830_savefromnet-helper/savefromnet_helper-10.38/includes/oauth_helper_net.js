(() => {
    "use strict";
    var e, r = {
        1323: (e, r, t) => {
            var o = t(9242), n = t(3342), a = t(8233), i = t(8357);
            const l = e => new Promise((r => o.A.storage.set(e, r)));
            t(4756);
            (0, a.A)("ShareDistributor");
            var s = "helper_pro_force";
            (0, a.A)("helper-pro-exp");
            var c = (0, a.A)("oauth");
            if (/\/callback\.php/.test(location.href) && /code=/.test(location.href) && o.A.callFn("auth.isAuth").then((e => {
                if (e) throw new Error("User is already logged in");
                return o.A.callFn("auth.handleAuthCallback", [ location.href ]);
            })).then((() => {
                o.A.sendMessage({
                    action: "track",
                    t: "event",
                    tid: "UA-181742122-2",
                    ec: "login-helper-page",
                    el: location.host,
                    ea: "sign-in"
                });
            })).catch((e => c.error(e))), /helper-pro\?force-activate=100/.test(location.href) && l({
                [s]: !0
            }), /helper-pro\?force-deactivate=100/.test(location.href) && l({
                [s]: !1
            }), /\/login/.test(location.href) && /helper\.pro/.test(location.href) && o.A.sendMessage({
                action: "track",
                t: "event",
                tid: "UA-181742122-2",
                ec: "login-helper-page",
                el: location.host,
                ea: "loaded"
            }), /helper\-pro\-manual/.test(location.href) && /purchase=1/.test(location.href)) {
                var h = () => (0, n.A)([ "userInfo" ]).then((e => ({
                    isAuth: Boolean(e.userInfo),
                    isPremium: e.userInfo && e.userInfo.isPremium
                }))), u = window.localStorage, f = u.getItem("lastActive"), p = Number(f) + 2e4, v = f && p > Date.now();
                c.log("is skip", v), h().then((e => {
                    var r = e.isAuth, t = e.isPremium;
                    if (!r) throw new Error("User not auth");
                    if (c.log("refresh info", t, v), !t && !v) return (0, i.A)(1e3).then((() => (u.setItem("lastActive", String(Date.now())), 
                    o.A.callFn("auth.refreshUserInfo"))));
                })).then((() => h())).then((e => {
                    var r = e.isPremium;
                    if (r) {
                        var t = document.querySelector(".premium-info");
                        t && t.classList.remove("hidden");
                        var o = document.querySelector("#step-email-check");
                        o && o.remove(), document.querySelectorAll(".step .number").forEach(((e, r) => {
                            e.textContent = String(r + 1);
                        }));
                    }
                    c.log("activate premium", r);
                })).catch((e => {
                    c.warn("activate premium error", e);
                }));
            }
        }
    }, t = {};
    function o(e) {
        var n = t[e];
        if (void 0 !== n) return n.exports;
        var a = t[e] = {
            id: e,
            exports: {}
        };
        return r[e].call(a.exports, a, a.exports, o), a.exports;
    }
    o.m = r, e = [], o.O = (r, t, n, a) => {
        if (!t) {
            var i = 1 / 0;
            for (h = 0; h < e.length; h++) {
                for (var [t, n, a] = e[h], l = !0, s = 0; s < t.length; s++) (!1 & a || i >= a) && Object.keys(o.O).every((e => o.O[e](t[s]))) ? t.splice(s--, 1) : (l = !1, 
                a < i && (i = a));
                if (l) {
                    e.splice(h--, 1);
                    var c = n();
                    void 0 !== c && (r = c);
                }
            }
            return r;
        }
        a = a || 0;
        for (var h = e.length; h > 0 && e[h - 1][2] > a; h--) e[h] = e[h - 1];
        e[h] = [ t, n, a ];
    }, o.n = e => {
        var r = e && e.__esModule ? () => e.default : () => e;
        return o.d(r, {
            a: r
        }), r;
    }, o.d = (e, r) => {
        for (var t in r) o.o(r, t) && !o.o(e, t) && Object.defineProperty(e, t, {
            enumerable: !0,
            get: r[t]
        });
    }, o.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), o.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r), o.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, o.j = 319, (() => {
        o.b = document.baseURI || self.location.href;
        var e = {
            319: 0
        };
        o.O.j = r => 0 === e[r];
        var r = (r, t) => {
            var n, a, [i, l, s] = t, c = 0;
            if (i.some((r => 0 !== e[r]))) {
                for (n in l) o.o(l, n) && (o.m[n] = l[n]);
                if (s) var h = s(o);
            }
            for (r && r(t); c < i.length; c++) a = i[c], o.o(e, a) && e[a] && e[a][0](), e[a] = 0;
            return o.O(h);
        }, t = self.savefromContentScriptWebpackJsonp = self.savefromContentScriptWebpackJsonp || [];
        t.forEach(r.bind(null, 0)), t.push = r.bind(null, t.push.bind(t));
    })(), o.nc = void 0;
    var n = o.O(void 0, [ 223 ], (() => o(1323)));
    n = o.O(n);
})();