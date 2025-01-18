import { d as f, o as s, c as p, a, b as n, q as h, i as r, u as v, g, r as u, j as m, k as B, e as y, F as k, t as S, n as _, l as C, af as M, a9 as L } from "./esm-index-C1muFETj.js";
const z = {
  key: 1,
  class: "inline-flex"
}, E = /* @__PURE__ */ f({
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
  setup(o) {
    const t = o, i = m(!1), c = m(!0), b = B(), l = y(() => t.loading || i.value), x = y(() => b.href !== void 0 && b.href !== null ? "a" : t.tag);
    return (e, d) => (s(), g(C(x.value), {
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
      disabled: l.value || e.disabled || e.disabledState ? "" : null,
      onClick: d[0] || (d[0] = (F) => c.value = !0)
    }, {
      default: r(() => [
        l.value ? u(e.$slots, "loaderSlot", { key: 0 }, () => [
          e.loaderLabel ? (s(), p(k, { key: 0 }, [
            n(S(e.loaderLabel), 1)
          ], 64)) : (s(), p("span", z, d[1] || (d[1] = [
            a("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : u(e.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), O = /* @__PURE__ */ f({
  __name: "RButtonPrimary",
  setup(o) {
    return (t, i) => (s(), g(E, { theme: "primary" }, {
      loaderLabel: r(() => [
        u(t.$slots, "loaderSlot")
      ]),
      default: r(() => [
        u(t.$slots, "default")
      ]),
      _: 3
    }));
  }
}), $ = { class: "flex flex-col justify-center items-center h-full text-center" }, A = /* @__PURE__ */ f({
  __name: "RUnfinishedExtensionSetupModule",
  emits: ["finalizedInstallation"],
  setup(o, { emit: t }) {
    const i = t, c = () => {
      i("finalizedInstallation");
    };
    return (b, l) => (s(), p("div", $, [
      l[1] || (l[1] = a("p", { class: "mb-5 text-4xl" }, "🤝", -1)),
      l[2] || (l[2] = a("h1", { class: "font-normal" }, [
        n(" Poulpeo s'engage à protéger et respecter"),
        a("br"),
        n("vos données utilisateurs ")
      ], -1)),
      l[3] || (l[3] = a("p", { class: "mb-10 -colorGrey" }, [
        n(" Merci de confirmer vos préférences de"),
        a("br"),
        n("confidentialité afin d'assurer le bon"),
        a("br"),
        n("fonctionnement de l'extension ")
      ], -1)),
      h(v(O), { onClick: c }, {
        default: r(() => l[0] || (l[0] = [
          n(" Accéder aux réglages ")
        ])),
        _: 1
      })
    ]));
  }
}), N = {
  setup() {
    const o = M(), t = () => {
      o.openExtensionPage("onboarding").catch(console.error);
    };
    return () => L(A, {
      onFinalizedInstallation: t
    });
  }
};
content;
export {
  N as UnfinishedExtensionSetupModule
};
content;
