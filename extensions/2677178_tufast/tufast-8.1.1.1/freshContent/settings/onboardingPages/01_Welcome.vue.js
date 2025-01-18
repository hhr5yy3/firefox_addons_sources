import './01_Welcome.vue.css.proxy.js';
import {defineComponent} from "../../../snowpack/pkg/vue.js";
const defaultExport = defineComponent({
  components: {},
  setup() {
  }
});
import { resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock } from "../../../snowpack/pkg/vue.js"

export function render(_ctx, _cache) {
  const _component_lottie_player = _resolveComponent("lottie-player")

  return (_openBlock(), _createBlock(_component_lottie_player, {
    src: "../../assets/settings/rocket_lottie.json",
    loop: "",
    autoplay: "",
    class: "max-height"
  }))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-5a87ddcb";

export default defaultExport;