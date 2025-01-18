import './06_OpalSetup.vue.css.proxy.js';
import {defineComponent, ref, watch} from "../../../snowpack/pkg/vue.js";
import Setting from "../components/Setting.vue.js";
import {useSettingHandler} from "../composables/setting-handler.js";
const defaultExport = defineComponent({
  components: {
    Setting
  },
  setup() {
    const {opalPdf} = useSettingHandler();
    const inlineActive = ref(false);
    const newTabActive = ref(false);
    const inline = async () => {
      if (inlineActive.value) {
        inlineActive.value = await opalPdf("enable", "inline");
      } else {
        await opalPdf("disable", "inline");
        newTabActive.value = false;
      }
    };
    const newtab = async () => {
      if (newTabActive.value) {
        newTabActive.value = await opalPdf("enable", "newtab");
      } else {
        await opalPdf("disable", "newtab");
      }
    };
    watch(inlineActive, inline, {immediate: true});
    watch(newTabActive, newtab, {immediate: true});
    return {
      inlineActive,
      newTabActive,
      inline,
      newtab
    };
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-73714c02"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("h1", { class: "upper" }, " OPAL verbessern ", -1))
const _hoisted_2 = { class: "info" }

export function render(_ctx, _cache) {
  const _component_Setting = _resolveComponent("Setting")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    _createElementVNode("div", _hoisted_2, [
      _createVNode(_component_Setting, {
        modelValue: _ctx.inlineActive,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.inlineActive) = $event)),
        txt: "Dokumente im Browser öffnen",
        column: true
      }, null, 8, ["modelValue"]),
      _createVNode(_component_Setting, {
        modelValue: _ctx.newTabActive,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.newTabActive) = $event)),
        disabled: !_ctx.inlineActive,
        txt: "Dokumente in neuem Tab öffnen",
        column: true
      }, null, 8, ["modelValue", "disabled"])
    ])
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-73714c02";

export default defaultExport;