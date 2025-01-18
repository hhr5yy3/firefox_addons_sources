import { d as Y, j as F, R as ne, e as S, f as so, w as le, o as y, g as Q, i as H, r as V, c as T, F as $, u as P, h as _, a as h, q as te, b as X, X as Tt, Y as jt, t as N, y as gn, z as bo, C as se, ai as er, W as et, n as tt, p as Ze, m as go, k as St, U as Rt, A as dt, D as yn, S as tr, T as po, V as _e, l as yo, Z as Ao, $ as xo, a0 as wo, a1 as He, a2 as ko, a3 as Co, a4 as Oo } from "./esm-index-C1muFETj.js";
const or = {
  key: 1,
  class: "inline-flex"
}, nr = /* @__PURE__ */ Y({
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
    const e = t, o = F(!1), n = F(!0), r = St(), i = S(() => e.loading || o.value), l = S(() => r.href !== void 0 && r.href !== null ? "a" : e.tag);
    return (a, s) => (y(), Q(yo(l.value), {
      class: tt(["a-btn", [
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
      onClick: s[0] || (s[0] = (p) => n.value = !0)
    }, {
      default: H(() => [
        i.value ? V(a.$slots, "loaderSlot", { key: 0 }, () => [
          a.loaderLabel ? (y(), T($, { key: 0 }, [
            X(N(a.loaderLabel), 1)
          ], 64)) : (y(), T("span", or, s[1] || (s[1] = [
            h("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : V(a.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), rr = /* @__PURE__ */ Y({
  __name: "RButtonPrimary",
  setup(t) {
    return (e, o) => (y(), Q(nr, { theme: "primary" }, {
      loaderLabel: H(() => [
        V(e.$slots, "loaderSlot")
      ]),
      default: H(() => [
        V(e.$slots, "default")
      ]),
      _: 3
    }));
  }
});
function co(t, e, o) {
  var n, r, i, l, a;
  e == null && (e = 100);
  function s() {
    var d = Date.now() - l;
    d < e && d >= 0 ? n = setTimeout(s, e - d) : (n = null, o || (a = t.apply(i, r), i = r = null));
  }
  var p = function() {
    i = this, r = arguments, l = Date.now();
    var d = o && !n;
    return n || (n = setTimeout(s, e)), d && (a = t.apply(i, r), i = r = null), a;
  };
  return p.clear = function() {
    n && (clearTimeout(n), n = null);
  }, p.flush = function() {
    n && (a = t.apply(i, r), i = r = null, clearTimeout(n), n = null);
  }, p;
}
co.debounce = co;
var oo = co;
function ar(t, e, o) {
  Oo(t) ? ne(t, (n, r) => {
    r == null || r.removeEventListener(e, o), n == null || n.addEventListener(e, o);
  }) : se(() => {
    t.addEventListener(e, o);
  }), He(() => {
    var n;
    (n = P(t)) === null || n === void 0 || n.removeEventListener(e, o);
  });
}
function ir(t, e) {
  return typeof window > "u" || !window ? void 0 : ar(window, "pointerdown", (o) => {
    const n = P(t);
    n && (n === o.target || o.composedPath().includes(n) || e(o));
  });
}
function lr(t, e, o) {
  let n = null;
  const r = F(!1);
  se(() => {
    (t.content !== void 0 || o.value) && (r.value = !0), n = new MutationObserver(i), n.observe(e.value, {
      childList: !0,
      subtree: !0
    });
  }), He(() => n.disconnect()), ne(o, (l) => {
    l ? r.value = !0 : r.value = !1;
  });
  const i = () => {
    t.content ? r.value = !0 : r.value = !1;
  };
  return {
    hasContent: r
  };
}
function ot(t, e) {
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
function Oe(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Eo(t) {
  var e = Oe(t), o = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: n
  };
}
function xt(t) {
  var e = Oe(t).Element;
  return t instanceof e || t instanceof Element;
}
function pe(t) {
  var e = Oe(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function An(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Oe(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function sr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function pr(t) {
  return t === Oe(t) || !pe(t) ? Eo(t) : sr(t);
}
function je(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function ze(t) {
  return ((xt(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function Bo(t) {
  return ot(ze(t)).left + Eo(t).scrollLeft;
}
function qe(t) {
  return Oe(t).getComputedStyle(t);
}
function Po(t) {
  var e = qe(t), o = e.overflow, n = e.overflowX, r = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + r + n);
}
function cr(t) {
  var e = t.getBoundingClientRect(), o = e.width / t.offsetWidth || 1, n = e.height / t.offsetHeight || 1;
  return o !== 1 || n !== 1;
}
function dr(t, e, o) {
  o === void 0 && (o = !1);
  var n = pe(e);
  pe(e) && cr(e);
  var r = ze(e), i = ot(t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !o) && ((je(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Po(r)) && (l = pr(e)), pe(e) ? (a = ot(e), a.x += e.clientLeft, a.y += e.clientTop) : r && (a.x = Bo(r))), {
    x: i.left + l.scrollLeft - a.x,
    y: i.top + l.scrollTop - a.y,
    width: i.width,
    height: i.height
  };
}
function Do(t) {
  var e = ot(t), o = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - o) <= 1 && (o = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: o,
    height: n
  };
}
function $t(t) {
  return je(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (An(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ze(t)
  );
}
function xn(t) {
  return ["html", "body", "#document"].indexOf(je(t)) >= 0 ? t.ownerDocument.body : pe(t) && Po(t) ? t : xn($t(t));
}
function gt(t, e) {
  var o;
  e === void 0 && (e = []);
  var n = xn(t), r = n === ((o = t.ownerDocument) == null ? void 0 : o.body), i = Oe(n), l = r ? [i].concat(i.visualViewport || [], Po(n) ? n : []) : n, a = e.concat(l);
  return r ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(gt($t(l)))
  );
}
function ur(t) {
  return ["table", "td", "th"].indexOf(je(t)) >= 0;
}
function Yo(t) {
  return !pe(t) || // https://github.com/popperjs/popper-core/issues/837
  qe(t).position === "fixed" ? null : t.offsetParent;
}
function fr(t) {
  var e = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, o = navigator.userAgent.indexOf("Trident") !== -1;
  if (o && pe(t)) {
    var n = qe(t);
    if (n.position === "fixed")
      return null;
  }
  for (var r = $t(t); pe(r) && ["html", "body"].indexOf(je(r)) < 0; ) {
    var i = qe(r);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
      return r;
    r = r.parentNode;
  }
  return null;
}
function qt(t) {
  for (var e = Oe(t), o = Yo(t); o && ur(o) && qe(o).position === "static"; )
    o = Yo(o);
  return o && (je(o) === "html" || je(o) === "body" && qe(o).position === "static") ? e : o || fr(t) || e;
}
var ce = "top", ye = "bottom", Ae = "right", de = "left", To = "auto", Wt = [ce, ye, Ae, de], nt = "start", wt = "end", vr = "clippingParents", wn = "viewport", mt = "popper", mr = "reference", Ko = /* @__PURE__ */ Wt.reduce(function(t, e) {
  return t.concat([e + "-" + nt, e + "-" + wt]);
}, []), kn = /* @__PURE__ */ [].concat(Wt, [To]).reduce(function(t, e) {
  return t.concat([e, e + "-" + nt, e + "-" + wt]);
}, []), hr = "beforeRead", br = "read", gr = "afterRead", yr = "beforeMain", Ar = "main", xr = "afterMain", wr = "beforeWrite", kr = "write", Cr = "afterWrite", Or = [hr, br, gr, yr, Ar, xr, wr, kr, Cr];
function Er(t) {
  var e = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(i) {
    e.set(i.name, i);
  });
  function r(i) {
    o.add(i.name);
    var l = [].concat(i.requires || [], i.requiresIfExists || []);
    l.forEach(function(a) {
      if (!o.has(a)) {
        var s = e.get(a);
        s && r(s);
      }
    }), n.push(i);
  }
  return t.forEach(function(i) {
    o.has(i.name) || r(i);
  }), n;
}
function Br(t) {
  var e = Er(t);
  return Or.reduce(function(o, n) {
    return o.concat(e.filter(function(r) {
      return r.phase === n;
    }));
  }, []);
}
function Pr(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(o) {
      Promise.resolve().then(function() {
        e = void 0, o(t());
      });
    })), e;
  };
}
function Pe(t) {
  return t.split("-")[0];
}
function Dr(t) {
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
function Tr(t) {
  var e = Oe(t), o = ze(t), n = e.visualViewport, r = o.clientWidth, i = o.clientHeight, l = 0, a = 0;
  return n && (r = n.width, i = n.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = n.offsetLeft, a = n.offsetTop)), {
    width: r,
    height: i,
    x: l + Bo(t),
    y: a
  };
}
var Qe = Math.max, kt = Math.min, Lt = Math.round;
function jr(t) {
  var e, o = ze(t), n = Eo(t), r = (e = t.ownerDocument) == null ? void 0 : e.body, i = Qe(o.scrollWidth, o.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), l = Qe(o.scrollHeight, o.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), a = -n.scrollLeft + Bo(t), s = -n.scrollTop;
  return qe(r || o).direction === "rtl" && (a += Qe(o.clientWidth, r ? r.clientWidth : 0) - i), {
    width: i,
    height: l,
    x: a,
    y: s
  };
}
function Cn(t, e) {
  var o = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (o && An(o)) {
    var n = e;
    do {
      if (n && t.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function uo(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Sr(t) {
  var e = ot(t);
  return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
}
function _o(t, e) {
  return e === wn ? uo(Tr(t)) : pe(e) ? Sr(e) : uo(jr(ze(t)));
}
function Rr(t) {
  var e = gt($t(t)), o = ["absolute", "fixed"].indexOf(qe(t).position) >= 0, n = o && pe(t) ? qt(t) : t;
  return xt(n) ? e.filter(function(r) {
    return xt(r) && Cn(r, n) && je(r) !== "body";
  }) : [];
}
function qr(t, e, o) {
  var n = e === "clippingParents" ? Rr(t) : [].concat(e), r = [].concat(n, [o]), i = r[0], l = r.reduce(function(a, s) {
    var p = _o(t, s);
    return a.top = Qe(p.top, a.top), a.right = kt(p.right, a.right), a.bottom = kt(p.bottom, a.bottom), a.left = Qe(p.left, a.left), a;
  }, _o(t, i));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function rt(t) {
  return t.split("-")[1];
}
function jo(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function On(t) {
  var e = t.reference, o = t.element, n = t.placement, r = n ? Pe(n) : null, i = n ? rt(n) : null, l = e.x + e.width / 2 - o.width / 2, a = e.y + e.height / 2 - o.height / 2, s;
  switch (r) {
    case ce:
      s = {
        x: l,
        y: e.y - o.height
      };
      break;
    case ye:
      s = {
        x: l,
        y: e.y + e.height
      };
      break;
    case Ae:
      s = {
        x: e.x + e.width,
        y: a
      };
      break;
    case de:
      s = {
        x: e.x - o.width,
        y: a
      };
      break;
    default:
      s = {
        x: e.x,
        y: e.y
      };
  }
  var p = r ? jo(r) : null;
  if (p != null) {
    var d = p === "y" ? "height" : "width";
    switch (i) {
      case nt:
        s[p] = s[p] - (e[d] / 2 - o[d] / 2);
        break;
      case wt:
        s[p] = s[p] + (e[d] / 2 - o[d] / 2);
        break;
    }
  }
  return s;
}
function En() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Bn(t) {
  return Object.assign({}, En(), t);
}
function Pn(t, e) {
  return e.reduce(function(o, n) {
    return o[n] = t, o;
  }, {});
}
function So(t, e) {
  e === void 0 && (e = {});
  var o = e, n = o.placement, r = n === void 0 ? t.placement : n, i = o.boundary, l = i === void 0 ? vr : i, a = o.rootBoundary, s = a === void 0 ? wn : a, p = o.elementContext, d = p === void 0 ? mt : p, A = o.altBoundary, b = A === void 0 ? !1 : A, f = o.padding, u = f === void 0 ? 0 : f, c = Bn(typeof u != "number" ? u : Pn(u, Wt)), m = d === mt ? mr : mt, x = t.rects.popper, w = t.elements[b ? m : d], O = qr(xt(w) ? w : w.contextElement || ze(t.elements.popper), l, s), v = ot(t.elements.reference), E = On({
    reference: v,
    element: x,
    strategy: "absolute",
    placement: r
  }), C = uo(Object.assign({}, x, E)), g = d === mt ? C : v, k = {
    top: O.top - g.top + c.top,
    bottom: g.bottom - O.bottom + c.bottom,
    left: O.left - g.left + c.left,
    right: g.right - O.right + c.right
  }, B = t.modifiersData.offset;
  if (d === mt && B) {
    var M = B[r];
    Object.keys(k).forEach(function(j) {
      var I = [Ae, ye].indexOf(j) >= 0 ? 1 : -1, D = [ce, ye].indexOf(j) >= 0 ? "y" : "x";
      k[j] += M[D] * I;
    });
  }
  return k;
}
var $o = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function en() {
  for (var t = arguments.length, e = new Array(t), o = 0; o < t; o++)
    e[o] = arguments[o];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Wr(t) {
  t === void 0 && (t = {});
  var e = t, o = e.defaultModifiers, n = o === void 0 ? [] : o, r = e.defaultOptions, i = r === void 0 ? $o : r;
  return function(l, a, s) {
    s === void 0 && (s = i);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, $o, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, d = [], A = !1, b = {
      state: p,
      setOptions: function(c) {
        var m = typeof c == "function" ? c(p.options) : c;
        u(), p.options = Object.assign({}, i, p.options, m), p.scrollParents = {
          reference: xt(l) ? gt(l) : l.contextElement ? gt(l.contextElement) : [],
          popper: gt(a)
        };
        var x = Br(Dr([].concat(n, p.options.modifiers)));
        return p.orderedModifiers = x.filter(function(w) {
          return w.enabled;
        }), f(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!A) {
          var c = p.elements, m = c.reference, x = c.popper;
          if (en(m, x)) {
            p.rects = {
              reference: dr(m, qt(x), p.options.strategy === "fixed"),
              popper: Do(x)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(k) {
              return p.modifiersData[k.name] = Object.assign({}, k.data);
            });
            for (var w = 0; w < p.orderedModifiers.length; w++) {
              if (p.reset === !0) {
                p.reset = !1, w = -1;
                continue;
              }
              var O = p.orderedModifiers[w], v = O.fn, E = O.options, C = E === void 0 ? {} : E, g = O.name;
              typeof v == "function" && (p = v({
                state: p,
                options: C,
                name: g,
                instance: b
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Pr(function() {
        return new Promise(function(c) {
          b.forceUpdate(), c(p);
        });
      }),
      destroy: function() {
        u(), A = !0;
      }
    };
    if (!en(l, a))
      return b;
    b.setOptions(s).then(function(c) {
      !A && s.onFirstUpdate && s.onFirstUpdate(c);
    });
    function f() {
      p.orderedModifiers.forEach(function(c) {
        var m = c.name, x = c.options, w = x === void 0 ? {} : x, O = c.effect;
        if (typeof O == "function") {
          var v = O({
            state: p,
            name: m,
            instance: b,
            options: w
          }), E = function() {
          };
          d.push(v || E);
        }
      });
    }
    function u() {
      d.forEach(function(c) {
        return c();
      }), d = [];
    }
    return b;
  };
}
var Vt = {
  passive: !0
};
function Xr(t) {
  var e = t.state, o = t.instance, n = t.options, r = n.scroll, i = r === void 0 ? !0 : r, l = n.resize, a = l === void 0 ? !0 : l, s = Oe(e.elements.popper), p = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && p.forEach(function(d) {
    d.addEventListener("scroll", o.update, Vt);
  }), a && s.addEventListener("resize", o.update, Vt), function() {
    i && p.forEach(function(d) {
      d.removeEventListener("scroll", o.update, Vt);
    }), a && s.removeEventListener("resize", o.update, Vt);
  };
}
var Hr = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Xr,
  data: {}
};
function Mr(t) {
  var e = t.state, o = t.name;
  e.modifiersData[o] = On({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
var Ir = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Mr,
  data: {}
}, Lr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Vr(t) {
  var e = t.x, o = t.y, n = window, r = n.devicePixelRatio || 1;
  return {
    x: Lt(Lt(e * r) / r) || 0,
    y: Lt(Lt(o * r) / r) || 0
  };
}
function tn(t) {
  var e, o = t.popper, n = t.popperRect, r = t.placement, i = t.variation, l = t.offsets, a = t.position, s = t.gpuAcceleration, p = t.adaptive, d = t.roundOffsets, A = d === !0 ? Vr(l) : typeof d == "function" ? d(l) : l, b = A.x, f = b === void 0 ? 0 : b, u = A.y, c = u === void 0 ? 0 : u, m = l.hasOwnProperty("x"), x = l.hasOwnProperty("y"), w = de, O = ce, v = window;
  if (p) {
    var E = qt(o), C = "clientHeight", g = "clientWidth";
    E === Oe(o) && (E = ze(o), qe(E).position !== "static" && a === "absolute" && (C = "scrollHeight", g = "scrollWidth")), E = E, (r === ce || (r === de || r === Ae) && i === wt) && (O = ye, c -= E[C] - n.height, c *= s ? 1 : -1), (r === de || (r === ce || r === ye) && i === wt) && (w = Ae, f -= E[g] - n.width, f *= s ? 1 : -1);
  }
  var k = Object.assign({
    position: a
  }, p && Lr);
  if (s) {
    var B;
    return Object.assign({}, k, (B = {}, B[O] = x ? "0" : "", B[w] = m ? "0" : "", B.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + c + "px)" : "translate3d(" + f + "px, " + c + "px, 0)", B));
  }
  return Object.assign({}, k, (e = {}, e[O] = x ? c + "px" : "", e[w] = m ? f + "px" : "", e.transform = "", e));
}
function Gr(t) {
  var e = t.state, o = t.options, n = o.gpuAcceleration, r = n === void 0 ? !0 : n, i = o.adaptive, l = i === void 0 ? !0 : i, a = o.roundOffsets, s = a === void 0 ? !0 : a, p = {
    placement: Pe(e.placement),
    variation: rt(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: r
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, tn(Object.assign({}, p, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: l,
    roundOffsets: s
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, tn(Object.assign({}, p, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
var Nr = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Gr,
  data: {}
};
function Fr(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(o) {
    var n = e.styles[o] || {}, r = e.attributes[o] || {}, i = e.elements[o];
    !pe(i) || !je(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(l) {
      var a = r[l];
      a === !1 ? i.removeAttribute(l) : i.setAttribute(l, a === !0 ? "" : a);
    }));
  });
}
function Qr(t) {
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
      var r = e.elements[n], i = e.attributes[n] || {}, l = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : o[n]), a = l.reduce(function(s, p) {
        return s[p] = "", s;
      }, {});
      !pe(r) || !je(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(s) {
        r.removeAttribute(s);
      }));
    });
  };
}
var Jr = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Fr,
  effect: Qr,
  requires: ["computeStyles"]
}, Ur = [Hr, Ir, Nr, Jr], Zr = /* @__PURE__ */ Wr({
  defaultModifiers: Ur
});
function zr(t) {
  return t === "x" ? "y" : "x";
}
function Jt(t, e, o) {
  return Qe(t, kt(e, o));
}
function Yr(t) {
  var e = t.state, o = t.options, n = t.name, r = o.mainAxis, i = r === void 0 ? !0 : r, l = o.altAxis, a = l === void 0 ? !1 : l, s = o.boundary, p = o.rootBoundary, d = o.altBoundary, A = o.padding, b = o.tether, f = b === void 0 ? !0 : b, u = o.tetherOffset, c = u === void 0 ? 0 : u, m = So(e, {
    boundary: s,
    rootBoundary: p,
    padding: A,
    altBoundary: d
  }), x = Pe(e.placement), w = rt(e.placement), O = !w, v = jo(x), E = zr(v), C = e.modifiersData.popperOffsets, g = e.rects.reference, k = e.rects.popper, B = typeof c == "function" ? c(Object.assign({}, e.rects, {
    placement: e.placement
  })) : c, M = {
    x: 0,
    y: 0
  };
  if (C) {
    if (i || a) {
      var j = v === "y" ? ce : de, I = v === "y" ? ye : Ae, D = v === "y" ? "height" : "width", J = C[v], U = C[v] + m[j], L = C[v] - m[I], Z = f ? -k[D] / 2 : 0, q = w === nt ? g[D] : k[D], W = w === nt ? -k[D] : -g[D], R = e.elements.arrow, z = f && R ? Do(R) : {
        width: 0,
        height: 0
      }, ee = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : En(), re = ee[j], K = ee[I], G = Jt(0, g[D], z[D]), ge = O ? g[D] / 2 - Z - G - re - B : q - G - re - B, ae = O ? -g[D] / 2 + Z + G + K + B : W + G + K + B, oe = e.elements.arrow && qt(e.elements.arrow), ut = oe ? v === "y" ? oe.clientTop || 0 : oe.clientLeft || 0 : 0, Me = e.modifiersData.offset ? e.modifiersData.offset[e.placement][v] : 0, Ie = C[v] + ge - Me - ut, Le = C[v] + ae - Me;
      if (i) {
        var Ve = Jt(f ? kt(U, Ie) : U, J, f ? Qe(L, Le) : L);
        C[v] = Ve, M[v] = Ve - J;
      }
      if (a) {
        var ft = v === "x" ? ce : de, vt = v === "x" ? ye : Ae, ie = C[E], Ge = ie + m[ft], Ne = ie - m[vt], Fe = Jt(f ? kt(Ge, Ie) : Ge, ie, f ? Qe(Ne, Le) : Ne);
        C[E] = Fe, M[E] = Fe - ie;
      }
    }
    e.modifiersData[n] = M;
  }
}
var Kr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Yr,
  requiresIfExists: ["offset"]
}, _r = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ut(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return _r[e];
  });
}
var $r = {
  start: "end",
  end: "start"
};
function on(t) {
  return t.replace(/start|end/g, function(e) {
    return $r[e];
  });
}
function ea(t, e) {
  e === void 0 && (e = {});
  var o = e, n = o.placement, r = o.boundary, i = o.rootBoundary, l = o.padding, a = o.flipVariations, s = o.allowedAutoPlacements, p = s === void 0 ? kn : s, d = rt(n), A = d ? a ? Ko : Ko.filter(function(u) {
    return rt(u) === d;
  }) : Wt, b = A.filter(function(u) {
    return p.indexOf(u) >= 0;
  });
  b.length === 0 && (b = A);
  var f = b.reduce(function(u, c) {
    return u[c] = So(t, {
      placement: c,
      boundary: r,
      rootBoundary: i,
      padding: l
    })[Pe(c)], u;
  }, {});
  return Object.keys(f).sort(function(u, c) {
    return f[u] - f[c];
  });
}
function ta(t) {
  if (Pe(t) === To)
    return [];
  var e = Ut(t);
  return [on(t), e, on(e)];
}
function oa(t) {
  var e = t.state, o = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var r = o.mainAxis, i = r === void 0 ? !0 : r, l = o.altAxis, a = l === void 0 ? !0 : l, s = o.fallbackPlacements, p = o.padding, d = o.boundary, A = o.rootBoundary, b = o.altBoundary, f = o.flipVariations, u = f === void 0 ? !0 : f, c = o.allowedAutoPlacements, m = e.options.placement, x = Pe(m), w = x === m, O = s || (w || !u ? [Ut(m)] : ta(m)), v = [m].concat(O).reduce(function(K, G) {
      return K.concat(Pe(G) === To ? ea(e, {
        placement: G,
        boundary: d,
        rootBoundary: A,
        padding: p,
        flipVariations: u,
        allowedAutoPlacements: c
      }) : G);
    }, []), E = e.rects.reference, C = e.rects.popper, g = /* @__PURE__ */ new Map(), k = !0, B = v[0], M = 0; M < v.length; M++) {
      var j = v[M], I = Pe(j), D = rt(j) === nt, J = [ce, ye].indexOf(I) >= 0, U = J ? "width" : "height", L = So(e, {
        placement: j,
        boundary: d,
        rootBoundary: A,
        altBoundary: b,
        padding: p
      }), Z = J ? D ? Ae : de : D ? ye : ce;
      E[U] > C[U] && (Z = Ut(Z));
      var q = Ut(Z), W = [];
      if (i && W.push(L[I] <= 0), a && W.push(L[Z] <= 0, L[q] <= 0), W.every(function(K) {
        return K;
      })) {
        B = j, k = !1;
        break;
      }
      g.set(j, W);
    }
    if (k)
      for (var R = u ? 3 : 1, z = function(K) {
        var G = v.find(function(ge) {
          var ae = g.get(ge);
          if (ae)
            return ae.slice(0, K).every(function(oe) {
              return oe;
            });
        });
        if (G)
          return B = G, "break";
      }, ee = R; ee > 0; ee--) {
        var re = z(ee);
        if (re === "break") break;
      }
    e.placement !== B && (e.modifiersData[n]._skip = !0, e.placement = B, e.reset = !0);
  }
}
var na = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: oa,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ra(t, e, o) {
  var n = Pe(t), r = [de, ce].indexOf(n) >= 0 ? -1 : 1, i = typeof o == "function" ? o(Object.assign({}, e, {
    placement: t
  })) : o, l = i[0], a = i[1];
  return l = l || 0, a = (a || 0) * r, [de, Ae].indexOf(n) >= 0 ? {
    x: a,
    y: l
  } : {
    x: l,
    y: a
  };
}
function aa(t) {
  var e = t.state, o = t.options, n = t.name, r = o.offset, i = r === void 0 ? [0, 0] : r, l = kn.reduce(function(d, A) {
    return d[A] = ra(A, e.rects, i), d;
  }, {}), a = l[e.placement], s = a.x, p = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += s, e.modifiersData.popperOffsets.y += p), e.modifiersData[n] = l;
}
var ia = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: aa
}, la = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Bn(typeof t != "number" ? t : Pn(t, Wt));
};
function sa(t) {
  var e, o = t.state, n = t.name, r = t.options, i = o.elements.arrow, l = o.modifiersData.popperOffsets, a = Pe(o.placement), s = jo(a), p = [de, Ae].indexOf(a) >= 0, d = p ? "height" : "width";
  if (!(!i || !l)) {
    var A = la(r.padding, o), b = Do(i), f = s === "y" ? ce : de, u = s === "y" ? ye : Ae, c = o.rects.reference[d] + o.rects.reference[s] - l[s] - o.rects.popper[d], m = l[s] - o.rects.reference[s], x = qt(i), w = x ? s === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, O = c / 2 - m / 2, v = A[f], E = w - b[d] - A[u], C = w / 2 - b[d] / 2 + O, g = Jt(v, C, E), k = s;
    o.modifiersData[n] = (e = {}, e[k] = g, e.centerOffset = g - C, e);
  }
}
function pa(t) {
  var e = t.state, o = t.options, n = o.element, r = n === void 0 ? "[data-popper-arrow]" : n;
  r != null && (typeof r == "string" && (r = e.elements.popper.querySelector(r), !r) || Cn(e.elements.popper, r) && (e.elements.arrow = r));
}
var ca = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: sa,
  effect: pa,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
const no = (t) => parseInt(t, 10);
function da({
  arrowPadding: t,
  emit: e,
  locked: o,
  offsetDistance: n,
  offsetSkid: r,
  placement: i,
  popperNode: l,
  triggerNode: a
}) {
  const s = ko({
    isOpen: !1,
    popperInstance: null
  }), p = (c) => {
    var m;
    (m = s.popperInstance) === null || m === void 0 || m.setOptions((x) => ({
      ...x,
      modifiers: [...x.modifiers, {
        name: "eventListeners",
        enabled: c
      }]
    }));
  }, d = () => p(!0), A = () => p(!1), b = () => {
    s.isOpen && (s.isOpen = !1, e("close:popper"));
  }, f = () => {
    s.isOpen || (s.isOpen = !0, e("open:popper"));
  };
  ne([() => s.isOpen, i], async ([c]) => {
    c ? (await u(), d()) : A();
  });
  const u = async () => {
    await Co(), s.popperInstance = Zr(a.value, l.value, {
      placement: i.value,
      modifiers: [Kr, na, {
        name: "flip",
        enabled: !o.value
      }, ca, {
        name: "arrow",
        options: {
          padding: no(t.value)
        }
      }, ia, {
        name: "offset",
        options: {
          offset: [no(r.value), no(n.value)]
        }
      }]
    }), s.popperInstance.update();
  };
  return He(() => {
    var c;
    (c = s.popperInstance) === null || c === void 0 || c.destroy();
  }), {
    ...Ze(s),
    open: f,
    close: b
  };
}
const ua = {
  id: "arrow",
  "data-popper-arrow": ""
};
function fa(t, e) {
  return y(), T("div", ua);
}
function Dn(t, e) {
  e === void 0 && (e = {});
  var o = e.insertAt;
  if (!(!t || typeof document > "u")) {
    var n = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
    r.type = "text/css", o === "top" && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t));
  }
}
var va = `
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
Dn(va);
const Ro = {};
Ro.render = fa;
Ro.__scopeId = "data-v-20b7fd4a";
var ma = Ro;
const ha = ["onKeyup"];
var Tn = {
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
    dt((q) => ({
      c81fc0a4: t.zIndex
    }));
    const n = Rt(), r = F(null), i = F(null), l = F(null), a = F(!1);
    se(() => {
      const q = n.default();
      if (q && q.length > 1)
        return console.error(`[Popper]: The <Popper> component expects only one child element at its root. You passed ${q.length} child nodes.`);
    });
    const {
      arrowPadding: s,
      closeDelay: p,
      content: d,
      disableClickAway: A,
      disabled: b,
      interactive: f,
      locked: u,
      offsetDistance: c,
      offsetSkid: m,
      openDelay: x,
      placement: w,
      show: O
    } = Ze(o), {
      isOpen: v,
      open: E,
      close: C
    } = da({
      arrowPadding: s,
      emit: e,
      locked: u,
      offsetDistance: c,
      offsetSkid: m,
      placement: w,
      popperNode: i,
      triggerNode: l
    }), {
      hasContent: g
    } = lr(n, i, d), k = S(() => O.value !== null), B = S(() => b.value || !g.value), M = S(() => v.value && !B.value), j = S(() => !A.value && !k.value), I = S(() => f.value ? `border: ${c.value}px solid transparent; margin: -${c.value}px;` : null), D = oo.debounce(E, x.value), J = oo.debounce(C, p.value), U = async () => {
      B.value || k.value || (J.clear(), D());
    }, L = async () => {
      k.value || (D.clear(), J());
    }, Z = () => {
      v.value ? L() : U();
    };
    return ne([g, b], ([q, W]) => {
      v.value && (!q || W) && C();
    }), ne(v, (q) => {
      q ? a.value = !0 : oo.debounce(() => {
        a.value = !1;
      }, 200);
    }), _e(() => {
      k.value && (O.value ? D() : J());
    }), _e(() => {
      j.value && ir(r, L);
    }), (q, W) => (y(), T("div", {
      class: "inline-block",
      style: et(P(I)),
      onMouseleave: W[2] || (W[2] = (R) => t.hover && L()),
      ref: (R, z) => {
        z.popperContainerNode = R, r.value = R;
      }
    }, [h("div", {
      ref: (R, z) => {
        z.triggerNode = R, l.value = R;
      },
      onMouseover: W[0] || (W[0] = (R) => t.hover && U()),
      onClick: Z,
      onFocus: U,
      onKeyup: Ao(L, ["esc"])
    }, [V(q.$slots, "default")], 40, ha), te(wo, {
      name: "fade"
    }, {
      default: H(() => [le(h("div", {
        onClick: W[1] || (W[1] = (R) => !P(f) && L()),
        class: "popper",
        ref: (R, z) => {
          z.popperNode = R, i.value = R;
        }
      }, [V(q.$slots, "content", {
        close: P(C),
        isOpen: a.value
      }, () => [X(N(P(d)), 1)]), t.arrow ? (y(), Q(ma, {
        key: 0
      })) : _("", !0)], 512), [[xo, P(M)]])]),
      _: 3
    })], 36));
  }
}, ba = `
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
Dn(ba);
Tn.__scopeId = "data-v-5784ed69";
var ga = /* @__PURE__ */ (() => {
  const t = Tn;
  return t.install = (e) => {
    e.component("Popper", t);
  }, t;
})();
const ya = /* @__PURE__ */ Y({
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
    return dt((e) => ({
      e99d4766: e.zIndex
    })), (e, o) => (y(), Q(P(ga), {
      class: "m-tooltip",
      arrow: !0,
      "z-index": e.zIndex,
      placement: e.placement,
      hover: e.hover,
      show: e.show
    }, {
      content: H((n) => [
        h("div", {
          class: "m-tooltip__content",
          style: et({
            maxHeight: e.maxHeight
          })
        }, [
          V(e.$slots, "content", Tt(jt(n)))
        ], 4)
      ]),
      default: H(() => [
        V(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["z-index", "placement", "hover", "show"]));
  }
}), Aa = ["innerHTML"], xa = /* @__PURE__ */ Y({
  __name: "RCashbackConditions",
  props: {
    tooltipContents: {},
    maxHeight: { default: "80vh" }
  },
  setup(t) {
    const e = F("hidden"), o = F(), n = new IntersectionObserver(
      (i) => {
        for (const l of i)
          (!l.isIntersecting || l.intersectionRatio < 0.5) && (e.value = "hidden");
      },
      { threshold: 0.5 }
    ), r = () => {
      e.value = e.value === "visible" ? "hidden" : "visible";
    };
    return se(() => {
      o.value && n.observe(o.value);
    }), yn(() => {
      o.value && n.unobserve(o.value);
    }), (i, l) => (y(), T("div", {
      ref_key: "el",
      ref: o
    }, [
      te(P(ya), {
        placement: "left",
        class: "w-full text-center",
        "max-height": i.maxHeight,
        hover: !1,
        show: e.value === "visible"
      }, {
        content: H(() => [
          h("div", {
            class: "max-w-93.75",
            innerHTML: i.tooltipContents
          }, null, 8, Aa)
        ]),
        default: H(() => [
          h("p", {
            class: "mb-0 uppercase text-xs font-medium cursor-pointer -colorGrey",
            onClick: r
          }, l[0] || (l[0] = [
            X(" Voir les conditions "),
            h("i", { class: "fa-solid fa-circle-info" }, null, -1)
          ]))
        ]),
        _: 1
      }, 8, ["max-height", "show"])
    ], 512));
  }
}), wa = { class: "-colorGrey" }, ka = /* @__PURE__ */ Y({
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
    } = Ze(e), l = S(() => `Jusqu'à ${r.value}`), a = S(() => {
      if (!n.value)
        return e.prefix;
      const p = l.value.indexOf(r.value);
      return e.prefix + l.value.slice(0, p);
    }), s = S(() => {
      if (!n.value)
        return e.suffix;
      const p = l.value.indexOf(r.value) + r.value.length;
      return l.value.slice(p) + e.suffix;
    });
    return (p, d) => (y(), T("span", null, [
      X(N(a.value) + " ", 1),
      P(o) ? (y(), T($, { key: 0 }, [
        h("s", wa, N(P(i)), 1),
        d[0] || (d[0] = X(" "))
      ], 64)) : _("", !0),
      p.unstyled ? (y(), T($, { key: 1 }, [
        X(N(P(r) + s.value), 1)
      ], 64)) : (y(), T($, { key: 2 }, [
        h("b", null, N(P(r)), 1),
        X(N(s.value), 1)
      ], 64))
    ]));
  }
}), Ca = { class: "grid-rows-[auto_min-content] bg-white color-grey-100 w-99.5 h-123 grid text-center overflow-auto" }, Oa = { class: "flex flex-col items-center justify-center gap-2 p-4.5" }, Ea = {
  key: 0,
  class: "text-[39px]"
}, Ba = {
  key: 1,
  class: "m-0 text-[28px] whitespace-pre-line"
}, Pa = {
  key: 2,
  class: "m-0 text-lg whitespace-pre-line leading-6"
}, Da = {
  key: 3,
  class: "flex flex-col items-center w-full"
}, Ta = { key: 0 }, ja = /* @__PURE__ */ Y({
  __name: "RGenericModalPanel",
  props: {
    emoji: { default: "" },
    title: { default: "" },
    subtitle: { default: "" }
  },
  setup(t) {
    const e = Rt(), o = S(() => !!e.emoji), n = S(() => !!e.title), r = S(() => !!e.subtitle), i = S(() => !!e.default), l = S(() => !!e.footer);
    return (a, s) => (y(), T("div", Ca, [
      h("div", Oa, [
        o.value || a.emoji !== "" ? (y(), T("div", Ea, [
          V(a.$slots, "emoji", {}, () => [
            X(N(a.emoji), 1)
          ])
        ])) : _("", !0),
        n.value || a.title !== "" ? (y(), T("h3", Ba, [
          V(a.$slots, "title", {}, () => [
            X(N(a.title), 1)
          ])
        ])) : _("", !0),
        r.value || a.subtitle !== "" ? (y(), T("p", Pa, [
          V(a.$slots, "subtitle", {}, () => [
            X(N(a.subtitle), 1)
          ])
        ])) : _("", !0),
        i.value ? (y(), T("div", Da, [
          V(a.$slots, "default")
        ])) : _("", !0)
      ]),
      l.value ? (y(), T("div", Ta, [
        V(a.$slots, "footer")
      ])) : _("", !0)
    ]));
  }
}), Sa = /* @__PURE__ */ Y({
  __name: "RCashbackActivationModalPanel",
  props: {
    cashback: {},
    cashbackActivationStatus: { default: "inactive" },
    merchantBonuses: { default: () => [] }
  },
  emits: ["activateCashbackClick"],
  setup(t, { emit: e }) {
    const o = t, { merchantBonuses: n } = Ze(o), r = e, i = () => {
      r("activateCashbackClick");
    }, l = S(() => n.value.find((a) => {
      var s;
      return ((s = a.grade) == null ? void 0 : s.value) === 3;
    }));
    return (a, s) => {
      const p = so("tag");
      return le((y(), Q(P(ja), {
        emoji: "🤑",
        title: "Profitez du cashback"
      }, {
        subtitle: H(() => [
          te(P(ka), go({ unstyled: "" }, a.cashback, { suffix: " sur votre commande" }), null, 16),
          l.value ? (y(), T($, { key: 0 }, [
            X(" +" + N(l.value.text) + " pour les membres Poulpeo + ", 1)
          ], 64)) : _("", !0)
        ]),
        default: H(() => [
          te(P(xa), {
            "tooltip-contents": a.cashback.htmlConditions,
            class: "mt-2 w-full",
            "max-height": "400px"
          }, null, 8, ["tooltip-contents"]),
          te(P(rr), {
            class: "w-64 mt-5",
            loading: a.cashbackActivationStatus === "ongoing",
            onClick: i
          }, {
            default: H(() => [
              a.cashbackActivationStatus === "inactive" ? (y(), T($, { key: 0 }, [
                s[0] || (s[0] = h("i", { class: "fa-regular fa-coins" }, null, -1)),
                s[1] || (s[1] = X(" Activer le cashback "))
              ], 64)) : (y(), T($, { key: 1 }, [
                s[2] || (s[2] = h("i", { class: "fa-regular fa-check fa-lg" }, null, -1)),
                s[3] || (s[3] = X(" Cashback Activé ! "))
              ], 64))
            ]),
            _: 1
          }, 8, ["loading"]),
          s[4] || (s[4] = h("div", { class: "[ a-alert -info ] flex-col w-72 mt-9" }, " Petit rappel : Pensez à (ré)activer le cashback juste avant chaque commande. ", -1))
        ]),
        _: 1
      })), [
        [p, { label: "CashbackActivationModalPanel" }]
      ]);
    };
  }
}), Ra = { class: "o-dialog__body" }, qa = {
  key: 0,
  method: "dialog"
}, Wa = /* @__PURE__ */ Y({
  __name: "RDialog",
  props: {
    open: { type: Boolean },
    inline: { type: Boolean },
    closeButton: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(t, { emit: e }) {
    const o = t, n = e, r = () => {
      n("close");
    }, i = St(), l = F(null), a = F(!1);
    return se(() => {
      _e(() => {
        o.open === a.value || !l.value || (o.open ? o.inline ? l.value.show() : l.value.showModal() : l.value.close(), a.value = o.open);
      });
    }), (s, p) => (y(), T("dialog", go({
      ref_key: "dialog",
      ref: l,
      class: "o-dialog"
    }, P(i), {
      onclick: "event.target === this && this.close()",
      onClose: po(r, ["prevent"])
    }), [
      h("div", Ra, [
        V(s.$slots, "default")
      ]),
      s.closeButton ? (y(), T("form", qa, [
        h("button", {
          type: "button",
          class: "o-dialog__close",
          "aria-label": "Fermer",
          onClick: po(r, ["prevent"])
        }, p[0] || (p[0] = [
          h("span", { class: "fa-stack" }, [
            h("i", { class: "fa-solid fa-circle fa-stack-2x" }),
            h("i", { class: "fa-solid fa-xmark fa-lg fa-stack-1x fa-inverse" })
          ], -1)
        ]))
      ])) : _("", !0)
    ], 16));
  }
}), Xa = { class: "flex gap-0.25" }, Ha = /* @__PURE__ */ Y({
  __name: "RGenericModal",
  props: {
    open: { type: Boolean }
  },
  emits: ["close"],
  setup(t, { emit: e }) {
    const o = St(), n = e, r = () => {
      n("close");
    };
    return (i, l) => (y(), Q(P(Wa), go(P(o), {
      class: "p-0 fixed !top-1/2 !-translate-y-1/2",
      open: i.open,
      inline: !1,
      "close-button": !0,
      style: "--dialog-max-width: fit-content",
      onClose: r
    }), {
      default: H(() => [
        h("div", Xa, [
          V(i.$slots, "default")
        ])
      ]),
      _: 3
    }, 16, ["open"]));
  }
}), Ma = { class: "grid-rows-[auto_min-content] bg-white color-grey-100 w-99.5 h-123 grid text-center overflow-auto" }, Ia = { class: "flex flex-col items-center justify-center gap-2 p-4.5" }, La = {
  key: 0,
  class: "text-[39px]"
}, Va = {
  key: 1,
  class: "m-0 text-[28px] whitespace-pre-line"
}, Ga = {
  key: 2,
  class: "m-0 text-lg whitespace-pre-line leading-6"
}, Na = {
  key: 3,
  class: "flex flex-col items-center w-full"
}, Fa = { key: 0 }, $e = /* @__PURE__ */ Y({
  __name: "RGenericModalPanel",
  props: {
    emoji: { default: "" },
    title: { default: "" },
    subtitle: { default: "" }
  },
  setup(t) {
    const e = Rt(), o = S(() => !!e.emoji), n = S(() => !!e.title), r = S(() => !!e.subtitle), i = S(() => !!e.default), l = S(() => !!e.footer);
    return (a, s) => (y(), T("div", Ma, [
      h("div", Ia, [
        o.value || a.emoji !== "" ? (y(), T("div", La, [
          V(a.$slots, "emoji", {}, () => [
            X(N(a.emoji), 1)
          ])
        ])) : _("", !0),
        n.value || a.title !== "" ? (y(), T("h3", Va, [
          V(a.$slots, "title", {}, () => [
            X(N(a.title), 1)
          ])
        ])) : _("", !0),
        r.value || a.subtitle !== "" ? (y(), T("p", Ga, [
          V(a.$slots, "subtitle", {}, () => [
            X(N(a.subtitle), 1)
          ])
        ])) : _("", !0),
        i.value ? (y(), T("div", Na, [
          V(a.$slots, "default")
        ])) : _("", !0)
      ]),
      l.value ? (y(), T("div", Fa, [
        V(a.$slots, "footer")
      ])) : _("", !0)
    ]));
  }
}), Ap = /* @__PURE__ */ Y({
  __name: "RCouponApplierModal",
  props: {
    open: { type: Boolean },
    couponApplierTestInfo: {}
  },
  emits: ["activateCashbackClick", "close", "logInWithAppleClick", "logInWithFacebookClick", "logInWithGoogleClick", "openAppleAppStoreClick", "openGooglePlayStoreClick", "registerWithAppleClick", "registerWithFacebookClick", "registerWithGoogleClick", "whatIsCashbackClick", "logInWithEmailClick", "registerWithEmailClick"],
  setup(t, { emit: e }) {
    const o = t, n = e, r = F(o.couponApplierTestInfo);
    ne(
      () => o.couponApplierTestInfo,
      () => {
        r.value = o.couponApplierTestInfo;
      }
    );
    const i = S(() => {
      const g = {
        tested: 0,
        valid: 0,
        validAndApplied: 0,
        validAndAppliedAndCompatibleWithCashback: 0,
        total: 0
      };
      return o.couponApplierTestInfo === void 0 ? g : o.couponApplierTestInfo.testedCoupons.reduce((k, B) => {
        const M = ["failure", "success"].includes(B.testStatus), j = ["success"].includes(B.testStatus), I = B.isAppliedToShoppingCart ?? !1, D = B.isCompatibleWithCashback;
        return k.tested += +M, k.valid += +j, k.validAndApplied += +(j && I), k.validAndAppliedAndCompatibleWithCashback += +(j && I && D), k.total += 1, k;
      }, g);
    }), l = S(
      () => {
        var g;
        return (g = o.couponApplierTestInfo) == null ? void 0 : g.testedCoupons.find(
          (k) => k.testStatus === "ongoing"
        );
      }
    ), a = S(
      () => {
        var g;
        return ((g = o.couponApplierTestInfo) == null ? void 0 : g.testedCoupons.filter(
          (k) => k.isAppliedToShoppingCart
        )) ?? [];
      }
    ), s = S(
      () => {
        var g;
        return (g = o.couponApplierTestInfo) == null ? void 0 : g.testedMerchant.cashback;
      }
    ), p = S(
      () => i.value.validAndApplied === i.value.validAndAppliedAndCompatibleWithCashback
    ), d = () => {
      n("activateCashbackClick");
    }, A = () => {
      n("close");
    }, b = () => {
      n("logInWithAppleClick");
    }, f = (g) => {
      n("logInWithEmailClick", g);
    }, u = () => {
      n("logInWithFacebookClick");
    }, c = () => {
      n("logInWithGoogleClick");
    }, m = () => {
      n("openAppleAppStoreClick");
    }, x = () => {
      n("openGooglePlayStoreClick");
    }, w = () => {
      n("registerWithAppleClick");
    }, O = (g) => {
      n("registerWithEmailClick", g);
    }, v = () => {
      n("registerWithFacebookClick");
    }, E = () => {
      n("registerWithGoogleClick");
    }, C = () => {
      n("whatIsCashbackClick");
    };
    return (g, k) => {
      var B, M;
      const j = so("tag"), I = so("track");
      return le((y(), Q(P(Ha), {
        open: g.open,
        onClose: A
      }, {
        default: H(() => [
          V(g.$slots, "default", {}, () => {
            var D;
            return [
              (D = r.value) != null && D.testedMerchant ? (y(), T($, { key: 0 }, [
                i.value.tested < i.value.total && l.value ? le((y(), Q(P(gp), {
                  key: 0,
                  "coupon-count": i.value,
                  "tested-coupons": r.value.testedCoupons,
                  tip: r.value.testedMerchant.autocheckTips
                }, null, 8, ["coupon-count", "tested-coupons", "tip"])), [
                  [j, { label: "RCouponApplierModalTestProgressPanel" }],
                  [
                    I,
                    "extension_component_impression",
                    "impression",
                    { once: !0 }
                  ]
                ]) : i.value.valid > 0 ? le((y(), Q(P(dp), {
                  key: 1,
                  "applied-coupons": a.value,
                  "merchant-name": r.value.testedMerchant.name,
                  "is-cashback-available": s.value !== void 0,
                  "is-user-logged-in": r.value.isUserLoggedIn,
                  "shopping-cart-total-without-coupons": r.value.shoppingCartTotalWithoutCoupons,
                  onWhatIsCashbackClick: C
                }, null, 8, ["applied-coupons", "merchant-name", "is-cashback-available", "is-user-logged-in", "shopping-cart-total-without-coupons"])), [
                  [j, { label: "RCouponApplierModalSuccessfulTestResultsPanel" }],
                  [
                    I,
                    "extension_component_impression",
                    "impression",
                    { once: !0 }
                  ]
                ]) : le((y(), Q(P(Ks), {
                  key: 2,
                  "merchant-name": r.value.testedMerchant.name,
                  "is-cashback-available": s.value !== void 0,
                  "is-user-logged-in": r.value.isUserLoggedIn,
                  onWhatIsCashbackClick: C
                }, null, 8, ["merchant-name", "is-cashback-available", "is-user-logged-in"])), [
                  [j, { label: "RCouponApplierModalFailedTestResultsPanel" }],
                  [
                    I,
                    "extension_component_impression",
                    "impression",
                    { once: !0 }
                  ]
                ]),
                i.value.tested === i.value.total ? (y(), T($, { key: 3 }, [
                  s.value === void 0 ? le((y(), Q(P(bl), {
                    key: 0,
                    onOpenAppleAppStoreClick: m,
                    onOpenGooglePlayStoreClick: x
                  }, null, 512)), [
                    [j, {
                      label: "RCouponApplierModalApplicationPromotionPanel"
                    }],
                    [
                      I,
                      "extension_component_impression",
                      "impression",
                      { once: !0 }
                    ]
                  ]) : p.value ? (y(), T($, { key: 1 }, [
                    r.value.isUserLoggedIn && ["inactive", "ongoing"].includes(r.value.cashbackActivationStatus) ? le((y(), Q(P(Sa), {
                      key: 0,
                      cashback: s.value,
                      "cashback-activation-status": r.value.cashbackActivationStatus,
                      "merchant-bonuses": [],
                      onActivateCashbackClick: d
                    }, null, 8, ["cashback", "cashback-activation-status"])), [
                      [j, {
                        label: "RCouponApplierModalCashbackActivationPanel"
                      }],
                      [
                        I,
                        "extension_component_impression",
                        "impression",
                        { once: !0 }
                      ]
                    ]) : r.value.isUserLoggedIn ? le((y(), Q(P(qs), {
                      key: 1,
                      "applied-coupon-count": i.value.validAndApplied,
                      cashback: s.value,
                      "is-every-applied-coupon-compatible-with-cashback": !0
                    }, null, 8, ["applied-coupon-count", "cashback"])), [
                      [j, {
                        label: "RCouponApplierModalCashbackActivationConfirmationPanel"
                      }],
                      [
                        I,
                        "extension_component_impression",
                        "impression",
                        { once: !0 }
                      ]
                    ]) : le((y(), Q(P(zs), {
                      key: 2,
                      "applied-coupon-count": i.value.validAndApplied,
                      cashback: s.value,
                      onLogInWithAppleClick: b,
                      onLogInWithEmailClick: f,
                      onLogInWithFacebookClick: u,
                      onLogInWithGoogleClick: c,
                      onRegisterWithAppleClick: w,
                      onRegisterWithEmailClick: O,
                      onRegisterWithFacebookClick: v,
                      onRegisterWithGoogleClick: E
                    }, null, 8, ["applied-coupon-count", "cashback"])), [
                      [j, { label: "RCouponApplierModalCashbackPromotionPanel" }],
                      [
                        I,
                        "extension_component_impression",
                        "impression",
                        { once: !0 }
                      ]
                    ])
                  ], 64)) : _("", !0)
                ], 64)) : _("", !0)
              ], 64)) : _("", !0)
            ];
          })
        ]),
        _: 3
      }, 8, ["open"])), [
        [j, {
          linkedEntities: {
            merchant: (B = r.value) == null ? void 0 : B.testedMerchant,
            cashbackOffer: (M = r.value) == null ? void 0 : M.testedMerchant.cashback
          }
        }]
      ]);
    };
  }
}), Qa = "data:image/png;base64,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", Ja = "data:image/png;base64,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", Ua = "data:image/png;base64,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", Za = "data:image/png;base64,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", za = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ8AAABRCAYAAADM3CMNAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABx/SURBVHgB7V17lBXFmf96EAU1cdjFPaKuDmj25LDGB+Dr5CyCq6ybNYIPcoJGAZMV1pMjSHyLDLjs2ZzdP8RsouAqD3kpLgpHDZ5jooCCUSMPjUISmcFEEBmEGc0wAzNza+tX3V/f79Z039v3cnuYR/2gph+3u7q6u+rX3/fVV18ROTg4OJQAL+6HxYsXj+jdu/d5bW1t55ODg0OPhOd5aw8dOrRu4sSJO9v9Zu9YunQpyOIRfdIIcnBwcCBDIgubm5tnSRLJIY9ly5aN14s5OlWuX7+e1q1bR5988gkdPHiQHBwcehaOP/54GjZsGA0fPpwGDx6MXbVaCrmcCSQkD6gpvXr1er2uro7mzp1L27ZtIwcHBwfgqquuoltuuQWrIYFUYGvBggWVmjgWQMKYPXu2Iw4HB4ccvPLKK0ao0Bh47LHHzseKIQ+9MUYvqlauXEmQPBwcHBxswJSBBHsoNBVDHnpjCqSONWvWkIODg0McYAfV8CoqKkZXBPvO37lzJzk4ODjkw/bt200HihY4LqtYvnx5FXbu27ePHBwcHAohMG1UVpCDg4NDQiilqLGx0aw78nBwcCgJjjwcHBxKgiMPBweHkuDIIw8eeeQRqq2tNWnz5s30+uuv0/jx42OPO//87BhCrOP4AwcOGD0R58tzR4wYEebNCccvWLCAqqqq2l2jurraHIO8sIw6jstp7+drTZkyxWzjd86DgWsXKsuYMWNy8rHB+UYl5BeHCRMmhM8KCevyulHPF0A5sH/06NE5xyV5Zw5HjtTIo/fXj6eTrxtGlRefRV0V/fr1M5W4vr7epMrKSlq4cKGpmLJy83H4HcA6Ki4q+6JFi+jRRx8Nz506dWp4Hp+DbnLuKueGZDeemTNnmjIgDxzLx/E1OT9cU5KC/A3llNvyGrxtl0WSEa5l5xN1HXlPMkUBpMgkhWe1evXqkIRAelHP137uXB75vnA9LLGNZ4brOJQZ6KpdtmyZmjx5stKbZUlfG/kddcrvZql+H96lKrfdrU5fO0X1v2FY2fLvqKQrnQJ0JQ736UZs9umGG3vcnDlzzLb+4oXH6Iqv9FfVJGzjWEA3nJxranLJ2a+/9u2uJ6+B8vA+CVlmvhYfqxtUuzx1YzX75DX4XlEmbGsyaXdNmaLyLZQ0OZlzcK5d3lWrVsW+B1k+lCvuOOTLzx3voNg64FL7NH36dKU5oyYVyaPp9l9QXcOPqI36kKpQ9OVpvan5pyNowIYpdPylA6krAxLA2rVrzVcxSr0A+AuJLx8D69deey3deeed7b6gErrBmCWL6Cxyz5o1q105kKetQrCUhK95vuskAZf/SPPJh6i88XwnTpxoJIYjBSSQLVu2mOukeR89EWUnj2MGVFHbqTplBlBj/b9pAulLGU/Tlb5Sw2nH0nErvk/951xLfc/4a+qq2Lp1q1myWG2DKz2IAI2Yj0OjwG+SVGwwIfExvI0GIMGiud0osB9Eg/NKEdVRViSoLCAmVpWKAa6N82WKa7hQ6QCoYCgv3y+uyUR6JGBVLp/q5FAajqEyo9X8VXBfpUzmVDq4fzL1+Zu5mjyaDFU1ea2kvvcNOu7736TeT26mw0+8S81/+oK6EvI1fgAkMXLkSEMc3HhQcSEtQK+XQMXGfgANjCUNblRRUoxdDhwjf9cqjTEiwr4CG0IxsA2bIKJiGx0arG13QR54LjZQVpQdxIHngASihIQWdXwSIC88RzwXECGW/Dwdyod0DKYVWtTwFClIHK0DqLlukqaTvkb6MEn/BhI5eNu5dNyqG6nfjcOoKwI9A3FAxR84cCBdcMEFIWFEGe5AHtjHFR4NB8Rjf3XzidxRxAKxH4CxtRigzFxuNDiUSxp5k4DvXSZbcpLAc8ExuG88K+6pQu9OKQB5sQSF5wYiYoJ2KB9SIQ+PQByeCTWEZablNDq8ZxJlVB9DKEaNQdL/vvrbPtTwPyOpcusUOvHqc6gr4LLLLjNLRFmLAldcAI0GkgcaBho5GqIkAjQcSGlI6C3AcfKLy43O7qbkfWzjsIEvPaQGHBPXtRoFFu9xXUgFAHeFFgO7pyWqjCwZ8L3hvvlZAcWUWwLECTKCjanU8jsURirkoSB5VGDcbnAFEIUmkJbdk40EYrb56hU+wdSfcRy1LrmGTnx8DPXpxPYQfA1R4bmBReGFF14wSZIEN6JijXasdti+CmhYyCufXQCNH9cs9QuetoER+UPCsKUjVpNslc0mULaPxKlVICM2bsfZpxxKR9ltHgYyMqqiLFkcHkBtf55EFWfO04TR5O8LpBBIK82wmIz7O+ozbjBVLtuue2jWdQp7CBouKt95551nGiIqK38do4AvPhoEfCTQgBsaGsIvLCpzIZuJBCQTEAW+yADiKbA0wdJFHHAdfIXzOWjZiLK/2AZTSF62GoD74kaMRh2lJtj72A6CZwMbSRArIpQ4mDjxDFEWqFDoTebniX1xthQGng+Oxbml2lAcYlB2P48BVcp7V7/hd3R6WynvrYyit/T6Bp3ezCjvDb3vnU9Vxd4Zytt/j6IDOtXfozykA3fr7bv9pd7u+/6PVeVNF5anXCUk9htgwBcC/hXSJ0EeJ/0L4HvAvhMM+D/wuXF+HlEJ/gl2WWRenLiM9vm2T0g+Pw/7GuzjwfcUB+TN+cYh7v5QPnl9+GTYviSaMEOfkLhnEOcPguMA6XfjUumJ/Tw8kAfqHMKLBTEKjwy6m9Z7EW7Uej3jX07bR4NtrPhiiHfcLqJBT5Dq1WROg85P/uH+Nk7wPLPd79PDpP5zA9UvfZe6GrgrNc42USykx2t3QyE1BCj383QoHpo8EE29NhW1RZkmDyMg1jyzx9/lG1ENqRw6lahmEtFZ84h6NQcn+l28ht68rO5Tf1pvOuYX/0gnfmcQtd7/qy7VtVvuSt6dfRWS3Jsjjc6D1LpqvcBQasQOEEHQfWvAvS0BgXhtfQxxqIA4JAz16P0tqo0a/+VM8t6fRJWPX9epjaoODj0B6ZAHk0OFTxpsEKWgFwa/e7zeDAK5jVSmr881nIVS2fVgCbW5SRtV68edTa0vfY9Ouf8qcnBwODpIiTwUMRMY0giJxN/nd88yoej1plPJ26EJREsgKjjESCDKl0PMX8/LuUTbGV+jPfeeS/3en0qVN3VNJzMHh66MdJzEKryQPHJIw/yofNOH50siIBBzPFSYHdoGAgIRxlJJIiGBqKxyc+CMY6nh5yOp38sTnSrj4NCBSMdJjAJyAFGEagpLI55xT/cNosqQi2JJxBDIbZpA+voZ4ZiAKHLkjoBYQnVGbx/49snaHnIbVT7m7CEODh2BlIIBsXu6L4F4gZu6L4GocL8SEgoF696h08ir9SUQ7q5liaOdDURcEfuaqI3qbzyb2t64mfrffyU5ODikh/KTR0AELHn4REJZkghIxIu0i5AvlTT7KgyMqAyTk1JZe4i4nI2Wk46lH//wINW+WEnjR7sYDg4OaSC1MIQqGOzFA+SyEgb/Tj65VPgSiBeQiMfHsR8IJBBhLA2dyIhyiESJ3pmZezdQdd0GOvPkelo4vZ42r+hPVaem44nv4NBTkUqLMnYO4RemMsJCkTVUkKf3G5MGO5OBRFRwYkbvbhpACjaQs54gr1dz6DhmSEPYQpiokNnMuo1UvW+Db0MJrnX+Wfuo5pd9adFLJ9Ksuc2089NmOlqAdyTGpmCcDEZ+nnTSSWZ0Lob3I8iQG3/h0FWQkocp//VET0kwVF8Jz1MWHzLiXOYZtokcPo0UJJBB8zS5NIVkQZY7O1C9dyPN0Il6Gf/WsDS+a3wTTbhap9F9aea8Spr18471UsTgLAz44hgTceCBXqUE4elOwGA4ECsAj1LE5EgbGPSYdPg+RlRj4F7cO7JDIeDYckRG60xIcVQtN26WFnzC8MQ+o65k/B4XJhB027I0YggCEoi2gShtA/HOmkdKSyC23QOo3qNVlb0bAumEjwjG0VSIM1QTVU9qpvHXagJ5jGjRynRJhKNqJR0SLkP4YRRqvlGz3RloxHKsS0eQBxo8j15OAhAcRhxHET0+EDIvSJfdjTxS8zDlXhYv7K71Qs9TdiIL27mxdVgG1MAHJDxH20BUjfADEZj52QZDHkaqISX8QAIZSKlcI6u+1sBTtD1kdj3VrNP2kNMpFaAyYlh+qbEkQB443wXu7bzg6SlKjZnSlZGaFTGMJhZKG8JWwT4e+C2wcyi2gYSOYH7vi5E8gmN9V/ZAhQkG0xni+GyjL734F87xASFh+8gtoF+Ggafso9q1fWjED4jW/aZ8thBUJgQEssHiLr5CHGGL7SCoiIiVIaOyy1GkDh0LvKuo5453JQkd65Au8wWI6o5ITW1RshNVSgpMFuRlSYEP84LfQsOoPy5GeazWqBwCmbnn11ri2Gi6d31NyQttKtnLBtJIUK6sHUZlSUY105wHe9MF36WyICoAMEc159B+9m8c9QqAxIHgNRx0qCfbPo4m8gVhBoHg48BEDwJBAKh8QaK6G1KLYSo9ulTw+WdSkPFN/VCFgYNY2G3rqzqmx4Q9U4XqQ7oXZuaSv6LqmndCgmBSCNUfPpx7b1j8YcnHH/cfFvLcb7ZQuWDP5IbGj4DCUcQRBZAH4m864ui8gISBdyrfjwx36EWKu90LKcUwpWxPCkcDCu0gQgrwhN9GEG2dncrYscwQjKEfFY6Rqf7VYqp+9mWiBUPIO9QrIKtgPIwxeXg55MXEEZIYd+mE71fR/OeoLJBzjwClSg+s1jh0XrA0KdGTgi2nZDD1hMHUEzaHrKHUC9eFY5iRMLxQEsmOwvVCV/bqVxfTjFeX+ASw52tETw3VxtTexHZSjwlLSbWJRFAiXst2KP9Gq6mzfkZlgW2thxThSKD7wu5B4e7lnoDy2zxkmxVWy6xNIrsn174hs1BB+/fVGhV0485Ys4QeemVJNm/kBQJ5Uksg/7qJvL4tQitRuXlKiSdYqduv6JGFRD/9XyoLQBy21GFP8tQRsMtQKuRsdEcawYvLlFYkMFnWjiRrWz2Rz74Y4DwOMRk3VUVnQzo2D0+1VxuE6sLdr8rLuqXzeUZ9EZIGqz0PaeKYvmZx0O3qG0YV6z27fQJRzb1DKYe5Jcghe7xGaxvRfz2l6BujykccgN0l25ETDXEEcniqYoZ5Ttguxs8EAAnCbiPz4nWe0T4JcBzsPHY+6NrkyOzIj5M9vUQhgCygJsryyXsutSEXA/u58lSkSQCjq3w+eOZ4NvYzktcq9nnBUU2eEzX/T8koe/T006sU1eoWXqP7XXfoJqsTfayXf9TLP+jl75H0b9uUSd5Hev0jvf6hTr/T6QOd3tdpq96/RS83KzV91mJ16KJR6jDSxaNUy8VXqtZLrlRtl45SbZdcoTKXXqnTFUrdcIlSr/ZWCi4fb2m55m29hE31tzpt8lTbZlJrHiN1ztlUnnu1kh3dGxG/07iOnbSVXyUBIrXnmykekcijoqjbwDEyqnpU0pXWREEvVB57m8+X5YiKCI8I6YXyBwqVUyZEbJewo7DbSUsdOeXMZDJK2zzMb9rOlZOXHQ0ezycJkD9HiMe7k/eM9ULvUwLHV1kR90tJHD09vdFi7MsR6i6Kwjgc+BOMf6FgWwW/iwzM/4dWL6UHX1oSnhsGSVZBnmEvi17sOpG8eUNJTX6PvBNa/F8D4WR7jaIf/TvRxuQfhqJhs3qSPn/27UgKdB1KVQhfqKRfE1wLx/LsdRL4Sid1SMOx6JaEfh/lAcvzziYpTyng6SiTgCeUStrTxVCWI6INzO43f/78dipikrmBcd9Jy4P8ca/o2cE74ylAAfZijcvLlorKbYRPZ2AcBT4UXrhGOa8iaPP+ala/MSRiOMcnkgdXLaUHVi8xLh5sS8VaRmX9OrJGDj8iGQiE5g4hun2TIZC9+7Ux9Emix8rUm5IUSV8ST15UDJg8UIls4oC7NI+54Mol8+e5caW7N8/cJomDKyobBPk82VhAEJioSfpC4H6iJoRCmUGmUWUqBri+7XzHk1/hOjyFJcrK94P1YhsO6i7PHxxVBttRDGSTdCiBnSfKjWeN54O8eYwNP2ssMU0pniuIQs53jOPiyMOeF7nsQx1SU1tqM8rTCeseqzAfZywVRm9vhwoTqDFQYT70VZgHZi9RB4f9c5CuUs0XcvondejCUb4aY1SYUVqFGeWrMUaVucKoMIeuv0j9x8Rj1NdPoPLcV4Jki4hJzrEncyoEnqipKmKCJUzKFHWNKBFfiuS6kqk4UZkKiPZy4igkW+2xxXVOUOnsMiVRW+yyaiKJFN15Uq24cia5t2Jg32chtQXlw7uPm/QLz99WUfg33LNElHpl378mz0T1MUlitSW1SGK+muFLFTlOYaTC4fLh6FiOZRoYUx94QUsczy+lTIZCJzD29fJzD4bg835FYS9Oq+aflw/so4EvbqUHF7TSl43UYZBfNmn9TwP2zPX4qtjTQjJ4lK6EHIthqw/5/FLw9bMlDRaPsZSSCb6kceoLfsPXtljIsvKAOamCsRHVlk6gGqbxPmDoxPMq1jjOk3pjOlA5PIGnJcW9yeeDY/jZ2s8takJw+50Wq7YlQXoD4+TSgL0/vbC3hXtlAm3EkMP9mjTuW7ksSzxEWeJQFOxn0gjyC8jkza/q6R8+/C19d/sW2n34EHU0bBtHElsGXrLvCxOdoFtLcKO2844jDvm7bGTszISKKhs8jisk3tuVl4nIHhxWqEGhQhfTJWmXVc6Pi0aH/NCYcV1bBXv44YeLJg+enNxOeM94TiCNQYMGlRyDBWXmXi3Ym9Abwj0uuA/EfJHge5dDGTgfeW84TqpGhebzLRUpGUyztgg2S8j4G15ABqEkQr6Oed+KZXTf/y0XxtbAQ8Rjw6sKsyfFK0SftTTRrE930Py6XXQ0Af1fNiBIB0kMaPlg2zS4K1Dul40oDjx+hssn9emo/PPBJkl2jDrzzDNz9vPE1fnKhHInNfjajR9lxVcX9xTVFY37ha0D9pZi/SbwYYJUkFZwJhBFPoMx+33EgSfwBvBc2CYCdJTLQDoGU49yJIese3igzoAPzDy2KiAQontXLNfEsYxCc6sgh5BigmNV4F6+P9NC/717Bz2191P6KtNKRxv4GklDHYv0R1IB7QpWzlGbUapVkkZmExVX8lLyOhJnKO5JsfNjwuisUdlQbvu9otzy3Rbyy8G98YhsACTKJCENpWk6KqY39UIgJXgkjBUkvUeztpB7NHHcq6UO35FLZW0Ytl0jsIG06T8v1e+lYR+8SXP27OwUxAHgZdqSBipKqbp2PvFTNrp8XyiJqMZtN94kZbUlBSYTBLyRSFKuYp5NPqLhcSYDBw5MVWI4UnDPCQPlxiBIqKdQgzjhPgrZhGybCH+sbNUuLaQcAFllBQiTAiOqF/IC3fvMcrrn2eWhwTM0kAZGECYOL8jkl/Wf0+Xb36axH2/S6krH2zUKARVDVnI0tKgvZCFw96mEFD/lV4q7DvMBx8ivGZ9vSzJJBnbFqVJ2XoUC5CQpt4RNTgAaBxobGh+eT2d367bvV3aHS3BXez7YNiNIHLZEk2YkuvSG5FOgugTSRY4kEuCe5cvpbk0eLJzIXhPZw4J8drc00w9qNtHYHZvo3cbOW0Gi4m3ihcIAllRC4AhktgOSFD+jJJx8sPVezss2phXyO0GZbP8Brvx2I7D9QgqVKQ4qqBRst5H7oSrGfV1x7Y5yU08Kuyx4z3HHFfKFwfOQdcJ+d0mM30eClNQWYdzM2Ueh3eLu5c+YpFjKCJcVWTVFb+3V0sWDu7bRkA/X06r6PdQVwHEtJVAZeGxInD6L/TjXJg5UEjvIjN17gnNBIHbl5CA1tvojG7pdVnzR7K5gvgdIQ3G9M3a+LD1FNV67TBJxsTBAFug1kcfF5QOxH9cGcW/atCnyfo4G7MYcZTQtxoM2Xxds2oMyU/Mw9RGMmlXhD4YVfrLsWbrLEEfWNV0RSROr8SJd2bCbqj/7iPZ0QvWkEKKMVwAHN5ajJ9G44vxCmDjsSof90O2lPwMaCFQFqA9QJdD7gW07X4jKMj/2AOVGyIQDIxwkHFwLXcM26bFnpwSkLtmlyqQJUkGZkDeuE3WvqoBLeFRZoa6AwPBMkX9UWXHMHXfc0Y5wjwZsQyfeD55PvuecDyw52uegDqRu90nFw/RP2vSpE32il59kzNKknUrdNXu52jN4tEmf/z3SNaruHD/t+9Y1au85V6vlVRepocf3K095jnLSlSPRYLMo4LxCg+uK9YqM8/iEl6Y9sK9Q2eK8UFHmUu55/vz55nx7wFlNTU1O/poMjMdoUuD8qgQDwuSzxCC3QgPj8qV8HqbwBE4C+33Elcf2JgU0uaZWp1P2MCX/OtyjYq5JdNfSZ2naUl9VYfnE88I4YfTxob/QD//8Ho3b+Q69d/AAdQfgiwsRGl/kpPon9xxgMFShrllIOEkilXFEszg7A66J6yUxsLGRMu6aKDN+zzfVAByjbr31VioFOBf5JykrJLMhQ4akqvsXC0hAkBrzlQn3ltQDl6UZRprdsxIeJA9NVLXr16+nuXPn0hHj9Cqit2oD7siG5Jm2+Fn6yeJnsvE22Iiql3WtzfT4Fzvo6f076S+dpNs1LUC8hKgK70EZGR0vnOf2KFXcRL5IUFegLrDvQLE+D9wzw4OzUEZWhWzvxkJAPlApuEycD3T1hoYGymSyM36hwTC5SXWLfTfSLivUrWKd7+KAcsjeJpTJ/hDIsvO9otxcB2xHsbho7nakfnyo0nBHZ2jJgwYPHlybDnlsrAk2fPeuO59eQdOWrAjJgk2jGb1ceKCGfrbvj/R569GbAtLh6AASmVYpzLqugzRt2rRUK313BYyr0uaB55qmpMXkkdLUC4F4oSvE1KefozsXr/AVF9/TnNp0eq1xD8354ve0ual7qCcOWbB0hV6jfOJzlJHPoTjY/jtpd89KlJ88vqzXBJExBDJ10QpNHiuCCZn8mVr+cPhLmvn5+7SucS85dC/AfvX888+H4jpsExjfElWZ0QMyY8aMcDutwVvdHbYNqyOnJy2/wVSTh3rj1zRl4XM0RUsdxhiqO1z2tjTRw59/QFfvXOuIo5sCqoccWAeCeO2119r5YcDYif0d5UbdXWE7kh2JjaYUpKK2nHD7OPr2id+ixj6V9FXmMD1V/zEta6ihxm5uDHXwfUhgAGTDI/RviNIsTkf5s8DPQTp/OSSDLXUUCstQbqRCHo0NX9DYhrXk0PMAVeW6664z6os9jiPK0xTEcfnll3eqrtSuADxLGdOlo7pnJVL083DoqQAhsM9IHCmwL0tn88HoKmBi5gBFHTnNByO96OkOPR6o0EjoDYBfC2wgkExgF4nzWXBIBviC5HPC6wg48nBIHcU6azl0DTi1xcHBoSQ48nBwcCgJjjwcHBwSA46AJ5xwglmvGDdu3E69rO/fvz85ODg4FAIGOSqldhrJQ69sGTx4MDkCcXBwyIfhw4djgZgrqw15ZDIZ4xB/ww03kIODg0MUoLLAATBY98nj5ptvXqulj7Vgleuvv54cHBwcJEAckyZNopNPPhmBymbB3NGLfxw7duw6vRij1ZdKGER27dpFBw8eJAcHh54LkIYmDBNgaNiwYYisseqmm2663fwmDwwCA72uV6vq6upo27ZtJrpVY2MHzhbt4ODQKQAhYujQoQj8g01IHI+2tLTMmjBhgnENjoxxv3Tp0gmacar1ahU5ODj0ZIA01sIuqs0b6+QP/w/bi8hg+4LVFAAAAABJRU5ErkJggg==", Ya = ["title"], Ka = {
  key: 0,
  class: "a-stars__star fa-solid fa-star"
}, _a = {
  key: 1,
  class: "a-stars__star fa-solid fa-star-half-stroke"
}, $a = {
  key: 2,
  class: "a-stars__star fa-regular fa-star"
}, ei = /* @__PURE__ */ Y({
  __name: "RRating",
  props: {
    rating: {},
    maxRating: {}
  },
  setup(t) {
    const e = t, o = [...Array(e.maxRating).keys()].map((i) => i + 1), n = S(() => Math.round((e.rating + Number.EPSILON) * 100) / 100), r = S(() => `${n.value}/${e.maxRating}`);
    return (i, l) => (y(), T("div", {
      class: "a-stars text-xs",
      title: r.value
    }, [
      (y(!0), T($, null, bo(P(o), (a) => (y(), T($, { key: a }, [
        Math.trunc(n.value) >= a ? (y(), T("i", Ka)) : n.value >= a - 0.5 ? (y(), T("i", _a)) : (y(), T("i", $a))
      ], 64))), 128))
    ], 8, Ya));
  }
});
function fo(t, e, o) {
  var n, r, i, l, a;
  e == null && (e = 100);
  function s() {
    var d = Date.now() - l;
    d < e && d >= 0 ? n = setTimeout(s, e - d) : (n = null, o || (a = t.apply(i, r), i = r = null));
  }
  var p = function() {
    i = this, r = arguments, l = Date.now();
    var d = o && !n;
    return n || (n = setTimeout(s, e)), d && (a = t.apply(i, r), i = r = null), a;
  };
  return p.clear = function() {
    n && (clearTimeout(n), n = null);
  }, p.flush = function() {
    n && (a = t.apply(i, r), i = r = null, clearTimeout(n), n = null);
  }, p;
}
fo.debounce = fo;
var ro = fo;
function ti(t, e, o) {
  Oo(t) ? ne(t, (n, r) => {
    r == null || r.removeEventListener(e, o), n == null || n.addEventListener(e, o);
  }) : se(() => {
    t.addEventListener(e, o);
  }), He(() => {
    var n;
    (n = P(t)) === null || n === void 0 || n.removeEventListener(e, o);
  });
}
function oi(t, e) {
  return typeof window > "u" || !window ? void 0 : ti(window, "pointerdown", (o) => {
    const n = P(t);
    n && (n === o.target || o.composedPath().includes(n) || e(o));
  });
}
function ni(t, e, o) {
  let n = null;
  const r = F(!1);
  se(() => {
    (t.content !== void 0 || o.value) && (r.value = !0), n = new MutationObserver(i), n.observe(e.value, {
      childList: !0,
      subtree: !0
    });
  }), He(() => n.disconnect()), ne(o, (l) => {
    l ? r.value = !0 : r.value = !1;
  });
  const i = () => {
    t.content ? r.value = !0 : r.value = !1;
  };
  return {
    hasContent: r
  };
}
function at(t, e) {
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
function Ee(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function qo(t) {
  var e = Ee(t), o = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: n
  };
}
function Ct(t) {
  var e = Ee(t).Element;
  return t instanceof e || t instanceof Element;
}
function ue(t) {
  var e = Ee(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function jn(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Ee(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function ri(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function ai(t) {
  return t === Ee(t) || !ue(t) ? qo(t) : ri(t);
}
function Se(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Ye(t) {
  return ((Ct(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function Wo(t) {
  return at(Ye(t)).left + qo(t).scrollLeft;
}
function We(t) {
  return Ee(t).getComputedStyle(t);
}
function Xo(t) {
  var e = We(t), o = e.overflow, n = e.overflowX, r = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + r + n);
}
function ii(t) {
  var e = t.getBoundingClientRect(), o = e.width / t.offsetWidth || 1, n = e.height / t.offsetHeight || 1;
  return o !== 1 || n !== 1;
}
function li(t, e, o) {
  o === void 0 && (o = !1);
  var n = ue(e);
  ue(e) && ii(e);
  var r = Ye(e), i = at(t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !o) && ((Se(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Xo(r)) && (l = ai(e)), ue(e) ? (a = at(e), a.x += e.clientLeft, a.y += e.clientTop) : r && (a.x = Wo(r))), {
    x: i.left + l.scrollLeft - a.x,
    y: i.top + l.scrollTop - a.y,
    width: i.width,
    height: i.height
  };
}
function Ho(t) {
  var e = at(t), o = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - o) <= 1 && (o = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: o,
    height: n
  };
}
function eo(t) {
  return Se(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (jn(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Ye(t)
  );
}
function Sn(t) {
  return ["html", "body", "#document"].indexOf(Se(t)) >= 0 ? t.ownerDocument.body : ue(t) && Xo(t) ? t : Sn(eo(t));
}
function yt(t, e) {
  var o;
  e === void 0 && (e = []);
  var n = Sn(t), r = n === ((o = t.ownerDocument) == null ? void 0 : o.body), i = Ee(n), l = r ? [i].concat(i.visualViewport || [], Xo(n) ? n : []) : n, a = e.concat(l);
  return r ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(yt(eo(l)))
  );
}
function si(t) {
  return ["table", "td", "th"].indexOf(Se(t)) >= 0;
}
function nn(t) {
  return !ue(t) || // https://github.com/popperjs/popper-core/issues/837
  We(t).position === "fixed" ? null : t.offsetParent;
}
function pi(t) {
  var e = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, o = navigator.userAgent.indexOf("Trident") !== -1;
  if (o && ue(t)) {
    var n = We(t);
    if (n.position === "fixed")
      return null;
  }
  for (var r = eo(t); ue(r) && ["html", "body"].indexOf(Se(r)) < 0; ) {
    var i = We(r);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
      return r;
    r = r.parentNode;
  }
  return null;
}
function Xt(t) {
  for (var e = Ee(t), o = nn(t); o && si(o) && We(o).position === "static"; )
    o = nn(o);
  return o && (Se(o) === "html" || Se(o) === "body" && We(o).position === "static") ? e : o || pi(t) || e;
}
var fe = "top", xe = "bottom", we = "right", ve = "left", Mo = "auto", Ht = [fe, xe, we, ve], it = "start", Ot = "end", ci = "clippingParents", Rn = "viewport", ht = "popper", di = "reference", rn = /* @__PURE__ */ Ht.reduce(function(t, e) {
  return t.concat([e + "-" + it, e + "-" + Ot]);
}, []), qn = /* @__PURE__ */ [].concat(Ht, [Mo]).reduce(function(t, e) {
  return t.concat([e, e + "-" + it, e + "-" + Ot]);
}, []), ui = "beforeRead", fi = "read", vi = "afterRead", mi = "beforeMain", hi = "main", bi = "afterMain", gi = "beforeWrite", yi = "write", Ai = "afterWrite", xi = [ui, fi, vi, mi, hi, bi, gi, yi, Ai];
function wi(t) {
  var e = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(i) {
    e.set(i.name, i);
  });
  function r(i) {
    o.add(i.name);
    var l = [].concat(i.requires || [], i.requiresIfExists || []);
    l.forEach(function(a) {
      if (!o.has(a)) {
        var s = e.get(a);
        s && r(s);
      }
    }), n.push(i);
  }
  return t.forEach(function(i) {
    o.has(i.name) || r(i);
  }), n;
}
function ki(t) {
  var e = wi(t);
  return xi.reduce(function(o, n) {
    return o.concat(e.filter(function(r) {
      return r.phase === n;
    }));
  }, []);
}
function Ci(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(o) {
      Promise.resolve().then(function() {
        e = void 0, o(t());
      });
    })), e;
  };
}
function De(t) {
  return t.split("-")[0];
}
function Oi(t) {
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
function Ei(t) {
  var e = Ee(t), o = Ye(t), n = e.visualViewport, r = o.clientWidth, i = o.clientHeight, l = 0, a = 0;
  return n && (r = n.width, i = n.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = n.offsetLeft, a = n.offsetTop)), {
    width: r,
    height: i,
    x: l + Wo(t),
    y: a
  };
}
var Je = Math.max, Et = Math.min, Gt = Math.round;
function Bi(t) {
  var e, o = Ye(t), n = qo(t), r = (e = t.ownerDocument) == null ? void 0 : e.body, i = Je(o.scrollWidth, o.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), l = Je(o.scrollHeight, o.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), a = -n.scrollLeft + Wo(t), s = -n.scrollTop;
  return We(r || o).direction === "rtl" && (a += Je(o.clientWidth, r ? r.clientWidth : 0) - i), {
    width: i,
    height: l,
    x: a,
    y: s
  };
}
function Wn(t, e) {
  var o = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (o && jn(o)) {
    var n = e;
    do {
      if (n && t.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function vo(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Pi(t) {
  var e = at(t);
  return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
}
function an(t, e) {
  return e === Rn ? vo(Ei(t)) : ue(e) ? Pi(e) : vo(Bi(Ye(t)));
}
function Di(t) {
  var e = yt(eo(t)), o = ["absolute", "fixed"].indexOf(We(t).position) >= 0, n = o && ue(t) ? Xt(t) : t;
  return Ct(n) ? e.filter(function(r) {
    return Ct(r) && Wn(r, n) && Se(r) !== "body";
  }) : [];
}
function Ti(t, e, o) {
  var n = e === "clippingParents" ? Di(t) : [].concat(e), r = [].concat(n, [o]), i = r[0], l = r.reduce(function(a, s) {
    var p = an(t, s);
    return a.top = Je(p.top, a.top), a.right = Et(p.right, a.right), a.bottom = Et(p.bottom, a.bottom), a.left = Je(p.left, a.left), a;
  }, an(t, i));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function lt(t) {
  return t.split("-")[1];
}
function Io(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function Xn(t) {
  var e = t.reference, o = t.element, n = t.placement, r = n ? De(n) : null, i = n ? lt(n) : null, l = e.x + e.width / 2 - o.width / 2, a = e.y + e.height / 2 - o.height / 2, s;
  switch (r) {
    case fe:
      s = {
        x: l,
        y: e.y - o.height
      };
      break;
    case xe:
      s = {
        x: l,
        y: e.y + e.height
      };
      break;
    case we:
      s = {
        x: e.x + e.width,
        y: a
      };
      break;
    case ve:
      s = {
        x: e.x - o.width,
        y: a
      };
      break;
    default:
      s = {
        x: e.x,
        y: e.y
      };
  }
  var p = r ? Io(r) : null;
  if (p != null) {
    var d = p === "y" ? "height" : "width";
    switch (i) {
      case it:
        s[p] = s[p] - (e[d] / 2 - o[d] / 2);
        break;
      case Ot:
        s[p] = s[p] + (e[d] / 2 - o[d] / 2);
        break;
    }
  }
  return s;
}
function Hn() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Mn(t) {
  return Object.assign({}, Hn(), t);
}
function In(t, e) {
  return e.reduce(function(o, n) {
    return o[n] = t, o;
  }, {});
}
function Lo(t, e) {
  e === void 0 && (e = {});
  var o = e, n = o.placement, r = n === void 0 ? t.placement : n, i = o.boundary, l = i === void 0 ? ci : i, a = o.rootBoundary, s = a === void 0 ? Rn : a, p = o.elementContext, d = p === void 0 ? ht : p, A = o.altBoundary, b = A === void 0 ? !1 : A, f = o.padding, u = f === void 0 ? 0 : f, c = Mn(typeof u != "number" ? u : In(u, Ht)), m = d === ht ? di : ht, x = t.rects.popper, w = t.elements[b ? m : d], O = Ti(Ct(w) ? w : w.contextElement || Ye(t.elements.popper), l, s), v = at(t.elements.reference), E = Xn({
    reference: v,
    element: x,
    strategy: "absolute",
    placement: r
  }), C = vo(Object.assign({}, x, E)), g = d === ht ? C : v, k = {
    top: O.top - g.top + c.top,
    bottom: g.bottom - O.bottom + c.bottom,
    left: O.left - g.left + c.left,
    right: g.right - O.right + c.right
  }, B = t.modifiersData.offset;
  if (d === ht && B) {
    var M = B[r];
    Object.keys(k).forEach(function(j) {
      var I = [we, xe].indexOf(j) >= 0 ? 1 : -1, D = [fe, xe].indexOf(j) >= 0 ? "y" : "x";
      k[j] += M[D] * I;
    });
  }
  return k;
}
var ln = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function sn() {
  for (var t = arguments.length, e = new Array(t), o = 0; o < t; o++)
    e[o] = arguments[o];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function ji(t) {
  t === void 0 && (t = {});
  var e = t, o = e.defaultModifiers, n = o === void 0 ? [] : o, r = e.defaultOptions, i = r === void 0 ? ln : r;
  return function(l, a, s) {
    s === void 0 && (s = i);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ln, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, d = [], A = !1, b = {
      state: p,
      setOptions: function(c) {
        var m = typeof c == "function" ? c(p.options) : c;
        u(), p.options = Object.assign({}, i, p.options, m), p.scrollParents = {
          reference: Ct(l) ? yt(l) : l.contextElement ? yt(l.contextElement) : [],
          popper: yt(a)
        };
        var x = ki(Oi([].concat(n, p.options.modifiers)));
        return p.orderedModifiers = x.filter(function(w) {
          return w.enabled;
        }), f(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!A) {
          var c = p.elements, m = c.reference, x = c.popper;
          if (sn(m, x)) {
            p.rects = {
              reference: li(m, Xt(x), p.options.strategy === "fixed"),
              popper: Ho(x)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(k) {
              return p.modifiersData[k.name] = Object.assign({}, k.data);
            });
            for (var w = 0; w < p.orderedModifiers.length; w++) {
              if (p.reset === !0) {
                p.reset = !1, w = -1;
                continue;
              }
              var O = p.orderedModifiers[w], v = O.fn, E = O.options, C = E === void 0 ? {} : E, g = O.name;
              typeof v == "function" && (p = v({
                state: p,
                options: C,
                name: g,
                instance: b
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Ci(function() {
        return new Promise(function(c) {
          b.forceUpdate(), c(p);
        });
      }),
      destroy: function() {
        u(), A = !0;
      }
    };
    if (!sn(l, a))
      return b;
    b.setOptions(s).then(function(c) {
      !A && s.onFirstUpdate && s.onFirstUpdate(c);
    });
    function f() {
      p.orderedModifiers.forEach(function(c) {
        var m = c.name, x = c.options, w = x === void 0 ? {} : x, O = c.effect;
        if (typeof O == "function") {
          var v = O({
            state: p,
            name: m,
            instance: b,
            options: w
          }), E = function() {
          };
          d.push(v || E);
        }
      });
    }
    function u() {
      d.forEach(function(c) {
        return c();
      }), d = [];
    }
    return b;
  };
}
var Nt = {
  passive: !0
};
function Si(t) {
  var e = t.state, o = t.instance, n = t.options, r = n.scroll, i = r === void 0 ? !0 : r, l = n.resize, a = l === void 0 ? !0 : l, s = Ee(e.elements.popper), p = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && p.forEach(function(d) {
    d.addEventListener("scroll", o.update, Nt);
  }), a && s.addEventListener("resize", o.update, Nt), function() {
    i && p.forEach(function(d) {
      d.removeEventListener("scroll", o.update, Nt);
    }), a && s.removeEventListener("resize", o.update, Nt);
  };
}
var Ri = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Si,
  data: {}
};
function qi(t) {
  var e = t.state, o = t.name;
  e.modifiersData[o] = Xn({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
var Wi = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: qi,
  data: {}
}, Xi = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Hi(t) {
  var e = t.x, o = t.y, n = window, r = n.devicePixelRatio || 1;
  return {
    x: Gt(Gt(e * r) / r) || 0,
    y: Gt(Gt(o * r) / r) || 0
  };
}
function pn(t) {
  var e, o = t.popper, n = t.popperRect, r = t.placement, i = t.variation, l = t.offsets, a = t.position, s = t.gpuAcceleration, p = t.adaptive, d = t.roundOffsets, A = d === !0 ? Hi(l) : typeof d == "function" ? d(l) : l, b = A.x, f = b === void 0 ? 0 : b, u = A.y, c = u === void 0 ? 0 : u, m = l.hasOwnProperty("x"), x = l.hasOwnProperty("y"), w = ve, O = fe, v = window;
  if (p) {
    var E = Xt(o), C = "clientHeight", g = "clientWidth";
    E === Ee(o) && (E = Ye(o), We(E).position !== "static" && a === "absolute" && (C = "scrollHeight", g = "scrollWidth")), E = E, (r === fe || (r === ve || r === we) && i === Ot) && (O = xe, c -= E[C] - n.height, c *= s ? 1 : -1), (r === ve || (r === fe || r === xe) && i === Ot) && (w = we, f -= E[g] - n.width, f *= s ? 1 : -1);
  }
  var k = Object.assign({
    position: a
  }, p && Xi);
  if (s) {
    var B;
    return Object.assign({}, k, (B = {}, B[O] = x ? "0" : "", B[w] = m ? "0" : "", B.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + c + "px)" : "translate3d(" + f + "px, " + c + "px, 0)", B));
  }
  return Object.assign({}, k, (e = {}, e[O] = x ? c + "px" : "", e[w] = m ? f + "px" : "", e.transform = "", e));
}
function Mi(t) {
  var e = t.state, o = t.options, n = o.gpuAcceleration, r = n === void 0 ? !0 : n, i = o.adaptive, l = i === void 0 ? !0 : i, a = o.roundOffsets, s = a === void 0 ? !0 : a, p = {
    placement: De(e.placement),
    variation: lt(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: r
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, pn(Object.assign({}, p, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: l,
    roundOffsets: s
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, pn(Object.assign({}, p, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
var Ii = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Mi,
  data: {}
};
function Li(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(o) {
    var n = e.styles[o] || {}, r = e.attributes[o] || {}, i = e.elements[o];
    !ue(i) || !Se(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(l) {
      var a = r[l];
      a === !1 ? i.removeAttribute(l) : i.setAttribute(l, a === !0 ? "" : a);
    }));
  });
}
function Vi(t) {
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
      var r = e.elements[n], i = e.attributes[n] || {}, l = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : o[n]), a = l.reduce(function(s, p) {
        return s[p] = "", s;
      }, {});
      !ue(r) || !Se(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(s) {
        r.removeAttribute(s);
      }));
    });
  };
}
var Gi = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Li,
  effect: Vi,
  requires: ["computeStyles"]
}, Ni = [Ri, Wi, Ii, Gi], Fi = /* @__PURE__ */ ji({
  defaultModifiers: Ni
});
function Qi(t) {
  return t === "x" ? "y" : "x";
}
function Zt(t, e, o) {
  return Je(t, Et(e, o));
}
function Ji(t) {
  var e = t.state, o = t.options, n = t.name, r = o.mainAxis, i = r === void 0 ? !0 : r, l = o.altAxis, a = l === void 0 ? !1 : l, s = o.boundary, p = o.rootBoundary, d = o.altBoundary, A = o.padding, b = o.tether, f = b === void 0 ? !0 : b, u = o.tetherOffset, c = u === void 0 ? 0 : u, m = Lo(e, {
    boundary: s,
    rootBoundary: p,
    padding: A,
    altBoundary: d
  }), x = De(e.placement), w = lt(e.placement), O = !w, v = Io(x), E = Qi(v), C = e.modifiersData.popperOffsets, g = e.rects.reference, k = e.rects.popper, B = typeof c == "function" ? c(Object.assign({}, e.rects, {
    placement: e.placement
  })) : c, M = {
    x: 0,
    y: 0
  };
  if (C) {
    if (i || a) {
      var j = v === "y" ? fe : ve, I = v === "y" ? xe : we, D = v === "y" ? "height" : "width", J = C[v], U = C[v] + m[j], L = C[v] - m[I], Z = f ? -k[D] / 2 : 0, q = w === it ? g[D] : k[D], W = w === it ? -k[D] : -g[D], R = e.elements.arrow, z = f && R ? Ho(R) : {
        width: 0,
        height: 0
      }, ee = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Hn(), re = ee[j], K = ee[I], G = Zt(0, g[D], z[D]), ge = O ? g[D] / 2 - Z - G - re - B : q - G - re - B, ae = O ? -g[D] / 2 + Z + G + K + B : W + G + K + B, oe = e.elements.arrow && Xt(e.elements.arrow), ut = oe ? v === "y" ? oe.clientTop || 0 : oe.clientLeft || 0 : 0, Me = e.modifiersData.offset ? e.modifiersData.offset[e.placement][v] : 0, Ie = C[v] + ge - Me - ut, Le = C[v] + ae - Me;
      if (i) {
        var Ve = Zt(f ? Et(U, Ie) : U, J, f ? Je(L, Le) : L);
        C[v] = Ve, M[v] = Ve - J;
      }
      if (a) {
        var ft = v === "x" ? fe : ve, vt = v === "x" ? xe : we, ie = C[E], Ge = ie + m[ft], Ne = ie - m[vt], Fe = Zt(f ? Et(Ge, Ie) : Ge, ie, f ? Je(Ne, Le) : Ne);
        C[E] = Fe, M[E] = Fe - ie;
      }
    }
    e.modifiersData[n] = M;
  }
}
var Ui = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Ji,
  requiresIfExists: ["offset"]
}, Zi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function zt(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Zi[e];
  });
}
var zi = {
  start: "end",
  end: "start"
};
function cn(t) {
  return t.replace(/start|end/g, function(e) {
    return zi[e];
  });
}
function Yi(t, e) {
  e === void 0 && (e = {});
  var o = e, n = o.placement, r = o.boundary, i = o.rootBoundary, l = o.padding, a = o.flipVariations, s = o.allowedAutoPlacements, p = s === void 0 ? qn : s, d = lt(n), A = d ? a ? rn : rn.filter(function(u) {
    return lt(u) === d;
  }) : Ht, b = A.filter(function(u) {
    return p.indexOf(u) >= 0;
  });
  b.length === 0 && (b = A);
  var f = b.reduce(function(u, c) {
    return u[c] = Lo(t, {
      placement: c,
      boundary: r,
      rootBoundary: i,
      padding: l
    })[De(c)], u;
  }, {});
  return Object.keys(f).sort(function(u, c) {
    return f[u] - f[c];
  });
}
function Ki(t) {
  if (De(t) === Mo)
    return [];
  var e = zt(t);
  return [cn(t), e, cn(e)];
}
function _i(t) {
  var e = t.state, o = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var r = o.mainAxis, i = r === void 0 ? !0 : r, l = o.altAxis, a = l === void 0 ? !0 : l, s = o.fallbackPlacements, p = o.padding, d = o.boundary, A = o.rootBoundary, b = o.altBoundary, f = o.flipVariations, u = f === void 0 ? !0 : f, c = o.allowedAutoPlacements, m = e.options.placement, x = De(m), w = x === m, O = s || (w || !u ? [zt(m)] : Ki(m)), v = [m].concat(O).reduce(function(K, G) {
      return K.concat(De(G) === Mo ? Yi(e, {
        placement: G,
        boundary: d,
        rootBoundary: A,
        padding: p,
        flipVariations: u,
        allowedAutoPlacements: c
      }) : G);
    }, []), E = e.rects.reference, C = e.rects.popper, g = /* @__PURE__ */ new Map(), k = !0, B = v[0], M = 0; M < v.length; M++) {
      var j = v[M], I = De(j), D = lt(j) === it, J = [fe, xe].indexOf(I) >= 0, U = J ? "width" : "height", L = Lo(e, {
        placement: j,
        boundary: d,
        rootBoundary: A,
        altBoundary: b,
        padding: p
      }), Z = J ? D ? we : ve : D ? xe : fe;
      E[U] > C[U] && (Z = zt(Z));
      var q = zt(Z), W = [];
      if (i && W.push(L[I] <= 0), a && W.push(L[Z] <= 0, L[q] <= 0), W.every(function(K) {
        return K;
      })) {
        B = j, k = !1;
        break;
      }
      g.set(j, W);
    }
    if (k)
      for (var R = u ? 3 : 1, z = function(K) {
        var G = v.find(function(ge) {
          var ae = g.get(ge);
          if (ae)
            return ae.slice(0, K).every(function(oe) {
              return oe;
            });
        });
        if (G)
          return B = G, "break";
      }, ee = R; ee > 0; ee--) {
        var re = z(ee);
        if (re === "break") break;
      }
    e.placement !== B && (e.modifiersData[n]._skip = !0, e.placement = B, e.reset = !0);
  }
}
var $i = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: _i,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function el(t, e, o) {
  var n = De(t), r = [ve, fe].indexOf(n) >= 0 ? -1 : 1, i = typeof o == "function" ? o(Object.assign({}, e, {
    placement: t
  })) : o, l = i[0], a = i[1];
  return l = l || 0, a = (a || 0) * r, [ve, we].indexOf(n) >= 0 ? {
    x: a,
    y: l
  } : {
    x: l,
    y: a
  };
}
function tl(t) {
  var e = t.state, o = t.options, n = t.name, r = o.offset, i = r === void 0 ? [0, 0] : r, l = qn.reduce(function(d, A) {
    return d[A] = el(A, e.rects, i), d;
  }, {}), a = l[e.placement], s = a.x, p = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += s, e.modifiersData.popperOffsets.y += p), e.modifiersData[n] = l;
}
var ol = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: tl
}, nl = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Mn(typeof t != "number" ? t : In(t, Ht));
};
function rl(t) {
  var e, o = t.state, n = t.name, r = t.options, i = o.elements.arrow, l = o.modifiersData.popperOffsets, a = De(o.placement), s = Io(a), p = [ve, we].indexOf(a) >= 0, d = p ? "height" : "width";
  if (!(!i || !l)) {
    var A = nl(r.padding, o), b = Ho(i), f = s === "y" ? fe : ve, u = s === "y" ? xe : we, c = o.rects.reference[d] + o.rects.reference[s] - l[s] - o.rects.popper[d], m = l[s] - o.rects.reference[s], x = Xt(i), w = x ? s === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, O = c / 2 - m / 2, v = A[f], E = w - b[d] - A[u], C = w / 2 - b[d] / 2 + O, g = Zt(v, C, E), k = s;
    o.modifiersData[n] = (e = {}, e[k] = g, e.centerOffset = g - C, e);
  }
}
function al(t) {
  var e = t.state, o = t.options, n = o.element, r = n === void 0 ? "[data-popper-arrow]" : n;
  r != null && (typeof r == "string" && (r = e.elements.popper.querySelector(r), !r) || Wn(e.elements.popper, r) && (e.elements.arrow = r));
}
var il = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: rl,
  effect: al,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
const ao = (t) => parseInt(t, 10);
function ll({
  arrowPadding: t,
  emit: e,
  locked: o,
  offsetDistance: n,
  offsetSkid: r,
  placement: i,
  popperNode: l,
  triggerNode: a
}) {
  const s = ko({
    isOpen: !1,
    popperInstance: null
  }), p = (c) => {
    var m;
    (m = s.popperInstance) === null || m === void 0 || m.setOptions((x) => ({
      ...x,
      modifiers: [...x.modifiers, {
        name: "eventListeners",
        enabled: c
      }]
    }));
  }, d = () => p(!0), A = () => p(!1), b = () => {
    s.isOpen && (s.isOpen = !1, e("close:popper"));
  }, f = () => {
    s.isOpen || (s.isOpen = !0, e("open:popper"));
  };
  ne([() => s.isOpen, i], async ([c]) => {
    c ? (await u(), d()) : A();
  });
  const u = async () => {
    await Co(), s.popperInstance = Fi(a.value, l.value, {
      placement: i.value,
      modifiers: [Ui, $i, {
        name: "flip",
        enabled: !o.value
      }, il, {
        name: "arrow",
        options: {
          padding: ao(t.value)
        }
      }, ol, {
        name: "offset",
        options: {
          offset: [ao(r.value), ao(n.value)]
        }
      }]
    }), s.popperInstance.update();
  };
  return He(() => {
    var c;
    (c = s.popperInstance) === null || c === void 0 || c.destroy();
  }), {
    ...Ze(s),
    open: f,
    close: b
  };
}
const sl = {
  id: "arrow",
  "data-popper-arrow": ""
};
function pl(t, e) {
  return y(), T("div", sl);
}
function Ln(t, e) {
  e === void 0 && (e = {});
  var o = e.insertAt;
  if (!(!t || typeof document > "u")) {
    var n = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
    r.type = "text/css", o === "top" && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t));
  }
}
var cl = `
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
Ln(cl);
const Vo = {};
Vo.render = pl;
Vo.__scopeId = "data-v-20b7fd4a";
var dl = Vo;
const ul = ["onKeyup"];
var Vn = {
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
    dt((q) => ({
      c81fc0a4: t.zIndex
    }));
    const n = Rt(), r = F(null), i = F(null), l = F(null), a = F(!1);
    se(() => {
      const q = n.default();
      if (q && q.length > 1)
        return console.error(`[Popper]: The <Popper> component expects only one child element at its root. You passed ${q.length} child nodes.`);
    });
    const {
      arrowPadding: s,
      closeDelay: p,
      content: d,
      disableClickAway: A,
      disabled: b,
      interactive: f,
      locked: u,
      offsetDistance: c,
      offsetSkid: m,
      openDelay: x,
      placement: w,
      show: O
    } = Ze(o), {
      isOpen: v,
      open: E,
      close: C
    } = ll({
      arrowPadding: s,
      emit: e,
      locked: u,
      offsetDistance: c,
      offsetSkid: m,
      placement: w,
      popperNode: i,
      triggerNode: l
    }), {
      hasContent: g
    } = ni(n, i, d), k = S(() => O.value !== null), B = S(() => b.value || !g.value), M = S(() => v.value && !B.value), j = S(() => !A.value && !k.value), I = S(() => f.value ? `border: ${c.value}px solid transparent; margin: -${c.value}px;` : null), D = ro.debounce(E, x.value), J = ro.debounce(C, p.value), U = async () => {
      B.value || k.value || (J.clear(), D());
    }, L = async () => {
      k.value || (D.clear(), J());
    }, Z = () => {
      v.value ? L() : U();
    };
    return ne([g, b], ([q, W]) => {
      v.value && (!q || W) && C();
    }), ne(v, (q) => {
      q ? a.value = !0 : ro.debounce(() => {
        a.value = !1;
      }, 200);
    }), _e(() => {
      k.value && (O.value ? D() : J());
    }), _e(() => {
      j.value && oi(r, L);
    }), (q, W) => (y(), T("div", {
      class: "inline-block",
      style: et(P(I)),
      onMouseleave: W[2] || (W[2] = (R) => t.hover && L()),
      ref: (R, z) => {
        z.popperContainerNode = R, r.value = R;
      }
    }, [h("div", {
      ref: (R, z) => {
        z.triggerNode = R, l.value = R;
      },
      onMouseover: W[0] || (W[0] = (R) => t.hover && U()),
      onClick: Z,
      onFocus: U,
      onKeyup: Ao(L, ["esc"])
    }, [V(q.$slots, "default")], 40, ul), te(wo, {
      name: "fade"
    }, {
      default: H(() => [le(h("div", {
        onClick: W[1] || (W[1] = (R) => !P(f) && L()),
        class: "popper",
        ref: (R, z) => {
          z.popperNode = R, i.value = R;
        }
      }, [V(q.$slots, "content", {
        close: P(C),
        isOpen: a.value
      }, () => [X(N(P(d)), 1)]), t.arrow ? (y(), Q(dl, {
        key: 0
      })) : _("", !0)], 512), [[xo, P(M)]])]),
      _: 3
    })], 36));
  }
}, fl = `
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
Ln(fl);
Vn.__scopeId = "data-v-5784ed69";
var vl = /* @__PURE__ */ (() => {
  const t = Vn;
  return t.install = (e) => {
    e.component("Popper", t);
  }, t;
})();
const ml = /* @__PURE__ */ Y({
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
    return dt((e) => ({
      e99d4766: e.zIndex
    })), (e, o) => (y(), Q(P(vl), {
      class: "m-tooltip",
      arrow: !0,
      "z-index": e.zIndex,
      placement: e.placement,
      hover: e.hover,
      show: e.show
    }, {
      content: H((n) => [
        h("div", {
          class: "m-tooltip__content",
          style: et({
            maxHeight: e.maxHeight
          })
        }, [
          V(e.$slots, "content", Tt(jt(n)))
        ], 4)
      ]),
      default: H(() => [
        V(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["z-index", "placement", "hover", "show"]));
  }
}), hl = { class: "flex justify-center mt-3" }, bl = /* @__PURE__ */ Y({
  __name: "RCouponApplierModalApplicationPromotionPanel",
  emits: ["openAppleAppStoreClick", "openGooglePlayStoreClick"],
  setup(t, { emit: e }) {
    const o = e, n = () => {
      o("openAppleAppStoreClick");
    }, r = () => {
      o("openGooglePlayStoreClick");
    };
    return (i, l) => (y(), Q(P($e), {
      emoji: "👌",
      title: `Avez-vous testé
l’application Poulpeo ?`,
      subtitle: `Vous aussi, faites l’essai !
Nouveau membre ? +3€ offerts.`
    }, {
      default: H(() => [
        l[5] || (l[5] = h("img", {
          width: "235",
          height: "174",
          src: Qa,
          alt: "",
          class: "mt-2 mb-3.25"
        }, null, -1)),
        h("div", null, [
          te(P(ml), { style: {
            "--popper-theme-background-color": "#fff",
            "--popper-theme-background-color-hover": "#fff"
          } }, {
            content: H(() => l[0] || (l[0] = [
              h("figure", { class: "flex flex-col items-center" }, [
                h("img", {
                  width: "121",
                  height: "119",
                  src: Ua,
                  alt: "https://www.poulpeo.com/"
                }),
                h("figcaption", { class: "italic" }, [
                  X(" Scannez le QR Code"),
                  h("br"),
                  X(" pour télécharger l’application ")
                ])
              ], -1)
            ])),
            default: H(() => [
              l[1] || (l[1] = h("img", {
                width: `
        30`,
                height: "30",
                src: Ja,
                alt: "Afficher le QR Code"
              }, null, -1))
            ]),
            _: 1
          }),
          h("button", {
            type: "button",
            role: "link",
            class: "[ m-couponApplierModalApplicationPromotionPanel__storeButtons ] w-32 h-10 ml-3.25 mr-2.25 p-0 rounded",
            onClick: n
          }, l[2] || (l[2] = [
            h("img", {
              src: Za,
              alt: "Disponible sur l'App Store",
              height: "40",
              width: "128"
            }, null, -1)
          ])),
          h("button", {
            type: "button",
            role: "link",
            class: "[ m-couponApplierModalApplicationPromotionPanel__storeButtons ] w-32 p-0 rounded",
            onClick: r
          }, l[3] || (l[3] = [
            h("img", {
              src: za,
              alt: "Disponible sur Google Play",
              height: "40",
              width: "128"
            }, null, -1)
          ]))
        ]),
        h("div", hl, [
          l[4] || (l[4] = h("h4", { class: "[ m-couponApplierModalApplicationPromotionPanel__ratingStars ] m-0 mt-0.25 mr-1.25 font-bold" }, " 4,8 ", -1)),
          te(P(ei), {
            rating: 4.8,
            "max-rating": 5
          })
        ])
      ]),
      _: 1
    }));
  }
});
function mo(t, e, o) {
  var n, r, i, l, a;
  e == null && (e = 100);
  function s() {
    var d = Date.now() - l;
    d < e && d >= 0 ? n = setTimeout(s, e - d) : (n = null, o || (a = t.apply(i, r), i = r = null));
  }
  var p = function() {
    i = this, r = arguments, l = Date.now();
    var d = o && !n;
    return n || (n = setTimeout(s, e)), d && (a = t.apply(i, r), i = r = null), a;
  };
  return p.clear = function() {
    n && (clearTimeout(n), n = null);
  }, p.flush = function() {
    n && (a = t.apply(i, r), i = r = null, clearTimeout(n), n = null);
  }, p;
}
mo.debounce = mo;
var io = mo;
function gl(t, e, o) {
  Oo(t) ? ne(t, (n, r) => {
    r == null || r.removeEventListener(e, o), n == null || n.addEventListener(e, o);
  }) : se(() => {
    t.addEventListener(e, o);
  }), He(() => {
    var n;
    (n = P(t)) === null || n === void 0 || n.removeEventListener(e, o);
  });
}
function yl(t, e) {
  return typeof window > "u" || !window ? void 0 : gl(window, "pointerdown", (o) => {
    const n = P(t);
    n && (n === o.target || o.composedPath().includes(n) || e(o));
  });
}
function Al(t, e, o) {
  let n = null;
  const r = F(!1);
  se(() => {
    (t.content !== void 0 || o.value) && (r.value = !0), n = new MutationObserver(i), n.observe(e.value, {
      childList: !0,
      subtree: !0
    });
  }), He(() => n.disconnect()), ne(o, (l) => {
    l ? r.value = !0 : r.value = !1;
  });
  const i = () => {
    t.content ? r.value = !0 : r.value = !1;
  };
  return {
    hasContent: r
  };
}
function st(t, e) {
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
function Be(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Go(t) {
  var e = Be(t), o = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: n
  };
}
function Bt(t) {
  var e = Be(t).Element;
  return t instanceof e || t instanceof Element;
}
function me(t) {
  var e = Be(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Gn(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Be(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function xl(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function wl(t) {
  return t === Be(t) || !me(t) ? Go(t) : xl(t);
}
function Re(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Ke(t) {
  return ((Bt(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function No(t) {
  return st(Ke(t)).left + Go(t).scrollLeft;
}
function Xe(t) {
  return Be(t).getComputedStyle(t);
}
function Fo(t) {
  var e = Xe(t), o = e.overflow, n = e.overflowX, r = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + r + n);
}
function kl(t) {
  var e = t.getBoundingClientRect(), o = e.width / t.offsetWidth || 1, n = e.height / t.offsetHeight || 1;
  return o !== 1 || n !== 1;
}
function Cl(t, e, o) {
  o === void 0 && (o = !1);
  var n = me(e);
  me(e) && kl(e);
  var r = Ke(e), i = st(t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !o) && ((Re(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Fo(r)) && (l = wl(e)), me(e) ? (a = st(e), a.x += e.clientLeft, a.y += e.clientTop) : r && (a.x = No(r))), {
    x: i.left + l.scrollLeft - a.x,
    y: i.top + l.scrollTop - a.y,
    width: i.width,
    height: i.height
  };
}
function Qo(t) {
  var e = st(t), o = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - o) <= 1 && (o = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: o,
    height: n
  };
}
function to(t) {
  return Re(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Gn(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Ke(t)
  );
}
function Nn(t) {
  return ["html", "body", "#document"].indexOf(Re(t)) >= 0 ? t.ownerDocument.body : me(t) && Fo(t) ? t : Nn(to(t));
}
function At(t, e) {
  var o;
  e === void 0 && (e = []);
  var n = Nn(t), r = n === ((o = t.ownerDocument) == null ? void 0 : o.body), i = Be(n), l = r ? [i].concat(i.visualViewport || [], Fo(n) ? n : []) : n, a = e.concat(l);
  return r ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(At(to(l)))
  );
}
function Ol(t) {
  return ["table", "td", "th"].indexOf(Re(t)) >= 0;
}
function dn(t) {
  return !me(t) || // https://github.com/popperjs/popper-core/issues/837
  Xe(t).position === "fixed" ? null : t.offsetParent;
}
function El(t) {
  var e = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, o = navigator.userAgent.indexOf("Trident") !== -1;
  if (o && me(t)) {
    var n = Xe(t);
    if (n.position === "fixed")
      return null;
  }
  for (var r = to(t); me(r) && ["html", "body"].indexOf(Re(r)) < 0; ) {
    var i = Xe(r);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
      return r;
    r = r.parentNode;
  }
  return null;
}
function Mt(t) {
  for (var e = Be(t), o = dn(t); o && Ol(o) && Xe(o).position === "static"; )
    o = dn(o);
  return o && (Re(o) === "html" || Re(o) === "body" && Xe(o).position === "static") ? e : o || El(t) || e;
}
var he = "top", ke = "bottom", Ce = "right", be = "left", Jo = "auto", It = [he, ke, Ce, be], pt = "start", Pt = "end", Bl = "clippingParents", Fn = "viewport", bt = "popper", Pl = "reference", un = /* @__PURE__ */ It.reduce(function(t, e) {
  return t.concat([e + "-" + pt, e + "-" + Pt]);
}, []), Qn = /* @__PURE__ */ [].concat(It, [Jo]).reduce(function(t, e) {
  return t.concat([e, e + "-" + pt, e + "-" + Pt]);
}, []), Dl = "beforeRead", Tl = "read", jl = "afterRead", Sl = "beforeMain", Rl = "main", ql = "afterMain", Wl = "beforeWrite", Xl = "write", Hl = "afterWrite", Ml = [Dl, Tl, jl, Sl, Rl, ql, Wl, Xl, Hl];
function Il(t) {
  var e = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(i) {
    e.set(i.name, i);
  });
  function r(i) {
    o.add(i.name);
    var l = [].concat(i.requires || [], i.requiresIfExists || []);
    l.forEach(function(a) {
      if (!o.has(a)) {
        var s = e.get(a);
        s && r(s);
      }
    }), n.push(i);
  }
  return t.forEach(function(i) {
    o.has(i.name) || r(i);
  }), n;
}
function Ll(t) {
  var e = Il(t);
  return Ml.reduce(function(o, n) {
    return o.concat(e.filter(function(r) {
      return r.phase === n;
    }));
  }, []);
}
function Vl(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(o) {
      Promise.resolve().then(function() {
        e = void 0, o(t());
      });
    })), e;
  };
}
function Te(t) {
  return t.split("-")[0];
}
function Gl(t) {
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
function Nl(t) {
  var e = Be(t), o = Ke(t), n = e.visualViewport, r = o.clientWidth, i = o.clientHeight, l = 0, a = 0;
  return n && (r = n.width, i = n.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = n.offsetLeft, a = n.offsetTop)), {
    width: r,
    height: i,
    x: l + No(t),
    y: a
  };
}
var Ue = Math.max, Dt = Math.min, Ft = Math.round;
function Fl(t) {
  var e, o = Ke(t), n = Go(t), r = (e = t.ownerDocument) == null ? void 0 : e.body, i = Ue(o.scrollWidth, o.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), l = Ue(o.scrollHeight, o.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), a = -n.scrollLeft + No(t), s = -n.scrollTop;
  return Xe(r || o).direction === "rtl" && (a += Ue(o.clientWidth, r ? r.clientWidth : 0) - i), {
    width: i,
    height: l,
    x: a,
    y: s
  };
}
function Jn(t, e) {
  var o = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (o && Gn(o)) {
    var n = e;
    do {
      if (n && t.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function ho(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Ql(t) {
  var e = st(t);
  return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
}
function fn(t, e) {
  return e === Fn ? ho(Nl(t)) : me(e) ? Ql(e) : ho(Fl(Ke(t)));
}
function Jl(t) {
  var e = At(to(t)), o = ["absolute", "fixed"].indexOf(Xe(t).position) >= 0, n = o && me(t) ? Mt(t) : t;
  return Bt(n) ? e.filter(function(r) {
    return Bt(r) && Jn(r, n) && Re(r) !== "body";
  }) : [];
}
function Ul(t, e, o) {
  var n = e === "clippingParents" ? Jl(t) : [].concat(e), r = [].concat(n, [o]), i = r[0], l = r.reduce(function(a, s) {
    var p = fn(t, s);
    return a.top = Ue(p.top, a.top), a.right = Dt(p.right, a.right), a.bottom = Dt(p.bottom, a.bottom), a.left = Ue(p.left, a.left), a;
  }, fn(t, i));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function ct(t) {
  return t.split("-")[1];
}
function Uo(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function Un(t) {
  var e = t.reference, o = t.element, n = t.placement, r = n ? Te(n) : null, i = n ? ct(n) : null, l = e.x + e.width / 2 - o.width / 2, a = e.y + e.height / 2 - o.height / 2, s;
  switch (r) {
    case he:
      s = {
        x: l,
        y: e.y - o.height
      };
      break;
    case ke:
      s = {
        x: l,
        y: e.y + e.height
      };
      break;
    case Ce:
      s = {
        x: e.x + e.width,
        y: a
      };
      break;
    case be:
      s = {
        x: e.x - o.width,
        y: a
      };
      break;
    default:
      s = {
        x: e.x,
        y: e.y
      };
  }
  var p = r ? Uo(r) : null;
  if (p != null) {
    var d = p === "y" ? "height" : "width";
    switch (i) {
      case pt:
        s[p] = s[p] - (e[d] / 2 - o[d] / 2);
        break;
      case Pt:
        s[p] = s[p] + (e[d] / 2 - o[d] / 2);
        break;
    }
  }
  return s;
}
function Zn() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function zn(t) {
  return Object.assign({}, Zn(), t);
}
function Yn(t, e) {
  return e.reduce(function(o, n) {
    return o[n] = t, o;
  }, {});
}
function Zo(t, e) {
  e === void 0 && (e = {});
  var o = e, n = o.placement, r = n === void 0 ? t.placement : n, i = o.boundary, l = i === void 0 ? Bl : i, a = o.rootBoundary, s = a === void 0 ? Fn : a, p = o.elementContext, d = p === void 0 ? bt : p, A = o.altBoundary, b = A === void 0 ? !1 : A, f = o.padding, u = f === void 0 ? 0 : f, c = zn(typeof u != "number" ? u : Yn(u, It)), m = d === bt ? Pl : bt, x = t.rects.popper, w = t.elements[b ? m : d], O = Ul(Bt(w) ? w : w.contextElement || Ke(t.elements.popper), l, s), v = st(t.elements.reference), E = Un({
    reference: v,
    element: x,
    strategy: "absolute",
    placement: r
  }), C = ho(Object.assign({}, x, E)), g = d === bt ? C : v, k = {
    top: O.top - g.top + c.top,
    bottom: g.bottom - O.bottom + c.bottom,
    left: O.left - g.left + c.left,
    right: g.right - O.right + c.right
  }, B = t.modifiersData.offset;
  if (d === bt && B) {
    var M = B[r];
    Object.keys(k).forEach(function(j) {
      var I = [Ce, ke].indexOf(j) >= 0 ? 1 : -1, D = [he, ke].indexOf(j) >= 0 ? "y" : "x";
      k[j] += M[D] * I;
    });
  }
  return k;
}
var vn = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function mn() {
  for (var t = arguments.length, e = new Array(t), o = 0; o < t; o++)
    e[o] = arguments[o];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Zl(t) {
  t === void 0 && (t = {});
  var e = t, o = e.defaultModifiers, n = o === void 0 ? [] : o, r = e.defaultOptions, i = r === void 0 ? vn : r;
  return function(l, a, s) {
    s === void 0 && (s = i);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, vn, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, d = [], A = !1, b = {
      state: p,
      setOptions: function(c) {
        var m = typeof c == "function" ? c(p.options) : c;
        u(), p.options = Object.assign({}, i, p.options, m), p.scrollParents = {
          reference: Bt(l) ? At(l) : l.contextElement ? At(l.contextElement) : [],
          popper: At(a)
        };
        var x = Ll(Gl([].concat(n, p.options.modifiers)));
        return p.orderedModifiers = x.filter(function(w) {
          return w.enabled;
        }), f(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!A) {
          var c = p.elements, m = c.reference, x = c.popper;
          if (mn(m, x)) {
            p.rects = {
              reference: Cl(m, Mt(x), p.options.strategy === "fixed"),
              popper: Qo(x)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(k) {
              return p.modifiersData[k.name] = Object.assign({}, k.data);
            });
            for (var w = 0; w < p.orderedModifiers.length; w++) {
              if (p.reset === !0) {
                p.reset = !1, w = -1;
                continue;
              }
              var O = p.orderedModifiers[w], v = O.fn, E = O.options, C = E === void 0 ? {} : E, g = O.name;
              typeof v == "function" && (p = v({
                state: p,
                options: C,
                name: g,
                instance: b
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Vl(function() {
        return new Promise(function(c) {
          b.forceUpdate(), c(p);
        });
      }),
      destroy: function() {
        u(), A = !0;
      }
    };
    if (!mn(l, a))
      return b;
    b.setOptions(s).then(function(c) {
      !A && s.onFirstUpdate && s.onFirstUpdate(c);
    });
    function f() {
      p.orderedModifiers.forEach(function(c) {
        var m = c.name, x = c.options, w = x === void 0 ? {} : x, O = c.effect;
        if (typeof O == "function") {
          var v = O({
            state: p,
            name: m,
            instance: b,
            options: w
          }), E = function() {
          };
          d.push(v || E);
        }
      });
    }
    function u() {
      d.forEach(function(c) {
        return c();
      }), d = [];
    }
    return b;
  };
}
var Qt = {
  passive: !0
};
function zl(t) {
  var e = t.state, o = t.instance, n = t.options, r = n.scroll, i = r === void 0 ? !0 : r, l = n.resize, a = l === void 0 ? !0 : l, s = Be(e.elements.popper), p = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && p.forEach(function(d) {
    d.addEventListener("scroll", o.update, Qt);
  }), a && s.addEventListener("resize", o.update, Qt), function() {
    i && p.forEach(function(d) {
      d.removeEventListener("scroll", o.update, Qt);
    }), a && s.removeEventListener("resize", o.update, Qt);
  };
}
var Yl = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: zl,
  data: {}
};
function Kl(t) {
  var e = t.state, o = t.name;
  e.modifiersData[o] = Un({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
var _l = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Kl,
  data: {}
}, $l = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function es(t) {
  var e = t.x, o = t.y, n = window, r = n.devicePixelRatio || 1;
  return {
    x: Ft(Ft(e * r) / r) || 0,
    y: Ft(Ft(o * r) / r) || 0
  };
}
function hn(t) {
  var e, o = t.popper, n = t.popperRect, r = t.placement, i = t.variation, l = t.offsets, a = t.position, s = t.gpuAcceleration, p = t.adaptive, d = t.roundOffsets, A = d === !0 ? es(l) : typeof d == "function" ? d(l) : l, b = A.x, f = b === void 0 ? 0 : b, u = A.y, c = u === void 0 ? 0 : u, m = l.hasOwnProperty("x"), x = l.hasOwnProperty("y"), w = be, O = he, v = window;
  if (p) {
    var E = Mt(o), C = "clientHeight", g = "clientWidth";
    E === Be(o) && (E = Ke(o), Xe(E).position !== "static" && a === "absolute" && (C = "scrollHeight", g = "scrollWidth")), E = E, (r === he || (r === be || r === Ce) && i === Pt) && (O = ke, c -= E[C] - n.height, c *= s ? 1 : -1), (r === be || (r === he || r === ke) && i === Pt) && (w = Ce, f -= E[g] - n.width, f *= s ? 1 : -1);
  }
  var k = Object.assign({
    position: a
  }, p && $l);
  if (s) {
    var B;
    return Object.assign({}, k, (B = {}, B[O] = x ? "0" : "", B[w] = m ? "0" : "", B.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + c + "px)" : "translate3d(" + f + "px, " + c + "px, 0)", B));
  }
  return Object.assign({}, k, (e = {}, e[O] = x ? c + "px" : "", e[w] = m ? f + "px" : "", e.transform = "", e));
}
function ts(t) {
  var e = t.state, o = t.options, n = o.gpuAcceleration, r = n === void 0 ? !0 : n, i = o.adaptive, l = i === void 0 ? !0 : i, a = o.roundOffsets, s = a === void 0 ? !0 : a, p = {
    placement: Te(e.placement),
    variation: ct(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: r
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, hn(Object.assign({}, p, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: l,
    roundOffsets: s
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, hn(Object.assign({}, p, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
var os = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ts,
  data: {}
};
function ns(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(o) {
    var n = e.styles[o] || {}, r = e.attributes[o] || {}, i = e.elements[o];
    !me(i) || !Re(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(l) {
      var a = r[l];
      a === !1 ? i.removeAttribute(l) : i.setAttribute(l, a === !0 ? "" : a);
    }));
  });
}
function rs(t) {
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
      var r = e.elements[n], i = e.attributes[n] || {}, l = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : o[n]), a = l.reduce(function(s, p) {
        return s[p] = "", s;
      }, {});
      !me(r) || !Re(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(s) {
        r.removeAttribute(s);
      }));
    });
  };
}
var as = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: ns,
  effect: rs,
  requires: ["computeStyles"]
}, is = [Yl, _l, os, as], ls = /* @__PURE__ */ Zl({
  defaultModifiers: is
});
function ss(t) {
  return t === "x" ? "y" : "x";
}
function Yt(t, e, o) {
  return Ue(t, Dt(e, o));
}
function ps(t) {
  var e = t.state, o = t.options, n = t.name, r = o.mainAxis, i = r === void 0 ? !0 : r, l = o.altAxis, a = l === void 0 ? !1 : l, s = o.boundary, p = o.rootBoundary, d = o.altBoundary, A = o.padding, b = o.tether, f = b === void 0 ? !0 : b, u = o.tetherOffset, c = u === void 0 ? 0 : u, m = Zo(e, {
    boundary: s,
    rootBoundary: p,
    padding: A,
    altBoundary: d
  }), x = Te(e.placement), w = ct(e.placement), O = !w, v = Uo(x), E = ss(v), C = e.modifiersData.popperOffsets, g = e.rects.reference, k = e.rects.popper, B = typeof c == "function" ? c(Object.assign({}, e.rects, {
    placement: e.placement
  })) : c, M = {
    x: 0,
    y: 0
  };
  if (C) {
    if (i || a) {
      var j = v === "y" ? he : be, I = v === "y" ? ke : Ce, D = v === "y" ? "height" : "width", J = C[v], U = C[v] + m[j], L = C[v] - m[I], Z = f ? -k[D] / 2 : 0, q = w === pt ? g[D] : k[D], W = w === pt ? -k[D] : -g[D], R = e.elements.arrow, z = f && R ? Qo(R) : {
        width: 0,
        height: 0
      }, ee = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Zn(), re = ee[j], K = ee[I], G = Yt(0, g[D], z[D]), ge = O ? g[D] / 2 - Z - G - re - B : q - G - re - B, ae = O ? -g[D] / 2 + Z + G + K + B : W + G + K + B, oe = e.elements.arrow && Mt(e.elements.arrow), ut = oe ? v === "y" ? oe.clientTop || 0 : oe.clientLeft || 0 : 0, Me = e.modifiersData.offset ? e.modifiersData.offset[e.placement][v] : 0, Ie = C[v] + ge - Me - ut, Le = C[v] + ae - Me;
      if (i) {
        var Ve = Yt(f ? Dt(U, Ie) : U, J, f ? Ue(L, Le) : L);
        C[v] = Ve, M[v] = Ve - J;
      }
      if (a) {
        var ft = v === "x" ? he : be, vt = v === "x" ? ke : Ce, ie = C[E], Ge = ie + m[ft], Ne = ie - m[vt], Fe = Yt(f ? Dt(Ge, Ie) : Ge, ie, f ? Ue(Ne, Le) : Ne);
        C[E] = Fe, M[E] = Fe - ie;
      }
    }
    e.modifiersData[n] = M;
  }
}
var cs = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: ps,
  requiresIfExists: ["offset"]
}, ds = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Kt(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return ds[e];
  });
}
var us = {
  start: "end",
  end: "start"
};
function bn(t) {
  return t.replace(/start|end/g, function(e) {
    return us[e];
  });
}
function fs(t, e) {
  e === void 0 && (e = {});
  var o = e, n = o.placement, r = o.boundary, i = o.rootBoundary, l = o.padding, a = o.flipVariations, s = o.allowedAutoPlacements, p = s === void 0 ? Qn : s, d = ct(n), A = d ? a ? un : un.filter(function(u) {
    return ct(u) === d;
  }) : It, b = A.filter(function(u) {
    return p.indexOf(u) >= 0;
  });
  b.length === 0 && (b = A);
  var f = b.reduce(function(u, c) {
    return u[c] = Zo(t, {
      placement: c,
      boundary: r,
      rootBoundary: i,
      padding: l
    })[Te(c)], u;
  }, {});
  return Object.keys(f).sort(function(u, c) {
    return f[u] - f[c];
  });
}
function vs(t) {
  if (Te(t) === Jo)
    return [];
  var e = Kt(t);
  return [bn(t), e, bn(e)];
}
function ms(t) {
  var e = t.state, o = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var r = o.mainAxis, i = r === void 0 ? !0 : r, l = o.altAxis, a = l === void 0 ? !0 : l, s = o.fallbackPlacements, p = o.padding, d = o.boundary, A = o.rootBoundary, b = o.altBoundary, f = o.flipVariations, u = f === void 0 ? !0 : f, c = o.allowedAutoPlacements, m = e.options.placement, x = Te(m), w = x === m, O = s || (w || !u ? [Kt(m)] : vs(m)), v = [m].concat(O).reduce(function(K, G) {
      return K.concat(Te(G) === Jo ? fs(e, {
        placement: G,
        boundary: d,
        rootBoundary: A,
        padding: p,
        flipVariations: u,
        allowedAutoPlacements: c
      }) : G);
    }, []), E = e.rects.reference, C = e.rects.popper, g = /* @__PURE__ */ new Map(), k = !0, B = v[0], M = 0; M < v.length; M++) {
      var j = v[M], I = Te(j), D = ct(j) === pt, J = [he, ke].indexOf(I) >= 0, U = J ? "width" : "height", L = Zo(e, {
        placement: j,
        boundary: d,
        rootBoundary: A,
        altBoundary: b,
        padding: p
      }), Z = J ? D ? Ce : be : D ? ke : he;
      E[U] > C[U] && (Z = Kt(Z));
      var q = Kt(Z), W = [];
      if (i && W.push(L[I] <= 0), a && W.push(L[Z] <= 0, L[q] <= 0), W.every(function(K) {
        return K;
      })) {
        B = j, k = !1;
        break;
      }
      g.set(j, W);
    }
    if (k)
      for (var R = u ? 3 : 1, z = function(K) {
        var G = v.find(function(ge) {
          var ae = g.get(ge);
          if (ae)
            return ae.slice(0, K).every(function(oe) {
              return oe;
            });
        });
        if (G)
          return B = G, "break";
      }, ee = R; ee > 0; ee--) {
        var re = z(ee);
        if (re === "break") break;
      }
    e.placement !== B && (e.modifiersData[n]._skip = !0, e.placement = B, e.reset = !0);
  }
}
var hs = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: ms,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function bs(t, e, o) {
  var n = Te(t), r = [be, he].indexOf(n) >= 0 ? -1 : 1, i = typeof o == "function" ? o(Object.assign({}, e, {
    placement: t
  })) : o, l = i[0], a = i[1];
  return l = l || 0, a = (a || 0) * r, [be, Ce].indexOf(n) >= 0 ? {
    x: a,
    y: l
  } : {
    x: l,
    y: a
  };
}
function gs(t) {
  var e = t.state, o = t.options, n = t.name, r = o.offset, i = r === void 0 ? [0, 0] : r, l = Qn.reduce(function(d, A) {
    return d[A] = bs(A, e.rects, i), d;
  }, {}), a = l[e.placement], s = a.x, p = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += s, e.modifiersData.popperOffsets.y += p), e.modifiersData[n] = l;
}
var ys = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: gs
}, As = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, zn(typeof t != "number" ? t : Yn(t, It));
};
function xs(t) {
  var e, o = t.state, n = t.name, r = t.options, i = o.elements.arrow, l = o.modifiersData.popperOffsets, a = Te(o.placement), s = Uo(a), p = [be, Ce].indexOf(a) >= 0, d = p ? "height" : "width";
  if (!(!i || !l)) {
    var A = As(r.padding, o), b = Qo(i), f = s === "y" ? he : be, u = s === "y" ? ke : Ce, c = o.rects.reference[d] + o.rects.reference[s] - l[s] - o.rects.popper[d], m = l[s] - o.rects.reference[s], x = Mt(i), w = x ? s === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, O = c / 2 - m / 2, v = A[f], E = w - b[d] - A[u], C = w / 2 - b[d] / 2 + O, g = Yt(v, C, E), k = s;
    o.modifiersData[n] = (e = {}, e[k] = g, e.centerOffset = g - C, e);
  }
}
function ws(t) {
  var e = t.state, o = t.options, n = o.element, r = n === void 0 ? "[data-popper-arrow]" : n;
  r != null && (typeof r == "string" && (r = e.elements.popper.querySelector(r), !r) || Jn(e.elements.popper, r) && (e.elements.arrow = r));
}
var ks = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: xs,
  effect: ws,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
const lo = (t) => parseInt(t, 10);
function Cs({
  arrowPadding: t,
  emit: e,
  locked: o,
  offsetDistance: n,
  offsetSkid: r,
  placement: i,
  popperNode: l,
  triggerNode: a
}) {
  const s = ko({
    isOpen: !1,
    popperInstance: null
  }), p = (c) => {
    var m;
    (m = s.popperInstance) === null || m === void 0 || m.setOptions((x) => ({
      ...x,
      modifiers: [...x.modifiers, {
        name: "eventListeners",
        enabled: c
      }]
    }));
  }, d = () => p(!0), A = () => p(!1), b = () => {
    s.isOpen && (s.isOpen = !1, e("close:popper"));
  }, f = () => {
    s.isOpen || (s.isOpen = !0, e("open:popper"));
  };
  ne([() => s.isOpen, i], async ([c]) => {
    c ? (await u(), d()) : A();
  });
  const u = async () => {
    await Co(), s.popperInstance = ls(a.value, l.value, {
      placement: i.value,
      modifiers: [cs, hs, {
        name: "flip",
        enabled: !o.value
      }, ks, {
        name: "arrow",
        options: {
          padding: lo(t.value)
        }
      }, ys, {
        name: "offset",
        options: {
          offset: [lo(r.value), lo(n.value)]
        }
      }]
    }), s.popperInstance.update();
  };
  return He(() => {
    var c;
    (c = s.popperInstance) === null || c === void 0 || c.destroy();
  }), {
    ...Ze(s),
    open: f,
    close: b
  };
}
const Os = {
  id: "arrow",
  "data-popper-arrow": ""
};
function Es(t, e) {
  return y(), T("div", Os);
}
function Kn(t, e) {
  e === void 0 && (e = {});
  var o = e.insertAt;
  if (!(!t || typeof document > "u")) {
    var n = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
    r.type = "text/css", o === "top" && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t));
  }
}
var Bs = `
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
Kn(Bs);
const zo = {};
zo.render = Es;
zo.__scopeId = "data-v-20b7fd4a";
var Ps = zo;
const Ds = ["onKeyup"];
var _n = {
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
    dt((q) => ({
      c81fc0a4: t.zIndex
    }));
    const n = Rt(), r = F(null), i = F(null), l = F(null), a = F(!1);
    se(() => {
      const q = n.default();
      if (q && q.length > 1)
        return console.error(`[Popper]: The <Popper> component expects only one child element at its root. You passed ${q.length} child nodes.`);
    });
    const {
      arrowPadding: s,
      closeDelay: p,
      content: d,
      disableClickAway: A,
      disabled: b,
      interactive: f,
      locked: u,
      offsetDistance: c,
      offsetSkid: m,
      openDelay: x,
      placement: w,
      show: O
    } = Ze(o), {
      isOpen: v,
      open: E,
      close: C
    } = Cs({
      arrowPadding: s,
      emit: e,
      locked: u,
      offsetDistance: c,
      offsetSkid: m,
      placement: w,
      popperNode: i,
      triggerNode: l
    }), {
      hasContent: g
    } = Al(n, i, d), k = S(() => O.value !== null), B = S(() => b.value || !g.value), M = S(() => v.value && !B.value), j = S(() => !A.value && !k.value), I = S(() => f.value ? `border: ${c.value}px solid transparent; margin: -${c.value}px;` : null), D = io.debounce(E, x.value), J = io.debounce(C, p.value), U = async () => {
      B.value || k.value || (J.clear(), D());
    }, L = async () => {
      k.value || (D.clear(), J());
    }, Z = () => {
      v.value ? L() : U();
    };
    return ne([g, b], ([q, W]) => {
      v.value && (!q || W) && C();
    }), ne(v, (q) => {
      q ? a.value = !0 : io.debounce(() => {
        a.value = !1;
      }, 200);
    }), _e(() => {
      k.value && (O.value ? D() : J());
    }), _e(() => {
      j.value && yl(r, L);
    }), (q, W) => (y(), T("div", {
      class: "inline-block",
      style: et(P(I)),
      onMouseleave: W[2] || (W[2] = (R) => t.hover && L()),
      ref: (R, z) => {
        z.popperContainerNode = R, r.value = R;
      }
    }, [h("div", {
      ref: (R, z) => {
        z.triggerNode = R, l.value = R;
      },
      onMouseover: W[0] || (W[0] = (R) => t.hover && U()),
      onClick: Z,
      onFocus: U,
      onKeyup: Ao(L, ["esc"])
    }, [V(q.$slots, "default")], 40, Ds), te(wo, {
      name: "fade"
    }, {
      default: H(() => [le(h("div", {
        onClick: W[1] || (W[1] = (R) => !P(f) && L()),
        class: "popper",
        ref: (R, z) => {
          z.popperNode = R, i.value = R;
        }
      }, [V(q.$slots, "content", {
        close: P(C),
        isOpen: a.value
      }, () => [X(N(P(d)), 1)]), t.arrow ? (y(), Q(Ps, {
        key: 0
      })) : _("", !0)], 512), [[xo, P(M)]])]),
      _: 3
    })], 36));
  }
}, Ts = `
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
Kn(Ts);
_n.__scopeId = "data-v-5784ed69";
var js = /* @__PURE__ */ (() => {
  const t = _n;
  return t.install = (e) => {
    e.component("Popper", t);
  }, t;
})();
const Ss = /* @__PURE__ */ Y({
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
    return dt((e) => ({
      e99d4766: e.zIndex
    })), (e, o) => (y(), Q(P(js), {
      class: "m-tooltip",
      arrow: !0,
      "z-index": e.zIndex,
      placement: e.placement,
      hover: e.hover,
      show: e.show
    }, {
      content: H((n) => [
        h("div", {
          class: "m-tooltip__content",
          style: et({
            maxHeight: e.maxHeight
          })
        }, [
          V(e.$slots, "content", Tt(jt(n)))
        ], 4)
      ]),
      default: H(() => [
        V(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["z-index", "placement", "hover", "show"]));
  }
}), Rs = ["innerHTML"], $n = /* @__PURE__ */ Y({
  __name: "RCashbackConditions",
  props: {
    tooltipContents: {},
    maxHeight: { default: "80vh" }
  },
  setup(t) {
    const e = F("hidden"), o = F(), n = new IntersectionObserver(
      (i) => {
        for (const l of i)
          (!l.isIntersecting || l.intersectionRatio < 0.5) && (e.value = "hidden");
      },
      { threshold: 0.5 }
    ), r = () => {
      e.value = e.value === "visible" ? "hidden" : "visible";
    };
    return se(() => {
      o.value && n.observe(o.value);
    }), yn(() => {
      o.value && n.unobserve(o.value);
    }), (i, l) => (y(), T("div", {
      ref_key: "el",
      ref: o
    }, [
      te(P(Ss), {
        placement: "left",
        class: "w-full text-center",
        "max-height": i.maxHeight,
        hover: !1,
        show: e.value === "visible"
      }, {
        content: H(() => [
          h("div", {
            class: "max-w-93.75",
            innerHTML: i.tooltipContents
          }, null, 8, Rs)
        ]),
        default: H(() => [
          h("p", {
            class: "mb-0 uppercase text-xs font-medium cursor-pointer -colorGrey",
            onClick: r
          }, l[0] || (l[0] = [
            X(" Voir les conditions "),
            h("i", { class: "fa-solid fa-circle-info" }, null, -1)
          ]))
        ]),
        _: 1
      }, 8, ["max-height", "show"])
    ], 512));
  }
}), qs = /* @__PURE__ */ Y({
  __name: "RCouponApplierModalCashbackActivationConfirmationPanel",
  props: {
    appliedCouponCount: { default: 0 },
    cashback: {}
  },
  setup(t) {
    const e = t, o = S(() => e.appliedCouponCount > 0 ? "🥳" : "🤑"), n = S(
      () => e.appliedCouponCount > 0 ? `Cashback activé !
Cumulez les réductions` : `En attendant...
C’est Poulpeo qui régale ;)`
    ), r = S(() => {
      const i = e.cashback.isVariable ? `Jusqu’à ${e.cashback.shortCashbackText}` : e.cashback.shortCashbackText;
      return e.appliedCouponCount < 1 ? `Cashback activé !
${i} sur votre commande` : e.appliedCouponCount > 1 ? `${i} de cashback en plus de l’avantage des codes promo` : `${i} de cashback en plus de l’avantage du code promo`;
    });
    return (i, l) => (y(), Q(P($e), Tt(jt({ emoji: o.value, title: n.value, subtitle: r.value })), {
      default: H(() => [
        te(P($n), {
          "tooltip-contents": i.cashback.htmlConditions,
          class: "mt-2 w-full",
          "max-height": "400px"
        }, null, 8, ["tooltip-contents"])
      ]),
      _: 1
    }, 16));
  }
}), Ws = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAMAAACP+FljAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACLlBMVEUAAAD/gADrRDTpQzXrQzXqQzXqQzXqQzXqQzXqQzXrQzTtQDfoRi7qQzTrQzbqQzbsQjbrQzXqQzXpRDXrRDbpQzXqQjTtSTfqQjXqQzXrOzvbSSTqQzXrQTTqQzXqQzXpQzXqQjXqQzXqQzXsRjPpQjbqQzXqQzTqQDLqQzXtQzffQEDqQzXoRDfqQzXoRjT6sArtUjDrRDX/AAD//wD7vAX7uwXwbyTqQzXrQzT6vAX0khbrRDXqQzXqQDX7vQT5rQvsSjPqQjX7vAb6uAfyeRtChPZChfRBhfP8vAX7vARChfNDhfT7vAX7vAVChfT7vAX7vARChfT7vAVChfT8vAVDhfT7vAWarihChfNChfNChfRChfT3vAZjrkE1qVNDhfRChfRChPT6ugXquwxGqks0qFM1qlVChPNChPX7vAX7vAW+th02qFIzqVQA/wBAgOpChfRChfREh/jrugyDsDQ0qFSAgP9ChfNChfRAn2A0qFM1p1M7sU5EmapChPRChPQ0qFQ0qFMzqFMrqlU5qlU1qFM0qFQ3onRChvBChvRVqv80p1M0qFM0qFM0qVM0p1M1qFM0qFM0p1s/id9EhPIktkk0p1I0qFM9kL1ChvUuol01qVQ0qFM4nItBhPIA//8zs000p1M0qFMAgIA0qFQzqFM0qFM0p1Q0qVI0qFM0qVMzmWY1qVIzqFM1qFM0qFQzqFM0qVQzqVIyplPqQzX7vAVChfQ0qFP///9HNtsmAAAAtXRSTlMAAkCCu9/x79muZxwLeuDDQlvmIqLtSQ7E4g0HxSeb+pmt2OcoUeNrJOgqCN04zixnyIsBAdr+v/yvNdHu8Bh/49OHs/cmUXdW3uSuz/G96vuu9r7y3eb3Jpfd/Mnk2IgX/aI00e/wGGxo2f7A/a4BDOT+ImfIiQKvyAjdoA0Ps1lP4mkMEm/owvfSA5f4wZSjzPrW5TwHw+3NfAu9/MOZAQqdewJY5N5AdtxiBT6BuOXQsXMuLeDr9wAAAAFiS0dEuTq4FmAAAAAHdElNRQfnAw4NABqVUOZQAAABmklEQVQ4y2NggANGJmYWVrat7BycXNwMmICHl28rAvALoMsLCm1FBSzCKNpFtmIAUTGEvLjEVixAUgomLy2DTV5IFm6AHFxQnl9EQVEJzFRWgcurwqTV1CGGaijIb9XUgstr60DlRcThYrp6+ggXGhhC5I2MGbACE1MzcwugvCUOeQarbdu2WdtstbXDIc9gD1SwzcHRCZc8gzNIwTYXVxjfzR0FeDB4ghV4wTV4b0cBPgy+YAV+uBT4MwSAFQTiUhAENSEYl4IQhlD8bgiD+iI8AqYgMgoKosEKYiDhEBsXj+79hESwgiSGZKB8SuqOtHQ0BRkQKzIZTLKyc3J37NiRl48iX1AIli8qZmAoKd0BBmXI8uUVEAMqgeyqaoiCHTW1cPm6eqgnGkC8RqiCHU3NLWDp1rb2jk6wfFc3WKAHpmJHb19N/4SJk4CsyVOA8tFTIQZOm74DE8yYuX37LJiVs+dgUTF33vwFcEctXIRFweIlyP5augxNfvkKtJBbuLIaSXrV6jWYiS9/7br11WmTNmzctHkLIlgBgzVwVlfZiqoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDMtMTRUMTM6MDA6MjYrMDA6MDDEFXUgAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAzLTE0VDEzOjAwOjI2KzAwOjAwtUjNnAAAAABJRU5ErkJggg==", Xs = "data:image/png;base64,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", Hs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAbJJREFUWIW917FqFUEUgOHPGBElUURUiEFTiSCxEMUnsE4hVgo+gGAREQJaJoWoKWwtDAQtLNNpGQtjo1FRsBNE5ZqAGrgRJMla7F5Yr9ndyXVnD0yzO5z/n9k57BnqjcOYwgeM1Jy7Mq5iFUk2hpqET+TACT43CT+B310C000KzHTBf2pw+7fjew6+jgtNweFYDr6KS1tN0F/xfj/GMIpdaOE15rGcPZvDImYxjEmcxN5szgIe4stWxLZJT3bb3983v9WLuIebeISlgrkJfuFGljcIPlOS7H/GLPqqBK5HgifScj1bBh9WvO11wMeqVn8r4uqvVMHhYyT4ixD40Yirv1wEzZ/I4yGWPcZ8iMCBiAKtEIEdEQV2hwi0IwqMhgjEbCLOh0zahw1xqqCNIyES7yMJJHiGnVUCdyMKJHiqotrORBZIpC3b6TKJl5EFfsiV5Wb/5ttldjXEfWn7Vhh9eCvO6ldwMMTynDgleS0E3okHNcOfS9v44BjAm5rg3/R4WR3Cu4Kka5ngE7zy7/WsM1o41Qu8E4O4g6/S9noB4zjUNW8PLuKxtLP6JD3xpde0P86aqoHjMFHOAAAAAElFTkSuQmCC", Ms = {
  key: 1,
  class: "inline-flex"
}, Is = /* @__PURE__ */ Y({
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
    const e = t, o = F(!1), n = F(!0), r = St(), i = S(() => e.loading || o.value), l = S(() => r.href !== void 0 && r.href !== null ? "a" : e.tag);
    return (a, s) => (y(), Q(yo(l.value), {
      class: tt(["a-btn", [
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
      onClick: s[0] || (s[0] = (p) => n.value = !0)
    }, {
      default: H(() => [
        i.value ? V(a.$slots, "loaderSlot", { key: 0 }, () => [
          a.loaderLabel ? (y(), T($, { key: 0 }, [
            X(N(a.loaderLabel), 1)
          ], 64)) : (y(), T("span", Ms, s[1] || (s[1] = [
            h("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : V(a.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), Ls = /* @__PURE__ */ Y({
  __name: "RButtonPrimary",
  setup(t) {
    return (e, o) => (y(), Q(Is, { theme: "primary" }, {
      loaderLabel: H(() => [
        V(e.$slots, "loaderSlot")
      ]),
      default: H(() => [
        V(e.$slots, "default")
      ]),
      _: 3
    }));
  }
}), Vs = { class: "w-64" }, Gs = { class: "flex justify-stretch items-center my-3 px-2.5 gap-2.5" }, Ns = { class: "text-xs text-grey-300" }, Fs = { class: "flex gap-2" }, Qs = ["title"], Js = ["title"], Us = ["title"], Zs = /* @__PURE__ */ Y({
  __name: "RAuthForm",
  props: {
    emailAuthButtonLabel: { default: "S'inscrire" },
    thirdPartyAuthButtonsLabel: { default: "ou créer son compte via" },
    thirdPartyAuthButtonsTitleTemplate: { default: "S'inscrire avec {provider}" }
  },
  emits: ["authenticateWithAppleClick", "authenticateWithEmailClick", "authenticateWithFacebookClick", "authenticateWithGoogleClick"],
  setup(t, { emit: e }) {
    const o = e, n = F(""), r = () => {
      o("authenticateWithEmailClick", { email: n.value });
    }, i = () => {
      o("authenticateWithGoogleClick");
    }, l = () => {
      o("authenticateWithFacebookClick");
    }, a = () => {
      o("authenticateWithAppleClick");
    };
    return (s, p) => (y(), T("div", Vs, [
      h("form", {
        class: "[ o-form ]",
        onSubmit: po(r, ["prevent"])
      }, [
        le(h("input", {
          "onUpdate:modelValue": p[0] || (p[0] = (d) => n.value = d),
          class: "-formGrey min-w-64 box-border",
          type: "email",
          placeholder: "Votre email"
        }, null, 512), [
          [tr, n.value]
        ]),
        te(P(Ls), {
          block: "",
          class: "mt-2",
          type: "submit"
        }, {
          default: H(() => [
            X(N(s.emailAuthButtonLabel), 1)
          ]),
          _: 1
        })
      ], 32),
      h("div", Gs, [
        p[1] || (p[1] = h("span", { class: "flex-1 block h-px bg-grey-600" }, null, -1)),
        h("span", Ns, N(s.thirdPartyAuthButtonsLabel), 1),
        p[2] || (p[2] = h("span", { class: "flex-1 block h-px bg-grey-600" }, null, -1))
      ]),
      h("div", Fs, [
        h("button", {
          type: "button",
          role: "link",
          class: "[ m-authForm__thirdPartyAuthButton ]",
          title: s.thirdPartyAuthButtonsTitleTemplate.replace("{provider}", "Google"),
          onClick: i
        }, p[3] || (p[3] = [
          h("img", {
            width: "25",
            height: "25",
            src: Ws,
            alt: "Logo Google"
          }, null, -1)
        ]), 8, Qs),
        h("button", {
          type: "button",
          role: "link",
          class: "[ m-authForm__thirdPartyAuthButton ]",
          title: s.thirdPartyAuthButtonsTitleTemplate.replace("{provider}", "Facebook"),
          onClick: l
        }, p[4] || (p[4] = [
          h("img", {
            width: "25",
            height: "25",
            src: Xs,
            alt: "Logo Facebook"
          }, null, -1)
        ]), 8, Js),
        h("button", {
          type: "button",
          role: "link",
          class: "[ m-authForm__thirdPartyAuthButton ]",
          title: s.thirdPartyAuthButtonsTitleTemplate.replace("{provider}", "Apple"),
          onClick: a
        }, p[5] || (p[5] = [
          h("img", {
            width: "25",
            height: "25",
            src: Hs,
            alt: "Logo Apple"
          }, null, -1)
        ]), 8, Us)
      ])
    ]));
  }
}), zs = /* @__PURE__ */ Y({
  __name: "RCouponApplierModalCashbackPromotionPanel",
  props: {
    appliedCouponCount: { default: 0 },
    cashback: {},
    isEveryAppliedCouponCompatibleWithCashback: { type: Boolean, default: !1 }
  },
  emits: ["logInWithAppleClick", "logInWithEmailClick", "logInWithFacebookClick", "logInWithGoogleClick", "registerWithAppleClick", "registerWithEmailClick", "registerWithFacebookClick", "registerWithGoogleClick"],
  setup(t, { emit: e }) {
    const o = t, n = e, r = F("logIn"), i = S(
      () => o.appliedCouponCount > 0 && o.isEveryAppliedCouponCompatibleWithCashback
    ), l = S(() => i.value ? "🤑" : "🙌"), a = S(
      () => i.value ? `Cumulez les codes promo
avec le cashback !` : `Et si vous profitiez
du cashback ?`
    ), s = S(() => {
      const u = o.cashback.isVariable ? `Jusqu’à ${o.cashback.shortCashbackText}` : o.cashback.shortCashbackText;
      return i.value ? o.appliedCouponCount === 1 ? `Ce code vous offre ${u.toLowerCase()} de cashback.` : `Ces codes vous offrent ${u.toLowerCase()} de cashback.` : `${u} de cashback.`;
    }), p = () => {
      n(`${r.value}WithAppleClick`);
    }, d = (u) => {
      n(`${r.value}WithEmailClick`, u);
    }, A = () => {
      n(`${r.value}WithFacebookClick`);
    }, b = () => {
      n(`${r.value}WithGoogleClick`);
    }, f = () => {
      r.value === "logIn" ? r.value = "register" : r.value = "logIn";
    };
    return (u, c) => (y(), Q(P($e), Tt(jt({ emoji: l.value, title: a.value })), {
      subtitle: H(() => [
        X(N(s.value), 1),
        c[0] || (c[0] = h("br", null, null, -1)),
        X(" " + N(r.value === "logIn" ? "C’est un plaisir de vous revoir ;)" : "Nouveau membre ? +3€ offerts."), 1)
      ]),
      footer: H(() => [
        h("button", {
          type: "button",
          role: "link",
          class: "[ -a -high ]",
          onClick: f
        }, [
          r.value === "logIn" ? (y(), T($, { key: 0 }, [
            c[1] || (c[1] = X(" Pas encore membre ? ")),
            c[2] || (c[2] = h("span", { class: "-colorPrimary" }, "S'inscrire", -1))
          ], 64)) : (y(), T($, { key: 1 }, [
            c[3] || (c[3] = X(" Déja membre ? ")),
            c[4] || (c[4] = h("span", { class: "-colorPrimary" }, "Se connecter", -1))
          ], 64))
        ])
      ]),
      default: H(() => [
        te(P($n), {
          "tooltip-contents": u.cashback.htmlConditions,
          class: "mt-2 mb-4 w-full",
          "max-height": "400px"
        }, null, 8, ["tooltip-contents"]),
        te(P(Zs), {
          "email-auth-button-label": "Profiter du cashback",
          "third-party-auth-buttons-label": "ou le récupérer via",
          "third-party-auth-buttons-title-template": "Récupérer le cashback via {provider}",
          onAuthenticateWithEmailClick: d,
          onAuthenticateWithGoogleClick: b,
          onAuthenticateWithFacebookClick: A,
          onAuthenticateWithAppleClick: p
        })
      ]),
      _: 1
    }, 16));
  }
}), Ys = { class: "[ a-alert -info ] w-72" }, Ks = /* @__PURE__ */ Y({
  __name: "RCouponApplierModalFailedTestResultsPanel",
  props: {
    isCashbackAvailable: { type: Boolean },
    isUserLoggedIn: { type: Boolean },
    merchantName: {}
  },
  emits: ["whatIsCashbackClick"],
  setup(t, { emit: e }) {
    const o = e, n = () => {
      o("whatIsCashbackClick");
    };
    return (r, i) => r.isUserLoggedIn ? (y(), Q(P($e), {
      key: 0,
      emoji: "👍",
      title: "Vous bénéficiez déjà du meilleur prix",
      subtitle: "Il n’y a pas de code promo applicable à votre panier pour le moment !"
    })) : (y(), Q(P($e), {
      key: 1,
      emoji: "😕",
      title: "Mince…",
      subtitle: "Aucun code promo n’est applicable à votre panier pour le moment !"
    }, gn({ _: 2 }, [
      r.isCashbackAvailable ? {
        name: "default",
        fn: H(() => [
          i[2] || (i[2] = h("h3", { class: "mt-6 text-[28px]" }, " C’est l’occasion de profiter des avantages de Poulpeo ;) ", -1)),
          h("blockquote", Ys, [
            X(N(r.merchantName) + " est partenaire de Poulpeo.", 1),
            i[0] || (i[0] = h("br", null, null, -1)),
            i[1] || (i[1] = X(" Lorsque vous activez le cashback Poulpeo nous vous remboursons automatiquement une partie de votre commande. "))
          ])
        ]),
        key: "0"
      } : void 0,
      r.isCashbackAvailable ? {
        name: "footer",
        fn: H(() => [
          h("button", {
            type: "button",
            role: "link",
            class: "[ -a -high ]",
            onClick: n
          }, i[3] || (i[3] = [
            h("i", { class: "fa-solid fa-arrow-right -colorPrimary" }, null, -1),
            X(" C'est quoi le "),
            h("span", { class: "-colorPrimary" }, "cashback", -1),
            X(" ? ")
          ]))
        ]),
        key: "1"
      } : void 0
    ]), 1024));
  }
}), _s = {
  key: 1,
  class: "inline-flex"
}, $s = /* @__PURE__ */ Y({
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
    const e = t, o = F(!1), n = F(!0), r = St(), i = S(() => e.loading || o.value), l = S(() => r.href !== void 0 && r.href !== null ? "a" : e.tag);
    return (a, s) => (y(), Q(yo(l.value), {
      class: tt(["a-btn", [
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
      onClick: s[0] || (s[0] = (p) => n.value = !0)
    }, {
      default: H(() => [
        i.value ? V(a.$slots, "loaderSlot", { key: 0 }, () => [
          a.loaderLabel ? (y(), T($, { key: 0 }, [
            X(N(a.loaderLabel), 1)
          ], 64)) : (y(), T("span", _s, s[1] || (s[1] = [
            h("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : V(a.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), ep = /* @__PURE__ */ Y({
  __name: "RButtonPrimary",
  setup(t) {
    return (e, o) => (y(), Q($s, { theme: "primary" }, {
      loaderLabel: H(() => [
        V(e.$slots, "loaderSlot")
      ]),
      default: H(() => [
        V(e.$slots, "default")
      ]),
      _: 3
    }));
  }
}), tp = ["loading"], _t = /* @__PURE__ */ Y({
  __name: "RCodeButton",
  props: {
    offerId: {},
    code: {},
    codeFetchingStatus: { default: void 0 },
    isCodeCopiedInClipboard: { type: Boolean, default: !1 },
    forceActive: { type: Boolean, default: !1 },
    fullWidth: { type: Boolean, default: !1 }
  },
  emits: ["codeButtonClick"],
  setup(t, { emit: e }) {
    const o = t, n = e, r = S(() => ({
      "bg-primary-light dark:bg-neutral-700 border-primary": o.isCodeCopiedInClipboard || o.forceActive,
      "bg-neutral-100 dark:bg-[#202124] border-neutral-400 dark:hover:bg-neutral-700 hover:bg-primary-light hover:border-primary": !(o.isCodeCopiedInClipboard || o.forceActive),
      "w-26 min-w-26 -truncate overflow-hidden": !o.fullWidth,
      "whitespace-nowrap": o.fullWidth
    })), i = () => {
      o.codeFetchingStatus === "success" ? n("codeButtonClick", {
        eventType: "codeCopied",
        offerId: o.offerId,
        code: o.code
      }) : (o.codeFetchingStatus === "pending" || o.codeFetchingStatus === "failure") && n("codeButtonClick", {
        eventType: "requestCode",
        offerId: o.offerId
      });
    };
    return (l, a) => !l.isCodeCopiedInClipboard && (l.codeFetchingStatus == null || l.codeFetchingStatus === "pending") ? (y(), Q(P(ep), {
      key: 0,
      small: "",
      onClick: i
    }, {
      default: H(() => a[0] || (a[0] = [
        X(" Révéler le code ")
      ])),
      _: 1
    })) : (y(), T("button", {
      key: 1,
      type: "button",
      class: tt(["relative inline-block items-center justify-center h-6.5 px-2 rounded-sm border border-dashed dark:font-bold font-medium text-xs text-black dark:text-white leading-5 cursor-pointer", r.value]),
      loading: l.codeFetchingStatus === "ongoing",
      onClick: i
    }, [
      l.isCodeCopiedInClipboard ? (y(), T($, { key: 0 }, [
        a[1] || (a[1] = h("i", { class: "fa-regular fa-check" }, null, -1)),
        a[2] || (a[2] = X(" Code copié "))
      ], 64)) : l.codeFetchingStatus === "success" ? (y(), T($, { key: 1 }, [
        a[3] || (a[3] = h("i", { class: "fa-light fa-tags" }, null, -1)),
        X(" " + N(l.code), 1)
      ], 64)) : l.codeFetchingStatus === "failure" ? (y(), T($, { key: 2 }, [
        a[4] || (a[4] = h("i", { class: "fa-regular fa-circle-exclamation" }, null, -1)),
        a[5] || (a[5] = X(" ERREUR "))
      ], 64)) : _("", !0)
    ], 10, tp));
  }
}), op = { class: "[ m-couponApplierModalSuccessfulTestResultsPanel__savedAmount ] relative w-fit my-2 text-5xl leading-none font-medium" }, np = { class: "relative mb-0 text-xl" }, rp = { class: "[ m-couponApplierModalSuccessfulTestResultsPanel__table ] w-72 mb-4 text-xs font-normal" }, ap = { class: "m-couponApplierModalSuccessfulTestResultsPanel__tableOrderTotal" }, ip = { class: "flex" }, lp = { class: "[ m-couponApplierModalSuccessfulTestResultsPanel__tableOrderCouponCodeBadge ] a-badge -high self-center ml-6" }, sp = { class: "m-couponApplierModalSuccessfulTestResultsPanel__tableOrderCouponSaving" }, pp = {
  key: 0,
  class: "[ a-alert -info ] w-72"
}, cp = {
  key: 1,
  class: "[ a-alert ] w-72 block"
}, dp = /* @__PURE__ */ Y({
  __name: "RCouponApplierModalSuccessfulTestResultsPanel",
  props: {
    appliedCoupons: {},
    isCashbackAvailable: { type: Boolean },
    isUserLoggedIn: { type: Boolean },
    merchantName: {},
    shoppingCartTotalWithoutCoupons: {}
  },
  emits: ["whatIsCashbackClick"],
  setup(t, { emit: e }) {
    const o = t, n = e, r = (f) => Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.trunc(f)), i = (f) => Intl.NumberFormat("fr-FR", {
      minimumIntegerDigits: 2,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.round((f - Math.floor(f)) * 100)), l = (f) => `${r(f)},${i(f)}€`, a = (f) => `${Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(f * 100)}%`, s = S(() => {
      const f = o.shoppingCartTotalWithoutCoupons, u = o.appliedCoupons.reduce(
        (m, x) => m + (x.shoppingCartTotalReductionAmount ?? 0),
        0
      ), c = f - u;
      return {
        currentAmount: l(c),
        initialAmount: l(f),
        savingsAmount: {
          integerDigits: r(u),
          fractionDigits: i(u)
        },
        savingsPerCoupon: o.appliedCoupons.map((m) => ({
          code: m.code,
          savingsAmount: l(
            m.shoppingCartTotalReductionAmount ?? 0
          ),
          savingsRate: a(
            (m.shoppingCartTotalReductionAmount ?? 0) / f
          )
        }))
      };
    }), p = S(
      () => o.appliedCoupons.every((f) => f.isCompatibleWithCashback)
    ), d = S(
      () => o.isCashbackAvailable && p.value && !o.isUserLoggedIn
    ), A = S(
      () => o.isCashbackAvailable && !p.value && o.isUserLoggedIn
    ), b = () => {
      n("whatIsCashbackClick");
    };
    return (f, u) => (y(), Q(P($e), {
      emoji: "🎉",
      title: `Félicitations !
Vous économisez`
    }, gn({
      default: H(() => [
        h("div", null, [
          h("p", op, [
            X(N(s.value.savingsAmount.integerDigits), 1),
            h("span", np, "," + N(s.value.savingsAmount.fractionDigits), 1)
          ])
        ]),
        h("table", rp, [
          h("tbody", null, [
            h("tr", ap, [
              u[0] || (u[0] = h("th", null, "Montant de votre commande", -1)),
              h("td", null, N(s.value.initialAmount), 1)
            ]),
            (y(!0), T($, null, bo(s.value.savingsPerCoupon, (c) => (y(), T("tr", {
              key: c.code,
              class: "m-couponApplierModalSuccessfulTestResultsPanel__tableOrderCoupon"
            }, [
              h("th", ip, [
                te(P(_t), {
                  "offer-id": -1,
                  code: c.code,
                  "force-active": !0,
                  "code-fetching-status": "success",
                  class: "outline-0 !cursor-default"
                }, null, 8, ["code"]),
                h("div", lp, " -" + N(c.savingsRate), 1)
              ]),
              h("td", sp, " -" + N(c.savingsAmount), 1)
            ]))), 128)),
            h("tr", null, [
              u[1] || (u[1] = h("th", null, "Prix avec Poulpeo", -1)),
              h("td", null, N(s.value.currentAmount), 1)
            ])
          ])
        ]),
        d.value ? (y(), T("p", pp, " Et ce n’est pas tout ! " + N(f.merchantName) + " est partenaire de Poulpeo. Profitez des codes promo et ajoutez les avantages cashback. Faites-vous rembourser une partie de vos achats. ", 1)) : _("", !0),
        A.value ? (y(), T("p", cp, [
          u[2] || (u[2] = h("b", null, "⚠️ Cashback ou code promo ?", -1)),
          u[3] || (u[3] = h("br", null, null, -1)),
          f.appliedCoupons.length > 1 ? (y(), T($, { key: 0 }, [
            X(" Ces codes promo ne sont pas cumulables avec l’offre cashback. ")
          ], 64)) : (y(), T($, { key: 1 }, [
            X(" Ce code promo n’est pas cumulable avec l’offre cashback. ")
          ], 64)),
          u[4] || (u[4] = h("b", null, "Si vous activez le cashback celui ne sera pas pris en compte.", -1))
        ])) : _("", !0)
      ]),
      _: 2
    }, [
      d.value ? {
        name: "footer",
        fn: H(() => [
          h("button", {
            type: "button",
            role: "link",
            class: "[ -a -high ]",
            onClick: b
          }, u[5] || (u[5] = [
            h("i", { class: "fa-solid fa-arrow-right -colorPrimary" }, null, -1),
            X(" C'est quoi le "),
            h("span", { class: "-colorPrimary" }, "cashback", -1),
            X(" ? ")
          ]))
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), up = {
  key: 0,
  class: "[ a-alert -info ] w-72 mt-4.5"
}, fp = { class: "[ m-couponApplierModalTestProgressPanel__codesFoundText ] mt-2.25 mb-6" }, vp = { class: "[ m-couponApplierModalTestProgressPanel__progress ] flex relative box-border w-61.75 h-6 mb-5.75 p-1 rounded-full" }, mp = { class: "[ m-couponApplierModalTestProgressPanel__progressPercent ] mr-1.75 text-xs leading-none" }, hp = { class: "[ m-couponApplierModalTestProgressPanel__codesContainer ] relative" }, bp = { class: "[ m-couponApplierModalTestProgressPanel__codes ] flex relative gap-3 items-center w-83 h-11 overflow-scroll pointer-events-none" }, gp = /* @__PURE__ */ Y({
  __name: "RCouponApplierModalTestProgressPanel",
  props: {
    couponCount: {},
    tip: { default: "" },
    testedCoupons: {}
  },
  setup(t) {
    const e = t, o = F(), n = S(
      () => e.couponCount.tested / e.couponCount.total < 0.16 ? 0.16 : e.couponCount.tested / e.couponCount.total
    ), r = S(
      () => Intl.NumberFormat("fr-FR", { style: "percent" }).format(n.value)
    ), i = S(() => e.couponCount.tested === e.couponCount.total ? e.testedCoupons[e.testedCoupons.length - 1] : e.testedCoupons.find((a) => a.testStatus === "ongoing")), l = () => {
      var a, s;
      (s = (a = o.value) == null ? void 0 : a.find((p) => p.classList.contains("-current"))) == null || s.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    };
    return se(() => {
      setTimeout(l, 250);
    }), er(() => {
      l();
    }), (a, s) => (y(), Q(P($e), {
      emoji: "🤞",
      title: "C’est parti !",
      subtitle: "Nous testons l’ensemble des codes promo afin de vous trouver la meilleure offre"
    }, {
      default: H(() => [
        a.tip ? (y(), T("blockquote", up, N(a.tip), 1)) : _("", !0),
        s[0] || (s[0] = h("span", { class: "[ m-couponApplierModalTestProgressPanel__loader ] inline-block box-border w-7.5 h-7.5 mt-4.5 rounded-full" }, null, -1)),
        h("div", fp, N(`Code trouvé${a.couponCount.valid > 1 ? "s" : ""} ${a.couponCount.valid} - Test en cours…`), 1),
        h("div", vp, [
          h("div", {
            class: "[ m-couponApplierModalTestProgressPanel__progressBar ] flex flex-col items-end justify-center box-border h-full rounded-full overflow-hidden",
            style: et({ "--progress-value": n.value * 100 + "%" })
          }, [
            h("span", mp, N(r.value), 1)
          ], 4)
        ]),
        h("div", hp, [
          h("div", bp, [
            te(P(_t), {
              "offer-id": -1,
              code: "PLPKR23MECRDT...",
              "code-fetching-status": "success",
              "full-width": !0,
              class: "ml-5 outline-0"
            }),
            (y(!0), T($, null, bo(a.testedCoupons, (p) => (y(), T("div", {
              ref_for: !0,
              ref_key: "couponElts",
              ref: o,
              key: p.code,
              class: tt({ "-current": p === i.value })
            }, [
              te(P(_t), {
                "offer-id": -1,
                code: p.code,
                "code-fetching-status": "success",
                "full-width": !0,
                class: tt(["[ m-couponApplierModalTestProgressPanel__codeItem ] outline-0", {
                  "-current": p === i.value,
                  "-success": p.testStatus === "success"
                }])
              }, null, 8, ["code", "class"])
            ], 2))), 128)),
            te(P(_t), {
              "offer-id": -1,
              code: "PLPKR23MECRDT...",
              "code-fetching-status": "success",
              "full-width": !0,
              class: "opacity-0 mr-5"
            })
          ])
        ])
      ]),
      _: 1
    }));
  }
});
export {
  Ap as RCouponApplierModal,
  bl as RCouponApplierModalApplicationPromotionPanel,
  qs as RCouponApplierModalCashbackActivationConfirmationPanel,
  zs as RCouponApplierModalCashbackPromotionPanel,
  Ks as RCouponApplierModalFailedTestResultsPanel,
  dp as RCouponApplierModalSuccessfulTestResultsPanel,
  gp as RCouponApplierModalTestProgressPanel
};
content;
