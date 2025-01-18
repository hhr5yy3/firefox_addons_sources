import { u as N } from "./useFileUrl-CiXCJe8n.js";
import { d as b, _ as v, o as r, c as d, a as i, r as O, n as k, F as _, b as C, t as S, e as L, B as j, f as I, w as M, g, m as H, h as B, i as m, u as p, j as y, k as D, l as z, p as V, q as w, s as W, v as G, x as J, y as K, z as Q } from "./esm-index-C1muFETj.js";
import { S as X } from "./SerpSnippetMerchantLightList-AtRWd-p3.js";
import { G as Y } from "./r-tooltip-CDun5INk.js";
import { u as Z } from "./useMerchantActions-CyX3gu4q.js";
import { u as $ } from "./useOfferActions-SCZZv00L.js";
const ee = /* @__PURE__ */ b({
  __name: "SerpSnippetCollapse",
  props: {
    enabled: { type: Boolean, default: !0 },
    expanded: { type: Boolean, default: !1 }
  },
  emits: ["headerClick", "poulpeoLogoClick", "toggleIconClick"],
  setup(c, { expose: n, emit: t }) {
    n();
    const e = c, s = N("/img/poulpeo-logo.svg"), l = t, h = { props: e, poulpeoLogo: s, emits: l, onPoulpeoLogoClick: () => {
      l("poulpeoLogoClick");
    }, onHeaderClick: () => {
      l("headerClick");
    }, onToggleIconClick: () => {
      l("toggleIconClick");
    } };
    return Object.defineProperty(h, "__isScriptSetup", { enumerable: !1, value: !0 }), h;
  }
});
content;
const te = ["src"];
function ne(c, n, t, e, s, l) {
  return r(), d("div", {
    class: k({
      "-enabled": e.props.enabled,
      "-expanded": e.props.expanded
    })
  }, [
    i("div", {
      class: "inline-flex flex-row items-center cursor-pointer",
      onClick: n[2] || (n[2] = (a) => e.onHeaderClick())
    }, [
      i("img", {
        class: "dark:filter dark:grayscale dark:brightness-200 mr-2 ml-0.5",
        width: "23",
        height: "18",
        src: e.poulpeoLogo,
        alt: "Logo Poulpeo",
        onClick: n[0] || (n[0] = (a) => e.onPoulpeoLogoClick())
      }, null, 8, te),
      O(c.$slots, "header"),
      i("i", {
        class: k(["px-2 pb-0.5 transition-transform text-sm color-serp-text-light dark:color-serp-text-dark fa-solid fa-caret-down", {
          "inline-block": e.props.enabled,
          hidden: !e.props.enabled,
          "rotate-180": e.props.expanded,
          "rotate-0": !e.props.expanded
        }]),
        onClick: n[1] || (n[1] = (a) => e.onToggleIconClick())
      }, null, 2)
    ]),
    i("div", {
      class: k(["px-0 py-1.5", { hidden: !e.props.expanded }])
    }, [
      O(c.$slots, "content", {
        class: k({ hidden: !e.props.expanded })
      })
    ], 2)
  ], 2);
}
const oe = /* @__PURE__ */ v(ee, [["render", ne], ["__file", "SerpSnippetCollapse.vue"]]), re = /* @__PURE__ */ b({
  __name: "SerpSnippetLoader",
  props: {
    text: { default: "Chargement en cours…" },
    errorText: { default: "Le chargement a échoué" },
    status: { default: "ongoing" }
  },
  setup(c, { expose: n }) {
    n();
    const t = {};
    return Object.defineProperty(t, "__isScriptSetup", { enumerable: !1, value: !0 }), t;
  }
});
content;
const le = { class: "flex gap-2.5 flex-row items-center px-0 py-2 color-serp-text-light dark:color-serp-text-dark text-xs leading-5.5" };
function ae(c, n, t, e, s, l) {
  return r(), d("div", le, [
    t.status !== "failure" ? (r(), d(_, { key: 0 }, [
      n[0] || (n[0] = i("i", { class: "animation-spin fa-arrows-rotate fa-solid" }, null, -1)),
      C(" " + S(t.text), 1)
    ], 64)) : (r(), d(_, { key: 1 }, [
      n[1] || (n[1] = i("i", { class: "fa-triangle-exclamation fa-solid" }, null, -1)),
      C(" " + S(t.errorText), 1)
    ], 64))
  ]);
}
const ie = /* @__PURE__ */ v(re, [["render", ae], ["__file", "SerpSnippetLoader.vue"]]), se = /* @__PURE__ */ b({
  __name: "SerpSnippetMerchant",
  props: {
    merchant: {}
  },
  emits: ["cashbackOfferClick", "offerCountClick"],
  setup(c, { expose: n, emit: t }) {
    n();
    const e = c, s = L(() => {
      var h;
      return ((h = e.merchant.merchantInfo) == null ? void 0 : h.nbOffers) ?? 0;
    }), l = t, f = { props: e, nbOffers: s, emits: l, handleCashbackOfferClick: () => {
      l("cashbackOfferClick");
    }, handleOfferCountClick: () => {
      l("offerCountClick");
    }, get RCashbackText() {
      return j;
    } };
    return Object.defineProperty(f, "__isScriptSetup", { enumerable: !1, value: !0 }), f;
  }
});
content;
const ce = { class: "flex gap-2.5 flex-row items-center px-0.5 py-px color-serp-text-light dark:color-serp-text-dark text-sm leading-5" };
function de(c, n, t, e, s, l) {
  const a = I("tag");
  return M((r(), d("div", ce, [
    i("div", {
      class: k({ "cursor-default": t.merchant.cashback === void 0 }),
      onClick: n[0] || (n[0] = (o) => e.handleCashbackOfferClick())
    }, [
      n[4] || (n[4] = i("i", { class: "inline-block align-middle mr-1 fa-light fa-coins" }, null, -1)),
      t.merchant.cashback === void 0 ? (r(), d(_, { key: 0 }, [
        n[2] || (n[2] = C(" Pas de cashback disponible ")),
        n[3] || (n[3] = i("span", { "data-visible-width": "lg" }, " actuellement", -1))
      ], 64)) : (r(), g(e.RCashbackText, H({
        key: 1,
        prefix: "Cashback : "
      }, t.merchant.cashback), null, 16))
    ], 2),
    e.nbOffers > 0 ? (r(), d("div", {
      key: 0,
      class: k({ "cursor-default": e.nbOffers <= 0 }),
      onClick: n[1] || (n[1] = (o) => e.handleOfferCountClick())
    }, [
      n[5] || (n[5] = i("i", { class: "mr-1 text-sm inline-block align-middle fa-regular fa-tags" }, null, -1)),
      n[6] || (n[6] = i("span", { "data-visible-width": "md lg" }, "Codes promo et bons plans : ", -1)),
      n[7] || (n[7] = i("span", { "data-visible-width": "sm" }, "Offres : ", -1)),
      i("b", null, S(e.nbOffers), 1)
    ], 2)) : B("", !0)
  ])), [
    [a, { label: "Merchant", linkedEntities: { merchant: t.merchant } }]
  ]);
}
const fe = /* @__PURE__ */ v(se, [["render", de], ["__file", "SerpSnippetMerchant.vue"]]), ue = /* @__PURE__ */ b({
  __name: "SerpSnippetMerchantSelector",
  props: {
    merchantCount: {}
  },
  setup(c, { expose: n }) {
    n();
    const t = {};
    return Object.defineProperty(t, "__isScriptSetup", { enumerable: !1, value: !0 }), t;
  }
});
content;
const pe = { class: "color-serp-text-light dark:color-serp-text-dark text-sm leading-5.5" };
function he(c, n, t, e, s, l) {
  return r(), d("div", pe, [
    n[0] || (n[0] = i("i", { class: "inline-block mr-1 text-sm align-middle fa-light fa-coins" }, null, -1)),
    n[1] || (n[1] = C(" Nous avons détecté ")),
    i("b", null, S(t.merchantCount) + " boutiques possibles", 1)
  ]);
}
const ge = /* @__PURE__ */ v(ue, [["render", he], ["__file", "SerpSnippetMerchantSelector.vue"]]), ke = {
  key: 1,
  class: "inline-flex"
}, me = /* @__PURE__ */ b({
  __name: "RButton",
  props: {
    loading: { type: Boolean, default: !1 },
    loaderLabel: { default: "" },
    enableOnClickAutomaticLoader: { type: Boolean, default: !0 },
    tag: { default: "button" },
    theme: {},
    inverted: { type: Boolean },
    outlined: { type: Boolean },
    lighted: { type: Boolean },
    block: { type: Boolean },
    small: { type: Boolean },
    blockOnMobile: { type: Boolean },
    type: { default: "button" },
    tabindex: { default: 0 },
    disabled: { type: Boolean },
    disabledTheme: { type: Boolean },
    disabledState: { type: Boolean }
  },
  setup(c) {
    const n = c, t = y(!1), e = y(!0), s = D(), l = L(() => n.loading || t.value), a = L(() => s.href !== void 0 && s.href !== null ? "a" : n.tag);
    return (o, f) => (r(), g(z(a.value), {
      class: k(["a-btn", [
        o.theme ? "-" + o.theme : "",
        o.inverted ? "-inverted" : "",
        o.outlined ? "-outlined" : "",
        o.lighted ? "-inverted" : "",
        o.block ? "-block" : "",
        o.blockOnMobile ? "-blockOnMobile" : "",
        o.small ? "-small" : "",
        o.disabled || o.disabledTheme ? "-disabled" : ""
      ]]),
      type: o.tag === "button" ? o.type : null,
      role: o.tag === "div" ? "button" : null,
      tabindex: o.tag === "div" ? o.tabindex.toString() : null,
      disabled: l.value || o.disabled || o.disabledState ? "" : null,
      onClick: f[0] || (f[0] = (h) => e.value = !0)
    }, {
      default: m(() => [
        l.value ? O(o.$slots, "loaderSlot", { key: 0 }, () => [
          o.loaderLabel ? (r(), d(_, { key: 0 }, [
            C(S(o.loaderLabel), 1)
          ], 64)) : (r(), d("span", ke, f[1] || (f[1] = [
            i("i", { class: "fa-solid fa-spinner-third fa-spin fa-lg" }, null, -1)
          ])))
        ]) : O(o.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 8, ["class", "type", "role", "tabindex", "disabled"]));
  }
}), Ce = /* @__PURE__ */ b({
  __name: "RButtonPrimary",
  setup(c) {
    return (n, t) => (r(), g(me, { theme: "primary" }, {
      loaderLabel: m(() => [
        O(n.$slots, "loaderSlot")
      ]),
      default: m(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }));
  }
}), be = ["loading"], _e = /* @__PURE__ */ b({
  __name: "RCodeButton",
  props: {
    offerId: {},
    code: {},
    codeFetchingStatus: { default: void 0 },
    isCodeCopiedInClipboard: { type: Boolean, default: !1 },
    forceActive: { type: Boolean, default: !1 },
    fullWidth: { type: Boolean, default: !1 }
  },
  emits: ["codeButtonClick"],
  setup(c, { emit: n }) {
    const t = c, e = n, s = L(() => ({
      "bg-primary-light dark:bg-neutral-700 border-primary": t.isCodeCopiedInClipboard || t.forceActive,
      "bg-neutral-100 dark:bg-[#202124] border-neutral-400 dark:hover:bg-neutral-700 hover:bg-primary-light hover:border-primary": !(t.isCodeCopiedInClipboard || t.forceActive),
      "w-26 min-w-26 -truncate overflow-hidden": !t.fullWidth,
      "whitespace-nowrap": t.fullWidth
    })), l = () => {
      t.codeFetchingStatus === "success" ? e("codeButtonClick", {
        eventType: "codeCopied",
        offerId: t.offerId,
        code: t.code
      }) : (t.codeFetchingStatus === "pending" || t.codeFetchingStatus === "failure") && e("codeButtonClick", {
        eventType: "requestCode",
        offerId: t.offerId
      });
    };
    return (a, o) => !a.isCodeCopiedInClipboard && (a.codeFetchingStatus == null || a.codeFetchingStatus === "pending") ? (r(), g(p(Ce), {
      key: 0,
      small: "",
      onClick: l
    }, {
      default: m(() => o[0] || (o[0] = [
        C(" Révéler le code ")
      ])),
      _: 1
    })) : (r(), d("button", {
      key: 1,
      type: "button",
      class: k(["relative inline-block items-center justify-center h-6.5 px-2 rounded-sm border border-dashed dark:font-bold font-medium text-xs text-black dark:text-white leading-5 cursor-pointer", s.value]),
      loading: a.codeFetchingStatus === "ongoing",
      onClick: l
    }, [
      a.isCodeCopiedInClipboard ? (r(), d(_, { key: 0 }, [
        o[1] || (o[1] = i("i", { class: "fa-regular fa-check" }, null, -1)),
        o[2] || (o[2] = C(" Code copié "))
      ], 64)) : a.codeFetchingStatus === "success" ? (r(), d(_, { key: 1 }, [
        o[3] || (o[3] = i("i", { class: "fa-light fa-tags" }, null, -1)),
        C(" " + S(a.code), 1)
      ], 64)) : a.codeFetchingStatus === "failure" ? (r(), d(_, { key: 2 }, [
        o[4] || (o[4] = i("i", { class: "fa-regular fa-circle-exclamation" }, null, -1)),
        o[5] || (o[5] = C(" ERREUR "))
      ], 64)) : B("", !0)
    ], 10, be));
  }
}), Se = { class: "font-medium whitespace-nowrap" }, ve = {
  key: 1,
  class: "fa-stack fa-2xs"
}, xe = {
  key: 2,
  class: "fa-thumbs-up fa-solid"
}, ye = /* @__PURE__ */ b({
  __name: "ROfferIcon",
  props: {
    icon: {}
  },
  setup(c) {
    const n = c, { icon: t } = V(n);
    return (e, s) => {
      var l, a;
      return r(), d("span", Se, [
        (l = p(t)) != null && l.iconName ? (r(), d(_, { key: 0 }, [
          p(t).secondaryIconName ? (r(), d("div", ve, [
            i("i", {
              class: k([
                "fa-stack-2x",
                `fa-${p(t).iconName}`,
                `fa-${p(t).iconStyle ?? "solid"}`
              ])
            }, null, 2),
            i("i", {
              class: k([
                "fa-stack-1x",
                `${p(t).iconStyle !== "light" ? "fa-inverse" : ""}`,
                `fa-${p(t).secondaryIconName}`,
                `fa-${p(t).secondaryIconStyle ?? "solid"}`,
                `fa-${p(t).secondaryIconSize ?? "xs"}`
              ])
            }, null, 2)
          ])) : (r(), d("i", {
            key: 0,
            class: k([`fa-${p(t).iconName}`, `fa-${p(t).iconStyle ?? "solid"}`])
          }, null, 2))
        ], 64)) : (a = p(t)) != null && a.altText ? (r(), d("span", {
          key: 1,
          class: k({
            "text-[83.3%]": p(t).altText.length === 5,
            "text-[66.7%]": p(t).altText.length > 5
          })
        }, S(p(t).altText), 3)) : (r(), d("i", xe))
      ]);
    };
  }
}), Oe = /* @__PURE__ */ b({
  __name: "SerpSnippetOffer",
  props: {
    offer: {},
    position: { default: 1 }
  },
  emits: ["copyOfferCodeActionRequested", "fetchOfferCodeActionRequested", "openOfferUrlActionRequested"],
  setup(c, { expose: n, emit: t }) {
    n();
    const e = c, s = y(null), l = L(() => e.offer.offerType === "CODE"), a = t, h = { props: e, el: s, isCodeButtonDisplayable: l, emit: a, handleCodeButtonClick: (A) => {
      s.value != null && (A.eventType === "requestCode" ? a("fetchOfferCodeActionRequested", e.offer, s.value) : a("copyOfferCodeActionRequested", e.offer, s.value));
    }, handleOpenUrlButtonClick: () => {
      s.value != null && a("openOfferUrlActionRequested", e.offer, s.value);
    }, get RCodeButton() {
      return _e;
    }, get ROfferIcon() {
      return ye;
    }, get RTooltip() {
      return Y;
    } };
    return Object.defineProperty(h, "__isScriptSetup", { enumerable: !1, value: !0 }), h;
  }
});
content;
const Le = {
  ref: "el",
  class: "flex gap-1.5 flex-row items-center color-serp-text-light dark:color-serp-text-dark text-xs leading-4.5 border-t border-t-solid border-t-grey-600 dark:border-t-grey-300 first:border-t-none"
}, Me = { class: "flex-[0_0_auto] self-start min-w-6 px-0 py-2 overflow-ellipsis whitespace-nowrap" }, we = ["innerHTML"], Be = ["title"], Ae = {
  key: 0,
  class: "flex-auto"
}, Re = ["innerHTML"];
function Ie(c, n, t, e, s, l) {
  var f;
  const a = I("tag"), o = I("track");
  return M((r(), d("div", Le, [
    i("div", Me, [
      (f = t.offer.icon) != null && f.caption ? (r(), g(e.RTooltip, { key: 0 }, {
        content: m(() => [
          i("span", {
            innerHTML: t.offer.icon.caption
          }, null, 8, we)
        ]),
        default: m(() => [
          w(e.ROfferIcon, {
            icon: t.offer.icon
          }, null, 8, ["icon"])
        ]),
        _: 1
      })) : (r(), g(e.ROfferIcon, {
        key: 1,
        icon: t.offer.icon
      }, null, 8, ["icon"]))
    ]),
    i("div", {
      class: "[ -truncate ] flex-initial",
      title: t.offer.shortTitle
    }, S(t.offer.shortTitle), 9, Be),
    t.offer.descriptionHtml ? (r(), d("div", Ae, [
      w(e.RTooltip, null, {
        content: m(() => [
          i("div", {
            innerHTML: t.offer.descriptionHtml
          }, null, 8, Re)
        ]),
        default: m(() => [
          n[0] || (n[0] = i("i", { class: "fa-solid fa-circle-info text-grey-400 dark:text-grey-300" }, null, -1))
        ]),
        _: 1
      })
    ])) : B("", !0),
    e.isCodeButtonDisplayable ? (r(), g(e.RCodeButton, {
      key: 1,
      "offer-id": t.offer.id,
      code: t.offer.code,
      "code-fetching-status": t.offer.codeFetchingStatus,
      "is-code-copied-in-clipboard": t.offer.isCodeCopiedInClipboard,
      onCodeButtonClick: e.handleCodeButtonClick
    }, null, 8, ["offer-id", "code", "code-fetching-status", "is-code-copied-in-clipboard"])) : B("", !0),
    i("button", {
      class: "[all:initial] px-0 py-0.5 text-grey-400 text-xs cursor-pointer",
      type: "button",
      title: "Voir l'offre",
      onClick: e.handleOpenUrlButtonClick
    }, n[1] || (n[1] = [
      i("i", { class: "fa-regular fa-arrow-up-right-from-square" }, null, -1)
    ]))
  ])), [
    [a, { label: "Offer", linkedEntities: { offer: t.offer }, position: t.position }],
    [
      o,
      "offer_impression",
      "impression",
      { once: !0 }
    ]
  ]);
}
const Te = /* @__PURE__ */ v(Oe, [["render", Ie], ["__file", "SerpSnippetOffer.vue"]]), Pe = /* @__PURE__ */ b({
  __name: "SerpSnippetSeeAllOffersLink",
  props: {
    merchantName: {},
    offerCount: {}
  },
  setup(c, { expose: n }) {
    n();
    const t = {};
    return Object.defineProperty(t, "__isScriptSetup", { enumerable: !1, value: !0 }), t;
  }
});
content;
const Ue = { class: "my-1" }, qe = {
  class: "text-xs leading-3.5 no-underline cursor-pointer hover:underline active:underline",
  target: "_blank"
};
function Fe(c, n, t, e, s, l) {
  return r(), d("div", Ue, [
    i("a", qe, [
      n[0] || (n[0] = C(" > Découvrir les ")),
      i("b", null, S(t.offerCount), 1),
      C(" offres " + S(t.merchantName), 1)
    ])
  ]);
}
const Ee = /* @__PURE__ */ v(Pe, [["render", Fe], ["__file", "SerpSnippetSeeAllOffersLink.vue"]]), Ne = 6, je = /* @__PURE__ */ b({
  __name: "SerpSnippetMerchantsAndOffers",
  props: {
    merchants: {},
    targetUrl: {}
  },
  setup(c, { expose: n }) {
    n();
    const t = c, e = W("businessService");
    if (e == null)
      throw Error("Injection for businessService failed");
    const s = G(), l = J(
      t.merchants.length === 1 ? t.merchants[0] : void 0
    ), a = y("pending"), o = L(
      () => s.actionableOffers.filter(
        (u) => {
          var x;
          return u.merchantId === ((x = l.value) == null ? void 0 : x.id) && !u.giftCardCashback;
        }
      )
    ), f = y(!1), h = y(!1), { openUrl: A } = Z(), R = (u) => {
      if (u.isAffiliated && !u.isAffiliatedWithNetworkDisallowingUserSolicitation) {
        A(u);
        return;
      }
      new Promise((x) => setTimeout(x, 0)).then(async () => {
        await e.registerUserClick(!0, u.id), open(t.targetUrl || u.url, "_blank");
      }).catch(console.error);
    }, { copyCode: U, fetchCode: q, openUrl: F } = $(), T = (u) => {
      e.setSelectedMerchantId(u.id, u.url).then(() => {
        R(u);
      }).catch(console.error);
    }, P = { props: t, businessService: e, offersStore: s, selectedMerchant: l, selectedMerchantOffersLoadingStatus: a, selectedMerchantOffers: o, showMerchantLightList: f, showSelectedMerchantOffers: h, maxOfferListSize: Ne, openUrl: A, openMerchantUrl: R, copyCode: U, fetchCode: q, openOfferUrl: F, selectMerchant: T, toggleMerchantLightList: () => {
      f.value = !f.value;
    }, toggleOfferList: async () => {
      if (l.value === void 0 || (h.value = !h.value, a.value !== "pending" || !h.value))
        return;
      a.value = "ongoing";
      const u = l.value.id;
      try {
        const x = await e.getMerchantOffers(u);
        s.setOffers([
          ...s.offers.filter((E) => E.merchantId !== u),
          ...x
        ]), a.value = "success";
      } catch {
        a.value = "failure";
      }
    }, handlePoulpeoLogoClick: () => {
      l.value && R(l.value);
    }, handleCashbackOfferClick: () => {
      l.value && R(l.value);
    }, handleSeeAllOffersClick: () => {
      l.value && T(l.value);
    }, SerpSnippetCollapse: oe, SerpSnippetLoader: ie, SerpSnippetMerchant: fe, SerpSnippetMerchantLightList: X, SerpSnippetMerchantSelector: ge, SerpSnippetOffer: Te, SerpSnippetSeeAllOffersLink: Ee };
    return Object.defineProperty(P, "__isScriptSetup", { enumerable: !1, value: !0 }), P;
  }
});
content;
const He = { class: "m-serpSnippetMerchantsAndOffers" };
function De(c, n, t, e, s, l) {
  var o;
  const a = I("tag");
  return r(), d("div", He, [
    e.selectedMerchant === void 0 ? M((r(), g(e.SerpSnippetCollapse, {
      key: 0,
      expanded: e.showMerchantLightList,
      onHeaderClick: e.toggleMerchantLightList
    }, {
      header: m(() => [
        w(e.SerpSnippetMerchantSelector, {
          "merchant-count": t.merchants.length
        }, null, 8, ["merchant-count"])
      ]),
      content: m(() => [
        w(e.SerpSnippetMerchantLightList, {
          merchants: t.merchants,
          onMerchantClick: e.selectMerchant
        }, null, 8, ["merchants"])
      ]),
      _: 1
    }, 8, ["expanded"])), [
      [a, { label: "MerchantsCollapse" }]
    ]) : M((r(), g(e.SerpSnippetCollapse, {
      key: 1,
      enabled: (((o = e.selectedMerchant.merchantInfo) == null ? void 0 : o.nbOffers) ?? 0) > 0,
      expanded: e.showSelectedMerchantOffers,
      onPoulpeoLogoClick: e.handlePoulpeoLogoClick,
      onToggleIconClick: e.toggleOfferList
    }, K({
      header: m(() => [
        w(e.SerpSnippetMerchant, {
          merchant: e.selectedMerchant,
          onCashbackOfferClick: e.handleCashbackOfferClick,
          onOfferCountClick: e.toggleOfferList
        }, null, 8, ["merchant"])
      ]),
      _: 2
    }, [
      e.showSelectedMerchantOffers ? {
        name: "content",
        fn: m(() => [
          e.selectedMerchantOffersLoadingStatus !== "success" ? (r(), g(e.SerpSnippetLoader, {
            key: 0,
            text: "Chargement des offres…",
            "error-text": "Le chargement des offres a échoué",
            status: e.selectedMerchantOffersLoadingStatus
          }, null, 8, ["status"])) : (r(), d(_, { key: 1 }, [
            (r(!0), d(_, null, Q(e.selectedMerchantOffers.slice(0, e.maxOfferListSize), (f) => (r(), g(e.SerpSnippetOffer, {
              key: f.id,
              offer: f,
              onCopyOfferCodeActionRequested: e.copyCode,
              onFetchOfferCodeActionRequested: e.fetchCode,
              onOpenOfferUrlActionRequested: e.openOfferUrl
            }, null, 8, ["offer", "onCopyOfferCodeActionRequested", "onFetchOfferCodeActionRequested", "onOpenOfferUrlActionRequested"]))), 128)),
            e.selectedMerchantOffers.length > e.maxOfferListSize ? M((r(), g(e.SerpSnippetSeeAllOffersLink, {
              key: 0,
              "merchant-name": e.selectedMerchant.name,
              "offer-count": e.selectedMerchantOffers.length,
              onClick: e.handleSeeAllOffersClick
            }, null, 8, ["merchant-name", "offer-count"])), [
              [a, { label: "SeeAllOffersLink" }]
            ]) : B("", !0)
          ], 64))
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["enabled", "expanded"])), [
      [a, { label: "OffersCollapse" }]
    ])
  ]);
}
const et = /* @__PURE__ */ v(je, [["render", De], ["__file", "SerpSnippetMerchantsAndOffers.vue"]]);
export {
  et as default
};
content;
