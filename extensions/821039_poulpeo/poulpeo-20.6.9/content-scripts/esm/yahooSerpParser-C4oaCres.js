import { M as a } from "./esm-index-C1muFETj.js";
const o = (e) => e.querySelector("h3 > a, .compTitle > a"), d = (e, t) => t === "before_description" ? e.querySelector(".compTitle") : e.querySelector(":nth-last-child(1 of .compText)"), c = {
  searchEngineName: "Yahoo!",
  urlPattern: a,
  colorSchemes: {
    light: {
      text: "#4d5156",
      link: "#1a0dab",
      linkVisited: "#660099"
    },
    dark: {
      text: "#4d5156",
      link: "#1a0dab",
      linkVisited: "#660099"
    }
  },
  getResultList() {
    return document.querySelectorAll(
      ".searchCenterTopAds > li, .searchCenterMiddle > li, .searchCenterBottomAds > li"
    );
  },
  getDisplayedUrl(e) {
    var l, i;
    const t = e.querySelector(".ad-domain"), n = ((l = t == null ? void 0 : t.textContent) == null ? void 0 : l.replace(/\s/g, "")) ?? "";
    if (n !== "")
      return `https://${n}`;
    let r = ((i = o(e)) == null ? void 0 : i.href) ?? "";
    return r.includes("/RU=") ? (r = r.split("/").filter((s) => s.startsWith("RU="))[0] ?? "", r = decodeURIComponent(r.substring(3)), r || void 0) : r;
  },
  getTargetUrl(e) {
    var t;
    return (((t = o(e)) == null ? void 0 : t.href) ?? "") || void 0;
  },
  canHostSnippet(e, t) {
    return o(e) !== null && d(e, t) !== null;
  },
  addSnippetContainerToResult(e, t, n) {
    n === "before_description" ? (e.style.paddingTop = "1px", e.style.paddingBottom = "4px") : (e.style.paddingTop = "7px", e.style.paddingBottom = "4px");
    const r = d(t, n);
    return r == null || r.insertAdjacentElement("afterend", e), r !== null;
  }
};
content;
export {
  c as yahooSerpParser
};
content;
