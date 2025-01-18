import './RocketSelect.vue.css.proxy.js';
import {defineComponent, onMounted, ref} from "../../../snowpack/pkg/vue.js";
import {isFirefox} from "../../../modules/firefoxCheck.js";
import rockets from "../../rockets.json.proxy.js";
import Link from "./Link.vue.js";
import {useChrome} from "../composables/chrome.js";
const defaultExport = defineComponent({
  components: {
    CustomLink: Link
  },
  setup() {
    const {sendChromeRuntimeMessage} = useChrome();
    const pos = ref(0);
    const availableRockets = ref(["default"]);
    const selectedId = ref("default");
    onMounted(async () => {
      const {available, selected} = await sendChromeRuntimeMessage({cmd: "check_rocket_status"});
      availableRockets.value = [...available];
      selectedId.value = (() => {
        try {
          return JSON.parse(selected).id;
        } catch {
          return "default";
        }
      })();
      pos.value = 100 * Object.keys(rockets).indexOf(selectedId.value);
    });
    const isUnlocked = (rocketObj) => {
      if (!rocketObj || !rocketObj.id)
        return false;
      else
        return availableRockets.value.includes(rocketObj.id);
    };
    const select = async (rocketObj, index) => {
      if (!isUnlocked(rocketObj))
        return;
      pos.value = 100 * index;
      await sendChromeRuntimeMessage({cmd: "set_rocket_icon", rocketId: rocketObj.id});
    };
    const getIcon = (rocketObj) => {
      return chrome.runtime.getURL(isUnlocked(rocketObj) ? rocketObj.iconPathUnlocked : rocketObj.iconPathBeforeUnlock);
    };
    const getLink = (rocketObj) => {
      return rocketObj.link || (isFirefox() ? rocketObj.linkFirefox : rocketObj.linkChromium);
    };
    const getText = (rocketObj) => {
      return isUnlocked(rocketObj) ? rocketObj.unlocked : rocketObj.beforeUnlock;
    };
    const unlockRocket = async (rocketId) => {
      await sendChromeRuntimeMessage({cmd: "unlock_rocket_icon", rocketId});
      availableRockets.value.push(rocketId);
    };
    return {
      rockets,
      pos,
      select,
      getLink,
      getText,
      getIcon,
      isUnlocked,
      unlockRocket
    };
  }
});
import { normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, resolveComponent as _resolveComponent, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-7db3e458"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "rocket-select p-margin" }
const _hoisted_2 = { class: "rocket-select__rockets" }
const _hoisted_3 = ["src", "onClick"]
const _hoisted_4 = {
  key: 1,
  class: "rocket-select__text"
}

export function render(_ctx, _cache) {
  const _component_CustomLink = _resolveComponent("CustomLink")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", {
      ref: "sel",
      class: "rocket-select__selector",
      style: _normalizeStyle(`--pos: ${_ctx.pos}%`)
    }, null, 4),
    _createElementVNode("div", _hoisted_2, [
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.rockets, (rocket, key, index) => {
        return (_openBlock(), _createElementBlock("div", {
          key: index,
          class: "rocket-select__rocket"
        }, [
          _createElementVNode("img", {
            class: _normalizeClass(`rocket-select__image ${index === 0 ? 'rocket-select__image--invert' : ''}`),
            src: _ctx.getIcon(rocket),
            onClick: $event => (_ctx.select(rocket, index))
          }, null, 10, _hoisted_3),
          (_ctx.getLink(rocket))
            ? (_openBlock(), _createBlock(_component_CustomLink, {
                key: 0,
                href: _ctx.getLink(rocket),
                target: "_blank",
                txt: _ctx.getText(rocket),
                onClick: $event => (_ctx.unlockRocket(key))
              }, null, 8, ["href", "txt", "onClick"]))
            : (_openBlock(), _createElementBlock("p", _hoisted_4, _toDisplayString(_ctx.getText(rocket)), 1))
        ]))
      }), 128))
    ])
  ]))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-7db3e458";

export default defaultExport;