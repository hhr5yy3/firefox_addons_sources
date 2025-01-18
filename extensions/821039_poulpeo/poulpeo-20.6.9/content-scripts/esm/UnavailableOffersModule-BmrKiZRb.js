import { O as h, ad as f, e as m, a9 as r } from "./esm-index-C1muFETj.js";
const p = {
  setup() {
    const u = h(), { selectedMerchant: a, selectedMerchantOffers: c } = f(u), o = m(() => {
      if (a.value == null)
        return "";
      let e = "";
      const l = !!c.value.length, s = !!a.value.cashback, i = a.value.inactiveCashbackMessage !== "", d = c.value.some(
        (n) => {
          var t;
          return (((t = n.giftCardCashback) == null ? void 0 : t.cashbackRate) ?? 0) > 0;
        }
      );
      return !s && i ? e = new DOMParser().parseFromString(
        a.value.inactiveCashbackMessage,
        "text/html"
      ).body.textContent ?? "" : !s && !l ? e = "Il n’y a pas d’offre cashback ou de codes promo actuellement" : !s && !d ? e = `${a.value.name} ne propose pas de cashback actuellement` : s ? l || (e = "Il n’y a pas de codes promo ou de bons plans actuellement") : e = "Le cashback est uniquement disponible pour les bons d’achat", e;
    });
    return () => o.value ? r(
      "div",
      { class: "mb-module w-full inline-block" },
      r(
        "h2",
        { class: "text-center -colorGrey mb-0 mt-3" },
        o.value
      )
    ) : null;
  }
};
content;
export {
  p as UnavailableOffersModule
};
content;
