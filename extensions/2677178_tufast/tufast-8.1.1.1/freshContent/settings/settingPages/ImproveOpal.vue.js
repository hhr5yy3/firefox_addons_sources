import './ImproveOpal.vue.css.proxy.js';
import {defineComponent, onBeforeMount, ref, watch} from "../../../snowpack/pkg/vue.js";
import Setting from "../components/Setting.vue.js";
import {useSettingHandler} from "../composables/setting-handler.js";
const defaultExport = defineComponent({
  components: {
    Setting
  },
  setup() {
    const {opalPdf} = useSettingHandler();
    const pdfInlineActive = ref(false);
    const pdfNewTabActive = ref(false);
    onBeforeMount(async () => {
      const {inline, newtab} = await opalPdf("check");
      pdfInlineActive.value = inline;
      pdfNewTabActive.value = newtab;
      watch(pdfInlineActive, inlineUpdate);
      watch(pdfNewTabActive, newtabUpdate);
    });
    const inlineUpdate = async () => {
      if (pdfInlineActive.value) {
        pdfInlineActive.value = await opalPdf("enable", "inline");
      } else {
        await opalPdf("disable", "inline");
        pdfNewTabActive.value = false;
      }
    };
    const newtabUpdate = async () => {
      if (pdfNewTabActive.value) {
        pdfNewTabActive.value = await opalPdf("enable", "newtab");
      } else {
        await opalPdf("disable", "newtab");
      }
    };
    return {
      pdfInlineActive,
      pdfNewTabActive
    };
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-61947d2a"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "max-line" }, " Damit die Einstellungen wirksam werden, musst du OPAL einmal aktualisieren. Für Firefox funktioniert dieses Feature leider nicht stabil. ", -1))
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "max-line p-margin" }, " Möglicherweise braucht TUfast eine spezielle Berechtigung. Drücke bitte auf \"Erlauben\" im folgenden Pop-Up. ", -1))
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "max-line p-margin" }, " Hinweis: Diese Funktion funktioniert unter Firefox leider nicht stabil. ", -1))

export function render(_ctx, _cache) {
  const _component_Setting = _resolveComponent("Setting")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    _hoisted_2,
    _createVNode(_component_Setting, {
      modelValue: _ctx.pdfInlineActive,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.pdfInlineActive) = $event)),
      txt: "PDF- und Textdokumente aus OPAL direkt im Browser öffnen, anstatt sie herunterzuladen.",
      class: "setting"
    }, null, 8, ["modelValue"]),
    _createVNode(_component_Setting, {
      modelValue: _ctx.pdfNewTabActive,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.pdfNewTabActive) = $event)),
      disabled: !_ctx.pdfInlineActive,
      txt: "PDF- und Textdokumente in neuem Tab öffnen (empfohlen!)",
      class: "setting"
    }, null, 8, ["modelValue", "disabled"]),
    _hoisted_3
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-61947d2a";

export default defaultExport;