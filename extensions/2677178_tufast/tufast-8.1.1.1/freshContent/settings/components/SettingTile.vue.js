import './SettingTile.vue.css.proxy.js';
import {defineComponent} from "../../../snowpack/pkg/vue.js";
import {PhLockKey, PhNotification, PhListDashes, PhSparkle, PhChartBar, PhGauge, PhGoogleLogo, PhRocket, PhEnvelopeOpen} from "../../../snowpack/pkg/@dnlsndr/vue-phosphor-icons.js";
const defaultExport = defineComponent({
  components: {
    PhLockKey,
    PhNotification,
    PhListDashes,
    PhSparkle,
    PhGauge,
    PhChartBar,
    PhGoogleLogo,
    PhRocket,
    PhEnvelopeOpen
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const toggleFocus = () => {
      const tiles = [...document.querySelectorAll(".settings-tile")];
      for (const tile of tiles) {
        tile.classList.toggle("settings-tile--unfocus");
      }
    };
    const click = (e) => {
      let target = e.target;
      if (target.parentElement?.classList.contains("settings-tile")) {
        target = target.parentElement;
      }
      target.classList.add("settings-tile--animate");
      setTimeout(() => target.classList.remove("settings-tile--animate"), 1e3);
    };
    return {
      toggleFocus,
      click
    };
  }
});
import { resolveDynamicComponent as _resolveDynamicComponent, openBlock as _openBlock, createBlock as _createBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-7eb595e6"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "settings-tile__title" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", {
    class: "settings-tile",
    onMouseenter: _cache[0] || (_cache[0] = $event => (_ctx.toggleFocus())),
    onMouseleave: _cache[1] || (_cache[1] = $event => (_ctx.toggleFocus())),
    onClick: _cache[2] || (_cache[2] = $event => (_ctx.click($event)))
  }, [
    (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.icon), {
      color: "hsl(var(--clr-primary) )",
      class: "settings-tile__icon"
    })),
    _createElementVNode("h2", _hoisted_1, _toDisplayString(_ctx.title), 1)
  ], 32))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-7eb595e6";

export default defaultExport;