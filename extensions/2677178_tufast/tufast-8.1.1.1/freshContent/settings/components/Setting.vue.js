import './Setting.vue.css.proxy.js';
import {defineComponent, onMounted, ref, watch} from "../../../snowpack/pkg/vue.js";
import Toggle from "./Toggle.vue.js";
const defaultExport = defineComponent({
  components: {
    Toggle
  },
  props: {
    txt: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    column: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "changed-setting"],
  setup(props, {emit}) {
    const toggleState = ref(props.modelValue);
    watch(props, () => {
      toggleState.value = props.modelValue;
    });
    watch(toggleState, () => emit("update:modelValue", toggleState.value));
    onMounted(() => {
      if (props.column) {
        document.querySelectorAll(".setting")?.forEach((el) => el.classList.add("setting--column"));
      }
    });
    return {toggleState};
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-45a0b3d0"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "setting" }
const _hoisted_2 = { class: "max-line" }

export function render(_ctx, _cache) {
  const _component_Toggle = _resolveComponent("Toggle")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(_component_Toggle, {
      modelValue: _ctx.toggleState,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.toggleState) = $event)),
      disabled: _ctx.disabled,
      class: "setting__toggle",
      onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('changed-setting')))
    }, null, 8, ["modelValue", "disabled"]),
    _createElementVNode("span", _hoisted_2, _toDisplayString(_ctx.txt), 1)
  ]))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-45a0b3d0";

export default defaultExport;