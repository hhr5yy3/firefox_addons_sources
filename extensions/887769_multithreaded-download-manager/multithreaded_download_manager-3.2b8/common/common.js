import { remoteProxy } from '../util/webext/remote.js';
export async function closeWindow() {
    if (!browser.windows /* Android */ ||
        (await browser.windows.getCurrent()).type === 'normal')
        return await browser.tabs.remove((await browser.tabs.getCurrent()).id);
    await browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
}
export function escToCloseWindow() {
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape')
            void closeWindow();
    });
}
export function isValidProtocol(protocol) {
    return ['http:', 'https:'].includes(protocol.toLowerCase());
}
export function isValidProtocolURL(url) {
    try {
        return isValidProtocol(new URL(url || '').protocol);
    }
    catch {
        return false;
    }
}
export async function removeBrowserDownload(id) {
    try {
        await browser.downloads.cancel(id);
    }
    catch { }
    try {
        await browser.downloads.erase({ id });
    }
    catch { }
}
export function toHyphenCase(s) {
    return s.replace(/[a-z][A-Z]/g, g => g[0] + '-' + g[1].toLowerCase());
}
export function formatSize(n, { base = 1024, valueCap = 1000, separator = ' ' } = {}) {
    if (n === 0)
        return '0 ';
    const sign = n < 0 ? (n = -n, '-') : '';
    const symbols = ['', 'K', 'M', 'G', 'T', 'P', 'E'];
    let exp = Math.floor(Math.log(n) / Math.log(base));
    if (n / base ** exp >= valueCap)
        exp++;
    exp = Math.max(0, Math.min(exp, symbols.length - 1));
    return sign + (n / base ** exp).toFixed(1) + separator + symbols[exp];
}
export function formatTimeSpan(seconds) {
    const value = Math.ceil(seconds);
    const hval = Math.floor(value / 3600), m = Math.floor((value % 3600) / 60) + '', s = (value % 60) + '';
    const cap = 10000;
    if (hval >= cap)
        return `>${cap}h`;
    return hval ? `${hval}:${m.padStart(2, '0')}:${s.padStart(2, '0')}` :
        `${m}:${s.padStart(2, '0')}`;
}
export async function movePlatformSubmitButton(...nodes) {
    if ((await browser.runtime.getPlatformInfo()).os !== 'win')
        return;
    for (const node of nodes)
        node.parentNode.insertBefore(node, node.previousElementSibling);
}
export function getBuiltinActionContentType(type) {
    return `application/x.mdm-${type}.${location.host}`;
}
export function cryptoRandomString(n = 12) {
    return [...window.crypto.getRandomValues(new Uint8Array(n))].map(v => 'abcdefghijklmnopqrstuvwxyz'[v % 26]).join('');
}
export const backgroundRemote = remoteProxy('BackgroundRemote');
