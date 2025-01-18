import { d as se, o as S, c as T, q as ce, h as pe, p as Pe, e as q, f as ot, w as dt, a as A, m as jt, u as j, t as ne, i as ee, F as ue, b as F, g as Te, r as ae, j as Z, C as _e, D as Dt, k as Pt, n as Tt, l as _t, A as ft, W as vt, X as At, Y as Et, U as Rt, R as ye, V as nt, Z as Nt, $ as Ht, a0 as It, a1 as Ve, a2 as Vt, a3 as qt, a4 as zt, O as $t, ad as Wt, a9 as rt } from "./esm-index-C1muFETj.js";
import { u as Ft, a as Ut } from "./useMerchantActions-DQd7fZJe.js";
const Kt = {
  key: 1,
  class: "inline-flex"
}, Yt = /* @__PURE__ */ se({
  __name: "RButton",
  props: {
    loading: { type: Boolean, default: !1 },
    loaderLabel: { default: "" },
    enableOnClickAutomaticLoader: { type: Boolean, default: !0 },
    tag: { default: "button" },
    theme: {},
    inverted: { type: Boolean },
    outlined: { type: Boolean },
    lighted: { type: Boolean },
    block: { type: Boolean },
    small: { type: Boolean },
    blockOnMobile: { type: Boolean },
    type: { default: "button" },
    tabindex: { default: 0 },
    disabled: { type: Boolean },
    disabledTheme: { type: Boolean },
    disabledState: { type: Boolean }
  },
  setup(t) {
    const e = t, o = Z(!1), n = Z(!0), r = Pt(), i = q(() => e.loading || o.value), s = q(() => r.href !== void 0 && r.href !== null ? "a" : e.tag);
    return (a, l) => (S(), Te(_t(s.value), {
      class: Tt(["a-btn", [
        a.theme ? "-" + a.theme : "",
        a.inverted ? "-inverted" : "",
        a.outlined ? "-outlined" : "",
        a.lighted ? "-inverted" : "",
        a.block ? "-block" : "",
        a.blockOnMobile ? "-blockOnMobile" : "",
        a.small ? "-small" : "",
        a.disabled || a.disabledTheme ? "-disabled" : ""
      ]]),
      type: a.tag === "button" ? a.type : null,
      role: a.tag === "div" ? "button" : null,
      tabindex: a.tag === "div" ? a.tabindex.toString() : null,
      disabled: i.value || a.disabled || a.disabledState ? "" : null,
      onClick: l[0] || (l[0] = (c) => n.value = !0)
    }, {
      default: ee(() => [
        i.value ? ae(a.$slots, "loaderSlot", { key: 0 }, () => [
          a.loaderLabel ? (S(), T(ue, { key: 0 }, [
            F(ne(a.loaderLabel), 1)
          ], 64)) : (S(), T("span", Kt, l[1] || (l[1] = [
            A("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : ae(a.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), Jt = /* @__PURE__ */ se({
  __name: "RButtonPrimary",
  setup(t) {
    return (e, o) => (S(), Te(Yt, { theme: "primary" }, {
      loaderLabel: ee(() => [
        ae(e.$slots, "loaderSlot")
      ]),
      default: ee(() => [
        ae(e.$slots, "default")
      ]),
      _: 3
    }));
  }
});
function He(t, e, o) {
  var n, r, i, s, a;
  e == null && (e = 100);
  function l() {
    var p = Date.now() - s;
    p < e && p >= 0 ? n = setTimeout(l, e - p) : (n = null, o || (a = t.apply(i, r), i = r = null));
  }
  var c = function() {
    i = this, r = arguments, s = Date.now();
    var p = o && !n;
    return n || (n = setTimeout(l, e)), p && (a = t.apply(i, r), i = r = null), a;
  };
  return c.clear = function() {
    n && (clearTimeout(n), n = null);
  }, c.flush = function() {
    n && (a = t.apply(i, r), i = r = null, clearTimeout(n), n = null);
  }, c;
}
He.debounce = He;
var Re = He;
function Gt(t, e, o) {
  zt(t) ? ye(t, (n, r) => {
    r == null || r.removeEventListener(e, o), n == null || n.addEventListener(e, o);
  }) : _e(() => {
    t.addEventListener(e, o);
  }), Ve(() => {
    var n;
    (n = j(t)) === null || n === void 0 || n.removeEventListener(e, o);
  });
}
function Xt(t, e) {
  return typeof window > "u" || !window ? void 0 : Gt(window, "pointerdown", (o) => {
    const n = j(t);
    n && (n === o.target || o.composedPath().includes(n) || e(o));
  });
}
function Qt(t, e, o) {
  let n = null;
  const r = Z(!1);
  _e(() => {
    (t.content !== void 0 || o.value) && (r.value = !0), n = new MutationObserver(i), n.observe(e.value, {
      childList: !0,
      subtree: !0
    });
  }), Ve(() => n.disconnect()), ye(o, (s) => {
    s ? r.value = !0 : r.value = !1;
  });
  const i = () => {
    t.content ? r.value = !0 : r.value = !1;
  };
  return {
    hasContent: r
  };
}
function de(t, e) {
  var o = t.getBoundingClientRect(), n = 1, r = 1;
  return {
    width: o.width / n,
    height: o.height / r,
    top: o.top / r,
    right: o.right / n,
    bottom: o.bottom / r,
    left: o.left / n,
    x: o.left / n,
    y: o.top / r
  };
}
function W(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function qe(t) {
  var e = W(t), o = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: n
  };
}
function ge(t) {
  var e = W(t).Element;
  return t instanceof e || t instanceof Element;
}
function R(t) {
  var e = W(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function ht(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = W(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Zt(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function eo(t) {
  return t === W(t) || !R(t) ? qe(t) : Zt(t);
}
function K(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function ie(t) {
  return ((ge(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function ze(t) {
  return de(ie(t)).left + qe(t).scrollLeft;
}
function te(t) {
  return W(t).getComputedStyle(t);
}
function $e(t) {
  var e = te(t), o = e.overflow, n = e.overflowX, r = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + r + n);
}
function to(t) {
  var e = t.getBoundingClientRect(), o = e.width / t.offsetWidth || 1, n = e.height / t.offsetHeight || 1;
  return o !== 1 || n !== 1;
}
function oo(t, e, o) {
  o === void 0 && (o = !1);
  var n = R(e);
  R(e) && to(e);
  var r = ie(e), i = de(t), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !o) && ((K(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  $e(r)) && (s = eo(e)), R(e) ? (a = de(e), a.x += e.clientLeft, a.y += e.clientTop) : r && (a.x = ze(r))), {
    x: i.left + s.scrollLeft - a.x,
    y: i.top + s.scrollTop - a.y,
    width: i.width,
    height: i.height
  };
}
function We(t) {
  var e = de(t), o = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - o) <= 1 && (o = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: o,
    height: n
  };
}
function Ae(t) {
  return K(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (ht(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ie(t)
  );
}
function mt(t) {
  return ["html", "body", "#document"].indexOf(K(t)) >= 0 ? t.ownerDocument.body : R(t) && $e(t) ? t : mt(Ae(t));
}
function be(t, e) {
  var o;
  e === void 0 && (e = []);
  var n = mt(t), r = n === ((o = t.ownerDocument) == null ? void 0 : o.body), i = W(n), s = r ? [i].concat(i.visualViewport || [], $e(n) ? n : []) : n, a = e.concat(s);
  return r ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(be(Ae(s)))
  );
}
function no(t) {
  return ["table", "td", "th"].indexOf(K(t)) >= 0;
}
function at(t) {
  return !R(t) || // https://github.com/popperjs/popper-core/issues/837
  te(t).position === "fixed" ? null : t.offsetParent;
}
function ro(t) {
  var e = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, o = navigator.userAgent.indexOf("Trident") !== -1;
  if (o && R(t)) {
    var n = te(t);
    if (n.position === "fixed")
      return null;
  }
  for (var r = Ae(t); R(r) && ["html", "body"].indexOf(K(r)) < 0; ) {
    var i = te(r);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
      return r;
    r = r.parentNode;
  }
  return null;
}
function ke(t) {
  for (var e = W(t), o = at(t); o && no(o) && te(o).position === "static"; )
    o = at(o);
  return o && (K(o) === "html" || K(o) === "body" && te(o).position === "static") ? e : o || ro(t) || e;
}
var N = "top", z = "bottom", $ = "right", H = "left", Fe = "auto", Oe = [N, z, $, H], fe = "start", we = "end", ao = "clippingParents", bt = "viewport", me = "popper", io = "reference", it = /* @__PURE__ */ Oe.reduce(function(t, e) {
  return t.concat([e + "-" + fe, e + "-" + we]);
}, []), yt = /* @__PURE__ */ [].concat(Oe, [Fe]).reduce(function(t, e) {
  return t.concat([e, e + "-" + fe, e + "-" + we]);
}, []), so = "beforeRead", lo = "read", co = "afterRead", po = "beforeMain", uo = "main", fo = "afterMain", vo = "beforeWrite", ho = "write", mo = "afterWrite", bo = [so, lo, co, po, uo, fo, vo, ho, mo];
function yo(t) {
  var e = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(i) {
    e.set(i.name, i);
  });
  function r(i) {
    o.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(a) {
      if (!o.has(a)) {
        var l = e.get(a);
        l && r(l);
      }
    }), n.push(i);
  }
  return t.forEach(function(i) {
    o.has(i.name) || r(i);
  }), n;
}
function go(t) {
  var e = yo(t);
  return bo.reduce(function(o, n) {
    return o.concat(e.filter(function(r) {
      return r.phase === n;
    }));
  }, []);
}
function wo(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(o) {
      Promise.resolve().then(function() {
        e = void 0, o(t());
      });
    })), e;
  };
}
function U(t) {
  return t.split("-")[0];
}
function xo(t) {
  var e = t.reduce(function(o, n) {
    var r = o[n.name];
    return o[n.name] = r ? Object.assign({}, r, n, {
      options: Object.assign({}, r.options, n.options),
      data: Object.assign({}, r.data, n.data)
    }) : n, o;
  }, {});
  return Object.keys(e).map(function(o) {
    return e[o];
  });
}
function ko(t) {
  var e = W(t), o = ie(t), n = e.visualViewport, r = o.clientWidth, i = o.clientHeight, s = 0, a = 0;
  return n && (r = n.width, i = n.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (s = n.offsetLeft, a = n.offsetTop)), {
    width: r,
    height: i,
    x: s + ze(t),
    y: a
  };
}
var re = Math.max, xe = Math.min, Me = Math.round;
function Oo(t) {
  var e, o = ie(t), n = qe(t), r = (e = t.ownerDocument) == null ? void 0 : e.body, i = re(o.scrollWidth, o.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), s = re(o.scrollHeight, o.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), a = -n.scrollLeft + ze(t), l = -n.scrollTop;
  return te(r || o).direction === "rtl" && (a += re(o.clientWidth, r ? r.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: a,
    y: l
  };
}
function gt(t, e) {
  var o = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (o && ht(o)) {
    var n = e;
    do {
      if (n && t.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function Ie(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Co(t) {
  var e = de(t);
  return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
}
function st(t, e) {
  return e === bt ? Ie(ko(t)) : R(e) ? Co(e) : Ie(Oo(ie(t)));
}
function Bo(t) {
  var e = be(Ae(t)), o = ["absolute", "fixed"].indexOf(te(t).position) >= 0, n = o && R(t) ? ke(t) : t;
  return ge(n) ? e.filter(function(r) {
    return ge(r) && gt(r, n) && K(r) !== "body";
  }) : [];
}
function So(t, e, o) {
  var n = e === "clippingParents" ? Bo(t) : [].concat(e), r = [].concat(n, [o]), i = r[0], s = r.reduce(function(a, l) {
    var c = st(t, l);
    return a.top = re(c.top, a.top), a.right = xe(c.right, a.right), a.bottom = xe(c.bottom, a.bottom), a.left = re(c.left, a.left), a;
  }, st(t, i));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function ve(t) {
  return t.split("-")[1];
}
function Ue(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function wt(t) {
  var e = t.reference, o = t.element, n = t.placement, r = n ? U(n) : null, i = n ? ve(n) : null, s = e.x + e.width / 2 - o.width / 2, a = e.y + e.height / 2 - o.height / 2, l;
  switch (r) {
    case N:
      l = {
        x: s,
        y: e.y - o.height
      };
      break;
    case z:
      l = {
        x: s,
        y: e.y + e.height
      };
      break;
    case $:
      l = {
        x: e.x + e.width,
        y: a
      };
      break;
    case H:
      l = {
        x: e.x - o.width,
        y: a
      };
      break;
    default:
      l = {
        x: e.x,
        y: e.y
      };
  }
  var c = r ? Ue(r) : null;
  if (c != null) {
    var p = c === "y" ? "height" : "width";
    switch (i) {
      case fe:
        l[c] = l[c] - (e[p] / 2 - o[p] / 2);
        break;
      case we:
        l[c] = l[c] + (e[p] / 2 - o[p] / 2);
        break;
    }
  }
  return l;
}
function xt() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function kt(t) {
  return Object.assign({}, xt(), t);
}
function Ot(t, e) {
  return e.reduce(function(o, n) {
    return o[n] = t, o;
  }, {});
}
function Ke(t, e) {
  e === void 0 && (e = {});
  var o = e, n = o.placement, r = n === void 0 ? t.placement : n, i = o.boundary, s = i === void 0 ? ao : i, a = o.rootBoundary, l = a === void 0 ? bt : a, c = o.elementContext, p = c === void 0 ? me : c, b = o.altBoundary, m = b === void 0 ? !1 : b, f = o.padding, v = f === void 0 ? 0 : f, u = kt(typeof v != "number" ? v : Ot(v, Oe)), h = p === me ? io : me, y = t.rects.popper, g = t.elements[m ? h : p], w = So(ge(g) ? g : g.contextElement || ie(t.elements.popper), s, l), d = de(t.elements.reference), k = wt({
    reference: d,
    element: y,
    strategy: "absolute",
    placement: r
  }), x = Ie(Object.assign({}, y, k)), O = p === me ? x : d, C = {
    top: w.top - O.top + u.top,
    bottom: O.bottom - w.bottom + u.bottom,
    left: w.left - O.left + u.left,
    right: O.right - w.right + u.right
  }, B = t.modifiersData.offset;
  if (p === me && B) {
    var I = B[r];
    Object.keys(C).forEach(function(_) {
      var Y = [$, z].indexOf(_) >= 0 ? 1 : -1, M = [N, z].indexOf(_) >= 0 ? "y" : "x";
      C[_] += I[M] * Y;
    });
  }
  return C;
}
var lt = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ct() {
  for (var t = arguments.length, e = new Array(t), o = 0; o < t; o++)
    e[o] = arguments[o];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Mo(t) {
  t === void 0 && (t = {});
  var e = t, o = e.defaultModifiers, n = o === void 0 ? [] : o, r = e.defaultOptions, i = r === void 0 ? lt : r;
  return function(s, a, l) {
    l === void 0 && (l = i);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, lt, i),
      modifiersData: {},
      elements: {
        reference: s,
        popper: a
      },
      attributes: {},
      styles: {}
    }, p = [], b = !1, m = {
      state: c,
      setOptions: function(u) {
        var h = typeof u == "function" ? u(c.options) : u;
        v(), c.options = Object.assign({}, i, c.options, h), c.scrollParents = {
          reference: ge(s) ? be(s) : s.contextElement ? be(s.contextElement) : [],
          popper: be(a)
        };
        var y = go(xo([].concat(n, c.options.modifiers)));
        return c.orderedModifiers = y.filter(function(g) {
          return g.enabled;
        }), f(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var u = c.elements, h = u.reference, y = u.popper;
          if (ct(h, y)) {
            c.rects = {
              reference: oo(h, ke(y), c.options.strategy === "fixed"),
              popper: We(y)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(C) {
              return c.modifiersData[C.name] = Object.assign({}, C.data);
            });
            for (var g = 0; g < c.orderedModifiers.length; g++) {
              if (c.reset === !0) {
                c.reset = !1, g = -1;
                continue;
              }
              var w = c.orderedModifiers[g], d = w.fn, k = w.options, x = k === void 0 ? {} : k, O = w.name;
              typeof d == "function" && (c = d({
                state: c,
                options: x,
                name: O,
                instance: m
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: wo(function() {
        return new Promise(function(u) {
          m.forceUpdate(), u(c);
        });
      }),
      destroy: function() {
        v(), b = !0;
      }
    };
    if (!ct(s, a))
      return m;
    m.setOptions(l).then(function(u) {
      !b && l.onFirstUpdate && l.onFirstUpdate(u);
    });
    function f() {
      c.orderedModifiers.forEach(function(u) {
        var h = u.name, y = u.options, g = y === void 0 ? {} : y, w = u.effect;
        if (typeof w == "function") {
          var d = w({
            state: c,
            name: h,
            instance: m,
            options: g
          }), k = function() {
          };
          p.push(d || k);
        }
      });
    }
    function v() {
      p.forEach(function(u) {
        return u();
      }), p = [];
    }
    return m;
  };
}
var Le = {
  passive: !0
};
function Lo(t) {
  var e = t.state, o = t.instance, n = t.options, r = n.scroll, i = r === void 0 ? !0 : r, s = n.resize, a = s === void 0 ? !0 : s, l = W(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && c.forEach(function(p) {
    p.addEventListener("scroll", o.update, Le);
  }), a && l.addEventListener("resize", o.update, Le), function() {
    i && c.forEach(function(p) {
      p.removeEventListener("scroll", o.update, Le);
    }), a && l.removeEventListener("resize", o.update, Le);
  };
}
var jo = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Lo,
  data: {}
};
function Do(t) {
  var e = t.state, o = t.name;
  e.modifiersData[o] = wt({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
var Po = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Do,
  data: {}
}, To = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function _o(t) {
  var e = t.x, o = t.y, n = window, r = n.devicePixelRatio || 1;
  return {
    x: Me(Me(e * r) / r) || 0,
    y: Me(Me(o * r) / r) || 0
  };
}
function pt(t) {
  var e, o = t.popper, n = t.popperRect, r = t.placement, i = t.variation, s = t.offsets, a = t.position, l = t.gpuAcceleration, c = t.adaptive, p = t.roundOffsets, b = p === !0 ? _o(s) : typeof p == "function" ? p(s) : s, m = b.x, f = m === void 0 ? 0 : m, v = b.y, u = v === void 0 ? 0 : v, h = s.hasOwnProperty("x"), y = s.hasOwnProperty("y"), g = H, w = N, d = window;
  if (c) {
    var k = ke(o), x = "clientHeight", O = "clientWidth";
    k === W(o) && (k = ie(o), te(k).position !== "static" && a === "absolute" && (x = "scrollHeight", O = "scrollWidth")), k = k, (r === N || (r === H || r === $) && i === we) && (w = z, u -= k[x] - n.height, u *= l ? 1 : -1), (r === H || (r === N || r === z) && i === we) && (g = $, f -= k[O] - n.width, f *= l ? 1 : -1);
  }
  var C = Object.assign({
    position: a
  }, c && To);
  if (l) {
    var B;
    return Object.assign({}, C, (B = {}, B[w] = y ? "0" : "", B[g] = h ? "0" : "", B.transform = (d.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + u + "px)" : "translate3d(" + f + "px, " + u + "px, 0)", B));
  }
  return Object.assign({}, C, (e = {}, e[w] = y ? u + "px" : "", e[g] = h ? f + "px" : "", e.transform = "", e));
}
function Ao(t) {
  var e = t.state, o = t.options, n = o.gpuAcceleration, r = n === void 0 ? !0 : n, i = o.adaptive, s = i === void 0 ? !0 : i, a = o.roundOffsets, l = a === void 0 ? !0 : a, c = {
    placement: U(e.placement),
    variation: ve(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: r
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, pt(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: l
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, pt(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
var Eo = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Ao,
  data: {}
};
function Ro(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(o) {
    var n = e.styles[o] || {}, r = e.attributes[o] || {}, i = e.elements[o];
    !R(i) || !K(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(s) {
      var a = r[s];
      a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function No(t) {
  var e = t.state, o = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, o.popper), e.styles = o, e.elements.arrow && Object.assign(e.elements.arrow.style, o.arrow), function() {
    Object.keys(e.elements).forEach(function(n) {
      var r = e.elements[n], i = e.attributes[n] || {}, s = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : o[n]), a = s.reduce(function(l, c) {
        return l[c] = "", l;
      }, {});
      !R(r) || !K(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(l) {
        r.removeAttribute(l);
      }));
    });
  };
}
var Ho = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Ro,
  effect: No,
  requires: ["computeStyles"]
}, Io = [jo, Po, Eo, Ho], Vo = /* @__PURE__ */ Mo({
  defaultModifiers: Io
});
function qo(t) {
  return t === "x" ? "y" : "x";
}
function je(t, e, o) {
  return re(t, xe(e, o));
}
function zo(t) {
  var e = t.state, o = t.options, n = t.name, r = o.mainAxis, i = r === void 0 ? !0 : r, s = o.altAxis, a = s === void 0 ? !1 : s, l = o.boundary, c = o.rootBoundary, p = o.altBoundary, b = o.padding, m = o.tether, f = m === void 0 ? !0 : m, v = o.tetherOffset, u = v === void 0 ? 0 : v, h = Ke(e, {
    boundary: l,
    rootBoundary: c,
    padding: b,
    altBoundary: p
  }), y = U(e.placement), g = ve(e.placement), w = !g, d = Ue(y), k = qo(d), x = e.modifiersData.popperOffsets, O = e.rects.reference, C = e.rects.popper, B = typeof u == "function" ? u(Object.assign({}, e.rects, {
    placement: e.placement
  })) : u, I = {
    x: 0,
    y: 0
  };
  if (x) {
    if (i || a) {
      var _ = d === "y" ? N : H, Y = d === "y" ? z : $, M = d === "y" ? "height" : "width", J = x[d], G = x[d] + h[_], E = x[d] - h[Y], X = f ? -C[M] / 2 : 0, D = g === fe ? O[M] : C[M], P = g === fe ? -C[M] : -O[M], L = e.elements.arrow, Q = f && L ? We(L) : {
        width: 0,
        height: 0
      }, le = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : xt(), Ce = le[_], oe = le[Y], V = je(0, O[M], Q[M]), Ee = w ? O[M] / 2 - X - V - Ce - B : D - V - Ce - B, Be = w ? -O[M] / 2 + X + V + oe + B : P + V + oe + B, he = e.elements.arrow && ke(e.elements.arrow), St = he ? d === "y" ? he.clientTop || 0 : he.clientLeft || 0 : 0, Je = e.modifiersData.offset ? e.modifiersData.offset[e.placement][d] : 0, Ge = x[d] + Ee - Je - St, Xe = x[d] + Be - Je;
      if (i) {
        var Qe = je(f ? xe(G, Ge) : G, J, f ? re(E, Xe) : E);
        x[d] = Qe, I[d] = Qe - J;
      }
      if (a) {
        var Mt = d === "x" ? N : H, Lt = d === "x" ? z : $, Se = x[k], Ze = Se + h[Mt], et = Se - h[Lt], tt = je(f ? xe(Ze, Ge) : Ze, Se, f ? re(et, Xe) : et);
        x[k] = tt, I[k] = tt - Se;
      }
    }
    e.modifiersData[n] = I;
  }
}
var $o = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: zo,
  requiresIfExists: ["offset"]
}, Wo = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function De(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Wo[e];
  });
}
var Fo = {
  start: "end",
  end: "start"
};
function ut(t) {
  return t.replace(/start|end/g, function(e) {
    return Fo[e];
  });
}
function Uo(t, e) {
  e === void 0 && (e = {});
  var o = e, n = o.placement, r = o.boundary, i = o.rootBoundary, s = o.padding, a = o.flipVariations, l = o.allowedAutoPlacements, c = l === void 0 ? yt : l, p = ve(n), b = p ? a ? it : it.filter(function(v) {
    return ve(v) === p;
  }) : Oe, m = b.filter(function(v) {
    return c.indexOf(v) >= 0;
  });
  m.length === 0 && (m = b);
  var f = m.reduce(function(v, u) {
    return v[u] = Ke(t, {
      placement: u,
      boundary: r,
      rootBoundary: i,
      padding: s
    })[U(u)], v;
  }, {});
  return Object.keys(f).sort(function(v, u) {
    return f[v] - f[u];
  });
}
function Ko(t) {
  if (U(t) === Fe)
    return [];
  var e = De(t);
  return [ut(t), e, ut(e)];
}
function Yo(t) {
  var e = t.state, o = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var r = o.mainAxis, i = r === void 0 ? !0 : r, s = o.altAxis, a = s === void 0 ? !0 : s, l = o.fallbackPlacements, c = o.padding, p = o.boundary, b = o.rootBoundary, m = o.altBoundary, f = o.flipVariations, v = f === void 0 ? !0 : f, u = o.allowedAutoPlacements, h = e.options.placement, y = U(h), g = y === h, w = l || (g || !v ? [De(h)] : Ko(h)), d = [h].concat(w).reduce(function(oe, V) {
      return oe.concat(U(V) === Fe ? Uo(e, {
        placement: V,
        boundary: p,
        rootBoundary: b,
        padding: c,
        flipVariations: v,
        allowedAutoPlacements: u
      }) : V);
    }, []), k = e.rects.reference, x = e.rects.popper, O = /* @__PURE__ */ new Map(), C = !0, B = d[0], I = 0; I < d.length; I++) {
      var _ = d[I], Y = U(_), M = ve(_) === fe, J = [N, z].indexOf(Y) >= 0, G = J ? "width" : "height", E = Ke(e, {
        placement: _,
        boundary: p,
        rootBoundary: b,
        altBoundary: m,
        padding: c
      }), X = J ? M ? $ : H : M ? z : N;
      k[G] > x[G] && (X = De(X));
      var D = De(X), P = [];
      if (i && P.push(E[Y] <= 0), a && P.push(E[X] <= 0, E[D] <= 0), P.every(function(oe) {
        return oe;
      })) {
        B = _, C = !1;
        break;
      }
      O.set(_, P);
    }
    if (C)
      for (var L = v ? 3 : 1, Q = function(oe) {
        var V = d.find(function(Ee) {
          var Be = O.get(Ee);
          if (Be)
            return Be.slice(0, oe).every(function(he) {
              return he;
            });
        });
        if (V)
          return B = V, "break";
      }, le = L; le > 0; le--) {
        var Ce = Q(le);
        if (Ce === "break") break;
      }
    e.placement !== B && (e.modifiersData[n]._skip = !0, e.placement = B, e.reset = !0);
  }
}
var Jo = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Yo,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Go(t, e, o) {
  var n = U(t), r = [H, N].indexOf(n) >= 0 ? -1 : 1, i = typeof o == "function" ? o(Object.assign({}, e, {
    placement: t
  })) : o, s = i[0], a = i[1];
  return s = s || 0, a = (a || 0) * r, [H, $].indexOf(n) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function Xo(t) {
  var e = t.state, o = t.options, n = t.name, r = o.offset, i = r === void 0 ? [0, 0] : r, s = yt.reduce(function(p, b) {
    return p[b] = Go(b, e.rects, i), p;
  }, {}), a = s[e.placement], l = a.x, c = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = s;
}
var Qo = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Xo
}, Zo = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, kt(typeof t != "number" ? t : Ot(t, Oe));
};
function en(t) {
  var e, o = t.state, n = t.name, r = t.options, i = o.elements.arrow, s = o.modifiersData.popperOffsets, a = U(o.placement), l = Ue(a), c = [H, $].indexOf(a) >= 0, p = c ? "height" : "width";
  if (!(!i || !s)) {
    var b = Zo(r.padding, o), m = We(i), f = l === "y" ? N : H, v = l === "y" ? z : $, u = o.rects.reference[p] + o.rects.reference[l] - s[l] - o.rects.popper[p], h = s[l] - o.rects.reference[l], y = ke(i), g = y ? l === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, w = u / 2 - h / 2, d = b[f], k = g - m[p] - b[v], x = g / 2 - m[p] / 2 + w, O = je(d, x, k), C = l;
    o.modifiersData[n] = (e = {}, e[C] = O, e.centerOffset = O - x, e);
  }
}
function tn(t) {
  var e = t.state, o = t.options, n = o.element, r = n === void 0 ? "[data-popper-arrow]" : n;
  r != null && (typeof r == "string" && (r = e.elements.popper.querySelector(r), !r) || gt(e.elements.popper, r) && (e.elements.arrow = r));
}
var on = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: en,
  effect: tn,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
const Ne = (t) => parseInt(t, 10);
function nn({
  arrowPadding: t,
  emit: e,
  locked: o,
  offsetDistance: n,
  offsetSkid: r,
  placement: i,
  popperNode: s,
  triggerNode: a
}) {
  const l = Vt({
    isOpen: !1,
    popperInstance: null
  }), c = (u) => {
    var h;
    (h = l.popperInstance) === null || h === void 0 || h.setOptions((y) => ({
      ...y,
      modifiers: [...y.modifiers, {
        name: "eventListeners",
        enabled: u
      }]
    }));
  }, p = () => c(!0), b = () => c(!1), m = () => {
    l.isOpen && (l.isOpen = !1, e("close:popper"));
  }, f = () => {
    l.isOpen || (l.isOpen = !0, e("open:popper"));
  };
  ye([() => l.isOpen, i], async ([u]) => {
    u ? (await v(), p()) : b();
  });
  const v = async () => {
    await qt(), l.popperInstance = Vo(a.value, s.value, {
      placement: i.value,
      modifiers: [$o, Jo, {
        name: "flip",
        enabled: !o.value
      }, on, {
        name: "arrow",
        options: {
          padding: Ne(t.value)
        }
      }, Qo, {
        name: "offset",
        options: {
          offset: [Ne(r.value), Ne(n.value)]
        }
      }]
    }), l.popperInstance.update();
  };
  return Ve(() => {
    var u;
    (u = l.popperInstance) === null || u === void 0 || u.destroy();
  }), {
    ...Pe(l),
    open: f,
    close: m
  };
}
const rn = {
  id: "arrow",
  "data-popper-arrow": ""
};
function an(t, e) {
  return S(), T("div", rn);
}
function Ct(t, e) {
  e === void 0 && (e = {});
  var o = e.insertAt;
  if (!(!t || typeof document > "u")) {
    var n = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
    r.type = "text/css", o === "top" && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t));
  }
}
var sn = `
#arrow[data-v-20b7fd4a],
  #arrow[data-v-20b7fd4a]::before {
    transition: background 250ms ease-in-out;
    position: absolute;
    width: calc(10px - var(--popper-theme-border-width, 0px));
    height: calc(10px - var(--popper-theme-border-width, 0px));
    box-sizing: border-box;
    background: var(--popper-theme-background-color);
}
#arrow[data-v-20b7fd4a] {
    visibility: hidden;
}
#arrow[data-v-20b7fd4a]::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
}

  /* Top arrow */
.popper[data-popper-placement^="top"] > #arrow[data-v-20b7fd4a] {
    bottom: -5px;
}
.popper[data-popper-placement^="top"] > #arrow[data-v-20b7fd4a]::before {
    border-right: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-bottom: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
}

  /* Bottom arrow */
.popper[data-popper-placement^="bottom"] > #arrow[data-v-20b7fd4a] {
    top: -5px;
}
.popper[data-popper-placement^="bottom"] > #arrow[data-v-20b7fd4a]::before {
    border-left: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-top: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
}

  /* Left arrow */
.popper[data-popper-placement^="left"] > #arrow[data-v-20b7fd4a] {
    right: -5px;
}
.popper[data-popper-placement^="left"] > #arrow[data-v-20b7fd4a]::before {
    border-right: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-top: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
}

  /* Right arrow */
.popper[data-popper-placement^="right"] > #arrow[data-v-20b7fd4a] {
    left: -5px;
}
`;
Ct(sn);
const Ye = {};
Ye.render = an;
Ye.__scopeId = "data-v-20b7fd4a";
var ln = Ye;
const cn = ["onKeyup"];
var Bt = {
  props: {
    /**
     * Preferred placement (the "auto" placements will choose the side with most space.)
     */
    placement: {
      type: String,
      default: "bottom",
      validator: function(t) {
        return ["auto", "auto-start", "auto-end", "top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "right", "right-start", "right-end", "left", "left-start", "left-end"].includes(t);
      }
    },
    /**
     * Disables automatically closing the popover when the user clicks away from it
     */
    disableClickAway: {
      type: Boolean,
      default: !1
    },
    /**
     * Offset in pixels along the trigger element
     */
    offsetSkid: {
      type: String,
      default: "0"
    },
    /**
     * Offset in pixels away from the trigger element
     */
    offsetDistance: {
      type: String,
      default: "12"
    },
    /**
     * Trigger the popper on hover
     */
    hover: {
      type: Boolean,
      default: !1
    },
    /**
     * Manually open/close the Popper, other events are ignored if this prop is set
     */
    show: {
      type: Boolean,
      default: null
    },
    /**
     * Disables the Popper. If it was already open, it will be closed.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Open the Popper after a delay (ms).
     */
    openDelay: {
      type: [Number, String],
      default: 0
    },
    /**
     * Close the Popper after a delay (ms).
     */
    closeDelay: {
      type: [Number, String],
      default: 0
    },
    /**
     * The z-index of the Popper.
     */
    zIndex: {
      type: [Number, String],
      default: 9999
    },
    /**
     * Display an arrow on the popper
     */
    arrow: {
      type: Boolean,
      default: !1
    },
    /**
     * Stop arrow from reaching the edge of the popper
     */
    arrowPadding: {
      type: String,
      default: "0"
    },
    /**
     * If the Popper should be interactive, it will close when clicked/hovered if false
     */
    interactive: {
      type: Boolean,
      default: !0
    },
    /**
     * Lock the Popper into place, it will not flip dynamically when it runs out of space if true
     */
    locked: {
      type: Boolean,
      default: !1
    },
    /**
     * If the content is just a simple string, it can be passed in as a prop
     */
    content: {
      type: String,
      default: null
    }
  },
  emits: ["open:popper", "close:popper"],
  setup(t, {
    emit: e
  }) {
    const o = t;
    ft((D) => ({
      c81fc0a4: t.zIndex
    }));
    const n = Rt(), r = Z(null), i = Z(null), s = Z(null), a = Z(!1);
    _e(() => {
      const D = n.default();
      if (D && D.length > 1)
        return console.error(`[Popper]: The <Popper> component expects only one child element at its root. You passed ${D.length} child nodes.`);
    });
    const {
      arrowPadding: l,
      closeDelay: c,
      content: p,
      disableClickAway: b,
      disabled: m,
      interactive: f,
      locked: v,
      offsetDistance: u,
      offsetSkid: h,
      openDelay: y,
      placement: g,
      show: w
    } = Pe(o), {
      isOpen: d,
      open: k,
      close: x
    } = nn({
      arrowPadding: l,
      emit: e,
      locked: v,
      offsetDistance: u,
      offsetSkid: h,
      placement: g,
      popperNode: i,
      triggerNode: s
    }), {
      hasContent: O
    } = Qt(n, i, p), C = q(() => w.value !== null), B = q(() => m.value || !O.value), I = q(() => d.value && !B.value), _ = q(() => !b.value && !C.value), Y = q(() => f.value ? `border: ${u.value}px solid transparent; margin: -${u.value}px;` : null), M = Re.debounce(k, y.value), J = Re.debounce(x, c.value), G = async () => {
      B.value || C.value || (J.clear(), M());
    }, E = async () => {
      C.value || (M.clear(), J());
    }, X = () => {
      d.value ? E() : G();
    };
    return ye([O, m], ([D, P]) => {
      d.value && (!D || P) && x();
    }), ye(d, (D) => {
      D ? a.value = !0 : Re.debounce(() => {
        a.value = !1;
      }, 200);
    }), nt(() => {
      C.value && (w.value ? M() : J());
    }), nt(() => {
      _.value && Xt(r, E);
    }), (D, P) => (S(), T("div", {
      class: "inline-block",
      style: vt(j(Y)),
      onMouseleave: P[2] || (P[2] = (L) => t.hover && E()),
      ref: (L, Q) => {
        Q.popperContainerNode = L, r.value = L;
      }
    }, [A("div", {
      ref: (L, Q) => {
        Q.triggerNode = L, s.value = L;
      },
      onMouseover: P[0] || (P[0] = (L) => t.hover && G()),
      onClick: X,
      onFocus: G,
      onKeyup: Nt(E, ["esc"])
    }, [ae(D.$slots, "default")], 40, cn), ce(It, {
      name: "fade"
    }, {
      default: ee(() => [dt(A("div", {
        onClick: P[1] || (P[1] = (L) => !j(f) && E()),
        class: "popper",
        ref: (L, Q) => {
          Q.popperNode = L, i.value = L;
        }
      }, [ae(D.$slots, "content", {
        close: j(x),
        isOpen: a.value
      }, () => [F(ne(j(p)), 1)]), t.arrow ? (S(), Te(ln, {
        key: 0
      })) : pe("", !0)], 512), [[Ht, j(I)]])]),
      _: 3
    })], 36));
  }
}, pn = `
.inline-block[data-v-5784ed69] {
    display: inline-block;
}
.popper[data-v-5784ed69] {
    transition: background 250ms ease-in-out;
    background: var(--popper-theme-background-color);
    padding: var(--popper-theme-padding);
    color: var(--popper-theme-text-color);
    border-radius: var(--popper-theme-border-radius);
    border-width: var(--popper-theme-border-width);
    border-style: var(--popper-theme-border-style);
    border-color: var(--popper-theme-border-color);
    box-shadow: var(--popper-theme-box-shadow);
    z-index: var(--c81fc0a4);
}
.popper[data-v-5784ed69]:hover,
  .popper:hover > #arrow[data-v-5784ed69]::before {
    background: var(--popper-theme-background-color-hover);
}
.inline-block[data-v-5784ed69] {
    display: inline-block;
}
.fade-enter-active[data-v-5784ed69],
  .fade-leave-active[data-v-5784ed69] {
    transition: opacity 0.2s ease;
}
.fade-enter-from[data-v-5784ed69],
  .fade-leave-to[data-v-5784ed69] {
    opacity: 0;
}
`;
Ct(pn);
Bt.__scopeId = "data-v-5784ed69";
var un = /* @__PURE__ */ (() => {
  const t = Bt;
  return t.install = (e) => {
    e.component("Popper", t);
  }, t;
})();
const dn = /* @__PURE__ */ se({
  __name: "RTooltip",
  props: {
    hover: { type: Boolean, default: !0 },
    maxHeight: { default: "80vh" },
    openDelay: { default: 0 },
    placement: { default: "bottom" },
    show: { type: Boolean, default: void 0 },
    useFixedLocation: { type: Boolean, default: !1 },
    zIndex: { default: 2147483647 }
  },
  setup(t) {
    return ft((e) => ({
      e99d4766: e.zIndex
    })), (e, o) => (S(), Te(j(un), {
      class: "m-tooltip",
      arrow: !0,
      "z-index": e.zIndex,
      placement: e.placement,
      hover: e.hover,
      show: e.show
    }, {
      content: ee((n) => [
        A("div", {
          class: "m-tooltip__content",
          style: vt({
            maxHeight: e.maxHeight
          })
        }, [
          ae(e.$slots, "content", At(Et(n)))
        ], 4)
      ]),
      default: ee(() => [
        ae(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["z-index", "placement", "hover", "show"]));
  }
}), fn = ["innerHTML"], vn = /* @__PURE__ */ se({
  __name: "RCashbackConditions",
  props: {
    tooltipContents: {},
    maxHeight: { default: "80vh" }
  },
  setup(t) {
    const e = Z("hidden"), o = Z(), n = new IntersectionObserver(
      (i) => {
        for (const s of i)
          (!s.isIntersecting || s.intersectionRatio < 0.5) && (e.value = "hidden");
      },
      { threshold: 0.5 }
    ), r = () => {
      e.value = e.value === "visible" ? "hidden" : "visible";
    };
    return _e(() => {
      o.value && n.observe(o.value);
    }), Dt(() => {
      o.value && n.unobserve(o.value);
    }), (i, s) => (S(), T("div", {
      ref_key: "el",
      ref: o
    }, [
      ce(j(dn), {
        placement: "left",
        class: "w-full text-center",
        "max-height": i.maxHeight,
        hover: !1,
        show: e.value === "visible"
      }, {
        content: ee(() => [
          A("div", {
            class: "max-w-93.75",
            innerHTML: i.tooltipContents
          }, null, 8, fn)
        ]),
        default: ee(() => [
          A("p", {
            class: "mb-0 uppercase text-xs font-medium cursor-pointer -colorGrey",
            onClick: r
          }, s[0] || (s[0] = [
            F(" Voir les conditions "),
            A("i", { class: "fa-solid fa-circle-info" }, null, -1)
          ]))
        ]),
        _: 1
      }, 8, ["max-height", "show"])
    ], 512));
  }
}), hn = { class: "-colorGrey" }, mn = /* @__PURE__ */ se({
  __name: "RCashbackText",
  props: {
    hasIncrease: { type: Boolean },
    isVariable: { type: Boolean },
    shortCashbackText: {},
    shortPreviousCashbackText: {},
    prefix: { default: "" },
    suffix: { default: "" },
    unstyled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, {
      hasIncrease: o,
      isVariable: n,
      shortCashbackText: r,
      shortPreviousCashbackText: i
    } = Pe(e), s = q(() => `Jusqu'à ${r.value}`), a = q(() => {
      if (!n.value)
        return e.prefix;
      const c = s.value.indexOf(r.value);
      return e.prefix + s.value.slice(0, c);
    }), l = q(() => {
      if (!n.value)
        return e.suffix;
      const c = s.value.indexOf(r.value) + r.value.length;
      return s.value.slice(c) + e.suffix;
    });
    return (c, p) => (S(), T("span", null, [
      F(ne(a.value) + " ", 1),
      j(o) ? (S(), T(ue, { key: 0 }, [
        A("s", hn, ne(j(i)), 1),
        p[0] || (p[0] = F(" "))
      ], 64)) : pe("", !0),
      c.unstyled ? (S(), T(ue, { key: 1 }, [
        F(ne(j(r) + l.value), 1)
      ], 64)) : (S(), T(ue, { key: 2 }, [
        A("b", null, ne(j(r)), 1),
        F(ne(l.value), 1)
      ], 64))
    ]));
  }
}), bn = {
  key: 0,
  class: "text-center"
}, yn = { class: "mb-1 text-xl font-medium" }, gn = {
  key: 0,
  class: "mb-1 -mt-1 text-sm"
}, wn = {
  key: 1,
  class: "[ a-alert -info ] flex-col mt-3"
}, xn = /* @__PURE__ */ se({
  __name: "RCashbackOffer",
  props: {
    cashbackActivationStatus: { default: "inactive" },
    cashback: {},
    merchantBonuses: { default: () => [] },
    hintVisibility: { default: "hidden" }
  },
  emits: ["activateCashbackClick"],
  setup(t, { emit: e }) {
    const o = t, { merchantBonuses: n } = Pe(o), r = e, i = () => {
      r("activateCashbackClick");
    }, s = q(() => n.value.find((a) => {
      var l;
      return ((l = a.grade) == null ? void 0 : l.value) === 3;
    }));
    return (a, l) => {
      const c = ot("tag"), p = ot("track");
      return a.cashback !== void 0 ? dt((S(), T("div", bn, [
        A("p", yn, [
          ce(j(mn), jt({ unstyled: "" }, a.cashback, { suffix: " de cashback" }), null, 16)
        ]),
        s.value != null ? (S(), T("p", gn, " +" + ne(s.value.text) + " pour les membres Poulpeo + ", 1)) : pe("", !0),
        ce(j(vn), {
          "tooltip-contents": a.cashback.htmlConditions
        }, null, 8, ["tooltip-contents"]),
        ce(j(Jt), {
          class: "w-63 mt-3",
          loading: a.cashbackActivationStatus === "ongoing",
          onClick: i
        }, {
          default: ee(() => [
            a.cashbackActivationStatus === "inactive" ? (S(), T(ue, { key: 0 }, [
              l[0] || (l[0] = A("i", { class: "fa-regular fa-coins" }, null, -1)),
              l[1] || (l[1] = F(" Activer le cashback "))
            ], 64)) : (S(), T(ue, { key: 1 }, [
              l[2] || (l[2] = A("i", { class: "fa-regular fa-check fa-lg" }, null, -1)),
              l[3] || (l[3] = F(" Cashback Activé ! "))
            ], 64))
          ]),
          _: 1
        }, 8, ["loading"]),
        a.hintVisibility !== "hidden" ? (S(), T("div", wn, [
          l[4] || (l[4] = F(" Petit rappel : Pensez à réactiver le cashback juste avant chaque commande. ")),
          A("p", {
            class: "-a -semiBold uppercase mt-2 mb-0 text-xs",
            onClick: i
          }, " Réactiver le cashback ")
        ])) : pe("", !0)
      ])), [
        [c, { linkedEntities: { cashbackOffer: a.cashback } }],
        [
          p,
          "cashback_offer_impression",
          "impression",
          { once: !0 }
        ]
      ]) : pe("", !0);
    };
  }
}), kn = {
  key: 0,
  class: "[ m-cashbackModule ] mb-module w-full inline-block"
}, On = /* @__PURE__ */ se({
  __name: "RCashbackModule",
  props: {
    cashback: { default: void 0 },
    cashbackActivationStatus: {},
    hintVisibility: {},
    merchantName: {},
    merchantBonuses: { default: () => [] }
  },
  emits: ["activateCashbackClick"],
  setup(t, { emit: e }) {
    const o = e, n = () => {
      o("activateCashbackClick");
    };
    return (r, i) => r.cashback ? (S(), T("div", kn, [
      ce(xn, {
        cashback: r.cashback,
        "cashback-activation-status": r.cashbackActivationStatus,
        "merchant-bonuses": r.merchantBonuses,
        "hint-visibility": r.hintVisibility,
        onActivateCashbackClick: n
      }, null, 8, ["cashback", "cashback-activation-status", "merchant-bonuses", "hint-visibility"])
    ])) : pe("", !0);
  }
}), Sn = {
  setup() {
    const t = $t(), { requestCashbackActivation: e } = Ft(), {
      selectedMerchant: o,
      selectedMerchantBonuses: n,
      selectedMerchantCashbackActivationStatus: r,
      selectedMerchantCashbackReactivationHintStatus: i
    } = Wt(t), s = () => {
      var a;
      if (o.value !== void 0) {
        if (((a = t.user) == null ? void 0 : a.isLogged) !== !0) {
          Ut().requestAuthModalDisplay({
            initialMode: "logIn",
            merchant: o.value
          });
          return;
        }
        e(o.value);
      }
    };
    return () => o.value == null ? rt("div", "Impossible de charger le module cashback") : rt(On, {
      cashback: o.value.cashback,
      cashbackActivationStatus: r.value,
      hintVisibility: i.value,
      merchantName: o.value.name,
      merchantBonuses: n.value,
      onActivateCashbackClick: s
    });
  }
};
content;
export {
  Sn as CashbackModule
};
content;
