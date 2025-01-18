import './03_LoginSetup.vue.css.proxy.js';
import {defineComponent, ref} from "../../../snowpack/pkg/vue.js";
import Setting from "../components/Setting.vue.js";
import {useStepper} from "../composables/stepper.js";
const defaultExport = defineComponent({
  components: {
    Setting
  },
  emits: ["accept"],
  setup(_) {
    const {stepWidth} = useStepper();
    const accept = ref(true);
    const setStepWidth = () => {
      if (accept.value) {
        stepWidth.value = 1;
      } else {
        stepWidth.value = 3;
      }
    };
    return {accept, setStepWidth};
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-512e8a79"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("div", { class: "title" }, [
  /*#__PURE__*/_createElementVNode("h1", { class: "upper" }, " AutoLogin "),
  /*#__PURE__*/_createElementVNode("h2", null, "in die Onlineportale der TU Dresden")
], -1))

export function render(_ctx, _cache) {
  const _component_Setting = _resolveComponent("Setting")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    _createVNode(_component_Setting, {
      modelValue: _ctx.accept,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.accept) = $event)),
      txt: "Autologin aktivieren",
      column: true,
      onClick: _cache[1] || (_cache[1] = $event => (_ctx.setStepWidth()))
    }, null, 8, ["modelValue"])
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-512e8a79";

export default defaultExport;