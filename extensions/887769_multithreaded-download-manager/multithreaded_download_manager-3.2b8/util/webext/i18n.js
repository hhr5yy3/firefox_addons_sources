export function applyI18n(node = document) {
    for (const v of node.querySelectorAll('[data-i18n]'))
        v.innerText = browser.i18n.getMessage(v.dataset['i18n']);
}
export function applyI18nAttr(attr, node = document) {
    const key = `data-i18n-${attr}`;
    for (const v of node.querySelectorAll(`[${key}]`))
        v.setAttribute(attr, browser.i18n.getMessage(v.getAttribute(key)));
}
export const M = new Proxy((() => { }), {
    get(_target, key) {
        return browser.i18n.getMessage(key);
    },
    apply(_target, _that, args) {
        const [key, ...subs] = args;
        return browser.i18n.getMessage(key, subs);
    },
});
