import { u as browser, M as Model, d as defineComponent, c as computed, r as ref, v as watch, b as createElementBlock, e as createBaseVNode, s as createTextVNode, n as normalizeClass, x as unref, y as withDirectives, z as vModelRadio, A as isRef, h as createCommentVNode, o as openBlock, q as launch } from "./assets/launch-vue.js";
const the = {
  /** The version number of Tab Stash. */
  version: void 0,
  /** The options model. */
  options: void 0
};
globalThis.the = the;
async function init() {
  the.version = (await browser.management.getSelf()).version;
  the.options = await Model.live();
}
const _hoisted_1 = ["disabled"];
const _hoisted_2 = ["disabled"];
const _hoisted_3 = {
  key: 0,
  class: "status-text note"
};
const _hoisted_4 = ["disabled"];
const _hoisted_5 = {
  key: 1,
  class: "status-text note"
};
const _hoisted_6 = ["disabled"];
const _hoisted_7 = ["disabled"];
const _hoisted_8 = ["disabled"];
const _hoisted_9 = {
  key: 0,
  class: "status-text note"
};
const _hoisted_10 = ["disabled"];
const _hoisted_11 = {
  key: 1,
  class: "status-text note"
};
const _hoisted_12 = { key: 0 };
function computedOption(name) {
  return computed({
    get() {
      return the.options.sync.state[name];
    },
    set(v) {
      the.options.sync.set({ [name]: v }).catch(console.error);
    }
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const browser_action_stash = computedOption("browser_action_stash");
    const browser_action_show = computedOption("browser_action_show");
    const open_stash_in = computedOption("open_stash_in");
    const show_browser_action_show = computed(() => !!browser_action_stash.value);
    const show_open_stash_in = computed(
      () => show_browser_action_show.value && !!browser_action_show.value
    );
    const show_done = computed(
      () => show_open_stash_in.value && !!open_stash_in.value
    );
    const $browser_action_show = ref(void 0);
    const $open_stash_in = ref(void 0);
    const $done = ref(void 0);
    const scroll_into_view = (el) => {
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    watch($browser_action_show, scroll_into_view);
    watch($open_stash_in, scroll_into_view);
    watch($done, scroll_into_view);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("main", null, [
        _cache[27] || (_cache[27] = createBaseVNode("h1", null, "Welcome to Tab Stash!", -1)),
        _cache[28] || (_cache[28] = createBaseVNode("p", null, " Hi! Let's go through a couple quick questions to get you started. Don't worry—you can change your answers later in Tab Stash's options. ", -1)),
        createBaseVNode("section", null, [
          _cache[13] || (_cache[13] = createBaseVNode("hr", null, null, -1)),
          _cache[14] || (_cache[14] = createBaseVNode("p", null, [
            createBaseVNode("span", { class: "icon icon-logo" }),
            createTextVNode(" What would you like to "),
            createBaseVNode("strong", null, "save"),
            createTextVNode(" when you click the toolbar button? ")
          ], -1)),
          createBaseVNode("p", null, [
            createBaseVNode("label", {
              class: normalizeClass({ disabled: !unref(the).options.canBrowserActionStash("all") })
            }, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "browser_action_stash",
                value: "all",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(browser_action_stash) ? browser_action_stash.value = $event : null),
                disabled: !unref(the).options.canBrowserActionStash("all")
              }, null, 8, _hoisted_1), [
                [vModelRadio, unref(browser_action_stash)]
              ]),
              _cache[10] || (_cache[10] = createTextVNode(" Save all open tabs to the stash"))
            ], 2)
          ]),
          createBaseVNode("p", null, [
            createBaseVNode("label", {
              class: normalizeClass({ disabled: !unref(the).options.canBrowserActionStash("single") })
            }, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "browser_action_stash",
                value: "single",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(browser_action_stash) ? browser_action_stash.value = $event : null),
                disabled: !unref(the).options.canBrowserActionStash("single")
              }, null, 8, _hoisted_2), [
                [vModelRadio, unref(browser_action_stash)]
              ]),
              _cache[11] || (_cache[11] = createTextVNode(" Save the active tab to the stash"))
            ], 2)
          ]),
          !unref(the).options.canBrowserActionStash("single") || !unref(the).options.canBrowserActionStash("all") ? (openBlock(), createElementBlock("p", _hoisted_3, " You can't show the popup and save tabs at the same time. ")) : createCommentVNode("", true),
          createBaseVNode("p", null, [
            createBaseVNode("label", {
              class: normalizeClass({ disabled: !unref(the).options.canBrowserActionStash("none") })
            }, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "browser_action_stash",
                value: "none",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(browser_action_stash) ? browser_action_stash.value = $event : null),
                disabled: !unref(the).options.canBrowserActionStash("none")
              }, null, 8, _hoisted_4), [
                [vModelRadio, unref(browser_action_stash)]
              ]),
              _cache[12] || (_cache[12] = createTextVNode(" Don't save anything to the stash"))
            ], 2)
          ]),
          !unref(the).options.canBrowserActionStash("none") ? (openBlock(), createElementBlock("p", _hoisted_5, ' Choose a different "Show..." option to enable this ')) : createCommentVNode("", true)
        ]),
        show_browser_action_show.value ? (openBlock(), createElementBlock("section", {
          key: 0,
          ref_key: "$browser_action_show",
          ref: $browser_action_show
        }, [
          _cache[19] || (_cache[19] = createBaseVNode("hr", null, null, -1)),
          _cache[20] || (_cache[20] = createBaseVNode("p", null, [
            createBaseVNode("span", { class: "icon icon-logo" }),
            createTextVNode(" What would you like to "),
            createBaseVNode("strong", null, "see"),
            createTextVNode(" when you click the toolbar button? ")
          ], -1)),
          createBaseVNode("p", null, [
            unref(the).options.hasSidebar() ? (openBlock(), createElementBlock("label", {
              key: 0,
              class: normalizeClass({ disabled: !unref(the).options.canBrowserActionShow("sidebar") })
            }, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "browser_action_show",
                value: "sidebar",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(browser_action_show) ? browser_action_show.value = $event : null),
                disabled: !unref(the).options.canBrowserActionShow("sidebar")
              }, null, 8, _hoisted_6), [
                [vModelRadio, unref(browser_action_show)]
              ]),
              _cache[15] || (_cache[15] = createTextVNode(" Show my stashed tabs in the sidebar"))
            ], 2)) : createCommentVNode("", true)
          ]),
          createBaseVNode("p", null, [
            createBaseVNode("label", {
              class: normalizeClass({ disabled: !unref(the).options.canBrowserActionShow("tab") })
            }, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "browser_action_show",
                value: "tab",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(browser_action_show) ? browser_action_show.value = $event : null),
                disabled: !unref(the).options.canBrowserActionShow("tab")
              }, null, 8, _hoisted_7), [
                [vModelRadio, unref(browser_action_show)]
              ]),
              _cache[16] || (_cache[16] = createTextVNode(" Show my stashed tabs in a tab"))
            ], 2)
          ]),
          createBaseVNode("p", null, [
            createBaseVNode("label", {
              class: normalizeClass({ disabled: !unref(the).options.canBrowserActionShow("popup") })
            }, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "browser_action_show",
                value: "popup",
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => isRef(browser_action_show) ? browser_action_show.value = $event : null),
                disabled: !unref(the).options.canBrowserActionShow("popup")
              }, null, 8, _hoisted_8), [
                [vModelRadio, unref(browser_action_show)]
              ]),
              _cache[17] || (_cache[17] = createTextVNode(" Show my stashed tabs in a popup"))
            ], 2)
          ]),
          !unref(the).options.canBrowserActionShow("popup") ? (openBlock(), createElementBlock("p", _hoisted_9, ` To use the popup, choose "Don't save anything to the stash" `)) : createCommentVNode("", true),
          createBaseVNode("p", null, [
            createBaseVNode("label", {
              class: normalizeClass({ disabled: !unref(the).options.canBrowserActionShow("none") })
            }, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "browser_action_show",
                value: "none",
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => isRef(browser_action_show) ? browser_action_show.value = $event : null),
                disabled: !unref(the).options.canBrowserActionShow("none")
              }, null, 8, _hoisted_10), [
                [vModelRadio, unref(browser_action_show)]
              ]),
              _cache[18] || (_cache[18] = createTextVNode(" Don't show me anything"))
            ], 2)
          ]),
          !unref(the).options.canBrowserActionShow("none") ? (openBlock(), createElementBlock("p", _hoisted_11, ' Choose a different "Save..." option to enable this ')) : createCommentVNode("", true)
        ], 512)) : createCommentVNode("", true),
        show_open_stash_in.value ? (openBlock(), createElementBlock("section", {
          key: 1,
          ref_key: "$open_stash_in",
          ref: $open_stash_in
        }, [
          _cache[24] || (_cache[24] = createBaseVNode("hr", null, null, -1)),
          _cache[25] || (_cache[25] = createBaseVNode("p", null, [
            createBaseVNode("span", { class: "icon icon-stash-one" }),
            createTextVNode(" If you stash a tab using the address bar or context menu, what do you want to see? ")
          ], -1)),
          unref(the).options.hasSidebar() ? (openBlock(), createElementBlock("p", _hoisted_12, [
            createBaseVNode("label", null, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "open_stash_in",
                value: "sidebar",
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(open_stash_in) ? open_stash_in.value = $event : null)
              }, null, 512), [
                [vModelRadio, unref(open_stash_in)]
              ]),
              _cache[21] || (_cache[21] = createTextVNode("Show my stashed tabs in the sidebar"))
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("p", null, [
            createBaseVNode("label", null, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "open_stash_in",
                value: "tab",
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => isRef(open_stash_in) ? open_stash_in.value = $event : null)
              }, null, 512), [
                [vModelRadio, unref(open_stash_in)]
              ]),
              _cache[22] || (_cache[22] = createTextVNode("Show my stashed tabs in a tab"))
            ])
          ]),
          createBaseVNode("p", null, [
            createBaseVNode("label", null, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                name: "open_stash_in",
                value: "none",
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => isRef(open_stash_in) ? open_stash_in.value = $event : null)
              }, null, 512), [
                [vModelRadio, unref(open_stash_in)]
              ]),
              _cache[23] || (_cache[23] = createTextVNode("Don't show me anything"))
            ])
          ])
        ], 512)) : createCommentVNode("", true),
        show_done.value ? (openBlock(), createElementBlock("section", {
          key: 2,
          ref_key: "$done",
          ref: $done
        }, _cache[26] || (_cache[26] = [
          createBaseVNode("hr", null, null, -1),
          createBaseVNode("p", null, "You're all set! You can close this tab.", -1),
          createBaseVNode("p", null, "Thanks for trying out Tab Stash. I hope you enjoy it! —Josh", -1)
        ]), 512)) : createCommentVNode("", true)
      ]);
    };
  }
});
launch(_sfc_main, async () => {
  await init();
  return {
    propsData: {}
  };
});
