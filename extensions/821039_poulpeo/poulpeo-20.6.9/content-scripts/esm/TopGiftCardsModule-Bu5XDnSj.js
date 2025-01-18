import { d as u, _ as h, f as m, o as f, c as C, a as c, F as k, z as _, w as G, g as v, af as b, O as M, ad as S, j as T, a9 as p } from "./esm-index-C1muFETj.js";
import { B as g } from "./r-merchant-card-BYQ_DtoX.js";
import { u as y } from "./useOfferActions-OtLBdQJ2.js";
import { u as x } from "./containersContentStore-5bollcB3.js";
const B = /* @__PURE__ */ u({
  __name: "TopGiftCards",
  props: {
    merchantList: {}
  },
  emits: ["topGiftCardClick", "topGiftCardsSeeMoreClick"],
  setup(d, { expose: t, emit: s }) {
    t();
    const r = s, o = { emits: r, handleTopGiftCardClick: (e, i) => {
      const n = document.getElementById(i) ?? document.body;
      r("topGiftCardClick", e, n);
    }, handleTopGiftCardSeeMoreClick: () => {
      r("topGiftCardsSeeMoreClick");
    }, get RMerchantCard() {
      return g;
    } };
    return Object.defineProperty(o, "__isScriptSetup", { enumerable: !1, value: !0 }), o;
  }
});
content;
const L = { class: "mb-module" }, O = {
  class: "-grid justify-items-center pb-3",
  style: "--grid-columns: 3"
};
function j(d, t, s, r, a, l) {
  const o = m("tag");
  return f(), C("div", L, [
    c("div", { class: "flex items-center justify-between mb-3" }, [
      t[0] || (t[0] = c("h2", { class: "mb-0" }, "Cashback sur bons d’achat", -1)),
      c("a", {
        small: "",
        inverted: "",
        class: "cursor-pointer text-xs hover:no-underline",
        onClick: r.handleTopGiftCardSeeMoreClick
      }, " Voir plus ")
    ]),
    c("div", O, [
      (f(!0), C(k, null, _(s.merchantList, (e, i) => G((f(), v(r.RMerchantCard, {
        id: `TopGiftCardsModule_Offer${e.offer.id}`,
        key: i,
        merchant: e,
        offer: e.offer,
        size: "M",
        onClick: (n) => r.handleTopGiftCardClick(
          e.offer,
          `TopGiftCardsModule_Offer${e.offer.id}`
        )
      }, null, 8, ["id", "merchant", "offer", "onClick"])), [
        [o, {
          position: i + 1,
          linkedEntities: { merchant: e, offer: e.offer }
        }]
      ])), 128))
    ])
  ]);
}
const w = /* @__PURE__ */ h(B, [["render", j], ["__file", "TopGiftCards.vue"]]), $ = {
  async setup() {
    const d = b(), t = x(), s = M(), { selectedMenuItemId: r } = S(s), a = T([]);
    try {
      await d.checkStorageHealth().then(
        () => Promise.all([
          t.fetchPopularGiftCardCashbackContainer(),
          t.fetchLiveGiftCardCashbackContainer()
        ])
      ), a.value = [
        ...t.popularGiftCardCashbackContainerMerchants,
        ...t.liveGiftCardCashbackContainerMerchants
      ].filter(
        (o, e, i) => i.findIndex((n) => n.id === o.id) === e
      ).slice(0, 12);
    } catch (o) {
      s.setError(o);
    }
    const l = () => {
      r.value = "giftCardCashback";
    };
    return () => a.value.length === 0 ? p("div") : p(w, {
      merchantList: a.value,
      onTopGiftCardClick: y().openUrl,
      onTopGiftCardsSeeMoreClick: l
    });
  }
};
content;
export {
  $ as TopGiftCardsModule
};
content;
