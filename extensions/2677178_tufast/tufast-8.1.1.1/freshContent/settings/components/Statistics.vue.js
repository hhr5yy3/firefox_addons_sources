import './Statistics.vue.css.proxy.js';
import {defineComponent, ref} from "../../../snowpack/pkg/vue.js";
import {PhCursor, PhTimer} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
import {time} from "../utilities.js";
import {useChrome} from "../composables/chrome.js";
const defaultExport = defineComponent({
  components: {
    PhCursor,
    PhTimer
  },
  setup() {
    const {getChromeLocalStorage} = useChrome();
    const counter = ref(0);
    getChromeLocalStorage("savedClickCounter").then((clicks) => {
      counter.value = typeof clicks === "number" ? clicks : Number.parseInt(clicks) || 0;
    });
    return {
      counter,
      time
    };
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-4fa53f0b"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "statistics" }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "txt-bold" }, " Bereits gespart ", -1))
const _hoisted_3 = { class: "statistics__clicks" }
const _hoisted_4 = { class: "txt-bold" }
const _hoisted_5 = { class: "statistics__minutes" }
const _hoisted_6 = { class: "txt-bold" }

export function render(_ctx, _cache) {
  const _component_PhCursor = _resolveComponent("PhCursor")
  const _component_PhTimer = _resolveComponent("PhTimer")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    _createElementVNode("div", _hoisted_3, [
      _createVNode(_component_PhCursor),
      _createElementVNode("span", _hoisted_4, _toDisplayString(_ctx.counter), 1),
      _createElementVNode("span", null, _toDisplayString(_ctx.counter === 1 ? "Click" : "Clicks"), 1)
    ]),
    _createElementVNode("div", _hoisted_5, [
      _createVNode(_component_PhTimer),
      _createElementVNode("span", _hoisted_6, _toDisplayString(_ctx.time.getMinutes(_ctx.counter)) + "min", 1),
      _createElementVNode("span", null, _toDisplayString(_ctx.time.getSeconds(_ctx.counter)) + "s", 1)
    ])
  ]))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-4fa53f0b";

export default defaultExport;