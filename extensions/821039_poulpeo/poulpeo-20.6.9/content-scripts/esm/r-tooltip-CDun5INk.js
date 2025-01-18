import { d as wt, A as tt, o as we, g as rt, i as Ee, a as Le, W as ot, r as xe, X as xt, Y as Ot, u as Y, U as kt, j as ae, C as Me, p as nt, e as oe, R as se, V as Ge, c as at, Z as jt, q as Dt, w as Et, b as Lt, t as St, h as Bt, $ as Mt, a0 as Nt, a1 as Ne, a2 as Tt, a3 as Ct, a4 as Pt } from "./esm-index-C1muFETj.js";
function Se(e, t, r) {
  var o, n, a, i, s;
  t == null && (t = 100);
  function p() {
    var d = Date.now() - i;
    d < t && d >= 0 ? o = setTimeout(p, t - d) : (o = null, r || (s = e.apply(a, n), a = n = null));
  }
  var l = function() {
    a = this, n = arguments, i = Date.now();
    var d = r && !o;
    return o || (o = setTimeout(p, t)), d && (s = e.apply(a, n), a = n = null), s;
  };
  return l.clear = function() {
    o && (clearTimeout(o), o = null);
  }, l.flush = function() {
    o && (s = e.apply(a, n), a = n = null, clearTimeout(o), o = null);
  }, l;
}
Se.debounce = Se;
var je = Se;
function Rt(e, t, r) {
  Pt(e) ? se(e, (o, n) => {
    n == null || n.removeEventListener(t, r), o == null || o.addEventListener(t, r);
  }) : Me(() => {
    e.addEventListener(t, r);
  }), Ne(() => {
    var o;
    (o = Y(e)) === null || o === void 0 || o.removeEventListener(t, r);
  });
}
function It(e, t) {
  return typeof window > "u" || !window ? void 0 : Rt(window, "pointerdown", (o) => {
    const n = Y(e);
    n && (n === o.target || o.composedPath().includes(n) || t(o));
  });
}
function Ht(e, t, r) {
  let o = null;
  const n = ae(!1);
  Me(() => {
    (e.content !== void 0 || r.value) && (n.value = !0), o = new MutationObserver(a), o.observe(t.value, {
      childList: !0,
      subtree: !0
    });
  }), Ne(() => o.disconnect()), se(r, (i) => {
    i ? n.value = !0 : n.value = !1;
  });
  const a = () => {
    e.content ? n.value = !0 : n.value = !1;
  };
  return {
    hasContent: n
  };
}
function Q(e, t) {
  var r = e.getBoundingClientRect(), o = 1, n = 1;
  return {
    width: r.width / o,
    height: r.height / n,
    top: r.top / n,
    right: r.right / o,
    bottom: r.bottom / n,
    left: r.left / o,
    x: r.left / o,
    y: r.top / n
  };
}
function W(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Te(e) {
  var t = W(e), r = t.pageXOffset, o = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: o
  };
}
function pe(e) {
  var t = W(e).Element;
  return e instanceof t || e instanceof Element;
}
function T(e) {
  var t = W(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function it(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = W(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function zt(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Wt(e) {
  return e === W(e) || !T(e) ? Te(e) : zt(e);
}
function _(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function J(e) {
  return ((pe(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Ce(e) {
  return Q(J(e)).left + Te(e).scrollLeft;
}
function G(e) {
  return W(e).getComputedStyle(e);
}
function Pe(e) {
  var t = G(e), r = t.overflow, o = t.overflowX, n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + n + o);
}
function At(e) {
  var t = e.getBoundingClientRect(), r = t.width / e.offsetWidth || 1, o = t.height / e.offsetHeight || 1;
  return r !== 1 || o !== 1;
}
function _t(e, t, r) {
  r === void 0 && (r = !1);
  var o = T(t);
  T(t) && At(t);
  var n = J(t), a = Q(e), i = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (o || !o && !r) && ((_(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Pe(n)) && (i = Wt(t)), T(t) ? (s = Q(t), s.x += t.clientLeft, s.y += t.clientTop) : n && (s.x = Ce(n))), {
    x: a.left + i.scrollLeft - s.x,
    y: a.top + i.scrollTop - s.y,
    width: a.width,
    height: a.height
  };
}
function Re(e) {
  var t = Q(e), r = e.offsetWidth, o = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: o
  };
}
function Oe(e) {
  return _(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (it(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    J(e)
  );
}
function st(e) {
  return ["html", "body", "#document"].indexOf(_(e)) >= 0 ? e.ownerDocument.body : T(e) && Pe(e) ? e : st(Oe(e));
}
function ie(e, t) {
  var r;
  t === void 0 && (t = []);
  var o = st(e), n = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = W(o), i = n ? [a].concat(a.visualViewport || [], Pe(o) ? o : []) : o, s = t.concat(i);
  return n ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(ie(Oe(i)))
  );
}
function Vt(e) {
  return ["table", "td", "th"].indexOf(_(e)) >= 0;
}
function Ke(e) {
  return !T(e) || // https://github.com/popperjs/popper-core/issues/837
  G(e).position === "fixed" ? null : e.offsetParent;
}
function qt(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, r = navigator.userAgent.indexOf("Trident") !== -1;
  if (r && T(e)) {
    var o = G(e);
    if (o.position === "fixed")
      return null;
  }
  for (var n = Oe(e); T(n) && ["html", "body"].indexOf(_(n)) < 0; ) {
    var a = G(n);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function de(e) {
  for (var t = W(e), r = Ke(e); r && Vt(r) && G(r).position === "static"; )
    r = Ke(r);
  return r && (_(r) === "html" || _(r) === "body" && G(r).position === "static") ? t : r || qt(e) || t;
}
var C = "top", H = "bottom", z = "right", P = "left", Ie = "auto", fe = [C, H, z, P], ee = "start", le = "end", $t = "clippingParents", pt = "viewport", ne = "popper", Ut = "reference", Ye = /* @__PURE__ */ fe.reduce(function(e, t) {
  return e.concat([t + "-" + ee, t + "-" + le]);
}, []), lt = /* @__PURE__ */ [].concat(fe, [Ie]).reduce(function(e, t) {
  return e.concat([t, t + "-" + ee, t + "-" + le]);
}, []), Ft = "beforeRead", Gt = "read", Kt = "afterRead", Yt = "beforeMain", Zt = "main", Jt = "afterMain", Xt = "beforeWrite", Qt = "write", er = "afterWrite", tr = [Ft, Gt, Kt, Yt, Zt, Jt, Xt, Qt, er];
function rr(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), o = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function n(a) {
    r.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(s) {
      if (!r.has(s)) {
        var p = t.get(s);
        p && n(p);
      }
    }), o.push(a);
  }
  return e.forEach(function(a) {
    r.has(a.name) || n(a);
  }), o;
}
function or(e) {
  var t = rr(e);
  return tr.reduce(function(r, o) {
    return r.concat(t.filter(function(n) {
      return n.phase === o;
    }));
  }, []);
}
function nr(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function A(e) {
  return e.split("-")[0];
}
function ar(e) {
  var t = e.reduce(function(r, o) {
    var n = r[o.name];
    return r[o.name] = n ? Object.assign({}, n, o, {
      options: Object.assign({}, n.options, o.options),
      data: Object.assign({}, n.data, o.data)
    }) : o, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
function ir(e) {
  var t = W(e), r = J(e), o = t.visualViewport, n = r.clientWidth, a = r.clientHeight, i = 0, s = 0;
  return o && (n = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (i = o.offsetLeft, s = o.offsetTop)), {
    width: n,
    height: a,
    x: i + Ce(e),
    y: s
  };
}
var Z = Math.max, ce = Math.min, he = Math.round;
function sr(e) {
  var t, r = J(e), o = Te(e), n = (t = e.ownerDocument) == null ? void 0 : t.body, a = Z(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), i = Z(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), s = -o.scrollLeft + Ce(e), p = -o.scrollTop;
  return G(n || r).direction === "rtl" && (s += Z(r.clientWidth, n ? n.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: s,
    y: p
  };
}
function ct(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && it(r)) {
    var o = t;
    do {
      if (o && e.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function Be(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function pr(e) {
  var t = Q(e);
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Ze(e, t) {
  return t === pt ? Be(ir(e)) : T(t) ? pr(t) : Be(sr(J(e)));
}
function lr(e) {
  var t = ie(Oe(e)), r = ["absolute", "fixed"].indexOf(G(e).position) >= 0, o = r && T(e) ? de(e) : e;
  return pe(o) ? t.filter(function(n) {
    return pe(n) && ct(n, o) && _(n) !== "body";
  }) : [];
}
function cr(e, t, r) {
  var o = t === "clippingParents" ? lr(e) : [].concat(t), n = [].concat(o, [r]), a = n[0], i = n.reduce(function(s, p) {
    var l = Ze(e, p);
    return s.top = Z(l.top, s.top), s.right = ce(l.right, s.right), s.bottom = ce(l.bottom, s.bottom), s.left = Z(l.left, s.left), s;
  }, Ze(e, a));
  return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
function te(e) {
  return e.split("-")[1];
}
function He(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function dt(e) {
  var t = e.reference, r = e.element, o = e.placement, n = o ? A(o) : null, a = o ? te(o) : null, i = t.x + t.width / 2 - r.width / 2, s = t.y + t.height / 2 - r.height / 2, p;
  switch (n) {
    case C:
      p = {
        x: i,
        y: t.y - r.height
      };
      break;
    case H:
      p = {
        x: i,
        y: t.y + t.height
      };
      break;
    case z:
      p = {
        x: t.x + t.width,
        y: s
      };
      break;
    case P:
      p = {
        x: t.x - r.width,
        y: s
      };
      break;
    default:
      p = {
        x: t.x,
        y: t.y
      };
  }
  var l = n ? He(n) : null;
  if (l != null) {
    var d = l === "y" ? "height" : "width";
    switch (a) {
      case ee:
        p[l] = p[l] - (t[d] / 2 - r[d] / 2);
        break;
      case le:
        p[l] = p[l] + (t[d] / 2 - r[d] / 2);
        break;
    }
  }
  return p;
}
function ft() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ut(e) {
  return Object.assign({}, ft(), e);
}
function vt(e, t) {
  return t.reduce(function(r, o) {
    return r[o] = e, r;
  }, {});
}
function ze(e, t) {
  t === void 0 && (t = {});
  var r = t, o = r.placement, n = o === void 0 ? e.placement : o, a = r.boundary, i = a === void 0 ? $t : a, s = r.rootBoundary, p = s === void 0 ? pt : s, l = r.elementContext, d = l === void 0 ? ne : l, b = r.altBoundary, h = b === void 0 ? !1 : b, u = r.padding, v = u === void 0 ? 0 : u, c = ut(typeof v != "number" ? v : vt(v, fe)), m = d === ne ? Ut : ne, y = e.rects.popper, g = e.elements[h ? m : d], w = cr(pe(g) ? g : g.contextElement || J(e.elements.popper), i, p), f = Q(e.elements.reference), O = dt({
    reference: f,
    element: y,
    strategy: "absolute",
    placement: n
  }), x = Be(Object.assign({}, y, O)), k = d === ne ? x : f, j = {
    top: w.top - k.top + c.top,
    bottom: k.bottom - w.bottom + c.bottom,
    left: w.left - k.left + c.left,
    right: k.right - w.right + c.right
  }, D = e.modifiersData.offset;
  if (d === ne && D) {
    var R = D[n];
    Object.keys(j).forEach(function(M) {
      var V = [z, H].indexOf(M) >= 0 ? 1 : -1, E = [C, H].indexOf(M) >= 0 ? "y" : "x";
      j[M] += R[E] * V;
    });
  }
  return j;
}
var Je = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Xe() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function dr(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, o = r === void 0 ? [] : r, n = t.defaultOptions, a = n === void 0 ? Je : n;
  return function(i, s, p) {
    p === void 0 && (p = a);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Je, a),
      modifiersData: {},
      elements: {
        reference: i,
        popper: s
      },
      attributes: {},
      styles: {}
    }, d = [], b = !1, h = {
      state: l,
      setOptions: function(c) {
        var m = typeof c == "function" ? c(l.options) : c;
        v(), l.options = Object.assign({}, a, l.options, m), l.scrollParents = {
          reference: pe(i) ? ie(i) : i.contextElement ? ie(i.contextElement) : [],
          popper: ie(s)
        };
        var y = or(ar([].concat(o, l.options.modifiers)));
        return l.orderedModifiers = y.filter(function(g) {
          return g.enabled;
        }), u(), h.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var c = l.elements, m = c.reference, y = c.popper;
          if (Xe(m, y)) {
            l.rects = {
              reference: _t(m, de(y), l.options.strategy === "fixed"),
              popper: Re(y)
            }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(j) {
              return l.modifiersData[j.name] = Object.assign({}, j.data);
            });
            for (var g = 0; g < l.orderedModifiers.length; g++) {
              if (l.reset === !0) {
                l.reset = !1, g = -1;
                continue;
              }
              var w = l.orderedModifiers[g], f = w.fn, O = w.options, x = O === void 0 ? {} : O, k = w.name;
              typeof f == "function" && (l = f({
                state: l,
                options: x,
                name: k,
                instance: h
              }) || l);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: nr(function() {
        return new Promise(function(c) {
          h.forceUpdate(), c(l);
        });
      }),
      destroy: function() {
        v(), b = !0;
      }
    };
    if (!Xe(i, s))
      return h;
    h.setOptions(p).then(function(c) {
      !b && p.onFirstUpdate && p.onFirstUpdate(c);
    });
    function u() {
      l.orderedModifiers.forEach(function(c) {
        var m = c.name, y = c.options, g = y === void 0 ? {} : y, w = c.effect;
        if (typeof w == "function") {
          var f = w({
            state: l,
            name: m,
            instance: h,
            options: g
          }), O = function() {
          };
          d.push(f || O);
        }
      });
    }
    function v() {
      d.forEach(function(c) {
        return c();
      }), d = [];
    }
    return h;
  };
}
var be = {
  passive: !0
};
function fr(e) {
  var t = e.state, r = e.instance, o = e.options, n = o.scroll, a = n === void 0 ? !0 : n, i = o.resize, s = i === void 0 ? !0 : i, p = W(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && l.forEach(function(d) {
    d.addEventListener("scroll", r.update, be);
  }), s && p.addEventListener("resize", r.update, be), function() {
    a && l.forEach(function(d) {
      d.removeEventListener("scroll", r.update, be);
    }), s && p.removeEventListener("resize", r.update, be);
  };
}
var ur = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: fr,
  data: {}
};
function vr(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = dt({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
var mr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: vr,
  data: {}
}, hr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function br(e) {
  var t = e.x, r = e.y, o = window, n = o.devicePixelRatio || 1;
  return {
    x: he(he(t * n) / n) || 0,
    y: he(he(r * n) / n) || 0
  };
}
function Qe(e) {
  var t, r = e.popper, o = e.popperRect, n = e.placement, a = e.variation, i = e.offsets, s = e.position, p = e.gpuAcceleration, l = e.adaptive, d = e.roundOffsets, b = d === !0 ? br(i) : typeof d == "function" ? d(i) : i, h = b.x, u = h === void 0 ? 0 : h, v = b.y, c = v === void 0 ? 0 : v, m = i.hasOwnProperty("x"), y = i.hasOwnProperty("y"), g = P, w = C, f = window;
  if (l) {
    var O = de(r), x = "clientHeight", k = "clientWidth";
    O === W(r) && (O = J(r), G(O).position !== "static" && s === "absolute" && (x = "scrollHeight", k = "scrollWidth")), O = O, (n === C || (n === P || n === z) && a === le) && (w = H, c -= O[x] - o.height, c *= p ? 1 : -1), (n === P || (n === C || n === H) && a === le) && (g = z, u -= O[k] - o.width, u *= p ? 1 : -1);
  }
  var j = Object.assign({
    position: s
  }, l && hr);
  if (p) {
    var D;
    return Object.assign({}, j, (D = {}, D[w] = y ? "0" : "", D[g] = m ? "0" : "", D.transform = (f.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + c + "px)" : "translate3d(" + u + "px, " + c + "px, 0)", D));
  }
  return Object.assign({}, j, (t = {}, t[w] = y ? c + "px" : "", t[g] = m ? u + "px" : "", t.transform = "", t));
}
function yr(e) {
  var t = e.state, r = e.options, o = r.gpuAcceleration, n = o === void 0 ? !0 : o, a = r.adaptive, i = a === void 0 ? !0 : a, s = r.roundOffsets, p = s === void 0 ? !0 : s, l = {
    placement: A(t.placement),
    variation: te(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: n
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Qe(Object.assign({}, l, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: p
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Qe(Object.assign({}, l, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: p
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
var gr = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: yr,
  data: {}
};
function wr(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var o = t.styles[r] || {}, n = t.attributes[r] || {}, a = t.elements[r];
    !T(a) || !_(a) || (Object.assign(a.style, o), Object.keys(n).forEach(function(i) {
      var s = n[i];
      s === !1 ? a.removeAttribute(i) : a.setAttribute(i, s === !0 ? "" : s);
    }));
  });
}
function xr(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(o) {
      var n = t.elements[o], a = t.attributes[o] || {}, i = Object.keys(t.styles.hasOwnProperty(o) ? t.styles[o] : r[o]), s = i.reduce(function(p, l) {
        return p[l] = "", p;
      }, {});
      !T(n) || !_(n) || (Object.assign(n.style, s), Object.keys(a).forEach(function(p) {
        n.removeAttribute(p);
      }));
    });
  };
}
var Or = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: wr,
  effect: xr,
  requires: ["computeStyles"]
}, kr = [ur, mr, gr, Or], jr = /* @__PURE__ */ dr({
  defaultModifiers: kr
});
function Dr(e) {
  return e === "x" ? "y" : "x";
}
function ye(e, t, r) {
  return Z(e, ce(t, r));
}
function Er(e) {
  var t = e.state, r = e.options, o = e.name, n = r.mainAxis, a = n === void 0 ? !0 : n, i = r.altAxis, s = i === void 0 ? !1 : i, p = r.boundary, l = r.rootBoundary, d = r.altBoundary, b = r.padding, h = r.tether, u = h === void 0 ? !0 : h, v = r.tetherOffset, c = v === void 0 ? 0 : v, m = ze(t, {
    boundary: p,
    rootBoundary: l,
    padding: b,
    altBoundary: d
  }), y = A(t.placement), g = te(t.placement), w = !g, f = He(y), O = Dr(f), x = t.modifiersData.popperOffsets, k = t.rects.reference, j = t.rects.popper, D = typeof c == "function" ? c(Object.assign({}, t.rects, {
    placement: t.placement
  })) : c, R = {
    x: 0,
    y: 0
  };
  if (x) {
    if (a || s) {
      var M = f === "y" ? C : P, V = f === "y" ? H : z, E = f === "y" ? "height" : "width", q = x[f], $ = x[f] + m[M], N = x[f] - m[V], U = u ? -j[E] / 2 : 0, S = g === ee ? k[E] : j[E], B = g === ee ? -j[E] : -k[E], L = t.elements.arrow, F = u && L ? Re(L) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ft(), ue = X[M], K = X[V], I = ye(0, k[E], F[E]), ke = w ? k[E] / 2 - U - I - ue - D : S - I - ue - D, ve = w ? -k[E] / 2 + U + I + K + D : B + I + K + D, re = t.elements.arrow && de(t.elements.arrow), bt = re ? f === "y" ? re.clientTop || 0 : re.clientLeft || 0 : 0, Ae = t.modifiersData.offset ? t.modifiersData.offset[t.placement][f] : 0, _e = x[f] + ke - Ae - bt, Ve = x[f] + ve - Ae;
      if (a) {
        var qe = ye(u ? ce($, _e) : $, q, u ? Z(N, Ve) : N);
        x[f] = qe, R[f] = qe - q;
      }
      if (s) {
        var yt = f === "x" ? C : P, gt = f === "x" ? H : z, me = x[O], $e = me + m[yt], Ue = me - m[gt], Fe = ye(u ? ce($e, _e) : $e, me, u ? Z(Ue, Ve) : Ue);
        x[O] = Fe, R[O] = Fe - me;
      }
    }
    t.modifiersData[o] = R;
  }
}
var Lr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Er,
  requiresIfExists: ["offset"]
}, Sr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ge(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Sr[t];
  });
}
var Br = {
  start: "end",
  end: "start"
};
function et(e) {
  return e.replace(/start|end/g, function(t) {
    return Br[t];
  });
}
function Mr(e, t) {
  t === void 0 && (t = {});
  var r = t, o = r.placement, n = r.boundary, a = r.rootBoundary, i = r.padding, s = r.flipVariations, p = r.allowedAutoPlacements, l = p === void 0 ? lt : p, d = te(o), b = d ? s ? Ye : Ye.filter(function(v) {
    return te(v) === d;
  }) : fe, h = b.filter(function(v) {
    return l.indexOf(v) >= 0;
  });
  h.length === 0 && (h = b);
  var u = h.reduce(function(v, c) {
    return v[c] = ze(e, {
      placement: c,
      boundary: n,
      rootBoundary: a,
      padding: i
    })[A(c)], v;
  }, {});
  return Object.keys(u).sort(function(v, c) {
    return u[v] - u[c];
  });
}
function Nr(e) {
  if (A(e) === Ie)
    return [];
  var t = ge(e);
  return [et(e), t, et(t)];
}
function Tr(e) {
  var t = e.state, r = e.options, o = e.name;
  if (!t.modifiersData[o]._skip) {
    for (var n = r.mainAxis, a = n === void 0 ? !0 : n, i = r.altAxis, s = i === void 0 ? !0 : i, p = r.fallbackPlacements, l = r.padding, d = r.boundary, b = r.rootBoundary, h = r.altBoundary, u = r.flipVariations, v = u === void 0 ? !0 : u, c = r.allowedAutoPlacements, m = t.options.placement, y = A(m), g = y === m, w = p || (g || !v ? [ge(m)] : Nr(m)), f = [m].concat(w).reduce(function(K, I) {
      return K.concat(A(I) === Ie ? Mr(t, {
        placement: I,
        boundary: d,
        rootBoundary: b,
        padding: l,
        flipVariations: v,
        allowedAutoPlacements: c
      }) : I);
    }, []), O = t.rects.reference, x = t.rects.popper, k = /* @__PURE__ */ new Map(), j = !0, D = f[0], R = 0; R < f.length; R++) {
      var M = f[R], V = A(M), E = te(M) === ee, q = [C, H].indexOf(V) >= 0, $ = q ? "width" : "height", N = ze(t, {
        placement: M,
        boundary: d,
        rootBoundary: b,
        altBoundary: h,
        padding: l
      }), U = q ? E ? z : P : E ? H : C;
      O[$] > x[$] && (U = ge(U));
      var S = ge(U), B = [];
      if (a && B.push(N[V] <= 0), s && B.push(N[U] <= 0, N[S] <= 0), B.every(function(K) {
        return K;
      })) {
        D = M, j = !1;
        break;
      }
      k.set(M, B);
    }
    if (j)
      for (var L = v ? 3 : 1, F = function(K) {
        var I = f.find(function(ke) {
          var ve = k.get(ke);
          if (ve)
            return ve.slice(0, K).every(function(re) {
              return re;
            });
        });
        if (I)
          return D = I, "break";
      }, X = L; X > 0; X--) {
        var ue = F(X);
        if (ue === "break") break;
      }
    t.placement !== D && (t.modifiersData[o]._skip = !0, t.placement = D, t.reset = !0);
  }
}
var Cr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Tr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Pr(e, t, r) {
  var o = A(e), n = [P, C].indexOf(o) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, i = a[0], s = a[1];
  return i = i || 0, s = (s || 0) * n, [P, z].indexOf(o) >= 0 ? {
    x: s,
    y: i
  } : {
    x: i,
    y: s
  };
}
function Rr(e) {
  var t = e.state, r = e.options, o = e.name, n = r.offset, a = n === void 0 ? [0, 0] : n, i = lt.reduce(function(d, b) {
    return d[b] = Pr(b, t.rects, a), d;
  }, {}), s = i[t.placement], p = s.x, l = s.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += p, t.modifiersData.popperOffsets.y += l), t.modifiersData[o] = i;
}
var Ir = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Rr
}, Hr = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, ut(typeof e != "number" ? e : vt(e, fe));
};
function zr(e) {
  var t, r = e.state, o = e.name, n = e.options, a = r.elements.arrow, i = r.modifiersData.popperOffsets, s = A(r.placement), p = He(s), l = [P, z].indexOf(s) >= 0, d = l ? "height" : "width";
  if (!(!a || !i)) {
    var b = Hr(n.padding, r), h = Re(a), u = p === "y" ? C : P, v = p === "y" ? H : z, c = r.rects.reference[d] + r.rects.reference[p] - i[p] - r.rects.popper[d], m = i[p] - r.rects.reference[p], y = de(a), g = y ? p === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, w = c / 2 - m / 2, f = b[u], O = g - h[d] - b[v], x = g / 2 - h[d] / 2 + w, k = ye(f, x, O), j = p;
    r.modifiersData[o] = (t = {}, t[j] = k, t.centerOffset = k - x, t);
  }
}
function Wr(e) {
  var t = e.state, r = e.options, o = r.element, n = o === void 0 ? "[data-popper-arrow]" : o;
  n != null && (typeof n == "string" && (n = t.elements.popper.querySelector(n), !n) || ct(t.elements.popper, n) && (t.elements.arrow = n));
}
var Ar = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: zr,
  effect: Wr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
const De = (e) => parseInt(e, 10);
function _r({
  arrowPadding: e,
  emit: t,
  locked: r,
  offsetDistance: o,
  offsetSkid: n,
  placement: a,
  popperNode: i,
  triggerNode: s
}) {
  const p = Tt({
    isOpen: !1,
    popperInstance: null
  }), l = (c) => {
    var m;
    (m = p.popperInstance) === null || m === void 0 || m.setOptions((y) => ({
      ...y,
      modifiers: [...y.modifiers, {
        name: "eventListeners",
        enabled: c
      }]
    }));
  }, d = () => l(!0), b = () => l(!1), h = () => {
    p.isOpen && (p.isOpen = !1, t("close:popper"));
  }, u = () => {
    p.isOpen || (p.isOpen = !0, t("open:popper"));
  };
  se([() => p.isOpen, a], async ([c]) => {
    c ? (await v(), d()) : b();
  });
  const v = async () => {
    await Ct(), p.popperInstance = jr(s.value, i.value, {
      placement: a.value,
      modifiers: [Lr, Cr, {
        name: "flip",
        enabled: !r.value
      }, Ar, {
        name: "arrow",
        options: {
          padding: De(e.value)
        }
      }, Ir, {
        name: "offset",
        options: {
          offset: [De(n.value), De(o.value)]
        }
      }]
    }), p.popperInstance.update();
  };
  return Ne(() => {
    var c;
    (c = p.popperInstance) === null || c === void 0 || c.destroy();
  }), {
    ...nt(p),
    open: u,
    close: h
  };
}
const Vr = {
  id: "arrow",
  "data-popper-arrow": ""
};
function qr(e, t) {
  return we(), at("div", Vr);
}
function mt(e, t) {
  t === void 0 && (t = {});
  var r = t.insertAt;
  if (!(!e || typeof document > "u")) {
    var o = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
    n.type = "text/css", r === "top" && o.firstChild ? o.insertBefore(n, o.firstChild) : o.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
  }
}
var $r = `
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
mt($r);
const We = {};
We.render = qr;
We.__scopeId = "data-v-20b7fd4a";
var Ur = We;
const Fr = ["onKeyup"];
var ht = {
  props: {
    /**
     * Preferred placement (the "auto" placements will choose the side with most space.)
     */
    placement: {
      type: String,
      default: "bottom",
      validator: function(e) {
        return ["auto", "auto-start", "auto-end", "top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "right", "right-start", "right-end", "left", "left-start", "left-end"].includes(e);
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
  setup(e, {
    emit: t
  }) {
    const r = e;
    tt((S) => ({
      c81fc0a4: e.zIndex
    }));
    const o = kt(), n = ae(null), a = ae(null), i = ae(null), s = ae(!1);
    Me(() => {
      const S = o.default();
      if (S && S.length > 1)
        return console.error(`[Popper]: The <Popper> component expects only one child element at its root. You passed ${S.length} child nodes.`);
    });
    const {
      arrowPadding: p,
      closeDelay: l,
      content: d,
      disableClickAway: b,
      disabled: h,
      interactive: u,
      locked: v,
      offsetDistance: c,
      offsetSkid: m,
      openDelay: y,
      placement: g,
      show: w
    } = nt(r), {
      isOpen: f,
      open: O,
      close: x
    } = _r({
      arrowPadding: p,
      emit: t,
      locked: v,
      offsetDistance: c,
      offsetSkid: m,
      placement: g,
      popperNode: a,
      triggerNode: i
    }), {
      hasContent: k
    } = Ht(o, a, d), j = oe(() => w.value !== null), D = oe(() => h.value || !k.value), R = oe(() => f.value && !D.value), M = oe(() => !b.value && !j.value), V = oe(() => u.value ? `border: ${c.value}px solid transparent; margin: -${c.value}px;` : null), E = je.debounce(O, y.value), q = je.debounce(x, l.value), $ = async () => {
      D.value || j.value || (q.clear(), E());
    }, N = async () => {
      j.value || (E.clear(), q());
    }, U = () => {
      f.value ? N() : $();
    };
    return se([k, h], ([S, B]) => {
      f.value && (!S || B) && x();
    }), se(f, (S) => {
      S ? s.value = !0 : je.debounce(() => {
        s.value = !1;
      }, 200);
    }), Ge(() => {
      j.value && (w.value ? E() : q());
    }), Ge(() => {
      M.value && It(n, N);
    }), (S, B) => (we(), at("div", {
      class: "inline-block",
      style: ot(Y(V)),
      onMouseleave: B[2] || (B[2] = (L) => e.hover && N()),
      ref: (L, F) => {
        F.popperContainerNode = L, n.value = L;
      }
    }, [Le("div", {
      ref: (L, F) => {
        F.triggerNode = L, i.value = L;
      },
      onMouseover: B[0] || (B[0] = (L) => e.hover && $()),
      onClick: U,
      onFocus: $,
      onKeyup: jt(N, ["esc"])
    }, [xe(S.$slots, "default")], 40, Fr), Dt(Nt, {
      name: "fade"
    }, {
      default: Ee(() => [Et(Le("div", {
        onClick: B[1] || (B[1] = (L) => !Y(u) && N()),
        class: "popper",
        ref: (L, F) => {
          F.popperNode = L, a.value = L;
        }
      }, [xe(S.$slots, "content", {
        close: Y(x),
        isOpen: s.value
      }, () => [Lt(St(Y(d)), 1)]), e.arrow ? (we(), rt(Ur, {
        key: 0
      })) : Bt("", !0)], 512), [[Mt, Y(R)]])]),
      _: 3
    })], 36));
  }
}, Gr = `
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
mt(Gr);
ht.__scopeId = "data-v-5784ed69";
var Kr = /* @__PURE__ */ (() => {
  const e = ht;
  return e.install = (t) => {
    t.component("Popper", e);
  }, e;
})();
const Zr = /* @__PURE__ */ wt({
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
  setup(e) {
    return tt((t) => ({
      e99d4766: t.zIndex
    })), (t, r) => (we(), rt(Y(Kr), {
      class: "m-tooltip",
      arrow: !0,
      "z-index": t.zIndex,
      placement: t.placement,
      hover: t.hover,
      show: t.show
    }, {
      content: Ee((o) => [
        Le("div", {
          class: "m-tooltip__content",
          style: ot({
            maxHeight: t.maxHeight
          })
        }, [
          xe(t.$slots, "content", xt(Ot(o)))
        ], 4)
      ]),
      default: Ee(() => [
        xe(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["z-index", "placement", "hover", "show"]));
  }
});
export {
  Zr as G
};
content;
