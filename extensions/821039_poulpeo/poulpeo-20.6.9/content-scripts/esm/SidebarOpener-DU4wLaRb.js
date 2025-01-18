import { u as p } from "./useFileUrl-CiXCJe8n.js";
import { d as u, e as c, _ as m, o as f, c as k, a as n, T as v, n as _, W as g } from "./esm-index-C1muFETj.js";
const b = /* @__PURE__ */ u({
  __name: "SidebarOpener",
  props: {
    minified: { type: Boolean, default: !1 },
    usePointer: { type: Boolean, default: !1 }
  },
  emits: ["click", "removeButtonClick"],
  setup(s, { expose: o, emit: a }) {
    o();
    const e = s, i = a, t = p("/img/poulpeo-logo-white.svg"), r = c(() => ({
      "-minified": e.minified,
      "-pointer": e.usePointer
    })), d = c(() => e.minified ? [] : [`background: ${[
      `no-repeat center url(${t.value})`,
      "linear-gradient(to right,var(--color-gradient-secondary) -25%, var(--color-gradient-primary) 95%)"
    ].join(",")}`]), l = { props: e, emit: i, poulpeoLogo: t, cssClasses: r, style: d };
    return Object.defineProperty(l, "__isScriptSetup", { enumerable: !1, value: !0 }), l;
  }
});
content;
function x(s, o, a, e, i, t) {
  return f(), k("div", {
    class: _(["[ m-sidebarOpener -hiddenFullscreen ]", e.cssClasses]),
    style: g(e.style),
    onClick: o[1] || (o[1] = (r) => e.emit("click"))
  }, [
    n("span", {
      class: "[ m-sidebarOpenerRemovalButton ] hidden !absolute top--1 left--1 !w-3 !h-3 fa-stack text-xs",
      onClick: o[0] || (o[0] = v((r) => e.emit("removeButtonClick"), ["prevent", "stop"]))
    }, o[2] || (o[2] = [
      n("i", { class: "fa-stack-1x fa-solid fa-xmark color-grey-100" }, null, -1),
      n("i", { class: "fa-stack-1x fa-solid fa-circle-xmark color-white" }, null, -1)
    ]))
  ], 6);
}
const O = /* @__PURE__ */ m(b, [["render", x], ["__file", "SidebarOpener.vue"]]);
export {
  O as default
};
content;
