import { d as B, af as y, O as w, ad as P, j, e as T, aj as h, _ as V, o as E, c as H, a as s, t as d, q as I, i as F, T as N, h as O } from "./esm-index-C1muFETj.js";
import { E as R } from "./SidebarManager-CoX2oc26.js";
import { u as U } from "./useMerchantActions-DQd7fZJe.js";
const v = 1042, x = 1477, q = /* @__PURE__ */ B({
  __name: "HighlightedSimilarMerchantModule",
  setup(M, { expose: o }) {
    o();
    const n = y(), e = w(), { openPoulpeoUrl: c, openUrl: l } = U(), { now: a, selectedMerchant: r, similarMerchants: u } = P(e), i = j(void 0), m = () => {
      n.getMerchantById(x).then((t) => {
        i.value = t;
      }).catch(console.error);
    }, k = (t) => {
      t !== void 0 && (t.extensionOffersStatus ? l(t) : c(t));
    }, S = T(() => {
      var _, p, b;
      const t = a.value.getTime();
      if (h((_ = r.value) == null ? void 0 : _.cashback, t))
        return;
      const f = ((p = r.value) == null ? void 0 : p.id) === v;
      return f && i.value === void 0 && m(), f && h((b = i.value) == null ? void 0 : b.cashback, t) ? i.value : u.value.filter(
        (C) => h(C.cashback, t)
      )[0];
    }), g = { businessService: n, store: e, openPoulpeoUrl: c, openUrl: l, now: a, selectedMerchant: r, similarMerchants: u, bookingComId: v, hotelsComFrId: x, hotelsComFr: i, getHotelsComFr: m, handleButtonClick: k, highlightedSimilarMerchant: S, get RButtonPrimary() {
      return R;
    } };
    return Object.defineProperty(g, "__isScriptSetup", { enumerable: !1, value: !0 }), g;
  }
});
content;
const z = {
  key: 0,
  class: "mb-module rounded px-3 py-6 flex flex-col gap-4 text-center bg-primary-light"
}, A = { class: "[ -box ] flex items-center justify-self-center w-23.5 h-20 m-auto p-2 bg-white" }, D = ["src", "alt"], L = { class: "max-w-[720px] inline-block text-left text-ellipsis overflow-hidden" };
function G(M, o, n, e, c, l) {
  var a;
  return ((a = e.highlightedSimilarMerchant) == null ? void 0 : a.cashback) !== void 0 ? (E(), H("div", z, [
    s("picture", A, [
      s("img", {
        class: "max-h-18",
        src: e.highlightedSimilarMerchant.logoUrl,
        alt: `Logo ${e.highlightedSimilarMerchant.name}`
      }, null, 8, D)
    ]),
    s("p", null, " Poulpeo vous propose une alternative chez le marchand " + d(e.highlightedSimilarMerchant.name) + " avec un taux de cashback " + d(e.highlightedSimilarMerchant.cashback.isVariable ? ` jusqu’à ${e.highlightedSimilarMerchant.cashback.shortCashbackText}` : ` à ${e.highlightedSimilarMerchant.cashback.shortCashbackText}`), 1),
    I(e.RButtonPrimary, {
      onClick: o[0] || (o[0] = N((r) => e.handleButtonClick(e.highlightedSimilarMerchant), ["stop"]))
    }, {
      default: F(() => [
        s("span", L, " Profiter du cashback " + d(e.highlightedSimilarMerchant.name), 1)
      ]),
      _: 1
    })
  ])) : O("", !0);
}
const W = /* @__PURE__ */ V(q, [["render", G], ["__file", "HighlightedSimilarMerchantModule.vue"]]);
export {
  W as default
};
content;
