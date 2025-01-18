import { L as a } from "./esm-index-C1muFETj.js";
const l = (e) => e.querySelector("a[href], a[data-rw]"), s = (e, t) => {
  var o, r;
  return t === "before_description" ? ((o = l(e)) == null ? void 0 : o.parentElement) ?? null : e.querySelector('[data-snf="nke7rc"]') ?? // basic natural result
  ((r = e.querySelector(".v5yQqb")) == null ? void 0 : r.nextElementSibling) ?? // ad with sub-results
  e.querySelector(".g > [data-hveid]") ?? // natural result with sub-results
  null;
}, u = {
  searchEngineName: "Google",
  urlPattern: a,
  colorSchemes: {
    light: {
      text: "#4d5156",
      link: "#1a0dab",
      linkVisited: "#681da8"
    },
    dark: {
      text: "#bdc1c6",
      link: "#8ab4f8",
      linkVisited: "#c58af9"
    }
  },
  addResultListUpdateListener(e) {
    const t = document.querySelector("#botstuff .WtZO4e");
    if (t === null)
      return;
    new MutationObserver(
      (r) => {
        for (const { addedNodes: n } of r)
          for (const d of n) {
            if (!(d instanceof HTMLElement))
              continue;
            const i = new MutationObserver(() => {
              e(d.querySelectorAll(".g[data-hveid]")), i.disconnect();
            });
            i.observe(d, { childList: !0 });
          }
      }
    ).observe(t, { childList: !0 });
  },
  getResultList() {
    return document.querySelectorAll(
      [
        "#tads .uEierd",
        // top ads
        "#rso [data-hveid] > .g",
        // natural results
        "#rso .g[data-hveid]",
        // natural sub result
        "#tadsb .uEierd",
        // bottom ads
        '[data-async-context^="query:"] .g[data-hveid]'
        // infinite scroll results
      ].join(", ")
    );
  },
  getDisplayedUrl(e) {
    var t;
    return (((t = l(e)) == null ? void 0 : t.href) ?? "") || void 0;
  },
  getTargetUrl(e) {
    const t = l(e);
    return ((t == null ? void 0 : t.dataset.rw) ?? "") || ((t == null ? void 0 : t.href) ?? "") || void 0;
  },
  canHostSnippet(e, t) {
    return l(e) !== null && s(e, t) !== null;
  },
  addSnippetContainerToResult(e, t, o) {
    o === "before_description" ? (e.style.paddingTop = "4px", e.style.paddingBottom = "4px") : (e.style.paddingTop = "7px", e.style.gridColumn = "1 / -1");
    const r = s(t, o);
    r == null || r.insertAdjacentElement("afterend", e), o === "after_description" && e.nextElementSibling && (e.style.paddingBottom = "7px");
    let n = e;
    for (; n != null && n.parentElement && n.parentElement !== t; )
      n = n.parentElement, n.style.overflow = "visible", n.style.contain = "none", n.style.position = "relative", n.style.zIndex = "1";
    return r !== null;
  }
};
content;
export {
  u as googleSerpParser
};
content;
