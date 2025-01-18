;(async () => {
  const chunks = ["/runtime.js",
"/vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js.js",
"/vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669.js",
"/vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef.js",
"/vendors-_calendly_ui_node_modules_classnames_index_js-node_modules_nx_js_node_modules_babel_r-b95540.js",
"/vendors-node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty_js-3472f0.js",
"/vendors-node_modules_prop-types_index_js.js",
"/vendors-node_modules_tanstack_react-virtual_dist_esm_index_js-node_modules_fuse_js_dist_fuse_-500317.js",
"/default-libs_platform_src_index_ts.js",
"/default-libs_syncstore_src_index_ts.js",
"/default-src_app_platform_tsx.js",
"/default-libs_assets_src_index_ts-libs_hooks_src_index_ts-_calendly_ui_dist_components_bare-bu-5822a1.js",
"/default-libs_shared_components_src_index_ts-_calendly_ui_dist_components_bare-button_styles_j-49f944.js",
"/default-libs_features_gcal_src_index_ts.js",
"/frame.js",
"/default-libs_features_linkedin_src_index_ts.js",
"/linkedIn.content.js",
];

  for(const c of chunks) {
    await import(browser.runtime.getURL(c));
  }
})();
