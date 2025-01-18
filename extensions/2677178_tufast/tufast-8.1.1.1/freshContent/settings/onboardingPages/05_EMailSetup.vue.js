import './05_EMailSetup.vue.css.proxy.js';
import {defineComponent, ref, watch} from "../../../snowpack/pkg/vue.js";
import Setting from "../components/Setting.vue.js";
import {useSettingHandler} from "../composables/setting-handler.js";
const defaultExport = defineComponent({
  components: {
    Setting
  },
  setup() {
    const {owa} = useSettingHandler();
    const messagesActive = ref(false);
    const messageCbDisabled = ref(false);
    const notificationsActive = ref(false);
    const notificationsCbDisabled = ref(false);
    const messages = async () => {
      if (messagesActive.value) {
        messageCbDisabled.value = true;
        notificationsCbDisabled.value = true;
        messagesActive.value = await owa("enable", "fetch");
        messageCbDisabled.value = false;
        notificationsCbDisabled.value = false;
      } else {
        await owa("disable", "fetch");
        notificationsActive.value = false;
      }
    };
    const notifications = async () => {
      if (notificationsActive.value) {
        messageCbDisabled.value = true;
        notificationsCbDisabled.value = true;
        notificationsActive.value = await owa("enable", "notification");
        messageCbDisabled.value = false;
        notificationsCbDisabled.value = false;
      } else {
        await owa("disable", "notification");
      }
    };
    watch(messagesActive, messages, {immediate: true});
    watch(notificationsActive, notifications, {immediate: true});
    return {
      messagesActive,
      messageCbDisabled,
      notificationsActive,
      notificationsCbDisabled,
      messages,
      notifications
    };
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-231e2344"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("h1", { class: "upper" }, " TU Dresden E-Mail ", -1))
const _hoisted_2 = { class: "info" }

export function render(_ctx, _cache) {
  const _component_Setting = _resolveComponent("Setting")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    _createElementVNode("div", _hoisted_2, [
      _createVNode(_component_Setting, {
        modelValue: _ctx.messagesActive,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.messagesActive) = $event)),
        disabled: _ctx.messageCbDisabled,
        txt: "Anzahl neuer Nachrichten anzeigen",
        column: true
      }, null, 8, ["modelValue", "disabled"]),
      _createVNode(_component_Setting, {
        modelValue: _ctx.notificationsActive,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.notificationsActive) = $event)),
        disabled: !_ctx.messagesActive || _ctx.notificationsCbDisabled,
        txt: "Benachrichtigung bei neuer E-Mail",
        column: true
      }, null, 8, ["modelValue", "disabled"])
    ])
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-231e2344";

export default defaultExport;