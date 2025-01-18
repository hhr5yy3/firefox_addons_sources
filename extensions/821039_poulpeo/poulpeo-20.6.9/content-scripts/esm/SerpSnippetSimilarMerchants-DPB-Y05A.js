import { S as c } from "./SerpSnippetMerchantLightList-AtRWd-p3.js";
import { u as o } from "./useMerchantActions-CyX3gu4q.js";
import { d as l, s as p, _ as m, o as h, c as d, a as u, q as S, n as f } from "./esm-index-C1muFETj.js";
const _ = /* @__PURE__ */ l({
  __name: "SerpSnippetSimilarMerchants",
  props: {
    merchant: {},
    similarMerchants: {}
  },
  setup(n, { expose: t }) {
    t();
    const e = p("businessService");
    if (e == null)
      throw Error("Injection for businessService failed");
    const { openUrl: r } = o(), a = { businessService: e, openUrl: r, handleMerchantClick: (i) => {
      r(i);
    }, SerpSnippetMerchantLightList: c };
    return Object.defineProperty(a, "__isScriptSetup", { enumerable: !1, value: !0 }), a;
  }
});
content;
function M(n, t, e, r, s, a) {
  return h(), d("div", {
    class: f(["color-serp-text-light dark:color-serp-text-dark subpixel-antialiased", ["m-serpSnippetSimilarMerchants"]])
  }, [
    t[0] || (t[0] = u("div", { class: "mb-1.5 text-sm leading-5.5" }, " Recherches associées proposant le cashback & Codes promo Poulpeo ", -1)),
    S(r.SerpSnippetMerchantLightList, {
      "merchants-tagging-label-suffix": `AsSimilarMerchantOf${e.merchant.id}`,
      "max-initial-visible-merchant-count": 3,
      merchants: e.similarMerchants,
      onMerchantClick: r.handleMerchantClick
    }, null, 8, ["merchants-tagging-label-suffix", "merchants"])
  ]);
}
const k = /* @__PURE__ */ m(_, [["render", M], ["__file", "SerpSnippetSimilarMerchants.vue"]]);
export {
  k as default
};
content;
