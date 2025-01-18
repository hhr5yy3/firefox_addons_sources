(() => {
    "use strict";
    var e, r = {
        568: (e, r, o) => {
            var n = o(99);
            document.addEventListener("DOMContentLoaded", (function() {
                var e = document.querySelector("#acceptAnalytics"), r = () => {
                    n.A.sendMessage({
                        action: "updateOption",
                        key: "dataCollectionEnabled",
                        value: e.checked
                    });
                };
                window.onbeforeunload = function(e) {
                    e.preventDefault(), r();
                }, document.querySelector("#accept").addEventListener("click", (function() {
                    r(), window.close();
                }));
            }));
        }
    }, o = {};
    function n(e) {
        var t = o[e];
        if (void 0 !== t) return t.exports;
        var a = o[e] = {
            exports: {}
        };
        return r[e](a, a.exports, n), a.exports;
    }
    n.m = r, e = [], n.O = (r, o, t, a) => {
        if (!o) {
            var c = 1 / 0;
            for (s = 0; s < e.length; s++) {
                for (var [o, t, a] = e[s], i = !0, d = 0; d < o.length; d++) (!1 & a || c >= a) && Object.keys(n.O).every((e => n.O[e](o[d]))) ? o.splice(d--, 1) : (i = !1, 
                a < c && (c = a));
                if (i) {
                    e.splice(s--, 1);
                    var l = t();
                    void 0 !== l && (r = l);
                }
            }
            return r;
        }
        a = a || 0;
        for (var s = e.length; s > 0 && e[s - 1][2] > a; s--) e[s] = e[s - 1];
        e[s] = [ o, t, a ];
    }, n.d = (e, r) => {
        for (var o in r) n.o(r, o) && !n.o(e, o) && Object.defineProperty(e, o, {
            enumerable: !0,
            get: r[o]
        });
    }, n.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r), (() => {
        var e = {
            968: 0
        };
        n.O.j = r => 0 === e[r];
        var r = (r, o) => {
            var t, a, [c, i, d] = o, l = 0;
            if (c.some((r => 0 !== e[r]))) {
                for (t in i) n.o(i, t) && (n.m[t] = i[t]);
                if (d) var s = d(n);
            }
            for (r && r(o); l < c.length; l++) a = c[l], n.o(e, a) && e[a] && e[a][0](), e[a] = 0;
            return n.O(s);
        }, o = self.savefromPageWebpackJsonp = self.savefromPageWebpackJsonp || [];
        o.forEach(r.bind(null, 0)), o.push = r.bind(null, o.push.bind(o));
    })(), n.nc = void 0;
    var t = n.O(void 0, [ 324 ], (() => n(568)));
    t = n.O(t);
})();