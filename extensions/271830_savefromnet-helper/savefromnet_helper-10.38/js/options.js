/*! For license information please see options.js.LICENSE.txt */
(() => {
    var e, t = {
        682: (e, t, n) => {
            "use strict";
            var o, r, i, l, a, s, u, _, c, f, p, d = n(228), m = n.n(d), v = n(99), h = n(190), b = {}, y = [], g = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, k = Array.isArray;
            function x(e, t) {
                for (var n in t) e[n] = t[n];
                return e;
            }
            function E(e) {
                var t = e.parentNode;
                t && t.removeChild(e);
            }
            function w(e, t, n) {
                var r, i, l, a = {};
                for (l in t) "key" == l ? r = t[l] : "ref" == l ? i = t[l] : a[l] = t[l];
                if (arguments.length > 2 && (a.children = arguments.length > 3 ? o.call(arguments, 2) : n), 
                "function" == typeof e && null != e.defaultProps) for (l in e.defaultProps) void 0 === a[l] && (a[l] = e.defaultProps[l]);
                return S(e, a, r, i, null);
            }
            function S(e, t, n, o, l) {
                var a = {
                    type: e,
                    props: t,
                    key: n,
                    ref: o,
                    __k: null,
                    __: null,
                    __b: 0,
                    __e: null,
                    __d: void 0,
                    __c: null,
                    constructor: void 0,
                    __v: null == l ? ++i : l,
                    __i: -1,
                    __u: 0
                };
                return null == l && null != r.vnode && r.vnode(a), a;
            }
            function C(e) {
                return e.children;
            }
            function O(e, t) {
                this.props = e, this.context = t;
            }
            function N(e, t) {
                if (null == t) return e.__ ? N(e.__, e.__i + 1) : null;
                for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
                return "function" == typeof e.type ? N(e) : null;
            }
            function A(e) {
                var t, n;
                if (null != (e = e.__) && null != e.__c) {
                    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) {
                        e.__e = e.__c.base = n.__e;
                        break;
                    }
                    return A(e);
                }
            }
            function P(e) {
                (!e.__d && (e.__d = !0) && l.push(e) && !M.__r++ || a !== r.debounceRendering) && ((a = r.debounceRendering) || s)(M);
            }
            function M() {
                var e, t, n, o, i, a, s, _;
                for (l.sort(u); e = l.shift(); ) e.__d && (t = l.length, o = void 0, a = (i = (n = e).__v).__e, 
                s = [], _ = [], n.__P && ((o = x({}, i)).__v = i.__v + 1, r.vnode && r.vnode(o), 
                W(n.__P, o, i, n.__n, void 0 !== n.__P.ownerSVGElement, 32 & i.__u ? [ a ] : null, s, null == a ? N(i) : a, !!(32 & i.__u), _), 
                o.__v = i.__v, o.__.__k[o.__i] = o, L(s, o, _), o.__e != a && A(o)), l.length > t && l.sort(u));
                M.__r = 0;
            }
            function j(e, t, n, o, r, i, l, a, s, u, _) {
                var c, f, p, d, m, v = o && o.__k || y, h = t.length;
                for (n.__d = s, D(n, t, v), s = n.__d, c = 0; c < h; c++) null != (p = n.__k[c]) && "boolean" != typeof p && "function" != typeof p && (f = -1 === p.__i ? b : v[p.__i] || b, 
                p.__i = c, W(e, p, f, r, i, l, a, s, u, _), d = p.__e, p.ref && f.ref != p.ref && (f.ref && V(f.ref, null, p), 
                _.push(p.ref, p.__c || d, p)), null == m && null != d && (m = d), 65536 & p.__u || f.__k === p.__k ? (s && !s.isConnected && (s = N(f)), 
                s = T(p, s, e)) : "function" == typeof p.type && void 0 !== p.__d ? s = p.__d : d && (s = d.nextSibling), 
                p.__d = void 0, p.__u &= -196609);
                n.__d = s, n.__e = m;
            }
            function D(e, t, n) {
                var o, r, i, l, a, s = t.length, u = n.length, _ = u, c = 0;
                for (e.__k = [], o = 0; o < s; o++) l = o + c, null != (r = e.__k[o] = null == (r = t[o]) || "boolean" == typeof r || "function" == typeof r ? null : "string" == typeof r || "number" == typeof r || "bigint" == typeof r || r.constructor == String ? S(null, r, null, null, null) : k(r) ? S(C, {
                    children: r
                }, null, null, null) : void 0 === r.constructor && r.__b > 0 ? S(r.type, r.props, r.key, r.ref ? r.ref : null, r.__v) : r) ? (r.__ = e, 
                r.__b = e.__b + 1, a = H(r, n, l, _), r.__i = a, i = null, -1 !== a && (_--, (i = n[a]) && (i.__u |= 131072)), 
                null == i || null === i.__v ? (-1 == a && c--, "function" != typeof r.type && (r.__u |= 65536)) : a !== l && (a === l + 1 ? c++ : a > l ? _ > s - l ? c += a - l : c-- : a < l ? a == l - 1 && (c = a - l) : c = 0, 
                a !== o + c && (r.__u |= 65536))) : (i = n[l]) && null == i.key && i.__e && !(131072 & i.__u) && (i.__e == e.__d && (e.__d = N(i)), 
                B(i, i, !1), n[l] = null, _--);
                if (_) for (o = 0; o < u; o++) null != (i = n[o]) && !(131072 & i.__u) && (i.__e == e.__d && (e.__d = N(i)), 
                B(i, i));
            }
            function T(e, t, n) {
                var o, r;
                if ("function" == typeof e.type) {
                    for (o = e.__k, r = 0; o && r < o.length; r++) o[r] && (o[r].__ = e, t = T(o[r], t, n));
                    return t;
                }
                e.__e != t && (n.insertBefore(e.__e, t || null), t = e.__e);
                do {
                    t = t && t.nextSibling;
                } while (null != t && 8 === t.nodeType);
                return t;
            }
            function U(e, t) {
                return t = t || [], null == e || "boolean" == typeof e || (k(e) ? e.some((function(e) {
                    U(e, t);
                })) : t.push(e)), t;
            }
            function H(e, t, n, o) {
                var r = e.key, i = e.type, l = n - 1, a = n + 1, s = t[n];
                if (null === s || s && r == s.key && i === s.type && !(131072 & s.__u)) return n;
                if (o > (null == s || 131072 & s.__u ? 0 : 1)) for (;l >= 0 || a < t.length; ) {
                    if (l >= 0) {
                        if ((s = t[l]) && !(131072 & s.__u) && r == s.key && i === s.type) return l;
                        l--;
                    }
                    if (a < t.length) {
                        if ((s = t[a]) && !(131072 & s.__u) && r == s.key && i === s.type) return a;
                        a++;
                    }
                }
                return -1;
            }
            function F(e, t, n) {
                "-" === t[0] ? e.setProperty(t, null == n ? "" : n) : e[t] = null == n ? "" : "number" != typeof n || g.test(t) ? n : n + "px";
            }
            function R(e, t, n, o, r) {
                var i;
                e: if ("style" === t) if ("string" == typeof n) e.style.cssText = n; else {
                    if ("string" == typeof o && (e.style.cssText = o = ""), o) for (t in o) n && t in n || F(e.style, t, "");
                    if (n) for (t in n) o && n[t] === o[t] || F(e.style, t, n[t]);
                } else if ("o" === t[0] && "n" === t[1]) i = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), 
                t = t.toLowerCase() in e || "onFocusOut" === t || "onFocusIn" === t ? t.toLowerCase().slice(2) : t.slice(2), 
                e.l || (e.l = {}), e.l[t + i] = n, n ? o ? n.u = o.u : (n.u = _, e.addEventListener(t, i ? f : c, i)) : e.removeEventListener(t, i ? f : c, i); else {
                    if (r) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s"); else if ("width" != t && "height" != t && "href" != t && "list" != t && "form" != t && "tabIndex" != t && "download" != t && "rowSpan" != t && "colSpan" != t && "role" != t && t in e) try {
                        e[t] = null == n ? "" : n;
                        break e;
                    } catch (e) {}
                    "function" == typeof n || (null == n || !1 === n && "-" !== t[4] ? e.removeAttribute(t) : e.setAttribute(t, n));
                }
            }
            function I(e) {
                return function(t) {
                    if (this.l) {
                        var n = this.l[t.type + e];
                        if (null == t.t) t.t = _++; else if (t.t < n.u) return;
                        return n(r.event ? r.event(t) : t);
                    }
                };
            }
            function W(e, t, n, o, i, l, a, s, u, _) {
                var c, f, p, d, m, v, h, b, y, g, E, w, S, N, A, P = t.type;
                if (void 0 !== t.constructor) return null;
                128 & n.__u && (u = !!(32 & n.__u), l = [ s = t.__e = n.__e ]), (c = r.__b) && c(t);
                e: if ("function" == typeof P) try {
                    if (b = t.props, y = (c = P.contextType) && o[c.__c], g = c ? y ? y.props.value : c.__ : o, 
                    n.__c ? h = (f = t.__c = n.__c).__ = f.__E : ("prototype" in P && P.prototype.render ? t.__c = f = new P(b, g) : (t.__c = f = new O(b, g), 
                    f.constructor = P, f.render = z), y && y.sub(f), f.props = b, f.state || (f.state = {}), 
                    f.context = g, f.__n = o, p = f.__d = !0, f.__h = [], f._sb = []), null == f.__s && (f.__s = f.state), 
                    null != P.getDerivedStateFromProps && (f.__s == f.state && (f.__s = x({}, f.__s)), 
                    x(f.__s, P.getDerivedStateFromProps(b, f.__s))), d = f.props, m = f.state, f.__v = t, 
                    p) null == P.getDerivedStateFromProps && null != f.componentWillMount && f.componentWillMount(), 
                    null != f.componentDidMount && f.__h.push(f.componentDidMount); else {
                        if (null == P.getDerivedStateFromProps && b !== d && null != f.componentWillReceiveProps && f.componentWillReceiveProps(b, g), 
                        !f.__e && (null != f.shouldComponentUpdate && !1 === f.shouldComponentUpdate(b, f.__s, g) || t.__v === n.__v)) {
                            for (t.__v !== n.__v && (f.props = b, f.state = f.__s, f.__d = !1), t.__e = n.__e, 
                            t.__k = n.__k, t.__k.forEach((function(e) {
                                e && (e.__ = t);
                            })), E = 0; E < f._sb.length; E++) f.__h.push(f._sb[E]);
                            f._sb = [], f.__h.length && a.push(f);
                            break e;
                        }
                        null != f.componentWillUpdate && f.componentWillUpdate(b, f.__s, g), null != f.componentDidUpdate && f.__h.push((function() {
                            f.componentDidUpdate(d, m, v);
                        }));
                    }
                    if (f.context = g, f.props = b, f.__P = e, f.__e = !1, w = r.__r, S = 0, "prototype" in P && P.prototype.render) {
                        for (f.state = f.__s, f.__d = !1, w && w(t), c = f.render(f.props, f.state, f.context), 
                        N = 0; N < f._sb.length; N++) f.__h.push(f._sb[N]);
                        f._sb = [];
                    } else do {
                        f.__d = !1, w && w(t), c = f.render(f.props, f.state, f.context), f.state = f.__s;
                    } while (f.__d && ++S < 25);
                    f.state = f.__s, null != f.getChildContext && (o = x(x({}, o), f.getChildContext())), 
                    p || null == f.getSnapshotBeforeUpdate || (v = f.getSnapshotBeforeUpdate(d, m)), 
                    j(e, k(A = null != c && c.type === C && null == c.key ? c.props.children : c) ? A : [ A ], t, n, o, i, l, a, s, u, _), 
                    f.base = t.__e, t.__u &= -161, f.__h.length && a.push(f), h && (f.__E = f.__ = null);
                } catch (e) {
                    t.__v = null, u || null != l ? (t.__e = s, t.__u |= u ? 160 : 32, l[l.indexOf(s)] = null) : (t.__e = n.__e, 
                    t.__k = n.__k), r.__e(e, t, n);
                } else null == l && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = $(n.__e, t, n, o, i, l, a, u, _);
                (c = r.diffed) && c(t);
            }
            function L(e, t, n) {
                t.__d = void 0;
                for (var o = 0; o < n.length; o++) V(n[o], n[++o], n[++o]);
                r.__c && r.__c(t, e), e.some((function(t) {
                    try {
                        e = t.__h, t.__h = [], e.some((function(e) {
                            e.call(t);
                        }));
                    } catch (e) {
                        r.__e(e, t.__v);
                    }
                }));
            }
            function $(e, t, n, r, i, l, a, s, u) {
                var _, c, f, p, d, m, v, h = n.props, y = t.props, g = t.type;
                if ("svg" === g && (i = !0), null != l) for (_ = 0; _ < l.length; _++) if ((d = l[_]) && "setAttribute" in d == !!g && (g ? d.localName === g : 3 === d.nodeType)) {
                    e = d, l[_] = null;
                    break;
                }
                if (null == e) {
                    if (null === g) return document.createTextNode(y);
                    e = i ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g, y.is && y), 
                    l = null, s = !1;
                }
                if (null === g) h === y || s && e.data === y || (e.data = y); else {
                    if (l = l && o.call(e.childNodes), h = n.props || b, !s && null != l) for (h = {}, 
                    _ = 0; _ < e.attributes.length; _++) h[(d = e.attributes[_]).name] = d.value;
                    for (_ in h) d = h[_], "children" == _ || ("dangerouslySetInnerHTML" == _ ? f = d : "key" === _ || _ in y || R(e, _, null, d, i));
                    for (_ in y) d = y[_], "children" == _ ? p = d : "dangerouslySetInnerHTML" == _ ? c = d : "value" == _ ? m = d : "checked" == _ ? v = d : "key" === _ || s && "function" != typeof d || h[_] === d || R(e, _, d, h[_], i);
                    if (c) s || f && (c.__html === f.__html || c.__html === e.innerHTML) || (e.innerHTML = c.__html), 
                    t.__k = []; else if (f && (e.innerHTML = ""), j(e, k(p) ? p : [ p ], t, n, r, i && "foreignObject" !== g, l, a, l ? l[0] : n.__k && N(n, 0), s, u), 
                    null != l) for (_ = l.length; _--; ) null != l[_] && E(l[_]);
                    s || (_ = "value", void 0 !== m && (m !== e[_] || "progress" === g && !m || "option" === g && m !== h[_]) && R(e, _, m, h[_], !1), 
                    _ = "checked", void 0 !== v && v !== e[_] && R(e, _, v, h[_], !1));
                }
                return e;
            }
            function V(e, t, n) {
                try {
                    "function" == typeof e ? e(t) : e.current = t;
                } catch (e) {
                    r.__e(e, n);
                }
            }
            function B(e, t, n) {
                var o, i;
                if (r.unmount && r.unmount(e), (o = e.ref) && (o.current && o.current !== e.__e || V(o, null, t)), 
                null != (o = e.__c)) {
                    if (o.componentWillUnmount) try {
                        o.componentWillUnmount();
                    } catch (e) {
                        r.__e(e, t);
                    }
                    o.base = o.__P = null;
                }
                if (o = e.__k) for (i = 0; i < o.length; i++) o[i] && B(o[i], t, n || "function" != typeof e.type);
                n || null == e.__e || E(e.__e), e.__c = e.__ = e.__e = e.__d = void 0;
            }
            function z(e, t, n) {
                return this.constructor(e, n);
            }
            function q(e, t, n) {
                var i, l, a, s;
                r.__ && r.__(e, t), l = (i = "function" == typeof n) ? null : n && n.__k || t.__k, 
                a = [], s = [], W(t, e = (!i && n || t).__k = w(C, null, [ e ]), l || b, b, void 0 !== t.ownerSVGElement, !i && n ? [ n ] : l ? null : t.firstChild ? o.call(t.childNodes) : null, a, !i && n ? n : l ? l.__e : t.firstChild, i, s), 
                L(a, e, s);
            }
            function G(e, t) {
                q(e, t, G);
            }
            function J(e, t, n) {
                var r, i, l, a, s = x({}, e.props);
                for (l in e.type && e.type.defaultProps && (a = e.type.defaultProps), t) "key" == l ? r = t[l] : "ref" == l ? i = t[l] : s[l] = void 0 === t[l] && void 0 !== a ? a[l] : t[l];
                return arguments.length > 2 && (s.children = arguments.length > 3 ? o.call(arguments, 2) : n), 
                S(e.type, s, r || e.key, i || e.ref, null);
            }
            o = y.slice, r = {
                __e: function(e, t, n, o) {
                    for (var r, i, l; t = t.__; ) if ((r = t.__c) && !r.__) try {
                        if ((i = r.constructor) && null != i.getDerivedStateFromError && (r.setState(i.getDerivedStateFromError(e)), 
                        l = r.__d), null != r.componentDidCatch && (r.componentDidCatch(e, o || {}), l = r.__d), 
                        l) return r.__E = r;
                    } catch (t) {
                        e = t;
                    }
                    throw e;
                }
            }, i = 0, O.prototype.setState = function(e, t) {
                var n;
                n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = x({}, this.state), 
                "function" == typeof e && (e = e(x({}, n), this.props)), e && x(n, e), null != e && this.__v && (t && this._sb.push(t), 
                P(this));
            }, O.prototype.forceUpdate = function(e) {
                this.__v && (this.__e = !0, e && this.__h.push(e), P(this));
            }, O.prototype.render = C, l = [], s = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
            u = function(e, t) {
                return e.__v.__b - t.__v.__b;
            }, M.__r = 0, _ = 0, c = I(!1), f = I(!0), p = 0;
            var Y, Z, Q, X, K = 0, ee = [], te = [], ne = r, oe = ne.__b, re = ne.__r, ie = ne.diffed, le = ne.__c, ae = ne.unmount, se = ne.__;
            function ue(e, t) {
                ne.__h && ne.__h(Z, e, K || t), K = 0;
                var n = Z.__H || (Z.__H = {
                    __: [],
                    __h: []
                });
                return e >= n.__.length && n.__.push({
                    __V: te
                }), n.__[e];
            }
            function _e(e) {
                return K = 1, ce(ke, e);
            }
            function ce(e, t, n) {
                var o = ue(Y++, 2);
                if (o.t = e, !o.__c && (o.__ = [ n ? n(t) : ke(void 0, t), function(e) {
                    var t = o.__N ? o.__N[0] : o.__[0], n = o.t(t, e);
                    t !== n && (o.__N = [ n, o.__[1] ], o.__c.setState({}));
                } ], o.__c = Z, !Z.u)) {
                    var r = function(e, t, n) {
                        if (!o.__c.__H) return !0;
                        var r = o.__c.__H.__.filter((function(e) {
                            return !!e.__c;
                        }));
                        if (r.every((function(e) {
                            return !e.__N;
                        }))) return !i || i.call(this, e, t, n);
                        var l = !1;
                        return r.forEach((function(e) {
                            if (e.__N) {
                                var t = e.__[0];
                                e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (l = !0);
                            }
                        })), !(!l && o.__c.props === e) && (!i || i.call(this, e, t, n));
                    };
                    Z.u = !0;
                    var i = Z.shouldComponentUpdate, l = Z.componentWillUpdate;
                    Z.componentWillUpdate = function(e, t, n) {
                        if (this.__e) {
                            var o = i;
                            i = void 0, r(e, t, n), i = o;
                        }
                        l && l.call(this, e, t, n);
                    }, Z.shouldComponentUpdate = r;
                }
                return o.__N || o.__;
            }
            function fe(e, t) {
                var n = ue(Y++, 3);
                !ne.__s && ge(n.__H, t) && (n.__ = e, n.i = t, Z.__H.__h.push(n));
            }
            function pe(e, t) {
                var n = ue(Y++, 4);
                !ne.__s && ge(n.__H, t) && (n.__ = e, n.i = t, Z.__h.push(n));
            }
            function de(e, t) {
                var n = ue(Y++, 7);
                return ge(n.__H, t) ? (n.__V = e(), n.i = t, n.__h = e, n.__V) : n.__;
            }
            function me() {
                for (var e; e = ee.shift(); ) if (e.__P && e.__H) try {
                    e.__H.__h.forEach(be), e.__H.__h.forEach(ye), e.__H.__h = [];
                } catch (t) {
                    e.__H.__h = [], ne.__e(t, e.__v);
                }
            }
            ne.__b = function(e) {
                Z = null, oe && oe(e);
            }, ne.__ = function(e, t) {
                e && t.__k && t.__k.__m && (e.__m = t.__k.__m), se && se(e, t);
            }, ne.__r = function(e) {
                re && re(e), Y = 0;
                var t = (Z = e.__c).__H;
                t && (Q === Z ? (t.__h = [], Z.__h = [], t.__.forEach((function(e) {
                    e.__N && (e.__ = e.__N), e.__V = te, e.__N = e.i = void 0;
                }))) : (t.__h.forEach(be), t.__h.forEach(ye), t.__h = [], Y = 0)), Q = Z;
            }, ne.diffed = function(e) {
                ie && ie(e);
                var t = e.__c;
                t && t.__H && (t.__H.__h.length && (1 !== ee.push(t) && X === ne.requestAnimationFrame || ((X = ne.requestAnimationFrame) || he)(me)), 
                t.__H.__.forEach((function(e) {
                    e.i && (e.__H = e.i), e.__V !== te && (e.__ = e.__V), e.i = void 0, e.__V = te;
                }))), Q = Z = null;
            }, ne.__c = function(e, t) {
                t.some((function(e) {
                    try {
                        e.__h.forEach(be), e.__h = e.__h.filter((function(e) {
                            return !e.__ || ye(e);
                        }));
                    } catch (n) {
                        t.some((function(e) {
                            e.__h && (e.__h = []);
                        })), t = [], ne.__e(n, e.__v);
                    }
                })), le && le(e, t);
            }, ne.unmount = function(e) {
                ae && ae(e);
                var t, n = e.__c;
                n && n.__H && (n.__H.__.forEach((function(e) {
                    try {
                        be(e);
                    } catch (e) {
                        t = e;
                    }
                })), n.__H = void 0, t && ne.__e(t, n.__v));
            };
            var ve = "function" == typeof requestAnimationFrame;
            function he(e) {
                var t, n = function() {
                    clearTimeout(o), ve && cancelAnimationFrame(t), setTimeout(e);
                }, o = setTimeout(n, 100);
                ve && (t = requestAnimationFrame(n));
            }
            function be(e) {
                var t = Z, n = e.__c;
                "function" == typeof n && (e.__c = void 0, n()), Z = t;
            }
            function ye(e) {
                var t = Z;
                e.__c = e.__(), Z = t;
            }
            function ge(e, t) {
                return !e || e.length !== t.length || t.some((function(t, n) {
                    return t !== e[n];
                }));
            }
            function ke(e, t) {
                return "function" == typeof t ? t(e) : t;
            }
            function xe(e, t) {
                for (var n in t) e[n] = t[n];
                return e;
            }
            function Ee(e, t) {
                for (var n in e) if ("__source" !== n && !(n in t)) return !0;
                for (var o in t) if ("__source" !== o && e[o] !== t[o]) return !0;
                return !1;
            }
            function we(e, t) {
                this.props = e, this.context = t;
            }
            (we.prototype = new O).isPureReactComponent = !0, we.prototype.shouldComponentUpdate = function(e, t) {
                return Ee(this.props, e) || Ee(this.state, t);
            };
            var Se = r.__b;
            r.__b = function(e) {
                e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Se && Se(e);
            };
            var Ce = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
            var Oe = function(e, t) {
                return null == e ? null : U(U(e).map(t));
            }, Ne = {
                map: Oe,
                forEach: Oe,
                count: function(e) {
                    return e ? U(e).length : 0;
                },
                only: function(e) {
                    var t = U(e);
                    if (1 !== t.length) throw "Children.only";
                    return t[0];
                },
                toArray: U
            }, Ae = r.__e;
            r.__e = function(e, t, n, o) {
                if (e.then) for (var r, i = t; i = i.__; ) if ((r = i.__c) && r.__c) return null == t.__e && (t.__e = n.__e, 
                t.__k = n.__k), r.__c(e, t);
                Ae(e, t, n, o);
            };
            var Pe = r.unmount;
            function Me(e, t, n) {
                return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach((function(e) {
                    "function" == typeof e.__c && e.__c();
                })), e.__c.__H = null), null != (e = xe({}, e)).__c && (e.__c.__P === n && (e.__c.__P = t), 
                e.__c = null), e.__k = e.__k && e.__k.map((function(e) {
                    return Me(e, t, n);
                }))), e;
            }
            function je(e, t, n) {
                return e && n && (e.__v = null, e.__k = e.__k && e.__k.map((function(e) {
                    return je(e, t, n);
                })), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, 
                e.__c.__P = n)), e;
            }
            function De() {
                this.__u = 0, this.t = null, this.__b = null;
            }
            function Te(e) {
                var t = e.__.__c;
                return t && t.__a && t.__a(e);
            }
            function Ue() {
                this.u = null, this.o = null;
            }
            r.unmount = function(e) {
                var t = e.__c;
                t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Pe && Pe(e);
            }, (De.prototype = new O).__c = function(e, t) {
                var n = t.__c, o = this;
                null == o.t && (o.t = []), o.t.push(n);
                var r = Te(o.__v), i = !1, l = function() {
                    i || (i = !0, n.__R = null, r ? r(a) : a());
                };
                n.__R = l;
                var a = function() {
                    if (! --o.__u) {
                        if (o.state.__a) {
                            var e = o.state.__a;
                            o.__v.__k[0] = je(e, e.__c.__P, e.__c.__O);
                        }
                        var t;
                        for (o.setState({
                            __a: o.__b = null
                        }); t = o.t.pop(); ) t.forceUpdate();
                    }
                };
                o.__u++ || 32 & t.__u || o.setState({
                    __a: o.__b = o.__v.__k[0]
                }), e.then(l, l);
            }, De.prototype.componentWillUnmount = function() {
                this.t = [];
            }, De.prototype.render = function(e, t) {
                if (this.__b) {
                    if (this.__v.__k) {
                        var n = document.createElement("div"), o = this.__v.__k[0].__c;
                        this.__v.__k[0] = Me(this.__b, n, o.__O = o.__P);
                    }
                    this.__b = null;
                }
                var r = t.__a && w(C, null, e.fallback);
                return r && (r.__u &= -33), [ w(C, null, t.__a ? null : e.children), r ];
            };
            var He = function(e, t, n) {
                if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.o.size)) for (n = e.u; n; ) {
                    for (;n.length > 3; ) n.pop()();
                    if (n[1] < n[0]) break;
                    e.u = n = n[2];
                }
            };
            function Fe(e) {
                return this.getChildContext = function() {
                    return e.context;
                }, e.children;
            }
            function Re(e) {
                var t = this, n = e.i;
                t.componentWillUnmount = function() {
                    q(null, t.l), t.l = null, t.i = null;
                }, t.i && t.i !== n && t.componentWillUnmount(), t.l || (t.i = n, t.l = {
                    nodeType: 1,
                    parentNode: n,
                    childNodes: [],
                    appendChild: function(e) {
                        this.childNodes.push(e), t.i.appendChild(e);
                    },
                    insertBefore: function(e, n) {
                        this.childNodes.push(e), t.i.appendChild(e);
                    },
                    removeChild: function(e) {
                        this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), t.i.removeChild(e);
                    }
                }), q(w(Fe, {
                    context: t.context
                }, e.__v), t.l);
            }
            function Ie(e, t) {
                var n = w(Re, {
                    __v: e,
                    i: t
                });
                return n.containerInfo = t, n;
            }
            (Ue.prototype = new O).__a = function(e) {
                var t = this, n = Te(t.__v), o = t.o.get(e);
                return o[0]++, function(r) {
                    var i = function() {
                        t.props.revealOrder ? (o.push(r), He(t, e, o)) : r();
                    };
                    n ? n(i) : i();
                };
            }, Ue.prototype.render = function(e) {
                this.u = null, this.o = new Map;
                var t = U(e.children);
                e.revealOrder && "b" === e.revealOrder[0] && t.reverse();
                for (var n = t.length; n--; ) this.o.set(t[n], this.u = [ 1, 0, this.u ]);
                return e.children;
            }, Ue.prototype.componentDidUpdate = Ue.prototype.componentDidMount = function() {
                var e = this;
                this.o.forEach((function(t, n) {
                    He(e, n, t);
                }));
            };
            var We = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, Le = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, $e = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Ve = /[A-Z0-9]/g, Be = "undefined" != typeof document, ze = function(e) {
                return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(e);
            };
            O.prototype.isReactComponent = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach((function(e) {
                Object.defineProperty(O.prototype, e, {
                    configurable: !0,
                    get: function() {
                        return this["UNSAFE_" + e];
                    },
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            configurable: !0,
                            writable: !0,
                            value: t
                        });
                    }
                });
            }));
            var qe = r.event;
            function Ge() {}
            function Je() {
                return this.cancelBubble;
            }
            function Ye() {
                return this.defaultPrevented;
            }
            r.event = function(e) {
                return qe && (e = qe(e)), e.persist = Ge, e.isPropagationStopped = Je, e.isDefaultPrevented = Ye, 
                e.nativeEvent = e;
            };
            var Ze, Qe = {
                enumerable: !1,
                configurable: !0,
                get: function() {
                    return this.class;
                }
            }, Xe = r.vnode;
            r.vnode = function(e) {
                "string" == typeof e.type && function(e) {
                    var t = e.props, n = e.type, o = {};
                    for (var r in t) {
                        var i = t[r];
                        if (!("value" === r && "defaultValue" in t && null == i || Be && "children" === r && "noscript" === n || "class" === r || "className" === r)) {
                            var l = r.toLowerCase();
                            "defaultValue" === r && "value" in t && null == t.value ? r = "value" : "download" === r && !0 === i ? i = "" : "translate" === l && "no" === i ? i = !1 : "ondoubleclick" === l ? r = "ondblclick" : "onchange" !== l || "input" !== n && "textarea" !== n || ze(t.type) ? "onfocus" === l ? r = "onfocusin" : "onblur" === l ? r = "onfocusout" : $e.test(r) ? r = l : -1 === n.indexOf("-") && Le.test(r) ? r = r.replace(Ve, "-$&").toLowerCase() : null === i && (i = void 0) : l = r = "oninput", 
                            "oninput" === l && o[r = l] && (r = "oninputCapture"), o[r] = i;
                        }
                    }
                    "select" == n && o.multiple && Array.isArray(o.value) && (o.value = U(t.children).forEach((function(e) {
                        e.props.selected = -1 != o.value.indexOf(e.props.value);
                    }))), "select" == n && null != o.defaultValue && (o.value = U(t.children).forEach((function(e) {
                        e.props.selected = o.multiple ? -1 != o.defaultValue.indexOf(e.props.value) : o.defaultValue == e.props.value;
                    }))), t.class && !t.className ? (o.class = t.class, Object.defineProperty(o, "className", Qe)) : (t.className && !t.class || t.class && t.className) && (o.class = o.className = t.className), 
                    e.props = o;
                }(e), e.$$typeof = We, Xe && Xe(e);
            };
            var Ke = r.__r;
            r.__r = function(e) {
                Ke && Ke(e), Ze = e.__c;
            };
            var et = r.diffed;
            r.diffed = function(e) {
                et && et(e);
                var t = e.props, n = e.__e;
                null != n && "textarea" === e.type && "value" in t && t.value !== n.value && (n.value = null == t.value ? "" : t.value), 
                Ze = null;
            };
            var tt = {
                ReactCurrentDispatcher: {
                    current: {
                        readContext: function(e) {
                            return Ze.__n[e.__c].props.value;
                        }
                    }
                }
            };
            function nt(e) {
                return !!e && e.$$typeof === We;
            }
            function ot(e) {
                return nt(e) ? J.apply(null, arguments) : e;
            }
            function rt(e) {
                return !!e.__k && (q(null, e), !0);
            }
            function it(e) {
                e();
            }
            function lt(e) {
                var t, n, o = e.v, r = e.__;
                try {
                    var i = o();
                    return !((t = r) === (n = i) && (0 !== t || 1 / t == 1 / n) || t != t && n != n);
                } catch (e) {
                    return !0;
                }
            }
            var at = {
                useState: _e,
                useId: function() {
                    var e = ue(Y++, 11);
                    if (!e.__) {
                        for (var t = Z.__v; null !== t && !t.__m && null !== t.__; ) t = t.__;
                        var n = t.__m || (t.__m = [ 0, 0 ]);
                        e.__ = "P" + n[0] + "-" + n[1]++;
                    }
                    return e.__;
                },
                useReducer: ce,
                useEffect: fe,
                useLayoutEffect: pe,
                useInsertionEffect: pe,
                useTransition: function() {
                    return [ !1, it ];
                },
                useDeferredValue: function(e) {
                    return e;
                },
                useSyncExternalStore: function(e, t) {
                    var n = t(), o = _e({
                        h: {
                            __: n,
                            v: t
                        }
                    }), r = o[0].h, i = o[1];
                    return pe((function() {
                        r.__ = n, r.v = t, lt(r) && i({
                            h: r
                        });
                    }), [ e, n, t ]), fe((function() {
                        return lt(r) && i({
                            h: r
                        }), e((function() {
                            lt(r) && i({
                                h: r
                            });
                        }));
                    }), [ e ]), n;
                },
                startTransition: it,
                useRef: function(e) {
                    return K = 5, de((function() {
                        return {
                            current: e
                        };
                    }), []);
                },
                useImperativeHandle: function(e, t, n) {
                    K = 6, pe((function() {
                        return "function" == typeof e ? (e(t()), function() {
                            return e(null);
                        }) : e ? (e.current = t(), function() {
                            return e.current = null;
                        }) : void 0;
                    }), null == n ? n : n.concat(e));
                },
                useMemo: de,
                useCallback: function(e, t) {
                    return K = 8, de((function() {
                        return e;
                    }), t);
                },
                useContext: function(e) {
                    var t = Z.context[e.__c], n = ue(Y++, 9);
                    return n.c = e, t ? (null == n.__ && (n.__ = !0, t.sub(Z)), t.props.value) : e.__;
                },
                useDebugValue: function(e, t) {
                    ne.useDebugValue && ne.useDebugValue(t ? t(e) : e);
                },
                version: "17.0.2",
                Children: Ne,
                render: function(e, t, n) {
                    return null == t.__k && (t.textContent = ""), q(e, t), "function" == typeof n && n(), 
                    e ? e.__c : null;
                },
                hydrate: function(e, t, n) {
                    return G(e, t), "function" == typeof n && n(), e ? e.__c : null;
                },
                unmountComponentAtNode: rt,
                createPortal: Ie,
                createElement: w,
                createContext: function(e, t) {
                    var n = {
                        __c: t = "__cC" + p++,
                        __: e,
                        Consumer: function(e, t) {
                            return e.children(t);
                        },
                        Provider: function(e) {
                            var n, o;
                            return this.getChildContext || (n = [], (o = {})[t] = this, this.getChildContext = function() {
                                return o;
                            }, this.shouldComponentUpdate = function(e) {
                                this.props.value !== e.value && n.some((function(e) {
                                    e.__e = !0, P(e);
                                }));
                            }, this.sub = function(e) {
                                n.push(e);
                                var t = e.componentWillUnmount;
                                e.componentWillUnmount = function() {
                                    n.splice(n.indexOf(e), 1), t && t.call(e);
                                };
                            }), e.children;
                        }
                    };
                    return n.Provider.__ = n.Consumer.contextType = n;
                },
                createFactory: function(e) {
                    return w.bind(null, e);
                },
                cloneElement: ot,
                createRef: function() {
                    return {
                        current: null
                    };
                },
                Fragment: C,
                isValidElement: nt,
                isElement: nt,
                isFragment: function(e) {
                    return nt(e) && e.type === C;
                },
                isMemo: function(e) {
                    return !!e && !!e.displayName && ("string" == typeof e.displayName || e.displayName instanceof String) && e.displayName.startsWith("Memo(");
                },
                findDOMNode: function(e) {
                    return e && (e.base || 1 === e.nodeType && e) || null;
                },
                Component: O,
                PureComponent: we,
                memo: function(e, t) {
                    function n(e) {
                        var n = this.props.ref, o = n == e.ref;
                        return !o && n && (n.call ? n(null) : n.current = null), t ? !t(this.props, e) || !o : Ee(this.props, e);
                    }
                    function o(t) {
                        return this.shouldComponentUpdate = n, w(e, t);
                    }
                    return o.displayName = "Memo(" + (e.displayName || e.name) + ")", o.prototype.isReactComponent = !0, 
                    o.__f = !0, o;
                },
                forwardRef: function(e) {
                    function t(t) {
                        var n = xe({}, t);
                        return delete n.ref, e(n, t.ref || null);
                    }
                    return t.$$typeof = Ce, t.render = t, t.prototype.isReactComponent = t.__f = !0, 
                    t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
                },
                flushSync: function(e, t) {
                    return e(t);
                },
                unstable_batchedUpdates: function(e, t) {
                    return e(t);
                },
                StrictMode: C,
                Suspense: De,
                SuspenseList: Ue,
                lazy: function(e) {
                    var t, n, o;
                    function r(r) {
                        if (t || (t = e()).then((function(e) {
                            n = e.default || e;
                        }), (function(e) {
                            o = e;
                        })), o) throw o;
                        if (!n) throw t;
                        return w(n, r);
                    }
                    return r.displayName = "Lazy", r.__f = !0, r;
                },
                __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: tt
            };
            const st = (e, t) => {
                var n = document.createElement("div");
                if ("string" == typeof t) if (document.getElementById(t)) t = document.getElementById(t); else {
                    var o = document.createElement("div");
                    o.setAttribute("id", t), (t = o).style.position = "fixed", t.style.bottom = "20px", 
                    t.style.right = "30px", t.style.display = "flex", t.style.flexDirection = "column-reverse", 
                    t.style.overflowX = "hidden", t.style.overflowY = "scroll", t.style.zIndex = "100000", 
                    t.style.maxHeight = "95%", document.body.appendChild(t);
                }
                function r() {
                    n && (rt(n), n = null);
                }
                return q(Ie(ot(e, {
                    unmountLayer: r
                }), t), n), r;
            };
            function ut(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
                return o;
            }
            function _t(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e;
                }(e) || function(e, t) {
                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != n) {
                        var o, r, i, l, a = [], s = !0, u = !1;
                        try {
                            if (i = (n = n.call(e)).next, 0 === t) {
                                if (Object(n) !== n) return;
                                s = !1;
                            } else for (;!(s = (o = i.call(n)).done) && (a.push(o.value), a.length !== t); s = !0) ;
                        } catch (e) {
                            u = !0, r = e;
                        } finally {
                            try {
                                if (!s && null != n.return && (l = n.return(), Object(l) !== l)) return;
                            } finally {
                                if (u) throw r;
                            }
                        }
                        return a;
                    }
                }(e, t) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return ut(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ut(e, t) : void 0;
                    }
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }();
            }
            var ct = n(262), ft = n.n(ct), pt = n(942), dt = n.n(pt);
            function mt(e, t) {
                if (null == e) return {};
                var n, o, r = function(e, t) {
                    if (null == e) return {};
                    var n, o, r = {}, i = Object.keys(e);
                    for (o = 0; o < i.length; o++) n = i[o], t.indexOf(n) >= 0 || (r[n] = e[n]);
                    return r;
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (o = 0; o < i.length; o++) n = i[o], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
                }
                return r;
            }
            var vt = [ "hoverText", "children" ];
            function ht() {
                return ht = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
                    }
                    return e;
                }, ht.apply(this, arguments);
            }
            var bt = {
                position: "relative"
            };
            const yt = at.memo((e => {
                var t = e.hoverText, n = e.children, o = mt(e, vt), r = at.useRef(), i = _t(at.useState(!1), 2), l = i[0], a = i[1], s = at.useCallback((() => a(!0)), []), u = at.useCallback((() => a(!1)), []);
                return at.createElement("div", ht({
                    onmouseenter: s,
                    onmouseout: u,
                    style: bt
                }, o), at.createElement("div", {
                    ref: r,
                    className: dt()("div-hover", l ? "show" : "hide")
                }, t), n);
            }));
            function gt(e) {
                return gt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                }, gt(e);
            }
            function kt(e) {
                var t = function(e, t) {
                    if ("object" != gt(e) || !e) return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var o = n.call(e, t || "default");
                        if ("object" != gt(o)) return o;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return ("string" === t ? String : Number)(e);
                }(e, "string");
                return "symbol" == gt(t) ? t : t + "";
            }
            var xt = {
                isEnabled: !1,
                groups: [ {
                    dir: "pictures",
                    formats: [ "jpg", "jpeg", "png", "gif", "svg", "bmp", "ico", "webp" ]
                }, {
                    dir: "music",
                    formats: [ "mp3", "aac", "wav", "ogg", "flac", "wma", "m4a", "m4p" ]
                }, {
                    dir: "videos",
                    formats: [ "mkv", "avi", "3gp", "3g2", "mov", "flv", "mp4", "m4v", "mpg", "mpeg", "webm", "ogv" ]
                } ]
            };
            function Et(e, t, n) {
                v.A.sendMessage({
                    action: "track",
                    t: "event",
                    ec: e,
                    ea: t,
                    el: n,
                    tid: "G-4WQE4RFM8F"
                });
            }
            function wt(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    t && (o = o.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    }))), n.push.apply(n, o);
                }
                return n;
            }
            function St(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? wt(Object(n), !0).forEach((function(t) {
                        var o, r, i;
                        o = e, r = t, i = n[t], (r = kt(r)) in o ? Object.defineProperty(o, r, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : o[r] = i;
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wt(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    }));
                }
                return e;
            }
            var Ct = {
                groups: [],
                isEnabled: !1
            }, Ot = "initOption", Nt = "toggleEnable", At = "resetOption", Pt = "addItem", Mt = "removeItem", jt = "startEdit", Dt = "saveItem", Tt = [ Ot, jt ];
            function Ut(e, t) {
                var n, o, r = function(e, t) {
                    switch (t.type) {
                      case Ot:
                        return Et("menu", "click", "settings"), {
                            groups: t.groups,
                            isEnabled: t.isEnabled
                        };

                      case Nt:
                        return Et("settings", "sort_downloads", t.isEnabled ? "check" : "uncheck"), St(St({}, e), {}, {
                            isEnabled: t.isEnabled
                        });

                      case At:
                        return Et("sort_downloads", "click", "reset"), St(St({}, xt), {}, {
                            isEnabled: e.isEnabled
                        });

                      case Pt:
                        return Et("sort_downloads", "click", "add"), St(St({}, e), {}, {
                            groups: [ ...e.groups, {
                                dir: "my-folder",
                                formats: []
                            } ]
                        });

                      case Mt:
                        return e.groups[t.id] && Et("sort_downloads", "delete", e.groups[t.id].dir), St(St({}, e), {}, {
                            groups: [ ...e.groups.filter(((e, n) => n !== t.id)) ]
                        });

                      case jt:
                        return e.groups[t.id] && Et("sort_downloads", "edit", e.groups[t.id].dir), St({}, e);

                      case Dt:
                        var n = e.groups.map(((e, n) => {
                            if (t.id === n) {
                                t.dir !== e.dir && Et("sort_downloads", "rename_folder", `${e.dir} ${t.dir}`);
                                var o = () => !t.formats.every((t => e.formats.includes(t)));
                                if (t.formats.length !== e.formats.length || o()) Et("sort_downloads", "add_format", `${t.dir}, ${e.formats.join(" ")}, ${t.formats.join(" ")}`);
                                return {
                                    formats: t.formats,
                                    dir: t.dir
                                };
                            }
                            return St({}, e);
                        }));
                        return St(St({}, e), {}, {
                            groups: n
                        });

                      default:
                        return e;
                    }
                }(e, t);
                return Tt.includes(t.type) || (n = r.isEnabled, o = r.groups, v.A.sendMessage({
                    action: "updateOption",
                    key: "sortDownloads",
                    value: {
                        isEnabled: n,
                        groups: o
                    }
                })), r;
            }
            const Ht = e => {
                var t = e.locals, n = e.use, o = e.unuse;
                return at.useMemo(n, []), at.useEffect((() => o), []), t;
            };
            var Ft = at.createContext(), Rt = {
                marginBottom: 15
            }, It = at.memo((e => {
                var t = e.options;
                Ht(ft());
                var n = _t(at.useReducer(Ut, Ct), 2), o = n[0], r = n[1], i = at.useCallback((e => {
                    e.preventDefault(), r({
                        type: Pt
                    });
                }), []), l = at.useCallback((e => {
                    e.preventDefault(), r({
                        type: At
                    });
                }), []), a = at.useCallback((e => {
                    r({
                        type: Nt,
                        isEnabled: e.target.checked
                    });
                }), []);
                return at.useMemo((() => {
                    r({
                        type: Ot,
                        groups: t.groups,
                        isEnabled: t.isEnabled
                    });
                }), []), at.createElement(Ft.Provider, {
                    value: {
                        state: o,
                        dispatch: r
                    }
                }, at.createElement("div", {
                    style: Rt
                }, at.createElement("label", null, at.createElement("input", {
                    type: "checkbox",
                    onClick: a,
                    checked: o.isEnabled ? 1 : 0
                }), at.createElement("span", null, v.A.i18n.getMessage("options_management")))), at.createElement("div", {
                    className: dt()("sf-table", !o.isEnabled && "sf-disabled")
                }, at.createElement("div", {
                    className: "sf-table-row-head"
                }, at.createElement(yt, {
                    className: "sf-table-cell",
                    hoverText: v.A.i18n.getMessage("optionsDirectory")
                }, v.A.i18n.getMessage("options_Directory_title")), at.createElement(yt, {
                    className: "sf-table-cell",
                    hoverText: v.A.i18n.getMessage("optionsFormats")
                }, v.A.i18n.getMessage("options_Formats_title")), at.createElement("div", {
                    className: "sf-table-cell"
                }, v.A.i18n.getMessage("options_Actions_title"))), at.createElement("div", {
                    className: "sf-table-body"
                }, o.groups.map(((e, t) => at.createElement(Wt, {
                    group: e,
                    id: t,
                    key: t.toString()
                }))))), at.createElement("div", {
                    className: dt()("sf-group-buttons", !o.isEnabled && "sf-disabled")
                }, at.createElement("button", {
                    className: "sf-btn",
                    onClick: i
                }, v.A.i18n.getMessage("options_button_add")), at.createElement("button", {
                    className: "sf-btn",
                    onClick: l
                }, v.A.i18n.getMessage("options_button_reset"))));
            })), Wt = at.memo((e => {
                var t = e.id, n = e.group, o = at.useContext(Ft).dispatch, r = _t(at.useState(!1), 2), i = r[0], l = r[1], a = at.useCallback((e => {
                    e.preventDefault(), e.stopPropagation(), o({
                        type: Mt,
                        id: t
                    });
                }), []), s = at.useCallback((e => {
                    e.preventDefault(), e.stopPropagation(), l(!1);
                }), []), u = at.useCallback((e => {
                    e.preventDefault(), e.stopPropagation(), o({
                        type: jt,
                        id: t
                    }), l(!0);
                }), []), _ = at.useCallback((e => {
                    e.preventDefault(), e.stopPropagation();
                    var n = e.target, r = /[.,!:;\/_+=']/g, i = n.elements.dir.value, a = n.elements.formats.value;
                    i = i.replace(r, ""), a = a.replace(r, "").split(" ").filter(Boolean), o({
                        type: Dt,
                        id: t,
                        dir: i,
                        formats: a
                    }), l(!1);
                }), []), c = at.useMemo((() => 0 === n.formats.length), [ n ]);
                return at.createElement("form", {
                    className: "sf-table-row",
                    onSubmit: _
                }, at.createElement("div", {
                    className: "sf-table-cell"
                }, at.createElement(Lt, {
                    name: "dir",
                    input: n.dir,
                    editable: i,
                    type: 1
                })), at.createElement("div", {
                    className: "sf-table-cell"
                }, (i || !c) && at.createElement(Lt, {
                    name: "formats",
                    input: n.formats,
                    editable: i,
                    type: 0
                }), !i && c && at.createElement("span", {
                    className: "text-muted"
                }, v.A.i18n.getMessage("options_no_type_msg"))), at.createElement("div", {
                    className: "sf-table-cell"
                }, !i && at.createElement("div", null, at.createElement("button", {
                    className: "sf-btn",
                    onClick: u
                }, v.A.i18n.getMessage("options_button_edit")), at.createElement("button", {
                    className: "sf-btn",
                    onClick: a
                }, v.A.i18n.getMessage("options_button_delete"))), i && at.createElement("div", null, at.createElement("button", {
                    className: "sf-btn",
                    type: "submit"
                }, v.A.i18n.getMessage("options_button_save")), at.createElement("button", {
                    className: "sf-btn",
                    onClick: s
                }, v.A.i18n.getMessage("options_button_cancel")))));
            })), Lt = at.memo((e => {
                var t = e.name, n = e.input, o = e.editable, r = e.type;
                return at.createElement("div", null, o && at.createElement("input", {
                    type: "text",
                    name: t,
                    className: "sf-input",
                    value: 0 === r ? n.join(" ") : n
                }), !o && 0 === r && n.map((e => at.createElement("div", {
                    className: "sf-badge"
                }, e))), !o && 1 === r && at.createElement("div", null, n));
            }));
            const $t = It;
            m().use();
            var Vt = [];
            v.A.onDestroy.addListener((() => {
                m().unuse(), Vt.forEach((e => e()));
            })), function(e) {
                e = e || document.body;
                var t = {}, n = function(t, n) {
                    var o = e.querySelector(`#${t}`);
                    o && (o.style.display = n ? "none" : "");
                }, o = function(e) {
                    var t = e.target;
                    v.A.sendMessage({
                        action: "updateOption",
                        key: t.id,
                        value: t.checked
                    });
                }, r = function() {
                    var r, i, l, a;
                    for (i = 0, l = (a = e.querySelectorAll("*[data-i18n]")).length; i < l; i++) (r = a[i]).textContent = v.A.i18n.getMessage(r.dataset.i18n);
                    t.hasSovetnik || n("blockSovetnikEnabled", !0), t.aviaBarEnabled || n("blockAviaBar", !0), 
                    t.showUmmyItem || n("blockUmmyInfo", !0);
                    var s = h.A.create("div", {
                        id: "blockFfmpegEnabled",
                        class: "sf-block",
                        append: [ h.A.create("label", {
                            append: [ h.A.create("input", {
                                type: "checkbox",
                                id: "ffmpegEnabled",
                                checked: !1
                            }), String.fromCharCode(160), h.A.create("span", {
                                text: v.A.i18n.getMessage("optionsFfmpegEnabled")
                            }) ]
                        }) ]
                    }), u = e.querySelector(".sf-options-container .sf-clear");
                    for (u.parentNode.insertBefore(s, u), v.A.isFirefox && function() {
                        var t = "blockSaveAsDialogEnabled";
                        if (!e.querySelector(`#${t}`)) {
                            var n = h.A.create("div", {
                                id: t,
                                class: "sf-block",
                                append: [ h.A.create("label", {
                                    append: [ h.A.create("input", {
                                        type: "checkbox",
                                        id: "saveAsDialog",
                                        checked: !1
                                    }), String.fromCharCode(160), h.A.create("span", {
                                        text: v.A.i18n.getMessage("optionsSaveAsDialog")
                                    }) ]
                                }) ]
                            }), o = e.querySelector(".sf-options-container .sf-block");
                            o.parentNode.insertBefore(n, o);
                        }
                    }(), i = 0, l = (a = e.querySelectorAll('form input[type="checkbox"]')).length; i < l; i++) (r = a[i]).id && void 0 !== t[r.id] && (r.checked = !!t[r.id], 
                    r.addEventListener("change", o, !1));
                    if (v.A.isGM) {
                        for (i = 0, l = (a = e.querySelectorAll(".sf-browser.sf-userscript")).length; i < l; i++) (r = a[i]).style.display = "block";
                        if ("undefined" != typeof GM_download) {
                            var _ = e.querySelector("#blockGmNativeDownload");
                            _ && (_.style.display = "block");
                        }
                    }
                    if (t.sortDownloads) {
                        var c = st(w($t, {
                            options: t.sortDownloads
                        }), e.querySelector("#sortDownloads"));
                        Vt.push(c);
                    }
                };
                v.A.callFn("getPreferences").then((n => {
                    t = n, r(), e.classList.remove("loading");
                })), setTimeout((function() {
                    e.classList.remove("loading");
                }), 1e3);
            }(v.A.container);
        },
        70: (e, t, n) => {
            "use strict";
            n.r(t), n.d(t, {
                default: () => a
            });
            var o = n(601), r = n.n(o), i = n(314), l = n.n(i)()(r());
            l.push([ e.id, ".sf-options-body{background-color:#e9eaf0;font-family:sans-serif;font-size:small}.sf-options-body.loading>*{visibility:hidden}.sf-options-body .sf-options-container{background-color:#f6f6f9;border:1px solid #cacdd9;border-radius:7px;width:700px;margin:12px auto;padding:15px}.sf-options-body .sf-options-container h1{font-family:sans-serif;font-size:1.3em;margin:0 0 1.3em 0}.sf-options-body .sf-options-container div{display:block}.sf-options-body .sf-options-container form{margin:0;padding:0}.sf-options-body .sf-options-container label{display:block;margin:.2em 0;padding:0}.sf-options-body .sf-options-container .sf-inline label{display:inline}.sf-options-body .sf-options-container .sf-clear{clear:both;height:0;font-size:0;line-height:0}.sf-options-body .sf-options-container .sf-block{border-top:1px solid #dfe1e8;padding:1.5em 0 0 0;margin:1.5em 0 0 0;min-width:160px}.sf-options-body .sf-options-container .sf-browser{display:none}.sf-options-body .sf-options-container .sf-title{font-weight:700;margin-bottom:.5em}.sf-options-body .sf-options-container .sf-module{font-weight:700;margin-top:1em}.sf-options-body .sf-options-container .sf-module:first-child{margin-top:0}.sf-options-body .sf-options-container .sf-module_options{font-weight:400;margin-left:2em}.sf-options-popup{z-index:9999;display:block;float:none;position:fixed;margin:0;padding:0;visibility:hidden;color:#000;background:#fff;border:3px solid #c0cad5;border-radius:7px;overflow:auto}.sf-options-popup .sf-options-body{display:block;float:none;position:relative;overflow:auto;margin:0;padding:10px 15px;background:#fff}.sf-options-popup .sf-options-body .sf-options-container{background-color:#fff;border:none;font:13px/1 Arial,Helvetica,sans-serif;width:580px;margin:0;padding:9px;text-align:left}.sf-options-popup img.sf-close{position:absolute;top:10px;right:15px;opacity:.5;cursor:pointer}.sf-options-popup img.sf-close:hover{opacity:.9}", "" ]);
            const a = l;
        },
        456: (e, t, n) => {
            "use strict";
            n.r(t), n.d(t, {
                default: () => a
            });
            var o = n(601), r = n.n(o), i = n(314), l = n.n(i)()(r());
            l.push([ e.id, '.sf-block div.sf-table{display:table!important;width:100%}.sf-block div.sf-table-row,.sf-block div.sf-table-row-head,.sf-block form.sf-table-row{display:table-row!important}.sf-block .sf-table-row:hover{display:table-row!important;background:#ebffe8}.sf-block div.sf-table-row-head{background:#00bf80;color:#fff}.sf-block div.sf-table-row-head .sf-table-cell{border:1px solid #01ab73}.sf-block div.sf-table-cell{display:table-cell!important;border:1px solid #e8e9eb;padding:10px;width:25%;word-break:break-all;vertical-align:middle}.sf-block div.sf-table-body{display:table-row-group!important}.sf-block .sf-group-buttons{margin-top:15px;margin-bottom:65px}.sf-block .sf-btn{float:left;padding:5px;cursor:pointer;font-weight:700;font-size:12px;background:#e9eaf0;border:1px solid #c1c1c7;border-radius:4px;margin-right:5px}.sf-block .sf-badge{padding:3px;float:left;margin-right:7px;background:#536760;border-radius:4px;color:#fff;margin-bottom:4px}.sf-block .sf-input{padding:4px;border:1px solid #d0c6c6;border-radius:4px;width:90%}.sf-block .sf-disabled{opacity:.4;pointer-events:none}.sf-block .text-muted{opacity:.6}.sf-block .div-hover{position:absolute;bottom:45px;background:#484444;padding:5px;border-radius:6px;min-width:32px;text-align:center;font-size:12px;word-break:break-word}.sf-block .div-hover::after{content:" ";position:absolute;top:100%;left:50%;margin-left:-10px;border-width:6px;border-style:solid;border-color:#2d2b2b transparent transparent transparent}.sf-block .hide{display:none!important}.sf-block .show{display:block!important}', "" ]);
            const a = l;
        },
        228: (e, t, n) => {
            var o = n(72), r = n(70);
            "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.id, r, "" ] ]);
            var i, l = 0, a = {
                injectType: "lazyStyleTag",
                insert: "head",
                singleton: !1
            }, s = {};
            s.locals = r.locals || {}, s.use = function() {
                return l++ || (i = o(r, a)), s;
            }, s.unuse = function() {
                l > 0 && ! --l && (i(), i = null);
            }, e.exports = s;
        },
        262: (e, t, n) => {
            var o = n(72), r = n(456);
            "string" == typeof (r = r.__esModule ? r.default : r) && (r = [ [ e.id, r, "" ] ]);
            var i, l = 0, a = {
                injectType: "lazyStyleTag",
                insert: "head",
                singleton: !1
            }, s = {};
            s.locals = r.locals || {}, s.use = function() {
                return l++ || (i = o(r, a)), s;
            }, s.unuse = function() {
                l > 0 && ! --l && (i(), i = null);
            }, e.exports = s;
        },
        942: (e, t) => {
            var n;
            !function() {
                "use strict";
                var o = {}.hasOwnProperty;
                function r() {
                    for (var e = "", t = 0; t < arguments.length; t++) {
                        var n = arguments[t];
                        n && (e = l(e, i(n)));
                    }
                    return e;
                }
                function i(e) {
                    if ("string" == typeof e || "number" == typeof e) return e;
                    if ("object" != typeof e) return "";
                    if (Array.isArray(e)) return r.apply(null, e);
                    if (e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]")) return e.toString();
                    var t = "";
                    for (var n in e) o.call(e, n) && e[n] && (t = l(t, n));
                    return t;
                }
                function l(e, t) {
                    return t ? e ? e + " " + t : e + t : e;
                }
                e.exports ? (r.default = r, e.exports = r) : void 0 === (n = function() {
                    return r;
                }.apply(t, [])) || (e.exports = n);
            }();
        }
    }, n = {};
    function o(e) {
        var r = n[e];
        if (void 0 !== r) return r.exports;
        var i = n[e] = {
            id: e,
            exports: {}
        };
        return t[e](i, i.exports, o), i.exports;
    }
    o.m = t, e = [], o.O = (t, n, r, i) => {
        if (!n) {
            var l = 1 / 0;
            for (_ = 0; _ < e.length; _++) {
                for (var [n, r, i] = e[_], a = !0, s = 0; s < n.length; s++) (!1 & i || l >= i) && Object.keys(o.O).every((e => o.O[e](n[s]))) ? n.splice(s--, 1) : (a = !1, 
                i < l && (l = i));
                if (a) {
                    e.splice(_--, 1);
                    var u = r();
                    void 0 !== u && (t = u);
                }
            }
            return t;
        }
        i = i || 0;
        for (var _ = e.length; _ > 0 && e[_ - 1][2] > i; _--) e[_] = e[_ - 1];
        e[_] = [ n, r, i ];
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
    }, o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), o.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, (() => {
        var e = {
            575: 0
        };
        o.O.j = t => 0 === e[t];
        var t = (t, n) => {
            var r, i, [l, a, s] = n, u = 0;
            if (l.some((t => 0 !== e[t]))) {
                for (r in a) o.o(a, r) && (o.m[r] = a[r]);
                if (s) var _ = s(o);
            }
            for (t && t(n); u < l.length; u++) i = l[u], o.o(e, i) && e[i] && e[i][0](), e[i] = 0;
            return o.O(_);
        }, n = self.savefromPageWebpackJsonp = self.savefromPageWebpackJsonp || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n));
    })(), o.nc = void 0;
    var r = o.O(void 0, [ 324 ], (() => o(682)));
    r = o.O(r);
})();