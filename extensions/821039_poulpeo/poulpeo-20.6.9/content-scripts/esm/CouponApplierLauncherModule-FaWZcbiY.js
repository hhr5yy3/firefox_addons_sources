import { d as y, o as s, c as r, q as h, i as u, b, u as B, g as f, r as p, h as v, a as C, j as m, k as g, e as c, F as A, t as S, n as x, l as _, O as M, N as T, a9 as R, Q as L } from "./esm-index-C1muFETj.js";
const N = {
  key: 1,
  class: "inline-flex"
}, O = /* @__PURE__ */ y({
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
  setup(a) {
    const t = a, o = m(!1), i = m(!0), n = g(), l = c(() => t.loading || o.value), k = c(() => n.href !== void 0 && n.href !== null ? "a" : t.tag);
    return (e, d) => (s(), f(_(k.value), {
      class: x(["a-btn", [
        e.theme ? "-" + e.theme : "",
        e.inverted ? "-inverted" : "",
        e.outlined ? "-outlined" : "",
        e.lighted ? "-inverted" : "",
        e.block ? "-block" : "",
        e.blockOnMobile ? "-blockOnMobile" : "",
        e.small ? "-small" : "",
        e.disabled || e.disabledTheme ? "-disabled" : ""
      ]]),
      type: e.tag === "button" ? e.type : null,
      role: e.tag === "div" ? "button" : null,
      tabindex: e.tag === "div" ? e.tabindex.toString() : null,
      disabled: l.value || e.disabled || e.disabledState ? "" : null,
      onClick: d[0] || (d[0] = (F) => i.value = !0)
    }, {
      default: u(() => [
        l.value ? p(e.$slots, "loaderSlot", { key: 0 }, () => [
          e.loaderLabel ? (s(), r(A, { key: 0 }, [
            b(S(e.loaderLabel), 1)
          ], 64)) : (s(), r("span", N, d[1] || (d[1] = [
            C("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : p(e.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), $ = { key: 0 }, w = { class: "a-btn__text" }, V = /* @__PURE__ */ y({
  __name: "RButtonTertiary",
  setup(a) {
    return (t, o) => (s(), f(O, {
      theme: "tertiary",
      inverted: !1,
      outlined: !1,
      lighted: !1
    }, {
      default: u(() => [
        t.$slots["uncolored-icon-left"] ? (s(), r("span", $, [
          p(t.$slots, "uncolored-icon-left")
        ])) : v("", !0),
        C("span", w, [
          p(t.$slots, "default")
        ])
      ]),
      _: 3
    }));
  }
}), E = { class: "m-couponApplierLauncherModule w-full inline-block mb-module text-center" }, D = /* @__PURE__ */ y({
  __name: "RCouponApplierLauncherModule",
  props: {
    isCouponApplierReady: { type: Boolean }
  },
  emits: ["startTestClick"],
  setup(a, { emit: t }) {
    const o = t, i = () => {
      o("startTestClick");
    };
    return (n, l) => (s(), r("div", E, [
      h(B(V), {
        disabled: !n.isCouponApplierReady,
        class: "w-63 text-base",
        onClick: i
      }, {
        "uncolored-icon-left": u(() => l[0] || (l[0] = [
          b("🎉 ")
        ])),
        default: u(() => [
          l[1] || (l[1] = b("Tester les codes en 1 clic ! "))
        ]),
        _: 1
      }, 8, ["disabled"])
    ]));
  }
}), q = {
  setup() {
    const a = M(), t = T(), o = c(() => a.isCouponApplierEnabled && a.selectedMerchantCouponApplierConfigMatchesPageContent), i = c(() => t.status !== "unavailable"), n = () => {
      L.publish({
        type: "startTestClicked",
        details: {}
      });
    };
    return () => o.value ? R(D, {
      isCouponApplierReady: i.value,
      onStartTestClick: n
    }) : null;
  }
};
content;
export {
  q as CouponApplierLauncherModule
};
content;
