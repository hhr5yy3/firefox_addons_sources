import "./DollarPolyfills-DiqWGOUq.js";
import { A as Action } from "./Action-nSgaiNub.js";
import { c as configManager, K as KeeLog } from "./ConfigManager-DadTRJhU.js";
import { m as mapState, u as useStore, o as openBlock, b as createBlock, w as withCtx, d as createVNode, r as resolveComponent, s as createPinia, x as createApp, y as h, z as createVuetify, A as components, B as directives, I as IPCPiniaPlugin } from "./IPCPiniaPlugin-DCrAOz1n.js";
import { P as Port } from "./mutation-types-BIvNkZ3d.js";
import { P as PasswordGenerator, _ as _export_sfc } from "./PasswordGenerator-_hnBzWs7.js";
import { s as setup } from "./i18n-CWi2JcO5.js";
import "./Entry-B0M4TtnG.js";
const _sfc_main = {
  components: {
    PasswordGenerator
  },
  data: () => ({
    showPasswordGenerator: false
  }),
  computed: {
    ...mapState(useStore, [
      "showGeneratePasswordLink",
      "connectionStatus",
      "connectionStatusDetail",
      "connected",
      "databaseIsOpen"
    ])
  },
  methods: {
    passwordGeneratorClosed: function() {
      Port.postMessage({ action: Action.CloseAllPanels });
    },
    copyToClipboard: function(payload) {
      if (payload == null ? void 0 : payload.value) {
        Port.postMessage({ copyToClipboard: payload.value });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PasswordGenerator = resolveComponent("PasswordGenerator");
  const _component_v_app = resolveComponent("v-app");
  return openBlock(), createBlock(_component_v_app, null, {
    default: withCtx(() => [
      createVNode(_component_PasswordGenerator, {
        standalone: true,
        topmost: true,
        onDialogClosed: $options.passwordGeneratorClosed,
        onCopyToClipboard: $options.copyToClipboard
      }, null, 8, ["onDialogClosed", "onCopyToClipboard"])
    ]),
    _: 1
  });
}
const Panel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
function updateFrameState(newState) {
}
let vueApp;
let store;
async function start() {
  await configManager.load();
  KeeLog.debug("iframe page starting");
  KeeLog.attachConfig(configManager.current);
  Port.startup("iframe_" + parentFrameId);
  const darkTheme = params["theme"] === "dark";
  switch (params["panel"]) {
    case "generatePassword":
      Port.raw.onMessage.addListener(function(m) {
        KeeLog.debug("In iframe script, received message from background script");
        if (m.initialState) {
          try {
            const piniaInstance = createPinia();
            vueApp = createApp({
              render: () => h(Panel, {})
            });
            const vuetify = createVuetify({
              components,
              directives,
              theme: {
                defaultTheme: darkTheme ? "dark" : "light",
                themes: {
                  dark: {
                    dark: true,
                    colors: {
                      primary: "#1a466b",
                      secondary: "#ABB2BF",
                      tertiary: "#e66a2b",
                      error: "#C34034",
                      info: "#2196F3",
                      success: "#4CAF50",
                      warning: "#FFC107"
                    }
                  },
                  light: {
                    dark: false,
                    colors: {
                      primary: "#1a466b",
                      secondary: "#13334e",
                      tertiary: "#e66a2b",
                      error: "#C34034",
                      info: "#2196F3",
                      success: "#4CAF50",
                      warning: "#FFC107"
                    }
                  }
                }
              }
            });
            piniaInstance.use(IPCPiniaPlugin);
            vueApp.use(vuetify);
            vueApp.use(piniaInstance);
            vueApp.config.globalProperties.$chrome = chrome;
            vueApp.config.globalProperties.$i18n = chrome.i18n.getMessage;
            store = useStore();
            store.$patch(m.initialState);
            vueApp.mount("#main");
            Port.postMessage({
              action: Action.GetPasswordProfiles
            });
          } catch (e) {
            KeeLog.error("Failed to create user interface.", e);
          }
        }
        if (m.mutation) {
          store.onRemoteMessage(Port.raw, m.mutation);
          return;
        }
        if (m.frameState)
          updateFrameState(m.frameState);
      });
      break;
  }
  KeeLog.info("iframe page ready");
}
const params = {};
document.location.search.substr(1).split("&").forEach((pair) => {
  const [key, value] = pair.split("=");
  params[key] = value;
});
const parentFrameId = parseInt(params["parentFrameId"]);
(async () => {
  await start();
})();
setup();
//# sourceMappingURL=vuePanels-Bx7HXPGv.js.map
