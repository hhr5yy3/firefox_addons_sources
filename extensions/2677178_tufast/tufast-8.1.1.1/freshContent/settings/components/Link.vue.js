import './Link.vue.css.proxy.js';
import {defineComponent} from "../../../snowpack/pkg/vue.js";
import {PhArrowRight} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
const defaultExport = defineComponent({
  components: {
    PhArrowRight
  },
  props: {
    txt: {
      type: String,
      required: true
    }
  },
  setup() {
  }
});
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-6a5c533c"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "link" }
const _hoisted_2 = { class: "link__text" }

export function render(_ctx, _cache) {
  const _component_PhArrowRight = _resolveComponent("PhArrowRight")

  return (_openBlock(), _createElementBlock("a", _hoisted_1, [
    _createElementVNode("span", _hoisted_2, _toDisplayString(_ctx.txt), 1),
    _createVNode(_component_PhArrowRight, { class: "link__arrow" })
  ]))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-6a5c533c";

export default defaultExport;