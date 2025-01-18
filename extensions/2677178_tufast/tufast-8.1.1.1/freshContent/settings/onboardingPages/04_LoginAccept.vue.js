import './04_LoginAccept.vue.css.proxy.js';
import {defineComponent, ref, computed, watch} from "../../../snowpack/pkg/vue.js";
import Input from "../components/Input.vue.js";
import {useUserData} from "../composables/user-data.js";
import {useStepper} from "../composables/stepper.js";
import {useLogins} from "../composables/logins.js";
const defaultExport = defineComponent({
  components: {
    CustomInput: Input
  },
  setup() {
    const {stepWidth} = useStepper();
    const {saveUserData} = useUserData();
    const {logins} = useLogins();
    const zihLogin = logins[0];
    const username = ref("");
    const password = ref("");
    const usernameValid = ref(false);
    const passwordValid = ref(false);
    stepWidth.value = 2;
    const ready = computed(() => usernameValid.value && passwordValid.value);
    watch(ready, async () => {
      if (ready.value === true) {
        await saveUserData(username.value, password.value, "zih");
        stepWidth.value = 1;
      } else {
        stepWidth.value = 2;
      }
    });
    return {username, password, usernameValid, passwordValid, zihLogin};
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-c2084b86"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("div", { class: "title" }, [
  /*#__PURE__*/_createElementVNode("h1", { class: "upper" }, " AutoLogin "),
  /*#__PURE__*/_createElementVNode("h2", null, "in die Onlineportale der TU Dresden")
], -1))
const _hoisted_2 = { class: "inputs" }

export function render(_ctx, _cache) {
  const _component_CustomInput = _resolveComponent("CustomInput")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    _createElementVNode("div", _hoisted_2, [
      _createVNode(_component_CustomInput, {
        modelValue: _ctx.username,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.username) = $event)),
        valid: _ctx.usernameValid,
        "onUpdate:valid": _cache[1] || (_cache[1] = $event => ((_ctx.usernameValid) = $event)),
        placeholder: _ctx.zihLogin.usernamePlaceholder,
        pattern: _ctx.zihLogin.usernamePattern,
        "error-message": _ctx.zihLogin.usernameError,
        column: true,
        warn: ""
      }, null, 8, ["modelValue", "valid", "placeholder", "pattern", "error-message"]),
      _createVNode(_component_CustomInput, {
        modelValue: _ctx.password,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.password) = $event)),
        valid: _ctx.passwordValid,
        "onUpdate:valid": _cache[3] || (_cache[3] = $event => ((_ctx.passwordValid) = $event)),
        pattern: _ctx.zihLogin.passwordPattern,
        placeholder: _ctx.zihLogin.passwordPlaceholder,
        type: "password",
        "error-message": _ctx.zihLogin.passwordError,
        column: true
      }, null, 8, ["modelValue", "valid", "pattern", "placeholder", "error-message"])
    ])
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-c2084b86";

export default defaultExport;