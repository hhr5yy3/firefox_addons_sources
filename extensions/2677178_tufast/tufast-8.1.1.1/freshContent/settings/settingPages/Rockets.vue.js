import './Rockets.vue.css.proxy.js';
import {defineComponent} from "../../../snowpack/pkg/vue.js";
import RocketSelect from "../components/RocketSelect.vue.js";
const defaultExport = defineComponent({
  components: {
    RocketSelect
  },
  setup() {
    return {};
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-63679165"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("h2", null, "Schalte neue Raketen frei und gestalte damit OPAL und deinen Browser!", -1))
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", null, "Damit unterstützt du auch das TUfast-Projekt und das hilft uns sehr 🙂", -1))

export function render(_ctx, _cache) {
  const _component_RocketSelect = _resolveComponent("RocketSelect")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    _hoisted_2,
    _createVNode(_component_RocketSelect)
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-63679165";

export default defaultExport;