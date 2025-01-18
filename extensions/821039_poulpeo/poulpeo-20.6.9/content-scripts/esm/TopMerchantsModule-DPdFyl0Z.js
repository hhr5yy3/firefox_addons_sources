import { d as x, f as y, o as s, c, a as i, F as v, z, w as S, g as M, u as w, e as k, n as f, t as b, h as m, b as C, af as L, O as _, ad as T, j as O, a9 as g } from "./esm-index-C1muFETj.js";
import { u as j } from "./useMerchantActions-DQd7fZJe.js";
import { u as B } from "./containersContentStore-5bollcB3.js";
const I = { class: "text-xs text-grey-100 -truncate" }, R = /* @__PURE__ */ x({
  __name: "RMerchantOfferSummary",
  props: {
    nbOffers: { default: 0 },
    shortCashbackText: { default: "" },
    giftCardCashback: { default: void 0 },
    condensed: { type: Boolean, default: !1 },
    full: { type: Boolean, default: !1 }
  },
  setup(d) {
    const t = d, a = k(
      () => t.giftCardCashback !== void 0 && t.giftCardCashback.cashbackRate > 0
    ), e = k(
      () => t.shortCashbackText.length > 0 && (!a.value || t.full)
    ), n = k(() => t.nbOffers > 0), o = k(
      () => e.value && a.value
    ), u = k(
      () => n.value && (e.value || t.full && a.value)
    );
    return (r, l) => {
      var h;
      return s(), c("span", I, [
        e.value ? (s(), c(v, { key: 0 }, [
          l[0] || (l[0] = i("i", { class: "fa-light fa-coins" }, null, -1)),
          C(" " + b(r.shortCashbackText), 1)
        ], 64)) : m("", !0),
        a.value ? (s(), c(v, { key: 1 }, [
          o.value ? (s(), c("span", {
            key: 0,
            class: f([{ "mx-0.5": r.condensed, "mx-1.5": !r.condensed }, "text-[7px] align-middle"])
          }, " | ", 2)) : m("", !0),
          l[1] || (l[1] = i("i", { class: "fa-light fa-gift-card" }, null, -1)),
          C(" " + b((h = r.giftCardCashback) == null ? void 0 : h.cashbackRateText), 1)
        ], 64)) : m("", !0),
        !a.value || r.full ? (s(), c(v, { key: 2 }, [
          u.value ? (s(), c("span", {
            key: 0,
            class: f([{ "mx-0.5": r.condensed, "mx-1.5": !r.condensed }, "text-[7px] align-middle"])
          }, " | ", 2)) : m("", !0),
          n.value ? (s(), c(v, { key: 1 }, [
            l[2] || (l[2] = i("i", { class: "fa-light fa-tags" }, null, -1)),
            C(" " + b(r.nbOffers), 1)
          ], 64)) : m("", !0)
        ], 64)) : m("", !0)
      ]);
    };
  }
}), V = ["data-state"], D = ["src", "alt"], N = {
  key: 0,
  class: "[ a-flag -autoPlacement -small -superCashback ]"
}, P = {
  key: 1,
  class: "[ a-flag -autoPlacement -small -superCashback ]"
}, E = {
  key: 2,
  class: "[ a-flag -autoPlacement -small -primary ]"
}, X = /* @__PURE__ */ x({
  __name: "RMerchantCard",
  props: {
    merchant: {},
    offer: { default: void 0 },
    size: { default: "M" }
  },
  setup(d) {
    const t = d, a = k(
      () => {
        var e;
        return t.merchant.extensionOffersStatus && ((e = t.offer) == null ? void 0 : e.giftCardCashback);
      }
    );
    return (e, n) => {
      var o, u, r, l, h, p;
      return s(), c("div", {
        class: f(["[ m-merchantCard ] relative group flex items-center bg-white p-2 overflow-hidden cursor-pointer", {
          "flex-row text-left min-w-44 w-44": e.size === "S",
          "[ -box ] flex-col justify-between text-center": e.size !== "S",
          "min-w-23 w-23 h-29": e.size === "M",
          "min-w-28 w-28 h-36": e.size === "L",
          "min-w-54 w-54 h-32 p-4": e.size === "XL"
        }]),
        "data-state": e.size
      }, [
        i("div", {
          class: f({
            "[ m-merchantCard__cardContainer ] flex items-center justify-self-center p-1 rounded-lg": a.value,
            "w-19 h-12.5": a.value && e.size === "M",
            "w-24 h-16 mt-2": a.value && e.size === "L",
            "flex justify-center items-center w-16.5 h-15": !a.value && e.size === "M",
            "flex justify-center items-center w-full h-20": !a.value && e.size === "L"
          })
        }, [
          i("img", {
            class: f(["[ m-merchantCard__logo ]", {
              "m-0 mix-blend-multiply": a.value,
              "max-w-11 h-7": e.size === "S",
              "w-full max-w-15.5": e.size === "M",
              "w-full": e.size === "L",
              "w-20 max-h-12 object-contain": e.size === "XL"
            }]),
            src: e.merchant.logoUrl,
            alt: e.merchant.name
          }, null, 10, D)
        ], 2),
        i("div", {
          class: f(["[ m-merchantCard__content ] block w-full", {
            "ml-2.5 max-w-[150px]": e.size === "S",
            // max-w = ugly fix for a nice text ellipsis in flex mode
            "mt-2.5": a.value && e.size === "M"
          }])
        }, [
          i("h4", {
            class: f(["[ m-merchantCard__title ] -truncate", {
              "mb-0": e.size === "S",
              "mb-1 text-xs": e.size === "M",
              "mb-1 text-sm": e.size === "L",
              "[ -h3 ] mb-1 text-sm": e.size === "XL"
            }])
          }, b(e.merchant.name), 3),
          e.merchant.extensionOffersStatus ? (s(), M(w(R), {
            key: 0,
            "nb-offers": ((o = e.merchant.merchantInfo) == null ? void 0 : o.nbOffers) ?? 0,
            "short-cashback-text": (u = e.merchant.cashback) == null ? void 0 : u.shortCashbackText,
            "gift-card-cashback": (r = e.offer) == null ? void 0 : r.giftCardCashback,
            condensed: e.size === "M"
          }, null, 8, ["nb-offers", "short-cashback-text", "gift-card-cashback", "condensed"])) : m("", !0)
        ], 2),
        e.merchant.extensionOffersStatus ? (s(), c(v, { key: 0 }, [
          (l = e.offer) != null && l.giftCardCashback ? (s(), c("div", N, n[0] || (n[0] = [
            i("i", { class: "fa-solid fa-bolt" }, null, -1)
          ]))) : (h = e.merchant.cashback) != null && h.isSuperCashback ? (s(), c("div", P, n[1] || (n[1] = [
            i("i", { class: "fa-regular fa-fire" }, null, -1)
          ]))) : (p = e.merchant.cashback) != null && p.hasIncrease ? (s(), c("div", E, n[2] || (n[2] = [
            i("i", { class: "fa-solid fa-arrow-up" }, null, -1)
          ]))) : m("", !0)
        ], 64)) : m("", !0)
      ], 10, V);
    };
  }
}), F = { class: "mb-module" }, U = {
  class: "-grid justify-items-center pb-3",
  style: {
    "--grid-columns": "3"
  }
}, q = /* @__PURE__ */ x({
  __name: "RTopMerchants",
  props: {
    merchantCardSize: { default: "M" },
    merchantList: {}
  },
  emits: ["topMerchantClick", "topMerchantsSeeMoreClick"],
  setup(d, { emit: t }) {
    const a = t, e = (o) => {
      a("topMerchantClick", o);
    }, n = () => {
      a("topMerchantsSeeMoreClick");
    };
    return (o, u) => {
      const r = y("tag");
      return s(), c("div", F, [
        i("div", { class: "flex items-center justify-between mb-3" }, [
          u[0] || (u[0] = i("h2", { class: "mb-0" }, "Les boutiques populaires", -1)),
          i("a", {
            small: "",
            inverted: "",
            class: "cursor-pointer text-xs hover:no-underline",
            onClick: n
          }, " Voir plus ")
        ]),
        i("div", U, [
          (s(!0), c(v, null, z(o.merchantList, (l, h) => S((s(), M(w(X), {
            key: h,
            merchant: l,
            size: o.merchantCardSize,
            onClick: (p) => e(l)
          }, null, 8, ["merchant", "size", "onClick"])), [
            [r, { position: h + 1, linkedEntities: { merchant: l } }]
          ])), 128))
        ])
      ]);
    };
  }
}), J = {
  async setup() {
    const d = L(), t = B(), a = _(), { selectedMenuItemId: e } = T(a), n = O([]);
    try {
      await d.checkStorageHealth().then(
        () => Promise.all([
          t.fetchLiveSuperCashbackContainer(),
          t.fetchLiveCashbackIncreaseContainer()
        ])
      ), n.value = [
        ...t.liveSuperCashbackContainerMerchants,
        ...t.liveCashbackIncreaseContainerMerchants
      ].filter(
        (u, r, l) => l.findIndex((h) => h.id === u.id) === r
      ).slice(0, 12);
    } catch (u) {
      a.setError(u);
    }
    const o = () => {
      e.value = "superCashback";
    };
    return () => n.value.length === 0 ? g("div") : g(q, {
      merchantList: n.value,
      onTopMerchantClick: j().openUrl,
      onTopMerchantsSeeMoreClick: o
    });
  }
};
content;
export {
  J as TopMerchantsModule
};
content;
