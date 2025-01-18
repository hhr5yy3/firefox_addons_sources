import "./urlAccess-93f11c64.js";
const ns = "analytics/";
const OFFER_LINKED = `${ns}offer_linked`;
const M_ANALYTICS = "background/analytics";
function voucherLinked({ url }) {
  return {
    type: OFFER_LINKED,
    payload: { id: "voucher_linked", action: url }
  };
}
function offerLinked({ url }) {
  return {
    type: OFFER_LINKED,
    payload: { id: "offer_linked", action: url }
  };
}
export {
  M_ANALYTICS as M,
  offerLinked as o,
  voucherLinked as v
};
