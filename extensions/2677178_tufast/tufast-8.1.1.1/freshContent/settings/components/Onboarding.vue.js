import './Onboarding.vue.css.proxy.js';
import {defineComponent} from "../../../snowpack/pkg/vue.js";
import {PhX} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
import Stepper from "./Stepper.vue.js";
import OnboardingButton from "./OnboardingButton.vue.js";
import {useStepper} from "../composables/stepper.js";
const defaultExport = defineComponent({
  components: {
    Stepper,
    OnboardingButton,
    PhX
  },
  props: {
    h1: {
      type: String,
      required: true
    },
    h2: {
      type: String,
      required: true
    },
    currentStep: {
      type: Number,
      required: true
    }
  },
  emits: ["close-me", "next"],
  setup() {
    const {stepsCount, close} = useStepper();
    setTimeout(() => {
      document.querySelector(".onboarding")?.classList.remove("onboarding--opening");
    }, 800);
    return {
      stepsCount,
      close
    };
  }
});
import { resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, createVNode as _createVNode, toDisplayString as _toDisplayString, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass } from "../../../snowpack/pkg/vue.js"

const _hoisted_1 = { class: "hide-bg" }
const _hoisted_2 = { class: "onboarding onboarding--opening" }
const _hoisted_3 = { class: "onboarding__main" }
const _hoisted_4 = {
  key: 1,
  class: "onboarding__text"
}
const _hoisted_5 = { class: "footer-text__title" }
const _hoisted_6 = { class: "footer-text__subtitle max-line" }

export function render(_ctx, _cache) {
  const _component_PhX = _resolveComponent("PhX")
  const _component_Stepper = _resolveComponent("Stepper")
  const _component_OnboardingButton = _resolveComponent("OnboardingButton")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      (_ctx.currentStep !== _ctx.stepsCount)
        ? (_openBlock(), _createBlock(_component_PhX, {
            key: 0,
            class: "onboarding__close",
            onClick: _cache[0] || (_cache[0] = $event => (_ctx.close()))
          }))
        : _createCommentVNode("", true),
      _createElementVNode("div", _hoisted_3, [
        _renderSlot(_ctx.$slots, "default")
      ]),
      _createVNode(_component_Stepper, {
        class: "onboarding__stepper",
        steps: _ctx.stepsCount,
        "current-step": _ctx.currentStep
      }, null, 8, ["steps", "current-step"]),
      (_ctx.currentStep !== _ctx.stepsCount)
        ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
            _createElementVNode("h2", _hoisted_5, _toDisplayString(_ctx.h1), 1),
            _createElementVNode("h3", _hoisted_6, _toDisplayString(_ctx.h2), 1)
          ]))
        : _createCommentVNode("", true),
      _createVNode(_component_OnboardingButton, {
        class: _normalizeClass(`onboarding__main-btn ${
          _ctx.currentStep === _ctx.stepsCount ? 'onboarding__main-btn--turned' : ''
        }`)
      }, null, 8, ["class"])
    ])
  ]))
};

defaultExport.render = render;

export default defaultExport;