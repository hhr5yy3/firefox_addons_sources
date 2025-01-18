import { s as serviceProxy, _ as __vitePreload } from "./service.04921d45.js";
import "./sentry.e73e6594.js";
var jquery_atwho = "";
(async () => {
  await serviceProxy.init();
  const CookieStore = (await __vitePreload(() => import("./store-cookie.cf48c6ed.js"), true ? [] : void 0)).default;
  const Store = serviceProxy.store.SimpleStore;
  const App = (await __vitePreload(() => import("./AppLocal.7ab96f14.js"), true ? ["assets/AppLocal.7ab96f14.js","assets/AppLocal.47949993.css","assets/sieve.0422c872.js","assets/sieve.a5720819.css","assets/service.04921d45.js","assets/label.d933b3ec.js","assets/Accordion.3fd5a551.js","assets/Accordion.3d01708c.css"] : void 0)).default;
  const cookieStore = new CookieStore();
  const store = new Store("ui:store");
  await store.__init__();
  let storeValues = cookieStore.getAll();
  storeValues.forEach((item) => {
    store.set(item.key, item.value);
    cookieStore.del(item.key);
  });
  const app = new App({
    target: document.body
  });
  app.store = store;
  window.App = app;
})();
