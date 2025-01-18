import "./index-3da6bb4f.js";
import { c as createAPI } from "./urlAccess-93f11c64.js";
const firstUsageKey = "user_first_usage";
const extensionAPI = createAPI({
  name: "extension",
  default: () => {
  },
  async read() {
  },
  methods: {
    async didFirstClick() {
      const didFirstClick = localStorage.getItem(firstUsageKey) ? true : false;
      return didFirstClick;
    },
    async doFirstClick() {
      localStorage.setItem(firstUsageKey, "true");
    }
  }
});
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  extensionAPI
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_2 as _,
  extensionAPI as e
};
