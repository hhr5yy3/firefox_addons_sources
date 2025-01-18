import { _ as _export_sfc } from "./_plugin-vue_export-helper-8461c927.js";
import { d as createElementBlock, c as openBlock, j as createApp } from "./vendor-e74b1f13.js";
const _sfc_main = {
  methods: {
    init: () => {
      document.title = "[" + window.location.hash.substring(1).replace("http://", "").replace("https://", "").replace(/\/$/, "") + "]";
      window.addEventListener(
        "focus",
        () => {
          window.location.replace(window.location.hash.substr(1));
        },
        false
      );
    }
  },
  beforeMount() {
    this.init();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div");
}
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
createApp(App).mount("#app");
//# sourceMappingURL=LazyLoading-c0cd47d9.js.map
