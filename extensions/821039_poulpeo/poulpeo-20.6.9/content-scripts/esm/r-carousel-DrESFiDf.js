import { d as j, j as o, e as g, C as z, D as O, o as s, c as i, a as v, W as N, n as h, r as _, h as C, F as $, z as E, w as F, $ as A } from "./esm-index-C1muFETj.js";
const H = {
  key: 0,
  class: "flex flex-column justify-center gap-1 mt-3"
}, L = ["onClick"], T = /* @__PURE__ */ j({
  __name: "RCarousel",
  props: {
    compenseBoxShadow: { type: Boolean, default: !0 },
    gap: { default: "" }
  },
  setup(V) {
    const y = V, u = o(), d = o(), f = o(!1), w = o(0), m = o(0), c = o(0), r = o(0), n = o(0), k = g(
      () => r.value === 0 ? 0 : c.value * r.value - m.value - w.value
    ), l = o(0), p = g(() => Math.ceil(k.value / c.value)), B = g(() => !f.value || l.value === 0), S = g(() => !f.value || l.value >= p.value), M = g(
      () => p.value < 1 ? [] : new Array(r.value).fill(0).map((e, a) => ({
        index: a,
        isVisible: a <= p.value,
        key: `dot-${a}`,
        matchesCurrentIndex: l.value === a
      }))
    ), b = (e) => {
      l.value !== e && (e < 0 ? (n.value = 0, l.value = 0) : e >= p.value ? (n.value = k.value, l.value = p.value) : (n.value = e * c.value, l.value = e));
    }, P = () => {
      f.value = !0;
    }, R = () => {
      f.value = !1;
    };
    let D = -1;
    const W = (e) => {
      e.deltaX !== 0 && (e.preventDefault(), e.stopPropagation(), !(D > Date.now() - 200) && (D = Date.now(), b(l.value + Math.sign(e.deltaX))));
    }, X = () => {
      var e;
      if (!d.value || !u.value) {
        w.value = 0, c.value = 0, m.value = 0, r.value = 0, n.value = 0, l.value = 0;
        return;
      }
      const a = getComputedStyle(d.value), t = y.compenseBoxShadow ? a.getPropertyValue("--BOX-SHADOW-WIDTH") : "0px";
      w.value = u.value.getBoundingClientRect().width - 2 * Number.parseInt(t), m.value = y.gap === "" ? Number.parseInt(a.getPropertyValue("--grid-gap")) : Number.parseInt(y.gap);
      const x = ((e = d.value.children[0]) == null ? void 0 : e.getBoundingClientRect().width) ?? 0;
      c.value = x > 0 ? x + m.value : 0, r.value = d.value.children.length, n.value = 0, l.value = 0;
    }, I = new ResizeObserver(X);
    return z(() => {
      u.value && I.observe(u.value);
    }), O(() => {
      u.value && I.unobserve(u.value);
    }), (e, a) => (s(), i("div", null, [
      v("div", {
        ref_key: "carouselContainer",
        ref: u,
        class: "relative -scrollX overflow-hidden",
        style: N([
          e.compenseBoxShadow ? "" : { "--grid-compense-box-shadow": "0px" }
        ]),
        onMouseover: P,
        onMouseout: R,
        onWheel: W
      }, [
        v("div", {
          ref_key: "carouselElt",
          ref: d,
          style: N([
            e.gap ? { "--grid-gap": e.gap } : "",
            { transform: `translateX(${-n.value}px)` }
          ]),
          class: h([{
            "-noCompenseShadow": !e.compenseBoxShadow
          }, "-gridSingleRow transition-transform overflow-visible"])
        }, [
          _(e.$slots, "default")
        ], 6),
        r.value > 1 ? (s(), i("div", {
          key: 0,
          class: h(["absolute top-0 left-0 w-[calc(36px+var(--grid-compense-box-shadow))] h-full bg-gradient-to-r from-grey-900 from-13% to-transparent transition-opacity duration-300", { "opacity-0": B.value, "opacity-100": !B.value }])
        }, [
          v("button", {
            type: "button",
            class: "absolute top-1/2 -right-0.5 flex justify-center items-center w-9 h-9 m-0 -mt-4.5 p-0 text-sm bg-white rounded-full border border-solid border-grey-800 shadow shadow-grey-500 cursor-pointer",
            onClick: a[0] || (a[0] = (t) => b(l.value - 1))
          }, a[2] || (a[2] = [
            v("i", { class: "fa-regular fa-angle-left" }, null, -1)
          ]))
        ], 2)) : C("", !0),
        r.value > 1 ? (s(), i("div", {
          key: 1,
          class: h(["absolute top-0 right-0 w-[calc(36px+var(--grid-compense-box-shadow))] h-full bg-gradient-to-l from-grey-900 from-13% to-transparent transition-opacity duration-300", { "opacity-0": S.value, "opacity-100": !S.value }])
        }, [
          v("button", {
            type: "button",
            class: "absolute top-1/2 -left-0.5 flex justify-center items-center w-9 h-9 m-0 -mt-4.5 p-0 text-sm bg-white rounded-full border border-solid border-grey-800 shadow shadow-grey-500 cursor-pointer",
            onClick: a[1] || (a[1] = (t) => b(l.value + 1))
          }, a[3] || (a[3] = [
            v("i", { class: "fa-regular fa-angle-right" }, null, -1)
          ]))
        ], 2)) : C("", !0)
      ], 36),
      r.value > 1 ? (s(), i("div", H, [
        (s(!0), i($, null, E(M.value, (t) => F((s(), i("button", {
          key: t.key,
          class: h(["relative w-2 h-2 p-0 m-0 bg-grey-400 hover:bg-primary border-0 rounded-full cursor-pointer before:content-[''] before:absolute before:-top-0.5 before:-left-0.5 before:w-3 before:h-3 before:rounded-full", { "-backgroundPrimary": t.matchesCurrentIndex }]),
          type: "button",
          onClick: (x) => b(t.index)
        }, null, 10, L)), [
          [A, t.isVisible]
        ])), 128))
      ])) : C("", !0)
    ]));
  }
});
export {
  T as L
};
content;
