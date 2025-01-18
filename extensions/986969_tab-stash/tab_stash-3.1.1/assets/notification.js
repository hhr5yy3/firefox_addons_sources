import { _ as _export_sfc } from "./_plugin-vue_export-helper.js";
import { o as openBlock, b as createElementBlock, E as renderSlot, d as defineComponent, a as resolveComponent, e as createBaseVNode, i as withModifiers, f as createVNode, w as withCtx, n as normalizeClass, h as createCommentVNode } from "./launch-vue.js";
const _sfc_main$1 = {};
const _hoisted_1 = { class: "action-group" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("nav", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
const ButtonBox = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  components: { ButtonBox },
  emits: ["activate", "dismiss"],
  props: {
    inactive: Boolean
  },
  data: () => ({
    dismissed: false
  }),
  methods: {
    activate(ev) {
      this.$emit("activate");
    },
    dismiss(ev) {
      this.$emit("dismiss");
      this.dismissed = true;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ButtonBox = resolveComponent("ButtonBox");
  return !_ctx.dismissed ? (openBlock(), createElementBlock("aside", {
    key: 0,
    class: normalizeClass({ notification: true, "has-action": !_ctx.inactive })
  }, [
    createBaseVNode("div", {
      class: "contents",
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.activate && _ctx.activate(...args), ["prevent", "stop"]))
    }, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createVNode(_component_ButtonBox, null, {
      default: withCtx(() => [
        createBaseVNode("a", {
          class: "action cancel",
          name: "Dismiss",
          title: "Dismiss notification",
          onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.dismiss && _ctx.dismiss(...args), ["prevent", "stop"]))
        })
      ]),
      _: 1
    })
  ], 2)) : createCommentVNode("", true);
}
const Notification = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ButtonBox as B,
  Notification as N
};
