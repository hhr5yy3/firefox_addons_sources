import { d as E, af as N, O as R, ab as P, ad as B, j as z, C as V, _ as j, f as _, o as s, c as i, w as f, a as r, b as v, q as A, i as U, F as x, z as G, g as M, h as g } from "./esm-index-C1muFETj.js";
import { L as F } from "./r-carousel-DrESFiDf.js";
import { B as $ } from "./r-merchant-card-BYQ_DtoX.js";
import { F as q } from "./r-merchant-card-pictured-0hFV0eVK.js";
import { u as D } from "./useOfferActions-OtLBdQJ2.js";
import { u as H } from "./containersContentStore-5bollcB3.js";
import { c as L } from "./useMerchantActions-CyX3gu4q.js";
const X = /* @__PURE__ */ E({
  __name: "GiftCardCashbackTabContent",
  setup(S, { expose: a }) {
    a();
    const d = N(), t = H(), C = R(), u = P("gift_card_cashback_tab_seen"), { openUrl: n } = D(), {
      liveGiftCardCashbackContainerMerchants: c,
      liveGiftCardCashbackContainerTechnicalName: e,
      popularGiftCardCashbackContainerMerchants: l,
      popularGiftCardCashbackContainerTechnicalName: b
    } = B(t), h = z(null), O = (o, y) => {
      var m;
      const p = (m = h.value) == null ? void 0 : m.querySelector(`#${y}`);
      p != null && n(o, p);
    }, T = () => {
      const o = L(
        "https://www.poulpeo.com/classement-et-selection-des-offres.html"
      );
      open(o, "_blank");
    }, w = () => {
      const o = L(
        "https://www.poulpeo.com/cashback-bon-d-achat.html"
      );
      open(o, "_blank");
    };
    V(() => {
      d.checkStorageHealth().then(
        () => Promise.all([
          t.fetchPopularGiftCardCashbackContainer(),
          t.fetchLiveGiftCardCashbackContainer()
        ])
      ).then(() => {
        u.value = !0;
      }).catch((o) => {
        C.setError(
          o instanceof Error ? o : new Error("Unable to fetch gift card cashback tab content")
        );
      });
    });
    const k = { businessService: d, containersContentStore: t, sidebarStore: C, giftCardCashbackTabSeen: u, openOfferUrl: n, liveGiftCardCashbackContainerMerchants: c, liveGiftCardCashbackContainerTechnicalName: e, popularGiftCardCashbackContainerMerchants: l, popularGiftCardCashbackContainerTechnicalName: b, tabEl: h, handleOfferClick: O, handleAboutMerchantOffersRankingClick: T, handleSeeMoreClick: w, get RCarousel() {
      return F;
    }, get RMerchantCard() {
      return $;
    }, get RMerchantCardPictured() {
      return q;
    } };
    return Object.defineProperty(k, "__isScriptSetup", { enumerable: !1, value: !0 }), k;
  }
});
content;
const I = { ref: "tabEl" }, J = { class: "mb-module" }, K = {
  key: 0,
  class: "mb-module"
}, Q = { key: 1 }, W = { class: "flex justify-between align-center items-center mb-3" }, Y = {
  class: "-grid justify-items-center pb-3",
  style: "--grid-columns: 3"
};
function Z(S, a, d, t, C, u) {
  const n = _("tag"), c = _("track");
  return s(), i("div", I, [
    f((s(), i("div", J, [
      r("p", {
        class: "mb-6 py-0.5 text-center text-xxs cursor-pointer",
        onClick: t.handleAboutMerchantOffersRankingClick
      }, " À propos du classement des offres "),
      a[1] || (a[1] = r("h2", { class: "mb-1 text-center" }, "Cashback sur bons d'achat", -1)),
      a[2] || (a[2] = r("p", { class: "text-center text-xs mb-3 -colorGrey" }, [
        v(" Achetez un bon d’achat valable en ligne et en magasin"),
        r("br"),
        v(" et profitez du cashback immédiat ! ")
      ], -1))
    ])), [
      [n, { label: "GiftCardCashbackTabHeaderModule" }],
      [c, "extension_component_click", "click"]
    ]),
    t.popularGiftCardCashbackContainerMerchants.length > 0 ? f((s(), i("div", K, [
      a[3] || (a[3] = r("h2", { class: "mb-3" }, "Bons d’achat à la une", -1)),
      A(t.RCarousel, null, {
        default: U(() => [
          (s(!0), i(x, null, G(t.popularGiftCardCashbackContainerMerchants, (e, l) => f((s(), M(t.RMerchantCardPictured, {
            id: `PopularGiftCardCashbackListModule_Offer${e.offer.id}`,
            key: e.id,
            merchant: e,
            offer: e.offer,
            size: "XL",
            onClick: (b) => t.handleOfferClick(
              e.offer,
              `PopularGiftCardCashbackListModule_Offer${e.offer.id}`
            )
          }, null, 8, ["id", "merchant", "offer", "onClick"])), [
            [n, {
              position: l + 1,
              linkedEntities: {
                container: {
                  technicalName: t.popularGiftCardCashbackContainerTechnicalName
                },
                merchant: e,
                offer: e.offer
              }
            }]
          ])), 128))
        ]),
        _: 1
      })
    ])), [
      [n, { label: "PopularGiftCardCashbackListModule" }],
      [c, "extension_component_click", "click"]
    ]) : g("", !0),
    t.liveGiftCardCashbackContainerMerchants.length > 0 ? f((s(), i("div", Q, [
      r("div", W, [
        a[4] || (a[4] = r("h2", { class: "mb-0" }, "La sélection du moment", -1)),
        r("a", {
          class: "text-xs cursor-pointer hover:no-underline",
          onClick: a[0] || (a[0] = (e) => t.handleSeeMoreClick())
        }, " Voir plus ")
      ]),
      r("div", Y, [
        (s(!0), i(x, null, G(t.liveGiftCardCashbackContainerMerchants, (e, l) => f((s(), M(t.RMerchantCard, {
          id: `LiveGiftCardCashbackListModule_Offer${e.offer.id}`,
          key: e.id,
          merchant: e,
          offer: e.offer,
          size: "M",
          onClick: (b) => t.handleOfferClick(
            e.offer,
            `LiveGiftCardCashbackListModule_Offer${e.offer.id}`
          )
        }, null, 8, ["id", "merchant", "offer", "onClick"])), [
          [n, {
            position: l + 1,
            linkedEntities: {
              container: {
                technicalName: t.liveGiftCardCashbackContainerTechnicalName
              },
              merchant: e,
              offer: e.offer
            }
          }]
        ])), 128))
      ])
    ])), [
      [n, { label: "LiveGiftCardCashbackListModule" }],
      [c, "extension_component_click", "click"]
    ]) : g("", !0)
  ], 512);
}
const ie = /* @__PURE__ */ j(X, [["render", Z], ["__file", "GiftCardCashbackTabContent.vue"]]);
export {
  ie as default
};
content;
