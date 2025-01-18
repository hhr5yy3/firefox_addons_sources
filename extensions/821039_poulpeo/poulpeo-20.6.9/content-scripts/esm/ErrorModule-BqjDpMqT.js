import { ad as a, O as s, a9 as o } from "./esm-index-C1muFETj.js";
const u = {
  setup() {
    const { error: e } = a(s());
    return e.value === void 0 ? () => o("div") : () => {
      var r;
      return o(
        "div",
        {
          class: "[ a-alert -danger ] mt-4 mb-module rounded flex-col"
        },
        [
          `Erreur : ${(r = e.value) == null ? void 0 : r.message}`,
          null
        ]
      );
    };
  }
};
content;
export {
  u as ErrorModule
};
content;
