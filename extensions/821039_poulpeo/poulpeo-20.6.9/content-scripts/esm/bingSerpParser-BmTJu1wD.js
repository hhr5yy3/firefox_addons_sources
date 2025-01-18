import { J as o } from "./esm-index-C1muFETj.js";
const i = (e) => e.querySelector("h2 > a"), l = (e, t) => {
  var r;
  return t === "before_description" ? e.querySelector(".b_go_big > h2") ?? e.querySelector(".b_title") ?? e.querySelector("h2") : ((r = e.querySelector(".b_caption.b_rich")) == null ? void 0 : r.previousElementSibling) ?? e.querySelector(".b_caption");
}, c = {
  searchEngineName: "Bing",
  urlPattern: o,
  colorSchemes: {
    light: {
      text: "#71777d",
      link: "#1a0dab",
      linkVisited: "#8e24aa"
    },
    dark: {
      text: "#d2d0ce",
      link: "#82c7ff",
      linkVisited: "#9ea2ff"
    }
  },
  getResultList() {
    return document.querySelectorAll("#b_results .b_algo, #b_results .sb_add");
  },
  getDisplayedUrl(e) {
    var r;
    let t = ((r = e.querySelector(".b_attribution cite")) == null ? void 0 : r.textContent) ?? "";
    if (t = t.replace(/\s/g, "").replace(/›/g, "/"), t.length !== 0)
      return t.startsWith("http") ? t : `https://${t}`;
  },
  getTargetUrl(e) {
    var t;
    return (((t = i(e)) == null ? void 0 : t.href) ?? "") || void 0;
  },
  canHostSnippet(e, t) {
    return i(e) !== null && l(e, t) !== null;
  },
  addSnippetContainerToResult(e, t, r) {
    r === "before_description" ? (e.style.paddingTop = "4px", e.style.paddingBottom = "4px") : e.style.paddingBottom = "13px";
    const n = l(t, r);
    return n == null || n.insertAdjacentElement("afterend", e), n !== null;
  }
};
content;
export {
  c as bingSerpParser
};
content;
