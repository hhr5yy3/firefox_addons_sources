import { ad as a, O as o, a9 as e } from "./esm-index-C1muFETj.js";
const u = {
  setup() {
    const { user: t } = a(o());
    return () => t.value ? e(
      "table",
      Object.entries(t.value).map(
        ([r, s]) => e("tr", [e("th", r), e("td", String(s))])
      )
    ) : e("div", "--");
  }
};
content;
export {
  u as UserModule
};
content;
