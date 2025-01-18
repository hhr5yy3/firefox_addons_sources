import { O as i, ad as a, a9 as s, T as n } from "./esm-index-C1muFETj.js";
import { L as m } from "./r-carousel-DrESFiDf.js";
import { B as u } from "./r-merchant-card-BYQ_DtoX.js";
import { u as p } from "./useMerchantActions-DQd7fZJe.js";
const h = {
  setup() {
    const r = i(), { openUrl: t } = p(), { similarMerchants: e } = a(r);
    return () => s("div", { class: "mb-module" }, [
      s("h2", "Boutiques similaires"),
      s(
        m,
        { gap: "6px" },
        () => e.value.map((o) => s(u, {
          merchant: o,
          size: "L",
          onClick: n(() => {
            t(o);
          }, ["stop"])
        }))
      )
    ]);
  }
};
content;
export {
  h as SimilarMerchantsModule
};
content;
