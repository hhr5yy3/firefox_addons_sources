import './LanguageSelect.vue.css.proxy.js';
import {defineComponent, ref, computed} from "../../../snowpack/pkg/vue.js";
import {PhCaretDoubleRight} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
const defaultExport = defineComponent({
  components: {
    PhCaretDoubleRight
  },
  setup() {
    var Selected;
    (function(Selected2) {
      Selected2["German"] = "German";
      Selected2["English"] = "English";
    })(Selected || (Selected = {}));
    const languages = ref(null);
    const selected = ref(Selected.German);
    const selectorClass = computed(() => selected.value === Selected.German ? "language-select__selector--german" : "language-select__selector--english");
    const switchSel = (e) => {
      const target = e.target;
      if (target.classList.contains("language-select__languages--selected")) {
        return;
      }
      return;
      switch (selected.value) {
        case Selected.German:
          selected.value = Selected.English;
          break;
        case Selected.English:
          selected.value = Selected.German;
          break;
      }
      for (const language of languages.value.children) {
        language.classList.toggle("language-select__languages--selected");
      }
    };
    return {
      switchSel,
      selectorClass,
      languages
    };
  }
});
import { resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, createVNode as _createVNode, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-35e767dc"),n=n(),_popScopeId(),n)
const _hoisted_1 = {
  class: "language-select",
  disabled: ""
}
const _hoisted_2 = {
  ref: "languages",
  class: "language-select__languages"
}
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "soon" }, [
  /*#__PURE__*/_createTextVNode(" Bald!"),
  /*#__PURE__*/_createElementVNode("br"),
  /*#__PURE__*/_createTextVNode("Soon! ")
], -1))

export function render(_ctx, _cache) {
  const _component_PhCaretDoubleRight = _resolveComponent("PhCaretDoubleRight")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(_component_PhCaretDoubleRight, {
      class: _normalizeClass(["language-select__selector", _ctx.selectorClass]),
      onClickCapture: _cache[0] || (_cache[0] = $event => (_ctx.switchSel($event)))
    }, null, 8, ["class"]),
    _createElementVNode("div", _hoisted_2, [
      _createElementVNode("p", {
        class: "language-select__german language-select__languages--selected",
        onClick: _cache[1] || (_cache[1] = $event => (_ctx.switchSel($event)))
      }, " Deutsch "),
      _createElementVNode("p", {
        class: "language-select__english",
        onClick: _cache[2] || (_cache[2] = $event => (_ctx.switchSel($event)))
      }, " English ")
    ], 512),
    _hoisted_3
  ]))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-35e767dc";

export default defaultExport;