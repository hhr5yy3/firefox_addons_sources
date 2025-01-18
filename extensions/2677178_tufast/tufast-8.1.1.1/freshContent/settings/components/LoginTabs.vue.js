import './LoginTabs.vue.css.proxy.js';
import {defineComponent, ref} from "../../../snowpack/pkg/vue.js";
const defaultExport = defineComponent({
  components: {},
  props: {
    options: {
      type: [],
      required: true
    },
    modelValue: {
      type: {},
      required: true
    }
  },
  emits: ["update:modelValue"],
  setup(_, {emit}) {
    const container = ref(null);
    const switchTab = (option) => {
      if (!container.value)
        return;
      const children = container.value.children;
      for (const child of [...children]) {
        child.classList.remove("tab--selected");
        if (child.id === option.id) {
          child.classList.add("tab--selected");
        }
      }
      emit("update:modelValue", option);
    };
    return {
      switchTab,
      container
    };
  }
});
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-7bf8d2cf"),n=n(),_popScopeId(),n)
const _hoisted_1 = {
  ref: "container",
  class: "container"
}
const _hoisted_2 = ["id", "onClick"]

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.options, (option, i) => {
      return (_openBlock(), _createElementBlock("button", {
        id: option.id,
        key: i,
        class: _normalizeClass(`${i === 0 ? 'tab--selected' : ''} tab`),
        onClick: $event => (_ctx.switchTab(option))
      }, _toDisplayString(option.name), 11, _hoisted_2))
    }), 128))
  ], 512))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-7bf8d2cf";

export default defaultExport;