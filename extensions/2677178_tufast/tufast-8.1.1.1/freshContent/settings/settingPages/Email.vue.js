import './Email.vue.css.proxy.js';
import {defineComponent, onBeforeMount, ref, watch} from "../../../snowpack/pkg/vue.js";
import Setting from "../components/Setting.vue.js";
import {useChrome} from "../composables/chrome.js";
import {useSettingHandler} from "../composables/setting-handler.js";
const defaultExport = defineComponent({
  components: {
    Setting
  },
  setup() {
    const {sendChromeRuntimeMessage} = useChrome();
    const {owa} = useSettingHandler();
    const owaFetchActive = ref(false);
    const owaCbDisabled = ref(false);
    const notificationOnNewEmailActive = ref(false);
    const notificationsCbDisabled = ref(false);
    const autoLoginActive = ref(false);
    onBeforeMount(async () => {
      const {fetch, notification} = await owa("check");
      owaFetchActive.value = fetch;
      notificationOnNewEmailActive.value = notification;
      watch(owaFetchActive, fetchUpdate);
      watch(notificationOnNewEmailActive, notificationsUpdate);
      autoLoginActive.value = await sendChromeRuntimeMessage({cmd: "check_user_data", platform: "zih"});
    });
    const fetchUpdate = async () => {
      if (owaFetchActive.value) {
        owaCbDisabled.value = true;
        notificationsCbDisabled.value = true;
        owaFetchActive.value = await owa("enable", "fetch");
        owaCbDisabled.value = false;
        notificationsCbDisabled.value = false;
      } else {
        await owa("disable", "fetch");
        notificationOnNewEmailActive.value = false;
      }
    };
    const notificationsUpdate = async () => {
      if (notificationOnNewEmailActive.value) {
        owaCbDisabled.value = true;
        notificationsCbDisabled.value = true;
        notificationOnNewEmailActive.value = await owa("enable", "notification");
        owaCbDisabled.value = false;
        notificationsCbDisabled.value = false;
      } else {
        await owa("disable", "notification");
      }
    };
    return {
      owaFetchActive,
      owaCbDisabled,
      notificationOnNewEmailActive,
      notificationsCbDisabled,
      autoLoginActive
    };
  }
});
import { vShow as _vShow, createElementVNode as _createElementVNode, withDirectives as _withDirectives, resolveComponent as _resolveComponent, createVNode as _createVNode, createStaticVNode as _createStaticVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"
import _imports_0 from '../../../assets/images/UnreadMails0.png.proxy.js'
import _imports_1 from '../../../assets/images/UnreadMails5.png.proxy.js'
import _imports_2 from '../../../assets/images/UnreadMails16.png.proxy.js'


const _withScopeId = n => (_pushScopeId("data-v-1116143c"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "msg p-margin max-line" }
const _hoisted_2 = /*#__PURE__*/_createStaticVNode("<div class=\"example-row\" data-v-1116143c><img class=\"icon\" src=\"" + _imports_0 + "\" data-v-1116143c><span data-v-1116143c>keine neuen Mails</span></div><div class=\"example-row\" data-v-1116143c><img class=\"icon\" src=\"" + _imports_1 + "\" data-v-1116143c><span data-v-1116143c>5 neue Mails</span></div><div class=\"example-row\" data-v-1116143c><img class=\"icon\" src=\"" + _imports_2 + "\" data-v-1116143c><span data-v-1116143c>16 neue Mails</span></div><p class=\"max-line\" data-v-1116143c> Das Abrufen der Anzahl deiner ungelesenen Mails kann bis zu 5 Minuten dauern. Weil TUfast dafür eine spezielle Berechtigung braucht, drücke bitte auf &quot;Erlauben&quot; im folgenden Pop-Up. </p>", 4)
const _hoisted_6 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "max-line" }, " Für diese Funktion ruft TUfast die Anzahl deiner ungelesenen Mails vom Mail-Server der TU Dresden ab. Zum Anmelden werden deine Login-Daten verschlüsselt übertragen. Diese Verbindung ist sicher. Es funktioniert genauso, als würdest du deine Mails über den Browser abrufen. Die Benachrichtigungen kommen über die Windows-API. Beachte, dass du unter Windows die entsprechende Funktion aktiviert haben musst. ", -1))

export function render(_ctx, _cache) {
  const _component_Setting = _resolveComponent("Setting")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _withDirectives(_createElementVNode("p", _hoisted_1, " Du musst im Reiter \"Automatisches Anmelden\" deinen Login hinterlegt haben, um diese Funktion nutzen zu können. ", 512), [
      [_vShow, !_ctx.autoLoginActive]
    ]),
    _createVNode(_component_Setting, {
      modelValue: _ctx.owaFetchActive,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.owaFetchActive) = $event)),
      disabled: !_ctx.autoLoginActive || _ctx.owaCbDisabled,
      txt: "TUfast zeigt die Anzahl deiner ungelesenen Mails im TU-Dresden-Postfach (OWA) als kleines Icon oben rechts neben der Rakete an."
    }, null, 8, ["modelValue", "disabled"]),
    _hoisted_2,
    _createVNode(_component_Setting, {
      modelValue: _ctx.notificationOnNewEmailActive,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.notificationOnNewEmailActive) = $event)),
      disabled: !_ctx.autoLoginActive || !_ctx.owaFetchActive || _ctx.notificationsCbDisabled,
      txt: "Zusätzlich eine Pop-Up Benachrichtigung beim Eingang einer neuen Mail erhalten."
    }, null, 8, ["modelValue", "disabled"]),
    _hoisted_6
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-1116143c";

export default defaultExport;