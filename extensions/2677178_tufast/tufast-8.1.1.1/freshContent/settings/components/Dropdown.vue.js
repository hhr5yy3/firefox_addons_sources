import './Dropdown.vue.css.proxy.js';
import {defineComponent, ref} from "../../../snowpack/pkg/vue.js";
import {PhCaretDown, PhCaretDoubleRight} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
import {useChrome} from "../composables/chrome.js";
import studies from "../../studies.json.proxy.js";
const defaultExport = defineComponent({
  components: {
    PhCaretDown,
    PhCaretDoubleRight
  },
  props: {
    title: {
      type: String,
      default: "Platzhalter"
    }
  },
  setup() {
    const {getChromeLocalStorage, setChromeLocalStorage} = useChrome();
    const clicked = ref(false);
    const selectedStudy = ref("Standardeinstellungen");
    getChromeLocalStorage("studiengang").then((studiengang) => {
      selectedStudy.value = studiengang || "Standardeinstellungen";
    });
    const setStudySubject = async (studiengang) => {
      if (studiengang === "addStudiengang") {
        window.location.href = "mailto:frage@tu-fast.de?Subject=Vorschlag Studiengang";
        return;
      }
      selectedStudy.value = studiengang;
      await setChromeLocalStorage({studiengang});
    };
    return {
      studies,
      clicked,
      setStudySubject,
      selectedStudy
    };
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, TransitionGroup as _TransitionGroup, withCtx as _withCtx, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-1aab9ef9"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "dropdown" }
const _hoisted_2 = { class: "dropdown__dropdown" }
const _hoisted_3 = ["onClick"]
const _hoisted_4 = ["src", "alt"]
const _hoisted_5 = { class: "dropdown-list__title" }

export function render(_ctx, _cache) {
  const _component_PhCaretDown = _resolveComponent("PhCaretDown")
  const _component_PhCaretDoubleRight = _resolveComponent("PhCaretDoubleRight")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      _createElementVNode("span", {
        class: "dropdown__title txt-bold",
        onClick: _cache[0] || (_cache[0] = $event => (_ctx.clicked = !_ctx.clicked))
      }, "Studiengang"),
      _createVNode(_component_PhCaretDown, {
        class: "dropdown__arrow",
        color: "hsl(var(--clr-primary) )",
        size: "2rem",
        onClick: _cache[1] || (_cache[1] = $event => (_ctx.clicked = !_ctx.clicked))
      })
    ]),
    (_ctx.clicked)
      ? (_openBlock(), _createBlock(_TransitionGroup, {
          key: 0,
          tag: "div",
          class: "dropdown-list",
          onMouseleave: _cache[2] || (_cache[2] = $event => (_ctx.clicked=false))
        }, {
          default: _withCtx(() => [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.studies, (study, key, index) => {
              return (_openBlock(), _createElementBlock("div", {
                key: index,
                class: _normalizeClass(`dropdown-list__item ${_ctx.selectedStudy === key ? 'dropdown-list__item--selected' : ''}`),
                onClick: $event => (_ctx.setStudySubject(key))
              }, [
                _createVNode(_component_PhCaretDoubleRight, { class: "dropdown-list__arrow" }),
                (study.fsr_icon)
                  ? (_openBlock(), _createElementBlock("img", {
                      key: 0,
                      class: "dropdown-list__image",
                      src: study.fsr_icon,
                      alt: `Das Icon des Studiengangs ${study.name}`
                    }, null, 8, _hoisted_4))
                  : _createCommentVNode("", true),
                _createElementVNode("h3", _hoisted_5, _toDisplayString(study.name), 1)
              ], 10, _hoisted_3))
            }), 128))
          ]),
          _: 1
        }))
      : _createCommentVNode("", true)
  ]))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-1aab9ef9";

export default defaultExport;