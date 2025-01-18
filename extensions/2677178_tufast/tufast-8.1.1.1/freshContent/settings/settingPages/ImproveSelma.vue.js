import './ImproveSelma.vue.css.proxy.js';
import {defineComponent, onBeforeMount, ref, watch} from "../../../snowpack/pkg/vue.js";
import Setting from "../components/Setting.vue.js";
const defaultExport = defineComponent({
  components: {
    Setting
  },
  setup() {
    const improveSelma = ref(true);
    onBeforeMount(async () => {
      const {improveSelma: storedValue} = await chrome.storage.local.get([
        "improveSelma"
      ]);
      improveSelma.value = storedValue ?? true;
      watch(improveSelma, valueUpdate);
    });
    const valueUpdate = async () => {
      await chrome.storage.local.set({
        improveSelma: improveSelma.value
      });
    };
    return {
      improveSelma
    };
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-14b15600"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "max-line p-margin" }, " Dieses Feature fügt Graphen für die Notenverteilungen und Versuchstracker in Selma hinzu. Zusätzlich wird das Layout und Design angepasst, um benutzerfreundlicher zu sein. ", -1))

export function render(_ctx, _cache) {
  const _component_Setting = _resolveComponent("Setting")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    _createVNode(_component_Setting, {
      modelValue: _ctx.improveSelma,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.improveSelma) = $event)),
      txt: "Das verbesserte Layout und die Notenverteilung bei Selma benutzen",
      class: "setting"
    }, null, 8, ["modelValue"])
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-14b15600";

export default defaultExport;