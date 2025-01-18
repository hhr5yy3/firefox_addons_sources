import { Q as u, O as h } from "./esm-index-C1muFETj.js";
import { c as l, u as m } from "./useMerchantActions-CyX3gu4q.js";
const A = () => {
  const n = (s) => {
    u.publish({
      type: "authModalDisplayRequested",
      details: s ?? {}
    });
  }, o = (s, e) => {
    const r = l(
      `https://www.poulpeo.com${s}`
    );
    (e == null ? void 0 : e.email) !== void 0 && e.email !== "" && r.searchParams.append("email", e.email), open(r, "_blank");
  }, c = () => {
    o("/connexion?provider_name=apple");
  }, i = (s) => {
    o("/connexion", s);
  }, t = () => {
    o("/connexion?provider_name=facebook");
  }, p = () => {
    o("/connexion?provider_name=google");
  }, g = () => {
    const s = l(
      "https://www.poulpeo.com/deconnexion"
    );
    open(s, "_blank");
  }, a = (s, e) => {
    const r = l(
      `https://www.poulpeo.com${s}`
    );
    (e == null ? void 0 : e.email) !== void 0 && e.email !== "" && r.searchParams.append("email", e.email), (e == null ? void 0 : e.sponsorKey) !== void 0 && e.sponsorKey !== "" && r.searchParams.append("sponsor_key", e.sponsorKey), open(r, "_blank");
  };
  return {
    requestAuthModalDisplay: n,
    startLoginWithAppleProcess: c,
    startLoginWithEmailProcess: i,
    startLoginWithFacebookProcess: t,
    startLoginWithGoogleProcess: p,
    startLogoutProcess: g,
    startRegistrationWithAppleProcess: () => {
      a(
        "/inscription?provider_name=apple"
      );
    },
    startRegistrationWithEmailProcess: (s) => {
      a(
        "/inscription",
        s
      );
    },
    startRegistrationWithFacebookProcess: () => {
      a(
        "/inscription?provider_name=facebook"
      );
    },
    startRegistrationWithGoogleProcess: () => {
      a(
        "/inscription?provider_name=google"
      );
    },
    startRegistrationWithSponsorProcess: (s) => {
      a(
        "/inscription/parrainage",
        s
      );
    }
  };
};
content;
const _ = () => {
  const { openPoulpeoUrl: n, openUrl: o, requestCashbackActivation: c } = m(), { registerAffiliationRequest: i } = h();
  return {
    openPoulpeoUrl: (t) => {
      n(t);
    },
    openUrl: (t) => {
      i(t.id), o(t);
    },
    requestCashbackActivation: (t) => {
      i(t.id), c(t);
    }
  };
};
content;
export {
  A as a,
  _ as u
};
content;
