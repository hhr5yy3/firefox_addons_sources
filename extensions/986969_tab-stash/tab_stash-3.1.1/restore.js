import { d as defineComponent, j as required, a as resolveComponent, b as createElementBlock, f as createVNode, w as withCtx, T as TransitionGroup, e as createBaseVNode, s as createTextVNode, t as toDisplayString, i as withModifiers, o as openBlock, m as createBlock, h as createCommentVNode, q as launch } from "./assets/launch-vue.js";
import { N as Notification } from "./assets/notification.js";
import { _ as _export_sfc } from "./assets/_plugin-vue_export-helper.js";
const _sfc_main = defineComponent({
  components: { Notification },
  props: {
    url: required(String)
  },
  data: () => ({
    copied: void 0
  }),
  computed: {
    protocol() {
      try {
        return new URL(this.url).protocol;
      } catch (e) {
        return "";
      }
    }
  },
  methods: {
    copy() {
      const r = document.createRange();
      r.selectNodeContents(this.$refs.url);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      clearTimeout(this.copied);
      this.copied = setTimeout(() => this.closeNotif(), 3e3);
    },
    closeNotif() {
      clearTimeout(this.copied);
      this.copied = void 0;
    }
  }
});
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 2 };
const _hoisted_4 = { key: 3 };
const _hoisted_5 = ["href"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Notification = resolveComponent("Notification");
  return openBlock(), createElementBlock("main", null, [
    createVNode(TransitionGroup, {
      tag: "aside",
      class: "notification-overlay",
      appear: "",
      name: "notification"
    }, {
      default: withCtx(() => [
        _ctx.copied ? (openBlock(), createBlock(_component_Notification, {
          key: 0,
          onDismiss: _ctx.closeNotif
        }, {
          default: withCtx(() => _cache[1] || (_cache[1] = [
            createTextVNode("Copied")
          ])),
          _: 1
        }, 8, ["onDismiss"])) : createCommentVNode("", true)
      ]),
      _: 1
    }),
    _cache[2] || (_cache[2] = createBaseVNode("div", { class: "flat-heading-icon icon-warning" }, null, -1)),
    _ctx.protocol === "file:" ? (openBlock(), createElementBlock("h1", _hoisted_1, "Restoring a Local File")) : (openBlock(), createElementBlock("h1", _hoisted_2, "Suspicious Stashed Tab")),
    _ctx.protocol === "file:" ? (openBlock(), createElementBlock("p", _hoisted_3, " For security reasons, your browser won't allow Tab Stash to restore tabs that show files on your computer without your intervention. ")) : (openBlock(), createElementBlock("p", _hoisted_4, " For security reasons, your browser won't allow Tab Stash to restore privileged tabs without your intervention. ")),
    _cache[3] || (_cache[3] = createBaseVNode("p", null, [
      createBaseVNode("strong", null, "Please make sure this URL looks right."),
      createTextVNode(" If it looks okay, you can restore the tab by copying and pasting the URL into the address bar: ")
    ], -1)),
    createBaseVNode("a", {
      ref: "url",
      class: "unsafe-url",
      href: _ctx.url,
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.copy && _ctx.copy(...args), ["prevent", "stop"]))
    }, toDisplayString(_ctx.url), 9, _hoisted_5)
  ]);
}
const Main = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
launch(Main, async () => {
  const my_url = new URL(document.location.href);
  const url = my_url.searchParams.get("url");
  if (url) document.title = url;
  return {
    propsData: { url }
  };
});
