import { K as s } from "./esm-index-C1muFETj.js";
const l = (e) => e.querySelector("a.result__link"), i = (e, t) => t === "before_description" ? e.querySelector(".result__header") : e.querySelector(".result__columns"), p = {
  searchEngineName: "Ecosia",
  urlPattern: s,
  colorSchemes: {
    light: {
      text: "#333",
      link: "#004687",
      linkVisited: "#632f3c"
    },
    dark: {
      text: "#fff",
      link: "#96d6f8",
      linkVisited: "#0094c7"
    }
  },
  getResultList() {
    return document.querySelectorAll(".mainline__result-wrapper");
  },
  getDisplayedUrl(e) {
    var r;
    const t = l(e);
    return t === null ? void 0 : (((r = t.nextElementSibling) == null ? void 0 : r.matches(".ad-label-wrapper")) ?? !1) && t.textContent !== null ? `https://${t.textContent.split(" ")[0] ?? ""}` : t.href;
  },
  getTargetUrl(e) {
    var t;
    return (((t = l(e)) == null ? void 0 : t.href) ?? "") || void 0;
  },
  canHostSnippet(e, t) {
    return l(e) !== null && i(e, t) !== null;
  },
  addSnippetContainerToResult(e, t, n) {
    e.style.paddingRight = "4px", e.style.paddingLeft = "4px", n === "before_description" ? e.style.paddingBottom = "4px" : (e.style.order = "1", e.style.paddingTop = "7px");
    const r = i(t, n);
    return r == null || r.insertAdjacentElement("afterend", e), r !== null;
  }
};
content;
export {
  p as ecosiaSerpParser
};
content;
