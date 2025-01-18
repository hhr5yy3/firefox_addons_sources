import { p as ref, d as defineComponent, c as createElementBlock, q as renderSlot, n as normalizeClass, o as openBlock } from './AutStylesheet-2c420ffc.js';

const parseShortcutText = (shortcut) => {
    return shortcut
        .toUpperCase()
        .replace(/CTRL/gi, 'STRG');
};
/**
 * Get default shortcut.
 */
const getDefaultShortcut = (clean = false) => {
    const manifest = chrome.runtime.getManifest();
    const defaultShortcut = (manifest?.commands?.tooltip?.suggested_key?.default || 'Alt+A').toUpperCase().split('+');
    return {
        text: parseShortcutText(defaultShortcut.join(' + ')),
        keys: {
            alt: !clean ? defaultShortcut.includes('ALT') : false,
            ctrl: !clean ? (defaultShortcut.includes('CTRL') || defaultShortcut.includes('MACCTRL')) : false,
            meta: !clean ? defaultShortcut.includes('META') : false,
            shift: !clean ? defaultShortcut.includes('SHIFT') : false,
            code: 'Key' + (defaultShortcut[defaultShortcut.length - 1] || 'A'),
            location: 0,
        },
    };
};
/**
 * On detect shortcut.
 * @param event
 */
const detectShortcut = (event) => {
    // Key array for text generation.
    const keys = [];
    // Define default shortcut
    const shortcut = getDefaultShortcut(true);
    // Assign values in base of event.
    shortcut.keys.shift = event?.getModifierState('Shift') || event?.shiftKey || shortcut.keys.shift;
    shortcut.keys.ctrl = event?.getModifierState('Ctrl') || event?.ctrlKey || shortcut.keys.ctrl;
    shortcut.keys.alt = event?.getModifierState('Alt') || event?.getModifierState('AltGraph') || event?.altKey || shortcut.keys.alt;
    shortcut.keys.meta = event?.getModifierState('Meta') || event?.metaKey || shortcut.keys.meta;
    shortcut.keys.location = event?.location || shortcut.keys.location;
    shortcut.keys.code = event?.code || shortcut.keys.code;
    // Prepare keys array for text generation.
    if (shortcut.keys.shift)
        keys.push('SHIFT');
    if (shortcut.keys.ctrl)
        keys.push('CTRL');
    if (shortcut.keys.alt)
        keys.push('ALT');
    if (shortcut.keys.meta)
        keys.push('COMMAND');
    if (shortcut.keys.code && shortcut.keys.location === 0) {
        const codeAsText = event.code.replace(/^(Digit|Key)/, '');
        keys.push(codeAsText);
    }
    // Generate shortcut text.
    shortcut.text = parseShortcutText(keys.join(' + '));
    return shortcut;
};
/**
 * Save shortcut action.
 */
const saveShortcut = async (shortcut) => {
    const clonedShortcut = JSON.parse(JSON.stringify(shortcut));
    await chrome.storage.local.set({ 'shortcut': clonedShortcut });
    shortcutRef.value = shortcut;
};
/**
 * Load shortcut from storage action.
 */
const loadShortcutFromStorage = async () => {
    chrome.storage.local.get(['shortcut'], (items) => {
        const defaultShortcut = getDefaultShortcut();
        shortcutRef.value = items?.shortcut || defaultShortcut;
        shortcutRef.value.text = parseShortcutText(shortcutRef.value.text);
    });
};
// Load shortcut.
let shortcutRef = ref(getDefaultShortcut());
loadShortcutFromStorage().catch();
/**
 * Use shortcut composition.
 */
const useShortcut = () => {
    return {
        shortcut: shortcutRef,
        getDefaultShortcut,
        detectShortcut,
        saveShortcut,
    };
};

const Color = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    transparent: 'transparent',
};
var script = defineComponent({
    name: 'AutButton',
    props: {
        color: {
            type: String,
            default: Color.primary,
        },
        block: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: Boolean,
            default: false,
        },
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("button", {
    type: "submit",
    class: normalizeClass(["aut-button", {
      [`color-${_ctx.color}`]: true,
      'w-full justify-center': _ctx.block,
      'icon rounded-full p-2': _ctx.icon,
    }])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__scopeId = "data-v-0b93a4c7";
script.__file = "src/components/ui/AutButton.vue";

export { script as s, useShortcut as u };
