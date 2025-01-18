import { s as serviceProxy, _ as __vitePreload } from "./service.04921d45.js";
(async () => {
  await serviceProxy.init();
  const App = (await __vitePreload(() => import("./AppHTMLSelector.0aeb964d.js"), true ? ["assets/AppHTMLSelector.0aeb964d.js","assets/AppHTMLSelector.d43a1011.css","assets/sieve.0422c872.js","assets/sieve.a5720819.css","assets/service.04921d45.js","assets/Accordion.3fd5a551.js","assets/Accordion.3d01708c.css"] : void 0)).default;
  new App({
    target: document.body
  });
})();
