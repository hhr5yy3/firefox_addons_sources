import './Card.vue.css.proxy.js';
import {defineComponent, onMounted} from "../../../snowpack/pkg/vue.js";
import {PhX} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
const defaultExport = defineComponent({
  components: {
    PhX
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["close-me"],
  setup(_, {emit}) {
    const close = () => {
      document.querySelector(".card")?.classList.add("card--closing");
      setTimeout(() => emit("close-me"), 650);
    };
    const open = () => {
      const card = document.querySelector(".card");
      card?.classList.add("card--opening");
      setTimeout(() => {
        card?.classList.remove("card--opening");
        card.focus();
      }, 850);
    };
    onMounted(() => open());
    return {
      close
    };
  }
});
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, createVNode as _createVNode, renderSlot as _renderSlot, createTextVNode as _createTextVNode, withKeys as _withKeys, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-f9b3b310"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "card__header" }
const _hoisted_2 = { class: "card__title upper" }
const _hoisted_3 = { class: "card__body" }

export function render(_ctx, _cache) {
  const _component_PhX = _resolveComponent("PhX")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", {
      class: "card-bg",
      onClick: _cache[0] || (_cache[0] = $event => (_ctx.close()))
    }),
    _createElementVNode("div", {
      tabindex: "0",
      class: "card",
      onKeydown: _cache[2] || (_cache[2] = _withKeys($event => (_ctx.close()), ["esc"]))
    }, [
      _createElementVNode("div", _hoisted_1, [
        _createElementVNode("h1", _hoisted_2, _toDisplayString(_ctx.title), 1),
        _createVNode(_component_PhX, {
          class: "card__close",
          onClick: _cache[1] || (_cache[1] = $event => (_ctx.close()))
        })
      ]),
      _createElementVNode("div", _hoisted_3, [
        _renderSlot(_ctx.$slots, "default", {}, () => [
          _createTextVNode("Body")
        ])
      ])
    ], 32)
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-f9b3b310";

export default defaultExport;