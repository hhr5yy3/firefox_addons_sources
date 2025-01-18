import { d as y, f as p, o as t, c as s, F as m, z as f, h as d, w as l, a as c, t as S, b as T, u as N, af as R, O as D, ab as I, ad as U, C as F, _ as O, q as _, i as B, g as M } from "./esm-index-C1muFETj.js";
import { L as P } from "./r-carousel-DrESFiDf.js";
import { B as z } from "./r-merchant-card-BYQ_DtoX.js";
import { F as V } from "./r-merchant-card-pictured-0hFV0eVK.js";
import { u as j, c as q } from "./useMerchantActions-CyX3gu4q.js";
import { u as A } from "./containersContentStore-5bollcB3.js";
const G = { class: "[ -box ] flex flex-col bg-white" }, H = {
  key: 0,
  class: "h-0.25 my-0 mx-3 p-0 overflow-hidden border-0 bg-grey-700"
}, X = ["onClick"], J = { class: "[ -truncate ] font-medium text-sm pr-4" }, K = {
  key: 0,
  class: "uppercase text-grey-400 font-bold text-xs whitespace-nowrap"
}, Q = /* @__PURE__ */ y({
  __name: "RUpcomingCashbackOfferList",
  props: {
    merchants: {}
  },
  emits: ["merchantClick"],
  setup(v, { emit: a }) {
    const C = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long"
    }), e = a, b = (h) => {
      e("merchantClick", h);
    };
    return (h, r) => {
      const o = p("tag");
      return t(), s("div", G, [
        (t(!0), s(m, null, f(h.merchants, (n, i) => {
          var u;
          return t(), s(m, {
            key: n.id
          }, [
            0 < i ? (t(), s("hr", H)) : d("", !0),
            l((t(), s("div", {
              class: "inline-flex justify-between items-center h-10 px-3 cursor-pointer",
              onClick: (x) => b(n)
            }, [
              c("span", J, S(n.name), 1),
              ((u = n.nextCashback) == null ? void 0 : u.dateStart) !== void 0 && n.nextCashback.dateStart > Date.now() / 1e3 ? (t(), s("span", K, [
                r[0] || (r[0] = c("i", { class: "fa-regular fa-calendar-check" }, null, -1)),
                T(" " + S(N(C).format(new Date(n.nextCashback.dateStart * 1e3))), 1)
              ])) : d("", !0)
            ], 8, X)), [
              [o, { position: i + 1, linkedEntities: { merchant: n } }]
            ])
          ], 64);
        }), 128))
      ]);
    };
  }
}), W = /* @__PURE__ */ y({
  __name: "SuperCashbackTabContent",
  setup(v, { expose: a }) {
    a();
    const C = R(), e = A(), b = D(), h = I("super_cashback_tab_seen"), { openUrl: r } = j(), {
      liveCashbackIncreaseContainerMerchants: o,
      liveCashbackIncreaseContainerTechnicalName: n,
      liveSuperCashbackContainerMerchants: i,
      liveSuperCashbackContainerTechnicalName: u,
      upcomingSuperCashbackContainerMerchants: x,
      upcomingSuperCashbackContainerTechnicalName: L
    } = U(e), w = (k) => {
      r(k);
    }, E = () => {
      const k = q(
        "https://www.poulpeo.com/classement-et-selection-des-offres.html"
      );
      open(k, "_blank");
    };
    F(() => {
      C.checkStorageHealth().then(
        () => Promise.all([
          e.fetchLiveCashbackIncreaseContainer(),
          e.fetchLiveSuperCashbackContainer(),
          e.fetchUpcomingSuperCashbackContainer()
        ])
      ).then(() => {
        h.value = !0;
      }).catch((k) => {
        b.setError(
          k instanceof Error ? k : new Error("Unable to fetch super cashback tab content")
        );
      });
    });
    const g = { businessService: C, containersContentStore: e, sidebarStore: b, superCashbackTabSeen: h, openUrl: r, liveCashbackIncreaseContainerMerchants: o, liveCashbackIncreaseContainerTechnicalName: n, liveSuperCashbackContainerMerchants: i, liveSuperCashbackContainerTechnicalName: u, upcomingSuperCashbackContainerMerchants: x, upcomingSuperCashbackContainerTechnicalName: L, handleMerchantClick: w, handleAboutMerchantOffersRankingClick: E, get RCarousel() {
      return P;
    }, get RMerchantCard() {
      return z;
    }, get RMerchantCardPictured() {
      return V;
    }, get RUpcomingCashbackOfferList() {
      return Q;
    } };
    return Object.defineProperty(g, "__isScriptSetup", { enumerable: !1, value: !0 }), g;
  }
});
content;
const Y = { class: "mb-module" }, Z = {
  key: 0,
  class: "mb-module"
}, $ = {
  key: 1,
  class: "mb-module"
}, ee = {
  key: 2,
  class: "mb-module"
}, ne = {
  class: "-grid justify-items-center pb-3",
  style: "--grid-columns: 3"
};
function ae(v, a, C, e, b, h) {
  const r = p("tag"), o = p("track");
  return t(), s("div", null, [
    l((t(), s("div", Y, [
      c("p", {
        class: "mb-6 py-0.5 text-center text-xxs cursor-pointer",
        onClick: e.handleAboutMerchantOffersRankingClick
      }, " À propos du classement des offres "),
      e.liveSuperCashbackContainerMerchants.length > 0 || e.upcomingSuperCashbackContainerMerchants.length > 0 ? (t(), s(m, { key: 0 }, [
        a[0] || (a[0] = c("h2", { class: "mb-1 text-center" }, "Super Cashback", -1)),
        a[1] || (a[1] = c("p", { class: "text-center text-xs mb-3 -colorGrey" }, " Des offres exceptionnellement doublées voire triplées pendant 24h. Profitez-en avant qu'il ne soit trop tard ! ", -1))
      ], 64)) : (t(), s(m, { key: 1 }, [
        a[2] || (a[2] = c("h2", { class: "mb-1 text-center" }, "Les boutiques populaires", -1)),
        a[3] || (a[3] = c("p", { class: "text-center text-xs mb-3 -colorGrey" }, " La sélection de nos experts, avec les cashback les plus avantageux sélectionnés pour vous ! ", -1))
      ], 64))
    ])), [
      [r, { label: "SuperCashbackTabHeaderModule" }],
      [o, "extension_component_click", "click"]
    ]),
    e.liveSuperCashbackContainerMerchants.length > 0 ? l((t(), s("div", Z, [
      a[4] || (a[4] = c("h2", { class: "mb-3" }, "La sélection du moment", -1)),
      _(e.RCarousel, null, {
        default: B(() => [
          (t(!0), s(m, null, f(e.liveSuperCashbackContainerMerchants, (n, i) => l((t(), M(e.RMerchantCardPictured, {
            key: n.id,
            merchant: n,
            size: "XL",
            onClick: (u) => e.handleMerchantClick(n)
          }, null, 8, ["merchant", "onClick"])), [
            [r, {
              position: i + 1,
              linkedEntities: {
                container: {
                  technicalName: e.liveSuperCashbackContainerTechnicalName
                },
                merchant: n
              }
            }]
          ])), 128))
        ]),
        _: 1
      })
    ])), [
      [r, { label: "LiveSuperCashbackListModule" }],
      [o, "extension_component_click", "click"]
    ]) : d("", !0),
    e.upcomingSuperCashbackContainerMerchants.length > 0 ? l((t(), s("div", $, [
      a[5] || (a[5] = c("h2", { class: "mb-3" }, "Super Cashback à venir", -1)),
      l(_(e.RUpcomingCashbackOfferList, {
        merchants: e.upcomingSuperCashbackContainerMerchants,
        onMerchantClick: e.handleMerchantClick
      }, null, 8, ["merchants"]), [
        [r, {
          linkedEntities: {
            container: {
              technicalName: e.upcomingSuperCashbackContainerTechnicalName
            }
          }
        }]
      ])
    ])), [
      [r, { label: "UpcomingSuperCashbackListModule" }],
      [o, "extension_component_click", "click"]
    ]) : d("", !0),
    e.liveCashbackIncreaseContainerMerchants.length > 0 ? l((t(), s("div", ee, [
      a[6] || (a[6] = c("h2", { class: "mb-3" }, "Les cashback en hausse", -1)),
      c("div", ne, [
        (t(!0), s(m, null, f(e.liveCashbackIncreaseContainerMerchants, (n, i) => l((t(), M(e.RMerchantCard, {
          key: n.id,
          merchant: n,
          size: "M",
          onClick: (u) => e.handleMerchantClick(n)
        }, null, 8, ["merchant", "onClick"])), [
          [r, {
            position: i + 1,
            linkedEntities: {
              container: {
                technicalName: e.liveCashbackIncreaseContainerTechnicalName
              },
              merchant: n
            }
          }]
        ])), 128))
      ])
    ])), [
      [r, { label: "LiveCashbackIncreaseListModule" }],
      [o, "extension_component_click", "click"]
    ]) : d("", !0)
  ]);
}
const le = /* @__PURE__ */ O(W, [["render", ae], ["__file", "SuperCashbackTabContent.vue"]]);
export {
  le as default
};
content;
