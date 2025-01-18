import { d as p, e as o, o as s, c as t, a as n, n as u, t as x, g as C, u as w, h as f, F as d, b as k } from "./esm-index-C1muFETj.js";
const y = { class: "text-xs text-grey-100 -truncate" }, z = /* @__PURE__ */ p({
  __name: "RMerchantOfferSummary",
  props: {
    nbOffers: { default: 0 },
    shortCashbackText: { default: "" },
    giftCardCashback: { default: void 0 },
    condensed: { type: Boolean, default: !1 },
    full: { type: Boolean, default: !1 }
  },
  setup(v) {
    const r = v, e = o(
      () => r.giftCardCashback !== void 0 && r.giftCardCashback.cashbackRate > 0
    ), a = o(
      () => r.shortCashbackText.length > 0 && (!e.value || r.full)
    ), c = o(() => r.nbOffers > 0), h = o(
      () => a.value && e.value
    ), b = o(
      () => c.value && (a.value || r.full && e.value)
    );
    return (l, i) => {
      var m;
      return s(), t("span", y, [
        a.value ? (s(), t(d, { key: 0 }, [
          i[0] || (i[0] = n("i", { class: "fa-light fa-coins" }, null, -1)),
          k(" " + x(l.shortCashbackText), 1)
        ], 64)) : f("", !0),
        e.value ? (s(), t(d, { key: 1 }, [
          h.value ? (s(), t("span", {
            key: 0,
            class: u([{ "mx-0.5": l.condensed, "mx-1.5": !l.condensed }, "text-[7px] align-middle"])
          }, " | ", 2)) : f("", !0),
          i[1] || (i[1] = n("i", { class: "fa-light fa-gift-card" }, null, -1)),
          k(" " + x((m = l.giftCardCashback) == null ? void 0 : m.cashbackRateText), 1)
        ], 64)) : f("", !0),
        !e.value || l.full ? (s(), t(d, { key: 2 }, [
          b.value ? (s(), t("span", {
            key: 0,
            class: u([{ "mx-0.5": l.condensed, "mx-1.5": !l.condensed }, "text-[7px] align-middle"])
          }, " | ", 2)) : f("", !0),
          c.value ? (s(), t(d, { key: 1 }, [
            i[2] || (i[2] = n("i", { class: "fa-light fa-tags" }, null, -1)),
            k(" " + x(l.nbOffers), 1)
          ], 64)) : f("", !0)
        ], 64)) : f("", !0)
      ]);
    };
  }
}), S = ["data-state"], _ = ["src", "alt"], M = {
  key: 0,
  class: "[ a-flag -autoPlacement -small -superCashback ]"
}, L = {
  key: 1,
  class: "[ a-flag -autoPlacement -small -superCashback ]"
}, O = {
  key: 2,
  class: "[ a-flag -autoPlacement -small -primary ]"
}, T = /* @__PURE__ */ p({
  __name: "RMerchantCard",
  props: {
    merchant: {},
    offer: { default: void 0 },
    size: { default: "M" }
  },
  setup(v) {
    const r = v, e = o(
      () => {
        var a;
        return r.merchant.extensionOffersStatus && ((a = r.offer) == null ? void 0 : a.giftCardCashback);
      }
    );
    return (a, c) => {
      var h, b, l, i, m, g;
      return s(), t("div", {
        class: u(["[ m-merchantCard ] relative group flex items-center bg-white p-2 overflow-hidden cursor-pointer", {
          "flex-row text-left min-w-44 w-44": a.size === "S",
          "[ -box ] flex-col justify-between text-center": a.size !== "S",
          "min-w-23 w-23 h-29": a.size === "M",
          "min-w-28 w-28 h-36": a.size === "L",
          "min-w-54 w-54 h-32 p-4": a.size === "XL"
        }]),
        "data-state": a.size
      }, [
        n("div", {
          class: u({
            "[ m-merchantCard__cardContainer ] flex items-center justify-self-center p-1 rounded-lg": e.value,
            "w-19 h-12.5": e.value && a.size === "M",
            "w-24 h-16 mt-2": e.value && a.size === "L",
            "flex justify-center items-center w-16.5 h-15": !e.value && a.size === "M",
            "flex justify-center items-center w-full h-20": !e.value && a.size === "L"
          })
        }, [
          n("img", {
            class: u(["[ m-merchantCard__logo ]", {
              "m-0 mix-blend-multiply": e.value,
              "max-w-11 h-7": a.size === "S",
              "w-full max-w-15.5": a.size === "M",
              "w-full": a.size === "L",
              "w-20 max-h-12 object-contain": a.size === "XL"
            }]),
            src: a.merchant.logoUrl,
            alt: a.merchant.name
          }, null, 10, _)
        ], 2),
        n("div", {
          class: u(["[ m-merchantCard__content ] block w-full", {
            "ml-2.5 max-w-[150px]": a.size === "S",
            // max-w = ugly fix for a nice text ellipsis in flex mode
            "mt-2.5": e.value && a.size === "M"
          }])
        }, [
          n("h4", {
            class: u(["[ m-merchantCard__title ] -truncate", {
              "mb-0": a.size === "S",
              "mb-1 text-xs": a.size === "M",
              "mb-1 text-sm": a.size === "L",
              "[ -h3 ] mb-1 text-sm": a.size === "XL"
            }])
          }, x(a.merchant.name), 3),
          a.merchant.extensionOffersStatus ? (s(), C(w(z), {
            key: 0,
            "nb-offers": ((h = a.merchant.merchantInfo) == null ? void 0 : h.nbOffers) ?? 0,
            "short-cashback-text": (b = a.merchant.cashback) == null ? void 0 : b.shortCashbackText,
            "gift-card-cashback": (l = a.offer) == null ? void 0 : l.giftCardCashback,
            condensed: a.size === "M"
          }, null, 8, ["nb-offers", "short-cashback-text", "gift-card-cashback", "condensed"])) : f("", !0)
        ], 2),
        a.merchant.extensionOffersStatus ? (s(), t(d, { key: 0 }, [
          (i = a.offer) != null && i.giftCardCashback ? (s(), t("div", M, c[0] || (c[0] = [
            n("i", { class: "fa-solid fa-bolt" }, null, -1)
          ]))) : (m = a.merchant.cashback) != null && m.isSuperCashback ? (s(), t("div", L, c[1] || (c[1] = [
            n("i", { class: "fa-regular fa-fire" }, null, -1)
          ]))) : (g = a.merchant.cashback) != null && g.hasIncrease ? (s(), t("div", O, c[2] || (c[2] = [
            n("i", { class: "fa-solid fa-arrow-up" }, null, -1)
          ]))) : f("", !0)
        ], 64)) : f("", !0)
      ], 10, S);
    };
  }
});
export {
  T as B
};
content;
