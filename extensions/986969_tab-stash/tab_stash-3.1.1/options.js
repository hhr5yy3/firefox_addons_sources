import { d as defineComponent, o as openBlock, b as createElementBlock, e as createBaseVNode, E as renderSlot, s as createTextVNode, t as toDisplayString, h as createCommentVNode, j as required, a2 as logErrorsFrom, a3 as LOCAL_DEF, a4 as SYNC_DEF, c as computed, a as resolveComponent, f as createVNode, w as withCtx, T as TransitionGroup, y as withDirectives, P as vModelCheckbox, i as withModifiers, N as vModelSelect, z as vModelRadio, V as vModelText, n as normalizeClass, m as createBlock, q as launch, M as Model } from "./assets/launch-vue.js";
import { O as OopsNotification } from "./assets/oops-notification.js";
import { _ as _export_sfc } from "./assets/_plugin-vue_export-helper.js";
import "./assets/notification.js";
const _sfc_main$1 = defineComponent({
  emits: ["update:modelValue"],
  props: {
    name: String,
    modelValue: Boolean,
    default_value: Boolean,
    issue: Number
  },
  methods: {
    set(ev) {
      this.$emit("update:modelValue", ev.target.checked);
    },
    reset() {
      this.$emit("update:modelValue", this.default_value);
    }
  }
});
const _hoisted_1$1 = { class: "feature-flag" };
const _hoisted_2$1 = ["for"];
const _hoisted_3$1 = {
  key: 0,
  class: "issue"
};
const _hoisted_4$1 = ["href"];
const _hoisted_5$1 = ["name", "id", "checked"];
const _hoisted_6$1 = ["disabled"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1$1, [
    createBaseVNode("label", { for: _ctx.name }, [
      createBaseVNode("h5", null, [
        renderSlot(_ctx.$slots, "summary"),
        _cache[4] || (_cache[4] = createTextVNode("  ")),
        _ctx.issue !== void 0 ? (openBlock(), createElementBlock("span", _hoisted_3$1, [
          _cache[2] || (_cache[2] = createTextVNode("[")),
          createBaseVNode("a", {
            href: `https://github.com/josh-berry/tab-stash/issues/${_ctx.issue}`
          }, "#" + toDisplayString(_ctx.issue), 9, _hoisted_4$1),
          _cache[3] || (_cache[3] = createTextVNode("]"))
        ])) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$1),
    createBaseVNode("input", {
      type: "checkbox",
      name: _ctx.name,
      id: _ctx.name,
      checked: _ctx.modelValue,
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.set && _ctx.set(...args))
    }, null, 40, _hoisted_5$1),
    createBaseVNode("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.reset && _ctx.reset(...args)),
      disabled: _ctx.modelValue === _ctx.default_value
    }, " Reset ", 8, _hoisted_6$1),
    createBaseVNode("div", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
const FeatureFlag = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
function prop(model, name) {
  return computed({
    get() {
      return model.state[name];
    },
    set(v) {
      logErrorsFrom(() => model.set({ [name]: v }));
    }
  });
}
function options(model) {
  const ret = { sync: {}, local: {} };
  for (const k of Object.keys(SYNC_DEF)) {
    ret.sync[k] = prop(model.sync, k);
  }
  for (const k of Object.keys(LOCAL_DEF)) {
    ret.local[k] = prop(model.local, k);
  }
  return ret;
}
const _sfc_main = defineComponent({
  components: { FeatureFlag, OopsNotification },
  props: {
    model: required(Object)
  },
  data() {
    return options(this.model);
  },
  computed: {
    showCrashReport() {
      return this.model.showCrashReport.value;
    }
  },
  watch: {
    browser_action_show(val) {
      switch (val) {
        case "popup":
          logErrorsFrom(
            () => this.model.sync.set({ browser_action_stash: "none" })
          );
          break;
        case "none":
          if (this.model.sync.state.browser_action_stash === "none") {
            logErrorsFrom(
              () => this.model.sync.set({ browser_action_stash: "single" })
            );
          }
          break;
      }
    },
    browser_action_stash(val) {
      switch (val) {
        case "none":
          if (this.model.sync.state.browser_action_show === "none") {
            logErrorsFrom(
              () => this.model.sync.set({ browser_action_show: "tab" })
            );
          }
          break;
        default:
          if (this.model.sync.state.browser_action_show === "popup") {
            logErrorsFrom(
              () => this.model.sync.set({ browser_action_show: "tab" })
            );
          }
          break;
      }
    }
  },
  methods: {
    local_def() {
      return LOCAL_DEF;
    },
    sync_def() {
      return SYNC_DEF;
    },
    showCrashReports() {
      logErrorsFrom(
        () => this.model.local.set({ hide_crash_reports_until: void 0 })
      );
    }
  }
});
const _hoisted_1 = { class: "advanced show-advanced" };
const _hoisted_2 = { for: "meta_show_advanced" };
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = ["disabled"];
const _hoisted_8 = ["disabled"];
const _hoisted_9 = ["disabled"];
const _hoisted_10 = { key: 0 };
const _hoisted_11 = { for: "open_stash_in_sidebar" };
const _hoisted_12 = { for: "open_stash_in_tab" };
const _hoisted_13 = { for: "open_stash_in_none" };
const _hoisted_14 = { class: "advanced" };
const _hoisted_15 = {
  for: "new_folder_timeout_min",
  title: "If the top-most group has a name, or is older than this, a new, unnamed group will be created instead."
};
const _hoisted_16 = { class: "two-col" };
const _hoisted_17 = { for: "deleted_items_expiration_days" };
const _hoisted_18 = {
  for: "after_stashing_tab_hide",
  title: "Hidden tabs that are still loaded can be restored instantly. They also preserve anything you had entered into the tab and its history (e.g. Back button)."
};
const _hoisted_19 = {
  for: "autodiscard_hidden_tabs",
  title: "Monitors the total number of tabs in your browser, and if you have a lot of tabs open, unloads hidden tabs that haven't been used recently. This option significantly reduces memory usage and is recommended for most users."
};
const _hoisted_20 = ["disabled"];
const _hoisted_21 = { for: "autodiscard_interval_min" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = { for: "autodiscard_min_keep_tabs" };
const _hoisted_24 = ["disabled"];
const _hoisted_25 = { for: "autodiscard_target_age_min" };
const _hoisted_26 = ["disabled"];
const _hoisted_27 = { for: "autodiscard_target_tab_count" };
const _hoisted_28 = ["disabled", "min"];
const _hoisted_29 = {
  for: "after_stashing_tab_hide_discard",
  title: "Hidden tabs that are unloaded can be restored very quickly, and usually without a network connection. They also preserve browsing history (e.g. Back button). However, depending on the website, you may lose anything you had entered into the tab that isn't already saved. Uses less memory."
};
const _hoisted_30 = {
  for: "after_stashing_tab_close",
  title: "Uses the least amount of memory and takes the longest to restore, because tab contents may need to be fetched over the network. This option will cause the browser to forget anything you had entered into the tab, as well as the tab's browsing history (e.g. Back button)."
};
const _hoisted_31 = { for: "load_tabs_on_restore_immediately" };
const _hoisted_32 = { for: "load_tabs_on_restore_lazily" };
const _hoisted_33 = { for: "confirm_close_open_tabs" };
const _hoisted_34 = { key: 0 };
const _hoisted_35 = { class: "advanced" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_OopsNotification = resolveComponent("OopsNotification");
  const _component_FeatureFlag = resolveComponent("FeatureFlag");
  return openBlock(), createElementBlock("main", {
    class: normalizeClass({ "show-advanced": _ctx.sync.meta_show_advanced })
  }, [
    createVNode(TransitionGroup, {
      tag: "aside",
      class: "notification-overlay",
      appear: "",
      name: "notification"
    }, {
      default: withCtx(() => [
        _ctx.showCrashReport ? (openBlock(), createBlock(_component_OopsNotification, { key: "oops" })) : createCommentVNode("", true)
      ]),
      _: 1
    }),
    createBaseVNode("section", _hoisted_1, [
      createBaseVNode("label", _hoisted_2, [
        withDirectives(createBaseVNode("input", {
          type: "checkbox",
          id: "meta_show_advanced",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.sync.meta_show_advanced = $event)
        }, null, 512), [
          [vModelCheckbox, _ctx.sync.meta_show_advanced]
        ]),
        _cache[25] || (_cache[25] = createTextVNode(" Show advanced settings "))
      ])
    ]),
    createBaseVNode("section", null, [
      _ctx.local.hide_crash_reports_until ?? 0 > Date.now() ? (openBlock(), createElementBlock("button", {
        key: 0,
        onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.showCrashReports && _ctx.showCrashReports(...args), ["stop"]))
      }, " Stop Hiding Crash Reports ")) : createCommentVNode("", true)
    ]),
    _cache[68] || (_cache[68] = createBaseVNode("hr", null, null, -1)),
    _cache[69] || (_cache[69] = createBaseVNode("h4", null, "Tab Stash Behavior (All Synced Browsers)", -1)),
    createBaseVNode("section", null, [
      _cache[27] || (_cache[27] = createBaseVNode("label", null, "When the toolbar button is clicked:", -1)),
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, [
          withDirectives(createBaseVNode("select", {
            id: "browser_action_stash",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.sync.browser_action_stash = $event)
          }, [
            createBaseVNode("option", {
              disabled: !_ctx.model.canBrowserActionStash("all"),
              value: "all"
            }, " Stash all (or selected) tabs ", 8, _hoisted_3),
            createBaseVNode("option", {
              disabled: !_ctx.model.canBrowserActionStash("single"),
              value: "single"
            }, " Stash the active tab ", 8, _hoisted_4),
            createBaseVNode("option", {
              disabled: !_ctx.model.canBrowserActionStash("none"),
              value: "none"
            }, " Don't stash any tabs ", 8, _hoisted_5)
          ], 512), [
            [vModelSelect, _ctx.sync.browser_action_stash]
          ]),
          _cache[26] || (_cache[26] = createTextVNode(" and ")),
          withDirectives(createBaseVNode("select", {
            id: "browser_action_show",
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.sync.browser_action_show = $event)
          }, [
            _ctx.model.hasSidebar() ? (openBlock(), createElementBlock("option", {
              key: 0,
              disabled: !_ctx.model.canBrowserActionShow("sidebar"),
              value: "sidebar"
            }, " show the stash in the sidebar ", 8, _hoisted_6)) : createCommentVNode("", true),
            createBaseVNode("option", {
              disabled: !_ctx.model.canBrowserActionShow("tab"),
              value: "tab"
            }, " show the stash in a tab ", 8, _hoisted_7),
            createBaseVNode("option", {
              disabled: !_ctx.model.canBrowserActionShow("popup"),
              value: "popup"
            }, " show the stash in a popup ", 8, _hoisted_8),
            createBaseVNode("option", {
              disabled: !_ctx.model.canBrowserActionShow("none"),
              value: "none"
            }, " don't show the stash ", 8, _hoisted_9)
          ], 512), [
            [vModelSelect, _ctx.sync.browser_action_show]
          ])
        ])
      ])
    ]),
    createBaseVNode("section", null, [
      _cache[31] || (_cache[31] = createBaseVNode("label", null, "When stashing tabs from the context menu or address bar:", -1)),
      createBaseVNode("ul", null, [
        _ctx.model.hasSidebar() ? (openBlock(), createElementBlock("li", _hoisted_10, [
          createBaseVNode("label", _hoisted_11, [
            withDirectives(createBaseVNode("input", {
              type: "radio",
              name: "open_stash_in",
              id: "open_stash_in_sidebar",
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.sync.open_stash_in = $event),
              value: "sidebar"
            }, null, 512), [
              [vModelRadio, _ctx.sync.open_stash_in]
            ]),
            _cache[28] || (_cache[28] = createTextVNode(" Show the stash in the sidebar "))
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("li", null, [
          createBaseVNode("label", _hoisted_12, [
            withDirectives(createBaseVNode("input", {
              type: "radio",
              name: "open_stash_in",
              id: "open_stash_in_tab",
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.sync.open_stash_in = $event),
              value: "tab"
            }, null, 512), [
              [vModelRadio, _ctx.sync.open_stash_in]
            ]),
            _cache[29] || (_cache[29] = createTextVNode(" Show the stash in a tab "))
          ])
        ]),
        createBaseVNode("li", null, [
          createBaseVNode("label", _hoisted_13, [
            withDirectives(createBaseVNode("input", {
              type: "radio",
              name: "open_stash_in",
              id: "open_stash_in_none",
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.sync.open_stash_in = $event),
              value: "none"
            }, null, 512), [
              [vModelRadio, _ctx.sync.open_stash_in]
            ]),
            _cache[30] || (_cache[30] = createTextVNode(" Don't show the stash "))
          ])
        ])
      ])
    ]),
    createBaseVNode("section", _hoisted_14, [
      _cache[34] || (_cache[34] = createBaseVNode("label", null, "When stashing a single tab:", -1)),
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, [
          createBaseVNode("label", _hoisted_15, [
            _cache[32] || (_cache[32] = createTextVNode(" Append to the top-most group only if it was created in the last ")),
            withDirectives(createBaseVNode("input", {
              type: "number",
              id: "new_folder_timeout_min",
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.sync.new_folder_timeout_min = $event),
              min: "0"
            }, null, 512), [
              [vModelText, _ctx.sync.new_folder_timeout_min]
            ]),
            _cache[33] || (_cache[33] = createTextVNode(" minutes "))
          ])
        ])
      ])
    ]),
    _cache[70] || (_cache[70] = createBaseVNode("hr", null, null, -1)),
    _cache[71] || (_cache[71] = createBaseVNode("h4", null, "Appearance (All Synced Browsers)", -1)),
    createBaseVNode("section", _hoisted_16, [
      _cache[39] || (_cache[39] = createBaseVNode("label", { for: "ui_metrics" }, "Spacing and fonts:", -1)),
      withDirectives(createBaseVNode("select", {
        id: "ui_metrics",
        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.sync.ui_metrics = $event)
      }, _cache[35] || (_cache[35] = [
        createBaseVNode("option", { value: "normal" }, "Normal", -1),
        createBaseVNode("option", { value: "compact" }, "Compact", -1)
      ]), 512), [
        [vModelSelect, _ctx.sync.ui_metrics]
      ]),
      _cache[40] || (_cache[40] = createBaseVNode("label", { for: "ui_theme" }, "Theme:", -1)),
      withDirectives(createBaseVNode("select", {
        id: "ui_theme",
        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.sync.ui_theme = $event)
      }, _cache[36] || (_cache[36] = [
        createBaseVNode("option", { value: "system" }, "Same as operating system", -1),
        createBaseVNode("option", { value: "light" }, "Light", -1),
        createBaseVNode("option", { value: "dark" }, "Dark", -1)
      ]), 512), [
        [vModelSelect, _ctx.sync.ui_theme]
      ]),
      _cache[41] || (_cache[41] = createBaseVNode("label", { for: "show_open_tabs" }, "Show which open tabs:", -1)),
      withDirectives(createBaseVNode("select", {
        id: "show_open_tabs",
        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.sync.show_open_tabs = $event),
        title: `Click on the "Open Tabs" or "Unstashed Tabs" title to toggle between these options. Note that pinned tabs are never shown.`
      }, _cache[37] || (_cache[37] = [
        createBaseVNode("option", { value: "unstashed" }, "Unstashed tabs only", -1),
        createBaseVNode("option", { value: "all" }, "Stashed and unstashed tabs", -1)
      ]), 512), [
        [vModelSelect, _ctx.sync.show_open_tabs]
      ]),
      _cache[42] || (_cache[42] = createBaseVNode("label", { for: "show_new_folders" }, "Show new groups:", -1)),
      withDirectives(createBaseVNode("select", {
        id: "show_new_folders",
        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.sync.show_new_folders = $event)
      }, _cache[38] || (_cache[38] = [
        createBaseVNode("option", { value: "expanded" }, "Expanded", -1),
        createBaseVNode("option", { value: "collapsed" }, "Collapsed", -1)
      ]), 512), [
        [vModelSelect, _ctx.sync.show_new_folders]
      ])
    ]),
    _cache[72] || (_cache[72] = createBaseVNode("hr", null, null, -1)),
    _cache[73] || (_cache[73] = createBaseVNode("h4", null, "Privacy (All Synced Browsers)", -1)),
    createBaseVNode("section", null, [
      _cache[45] || (_cache[45] = createBaseVNode("label", null, "When deleting items from your stash:", -1)),
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, [
          createBaseVNode("label", _hoisted_17, [
            _cache[43] || (_cache[43] = createTextVNode(" Remember items that were deleted on this computer for ")),
            withDirectives(createBaseVNode("input", {
              type: "number",
              id: "deleted_items_expiration_days",
              "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => _ctx.sync.deleted_items_expiration_days = $event),
              min: "1"
            }, null, 512), [
              [vModelText, _ctx.sync.deleted_items_expiration_days]
            ]),
            _cache[44] || (_cache[44] = createTextVNode(" days "))
          ])
        ])
      ])
    ]),
    _cache[74] || (_cache[74] = createBaseVNode("hr", null, null, -1)),
    _cache[75] || (_cache[75] = createBaseVNode("h4", null, "Tab and Memory Management (This Browser)", -1)),
    createBaseVNode("section", null, [
      _cache[58] || (_cache[58] = createBaseVNode("label", null, "Once a tab has been stashed:", -1)),
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, [
          createBaseVNode("label", _hoisted_18, [
            withDirectives(createBaseVNode("input", {
              type: "radio",
              name: "after_stashing_tab",
              id: "after_stashing_tab_hide",
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => _ctx.local.after_stashing_tab = $event),
              value: "hide"
            }, null, 512), [
              [vModelRadio, _ctx.local.after_stashing_tab]
            ]),
            _cache[46] || (_cache[46] = createTextVNode(" Hide the tab and keep it loaded in the background "))
          ]),
          createBaseVNode("ul", {
            class: normalizeClass({ disabled: _ctx.local.after_stashing_tab !== "hide" })
          }, [
            createBaseVNode("li", null, [
              createBaseVNode("label", _hoisted_19, [
                withDirectives(createBaseVNode("input", {
                  type: "checkbox",
                  name: "autodiscard_hidden_tabs",
                  id: "autodiscard_hidden_tabs",
                  disabled: _ctx.local.after_stashing_tab !== "hide",
                  "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => _ctx.local.autodiscard_hidden_tabs = $event)
                }, null, 8, _hoisted_20), [
                  [vModelCheckbox, _ctx.local.autodiscard_hidden_tabs]
                ]),
                _cache[47] || (_cache[47] = createTextVNode(" Automatically unload hidden tabs that haven't been used in a while "))
              ])
            ]),
            createBaseVNode("li", null, [
              createBaseVNode("ul", {
                class: normalizeClass({
                  advanced: true,
                  disabled: _ctx.local.after_stashing_tab !== "hide" || !_ctx.local.autodiscard_hidden_tabs
                })
              }, [
                createBaseVNode("li", null, [
                  createBaseVNode("label", _hoisted_21, [
                    _cache[48] || (_cache[48] = createTextVNode(" Check for old hidden tabs every ")),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      id: "autodiscard_interval_min",
                      disabled: _ctx.local.after_stashing_tab !== "hide" || !_ctx.local.autodiscard_hidden_tabs,
                      "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => _ctx.local.autodiscard_interval_min = $event),
                      min: "1"
                    }, null, 8, _hoisted_22), [
                      [vModelText, _ctx.local.autodiscard_interval_min]
                    ]),
                    _cache[49] || (_cache[49] = createTextVNode(" minutes "))
                  ])
                ]),
                createBaseVNode("li", null, [
                  createBaseVNode("label", _hoisted_23, [
                    _cache[50] || (_cache[50] = createTextVNode(" Keep at least ")),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      id: "autodiscard_min_keep_tabs",
                      disabled: _ctx.local.after_stashing_tab !== "hide" || !_ctx.local.autodiscard_hidden_tabs,
                      "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => _ctx.local.autodiscard_min_keep_tabs = $event),
                      min: "0"
                    }, null, 8, _hoisted_24), [
                      [vModelText, _ctx.local.autodiscard_min_keep_tabs]
                    ]),
                    _cache[51] || (_cache[51] = createTextVNode(" hidden and visible tabs loaded at all times "))
                  ])
                ]),
                createBaseVNode("li", null, [
                  createBaseVNode("label", _hoisted_25, [
                    _cache[52] || (_cache[52] = createTextVNode(" Keep the oldest tabs loaded for at least ")),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      id: "autodiscard_target_age_min",
                      disabled: _ctx.local.after_stashing_tab !== "hide" || !_ctx.local.autodiscard_hidden_tabs,
                      "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => _ctx.local.autodiscard_target_age_min = $event),
                      min: "1"
                    }, null, 8, _hoisted_26), [
                      [vModelText, _ctx.local.autodiscard_target_age_min]
                    ]),
                    _cache[53] || (_cache[53] = createTextVNode(" minutes, but... "))
                  ])
                ]),
                createBaseVNode("li", null, [
                  createBaseVNode("label", _hoisted_27, [
                    _cache[54] || (_cache[54] = createTextVNode(" ...unload tabs more aggressively if there are more than ")),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      id: "autodiscard_target_tab_count",
                      disabled: _ctx.local.after_stashing_tab !== "hide" || !_ctx.local.autodiscard_hidden_tabs,
                      "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => _ctx.local.autodiscard_target_tab_count = $event),
                      min: _ctx.local.autodiscard_min_keep_tabs
                    }, null, 8, _hoisted_28), [
                      [vModelText, _ctx.local.autodiscard_target_tab_count]
                    ]),
                    _cache[55] || (_cache[55] = createTextVNode(" tabs loaded "))
                  ])
                ])
              ], 2)
            ])
          ], 2)
        ]),
        createBaseVNode("li", null, [
          createBaseVNode("label", _hoisted_29, [
            withDirectives(createBaseVNode("input", {
              type: "radio",
              name: "after_stashing_tab",
              id: "after_stashing_tab_hide_discard",
              "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => _ctx.local.after_stashing_tab = $event),
              value: "hide_discard"
            }, null, 512), [
              [vModelRadio, _ctx.local.after_stashing_tab]
            ]),
            _cache[56] || (_cache[56] = createTextVNode(" Hide the tab and immediately unload it "))
          ])
        ]),
        createBaseVNode("li", null, [
          createBaseVNode("label", _hoisted_30, [
            withDirectives(createBaseVNode("input", {
              type: "radio",
              name: "after_stashing_tab",
              id: "after_stashing_tab_close",
              "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => _ctx.local.after_stashing_tab = $event),
              value: "close"
            }, null, 512), [
              [vModelRadio, _ctx.local.after_stashing_tab]
            ]),
            _cache[57] || (_cache[57] = createTextVNode(" Close the tab immediately "))
          ])
        ])
      ])
    ]),
    createBaseVNode("section", null, [
      _cache[61] || (_cache[61] = createBaseVNode("label", null, "When opening tabs from the stash:", -1)),
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, [
          createBaseVNode("label", _hoisted_31, [
            withDirectives(createBaseVNode("input", {
              type: "radio",
              id: "load_tabs_on_restore_immediately",
              "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => _ctx.local.load_tabs_on_restore = $event),
              value: "immediately"
            }, null, 512), [
              [vModelRadio, _ctx.local.load_tabs_on_restore]
            ]),
            _cache[59] || (_cache[59] = createTextVNode(" Load all opened tabs immediately "))
          ])
        ]),
        createBaseVNode("li", null, [
          createBaseVNode("label", _hoisted_32, [
            withDirectives(createBaseVNode("input", {
              type: "radio",
              id: "load_tabs_on_restore_lazily",
              "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => _ctx.local.load_tabs_on_restore = $event),
              value: "lazily"
            }, null, 512), [
              [vModelRadio, _ctx.local.load_tabs_on_restore]
            ]),
            _cache[60] || (_cache[60] = createTextVNode(" Wait for a tab to be selected before loading it "))
          ])
        ])
      ])
    ]),
    _cache[76] || (_cache[76] = createBaseVNode("hr", null, null, -1)),
    _cache[77] || (_cache[77] = createBaseVNode("h4", null, "Confirmations (This Browser)", -1)),
    createBaseVNode("section", null, [
      createBaseVNode("li", null, [
        createBaseVNode("label", _hoisted_33, [
          withDirectives(createBaseVNode("input", {
            type: "checkbox",
            id: "confirm_close_open_tabs",
            "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => _ctx.local.confirm_close_open_tabs = $event)
          }, null, 512), [
            [vModelCheckbox, _ctx.local.confirm_close_open_tabs]
          ]),
          _cache[62] || (_cache[62] = createTextVNode(" Confirm when closing a lot of open tabs "))
        ])
      ])
    ]),
    _ctx.sync.meta_show_advanced ? (openBlock(), createElementBlock("hr", _hoisted_34)) : createCommentVNode("", true),
    createBaseVNode("section", _hoisted_35, [
      _cache[65] || (_cache[65] = createBaseVNode("h4", null, "Experimental Features", -1)),
      _cache[66] || (_cache[66] = createBaseVNode("p", null, [
        createBaseVNode("em", null, [
          createBaseVNode("b", null, "WARNING:"),
          createTextVNode(' Turning on experimental features may break Tab Stash or cause data loss! They are "experimental" because they are still in development and/or there may be known issues. Experimental features may change significantly or be removed entirely in future versions.')
        ])
      ], -1)),
      _cache[67] || (_cache[67] = createBaseVNode("p", null, [
        createBaseVNode("em", null, "To provide feedback or report a problem with a feature, leave a comment on the issue linked in [brackets] below.")
      ], -1)),
      createVNode(_component_FeatureFlag, {
        name: "ff_restore_closed_tabs",
        modelValue: _ctx.local.ff_restore_closed_tabs,
        "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => _ctx.local.ff_restore_closed_tabs = $event),
        default_value: _ctx.local_def().ff_restore_closed_tabs.default,
        issue: 200
      }, {
        summary: withCtx(() => _cache[63] || (_cache[63] = [
          createTextVNode("Restore Recently-Closed Tabs")
        ])),
        default: withCtx(() => [
          _cache[64] || (_cache[64] = createTextVNode(" When restoring tabs, if a hidden tab isn't available, search for and re-open recently-closed tabs with matching URLs. (NOTE: This is known to occasionally restore incorrect tabs on certain versions of Firefox, check the linked issue for more details.) "))
        ]),
        _: 1
      }, 8, ["modelValue", "default_value"])
    ])
  ], 2);
}
const Main = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
launch(Main, async () => {
  const opts = await Model.live();
  globalThis.model = opts;
  return {
    propsData: {
      model: opts
    }
  };
});
