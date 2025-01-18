import { d as j, o as t, c as l, a as r, q as H, i as X, F as S, z as A, g as q, u as b, j as v, e as p, C as Z, D as E, W as P, n as Y, r as G, h as k, w as T, $ as O, t as y, O as J, ad as Q, a9 as L } from "./esm-index-C1muFETj.js";
const I = {
  key: 0,
  class: "flex flex-column justify-center gap-1 mt-3"
}, _ = ["onClick"], $ = /* @__PURE__ */ j({
  __name: "RCarousel",
  props: {
    compenseBoxShadow: { type: Boolean, default: !0 },
    gap: { default: "" }
  },
  setup(m) {
    const n = m, i = v(), s = v(), e = v(!1), c = v(0), x = v(0), d = v(0), f = v(0), g = v(0), B = p(
      () => f.value === 0 ? 0 : d.value * f.value - x.value - c.value
    ), u = v(0), w = p(() => Math.ceil(B.value / d.value)), M = p(() => !e.value || u.value === 0), U = p(() => !e.value || u.value >= w.value), K = p(
      () => w.value < 1 ? [] : new Array(f.value).fill(0).map((a, o) => ({
        index: o,
        isVisible: o <= w.value,
        key: `dot-${o}`,
        matchesCurrentIndex: u.value === o
      }))
    ), R = (a) => {
      u.value !== a && (a < 0 ? (g.value = 0, u.value = 0) : a >= w.value ? (g.value = B.value, u.value = w.value) : (g.value = a * d.value, u.value = a));
    }, W = () => {
      e.value = !0;
    }, N = () => {
      e.value = !1;
    };
    let V = -1;
    const C = (a) => {
      a.deltaX !== 0 && (a.preventDefault(), a.stopPropagation(), !(V > Date.now() - 200) && (V = Date.now(), R(u.value + Math.sign(a.deltaX))));
    }, D = () => {
      var a;
      if (!s.value || !i.value) {
        c.value = 0, d.value = 0, x.value = 0, f.value = 0, g.value = 0, u.value = 0;
        return;
      }
      const o = getComputedStyle(s.value), h = n.compenseBoxShadow ? o.getPropertyValue("--BOX-SHADOW-WIDTH") : "0px";
      c.value = i.value.getBoundingClientRect().width - 2 * Number.parseInt(h), x.value = n.gap === "" ? Number.parseInt(o.getPropertyValue("--grid-gap")) : Number.parseInt(n.gap);
      const F = ((a = s.value.children[0]) == null ? void 0 : a.getBoundingClientRect().width) ?? 0;
      d.value = F > 0 ? F + x.value : 0, f.value = s.value.children.length, g.value = 0, u.value = 0;
    }, z = new ResizeObserver(D);
    return Z(() => {
      i.value && z.observe(i.value);
    }), E(() => {
      i.value && z.unobserve(i.value);
    }), (a, o) => (t(), l("div", null, [
      r("div", {
        ref_key: "carouselContainer",
        ref: i,
        class: "relative -scrollX overflow-hidden",
        style: P([
          a.compenseBoxShadow ? "" : { "--grid-compense-box-shadow": "0px" }
        ]),
        onMouseover: W,
        onMouseout: N,
        onWheel: C
      }, [
        r("div", {
          ref_key: "carouselElt",
          ref: s,
          style: P([
            a.gap ? { "--grid-gap": a.gap } : "",
            { transform: `translateX(${-g.value}px)` }
          ]),
          class: Y([{
            "-noCompenseShadow": !a.compenseBoxShadow
          }, "-gridSingleRow transition-transform overflow-visible"])
        }, [
          G(a.$slots, "default")
        ], 6),
        f.value > 1 ? (t(), l("div", {
          key: 0,
          class: Y(["absolute top-0 left-0 w-[calc(36px+var(--grid-compense-box-shadow))] h-full bg-gradient-to-r from-grey-900 from-13% to-transparent transition-opacity duration-300", { "opacity-0": M.value, "opacity-100": !M.value }])
        }, [
          r("button", {
            type: "button",
            class: "absolute top-1/2 -right-0.5 flex justify-center items-center w-9 h-9 m-0 -mt-4.5 p-0 text-sm bg-white rounded-full border border-solid border-grey-800 shadow shadow-grey-500 cursor-pointer",
            onClick: o[0] || (o[0] = (h) => R(u.value - 1))
          }, o[2] || (o[2] = [
            r("i", { class: "fa-regular fa-angle-left" }, null, -1)
          ]))
        ], 2)) : k("", !0),
        f.value > 1 ? (t(), l("div", {
          key: 1,
          class: Y(["absolute top-0 right-0 w-[calc(36px+var(--grid-compense-box-shadow))] h-full bg-gradient-to-l from-grey-900 from-13% to-transparent transition-opacity duration-300", { "opacity-0": U.value, "opacity-100": !U.value }])
        }, [
          r("button", {
            type: "button",
            class: "absolute top-1/2 -left-0.5 flex justify-center items-center w-9 h-9 m-0 -mt-4.5 p-0 text-sm bg-white rounded-full border border-solid border-grey-800 shadow shadow-grey-500 cursor-pointer",
            onClick: o[1] || (o[1] = (h) => R(u.value + 1))
          }, o[3] || (o[3] = [
            r("i", { class: "fa-regular fa-angle-right" }, null, -1)
          ]))
        ], 2)) : k("", !0)
      ], 36),
      f.value > 1 ? (t(), l("div", I, [
        (t(!0), l(S, null, A(K.value, (h) => T((t(), l("button", {
          key: h.key,
          class: Y(["relative w-2 h-2 p-0 m-0 bg-grey-400 hover:bg-primary border-0 rounded-full cursor-pointer before:content-[''] before:absolute before:-top-0.5 before:-left-0.5 before:w-3 before:h-3 before:rounded-full", { "-backgroundPrimary": h.matchesCurrentIndex }]),
          type: "button",
          onClick: (F) => R(h.index)
        }, null, 10, _)), [
          [O, h.isVisible]
        ])), 128))
      ])) : k("", !0)
    ]));
  }
}), ee = ["title"], ae = {
  key: 0,
  class: "a-stars__star fa-solid fa-star"
}, te = {
  key: 1,
  class: "a-stars__star fa-solid fa-star-half-stroke"
}, re = {
  key: 2,
  class: "a-stars__star fa-regular fa-star"
}, se = /* @__PURE__ */ j({
  __name: "RRating",
  props: {
    rating: {},
    maxRating: {}
  },
  setup(m) {
    const n = m, i = [...Array(n.maxRating).keys()].map((c) => c + 1), s = p(() => Math.round((n.rating + Number.EPSILON) * 100) / 100), e = p(() => `${s.value}/${n.maxRating}`);
    return (c, x) => (t(), l("div", {
      class: "a-stars text-xs",
      title: e.value
    }, [
      (t(!0), l(S, null, A(b(i), (d) => (t(), l(S, { key: d }, [
        Math.trunc(s.value) >= d ? (t(), l("i", ae)) : s.value >= d - 0.5 ? (t(), l("i", te)) : (t(), l("i", re))
      ], 64))), 128))
    ], 8, ee));
  }
}), oe = { class: "[ m-quote ] bg-white px-3 m-0 w-57.5 min-w-57.5 max-w-57.5 -box" }, le = {
  cite: "https://www.example.com/the-citation",
  class: "[ m-quote__citation ] leading-4 my-2 text-sm whitespace-break-spaces line-clamp-6"
}, ne = ["href"], ie = { class: "font-medium" }, ue = { class: "-colorGrey" }, ce = /* @__PURE__ */ j({
  __name: "RFeedback",
  props: {
    id: {},
    message: {},
    rating: {},
    author: {},
    date: {},
    link: {},
    source: {}
  },
  setup(m) {
    const n = m, i = p(
      () => n.source !== void 0 && n.source.length > 0 ? `( ${n.source} )` : ""
    );
    function s(e) {
      return new Date(e).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    }
    return (e, c) => (t(), l("div", oe, [
      c[1] || (c[1] = r("i", { class: "[ m-quote__icon ] fa-solid fa-fw fa-quote-left -colorPrimary" }, null, -1)),
      r("q", le, y(e.message), 1),
      e.rating ? (t(), q(b(se), {
        key: 0,
        rating: e.rating,
        "max-rating": 5,
        class: "text-[9px]"
      }, null, 8, ["rating"])) : k("", !0),
      e.link && e.author && e.date ? (t(), l("a", {
        key: 1,
        class: "-initial text-center text-xs mt-2",
        href: e.link,
        target: "_blank"
      }, [
        c[0] || (c[0] = r("span", { class: "-colorGrey" }, "Par", -1)),
        r("span", ie, " " + y(e.author) + " ", 1),
        r("span", ue, "le " + y(s(e.date)) + " " + y(i.value), 1)
      ], 8, ne)) : k("", !0)
    ]));
  }
}), de = "data:image/png;base64,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", ve = { class: "mb-module" }, me = {
  class: "flex flex-col items-center mt-3 bg-white pt-1.5 -initial",
  href: "https://fr.trustpilot.com/review/www.poulpeo.com",
  target: "_blank"
}, fe = ["src"], he = /* @__PURE__ */ j({
  __name: "RFeedbackModule",
  props: {
    trustpilotReviews: {}
  },
  setup(m) {
    const n = new URL(de, self.location.href).href;
    return (i, s) => (t(), l("div", ve, [
      s[1] || (s[1] = r("div", { class: "flex justify-between align-center items-center mb-3" }, [
        r("h2", { class: "mb-0" }, "Feedback"),
        r("a", {
          class: "text-xs cursor-pointer hover:no-underline",
          href: "https://fr.trustpilot.com/review/www.poulpeo.com",
          target: "_blank"
        }, " Voir plus ")
      ], -1)),
      H(b($), null, {
        default: X(() => [
          (t(!0), l(S, null, A(i.trustpilotReviews, (e) => (t(), q(b(ce), {
            key: e.id,
            id: e.id,
            message: e.message,
            rating: e.rating,
            author: e.author,
            date: e.date,
            link: e.link,
            source: e.source
          }, null, 8, ["id", "message", "rating", "author", "date", "link", "source"]))), 128))
        ]),
        _: 1
      }),
      r("a", me, [
        r("img", {
          src: b(n),
          class: "w-44.25"
        }, null, 8, fe),
        s[0] || (s[0] = r("h4", { class: "mt-1.25 mb-0 text-xxs -colorGrey" }, " +10 000 utilisateurs satisfaits ", -1))
      ])
    ]));
  }
}), ge = {
  async setup() {
    const m = J(), { trustpilotReviews: n } = Q(m);
    return () => L(he, { trustpilotReviews: n.value });
  }
};
content;
export {
  ge as FeedbackModule
};
content;
