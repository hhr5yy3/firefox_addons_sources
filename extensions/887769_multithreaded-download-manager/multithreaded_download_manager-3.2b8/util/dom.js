export function importTemplateElement(template) {
    return importTemplate(template).firstElementChild;
}
export function importTemplate(template) {
    if (typeof template === 'string')
        template = document.getElementById(template);
    return document.importNode(template.content, true);
}
export function defineBooleanAttribute(T, attr) {
    Object.defineProperty(T.prototype, attr, {
        get() { return this.hasAttribute(attr); },
        set(value) {
            value ? this.setAttribute(attr, '') : this.removeAttribute(attr);
        },
    });
}
