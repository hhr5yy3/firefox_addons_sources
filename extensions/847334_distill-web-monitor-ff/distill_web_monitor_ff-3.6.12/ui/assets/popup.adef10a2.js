import { s as serviceProxy, _ as __vitePreload } from "./service.04921d45.js";
import "./sentry.e73e6594.js";
(async () => {
  await serviceProxy.init();
  const App = (await __vitePreload(() => import("./AppPopup.0bec12b7.js"), true ? ["assets/AppPopup.0bec12b7.js","assets/AppPopup.b64b63cb.css","assets/sieve.0422c872.js","assets/sieve.a5720819.css","assets/service.04921d45.js","assets/label.d933b3ec.js"] : void 0)).default;
  const app = new App({
    target: document.body
  });
  window.App = app;
})();
