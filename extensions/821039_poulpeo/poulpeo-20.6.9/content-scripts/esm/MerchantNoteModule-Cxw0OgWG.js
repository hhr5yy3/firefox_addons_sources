import { O as s, ad as a, e as c, a9 as o } from "./esm-index-C1muFETj.js";
const d = {
  setup() {
    const n = s(), { selectedMerchant: e } = a(n), t = c(() => {
      if (e.value == null)
        return "";
      const r = new DOMParser().parseFromString(
        e.value.merchantNote,
        "text/html"
      ).body.textContent ?? "";
      return r.trim() === "" ? "" : r;
    });
    return () => t.value ? o(
      "div",
      { class: "mb-module w-full inline-block" },
      o(
        "h2",
        { class: "text-center -colorGrey mb-0 mt-3" },
        t.value
      )
    ) : null;
  }
};
content;
export {
  d as MerchantNoteModule
};
content;
