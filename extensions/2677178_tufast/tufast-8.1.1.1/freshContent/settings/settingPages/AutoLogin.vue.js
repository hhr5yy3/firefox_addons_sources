import './AutoLogin.vue.css.proxy.js';
import {ref, defineComponent, watchEffect, computed} from "../../../snowpack/pkg/vue.js";
import Input from "../components/Input.vue.js";
import Button from "../components/Button.vue.js";
import LoginTabs from "../components/LoginTabs.vue.js";
import {useLogins} from "../composables/logins.js";
import {useChrome} from "../composables/chrome.js";
import {useUserData} from "../composables/user-data.js";
function isLogin2FA(login) {
  return "totpSecretPattern" in login;
}
const defaultExport = defineComponent({
  components: {
    CustomInput: Input,
    CustomButton: Button,
    LoginTabs
  },
  setup() {
    const {logins} = useLogins();
    const {sendChromeRuntimeMessage} = useChrome();
    const {saveUserData, deleteUserData} = useUserData();
    const currentLogin = ref(logins[0]);
    const username = ref("");
    const password = ref("");
    const usernameValid = ref(false);
    const passwordValid = ref(false);
    const totpSecret = ref("");
    const totpSecretValid = ref(false);
    const autoLoginActive = ref(false);
    watchEffect(async () => {
      currentLogin.value.state = await sendChromeRuntimeMessage({
        cmd: "check_user_data",
        platform: currentLogin.value.id
      });
    });
    const submitSave = async ($event) => {
      const target = $event.target;
      if (target.disabled)
        return;
      await saveUserData(username.value, password.value, currentLogin.value.id);
      username.value = "";
      password.value = "";
      usernameValid.value = false;
      passwordValid.value = false;
      currentLogin.value.state = await sendChromeRuntimeMessage({
        cmd: "check_user_data",
        platform: currentLogin.value.id
      });
    };
    const submitSaveTotp = async () => {
      const secret = totpSecret.value;
      await sendChromeRuntimeMessage({
        cmd: "set_otp",
        otpType: "totp",
        secret,
        platform: currentLogin.value.id
      });
      totpSecret.value = "";
      totpSecretValid.value = false;
      currentLogin.value.state = await sendChromeRuntimeMessage({
        cmd: "check_user_data",
        platform: currentLogin.value.id
      });
    };
    const currentLogin2FA = computed(() => {
      return isLogin2FA(currentLogin.value) ? currentLogin.value : null;
    });
    const submitDelete = async () => {
      await deleteUserData(currentLogin.value.id);
      await sendChromeRuntimeMessage({
        cmd: "delete_otp",
        platform: currentLogin.value.id
      });
      currentLogin.value.state = await sendChromeRuntimeMessage({
        cmd: "check_user_data",
        platform: currentLogin.value.id
      });
    };
    return {
      logins,
      currentLogin,
      username,
      password,
      usernameValid,
      passwordValid,
      autoLoginActive,
      currentLogin2FA,
      totpSecret,
      totpSecretValid,
      submitSave,
      submitDelete,
      submitSaveTotp
    };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, createTextVNode as _createTextVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Fragment as _Fragment, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-ca5ac980"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "max-line p-margin" }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "p-margin important" }, " TUfast nimmt dir auch alle Klicks beim Anmelden ab! ", -1))
const _hoisted_3 = { class: "form" }
const _hoisted_4 = { key: 0 }
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "max-line p-margin" }, [
  /*#__PURE__*/_createTextVNode(" Zwei-Faktor-Authentisierung (2FA): Das Automatische Anmelden unterstützt auch 2FA. Hier kannst du dafür deinen TOTP Secret-Key speichern. Der Key ist Base32 enkodiert und sieht bspw. so aus: "),
  /*#__PURE__*/_createElementVNode("br"),
  /*#__PURE__*/_createTextVNode(" MHSTKUIKTTHPQAZNVWQBJE5YQ2WACQQP "),
  /*#__PURE__*/_createElementVNode("br"),
  /*#__PURE__*/_createTextVNode(" Hier findest du "),
  /*#__PURE__*/_createElementVNode("a", {
    style: {"color":"white"},
    href: "https://github.com/TUfast-TUD/TUfast_TUD/blob/main/docs/2FA.md"
  }, "mehr Informationen und eine vollständige Anleitung zur Einrichtung"),
  /*#__PURE__*/_createTextVNode(". ")
], -1))
const _hoisted_6 = { class: "form" }
const _hoisted_7 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("br", null, null, -1))
const _hoisted_8 = { class: "form" }

