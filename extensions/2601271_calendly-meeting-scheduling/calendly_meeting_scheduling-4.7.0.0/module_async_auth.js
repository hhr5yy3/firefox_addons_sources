;(async () => {
  const chunks = ["/runtime.js",
"/vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js.js",
"/auth.js",
];

  for(const c of chunks) {
    await import(browser.runtime.getURL(c));
  }
})();
