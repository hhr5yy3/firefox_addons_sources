import "../../api.connect-c9891c88.js";
import { r as renderApp } from "../../App.view-01e97bc9.js";
import { l as logger } from "../../urlAccess-93f11c64.js";
import "../../index-3699c331.js";
import "../../index-3da6bb4f.js";
import "../../Button-e5b90d65.js";
import "../../PriceTrackNotifications.view-71344528.js";
import "../../metricsAlerts.api-6ae7940f.js";
import "../../analytics.saga-1b7095bf.js";
import "../../voucher.api-2bbc894e.js";
import "../../chollo_logo_dark.datauri-4a67f6d4.js";
import "../../extension.api-b6898106.js";
logger.log("ui env vars", { "VITE_ENDPOINT_ENV": "ENDPOINT_production", "VITE_GA_TRACKID": "UA-201381774-1", "VITE_AMPLITUDE_APIKEY": "a6c25343bc8b5de1226ea5501012ae6b", "VITE_SENTRY_DSN": "https://e561726aa4a243948cd55d272396cde9@o548651.ingest.sentry.io/5682487", "VITE_SENTRY_AUTH_TOKEN": "9dc8044b3fbb4094956b3bba45a9e2d131be5e386aaf4126bd6393dc0023f56a", "VITE_DEBUG_APIKEY": "fsSM42zywE6AdYTfKvOQzapD2JRVKn472rdok7Hp", "VITE_DEBUG_ENDPOINT": "https://4hmvn9jqe6.execute-api.eu-west-1.amazonaws.com/prod/scrapper/scrap-config", "VITE_INCLUDE_UTILS": "0", "VITE_NO_SHADOW_ROOT": "0", "VITE_SKIP_TUNNEL": "0", "VITE_FT_PI": "true", "VITE_ENDPOINT": "https://jqm86z5xub.execute-api.eu-west-1.amazonaws.com/v1", "VITE_METRICS_ENDPOINT": "https://wp1tzimk7i.execute-api.eu-west-1.amazonaws.com/v1/metrics", "VITE_NODE_ENV": "production", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true });
renderApp(["assets/App-defde59e.css","assets/Button-cc42555c.css","assets/PriceTrackNotifications-5036257e.css"]);
cholloExtensionDetection();
async function cholloExtensionDetection() {
  if (location.host.match("www.chollometro.com")) {
    const meta = document.createElement("meta");
    meta.name = "chollometro-extension";
    meta.setAttribute("version", (await import("../../urlAccess-93f11c64.js").then((n) => n.n)).default.version);
    document.head.appendChild(meta);
  }
}
