import { j as c, u as a } from "./esm-index-C1muFETj.js";
function s(t) {
  return typeof t == "function" ? t() : a(t);
}
function d(t = {}) {
  const { source: r } = t, n = c("");
  return {
    copy: async (o = s(r)) => {
      if (o != null) {
        try {
          await navigator.clipboard.writeText(o);
        } catch {
          const e = document.createElement("textarea");
          e.value = o, e.setAttribute("readonly", ""), e.style.position = "absolute", e.style.left = "-9999px", document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
        }
        n.value = o;
      }
    },
    text: n
  };
}
content;
export {
  d as u
};
content;
