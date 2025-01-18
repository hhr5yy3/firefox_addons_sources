import { d as u, j as p, C as k, D as b, _ as g, o, c as h, a as d, f as m, w as v, q as M, b as y, t as _, F as f, z as L, g as C, h as x } from "./esm-index-C1muFETj.js";
const w = /* @__PURE__ */ u({
  __name: "SerpSnippetMerchantLogo",
  props: {
    merchant: {}
  },
  setup(c, { expose: n }) {
    n();
    const e = c, t = p("lazy"), i = p(e.merchant.logoUrl), r = (l) => {
      l.blockedURI === e.merchant.logoUrl && (t.value = "eager", i.value = `${e.merchant.logoUrl}#eager`);
    };
    k(() => {
      document.addEventListener("securitypolicyviolation", r);
    }), b(() => {
      document.removeEventListener("securitypolicyviolation", r);
    });
    const a = { props: e, loading: t, logoUrl: i, cspViolationHandler: r };
    return Object.defineProperty(a, "__isScriptSetup", { enumerable: !1, value: !0 }), a;
  }
});
content;
const V = { class: "inline-flex flex-row items-center w-5 h-5 rounded-[10px] bg-white overflow-hidden" }, B = ["src", "alt", "title", "loading"];
function U(c, n, e, t, i, r) {
  return o(), h("span", V, [
    d("img", {
      src: t.logoUrl,
      alt: `${e.merchant.name} logo`,
      title: e.merchant.name,
      width: "20",
      height: "12",
      loading: t.loading,
      decoding: "async"
    }, null, 8, B)
  ]);
}
const T = /* @__PURE__ */ g(w, [["render", U], ["__file", "SerpSnippetMerchantLogo.vue"]]), j = /* @__PURE__ */ u({
  __name: "SerpSnippetMerchantLight",
  props: {
    merchant: {},
    merchantTaggingLabelSuffix: { default: "" },
    position: { default: 1 }
  },
  setup(c, { expose: n }) {
    n();
    const e = { SerpSnippetMerchantLogo: T };
    return Object.defineProperty(e, "__isScriptSetup", { enumerable: !1, value: !0 }), e;
  }
});
content;
const D = { class: "inline-flex gap-1 flex-row items-center pl-0.5 pr-2.5 py-px rounded-[11px] bg-grey-800 dark:bg-grey-100 text-grey-100 dark:text-grey-600 text-xs leading-5 cursor-pointer" };
function E(c, n, e, t, i, r) {
  var s;
  const a = m("tag"), l = m("track");
  return v((o(), h("div", D, [
    M(t.SerpSnippetMerchantLogo, { merchant: e.merchant }, null, 8, ["merchant"]),
    y(" " + _(e.merchant.name) + " ", 1),
    d("div", null, [
      n[0] || (n[0] = d("i", { class: "inline-block ml-0.5 text-sm align-middle mr-1 fa-light fa-coins" }, null, -1)),
      d("b", null, _(((s = e.merchant.cashback) == null ? void 0 : s.shortCashbackText) ?? "--"), 1)
    ])
  ])), [
    [a, {
      position: e.position,
      label: `Merchant${e.merchant.id}${e.merchantTaggingLabelSuffix}`,
      linkedEntities: { merchant: e.merchant, cashbackOffer: e.merchant.cashback }
    }],
    [l, "extension_component_click", "click"]
  ]);
}
const I = /* @__PURE__ */ g(j, [["render", E], ["__file", "SerpSnippetMerchantLight.vue"]]), N = /* @__PURE__ */ u({
  __name: "SerpSnippetMerchantLightList",
  props: {
    maxInitialVisibleMerchantCount: { default: 9 },
    merchants: {},
    merchantsTaggingLabelSuffix: { default: "" }
  },
  emits: ["merchantClick"],
  setup(c, { expose: n, emit: e }) {
    n();
    const t = c, i = p(
      t.merchants.length <= t.maxInitialVisibleMerchantCount
    ), r = e, s = { props: t, displayAllMerchants: i, emits: r, handleMerchantClick: (S) => {
      r("merchantClick", S);
    }, handleSeeMoreButtonClick: () => {
      i.value = !0;
    }, SerpSnippetMerchantLight: I };
    return Object.defineProperty(s, "__isScriptSetup", { enumerable: !1, value: !0 }), s;
  }
});
content;
const O = { class: "flex gap-2 flex-row flex-wrap" };
function A(c, n, e, t, i, r) {
  return o(), h("div", O, [
    (o(!0), h(f, null, L(e.merchants, (a, l) => (o(), h(f, {
      key: a.id
    }, [
      l < e.maxInitialVisibleMerchantCount || t.displayAllMerchants ? (o(), C(t.SerpSnippetMerchantLight, {
        key: 0,
        "merchant-tagging-label-suffix": e.merchantsTaggingLabelSuffix,
        merchant: a,
        position: l + 1,
        onClick: (s) => t.handleMerchantClick(a)
      }, null, 8, ["merchant-tagging-label-suffix", "merchant", "position", "onClick"])) : x("", !0)
    ], 64))), 128)),
    t.displayAllMerchants ? x("", !0) : (o(), h("div", {
      key: 0,
      class: "w-5.5 text-xs leading-5 text-center cursor-pointer",
      title: "Voir plus",
      onClick: n[0] || (n[0] = (a) => t.handleSeeMoreButtonClick())
    }, n[1] || (n[1] = [
      d("i", { class: "fa-regular fa-ellipsis" }, null, -1)
    ])))
  ]);
}
const $ = /* @__PURE__ */ g(N, [["render", A], ["__file", "SerpSnippetMerchantLightList.vue"]]);
export {
  $ as S
};
content;
