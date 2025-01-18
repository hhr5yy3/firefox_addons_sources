;(async () => {
  const chunks = ["/runtime.js",
"/vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js.js",
"/vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669.js",
"/default-libs_platform_src_index_ts.js",
"/default-src_app_platform_tsx.js",
"/calendly.externally_connectable.js",
];

  for(const c of chunks) {
    await import(browser.runtime.getURL(c));
  }
})();
