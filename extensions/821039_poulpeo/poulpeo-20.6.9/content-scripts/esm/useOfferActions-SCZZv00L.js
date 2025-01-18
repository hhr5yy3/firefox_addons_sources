import { af as i, v as d, al as s } from "./esm-index-C1muFETj.js";
import { u as h } from "./useClipboard-DL9tqrNz.js";
import { c as l, a as g } from "./useMerchantActions-CyX3gu4q.js";
const E = () => {
  const c = i(), r = h(), t = d();
  return {
    copyCode: (e, a) => {
      c.dropCookie({
        merchantId: e.merchantId,
        offerId: e.id
      }).catch(console.error), t.setLastCodeCopyActionTargetId(e.id), r.copy(e.code).then(() => {
        clearTimeout(t.lastCodeCopyActionTimeout), t.setLastCodeCopyActionTimeout(
          setTimeout(() => {
            t.setLastCodeCopyActionTimeout(void 0);
          }, 3e3)
        ), c.trackUserInterfaceEvent(
          "offer_code_copy",
          s(a).getElementAndParentsTaggingData()
        ).catch(console.error);
      }).catch(console.error);
    },
    fetchCode: (e, a) => {
      if (e.codeType !== "multiple") {
        t.setLastCodeFetchActionResult(e.id, {
          code: e.code,
          codeFetchingStatus: "success",
          codeFetchingError: void 0
        });
        return;
      }
      t.setLastCodeFetchActionResult(e.id, {
        code: "",
        codeFetchingStatus: "ongoing",
        codeFetchingError: void 0
      }), c.getSingleUseOfferCode(e.id).then((o) => {
        t.setLastCodeFetchActionResult(e.id, {
          code: o,
          codeFetchingStatus: "success",
          codeFetchingError: void 0
        }), c.trackUserInterfaceEvent(
          "offer_code_fetch",
          s(a).getElementAndParentsTaggingData()
        ).catch(console.error);
      }).catch((o) => {
        t.setLastCodeFetchActionResult(e.id, {
          code: "",
          codeFetchingStatus: "failure",
          codeFetchingError: o instanceof Error ? o : new Error("Unable to fetch single use offer code")
        });
      });
    },
    openUrl: (e, a) => {
      var n;
      const o = ((n = e.giftCardCashback) == null ? void 0 : n.cashbackRate) !== void 0 && e.giftCardCashback.cashbackRate > 0 ? l(e.giftCardCashback.connectionUrl).href : g({
        merchantId: e.merchantId,
        offerId: e.id
      });
      c.trackUserInterfaceEvent(
        "offer_url_open",
        s(a).getElementAndParentsTaggingData()
      ).catch(console.error), open(o, "_blank");
    }
  };
};
content;
export {
  E as u
};
content;
