import './ColorSwitch.vue.css.proxy.js';
import {defineComponent, ref, onMounted} from "../../../snowpack/pkg/vue.js";
import "../../../snowpack/pkg/@lottiefiles/lottie-player.js";
import {useChrome} from "../composables/chrome.js";
import animation from "../../../assets/settings/theme_lottie.json.proxy.js";
const defaultExport = defineComponent({
  props: {
    animState: {
      type: String,
      default: "dark"
    }
  },
  setup(props) {
    const {getChromeLocalStorage} = useChrome();
    const anim = ref();
    const direction = ref(-1);
    const animSeek = ref(99);
    onMounted(async () => {
      setTimeout(async () => {
        await setAnimationDirection();
      }, 10);
    });
    const play = () => {
      setAnimationDirection();
      anim.value.play();
    };
    const setAnimationDirection = async () => {
      const theme = await getChromeLocalStorage("theme");
      if (theme === "dark") {
        direction.value = -1;
        animSeek.value = 99;
      } else if (theme === "light") {
        direction.value = 1;
        animSeek.value = 0;
      }
      anim.value.setDirection(direction.value);
      anim.value.seek(`${animSeek.value}%`);
    };
    return {
      anim,
      animation,
      direction,
      play
    };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-dc52de82"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "color-switch" }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("svg", {
  class: "color-switch__text",
  viewBox: "0 0 400 200"
}, [
  /*#__PURE__*/_createElementVNode("path", {
    id: "curve",
    d: "M 0 0 A 1 1 0 0 0 400 0"
  }),
  /*#__PURE__*/_createElementVNode("text", { "text-anchor": "middle" }, [
    /*#__PURE__*/_createElementVNode("textPath", {
      "xlink:href": "#curve",
      startOffset: "50%"
    }, " Klick Mich! ")
  ])
], -1))

export function render(_ctx, _cache) {
  const _component_lottie_player = _resolveComponent("lottie-player")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(_component_lottie_player, {
      ref: "anim",
      src: "../../assets/settings/theme_lottie.json",
      background: "transparent",
      class: "color-switch__lottie",
      onClick: _cache[0] || (_cache[0] = $event => (_ctx.play()))
    }, null, 512),
    _hoisted_2
  ]))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-dc52de82";

export default defaultExport;