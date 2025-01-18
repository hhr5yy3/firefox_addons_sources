import { d as C, p as z, e as m, o as t, c as l, a as r, t as p, F as v, z as S, g as w, u as g, n as b, h as f, b as k, O as M, af as L, ad as _, a9 as O } from "./esm-index-C1muFETj.js";
const R = { class: "text-xs text-grey-100 -truncate" }, B = /* @__PURE__ */ C({
  __name: "RMerchantOfferSummary",
  props: {
    nbOffers: { default: 0 },
    shortCashbackText: { default: "" },
    giftCardCashback: { default: void 0 },
    condensed: { type: Boolean, default: !1 },
    full: { type: Boolean, default: !1 }
  },
  setup(d) {
    const n = d, a = m(
      () => n.giftCardCashback !== void 0 && n.giftCardCashback.cashbackRate > 0
    ), e = m(
      () => n.shortCashbackText.length > 0 && (!a.value || n.full)
    ), c = m(() => n.nbOffers > 0), o = m(
      () => e.value && a.value
    ), h = m(
      () => c.value && (e.value || n.full && a.value)
    );
    return (s, i) => {
      var u;
      return t(), l("span", R, [
        e.value ? (t(), l(v, { key: 0 }, [
          i[0] || (i[0] = r("i", { class: "fa-light fa-coins" }, null, -1)),
          k(" " + p(s.shortCashbackText), 1)
        ], 64)) : f("", !0),
        a.value ? (t(), l(v, { key: 1 }, [
          o.value ? (t(), l("span", {
            key: 0,
            class: b([{ "mx-0.5": s.condensed, "mx-1.5": !s.condensed }, "text-[7px] align-middle"])
          }, " | ", 2)) : f("", !0),
          i[1] || (i[1] = r("i", { class: "fa-light fa-gift-card" }, null, -1)),
          k(" " + p((u = s.giftCardCashback) == null ? void 0 : u.cashbackRateText), 1)
        ], 64)) : f("", !0),
        !a.value || s.full ? (t(), l(v, { key: 2 }, [
          h.value ? (t(), l("span", {
            key: 0,
            class: b([{ "mx-0.5": s.condensed, "mx-1.5": !s.condensed }, "text-[7px] align-middle"])
          }, " | ", 2)) : f("", !0),
          c.value ? (t(), l(v, { key: 1 }, [
            i[2] || (i[2] = r("i", { class: "fa-light fa-tags" }, null, -1)),
            k(" " + p(s.nbOffers), 1)
          ], 64)) : f("", !0)
        ], 64)) : f("", !0)
      ]);
    };
  }
}), T = ["data-state"], j = ["src", "alt"], N = {
  key: 0,
  class: "[ a-flag -autoPlacement -small -superCashback ]"
}, X = {
  key: 1,
  class: "[ a-flag -autoPlacement -small -superCashback ]"
}, I = {
  key: 2,
  class: "[ a-flag -autoPlacement -small -primary ]"
}, P = /* @__PURE__ */ C({
  __name: "RMerchantCard",
  props: {
    merchant: {},
    offer: { default: void 0 },
    size: { default: "M" }
  },
  setup(d) {
    const n = d, a = m(
      () => {
        var e;
        return n.merchant.extensionOffersStatus && ((e = n.offer) == null ? void 0 : e.giftCardCashback);
      }
    );
    return (e, c) => {
      var o, h, s, i, u, x;
      return t(), l("div", {
        class: b(["[ m-merchantCard ] relative group flex items-center bg-white p-2 overflow-hidden cursor-pointer", {
          "flex-row text-left min-w-44 w-44": e.size === "S",
          "[ -box ] flex-col justify-between text-center": e.size !== "S",
          "min-w-23 w-23 h-29": e.size === "M",
          "min-w-28 w-28 h-36": e.size === "L",
          "min-w-54 w-54 h-32 p-4": e.size === "XL"
        }]),
        "data-state": e.size
      }, [
        r("div", {
          class: b({
            "[ m-merchantCard__cardContainer ] flex items-center justify-self-center p-1 rounded-lg": a.value,
            "w-19 h-12.5": a.value && e.size === "M",
            "w-24 h-16 mt-2": a.value && e.size === "L",
            "flex justify-center items-center w-16.5 h-15": !a.value && e.size === "M",
            "flex justify-center items-center w-full h-20": !a.value && e.size === "L"
          })
        }, [
          r("img", {
            class: b(["[ m-merchantCard__logo ]", {
              "m-0 mix-blend-multiply": a.value,
              "max-w-11 h-7": e.size === "S",
              "w-full max-w-15.5": e.size === "M",
              "w-full": e.size === "L",
              "w-20 max-h-12 object-contain": e.size === "XL"
            }]),
            src: e.merchant.logoUrl,
            alt: e.merchant.name
          }, null, 10, j)
        ], 2),
        r("div", {
          class: b(["[ m-merchantCard__content ] block w-full", {
            "ml-2.5 max-w-[150px]": e.size === "S",
            // max-w = ugly fix for a nice text ellipsis in flex mode
            "mt-2.5": a.value && e.size === "M"
          }])
        }, [
          r("h4", {
            class: b(["[ m-merchantCard__title ] -truncate", {
              "mb-0": e.size === "S",
              "mb-1 text-xs": e.size === "M",
              "mb-1 text-sm": e.size === "L",
              "[ -h3 ] mb-1 text-sm": e.size === "XL"
            }])
          }, p(e.merchant.name), 3),
          e.merchant.extensionOffersStatus ? (t(), w(g(B), {
            key: 0,
            "nb-offers": ((o = e.merchant.merchantInfo) == null ? void 0 : o.nbOffers) ?? 0,
            "short-cashback-text": (h = e.merchant.cashback) == null ? void 0 : h.shortCashbackText,
            "gift-card-cashback": (s = e.offer) == null ? void 0 : s.giftCardCashback,
            condensed: e.size === "M"
          }, null, 8, ["nb-offers", "short-cashback-text", "gift-card-cashback", "condensed"])) : f("", !0)
        ], 2),
        e.merchant.extensionOffersStatus ? (t(), l(v, { key: 0 }, [
          (i = e.offer) != null && i.giftCardCashback ? (t(), l("div", N, c[0] || (c[0] = [
            r("i", { class: "fa-solid fa-bolt" }, null, -1)
          ]))) : (u = e.merchant.cashback) != null && u.isSuperCashback ? (t(), l("div", X, c[1] || (c[1] = [
            r("i", { class: "fa-regular fa-fire" }, null, -1)
          ]))) : (x = e.merchant.cashback) != null && x.hasIncrease ? (t(), l("div", I, c[2] || (c[2] = [
            r("i", { class: "fa-solid fa-arrow-up" }, null, -1)
          ]))) : f("", !0)
        ], 64)) : f("", !0)
      ], 10, T);
    };
  }
}), V = { class: "h-full pt-9 px-5 text-center bg-neutral-50" }, E = { class: "h-6.5 w-54 mb-7 mx-auto text-xs leading-6.5 rounded-lg border border-solid text-center border-neutral-200 bg-neutral-100 -colorGrey -truncate" }, F = { class: "flex items-center flex-col gap-4 pb-9" }, q = /* @__PURE__ */ C({
  __name: "RMerchantSelectorModule",
  props: {
    url: {},
    merchantList: {}
  },
  emits: ["merchantSelected"],
  setup(d, { emit: n }) {
    const a = d, { merchantList: e } = z(a), c = m(() => e.value.length), o = m(() => {
      try {
        return new URL(a.url).hostname;
      } catch {
        return "";
      }
    }), h = n, s = (i, u) => {
      h("merchantSelected", i, u);
    };
    return (i, u) => (t(), l("div", V, [
      r("div", E, p(o.value), 1),
      r("h3", null, " Nous avons détecté " + p(c.value) + " boutiques possibles pour cette adresse ", 1),
      u[0] || (u[0] = r("p", { class: "mb-8 -colorGrey text-sm" }, " Merci de sélectionner celle qui vous semble la plus appropriée ", -1)),
      r("div", F, [
        (t(!0), l(v, null, S(g(e), (x, y) => (t(), w(g(P), {
          key: x.id,
          merchant: x,
          size: "XL",
          onClick: (G) => s(x, y)
        }, null, 8, ["merchant", "onClick"]))), 128))
      ])
    ]));
  }
}), D = {
  setup() {
    const d = M(), n = L(), { availableMerchants: a, url: e } = _(d), c = (o, h) => {
      n.setSelectedMerchantId(o == null ? void 0 : o.id).then(() => {
        d.setSelectedMerchantIndex(h);
      }).catch((s) => {
        d.setError(s);
      });
    };
    return () => O(q, {
      class: "-sidebarModuleFullWidth",
      url: e.value,
      merchantList: a.value,
      onMerchantSelected: c
    });
  }
};
content;
export {
  D as MerchantSelectorModule
};
content;
