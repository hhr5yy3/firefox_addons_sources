import chromeP from './webext-polyfill-kinda.js';
import { executeFunction } from './webext-content-scripts.js';
import { isChrome } from './webext-detect.js';

function castTarget(target) {
    return typeof target === 'object'
        ? target
        : {
            tabId: target,
            frameId: 0,
        };
}
async function getTabUrl(target) {
    const { frameId, tabId } = castTarget(target);
    try {
        if (frameId === 0 && 'tabs' in globalThis.chrome) {
            const tab = await chromeP.tabs.get(tabId);
            if (tab.url) {
                return tab.url;
            }
        }
        return await executeFunction(target, () => location.href);
    }
    catch {
        return undefined;
    }
}
const optionsShortcut = 'WEBEXT_TOOLS_OPTIONS';
function onContextMenuClick({ menuItemId }) {
    if (menuItemId === optionsShortcut) {
        void chrome.runtime.openOptionsPage();
    }
}
function addOptionsContextMenu() {
    if (isChrome()) {
        return;
    }
    if (!(chrome.action ?? chrome.browserAction)) {
        console.warn('Add `action` or `browser_action` to your manifest to enable `addOptionsContextMenu`.');
        return;
    }
    if (!chrome.contextMenus) {
        return;
    }
    chrome.contextMenus.onClicked.addListener(onContextMenuClick);
    chrome.contextMenus.create({
        id: optionsShortcut,
        title: 'Options…',
        contexts: 'action' in chrome ? ['action'] : ['browser_action'],
    });
}

export { addOptionsContextMenu, castTarget, getTabUrl };
