import './OpalCourses.vue.css.proxy.js';
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
import _imports_0 from '../../../assets/images/DashboardTutorialBigDark.png.proxy.js'


const _withScopeId = n => (_pushScopeId("data-v-59b9dfdc"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "max-line" }, " Finde alle deine OPAL-Kurse direkt im Dashboard. Öffne das Dashboard oben rechts oder mit Alt+Q. ", -1))
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("img", {
  class: "image p-margin",
  src: _imports_0,
  alt: "Zeigt wo man klicken muss, um verschiedene Funktionen des Popups zu nutzen."
}, null, -1))
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "p-margin max-line" }, [
  /*#__PURE__*/_createTextVNode(" Für Power-User ⚡⚡⚡"),
  /*#__PURE__*/_createElementVNode("br"),
  /*#__PURE__*/_createTextVNode(" Öffne dein Dashboard mit Alt+Q und beginne direkt zu tippen. Wenn du dann Enter drückst, wird der erste Kurs aus der Liste geöffnet. ")
], -1))

export function render(_ctx, _cache) {
  const _component_CustomLink = _resolveComponent("CustomLink")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    _createVNode(_component_CustomLink, {
      txt: "Hier kannst du die Shortcuts ändern",
      onClick: _cache[0] || (_cache[0] = $event => (_ctx.openShortcutSettings()))
    }),
    _hoisted_2,
    _hoisted_3
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-59b9dfdc";

export default defaultExport;