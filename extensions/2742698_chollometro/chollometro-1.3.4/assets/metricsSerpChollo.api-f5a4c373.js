import "./index-3da6bb4f.js";
import { c as createAPI } from "./urlAccess-93f11c64.js";
const metricSerpCholloApi = createAPI({
  name: "metrics:serp:chollo",
  endpoint: "metric/",
  methods: {
    async metricSerpToChollo(metricsData) {
      this.metric({
        body: {
          name: metricsData.name,
          data: metricsData.data
        },
        method: "POST"
      });
    }
  },
  read: () => {
  }
});
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  metricSerpCholloApi
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_7 as _,
  metricSerpCholloApi as m
};
