import { o as openBlock, c as createElementBlock, a as createBaseVNode, u as useStore, m as mapState, b as createBlock, w as withCtx, g as withKeys, r as resolveComponent, d as createVNode, e as createTextVNode, t as toDisplayString, i as createCommentVNode } from "./IPCPiniaPlugin-DCrAOz1n.js";
import { P as Port } from "./mutation-types-BIvNkZ3d.js";
import { A as Action } from "./Action-nSgaiNub.js";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$4 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
}, null, -1);
const _hoisted_3$4 = [
  _hoisted_2$4
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, [..._hoisted_3$4]);
}
const __unplugin_components_2$1 = { name: "mdi-eye-off", render: render$3 };
const _hoisted_1$3 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
}, null, -1);
const _hoisted_3$3 = [
  _hoisted_2$3
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._hoisted_3$3]);
}
const __unplugin_components_1 = { name: "mdi-eye", render: render$2 };
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m7 10l5 5l5-5z"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._hoisted_3$2]);
}
const __unplugin_components_3 = { name: "mdi-menu-down", render: render$1 };
const _hoisted_1$1 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m7 15l5-5l5 5z"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._hoisted_3$1]);
}
const __unplugin_components_2 = { name: "mdi-menu-up", render };
const _sfc_main = {
  props: ["field", "standalone", "topmost"],
  emits: ["copy-to-clipboard", "dialog-closed"],
  setup() {
    const { updateGeneratedPassword } = useStore();
    return { updateGeneratedPassword };
  },
  data: () => ({
    selectedProfile: "",
    forceCopy: false,
    revealed: false,
    loading: false,
    cachedGeneratedPassword: ""
  }),
  computed: {
    ...mapState(useStore, ["PasswordProfiles", "saveState", "generatedPassword"]),
    items: function() {
      return this.PasswordProfiles.map((p) => p.name);
    },
    disabled: function() {
      return !this.cachedGeneratedPassword;
    },
    forceCopyHint: function() {
      return this.forceCopy ? this.$i18n("generatePassword_done_2") : "";
    },
    renderedPassword: function() {
      return this.revealed ? this.cachedGeneratedPassword : "*".repeat(this.cachedGeneratedPassword.length);
    },
    okButtonText: function() {
      if (this.standalone) {
        return this.$i18n("generator_action_copy");
      } else if (this.forceCopy) {
        return this.$i18n("generator_action_apply_and_copy");
      } else {
        return this.$i18n("generator_action_apply");
      }
    },
    cancelButtonText: function() {
      return this.standalone ? this.$i18n("close") : this.$i18n("cancel");
    },
    dialogTransition: function() {
      return this.topmost ? "false" : "dialog-transition";
    }
  },
  methods: {
    ok: async function() {
      if (this.standalone || this.forceCopy) {
        this.$emit("copy-to-clipboard", { value: this.cachedGeneratedPassword });
      }
      this.$emit("dialog-closed", { value: this.cachedGeneratedPassword });
    },
    cancel: function() {
      this.$emit("dialog-closed");
    },
    profileChanged: function(item) {
      var _a, _b, _c;
      this.loading = true;
      const unwatch = this.$watch(
        "generatedPassword",
        (newValue) => {
          unwatch();
          this.cachedGeneratedPassword = newValue ?? "";
          this.loading = false;
        }
      );
      Port.postMessage({
        action: Action.GeneratePassword,
        passwordProfile: item,
        url: (_c = (_b = (_a = this.saveState) == null ? void 0 : _a.newEntry) == null ? void 0 : _b.URLs) == null ? void 0 : _c[0]
      });
    }
  }
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { key: 2 };
const _hoisted_5 = { class: "justify-self-end" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_select = resolveComponent("v-select");
  const _component_v_sheet = resolveComponent("v-sheet");
  const _component_mdi_eye = __unplugin_components_1;
  const _component_mdi_eye_off = __unplugin_components_2$1;
  const _component_v_btn = resolveComponent("v-btn");
  const _component_v_container = resolveComponent("v-container");
  const _component_v_card = resolveComponent("v-card");
  const _component_v_checkbox = resolveComponent("v-checkbox");
  const _component_v_card_text = resolveComponent("v-card-text");
  const _component_v_list_item = resolveComponent("v-list-item");
  const _component_v_card_actions = resolveComponent("v-card-actions");
  const _component_MdiMenuUp = __unplugin_components_2;
  const _component_MdiMenuDown = __unplugin_components_3;
  const _component_v_dialog = resolveComponent("v-dialog");
  return openBlock(), createBlock(_component_v_dialog, {
    "model-value": true,
    fullscreen: "",
    persistent: "",
    scrim: false,
    transition: $options.dialogTransition,
    onKeydown: withKeys($options.cancel, ["esc"])
  }, {
    default: withCtx(() => [
      createVNode(_component_v_card, null, {
        default: withCtx(() => [
          createBaseVNode("div", null, [
            createVNode(_component_v_card_text, null, {
              default: withCtx(() => [
                createVNode(_component_v_select, {
                  modelValue: _ctx.selectedProfile,
                  "onUpdate:modelValue": [
                    _cache[0] || (_cache[0] = ($event) => _ctx.selectedProfile = $event),
                    $options.profileChanged
                  ],
                  items: $options.items,
                  label: _ctx.$i18n("password_profile"),
                  color: "secondary",
                  hint: _ctx.$i18n("password_profile_hint"),
                  "persistent-hint": "",
                  class: "mt-0"
                }, null, 8, ["modelValue", "items", "label", "hint", "onUpdate:modelValue"]),
                createVNode(_component_v_card, {
                  loading: _ctx.loading,
                  class: "mx-auto px-3 py-0 mt-4",
                  style: { "font-family": "monospace" },
                  "max-width": "300"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_container, {
                      class: "justify-space-between",
                      style: { "display": "flex", "column-gap": "1rem" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_sheet, {
                          class: "flex-grow-1",
                          style: { "align-self": "center", "flex-shrink": "1", "overflow-wrap": "anywhere", "text-align": "center" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString($options.renderedPassword), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_sheet, { style: { "align-self": "center" } }, {
                          default: withCtx(() => [
                            createVNode(_component_v_btn, {
                              size: "small",
                              icon: "",
                              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.revealed = !_ctx.revealed)
                            }, {
                              default: withCtx(() => [
                                _ctx.revealed ? (openBlock(), createBlock(_component_mdi_eye, {
                                  key: 0,
                                  scale: "150"
                                })) : createCommentVNode("", true),
                                !_ctx.revealed ? (openBlock(), createBlock(_component_mdi_eye_off, {
                                  key: 1,
                                  scale: "150"
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["loading"]),
                !$props.standalone ? (openBlock(), createElementBlock("div", _hoisted_1, [
                  _hoisted_2,
                  createTextVNode(" " + toDisplayString(_ctx.$i18n("password_will_be_set_on_field")), 1)
                ])) : createCommentVNode("", true),
                !$props.standalone ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  createVNode(_component_v_checkbox, {
                    modelValue: _ctx.forceCopy,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.forceCopy = $event),
                    label: _ctx.$i18n("also_copy_to_clipboard")
                  }, null, 8, ["modelValue", "label"])
                ])) : createCommentVNode("", true),
                !$props.standalone ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString($options.forceCopyHint), 1)) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          createVNode(_component_v_card_actions, null, {
            default: withCtx(() => [
              createVNode(_component_v_list_item, { class: "w-100" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_5, [
                    createVNode(_component_v_btn, {
                      variant: "elevated",
                      color: "tertiary",
                      onClick: $options.cancel
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($options.cancelButtonText), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_v_btn, {
                      variant: "elevated",
                      color: "primary",
                      disabled: $options.disabled,
                      onClick: $options.ok
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($options.okButtonText), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      false ? (openBlock(), createBlock(_component_MdiMenuUp, { key: 0 })) : createCommentVNode("", true),
      false ? (openBlock(), createBlock(_component_MdiMenuDown, { key: 1 })) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["transition", "onKeydown"]);
}
const PasswordGenerator = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PasswordGenerator as P,
  _export_sfc as _,
  __unplugin_components_1 as a,
  __unplugin_components_2$1 as b
};
//# sourceMappingURL=PasswordGenerator-_hnBzWs7.js.map
