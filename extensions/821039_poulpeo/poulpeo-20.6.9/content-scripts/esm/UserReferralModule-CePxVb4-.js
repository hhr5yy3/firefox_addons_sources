import { d as h, o as y, c as m, a as o, b as u, t as x, n as d, ad as v, O as k, e as b, j as p, C as f, D as C, a9 as w } from "./esm-index-C1muFETj.js";
import { u as S } from "./useClipboard-DL9tqrNz.js";
import { c as g } from "./useMerchantActions-CyX3gu4q.js";
const L = { class: "[ -box ] p-3 bg-white" }, K = { class: "text-center text-sm leading-4 text-grey-300" }, I = { class: "mt-4" }, z = { class: "grow inline-flex items-center gap-2 text-right text-grey-100" }, B = ["value"], E = { class: "grow inline-flex items-center gap-2 text-right text-grey-100" }, P = ["value"], R = /* @__PURE__ */ h({
  __name: "RUserReferralModule",
  props: {
    isSponsorKeyInClipboard: { type: Boolean },
    isSponsorshipLinkInClipboard: { type: Boolean },
    user: {},
    sponsorshipLink: {}
  },
  emits: ["copySponsorKeyClick", "copySponsorshipLinkClick", "openSponsorshipExplanationPageClick"],
  setup(i, { emit: n }) {
    const a = n, r = () => {
      a("openSponsorshipExplanationPageClick");
    }, t = (s) => {
      s.preventDefault(), a("copySponsorKeyClick");
    }, l = (s) => {
      s.preventDefault(), a("copySponsorshipLinkClick");
    };
    return (s, e) => (y(), m("div", L, [
      e[5] || (e[5] = o("h2", { class: "[ -h2 ]" }, "Faites grimper votre cagnotte !", -1)),
      o("p", K, [
        e[0] || (e[0] = u(" Boostez votre cagnotte en parrainant vos amis et ")),
        o("a", {
          class: "[ -a ] hover:no-underline",
          onClick: r
        }, " recevez 3€ + " + x(s.user.isPoulpeoPlus ? 15 : 10) + "% de leurs cashback à vie", 1),
        e[1] || (e[1] = u(" ! "))
      ]),
      o("form", I, [
        o("label", {
          class: "flex justify-between items-center gap-2 px-3 py-2 text-xs leading-3.5 bg-grey-800 rounded cursor-pointer",
          onClick: t
        }, [
          e[2] || (e[2] = o("span", { class: "w-20 text-grey-300" }, "Votre code de parrainage", -1)),
          o("span", z, [
            o("input", {
              class: "all-inherit text-ellipsis",
              type: "text",
              readonly: "",
              value: s.user.sponsorKey
            }, null, 8, B),
            o("i", {
              class: d(["fa-regular fa-clone text-[9px]", { "animate-ping": s.isSponsorKeyInClipboard }])
            }, null, 2)
          ])
        ]),
        e[4] || (e[4] = o("hr", { class: "h-px m-2 bg-grey-600 border-0" }, null, -1)),
        o("label", {
          class: "flex justify-between items-center gap-2 px-3 py-2 text-xs leading-3.5 bg-grey-800 rounded cursor-pointer",
          onClick: l
        }, [
          e[3] || (e[3] = o("span", { class: "w-20 text-grey-300" }, "Votre lien de parrainage", -1)),
          o("span", E, [
            o("input", {
              class: "all-inherit text-ellipsis",
              type: "text",
              readonly: "",
              value: s.sponsorshipLink.replace("https://", "")
            }, null, 8, P),
            o("i", {
              class: d(["fa-regular fa-clone text-[9px]", { "animate-ping": s.isSponsorshipLinkInClipboard }])
            }, null, 2)
          ])
        ])
      ])
    ]));
  }
}), H = {
  setup() {
    const i = S(), { user: n } = v(k()), a = b(() => {
      var e;
      return g(
        "https://www.poulpeo.com/p/{sponsorKey}".replace(
          "{sponsorKey}",
          ((e = n.value) == null ? void 0 : e.sponsorKey) ?? ""
        )
      ).href;
    }), r = p(!1), t = p(!1), l = p(window.innerHeight), s = () => {
      l.value = window.innerHeight;
    };
    return f(() => {
      window.addEventListener("resize", s);
    }), C(() => {
      window.removeEventListener("resize", s);
    }), () => {
      var e;
      return ((e = n.value) == null ? void 0 : e.isLogged) === !0 ? w(R, {
        class: {
          "-mx-1": l.value <= 640,
          "absolute bottom-4 left-2 w-[314px]": l.value > 640
        },
        isSponsorKeyInClipboard: r.value,
        isSponsorshipLinkInClipboard: t.value,
        sponsorshipLink: a.value,
        user: n.value,
        onOpenSponsorshipExplanationPageClick: () => {
          open(
            g(
              "https://www.poulpeo.com/mag-le-parrainage-poulpeo-comment-ca-marche.html"
            ),
            "_blank"
          );
        },
        onCopySponsorKeyClick: () => {
          var c;
          i.copy(((c = n.value) == null ? void 0 : c.sponsorKey) ?? "").then(() => {
            r.value = !0, setTimeout(() => {
              r.value = !1;
            }, 1e3);
          }).catch(console.error);
        },
        onCopySponsorshipLinkClick: () => {
          i.copy(a.value).then(() => {
            t.value = !0, setTimeout(() => {
              t.value = !1;
            }, 1e3);
          }).catch(console.error);
        }
      }) : null;
    };
  }
};
content;
export {
  H as UserReferralModule
};
content;
