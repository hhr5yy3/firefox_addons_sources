import chromeP$1 from './webext-polyfill-kinda.js';
import { isChrome, isBackground } from './webext-detect.js';
import { isUrlPermittedByManifest } from './webext-permissions.js';
import { getTabUrl } from './webext-tools.js';
import webextAlert from './webext-alert.js';
import { isScriptableUrl, executeFunction } from './webext-content-scripts.js';

const contextMenuId = 'webext-permission-toggle:add-permission';
let globalOptions;
const chromeP = isChrome() && globalThis.chrome?.runtime?.getManifest().manifest_version < 3
    ? chromeP$1
    : globalThis.chrome;
function assertTab(tab) {
    if (!tab?.id) {
        throw new Error('The browser didn\'t supply any information about the active tab.');
    }
}
function assertUrl(url) {
    if (!url) {
        throw new Error('The browser didn\'t supply the current page\'s URL.');
    }
}
function assertScriptableUrl(url) {
    if (!isScriptableUrl(url)) {
        throw new Error(chrome.runtime.getManifest().name + ' can\'t be enabled on this page.');
    }
}
async function isOriginPermanentlyAllowed(origin) {
    return chromeP.permissions.contains({
        origins: [origin + '/*'],
    });
}
function updateItemRaw({ checked, enabled }) {
    chrome.contextMenus.update(contextMenuId, {
        checked,
        enabled,
    });
}
async function updateItem(url) {
    if (!url) {
        updateItemRaw({
            enabled: true,
            checked: false,
        });
        return;
    }
    if (isScriptableUrl(url)) {
        const { origin } = new URL(url);
        const isDefault = isUrlPermittedByManifest(url);
        const hasPermission = await isOriginPermanentlyAllowed(origin);
        updateItemRaw({
            enabled: !isDefault || !hasPermission,
            checked: hasPermission,
        });
        return;
    }
    updateItemRaw({
        enabled: false,
        checked: false,
    });
}
async function setPermission(url, request) {
    const permissionData = {
        origins: [
            new URL(url).origin + '/*',
        ],
    };
    await chromeP.permissions[request ? 'request' : 'remove'](permissionData);
    return chromeP.permissions.contains(permissionData);
}
async function handleTabActivated({ tabId }) {
    void updateItem(await getTabUrl(tabId) ?? '');
}
async function handleClick({ checked, menuItemId }, tab) {
    if (menuItemId !== contextMenuId) {
        return;
    }
    let url;
    try {
        assertTab(tab);
        url = tab.url || await getTabUrl(tab.id);
        assertUrl(url);
        assertScriptableUrl(url);
        const permissionExistsNow = await setPermission(url, checked);
        const settingWasSuccessful = permissionExistsNow === checked;
        if (!settingWasSuccessful) {
            updateItemRaw({
                checked: permissionExistsNow,
            });
        }
        if (permissionExistsNow && globalOptions.reloadOnSuccess) {
            void executeFunction(tab.id, (message) => {
                if (confirm(message)) {
                    location.reload();
                }
            }, globalOptions.reloadOnSuccess);
        }
    }
    catch (error) {
        setTimeout(updateItem, 500, url);
        if (tab?.id) {
            try {
                await executeFunction(tab.id, text => {
                    window.alert(text);
                }, String(error));
            }
            catch {
                void webextAlert(String(error));
            }
        }
        throw error;
    }
}
function addPermissionToggle(options) {
    if (!isBackground()) {
        throw new Error('webext-permission-toggle can only be called from a background page');
    }
    if (globalOptions) {
        throw new Error('webext-permission-toggle can only be initialized once');
    }
    const manifest = chrome.runtime.getManifest();
    if (!chrome.contextMenus) {
        if (!manifest.permissions?.includes('contextMenus')
            && !/Android.+Firefox\//.test(navigator.userAgent)) {
            throw new Error('webext-permission-toggle requires the `contextMenus` permission');
        }
        console.warn('chrome.contextMenus is not available');
        return;
    }
    globalOptions = {
        title: `Enable ${manifest.name} on this domain`,
        reloadOnSuccess: false,
        ...options,
    };
    if (globalOptions.reloadOnSuccess === true) {
        globalOptions.reloadOnSuccess = `Do you want to reload this page to apply ${manifest.name}?`;
    }
    const optionalHosts = [
        ...manifest.optional_permissions ?? [],
        ...manifest.optional_host_permissions ?? [],
    ].filter((permission) => permission === '<all_urls>' || permission.includes('*'));
    if (optionalHosts.length === 0) {
        throw new TypeError('webext-permission-toggle requires some wildcard hosts to be specified in `optional_permissions` (MV2) or `optional_host_permissions` (MV3)');
    }
    chrome.contextMenus.remove(contextMenuId, () => chrome.runtime.lastError);
    const contexts = manifest.manifest_version === 2
        ? ['page_action', 'browser_action']
        : ['action'];
    chrome.contextMenus.create({
        id: contextMenuId,
        type: 'checkbox',
        checked: false,
        title: globalOptions.title,
        contexts,
        documentUrlPatterns: optionalHosts,
    });
    chrome.contextMenus.onClicked.addListener(handleClick);
    chrome.tabs.onActivated.addListener(handleTabActivated);
    chrome.tabs.onUpdated.addListener(async (tabId, { status }, { url, active }) => {
        if (active && status === 'complete') {
            void updateItem(url ?? await getTabUrl(tabId) ?? '');
        }
    });
}

export { addPermissionToggle as default };
