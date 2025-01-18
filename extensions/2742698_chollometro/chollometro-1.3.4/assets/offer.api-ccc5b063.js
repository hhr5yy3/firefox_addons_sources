import "./index-3da6bb4f.js";
import { c as createAPI } from "./urlAccess-93f11c64.js";
const offer_api = createAPI({
  name: "Offers",
  endpoint: "/pepper/offers",
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
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: offer_api
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_9 as _
};
