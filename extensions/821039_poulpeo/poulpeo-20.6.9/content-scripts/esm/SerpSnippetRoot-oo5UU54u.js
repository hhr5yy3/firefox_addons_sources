import { d as S, A as g, j as f, _ as h, f as _, w as b, o as k, c as v, r as y, n as C } from "./esm-index-C1muFETj.js";
const R = (c) => {
  const s = [[255, 255, 255, 1]], r = /^rgb\((\d+), *(\d+), *(\d+)(?:, *(\d+))?\)$/;
  let o = c;
  for (; o !== null; ) {
    const t = r.exec(getComputedStyle(o).backgroundColor);
    if (o = o.parentElement, t === null || t[4] === "0")
      continue;
    const n = +(t[1] ?? 255), e = +(t[2] ?? 255), i = +(t[3] ?? 255), a = +(t[4] ?? 1);
    if (s.push([n, e, i, a]), a === 1)
      break;
  }
  return s.reduce((t, n) => {
    const [e, i, a, d] = t, [p, u, m, l] = n;
    return [
      (1 - l) * e + l * p,
      (1 - l) * i + l * u,
      (1 - l) * a + l * m,
      d
    ];
  });
};
content;
const $ = (c) => {
  const [s, r, o] = c, t = (n) => {
    const e = n / 255;
    return e <= 0.03928 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * t(s) + 0.7152 * t(r) + 0.0722 * t(o);
};
content;
const w = /* @__PURE__ */ S({
  __name: "SerpSnippetRoot",
  props: {
    position: {},
    colorSchemes: {}
  },
  setup(c, { expose: s }) {
    s(), g((e) => ({
      d545180c: e.colorSchemes.light.text,
      d54c4272: e.colorSchemes.light.link,
      "2ef5e33a": e.colorSchemes.light.linkVisited,
      "311e6910": e.colorSchemes.dark.text,
      "311ad3dd": e.colorSchemes.dark.link,
      "0210548d": e.colorSchemes.dark.linkVisited,
      "659fc4be": o.value
    }));
    const r = getComputedStyle(document.body), o = f(r.fontFamily), t = $(R(document.body)) > 0.5 ? "light" : "dark", n = { pageStyle: r, fontFamily: o, theme: t };
    return Object.defineProperty(n, "__isScriptSetup", { enumerable: !1, value: !0 }), n;
  }
});
content;
function x(c, s, r, o, t, n) {
  const e = _("tag");
  return b((k(), v("div", {
    class: C(["m-serpSnippetRoot", o.theme])
  }, [
    y(c.$slots, "default")
  ], 2)), [
    [e, { label: "SerpSnippet", position: r.position }]
  ]);
}
const V = /* @__PURE__ */ h(w, [["render", x], ["__file", "SerpSnippetRoot.vue"]]);
export {
  V as default
};
content;
