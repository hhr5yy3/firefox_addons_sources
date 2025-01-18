import { k as createApp, l as i18n, d as defineComponent, s as script$1, r as resolveComponent, c as createElementBlock, g as createVNode, f as createBaseVNode, t as toDisplayString$1, b as withCtx, K as Fragment, o as openBlock, m as createTextVNode } from '../chunks/AutStylesheet-2c420ffc.js';
import { s as script$2, u as useShortcut } from '../chunks/AutButton-9a5afc83.js';

var script = defineComponent({
    name: 'Popup',
    components: {
        AutStylesheet: script$1,
        AutButton: script$2,
    },
    setup() {
        const { shortcut } = useShortcut();
        return { shortcut };
    },
    methods: {
        /**
         * On open settings tab event.
         */
        async onOpenSettingsTab() {
            await chrome.tabs.create({ url: chrome.runtime.getURL('options/index.html'), active: true });
        },
    },
});

const _hoisted_1 = { class: "border-box relative w-80 p-4" };
const _hoisted_2 = { class: "text-bold text-xl mb-2" };
const _hoisted_3 = { class: "text-bold bg-red-100 px-1 whitespace-nowrap" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AutStylesheet = resolveComponent("AutStylesheet");
  const _component_i18n_t = resolveComponent("i18n-t");
  const _component_AutButton = resolveComponent("AutButton");

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_AutStylesheet),
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("h1", _hoisted_2, toDisplayString$1(_ctx.$t('popup.title')), 1 /* TEXT */),
      createVNode(_component_i18n_t, {
        keypath: "popup.description",
        tag: "p"
      }, {
        shortcut: withCtx(() => [
          createBaseVNode("span", _hoisted_3, toDisplayString$1(_ctx.shortcut.text), 1 /* TEXT */)
        ]),
        _: 1 /* STABLE */
      }),
      createVNode(_component_AutButton, {
        class: "mt-4",
        color: "primary",
        block: "",
        onClick: _ctx.onOpenSettingsTab
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString$1(_ctx.$t('popup.settingsButton')), 1 /* TEXT */)
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["onClick"])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}

script.render = render;
script.__file = "src/popup/AutPopup.vue";

// Initialize vue app and mount it.
const app = createApp(script);
app.use(i18n);
app.mount('#app-auteon-plugin-tooltip');
