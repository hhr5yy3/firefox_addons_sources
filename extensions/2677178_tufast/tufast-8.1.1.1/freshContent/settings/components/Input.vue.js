import './Input.vue.css.proxy.js';
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watchEffect
} from "../../../snowpack/pkg/vue.js";
import {
  PhXCircle,
  PhCheckCircle,
  PhWarningCircle
} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
const defaultExport = defineComponent({
  components: {
    PhXCircle,
    PhCheckCircle,
    PhWarningCircle
  },
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      required: true
    },
    pattern: {
      type: Object,
      default: null
    },
    modelValue: {
      type: String,
      default: ""
    },
    valid: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      required: true
    },
    column: {
      type: Boolean,
      default: false
    },
    warn: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "update:valid"],
  setup(props, {emit}) {
    const statusIcon = ref("PhCheckCircle");
    const state = ref("");
    const correctPattern = computed(() => props.pattern.test(props.modelValue));
    const emitState = ($event) => {
      const target = $event.target;
      emit("update:modelValue", target.value);
      emit("update:valid", correctPattern.value || props.warn);
    };
    watchEffect(() => {
      if (props.modelValue.length > 0) {
        state.value = correctPattern.value ? "input--correct" : props.warn ? "input--warn" : "input--false";
        statusIcon.value = correctPattern.value ? "PhCheckCircle" : props.warn ? "PhWarningCircle" : "PhXCircle";
        emit("update:valid", correctPattern.value || props.warn);
      } else {
        state.value = "";
      }
    });
    onMounted(() => {
      if (props.column) {
        document.querySelectorAll(".input-container")?.forEach((el) => el.classList.add("input-container--column"));
      }
    });
    return {
      statusIcon,
      correctPattern,
      emitState,
      state
    };
  }
});
import { createElementVNode as _createElementVNode, resolveDynamicComponent as _resolveDynamicComponent, normalizeClass as _normalizeClass, openBlock as _openBlock, createBlock as _createBlock, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-58982e92"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "input-container" }
const _hoisted_2 = ["value", "type", "placeholder"]

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", {
      class: _normalizeClass(`input ${_ctx.state}`)
    }, [
      _createElementVNode("input", {
        value: _ctx.modelValue,
        class: "input__input",
        type: _ctx.type,
        placeholder: _ctx.placeholder,
        onInput: _cache[0] || (_cache[0] = (...args) => (_ctx.emitState && _ctx.emitState(...args)))
      }, null, 40, _hoisted_2),
      (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.statusIcon), {
        class: _normalizeClass(`input__icon ${
          _ctx.modelValue.length > 0 ? 'input__icon--visible' : ''
        }`)
      }, null, 8, ["class"]))
    ], 2),
    _createElementVNode("span", {
      style: _normalizeStyle(`opacity: ${!_ctx.correctPattern && _ctx.modelValue.length > 0 ? 1 : 0}`)
    }, _toDisplayString(_ctx.errorMessage), 5)
  ]))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-58982e92";

export default defaultExport;