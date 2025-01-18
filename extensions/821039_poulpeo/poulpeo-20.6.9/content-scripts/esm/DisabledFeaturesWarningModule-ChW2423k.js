import { d as p, o, c as u, a as n, b as r, q as v, i as d, u as B, g as y, r as i, j as m, k as x, e as f, F as M, t as S, n as _, l as w, O as L, ad as C, a9 as h } from "./esm-index-C1muFETj.js";
import { c as O } from "./useMerchantActions-CyX3gu4q.js";
const V = {
  key: 1,
  class: "inline-flex"
}, $ = /* @__PURE__ */ p({
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
  setup(l) {
    const a = l, t = m(!1), g = m(!0), c = x(), b = f(() => a.loading || t.value), k = f(() => c.href !== void 0 && c.href !== null ? "a" : a.tag);
    return (e, s) => (o(), y(w(k.value), {
      class: _(["a-btn", [
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
      disabled: b.value || e.disabled || e.disabledState ? "" : null,
      onClick: s[0] || (s[0] = (F) => g.value = !0)
    }, {
      default: d(() => [
        b.value ? i(e.$slots, "loaderSlot", { key: 0 }, () => [
          e.loaderLabel ? (o(), u(M, { key: 0 }, [
            r(S(e.loaderLabel), 1)
          ], 64)) : (o(), u("span", V, s[1] || (s[1] = [
            n("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : i(e.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), D = /* @__PURE__ */ p({
  __name: "RButtonPrimary",
  setup(l) {
    return (a, t) => (o(), y($, { theme: "primary" }, {
      loaderLabel: d(() => [
        i(a.$slots, "loaderSlot")
      ]),
      default: d(() => [
        i(a.$slots, "default")
      ]),
      _: 3
    }));
  }
}), R = { class: "mb-module text-center" }, T = /* @__PURE__ */ p({
  __name: "RDisabledFeaturesWarningModule",
  props: {
    plpMerchantPageLink: { default: "" }
  },
  setup(l) {
    return (a, t) => (o(), u("div", R, [
      t[1] || (t[1] = n("h2", null, [
        r(" Nous sommes navrés !"),
        n("br"),
        r(" Cette boutique n'autorise pas l'extension ")
      ], -1)),
      t[2] || (t[2] = n("p", { class: "-colorGrey" }, " Vous pouvez profiter des offres directement depuis notre site ", -1)),
      v(B(D), {
        block: "",
        tag: "a",
        target: "_blank",
        href: a.plpMerchantPageLink
      }, {
        default: d(() => t[0] || (t[0] = [
          r(" Voir les offres depuis poulpeo.com ")
        ])),
        _: 1
      }, 8, ["href"])
    ]));
  }
}), q = {
  setup() {
    const l = L(), { selectedMerchant: a } = C(l);
    return () => {
      var t;
      return ((t = a.value) == null ? void 0 : t.rewrite) === void 0 ? h(
        "div",
        "Impossible de charger le module Boutique refusant l'extension"
      ) : h(T, {
        plpMerchantPageLink: O(
          "https://www.poulpeo.com/reductions-{rewrite}.htm".replace(
            "{rewrite}",
            a.value.rewrite
          ),
          !1
        ).href
      });
    };
  }
};
content;
export {
  q as DisabledFeaturesWarningModule
};
content;
