import "./DollarPolyfills-DiqWGOUq.js";
import { c as configManager, K as KeeLog } from "./ConfigManager-DadTRJhU.js";
import { C as defineComponent, D as ref, o as openBlock, b as createBlock, w as withCtx, a as createBaseVNode, e as createTextVNode, t as toDisplayString, c as createElementBlock, i as createCommentVNode, d as createVNode, r as resolveComponent, s as createPinia, x as createApp, y as h, z as createVuetify, A as components, B as directives, I as IPCPiniaPlugin, u as useStore } from "./IPCPiniaPlugin-DCrAOz1n.js";
import { b as isFirefox } from "./index-D6ogrY8Q.js";
import { s as setup } from "./i18n-CWi2JcO5.js";
import "./mutation-types-BIvNkZ3d.js";
import "./Entry-B0M4TtnG.js";
const _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAOdEVYdFRpdGxlAEtlZSBsb2dvN59B9AAAABB0RVh0QXV0aG9yAEtlZSBWYXVsdGXwy5UAAAkNSURBVHicvZtrbFTHFYC/ubtrGz+wMbYBAwYCpGAjSAlIKFCaJg38C1WVqr+a9kfUFkjTVqrSqBXCVUnVSq0a4gdQpbyiNApWCyQUsIHgtJA0EEMSHqYEEoO9u6xtMLbXa3sfd/rDOF179+7Ofay/fzsz554z586dx5mzgnFM++bGh1ya+B1SrEJQAYjxbRS4IoW20d9Y8+/4Qv+PqiqlJjcgxFPAQiGZIYUUSBEQGq1ScgLE4fL6y63xcjPWbV4rJDsQVFqwRSK5jeCMS4oX20/U+uIrx3Ru5pObp0qXuARyhgVF4+n0hUtn0lwd9T5ftVrE+AOC1YqyZyTilzPrL7//6KM/9PinerxAqQM23YiE5Ve7muuDowVafK10scGhzgOUPTW1bZ5vY9V+oXMmvvNt4Vy2BhbzdNsqnm5bxdbAYm5FJsXLrhHIs77NVXsLZobm4EznARa4Pdq34gvc8T+EYL6UzmjyCHl977TzB4Gq+PKWwUJ+5l/KoO76sszXn8PpgRJemXGJ5ZPu/7+x5Puvz/545eobaz+LSrHQEcOEvij+59gRIAk4oSNPi7J/VkuFGNf5KBpbA4vHdH6UkO5ia2AR0bEm4ZKy8vVZFyrytKgTpiGk8Mf/HqNN0/RmJ5T8dto1FmYHc8aXXxgs4k40ofhL/NEcLg4WJpQvzO7P/k3Zf50wTUe634kvGOOAjuM7PgWu2dGwvqCTtXndSes6o1lp5QPR7KTlj+d3sb6g045pAP/0ndx+O75AS2wja6w+XQDPTWkzrJ/uHkr7jBnuQcO656a0WVqTRxGS7ePLEhwQI3cf0GNFwZq8u8zLChnWP5LTyyyPcQdne0Isy+kzrJ+XFWJN3l0rpgFc8p6oOzW+MMEBgaY/DgCvWdHwRF5Xynq3kLw8vZV8V+KEVqBF2Ta9FbdIvQw9kZ/880qPSHj7MG4ZHEW6qRNRfm5Ub8TK3Ptp21Rl9/Hm7I/Y31PBxaFCkLB80n2endKu9ImsnGRpcHZp/Z6/Jasw/KTK128+gOQ7qhrytSjND52xYpxpvn7zawzIxKXUCAnb/E11W5LVJZkEH6AnHzJGFLkiZprboshtSldEc2m7jCoNHeA7UXtWSM6raskRuhmjbJFNzEzzBu+xmg6jSuMRAOhCKo+CHt1jxihb3NXT7ydG0YSWsg8pHVBcWNYA+FK1GeV+NIthPeXjHGFIavTHlOfm9zsaa86lapDS4isN1WGBqFfRFAM+GS5SNcwyF0NF6IrbISHFK+napH1lMhzeBRjvXuL4YGCKSjNb/GdQWUe7N1JyMF2jtA7wNf+lG8EbKhoP901PetJziiGpcaR/ulpjKWpprk57hFT6aGMyth1IGyno0z0c7lM00AIHe8vpjSlNtiFN8yjtZpUcEGjaeRlkwj46GTvvzUt55LVKZzSbXT1zVZvv62j88z2VhsrTthAy7YQCENTdbA0sJiKdWxEiUmNLoJKg2uwvpa5+olW20tu44yiKsYKWwUJeulNJVNo5vI4QA7YEFtGSJFBiQKP/ZH1r+mYjmHlNEkmtauP3Bkr4qX8p99S+2aTcjWbxgm8ZJ4NlyjI64lUzOky9otLHN+V7skQ7oLzgl7jCvFByk/UFAVTXBx1BY38Z27vn0x1T3/UB13xNdZUoTNijmFqzQm3nwwXzV5aAeExZRro4PVDKqWAZK3LvMyXNoenKcAHP+5bxj75yQiZOfCPIrf03zyufX8DcJzCiwi1qwdxpBOCLcC5v96ZfIvfdm8MX4VyzjwfoeRDNMoVpB/iP1t2SkHaHlYxU47I7lsWfuhfw3kCJlUcDvPYgmmUKUxGfUYQut6OJZ6zIJqMjMonvtq+0c5iKSjd1VgQtafSdrD8DfGRFNhkzPYNsK7vKgizTLxAACYf8R+tuWZG17HIpzUWMUiGAb+R380bFeRZl95uX19XjFuOx7IDiopIDMPaayS4uIEczG1kSLQ9GpCUsO2AkViCVYgUqXB6azE/8S/lYfccHgJQobdGNsDQJjhJzabu0mP5rwPLppzOazcudD3M2NNWCtPAXF5UcsDMMbZ1Y7hyr6QKpFCswIiw1ei3GE4XUd1xpqA7b0W/7yKbpmlKswIhZnkH2zrrA9vJLVGUbX4slYSgqdMNwtyq2HdBxsvYSgnftPmd17l32zL7IkhR3g2OQvBlo2mn7utiRQ7uwORHFo5qhIrTU4W5VHHGA97HSoyA/s/OMM6FiftCxnCvDk1Wan/Y21nxiR98ozoRtqqt1BKbO4fG0R3L5hW8JV4cK1ARE4j2/VRyLW0WG2Qv0WpGd7QlxaO45vj3ZlzZAIeBz3+TOI1b0JMMxB3Q11weR1vIKYCR75Fdl11mVlzqWqQtqaGgwfRw3wtG7LN0VsxQrGCWou+gIp9xT9Q9r2m6rz0+Gow64c3xnm4BDZuUiUmP3vQo23FpFeyRlMGTPvWM1pjYL6XD8NlNPcxubjK5YFn/vm5nu0kPXhPUELiMcd8BIgrRoMSNT7h7i8NwPean0OvlGCZGCIx2N9TecsDGejNxnS4O8Aplijnej80yhj6qc5PEA4WD8IZ6MOKB4culbyWIFXSkSJVuH89noXcaHoaS3v5e8TbW2t9vJyIgDrjRUh4XUd4wv/2CwmGCS2+PdPXN4tn0F5w2vvjPz9iFDDgCIuV07gTF5b8GYm993PpywTjb2l6U6TnZlhYO2jtypyJgDRmIFJOTmHQ9OY5P3EVoGi4hIjaDuZiBFToGEXW3Ne9MnEFrE/u1lCqat+/ESF65PbeiJaNHYvI53d3qdtCuejGY1jeQVcNqqvEC+lcnOQ4YdAICN5UsIl+MbnwQdmVYAiPJ1m1uBr5iUO+trqluTCYPiyfwIGIkXmg6fZ2rjM56JcADhnME9mIsV3FZJcXOCCXFA99u7+6Xgr8oCUtSppLg5wYQ4AAAXr6IWKwgJXao7yyYT5gD/0bpbQorDCk33eU/VWf5fjFkmbgSglH1uKsXNCSbUAf6mun8hML7JFbxjJsXNCSbUAQBaTGwi+YrQg9BfnGh7MpfZbEDf5+c6CxeuOCp1rQJBGTAAnNJ08T1vU/3Vibbnf9OAKkJQZUQWAAAAAElFTkSuQmCC";
const _imports_1 = "/dist/assets/pinChromeScreenshot-C3NwP9gp.png";
const _hoisted_1 = { id: "i18n_root" };
const _hoisted_2 = { style: { "font-size": "42px" } };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  style: { "margin-bottom": "4px", "margin-right": "10px", "display": "inline" }
}, null, -1);
const _hoisted_4 = { style: { "font-weight": "bold" } };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = {
  href: "https://kee.pm/open-source/",
  target: "_blank"
};
const _hoisted_7 = {
  href: "https://kee.pm/extension-permissions/",
  target: "_blank"
};
const _hoisted_8 = { key: 2 };
const _hoisted_9 = {
  key: 3,
  style: { "margin-top": "24px" },
  width: "309",
  src: _imports_1
};
const _hoisted_10 = { key: 4 };
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("tr", null, [
  /* @__PURE__ */ createBaseVNode("th"),
  /* @__PURE__ */ createBaseVNode("th", null, "Kee Vault"),
  /* @__PURE__ */ createBaseVNode("th", null, "KeePass")
], -1);
const _hoisted_12 = {
  href: "https://forum.kee.pm/t/installing-kee-instructions/23",
  target: "_blank"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    async function requestPermissions() {
      const permissionsToRequest = {
        origins: ["<all_urls>"]
      };
      await chrome.permissions.request(permissionsToRequest);
    }
    async function checkPermissions() {
      const permissionsToCheck = {
        origins: ["<all_urls>"]
      };
      return await chrome.permissions.contains(permissionsToCheck);
    }
    async function switchToKeeVaultTab() {
      const vaultTabs = await chrome.tabs.query({
        url: ["https://keevault.pm/*", "https://app-beta.kee.pm/*", "https://app-dev.kee.pm/*"]
      });
      if (vaultTabs && vaultTabs[0]) {
        chrome.tabs.update(vaultTabs[0].id, { active: true });
        chrome.windows.update(vaultTabs[0].windowId, { focused: true });
        return true;
      }
      return false;
    }
    async function initialiseDatabaseSourcePossibilities(permissionsInfoWasShown = false) {
      if (await switchToKeeVaultTab()) {
        close();
      } else {
        showDatabaseSourceOptions.value = true;
        showPermissionsInfo.value = false;
        if (permissionsInfoWasShown)
          showToolbarInfo.value = false;
      }
    }
    async function asyncSetup() {
      document.title = "Kee " + extensionVersion.value;
      if (await checkPermissions()) {
        await initialiseDatabaseSourcePossibilities();
      } else {
        chrome.permissions.onAdded.addListener(async (permissions) => {
          if (permissions.origins.includes("<all_urls>")) {
            await initialiseDatabaseSourcePossibilities(true);
          }
        });
        showPermissionsInfo.value = true;
      }
    }
    function loadKeeVault() {
      window.open("https://keevault.pm");
      close();
    }
    const manifest = chrome.runtime.getManifest();
    const showPermissionsInfo = ref(false);
    const showDatabaseSourceOptions = ref(false);
    const extensionVersion = ref(manifest.version);
    const showToolbarInfo = ref(!isFirefox());
    asyncSetup.call(this);
    return (_ctx, _cache) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_app = resolveComponent("v-app");
      return openBlock(), createBlock(_component_v_app, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("h1", _hoisted_2, [
              _hoisted_3,
              createTextVNode(toDisplayString(_ctx.$i18n("welcome_to_kee")), 1)
            ]),
            createBaseVNode("p", _hoisted_4, toDisplayString(_ctx.$i18n("introduction_to_kee")), 1),
            showPermissionsInfo.value ? (openBlock(), createElementBlock("p", _hoisted_5, [
              createTextVNode(toDisplayString(_ctx.$i18n("all_sites_permissions_required_start")) + " ", 1),
              createBaseVNode("a", _hoisted_6, toDisplayString(_ctx.$i18n("all_sites_permissions_required_why_open_source_link_text")), 1),
              createTextVNode(" " + toDisplayString(_ctx.$i18n("all_sites_permissions_required_middle")) + " ", 1),
              createBaseVNode("a", _hoisted_7, toDisplayString(_ctx.$i18n("all_sites_permissions_required_permissions_link_text")), 1),
              createTextVNode(" " + toDisplayString(_ctx.$i18n("all_sites_permissions_required_end")), 1)
            ])) : createCommentVNode("", true),
            showPermissionsInfo.value ? (openBlock(), createBlock(_component_v_btn, {
              key: 1,
              color: "primary",
              style: { "margin-top": "24px" },
              size: "x-large",
              onClick: requestPermissions
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$i18n("continue")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true),
            showToolbarInfo.value ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(_ctx.$i18n("recommend_action_button_should_be_pinned")), 1)) : createCommentVNode("", true),
            showToolbarInfo.value ? (openBlock(), createElementBlock("img", _hoisted_9)) : createCommentVNode("", true),
            showDatabaseSourceOptions.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
              createBaseVNode("p", null, toDisplayString(_ctx.$i18n("kee_works_with_a_password_manager")), 1),
              createBaseVNode("p", null, toDisplayString(_ctx.$i18n("recommend_start_with_kee_vault")), 1),
              createBaseVNode("p", null, toDisplayString(_ctx.$i18n("recommend_start_with_kee_vault2")), 1),
              createVNode(_component_v_btn, {
                color: "primary",
                style: { "margin-top": "24px" },
                size: "x-large",
                onClick: loadKeeVault
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$i18n("load_kee_vault_now")), 1)
                ]),
                _: 1
              }),
              createBaseVNode("p", null, toDisplayString(_ctx.$i18n("you_can_use_KeePass_instead")) + " " + toDisplayString(_ctx.$i18n("table_summarises_differences")), 1),
              createBaseVNode("table", null, [
                _hoisted_11,
                createBaseVNode("tr", null, [
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("access_from_multiple_devices")), 1),
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("yes")), 1),
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("no")) + " *", 1)
                ]),
                createBaseVNode("tr", null, [
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("shared_preferences")), 1),
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("yes_configure_once")), 1),
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("no_configure_multiple")), 1)
                ]),
                createBaseVNode("tr", null, [
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("installation_required")), 1),
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("no")), 1),
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("yes")), 1)
                ]),
                createBaseVNode("tr", null, [
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("difficulty")), 1),
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("difficulty_kee_vault")), 1),
                  createBaseVNode("td", null, toDisplayString(_ctx.$i18n("difficulty_keepass")), 1)
                ])
              ]),
              createBaseVNode("p", null, "* " + toDisplayString(_ctx.$i18n("keepass_sync_config_explanation")), 1),
              createBaseVNode("p", null, [
                createTextVNode(toDisplayString(_ctx.$i18n("point_user_to_keepass_install_instructions_start")) + " ", 1),
                createBaseVNode("a", _hoisted_12, toDisplayString(_ctx.$i18n("point_user_to_forum_link_text")), 1),
                createTextVNode(toDisplayString(_ctx.$i18n("point_user_to_keepass_install_instructions_end")), 1)
              ])
            ])) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      });
    };
  }
});
let vueApp;
let store;
async function start() {
  await configManager.load();
  KeeLog.debug("install notes page starting");
  KeeLog.attachConfig(configManager.current);
  try {
    const piniaInstance = createPinia();
    vueApp = createApp({
      render: () => h(_sfc_main, {})
    });
    const vuetify = createVuetify({
      components,
      directives,
      theme: {
        defaultTheme: configManager.activeTheme,
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
    vueApp.mount("#main");
  } catch (e) {
    KeeLog.error("Failed to create user interface.", e);
  }
  KeeLog.info("install notes page ready");
}
(async () => {
  await start();
})();
setup();
//# sourceMappingURL=installNotes-DRPQ3Vx_.js.map
