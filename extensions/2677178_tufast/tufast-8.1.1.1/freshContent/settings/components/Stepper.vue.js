import './Stepper.vue.css.proxy.js';
import {defineComponent} from "../../../snowpack/pkg/vue.js";
import {useStepper} from "../composables/stepper.js";
const defaultExport = defineComponent({
  setup() {
    const {stepsCount, currentOnboardingStep} = useStepper();
    return {
      stepsCount,
      currentOnboardingStep
    };
  }
});
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass } from "../../../snowpack/pkg/vue.js"

const _hoisted_1 = { class: "stepper" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.stepsCount, (step) => {
      return (_openBlock(), _createElementBlock("div", {
        key: step,
        class: _normalizeClass(`stepper__step ${
        step === _ctx.currentOnboardingStep ? 'stepper__step--current' : ''
      }`)
      }, null, 2))
    }), 128))
  ]))
};

defaultExport.render = render;

export default defaultExport;