export function render(_ctx, _cache) {
  const _component_LoginTabs = _resolveComponent("LoginTabs")
  const _component_CustomInput = _resolveComponent("CustomInput")
  const _component_CustomButton = _resolveComponent("CustomButton")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createVNode(_component_LoginTabs, {
      modelValue: _ctx.currentLogin,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.currentLogin) = $event)),
      options: _ctx.logins
    }, null, 8, ["modelValue", "options"]),
    _createElementVNode("h2", null, _toDisplayString(_ctx.currentLogin.title), 1),
    _createElementVNode("h2", {
      class: _normalizeClass(`state ${_ctx.currentLogin.state ? 'state--active' : 'state--inactive'}`)
    }, _toDisplayString(_ctx.currentLogin.state ? "Aktuell gespeichert" : "Nicht gespeichert"), 3),
    _createElementVNode("p", _hoisted_1, " Dafür müssen deine " + _toDisplayString(_ctx.currentLogin.name) + " Login-Daten sicher auf diesem PC gespeichert werden. Die Daten werden nur lokal und verschlüsselt gespeichert. Du kannst sie jederzeit löschen. ", 1),
    _hoisted_2,
    _createElementVNode("div", _hoisted_3, [
      _createVNode(_component_CustomInput, {
        modelValue: _ctx.username,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.username) = $event)),
        valid: _ctx.usernameValid,
        "onUpdate:valid": _cache[2] || (_cache[2] = $event => ((_ctx.usernameValid) = $event)),
        pattern: _ctx.currentLogin.usernamePattern,
        placeholder: _ctx.currentLogin.usernamePlaceholder,
        "error-message": _ctx.currentLogin.usernameError,
        warn: ""
      }, null, 8, ["modelValue", "valid", "pattern", "placeholder", "error-message"]),
      _createVNode(_component_CustomInput, {
        modelValue: _ctx.password,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.password) = $event)),
        valid: _ctx.passwordValid,
        "onUpdate:valid": _cache[4] || (_cache[4] = $event => ((_ctx.passwordValid) = $event)),
        pattern: _ctx.currentLogin.passwordPattern,
        placeholder: _ctx.currentLogin.passwordPlaceholder,
        type: "password",
        "error-message": _ctx.currentLogin.passwordError
      }, null, 8, ["modelValue", "valid", "pattern", "placeholder", "error-message"]),
      _createVNode(_component_CustomButton, {
        title: "Lokal speichern",
        disabled: !(_ctx.passwordValid && _ctx.usernameValid),
        onClick: _ctx.submitSave
      }, null, 8, ["disabled", "onClick"])
    ]),
    (_ctx.currentLogin2FA)
      ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
          _hoisted_5,
          _createElementVNode("div", _hoisted_6, [
            _createVNode(_component_CustomInput, {
              modelValue: _ctx.totpSecret,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((_ctx.totpSecret) = $event)),
              valid: _ctx.totpSecretValid,
              "onUpdate:valid": _cache[6] || (_cache[6] = $event => ((_ctx.totpSecretValid) = $event)),
              pattern: _ctx.currentLogin2FA.totpSecretPattern,
              placeholder: _ctx.currentLogin2FA.totpSecretPlaceholder,
              "error-message": _ctx.currentLogin2FA.totpSecretError,
              warn: ""
            }, null, 8, ["modelValue", "valid", "pattern", "placeholder", "error-message"]),
            _createVNode(_component_CustomButton, {
              title: "TOTP Key lokal speichern",
              disabled: !_ctx.totpSecretValid,
              onClick: _ctx.submitSaveTotp
            }, null, 8, ["disabled", "onClick"])
          ])
        ]))
      : _createCommentVNode("", true),
    _hoisted_7,
    _createElementVNode("div", _hoisted_8, [
      _createVNode(_component_CustomButton, {
        title: "Daten löschen",
        class: "button--warn",
        disabled: !_ctx.currentLogin.state,
        onClick: _ctx.submitDelete
      }, null, 8, ["disabled", "onClick"])
    ])
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-ca5ac980";

export default defaultExport;