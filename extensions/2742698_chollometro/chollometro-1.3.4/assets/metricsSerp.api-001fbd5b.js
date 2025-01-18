import "./index-3da6bb4f.js";
import { c as createAPI } from "./urlAccess-93f11c64.js";
const methods = {
  async metricSerpShop(metricsData) {
    this.metric({
      body: {
        name: metricsData.name,
        data: metricsData.data
      },
      method: "POST"
    });
  }
};
const metricSerpApi = createAPI({
  name: "metrics:serp",
  endpoint: "metric/",
  methods,
  read: () => {
  }
});
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  metricSerpApi
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_6 as _,
  metricSerpApi as m
};
