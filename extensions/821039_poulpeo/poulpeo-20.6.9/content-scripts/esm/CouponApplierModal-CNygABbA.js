import { u as L, a as v } from "./useMerchantActions-DQd7fZJe.js";
import { d as M, N as G, O, e as d, P as T, Q as y, _ as E, o as F, g as x, h as w } from "./esm-index-C1muFETj.js";
import { c as U } from "./useMerchantActions-CyX3gu4q.js";
const B = /* @__PURE__ */ M({
  __name: "CouponApplierModal",
  setup(A, { expose: l }) {
    l();
    const p = T({
      loader: async () => (await import("./r-coupon-applier-modal-DcKxiKaG.js")).RCouponApplierModal
    }), o = G(), t = O(), {
      startLoginWithAppleProcess: h,
      startLoginWithEmailProcess: W,
      startLoginWithFacebookProcess: m,
      startLoginWithGoogleProcess: b,
      startRegistrationWithAppleProcess: f,
      startRegistrationWithEmailProcess: R,
      startRegistrationWithFacebookProcess: _,
      startRegistrationWithGoogleProcess: P
    } = v(), { requestCashbackActivation: C } = L(), S = d(() => t.isCouponApplierEnabled && ["process", "finishing", "fail", "success"].includes(
      o.status
    )), I = d(
      () => {
        if (["unavailable", "init", "starting"].includes(o.status) || t.selectedMerchant === void 0)
          return;
        const n = o.shoppingCartTotalWithoutCoupons ?? 0;
        return {
          cashbackActivationStatus: t.selectedMerchantCashbackActivationStatus,
          isUserLoggedIn: o.isUserLoggedIn,
          shoppingCartTotalWithoutCoupons: n,
          testedCoupons: o.coupons.map(({ code: s }, g) => {
            const i = t.selectedMerchantOffers.find(
              (r) => r.code === s
            ), e = o.bestCoupon, c = o.testedCoupons.find(
              (r) => r.code === s
            ), k = s === (e == null ? void 0 : e.coupon) ? e.discount : 0;
            let a = "pending";
            return g === o.currentCouponIndex && ["process", "finishing"].includes(o.status) ? a = "ongoing" : g <= o.currentCouponIndex && (a = (c == null ? void 0 : c.success) === !0 ? "success" : "failure"), {
              code: s,
              isAppliedToShoppingCart: (i == null ? void 0 : i.code) === (e == null ? void 0 : e.coupon),
              isCompatibleWithCashback: (i == null ? void 0 : i.canCombineCashbackAndOffersCodes) === !0,
              shoppingCartTotalReductionAmount: k,
              shoppingCartTotalReductionRate: k / n,
              testStatus: a
            };
          }),
          testedMerchant: t.selectedMerchant
        };
      }
    ), u = { RCouponApplierModal: p, couponApplierStore: o, sidebarStore: t, startLoginWithAppleProcess: h, startLoginWithEmailProcess: W, startLoginWithFacebookProcess: m, startLoginWithGoogleProcess: b, startRegistrationWithAppleProcess: f, startRegistrationWithEmailProcess: R, startRegistrationWithFacebookProcess: _, startRegistrationWithGoogleProcess: P, requestCashbackActivation: C, isCouponApplierRunning: S, couponApplierTestInfo: I, onActivateCashbackClick: () => {
      t.selectedMerchant !== void 0 && C(t.selectedMerchant);
    }, onStopTestClick: () => {
      y.publish({
        type: "stopTestClicked",
        details: {}
      });
    }, onOpenAppleAppStoreClick: () => {
      open("https://itunes.apple.com/fr/app/poulpeo/id545935519?mt=8", "_blank");
    }, onOpenGooglePlayStoreClick: () => {
      open("https://play.google.com/store/apps/details?id=com.poulpeo", "_blank");
    }, onWhatIsCashbackClick: () => {
      const n = U(
        "https://www.poulpeo.com/comment-ca-marche.htm"
      );
      open(n, "_blank");
    } };
    return Object.defineProperty(u, "__isScriptSetup", { enumerable: !1, value: !0 }), u;
  }
});
content;
function N(A, l, p, o, t, h) {
  return o.isCouponApplierRunning ? (F(), x(o.RCouponApplierModal, {
    key: 0,
    open: o.isCouponApplierRunning,
    "coupon-applier-test-info": o.couponApplierTestInfo,
    onActivateCashbackClick: o.onActivateCashbackClick,
    onClose: o.onStopTestClick,
    onLogInWithAppleClick: o.startLoginWithAppleProcess,
    onLogInWithEmailClick: o.startLoginWithEmailProcess,
    onLogInWithFacebookClick: o.startLoginWithFacebookProcess,
    onLogInWithGoogleClick: o.startLoginWithGoogleProcess,
    onOpenAppleAppStoreClick: o.onOpenAppleAppStoreClick,
    onOpenGooglePlayStoreClick: o.onOpenGooglePlayStoreClick,
    onRegisterWithAppleClick: o.startRegistrationWithAppleProcess,
    onRegisterWithEmailClick: o.startRegistrationWithEmailProcess,
    onRegisterWithFacebookClick: o.startRegistrationWithFacebookProcess,
    onRegisterWithGoogleClick: o.startRegistrationWithGoogleProcess,
    onWhatIsCashbackClick: o.onWhatIsCashbackClick
  }, null, 8, ["open", "coupon-applier-test-info", "onLogInWithAppleClick", "onLogInWithEmailClick", "onLogInWithFacebookClick", "onLogInWithGoogleClick", "onRegisterWithAppleClick", "onRegisterWithEmailClick", "onRegisterWithFacebookClick", "onRegisterWithGoogleClick"])) : w("", !0);
}
const K = /* @__PURE__ */ E(B, [["render", N], ["__file", "CouponApplierModal.vue"]]);
export {
  K as default
};
content;
