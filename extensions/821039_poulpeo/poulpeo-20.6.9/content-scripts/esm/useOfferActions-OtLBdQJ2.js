import { u as c } from "./useOfferActions-SCZZv00L.js";
import { O as i } from "./esm-index-C1muFETj.js";
const p = () => {
  const { copyCode: n, fetchCode: r, openUrl: s } = c(), { registerAffiliationRequest: o } = i();
  return {
    copyCode: (e, t) => {
      o(e.merchantId, e.id), n(e, t);
    },
    fetchCode: r,
    openUrl: (e, t) => {
      o(e.merchantId, e.id), s(e, t);
    }
  };
};
content;
export {
  p as u
};
content;
