import "./index-3da6bb4f.js";
import { c as createAPI } from "./urlAccess-93f11c64.js";
const methods = {
  async metricView(metricsData) {
    this.metric({
      body: {
        name: metricsData.name,
        data: metricsData.data
      },
      method: "POST"
    });
  }
};
const metricViews = createAPI({
  name: "metrics:views",
  endpoint: "metric/",
  methods,
  read: () => {
  }
});
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  metricViews
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_8 as _
};
