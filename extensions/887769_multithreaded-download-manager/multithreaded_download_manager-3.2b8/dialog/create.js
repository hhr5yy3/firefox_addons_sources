import { applyI18n, applyI18nAttr } from "../util/webext/i18n.js";
import "../common/elements/x-tab.js";
import "./url-provider.js";
import "./task-form.js";
import { escToCloseWindow } from "../common/common.js";
applyI18n();
applyI18nAttr('placeholder');
applyI18nAttr('title');
escToCloseWindow();
const referrerSelect = document.getElementById('referrer-select');
let referrerSentry = {};
const providerSentryMap = new Map();
function checkProviderUpdate(provider) {
    if (providerSentryMap.get(provider) === referrerSentry)
        return;
    provider.update(Number(referrerSelect.value));
    providerSentryMap.set(provider, referrerSentry);
}
for (const provider of document.querySelectorAll('#url-providers x-page > *'))
    provider.init();
function activeURLProvider() {
    return document.querySelector('#url-providers x-page[active] > .url-provider');
}
async function reloadReferrers() {
    const tabs = await browser.tabs.query({ windowType: 'normal' });
    if (!tabs.length)
        return;
    for (const tab of tabs) {
        const option = document.createElement('option');
        option.textContent = (tab.title ? (tab.title + ' | ') : '') + tab.url;
        option.value = '' + tab.id;
        option.dataset['url'] = tab.url;
        referrerSelect.appendChild(option);
    }
    referrerSelect.value = '' + tabs.reduce((p, v) => p.lastAccessed > v.lastAccessed ? p : v).id;
    function forceUpdate() {
        referrerSentry = {};
        checkProviderUpdate(activeURLProvider());
    }
    referrerSelect.addEventListener('change', forceUpdate);
    document.querySelector('#url-providers').addEventListener('activate', () => { checkProviderUpdate(activeURLProvider()); });
    forceUpdate();
}
void reloadReferrers();
const taskForm = document.querySelector('.task-form');
taskForm.init();
for (const key of ['referrer', 'url']) {
    const input = taskForm.querySelector(`[data-key="${CSS.escape(key)}"]`);
    input.disabled = true;
    input.closest('label').hidden = true;
}
void taskForm.loadDefaultNetworkOptions();
taskForm.getDataList = () => {
    const referrer = referrerSelect.selectedOptions[0].dataset['url'];
    return activeURLProvider().get().map(d => ({ referrer, ...d }));
};
taskForm.getDefaultFilenameTemplate =
    () => activeURLProvider().defaultFilenameTemplate || '';
taskForm.doAfterSubmitting = () => activeURLProvider().doAfterSubmitting();
const { searchParams } = new URL(location.href);
if (Number(searchParams.get('selectedLinks'))) {
    const linkURLProvider = document.querySelector('link-url-provider');
    linkURLProvider.usePreselectedData = true;
    const page = linkURLProvider.closest('x-page');
    page.active = true;
}
if (Number(searchParams.get('convert'))) {
    const page = document.querySelector('convert-url-provider')
        .closest('x-page');
    page.active = true;
}
