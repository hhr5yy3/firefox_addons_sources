import { d as P, o as m, c as d, a as p, t as l, h as y, ad as h, O as N, e as n, a9 as v } from "./esm-index-C1muFETj.js";
import { a as w } from "./useMerchantActions-DQd7fZJe.js";
import { R as x } from "./SidebarManager-CoX2oc26.js";
import { c as g } from "./useMerchantActions-CyX3gu4q.js";
const L = { class: "flex flex-col justify-center items-center" }, R = { class: "m-0" }, C = {
  key: 0,
  class: "mt-2.5 mb-0 -colorGrey"
}, M = /* @__PURE__ */ P({
  __name: "RIntermediateNavigationFooter",
  props: {
    title: {},
    message: {},
    link: {},
    eventName: {}
  },
  setup(o, { emit: t }) {
    const s = o, i = t, r = () => {
      i(s.eventName);
    };
    return (a, c) => (m(), d("div", L, [
      p("p", R, l(a.title), 1),
      a.message !== "" ? (m(), d("p", C, l(a.message), 1)) : y("", !0),
      p("a", {
        small: "",
        inverted: "",
        class: "mx-auto mt-5 uppercase font-bold cursor-pointer text-xs hover:no-underline",
        onClick: r
      }, l(a.link), 1)
    ]));
  }
}), _ = {
  setup() {
    const { user: o } = h(N()), t = n(() => {
      var e;
      return ((e = o.value) == null ? void 0 : e.isLogged) === !0;
    }), s = n(
      () => t.value ? "Mon profil" : "Pas encore membre ?"
    ), i = n(
      () => t.value ? "Renseignez ou modifiez vos identifiants, mot de passe et informations bancaires." : "Et si vous découvriez le cashback avec Poulpeo ? Le meilleur moyen de faire des économies."
    ), r = n(
      () => t.value ? "Modifier mes coordonnées" : "Connexion / inscription"
    ), a = n(
      () => {
        var e;
        return new Intl.DateTimeFormat("fr-FR", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }).format((((e = o.value) == null ? void 0 : e.dateAdd) ?? 0) * 1e3);
      }
    ), c = n(
      () => {
        var e;
        return new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR"
        }).format(((e = o.value) == null ? void 0 : e.earningsAmount.acceptedPlusPaidPlusPending) ?? 0);
      }
    ), f = n(
      () => {
        var e, u;
        return [
          (((e = o.value) == null ? void 0 : e.dateAdd) ?? 0) > 0 ? `Membre depuis le ${a.value}. ` : "",
          (((u = o.value) == null ? void 0 : u.earningsAmount.acceptedPlusPaidPlusPending) ?? 0) > 0 ? `Déjà ${c.value} de gains obtenus grâce à Poulpeo ;)` : ""
        ].join("");
      }
    ), k = () => {
      t.value ? open(
        g(
          "https://www.poulpeo.com/coordonnees.htm"
        ),
        "_blank"
      ) : w().requestAuthModalDisplay({
        initialMode: "register"
      });
    }, b = () => {
      const e = g(
        "https://www.poulpeo.com/deconnexion"
      );
      open(e, "_blank");
    };
    return () => v(
      x,
      {
        title: s.value,
        description: i.value,
        linkLabel: r.value,
        onLinkClick: k
      },
      {
        footer: () => {
          var e;
          return t.value ? v(M, {
            onHandleLogoutClick: b,
            title: ((e = o.value) == null ? void 0 : e.email) ?? "",
            message: f.value,
            link: "Me déconnecter",
            eventName: "handleLogoutClick"
          }) : "";
        }
      }
    );
  }
};
content;
export {
  _ as UserProfileNavigationModule
};
content;
