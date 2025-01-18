import "./index-3da6bb4f.js";
import { c as createAPI } from "./urlAccess-93f11c64.js";
const similar_api = createAPI({
  name: "Similar",
  endpoint: "/pepper/similars",
  read() {
    return Promise.resolve("");
  },
  default: () => "",
  methods: {
    create(body) {
      return this.fetch("", { method: "POST", body: JSON.stringify(body) }, this.sender).then((res) => {
        return res.json();
      }).then((res) => res.data);
    }
  }
});
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: similar_api
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_10 as _
};
