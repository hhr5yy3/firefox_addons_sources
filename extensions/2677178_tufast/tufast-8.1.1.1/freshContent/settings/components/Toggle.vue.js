import './Toggle.vue.css.proxy.js';
import {defineComponent, ref, watch} from "../../../snowpack/pkg/vue.js";
import {PhCheck} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
const defaultExport = defineComponent({
  components: {
    PhCheck
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const toggled = ref(props.modelValue);
    watch(props, () => {
      toggled.value = props.modelValue;
    });
    const emitState = () => {
      if (!props.disabled) {
        toggled.value = !toggled.value;
        emit("update:modelValue", toggled.value);
      }
    };
    return {
      toggled,
      emitState
    };
  }
});
import { resolveComponent as _resolveComponent, vShow as _vShow, createVNode as _createVNode, withDirectives as _withDirectives, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "../../../snowpack/pkg/vue.js"

export function render(_ctx, _cache) {
  const _component_PhCheck = _resolveComponent("PhCheck")

  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(`toggle ${_ctx.toggled ? 'toggle--toggled' : ''} ${_ctx.disabled ? 'toggle--disabled' : ''}`),
    onClick: _cache[0] || (_cache[0] = $event => (_ctx.emitState()))
  }, [
    _withDirectives(_createVNode(_component_PhCheck, { class: "toggle__icon" }, null, 512), [
      [_vShow, _ctx.toggled]
    ])
  ], 2))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-3797b0bc";

export default defaultExport;