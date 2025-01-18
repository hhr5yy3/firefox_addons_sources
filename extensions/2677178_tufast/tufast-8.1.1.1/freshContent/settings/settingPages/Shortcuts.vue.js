import './Shortcuts.vue.css.proxy.js';
import {defineComponent} from "../../../snowpack/pkg/vue.js";
import Link from "../components/Link.vue.js";
import {useChrome} from "../composables/chrome.js";
const defaultExport = defineComponent({
  components: {
    CustomLink: Link
  },
  setup() {
    const {sendChromeRuntimeMessage} = useChrome();
    const openShortcutSettings = () => sendChromeRuntimeMessage({cmd: "open_shortcut_settings"});
    return {
      openShortcutSettings
    };
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, createTextVNode as _createTextVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-342ebfb3"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", null, "Öffne OPAL & Co. einfach mit Tastenkombinationen.", -1))
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "p-margin" }, " Standardmäßig sind aktiv: ", -1))
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "shortcuts" }, [
  /*#__PURE__*/_createTextVNode(" Alt+Q → Dashboard öffnen"),
  /*#__PURE__*/_createElementVNode("br"),
  /*#__PURE__*/_createTextVNode(" Alt+O → OPAL öffnen"),
  /*#__PURE__*/_createElementVNode("br"),
  /*#__PURE__*/_createTextVNode(" Alt+M → Mail (Outlook-Web-App) öffnen"),
  /*#__PURE__*/_createElementVNode("br"),
  /*#__PURE__*/_createTextVNode(" Alt+J → jExam öffnen ")
], -1))

export function render(_ctx, _cache) {
  const _component_CustomLink = _resolveComponent("CustomLink")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    _createVNode(_component_CustomLink, {
      txt: "Hier kannst du alle Shortcuts sehen und ändern",
      onClick: _cache[0] || (_cache[0] = $event => (_ctx.openShortcutSettings()))
    }),
    _hoisted_2,
    _hoisted_3
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-342ebfb3";

export default defaultExport;