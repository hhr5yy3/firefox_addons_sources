import { d as V, e as B, o as v, c as k, g as I, i as E, r as L, m as ot, ak as rt, h as W, j as Y, t as N, b as q, F as Z, z as It, f as nt, w as ht, a as _, u as g, n as de, q as mt, p as Ee, A as bt, W as yt, X as Pt, Y as $t, k as gt, l as kt, U as jt, C as je, R as ge, V as at, Z as Wt, $ as Nt, a0 as zt, a1 as We, a2 as Ht, a3 as Ut, a4 as Ft, O as Vt, ad as Gt, a9 as it, af as Xt } from "./esm-index-C1muFETj.js";
import { u as Yt } from "./useOfferActions-OtLBdQJ2.js";
const Zt = {
  key: 1,
  class: "inline-flex"
}, xt = /* @__PURE__ */ V({
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
    const e = t, o = Y(!1), r = Y(!0), n = gt(), i = B(() => e.loading || o.value), s = B(() => n.href !== void 0 && n.href !== null ? "a" : e.tag);
    return (a, d) => (v(), I(kt(s.value), {
      class: de(["a-btn", [
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
      onClick: d[0] || (d[0] = (l) => r.value = !0)
    }, {
      default: E(() => [
        i.value ? L(a.$slots, "loaderSlot", { key: 0 }, () => [
          a.loaderLabel ? (v(), k(Z, { key: 0 }, [
            q(N(a.loaderLabel), 1)
          ], 64)) : (v(), k("span", Zt, d[1] || (d[1] = [
            _("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : L(a.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), Jt = /* @__PURE__ */ V({
  __name: "RButtonPrimary",
  setup(t) {
    return (e, o) => (v(), I(xt, { theme: "primary" }, {
      loaderLabel: E(() => [
        L(e.$slots, "loaderSlot")
      ]),
      default: E(() => [
        L(e.$slots, "default")
      ]),
      _: 3
    }));
  }
}), Kt = /* @__PURE__ */ V({
  __name: "RButtonSecondary",
  setup(t) {
    return (e, o) => (v(), I(xt, { theme: "secondary" }, {
      loaderLabel: E(() => [
        L(e.$slots, "loaderSlot")
      ]),
      default: E(() => [
        L(e.$slots, "default")
      ]),
      _: 3
    }));
  }
}), Qt = { class: "-colorGrey" }, eo = /* @__PURE__ */ V({
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
      isVariable: r,
      shortCashbackText: n,
      shortPreviousCashbackText: i
    } = Ee(e), s = B(() => `Jusqu'à ${n.value}`), a = B(() => {
      if (!r.value)
        return e.prefix;
      const l = s.value.indexOf(n.value);
      return e.prefix + s.value.slice(0, l);
    }), d = B(() => {
      if (!r.value)
        return e.suffix;
      const l = s.value.indexOf(n.value) + n.value.length;
      return s.value.slice(l) + e.suffix;
    });
    return (l, c) => (v(), k("span", null, [
      q(N(a.value) + " ", 1),
      g(o) ? (v(), k(Z, { key: 0 }, [
        _("s", Qt, N(g(i)), 1),
        c[0] || (c[0] = q(" "))
      ], 64)) : W("", !0),
      l.unstyled ? (v(), k(Z, { key: 1 }, [
        q(N(g(n) + d.value), 1)
      ], 64)) : (v(), k(Z, { key: 2 }, [
        _("b", null, N(g(n)), 1),
        q(N(d.value), 1)
      ], 64))
    ]));
  }
}), to = {
  key: 1,
  class: "inline-flex"
}, oo = /* @__PURE__ */ V({
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
    const e = t, o = Y(!1), r = Y(!0), n = gt(), i = B(() => e.loading || o.value), s = B(() => n.href !== void 0 && n.href !== null ? "a" : e.tag);
    return (a, d) => (v(), I(kt(s.value), {
      class: de(["a-btn", [
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
      onClick: d[0] || (d[0] = (l) => r.value = !0)
    }, {
      default: E(() => [
        i.value ? L(a.$slots, "loaderSlot", { key: 0 }, () => [
          a.loaderLabel ? (v(), k(Z, { key: 0 }, [
            q(N(a.loaderLabel), 1)
          ], 64)) : (v(), k("span", to, d[1] || (d[1] = [
            _("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : L(a.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), ro = /* @__PURE__ */ V({
  __name: "RButtonPrimary",
  setup(t) {
    return (e, o) => (v(), I(oo, { theme: "primary" }, {
      loaderLabel: E(() => [
        L(e.$slots, "loaderSlot")
      ]),
      default: E(() => [
        L(e.$slots, "default")
      ]),
      _: 3
    }));
  }
}), no = ["loading"], ao = /* @__PURE__ */ V({
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
    const o = t, r = e, n = B(() => ({
      "bg-primary-light dark:bg-neutral-700 border-primary": o.isCodeCopiedInClipboard || o.forceActive,
      "bg-neutral-100 dark:bg-[#202124] border-neutral-400 dark:hover:bg-neutral-700 hover:bg-primary-light hover:border-primary": !(o.isCodeCopiedInClipboard || o.forceActive),
      "w-26 min-w-26 -truncate overflow-hidden": !o.fullWidth,
      "whitespace-nowrap": o.fullWidth
    })), i = () => {
      o.codeFetchingStatus === "success" ? r("codeButtonClick", {
        eventType: "codeCopied",
        offerId: o.offerId,
        code: o.code
      }) : (o.codeFetchingStatus === "pending" || o.codeFetchingStatus === "failure") && r("codeButtonClick", {
        eventType: "requestCode",
        offerId: o.offerId
      });
    };
    return (s, a) => !s.isCodeCopiedInClipboard && (s.codeFetchingStatus == null || s.codeFetchingStatus === "pending") ? (v(), I(g(ro), {
      key: 0,
      small: "",
      onClick: i
    }, {
      default: E(() => a[0] || (a[0] = [
        q(" Révéler le code ")
      ])),
      _: 1
    })) : (v(), k("button", {
      key: 1,
      type: "button",
      class: de(["relative inline-block items-center justify-center h-6.5 px-2 rounded-sm border border-dashed dark:font-bold font-medium text-xs text-black dark:text-white leading-5 cursor-pointer", n.value]),
      loading: s.codeFetchingStatus === "ongoing",
      onClick: i
    }, [
      s.isCodeCopiedInClipboard ? (v(), k(Z, { key: 0 }, [
        a[1] || (a[1] = _("i", { class: "fa-regular fa-check" }, null, -1)),
        a[2] || (a[2] = q(" Code copié "))
      ], 64)) : s.codeFetchingStatus === "success" ? (v(), k(Z, { key: 1 }, [
        a[3] || (a[3] = _("i", { class: "fa-light fa-tags" }, null, -1)),
        q(" " + N(s.code), 1)
      ], 64)) : s.codeFetchingStatus === "failure" ? (v(), k(Z, { key: 2 }, [
        a[4] || (a[4] = _("i", { class: "fa-regular fa-circle-exclamation" }, null, -1)),
        a[5] || (a[5] = q(" ERREUR "))
      ], 64)) : W("", !0)
    ], 10, no));
  }
}), io = { class: "font-medium whitespace-nowrap" }, so = {
  key: 1,
  class: "fa-stack fa-2xs"
}, lo = {
  key: 2,
  class: "fa-thumbs-up fa-solid"
}, co = /* @__PURE__ */ V({
  __name: "ROfferIcon",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, { icon: o } = Ee(e);
    return (r, n) => {
      var i, s;
      return v(), k("span", io, [
        (i = g(o)) != null && i.iconName ? (v(), k(Z, { key: 0 }, [
          g(o).secondaryIconName ? (v(), k("div", so, [
            _("i", {
              class: de([
                "fa-stack-2x",
                `fa-${g(o).iconName}`,
                `fa-${g(o).iconStyle ?? "solid"}`
              ])
            }, null, 2),
            _("i", {
              class: de([
                "fa-stack-1x",
                `${g(o).iconStyle !== "light" ? "fa-inverse" : ""}`,
                `fa-${g(o).secondaryIconName}`,
                `fa-${g(o).secondaryIconStyle ?? "solid"}`,
                `fa-${g(o).secondaryIconSize ?? "xs"}`
              ])
            }, null, 2)
          ])) : (v(), k("i", {
            key: 0,
            class: de([`fa-${g(o).iconName}`, `fa-${g(o).iconStyle ?? "solid"}`])
          }, null, 2))
        ], 64)) : (s = g(o)) != null && s.altText ? (v(), k("span", {
          key: 1,
          class: de({
            "text-[83.3%]": g(o).altText.length === 5,
            "text-[66.7%]": g(o).altText.length > 5
          })
        }, N(g(o).altText), 3)) : (v(), k("i", lo))
      ]);
    };
  }
});
function Pe(t, e, o) {
  var r, n, i, s, a;
  e == null && (e = 100);
  function d() {
    var c = Date.now() - s;
    c < e && c >= 0 ? r = setTimeout(d, e - c) : (r = null, o || (a = t.apply(i, n), i = n = null));
  }
  var l = function() {
    i = this, n = arguments, s = Date.now();
    var c = o && !r;
    return r || (r = setTimeout(d, e)), c && (a = t.apply(i, n), i = n = null), a;
  };
  return l.clear = function() {
    r && (clearTimeout(r), r = null);
  }, l.flush = function() {
    r && (a = t.apply(i, n), i = n = null, clearTimeout(r), r = null);
  }, l;
}
Pe.debounce = Pe;
var Me = Pe;
function fo(t, e, o) {
  Ft(t) ? ge(t, (r, n) => {
    n == null || n.removeEventListener(e, o), r == null || r.addEventListener(e, o);
  }) : je(() => {
    t.addEventListener(e, o);
  }), We(() => {
    var r;
    (r = g(t)) === null || r === void 0 || r.removeEventListener(e, o);
  });
}
function po(t, e) {
  return typeof window > "u" || !window ? void 0 : fo(window, "pointerdown", (o) => {
    const r = g(t);
    r && (r === o.target || o.composedPath().includes(r) || e(o));
  });
}
function uo(t, e, o) {
  let r = null;
  const n = Y(!1);
  je(() => {
    (t.content !== void 0 || o.value) && (n.value = !0), r = new MutationObserver(i), r.observe(e.value, {
      childList: !0,
      subtree: !0
    });
  }), We(() => r.disconnect()), ge(o, (s) => {
    s ? n.value = !0 : n.value = !1;
  });
  const i = () => {
    t.content ? n.value = !0 : n.value = !1;
  };
  return {
    hasContent: n
  };
}
function ue(t, e) {
  var o = t.getBoundingClientRect(), r = 1, n = 1;
  return {
    width: o.width / r,
    height: o.height / n,
    top: o.top / n,
    right: o.right / r,
    bottom: o.bottom / n,
    left: o.left / r,
    x: o.left / r,
    y: o.top / n
  };
}
function Q(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Ne(t) {
  var e = Q(t), o = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r
  };
}
function ke(t) {
  var e = Q(t).Element;
  return t instanceof e || t instanceof Element;
}
function H(t) {
  var e = Q(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function wt(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Q(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function vo(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function ho(t) {
  return t === Q(t) || !H(t) ? Ne(t) : vo(t);
}
function te(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function fe(t) {
  return ((ke(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function ze(t) {
  return ue(fe(t)).left + Ne(t).scrollLeft;
}
function se(t) {
  return Q(t).getComputedStyle(t);
}
function He(t) {
  var e = se(t), o = e.overflow, r = e.overflowX, n = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + n + r);
}
function mo(t) {
  var e = t.getBoundingClientRect(), o = e.width / t.offsetWidth || 1, r = e.height / t.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function bo(t, e, o) {
  o === void 0 && (o = !1);
  var r = H(e);
  H(e) && mo(e);
  var n = fe(e), i = ue(t), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (r || !r && !o) && ((te(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  He(n)) && (s = ho(e)), H(e) ? (a = ue(e), a.x += e.clientLeft, a.y += e.clientTop) : n && (a.x = ze(n))), {
    x: i.left + s.scrollLeft - a.x,
    y: i.top + s.scrollTop - a.y,
    width: i.width,
    height: i.height
  };
}
function Ue(t) {
  var e = ue(t), o = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - o) <= 1 && (o = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: o,
    height: r
  };
}
function qe(t) {
  return te(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (wt(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    fe(t)
  );
}
function Ct(t) {
  return ["html", "body", "#document"].indexOf(te(t)) >= 0 ? t.ownerDocument.body : H(t) && He(t) ? t : Ct(qe(t));
}
function ye(t, e) {
  var o;
  e === void 0 && (e = []);
  var r = Ct(t), n = r === ((o = t.ownerDocument) == null ? void 0 : o.body), i = Q(r), s = n ? [i].concat(i.visualViewport || [], He(r) ? r : []) : r, a = e.concat(s);
  return n ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(ye(qe(s)))
  );
}
function yo(t) {
  return ["table", "td", "th"].indexOf(te(t)) >= 0;
}
function st(t) {
  return !H(t) || // https://github.com/popperjs/popper-core/issues/837
  se(t).position === "fixed" ? null : t.offsetParent;
}
function go(t) {
  var e = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, o = navigator.userAgent.indexOf("Trident") !== -1;
  if (o && H(t)) {
    var r = se(t);
    if (r.position === "fixed")
      return null;
  }
  for (var n = qe(t); H(n) && ["html", "body"].indexOf(te(n)) < 0; ) {
    var i = se(n);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function Ce(t) {
  for (var e = Q(t), o = st(t); o && yo(o) && se(o).position === "static"; )
    o = st(o);
  return o && (te(o) === "html" || te(o) === "body" && se(o).position === "static") ? e : o || go(t) || e;
}
var U = "top", J = "bottom", K = "right", F = "left", Fe = "auto", Oe = [U, J, K, F], ve = "start", xe = "end", ko = "clippingParents", Ot = "viewport", be = "popper", xo = "reference", lt = /* @__PURE__ */ Oe.reduce(function(t, e) {
  return t.concat([e + "-" + ve, e + "-" + xe]);
}, []), Bt = /* @__PURE__ */ [].concat(Oe, [Fe]).reduce(function(t, e) {
  return t.concat([e, e + "-" + ve, e + "-" + xe]);
}, []), wo = "beforeRead", Co = "read", Oo = "afterRead", Bo = "beforeMain", So = "main", To = "afterMain", Ro = "beforeWrite", Ao = "write", _o = "afterWrite", Do = [wo, Co, Oo, Bo, So, To, Ro, Ao, _o];
function Eo(t) {
  var e = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), r = [];
  t.forEach(function(i) {
    e.set(i.name, i);
  });
  function n(i) {
    o.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(a) {
      if (!o.has(a)) {
        var d = e.get(a);
        d && n(d);
      }
    }), r.push(i);
  }
  return t.forEach(function(i) {
    o.has(i.name) || n(i);
  }), r;
}
function qo(t) {
  var e = Eo(t);
  return Do.reduce(function(o, r) {
    return o.concat(e.filter(function(n) {
      return n.phase === r;
    }));
  }, []);
}
function Lo(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(o) {
      Promise.resolve().then(function() {
        e = void 0, o(t());
      });
    })), e;
  };
}
function ee(t) {
  return t.split("-")[0];
}
function Mo(t) {
  var e = t.reduce(function(o, r) {
    var n = o[r.name];
    return o[r.name] = n ? Object.assign({}, n, r, {
      options: Object.assign({}, n.options, r.options),
      data: Object.assign({}, n.data, r.data)
    }) : r, o;
  }, {});
  return Object.keys(e).map(function(o) {
    return e[o];
  });
}
function Io(t) {
  var e = Q(t), o = fe(t), r = e.visualViewport, n = o.clientWidth, i = o.clientHeight, s = 0, a = 0;
  return r && (n = r.width, i = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (s = r.offsetLeft, a = r.offsetTop)), {
    width: n,
    height: i,
    x: s + ze(t),
    y: a
  };
}
var ce = Math.max, we = Math.min, Re = Math.round;
function Po(t) {
  var e, o = fe(t), r = Ne(t), n = (e = t.ownerDocument) == null ? void 0 : e.body, i = ce(o.scrollWidth, o.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), s = ce(o.scrollHeight, o.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), a = -r.scrollLeft + ze(t), d = -r.scrollTop;
  return se(n || o).direction === "rtl" && (a += ce(o.clientWidth, n ? n.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: a,
    y: d
  };
}
function St(t, e) {
  var o = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (o && wt(o)) {
    var r = e;
    do {
      if (r && t.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function $e(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function $o(t) {
  var e = ue(t);
  return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
}
function dt(t, e) {
  return e === Ot ? $e(Io(t)) : H(e) ? $o(e) : $e(Po(fe(t)));
}
function jo(t) {
  var e = ye(qe(t)), o = ["absolute", "fixed"].indexOf(se(t).position) >= 0, r = o && H(t) ? Ce(t) : t;
  return ke(r) ? e.filter(function(n) {
    return ke(n) && St(n, r) && te(n) !== "body";
  }) : [];
}
function Wo(t, e, o) {
  var r = e === "clippingParents" ? jo(t) : [].concat(e), n = [].concat(r, [o]), i = n[0], s = n.reduce(function(a, d) {
    var l = dt(t, d);
    return a.top = ce(l.top, a.top), a.right = we(l.right, a.right), a.bottom = we(l.bottom, a.bottom), a.left = ce(l.left, a.left), a;
  }, dt(t, i));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function he(t) {
  return t.split("-")[1];
}
function Ve(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function Tt(t) {
  var e = t.reference, o = t.element, r = t.placement, n = r ? ee(r) : null, i = r ? he(r) : null, s = e.x + e.width / 2 - o.width / 2, a = e.y + e.height / 2 - o.height / 2, d;
  switch (n) {
    case U:
      d = {
        x: s,
        y: e.y - o.height
      };
      break;
    case J:
      d = {
        x: s,
        y: e.y + e.height
      };
      break;
    case K:
      d = {
        x: e.x + e.width,
        y: a
      };
      break;
    case F:
      d = {
        x: e.x - o.width,
        y: a
      };
      break;
    default:
      d = {
        x: e.x,
        y: e.y
      };
  }
  var l = n ? Ve(n) : null;
  if (l != null) {
    var c = l === "y" ? "height" : "width";
    switch (i) {
      case ve:
        d[l] = d[l] - (e[c] / 2 - o[c] / 2);
        break;
      case xe:
        d[l] = d[l] + (e[c] / 2 - o[c] / 2);
        break;
    }
  }
  return d;
}
function Rt() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function At(t) {
  return Object.assign({}, Rt(), t);
}
function _t(t, e) {
  return e.reduce(function(o, r) {
    return o[r] = t, o;
  }, {});
}
function Ge(t, e) {
  e === void 0 && (e = {});
  var o = e, r = o.placement, n = r === void 0 ? t.placement : r, i = o.boundary, s = i === void 0 ? ko : i, a = o.rootBoundary, d = a === void 0 ? Ot : a, l = o.elementContext, c = l === void 0 ? be : l, b = o.altBoundary, f = b === void 0 ? !1 : b, u = o.padding, m = u === void 0 ? 0 : u, p = At(typeof m != "number" ? m : _t(m, Oe)), y = c === be ? xo : be, x = t.rects.popper, w = t.elements[f ? y : c], C = Wo(ke(w) ? w : w.contextElement || fe(t.elements.popper), s, d), h = ue(t.elements.reference), S = Tt({
    reference: h,
    element: x,
    strategy: "absolute",
    placement: n
  }), O = $e(Object.assign({}, x, S)), T = c === be ? O : h, R = {
    top: C.top - T.top + p.top,
    bottom: T.bottom - C.bottom + p.bottom,
    left: C.left - T.left + p.left,
    right: T.right - C.right + p.right
  }, A = t.modifiersData.offset;
  if (c === be && A) {
    var G = A[n];
    Object.keys(R).forEach(function(j) {
      var oe = [K, J].indexOf(j) >= 0 ? 1 : -1, D = [U, J].indexOf(j) >= 0 ? "y" : "x";
      R[j] += G[D] * oe;
    });
  }
  return R;
}
var ct = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ft() {
  for (var t = arguments.length, e = new Array(t), o = 0; o < t; o++)
    e[o] = arguments[o];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function No(t) {
  t === void 0 && (t = {});
  var e = t, o = e.defaultModifiers, r = o === void 0 ? [] : o, n = e.defaultOptions, i = n === void 0 ? ct : n;
  return function(s, a, d) {
    d === void 0 && (d = i);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ct, i),
      modifiersData: {},
      elements: {
        reference: s,
        popper: a
      },
      attributes: {},
      styles: {}
    }, c = [], b = !1, f = {
      state: l,
      setOptions: function(p) {
        var y = typeof p == "function" ? p(l.options) : p;
        m(), l.options = Object.assign({}, i, l.options, y), l.scrollParents = {
          reference: ke(s) ? ye(s) : s.contextElement ? ye(s.contextElement) : [],
          popper: ye(a)
        };
        var x = qo(Mo([].concat(r, l.options.modifiers)));
        return l.orderedModifiers = x.filter(function(w) {
          return w.enabled;
        }), u(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var p = l.elements, y = p.reference, x = p.popper;
          if (ft(y, x)) {
            l.rects = {
              reference: bo(y, Ce(x), l.options.strategy === "fixed"),
              popper: Ue(x)
            }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(R) {
              return l.modifiersData[R.name] = Object.assign({}, R.data);
            });
            for (var w = 0; w < l.orderedModifiers.length; w++) {
              if (l.reset === !0) {
                l.reset = !1, w = -1;
                continue;
              }
              var C = l.orderedModifiers[w], h = C.fn, S = C.options, O = S === void 0 ? {} : S, T = C.name;
              typeof h == "function" && (l = h({
                state: l,
                options: O,
                name: T,
                instance: f
              }) || l);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Lo(function() {
        return new Promise(function(p) {
          f.forceUpdate(), p(l);
        });
      }),
      destroy: function() {
        m(), b = !0;
      }
    };
    if (!ft(s, a))
      return f;
    f.setOptions(d).then(function(p) {
      !b && d.onFirstUpdate && d.onFirstUpdate(p);
    });
    function u() {
      l.orderedModifiers.forEach(function(p) {
        var y = p.name, x = p.options, w = x === void 0 ? {} : x, C = p.effect;
        if (typeof C == "function") {
          var h = C({
            state: l,
            name: y,
            instance: f,
            options: w
          }), S = function() {
          };
          c.push(h || S);
        }
      });
    }
    function m() {
      c.forEach(function(p) {
        return p();
      }), c = [];
    }
    return f;
  };
}
var Ae = {
  passive: !0
};
function zo(t) {
  var e = t.state, o = t.instance, r = t.options, n = r.scroll, i = n === void 0 ? !0 : n, s = r.resize, a = s === void 0 ? !0 : s, d = Q(e.elements.popper), l = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && l.forEach(function(c) {
    c.addEventListener("scroll", o.update, Ae);
  }), a && d.addEventListener("resize", o.update, Ae), function() {
    i && l.forEach(function(c) {
      c.removeEventListener("scroll", o.update, Ae);
    }), a && d.removeEventListener("resize", o.update, Ae);
  };
}
var Ho = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: zo,
  data: {}
};
function Uo(t) {
  var e = t.state, o = t.name;
  e.modifiersData[o] = Tt({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
var Fo = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Uo,
  data: {}
}, Vo = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Go(t) {
  var e = t.x, o = t.y, r = window, n = r.devicePixelRatio || 1;
  return {
    x: Re(Re(e * n) / n) || 0,
    y: Re(Re(o * n) / n) || 0
  };
}
function pt(t) {
  var e, o = t.popper, r = t.popperRect, n = t.placement, i = t.variation, s = t.offsets, a = t.position, d = t.gpuAcceleration, l = t.adaptive, c = t.roundOffsets, b = c === !0 ? Go(s) : typeof c == "function" ? c(s) : s, f = b.x, u = f === void 0 ? 0 : f, m = b.y, p = m === void 0 ? 0 : m, y = s.hasOwnProperty("x"), x = s.hasOwnProperty("y"), w = F, C = U, h = window;
  if (l) {
    var S = Ce(o), O = "clientHeight", T = "clientWidth";
    S === Q(o) && (S = fe(o), se(S).position !== "static" && a === "absolute" && (O = "scrollHeight", T = "scrollWidth")), S = S, (n === U || (n === F || n === K) && i === xe) && (C = J, p -= S[O] - r.height, p *= d ? 1 : -1), (n === F || (n === U || n === J) && i === xe) && (w = K, u -= S[T] - r.width, u *= d ? 1 : -1);
  }
  var R = Object.assign({
    position: a
  }, l && Vo);
  if (d) {
    var A;
    return Object.assign({}, R, (A = {}, A[C] = x ? "0" : "", A[w] = y ? "0" : "", A.transform = (h.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + p + "px)" : "translate3d(" + u + "px, " + p + "px, 0)", A));
  }
  return Object.assign({}, R, (e = {}, e[C] = x ? p + "px" : "", e[w] = y ? u + "px" : "", e.transform = "", e));
}
function Xo(t) {
  var e = t.state, o = t.options, r = o.gpuAcceleration, n = r === void 0 ? !0 : r, i = o.adaptive, s = i === void 0 ? !0 : i, a = o.roundOffsets, d = a === void 0 ? !0 : a, l = {
    placement: ee(e.placement),
    variation: he(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: n
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, pt(Object.assign({}, l, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: d
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, pt(Object.assign({}, l, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: d
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
var Yo = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Xo,
  data: {}
};
function Zo(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(o) {
    var r = e.styles[o] || {}, n = e.attributes[o] || {}, i = e.elements[o];
    !H(i) || !te(i) || (Object.assign(i.style, r), Object.keys(n).forEach(function(s) {
      var a = n[s];
      a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function Jo(t) {
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
    Object.keys(e.elements).forEach(function(r) {
      var n = e.elements[r], i = e.attributes[r] || {}, s = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : o[r]), a = s.reduce(function(d, l) {
        return d[l] = "", d;
      }, {});
      !H(n) || !te(n) || (Object.assign(n.style, a), Object.keys(i).forEach(function(d) {
        n.removeAttribute(d);
      }));
    });
  };
}
var Ko = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Zo,
  effect: Jo,
  requires: ["computeStyles"]
}, Qo = [Ho, Fo, Yo, Ko], er = /* @__PURE__ */ No({
  defaultModifiers: Qo
});
function tr(t) {
  return t === "x" ? "y" : "x";
}
function _e(t, e, o) {
  return ce(t, we(e, o));
}
function or(t) {
  var e = t.state, o = t.options, r = t.name, n = o.mainAxis, i = n === void 0 ? !0 : n, s = o.altAxis, a = s === void 0 ? !1 : s, d = o.boundary, l = o.rootBoundary, c = o.altBoundary, b = o.padding, f = o.tether, u = f === void 0 ? !0 : f, m = o.tetherOffset, p = m === void 0 ? 0 : m, y = Ge(e, {
    boundary: d,
    rootBoundary: l,
    padding: b,
    altBoundary: c
  }), x = ee(e.placement), w = he(e.placement), C = !w, h = Ve(x), S = tr(h), O = e.modifiersData.popperOffsets, T = e.rects.reference, R = e.rects.popper, A = typeof p == "function" ? p(Object.assign({}, e.rects, {
    placement: e.placement
  })) : p, G = {
    x: 0,
    y: 0
  };
  if (O) {
    if (i || a) {
      var j = h === "y" ? U : F, oe = h === "y" ? J : K, D = h === "y" ? "height" : "width", re = O[h], ne = O[h] + y[j], z = O[h] - y[oe], ae = u ? -R[D] / 2 : 0, P = w === ve ? T[D] : R[D], $ = w === ve ? -R[D] : -T[D], M = e.elements.arrow, ie = u && M ? Ue(M) : {
        width: 0,
        height: 0
      }, pe = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Rt(), Be = pe[j], le = pe[oe], X = _e(0, T[D], ie[D]), Le = C ? T[D] / 2 - ae - X - Be - A : P - X - Be - A, Se = C ? -T[D] / 2 + ae + X + le + A : $ + X + le + A, me = e.elements.arrow && Ce(e.elements.arrow), qt = me ? h === "y" ? me.clientTop || 0 : me.clientLeft || 0 : 0, Ye = e.modifiersData.offset ? e.modifiersData.offset[e.placement][h] : 0, Ze = O[h] + Le - Ye - qt, Je = O[h] + Se - Ye;
      if (i) {
        var Ke = _e(u ? we(ne, Ze) : ne, re, u ? ce(z, Je) : z);
        O[h] = Ke, G[h] = Ke - re;
      }
      if (a) {
        var Lt = h === "x" ? U : F, Mt = h === "x" ? J : K, Te = O[S], Qe = Te + y[Lt], et = Te - y[Mt], tt = _e(u ? we(Qe, Ze) : Qe, Te, u ? ce(et, Je) : et);
        O[S] = tt, G[S] = tt - Te;
      }
    }
    e.modifiersData[r] = G;
  }
}
var rr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: or,
  requiresIfExists: ["offset"]
}, nr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function De(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return nr[e];
  });
}
var ar = {
  start: "end",
  end: "start"
};
function ut(t) {
  return t.replace(/start|end/g, function(e) {
    return ar[e];
  });
}
function ir(t, e) {
  e === void 0 && (e = {});
  var o = e, r = o.placement, n = o.boundary, i = o.rootBoundary, s = o.padding, a = o.flipVariations, d = o.allowedAutoPlacements, l = d === void 0 ? Bt : d, c = he(r), b = c ? a ? lt : lt.filter(function(m) {
    return he(m) === c;
  }) : Oe, f = b.filter(function(m) {
    return l.indexOf(m) >= 0;
  });
  f.length === 0 && (f = b);
  var u = f.reduce(function(m, p) {
    return m[p] = Ge(t, {
      placement: p,
      boundary: n,
      rootBoundary: i,
      padding: s
    })[ee(p)], m;
  }, {});
  return Object.keys(u).sort(function(m, p) {
    return u[m] - u[p];
  });
}
function sr(t) {
  if (ee(t) === Fe)
    return [];
  var e = De(t);
  return [ut(t), e, ut(e)];
}
function lr(t) {
  var e = t.state, o = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var n = o.mainAxis, i = n === void 0 ? !0 : n, s = o.altAxis, a = s === void 0 ? !0 : s, d = o.fallbackPlacements, l = o.padding, c = o.boundary, b = o.rootBoundary, f = o.altBoundary, u = o.flipVariations, m = u === void 0 ? !0 : u, p = o.allowedAutoPlacements, y = e.options.placement, x = ee(y), w = x === y, C = d || (w || !m ? [De(y)] : sr(y)), h = [y].concat(C).reduce(function(le, X) {
      return le.concat(ee(X) === Fe ? ir(e, {
        placement: X,
        boundary: c,
        rootBoundary: b,
        padding: l,
        flipVariations: m,
        allowedAutoPlacements: p
      }) : X);
    }, []), S = e.rects.reference, O = e.rects.popper, T = /* @__PURE__ */ new Map(), R = !0, A = h[0], G = 0; G < h.length; G++) {
      var j = h[G], oe = ee(j), D = he(j) === ve, re = [U, J].indexOf(oe) >= 0, ne = re ? "width" : "height", z = Ge(e, {
        placement: j,
        boundary: c,
        rootBoundary: b,
        altBoundary: f,
        padding: l
      }), ae = re ? D ? K : F : D ? J : U;
      S[ne] > O[ne] && (ae = De(ae));
      var P = De(ae), $ = [];
      if (i && $.push(z[oe] <= 0), a && $.push(z[ae] <= 0, z[P] <= 0), $.every(function(le) {
        return le;
      })) {
        A = j, R = !1;
        break;
      }
      T.set(j, $);
    }
    if (R)
      for (var M = m ? 3 : 1, ie = function(le) {
        var X = h.find(function(Le) {
          var Se = T.get(Le);
          if (Se)
            return Se.slice(0, le).every(function(me) {
              return me;
            });
        });
        if (X)
          return A = X, "break";
      }, pe = M; pe > 0; pe--) {
        var Be = ie(pe);
        if (Be === "break") break;
      }
    e.placement !== A && (e.modifiersData[r]._skip = !0, e.placement = A, e.reset = !0);
  }
}
var dr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: lr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function cr(t, e, o) {
  var r = ee(t), n = [F, U].indexOf(r) >= 0 ? -1 : 1, i = typeof o == "function" ? o(Object.assign({}, e, {
    placement: t
  })) : o, s = i[0], a = i[1];
  return s = s || 0, a = (a || 0) * n, [F, K].indexOf(r) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function fr(t) {
  var e = t.state, o = t.options, r = t.name, n = o.offset, i = n === void 0 ? [0, 0] : n, s = Bt.reduce(function(c, b) {
    return c[b] = cr(b, e.rects, i), c;
  }, {}), a = s[e.placement], d = a.x, l = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += d, e.modifiersData.popperOffsets.y += l), e.modifiersData[r] = s;
}
var pr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: fr
}, ur = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, At(typeof t != "number" ? t : _t(t, Oe));
};
function vr(t) {
  var e, o = t.state, r = t.name, n = t.options, i = o.elements.arrow, s = o.modifiersData.popperOffsets, a = ee(o.placement), d = Ve(a), l = [F, K].indexOf(a) >= 0, c = l ? "height" : "width";
  if (!(!i || !s)) {
    var b = ur(n.padding, o), f = Ue(i), u = d === "y" ? U : F, m = d === "y" ? J : K, p = o.rects.reference[c] + o.rects.reference[d] - s[d] - o.rects.popper[c], y = s[d] - o.rects.reference[d], x = Ce(i), w = x ? d === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, C = p / 2 - y / 2, h = b[u], S = w - f[c] - b[m], O = w / 2 - f[c] / 2 + C, T = _e(h, O, S), R = d;
    o.modifiersData[r] = (e = {}, e[R] = T, e.centerOffset = T - O, e);
  }
}
function hr(t) {
  var e = t.state, o = t.options, r = o.element, n = r === void 0 ? "[data-popper-arrow]" : r;
  n != null && (typeof n == "string" && (n = e.elements.popper.querySelector(n), !n) || St(e.elements.popper, n) && (e.elements.arrow = n));
}
var mr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: vr,
  effect: hr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
const Ie = (t) => parseInt(t, 10);
function br({
  arrowPadding: t,
  emit: e,
  locked: o,
  offsetDistance: r,
  offsetSkid: n,
  placement: i,
  popperNode: s,
  triggerNode: a
}) {
  const d = Ht({
    isOpen: !1,
    popperInstance: null
  }), l = (p) => {
    var y;
    (y = d.popperInstance) === null || y === void 0 || y.setOptions((x) => ({
      ...x,
      modifiers: [...x.modifiers, {
        name: "eventListeners",
        enabled: p
      }]
    }));
  }, c = () => l(!0), b = () => l(!1), f = () => {
    d.isOpen && (d.isOpen = !1, e("close:popper"));
  }, u = () => {
    d.isOpen || (d.isOpen = !0, e("open:popper"));
  };
  ge([() => d.isOpen, i], async ([p]) => {
    p ? (await m(), c()) : b();
  });
  const m = async () => {
    await Ut(), d.popperInstance = er(a.value, s.value, {
      placement: i.value,
      modifiers: [rr, dr, {
        name: "flip",
        enabled: !o.value
      }, mr, {
        name: "arrow",
        options: {
          padding: Ie(t.value)
        }
      }, pr, {
        name: "offset",
        options: {
          offset: [Ie(n.value), Ie(r.value)]
        }
      }]
    }), d.popperInstance.update();
  };
  return We(() => {
    var p;
    (p = d.popperInstance) === null || p === void 0 || p.destroy();
  }), {
    ...Ee(d),
    open: u,
    close: f
  };
}
const yr = {
  id: "arrow",
  "data-popper-arrow": ""
};
function gr(t, e) {
  return v(), k("div", yr);
}
function Dt(t, e) {
  e === void 0 && (e = {});
  var o = e.insertAt;
  if (!(!t || typeof document > "u")) {
    var r = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
    n.type = "text/css", o === "top" && r.firstChild ? r.insertBefore(n, r.firstChild) : r.appendChild(n), n.styleSheet ? n.styleSheet.cssText = t : n.appendChild(document.createTextNode(t));
  }
}
var kr = `
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
Dt(kr);
const Xe = {};
Xe.render = gr;
Xe.__scopeId = "data-v-20b7fd4a";
var xr = Xe;
const wr = ["onKeyup"];
var Et = {
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
    bt((P) => ({
      c81fc0a4: t.zIndex
    }));
    const r = jt(), n = Y(null), i = Y(null), s = Y(null), a = Y(!1);
    je(() => {
      const P = r.default();
      if (P && P.length > 1)
        return console.error(`[Popper]: The <Popper> component expects only one child element at its root. You passed ${P.length} child nodes.`);
    });
    const {
      arrowPadding: d,
      closeDelay: l,
      content: c,
      disableClickAway: b,
      disabled: f,
      interactive: u,
      locked: m,
      offsetDistance: p,
      offsetSkid: y,
      openDelay: x,
      placement: w,
      show: C
    } = Ee(o), {
      isOpen: h,
      open: S,
      close: O
    } = br({
      arrowPadding: d,
      emit: e,
      locked: m,
      offsetDistance: p,
      offsetSkid: y,
      placement: w,
      popperNode: i,
      triggerNode: s
    }), {
      hasContent: T
    } = uo(r, i, c), R = B(() => C.value !== null), A = B(() => f.value || !T.value), G = B(() => h.value && !A.value), j = B(() => !b.value && !R.value), oe = B(() => u.value ? `border: ${p.value}px solid transparent; margin: -${p.value}px;` : null), D = Me.debounce(S, x.value), re = Me.debounce(O, l.value), ne = async () => {
      A.value || R.value || (re.clear(), D());
    }, z = async () => {
      R.value || (D.clear(), re());
    }, ae = () => {
      h.value ? z() : ne();
    };
    return ge([T, f], ([P, $]) => {
      h.value && (!P || $) && O();
    }), ge(h, (P) => {
      P ? a.value = !0 : Me.debounce(() => {
        a.value = !1;
      }, 200);
    }), at(() => {
      R.value && (C.value ? D() : re());
    }), at(() => {
      j.value && po(n, z);
    }), (P, $) => (v(), k("div", {
      class: "inline-block",
      style: yt(g(oe)),
      onMouseleave: $[2] || ($[2] = (M) => t.hover && z()),
      ref: (M, ie) => {
        ie.popperContainerNode = M, n.value = M;
      }
    }, [_("div", {
      ref: (M, ie) => {
        ie.triggerNode = M, s.value = M;
      },
      onMouseover: $[0] || ($[0] = (M) => t.hover && ne()),
      onClick: ae,
      onFocus: ne,
      onKeyup: Wt(z, ["esc"])
    }, [L(P.$slots, "default")], 40, wr), mt(zt, {
      name: "fade"
    }, {
      default: E(() => [ht(_("div", {
        onClick: $[1] || ($[1] = (M) => !g(u) && z()),
        class: "popper",
        ref: (M, ie) => {
          ie.popperNode = M, i.value = M;
        }
      }, [L(P.$slots, "content", {
        close: g(O),
        isOpen: a.value
      }, () => [q(N(g(c)), 1)]), t.arrow ? (v(), I(xr, {
        key: 0
      })) : W("", !0)], 512), [[Nt, g(G)]])]),
      _: 3
    })], 36));
  }
}, Cr = `
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
Dt(Cr);
Et.__scopeId = "data-v-5784ed69";
var Or = /* @__PURE__ */ (() => {
  const t = Et;
  return t.install = (e) => {
    e.component("Popper", t);
  }, t;
})();
const Br = /* @__PURE__ */ V({
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
    return bt((e) => ({
      e99d4766: e.zIndex
    })), (e, o) => (v(), I(g(Or), {
      class: "m-tooltip",
      arrow: !0,
      "z-index": e.zIndex,
      placement: e.placement,
      hover: e.hover,
      show: e.show
    }, {
      content: E((r) => [
        _("div", {
          class: "m-tooltip__content",
          style: yt({
            maxHeight: e.maxHeight
          })
        }, [
          L(e.$slots, "content", Pt($t(r)))
        ], 4)
      ]),
      default: E(() => [
        L(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["z-index", "placement", "hover", "show"]));
  }
}), Sr = { class: "[ m-offer__actions ] flex flex-wrap" }, Tr = { class: "[ m-offer__sidebar -h1 ] place-self-center" }, Rr = { class: "[ m-offer__title -p ] text-sm leading-4.5" }, Ar = {
  key: 1,
  class: "mb-0 uppercase text-xxs font-bold"
}, _r = ["innerHTML"], Dr = {
  key: 3,
  class: "text-sm mb-1"
}, Er = /* @__PURE__ */ V({
  __name: "ROffer",
  props: {
    offer: {},
    cashback: {},
    position: { default: 1 }
  },
  emits: ["copyOfferCodeActionRequested", "fetchOfferCodeActionRequested", "openOfferUrlActionRequested"],
  setup(t, { emit: e }) {
    const o = t, r = Y(null), n = e, i = B(() => o.offer.offerType === "CODE"), s = B(() => {
      const l = (o.offer.deepUrl ?? "") !== "", c = o.offer.codeType != null;
      return l || !c;
    }), a = () => {
      r.value && n("openOfferUrlActionRequested", o.offer, r.value);
    }, d = (l) => {
      r.value && (l.eventType === "requestCode" ? n("fetchOfferCodeActionRequested", o.offer, r.value) : n("copyOfferCodeActionRequested", o.offer, r.value));
    };
    return (l, c) => {
      const b = nt("tag"), f = nt("track");
      return ht((v(), k("article", {
        ref_key: "el",
        ref: r,
        class: "[ m-offer -box ] grid gap-y-2 py-2.5 pr-3 bg-white"
      }, [
        _("div", Sr, [
          i.value ? (v(), I(g(ao), {
            key: 0,
            "offer-id": l.offer.id,
            code: l.offer.code,
            "code-fetching-status": l.offer.codeFetchingStatus,
            "is-code-copied-in-clipboard": l.offer.isCodeCopiedInClipboard,
            onCodeButtonClick: d
          }, null, 8, ["offer-id", "code", "code-fetching-status", "is-code-copied-in-clipboard"])) : W("", !0),
          l.offer.giftCardCashback ? (v(), I(g(Kt), {
            key: 1,
            small: "",
            onClick: a
          }, {
            default: E(() => c[0] || (c[0] = [
              q(" Acheter un bon d'achat ")
            ])),
            _: 1
          })) : s.value ? (v(), I(g(Jt), {
            key: 2,
            class: de({ "ml-2": i.value }),
            small: "",
            onClick: a
          }, {
            default: E(() => c[1] || (c[1] = [
              q(" Voir l'offre ")
            ])),
            _: 1
          }, 8, ["class"])) : W("", !0)
        ]),
        _("div", Tr, [
          mt(g(co), {
            icon: l.offer.icon
          }, null, 8, ["icon"])
        ]),
        _("div", Rr, [
          l.offer.giftCardCashback ? (v(), k("p", Ar, c[3] || (c[3] = [
            _("span", { class: "color-secondary inline-box" }, [
              _("i", { class: "fa-solid fa-bolt" }),
              q(" Cashback sur bon d'achat")
            ], -1)
          ]))) : W("", !0),
          q(" " + N(l.offer.shortTitle), 1),
          l.offer.descriptionHtml ? (v(), I(g(Br), {
            key: 2,
            "use-fixed-location": !0
          }, {
            content: E(() => [
              _("div", {
                class: "max-w-67.5",
                innerHTML: l.offer.descriptionHtml
              }, null, 8, _r)
            ]),
            default: E(() => [
              c[4] || (c[4] = _("i", { class: "fa-solid fa-circle-info ml-1 middle text-xxs text-grey-400" }, null, -1))
            ]),
            _: 1
          })) : W("", !0),
          l.cashback !== void 0 && !l.offer.giftCardCashback ? (v(), k("p", Dr, [
            l.offer.canCombineCashbackAndOffersCodes ? (v(), I(g(eo), {
              key: 0,
              unstyled: "",
              prefix: "✨ + ",
              suffix: " de cashback",
              "has-increase": !1,
              "is-variable": l.cashback.isVariable,
              "short-cashback-text": l.cashback.shortCashbackText,
              "short-previous-cashback-text": ""
            }, null, 8, ["is-variable", "short-cashback-text"])) : (v(), k(Z, { key: 1 }, [
              q("👉 Non cumulable cashback")
            ], 64))
          ])) : W("", !0)
        ])
      ])), [
        [b, { position: l.position, linkedEntities: { offer: l.offer } }],
        [
          f,
          "offer_impression",
          "impression",
          { once: !0 }
        ]
      ]);
    };
  }
}), qr = {
  key: 0,
  class: "mb-1 text-center"
}, Lr = {
  key: 1,
  class: "text-center text-xs mb-3 -colorGrey"
}, Mr = {
  key: 3,
  class: "flex flex-col mb-4"
}, Ir = 5, vt = /* @__PURE__ */ V({
  __name: "ROfferList",
  props: {
    title: { default: void 0 },
    subtitle: { default: void 0 },
    offers: { default: () => [] },
    cashback: { default: void 0 }
  },
  emits: ["copyOfferCodeActionRequested", "fetchOfferCodeActionRequested", "openOfferUrlActionRequested"],
  setup(t, { emit: e }) {
    const o = t, r = Y(Ir), n = B(() => o.offers.slice(0, r.value)), i = B(() => o.offers.length === 0), s = B(() => r.value < o.offers.length), a = () => {
      r.value = o.offers.length;
    }, d = e, l = (f, u) => {
      d("copyOfferCodeActionRequested", f, u);
    }, c = (f, u) => {
      d("fetchOfferCodeActionRequested", f, u);
    }, b = (f, u) => {
      d("openOfferUrlActionRequested", f, u);
    };
    return (f, u) => (v(), k("div", null, [
      f.title ? (v(), k("h2", qr, N(f.title), 1)) : W("", !0),
      f.subtitle ? (v(), k("p", Lr, N(f.subtitle), 1)) : W("", !0),
      i.value ? L(f.$slots, "emptySlot", { key: 2 }, () => [
        u[0] || (u[0] = q(" Aucune offre "))
      ]) : (v(), k("div", Mr, [
        (v(!0), k(Z, null, It(n.value, (m, p) => (v(), I(Er, {
          key: m.id,
          class: "mb-2.5",
          offer: m,
          cashback: f.cashback,
          position: p + 1,
          onCopyOfferCodeActionRequested: l,
          onFetchOfferCodeActionRequested: c,
          onOpenOfferUrlActionRequested: b
        }, null, 8, ["offer", "cashback", "position"]))), 128)),
        s.value ? (v(), k("a", {
          key: 0,
          small: "",
          inverted: "",
          class: "mx-auto mt-2 cursor-pointer text-sm hover:no-underline",
          onClick: a
        }, " Voir plus d'offres ")) : W("", !0)
      ]))
    ]));
  }
}), Pr = { class: "mb-module" }, $r = /* @__PURE__ */ V({
  __name: "ROfferModule",
  props: {
    cashback: { default: void 0 },
    offers: { default: () => [] },
    giftCardCashbackTitle: { default: "Bon d’achat" },
    giftCardCashbackSubtitleTemplate: { default: "Achetez un bon d’achat {validity} et profitez du cashback immédiat !" },
    noCashbackTitle: { default: "Codes promo et bon plans" },
    noCashbackSubtitle: { default: "Économisez sur vos achats avec les offres ci-dessous" },
    nonGiftCardCashbackTitle: { default: "Codes promo et bon plans" },
    nonGiftCardCashbackSubtitle: { default: "Copiez le code promo et si vous êtes membre Poulpeo le cashback sera automatiquement activé !" }
  },
  emits: ["copyOfferCodeActionRequested", "fetchOfferCodeActionRequested", "openOfferUrlActionRequested"],
  setup(t, { emit: e }) {
    const o = t, r = B(
      () => o.offers.filter((f) => !f.giftCardCashback)
    ), n = B(
      () => r.value.length > 0
    ), i = B(() => o.cashback === void 0 ? o.noCashbackTitle : o.nonGiftCardCashbackTitle), s = B(() => o.cashback === void 0 ? o.noCashbackSubtitle : o.nonGiftCardCashbackSubtitle), a = B(
      () => o.offers.filter(
        (f) => f.giftCardCashback && f.giftCardCashback.cashbackRate > 0
      )
    ), d = B(
      () => a.value.length > 0
    ), l = B(() => {
      const f = (m) => a.value.every(
        (p) => {
          var y;
          return ((y = p.giftCardCashback) == null ? void 0 : y.validity) === m;
        }
      );
      let u = "";
      return f("both") && (u = "valable en ligne et en magasin"), f("instore") && (u = "valable en magasin"), f("web") && (u = "valable en ligne"), o.giftCardCashbackSubtitleTemplate.replace("{validity}", u);
    }), c = e, b = {
      copyOfferCodeActionRequested: (f, u) => {
        c("copyOfferCodeActionRequested", f, u);
      },
      fetchOfferCodeActionRequested: (f, u) => {
        c("fetchOfferCodeActionRequested", f, u);
      },
      openOfferUrlActionRequested: (f, u) => {
        c("openOfferUrlActionRequested", f, u);
      }
    };
    return (f, u) => (v(), k("div", Pr, [
      d.value ? (v(), I(vt, ot({
        key: 0,
        title: f.giftCardCashbackTitle,
        subtitle: l.value,
        offers: a.value,
        cashback: f.cashback
      }, rt(b)), {
        default: E(() => [
          L(f.$slots, "emptySlot")
        ]),
        _: 3
      }, 16, ["title", "subtitle", "offers", "cashback"])) : W("", !0),
      n.value ? (v(), I(vt, ot({
        key: 1,
        title: i.value,
        subtitle: s.value,
        offers: r.value,
        cashback: f.cashback
      }, rt(b)), {
        default: E(() => [
          L(f.$slots, "emptySlot")
        ]),
        _: 3
      }, 16, ["title", "subtitle", "offers", "cashback"])) : W("", !0)
    ]));
  }
}), Nr = {
  setup() {
    const t = Vt(), { copyCode: e, fetchCode: o, openUrl: r } = Yt(), { selectedMerchant: n } = Gt(t);
    return () => {
      var i, s;
      return n.value == null ? it("div", "Impossible de charger le module des offres") : it($r, {
        onCopyOfferCodeActionRequested: e,
        onFetchOfferCodeActionRequested: o,
        onOpenOfferUrlActionRequested: (a, d) => {
          setTimeout(() => {
            Xt().registerUserClick(!1, a.merchantId).catch(console.error);
          }, 0), r(a, d);
        },
        cashback: (i = t.selectedMerchant) == null ? void 0 : i.cashback,
        offers: t.selectedMerchantOffers,
        giftCardCashbackTitle: ((s = t.selectedMerchant) == null ? void 0 : s.name) !== void 0 ? `Bon d’achat ${t.selectedMerchant.name}` : void 0
      });
    };
  }
};
content;
export {
  Nr as OfferModule
};
content;
