import { d as v, p as L, e as m, o as t, c as u, a as c, t as p, u as r, h as M, g as k, i as b, b as C, r as g, j as P, k as R, F as A, n as _, l as w, ad as O, O as x, a9 as U } from "./esm-index-C1muFETj.js";
import { a as j } from "./useMerchantActions-DQd7fZJe.js";
const q = {
  key: 1,
  class: "inline-flex"
}, E = /* @__PURE__ */ v({
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
  setup(i) {
    const l = i, o = P(!1), n = P(!0), a = R(), s = m(() => l.loading || o.value), f = m(() => a.href !== void 0 && a.href !== null ? "a" : l.tag);
    return (e, d) => (t(), k(w(f.value), {
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
      disabled: s.value || e.disabled || e.disabledState ? "" : null,
      onClick: d[0] || (d[0] = (h) => n.value = !0)
    }, {
      default: b(() => [
        s.value ? g(e.$slots, "loaderSlot", { key: 0 }, () => [
          e.loaderLabel ? (t(), u(A, { key: 0 }, [
            C(p(e.loaderLabel), 1)
          ], 64)) : (t(), u("span", q, d[1] || (d[1] = [
            c("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : g(e.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), F = /* @__PURE__ */ v({
  __name: "RButtonPrimary",
  setup(i) {
    return (l, o) => (t(), k(E, { theme: "primary" }, {
      loaderLabel: b(() => [
        g(l.$slots, "loaderSlot")
      ]),
      default: b(() => [
        g(l.$slots, "default")
      ]),
      _: 3
    }));
  }
}), N = { class: "mb-module" }, T = { class: "relative w-full flex items-center justify-between mb-3 mt-4" }, V = { class: "flex flex-col" }, $ = { class: "mb-1" }, D = {
  key: 0,
  class: "mb-0 -colorGrey"
}, I = {
  key: 1,
  class: "mb-0 -colorGrey"
}, G = { class: "flex items-center justify-center shrink-0 w-8.5 h-8.5 rounded-full -box" }, z = {
  key: 0,
  class: "text-2xl"
}, H = {
  key: 1,
  class: "fa-light fa-user text-xl"
}, J = /* @__PURE__ */ v({
  __name: "RUserConnectionStatusModule",
  props: {
    login: { default: "" },
    isLogged: { type: Boolean, default: !1 },
    isPoulpeoPlus: { type: Boolean, default: !1 },
    acceptedPlusPendingEarningsAmount: { default: 0 }
  },
  emits: ["loginRequest"],
  setup(i, { emit: l }) {
    const o = i, { login: n, isLogged: a, isPoulpeoPlus: s, acceptedPlusPendingEarningsAmount: f } = L(o), e = m(() => {
      var y;
      return ((y = n.value[0]) == null ? void 0 : y.toUpperCase()) ?? "";
    }), d = m(
      () => new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
      }).format(f.value)
    ), h = l, S = () => {
      h("loginRequest");
    };
    return (y, B) => (t(), u("div", N, [
      c("div", T, [
        c("div", V, [
          c("h2", $, "Bonjour " + p(r(n) ?? ""), 1),
          r(a) ? (t(), u("p", D, p(r(s) ? "Membre Poulpeo+ /" : "") + " " + p(d.value), 1)) : (t(), u("p", I, " Vous êtes actuellement hors ligne "))
        ]),
        c("div", G, [
          r(a) ? (t(), u("span", z, p(e.value), 1)) : (t(), u("i", H))
        ])
      ]),
      r(a) ? M("", !0) : (t(), k(r(F), {
        key: 0,
        class: "mb-6",
        block: "",
        onClick: S
      }, {
        default: b(() => B[0] || (B[0] = [
          C(" Me connecter ")
        ])),
        _: 1
      }))
    ]));
  }
}), W = {
  setup() {
    const i = () => {
      j().requestAuthModalDisplay({
        initialMode: "logIn",
        merchant: x().selectedMerchant
      });
    }, { user: l } = O(x());
    return () => {
      var o, n, a, s;
      return U(J, {
        onLoginRequest: i,
        isLogged: (o = l.value) == null ? void 0 : o.isLogged,
        isPoulpeoPlus: (n = l.value) == null ? void 0 : n.isPoulpeoPlus,
        login: (a = l.value) == null ? void 0 : a.login,
        acceptedPlusPendingEarningsAmount: (s = l.value) == null ? void 0 : s.earningsAmount.acceptedPlusPending
      });
    };
  }
};
content;
export {
  W as UserConnectionStatusModule
};
content;
