import './OnboardingButton.vue.css.proxy.js';
import {defineComponent} from "../../../snowpack/pkg/vue.js";
import {PhArrowRight} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
import {useStepper} from "../composables/stepper.js";
const defaultExport = defineComponent({
  components: {
    PhArrowRight
  },
  setup() {
    const {next, percentDone} = useStepper();
    return {
      next,
      percentDone
    };
  }
});
import { normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveComponent as _resolveComponent, createVNode as _createVNode } from "../../../snowpack/pkg/vue.js"

const _hoisted_1 = { class: "onboarding-btn__inner" }
const _hoisted_2 = {
  class: "onboarding-btn__progress",
  viewBox: "0 0 100 100"
}

export function render(_ctx, _cache) {
  const _component_PhArrowRight = _resolveComponent("PhArrowRight")

  return (_openBlock(), _createElementBlock("div", {
    class: "onboarding-btn",
    onClick: _cache[0] || (_cache[0] = $event => (_ctx.next()))
  }, [
    _createElementVNode("div", _hoisted_1, [
      (_openBlock(), _createElementBlock("svg", _hoisted_2, [
        _createElementVNode("circle", {
          cx: "50",
          cy: "50",
          r: "45",
          style: _normalizeStyle(`--done: ${(_ctx.percentDone / 100) * 280}`)
        }, null, 4)
      ])),
      _createVNode(_component_PhArrowRight, { class: "onboarding-btn__arrow" })
    ])
  ]))
};

defaultExport.render = render;

export default defaultExport;