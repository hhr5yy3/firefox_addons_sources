const modules = /* @__PURE__ */ Object.assign({ "/src/ui/features/account/api/config/user-config.api.ts": () => import("./metricsAlerts.api-6ae7940f.js").then((n) => n._), "/src/ui/features/account/api/settings/user-settings.api.ts": () => import("./metricsAlerts.api-6ae7940f.js").then((n) => n.T), "/src/ui/features/app/api/extension/extension.api.ts": () => import("./extension.api-b6898106.js").then((n) => n._), "/src/ui/features/app/api/metrics/metricsAlerts.api.ts": () => import("./metricsAlerts.api-6ae7940f.js").then((n) => n.U), "/src/ui/features/app/api/metrics/metricsInstall.api.ts": () => import("./metricsInstall.api-01d1c521.js").then((n) => n._), "/src/ui/features/app/api/metrics/metricsPepper.api.ts": () => import("./metricsAlerts.api-6ae7940f.js").then((n) => n.V), "/src/ui/features/app/api/metrics/metricsSerp.api.ts": () => import("./metricsSerp.api-001fbd5b.js").then((n) => n._), "/src/ui/features/app/api/metrics/metricsSerpChollo.api.ts": () => import("./metricsSerpChollo.api-f5a4c373.js").then((n) => n._), "/src/ui/features/app/api/metrics/metricsviews.api.ts": () => import("./metricsviews.api-7ef95827.js").then((n) => n._), "/src/ui/features/pepper-posts/api/offer.api.ts": () => import("./offer.api-ccc5b063.js").then((n) => n._), "/src/ui/features/pepper-posts/api/similar.api.ts": () => import("./similar.api-b9696a8f.js").then((n) => n._), "/src/ui/features/pepper-posts/api/voucher.api.ts": () => import("./voucher.api-2bbc894e.js").then((n) => n._), "/src/ui/features/price-track/api/price-track-notifications/price-track-notifications.api.ts": () => import("./metricsAlerts.api-6ae7940f.js").then((n) => n.W), "/src/ui/features/price-track/api/price-track/price-track.api.ts": () => import("./metricsAlerts.api-6ae7940f.js").then((n) => n.X) });
for (const filename of Object.keys(modules)) {
  modules[filename]().then((apiHandler) => {
    const moduleKeys = Object.keys(apiHandler);
    if (moduleKeys.length === 1) {
      const moduleKey = moduleKeys[0];
      return connectAPIHandler(apiHandler[moduleKey]);
    }
    throw new Error();
  }).catch((e) => {
  });
}
function connectAPIHandler(apiHandler) {
  apiHandler.connect();
}
