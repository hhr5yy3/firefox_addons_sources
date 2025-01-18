import './Button.vue.css.proxy.js';
import {defineComponent} from "../../../snowpack/pkg/vue.js";
const defaultExport = defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
  }
});
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-7fc5fd9a"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "button" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("button", _hoisted_1, _toDisplayString(_ctx.title), 1))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-7fc5fd9a";

export default defaultExport;