import './SearchEngines.vue.css.proxy.js';
import {defineComponent, onBeforeMount, ref, watch} from "../../../snowpack/pkg/vue.js";
import Setting from "../components/Setting.vue.js";
import {useSettingHandler} from "../composables/setting-handler.js";
import sites from "../../../contentScripts/forward/searchEngines/sites.json.proxy.js";
const defaultExport = defineComponent({
  components: {
    Setting
  },
  setup() {
    const {se} = useSettingHandler();
    const searchEngineActive = ref(false);
    const uniqueSites = Object.entries(sites).filter(([_, site], idx, arr) => {
      return arr.findIndex(([_2, site2]) => site2.url === site.url) === idx;
    }).sort((a, b) => a[0].localeCompare(b[0]));
    onBeforeMount(async () => {
      const {redirect} = await se("check", "redirect");
      searchEngineActive.value = redirect;
      watch(searchEngineActive, seUpdate);
    });
    const seUpdate = async () => {
      if (searchEngineActive.value) {
        searchEngineActive.value = await se("enable", "redirect");
      } else
        await se("disable", "redirect");
    };
    return {
      searchEngineActive,
      uniqueSites
    };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-5313a16f"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", { class: "max-line p-margin" }, " Gib z.B. \"tumail\" in der Google-Suche ein, um direkt zur Outlook-Web-App zu kommen. Es werden die meisten Suchmaschinen unterstützt! ", -1))
const _hoisted_2 = { class: "search-terms" }
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("br", null, null, -1))

export function render(_ctx, _cache) {
  const _component_Setting = _resolveComponent("Setting")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createVNode(_component_Setting, {
      modelValue: _ctx.searchEngineActive,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.searchEngineActive) = $event)),
      txt: "Suchmaschinen Superpower aktivieren"
    }, null, 8, ["modelValue"]),
    _hoisted_1,
    _createElementVNode("p", _hoisted_2, [
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.uniqueSites, (site) => {
        return (_openBlock(), _createElementBlock(_Fragment, { key: site }, [
          _createTextVNode(_toDisplayString(site[0]) + " → " + _toDisplayString(site[1].name), 1),
          _hoisted_3
        ], 64))
      }), 128))
    ])
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-5313a16f";

export default defaultExport;